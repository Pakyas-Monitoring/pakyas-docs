# Codebase Structure

**Analysis Date:** 2026-01-24

## Directory Layout

```
pakyas-docs/
├── src/                         # Source code and content
│   ├── content/                 # Astro content collections
│   │   └── docs/                # Documentation pages
│   │       ├── index.md         # Home page
│   │       ├── getting-started.md
│   │       ├── api/             # API reference docs
│   │       ├── cli/             # CLI command reference
│   │       ├── config/          # Configuration docs
│   │       ├── environments/    # Integration guides (GitHub Actions, Docker, K8s, etc.)
│   │       ├── integrations/    # Integration overview
│   │       ├── status-pages/    # Status pages feature docs
│   │       ├── alerts.md
│   │       ├── webhooks.md
│   │       ├── limits.md
│   │       └── [recipes]/       # Use case guides (backups, scheduled-jobs, reports, etl, etc.)
│   ├── styles/                  # CSS and styling
│   │   └── custom.css           # Starlight theme overrides
│   ├── assets/                  # Images and graphics
│   │   ├── pakyas-logo.svg
│   │   └── houston.webp
│   ├── content.config.ts        # Astro content collection configuration
│   └── worker.js                # Cloudflare Worker entry point
├── public/                      # Static assets served directly
│   ├── favicon.svg
│   ├── favicon.ico
│   └── social-card-documentation.png
├── dist/                        # Build output (generated)
│   └── [built static site]
├── astro.config.mjs             # Astro configuration with Starlight setup
├── wrangler.json                # Cloudflare Workers configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and build scripts
├── package-lock.json            # Locked dependency versions
├── README.md                    # Project overview
├── CONTRIBUTING.md              # Contribution guidelines
└── LICENSE                      # MIT License
```

## Directory Purposes

**src/:**
- Purpose: All source files (content, code, styles, assets)
- Contains: Markdown documentation, TypeScript config, Astro config, Worker code, styles, images
- Key files: `content.config.ts`, `worker.js`, `styles/custom.css`

**src/content/:**
- Purpose: Astro content collections directory (required by framework)
- Contains: Organization of all documentation
- Key files: All `.md` files are auto-discovered and processed

**src/content/docs/:**
- Purpose: Root documentation directory - contains all pages
- Contains: Top-level docs (getting-started.md, index.md) and subdirectories for categories
- Key files: `index.md` (home page), `getting-started.md` (onboarding)

**src/content/docs/api/:**
- Purpose: API reference documentation
- Contains: Ping endpoint docs, Check endpoints docs, API overview
- Key files: `index.md` (API overview), `ping.md`, `checks.md`

**src/content/docs/cli/:**
- Purpose: CLI command reference documentation
- Contains: Installation guide, command references (monitor, ping, update), external monitor migration
- Key files: `index.md` (CLI overview), `monitor.md`, `ping.md`, `external-monitors.md` (largest at 380 lines)

**src/content/docs/config/:**
- Purpose: Configuration guides and infrastructure setup
- Contains: Environment variables documentation, Terraform provider setup
- Key files: `env-vars.md`, `terraform.md`

**src/content/docs/environments/:**
- Purpose: Integration guides for different deployment platforms
- Contains: Setup guides for GitHub Actions, GitLab CI, Jenkins, CircleCI, Docker, Kubernetes, Nagios, Linux
- Key files: `linux.md`, `docker.md`, `kubernetes.md`, `github-actions.md` (most common platforms)

**src/content/docs/integrations/:**
- Purpose: Overview and introduction to integrations
- Contains: Link aggregation for all integration guides
- Key files: `index.md`

**src/content/docs/status-pages/:**
- Purpose: Status pages feature documentation
- Contains: Overview of status pages feature, integrations list
- Key files: `index.md` (213 lines), `integrations.md` (331 lines)

**src/styles/:**
- Purpose: CSS customization for theme
- Contains: Minimal CSS overrides for Starlight defaults
- Key files: `custom.css` (accent color customization only)

**src/assets/:**
- Purpose: Image and graphic assets used in documentation and metadata
- Contains: Logo and hero image for site
- Key files: `pakyas-logo.svg`, `houston.webp`

**public/:**
- Purpose: Static assets served at root level (not processed by build)
- Contains: Favicon files and social preview card
- Key files: `social-card-documentation.png` (561KB, used for og:image and Twitter card)

**dist/:**
- Purpose: Build output directory (generated, not committed)
- Contains: Complete static site ready for deployment
- Key files: Generated HTML pages, CSS bundles, JavaScript, optimized assets

## Key File Locations

**Entry Points:**
- `astro.config.mjs`: Astro build configuration, Starlight setup, routing rules
- `src/worker.js`: Cloudflare Worker handler for URL normalization
- `wrangler.json`: Cloudflare Workers deployment configuration

**Configuration:**
- `package.json`: Dependencies (astro, @astrojs/starlight, astro-mermaid, sharp, etc.)
- `tsconfig.json`: TypeScript strict mode configuration
- `src/content.config.ts`: Astro content collection schema and ID generation

**Core Logic:**
- `src/content/docs/`: All documentation content (35 markdown files total)
- `src/styles/custom.css`: Starlight theme customization (minimal)
- `src/worker.js`: Request handling and URL routing logic

**Styling:**
- `src/styles/custom.css`: Only custom CSS file; rest provided by Starlight framework
- Theming via CSS custom properties (--sl-color-accent, etc.)

**Assets:**
- `src/assets/`: Documentation site assets (logo, image)
- `public/`: Root-level static assets (favicon, social card)

## Naming Conventions

**Files:**
- Markdown docs: `kebab-case.md` (e.g., `getting-started.md`, `scheduled-jobs.md`, `external-monitors.md`)
- Index files: `index.md` in each directory for category overviews
- Config files: Descriptive names matching tool (astro.config.mjs, wrangler.json, tsconfig.json)
- Worker code: `worker.js` for Cloudflare Workers handler
- Styles: Single custom.css for all overrides

**Directories:**
- Content categories: `kebab-case` (e.g., `status-pages/`, `environments/`, `integrations/`)
- Framework directories: Astro conventions (`content/`, `assets/`, `styles/`)
- Build artifacts: Standard names (`dist/`, `public/`)

**Markdown Frontmatter:**
- `title`: Human-readable page title (e.g., "Getting Started", "monitor Command")
- `description`: Brief 1-line description for SEO and sidebar
- Pattern: YAML block at top of every .md file between `---` delimiters

## Where to Add New Code

**New Documentation Page:**
- Primary content: `src/content/docs/[category]/[slug].md`
- Frontmatter template:
  ```yaml
  ---
  title: Page Title
  description: Brief description for SEO
  ---
  ```
- Content: Markdown with optional code blocks, lists, links
- Register in sidebar: Add entry to `astro.config.mjs` sidebar array (lines 54-144)

**New Category/Section:**
- Primary location: `src/content/docs/new-category/`
- Create: `index.md` for category overview
- Add sub-pages as needed: `guide-1.md`, `guide-2.md`, etc.
- Register: Add section to sidebar in `astro.config.mjs`
- Pattern: Mirror existing categories (e.g., `cli/`, `api/`, `environments/`)

**Images/Assets:**
- Documentation images: `src/assets/[filename].[png|svg|webp]`
- Site-level assets (favicon, social card): `public/[filename]`
- Reference in Markdown: Relative paths or use Astro image import

**Custom Styling:**
- Add CSS to: `src/styles/custom.css` (currently 6 lines)
- Use Starlight CSS custom property names (prefix `--sl-`)
- Example pattern:
  ```css
  :root {
    --sl-color-accent: #00bfff;
    --sl-color-accent-low: #003d5c;
  }
  ```

**Worker/Routing Logic:**
- Modify at: `src/worker.js`
- Current responsibilities: Trailing slash normalization, /docs path stripping
- Pattern: Export default object with fetch handler
- Test: `npm run dev` and visit URLs with/without trailing slashes

## Special Directories

**node_modules/:**
- Purpose: Installed npm dependencies
- Generated: Yes (by npm install)
- Committed: No (listed in .gitignore)

**.astro/:**
- Purpose: Astro build cache and type definitions
- Generated: Yes (by Astro build system)
- Committed: No (listed in .gitignore)

**dist/:**
- Purpose: Final static site build output
- Generated: Yes (by `npm run build`)
- Committed: No (listed in .gitignore)

---

*Structure analysis: 2026-01-24*
