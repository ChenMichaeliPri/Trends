import {FetchedProduct} from "../../api/product/product.types";
import {ComponentProps} from "react";
import {Chart} from "../chart/Chart";
import {storesDataMock} from "../chart/chart.mock";

export const productDataAdapter = (data:FetchedProduct) :{chartProps:ComponentProps<typeof Chart>,insights:string,histogramData:Record<number, number[]>} =>({
  chartProps:{
    minPrice:data.min,
    maxPrice:data.max,
    averagePrice:data.average,
    standardDeviation:data.standardDeviation,
    storesData:storesDataMock,
  },
  insights:data.insights,
  histogramData:data.histogramData
})
