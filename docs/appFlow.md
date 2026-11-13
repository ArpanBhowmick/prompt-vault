# Prompt Vault — App Flow

**Document purpose:** Describe how users move through Prompt Vault and complete user-facing journeys.

**Authority:** This document visualizes user journeys. `docs/prompt-vault-prd.md` remains the central product source of truth, `docs/prd docs/phase-1-mvp.md` defines the current Phase 1 scope, and `docs/architecture docs/phase-1-architecture.md` defines the technical design. This file must not override those documents.

**Status:** Draft — user journeys are defined at a product level; exact route names and visual layouts remain implementation decisions.

---

## 1. User Types

### Guest
A visitor who is not signed in.

In Phase 1, a guest can view the shared home page and access public navigation, but must authenticate before managing a private prompt collection.

AI generation for guests is planned for Phase 2, not Phase 1.

### Authenticated user
A user who has successfully authenticated through one of the supported sign-in methods.

The user can access their own private prompt collection and manage their prompts. Authentication never grants access to another user's private prompts.

---

## 2. Global Navigation

Guests and authenticated users use **one shared home page**. Do not create a separate home page solely for authenticated users.

### Guest navigation — Phase 1

```text
Shared Home Page
├── Sign In
└── Account-required action
    └── Authentication
```

### Authenticated navigation — Phase 1

```text
Shared Home Page
├── My Prompts
│   ├── View Prompt Collection
│   ├── Create Prompt
│   └── Open Prompt
│       ├── Copy
│       ├── Edit
│       └── Delete
└── Account Menu
    └── Log Out
```

Exact labels, route paths, menus, and page layout are UI decisions. This flow does not require every item to have a separate URL.

---

## 3. Authentication Flows — Phase 1

Prompt Vault supports these sign-in methods in Phase 1:

1. Email magic-link sign-in.
2. Google OAuth sign-in.
3. GitHub OAuth sign-in.

Traditional email/password registration and login are not part of Phase 1. All supported methods establish the same authenticated application state and grant the same account permissions. Logout and protected-resource rules apply regardless of sign-in method.

### 3.1 Account creation through authentication

```text
Guest opens Sign In
        ↓
Chooses a supported sign-in method
        ↓
Completes email magic-link verification or provider authentication
        ↓
Backend verifies the result
        ↓
First successful authentication creates the account if one does not exist
        ↓
Establish authenticated session
        ↓
Return to safe intended destination
or shared home page
```

Account creation occurs only after successful authentication. A failed or cancelled authentication attempt must not create an authenticated session.

### 3.2 Email magic-link sign-in

```text
Guest opens Sign In
        ↓
Chooses Email Magic Link
        ↓
Enters email address
        ↓
Server validates request and sends sign-in link
        ↓
Show “Check your email” state
        ↓
User opens the link
        ↓
Server validates token
        ↓
Token valid, unexpired, and unused?
   ├── No → Show recovery/error state
   └── Yes → Establish authenticated session
                    ↓
             Return to safe intended destination
             or shared home page
```

Requirements:
- Magic-link tokens expire and can be used only once.
- Invalid, expired, or already-used links must be handled clearly.
- Repeated requests must have appropriate abuse protection.
- Do not expose authentication tokens unnecessarily.
- A guest or existing user may request a link using a valid email address.
- The backend validates the token and establishes the authenticated session.
- First-time account creation happens only after successful link verification.
- If a future flow requires preserving temporary user work during sign-in, the sign-in flow must not intentionally discard it.

### 3.3 Google OAuth sign-in

```text
Guest opens Sign In
        ↓
Chooses Google
        ↓
Application starts Google authentication
        ↓
User completes Google's authentication/consent steps
        ↓
Application validates the provider result
        ↓
Authentication successful?
   ├── No → Show an appropriate error/retry state
   └── Yes → Resolve the account according to approved
              account-linking rules and establish session
                    ↓
             Return to safe intended destination
             or shared home page
```

Requirements:
- Google sign-in must be available.
- Provider authentication responses must be verified before a session is established.
- First-time account creation can occur after successful authentication.
- Failed or cancelled authentication must not grant access.
- Provider credentials and secrets must remain server-side.

### 3.4 GitHub OAuth sign-in

```text
Guest opens Sign In
        ↓
Chooses GitHub
        ↓
Application starts GitHub authentication
        ↓
User completes GitHub's authentication/consent steps
        ↓
Application validates the provider result
        ↓
Authentication successful?
   ├── No → Show an appropriate error/retry state
   └── Yes → Resolve the account according to approved
              account-linking rules and establish session
                    ↓
             Return to safe intended destination
             or shared home page
```

Requirements:
- GitHub sign-in must be available.
- Provider authentication responses must be verified before a session is established.
- First-time account creation can occur after successful authentication.
- Failed or cancelled authentication must not grant access.
- Provider credentials and secrets must remain server-side.

**Open detail:** Account-linking behavior (for example, what happens when a provider returns an email already associated with an existing account) must be decided before implementation. Do not automatically merge accounts without a safe, explicit rule.

### 3.5 Session persistence and logout

```text
Successful authentication
        ↓
Authenticated session
        ↓
User navigates or refreshes page
        ↓
Session still valid?
   ├── Yes → Keep authenticated state
   └── No → Clear authenticated state and require sign-in
```

Logout:

```text
Authenticated user selects Log Out
        ↓
Server/session is invalidated as designed
        ↓
Client clears authenticated state
        ↓
Return to shared home page in guest state
```

All protected operations must be authorized by the backend. Hiding a button or protecting only a frontend route is not sufficient.

---

## 4. Private Prompt Management — Phase 1

### 4.1 Create a prompt

```text
Authenticated user opens My Prompts
        ↓
Chooses Create Prompt
        ↓
Enters title and prompt content
        ↓
Optionally enters description
        ↓
Assigns one or more categories and optionally adds multiple tags
        ↓
Submits form
        ↓
Server validates input and associates prompt with user
        ↓
Save successful?
   ├── No → Show errors and preserve form data where practical
   └── Yes → Show success and make prompt available in My Prompts
```

A saved prompt is private by default. The user must not be able to assign it to another account by manipulating request data.

A prompt must have one or more categories. Tags are optional, and a prompt can have multiple tags.

### 4.2 View the prompt collection

```text
Authenticated user opens My Prompts
        ↓
Load only prompts owned by this user
        ↓
Any prompts?
   ├── No → Show empty state and Create Prompt action
   └── Yes → Show prompt collection
```

The collection must distinguish an empty collection from a search/filter that returns no matches. It must also handle loading and error states.

### 4.3 Search and filter

```text
User opens My Prompts
        ↓
Enters search text and/or selects category/tag filters
        ↓
Show matching prompts owned by this user
        ↓
Any matches?
   ├── No → Show no-results state
   └── Yes → Show matching prompts
        ↓
User may change or clear search and filters
```

Search fields: title, description, prompt content, and tags.

Filters: category and tags.

**Open details:** Multiple-tag AND/OR behavior, default sorting, case sensitivity, and pagination are not finalized in the central PRD. Do not invent these rules during implementation.

### 4.4 View, copy, edit, and update a prompt

```text
User selects a prompt they own
        ↓
Open prompt details
        ├── Copy → Copy prompt content only → Show result
        ├── Edit → Load existing values into form
        │             ↓
        │          User edits and submits
        │             ↓
        │          Server validates ownership and fields
        │             ↓
        │          Save update → Show result
        └── Delete → Follow delete flow
```

Copying should copy the prompt content only by default, not the title, description, category, or tags.

If copying fails, show clear feedback rather than claiming it succeeded.

### 4.5 Delete a prompt

```text
Owner selects Delete
        ↓
Show confirmation/safeguard
        ↓
Owner confirms?
   ├── No → Keep prompt
   └── Yes → Server verifies ownership and deletes
                  ↓
              Success → Remove prompt from collection
              Failure → Show error and refresh/retry as appropriate
```

A user cannot delete another user's prompt. Missing or already-deleted prompts must be handled predictably.

---

## 5. Shared Error and Recovery Paths — Phase 1

Apply these behaviors to relevant flows:

- **Validation failure:** Identify what needs correction and preserve entered values where practical.
- **Network/server failure:** Show a clear failure state; do not claim the operation succeeded.
- **Expired/invalid authentication:** Clear invalid client authentication state and require sign-in when necessary.
- **Unauthorized prompt access:** Do not return another user's private content.
- **Missing prompt:** Show an appropriate not-found/inaccessible state.
- **Delete action:** Require confirmation or another appropriate safeguard.
- **Loading:** Show feedback while an operation is in progress.
- **Empty collection:** Explain that no prompts have been saved and offer a create action.
- **No search/filter matches:** Explain that no prompts match the current criteria and allow clearing them.

---

## 6. Future Flow — Phase 2: AI Generation

This flow is documented for planning only and is **not part of Phase 1 implementation**.

### 6.1 Authenticated user generates and saves a prompt

```text
Authenticated user opens AI Generation
        ↓
Describes the task
        ↓
Backend requests prompt generation from configured AI provider
        ↓
Show generated result
        ↓
User reviews and edits result
        ↓
User supplies/reviews metadata
        ↓
User saves
        ↓
Save to user's private collection
        ↓
Mark origin as AI-generated
```

### 6.2 Guest generates a prompt and signs in to save it

```text
Guest opens AI Generation
        ↓
Describes task and receives result
        ↓
Guest reviews and edits result temporarily
        ↓
Chooses Save
        ↓
Authentication required
        ↓
Start selected sign-in method without intentionally discarding result
        ↓
Authentication succeeds
        ↓
Restore the edited temporary result
        ↓
User reviews and saves it
        ↓
Prompt is stored privately in their collection
```

Temporary retention, refresh/tab-close behavior, expiration, usage limits, and recovery after sign-in/save failures must be defined before Phase 2 is implemented.

---

## 7. Future Flow — Phase 3: Community

This flow is for planning only and is **not part of Phase 1 implementation**.

### 7.1 Publish a prompt

```text
Authenticated owner opens their prompt
        ↓
Chooses Publish
        ↓
UI explains that the prompt may become publicly discoverable
        ↓
Owner confirms
        ↓
Server verifies ownership and eligibility
        ↓
Prompt becomes public according to approved rules
        ↓
Show published state
```

Saving a prompt must never publish it automatically.

### 7.2 Discover and reuse a community prompt

```text
User opens Community
        ↓
Browses published prompts
        ↓
Opens a public prompt
        ↓
Reviews content and available metadata/media
        ↓
Copies or reuses prompt according to released functionality
```

Guest access, attribution, publication lifecycle, media behavior, reporting, and moderation must be decided before Phase 3 implementation.

---

## 8. Decisions to Confirm Before Implementation

Keep unresolved decisions visible rather than guessing:

1. How are accounts linked when the same email is used with different authentication methods/providers?
2. Are any additional identity providers beyond Google and GitHub approved for later phases?
3. Do multiple selected tags use AND or OR filtering?
4. What are the final route names and exact screen layouts?
5. What are the chosen session lifetime and persistence details?

The central PRD (`docs/prompt-vault-prd.md`) is authoritative. This flow document is aligned with the approved Phase 1 authentication methods: email magic link, Google OAuth, and GitHub OAuth. Traditional email/password authentication is not part of Phase 1.
