import { PriceRecord } from "../../data-models/sql-data-models";

export interface ProductInsights {
    productId: number;
    min: number;
    max: number;
    average: number;
    standardDeviation: number;
    shopToCurrentPriceData: Record<number, PriceRecord>;
    insights: string;
    histogramData: Record<number, number[]>;
};
