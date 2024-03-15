export interface PaymentResponse {
    id: string;
    amount: number;
    verifyPayment: string;
    clientSecret: string;
    status: string;
  }