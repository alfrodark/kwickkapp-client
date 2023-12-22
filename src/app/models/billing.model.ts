
export interface Billing {
    billingId?: string;
    clientId: string;
    invoiceNumber: string;
    amount: number;
    reasons: string;
    date: Date;
    // Add other billing-related fields as needed
  }
