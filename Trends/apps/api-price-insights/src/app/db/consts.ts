export const DB_QUERIES = {
    createProductTable : `
    CREATE TABLE product (
        product_id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        insights TEXT
        );`,
    createShopTable : `
    CREATE TABLE shop (
        shop_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        UNIQUE (name)
        );`,
    createRecordTable : `
    CREATE TABLE price_record (
        price_record_id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        shop_id INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES product(product_id),
        FOREIGN KEY (shop_id) REFERENCES shop(shop_id)
        );`,
    getProductShopsQuery: `
    SELECT product_id, shop_id FROM price_record
    GROUP BY product_id, shop_id;
    `,
    insertProductQuery: (productName, insights) : string => `
        INSERT INTO product (name, insights)
        VALUES ('${productName}', '${insights}');
    `,
    insertShopQuery: (shopName) : string => `
        INSERT INTO shop (name)
        VALUES ('${shopName}');
    `,
    insertRecordQuery: (productId, shopId, price) : string => `
        INSERT INTO price_record (product_id, shop_id, price)
        VALUES (${productId}, ${shopId}, ${price});
    `,
    getProductsQuery: (productId = null, name = null) : string => {
        let baseQuery = 'SELECT * FROM product';
        let whereFilter = ' WHERE 1=1';
        if(productId){
            whereFilter += ` AND product_id = ${productId}`;
        }
        if(name){
            whereFilter += ` AND name = '${name}'`;
        }
        return baseQuery + whereFilter;
    },
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
    getRecordQuery: (
        productId: number | null = null,
        shopId: number | null = null,
        fromDate: Date | null = new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        toDate: Date | null = new Date()) : string => {
        let baseQuery = 'SELECT * FROM price_record';
        let whereFilter = ' WHERE 1=1';
        if(productId){
            whereFilter += ` AND product_id = ${productId}`;
        }
        if(shopId){
            whereFilter += ` AND shop_id = ${shopId}`;
        }
        if(fromDate){
            whereFilter += ` AND UNIX_TIMESTAMP(timestamp) >= UNIX_TIMESTAMP('${fromDate.toISOString().slice(0, 19).replace('T', ' ')}')`;
        }
        if(fromDate){
            whereFilter += ` AND UNIX_TIMESTAMP(timestamp) <= UNIX_TIMESTAMP('${toDate.toISOString().slice(0, 19).replace('T', ' ')}')`;
        }
        console.log(whereFilter);
        return baseQuery + whereFilter;
    },
    updateInsightsQuery: (productId: number, insights: string) : string => `
        UPDATE product
        SET insights = '${insights}' WHERE product_id = ${productId};
    `,
    insertProductsQuery: (products: Product[]): string => {
        let productsString = '';
        products.forEach(product => {
            productsString += `(${product.id}, "${product.name}", "${product.insights}"),`            
        });

        productsString = productsString.slice(0,-1); // Remove last ','

        return `
        INSERT INTO product (product_id, name, insights)
        VALUES ${productsString};
        `;
    },
    insertShopsQuery: (shops: Shop[]): string => {
        let shopsString = '';
        shops.forEach(shop => {
            shopsString += `("${shop.name}"),`            
        });

        shopsString = shopsString.slice(0,-1); // Remove last ','

        return `
        INSERT INTO shop (name)
        VALUES ${shopsString};
        `;
    },
    insertPriceRecordQuery: (priceRecords: PriceRecord[]): string => {
        let priceRecordsString = '';
        priceRecords.forEach(priceRecord => {
            priceRecordsString += `(${priceRecord.productId}, ${priceRecord.shopId}, ${priceRecord.price}, "${priceRecord.timestamp.toISOString().slice(0, 19).replace('T', ' ')}"),`
        });

        priceRecordsString = priceRecordsString.slice(0,-1); // Remove last ','

        return `
        INSERT INTO price_record (product_id, shop_id, price, timestamp)
        VALUES ${priceRecordsString};
        `;
    }
}