import { Wine } from "../types";
import { FastifyInstance } from "fastify";

export const getWinesByRevenue = async (
  fastify: FastifyInstance,
  query: string
): Promise<Wine[]> => {
  const sql = `
        WITH RankedWines AS (
            SELECT 
                mw.id,
                mw.name,
                mw.vintage,
                SUM(co.total_amount) AS total_revenue,
                ROW_NUMBER() OVER (ORDER BY SUM(co.total_amount) DESC) AS rank
            FROM 
                master_wine mw
            JOIN 
                wine_product wp ON mw.id = wp.master_wine_id
            JOIN 
                customer_order co ON wp.id = co.wine_product_id
            WHERE 
                co.status = 'paid'
            GROUP BY 
                mw.id, mw.name, mw.vintage
        )
        SELECT 
            rw.id,
            rw.rank,
            rw.name,
            rw.vintage,
            rw.total_revenue
        FROM 
            RankedWines rw
        WHERE 
            rw.name LIKE '%' || ? || '%' OR rw.vintage LIKE '%' || ? || '%'
        ORDER BY 
            total_revenue DESC;
    `;

  try {
    const result = await fastify.db.all(sql, [query, query]);
    return result.map((row: any) => ({
      id: row.id,
      rank: row.rank,
      name: row.name,
      vintage: row.vintage,
      total_revenue: row.total_revenue,
    }));
  } catch (error) {
    fastify.log.error(error);
    throw new Error("Failed to retrieve wines by revenue");
  }
};

export const getWinesBySold = async (
  fastify: FastifyInstance,
  query: string
): Promise<Wine[]> => {
  const sql = `
        WITH SoldWines AS (
            SELECT 
                mw.id,
                mw.name,
                mw.vintage,
                SUM(co.quantity) AS total_quantity,
                SUM(co.total_amount) AS total_revenue,
                ROW_NUMBER() OVER (ORDER BY SUM(co.quantity) DESC) AS rank
            FROM 
                master_wine mw
            JOIN 
                wine_product wp ON mw.id = wp.master_wine_id
            JOIN 
                customer_order co ON wp.id = co.wine_product_id
            WHERE 
                co.status IN ('paid', 'dispatched')  -- Include both statuses
            GROUP BY 
                mw.id, mw.name, mw.vintage
        )
        SELECT 
            sw.id,
            sw.rank,
            sw.name,
            sw.vintage,
            sw.total_revenue,
            sw.total_quantity
        FROM 
            SoldWines sw
        WHERE 
            sw.name LIKE '%' || ? || '%' OR sw.vintage LIKE '%' || ? || '%'
        ORDER BY 
            total_quantity DESC;
    `;
  try {
    const result = await fastify.db.all(sql, [query, query]);
    return result.map((row: any) => ({
      id: row.id,
      rank: row.rank,
      name: row.name,
      vintage: row.vintage,
      total_revenue: row.total_revenue,
    }));
  } catch (error) {
    fastify.log.error(error);
    throw new Error("Failed to retrieve wines by revenue");
  }
};

export const getWinesByOrders = async (
  fastify: FastifyInstance,
  query: string
): Promise<Wine[]> => {
  const sql = `
        WITH OrderedWines AS (
            SELECT 
                mw.id,
                mw.name,
                mw.vintage,
                SUM(co.quantity) AS total_quantity,
                SUM(co.total_amount) AS total_revenue,
                ROW_NUMBER() OVER (ORDER BY SUM(co.quantity) DESC) AS rank
            FROM 
                master_wine mw
            JOIN 
                wine_product wp ON mw.id = wp.master_wine_id
            JOIN 
                customer_order co ON wp.id = co.wine_product_id
            GROUP BY 
                mw.id, mw.name, mw.vintage
        )
        SELECT 
            ow.id,
            ow.rank,
            ow.name,
            ow.vintage,
            ow.total_revenue,
            ow.total_quantity
        FROM 
            OrderedWines ow
        WHERE 
            ow.name LIKE '%' || ? || '%' OR ow.vintage LIKE '%' || ? || '%'
        ORDER BY 
            total_quantity DESC;
    `;
  try {
    const result = await fastify.db.all(sql, [query, query]);
    return result.map((row: any) => ({
      id: row.id,
      rank: row.rank,
      name: row.name,
      vintage: row.vintage,
      total_revenue: row.total_revenue,
    }));
  } catch (error) {
    fastify.log.error(error);
    throw new Error("Failed to retrieve wines by revenue");
  }
};
