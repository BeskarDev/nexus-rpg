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

Framework: [synergy-framework.md](../../../../.claude/skills/spell-design/references/synergy-framework.md) — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Nature emits: **living terrain** (vines, mud, sudden growth, melted ground — difficult terrain that grasps), *restrained/entangled* (Mesh of Vines, Water Prison), *poisoned* (toxins and spores), and **transformed bodies** (Beast Form, Law of the Strongest — the setup is worn on the caster's or ally's own flesh).

**Payoff levers** — Nature strikes what the land has caught: Impalement and Thorn Barrage punish targets held in place, poison compounds on the entangled who cannot flee the spore cloud, and a transformed body cashes its new claws and bulk into every subsequent round. Cold-cast deficit: its damage spells are mid-curve in the open field — the school only outperforms where the terrain fights alongside it, which is its harmonious identity in mechanical form.

**Extenders** — *prolong* is native (plants keep growing, terrain persists without concentration in many cases), *spread* as the vines creep outward and poison clouds drift (Fungal Growth, Insect Swarm renewing pressure over an area each round), and *convert* along the signature chain: difficult terrain → *entangled* → *poisoned* → devoured.

**Solo engine** (multi-turn): T1 Sudden Growth (the clearing becomes a grasping thicket) → T2 Toxic Mist over the tangled enemies (*poisoned* on targets who cannot leave) → T3 Impalement on the held champion while the thicket keeps the rest busy. Gated by Focus and by geography — the engine needs ground that can live (stone halls and ship decks blunt it), a diegetic limit the fiction enforces.

**Party interlock**: **emits** difficult terrain, *restrained*, *poisoned*, plus animal bodies (Wild Companion) — board-control currency: the entangled line cannot reach the party's archers, and a held target is anyone's free hit. Nature is also the mystic side's buff battery (Law of the Strongest, Blessing of Nature, Stone Skin on the martial). **wants** finishers for what its terrain holds (the fighter executes the entangled) and fire kept away from its own plants. Cross-player line: Nature's vines lock the raiders in the thicket, and the enlarged, stone-skinned fighter (its own blessings) wades in to finish them.

**Synergy gaps**: the fullest three-role school on the mystic side, but the *convert* chain's last link is informal — nothing published mechanically rewards attacking a *restrained* or *poisoned* target beyond the conditions themselves. Weather (R4, incomplete) should be the grand extender reshaping the whole field and is unbuilt. Both are design targets.

**Synergy gap proposals** (sketches, post-framework — design fresh per current principles):
- **Devouring Bloom** (R3, payoff) — the plants holding a *restrained* or *entangled* creature flower and feed: heavy poison damage and the hold persists as the tendrils tighten. The chain's final link — castable only on a target the land has already caught.
- **Deepening Venom** (R2, extender/convert) — toxin already in a *poisoned* creature's blood turns virulent: the condition extends and they suffer +1 bane on Strength and Agility rolls while it lasts. Ripens the poison window for the whole party.
- **Complete Control Weather** (R4, grand extender) — finish the incomplete slot as the field-scale extender: choose rain (ground becomes difficult terrain, fire magic suffers), wind (ranged attacks suffer, flight labors), or fog (heavy concealment) over a wide area for the scene. Not damage — the sky as standing setup all other Nature (and party) play cashes in.

## Current Spell Inventory (37 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 6 | Acid Splash, Bestial Adaptation, Lashing Vine, Poison Mist, Rejuvenation, Shillelagh |
| 1 | 8 | Beast Form, Blessing of Nature, Mesh of Vines, Purify Water, Rock Throw, Sticks to Snakes, Venomous Weapon, Wild Companion |
| 2 | 13 | Diminish, Gift of the Wild, Heat Metal, Law of the Strongest, Living Plants, Melt Ground, Nature’s Passage, Speak with Animals and Plants, Stone Skin, Sudden Growth, Thorn Barrage, Toxic Mist, Water Prison |
| 3 | 8 | Animal Messenger, Fungal Growth, Impalement, Insect Swarm, Life from Stone, Nature's Judgment, Petrification, Stone Pillar (incomplete) |
| 4 | 2 | Control Weather (incomplete), Tree Stride (incomplete) |
| 5 | 0 | — |

### Trait × Rank Coverage — Strong ✅

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| earth | Shillelagh | Rock Throw | Melt Ground, Heat Metal | Life from Stone, Petrification, Stone Pillar* | Primal Guardian (proposed) | Cataclysmic Eruption (proposed) |
| water | — | Purify Water | Water Prison, Nature's Passage | — | Control Weather* | — |
| poison | Poison Mist, Acid Splash | Venomous Weapon, Sticks to Snakes | Toxic Mist | Fungal Growth, Insect Swarm | — | Cataclysmic Eruption (proposed) |
| animals | Bestial Adaptation | Beast Form, Wild Companion | Law of the Strongest, Speak with Animals and Plants | Animal Messenger, Nature's Judgment | Primal Guardian (proposed) | Primeval Form (proposed) |
| plants | Lashing Vine, Rejuvenation | Blessing of Nature, Mesh of Vines | Living Plants, Sudden Growth, Thorn Barrage, Stone Skin | Impalement | Tree Stride*, Verdant Restoration (proposed) | Primal Awakening (proposed) |

*Asterisk = incomplete spell*

**Coverage**: all 30 trait×rank slots have at least a concept seed (published spell or proposed concept). Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).

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

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Seed |
|---|---|---|
| Bark Shield | 1 | Your skin briefly hardens with bark-like growth as an attack lands, absorbing the impact. (R1 Quick Action reactive defense) |
| Water Jet | 0 | You conjure a pressurized stream of water from your palm, striking with surprising force. (Fills R0 water gap) |
| Primal Awakening | 5 | You pour primal energy into the earth itself. Trees uproot and walk, stones grind into motion, and the land answers your call — not as a single conjured servant, but as the living terrain awakening around you. (R5 capstone fundamentally different from Primal Guardian (R4 single summon)) |
| Primal Guardian | 4 | You call upon the deep roots of the earth and the ancient trees, summoning a guardian spirit of nature — a towering tree guardian wreathed in vines or a hulking earth elemental of moss-covered stone. (R4 animals/earth gap filler) |
| Verdant Restoration | 4 | You channel the life force of the earth itself, and a wave of verdant energy pulses outward — flowers bloom, moss spreads, and the very air shimmers with restorative power. (R4 nature healing capstone) |
| Cataclysmic Eruption | 5 | The earth splits open as primal fury erupts — jagged stone spires thrust upward, thorned vines lash from every crack, and clouds of poisonous spores billow from the tortured ground. All elements of nature attack as one. (R5 AoE capstone) |
| Primeval Form | 5 | You shed your mortal shape and become a creature of primal legend — a massive dire beast, a winged serpent, or a thundering megafauna of the ancient world. The transformation is total: you become the apex predator. (R5 ultimate beast form — the culmination of the Beast Form chain (R1 → R5)) |

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
- [x] Defensive options: Bark Shield (R1 proposed), Stone Skin (R2) — good physical defense
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
