---
phase: 03-updates-navigation
plan: 01
subsystem: cli-docs
tags: [cli, global-flags, documentation, navigation]

# Dependency graph
requires:
  - phase: 01-auth-apikey-docs
    provides: "auth and api-key command documentation pages"
  - phase: 02-check-commands
    provides: "check-doctor, check-inspect, check-tail, completion documentation pages"
provides:
  - "Global flags section documenting --display-tz, --time, --no-color, --plain, --debug-http, --format"
  - "Check delete command with -y/--yes flag examples"
  - "Check logs command with --limit flag documentation"
  - "Navigation links to all new CLI command pages"
affects: [sidebar-integration, cli-reference]

# Tech tracking
tech-stack:
  added: []
  patterns: []

key-files:
  created: []
  modified:
    - "src/content/docs/cli/index.md"

key-decisions:
  - "Added global flags as new section after Environment Variables for better discoverability"
  - "Included environment variable mappings in global flags table for cross-reference"
  - "Documented check delete with examples showing both interactive and non-interactive modes"

patterns-established: []

# Metrics
duration: 1 min
completed: 2026-01-24
---

# Phase 3 Plan 1: CLI Index Updates Summary

**Global flags section with 6 flags, check delete/logs updates, and navigation links to all new command pages**

## Performance

- **Duration:** 1 min
- **Started:** 2026-01-24T12:09:50Z
- **Completed:** 2026-01-24T12:11:47Z
- **Tasks:** 3
- **Files modified:** 1

## Accomplishments
- Added comprehensive Global Flags section documenting all 6 CLI-wide flags with defaults and env var mappings
- Updated Check Management section with delete command examples showing -y/--yes flag for scripting
- Expanded logs command documentation with --limit flag examples and default behavior
- Added navigation links to all 6 new command pages created in Phases 1 and 2

## Task Commits

Each task was committed atomically:

1. **Task 1: Add Global Flags section to CLI index** - `90b1039` (docs)
2. **Task 2: Update Check Management section with new flags** - `f20140a` (docs)
3. **Task 3: Add See Also links for new command pages** - `bda4d07` (docs)

**Plan metadata:** (to be created in final commit)

## Files Created/Modified
- `src/content/docs/cli/index.md` - Added Global Flags section, updated Check Management with delete/logs examples, added navigation links to new command pages

## Decisions Made
- **Global flags placement:** Added as new top-level section after Environment Variables to maintain logical flow (config sources, then global options, then specific commands)
- **Environment variable mapping:** Included env var column in global flags table to help users understand persistent configuration options
- **Delete command examples:** Showed both interactive (default) and non-interactive (-y/--yes) modes to cover both manual and scripting use cases
- **Navigation organization:** Placed new command links at start of Next Steps section in logical grouping (auth, checks, completion) before existing links

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

CLI index documentation now complete with:
- All global flags documented
- All command flags updated (delete -y/--yes, logs --limit)
- Navigation to all Phase 1 and Phase 2 command pages

Ready for:
- Sidebar integration (phase plan 03-02 or future work)
- Additional CLI documentation as new commands/features are added

---
*Phase: 03-updates-navigation*
*Completed: 2026-01-24*
