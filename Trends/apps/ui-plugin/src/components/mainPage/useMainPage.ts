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
  const [productId,setProductId] = useState('1')
  const [productName,setProductName] = useState('Samsung Galaxy S21 5G (128GB 8GB)')
  const [initialLoading,setInitialLoading] = useState(true);

  const { data, isLoading, refetch } = useQuery({
    queryKey:['insights',productId],
    queryFn:() => getInsights(productId),
    select:(data)=>insightsDataAdapter(data),
    enabled:false
    }
  )

  const { data:storesData, isLoading:isStoresDataLoading, refetch:refetchStoresData } = useQuery({
      queryKey:['prices',productId],
      queryFn:() => getPrices(productId),
      select:(data)=>pricesDataAdapter(data),
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
    refetchStoresData();
    setInitialLoading(false)
  }, []);

  return {
    productName,
    showTrends,
    onClick:() => setShowTrends((prevState)=>!prevState),
    insights: insightsMock,
    chartData:  chartDataMock,
    storesData:storesData || storesDataMock,
    openSettings,
    userSettings:formState,
    settingsProps:{...settingsProps,formState},
    isLoading:initialLoading || isLoading
  }
}
