import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { Observable, map } from 'rxjs';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import { Billing } from '../../models/billing.model';
import { BillingService } from '../../services/billing.service';
import { UserService } from '../../services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent implements OnInit  {

  timestampString = 'Timestamp(seconds=1702402741, nanoseconds=78000000)';

  clientId!: string | any;
  client$: Observable<Client>| any;
  client!: Observable<Client>| any;
  userId!: string | any;
  displayedColumns: string[] = ['Name', 'Email', 'Phone', 'City'];
  dataSource: Client[] = [];

  user!: User | any;
  billings!: Billing[];
  billingId: string | any;
  billing$!: Observable<Billing>| any;
  clientData$!: Observable<any> | any;
  billingData!: any[];
  invoiceNumber: string | any;

  documentData$!: Observable<any> | any;
  documentId!: string;
  currentDocument: string | any;
  documents$!: Observable<any[]> | any;
  currentIndex!: number;


  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private clientService: ClientService,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private auth: AngularFireAuth,
    private userService: UserService,
    private billingService: BillingService
    ) {
      this.documentData$ = this.firestore.collection('billing').valueChanges();


    }

  ngOnInit(): void {
     this.auth.user.subscribe(userData => {
         this.user = userData;
         this.loadBillingData();
         this.getBillingDetails();
     });

     this.clientId! = this.route.snapshot.paramMap.get('clientId');
     this.client$ = this.clientService.getClient(this.clientId);
     this.getClientDetails();

     this.route.params.subscribe(params => {
     this.clientId = params['clientId'];
     console.log(this.clientId!);
    });

    this.documents$ = this.firestore.collection('billing', ref => ref.orderBy('timestamp')).valueChanges();
  }

  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  // Function to get the index of the current document
  getCurrentDocumentIndex(): number {
    // Find the index of the current document in the ordered array
    return this.documents$.findIndex((doc: any) => doc === this.currentDocument);
  }

   loadBillingData(): void {
     this.billingService.getBillingsByClientId(this.clientId).subscribe(data => {
       this.billings = data;
       this.billingId = data.at(0)?.billingId;
       console.log(this.billingId);
     });
   }

  deleteBillingEntries(): void {
    this.billingService.deleteBillingEntriesByBillingId(this.billingId)
      .then(() => {
        alert('Billing entries deleted successfully');
        // Optionally, refresh the billing data
        this.loadBillingData();
      })
      .catch(error => alert('Error deleting billing entries:'+{error}));
  }

  getClientDetails() {
    this.firestoreService.getClientDetails(this.clientId).subscribe((client) => {
      this.client$ = client;
    });
  }

  getBillingDetails(){
    this.billingService.getBillingsForClient(this.clientId).subscribe((billing) => {
      this.billing$ = billing;
    });
  }

  addBilling(billing: Billing): void {
    this.billingService.addBilling(this.clientId!, billing).then(() => {
      // Optionally, reload billing data after adding a new billing entry
      this.loadBillingData();
    });
  }

  deleteBilling(billingId: string): Promise<void> {
    return this.firestore.collection('billing').doc(billingId).delete()
      .then(() => alert('Bill deleted successfully'))
      .catch(error => alert(error));
  }

  formatTimestamp(timestampString: string): string {
    const regex = /Timestamp\(seconds=(\d+), nanoseconds=(\d+)\)/;
    const match = timestampString.match(regex);

    if (match && match.length === 3) {
      const seconds = parseInt(match[1], 10);
      const nanoseconds = parseInt(match[2], 10);
      const milliseconds = seconds * 1000 + nanoseconds / 1e6;

      const date = new Date(milliseconds);
      // Customize the format as needed
      const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");

      return formattedDate;
    } else {
      return 'Invalid timestamp format';
    }
  }

  goBack() {
    // this.router.navigate(['/dashboard']);
    window.history.back();
  }

}
