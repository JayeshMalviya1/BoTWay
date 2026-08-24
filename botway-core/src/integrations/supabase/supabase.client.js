/**
 * Supabase server-side client.
 *
 * Uses the SERVICE_ROLE_KEY for backend-only operations.
 * SECURITY: This key MUST NEVER be exposed to the frontend.
 * SECURITY: This key MUST NEVER be logged.
 */

import { createClient } from "@supabase/supabase-js";
import { getEnv } from "../../config/index.js";

/** @type {import("@supabase/supabase-js").SupabaseClient | undefined} */
let _adminClient;

/**
 * Get the Supabase admin client (service role).
 * Bypasses RLS — use with caution.
 * @returns {import("@supabase/supabase-js").SupabaseClient}
 */
export function getSupabaseAdmin() {
  if (!_adminClient) {
    const env = getEnv();
    _adminClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return _adminClient;
}

/**
 * Get a Supabase client scoped to the anon key.
 * Future: used for RLS-aware queries with user JWT.
 * @returns {import("@supabase/supabase-js").SupabaseClient}
 */
export function getSupabaseAnon() {
  const env = getEnv();
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
