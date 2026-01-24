# Pakyas Documentation Site

## What This Is

Documentation site for Pakyas, a cron job monitoring SaaS. Built with Astro and Starlight, deployed to Cloudflare Workers. Provides comprehensive API reference, CLI command guides, integration tutorials, and configuration documentation.

## Core Value

Documentation accurately reflects the actual product capabilities, enabling users to successfully integrate Pakyas into their workflows.

## Requirements

### Validated

- Getting started guide
- API reference (ping, checks endpoints)
- CLI installation and basic usage
- ping command documentation
- monitor command documentation
- update command documentation
- External monitors integration guide
- Integration guides (GitHub Actions, Docker, Kubernetes, etc.)
- Configuration documentation (env vars, Terraform)
- Status pages feature documentation
- CLI `auth` command documentation — v1.0
- CLI `api-key` command documentation — v1.0
- CLI `check doctor` command documentation — v1.0
- CLI `check tail` command documentation — v1.0
- CLI `check inspect` command documentation — v1.0
- CLI `completion` command documentation — v1.0
- Global flags documentation update — v1.0
- Environment variables documentation update — v1.0
- Minor flag updates for existing commands — v1.0

### Active

(None — v1.0 scope complete)

### Out of Scope

- Video tutorials — text documentation sufficient for v1
- Internationalization — English only for now
- Interactive API playground — static docs only

## Context

- CLI codebase at ~/projects/pakyas/pakyas-cli (Rust, Clap)
- Docs site uses Astro + Starlight framework
- Sidebar navigation defined in astro.config.mjs
- Documentation follows kebab-case naming for files

**Current State (v1.0):**
- 38 documentation pages built
- 4,207 lines of Markdown documentation
- 10 CLI command pages with full sidebar navigation
- Complete environment variables reference

## Constraints

- **Framework**: Astro + Starlight — existing site architecture
- **Deployment**: Cloudflare Workers — no server-side features
- **Style**: Match existing documentation tone and formatting

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Sync docs with CLI v1.x | CLI has new features users need to discover | Good — all CLI gaps closed |
| Include login/logout/whoami in auth.md | Authentication-related commands grouped together | Good — logical user flow |
| Differentiate api-key vs auth key with callout | Users confused about server-side vs local credentials | Good — clear guidance |
| Differentiate inspect vs doctor with callout | Similar commands need clear "when to use" guidance | Good — debugging flow clear |
| Document both PAKYAS_NO_COLOR and NO_COLOR | Both supported, users may expect either | Good — comprehensive |
| Alphabetical sidebar ordering | Commands easy to find | Good — consistent navigation |
| Global flags section with env var mappings | Users can discover persistent configuration | Good — cross-reference works |

---
*Last updated: 2026-01-24 after v1.0 milestone shipped*
