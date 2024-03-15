import axios from "axios";
import { AddCart } from "../interfaces/Cart";
import { cartActions } from "./cartSlice";
import { displayProductActions } from "./productSlice";
import { getAuthToken } from "../util/authentication/tokenAuth";
import { API_ERR_MSG, CARTS_API, ERR_MSG } from "../constants/constants";
import { AppDispatch } from "./index";

const url = process.env.REACT_APP_URLAPI;

export const addToCart = (cart: AddCart) => {
  const token = getAuthToken();
  return async (dispatch: AppDispatch) => {
    try {
      await axios.post(
        url + CARTS_API,
        {
          ...cart,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(getCartData());
    } catch (error: any) {
      if (error.response) {
        if (error.response.data.message === ERR_MSG.INVALID_TOKEN) {
          window.alert(API_ERR_MSG.INVALID_API_TOKEN);
          return;
        }
      }
      window.alert(API_ERR_MSG.ERROR_ADDING_CART);
    }
  };
};

export const getCartData = () => {
  const token = getAuthToken();
  return async (dispatch: AppDispatch) => {
    const fetchCartData = async () => {
      const response = await axios.get(url + `${CARTS_API}/cart-details`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(displayProductActions.setLoading(false));
      return response.data.data;
    };

    try {
      const cartData = await fetchCartData();
      dispatch(
        cartActions.replaceCart({
          cart: cartData.cartProductDetails || [],
          totalQuant: cartData.totalItems,
          totalAmount: cartData.totalAmount,
          userName: cartData.firstName,
        })
      );
    } catch (error: any) {
      if (error.response) {
        if (error.response.data.message === ERR_MSG.INVALID_TOKEN) {
          window.alert(API_ERR_MSG.INVALID_API_TOKEN);
          return;
        }
      }
      window.alert(API_ERR_MSG.ERROR_FETCHING_CART);
    }
  };
};

export const clearCartData = () => {
  const token = getAuthToken();
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(displayProductActions.setLoading(true));
      await axios.delete(url + `${CARTS_API}/_clear-cart`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(getCartData());
      dispatch(displayProductActions.setLoading(false));
    } catch (error: any) {
      if (error.response.data.message === ERR_MSG.INVALID_TOKEN) {
        window.alert(API_ERR_MSG.INVALID_API_TOKEN);
        return;
      }
      window.alert(API_ERR_MSG.ERROR_CLEARING_CART);
    }
  };
};
