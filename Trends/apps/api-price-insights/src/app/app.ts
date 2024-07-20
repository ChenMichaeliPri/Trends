import * as path from 'path';
import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from "@fastify/swagger-ui";
import AutoLoad from '@fastify/autoload';
import { fastifyMysql } from '@fastify/mysql';
import { calculateRoutes } from './routes/calculate'
import { dbRoutes } from './routes/db';

export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  // DB access
  fastify.register(fastifyMysql, {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'trends',
    promise: true
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });

  fastify.register(fastifySwagger, {
    swagger: {
      info: {
          title: 'Price Pulse Insights Job',
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

  fastify.register(dbRoutes, {
    prefix: '/api/db'
  });
}
