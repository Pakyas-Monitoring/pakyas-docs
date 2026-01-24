# Phase 2: Check Command Docs - Research

**Researched:** 2026-01-24
**Domain:** CLI documentation for diagnostic, monitoring, and shell integration commands
**Confidence:** HIGH

## Summary

This phase documents four CLI commands: `check doctor`, `check tail`, `check inspect`, and `completion`. Research focused on understanding the actual CLI implementations from source code, identifying documentation patterns established in Phase 1, and understanding shell completion installation paths.

All four commands are fully implemented in the CLI codebase with clear flag definitions. The documentation pattern from Phase 1 (auth.md and api-key.md) provides a consistent template: frontmatter with title/description, command sections with Usage/Flags/Examples structure, and Starlight asides for callouts.

**Primary recommendation:** Follow Phase 1 documentation patterns exactly. Each command page should have consistent structure with Usage, Flags (as tables), What It Shows, and Examples sections. Use Starlight asides (:::tip, :::note, :::caution) for highlighting important information.

## Standard Stack

The established libraries/tools for this documentation:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Starlight | Current | Astro-based docs framework | Already in use for pakyas-docs |
| Markdown | - | Documentation content | Native Starlight support |

### Supporting
| Component | Purpose | When to Use |
|-----------|---------|-------------|
| Starlight Asides | Callout boxes | Tips, notes, cautions, warnings |
| Code blocks | Command examples | All CLI examples with `bash` syntax |
| Tables | Flag documentation | Consistent flag/argument reference |

### Starlight Aside Types
| Type | Use Case | Example |
|------|----------|---------|
| `:::note` | Additional context | Differentiating similar commands |
| `:::tip` | Best practices | Workflow recommendations |
| `:::caution` | Potential issues | Things that might trip users up |
| `:::danger` | Destructive actions | Irreversible operations |

**Source:** [Starlight Asides Documentation](https://starlight.astro.build/components/asides/)

## Architecture Patterns

### Documentation File Structure
```
src/content/docs/cli/
├── index.md              # CLI overview (existing)
├── auth.md               # Phase 1 (done)
├── api-key.md            # Phase 1 (done)
├── check-doctor.md       # Phase 2 - CMD-03
├── check-tail.md         # Phase 2 - CMD-04
├── check-inspect.md      # Phase 2 - CMD-05 (combined with check-tail or separate?)
└── completion.md         # Phase 2 - CMD-06
```

### Documentation Page Pattern (from Phase 1)
```markdown
---
title: [command] Command
description: [one-line description]
---

[Introductory paragraph explaining command purpose]

## [subcommand/variant]

[Brief description]

### Usage

\`\`\`bash
pakyas [command] [args] [flags]
\`\`\`

### Flags

| Flag | Description |
|------|-------------|
| `--flag <VALUE>` | What it does |

### What It Shows / Behavior (for output-focused commands)

- Bullet list of output elements

### Examples

\`\`\`bash
# Example with comment
pakyas command example
\`\`\`

## See Also

- [Related Command](./related/) - Description
```

### Command-Specific Structures

**check doctor** - Diagnostic command with exit codes:
- Emphasize --deep flag for comprehensive analysis
- Document --fail-on severity levels (error, warning, info)
- Document exit code behavior for CI/CD integration

**check tail** - Streaming/follow command:
- Emphasize --follow mode behavior
- Document --since format (duration strings and ISO timestamps)
- Document --types filtering (signal, state, alert)
- Document output formats (human-readable, JSON, NDJSON)

**check inspect** - Debug/state command:
- Single command, no subcommands
- Focus on output sections (STATE, SCHEDULE, LAST SIGNAL, ALERTING, MAINTENANCE, STATS)
- Note: Less flags than doctor/tail, primarily for debugging

**completion** - Shell completions:
- Shell-specific installation instructions
- Cover all 5 shells: bash, zsh, fish, powershell, elvish
- Include verification steps

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Callout boxes | Custom HTML/CSS | Starlight :::note, :::tip, :::caution | Native framework support, consistent styling |
| Flag tables | Prose descriptions | Markdown tables | Scannable, consistent with Phase 1 |
| Shell paths | Inline in prose | Table format | Cross-reference easier |
| Exit codes | Prose explanation | Table format | Quick reference for CI/CD users |

**Key insight:** Phase 1 established patterns that must be followed for consistency. Don't invent new structures.

## Common Pitfalls

### Pitfall 1: Incomplete Shell Completion Instructions
**What goes wrong:** Users follow instructions but completions don't work
**Why it happens:** Shell-specific setup varies (sourcing, fpath, compinit)
**How to avoid:** Include complete setup for each shell, not just file path
**Warning signs:** Documentation only shows output redirect, not activation

### Pitfall 2: Missing Output Format Documentation
**What goes wrong:** Users don't know about --format json/ndjson options
**Why it happens:** Focus on human-readable output only
**How to avoid:** Document all output modes for commands that support them (tail, doctor, inspect)
**Warning signs:** Only showing human-readable examples

### Pitfall 3: Undocumented Exit Codes
**What goes wrong:** CI/CD pipelines behave unexpectedly
**Why it happens:** Doctor command has special exit code behavior with --fail-on
**How to avoid:** Explicitly document exit code 78 (ISSUES) and when it triggers
**Warning signs:** No mention of exit codes for doctor command

### Pitfall 4: Duration Format Ambiguity
**What goes wrong:** Users use wrong format for --since flag
**Why it happens:** Multiple formats accepted (30m, 1h, ISO timestamp)
**How to avoid:** Show all accepted formats in examples
**Warning signs:** Only showing one format style

### Pitfall 5: inspect vs doctor Confusion
**What goes wrong:** Users don't know which command to use
**Why it happens:** Both are "debugging" commands with different purposes
**How to avoid:** Clear differentiation in introduction text
**Warning signs:** No cross-reference between the two commands

## Code Examples

Verified patterns from CLI source code:

### check doctor Command
```bash
# Source: pakyas-cli/src/commands/check/doctor.rs, cli.rs

# Basic diagnostic
pakyas check doctor my-check

# Deep analysis (slower but more comprehensive)
pakyas check doctor my-check --deep

# Fail on warnings (for CI/CD)
pakyas check doctor my-check --fail-on warning

# Fail on any finding
pakyas check doctor my-check --fail-on info

# JSON output
pakyas check doctor my-check --format json
```

### check tail Command
```bash
# Source: pakyas-cli/src/commands/check/tail.rs, cli.rs

# Default: last 30 minutes of events
pakyas check tail my-check

# Custom time range
pakyas check tail my-check --since 1h
pakyas check tail my-check --since 2024-01-01T00:00:00Z

# Follow mode (continuous polling)
pakyas check tail my-check --follow

# Filter by event type
pakyas check tail my-check --types signal
pakyas check tail my-check --types state,alert

# Combine options
pakyas check tail my-check --since 1h --types signal --follow

# NDJSON output for streaming
pakyas check tail my-check --follow --format ndjson
```

### check inspect Command
```bash
# Source: pakyas-cli/src/commands/check/inspect.rs, cli.rs

# Inspect check state
pakyas check inspect my-check

# JSON output
pakyas check inspect my-check --format json
```

### completion Command
```bash
# Source: pakyas-cli/src/commands/completion.rs, cli.rs

# Generate bash completions
pakyas completion bash > ~/.local/share/bash-completion/completions/pakyas

# Generate zsh completions
pakyas completion zsh > ~/.zfunc/_pakyas

# Generate fish completions
pakyas completion fish > ~/.config/fish/completions/pakyas.fish

# Generate powershell completions
pakyas completion powershell >> $PROFILE

# Generate elvish completions
pakyas completion elvish > ~/.config/elvish/lib/pakyas.elv
```

### Shell Completion Installation Paths
| Shell | Completion Path | Additional Setup |
|-------|-----------------|------------------|
| Bash | `~/.local/share/bash-completion/completions/pakyas` | Source or restart shell |
| Zsh | `~/.zfunc/_pakyas` | Add to fpath, run `compinit` |
| Fish | `~/.config/fish/completions/pakyas.fish` | Automatic |
| PowerShell | Append to `$PROFILE` | Restart PowerShell |
| Elvish | `~/.config/elvish/lib/pakyas.elv` | Import in rc.elv |

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| check logs only | check tail for streaming | Current CLI | Real-time event monitoring |
| Manual debugging | check inspect + doctor | Current CLI | Structured diagnostics |
| Manual completion setup | completion subcommand | clap-complete pattern | Standardized shell support |

**Deprecated/outdated:**
- None identified; these are new commands being documented

## Command Details from Source

### check doctor (CMD-03)
**Source:** `/Users/light/projects/pakyas/pakyas-cli/src/commands/check/doctor.rs`
**Source:** `/Users/light/projects/pakyas/pakyas-cli/src/cli.rs` (lines 316-328)

**Arguments:**
- `slug` (required): Check slug or ID

**Flags:**
- `--deep`: Perform deep analysis (slower but more comprehensive)
- `--fail-on <SEVERITY>`: Exit with error code if findings meet severity threshold
  - Values: `error` (default), `warning`, `info`

**Exit Codes:**
- 0: No issues or below threshold
- 78 (ISSUES): Findings at or above --fail-on threshold

**Output:**
- Status: healthy, attention_needed, critical
- Findings with severity (error, warning, info)
- Suggested actions for each finding
- Evidence/details for findings

### check tail (CMD-04)
**Source:** `/Users/light/projects/pakyas/pakyas-cli/src/commands/check/tail.rs`
**Source:** `/Users/light/projects/pakyas/pakyas-cli/src/cli.rs` (lines 330-350)

**Arguments:**
- `slug` (required): Check slug or ID

**Flags:**
- `--since <TIME>`: Show events since this time (default: "30m")
  - Accepts: duration strings (30m, 1h, 2d) or ISO timestamps
- `--types <TYPES>`: Event types to show (comma-separated)
  - Values: signal, state, alert
- `--follow` / `-f`: Follow mode, continuously poll for new events
- `--limit <N>`: Number of events to fetch per request (default: 50)

**Output Modes:**
- Human-readable (default): Formatted event lines with symbols
- JSON (--format json): All events as JSON array
- NDJSON (--format ndjson): Stream each event as JSON line

**Event Types:**
- signal: run_started, run_finished
- state: status_changed
- alert: alert_decision

### check inspect (CMD-05)
**Source:** `/Users/light/projects/pakyas/pakyas-cli/src/commands/check/inspect.rs`
**Source:** `/Users/light/projects/pakyas/pakyas-cli/src/cli.rs` (lines 310-314)

**Arguments:**
- `slug` (required): Check slug or ID

**Flags:**
- None specific (uses global --format, --verbose)

**Output Sections:**
1. CHECK: ID, name, ping URL
2. STATE: Current status, since when, critical flag
3. SCHEDULE: Kind (cron/interval), expression/period, timezone, grace period
4. LAST SIGNAL: Type, timestamp, duration, source IP
5. ALERTING: Enabled, thresholds, consecutive counts, recipient count
6. MAINTENANCE: Active status, reason, end time
7. STATS (24h): Success rate, ping count, P95 latency

### completion (CMD-06)
**Source:** `/Users/light/projects/pakyas/pakyas-cli/src/commands/completion.rs`
**Source:** `/Users/light/projects/pakyas/pakyas-cli/src/cli.rs` (lines 107-112)

**Arguments:**
- `shell` (required): Shell to generate completions for
  - Values: bash, zsh, fish, powershell, elvish

**Behavior:**
- Outputs completion script to stdout
- Prints helpful installation message to stderr
- Uses clap_complete for generation

## Open Questions

Things that couldn't be fully resolved:

1. **check inspect as separate page or combined with check-tail?**
   - What we know: Both are "check" subcommands, inspect has minimal flags
   - What's unclear: User preference for page organization
   - Recommendation: Separate page per requirements (CMD-05 is distinct from CMD-04), but keep pages concise

2. **PowerShell and Elvish completion installation details**
   - What we know: CLI outputs to stdout, basic paths known
   - What's unclear: Complete setup instructions for these less common shells
   - Recommendation: Document basic usage, note that shell documentation provides complete setup

## Sources

### Primary (HIGH confidence)
- `/Users/light/projects/pakyas/pakyas-cli/src/cli.rs` - Command definitions with all flags
- `/Users/light/projects/pakyas/pakyas-cli/src/commands/check/doctor.rs` - Doctor implementation
- `/Users/light/projects/pakyas/pakyas-cli/src/commands/check/tail.rs` - Tail implementation
- `/Users/light/projects/pakyas/pakyas-cli/src/commands/check/inspect.rs` - Inspect implementation
- `/Users/light/projects/pakyas/pakyas-cli/src/commands/completion.rs` - Completion implementation
- `/Users/light/projects/pakyas/pakyas-docs/src/content/docs/cli/auth.md` - Phase 1 pattern reference
- `/Users/light/projects/pakyas/pakyas-docs/src/content/docs/cli/api-key.md` - Phase 1 pattern reference

### Secondary (MEDIUM confidence)
- [Starlight Asides Documentation](https://starlight.astro.build/components/asides/) - Callout syntax
- [Starlight Authoring Content](https://starlight.astro.build/guides/authoring-content/) - Markdown patterns
- [Kevin K's Blog - CLI Shell Completions](https://kbknapp.dev/shell-completions/) - Shell completion best practices

### Tertiary (LOW confidence)
- WebSearch for shell completion paths - verified against CLI source stderr output

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Using existing Starlight framework
- Architecture: HIGH - Following established Phase 1 patterns
- Pitfalls: HIGH - Based on actual CLI source code review

**Research date:** 2026-01-24
**Valid until:** 30 days (stable documentation patterns)
