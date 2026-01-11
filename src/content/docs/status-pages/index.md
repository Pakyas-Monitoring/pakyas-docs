---
title: Status Pages
description: Public status pages to keep your users informed about system health
---

Status pages let you communicate system health to your users with a beautiful, customizable public page. When incidents occur, your users can check the status page instead of flooding your support channels.

## Features

- **Component-based status** - Show the health of individual services and components
- **Incident management** - Create, update, and resolve incidents with a timeline
- **Email subscriptions** - Let users subscribe to incident notifications (Pro+)
- **Private pages** - Token-protected status pages for internal teams (Pro+)
- **Custom branding** - Logo, colors, custom domains, and CSS (varies by plan)
- **External integrations** - RSS feeds, JSON API, and embeddable badges

## Plan Features

| Feature | Free | Developer | Pro | Business |
|---------|------|-----------|-----|----------|
| Public status pages | - | - | Yes | Yes |
| Components & incidents | - | - | Yes | Yes |
| Auto-computed status | - | Yes | Yes | Yes |
| Private pages | - | - | Yes | Yes |
| Email subscriptions | - | - | Yes | Yes |
| Basic branding (logo, colors) | - | - | Yes | Yes |
| Theming (light/dark/system) | - | - | Yes | Yes |
| Typography controls | - | - | Yes | Yes |
| Display toggles | - | - | Yes | Yes |
| Custom CSS | - | - | - | Yes |
| Custom domains | - | - | - | Yes |

## Creating a Status Page

1. Navigate to **Status Pages** in the sidebar
2. Click **New Status Page**
3. Configure your page settings:
   - **Name** - Display name for your status page
   - **Slug** - URL-friendly identifier (e.g., `acme` for `/status/acme`)
   - **Description** - Optional description shown on the page
4. Add components representing your services
5. Publish when ready

## Components

Components represent the individual services or systems you want to show on your status page. Each component can have one of four statuses:

| Status | Description |
|--------|-------------|
| **Operational** | Everything is working normally |
| **Degraded** | Performance issues or reduced functionality |
| **Partial Outage** | Some users or features are affected |
| **Major Outage** | Service is completely unavailable |

### Auto-computed Status (Developer+)

Link components to health checks to automatically compute their status based on check health. When a linked check fails, the component status updates automatically.

## Incidents

When something goes wrong, create an incident to communicate with your users:

1. Click **New Incident** on your status page
2. Set the incident details:
   - **Title** - Brief description of the issue
   - **Impact** - None, Minor, Major, or Critical
   - **Status** - Investigating, Identified, Monitoring, or Resolved
3. Select affected components
4. Add updates as you investigate and resolve

Each incident update appears on the public timeline, keeping users informed of your progress.

## Visibility Options

### Public (default)

Anyone can view the status page at `https://pakyas.com/status/{slug}`.

### Private (Pro+)

Requires a token to access. Generate an access token in status page settings, then share URLs like:

```
https://pakyas.com/status/{slug}?token={access_token}
```

Or use the `Authorization` header for programmatic access:

```bash
curl -H "Authorization: Bearer {access_token}" https://pakyas.com/status/{slug}/status.json
```

## Email Subscriptions (Pro+)

Let users subscribe to receive email notifications when incidents are created, updated, or resolved.

### How It Works

1. Users enter their email on your status page
2. They receive a verification email (valid 24 hours)
3. After verifying, they receive notifications for:
   - New incidents
   - Incident updates
   - Incident resolutions

### Unsubscribing

Each notification email includes a one-click unsubscribe link. Users can also unsubscribe from the verification confirmation page.

### Managing Subscribers

Subscriber management is handled automatically. You cannot view or export subscriber emails for privacy reasons.

## Branding & Theming (Pro+)

Customize your status page appearance in **Settings > Branding**.

### Brand Identity

- **Logo** - Displayed in header
- **Brand Name** - Override the status page name in header
- **Favicon** - Custom browser tab icon
- **Footer Text** - Custom message in page footer
- **Support URL** - Link to your support portal
- **Website URL** - Link from logo to your main site

### Theme Mode

Choose how your status page adapts to user preferences:

- **System** (default) - Matches user's OS dark/light preference
- **Light** - Always light theme
- **Dark** - Always dark theme

### Color Tokens

Customize colors for each theme mode:

| Token | Purpose |
|-------|---------|
| Background | Page background |
| Surface | Card/panel background |
| Text | Primary text |
| Muted | Secondary text |
| Link | Link color |
| Border | Border color |
| Success | Operational status color |
| Warning | Degraded status color |
| Error | Outage status color |

### Typography

- **Font Family** - System, Inter, or Monospace
- **Font Size** - Small, Medium, or Large

### Display Options

- **Show "Powered by Pakyas"** - Toggle footer badge
- **Show Subscribe button** - Toggle subscription CTA
- **Show Uptime Charts** - Toggle component uptime graphs
- **Compact Mode** - Reduced spacing for denser layout

## Custom CSS (Business)

Business plans can add custom CSS for advanced styling.

### Usage

1. Navigate to **Branding** tab
2. Scroll to **Custom CSS** section
3. Add your CSS (max 20KB)

### Scoping

CSS should target the `.pakyas-status-page` wrapper:

```css
.pakyas-status-page .glass-panel {
  border-radius: 16px;
}

.pakyas-status-page h1 {
  font-weight: 800;
}
```

### Version History

Your last 3 CSS versions are saved. Click **Rollback** to restore a previous version.

### Emergency Disable

If custom CSS breaks your page, use the **Disable Custom CSS** toggle to immediately disable it without deleting your code.

### Restrictions

- `@import` is blocked (no external stylesheets)
- External `url()` references may not work

## External Integrations

Status pages expose multiple endpoints for external tool integration:

- [**RSS Feed**](./integrations/#rss-feed) - Subscribe to incidents in any RSS reader
- [**JSON API**](./integrations/#json-api) - Statuspage.io-compatible JSON endpoint
- [**Status Badge**](./integrations/#status-badge) - Embeddable SVG badge for your README

See the [Integrations](./integrations/) page for detailed documentation.

## Next Steps

- [Integrations](./integrations/) - RSS, JSON API, and status badges
- [Alerts](../alerts/) - Configure how you receive notifications
