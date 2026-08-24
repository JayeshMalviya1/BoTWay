# Botway Core Backend

Multi-tenant SaaS AI Chatbot Platform — Core Backend Service.

## Architecture

```
React Frontend → Express Core Backend → Supabase (PostgreSQL + Auth)
                                      → Python RAG Server (future)
                                      → LLM Provider (future)
```

See [docs/architecture.md](docs/architecture.md) for detailed diagrams.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express |
| Language | JavaScript (ES Modules) |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Auth | Supabase Auth (future) |
| Validation | Zod |
| Logging | Pino |
| API Docs | Swagger/OpenAPI |
| Testing | Jest + Supertest |
| Linting | ESLint |
| Formatting | Prettier |

## Requirements

- Node.js >= 18
- npm >= 9
- PostgreSQL (via Supabase)

## Installation

```bash
cd botway-core
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | No | `development` / `production` / `test` (default: `development`) |
| `PORT` | No | Server port (default: `8000`) |
| `FRONTEND_URL` | No | CORS origin (default: `http://localhost:5173`) |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_ANON_KEY` | Yes | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (**server-only, never expose**) |
| `RAG_SERVER_URL` | No | RAG server URL (default: `http://localhost:8001`) |
| `RAG_INTERNAL_API_KEY` | No | Internal API key for RAG server |
| `LLM_API_KEY` | No | LLM provider API key (future) |

## Development Commands

```bash
# Start development server (with auto-restart)
npm run dev

# Start production server
npm run start:prod

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint
npm run lint
npm run lint:fix

# Format
npm run format
npm run format:check

# Prisma
npm run prisma:generate
npm run prisma:validate
```

## API Endpoints

### Phase 0

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/health` | No | Health check |

### Swagger

Interactive API docs available at: **http://localhost:8000/api/docs**

## Testing

```bash
npm test
```

Tests cover:
- Health endpoint (200, correct body)
- 404 handling (structured error)
- Error format consistency
- Request ID header (generation + reuse)

## Project Structure

```
botway-core/
├── src/
│   ├── app.js                    # Express app factory
│   ├── server.js                 # Server bootstrap + graceful shutdown
│   ├── config/                   # Environment validation (Zod)
│   ├── routes/                   # Route definitions
│   │   └── v1/                   # Versioned API routes
│   ├── controllers/              # Request handlers (future)
│   ├── services/                 # Business logic (future)
│   ├── repositories/             # Database access (future)
│   ├── schemas/                  # Zod validation schemas (future)
│   ├── middleware/               # Express middleware
│   ├── lib/                      # Shared utilities (logger, prisma, errors, swagger)
│   ├── integrations/             # External service clients
│   │   ├── supabase/             # Supabase admin client
│   │   ├── rag/                  # RAG server client (future)
│   │   └── llm/                  # LLM provider abstraction (future)
│   ├── modules/                  # Feature module placeholders
│   │   ├── auth/
│   │   ├── users/
│   │   ├── organizations/
│   │   ├── chatbots/
│   │   ├── knowledge/
│   │   ├── conversations/
│   │   ├── deployments/
│   │   ├── usage/
│   │   └── billing/
│   └── types/                    # Shared type definitions (future)
├── prisma/
│   └── schema.prisma             # Database schema (connection only)
├── tests/                        # Jest test files
├── docs/                         # Documentation
├── .env.example
├── package.json
├── eslint.config.js
├── prettier.config.js
└── jest.config.js
```

## Railway Deployment

The server is Railway-ready:

- Binds to `0.0.0.0` (not localhost)
- Reads `PORT` from environment
- Supports graceful shutdown (`SIGTERM`, `SIGINT`)
- Has a health endpoint for readiness probes
- Production start: `npm run start:prod`

```bash
# Railway start command
npm run start:prod
```

## Future Phases

| Phase | Scope |
|-------|-------|
| **Phase 0** ✅ | Foundation — Express, middleware, config, health, Prisma, integrations |
| Phase 1 | Authentication — Supabase Auth, JWT validation, users, organizations |
| Phase 2 | Chatbots — CRUD, configuration, system prompts |
| Phase 3 | Knowledge — document management, RAG integration |
| Phase 4 | Conversations — chat sessions, messaging, real-time |
| Phase 5 | Deployment — widget, public API, embed codes |
| Phase 6 | Usage & Billing — tracking, subscriptions, limits |
