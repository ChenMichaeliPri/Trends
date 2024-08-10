import { FastifyInstance } from "fastify";
import { DB_QUERIES } from "../db/consts";
import { MySQLRowDataPacket } from "@fastify/mysql";

export const getShops = async (fastify: FastifyInstance, id: number | null = null, name: string | null = null): Promise<Shop[]> => {
    try {
        const shops = (await fastify.mysql.execute<MySQLRowDataPacket[]>(DB_QUERIES.getShopsQuery(id, name)))[0];
        return shops.map(s => {
            return { id: s.shop_id, name: s.name } as Shop
        });
    }
    catch(error) {
        console.log(error);
    }

    return [
        {
            id: 1,
            name: "Shop1"
        },
        {
            id: 2,
            name: "Shop2"
        }
    ].filter(shop => (id === null || shop.id === id) && (name === null || shop.name === name));
};