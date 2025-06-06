import { MySQLPromisePool } from '@fastify/mysql'
import { DB_QUERIES } from '../../db/consts';
import { MySQLRowDataPacket } from "@fastify/mysql";
import { FastifyInstance } from "fastify";


declare module 'fastify' {
    interface FastifyInstance {
      mysql: MySQLPromisePool 
    }
  }

export function generateGetInsightsByIdHandler(fastify: FastifyInstance){
  return async (request, reply) => {
    const productId = request.params.productId;
    try {
        if (isNaN(productId)) {
            reply.code(404).send(`productId: ${productId} is not valid`);
        }

        const insights = (await fastify.mysql.execute<MySQLRowDataPacket[]>(DB_QUERIES.getInsightsQuery(productId)))[0];

        if (!insights.length) {
            reply.code(404).send(`productId: ${productId} not found`);
        }

        return insights[0].insights;
    }
    catch(error) {
      console.log(error);
      reply.code(500).send(error);
    }
  };
}