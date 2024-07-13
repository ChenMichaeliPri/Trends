import { StoresData} from "../../components/chart/chart.types";

export type FetchedProduct = {
  productId: number,
  min: number,
  max: number,
  average: number,
  standardDeviation:number,
  data:StoresData,
  insights:string
}
