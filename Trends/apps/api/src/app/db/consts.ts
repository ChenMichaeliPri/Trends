export const DB_QUERIES = {
    getInsightsQuery: (productId) : string => `
        SELECT insights FROM product WHERE product_id = ${productId};
    `
}