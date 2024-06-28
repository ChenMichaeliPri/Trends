import { getProductStatistics } from './insights-logic';
import { SUCCESS } from '../../consts'
import { getProductsShops, getPriceRecords, getShops } from '../../data-managers/sql-data-providers';
import { updateProductInsightsById } from '../../data-managers/sql-data-updaters';

export const postInsightsHandler = async (request, reply) => {
    const TO_DATE = new Date();
    const FROM_DATE = new Date(new Date().setFullYear(new Date().getFullYear() - 3));
    const fastify = request.server;

    const dbShopsData = await getShops();
    const productShops = getProductsShops();
    productShops.forEach(metadata => {
        const shopToPricesData = {};
        const {productId, shopIds} = metadata;

        for (const shopId of shopIds){
            shopToPricesData[shopId] = await getPriceRecords(fastify, productId, shopId, FROM_DATE, TO_DATE);
        }
        
        const productStatistics = JSON.stringify(getProductStatistics(productId, shopIds, dbShopsData, shopToPricesData));

        await updateProductInsightsById(fastify, productId, productStatistics);
    }

    reply.code(200).send(SUCCESS);
}
