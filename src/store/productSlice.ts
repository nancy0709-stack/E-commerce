import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { DisplayProduct, Product } from "../interfaces/Product";

const initialState: DisplayProduct = {
  products: [],
  totalPages: 0,
  totalRecords: 0,
  isLoading: false,
};

const displayProductSlice  = createSlice({
  name: "displayProduct",
  initialState,
  reducers: {
    setProductsList: (
      state,
      action: PayloadAction<{
        data: { products: Product[]; totalPages: number; totalRecords: number };
      }>
    ) => {
      state.products = action.payload.data.products;
      state.totalPages = action.payload.data.totalPages;
      state.totalRecords = action.payload.data.totalRecords;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const displayProductActions = displayProductSlice.actions;
export default displayProductSlice.reducer;
