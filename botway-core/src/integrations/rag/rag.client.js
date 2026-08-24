/**
 * RAG server HTTP client.
 *
 * Handles internal authenticated communication between
 * the Core Backend and the Python RAG server.
 *
 * Architecture:
 *   Browser → Core Backend → RAG Server
 *   The browser MUST NEVER call the RAG server directly.
 *
 * Phase 0: Placeholder only — no actual RAG calls.
 */

import { getEnv } from "../../config/index.js";
import { getLogger } from "../../lib/logger.js";

export class RagClient {
  constructor() {
    const env = getEnv();
    this.baseUrl = env.RAG_SERVER_URL;
    this.apiKey = env.RAG_INTERNAL_API_KEY;
    this.logger = getLogger().child({ module: "rag-client" });
  }

  /**
   * Make an authenticated request to the RAG server.
   * Future: Implements retry, circuit breaker, timeout.
   * @param {string} _path
   * @param {object} [_options]
   */
  async request(_path, _options) {
    throw new Error("Not implemented — future phase");
  }
}
