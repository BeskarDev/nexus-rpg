# Twilight — Spell School Design Space

## School Identity

**Tradition**: Twilight (Mystic)
**Traits**: moon, dreams, secrets, fate, illusion
**Identity**: Respectful balance and mystery — exploring boundaries between light and dark, waking and dreaming
**Role Spread**: Excels: Utility | Decent: Control, Support | Weak: Offense, Defense, Healing

### Mechanical Identity
- **Primary Conditions**: Slowed (cold/shadow), frightened (nightmares), invisible (shadow concealment)
- **Signature Gimmick**: Shadow manipulation and dream/fate mechanics — stealth, prophecy, fear from darkness
- **Damage Types**: Psychic, Frost

### Design Principles
1. Twilight excels at stealth, shadow manipulation, and divination
2. Fear and sleep effects are the primary control tools
3. Frost damage represents the cold of shadow and moonlight
4. **Gaps**: No R1 Quick Action reactive spell, weak defensive options, "fate" trait poorly covered
5. Dream and prophecy effects provide unique utility absent in other traditions

### Internal Synergies
- **Setup**: Create darkness/shadow area → **Payoff**: Twilight spells cast from within darkness gain benefits
- **Shadow clone → dual attack**: Create shadow duplicate for flanking/distraction
- **Dream → prophecy**: Dream-based spells reveal future information

## Current Spell Inventory (22 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 5 | Dark Sight, Night's Grasp, Obscuring Veil, Shadow Veil, Whispers of Doubt |
| 1 | 7 | Cloak of Night, Curse of Twilight, Haunting Shadows, Lunar Weapon, Moon Sphere, Shadow Meld, Whisper of Dreams |
| 2 | 7 | Aura of Fear, Everlasting Night, Moonbeam, Shadow Step, Silent Night, Terrors of the Dark, Twilight Bind |
| 3 | 2 | Nightmare Realm, Shadow Clone |
| 4 | 1 | Embrace of Night |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| moon | Night's Grasp | Moon Sphere, Lunar Weapon, Moonlight Ward | Moonbeam | Moonfire | Eclipse | — |
| dreams | Whispers of Doubt | Whisper of Dreams | Terrors of the Dark | Nightmare Realm | — | Dream Realm |
| secrets | Dark Sight, Shadow Veil | Shadow Meld, Cloak of Night, Shadow Veil (QA) | Silent Night, Everlasting Night | — | — | Shadowform |
| fate | Thread of Fate | Curse of Twilight | Fate's Web | — | Prophecy | Fate's Decree |
| illusion | Obscuring Veil | Haunting Shadows | Aura of Fear, Shadow Step, Twilight Bind | Shadow Clone | Embrace of Night | — |

**Coverage** (existing + proposed): 24/30 slots filled (80%) — strong across all ranks

**Remaining Gaps**:
- **Moon R5**: No capstone lunar spell
- **Dreams R4**: No R4 dream spell
- **Secrets R3-R4**: No mid/high-rank shadow manipulation
- **Fate R3**: Gap between R2 and R4
- **Illusion R5**: No capstone illusion spell

## Proposed New Spells

### Thread of Fate

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Easy TN | Self | —

*You briefly glimpse the threads of fate, gaining a flash of insight into the immediate future.*

**Weak.** Gain a vague sense of whether an action you're about to take will have a positive or negative outcome (GM provides a one-word hint: "favorable" or "unfavorable").
**Strong.** Gain a clearer sense — the GM provides a brief phrase describing the likely outcome.
**Critical.** Gain a clear vision of the immediate consequence. You gain +1 boon on your next roll related to the foreseen action.

> **Design Note**: Fills the R0 fate gap. Minor divination cantrip. The information is GM-mediated and deliberately vague at low success levels — it provides a nudge, not a roadmap. Does not bypass investigation or decision-making, merely adds intuitive guidance.

### Fate's Web

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Resist (ally: auto) | Close | enchant (short)

*You weave threads of fate around a creature, subtly influencing the probability of their near-future actions.*

**Weak.** Choose one ally or enemy within close range. Ally: they gain +1 boon on all rolls until the end of their next turn. Enemy (vs. Resist): they suffer +1 bane on all rolls until the end of their next turn.
**Strong.** As Weak. Additionally, ally gains +2 temporary HP or enemy takes +4 psychic damage from the strain of resisting fate.
**Critical.** As Strong, but the boon/bane increases to +2. Temporary HP increases to +4 or psychic damage to +8.

> **Design Note**: Fills R2 fate gap. Probability manipulation is the mechanical expression of fate magic. The boon/bane scope (all rolls until end of next turn) is fixed on any success — SL scales the bonus magnitude and adds secondary damage/temp HP. Reliable on any success, with escalating potency.

### Moonfire

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Dodge | Long | —

*You call down a beam of concentrated moonlight that sears your target with cold silver radiance.*

**Weak.** Deal +4 radiant damage. The target is revealed (glowing moonlight) for a short duration, preventing invisibility and granting +1 boon on attacks against them. The target is briefly slowed as moonlight weighs on them.
**Strong.** Deal +8 radiant damage. As above.
**Critical.** Deal +12 radiant damage. As above, and the revealing light dispels one active illusion or concealment effect on the target.

> **Design Note**: R3 moon offense. Reveal + slowed are reliable on any success. SL scales damage and adds dispel at Critical.

### Shadow Veil (Quick Action Reactive)

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Self | Self | quick

*You wrap yourself in a veil of shadow as an attack comes, making the attacker's aim uncertain.*

**Effect.** As a Quick Action when targeted by an attack, gain +2 to your Dodge or Parry against the triggering attack. You gain +1 boon on your next Stealth roll before the end of your next turn.

> **Design Note**: R1 Quick Action reactive defense. Standardized base (+2 Dodge/Parry) with Twilight's shadow stealth as secondary effect. No SL scaling — one reliable defensive reaction.

### Moonlight Ward

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Self or ally | Close | enchant (short)

*You weave moonlight into a shimmering ward around a creature, protecting against shadow and mental intrusion.*

**Weak.** Grant one creature +2 to Resist against fear and sleep effects for a short duration.
**Strong.** Also grant resistance to psychic and frost damage (reduce by 2) for the duration.
**Critical.** Resist bonus increases to +4. Resistance to psychic and frost increases to 4.

> **Design Note**: Defensive option for Twilight — protection against the tradition's own damage types and conditions.

### Dream Realm

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Close | concentrate, ritual (1 minute)

*You pull multiple creatures into a shared dreamscape — a twilight realm of your design where you control the environment.*

**Weak.** You and up to 4 willing or unconscious creatures enter a shared dream for a short duration. You control the environment of the dream. Unwilling creatures can resist. Within the dream, you can communicate and show visions.
**Strong.** As Weak. Within the dream, you can create a safe resting space (creatures can benefit from a short rest equivalent in 10 minutes of real time). You can also inflict nightmares on unwilling targets, dealing +6 psychic damage per turn.
**Critical.** As Strong. Willing creatures gain the benefits of a full rest in 1 hour of real time. Nightmare damage increases to +12 psychic per turn. You can reshape the dreamscape to reveal one secret the unwilling target knows (GM provides a brief, truthful answer to one question).

> **Design Note**: R5 capstone. Target count (up to 4) and duration (short) are fixed on any success — the shared dream is reliable. SL scales the dream's power: accelerated rest quality, psychic damage to unwilling targets, and information extraction. Concentration and ritual requirements balance the power.

### Eclipse

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Dodge | Medium | concentrate

*You call down the eclipse — the moon swallowing the sun. A sphere of absolute darkness and biting cold descends upon the battlefield.*

**Weak.** Create an area of magical darkness (short area, medium range) for a short duration. All light (including magical) is suppressed within the zone. Creatures inside take +5 frost damage at the start of each turn and are slowed. Creatures that start their turn in the zone must roll Spirit + Fortitude vs. TN 14 or become briefly frightened.
**Strong.** As above, and frost damage increases to +10 per turn.
**Critical.** As above, and frost damage increases to +15 per turn. Frightened creatures also suffer +1 bane on all rolls while frightened.

> **Design Note**: R4 darkness capstone. Darkness, slowed, frightened save, and light suppression are all reliable on any success. SL scales damage and adds secondary bane at Critical.

### Prophecy

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Medium TN | Self | ritual (1 hour)

*You enter a deep trance beneath the stars, opening your inner eye to the threads of fate. Visions of what may come appear as shifting symbols and scenes.*

**Weak.** You receive a symbolic vision about one future event you specify (a journey, a battle, a negotiation). The vision is metaphorical and requires interpretation — the GM provides a brief allegorical scene. You gain +1 boon on your next roll directly related to the foreseen event.
**Strong.** The vision is clearer — the GM provides a more detailed scene with recognizable elements. You gain +1 boon on your next two rolls related to the event. You can ask one clarifying question.
**Critical.** The vision is vivid and detailed. You gain +1 boon on all rolls related to the foreseen event for the next scene. You can ask two clarifying questions. You also sense whether the event is likely to occur within days, weeks, or months.

> **Design Note**: R4 fate trait capstone. Ritual (1 hour) prevents combat use. All information is GM-mediated and symbolic — provides leads and bonuses, never certainty. Builds on Thread of Fate (R0 one-action glimpse) → Prophecy (R4 extended vision).

### Shadowform

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Self | Self | concentrate

*You dissolve into living shadow — your body becomes darkness itself, flowing through cracks and passing through walls like ink through water.*

**Weak.** For a short duration, you transform into a shadow. You gain immunity to physical damage and can move through solid objects (walls, doors, floors) at your normal speed. While in shadow form, you can only deal psychic damage and cannot cast other spells. You emit no sound and are invisible in darkness.
**Strong.** All Weak benefits. You also gain resistance to all non-physical damage (reduce by 4). You can interact minimally with physical objects (turn a key, press a lever).
**Critical.** All Weak and Strong benefits. Resistance to non-physical damage increases to 6. You can briefly solidify once during the duration to make a single attack or cast a single spell, then return to shadow form.

> **Design Note**: R5 secrets/illusion capstone. Duration is fixed at short on any success — the transformation is reliable. SL scales secondary defenses (non-physical resistance) and unlocks utility (object interaction, solidify once). Concentration prevents other sustained spells. The inability to deal physical damage or cast spells (except once at Critical) prevents it from being a pure combat advantage.

### Fate's Decree

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist (ally: auto) | Medium | concentrate, enchant (short)

*You speak a decree of fate — words that reshape destiny itself. The threads of fortune bend to your pronouncement, cursing an enemy or blessing an ally.*

**Weak.** Choose one creature within medium range. Enemy (vs. Resist): all their success levels are reduced by one step for a short duration (critical → strong, strong → weak, weak → failure). Ally: all their success levels are improved by one step for a short duration (each improvement applies once per turn).
**Strong.** As Weak. Additionally, the enemy takes +8 psychic damage from the strain of fate twisting against them, or the ally gains +4 temporary HP from fate's favor.
**Critical.** As Weak. Enemy takes +16 psychic damage and suffers +1 bane on Resist checks for the duration. Ally gains +8 temporary HP and +1 boon on their next save.

> **Design Note**: R5 fate capstone. The core probability rewrite (one-step shift on all success levels) is fixed on any success — SL scales psychic damage/temp HP and adds secondary modifiers. Concentration limits other sustained effects. The "once per turn" limit on ally improvements prevents runaway stacking. Culmination of Thread of Fate (R0) → Fate's Web (R2) → Prophecy (R4) → Fate's Decree (R5).

## Cross-School Spell Sharing

Twilight's "illusion" trait overlaps significantly with the Arcane **Illusion** discipline. Both schools create false sensory information, shadow effects, and fear through deception. Twilight approaches illusion through moonlit mystery and respectful shadow manipulation, while Arcane Illusion uses transgressive trickery and false reality.

### Potential Sharing Candidates
- **Shadow Step** (Twilight R2) ↔ Illusion: Short-range shadow teleportation could exist in both schools — Twilight as moonlit shadow travel, Illusion as stepping between false realities. Strong sharing candidate if mechanics are identical.
- **Disguise Form** (Illusion R1) ↔ Twilight: Both schools deal in concealed identity. Twilight's Cloak of Night (R1) provides concealment through shadow; a shared disguise spell could work with identical mechanics and different flavor.
- **Aura of Fear** (Twilight R2) ↔ Illusion: Fear through shadow (Twilight) vs. fear through hallucination (Illusion). Mechanically similar effects — could share if targeting and damage are identical.

### Design Notes
- Cross-school sharing is **arcane ↔ mystic only** (never within the same category).
- Shared spells must be **mechanically identical** even if flavor differs.
- Twilight and Illusion have the strongest thematic overlap of any mystic-arcane pair — shadow, fear, and concealment appear in both. Sharing should be selective to preserve each school's distinct identity.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Moon chain**: Night's Grasp (R0) → Moon Sphere/Lunar Weapon/Moonlight Ward (R1) → Moonbeam (R2) → Moonfire (R3) → Eclipse (R4) → *gap at R5* — near-complete
2. **Dreams chain**: Whispers of Doubt (R0) → Whisper of Dreams (R1) → Terrors of the Dark (R2) → Nightmare Realm (R3) → *gap at R4* → Dream Realm (R5) — near-complete, R4 gap only
3. **Secrets chain**: Dark Sight/Shadow Veil (R0) → Shadow Meld/Cloak of Night/Shadow Veil QA (R1) → Silent Night/Everlasting Night (R2) → *gap at R3-R4* → Shadowform (R5) — strong ends, weak middle
4. **Fate chain**: Thread of Fate (R0) → Curse of Twilight (R1) → Fate's Web (R2) → *gap at R3* → Prophecy (R4) → Fate's Decree (R5) — near-complete, R3 gap only
5. **Illusion chain**: Obscuring Veil (R0) → Haunting Shadows (R1) → Aura of Fear/Shadow Step/Twilight Bind (R2) → Shadow Clone (R3) → Embrace of Night (R4) → *gap at R5* — near-complete

### Setup + Payoff Combos
- ✅ **Darkness → shadow advantage**: Create darkness with Everlasting Night/Eclipse → Twilight spells and Stealth benefit within shadow areas. Eclipse (R4) is the ultimate darkness zone.
- ✅ **Fear → vulnerability**: Frightened targets (Aura of Fear, Haunting Shadows) are easier to hit and control
- ✅ **Fate → probability → decree**: Thread of Fate (R0 glimpse) → Fate's Web (R2 probability nudge) → Prophecy (R4 future vision) → Fate's Decree (R5 rewrite destiny) — clear escalation chain
- ⚠️ **Dream → waking control**: Nightmare Realm (R3) creates nightmares and Dream Realm (R5) traps in dreams, but no mechanic connecting dream-state effects to waking targets

### Design Completeness Checklist
- [x] **R1 Quick Action**: Shadow Veil — standardized reactive defense (+2 Dodge/Parry, stealth boon secondary)
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 6, R1: 9, R2: 8, R3: 3, R4: 3, R5: 3)
- [x] Defensive options: Shadow Veil (R1 evasion), Moonlight Ward (R1 resistance) — good dual coverage
- [x] Utility: Dark Sight (R0), Thread of Fate (R0), Shadow Meld (R1), Shadow Step (R2), Prophecy (R4), Shadowform (R5)
- [x] Damage across ranks: Night's Grasp (R0) → Moonbeam (R2) → Moonfire (R3) → Eclipse (R4) — R1 and R5 damage gaps (Moon Sphere is utility, R5 spells are utility/control focused)
- [x] Repeating conditions: Slowed, frightened, invisible — consistent shadow/fear identity
- ⚠️ Setup+payoff: Darkness → advantage and Fate → probability chains are strong; dream → waking lacks explicit mechanical link
- ⚠️ **Remaining gaps**: Secrets R3-R4, Dreams R4, Moon R5, Illusion R5, R5 dedicated damage spell

### Impact & Trivialization Review
- **Thread of Fate (R0 divination)**: Low risk — GM-mediated, deliberately vague at weak success (one-word hint). Provides intuitive nudge, not a roadmap. Does not bypass investigation or decision-making.
- **Prophecy (R4 divination)**: Moderate risk — extended future visions could shortcut planning. **Mitigations**: ritual (1 hour) prevents combat use, visions are symbolic and require interpretation, GM controls detail level, boon bonuses are modest (+1). Provides leads and preparation bonuses, not certainty.
- **Shadowform (R5 incorporeality)**: High risk — physical damage immunity and wall-passing is extremely powerful. **Mitigations**: concentration required, cannot cast spells or deal physical damage, brief/short duration only, R5 Focus cost (10). Cannot be used as an invincible combat form — it is an infiltration/escape tool.
- **Fate's Decree (R5 probability rewrite)**: Moderate risk — reducing enemy success levels is very strong. **Mitigations**: concentration required, single target, vs. Resist for enemies, ally benefits capped at once per turn. R5 Focus cost ensures this is a capstone investment.
- **Dream Realm (R5 accelerated rest)**: Moderate risk — accelerated rest could trivialize resource management. **Mitigations**: R5 Focus cost (10), concentration required, ritual (1 minute) setup, full rest in 1 hour only at Critical success.
