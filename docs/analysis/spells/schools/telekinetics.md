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
4. **Known gaps**: no published R1 Quick Action reactive spell, thin R3+ coverage (only incomplete spells above R2) — concept seeds exist for all slots but none are designed
5. Complete levitate/crush/gravity chains from R0 cantrips through R5 capstones

### Internal Synergies

Framework: [synergy-framework.md](../../../../.claude/skills/spell-design/references/synergy-framework.md) — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Telekinetics emits: **position itself** — *prone* (slams and drops), *pushed/pulled* into hazards, walls, or ally reach, *clusters* (dragging enemies together with Gravity Orb's pull), and *restrained/grappled* (kinetic holds, Stasis). The world is the weapon: every ledge, campfire, and spiked barricade the table describes is a payoff surface for its forced movement.

**Payoff levers** — Telekinetics rewards targets that are *already down or held*: crush effects that hit harder on a pinned or prone body, drops that convert its own levitation into falling damage, slams whose damage comes from what the target hits. Cold, a push does no damage at all — the purest cold-cast deficit in the game; the entire value is where the target ends up.

**Extenders** — *refresh* by re-shoving (cantrip pushes and pulls cost nothing and keep a target out of position every round), *prolong* holds (Stasis and grapples keep a body fixed while allies line up), and *convert* (pushed → prone → restrained escalation as the kinetic grip tightens).

**Solo engine** (multi-turn): T1 Gravity Orb (drag the pack into one struggling knot) → T2 Shockwave (blast payoff into the cluster, knocking the knot *prone*) → T3 Telekinetic Crush on the priority target while everyone else stands back up. Gated by concentration on the orb and by the fact that cantrip pushes deal no damage — the engine spends whole turns on position instead of direct harm.

**Party interlock**: **emits** *prone*, *clusters*, *restrained*, and delivery (throwing an enemy to the martial's feet, or holding one still for the assassin) — the premier battery school, feeding every damage-dealer at the table. **wants** damage payoffs it cannot supply: an Evocation AoE for its clusters, a martial's heavy blow for its prone and held targets. Cross-player line: Telekinetics pins the ogre *prone* with a kinetic hold and the fighter's greataxe falls on a target that cannot dodge.

**Synergy gaps**: overwhelming setup, near-zero **in-school payoff** — the discipline can arrange the battlefield perfectly and then has little of its own to spend it on (its crush damage is modest). One honest mid-rank payoff against *prone/restrained* targets would close the loop without stealing Evocation's role. Extenders beyond re-casting are also thin.

**Synergy gap proposals** (sketches, post-framework — design fresh per current principles):
- **Grinding Weight** (R2, payoff) — slam crushing force down onto a *prone* or *restrained* creature: physical damage and they stay down (standing up costs their full Movement this turn). Near-useless against a standing target — the pin is the price of the power.
- **Relentless Grip** (R2, extender/prolong) — your kinetic hold tightens on a creature you have *grappled* or *restrained* with a spell: the hold persists without concentration for a short duration and drags the target a close distance each of your turns. Frees the caster's concentration for the payoff while the setup holds.
- **Meteoric Throw** (R3, payoff/convert) — hurl a creature you are levitating or holding at another enemy: both take physical damage and fall *prone*. Converts the school's signature hold into its own finisher, damage scaled by the thrown body's Size.

## Current Spell Inventory (19 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Kinetic Pull, Kinetic Push, Weak Telekinesis |
| 1 | 7 | Feather Fall, Gravity Orb, Grease, Reflective Barrier, Shockwave, Telekinetic Crush, Telekinetic Volley |
| 2 | 6 | Haste, Knock, Levitation, Orbiting Shards (incomplete), Stasis, Strong Telekinesis |
| 3 | 2 | Distortion Field (incomplete), Part Stone |
| 4 | 1 | Invert Gravity (incomplete) |
| 5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| move | Weak Telekinesis | Telekinetic Volley | Strong Telekinesis | Kinetic Barrage† | Kinetic Catapult† | Absolute Telekinesis† |
| repel | Kinetic Push | Shockwave | Kinetic Wave† | Distortion Field* / Force Wall† | Repulsion Field† | Annihilating Wave† |
| levitate | Minor Levitation† | Kinetic Lift† | Levitation | Aerial Grasp† | Telekinetic Flight† | Gravity Reversal† |
| crush | Pressure Grip† | Telekinetic Crush | Crushing Sphere† | Kinetic Implosion† | Force Cage† | Absolute Telekinesis† |
| gravity | Gravity Shift† | Gravity Orb | Stasis | Gravity Well† | Invert Gravity* / Telekinetic Storm† | Gravity Reversal† |

*\* = incomplete existing  † = proposed*

**Coverage**: all 30 trait×rank slots have at least a concept seed (published spell or proposed concept). Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).

**All prior critical gaps resolved.** Every trait has complete R0–R5 progression. Minimum 3 spells per rank met (R0: 6, R1: 8, R2: 6, R3: 6, R4: 6, R5: 3).

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Seed |
|---|---|---|
| Kinetic Deflection | 1 | You telekinetically deflect an incoming projectile, redirecting its force. (R1 Quick Action reactive defense) |
| Force Shield | 1 | You maintain a shimmering barrier of telekinetic force around yourself. (Defensive spell for Telekinetics — force barrier fits the identity) |
| Minor Levitation | 0 | You lift a small object into the air with a thought, holding it aloft briefly. (Fills R0 levitate gap) |
| Pressure Grip | 0 | You close your fist and telekinetic force crushes around a target. (R0 crush cantrip) |
| Gravity Shift | 0 | You alter the pull of gravity on a creature or object, making it briefly lighter or heavier. (R0 gravity cantrip) |
| Gravity Reversal | 5 | You invert gravity in a large area, causing everything within to fall upward. (R5 capstone — area control through gravity manipulation) |
| Kinetic Barrage | 3 | You seize multiple objects in the environment — stones, debris, weapons — and hurl them at your enemies in a devastating volley. (Fills R3 move/repel gap) |
| Crushing Sphere | 2 | You encase a creature in a sphere of concentrated telekinetic force that slowly crushes inward. (Fills R2 crush gap) |
| Force Wall | 3 | You thrust your hands outward and an invisible wall of pure telekinetic force materializes, blocking passage and deflecting attacks. (R3 defensive telekinetic barrier) |
| Telekinetic Storm | 4 | You seize every loose object in the area — stones, debris, weapons, furniture — and hurl them in a devastating whirlwind of telekinetic fury. (R4 AoE damage with battlefield control) |
| Absolute Telekinesis | 5 | You extend your will across the battlefield with absolute authority over matter and motion — lifting gates, hurling boulders, pinning warriors in place, reshaping the physical world through sheer mental force. (R5 utility/offense capstone — the pinnacle of telekinetic power) |
| Kinetic Lift | 1 | You extend your will beneath a creature, buoying them on an invisible cushion of telekinetic force. They drift upward, floating just above the ground. (R1 levitate utility) |
| Kinetic Wave | 2 | You thrust both arms outward and a concussive wave of telekinetic force erupts from your body, slamming into everything nearby. (R2 repel AoE. Half single-target scaling (+3/+6/+9)) |
| Aerial Grasp | 3 | You seize an enemy with telekinetic force and wrench them skyward, suspending them helplessly in mid-air where they dangle like a puppet on invisible strings. (R3 levitate control) |
| Kinetic Implosion | 3 | You clench your fist and the air itself contracts — an invisible crushing force collapses inward on a point, dragging everything toward the center and grinding it together. (R3 crush AoE. Half single-target scaling (+4/+8/+12)) |
| Gravity Well | 3 | You warp gravity around a point, creating a relentless downward pull that drags everything inward like a whirlpool in the earth itself. (R3 gravity control) |
| Kinetic Catapult | 4 | You seize a creature or massive object with overwhelming telekinetic force and hurl it across the battlefield at devastating speed, turning matter into a weapon. (R4 move offense) |
| Telekinetic Flight | 4 | You wrap yourself or an ally in a cocoon of sustained telekinetic force, granting true flight — soaring through the air by will alone. (R4 levitate utility capstone) |
| Force Cage | 4 | You snap your fingers and bars of pure telekinetic force materialize around a creature, forming an inescapable cage that slowly constricts inward. (R4 crush control) |
| Repulsion Field | 4 | You project an invisible dome of outward-pressing telekinetic force that repels everything that approaches, holding enemies at bay with sheer kinetic pressure. (R4 repel defense) |
| Annihilating Wave | 5 | You channel an overwhelming surge of telekinetic force through an enchanted lodestone, unleashing a cataclysmic wave of pure kinetic devastation that flattens everything in its path — shattering walls, uprooting trees, and hurling creatures like ragdolls. (R5 repel capstone) |

## Cross-School Spell Sharing

**No Natural Mystic Overlap**

Telekinetics has no significant thematic overlap with any Mystic tradition. The discipline's identity — transgressive force without physical contact — is distinctly arcane in nature. While Tempest (Mystic) involves physical force through storms, the mechanism (divine weather control vs. mental kinetic manipulation) is fundamentally different.

No shared spells are recommended for this discipline.

> **Design Note**: Telekinetics is one of the most purely arcane disciplines, with no reverent or communal equivalent in Mystic traditions.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Move chain**: Weak Telekinesis (R0) → Telekinetic Volley (R1) → Strong Telekinesis (R2) → Kinetic Barrage (R3) → Kinetic Catapult (R4) → Absolute Telekinesis (R5)
2. **Repel chain**: Kinetic Push (R0) → Shockwave (R1) → Kinetic Wave (R2) → Distortion Field (R3\*)/Force Wall (R3) → Repulsion Field (R4) → Annihilating Wave (R5)
3. **Levitate chain**: Minor Levitation (R0) → Kinetic Lift (R1) → Levitation (R2) → Aerial Grasp (R3) → Telekinetic Flight (R4) → Gravity Reversal (R5)
4. **Crush chain**: Pressure Grip (R0) → Telekinetic Crush (R1) → Crushing Sphere (R2) → Kinetic Implosion (R3) → Force Cage (R4) → Absolute Telekinesis (R5)
5. **Gravity chain**: Gravity Shift (R0) → Gravity Orb (R1) → Stasis (R2) → Gravity Well (R3) → Invert Gravity (R4\*)/Telekinetic Storm (R4) → Gravity Reversal (R5)

### Setup + Payoff Combos
- ✅ **Push into hazard → bonus damage**: Forced movement into environmental hazards or Force Wall is a core tactical loop
- ✅ **Prone → follow-up attacks**: Kinetic Push/Kinetic Wave/Telekinetic Storm knock prone → melee allies exploit prone targets
- ✅ **Force Wall + Push/Implosion**: Create wall, then push enemies into it — or use Kinetic Implosion to drag enemies into the wall for bonus damage
- ✅ **Crush chain escalation**: Pressure Grip (R0) → Crushing Sphere (R2) → Force Cage (R4) → Absolute Telekinesis (R5) — escalating restraint + damage
- ✅ **Levitate → slam/drop**: Minor Levitation (R0) → Kinetic Lift (R1) → Aerial Grasp (R3, slam payoff) → Telekinetic Flight (R4) → Gravity Reversal (R5) — complete chain with mid-rank payoffs
- ✅ **Gravity Well + AoE**: Gravity Well (R3) pulls enemies to center → Kinetic Implosion (R3) or Telekinetic Storm (R4) damages clustered targets
- ✅ **Catapult combos**: Kinetic Catapult (R4) hurls creatures into Force Wall or allies' reach for collision + follow-up damage
- ✅ **Repulsion Field + ranged allies**: Repulsion Field (R4) denies melee approach → ranged allies exploit helpless enemies at range

### Design Completeness Checklist
- [x] R1 Quick Action: Kinetic Deflection — standardized reactive defense (+2 Dodge/Parry, projectile redirection secondary)
- [x] Defensive options: Reflective Barrier (R1), Force Shield (R1), Kinetic Deflection (R1), Force Wall (R3), Repulsion Field (R4) — defensive suite across ranks
- [x] Utility: Weak/Strong Telekinesis (R0/R2), Minor Levitation (R0), Gravity Shift (R0), Kinetic Lift (R1), Telekinetic Flight (R4), Absolute Telekinesis (R5)
- [x] Damage across ranks: R0–R5 covered — Kinetic Wave (R2), Kinetic Barrage/Kinetic Implosion (R3), Telekinetic Storm/Kinetic Catapult (R4), Annihilating Wave/Absolute Telekinesis (R5)
- [x] Repeating conditions: Prone, restrained, pushed/pulled — consistent forced movement identity
- [x] Setup+payoff: Force Wall + Push combo, Crush chain escalation, Gravity Well + AoE clustering, Levitate → slam/drop, Catapult collision
- [x] **3 spells per rank minimum**: R0: 6, R1: 8, R2: 6, R3: 6, R4: 6, R5: 3 — all ranks meet minimum
- [x] **100% trait × rank coverage**: All 30 slots filled — every trait has complete R0–R5 progression
