export const getProducts = (id: number | null = null, name: string | null = null): Product[] => {
    return [
        {
            id: 1,
            name: "product1",
            insights: '{"key": "value"}'
        },
        {
            id: 2,
            name: "product2",
            insights: '{"key": "value2"}'
        }
    ].filter(product => (id === null || product.id === id) && (name === null || product.name === name));
};

export const getShops = (id: number | null = null, name: string | null = null): Shop[] => {
    return [
        {
            id: 1,
            name: "Shop1"
        },
        {
            id: 2,
            name: "Shop2"
        }
    ].filter(shop => (id === null || shop.id === id) && (name === null || shop.name === name));
};

export const getProductsShops = (): ProductShops[] => {
    return [
        {
            product_id: 1,
            shop_ids: [1, 2]
        },
        {
            product_id: 2,
            shop_ids: [2]
        }
    ];
};

export const getPriceRecords = (
    product_id: number | null = null,
    shop_id: number | null = null,
    from_date: Date | null = new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    to_date: Date | null = new Date()
): PriceRecord[] => {
    return [
        {
            id: 1,
            product_id: 1,
            shop_id: 1,
            price: 100.0,
            timestamp: new Date('2023-01-01T00:00:00Z')
        },
        {
            id: 2,
            product_id: 2,
            shop_id: 2,
            price: 200.0,
            timestamp: new Date('2023-02-01T00:00:00Z')
        }
    ].filter(record => 
        (product_id === null || record.product_id === product_id) && 
        (shop_id === null || record.shop_id === shop_id) && 
        (from_date === null || record.timestamp >= from_date) && 
        (to_date === null || record.timestamp <= to_date)
    );
};