/**
 * Test setup — loads env before app creation.
 *
 * Sets minimal environment variables needed for the test Express app
 * to initialize without connecting to real services.
 */

// Set test env vars BEFORE any imports
process.env.NODE_ENV = "test";
process.env.PORT = "9999"; // test port (not actually used — supertest handles binding)
process.env.FRONTEND_URL = "http://localhost:5173";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test";
process.env.SUPABASE_URL = "https://test.supabase.co";
process.env.SUPABASE_ANON_KEY = "test-anon-key";
process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
process.env.RAG_SERVER_URL = "http://localhost:8001";

import { loadEnv } from "../src/config/index.js";

// Load validated env
loadEnv();
