import { PriceRecord } from '../../api/insights/insights.types'

export type DataPoint ={
  date:string;
  price:number;
}

export type StoresData = {
  1?:DataPoint[];
  2?:DataPoint[];
  3?:DataPoint[];
}

export type HistogramData = {
  1?:number[];
  2?:number[];
  3?:number[];
}

export type ChartData = {
  minPrice:number,
  maxPrice:number,
  averagePrice:number
  standardDeviation:number,
  shopToCurrentPriceData:Record<number,PriceRecord>,
}

export type UIStore = {
  storeName:string,
  lineColor:string
}
