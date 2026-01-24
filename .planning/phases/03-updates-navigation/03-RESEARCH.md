# Phase 3: Updates & Navigation - Research

**Researched:** 2026-01-24
**Domain:** Documentation updates and Starlight sidebar navigation
**Confidence:** HIGH

## Summary

This phase updates existing documentation with missing CLI flags and environment variables, then integrates all new documentation pages into the sidebar navigation. Research focused on three areas:

1. **Global flags** (from `cli.rs` lines 34-64): Five flags need documentation - `--display-tz`, `--time`, `--no-color`, `--plain`, `--debug-http`
2. **Environment variables** (from `cli.rs` env attributes): Several env vars need documentation - `PAKYAS_DISPLAY_TZ`, `PAKYAS_TIME`, `NO_COLOR`, `PAKYAS_FORMAT`, `PAKYAS_NO_UPDATE_CHECK`
3. **Command flag updates**: `check delete` needs `-y/--yes` flag, `check logs` needs proper `--limit` documentation
4. **Navigation**: Starlight sidebar in `astro.config.mjs` needs entries for auth, api-key, check-doctor, check-tail, check-inspect, completion

The existing documentation structure provides clear patterns. Global flags belong in `cli/index.md` under a new "Global Flags" section. Environment variables belong in `config/env-vars.md`. Navigation follows the existing sidebar pattern with label/link pairs.

**Primary recommendation:** Update existing files in-place following established patterns. Add new global flags section to index.md, expand env-vars.md with CLI behavior variables, and add all Phase 1+2 docs to sidebar navigation.

## Standard Stack

The established libraries/tools for this phase:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Starlight | Current | Astro docs framework | Already in use |
| Markdown | - | Documentation content | Native Starlight support |

### Supporting
| Component | Purpose | When to Use |
|-----------|---------|-------------|
| Starlight sidebar config | Navigation | astro.config.mjs sidebar array |
| Markdown tables | Flag/env var documentation | Consistent with existing docs |
| Code blocks | Examples | bash syntax highlighting |

**Installation:** No new dependencies needed - documentation updates only.

## Architecture Patterns

### Files to Update

```
src/content/docs/
├── cli/
│   └── index.md          # UPD-01: Add global flags section
│                         # UPD-03: Document check delete -y/--yes
│                         # UPD-04: Document check logs --limit
└── config/
    └── env-vars.md       # UPD-02: Add missing env vars

astro.config.mjs          # NAV-01: Add sidebar entries
```

### Pattern 1: Global Flags Section
**What:** Dedicated section documenting flags that apply to all commands
**Where:** Add to cli/index.md after "Environment Variables" section
**Example:**
```markdown
## Global Flags

These flags can be used with any pakyas command:

| Flag | Default | Env Var | Description |
|------|---------|---------|-------------|
| `--display-tz <TZ>` | `local` | `PAKYAS_DISPLAY_TZ` | Timezone for timestamps: local or utc |
| `--time <MODE>` | `both` | `PAKYAS_TIME` | Time display: relative, absolute, or both |
| `--no-color` | false | `NO_COLOR` | Disable colored output |
| `--plain` | false | - | Plain output without symbols/emojis |
| `--debug-http` | false | - | Print HTTP requests/responses to stderr |
```

### Pattern 2: Environment Variable Table Expansion
**What:** Add new env vars to existing table in env-vars.md
**Where:** Expand "CLI Options" section
**Example:**
```markdown
| Variable | Default | Description |
|----------|---------|-------------|
| `PAKYAS_DISPLAY_TZ` | `local` | Timezone for timestamp display: local or utc |
| `PAKYAS_TIME` | `both` | Time display mode: relative, absolute, or both |
| `PAKYAS_FORMAT` | `table` | Output format: table, json, ndjson, yaml |
| `PAKYAS_NO_UPDATE_CHECK` | false | Disable automatic update checks |
| `NO_COLOR` | false | Disable colored output (standard env var) |
```

### Pattern 3: Sidebar Navigation
**What:** Add entries to Starlight sidebar configuration
**Where:** astro.config.mjs sidebar array under "CLI Reference" section
**Example:**
```javascript
{
    label: "CLI Reference",
    items: [
        { label: "Installation", link: "/cli/" },
        { label: "auth", link: "/cli/auth/" },           // NEW
        { label: "api-key", link: "/cli/api-key/" },     // NEW
        { label: "check doctor", link: "/cli/check-doctor/" }, // NEW
        { label: "check inspect", link: "/cli/check-inspect/" }, // NEW
        { label: "check tail", link: "/cli/check-tail/" }, // NEW
        { label: "completion", link: "/cli/completion/" }, // NEW
        { label: "monitor", link: "/cli/monitor/" },
        { label: "ping", link: "/cli/ping/" },
        { label: "update", link: "/cli/update/" },
        { label: "External Monitors", link: "/cli/external-monitors/" },
    ],
},
```

### Anti-Patterns to Avoid
- **Duplicate sections:** Don't create new sections if content fits existing ones
- **Inconsistent table formats:** Match existing column structure in env-vars.md
- **Missing See Also links:** Ensure new pages are cross-referenced from updated pages
- **Unsorted sidebar:** Keep sidebar entries in logical order (alphabetical for commands)

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Flag documentation format | New table structure | Existing 4-column table | Consistency |
| Env var organization | New sections | Existing "CLI Options" section | Fits pattern |
| Sidebar structure | New sidebar group | Existing "CLI Reference" group | Maintains hierarchy |

**Key insight:** This phase is purely additive updates to existing structures. Follow established patterns exactly.

## Common Pitfalls

### Pitfall 1: Missing Environment Variable Linkage
**What goes wrong:** Documenting flags without their corresponding env vars
**Why it happens:** Env vars defined in cli.rs `#[arg(env = "...")]` are easy to miss
**How to avoid:** Cross-reference cli.rs env attributes with env-vars.md
**Warning signs:** Global flags table missing Env Var column

### Pitfall 2: Inconsistent Sidebar Ordering
**What goes wrong:** New entries scattered randomly in sidebar
**Why it happens:** Adding entries at end without considering organization
**How to avoid:** Sort command entries alphabetically within "CLI Reference" group
**Warning signs:** auth appears after update instead of at start

### Pitfall 3: Breaking Navigation Paths
**What goes wrong:** Sidebar links don't match actual page paths
**Why it happens:** Typos in link paths, forgetting trailing slash
**How to avoid:** Verify all links follow `/cli/[name]/` pattern with trailing slash
**Warning signs:** 404 errors when clicking sidebar links

### Pitfall 4: Incomplete Flag Documentation
**What goes wrong:** Documenting flag exists but not its values/defaults
**Why it happens:** Copying flag name without reading cli.rs for value_enum options
**How to avoid:** Extract default_value and value_enum variants from cli.rs
**Warning signs:** Flags documented without accepted values

### Pitfall 5: Forgetting to Update Example in index.md
**What goes wrong:** check logs example shows --limit but no explanation
**Why it happens:** Example already exists, seems complete
**How to avoid:** Add inline comment or expand Check Management section
**Warning signs:** Example uses flag but no surrounding documentation

## Code Examples

Verified patterns from CLI source code:

### Global Flags (from cli.rs lines 34-64)
```rust
// Source: pakyas-cli/src/cli.rs
#[derive(Parser)]
pub struct Cli {
    /// Timezone for timestamp display: local or utc
    #[arg(
        long = "display-tz",
        global = true,
        value_enum,
        default_value = "local",
        env = "PAKYAS_DISPLAY_TZ"
    )]
    pub display_tz: TimeZoneMode,

    /// Time display mode: relative, absolute, or both
    #[arg(
        long,
        global = true,
        value_enum,
        default_value = "both",
        env = "PAKYAS_TIME"
    )]
    pub time: TimeDisplayMode,

    /// Disable colored output
    #[arg(long, global = true, env = "NO_COLOR")]
    pub no_color: bool,

    /// Plain output without symbols/emojis
    #[arg(long, global = true)]
    pub plain: bool,

    /// Print HTTP requests/responses to stderr (debugging)
    #[arg(long, global = true)]
    pub debug_http: bool,
}

#[derive(Clone, Copy, Debug, Default, ValueEnum)]
pub enum TimeZoneMode {
    #[default]
    Local,
    Utc,
}

#[derive(Clone, Copy, Debug, Default, ValueEnum)]
pub enum TimeDisplayMode {
    Relative,
    Absolute,
    #[default]
    Both,
}
```

### Check Delete with -y/--yes (from cli.rs)
```rust
// Source: pakyas-cli/src/cli.rs lines 288-295
/// Delete a check
Delete {
    /// Check slug or ID
    slug: String,

    /// Skip confirmation prompt
    #[arg(long, short)]
    yes: bool,
},
```

### Check Logs with --limit (from cli.rs)
```rust
// Source: pakyas-cli/src/cli.rs lines 297-305
/// Show ping history for a check
Logs {
    /// Check slug or ID
    slug: String,

    /// Number of pings to show (default: 50)
    #[arg(long, default_value = "50")]
    limit: i32,
},
```

### Additional Environment Variables (from cli.rs)
```rust
// Source: pakyas-cli/src/cli.rs lines 17-28
/// Output format
#[arg(long, global = true, value_enum, env = "PAKYAS_FORMAT")]
pub format: Option<OutputFormat>,

/// Disable update check
#[arg(long, global = true, env = "PAKYAS_NO_UPDATE_CHECK")]
pub no_update_check: bool,
```

### Existing Sidebar Pattern (from astro.config.mjs)
```javascript
// Source: pakyas-docs/astro.config.mjs lines 105-117
{
    label: "CLI Reference",
    items: [
        { label: "Installation", link: "/cli/" },
        { label: "monitor", link: "/cli/monitor/" },
        { label: "ping", link: "/cli/ping/" },
        { label: "update", link: "/cli/update/" },
        {
            label: "External Monitors",
            link: "/cli/external-monitors/",
        },
    ],
},
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hardcoded UTC output | Configurable timezone display | Current CLI | User preference support |
| Colors always on | NO_COLOR standard env var | Current CLI | Accessibility, CI/CD friendly |
| Update checks always | PAKYAS_NO_UPDATE_CHECK | Current CLI | CI/CD optimization |

**Deprecated/outdated:**
- `PAKYAS_NO_COLOR` - Use standard `NO_COLOR` instead (both supported for compatibility)

## Detailed Requirements Mapping

### UPD-01: Global Flags Update
**File:** `src/content/docs/cli/index.md`
**Section:** Add new "Global Flags" section after existing "Environment Variables"
**Content:**
| Flag | Default | Env Var | Description |
|------|---------|---------|-------------|
| `--display-tz <TZ>` | `local` | `PAKYAS_DISPLAY_TZ` | Timezone: `local` or `utc` |
| `--time <MODE>` | `both` | `PAKYAS_TIME` | Display: `relative`, `absolute`, or `both` |
| `--no-color` | off | `NO_COLOR` | Disable colored output |
| `--plain` | off | - | Plain output without symbols/emojis |
| `--debug-http` | off | - | Print HTTP request/response details |
| `--format <FMT>` | `table` | `PAKYAS_FORMAT` | Output: `table`, `json`, `ndjson`, `yaml` |

### UPD-02: Environment Variables Update
**File:** `src/content/docs/config/env-vars.md`
**Section:** Expand "CLI Options" table
**Add:**
| Variable | Default | Description |
|----------|---------|-------------|
| `PAKYAS_DISPLAY_TZ` | `local` | Timezone for timestamps: `local` or `utc` |
| `PAKYAS_TIME` | `both` | Time display: `relative`, `absolute`, or `both` |
| `PAKYAS_FORMAT` | `table` | Output format: `table`, `json`, `ndjson`, `yaml` |
| `PAKYAS_NO_UPDATE_CHECK` | `false` | Disable background update checks |
| `NO_COLOR` | `false` | Disable colored output (standard env var) |

### UPD-03: Check Delete -y/--yes Flag
**File:** `src/content/docs/cli/index.md`
**Section:** Check Management
**Update:** Add documentation for delete command with confirmation skip flag
```bash
# Delete a check (prompts for confirmation)
pakyas check delete my-check

# Delete without confirmation (use in scripts)
pakyas check delete my-check -y
pakyas check delete my-check --yes
```

### UPD-04: Check Logs --limit Flag
**File:** `src/content/docs/cli/index.md`
**Section:** Check Management
**Update:** Document --limit flag for logs command
```bash
# View ping history (default: 50 entries)
pakyas check logs backup-nightly

# Limit to specific number of entries
pakyas check logs backup-nightly --limit 100
pakyas check logs backup-nightly --limit 10
```

### NAV-01: Sidebar Navigation
**File:** `astro.config.mjs`
**Section:** sidebar array, "CLI Reference" items
**Add entries for:**
- auth -> /cli/auth/
- api-key -> /cli/api-key/
- check doctor -> /cli/check-doctor/
- check inspect -> /cli/check-inspect/
- check tail -> /cli/check-tail/
- completion -> /cli/completion/

**Recommended order (alphabetical for commands):**
1. Installation (existing, keeps top position)
2. auth
3. api-key
4. check doctor
5. check inspect
6. check tail
7. completion
8. monitor (existing)
9. ping (existing)
10. update (existing)
11. External Monitors (existing)

## Open Questions

None. All requirements are well-defined and source code provides complete specifications.

## Sources

### Primary (HIGH confidence)
- `/Users/light/projects/pakyas/pakyas-cli/src/cli.rs` - All flag definitions with env vars, defaults
- `/Users/light/projects/pakyas/pakyas-docs/src/content/docs/cli/index.md` - Existing documentation structure
- `/Users/light/projects/pakyas/pakyas-docs/src/content/docs/config/env-vars.md` - Existing env var documentation
- `/Users/light/projects/pakyas/pakyas-docs/astro.config.mjs` - Sidebar configuration pattern

### Secondary (MEDIUM confidence)
- Phase 1 and Phase 2 research documents - Established patterns for this milestone

## Metadata

**Confidence breakdown:**
- Global flags: HIGH - Direct extraction from cli.rs Clap attributes
- Environment variables: HIGH - Direct extraction from cli.rs env attributes
- Command updates: HIGH - Direct extraction from cli.rs command definitions
- Navigation: HIGH - Following existing astro.config.mjs pattern

**Research date:** 2026-01-24
**Valid until:** 60 days (stable documentation patterns, CLI unlikely to change)
