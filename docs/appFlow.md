# Prompt Vault — App Flow

**Document purpose:** Describe how users move through Prompt Vault and complete user-facing journeys.

**Authority:** This document visualizes user journeys. `prd.md` remains the central product source of truth, `phase-1-mvp.md` defines the current Phase 1 scope, and `architecture.md` defines the technical design. This file must not override those documents.

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

Prompt Vault is intended to support these sign-in methods:

1. Traditional email/password registration and login.
2. Email magic-link sign-in.
3. Google sign-in and other configured identity providers.

All methods should establish the same authenticated application state and grant the same account permissions. Logout and protected-resource rules apply regardless of sign-in method.

### 3.1 Traditional email/password registration

```text
Guest opens Sign In / Create Account
        ↓
Chooses email/password registration
        ↓
Enters required registration details
        ↓
Client validates fields
        ↓
Server validates details and creates account
        ↓
Success: establish or continue the documented sign-in flow
        ↓
Shared Home Page — authenticated state
```

If validation or account creation fails, show a clear error and allow the user to correct the information. Do not show success unless account creation succeeds.

**Open detail:** Whether successful registration automatically signs the user in or asks them to log in must be confirmed in the product requirements before implementation.

### 3.2 Traditional email/password login

```text
Guest opens Sign In
        ↓
Chooses email/password
        ↓
Enters email and password
        ↓
Server verifies credentials
        ↓
Valid credentials?
   ├── No → Show an appropriate error; allow retry
   └── Yes → Establish authenticated session
                    ↓
             Return to safe intended destination
             or shared home page
```

If a session cannot be established, keep the user unauthenticated. Do not reveal private prompt data.

**Open detail:** Password reset/recovery has not yet been confirmed as Phase 1 scope. Do not silently add it; decide whether it is required before implementation.

### 3.3 Email magic-link sign-in

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
- If a future flow requires preserving temporary user work during sign-in, the sign-in flow must not intentionally discard it.

### 3.4 Google and other identity-provider sign-in

```text
Guest opens Sign In
        ↓
Chooses Google or another configured provider
        ↓
Application starts provider authentication
        ↓
User completes the provider's authentication/consent steps
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
- Only providers that have been configured and approved are shown.
- Provider credentials/secrets remain server-side where applicable.
- Account creation, existing-account matching, and linking identities must follow explicit rules.

**Open detail:** Account-linking behavior (for example, what happens when a provider returns an email already associated with an existing account) must be decided before implementing multiple providers. Do not automatically merge accounts without a safe, explicit rule.

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
Assigns category and adds tags
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

**Open detail:** The central PRD marks whether category is mandatory as TBD. The form must follow the final decision recorded in the product requirements.

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

1. Does successful email/password registration automatically sign the user in?
2. Is password reset/recovery included in Phase 1?
3. How are accounts linked when the same email is used with different authentication methods/providers?
4. Which external identity providers are included at initial launch, beyond Google?
5. Is category required or optional?
6. Do multiple selected tags use AND or OR filtering?
7. What are the final route names and exact screen layouts?
8. What are the chosen session lifetime and persistence details?

Authentication requirements in the central `prd.md` must be updated to match the final decision to support email/password, magic links, and Google/other providers. Until that is reconciled, this flow document records the latest requested direction but does not silently override the central PRD.
