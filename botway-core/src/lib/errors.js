/**
 * Custom application error class for structured API errors.
 */

export class AppError extends Error {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} code - Machine-readable error code (e.g. "NOT_FOUND")
   * @param {string} message - Human-readable error message
   */
  constructor(statusCode, code, message) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

/**
 * Common error factory methods.
 */
export const Errors = {
  notFound: (resource = "Resource") =>
    new AppError(404, "NOT_FOUND", `${resource} not found`),

  unauthorized: (message = "Authentication required") =>
    new AppError(401, "UNAUTHORIZED", message),

  forbidden: (message = "Insufficient permissions") =>
    new AppError(403, "FORBIDDEN", message),

  badRequest: (message = "Bad request") =>
    new AppError(400, "BAD_REQUEST", message),

  conflict: (message = "Resource already exists") =>
    new AppError(409, "CONFLICT", message),

  validation: (message = "Validation failed") =>
    new AppError(422, "VALIDATION_ERROR", message),

  internal: (message = "An unexpected error occurred") =>
    new AppError(500, "INTERNAL_SERVER_ERROR", message),
};
