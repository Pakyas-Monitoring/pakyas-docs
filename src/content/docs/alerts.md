---
title: Alerts
description: How Pakyas alert system works
---

Pakyas uses a smart alert system designed to minimize noise while ensuring you never miss critical failures.

## Alert Types

### Down Alert

Triggered when a check misses its expected schedule.

**Timing:** `period + grace` after last ping

Example: If a check has a 1-hour period and 10-minute grace, you'll be alerted 70 minutes after the last successful ping.

### Failed Alert

Triggered when a check receives a fail ping or non-zero exit code.

**Immediate:** Sent as soon as fail ping is received.

### Running Long Alert

Triggered when a job exceeds its maximum runtime.

**Timing:** When `max_runtime` is configured and exceeded.

## Alert Channels

Configure how you receive alerts:

| Channel | Setup |
|---------|-------|
| Email | Add email addresses to notification groups |
| Slack | Connect Slack workspace, select channels |
| Webhook | Add custom webhook URLs |

## Notification Groups

Notification groups let you organize alert recipients by team or severity:

1. Go to **Settings > Notification Groups**
2. Create groups like "On-Call Team", "Database Admins"
3. Add email addresses, Slack channels, webhooks
4. Assign groups to checks or projects

### Inheritance

- **Organization defaults** - Applied to all new projects
- **Project overrides** - Override org defaults per project
- **Check overrides** - Override project settings per check

## Alert Conditions

Fine-tune when alerts fire:

### Consecutive Failures

Only alert after N consecutive failures:

```
alert_after_failures: 3
```

Useful for flaky jobs that occasionally fail but self-recover.

### Late Threshold

Alert when job is late but hasn't missed entirely:

```
late_after_ratio: 0.5  # Alert at 50% of period
```

Example: If period is 1 hour and ratio is 0.5, alert after 30 minutes.

### Missed Before Alert

Require N missed pings before alerting:

```
missed_before_alert: 2
```

Useful for jobs that may legitimately skip occasionally.

## Recovery Alerts

When a check recovers (receives success ping after being down), a recovery alert is sent automatically.

## Silencing Alerts

### Maintenance Windows

Schedule maintenance windows to silence alerts:

- **One-time windows** - Specific date/time range
- **Recurring windows** - Weekly/monthly patterns

### Pausing Checks

Pause a check to stop all monitoring:

```bash
pakyas check pause my-check
```

Paused checks don't generate alerts and show as "paused" status.

## Best Practices

1. **Start with longer grace periods** - Reduce as you understand job timing
2. **Use notification groups** - Don't alert everyone for everything
3. **Set consecutive failure thresholds** - Reduce noise from flaky jobs
4. **Schedule maintenance windows** - Don't get paged during deploys
