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

When a dice timer hits 0, roll **1d6** on the scene's event table to determine what happens. Every time interval has its own generic event table, but all follow the same structure—a spectrum from immediate threat to ambient flavor:

| d6 | Category | What It Means |
| --- | --- | --- |
| 1 | **Threat** | An encounter or direct danger. Roll on an encounter table or introduce a hostile force. |
| 2 | **Wear** | Equipment or resources degrade. An item requires a Durability check or loses a use. |
| 3 | **Resource Drain** | A key resource is consumed or tested. Roll a Supply check or spend a use of something. |
| 4 | **Shift** | The environment or situation changes. Something mechanical shifts—terrain, conditions, NPC behavior. |
| 5 | **Traces** | A clue or sign of what lies ahead. Foreshadowing, tracks, sounds, or useful information. |
| 6 | **Ambient** | Atmosphere and flavor. Nothing mechanically significant happens. |

Each time interval provides its own themed version of this table (see Procedures by Time Scale below). GMs are encouraged to customize these tables further for specific adventures or locations.

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

Each time interval uses the same core loop (tick → triggers → roll → results) and the same 1d6 event table structure. Below are generic event tables and procedure templates for each scale. GMs should customize these tables to fit specific adventures.

### Encounter Procedure (Seconds)

Encounters already have a well-defined turn structure in the combat rules. Dice timers in encounters are used for **environmental pressure** rather than replacing initiative.

**When to use a timer**: Collapsing buildings, rising water, ritual countdowns, reinforcement arrivals.

**Typical timer**: d6 (6 rounds before the event fires). Use a lower starting value (3–4) for scenes already in progress or under extreme pressure.

#### Encounter Event Table (d6)

| d6 | Event |
| --- | --- |
| 1 | **Reinforcements!** More enemies arrive or an existing threat escalates. Roll on an encounter table or add 1d4 combatants to the opposing side. |
| 2 | **Wear and Tear.** The chaos of battle damages something. Each combatant chooses one held or worn item: it requires a Durability check or loses 1 use. |
| 3 | **Resource Strain.** A critical resource is consumed or threatened. A light source gutters, ammunition is scattered, or a consumable is knocked loose and must be recovered. |
| 4 | **Battlefield Shift.** The environment changes. Roll d3: [1] Cover collapses or terrain becomes difficult. [2] A new hazard appears (fire, falling debris, flooding). [3] An exit or path opens or closes. |
| 5 | **Opening.** A momentary advantage appears. A weak point in the enemy formation, an unguarded flank, or a piece of useful terrain becomes apparent. |
| 6 | **Ambient.** Dust swirls, thunder rumbles, or the ground trembles. Atmosphere, but nothing mechanically significant. |

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

#### Delving Event Table (d6)

| d6 | Event |
| --- | --- |
| 1 | **Attack!** Roll on the encounter table to see which creatures attack and how. |
| 2 | **Wear and Tear.** Each adventurer chooses one item they hold, carry, or wear: worn equipment or weapons require a Durability check, other items directly lose 1 use. |
| 3 | **Light Fades.** Roll a Supply check to light a new torch or refill lantern oil. |
| 4 | **Delve Shift.** The dungeon breathes. Roll on a delve shift table to see what changes and what the mechanical effect is (e.g., water rises, temperature drops, passages shift). |
| 5 | **Traces.** You find signs of a nearby encounter or a clue about your surroundings. |
| 6 | **Ambient.** Some ambient effect, but nothing else happens. |

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

#### Exploration Event Table (d6)

| d6 | Event |
| --- | --- |
| 1 | **Encounter!** A creature or group crosses your path. Roll on a terrain-appropriate encounter table to determine what appears and its disposition. |
| 2 | **Wear and Tear.** The terrain takes its toll. Each adventurer chooses one item: footwear, clothing, or a carried tool requires a Durability check, or a carried item loses 1 use. |
| 3 | **Provisions Dwindle.** Rations spoil, waterskins leak, or foraging turns up nothing. Roll a Supply check for provisions or water. |
| 4 | **Terrain Shift.** The environment changes around you. Roll d3: [1] Weather worsens (next check suffers +1 bane). [2] A path is blocked or flooded (detour required). [3] A natural hazard emerges (rockslide, sinkhole, flash flood). |
| 5 | **Traces.** You discover tracks, markings, old campsites, or other signs that hint at what lies ahead or nearby. |
| 6 | **Ambient.** Wind through the trees, birdsong, distant thunder. Atmosphere and scenery, but nothing significant occurs. |

### Travel Procedure (Days)

Travel covers multi-day journeys between known destinations. Each action represents roughly one day of marching.

**Setup**: GM sets a d6 timer for the journey or a significant leg of travel. Tick once per day of travel.

**Actions that tick**:
- Hike a full day's route
- Hunt or forage for the day
- Navigate through challenging terrain
- Rest and resupply at a waypoint

**Free activities**:
- Conversation while walking
- Consult a map or notes
- Brief rest stop
- Adjust carried gear

#### Travel Event Table (d6)

| d6 | Event |
| --- | --- |
| 1 | **Encounter!** You cross paths with creatures, travelers, or a hostile force. Roll on a region-appropriate encounter table to determine what you meet. |
| 2 | **Wear and Tear.** Long days on the road strain gear. Each adventurer chooses one item: worn armor, weapons, or tools require a Durability check, or a pack item loses 1 use. |
| 3 | **Provisions Dwindle.** Food runs low, water sources dry up, or stored rations go bad. Roll a Supply check for provisions. |
| 4 | **Route Shift.** Conditions change along the route. Roll d3: [1] Weather turns harsh (next day's travel suffers +1 bane). [2] A road or bridge is damaged or blocked (detour adds time). [3] Terrain becomes more difficult than expected (reduce progress). |
| 5 | **Traces.** Signs of other travelers, old markers, animal migrations, or distant smoke hint at what lies ahead or off the beaten path. |
| 6 | **Ambient.** A striking sunset, a cool breeze, or a peaceful night. Atmosphere and flavor, but nothing of note occurs. |

### Downtime Procedure (Weeks)

Downtime timers are used for long-form activities where external pressure exists (e.g., a rival faction is also researching the same artifact, a siege is approaching, a political deadline looms).

**Setup**: GM sets a d6 timer representing weeks. Each downtime action (crafting, researching, training, networking) ticks the timer.

**Actions that tick**:
- Craft an item or work a profession
- Research a complex topic
- Train a skill or practice a technique
- Gather information or cultivate contacts
- Recover from serious wounds

**Free activities**:
- Run a quick errand
- Visit a shop or market
- Have a meeting or social call
- Write a letter or send a message

#### Downtime Event Table (d6)

| d6 | Event |
| --- | --- |
| 1 | **Trouble!** A rival acts, a threat materializes, or an obligation comes due. Roll on a settlement or faction event table to determine what demands your attention. |
| 2 | **Wear and Tear.** Tools, workspace, or living conditions degrade. A crafting tool, workshop item, or piece of equipment requires a Durability check or loses 1 use. |
| 3 | **Expenses.** Costs rise or income drops. Roll a Supply check for coin or materials, or pay an unexpected fee. |
| 4 | **Situation Shift.** The political, social, or economic landscape changes. Roll d3: [1] A faction gains or loses power. [2] Prices or availability of goods shift. [3] A new law, rumor, or decree changes the status quo. |
| 5 | **Traces.** You hear rumors, receive a lead, or notice a pattern that hints at coming events or hidden opportunities. |
| 6 | **Ambient.** A festival, a quiet week, or pleasant weather. Life goes on, nothing of particular note occurs. |

---

## Custom Actions

GMs and players should feel free to create custom actions within the framework. The only requirement is to answer three questions:

1. **Does it tick the timer?** If the activity consumes a meaningful amount of time at the current scale, it ticks (default: 1 tick).
2. **What skill roll applies?** Choose the most appropriate attribute + skill combination from the existing list.
3. **What are the consequences?** Define results for at least weak, strong, and critical success (and optionally failure/blunder).

> **Example custom action (Delving)**: *Reinforce a doorway* — Tick the timer by 1. Roll Strength + Crafting. On a weak success, the door holds for 1 event cycle. On a strong success, it holds for 2 cycles. On a critical, it holds indefinitely and grants +1 boon to the party's next action in this room.

---

## Example: Dungeon Delving with Dice Timers

This example shows how to take the generic Delving Event Table and customize it for a specific dungeon. The GM keeps the same 1d6 structure but writes themed descriptions for each result.

### Setup

- **Scene**: Delving into a waterlogged ruin beneath an ancient temple.
- **Timer**: d6, starting at 6. Reduces by 1 for each major activity (move, search, short rest, etc.).

### Customized Delving Event Table — Waterlogged Ruin (d6)

| d6 | Event |
| --- | --- |
| 1 | **Attack!** Water Weird tendrils emerge from damp walls or animated vines lash out. Roll on the encounter table below. |
| 2 | **Wear and Tear.** Moisture corrodes metal, stone dust abrades surfaces. Each adventurer chooses one item they hold, carry, or wear: worn equipment or weapons require a Durability check, other items directly lose 1 use. |
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

### Relationship to Scene & Time Intervals

The dice timer system does **not replace** the existing time interval definitions (Encounter, Delving, Exploration, Travel, Downtime). Instead, it provides a **unified pacing mechanic** that sits on top of any time interval. GMs can use timers when they want structured tension and skip them when free-form narration is more appropriate.

### This Is the Base Mechanic

Dice timers and 1d6 event tables are designed as the **foundational pacing layer** for all modes of play. Specialized systems—such as travel procedures with Navigator and Scout roles, or downtime crafting sequences—build on top of this base by adding their own roles, tables, and modifiers. The generic event tables provided here serve as starting points that any specialized system can extend or replace.

### Compatibility with the Challenge System (Issue #149)

Dice timers are drawn directly from the Challenge System concept. Challenges that involve time pressure (e.g., "disarm the trap before the ceiling lowers") use the same timer mechanic. This analysis formalizes that concept and extends it to all scene types.

---

## Summary

| Concept | Description |
| --- | --- |
| **Dice Timer** | A countdown (default d6 starting at 6) that ticks down with each major action. |
| **Action** | Any activity consuming a meaningful amount of time at the current scale. Ticks the timer by 1 (default). |
| **Free Activity** | Any activity taking negligible time at the current scale. Does not tick the timer. |
| **Event Die** | 1d6 rolled when the timer hits 0. Each time interval has a generic event table (Threat → Wear → Resource → Shift → Traces → Ambient). |
| **Timer Manipulation** | Players and GMs can speed up, slow down, or reset timers through actions and choices. |
| **Custom Actions** | Any action that answers: Does it tick? What do you roll? What happens on success/failure? |
| **Scalability** | The same loop works at every time interval: encounter, delving, exploration, travel, downtime. |
