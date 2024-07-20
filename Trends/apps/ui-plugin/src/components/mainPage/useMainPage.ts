import {useEffect, useState} from "react";
import { useQuery} from "@tanstack/react-query";

import {MainPageProps} from "./MainPage";
import {getInsights} from "../../api/insights/insights";
import {insightsDataAdapter, pricesDataAdapter} from "./mainPage.services";
import {insightsMock} from "../insights/insights.mock";
import {useSettings} from "../settings/useSettings";
import {chartDataMock, storesDataMock} from "../chart/chart.mock";
import {getPrices} from "../../api/prices/prices";

export const useMainPage = ():MainPageProps & {isLoading:boolean} =>{
  const [showTrends , setShowTrends] = useState(true)
  const {openSettings,formState,...settingsProps} = useSettings()
  const [productId,setProductId] = useState('')
  const [productName,setProductName] = useState('')
  const [initialLoading,setInitialLoading] = useState(true);

  const { data:insightsData, isLoading:isInsightsDataLoading} = useQuery({
    queryKey:['insights',productId],
    queryFn:() => getInsights(productId),
    select:(data)=>insightsDataAdapter(data),
    enabled:!!productId,
    staleTime:Infinity
    }
  )

  const { data:storesData, isLoading:isStoresDataLoading} = useQuery({
      queryKey:['prices',productId],
      queryFn:() => getPrices(productId),
      select:(data)=>pricesDataAdapter(data),
      enabled:!!productId,
      staleTime:Infinity
    }
  )


  useEffect(() => {
    chrome?.runtime?.sendMessage({ message: "get_url" }, (response) => {
      if (response && response.url) {
        console.log('Production')
        console.log(`Current URL: ${response.url}`);
        const parsedUrl = new URL(response.url);
        const searchParams = new URLSearchParams(parsedUrl.search)
        setProductId(searchParams.get('productId') || '')
        setProductName(searchParams.get('productName')|| 'Cant find query params')
      }
    });
    if (!chrome?.runtime){
        console.log('Dev');
        setProductId('1');
        setProductName( 'Samsung Galaxy S21 5G (128GB 8GB)');
    }
    setInitialLoading(false)
    return () => setInitialLoading(true)
  }, []);

  return {
    productName,
    showTrends,
    onClick:() => setShowTrends((prevState)=>!prevState),
    insights: insightsData?.insights || insightsMock,
    chartData: insightsData?.chartData || chartDataMock,
    storesData:storesData || storesDataMock,
    openSettings,
    userSettings:formState,
    settingsProps:{...settingsProps,formState},
    isLoading:initialLoading || isInsightsDataLoading || isStoresDataLoading
  }
}
