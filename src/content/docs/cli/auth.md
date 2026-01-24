---
title: auth Command
description: Manage authentication and stored credentials
---

The `auth` command manages local authentication state and stored API keys per-organization. Use this command to check your authentication status, manage credentials for multiple organizations, and troubleshoot login issues.

## auth status

Shows detailed authentication status including active organization, stored credentials, and any warnings.

### Usage

```bash
pakyas auth status
```

### What It Shows

- Environment variable override warning (if `PAKYAS_API_KEY` is set)
- Active organization info
- Default project info
- Stored credentials summary (per-org keys with preview)
- Legacy key warnings (if migrating from V1)

### Example Output

```
Authentication Status
=====================
Active Org: acme-corp (org_abc123)
Default Project: production-api (proj_xyz789)

Stored Credentials:
  org_abc123 (acme-corp): pk_live_abc1... (added 2024-01-15, verified 2024-01-20)
  org_def456 (staging):   pk_test_def4... (added 2024-01-10, never verified)
```

## login

Authenticate with Pakyas. Supports browser-based OAuth, API key, or interactive email/password login.

### Usage

```bash
pakyas login [--api-key KEY] [--no-browser]
```

### Flags

| Flag | Description |
|------|-------------|
| `--api-key <KEY>` | Login with API key directly (skips browser auth) |
| `--no-browser` | Skip browser and use email/password interactively |

### Examples

```bash
# Browser-based login (default)
pakyas login

# Login with API key (useful for CI/CD)
pakyas login --api-key pk_live_abc123...

# Interactive email/password login
pakyas login --no-browser
```

## logout

Clear the active session and authentication state.

### Usage

```bash
pakyas logout
```

### Example

```bash
pakyas logout
# Output: Logged out successfully
```

## whoami

Show the currently authenticated user and organization.

### Usage

```bash
pakyas whoami
```

### Example

```bash
pakyas whoami
# Output: Authenticated as: jane@example.com (Acme Corp)
```

## auth key list

Lists all locally stored API keys by organization.

### Usage

```bash
pakyas auth key list
```

### What It Shows

- Organization ID
- Key preview (first 12 characters)
- Label (device name + date)
- Added timestamp
- Last verified timestamp

### Example

```bash
pakyas auth key list
# Output:
# Org ID        Key Preview      Label                Added       Verified
# org_abc123    pk_live_abc1...  MacBook Pro (2024)   2024-01-15  2024-01-20
# org_def456    pk_test_def4...  CI Server            2024-01-10  never
```

## auth key set

Import or store an API key for a specific organization.

### Usage

```bash
pakyas auth key set --org <ORG_ID> [--key <KEY>]
```

### Flags

| Flag | Description |
|------|-------------|
| `--org <ORG_ID>` | Organization ID to set key for (required) |
| `--key <KEY>` | API key to store (prompts if not provided) |

### Behavior

1. Prompts for key if `--key` not provided
2. Validates key format (`pk_` prefix, minimum length)
3. Validates key belongs to specified org via API call
4. Stores key with device label for identification

### Examples

```bash
# Set key interactively (prompts for key)
pakyas auth key set --org org_abc123

# Set key directly
pakyas auth key set --org org_abc123 --key pk_live_abc123...

# Set key for a second organization (multi-org setup)
pakyas auth key set --org org_def456 --key pk_test_def456...
```

## auth key verify

Verify that a stored API key is still valid.

### Usage

```bash
pakyas auth key verify [--org <ORG_ID>]
```

### Flags

| Flag | Description |
|------|-------------|
| `--org <ORG_ID>` | Organization ID to verify key for (uses active org if not specified) |

### Behavior

1. Retrieves stored key for the organization
2. Calls API to validate the key
3. Updates `last_verified` timestamp on success

### Examples

```bash
# Verify key for active organization
pakyas auth key verify

# Verify key for specific organization
pakyas auth key verify --org org_abc123
```

## auth key rm

Remove a stored API key.

### Usage

```bash
pakyas auth key rm (--org <ORG_ID> | --legacy) [-y]
```

### Flags

| Flag | Description |
|------|-------------|
| `--org <ORG_ID>` | Organization ID to remove key for |
| `--legacy` | Remove the legacy (unmigrated) API key from V1 |
| `-y, --yes` | Skip confirmation prompt |

Note: `--org` and `--legacy` are mutually exclusive. You must specify one or the other.

### Examples

```bash
# Remove key for specific organization (with confirmation)
pakyas auth key rm --org org_abc123

# Remove key without confirmation
pakyas auth key rm --org org_abc123 -y

# Remove legacy V1 key during migration
pakyas auth key rm --legacy
```

## Credential Storage

Credentials are stored locally at `~/.config/pakyas/credentials.json` using the V2 format, which supports per-organization API keys.

### Storage Location

| Platform | Path |
|----------|------|
| Linux/macOS | `~/.config/pakyas/credentials.json` |

### V2 Format Features

- Per-organization API keys (supports multiple orgs)
- Key metadata (label, timestamps)
- Automatic migration from V1 single-key format
- Legacy key preserved during migration

## See Also

- [api-key Command](./api-key/) - Server-side API key management (create, revoke)
- [ping Command](./ping/) - Send pings to checks
