# Technical Feature Specs

This directory holds **technical specifications for the software side** of the repo — the character sheet app, content pipeline, and site features. Game design analysis does NOT belong here; that lives in [`/docs/analysis/`](../docs/analysis/).

## Conventions

- One spec per feature, named `issue-XXX-feature-name-spec.md` when tied to a GitHub issue.
- Track status inline with ✅ ⚠️ ❌ and dated update sections.
- Update the spec when the implementation state changes — specs describe reality, not aspiration.

## Current Specs

| Spec | Topic | Status |
|------|-------|--------|
| [issue-160-notion-import-feature-spec.md](./issue-160-notion-import-feature-spec.md) | Notion import automation — main spec, usage, roadmap | ⚠️ 1 blocking bug |
| [issue-160-implementation-details.md](./issue-160-implementation-details.md) | Notion import — architecture, config schema, file flow | Reference |
| [issue-160-outstanding-bugs.md](./issue-160-outstanding-bugs.md) | Notion import — pages with inline databases lose descriptive content on import | 🚨 Blocking |
| [character-sheet-ux-spec.md](./character-sheet-ux-spec.md) | Character sheet UX design | Reference |
| [unified-character-sheet-card.md](./unified-character-sheet-card.md) | Unified character card UI | Reference |
| [refactoring-plan.md](./refactoring-plan.md) | Character sheet code refactoring roadmap (incl. the unfinished `reducers/` action-file split) | In progress |

## Notion Import Status (2025-12-09)

✅ Working: HTML→Markdown conversion, database processing from HTML parent files, folk inline image injection, smart blank-line spacing, 73+ pages mapped.

🚨 Blocking: pages with inline databases (upbringing, background, talents overview) lose descriptive content when the database import overwrites them — needs a merge strategy. Affected files were temporarily restored from main.

Next steps: implement merge strategy → re-run import and validate affected files → final testing.
