---
title: Ping Endpoint
description: Send pings via HTTP
---

The ping endpoint accepts heartbeat signals from your jobs.

## Base URL

```
https://ping.pakyas.com/ping/{public_id}
```

The `public_id` is the unique identifier for your check, shown in the dashboard.

## Endpoints

### Success Ping

Signal that a job completed successfully.

```bash
curl -fsS https://ping.pakyas.com/ping/{public_id}
```

| Method | GET or POST |
|--------|-------------|
| Response | 200 OK |

### Start Ping

Signal that a job has started.

```bash
curl -fsS https://ping.pakyas.com/ping/{public_id}/start
```

| Method | GET or POST |
|--------|-------------|
| Response | 200 OK |

### Fail Ping

Signal that a job has failed.

```bash
curl -fsS https://ping.pakyas.com/ping/{public_id}/fail
```

| Method | GET or POST |
|--------|-------------|
| Response | 200 OK |

### Exit Code Ping

Signal completion with a specific exit code. Non-zero is treated as failure.

```bash
curl -fsS https://ping.pakyas.com/ping/{public_id}/1
```

| Method | GET or POST |
|--------|-------------|
| Response | 200 OK |
| Path Parameter | Exit code (0-255) |

## Request Body

For POST requests, you can include a body with error details:

```bash
curl -X POST https://ping.pakyas.com/ping/{public_id}/fail \
  -H "Content-Type: text/plain" \
  -d "Error: Connection refused to database"
```

The body is stored and included in alerts. Maximum size: 10KB.

## Response Codes

| Code | Meaning |
|------|---------|
| 200 | Ping accepted |
| 404 | Check not found |
| 413 | Body too large |

## Examples

### From Cron

```bash
# Simple success ping
0 * * * * /path/to/job.sh && curl -fsS https://ping.pakyas.com/ping/{id}

# With start/success/fail
0 * * * * curl -fsS https://ping.pakyas.com/ping/{id}/start && /path/to/job.sh && curl -fsS https://ping.pakyas.com/ping/{id} || curl -fsS https://ping.pakyas.com/ping/{id}/fail
```

### From Script

```bash
#!/bin/bash
curl -fsS https://ping.pakyas.com/ping/{id}/start

if ./my-job.sh 2>&1 | tee /tmp/output.log; then
  curl -fsS https://ping.pakyas.com/ping/{id}
else
  curl -fsS https://ping.pakyas.com/ping/{id}/fail -d @/tmp/output.log
fi
```

### From Python

```python
import requests

def ping_success(check_id):
    requests.get(f"https://ping.pakyas.com/ping/{check_id}")

def ping_fail(check_id, error_message):
    requests.post(
        f"https://ping.pakyas.com/ping/{check_id}/fail",
        data=error_message
    )
```

## Reliability

- Pings are idempotent - sending the same ping multiple times is safe
- Timeout: 10 seconds recommended
- Retry: 1-2 retries on failure is recommended for critical jobs
