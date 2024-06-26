import { MySQLPromisePool } from '@fastify/mysql'
import { DB_QUERIES } from '../../db/consts';

declare module 'fastify' {
    interface FastifyInstance {
      mysql: MySQLPromisePool 
    }
  }

export function generateGetDbCreateHandler(fastify){
  return async (request, reply) => {
    let logMessage = '';
    try{
      await fastify.mysql.execute(DB_QUERIES.createProductTable);
      logMessage += 'created product table\n';
    }
    catch(error) {
      logMessage += error + '\n';
      console.log(error);
    }
    try{
      await fastify.mysql.execute(DB_QUERIES.createShopTable);
      logMessage += 'created shop table\n';
    }
    catch(error) {
      logMessage += error + '\n';
      console.log(error);
    }
    try{
      await fastify.mysql.execute(DB_QUERIES.createRecordTable);
      logMessage += 'created price_record table\n';
    }
    catch(error) {
      logMessage += error + '\n';
      console.log(error);
    }

    reply.code(200).send(logMessage);
  };
}