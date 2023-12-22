import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  signupForm: FormGroup | any = null;
  downloadURL!: string;
  user: User = {uid: '', email: '', password: '', name: '', phone: '', city: '' };
  imageUrl!: string | ArrayBuffer | any;
  uploadPercent!: number;

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private userService: UserService,
    private router: Router
    ) {

      this.createForm();
  }

  onSubmit() {
    if (this.imageUrl) {
      // Upload photo to storage (not implemented in this example)
      // Retrieve the URL and set it in this.user.photoUrl
    }

    this.userService.signUp(this.user).then(() => {
      alert('User signed up successfully!');
      this.router.navigate(['/login']);
    });
  }

  signUp() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const name = this.signupForm.get('name').value;
    const phone = this.signupForm.get('phone').value;
    const city = this.signupForm.get('city').value;
    const photoUrl = this.signupForm.get('photoUrl').value;

    this.authService.signUp(email, password, name, phone, city, photoUrl).then(() => {
      this.router.navigate(['/login']);
    });
  }

  createForm(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      photoUrl: [''],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const filePath = `user-photos/${this.user.uid}/${Date.now()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.percentageChanges().subscribe((percent: number| any) => {
      this.uploadPercent = percent;
    });

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url: string) => {
          this.imageUrl = url;
          this.signupForm.patchValue({ photoUrl: url });
        });
      })
    ).subscribe();


  }


}
