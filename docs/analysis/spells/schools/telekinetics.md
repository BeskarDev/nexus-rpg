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
4. **Known gaps**: no published R1 Quick Action reactive spell, thin R3+ coverage (R3: 3, R4: 1, R5: 0 published), and near-zero in-school payoff for the school's own setups
5. Complete levitate/crush/gravity chains from R0 cantrips through R5 capstones

### Internal Synergies

Framework: `.claude/skills/spell-design/references/synergy-framework.md` — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Telekinetics emits: **position itself** — *prone* (slams and drops), *pushed/pulled* into hazards, walls, or ally reach, *clusters* (dragging enemies together with Gravity Orb's pull), and *restrained/grappled* (kinetic holds, Stasis). The world is the weapon: every ledge, campfire, and spiked barricade the table describes is a payoff surface for its forced movement.

**Payoff levers** — Telekinetics rewards targets that are *already down or held*: crush effects that hit harder on a pinned or prone body, drops that convert its own levitation into falling damage, slams whose damage comes from what the target hits. Cold, a push does no damage at all — the purest cold-cast deficit in the game; the entire value is where the target ends up.

**Extenders** — *refresh* by re-shoving (cantrip pushes and pulls cost nothing and keep a target out of position every round), *prolong* holds (Stasis and grapples keep a body fixed while allies line up), and *convert* (pushed → prone → restrained escalation as the kinetic grip tightens).

**Solo engine** (multi-turn): T1 Gravity Orb (drag the pack into one struggling knot) → T2 Shockwave (blast payoff into the cluster, knocking the knot *prone*) → T3 Telekinetic Crush on the priority target while everyone else stands back up. Gated by concentration on the orb and by the fact that cantrip pushes deal no damage — the engine spends whole turns on position instead of direct harm.

**Party interlock**: **emits** *prone*, *clusters*, *restrained*, and delivery (throwing an enemy to the martial's feet, or holding one still for the assassin) — the premier battery school, feeding every damage-dealer at the table. **wants** damage payoffs it cannot supply: an Evocation AoE for its clusters, a martial's heavy blow for its prone and held targets. Cross-player line: Telekinetics pins the ogre *prone* with a kinetic hold and the fighter's greataxe falls on a target that cannot dodge.

**Synergy gaps**: overwhelming setup, near-zero **in-school payoff** — the discipline can arrange the battlefield perfectly and then has little of its own to spend it on (its crush damage is modest). Extenders beyond re-casting are also thin. The seed table below carries these design targets: *Grinding Weight* (R2) and *Kinetic Implosion* (R3) as priced payoffs against *prone/held* targets, *Meteoric Throw* (R3) converting the signature hold into a finisher, and *Relentless Grip* (R2) as the missing prolong-extender.

## Current Spell Inventory (19 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Kinetic Pull, Kinetic Push, Weak Telekinesis |
| 1 | 7 | Feather Fall, Gravity Orb, Grease, Reflective Barrier, Shockwave, Telekinetic Crush, Telekinetic Volley |
| 2 | 5 | Haste, Knock, Levitation, Stasis, Strong Telekinesis |
| 3 | 3 | Distortion Field, Orbiting Shards, Part Stone |
| 4 | 1 | Reverse Gravity (published R5 Heighten) |
| 5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| move | Weak Telekinesis | Telekinetic Volley | Strong Telekinesis | Orbiting Shards, Meteoric Throw† | Telekinetic Storm† | — (Strong Telekinesis Heighten) |
| repel | Kinetic Push | Shockwave, Kinetic Deflection† | — (Shockwave Heighten) | Distortion Field | Repulsion Field† | Annihilating Wave† |
| levitate | Weak Telekinesis | Feather Fall | Levitation | Aerial Grasp† | Telekinetic Flight† | — |
| crush | — | Telekinetic Crush | Grinding Weight†, Relentless Grip† | Kinetic Implosion† | — | Annihilating Wave† |
| gravity | Gravity Shift† | Gravity Orb | Stasis | — (Gravity Orb Heighten) | Reverse Gravity | Reverse Gravity (Heighten) |

*† = proposed seed (undesigned). Ranks follow the current published file: Orbiting Shards and Distortion Field are complete at R3, and Reverse Gravity is complete at R4 with a published R5 Heighten. Knock, Grease, Haste, and Part Stone sit outside the trait rows as utility.*

**Coverage**: 27/30 trait×rank slots hold a published spell, a seed, or a proposed Heighten extension (see below). Honest gaps: crush R0, crush R4, levitate R5 — an honest empty cell beats a filler seed. Only published spells count as real coverage; proposed entries are undesigned seeds (principle 19).

**Critical gaps**: the missing R1 Quick Action reactive (Kinetic Deflection†) and the missing in-school payoff (Grinding Weight†, Kinetic Implosion†, Meteoric Throw†) are seeded. Published coverage above R2 remains thin (R3: 3, R4: 1, R5: 0), so the R3+ seeds and Heighten extensions are the production priority.

## Proposed Spell Changes (Heighten Extensions)

Per principle 3, "bigger version of X" concepts are Heighten notes on published spells, not new seeds:

- **Shockwave (R1)**: add (Rank 2) and (Rank 3) Heighten lines scaling damage and push distance. Covers the R2 repel AoE slot.
- **Telekinetic Volley (R1)**: add (Rank 2) and (Rank 3) Heighten lines for more or heavier hurled objects. Covers the mid-rank object-barrage concept.
- **Gravity Orb (R1)**: add (Rank 2) and (Rank 3) Heighten lines growing the orb's area, duration, and the creature Size it can grapple. Covers the R3 gravity-pull zone.
- **Strong Telekinesis (R2)**: add (Rank 3) through (Rank 5) Heighten lines scaling object Size and load. Covers the top-end "battlefield authority" concept.
- **Reverse Gravity (R4)** already carries its published R5 Heighten — the R5 gravity capstone exists and needs no seed.

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Role | Seed |
|---|---|---|---|
| Gravity Shift | 0 | Control / setup | Cantrip that briefly makes one creature's gravity heavier or lighter (gravity trait). Heavier: their next roll to resist forced movement or being knocked *prone* suffers +1 bane (feeds every push and slam in the school). Lighter: they count as one Size smaller for the school's lift and throw effects (feeds Strong Telekinesis and Meteoric Throw). Pure setup, no damage. |
| Kinetic Deflection | 1 | Defense / standalone | The standardized R1 Quick Action reactive (+2 to Dodge or Parry against the triggering attack, no SL scaling). School secondary (repel trait): if the triggering attack was a thrown weapon or projectile and it misses, you redirect it at another creature in short range with a modest flat damage rider. |
| Grinding Weight | 2 | Offense / payoff | Concentrated crushing pressure on one creature (crush and gravity traits): modest damage cold, but heavy bonus damage against a target that is *prone*, *restrained*, or *grappled*. The school's missing in-school payoff — spends the *prone/held* states its own pushes, Stasis, and Gravity Orb emit. Cold-cast deficit is the design center. |
| Relentless Grip | 2 | Control / extender | Kinetic hold that tightens instead of striking (crush trait): a target currently *grappled* or *restrained* by any effect has that state prolonged and suffers +1 bane on rolls to escape it. The missing prolong-extender — converts the pushed → prone → restrained escalation into a lasting pin for allies to exploit. Does nothing to a free target. |
| Meteoric Throw | 3 | Offense / payoff | Hurl a creature you or an ally holds *restrained* or *grappled* (move trait) at another target: both take blast damage and fall *prone*. Converts the school's signature hold (Stasis, Gravity Orb's grapple) into a finisher and re-emits prone for the martials. Castable only on a held target — hard cold-cast deficit. |
| Kinetic Implosion | 3 | Offense / payoff | Crushing force collapses inward on a point (crush and gravity traits): creatures in the area are dragged toward the center and take damage on the half single-target AoE chassis, with bonus damage against *prone* or *restrained* targets. The AoE payoff for Gravity Orb's clusters — cold on a spread field, brutal on the knot the school built. |
| Aerial Grasp | 3 | Control / setup | Wrench one creature skyward (levitate trait): *restrained* in mid-air while you concentrate, and when the spell ends or you release them they take falling damage for the height. Sets up Grinding Weight and Meteoric Throw (target is held), and the drop is its own delayed payoff. Tier-capped by Size like Stasis. |
| Telekinetic Storm | 4 | Offense / setup | Whirlwind of seized debris in an area (move and repel traits): blast damage to creatures in the zone and each is pushed and knocked *prone* on a failed save vs. your Resist. The school's first real AoE damage, still setup-heavy — the prone field it leaves is the party's payoff surface. Flat recurring zone damage per principle 44 if made a lasting zone. |
| Telekinetic Flight | 4 | Utility / standalone | Sustained true flight for yourself or a touched ally (levitate trait), enchant duration. The levitate chain's utility capstone in the school's Excels role. Rank justified against Levitation (R2, hover only) — this is the D&D Fly-and-above tier with full aerial mobility. |
| Repulsion Field | 4 | Defense / setup | A dome of outward kinetic pressure around you (repel trait): enemies treat the dome as difficult terrain, must save vs. your Resist to enter, and a failed save pushes them back and can leave them *prone*. Denies melee and manufactures the forced-movement states the party spends. Concentrate. |
| Annihilating Wave | 5 | Offense / payoff | The repel and crush capstone: a devastating kinetic wave in a line or cone — heavy blast damage, destroys mundane structures and cover, pushes creatures and knocks them *prone*, with bonus damage against targets that strike a wall or obstacle (the collision payoff writ large). Material cost 5,000+ coins. Mortal pinnacle: Delayed-Blast-Fireball tier, not Meteor Swarm. |

## Cross-School Spell Sharing

**No Natural Mystic Overlap**

Telekinetics has no significant thematic overlap with any Mystic tradition. The discipline's identity — transgressive force without physical contact — is distinctly arcane in nature. While Tempest (Mystic) involves physical force through storms, the mechanism (divine weather control vs. mental kinetic manipulation) is fundamentally different.

No shared spells are recommended for this discipline.

> **Design Note**: Telekinetics is one of the most purely arcane disciplines, with no reverent or communal equivalent in Mystic traditions.

## Synergy & Completeness Assessment

### Spell Progression Chains
(✨ = undesigned seed; Heighten extensions cover several upper slots — see Proposed Spell Changes)
1. **Move chain**: Weak Telekinesis (R0) → Telekinetic Volley (R1) → Strong Telekinesis (R2) → Orbiting Shards / ✨ Meteoric Throw (R3) → ✨ Telekinetic Storm (R4) → Strong Telekinesis Heighten (R5)
2. **Repel chain**: Kinetic Push (R0) → Shockwave / ✨ Kinetic Deflection (R1) → Shockwave Heighten (R2) → Distortion Field (R3) → ✨ Repulsion Field (R4) → ✨ Annihilating Wave (R5)
3. **Levitate chain**: Weak Telekinesis (R0) → Feather Fall (R1) → Levitation (R2) → ✨ Aerial Grasp (R3) → ✨ Telekinetic Flight (R4) → honest gap (R5)
4. **Crush chain**: honest gap (R0) → Telekinetic Crush (R1) → ✨ Grinding Weight / ✨ Relentless Grip (R2) → ✨ Kinetic Implosion (R3) → honest gap (R4) → ✨ Annihilating Wave (R5)
5. **Gravity chain**: ✨ Gravity Shift (R0) → Gravity Orb (R1) → Stasis (R2) → Gravity Orb Heighten (R3) → Reverse Gravity (R4) → Reverse Gravity Heighten (R5)

### Setup + Payoff Combos
(✨ = undesigned seed)
- ✅ **Push into hazard → damage**: cantrip pushes and pulls into fires, ledges, and Distortion Field's zone — the core published loop, damage comes from where the target ends up
- ✅ **Prone / held → martial exploit**: Shockwave and Stasis feed the party's damage-dealers; the premier battery-school interlock
- ✨ **Held → in-school payoff**: Stasis / Gravity Orb / ✨ Aerial Grasp hold the target → ✨ Grinding Weight crushes the pinned body, ✨ Meteoric Throw hurls it — the missing in-school spend, currently seeds only
- ✨ **Cluster → AoE**: Gravity Orb drags the pack together → ✨ Kinetic Implosion or ✨ Telekinetic Storm punishes the knot (today the payoff must come from Evocation or the martials)
- ✨ **Escalation extender**: pushed → *prone* → *restrained*, prolonged by ✨ Relentless Grip while allies line up
- ✨ **Levitate → drop**: ✨ Aerial Grasp suspends → release converts height into falling damage; Reverse Gravity is the published area version

### Design Completeness Checklist
- [ ] R1 Quick Action: ✨ Kinetic Deflection seeded — standardized reactive defense (+2 Dodge/Parry, projectile redirect secondary), not yet designed
- [x] Defensive options: Reflective Barrier (R1), Feather Fall (R1), Distortion Field (R3) published; ✨ Repulsion Field (R4) seeded
- [x] Utility: Weak/Strong Telekinesis, Grease, Knock, Levitation, Part Stone published — the school's Excels role is well covered; ✨ Telekinetic Flight extends it to R4
- [ ] Damage across ranks: thin above R1 by design (setup school), but the in-school payoffs (✨ Grinding Weight R2, ✨ Kinetic Implosion R3, ✨ Meteoric Throw R3, ✨ Annihilating Wave R5) are all seeds — top production priority
- [x] Repeating conditions: prone, restrained, pushed/pulled — consistent forced-movement identity across published spells and seeds
- [ ] Setup+payoff: published setups are rich; in-school payoff loop exists only as seeds (see combos above)
- [x] **3 spells per rank minimum (published)**: R0: 3, R1: 7, R2: 5, R3: 3 — met through R3; R4: 1, R5: 0 need the seeded buildout
- [ ] **Trait × rank coverage**: 27/30 slots hold a published spell, seed, or Heighten extension; honest gaps at crush R0, crush R4, levitate R5
