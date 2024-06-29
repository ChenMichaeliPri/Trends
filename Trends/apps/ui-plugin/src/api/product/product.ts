import {axiosInstance} from "../axiosInstance";
import { ROUTES} from "../routes";
import {productMock} from "./product.mock";

export const getProduct = async (productID:string) => {
  const { data } = await axiosInstance.get(ROUTES.INSIGHTS,{params:{productID:productID}})
  return data
}

export const getProductMock = async (productID:string) => {
  const data = await new Promise(resolve => setTimeout(resolve, 1000));
};
