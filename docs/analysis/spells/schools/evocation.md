# Evocation — Spell School Design Space

## School Identity

**Discipline**: Evocation (Arcane)
**Traits**: fire, frost, lightning, acid, air
**Identity**: Transgressive elemental manipulation — raw, destructive power over the elements
**Role Spread**: Excels: Offense | Decent: Control, Defense | Weak: Healing, Support, Utility

### Mechanical Identity
- **Primary Conditions**: Burning (fire), slowed (frost), staggered (lightning), corroding (acid), prone/pushed (air)
- **Signature Gimmick**: Element choice — many spells let the caster pick between fire/frost/lightning/acid, each with distinct secondary effects. Air spells provide concussive force and repositioning.
- **Damage Types**: Fire, Frost, Lightning, Acid, Blast
- **Corroding (Acid) Identity**: Acid spells attack equipment through the **Durability system** — forcing Durability checks on armor and weapons — and apply temporary AV reduction for at least a **short duration**. This creates a slow war of attrition against armored foes. R0 acid should NOT directly reduce AV; instead it forces Durability checks. Higher-rank acid spells combine Durability pressure with temporary AV reduction (minimum short duration).

> **Note on "air" vs Tempest "thunderstorms"**: Evocation's air trait represents raw elemental air pressure — concussive blasts, vacuum pockets, and compressed wind. This differs from Tempest's natural storm weather (hurricanes, thunder). Evocation air is transgressive manipulation of air as a raw element; Tempest channels reverent natural forces.

### Design Principles
1. Evocation is the premier damage school — highest raw damage output across all arcane disciplines
2. Elemental variety provides tactical depth: fire for sustained damage (burning), frost for control (slowed), lightning for disruption (staggered), acid for equipment degradation (corroding/Durability), air for repositioning (push/prone)
3. Defensive options exist but are limited to elemental wards and barriers
4. **Major gap**: Zero utility/non-combat spells — needs environmental manipulation
5. **Cross-school sharing**: Acid Splash and Chain Lightning exist in mystic schools (Nature and Tempest respectively) and should be shared — same spell available to both lists

### Internal Synergies
- **Setup**: Apply elemental condition (burning/slowed/staggered) → **Payoff**: Follow-up spells deal bonus damage or have enhanced effects against conditioned targets
- **Element stacking**: Apply multiple elemental conditions to the same target for compounding penalties (Elemental Cataclysm at R4 is the ultimate payoff for this)
- **AV strip → Focus fire**: Acid spells degrade equipment via Durability checks and apply temporary AV reduction (short duration) → subsequent fire/lightning spells deal more effective damage
- **Terrain control**: Frost spells create ice terrain → enemies slowed in terrain take extra damage from lightning (conductivity)
- **Air repositioning → AoE setup**: Air spells push enemies into clusters → follow-up AoE fire/lightning spells hit more targets
- **Cantrip → R1 escalation**: Flickering Flame/Static Spark apply conditions → Chromatic Orb or elemental weapon follow-ups exploit them

## Current Spell Inventory (18 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Flickering Flame, Frost Snap, Static Spark |
| 1 | 9 | Chromatic Orb, Elemental Ward, Flame Burst, Flaming Weapon, Frozen Weapon, Ice Shards, Lightning Arc, Lightning Weapon, Scorching Ray |
| 2 | 5 | Fireball, Frost Wave, Ice Lance, Lightning Strike, Prismatic Missile |
| 3 | 1 | Black Flame Bolt |
| 4–5 | 0 | — |

### Trait × Rank Coverage Matrix

> Existing spells in normal text. *Proposed new spells in italics.*

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| fire | Flickering Flame | Flame Burst, Flaming Weapon, Scorching Ray | Fireball | Black Flame Bolt | *Wall of Fire* | *Delayed Blast Meteor* |
| frost | Frost Snap | Frozen Weapon, Ice Shards | Frost Wave, Ice Lance | *Glacial Spike* | *Cone of Cold* | *Glacial Cataclysm* |
| lightning | Static Spark | Lightning Arc, Lightning Weapon | Lightning Strike, Prismatic Missile | *Chain Lightning* | *Voltaic Surge* | *Lightning Maelstrom* |
| acid | *Acid Splash* | Chromatic Orb (multi) | *Acid Rain* | *Corrosive Torrent* | *Vitriol* | *Dissolving Wave* |
| air | *Air Burst* | *Concussive Bolt* | *Gale Force* | *Shockwave* | *Vacuum Sphere* | *Annihilating Vortex* |

**Additional multi-element / utility spells**: *Thermal Control* (R0), Elemental Ward (R1), *Elemental Shaping* (R1), Chromatic Orb (R1), *Fire Shield* (R2, fire/frost), Prismatic Missile (R2), *Elemental Cataclysm* (R4), *Elemental Tempest* (R5)

**Coverage**: 30/30 trait×rank slots filled (100%) — all gaps addressed

**All five traits now have dedicated spells at every rank R0–R5**, plus multi-element options providing additional flexibility at R1, R2, R4, and R5.

## Proposed Spell Changes

### Lightning Strike — Area Reduction

**Current**: Line in medium range at Rank 2
**Proposed**: Reduce to **short line** to match R2 area progression (close area / short line)
**Rationale**: R2 spells should affect a close area or short line per the area progression framework.

### Fireball — Damage Reduction

**Current**: +4/+8/+12 AoE at Rank 2
**Proposed**: Reduce to **+3/+6/+9** to match half single-target scaling for multi-target R2
**Rationale**: Under the revised half-damage AoE scaling, R2 multi-target should be +3/+6/+9.

### Frost Wave — Damage Reduction

**Current**: +4/+8/+12 AoE cone at Rank 2
**Proposed**: Reduce to **+3/+6/+9** to match half single-target scaling
**Rationale**: Same as Fireball — consistent multi-target scaling.

### Elemental Ward — Standardized Reactive Defense

**Current**: Quick Action self-buff that grants brief elemental resistance (acid, fire, frost, lightning, poison). Heightened versions add damage reflection (half at R2, full at R3).
**Proposed**: Realign to the standardized R1 reactive defense pattern:
- **Quick Action** (reactive): When an enemy targets you with an attack, gain **+2 to Dodge or Parry** (your choice) against the triggering attack. If the attacker is within melee range, they take 2 damage of an element you choose (fire, frost, lightning, acid, or blast). Effect is identical on any success — no SL scaling.
- Remove heightened versions (damage reflection moves to Fire Shield at R2 which already fills that niche).
**Rationale**: All schools follow the same standardized R1 reactive defense pattern: base +2 Dodge/Parry, one school-specific secondary, no SL scaling. Evocation's secondary is elemental backlash damage — thematically fitting as transgressive energy lashes out reflexively at attackers. The current "elemental resistance" version is more of a buff than a reactive defense and doesn't match the standard.

## Proposed New Spells

### Acid Splash

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Medium | —

*You fling a glob of corrosive acid at your target, sizzling on contact and eating into their equipment.*

**Weak.** Deal +2 acid damage. The acid clings to the target's armor or weapon — they must make a **Durability check** for one piece of equipment (your choice) at the end of their next turn.
**Strong.** Deal +4 acid damage. The target must make a Durability check for one piece of equipment immediately.
**Critical.** Deal +6 acid damage. The target must make a Durability check for up to two pieces of equipment immediately.

> **Design Note**: Fills the R0 acid gap. Acid's identity is equipment degradation via the existing Durability system — no direct AV reduction at cantrip level. Forces meaningful choices about protecting gear. Shared with Nature tradition (same spell in both lists).

### Air Burst

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Melee | —

*You release a concussive burst of compressed air in your immediate vicinity.*

**Weak.** All creatures in melee range are briefly pushed back (forced movement to close range edge).
**Strong.** Deal +2 blast damage to all creatures in melee range and push them into close range.
**Critical.** Deal +4 blast damage to all creatures in melee range and push them into close range. Targets are briefly prone.

> **Design Note**: Fills the R0 air gap. Melee-only AoE at cantrip level is within R0 guidelines for rare exceptions. Uses blast damage type (½ AV) — concussive air pressure. Replaces the old "Concussive Pop" name.

### Thermal Control

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Medium TN | Close | —

*You regulate the temperature in a small area — warming, cooling, or maintaining a comfortable environment.*

**Weak.** Regulate temperature in close range for a short duration. You can light or extinguish small fires, warm or cool food and drink, or prevent frost damage to objects.
**Strong.** As above. You can also keep a small shelter comfortably warm or cool despite external conditions.
**Critical.** As above. Creatures in the area also gain resistance to environmental heat or cold effects for the duration.

> **Design Note**: R0 utility cantrip. Core effect (temperature regulation, short duration) is reliable on any success — SL adds comfort and environmental resistance. Pure environmental manipulation with no combat application.

### Elemental Shaping

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Medium TN | Close | concentrate

*You manipulate raw elemental matter — reshaping fire, water, earth, or air to your will.*

**Weak.** Shape one element within close range for a short duration while you concentrate. Create a wall of flame (melee area, 5 HP), freeze water into a bridge, part smoke, or sculpt earth.
**Strong.** The elemental construct is more durable (10 HP) and the shaped area is larger (close range).
**Critical.** The elemental construct has 15 HP, and you can shape two elements simultaneously (e.g., a flame wall atop an earth barricade).

> **Design Note**: R1 utility spell. Core effect (shape one element, short duration, close range) is reliable on any success — SL adds construct durability and versatility. Environmental manipulation for exploration and creative problem-solving.

### Fire Shield

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Self | Self | concentrate, enchant (short)

*You wreathe yourself in protective flames or frost, lashing back at any who dare strike you.*

**Weak.** Choose fire or frost. You gain resistance 2 to the opposing element (frost if fire chosen, fire if frost chosen). When a creature in melee range hits you with an attack, they take +2 fire or frost damage.
**Strong.** Resistance increases to 4. Retaliatory damage increases to +4.
**Critical.** Resistance increases to 6. Retaliatory damage increases to +6. The shield also sheds bright light in close range.

> **Design Note**: R2 defensive option that reinforces the elemental identity while providing meaningful protection.

### Glacial Spike

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Dodge | Long | —

*You conjure a massive shard of crystallized frost and hurl it at your target, where it detonates in a burst of freezing cold.*

**Weak.** Deal +8 frost damage to the primary target. They are briefly slowed.
**Strong.** Deal +16 frost damage. The target is slowed for a short duration and the area around them (melee range) becomes difficult terrain (ice) briefly.
**Critical.** Deal +24 frost damage. The target is slowed for a short duration and briefly restrained as ice encases their legs. Ice terrain persists for a short duration.

> **Design Note**: Fills R3 frost gap. Single-target with area denial secondary effect — trades multi-target for control.

### Chain Lightning

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Dodge | Long | —

*You unleash a bolt of lightning that arcs from target to target, leaping between foes with devastating effect.*

**Weak.** Deal +8 lightning damage to the primary target. The lightning arcs to up to two additional targets in close range of the first, dealing +4 lightning damage each.
**Strong.** Deal +16 lightning damage to the primary target. Secondary targets take +8 lightning damage each. All targets are briefly staggered.
**Critical.** Deal +24 lightning damage to the primary target. Secondary targets take +12 lightning damage each. All targets are staggered for a short duration.

> **Design Note**: R3 chain spell. Core effect (primary target + two chain targets) is reliable on any success — SL adds damage. Primary target takes single-target damage, secondary targets take half (multi-target scaling). Fills R3 lightning gap.

### Corrosive Torrent

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Dodge | Medium | —

*You unleash a stream of concentrated acid that eats through armor, flesh, and stone alike.*

**Weak.** Deal +8 acid damage to a single target. The target's armor and shield each require a **Durability check**. The target's AV is reduced by 2 for a **short duration**.
**Strong.** Deal +16 acid damage. Durability checks for all equipped armor/shield/helmet. AV reduced by 3 for a **short duration**. If any Durability check fails, the AV reduction lasts for a **medium duration** instead.
**Critical.** Deal +24 acid damage. Durability checks for all equipment with +1 bane. AV reduced by 4 for a **short duration** (medium if any Durability fails). If the target's AV reaches 0, excess reduction applies as bonus acid damage.

> **Design Note**: Fills R3 acid gap. Acid's identity combines Durability pressure with temporary AV reduction (minimum short duration). Rewards focus fire after debuffing. The Durability interaction creates lasting consequences beyond the immediate fight — damaged armor needs repair.

### Elemental Cataclysm

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Dodge | Long | —

*You channel all four elemental forces simultaneously into a devastating strike — fire, frost, lightning, and acid converge on a single point.*

**Weak.** Deal +10 damage (choose fire, frost, lightning, or acid). Apply the element's signature condition: burning, slowed, staggered, or AV −2 (short duration) respectively.
**Strong.** Deal +20 damage. Apply the condition for a short duration. You may choose a second element — the target also takes +4 damage of that type.
**Critical.** Deal +30 damage. Apply the condition for a short duration. Choose two additional elements — the target takes +8 damage of each and suffers all corresponding conditions briefly.

> **Design Note**: R4 capstone single-target. Rewards element mastery by stacking multiple conditions. Raw power justifies R4 Focus cost. Acid condition uses short-duration AV reduction per the corroding identity.

### Acid Rain

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Dodge | Medium | concentrate

*You conjure a cloud of caustic mist that rains acid over an area, slowly dissolving armor and flesh.*

**Weak.** Create a close area of acid rain for a short duration. All creatures entering or starting their turn in the area take +3 acid damage. Creatures that remain in the area for a full round must make a Durability check for one piece of equipped armor.
**Strong.** Damage increases to +6 per turn. Durability check applies to all equipped armor/shields.
**Critical.** Damage increases to +9 per turn. Durability checks with +1 bane. Creatures in the area also suffer −2 AV for a short duration after leaving.

> **Design Note**: R2 dedicated acid spell — fills the R2 acid gap. Zone control that punishes staying in the area via Durability pressure. Multi-target damage uses half single-target R2 scaling (+3/+6/+9). Concentration limits other spellcasting.

### Gale Force

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Dodge | Short | —

*You compress the air ahead of you and release it in a devastating line of concussive force.*

**Weak.** All creatures in a short line take +3 blast damage and are pushed one range increment away from you.
**Strong.** Deal +6 blast damage. Creatures are pushed and briefly prone.
**Critical.** Deal +9 blast damage. Creatures are pushed, prone, and the line becomes difficult terrain (scattered debris) briefly.

> **Design Note**: R2 air spell. Line AoE with push — fills the R2 air gap. Half single-target R2 scaling (+3/+6/+9). Concussive air pressure fits Evocation's transgressive element manipulation without overlapping Tempest's natural storms.

### Vacuum Sphere

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Dodge | Long | concentrate

*You create a sphere of total vacuum that implodes violently, crushing everything within and sucking the air from lungs.*

**Weak.** Create a close area of vacuum. All creatures in the area take +5 blast damage, are staggered for a short duration (no air to breathe), and are pulled toward the center. Ranged attacks through the area suffer +2 banes (no air for projectiles).
**Strong.** Deal +10 blast damage with the same effects. Creatures that fail their save by 3+ are briefly restrained by the implosion.
**Critical.** Deal +15 blast damage with the same effects. All creatures in the area are briefly restrained. Ranged attacks through the area fail automatically.

> **Design Note**: R4 air spell — control through air manipulation. Core effect (staggered for short duration, pull to center, ranged attack banes) is reliable on any success — SL adds damage and restrained escalation. AoE uses half single-target R4 scaling (+5/+10/+15). The vacuum theme is distinctly transgressive vs. Tempest's natural wind.

### Elemental Tempest

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Long | concentrate

*You conjure a vortex of all five elements — fire, frost, lightning, acid, and compressed air — swirling in a devastating maelstrom of pure elemental destruction.*

**Weak.** Create a medium area storm for a short duration while you concentrate. Each turn at the start of your turn, all creatures in the area take +6 damage of a random element (roll d6: 1=fire, 2=frost, 3=lightning, 4=acid, 5=blast, 6=your choice) and suffer the corresponding condition briefly.
**Strong.** Damage increases to +8 per turn.
**Critical.** Damage increases to +10 per turn. You choose the element each turn instead of rolling, and two different elements strike simultaneously (both damage and conditions apply).

> **Design Note**: R5 AoE capstone alongside Delayed Blast Meteor. Core effect (medium area elemental storm, short duration, random element) is reliable on any success — SL adds per-turn damage. Only Critical grants element choice and double-element strikes. AoE damage per turn (+6/+8/+10) is appropriate for a concentration-sustained effect.

### Dissolving Wave

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Medium | —

*You release a tidal wave of concentrated acid that sweeps across the battlefield, dissolving everything it touches.*

**Weak.** All creatures in a short area take +6 acid damage. All affected creatures must make Durability checks for all equipped armor/shields. Affected creatures suffer −2 AV for a short duration.
**Strong.** Deal +12 acid damage. Durability checks with +1 bane. AV reduced by −3 for a short duration. The area becomes difficult terrain (dissolved ground) for a short duration.
**Critical.** Deal +18 acid damage. Durability checks with +2 banes. AV reduced by −4 for a short duration. Difficult terrain lasts for a medium duration. Structures and fortifications in the area take double damage.

> **Design Note**: R5 acid AoE capstone. Half single-target scaling (+6/+12/+18). Combines Durability devastation with mass AV reduction (short duration minimum). The premier "armor destruction" spell — rewards Evocation casters who invested in the acid identity.

### Delayed Blast Meteor

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Long | concentrate

*You conjure a swirling mass of superheated elemental energy suspended in the air, which detonates after a delay — or at your command.*

**Weak.** The meteor detonates in a short area. All creatures in the area take +6 fire damage and are briefly burning.
**Strong.** All creatures take +12 fire damage. Burning lasts for a short duration.
**Critical.** All creatures take +18 fire damage. Burning lasts for a short duration and deals +4 fire damage per turn.

**Heighten.** You can delay detonation for up to 1 minute while concentrating. Each turn of delay increases the damage by +2/+4/+6 (weak/strong/critical), up to a maximum of +12/+24/+36 after 3 turns of delay.

> **Design Note**: R5 capstone. Delayed detonation creates tactical depth — do you detonate immediately or risk losing concentration for higher damage? AoE at R5 uses half single-target scaling (+6/+12/+18 base).

### Concussive Bolt

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | vs. Dodge | Medium | —

*You compress the air between your hands into a dense sphere of invisible force and hurl it at your target — the impact strikes like an unseen battering ram, slamming through armor with concussive fury.*

**Weak.** Deal +4 blast damage. The target is pushed one range increment away from you.
**Strong.** Deal +8 blast damage. The target is pushed one range increment and knocked prone.
**Critical.** Deal +12 blast damage. The target is pushed two range increments and knocked prone.

> **Design Note**: Fills the R1 air gap. Single-target blast damage (½ AV) with air's signature push/prone repositioning. Gives Evocation a ranged knockback tool from R1, complementing Air Burst's melee-range utility. Distinct from lightning (staggered) or frost (slowed) — air is about repositioning.

### Shockwave

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Dodge | Self | —

*You gather compressed air around your body until the pressure becomes unbearable, then release it in a devastating omnidirectional pulse — the concussive shockwave ripples outward, flattening everything in its wake.*

**Weak.** All creatures in a short area centered on you take +4 blast damage and are pushed one range increment away from you.
**Strong.** Deal +8 blast damage. Pushed creatures are also knocked prone.
**Critical.** Deal +12 blast damage. Creatures are pushed two range increments, knocked prone, and the area becomes difficult terrain briefly (scattered debris and dust).

> **Design Note**: Fills the R3 air gap. Self-centered AoE creates risk/reward — the caster must be in the thick of combat. Uses R3 AoE scaling (+4/+8/+12) for a short area. Push + prone combination rewards aggressive positioning and sets up allied follow-up attacks. A natural complement to the Magus archetype (Fighting + Arcana).

### Wall of Fire

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Dodge | Long | concentrate

*You raise a roaring curtain of flame across the battlefield — a shimmering wall of superheated air and blazing fire that punishes any who approach and agonizes any who dare cross through.*

**Weak.** Create a wall of fire up to medium length for a short duration while concentrating. Choose one side of the wall as the hot side. Creatures that pass through the wall or start their turn in melee range of the hot side take +5 fire damage and are burning for a short duration.
**Strong.** Damage increases to +10. Burning for a short duration.
**Critical.** Damage increases to +15. Burning for a short duration. You can shape the wall as a curve or ring enclosing an area.

> **Design Note**: Fills the R4 fire gap. Classic control spell — Evocation's role spread includes "Decent: Control." Uses AoE scaling (+5/+10/+15) since it's a persistent multi-target effect. The hot-side mechanic creates tactical depth — position the wall to maximize one-sided pressure. Concentration limits simultaneous spellcasting. Burning fixed at short duration on all SLs per the principle that primary conditions don't scale by SL. Pairs with Air push spells to force enemies through the wall.

### Cone of Cold

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Dodge | Self (cone) | —

*You exhale a blast of supernaturally cold air that flash-freezes everything before you — moisture crystallizes in an instant, metal becomes brittle, and living creatures are rimed in frost.*

**Weak.** All creatures in a medium cone take +5 frost damage and are slowed for a short duration.
**Strong.** Deal +10 frost damage. Slowed for a short duration. Creatures already slowed from another source are briefly restrained (ice encasement).
**Critical.** Deal +15 frost damage. Slowed for a short duration. The area becomes ice terrain (difficult terrain) for a medium duration. Water in the area freezes solid.

> **Design Note**: Fills the R4 frost gap. Classic cone AoE at medium area (R4 appropriate). Uses AoE scaling (+5/+10/+15). Frost's slowed identity with ice terrain creation on Critical. The Strong success rewards stacking slowed from prior frost spells — setup (Frost Snap/Ice Shards apply slowed) → payoff (Cone of Cold escalates to restrained).

### Voltaic Surge

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Dodge | Long | —

*You channel an overwhelming lance of raw lightning into your target — not the forking discharge of a natural storm, but a concentrated, transgressive torrent of electrical power that courses through every nerve and sinew.*

**Weak.** Deal +10 lightning damage. The target is staggered for a short duration.
**Strong.** Deal +20 lightning damage. Staggered for a short duration. The electrical overload breaks any concentration effect the target is maintaining.
**Critical.** Deal +30 lightning damage. Staggered for a short duration. Concentration broken. If the target is wearing metal armor, the charge persists — they take +5 lightning damage at the start of their next turn.

> **Design Note**: Fills the R4 lightning gap. Single-target nuke with lightning's staggered identity. The concentration-breaking secondary on Strong distinguishes it from Chain Lightning's multi-target approach — Voltaic Surge is the "anti-caster" option. Metal armor rider on Critical adds tactical depth without dominating design.

### Vitriol

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Dodge | Long | —

*You conjure a jet of impossibly concentrated acid and direct it at your foe — the vitriol eats through armor, flesh, and bone with horrifying speed, leaving only smoking ruin and the acrid stench of dissolution.*

**Weak.** Deal +10 acid damage. The target's AV is reduced by 3 for a short duration. All equipped armor and shields require a **Durability check**.
**Strong.** Deal +20 acid damage. AV reduced by 4 for a short duration. Durability checks for all equipped armor, shields, and helmets with +1 bane.
**Critical.** Deal +30 acid damage. AV reduced by 5 for a short duration. Durability checks with +2 banes for all equipment. If any Durability check fails, the AV reduction extends to medium duration.

> **Design Note**: Fills the R4 acid gap. The premier single-target acid nuke — combines massive damage with acid's corroding identity (Durability pressure + AV reduction at minimum short duration). Rewards focus fire: strip AV with Vitriol, then follow up with fire/lightning for devastating effective damage. Scales the acid progression naturally from Corrosive Torrent (R3).

### Glacial Cataclysm

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Long | —

*You plunge a vast expanse into supernatural cold, flash-freezing the very air itself — creatures become ice statues, water solidifies in an instant, and even stone cracks from the thermal shock. This is frost wielded not as nature intended, but as a weapon of transgressive annihilation.*

**Weak.** All creatures in a long area take +6 frost damage and are slowed for a short duration. The entire area becomes ice terrain (difficult terrain) for a medium duration. Water in the area freezes solid.
**Strong.** Deal +12 frost damage. Slowed for a short duration. Creatures that are already slowed when hit are briefly restrained (frozen in place).
**Critical.** Deal +18 frost damage. Slowed for a short duration. All creatures are briefly restrained. Ice terrain provides half cover from outside the area. Fire damage within the area is halved for the duration.

> **Design Note**: R5 frost capstone. Long area AoE with R5 AoE scaling (+6/+12/+18). Ice terrain fixed at medium duration on all SLs per the principle that utility/control effects don't scale by SL — only damage and the restrained secondary escalation scale. Creates massive ice terrain that reshapes the battlefield. The fire-dampening effect on Critical adds anti-synergy pressure, and the slowed→restrained escalation rewards stacking frost conditions across multiple spells.

### Lightning Maelstrom

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Extreme | —

*You raise your hands and tear open the sky, calling down a barrage of lightning bolts — dozens of searing electrical strikes hammer the battlefield in rapid succession, each powerful enough to shatter stone, the combined onslaught overwhelming all within.*

**Weak.** All creatures in a long area take +6 lightning damage and are staggered for a short duration.
**Strong.** Deal +12 lightning damage. Staggered for a short duration. All ongoing concentration effects maintained by creatures within the area are automatically broken.
**Critical.** Deal +18 lightning damage. Staggered for a short duration. Concentration broken. The area becomes electrified terrain for a short duration — creatures that enter or start their turn in the area take +3 lightning damage.

> **Design Note**: R5 lightning capstone. Long area AoE with R5 scaling (+6/+12/+18) at Extreme range. The mass concentration-breaking on Strong builds on Voltaic Surge's R4 single-target version — Lightning Maelstrom is the "anti-caster battlefield" spell. Electrified terrain on Critical creates lasting area denial, complementing frost's ice terrain for different tactical contexts.

### Annihilating Vortex

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Long | —

*You rip the atmosphere asunder, collapsing air pressure across a vast area before releasing it in a catastrophic pressure wave — a transgressive display of absolute dominion over the invisible element, the shockwave flattening structures and hurling creatures like ragdolls.*

**Weak.** All creatures in a long area take +6 blast damage, are pushed two range increments away from the center, and are knocked prone. Unsecured objects are scattered. The area becomes difficult terrain for a short duration (devastated landscape).
**Strong.** Deal +12 blast damage. Creatures pushed into solid objects (walls, terrain) take an additional +6 physical damage from the collision.
**Critical.** Deal +18 blast damage. Collision damage increases to +12. Structures and fortifications in the area take double damage.

> **Design Note**: R5 air capstone. Long area AoE with R5 scaling (+6/+12/+18). Difficult terrain fixed at short duration on all SLs per the principle that utility/control effects don't scale by SL — only damage and collision damage scale. Blast damage (½ AV) combined with physical collision damage on Strong/Critical creates devastating effective damage against armored targets. The collision mechanic rewards tactical positioning — pushing enemies into walls or each other. Distinct from Vacuum Sphere's (R4) inward-pulling implosion; this is the outward-exploding counterpart.

## Cross-School Spell Sharing

The following spells are shared between Evocation and mystic traditions (same spell in both lists):

| Spell | Evocation Rank | Shared With | Notes |
|-------|---------------|-------------|-------|
| **Acid Splash** | R0 | Nature (Mystic) | Identical spell — acid damage + Durability check |
| **Chain Lightning** | R3 | Tempest (Mystic) | Identical spell — primary + chain targets |

> **Design Note**: Cross-school sharing is limited to spells that thematically fit both schools. Acid Splash represents both transgressive elemental acid (Evocation) and natural toxin (Nature). Chain Lightning represents both raw elemental control (Evocation) and natural storm power (Tempest). When a spell is shared, it must be identical in both lists.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Fire chain**: Flickering Flame (R0 condition) → Flame Burst/Scorching Ray (R1 damage) → Fireball (R2 AoE) → Black Flame Bolt (R3 single) → Wall of Fire (R4 control) → Delayed Blast Meteor (R5 AoE)
2. **Frost chain**: Frost Snap (R0 condition) → Ice Shards/Frozen Weapon (R1) → Frost Wave/Ice Lance (R2) → Glacial Spike (R3 single) → Cone of Cold (R4 cone AoE) → Glacial Cataclysm (R5 AoE)
3. **Lightning chain**: Static Spark (R0 condition) → Lightning Arc (R1) → Lightning Strike (R2 line) → Chain Lightning (R3 chain) → Voltaic Surge (R4 single) → Lightning Maelstrom (R5 AoE)
4. **Acid chain**: Acid Splash (R0 Durability) → Chromatic Orb (R1 multi) → Acid Rain (R2 zone) → Corrosive Torrent (R3 single) → Vitriol (R4 single) → Dissolving Wave (R5 AoE)
5. **Air chain**: Air Burst (R0 push) → Concussive Bolt (R1 single) → Gale Force (R2 line) → Shockwave (R3 self-AoE) → Vacuum Sphere (R4 implosion) → Annihilating Vortex (R5 AoE)
6. **AV-strip combo**: Acid Splash/Acid Rain (Durability pressure) → Corrosive Torrent (R3 AV reduction) → Vitriol (R4 heavy AV strip) → fire/lightning follow-ups deal devastating effective damage
7. **Multi-element**: Chromatic Orb (R1) → Prismatic Missile (R2) → Elemental Cataclysm (R4) → Elemental Tempest (R5)
8. **Frost stacking**: Frost Snap/Ice Shards (apply slowed) → Cone of Cold (slowed→restrained on Strong) / Glacial Cataclysm (slowed→restrained on Strong)
9. **Anti-caster**: Voltaic Surge (R4 single-target concentration break) → Lightning Maelstrom (R5 mass concentration break)

### Setup + Payoff Combos
- ✅ **Element condition → bonus damage**: Well-supported across ranks
- ✅ **AV strip → focus fire**: Acid Splash (Durability) → Acid Rain (zone Durability) → Corrosive Torrent/Vitriol (AV reduction, short duration) → all subsequent damage more effective
- ✅ **Air push → AoE cluster**: Air Burst/Concussive Bolt/Gale Force/Shockwave push enemies together → Fireball/Frost Wave/Cone of Cold hit more targets
- ✅ **Air push → Wall of Fire**: Push enemies through Wall of Fire with Concussive Bolt/Shockwave/Annihilating Vortex for forced damage
- ✅ **Frost stacking → restrained**: Frost Snap/Ice Shards apply slowed → Cone of Cold/Glacial Cataclysm escalates slowed to restrained on Strong success
- ✅ **Concentration breaking**: Voltaic Surge (R4 single) → Lightning Maelstrom (R5 mass) — dedicated anti-caster progression
- ⚠️ **Frost terrain → lightning conductor**: Conceptually strong but needs explicit mechanical support in spell text
- ❌ **Fire → Frost synergy**: No explicit mechanical link between burning and slowed conditions

### Design Completeness Checklist
- [x] R1 Quick Action: Elemental Ward (R1) — proposed standardization to +2 Dodge/Parry, elemental backlash secondary, no SL scaling
- [x] Defensive options: Elemental Ward (R1), Fire Shield (R2), Wall of Fire (R4)
- [x] Utility: Thermal Control (R0), Elemental Shaping (R1)
- [x] Damage across all ranks: R0-R5 fully covered with 3+ spells per rank
- [x] Repeating conditions: Burning, slowed, staggered, corroding (Durability + AV reduction), pushed/prone (air)
- [x] Setup+payoff: Condition stacking (frost→restrained), Durability→AV strip→focus fire, air push→AoE/wall, anti-caster (concentration breaking)
- [x] Cross-school sharing: Acid Splash (Nature), Chain Lightning (Tempest)
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 6, R1: 11, R2: 8, R3: 5, R4: 6, R5: 6)
- [x] **Every trait at every rank R0-R5**: 30/30 trait×rank slots filled (100%)
- [x] **Dedicated element capstones at R5**: Fire (Delayed Blast Meteor), Frost (Glacial Cataclysm), Lightning (Lightning Maelstrom), Acid (Dissolving Wave), Air (Annihilating Vortex) — plus multi-element Elemental Tempest
