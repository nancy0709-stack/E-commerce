export interface AddCardProps {
  showAddCard: (flag: boolean, message: string) => void;
}
export interface FormState {
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
  name: string;
}
export interface AddCardResponse {
  success: boolean;
  statusCode: number;
  data: any;
  message: string;
}
export interface CardData {
  name: string;
  cardID: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}
export interface InputField {
  label: string;
  name: string;
}
