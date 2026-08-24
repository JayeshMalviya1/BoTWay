/**
 * Environment configuration — validated with Zod.
 *
 * SECURITY: Never log or expose service role keys, API keys, or secrets.
 */

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(8000),

  // Frontend (CORS origin)
  FRONTEND_URL: z.string().url().default("http://localhost:5173"),

  // Database
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // Supabase
  SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL"),
  SUPABASE_ANON_KEY: z.string().min(1, "SUPABASE_ANON_KEY is required"),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),

  // RAG Server (internal communication)
  RAG_SERVER_URL: z.string().url().default("http://localhost:8001"),
  RAG_INTERNAL_API_KEY: z.string().optional().default(""),

  // LLM (not required for Phase 0)
  LLM_API_KEY: z.string().optional().default(""),
});

/** @type {z.infer<typeof envSchema> | undefined} */
let _env;

/**
 * Parse and validate environment variables.
 * Throws with descriptive errors if validation fails.
 * @returns {z.infer<typeof envSchema>}
 */
export function loadEnv() {
  if (_env) return _env;

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(
      `❌ Invalid environment variables:\n${formatted}\n\nCheck your .env file against .env.example`
    );
  }

  _env = result.data;
  return _env;
}

/**
 * Get validated environment. Must call loadEnv() first during bootstrap.
 * @returns {z.infer<typeof envSchema>}
 */
export function getEnv() {
  if (!_env) {
    throw new Error("Environment not loaded. Call loadEnv() during startup.");
  }
  return _env;
}
