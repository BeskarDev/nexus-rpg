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

Framework: `.claude/skills/spell-design/references/synergy-framework.md` — roles (setup / payoff / extender), the two axes, and the shared socket set.

Necromancy runs a **partly private economy** — the framework's identity exception. Its central currency is **corpses and marks**, resources mostly only Necromancy itself can spend. That is deliberate: the defiler hoards the dead. It still trades in shared sockets at the edges (*bleeding*, *marked*, *stunned*).

**Setup levers** — states Necromancy emits: **corpses** (every kill on the field is banked ammunition), *marked* (Death Mark paints a target for exploitation), *bleeding* and **drained vitality** (attribute-sapping grasps), and **raised servants** (a zombie is both a summon and a stored corpse walking).

**Payoff levers** — Necromancy spends the dead: Corpse Explosion detonates banked bodies for AoE, Animate Corpse and Animate Horde convert them into action economy, Finger of Death turns its own killing blow into a fresh servant, and marked targets eat amplified follow-up. Cold-cast deficit is diegetic — on a corpseless battlefield the school's best tools are inert; its damage spells alone are on-curve, never above.

**Extenders** — *prolong* through persistence (a raised undead endures until destroyed, a night-rest ritual makes control permanent), *refresh* by feeding (each new kill restocks the corpse bank mid-fight), and *convert* (drained life → Necrotic Shield, a kill → a zombie: harm transformed into resource).

**Solo engine** (multi-turn): T1 Death Mark the wounded target → T2 Death Bolt spends the mark for the kill → T3 the corpse rises (Animate Corpse) or detonates (Corpse Explosion) into the survivors. Gated by Focus, concentration on the raised servant, an HP sacrifice for animation, and by the fiction — open corpse-puppetry horrifies onlookers and marks the caster as a defiler (principle 33).

**Party interlock**: **emits** *marked*, *bleeding*, *stunned/paralyzed*, plus minion bodies that block, flank, and soak — the undead are walls and extra hands the party's line leans on. **wants** kills (any ally's kill feeds the corpse bank — the fighter's cleave is Necromancy's supply line) and *restrained/prone* targets its slow drains can safely latch onto. Cross-player line: the fighter drops two raiders, and by the next turn both are standing again — on the party's side.

**Synergy gaps**: the corpse economy is the game's most complete synergy engine, but it is **all-or-nothing** — against constructs, spirits, or in corpse-poor fights the school loses its entire second axis. A non-corpse setup→payoff line (mark- or drain-based) at mid-rank would hedge it. Shared-socket output is also narrow; allies get bodies but few conditions. The hedge line sits in the seed table below: *Harvest the Mark* (R2, mark payoff), *Siphoning Chain* (R3, drain extender), and *Rot the Living* (R3, shared-socket setup).

## Current Spell Inventory (31 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 5 | Drain Life, Enfeebling Grasp, Life Echo, Necromantic Sight, Soul Drain |
| 1 | 8 | Animate Corpse, Bone Armor, Control Undead, Death Bolt, Death Ward, Grasp of Decay, Necrotic Shield, Ray of Lethargy |
| 2 | 7 | Animate Horde, Bone Shatter, Corpse Explosion, Death Mark, Inflict Curse, Shroud of Blight, Soul Veil |
| 3 | 6 | Curse of Mortality, Negative Energy Flood, Reaper’s Harvest, Soul Prison, Spectral Army, Wither |
| 4 | 5 | Death’s Embrace, Finger of Death, Necrotic Plague, Possess Corpse, Soul Cage |
| 5 | 0 | — |

### Trait × Rank Coverage — Perfect ✅

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| decay | Enfeebling Grasp | Grasp of Decay, Ray of Lethargy | Shroud of Blight | Wither, Curse of Mortality, ✨ Rot the Living | Necrotic Plague | ✨ Entropy |
| undeath | Necromantic Sight | Animate Corpse, Control Undead | Animate Horde | Spectral Army, Negative Energy Flood | Death's Embrace | — (Spectral Army Heighten), ✨ Eternal Servitude |
| siphoning | Drain Life, Soul Drain | Death Bolt | Bone Shatter, Corpse Explosion | Reaper's Harvest, ✨ Siphoning Chain | Soul Cage | ✨ Soul Harvest |
| defilement | Life Echo | Necrotic Shield, Death Ward | Inflict Curse, Death Mark, ✨ Harvest the Mark | Soul Prison | Finger of Death | ✨ Desecration |
| puppetry | ✨ Ghostly Hand | Bone Armor | Soul Veil | ✨ Marionette | Possess Corpse | ✨ Eternal Servitude |

✨ = proposed new spell (undesigned seed)

**Coverage**: all 30 trait×rank slots hold a published spell, a seed, or a Heighten extension. Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).


## Proposed Spell Changes

### Corpse Explosion — Resolved (published 2026-07-10, multi-target scaling audit)

Reduced to +4/+8/+12 (Heighten R3 +5/+10/+15), the corpse-cost compromise between single-target and standard AoE scaling.

### Spectral Army — Heighten Extension

Per principle 3, the old "Army of Shadows" R5 seed was a bigger Spectral Army (R3, published) and is absorbed as a Heighten note instead: add **(Rank 4)** and **(Rank 5)** lines scaling the unit's warrior count, HP pool, and per-warrior damage. The R5 undeath capstone slot belongs to Eternal Servitude, which does something Spectral Army cannot (permanence).

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Role | Seed |
|---|---|---|---|
| Ghostly Hand | 0 | Utility / setup | A spectral claw that grasps only dead matter (puppetry trait): drag, lift, or position a corpse, bone, or grave-good within range. The corpse-logistics cantrip — moves banked bodies into place for Corpse Explosion and Animate Corpse without exposing the caster. Deliberately narrower than Telekinetics' Weak Telekinesis (dead matter only) to avoid cross-school collision. |
| Harvest the Mark | 2 | Offense / payoff | Collapse your Death Mark early (defilement and siphoning traits): the marked creature takes necrotic damage scaled by how much harm they suffered while marked, and you regain a portion as HP. The corpse-free engine — mark, let the party beat on it, reap. Dead without a standing mark. |
| Rot the Living | 3 | Control / setup | A creature you have drained this scene starts *bleeding* and suffers +1 bane on Strength rolls as their vigor curdles (decay trait). Converts the private drain economy (Drain Life, Enfeebling Grasp) into shared currency the martials can spend — the school's missing shared-socket output. |
| Siphoning Chain | 3 | Offense / extender | Your next drain spell leaps from its target to a second enemy in close range, carrying half its effect (siphoning trait). Extends the drain engine sideways and hedges the corpse economy — works in corpse-poor fights where the school's second axis is dead. Define at design time whether "life force" covers constructs and spirits. |
| Marionette | 3 | Control / setup | Necrotic strings seize a living creature's **body**, not their mind (puppetry trait, vs. Resist): force one action of movement or a single attack per turn while you concentrate; the target is aware and horrified throughout. The body-puppetry boundary keeps it off Telepathy's mind-control turf. Save-ends, tier-capped. |
| Soul Harvest | 5 | Offense / payoff | Open a conduit to the boundary of death (siphoning trait) for a short duration: each time a creature dies in close range, you drink the released essence — regain HP and a portion of Focus per death. The kill-cycle capstone: rewards the whole party's kills, on-curve nothing on a field where nothing dies. |
| Entropy | 5 | Offense / standalone | Accelerated ruin in an area (decay trait): creatures take necrotic damage as flesh withers, and worn or carried equipment must make Durability checks as metal rusts and leather rots. Mortal-pinnacle bounded — decay hastened, not time itself commanded; structures crumble over minutes, not instantly. |
| Eternal Servitude | 5 | Support / extender | Ritual binding over a suitable corpse with 5,000+ coin reagents (undeath and puppetry traits): raise a single permanent servant on the companion chassis, no concentration, one at a time. Permanence is the entire payoff (Spectral Army Heighten covers temporary mass). Worldbuilding note per principle 33: a deathless retainer is visible defilement — courts, temples, and mobs answer it. |
| Desecration | 5 | Support / extender | Corrupt the ground itself (defilement trait): a lasting zone where your undead gain a flat rider and resist destruction, living enemies suffer +1 bane on rolls to resist Necromancy, and natural healing fails. The undead economy's standing field — the necropolis in miniature. Ritual, singular, and consecration by rival priests is the in-world counterplay. |

## Cross-School Spell Sharing

**No sharing recommended with Death tradition.**

Despite both schools dealing with death and the dead, Necromancy and Death have fundamentally opposed philosophies that should produce mechanically distinct spells:
- **Necromancy** (arcane): Transgressive defilement and exploitation — puppeting corpses, siphoning life force, violating the natural order for personal gain
- **Death** (mystic): Reverential acceptance of endings — honoring ancestors, guiding the dead, channeling the natural death cycle respectfully

Even spells with similar concepts (e.g., raising the dead) should function differently: Necromancy forcibly puppets corpses while Death calls willing ancestral spirits. Sharing spells between these schools would undermine their distinct identities.

## Synergy & Completeness Assessment

### Spell Progression Chains
(✨ = undesigned seed)
1. **Decay chain**: Enfeebling Grasp (R0) → Grasp of Decay / Ray of Lethargy (R1) → Shroud of Blight (R2) → Wither / Curse of Mortality / ✨ Rot the Living (R3) → Necrotic Plague (R4) → ✨ Entropy (R5)
2. **Undeath chain**: Necromantic Sight (R0) → Animate Corpse / Control Undead (R1) → Animate Horde (R2) → Spectral Army / Negative Energy Flood (R3) → Death's Embrace (R4) → Spectral Army Heighten / ✨ Eternal Servitude (R5)
3. **Siphoning chain**: Drain Life / Soul Drain (R0) → Death Bolt (R1) → Bone Shatter / Corpse Explosion (R2) → Reaper's Harvest / ✨ Siphoning Chain (R3) → Soul Cage (R4) → ✨ Soul Harvest (R5)
4. **Defilement chain**: Life Echo (R0) → Necrotic Shield / Death Ward (R1) → Inflict Curse / Death Mark / ✨ Harvest the Mark (R2) → Soul Prison (R3) → Finger of Death (R4) → ✨ Desecration (R5)
5. **Puppetry chain**: ✨ Ghostly Hand (R0) → Bone Armor (R1) → Soul Veil (R2) → ✨ Marionette (R3) → Possess Corpse (R4) → ✨ Eternal Servitude (R5)

### Setup + Payoff Combos
(✨ = undesigned seed)
- ✅ **Slay → Corpse Explosion**: defeat enemy → detonate corpse for AoE — the model published loop; ✨ Ghostly Hand (R0) adds the logistics rung (drag the corpse into position)
- ✅ **Death Mark → amplified follow-up**: mark grants +1 boon and rider damage to everyone → ✨ Harvest the Mark (R2) adds the school's own collect, and Soul Cage (R4, published) escalates the mark line as the school's private duel engine
- ✅ **Kill → servant**: Finger of Death's killing blow raises the corpse — published convert
- ✅ **Drain → Shield**: life siphoning fuels Necrotic Shield — published convert
- ✨ **Drain → shared currency**: ✨ Rot the Living (R3) turns drained targets *bleeding* for the martials, ✨ Siphoning Chain (R3) spreads the drain — the corpse-free hedge, all seeds
- ✨ **Kill cycle capstone**: ✨ Soul Harvest (R5) pays HP and Focus per nearby death — the whole party's kills feed it
- ✨ **Standing field**: ✨ Desecration (R5) buffs the raised dead and curses the living inside it; with Animate Horde or Spectral Army it is the necromancer's battlefield

### Design Completeness Checklist
- [x] R1 Quick Action: Death Ward (R1, published) — reactive damage-halving ward

> **Review Note — RESOLVED (2026-07-10, P3 batch)**: Death Ward stays as-is by owner-approved verdict. Its identity (ally-targetable, post-hit damage halving paid in Fatigue) is mitigation, not evasion — the same school-flavored exemption granted to Tempest's Storm Shield. It fills the R1 reactive slot without the standard chassis.
- [x] Defensive options: Bone Armor (R1), Necrotic Shield (R1), Death Ward (R1) — strong triple coverage
- [x] Utility: Necromantic Sight (R0), Life Echo (R0), Soul Veil (R2), Possess Corpse (R4, published); ✨ Ghostly Hand extends the corpse-utility line at R0
- [x] Damage across ranks: R0–R4 published (Death Bolt, Corpse Explosion, Reaper's Harvest, Finger of Death, Necrotic Plague); R5 rests on ✨ Entropy and ✨ Soul Harvest
- [x] Repeating conditions: stunned, paralyzed, bleeding, life drain — widest condition variety
- [x] Setup+payoff: slay→corpse, mark→amplify, drain→shield published; the corpse-free hedge now has its R4 anchors (Soul Cage, Necrotic Plague, published 2026-07-13) — the R2–R3 rungs (Harvest the Mark, Rot the Living, Siphoning Chain) remain seeds
- [x] **3 published spells per rank through R3**: R0: 5, R1: 8, R2: 7, R3: 6; R4: 5 published (P4.5), R5: 0 needs the seeded capstone batch
- [x] **Trait × rank coverage**: all 30 slots hold a published spell, seed, or Heighten extension
