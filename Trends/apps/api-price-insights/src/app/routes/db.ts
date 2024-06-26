import { generateGetDbCreateHandler } from "../controllers/db/create";
import { generateGetDbPopulateHandler } from "../controllers/db/populate";

const getDbRouteOpts = {
    schema: {
      response: {
        200: {
          type: 'string'
        }
      }
    }
  };

export const dbRoutes = (fastify, options, done) => {
    const getDbCreateHandler = generateGetDbCreateHandler(fastify);
    const getDbPopulateHandler = generateGetDbPopulateHandler(fastify);
    fastify.get('/create', getDbRouteOpts, getDbCreateHandler);
    fastify.get('/populate', getDbRouteOpts, getDbPopulateHandler);
    done();
};