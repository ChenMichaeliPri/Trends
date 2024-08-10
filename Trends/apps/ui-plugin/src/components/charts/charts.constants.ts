import {UIStore} from "./charts.types";

export const CHART = {
  CURRENT_PRICE_TEXT: 'Current Best Price: {currentPrice}$ from {cheapestStoreName}',
  MIN_PRICE_TEXT:'Min Price: {minPrice}$',
  MAX_PRICE_TEXT:'Max Price: {maxPrice}$',
  AVERAGE_PRICE_TEXT:'Average Price: {averagePrice}$',
  STANDARD_DEVIATION_TEXT:'Standard Deviation: {standardDeviation}$',
  HISTOGRAM_HEADER:'Histogram - Weekly Average Prices Over the Last Two Years',
  TRENDS_HEADER:'Trends - Price Over Time',
  INSIGHTS_HEADER:'Insights - Data Driven Recommendations'
}

export const shopIdToNameMap :Record< string, UIStore> ={
  '1':{
    storeName:'Amazon',
    lineColor:'orange'
  },
  '2':{
    storeName:'KSP',
    lineColor:'blue'
  },
  '3':{
    storeName:'Ivory',
    lineColor:'green'
  }
}
