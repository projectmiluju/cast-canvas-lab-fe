# Husky Local Policy

This project enforces local Git checks with Husky only.

## Active Hooks

### `pre-commit`

Runs, in order:

1. `pnpm run check:branch`
2. `pnpm run check:no-secrets`
3. `pnpm exec lint-staged`

What this enforces:

- Branch naming format
- Basic secret pattern detection in staged files
- ESLint + Prettier on staged files only

### `commit-msg`

Runs:

1. `pnpm exec commitlint --edit "$1"`

What this enforces:

- Conventional Commits format
- Allowed commit types only
- Commit header max length (`100`)

### `pre-push`

Runs, in order:

1. Block push when current branch is `main`
2. `pnpm run check:branch`
3. `pnpm run typecheck`
4. `pnpm run build`

What this enforces:

- Local direct push guard for `main`
- Branch naming validation before push
- TypeScript build/type validation
- Build success before push

## Naming Rule

Allowed branch names:

- `main`
- `develop`
- `release/<name>`
- `hotfix/<name>`
- `<type>/<name>`

Allowed `<type>` values:

- `feat`
- `fix`
- `chore`
- `docs`
- `refactor`
- `test`
- `ci`
- `build`
- `perf`
- `revert`

Examples:

- `feat/login-page`
- `fix/api-timeout`
- `chore/update-deps`
- `release/v1.2.0`

## Commit Message Rule

Conventional Commits examples:

- `feat(auth): add token refresh`
- `fix(canvas): prevent null node crash`
- `chore: upgrade vite`

## Local Setup

1. Install dependencies:
   - `pnpm install`
2. Ensure hooks are installed:
   - `pnpm run prepare`

## Scope and Limits (Husky-only)

- All checks are local developer-machine hooks.
- Hooks can be bypassed with `--no-verify`.
- Remote policy (PR requirements, required reviews/checks, branch protection) is not enforced by Husky.
