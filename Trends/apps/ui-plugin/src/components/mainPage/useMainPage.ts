import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";

import {MainPageProps} from "./MainPage";
import {getProduct} from "../../api/product/product";
import {productDataAdapter} from "./mainPage.services";
import {insightsMock} from "../insights/insights.mock";
import {useChart} from "../chart/useChart";
import {useSettings} from "../settings/useSettings";

export const useMainPage = ():MainPageProps =>{
  const [showTrends , setShowTrends] = useState(true)
  const {openSettings,...settingsProps} = useSettings()
  const [url,setUrl] = useState('')

  const { data, isLoading } = useQuery({
    queryKey:[url],
    queryFn:() => getProduct('1'),
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
    onClick:() => setShowTrends((prevState)=>!prevState),
    insights:data?.insights || insightsMock,
    chartProps:data?.chartProps || useChart(),
    openSettings,
    settingsProps
  }
}
