/**
 * Express application factory.
 *
 * Creates and configures the Express app with:
 *  - CORS (restricted to FRONTEND_URL)
 *  - JSON body parsing
 *  - Request ID assignment
 *  - Request logging
 *  - API routes (/api/v1)
 *  - Swagger docs (/api/docs)
 *  - 404 handler
 *  - Global error handler
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";

import { getEnv } from "./config/index.js";
import { requestIdMiddleware } from "./middleware/request-id.middleware.js";
import { requestLoggerMiddleware } from "./middleware/request-logger.middleware.js";
import { notFoundMiddleware } from "./middleware/not-found.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { rootRouter } from "./routes/index.js";
import { setupSwagger } from "./lib/swagger.js";

/**
 * Create a fully configured Express application.
 * @returns {import("express").Application}
 */
export function createApp() {
  const app = express();
  const env = getEnv();

  // ── Security headers ────────────────────────────────────────
  app.use(helmet());

  // ── CORS — restricted to configured frontend origin ─────────
  app.use(
    cors({
      origin: env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Authorization", "Content-Type", "X-Request-ID"],
      exposedHeaders: ["X-Request-ID"],
    })
  );

  // ── Body parsing ────────────────────────────────────────────
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  // ── Request ID ──────────────────────────────────────────────
  app.use(requestIdMiddleware);

  // ── Request logging ─────────────────────────────────────────
  app.use(requestLoggerMiddleware());

  // ── Swagger docs ────────────────────────────────────────────
  setupSwagger(app);

  // ── API routes ──────────────────────────────────────────────
  app.use("/api", rootRouter);

  // ── 404 handler (must be after routes) ──────────────────────
  app.use(notFoundMiddleware);

  // ── Global error handler (must be last) ─────────────────────
  app.use(errorMiddleware);

  return app;
}
