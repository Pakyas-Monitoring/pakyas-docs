---
title: Pakyas Documentation
description: Cron job monitoring that tells you the truth
---

Pakyas is a cron job monitoring service that helps you know when your scheduled tasks fail, miss their schedule, or run too long.

## Why Pakyas?

**Traditional monitoring lies.** Most cron monitors only know if a job *ran* - they don't know if it *succeeded*. Pakyas tracks:

- **Start/Success/Fail** - Know exactly what happened, not just "something ran"
- **Exit codes** - Capture the actual exit code, not just "non-zero"
- **Runtime** - Alert when jobs take too long
- **Error output** - See stderr when failures happen

## Core Concepts

### Checks
A **check** represents a scheduled job you want to monitor. Each check has:
- A unique slug (e.g., `backup-db`, `payment-sync`)
- An expected period (how often it should run)
- A grace period (how long to wait before alerting)

### Pings
Your jobs send **pings** to Pakyas to report their status:
- `/start` - Job has started
- `/` (success) - Job completed successfully
- `/fail` or `/1`, `/2`, etc. - Job failed (optionally with exit code)

### Alerts
When something goes wrong, Pakyas sends **alerts** via:
- Email
- Slack
- Webhooks
- And more

## Next Steps

- [Getting Started](/getting-started/) - Set up your first check in 5 minutes
- [CLI Reference](/cli/) - Install and use the pakyas CLI
- [API Reference](/api/) - Direct HTTP API integration
