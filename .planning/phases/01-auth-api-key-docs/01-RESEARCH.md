# Phase 1: Auth & API Key Docs - Research

**Researched:** 2026-01-24
**Domain:** CLI documentation (Astro/Starlight site)
**Confidence:** HIGH

## Summary

This phase documents the `auth` and `api-key` CLI commands for Pakyas. Research focused on extracting the complete command structure, flags, and behavior from the CLI source code (`pakyas-cli/src/commands/auth.rs`, `auth_key.rs`, `api_key.rs`, `cli.rs`) and understanding the existing documentation patterns from `pakyas-docs/src/content/docs/cli/`.

The CLI has a two-tier authentication model:
1. **`api-key`** - Server-side API key management (create, list, revoke keys in the Pakyas API)
2. **`auth`** - Local credential management (status, storing/verifying keys per-organization)

The documentation should follow the established pattern in existing CLI docs (`monitor.md`, `ping.md`): frontmatter with title/description, Usage section, Examples section, Flags table, and See Also links.

**Primary recommendation:** Create two documentation files following the existing CLI doc pattern, with comprehensive examples for common workflows like multi-org key management and CI/CD setup.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.x | Static site generator | Already in use |
| Starlight | integrated | Documentation framework | Already in use |
| Markdown | - | Content format | Documentation standard |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| astro-mermaid | integrated | Diagrams | If workflow diagrams needed |

**Installation:** No new dependencies needed - documentation only.

## Architecture Patterns

### Recommended Documentation Structure
```
src/content/docs/cli/
├── index.md            # CLI overview (existing)
├── auth.md             # NEW: Auth command reference
├── api-key.md          # NEW: API key management reference
├── monitor.md          # (existing)
├── ping.md             # (existing)
├── update.md           # (existing)
└── external-monitors.md # (existing)
```

### Pattern 1: CLI Command Documentation
**What:** Each CLI command gets a dedicated markdown file with consistent structure
**When to use:** For all CLI command documentation
**Example:**
```markdown
---
title: [command] Command
description: Brief one-line description
---

The `[command]` command [what it does].

## Usage

\`\`\`bash
pakyas [command] [subcommand] [flags]
\`\`\`

## Examples

\`\`\`bash
# Example with description
pakyas [command] [example]
\`\`\`

## Flags

| Flag | Description |
|------|-------------|
| `--flag` | What it does |

## See Also

- [Related Command](./related/)
```

### Pattern 2: Subcommand Documentation
**What:** Commands with subcommands document each subcommand within the same file
**When to use:** When a command has multiple subcommands (like `auth key list/set/verify/rm`)
**Example:**
```markdown
## Subcommands

### auth key list
Description...

### auth key set
Description...
```

### Anti-Patterns to Avoid
- **Separate files per subcommand:** Don't create `auth-key-list.md`, `auth-key-set.md` - keep them in one `auth.md` file
- **Missing flags tables:** Always include a complete flags table even if flags are self-explanatory
- **No examples:** Every command section needs at least one practical example

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Command structure | Manual extraction | Read cli.rs directly | Source of truth |
| Flag definitions | Guessing | Read Clap #[arg] attributes | Accurate defaults, env vars |
| Behavior details | Inference | Read command implementation | Edge cases matter |

**Key insight:** The CLI source code is the authoritative reference. Documentation must match exactly what's implemented.

## Common Pitfalls

### Pitfall 1: Missing Environment Variable Documentation
**What goes wrong:** Forgetting that many flags have corresponding env vars
**Why it happens:** Env vars are defined in Clap attributes, easy to miss
**How to avoid:** Extract all `env = "..."` attributes from cli.rs for each flag
**Warning signs:** Documentation mentions flag but not `PAKYAS_*` env var alternative

### Pitfall 2: Confusing api-key vs auth key
**What goes wrong:** Users confuse server-side API key management (api-key) with local credential storage (auth key)
**Why it happens:** Both deal with API keys but at different levels
**How to avoid:** Clear differentiation in documentation intro, use cases
**Warning signs:** User feedback about confusion between commands

### Pitfall 3: Missing Sidebar Registration
**What goes wrong:** New docs exist but aren't visible in navigation
**Why it happens:** Forgetting to update astro.config.mjs sidebar array
**How to avoid:** NAV-01 requirement explicitly tracks this
**Warning signs:** 404 when navigating from sidebar

### Pitfall 4: Outdated Flag Information
**What goes wrong:** Documenting flags that don't exist or missing new flags
**Why it happens:** CLI evolves, docs lag behind
**How to avoid:** Always verify against current cli.rs before writing
**Warning signs:** User reports "flag not recognized" errors

## Code Examples

Verified patterns from CLI source code:

### Auth Command Structure (from cli.rs)
```rust
// Source: pakyas-cli/src/cli.rs lines 536-543
#[derive(Subcommand, Clone)]
pub enum AuthCommands {
    /// Show authentication status and credential info
    Status,

    /// Manage stored API keys for organizations
    #[command(subcommand)]
    Key(AuthKeyCommands),
}
```

### Auth Key Subcommands (from cli.rs)
```rust
// Source: pakyas-cli/src/cli.rs lines 546-583
#[derive(Subcommand, Clone)]
pub enum AuthKeyCommands {
    /// List all stored API keys by organization
    List,

    /// Set/import an API key for an organization
    Set {
        /// Organization ID to set key for
        #[arg(long)]
        org: String,

        /// API key to store (will prompt if not provided)
        #[arg(long)]
        key: Option<String>,
    },

    /// Verify a stored API key is valid
    Verify {
        /// Organization ID to verify key for (uses active org if not specified)
        #[arg(long)]
        org: Option<String>,
    },

    /// Remove a stored API key
    Rm {
        /// Organization ID to remove key for
        #[arg(long, conflicts_with = "legacy")]
        org: Option<String>,

        /// Remove the legacy (unmigrated) API key
        #[arg(long, conflicts_with = "org")]
        legacy: bool,

        /// Skip confirmation prompt
        #[arg(long, short)]
        yes: bool,
    },
}
```

### API Key Commands (from cli.rs)
```rust
// Source: pakyas-cli/src/cli.rs lines 506-534
#[derive(Subcommand, Clone)]
pub enum ApiKeyCommands {
    /// List all API keys in the active organization
    List,

    /// Create a new API key
    Create {
        /// Name for the API key (e.g., "CI Pipeline", "Local Dev")
        name: String,

        /// Scopes to grant: read, write, manage (can specify multiple with commas)
        #[arg(long, short, value_delimiter = ',')]
        scopes: Vec<String>,

        /// Days until expiration (1-365, omit for no expiration)
        #[arg(long)]
        expires: Option<i64>,
    },

    /// Revoke an API key
    Revoke {
        /// API key ID to revoke
        id: String,

        /// Skip confirmation prompt
        #[arg(long, short)]
        yes: bool,
    },
}
```

### Login Command Options (from cli.rs)
```rust
// Source: pakyas-cli/src/cli.rs lines 125-134
#[derive(Parser, Clone)]
pub struct LoginArgs {
    /// Login with API key directly (skip browser auth)
    #[arg(long)]
    pub api_key: Option<String>,

    /// Skip browser and use email/password interactively
    #[arg(long)]
    pub no_browser: bool,
}
```

### API Key Scopes (from api_key.rs)
```rust
// Source: pakyas-cli/src/commands/api_key.rs lines 22-36
pub enum ApiKeyScope {
    Read,   // read-only access
    Write,  // read + write access
    Manage, // full access including key management
}
```

### Credential Storage Location
```rust
// Source: pakyas-cli/src/credentials.rs
// Credentials stored at: ~/.config/pakyas/credentials.json (V2 format)
// Config stored at: ~/.config/pakyas/config.json
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single global API key | Per-org API keys (V2 schema) | Recent | Multi-org support |
| Browser-only login | Browser, API key, or interactive | Current | CI/CD friendly |

**Deprecated/outdated:**
- V1 credentials format: Auto-migrated to V2 with `legacy_api_key` field

## Command Reference Summary

### auth status
Shows detailed authentication status including:
- Environment variable override warning (if PAKYAS_API_KEY set)
- Active organization info
- Default project info
- Stored credentials summary (per-org keys)
- Legacy key warnings

### auth key list
Lists all locally stored API keys by organization with:
- Organization ID
- Key preview (first 12 chars)
- Label (device name + date)
- Added timestamp
- Last verified timestamp

### auth key set --org <ORG_ID> [--key <KEY>]
Imports/stores an API key for a specific organization:
- Prompts for key if not provided via --key
- Validates key format (pk_ prefix, min length)
- Validates key belongs to specified org via /api/v1/me
- Stores with device label

### auth key verify [--org <ORG_ID>]
Verifies a stored API key is still valid:
- Uses active org if --org not specified
- Calls /api/v1/me to validate
- Updates last_verified timestamp on success

### auth key rm (--org <ORG_ID> | --legacy) [-y]
Removes a stored API key:
- Must specify either --org or --legacy
- Prompts for confirmation unless -y flag
- --legacy removes unmigrated V1 key

### api-key list
Lists all API keys in the active organization (server-side):
- Name, ID, prefix
- Scopes
- Created date, last used date
- Status (active/expired)

### api-key create <NAME> [-s SCOPES] [--expires DAYS]
Creates a new API key on the server:
- Name is required positional arg
- Scopes: read, write, manage (comma-separated, defaults to read)
- Expires: 1-365 days or omit for no expiration
- Shows full key ONCE (cannot be retrieved later)

### api-key revoke <ID> [-y]
Revokes an API key on the server:
- Requires key ID (from list output)
- Prompts for confirmation unless -y flag
- Cannot be undone

## Open Questions

Things that couldn't be fully resolved:

1. **Login command documentation scope**
   - What we know: login/logout/whoami exist and work with auth
   - What's unclear: Should login be in auth.md or separate doc?
   - Recommendation: Include login/logout/whoami in auth.md since they're authentication-related

## Sources

### Primary (HIGH confidence)
- `pakyas-cli/src/cli.rs` - Command definitions, flags, args
- `pakyas-cli/src/commands/auth.rs` - auth/login/logout/whoami implementation
- `pakyas-cli/src/commands/auth_key.rs` - auth key subcommands implementation
- `pakyas-cli/src/commands/api_key.rs` - api-key command implementation
- `pakyas-cli/src/credentials.rs` - Credential storage V2 schema

### Secondary (MEDIUM confidence)
- `pakyas-docs/src/content/docs/cli/monitor.md` - Existing documentation pattern
- `pakyas-docs/src/content/docs/cli/ping.md` - Existing documentation pattern
- `pakyas-docs/astro.config.mjs` - Sidebar configuration pattern

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - direct codebase inspection
- Architecture: HIGH - following existing patterns in same codebase
- Pitfalls: HIGH - derived from code analysis and common documentation issues

**Research date:** 2026-01-24
**Valid until:** 60 days (stable CLI, documentation-only phase)
