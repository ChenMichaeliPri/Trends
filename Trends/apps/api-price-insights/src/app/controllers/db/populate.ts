import { MySQLPromisePool } from '@fastify/mysql'
import { DB_QUERIES } from '../../db/consts';
import * as fs from 'fs';
import * as readline from 'readline';

declare module 'fastify' {
    interface FastifyInstance {
      mysql: MySQLPromisePool 
    }
  }

const productFilePath = 'apps/api-price-insights/src/app/db/mock-data/product.csv';
const shopFilePath = 'apps/api-price-insights/src/app/db/mock-data/shop.csv';
const priceRecordFilePath = 'apps/api-price-insights/src/app/db/mock-data/price_record.csv';


const getProductsFromCSV = async (filePath: string) => {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const products: Product[] = [];

    for await (const line of rl) {
        // Skip empty lines
        if (!line.trim()) continue;

        // Split the line into columns
        const [id, name, insights] = line.split(',');

        // Create a product object
        const product: Product = {
            id: Number(id),
            name,
            insights
        };

        // Add the product to the array
        products.push(product);
    }

    console.log('Processed Products:', products);
    return products;
};

const getShopsFromCSV = async (filePath: string) => {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const shops: Shop[] = [];

    for await (const line of rl) {
        // Skip empty lines
        if (!line.trim()) continue;

        // Split the line into columns
        const [id, name] = line.split(',');

        // Create a shop object
        const shop: Shop = {
            id: Number(id),
            name
        };

        // Add the shop to the array
        shops.push(shop);
    }

    console.log('Processed Shops:', shops);
    return shops;
};

const getPriceRecordsFromCSV = async (filePath: string) => {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const priceRecords: PriceRecord[] = [];

    for await (const line of rl) {
        // Skip empty lines
        if (!line.trim()) continue;

        // Split the line into columns
        const [id, product_id, shop_id, price, timestamp] = line.split(',');

        // Create a priceRecord object
        const priceRecord: PriceRecord = {
            id: Number(id),
            productId: Number(product_id),
            shopId: Number(shop_id),
            price: Number(price),
            timestamp: getDateFromEuropeanForamt(timestamp)
        };

        // Add the product to the array
        priceRecords.push(priceRecord);
    }

    console.log('Processed PriceRecords:', priceRecords.slice(0, 10));
    return priceRecords;
};

const getDateFromEuropeanForamt = (euroDate: string): Date => {
    const splittedDate = euroDate.split('/');
    return new Date(Number(splittedDate[2]), Number(splittedDate[1]) - 1, Number(splittedDate[0]));
}


export function generateGetDbPopulateHandler(fastify){
  return async (request, reply) => {
    let logMessage = '';
    try {
        const products: Product[] = await getProductsFromCSV(productFilePath);
        console.log(products);
        await fastify.mysql.execute(DB_QUERIES.insertProductsQuery(products));
        logMessage += 'populated product table\n';
    }
    catch(error) {
        logMessage += `products: ${error}` + '\n';
        console.log(`products: ${error}`);
    }

    try {
        const shops: Shop[] = await getShopsFromCSV(shopFilePath);
        console.log(shops);
        await fastify.mysql.execute(DB_QUERIES.insertShopsQuery(shops));
        logMessage += 'populated shop table\n';
    }
    catch(error) {
        logMessage += `shops: ${error}` + '\n';
        console.log(`shops: ${error}`);
    }

    try {
        const priceRecords: PriceRecord[] = await getPriceRecordsFromCSV(priceRecordFilePath);
        await fastify.mysql.execute(DB_QUERIES.insertPriceRecordQuery(priceRecords));
        logMessage += 'populated price_record table\n';
    }
    catch(error) {
        logMessage += error + '\n';
        console.log(error);
    }

    reply.code(200).send(logMessage);
  };
}