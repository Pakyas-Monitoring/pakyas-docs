---
title: check tail Command
description: Stream real-time events from a check
---

The `check tail` command displays recent events for a check and optionally follows new events in real-time. Use it to monitor check activity, debug timing issues, or stream events to other tools for processing.

## Usage

```bash
pakyas check tail <SLUG> [FLAGS]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `SLUG` | Check slug or ID (required) |

## Flags

| Flag | Description |
|------|-------------|
| `--since <TIME>` | Show events since time (default: `30m`). Accepts durations or ISO timestamps |
| `--types <TYPES>` | Filter by event types (comma-separated): `signal`, `state`, `alert` |
| `-f, --follow` | Follow mode - continuously poll for new events |
| `--limit <N>` | Events per request (default: 50) |
| `--format <FORMAT>` | Output format: `human` (default), `json`, `ndjson` |

## Event Types

| Type | Events | Description |
|------|--------|-------------|
| `signal` | `run_started`, `run_finished` | Ping events from your jobs |
| `state` | `status_changed` | Check status transitions (healthy, late, down) |
| `alert` | `alert_decision` | Alert notifications sent to channels |

## Duration Format

The `--since` flag accepts two formats:

**Duration strings:**
- `30m` - 30 minutes
- `1h` - 1 hour
- `2d` - 2 days
- `1w` - 1 week

**ISO timestamps:**
- `2024-01-01T00:00:00Z` - Specific UTC time
- `2024-01-15T10:30:00-05:00` - With timezone offset

## Examples

### Default: Last 30 Minutes

```bash
pakyas check tail my-backup-job
```

### Custom Time Range with Duration

View events from the last hour:

```bash
pakyas check tail my-backup-job --since 1h
```

View events from the last 2 days:

```bash
pakyas check tail my-backup-job --since 2d
```

### Custom Time Range with Timestamp

View events since a specific time:

```bash
pakyas check tail my-backup-job --since 2024-01-15T00:00:00Z
```

### Follow Mode

Monitor events in real-time (similar to `tail -f`):

```bash
pakyas check tail my-backup-job --follow
```

### Filter by Event Type

Show only ping signals:

```bash
pakyas check tail my-backup-job --types signal
```

Show state changes and alerts:

```bash
pakyas check tail my-backup-job --types state,alert
```

### Combined Options

Follow new signals from the last hour:

```bash
pakyas check tail my-backup-job --since 1h --types signal --follow
```

### JSON Output

Get all events as a JSON array:

```bash
pakyas check tail my-backup-job --format json
```

### NDJSON for Streaming Pipelines

:::tip[Pipeline Integration]
Use `--format ndjson` with `--follow` to stream events to other tools. Each event is output as a separate JSON line, making it easy to pipe to `jq`, log aggregators, or custom processors.
:::

```bash
# Stream events to jq for filtering
pakyas check tail my-backup-job --follow --format ndjson | jq 'select(.type == "alert_decision")'

# Log to a file
pakyas check tail my-backup-job --follow --format ndjson >> /var/log/pakyas-events.log

# Send to a webhook
pakyas check tail my-backup-job --follow --format ndjson | while read event; do
  curl -X POST -d "$event" https://webhook.example.com/events
done
```

## See Also

- [check inspect Command](./check-inspect/) - View check configuration and current state
- [check doctor Command](./check-doctor/) - Diagnose check configuration and health issues
