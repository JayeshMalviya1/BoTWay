/**
 * RAG service — high-level abstraction over RAG server operations.
 *
 * Future responsibilities:
 *  - Document ingestion orchestration
 *  - Knowledge retrieval
 *  - Context assembly for LLM
 *
 * RAG Server handles:
 *  - PDF extraction, document parsing, chunking
 *  - Embedding generation, vector indexing
 *  - Vector search, reranking, retrieval
 *
 * Phase 0: Placeholder only.
 */

import { RagClient } from "./rag.client.js";

export class RagService {
  constructor() {
    this.client = new RagClient();
  }

  /**
   * Future: Trigger document ingestion on the RAG server.
   * @param {string} _documentId
   * @param {string} _organizationId
   */
  async ingestDocument(_documentId, _organizationId) {
    throw new Error("Not implemented — future phase");
  }

  /**
   * Future: Retrieve relevant context for a chatbot query.
   * @param {string} _query
   * @param {string} _chatbotId
   */
  async retrieveContext(_query, _chatbotId) {
    throw new Error("Not implemented — future phase");
  }
}
