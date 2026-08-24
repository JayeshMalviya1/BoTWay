/**
 * Prisma client singleton.
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { getLogger } from "./logger.js";
import { getEnv } from "../config/index.js";

/** @type {PrismaClient | undefined} */
let _prisma;

/**
 * Get or create the Prisma client singleton.
 * @returns {PrismaClient}
 */
export function getPrisma() {
  if (!_prisma) {
    const env = getEnv();
    const pool = new pg.Pool({ connectionString: env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    _prisma = new PrismaClient({ adapter });
    getLogger().info("Prisma client initialized");
  }
  return _prisma;
}

/**
 * Disconnect Prisma for graceful shutdown.
 */
export async function disconnectPrisma() {
  if (_prisma) {
    await _prisma.$disconnect();
    getLogger().info("Prisma client disconnected");
    _prisma = undefined;
  }
}
