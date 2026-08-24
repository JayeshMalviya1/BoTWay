# Botway Core Architecture

## System Overview

Botway is a multi-tenant SaaS AI chatbot platform. The architecture is split into two backend services:

1. **Express Core Backend** (`botway-core`) — application/business layer
2. **Python RAG Server** (future) — heavy document processing and retrieval

```mermaid
flowchart TD
    A["React Frontend<br/>(localhost:5173)"] -->|"HTTP/REST"| B["Express Core Backend<br/>(localhost:8000)"]
    B -->|"Direct connection"| C["Supabase<br/>PostgreSQL + Auth + Storage"]
    B -->|"Internal API<br/>(authenticated)"| D["Python RAG Server<br/>(localhost:8001)"]
    D -->|"pgvector"| C
    B -->|"API calls"| E["LLM Provider<br/>(OpenAI / Anthropic / Google)"]

    style A fill:#3b82f6,color:#fff
    style B fill:#10b981,color:#fff
    style C fill:#8b5cf6,color:#fff
    style D fill:#f59e0b,color:#fff
    style E fill:#ef4444,color:#fff
```

> **Important**: The browser MUST NEVER communicate directly with the RAG server. All RAG operations go through the Core Backend.

---

## Responsibility Split

### Core Backend (Express)

| Domain | Responsibilities |
|--------|-----------------|
| **Auth** | JWT validation, session management, Supabase Auth integration |
| **Users** | Profile CRUD, avatar management |
| **Organizations** | Tenant CRUD, member management, tenant isolation |
| **Chatbots** | CRUD, configuration, behavior, appearance, system prompt orchestration |
| **Knowledge** | Metadata management, orchestrating ingestion via RAG server |
| **Conversations** | Session management, message storage, chat history |
| **Deployments** | Widget config, embed code, public chatbot API |
| **Usage** | Message/token/API call tracking, analytics |
| **Billing** | Subscriptions, plan limits, payments |

### RAG Server (Python/FastAPI — Future)

| Domain | Responsibilities |
|--------|-----------------|
| **Ingestion** | PDF extraction, document parsing |
| **Processing** | Chunking, text splitting |
| **Embeddings** | Vector generation via embedding models |
| **Indexing** | pgvector storage and management |
| **Retrieval** | Vector search, reranking |
| **RAG** | Context assembly for LLM |

---

## Request Flow

```mermaid
flowchart LR
    A[HTTP Request] --> B[Route]
    B --> C[Controller]
    C --> D[Service]
    D --> E[Repository]
    E --> F[Database]

    D -->|"External"| G[Integration / Provider]
    G --> H[External Service]

    style C fill:#fbbf24,color:#000
    style D fill:#34d399,color:#000
    style E fill:#60a5fa,color:#000
```

### Rules

- **Controllers** are thin — extract input, call service, return response
- **Services** contain business logic, orchestrate repos + integrations
- **Repositories** handle database operations via Prisma
- **Integrations** handle external service communication

---

## Multi-Tenancy

```mermaid
flowchart TD
    U[User] --> O[Organization]
    O --> OM[Organization Member]
    OM --> CH[Chatbot]
    CH --> K[Knowledge]
    CH --> CO[Conversations]
    CH --> DE[Deployment]
    CH --> US[Usage]
```

Every organization-owned resource is scoped to an organization. The backend derives organization access from authenticated membership — never from frontend-supplied `organization_id`.

---

## Future Authentication Flow

```mermaid
sequenceDiagram
    participant Browser
    participant Supabase Auth
    participant Core Backend
    participant Database

    Browser->>Supabase Auth: Login (email/password)
    Supabase Auth-->>Browser: JWT + Session
    Browser->>Core Backend: API Request + JWT
    Core Backend->>Core Backend: Validate JWT
    Core Backend->>Database: Get User Membership
    Database-->>Core Backend: Organization + Role
    Core Backend->>Core Backend: Authorize
    Core Backend-->>Browser: Response
```

---

## Future Chatbot Structure

```
Chatbot
├── Basic information (name, description)
├── Business description
├── System prompt (AI-generated + user-edited)
├── Behavior (tone, rules, restrictions)
├── Appearance (colors, avatar, widget style)
├── Knowledge configuration (connected sources)
├── Deployment configuration (domains, widget embed)
└── Usage (message counts, token usage)
```
