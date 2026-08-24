/**
 * Swagger/OpenAPI configuration.
 *
 * Serves interactive API docs at /api/docs.
 * Future authentication schemas can be added to the securitySchemes.
 */

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Botway Core API",
    version: "0.1.0",
    description:
      "Core Backend API for Botway — a multi-tenant SaaS AI chatbot platform.",
    contact: {
      name: "Botway Team",
    },
  },
  servers: [
    {
      url: "http://localhost:8000",
      description: "Development server",
    },
  ],
  // Prepared for future auth schemes
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Supabase Auth JWT (future)",
      },
    },
  },
  paths: {
    "/api/v1/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        description: "Returns service health status. No authentication required.",
        responses: {
          200: {
            description: "Service is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "ok" },
                    service: { type: "string", example: "botway-core" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: [], // No JSDoc annotations needed — we define paths inline above
});

/**
 * Mount Swagger UI onto an Express app.
 * @param {import("express").Application} app
 */
export function setupSwagger(app) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
}
