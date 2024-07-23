import { format } from 'date-fns';

import {FetchedInsights} from "../../api/insights/insights.types";
import {ChartData, DataPoint, StoresData} from "../chart/chart.types";
import {FetchedPrices, Price} from "../../api/prices/prices.types";
import {dateFormat} from "./mainPage.constants";

export const insightsDataAdapter = (data:FetchedInsights) :{chartData:ChartData,insights:string,histogramData:Record<number, number[]>} =>{
  return ({
    chartData: {
      minPrice: data.min,
      maxPrice: data.max,
      averagePrice: data.average,
      standardDeviation: data.standardDeviation,
      shopToCurrentPriceData: data.shopToCurrentPriceData
    },
    insights: data.insights,
    histogramData: data.histogramData
  })
}

const priceAdapter = ({price,timestamp}:Price):DataPoint=>({
  price,
  date:format(new Date(timestamp),dateFormat)
});
export const pricesDataAdapter = (data:FetchedPrices):StoresData =>(
  {
    1:data.find(({shopId})=>shopId === 1)?.prices.map(priceAdapter),
    2:data.find(({shopId})=>shopId === 2)?.prices.map(priceAdapter),
    3:data.find(({shopId})=>shopId === 3)?.prices.map(priceAdapter)
  }
)
