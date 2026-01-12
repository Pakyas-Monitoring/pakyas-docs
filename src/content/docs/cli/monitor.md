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

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PAKYAS_PUBLIC_ID` | Check UUID for `--public_id` flag (no auth required) |

## Exit Codes

The command exits with:
- The wrapped command's exit code (if Pakyas ping succeeded)
- Exit code 3 if Pakyas ping failed (monitoring infrastructure failure)

## See Also

- [External Monitors](./external-monitors/) - Migration from other services
- [ping Command](./ping/) - Manual ping sending
