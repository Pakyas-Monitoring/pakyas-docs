---
title: GitHub Actions
description: Monitor GitHub Actions workflows with Pakyas
---

Monitor your CI/CD pipelines to track build duration, catch silent failures, and get alerted on critical workflow breaks.

## Setup

### 1. Add Secret
Add your Pakyas API Key to your repository secrets (Settings > Secrets and variables > Actions):
- Name: `PAKYAS_API_KEY`
- Value: `pk_live_...`

### 2. Configure Workflow

You can use the `pakyas` CLI directly in your workflow.

```yaml
name: Nightly Build

on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      PAKYAS_API_KEY: ${{ secrets.PAKYAS_API_KEY }}
    steps:
      - uses: actions/checkout@v3

      - name: Install Pakyas
        run: curl -fsSL https://pakyas.com/install.sh | bash

      - name: Run Build with Monitoring
        run: |
          pakyas monitor nightly-build -- npm run build
```

## Advanced: Step-by-Step Pings

If you need more granular control (e.g., separating "start" from "success"), you can send raw pings.

```yaml
steps:
  - name: Notify Start
    run: pakyas ping nightly-build --start

  - name: Run Tests
    run: npm test

  - name: Notify Success
    if: success()
    run: pakyas ping nightly-build

  - name: Notify Failure
    if: failure()
    run: pakyas ping nightly-build --fail
```

**Note:** The `if: always()` condition is useful if you want to ensure the final ping sends even if previous steps crash, but usually `if: success()` and `if: failure()` pairs covered above are cleaner.
