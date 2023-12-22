import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client-edit-details',
  templateUrl: './client-edit-details.component.html',
  styleUrl: './client-edit-details.component.css'
})
export class ClientEditDetailsComponent implements OnInit  {

  editClientForm: FormGroup | any = null;
  clientId!: string | any;
  client!: Observable<Client>;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editClientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      street: [''],
      city: [''],
      zip: ['']

    });
  }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('clientId');
    this.loadClientData();
  }

  loadClientData() {
    this.clientService.getClientById(this.clientId).subscribe(client => {
      if (client) {
        this.editClientForm.patchValue(client);
      } else {
        alert('Client not found');
      }
    });
  }

  onSubmit() {
    if (this.editClientForm.valid) {
      const updatedClient = this.editClientForm.value;
      this.clientService.updateClient(this.clientId, updatedClient)
        .then(() => {
          this.router.navigate(['/clients']);
        })
        .catch(error => {
          alert(error);
        });
    }
  }

}
