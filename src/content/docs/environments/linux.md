---
title: Linux Servers & Cron
description: Monitor cron jobs and systemd services on Linux
---

Pakyas is perfect for monitoring traditional cron jobs and systemd services on Linux servers. The simplest way to integrate is using the `pakyas monitor` command wrapper.

## Prerequisites

1. Install the CLI:
   ```bash
   curl -fsSL https://pakyas.com/install.sh | bash
   ```
2. Authenticate:
   ```bash
   pakyas login
   ```

## Cron Jobs

The classic use case is wrapping a cron job so you know if it fails or stops running.

### 1. Identify your job

Suppose you have a backup script running nightly:

```bash
0 2 * * * /usr/local/bin/backup-db.sh
```

### 2. Wrap it with Pakyas

Simply prepend `pakyas monitor <slug> --`:

```bash
0 2 * * * pakyas monitor db-backup -- /usr/local/bin/backup-db.sh
```

Ensure `db-backup` matches the slug of a check you've created in Pakyas. If the check doesn't exist, Pakyas will return an error (or auto-create it if configured).

### 3. Handling Output

By default, cron emails output to the system user. Pakyas captures `stdout` and `stderr` and sends the tail of the logs to the dashboard upon failure.

To silence cron emails but keep Pakyas monitoring:

```bash
0 2 * * * pakyas monitor db-backup -- /usr/local/bin/backup-db.sh >/dev/null 2>&1
```

## Systemd Services

For systemd services (oneshot or timers), you can use `ExecStart`.

### Example: Oneshot Service

```ini
[Unit]
Description=Daily Cleanup

[Service]
Type=oneshot
# Set API key for reliable auth in background services
Environment="PAKYAS_API_KEY=pk_live_..."
ExecStart=/usr/local/bin/pakyas monitor cleanup-job -- /usr/local/bin/cleanup.py
```

## Common Pitfalls

### User Environment
Cron runs with a minimal environment. Ensure `pakyas` is in the PATH or use the absolute path (e.g., `/usr/local/bin/pakyas`).

### Authentication
Interactive login (`pakyas login`) stores credentials in the user's home directory (`~/.config/pakyas/`).
If your cron job runs as `root` or another user, it won't have access to your token.

**Solution:** Use the `PAKYAS_API_KEY` environment variable or flag.

```bash
0 2 * * * PAKYAS_API_KEY=pk_live_... pakyas monitor db-backup -- /path/to/script
```

### Overlapping Jobs
If your job takes longer than its schedule interval, you might have overlapping runs. Use `flock` to prevent this:

```bash
0 * * * * flock -n /var/lock/myjob.lock pakyas monitor hourly-sync -- ./sync.sh
```
