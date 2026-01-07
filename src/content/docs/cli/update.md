---
title: update Command
description: Update pakyas CLI to the latest version
---

The `update` command downloads and installs the latest version of the pakyas CLI.

## Usage

```bash
pakyas update [flags]
```

## Examples

```bash
# Update to the latest version
pakyas update

# Check for updates without installing
pakyas update --check
```

## Flags

| Flag | Description |
|------|-------------|
| `--check` | Check for updates without installing |

## Behavior

1. Checks the server for the latest available version
2. If already up to date, displays a success message
3. Downloads the appropriate binary for your platform
4. Verifies the SHA256 checksum
5. Atomically replaces the current binary

## Supported Platforms

- macOS (Intel and Apple Silicon)
- Linux (x64 and ARM64)

## Permissions

If the CLI is installed in a system directory (like `/usr/local/bin`), you may need elevated permissions:

```bash
sudo pakyas update
```

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success (updated or already up to date) |
| 1 | Error (network, permission, checksum mismatch) |

## See Also

- [Installation](/cli/) - Initial CLI installation
- [ping Command](/cli/ping/) - Send pings to checks
- [monitor Command](/cli/monitor/) - Wrap commands with monitoring
