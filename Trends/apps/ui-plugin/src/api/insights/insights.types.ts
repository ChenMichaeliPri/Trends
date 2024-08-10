export type PriceRecord = {
  id: number;
  productId: number;
  shopId: number;
  price: number;
  timestamp: Date;
}

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
