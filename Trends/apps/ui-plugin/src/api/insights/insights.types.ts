import {PriceRecord} from "../../../../api-price-insights/src/app/data-models/sql-data-models"

export type FetchedInsights = {
  productId: number,
  min: number,
  max: number,
  average: number,
  standardDeviation:number,
  shopToCurrentPriceData:Record<number,PriceRecord>,
  insights:string,
  histogramData:Record<number, number[]>
}
