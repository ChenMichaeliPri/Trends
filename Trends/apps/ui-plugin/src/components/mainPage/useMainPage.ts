import {MainPageProps} from "./MainPage";
import {useState} from "react";

export const useMainPage = ():MainPageProps =>{
  const [showChart , setShowChart] = useState(true)
  return {
    productName:'iPhone 15 Pro Max',
    showChart,
    onClick:() => setShowChart((prevState)=>!prevState)
  }
}
