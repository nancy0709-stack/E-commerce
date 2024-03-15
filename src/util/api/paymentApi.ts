import axios, { AxiosResponse } from "axios";
import { API_ERR_MSG, ERR_MSG, PAYMENTS_API } from "../../constants/constants";
import { getAuthToken } from "../authentication/tokenAuth";
import {
  CardData,
  FormState,
  AddCardResponse,
} from "../../interfaces/AddCard";
import { PaymentResponse } from "../../interfaces/Payment";
const url = process.env.REACT_APP_URLAPI;

export const getCardsApi = async (): Promise<CardData[] | undefined> => {
  const token: string | null = getAuthToken();
  try {
    const response: AxiosResponse = await axios.get(
      url + `${PAYMENTS_API}/payment-methods`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data.data.cardsList;
  } catch (error: any) {
    if (error.response.data.message === ERR_MSG.INVALID_TOKEN) {
      window.alert(API_ERR_MSG.INVALID_API_TOKEN);
      return;
    } else {
      window.alert(API_ERR_MSG.ERROR_GETTING_CARD);
    }
    return error.response.data.message;
  }
};

export const addCardApi = async (
  data: FormState
): Promise<AddCardResponse | undefined> => {
  const token: string | null = getAuthToken();
  try {
    const response: AxiosResponse = await axios.post(
      url + `${PAYMENTS_API}/payment-methods`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.data.message === ERR_MSG.INVALID_TOKEN) {
        window.alert(API_ERR_MSG.INVALID_API_TOKEN);
        return;
      }
      return error.response.data;
    }
  }
};

export const makePaymentApi = async (
  data: string
): Promise<PaymentResponse | undefined> => {
  const token: string | null = getAuthToken();
  try {
    const response: AxiosResponse = await axios.post(
      url + `${PAYMENTS_API}/_make-payment`,
      {
        paymentMethod: data,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    if (error.response.data.message === ERR_MSG.INVALID_TOKEN) {
      window.alert(API_ERR_MSG.INVALID_API_TOKEN);
      return;
    }
    window.alert(API_ERR_MSG.ERROR_MAKING_PAYMENT);
  }
};
