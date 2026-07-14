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
4. **Heighten-first coverage**: memory reading and communication scale by Heighten on one entry (Memory Echo, Telepathic Bond, published Sending) rather than ladders of near-duplicate spells at each rank (principle 3).
5. **Domination is priced by the ladder**: cold full domination of an alert mind exists only at R5 (Absolute Control). Below that, control is reachable only by climbing dazed → charmed → commanded through payoff spells — the ladder IS the cold-cast pricing.

### Internal Synergies

Framework: `.claude/skills/spell-design/references/synergy-framework.md` — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Telepathy emits: **the opened mind** — *dazed*, *confused*, *charmed* (a target whose mental footing is already broken), and **stolen knowledge** (read thoughts, foresight, a psychic link planted in a mind). Its setups are invisible in the fiction: no burning flesh, just a target who hesitates, trusts, or reveals.

**Payoff levers** — Telepathy escalates control: a *charmed* or *dazed* mind resists the next, deeper intrusion worse (suggestion lands where domination of a fresh mind would fail), and stolen knowledge cashes in everywhere — the read thought becomes the perfect lie in the social scene, the foreseen swing becomes the dodged blow. Cold-cast deficit: full domination of an unprepared, alert mind should be unreliable or above-rank; the ladder charm → suggestion → command *is* the pricing.

**Extenders** — *prolong* via the standing link (Mental Link keeps the channel open scene-long), *refresh* by re-dazing with cantrip psychic taps, and *convert* — the school's signature — each rung of influence transforms into the next (dazed → charmed → commanded).

**Solo engine** (multi-turn): T1 Mind Blast (*dazed*, footing broken) → T2 Subtle Suggestion into the reeling mind → T3 Forced Suggestion once trust is planted, walking the target off the battlefield entirely. Gated by Resist rolls at every rung, by concentration, and by the fiction — visible puppetry turns the whole room hostile (principle 33: mind magic is feared, and its use has social consequences).

**Party interlock**: **emits** *dazed*, *confused*, *charmed* — mental disruption every attacker exploits (a confused enemy swings at nobody; a charmed guard opens the gate without a fight) — plus **intelligence** (patrol routes, passwords, intentions) that shapes the party's whole plan. **wants** martial pressure that forces enemy attention away from the caster, and *frightened* (Illusion, War) since a shaken mind is easier to crack. Cross-player line: Illusion's horror show breaks the captain's nerve, then Telepathy's suggestion tells the terrified man exactly where to run.

**Synergy gaps**: the influence ladder is strong in theory but has R3+ holes (Invade Dreams incomplete, no published high-rank domination), so the *convert* chain currently dead-ends. Combat payoff is also thin — beyond a boon vs charmed/dazed there is no published spell that spends an opened mind for decisive effect. Both targets are now seeded in the Proposed New Spells table below: *Mind Fracture* and *Psychic Maelstrom* (payoffs that spend an opened mind, with explicit cold-cast deficits), *Puppet's Step* and *Break the Will* (the convert chain's combat rung and capstone), and *Psychic Lance* (the in-combat convert extender that climbs the condition ladder).

## Current Spell Inventory (19 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Detect Magic, Mental Link, Mind Blast |
| 1 | 7 | Attack Thoughts, Borrowed Tongue, Control Beast, Foresight, Identify, Subtle Suggestion, True Strike |
| 2 | 6 | Counterspell, Forced Suggestion, Psychic Wave, Psychometry, Sending, Wave of Madness (incomplete) |
| 3 | 1 | Invade Dreams (incomplete) |
| 4 | 2 | Astral Body, Mass Hold |
| 5 | 3 | Absolute Control, Mindwipe, Psychic Maelstrom |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| influence | Mind Blast | Subtle Suggestion, Attack Thoughts | Forced Suggestion, Psychic Wave, Mind Fracture† | Implant Suggestion†, Psychic Lance† | Shatter Psyche† | Psychic Maelstrom† |
| communication | Mental Link | Borrowed Tongue | Sending, Telepathic Bond† | Invade Dreams* | Astral Body | — (Sending's R5 Heighten reaches other spheres) |
| insight | Detect Magic | Foresight, True Strike, Identify, Mental Shield† | Counterspell, Psychometry | Psychic Probe† | Prescient Awareness† | — |
| domination | Commanding Thought† | Control Beast | Wave of Madness* | Puppet's Step† | Break the Will† | Absolute Control† |
| memory | Surface Recall† | Memory Echo† | — (Memory Echo Heighten) | — (Memory Echo Heighten) | Modify Memory† | Mindwipe† |

*† = proposed seed (undesigned) · \* = incomplete spell in game files*

**Coverage**: 25 of 30 trait×rank slots hold a published spell or a seed. Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).

**Remaining Gaps** (deliberate — an honest empty cell beats a filler seed): memory R2–R3 and communication R5 are covered by Heighten cascades on lower entries (Memory Echo's timeframe scaling, Sending's cross-sphere R5 line), not by separate spells (principle 3). Insight R5 is genuinely open: an all-seeing mind capstone was cut for overlapping Prescient Awareness and for modernizing the setting into surveillance magic (principle 33). Fill it only if a batch finds a bounded concept.

**Spells per rank**: published R0: 3, R1: 7, R2: 6, R3: 1, R4: 2, R5: 0 (with seeds: 5 / 9 / 8 / 5 / 6 / 3). The 3-per-rank minimum is met at R0–R2 by published spells alone; R3–R5 depend entirely on seeds and are the school's real construction site.

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

Role = combat-role / synergy-role. Each seed names the trait(s) it expresses, the condition/state/gimmick it emits or exploits, and what it plugs into. Mind-reading and control seeds carry principle 33 constraints explicitly (resisted, target aware, once-per-target, seams that can be exposed) so the school never modernizes the Bronze Age setting.

| Concept | Rank | Role | Seed |
|---|---|---|---|
| Surface Recall | 0 | Utility / setup | Skim the trailing minute of a creature's memory: what they just saw, said, or did (their present thoughts belong to Mental Link). Resisted, and the GM answers from a bounded menu (a face, an action, a spoken phrase, a route taken) per principle 29. Memory trait at cantrip scale; emits stolen knowledge as setup for social payoffs. |
| Commanding Thought | 0 | Control / setup | Bark a single mental command of one word ("halt", "drop", "flee"). The target suffers +1 bane on their next action unless they comply. The influence ladder's first rung: a moment of hesitation, never obedience, at cantrip scale (principle 6). Opens the mind for the ladder to climb. |
| Mental Shield | 1 | Defense / standalone | Standardized R1 Quick Action reactive defense (principle 4): +2 to Dodge or Parry against the triggering attack. School secondary: briefly gain +2 Resist against mental effects. Weak-role entry mandated by internal completeness; shared-spell candidate with Peace (see Cross-School section). |
| Memory Echo | 1 | Utility / setup | Draw one specific memory of the past day from a close creature and relive it through their senses. Resisted, the target knows their mind was touched, once per target per day (principle 33 keeps interrogation rare and circumventable). Heighten extends the reach in time on the Psychometry model, (Rank 2) the past week, (Rank 3) anything the target clearly remembers, replacing separate deeper-dive spells at every rank (principle 3). |
| Mind Fracture | 2 | Offense / payoff | A psychic spike into a mind already dazed, confused, or charmed: psychic damage (ignore AV) and the existing condition's duration extends. Against a clear-headed target it fizzles to minor damage. The explicit cold-cast-deficit payoff the school's combat game was missing; also spends conditions allies emit (Illusion's confused, a fear-broken mind). |
| Telepathic Bond | 2 | Utility / extender | Link yourself and up to four willing creatures into a silent mental web for the scene, sharing words and simple images across any distance within the same region. The standing-link extender for party coordination. Heighten scales targets and duration rather than spawning larger network spells at higher ranks (principle 3). |
| Implant Suggestion | 3 | Control / extender | Bury a dormant suggestion beneath a creature's conscious mind, bound to a trigger you specify (a phrase heard, a person seen, a threshold crossed). Same bounds as its published siblings: a reasonable course of action, no harm to self or allies, resisted, and the target knows their mind was touched once it fires. The influence ladder's standing trap, converting a present intrusion into a future one. |
| Psychic Lance | 3 | Offense / extender | Drive a lance of psychic force into one mind: single-target psychic damage (ignore AV), and the school's convert gimmick in combat form: if the target is already dazed they become confused, if already confused they are briefly stunned. Climbs the condition ladder instead of restarting it; feeds Puppet's Step and Mind Fracture. |
| Psychic Probe | 3 | Utility / setup | Cut through a waking creature's surface thoughts to their intent: learn their present goal plus one item from a bounded menu (a fear, a held secret, a loyalty, a planned action), the GM picks what fits (principle 29). Resisted, the target feels the intrusion, once per creature per scene. Stolen intelligence as setup for suggestion spells and the party's plan. |
| Puppet's Step | 3 | Control / payoff | Seize the limbs of a charmed or confused creature for one moment: they immediately move up to their speed and make one weapon attack at a target of your choice, then know what they did. The ladder's combat rung, horrifying in the fiction. Tier-capped, Resist-rolled, and uncastable against a clear mind: the cold-cast deficit is absolute. |
| Break the Will | 4 | Control / payoff | Full domination, castable only against a creature currently charmed by you: the charm deepens into obedience for a short duration. Tier cap constant (principle 31), any damage or disturbance grants an immediate re-roll (principle 37). Completes dazed → charmed → commanded as an actual spell chain, priced below a cold dominate because the setup is the cost. |
| Modify Memory | 4 | Utility / standalone | Reweave one memory of the past day in a restrained or willing creature's mind: dim it, alter its details, or overlay a false version. Resisted, concentration over minutes, and the seam remains (a probing mind, Memory Echo, or contradicting evidence can unravel it). Master-working rarity keeps testimony-rewriting a feared crime, never a routine tool (principle 33). |
| Shatter Psyche | 4 | Offense / setup | The school's heaviest single-target strike: high psychic damage (ignore AV, deliberately a step under Evocation par) and the target's mental footing breaks: they are briefly confused and suffer +1 bane on their next Resist roll against your spells. Damage that opens the door for the influence ladder rather than ending the fight itself. |
| Prescient Awareness | 4 | Support / setup | Open a web of precognition while you concentrate: you and allies in close range cannot be surprised, you know the position of every hidden thinking creature in range, and attacks against you suffer +1 bane. Insight turned outward as party defense, emitting ambush-proof positioning rather than raw stacked boons. |
| Psychic Maelstrom | 5 | Offense / payoff | A storm of mental anguish in a medium area: moderate psychic damage (below Evocation par, the school's Weak Offense discount) and each target is briefly dazed. Targets already dazed, confused, or charmed take damage one step higher and are confused instead. The influence ladder's payoff at battlefield scale. Concentrate, material cost (5,000+). |
| Absolute Control | 5 | Control / standalone | The cold-cast cap of the influence ladder: dominate one creature without prior conditioning. Tier up to your Arcana (cap never scales, principle 31), concentrate, any damage or disturbance grants an immediate re-roll (principle 37), material cost (5,000+). Deliberately R5-priced so that below this rank domination is only reachable by climbing the ladder. |
| Mindwipe | 5 | Utility / standalone | Excise all memory of one subject (a person, a place, an event) from a restrained or willing creature's mind. Ritual over minutes, resisted, material cost (5,000+), and the excision leaves gaps the target can notice and others can expose. Never fabricates a lifetime: unmaking stays bounded so history remains recoverable in play (principle 33, mortal pinnacle). |

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
