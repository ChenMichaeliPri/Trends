interface Product {
    id: number;
    name: string;
    insights: string; // Stores a valid JSON string
}

interface Shop {
    id: number;
    name: string;
}

interface ProductShops {
    productId: number;
    shopIds: number[];
}

interface PriceRecord {
    id: number;
    productId: number;
    shopId: number;
    price: number;
    timestamp: Date;
}

interface SparsePriceRecord {
    price: number;
    timestamp: Date;
}

interface ProductShop { // Represent a product that is selled in a store
    productId: number;
    shopId: number;
}

interface ProductShopPrices {
    productId: number;
    shopId: number;
    shopName: string;
    prices: SparsePriceRecord[];
}