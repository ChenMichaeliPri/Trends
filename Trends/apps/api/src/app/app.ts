import * as path from 'path';
import fastifyCors from 'fastify-cors';
import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';
import { fastifyMysql } from '@fastify/mysql';
import { insightsRoutes } from './routes/insights';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  // Place here your custom code!

  // Do not touch the following lines

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

  fastify.register(fastifyCors, { 
    origin: '*' 
  });

  fastify.register(insightsRoutes, {
    prefix: '/api/insights'
  });
}
