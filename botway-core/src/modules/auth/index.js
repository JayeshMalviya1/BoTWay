/**
 * Auth module — future Phase 1.
 *
 * Will handle:
 *  - Supabase JWT validation middleware
 *  - Current user extraction
 *  - Session management
 *  - Auth routes (if needed beyond Supabase)
 *
 * Flow:
 *   React → Supabase Auth → JWT → Express → JWT validation →
 *   Current User → Organization Membership → Authorization → Service
 */
