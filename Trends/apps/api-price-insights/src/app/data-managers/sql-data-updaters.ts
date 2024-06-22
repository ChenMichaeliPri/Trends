import { FastifyInstance } from "fastify";
import { dbConsts } from "../db/consts";

export const updateProductInsightsById = async (fastify: FastifyInstance, productId: number, insights: string): Promise<boolean> => {
    try {
        await fastify.mysql.execute(dbConsts.updateInsightsQuery(productId, insights));
        return true;
    }
    catch(error) {
        console.log(error);
        return false;
    }
};