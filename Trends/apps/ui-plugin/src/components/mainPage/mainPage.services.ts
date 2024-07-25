import {format} from 'date-fns';

import {FetchedInsights, PriceRecord} from "../../api/insights/insights.types";
import {DataPoint, StoresData} from "../chart/chart.types";
import {FetchedPrices, Price} from "../../api/prices/prices.types";
import {dateFormat} from "./mainPage.constants";
import {shopIdToNameMap} from "../chart/chart.constants";
import {PricesData} from "./mainPage.types";

export const insightsDataAdapter = (data: FetchedInsights): { pricesData: PricesData, insights: string, histogramData: Record<number, number[]> } => {
    return ({
        pricesData: {
            minPrice: data.min,
            maxPrice: data.max,
            averagePrice: data.average,
            standardDeviation: data.standardDeviation,
            ...getCheapestPriceData(data.shopToCurrentPriceData)
        },
        insights: data.insights,
        histogramData: data.histogramData
    })
}

const priceAdapter = ({price, timestamp}: Price): DataPoint => ({
    price,
    date: format(new Date(timestamp), dateFormat)
});
export const pricesDataAdapter = (data: FetchedPrices): StoresData => (
    {
        1: data.find(({shopId}) => shopId === 1)?.prices.map(priceAdapter),
        2: data.find(({shopId}) => shopId === 2)?.prices.map(priceAdapter),
        3: data.find(({shopId}) => shopId === 3)?.prices.map(priceAdapter)
    }
)

export const getCheapestPriceData = (shopToCurrentPriceData: Record<number, PriceRecord>) => {
    const cheapestPriceRecord = Object.values(shopToCurrentPriceData).reduce((cheapest, current) => {
        return current.price < (cheapest?.price || Infinity) ? current : cheapest;
    }, {} as PriceRecord);

    return {
        cheapestStorePrice: cheapestPriceRecord.price,
        cheapestStoreName: shopIdToNameMap[cheapestPriceRecord.shopId].storeName
    }
};
