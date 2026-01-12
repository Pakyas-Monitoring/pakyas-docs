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

## How schedules are evaluated

Pakyas supports two schedule types, each with different behavior for computing when the next ping is expected.

| Schedule Type | Next Expected Based On | Best For |
|--------------|------------------------|----------|
| **Interval** | Last success/fail + period | Heartbeat monitoring |
| **Cron** | Next cron tick (wall-clock) | Fixed-time jobs |

### Interval schedules

Timer resets after each ping. If you set a 5-minute interval and your job finishes at 12:07, the next expected ping is 12:12.

**Behavior:**
- Next expected = last completion time + interval
- Long-running jobs "shift" the schedule forward
- Best for heartbeat-style monitoring where you care about time between check-ins

**Example:** A health check that should run every 5 minutes. If it takes 2 minutes to run, the next check starts 5 minutes after the previous one finished.

### Cron schedules

Expected at fixed wall-clock times. If your cron is `*/5 * * * *` (every 5 minutes), Pakyas expects pings at :00, :05, :10, etc.—regardless of how long the previous job ran.

**Behavior:**
- Next expected = next scheduled time from cron expression
- Long-running jobs become "Overrunning" instead of shifting the schedule
- Best for jobs that must run at specific times (backups at midnight, reports at 9am)

**Example:** A backup job scheduled at `0 2 * * *` (2am daily). If it takes 3 hours, the next expected is still 2am tomorrow—not 5am.

### Overrunning detection

For cron schedules, if a job is still running when the next scheduled time passes, Pakyas marks it as **Overrunning**. This is different from "Late" (which means no job started):

- **Late/Missing**: Expected time passed and no ping was received (job didn't start)
- **Overrunning**: Job started but is still running past the next scheduled time
