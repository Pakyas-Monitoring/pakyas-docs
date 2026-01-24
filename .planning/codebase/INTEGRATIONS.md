# External Integrations

**Analysis Date:** 2026-01-24

## APIs & External Services

**Pakyas API (Primary Service):**
- Pakyas REST API - Documented and referenced throughout
  - Base URL: `https://api.pakyas.com`
  - Interactive Docs: `https://api.pakyas.com/docs`
  - Used for: Check management, monitor creation, status updates
  - Auth: API Key (`pk_live_...` or `pk_test_...` format)
  - Env var: `PAKYAS_API_KEY`

**Pakyas Ping Endpoint (Heartbeat):**
- Ping Service - Edge-distributed ping ingestion
  - Base URL: `https://ping.pakyas.com/ping/{public_id}`
  - Used for: Success pings, failure pings, start pings, runtime tracking
  - Methods: GET or POST
  - Public access: No authentication required (uses public_id only)

**Notification Integrations (Outbound):**
- Slack - Workspace integration for alert channels
  - Configured via UI (Settings > Notification Groups)
  - Used for: Alert notifications
  - Setup: Connect workspace, select channels

- Email - Direct email notifications
  - Recipients: Added in notification groups
  - Used for: Alert notifications

- Webhooks - Custom HTTP endpoints
  - Configured via: Settings > Notification Groups
  - Used for: Custom alert delivery and integrations
  - Payload format: JSON with event type, check details, alert metadata

## Data Storage

**Not Applicable** - This is a documentation site with no persistent storage. Documentation content is static markdown files.

**Static Asset Hosting:**
- Cloudflare Workers ASSETS binding - Serves static built site files

## File Storage

**Local filesystem only** - Source markdown files in `src/content/docs/`

## Caching

**Cloudflare Edge** - Implicit via Cloudflare Workers platform deployment

## Authentication & Identity

**Not Applicable** - Public-facing documentation site with no authentication.

**Documented Auth (for Pakyas service, not the docs):**
- API Key authentication - Format `pk_live_*` or `pk_test_*`
- Public ID authentication - For public_id-based ping access (no API key required)

## Monitoring & Observability

**Error Tracking:** None detected

**Logs:** None detected - Static site with Cloudflare Workers

## CI/CD & Deployment

**Hosting:**
- Cloudflare Workers - Global edge deployment
- Route pattern: `pakyas.com/docs*` on zone `pakyas.com`

**Build Pipeline:**
- Astro static build (`npm run build`) generates static files in `dist/`
- Cloudflare Workers serves from `dist/` directory via ASSETS binding

## Environment Configuration

**Build-time environment variables:**
- `PUBLIC_SITE_URL` - Optional, defaults to `https://pakyas.com`

**Wrangler Configuration (`wrangler.json`):**
- Compatibility date: 2026-01-08
- Main handler: `src/worker.js`
- Assets binding: Points to `./dist` directory

## Webhooks & Callbacks

**Incoming:** None - Static documentation site

**Outgoing:** None - Static documentation site

**Documented in Content:**
- Pakyas service supports outgoing webhooks for alerts
- Documentation includes webhook payload format with event types:
  - `check.down` - Check missed schedule
  - `check.up` - Check recovered
  - `check.failed` - Failed ping received
  - `check.running_long` - Exceeded max runtime
  - `check.recovered` - From running_long state

---

*Integration audit: 2026-01-24*
