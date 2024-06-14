import {MainPageProps} from "./MainPage";
import {useState} from "react";

export const useMainPage = ():MainPageProps =>{
  const [showTrends , setShowTrends] = useState(true)
  return {
    productName:'iPhone 15 Pro Max',
    showTrends,
    onClick:() => setShowTrends((prevState)=>!prevState)
  }
}
