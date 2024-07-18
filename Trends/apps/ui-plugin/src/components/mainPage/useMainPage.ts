import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";

import {MainPageProps} from "./MainPage";
import {getInsights} from "../../api/insights/insights";
import {productDataAdapter} from "./mainPage.services";
import {insightsMock} from "../insights/insights.mock";
import {useSettings} from "../settings/useSettings";
import {chartDataMock, storesDataMock} from "../chart/chart.mock";

export const useMainPage = ():MainPageProps & {isLoading:boolean} =>{
  const [showTrends , setShowTrends] = useState(true)
  const {openSettings,formState,...settingsProps} = useSettings()
  const [productId,setProductId] = useState('1')
  const [productName,setProductName] = useState('Samsung Galaxy S21 5G (128GB 8GB)')
  const [initialLoading,setInitialLoading] = useState(true);
  const { data, isLoading, refetch } = useQuery({
    queryKey:[productId],
    queryFn:() => getInsights(productId),
    select:(data)=>productDataAdapter(data),
    enabled:false
    }
  )

  useEffect(() => {
    chrome?.runtime?.sendMessage({ message: "get_url" }, (response) => {
      if (response && response.url) {
        console.log(`Current URL: ${response.url}`);
        const parsedUrl = new URL(response.url);
        const searchParams = new URLSearchParams(parsedUrl.search)
        setProductId(searchParams.get('productId') || '')
        setProductName(searchParams.get('productName')|| '')
      }
      else{
        setProductId( '1')
        setProductName( 'Samsung Galaxy S21 5G (128GB 8GB)')
      }
    });
    refetch();
    setInitialLoading(false)
  }, []);

  return {
    productName,
    showTrends,
    onClick:() => setShowTrends((prevState)=>!prevState),
    insights:data?.insights || insightsMock,
    chartData: data?.chartData || chartDataMock,
    storesData:storesDataMock,
    openSettings,
    userSettings:formState,
    settingsProps:{...settingsProps,formState},
    isLoading:initialLoading || isLoading
  }
}
