---
title: Monitoring Scheduled Jobs
description: How to monitor cron jobs and systemd timers with Pakyas
---

Scheduled jobs include cron jobs, systemd timers, and any command that runs on a predictable schedule. These jobs often fail silently—the script errors out, but nothing alerts you until downstream systems break.

## Configuration

Set your API key as an environment variable. For cron jobs, add it to your crontab:

```bash
# Edit crontab
crontab -e

# Add at top of crontab
PAKYAS_API_KEY=pk_live_xxxxx

# Then your job
0 2 * * * pakyas monitor nightly-job -- /path/to/script.sh
```

Or source from a file:

```bash
0 2 * * * . ~/.pakyas_env && pakyas monitor nightly-job -- /path/to/script.sh
```

See [Environment Variables](./config/env-vars/) for all options.

## When to use this

- Jobs run on a schedule (hourly, daily, weekly)
- Missing a run is a failure
- Silent failures are possible (script exits non-zero but no one notices)

## Basic example

```bash
pakyas monitor nightly-job -- ./script.sh
```

Pakyas wraps your command, sends a start signal, captures output, and reports success or failure automatically.

## Scheduler setup

```bash
# crontab example - runs every night at 2am
0 2 * * * pakyas monitor nightly-job -- /path/to/script.sh
```

## What Pakyas detects

- Job exits non-zero
- Job runs longer than expected
- Job never reports back (missed schedule)
