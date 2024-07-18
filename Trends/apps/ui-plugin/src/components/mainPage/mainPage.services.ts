import {FetchedInsights} from "../../api/insights/insights.types";
import {ChartData} from "../chart/chart.types";

export const productDataAdapter = (data:string) :{chartData:ChartData,insights:string,histogramData:Record<number, number[]>} =>{
  const parsedData:FetchedInsights = JSON.parse(data)
  console.log(parsedData)
  return ({
    chartData: {
      minPrice: parsedData.min,
      maxPrice: parsedData.max,
      averagePrice: parsedData.average,
      standardDeviation: parsedData.standardDeviation
    },
    insights: parsedData.insights,
    histogramData: parsedData.histogramData
  })
}
