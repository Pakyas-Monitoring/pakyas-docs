---
title: Environment Variables
description: Configure Pakyas CLI and agents via environment variables
---

Pakyas follows the standard [12-factor app](https://12factor.net/config) configuration principles.

## Core Variables

| Variable | Description |
|----------|-------------|
| `PAKYAS_API_KEY` | Your API Key (`pk_live_...` or `pk_test_...`). Required unless using `--public_id`. |
| `PAKYAS_PUBLIC_ID` | Check UUID for `--public_id` flag. No authentication required when using this. |
| `PAKYAS_ORG` | (Optional) Organization slug or ID to scope checks to. |
| `PAKYAS_PROJECT` | (Optional) Project slug or ID to scope checks to. |

## CLI Options

These variables affect the behavior of the `pakyas` CLI.

| Variable | Default | Description |
|----------|---------|-------------|
| `PAKYAS_CONFIG_DIR` | `~/.config/pakyas` | Location of local config files. |
| `PAKYAS_DISPLAY_TZ` | `local` | Timezone for timestamp display: `local` or `utc`. |
| `PAKYAS_TIME` | `both` | Time display mode: `relative`, `absolute`, or `both`. |
| `PAKYAS_FORMAT` | `table` | Output format: `table`, `json`, `ndjson`, or `yaml`. |
| `PAKYAS_NO_COLOR` | `false` | Disable colored output. Also supports standard `NO_COLOR` env var. |
| `NO_COLOR` | `false` | Disable colored output (standard env var). |
| `PAKYAS_NO_UPDATE_CHECK` | `false` | Disable automatic update checks. |
| `PAKYAS_API_URL` | `https://api.pakyas.com` | (Self-hosted only) API endpoint. |

## Example `.env`

```bash
# .env.example
PAKYAS_API_KEY=pk_live_xxxxx
PAKYAS_PROJECT=production
PAKYAS_FORMAT=json
PAKYAS_TIME=relative
NO_COLOR=1
```
