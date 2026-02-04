# dilano-admin

Vue 3 + Vite + TypeScript + Naive UI + UnoCSS Enterprise Management System (pnpm monorepo)

## Tech Stack

| Category | Tech |
|----------|------|
| Framework| Vue 3.5+ (`<script setup>`) |
| Build    | Vite 7+, pnpm >=10.5 |
| UI       | Naive UI |
| Styles   | UnoCSS + SCSS |
| State    | Pinia |
| Router   | Vue Router + @elegant-router |
| HTTP     | @sa/axios |

## Core Directories

```
src/
├── views/      # Pages
├── layouts/    # Layouts
├── router/     # Routing
├── store/      # State Management
├── service/    # API Services
├── theme/      # Theme Config
└── typings/    # Type Definitions

packages/       # @sa/* Internal Libraries
build/          # Build Config
```

## Common Scripts

- `pnpm dev` - Start dev server
- `pnpm build` - Build for production
- `pnpm typecheck` - Run type check
- `pnpm sa gen-route` - Generate routes

## Path Aliases

- `@/` → `src/`
- `~/` → Project root

---

## Token Optimization Rules

> **Core Principle**: Minimize unnecessary data transmission; prioritize precise operations.

### File Operations

1. **Precise Read**: Use `view_file` with `StartLine/EndLine` to avoid reading entire large files.
2. **Outline First**: Use `view_file_outline` to understand structure before reading new files.
3. **Symbol Navigation**: Use `view_code_item` to jump directly to known functions/classes.
4. **Precise Search**: Use `grep_search` with `Includes` to scope down results.

### Code Modification

1. **Precise Replace**: Prefer `replace_file_content` to change only the minimum necessary content.
2. **Batch Edits**: Use `multi_replace_file_content` for multiple non-contiguous changes in one go.
3. **Avoid Rewrites**: Do NOT use `write_to_file` to overwrite large existing files.

### Interaction Strategy

1. **Reduce Confirmations**: Execute clear tasks directly without redundant "Are you sure?" checks.
2. **Parallel Tools**: Call independent tools in parallel to reduce turn count.
3. **Concise Output**: Keep responses brief; avoid repeating code or long explanations.

### Context Management

1. **Search on Demand**: Do not pre-load irrelevant files.
2. **Goal Oriented**: Go straight to the target; minimize exploration.
3. **Reuse Knowledge**: Do not re-fetch information already known.
