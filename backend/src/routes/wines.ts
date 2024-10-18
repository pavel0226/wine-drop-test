import { FastifyInstance } from "fastify";
import { getWines } from "../controllers/winesController";

export const wineRoutes = async (fastify: FastifyInstance, options: any) => {
  fastify.get("/wines", getWines);
};
