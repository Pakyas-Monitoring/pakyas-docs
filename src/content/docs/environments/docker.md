---
title: Docker & Docker Compose
description: Monitor Docker containers and Compose services with Pakyas
---

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

Ensure you have a `.env` file locally or secrets in your CI environment:

```bash
PAKYAS_API_KEY=pk_live_...
```
