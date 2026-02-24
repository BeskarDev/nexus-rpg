# Challenges System — Design Analysis

This document proposes a streamlined sub-system called **Challenges** for resolving dramatic, time-pressured scenes in Nexus RPG. Challenges provide a unified mechanic for chases, research, tracking, social intrigue, and any scene where progress must be measured against difficulty and urgency. This is a game design analysis for future implementation—not a direct rules change.

Inspired by the Clocks mechanic from Blades in the Dark, the dice timer framework in [Scene & Time Scale Procedures](scene-timescale-procedures.md), and issue #149.

---

## Design Goals

- Provide a **streamlined, gameable** sub-system that GMs can deploy and modify at the table with minimal preparation.
- Prioritize **player agency and creativity**: challenges frame the situation, but players choose their approach.
- Make **urgency and time pressure** the core dramatic driver—only use challenges when the stakes involve time, risk, or opposition.
- Keep difficulty and length as **separate, independently tunable** axes.
- Offer **plug-and-play templates** for common dramatic scenes.
- Integrate cleanly with the existing dice timer mechanic from the [Scene & Time Scale Procedures](scene-timescale-procedures.md).

---

## Core Concepts

### What Is a Challenge?

A **Challenge** is a structured way to resolve a complex task or dramatic scene that requires multiple steps to complete. Instead of a single skill roll, a challenge tracks cumulative progress through a series of rolls, each representing a meaningful attempt to overcome the obstacle.

Challenges answer three questions at once:

1. **How long is this?** → The challenge die (d4, d6, d8, etc.) determines the number of successful steps required.
2. **How hard is this?** → The Target Number (TN) determines how difficult each step is.
3. **What happens if we're too slow?** → An optional timer creates urgency and consequences for delay.

### Challenge Dice (Progress Tracker)

A challenge uses a single die (or multiple dice for compound challenges) placed on the table showing its **maximum value**. This represents the total progress required to complete the challenge.

- Each **successful skill test** reduces the die value by 1.
- A **critical success** (6+ above TN) reduces the die value by 2.
- When the die reaches **0**, the challenge is completed.

The die is a visible, shared tracker—both the GM and players can see exactly how much progress remains.

> **Example**: A d6 chase challenge starts at 6. The ranger rolls a strong success—die drops to 5. Next round, the rogue rolls a critical—die drops to 3. Four more successes (or two criticals) to go.

### Dice Size = Length, Not Difficulty

The size of the challenge die represents **duration, distance, or complexity** in terms of the number of steps required—not the difficulty of each individual step.

| Die | Steps | Best For |
| --- | ----- | -------- |
| d4 | 4 | Short, urgent tasks (quick escape, brief negotiation, short pursuit) |
| d6 | 6 | Standard challenges (typical chase, moderate research, standard tracking) |
| d8 | 8 | Extended challenges (complex investigation, long pursuit, deep negotiation) |
| d10 | 10 | Major undertakings (epic journey segments, grand rituals, political campaigns) |
| d12 | 12 | Monumental efforts (siege-scale events, world-shaping research, legendary quests) |

> **Design note**: d4 and d6 are expected to cover the vast majority of challenges. Use d8+ sparingly and only when the scene's narrative scope justifies many steps. An overly long challenge risks becoming tedious rather than tense.

### Difficulty via Target Number (TN)

Difficulty is set entirely by the **Target Number** of the skill rolls, independent of the die size. The TN reflects the challenge's inherent difficulty and may scale with character level to remain relevant across tiers of play.

| Difficulty | TN | When to Use |
| ---------- | -- | ----------- |
| Medium | 8 | Standard opposition, familiar terrain, cooperative NPCs |
| Hard | 10 | Trained opposition, rough terrain, reluctant NPCs |
| Very Hard | 12 | Expert opposition, hostile environment, antagonistic NPCs |
| Extreme | 14 | Elite opposition, lethal conditions, powerful enemies |
| Legendary | 16 | Near-impossible, mythic-scale obstacles, divine interference |

The GM announces the TN before the challenge begins so players can make informed decisions about their approach.

### Approach Adjustments

Players are encouraged to find **clever solutions** or take **calculated risks** that temporarily adjust the TN for a single roll within the challenge.

| Approach | TN Effect | Examples |
| -------- | --------- | ------- |
| **Clever/creative** | −2 TN for one roll | Use local knowledge to find a shortcut, exploit a weakness, recall critical lore |
| **Risky/reckless** | −2 TN for one roll, but failure consequences are worse | Sprint through a trapped corridor, bluff a powerful enemy, take a dangerous leap |
| **Cautious/methodical** | +2 TN for one roll, but failure consequences are lessened | Proceed slowly, double-check work, take the safe route |

The GM adjudicates whether an approach qualifies. Approach adjustments apply to **one roll only**—the overall challenge TN remains as announced.

> **Example**: During a d6, TN 10 chase, the rogue says, "I want to cut through the market stalls—it's risky but faster." The GM agrees: this roll is TN 8, but on failure the rogue crashes into a stall and takes damage. The rest of the chase remains TN 10.

---

## Skill Tests as Reductions

Each step of a challenge is resolved as a standard skill test (Attribute Die + 1d6 + Skill Rank vs. TN). The result determines how much progress is made and what consequences occur.

### Success Level Effects

| Result | Progress | Consequence |
| ------ | -------- | ----------- |
| **Critical Success** (6+ above TN) | −2 to challenge die | Bonus effect (GM's choice or from template) |
| **Strong Success** (3–5 above TN) | −1 to challenge die | Minor bonus (advantage on next roll, recover a resource, gain information) |
| **Weak Success** (0–2 above TN) | −1 to challenge die | Progress, but at a cost (minor complication, resource spent, position worsened) |
| **Failure** (below TN) | No progress | Consequence (lose ground, alert enemies, take damage, waste resources) |
| **Blunder** (6+ below TN) | No progress | Severe consequence (injury, major setback, challenge die increases by 1) |

> **Design note**: The difference between weak and strong success matters. In a lethal system, even successful progress should sometimes come with friction. This keeps tension high without making the challenge feel unfair.

### Skill Flexibility

Different characters can contribute different skills to the same challenge, as long as the player can justify how the skill applies. The GM sets which skills are **primary** (obvious fits) and which are **secondary** (creative applications, possibly at a harder TN or with +1 bane).

> **Example**: In a tracking challenge, Survival is the primary skill. But a player argues that their character's Education (knowledge of animal migration patterns) could help identify the quarry's likely route. The GM allows it as a secondary skill at +1 bane.

### Turn Order in Challenges

Challenges are not strictly turn-based in the combat sense. Instead:

- **Solo challenges**: One character makes all the rolls, with other characters potentially assisting (per core assist rules).
- **Group challenges**: Characters take turns making rolls, each contributing one attempt per round. The challenge die tracks total group progress.
- **Parallel challenges**: Multiple characters each face their own challenge die simultaneously (e.g., each character must cross a hazard independently).

---

## Timers and Urgency

Challenges become dramatically compelling when paired with **timers** from the [Scene & Time Scale Procedures](scene-timescale-procedures.md). A timer creates a hard deadline: if the timer expires before the challenge is complete, the situation changes—usually for the worse.

### Challenge + Timer Structure

When a challenge has a timer:

1. **Challenge die**: Tracks progress toward the goal (reduced by player successes).
2. **Timer die**: Tracks time remaining before an event fires (reduced automatically, one tick per round/action).

Both dice sit on the table. Players can see their progress and the ticking clock simultaneously.

> **Example**: Disarming a trap before the ceiling lowers. Challenge: d6 (six steps to disarm), TN 10. Timer: d4 (four rounds before the ceiling crushes everyone). The party needs to reduce the challenge die to 0 before the timer hits 0.

### Timer Trigger Conditions

Timers may include **trigger conditions** that accelerate, delay, or modify the countdown beyond the default tick-per-action. These reflect the narrative context of the scene.

| Trigger Type | Effect | Examples |
| ------------ | ------ | ------- |
| **Acceleration** | Timer ticks down by an extra 1 | Loud actions during a stealth challenge, failed rolls during a chase (quarry gains ground) |
| **Delay** | Timer ticks up by 1 (gaining time) | Clever distraction, spending a resource, ally creates a diversion |
| **Reset** | Timer resets to starting value | Major environmental change, new escape route discovered |
| **Instant fire** | Timer immediately hits 0 | Catastrophic failure, alarm triggered, structural collapse |

> **Example**: A d4 combat timer counts down to enemy reinforcements. Normally it ticks once per round. But if a PC uses a loud spell (fire blast, thunderclap), the timer ticks by 2 instead of 1—reinforcements arrive sooner.

### Challenges Without Timers

Not every challenge needs a timer. Some challenges are purely about the difficulty and consequences of each step, without external time pressure. In these cases, the challenge die alone provides structure.

> **Example**: A research challenge (d8, TN 12) to decipher an ancient text. There is no immediate deadline—the scholars can work at their own pace. But each failure still has consequences (wasted resources, misleading conclusions, attracting unwanted attention).

---

## Consequences and Rewards

### Default Failure Consequences

When a player fails a skill test during a challenge, the GM applies a consequence appropriate to the scene. The following table provides defaults that can be customized per template.

| Category | Description | Examples |
| -------- | ----------- | ------- |
| **Lose ground** | The opposition gains an advantage | Quarry pulls ahead in a chase, enemy repositions in combat |
| **Alert enemies** | Stealth or subtlety is compromised | Guards are alerted, target becomes suspicious, alarm sounds |
| **Resource loss** | Something is consumed or damaged | Supplies spent, equipment takes a Durability check, ammunition lost |
| **Take damage** | Physical or mental harm | Fall damage, psychic strain from forbidden lore, exhaustion |
| **Position worsened** | The situation becomes harder | Next roll gains +1 bane, TN increases by 2 for one roll, terrain shifts |
| **Time lost** | The timer advances faster | Timer ticks by an extra 1, trigger condition fires early |

### Default Blunder Consequences

Blunders (6+ below TN) trigger severe consequences chosen by the GM. In addition to any failure consequence, the GM may apply one of:

- The **challenge die increases by 1** (progress is reversed).
- A **new complication** is introduced (additional obstacle, enemy, or hazard).
- A **character condition** is applied (injured, frightened, exhausted, disoriented).
- The **timer instantly ticks by 2** (if a timer is active).

### Rewards for Exceptional Success

Critical successes and strong successes provide benefits beyond progress:

| Result | Potential Rewards |
| ------ | ----------------- |
| **Critical success** | Reduce challenge die by 2. Choose one: gain useful information, recover a resource, gain +1 boon on next roll, bypass a complication. |
| **Strong success** | Reduce challenge die by 1. Choose one: gain minor information, remove a bane, reposition favorably. |

---

## Constructing a Challenge (GM Guidance)

### Step 1: Define the Situation

Identify the dramatic question the challenge answers:

- **What are the players trying to accomplish?** (Catch the thief, decipher the scroll, navigate the storm.)
- **What makes this hard?** (The thief knows the streets, the scroll is in a dead language, the storm is supernatural.)
- **What happens if they fail or run out of time?** (The thief escapes, the knowledge is lost, the ship sinks.)

### Step 2: Set the Length (Challenge Die)

Choose a die size based on the narrative scope of the task:

- **Quick and urgent** (d4): A few moments of frantic activity. Best for scenes within encounters or tight time windows.
- **Standard** (d6): The default. A scene with enough steps to feel meaningful without dragging. Use this when in doubt.
- **Extended** (d8): A longer endeavor requiring sustained effort. Good for multi-session projects or complex obstacles.
- **Major** (d10–d12): Reserved for campaign-scale challenges or truly monumental tasks.

### Step 3: Set the Difficulty (TN)

Choose a TN based on the opposition, environment, and character tier:

- Start at **TN 8** (Medium) for standard challenges where trained characters should succeed more often than not.
- Raise to **TN 10** (Hard) for challenges involving trained opposition or harsh conditions.
- Use **TN 12+** (Very Hard and above) sparingly—these should feel genuinely dangerous.

> **Tip**: A d4 challenge at TN 12 is very different from a d8 challenge at TN 8. The first is short but brutal (few chances, each must count). The second is long but manageable (many chances, but resources drain). Use the combination to create the right feel.

### Step 4: Add a Timer (Optional)

If the scene has external time pressure, add a timer die from the [Scene & Time Scale Procedures](scene-timescale-procedures.md):

- Choose the timer die size (d4 for extreme urgency, d6 for standard pressure, d8 for looming threats).
- Define what happens when the timer expires (reinforcements arrive, the exit collapses, the ritual completes).
- Define any trigger conditions that accelerate or delay the timer.

### Step 5: Define Consequences and Rewards

Customize what happens on failure, blunder, and exceptional success. Use the default tables as starting points, then add scene-specific flavor.

### Step 6: Identify Applicable Skills

List 2–3 **primary skills** (obvious fits for the challenge) and note that **secondary skills** may apply with GM approval (possibly at +1 bane or with narrative justification required).

### Quick Construction Reference

| Parameter | Question | Default |
| --------- | -------- | ------- |
| **Challenge die** | How many steps to complete? | d6 |
| **TN** | How hard is each step? | TN 8 (Medium) |
| **Timer** | Is there external time pressure? | None (add d4–d8 if needed) |
| **Timer trigger** | What accelerates/delays the timer? | Scene-specific |
| **Primary skills** | What skills obviously apply? | 2–3 skills |
| **Failure consequence** | What happens when a roll fails? | Lose ground / position worsened |
| **Blunder consequence** | What happens on a catastrophic fail? | Challenge die +1 / new complication |
| **Critical reward** | What bonus does a critical grant? | −2 progress + bonus effect |

---

## Challenge Templates

The following templates are **plug-and-play** examples for common dramatic scenes. GMs should customize consequences, skills, and flavor to fit their specific situation.

### Chase

A pursuit through streets, wilderness, rooftops, or any terrain where one party tries to catch or escape another.

| Parameter | Value |
| --------- | ----- |
| **Challenge die** | d6 (standard pursuit) or d4 (short sprint) |
| **TN** | TN 10 (Hard) — urban streets, open terrain. Adjust for conditions. |
| **Timer** | Optional. d4 if the quarry has a specific escape route (carriage, boat, portal). |
| **Primary skills** | Athletics, Perception, Survival (wilderness), Streetwise (urban) |
| **Secondary skills** | Stealth (cut through shadows), Influence (shout for help to block the path), Nature (read animal trails) |

**Consequences by Result**:

| Result | Effect |
| ------ | ------ |
| **Critical** | −2 progress. You close the gap dramatically or find a perfect shortcut. Gain +1 boon on next roll. |
| **Strong** | −1 progress. You gain ground and spot an opportunity ahead. |
| **Weak** | −1 progress, but you take a minor hit (scrape, fatigue, drop a small item). |
| **Failure** | No progress. The quarry gains ground. If a timer is active, it ticks by 1 extra. |
| **Blunder** | No progress. You trip, crash into an obstacle, or alert bystanders. Take damage or gain a condition (prone, winded). Challenge die +1. |

**Approach Examples**:
- *Clever*: "I cut through the tannery—the smell will slow them down." → TN 8 for this roll.
- *Risky*: "I leap across the gap between rooftops." → TN 8, but on failure: fall damage + prone.

---

### Escape

Breaking free from captivity, fleeing a collapsing structure, or getting out of a dangerous area before it's too late.

| Parameter | Value |
| --------- | ----- |
| **Challenge die** | d4 (urgent escape) or d6 (complex escape) |
| **TN** | TN 10 (Hard) — guarded prison, collapsing ruin. TN 8 for poorly secured areas. |
| **Timer** | Recommended. d4 (guards return, ceiling collapses, flood rises). |
| **Primary skills** | Athletics, Stealth, Crafting (improvised tools) |
| **Secondary skills** | Streetwise (know the layout), Perception (spot weaknesses), Fighting (overpower a guard) |

**Consequences by Result**:

| Result | Effect |
| ------ | ------ |
| **Critical** | −2 progress. You find an unguarded route or break through a barrier instantly. |
| **Strong** | −1 progress. Clean escape step—no complications. |
| **Weak** | −1 progress, but you leave evidence behind or make noise. |
| **Failure** | No progress. Alert level increases (timer ticks extra) or an obstacle blocks the path. |
| **Blunder** | No progress. You're spotted, trapped, or injured. Challenge die +1 or immediate confrontation. |

---

### Research

Investigating a mystery, deciphering ancient texts, analyzing evidence, or uncovering hidden knowledge over time.

| Parameter | Value |
| --------- | ----- |
| **Challenge die** | d6 (standard investigation) or d8 (complex research project) |
| **TN** | TN 10 (Hard) — obscure topic. TN 12 for forbidden or ancient knowledge. TN 8 for well-documented subjects. |
| **Timer** | Optional. d6 if rivals are also researching, d4 if there's an imminent deadline. |
| **Primary skills** | Education, Lore, Arcana (magical research), Mysticism (divine/spiritual research) |
| **Secondary skills** | Insight (connect disparate clues), Perception (notice overlooked details), Streetwise (find informants), Nature (botanical/ecological research) |

**Consequences by Result**:

| Result | Effect |
| ------ | ------ |
| **Critical** | −2 progress. A breakthrough—you also learn something unexpected and valuable. |
| **Strong** | −1 progress. Solid findings; you're on the right track. |
| **Weak** | −1 progress, but you consume a resource (rare ink, borrowed book, contact's favor). |
| **Failure** | No progress. Misleading information or dead end. Next roll gains +1 bane (confusion). |
| **Blunder** | No progress. False conclusion leads you astray. Challenge die +1 or you attract unwanted attention (cult, rival scholar, authorities). |

---

### Tracking

Following a creature, person, or group through wilderness, urban environments, or hostile territory.

| Parameter | Value |
| --------- | ----- |
| **Challenge die** | d4 (fresh trail, close quarry) or d6 (cold trail, distant quarry) |
| **TN** | TN 8 (Medium) — clear terrain, obvious tracks. TN 10 for rough terrain or evasive quarry. TN 12 for magically concealed trails. |
| **Timer** | Optional. d6 if the quarry is actively fleeing (trail goes cold). |
| **Primary skills** | Survival, Perception, Nature |
| **Secondary skills** | Insight (predict behavior), Education (knowledge of species habits), Streetwise (urban tracking via informants) |

**Consequences by Result**:

| Result | Effect |
| ------ | ------ |
| **Critical** | −2 progress. You find definitive evidence—a campsite, a dropped item, a direct sighting. Gain +1 boon on next roll. |
| **Strong** | −1 progress. Clear trail sign; you're closing in. |
| **Weak** | −1 progress, but the trail is ambiguous. Next roll is at standard TN (no bonus). |
| **Failure** | No progress. Trail goes cold or leads to a false direction. If a timer is active, it ticks extra. |
| **Blunder** | No progress. You're led into a hazard (ambush site, quicksand, territorial predator) or lose the trail entirely. Challenge die +1. |

---

### Social Intrigue

Navigating a tense negotiation, swaying a court, uncovering a conspiracy, or manipulating a social situation over multiple exchanges.

| Parameter | Value |
| --------- | ----- |
| **Challenge die** | d6 (standard negotiation) or d8 (complex political maneuvering) |
| **TN** | TN 10 (Hard) — resistant but rational NPCs. TN 12 for hostile or entrenched opponents. TN 8 for sympathetic audiences. |
| **Timer** | Optional. d4 if patience is limited (audience with a king, market closing). |
| **Primary skills** | Influence, Insight, Education (etiquette, law, history) |
| **Secondary skills** | Stealth (plant evidence), Lore (invoke cultural precedent), Streetwise (leverage contacts), Perception (read the room) |

**Consequences by Result**:

| Result | Effect |
| ------ | ------ |
| **Critical** | −2 progress. You win a key ally, expose a rival's weakness, or shift the crowd's mood decisively. |
| **Strong** | −1 progress. Your argument lands well; the opposition softens. |
| **Weak** | −1 progress, but you reveal something about your own position or owe a favor. |
| **Failure** | No progress. Your argument falls flat or backfires. Opposition hardens; next roll gains +1 bane. |
| **Blunder** | No progress. You insult someone powerful, reveal a secret, or trigger a hostile response. Challenge die +1 or lose an ally. |

---

### Exploration

Navigating through unknown or hazardous terrain to reach a specific goal (hidden temple, lost city, mountain pass) before conditions worsen.

| Parameter | Value |
| --------- | ----- |
| **Challenge die** | d6 (standard expedition) or d8 (deep wilderness, uncharted territory) |
| **TN** | TN 8 (Medium) — manageable terrain with landmarks. TN 10 for featureless or hostile environments. TN 12 for supernaturally obscured areas. |
| **Timer** | Recommended. d6 (weather changes, supplies dwindle, pursuit closes in). |
| **Primary skills** | Survival, Nature, Perception |
| **Secondary skills** | Athletics (difficult terrain), Education (cartography, geology), Lore (ancient landmarks), Arcana (detect magical interference) |

**Consequences by Result**:

| Result | Effect |
| ------ | ------ |
| **Critical** | −2 progress. You find a clear route or landmark. Gain useful information about what lies ahead. |
| **Strong** | −1 progress. Steady advancement; you spot signs of your destination. |
| **Weak** | −1 progress, but conditions worsen slightly (weather shifts, minor injury, supplies consumed). |
| **Failure** | No progress. You're turned around or blocked. If a timer is active, it ticks extra. |
| **Blunder** | No progress. You wander into a hazard (creature lair, natural disaster, cursed ground). Challenge die +1 or take damage. |

---

## Compound Challenges

Some dramatic scenes involve **multiple simultaneous objectives**. These are resolved using **compound challenges**—two or more challenge dice running in parallel, each tracking a separate objective.

### Structure

- Each objective has its own challenge die and may have its own TN.
- Characters split their efforts between objectives each round.
- A shared timer (if any) applies to all objectives simultaneously.

### Example: Siege Defense

The party must defend a gate while evacuating civilians:

- **Hold the gate**: d6 challenge, TN 10, using Fighting, Athletics, Fortitude.
- **Evacuate civilians**: d4 challenge, TN 8, using Influence, Athletics, Streetwise.
- **Timer**: d6 — enemy siege engine is being prepared. When it fires, the gate takes catastrophic damage.

Each round, players decide who works on which objective. Both challenges must be completed (or the timer must be stopped) to fully succeed. Partial success is possible—the gate falls but the civilians escape, or the gate holds but some civilians are trapped.

---

## Timer Examples

### Combat Timer: Reinforcements

**Situation**: The party is fighting guards in a watchtower. Enemy reinforcements are on the way.

- **Timer**: d4, starting at 4. Ticks once per combat round.
- **Trigger (acceleration)**: Any loud action (smashing doors, fire spells, shouting) causes an extra tick.
- **Trigger (delay)**: A character spends their action barricading a door—timer ticks up by 1.
- **On expiry**: 2d4 additional guards arrive from the barracks.

### Exploration Timer: Rising Floodwater

**Situation**: The party is exploring a canyon during monsoon season.

- **Timer**: d6, starting at 6. Ticks once per exploration action (approximately 2–4 hours).
- **Trigger (acceleration)**: Heavy rain begins (GM decision)—timer ticks by 2 instead of 1.
- **Trigger (delay)**: Party finds and clears a drainage channel—timer ticks up by 2.
- **On expiry**: Flash flood. All characters in low areas must roll Strength + Athletics vs. TN 12 or be swept away, taking significant damage and losing equipment.

### Downtime Timer: Political Deadline

**Situation**: The party must uncover evidence of a noble's treason before the council votes.

- **Timer**: d6, starting at 6. Ticks once per downtime action (approximately one week).
- **Trigger (acceleration)**: The noble learns the party is investigating—timer ticks by 2 (they move the vote earlier).
- **Trigger (delay)**: An ally on the council stalls proceedings—timer ticks up by 1.
- **On expiry**: The vote proceeds without evidence. The noble's influence grows and the party faces political consequences.

---

## Interaction with Existing Systems

### Relationship to Dice Timers

The Challenges system builds directly on the dice timer framework from the [Scene & Time Scale Procedures](scene-timescale-procedures.md). Timers provide the **urgency layer** (external time pressure), while challenges provide the **progress layer** (player-driven advancement toward a goal). When combined, they create scenes where players must balance speed and care.

Key distinction:

- **Timer**: Ticks down automatically (one per action/round). Represents external pressure the players cannot directly reduce.
- **Challenge**: Ticks down only on successful rolls. Represents a goal the players must actively work toward.

### Relationship to Combat

Challenges do not replace combat. They complement it by providing structure for **non-combat dramatic scenes** and for **objectives within combat** (disarm the ritual circle while fighting cultists, collapse the bridge before the army crosses).

### Relationship to Skill Tests

A challenge is not a replacement for a single skill test. Use a single roll when the task is simple, immediate, and binary (succeed or fail). Use a challenge when:

- The task has **multiple stages** or requires sustained effort.
- There is **meaningful time pressure** or opposition.
- You want to create **dramatic tension** across several rolls.
- **Multiple characters** can contribute in different ways.

---

## Summary

| Concept | Description |
| ------- | ----------- |
| **Challenge die** | A die (d4–d12) placed at max value, reduced by player successes. Tracks progress toward a goal. |
| **TN** | Target Number for each skill test within the challenge. Sets difficulty independent of length. |
| **Critical success** | Reduces challenge die by 2 + bonus effect. |
| **Strong success** | Reduces challenge die by 1 + minor bonus. |
| **Weak success** | Reduces challenge die by 1, but with a minor cost. |
| **Failure** | No progress + consequence. |
| **Blunder** | No progress + severe consequence (challenge die may increase by 1). |
| **Timer** | Optional paired die that ticks automatically, creating time pressure (from Scene & Time Scale Procedures). |
| **Trigger conditions** | Scene-specific events that accelerate, delay, reset, or instantly fire a timer. |
| **Approach adjustments** | Clever/risky/cautious actions that temporarily modify the TN for one roll. |
| **Compound challenges** | Multiple challenge dice for scenes with parallel objectives. |
| **Templates** | Pre-built challenge structures for Chase, Escape, Research, Tracking, Social Intrigue, and Exploration. |
