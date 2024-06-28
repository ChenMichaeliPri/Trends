export interface ProductInsights {
    productId: number;
    min: number;
    max: number;
    average: number;
    standardDeviation: number;
    shopToPricesData: Record<string, PriceRecord[]>;
    insights: string;
};
