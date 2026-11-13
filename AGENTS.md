# AGENTS.md

## 1. Project Overview

Prompt Vault is a full-stack web application for securely storing and managing a user's AI prompts.

The current product scope is defined by `docs/prompt-vault-prd.md`.

The current project is an MVP. Do not implement future features unless the user explicitly requests them.

### Current MVP capabilities

- Email magic-link authentication
- Google OAuth authentication
- GitHub OAuth authentication
- Shared application session across authentication methods
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
2. `docs/prompt-vault-prd.md` — central product requirements
3. `docs/prd docs/phase-1-mvp.md` — current Phase 1 requirements
4. `docs/architecture docs/phase-1-architecture.md` — current technical architecture
5. `coding-standards.md` — coding conventions
6. Existing code and established project conventions
7. Other documentation

If the user explicitly requests something that differs from the PRD, follow the user's current instruction and update relevant documentation when appropriate.

Do not silently change product requirements.

---

## 4. Before Making Changes

Before modifying anything:

1. Check the current Git status and identify existing uncommitted changes.
2. Read the relevant sections of the PRD and architecture documentation.
3. Inspect the existing implementation related to the requested task.
4. Understand how the existing code works and which other parts depend on it.
5. Identify the specific files and folders that need to be modified.
6. Determine the smallest set of changes required.
7. Check whether the task can be completed without affecting other parts of the project.

### Protect Existing Work

- Never overwrite, discard, reset, or revert the user's existing changes.
- Do not assume uncommitted changes are unimportant or unwanted.
- Do not replace working implementations without a clear reason.
- Do not modify files simply because they could be improved.
- Do not perform changes outside the requested scope without approval.

Reading files outside the requested scope is allowed when necessary to understand dependencies. However, reading or inspecting a file does not authorize modifying it.

If implementation requires changes outside the requested scope, stop and explain why before proceeding.

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


### 5.4 Respect the Task's Scope

Every task has a defined scope. Stay within that scope.

Examples:

- If the user requests a frontend change, work within the existing frontend directory.
- If the user requests a backend change, work within the existing backend directory.
- If the user identifies a specific feature or folder, limit modifications to that feature or folder.
- If the user requests a database change, do not unnecessarily modify frontend or backend functionality unrelated to that change.

The agent may inspect other parts of the repository to understand dependencies, but must not modify them without authorization.

If the requested task genuinely requires modifications outside its original scope:

1. Explain why the additional changes are necessary.
2. Identify the affected files and folders.
3. Explain the impact on existing functionality.
4. Wait for the user's approval before modifying anything outside the original scope.

Do not expand the scope of a task independently.

Do not use a focused feature request as an opportunity to refactor, reorganize, clean up, or improve the rest of the project.

---

## 6. Required Approval Before Consequential Changes

The agent may modify existing code within the explicitly requested scope when implementing the requested task.

However, the agent must stop and obtain user approval before performing the following actions unless the user has explicitly authorized them.

### 6.1 Files and Folders

- Creating new files.
- Creating new folders.
- Deleting existing files or folders.
- Renaming or moving existing files or folders.
- Replacing an existing implementation with a substantially different one.
- Restructuring the repository.

### 6.2 Scope Expansion

- Modifying files outside the requested folder or feature.
- Modifying unrelated frontend components.
- Modifying unrelated backend routes, controllers, services, or middleware.
- Changing existing functionality outside the requested task.
- Making changes to shared code that affect other features.

### 6.3 Database

- Adding or removing models.
- Adding, removing, or changing fields.
- Changing relationships.
- Changing enums or constraints.
- Adding or removing indexes.
- Creating or modifying migrations.
- Performing destructive database operations.

### 6.4 API and Backend Contracts

- Adding or removing endpoints beyond the requested scope.
- Changing existing request or response structures.
- Changing established API behavior.
- Changing authentication or authorization behavior.

### 6.5 Dependencies and Configuration

- Installing, removing, or replacing packages.
- Changing major framework or dependency versions.
- Modifying project configuration.
- Introducing new services or infrastructure.
- Changing deployment, Docker, or CI/CD configuration.
- Introducing external APIs or providers.

### 6.6 Existing Functionality and Security

- Removing existing functionality.
- Replacing a working implementation.
- Changing established application behavior.
- Making security-sensitive architectural decisions.

### Approval Process

When approval is required, explain:

1. What change is proposed.
2. Why it is necessary.
3. Which files, folders, or components will be affected.
4. Whether existing functionality will be affected.
5. What alternatives are available, if relevant.

Do not make the proposed changes until the user approves them.

Do not ask for approval again for changes the user has already explicitly authorized.

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
- Never expose authentication tokens, session credentials, or other authentication secrets.
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

Preserve the existing repository structure.

Before creating a file:

- Check whether an existing file already handles the responsibility.
- Check whether the new file is genuinely necessary.
- Follow the existing folder structure and naming conventions.
- Explain the proposed file path and its purpose.
- Obtain user approval before creating it, unless explicitly requested.

Before creating a folder:

- Check whether an existing folder can accommodate the implementation.
- Avoid creating additional directory layers unnecessarily.
- Explain why the new folder is necessary.
- Obtain user approval before creating it, unless explicitly requested.

Before deleting, renaming, moving, or replacing existing files or folders:

- Inspect their contents and dependencies.
- Explain why the operation is necessary.
- Identify the affected paths.
- Obtain user approval before proceeding, unless explicitly requested.

Never:

- Create duplicate files unnecessarily.
- Move files simply to make the structure look cleaner.
- Delete existing code because it appears unused without investigating its usage.
- Replace existing implementations without understanding their dependencies.
- Reorganize the repository for personal preference.
- Delete or overwrite the user's existing work.

---

## 18. Documentation Rules

When implementation changes the current architecture or important project behavior, update relevant documentation.

Current documentation responsibilities:

- `docs/prompt-vault-prd.md` — product requirements
- `docs/prd docs/phase-1-mvp.md` — current Phase 1 MVP requirements
- `docs/architecture docs/phase-1-architecture.md` — current technical architecture
- `docs/phases.md` — implementation phase tracking
- `docs/appFlow.md` — user journey flows
- `coding-standards.md` — coding conventions
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

## 21. Change Isolation and Existing Code Preservation

Every task must be implemented without unnecessarily affecting existing project functionality.

### Before Implementation

- Check Git status.
- Identify existing modified and untracked files.
- Preserve all changes that existed before the task.
- Identify the files expected to change for the requested task.

### During Implementation

- Modify only files within the authorized scope.
- Avoid unrelated formatting changes.
- Do not rewrite entire files when smaller targeted modifications are sufficient.
- Do not remove existing functionality unless explicitly authorized.
- Do not introduce temporary or mock implementations unnecessarily.
- Do not overwrite user-created code or existing uncommitted changes.

### After Implementation

Inspect the Git diff and verify:

- Only the expected files were modified.
- No unrelated functionality was changed.
- No existing user changes were overwritten.
- No unnecessary code was deleted.
- No unexpected dependencies were introduced.
- No unexpected database, API, or configuration changes were made.
- No accidental debugging or temporary code remains.

If the agent introduces unrelated modifications, identify them and explain how they will be restored.

Never automatically discard or revert changes whose origin is unclear.

Never use destructive Git operations such as `git reset --hard`, `git clean -fd`, or broad restore operations to clean up changes.

If the agent cannot confidently distinguish its own changes from pre-existing user changes, stop and ask the user.

Preserving existing work takes priority over automatically cleaning up the repository.

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
