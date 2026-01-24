# Pakyas Documentation Site

## What This Is

Documentation site for Pakyas, a cron job monitoring SaaS. Built with Astro and Starlight, deployed to Cloudflare Workers. Provides API reference, CLI guides, integration tutorials, and configuration documentation.

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

### Active

- [ ] CLI `auth` command documentation
- [ ] CLI `api-key` command documentation
- [ ] CLI `check doctor` command documentation
- [ ] CLI `check tail` command documentation
- [ ] CLI `check inspect` command documentation
- [ ] CLI `completion` command documentation
- [ ] Global flags documentation update
- [ ] Environment variables documentation update
- [ ] Minor flag updates for existing commands

### Out of Scope

- Video tutorials — text documentation sufficient for v1
- Internationalization — English only for now
- Interactive API playground — static docs only

## Context

- CLI codebase at ~/projects/pakyas/pakyas-cli (Rust, Clap)
- Docs site uses Astro + Starlight framework
- Sidebar navigation defined in astro.config.mjs
- Documentation follows kebab-case naming for files

## Constraints

- **Framework**: Astro + Starlight — existing site architecture
- **Deployment**: Cloudflare Workers — no server-side features
- **Style**: Match existing documentation tone and formatting

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Sync docs with CLI v1.x | CLI has new features users need to discover | — Pending |

---
*Last updated: 2026-01-24 after milestone v1.0 initialization*
