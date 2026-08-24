/**
 * Request ID middleware.
 *
 * Assigns a unique ID to every request. If a valid X-Request-ID header
 * is already present, it is reused. The ID is returned in the response
 * via the X-Request-ID header.
 */

import { randomUUID } from "node:crypto";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export function requestIdMiddleware(req, res, next) {
  const existing = req.headers["x-request-id"];

  // Reuse if it looks like a valid UUID, otherwise generate a new one
  const requestId =
    typeof existing === "string" && existing.length > 0
      ? existing
      : randomUUID();

  req.requestId = requestId;
  res.setHeader("X-Request-ID", requestId);

  next();
}
