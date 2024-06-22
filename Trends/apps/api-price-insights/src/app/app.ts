import * as path from 'path';
import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from "@fastify/swagger-ui";
import AutoLoad from '@fastify/autoload';
import { calculateRoutes } from './routes/calculate'

export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });

  fastify.register(fastifySwagger, {
    swagger: {
        info: {
            title: 'Price Insights Job',
            version: '1.0.0'
        },
    }
});

// @ts-ignore
fastify.register(fastifySwaggerUi, {
    routePrefix: '/swagger',
    exposeRoute: true
});

fastify.register(calculateRoutes, {
  prefix: '/api/calculate'
});
}
