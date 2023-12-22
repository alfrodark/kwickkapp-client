import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BillingService } from '../../services/billing.service';
import { BillingDeleteDialogComponent } from '../billing-delete-dialog/billing-delete-dialog.component';

@Component({
  selector: 'app-billing-delete',
  template: `
  <button mat-icon-button (click)="openDialog()">
    <mat-icon color="warn">delete</mat-icon>
  </button>
`,
  styleUrl: './billing-delete.component.css'
})
export class BillingDeleteComponent {

  @Input()
  clientId!: string;
  @Input()
  billingId!: string;

  constructor(
    private dialog: MatDialog,
    private billingService: BillingService
    ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(BillingDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.billingService.deleteBilling(this.billingId).then(() => {
          // Handle deletion completion, e.g., navigate to client details
        });
      }
    });
  }
}
