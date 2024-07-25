import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";

import {MainPageProps} from "./MainPage";
import {getInsights} from "../../api/insights/insights";
import {insightsDataAdapter, pricesDataAdapter} from "./mainPage.services";
import {insightsMock} from "../../api/insights/insights.mock"
import {useSettings} from "../settings/useSettings";
import {pricesDataMock, storesDataMock, histogramDataMock} from "../charts/charts.mock";
import {getPrices} from "../../api/prices/prices";
import {CurrentComponent} from "./mainPage.types";

export const useMainPage = (): MainPageProps & { isLoading: boolean } => {
    const [currentComponent, setCurrentComponent] = useState<CurrentComponent>('graph')
    const {openSettings, formState, ...settingsProps} = useSettings()
    const [productId, setProductId] = useState('')
    const [productName, setProductName] = useState('')
    const [initialLoading, setInitialLoading] = useState(true);

    const {data: insightsData, isLoading: isInsightsDataLoading} = useQuery({
            queryKey: ['insights', productId],
            queryFn: () => getInsights(productId),
            select: (data) => insightsDataAdapter(data),
            enabled: !!productId,
            staleTime: Infinity
        }
    )

    const {data: storesData, isLoading: isStoresDataLoading} = useQuery({
            queryKey: ['prices', productId],
            queryFn: () => getPrices(productId),
            select: (data) => pricesDataAdapter(data),
            enabled: !!productId,
            staleTime: Infinity
        }
    )


    useEffect(() => {
        chrome?.runtime?.sendMessage({message: "get_url"}, (response) => {
            if (response && response.url) {
                console.log('Production')
                console.log(`Current URL: ${response.url}`);
                const parsedUrl = new URL(response.url);
                const searchParams = new URLSearchParams(parsedUrl.search)
                const parsedName = searchParams.get('productName')?.replace(/-/g,' ').replace(/\b\w/g, char => char.toUpperCase());
                setProductId(searchParams.get('productId') || '')
                setProductName(parsedName || 'Cant find query params')
            }
        });
        if (!chrome?.runtime) {
            console.log('Dev');
            setProductId('1');
            setProductName('Samsung Galaxy S21 5G (128GB 8GB)');
        }
        setInitialLoading(false)
        return () => setInitialLoading(true)
    }, []);

    return {
        productName,
        currentComponent,
        setCurrentComponent,
        insights: insightsData?.insights || insightsMock,
        pricesData: insightsData?.pricesData || pricesDataMock,
        storesData: storesData || storesDataMock,
        histogramData: insightsData?.histogramData || histogramDataMock,
        openSettings,
        userSettings: formState,
        settingsProps: {...settingsProps, formState},
        isLoading: initialLoading || isInsightsDataLoading || isStoresDataLoading
    }
}
