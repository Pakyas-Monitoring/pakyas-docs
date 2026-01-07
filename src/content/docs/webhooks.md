---
title: Webhooks
description: Receive alerts via webhook
---

Configure webhooks to receive alert notifications via HTTP POST.

## Setup

1. Go to **Settings > Notification Groups** in your organization
2. Create or edit a notification group
3. Add a webhook endpoint URL

## Payload Format

Pakyas sends a JSON payload for each alert:

```json
{
  "event": "check.down",
  "check": {
    "id": "uuid",
    "name": "Nightly Backup",
    "slug": "backup-nightly",
    "status": "down"
  },
  "project": {
    "id": "uuid",
    "name": "Production"
  },
  "organization": {
    "id": "uuid",
    "name": "My Company"
  },
  "alert": {
    "type": "down",
    "message": "Check 'Nightly Backup' is down",
    "triggered_at": "2025-01-02T10:00:00Z"
  },
  "timestamp": "2025-01-02T10:00:00Z"
}
```

## Event Types

| Event | Description |
|-------|-------------|
| `check.down` | Check missed its schedule |
| `check.up` | Check recovered after being down |
| `check.failed` | Check received a fail ping |
| `check.running_long` | Check exceeded max runtime |

## Signature Verification

Pakyas signs webhook requests with HMAC-SHA256. Verify the signature to ensure authenticity:

```
X-Pakyas-Signature: sha256=abc123...
```

### Verification Example (Node.js)

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}
```

## Retry Policy

Failed webhook deliveries are retried:

- 3 retry attempts
- Exponential backoff: 1 min, 5 min, 15 min
- After 3 failures, webhook is marked as failing

## Response Requirements

Your endpoint should:
- Return HTTP 2xx within 10 seconds
- Return 4xx to indicate permanent failure (no retry)
- Return 5xx to indicate temporary failure (will retry)

## Testing Webhooks

Use the "Send Test" button in notification group settings to send a test payload.
