# Sprints

> Each sprint gets its own folder: `sprint_01/`, `sprint_02/`, etc.

## Sprint Folder Structure

```
sprint_XX/
├── sprint_XX_index.md         # Sprint goals, status, token budget
├── todo/
│   └── sprint_XX_todo.md      # Task list with acceptance criteria
├── reports/
│   └── sprint_XX_report.md    # What was delivered, what wasn't
└── reviews/
    └── sprint_XX_review.md    # Retrospective, lessons learned
```

## Workflow

1. **CTO** creates the sprint folder and fills in `sprint_XX_index.md`
2. **CTO** sets a token budget and a token guardrail for the sprint
3. **CTO** breaks PRD features into tasks in `todo/sprint_XX_todo.md`
4. **DEV** works through tasks, checking them off
5. **QA** verifies completed tasks
6. **DEV/QA** write the sprint report
7. **Team** does a brief review / retro

## Token-Based Sprinting

Sprints are sized by AI execution budget, not by calendar duration.

- Set a target token budget for each sprint
- Set a guardrail where the team must stop and re-scope
- Budget separately for planning, implementation, testing, and documentation
- If a task threatens the budget, split it or move it to the next sprint

## Naming Convention

- Sprint numbers are zero-padded: `sprint_01`, `sprint_02`, ...
- Files are prefixed with the sprint ID
- One sprint folder per sprint (don't reuse)
