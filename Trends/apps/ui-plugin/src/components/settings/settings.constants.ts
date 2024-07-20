import {UserSettings} from "./settings.types";

export const defaultSettings:UserSettings={
  inDarkMode:false,
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
  USE_DARK_MODE:'Dark Mode',
  PRICES:'Prices',
  SHOW_MIN:'Min',
  SHOW_MAX:'Max',
  SHOW_AVERAGE:'Average',
  SHOW_STD:'Standard Deviation',
  STORES_DATA:'Stores Data',
  SHOW_AMAZON:'Amazon',
  SHOW_KSP:'KSP',
  SHOW_IVORY:'Ivory',
  RESET:'Reset To Default',
  CLOSE:'Close'


}
