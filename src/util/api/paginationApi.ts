import axios, { AxiosResponse } from "axios";
import { API_ERR_MSG, PRODUCTS__API } from "../../constants/constants";
import { Product } from "../../interfaces/Product";

const url = process.env.REACT_APP_URLAPI;

export const paginationApi = async (
  page: number,
  name: string,
  sortBy: string | null
): Promise<Product[] | undefined> => {
  try {
    let apiUrl: string = `${url}${PRODUCTS__API}?page=${page}`;

    if (name !== "All Products") {
      apiUrl += `&q=${name}`;
    }

    if (sortBy) {
      apiUrl += `&sort=${sortBy}`;
    }

    const response: AxiosResponse = await axios.get(apiUrl);
    return response.data.data.products;
  } catch (error: any) {
    window.alert(API_ERR_MSG.ERROR_FETCHING_PAGINATION_DATA);
  }
};
