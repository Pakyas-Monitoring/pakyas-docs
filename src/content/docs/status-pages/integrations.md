---
title: Status Page Integrations
description: RSS feeds, JSON API, and embeddable status badges for your status pages
---

Pakyas status pages provide several integration endpoints to embed status information in your tools, dashboards, and documentation.

## Endpoints Overview

| Endpoint | Content-Type | Description |
|----------|-------------|-------------|
| `/status/{slug}/rss.xml` | `application/rss+xml` | RSS 2.0 feed of incidents |
| `/status/{slug}/status.json` | `application/json` | Statuspage.io-compatible JSON API |
| `/status/{slug}/badge.svg` | `image/svg+xml` | Dynamic SVG status badge |

## Authentication

### Public Pages

No authentication required. Access endpoints directly:

```bash
curl https://pakyas.com/status/acme/status.json
```

### Private Pages (Pro+)

Private status pages require authentication via either:

**Query Parameter:**
```bash
curl "https://pakyas.com/status/acme/status.json?token=YOUR_ACCESS_TOKEN"
```

**Authorization Header (recommended):**
```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  https://pakyas.com/status/acme/status.json
```

The Authorization header is preferred for:
- Better security (tokens don't appear in server logs)
- Cleaner URLs in integrations
- Standard OAuth 2.0 compatibility

## RSS Feed

The RSS feed provides an RSS 2.0-compatible feed of recent incidents (last 90 days, up to 50 items).

### Endpoint

```
GET /status/{slug}/rss.xml
```

### Response Headers

| Header | Public | Private |
|--------|--------|---------|
| `Content-Type` | `application/rss+xml; charset=utf-8` | Same |
| `Cache-Control` | `public, max-age=120` | `no-store, private` |
| `X-Content-Type-Options` | `nosniff` | Same |
| `Vary` | `Authorization` | Same |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Acme Corp - Status Updates</title>
        <description>Status updates and incidents for Acme Corp</description>
        <link>https://pakyas.com/status/acme</link>
        <atom:link href="https://pakyas.com/status/acme/rss.xml" rel="self" type="application/rss+xml"/>
        <language>en-us</language>
        <lastBuildDate>Mon, 06 Jan 2026 12:00:00 +0000</lastBuildDate>
        <item>
            <title>[Major] Database connectivity issues</title>
            <link>https://pakyas.com/status/acme/incidents/abc123</link>
            <guid isPermaLink="true">https://pakyas.com/status/acme/incidents/abc123</guid>
            <pubDate>Mon, 06 Jan 2026 10:30:00 +0000</pubDate>
            <description>Resolved</description>
        </item>
    </channel>
</rss>
```

### Use Cases

- **Slack RSS integration** - Post incidents to a Slack channel automatically
- **RSS readers** - Personal monitoring via Feedly, Inoreader, etc.
- **IFTTT/Zapier** - Trigger automations when incidents are posted
- **Status aggregators** - Combine multiple status pages into one view

### Slack Integration Example

1. In Slack, go to **Apps** > **RSS**
2. Add the feed URL: `https://pakyas.com/status/acme/rss.xml`
3. Choose a channel for notifications
4. Incidents will be posted automatically

## JSON API

The JSON API provides a Statuspage.io-compatible response format, making it easy to integrate with existing tools that support the Statuspage.io API format.

### Endpoint

```
GET /status/{slug}/status.json
```

### Response Headers

| Header | Public | Private |
|--------|--------|---------|
| `Content-Type` | `application/json` | Same |
| `Cache-Control` | `public, max-age=60` | `no-store, private` |
| `X-Content-Type-Options` | `nosniff` | Same |
| `Vary` | `Authorization` | Same |

### Response Schema

```json
{
  "page": {
    "id": "acme",
    "name": "Acme Corp",
    "url": "https://pakyas.com/status/acme",
    "updated_at": "2026-01-06T12:00:00Z"
  },
  "status": {
    "indicator": "none",
    "description": "Operational"
  },
  "components": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "API",
      "status": "operational",
      "description": "Core API services"
    },
    {
      "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      "name": "Dashboard",
      "status": "degraded_performance",
      "description": "Web dashboard"
    }
  ],
  "incidents": [
    {
      "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      "name": "Elevated API latency",
      "status": "monitoring",
      "impact": "minor",
      "created_at": "2026-01-06T10:30:00Z",
      "resolved_at": null
    }
  ]
}
```

### Status Indicator Values

The `status.indicator` field maps to Statuspage.io's format:

| Indicator | Pakyas Status | Description |
|-----------|--------------|-------------|
| `none` | Operational | All systems operational |
| `minor` | Degraded | Minor performance issues |
| `major` | Partial Outage | Partial system outage |
| `critical` | Major Outage | Major system outage |

### Component Status Values

The `components[].status` field uses Statuspage.io-compatible values:

| Value | Pakyas Status |
|-------|--------------|
| `operational` | Operational |
| `degraded_performance` | Degraded |
| `partial_outage` | Partial Outage |
| `major_outage` | Major Outage |

### Use Cases

- **Custom status dashboards** - Build your own status UI
- **Monitoring integrations** - Feed status into Datadog, Grafana, etc.
- **ChatOps** - Query status from Slack/Discord bots
- **CI/CD gates** - Check status before deployments

### Example: Fetch Status with curl

```bash
curl -s https://pakyas.com/status/acme/status.json | jq '.status'
```

Output:
```json
{
  "indicator": "none",
  "description": "Operational"
}
```

### Example: Check Status in CI

```bash
#!/bin/bash
STATUS=$(curl -s https://pakyas.com/status/acme/status.json | jq -r '.status.indicator')

if [ "$STATUS" != "none" ]; then
  echo "Status page indicates issues: $STATUS"
  exit 1
fi

echo "All systems operational, proceeding with deployment"
```

## Status Badge

Dynamic SVG badges show your current status and can be embedded in README files, documentation, or any webpage.

### Endpoint

```
GET /status/{slug}/badge.svg
```

### Response Headers

| Header | Public | Private |
|--------|--------|---------|
| `Content-Type` | `image/svg+xml; charset=utf-8` | Same |
| `Cache-Control` | `public, max-age=30` | `no-store, private` |
| `X-Content-Type-Options` | `nosniff` | Same |
| `Vary` | `Authorization` | Same |

### Badge Colors

| Status | Color | Preview |
|--------|-------|---------|
| Operational | Green (`#22c55e`) | ![status: Operational](https://img.shields.io/badge/status-Operational-22c55e) |
| Degraded | Yellow (`#eab308`) | ![status: Degraded](https://img.shields.io/badge/status-Degraded-eab308) |
| Partial Outage | Orange (`#f97316`) | ![status: Partial%20Outage](https://img.shields.io/badge/status-Partial%20Outage-f97316) |
| Major Outage | Red (`#ef4444`) | ![status: Major%20Outage](https://img.shields.io/badge/status-Major%20Outage-ef4444) |

### Embedding in Markdown

```markdown
[![Status](https://pakyas.com/status/acme/badge.svg)](https://pakyas.com/status/acme)
```

This creates a clickable badge that links to your full status page.

### Embedding in HTML

```html
<a href="https://pakyas.com/status/acme">
  <img src="https://pakyas.com/status/acme/badge.svg" alt="System Status">
</a>
```

### Private Page Badges

For private pages, you'll need to use server-side rendering since browsers can't send Authorization headers for image requests:

```html
<!-- Won't work - browsers can't add auth headers to <img> -->
<img src="https://pakyas.com/status/private-page/badge.svg">

<!-- Works - token in URL (less secure, visible in logs) -->
<img src="https://pakyas.com/status/private-page/badge.svg?token=YOUR_TOKEN">
```

For better security with private badges, consider fetching the JSON API server-side and rendering your own badge.

### Use Cases

- **GitHub README** - Show status in your repository
- **Documentation sites** - Embed in docs footer or header
- **Internal dashboards** - Quick visual status indicator
- **Email signatures** - Dynamic status in team emails

## Caching Behavior

All endpoints include appropriate caching headers:

| Endpoint | Public TTL | Private TTL |
|----------|-----------|-------------|
| RSS | 2 minutes | No cache |
| JSON | 1 minute | No cache |
| Badge | 30 seconds | No cache |

Private pages always use `Cache-Control: no-store, private` and `Pragma: no-cache` to prevent any caching of authenticated content.

The `Vary: Authorization` header ensures proxies don't serve cached public responses to authenticated requests or vice versa.

## Security Considerations

### Token Security

- **Prefer Authorization header** over query parameters for programmatic access
- Query parameters may appear in:
  - Server logs
  - Browser history
  - Referrer headers
  - Analytics tools

### Content Security

All endpoints include:
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing attacks
- Proper `Content-Type` headers - Ensures correct parsing

### Private Page Access

- Invalid or missing tokens return **404 Not Found** (not 403 Forbidden)
- This prevents attackers from discovering which slugs have private pages

## Rate Limits

Status page feeds follow standard rate limits:

| Plan | Requests per minute |
|------|-------------------|
| Free | 60 |
| Developer | 120 |
| Pro | 300 |
| Business | 600 |

Consider caching responses on your end to stay within limits when embedding badges or polling JSON status.
