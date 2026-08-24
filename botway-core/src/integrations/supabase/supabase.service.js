/**
 * Supabase service — high-level operations using the Supabase client.
 *
 * Future responsibilities:
 *  - Auth token verification
 *  - Storage operations
 *  - Realtime subscriptions
 *
 * Phase 0: Placeholder only.
 */

import { getSupabaseAdmin } from "./supabase.client.js";

export class SupabaseService {
  constructor() {
    this.client = getSupabaseAdmin();
  }

  /**
   * Verify and decode a Supabase JWT.
   * Future: Will be used by auth middleware.
   * @param {string} _jwt
   */
  async verifyToken(_jwt) {
    throw new Error("Not implemented — Phase 1");
  }
}
