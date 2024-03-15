export interface ICartItems {
  productId: number;
  cartId: number;
  quantity: number;
  totalPrice: number;
  product: {
    vendor: string;
    name: string;
    imageSrc: string;
    price: number;
    tag: string;
  };
  size: {
    id: number;
    size: string;
  };
}

export interface sizes {
  id: number;
  size: string;
}
export interface CartState {
  cart: ICartItems[];
  totalQuant: number;
  totalAmount: number;
  userName: string;
}

