# Requirements: Pakyas Documentation v1.0

**Defined:** 2026-01-24
**Core Value:** Documentation accurately reflects CLI capabilities

## v1 Requirements

Requirements for CLI documentation sync. Each maps to roadmap phases.

### New Command Documentation

- [x] **CMD-01**: Document `auth` command with all subcommands (status, key list/set/verify/rm)
- [x] **CMD-02**: Document `api-key` command with all subcommands (list, create, revoke)
- [x] **CMD-03**: Document `check doctor` command with --deep and --fail-on flags
- [x] **CMD-04**: Document `check tail` command with --since, --types, --follow flags
- [x] **CMD-05**: Document `check inspect` command for debugging
- [x] **CMD-06**: Document `completion` command for shell completions (bash/zsh/fish/powershell/elvish)

### Documentation Updates

- [ ] **UPD-01**: Update global flags section with --display-tz, --time, --no-color, --plain, --debug-http
- [ ] **UPD-02**: Update environment variables reference with PAKYAS_DISPLAY_TZ, PAKYAS_TIME, NO_COLOR, etc.
- [ ] **UPD-03**: Update `check delete` documentation with -y/--yes flag
- [ ] **UPD-04**: Update `check logs` documentation with --limit flag details

### Navigation

- [ ] **NAV-01**: Add new command pages to sidebar navigation in astro.config.mjs

## Out of Scope

| Feature | Reason |
|---------|--------|
| API endpoint changes | No API changes identified, only CLI |
| New integration guides | Focus on CLI sync only |
| Restructuring existing docs | Additive changes only |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CMD-01 | Phase 1 | Complete |
| CMD-02 | Phase 1 | Complete |
| CMD-03 | Phase 2 | Complete |
| CMD-04 | Phase 2 | Complete |
| CMD-05 | Phase 2 | Complete |
| CMD-06 | Phase 2 | Complete |
| UPD-01 | Phase 3 | Pending |
| UPD-02 | Phase 3 | Pending |
| UPD-03 | Phase 3 | Pending |
| UPD-04 | Phase 3 | Pending |
| NAV-01 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 11 total
- Mapped to phases: 11
- Unmapped: 0

---
*Requirements defined: 2026-01-24*
*Last updated: 2026-01-24 after initial definition*
