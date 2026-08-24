/**
 * V1 API routes.
 *
 * Future routes will be added here:
 *   /api/v1/auth
 *   /api/v1/users
 *   /api/v1/organizations
 *   /api/v1/chatbots
 *   /api/v1/knowledge
 *   /api/v1/conversations
 *   /api/v1/deployments
 *   /api/v1/usage
 *   /api/v1/billing
 */

import { Router } from "express";

const v1Router = Router();

// ── Health check ──────────────────────────────────────────────
v1Router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "botway-core",
  });
});

export { v1Router };
