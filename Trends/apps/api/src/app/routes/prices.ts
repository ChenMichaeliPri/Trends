import { generateGetPricesByIdHandler } from "../controllers/prices/get-by-id";

const getPricesRouteOpts = {
    schema: {
      response: {
        200: {
          type: 'string'
        }
      }
    }
  };

export const pricesRoutes = (fastify, options, done) => {
    const getPricesByIdHandler = generateGetPricesByIdHandler(fastify);
    fastify.get('/:productId', getPricesRouteOpts, getPricesByIdHandler);

    done();
};