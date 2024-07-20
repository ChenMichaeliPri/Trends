export type FetchedInsights = {
  productId: number,
  min: number,
  max: number,
  average: number,
  standardDeviation:number,
  shopToCurrentPriceData:Record<number,{price:number}>,
  insights:string,
  histogramData:Record<number, number[]>
}
