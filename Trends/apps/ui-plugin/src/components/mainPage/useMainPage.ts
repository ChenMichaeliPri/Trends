import {MainPageProps} from "./MainPage";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getProduct} from "../../api/product/product";
import {productDataAdapter} from "./mainPage.services";

export const useMainPage = ():MainPageProps =>{
  const [showTrends , setShowTrends] = useState(true)
  const [url,setUrl] = useState('')

  const { data, isLoading } = useQuery({
    queryKey:[url],
    queryFn:() => getProduct(url),
    select:(data)=>productDataAdapter(data)
    }
  )

  useEffect(() => {
    chrome?.runtime?.sendMessage({ message: "get_url" }, (response) => {
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
