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
| moon | Night's Grasp | Moon Sphere, Lunar Weapon, Moonlight Ward | Moonbeam | Moonfire | Eclipse | Lunar Apotheosis |
| dreams | Whispers of Doubt | Whisper of Dreams | Terrors of the Dark | Nightmare Realm | Dreamwalking | Dream Realm |
| secrets | Dark Sight, Shadow Veil | Shadow Meld, Cloak of Night, Shadow Veil (QA) | Silent Night, Everlasting Night | Shadow Passage | Veil of Secrets | Shadowform |
| fate | Thread of Fate | Curse of Twilight | Fate's Web | Twist of Fate | Prophecy | Fate's Decree |
| illusion | Obscuring Veil | Haunting Shadows | Aura of Fear, Shadow Step, Twilight Bind | Shadow Clone | Embrace of Night | Phantom World |

**Coverage** (existing + proposed): 30/30 slots filled (100%) — all trait×rank gaps filled

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

> **Design Note**: R5 fate capstone. The core probability rewrite (one-step shift on all success levels) is fixed on any success — SL scales psychic damage/temp HP and adds secondary modifiers. Concentration limits other sustained effects. The "once per turn" limit on ally improvements prevents runaway stacking. Culmination of Thread of Fate (R0) → Fate's Web (R2) → Twist of Fate (R3) → Prophecy (R4) → Fate's Decree (R5).

### Lunar Apotheosis

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Self | Self | concentrate

*You draw upon the full power of the moon, becoming an avatar of lunar energy. Your skin turns silver, your eyes glow with cold white light, and moonbeams radiate from your form.*

**Weak.** For a short duration, you gain: your melee attacks deal an additional +4 frost damage, you emit bright light in close range (revealing invisible creatures), you gain resistance to psychic and frost damage (reduce by 4), and you can use a Quick Action each turn to fire a moonbeam at a target within medium range (vs. Dodge, +6 frost damage, target is briefly slowed).
**Strong.** All Weak benefits. Moonbeam damage increases to +12. You also gain +2 to all defenses (Parry, Dodge, Resist) from the lunar aura.
**Critical.** All Weak and Strong benefits. Moonbeam damage increases to +18. Creatures slowed by your moonbeam are also briefly blinded by the radiance.

> **Design Note**: Fills the R5 moon gap. Lunar transformation — duration is fixed at short on any success. SL scales moonbeam damage and adds secondary defenses/blinding. Distinct from Eclipse (R4 darkness zone) — Lunar Apotheosis is the LIGHT of the moon unleashed, while Eclipse blocks light. Completes the moon chain: Night's Grasp (R0) → Moon Sphere/Lunar Weapon (R1) → Moonbeam (R2) → Moonfire (R3) → Eclipse (R4) → **Lunar Apotheosis (R5)**.

### Dreamwalking

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist (willing: auto) | Long | ritual (10 minutes)

*You project your consciousness through the dream world, entering the dreams of a sleeping creature or sending messages across vast distances through the shared dreamscape.*

**Weak.** You enter the dream of one sleeping creature within long range. You can observe the dream and communicate with the dreamer for a short duration. The dreamer perceives you as a dream figure and can converse freely. Willing creatures accept your presence automatically; unwilling creatures can resist.
**Strong.** As above. You can also shape minor elements of the dream environment (create scenery, show images, replay memories) to communicate complex ideas. You gain +1 boon on Influence or Insight rolls made within the dream.
**Critical.** As Strong. You can also implant a suggestion in the dreamer's mind — a single course of action they feel compelled to consider (but not forced to obey) upon waking. The suggestion fades after a medium duration.

> **Design Note**: Fills the R4 dreams gap. Dream entry and communication are the core effect — reliable on any success. SL adds dream shaping and suggestion (not compulsion — the dreamer can freely reject). Ritual (10 minutes) prevents combat use. Builds: Whisper of Dreams (R1 sleep) → Terrors of the Dark (R2 nightmare) → Nightmare Realm (R3 group nightmare) → **Dreamwalking (R4 dream communication)** → Dream Realm (R5 shared dreamscape).

### Shadow Passage

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Hard TN (12) | Long | —

*You step into one shadow and emerge from another, traveling through the twilight realm that connects all darkness.*

**Weak.** You teleport from your current area of dim light or darkness to another area of dim light or darkness within long range that you can see or have visited before. You can bring one willing creature you are touching.
**Strong.** As above, and you can bring up to 3 willing creatures you are touching. Upon arrival, all transported creatures are briefly invisible (until they attack or cast a spell).
**Critical.** As Strong, and you can bring up to 5 willing creatures. Briefly invisible on arrival. You can also teleport to an area of shadow you have visited before, even if you cannot currently see it (within long range).

> **Design Note**: Fills the R3 secrets gap. Teleportation between shadows is the core effect — reliable on any success. SL adds passenger capacity and brief invisibility. Builds on Shadow Step (R2 short-range solo shadow teleport) with increased range and group transport. Builds: Shadow Meld (R1) → Shadow Step (R2) → **Shadow Passage (R3)** → Veil of Secrets (R4) → Shadowform (R5).

### Veil of Secrets

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Hard TN (14) | Medium | concentrate

*You weave a dense shroud of twilight magic over an area, concealing everything within from all forms of detection — sight, sound, scrying, and divination.*

**Weak.** A close area within medium range is shrouded in a veil of twilight for a short duration. Creatures and objects within the veil are invisible and inaudible to those outside. Divination and scrying magic cannot perceive anything within the veil. Creatures within the veil can see and hear each other normally.
**Strong.** As above. The veil also suppresses magical tracking — creatures within cannot be located by magical means. Allies inside gain +2 boons on Stealth rolls against creatures outside.
**Critical.** As Strong. The veil extends to a short area. You can also make the veil mobile, centered on yourself, moving with you for the duration.

> **Design Note**: Fills the R4 secrets gap. Area concealment from all detection is the core effect — reliable on any success. SL adds anti-tracking and expanded area/mobility. Utility-focused (Twilight excels at Utility). Distinct from Shadowform (R5 personal shadow transformation) — Veil of Secrets protects a group or location.

### Twist of Fate

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist (ally: auto) | Medium | —

*You seize the threads of fate and violently twist them, forcing fortune to shift in a single decisive moment.*

**Weak.** Choose one creature within medium range. After the target makes their next roll (within a short duration), you force them to reroll and take the new result. Enemy (vs. Resist): you choose which result they must use. Ally: they choose which result to keep. Deal +4 psychic damage to an enemy target from the disorienting wrench of fate.
**Strong.** Deal +8 psychic damage (enemy). As above, and the forced reroll imposes +1 bane (enemy) or grants +1 boon (ally).
**Critical.** Deal +12 psychic damage (enemy). As above, and the target is briefly dazed (enemy) or gains +2 temporary HP (ally) from fate's turbulence.

> **Design Note**: Fills the R3 fate gap. The forced reroll is the core effect — reliable on any success. SL scales damage to enemies and adds secondary bane/boon/daze. Damage follows control-primary scaling (+4/+8/+12). Builds: Thread of Fate (R0 glimpse) → Fate's Web (R2 boon/bane aura) → **Twist of Fate (R3 forced reroll)** → Prophecy (R4 vision) → Fate's Decree (R5 success level shift).

### Phantom World

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Long | concentrate

*You weave a grand illusion of such scope and complexity that it replaces reality itself for those within. The world around your targets shifts — walls move, terrain changes, companions become enemies, and enemies vanish.*

**Weak.** You create a grand illusion in a medium area within long range for a short duration. Within this area, you control what all creatures see, hear, and feel. You can create illusory terrain (walls, pits, fire), hide real features, and disguise creatures. Hostile creatures that interact with the illusion can roll Spirit + Perception vs. your Resist to see through it. While they believe the illusion, creatures treat illusory terrain and threats as real. Creatures that believe illusory hazards (fire, pits) take +6 psychic damage (ignoring AV) when "harmed" by them.
**Strong.** Psychic damage from illusory hazards increases to +12. As above, and creatures that fail to see through the illusion suffer +1 bane on all attacks against real targets (confused by false positions).
**Critical.** Psychic damage from illusory hazards increases to +18. As Strong, and you can perfectly disguise up to 4 allies as other creatures or make them appear invisible within the illusion.

> **Design Note**: R5 illusion capstone. Grand illusory environment is the core effect — reliable on any success. SL scales psychic damage from illusory hazards and adds secondary deception (attack bane, ally disguise). Distinct from Shadowform (R5 personal shadow transformation) — Phantom World reshapes the perceived battlefield. AoE psychic damage follows R5 scaling (+6/+12/+18). Concentration limits other sustained effects.

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
1. **Moon chain**: Night's Grasp (R0) → Moon Sphere/Lunar Weapon/Moonlight Ward (R1) → Moonbeam (R2) → Moonfire (R3) → Eclipse (R4) → Lunar Apotheosis (R5) — **complete R0-R5**
2. **Dreams chain**: Whispers of Doubt (R0) → Whisper of Dreams (R1) → Terrors of the Dark (R2) → Nightmare Realm (R3) → Dreamwalking (R4) → Dream Realm (R5) — **complete R0-R5**
3. **Secrets chain**: Dark Sight/Shadow Veil (R0) → Shadow Meld/Cloak of Night/Shadow Veil QA (R1) → Silent Night/Everlasting Night (R2) → Shadow Passage (R3) → Veil of Secrets (R4) → Shadowform (R5) — **complete R0-R5**
4. **Fate chain**: Thread of Fate (R0) → Curse of Twilight (R1) → Fate's Web (R2) → Twist of Fate (R3) → Prophecy (R4) → Fate's Decree (R5) — **complete R0-R5**
5. **Illusion chain**: Obscuring Veil (R0) → Haunting Shadows (R1) → Aura of Fear/Shadow Step/Twilight Bind (R2) → Shadow Clone (R3) → Embrace of Night (R4) → Phantom World (R5) — **complete R0-R5**

### Setup + Payoff Combos
- ✅ **Darkness → shadow advantage**: Create darkness with Everlasting Night/Eclipse → Twilight spells and Stealth benefit within shadow areas. Shadow Passage (R3) enables tactical repositioning through darkness zones. Eclipse (R4) is the ultimate darkness zone.
- ✅ **Fear → vulnerability**: Frightened targets (Aura of Fear, Haunting Shadows) are easier to hit and control
- ✅ **Fate → probability → decree**: Thread of Fate (R0 glimpse) → Fate's Web (R2 probability nudge) → Twist of Fate (R3 forced reroll) → Prophecy (R4 future vision) → Fate's Decree (R5 rewrite destiny) — clear five-step escalation chain
- ✅ **Dream → waking control**: Nightmare Realm (R3 nightmares in combat) → Dreamwalking (R4 dream communication/suggestion) → Dream Realm (R5 shared dreamscape) — dreams progress from combat terror to utility/social tool
- ✅ **Shadow → infiltration**: Shadow Meld (R1 invisibility) → Shadow Step (R2 short teleport) → Shadow Passage (R3 long group teleport) → Veil of Secrets (R4 area concealment) → Shadowform (R5 incorporeal form) — complete infiltration toolkit
- ✅ **Lunar → radiant offense**: Night's Grasp (R0 frost) → Moonbeam (R2 frost zone) → Moonfire (R3 radiant + reveal) → Eclipse (R4 frost zone + fear) → Lunar Apotheosis (R5 frost transformation + moonbeam attacks)

### Design Completeness Checklist
- [x] **R1 Quick Action**: Shadow Veil — standardized reactive defense (+2 Dodge/Parry, stealth boon secondary)
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 6, R1: 9, R2: 8, R3: 5, R4: 5, R5: 5)
- [x] Defensive options: Shadow Veil (R1 evasion), Moonlight Ward (R1 resistance), Veil of Secrets (R4 area concealment) — good coverage
- [x] Utility: Dark Sight (R0), Thread of Fate (R0), Shadow Meld (R1), Shadow Step (R2), Shadow Passage (R3), Dreamwalking (R4), Prophecy (R4), Veil of Secrets (R4), Shadowform (R5) — excellent utility suite (Twilight excels at Utility)
- [x] Damage across ranks: Night's Grasp (R0) → Moonbeam (R2) → Moonfire (R3) → Eclipse (R4) → Lunar Apotheosis/Phantom World (R5) — complete damage chain
- [x] Repeating conditions: Slowed, frightened, invisible, blinded, dazed — consistent shadow/fear/moon identity
- [x] Setup+payoff: Darkness → shadow advantage, Fate → probability escalation, Shadow → infiltration toolkit, Dream → combat-to-utility progression — all chains strong and explicit
- [x] R5 capstone diversity: Lunar Apotheosis (moon transformation), Dream Realm (shared dreamscape), Shadowform (incorporeal infiltration), Fate's Decree (probability rewrite), Phantom World (grand illusion) — five distinct tactical roles
- [x] **All trait×rank slots filled**: 30/30 coverage — no remaining gaps

### Impact & Trivialization Review
- **Thread of Fate (R0 divination)**: Low risk — GM-mediated, deliberately vague at weak success (one-word hint). Provides intuitive nudge, not a roadmap. Does not bypass investigation or decision-making.
- **Twist of Fate (R3 forced reroll)**: Moderate risk — forcing a reroll is powerful action economy manipulation. **Mitigations**: single target, one reroll per casting, vs. Resist for enemies, short duration window. The forced reroll is a gamble, not guaranteed — you might get a better result, or not.
- **Shadow Passage (R3 group teleport)**: Moderate risk — group teleportation could bypass obstacles. **Mitigations**: requires dim light/darkness at both ends, long range limit, needs line of sight or prior visit, no combat advantage beyond positioning. Extends Shadow Step logically.
- **Dreamwalking (R4 dream entry)**: Moderate risk — dream suggestion could shortcut social encounters. **Mitigations**: ritual (10 min) prevents combat use, suggestion is not compulsion (target can freely reject), only affects sleeping creatures, vs. Resist for unwilling targets. The suggestion is a nudge, not a command.
- **Veil of Secrets (R4 area concealment)**: Moderate risk — undetectable hiding zone is very strong for infiltration. **Mitigations**: concentration required, close area only (small zone), short duration, stationary by default (mobile only at Critical). Anti-divination is the niche — physical searchers can still walk into the area.
- **Lunar Apotheosis (R5 transformation)**: High risk — frost transformation with Quick Action moonbeam attacks is strong offense. **Mitigations**: concentration required, R5 Focus cost (10), short duration, moonbeam is vs. Dodge (can miss), frost damage has common resistances. The defense bonus only at Strong+ and blinding only at Critical prevent the spell from doing everything well at once.
- **Phantom World (R5 grand illusion)**: High risk — controlling what everyone perceives in a medium area is extremely powerful. **Mitigations**: concentration required, R5 Focus cost (10), creatures can save (Spirit + Perception vs. Resist) when interacting, psychic damage is the only real harm (no physical effects), short duration. Creatures that see through it are immune. The illusion replaces perception but doesn't create physical reality.
- **Prophecy (R4 divination)**: Moderate risk — extended future visions could shortcut planning. **Mitigations**: ritual (1 hour) prevents combat use, visions are symbolic and require interpretation, GM controls detail level, boon bonuses are modest (+1). Provides leads and preparation bonuses, not certainty.
- **Shadowform (R5 incorporeality)**: High risk — physical damage immunity and wall-passing is extremely powerful. **Mitigations**: concentration required, cannot cast spells or deal physical damage, brief/short duration only, R5 Focus cost (10). Cannot be used as an invincible combat form — it is an infiltration/escape tool.
- **Fate's Decree (R5 probability rewrite)**: Moderate risk — reducing enemy success levels is very strong. **Mitigations**: concentration required, single target, vs. Resist for enemies, ally benefits capped at once per turn. R5 Focus cost ensures this is a capstone investment.
- **Dream Realm (R5 accelerated rest)**: Moderate risk — accelerated rest could trivialize resource management. **Mitigations**: R5 Focus cost (10), concentration required, ritual (1 minute) setup, full rest in 1 hour only at Critical success.
