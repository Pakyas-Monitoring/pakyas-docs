---
title: check inspect Command
description: Display detailed state and configuration of a check
---

The `check inspect` command displays comprehensive state and configuration information for a check. Use this command to debug check behavior, understand current state, and view detailed configuration.

:::note[inspect vs doctor]
These commands serve different purposes:
- **inspect** - Shows current state and configuration (what IS)
- **doctor** - Analyzes for issues and recommendations (what's WRONG)

Use `inspect` to understand a check's current state. Use `doctor` to diagnose problems.
:::

## Usage

```bash
pakyas check inspect <SLUG> [FLAGS]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `SLUG` | Check slug or ID (required) |

## Flags

| Flag | Description |
|------|-------------|
| `--format <FORMAT>` | Output format: human (default), json |

## Output Sections

The inspect command displays information organized into sections:

| Section | Information |
|---------|-------------|
| CHECK | ID, name, ping URL |
| STATE | Current status, since when, critical flag |
| SCHEDULE | Kind (cron/interval), expression/period, timezone, grace period |
| LAST SIGNAL | Type, timestamp, duration, source IP |
| ALERTING | Enabled, thresholds, consecutive counts, recipient count |
| MAINTENANCE | Active status, reason, end time |
| STATS (24h) | Success rate, ping count, P95 latency |

## Examples

### Basic Inspection

```bash
pakyas check inspect my-backup

# Output:
# CHECK
#   ID:       chk_abc123def456
#   Name:     my-backup
#   Ping URL: https://ping.pakyas.io/chk_abc123def456
#
# STATE
#   Status:   healthy
#   Since:    2024-01-20 15:30:00 UTC (2 hours ago)
#   Critical: no
#
# SCHEDULE
#   Kind:         cron
#   Expression:   0 2 * * *
#   Timezone:     America/New_York
#   Grace Period: 10m
#
# LAST SIGNAL
#   Type:      run_finished
#   At:        2024-01-20 15:29:58 UTC
#   Duration:  45s
#   Source IP: 192.168.1.100
#
# ALERTING
#   Enabled:     yes
#   Thresholds:  2 consecutive misses
#   Recipients:  3
#
# MAINTENANCE
#   Active: no
#
# STATS (24h)
#   Success Rate: 100%
#   Ping Count:   24
#   P95 Latency:  52ms
```

### JSON Output for Scripting

```bash
# Get check state as JSON for parsing
pakyas check inspect my-backup --format json

# Extract specific field with jq
pakyas check inspect my-backup --format json | jq '.state.status'
```

## See Also

- [check doctor Command](./check-doctor/) - Diagnose check health issues
- [check tail Command](./check-tail/) - View check event history
