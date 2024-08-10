import { FastifyInstance } from "fastify";
import { DB_QUERIES } from "../db/consts";
import { MySQLRowDataPacket } from "@fastify/mysql";
import { PriceRecord, Product, ProductShop, ProductShops, Shop } from "../data-models/sql-data-models";

export const getProducts = async (fastify: FastifyInstance, id: number | null = null, name: string | null = null): Promise<Product[]> => {
    try {
        const products = (await fastify.mysql.execute<MySQLRowDataPacket[]>(DB_QUERIES.getProductsQuery(id, name)))[0];
        return products.map(p => {
            return { id: p.product_id, name: p.name, insights: p.insights } as Product
        });
    }
    catch(error) {
        console.log(error);
    }

    // In case of SQL failure return mock data
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

export const getShops = async (fastify: FastifyInstance, id: number | null = null, name: string | null = null): Promise<Shop[]> => {
    try {
        const shops = (await fastify.mysql.execute<MySQLRowDataPacket[]>(DB_QUERIES.getShopsQuery(id, name)))[0];
        return shops.map(s => {
            return { id: s.shop_id, name: s.name } as Shop
        });
    }
    catch(error) {
        console.log(error);
    }

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

export const getProductsShops = async (fastify: FastifyInstance): Promise<ProductShops[]> => {
    try {
        // Each row in the results represenets a productId and shopId which the product sales at
        const productShopResults = (await fastify.mysql.execute<MySQLRowDataPacket[]>(DB_QUERIES.getProductShopsQuery))[0];
        const productShopResultsParsed = productShopResults.map(p => {
            return { productId: p.product_id, shopId: p.shop_id } as ProductShop
        });

        const productShopsMap: Map<number, Set<number>> = new Map();

        productShopResultsParsed.forEach(productShop => {
            if (productShopsMap.has(productShop.productId)){
                productShopsMap.get(productShop.productId).add(productShop.shopId);
            }
            else {
                productShopsMap.set(productShop.productId, new Set<number> ([productShop.shopId]));
            }
        });

        const productShops: ProductShops[] = [];

        productShopsMap.forEach((value, key) => {
           productShops.push({ productId: key, shopIds: Array.from(value) }); 
        });

        return productShops;
    }
    catch(error) {
        console.log(error);
    }

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

export const getPriceRecords = async (
    fastify: FastifyInstance,
    productId: number | null = null,
    shopId: number | null = null,
    fromDate: Date | null = new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    toDate: Date | null = new Date()
): Promise<PriceRecord[]> => {
    try {
        const records = (await fastify.mysql.execute<MySQLRowDataPacket[]>(DB_QUERIES.getRecordQuery(productId, shopId, fromDate, toDate)))[0];
        return records.map(p => {
            return { 
                id: p.price_record_id,
                productId: p.product_id,
                shopId: p.shop_id,
                price: p.price,
                timestamp: p.timestamp } as PriceRecord
        });
    }
    catch(error) {
        console.log(error);
    }

    // In case of SQL failure return mock data
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