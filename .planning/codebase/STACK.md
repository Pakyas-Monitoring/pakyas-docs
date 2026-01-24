# Technology Stack

**Analysis Date:** 2026-01-24

## Languages

**Primary:**
- TypeScript - Full codebase including configuration and content system
- Markdown - Documentation content (via Astro/Starlight)

**Secondary:**
- JavaScript - Worker edge runtime code

## Runtime

**Environment:**
- Node.js 18+ - Required for development and build process

**Package Manager:**
- npm - Manages dependencies and scripts
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Astro ^5.16.6 - Static site generator for documentation
- @astrojs/starlight ^0.37.1 - Documentation theme and component library for Astro

**Build/Dev:**
- Wrangler (implied by wrangler.json) - Cloudflare Workers deployment tooling

## Key Dependencies

**Critical:**
- astro-mermaid ^1.2.0 - Diagram rendering for documentation examples
- sharp ^0.34.5 - Image optimization and processing for static assets

**Infrastructure:**
- Cloudflare Workers environment - Edge runtime for the documentation site

## Configuration

**Environment:**
- PUBLIC_SITE_URL - Base URL for the site (defaults to `https://pakyas.com`)
- Site is served from `/docs` path on main domain

**Build:**
- `astro.config.mjs` - Astro configuration with Starlight and Mermaid integrations
- `wrangler.json` - Cloudflare Workers configuration
- `tsconfig.json` - TypeScript strict mode configuration

## Platform Requirements

**Development:**
- Node.js 18+ (specified in README)
- npm or compatible package manager
- Git (for development workflow)

**Production:**
- Cloudflare Workers platform - Edge deployment
- Static asset hosting via Cloudflare (ASSETS binding)
- Domain: `pakyas.com/docs`

---

*Stack analysis: 2026-01-24*
