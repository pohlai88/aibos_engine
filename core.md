# CORE RULES for AIBOS Project

## 1. Project Structure & Organization
- Always follow the monorepo structure:
  - All apps in `apps/`
  - All shared code in `packages/`
  - All config files at the project root
  - No new root folders unless explicitly listed in the roadmap or README
- Never duplicate files or folders; always check for existing code before creating new.
- Remove empty or unnecessary folders after refactoring.

## 2. Type Safety & Contracts
- All code (frontend and backend) must use TypeScript with strict type safety.
- Always use shared types from `@aibos/types` for API contracts and data models.
- Never use `any` unless absolutely necessary and justified in a comment.

## 3. API & Data Flow
- All frontend-backend communication must use RESTful endpoints defined in the backend.
- All API responses must conform to the shared response types.
- Always handle errors and loading states in the UI.

## 4. Code Quality & Testing
- All new code must be linted and formatted according to project standards.
- Add or update unit/integration tests for all new features and bug fixes.
- Use meaningful commit messages and keep PRs focused and atomic.

## 5. Collaboration & Documentation
- Update `ROADMAP.md` and relevant docs as features are added or completed.
- Document all new endpoints, components, and utilities.
- Use clear, descriptive names for all files, functions, and variables.

## 6. Security & Best Practices
- Never commit secrets or credentials.
- Use environment variables for all sensitive config.
- Validate all user input on both frontend and backend.

---
**These rules are always in effect. All feature requests, bug fixes, and refactors must comply.**