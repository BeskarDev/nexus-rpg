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

Framework: [synergy-framework.md](../../../../.claude/skills/spell-design/references/synergy-framework.md) — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Death emits: **curses** (lingering, named dooms hung on a target), *poisoned* (plague and sickness), *frightened* (a glimpse of one's own mortality), and **decay** (attribute erosion — the body failing ahead of its time). Death's setups are slow and inevitable rather than explosive: an afflicted target is not hurt yet, they are *dying by degrees*.

**Payoff levers** — Death harvests the afflicted: decay bites deeper into a *poisoned* body, an execution-weight spell lands hardest on a target already carrying a curse, and the frightened die faster in a school themed on accepting the end. Cold-cast deficit: Death's direct damage is deliberately mid-curve — the school is Control-first, and its damage only pulls ahead against a target it has already begun to unmake.

**Extenders** — *convert* is the signature: minor afflictions **stack toward a major one** (curse upon plague upon fear building to a final doom), *prolong* through curse durations that outlast the scene, and *refresh* via sickness that spreads and re-applies on contact (Cloud of Sickness holding a zone of contagion).

**Solo engine** (multi-turn): T1 Curse of Death (the doom is spoken) → T2 Rotting Grasp (*poisoned*, the flesh begins to fail) → T3 Early Grave against a target now cursed, poisoned, and shaken — the harvest of two turns of affliction. Gated by Resist rolls on every affliction, Focus, and the slow clock — the engine loses to burst damage in short fights, which is the intended trade.

**Party interlock**: **emits** *poisoned*, *frightened*, attribute decay — erosion currency (a Strength-decayed brute hits the whole party softer; a frightened enemy breaks formation for everyone). **wants** time and containment: someone must keep the dying target in the fight while the afflictions mature (a tank's lockdown, Telekinetics' hold, Peace's slow). Cross-player line: the martial pins the plague-bearer in melee while Death's curses ripen, and the ancestors collect on schedule.

**Synergy gaps**: the curse-stacking *convert* chain is the school's stated gimmick but has **no published mechanical rung** — nothing actually counts afflictions or defines the major doom they build toward; it lives only in this analysis. R2+ coverage is thin (2/2/0 above R1), so the engine has a start and no finish. Defining the affliction-harvest payoff at R3–R4 is the top design target.

**Synergy gap proposals** (sketches, post-framework — design fresh per current principles):
- **Weight of Dooms** (R2, extender/convert) — deepen an existing affliction: a target already *poisoned*, *frightened*, or cursed by you has that state's duration extended and suffers +1 bane on rolls to shake it. The ripening mechanic — nothing to deepen, nothing happens.
- **The Reckoning** (R3, payoff harvest) — speak the target's accumulated dooms aloud: necrotic damage per distinct affliction they carry (*poisoned*, *frightened*, bleeding, any curse), consuming your curses in the tally. The counting rung the gimmick has always implied — far below curve cold, the school's finisher when the dooms have ripened. Diegetic: the ancestors weigh what the target already owes.
- **Grave Chill** (R3, setup, shared-socket) — the target's limbs grow grave-cold: *slowed* for a short duration and their next roll to resist any Death spell suffers +1 bane. Feeds both the party (slowed is anyone's currency) and the school's own ladder.

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
| plagues | Miasma | Festering Wound | Cloud of Sickness | Spreading Contagion | Pestilence | Plague Wind |
| curses | Minor Hex | Curse of Death | Curse of Frailty | Mark of Doom | Greater Curse | Inexorable Doom |
| fear | Glimpse of Mortality | Early Grave, Shivering Ray | Dread Presence | Death's Door | Visage of the Reaper | Pall of the Grave |
| decay | Decay, Chill Touch, Enfeebling Touch | Necrotic Weapon, Rotting Grasp, Blood Shards | Circle of Death | Grave's Bloom | Wither | Death's Dominion |
| ancestry | Spared from Death | Commune with Ancestors | Ancestral Guardian | Speak with Dead | Ancestral Judgment | Ancestral Convergence |

**Coverage**: all 30 trait×rank slots have at least a concept seed (published spell or proposed concept). Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).


## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Seed |
|---|---|---|
| Miasma | 0 | You exhale a cloud of pestilent breath that sickens a nearby creature. (R0 plagues cantrip) |
| Minor Hex | 0 | You mutter a petty curse under your breath, bringing misfortune to a nearby creature. (R0 curses cantrip) |
| Death's Rebuke | 1 | When struck, you channel the cold touch of death back through the wound, punishing your attacker. (R1 Quick Action reactive defense) |
| Commune with Ancestors | 1 | You enter a meditative trance, reaching out to the spirits of the dead for guidance. (R1 utility spell — fills the ancestry R1+ gap) |
| Festering Wound | 1 | You curse an open wound on a creature, causing it to fester and spread corruption through their body. (R1 plagues spell) |
| Ancestral Guardian | 2 | You call upon an ancestral spirit to watch over and protect a creature, guiding their actions. (Fills R2 ancestry gap) |
| Speak with Dead | 3 | You lay your hand upon a corpse and call its spirit back briefly, asking it to share what it knew in life. (Fills R3 ancestry gap) |
| Spreading Contagion | 3 | You curse a creature with a virulent disease that leaps to nearby creatures. The contagion spreads like wildfire through clustered enemies. (R3 plagues payoff) |
| Plague Wind | 5 | You unleash a devastating wind carrying every pestilence and plague known to the mortal world. The wind sweeps across the battlefield, infecting all who breathe it. (R5 plagues capstone — mass plague devastation) |
| Greater Curse | 4 | You speak a terrible curse that reaches into the target's very essence, eroding their fundamental capabilities. (R4 curses capstone) |
| Pestilence | 4 | You call down a devastating plague upon an area, filling it with choking pestilence that rots flesh and weakens the body. (R4 plagues capstone) |
| Ancestral Judgment | 4 | You call upon the ancestors to judge a creature, channeling their collective wrath into a devastating spiritual assault. A host of spectral faces surrounds the target, screaming judgment. (R4 ancestry/offense capstone) |
| Death's Dominion | 5 | You open yourself as a conduit to the realm of endings, becoming an avatar of death itself. Your body transforms — skin pale as bone, eyes burning with necrotic fire, an aura of decay spreading from you like a living shroud. (R5 decay capstone — personal transformation into a death avatar) |
| Ancestral Convergence | 5 | You perform a solemn rite of convergence, inviting the honored dead to merge their power with the living. A host of ancestral spirits descends, each binding to an ally and granting them the strength and knowledge of the fallen. (R5 ancestry capstone — empowering the living through ancestral communion, not summoning an army) |
| Curse of Frailty | 2 | You whisper a curse that seeps into the target's bones, making their body fragile and vulnerable to harm. (Fills the R2 curses gap) |
| Mark of Doom | 3 | You speak a word of ending over your target, marking them with the sign of inevitable death. Dark runes appear on their skin, pulsing with each heartbeat. (Fills the R3 curses gap) |
| Inexorable Doom | 5 | You pronounce the ultimate curse — a death sentence spoken in the language of endings. The words hang in the air like a funeral bell's toll, and the target's very fate is rewritten. (R5 curses capstone — the culmination of the curse chain) |
| Dread Presence | 2 | You project an aura of mortal dread, forcing nearby creatures to confront their own mortality. Your eyes darken and the air grows cold around you. (Fills the R2 fear gap) |
| Visage of the Reaper | 4 | You project the face of death itself upon your visage — hollow eyes, skeletal features, the unmistakable countenance of the end. The target's soul recoils in primal terror. (Fills the R4 fear gap) |
| Pall of the Grave | 5 | You open a channel to the realm of death, and the dread of that place pours forth. A cold pall settles over the battlefield — the unmistakable chill of the grave. Every living creature feels the weight of their own mortality pressing down upon them. (R5 fear capstone) |
| Wither | 4 | You reach out and accelerate the decay within a living creature's body. Flesh withers, joints stiffen, and vitality drains away as the target ages decades in an instant. (Fills the R4 decay gap) |

## Cross-School Spell Sharing

**No sharing recommended with Necromancy discipline.**

Despite both schools dealing with death and the dead, Death and Necromancy have fundamentally opposed philosophies that should produce mechanically distinct spells:
- **Death** (mystic): Reverential acceptance of endings — honoring ancestors, guiding the dead, channeling the natural death cycle respectfully
- **Necromancy** (arcane): Transgressive defilement and exploitation — puppeting corpses, siphoning life force, violating the natural order for personal gain

Even spells with similar concepts (e.g., raising the dead) should function differently: Death calls willing ancestral spirits to serve while Necromancy forcibly puppets corpses. Sharing spells between these schools would undermine their distinct identities.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Plagues chain**: Miasma (R0) → Festering Wound (R1) → Cloud of Sickness (R2) → Spreading Contagion (R3) → Pestilence (R4) → Plague Wind (R5) — **complete R0-R5**
2. **Curses chain**: Minor Hex (R0) → Curse of Death (R1) → Curse of Frailty (R2) → Mark of Doom (R3) → Greater Curse (R4) → Inexorable Doom (R5) — **complete R0-R5**
3. **Fear chain**: Glimpse of Mortality (R0) → Early Grave/Shivering Ray (R1) → Dread Presence (R2) → Death's Door (R3) → Visage of the Reaper (R4) → Pall of the Grave (R5) — **complete R0-R5**
4. **Decay chain**: Decay/Chill Touch/Enfeebling Touch (R0) → Necrotic Weapon/Rotting Grasp/Blood Shards (R1) → Circle of Death (R2) → Grave's Bloom (R3) → Wither (R4) → Death's Dominion (R5) — **complete R0-R5**
5. **Ancestry chain**: Spared from Death (R0) → Commune with Ancestors (R1) → Ancestral Guardian (R2) → Speak with Dead (R3) → Ancestral Judgment (R4) → Ancestral Convergence (R5) — **complete R0-R5**

### Setup + Payoff Combos
- ✅ **Poison → Decay → Plague**: Miasma (R0 poison) → Festering Wound (R1 enhanced vs. poisoned) → Spreading Contagion (R3 spreading disease) → Pestilence (R4 AoE plague) → Plague Wind (R5 mass devastation) — the complete plague escalation
- ✅ **Curse stacking**: Minor Hex (R0 bane) → Curse of Death (R1 HP/healing) → Curse of Frailty (R2 AV reduction) → Mark of Doom (R3 damage vulnerability) → Greater Curse (R4 attribute drain) → Inexorable Doom (R5 all-in-one) — each curse targets a different defensive layer, compounding into devastating debilitation
- ✅ **Ancestry chain**: Commune with Ancestors (R1 information) → Ancestral Guardian (R2 protection) → Speak with Dead (R3 specific interrogation) → Ancestral Judgment (R4 offense) → Ancestral Convergence (R5 empowerment) — ancestors serve as advisors, protectors, witnesses, judges, and empowerers of the living
- ✅ **Fear → curse synergy**: Pall of the Grave (R5 mass fear) inflicts bonus necrotic damage when frightened creatures fail saves against other Death spells — combine with Curse of Frailty/Mark of Doom for devastating curse-fear combos
- ✅ **Death mastery**: Death's Dominion (R5 avatar transformation) + Pestilence (R4 AoE plague) — kill with plague, raise the dead, unstoppable capstone combo
- ✅ **Wither → Plague Wind**: Wither (R4 ongoing decay + halved healing) → Plague Wind (R5 mass poison + halved healing) — healing suppression stacks thematically across single-target and AoE

### Design Completeness Checklist
- [x] **R1 Quick Action**: Death's Rebuke — standardized reactive defense (+2 Dodge/Parry, necrotic damage secondary)
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 7, R1: 9, R2: 5, R3: 4, R4: 6, R5: 6)
- [x] Defensive options: Death's Rebuke (R1 retaliatory), Spared from Death (R0 death-prevention), Ancestral Guardian (R2 protective spirit)
- [x] Utility: Commune with Ancestors (R1 divination), Ancestral Guardian (R2 guidance)
- [x] Damage across ranks: R0-R5 fully covered — Wither/Visage of the Reaper/Ancestral Judgment at R4, Death's Dominion/Plague Wind/Pall of the Grave/Inexorable Doom at R5
- [x] Repeating conditions: Poisoned, frightened, cursed (bane/AV/vulnerability debuff), dazed, stunned, staggered — strong condition variety
- [x] Setup+payoff: Poison → decay, curse stacking (five ranks of escalating curses), fear → curse synergy via Pall of the Grave — all chains are strong and explicit
- [x] R5 capstone diversity: Death's Dominion (decay avatar), Plague Wind (mass plague), Ancestral Convergence (party empowerment), Inexorable Doom (ultimate curse), Pall of the Grave (mass fear) — five distinct tactical roles
- [ ] **All trait×rank slots filled**: all 30 trait×rank slots seeded with concepts; published coverage is partial (see inventory) coverage — all 5 trait chains complete R0-R5

### Impact & Trivialization Review
- **Curse of Frailty (R2 AV reduction)**: Low risk — -2 AV is meaningful but modest. **Mitigations**: vs. Resist save, single target, singular property, short duration. Standard debuff for R2 power level.
- **Mark of Doom (R3 damage vulnerability)**: Moderate risk — +2 damage from all sources compounds quickly with multi-hit attacks. **Mitigations**: vs. Resist save, single target, singular property, short duration. The +2 is flat and doesn't scale — appropriate for R3.
- **Dread Presence (R2 fear aura)**: Low risk — briefly frightened with modest necrotic damage. **Mitigations**: creatures save each turn, close range only (caster must be in danger), concentration can be broken. Similar to Twilight's Aura of Fear but with necrotic flavor.
- **Visage of the Reaper (R4 terror)**: Moderate risk — forced flee + stun is strong single-target shutdown. **Mitigations**: single target, tier limit (≤ Mysticism), vs. Resist save, stun only at Strong+. R4 power budget supports this.
- **Pall of the Grave (R5 mass fear)**: High risk — AoE frightened with bane on all rolls is devastating battlefield control. **Mitigations**: concentration required, R5 Focus cost (10), creatures save each turn, fear → curse synergy reward is limited (+4 damage per failed save). The bane is Death's signature — powerful but limited by R5 resource investment.
- **Wither (R4 decay)**: Moderate risk — +10/+20/+30 damage plus ongoing +4/turn and halved healing. **Mitigations**: single target, vs. Resist, short duration ongoing, healing suppression can be cleansed. Standard R4 damage output with thematic ongoing effects.
- **Inexorable Doom (R5 ultimate curse)**: Very high risk — combines HP reduction, AV reduction, healing block, and damage vulnerability in one package. **Mitigations**: material cost (5,000 coins), concentration, vs. Resist, short duration, single target, R5 Focus cost (10). The combined effect is the curse chain's capstone payoff — justified by enormous resource investment. Can be dispelled by removing the curse.
- **Greater Curse (R4 attribute reduction)**: High risk — reducing an attribute by one die size is a powerful debuff. **Mitigations**: vs. Resist save, single target, medium duration (not permanent), only one attribute affected. At R4 this is appropriate power — it requires significant Focus investment and can be dispelled.
- **Pestilence (R4 AoE plague)**: Moderate risk — AoE poison + healing block is very strong in combat. **Mitigations**: concentration required, short area, damage at half single-target scaling (+5/+10/+15). The healing block is Death's signature but can be cleansed by Life tradition magic.
- **Ancestral Judgment (R4 anti-undead)**: Low risk — single-target damage with condition. Mirrors Light's Blinding Radiance with necrotic flavor. Daze/stun are standard R4 conditions.
- **Death's Dominion (R5 avatar)**: High risk — immunity to necrotic/poison + auto-raising undead is very powerful. **Mitigations**: concentration (can be broken), brief/short duration, risen undead are temporary and low-tier, R5 Focus cost (10). The transformation is dramatic but time-limited — not a permanent state.
- **Ancestral Convergence (R5 empowerment)**: Moderate risk — buffing up to 4 allies with +2 attribute rolls and +2 AV is a powerful party-wide enhancement. **Mitigations**: material cost (5,000 coins), concentration required, short duration, spirit bonus type (doesn't stack with other spirit bonuses). The empowerment approach is thematically distinct from Necromancy's forced servitude.
- **Commune with Ancestors (R1 spirit guidance)**: Moderate risk — information from the dead could shortcut investigation scenes. **Mitigations**: ritual (10 min) prevents combat use, answers are GM-mediated and can be cryptic, limited to what the dead would know, only 1-2 questions per casting.
