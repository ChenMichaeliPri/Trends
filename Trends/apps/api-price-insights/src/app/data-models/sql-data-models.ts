export interface Product {
    id: number;
    name: string;
    insights: string; // Stores a valid JSON string
}

export interface Shop {
    id: number;
    name: string;
}

export interface ProductShops {
    productId: number;
    shopIds: number[];
}

export interface PriceRecord {
    id: number;
    productId: number;
    shopId: number;
    price: number;
    timestamp: Date;
}

export interface ProductShop { // Represent a product that is selled in a store
    productId: number;
    shopId: number;
}