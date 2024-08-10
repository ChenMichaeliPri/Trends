import {axiosInstance} from "../axiosInstance";
import {ROUTES} from "../routes";
import {FetchedPrices} from "./prices.types";

export const getPrices = async (productID:string) => {
  const {data} = await axiosInstance.get(`${ROUTES.PRICES}/${productID}`)
  const fetchedPrices: FetchedPrices = data
  console.log(fetchedPrices)
  return fetchedPrices;
}
