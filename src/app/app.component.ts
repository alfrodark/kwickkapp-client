import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'client-mgt-app';
  currentYear: number = new Date().getFullYear();

  user$: Observable<firebase.default.User> | any;

  constructor(private authService: AuthService, private router: Router) {
    this.user$ = authService.currentUser;
  }

  logout() {
    this.authService.signOut().then(() => {
      alert('User logged out successfully');
      this.router.navigate(['/login']);
    }).catch(error => {
      alert(error);
    });
  }
}
