# Scene & Time Scale Procedures — Design Analysis

This document proposes an overhaul of the scene and time scale system for Nexus RPG. The goal is to standardize how actions are handled across time intervals, introduce dice timers as a unified pacing mechanic, clarify action economy, and provide clear guidance for event/encounter rolls. This is a game design analysis for future implementation—not a direct rules change.

Inspired by Knave 1E/2E, Shadowdark, and the Challenge System from issue #149.

---

## Design Goals

- Provide lightweight, flexible procedures applicable at every time scale (encounter, delving, exploration, travel, downtime).
- Clearly define which activities consume an "action" (a full turn) and which are free at a given scale.
- Introduce **Dice Timers** as a shared, manipulable pacing resource for scenes.
- Establish a standardized **Event Die** roll when timers expire.
- Allow GMs and players to add custom actions without breaking the framework.
- Keep overhead low: the system should speed up play, not slow it down.

---

## Core Concepts

### Dice Timers

A **Dice Timer** is a countdown that measures how many major actions remain before an event occurs in the current scene. It replaces ad-hoc "after X turns, something happens" rulings with a visible, shared mechanic.

- **Starting Value**: The GM sets the timer at the beginning of a scene (typically a d6, starting at 6).
- **Tick Down**: Each major action (one turn's worth of activity) reduces the timer by 1.
- **Trigger**: When the timer reaches 0, the **Event Die** is rolled as part of the final action's resolution.
- **Visibility**: The timer is a shared resource—both the GM and players know its current value.

**Why d6?** A d6 timer gives roughly 6 major actions before an event fires. This hits a sweet spot: enough room for meaningful choices, short enough to create tension. GMs can adjust the starting value (d4 for urgent scenes, d8 or d10 for slower-paced ones) or use non-standard starts (e.g., begin at 4 instead of 6 for a scene already in progress).

### The Action Loop

When a PC or the GM undertakes a major activity governed by a timer, follow this standardized order:

1. **Tick**: Reduce the scene's dice timer by the specified amount (default: 1 for a single major action).
2. **Triggers**: Resolve any immediate time-based triggers (e.g., alarms, environmental shifts, NPC movements).
3. **Roll/Act**: Make the relevant roll(s) or execute the action (search, fight, disarm, negotiate, etc.).
4. **Results**: Apply results, consequences, and any timer effects (actions that accelerate, delay, or reset the timer).

> **Example wording at the table**: "I want to search the room for treasure. That ticks the timer down by 1 (from 4 to 3). Now I roll Mind + Perception..."

### The Event Die

When a dice timer hits 0, roll the **Event Die** to determine what happens. The Event Die uses the same severity table already established in the travel system, scaled to the scene's context.

| Event Die Result | Event Type | General Examples |
| --- | --- | --- |
| 1 (good) | Something lucky or helpful | Discover a shortcut, find unexpected aid |
| 2–3 (neutral) | Nothing remarkable | Ambient atmosphere, minor flavor detail |
| 4–6 (bad) | Something dubious or potentially harmful | Resource drain, minor hazard, unwanted attention |
| 7–9 (perilous) | Something violent or aggressive | Wandering monsters, trap triggers, hostile NPCs |
| 10–11 (dire) | Something very dangerous | Elite enemies, collapsing environment, ambush |
| 12 (catastrophic) | Something terrifyingly bad | Boss encounter, total environmental collapse |

**Event Die Size**: The base die size depends on the scene's danger level and can be modified by player actions:

| Scene Danger | Base Event Die |
| --- | --- |
| Safe / Low risk | d8 (skews toward neutral) |
| Moderate risk | d6 (standard) |
| High risk | d4 (skews toward bad) |
| Extreme danger | d4, roll twice take worse |

**Resetting the Timer**: After an event fires, the GM resets the timer to its starting value (or a new value, if the situation has changed). The scene continues until its goal is achieved or made impossible.

---

## Action Economy

### What Counts as an Action (Ticks the Timer)

An **action** is any activity that consumes a meaningful amount of time at the current scale. The definition shifts with the time interval:

| Time Interval | One Action ≈ | Examples of Actions |
| --- | --- | --- |
| Encounter | 5–10 seconds | Attack, cast a spell, dash, use an item |
| Delving | 5–10 minutes | Search a room, pick a lock, disable a trap, move to the next room |
| Exploration | 2–4 hours | Navigate a stretch of wilderness, track a creature, set up camp |
| Travel | ~1 day | Hike a full day's route, forage/hunt for the day, rest and resupply |
| Downtime | ~1 week | Craft an item, research a topic, train a skill, gather rumors |

### What Is Free (Does Not Tick the Timer)

Activities that take **significantly less time** than the current turn scale are free. They do not reduce the timer.

| Time Interval | Free Activities |
| --- | --- |
| Encounter | Speak a short sentence, drop an item, glance around |
| Delving | Brief conversation, swap a held item, peek through a doorway |
| Exploration | Short discussion, check a map, eat a quick meal |
| Travel | Brief rest stop, conversation while walking, consult notes |
| Downtime | Run an errand, visit a shop, have a meeting |

**Rule of Thumb**: If you would not narrate it as a separate scene beat or a player would not expect to "spend their turn" on it, it is free.

### Accelerated and Delayed Actions

Some actions interact with the timer beyond the default tick of 1:

- **Rushed actions** (noisy search, reckless movement): Tick the timer by 1 as normal, but may trigger additional timer penalties (e.g., loud actions add +1 tick, effectively consuming 2 ticks).
- **Careful actions** (methodical search, slow approach): May take 2 ticks but grant a bonus (e.g., +1 boon on the roll).
- **Group actions**: When the entire party acts together on a single task, it still costs only 1 tick, but only one character rolls (with bonuses from helpers, per the core assist rules).

---

## Timer Manipulation

Dice timers are not a passive countdown. Both the GM and players can influence them, making them a meaningful tactical resource.

### Player Manipulation

| Manipulation | Effect | Example |
| --- | --- | --- |
| **Quiet approach** | No extra ticks | Sneaking past a room instead of searching it |
| **Spend a resource** | Pause or slow the timer by 1 | Use a supply (oil, torch, ration) to buy time |
| **Take a shortcut** | Skip ticks (but risk consequences) | Dash through a trapped corridor without checking |
| **Clever action** | Reset or extend the timer | Barricade a door, create a distraction |

### GM Manipulation

| Manipulation | Effect | Example |
| --- | --- | --- |
| **Loud/reckless player action** | Extra tick (+1) | Smashing a door, yelling, setting off an alarm |
| **Environmental escalation** | Reduce timer by 1–2 | Rising water, spreading fire, collapsing ceiling |
| **NPC interference** | Immediate tick | Enemy patrol passes nearby, trap triggers remotely |
| **Calm restored** | Extend timer by 1 | Players neutralize a threat source, seal a breach |

---

## Procedures by Time Scale

Each time interval uses the same core loop (tick → triggers → roll → results) but has its own flavor, typical actions, and event tables. Below are procedure templates for each scale.

### Encounter Procedure (Seconds)

Encounters already have a well-defined turn structure in the combat rules. Dice timers in encounters are used for **environmental pressure** rather than replacing initiative.

**When to use a timer**: Collapsing buildings, rising water, ritual countdowns, reinforcement arrivals.

**Typical timer**: d4 or d6 (2–6 rounds before the event fires).

**Event examples**: Ceiling collapses (area damage), reinforcements arrive (add enemies), ritual completes (major effect), escape route closes.

### Delving Procedure (Minutes)

Delving is where dice timers shine brightest. Dungeon exploration is a natural fit for "X actions before something happens."

**Setup**: GM sets a d6 timer at the start of each dungeon level or zone.

**Actions that tick**:
- Move from one room/corridor to the next
- Search a room thoroughly
- Pick a lock or disable a trap
- Take a short rest
- Have an extended conversation or negotiation
- Attempt to solve a puzzle

**Free activities**:
- Brief dialogue (a few sentences)
- Swap equipped items
- Glance into an adjacent room
- Check for obvious exits

**Event Die**: Roll when timer hits 0 using a dungeon-specific event table (see example below).

### Exploration Procedure (Hours)

Exploration covers wilderness movement toward an unknown or partially known destination. Each action represents a few hours of activity.

**Setup**: GM sets a d6 timer for each leg of exploration (e.g., "finding the hidden watchtower in the forest").

**Actions that tick**:
- Navigate through the environment for a stretch
- Track a creature or follow a trail
- Build a shelter or make camp
- Investigate a discovered site in detail
- Decipher inscriptions, runes, or maps

**Free activities**:
- Quick discussion about direction
- Eat a meal while resting
- Consult a map briefly
- Note landmarks

**Event Die**: Roll using a terrain-appropriate encounter table (forest, desert, swamp, etc.).

### Travel Procedure (Days)

Travel already has detailed procedures (Navigator, Scout, Forager, etc.). Dice timers integrate as an additional pacing layer over multi-day journeys.

**Setup**: The existing travel system uses the Event Die at the end of each travel stretch. A dice timer can wrap around multi-day journeys: set a d6 timer for the journey, tick once per day of travel, and roll the Event Die when it expires (in addition to or instead of daily encounter rolls).

**Integration note**: The travel system's Scout role already modifies the Event Die size. This is fully compatible—the Scout adjusts the die rolled when the timer fires.

### Downtime Procedure (Weeks)

Downtime timers are used for long-form activities where external pressure exists (e.g., a rival faction is also researching the same artifact, a siege is approaching, a political deadline looms).

**Setup**: GM sets a d6 timer representing weeks. Each downtime action (crafting, researching, training, networking) ticks the timer.

**Event Die**: When the timer fires, roll to see how the external situation has changed (rival progress, political shifts, resource availability).

---

## Custom Actions

GMs and players should feel free to create custom actions within the framework. The only requirement is to answer three questions:

1. **Does it tick the timer?** If the activity consumes a meaningful amount of time at the current scale, it ticks (default: 1 tick).
2. **What skill roll applies?** Choose the most appropriate attribute + skill combination from the existing list.
3. **What are the consequences?** Define results for at least weak, strong, and critical success (and optionally failure/blunder).

> **Example custom action (Delving)**: *Reinforce a doorway* — Tick the timer by 1. Roll Strength + Crafting. On a weak success, the door holds for 1 event cycle. On a strong success, it holds for 2 cycles. On a critical, it holds indefinitely and grants +1 boon to the party's next action in this room.

---

## Example: Dungeon Delving with Dice Timers

This example shows a complete dice timer setup for a dungeon crawl scenario.

### Setup

- **Scene**: Delving into a waterlogged ruin beneath an ancient temple.
- **Timer**: d6, starting at 6. Reduces by 1 for each major activity (move, search, short rest, etc.).
- **Event Die**: d6 (moderate danger).

### Dungeon Event Table (d6)

| d6 | Event |
| --- | --- |
| 1 | **Attack!** Water Weird tendrils emerge from damp walls or animated vines lash out. Roll on the encounter table below. |
| 2 | **Wear and Tear.** Moisture corrodes metal, stone dust abrades surfaces. Each adventurer chooses one item: worn equipment or weapons require a Durability check, other items lose 1 use. |
| 3 | **Light Fades.** Torches sputter in the damp air. Roll a Supply check to light a new torch or refill lantern oil. |
| 4 | **Delve Shift.** The dungeon breathes. Roll d3: [1] Water level rises 1 foot (difficult terrain in low areas, aquatic creatures become more active). [2] Temperature drops—cold wind from an unknown source (next check suffers +1 bane). [3] Pressure change—distant rumbling from deeper areas (wandering creatures drawn toward noise). |
| 5 | **Traces.** Signs of passage: wet footprints leading deeper, fresh claw marks on the walls, or disturbed dust around a water basin. |
| 6 | **Ambient.** Torches flicker in the cold draft. Bioluminescent spores drift peacefully through the air. Nothing happens. |

### Encounter Table (for Event 1)

| d6 | Creature |
| --- | --- |
| 1 | 1d3 Animated Vines |
| 2 | Water Weird tendril-scout |
| 3 | 2d4 Ankheg Hatchlings (lost from deeper levels) |
| 4 | 1 Vegepygmy scout |
| 5 | 1d2 Darkmantle-Blooms |
| 6 | Roll twice and combine |

### Play Example

> **Turn 1** — The party enters the ruin. Timer: 6 → 5. They move into the first chamber. No triggers. The GM describes the dripping walls and shallow water.
>
> **Turn 2** — The rogue searches the chamber for traps. Timer: 5 → 4. She rolls Mind + Perception. Strong success: she spots a pressure plate and a hidden alcove with a potion.
>
> **Turn 3** — The fighter forces open a rusted gate to the next corridor. Timer: 4 → 3. The GM rules this is loud—an extra tick applies. Timer: 3 → 2. The fighter rolls Strength + Athletics. Weak success: the gate opens, but the noise echoes.
>
> **Turn 4** — The party moves cautiously into the next room. Timer: 2 → 1.
>
> **Turn 5** — The wizard examines carved runes on the wall. Timer: 1 → 0. **Event fires!** The GM rolls the Event Die (d6): result is 4 (Delve Shift). The GM rolls d3: result is 1. The water level rises by a foot—the lower corridors are now difficult terrain.
>
> The GM resets the timer to 6. The delve continues.

---

## Integration with Existing Systems

### Compatibility with Current Scenes & Time Intervals

The dice timer system does **not replace** the existing time interval definitions (Encounter, Delving, Exploration, Travel, Downtime). Instead, it provides an optional pacing layer that sits on top of any time interval. GMs can use timers when they want structured tension and skip them when free-form narration is more appropriate.

### Compatibility with the Travel System

The travel system already uses an Event Die and role-based procedures (Navigator, Scout, Forager, etc.). Dice timers integrate naturally:

- For **short journeys** (1–3 days): The existing daily procedure is sufficient. No timer needed.
- For **long journeys** (4+ days): A d6 timer can wrap around the journey, with each day ticking the timer. When it fires, roll a major event in addition to daily encounters. This creates a "journey arc" with rising tension.

### Compatibility with the Challenge System (Issue #149)

Dice timers are drawn directly from the Challenge System concept. Challenges that involve time pressure (e.g., "disarm the trap before the ceiling lowers") use the same timer mechanic. This analysis formalizes that concept and extends it to all scene types.

---

## Summary

| Concept | Description |
| --- | --- |
| **Dice Timer** | A countdown (default d6 starting at 6) that ticks down with each major action. |
| **Action** | Any activity consuming a meaningful amount of time at the current scale. Ticks the timer by 1 (default). |
| **Free Activity** | Any activity taking negligible time at the current scale. Does not tick the timer. |
| **Event Die** | Rolled when the timer hits 0. Determines what happens (good → catastrophic). |
| **Timer Manipulation** | Players and GMs can speed up, slow down, or reset timers through actions and choices. |
| **Custom Actions** | Any action that answers: Does it tick? What do you roll? What happens on success/failure? |
| **Scalability** | The same loop works at every time interval: encounter, delving, exploration, travel, downtime. |
