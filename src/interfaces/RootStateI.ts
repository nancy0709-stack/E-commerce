import { DisplayProduct } from "./Product";
import { CartState } from "./CartItem";
export interface RootState {
  displayProduct: DisplayProduct;
  cart: CartState;
}
