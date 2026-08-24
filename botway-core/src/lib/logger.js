/**
 * Centralized Pino logger.
 *
 * SECURITY: NEVER log passwords, JWTs, refresh tokens, API keys,
 * service role keys, secrets, or full Authorization headers.
 */

import pino from "pino";

/** @type {pino.Logger | undefined} */
let _logger;

/**
 * Create and cache the application logger.
 * @returns {pino.Logger}
 */
export function createLogger() {
  if (_logger) return _logger;

  const nodeEnv = process.env.NODE_ENV ?? "development";
  const isProduction = nodeEnv === "production";

  _logger = pino({
    level: isProduction ? "info" : "debug",
    timestamp: pino.stdTimeFunctions.isoTime,
    ...(isProduction
      ? {}
      : {
          transport: {
            target: "pino/file",
            options: { destination: 1 }, // stdout
          },
        }),
    serializers: {
      // Strip sensitive headers from request logs
      req: (req) => ({
        id: req.id,
        method: req.method,
        url: req.url,
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },
    // Redact sensitive fields if they accidentally appear
    redact: {
      paths: [
        "req.headers.authorization",
        "req.headers.cookie",
        "password",
        "token",
        "accessToken",
        "refreshToken",
        "apiKey",
        "serviceRoleKey",
      ],
      censor: "[REDACTED]",
    },
  });

  return _logger;
}

/**
 * Get the cached logger instance.
 * @returns {pino.Logger}
 */
export function getLogger() {
  if (!_logger) {
    return createLogger();
  }
  return _logger;
}
