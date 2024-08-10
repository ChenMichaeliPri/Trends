import { FastifyInstance } from "fastify";
import { DB_QUERIES } from "../db/consts";

export const updateProductInsightsById = async (fastify: FastifyInstance, productId: number, insights: string): Promise<boolean> => {
    try {
        await fastify.mysql.execute(DB_QUERIES.updateInsightsQuery(productId, insights));
        return true;
    }
    catch(error) {
        console.log(error);
        return false;
    }
};