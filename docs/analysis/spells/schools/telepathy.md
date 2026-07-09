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

Framework: [synergy-framework.md](../../../../.claude/skills/spell-design/references/synergy-framework.md) — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Telepathy emits: **the opened mind** — *dazed*, *confused*, *charmed* (a target whose mental footing is already broken), and **stolen knowledge** (read thoughts, foresight, a psychic link planted in a mind). Its setups are invisible in the fiction: no burning flesh, just a target who hesitates, trusts, or reveals.

**Payoff levers** — Telepathy escalates control: a *charmed* or *dazed* mind resists the next, deeper intrusion worse (suggestion lands where domination of a fresh mind would fail), and stolen knowledge cashes in everywhere — the read thought becomes the perfect lie in the social scene, the foreseen swing becomes the dodged blow. Cold-cast deficit: full domination of an unprepared, alert mind should be unreliable or above-rank; the ladder charm → suggestion → command *is* the pricing.

**Extenders** — *prolong* via the standing link (Mental Link keeps the channel open scene-long), *refresh* by re-dazing with cantrip psychic taps, and *convert* — the school's signature — each rung of influence transforms into the next (dazed → charmed → commanded).

**Solo engine** (multi-turn): T1 Mind Blast (*dazed*, footing broken) → T2 Subtle Suggestion into the reeling mind → T3 Forced Suggestion once trust is planted, walking the target off the battlefield entirely. Gated by Resist rolls at every rung, by concentration, and by the fiction — visible puppetry turns the whole room hostile (principle 33: mind magic is feared, and its use has social consequences).

**Party interlock**: **emits** *dazed*, *confused*, *charmed* — mental disruption every attacker exploits (a confused enemy swings at nobody; a charmed guard opens the gate without a fight) — plus **intelligence** (patrol routes, passwords, intentions) that shapes the party's whole plan. **wants** martial pressure that forces enemy attention away from the caster, and *frightened* (Illusion, War) since a shaken mind is easier to crack. Cross-player line: Illusion's horror show breaks the captain's nerve, then Telepathy's suggestion tells the terrified man exactly where to run.

**Synergy gaps**: the influence ladder is strong in theory but has R3+ holes (Invade Dreams incomplete, no published high-rank domination), so the *convert* chain currently dead-ends. Combat payoff is also thin — beyond a boon vs charmed/dazed there is no published spell that spends an opened mind for decisive effect. Both are design targets.

**Synergy gap proposals** (sketches, post-framework — design fresh per current principles):
- **Mind Fracture** (R2, payoff) — drive a psychic spike into a mind that is already *dazed*, *confused*, or *charmed*: psychic damage (ignore AV) and the existing condition extends. Against a clear-headed target the spell fizzles to minor damage — the deficit is explicit.
- **Puppet's Step** (R3, payoff/convert) — seize the limbs of a *charmed* or *confused* creature for one moment: they immediately move up to their speed and make one weapon attack at a target of your choice, then know what they did. The ladder's combat rung — horrifying in the fiction, tier-capped, Resist-rolled.
- **Break the Will** (R4, convert capstone) — full domination, castable only against a creature currently *charmed* by you: the charm deepens into obedience for a short duration (tier cap constant, re-rolls on damage). Completes dazed → charmed → commanded as an actual spell chain instead of theory.

## Current Spell Inventory (19 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Detect Magic, Mental Link, Mind Blast |
| 1 | 7 | Attack Thoughts, Borrowed Tongue, Control Beast, Foresight, Identify, Subtle Suggestion, True Strike |
| 2 | 6 | Counterspell, Forced Suggestion, Psychic Wave, Psychometry, Sending, Wave of Madness (incomplete) |
| 3 | 1 | Invade Dreams (incomplete) |
| 4 | 2 | Astral Body, Mass Hold |
| 5 | 0 | — |

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

**Coverage**: all 30 trait×rank slots have at least a concept seed (published spell or proposed concept). Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).

**Spells per rank**: R0: 5, R1: 9, R2: 6, R3: 6, R4: 6, R5: 5 — minimum 3 per rank met at all ranks

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Seed |
|---|---|---|
| Surface Recall | 0 | You brush against a creature's thoughts, skimming their most recent experiences like fingers across still water. (R0 memory cantrip) |
| Commanding Thought | 0 | You project a single, forceful thought into a creature's mind, compelling a moment of obedience. (R0 domination cantrip) |
| Mental Shield | 1 | You fortify a mind with psychic barriers, shielding against mental intrusion. (R1 Quick Action reactive defense) |
| Memory Echo | 1 | You reach into a creature's mind and pull forth a vivid echo of a recent experience, reliving it through their senses. (R1 memory spell) |
| Mindspeak | 1 | You forge a sustained mental bridge between yourself and another mind, allowing silent conversation across any distance. (R1 communication spell) |
| Telepathic Bond | 2 | You forge a silent mental link between yourself and nearby creatures, allowing wordless communication across any distance. (R2 communication spell) |
| Memory Sieve | 2 | You probe deeper into a creature's memories, extracting specific information with methodical precision. (R2 memory spell) |
| Implant Suggestion | 3 | You plant a deep mental command in a creature's mind, burying it beneath their conscious thoughts where it takes root like a seed of compulsion. (R3 influence spell) |
| Psychic Lance | 3 | You focus your mental power into a razor-sharp lance of psychic energy and drive it into a single creature's mind, shattering their concentration and overwhelming their senses. (R3 damage spell) |
| Psychic Probe | 3 | You plunge into a creature's mind like a blade, cutting through surface thoughts to expose their deepest intentions and hidden plans. (R3 insight spell) |
| Seize Will | 3 | You overpower a creature's will with your own, seizing control of their body and actions like a puppeteer grasping invisible strings. (R3 domination spell) |
| Deep Memory Dive | 3 | You plunge into the deepest recesses of a creature's mind, descending through layers of forgotten experiences to dredge up memories buried by time. (R3 memory spell) |
| Modify Memory | 4 | You reach into a creature's mind and reshape their recollections, reweaving the threads of their past like a weaver at a loom of stolen experiences. (R4 memory spell) |
| Mass Domination | 4 | You impose your will on multiple minds simultaneously, seizing control of a group of creatures like a tyrant commanding an army of puppets. (R4 domination capstone) |
| Shatter Psyche | 4 | You assault a creature's deepest sense of self, driving a spike of psychic force through their identity until their mind fractures under the pressure. (R4 influence damage spell) |
| Mind Network | 4 | You weave a web of psychic threads connecting the minds of many, creating a silent network of shared thought that spans any distance. (R4 communication spell) |
| Prescient Awareness | 4 | You open your mind to the surface thoughts of every creature nearby, reading their intentions before they act — an unsettling web of precognition that turns the battlefield transparent. (R4 insight combat spell) |
| Psychic Maelstrom | 5 | You unleash a devastating psychic storm, an invisible hurricane of mental anguish that tears through every mind in range, leaving shattered thoughts and broken wills in its wake. (R5 AoE capstone with material cost (5,000 coins)) |
| Absolute Control | 5 | You seize total control of a creature's mind, body, and actions — crushing their will beneath yours until they are nothing but an extension of your desires. (R5 domination capstone with material cost (5,000 coins)) |
| Astral Communion | 5 | You project your psychic voice across the boundaries of reality itself, reaching through the veil between planes to touch a distant mind. (R5 communication capstone with material cost (5,000 coins)) |
| Omniscient Eye | 5 | You open your mind completely, becoming a nexus of psychic awareness that perceives every thought, every intention, every hidden presence within an enormous radius. (R5 insight capstone with material cost (5,000 coins)) |
| Mindwipe | 5 | You seize the totality of a creature's memories and unmake them — erasing, rewriting, or fabricating an entire lifetime of experiences with the cold precision of a scribe scratching through parchment. (R5 memory capstone with material cost (5,000 coins)) |

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
- [ ] All trait × rank gaps filled: all 30 trait×rank slots seeded with concepts; published coverage is partial (see inventory) coverage (100%)
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
