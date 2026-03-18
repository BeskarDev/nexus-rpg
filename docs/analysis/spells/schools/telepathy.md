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

### Trait Coverage Gaps

| Trait | R0 | R1+ | Gap |
|-------|-----|------|-----|
| influence | ✅ | ✅ | — |
| communication | ✅ | ✅ (weak) | — |
| insight | ✅ | ✅ | — |
| domination | ❌ | ✅ (R1+) | Missing R0 domination cantrip |
| memory | ❌ | ❌ | **Missing at ALL ranks** — critical gap |

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
