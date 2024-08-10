import _ from 'lodash';
import { variance, mean } from "mathjs";
import { ProductInsights } from './types';
import { IN_MONTH_PERIOD_MAPPING, MONTH_MAPPING, AVERAGE_PRICE_STATUS, DISTRIBUTION_CHUNK_SIZE, YEARS_TO_MEASURE_DISTRIBUTION } from "./consts";
import { PriceRecord, Shop } from '../../data-models/sql-data-models';
import { addDays, subDays } from 'date-fns';


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

const getDistributionData = (
    shopIds: number[],
    shopToPricesData: Record<number, PriceRecord[]>,
    cheapestPriceData: PriceRecord,
    timeframeChunkSize: number,
    yearsToMeasure: number
): {percentsHigherThanCurrentPrice: number; shopToAveragesOfChunkedPrices: Record<number, number[]>} => {

    const {shopId: cheapestShopId, price: cheapestPrice} = cheapestPriceData;
    const filteredShopToPricesData: Record<number, number[]> = {};
    const shopToAveragesOfChunkedPrices: Record<number, number[]> = {};
    const currentDate = new Date();
    const fromDate = new Date();
    fromDate.setFullYear(currentDate.getFullYear() - yearsToMeasure);

    shopIds.forEach(shopId => {
        filteredShopToPricesData[shopId] = shopToPricesData[shopId]
            .filter((priceData: PriceRecord) => fromDate < priceData.timestamp)
            .map((priceData: PriceRecord) => priceData.price)
    });

    shopIds.forEach(shopId => {
        shopToAveragesOfChunkedPrices[shopId] =
        _.chunk(filteredShopToPricesData[shopId], timeframeChunkSize)
        .map((priceDataChunk: number[]) => 
            Math.floor(mean(priceDataChunk))
        )
    });

    const greaterThanCheapestPrice = shopToAveragesOfChunkedPrices[cheapestShopId].filter(price => cheapestPrice < price);
    const percentsHigherThanCurrentPrice = Math.floor((greaterThanCheapestPrice.length / shopToAveragesOfChunkedPrices[cheapestShopId].length) * 100);

    return {percentsHigherThanCurrentPrice, shopToAveragesOfChunkedPrices};
};

const getCheapestHighestPriceMonthData = (shopIds: number[], shopToPricesData: Record<number, PriceRecord[]>): {
    minMonthPrice: number;
    minMonthIndex: number;
    maxMonthPrice: number;
    maxMonthIndex: number;
    minPriceRecordOfMinMonth: PriceRecord;
} => {
    const dataInEachMonth = new Array(12).fill(0);
    const overallPricesInEachMonth = new Array(12).fill(0);
    const cheapestMonthRecords = new Array(12).fill(null);

    shopIds.forEach(shopId => {
        shopToPricesData[shopId].forEach(priceRecord => {
            const monthOfPrice = priceRecord.timestamp.getMonth();
            dataInEachMonth[monthOfPrice]++;
            overallPricesInEachMonth[monthOfPrice] += Number(priceRecord.price);
            const priceRecordMonth = priceRecord.timestamp.getMonth();
            const monthCheapestRecord = cheapestMonthRecords[priceRecordMonth];

            if (!monthCheapestRecord) {
                cheapestMonthRecords[priceRecordMonth] = priceRecord;
            }
            else {
                if (priceRecord.price < monthCheapestRecord.price) {
                    cheapestMonthRecords[priceRecordMonth] = priceRecord;
                }
            }
        })
    });

    const monthData = {
        minMonthPrice: Number.POSITIVE_INFINITY,
        minMonthIndex: -1,
        maxMonthPrice: Number.NEGATIVE_INFINITY,
        maxMonthIndex: -1,
        minPriceRecordOfMinMonth: null
    }

    overallPricesInEachMonth.forEach((overallPrice, i) => {
        const monthAveragePrice = Math.floor(overallPrice / dataInEachMonth[i]);

        if (monthAveragePrice < monthData.minMonthPrice) {
            monthData.minMonthPrice = monthAveragePrice;
            monthData.minMonthIndex = i;
        }

        if (monthAveragePrice > monthData.maxMonthPrice) {
            monthData.maxMonthPrice = monthAveragePrice;
            monthData.maxMonthIndex = i;
        }
    })

    monthData.minPriceRecordOfMinMonth = cheapestMonthRecords[monthData.minMonthIndex];

    return monthData;
};

const getExpectingPriceDrop = (
    shopToPricesData: Record<number, PriceRecord[]>
): string => {
    try {
        const today = new Date();
        const oneYearAgo = subDays(today, 365);
        const oneYearAgoStart = oneYearAgo;
        const oneYearAgoEnd = addDays(oneYearAgo, 7);

        let totalChange = 0;
        let totalObservations = 0;

        for (const shopId in shopToPricesData) {
            const records = shopToPricesData[shopId];

            // Filter records from one year ago to one year ago plus one week
            const filteredRecords = records.filter(record => {
                return record.timestamp >= oneYearAgoStart && record.timestamp <= oneYearAgoEnd;
            });

            // Sort records by timestamp to ensure chronological order
            const sortedRecords = filteredRecords.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

            // Calculate price changes
            for (let i = 1; i < sortedRecords.length; i++) {
                const previousRecord = sortedRecords[i - 1];
                const currentRecord = sortedRecords[i];

                // Calculate the price change
                const priceChange = currentRecord.price - previousRecord.price;
                const daysDifference = (currentRecord.timestamp.getTime() - previousRecord.timestamp.getTime()) / (1000 * 60 * 60 * 24);

                if (daysDifference > 0) {
                    totalChange += priceChange / daysDifference; // Normalize change per day
                    totalObservations++;
                }
            }
        }

        // Calculate average daily price change
        const averageDailyChange = totalChange / totalObservations;

        if (averageDailyChange > 0) {
            return "The price is expected to go up in the next week.";
        } else if (averageDailyChange < 0) {
            return "The price is expected to go down in the next week.";
        } else {
            return "The price is expected to remain stable in the next week.";
        }
    }
    catch (error) {
        return "";
    }
};

const getInsights = (
    average: number,
    standardDeviation: number,
    shopToCurrentPriceData: Record<string, PriceRecord>,
    dbShopsData: Shop[],
    shopToPricesData: Record<number, PriceRecord[]>,
    shopIds: number[]
): {promptText: string, histogramData: Record<number, number[]>} => {
    const {minMonthIndex, minMonthPrice, maxMonthIndex, maxMonthPrice, minPriceRecordOfMinMonth} = getCheapestHighestPriceMonthData(shopIds, shopToPricesData);
    const recommendedInMonthPeriod = getInMonthPeriod(minPriceRecordOfMinMonth.timestamp.getDay());
    const cheapestPriceData = getCheapestPriceData(shopToCurrentPriceData);
    const currentToAverageStatus = getCurrentToAverageStatus(average, cheapestPriceData.price);
    const cheapestPriceShopName = getShopName(cheapestPriceData, dbShopsData);
    const pricePrediction = getExpectingPriceDrop(shopToPricesData);
    const {percentsHigherThanCurrentPrice, shopToAveragesOfChunkedPrices} = getDistributionData(
        shopIds,
        shopToPricesData,
        cheapestPriceData,
        DISTRIBUTION_CHUNK_SIZE,
        YEARS_TO_MEASURE_DISTRIBUTION
    );

    const promptText = `According to our data, the current best price is in ${cheapestPriceShopName} - approximately ${Math.round(cheapestPriceData.price)}$.This is ${currentToAverageStatus} than the average price of ${average}$.This week the price is lower than ${percentsHigherThanCurrentPrice}% of the weeks for the past ${YEARS_TO_MEASURE_DISTRIBUTION} years.With a standard deviation of ${standardDeviation}$ from average, determine whether its worth waiting for a better deal.Usually the best time for purchase is ${recommendedInMonthPeriod} of ${MONTH_MAPPING[minMonthIndex]} with average price of ${minMonthPrice}$.Its advisable to avoid purchasing at ${MONTH_MAPPING[maxMonthIndex]} with average price of ${maxMonthPrice}$. ${pricePrediction}`;

    return {promptText, histogramData: shopToAveragesOfChunkedPrices};
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
        shopToPricesData[shopId].sort(((priceData1, priceData2) => (
            priceData1.timestamp <= priceData2.timestamp ? -1 : 1
        )))
    });

    shopIds.forEach(shopId => {
        shopToPricesData[shopId].forEach(priceData => {
            allShopsPrices.push(Number(priceData.price));

            if (Number(priceData.price) < Number(minPriceData.price)) {
                minPriceData = priceData;
            }

            if (Number(priceData.price) > Number(maxPriceData.price)) {
                maxPriceData = priceData;
            }
            
            if (shopToCurrentPriceData[shopId] === undefined) {
                shopToCurrentPriceData[shopId] = {timestamp: new Date(0)} as  unknown as PriceRecord;
            }

            if (shopToCurrentPriceData[shopId].timestamp < priceData.timestamp) {
                shopToCurrentPriceData[shopId] = priceData;
            }
        })
    });

    const average = Math.floor(mean(allShopsPrices));
    const standardDeviation = Math.floor(Math.sqrt(variance(allShopsPrices) as unknown as number));
    const {promptText, histogramData} = getInsights(
        average,
        standardDeviation,
        shopToCurrentPriceData,
        dbShopsData,
        shopToPricesData,
        shopIds
    );
    
    return {
        productId,
        min: minPriceData.price,
        max: maxPriceData.price,
        average,
        standardDeviation,
        shopToCurrentPriceData,
        insights: promptText,
        histogramData
    };
}
