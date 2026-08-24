/**
 * HTTP request logging middleware using pino-http.
 */

import pinoHttp from "pino-http";
import { getLogger } from "../lib/logger.js";

/**
 * Create pino-http middleware for structured request logging.
 * Logs: method, path, status, duration, request ID.
 * NEVER logs Authorization headers or tokens.
 */
export function requestLoggerMiddleware() {
  return pinoHttp({
    logger: getLogger(),
    genReqId: (req) => req.requestId ?? req.headers["x-request-id"] ?? undefined,
    customLogLevel: (_req, res, err) => {
      if (res.statusCode >= 500 || err) return "error";
      if (res.statusCode >= 400) return "warn";
      return "info";
    },
    customSuccessMessage: (req, res) => {
      return `${req.method} ${req.url} ${res.statusCode}`;
    },
    customErrorMessage: (req, res) => {
      return `${req.method} ${req.url} ${res.statusCode}`;
    },
    serializers: {
      req: (req) => ({
        id: req.id,
        method: req.method,
        url: req.url,
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },
  });
}
