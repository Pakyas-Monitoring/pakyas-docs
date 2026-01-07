---
title: Limits
description: Plan limits and quotas
---

Pakyas offers different plans with varying limits.

## Plan Comparison

| Feature | Free | Pro | Business |
|---------|------|-----|----------|
| Checks | 10 | 100 | Unlimited |
| Team members | 1 | 10 | Unlimited |
| Ping retention | 7 days | 30 days | 90 days |
| Alert channels | Email only | All | All |
| API access | Limited | Full | Full |
| Status pages | 1 | 5 | Unlimited |

## Rate Limits

### Ping API

- **No rate limit** on ping endpoints
- Pings are always accepted to ensure monitoring reliability

### Management API

- **1000 requests/minute** per organization
- Rate limit headers included in responses

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1704196800
```

## Payload Limits

### Ping Body

- **Maximum size:** 10 KB per ping
- Truncated at 10 KB with `...(truncated)` suffix

### Error Output

- **Maximum size:** 10 KB stored per ping
- Only stderr is captured (not stdout)

## Webhook Limits

### Delivery

- **Timeout:** 10 seconds
- **Retries:** 3 attempts with exponential backoff
- **Payload size:** 64 KB maximum

## Retention

### Ping History

- **Free:** 7 days
- **Pro:** 30 days
- **Business:** 90 days

Pings older than retention period are automatically deleted.

### Alert History

- All plans: 90 days
- Alert decisions and outcomes stored for debugging

## Upgrading

To increase limits:

1. Go to **Settings > Billing**
2. Select a higher plan
3. Limits increase immediately

## Contacting Support

For custom limits or enterprise needs:

- Email: support@pakyas.com
- Include your organization ID and requirements
