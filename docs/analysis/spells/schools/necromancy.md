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
| decay | Enfeebling Grasp | Grasp of Decay, Ray of Lethargy | Shroud of Blight | Wither, Curse of Mortality | Necrotic Plague | Entropy |
| undeath | Necromantic Sight | Animate Corpse, Control Undead | Animate Horde | Spectral Army, Negative Energy Flood | Death's Embrace | Army of Shadows, Eternal Servitude |
| siphoning | Drain Life, Soul Drain | Death Bolt | Bone Shatter, Corpse Explosion | Reaper's Harvest | Soul Cage | Soul Harvest |
| defilement | Life Echo | Necrotic Shield, Death Ward | Inflict Curse, Death Mark | Soul Prison | Finger of Death | Desecration |
| puppetry | Ghostly Hand | Bone Armor | Soul Veil | Marionette | Possess Corpse | Eternal Servitude |

**Coverage** (existing + proposed): 30/30 slots filled (100%) — all traits fully represented across all ranks

**Remaining Gaps**: No remaining gaps — 100% coverage

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
5 | 10 | Very Hard TN | Close | concentrate, material cost (5,000 coins)

*You channel massive necrotic energy into the ground, raising a host of spectral warriors from the realm of the dead.*

**Weak.** Summon 4 spectral warriors (Tier 2 undead) in close range. They act on your initiative and obey your mental commands. They last for a short duration.
**Strong.** As Weak. The spectral warriors are empowered — each deals +2 bonus necrotic damage on their attacks. You can command them as a group with a single mental command (no action required).
**Critical.** As Strong. Bonus necrotic damage increases to +4. When a spectral warrior is destroyed, it explodes in a burst of necrotic energy, dealing +4 necrotic damage to all creatures within melee range (vs. Dodge).

> **Design Note**: R5 capstone — army summoning. Warrior count (4) and duration (short) are fixed on any success — the army is reliable. SL scales the warriors' combat effectiveness (bonus damage, death burst) rather than their numbers. This is NOT a bigger version of Spectral Army (R3) — Spectral Army summons temporary phantoms for distraction and harassment, while Army of Shadows creates empowered warriors with scaling necrotic abilities. Concentration limits total minion output, and the material cost (5,000 coins) adds resource pressure.

### Soul Harvest

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Very Hard TN | Medium | concentrate

*You open a dark conduit between yourself and the boundary of death. When any creature's life ebbs away nearby, you drink in the released soul energy — each death feeding your growing power.*

**Weak.** For a short duration while you concentrate, whenever a creature dies within medium range, you harvest its departing soul: regain 6 HP and gain +1 on your next spell roll. You can benefit from this effect up to 5 times per casting.
**Strong.** Regain 8 HP per death and gain +1 on your next spell roll. Additionally, each harvest grants you +2 temporary HP (stacking) that lasts for the duration.
**Critical.** Regain 10 HP per death and gain +2 on your next spell roll. Temporary HP per harvest increases to +4. Each harvest also extends the spell's duration by one round, potentially lasting beyond the initial short duration.

> **Design Note**: R5 siphoning capstone — the ultimate life drain. The harvest limit (5 times) and duration (short) are fixed on any success — SL scales HP recovered per death and adds secondary benefits (temp HP, duration extension). Concentration and the "per casting" cap prevent infinite scaling. Self-healing is the only arcane healing, maintaining the school's selfish identity.

### Eternal Servitude

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Very Hard TN | Close | ritual (1 hour), material cost (5,000 coins)

*You perform an elaborate ritual of binding over a suitable corpse, pouring necrotic energy and precious reagents into it. The dead rises not as a shambling thrall, but as a powerful, permanent servant — bound to your will for eternity.*

**Weak.** Animate one corpse as a permanent undead servant (Tier 4). The undead is loyal and follows your commands but has limited initiative — it cannot act independently or make complex decisions. It persists until destroyed.
**Strong.** As Weak. The undead has enhanced durability (+20 HP) and can follow complex standing orders and act semi-independently within those parameters.
**Critical.** As Strong. The undead also retains fragments of its former skills and knowledge. It can act independently within your broad directives and makes tactical decisions in combat.

> **Design Note**: R5 undeath capstone — permanent high-tier undead creation. The undead tier (Tier 4) is fixed on any success — SL scales durability and intelligence rather than raw power tier. The 1-hour ritual, 5,000-coin material cost, and single target prevent casual use. Only one instance at a time (recasting on a new corpse releases the previous servant). Culmination of the undeath chain: Animate Corpse (R1) → Animate Horde (R2) → Spectral Army (R3) → Death's Embrace (R4) → Eternal Servitude (R5).

### Ghostly Hand

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Close | —

*You extend a spectral hand from your own, a translucent claw of necrotic energy that grasps and manipulates at a distance.*

**Weak.** Manipulate one unattended object within close range as though you were touching it — open a latch, turn a page, pull a lever, pick up a small item. The hand is visible as a ghostly appendage.
**Strong.** As above. You can also deal +2 necrotic damage to a creature by grasping them briefly (vs. Dodge).
**Critical.** As above with +4 necrotic damage. The grasped creature is briefly slowed as necrotic cold seeps into them.

> **Design Note**: Fills R0 puppetry gap. Minor telekinetic manipulation through necromantic spectral hand — the puppetry theme at its simplest level. Core effect (object manipulation at range) is reliable on any success. SL adds damage and the slowed condition. Distinct from Telekinetics' Weak Telekinesis by using a visible necrotic hand rather than invisible force.

### Necrotic Plague

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Medium | concentrate

*You unleash a wave of necrotic corruption that rots flesh and weakens the body, spreading decay to all nearby enemies.*

**Weak.** All creatures in a medium area take +5 necrotic damage and are briefly weakened (suffer +1 bane on Strength and Agility rolls). The area becomes tainted — creatures that start their turn in the area take +2 necrotic damage.
**Strong.** Initial damage increases to +10. The weakened condition lasts for a short duration instead of briefly.
**Critical.** Initial damage increases to +15. Weakened for short duration. Tainted area damage increases to +4 per turn.

> **Design Note**: Fills R4 decay gap. AoE decay at half single-target scaling (+5/+10/+15 for R4 multi-target). Core effect (AoE necrotic damage, weakened, persistent area) is reliable on any success — SL scales damage and condition duration. Concentration limits other sustained effects.

### Entropy

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Long | concentrate

*You channel the fundamental force of entropy itself — the inevitable decay that claims all things. Everything within your target area begins to crumble, rust, rot, and fall apart as time accelerates toward ruin.*

**Weak.** All creatures in a medium area take +6 necrotic damage per turn for a short duration. All equipment worn by affected creatures must make a Durability check at the start of each turn. The area itself decays — wooden structures rot, stone cracks, metal rusts. Magical barriers lose 4 HP per turn.
**Strong.** Necrotic damage increases to +12 per turn. Equipment suffers +1 bane on Durability checks. Structures in the area take double structural damage.
**Critical.** Necrotic damage increases to +18 per turn. Equipment Durability checks automatically fail on the first turn. All ongoing magical effects in the area (barriers, enchantments, wards) are suppressed for the duration.

> **Design Note**: R5 decay capstone. AoE damage follows R5 scaling (+6/+12/+18). The anti-equipment and anti-structure effects represent ultimate entropy — everything decays. Core effect (per-turn necrotic damage, Durability checks, structural damage) is reliable on any success — SL scales damage and Durability check difficulty. Concentration limits other sustained effects. Distinct from Death's Dominion (R5 personal transformation) and Army of Shadows (R5 summons) as a pure environmental destruction spell.

### Soul Cage

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Medium | —

*You reach out with necrotic tendrils and tear at a creature's life essence, attempting to cage a portion of their soul within a spectral prison that feeds you power.*

**Weak.** Deal +10 necrotic damage. You siphon life force from the target, regaining HP equal to half the damage dealt. The target is briefly dazed as their soul partially separates.
**Strong.** Deal +20 necrotic damage with the same HP recovery (half damage dealt). The target is briefly stunned instead of dazed.
**Critical.** Deal +30 necrotic damage with the same HP recovery. The target is stunned for a short duration. For the remainder of the encounter, you deal +2 bonus necrotic damage against the targeted creature (soul link).

> **Design Note**: Fills R4 siphoning gap. Single-target damage at R4 scaling (+10/+20/+30) with life drain recovery. The self-healing is the siphoning gimmick — selfish arcane "healing" through exploitation. Dazed/stunned conditions are reliable on any success — SL scales from dazed to stunned and adds the soul link damage bonus at Critical.

### Marionette

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist | Medium | concentrate

*You lash spectral strings of necrotic energy to a creature's limbs, seizing control of their body like a puppet on strings. The target's eyes go vacant as you force them to move and act against their will.*

**Weak.** Take control of one creature's physical actions for a short duration (concentrate). On each of your turns, you can force the target to move up to their full movement and take one Action (attack, interact, etc.). The target is aware of what is happening but cannot resist physically. The target can attempt a Spirit + Fortitude check vs. TN 12 at the end of each of their turns to break free.
**Strong.** As above, and the target suffers +1 bane on their escape checks. You can also force the target to use abilities (but not cast spells).
**Critical.** As above with +2 banes on escape checks. The target takes +4 psychic damage at the start of each of their turns from the strain of puppetry.

> **Design Note**: Fills R3 puppetry gap. Body control through spectral strings — the quintessential puppetry spell. Core effect (full body control, short duration, escape check each turn) is reliable on any success — SL adds escape difficulty and psychic damage. Concentration means the caster must dedicate their focus to maintaining control. Distinct from Telepathy's mind control (which dominates will) — Necromancy's puppetry controls the body directly, leaving the mind aware but helpless.

### Possess Corpse

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Very Hard TN | Touch | concentrate

*You pour your consciousness into a corpse, animating it from within. Your original body falls inert as your awareness inhabits the dead flesh — you see through its eyes, move its limbs, and speak with its tongue.*

**Weak.** You possess a corpse for a short duration. Your body falls unconscious and is vulnerable. The corpse rises and acts on your initiative using your mental attributes (Mind, Spirit) but the corpse's physical attributes (Strength, Agility). You can cast spells through the corpse. If the corpse is destroyed, your consciousness returns to your body. You retain your skills and talents.
**Strong.** As above. The corpse gains +10 temporary HP and resistance to physical damage (reduce by 2) from necrotic reinforcement.
**Critical.** As above with +20 temporary HP and resistance to physical (reduce by 4). The corpse also gains +1 boon on Intimidation-related Influence checks (unnerving possessed dead).

> **Design Note**: Fills R4 puppetry gap. Body-hopping into a corpse — the ultimate puppetry expression. Core effect (consciousness transfer, short duration, corpse uses your Mind/Spirit) is reliable on any success — SL scales the corpse's durability. The vulnerability of the original body provides meaningful tactical risk. Concentration limits other sustained effects. Distinct from Shadowform (Twilight R5 incorporeal infiltration) — this is about using a dead body as a vessel, not becoming intangible.

### Desecration

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Very Hard TN | Medium | concentrate, material cost (5,000 coins)

*You pour overwhelming necrotic energy into the ground, corrupting the very earth. A zone of absolute defilement spreads outward — the soil blackens, plants wither, and the boundary between life and death thins to nothing within the defiled area.*

**Weak.** Create a desecrated zone in a medium area for a short duration. Within the zone: all healing effects are halved, undead creatures gain +2 to all rolls, living creatures suffer +1 bane on Fortitude rolls. Corpses within the zone spontaneously rise as Tier 1 undead under your control (maximum 4 at a time).
**Strong.** As above. Undead bonus increases to +3. Living creatures also take +4 necrotic damage at the start of each turn. You can raise up to 6 corpse-undead.
**Critical.** As above. Undead bonus increases to +4 and they gain +10 temporary HP. Living creature per-turn damage increases to +6. Corpse-undead raised are Tier 2 instead of Tier 1.

> **Design Note**: R5 defilement capstone. Zone of corruption that flips the battlefield in favor of undead. Core effect (healing halved, undead buffed, living debuffed, auto-raise corpses) is reliable on any success — SL scales bonuses and necrotic damage. Concentration and 5,000-coin material cost balance the massive zone effect. Combines with Army of Shadows (R5 summons) and Eternal Servitude (R5 permanent servant) to provide three distinct R5 capstone strategies: mass summon, elite permanent servant, or battlefield domination.

## Cross-School Spell Sharing

**No sharing recommended with Death tradition.**

Despite both schools dealing with death and the dead, Necromancy and Death have fundamentally opposed philosophies that should produce mechanically distinct spells:
- **Necromancy** (arcane): Transgressive defilement and exploitation — puppeting corpses, siphoning life force, violating the natural order for personal gain
- **Death** (mystic): Reverential acceptance of endings — honoring ancestors, guiding the dead, channeling the natural death cycle respectfully

Even spells with similar concepts (e.g., raising the dead) should function differently: Necromancy forcibly puppets corpses while Death calls willing ancestral spirits. Sharing spells between these schools would undermine their distinct identities.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Decay chain**: Enfeebling Grasp (R0) → Grasp of Decay/Ray of Lethargy (R1) → Shroud of Blight (R2) → Wither/Curse of Mortality (R3) → Necrotic Plague (R4) → Entropy (R5) — **complete R0-R5**
2. **Undeath chain**: Necromantic Sight (R0) → Animate Corpse/Control Undead (R1) → Animate Horde (R2) → Spectral Army/Negative Energy Flood (R3) → Death's Embrace (R4) → Army of Shadows/Eternal Servitude (R5) — **complete R0-R5**
3. **Siphoning chain**: Drain Life/Soul Drain (R0) → Death Bolt (R1) → Bone Shatter/Corpse Explosion (R2) → Reaper's Harvest (R3) → Soul Cage (R4) → Soul Harvest (R5) — **complete R0-R5**
4. **Defilement chain**: Life Echo (R0) → Necrotic Shield/Death Ward (R1) → Inflict Curse/Death Mark (R2) → Soul Prison (R3) → Finger of Death (R4) → Desecration (R5) — **complete R0-R5**
5. **Puppetry chain**: Ghostly Hand (R0) → Bone Armor (R1) → Soul Veil (R2) → Marionette (R3) → Possess Corpse (R4) → Eternal Servitude (R5) — **complete R0-R5**

### Setup + Payoff Combos
- ✅ **Slay → Corpse Explosion**: Defeat enemy → detonate corpse for AoE — the model gameplay loop
- ✅ **Death Mark → bonus damage**: Mark target → all subsequent attacks deal enhanced damage
- ✅ **Summon → Control**: Animate Corpse → Control Undead upgrades minion quality
- ✅ **Drain → Shield**: Life siphoning fuels Necrotic Shield self-protection
- ✅ **Kill → Soul Harvest**: Soul Harvest (R5) rewards the kill cycle with HP recovery and spell power — the ultimate siphoning payoff
- ✅ **Undeath chain capstones**: Army of Shadows (mass temporary summons) vs. Eternal Servitude (single permanent elite) provides meaningful R5 choice
- ✅ **Puppetry escalation**: Ghostly Hand (R0 spectral manipulation) → Bone Armor (R1 corpse defense) → Soul Veil (R2 soul concealment) → Marionette (R3 body control) → Possess Corpse (R4 consciousness transfer) → Eternal Servitude (R5 permanent servant) — complete puppetry fantasy from spectral hands to full body possession
- ✅ **Desecration + undead combo**: Desecration (R5 zone) + Army of Shadows/Eternal Servitude — desecrated zone buffs all undead while debuffing living enemies, the ultimate necromancer battlefield

### Design Completeness Checklist
- [x] R1 Quick Action: Death Ward (R1) — reactive protective ward

> **Review Note**: Death Ward should be evaluated for alignment with the standardized R1 reactive defense pattern (base +2 Dodge/Parry, school-specific secondary, no SL scaling).
- [x] Defensive options: Bone Armor (R1), Necrotic Shield (R1), Death Ward (R1) — strong triple coverage
- [x] Utility: Necromantic Sight (R0), Life Echo (R0), Soul Veil (R2)
- [x] Damage across ranks: R0-R5 fully covered — Soul Cage (R4 siphoning), Necrotic Plague (R4 AoE), Finger of Death (R4 burst), Entropy (R5 AoE), Army of Shadows (R5 summons)
- [x] Repeating conditions: Stunned, paralyzed, bleeding, poisoned, weakened, dazed, life drain — widest condition variety
- [x] Setup+payoff: Slay→corpse, mark→bonus, drain→shield, kill→Soul Harvest, Desecration+undead — best-in-class synergy loops
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 6, R1: 8, R2: 7, R3: 7, R4: 5, R5: 5)
- [x] **All trait×rank slots filled**: 30/30 coverage — all 5 trait chains complete R0-R5
