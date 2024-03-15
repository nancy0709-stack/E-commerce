import axios, { AxiosResponse } from "axios";
import { API_ERR_MSG, PRODUCTS__API } from "../../constants/constants";
import { DisplayProduct } from "../../interfaces/Product";
const url = process.env.REACT_APP_URLAPI;

export const filterApi = async (
  tag: string,
  sortBy: string | null
): Promise<DisplayProduct | undefined> => {
  try {
    let apiUrl: string = url + PRODUCTS__API;

    if (tag !== "All Products") {
      apiUrl += `?q=${tag}`;
    }

    const response: AxiosResponse = await axios.get(apiUrl);
    return response.data.data;
  } catch (error: any) {
    window.alert(API_ERR_MSG.ERROR_FILTERING_DATA);
  }
};
