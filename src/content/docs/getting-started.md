---
title: Getting Started
description: Start monitoring your cron jobs in under 5 minutes
---

Get your first cron job monitored in under 5 minutes.

## Quick Start with curl

The simplest way to monitor a job is with a single curl command. No installation required.

### 1. Create a Check

Log in to [Pakyas](https://pakyas.com) and create a new check. You'll get a unique ping URL like:

```
https://ping.pakyas.com/{public_id}
```

### 2. Ping from Your Cron Job

Add a curl command to your cron job:

```bash
# Simple success ping
0 * * * * /path/to/backup.sh && curl -fsS https://ping.pakyas.com/{public_id}
```

Or use start/success/fail signals:

```bash
#!/bin/bash
curl -fsS https://ping.pakyas.com/{public_id}/start

if /path/to/backup.sh; then
  curl -fsS https://ping.pakyas.com/{public_id}
else
  curl -fsS https://ping.pakyas.com/{public_id}/fail
fi
```

## Install the CLI

The pakyas CLI provides better ergonomics and features like automatic exit code capture.

### macOS

```bash
curl -fsSL https://pakyas.com/install.sh | bash
```

### Linux

```bash
curl -fsSL https://pakyas.com/install.sh | bash
```

### Verify Installation

```bash
pakyas --version
```

## Authenticate

```bash
pakyas login
```

This opens your browser for authentication. Once logged in, the CLI stores credentials securely.

## Create Your First Check

```bash
# Switch to your project
pakyas project switch "My Project"

# Create a check with cron schedule
pakyas check create backup-nightly --cron "0 2 * * *" --tz Asia/Manila

# Or with interval
pakyas check create api-heartbeat --every 5m

# Interactive mode (prompts for all options)
pakyas check create my-check -i
```

The CLI automatically derives a sensible grace period (10% of interval, clamped to 5min-1hour) if not specified.

## Wrap a Cron Job

The easiest way to monitor a job is with `pakyas monitor`:

```bash
# In your crontab
0 2 * * * pakyas monitor backup-nightly -- /path/to/backup.sh
```

This automatically:
- Sends a `/start` ping when the job begins
- Captures stdout/stderr
- Sends success or failure ping with exit code
- Includes error output in failure notifications

## What Happens When Things Go Wrong?

1. **Job misses schedule** - If no ping arrives within period + grace, you get a "missed" alert
2. **Job fails** - If a `/fail` ping or non-zero exit code is sent, you get a "failed" alert
3. **Job runs too long** - If max_runtime is set and exceeded, you get a "running long" alert

## Next Steps

- [CLI Reference](/cli/) - Full command reference
- [API Reference](/api/) - Direct HTTP integration
- [External Monitors](/cli/external-monitors/) - Migrate from healthchecks.io or Cronitor
