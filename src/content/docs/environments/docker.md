---
title: Docker & Docker Compose
description: Monitor scheduled jobs running in Docker containers with Pakyas
---

> This guide covers monitoring **scheduled batch jobs** that run in containers
> (backups, ETL, cleanup tasks). For the container to be monitored correctly,
> it must be scheduled externally (cron, systemd timer, or orchestrator).

## Dockerfile

You can install Pakyas locally in your image or use `curl` if you prefer no dependencies.

### Option A: Install CLI (Recommended)

```dockerfile
FROM ubuntu:22.04

# Install curl and ca-certificates
RUN apt-get update && apt-get install -y curl ca-certificates

# Install Pakyas
RUN curl -fsSL https://pakyas.com/install.sh | bash && \
    mv pakyas /usr/local/bin/

# Copy script
COPY backup.sh /backup.sh

# Run with monitoring
CMD ["pakyas", "monitor", "docker-backup", "--", "/backup.sh"]
```

### Option B: Use Curl

```dockerfile
CMD curl -fsS https://ping.pakyas.com/$PAKYAS_PING_URL/start && \
    /backup.sh && \
    curl -fsS https://ping.pakyas.com/$PAKYAS_PING_URL
```

*(Note: Option B lacks exit-code capturing and logging)*

## Scheduling the Container

The container itself must be triggered on a schedule. Common approaches:

### Using cron

```bash
# /etc/cron.d/docker-backup
0 2 * * * root docker run --rm -e PAKYAS_API_KEY=pk_live_... my-backup-image
```

### Using systemd timer

Create a timer unit that triggers `docker run` at the desired interval.
See the [Linux](/docs/environments/linux) guide for systemd timer examples.

## Docker Compose

Pass the API key as an environment variable.

```yaml
version: '3.8'

services:
  db-backup:
    build: .
    environment:
      - PAKYAS_API_KEY=${PAKYAS_API_KEY}
    entrypoint: ["pakyas", "monitor", "db-backup", "--", "./backup.sh"]
```

Run the service on a schedule using cron or a scheduler:

```bash
# /etc/cron.d/db-backup
0 2 * * * root cd /path/to/project && docker compose run --rm db-backup
```

Ensure you have a `.env` file locally or secrets in your CI environment:

```bash
PAKYAS_API_KEY=pk_live_...
```
