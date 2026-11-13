# Prompt Vault — Coding Standards


## Modern and Version-Aware Development Practices

- Use current, stable, industry-recommended development practices across the entire technology stack.
- Follow the official documentation and recommendations for the versions installed in this project.
- Verify that APIs, methods, and patterns are currently supported before using them.
- Do not introduce deprecated, obsolete, or legacy APIs in new implementations when a recommended alternative exists.
- Prefer modern, idiomatic React, TypeScript, Node.js, Express, and Prisma patterns.
- Do not blindly follow outdated tutorials, examples, or coding conventions.
- Do not adopt experimental or unstable features without explicit approval.
- Do not upgrade dependencies simply to access newer APIs.
- Do not assume an existing practice is obsolete just because an alternative exists. Verify its current status first.
- When current best practices cannot be verified, do not guess. Explain the uncertainty and use an established, supported approach.
- Maintain consistency and readability throughout the codebase.

The objective is to ensure that new code follows current, recommended development practices rather than outdated conventions.

## 1. Purpose

These standards define how code should be written throughout Prompt Vault.

The primary goals are:

- Readable and understandable code.
- Consistent coding conventions.
- Maintainable and scalable architecture.
- Modern, TypeScript-first development practices.
- Minimal unnecessary complexity.
- Code that another developer can understand and modify without extensive explanations.
- Before selecting an unfamiliar or version-sensitive API or coding pattern, inspect the installed package version and verify the recommended usage in its official documentation.
- Prefer stable, officially recommended solutions over simply choosing the newest available feature.

**Core principle: Prefer simple, readable, well-organized code over clever, compressed, or unnecessarily abstract code.**

These standards apply to all new and modified code.

---

## 2. General Coding Principles

- Write code that is easy to understand, debug, and maintain.
- Prefer clear implementations over clever shortcuts.
- Keep functions and components focused on a clear responsibility.
- Avoid unnecessarily long functions and deeply nested conditions.
- Avoid premature abstractions and unnecessary generic utilities.
- Do not duplicate complex business logic.
- Do not introduce abstractions merely to reduce a few lines of code.
- Use descriptive variable, function, component, and type names.
- Keep related code together.
- Follow the existing project architecture and conventions.
- Do not introduce unnecessary complexity in the name of scalability.

Scalability should come from clear separation of responsibilities and maintainable code, not premature architectural complexity.

---

## 3. TypeScript Standards

TypeScript must be used consistently across the frontend and backend.

### 3.1 Type Safety

- Avoid `any` unless there is a justified reason.
- Prefer `unknown` when the type of a value is genuinely unknown, then narrow it before use.
- Avoid unnecessary type assertions.
- Avoid non-null assertions (`!`) unless the safety of the value is established.
- Do not suppress TypeScript errors simply to make the code compile.
- Do not weaken existing TypeScript compiler settings to avoid fixing errors.
- Use type inference when TypeScript can determine the type clearly.
- Explicitly define types at important application boundaries.

### 3.2 Interface vs Type

Use the following convention:

**Prefer `interface` for:**
- Object shapes.
- Component props.
- Data structures.
- Object contracts.

**Prefer `type` for:**
- Union types.
- Intersection types.
- Tuple types.
- Type compositions.
- Function types when appropriate.

Example:

```ts
interface User {
  id: string;
  name: string;
  email: string;
}

type UserRole = "user" | "admin";
type UserStatus = "active" | "inactive";
```

Do not create duplicate interfaces or types for the same data structure.

### 3.3 Type Organization

- Keep types close to the code that uses them when they are local.
- Use shared type files only when types are genuinely shared.
- Avoid creating large, unrelated collections of types.
- Keep API request and response types clear.
- Do not assume TypeScript types validate incoming runtime data. Validate external input at application boundaries.

### 3.4 Imports

- Use `import type` for imports used only as TypeScript types.
- Remove unused imports.
- Follow the existing import organization and alias conventions.
- Avoid circular dependencies.

---

## 4. React Standards

Use modern React patterns supported by the version installed in the project.

### 4.1 Functional Components

- Use function components.
- Prefer regular named function declarations for components.
- Do not use `React.FC` as the default component declaration style.
- Define component props using an appropriately named interface.
- Keep components focused on one clear responsibility.

Preferred:

```tsx
interface PromptCardProps {
  title: string;
  content: string;
}

function PromptCard({ title, content }: PromptCardProps) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{content}</p>
    </article>
  );
}

export default PromptCard;
```

Avoid introducing class components for ordinary application UI.

### 4.2 Component Organization

- Reuse existing components when appropriate.
- Create reusable components when there is a genuine need.
- Avoid creating separate components for every small piece of JSX.
- Keep business logic separate from presentation when doing so improves clarity.
- Avoid excessively large components with unrelated responsibilities.
- Follow the existing component folder structure.

### 4.3 React Hooks

- Follow the Rules of Hooks.
- Call Hooks at the top level of components or custom Hooks.
- Use custom Hooks to extract genuinely reusable stateful logic.
- Do not create custom Hooks unnecessarily.
- Avoid unnecessary `useEffect`, `useMemo`, and `useCallback`.
- Do not use Effects to calculate values that can be derived directly during rendering.
- Use Effects primarily to synchronize with external systems when required.
- Keep dependencies of Effects accurate.

### 4.4 State Management

- Keep state as close as possible to the components that need it.
- Avoid duplicating data that can be derived from existing state.
- Do not mutate React state directly.
- Use the existing state-management solution where one is already established.
- Do not introduce additional state-management libraries without approval.

### 4.5 Component Performance

- Do not optimize prematurely.
- Do not wrap every component in `React.memo`.
- Do not use `useMemo` and `useCallback` without a meaningful reason.
- Prefer straightforward implementations until a real performance concern exists.

### 4.6 UI and Accessibility

- Use appropriate semantic HTML elements.
- Provide accessible labels for form controls.
- Ensure interactive elements are keyboard accessible.
- Use buttons for actions and links for navigation.
- Handle loading, error, empty, and success states where appropriate.
- Avoid unnecessary conditional rendering complexity.

---

## 5. Frontend Code Organization

Follow the existing frontend folder structure.

Maintain clear separation between responsibilities such as:

- Components — reusable and page-specific UI.
- Pages — route-level screens.
- Hooks — reusable React logic.
- Services/API — communication with the backend.
- Types — TypeScript contracts.
- Utilities — reusable pure helper functions.

These are responsibility guidelines, not instructions to create every folder.

Only create additional modules or folders when they genuinely improve organization.

### Frontend Rules

- Do not place all application logic inside components.
- Do not put API requests directly into every component when an existing service layer is available.
- Keep API communication consistent.
- Avoid duplicated form validation.
- Avoid hardcoded mock data when real API integration exists.
- Keep presentation logic separate from complex business logic where appropriate.

---

## 6. Node.js and Express Backend Standards

Use TypeScript consistently throughout the backend.

### 6.1 Separation of Responsibilities

Follow the existing backend architecture.

Where these layers exist, maintain their responsibilities:

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

**Routes**
- Define endpoint paths and connect middleware/controllers.
- Keep route definitions simple.

**Middleware**
- Handle cross-cutting responsibilities such as authentication, authorization, and request processing.

**Validation**
- Validate incoming request data.
- Reuse the existing validation approach.

**Controllers**
- Handle HTTP requests and responses.
- Keep business logic out of controllers when a service layer exists.

**Services**
- Handle application business logic.
- Coordinate operations when required.

**Database access**
- Use Prisma through the established backend data-access pattern.
- Do not access the database directly from frontend code.

Do not introduce unnecessary layers for simple operations.

### 6.2 Function Organization

- Keep functions focused on a single responsibility.
- Use descriptive names.
- Avoid deeply nested conditionals.
- Avoid unnecessary callbacks and complicated control flow.
- Use `async/await` for asynchronous operations where appropriate.
- Handle asynchronous errors consistently.

### 6.3 Validation and Error Handling

- Validate untrusted request data on the backend.
- Do not rely exclusively on frontend validation.
- Follow the existing error-handling architecture.
- Do not silently swallow errors.
- Return appropriate HTTP status codes.
- Keep error responses consistent.
- Do not expose internal stack traces or sensitive implementation details to clients.

### 6.4 Security

- Never trust ownership information supplied by the client.
- Derive the authenticated user's identity from the server-side authentication mechanism.
- Enforce resource ownership on the backend.
- Never expose passwords, password hashes, secrets, or authentication tokens unnecessarily.
- Use environment variables for sensitive configuration.

---

## 7. Prisma and Database Standards

Use Prisma consistently for database operations.

- Follow the existing Prisma schema and naming conventions.
- Use descriptive model and field names.
- Keep database relationships clear.
- Use appropriate Prisma-generated types.
- Retrieve only the fields needed for an operation when practical.
- Avoid unnecessary database queries.
- Use transactions when multiple related operations must succeed or fail together.
- Avoid raw SQL when Prisma already provides a clear and safe solution.
- When raw SQL is necessary, use safe parameterized queries.
- Do not duplicate database business rules unnecessarily across different parts of the backend.

Never introduce database schema changes or migrations without following the approval rules in `AGENTS.md`.

---

## 8. Naming Conventions

Use consistent and descriptive naming.

| Element | Convention | Example |
|---|---|---|
| React components | PascalCase | `PromptCard` |
| Interfaces | PascalCase | `PromptProps` |
| Type aliases | PascalCase | `UserRole` |
| Functions | camelCase | `createPrompt` |
| Variables | camelCase | `promptTitle` |
| Constants | camelCase by default | `apiBaseUrl` |
| Environment variables | UPPER_SNAKE_CASE | `DATABASE_URL` |
| React Hooks | camelCase with `use` prefix | `usePrompts` |

### Additional Rules

- Avoid unclear abbreviations.
- Prefer meaningful names over short names.
- Use names that communicate purpose.
- Follow the existing file-naming convention.
- Avoid inconsistent naming for the same concept.

---

## 9. Comments and Documentation

Code should be understandable primarily through its structure and naming.

- Do not comment on every line.
- Avoid comments that simply repeat what the code already says.
- Write comments to explain why a decision was made or why a complex operation is necessary.
- Document non-obvious business rules.
- Add documentation to complex public functions when it genuinely helps.
- Update relevant documentation when important application behavior or architecture changes.

Prefer understandable code over excessive comments.

---

## 10. Code Formatting and Linting

- Follow the project's existing ESLint and Prettier configuration.
- Maintain consistent indentation and formatting.
- Remove unused variables and imports.
- Avoid unnecessary lint-disable directives.
- Do not disable TypeScript or ESLint checks simply to suppress warnings.
- Follow the formatting configuration already established in the repository.

Do not introduce additional formatting tools without approval.

---

## 11. Testing and Verification

- Write tests for meaningful application behavior when a test setup exists.
- Test important business logic and edge cases.
- Follow the existing testing framework and conventions.
- Do not introduce a new testing framework without approval.
- Run relevant TypeScript checks, linting, tests, and builds when available.
- Do not claim that code works without appropriate verification.

---

## 12. Practices to Avoid

Avoid the following:

- Using `any` unnecessarily.
- Using `React.FC` as the default component style.
- Creating excessively large components or controllers.
- Writing deeply nested conditional logic.
- Using unnecessary `useEffect` hooks.
- Adding `useMemo` and `useCallback` everywhere.
- Creating abstractions for code that does not need them.
- Duplicating business logic.
- Creating unnecessary files and folders.
- Writing overly compressed or clever code.
- Ignoring TypeScript errors.
- Disabling lint rules without justification.
- Introducing dependencies to solve problems that existing tools already handle.
- Optimizing code without an identified performance need.
- Refactoring unrelated code just to enforce these standards.

---

## 13. Working With Existing Code

These standards guide new and modified code.

When working with existing implementations:

- Follow the requested task's scope.
- Preserve existing functionality.
- Do not automatically rewrite existing code simply because it uses a different coding style.
- Do not perform unrelated refactoring to make the entire codebase conform to these standards.
- When modifying an existing module, maintain consistency with its surrounding implementation unless the requested task requires improvement.

Any broader refactoring must follow the approval requirements in `AGENTS.md`.

---

## 14. Final Coding Principle

The goal is not to write the least amount of code possible.

The goal is to write the **clearest correct code with the least unnecessary complexity**.

Every implementation should be:

- Easy to read.
- Easy to understand.
- Easy to debug.
- Easy to maintain.
- Consistent with the rest of the project.
- Appropriate for the current requirements without unnecessary future complexity.

A developer should be able to return to the project months or years later and understand its structure, responsibilities, and logic without having to reverse-engineer every file.