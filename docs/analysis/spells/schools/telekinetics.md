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
4. **All identified gaps addressed**: R1 Quick Action reactive (Kinetic Deflection), defensive suite across ranks, full R0–R5 trait coverage
5. Complete levitate/crush/gravity chains from R0 cantrips through R5 capstones

### Internal Synergies
- **Setup**: Push/pull target into hazard or ally's reach → **Payoff**: Prone targets take +2 damage from next attack
- **Setup**: Levitate ally → **Payoff**: Gravity-enhanced melee attacks deal bonus damage

## Spell Inventory (35 spells — 14 existing, 21 proposed)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 6 | Kinetic Pull, Kinetic Push, Weak Telekinesis, Minor Levitation†, Pressure Grip†, Gravity Shift† |
| 1 | 8 | Gravity Orb, Reflective Barrier, Shockwave, Telekinetic Crush, Telekinetic Volley, Kinetic Deflection†, Force Shield†, Kinetic Lift† |
| 2 | 6 | Levitation, Orbiting Shards*, Stasis, Strong Telekinesis, Crushing Sphere†, Kinetic Wave† |
| 3 | 6 | Distortion Field*, Kinetic Barrage†, Force Wall†, Aerial Grasp†, Kinetic Implosion†, Gravity Well† |
| 4 | 6 | Invert Gravity*, Telekinetic Storm†, Kinetic Catapult†, Telekinetic Flight†, Force Cage†, Repulsion Field† |
| 5 | 3 | Gravity Reversal†, Absolute Telekinesis†, Annihilating Wave† |

*\* = incomplete existing  † = proposed*

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| move | Weak Telekinesis | Telekinetic Volley | Strong Telekinesis | Kinetic Barrage† | Kinetic Catapult† | Absolute Telekinesis† |
| repel | Kinetic Push | Shockwave | Kinetic Wave† | Distortion Field* / Force Wall† | Repulsion Field† | Annihilating Wave† |
| levitate | Minor Levitation† | Kinetic Lift† | Levitation | Aerial Grasp† | Telekinetic Flight† | Gravity Reversal† |
| crush | Pressure Grip† | Telekinetic Crush | Crushing Sphere† | Kinetic Implosion† | Force Cage† | Absolute Telekinesis† |
| gravity | Gravity Shift† | Gravity Orb | Stasis | Gravity Well† | Invert Gravity* / Telekinetic Storm† | Gravity Reversal† |

*\* = incomplete existing  † = proposed*

**Coverage**: 30/30 slots filled (100%) — full trait × rank coverage achieved

**All prior critical gaps resolved.** Every trait has complete R0–R5 progression. Minimum 3 spells per rank met (R0: 6, R1: 8, R2: 6, R3: 6, R4: 6, R5: 3).

## Proposed New Spells

### Kinetic Deflection

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Self | Self | quick

*You telekinetically deflect an incoming projectile, redirecting its force.*

**Effect.** As a Quick Action when targeted by an attack, gain +2 to your Dodge or Parry against the triggering attack. If the attack is ranged and misses, you can redirect the projectile to one target within close range, dealing +2 physical damage.

> **Design Note**: R1 Quick Action reactive defense. Standardized base (+2 Dodge/Parry) with Telekinetics' projectile redirection as secondary effect. No SL scaling — one reliable defensive reaction.

### Force Shield

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Self | Self | concentrate, enchant (short)

*You maintain a shimmering barrier of telekinetic force around yourself.*

**Weak.** Gain +1 AV (situational bonus) for a short duration while concentrating.
**Strong.** Gain +2 AV (situational bonus) for a short duration.
**Critical.** Gain +2 AV (situational bonus) for a short duration. When a melee attacker hits you, they are pushed into close range.

> **Design Note**: Defensive spell for Telekinetics — force barrier fits the identity.

### Minor Levitation

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Easy TN | Close | —

*You lift a small object into the air with a thought, holding it aloft briefly.*

**Weak.** Levitate one unattended object (up to 1 load) to a height of close range for a brief duration. You can move it slowly within close range.
**Strong.** Levitate up to 2 load. You can move the object more precisely, manipulating it at distance (open doors, pull levers).
**Critical.** Levitate up to 3 load. You can throw the levitated object at a target within close range, dealing +2 physical damage.

> **Design Note**: Fills R0 levitate gap. Object-only levitation at cantrip level.

### Pressure Grip

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Close | —

*You close your fist and telekinetic force crushes around a target.*

**Weak.** Deal +2 physical damage. The target is briefly slowed.
**Strong.** Deal +4 physical damage. The target is briefly slowed.
**Critical.** Deal +6 physical damage. The target is briefly slowed and suffers +1 bane on their next attack roll.

> **Design Note**: R0 crush cantrip. Slowed is the primary condition — reliable on any success. SL scales damage and adds a secondary bane at Critical. Does NOT escalate to restrained (reserved for higher-rank spells).

### Gravity Shift

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Close | —

*You alter the pull of gravity on a creature or object, making it briefly lighter or heavier.*

**Effect.** On a success, choose one target within close range. Apply one of the following effects for a short duration:
- **Heavier**: The target's movement is reduced by 2 and they cannot jump.
- **Lighter**: The target can jump twice as far and gains +1 boon on Athletics checks to climb or jump.

> **Design Note**: R0 gravity cantrip. Utility spell with two modes — no SL scaling for the primary effect. Movement modification is predictable and reliable.

### Gravity Reversal

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Long | concentrate

*You invert gravity in a large area, causing everything within to fall upward.*

**Weak.** Gravity reverses in a medium area for a short duration. All creatures and loose objects in the area "fall" upward to the ceiling or 10 meters, taking fall damage. Creatures can attempt to grab onto fixed objects (Strength + Athletics vs. Hard TN). Creatures that fail their save are suspended in the air, prone and unable to move normally.
**Strong.** As Weak. Suspended creatures also suffer +1 bane on all attack rolls. You can selectively exclude up to 2 creatures from the effect.
**Critical.** As Weak. Suspended creatures suffer +2 banes on all attack rolls. You can selectively exclude up to 4 creatures. Ranged attacks made into or out of the reversed gravity zone suffer +1 bane.

> **Design Note**: R5 capstone — area control through gravity manipulation. Area (medium) and duration (short) are fixed on any success — the reversal is reliable. SL scales combat penalties on suspended creatures and ally exclusion. Powerful but not instant-win — creatures can grab objects, and the caster must concentrate.

### Kinetic Barrage

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Dodge | Long | —

*You seize multiple objects in the environment — stones, debris, weapons — and hurl them at your enemies in a devastating volley.*

**Weak.** Deal +4 physical damage to all creatures in a close area. Targets are briefly pushed (forced movement 1 area away from the center).
**Strong.** Deal +8 physical damage. Targets are pushed and briefly prone.
**Critical.** Deal +12 physical damage. Targets are pushed, prone, and the area becomes difficult terrain (scattered debris) for a short duration.

> **Design Note**: Fills R3 move/repel gap. AoE at R3 uses half single-target scaling (+4/+8/+12). Environmental manipulation — uses terrain objects rather than pure force.

### Crushing Sphere

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Dodge | Medium | concentrate

*You encase a creature in a sphere of concentrated telekinetic force that slowly crushes inward.*

**Weak.** Target is restrained for a short duration. At the start of each of their turns, they take +3 physical damage from the crushing force. The target can roll Strength + Athletics vs. TN 10 to escape.
**Strong.** As above, but crushing damage is +6 per turn.
**Critical.** As above, but crushing damage is +9 per turn.

> **Design Note**: Fills R2 crush gap. The primary condition (restrained for short duration) is fixed on any success — SL scales crushing damage. Escape is always possible, and concentration is required. Pairs well with Telekinetic Crush (R1) as a setup → payoff chain.

### Force Wall

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Hard TN | Close | concentrate

*You thrust your hands outward and an invisible wall of pure telekinetic force materializes, blocking passage and deflecting attacks.*

**Weak.** Create a wall of telekinetic force in a short line at medium range. The wall blocks movement and line of sight. It has 30 HP and 6 AV. Creatures pushed into the wall take +4 physical damage.
**Strong.** As above, but the wall has 40 HP and creatures pushed into it take +8 physical damage.
**Critical.** As above, but the wall has 50 HP and creatures pushed into it take +12 physical damage.

> **Design Note**: R3 defensive telekinetic barrier. Wall durability and push damage scale by SL. Duration is fixed at short — no SL escalation.

### Telekinetic Storm

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Dodge | Medium | —

*You seize every loose object in the area — stones, debris, weapons, furniture — and hurl them in a devastating whirlwind of telekinetic fury.*

**Weak.** All creatures in a short area take +5 physical damage as objects batter them from every direction. Targets are briefly prone from the barrage.
**Strong.** Targets take +10 physical damage, are prone, and the area becomes difficult terrain (scattered debris) for a short duration.
**Critical.** Targets take +15 physical damage, are prone, the area becomes difficult terrain for a short duration, and each target is pushed one area away from the center of the storm.

> **Design Note**: R4 AoE damage with battlefield control. Damage uses half single-target R4 scaling (+5/+10/+15). The prone + difficult terrain + push effects create a devastating area denial tool. Requires loose objects in the environment — doesn't work in an empty room.

### Absolute Telekinesis

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge (creatures) or Hard TN (objects) | Long | concentrate

*You extend your will across the battlefield with absolute authority over matter and motion — lifting gates, hurling boulders, pinning warriors in place, reshaping the physical world through sheer mental force.*

**Weak.** You can telekinetically manipulate up to 3 objects or creatures within long range for a short duration. Objects: lift and move massive objects (boulders, gates, wagons) at will. Creatures (vs. Dodge): the target is briefly restrained as you hold them in place. Restrained creatures can attempt to break free (Strength + Athletics vs. your casting result) at the end of each of their turns. You can hurl objects at targets, dealing +6 physical damage on impact.
**Strong.** As Weak. Restrained creatures take +4 physical damage per turn from crushing force. Hurled object damage increases to +10.
**Critical.** As Strong. Restrained creatures take +6 physical damage per turn and suffer +1 bane on break-free attempts. Hurled object damage increases to +14. You can hurl massive objects (ships' masts, building columns).

> **Design Note**: R5 utility/offense capstone — the pinnacle of telekinetic power. Target count (up to 3) and duration (short) are fixed on any success — mastery is reliable. SL scales damage dealt through crushing and hurled objects. Concentration prevents passive abuse.

### Kinetic Lift

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Willing creature | Close | concentrate

*You extend your will beneath a creature, buoying them on an invisible cushion of telekinetic force. They drift upward, floating just above the ground.*

**Weak.** One willing creature within close range levitates up to 2 meters off the ground for a short duration while you concentrate. They hover in place and can move horizontally at half speed. They ignore ground-based hazards and difficult terrain.
**Strong.** As Weak. The creature can rise up to close range height and gains +1 boon on Dodge rolls against melee attacks from grounded creatures.
**Critical.** As Strong. The creature moves at full speed while levitating and can ascend up to short range height.

> **Design Note**: R1 levitate utility. Primary effect (levitation, short duration) is fixed on any success. SL improves height, mobility, and defensive benefit. Concentrate limits abuse. Builds from Minor Levitation (R0) toward Levitation (R2).

### Kinetic Wave

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Dodge | Self (close area) | —

*You thrust both arms outward and a concussive wave of telekinetic force erupts from your body, slamming into everything nearby.*

**Weak.** Deal +3 blast damage to all creatures in a close area centered on you. Each target is pushed one area away from you.
**Strong.** Deal +6 blast damage. Targets are pushed and knocked prone.
**Critical.** Deal +9 blast damage. Targets are pushed two areas away, knocked prone, and briefly dazed.

> **Design Note**: R2 repel AoE. Half single-target scaling (+3/+6/+9). Blast damage (½ AV ignored) fits kinetic shockwave. Push is reliable on any success; SL adds prone and daze. Self-centered AoE fits the "repel" identity — push everything away from caster.

### Aerial Grasp

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Dodge | Medium | concentrate

*You seize an enemy with telekinetic force and wrench them skyward, suspending them helplessly in mid-air where they dangle like a puppet on invisible strings.*

**Weak.** One creature within medium range is lifted into the air at short range height and restrained for a short duration while you concentrate. The target hovers helplessly — melee attacks from grounded creatures cannot reach them, but ranged attacks target them normally. The target can attempt to break free (Strength + Athletics vs. TN 12) at the end of each of their turns. If concentration is broken, the target falls and takes appropriate fall damage.
**Strong.** As Weak. You can slam the suspended target into the ground or a surface as an Action, dealing +8 physical damage and ending the suspension.
**Critical.** As Strong. Slam damage increases to +12. The target is briefly prone and dazed after landing.

> **Design Note**: R3 levitate control. Primary effect (restrain + suspend at height) is fixed on any success. SL adds a slam attack as payoff — the "lift then drop" combo is quintessential telekinetics. Fall damage on concentration break provides natural counterplay.

### Kinetic Implosion

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Dodge | Long | —

*You clench your fist and the air itself contracts — an invisible crushing force collapses inward on a point, dragging everything toward the center and grinding it together.*

**Weak.** All creatures in a close area within long range are dragged toward the center point (forced movement) and take +4 physical damage.
**Strong.** Deal +8 physical damage. Targets dragged to center are briefly restrained as they are crushed together.
**Critical.** Deal +12 physical damage. Targets are restrained and the area becomes difficult terrain (buckled ground, compressed debris) for a short duration.

> **Design Note**: R3 crush AoE. Half single-target scaling (+4/+8/+12). Forced movement inward is the primary effect — reliable on any success. SL adds restraint and terrain effects. Pairs with Force Wall — implode enemies into the wall for bonus damage.

### Gravity Well

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Dodge | Long | concentrate

*You warp gravity around a point, creating a relentless downward pull that drags everything inward like a whirlpool in the earth itself.*

**Weak.** Create a gravity well in a short area within long range for a short duration while you concentrate. The area becomes difficult terrain. Any creature that starts its turn in the area or enters it must roll Strength + Athletics vs. TN 12 or be dragged one area toward the center. Creatures at the center are knocked prone.
**Strong.** As Weak. Creatures pulled to the center also take +4 physical damage from gravitational compression.
**Critical.** As Strong. Damage at center increases to +8. Creatures in the area suffer +1 bane on attempts to move away from the center.

> **Design Note**: R3 gravity control. The gravity well (difficult terrain + pull toward center) is fixed on any success — reliable battlefield control. SL adds damage and escape penalties. Concentrate limits stacking. Area (short) matches R3 guidelines.

### Kinetic Catapult

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Dodge | Medium | —

*You seize a creature or massive object with overwhelming telekinetic force and hurl it across the battlefield at devastating speed, turning matter into a weapon.*

**Weak.** Choose one creature (vs. Dodge) or unattended object (up to large size) within medium range. The target is hurled up to long range in a direction you choose, taking +10 physical damage on impact. If the target strikes another creature or solid surface, both take +5 physical damage. Hurled creatures land prone.
**Strong.** Impact damage increases to +20. Collision damage increases to +10. If the hurled target strikes a creature, that creature must also roll Strength + Athletics vs. TN 14 or be knocked prone.
**Critical.** Impact damage increases to +30. Collision damage increases to +15. The landing zone becomes difficult terrain (crater and debris) for a short duration.

> **Design Note**: R4 move offense. Full single-target scaling (+10/+20/+30) on the primary target. Collision is a secondary effect at reduced damage. The "catapult" fantasy — hurling boulders and enemies — is quintessential telekinetics. Works with objects (utility) or creatures (offense).

### Telekinetic Flight

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Willing creature | Touch | concentrate, enchant (medium)

*You wrap yourself or an ally in a cocoon of sustained telekinetic force, granting true flight — soaring through the air by will alone.*

**Weak.** One willing creature you touch gains a flying movement equal to their normal movement speed for a medium duration while you concentrate. The creature can hover in place and is not required to keep moving. If concentration is broken, the creature descends gently (as if affected by Kinetic Lift) rather than falling.
**Strong.** As Weak. The creature's flying speed increases by 2 and they gain +1 boon on Dodge rolls while airborne.
**Critical.** As Strong. The creature can carry one additional creature of equal or smaller size while flying, though flying speed is reduced by 2 while carrying.

> **Design Note**: R4 levitate utility capstone. True flight is the natural R4 payoff — built from Minor Levitation (R0) → Kinetic Lift (R1) → Levitation (R2). Primary effect (flight, medium duration) is fixed on any success. SL enhances speed and flexibility. Gentle descent on lost concentration prevents death spirals.

### Force Cage

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Dodge | Medium | concentrate

*You snap your fingers and bars of pure telekinetic force materialize around a creature, forming an inescapable cage that slowly constricts inward.*

**Weak.** One creature within medium range is trapped inside a cage of telekinetic force for a short duration while you concentrate. The target is restrained and cannot leave the cage by physical means. The cage has 50 HP and 8 AV. At the start of each of the target's turns, the cage constricts, dealing +5 physical damage. External allies can attack the cage to free the target.
**Strong.** As Weak. Constriction damage increases to +10 per turn. The cage also blocks line of effect for spells cast from inside — the trapped creature cannot target creatures outside the cage with spells.
**Critical.** As Strong. Constriction damage increases to +15 per turn. Teleportation and magical movement out of the cage requires a Hard TN (14) casting check.

> **Design Note**: R4 crush control. The cage (restrain + physical barrier) is fixed on any success — reliable imprisonment. SL scales crush damage and cage properties. Destructible cage (50 HP, 8 AV) provides counterplay for allies. Classic "Forcecage" fantasy realized through telekinetic force.

### Repulsion Field

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Dodge | Self | concentrate

*You project an invisible dome of outward-pressing telekinetic force that repels everything that approaches, holding enemies at bay with sheer kinetic pressure.*

**Weak.** Create a repulsive force field in a close area centered on you for a short duration while you concentrate. Hostile creatures cannot willingly enter the field. Creatures already inside the field when cast are immediately pushed to the edge. Ranged attacks passing through the field suffer +1 bane.
**Strong.** As Weak. The field expands to a short area. Creatures pushed out of the field take +5 blast damage.
**Critical.** As Strong. Pushed creatures take +10 blast damage and are knocked prone. The ranged attack penalty increases to +2 banes.

> **Design Note**: R4 repel defense. The repulsion field (push + entry denial) is fixed on any success — reliable zone control. SL expands area and adds damage/prone. Concentrate limits duration abuse. Fills Telekinetics' defensive gap at higher ranks — force barriers are the discipline's answer to protection magic.

### Annihilating Wave

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Self (long line) | material cost (enchanted lodestone, 5,000 coins)

*You channel an overwhelming surge of telekinetic force through an enchanted lodestone, unleashing a cataclysmic wave of pure kinetic devastation that flattens everything in its path — shattering walls, uprooting trees, and hurling creatures like ragdolls.*

**Weak.** Deal +6 blast damage to all creatures in a long line originating from you. Every target is pushed two areas away from you and knocked prone. Structures, walls, and objects in the path take double damage. The line becomes difficult terrain (rubble and debris) for a medium duration.
**Strong.** Deal +12 blast damage. Pushed creatures that strike a solid surface take an additional +6 physical damage on impact.
**Critical.** Deal +18 blast damage. Impact damage increases to +12. Creatures struck are also briefly stunned by the concussive force.

> **Design Note**: R5 repel capstone. AoE scaling (+6/+12/+18) over a long line — area matches R5 guidelines. Material cost (5,000 coins) matches R5 item economy. Blast damage (½ AV ignored) suits kinetic devastation. Push + prone reliable on any success; SL adds impact damage and stun. Complements Gravity Reversal (R5 gravity) — one flattens horizontally, the other vertically.

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
