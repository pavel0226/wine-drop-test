import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "@fastify/env";
import sqlitePlugin from "fastify-sqlite-typed";

import { wineRoutes } from "./routes/wines";
import { Env } from "./types";

const envSchema = {
  type: "object",
  properties: {
    PORT: { type: "integer" },
    FRONTEND_URL: { type: "string" },
    DATABASE_URL: { type: "string" },
  },
  required: ["PORT", "FRONTEND_URL", "DATABASE_URL"],
};

(async () => {
  // App logger
  const fastify = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    },
  });

  // Load environment variables
  await fastify.register(dotenv, {
    schema: envSchema,
    dotenv: {
      path: `${__dirname}/../.env`,
    },
  });

  const envs = fastify.getEnvs<Env>();

  // CORS register for frontend
  fastify.register(cors, {
    origin: envs.FRONTEND_URL,
  });

  // SQLite register
  fastify.register(sqlitePlugin, {
    dbFilename: envs.DATABASE_URL,
  });

  // Routes register
  fastify.register(wineRoutes, { prefix: "/api" });

  try {
    const port = parseInt(envs.PORT, 10);
    await fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
  }
})();
