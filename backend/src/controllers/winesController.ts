import { FastifyRequest, FastifyReply } from "fastify";
import { Wine, WineQuery } from "../types";
import {
  getWinesByOrders,
  getWinesByRevenue,
  getWinesBySold,
} from "../models/wines";

export const getWines = async (
  req: FastifyRequest<{ Querystring: WineQuery }>,
  reply: FastifyReply
) => {
  const { query = "", sort = "" } = req.query;
  try {
    let wines: Wine[] = [];
    if (sort === "revenue") {
      wines = await getWinesByRevenue(req.server, query);
    } else if (sort === "sold") {
      wines = await getWinesBySold(req.server, query);
    } else {
      wines = await getWinesByOrders(req.server, query);
    }
    reply.send(wines);
  } catch (error) {
    reply.status(500).send({ error: "database error" });
  }
};
