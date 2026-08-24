/**
 * Server bootstrap — loads config, starts HTTP server, handles graceful shutdown.
 *
 * Separated from app.js so the Express app can be imported independently for testing.
 */

import "dotenv/config";

import { loadEnv } from "./config/index.js";
import { createLogger } from "./lib/logger.js";
import { disconnectPrisma } from "./lib/prisma.js";
import { createApp } from "./app.js";

// ── 1. Load and validate environment ─────────────────────────
const env = loadEnv();

// ── 2. Initialize logger ─────────────────────────────────────
const logger = createLogger();

// ── 3. Create Express app ────────────────────────────────────
const app = createApp();

// ── 4. Start HTTP server ─────────────────────────────────────
const server = app.listen(env.PORT, "0.0.0.0", () => {
  logger.info(
    { port: env.PORT, env: env.NODE_ENV },
    `🚀 Botway Core Backend running on http://0.0.0.0:${env.PORT}`
  );
  logger.info(`📚 API docs available at http://localhost:${env.PORT}/api/docs`);
  logger.info(
    `❤️  Health check at http://localhost:${env.PORT}/api/v1/health`
  );
});

// ── 5. Graceful shutdown ─────────────────────────────────────
/** @param {string} signal */
async function shutdown(signal) {
  logger.info({ signal }, "Received shutdown signal, closing gracefully...");

  server.close(async () => {
    logger.info("HTTP server closed");

    try {
      await disconnectPrisma();
    } catch (err) {
      logger.error({ err }, "Error disconnecting Prisma");
    }

    logger.info("Shutdown complete");
    process.exit(0);
  });

  // Force exit after 10 seconds if graceful shutdown hangs
  setTimeout(() => {
    logger.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10_000);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
