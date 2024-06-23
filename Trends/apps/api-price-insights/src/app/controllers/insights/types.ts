export type ProductInsights = {
    productId: number;
    min: number;
    max: number;
    average: number;
    variance: number;
    shopToPricesData: Record<string, PriceRecord[]>;
    insights: string;
};
