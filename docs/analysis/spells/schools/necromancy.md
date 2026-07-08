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

Framework: [synergy-framework.md](../../../../.claude/skills/spell-design/references/synergy-framework.md) — roles (setup / payoff / extender), the two axes, and the shared socket set.

Necromancy runs a **partly private economy** — the framework's identity exception. Its central currency is **corpses and marks**, resources mostly only Necromancy itself can spend. That is deliberate: the defiler hoards the dead. It still trades in shared sockets at the edges (*bleeding*, *marked*, *stunned*).

**Setup levers** — states Necromancy emits: **corpses** (every kill on the field is banked ammunition), *marked* (Death Mark paints a target for exploitation), *bleeding* and **drained vitality** (attribute-sapping grasps), and **raised servants** (a zombie is both a summon and a stored corpse walking).

**Payoff levers** — Necromancy spends the dead: Corpse Explosion detonates banked bodies for AoE, Animate Corpse and Animate Horde convert them into action economy, Finger of Death turns its own killing blow into a fresh servant, and marked targets eat amplified follow-up. Cold-cast deficit is diegetic — on a corpseless battlefield the school's best tools are inert; its damage spells alone are on-curve, never above.

**Extenders** — *prolong* through persistence (a raised undead endures until destroyed, a night-rest ritual makes control permanent), *refresh* by feeding (each new kill restocks the corpse bank mid-fight), and *convert* (drained life → Necrotic Shield, a kill → a zombie: harm transformed into resource).

**Solo engine** (multi-turn): T1 Death Mark the wounded target → T2 Death Bolt spends the mark for the kill → T3 the corpse rises (Animate Corpse) or detonates (Corpse Explosion) into the survivors. Gated by Focus, concentration on the raised servant, an HP sacrifice for animation, and by the fiction — open corpse-puppetry horrifies onlookers and marks the caster as a defiler (principle 33).

**Party interlock**: **emits** *marked*, *bleeding*, *stunned/paralyzed*, plus minion bodies that block, flank, and soak — the undead are walls and extra hands the party's line leans on. **wants** kills (any ally's kill feeds the corpse bank — the fighter's cleave is Necromancy's supply line) and *restrained/prone* targets its slow drains can safely latch onto. Cross-player line: the fighter drops two raiders, and by the next turn both are standing again — on the party's side.

**Synergy gaps**: the corpse economy is the game's most complete synergy engine, but it is **all-or-nothing** — against constructs, spirits, or in corpse-poor fights the school loses its entire second axis. A non-corpse setup→payoff line (mark- or drain-based) at mid-rank would hedge it. Shared-socket output is also narrow; allies get bodies but few conditions.

**Synergy gap proposals** (sketches, post-framework — design fresh per current principles):
- **Harvest the Mark** (R2, payoff, mark-line) — collapse your Death Mark early: the marked creature takes necrotic damage scaled by how much harm they suffered while marked, and you regain a portion as HP. A corpse-free engine — mark, let the party beat on it, reap. Dead without a standing mark.
- **Siphoning Chain** (R3, extender/spread, drain-line) — your next drain spell leaps from its target to a second enemy in close range, carrying half its effect. Extends the drain engine sideways, works on constructs and spirits (life force loosely construed as animating essence — or explicitly limited to the living, GM-visible either way).
- **Rot the Living** (R3, setup, shared-socket) — a creature you have drained this scene starts *bleeding* and suffers +1 bane on Strength rolls as their vigor curdles. Converts the private drain economy into shared currency the martials can spend.

## Current Spell Inventory (28 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 5 | Drain Life, Enfeebling Grasp, Life Echo, Necromantic Sight, Soul Drain |
| 1 | 8 | Animate Corpse, Bone Armor, Control Undead, Death Bolt, Death Ward, Grasp of Decay, Necrotic Shield, Ray of Lethargy |
| 2 | 7 | Animate Horde, Bone Shatter, Corpse Explosion, Death Mark, Inflict Curse, Shroud of Blight, Soul Veil |
| 3 | 6 | Curse of Mortality, Negative Energy Flood, Reaper’s Harvest, Soul Prison, Spectral Army, Wither |
| 4 | 2 | Death’s Embrace, Finger of Death |
| 5 | 0 | — |

### Trait × Rank Coverage — Perfect ✅

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| decay | Enfeebling Grasp | Grasp of Decay, Ray of Lethargy | Shroud of Blight | Wither, Curse of Mortality | Necrotic Plague | Entropy |
| undeath | Necromantic Sight | Animate Corpse, Control Undead | Animate Horde | Spectral Army, Negative Energy Flood | Death's Embrace | Army of Shadows, Eternal Servitude |
| siphoning | Drain Life, Soul Drain | Death Bolt | Bone Shatter, Corpse Explosion | Reaper's Harvest | Soul Cage | Soul Harvest |
| defilement | Life Echo | Necrotic Shield, Death Ward | Inflict Curse, Death Mark | Soul Prison | Finger of Death | Desecration |
| puppetry | Ghostly Hand | Bone Armor | Soul Veil | Marionette | Possess Corpse | Eternal Servitude |

**Coverage**: all 30 trait×rank slots have at least a concept seed (published spell or proposed concept). Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).


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

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Seed |
|---|---|---|
| Army of Shadows | 5 | You channel massive necrotic energy into the ground, raising a host of spectral warriors from the realm of the dead. (R5 capstone — army summoning) |
| Soul Harvest | 5 | You open a dark conduit between yourself and the boundary of death. When any creature's life ebbs away nearby, you drink in the released soul energy — each death feeding your growing power. (R5 siphoning capstone — the ultimate life drain) |
| Eternal Servitude | 5 | You perform an elaborate ritual of binding over a suitable corpse, pouring necrotic energy and precious reagents into it. The dead rises not as a shambling thrall, but as a powerful, permanent servant — bound to your will for eternity. (R5 undeath capstone — permanent high-tier undead creation) |
| Ghostly Hand | 0 | You extend a spectral hand from your own, a translucent claw of necrotic energy that grasps and manipulates at a distance. (Fills R0 puppetry gap) |
| Necrotic Plague | 4 | You unleash a wave of necrotic corruption that rots flesh and weakens the body, spreading decay to all nearby enemies. (Fills R4 decay gap) |
| Entropy | 5 | You channel the fundamental force of entropy itself — the inevitable decay that claims all things. Everything within your target area begins to crumble, rust, rot, and fall apart as time accelerates toward ruin. (R5 decay capstone) |
| Soul Cage | 4 | You reach out with necrotic tendrils and tear at a creature's life essence, attempting to cage a portion of their soul within a spectral prison that feeds you power. (Fills R4 siphoning gap) |
| Marionette | 3 | You lash spectral strings of necrotic energy to a creature's limbs, seizing control of their body like a puppet on strings. The target's eyes go vacant as you force them to move and act against their will. (Fills R3 puppetry gap) |
| Possess Corpse | 4 | You pour your consciousness into a corpse, animating it from within. Your original body falls inert as your awareness inhabits the dead flesh — you see through its eyes, move its limbs, and speak with its tongue. (Fills R4 puppetry gap) |
| Desecration | 5 | You pour overwhelming necrotic energy into the ground, corrupting the very earth. A zone of absolute defilement spreads outward — the soil blackens, plants wither, and the boundary between life and death thins to nothing within the defiled area. (R5 defilement capstone) |

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
- [ ] **All trait×rank slots filled**: all 30 trait×rank slots seeded with concepts; published coverage is partial (see inventory) coverage — all 5 trait chains complete R0-R5
