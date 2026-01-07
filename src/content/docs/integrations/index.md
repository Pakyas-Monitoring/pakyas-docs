---
title: Integrations & Environments
description: Connect Pakyas to your existing infrastructure and workflows
---

Pakyas is designed to work anywhere you can run a script or send an HTTP request. We provide native guides for common environments, but the core primitive—the `pakyas` CLI or a simple `curl` request—works almost everywhere.

## Supported Environments

We have dedicated guides for the following platforms:

### CI/CD Platforms
- [GitHub Actions](/environments/github-actions/)
- [GitLab CI](/environments/gitlab-ci/)
- [Jenkins](/environments/jenkins/)
- [CircleCI](/environments/circleci/)

### Infrastructure
- [Linux Servers & Cron](/environments/linux/)
- [Docker & Docker Compose](/environments/docker/)
- [Kubernetes](/environments/kubernetes/)

## Configuration Methods

Pakyas can be configured via:

- [CLI](/cli/) - Recommended for interactive use and scripting.
- [Environment Variables](/config/env-vars/) - Best for containerized apps and 12-factor apps.
- [Terraform](/config/terraform/) - Manage checks as code (Coming Soon).

## Migration

If you are migrating from another monitoring service (like Healthchecks.io or Cronitor), see our [External Monitor Integration](/cli/external-monitors/) guide to run Pakyas side-by-side with your existing tools.
