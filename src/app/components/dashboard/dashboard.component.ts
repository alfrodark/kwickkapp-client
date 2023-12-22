import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { Observable, map } from 'rxjs';
import { Client } from '../../models/client.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit  {

  user!: Observable<any>;
  clients!: Observable<Client[]>;
  clients$!: Observable<Client[]>;
  totalClients$!: Observable<number>;
  userData: any;
  userService!: UserService;
  uid!: Observable<any>;

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'city'];


  constructor(private authService: AuthService,
    private router: Router,
    private clientService: ClientService,
    private firestoreService: FirestoreService) {}

  async ngOnInit(): Promise<void> {
    this.authService.user$.subscribe((user: any) => {
      this.userData = user;
      if (user) {
        this.clients = this.clientService.getClients();
        this.clients$ = this.clientService.getClients();
      }else {
        // Load clients for the authenticated user
        this.clients$ = this.clientService.getClients();
      }
    });
    // this.user = this.authService.getCurrentUserSnapshot();
    // this.user.subscribe((user) => {
    //   if (user) {
    //     this.clients = this.clientService.getClients();
    //   }
    // });
    this.totalClients$ = this.clientService.getClients().pipe(
      // Assuming you have a custom method in your service to get the total number of clients
      map(clients => clients.length)
    );
  }

  logout(){
    // this.authService.signOut();
    // this.router.navigate(['/login']);

    this.authService.signOut().then(() => {
      alert('User logged out successfully');
      this.router.navigate(['/login']);
    }).catch(error => {
      alert(error);
    });
  }

  deleteClient(clientId: string, clientName: string) {
    const confirmDelete = confirm(`Are you sure you want to delete ${clientName}?`);

    if (confirmDelete) {
      this.firestoreService.deleteClient(clientId);
    }
  }

}
