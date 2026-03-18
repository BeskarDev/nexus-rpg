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

**Weak.** As a Quick Action, grant yourself or one ally within close range +2 to Resist against the next charm, fear, or psychic effect targeting them. Lasts briefly.
**Strong.** The bonus increases to +4 Resist. Also grants resistance to psychic damage (reduce by 2) for the duration.
**Critical.** The bonus increases to +4 Resist and resistance to psychic damage (reduce by 4). If a charm or fear effect fails against the shielded target, the attacker takes +2 psychic damage from the backlash.

> **Design Note**: Defensive option for Telepathy — mental protection fits the school's identity.

### Telepathic Bond

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Willing allies | Close | enchant (medium)

*You link the minds of your allies, allowing wordless communication across distance.*

**Weak.** Link up to 3 willing creatures for a medium duration. Linked creatures can communicate telepathically within long range. Communication is limited to simple thoughts and emotions.
**Strong.** Link up to 5 creatures. Communication includes full sentences and shared sensory impressions (one creature can briefly share what they see/hear). Range extends to extreme.
**Critical.** Link up to 5 creatures. Full telepathic communication with no range limit (same plane). Linked creatures can share a Perception check result once per scene (one creature spots danger, all are aware).

> **Design Note**: Fills R2 communication gap. Practical exploration/tactical utility — coordination without speaking. Medium duration prevents permanent always-on communication. Range limits prevent it from replacing mundane messaging systems.

### Implant Suggestion

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist | Medium | —

*You plant a deep mental command in a creature's mind, compelling them to carry out a complex course of action.*

**Weak.** The target must carry out a reasonable course of action you describe (one sentence). The action can last up to a short duration. The target rationalizes the action as their own idea. Obviously suicidal commands fail automatically.
**Strong.** The implanted suggestion can be more complex (two sentences) and lasts for a medium duration. The target is unaware they were influenced after the effect ends.
**Critical.** Complex suggestion (three sentences) lasting for a long duration. The target is completely unaware of the manipulation, even after the effect ends.

> **Design Note**: Fills R3 influence gap. Escalation from R2 Forced Suggestion — longer-lasting, more complex commands. Not instant mind control — the command must be "reasonable" (GM adjudication), preventing use as a combat win-button.

### Memory Sieve

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Resist | Close | concentrate

*You probe deeper into a creature's memories, extracting specific information.*

**Weak.** Extract one specific memory from the past day. The target is aware their mind is being read and can attempt to resist each round.
**Strong.** Extract memories from the past week. You can search for specific topics. The target feels discomfort but may not immediately realize the source.
**Critical.** Extract memories from the past month. You can search for specific topics with precision. The target is unaware of the intrusion unless they succeed on a Spirit + Insight check.

> **Design Note**: Fills R2 memory gap — bridges Surface Recall (R0) and Modify Memory (R4). Concentration and per-round resistance prevent casual abuse. Requires being within close range, limiting use to willing/restrained targets.

### Modify Memory

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Close | concentrate

*You reach into a creature's mind and alter their memories, reshaping their recollection of past events.*

**Weak.** You can alter one memory of the target from the past day. The alteration is minor — changing details, not inventing entire events. The target is unaware their memory has been changed.
**Strong.** You can alter memories from the past week. Alterations can be more substantial — adding or removing a person from a memory, changing the outcome of an event.
**Critical.** You can alter memories from the past month. You can create entirely false memories or erase real ones completely. The false memories feel entirely natural to the target.

> **Design Note**: R4 memory spell — fills the critical memory gap at a power level appropriate for significant mental manipulation.

### Psychic Maelstrom

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Long | concentrate

*You unleash a devastating storm of psychic energy that tears through the minds of all creatures in an area.*

**Weak.** All creatures in a short area take +6 psychic damage and are briefly dazed.
**Strong.** All creatures take +12 psychic damage and are dazed for a short duration. Creatures that fail their save by 3+ are confused instead.
**Critical.** All creatures take +18 psychic damage and are confused for a short duration. Creatures that fail by 6+ are dominated briefly — they act on your behalf until the end of their next turn.

> **Design Note**: R5 capstone. AoE at R5 uses half single-target scaling (+6/+12/+18). The condition escalation (dazed → confused → dominated) rewards high casting rolls.
