---
title: ping Command
description: Send pings manually to checks
---

The `ping` command sends pings to checks manually.

## Usage

```bash
pakyas ping <slug> [flags]
```

## Examples

```bash
# Send success ping
pakyas ping backup-db

# Send start ping
pakyas ping backup-db --start

# Send fail ping
pakyas ping backup-db --fail

# Send with specific exit code
pakyas ping backup-db --exit-code 1
```

## Flags

| Flag | Description |
|------|-------------|
| `--start` | Send a start signal |
| `--fail` | Send a fail signal |
| `--exit-code <code>` | Send with specific exit code (0 = success) |
| `--run <id>` | Run identifier for START/END pairing (for accurate duration tracking with overlapping runs) |
| `--duration-ms <ms>` | Duration in milliseconds (for scripted pings with accurate timing) |
| `--no-external` | Disable external monitors |
| `--external-timeout-ms` | Timeout for external requests |

## Use Cases

### Manual Testing

```bash
# Test that a check is configured correctly
pakyas ping test-check --start
sleep 5
pakyas ping test-check
```

### Scripted Pings

When `monitor` doesn't fit your workflow:

```bash
#!/bin/bash
pakyas ping my-job --start

# Your complex logic here
if some_condition; then
  do_something
  pakyas ping my-job
else
  pakyas ping my-job --fail
fi
```

### Scripted Pings with Accurate Duration

For accurate duration tracking in scripts, measure and send the duration:

```bash
#!/bin/bash
pakyas ping my-job --start
START_TIME=$(date +%s%3N)  # milliseconds since epoch

# Your job here
./my-complex-job.sh

END_TIME=$(date +%s%3N)
DURATION=$((END_TIME - START_TIME))

pakyas ping my-job --duration-ms $DURATION
```

## See Also

- [monitor Command](./monitor/) - Automatic ping wrapper
- [API Ping Endpoint](../api/ping/) - Direct HTTP pings
