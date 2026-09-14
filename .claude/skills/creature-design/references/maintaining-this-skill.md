# Maintaining this skill

Read this **only when changing the skill itself** — adding a principle, moving a rule, or changing
something that reaches more than one file. It is never needed to design a creature.

## Every rule has ONE home

**A rule stated in two files will drift, and the second copy will be the one somebody follows.** That is
not a hypothesis — the limiter placement was written in three files, one drifted, and the wrong version
was followed three times before anyone noticed. Other files may **point** at a rule. They may not restate
it.

| Rule area | Its one home |
|---|---|
| Tier statistics, damage math, **carried gear Quality**, AV sources and stacking, recharge, limiter placement, validation checklist | [references/stat-tables.md](stat-tables.md) |
| Naming, taxonomy, folk inheritance, senses, magical naturalism, magic in decline | [references/principles/identity.md](principles/identity.md) |
| Chassis shape, tier adjustment, size and reach, light vs heavy, Timer/Threat/Treat | [references/principles/chassis.md](principles/chassis.md) |
| Conditions, counterplay, triggers, universal actions, leashes, reactive attacks, riders | [references/principles/abilities.md](principles/abilities.md) |
| Prose register, pronouns, saying it once, lore voice | [references/principles/writing.md](principles/writing.md) |
| The `lore` object: keys, `tactics`, environment, physiology, organization | [references/lore-schema.md](lore-schema.md) |
| Treasure economy, scales, relic channels, row composition | [references/treasure-design.md](treasure-design.md) |
| Workflow, categories, publication, what to load when | **this file** |
| The history behind a rule | [references/case-studies.md](case-studies.md) |

**When a ruling lands, put it in its home and add a pointer elsewhere if it is genuinely needed.** Adding
the full rule twice is how the skill breaks.

## Surface map — what else changes when you change this

**A rule that reaches more than one file has to be applied to all of them in the same pass.** The
companion trait library sat stale for a whole session because a pronoun fix went into the creature copy
only.

| Change this | And these change with it |
|---|---|
| A creature record (`creatures.json`) | `bun run content:gen` regenerates `docs/08-creatures/03-creatures/tier-*.mdx`. Nothing else |
| A **shared trait**'s text | **six files** (D-129): `creature-traits.json`, `companion-traits.json`, `creature-abilities-library.json` (the Builder pre-set), `docs/08-creatures/01-mounts-companions/traits.md`, and the two legacy Notion source tables `src/utils/data/markdown/companion-traits.md` and `split-tables/companion-traits.md`. **Plus any creature carrying a same-named `ability`** — the generator machine-checks the first two agree and does **not** compare abilities to the trait library, which is how `Pack Tactics` ended up with four wordings. Grep the name across the repo |
| A trait's **name** | the above, plus every `traits` array that references it — unknown names fail the build |
| A creature's **name** | every `lore.organization` `composition` row that names it, across all records |
| A **type, subtype or additive** | `creature-types.json` / `creature-subtypes.json` / `creature-additives.json`, plus `docs/08-creatures/02-creature-rules.md`'s type table |
| The **tier tables** | `references/stat-tables.md` **and** `creature-tiers.json` (the Builder's copy) **and** `02-creature-rules.md`'s derivation notes |
| A **condition or damage type** | it is published rules, not ours — change `conditions.json` / the attacking page, and the generator's guard lists follow |
| A **design ruling** | its one home above, the index in `references/designer-principles.md`, and the decision record |

## Designer Feedback Loop

When the owner corrects or refines a design decision in session (a balance call, a thematic boundary, a wording rule), append it to the matching phase file in [references/principles/](principles/) — `chassis`, `identity`, `abilities` or `writing` — as the next free number (bolded one-line rule + reasoning + owner-ruling provenance), **and add its one-line summary to the index in [references/designer-principles.md](designer-principles.md)**, which states the next free number. Numeric chassis corrections go into [references/stat-tables.md](stat-tables.md) instead, and corrections to the `lore` object — its keys, the environment vocabulary, treasure tables, encounter templates — into [references/lore-schema.md](lore-schema.md). If it's frequently load-bearing, also add its one-line hook to the Design Principles shortlist above. If the correction refines a *ported* principle, note the creature-side ruling there — never edit the spell-design or talent-design files from here. This is the accumulated design memory — it must grow. Keep SKILL.md itself lean: new lessons go into `references/`.


## Keeping SKILL.md lean

`SKILL.md` is loaded on **every** invocation, including a one-ability review. It is a **router**: the
source-of-truth map, the category table, and where to go next. Everything else lives in `references/` and
is loaded per step.

**A new rule never lands in `SKILL.md`.** It lands in its phase file, or in `stat-tables.md` if it is a
number, or in `lore-schema.md` if it is a lore key. A one-line hook in SKILL.md's shortlist is the most
any rule gets there, and only if it is load-bearing on most passes.
