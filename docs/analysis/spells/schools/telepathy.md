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
4. **Gaps addressed**: Memory and communication trait gaps filled by proposed spells below. All 30 trait × rank slots now covered.
5. Defensive options provided through Mental Shield (R1), Prescient Awareness (R4), and Omniscient Eye (R5) — layered psychic defense.

### Internal Synergies
- **Setup**: Charm/daze target (lower mental defenses) → **Payoff**: Subsequent Telepathy spells against charmed/dazed targets gain +1 boon
- **Setup**: Read thoughts → **Payoff**: Insight into target grants +1 boon on social interactions

## Current Spell Inventory (15 existing + 22 proposed = 37 total)

### Existing Spells (in game)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Detect Magic, Mental Link, Mind Blast |
| 1 | 6 | Attack Thoughts, Control Beast, Foresight, Psychometry, Subtle Suggestion, True Strike |
| 2 | 4 | Counterspell, Forced Suggestion, Psychic Wave, Wave of Madness (incomplete) |
| 3 | 1 | Invade Dreams (incomplete) |
| 4 | 1 | Astral Body (incomplete, shared with Conjuration) |
| 5 | 0 | — |

### Proposed Spells (in this document)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 2 | Surface Recall, Commanding Thought |
| 1 | 3 | Mental Shield, Memory Echo (NEW), Mindspeak (NEW) |
| 2 | 2 | Telepathic Bond, Memory Sieve |
| 3 | 5 | Implant Suggestion, Psychic Lance, Psychic Probe (NEW), Seize Will (NEW), Deep Memory Dive (NEW) |
| 4 | 5 | Modify Memory, Mass Domination, Shatter Psyche (NEW), Mind Network (NEW), Prescient Awareness (NEW) |
| 5 | 5 | Psychic Maelstrom, Absolute Control, Astral Communion (NEW), Omniscient Eye (NEW), Mindwipe (NEW) |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| influence | Mind Blast | Subtle Suggestion, Attack Thoughts | Forced Suggestion, Psychic Wave | Implant Suggestion, Psychic Lance | Shatter Psyche (NEW) | Psychic Maelstrom |
| communication | Mental Link | Mindspeak (NEW) | Telepathic Bond | Invade Dreams* | Astral Body*, Mind Network (NEW) | Astral Communion (NEW) |
| insight | Detect Magic | Foresight, Psychometry, True Strike, Mental Shield | Counterspell | Psychic Probe (NEW) | Prescient Awareness (NEW) | Omniscient Eye (NEW) |
| domination | Commanding Thought | Control Beast | Wave of Madness* | Seize Will (NEW) | Mass Domination | Absolute Control |
| memory | Surface Recall | Memory Echo (NEW) | Memory Sieve | Deep Memory Dive (NEW) | Modify Memory | Mindwipe (NEW) |

*Asterisk = incomplete spell in game files*

**Coverage**: 30/30 slots filled (100%) — all trait × rank gaps addressed

**Spells per rank**: R0: 5, R1: 9, R2: 6, R3: 6, R4: 6, R5: 5 — minimum 3 per rank met at all ranks

## Proposed New Spells

### Rank 0

#### Surface Recall

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Resist (willing: auto) | Close | —

*You brush against a creature's thoughts, skimming their most recent experiences like fingers across still water.*

**Weak.** Read the last minute of surface memories from the target — you perceive what they saw, heard, and felt. Willing targets allow this automatically.
**Strong.** As above, and you gain +1 boon on your next Insight or Influence check against the target (you glimpsed their emotional state).
**Critical.** As above, and the target is unaware of the intrusion unless they succeed on a Spirit + Insight check vs. your Resist.

> **Design Note**: R0 memory cantrip. Core effect (read last minute of memories) is reliable on any success. SL adds social advantage and intrusion stealth as secondary effects. Fixes original version where memory time-window scaled by SL (violating "SL scales magnitude, not effect type").

#### Commanding Thought

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Resist | Close | —

*You project a single, forceful thought into a creature's mind, compelling a moment of obedience.*

**Weak.** The target must use their next Quick Action to perform a simple, non-harmful action of your choice (drop an item, look away, take a step back).
**Strong.** As above, and deal +2 psychic damage (ignoring AV) from the invasive mental command.
**Critical.** As above, and deal +4 psychic damage (ignoring AV). The target is briefly dazed.

> **Design Note**: R0 domination cantrip. Core compulsion (one Quick Action, non-harmful) is reliable on any success. SL adds psychic damage and a minor condition. Fixes original version where command scope escalated by SL.

### Rank 1

#### Mental Shield

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Self or ally | Close | quick

*You fortify a mind with psychic barriers, shielding against mental intrusion.*

**Effect.** As a Quick Action when targeted by an attack, gain +2 to your Dodge or Parry against the triggering attack. You also gain +2 to Resist against any mental effect (charm, fear, psychic) accompanying the triggering attack.

> **Design Note**: R1 Quick Action reactive defense. Standardized base (+2 Dodge/Parry) with Telepathy's mental protection as secondary effect. No SL scaling — one reliable defensive reaction.

#### Memory Echo

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | vs. Resist (willing: auto) | Close | —

*You reach into a creature's mind and pull forth a vivid echo of a recent experience, reliving it through their senses.*

**Weak.** Extract one specific memory from the target's past day. You can specify a general topic, time, or person to guide the extraction. You experience the memory as a vivid sensory flash. Willing targets allow this automatically.
**Strong.** As above, and deal +4 psychic damage (ignoring AV) to unwilling targets from the invasive mental extraction.
**Critical.** As above, and +8 psychic damage. The target is briefly dazed from the intrusion.

> **Design Note**: (NEW) R1 memory spell. Steps up from Surface Recall (R0, last minute, unfocused) to directed extraction from the past day. Core memory reading is reliable on any success; SL adds damage against unwilling targets. Damage follows reduced R1 scaling (secondary to utility).

#### Mindspeak

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | vs. Resist (willing: auto) | Medium | —

*You forge a sustained mental bridge between yourself and another mind, allowing silent conversation across any distance.*

**Effect.** On a success, you establish a two-way telepathic link with one creature you can see within medium range for a short duration. Both creatures can exchange thoughts, emotions, and mental images silently at will. The link persists regardless of distance on the same plane.

**Weak.** Establish the telepathic link as described.
**Strong.** As above, and you gain +1 boon on Insight and Influence checks involving the linked creature for the duration.
**Critical.** As above, and if the target is unwilling, deal +4 psychic damage (ignoring AV) from the forced mental contact.

> **Design Note**: (NEW) R1 communication spell. Sustained version of Mental Link (R0, one-shot message). Core link effect (two-way, short duration, distance-independent) is reliable on any success; SL adds social boons and damage.

### Rank 2

#### Telepathic Bond

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Medium TN | Close | —

*You forge a silent mental link between yourself and nearby creatures, allowing wordless communication across any distance.*

**Weak.** Link up to 4 willing creatures within close range. For a short duration, all linked creatures can communicate telepathically regardless of distance, as long as they are on the same plane.
**Strong.** As above, and linked creatures gain +1 boon on Insight rolls to read each other's emotional states.
**Critical.** As above, and linked creatures can share sensory input — one creature can see through another's eyes as a Quick Action (briefly).

> **Design Note**: R2 communication spell. Core effect (telepathic link, 4 creatures, short duration) is reliable on any success — SL adds sensory bonuses.

#### Memory Sieve

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Resist | Close | concentrate

*You probe deeper into a creature's memories, extracting specific information with methodical precision.*

**Weak.** Extract memories from the target spanning the past week. You can search for specific topics or events. The target is aware their mind is being read and can attempt to resist each round.
**Strong.** As above, and the memories are vivid — you perceive full sensory details (sights, sounds, smells). The target feels discomfort but may not immediately realize the source.
**Critical.** As above with vivid detail, and the target is unaware of the intrusion unless they succeed on a Spirit + Insight check.

> **Design Note**: R2 memory spell. Core effect (extract week of memories, search for topics) is reliable on any success — SL adds sensory clarity and stealth of intrusion.

### Rank 3

#### Implant Suggestion

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist | Medium | —

*You plant a deep mental command in a creature's mind, burying it beneath their conscious thoughts where it takes root like a seed of compulsion.*

**Effect.** On a success, the target must carry out a reasonable course of action you describe (one sentence). The suggestion lasts for a short duration. The target rationalizes the action as their own idea. Obviously suicidal or self-harmful commands fail automatically and end the spell.

**Weak.** Implant the suggestion as described.
**Strong.** As above, and deal +8 psychic damage from the invasive mental implantation.
**Critical.** As above, and deal +16 psychic damage. The target is completely unaware their mind was influenced, even after the effect ends.

> **Design Note**: R3 influence spell. Escalation from R2 Forced Suggestion — deeper, subtler command. Core suggestion (one sentence, short duration, rationalized as own idea) is reliable on any success. SL adds damage and intrusion stealth. Fixes original version where command complexity and duration escalated by SL.

#### Psychic Lance

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist | Long | —

*You focus your mental power into a razor-sharp lance of psychic energy and drive it into a single creature's mind, shattering their concentration and overwhelming their senses.*

**Weak.** Deal +8 psychic damage to a single target. The target is dazed for a short duration.
**Strong.** Deal +16 psychic damage. The target is dazed for a short duration. If the target was already dazed before this spell was cast, they become confused instead (short duration).
**Critical.** Deal +24 psychic damage. The target is dazed for a short duration. If the target was already dazed or confused before this spell was cast, they are also briefly stunned.

> **Design Note**: R3 damage spell. Single-target damage matches R3 scaling (+8/+16/+24). Primary condition (dazed, short duration) is fixed on any success — this is a damage spell, so the condition is secondary. Condition escalation (dazed → confused → stunned) rewards targeting already-impaired enemies, creating a setup → payoff chain within the school.

#### Psychic Probe

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist | Medium | —

*You plunge into a creature's mind like a blade, cutting through surface thoughts to expose their deepest intentions and hidden plans.*

**Effect.** On a success, you perform a deep psychic scan of one creature within medium range (vs. Resist for unwilling targets). You learn the target's current emotional state, their immediate intentions, and one specific plan or secret they are actively thinking about. The target is unaware of the scan unless they succeed on a Spirit + Insight check vs. your Resist.

**Weak.** Extract information as described.
**Strong.** As above, and deal +8 psychic damage from the invasive probe.
**Critical.** As above, and deal +16 psychic damage. The target is briefly dazed by the mental intrusion.

> **Design Note**: (NEW) R3 insight spell. Core information-gathering (intentions, plans, secrets) is reliable on any success. SL adds psychic damage as secondary effect. Steps up from Foresight (R1, combat prediction) to deep intelligence extraction.

#### Seize Will

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist | Medium | concentrate

*You overpower a creature's will with your own, seizing control of their body and actions like a puppeteer grasping invisible strings.*

**Effect.** On a success, the target is dominated for a short duration. They follow your spoken commands, which can include complex actions (move here, attack that creature, unlock this door). The target can attempt to break free at the end of each of their turns (Spirit + Fortitude vs. your Resist). Obviously suicidal or self-destructive commands automatically fail and end the spell.

**Weak.** Dominate the target as described.
**Strong.** As above, and deal +8 psychic damage from the violent mental takeover.
**Critical.** As above, and deal +16 psychic damage. The target suffers +1 bane on their break-free attempts.

> **Design Note**: (NEW) R3 domination spell. Fills the gap between Control Beast (R1, animals only) and Mass Domination (R4, multiple targets). Core domination (complex commands, short duration, break-free saves) is reliable on any success; SL adds damage and resistance penalty.

#### Deep Memory Dive

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist (willing: auto) | Close | concentrate

*You plunge into the deepest recesses of a creature's mind, descending through layers of forgotten experiences to dredge up memories buried by time.*

**Effect.** On a success, you access the target's lifetime of memories within close range. You can search for specific events, people, places, or knowledge, experiencing up to 3 distinct memories as vivid, immersive visions during the spell's short duration. Willing targets allow this automatically.

**Weak.** Access and search deep memories as described.
**Strong.** As above, and deal +8 psychic damage to unwilling targets from the violent mental intrusion.
**Critical.** As above, and deal +16 psychic damage. Unwilling targets are briefly dazed from the psychic trauma.

> **Design Note**: (NEW) R3 memory spell. Extends from Memory Sieve (R2, past week) to the target's full lifetime. Core utility (lifetime memory search, 3 memories) is reliable on any success; SL adds damage against unwilling targets.

### Rank 4

#### Modify Memory

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Close | concentrate

*You reach into a creature's mind and reshape their recollections, reweaving the threads of their past like a weaver at a loom of stolen experiences.*

**Effect.** On a success, you alter the target's memories from the past week. You can change details, add or remove people from memories, alter the perceived outcome of events, or create entirely false memories. The changes feel natural to the target — they cannot distinguish altered memories from real ones without magical intervention. Requires concentration.

**Weak.** Alter memories as described.
**Strong.** As above, and deal +10 psychic damage from the traumatic mental restructuring.
**Critical.** As above, and deal +20 psychic damage. The target is briefly dazed from the psychic shock.

> **Design Note**: R4 memory spell. Core memory alteration (past week, substantial changes, undetectable) is reliable on any success; SL adds damage. Close range and concentration mean the target must be restrained, incapacitated, or willing. Fixes original version where alteration scope escalated by SL.

#### Mass Domination

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Medium | concentrate

*You impose your will on multiple minds simultaneously, seizing control of a group of creatures like a tyrant commanding an army of puppets.*

**Weak.** Choose up to 3 creatures within medium range. Each must save vs. Resist or be dominated for a short duration. Dominated creatures follow your simple verbal commands. At the end of each of their turns, a dominated creature can attempt a new save to break free.
**Strong.** As above, and dominated creatures suffer +1 bane on their break-free saves.
**Critical.** As above, and you can issue different commands to each dominated creature simultaneously (normally all receive the same command).

> **Design Note**: R4 domination capstone. Core effect (dominate 3 creatures, short duration, break-free saves) is reliable on any success — SL adds save penalty and command flexibility.

#### Shatter Psyche

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Long | —

*You assault a creature's deepest sense of self, driving a spike of psychic force through their identity until their mind fractures under the pressure.*

**Weak.** Deal +10 psychic damage to a single target. The target is dazed for a short duration.
**Strong.** Deal +20 psychic damage. The target is dazed for a short duration and charmed toward you briefly (their broken will perceives you as non-threatening).
**Critical.** Deal +30 psychic damage. The target is dazed for a short duration and charmed toward you for a short duration.

> **Design Note**: (NEW) R4 influence damage spell. Single-target damage matches R4 scaling (+10/+20/+30). Primary condition (dazed, short duration) is fixed on any success. SL adds damage and a secondary charm — the shattered psyche defaults to compliance. Creates a setup → payoff: charmed target is vulnerable to follow-up Implant Suggestion or Seize Will.

#### Mind Network

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Hard TN | Close | ritual (minutes), concentrate

*You weave a web of psychic threads connecting the minds of many, creating a silent network of shared thought that spans any distance.*

**Effect.** On a success, you create a telepathic network linking up to 10 willing creatures you have met before. The network lasts for a medium duration and works across any distance on the same plane. All linked creatures can communicate silently with any other member, sharing thoughts, emotions, and sensory impressions at will.

**Weak.** Establish the mind network as described.
**Strong.** As above, and all linked creatures gain +1 boon on Perception checks (shared awareness across the network).
**Critical.** As above, and linked creatures can share direct sensory input — one creature can see through another's eyes or hear what they hear as a Quick Action (briefly).

> **Design Note**: (NEW) R4 communication spell. Scales from Telepathic Bond (R2, 4 creatures, short duration) to 10 creatures, medium duration, with enhanced information sharing. Core effect reliable on any success; SL adds shared perception.

#### Prescient Awareness

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Hard TN | Self | concentrate

*You open your mind to the surface thoughts of every creature nearby, reading their intentions before they act — an unsettling web of precognition that turns the battlefield transparent.*

**Effect.** On a success, for a short duration you attune to the thoughts of all creatures within medium range. You and up to 3 other allies within range gain +1 boon on Dodge, Parry, and Resist rolls as you telepathically warn them of incoming attacks and effects. Hidden or invisible creatures within range are revealed to your senses.

**Weak.** Gain prescient awareness as described.
**Strong.** As above, and deal +5 psychic damage to each enemy in range from the invasive mental scanning.
**Critical.** As above, and deal +10 psychic damage. Enemies in range are briefly dazed by the intrusive psychic scan.

> **Design Note**: (NEW) R4 insight combat spell. Scales from Foresight (R1, self-only) to party-wide tactical awareness. Core defensive buff (+1 boon Dodge/Parry/Resist, reveal hidden) is reliable on any success; SL adds AoE psychic damage as secondary effect. AoE damage reduced from standard R4 (+5/+10/+15) because primary purpose is support, not damage.

### Rank 5

#### Psychic Maelstrom

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Long | concentrate, material cost (5,000 coins)

*You unleash a devastating psychic storm, an invisible hurricane of mental anguish that tears through every mind in range, leaving shattered thoughts and broken wills in its wake.*

**Weak.** All creatures in a long area must save vs. Resist or be dazed for a short duration and take +6 psychic damage.
**Strong.** As above with +12 psychic damage, and dazed creatures also suffer +1 bane on all mental attribute rolls.
**Critical.** As above with +18 psychic damage, and dazed creatures also suffer +1 bane on all attribute rolls (not just mental).

> **Design Note**: R5 AoE capstone with material cost (5,000 coins). Long area per R5 guidelines. AoE damage at half single-target scaling (+6/+12/+18). Core condition (dazed, short duration) is reliable on any success — SL adds damage and expanded debuffs. Updated from original: added material cost, expanded area to long range.

#### Absolute Control

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Medium | concentrate, material cost (5,000 coins)

*You seize total control of a creature's mind, body, and actions — crushing their will beneath yours until they are nothing but an extension of your desires.*

**Effect.** On a success, the target is dominated for a short duration. You control all their actions, including movement, attacks, and speech. The target can attempt to break free at the end of each of their turns (Spirit + Fortitude vs. your Resist, +1 bane on the save).

**Weak.** Dominate the target as described.
**Strong.** As above, and the target cannot communicate their dominated state to allies (they appear to act normally).
**Critical.** As above, and you can access the target's surface thoughts while dominating them, gaining +1 boon on any rolls to maintain the deception.

> **Design Note**: R5 domination capstone with material cost (5,000 coins). Core effect (total domination with break-free saves at +1 bane) is reliable on any success — SL adds deception capabilities. Updated from original: added material cost.

#### Astral Communion

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Extreme TN | Self | ritual (minutes), material cost (5,000 coins)

*You project your psychic voice across the boundaries of reality itself, reaching through the veil between planes to touch a distant mind.*

**Effect.** On a success, for a short duration you can communicate telepathically with any creature you have previously met, regardless of distance or planar boundaries. The target hears your words as a clear voice in their mind and can respond. You can sense the target's general emotional state and whether they are alive, injured, or in danger. You can switch between different targets as a Quick Action.

**Weak.** Establish cross-planar communication as described.
**Strong.** As above, and you gain a detailed sensory impression of each target's surroundings — you perceive sights, sounds, and smells around them.
**Critical.** As above, and the target can choose to share the mental link with nearby allies, creating a brief telepathic conference at their location.

> **Design Note**: (NEW) R5 communication capstone with material cost (5,000 coins). Cross-planar telepathy represents peak mortal communication magic. Core effect reliable on any success; SL adds environmental perception and link sharing. Does not overlap with Astral Body (R4) which provides physical astral projection.

#### Omniscient Eye

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Extreme TN | Self | concentrate, material cost (5,000 coins)

*You open your mind completely, becoming a nexus of psychic awareness that perceives every thought, every intention, every hidden presence within an enormous radius.*

**Effect.** On a success, for a short duration you become aware of every conscious mind within long range. You know the exact location, emotional state, and surface thoughts of all creatures in range. Hidden, invisible, or disguised creatures are revealed to you. You cannot be surprised. You and all allies within range gain +2 boons on Dodge, Parry, and Resist rolls.

**Weak.** Gain omniscient awareness as described.
**Strong.** As above, and deal +6 psychic damage to each enemy in range from the overwhelming psychic scan.
**Critical.** As above, and deal +12 psychic damage. Enemies in range are briefly dazed by the psychic intrusion.

> **Design Note**: (NEW) R5 insight capstone with material cost (5,000 coins). Peak mortal mental awareness — total battlefield omniscience. Core awareness and defensive buff (+2 boons) reliable on any success; SL adds AoE psychic damage. +2 boons justified at R5 cost (10 Focus, 5,000 coins, concentration).

#### Mindwipe

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Close | concentrate, ritual (minutes), material cost (5,000 coins)

*You seize the totality of a creature's memories and unmake them — erasing, rewriting, or fabricating an entire lifetime of experiences with the cold precision of a scribe scratching through parchment.*

**Effect.** On a success, you gain complete control over the target's memories within close range (vs. Resist). You can erase, rewrite, or fabricate any number of memories spanning the target's entire lifetime. The alterations are permanent and feel completely natural — the target cannot distinguish fabricated memories from real ones without magical intervention. The process requires several minutes of concentration.

**Weak.** Rewrite the target's memories as described.
**Strong.** As above, and deal +12 psychic damage from the traumatic mental restructuring.
**Critical.** As above, and deal +24 psychic damage. The target is dazed for a short duration from the psychic trauma.

> **Design Note**: (NEW) R5 memory capstone with material cost (5,000 coins). Permanent, comprehensive memory rewriting — peak mortal memory manipulation. Core rewriting effect reliable on any success; SL adds damage. Close range and concentration mean the target must be restrained or willing. Extends from Modify Memory (R4, past week, temporary) to lifetime and permanent.

## Cross-School Spell Sharing

**Potential Overlap: Telepathy (Arcane) ↔ Peace (Mystic)**

The Mental Shield spell concept overlaps with Peace tradition's protective magic. Both schools offer mental/spiritual protection, though from different philosophical angles. Key overlap areas:

- **Mental Shield** (R1) provides psychic defense similar to Peace's protective wards and calming effects
- **Calming/charm resistance** effects exist in both schools — Telepathy defends against mental intrusion, Peace provides serenity and mental fortitude

**Shared Spell Candidates**: Mental Shield could serve as a shared spell between Telepathy (Arcane) and Peace (Mystic), providing identical psychic defense mechanics in both lists.

> **Design Note**: Telepathy's mental defense is selfish (protecting the caster's own mind from rival psychics) while Peace's protection is communal (shielding the faithful from mental corruption). The same mechanics serve both philosophies.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Influence chain**: Mind Blast (R0) → Subtle Suggestion/Attack Thoughts (R1) → Forced Suggestion/Psychic Wave (R2) → Implant Suggestion/Psychic Lance (R3) → Shatter Psyche (R4) → Psychic Maelstrom (R5)
2. **Communication chain**: Mental Link (R0) → Mindspeak (R1) → Telepathic Bond (R2) → Invade Dreams (R3) → Astral Body/Mind Network (R4) → Astral Communion (R5)
3. **Insight chain**: Detect Magic (R0) → Foresight/Psychometry/True Strike/Mental Shield (R1) → Counterspell (R2) → Psychic Probe (R3) → Prescient Awareness (R4) → Omniscient Eye (R5)
4. **Domination chain**: Commanding Thought (R0) → Control Beast (R1) → Wave of Madness (R2) → Seize Will (R3) → Mass Domination (R4) → Absolute Control (R5)
5. **Memory chain**: Surface Recall (R0) → Memory Echo (R1) → Memory Sieve (R2) → Deep Memory Dive (R3) → Modify Memory (R4) → Mindwipe (R5)
6. **Damage chain**: Mind Blast (R0) → Attack Thoughts (R1) → Psychic Wave (R2) → Psychic Lance (R3) → Shatter Psyche (R4) → Psychic Maelstrom (R5)

### Setup + Payoff Combos
- ✅ **Charm/daze → telepathy boon**: Charmed or dazed targets are vulnerable to follow-up mental attacks
- ✅ **Read thoughts → social advantage**: Surface Recall/Memory Echo/Psychic Probe → +1 boon on social interactions from extracted knowledge
- ✅ **Psychic Lance condition escalation**: Dazed targets become confused, confused targets become stunned — rewards repeated targeting
- ✅ **Memory chain progression**: Surface Recall (R0, last minute) → Memory Echo (R1, past day) → Memory Sieve (R2, past week) → Deep Memory Dive (R3, lifetime) → Modify Memory (R4, alter week) → Mindwipe (R5, rewrite lifetime) — complete reading → altering → rewriting chain
- ✅ **Communication → Domination**: Mindspeak establishes mental contact; subsequent domination spells against linked targets gain narrative justification
- ✅ **Prescient Awareness → party coordination**: Party-wide defensive boons + hidden creature detection enables tactical advantage for subsequent rounds
- ✅ **Shatter Psyche charm → follow-up**: Charmed target from Shatter Psyche is vulnerable to Implant Suggestion or Seize Will on the next turn

### Design Completeness Checklist
- [x] R1 Quick Action: Mental Shield — standardized reactive defense (+2 Dodge/Parry, +2 Resist vs. mental effects)
- [x] Defensive options: Mental Shield (R1), Prescient Awareness (R4), Omniscient Eye (R5) provide layered mental defense
- [x] Utility: Detect Magic (R0), Psychometry (R1), Mindspeak (R1), Telepathic Bond (R2), Mind Network (R4), Astral Communion (R5)
- [x] Damage across ranks: Mind Blast (R0) → Attack Thoughts (R1) → Psychic Wave (R2) → Psychic Lance (R3) → Shatter Psyche (R4) → Psychic Maelstrom (R5) — complete R0-R5 damage chain
- [x] Repeating conditions: Dazed, confused, charmed, dominated — strong condition ladder with escalation via Psychic Lance
- [x] Setup + payoff: Charm → vulnerability chain, Psychic Lance condition escalation, read → dominate pipeline, Shatter Psyche charm → suggestion follow-up
- [x] 3 spells per rank minimum: R0: 5, R1: 9, R2: 6, R3: 6, R4: 6, R5: 5 ✓
- [x] All trait × rank gaps filled: 30/30 coverage (100%)
- [x] Memory chain complete: R0-R5 with clear reading → altering → rewriting progression
- [x] All R5 spells include material cost (5,000 coins)
- [x] All control/utility spells use fixed primary effects on any success — SL scales only damage and secondary benefits
- [x] No heightened duplicates — each spell represents a genuinely different concept

### Impact & Trivialization Review
- **Surface Recall (R0 memory reading)**: Low risk — only reads last minute of surface memories. Provides leads, not answers. Unwilling targets resist.
- **Commanding Thought (R0 domination)**: Low risk — single Quick Action, non-harmful commands only. Well-bounded at cantrip level.
- **Memory Echo (R1 memory extraction)**: Low risk — reads one specific memory from past day. Directed but limited scope. Unwilling targets resist and take damage.
- **Mindspeak (R1 sustained telepathy)**: Low risk — sustained communication link. No forced information extraction beyond what the target shares.
- **Implant Suggestion (R3)**: Moderate risk — "reasonable" command clause and GM adjudication prevent worst abuses. Core scope fixed (one sentence, short duration). Cannot compel self-harm.
- **Psychic Probe (R3 mind reading)**: Moderate risk — reveals intentions and one secret. Mitigations: vs. Resist, medium range, single target. Provides one piece of intelligence, not complete mind access.
- **Seize Will (R3 domination)**: Moderate risk — single-target mind control with concentration and per-turn break-free saves. More powerful than Control Beast but limited to one creature.
- **Deep Memory Dive (R3 lifetime memories)**: Moderate risk — access to lifetime of memories could shortcut investigation. Mitigations: close range, concentration, 3 memories maximum, unwilling targets resist.
- **Modify Memory (R4)**: High risk — altering memories could bypass social intrigue arcs. Mitigations: vs. Resist, close range (requires restrained/willing target), concentration, R4 Focus cost. GMs should ensure important NPCs have high Resist or protective wards.
- **Mass Domination (R4)**: High risk — multi-target mind control. Mitigations: medium range, concentration, per-turn escape attempts, short duration, simple commands only.
- **Shatter Psyche (R4)**: Moderate risk — high damage + daze + charm secondary. Mitigations: single target, charm is brief on Strong (short on Critical only). The charm is a combat debuff, not social mind control.
- **Mind Network (R4)**: Low risk — mass communication utility. Requires willing targets and ritual casting. No combat abuse potential.
- **Prescient Awareness (R4)**: Moderate risk — party-wide defensive boons are strong. Mitigations: concentration (caster vulnerable), short duration, requires Action to establish.
- **Absolute Control (R5)**: Highest risk — total single-target domination. Mitigations: concentration, vs. Resist, per-turn escape at +1 bane, material cost (5,000 coins). Appropriate for R5 peak power.
- **Psychic Maelstrom (R5)**: High risk — AoE damage + daze. Mitigations: concentration, material cost (5,000 coins), long area but enemies may be spread. Condition is reliable but doesn't escalate.
- **Astral Communion (R5)**: Low risk — cross-planar communication only. Ritual casting, material cost (5,000 coins). No combat impact.
- **Omniscient Eye (R5)**: High risk — +2 boons to defense for entire party is very strong. Mitigations: concentration (caster immobile and vulnerable), material cost (5,000 coins), short duration. Appropriate for R5 cost.
- **Mindwipe (R5)**: Highest risk — permanent memory rewriting. Mitigations: close range, concentration, vs. Resist, material cost (5,000 coins), several minutes to complete. Target must be restrained or willing. GMs should treat as a major plot ability, not a casual combat tool.
