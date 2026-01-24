---
title: check doctor Command
description: Diagnose check configuration and health issues
---

The `check doctor` command analyzes your check's configuration and recent activity to identify potential issues. It reports findings with severity levels and provides actionable recommendations to resolve problems before they cause missed alerts.

## Usage

```bash
pakyas check doctor <SLUG> [FLAGS]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `SLUG` | Check slug or ID (required) |

## Flags

| Flag | Description |
|------|-------------|
| `--deep` | Perform deep analysis (slower but more comprehensive) |
| `--fail-on <SEVERITY>` | Exit with error if findings meet threshold: `error` (default), `warning`, `info` |
| `--format <FORMAT>` | Output format: `human` (default), `json` |

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | No issues found (or findings below `--fail-on` threshold) |
| 78 | Issues found at or above `--fail-on` threshold |

:::tip[CI/CD Integration]
Use `--fail-on warning` in your CI/CD pipeline to catch potential issues before they become critical. Exit code 78 will fail your pipeline when issues are detected.
:::

## What It Shows

The doctor command reports:

- **Overall status**: `healthy`, `attention_needed`, or `critical`
- **Findings**: Issues discovered with severity levels (error, warning, info)
- **Suggested actions**: Specific recommendations to resolve each finding
- **Evidence**: Details and context supporting each finding

### Status Levels

| Status | Meaning |
|--------|---------|
| `healthy` | No issues detected |
| `attention_needed` | Warnings present that should be addressed |
| `critical` | Errors requiring immediate attention |

## Examples

### Basic Diagnostic

```bash
pakyas check doctor my-backup-job
```

### Deep Analysis

Perform a more comprehensive analysis that examines additional metrics and historical patterns:

```bash
pakyas check doctor my-backup-job --deep
```

### CI/CD Integration

Fail the pipeline if any warnings or errors are found:

```bash
# In your CI/CD script
pakyas check doctor my-backup-job --fail-on warning
if [ $? -eq 78 ]; then
  echo "Check health issues detected!"
  exit 1
fi
```

Or simply let the non-zero exit code fail the build:

```bash
pakyas check doctor my-backup-job --fail-on warning
```

### JSON Output for Scripting

Get structured output for processing with other tools:

```bash
pakyas check doctor my-backup-job --format json | jq '.findings[] | select(.severity == "error")'
```

### Combine Options

Deep analysis with JSON output and strict threshold:

```bash
pakyas check doctor my-backup-job --deep --fail-on info --format json
```

## See Also

- [check inspect Command](./check-inspect/) - View check configuration and current state
- [check tail Command](./check-tail/) - Stream real-time events from a check
