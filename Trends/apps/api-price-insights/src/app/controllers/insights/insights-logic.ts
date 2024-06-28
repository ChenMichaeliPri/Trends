import { variance, mean } from "mathjs";
import { ProductInsights } from './types';
import { IN_MONTH_PERIOD_MAPPING, MONTH_MAPPING, AVERAGE_PRICE_STATUS } from "./consts";

const getInMonthPeriod = (day: number): string => {
    if (day < IN_MONTH_PERIOD_MAPPING.BEGINNING_DAY) {
        return IN_MONTH_PERIOD_MAPPING.BEGINNING;
    }

    if (IN_MONTH_PERIOD_MAPPING.BEGINNING_DAY <= day && day < IN_MONTH_PERIOD_MAPPING.END_DAY) {
        return IN_MONTH_PERIOD_MAPPING.MIDDLE;
    }

    return IN_MONTH_PERIOD_MAPPING.END;
};

const getCurrentToAverageStatus = (average: number, currentPrice: number): string => (
    average <= currentPrice ? AVERAGE_PRICE_STATUS.HIGHER : AVERAGE_PRICE_STATUS.LOWER
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

const getShopName = (priceData: PriceRecord, dbShopsData: Shop[]): string => {
    return dbShopsData.filter(shop => (
        shop.id === priceData.shopId
    ))[0].name;
};

const getInsights = (
    minPriceData: PriceRecord,
    maxPriceData: PriceRecord,
    average: number,
    standardDeviation: number,
    shopToCurrentPriceData: Record<string, PriceRecord>,
    dbShopsData: Shop[]
): string => {
    const recommendedPurchaseMonth = MONTH_MAPPING[minPriceData.timestamp.getMonth()];
    const recommendedInMonthPeriod = getInMonthPeriod(minPriceData.timestamp.getDay());
    const avoidPurchaseMonth = MONTH_MAPPING[maxPriceData.timestamp.getMonth()];
    const avoidInMonthPeriod = getInMonthPeriod(maxPriceData.timestamp.getDay());
    const cheapestPriceData = getCheapestPriceData(shopToCurrentPriceData);
    const currentToAverageStatus = getCurrentToAverageStatus(average, cheapestPriceData.price);
    const cheapestPriceShopName = getShopName(cheapestPriceData, dbShopsData);
    const minPriceShopName = getShopName(minPriceData, dbShopsData);

    return `
    According to our data, the current best price is in ${cheapestPriceShopName} - approximately ${cheapestPriceData.price}$.
    This is ${currentToAverageStatus} than the average price of ${average}$.
    With a standard deviation of ${standardDeviation}$, you can determine whether its worth waiting for a better deal.
    Usually the best time for purchase is ${recommendedInMonthPeriod} of ${recommendedPurchaseMonth} in ${minPriceShopName} with prices around ${Math.floor(minPriceData.price)}$.
    Its advisable to avoid purchasing at the ${avoidInMonthPeriod} of ${avoidPurchaseMonth}.
    `;
};

export const getProductStatistics = (
    productId: number,
    shopIds: number[],
    dbShopsData: Shop[],
    shopToPricesData: Record<number, PriceRecord[]>
): ProductInsights => {
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
            
            if (shopToCurrentPriceData[shopId] === undefined) {
                shopToCurrentPriceData[shopId] = {timestamp: new Date(0)} as  unknown as PriceRecord;
                console.log({shopToCurrentPriceData});
            }

            if (shopToCurrentPriceData[shopId].timestamp < priceData.timestamp) {
                shopToCurrentPriceData[shopId] = priceData;
            }
        })
    });

    const average = Math.floor(mean(allShopsPrices));
    const standardDeviation = Math.floor(Math.sqrt(variance(allShopsPrices) as unknown as number));
    const insights = getInsights(minPriceData, maxPriceData, average, standardDeviation, shopToCurrentPriceData, dbShopsData);

    return {
        productId,
        min: minPriceData.price,
        max: maxPriceData.price,
        average,
        standardDeviation,
        shopToCurrentPriceData,
        insights
    };
}
