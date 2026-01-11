---
title: Monitoring Scheduled Reports
description: How to monitor report generation scripts with Pakyas
---

Scheduled reports include daily sales reports, weekly analytics summaries, and any automated report generation. When these fail, stakeholders don't get critical business data on time.

## Configuration

Set your API key as an environment variable. For cron jobs, add it to your crontab:

```bash
# Edit crontab
crontab -e

# Add at top of crontab
PAKYAS_API_KEY=pk_live_xxxxx

# Then your report job
0 6 * * 1 pakyas monitor weekly-report -- ruby /scripts/weekly_report.rb
```

Or source from a file:

```bash
0 6 * * 1 . ~/.pakyas_env && pakyas monitor weekly-report -- ruby /scripts/weekly_report.rb
```

See [Environment Variables](./config/env-vars/) for all options.

## When to use this

- Reports run on a schedule
- Missing a report affects business operations
- Report generation can fail silently

## Basic example

```bash
pakyas monitor weekly-report -- ruby report.rb
```

Pakyas wraps your report script, monitors execution, and alerts you if the report fails to generate.

## Scheduler setup

```bash
# crontab example - runs every Monday at 6am
0 6 * * 1 pakyas monitor weekly-report -- ruby /scripts/weekly_report.rb
```

## What Pakyas detects

- Report script exits non-zero
- Report takes longer than expected
- Report never runs (missed schedule)
