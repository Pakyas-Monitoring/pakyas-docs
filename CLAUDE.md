# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation site for Pakyas, a cron job monitoring SaaS. Built with Astro and Starlight (Astro's documentation theme).

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server on http://localhost:4321
npm run build        # Build static site to /dist
npm run preview      # Preview production build locally
```

## Architecture

**Stack:** Astro 5.x + Starlight + Mermaid diagrams

**Content Location:** All documentation pages are in `src/content/docs/`. Each `.md` or `.mdx` file becomes a page at its corresponding URL path.

**Sidebar Configuration:** Defined in `astro.config.mjs` - update this when adding new pages or reorganizing navigation.

**URL Structure:**
- Base path: `/docs` (site is served at `pakyas.com/docs`)
- Trailing slashes are enforced (always use `/getting-started/` not `/getting-started`)

**Deployment:** Static site deployed via Cloudflare Workers. The `src/worker.js` handles URL normalization and trailing slash redirects.

## Content Format

Pages use standard markdown with YAML frontmatter:

```markdown
---
title: Page Title
description: Brief description for SEO
---

Content here...
```

Starlight features available:
- Callouts: `:::tip[Title]`, `:::note`, `:::caution`, `:::danger`
- Code blocks with syntax highlighting
- Mermaid diagrams in fenced code blocks with `mermaid` language

## Commits

Use conventional commits (`feat:`, `fix:`, `docs:`, etc.) without Co-authored-by trailers.
