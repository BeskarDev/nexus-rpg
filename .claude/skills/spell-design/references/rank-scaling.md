# Spell Rank Scaling Tables

Canonical numbers for spell design (aligned with `docs/analysis/spells/SPELL_SYSTEM_ANALYSIS.md` §6). Use exactly.

## Casting Basics

| School | Casting Roll | Spell Power | Focus | Catalyst |
|--------|-------------|-------------|-------|----------|
| **Arcana** | Mind + Arcana | ½ Mind | (Mind−2) + 2×Arcana | Arcane conduit |
| **Mysticism** | Spirit + Mysticism | ½ Spirit | (Spirit−2) + 2×Mysticism | Mystic talisman |

**Failure consequences**: Arcana → mishap table; Mysticism → lose access until penance.
**Damage** = Spell Power + spell bonus. Success levels: Weak (0–2 over TN), Strong (3–5), Critical (6+).

## In-World Power by Rank

Qualitative anchor for judging whether a *concept* sits at the right rank, independent of its damage math. Use it together with the D&D-equivalence column: ask "what does a working of this rank look like in the fiction?" and "does this spell's real-world impact match?" A utility spell with no damage still has a rank, set by how much it changes the world.

| Rank | In-world tier | What a spell of this rank can plausibly do |
|------|---------------|---------------------------------------------|
| 0 | Apprentice trick | A sensory cue, a tiny force, a momentary effect. Changes one small thing briefly. Never decides a scene. |
| 1 | Novice working | One reliable minor effect: mend a problem, a short personal buff, read a language, break a fall, open a stuck latch. Solves a single ordinary obstacle. |
| 2 | Practiced working | Affects a small area or a lasting utility. Defeats mundane defenses (locks, mundane wards), scouts a short way, protects a threshold, reshapes a body, reaches a known mind anywhere. A journeyman's craft. |
| 3 | Expert working | Reaches across real distance (scry a place, teleport, remote senses), commands notable force, or divines a hidden truth. Shapes an encounter or a leg of a journey. |
| 4 | Master working | Battlefield-scale control, raising the dead, potent transformation, true prophecy. Rare, remembered, story-defining. |
| 5 | Mortal pinnacle | The greatest working a mortal can perform (D&D 7 ceiling): seal a soul, tear space, resurrect, unleash a storm. Always costs dearly. Never reality-warping. |

**Rank-placement heuristics**:
- If a spell defeats a *magical* defense of rank N, it usually wants to be rank N itself (e.g. Knock suppresses an Arcane Lock ward, so both sit at R2).
- Sustained mobility that rewrites how a body moves (breathe water, climb walls) is R2+, not R1. A single short personal boon is R1.
- Effect that acts at a distance you have never seen, or on a whole battlefield, is R3+.
- When a concept spans two D&D levels that straddle a Nexus rank boundary, let *in-world impact* break the tie, not the lower number.

## Standard Scaling by Rank

| Rank | Focus | TN | Single-Target (W/S/C) | Multi-Target (W/S/C) | Default Range | Duration | Default Area | Power |
|------|-------|-----|----------------------|----------------------|---------------|----------|--------------|-------|
| 0 | 0 | 6 | +2/+4/+6 | +0/+2/+4 | Medium | Brief–Short | Single / Melee | Cantrip (≈D&D 0) |
| 1 | 2 | 8 | +4/+8/+12 | +2/+4/+6 | Medium | Short–Medium | Single / Melee | Basic (≈D&D 1–2) |
| 2 | 4 | 10 | +6/+12/+18 | +3/+6/+9 | Medium–Long | Short–Medium | Close area / Short line | Moderate (≈D&D 3–4) |
| 3 | 6 | 12 | +8/+16/+24 | +4/+8/+12 | Long | Short–Medium | Short area | High (≈D&D 5) |
| 4 | 8 | 14 | +10/+20/+30 | +5/+10/+15 | Long–Extreme | Short–Medium | Medium area | Very high (≈D&D 6) |
| 5 | 10 | 16 | +12/+24/+36 | +6/+12/+18 | Extreme | Short–Medium | Long area | Peak mortal (≈D&D 7) |

**Scaling rules**:
- Single-target: +2 weak damage per rank.
- Multi-target R2+: half the single-target spell bonus (consistent 50% per-target penalty). Spell Power and catalyst bonuses apply to every target, so AoE pays off at 3+ clustered targets.
- Multi-target R0–R1: legacy values kept (at-will/low-Focus spells need tighter limits).
- Duo-target: ~75% of single-target (e.g. +4/+9/+13 at R2), or full single-target with a limiting condition (targets adjacent).

## Material Costs (consumed coins)

Only use the **material cost (X)** property when the spell literally consumes coins or a coin-valued good on every cast (incense, precious offerings, rare reagents). A reusable focus item (a mirror, a bone set, a holy symbol) is **material (X)** — *not* a cost — and does not use coin values. Never attach a coin cost to a spell that doesn't actually burn value.

Anchor: spell scroll costs (`docs/04-equipment/07-magic-items/effects.md`) — 50 / 150 / 500 / 1,500 / 5,000 / 15,000 coins for R0–R5. A consumed component is cheaper than a full single-use scroll (you still spend Focus + Action + a casting roll), so budget a consumed material at roughly **one rank-tier below the same-rank scroll**:

| Rank | Consumed material cost | Notes |
|------|-----------------------|-------|
| 0 | none | cantrips never burn coins |
| 1 | ~50 | trivial reagent |
| 2 | ~150 | modest offering |
| 3 | ~500 | valuable offering / incense |
| 4 | ~1,500 | rare reagent |
| 5 | 5,000+ | Q6–Q7 tier (matches R5 principle) |

R5 consumed cost is the only *mandatory* one (peak spells must bite the economy — see Rank 5 Limits). Below R5, add a consumed cost only when the fiction demands it; most spells consume nothing.

## Range Modification (power budget)

| Modification | Cost / Benefit |
|--------------|----------------|
| Longer range (+1 step) | −1 damage per SL, or +1 Focus, or lose secondary effect |
| Shorter range (−1 step) | +1 damage per SL, or gain secondary condition, or reduced Focus |
| Touch/melee-only AoE | Up to full single-target damage (positioning risk pays for it) |
| Self-only | Stronger effect or longer duration than the targeted equivalent |

## Damage Deviation Scenarios

| Scenario | Adjustment | Example |
|----------|------------|---------|
| Melee AoE | Up to full single-target damage | R2 melee AoE: +6/+12/+18 |
| Larger area (one step up) | −1 per SL from multi-target values | R3 medium area: +3/+6/+9 |
| Strong secondary effect | −1 to −2 steps from base | Multi-target + fear: +2/+4/+6 at R2 |
| Control-primary | Minimal damage | R0 fear: +0/+2/+4 |
| Chain/split | Secondary hits reduced | Primary +4/+8/+12, chain +2/+4/+6 |

**Balance principle**: total spell power stays consistent within a rank through trade-offs.

## Area Phrasing Convention (established idiom — do not reword)

"…in \<distance\> range of the target location" defines the **radius** of an area/zone around that point. Example: "create the zone in short range of the target location" = a zone with short-range radius centered on the target location. The metamagic arts (*Condensed/Widened Spell*) operate on this radius ("reduce/increase the radius by one category"). Use this exact phrasing for new area spells — it appears across ~18 published spells and is the canonical form.

## Control Spells

- Target **Resist**, TN 6 + rank.
- Duration fixed on any success (briefly → medium max by rank) — **never varies by SL**.
- Strong/Critical add secondary effects or bonus damage, never escalate the primary condition.

## Buff/Debuff Spells

- Numeric bonuses modest (+1 to +3).
- Duration limits power: briefly for strong effects, longer for weak ones.
- Use the **enchant** property for temporary enhancements; state clear end conditions.

## Healing (analysis §16)

Healing uses the damage scaling chassis:

| Rank | Single-Target Healing | Multi-Target Healing | Quick Action Healing |
|------|----------------------|----------------------|----------------------|
| 0 | +2/+4/+6 | +0/+2/+4 | — (doesn't exist) |
| 1 | +4/+8/+12 | +2/+4/+6 | +2/+4/+6 |
| 2 | +6/+12/+18 | +3/+6/+9 | +3/+6/+9 |
| 3 | +8/+16/+24 | +4/+8/+12 | +4/+8/+12 |
| 4 | +10/+20/+30 | +5/+10/+15 | +5/+10/+15 |
| 5 | +12/+24/+36 | +6/+12/+18 | +6/+12/+18 |

**Rules**:
- **Single-target = 1:1 with damage.** Correct because healing is reactive (needs a wounded ally) and costs the Action that could have dealt damage.
- **Quick Action healing = ½ single-target** — it stacks on top of your main Action, so half rate prevents strict superiority over dedicated healing. **R1 minimum: R0 Quick Action healing does not exist** (designer decision) — at-will, action-free healing would trivialize attrition; healing costs Focus or an Action.
- **Multi-target healing = multi-target damage scaling** (half single-target at R2+).
- **Sustained/zone healing** (e.g. +4 HP/turn) is a different paradigm from burst — budget by total expected healing over duration, not per-tick.
- **Temp HP doesn't stack** — multiple sources form a graduated shield, never compound. Keep it that way.
- **Wound healing stays extremely rare** — currently 2 spells total (R1 ritual-only, R3 once/day). Wounds are serious injuries in a gritty system; healing one is a significant event, never routine.
- **Life tradition is the healing bottleneck** by design; Light and Nature get limited healing only.

R5 single-target +12/+24/+36 = absolute peak of mortal healing (~half a high-level character's HP on a critical).

## Rank 5 Limits (peak mortal)

1. Max +12/+24/+36 single-target damage.
2. Large zones, not "entire battlefield". Duration medium max, never permanent.
3. Effects escapable/counterable; no auto-kills, no permanent solutions; most require concentration.
4. Models: Delayed Blast Fireball, Plane Shift, Finger of Death, Reverse Gravity, Forcecage, Regenerate, Resurrection.
5. Forbidden power level: Wish, True Resurrection, Meteor Swarm, Time Stop, Imprisonment.

**Resurrection framework**: Revivify-equivalent R3, Raise Dead R4, Resurrection R5. True Resurrection does not exist.

## Damage Types

| Category | Types | Notes |
|----------|-------|-------|
| Physical | bludgeoning, slashing, piercing | reduced by AV normally |
| Elemental | fire, frost, lightning, acid | each has an associated condition |
| Energy | radiant, necrotic, blast, psychic | blast ignores ½ AV |
| Special | poison | resisted differently |

Open design question (see analysis §7.6/§15): a "force" type (full AV per hit) may replace blast on arcane projectile spells; blast stays for concussive effects. Check the analysis before designing missile-style spells.

## Spell Properties

| Property | Effect | Notes |
|----------|--------|-------|
| **blast (cone/line)** | Directional area effect | ½ AV ignored (concussive) |
| **concentrate** | Requires ongoing focus | Broken by damage/action |
| **enchant (X)** | Temporary enhancement | Duration specified |
| **illusory** | False sensory information | Spirit + Perception vs Resist to detect |
| **material (X)** | Requires component | Not consumed |
| **material cost (X)** | Component consumed | R5: 5,000+ coins |
| **quick** | Cast as Quick Action | Reaction spells |
| **ritual (X)** | Extended casting time | Minutes/hours |
| **singular** | Only one instance active | Recasting ends previous |

Full canonical list: `docs/07-magic/05-spell-properties.md`.

## Keyword Discipline

Conditions and durations are established keywords — use them exactly:
- **Conditions**: only the official list in `docs/05-combat/04-conditions.md`. Non-official shorthand must resolve to an official condition or an exact mechanical effect.
- **Durations**: briefly, short, medium, long, very long — definitions in `docs/06-scenes/02-effect-durations.md`. Ritual time intervals map to turn structures: minutes → delving, hours → exploration, days → travel, weeks → downtime.

Complete lists: [../../game-basics.md](../../game-basics.md#canonical-keyword-sources).

## Target Column Values

The **Target** column holds only these valid values: a fixed TN label (`Medium (8)`, `Hard (10)`, `Very Hard (12)`, …), `vs. Resist`, `vs. Dodge`, `vs. Parry`, `Self`, or `Special`. A computed or variable difficulty (e.g. 5 + the item's Quality) is **not** written in the column — put `Special` there and state the exact calculation in the effect text ("Roll against a difficulty of 5 + the item's Quality."). Example: Identify uses `Special` + an in-text Quality-scaled difficulty.
