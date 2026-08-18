# Feature Spec: Ability Tags — Data Integration & Character Sheet Filtering

**Status**: 📋 Proposed — not started
**Design doc**: [`docs/analysis/systems/ability-tags.md`](../docs/analysis/systems/ability-tags.md) (taxonomy + application guidelines)
**Audit data**: [`docs/analysis/systems/ability-tags-audit.md`](../docs/analysis/systems/ability-tags-audit.md) (per-ability tag assignments, Appendices A–F)

---

## Executive Summary

The ability tag system defines a fixed vocabulary of **60 tags across 5 groups** (Effect, Action Economy, Damage Type, Condition, Weapon Category) for folk abilities, talents, combat arts, and spells. The taxonomy is designed and the full per-ability audit is complete — every existing ability has assigned tags sitting in the audit document.

What remains is the app work: getting those tags into the canonical content JSON, rendering them, validating them, and building filtering on top. This spec covers that work as Phases 3 and 4 of the overall migration.

**Current ground truth** (verified 2026-08-18):

- No `tags` key exists in any of the five target JSON files (`folk.json`, `combat-arts.json`, `talents.json`, `arcane-spells.json`, `mystic-spells.json`).
- No code in `src/` references the ability tag system in any form.
- The only "tags" in the data layer today are in `creature-abilities-library.json`, which uses an **unrelated vocabulary** (`combat`, `ally`, `defensive`, shape identifiers, …). See the non-goal below.

---

## Migration Strategy (from the design doc)

The overall migration has four phases. Phases 1–2 are complete and live in the analysis docs; this spec owns Phases 3–4.

### Phase 1: Documentation ✅ Complete

- Define all tag groups and their fixed sets of tags (design doc).
- Establish guidelines for how to apply tags to each ability type.
- Provide example taggings for representative abilities from each type.

### Phase 2: Ability Audit ✅ Complete

- All folk abilities (~30 across 10+ folk), talents (~115 across 16 skills), combat arts (~45 basic + supreme), and spells (~230 across 14 traditions/disciplines) reviewed and tagged.
- Results compiled as reference tables in the audit document (Appendices A–F), including summary statistics and a list of stub/placeholder abilities whose tags are provisional.

### Phase 3: Data Integration ⬜ Open (this spec, part 1)

Add tags to the canonical content JSON and surface them through the existing generation pipeline.

### Phase 4: Validation Tooling & Filtering UI ⬜ Open (this spec, part 2)

Enforce the fixed vocabulary in CI and expose tag-based filtering in the character sheet app.

---

## Phase 3: Data Integration

### Requirements

1. Each ability entry in the five canonical JSON files gains a `tags` field: a flat string array drawn only from the 60-tag vocabulary defined in the design doc.
   - `src/utils/data/json/folk.json`
   - `src/utils/data/json/combat-arts.json`
   - `src/utils/data/json/talents.json`
   - `src/utils/data/json/arcane-spells.json`
   - `src/utils/data/json/mystic-spells.json`
2. Tag values are sourced from the audit tables in `docs/analysis/systems/ability-tags-audit.md`. The audit is the authoritative assignment record for this migration; discrepancies discovered during entry (renamed abilities, new content added since the audit) are resolved against the current ability text using the design doc's application guidelines, and the audit doc is updated to match.
3. Abilities flagged as stubs/placeholders in the audit (Appendix D observation 6, Appendix F observation 6) still receive their provisional tags — provisional is better than absent, and the validation tooling (Phase 4) will re-check them when their text is finalized.

### Pipeline constraints

These five content types are **JSON-canonical**: the docs pages are generated from the JSON via `bun run content:gen` and gated in CI by `bun run content:check`. Consequences:

- The generators (talents, combat arts, spells, and the folk rendering path) must at minimum **tolerate** the new `tags` field without failing their shape checks. The generators intentionally fail the build on unexpected/malformed data, so this is a required code change, not an optional one.
- Whether the generated MDX **renders** the tags (e.g., as chips on the codex cards) is a product decision to make during implementation. Rendering is desirable for the "at-a-glance clarity" goal but can land as a follow-up after the data lands; tolerating the field cannot.
- Never hand-edit the generated `.mdx` — the flow is always JSON edit → `content:gen` → green `content:check`.

### Non-goal: creature ability tags

`src/utils/data/json/creature-abilities-library.json` already has a `tags` field using an unrelated, creature-design-internal vocabulary (`combat`, `ally`, `defensive`, shape/retaliation identifiers). That system serves the creature builder and is **not** part of this taxonomy. Do not conflate the two: no shared validation, no shared types, no migration of creature tags to the 60-tag vocabulary.

---

## Phase 4: Validation Tooling & Character Sheet Filtering

### Validation requirements

1. A check script (pattern: the existing `content:check` / `sigils:check` gates) validates every `tags` array in the five JSON files against the fixed vocabulary:
   - Every tag is one of the 60 defined tags (no typos, no ad-hoc additions).
   - Every ability has at least one Effect-group tag (mandatory per the design guidelines).
   - Group-specific rules where cheaply checkable, e.g. Weapon Category tags only on combat arts and weapon-specific talents.
2. The vocabulary lives in one code-level constant (grouped by the five tag groups) that both the validator and the UI consume — the design doc remains the human-readable source, the constant is its executable mirror.
3. The check runs in the PR CI workflow alongside the existing gates, so the vocabulary cannot drift silently. New tags require editing the design doc and the constant together.

### Character sheet filtering requirements

Scope: `src/features/CharacterSheet/` (read its CLAUDE.md before implementing).

1. Ability lists in the character sheet (talents, combat arts, spells, folk abilities) support filtering by tag, at minimum by Effect and Action Economy groups — the two groups the design doc names as the primary filtering axes (e.g., all `healing` abilities usable as a `quick-action`).
2. Tags are displayed on ability entries for at-a-glance reference. Follow the codex-theme conventions for chip styling; do not invent a new chip variant.
3. Filtering is client-side over the already-loaded JSON data — no new data fetching.
4. Type support: the ability-shaped types in `src/types/Character.ts` (and any feature-local types) gain an optional `tags?: string[]` field, optional so that existing saved character documents in Firestore remain valid without migration.

### Design checklist function (ongoing)

Once tags are live, they double as a design checklist for new content:

- Every new ability must be taggable using the existing 60 tags. The design skills' publication pipelines should include tag assignment as a publication step.
- Gaps where an ability cannot be cleanly tagged trigger a review: either the ability needs clarification, or (rarely) the vocabulary needs a new tag. Tags are not expanded casually — any new tag is reviewed against the full existing set to avoid duplication, and requires updating the design doc, the code constant, and this spec's count references together.

---

## Suggested Approach & Ordering

1. **Generators first**: make the five generators tolerate `tags` (shape-check change only). Small, unblocks everything.
2. **Vocabulary constant + validator**: land the tag constant and the check script with zero tagged abilities — validator passes trivially, CI wiring proven.
3. **Data entry**: populate `tags` across the five JSON files from the audit doc, one file per commit-sized unit (folk → combat arts → talents → arcane spells → mystic spells). Run the validator after each.
4. **Rendering**: add tag chips to the generated MDX cards (product decision checkpoint here).
5. **Filtering UI**: character sheet filter controls + display.

Steps 1–3 complete Phase 3; steps 4–5 complete Phase 4. Each step leaves CI green independently.

## Open Questions

- Should the generated docs pages render all five tag groups, or only Effect + Action Economy (with the rest visible only in the app)?
- Should filtering support multi-tag AND queries (`healing` AND `quick-action`) in v1, or single-tag filters first?
- Where exactly does tag assignment slot into each design skill's Publication Pipeline section? (Requires a small edit to each skill once the pipeline exists.)
