---
title: Terraform Provider
description: Manage Pakyas checks as code
---

> **Note:** The official Terraform provider is currently in **Beta**.

## Usage

Pakyas allows you to define your checks alongside your infrastructure.

```hcl
terraform {
  required_providers {
    pakyas = {
      source = "pakyas/pakyas"
      version = "~> 0.1"
    }
  }
}

provider "pakyas" {
  api_key = var.pakyas_api_key
}

resource "pakyas_check" "nightly_backup" {
  name     = "Nightly Backup"
  slug     = "nightly-backup"
  schedule = "0 2 * * *"
  grace    = 3600 # 1 hour
  channels = ["email", "slack"]
}
```

## Import

You can import existing checks:

```bash
terraform import pakyas_check.nightly_backup <check_uuid>
```

## Resources

- `pakyas_check`
- `pakyas_file_check` (Coming soon)
- `pakyas_notification_channel`

*(See the generic HTTP provider examples in our [GitHub repository](https://github.com/pakyas/terraform-provider-pakyas) for current workarounds)*
