export interface ProductInsights {
    productId: number;
    min: number;
    max: number;
    average: number;
    standardDeviation: number;
    shopToCurrentPriceData: Record<string, PriceRecord[]>;
    insights: string;
};
