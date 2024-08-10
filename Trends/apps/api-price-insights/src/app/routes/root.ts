import { FastifyInstance } from 'fastify';
import { WELCOME_MESSAGE } from '../consts';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async function () {
    return { message: WELCOME_MESSAGE };
  });
}
