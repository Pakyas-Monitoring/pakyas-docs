# Coding Conventions

**Analysis Date:** 2026-01-24

## Naming Patterns

**Files:**
- TypeScript files: `kebab-case.ts` (e.g., `content.config.ts`, `worker.js`)
- Markdown documentation files: `kebab-case.md` (e.g., `getting-started.md`, `external-monitors.md`)
- Astro component files: `PascalCase.astro` (not yet observed but follows Astro convention)
- Style files: `custom.css` for custom overrides

**Directories:**
- Grouped by feature/section: `docs/cli/`, `docs/config/`, `docs/environments/`, `docs/api/`
- All lowercase with hyphens for multi-word names (e.g., `github-actions`, `kubernetes-cronjobs`)

**Variables:**
- camelCase for JavaScript variables (e.g., `newPath`, `baseUrl`, `trailingSlash`)
- CONSTANT_CASE for configuration constants (inherited from tsconfig patterns)

**Types:**
- Astro uses TypeScript with strict mode enabled
- Type annotations on function parameters and return types

## Code Style

**Formatting:**
- No explicit Prettier configuration detected - defaults to Astro standards
- 2-space indentation (inferred from astro.config.mjs structure)
- Line lengths: reasonable limits observed (no extremely long lines in astro.config.mjs)

**Linting:**
- No explicit ESLint configuration in project (inherits from Astro defaults)
- TypeScript strict mode enforced via `tsconfig.json` extending `astro/tsconfigs/strict`
- JSDoc-style comments for configuration sections (e.g., `// @ts-check` directive)

## Import Organization

**Order:**
1. Framework/library imports (Astro, third-party packages)
2. Internal configuration/integration imports
3. Environment variables and runtime configuration

**Example from astro.config.mjs:**
```javascript
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import mermaid from "astro-mermaid";

export default defineConfig({
    // config...
});
```

**Path Aliases:**
- Base path configured: `/docs` in `astro.config.mjs` `base` property
- Assets from `./src/assets/` (e.g., `./src/assets/pakyas-logo.svg`)
- Content collections via Astro's content loader pattern

## Error Handling

**Patterns:**
- URL manipulation with proper validation (checking file extensions with regex `/\.[a-zA-Z0-9]+$/`)
- Redirect responses with HTTP status codes (e.g., `Response.redirect(url.toString(), 301)`)
- Fallback to default values (e.g., `|| "/"` in worker.js for missing paths)

## Logging

**Framework:** None - this is a static documentation site

**Patterns:**
- No runtime logging in main application code
- Comments in JavaScript/TypeScript files provide inline documentation
- Configuration-based documentation via YAML frontmatter in Markdown

## Comments

**When to Comment:**
- Configuration explanations in code (e.g., `// Redirect non-trailing-slash URLs to trailing-slash versions`)
- Complex logic explanations (e.g., file extension checking in worker.js)
- @ts-check directive at top of TypeScript/JavaScript configuration files

**Frontmatter in Markdown:**
```yaml
---
title: Command Name
description: Brief description
---
```

## Documentation Structure

**Markdown Conventions:**
- Frontmatter with `title` and `description` fields
- H2 headers (`##`) for main sections
- Code blocks with language syntax highlighting (bash, json, typescript, etc.)
- Nested directory structure mirrors documentation hierarchy
- Links use relative paths or full URLs

**Example from docs:**
```markdown
---
title: Getting Started
description: Start monitoring in under 5 minutes
---

## Quick Start with curl

## Install the CLI
```

## Function Design

**Size:** Small, focused functions (observed in `worker.js` - single responsibility)

**Parameters:**
- Explicit, type-checked via TypeScript
- Pattern from worker.js: `fetch(request, env)` with typed parameters

**Return Values:**
- Clear, predictable returns (e.g., `Response.redirect()`, fallback values)
- No undefined returns - defaults provided (e.g., `|| "/"`)

## Module Design

**Exports:**
- Default exports for configuration: `export default defineConfig({...})`
- Named exports for collections: `export const collections = {...}`
- Clear, single responsibility per file

**Configuration:**
- All major configuration centralized in `astro.config.mjs`
- Sidebar structure, integrations, and site settings in one location
- Environment variables read from `process.env` (e.g., `PUBLIC_SITE_URL`)

## Commit Message Conventions

**Format:** Conventional commits with type prefix

**Types observed:**
- `docs:` - Documentation updates (e.g., `docs: add public_id support`)
- `feat:` - New features (e.g., `feat: add social card for documentation sharing`)
- `fix:` - Bug fixes
- No Co-authored-by trailers per project guidelines

**Examples:**
- `docs: add public_id support for external monitor configuration`
- `docs: add section on how schedules are evaluated`
- `feat: add social card for documentation sharing`

---

*Convention analysis: 2026-01-24*
