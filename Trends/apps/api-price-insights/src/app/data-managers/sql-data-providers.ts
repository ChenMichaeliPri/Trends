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

export const getShops = async (id: number | null = null, name: string | null = null): Promise<Shop[]> => {
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
            productId: 1,
            shopIds: [1, 2]
        },
        {
            productId: 2,
            shopIds: [2]
        }
    ];
};

export const getPriceRecords = (
    productId: number | null = null,
    shopId: number | null = null,
    fromDate: Date | null = new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    toDate: Date | null = new Date()
): PriceRecord[] => {
    return [
        {
            id: 1,
            productId: 1,
            shopId: 1,
            price: 100.0,
            timestamp: new Date('2023-01-01T00:00:00Z')
        },
        {
            id: 2,
            productId: 2,
            shopId: 2,
            price: 200.0,
            timestamp: new Date('2023-02-01T00:00:00Z')
        }
    ].filter(record => 
        (productId === null || record.productId === productId) && 
        (shopId === null || record.shopId === shopId) && 
        (fromDate === null || record.timestamp >= fromDate) && 
        (toDate === null || record.timestamp <= toDate)
    );
};