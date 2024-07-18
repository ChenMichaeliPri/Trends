import {axiosInstance} from "../axiosInstance";
import { ROUTES} from "../routes";

export const getInsights = async (productID:string) => {
  const { data } = await axiosInstance.get(`${ROUTES.INSIGHTS}/${productID}`)
  const fetchedInsights = data[0]['insights']
  console.log(fetchedInsights)
  return fetchedInsights
}
