export const DB_QUERIES = {
    getInsightsQuery: (productId) : string => `
        SELECT insights FROM product WHERE product_id = ${productId};
    `,
    getPricesQuery: (productId, shopId=1) : string => `
        SELECT price, timestamp FROM price_record WHERE product_id = ${productId} AND shop_id = ${shopId};
    `,
    getShopsQuery: (shopId, name) : string => {
        let baseQuery = 'SELECT * FROM shop';
        let whereFilter = ' WHERE 1=1';
        if(shopId){
            whereFilter += ` AND shop_id = ${shopId}`;
        }
        if(name){
            whereFilter += ` AND name = '${name}'`;
        }
        return baseQuery + whereFilter;
    },
}