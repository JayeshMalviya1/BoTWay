/**
 * 404 Not Found middleware.
 *
 * Catches requests that don't match any route and returns
 * a consistent JSON error.
 */

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */
export function notFoundMiddleware(req, res, _next) {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: `Route ${req.method} ${req.originalUrl} not found`,
      requestId: req.requestId ?? null,
    },
  });
}
