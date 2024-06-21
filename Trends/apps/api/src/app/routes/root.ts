import { FastifyInstance } from 'fastify';
import { MySQLPromisePool } from '@fastify/mysql'

import { dbConsts } from '../db/consts';

declare module 'fastify' {
  interface FastifyInstance {
    mysql: MySQLPromisePool 
  }
}

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async function () {
    return { message: 'Hello API' };
  });

  fastify.get('/movies', async (req, reply) => {
    const [movies] = await fastify.mysql.execute('SELECT insights FROM item LIMIT 10');
    return { movies }
  });

  fastify.get('/create', async (req, reply) => {
    try{
      await fastify.mysql.execute(dbConsts.createItemTable);
    }
    catch(error) {
      console.log(error);
    }
    try{
      await fastify.mysql.execute(dbConsts.createShopTable);
    }
    catch(error) {
      console.log(error);
    }
    try{
      await fastify.mysql.execute(dbConsts.insertItemQuery('iphone15', ''));
    }
    catch(error) {
      console.log(error);
    }
    return { message: reply }
  });
}
