import axios from "axios";
import { displayProductActions } from "./productSlice";
import { API_ERR_MSG, PRODUCTS__API } from "../constants/constants";
import { AppDispatch } from "./index";

const url = process.env.REACT_APP_URLAPI;

export const fetchProductData = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(displayProductActions.setLoading(true));
      const response = await axios.get(url + PRODUCTS__API);
      dispatch(
        displayProductActions.setProductsList({ data: response.data.data })
      );
      dispatch(displayProductActions.setLoading(false));
    } catch (error) {
      dispatch(displayProductActions.setLoading(false));
      window.alert(API_ERR_MSG.ERROR_FETCHING_PRODUCTS);
    }
  };
};
