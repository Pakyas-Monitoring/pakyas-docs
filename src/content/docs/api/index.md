---
title: API Overview
description: HTTP API for integrating with Pakyas
---

Pakyas provides a RESTful HTTP API for all operations.

:::tip[Interactive API Documentation]
Explore the API interactively with Swagger UI at **[api.pakyas.com/docs](https://api.pakyas.com/docs)**

You can also download the OpenAPI spec at [api.pakyas.com/openapi.json](https://api.pakyas.com/openapi.json)
:::

## Base URLs

| Environment | URL |
|-------------|-----|
| Production | `https://api.pakyas.com/api/v1` |
| Ping Endpoint | `https://ping.pakyas.com` |

## Authentication

### API Keys

Generate an API key from your organization settings. Include it in requests:

```bash
curl -H "Authorization: Bearer pk_live_xxx" \
  https://api.pakyas.com/api/v1/checks
```

### JWT Tokens

For browser/CLI authentication, use JWT tokens obtained via login.

## Endpoints

### Ping API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/ping/{public_id}` | Success ping |
| GET/POST | `/ping/{public_id}/start` | Start ping |
| GET/POST | `/ping/{public_id}/fail` | Fail ping |
| GET/POST | `/ping/{public_id}/{exit_code}` | Ping with exit code |

### Management API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/checks` | List checks |
| POST | `/checks` | Create check |
| GET | `/checks/{id}` | Get check |
| PUT | `/checks/{id}` | Update check |
| DELETE | `/checks/{id}` | Delete check |

See individual endpoint pages for details.

## Rate Limits

- Ping API: Unlimited
- Management API: 1000 requests/minute per organization

## Error Handling

Errors return JSON with `error` field:

```json
{
  "error": "Check not found"
}
```

## Next Steps

- [Ping Endpoint](./ping/) - Sending pings via HTTP
- [Check Endpoints](./checks/) - Managing checks via API
