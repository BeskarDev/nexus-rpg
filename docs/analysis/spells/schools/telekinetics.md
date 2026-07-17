# Telekinetics — Spell School Design Space

## School Identity

**Discipline**: Telekinetics (Arcane)
**Traits**: move, repel, levitate, crush, gravity
**Identity**: Transgressive force without physical contact — pure kinetic manipulation
**Role Spread**: Excels: Utility | Decent: Offense, Defense | Weak: Healing, Support, Control

### Mechanical Identity
- **Primary Conditions**: Prone (knocked down), restrained (held in place), pushed/pulled (forced movement)
- **Signature Gimmick**: Positioning control — moving creatures and objects, forced movement, gravity manipulation
- **Damage Types**: Physical, Blast, Lightning

### Design Principles
1. Telekinetics excels at battlefield repositioning — push, pull, levitate, drop
2. Forced movement is the primary control tool (different from conditions)
3. Blast damage (½ AV ignore) fits kinetic shockwave effects
4. **Known gaps (updated 2026-07-16)**: R1 reactive (Unseen Deflection) and the in-school payoffs (Grinding Weight, Forceful Implosion, Meteoric Throw) are now published; the R4 seeds (Telekinetic Storm, Telekinetic Flight, Repulsion Field) were passed over in the P4 cycle — R4 stands at Falling Sky alone by owner choice. Only remaining seed: Aerial Grasp (R3)
5. Complete levitate/crush/gravity chains from R0 cantrips through R5 capstones

### Internal Synergies

Framework: `.claude/skills/spell-design/references/synergy-framework.md` — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Telekinetics emits: **position itself** — *prone* (slams and drops), *pushed/pulled* into hazards, walls, or ally reach, *clusters* (dragging enemies together with Pressure Orb's pull), and *restrained/grappled* (kinetic holds, Stasis). The world is the weapon: every ledge, campfire, and spiked barricade the table describes is a payoff surface for its forced movement.

**Payoff levers** — Telekinetics rewards targets that are *already down or held*: crush effects that hit harder on a pinned or prone body, drops that convert its own levitation into falling damage, slams whose damage comes from what the target hits. Cold, a push does no damage at all — the purest cold-cast deficit in the game; the entire value is where the target ends up.

**Extenders** — *refresh* by re-shoving (cantrip pushes and pulls cost nothing and keep a target out of position every round), *prolong* holds (Stasis and grapples keep a body fixed while allies line up), and *convert* (pushed → prone → restrained escalation as the kinetic grip tightens).

**Solo engine** (multi-turn): T1 Pressure Orb (drag the pack into one struggling knot) → T2 Shockwave (blast payoff into the cluster, knocking the knot *prone*) → T3 Phantom Crush on the priority target while everyone else stands back up. Gated by concentration on the orb and by the fact that cantrip pushes deal no damage — the engine spends whole turns on position instead of direct harm.

**Party interlock**: **emits** *prone*, *clusters*, *restrained*, and delivery (throwing an enemy to the martial's feet, or holding one still for the assassin) — the premier battery school, feeding every damage-dealer at the table. **wants** damage payoffs it cannot supply: an Evocation AoE for its clusters, a martial's heavy blow for its prone and held targets. Cross-player line: Telekinetics pins the ogre *prone* with a kinetic hold and the fighter's greataxe falls on a target that cannot dodge.

**Synergy gaps (updated 2026-07-16)**: the in-school payoff loop is now published — *Grinding Weight* (R2) and *Forceful Implosion* (R3) price up against *prone/held* targets, *Meteoric Throw* (R3) converts the signature hold into a finisher, and *Relentless Grip* (R2) is the prolong-extender. Remaining gap: the levitate → drop loop still rests on the *Aerial Grasp* seed (R3, the school's only live seed).

## Current Spell Inventory (26 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 4 | Alter Weight, Phantom Pull, Phantom Push, Weak Telekinesis |
| 1 | 8 | Feather Fall, Pressure Orb, Grease, Unseen Deflection, Reflective Barrier, Shockwave, Phantom Crush, Unseen Volley |
| 2 | 7 | Grinding Weight, Haste, Knock, Levitation, Relentless Grip, Stasis, Strong Telekinesis |
| 3 | 5 | Distortion Field, Forceful Implosion, Meteoric Throw, Orbiting Shards, Part Stone |
| 4 | 1 | Falling Sky (published R5 Heighten) |
| 5 | 1 | Annihilating Wave |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| move | Weak Telekinesis | Unseen Volley | Strong Telekinesis | Orbiting Shards, Meteoric Throw | — | Strong Telekinesis (Heighten) |
| repel | Phantom Push | Shockwave, Unseen Deflection | Shockwave (Heighten) | Distortion Field | — | Annihilating Wave |
| levitate | Weak Telekinesis | Feather Fall | Levitation | Aerial Grasp† | — | — |
| crush | — | Phantom Crush | Grinding Weight, Relentless Grip | Forceful Implosion | — | Annihilating Wave |
| gravity | Alter Weight | Pressure Orb | Stasis | Pressure Orb (Heighten) | Falling Sky | Falling Sky (Heighten) |

*† = proposed seed (undesigned). All Heighten cells above are published (Shockwave R2–R3, Pressure Orb R2–R3, Strong Telekinesis R3–R5, Falling Sky R5). Knock, Grease, Haste, and Part Stone sit outside the trait rows as utility. The old R4 seeds (Telekinetic Storm, Telekinetic Flight, Repulsion Field) were passed over in the P4 cycle — those cells are honest gaps now.*

**Coverage**: 24/30 trait×rank slots hold a published spell or a published Heighten; 1 seed (Aerial Grasp, levitate R3). Honest gaps: crush R0, crush R4, levitate R5, and the R4 row outside gravity — an honest empty cell beats a filler seed (principle 19).

**Critical gaps (updated 2026-07-16)**: none open for design except Aerial Grasp (R3, levitate). R4 thinness (Falling Sky alone) is accepted by owner choice from the P4 cycle.

## Proposed Spell Changes (Heighten Extensions)

✅ **All published (P7 cycle)** — Shockwave (R2–R3), Unseen Volley (R2–R3), Pressure Orb (R2–R3), Strong Telekinesis (R3–R5), and Falling Sky (R5) all carry their Heighten lines in the published file. No pending Heighten work.

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

*Published from this table (2026-07-13 to 2026-07-16): Alter Weight (R0), Unseen Deflection (R1), Grinding Weight (R2), Relentless Grip (R2), Meteoric Throw (R3), Forceful Implosion (R3), Annihilating Wave (R5). Passed over (P4 cycle, owner choice — do not re-seed): Telekinetic Storm (R4), Telekinetic Flight (R4), Repulsion Field (R4).*

| Concept | Rank | Role | Seed |
|---|---|---|---|
| Aerial Grasp | 3 | Control / setup | Wrench one creature skyward (levitate trait): *restrained* in mid-air while you concentrate, and when the spell ends or you release them they take falling damage for the height. Sets up Grinding Weight and Meteoric Throw (target is held), and the drop is its own delayed payoff. Tier-capped by Size like Stasis. |

## Cross-School Spell Sharing

**No Natural Mystic Overlap**

Telekinetics has no significant thematic overlap with any Mystic tradition. The discipline's identity — transgressive force without physical contact — is distinctly arcane in nature. While Tempest (Mystic) involves physical force through storms, the mechanism (divine weather control vs. mental kinetic manipulation) is fundamentally different.

No shared spells are recommended for this discipline.

> **Design Note**: Telekinetics is one of the most purely arcane disciplines, with no reverent or communal equivalent in Mystic traditions.

## Synergy & Completeness Assessment

### Spell Progression Chains
(✨ = undesigned seed; Heighten extensions cover several upper slots — see Proposed Spell Changes)
1. **Move chain**: Weak Telekinesis (R0) → Unseen Volley (R1) → Strong Telekinesis (R2) → Orbiting Shards / Meteoric Throw (R3) → honest gap (R4) → Strong Telekinesis Heighten (R5)
2. **Repel chain**: Phantom Push (R0) → Shockwave / Unseen Deflection (R1) → Shockwave Heighten (R2) → Distortion Field (R3) → honest gap (R4) → Annihilating Wave (R5)
3. **Levitate chain**: Weak Telekinesis (R0) → Feather Fall (R1) → Levitation (R2) → ✨ Aerial Grasp (R3) → honest gaps (R4, R5)
4. **Crush chain**: honest gap (R0) → Phantom Crush (R1) → Grinding Weight / Relentless Grip (R2) → Forceful Implosion (R3) → honest gap (R4) → Annihilating Wave (R5)
5. **Gravity chain**: Alter Weight (R0) → Pressure Orb (R1) → Stasis (R2) → Pressure Orb Heighten (R3) → Falling Sky (R4) → Falling Sky Heighten (R5)

### Setup + Payoff Combos
(✨ = undesigned seed)
- ✅ **Push into hazard → damage**: cantrip pushes and pulls into fires, ledges, and Distortion Field's zone — the core published loop, damage comes from where the target ends up
- ✅ **Prone / held → martial exploit**: Shockwave and Stasis feed the party's damage-dealers; the premier battery-school interlock
- ✅ **Held → in-school payoff**: Stasis / Pressure Orb (/ ✨ Aerial Grasp) hold the target → Grinding Weight crushes the pinned body, Meteoric Throw hurls it — published loop
- ✅ **Cluster → AoE**: Pressure Orb drags the pack together → Forceful Implosion punishes the knot
- ✅ **Escalation extender**: pushed → *prone* → *restrained*, prolonged by Relentless Grip while allies line up — published
- ✨ **Levitate → drop**: ✨ Aerial Grasp suspends → release converts height into falling damage; Falling Sky is the published area version

### Design Completeness Checklist
- [x] R1 Quick Action: Unseen Deflection published (reactive +2 Dodge/Parry with projectile redirect)
- [x] Defensive options: Reflective Barrier (R1), Feather Fall (R1), Unseen Deflection (R1), Distortion Field (R3) published
- [x] Utility: Weak/Strong Telekinesis, Grease, Knock, Levitation, Part Stone published — the school's Excels role is well covered
- [x] Damage across ranks: in-school payoffs published (Grinding Weight R2, Forceful Implosion R3, Meteoric Throw R3, Annihilating Wave R5) — thin-above-R1-by-design is now a choice, not a hole
- [x] Repeating conditions: prone, restrained, pushed/pulled — consistent forced-movement identity across published spells
- [x] Setup+payoff: published setups rich and the in-school payoff loop is published (see combos above); only the levitate → drop loop remains a seed
- [x] **3 spells per rank minimum (published)**: R0: 4, R1: 8, R2: 7, R3: 5 — met through R3; R4: 1, R5: 1 accepted below target by owner choice (P4/P5 cycles)
- [ ] **Trait × rank coverage**: 24/30 slots published (+1 seed: Aerial Grasp, levitate R3); honest gaps at crush R0, the non-gravity R4 row, and levitate R5
