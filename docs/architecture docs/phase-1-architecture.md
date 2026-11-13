# Prompt Vault — Phase 1 MVP Architecture

This document defines the architecture for **Phase 1 (MVP)** of Prompt Vault.

This document is the architectural source of truth for Phase 1.

Once Phase 1 is completed, this document should be treated as a historical record of the Phase 1 architecture. Changes introduced in later phases must be documented in their respective phase architecture documents.

---

# 1. Project Structure

```text
prompt-vault/
├── client/                       # React frontend application
├── server/                       # Node.js/Express backend API
│   └── prisma/                   # Prisma schema and database configuration
├── docs/
│   ├── prompt-vault-prd.md
│   ├── prd docs/
│   │   └── phase-1-mvp.md
│   ├── architecture docs/
│   │   └── phase-1-architecture.md
│   ├── appFlow.md
│   └── phases.md
├── AGENTS.md                     # Instructions and rules for AI coding agents
└── coding-standards.md           # Coding conventions
```

The project is separated into client, server, database/Prisma, and documentation areas.

---

# 2. High-Level System Architecture

```text
                ┌──────────────┐
                │     User     │
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │    React     │
                │  Frontend    │
                └──────┬───────┘
                       │
                    HTTP API
                       │
                       ▼
                ┌──────────────┐
                │   Express    │
                │   Backend    │
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │   Prisma     │
                │     ORM      │
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │ PostgreSQL   │
                └──────────────┘
```

The React frontend communicates with the Express backend through HTTP APIs.

The Express backend handles authentication, authorization, input validation, business logic, and database operations.

Prisma is used by the backend to communicate with PostgreSQL.

The frontend must not communicate directly with PostgreSQL.

---

# 3. Core Components

## 3.1 Frontend

**Name:** Prompt Vault Web Application

**Technology:**

* React
* TypeScript

**Responsibilities:**

* Email magic-link authentication
* Google OAuth authentication
* GitHub OAuth authentication
* User logout
* Display user's prompts
* Create prompts
* View individual prompts
* Edit prompts
* Update prompts
* Delete prompts
* Search prompts
* Filter prompts
* Copy prompt content

The frontend communicates with the backend through HTTP APIs.

---

## 3.2 Backend

**Name:** Prompt Vault API

**Technology:**

* Node.js
* Express
* TypeScript

**Responsibilities:**

* Authentication (email magic link, Google OAuth, GitHub OAuth)
* Authorization
* User management
* Prompt CRUD operations
* Prompt search
* Prompt filtering
* Input validation
* Business logic
* Database communication

The backend is responsible for enforcing authentication, authorization, and prompt ownership.

---

# 4. Data Layer

## 4.1 Primary Database

**Name:** Prompt Vault Database

**Type:** PostgreSQL

**Purpose:**

Stores persistent application data.

**Main entities:**

* User
* Prompt
* Category
* Tag

A user owns their prompts.

A prompt can have multiple categories and multiple tags.

Categories and tags are separate organizational systems.

A user must only be able to access and modify their own prompts.

The detailed database schema is defined using Prisma.

---

## 4.2 ORM

**Name:** Prisma

**Type:** ORM

**Purpose:**

Prisma provides type-safe database access between the Node.js/Express backend and PostgreSQL.

Prisma is not a separate data store.

---

# 5. External Integrations

Phase 1 requires external authentication providers for Google and GitHub OAuth and an email delivery mechanism for magic-link authentication. Provider credentials and email-service credentials must remain server-side.

AI functionality is not part of Phase 1.

Community functionality is not part of Phase 1.

---

# 6. Deployment & Infrastructure

Phase 1 uses a simple full-stack architecture consisting of:

* One React frontend
* One Node.js/Express backend
* One PostgreSQL database

Phase 1 does not require:

* Redis
* Nginx
* Microservices
* Message queues
* Kubernetes
* Additional backend services

Deployment-specific infrastructure is outside the Phase 1 architecture unless explicitly required for the MVP.

---

# 7. Authentication & Security

## 7.1 Authentication

Users authenticate using email magic links, Google OAuth, or GitHub OAuth.

First-time account creation occurs only after successful authentication.

All supported methods establish the same application session.

The backend is responsible for verifying authentication.

---

## 7.2 Authorization

Authorization is enforced by the backend.

A user must only be able to access, edit, update, or delete their own prompts.

The backend must not trust authorization decisions made only by the frontend.

---

## 7.3 Authentication Token and Session Security

Magic-link tokens must expire and be single-use.

OAuth provider responses must be verified before a session is established.

Authentication tokens and session credentials must be protected and must not be exposed unnecessarily.

---

## 7.4 Secrets

Sensitive values such as:

* Database credentials
* Authentication secrets
* Other private configuration values

must be stored using environment variables.

Sensitive values must not be committed to the repository.

---

## 7.5 Input Validation

User input must be validated on the backend.

Frontend validation may be used to improve user experience, but it must not replace backend validation.

---

# 8. Development & Testing

## 8.1 Development

The frontend and backend are developed as separate application areas.

They communicate through HTTP APIs.

TypeScript is used for both frontend and backend development.

---

## 8.2 Database Development

Prisma is used for:

* Database schema definition
* Database migrations
* Database access

PostgreSQL is the Phase 1 database.

---

## 8.3 Testing

Testing tools and conventions will only be documented here when they are actually introduced into the project.

Do not document tools that are not being used.

---

# 9. Phase 1 Scope

The Phase 1 architecture supports the requirements defined in:

```text
docs/prd docs/phase-1-mvp.md
```

Phase 1 includes:

* Email magic-link authentication
* Google OAuth authentication
* GitHub OAuth authentication
* First-time account creation after successful authentication
* Authentication persistence
* Logout
* Authorization
* Manual prompt creation
* Prompt viewing
* Individual prompt viewing
* Prompt editing
* Prompt updating
* Prompt deletion
* Prompt searching
* Prompt filtering
* Copying prompts

Phase 1 explicitly excludes:

* AI prompt generation
* AI prompt improvement
* Community features
* Favorites
* Prompt sharing
* Redis
* Nginx
* Advanced scaling infrastructure

---

# 10. Architectural Principles

Phase 1 follows these principles:

1. Keep the MVP architecture simple.
2. Use React and TypeScript for the frontend.
3. Use Node.js, Express, and TypeScript for the backend.
4. Use PostgreSQL as the primary database.
5. Use Prisma as the ORM.
6. Keep frontend and backend responsibilities separate.
7. Keep database access inside the backend.
8. Enforce authentication and authorization on the backend.
9. Ensure users can only access their own prompts.
10. Avoid unnecessary dependencies and infrastructure.
11. Avoid premature optimization.
12. Prefer simple solutions appropriate for the MVP.
13. Do not introduce features outside the Phase 1 PRD unless explicitly approved.

---

# 11. Project Identification

**Project Name:** Prompt Vault

**Phase:** Phase 1 — MVP

**Architecture Type:** Full-stack monolithic web application

**Frontend:** React + TypeScript

**Backend:** Node.js + Express + TypeScript

**Database:** PostgreSQL

**ORM:** Prisma

**Architecture Status:** Phase 1

---

# 12. Phase Boundary

Phase 1 is considered architecturally complete when the implementation satisfies the Phase 1 PRD and follows the architecture defined in this document.

Any major architectural changes required for a later phase must not be added to this document.

Instead, the later phase must have its own architecture document.

For example:

```text
docs/
├── prd docs/
│   ├── phase-1-mvp.md
│   └── phase-2-ai.md
│
└── architecture docs/
    ├── phase-1-architecture.md
    └── phase-2-ai-architecture.md
```

Phase 2 may introduce technologies such as AI services, Redis, Nginx, or other infrastructure if they are required by the Phase 2 requirements.

Those changes belong to the Phase 2 architecture document.

---

# 13. Glossary

### Prompt

A piece of text or instruction saved by a user for reuse with an AI tool.

### Prompt Vault

The application where users store, manage, search, filter, and reuse their prompts.

### MVP

Minimum Viable Product. The initial version of Prompt Vault containing the core prompt-management functionality.

### Prisma

The ORM used by the backend to communicate with PostgreSQL.

### Authentication

The process of verifying the identity of a user.

### Authorization

The process of determining whether an authenticated user is allowed to perform a particular action or access a particular resource.
