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
    product_id: number;
    shop_ids: number[];
}

interface PriceRecord {
    id: number;
    product_id: number;
    shop_id: number;
    price: number;
    timestamp: Date;
}