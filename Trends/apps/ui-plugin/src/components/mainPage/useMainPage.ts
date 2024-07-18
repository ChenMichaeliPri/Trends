import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";

import {MainPageProps} from "./MainPage";
import {getProduct} from "../../api/product/product";
import {productDataAdapter} from "./mainPage.services";
import {insightsMock} from "../insights/insights.mock";
import {useSettings} from "../settings/useSettings";
import {charDataMock} from "../chart/chart.mock";

export const useMainPage = ():MainPageProps =>{
  const [showTrends , setShowTrends] = useState(true)
  const {openSettings,formState,...settingsProps} = useSettings()
  const [productId,setProductId] = useState('1')
  const [productName,setProductName] = useState('Samsung Galaxy S21 5G (128GB 8GB)')
  const { data, isLoading } = useQuery({
    queryKey:[productId],
    queryFn:() => getProduct(productId),
    select:(data)=>productDataAdapter(data)
    }
  )

  useEffect(() => {
    chrome?.runtime?.sendMessage({ message: "get_url" }, (response) => {
      if (response && response.url) {
        console.log(`Current URL: ${response.url}`);
        const parsedUrl = new URL(response.url);
        const searchParams = new URLSearchParams(parsedUrl.search)
        setProductId(searchParams.get('productId') || '1')
        setProductName(searchParams.get('productName')|| 'Samsung Galaxy S21 5G (128GB 8GB)')
      }
    });
  }, []);

  return {
    productName,
    showTrends,
    onClick:() => setShowTrends((prevState)=>!prevState),
    insights:data?.insights || insightsMock,
    chartProps:data?.chartProps || charDataMock,
    openSettings,
    userSettings:formState,
    settingsProps:{...settingsProps,formState}
  }
}
