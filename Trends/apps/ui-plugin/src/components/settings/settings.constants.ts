import {UserSettings} from "./settings.types";

export const defaultSettings:UserSettings={
  inDarkMode:false,
  showCurrentPrice:true,
  showMinPrice:true,
  showMaxPrice:true,
  showAveragePrice:true,
  showStandardDeviation:true,
  showAmazonData:true,
  showKSPData:true,
  showIvoryData:true
}

export const SETTINGS = {
  GENERAL_SETTINGS:'General Settings',
  USE_DARK_MODE:'Use Dark Mode',
  PRICES:'Prices',
  SHOW_CURRENT:'Show Current Price',
  SHOW_MIN:'Show Min',
  SHOW_MAX:'Show Max',
  SHOW_AVERAGE:'Show Average',
  SHOW_STD:'Show Standard Deviation',
  STORES_DATA:'Stores Data',
  SHOW_AMAZON:'Show Amazon',
  SHOW_KSP:'Show KSP',
  SHOW_IVORY:'Show Ivory',
  RESET:'Reset To Default',
  CLOSE:'Close'


}