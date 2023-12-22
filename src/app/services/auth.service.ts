import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$!: Observable<firebase.default.User> | any;
  userLoggedIn!: boolean;

  private isAuthenticatedValue: boolean = false;
  private authToken: string | null = localStorage.getItem('authToken');

  constructor(private afAuth: AngularFireAuth, private router : Router,
    private afs: AngularFirestore) {

      this.user$ = afAuth.authState;

      this.user$ = afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.getUserData(user.uid);
          } else {
            return [];
          }
        })
      );

 }

 getUserData(userId: string): Observable<any> {
  return this.afs.collection('users').doc(userId).valueChanges();
}

 isAuthenticated(): boolean {
   return this.authToken !== null && this.isValidToken()
}

isValidToken(): boolean {
  if (this.authToken) {
    try {
      // Decode the token to get its payload
      const tokenPayload: any = jwtDecode(this.authToken)

      // Check if the token is not expired
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return tokenPayload.exp > currentTimestamp;
    } catch (error) {
      // Token decoding or validation failed
      console.error('Error decoding or validating token:', error);
      return false;
    }
  }

  // No token found
  return false;
}

setAuthenticated(isAuthenticated: boolean, authToken?: string | null): void {
  this.isAuthenticatedValue = isAuthenticated;

  if (authToken !== undefined && authToken !== null) {
    this.authToken = authToken;
    localStorage.setItem('authToken', authToken);
  }
}

clearAuthentication(): void {
  this.isAuthenticatedValue = false;
  this.authToken = null;
  localStorage.removeItem('authToken');
}

  isUserLoggedIn() {
    const user = JSON.parse(localStorage.getItem(this.user$)!);
    return user !== null ? true : false;
  }

  get currentUser() {
    return this.afAuth.currentUser;
  }

  getCurrentUser(): Observable<any> {
    return this.user$;
  }

  // signUp(email: string, password: string): Promise<any> {
  //   return this.afAuth.createUserWithEmailAndPassword(email, password).then((credential) => {
  //     return this.updateUserData(credential.user);
  //   });
  // }

  // saveUserData(userId: string, userData: any) {
  //   return this.afs.collection('users').doc(userId).set(userData);
  // }

  signUp(email: string, password: string, name: string, phone: string, city: string,
  photoUrl?: string): Promise<void> {
    // Step 1: Create user in Firebase Authentication
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // Step 2: Save additional user data in Firestore
        const userId = result.user?.uid;

        if (userId) {
          const userData = {email, userId, name, phone, city, photoUrl};

          return this.saveUserData(userId, userData);
        } else {
          throw new Error('User ID not available in sign-up result.');
        }
      })
      .then(() => {
        // Step 3: Redirect or perform other actions on successful sign-up
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        // Handle sign-up error
        console.error('Sign-up error:', error);
        throw error; // Re-throw the error for the component to handle
      });
  }

  saveUserData(userId: string, userData: any): Promise<void> {
    return this.afs.collection('users').doc(userId).set(userData);
  }

  signIn(username : string, password : string) {
    this.afAuth
      .signInWithEmailAndPassword(username ,password)
      .then(result => {
        this.afAuth.authState.subscribe(async user => {
          if(user) {
            localStorage.setItem('user', JSON.stringify(user));
            await this.router.navigate(['/client-dashboard']);
            location.reload();
          }
        })
      })
      .catch( error => {
        alert(error);
      })

  }

  async signOut() {
    localStorage.setItem('user','null');
    await this.router.navigate(['']);
    location.reload();
    this.isAuthenticatedValue = false;
  }

  // signOut(): Promise<any> {
  //   return this.afAuth.signOut();
  // }

  getCurrentUserSnapshot(): any {
    return this.afAuth.currentUser;
  }

  updateUserData(user: any): Promise<void> {
    const userRef = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      name: user.name || '',
      phone: user.phone || '',
      city: user.city || '',
      photoUrl: user.photoUrl || 'gs://kotlinshoppingfirebase.appspot.com/images/profile/Profile-Avatar-PNG.png',
    };

    return userRef.set(data, { merge: true });
  }

}
