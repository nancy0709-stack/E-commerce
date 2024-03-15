import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "../interfaces/CartItem";

const initialState: CartState = {
  cart: [],
  totalQuant: 0,
  totalAmount: 0,
  userName: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart: (state, action: PayloadAction<CartState>) => {
      const { totalQuant, cart, totalAmount, userName } = action.payload;
      state.totalQuant = totalQuant;
      state.cart = cart;
      state.totalAmount = totalAmount;
      state.userName = userName;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
