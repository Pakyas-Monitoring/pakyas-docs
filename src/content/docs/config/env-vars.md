---
title: Environment Variables
description: Configure Pakyas CLI and agents via environment variables
---

Pakyas follows the standard [12-factor app](https://12factor.net/config) configuration principles.

## Core Variables

| Variable | Description |
|----------|-------------|
| `PAKYAS_API_KEY` | **Required.** Your API Key (`pk_live_...` or `pk_test_...`). |
| `PAKYAS_ORG` | (Optional) Organization slug or ID to scope checks to. |
| `PAKYAS_PROJECT` | (Optional) Project slug or ID to scope checks to. |

## CLI Options

These variables affect the behavior of the `pakyas` CLI.

| Variable | Default | Description |
|----------|---------|-------------|
| `PAKYAS_CONFIG_DIR` | `~/.config/pakyas` | Location of local config files. |
| `PAKYAS_NO_COLOR` | `false` | Disable colored output. |
| `PAKYAS_API_URL` | `https://api.pakyas.com` | (Self-hosted only) API endpoint. |

## Example `.env`

```bash
# .env.example
PAKYAS_API_KEY=pk_live_xxxxx
PAKYAS_PROJECT=production
```
