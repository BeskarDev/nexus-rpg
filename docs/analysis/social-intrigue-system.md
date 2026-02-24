# Social Intrigue System — Design Analysis

This document proposes a dedicated sub-system called **Social Intrigue** for resolving negotiations, persuasion, deception, alliance-building, and other multi-step social encounters in Nexus RPG. Social Intrigue provides a formal, repeatable structure for dramatic roleplay scenes where multiple exchanges shape the outcome—moving beyond single skill rolls into mechanically rich social challenges. This is a game design analysis for future implementation—not a direct rules change.

Inspired by the Negotiations mechanics from MCDM's Draw Steel, the [Challenges System](challenges-system.md), and the [NPC Relations](../02-adventurers/05-npc-relations.md) framework already in Nexus RPG.

---

## Design Goals

- Build on the existing **Challenge system** (challenge dice, target numbers, timers) rather than creating a parallel resolution mechanic.
- Introduce **Interest** and **Patience** as social-specific resources that give NPCs visible, trackable attitudes during negotiations.
- Formalize **Motivations** and **Pitfalls** as GM-facing tools that make NPC behavior predictable and actionable for players who invest effort in reading the room.
- Support **multi-party scenes** where several NPCs or factions hold different positions, each with their own Interest and Patience.
- Ensure the system rewards **player creativity and roleplay** — mechanics frame the situation; players choose their approach.
- Integrate cleanly with existing skills (Influence, Insight, Education, Stealth, Streetwise, Lore, Perception) and the [NPC disposition system](../02-adventurers/05-npc-relations.md).
- Keep the system **modular** — GMs can use it for a quick marketplace haggle or a multi-session political campaign without changing the core loop.
- Maintain the **bounded power ceiling** — even a grandmaster negotiator operates within mortal limits, not supernatural mind control.

---

## Core Concepts

### Relationship to the Challenge System

Social Intrigue encounters are a **specialized application** of the Challenge system. They use challenge dice, target numbers, success levels, and optional timers exactly as described in the [Challenges System](challenges-system.md). This document adds a social-specific layer on top — Interest, Patience, Motivations, and Pitfalls — that gives social scenes their own tactical texture without departing from the unified challenge framework.

**What carries over unchanged from the Challenge system:**
- Challenge dice (d4–d12) track progress toward the social goal.
- Target Numbers (TN 8–16) set difficulty for each roll.
- Success levels (Critical, Strong, Weak, Failure, Blunder) determine progress and consequences.
- Approach adjustments (clever, risky, cautious) modify individual rolls.
- Optional timers create urgency.

**What this document adds:**
- Interest and Patience as NPC-specific social resources.
- Motivations and Pitfalls as structured GM information.
- Social-specific consequences, rewards, and escalation rules.
- Multi-party negotiation guidance.
- Templates for common social encounter types.

### What Is a Social Intrigue?

A **Social Intrigue** is a structured challenge for resolving a social encounter that requires multiple exchanges — arguments, appeals, deceptions, demonstrations, or concessions — to reach a resolution. It covers any situation where a single Influence or Insight roll is insufficient to capture the dramatic weight of the interaction.

Use a Social Intrigue when:

- The NPC has **reasons to resist** and won't simply agree after one good argument.
- The outcome involves **meaningful stakes** — alliances, trade deals, political support, information, safe passage.
- **Multiple approaches** could work, and different party members could contribute in different ways.
- The interaction would benefit from **dramatic pacing** with rising tension and potential reversals.

Do **not** use a Social Intrigue for:

- Simple transactional exchanges (buying supplies from a friendly merchant).
- Interactions where the NPC has no reason to resist (asking an ally for publicly available information).
- Situations better resolved by a single skill test (a quick bluff to get past a distracted guard).

---

## Interest and Patience

The two resources that define an NPC's stance during a Social Intrigue are **Interest** and **Patience**. Both are visible to the GM and can be partially revealed to players through Insight rolls and narrative cues.

### Interest

**Interest** represents how invested the NPC is in the players' proposal — how much they want to cooperate, agree, or accept the deal. Interest starts at a level determined by the NPC's disposition and the nature of the request.

Interest functions as a **modifier to the challenge TN**. Higher Interest makes each roll easier; lower Interest makes each roll harder.

| Interest Level | Name | TN Modifier | Description |
| -------------- | ---- | ----------- | ----------- |
| 3 | **Eager** | −2 TN | The NPC actively wants this deal. They are looking for reasons to say yes. |
| 2 | **Receptive** | −1 TN | The NPC sees potential value. They are willing to hear the players out. |
| 1 | **Open** | +0 TN | The NPC is neutral. They need to be convinced but aren't opposed. |
| 0 | **Skeptical** | +1 TN | The NPC doubts the value. They need strong arguments or incentives. |
| −1 | **Resistant** | +2 TN | The NPC is actively opposed. Only leverage, exceptional arguments, or significant concessions will move them. |

**Starting Interest** is derived from the NPC's disposition toward the party (from the [NPC Relations](../02-adventurers/05-npc-relations.md) system) and the nature of the request:

| NPC Disposition | Base Interest |
| --------------- | ------------- |
| Intimate (+2) | Receptive (2) |
| Friendly (+1) | Open (1) |
| Indifferent (0) | Skeptical (0) |
| Suspicious (−1) | Skeptical (0) |
| Hostile (−2) | Resistant (−1) |
| Hateful (−3) | Resistant (−1) |

The GM adjusts the base Interest up or down by 1 based on how aligned the request is with the NPC's interests:

- **Well-aligned request** (the NPC would benefit): +1 Interest.
- **Neutral request** (no clear benefit or cost): +0 Interest.
- **Opposed request** (the NPC would lose something): −1 Interest.

> **Example**: The party wants a Friendly merchant (disposition +1, base Interest = Open/1) to smuggle goods past a rival guild. This request is risky for the merchant (opposed), so Interest drops by 1 to Skeptical (0). The challenge TN gains +1 from the NPC's skepticism.

### Interest Shifts During the Intrigue

Interest can shift during the encounter based on player actions and narrative events:

- **Appealing to a Motivation** (see below): +1 Interest (once per Motivation per scene).
- **Triggering a Pitfall** (see below): −1 Interest.
- **Offering a meaningful concession**: +1 Interest (GM discretion, must cost the party something real).
- **Critical success on a social roll**: +1 Interest (in addition to normal challenge progress).
- **Blunder on a social roll**: −1 Interest (in addition to normal blunder consequences).

Interest is capped at Eager (3) and bottoms out at Resistant (−1). If Interest ever drops below Resistant, the negotiation **breaks down immediately** — the NPC refuses further discussion.

### Patience

**Patience** represents how much longer the NPC is willing to continue the conversation. It functions as a **social timer** — a countdown that limits how many exchanges the players have before the NPC walks away, gets angry, or forces a decision.

Patience operates exactly like a timer from the [Challenges System](challenges-system.md) and the [Scene & Time Scale Procedures](scene-timescale-procedures.md), with social-specific trigger conditions.

| Patience Die | Exchanges | When to Use |
| ------------ | --------- | ----------- |
| d4 | 4 | Impatient NPC, hostile audience, time-pressured scene |
| d6 | 6 | Standard negotiation, most social encounters |
| d8 | 8 | Patient NPC, formal proceedings, extended diplomacy |

**Starting Patience** depends on the NPC's personality and the situation. The GM chooses the die size based on context — a busy market trader has d4 Patience, a council of elders deliberating has d8.

**Patience ticks down by 1** each time a player makes a social skill roll (whether it succeeds or not). This represents the NPC's finite willingness to engage.

**Patience trigger conditions** (modify the tick rate):

| Trigger | Effect | Examples |
| ------- | ------ | ------- |
| **Acceleration** | Patience ticks by an extra 1 | Repeated arguments, insults, obvious lies caught, triggering a Pitfall |
| **Delay** | Patience ticks up by 1 | Appealing to a Motivation, offering a concession, showing genuine respect |
| **Instant expiry** | Patience immediately drops to 0 | Threatening violence against a peaceful NPC, revealing you lied about a core claim, catastrophic blunder |

**When Patience runs out** (reaches 0), the NPC forces a resolution based on the current state of the challenge die:

- If the challenge die is at **half or less** of its starting value: the NPC agrees to a **partial deal** — they concede some points but not all, or they add unfavorable conditions.
- If the challenge die is **above half** of its starting value: the negotiation **fails** — the NPC refuses and their disposition may worsen by 1.

> **Design note**: Patience as a timer creates natural dramatic pacing. Players feel the clock ticking and must decide between taking safe approaches (which use up Patience) and risky gambits (which might fail but preserve Patience on success). This mirrors the tension that timers create in other challenge types.

---

## Motivations and Pitfalls

Motivations and Pitfalls are the GM's primary tools for making NPCs feel like real people with specific desires and vulnerabilities. They are prepared before the scene and revealed to players through roleplay cues and Insight checks.

### Motivations

A **Motivation** is something the NPC cares about — a desire, value, fear, or goal that can be leveraged to increase their Interest. Each NPC in a Social Intrigue has **1–3 Motivations** prepared by the GM.

When a player **appeals to a Motivation** through their argument, offer, or approach, the NPC's Interest increases by 1 (once per Motivation per scene). This does not require a roll — the player must simply incorporate the Motivation into their approach in a way the GM considers genuine and relevant.

**Motivation Categories:**

| Category | Description | Examples |
| -------- | ----------- | ------- |
| **Desire** | Something the NPC wants to gain | Wealth, status, revenge, a specific item, protection, land |
| **Value** | A principle the NPC holds dear | Honor, family, tradition, justice, pragmatism, loyalty |
| **Fear** | Something the NPC wants to avoid | Shame, poverty, violence, losing power, exposure of a secret |
| **Bond** | A relationship or obligation that influences the NPC | Loyalty to a patron, love for family, debt to an ally, rivalry with a faction |

> **Example**: A temple high priest has three Motivations: *Value: Tradition* (he respects proper ritual protocol), *Bond: Loyalty to the temple order* (he won't act against its interests), and *Fear: Loss of influence* (he worries about a rival faction gaining power). A player who frames their request as upholding temple tradition and protecting it from the rival faction appeals to two Motivations, raising Interest by 2.

### Discovering Motivations

Players can discover NPC Motivations through several means:

- **Prior knowledge**: If the party has an existing relationship with the NPC or has gathered intelligence beforehand, the GM may reveal one or more Motivations for free.
- **Insight check**: During the intrigue, a player can use their action to roll **Spirit + Insight** vs. the NPC's Resist. On a success, the GM reveals one Motivation the player hasn't yet identified. On a critical success, the GM reveals two.
- **Roleplay cues**: The GM should naturally weave Motivation hints into the NPC's dialogue and behavior — mentioning their family, referencing past slights, displaying religious symbols, etc. Attentive players can pick up on these without rolling.
- **Education or Lore check**: If the NPC belongs to a known culture, organization, or social class, a player can roll **Mind + Education** or **Mind/Spirit + Lore** to recall what typically motivates people in that position. On a success, the GM reveals one likely Motivation.

### Pitfalls

A **Pitfall** is a topic, behavior, or approach that offends, angers, or alienates the NPC. Each NPC has **1–3 Pitfalls** prepared by the GM.

When a player **triggers a Pitfall** — whether through ignorance, carelessness, or intentional provocation — the NPC's Interest drops by 1 and Patience ticks by an extra 1 (in addition to the normal tick for the roll).

**Pitfall Categories:**

| Category | Description | Examples |
| -------- | ----------- | ------- |
| **Taboo** | A cultural or personal subject that must not be raised | Mentioning a dead family member, disrespecting a sacred custom, using a forbidden title |
| **Insult** | A behavior the NPC finds disrespectful | Interrupting, speaking down to them, showing ignorance of their status, lying badly |
| **Threat** | Anything that makes the NPC feel endangered | Implying violence, mentioning their enemies, revealing knowledge of their secrets |
| **Rival association** | Connection to someone the NPC dislikes | Working for a competitor, bearing the symbols of an enemy faction, mentioning a rival by name approvingly |

> **Example**: A tribal chieftain has two Pitfalls: *Taboo: Mentioning the old king* (a painful subject) and *Insult: Speaking without being formally introduced* (a breach of protocol). A player who charges into the tent and immediately starts talking triggers the Insult Pitfall — Interest drops by 1 and Patience ticks by an extra 1.

### Discovering Pitfalls

Pitfalls are harder to discover than Motivations — they represent hidden social landmines:

- **Prior knowledge**: Existing relationships or intelligence may reveal known Pitfalls.
- **Insight check**: Same as for Motivations — a successful Insight check can reveal a Pitfall instead of (or in addition to) a Motivation, at the GM's discretion.
- **Education or Lore check**: Cultural knowledge can reveal common Pitfalls for a social group ("Never mention the old dynasty to the northern clans").
- **Perception check**: A player can roll **Spirit + Perception** to read the NPC's body language and notice when they are about to trigger a Pitfall ("You notice his jaw tightens when you mention the trade guild — you sense this is a sore subject").
- **The hard way**: Triggering a Pitfall and recognizing it from the NPC's reaction.

---

## Running a Social Intrigue

### Step 1: Set the Scene

Define the social situation:

- **Who are the players talking to?** Identify the NPC(s), their role, and disposition.
- **What do the players want?** Define the goal (alliance, information, safe passage, trade deal).
- **What does the NPC want?** Identify what the NPC is hoping to gain from this interaction.
- **What are the stakes?** Define what happens if the negotiation succeeds, partially succeeds, or fails.

### Step 2: Determine Interest and Patience

For each NPC involved:

1. Look up the NPC's **disposition** toward the party (from [NPC Relations](../02-adventurers/05-npc-relations.md)).
2. Determine **base Interest** from the disposition table above.
3. Adjust Interest by ±1 based on whether the request aligns with or opposes the NPC's own goals.
4. Choose a **Patience die** (d4/d6/d8) based on the NPC's personality and situational time pressure.

### Step 3: Set the Challenge

Using the standard Challenge system:

1. Choose a **challenge die** (d4–d8, rarely d10+) based on how many steps the negotiation requires.
2. Set a **base TN** (TN 8–14) based on the inherent difficulty of the request, before Interest modifiers.
3. The **effective TN** for each roll = base TN + Interest modifier.

> **Example**: Convincing a guild master to share trade secrets. Base TN 12 (Very Hard — this is sensitive information). NPC is Indifferent (Interest = Skeptical/0, modifier +1 TN). Effective TN = 13. This is very difficult — the party will need to find Motivations to raise Interest or make concessions. Challenge die: d6 (a standard negotiation requiring 6 successful exchanges).

### Step 4: Prepare Motivations and Pitfalls

Write down 1–3 Motivations and 1–3 Pitfalls for each NPC. Keep these hidden from the players. Plan how the NPC will naturally reveal hints during conversation.

### Step 5: Play the Intrigue

Each exchange follows this loop:

1. **Tick Patience** by 1 (before the roll, representing the NPC's time investment).
2. **Player declares approach**: What argument, appeal, deception, or action are they making? Which skill are they using?
3. **GM determines skill and TN**: Primary skills roll at the effective TN. Secondary skills may apply at +1 bane or a narrative justification requirement.
4. **Check for Motivations and Pitfalls**: Did the player appeal to a Motivation or trigger a Pitfall? Apply Interest shifts before the roll if the appeal/pitfall is in the approach itself, or after the roll if it emerges from the result.
5. **Roll**: Resolve as a standard skill test (Attribute Die + 1d6 + Skill Rank vs. effective TN).
6. **Apply results**: Progress, consequences, rewards, and any Interest/Patience changes.
7. **Check for resolution**: Has the challenge die reached 0 (success)? Has Patience run out (forced resolution)?

### Step 6: Resolve the Intrigue

When the challenge die reaches 0 or Patience expires, determine the outcome:

| Outcome | Condition | Effect |
| ------- | --------- | ------ |
| **Full success** | Challenge die reaches 0 with Patience remaining | The NPC agrees to the players' request. Disposition may improve by 1. |
| **Partial success** | Patience expires with challenge die at half or below starting value | The NPC agrees to a compromised version of the request — reduced scope, added conditions, or a favor owed. |
| **Failure** | Patience expires with challenge die above half starting value | The NPC refuses. Disposition may worsen by 1. The same approach won't work again without changed circumstances. |
| **Breakdown** | Interest drops below Resistant (−1) at any point | The NPC refuses immediately and may become hostile. Disposition worsens by 1. |

> **Design note**: The partial success outcome is critical for social encounters feeling fair. Even when Patience runs out, players who made significant progress should feel that their effort mattered. This avoids the frustration of "all or nothing" social mechanics.

### Quick Construction Reference

| Parameter | Question | Default |
| --------- | -------- | ------- |
| **Challenge die** | How complex is this negotiation? | d6 |
| **Base TN** | How inherently difficult is the request? | TN 10 (Hard) |
| **Interest** | How inclined is the NPC to cooperate? | Derived from disposition + request alignment |
| **Patience** | How long will the NPC listen? | d6 (standard) |
| **Motivations** | What does the NPC care about? | 1–3 per NPC |
| **Pitfalls** | What will offend or alienate the NPC? | 1–3 per NPC |
| **Primary skills** | What skills obviously apply? | Influence, Insight, Education |
| **Failure consequence** | What happens when a roll fails? | Argument falls flat, opposition hardens |
| **Blunder consequence** | What happens on a catastrophic fail? | Insult given, secret revealed, Interest drops |

---

## Skill Tests in Social Intrigue

### Primary Skills

These skills apply directly to most Social Intrigue encounters without requiring special justification:

| Skill | Typical Attribute | When to Use |
| ----- | ----------------- | ----------- |
| **Influence** | Spirit | Persuasion, intimidation, charm, performance, rallying, commanding, negotiating |
| **Insight** | Spirit | Reading the NPC's emotional state, detecting lies, predicting reactions, discovering Motivations/Pitfalls |
| **Education** | Mind | Invoking law, precedent, etiquette, cultural knowledge, logical arguments, formal protocol |

### Secondary Skills

These skills apply when players provide narrative justification. The GM may impose +1 bane or require specific conditions:

| Skill | When It Applies | Justification Needed |
| ----- | --------------- | -------------------- |
| **Stealth** | Planting false evidence, pickpocketing incriminating documents, slipping a note | Must describe the physical action |
| **Streetwise** | Leveraging underworld contacts, citing black-market prices, threatening reputation damage | Must have relevant urban connections |
| **Lore** | Invoking mythological precedent, religious authority, prophetic weight, sacred oaths | Must reference specific cultural or religious knowledge |
| **Perception** | Reading body language, noticing tells, spotting eavesdroppers, detecting poison in drinks | Must describe what you are observing |
| **Nature** | Negotiating with rural communities, appealing to agricultural concerns, demonstrating herbal knowledge | Must be contextually relevant to the NPC |
| **Arcana/Mysticism** | Demonstrating magical ability as leverage, identifying magical influences on the NPC | Must have relevant magical capability |

### Social Actions

During a Social Intrigue, players can take the following types of actions on each exchange. Each counts as one step (ticks Patience by 1) unless noted:

| Action | Description | Skill Examples |
| ------ | ----------- | -------------- |
| **Argue** | Present a logical case, make a demand, state terms | Spirit + Influence, Mind + Education |
| **Appeal** | Play on emotions, invoke shared bonds, flatter | Spirit + Influence, Spirit + Insight |
| **Deceive** | Lie, misdirect, present false evidence, bluff | Spirit + Influence, Agility + Stealth (with narrative justification) |
| **Investigate** | Read the NPC, discover Motivations or Pitfalls | Spirit + Insight, Spirit + Perception |
| **Leverage** | Use external pressure, threats, blackmail, favors | Spirit + Influence, Spirit/Mind + Streetwise |
| **Concede** | Offer something the NPC wants, make a trade | No roll required — automatically raises Interest by 1 |
| **Assist** | Help another party member's next social roll | Per core assist rules — does not tick Patience separately |

> **Design note**: The Investigate action is important because it does not directly advance the challenge die — it costs Patience but trades progress for information. This creates a meaningful tactical choice: spend a precious exchange learning what the NPC wants, or gamble on guessing correctly.

### Success Level Effects

| Result | Progress | Social Consequence |
| ------ | -------- | ------------------ |
| **Critical Success** (6+ above TN) | −2 to challenge die | Interest +1. Choose one: discover a Motivation or Pitfall, gain +1 boon on next roll, NPC volunteers useful information, or shift an allied NPC's disposition by +1. |
| **Strong Success** (3–5 above TN) | −1 to challenge die | Minor advantage: the NPC visibly warms, reveals a small detail about their position, or acknowledges the strength of the argument. |
| **Weak Success** (0–2 above TN) | −1 to challenge die | Progress, but the NPC pushes back — they make a counter-demand, express doubt, or note a weakness in the argument. The player may need to make a small concession. |
| **Failure** (below TN) | No progress | The argument falls flat. Next roll suffers +1 bane (the NPC is skeptical of this line of reasoning). |
| **Blunder** (6+ below TN) | No progress | Interest −1. The player has committed a social error — insult, exposed lie, or fumbled appeal. Challenge die increases by 1 or the NPC reveals hostility. |

---

## Multi-Party Negotiations

Many social encounters involve more than one NPC, each with their own agenda. Multi-party negotiations add complexity but also create opportunities for player strategy.

### Structure

- Each NPC (or faction) has their own **Interest** and **Motivations/Pitfalls**.
- All NPCs share a single **Patience** timer (representing the overall duration of the scene) unless the GM rules that a specific NPC has separate Patience (e.g., one participant has an urgent appointment).
- The encounter uses a **single challenge die** representing overall progress toward the party's goal. Different NPCs may be swayed at different rates — the GM narrates which NPCs shift based on which arguments succeed.

### Divided Attention

In multi-party scenes, each player's exchange targets a **specific NPC or faction**. The skill and approach should be tailored to that target's known Motivations and Pitfalls.

- A successful roll against **any** NPC reduces the shared challenge die, but Interest only shifts for the targeted NPC.
- A Pitfall triggered with **one** NPC does not affect others (unless the GM rules the social faux pas is public and damaging to the entire negotiation).

### Contested Negotiations

When another party (rival faction, opposing negotiator) is actively working against the players:

- The rival makes their own rolls on the GM's behalf, using the same success level effects but in reverse (their successes increase the challenge die or reduce Interest toward the players' proposal).
- Alternatively, the GM can represent rival interference as **trigger conditions** on the Patience timer — when the rival acts, Patience ticks by an extra 1, representing the NPC's attention being pulled away.

> **Example**: The party is petitioning a city council for military aid while a rival merchant guild argues against it. The council has d6 Patience and the challenge die is d6. Each round, one player makes a roll to convince the council (reducing the challenge die) while the rival guild leader makes a roll to undermine them (adding 1 to the challenge die on success or ticking Patience by an extra 1). The party must outpace the opposition before Patience runs out.

### Faction Alignment

In scenes with multiple NPCs, the GM tracks which NPCs have been swayed. When the challenge die reaches 0, the NPC(s) with the highest Interest agree first. Those with lower Interest may require additional concessions (partial success conditions) even when the overall negotiation succeeds.

---

## Escalation

Social Intrigues can escalate — the stakes rise, the tone shifts, or the situation becomes more dangerous. Escalation provides dramatic momentum and prevents negotiations from feeling static.

### Escalation Triggers

| Trigger | Effect |
| ------- | ------ |
| **Repeated failure** | After two consecutive failed rolls, the base TN increases by 2 for the remainder of the scene (the NPC is losing patience with this approach). |
| **Pitfall triggered twice** | If the same Pitfall is triggered a second time, the NPC delivers an ultimatum: the party must make a significant concession or the negotiation ends. |
| **Interest reaches Resistant** | The NPC openly expresses hostility. Further rolls to persuade them suffer +1 bane. Only a direct appeal to their strongest Motivation or a major concession can recover the situation. |
| **Patience below half** | The NPC begins wrapping up the conversation. They may offer a take-it-or-leave-it deal based on current progress. |
| **External event** | Something outside the negotiation changes the dynamic — a messenger arrives, a rival makes a move, a threat is revealed. The GM may adjust Interest, Patience, or introduce new Motivations/Pitfalls. |

### De-Escalation

Players can de-escalate through:

- **Appealing to a new Motivation** not yet used in the scene.
- **Making a genuine concession** (Interest +1, may also delay Patience by 1).
- **Changing the speaker** — a different party member takes the lead, potentially using different skills or a better rapport with the NPC.
- **Calling for a recess** — in formal settings, the party can request a break. This pauses the Patience timer but does not reset it. The party can use the break to gather intelligence, consult allies, or plan a new approach.

---

## Social Intrigue Templates

The following templates are **plug-and-play** examples for common social encounters. GMs should customize Interest levels, Motivations, Pitfalls, and consequences to fit their specific NPCs and situations.

### Negotiation

Bargaining for a deal, trade agreement, alliance terms, or mutual arrangement where both sides want something.

| Parameter | Value |
| --------- | ----- |
| **Challenge die** | d6 (standard deal) or d4 (quick bargain) |
| **Base TN** | TN 10 (Hard) — reluctant but rational counterpart. TN 8 for cooperative NPCs. TN 12 for hostile or entrenched positions. |
| **Patience** | d6 (standard). d4 for impatient merchants or busy officials. d8 for formal diplomatic proceedings. |
| **Primary skills** | Influence, Education (law, trade, protocol), Insight |
| **Secondary skills** | Streetwise (market knowledge, leverage), Lore (cultural precedent), Perception (reading tells) |

**Consequences by Result:**

| Result | Effect |
| ------ | ------ |
| **Critical** | −2 progress. Interest +1. You find common ground that benefits both sides — the NPC is visibly impressed. |
| **Strong** | −1 progress. Your offer resonates. The NPC moves toward agreement. |
| **Weak** | −1 progress, but the NPC makes a counter-demand — you owe a favor, accept a less favorable term, or reveal information about your position. |
| **Failure** | No progress. Your offer is rejected. Next roll suffers +1 bane as the NPC questions your position. |
| **Blunder** | No progress. Interest −1. You insult the NPC's intelligence, reveal desperation, or make a culturally inappropriate demand. Challenge die +1. |

**Example Motivations:** Profit, security, reputation, family welfare, political advantage.
**Example Pitfalls:** Mentioning a rival favorably, lowballing insultingly, ignorance of local customs, dishonesty discovered.

---

### Persuasion

Convincing an NPC to take a specific action, change their mind, or support a cause they would not normally back.

| Parameter | Value |
| --------- | ----- |
| **Challenge die** | d4 (simple request) or d6 (significant change of position) |
| **Base TN** | TN 10 (Hard) — the NPC has reasons to resist. TN 8 for sympathetic audiences. TN 12 for deeply held beliefs. |
| **Patience** | d4 (the NPC doesn't want to hear a long speech) or d6 (willing to listen but skeptical). |
| **Primary skills** | Influence, Insight, Education |
| **Secondary skills** | Lore (invoke authority or tradition), Nature (appeal to practical concerns), Perception (adjust approach based on reactions) |

**Consequences by Result:**

| Result | Effect |
| ------ | ------ |
| **Critical** | −2 progress. Interest +1. The NPC is genuinely moved — they may volunteer additional support beyond what was asked. |
| **Strong** | −1 progress. The NPC acknowledges your point and begins to shift. |
| **Weak** | −1 progress, but the NPC qualifies their agreement — "I'll do it, but not the way you described." |
| **Failure** | No progress. The NPC is unconvinced and reiterates their position. |
| **Blunder** | No progress. Interest −1. You push too hard, condescend, or say something that hardens the NPC's stance. |

---

### Deception

Convincing an NPC of something false — a fabricated identity, a misleading claim, planted evidence, or a hidden agenda.

| Parameter | Value |
| --------- | ----- |
| **Challenge die** | d4 (simple lie) or d6 (elaborate deception with multiple layers) |
| **Base TN** | TN 10 (Hard) — the NPC has no reason to suspect deception. TN 12 for suspicious or perceptive NPCs. TN 8 for gullible or distracted targets. |
| **Patience** | d4 (don't push your luck) or d6 (building a longer con). |
| **Primary skills** | Influence (fast-talking, charm), Stealth (disguise, sleight of hand), Education (forgery, legal bluffing) |
| **Secondary skills** | Insight (adjust lie based on NPC's reactions), Streetwise (underworld credibility), Lore (fabricate religious or mythological authority) |

**Consequences by Result:**

| Result | Effect |
| ------ | ------ |
| **Critical** | −2 progress. The NPC is fully taken in and may act on the false information immediately. |
| **Strong** | −1 progress. The lie holds. The NPC accepts your claim without further questioning. |
| **Weak** | −1 progress, but the NPC has a nagging doubt — they ask a follow-up question or seek corroboration later. |
| **Failure** | No progress. The NPC doesn't buy it. They may not realize you're lying, but they are unconvinced. Suspicion rises (next roll suffers +1 bane). |
| **Blunder** | No progress. Interest −1. The NPC catches the lie or spots a glaring inconsistency. They may confront you, call for guards, or spread word of your dishonesty. Trust may be permanently damaged. |

**Special Rule — Unraveling:** If the NPC later discovers the deception (through investigation, rival information, or events proving the lie false), the party's disposition with that NPC worsens by 2. Deception is a powerful tool with lasting consequences.

---

### Alliance Building

Forging a lasting partnership, military alliance, or political coalition with an NPC, faction, or community.

| Parameter | Value |
| --------- | ----- |
| **Challenge die** | d6 (single faction) or d8 (coalition of multiple groups) |
| **Base TN** | TN 10 (Hard) — alliances require trust. TN 12 for historically hostile factions. TN 8 for natural allies with shared enemies. |
| **Patience** | d6 (standard diplomatic timeline) or d8 (patient nation-states, religious orders). |
| **Primary skills** | Influence (leadership, rhetoric), Education (diplomacy, law, history), Insight (reading political undercurrents) |
| **Secondary skills** | Lore (invoking shared mythology or sacred oaths), Streetwise (offering underworld resources), Nature (promising land, resources, or ecological knowledge) |

**Consequences by Result:**

| Result | Effect |
| ------ | ------ |
| **Critical** | −2 progress. Interest +1. A breakthrough — the NPC or faction proposes additional terms in the players' favor. |
| **Strong** | −1 progress. Trust grows. The NPC agrees to a specific term or commitment. |
| **Weak** | −1 progress, but the NPC demands a reciprocal commitment — troops, resources, territory, or a sworn oath. |
| **Failure** | No progress. The NPC expresses concern about the alliance's viability. A faction member speaks against it. |
| **Blunder** | No progress. Interest −1. A diplomatic incident — the wrong thing is said to the wrong person. Challenge die +1 or a faction withdraws from discussions. |

**Special Rule — Oath Binding:** If the alliance is sealed with a sacred oath, sworn pact, or ritualized agreement (invoking Lore or Mysticism), both sides gain a mechanical bond: breaking the oath results in a −2 disposition shift and potential supernatural consequences (GM discretion, depending on the setting's magical nature of oaths).

---

### Interrogation

Extracting information from a reluctant or hostile subject — prisoners, witnesses, suspects, or captured enemies.

| Parameter | Value |
| --------- | ----- |
| **Challenge die** | d4 (the subject knows little or is close to breaking) or d6 (the subject has important secrets and strong resolve) |
| **Base TN** | TN 10 (Hard) — reluctant subject. TN 12 for trained agents or fanatically loyal subjects. TN 8 for frightened or low-resolve subjects. |
| **Patience** | d4 (the subject will clam up or break down quickly) or d6 (slow extraction, the subject has endurance). |
| **Primary skills** | Insight (reading emotional state, detecting lies), Influence (intimidation, persuasion, building rapport) |
| **Secondary skills** | Education (legal pressure, procedural knowledge), Streetwise (underworld threats, criminal leverage), Perception (detecting physical tells, monitoring stress) |

**Consequences by Result:**

| Result | Effect |
| ------ | ------ |
| **Critical** | −2 progress. The subject cracks and provides information beyond what was asked — names, locations, or plans. |
| **Strong** | −1 progress. The subject reveals a specific piece of information. |
| **Weak** | −1 progress, but the information is partial, vague, or requires interpretation. The GM provides a clue wrapped in ambiguity. |
| **Failure** | No progress. The subject resists, lies, or gives deliberately misleading information. |
| **Blunder** | No progress. Interest −1. The subject becomes defiant or shuts down entirely. Challenge die +1 or the subject becomes hostile (may attempt escape or provoke violence). |

**Special Rule — Coercion and Consequence:** Using threats of violence or actual coercion automatically grants +1 boon on Influence rolls but triggers the following: the information may be unreliable (subjects under duress say what they think the interrogator wants to hear), and the party's reputation suffers if word spreads (−1 disposition with any NPC who values honor, law, or mercy).

---

## Integration with Existing Systems

### Relationship to NPC Dispositions

The Social Intrigue system builds directly on the [NPC Relations](../02-adventurers/05-npc-relations.md) framework. NPC disposition determines starting Interest, and the outcome of a Social Intrigue can shift disposition — successful negotiations improve relationships, while failures and breakdowns worsen them. This creates a long-term arc where players invest in NPC relationships that pay off in future social encounters.

### Relationship to the Challenge System

Social Intrigue is a specialized application of the [Challenges System](challenges-system.md), not a replacement. The Social Intrigue template in the Challenges document covers simple social challenges; this system extends it for encounters that require the additional texture of Interest, Patience, Motivations, and Pitfalls. GMs should use:

- **The basic Social Intrigue challenge template** for straightforward social obstacles (a quick bribe, a simple persuasion, a brief interrogation).
- **The full Social Intrigue system** (this document) for scenes where NPC psychology, multi-step negotiation, and social consequences are central to the drama.

### Relationship to Talents

Several existing talent trees directly enhance Social Intrigue encounters:

| Talent | Skill | Social Intrigue Benefit |
| ------ | ----- | ----------------------- |
| **Fast Talking** | Influence | Re-roll a failed social roll once per scene; substitute your Influence for an ally's |
| **Inspire Ally** | Influence | Grant +1 boon on an ally's social roll as a Quick Action |
| **Born Haggler** | Influence | Improved results when the negotiation involves buying or selling |
| **Diplomat** | Education | Gain +1 boon on social rolls by leveraging cultural knowledge; use Education for Demoralize/Distract |
| **Eloquent Talker** | Education | Use Education instead of Influence for persuasion; re-roll social Education rolls; charm a target |
| **Empath** | Insight | Re-roll emotional reading rolls; gain +1 boon against a creature whose emotions you've read |
| **Piercing Look** | Insight | Gain +1 boon against a target and impose +1 bane on their rolls against you |
| **Sense of Deduction** | Insight | Make assessments about events and get true/false answers from the GM |
| **Roguish Wits** | Stealth | Re-roll rolls to convince someone of a falsehood |
| **Sleight of Hand** | Stealth | Plant false evidence or steal documents without detection |
| **I Know A Guy** | Streetwise | Find contacts who can provide leverage, information, or goods |
| **Jack of All Trades** | Streetwise | Substitute Streetwise for any non-magic skill once per scene |

### Relationship to Combat

Social Intrigue and combat are separate systems, but they can overlap:

- **Social encounters that devolve into violence**: If a negotiation breaks down badly (Interest drops below Resistant, a Blunder triggers hostility), the scene may transition to combat. Any information gained during the intrigue (Motivations, Pitfalls, NPC capabilities) carries over and should inform combat tactics.
- **Social actions during combat**: Some talents (Fast Talking Rank 3, Insult to Injury, Diplomat Rank 2) already allow social skills during combat. These remain available and do not require a full Social Intrigue framework — they operate as individual actions within the combat system.
- **Parallel objectives**: A compound challenge might combine a Social Intrigue (convince the king) with a simultaneous combat or stealth challenge (stop the assassin before they strike during the audience).

---

## Example: A Marketplace Negotiation

This example demonstrates a complete Social Intrigue encounter using the system.

### Setup

**Situation**: The party needs a merchant named Kaleth to smuggle a sealed crate past the harbor customs for them. Kaleth is a Seeker (merchant) with Friendly disposition (+1) toward the party — they've traded fairly in the past.

**Challenge die**: d4 (a quick negotiation — four successful exchanges needed).
**Base TN**: 10 (Hard — smuggling is illegal and risky for Kaleth).
**Interest**: Friendly (+1) = Open (1), but the request is opposed (−1) = Skeptical (0). Effective TN modifier: +1. **Effective TN = 11.**
**Patience**: d4 (Kaleth is busy preparing his ship for departure).

**Motivations**:
1. *Desire: Profit* — Kaleth wants coin. Offering above-market payment appeals to this.
2. *Fear: Customs authority* — Kaleth fears the harbor master. Showing you can neutralize this risk appeals to this.

**Pitfalls**:
1. *Threat: Mentioning his past smuggling* — Kaleth gets nervous if you imply you know about his previous illegal cargo. It feels like leverage, not partnership.
2. *Insult: Suggesting the job is easy* — Kaleth takes pride in the difficulty of his work. Minimizing the risk insults his expertise.

### Play

**Exchange 1** — Theron (the party's face) opens: "Kaleth, we need a discreet cargo run. We'll pay double the standard rate."

The player appeals to *Desire: Profit*. The GM confirms this is a valid Motivation appeal — Interest rises from Skeptical (0) to Open (1). TN modifier drops to +0. Effective TN is now 10.

Theron rolls Spirit (d8) + Influence (rank 2) + 1d6 vs. TN 10. Result: 12 (Strong Success). Challenge die drops from 4 to 3. Patience ticks from 4 to 3.

*"Double rate? That gets my attention. But what's in the crate?"*

**Exchange 2** — Mira (the party's scout) steps in to read Kaleth's body language. She uses the **Investigate** action.

Mira rolls Spirit (d10) + Insight (rank 2) + 1d6 vs. Kaleth's Resist (9). Result: 14 (Critical Success). The GM reveals both of Kaleth's Pitfalls. No challenge die progress (Investigate doesn't advance the challenge). Patience ticks from 3 to 2.

*Mira notices Kaleth glance nervously at the harbor master's tower when smuggling is mentioned. She also catches a flicker of pride when he describes his shipping routes.*

**Exchange 3** — Theron, armed with Mira's intelligence, avoids mentioning Kaleth's past and instead says: "We know the harbor master's patrol schedule. We can ensure your ship passes inspection cleanly. And we'd never call this job easy — only a sailor of your caliber could pull it off."

The player appeals to *Fear: Customs authority* (showing they can neutralize the risk). Interest rises from Open (1) to Receptive (2). TN modifier drops to −1. Effective TN is now 9.

Theron rolls Spirit (d8) + Influence (rank 2) + 1d6 vs. TN 9. Result: 11 (Weak Success). Challenge die drops from 3 to 2. Patience ticks from 2 to 1.

*"Hmm. You can handle the harbor master? That changes things. But I need assurance — if this goes wrong, I'm not taking the fall alone."*

**Exchange 4** — Patience is at 1. One more exchange. Theron offers a concession: "If anything goes wrong, we take full responsibility. Your name stays clean."

The GM rules this is a genuine concession (the party accepts legal risk). Interest rises from Receptive (2) to Eager (3). TN modifier drops to −2. Effective TN is now 8.

Theron rolls Spirit (d8) + Influence (rank 2) + 1d6 vs. TN 8. Result: 10 (Weak Success). Challenge die drops from 2 to 1. Patience ticks from 1 to 0.

**Resolution**: Patience has run out. Challenge die is at 1 (started at 4, now above half... wait, half of 4 is 2, and 1 is below 2). This is a **partial success** — Kaleth agrees, but with conditions: he'll do the job for triple rate instead of double, and he wants a letter of passage signed by the party in case he's caught. The party's relationship with Kaleth remains Friendly.

---

## Summary

| Concept | Description |
| ------- | ----------- |
| **Social Intrigue** | A multi-step challenge for resolving complex social encounters — negotiations, persuasion, deception, and alliance-building. |
| **Interest** | An NPC's willingness to cooperate, ranging from Eager (+3) to Resistant (−1). Modifies the effective TN of social rolls. Derived from disposition and request alignment. |
| **Patience** | A timer (d4–d8) representing how many exchanges the NPC will tolerate. Ticks down with each roll. When it expires, the current progress determines outcome. |
| **Motivations** | NPC desires, values, fears, and bonds that players can appeal to for +1 Interest. Discoverable through Insight, Education, Lore, or roleplay. |
| **Pitfalls** | NPC taboos, insults, threats, and rival associations that reduce Interest and accelerate Patience when triggered. |
| **Full success** | Challenge die reaches 0 before Patience expires. The NPC agrees to the request. |
| **Partial success** | Patience expires with the challenge die at or below half. The NPC agrees with conditions or reduced scope. |
| **Failure** | Patience expires with the challenge die above half. The NPC refuses. |
| **Breakdown** | Interest drops below Resistant at any point. Immediate refusal and potential hostility. |
| **Escalation** | Repeated failures or triggered Pitfalls increase difficulty. Can be de-escalated through new Motivations, concessions, or speaker changes. |
| **Multi-party** | Multiple NPCs each have their own Interest and Motivations but share a Patience timer. Rival interference adds opposition rolls or Patience acceleration. |
| **Templates** | Pre-built Social Intrigue structures for Negotiation, Persuasion, Deception, Alliance Building, and Interrogation. |
