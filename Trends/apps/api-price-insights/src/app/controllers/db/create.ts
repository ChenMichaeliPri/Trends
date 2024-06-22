import { MySQLPromisePool } from '@fastify/mysql'
import { dbConsts } from '../../db/consts';

declare module 'fastify' {
    interface FastifyInstance {
      mysql: MySQLPromisePool 
    }
  }

export function generateGetDbCreateHandler(fastify){
  return async (request, reply) => {
    let logMessage = '';
    try{
      await fastify.mysql.execute(dbConsts.createProductTable);
      logMessage += 'created product table\n';
    }
    catch(error) {
      logMessage += error + '\n';
      console.log(error);
    }
    try{
      await fastify.mysql.execute(dbConsts.createShopTable);
      logMessage += 'created shop table\n';
    }
    catch(error) {
      logMessage += error + '\n';
      console.log(error);
    }
    try{
      await fastify.mysql.execute(dbConsts.createRecordTable);
      logMessage += 'created price_record table\n';
    }
    catch(error) {
      logMessage += error + '\n';
      console.log(error);
    }

    reply.code(200).send(logMessage);
  };
}