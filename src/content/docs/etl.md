---
title: Monitoring ETL Pipelines
description: How to monitor long-running data pipelines with Pakyas
---

ETL (Extract, Transform, Load) pipelines move data between systems on a schedule. These jobs often run for hours and can fail at any stage—connection timeouts, data validation errors, or disk space issues.

## Configuration

Set your API key as an environment variable. For cron jobs, add it to your crontab:

```bash
# Edit crontab
crontab -e

# Add at top of crontab
PAKYAS_API_KEY=pk_live_xxxxx

# Then your ETL job
0 0 * * * pakyas monitor etl-pipeline -- python /jobs/data_pipeline.py
```

Or source from a file:

```bash
0 0 * * * . ~/.pakyas_env && pakyas monitor etl-pipeline -- python /jobs/data_pipeline.py
```

See [Environment Variables](./config/env-vars/) for all options.

## When to use this

- Pipelines run on a schedule
- Jobs are long-running (minutes to hours)
- Silent failures cause stale or missing data

## Basic example

```bash
pakyas monitor etl-pipeline -- python pipeline.py
```

Pakyas wraps your pipeline, tracks duration, and alerts you if it fails or runs longer than expected.

## Scheduler setup

```bash
# crontab example - runs every night at midnight
0 0 * * * pakyas monitor etl-pipeline -- python /jobs/data_pipeline.py
```

## What Pakyas detects

- Pipeline exits non-zero
- Pipeline runs longer than expected
- Pipeline never starts (missed schedule)
