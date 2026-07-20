# Nexus RPG

Nexus RPG is a sword & sorcery tabletop RPG inspired by ancient Bronze Age cultures (Mesopotamian, Egyptian, Persian, and others). This repo contains both the **game rules** (a Docusaurus documentation site) and an **interactive character sheet app** embedded in it.

Work here falls into two distinct modes:

1. **Game design** — creating/revising rules content in `/docs/` (spells, talents, creatures, items). Use the design skills in `.claude/skills/` — they encode the design principles, power scaling, and validation workflows.
2. **Software development** — the Docusaurus site and the React character sheet app in `/src/`.

## Tech Stack

Docusaurus 3.8+, React 18, Redux Toolkit, Material-UI 5, Firebase 10+ (auth, Firestore, hosting), TypeScript, Vitest, Python 3 for content-processing scripts.

## Commands

```bash
bun run start         # Dev server (localhost:3000)
bun run build         # Production build
bun run deploy        # Build + Firebase deploy
bun run test          # Vitest run
bun run lint-check    # ESLint + tsc --noEmit
bun run format        # Prettier
bun run creature:build # Creature builder CLI
```

## Repository Map

| Path | Contents |
|------|----------|
| `docs/` | Game rules as markdown/MDX, numbered chapters (01-basic-rules … 11-character-sheet) |
| `docs/analysis/` | Design analysis documents — balance audits, coverage gap analyses, system reviews. Read these before designing content; write new analyses here |
| `src/features/CharacterSheet/` | Character sheet app — has its own CLAUDE.md, read it when working there |
| `src/components/` | Reusable React components (incl. MDX components like `<RollableTable>`) |
| `src/types/Character.ts` | Central TypeScript type definitions |
| `src/utils/scripts/` | Python content pipeline: `notion-import/`, `converters/`, `transformers/` |
| `spec/` | Technical feature specs for the app (currently mostly Notion-import work) |
| `.claude/skills/` | Design + workflow skills (spell-design, talent-design, creature-design, magic-item-design, notion-sync) |
| `.github/instructions/` | Legacy Copilot instructions — superseded by CLAUDE.md and skills, kept as pointer stubs |

## Game Design Work

- **Core resolution**: Attribute die (d4–d12) + 1d6 + skill rank vs. TN (default 8). Success levels: weak (0–2 over TN), strong (3–5), critical (6+).
- **Bounded power ceiling**: characters cap at "mortal pinnacle" — roughly D&D level 7 spells, D&D 10–12 martial capability. No reality-warping, no auto-wins.
- **Design skills are the entry point**: each skill contains the creation workflow, scaling tables, and design principles for its content type. Don't design spells/talents/creatures/items from general knowledge — the skills encode hard-won designer decisions.
- **Designer feedback loop**: when the owner corrects or refines a design decision during a session, distill that correction into the relevant skill's design principles section so it persists.
- **Analysis before expansion**: `docs/analysis/` tracks known gaps and balance issues (see `analysis-opportunities-trackboard.md`). Check whether an analysis already covers your area before making design decisions.

## Writing Style (game content)

- **Bold** for mechanical terms and conditions; *italics* for flavor, spell names, tradition/discipline names.
- Active voice, exact established terminology ("Success Level", "Target Number", "bane/boon", "roll Strength + Athletics").
- **Refer to creatures as "they/their/them," never "it/its"** (singular *they*, even for one creature). Reserve "it/its" for objects, zones, areas, and spells.
- **No semicolons or em/en dashes in game content.** The game uses natural, direct language. Split into separate sentences, or use "such as" / "and". (Applies to all published rules, spells, creatures, items, and talents. Meta-docs like this file are exempt.)
- Every ability states its trigger, effect, and limit. No vague narrative-only effects.
- **Give the GM parameters, never open-ended "GM decides."** When an effect hands a decision to the GM (what a divination reveals, what an omen means), spell out a concrete menu of answer types or bounded options, with a safety-valve option for when nothing concrete fits. Keeps play flowing and avoids forcing on-the-spot creativity.
- Examples in quote blocks (`>`).
- Tone: authoritative but accessible, evocative of ancient civilizations without purple prose.

## Code Conventions

- Components: PascalCase, feature-based folders.
- Types centralized in `/src/types/`.
- IDs via `crypto.randomUUID()`.
- Redux state updates via Immer (Redux Toolkit); action pattern `characterSheetActions.verbNoun`.
- Never commit temporary test scripts or standalone summary docs in the project root.
- **Never run `git commit` or `git push`.** All version control operations are done manually by the owner. Finish edits, verify docs and JSON agree, then stop — never attempt to stage or commit.

## Content Pipeline

Two directions, plus a publication flow for new designs:

**Notion → docs (bulk import)**: content authored in Notion, exported as HTML ZIP, imported via `src/utils/scripts/notion-import/import-from-notion.sh <export.zip>` (see its README). The legacy converters/transformers that regenerate app JSON also source from Notion exports and are **deprecated** — don't run them for new content.

**Docs → Notion (sync back)**: the `notion-sync` skill pushes doc changes to the Notion workspace (non-1:1 page mapping, changelog).

**New game content (design skills → production)**: after the owner approves a design as production-ready, publish it to all its surfaces — docs markdown, the matching app JSON in `src/utils/data/json/` (edited directly; consumed by search dialogs and builder tools), and Notion via `notion-sync`. Each design skill's **Publication Pipeline** section states exactly which surfaces its content type touches and the formats.

Notion is a co-source of truth — significant rule changes in `/docs/` must be synced.
