import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingService } from '../../services/billing.service';
import { Billing } from '../../models/billing.model';
import { User } from '../../models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-billing-update',
  templateUrl: './billing-update.component.html',
  styleUrl: './billing-update.component.css'
})
export class BillingUpdateComponent implements OnInit  {

  @Input() clientId: string | any;
  @Input() billingId: string | any;

  // clientId!: string | any;
  // billingId!: string | any;
  billingForm!: FormGroup;
  user!: User | any;
  billing: Observable<Billing> | any;
  billings!: Billing[];
  billingData$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private billingService: BillingService,
    private firestoreService: FirestoreService
  ) {
    this.billingForm = this.fb.group({
      invoiceNumber: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      reasons: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.auth.user.subscribe(userData => {
    this.user = userData;
    this.loadBillingData();
  });
  this.createForm();

  this.billingService.getBillingById(this.clientId, this.billingId).subscribe((billing: Billing) => {
    this.billingForm.patchValue(billing);
  });

  }

  loadBillingData(): void {
      this.billingService.getBillingById(this.clientId, this.billingId).subscribe(data => {
      this.billings = data;
      console.log(this.billingId);
    });
  }

  createForm(): void {
    this.billingForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      reasons: ['', Validators.required],
      date: [new Date(), Validators.required],
      // Add other billing-related fields as needed
    });
  }

  updateBilling(): void {
    if (this.billingForm.valid) {
      const updatedBilling: Billing = {
        id: this.billingId,
        clientId: this.clientId,
        ...this.billingForm.value,
      };

      this.billingService.updateBilling(this.clientId, this.billingId, updatedBilling).then(() => {
        this.router.navigate(['/client-details', this.clientId]);
      });
    }
  }

}
