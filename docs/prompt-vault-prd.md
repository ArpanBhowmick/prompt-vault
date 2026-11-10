# Prompt Vault — Central Product Requirements Document

**Document status:** Product source of truth — planning  
**Product:** Prompt Vault  
**Document owner:** Product owner  
**Last updated:** 2026-10-09  
**Scope:** Product-wide requirements, behavior, user journeys, constraints, phase roadmap, and unresolved decisions across the planned product.

> **Authority rule:** This document is the authoritative source of product requirements for Prompt Vault. Other project documents may break these requirements into implementation tasks or document technical implementation, but they must not silently override product behavior defined here. If a conflict appears, pause the conflicting implementation and update this document after an explicit product decision.

> **Decision rule:** This document distinguishes **Decided** requirements from **Proposed** plans and **TBD** decisions. A detail marked TBD is not permission for an agent to invent a consequential product behavior. Resolve it before implementing the affected feature.

---

## Table of Contents

1. Purpose and Authority
2. Product Summary
3. Problem, Vision, and Goals
4. Non-Goals and Product Principles
5. Target Users and User Types
6. Product Scope and Roadmap
7. Global Navigation and Shared Home Page
8. Authentication and Session Requirements
9. Prompt Data and Metadata Requirements
10. Manual Prompt Management
11. Search, Filtering, and Collection Behavior
12. AI Prompt Generation
13. Guest Generation and Sign-In Continuity
14. Community and Public Prompt Sharing
15. End-to-End User Flows
16. Screens and UI States
17. Permissions and Privacy Rules
18. Validation, Errors, and Reliability
19. Security and Abuse Prevention
20. Accessibility and Responsive Experience
21. Product Acceptance Criteria
22. Analytics and Operational Visibility
23. Technical Constraints and Boundaries
24. Decisions, Assumptions, and Open Questions
25. Document Governance and Change Control
26. Glossary

---

## 1. Purpose and Authority

### 1.1 Purpose

Prompt Vault is intended to give users one place to create, organize, find, reuse, generate, and optionally share AI prompts. This PRD records the full product direction so that implementation decisions do not depend on scattered conversation history or assumptions made while coding.

### 1.2 What this document governs

This document governs:

- Product purpose and intended users.
- Features and their intended behavior.
- Guest and authenticated-user experiences.
- Prompt fields, metadata, privacy, and ownership expectations.
- Authentication behavior from the user's perspective.
- AI-generation behavior and continuity through sign-in.
- Community publishing and reuse behavior.
- User journeys, error states, and acceptance criteria.
- Planned phase boundaries and unresolved product decisions.

### 1.3 What this document does not replace

Implementation details such as database table design, Prisma models, API route names, server module boundaries, indexes, email provider selection, session storage mechanism, and deployment configuration may be documented in `architecture.md`. Those technical choices must satisfy this PRD and must not alter product behavior without an explicit product decision.

### 1.4 Conflict resolution

1. This central PRD is the source of truth for product behavior.
2. Phase PRDs, if used, are implementation slices derived from this document. They may add detailed acceptance tests for their scope but may not contradict this document.
3. `architecture.md` records technical design and must remain consistent with this PRD.
4. `phases.md` tracks work, progress, blockers, and completion; it does not create new product requirements.
5. `AGENTS.md` defines coding-agent working rules; it does not redefine product behavior.
6. `appFlow.md` may visualize the journeys in this PRD but must not introduce conflicting journeys.
7. When a requirement changes, update this PRD first, then update affected implementation notes and task tracking.

---

## 2. Product Summary

Prompt Vault is a web application with three connected product capabilities:

1. **Personal prompt management:** Authenticated users manually create and manage a private collection of prompts.
2. **AI-assisted prompt creation:** A user describes the task they want to accomplish, Prompt Vault generates a prompt, and the user can review and edit it before saving. Guests can try this temporarily without an account.
3. **Community sharing:** Authenticated users can explicitly publish selected prompts so other users can discover, copy, and reuse them.

These capabilities are intended to grow in phases. The fact that a feature appears in this central PRD does not mean it must be implemented in the first release.

### 2.1 Core product promise

A user should be able to keep useful prompts in one place, find them later, edit them when needed, copy them into other AI tools, and eventually create prompts with AI and share selected prompts with the community.

### 2.2 Core privacy promise

A prompt saved to a user's personal collection is private by default. Saving a prompt is not the same as publishing it. It becomes publicly discoverable only through an explicit publishing action after authentication.

### 2.3 Core guest promise

A guest may try AI prompt generation and edit the current generated result temporarily. If the guest chooses to sign in so they can save that result, the current prompt should remain available through the sign-in flow so they do not have to generate it again, subject to clearly defined temporary-retention limits.

---

## 3. Problem, Vision, and Goals

### 3.1 Problem statement

People often keep prompts scattered across AI conversations, notes, documents, browser bookmarks, and websites. This makes prompts difficult to find, maintain, update, and reuse. In addition, users may know the task they want an AI system to perform but may not know how to write a good prompt for it.

### 3.2 Vision

Make useful prompts easy to create, organize, find, reuse, and share—without exposing a user's private prompt collection.

### 3.3 Product goals

- Provide a reliable personal collection for saving and organizing prompts.
- Support prompts written from scratch and prompts pasted from other tools.
- Let users view, edit, update, delete, and copy their own saved prompts.
- Help users find prompts using search, categories, and tags.
- Let visitors try AI prompt generation before signing in.
- Preserve a guest's current generated prompt through sign-in so it can be saved afterward.
- Let authenticated users save AI-generated prompts in their personal collection.
- Distinguish AI-generated prompts from manually created prompts using system-managed metadata.
- Let authenticated users explicitly publish selected prompts to a community.
- Let users discover and reuse community prompts when that feature is released.
- Enforce ownership and visibility rules on the backend.
- Keep implementation manageable and phase-based without silently expanding scope.

### 3.4 Measures of success

The following are qualitative acceptance outcomes, not numerical business targets:

- A user can complete the core personal prompt-management workflow without confusion.
- A saved prompt can be found again through search or filtering.
- Copying a prompt copies the intended prompt content.
- A guest can try generation without being forced to create an account first.
- A guest does not lose the current generated prompt merely because they enter the sign-in flow.
- Private prompts cannot be accessed by other users.
- A prompt is not published without the owner's explicit action.
- Errors are communicated honestly and do not masquerade as successful operations.

Numerical targets for activation, retention, generation volume, latency, or conversion are **TBD**; do not invent targets.

---

## 4. Non-Goals and Product Principles

### 4.1 Current non-goals

Unless explicitly added through a product decision, the following are not requirements for the initial private prompt-management release:

- AI prompt generation in the first phase.
- Community publishing and public discovery in the first phase.
- Password-based registration or password-based login.
- Automatic public sharing of saved prompts.
- A separate home page solely for authenticated users.
- A favorites feature in the initial MVP.
- A specific AI provider or model selected by the user.
- A specific visual design, component library, or media provider not yet decided.

### 4.2 Product principles

1. **One shared home page:** Guests and authenticated users use the same home page. Available actions may differ according to authentication status and the active release.
2. **Private by default:** A saved prompt belongs to its owner and stays private unless explicitly published.
3. **Explicit publishing:** Public visibility requires a deliberate user action.
4. **Guest-friendly trial:** AI generation can be tried before account creation/sign-in.
5. **No avoidable loss during sign-in:** The current guest-generated prompt should remain available to save after authentication, within defined temporary-storage limits.
6. **User control:** Users can review and edit generated prompts before saving them.
7. **System metadata is not a user tag:** AI origin must be stored separately from custom tags.
8. **Backend enforcement:** Frontend visibility and route guards are not security boundaries.
9. **Clear feedback:** Loading, success, empty, validation, and error states should be understandable.
10. **Phase discipline:** Implement only the features approved for the active phase; future requirements must not accidentally expand current scope.
11. **No silent assumptions:** Mark undecided behavior as TBD and obtain a product decision before implementing it.

---

## 5. Target Users and User Types

### 5.1 Target users

Prompt Vault is intended for people who use AI tools for work, learning, study, or personal projects, including:

- Developers and software engineers.
- Students and teachers.
- Researchers.
- Writers and content creators.
- Designers and image-generation users.
- Other professionals and regular AI-tool users.

The product does not currently require separate product experiences or role systems for these audiences.

### 5.2 Guest

A guest is a visitor who has not authenticated.

A guest can:

- Open and use the shared home page.
- Access AI prompt generation when that feature is released.
- Review and edit the current generated prompt temporarily.
- Start the sign-in flow when attempting to save permanently.
- Continue after successful sign-in with the temporary prompt available for saving, subject to the retention rules defined for that feature.

A guest cannot:

- Save prompts permanently to an account before authentication.
- Access another user's private collection.
- Perform account-specific create, list, edit, or delete operations.
- Publish prompts to the community.

Guest access to browsing or copying community prompts is **TBD** and must be decided before community implementation.

### 5.3 Authenticated user

An authenticated user can:

- Create, view, edit, update, delete, and copy their own saved prompts.
- Search and filter their own collection.
- Generate AI prompts when the feature is released.
- Save generated prompts to their account.
- Publish eligible prompts explicitly when community features are released.
- Browse, view, copy, and reuse community prompts when those features are released.
- Manage their own publications according to the community rules.

Authentication does not grant access to another user's private prompts.

### 5.4 Product-level permission matrix

| Action | Guest | Authenticated user |
|---|---|---|
| View shared home page | Yes | Yes |
| Manually save a prompt permanently | No; sign-in required | Yes, to own collection |
| List private saved prompts | No | Own prompts only |
| View a private saved prompt | No | Own prompts only |
| Edit or delete a private saved prompt | No | Own prompts only |
| Copy own saved prompt | Not applicable without saved collection | Yes |
| Generate an AI prompt | Yes, when released; subject to limits | Yes, when released |
| Temporarily edit current generated result | Yes, when released | Yes, when released |
| Save generated result | Must authenticate first | Yes |
| Browse/copy community prompts | TBD | Planned, when released |
| Publish or unpublish a prompt | No | Own eligible prompts only |

---

## 6. Product Scope and Roadmap

The following phase assignments are the current planning proposal. They become implementation scope only when the corresponding phase is approved. They must not be treated as evidence that a future feature is already implemented.

### 6.1 Phase 1 — Core private prompt management

Intended scope:

- Email magic-link authentication.
- Google OAuth authentication.
- GitHub OAuth authentication.
- Shared application session behavior across authentication methods.
- One shared home page for guest and authenticated states.
- Authenticated user's private prompt collection.
- Manually create a prompt by writing or pasting prompt text.
- View prompt list and prompt details.
- Edit/update own prompts.
- Delete own prompts with suitable confirmation/feedback.
- Copy prompt content.
- Prompt title, content, optional description, category, tags, owner, and timestamps.
- Search by title, description, content, and tags.
- Filter by category and tags.
- Combine search with active filters and clear them.
- Private-by-default behavior and backend ownership enforcement.
- Loading, empty, no-results, validation, success, and error states.

AI generation and community publishing are excluded from this phase under the current plan.

### 6.2 Phase 2 — Guest access continuity and AI generation

Intended scope:

- AI prompt-generation interface and backend integration.
- Guest generation without an account.
- Temporary editing of generated content.
- Authenticated generation and saving.
- System-managed AI-origin metadata.
- Sign-in required for permanent save.
- Preserve the guest's current prompt through sign-in and allow it to be saved after successful authentication.
- Define temporary storage, expiration/retention, interruption behavior, usage limits, and failure handling.
- AI provider integration and server-side secret protection.

### 6.3 Phase 3 — Community

Intended scope:

- Explicit publishing and unpublishing of selected prompts.
- Public/community browsing and prompt details.
- Copying/reusing published prompts.
- Private/public visibility enforcement.
- Community prompt cards with image and/or video previews, after the media approach is decided.
- Ownership, attribution, edit, unpublish, and delete behavior for published prompts.
- Proportionate reporting, moderation, and removal rules.

### 6.4 Changing phase boundaries

The phase order and boundaries can change only through an explicit product decision. If a feature is moved between phases, update this section and the relevant implementation plan. Do not add later-phase work to the current phase merely because it is described in this PRD.

---

## 7. Global Navigation and Shared Home Page

### 7.1 Shared home page requirement

Guests and authenticated users share one home page. Do not create a separate home page or duplicate dashboard solely because the user has signed in.

The same page may conditionally show actions or navigation based on whether the user is authenticated and which features are available in the active release.

### 7.2 Available capabilities

When implemented and available in the active phase, the home page/navigation may provide access to:

- Manual prompt management or the user's prompt collection.
- AI prompt generation.
- Community discovery.
- Sign-in for guests.
- Account-specific actions for authenticated users.
- Logout for authenticated users.

The exact layout, labels, route names, visual design, responsive breakpoints, and navigation component are **TBD** and should be designed consistently with this PRD.

### 7.3 Authentication screens

A dedicated sign-in page, “check your email” confirmation state, and magic-link verification/success/error screen are allowed. These are authentication flow screens, not separate guest and authenticated home pages.

### 7.4 Protected actions

When a guest chooses an account-required action, the application must clearly explain that sign-in is required and guide them to the magic-link flow. If the action is saving a temporary AI-generated prompt, the current prompt must be preserved through the flow according to Section 13.

---

## 8. Authentication and Session Requirements


### 8.1 Authentication methods — decided

Prompt Vault supports the following authentication methods:

1. Email magic-link authentication.
2. Google OAuth authentication.
3. GitHub OAuth authentication.

Traditional email-and-password registration and login are not included in the current planned authentication scope.

All three supported authentication methods must establish the same Prompt Vault application session and follow the same authorization rules.


### 8.2 Standard sign-in journey

1. The user chooses Sign in or attempts an action that requires an account.
2. The user enters an email address.
3. The application validates the input and requests a sign-in link.
4. The system sends an email containing the magic link.
5. The UI confirms that the request was submitted and gives the user clear next steps.
6. The user opens the link.
7. The backend validates the token.
8. If the token is valid, unexpired, and unused, the system establishes an authenticated session.
9. The user is redirected to a safe, appropriate destination.
10. If the sign-in began while trying to save a guest-generated prompt, that prompt remains available for the save flow.

### 8.3 Magic-link requirements

- Email input must be validated.
- Link tokens must expire.
- A successfully used token must not be reusable.
- Invalid, expired, and already-used links must be handled clearly.
- Repeated link requests must be protected against abuse.
- The user must receive clear feedback when a link request is accepted, fails, or cannot be completed.
- Authentication must not expose tokens unnecessarily in logs, analytics, or client-visible data.
- The backend must be responsible for validating the token and establishing the authenticated session.



### OAuth authentication

- Users can authenticate using Google.
- Users can authenticate using GitHub.
- The backend must verify the authentication response from the selected provider.
- First-time users can have an account created after successful provider authentication.
- Failed or cancelled authentication must not grant access.
- Successful OAuth authentication must establish the same application session used by magic-link authentication.


### 8.4 Session requirements

The product must support:

- Establishing an authenticated session after valid link verification.
- Maintaining authentication across normal navigation and page refreshes according to the chosen session design.
- Detecting invalid or expired sessions.
- Logout and session termination.
- Correct behavior when an unauthenticated user tries to access a protected action.
- Safe redirects after sign-in; untrusted redirect targets must not be accepted blindly.
- Consistent UI behavior when authentication status changes.

### 8.5 Authentication states to handle

- Email not entered or invalid.
- Magic-link request in progress.
- Request accepted and email expected.
- Email delivery or provider failure.
- Invalid token.
- Expired token.
- Token already used.
- Verification in progress.
- Successful verification.
- Session expired or no longer valid.
- Logout in progress and completed.
- Network/server error during any step.

### 8.6 Technical choices still open

The exact email provider, token lifetime, resend/cooldown behavior, session lifetime, cookie strategy, session persistence mechanism, database representation, and rate limits are technical/product details that must be decided and documented before authentication is implemented. This PRD fixes the required behavior, not those implementation mechanisms.

---

## 9. Prompt Data and Metadata Requirements

This section defines product-level concepts. It is not a final Prisma schema or database design.

### 9.1 Prompt fields

| Field | Requirement | Status |
|---|---|---|
| Title | Identifies the prompt; required for a saved prompt | Decided |
| Content | Actual prompt text; required for a saved prompt | Decided |
| Description | Optional explanation of the prompt's purpose | Decided as optional |
| Category | Organizes the prompt | Category list proposed; required/optional status TBD |
| Tags | Zero or more user-defined labels for organization/filtering | Decided |
| Origin | System-managed marker distinguishing manually created prompts from Prompt Vault AI-generated prompts | Decided concept; detailed lifecycle TBD |
| Created timestamp | Recorded automatically when the prompt is saved | Decided |
| Updated timestamp | Updated automatically when a saved prompt changes | Decided |
| Owner | Identifies the account that owns the saved private prompt | Decided |
| Visibility/publication status | Distinguishes private prompts from explicitly published community prompts | Required when community feature is implemented |

### 9.2 Title and content

- A saved prompt must have a title and prompt content.
- Users may write prompt content themselves or paste it from another application or AI tool.
- The product must preserve the content the user intends to save, subject to validation and safe input handling.
- Required-field and invalid-input feedback must be clear.
- Exact character limits, maximum content length, title uniqueness, and rich-text support are **TBD**. Do not invent constraints without a decision.

### 9.3 Description

- Description is optional.
- It explains what a prompt is for and helps users identify it in the collection.
- Description must be searchable as described in Section 11.
- Whether AI generation automatically creates a description is **TBD**.


### 9.4 Categories

Prompt Vault provides predefined categories and allows authenticated users to create custom categories.

The predefined categories are:

- Development
- Education
- Writing
- Research
- Productivity
- Image Generation
- Other

Users can also create their own categories.

A prompt must have one or more categories assigned to it.

A category can be reused across multiple prompts. Removing a category from a prompt removes only that association; it does not delete the category record.

Deleting a category itself is a separate management action.



### 9.5 Tags

Prompt Vault supports predefined tags and user-created custom tags.

- Users can select predefined tags.
- Users can create their own custom tags.
- A prompt can have multiple tags.
- Tags are separate from categories.
- Tags support organization, search, and filtering.
- Removing a tag from a prompt removes only its association; it does not delete the tag record.
- Deleting a tag itself is a separate management action.
- Duplicate tags must not be created when the same tag is already available to the user.


### 9.6 Origin metadata

At minimum, origin must distinguish:

- **Manual:** created by the user without Prompt Vault AI generating its prompt content.
- **AI-generated:** generated by Prompt Vault's AI feature.

Origin is system-managed metadata, not an ordinary user-defined tag. A user must not be able to change origin merely by editing the tag list. Whether editing an AI-generated prompt later changes its origin classification is **TBD**; the product owner must decide before Phase 2 implementation.

### 9.7 Ownership and visibility

- Every saved personal prompt has an owner.
- The owner can manage their own saved prompts.
- A prompt is private by default.
- Publication is a separate explicit action.
- Community publication must not remove the ownership concept.
- Exact deletion and publication-record relationships are **TBD** for Phase 3.

---

## 10. Manual Prompt Management

### 10.1 Create a prompt

An authenticated user must be able to:

1. Open the create-prompt interface.
2. Enter a title.
3. Enter the prompt content by writing or pasting it.
4. Optionally enter a description.
5. Assign one or more categories, selected from predefined or custom categories.
6. Select zero or more predefined or custom tags.
7. Save the prompt to the user's private collection.
8. Receive clear success or error feedback.

The application must validate required fields before saving. A failed save must not be presented as successful.

### 10.2 List the user's collection

An authenticated user must be able to view their own saved prompt collection. Each list item/card should present enough available metadata to identify the prompt. Candidate metadata includes title, description, category, tags, and dates; the final visual arrangement is a UI decision.

The list must not return another user's private prompts. It must support loading, empty collection, no-results, and error states.

### 10.3 View prompt details

The owner must be able to open an individual saved prompt and view its complete content and supported metadata. Relevant actions include copy, edit, and delete.

A prompt that does not exist or is not accessible to the current user must be handled safely and consistently. The system must not disclose another user's private content in an error response.

### 10.4 Edit and update

The owner must be able to edit supported fields of their own saved prompt.

- Existing values must be loaded into the editor.
- Required fields must be validated.
- A successful update must appear in subsequent views.
- The updated timestamp must change automatically.
- Editing must not silently change the owner.
- Editing must not silently publish a private prompt.
- Editing the prompt must not allow a user to edit another user's private prompt by manipulating an identifier.

### 10.5 Delete

The owner must be able to delete their own saved prompt.

- The UI must use confirmation or another appropriate safeguard before destructive deletion.
- The application must provide clear success/failure feedback.
- Missing or already-deleted prompts must be handled predictably.
- A user cannot delete another user's private prompt.
- Behavior when deleting a community-published prompt is **TBD** and must be settled before Phase 3.

### 10.6 Copy

The user must be able to copy prompt content for reuse in other applications.

- The default copy action copies the actual prompt content only.
- It does not include title, description, category, or tags unless a separate product decision introduces another copy format.
- The UI should confirm successful copying.
- Clipboard failures must be handled with clear feedback and, where appropriate, a way to select/copy the text manually.

### 10.7 Favorites

Favorites were not included in the initial MVP requirements. Do not implement a favorites feature in Phase 1 unless it is explicitly added to the approved scope.

---

## 11. Search, Filtering, and Collection Behavior

### 11.1 Search fields

A user's private collection must support searching by:

- Title.
- Description.
- Prompt content.
- Tags.

### 11.2 Filters

The intended filters are:

- Category.
- Tags.

### 11.3 Combined search and filters

Users must be able to use search together with active filters. They must also be able to clear the current search and filters and return to the unfiltered collection.

### 11.4 Results and empty states

- A search with no matching prompts must show a clear no-results state.
- An empty collection must be distinguished from a collection that has no matches for the current query/filter.
- Loading and failure states must be handled.
- Search and filtering must never expose prompts owned by another user.

### 11.5 Search rules not yet finalized

The following are **TBD** and must be decided before they affect implementation or tests:

- Case sensitivity and exact matching behavior.
- Whether partial matches are supported for all fields.
- How tag text is normalized.
- Whether multiple selected tags use AND or OR semantics.
- Default sort order and user-selectable sorting.
- Pagination or incremental loading.
- Performance targets and indexing requirements.

Community search/discovery is separate from private collection search and belongs to the community release.

---

## 12. AI Prompt Generation

### 12.1 Purpose

AI generation helps a user who knows what they want to accomplish but needs help expressing that goal as a useful prompt.

### 12.2 Standard generation flow

1. The user opens the AI generation experience when it is available.
2. The user describes the task, goal, context, or desired outcome.
3. The application validates the input.
4. The frontend sends the request to the Prompt Vault backend.
5. The backend calls the configured AI service without exposing provider secrets to the browser.
6. The AI service returns generated prompt content.
7. The UI displays the result for review.
8. The user can edit the generated content before saving.
9. The user can choose to save it permanently if authenticated, or start sign-in if not authenticated.
10. The saved prompt is marked with system-managed AI-origin metadata.

The precise input UI, length limits, prompt-engineering template, generation controls, regeneration behavior, and provider/model selection are **TBD**. Do not assume that end users must choose an AI provider or model.

### 12.3 Generated prompt metadata

Generated prompts should support the same relevant saved-prompt fields as manually created prompts: title, description, content, category, and tags.

The generated content must be editable before saving. Whether the title, description, category, and tags are generated automatically, suggested by AI, or entered by the user is **TBD**. Do not silently make all metadata AI-generated.

### 12.4 Editing and regeneration

- The user must be able to review and edit generated content before saving.
- A generation failure must not erase a previously displayed result without clear user understanding.
- Regeneration behavior, multiple-result history, and whether edits are preserved when regenerating are **TBD**.
- Do not implement prompt history/version history unless explicitly approved.

### 12.5 AI failure cases

The application must handle:

- Empty or invalid user input.
- Input that exceeds the chosen limit.
- AI provider timeout.
- Provider/service unavailable.
- Provider returns an error or unusable response.
- Usage quota/rate limit reached.
- Network interruption.
- Failure to save a generated prompt.

The UI must not falsely claim that generation or saving succeeded. The current result should remain available when reasonably possible if an unrelated save/sign-in operation fails, subject to the temporary-storage rules.

### 12.6 AI provider and model decisions

The selected provider, model, API integration, fallback behavior, prompt template strategy, configuration method, and error mapping are technical/product decisions to make before Phase 2. API keys and provider credentials must remain server-side. Provider selection by end users is not currently a requirement.

---

## 13. Guest Generation and Sign-In Continuity

This is an important product requirement and must be treated as a complete user journey, not merely a sign-in button.

### 13.1 Guest-generation behavior

A guest may:

1. Open the shared home page.
2. Start AI prompt generation without first creating an account.
3. Enter a task description.
4. Receive generated prompt content.
5. Review and edit the current result temporarily.
6. Choose to sign in to save the result permanently.

A guest cannot permanently save the prompt before authentication.

### 13.2 Save-after-sign-in flow

1. A guest has a current generated prompt, including any edits they made.
2. The guest selects Save.
3. The application recognizes that authentication is required.
4. The application starts the magic-link sign-in flow without intentionally discarding the current prompt.
5. The user opens the email link and successfully authenticates.
6. The application returns the user to the save continuation, or another clearly appropriate continuation state.
7. The generated prompt is still available, including the user's edits, within the agreed temporary-storage limits.
8. The authenticated user reviews the prompt and completes the save operation.
9. The prompt is saved to that user's private collection and marked AI-generated.
10. The application confirms success and provides a way to view the saved prompt or return to the collection.

The key requirement is that the user should not have to generate the prompt again simply because authentication was required to save it.

### 13.3 Temporary prompt continuity

The system must define before implementation:

- Where temporary guest content is held.
- How long it remains available.
- Whether the current result survives a page refresh.
- What happens if the browser/tab is closed.
- What happens if local/browser storage is cleared.
- What happens if the user abandons sign-in.
- What happens if the magic link expires or is already used.
- How the temporary content is associated with the post-authentication save continuation.
- What happens if saving fails after authentication.
- When temporary content is cleared after successful save or expiration.
- How guest usage is limited and abuse is prevented.

These choices must balance continuity and privacy. Do not promise that an unsaved guest prompt is permanently stored. The product must communicate any meaningful retention limitations clearly.

### 13.4 Failure and recovery behavior

- If sign-in fails, do not deliberately erase the current temporary prompt if it is still within its retention period.
- If saving fails, show the failure and allow an appropriate retry while the prompt remains available.
- If the temporary prompt has expired or cannot be recovered, explain this clearly instead of pretending it was retained.
- Do not create duplicate saved prompts because the user retries a save after a timeout; exact idempotency mechanics are technical design, but duplicate behavior should be considered and tested.

### 13.5 Guest usage limits

Guest AI usage may be limited to prevent abuse. Exact request counts, time windows, IP/session handling, and reset behavior are **TBD**. Limits must produce clear user-facing feedback. Do not add arbitrary quotas without a product decision.

---

## 14. Community and Public Prompt Sharing

### 14.1 Purpose

Community features allow authenticated users to share selected prompts so other people can discover and reuse them. Community sharing is planned for a later phase, not the initial private-management release.

### 14.2 Explicit publication and privacy

- Saving a prompt privately must never automatically publish it.
- Publishing must be an explicit user action.
- Only an authenticated owner may publish their own eligible prompt.
- A user must not publish another user's private prompt as their own.
- The UI must communicate the change in visibility before or as it occurs.
- Private and public/community states must be distinguishable.
- Backend authorization must enforce publication permissions.

### 14.3 Community discovery

When released, users should be able to browse published prompts, open prompt details, inspect prompt content and relevant metadata, and copy/reuse published prompts. The discovery layout, search/filter options, sorting, pagination, and any ranking system are **TBD**.

Whether guests may browse or copy public community prompts is **TBD** and must be decided before community implementation. Authenticated users are intended to have community browsing and reuse access when the feature is released.

### 14.4 Publication lifecycle

The community phase must define:

- Whether publishing changes the visibility of the same prompt record or creates a separate publication representation.
- Whether a published prompt can be edited while public.
- Whether edits to the owner's prompt immediately affect the published version.
- How a prompt is unpublished.
- What the public sees after unpublishing.
- What happens when an owner deletes a published prompt.
- Whether copied/reused prompts are independent copies and how they are attributed.
- Whether public prompt metadata exposes the original owner's profile/name.
- Whether users can report a published prompt.

Do not choose these lifecycle rules ad hoc during implementation.

### 14.5 Community card media previews

Community prompt cards are intended to include an image or video preview. The implementation has not been decided.

Open decisions:

- Image, video, or both.
- Whether media is uploaded by the user, supplied as a URL, generated, or selected from another source.
- Whether preview media is optional or required.
- Supported file types and size limits if upload is supported.
- Storage and delivery provider.
- Preview fallback if media is absent, invalid, or fails to load.
- Whether media appears only on cards or also on detail pages.

No particular provider, media-generation method, or mandatory upload requirement should be assumed until a decision is recorded.

### 14.6 Community safety and moderation

Before public publishing is released, define a proportionate minimum policy and workflow for:

- Inappropriate or abusive content.
- Reporting a prompt.
- Reviewing reports.
- Removing or hiding content when appropriate.
- Preventing or responding to repeated abuse.
- Communicating a publication removal to the owner.

An elaborate moderation platform is not automatically required; the minimum release behavior must simply be explicit.

---

## 15. End-to-End User Flows

This section records the intended user-facing journeys. It is authoritative for product behavior; route names and internal API sequences remain technical implementation details.

### 15.1 First visit — guest

1. Visitor opens Prompt Vault.
2. Visitor sees the shared home page.
3. Visitor can access the features available to guests in the current release.
4. If the visitor chooses a feature requiring an account, the application explains that sign-in is required and offers the magic-link flow.
5. The home page is not replaced with a separate guest-only product experience.

### 15.2 Sign in using a magic link

1. User opens Sign in.
2. User enters an email address.
3. Application validates it and requests a magic link.
4. Application shows a confirmation/next-step state.
5. User opens the email link.
6. Backend validates token expiry and single-use status.
7. Valid token establishes a session; invalid, expired, or used token receives a clear error/recovery state.
8. User returns to the intended safe destination.

### 15.3 Manually create and save a prompt

1. Authenticated user opens create prompt.
2. User enters title and content.
3. User may enter description and add tags.
4. User chooses a category according to the final category rule.
5. User saves.
6. Backend validates the request and associates the saved prompt with the authenticated owner.
7. Prompt is private by default.
8. UI confirms success and makes the prompt accessible in the collection.

### 15.4 Find and reuse a saved prompt

1. Authenticated user opens their collection.
2. User enters search text and/or selects category/tag filters.
3. Collection displays matching prompts owned by that user.
4. User opens a prompt to inspect full content or copies it directly if supported by the view.
5. Copy action places prompt content only on the clipboard.
6. UI confirms copying or reports a clipboard failure.

### 15.5 Edit a saved prompt

1. Owner opens one of their saved prompts.
2. Owner selects Edit.
3. Existing values populate the editor.
4. Owner changes supported fields and saves.
5. Backend verifies ownership and validates the update.
6. Updated values and timestamp are persisted.
7. UI confirms success and displays the current values.

### 15.6 Delete a saved prompt

1. Owner selects Delete.
2. UI provides a confirmation/safeguard.
3. Owner confirms.
4. Backend verifies ownership and deletes according to the selected data policy.
5. UI confirms success and refreshes/navigates the collection appropriately.
6. If the prompt is missing or deletion fails, the UI communicates the state clearly.
7. Special behavior for a community-published prompt is defined in Phase 3 before that feature is released.

### 15.7 Generate and save while authenticated

1. Authenticated user describes the task.
2. Backend requests generation from the configured AI provider.
3. UI displays generated prompt content.
4. User reviews and edits it.
5. User supplies or reviews the required metadata.
6. User saves.
7. Backend saves the prompt to the user's collection and sets AI origin metadata.
8. UI confirms success.

### 15.8 Generate as a guest, then sign in to save

Follow the exact continuity requirements in Section 13. The edited temporary prompt must be retained through sign-in within the defined retention rules and must be available for saving after authentication. Re-generating from scratch must not be the expected normal path.

### 15.9 Publish a prompt to the community

1. Authenticated owner opens an eligible prompt they own.
2. Owner chooses Publish.
3. UI makes clear that publication changes visibility and that the prompt may become discoverable by other users.
4. Owner confirms the action where the chosen UX requires confirmation.
5. Backend verifies ownership and eligibility.
6. Publication is recorded and the prompt becomes available to the community according to the publication rules.
7. UI confirms the new state.

The exact publication model and eligibility rules are TBD before Phase 3.

### 15.10 Discover and reuse a community prompt

1. User opens community discovery.
2. User browses public prompts.
3. User opens a prompt to inspect its content and available metadata/media preview.
4. User copies or reuses the prompt.
5. If the product supports saving a community prompt into the user's own collection, the copied/saved item behavior and attribution must be specified before release. Do not assume reuse automatically creates a saved record.

---

## 16. Screens and UI States

### 16.1 Screen concepts

The following are functional screen concepts, not a final route list or design specification:

- Shared home page.
- Sign-in/email entry screen.
- Check-your-email confirmation state.
- Magic-link verification result/success/error state.
- Authenticated prompt collection/list.
- Create prompt screen/form.
- Prompt detail view.
- Edit prompt screen/form.
- AI generation experience (Phase 2).
- Guest temporary result/edit state (Phase 2).
- Community discovery/list (Phase 3).
- Community prompt detail (Phase 3).
- Publication management state (Phase 3).

Do not interpret this list as a requirement for separate URLs for every item; exact routing is an implementation/UI decision.

### 16.2 Required common UI states

Relevant screens and operations must handle:

- Initial/loading state.
- Empty collection state.
- No search/filter results state.
- Field validation state.
- Operation in progress state.
- Success feedback.
- Failure/error feedback.
- Unauthorized or session-expired state.
- Not-found/inaccessible-resource state.
- Network interruption where relevant.

### 16.3 Interaction principles

- Destructive actions need confirmation or another appropriate safeguard.
- The user should understand when an action requires sign-in.
- The user should not be shown a success state before the operation succeeds.
- A form should preserve entered data when practical after a recoverable validation/network failure.
- The UI must not imply a private prompt is public or a public prompt is private when the stored state says otherwise.

### 16.4 Visual design decisions

Color palette, typography, layout, component library, exact card composition, iconography, animation, and final responsive breakpoints are not decided in this PRD. They must not be treated as product behavior requirements until specified separately, and any such specification must remain consistent with the flows and privacy rules here.

---

## 17. Permissions and Privacy Rules

### 17.1 Private collection

- A user's private collection contains only prompts that user is authorized to access.
- All list, detail, search, filter, update, and delete operations must be scoped to the authenticated owner.
- Guessing or changing an identifier must not grant access to another user's prompt.
- Private prompt content must not appear in community APIs or public search results.

### 17.2 Guest restrictions

- Guests must not be able to perform account-specific saved-prompt operations.
- Guest AI generation, when available, is a temporary workflow and does not create a permanent saved prompt before authentication.
- Guest limits must be enforced by the backend or a suitable server-controlled mechanism, not solely by hiding a frontend button.

### 17.3 Publication rules

- A private prompt remains private unless explicitly published.
- Only the authenticated owner can publish/unpublish their eligible prompt.
- Community APIs expose only intentionally published content.
- Unpublishing must stop community discovery according to the lifecycle behavior defined before Phase 3.

### 17.4 Data retention and deletion

The retention policy for accounts, saved prompts, expired magic-link tokens, sessions, temporary guest prompts, and deleted community content must be defined before the relevant feature is released. Do not claim permanent retention or complete erasure behavior until it is specified and implemented.

---

## 18. Validation, Errors, and Reliability

### 18.1 Validation

The system must validate inputs on the backend even when the frontend also validates them. The UI should provide timely, understandable field-level or form-level feedback. Exact field limits and detailed validation rules are TBD where not explicitly stated elsewhere in this document.

### 18.2 Operation outcomes

Every important operation must distinguish success from failure. This applies to:

- Requesting a magic link.
- Verifying a magic link.
- Creating, reading, updating, deleting, and copying prompts.
- Searching/filtering the collection.
- Generating AI content.
- Saving a generated prompt.
- Publishing/unpublishing community prompts.
- Loading community media previews.

### 18.3 Reliability expectations

- Failed operations must not be reported as successful.
- Common validation, authorization, not-found, network, email-provider, and AI-provider failures must be handled predictably.
- A failure in one operation should not unnecessarily destroy user-entered or temporary content.
- The system should prevent accidental duplicate records where a retry could repeat a save.
- Core workflows and important unauthorized/negative cases must be tested.
- Search/list behavior should remain usable as the user's collection grows; exact performance and pagination targets are TBD.
- Avoid unnecessary dependencies and complexity.

---

## 19. Security and Abuse Prevention

### 19.1 Authentication security

- Magic-link tokens must expire and be single-use.
- Tokens and session credentials must be protected from unnecessary exposure.
- Authentication requests need reasonable abuse protection.
- Redirects after authentication must be validated to avoid unsafe redirection.
- Logout must terminate the intended session according to the chosen session design.

### 19.2 Authorization security

- Backend authorization is required for all private prompt operations.
- Queries and mutations must be scoped to the authenticated owner.
- Frontend route guards and hidden buttons are not sufficient protection.
- Public endpoints must expose only content intentionally published for public access.

### 19.3 AI security

- AI provider credentials and API keys must remain on the server.
- Generation input must be validated and bounded according to decided limits.
- Guest generation must have server-enforced abuse protection.
- Provider failures and quota limits must be handled without exposing secrets or internal details.

### 19.4 Data handling

- Avoid exposing authentication secrets or sensitive internal details in logs and API responses.
- Treat user-supplied prompt text and community content as untrusted input.
- Define appropriate handling of malicious content and media before public community release.
- Exact logging, retention, and privacy-notice requirements are TBD and must be resolved before deployment/release.

---

## 20. Accessibility and Responsive Experience

The application should be usable on common desktop and mobile screen sizes. The UI should provide understandable labels, keyboard-operable controls, visible focus states, readable text, and clear error messages. Exact accessibility conformance target and detailed design standards are TBD, but accessibility must not be ignored as a later cosmetic task.

Community media previews must not make essential prompt information inaccessible. If video previews are used, playback behavior, controls, and accessibility alternatives must be defined in the community implementation plan.

---

## 21. Product Acceptance Criteria

These criteria apply across the product. Each release must also have a focused checklist derived from the applicable features in this document.

### 21.1 Core private prompt management

- An authenticated user can create a prompt with a title and content.
- Description can be omitted.
- Category and tags follow the final documented rules.
- A newly saved prompt is private by default and owned by the authenticated user.
- The user can list and view their own prompts.
- The user can edit and update their own prompts.
- The user can delete their own prompts with appropriate confirmation/feedback.
- The user can copy prompt content only.
- Search covers title, description, content, and tags.
- Category and tag filters can be applied and cleared.
- Search and filters can be combined.
- Empty, no-results, loading, validation, success, and error states are handled.
- No private prompt operation exposes or modifies another user's prompt.

### 21.2 Magic-link authentication

- A user can request a sign-in link using a valid email address.
- Invalid email input receives clear feedback.
- A valid, unexpired, unused link can establish a session.
- Expired, invalid, and already-used links are rejected with clear feedback.
- A used token cannot authenticate a second time.
- Session persistence, expiry, and logout work according to the documented technical design.
- Protected actions cannot be completed by a guest through direct API requests.
- Redirects after sign-in are safe and support the intended user continuation.
- A user can authenticate through email magic links.
- A user can authenticate through Google OAuth.
- A user can authenticate through GitHub OAuth.
- All supported methods establish a valid application session.
- Invalid, expired, or cancelled authentication attempts do not grant access.

### 21.3 AI generation and guest continuity

- The user can submit a task description and receive generated prompt content when the feature is available.
- Generated content can be reviewed and edited before saving.
- AI origin is stored separately from user-defined tags.
- A guest can generate and temporarily edit a result.
- A guest cannot save permanently without authentication.
- Starting sign-in to save a guest result does not intentionally discard that result.
- After successful sign-in, the edited result is available for saving within the documented retention rules.
- A save failure is communicated and does not falsely claim success.
- AI provider secrets are not exposed to the browser.
- Limits and provider errors are handled clearly.

### 21.4 Community

- Only authenticated owners can publish their own eligible prompts.
- Publishing is explicit; saving privately never publishes automatically.
- Private prompts are not returned by public community endpoints.
- Published prompts can be discovered and reused according to the community rules.
- Unpublish, edit, deletion, attribution, media, and moderation behavior match the decisions recorded before Phase 3 release.

### 21.5 Release quality

- Implemented behavior matches this central PRD and the active release scope.
- No unresolved TBD is silently implemented as a consequential product rule.
- Core success paths and important negative/authorization cases are tested.
- User-visible failures are clear and truthful.
- Future-phase requirements do not block completion of the current release unless a documented dependency requires it.

---

## 22. Analytics and Operational Visibility

No specific analytics product, event taxonomy, dashboard, or numerical KPI target has been decided. Do not add a third-party analytics provider or tracking behavior without approval.

Before a production release, decide what operational information is necessary to diagnose failures safely—for example, authentication request failures, generation errors, and save failures—without logging magic-link tokens, session credentials, provider API keys, or unnecessary prompt content. Any analytics or logging must respect the privacy requirements in this PRD.

---

## 23. Technical Constraints and Boundaries

This section records the current project setup and separates confirmed stack choices from implementation details that remain open.

### 23.1 Current planned stack

- **Frontend:** React + TypeScript, scaffolded with Vite.
- **Backend:** Node.js + Express + TypeScript.
- **Database:** PostgreSQL.
- **ORM:** Prisma.
- **Repository structure:** separate `client/` and `server/` directories.

These are the current stack decisions discussed for Prompt Vault. Exact package versions, build configuration, deployment platform, hosting, email provider, AI provider, and database hosting are not product requirements and remain implementation choices unless explicitly fixed elsewhere.

### 23.2 Product/technical boundary

- Product behavior is defined here.
- API contracts, service/module boundaries, database schema, migrations, and infrastructure details belong in technical design documentation.
- Technical design must support the flows and security requirements here.
- Do not create a database schema first and let it determine product behavior by accident. Resolve the product fields, permissions, and lifecycle rules before finalizing the schema for those features.
- Do not add dependencies, providers, user-facing features, or architecture complexity without a requirement or an explicit decision.

### 23.3 Implementation discipline

Coding agents and contributors must:

- Read this PRD before implementing product features.
- Read the applicable architecture and task documents before changing existing implementation.
- Implement only the approved current scope.
- Ask before making consequential changes to product behavior, schema, APIs, authentication, permissions, or feature scope when the requirement is unclear.
- Avoid unrelated refactors and unrequested dependencies.
- Report what changed, which files were affected, and what validation/tests were performed.

---

## 24. Decisions, Assumptions, and Open Questions

This section prevents undecided matters from being mistaken for approved requirements. Update it whenever a decision is made.

### 24.1 Decisions already made or strongly established

- Product name: Prompt Vault.
- Product is a web application for managing and reusing prompts.
- Planned stack: React + TypeScript/Vite, Node.js + Express + TypeScript, PostgreSQL, Prisma.
- Client and server are separate `client/` and `server/` directories.
- Authentication methods: email magic link, Google OAuth, and GitHub OAuth.
Traditional email/password authentication is not included.
- Magic-link token must expire and be single-use.
- Guests and authenticated users share one home page.
- Guests can generate and temporarily edit prompts in the planned AI phase.
- Guests must authenticate before saving prompts permanently.
- The current guest-generated prompt should remain available through sign-in and be savable afterward.
- Saved prompts are private by default.
- Community publishing requires explicit user action.
- AI origin is system-managed and separate from custom tags.
- Prompt fields discussed: title, content, optional description, category, tags, origin, created/updated timestamps, owner, and eventual visibility/publication state.
- Search fields: title, description, prompt content, tags.
- Filters: category and tags.
- Copy action copies prompt content only by default.
- Proposed default categories: Development, Education, Writing, Research, Productivity, Image Generation, Other.
- Favorites are not part of the initial MVP requirement.
- Community cards are intended to include image or video previews, but media implementation is undecided.
- Proposed phase order: Phase 1 private prompt management/auth; Phase 2 AI generation and guest continuity; Phase 3 community.
- Phase 1 authentication supports email magic links, Google OAuth, and GitHub OAuth.
- Traditional email/password authentication is not included.
- Predefined and custom categories are supported.
- A prompt can have multiple categories.
- Predefined and custom tags are supported.
- A prompt can have multiple tags.
- Removing a tag or category from a prompt does not delete its underlying record.
- Duplicate tags and categories must not be created when an equivalent record is already available to the user.

### 24.2 Open product decisions — resolve before Phase 1 implementation where applicable

- What title/content/description/tag length limits apply?
- What are search matching and case-sensitivity rules?
- If multiple tags are selected, should the filter use AND or OR?
- What is the default sort order, and is user-controlled sorting needed?
- Is pagination or incremental loading required for the first release?
- What exact session persistence, expiry, and logout behavior is chosen technically?
- What email service sends magic links, and what are the token lifetime and resend limits?
- What are the final route names and UI details?

### 24.3 Open product decisions — resolve before Phase 2

- Which AI provider/model is used initially?
- Can users select providers/models, or is the provider an internal configuration?
- What generation input fields and length limits are required?
- Are title, description, category, and tags generated by AI or supplied/edited by the user?
- Does editing an AI-generated prompt preserve its AI-generated origin?
- Is regeneration supported, and what happens to previous results and edits?
- Where is guest temporary content stored, and how long does it remain available?
- Does the guest result survive refresh, closing the tab/browser, and abandoning sign-in?
- How is the current result carried through magic-link authentication?
- What happens if save fails, the magic link expires, or temporary content expires?
- What guest rate limits apply?
- What happens when AI generation times out or returns an error?

### 24.4 Open product decisions — resolve before Phase 3

- Can guests browse or copy community prompts?
- What community browsing/search/filter/sort features are included?
- How are public prompts attributed to their owners?
- Does publishing expose the owner's profile/name?
- Is publication the same record as the private prompt or a separate publication representation?
- What happens when an owner edits, unpublishes, or deletes a published prompt?
- Does copying/reusing a community prompt create a new personal prompt automatically, or is it only copied to the clipboard?
- Is media an image, video, or both?
- Is preview media uploaded, URL-based, generated, optional, or required?
- What media file limits and storage/delivery approach apply?
- What are the minimum reporting/moderation/removal rules?
- How are public prompts that are removed or unpublished handled in search and direct links?

### 24.5 Open cross-cutting decisions

- What privacy notice and data-retention rules are required?
- What account deletion behavior is required, if account deletion is in scope?
- What production analytics/operational logging is necessary?
- What measurable performance or availability targets, if any, are required?
- What accessibility conformance target will be used?

### 24.6 How to resolve a TBD

For each consequential TBD:

1. Make an explicit product decision.
2. Update this section and the relevant requirement/flow above.
3. Update architecture documentation if the decision affects implementation.
4. Update the active task/phase checklist.
5. Add acceptance criteria and tests for the chosen behavior.

Do not leave a decision only in a chat message if it affects the product.

---

## 25. Document Governance and Change Control

### 25.1 This PRD is the source of truth

Product decisions made in conversation must be recorded in this document before they are treated as permanent requirements. If a new conversation, phase document, code comment, or agent suggestion conflicts with this PRD, do not silently choose one; reconcile the conflict here.

### 25.2 When requirements change

1. Update this central PRD first.
2. Update any relevant user flow and acceptance criteria in this document.
3. Update technical architecture notes if affected.
4. Update the task tracker to reflect work and dependencies.
5. Update coding-agent instructions only if the workflow rules change.
6. Test the changed behavior and any important regression paths.

### 25.3 Phase implementation rule

The central PRD describes the whole intended product. The current implementation phase determines which part is built now. Future features in this document must not be treated as current-phase scope unless explicitly approved.

### 25.4 No silent scope expansion

Do not add favorites, extra roles, provider/model selection, prompt history, advanced community ranking, media upload, or other unapproved features merely because they might be useful. Record a proposal and obtain a decision first.

---

## 26. Glossary

- **Prompt:** Text intended to be supplied to an AI tool to guide its response or task.
- **Saved prompt:** A prompt stored permanently in an authenticated user's collection.
- **Private prompt:** A saved prompt visible to its owner and not publicly discoverable.
- **Guest:** A visitor who has not authenticated.
- **Magic link:** A time-limited, single-use link delivered to a user's email for sign-in.
- **Temporary guest prompt:** A generated prompt that has not yet been saved permanently to an account.
- **Origin metadata:** System-managed data identifying whether a prompt was manually created or generated by Prompt Vault AI.
- **Category:** A primary organizational classification selected from the product's category list.
- **Tag:** A user-defined label for organizing and filtering prompts.
- **Community prompt:** A prompt that its authenticated owner explicitly published for other users to discover and reuse.
- **Phase PRD:** A narrower implementation plan derived from this central PRD; it cannot override this document's product decisions.

---

## Final Product Rule

Prompt Vault must be built from explicit requirements, not assumptions. Keep the personal prompt collection private by default, use email magic-link, Google OAuth, and GitHub OAuth authentication, preserve guest-generated work through the save/sign-in journey, keep AI-origin metadata separate from tags, and require an explicit action before a prompt becomes public. All undecided behavior must remain marked TBD until a decision is recorded in this central PRD.
