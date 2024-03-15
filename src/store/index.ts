import { configureStore, AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import { RootState } from "../interfaces/RootStateI";
import displayProductReducer from "./productSlice";
import cartReducer from './cartSlice'; 


const rootReducer: Reducer<RootState, AnyAction> = combineReducers<RootState>({
  displayProduct: displayProductReducer,
  cart: cartReducer,
});


const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type AppDispatch=typeof store.dispatch;