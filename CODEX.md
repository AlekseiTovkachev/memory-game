# Memory Pairs — Codex Project Context

> **Stack:** React + Vite + TypeScript
> **Purpose:** Local browser memory pairs game for casual players
>
> This is the Codex project context file.
> `CLAUDE.md` is the parallel Claude project context file. Keep both in sync when project commands, structure, or standards change.

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Name** | Memory Pairs |
| **Purpose** | Local browser memory pairs game for casual players |
| **Current sprint** | Sprint 01 |
| **Dev port** | 3000 |

---

## 2. Key Commands

```bash
npm run dev                    # Start dev server
npm run build                  # Production build and type check
npm run test                   # Run unit/component tests
npm run smoke                  # Build, unit tests, and E2E tests

# E2E Testing (Playwright)
npx playwright test                # Run all E2E tests
npx playwright test --ui           # Interactive UI mode
npx playwright test --debug        # Debug mode
```

> E2E tests auto-start the dev server if `webServer` is configured in `playwright.config.ts`.

---

## 3. Definition of Done

```
A FEATURE IS "DONE" ONLY WHEN:
  1. Code works — dev server runs without errors
  2. Tests pass — unit tests cover the new logic
  3. E2E pass — browser tests on affected flows (if UI changed)
  4. No regressions — existing features still work
  5. Reviewed — teammate or CTO has seen the code
  6. Screenshots — captured for GUI changes (tests/screenshots/)
```

**NEVER mark done based on "it compiles" alone.**

---

## 4. Project Structure

```
memory-game/
├── CODEX.md                 # Project context for Codex
├── CLAUDE.md                # Parallel Claude project context
├── AGENTS.md                # Role definitions (CTO, DEV, QA)
├── README.md                # Project README
├── .env.example             # Environment variables template
├── playwright.config.ts     # Playwright E2E configuration
│
├── .codex/
│   └── commands/            # Codex role and workflow prompts
│
├── .claude/
│   ├── settings.local.json  # Tool permissions for Claude
│   └── commands/            # Claude slash commands
│
├── backend/
│   ├── AGENTS.md            # Backend domain rules
│   └── modules/
│       └── _example/        # Reference module (copy to start new)
│           ├── README.md
│           ├── src/          # Models, services, API routes
│           └── tests/        # unit/ and integration/
│
├── frontend/
│   ├── AGENTS.md            # Frontend domain rules
│   └── modules/
│       └── _example/        # Reference module (copy to start new)
│           ├── README.md
│           ├── src/          # Components, hooks, utils
│           └── tests/        # unit/ and integration/
│
├── tests/
│   ├── e2e/                 # Playwright E2E test files
│   └── screenshots/         # GUI screenshots (captured by tests)
│
└── docs/
    ├── PRD.md               # Product requirements
    ├── ARCHITECTURE.md      # Technical architecture
    ├── DECISIONS.md         # Decision log
    ├── knowledge/           # Research, references, domain knowledge
    ├── ui/
    │   └── UI_KIT.md        # Design system tokens
    └── sprints/
        └── sprint_01/       # Sprint artifacts (index, todo, reports)
```

---

## 5. Environment Variables

The MVP does not require environment variables. Copy `.env.example` → `.env` only if future features add provider integrations.

```
# No variables are required for the local-only MVP.
```

Claude-specific workflow prompts remain available in `CLAUDE.md` and `.claude/commands/`.

---

## 6. Available Codex Prompts

| Prompt file | Purpose |
|---|---|
| `.codex/commands/cto.md` | Activate CTO role — architecture & planning |
| `.codex/commands/dev.md` | Activate DEV role — implementation |
| `.codex/commands/qa.md` | Activate QA role — testing & quality |
| `.codex/commands/plan.md` | Force plan-first workflow before complex work |
| `.codex/commands/test.md` | Run full test suite |
| `.codex/commands/e2e.md` | Run Playwright E2E browser tests |

---

## 7. Role Tags

| Tag | Who |
|---|---|
| `[CTO]` | Architecture, tech decisions, code review |
| `[DEV]` | Implementation, features, bug fixes |
| `[DEV:backend]` | Backend module implementation |
| `[DEV:frontend]` | Frontend module implementation |
| `[QA]` | Testing, quality gates, bug discovery |
| `[FOUNDER]` | Human operator — final decision maker |

> Reading order: domain `AGENTS.md` (e.g., `backend/AGENTS.md`) → root `AGENTS.md` → `docs/PRD.md`

---

## 8. Testing Strategy

| Level | Location | Tool | When |
|-------|----------|------|------|
| **Unit** | `*/modules/*/tests/unit/` | Jest / pytest / vitest | Every feature |
| **Integration** | `*/modules/*/tests/integration/` | Framework test runner | Cross-module features |
| **E2E** | `tests/e2e/` | Playwright | Every UI change |
| **Screenshots** | `tests/screenshots/` | Playwright | Every UI change |

---

## 9. What NOT to Do

- Do NOT silently expand scope beyond the current task
- Do NOT add dependencies without discussing with the team
- Do NOT mark features done without actually testing them
- Do NOT skip writing tests for new logic
- Do NOT hardcode secrets or credentials
- Do NOT import directly across modules — use shared interfaces
