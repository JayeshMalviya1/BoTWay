/**
 * Global error handling middleware.
 *
 * Catches all errors and returns a consistent JSON response.
 * NEVER exposes stack traces in production.
 * NEVER exposes raw database errors to clients.
 */

import { AppError } from "../lib/errors.js";
import { getLogger } from "../lib/logger.js";

/**
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */
export function errorMiddleware(err, req, res, _next) {
  const logger = getLogger();
  const requestId = req.requestId ?? null;

  // Known application error
  if (err instanceof AppError) {
    logger.warn(
      { requestId, code: err.code, statusCode: err.statusCode },
      err.message
    );

    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        requestId,
      },
    });
    return;
  }

  // Zod validation errors
  if (err.name === "ZodError") {
    logger.warn({ requestId, issues: err.issues }, "Validation error");

    res.status(422).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details: err.issues,
        requestId,
      },
    });
    return;
  }

  // Unexpected errors — log full error, return generic message
  logger.error(
    { requestId, err: err.message, stack: err.stack },
    "Unhandled error"
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
      ...(isProduction ? {} : { detail: err.message }),
      requestId,
    },
  });
}
