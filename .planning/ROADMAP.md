# Roadmap: Pakyas Documentation v1.0

**Created:** 2026-01-24
**Milestone:** v1.0 — CLI Documentation Sync

## Overview

| Phase | Name | Goal | Requirements |
|-------|------|------|--------------|
| 1 | Auth & API Key Docs | Document authentication and API key management commands | CMD-01, CMD-02 |
| 2 | Check Command Docs | Document advanced check commands (doctor, tail, inspect, completion) | CMD-03, CMD-04, CMD-05, CMD-06 |
| 3 | Updates & Navigation | Update existing docs with new flags and add navigation entries | UPD-01, UPD-02, UPD-03, UPD-04, NAV-01 |

## Phase Details

### Phase 1: Auth & API Key Docs

**Goal:** Document the `auth` and `api-key` commands so users can manage credentials and API keys from the CLI.

**Requirements:** CMD-01, CMD-02

**Plans:** 1 plan

**Status:** Complete

Plans:
- [x] 01-01-PLAN.md — Create auth.md and api-key.md documentation

**Success Criteria:**
1. User can find documentation for `pakyas auth status` command
2. User can find documentation for `pakyas auth key` subcommands (list, set, verify, rm)
3. User can find documentation for `pakyas api-key list/create/revoke` commands
4. Documentation includes examples for common workflows (storing keys per org, creating scoped keys)

**Deliverables:**
- `src/content/docs/cli/auth.md` — Auth command reference
- `src/content/docs/cli/api-key.md` — API key management reference

---

### Phase 2: Check Command Docs

**Goal:** Document advanced check commands for diagnostics, monitoring, and shell integration.

**Requirements:** CMD-03, CMD-04, CMD-05, CMD-06

**Plans:** 2 plans

**Status:** Complete

Plans:
- [x] 02-01-PLAN.md — Create check-doctor.md and check-tail.md documentation
- [x] 02-02-PLAN.md — Create check-inspect.md and completion.md documentation

**Success Criteria:**
1. User can find documentation for `pakyas check doctor` with all flags
2. User can find documentation for `pakyas check tail` for streaming events
3. User can find documentation for `pakyas check inspect` for debugging
4. User can find documentation for `pakyas completion` with shell-specific instructions
5. Documentation includes practical examples for troubleshooting workflows

**Deliverables:**
- `src/content/docs/cli/check-doctor.md` — Check diagnostics reference
- `src/content/docs/cli/check-tail.md` — Event streaming reference
- `src/content/docs/cli/check-inspect.md` — Check state inspection reference
- `src/content/docs/cli/completion.md` — Shell completions guide

---

### Phase 3: Updates & Navigation

**Goal:** Update existing documentation with new flags and ensure all new pages are accessible from navigation.

**Requirements:** UPD-01, UPD-02, UPD-03, UPD-04, NAV-01

**Plans:** 2 plans

Plans:
- [ ] 03-01-PLAN.md — Update CLI index with global flags and command flag updates
- [ ] 03-02-PLAN.md — Update environment variables and add sidebar navigation

**Success Criteria:**
1. Global flags section includes --display-tz, --time, --no-color, --plain, --debug-http
2. Environment variables reference includes all new variables
3. `check delete` documentation shows -y/--yes flag
4. `check logs` documentation shows --limit flag
5. All new pages appear in sidebar navigation
6. Navigation structure is logical and consistent

**Deliverables:**
- Updated `src/content/docs/cli/index.md` — Global flags and env vars
- Updated command pages with new flags
- Updated `astro.config.mjs` — Sidebar navigation entries

---

## Coverage Validation

| Requirement | Phase | Covered |
|-------------|-------|---------|
| CMD-01 | 1 | Yes |
| CMD-02 | 1 | Yes |
| CMD-03 | 2 | Yes |
| CMD-04 | 2 | Yes |
| CMD-05 | 2 | Yes |
| CMD-06 | 2 | Yes |
| UPD-01 | 3 | Yes |
| UPD-02 | 3 | Yes |
| UPD-03 | 3 | Yes |
| UPD-04 | 3 | Yes |
| NAV-01 | 3 | Yes |

**Total:** 11 requirements | **Mapped:** 11 | **Coverage:** 100%

---
*Roadmap created: 2026-01-24*
