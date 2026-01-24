---
title: api-key Command
description: Create and manage API keys on the server
---

The `api-key` command manages API keys on the Pakyas server. Use this command to create new API keys, list existing keys, and revoke keys that are no longer needed.

:::note[api-key vs auth key]
These commands serve different purposes:
- **api-key** - Server-side key management: create, list, and revoke keys stored on Pakyas servers
- **auth key** - Local credential storage: manage which keys are stored on your machine for CLI authentication

Use `api-key create` to generate a new key, then `auth key set` to store it locally.
:::

## api-key list

Lists all API keys in the active organization.

### Usage

```bash
pakyas api-key list
```

### What It Shows

- Key name
- Key ID (use this for revocation)
- Key prefix (first few characters)
- Scopes granted
- Created date
- Last used date
- Status (active/expired)

### Example

```bash
pakyas api-key list
# Output:
# Name           ID                    Prefix        Scopes       Created     Last Used   Status
# CI Pipeline    key_abc123def456...   pk_live_ci... read,write   2024-01-15  2024-01-20  active
# Local Dev      key_xyz789ghi012...   pk_live_lo... read         2024-01-10  never       active
# Old Key        key_old456abc789...   pk_live_ol... manage       2023-06-01  2023-12-15  expired
```

## api-key create

Creates a new API key on the server.

### Usage

```bash
pakyas api-key create <NAME> [-s SCOPES] [--expires DAYS]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `NAME` | Name for the API key (required, e.g., "CI Pipeline", "Local Dev") |

### Flags

| Flag | Description |
|------|-------------|
| `-s, --scopes <SCOPES>` | Scopes to grant: read, write, manage (comma-separated, defaults to read) |
| `--expires <DAYS>` | Days until expiration: 1-365 (omit for no expiration) |

:::caution[Important]
The full API key is shown **only once** when created. You cannot retrieve it later. Copy and store it securely immediately after creation.
:::

### Examples

```bash
# Create a read-only key for monitoring dashboards
pakyas api-key create "Dashboard Reader"

# Create a CI/CD key with write scope and 90-day expiry
pakyas api-key create "GitHub Actions" -s read,write --expires 90

# Create an admin key with full access (use sparingly)
pakyas api-key create "Admin Key" -s read,write,manage

# Create a key for a specific environment
pakyas api-key create "Production Deploy" -s write --expires 30
```

### After Creation

Once you have the key, store it locally for CLI use:

```bash
# Store the key for your organization
pakyas auth key set --org org_abc123 --key pk_live_...
```

## api-key revoke

Revokes an API key on the server. This action cannot be undone.

### Usage

```bash
pakyas api-key revoke <ID> [-y]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `ID` | API key ID to revoke (from `api-key list` output) |

### Flags

| Flag | Description |
|------|-------------|
| `-y, --yes` | Skip confirmation prompt |

:::danger[Warning]
Revoking a key is permanent and cannot be undone. Any systems using this key will immediately lose access.
:::

### Examples

```bash
# Revoke a key (with confirmation prompt)
pakyas api-key revoke key_abc123def456

# Revoke without confirmation (use in scripts)
pakyas api-key revoke key_abc123def456 -y
```

## Scope Reference

| Scope | Access Level | Permissions |
|-------|--------------|-------------|
| `read` | Read-only | List checks, view status, read logs |
| `write` | Read + Write | Create/update checks, send pings, plus all read permissions |
| `manage` | Full access | API key management, organization settings, plus all write permissions |

### Scope Selection Guidelines

- **Monitoring/dashboards**: Use `read` only
- **CI/CD pipelines**: Use `read,write` (send pings, update checks)
- **Automation scripts**: Use `write` if creating checks, otherwise `read`
- **Administrative tools**: Use `manage` only when necessary

## Common Workflows

### Creating Keys for CI/CD Pipelines

```bash
# Create a scoped key with expiration
pakyas api-key create "GitHub Actions - prod" -s read,write --expires 90

# Copy the key and add to CI secrets (shown only once)
# Then optionally store locally for testing:
pakyas auth key set --org org_abc123 --key pk_live_...
```

### Rotating Keys

Key rotation involves creating a new key before revoking the old one:

```bash
# 1. Create new key
pakyas api-key create "CI Pipeline v2" -s read,write --expires 90

# 2. Update the key in your CI/CD system (GitHub Secrets, etc.)

# 3. Verify the new key works
pakyas auth key set --org org_abc123 --key pk_live_new...
pakyas auth key verify

# 4. Revoke the old key
pakyas api-key revoke key_oldkey123 -y
```

### Scoped Keys for Different Environments

```bash
# Read-only key for staging dashboards
pakyas api-key create "Staging Dashboard" -s read

# Write key for production deployments
pakyas api-key create "Production Deploy" -s read,write --expires 30

# Manage key for infrastructure automation (use sparingly)
pakyas api-key create "Terraform" -s read,write,manage --expires 7
```

## See Also

- [auth Command](./auth/) - Local credential management and authentication status
