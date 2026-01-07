---
title: Check Endpoints
description: Managing checks via API
---

CRUD operations for managing checks.

## Authentication

All endpoints require authentication via API key or JWT token:

```bash
curl -H "Authorization: Bearer pk_live_xxx" \
  https://api.pakyas.com/api/v1/checks
```

## List Checks

```http
GET /api/v1/checks?project_id={project_id}
```

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `project_id` | Yes | Project UUID |

**Response:**

```json
{
  "checks": [
    {
      "id": "uuid",
      "name": "Nightly Backup",
      "slug": "backup-nightly",
      "status": "up",
      "period_seconds": 86400,
      "grace_seconds": 3600,
      "last_ping_at": "2025-01-02T10:00:00Z"
    }
  ]
}
```

## Create Check

```http
POST /api/v1/checks
```

**Request Body:**

```json
{
  "project_id": "uuid",
  "name": "Nightly Backup",
  "slug": "backup-nightly",
  "period_seconds": 86400,
  "grace_seconds": 3600,
  "description": "Database backup job"
}
```

**Response:** `201 Created`

```json
{
  "id": "uuid",
  "public_id": "uuid-for-pings",
  "name": "Nightly Backup",
  "slug": "backup-nightly"
}
```

## Get Check

```http
GET /api/v1/checks/{id}
```

**Response:**

```json
{
  "id": "uuid",
  "public_id": "uuid",
  "name": "Nightly Backup",
  "slug": "backup-nightly",
  "status": "up",
  "period_seconds": 86400,
  "grace_seconds": 3600,
  "last_ping_at": "2025-01-02T10:00:00Z",
  "last_start_at": "2025-01-02T09:55:00Z",
  "created_at": "2025-01-01T00:00:00Z"
}
```

## Update Check

```http
PUT /api/v1/checks/{id}
```

**Request Body:**

```json
{
  "name": "Updated Name",
  "period_seconds": 43200,
  "grace_seconds": 1800
}
```

## Delete Check

```http
DELETE /api/v1/checks/{id}
```

**Response:** `204 No Content`

## Pause/Resume Check

```http
PATCH /api/v1/checks/{id}/pause
PATCH /api/v1/checks/{id}/resume
```

Paused checks don't generate alerts for missed pings.

## Get Ping History

```http
GET /api/v1/checks/{id}/pings?limit=50
```

**Response:**

```json
{
  "pings": [
    {
      "id": "uuid",
      "type": "success",
      "exit_code": 0,
      "created_at": "2025-01-02T10:00:00Z",
      "duration_ms": 12345
    }
  ]
}
```
