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
| System analysis (gaps, balance audit, redesign recs) | `docs/analysis/talents/TALENT_SYSTEM_ANALYSIS.md` |
| Challenge/social/travel integration analyses | `docs/analysis/talents/*.md` |

**Read the target skill's talent file and the analysis gap sections before designing** — the analysis documents which skills are undersized, which archetypes lack signature talents, and which design patterns to avoid.

## Talent Structure — Three Progression Paths

Every talent follows **exactly one of three paths** (analysis §8.5 — designer decision, binding). No other rank spans exist; **no talent may stop at R4**.

| Path | Ranks | Purpose | Examples |
|------|-------|---------|----------|
| **Signature (R1–R5)** | 1–5 | Core archetype identity — a career talent that grows from Novice to Grandmaster. Exactly 10 designated (list in analysis §8.5): Art of Fighting, Martial Artist, Art of Archery, Arcane/Mystical Spell Knowledge, Battle Mage, Pact of Devotion, Hard to Kill, Animal Companion, Magical Sense. | Spell access lines, Combat Art access |
| **Basic (R1–R3)** | 1–3 | Default talents — playstyle fully unlocked and completed at the Expert tier. The vast majority (~112 existing). | Blade Mastery, Evasion, Born Haggler |
| **High-Level (R4–R5)** | 4–5 only | Prestige talents that only exist at Master/Grandmaster tier — enforce archetype identity or extend powerful identities for high levels. Require high skill rank to even attempt; may have cross-skill prerequisites (e.g. Fighting 3 + Influence 3). | New designs — templates in analysis §9.4, proposals §9.5 |

Most live talents cap at R3 today; R4–R5 expansion is the active roadmap (analysis §8.4 targets: ~2–3 R4 + ~1 R5 per skill).

**Rank progression pattern: unlock → payoff → mastery → command → legend.**

- **Rank 1 — Unlock**: opens a playstyle with exactly **one clear mechanical change**. Small fixed bonuses (+1, +2, one reroll). Personal only — no party-wide effects. States its restrictions (weapon type, armor limit, stance).
- **Rank 2 — Payoff**: the flourish that rewards commitment — synergy, situational boon, upgraded action economy.
- **Rank 3 — Mastery**: signature-move reliability, encounter-shaping tools. Powerful effects limited per scene; moderate effects can be unlimited.
- **Rank 4 — Master (encounter-shaping)**: broader scope, tactical decisions — not bigger numbers. Templates: scope expansion (single→multi-target), action economy (Action→Quick Action), reliability (conditional→consistent), system bridge (combat→Challenge/Travel), recovery (mitigate→reverse).
- **Rank 5 — Grandmaster (session-defining)**: once-per-day legendary abilities, mundane mastery at its mortal limit — **not supernatural**. Templates: legendary action, permanent enhancement, narrative authority, capstone synergy, grandmaster signature.

Growth comes from **efficiency, reliability, and breadth — never raw damage inflation**. Rank 5 = mortal pinnacle (≈ D&D 10–12 martial), no reality-defying powers.

## Resource Budget per Rank

Consistent limiting patterns within a rank tier (from analysis §5.2):

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

1. **Pick the skill, read its pool** — `docs/03-statistics/06-talents/<skill>.md`. What themes are covered? What's missing (combat/utility/downtime spread)?
2. **Check the analysis gaps** — undersized skills (Streetwise 4, Insight/Influence/Perception ≤5 talents), missing archetype signatures (Bard, Engineer, Oracle, Summoner, Warlock, Apothecary), missing identity tags (infiltration, whip control, zone control, prophecy), thin defensive categories (redirection, avoidance). Filling a documented gap > new territory.
3. **Anchor to skill identity** — role spread and aspects from references. Prefer Excels/Decent roles; the talent must clearly fit one of the skill's aspects.
4. **Choose the progression path** — Basic (R1–R3) is the default for new talents. Signature (R1–R5) is a closed list of 10 (extending one of those to R4–R5 = filling a documented gap). High-Level (R4–R5) for prestige designs — check analysis §9 first: R4/R5 templates, single-skill capstone vs. cross-skill prestige trade-offs, and existing proposals (§9.5) before inventing new ones.
5. **Structure the ranks** — unlock → payoff → mastery (→ command → legend), resource budget per rank, 1–2 effects per rank.
6. **Assign mechanics** — defined bonus types, explicit triggers/limits/restrictions. **Keyword discipline**: only official conditions (`docs/05-combat/04-conditions.md`), official durations (briefly/short/medium/long/very long, `docs/06-scenes/02-effect-durations.md`), and official weapon/armor properties when a talent keys off them — complete lists in [../game-basics.md](../game-basics.md#canonical-keyword-sources). Anything non-official must be spelled out as an exact mechanical effect.
7. **Validate** — checklist below, then compare against 2–3 published talents of the same skill and rank tier: not strictly superior, comparable frequency-of-use.

## Writing Format

Talents live in per-skill markdown tables. Format (matches published files):

```markdown
**Talent Name**  | <strong>(Rank 1)</strong> [Unlock: one clear ability with trigger, effect, limit.]<br/><br/><strong>(Rank 2)</strong> [Payoff.]<br/><br/><strong>(Rank 3)</strong> [Mastery.]
```

Global restrictions ("You can't use any of these abilities while wearing heavy armor.") go before the rank entries.

> Exemplar (published, good structure — restriction stated, clear triggers, budgeted effects):
>
> **Escape Artist** | You can't use any of these abilities while wearing heavy armor.<br/><br/>**(Rank 1)** When you would be grappled, knocked prone, or pushed, you can use your Quick Action to roll Agility + Athletics vs. the source's Parry. On a success, you ignore the effect.<br/><br/>**(Rank 2)** Whenever you can roll Athletics with an Action to end the effect that grapples or restrains you, you can use your Quick Action to automatically succeed.<br/><br/>**(Rank 3)** Once between turns, you can move without provoking Opportunity Attacks.

(Note: R3 shown here with the analysis-recommended limit; the live doc may still have the unlimited version — check before copying.)

## Validation Checklist

- [ ] Fits one of the skill's themes/aspects; role within Excels/Decent
- [ ] Follows exactly one progression path: Signature R1–R5 (closed list of 10), Basic R1–R3, or High-Level R4–R5 — never stops at R4
- [ ] Each rank: unlock → payoff → mastery (→ command → legend); 1–2 effects; budget respected
- [ ] R4 shapes encounters through scope/economy/reliability, not bigger numbers; R5 is once-per-day legendary or mundane-mastery passive, never supernatural
- [ ] Clear trigger, effect, and limit on every ability
- [ ] Numeric bonuses use a defined bonus type; no unbounded scaling
- [ ] Stance lifecycle explicit (if applicable)
- [ ] No core-system penalty removed cheaply; no obsoleted alternatives
- [ ] Team effects R2+, limited
- [ ] Complements items and existing talents; not strictly superior to same-tier neighbors
- [ ] Supports archetype identity tags without locking builds
- [ ] Bounded ceiling respected — no superheroics
- [ ] All referenced actions, conditions, durations exist in the rules

## Publication Pipeline

A talent is a draft until the owner explicitly approves it as production-ready. Then publish to **all three surfaces**:

1. **Docs** — add the row to the skill's table in `docs/03-statistics/06-talents/<skill>.md`, matching the existing format: `**Name**  | <strong>(Rank 1)</strong> …<br/><br/><strong>(Rank 2)</strong> …` (alphabetical order within the table).
2. **App JSON** — append to `src/utils/data/json/talents.json` (consumed by the character sheet's talent search dialog). Schema: `name`, `skill requirement`, `description` (full rank text with the same inline HTML). ⚠️ Edit directly — the legacy JSON regeneration scripts are deprecated and source from Notion exports, not docs.
3. **Notion** — push via the `notion-sync` skill. Note: talents live as an **inline database** on the Notion Talents page (flagged ⚠️ in the sync mapping) — follow the skill's inline-DB handling.

Verify docs and JSON agree, then commit docs + JSON together.

## Designer Feedback Loop

When the owner corrects or refines a design decision in session, add it to **Design Principles** or **Anti-Patterns** above (one line, with reasoning). This is the accumulated design memory — it must grow.
