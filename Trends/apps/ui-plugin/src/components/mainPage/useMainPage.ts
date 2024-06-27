import {MainPageProps} from "./MainPage";
import {useEffect, useState} from "react";

export const useMainPage = ():MainPageProps =>{
  const [showTrends , setShowTrends] = useState(true)
  const [url,setUrl] = useState('')

  useEffect(() => {
    chrome.runtime.sendMessage({ message: "get_url" }, (response) => {
      if (response && response.url) {
        console.log(`Current URL: ${response.url}`);
        setUrl(response.url);
      }
    });
  }, []);

  return {
    productName:'iPhone 15 Pro Max',
    showTrends,
    onClick:() => setShowTrends((prevState)=>!prevState)
  }
}
