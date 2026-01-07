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

## See Also

- [monitor Command](/cli/monitor/) - Automatic ping wrapper
- [API Ping Endpoint](/api/ping/) - Direct HTTP pings
