export type FetchedInsights = {
  productId: number,
  current: number,
  min: number,
  max: number,
  average: number,
  standardDeviation:number,
  shopToCurrentPriceData:Record<number,{price:number}>,
  insights:string,
  histogramData:Record<number, number[]>
}