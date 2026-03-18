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
