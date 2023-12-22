import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  getClients(clientId: string) {
    return this.firestore.collection('clients').doc(clientId).valueChanges();
  }

  getClient() {
    return this.firestore.collection('clients').valueChanges();
  }

  getClientDetails(clientId: string) {
    return this.firestore.collection('clients').doc(clientId).valueChanges();
  }

  // Update customer details
  updateClient(clientId: string, clientData: any) {
    return this.firestore.collection('clients').doc(clientId).update(clientData);
  }

  addClient(client: any) {
    return this.firestore.collection('clients').add(client);
  }

  deleteClient(clientId: string) {
    return this.firestore.collection('clients').doc(clientId).delete();
  }

  getBilling(clientId: string, billingId: string): Observable<any> {
    return this.firestore.collection('clients').doc(clientId)
      .collection('billing').doc(billingId).valueChanges();
  }

}
