# Tempest — Spell School Design Space

## School Identity

**Tradition**: Tempest (Mystic)
**Traits**: hurricanes, earthquakes, thunderstorms, sandstorms, floods
**Identity**: Respectful wielding of destructive natural forces — channeling storms, quakes, and floods
**Role Spread**: Excels: Offense | Decent: Control, Utility | Weak: Healing, Support, Defense

### Mechanical Identity
- **Primary Conditions**: Staggered (lightning), prone (wind/quake), deafened (thunder)
- **Signature Gimmick**: Storm power and environmental destruction — area denial, forced movement, terrain destruction
- **Damage Types**: Lightning, Frost, Blast

### Design Principles
1. Tempest is the strongest offensive mystic tradition (28/33 spells deal damage)
2. Storm and lightning effects provide both damage and control
3. Area denial through weather effects (wind, ice, sandstorm) is a key tactic
4. **Gaps**: Limited non-combat utility, "earthquakes," "sandstorms," and "floods" lack R0 representation
5. Blast damage (½ AV ignore) fits concussive storm effects — retain this identity

### Internal Synergies

Framework: [synergy-framework.md](../../../../.claude/skills/spell-design/references/synergy-framework.md) — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Tempest emits: **weather as field** (a Storm Cloud gathering overhead, a Sandstorm scouring sight away, wind walls and cyclones carving the battlefield), *prone* and forced movement (gusts, tremors, floodwater), *staggered* (thunder), and *deafened*. Its setups are big, loud, and diegetic — the sky itself turns hostile.

**Payoff levers** — Tempest strikes into the storm it raised: lightning falls hardest from a standing storm cloud, wind-thrown and *prone* targets have no footing against the follow-up wave, and chained strikes (Chain Lightning) cash in enemies the winds packed together. Cold-cast deficit is structural in the two-roll pattern — Storm Cloud and Cyclone do little the turn they are raised and pay off on the attacks made *through* them in later rounds.

**Extenders** — *prolong* through persistent weather (the cloud keeps rumbling, the cyclone keeps wandering, each granting repeat attacks for one casting), **escalate** — the school's signature *convert*: a minor squall built into a full tempest across turns (storm build-up, R4 capstones like Lightning Storm and Avatar of Storms as the matured sky), and *refresh* as the elemental servant (Conjure Elemental) re-applies pressure with its own actions each round.

**Solo engine** (multi-turn): T1 Storm Cloud (the sky loads) → T2 Wind Hose slams the enemy line *prone* beneath it → T3 the cloud's repeated lightning falls on grounded targets while Thunder Clap staggers whoever regains their feet. Gated by concentration on the weather, the two-roll structure (raise, then attack), and Focus — a broken concentration disperses the whole invested sky.

**Party interlock**: **emits** *prone*, *staggered*, *deafened*, forced movement, and sight-killing weather (sandstorm cover the rogue hunts through) — disruption currency: a prone, staggered line is a charge target for every martial. **wants** melee allies to finish what the storm knocks down, and tight enemy clusters (Conjuration's walls, Telekinetics' pulls) for its chains and waves to sweep whole. Cross-player line: Telekinetics drags the raiders into one knot and Tempest's Chain Lightning arcs through every one of them.

**Synergy gaps**: setup and extenders are rich, but the **storm build-up escalation is informal** — no published mechanic actually grows a lesser storm into a greater one (the R4 capstones are incomplete, so the matured-sky payoff is unbuilt). Also nothing rewards striking *prone/staggered* targets beyond the conditions themselves. Completing the R4 weather spells as the escalation payoff is the top design target.

**Synergy gap proposals** (sketches, post-framework — design fresh per current principles):
- **Thunderfall** (R2, payoff) — a hammer of pressure drops on a *prone* or *staggered* creature: blast damage (ignoring 1/2 AV) and *deafened* as the shockwave lands flush on a body that cannot brace. On-curve at best against the standing — the storm punishes the already-toppled.
- **Feed the Storm** (R3, extender/escalate) — pour power into your standing Storm Cloud or Cyclone: its area grows one step and its repeated attacks deal +2 damage for the rest of its duration. The build-up rung, castable only with a storm already overhead — the sky visibly darkening turn by turn.
- **Complete Lightning Storm** (R4, escalation capstone) — finish the incomplete slot as the matured sky: castable at reduced Focus if you have concentrated on a storm spell since your last turn (the tempest already gathered), a wide zone of repeated strikes favoring *prone/staggered* targets. Makes escalation a priced mechanic instead of flavor.

## Current Spell Inventory (34 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Gust, Static Shock, Wind Slash |
| 1 | 10 | Bursting Crackle, Curse of Tempest, Earthen Tremor, Electrified Weapon, Lightning Javelin, Storm Coat, Storm Shield, Updraft, Volcanic Bolt, Wind Hose |
| 2 | 9 | Conjure Elemental, Lightning Bolt, Lightning Step, Magma Burst, Pyroclasm, Storm Cloud, Thunder Clap, Torrent, Wind Ward |
| 3 | 7 | Chain Lightning, Cone of Cold, Cyclone, Lightning Volley, Sandstorm (incomplete), Shattering Orb, Wind Wall |
| 4 | 5 | Avatar of Storms, Control Water (incomplete), Control Winds (incomplete), Earthquake (incomplete), Lightning Storm (incomplete) |
| 5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| hurricanes | Gust, Wind Slash | Wind Hose | Torrent, Wind Ward | Cyclone, Wind Wall | Control Winds* | Eye of the Storm |
| earthquakes | Tremor | Earthen Tremor | Aftershock | Fissure | Earthquake* | World Shaker |
| thunderstorms | Static Shock | Bursting Crackle, Lightning Javelin, Electrified Weapon, Storm Coat, Thunder Guard | Lightning Bolt, Lightning Step, Storm Cloud, Thunder Clap | Chain Lightning, Lightning Volley, Shattering Orb | Avatar of Storms, Lightning Storm* | Storm Lord |
| sandstorms | Sand Gust | Sandblast | Pyroclasm | Sandstorm*, Cone of Cold | Scouring Winds | Wrath of the Desert |
| floods | Splash | Water Jet | Conjure Elemental, Magma Burst, Tidal Surge | Flash Flood | Control Water* | Maelstrom |

*Asterisk = incomplete spell*

**Coverage**: all 30 trait×rank slots have at least a concept seed (published spell or proposed concept). Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).

## Proposed Spell Changes

### Lightning Bolt — Area Reduction

**Current**: Line in medium range at Rank 2
**Proposed**: Reduce to **short line** to match R2 area progression
**Rationale**: R2 spells should affect a close area or short line.

### Cone of Cold — Damage Reduction

**Current**: +6/+12/+18 AoE cone at Rank 3
**Proposed**: Reduce to **+4/+8/+12** to match half single-target scaling for R3 multi-target
**Rationale**: R3 multi-target should be +4/+8/+12 under revised scaling.

### Chain Lightning — Damage Reduction

**Current**: +6/+12/+18 chain at Rank 3
**Proposed**: Primary target +8/+16/+24 (single-target scaling), chain targets +4/+8/+12 (multi-target scaling)
**Rationale**: Chain spell pattern — primary target at full damage, secondary targets at half.

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Seed |
|---|---|---|
| Thunder Guard | 1 | You summon a crackling shell of static charge around yourself as an attack comes, the air snapping with electricity. (R1 Quick Action reactive defense) |
| Tremor | 0 | You stamp the ground and send a localized tremor rippling outward. (Fills the R0 earthquakes gap) |
| Sand Gust | 0 | You whip up a blast of sand or dust, stinging eyes and obscuring vision. (Fills the R0 sandstorms gap) |
| Splash | 0 | You conjure a sudden burst of water that drenches and pushes a target. (Fills the R0 floods gap) |
| Aftershock | 2 | You slam the ground with divine fury, sending a powerful shockwave rippling through the earth. (R2 earthquake AoE. Prone and difficult terrain are reliable on any success) |
| Tidal Surge | 2 | You summon a powerful wave of water that crashes forward, sweeping away everything in its path. (Fills R2 floods gap) |
| Weather Prediction | 0 | You read the winds and sky, predicting the weather for the near future. (Non-combat utility cantrip — fills the Tempest utility gap) |
| Storm Lord | 5 | You become one with the storm, transforming into an avatar of elemental fury. Lightning crackles around you, winds howl at your command, and the sky darkens. (R5 capstone — transformation into a storm avatar) |
| World Shaker | 5 | You channel the fury of the deep earth, and the world answers. The ground heaves, splits, and buckles — buildings topple, chasms yawn open, and the very foundations of civilization shudder under divine wrath. (R5 earthquake capstone — the culmination of the earthquakes chain (Tremor → Earthen Tremor → Aftershock → Earthquake → World Shaker)) |
| Maelstrom | 5 | You call upon the primal forces of wind and water, and a massive vortex of churning waves and howling gale descends upon the battlefield — a hurricane given divine purpose, or a whirlpool that swallows the earth itself. (R5 floods/hurricanes combined capstone — massive area denial and forced movement) |
| Fissure | 3 | You channel the fury of the deep earth, splitting the ground open in a jagged fissure that swallows the unwary. (Fills the R3 earthquakes gap (between Aftershock R2 and Earthquake R4)) |
| Sandblast | 1 | You hurl a concentrated blast of scouring sand at a creature, shredding skin and blinding eyes. (Fills the R1 sandstorms gap) |
| Scouring Winds | 4 | You call upon a devastating wind laden with scouring sand, stripping flesh and obscuring all vision across a vast area. (Fills the R4 sandstorms gap) |
| Wrath of the Desert | 5 | You invoke the primal fury of the great deserts — a wall of sand that devours the horizon. The sky darkens as an immense sandstorm descends, burying and scouring everything in its path. (R5 sandstorms capstone) |
| Water Jet | 1 | You conjure a powerful jet of water that slams into a creature, drenching them and knocking them back. (Fills the R1 floods gap) |
| Flash Flood | 3 | You call upon a sudden torrent of water that crashes through the area, sweeping creatures off their feet and flooding the ground. (Fills the R3 floods gap) |
| Eye of the Storm | 5 | You become the eye of a divine hurricane. Absolute calm surrounds you while devastating winds spiral outward, shredding everything in their path. The sky darkens, the air screams, and nothing stands against the storm's fury. (R5 hurricanes capstone — distinct from Storm Lord (thunderstorms/lightning transformation) and Maelstrom (floods/vortex pull)) |

## Cross-School Spell Sharing

The following spells are shared between Tempest and arcane disciplines (same spell in both lists):

| Spell | Tempest Rank | Shared With | Notes |
|-------|-------------|-------------|-------|
| **Chain Lightning** | R3 | Evocation (Arcane) | Identical spell — primary target + chain to secondary targets |

**Concept Overlaps** (not shared, but thematically adjacent):
- **Lightning Bolt** (Tempest R2) overlaps with **Lightning Strike** (Evocation R2) — both are line-based lightning damage spells. Tempest channels divine storm power; Evocation channels raw elemental force. Similar mechanics, different flavor sources.

> **Design Note**: Cross-school sharing is limited to spells that thematically fit both schools. Chain Lightning represents both raw elemental control (Evocation) and natural storm power (Tempest). When a spell is shared, it must be identical in both lists.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Hurricanes chain**: Gust/Wind Slash (R0) → Wind Hose (R1) → Torrent/Wind Ward (R2) → Cyclone/Wind Wall (R3) → Control Winds (R4\*) → Eye of the Storm/Maelstrom (R5) — **complete R0-R5**
2. **Earthquakes chain**: Tremor (R0) → Earthen Tremor (R1) → Aftershock (R2) → Fissure (R3) → Earthquake (R4\*) → World Shaker (R5) — **complete R0-R5**
3. **Thunderstorms chain**: Static Shock (R0) → Bursting Crackle/Lightning Javelin/Electrified Weapon/Storm Coat (R1) → Lightning Bolt/Storm Cloud/Thunder Clap (R2) → Chain Lightning/Lightning Volley/Shattering Orb (R3) → Avatar of Storms/Lightning Storm (R4) → Storm Lord (R5) — **complete R0-R5**
4. **Sandstorms chain**: Sand Gust (R0) → Sandblast (R1) → Pyroclasm (R2) → Sandstorm/Cone of Cold (R3) → Scouring Winds (R4) → Wrath of the Desert (R5) — **complete R0-R5**
5. **Floods chain**: Splash (R0) → Water Jet (R1) → Conjure Elemental/Magma Burst/Tidal Surge (R2) → Flash Flood (R3) → Control Water (R4\*) → Maelstrom (R5) — **complete R0-R5**

### Setup + Payoff Combos
- ✅ **Wind push → lightning**: Push targets into exposed positions with Gust/Wind Hose → strike with lightning spells for full effect
- ✅ **Prone → AoE bonus**: Tremor/Earthen Tremor knocks prone → Aftershock/Fissure adds reliable prone checks plus AoE damage, keeping targets locked down for melee allies to exploit
- ✅ **Sand blind → follow-up**: Sandblast/Sand Gust blinds targets → Scouring Winds/Wrath of the Desert punishes clustered blinded enemies with AoE
- ✅ **Flood push → prone chain**: Water Jet pushes and prones → Flash Flood mass pushes → Maelstrom pulls and restrains — complete repositioning toolkit
- ⚠️ **Storm buildup**: Minor storm effects → major storm conceptually fits, but no explicit mechanic rewards casting multiple storm spells in sequence

### Design Completeness Checklist
- [x] R1 Quick Action: Thunder Guard (R1) — standardized reactive defense (+2 Dodge/Parry, lightning damage secondary)
- [x] Defensive options: Storm Shield (R1), Wind Ward (R2), Storm Coat (R1) — solid defensive suite
- [x] Utility: Weather Prediction (R0) — fills the non-combat gap; Control Weather (R4\*) for advanced utility
- [x] Damage across ranks: R0-R5 fully covered — Storm Lord, World Shaker, Maelstrom, and Eye of the Storm provide four distinct R5 capstones
- [x] Repeating conditions: Staggered, prone, deafened, pushed, blinded, restrained — consistent storm-force identity
- [x] Setup+payoff: Prone → Aftershock/Fissure, blind → sandstorm AoE, push → flood chain — three distinct tactical combos
- [x] R5 capstone diversity: Storm Lord (lightning transformation), World Shaker (earthquake AoE), Maelstrom (vortex pull), Eye of the Storm (wind push/denial) — four different tactical roles
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 7, R1: 12, R2: 11, R3: 9, R4: 7, R5: 4)
- [ ] **All trait×rank slots filled**: all 30 trait×rank slots seeded with concepts; published coverage is partial (see inventory) coverage — no remaining gaps
