# Telepathy — Spell School Design Space

## School Identity

**Discipline**: Telepathy (Arcane)
**Traits**: influence, communication, insight, domination, memory
**Identity**: Exploitative mind control and violation — using mental powers for selfish gain
**Role Spread**: Excels: Control | Decent: Utility, Support | Weak: Offense, Healing, Defense

### Mechanical Identity
- **Primary Conditions**: Dazed, confused, charmed, dominated
- **Signature Gimmick**: Mind reading and mental commands — information extraction and behavioral control
- **Damage Types**: Psychic, Radiant, Necrotic

### Design Principles
1. Telepathy is the premier control school — charm, dominate, confuse
2. Information gathering (thoughts, memories, lies) provides social and exploration utility
3. Damage is secondary — psychic attacks are real but less efficient than Evocation
4. **Major gap**: Memory trait has zero spells at any rank. Communication trait is weak.
5. Defensive options are limited — needs mental shielding

### Internal Synergies
- **Setup**: Charm/daze target (lower mental defenses) → **Payoff**: Subsequent Telepathy spells against charmed/dazed targets gain +1 boon
- **Setup**: Read thoughts → **Payoff**: Insight into target grants +1 boon on social interactions

## Current Spell Inventory (15 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Detect Magic, Mental Link, Mind Blast |
| 1 | 6 | Attack Thoughts, Control Beast, Foresight, Psychometry, Subtle Suggestion, True Strike |
| 2 | 4 | Counterspell, Forced Suggestion, Psychic Wave, Wave of Madness (incomplete) |
| 3 | 1 | Invade Dreams (incomplete) |
| 4 | 1 | Astral Body (incomplete) |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| influence | Mind Blast | Subtle Suggestion, Attack Thoughts | Forced Suggestion | — | — | — |
| communication | Mental Link | — | — | Invade Dreams* | — | — |
| insight | Detect Magic | Foresight, Psychometry, True Strike | Counterspell | — | — | — |
| domination | ❌ **GAP** | Control Beast | Wave of Madness* | — | — | — |
| memory | ❌ **GAP** | — | — | — | — | — |

*Asterisk = incomplete spell*

**Coverage**: 10/30 slots filled (33%) — weakest arcane discipline by coverage

**Critical Gaps**:
- **Memory**: Zero spells at ANY rank — the most critical gap across all schools
- **Domination R0**: No cantrip-level command
- **Communication R1-R2**: Only Mental Link (R0) and Invade Dreams (R3) — massive mid-rank gap
- **Influence R3+**: No high-rank influence spells
- **All traits R4-R5**: Only Astral Body (incomplete) — effectively no high-rank Telepathy

## Proposed New Spells

### Surface Recall

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Resist (willing: auto) | Close | —

*You brush the surface of a creature's mind, pulling forth a recent memory.*

**Weak.** Read one brief surface memory from the target — the last few seconds of sensory experience. Willing targets allow this automatically.
**Strong.** Read the last minute of surface memories. You perceive what the target saw, heard, and felt.
**Critical.** Read up to 10 minutes of surface memories. You can choose a specific recent event to focus on.

> **Design Note**: Fills the R0 memory gap — the most critical trait gap in Telepathy.

### Commanding Thought

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Resist | Close | —

*You project a single, forceful thought into a creature's mind, compelling brief obedience.*

**Weak.** The target must use their next Quick Action to perform a simple, non-harmful action of your choice (drop item, look away, step back).
**Strong.** The target must use their next Action to perform a simple, non-harmful action of your choice.
**Critical.** The target must use their next Action to perform a simple action of your choice. The action can be mildly disadvantageous (move away from ally, lower guard) but not directly self-harmful.

> **Design Note**: Fills R0 domination gap. Very limited command scope at cantrip level.

### Mental Shield

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Self or ally | Close | quick

*You fortify a mind with psychic barriers, shielding against mental intrusion.*

**Effect.** As a Quick Action when targeted by an attack, gain +2 to your Dodge or Parry against the triggering attack. You also gain +2 to Resist against any mental effect (charm, fear, psychic) accompanying the triggering attack.

> **Design Note**: R1 Quick Action reactive defense. Standardized base (+2 Dodge/Parry) with Telepathy's mental protection as secondary effect. No SL scaling — one reliable defensive reaction.

### Telepathic Bond

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Medium TN | Close | —

*You forge a silent mental link between yourself and nearby creatures, allowing wordless communication across any distance.*

**Weak.** Link up to 4 willing creatures within close range. For a short duration, all linked creatures can communicate telepathically regardless of distance, as long as they are on the same plane.
**Strong.** As above, and linked creatures gain +1 boon on Insight rolls to read each other's emotional states.
**Critical.** As above, and linked creatures can share sensory input — one creature can see through another's eyes as a Quick Action (briefly).

> **Design Note**: R2 communication spell. Core effect (telepathic link, 4 creatures, short duration) is reliable on any success — SL adds sensory bonuses.

### Implant Suggestion

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist | Medium | —

*You plant a deep mental command in a creature's mind, compelling them to carry out a complex course of action.*

**Weak.** The target must carry out a reasonable course of action you describe (one sentence). The action can last up to a short duration. The target rationalizes the action as their own idea. Obviously suicidal commands fail automatically.
**Strong.** The implanted suggestion can be more complex (two sentences) and lasts for a medium duration. The target is unaware they were influenced after the effect ends.
**Critical.** Complex suggestion (three sentences) lasting for a long duration. The target is completely unaware of the manipulation, even after the effect ends.

> **Design Note**: Fills R3 influence gap. Escalation from R2 Forced Suggestion — longer-lasting, more complex commands. Not instant mind control — the command must be "reasonable" (GM adjudication), preventing use as a combat win-button.

### Psychic Lance

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist | Long | —

*You focus your mental power into a razor-sharp lance of psychic energy and drive it into a single creature's mind, shattering their concentration and overwhelming their senses.*

**Weak.** Deal +8 psychic damage to a single target. The target is briefly dazed as their thoughts scatter.
**Strong.** Deal +16 psychic damage. The target is dazed for a short duration. If the target was already dazed before this spell was cast, they become confused instead.
**Critical.** Deal +24 psychic damage. The target is confused for a short duration. If the target was already dazed or confused before this spell was cast, they are also briefly stunned.

> **Design Note**: Fills the R3 damage gap in Telepathy. Single-target damage matches R3 scaling (+8/+16/+24). The condition escalation (dazed → confused → stunned) rewards targeting already-impaired enemies, creating a setup → payoff chain within the school.

### Memory Sieve

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Resist | Close | concentrate

*You probe deeper into a creature's memories, extracting specific information.*

**Weak.** Extract memories from the target spanning the past week. You can search for specific topics or events. The target is aware their mind is being read and can attempt to resist each round.
**Strong.** As above, and the memories are vivid — you perceive full sensory details (sights, sounds, smells). The target feels discomfort but may not immediately realize the source.
**Critical.** As above with vivid detail, and the target is unaware of the intrusion unless they succeed on a Spirit + Insight check.

> **Design Note**: R2 memory spell. Core effect (extract week of memories, search for topics) is reliable on any success — SL adds sensory clarity and stealth of intrusion.

### Modify Memory

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Close | concentrate

*You reach into a creature's mind and alter their memories, reshaping their recollection of past events.*

**Weak.** You can alter one memory of the target from the past day. The alteration is minor — changing details, not inventing entire events. The target is unaware their memory has been changed.
**Strong.** You can alter memories from the past week. Alterations can be more substantial — adding or removing a person from a memory, changing the outcome of an event.
**Critical.** You can alter memories from the past month. You can create entirely false memories or erase real ones completely. The false memories feel entirely natural to the target.

> **Design Note**: R4 memory spell — fills the critical memory gap at a power level appropriate for significant mental manipulation.

### Mass Domination

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Medium | concentrate

*You impose your will on multiple minds simultaneously, seizing control of a group of creatures.*

**Weak.** Choose up to 3 creatures within medium range. Each must save vs. Resist or be dominated for a short duration. Dominated creatures follow your simple verbal commands. At the end of each of their turns, a dominated creature can attempt a new save to break free.
**Strong.** As above, and dominated creatures suffer +1 bane on their break-free saves.
**Critical.** As above, and you can issue different commands to each dominated creature simultaneously (normally all receive the same command).

> **Design Note**: R4 domination capstone. Core effect (dominate 3 creatures, short duration, break-free saves) is reliable on any success — SL adds save penalty and command flexibility.

### Psychic Maelstrom

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Medium | concentrate

*You unleash a devastating psychic storm across the battlefield, overwhelming the minds of every creature in range with torrents of mental anguish.*

**Weak.** All creatures in a medium area must save vs. Resist or be dazed for a short duration and take +6 psychic damage.
**Strong.** As above with +12 psychic damage, and dazed creatures also suffer +1 bane on all mental attribute rolls.
**Critical.** As above with +18 psychic damage, and dazed creatures also suffer +1 bane on all attribute rolls (not just mental).

> **Design Note**: R5 psychic capstone. AoE at half-damage scaling. Core condition (dazed) is reliable on any success — SL adds damage and expanded debuffs, not escalating conditions.

### Absolute Control

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Medium | concentrate

*You seize total control of a creature's mind, body, and actions — bending their will completely to yours.*

**Weak.** The target is dominated for a short duration. You control all their actions, including movement, attacks, and speech. The target can attempt to break free at the end of each of their turns (vs. Resist, +1 bane).
**Strong.** As above, and the target cannot communicate their dominated state to allies (they appear to act normally).
**Critical.** As above, and you can access the target's surface thoughts while dominating them, gaining +1 boon on any rolls to maintain the deception.

> **Design Note**: R5 domination capstone. Core effect (total domination, short duration, break-free with bane) is reliable on any success — SL adds deception capabilities.

## Cross-School Spell Sharing

**Potential Overlap: Telepathy (Arcane) ↔ Peace (Mystic)**

The Mental Shield spell concept overlaps with Peace tradition's protective magic. Both schools offer mental/spiritual protection, though from different philosophical angles. Key overlap areas:

- **Mental Shield** (R1) provides psychic defense similar to Peace's protective wards and calming effects
- **Calming/charm resistance** effects exist in both schools — Telepathy defends against mental intrusion, Peace provides serenity and mental fortitude

**Shared Spell Candidates**: Mental Shield could serve as a shared spell between Telepathy (Arcane) and Peace (Mystic), providing identical psychic defense mechanics in both lists.

> **Design Note**: Telepathy's mental defense is selfish (protecting the caster's own mind from rival psychics) while Peace's protection is communal (shielding the faithful from mental corruption). The same mechanics serve both philosophies.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Influence chain**: Mind Blast (R0) → Subtle Suggestion/Attack Thoughts (R1) → Forced Suggestion (R2) → Implant Suggestion (R3 proposed) → *gap at R4* → Psychic Maelstrom (R5 proposed)
2. **Communication chain**: Mental Link (R0) → *gap at R1* → Telepathic Bond (R2 proposed) → Invade Dreams (R3\*) → *gap at R4-R5*
3. **Insight chain**: Detect Magic (R0) → Foresight/Psychometry/True Strike (R1) → Counterspell (R2) → *gap at R3-R5*
4. **Domination chain**: Commanding Thought (R0 proposed) → Control Beast (R1) → Wave of Madness (R2\*) → *gap at R3* → Mass Domination (R4 proposed) → Absolute Control/Psychic Maelstrom (R5 proposed)
5. **Memory chain**: Surface Recall (R0 proposed) → *gap at R1* → Memory Sieve (R2 proposed) → *gap at R3* → Modify Memory (R4 proposed) → *gap at R5*
6. **Damage chain**: Mind Blast (R0) → Attack Thoughts (R1) → Psychic Wave (R2) → Psychic Lance (R3 proposed) → *gap at R4* → Psychic Maelstrom (R5 proposed)

### Setup + Payoff Combos
- ✅ **Charm/daze → telepathy boon**: Charmed or dazed targets are vulnerable to follow-up mental attacks
- ✅ **Read thoughts → social advantage**: Psychometry/Surface Recall → +1 boon on social interactions
- ✅ **Psychic Lance condition escalation**: Dazed targets become confused, confused targets become stunned — rewards repeated targeting
- ⚠️ **Memory chain progression**: Surface Recall → Memory Sieve → Modify Memory has clean escalation but R1 and R3 gaps break the chain
- ⚠️ **Communication → Domination**: No mechanic linking established telepathic contact to easier domination attempts

### Design Completeness Checklist
- [x] R1 Quick Action: Mental Shield (R1 proposed) — standardized reactive defense (+2 Dodge/Parry, mental resistance secondary)
- [x] Defensive options: Mental Shield (R1 proposed) provides Resist bonus and psychic resistance
- [x] Utility: Detect Magic (R0), Psychometry (R1), Telepathic Bond (R2 proposed)
- [x] Damage across ranks: Mind Blast (R0), Attack Thoughts (R1), Psychic Wave (R2), Psychic Lance (R3 proposed), Psychic Maelstrom (R5 proposed) — R4 damage gap remains
- [x] Repeating conditions: Dazed, confused, charmed, dominated — strong condition ladder with escalation via Psychic Lance
- [x] Setup+payoff: Charm → vulnerability chain, Psychic Lance condition escalation, daze → domination pipeline
- ⚠️ **3 spells per rank minimum**: Met at R0-R4 (R0: 5, R1: 7, R2: 6, R3: 3, R4: 3). R5 has 2 — needs one more spell
- ⚠️ **Remaining gaps**: Communication R1, Memory R1/R3/R5, Insight R3+, R4 damage spell, R5 needs one more for 3-per-rank

### Impact & Trivialization Review
- **Surface Recall (R0 memory reading)**: Moderate risk — reading recent memories could shortcut investigation. **Mitigations**: only surface/recent memories (seconds to minutes), unwilling targets resist, close range required. GM controls information depth. Provides leads, not answers.
- **Commanding Thought (R0 mind control)**: Low risk — single Quick Action or Action, non-harmful commands only. Cannot compel complex, dangerous, or self-harmful actions. Well-bounded at cantrip level.
- **Implant Suggestion (R3)**: Moderate risk — "reasonable" command clause and GM adjudication prevent worst abuses. Target rationalizes action as their own, but obviously suicidal commands auto-fail. Comparable to classic Suggestion spell constraints.
- **Modify Memory (R4)**: Highest risk in Telepathy — altering memories could bypass entire social intrigue arcs. **Mitigations**: vs. Resist, close range (effectively requires restrained/willing target), concentration, R4 Focus cost is heavy. GMs should treat important NPCs as having resistance, wards, or allies who notice behavioral changes. The spell changes memory, not personality — altered targets may still act unpredictably.
- **Mass Domination (R4)**: High risk — multi-target mind control. **Mitigations**: close range only (caster must be in the thick of combat), concentration, per-turn escape attempts, brief/short duration. Simple commands at weak level prevent army-stealing.
- **Absolute Control (R5)**: Highest risk — total single-target domination. **Mitigations**: concentration (caster is vulnerable and immobile), vs. Resist, per-turn escape attempts even at critical, medium duration maximum. Appropriate for R5 peak mortal power but GMs should ensure important NPCs have high Resist values or ally intervention.
