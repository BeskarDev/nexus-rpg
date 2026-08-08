---
name: talent-design
description: "Design skill talents for Nexus RPG — rank progression, resource budgets, archetype support, bonus types. Use when creating, revising, or reviewing talents in docs/03-statistics/06-talents/, or auditing talent coverage per skill or archetype."
---

# Talent Design — Nexus RPG

Talents are special abilities tied to one of 16 skills, bought with talent points earned by spending XP in that skill (2 XP → 1 TP; 1 TP per talent rank; ranks bought in order; skill-rank requirements gate access).

**Skill role spreads, aspects, archetype table, and bonus types live in [references/skill-themes.md](references/skill-themes.md).** Core system mechanics and writing standards: [../game-basics.md](../game-basics.md).

## Source-of-Truth Map

| What | Where |
|------|-------|
| **Canonical talent data** | `src/utils/data/json/talents.json` — **edit here, never in the docs** |
| Published talents | `docs/03-statistics/06-talents/<skill>.mdx` — **generated, do not hand-edit** |
| Talent economy rules | `docs/03-statistics/06-talents/00-overview.md` |
| **Conditions** (official keyword list) | `docs/05-combat/04-conditions.md` |
| **Effect durations** (briefly/short/medium/long/very long) | `docs/06-scenes/02-effect-durations.md` |
| **Weapon/armor properties** | `docs/04-equipment/05-armor-weapon-properties.md` |
| System analysis + prioritized roadmap (§9, v2.1) | `docs/analysis/talents/TALENT_SYSTEM_ANALYSIS.md` |
| **Per-skill workbenches** (inventory, gaps, full design proposals) | `docs/analysis/talents/skills/<skill>.md` — all 16 exist |
| Challenge/social/travel integration analyses | `docs/analysis/talents/*.md` |
| **Designer principles** (binding — incl. rules ported from spell design) | [references/designer-principles.md](references/designer-principles.md) |

**Read the target skill's talent file AND its workbench before designing** — the workbench is the finer-grained, more current source for that skill's gaps and proposals; several roadmap items already have full drafts there (review-and-promote, not design-from-scratch). The main analysis §9 roadmap sets the system-wide order: baseline fixes (P0) → completions (P1) → merged expansion pass (P2) → signature re-audit (P3) → high-rank progression (P4).

## Talent Structure — Three Progression Paths

Every talent follows **exactly one of three paths** (analysis §8.1 — designer decision, binding). No other rank spans exist; **no talent may stop at R4**.

| Path | Ranks | Use |
|------|-------|-----|
| **Signature** | R1–R5 | Core archetype identity. A **closed list of exactly 11** (analysis §8.3) — never designate a new one. |
| **Basic** | R1–R3 | The default for new talents. Playstyle fully unlocked at the Expert tier; ~112 existing. |
| **High-Level** | R4–R5 only | Prestige talents that exist only at Master/Grandmaster tier. High skill rank to attempt, sometimes cross-skill prerequisites. |

One sanctioned exception: a Basic talent may grow to R4–R5 **organically** when the new ranks deepen its existing job (Maintenance model) — it stays Basic, gains no Signature designation, and the Signature list stays closed (principle 24).

**Rank progression pattern: unlock → payoff → mastery → command → legend.** Growth leads with efficiency, reliability, and breadth; a rank that is JUST a number bump is rejected. R5 is the mortal pinnacle (≈ D&D 10–12 martial) — powered by the mortal self, no external magic (principle 25).

**[references/progression-paths.md](references/progression-paths.md) holds the full path definitions, the per-rank design templates, and the resource budget per rank — read it before structuring a talent's ranks (workflow steps 5–6).** Each rank carries **max 1–2 mechanically distinct effects**; more breadth means splitting the talent.

## Design Principles

1. **Fiction-first, mechanically precise** — describable narratively, but with unambiguous trigger, effect, and limit. No vague narrative-only effects.
2. **Skill-internal diversity** — every skill's pool supports combat, utility, AND downtime play. Combat currently dominates (~58%); prefer filling utility/exploration/social gaps.
3. **Minimal bookkeeping** — avoid internal scaling that recalculates when skill ranks or attributes change. Fixed bonuses and tiered unlocks over formulas. Never "+Skill Rank damage" at R1.
4. **Stances state their lifecycle** — activation cost (Quick Action/Action/free), duration, and termination conditions, explicitly.
5. **Passives don't obsolete systems** — permanent removal of a core penalty (opportunity attacks, untrained banes, armor trade-offs) is either high-rank, restricted, or partial mitigation. Compare against what it replaces.
6. **Team effects are limited** — party-wide buffs start at R2 earliest and carry a per-scene limit, an action cost, or a counterable condition.
7. **Bonus type discipline** — every numeric bonus uses a defined type (see references); same-type bonuses don't stack.
8. **Item interaction** — talents complement item effects, never duplicate them; equipment synergy is expected for late-game balance.
9. **Archetype enablement without lock-in** — talents enable the 25 archetypes' identity tags but stay usable outside those builds. Synergies (intra-playstyle, cross-skill, team) reward, never mandate.
10. **Exclusivity groups** — talents drawing on incompatible power sources (e.g. unarmored-defense from conditioning vs. faith) belong to explicit pick-one groups.

**Beyond these structural rules, the binding design-judgment rules live in [references/designer-principles.md](references/designer-principles.md)** — 47 principles (1–18 ported from the spell-design corpus, 19+ talent-native), split by concern into files under `references/principles/`, plus pointers to the shared spell-design wording/GM-facing/condition files that apply to talent text verbatim. Read the index before any design pass, then read only the concern file(s) matching your task — never load all of them cold. The most frequently violated, always worth knowing:

- Talents assist, never bypass — never auto-resolve a scene type (1).
- Flat damage riders don't proliferate — prefer action economy, control, banes/boons (2).
- GM-facing effects give bounded parameters, never "GM decides" (14).
- Bonus values come from the fixed magnitude menus, no invented numbers (23).
- A single ability should basically never impose +2 banes (32).
- A talent must earn its slot across multiple game systems, not one low-screen-time system (35).
- Every ability states how it resolves, and never just switches a mechanic off (36).
- Write fixed difficulties in TN notation ("vs. TN 10", not "a hard difficulty") (41).

## Damage & Healing Numbers

When a talent adds damage or grants healing, it plugs into the system-wide scaling frameworks — don't invent numbers:

- **Damage scaling chassis**: `docs/analysis/spells/SPELL_SYSTEM_ANALYSIS.md` §6 (per-rank W/S/C values, AoE half-scaling). Talent damage riders are small **fixed ability bonuses** (+2 typical), far below spell bonuses at the same tier — talents provide options, items and spells provide potency. The combat-talent damage audit is in `docs/analysis/talents/TALENT_SYSTEM_ANALYSIS.md` §4.
- **Healing scaling**: SPELL_SYSTEM_ANALYSIS §16 — single-target healing = 1:1 damage, Quick Action healing = ½, AoE = multi-target scaling; temp HP never stacks; **wound healing is extremely rare by design**. Talent-granted healing must not outpace Life-tradition spells (the intentional healing bottleneck) and must never make wound recovery routine.

## Anti-Patterns (from published-talent audit)

- ❌ **Overloaded ranks** — 3+ unrelated effects in one rank (Battle Rage R1 had five).
- ❌ **Unlimited team buffs** — "+Influence damage to any ally, every turn, no limit" (Inspire Ally R1 pre-fix).
- ❌ **Scaling AV past the armor ceiling** — unarmored-defense talents cap (e.g. "AV = 1 + Fortitude, max 4").
- ❌ **R1 removal of core penalties** — untrained banes, opportunity attacks.
- ❌ **Stances without entry/exit rules.**
- ❌ **Vague triggers** — "when fighting bravely" is not a trigger; "when an enemy in your melee range attacks another creature" is.

## Creation Workflow

1. **Pick the skill, read its pool and its workbench** — `docs/03-statistics/06-talents/<skill>.mdx` plus `docs/analysis/talents/skills/<skill>.md`. What themes are covered? What's missing (combat/utility/downtime spread)? Does the workbench already carry a full draft for this concept? If yes, the job is review-and-promote against current principles, not fresh design.
2. **Check the roadmap position** — analysis §9 (v2.1): does this design belong to the current phase? Baseline fixes (P0) and completions (P1) come before new designs (P2+). Filling a documented gap > new territory. Watch the P1.3 blocked list (Supernatural Mobility, Presence of Conquest, Foresight — owner decision pending).
3. **Anchor to skill identity** — role spread and aspects from references. Prefer Excels/Decent roles; the talent must clearly fit one of the skill's aspects.
4. **Read every system the talent touches — in source, this session, before writing any mechanics.** A talent hooks into or modifies existing procedures; designing from memory invents mechanics that don't exist (a Master Artisan draft once gave "craft above what materials allow" and "repair magic items" — neither concept existed once `Craft an Item` and the repair-kit rules were actually read; the real hooks were the Crafting-rank Quality gate, the damaged→broken ladder, and a dangling "masterwork property" reference). Open the actual rules for whatever the talent's abilities reference and design onto the published procedure — its TNs, costs, gates, and terminology. Paths for the common surfaces (downtime and crafting, items and Durability, magic items, resting, time scales, challenges and travel, combat, spells): [references/system-surfaces.md](references/system-surfaces.md). The best designs graft onto hooks the system already dangles rather than adding parallel subsystems.
5. **Choose the progression path** — Basic (R1–R3) is the default for new talents. Signature (R1–R5) is a closed list of 11 (extending one of those to R4–R5 = filling a documented gap). High-Level (R4–R5) for prestige designs — check analysis §8.4 templates, §8.5 proposals, and the §9.5 demand-scoping before inventing new ones. Organic Basic extension to R4–R5 per principle 24.
6. **Structure the ranks** — unlock → payoff → mastery (→ command → legend), resource budget per rank, 1–2 effects per rank.
7. **Assign mechanics** — defined bonus types, explicit triggers/limits/restrictions per [references/designer-principles.md](references/designer-principles.md). **Keyword discipline**: only official conditions (`docs/05-combat/04-conditions.md`), official durations (briefly/short/medium/long/very long, `docs/06-scenes/02-effect-durations.md`), and official weapon/armor properties when a talent keys off them — complete lists in [../game-basics.md](../game-basics.md#canonical-keyword-sources). Anything non-official must be spelled out as an exact mechanical effect.
8. **Write it into a draft document** — **never straight into the published surfaces.** Create (or append to) a batch file under `.drafts/talents/` (e.g. `.drafts/talents/<skill>-expansion-batch.md`, or a concept-named file). The draft holds: a status banner ("pending owner approval, not yet published"), scope and roadmap phase, per-talent design rationale (path choice, gap filled, archetype served, budget notes, any principle tensions), the full talent text in publish-ready format, and an "open questions for owner" section flagging unresolved forks. The draft is the review artifact; publication only happens after owner approval.
9. **Validate** — checklist below, then compare against 2–3 published talents of the same skill and rank tier: not strictly superior, comparable frequency-of-use. Also grep the spell files for same-job spells (principle 18 — parity, not outclassing).
10. **Check worldbuilding implications** — for any talent with social, economic, legal, or informational reach (contact networks, forgery, information gathering, wealth generation), ask what happens if it becomes a routine tool of courts, markets, armies, or guilds. Keep it rare/costly, constrain rather than auto-solve, leave in-world counterplay (principle 15).

## Writing Format

Talents live in per-skill markdown tables. Format (matches published files):

```markdown
**Talent Name**  | <strong>(Rank 1)</strong> [Unlock: one clear ability with trigger, effect, limit.]<br/><br/><strong>(Rank 2)</strong> [Payoff.]<br/><br/><strong>(Rank 3)</strong> [Mastery.]
```

The preamble before "(Rank 1)" holds **only prerequisites and whole-talent conditions** — skill requirements, equipment restrictions across independent abilities ("You can't use any of these abilities while wearing heavy armor."), exclusivity lines. Never abilities: a stance's entry/exit/lifecycle is R1 unlock content. When every rank flows through one gateway ability (a stance), attach the condition to the gateway in Rank 1 instead — no preamble at all (principle 21).

When a rank grants **more than one individual ability**, introduce them with "You gain the following abilities:" and list each on its own `- ` line — never chain abilities in flowing prose, never pack two abilities into one list item (principle 20). Single-ability ranks state the ability directly.

> Exemplar (published, good structure — restriction stated, clear triggers, budgeted effects):
>
> **Escape Artist** | You can't use any of these abilities while wearing heavy armor.<br/><br/>**(Rank 1)** When you would be grappled, knocked prone, or pushed, you can use your Quick Action to roll Agility + Athletics vs. the source's Parry. On a success, you ignore the effect.<br/><br/>**(Rank 2)** Whenever you can roll Athletics with an Action to end the effect that grapples or restrains you, you can use your Quick Action to automatically succeed.<br/><br/>**(Rank 3)** Once between your turns, your Movement is unprovoked.

(Note: R3 shown here with the analysis-recommended once-between-turns limit using the **unprovoked** Movement keyword; the live doc still has the unlimited version — the fix is roadmap item P0.2. Check the live file before copying.)

## Validation Checklist

- [ ] Fits one of the skill's themes/aspects; role within Excels/Decent
- [ ] Follows exactly one progression path: Signature R1–R5 (closed list of 11), Basic R1–R3, or High-Level R4–R5 — never stops at R4
- [ ] Each rank: unlock → payoff → mastery (→ command → legend); 1–2 effects; budget respected
- [ ] Every R4–R5 rank leads with a new capability (scope/economy/reliability/bridge/recovery) — numeric growth within the menu ceilings only as accompaniment, never a bare number bump; R5 is once-per-day legendary or mastery passive — powered by the mortal self incl. soul-power, no external/magical power (principle 25)
- [ ] Clear trigger, effect, and limit on every ability
- [ ] Numeric bonuses use a defined bonus type; no unbounded scaling
- [ ] Stance lifecycle explicit (if applicable)
- [ ] No core-system penalty removed cheaply; no obsoleted alternatives
- [ ] Team effects R2+, limited
- [ ] Complements items and existing talents; not strictly superior to same-tier neighbors
- [ ] Not outclassing (or outclassed by) a same-job spell or item — parity with distinct edges (principle 18)
- [ ] Supports archetype identity tags without locking builds
- [ ] Bounded ceiling respected — no superheroics
- [ ] All referenced actions, conditions, durations exist in the rules; parameterized conditions carry their (X) value; condition severity judged from the published text, not the name (stunned still acts, only paralyzed fully disables — principle 26)
- [ ] Every procedure, item, or subsystem the talent hooks into was read in source this session (workflow step 4) — no mechanics designed from memory
- [ ] Debuff triggers key off rolls that actually happen; no high-impact condition on a no-roll trigger
- [ ] Immunities carry a circumvention; no cap scaled by rank
- [ ] Worldbuilding reach checked for social/economic/informational talents (principle 15)
- [ ] Draft file exists under `.drafts/talents/` with rationale and open questions

## Publication Pipeline

Every new design starts life in a draft document under `.drafts/talents/` (workflow step 7). A talent stays a draft until the owner explicitly approves it as production-ready. On approval, publish (then optionally delete or archive the draft file):

1. **`src/utils/data/json/talents.json`** — add the record. **This is the only file you author by hand.** Schema: `name`, `skill requirement` (the exact skill name, which selects the page), `description` (the full rank ladder). The description is one HTML string of optional preamble prose followed by rank sections, each opened by a canonical `<strong>(Rank N)</strong>` label. The generator **fails the build** on a malformed label — a paren outside the tag, a `<br/>` swallowed inside it, or no emphasis at all — because each of those silently drops a whole rank section. ⚠️ For edits to existing entries, use surgical string replacement — never parse + re-serialize the whole file.
2. **`bun run content:gen`** — regenerates `docs/03-statistics/06-talents/<skill>.mdx`. Never edit those files: they carry a do-not-edit banner, and `bun run content:check` runs in CI and fails on any hand-edit or missed regeneration.
3. **Notion** — push via the `notion-sync` skill. Note: talents live as an **inline database** on the Notion Talents page (flagged ⚠️ in the sync mapping) — follow the skill's inline-DB handling in `.claude/skills/notion-sync/references/inline-databases.md`.

Then verify: `bun run content:check` clean and `bun run build` green. Docs and JSON agree **by construction** now — one JSON edit plus `content:gen` updates both surfaces in the same commit.

## Designer Feedback Loop

When the owner corrects or refines a design decision in session, append it (next free number, bolded one-line rule + reasoning + owner-ruling provenance) to the matching concern file under `references/principles/`, and **add its one-line hook to the Index by Concern in [references/designer-principles.md](references/designer-principles.md)** (the index states the next free number). If it's frequently load-bearing, also add its one-line hook to the short list in the Design Principles section above. If the correction refines a *ported* principle, note the talent-side ruling under that ported entry — never edit the spell-design files from here. This is the accumulated design memory — it must grow. Keep SKILL.md itself lean: new lessons go into `references/`.
