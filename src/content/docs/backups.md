---
title: Monitoring Database Backups
description: How to monitor pg_dump, mysqldump, and backup scripts with Pakyas
---

Database backups are scheduled jobs that run pg_dump, mysqldump, or custom backup scripts. A failed backup often goes unnoticed until you need to restore—by then it's too late.

## Configuration

Set your API key as an environment variable. For cron jobs, add it to your crontab:

```bash
# Edit crontab
crontab -e

# Add at top of crontab
PAKYAS_API_KEY=pk_live_xxxxx

# Then your backup job
0 3 * * * pakyas monitor pg-backup -- pg_dump mydb > /backups/mydb.sql
```

Or source from a file:

```bash
0 3 * * * . ~/.pakyas_env && pakyas monitor pg-backup -- pg_dump mydb > /backups/mydb.sql
```

See [Environment Variables](./config/env-vars/) for all options.

## When to use this

- Backups run on a schedule
- Missing a backup is a serious failure
- You need to know immediately when a backup fails

## Basic example

```bash
pakyas monitor pg-backup -- pg_dump mydb > backup.sql
```

Pakyas wraps your backup command, reports start time, and alerts you if the backup fails or doesn't run.

## Scheduler setup

```bash
# crontab example - runs every night at 3am
0 3 * * * pakyas monitor pg-backup -- pg_dump mydb > /backups/mydb-$(date +\%Y\%m\%d).sql
```

## What Pakyas detects

- Backup script exits non-zero
- Backup runs longer than expected
- Backup never runs (missed schedule)
