# Prompt Vault — Phase 1 MVP Product Requirements Document

**Project:** Prompt Vault
**Phase:** Phase 1 — MVP
**Document Type:** Product Requirements Document
**Status:** Planning

---

# 1. Product Overview

Prompt Vault is a web application that allows users to store and manage AI prompts in one private, organized location.

Users may write prompts themselves or save prompts they already use with AI tools such as ChatGPT, Gemini, or other AI applications.

The Phase 1 MVP focuses exclusively on **private prompt management**.

Guests and authenticated users use the same shared home page; the available actions depend on authentication state. Guests may view the shared home page and request an email sign-in link, but must authenticate before accessing a personal prompt collection or saving/managing private prompts. Phase 1 does not include guest AI generation or temporary AI-generated prompts; those belong to a later phase.

The MVP allows authenticated users to:

* Request and use an email magic link to authenticate

* Log in using Google OAuth

* Log in using GitHub OAuth

* Remain signed in while their session is valid

* Log out

The MVP does not include AI-powered prompt generation or community functionality.

---

# 2. Problem Statement

Users frequently create, discover, and reuse prompts while working with AI tools.

These prompts may be:

* Written from scratch
* Copied from previous conversations
* Found online
* Created for specific tasks
* Used repeatedly across different AI tools

Without a dedicated place to store them, useful prompts can become difficult to find, organize, and reuse.

Prompt Vault aims to provide a simple private workspace where users can store and manage their prompts efficiently.

---

# 3. Product Goal

The goal of Phase 1 is to provide a reliable MVP that allows a user to securely store, organize, find, modify, and reuse their own prompts.

A user should be able to complete the following core workflow:

```text
Open the shared home page
        ↓
Choose an authentication method
        ↓
Email Magic Link / Google OAuth / GitHub OAuth
        ↓
Complete authentication
        ↓
Access Prompt Vault
      ↓
Open the single-use link before it expires
      ↓
Authenticate (create an account if this is the first verified sign-in)
      ↓
Create / Save Prompt
      ↓
View Prompts
      ↓
Search / Filter
      ↓
Open Prompt
      ↓
Copy / Edit / Update
      ↓
Delete
      ↓
Logout
```

Guests can access the shared home page but cannot access a user's private prompt collection or perform private prompt-management actions until authenticated.

---

# 4. Target Users

Prompt Vault is intended for people who regularly use AI tools in their work, education, development, research, or personal workflows.

Potential users include:

* Students
* Developers
* Teachers
* Researchers
* Content creators
* Designers
* Professionals
* Other regular AI-tool users

Phase 1 does not require separate experiences or roles for these user groups.

All users receive the same core prompt-management functionality.

---

# 5. MVP Scope

## 5.1 In Scope

Phase 1 includes:

### Authentication

* Email magic-link authentication
* Google OAuth authentication
* GitHub OAuth authentication
* Single-use, expiring magic links
* Authentication persistence across supported sign-in methods
* Logout and session termination
* Protected application functionality
* Server-enforced authorization

### Prompt Management

* Create prompt
* View prompt list
* View individual prompt
* Edit prompt
* Update prompt
* Delete prompt
* Copy prompt

### Organization

* Prompt title
* Prompt description
* Prompt content
* Category
* Tags

### Discovery

* Search prompts
* Filter prompts
* Combine search and filters
* Clear filters

### Basic User Experience

* Loading states
* Empty states
* Error states
* Success feedback
* Confirmation for destructive actions

---

# 6. Out of Scope

The following features are explicitly excluded from Phase 1.

## AI Features

* AI prompt generation
* AI prompt improvement
* AI prompt rewriting
* AI prompt optimization
* AI provider integrations
* AI model selection

## Community Features

* Public prompts
* Community feed
* Prompt sharing
* Likes
* Comments
* Following users
* User profiles
* Community search

## Prompt Features

* Favorites
* Prompt version history
* Prompt ratings
* Prompt analytics
* Prompt import/export
* Prompt collaboration

## Advanced Platform Features

* Teams
* Workspaces
* Notifications
* Advanced analytics
* Subscription/billing functionality
* Advanced permissions
* Real-time collaboration

These features may be considered in future phases but are not requirements for Phase 1.

---


# 7. User Authentication Requirements

Phase 1 supports three authentication options:

1. Email magic-link authentication.
2. Google OAuth authentication.
3. GitHub OAuth authentication.

Traditional email-and-password registration and login are not included.

## 7.1 Email Magic-Link Authentication

A user must be able to enter their email address and request a sign-in link.

Requirements:

* Email address must be valid.
* The system sends a sign-in link to the supplied email address.
* First-time account creation can happen after successful verification.
* Each link must contain a secure, single-use token.
* The token must expire after a configured period.
* Expired, invalid, or already-used links must be rejected.
* Repeated requests must be protected against abuse.
* The UI must provide clear feedback.

## 7.2 Google OAuth Authentication

Users must be able to sign in using Google.

Requirements:

* Google sign-in must be available.
* The authentication response must be verified.
* First-time account creation can occur after successful authentication.
* Failed or cancelled authentication must not grant access.
* Successful authentication establishes the Prompt Vault application session.

## 7.3 GitHub OAuth Authentication

Users must be able to sign in using GitHub.

Requirements:

* GitHub sign-in must be available.
* The authentication response must be verified.
* First-time account creation can occur after successful authentication.
* Failed or cancelled authentication must not grant access.
* Successful authentication establishes the Prompt Vault application session.

## 7.4 Authentication Persistence

* Authentication must persist across normal page refreshes while the session is valid.
* All supported authentication methods must use the same application authorization rules.
* Invalid or expired sessions must be handled appropriately.
* Unauthenticated users must not access protected functionality.

## 7.5 Logout

* Users must be able to log out regardless of their authentication method.
* The application session must be terminated.
* The authenticated state must be cleared.
* Appropriate feedback or redirection must be provided.


---

# 8. Prompt Requirements

A prompt is the primary resource managed by Prompt Vault.

Each prompt belongs to the user who created it.


## 8.1 Prompt Information

| Field | Requirement |
|---|---|
| Title | Required |
| Description | Optional |
| Content | Required |
| Categories | Required; one or more predefined or custom categories |
| Tags | Optional; multiple predefined or custom tags |
| Created date | Automatically recorded |
| Updated date | Automatically recorded |

The predefined category list is:

- Development
- Education
- Writing
- Research
- Productivity
- Image Generation
- Other

Users can also create custom categories.

Users can select predefined tags and create their own custom tags.

A prompt can have multiple categories and multiple tags.

Categories and tags are separate organizational systems.
```

---

# 9. Create Prompt

Users must be able to create a prompt manually.

"Manually" means the user can either:

1. Write a new prompt themselves, or
2. Copy an existing prompt from another application or source and paste it into Prompt Vault.

Example:

```text
User finds a useful prompt in ChatGPT
              ↓
Copies the prompt
              ↓
Opens Prompt Vault
              ↓
Creates a new prompt
              ↓
Pastes the prompt content
              ↓
Adds title and content
Adds an optional description
Selects one or more categories
Selects or creates tags
Saves the prompt
              ↓
Saves the prompt
```

### Requirements

* User must be able to enter a title.
* User must be able to enter prompt content.
* User may provide a description.
* User must be able to assign a category.
* User must be able to add tags.
* Required information must be validated.
* The prompt must belong to the authenticated user.
* A successfully created prompt must become available in the user's prompt collection.
* The user must receive appropriate success or error feedback.

---

# 10. View Prompts

Users must be able to view their saved prompts.

The prompt list must contain only prompts belonging to the authenticated user.

### Requirements

Users should be able to identify each prompt through information such as:

* Title
* Description
* Category
* Tags
* Creation/update information

The prompt list must provide access to relevant prompt actions, including:

* Open/view
* Edit
* Delete
* Copy

### Required states

The prompt list must handle:

* Loading
* Successful results
* Empty collection
* Errors
* No search/filter results

---

# 11. View Individual Prompt

Users must be able to open and view a single prompt.

The individual prompt view must display the complete prompt information.

### Requirements

The user must be able to see:

* Title
* Description
* Prompt content
* Category
* Tags
* Created date
* Updated date

The user must be able to:

* Copy the prompt
* Edit the prompt
* Delete the prompt

A user must not be able to view another user's private prompt.

---

# 12. Edit and Update Prompt

Users must be able to modify their existing prompts.

The user must be able to modify:

* Title
* Description
* Prompt content
* Category
* Tags

Users can add or remove multiple category and tag assignments when editing a prompt.

Removing a category or tag from a prompt only removes its association with that prompt. The underlying category or tag record remains available for other prompts.

Deleting the category or tag itself is a separate management action.

### Requirements

* Existing prompt information must be loaded for editing.
* The user must be able to modify supported fields.
* Updated information must be validated.
* The prompt must remain owned by the original user.
* The updated prompt must be reflected in subsequent views.
* The updated date must reflect the modification.
* The user must receive appropriate success or error feedback.

---

# 13. Delete Prompt

Users must be able to permanently delete their own prompts.

### Requirements

* A delete action must be available for the user's prompts.
* A confirmation should be requested before a destructive deletion.
* Only the prompt owner may delete the prompt.
* Successfully deleted prompts must no longer appear in the user's prompt collection.
* The user must receive appropriate feedback.
* The application must handle attempts to delete a prompt that no longer exists.

---

# 14. Search Prompts

Users must be able to search their own prompts.

Search should support relevant prompt information including:

* Title
* Description
* Content
* Tags

### Requirements

* A search input must be available.
* Search results must contain only the authenticated user's prompts.
* Search must support meaningful matching against the supported fields.
* The application must handle searches with no matching results.
* Clearing the search must restore the appropriate prompt collection.

---

## Category Filter

The MVP must support filtering by category.

The predefined category list is:

- Development
- Education
- Writing
- Research
- Productivity
- Image Generation
- Other

Users can also create and use custom categories.

A prompt can have multiple categories. Users must be able to filter their prompts using both predefined and custom categories.

## Tag Filter

Users must be able to filter prompts using tags associated with their prompts.

Predefined and custom tags must both be available for filtering.

A prompt can have multiple tags.

### Requirements

* Category filtering must be supported.
* Tag filtering must be supported.
* Search and filters must be usable together.
* Results must contain only the authenticated user's prompts.
* Users must be able to clear active filters.
* The application must handle cases where no prompts match the selected filters.
* The behavior when multiple tags are selected is **an open product decision**: decide whether a prompt must match **all** selected tags (AND) or **any** selected tag (OR) before implementing tag filtering. Record the chosen behavior in this document and in tests; do not assume one silently.

---

# 16. Copy Prompt

Users must be able to copy the actual prompt content for reuse.

### Requirements

* A copy action must be available.
* Only the prompt's content should be copied.
* The application should provide clear feedback when copying succeeds.
* Clipboard failures must be handled gracefully.

Copying a prompt does not require the creation or modification of a new prompt.

---

# 17. Prompt Ownership and Privacy

All prompts created during Phase 1 are private by default.

A user must only be able to access and manage their own prompts.

For example:

```text
User A
 └── Prompt A

User B
 └── Prompt B
```

User B must not be able to:

* View Prompt A
* Edit Prompt A
* Update Prompt A
* Delete Prompt A

This restriction must apply even when a user attempts to access another prompt through a manipulated or directly specified resource identifier.

Authorization is therefore a mandatory requirement for every protected prompt operation.

---

# 18. User Experience Requirements

The MVP should provide clear feedback during normal operations.

## Loading State

Operations that require waiting should provide an appropriate loading state.

## Empty State

When a user has no prompts, the application should clearly communicate that the collection is empty and provide an obvious way to create a prompt.

## No Results State

When a search or filter produces no results, the application should clearly communicate that no matching prompts were found.

## Error State

When an operation fails, the application should provide a clear and understandable error message.

## Success Feedback

Successful actions should provide appropriate feedback.

Examples:

* Prompt created successfully
* Prompt updated successfully
* Prompt deleted successfully
* Prompt copied successfully
* Logged out successfully

## Destructive Actions

Destructive actions such as deleting a prompt should require appropriate confirmation.

---

# 19. Required Application Screens

The Phase 1 MVP should provide the following user-facing screens or states:

1. **One shared home page** for guests and authenticated users; do not build separate guest landing and authenticated dashboard experiences solely because of authentication state.
2. Email entry / request magic-link state (may be a page, dialog, or panel).
3. "Check your email" confirmation state.
4. Magic-link verification result states, including success and invalid/expired/used-link recovery.
5. Google OAuth sign-in option.
6. GitHub OAuth sign-in option.
7. Authenticated user's private prompt collection.
8. Create prompt.
9. Individual prompt view.
10. Edit prompt.

The exact visual design and whether the authentication states use separate pages, dialogs, or panels are not defined by this PRD, provided all required functionality and user flows are supported. Guests must be directed to authenticate when they attempt a protected prompt-management action.

---

# 20. Functional Requirements Summary

The Phase 1 MVP must satisfy the following functional requirements.

## Authentication

* [ ] A user can request an email magic link.
* [ ] A valid, unexpired, single-use magic link authenticates the user.
* [ ] A user can authenticate using Google OAuth.
* [ ] A user can authenticate using GitHub OAuth.
* [ ] Successful authentication establishes the application session.
* [ ] Invalid or expired magic links are rejected.
* [ ] A user can log out regardless of authentication method.
* [ ] Protected functionality requires authentication.
- [ ] A guest or existing user can request a sign-in link by entering a valid email address.
- [ ] A valid, unexpired, single-use magic link authenticates the user; first-time account creation through this method occurs only after successful verification.
- [ ] Invalid, expired, or already-used links are rejected with clear recovery guidance.
- [ ] Magic-link requests are rate-limited and tokens are handled securely.
- [ ] A user can sign in with Google, and the authentication design supports other configured providers.
- [ ] Failed or cancelled provider authentication does not grant access.
- [ ] A user can remain authenticated while their session is valid, including across normal page refreshes, regardless of supported sign-in method.
- [ ] Guests can access the shared home page but cannot access private prompt-management functionality.
- [ ] A user can access protected functionality only when authenticated.
- [ ] A user can log out and terminate the application session regardless of sign-in method.

## Prompt Management

- [ ] User can create a prompt.
- [ ] User can view their prompts.
- [ ] User can view an individual prompt.
- [ ] User can edit a prompt.
- [ ] User can update a prompt.
- [ ] User can delete a prompt.
- [ ] User can copy a prompt.

## Prompt Organization

- [ ] Prompt has a title.
- [ ] Prompt supports a description.
- [ ] Prompt has content.
- [ ] Prompt supports a category.
- [ ] Prompt supports tags.
- [ ] Prompt records creation time.
- [ ] Prompt records update time.

## Discovery

- [ ] User can search prompts.
- [ ] User can search relevant prompt information.
- [ ] User can filter by category.
- [ ] User can filter by tags.
- [ ] User can combine search and filters.
- [ ] User can clear search and filters.

## Privacy and Authorization

- [ ] Prompts are private by default.
- [ ] Users can access only their own prompts.
- [ ] Users cannot modify another user's prompts.
- [ ] Ownership restrictions are enforced for all protected prompt operations.

---

# 21. Non-Functional Requirements

## Security

* Magic-link tokens must be generated securely, stored/validated in a manner that prevents token disclosure, expire, and be single-use.
* Tokens must be invalidated after successful verification and must not be exposed in application logs or unnecessary client-visible data.
* Magic-link requests and verification attempts must be rate-limited or otherwise protected against abuse.
* Provider authentication responses must be verified before a session is established.
* Provider secrets and credentials must be kept out of client-side code and protected in server-side configuration.
* Session credentials must be protected and session termination must be enforced on logout.
* Authorization must be enforced server-side for every protected prompt resource and operation.
* Authentication responses must not unnecessarily reveal whether an email address is registered.
* Sensitive information must not be unnecessarily exposed to users.

## Reliability

* Core authentication and prompt-management operations should behave predictably.
* Failed operations should not silently appear successful.
* The application should handle common invalid-input and not-found situations gracefully.

## Usability

* Core workflows should be understandable without extensive instructions.
* Forms should clearly identify required information.
* Actions should provide appropriate feedback.
* The interface should remain usable on common desktop and mobile screen sizes.

## Maintainability

* The implementation should remain consistent with the requirements defined in this document.
* Features outside the Phase 1 scope should not be introduced without an explicit requirement.
* The MVP should avoid unnecessary complexity.

---

# 22. Data and Privacy Requirements

The application must maintain a clear ownership relationship between users and their prompts.

A user's private prompt data must not be exposed to other users.

The application must not make prompts publicly accessible during Phase 1.

There is no community or public prompt functionality in the MVP.

---

# 23. MVP Acceptance Criteria

Phase 1 can be considered functionally complete when all of the following are true:

### Authentication

- [ ] A user can request and verify an email magic link.

- [ ] A user can authenticate using Google OAuth.

- [ ] A user can authenticate using GitHub OAuth.

- [ ] First-time account creation occurs after successful authentication.

- [ ] Failed or cancelled authentication does not grant access.
- [ ] A guest or existing user can request a magic link using a valid email address.
- [ ] A valid, unexpired, unused link authenticates the user.
- [ ] First-time account creation through magic-link authentication happens only after successful link verification.
- [ ] Invalid, expired, and previously used links do not authenticate the user and provide a recovery path.
- [ ] A user can sign in using Google, and other configured providers can be supported.
- [ ] Failed or cancelled provider sign-in does not grant access.
- [ ] The user remains authenticated across normal page refreshes while the session is valid, regardless of sign-in method.
- [ ] The user can log out and the application session is terminated regardless of sign-in method.
- [ ] Guests can view the shared home page but cannot access protected prompt-management functionality.

### Prompt Management

- [ ] An authenticated user can create a prompt.
- [ ] A user can view all of their own prompts.
- [ ] A user can open an individual prompt.
- [ ] A user can edit and update their prompt.
- [ ] A user can delete their prompt.
- [ ] A user can copy their prompt content.

### Search and Filtering

- [ ] A user can search their prompts.
- [ ] Search covers the defined searchable prompt information.
- [ ] A user can filter by category.
- [ ] A user can filter by tag.
- [ ] Search and filtering can be combined.
- [ ] Users can clear active search/filter criteria.

### Authorization

- [ ] A user cannot view another user's prompt.
- [ ] A user cannot edit another user's prompt.
- [ ] A user cannot update another user's prompt.
- [ ] A user cannot delete another user's prompt.

### User Experience

- [ ] Loading states are handled.
- [ ] Empty states are handled.
- [ ] No-result states are handled.
- [ ] Error states are handled.
- [ ] Successful actions provide appropriate feedback.
- [ ] Destructive deletion has confirmation.

---

# 24. Phase 1 Definition of Done

Phase 1 is complete when:

1. All in-scope functional requirements are implemented.
2. Email magic-link authentication, Google OAuth, and GitHub OAuth work correctly, including authentication failure handling, session persistence, and logout.
3. The shared home page serves guests and authenticated users, with protected actions gated by authentication.
4. Prompt creation, viewing, editing, updating, deletion, and copying work correctly.
5. Search and filtering work correctly.
6. Prompt ownership and authorization are enforced.
7. Private prompts cannot be accessed by other users.
8. Required loading, empty, error, and success states are handled.
9. The application satisfies the acceptance criteria in this document.
10. No Phase 2 or later functionality is required for completion.
11. The implementation does not depend on features explicitly listed as out of scope for Phase 1.

---

# 25. Phase 1 Boundary

This document defines **Phase 1 — MVP only**.

The completion of Phase 1 does not imply that Prompt Vault is feature-complete as a product.

Future functionality such as AI-assisted prompt generation, community features, favorites, sharing, collaboration, analytics, and other advanced capabilities may be considered in later phases.

Such functionality is not a requirement for Phase 1 and must not be used as a reason to delay MVP completion.
