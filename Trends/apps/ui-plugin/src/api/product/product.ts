import {axiosInstance} from "../axiosInstance";
import { ROUTES} from "../routes";
import {FetchedProduct} from "./product.types";

export const getProduct = async (productID:string) => {
  const { data } = await axiosInstance.get(`${ROUTES.INSIGHTS}/${productID}`)
  const fetchedProduct:FetchedProduct = data[0]['insights']
  console.log(fetchedProduct)
  return fetchedProduct
}
