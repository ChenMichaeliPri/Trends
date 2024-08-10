import { generateGetInsightsByIdHandler } from "../controllers/insights/get-by-id";

const getInsightsRouteOpts = {
    schema: {
      response: {
        200: {
          type: 'string'
        }
      }
    }
  };

export const insightsRoutes = (fastify, options, done) => {
    const getInsightsByIdHandler = generateGetInsightsByIdHandler(fastify);
    fastify.get('/:productId', getInsightsRouteOpts, getInsightsByIdHandler);

    done();
};