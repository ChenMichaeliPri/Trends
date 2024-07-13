import {FetchedProduct} from "../../api/product/product.types";
import {ComponentProps} from "react";
import {Chart} from "../chart/Chart";
import {Insights} from "../insights/Insights";

export const productDataAdapter = (data:FetchedProduct) :{productName:string,chartProps:ComponentProps<typeof Chart>,insightsProps:ComponentProps<typeof Insights>} =>({
  productName:'Iphone 15 pro max',
  chartProps:{
    minPrice:data.min,
    maxPrice:data.max,
    averagePrice:data.average,
    standardDeviation:data.standardDeviation,
    storesData:data.data,
  },
  insightsProps:{
    insight:data.insights
  }

})
