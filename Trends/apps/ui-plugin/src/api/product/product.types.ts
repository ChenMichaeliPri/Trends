import { StoresData} from "../../components/chart/chart.types";

export type FetchedProduct = {
  productId: number,
  min: number,
  max: number,
  average: number,
  standardDeviation:number,
  shopToPricesData:StoresData,
  insights:string,
  histogramData:Record<number, number[]>
}
