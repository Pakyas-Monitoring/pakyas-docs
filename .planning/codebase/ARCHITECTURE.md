# Architecture

**Analysis Date:** 2026-01-24

## Pattern Overview

**Overall:** Static Site Generator with Content Collection

This is a documentation site built on Astro with Starlight, a modern static site generation pattern. The architecture focuses on content-driven documentation delivery with edge-computed routing handled by Cloudflare Workers.

**Key Characteristics:**
- Content-first approach: Documentation is authored as Markdown files in `src/content/docs/`
- Astro collections system manages content validation and automatic ID generation
- Starlight framework provides structured navigation, theming, and UI components
- Static output deployed to Cloudflare Workers for edge serving
- Worker-based URL normalization ensures trailing slash consistency

## Layers

**Content Layer:**
- Purpose: Store and manage documentation content
- Location: `src/content/docs/`
- Contains: Markdown files organized by topic (recipes, integrations, configuration, API reference, CLI reference)
- Depends on: Astro content collections system
- Used by: Astro build system for page generation

**Collection Configuration Layer:**
- Purpose: Define content schemas and ID generation strategies
- Location: `src/content.config.ts`
- Contains: Collection definitions with docsLoader and schema validation
- Depends on: `@astrojs/starlight` package
- Used by: Astro runtime during content processing

**Build & Static Generation Layer:**
- Purpose: Transform Markdown content into static HTML
- Location: `astro.config.mjs`
- Contains: Astro configuration, Starlight integration, mermaid diagram support
- Depends on: Astro framework, Starlight, astro-mermaid plugin
- Used by: npm build script and dev server

**Styling Layer:**
- Purpose: Provide custom CSS overrides and theming
- Location: `src/styles/custom.css`
- Contains: CSS custom properties for accent colors and theme customization
- Depends on: Starlight base CSS
- Used by: All pages via Starlight layout system

**Static Assets Layer:**
- Purpose: Store and serve non-markdown content (images, logos, social cards)
- Location: `src/assets/`, `public/`
- Contains: SVG logos, webp images, favicon, social card PNG
- Depends on: Sharp for image optimization
- Used by: Built site for static asset delivery

**Worker/Edge Layer:**
- Purpose: Handle URL routing and normalization at edge
- Location: `src/worker.js`
- Contains: Cloudflare Worker code for trailing slash redirects and path rewriting
- Depends on: Cloudflare Workers API
- Used by: Cloudflare infrastructure for request handling

## Data Flow

**Build Time Flow:**

1. Astro reads markdown files from `src/content/docs/`
2. Content collection system (`src/content.config.ts`) validates frontmatter and generates unique IDs
3. Starlight processes collection to build navigation structure defined in `astro.config.mjs`
4. Astro generates static HTML pages and places them in `dist/`
5. Static assets are optimized and copied to output
6. Worker code in `src/worker.js` is bundled with static assets

**Runtime Flow:**

1. Request arrives for `pakyas.com/docs/some-page`
2. Cloudflare Worker (via `wrangler.json`) intercepts and checks for trailing slash
3. If URL lacks trailing slash and isn't a file (no extension), Worker redirects with 301
4. Worker strips `/docs` prefix from pathname
5. Request routed to `ASSETS` binding which serves from `dist/` directory
6. Static HTML, CSS, JavaScript, and assets delivered to browser

**State Management:**
- No client-side state management
- Navigation state managed by Starlight in browser (sidebar open/close)
- Search functionality provided by Starlight's built-in search UI
- All dynamic interactions handled by Alpine.js (loaded via Starlight)

## Key Abstractions

**Documentation Page:**
- Purpose: Represent a single piece of documentation
- Examples: `src/content/docs/getting-started.md`, `src/content/docs/api/ping.md`, `src/content/docs/cli/monitor.md`
- Pattern: Markdown files with YAML frontmatter (title, description) + Markdown content

**Content Category:**
- Purpose: Logical grouping of related documentation
- Examples: `src/content/docs/recipes/` (scheduled-jobs.md, backups.md, reports.md, etl.md), `src/content/docs/cli/` (index.md, monitor.md, ping.md), `src/content/docs/api/` (index.md, ping.md, checks.md)
- Pattern: Directory-based organization reflecting navigation structure in `astro.config.mjs`

**Sidebar Navigation:**
- Purpose: Define document hierarchy and navigation in UI
- Examples: Configuration in `astro.config.mjs` lines 54-144
- Pattern: Declarative sidebar structure with labels, links, and nested items

**Starlight Integration:**
- Purpose: Provide themes, components, and documentation-specific features
- Examples: Markdown rendering, code highlighting, sidebar generation, search UI
- Pattern: Framework integration via `integrations` array in Astro config

## Entry Points

**Development Server:**
- Location: `astro.config.mjs` + `npm run dev`
- Triggers: `npm run dev` command
- Responsibilities: Serves hot-reloaded site at `http://localhost:3000` for local development

**Build Process:**
- Location: `astro.config.mjs` + `npm run build`
- Triggers: `npm run build` command or CI/CD pipeline
- Responsibilities: Generates static site in `dist/` directory with all assets optimized

**Cloudflare Worker:**
- Location: `src/worker.js` (wrangler.json config at root)
- Triggers: HTTPS requests to `pakyas.com/docs*` (as defined in wrangler.json routes)
- Responsibilities: URL normalization (trailing slash redirects) and path rewriting

## Error Handling

**Strategy:** Browser-native error handling with Starlight fallbacks

**Patterns:**
- Markdown parsing errors: Caught by Astro during build, preventing failed deploys
- Missing pages: 404 pages generated by Astro automatically for undefined routes
- Worker errors: Graceful fallback to static asset serving when redirects fail
- Missing assets: Browser's native 404 behavior for broken image/file references

## Cross-Cutting Concerns

**Logging:** No explicit logging in source code; Cloudflare Workers provides request/error logs

**Validation:** Astro's content collection schema (`src/content.config.ts`) validates Markdown frontmatter; Starlight schema enforces required fields

**Authentication:** Not applicable - all content is public documentation. No user authentication or authorization required.

**Caching:** Cloudflare Workers cache static assets at edge globally. Cache headers set by `wrangler.json` asset binding.

---

*Architecture analysis: 2026-01-24*
