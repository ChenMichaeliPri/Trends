import { getProductStatistics } from './insights-logic';
import { SUCCESS } from '../../consts'
import { getProductsShops, getPriceRecords } from '../../data-managers/sql-data-providers';
import { updateProductInsightsById } from '../../data-managers/sql-data-updaters';

export const postInsightsHandler = (request, reply) => {
    const TO_DATE = new Date();
    const FROM_DATE = new Date(new Date().setFullYear(new Date().getFullYear() - 3));

    const productShops = getProductsShops();
    productShops.forEach(metadata => {
        const shopToPricesData = {};
        const {productId, shopIds} = metadata;

        shopIds.forEach(shopId => {
            shopToPricesData[shopId] = getPriceRecords(productId, shopId, FROM_DATE, TO_DATE);
        });
        
        const productStatistics = JSON.stringify(getProductStatistics(productId, shopIds, shopToPricesData));

        updateProductInsightsById(productId, productStatistics);
    });

    reply.code(200).send(SUCCESS);
}
