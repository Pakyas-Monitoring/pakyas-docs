---
title: CLI Installation
description: Install and configure the pakyas command-line tool
---

The pakyas CLI is the recommended way to integrate with Pakyas. It provides:

- Automatic exit code capture
- Start/success/fail ping handling
- Error output capture
- Local check caching for fast slug resolution

## Installation

### macOS & Linux

```bash
curl -fsSL https://pakyas.com/install.sh | bash
```

### Manual Installation

Download the binary for your platform from the [releases page](https://github.com/pakyas-monitoring/pakyas-cli/releases) and add it to your PATH.

### Verify Installation

```bash
pakyas --version
```

## Updating

To update the CLI to the latest version:

```bash
pakyas update
```

To check if an update is available without installing:

```bash
pakyas update --check
```

:::tip[Automatic Update Checks]
The CLI automatically checks for updates in the background when you run commands (except `ping`, `monitor`, and `completion`). If an update is available, you'll see a notice after the command completes.
:::

## Authentication

### Browser Authentication (Recommended)

```bash
pakyas login
```

This opens your browser for secure OAuth authentication.

### API Key Authentication

```bash
pakyas login --api-key pk_live_xxx
```

For CI/CD or headless environments, use an API key.

## Configuration

The CLI stores configuration in `~/.config/pakyas/`:

- `config.toml` - Active organization and project
- `credentials.toml` - Authentication tokens
- `cache.toml` - Local check cache

### Environment Variables

| Variable | Description |
|----------|-------------|
| `PAKYAS_ORG` | Override active organization |
| `PAKYAS_PROJECT` | Override active project |
| `PAKYAS_API_KEY` | API key for authentication |

## Commands

### Organization Management

```bash
# List organizations
pakyas org list

# Switch active organization
pakyas org switch "My Org"
```

### Project Management

```bash
# List projects
pakyas project list

# Switch active project
pakyas project switch "Production"

# Create new project
pakyas project create --name "Production" --description "Production checks"
```

### Check Management

```bash
# List checks
pakyas check list

# Create a check with cron schedule
pakyas check create backup-nightly --cron "0 2 * * *"

# Create with timezone override
pakyas check create daily-report --cron "0 9 * * *" --tz America/New_York

# Create with interval
pakyas check create api-heartbeat --every 5m

# Create with custom name and grace
pakyas check create db-backup --name "Database Backup" --every 1h --grace 10m

# Interactive mode
pakyas check create my-check -i

# Dry-run to preview what would be created
pakyas check create my-check --cron "0 2 * * *" --dry-run

# JSON output for scripting
pakyas check create deploy-check --every 1h --json

# Just the ping URL
pakyas check create deploy-check --every 1h --quiet

# Show check details
pakyas check show backup-nightly

# Update a check
pakyas check update backup-nightly --every 12h
pakyas check update backup-nightly --cron "0 3 * * *" --tz Asia/Manila

# Pause/resume a check
pakyas check pause backup-nightly
pakyas check resume backup-nightly

# View ping history
pakyas check logs backup-nightly --limit 50
```

#### Duration Formats

The CLI accepts flexible duration formats:
- `30s`, `30 seconds`
- `5m`, `5 minutes`
- `1h`, `1 hour`
- `2d`, `2 days`

#### Smart Grace Period

If you don't specify `--grace`, the CLI automatically calculates a sensible default:
- 10% of the check interval/period
- Minimum 5 minutes, maximum 1 hour
- Shown as "(auto)" in output

### Sending Pings

```bash
# Send success ping
pakyas ping backup-nightly

# Send start ping
pakyas ping backup-nightly --start

# Send fail ping
pakyas ping backup-nightly --fail

# Send with exit code
pakyas ping backup-nightly --exit-code 1
```

### Wrapping Commands

The `monitor` command wraps a command with automatic pings:

```bash
# Basic usage
pakyas monitor backup-nightly -- /path/to/backup.sh

# With arguments
pakyas monitor db-sync -- pg_dump -h localhost mydb > backup.sql
```

This automatically:
1. Sends `/start` ping
2. Runs the command
3. Captures exit code and stderr
4. Sends success or failure ping with details

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Command succeeded |
| 1-2 | Command failed (original exit code) |
| 3 | Monitoring infrastructure failure |

Exit code 3 indicates Pakyas itself failed (network error, auth issue, etc.). The wrapped command still ran.

## Next Steps

- [monitor command](/cli/monitor/) - Detailed monitor usage
- [ping command](/cli/ping/) - Manual ping sending
- [update command](/cli/update/) - Self-update the CLI
- [External Monitors](/cli/external-monitors/) - Migration from other services
