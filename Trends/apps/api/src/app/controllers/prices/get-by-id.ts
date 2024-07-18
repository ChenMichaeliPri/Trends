import { MySQLPromisePool } from '@fastify/mysql'
import { DB_QUERIES } from '../../db/consts';
import { MySQLRowDataPacket } from "@fastify/mysql";
import { FastifyInstance } from "fastify";
import { getShops } from '../../data-managers/sql-data-providers';


declare module 'fastify' {
    interface FastifyInstance {
      mysql: MySQLPromisePool 
    }
  }

export function generateGetPricesByIdHandler(fastify: FastifyInstance){
  return async (request, reply) => {
    const productId = request.params.productId;
    try {
        if (isNaN(productId)) {
            reply.code(404).send(`productId: ${productId} is not valid`);
        }

        const shops = (await getShops(fastify));
        const productShopPrices : ProductShopPrices[] = [];

        for (const shop of shops) {
            const productPrices = (await fastify.mysql.execute<MySQLRowDataPacket[]>(DB_QUERIES.getPricesQuery(productId, shop.id)))[0];
            const modeledProductPrices = productPrices.map(p => {
                return { price: p.price, timestamp: p.timestamp } as SparsePriceRecord
            });
            
            productShopPrices.push({ productId: productId, shopId: shop.id, shopName: shop.name, prices: modeledProductPrices });
        };

        return JSON.stringify(productShopPrices);
    }
    catch(error) {
      console.log(error);
      reply.code(500).send(error);
    }
  };
}