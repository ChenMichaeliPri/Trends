import { variance, mean, re } from "mathjs";
import type { ProductInsights } from './types'
import { IN_MONTH_PERIOD_MAPPING, MONTH_MAPPING, AVERAGE_PRICE_STATUS } from "./consts";

const getInMonthPeriod = (day: number): string => {
    if (day < 11) {
        return IN_MONTH_PERIOD_MAPPING.BEGINNING;
    }

    if (11 <= day && day < 21) {
        return IN_MONTH_PERIOD_MAPPING.MIDDLE;
    }

    return IN_MONTH_PERIOD_MAPPING.END;
};

const getCurrentToAverageStatus = (average: number, currentPrice: number): string => (
    average <= currentPrice ? AVERAGE_PRICE_STATUS.BELOW : AVERAGE_PRICE_STATUS.ABOVE
);

const getCheapestPriceData = (shopToCurrentPriceData: Record<string, PriceRecord>): PriceRecord => {
    let cheapestPriceData = {price: Number.POSITIVE_INFINITY} as  unknown as PriceRecord;

    Object.keys(shopToCurrentPriceData).forEach(shopId => {
        if (shopToCurrentPriceData[shopId].price < cheapestPriceData.price) {
            cheapestPriceData = shopToCurrentPriceData[shopId];
        }
    })

    return cheapestPriceData;
};

const getInsights = (
    minPriceData: PriceRecord,
    maxPriceData: PriceRecord,
    average: number,
    shopToCurrentPriceData: Record<string, PriceRecord>
): string => {
    const recommendedPurchaseMonth = MONTH_MAPPING[minPriceData.timestamp.getMonth()];
    const recommendedInMonthPeriod = getInMonthPeriod(minPriceData.timestamp.getDay());
    const avoidPurchaseMonth = MONTH_MAPPING[maxPriceData.timestamp.getMonth()];
    const avoidInMonthPeriod = getInMonthPeriod(maxPriceData.timestamp.getDay());
    const cheapestPriceData = getCheapestPriceData(shopToCurrentPriceData);
    const currentToAverageStatus = getCurrentToAverageStatus(average, cheapestPriceData.price);

    return `
    According to our data, currently the best price is in ${cheapestPriceData.shopId} - ${cheapestPriceData.price}$.
    This price is ${currentToAverageStatus} average.
    Usually the best time for purchase is ${recommendedInMonthPeriod} of ${recommendedPurchaseMonth}.
    Avoid purchase in ${avoidInMonthPeriod} of ${avoidPurchaseMonth}.
    `;
};

export const getProductStatistics = (productId: number, shopIds: number[], shopToPricesData: Record<number, PriceRecord[]>): ProductInsights => {
    const allShopsPrices = [];
    let shopToCurrentPriceData = {};
    let maxPriceData = {price: -1} as  unknown as PriceRecord;
    let minPriceData = {price: Number.POSITIVE_INFINITY} as  unknown as PriceRecord;

    shopIds.forEach(shopId => {
        shopToPricesData[shopId].forEach(priceData => {
            allShopsPrices.push(priceData.price);

            if (priceData.price < minPriceData.price) {
                minPriceData = priceData;
            }

            if (priceData.price > maxPriceData.price) {
                maxPriceData = priceData;
            }

            if (shopToCurrentPriceData[shopId] && shopToCurrentPriceData[shopId].timestamp < priceData.timestamp) {
                shopToCurrentPriceData[shopId] = priceData;
            }
            else {
                shopToCurrentPriceData[shopId] = {timeStamp: new Date(0)} as  unknown as PriceRecord
            }
        })
    });

    const average = Math.floor(mean(allShopsPrices));
    const priceVariance = Math.floor(variance(allShopsPrices) as unknown as number);
    const insights = getInsights(minPriceData, maxPriceData, average, shopToCurrentPriceData);

    return {
        productId,
        min: minPriceData.price,
        max: maxPriceData.price,
        average,
        variance: priceVariance,
        shopToPricesData,
        insights
    };
}
