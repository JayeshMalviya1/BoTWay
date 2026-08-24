/**
 * LLM service — orchestrates LLM provider calls.
 *
 * Future responsibilities:
 *  - Provider selection
 *  - System prompt + context assembly
 *  - Token counting
 *  - Rate limiting / usage tracking
 *  - Fallback between providers
 *
 * Phase 0: Placeholder only.
 */

export class LlmService {
  /**
   * @param {import("./llm.provider.js").LlmProvider} _provider
   */
  constructor(_provider) {
    // Future: inject configured provider
  }

  /**
   * Future: Generate a chatbot response using context + system prompt.
   * @param {object} _params
   */
  async generateResponse(_params) {
    throw new Error("Not implemented — future phase");
  }
}
