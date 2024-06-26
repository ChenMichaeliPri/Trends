import { generateGetDbCreateHandler } from "../controllers/db/create";

const getCreateDbRouteOpts = {
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
    fastify.get('/create', getCreateDbRouteOpts, getDbCreateHandler);

    done();
};