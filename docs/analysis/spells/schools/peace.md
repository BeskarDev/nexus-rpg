# Peace — Spell School Design Space

## School Identity

**Tradition**: Peace (Mystic)
**Traits**: calmness, protection, selflessness, travel, law
**Identity**: Communal safety and lawful order — protecting the innocent, ensuring justice, enabling safe passage
**Role Spread**: Excels: Defense | Decent: Support, Healing | Weak: Offense, Control, Utility

### Mechanical Identity
- **Primary Conditions**: Dazed (pacification), charmed (calmed), protected (sanctuary)
- **Signature Gimmick**: Pacification and protection — preventing violence, redirecting harm, enforcing truth
- **Damage Types**: Physical (deterrent), Blast (concussive), Psychic (calming)

### Design Principles
1. Peace excels at defense and protection — sanctuary, barriers, damage sharing
2. Travel and law are core thematic pillars but completely absent from the current spell list
3. Damage should feel defensive/deterrent rather than aggressive
4. **Critical gaps**: "Travel" and "law" traits have zero spells at ANY rank
5. Peace is undersized (13 spells) — needs significant expansion

### Internal Synergies
- **Calm → Truth**: Pacify target → calmed targets more susceptible to truth-telling
- **Protect → Sustain**: Blessing of Peace → protected allies who don't attack gain enhanced healing
- **Sanctuary chain**: Aura of Sanctuary (R0) → Dome of Sanctuary (R2) → Sanctuary Sphere (R5)

## Current Spell Inventory (13 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Aura of Sanctuary, Calming Influence, Tranquil Mind |
| 1 | 4 | Blessing of Peace, Harmonic Link, Pacifying Weapon, Share Harm |
| 2 | 3 | Dome of Sanctuary, Slow, Spell-breaking Wave |
| 3 | 3 | Anti-Magic Field, Martyrdom's Blessing, Pacifying Presence |
| 4–5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| calmness | Calming Influence, Tranquil Mind | Pacifying Weapon | Slow | Pacifying Presence | — | — |
| protection | Aura of Sanctuary | Blessing of Peace, Share Harm | Dome of Sanctuary, Spell-breaking Wave | Anti-Magic Field | — | — |
| selflessness | — | Harmonic Link | — | Martyrdom's Blessing | — | — |
| travel | ❌ **GAP** | — | — | — | — | — |
| law | ❌ **GAP** | — | — | — | — | — |

**Coverage**: 10/30 slots filled (33%) — undersized school with two traits completely absent

**Critical Gaps**:
- **Travel**: Zero spells at ANY rank — a defining thematic pillar with no mechanical representation
- **Law**: Zero spells at ANY rank — justice and oath enforcement entirely missing
- **Selflessness R0, R2**: Gaps in the self-sacrifice theme
- **All traits R4-R5**: Zero spells — Peace has no high-rank options at all
- **Calmness/Protection R4+**: Even the strongest traits lack high-level evolution

## Proposed New Spells

### Absorb Harm

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Ally | Close | quick

*You extend a hand toward an ally under attack, absorbing a portion of their pain into yourself.*

**Effect.** As a Quick Action when targeted by an attack, gain +2 to your Dodge or Parry against the triggering attack. You can cast this spell on an ally within close range instead of yourself.

> **Design Note**: R1 Quick Action reactive defense. Standardized base (+2 Dodge/Parry) with Peace's selfless ally-targeting as secondary effect. No SL scaling — one reliable defensive reaction.

### Wayfinder's Mark

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Easy TN | Close | —

*You leave a faintly glowing mark on the ground or a surface, guiding travelers along the right path.*

**Weak.** Mark a surface visible only to you and designated allies for a medium duration. The mark provides a directional arrow visible in darkness. Allies who follow the marks gain +1 boon on navigation checks.
**Strong.** As Weak. The marks also pulse faintly to warn of nearby hazards (traps, unstable ground), granting +1 boon on Perception checks to detect dangers within close range.
**Critical.** As Strong. Marks also indicate the safest route — allies following them ignore natural difficult terrain (mud, underbrush) in the marked path.

> **Design Note**: Fills the R0 travel gap. Pure utility cantrip for exploration. Duration (medium) and navigation boon are fixed on any success — SL adds secondary benefits (hazard warning, terrain ignore) rather than extending duration.

### Binding Word

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Resist | Close | —

*You speak a word of divine authority, compelling a creature to speak truthfully for a single statement.*

**Weak.** The target must speak truthfully for their next two statements, or remain silent. They are aware of the compulsion and can choose silence.
**Strong.** As Weak. If the target attempts to lie, they visibly struggle and others notice the deception (+1 boon to observers' Insight checks to read the target).
**Critical.** As Strong. The target also feels a strong divine compulsion to answer rather than stay silent — they must succeed on a Spirit + Fortitude check (vs. your casting result) to choose silence over truthful speech.

> **Design Note**: Fills the R0 law gap. Cantrip-level truth compulsion with intentional limits. Statement count (two) is fixed on any success — SL adds secondary detection benefits and override pressure rather than more statements. Does not replace social skill checks — merely compels truthfulness if the target speaks.

### Swift Journey

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Allies | Close | enchant (medium)

*You bless a group of travelers with divine swiftness, easing their journey.*

**Weak.** Up to 4 creatures gain +1 movement for a medium duration. They ignore difficult terrain caused by natural conditions (mud, underbrush, rocky ground).
**Strong.** Movement bonus increases to +2. The group also does not leave tracks and cannot be tracked by mundane means.
**Critical.** Movement bonus +2. Trackless travel. The group also gains +1 boon on Fortitude checks against travel fatigue and exhaustion.

> **Design Note**: R1 travel spell. Provides mechanical benefit to overland travel without bypassing it. Bonuses apply to checks and movement, not automatic success. The party still needs to make camp, forage, and navigate — the spell makes these activities less taxing, not trivial. Trackless travel is a defensive feature against pursuit, not exploration bypass.

### Safe Passage

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Allies | Close | ritual (10 minutes), enchant (long)

*You invoke divine protection for a journey, warding travelers against the hazards of the road.*

**Weak.** Up to 6 creatures gain +1 boon on Survival and Perception checks related to travel hazards (weather, terrain, ambush detection) for a long duration.
**Strong.** The boon increases to +2 for weather and terrain hazards. The group's travel speed increases by 25% for the duration.
**Critical.** +2 boon on all travel-related checks. Travel speed increases by 50%. The group cannot become lost in natural terrain for the duration (though magical misdirection still works).

> **Design Note**: Fills R3 travel gap. Ritual requirement prevents combat use. Provides significant overland travel utility appropriate for R3. The "cannot become lost" effect at Critical only applies to natural terrain and is defeated by magic — it doesn't bypass adventure design, it smooths mundane navigation. Compare this to Nature's Passage (Nature R2) which handles terrain traversal.

### Righteous Verdict

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Medium | —

*You pronounce divine judgement upon a creature, and the cosmos answers. The weight of their transgressions bears down upon them.*

**Weak.** One creature that has committed a harmful act this scene (attacked, lied, broke an oath) takes +5 psychic damage and is dazed for a short duration by the weight of judgement.
**Strong.** Deal +10 psychic damage. The target is dazed for a short duration and suffers +1 bane on all actions.
**Critical.** Deal +15 psychic damage. The target is dazed for a short duration, suffers +2 banes on all actions, and cannot willingly lie for the duration.

> **Design Note**: Fills R4 law gap. Requires the target to have committed a harmful act this scene — cannot be used preemptively. The daze (short duration) is fixed on any success — SL scales damage and adds secondary penalties (banes, truth compulsion). Peace's damage should feel like divine consequence, not aggression.

### Binding Oath

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Resist (willing) | Close | ritual (10 minutes)

*You invoke divine law to seal an oath between two or more willing parties. Breaking the oath carries supernatural consequences.*

**Weak.** Up to 2 willing creatures swear an oath that lasts for a week. If either party breaks the oath, they suffer 3 levels of fatigue that cannot be removed until they atone (GM discretion), and the oath-breaker is marked with a visible divine brand (obvious to all who see them) for the duration.
**Strong.** As Weak. The fatigue from breaking the oath increases to 4 levels. The oath-breaker also suffers +1 bane on all social interactions until atonement.
**Critical.** As Strong. The oath-breaker additionally suffers +2 banes on all social interactions. Other creatures instinctively sense the weight of the broken oath — NPCs are predisposed to distrust the oath-breaker.

> **Design Note**: R2 law spell — supernatural oath enforcement. Oath duration (week) and core consequences (fatigue + brand) are fixed on any success — SL scales the severity of oath-breaking penalties. Requires willing participants, preventing hostile use.

### Sanctuary Sphere

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Allies | Close | concentrate

*You create a shimmering dome of divine peace that shields all within from harm and hostility.*

**Weak.** Create a dome in close range lasting a short duration. All allies within gain +4 AV (situational bonus). Hostile creatures must succeed on a Spirit + Fortitude check (vs. your casting result) to enter the dome or attack creatures within it. Hostile creatures that fail the check are briefly dazed by the calming aura.
**Strong.** AV bonus increases to +6. Hostile creatures that fail the check are also pushed out of the dome.
**Critical.** AV bonus +6. Failed hostile creatures are dazed and pushed out. Allies within the dome regain +2 HP at the start of each of their turns.

> **Design Note**: R5 capstone — ultimate sanctuary. Duration (short) and the core dome + hostility check are fixed on any success — SL scales AV bonus and adds secondary effects (push, regeneration). Concentration can be broken.

### Diplomatic Immunity

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Ally or Self | Close | enchant (medium)

*You invoke the divine right of the peacekeeper, surrounding a creature with an aura of inviolable sanctity. Those who have not been wronged by the protected creature find themselves unable to raise a hand against them.*

**Weak.** For a medium duration, the target cannot be attacked by creatures they have not attacked first. A hostile creature can attempt to override this protection (Spirit + Fortitude vs. your casting result). If they succeed, the protection against that creature ends. If they fail, they are briefly dazed by divine rebuke.
**Strong.** Hostile creatures that fail the override check are dazed for a short duration and take +5 psychic damage from the divine rebuke.
**Critical.** Hostile creatures that fail take +10 psychic damage and are dazed for a short duration. The protected creature also gains +2 AV (situational bonus) for the duration against any creature that successfully overrides the protection.

> **Design Note**: R4 protection/law capstone — divine diplomatic immunity. The override mechanic (vs. Resist) prevents it from being absolute — determined enemies can break through, but pay a cost for doing so. Requires the protected creature to refrain from violence to maintain full effect.

### Pilgrim's Gate

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Allies | Close | ritual (1 hour), material cost (200 coins)

*You consecrate a doorway, archway, or natural passage with divine travel magic. Golden light fills the threshold, and those who step through emerge at a distant destination you have previously consecrated with a matching gate.*

**Weak.** Create a one-way portal between your current location and a destination you have previously marked with a Wayfinder's Mark (R0) within the same region (roughly 100 miles). Up to 8 creatures can pass through the gate within 1 minute. The gate then closes.
**Strong.** As Weak. The gate remains open for 10 minutes, allowing more creatures and cargo to pass through. Creatures passing through arrive refreshed — remove 1 level of fatigue.
**Critical.** As Strong. The gate can reach any Wayfinder's Mark you have placed, regardless of distance (but still on the same plane). Creatures passing through remove 2 levels of fatigue.

> **Design Note**: R4 travel capstone — replaces the previously proposed "Pilgrimage" (which was essentially "bigger Safe Passage"). Pilgrim's Gate introduces a genuinely new concept: portal-based travel between consecrated locations. Synergizes explicitly with Wayfinder's Mark (R0): low-rank marks gain strategic value when combined with high-rank travel magic. Ritual (1 hour) + material cost prevent casual use. This is the capstone of the travel chain: Wayfinder's Mark (R0 marks) → Swift Journey (R1 speed buff) → Safe Passage (R3 hazard protection) → Pilgrim's Gate (R4 teleportation). If a simpler power increase is desired, use Safe Passage with heightened Focus instead.

### Edict of Peace

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Medium | concentrate

*You speak with the voice of divine law, and the command resonates through every creature's soul — "CEASE." Weapons lower, fists unclench, and a profound stillness descends. Those who defy the edict suffer the cosmos's wrath.*

**Weak.** All creatures in a medium area must save (Spirit + Fortitude vs. your casting result) or cease all hostilities for a short duration. Affected creatures cannot attack, cast harmful spells, or take hostile actions. A creature that attacks while under the edict takes +12 psychic backlash damage (no save) and the effect on them ends.
**Strong.** Psychic backlash increases to +16 damage. Creatures that fail the save also feel compelled to lower their weapons (drop held weapons unless they succeed on a second save).
**Critical.** Backlash +20 damage. Weapons dropped. Affected creatures also cannot willingly lie for the duration. Creatures that break the edict are branded with a visible divine mark for a long duration (others instinctively distrust them).

> **Design Note**: R5 calmness/law ultimate capstone — forced ceasefire. Duration (short) is fixed on any success — the ceasefire is reliable. SL scales backlash damage and adds secondary consequences (weapon drop, truth compulsion, brand). Concentration means the caster must maintain focus.

### Sacred Covenant

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Area | Close | ritual (1 hour), material cost (5,000 coins)

*You perform an elaborate consecration ritual, inscribing divine law into the very stone and air of a location. The space shimmers with faint golden light, and all who enter feel the weight of cosmic truth pressing upon their tongues and hearts.*

**Weak.** Create a permanent divine law zone in a fixed location (temple, hall of justice, throne room) up to a close area. Within the zone: deliberate lies cause the speaker +4 psychic damage (they feel the pain before completing the lie), oaths sworn within are supernaturally binding (breaking them inflicts fatigue as per Binding Oath R2), and creatures that initiate violence must save (vs. your casting result) or be dazed for a short duration.
**Strong.** Lie-detection damage increases to +6. Oath-breaking consequences are enhanced (as per Binding Oath Critical effect). The zone also reveals hidden weapons (glow faintly to all observers).
**Critical.** Lie-detection damage +8. Enhanced oaths. Hidden weapons and concealed hostile magic are revealed. Creatures that initiate violence are dazed for a short duration and prone.

> **Design Note**: R5 law ultimate — permanent consecrated ground. The core zone effects (lie pain, binding oaths, violence suppression with short daze) are fixed on any success — SL scales damage numbers and adds secondary detection (hidden weapons, hostile magic). Ritual (1 hour) + material cost (5,000 coins) + fixed location prevent battlefield use. This is a worldbuilding spell.

## Cross-School Spell Sharing

Peace does not currently share spells with any arcane discipline.

**Concept Overlaps** (not shared, but thematically adjacent):
- **Tranquil Mind** (Peace R0) overlaps with **Mental Shield** (Telepathy, Arcane) — both protect against mental intrusion. Peace protects through divine calm; Telepathy protects through mental fortification. Different mechanics and flavor, same tactical niche.
- **Dome of Sanctuary** (Peace R2) overlaps with defensive conjuration effects — both create protective barriers, but Peace's barrier discourages violence while Conjuration's barriers physically block.

> **Design Note**: Peace's protective magic is thematically distinct from arcane defense (divine calm vs. mental/physical force). No spells are currently shared, but Mental Shield represents the closest overlap — future design could consider a shared "mental protection" spell if mechanics align.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Calmness chain**: Calming Influence/Tranquil Mind (R0) → Pacifying Weapon (R1) → Slow (R2) → Pacifying Presence (R3) → *gap at R4* → Edict of Peace (R5 proposed) — **near-complete R0-R5**
2. **Protection chain**: Aura of Sanctuary (R0) → Blessing of Peace/Share Harm (R1) → Dome of Sanctuary/Spell-breaking Wave (R2) → Anti-Magic Field (R3) → Diplomatic Immunity (R4 proposed) → Sanctuary Sphere (R5 proposed) — **complete R0-R5**
3. **Selflessness chain**: *gap at R0* → Harmonic Link/Absorb Harm (R1 proposed) → *gap at R2* → Martyrdom's Blessing (R3) → *gap at R4-R5*
4. **Travel chain**: Wayfinder's Mark (R0 proposed) → Swift Journey (R1 proposed) → *gap at R2* → Safe Passage (R3 proposed) → Pilgrim's Gate (R4 proposed) → *gap at R5* — **near-complete R0-R4**
5. **Law chain**: Binding Word (R0 proposed) → *gap at R1* → Binding Oath (R2 proposed) → *gap at R3* → Righteous Verdict (R4 proposed) → Sacred Covenant (R5 proposed) — **near-complete R0-R5**

### Setup + Payoff Combos
- ✅ **Calm → Truth**: Calming Influence pacifies target → calmed targets less likely to resist Binding Word truth compulsion
- ✅ **Sanctuary chain**: Aura of Sanctuary (R0) → Dome of Sanctuary (R2) → Sanctuary Sphere (R5 proposed) provides clean defensive escalation
- ⚠️ **Travel buffing**: Wayfinder's Mark → Swift Journey → Safe Passage → Pilgrim's Gate has good thematic progression; Pilgrim's Gate (portal travel) synergizes explicitly with Wayfinder's Mark (portal destinations)
- ❌ **Law → Protection link**: No mechanic connecting oath enforcement or truth effects to protective spell benefits

### Design Completeness Checklist
- [x] R1 Quick Action: Absorb Harm (R1 proposed) — standardized reactive defense (+2 Dodge/Parry, ally-targeting secondary)
- [x] Defensive options: Blessing of Peace (R1), Dome of Sanctuary (R2), Anti-Magic Field (R3), Diplomatic Immunity (R4 proposed), Sanctuary Sphere (R5 proposed) — strong defensive core through R5
- [x] Utility: Wayfinder's Mark (R0 proposed), Swift Journey (R1 proposed), Safe Passage (R3 proposed), Pilgrim's Gate (R4 proposed) — travel pillar fully represented R0-R4
- ⚠️ Damage across ranks: Righteous Verdict (R4 proposed), Edict of Peace (R5 backlash) — appropriate for Peace's weak offense role
- [x] Repeating conditions: Dazed (pacification), charmed (calmed), protected (sanctuary)
- [x] Law capstone chain: Binding Word (R0) → Binding Oath (R2) → Righteous Verdict (R4) → Sacred Covenant (R5) — truth and justice progression complete
- [x] R5 diversity: Sanctuary Sphere (defensive), Edict of Peace (control/ceasefire), Sacred Covenant (permanent worldbuilding) — three distinct capstones
- ⚠️ Setup+payoff: Calm→truth is conceptually strong but lacks an explicit mechanical bonus (calmed targets don't get a stated penalty to resisting truth effects)
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 5, R1: 6, R2: 4, R3: 4, R4: 3, R5: 3)
- ⚠️ **Remaining gaps**: Selflessness R0/R2/R4+, Law R1/R3, Travel R2/R5

### Impact & Trivialization Review
- **Wayfinder's Mark (R0 navigation)**: Minimal risk — provides boon on navigation checks, doesn't auto-succeed. Pure assistance, not bypass.
- **Swift Journey (R1 travel buff)**: Low risk — +1/+2 movement and ignore natural difficult terrain assist travel but don't bypass it. Party still navigates, forages, and camps. Trackless travel is a defensive feature (anti-pursuit), not exploration bypass. **Well-mitigated.**
- **Binding Word (R0 truth compulsion)**: Moderate risk — cantrip-level truth compulsion is very accessible. **Mitigations**: only 1-3 statements, target is aware of compulsion, can choose silence over truth. Does not replace Influence/Insight checks — merely prevents lying if the target speaks. Repeated use on the same target should be subject to GM escalation (target becomes hostile, calls for help, etc.).
- **Safe Passage (R3 overland travel)**: Moderate risk — +2 boons on travel checks and 25-50% speed increase significantly smooth overland journeys. "Cannot become lost" at Critical is the strongest effect. **Mitigations**: ritual (10 min), R3 Focus cost (6), natural terrain only (magical misdirection still works), still requires actual travel (not teleportation). GMs retain full encounter design control — Safe Passage makes the road safer, not empty.
- **Binding Oath (R2)**: Low risk — requires willing participants, ritual, cannot be used offensively. Supernatural oath enforcement is a narrative tool, not a gameplay bypass.
