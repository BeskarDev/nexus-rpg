# Hex & Point Crawl Exploration — Design Analysis

This document proposes a hex/point crawl procedure for Nexus RPG, built on the existing [Challenge System](../06-scenes/07-challenges/00-overview.md) and [Scene & Time Scale Procedures](../06-scenes/01-scenes-time-intervals.md). It operates at the **Exploration time scale** (2–4 hours per turn) and provides a lightweight game loop for open-map adventuring — exploring unknown regions, discovering hidden locations, and navigating uncharted territory.

Where the [Travel System](../06-scenes/07-challenges/02-travel.md) handles **journeys between known destinations** (daily time scale, role-based), this system handles **freeform exploration of unmapped areas** (hourly time scale, player-driven).

---

## Design Goals

- Provide a **turn-based exploration loop** where each player chooses an action each turn, mirroring the structure of combat or dungeon delves.
- Emphasize **player agency**: each character decides what to do — move, search, scout, forage — rather than being locked into a role.
- Use a **day clock** to track time of day and trigger events, replacing the abstract dice timer.
- Keep the procedure **lightweight**: movement into open terrain requires no rolls; only difficult terrain, searching, and special actions involve checks.
- Support both **hex crawl** (gridded map with terrain hexes) and **point crawl** (node-and-path map) formats.
- Keep overhead low: the GM needs a map, a few d66 tables, and two dice.

---

## When to Use These Rules

Use this exploration procedure for **freeform movement through unknown or partially known regions** at the 2–4 hour time scale.

**Use for:**
- Exploring uncharted wilderness, ruins, or island chains
- Searching a region for a hidden location (lost temple, bandit camp, dragon's lair)
- Aimless or investigative movement where the destination is unknown
- Sandbox play where players choose their own direction

**Do not use for:**
- Journeys between two known destinations (use the [Travel System](../06-scenes/07-challenges/02-travel.md))
- Exploring a single dungeon or building interior (use the [Delving Procedure](../06-scenes/01-scenes-time-intervals.md))
- Quick overland travel that should be abstracted for pacing

---

## Core Concepts

### Hex Crawl vs. Point Crawl

Both formats use the same procedure. The only difference is map structure.

| Format | Structure | Best For |
|--------|-----------|----------|
| **Hex Crawl** | Region divided into hexes (~6 miles / 10 km across). Each hex has a terrain type and may hold a POI. Party moves in any direction. | Wide-open wilderness with many possible routes |
| **Point Crawl** | Network of named locations connected by paths. Each path has a terrain type and length (1–3 turns). Movement follows connections. | Regions shaped by geography (river valleys, mountain passes) or tighter narrative control |

### The Day Clock

A day of exploration is divided into **four watches**, tracked by a **d4 placed on the table** as a shared clock visible to all players. Each watch represents roughly 4 hours. The clock advances by 1 each time the party completes a turn.

| Clock | Watch | Notes |
|:-----:|-------|-------|
| **1** | Morning | First turn of the day |
| **2** | Midday | Second turn |
| **3** | Afternoon | Third turn |
| **4** | Evening | Party should camp. A 5th turn pushes into night (see below) |

At the **end of each turn**, the GM rolls on the **Exploration Event Table** (2d6). Events during exploration are frequent but subtle — minor environmental shifts, traces of nearby activity, and occasional encounters, reflecting the granular pace compared to travel (which rolls once per day).

**Pushing into the night.** The party may take a 5th turn after evening, but night actions suffer **+1 bane** on all rolls. If the party does not camp by the end of the 5th turn, each adventurer gains **1 Fatigue**.

### Exploration vs. Travel

| Feature | Travel | Exploration |
|---------|--------|-------------|
| **Destination** | Known target | Unknown — searching, wandering, discovering |
| **Time scale** | ~1 day per action | ~4 hours per turn (4 turns per day) |
| **Progress** | Challenge die counts down to arrival | Spatial — party moves across the map |
| **Map** | Route-based (A → B) | Area-based (hex grid or point network) |
| **Structure** | Role-based daily procedure | Turn-based — each player picks an action |
| **Events** | Once per day | Once per turn (subtle, frequent) |
| **Movement** | Abstracted into daily progress | Explicit — move to adjacent hexes/points |
| **Discovery** | Scout's bonus option | Core loop — the point of play |

---

## Exploration Setup

Use these checklists at the table. Full details for each step follow below.

**Region Setup (GM, before play)**

1. Prepare the map and assign terrain
2. Place points of interest (visible and hidden)
3. Set the exploration difficulty
4. Roll or choose starting weather
5. Prepare the encounter table

### 1. Prepare the Map

**Hex crawl:** Draw or select a hex map. Assign a terrain type to each hex. A region of 15–30 hexes provides several sessions of exploration.

**Point crawl:** Draw a network of named points (landmarks, crossroads, settlements, ruins) connected by paths. Label each path with a terrain type and length (1–3 turns).

To quickly generate terrain for a hex map, roll d66 on the **Random Terrain Table**:

| d66 | 1 | 2 | 3 | 4 | 5 | 6 |
|:---:|---|---|---|---|---|---|
| **1** | Plains | Plains | Light forest | Light forest | Hills | Hills |
| **2** | Plains | Grassland | Light forest | Dense forest | Hills | Rocky hills |
| **3** | Grassland | Grassland | Dense forest | Dense forest | Foothills | Mountains |
| **4** | Grassland | Scrubland | Dense forest | Swamp | Foothills | Mountains |
| **5** | Scrubland | Rocky desert | Swamp | Marsh | Mountains | Tundra |
| **6** | Coast | River/Stream | Lake | Clearing | Canyon/Ravine | Special |

> **d66:** Roll two d6. The first die picks the row, the second picks the column. "Special" means the GM places a unique feature — volcanic vent, ancient battlefield, magical anomaly, or similar.

### 2. Place Points of Interest

Scatter **points of interest** (POIs) across the map. Not every hex/point needs one; roughly **1 in 3 hexes** (or half of named points) should have something notable.

POIs are either **visible** (immediately apparent when entering the hex) or **hidden** (require a successful Search to find). For each hidden POI, assign a **Discovery TN**:

| Difficulty | TN | Examples |
|------------|----|---------|
| Obvious | 6 | Large ruins, major water source |
| Moderate | 8 | Overgrown trail, partially hidden cave |
| Hard | 10 | Concealed entrance, buried cache |
| Very Hard | 12 | Magically hidden site, sealed vault |
| Legendary | 14 | Mythic locations, extraplanar doorways |

To randomly generate POI types, roll d66 on the **Random POI Table**:

| d66 | 1 | 2 | 3 | 4 | 5 | 6 |
|:---:|---|---|---|---|---|---|
| **1** | Fresh spring | Herb grove | Mineral deposit | Game trail | Fruit trees | Medicinal moss |
| **2** | Ancient monument | Massive tree | Waterfall | Rock formation | Standing stones | Carved cliff |
| **3** | Cave | Ruins with roof | Abandoned camp | Hermit's hut | Overhang shelter | Hot spring |
| **4** | Monster lair | Bandit camp | Cursed ground | Natural hazard | Predator den | Trapped ravine |
| **5** | Hidden entrance | Buried treasure | Concealed shrine | Illusory terrain | Sealed vault | Underground passage |
| **6** | Village | Outpost | Nomad camp | Trading post | Abandoned settlement | Shrine or temple |

> **Seeding clues.** Place trace clues in hexes adjacent to hidden POIs. When the party triggers a Traces event there, the clue naturally points toward the hidden feature. NPCs, found maps, and visible landmarks (smoke columns, distinctive peaks) also guide players toward hidden discoveries without brute-force searching.

### 3. Set the Exploration Difficulty

Choose an **Exploration Difficulty** (TN) for the region. This is the default TN for difficult terrain navigation, searching, and survival rolls.

| Difficulty (TN) | Terrain Examples |
|------------------|-----------------|
| Medium (8) | Plains, light forest, gentle hills, coastal areas |
| Hard (10) | Dense forest, swamp, rocky desert, foothills |
| Very Hard (12) | Mountains, deep jungle, magical wasteland, trackless tundra |
| Extreme (14) | Supernaturally obscured, shifting terrain, planar borders |

> The difficulty can vary per hex if terrain changes significantly. For simplicity, use a single TN for the whole region and adjust only for notably different hexes.

### 4. Roll or Choose Starting Weather

Roll d6 on the **Weather Table** to set starting conditions. Weather changes when a Weather Shift event occurs (see Event Table).

| d6 | Weather | Effect |
|:--:|---------|--------|
| 1 | **Clear skies** | No effect. Pleasant conditions |
| 2 | **Overcast** | No mechanical effect. Grey skies, diffused light |
| 3 | **Light rain or wind** | Ranged attacks and Perception checks beyond close range suffer +1 bane |
| 4 | **Heavy rain, strong wind, or fog** | All Perception checks suffer +1 bane. Difficult terrain navigation rolls suffer +1 bane. Tracks are obscured (Search for tracks suffers +1 bane) |
| 5 | **Storm or extreme heat/cold** | All outdoor rolls suffer +1 bane. Each adventurer rolls Strength + Fortitude vs. the Exploration Difficulty at the end of the day or gains 1 Fatigue |
| 6 | **Severe storm or blizzard** | As above, plus movement into difficult terrain is impossible until the weather shifts. Supply Checks use +1d, keep lowest |

> Weather persists until a **Weather Shift** event occurs, at which point the GM rolls again or shifts the weather one step in either direction on the table.

### 5. Prepare the Encounter Table

Create a d66 encounter table for the region, or use the **Generic Encounter Table** as a starting point:

| d66 | 1 | 2 | 3 | 4 | 5 | 6 |
|:---:|---|---|---|---|---|---|
| **1** | Predator (stalking) | Predator (territorial) | Predator pack | Scavengers | Vermin swarm | Apex predator |
| **2** | Bandits (scouts) | Bandits (ambush) | Bandits (camp) | Smugglers | Deserters | Cultists |
| **3** | Patrol (local) | Soldiers (marching) | Tax collectors | Bounty hunter | Mercenaries | Warlord's vanguard |
| **4** | Merchant (traveling) | Merchant (lost) | Peddler | Caravan | Prospectors | Artisan |
| **5** | Hermit | Pilgrim(s) | Refugees | Fellow adventurers | Wandering healer | Sage or scholar |
| **6** | Monster (solitary) | Monster (pair) | Monster (nest) | Undead | Spirit or apparition | Rare creature |

> Roll d6 for disposition: 1–2 hostile, 3–4 wary, 5 neutral, 6 friendly. Adjust based on context.

---

## Exploration Procedure

Use this checklist each turn. Full details for each step follow below.

**Each Exploration Turn**

1. Declare actions (each player chooses)
2. Resolve actions
3. Advance the day clock
4. Roll for event (2d6)
5. Check for day's end

### 1. Declare Actions

Each player declares what their character does this turn. The party typically acts as a group but may split up.

| Action | Description |
|--------|-------------|
| **Move** | Enter an adjacent hex or travel along a path to the next point. No roll needed for open terrain. Difficult terrain requires a navigation check (see below) |
| **Search** | Thoroughly search the current hex/point for hidden features. Roll vs. Discovery TN |
| **Scout** | Range ahead to an adjacent hex/point without the party entering it |
| **Forage** | Gather food, water, or materials in the current hex/point |
| **Track** | Follow tracks, trails, or clues to determine direction of a target |
| **Investigate** | Examine a discovered POI in detail (enter a ruin, interact with an NPC, study an inscription) |
| **Camp** | Set up camp and rest (required before nightfall) |
| **Backtrack** | Return to a previously explored hex/point along a known route. No roll needed |

**Free activities** (do not cost a turn):
- Short discussion about direction or plans
- Consult a map or notes
- Eat a quick meal from rations
- Note the current hex/point on the party's map
- Brief conversation with a willing NPC

> **Moving as a group.** When the party moves together, each character not leading navigation may perform a secondary action alongside the Move: keeping watch (Perception), foraging (Nature), or assisting the navigator (+1 boon). These resolve alongside the Move without costing a separate turn.

> **Splitting up.** Characters may act independently (e.g., one searches while another scouts ahead). The clock advances once for the turn regardless — they act simultaneously within the same ~4-hour watch.

### 2. Resolve Actions

**Move.** The party enters the adjacent hex/point. The GM describes the terrain and any visible features.

- **Open terrain** (plains, light forest, grassland, roads): No roll. The party simply arrives.
- **Difficult terrain** (dense forest, swamp, mountains, trackless desert): The navigator rolls Spirit/Mind + Nature or Survival vs. the Exploration Difficulty.

| Result | Effect |
|--------|--------|
| Blunder | Lost — the party ends up in a random adjacent hex/point instead. +1 bane on next navigation roll |
| Failure | Stuck — the party cannot enter the hex this turn. They may try again next turn or choose a different route |
| Weak Success | Arrive at the intended hex/point |
| Strong Success | Arrive and choose one bonus: learn terrain of one adjacent unexplored hex/point, or gain +1 boon on the next Search in this hex/point |
| Critical Success | Arrive and choose two bonuses from the list above |

**Search.** Roll Spirit + Perception or Mind + Survival vs. the **Discovery TN** of the hidden feature (or the Exploration Difficulty if no hidden feature exists).

| Result | Effect |
|--------|--------|
| Blunder | Trigger a hazard or alert nearby creatures. The hidden feature remains undiscovered |
| Failure | Nothing found. May retry on a later turn with +1 bane (diminishing returns) |
| Weak Success | Discover the feature with a complication — a guardian, difficult access, or incomplete discovery |
| Strong Success | Discover the feature cleanly — full access, no complications |
| Critical Success | Discover the feature and gain a clue pointing toward another hidden POI in an adjacent hex/point |

When the party has received a Traces clue pointing to this hex/point, the Search gains **+1 boon**. Multiple clues stack (up to +2 boons).

**Scout.** Roll Agility/Spirit + Stealth or Survival vs. the Exploration Difficulty.

| Result | Effect |
|--------|--------|
| Blunder | Detected — hostile creatures in the hex are alerted and may pursue |
| Failure | Learn the terrain type only |
| Weak Success | Learn terrain and whether a visible POI exists |
| Strong Success | Learn terrain, visible POIs, and presence of creatures or NPCs |
| Critical Success | Full reconnaissance — all of the above plus the Discovery TN of any hidden features |

**Forage.** Roll Spirit/Mind + Nature vs. the Exploration Difficulty.

| Result | Effect |
|--------|--------|
| Blunder | Poisonous find — one character rolls Spirit + Fortitude vs. the Exploration Difficulty or gains the poisoned condition |
| Failure | Nothing found |
| Weak Success | Gather enough food/water for 1 party member (skip their Supply Check) |
| Strong Success | Gather enough for 2 party members |
| Critical Success | Gather enough for the whole party; find 1d4 useful herbs or materials |

**Track.** Roll Spirit + Survival or Mind + Nature vs. the Exploration Difficulty (or a TN set by the quarry's Stealth). On success, the GM indicates which direction the quarry went and how recently.

**Investigate / Camp.** Resolved narratively or with specific skill checks as needed. For Camp, see [Camping](#5-camping) below.

### 3. Advance the Day Clock

Move the d4 clock forward by 1.

### 4. Roll for Event

At the end of each turn, the GM rolls **2d6** on the Exploration Event Table. The first die picks the **category**, the second die picks the **specific event** within that category.

| 1st d6 | Category | 2nd d6 Details |
|:------:|----------|------|
| **1** | **Encounter** | Roll on the region's encounter table. Determine disposition with a separate d6 (1–2 hostile, 3–4 wary, 5 neutral, 6 friendly) |
| **2** | **Weather Shift** | The weather changes. Roll d6 on the Weather Table or shift one step: *(1–2)* improve one step, *(3–4)* no change (false alarm — clouds gather then disperse), *(5–6)* worsen one step |
| **3** | **Wear and Tear** | The terrain punishes gear: *(1–2)* footwear or clothing requires a Durability check, *(3–4)* a tool or weapon requires a Durability check, *(5–6)* a carried consumable loses 1 use (rope frays, waterskin leaks, torch dampens) |
| **4** | **Traces** | Signs of something nearby. The GM indicates which adjacent hex/point the trace points toward: *(1)* tracks — footprints, claw marks, drag marks, *(2)* markings — carved symbols, trail blazes, boundary markers, *(3)* remains — old campsite, bones, discarded gear, *(4)* sounds — distant calls, rushing water, voices on the wind, *(5)* smoke or light — campfire, signal fire, magical glow, *(6)* scent or feeling — sulfur, decay, cooking food, magical prickling |
| **5** | **Terrain Feature** | An environmental obstacle or feature: *(1–2)* path blocked — natural obstacle requiring Athletics or Survival vs. Exploration Difficulty to bypass, or detour to another hex/point, *(3–4)* hazard — rockslide, flash flood, sinkhole, or animal stampede (each adventurer rolls an appropriate save or suffers consequences), *(5–6)* natural boon — sheltered clearing, clean water source, or vantage point (party gains +1 boon on next Search or Scout in this hex) |
| **6** | **Nothing** | The stretch passes quietly. Distant scenery, birdsong, wind through the canopy. A moment to breathe |

> **Traces and clue direction.** When Traces occur, point the clue toward a pre-placed hidden POI if one is adjacent. Otherwise, point toward the nearest undiscovered POI. If none are nearby, roll a die for a random adjacent direction.

> **Event frequency.** Rolling each turn means ~4 events per day. Most results (Weather, Traces, Nothing) are low-impact, keeping the pace moving without overwhelming the table. Only Encounters and Hazards demand immediate resolution.

### 5. Camping

When the party uses a turn to camp (typically when the clock reaches 4), resolve the following:

**Shelter.** One character rolls Spirit + Survival vs. the Exploration Difficulty.

| Result | Effect |
|--------|--------|
| Blunder | No shelter; camp is exposed. Each adventurer gains 1 Fatigue and +1 bane on night watch |
| Failure | No shelter. Each adventurer rolls Strength + Fortitude vs. Exploration Difficulty or gains 1 Fatigue |
| Weak Success | Basic shelter. Adequate rest |
| Strong Success | Good shelter. Choose: each adventurer removes 1 Fatigue, or the camp is concealed (+1 boon on night watch) |
| Critical Success | Excellent shelter. Removes 1 Fatigue and camp is concealed |

**Rations.** Each adventurer rolls a **Supply Check** for rations (unless fed by a Forage result).

**Night watch.** Assign watches. If the GM determines a night event occurs (or wishes to roll an additional event), the watch character rolls Spirit + Perception vs. the Exploration Difficulty to detect the threat.

---

## Random Tables

These tables are for GM reference during play.

### Discovery Table (d66)

When a hidden feature is discovered through Search, roll d66 to determine its nature (or the GM selects based on pre-placed content):

| d66 | 1 | 2 | 3 | 4 | 5 | 6 |
|:---:|---|---|---|---|---|---|
| **1** | Supply cache (2d4 rations, basic gear) | Mineral deposit (2d6 × 10 coins of raw materials, Crafting/Nature to harvest) | Dead adventurer's pack (1d4 rations, Q3 item, partial map of 1d3 hexes) | Hidden chest (3d6 × 10 coins, 1d3 trade goods, may be trapped) | Shrine offerings (4d6 × 10 coins, taking may anger spirits) | Minor magic item (Q3–Q4) or dungeon entrance |
| **2** | Crumbling watchtower | Overgrown shrine | Standing stones | Forgotten structure | Collapsed bridge | Dungeon entrance |
| **3** | Hot spring (each adventurer regains 1 Resolve) | Crystal cave | Ancient grove | Geologic formation | Waterfall basin | Bioluminescent cavern |
| **4** | Creature's den (occupied, hostile) | Hidden camp (occupied, wary) | Concealed shelter (abandoned) | Predator's lair (empty, recent signs) | Bandit hideout | Refugee shelter |
| **5** | Shortcut path to distant hex | Hidden trail through difficult terrain | Underground tunnel | River crossing | Mountain pass | Cave system connecting two hexes |
| **6** | Magical anomaly | Prophetic inscription | Trapped spirit | Mysterious artifact | Ancient mechanism | Extraplanar doorway |

### Treasure Sub-Table (d6)

For more detail when treasure is discovered:

| d6 | Find |
|:--:|------|
| 1 | Abandoned supply cache: 2d4 simple rations (d4) and basic gear (rope, torches, tools) |
| 2 | Mineral deposit or rare herbs: 2d6 × 10 coins worth of raw materials. Requires Crafting or Nature to harvest |
| 3 | A dead adventurer's pack: 1d4 rations, a Q3 weapon or piece of equipment, and a partial map (reveals 1d3 adjacent hexes/points) |
| 4 | Hidden chest or buried cache: 3d6 × 10 coins and 1d3 trade goods. May be trapped (Mind + Crafting vs. Exploration Difficulty to disarm) |
| 5 | A shrine offering or ritual site: 4d6 × 10 coins in offerings. Taking them may anger local spirits (+1 bane on Resist until leaving the region) or nearby communities |
| 6 | A minor magic item (Q3–Q4) placed by the GM, or the entrance to a dungeon containing greater treasure |

---

## Example: Exploring the Thornwood

### Setup

**Region:** The Thornwood — a dense, hilly forest rumored to contain the ruins of an ancient watchtower.

- **Exploration Difficulty:** TN 10 (Hard — dense forest)
- **Map:** 20 hexes (4×5 grid). Mostly forest (difficult), with two hill hexes, one stream hex, and one clearing (open).
- **Starting Weather:** Overcast (no effect).

**Placed POIs:**
- Hex 7 (clearing): Abandoned logging camp (visible). Shelter + basic supplies.
- Hex 12 (forest): Bandit camp (hidden, Discovery TN 10).
- Hex 15 (hills): Ancient watchtower ruins (hidden, Discovery TN 12). The party's goal.
- Hex 18 (stream): Fresh water source (visible). +1 boon on Forage.

**Clue placement:** Hex 11 → "boot prints heading east" (points to bandit camp). Hex 14 → "worked stone fragments" (points to watchtower).

### Play

The party: a Ranger, a Rogue, a Druid, and a Fighter.

**Day 1**

**Turn 1 — Morning (clock: 1).** The party moves to Hex 2 (forest — difficult terrain). The Ranger navigates, the Rogue keeps watch, the Druid forages.

> **Ranger (Navigate)** rolls Spirit + Nature vs. TN 10: result 11 (Weak Success). The party arrives.
>
> **Rogue (Watch)** rolls Spirit + Perception vs. TN 10: result 9 (Failure). No useful observations.
>
> **Druid (Forage)** rolls Spirit + Nature vs. TN 10: result 8 (Failure). Nothing useful.
>
> **Event roll (2d6):** 6, 3 → Nothing. The stretch passes quietly. Dense forest, occasional game trails.

**Turn 2 — Midday (clock: 2).** The party moves to Hex 6 (forest — difficult terrain). The Druid navigates, the Rogue watches.

> **Druid (Navigate)** rolls Spirit + Nature vs. TN 10: result 11 (Weak Success). Arrived.
>
> **Rogue (Watch)** rolls Spirit + Perception vs. TN 10: result 12 (Strong Success). Chooses to learn that Hex 7 to the south is a clearing, and that no POI is visible in this hex.
>
> **Event roll (2d6):** 4, 2 → Traces (markings). The party spots faded trail blazes carved into tree trunks, heading south toward the clearing. The GM notes this naturally points toward Hex 7.

**Turn 3 — Afternoon (clock: 3).** The party moves to Hex 7 (clearing — open terrain, no roll needed). They arrive and discover the abandoned logging camp (visible POI).

> No navigation roll needed — the clearing is open terrain.
>
> **Event roll (2d6):** 2, 4 → Weather Shift. The GM rolls d6: result 3 → no change (clouds gather, then thin). Weather remains overcast.
>
> The party finds the logging camp: basic shelter, a rusty axe, some rope, dried herbs.

**Turn 4 — Evening (clock: 4).** The party camps at the logging camp.

> The camp provides automatic shelter (it's a visible POI with shelter). The Druid forages at camp: result 12 (Strong Success) — feeds 2 party members. The others roll Supply Checks.
>
> **Event roll (2d6):** 6, 1 → Nothing. Quiet night. The party rests.

**Day 2**

**Turn 1 — Morning (clock: 1).** The party moves to Hex 11 (forest — difficult terrain). The Ranger navigates.

> **Ranger (Navigate)** rolls Spirit + Nature vs. TN 10: result 8 (Failure). Stuck — the undergrowth is too dense. The party cannot enter Hex 11 this turn.
>
> **Event roll (2d6):** 5, 2 → Terrain Feature (path blocked). A fallen tree blocks the main approach. The GM decides this compounds the navigation failure — the party must find a way around.

**Turn 2 — Midday (clock: 2).** The party tries again to reach Hex 11. The Fighter assists the Ranger.

> **Ranger (Navigate)** rolls Spirit + Nature vs. TN 10 (+1 boon from Fighter assist): result 13 (Strong Success). The party arrives. The Ranger chooses "learn adjacent terrain" — learns Hex 12 to the east is also forest.
>
> **Event roll (2d6):** 4, 1 → Traces (tracks). "Boot prints and broken branches heading east — several people passed through recently." This is the pre-placed clue pointing toward the bandit camp in Hex 12.
>
> The Rogue suggests scouting before the party commits.

**Turn 3 — Afternoon (clock: 3).** The party splits up. The Rogue scouts Hex 12 while the others search Hex 11.

> **Rogue (Scout)** rolls Agility + Stealth vs. TN 10: result 14 (Critical Success). Full reconnaissance — "Dense forest with a concealed camp. Five people, lightly armed. Cooking fire, stolen trade goods stacked under canvas."
>
> **Fighter (Search)** rolls Spirit + Perception vs. TN 10: result 9 (Failure). Nothing else hidden here.
>
> **Event roll (2d6):** 3, 5 → Wear and Tear (consumable loses 1 use). The Druid's waterskin springs a leak from a thorn puncture.
>
> Armed with intelligence, the party plans their approach. The exploration procedure pauses as the scene transitions to an encounter or infiltration challenge.
