# Death — Spell School Design Space

## School Identity

**Tradition**: Death (Mystic)
**Traits**: plagues, curses, fear, decay, ancestry
**Identity**: Natural ending and ancestral respect — accepting the necessity of endings and testing the worthy
**Role Spread**: Excels: Control | Decent: Offense, Utility | Weak: Healing, Support, Defense

### Mechanical Identity
- **Primary Conditions**: Poisoned, decayed (attribute reduction), cursed (ongoing penalties), frightened
- **Signature Gimmick**: Curse stacking and plague — multiple minor curses build toward major afflictions
- **Damage Types**: Necrotic, Poison, Acid

### Design Principles
1. Death is the mystic counterpart to Necromancy — focuses on curses/disease rather than undead
2. Fear effects provide battlefield control
3. Ancestral communion provides unique utility (speaking with the dead)
4. **Gaps**: No R1 Quick Action reactive spell, limited utility/non-combat, "plagues" and "curses" lack R0 representation
5. Damage is efficient but condition-focused — necrotic with ongoing effects

### Internal Synergies

Framework: `.claude/skills/spell-design/references/synergy-framework.md` — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Death emits: **curses** (lingering, named dooms hung on a target), *poisoned* (plague and sickness), *frightened* (a glimpse of one's own mortality), and **decay** (attribute erosion — the body failing ahead of its time). Death's setups are slow and inevitable rather than explosive: an afflicted target is not hurt yet, they are *dying by degrees*.

**Payoff levers** — Death harvests the afflicted: decay bites deeper into a *poisoned* body, an execution-weight spell lands hardest on a target already carrying a curse, and the frightened die faster in a school themed on accepting the end. Cold-cast deficit: Death's direct damage is deliberately mid-curve — the school is Control-first, and its damage only pulls ahead against a target it has already begun to unmake.

**Extenders** — *convert* is the signature: minor afflictions **stack toward a major one** (curse upon plague upon fear building to a final doom), *prolong* through curse durations that outlast the scene, and *refresh* via sickness that spreads and re-applies on contact (Cloud of Sickness holding a zone of contagion).

**Solo engine** (multi-turn): T1 Curse of Death (the doom is spoken) → T2 Rotting Grasp (*poisoned*, the flesh begins to fail) → T3 Early Grave against a target now cursed, poisoned, and shaken — the harvest of two turns of affliction. Gated by Resist rolls on every affliction, Focus, and the slow clock — the engine loses to burst damage in short fights, which is the intended trade.

**Party interlock**: **emits** *poisoned*, *frightened*, attribute decay — erosion currency (a Strength-decayed brute hits the whole party softer; a frightened enemy breaks formation for everyone). **wants** time and containment: someone must keep the dying target in the fight while the afflictions mature (a tank's lockdown, Telekinetics' hold, Peace's slow). Cross-player line: the martial pins the plague-bearer in melee while Death's curses ripen, and the ancestors collect on schedule.

**Synergy gaps**: the curse-stacking *convert* chain is the school's stated gimmick but has **no published mechanical rung** — nothing actually counts afflictions or defines the major doom they build toward; it lives only in this analysis. R2+ coverage is thin (2/2/0 above R1), so the engine has a start and no finish. Defining the affliction-harvest payoff at R3–R4 is the top design target.

**Seed coverage of the gaps**: the ripening extender (*Weight of Dooms*, R2), the affliction-harvest payoffs (*The Reckoning*, R3; *Inexorable Doom*, R5), and the shared-socket setups (*Grave Chill* and *Curse of Frailty*, R2) sit in the seed table below — the engine's missing rungs are the seed set's spine.

## Current Spell Inventory (15 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 5 | Chill Touch, Decay, Enfeebling Touch, Glimpse of Mortality, Spared from Death |
| 1 | 6 | Blood Shards, Curse of Death, Early Grave, Necrotic Weapon, Rotting Grasp, Shivering Ray |
| 2 | 2 | Circle of Death, Cloud of Sickness |
| 3 | 2 | Death's Door, Grave’s Bloom |
| 4 | 0 | — |
| 5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| plagues | Miasma | Festering Wound | Cloud of Sickness | Spreading Contagion | Pestilence | — (Pestilence Heighten) |
| curses | Minor Hex | Curse of Death | Curse of Frailty, Weight of Dooms | The Reckoning | — | Inexorable Doom |
| fear | Glimpse of Mortality | Early Grave, Shivering Ray | — | Death's Door | — | Pall of the Grave |
| decay | Decay, Chill Touch, Enfeebling Touch | Necrotic Weapon, Rotting Grasp, Blood Shards, Death's Rebuke | Circle of Death, Grave Chill | Grave's Bloom | — | — |
| ancestry | Spared from Death | Commune with Ancestors | Ancestral Guardian | Speak with Dead | — | Ancestral Convergence |

**Coverage**: only published spells count as real coverage (see the inventory above); other names are undesigned seeds (principle 19). Empty cells are deliberate, not oversights: the plagues R5 slot is covered by Pestilence's Heighten cascade, decay's top end lives inside the harvest payoffs (*The Reckoning*, *Inexorable Doom*) that consume decay afflictions, and fear is a support socket for the affliction engine rather than a full ladder of its own. R4 overall is the thinnest rank (one seed) and the next honest expansion target.


## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

For this school, "affliction" in a seed means any Death-inflicted state: *poisoned*, *frightened* by a Death spell, an active Death curse, or attribute decay. The signature gimmick is that these count and compound toward a harvest.

| Concept | Rank | Role | Seed |
|---|---|---|---|
| Miasma | 0 | Control / setup | A breath of grave-damp air briefly *poisons* one nearby creature with minimal damage (plagues). The at-will affliction tap: it opens the school's poisoned socket at R0 and stocks every affliction-counting payoff (*The Reckoning*, *Inexorable Doom*). |
| Minor Hex | 0 | Control / setup | A muttered petty curse inflicts +1 bane on the target's next roll (curses). Counts as a curse affliction while it lasts, so even the cantrip rung feeds the doom-harvest engine. |
| Death's Rebuke | 1 | Defense / standalone | Standardized R1 Quick Action reactive (principle 4): +2 Dodge or Parry against the triggering attack, plus a school secondary that returns a small pulse of necrotic damage through the wound (decay). Fills the mandatory reactive-defense slot. |
| Commune with Ancestors | 1 | Utility / standalone | Ritual trance seeking ancestral guidance (ancestry). Bounded per principle 29: ask about one problem, the GM answers with one of a fixed menu (a warning, a name or place, a symbolic omen when nothing concrete fits). Distinct from Necromancy's *Life Echo*, which pries a corpse's brain: this petitions willing spirits and needs no body. |
| Festering Wound | 1 | Offense / payoff | Curse an open wound so it corrupts (plagues): against a *bleeding* or Wounded target, lasting necrotic damage and *poisoned*. Cold-cast against an unhurt target it is a weak dart (cold-cast deficit). Spends the shared bleeding socket that martials and War priests emit, converting it into Death's own poisoned state. |
| Grave Chill | 2 | Control / setup | The cold of the grave settles into the marrow (decay): the target is *slowed* and their rolls to resist or end Death spells suffer +1 bane for a short duration. A defense-strip setup that itself counts as an affliction, making every following curse and plague stick harder. Distinct from *Shivering Ray* (R1 frost damage dart): this is a near-damageless affliction anchor. |
| Curse of Frailty | 2 | Control / setup | A curse that turns the body brittle (curses): AV reduction, vs. Resist, singular. Emits the shared stripped-AV socket the whole party spends, counts as a curse affliction for the harvest payoffs, and attacks a different defensive layer than *Curse of Death* (max HP and healing). |
| Weight of Dooms | 2 | Control / extender | The ripening rung of the signature gimmick (curses): touch one existing Death affliction on a target and deepen it — extend its duration a step or worsen its ongoing effect one notch, from a bounded per-affliction list. The convert-extender that keeps afflictions alive until a payoff consumes them. |
| Ancestral Guardian | 2 | Support / setup | An ancestral spirit wards one ally (ancestry): a small protective bonus, and the first enemy to strike the warded ally must resist or be briefly *frightened* by the risen shade. Support is a Weak role for Death, justified: ancestry is the tradition's sanctioned protective corner (heir to *Spared from Death*), and the fear rider still feeds the affliction engine. |
| Speak with Dead | 3 | Utility / standalone | Lay hands on a corpse and respectfully call its spirit back (ancestry). Bounded per principle 29: a set number of questions answered from what the dead knew in life, with a menu of answer types and a symbolic-response safety valve. Boundary with Necromancy: the arcane school interrogates remains by force, Death petitions, and the spirit may keep its secrets. |
| Spreading Contagion | 3 | Control / extender | The spread-extender for plagues: a virulent disease on one *poisoned* target leaps to enemies adjacent to them, carrying the poisoned state onward. Turns *Cloud of Sickness* or *Rotting Grasp* into a field-wide affliction engine against clusters. |
| The Reckoning | 3 | Offense / payoff | The affliction harvest (curses, decay): necrotic damage that starts below curve and rises per distinct Death affliction on the target, consuming them as it lands. Honest cold-cast deficit: near worthless unafflicted, devastating after two turns of setup with *Grave Chill* and *Curse of Frailty*. |
| Pestilence | 4 | Control / setup | A standing plague zone (plagues): medium area where living creatures are *poisoned* and cannot regain HP, flat rank-scaled zone damage per principle 44, concentrate. Mass affliction emission for the harvest payoffs. Its Heighten cascades to R5 (larger area, hotter tick), which is why the plagues line needs no separate R5 spell. |
| Inexorable Doom | 5 | Offense / payoff | The spoken death sentence, the gimmick's capstone (curses): consumes every Death affliction on one target for a doom scaled by their count, vs. Resist, tier-capped, material cost 5,000+. Damage stays on the R5 single-target chassis and is never an auto-kill — the peak of the harvest engine at mortal-pinnacle power. |
| Pall of the Grave | 5 | Control / setup | The dread of the realm of death settles over a long area (fear): living creatures must resist each turn or be *frightened*, and while frightened by the pall they count as afflicted for Death payoffs. Mass fear as mass setup — concentrate, save each turn, the R5-scale battery for the harvest engine. |
| Ancestral Convergence | 5 | Support / standalone | A solemn rite inviting honored ancestors to lend the living their strength (ancestry): modest bounded blessings on several allies, concentrate, material cost 5,000+. Support is a Weak role for Death, justified: this is the ancestry capstone and the school's clearest philosophical contrast to Necromancy — willing spirits empowering the living, never bound servants. |

## Cross-School Spell Sharing

**No sharing recommended with Necromancy discipline.**

Despite both schools dealing with death and the dead, Death and Necromancy have fundamentally opposed philosophies that should produce mechanically distinct spells:
- **Death** (mystic): Reverential acceptance of endings — honoring ancestors, guiding the dead, channeling the natural death cycle respectfully
- **Necromancy** (arcane): Transgressive defilement and exploitation — puppeting corpses, siphoning life force, violating the natural order for personal gain

Even spells with similar concepts (e.g., raising the dead) should function differently: Death calls willing ancestral spirits to serve while Necromancy forcibly puppets corpses. Sharing spells between these schools would undermine their distinct identities.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Plagues chain**: Miasma (R0) → Festering Wound (R1) → Cloud of Sickness (R2, published) → Spreading Contagion (R3) → Pestilence (R4, Heighten carries to R5) — complete via Heighten, no separate R5 spell needed
2. **Curses chain**: Minor Hex (R0) → Curse of Death (R1, published) → Curse of Frailty / Weight of Dooms (R2) → The Reckoning (R3) → Inexorable Doom (R5) — R4 slot deliberately open
3. **Fear chain**: Glimpse of Mortality (R0, published) → Early Grave / Shivering Ray (R1, published) → Death's Door (R3, published) → Pall of the Grave (R5) — R2/R4 open; fear is a support socket for the affliction engine, not a full ladder of its own
4. **Decay chain**: Decay / Chill Touch / Enfeebling Touch (R0, published) → Necrotic Weapon / Rotting Grasp / Blood Shards (R1, published) → Grave Chill / Circle of Death (R2) → Grave's Bloom (R3, published) — upper ranks open by design; decay's top end is harvested by The Reckoning and Inexorable Doom rather than escalating on its own
5. **Ancestry chain**: Spared from Death (R0, published) → Commune with Ancestors (R1) → Ancestral Guardian (R2) → Speak with Dead (R3) → Ancestral Convergence (R5) — R4 open

### Setup + Payoff Combos
- **The affliction engine (signature gimmick)**: setups Miasma / Minor Hex / Grave Chill / Curse of Frailty (plus published Rotting Grasp, Curse of Death, Grave's Bloom) → Weight of Dooms ripens and prolongs → The Reckoning (R3) or Inexorable Doom (R5) consume distinct afflictions for the harvest. This is the school's stated convert-chain, now with explicit rungs at every step.
- **Fear as affliction**: Glimpse of Mortality (R0, published) and Pall of the Grave (R5) make *frightened* count toward the harvest payoffs, tying the fear trait into the engine instead of running parallel to it.
- **Shared-socket giving**: Curse of Frailty strips AV for the whole party, Grave Chill emits *slowed*, and Festering Wound spends the *bleeding* socket allies emit — Death both gives and takes.
- **Plague spread**: Cloud of Sickness / Rotting Grasp (published, emit *poisoned*) → Spreading Contagion (R3, carries it across clusters) → Pestilence (R4, holds a whole zone poisoned for the payoffs).
- **Ancestry line**: Commune with Ancestors (R1) → Ancestral Guardian (R2) → Speak with Dead (R3) → Ancestral Convergence (R5) — the tradition's utility and support corner, deliberately outside the combat engine.

### Design Completeness Checklist
- [x] **R1 Quick Action**: Death's Rebuke seed — standardized reactive defense (+2 Dodge/Parry, necrotic secondary)
- [ ] **3 spells per rank minimum**: published + seeds gives R0: 7, R1: 9, R2: 6, R3: 5, R4: 1, R5: 3 — **R4 is not met** (Pestilence only) and is the next expansion target
- [x] Defensive options: Spared from Death (R0, published), Death's Rebuke (R1 seed), Ancestral Guardian (R2 seed) — minimal on purpose, Defense is a Weak role
- [x] Utility: Decay (R0, published), Commune with Ancestors (R1 seed), Speak with Dead (R3 seed)
- [x] Damage across ranks: R0–R3 published; R4–R5 via Pestilence's zone tick, The Reckoning, and Inexorable Doom — no dedicated R4 single-target nuke yet (accepted gap, see checklist item above)
- [x] Repeating conditions: poisoned, frightened, curses, attribute decay — the affliction set the whole school counts
- [x] Setup+payoff: the affliction engine has explicit setup, extender, and payoff rungs (see combos above), with cold-cast deficits stated on both payoffs
- [x] R5 capstone diversity: Inexorable Doom (harvest payoff), Pall of the Grave (mass setup), Ancestral Convergence (communal rite) — three distinct roles, no filler avatar
- [ ] **All trait×rank slots filled**: deliberately not — empty cells are honest gaps (see the coverage note under the matrix)

### Impact & Trivialization Review
- **Commune with Ancestors / Speak with Dead (R1/R3 info)**: Moderate risk of shortcutting investigation. **Mitigations**: ritual casting, bounded answer menus per principle 29, knowledge limited to what the dead knew, spirits may keep secrets.
- **Curse of Frailty (R2 AV strip)**: Low risk — modest, vs. Resist, singular, endable. Standard R2 debuff.
- **Weight of Dooms (R2 extender)**: Moderate risk — repeated casting could ripen afflictions indefinitely. **Mitigations at design time**: one deepen-step per affliction, bounded worsening list, Focus cost per cast, afflictions remain save-endable.
- **The Reckoning / Inexorable Doom (R3/R5 harvests)**: High risk of runaway scaling if afflictions are cheap to stack. **Mitigations at design time**: cap the counted afflictions (about four distinct types), consume them on hit so the engine resets, price base damage below curve (cold-cast deficit), tier cap and material cost at R5, never an auto-kill.
- **Pall of the Grave (R5 mass fear)**: High risk — battlefield-wide frightened. **Mitigations**: concentration, R5 Focus, save each turn, the affliction rider only feeds payoffs that still need their own casts.
- **Pestilence (R4 zone)**: Moderate risk — poisoned + no HP regain over an area. **Mitigations**: concentration, flat zone tick per principle 44, cleansable by Life magic, wind-vulnerable like Cloud of Sickness.
- **Ancestral Convergence (R5 party buff)**: Moderate risk — multi-ally enhancement. **Mitigations**: material cost 5,000+, concentration, modest bounded bonuses of one named bonus type so nothing stacks.
