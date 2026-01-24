---
phase: 02-check-command-docs
plan: 01
subsystem: docs
tags: [cli, starlight, check-doctor, check-tail, diagnostic, streaming]

# Dependency graph
requires:
  - phase: 01-auth-api-key-docs
    provides: Documentation pattern (frontmatter, tables, examples, callouts)
provides:
  - check doctor command documentation with exit codes
  - check tail command documentation with streaming options
affects: [02-02, 03-updates-navigation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Exit codes table for CI/CD commands
    - Event types reference table
    - Duration format documentation

key-files:
  created:
    - src/content/docs/cli/check-doctor.md
    - src/content/docs/cli/check-tail.md
  modified: []

key-decisions:
  - "Used Status Levels table for doctor output explanation"
  - "Included NDJSON streaming examples with pipeline integration tip"

patterns-established:
  - "Exit codes section for commands with CI/CD use cases"
  - "Duration Format section for commands accepting time inputs"
  - "Event Types table for commands with filterable content"

# Metrics
duration: 2min
completed: 2026-01-24
---

# Phase 2 Plan 1: Check Doctor and Tail Documentation Summary

**Diagnostic and streaming command documentation with CI/CD exit codes, event type filtering, and NDJSON pipeline examples**

## Performance

- **Duration:** 2 min
- **Started:** 2026-01-24T11:39:16Z
- **Completed:** 2026-01-24T11:40:53Z
- **Tasks:** 2
- **Files created:** 2

## Accomplishments

- Documented check doctor command with --deep, --fail-on, --format flags and exit code behavior
- Documented check tail command with --since duration format, --types filtering, and --follow streaming
- Added CI/CD integration examples for both commands
- Established patterns for exit codes and event type documentation

## Task Commits

Each task was committed atomically:

1. **Task 1: Create check-doctor.md documentation** - `e903f8e` (docs)
2. **Task 2: Create check-tail.md documentation** - `1bb3376` (docs)

## Files Created

- `src/content/docs/cli/check-doctor.md` - Diagnose check configuration and health issues with exit codes
- `src/content/docs/cli/check-tail.md` - Stream real-time events with duration format and event type filtering

## Decisions Made

- Used Status Levels table (healthy, attention_needed, critical) to explain doctor output
- Included NDJSON streaming tip for pipeline integration with --follow
- Documented both duration strings (30m, 1h, 2d) and ISO timestamp formats for --since

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- check-doctor.md and check-tail.md ready for sidebar integration in Phase 3
- Cross-references to check-inspect.md included (will link once that file is created in 02-02)
- Remaining Phase 2 plan: check-inspect.md and completion.md

---
*Phase: 02-check-command-docs*
*Completed: 2026-01-24*
