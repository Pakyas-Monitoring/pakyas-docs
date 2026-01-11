---
title: Monitoring Maintenance Tasks
description: How to monitor cleanup and maintenance scripts with Pakyas
---

Maintenance tasks include log rotation, cache cleanup, temp file deletion, and other housekeeping scripts. When these fail silently, disk fills up, performance degrades, or systems eventually crash.

## Configuration

Set your API key as an environment variable. For cron jobs, add it to your crontab:

```bash
# Edit crontab
crontab -e

# Add at top of crontab
PAKYAS_API_KEY=pk_live_xxxxx

# Then your cleanup job
0 4 * * * pakyas monitor cleanup-task -- /scripts/cleanup.sh
```

Or source from a file:

```bash
0 4 * * * . ~/.pakyas_env && pakyas monitor cleanup-task -- /scripts/cleanup.sh
```

See [Environment Variables](./config/env-vars/) for all options.

## When to use this

- Maintenance runs on a schedule
- Skipped maintenance causes cascading problems
- Failures often go unnoticed until something breaks

## Basic example

```bash
pakyas monitor cleanup-task -- ./cleanup.sh
```

Pakyas wraps your maintenance script and alerts you immediately if it fails or doesn't run.

## Scheduler setup

```bash
# crontab example - runs every day at 4am
0 4 * * * pakyas monitor cleanup-task -- /scripts/cleanup.sh
```

## What Pakyas detects

- Cleanup script exits non-zero
- Script runs longer than expected
- Script never runs (missed schedule)
