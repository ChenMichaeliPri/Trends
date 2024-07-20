import {UIStore} from "./chart.types";

export const CHART = {
  CURRENT_PRICE_TEXT: 'Current Price: {currentPrice}$',
  MIN_PRICE_TEXT:'Min Price: {minPrice}$',
  MAX_PRICE_TEXT:'Max Price: {maxPrice}$',
  AVERAGE_PRICE_TEXT:'Average Price: {averagePrice}$',
  STANDARD_DEVIATION_TEXT:'Standard Deviation: {standardDeviation}',
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