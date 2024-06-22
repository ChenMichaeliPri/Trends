import { postInsightsHandler } from '../controllers/insights'

const postInsightsRouteOpts = {
    schema: {
      response: {
        200: {
          type: 'string'
        }
      }
    }
  };

export const calculateRoutes = (fastify, options, done) => {
    fastify.post('/insights', postInsightsRouteOpts, postInsightsHandler);

    done();
};