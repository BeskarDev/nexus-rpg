# Necromancy — Spell School Design Space

## School Identity

**Discipline**: Necromancy (Arcane)
**Traits**: decay, undeath, siphoning, defilement, puppetry
**Identity**: Selfish manipulation of death and life force — exploiting the boundary between life and death
**Role Spread**: Excels: Control | Decent: Offense, Utility | Weak: Healing, Support, Defense

### Mechanical Identity
- **Primary Conditions**: Stunned, paralyzed, life drain (attribute reduction), bleeding
- **Signature Gimmick**: Undead creation and corpse manipulation — kill enemies, use their corpses, build an undead army
- **Damage Types**: Necrotic, Poison, Physical

### Design Principles
1. Necromancy is the model school — best-in-class depth (28 spells), strong synergies, coherent identity
2. The kill → corpse → exploit cycle creates compelling gameplay loops
3. Life siphoning provides limited self-healing (the only arcane "healing" — selfish by design)
4. Undead minions provide action economy but require ongoing management
5. All 5 traits have R0 representation — exemplary trait coverage

### Internal Synergies
- **Kill → Corpse Explosion**: Kill enemies → use Corpse Explosion for AoE damage
- **Summon → Control**: Animate Corpse/Horde → Control Undead for better minions
- **Drain → Shield**: Life drain spells fuel Necrotic Shield for self-protection
- **Death Mark → Follow-up**: Mark target for vulnerability → all subsequent attacks deal bonus damage

## Current Spell Inventory (28 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 5 | Drain Life, Enfeebling Grasp, Life Echo, Necromantic Sight, Soul Drain |
| 1 | 8 | Animate Corpse, Bone Armor, Control Undead, Death Bolt, Death Ward, Grasp of Decay, Necrotic Shield, Ray of Lethargy |
| 2 | 7 | Animate Horde, Bone Shatter, Corpse Explosion, Death Mark, Inflict Curse, Shroud of Blight, Soul Veil |
| 3 | 6 | Curse of Mortality, Negative Energy Flood, Reaper's Harvest, Soul Prison, Spectral Army, Wither |
| 4 | 2 | Death's Embrace, Finger of Death (incomplete) |

### Trait × Rank Coverage — Perfect ✅

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| decay | Enfeebling Grasp | Grasp of Decay, Ray of Lethargy | Shroud of Blight | Wither, Curse of Mortality | — | — |
| undeath | Necromantic Sight | Animate Corpse, Control Undead | Animate Horde | Spectral Army, Negative Energy Flood | Death's Embrace | — |
| siphoning | Drain Life, Soul Drain | Death Bolt | Bone Shatter, Corpse Explosion | Reaper's Harvest | — | — |
| defilement | Life Echo | Necrotic Shield, Death Ward | Inflict Curse, Death Mark | Soul Prison | Finger of Death* | — |
| puppetry | — | Bone Armor | Soul Veil | — | — | — |

*Asterisk = incomplete spell*

**Coverage**: 23/30 slots filled (77%) — best-in-class among all schools. Model for trait coverage.

**Minor Gaps**:
- **Puppetry R0, R3+**: Corpse/skeleton manipulation under-represented at low and high ranks
- **All traits R5**: No R5 capstone — even the gold-standard school needs a legendary finisher
- **Decay R4**: No advanced decay effect at high rank

## Proposed Spell Changes

### Corpse Explosion — Review Under New AoE Scaling

**Current**: R2 AoE dealing +6/+12/+18 (full single-target damage)
**Under New Scaling**: R2 AoE should deal +3/+6/+9
**Question**: Does the corpse requirement (must have a corpse to detonate) justify keeping higher damage?
**Recommendation**: Reduce to +4/+8/+12 (between single-target and standard AoE) as a compromise — the corpse cost is a real constraint but full single-target AoE damage is too high.

### Finger of Death — Complete (currently incomplete)

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Long | —

*You point at a creature and channel the raw power of death itself through them, attempting to extinguish their life force in a single devastating blast.*

**Weak.** Deal +10 necrotic damage. If this reduces the target to 0 HP, they die instantly and rise as an undead under your control at the start of your next turn.
**Strong.** Deal +20 necrotic damage. The target is briefly stunned as their life force wavers. Undead creation applies as above.
**Critical.** Deal +30 necrotic damage. The target is stunned for a short duration. Undead creation applies as above. The risen undead is stronger (treat as one tier higher).

> **Design Note**: R4 iconic death spell. Single-target damage matches R4 scaling. The undead creation payoff rewards the kill → corpse cycle.

## Proposed New Spells

### Army of Shadows

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Very Hard TN | Close | concentrate, material cost (200 coins)

*You channel massive necrotic energy into the ground, raising a host of spectral warriors from the realm of the dead.*

**Weak.** Summon 2 spectral warriors (Tier 2 undead) in close range. They act on your initiative and obey your mental commands. They last for a brief duration.
**Strong.** Summon 4 spectral warriors. They last for a short duration.
**Critical.** Summon 6 spectral warriors. They last for a short duration. You can command them as a group with a single mental command (no action required).

> **Design Note**: R5 capstone — army summoning. Concentration limits total minion output, and the material cost adds resource pressure. Tier 2 minions are useful but not overwhelming.

### Soul Harvest

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Very Hard TN | Medium | concentrate

*You open a dark conduit between yourself and the boundary of death. When any creature's life ebbs away nearby, you drink in the released soul energy — each death feeding your growing power.*

**Weak.** For a short duration while you concentrate, whenever a creature dies within medium range, you harvest its departing soul: regain 6 HP and gain +1 on your next spell roll. You can benefit from this effect up to 3 times per casting.
**Strong.** Regain 8 HP per death and gain +1 on your next spell roll. You can benefit up to 5 times. Additionally, each harvest grants you +1 temporary HP (stacking) that lasts for the duration.
**Critical.** Regain 10 HP per death and gain +2 on your next spell roll. You can benefit up to 5 times. Each harvest also extends the spell's duration by one round, potentially lasting beyond the initial short duration.

> **Design Note**: R5 siphoning capstone — the ultimate life drain. Rewards the kill → exploit cycle that defines Necromancy. Concentration and the "per casting" cap prevent infinite scaling. Self-healing is the only arcane healing, maintaining the school's selfish identity. Synergizes with Finger of Death and Army of Shadows — kill enemies to fuel yourself while raising undead armies.

### Eternal Servitude

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Very Hard TN | Close | ritual (1 hour), material cost (500 coins)

*You perform an elaborate ritual of binding over a suitable corpse, pouring necrotic energy and precious reagents into it. The dead rises not as a shambling thrall, but as a powerful, permanent servant — bound to your will for eternity.*

**Weak.** Animate one corpse as a permanent undead servant (Tier 3). The undead is loyal and follows your commands but has limited initiative — it cannot act independently or make complex decisions. It persists until destroyed.
**Strong.** The undead is Tier 4 with enhanced durability (+20 HP). It can follow complex standing orders and act semi-independently within those parameters.
**Critical.** The undead is Tier 4 with enhanced durability (+20 HP) and retains fragments of its former skills and knowledge. It can act independently within your broad directives and makes tactical decisions in combat.

> **Design Note**: R5 undeath capstone — permanent high-tier undead creation. The 1-hour ritual, 500-coin material cost, and single target prevent casual use. Only one instance at a time (recasting on a new corpse releases the previous servant). Culmination of the undeath chain: Animate Corpse (R1) → Animate Horde (R2) → Spectral Army (R3) → Death's Embrace (R4) → Eternal Servitude (R5).

## Cross-School Spell Sharing

**Significant Overlap: Necromancy (Arcane) ↔ Death (Mystic)**

Necromancy and the Death tradition share extensive thematic territory — both deal with the boundary between life and death, corpse manipulation, and the power of ending. The key distinction is philosophical: Necromancy exploits death selfishly (puppetry, siphoning), while Death tradition approaches it reverently (natural cycles, ancestral respect).

**Shared Spell Candidates** (mechanically identical in both lists):
- **Animate Corpse** (R1) — raising the dead is central to both schools. Necromancy frames it as puppetry; Death tradition frames it as calling the spirit to serve willingly
- **Control Undead** (R1) — commanding existing undead serves both the selfish manipulator and the ancestral authority
- **Corpse Explosion** (R2) — detonating a corpse for tactical effect works mechanically the same regardless of philosophical framing

**Additional Overlap Areas**:
- Life drain effects (Drain Life, Soul Drain) may overlap with Death's decay and curse aspects
- Curse and disease effects (Inflict Curse, Curse of Mortality) align with Death's plagues and curses identity
- Speaking with the dead overlaps with Death's ancestry aspect

> **Design Note**: This is the strongest arcane↔mystic overlap of any discipline/tradition pair. Shared spells should be identical mechanically. The philosophical distinction (selfish exploitation vs. respectful communion with death) provides narrative differentiation without requiring mechanical separation.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Decay chain**: Enfeebling Grasp (R0) → Grasp of Decay/Ray of Lethargy (R1) → Shroud of Blight (R2) → Wither/Curse of Mortality (R3) → *gap at R4-R5*
2. **Undeath chain**: Necromantic Sight (R0) → Animate Corpse/Control Undead (R1) → Animate Horde (R2) → Spectral Army/Negative Energy Flood (R3) → Death's Embrace (R4) → Army of Shadows/Eternal Servitude (R5 proposed) — **complete R0-R5**
3. **Siphoning chain**: Drain Life/Soul Drain (R0) → Death Bolt (R1) → Bone Shatter/Corpse Explosion (R2) → Reaper's Harvest (R3) → *gap at R4* → Soul Harvest (R5 proposed)
4. **Defilement chain**: Life Echo (R0) → Necrotic Shield/Death Ward (R1) → Inflict Curse/Death Mark (R2) → Soul Prison (R3) → Finger of Death (R4 proposed complete) → *gap at R5*
5. **Puppetry chain**: *gap at R0* → Bone Armor (R1) → Soul Veil (R2) → *gap at R3-R5* — weakest chain

### Setup + Payoff Combos
- ✅ **Slay → Corpse Explosion**: Defeat enemy → detonate corpse for AoE — the model gameplay loop
- ✅ **Death Mark → bonus damage**: Mark target → all subsequent attacks deal enhanced damage
- ✅ **Summon → Control**: Animate Corpse → Control Undead upgrades minion quality
- ✅ **Drain → Shield**: Life siphoning fuels Necrotic Shield self-protection
- ✅ **Kill → Soul Harvest**: Soul Harvest (R5 proposed) rewards the kill cycle with HP recovery and spell power — the ultimate siphoning payoff
- ✅ **Undeath chain capstones**: Army of Shadows (mass temporary summons) vs. Eternal Servitude (single permanent elite) provides meaningful R5 choice
- ⚠️ **Puppetry synergy**: Bone Armor and Soul Veil exist but don't connect to the core slay→exploit cycle

### Design Completeness Checklist
- [x] R1 Quick Action: Death Ward (R1) — reactive protective ward
- [x] Defensive options: Bone Armor (R1), Necrotic Shield (R1), Death Ward (R1) — strong triple coverage
- [x] Utility: Necromantic Sight (R0), Life Echo (R0), Soul Veil (R2)
- [x] Damage across ranks: R0-R4 fully covered; R5 Army of Shadows provides offense through summons, Soul Harvest rewards kills with self-healing
- [x] Repeating conditions: Stunned, paralyzed, bleeding, poisoned, life drain — widest condition variety
- [x] Setup+payoff: Slay→corpse, mark→bonus, drain→shield, kill→Soul Harvest — best-in-class synergy loops
- [x] **3 spells per rank minimum**: Met at R0-R3 and R5 (R0: 5, R1: 8, R2: 7, R3: 6, R4: 2, R5: 3). R4 has 2 — needs one more spell
- ⚠️ **Remaining gaps**: Puppetry R0/R3+, Decay R4-R5, Siphoning R4, Defilement R5, R4 needs one more spell for 3-per-rank
