import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Client } from '../../models/client.model';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit  {

  clients$!: Observable<Client[]>;
  displayedColumns: string[] = ['clientName', 'phone', 'actions'];
  clients: Client[] = [];
  searchInput: string = '';
  searchTerms = new Subject<string>();


  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private router: Router,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.clients$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.clientService.searchClients(term))
    );

    // Initial load
    this.searchClients();
    // Check if the user is authenticated
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.clients$ = this.clientService.getClients();
      } else {
        // Load clients for the authenticated user
        this.clients$ = this.clientService.getClients();
      }
    });
  }

  searchClients() {
    this.searchTerms.next(this.searchInput);
  }

  // Logout the user
  logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  onSearchInput() {
    this.searchTerms.next(this.searchInput);
  }

  // Navigate to the client details page
  viewClientDetails(clientId: any) {
    this.router.navigate(['/client-details', clientId]);
  }

  deleteClient(clientId: string, clientName: string) {
    const confirmDelete = confirm(`Are you sure you want to delete ${clientName}?`);

    if (confirmDelete) {
      this.firestoreService.deleteClient(clientId);
    }
  }

}
