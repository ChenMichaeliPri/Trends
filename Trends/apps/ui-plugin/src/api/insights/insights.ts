import {axiosInstance} from "../axiosInstance";
import { ROUTES} from "../routes";
import {FetchedInsights} from "./insights.types";

export const getInsights = async (productID:string) => {
  const { data } = await axiosInstance.get(`${ROUTES.INSIGHTS}/${productID}`)
  const fetchedInsights:FetchedInsights = data[0]['insights']
  console.log(fetchedInsights)
  return fetchedInsights
}
