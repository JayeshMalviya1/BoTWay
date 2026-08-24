/**
 * LLM provider abstraction.
 *
 * Designed to support multiple LLM providers without coupling
 * chatbot services to a specific SDK.
 *
 * Future providers:
 *  - OpenAI
 *  - Anthropic
 *  - Google (Gemini)
 *  - Other providers
 *
 * Phase 0: Placeholder only — no LLM SDK installed.
 */

/**
 * @typedef {Object} LlmMessage
 * @property {"system" | "user" | "assistant"} role
 * @property {string} content
 */

/**
 * @typedef {Object} LlmCompletionOptions
 * @property {string} [model]
 * @property {number} [temperature]
 * @property {number} [maxTokens]
 */

/**
 * Abstract LLM provider interface.
 * Each concrete provider will extend this class.
 */
export class LlmProvider {
  /**
   * @param {string} name - Provider name (e.g. "openai", "anthropic")
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * Generate a chat completion.
   * @param {LlmMessage[]} _messages
   * @param {LlmCompletionOptions} [_options]
   * @returns {Promise<string>}
   */
  async complete(_messages, _options) {
    throw new Error(`LlmProvider.complete() not implemented for ${this.name}`);
  }

  /**
   * Generate a streaming chat completion.
   * @param {LlmMessage[]} _messages
   * @param {LlmCompletionOptions} [_options]
   * @returns {AsyncGenerator<string>}
   */
  async *stream(_messages, _options) {
    yield "";
    throw new Error(`LlmProvider.stream() not implemented for ${this.name}`);
  }
}
