import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillingService } from '../../services/billing.service';
import { Client } from '../../models/client.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Billing } from '../../models/billing.model';

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrl: './billing-form.component.css'
})
export class BillingFormComponent implements OnInit  {

  @Input()
  clientId!: string;
  billing!: Billing | any;

  billingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private billingService: BillingService
    ) {
    this.createForm();
  }

  ngOnInit(): void {

  }

  createForm(): void {
    this.billingForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      reasons: ['', Validators.required],
      date: [new Date(), Validators.required],
      // Add other billing-related fields as needed
    });
  }

  addBilling(): void {
    if (this.billingForm.valid) {
      const billingData = this.billingForm.value;
      this.billingService.addBilling(this.clientId, billingData);
      this.billingForm.reset();
    }
  }


}
