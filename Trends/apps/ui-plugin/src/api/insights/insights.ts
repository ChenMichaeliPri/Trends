import { log } from "console";
import {axiosInstance} from "../axiosInstance";
import { ROUTES} from "../routes";
import {FetchedInsights} from "./insights.types";

export const getInsights = async (productID:string) => {
  const { data } = await axiosInstance.get(`${ROUTES.INSIGHTS}/${productID}`);
  data.insights = data.insights.split('^').join('\n');

  const fetchedInsights:FetchedInsights = data
  return fetchedInsights
}
