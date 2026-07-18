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
| Published talents | `docs/03-statistics/06-talents/<skill>.md` |
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

Every talent follows **exactly one of three paths** (analysis §8.1 — designer decision, binding). No other rank spans exist; **no talent may stop at R4**. One sanctioned exception: a Basic talent may grow to R4–R5 **organically** when the new ranks deepen its existing job (Maintenance model) — it stays a Basic talent, gains no Signature designation, and the Signature list stays closed (principle 24).

| Path | Ranks | Purpose | Examples |
|------|-------|---------|----------|
| **Signature (R1–R5)** | 1–5 | Core archetype identity — a career talent that grows from Novice to Grandmaster. Exactly 11 designated (list in analysis §8.3): Art of Fighting, Martial Artist, Art of Archery, Arcane/Mystical Spell Knowledge, Battle Mage, Pact of Devotion, Hard to Kill, Battle Rage, Animal Companion, Magical Sense. | Spell access lines, Combat Art access |
| **Basic (R1–R3)** | 1–3 | Default talents — playstyle fully unlocked and completed at the Expert tier. The vast majority (~112 existing). | Blade Mastery, Evasion, Born Haggler |
| **High-Level (R4–R5)** | 4–5 only | Prestige talents that only exist at Master/Grandmaster tier — enforce archetype identity or extend powerful identities for high levels. Require high skill rank to even attempt; may have cross-skill prerequisites (e.g. Fighting 3 + Influence 3). | New designs — templates in analysis §8.4, proposals §8.5 |

Most live talents cap at R3 today. High-rank expansion is roadmap phase P4 and is **demand-scoped** (analysis §9.5): signature extensions first, then ~6–8 capstones for pillar skills and TP-exhausted small skills — NOT blanket capstones for all 16 skills.

**Rank progression pattern: unlock → payoff → mastery → command → legend.**

- **Rank 1 — Unlock**: opens a playstyle with exactly **one clear mechanical change**. Small fixed bonuses (+1, +2, one reroll). Personal only — no party-wide effects. States its restrictions (weapon type, armor limit, stance).
- **Rank 2 — Payoff**: the flourish that rewards commitment — synergy, situational boon, upgraded action economy.
- **Rank 3 — Mastery**: signature-move reliability, encounter-shaping tools. Powerful effects limited per scene; moderate effects can be unlimited.
- **Rank 4 — Master (encounter-shaping)**: broader scope, tactical decisions. Templates: scope expansion (single→multi-target), action economy (Action→Quick Action), reliability (conditional→consistent), system bridge (combat→Challenge/Travel), recovery (mitigate→reverse). Numbers may grow within the §4.5 menu ceilings, but never as the rank's whole content — a rank that is JUST a number bump is boring and uninspired (owner ruling); lead with a new capability, let the menu step ride along.
- **Rank 5 — Grandmaster (session-defining)**: once-per-day legendary abilities, mastery at its mortal limit — **powered by the mortal self, no external magic**. The bar is principle 25: superhuman-to-a-realistic-eye feats (wall-running, a warband-staggering roar, battle prescience) are the *intended* mythic-hero register, and even soul-power counts as mortal (Supreme Combat Arts precedent); what's forbidden is external/magical power (Focus costs, spell effects, divine patronage, reality-warping). Templates: legendary action, permanent enhancement, narrative authority, capstone synergy, grandmaster signature.

Growth leads with **efficiency, reliability, and breadth**; numeric growth follows the fixed bonus menus (analysis §4.5: damage {+2/+4/+6} with slow rank ceilings) and never carries a rank alone. Rank 5 = mortal pinnacle (≈ D&D 10–12 martial), mythic-but-mortal per principle 25.

## Resource Budget per Rank

Consistent limiting patterns within a rank tier (from analysis §6.2):

| Rank | Budget |
|------|--------|
| R1 | One significant ability once per scene, OR one minor always-on passive |
| R2 | One payoff ability — unlimited if conditional, once per scene if unconditional |
| R3 | One mastery ability — once per scene if powerful, unlimited if moderate |
| R4 | One encounter-shaping ability — once per scene, or once per day if it reverses outcomes (e.g. stay at 1 HP instead of 0) |
| R5 | One session-defining ability — once per day for dramatic effects; permanent passives only for mundane mastery (e.g. "never suffer range/cover/weather banes") |

Each rank: **max 1–2 mechanically distinct effects**. More breadth → split the talent or use simple sub-choices.

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

**Beyond these structural rules, the binding design-judgment rules live in [references/designer-principles.md](references/designer-principles.md)** — 18 principles ported from the extensively-developed spell-design corpus plus talent-native additions, and pointers to the shared spell-design wording/GM-facing/condition convention files that apply to talent text verbatim. Read it before any design pass. The most frequently load-bearing: talents assist, never bypass (1); flat damage riders don't proliferate — prefer action economy, control, banes/boons (2); SL manipulation is premium R3+ budget, never stacked with a flat rider (3); never scale a cap (4); a granted immunity needs a circumvention (5); debuffs key off rolls that actually happen (8); high-impact conditions never ride no-roll triggers (9); GM-facing effects give bounded parameters, never "GM decides" (14); weigh worldbuilding reach of networks/forgery/information talents (15); cross-system interactions gate in the talent itself (17); validate against spells and items, not just talents (18).

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

1. **Pick the skill, read its pool and its workbench** — `docs/03-statistics/06-talents/<skill>.md` plus `docs/analysis/talents/skills/<skill>.md`. What themes are covered? What's missing (combat/utility/downtime spread)? Does the workbench already carry a full draft for this concept? If yes, the job is review-and-promote against current principles, not fresh design.
2. **Check the roadmap position** — analysis §9 (v2.1): does this design belong to the current phase? Baseline fixes (P0) and completions (P1) come before new designs (P2+). Filling a documented gap > new territory. Watch the P1.3 blocked list (Supernatural Mobility, Presence of Conquest, Foresight — owner decision pending).
3. **Anchor to skill identity** — role spread and aspects from references. Prefer Excels/Decent roles; the talent must clearly fit one of the skill's aspects.
4. **Read every system the talent touches — in source, this session, before writing any mechanics.** A talent hooks into or modifies existing procedures; designing from memory invents mechanics that don't exist (a Master Artisan draft once gave "craft above what materials allow" and "repair magic items" — neither concept existed once `Craft an Item` and the repair-kit rules were actually read; the real hooks were the Crafting-rank Quality gate, the damaged→broken ladder, and a dangling "masterwork property" reference). Open the actual rules for whatever the talent's abilities reference and design onto the published procedure — its TNs, costs, gates, and terminology. Common surfaces: downtime activities incl. Craft an Item (`docs/06-scenes/04-downtime/activities.md`), crafting professions & field alchemy (`docs/06-scenes/05-crafting-professions/`), item uses/Durability/damaged/broken/repair (`docs/04-equipment/01-items.md`, repair kit in `02-equipment/gear.md`), magic items — Quality tiers, masterworks, materials, enchantments (`docs/04-equipment/07-magic-items/`), equipment lists (`docs/04-equipment/02-equipment/`), resting (`docs/06-scenes/03-resting.md`), time scales (`docs/06-scenes/01-scenes-time-intervals.md`), challenges/travel (`docs/06-scenes/07-challenges/`), combat rules (`docs/05-combat/`), spells (`docs/07-magic/`). The best designs graft onto hooks the system already dangles rather than adding parallel subsystems.
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

Every new design starts life in a draft document under `.drafts/talents/` (workflow step 7). A talent stays a draft until the owner explicitly approves it as production-ready. On approval, publish to **all three surfaces** (then optionally delete or archive the draft file):

1. **Docs** — add the row to the skill's table in `docs/03-statistics/06-talents/<skill>.md`, matching the existing format: `**Name**  | <strong>(Rank 1)</strong> …<br/><br/><strong>(Rank 2)</strong> …` (alphabetical order within the table).
2. **App JSON** — append to `src/utils/data/json/talents.json` (consumed by the character sheet's talent search dialog). Schema: `name`, `skill requirement`, `description` (full rank text with the same inline HTML). ⚠️ Edit directly — the legacy JSON regeneration scripts are deprecated and source from Notion exports, not docs.
3. **Notion** — push via the `notion-sync` skill. Note: talents live as an **inline database** on the Notion Talents page (flagged ⚠️ in the sync mapping) — follow the skill's inline-DB handling.

Verify docs and JSON agree, then commit docs + JSON together.

## Designer Feedback Loop

When the owner corrects or refines a design decision in session, append it to [references/designer-principles.md](references/designer-principles.md) (next free number, bolded one-line rule + reasoning + owner-ruling provenance, under the matching section). If it's frequently load-bearing, also add its one-line hook to the short list in the Design Principles section above. If the correction refines a *ported* principle, note the talent-side ruling under that ported entry — never edit the spell-design files from here. This is the accumulated design memory — it must grow. Keep SKILL.md itself lean: new lessons go into `references/`.
