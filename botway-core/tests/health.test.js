/**
 * Tests for:
 *  - GET /api/v1/health — returns 200 with expected body
 *  - 404 handling — unknown routes return structured error
 *  - Error format — consistent JSON error shape
 *  - Request ID — X-Request-ID header present in responses
 */

import { describe, it, expect, beforeAll } from "@jest/globals";
import supertest from "supertest";

// Load test env before importing app
import "./setup.js";
import { createApp } from "../src/app.js";

let request;

beforeAll(() => {
  const app = createApp();
  request = supertest(app);
});

// ── Health Check ──────────────────────────────────────────────

describe("GET /api/v1/health", () => {
  it("should return 200 with status ok", async () => {
    const res = await request.get("/api/v1/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: "ok",
      service: "botway-core",
    });
  });

  it("should include X-Request-ID header", async () => {
    const res = await request.get("/api/v1/health");

    expect(res.headers["x-request-id"]).toBeDefined();
    expect(typeof res.headers["x-request-id"]).toBe("string");
    expect(res.headers["x-request-id"].length).toBeGreaterThan(0);
  });

  it("should reuse provided X-Request-ID", async () => {
    const customId = "test-request-id-12345";
    const res = await request
      .get("/api/v1/health")
      .set("X-Request-ID", customId);

    expect(res.headers["x-request-id"]).toBe(customId);
  });
});

// ── 404 Handling ──────────────────────────────────────────────

describe("404 Not Found", () => {
  it("should return 404 for unknown routes", async () => {
    const res = await request.get("/api/v1/nonexistent");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
    expect(res.body.error.code).toBe("NOT_FOUND");
    expect(res.body.error.message).toContain("not found");
  });

  it("should return 404 for completely unknown paths", async () => {
    const res = await request.get("/does-not-exist");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("NOT_FOUND");
  });

  it("should include request ID in error responses", async () => {
    const res = await request.get("/api/v1/nonexistent");

    expect(res.body.error.requestId).toBeDefined();
  });
});

// ── Error Format ──────────────────────────────────────────────

describe("Error format consistency", () => {
  it("should have consistent error shape: success, error.code, error.message, error.requestId", async () => {
    const res = await request.get("/unknown-route");

    expect(res.body).toHaveProperty("success", false);
    expect(res.body.error).toHaveProperty("code");
    expect(res.body.error).toHaveProperty("message");
    expect(res.body.error).toHaveProperty("requestId");
  });
});
