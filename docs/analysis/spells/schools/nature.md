# Nature — Spell School Design Space

## School Identity

**Tradition**: Nature (Mystic)
**Traits**: earth, water, poison, animals, plants
**Identity**: Harmonious adaptation with natural world — working with nature rather than against it
**Role Spread**: Excels: Utility | Decent: Healing, Support | Weak: Offense, Defense, Control

### Mechanical Identity
- **Primary Conditions**: Poisoned (toxins), restrained/entangled (plants), difficult terrain (mud/vines)
- **Signature Gimmick**: Beast/plant synergy and natural hazards — animal companions, plant barriers, environmental manipulation
- **Damage Types**: Physical, Poison, Acid

### Design Principles
1. Nature is the most versatile mystic tradition (35 spells) — covers animals, plants, earth, water, poison
2. Healing comes through natural remedies (Rejuvenation) rather than divine power
3. Beast Form and Wild Companion provide unique combat options
4. Environmental manipulation (terrain, weather, plants) is the primary utility tool
5. **Gap**: No R1 Quick Action reactive spell
6. All 5 traits have R0 representation — model trait coverage

### Internal Synergies
- **Beast Form → Enhanced attacks**: Transform → gain natural weapons and abilities
- **Plant growth → Entangle → Poison**: Create difficult terrain → restrain targets → poison them
- **Weather → Terrain control**: Manipulate weather → create advantageous terrain

## Current Spell Inventory (35 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 6 | Acid Splash, Bestial Adaptation, Lashing Vine, Poison Mist, Rejuvenation, Shillelagh |
| 1 | 8 | Beast Form, Blessing of Nature, Mesh of Vines, Purify Water, Rock Throw, Sticks to Snakes, Venomous Weapon, Wild Companion |
| 2 | 11 | Heat Metal, Law of the Strongest, Living Plants, Melt Ground, Nature's Passage, Rock Skin, Speak with Animals and Plants, Sudden Growth, Thorn Barrage, Toxic Mist, Water Prison |
| 3 | 8 | Animal Messenger, Fungal Growth, Impalement, Insect Swarm, Life from Stone, Nature's Judgment, Petrification, Stone Pillar (incomplete) |
| 4 | 2 | Control Weather (incomplete), Tree Stride (incomplete) |

### Trait × Rank Coverage — Strong ✅

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| earth | Shillelagh | Rock Throw | Melt Ground, Heat Metal | Life from Stone, Petrification, Stone Pillar* | Primal Guardian (proposed) | Cataclysmic Eruption (proposed) |
| water | — | Purify Water | Water Prison, Nature's Passage | — | Control Weather* | — |
| poison | Poison Mist, Acid Splash | Venomous Weapon, Sticks to Snakes | Toxic Mist | Fungal Growth, Insect Swarm | — | Cataclysmic Eruption (proposed) |
| animals | Bestial Adaptation | Beast Form, Wild Companion | Law of the Strongest, Speak with Animals and Plants | Animal Messenger, Nature's Judgment | Primal Guardian (proposed) | Primeval Form (proposed) |
| plants | Lashing Vine, Rejuvenation | Blessing of Nature, Mesh of Vines | Living Plants, Sudden Growth, Thorn Barrage, Rock Skin | Impalement | Tree Stride*, Verdant Restoration (proposed) | Primal Awakening (proposed) |

*Asterisk = incomplete spell*

**Coverage**: 30/30 slots filled with proposals (100%) — full trait coverage achieved

**Minor Gaps**:
- **Water R0**: No water cantrip (Water Jet proposed fills this)
- **Water R3**: Gap between R2 and R4 — only remaining trait×rank gap

## Proposed Spell Changes

### Acid Splash — Durability-Based Rework

**Current**: Acid Splash deals acid damage and directly reduces target's AV.
**Proposed**: Replace AV reduction with **Durability check** on target's equipment.
**Reworked Effect**:
- **Weak.** Deal +2 acid damage. One piece of the target's equipment (armor or shield) must make a **Durability check**.
- **Strong.** Deal +4 acid damage. The target's armor and shield each make a Durability check.
- **Critical.** Deal +6 acid damage. All of the target's worn equipment makes a Durability check. Equipment that fails is corroded (−1 AV until repaired).

**Rationale**: R0 cantrips should not directly reduce AV — that is too powerful for unlimited-use spells. Durability checks create meaningful equipment degradation over time without guaranteed AV loss. This version is **identical to Evocation's Acid Splash** (cross-school shared spell).

## Proposed New Spells

### Bark Shield

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Self | Self | quick

*Your skin briefly hardens with bark-like growth as an attack lands, absorbing the impact.*

**Effect.** As a Quick Action when targeted by an attack, gain +2 to your Dodge or Parry against the triggering attack. If the attacker is within melee range, they take +2 physical damage from thorns that erupt from the bark.

> **Design Note**: R1 Quick Action reactive defense. Standardized base (+2 Dodge/Parry) with Nature's thorn retribution as secondary effect. No SL scaling — one reliable defensive reaction.

### Water Jet

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Close | —

*You conjure a pressurized stream of water from your palm, striking with surprising force.*

**Weak.** Deal +2 physical damage. The target is drenched (extinguishes burning condition).
**Strong.** Deal +4 physical damage. The target is pushed back into close range.
**Critical.** Deal +6 physical damage. The target is pushed and briefly prone from the force of the stream.

> **Design Note**: Fills R0 water gap. Cantrip-level water manipulation with push utility — pairs with other Nature spells that benefit from wet/drenched targets.

### Primal Awakening

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Very Hard TN | Close | concentrate, material cost (300 coins)

*You pour primal energy into the earth itself. Trees uproot and walk, stones grind into motion, and the land answers your call — not as a single conjured servant, but as the living terrain awakening around you.*

**Weak.** For a short duration while you concentrate, all natural terrain in a medium area becomes animated and obeys your commands. Each turn, the awakened terrain performs one of the following: all enemies in the area are attacked by roots and stones (vs. Dodge, +6 physical damage); all enemies must save (Spirit + Fortitude vs. TN 16) or be restrained by grasping plants; or the terrain reshapes itself (create or remove difficult terrain, walls of earth/wood with 20 HP, or bridges).
**Strong.** As above with +10 damage on terrain attacks. Restrained creatures also suffer the poisoned condition (toxic sap) briefly.
**Critical.** As above with +14 damage on terrain attacks. The awakened terrain can perform two actions per turn instead of one.

> **Design Note**: R5 capstone fundamentally different from Primal Guardian (R4 single summon). Instead of summoning one creature, Primal Awakening animates the entire battlefield — providing area control, damage, and terrain manipulation. Core effect (animated terrain, short duration, one action per turn) is reliable on any success — SL adds damage and action economy. Material cost and concentration balance the power. Use Primal Guardian's Heighten (R5) option for a stronger single-summon alternative.

### Primal Guardian

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Hard TN | Close | concentrate

*You call upon the deep roots of the earth and the ancient trees, summoning a guardian spirit of nature — a towering tree guardian wreathed in vines or a hulking earth elemental of moss-covered stone.*

**Weak.** Summon a Tier 3 nature spirit (tree guardian or earth elemental) in close range. It acts on your initiative, obeys your commands, and lasts for a medium duration while you concentrate.
**Strong.** The spirit gains +2 AV from dense bark or stone plating.
**Critical.** The spirit has +2 AV and can use one special ability per turn (chosen at summoning: root entangle vs. Dodge in close range, or stone slam dealing +6 physical damage).

**Heighten (R5).** The spirit is Tier 4 instead of Tier 3.

> **Design Note**: R4 animals/earth gap filler. Core effect (Tier 3 nature spirit, medium duration) is reliable on any success — SL adds durability and special abilities. Heighten to R5 increases summon tier, replacing the need for a separate higher-rank summon spell. Concentration prevents stacking.

### Verdant Restoration

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Allies | Close | —

*You channel the life force of the earth itself, and a wave of verdant energy pulses outward — flowers bloom, moss spreads, and the very air shimmers with restorative power.*

**Weak.** All allies in close range regain +5 HP. Cure the poisoned, restrained, entangled, and diseased conditions on each ally.
**Strong.** Allies regain +10 HP with the same condition cures. Allies also gain +1 boon on Fortitude checks for a short duration.
**Critical.** Allies regain +15 HP with the same condition cures. Allies gain +2 boons on Fortitude checks for a short duration and regain +2 HP at the start of their next turn.

> **Design Note**: R4 nature healing capstone. Core effect (mass heal + cure all nature-themed conditions) is reliable on any success — SL adds healing and Fortitude bonuses. Nature's healing identity focuses on purification rather than raw HP like Life tradition.

### Cataclysmic Eruption

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Medium | concentrate

*The earth splits open as primal fury erupts — jagged stone spires thrust upward, thorned vines lash from every crack, and clouds of poisonous spores billow from the tortured ground. All elements of nature attack as one.*

**Weak.** All creatures in a short area take +6 physical/poison damage. The area becomes difficult terrain for a medium duration. Creatures must save (Spirit + Fortitude vs. TN 16) or be restrained by erupting vines. Restrained creatures also suffer the poisoned condition for a short duration.
**Strong.** Deal +12 physical/poison damage with the same effects. Creatures that start their turn in the area take +2 poison damage from toxic spores.
**Critical.** Deal +18 physical/poison damage with the same effects. Toxic spore damage increases to +4 poison per turn. The restrained condition's save suffers +1 bane.

> **Design Note**: R5 AoE capstone. Core effect (damage, medium difficult terrain, restrain save, poison) is reliable on any success — SL adds damage and toxic spore intensity. Concentration limits other casting.

### Primeval Form

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Self | Self | concentrate

*You shed your mortal shape and become a creature of primal legend — a massive dire beast, a winged serpent, or a thundering megafauna of the ancient world. The transformation is total: you become the apex predator.*

**Weak.** Transform into a Tier 4 creature of your choice (dire bear, giant serpent, young dragon, giant eagle, or similar apex beast) for a short duration. You gain the creature's Strength, Agility, natural armor (AV 8), and natural attacks (+10/+20/+30 damage). You retain your Spirit and Mind attributes. You cannot cast spells while transformed.
**Strong.** Your natural attacks gain +2 weapon damage.
**Critical.** Your natural attacks gain +4 weapon damage, and you may use one special movement mode (flight, swimming, or burrowing) even if the chosen form doesn't normally possess it.

> **Design Note**: R5 ultimate beast form — the culmination of the Beast Form chain (R1 → R5). Core effect (Tier 4 transformation, short duration, full form choice including legendary beasts, retain Spirit/Mind) is reliable on any success — SL adds weapon damage and movement options. Concentration and inability to cast spells while transformed are significant costs.

## Cross-School Spell Sharing

The following spells are shared between Nature and arcane disciplines (same spell in both lists):

| Spell | Nature Rank | Shared With | Notes |
|-------|-------------|-------------|-------|
| **Acid Splash** | R0 | Evocation (Arcane) | Identical spell — acid damage + Durability check (see Proposed Spell Changes) |

**Concept Overlaps** (not shared, but thematically adjacent):
- **Wild Companion** (Nature R1) overlaps with **Conjure Familiar** (Conjuration, Arcane) — both summon animal-like companions, but Wild Companion channels natural kinship while Conjure Familiar is transgressive binding. Different mechanics, similar fiction.

> **Design Note**: Cross-school sharing is limited to spells that thematically fit both schools. Acid Splash represents both natural toxin (Nature) and transgressive elemental acid (Evocation). When a spell is shared, it must be identical in both lists — Nature's Acid Splash must use the same Durability-based rework as Evocation's version.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Earth chain**: Shillelagh (R0) → Rock Throw (R1) → Melt Ground/Heat Metal (R2) → Life from Stone/Petrification/Stone Pillar (R3) → Primal Guardian (R4 proposed) → Cataclysmic Eruption (R5 proposed) — **complete R0-R5**
2. **Water chain**: Water Jet (R0 proposed) → Purify Water (R1) → Water Prison/Nature's Passage (R2) → *gap at R3* → Control Weather (R4\*) → *needs dedicated R5 water*
3. **Poison chain**: Poison Mist/Acid Splash (R0) → Venomous Weapon/Sticks to Snakes (R1) → Toxic Mist (R2) → Fungal Growth/Insect Swarm (R3) → *gap at R4* → Cataclysmic Eruption (R5 proposed, poison component)
4. **Animals chain**: Bestial Adaptation (R0) → Beast Form/Wild Companion (R1) → Law of the Strongest/Speak with Animals (R2) → Animal Messenger/Nature's Judgment (R3) → Primal Guardian (R4 proposed, nature spirit) → Primeval Form (R5 proposed) — **complete R0-R5**
5. **Plants chain**: Lashing Vine/Rejuvenation (R0) → Blessing of Nature/Mesh of Vines (R1) → Living Plants/Sudden Growth/Thorn Barrage (R2) → Impalement (R3) → Tree Stride (R4\*)/Verdant Restoration (R4 proposed) → Primal Awakening (R5 proposed) — **complete R0-R5**

### Setup + Payoff Combos
- ✅ **Plant growth → Entangle → Poison**: Mesh of Vines (R1) restrains → Toxic Mist (R2) poisons trapped targets — strong synergy
- ✅ **Beast Form → enhanced combat**: Transform grants natural weapons, then exploit beast abilities for situational advantage
- ⚠️ **Weather → terrain**: Control Weather (R4\*) could create advantageous terrain, but spell is incomplete and no lower-rank weather exists
- ❌ **Water → poison combo**: No explicit mechanic linking water and poison effects (e.g., poison spreading through water)

### Design Completeness Checklist
- [x] R1 Quick Action: Bark Shield (R1 proposed) — standardized reactive defense (+2 Dodge/Parry, thorn damage secondary)
- [x] Defensive options: Bark Shield (R1 proposed), Rock Skin (R2) — good physical defense
- [x] Utility: Bestial Adaptation (R0), Speak with Animals and Plants (R2), Nature's Passage (R2) — excellent breadth
- [x] Damage across ranks: R0-R5 fully covered — Cataclysmic Eruption (R5) provides AoE capstone, Primeval Form (R5) provides melee capstone
- [x] Repeating conditions: Poisoned, restrained/entangled, difficult terrain — consistent natural hazard identity
- [x] Setup+payoff: Plant→entangle→poison explicitly supported and practical
- [x] Healing capstone: Verdant Restoration (R4) provides mass heal + condition removal
- [x] Summoning chain: Wild Companion (R1) → Primal Guardian (R4, with Heighten to R5 for Tier 4 spirit)
- [x] Beast Form chain: Beast Form (R1) → Primeval Form (R5) — transformation progression complete
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 7, R1: 9, R2: 11, R3: 8, R4: 4, R5: 3)
- ⚠️ **Remaining gaps**: Water R3 still empty, Poison R4 dedicated spell missing

### Impact & Trivialization Review
- **Water Jet (R0 water utility)**: Minimal risk — cantrip-level push/drench effect with modest damage. No exploration bypass.
- **Beast Form (R1 exploration bypass)**: Moderate risk — flying, swimming, or climbing forms could bypass physical obstacles (walls, rivers, chasms). **Mitigations**: R1 Focus cost, likely concentration, can't use equipment or cast while transformed, beast form stats limit capabilities. GMs should ensure beast form stat blocks have appropriate movement limitations and that key obstacles require more than simple physical traversal. Still the highest bypass risk in Nature.
- **Nature's Passage (R2)**: Low risk — terrain traversal assistance (ignore difficult terrain), not teleportation. Party still travels through the environment.
