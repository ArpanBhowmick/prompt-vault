# AGENTS.md

## 1. Project Overview

Prompt Vault is a full-stack web application for securely storing and managing a user's AI prompts.

The current product scope is defined by `PRD.md`.

The current project is an MVP. Do not implement future features unless the user explicitly requests them.

### Current MVP capabilities

- User registration
- User login
- User logout
- Authentication and protected routes
- Create prompts manually
- View user's prompts
- View an individual prompt
- Edit/update prompts
- Delete prompts
- Search prompts
- Filter prompts
- Copy prompt content

### Explicitly out of scope unless requested

- AI prompt generation
- AI prompt improvement
- Favorites
- Community/public prompts
- Likes/comments
- Prompt sharing
- Prompt version history
- Advanced analytics
- Redis
- Additional AI providers
- Teams/collaboration
- Notifications

---

## 2. Technology Stack

The intended stack is:

### Frontend
- React
- TypeScript

### Backend
- Node.js
- Express
- TypeScript

### Database
- PostgreSQL
- Prisma ORM

Use the technologies already present in the repository before introducing alternatives.

Do not add a framework, library, ORM, database, service, or infrastructure tool unless it is necessary for the requested task or the user explicitly asks for it.

---

## 3. Source of Truth

Use this priority order:

1. Direct user instructions in the current task
2. `PRD.md`
3. `docs/architecture.md`, when present
4. Existing code and established project conventions
5. Other documentation

If the user explicitly requests something that differs from the PRD, follow the user's current instruction and update relevant documentation when appropriate.

Do not silently change product requirements.

---

## 4. Before Making Changes

Before modifying code:

1. Read the relevant section of `PRD.md`.
2. Inspect the existing implementation related to the task.
3. Understand how the existing code works before changing it.
4. Identify the smallest set of changes required.
5. Check whether the task affects other parts of the system.

Do not assume a missing feature means the surrounding architecture should be redesigned.

Do not rewrite existing code simply because a different approach may be cleaner.

---

## 5. Scope Control

### 5.1 Stay within the requested task

Implement exactly what the user asks for.

Do not add unrequested features, refactors, abstractions, services, database entities, API endpoints, dependencies, or infrastructure unless they are required to correctly implement the requested task.

### 5.2 Do not modify unrelated code

When working on one feature, do not modify unrelated features.

For example, if the task is authentication, do not refactor prompt search, prompt cards, filtering, dashboard UI, unrelated models, or unrelated routes unless the requested authentication change genuinely requires it.

### 5.3 Prefer minimal changes

Prefer the smallest correct change that satisfies the requirement.

Avoid rewriting or restructuring large portions of the application to implement a small feature.

---

## 6. Required Approval Before Consequential Changes

The agent may make normal implementation changes without asking for approval.

However, **stop and ask the user before making a consequential change that was not explicitly requested.**

Examples include:

### Database
- Adding/removing a model
- Adding/removing/changing a field
- Changing relationships
- Changing enums or constraints
- Adding/removing indexes
- Creating or modifying migrations

### API
- Adding an endpoint not required by the task
- Removing an endpoint
- Changing an existing request/response contract
- Changing authentication or authorization behavior

### Dependencies
- Adding, removing, or replacing packages
- Changing a major framework/dependency

### Architecture
- Changing established architecture
- Introducing a new architectural pattern
- Introducing Redis, queues, microservices, or external services

### Infrastructure
- Changing deployment, Docker, CI/CD, or environment requirements

### Existing behavior
- Changing behavior outside the requested feature
- Removing existing functionality

When approval is required, explain:

1. What change is needed
2. Why it is needed
3. Which files/components will be affected
4. What alternatives exist, if relevant

Then wait for the user's decision.

---

## 7. No Silent Changes

Never silently make important changes.

If a task requires an unexpected change, explicitly report it.

Example:

> Implementing this feature requires adding `refreshToken` information to the database model. This is a schema change that was not explicitly requested. I have not made the change yet. Should I proceed?

Do not make the change first and explain it afterward.

---

## 8. Database Safety

Before changing the Prisma schema:

1. Inspect the current schema.
2. Determine whether the change is actually required.
3. Explain the proposed schema change if it was not explicitly requested.
4. Ask for approval when required by Section 6.
5. Use the appropriate Prisma migration.
6. Do not modify production data directly.
7. Do not reset or wipe the database unless explicitly instructed.

Never use destructive database commands as a shortcut.

Do not change existing models simply to make a local implementation easier.

---

## 9. Authentication and Authorization Safety

Authentication and authorization are security-sensitive.

When modifying authentication:

- Inspect the existing flow first.
- Preserve working behavior unless the task requires changing it.
- Do not weaken authentication or authorization.
- Never expose passwords or password hashes.
- Do not expose refresh tokens unnecessarily.
- Preserve secure cookie behavior.
- Enforce authorization on the backend.
- Never rely only on frontend checks.
- Preserve prompt ownership checks.

A user must not be able to access, edit, update, or delete another user's prompts by manipulating an ID or request.

If changing authentication requires an architectural or database change, follow the approval rules above.

---

## 10. Frontend Rules

Use the existing frontend architecture and conventions.

Before creating a component:

1. Check whether an existing component can be reused.
2. Check the existing folder structure.
3. Follow existing naming conventions.

Do not duplicate components unnecessarily.

Do not introduce a new state-management or form/validation library when existing mechanisms are sufficient.

Do not silently replace real API data with mock data.

Handle appropriate loading, error, empty, and success states.

Keep UI changes isolated from unrelated functionality.

---

## 11. Backend Rules

Follow the existing backend architecture.

Where these layers exist, follow:

```text
Route
  ↓
Middleware
  ↓
Validation
  ↓
Controller
  ↓
Service
  ↓
Prisma
  ↓
PostgreSQL
```

Do not place large amounts of business logic directly inside routes when the architecture separates it.

Validate important input on the backend even if frontend validation exists.

Never trust client-provided ownership information.

Use the authenticated user's identity from the server-side authentication mechanism when determining resource ownership.

---

## 12. API Rules

Before adding or changing an endpoint:

1. Check whether an existing endpoint already satisfies the requirement.
2. Follow existing URL and naming conventions.
3. Follow existing request/response conventions.
4. Validate input.
5. Apply authentication/authorization where required.
6. Avoid breaking existing consumers.

Do not create duplicate endpoints for the same responsibility.

If an API contract must change, clearly disclose the change.

---

## 13. TypeScript Rules

Use TypeScript consistently.

Prefer:

- Existing project types/interfaces
- Type-safe API boundaries
- Type-safe Prisma usage
- Clear types for important data

Avoid:

- `any` unless genuinely necessary
- Unnecessary type assertions
- Duplicating existing types
- Ignoring TypeScript errors

Do not suppress a TypeScript error without understanding and explaining why.

---

## 14. Code Quality

Follow the existing code style.

Prefer readable, maintainable code over clever code.

Do not:

- Add unnecessary abstractions
- Over-engineer simple features
- Create premature generic utilities
- Duplicate logic unnecessarily
- Perform unrelated refactors during feature work

Use clear names and keep responsibilities focused.

---

## 15. Dependency Rules

Before adding a dependency, determine whether the requirement can be implemented using:

1. Existing project dependencies
2. Native platform functionality
3. Existing project utilities

Only add a dependency when it provides a meaningful benefit or is genuinely required.

When adding one, report:

```text
Package:
Reason:
Why existing dependencies are insufficient:
```

Never add packages silently.

---

## 16. Environment and Secrets

Never hardcode:

- Passwords
- API keys
- JWT secrets
- Database credentials
- Private tokens
- Other secrets

Use environment variables.

Do not modify `.env` files containing real secrets unless explicitly instructed.

When a new environment variable is required:

1. Explain why it is required.
2. Document its name in `.env.example`.
3. Never expose its secret value.

---

## 17. File and Folder Rules

Before creating a new file:

- Check whether an existing file already has the responsibility.
- Follow the current folder structure.
- Follow existing naming conventions.

Do not create duplicate files merely because another location seems convenient.

Do not reorganize the repository unless explicitly requested or genuinely required.

---

## 18. Documentation Rules

When implementation changes the current architecture or important project behavior, update relevant documentation.

Current documentation responsibilities:

- `PRD.md` — product requirements
- `docs/architecture.md` — current technical architecture
- `docs/roadmap.md` — future/planned work
- `AGENTS.md` — rules for coding agents

Do not create `phase-2`, `v2`, or duplicate architecture documents just because the architecture changes.

Update the current documentation and let Git preserve historical versions.

Do not document features as implemented if they do not actually exist.

---

## 19. Future Features

The roadmap may contain future features such as:

- AI prompt generation
- AI prompt improvement
- Community
- Favorites
- Redis
- Prompt versioning
- Additional AI providers

These are not automatically authorized for implementation.

A roadmap item becomes implementation scope only when the user explicitly requests it.

Do not "prepare for future scale" by adding unnecessary infrastructure today.

---

## 20. Working With AI-Generated Code

AI-generated code must be treated like any other code.

Before accepting or modifying generated code:

1. Understand what it does.
2. Check how it interacts with existing code.
3. Check for unnecessary changes.
4. Check security implications.
5. Check database implications.
6. Check API implications.
7. Check whether it follows the project's architecture.

Do not blindly accept generated code.

---

## 21. Change Isolation

For every task, keep the change isolated.

Before finishing, inspect the diff and verify:

- No unrelated files were changed.
- No unrelated functionality was modified.
- No accidental debugging code remains.
- No temporary/mock code was introduced unintentionally.
- No secrets were added.
- No unexpected dependency was added.
- No unexpected database change was made.

If unrelated changes are discovered, revert them unless they are required and disclosed.

---

## 22. Verification

After implementing a change, verify it as far as the available tooling allows.

Depending on the task, run appropriate checks such as:

- TypeScript type checking
- Linting
- Unit tests
- Integration tests
- Build
- Relevant application tests

Do not claim a feature is working if it was not verified.

If verification cannot be performed, clearly state what was not verified and why.

---

## 23. Required Final Report

After completing a task, provide a concise change report.

Use this format:

```text
## Changes Made

### Modified
- file/path

### Added
- file/path

### Deleted
- file/path

### Database
- None
OR
- Describe every schema/migration change

### API
- None
OR
- Describe every API change

### Dependencies
- None
OR
- Describe every dependency change

### Environment
- None
OR
- Describe every new/changed environment variable

### Verification
- Type check: PASS/NOT RUN
- Lint: PASS/NOT RUN
- Tests: PASS/NOT RUN
- Build: PASS/NOT RUN

### Notes
- Important implementation detail
- Limitation
- Follow-up required
```

The report must mention important changes even when they were necessary rather than explicitly requested.

---

## 24. Stop Conditions

Stop and ask the user rather than making assumptions when:

- Requirements are ambiguous in a way that affects implementation
- An unexpected database schema change is required
- An API contract must unexpectedly change
- A dependency must unexpectedly be added
- Existing behavior must unexpectedly change
- A security-sensitive decision is unclear
- Multiple architectural approaches have materially different consequences
- The requested implementation conflicts with the PRD or existing architecture

Do not guess when the decision could materially affect the project.

---

## 25. General Principle

The primary goal is:

> **Make the requested change correctly while changing as little unrelated code as possible.**

Before every significant change, ask:

```text
Is this required?
Is this within the requested scope?
Does this match the PRD?
Does this match the existing architecture?
Could this affect another feature?
Does this change the database, API, dependencies, or security?
```

If an important answer is unclear, investigate the existing code first.

If the change is consequential and was not requested, explain it and ask before proceeding.

Never optimize for the amount of code changed.

Optimize for correctness, consistency, security, and minimal unintended impact.
