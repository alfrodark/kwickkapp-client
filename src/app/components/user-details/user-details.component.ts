import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {

  user!: User;

  constructor(
    private auth: AngularFireAuth,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      const uid = this.route.snapshot.paramMap.get('id') || user!.uid;
      this.authService.getUserData(uid).subscribe((userData: any) => {
        this.user = userData;
      });
    });
  }

}
