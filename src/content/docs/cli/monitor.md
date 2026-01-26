---
title: monitor Command
description: Wrap commands with automatic ping handling
---

The `monitor` command wraps a command with automatic start/success/fail pings.

## Usage

```bash
# Using slug (requires authentication)
pakyas monitor <slug> -- <command> [args...]

# Using check ID (no authentication required)
pakyas monitor --public_id <uuid> -- <command> [args...]
```

## Examples

```bash
# Basic usage with slug
pakyas monitor backup-db -- ./backup.sh

# Using check ID (no API key required)
pakyas monitor --public_id "$PAKYAS_PUBLIC_ID" -- ./backup.sh

# With arguments
pakyas monitor db-sync -- pg_dump -h localhost mydb > backup.sql

# With environment variables
pakyas monitor report-gen -- env VAR=value ./generate-report.sh
```

## What It Does

1. Sends `/start` ping to Pakyas
2. Runs the command
3. Captures exit code and stderr
4. Sends success (`/`) or failure (`/<exit_code>`) ping
5. Includes truncated stderr in failure payload (max 10KB)

## Flags

| Flag | Description |
|------|-------------|
| `--public_id <uuid>` | Check public ID - skips authentication and slug resolution |
| `--no-external` | Disable external monitors |
| `--migration-mode` | Allow external success to override Pakyas failure |
| `--external-timeout-ms` | Timeout for external monitor requests (default: 5000) |

### Inline External Monitor Flags

These flags let you specify external monitors directly on the command line without a config file:

| Flag | Description |
|------|-------------|
| `--healthchecks-id <uuid>` | healthchecks.io check UUID |
| `--healthchecks-endpoint <url>` | Custom healthchecks.io endpoint (default: https://hc-ping.com) |
| `--cronitor-key <key>` | Cronitor monitor key |
| `--cronitor-api-key <key>` | Cronitor API key (required with `--cronitor-key`) |
| `--cronitor-endpoint <url>` | Custom Cronitor endpoint (default: https://cronitor.link) |
| `--webhook-url <url>` | Webhook URL (can be specified multiple times) |

```bash
# With healthchecks.io
pakyas monitor backup-db --healthchecks-id abc123 -- ./backup.sh

# With Cronitor
pakyas monitor backup-db --cronitor-key my-monitor --cronitor-api-key xxx -- ./backup.sh

# With webhook
pakyas monitor backup-db --webhook-url https://my-server.com/hook -- ./backup.sh

# Multiple external monitors
pakyas monitor backup-db \
    --healthchecks-id abc123 \
    --webhook-url https://hook1.example.com \
    --webhook-url https://hook2.example.com \
    -- ./backup.sh
```

CLI monitors are merged additively with config file monitors, so you can define common monitors in your config and add one-off monitors via CLI.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PAKYAS_PUBLIC_ID` | Check UUID for `--public_id` flag (no auth required) |
| `PAKYAS_HEALTHCHECKS_ID` | healthchecks.io check UUID |
| `HEALTHCHECKS_ENDPOINT` | Custom healthchecks.io endpoint |
| `PAKYAS_CRONITOR_KEY` | Cronitor monitor key |
| `CRONITOR_API_KEY` | Cronitor API key |
| `PAKYAS_WEBHOOK_URL` | Webhook URL |

## Exit Codes

The command exits with:
- The wrapped command's exit code (if Pakyas ping succeeded)
- Exit code 3 if Pakyas ping failed (monitoring infrastructure failure)

## See Also

- [External Monitors](./external-monitors/) - Migration from other services
- [ping Command](./ping/) - Manual ping sending
