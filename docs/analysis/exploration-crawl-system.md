# Hex & Point Crawl Exploration — Design Analysis

This document proposes a hex/point crawl procedure for Nexus RPG, built on the existing [Challenge System](challenges-system.md) and [Scene & Time Scale Procedures](scene-timescale-procedures.md). It operates at the **Exploration time scale** (2–4 hours per action) and provides a structured game loop for open-map adventuring — exploring unknown regions, discovering hidden locations, and navigating uncharted territory.

Where the [Travel System](travel-system-design.md) handles **journeys between known destinations** (daily time scale, route-based), this system handles **freeform exploration of unmapped areas** (hourly time scale, discovery-based).

---

## Design Goals

- Provide a **structured game loop** for open-map exploration that keeps every player engaged each "turn" (2–4 hours of in-game time).
- Use the existing **dice timer** and **event table** framework from the [Scene & Time Scale Procedures](scene-timescale-procedures.md) to generate events and pacing.
- Integrate with the **Challenge System** for goal-oriented exploration (finding a lost ruin, tracking a creature to its lair).
- Distinguish clearly from the **Travel System**: exploration is about discovery and uncertainty, not progress toward a known destination.
- Support both **hex crawl** (gridded map with terrain hexes) and **point crawl** (node-and-path map) formats.
- Keep overhead low: the GM needs a map, a few tables, and the standard dice.

---

## When to Use These Rules

Use this exploration procedure for **freeform movement through unknown or partially known regions** at the 2–4 hour time scale.

**Use for:**
- Exploring uncharted wilderness, ruins, or island chains
- Searching a region for a hidden location (lost temple, bandit camp, dragon's lair)
- Aimless or investigative movement where the destination is unknown
- Sandbox play where players choose their own direction

**Do not use for:**
- Journeys between two known destinations (use the [Travel System](travel-system-design.md))
- Exploring a single dungeon or building interior (use the [Delving Procedure](scene-timescale-procedures.md))
- Quick overland travel that should be abstracted for pacing

---

## Core Concepts

### Hex Crawl vs. Point Crawl

Both formats work with the same procedure. The only difference is map structure.

**Hex Crawl**
- The region is divided into hexes, each representing a few miles across.
- Each hex has a terrain type and may contain a point of interest.
- Moving to an adjacent hex costs one exploration action (2–4 hours).
- The party can move in any direction.

**Point Crawl**
- The region is a network of named locations (points) connected by paths.
- Each path has a terrain type and an estimated travel time (one or more exploration actions).
- Movement follows paths between connected points.
- Simpler to prepare; better for regions with clear routes and chokepoints.

> **Which should I use?** Use a hex crawl for wide-open wilderness with many possible routes. Use a point crawl for regions shaped by geography (river valleys, mountain passes, archipelagos) or when you want tighter narrative control over possible paths.

### The Exploration Action

Each exploration action represents **2–4 hours** of in-game time — roughly one stretch of a day. A typical day of exploration allows **3 actions** before the party must make camp (morning, afternoon, evening), with a fourth possible if the party pushes into the night.

Actions include:
- **Move** to an adjacent hex or along a path to the next point
- **Search** the current hex/point for hidden features
- **Investigate** a discovered site in detail
- **Set up camp** and rest
- **Track** a creature or follow a trail
- **Forage** for food, water, or materials

### Exploration vs. Travel — Key Differences

| Feature | Travel | Exploration |
|---------|--------|-------------|
| **Destination** | Known — the party has a specific target | Unknown or vague — the party is searching, wandering, or discovering |
| **Time scale** | ~1 day per action | 2–4 hours per action |
| **Progress tracker** | Challenge die counts down to arrival | No linear progress die — movement is spatial across the map |
| **Map** | Route-based (origin → destination) | Area-based (hex grid or point network) |
| **Roles** | Navigator, Scout, and optional daily roles | Pathfinder, Lookout, and optional per-action roles |
| **Event trigger** | Once per day (daily event roll) | Dice timer ticks per action; event on timer expiry |
| **Discovery** | Scout's bonus option | Core loop — searching and uncovering the map is the point |
| **Retracing** | Not relevant (forward progress only) | Common — party may revisit explored hexes/points |
| **Supplies** | Daily ration checks | Supply checks triggered by events or camping |

---

## Exploration Setup (GM, Before Play)

### Step 1: Prepare the Map

**Hex crawl:** Draw or select a hex map. Assign a terrain type to each hex. A region of 20–40 hexes provides several sessions of exploration.

**Point crawl:** Draw a network of named points (landmarks, crossroads, settlements, ruins) connected by paths. Label each path with a terrain type and length (1–3 actions).

### Step 2: Place Points of Interest

Scatter **points of interest** (POIs) across the map. These are the rewards for exploration — the things players discover. Not every hex/point needs one; roughly **1 in 3 hexes** (or half of named points) should have something notable.

POIs fall into several categories:

| Category | Examples |
|----------|----------|
| **Landmark** | Ancient monument, massive tree, waterfall, distinctive rock formation |
| **Resource** | Fresh spring, herb grove, mineral deposit, game trail |
| **Shelter** | Cave, ruins with a roof, abandoned camp, friendly hermit |
| **Danger** | Monster lair, bandit camp, cursed ground, natural hazard |
| **Secret** | Hidden entrance, buried treasure, concealed shrine, illusory terrain |
| **Settlement** | Village, outpost, nomad camp, trading post |

### Step 3: Mark Secrets and Hidden Features

Some POIs are **hidden** — they do not appear on the party's map and can only be found through successful Search actions or by following clues (Traces results from the event table). The GM notes these separately.

For each hidden POI, assign a **Discovery TN** representing how hard it is to find:

| Difficulty | TN | Examples |
|------------|----|---------|
| Obvious | 6 | Large ruins visible from a distance, major water source |
| Moderate | 8 | Overgrown trail, partially hidden cave, old campsite |
| Hard | 10 | Concealed entrance, buried cache, camouflaged lair |
| Very Hard | 12 | Magically hidden site, ancient sealed vault, underground passage |
| Legendary | 14 | Mythic locations, divine sanctuaries, extraplanar doorways |

### Step 4: Set the Exploration Difficulty

Choose an overall **Exploration Difficulty** (TN) for the region based on terrain and conditions. This serves as the default TN for navigation, searching, and survival rolls within the region.

| Difficulty (TN) | Terrain Examples |
|------------------|-----------------|
| Medium (8) | Plains, light forest, gentle hills, coastal areas |
| Hard (10) | Dense forest, swamp, rocky desert, foothills |
| Very Hard (12) | Mountains, deep jungle, magical wasteland, trackless tundra |
| Extreme (14) | Supernaturally obscured, shifting terrain, planar borders |

> The Exploration Difficulty can vary per hex/point if the terrain changes across the region. For simplicity, use a single TN for the whole region and adjust only for notably different hexes.

### Step 5: Set the Dice Timer

Place a **d6 dice timer** starting at 6. This timer ticks down by 1 each time the party takes an exploration action. When it reaches 0, roll on the **Exploration Event Table** and reset the timer.

> **Adjusting pacing:** Use a d4 timer for dangerous, event-heavy regions. Use a d8 timer for vast, empty stretches where events are rare but impactful.

### Step 6: Note Region-Specific Details

Prepare the following for the region:

- **Encounter table** (d6 or d8) with terrain-appropriate creatures and NPCs
- **Weather conditions** if relevant (use the weather rules from the [Travel System](travel-system-design.md))
- **Ration availability** — can the party forage or hunt in this terrain?
- **Any active threats** — pursuing enemies, spreading corruption, approaching storms

---

## Exploration Roles

During exploration, each party member fills a role. Roles are chosen at the start of each day and remain fixed for that day. Unlike travel roles, not all roles roll every action — only the active roles for the current action roll.

### Pathfinder (Mandatory)

**Roll:** Spirit/Mind + Nature or Survival vs. Exploration Difficulty

The Pathfinder leads the group through the terrain, choosing routes and reading the landscape.

**When:** Roll once per Move action.

| Result | Effect |
|--------|--------|
| Blunder | Lost — the party moves to a random adjacent hex/point instead of the intended one. +1 bane on next Pathfinder roll |
| Failure | Slow going — the Move action takes extra time (tick the dice timer by 1 additional) |
| Weak Success | Arrive at the intended hex/point as normal |
| Strong Success | Arrive and choose one bonus (see below) |
| Critical Success | Arrive and choose two bonuses |

**Bonuses:**
- Efficient route (do not tick the dice timer for this Move)
- Lay of the land (learn the terrain type of one adjacent unexplored hex/point)
- Keen eye (gain +1 boon on the next Search action in the destination hex/point)

### Lookout (Mandatory)

**Roll:** Spirit + Perception vs. Exploration Difficulty

The Lookout watches for threats, notes surroundings, and provides early warning.

**When:** Roll once per Move action, simultaneously with the Pathfinder.

| Result | Effect |
|--------|--------|
| Blunder | Ambushed — if a Threat event occurs before the next roll, the party is surprised |
| Failure | No useful warning |
| Weak Success | Choose one bonus (see below) |
| Strong Success | Choose two bonuses |
| Critical Success | Choose all three bonuses |

**Bonuses:**
- Spot feature (learn whether the destination hex/point contains a point of interest, without details)
- Avoid danger (if the next event is a Threat, the party may choose to avoid it by retreating to the previous hex/point — costs 1 additional timer tick)
- Landmark sighting (learn the terrain type of up to two adjacent hexes/points visible from the current position)

### Forager (Optional)

**Roll:** Spirit/Mind + Nature vs. Exploration Difficulty

**When:** Roll once per day, or once per Search/Camp action in suitable terrain.

| Result | Effect |
|--------|--------|
| Blunder | Poisonous find — one party member rolls Spirit + Fortitude vs. the Exploration Difficulty or gains the poisoned condition |
| Failure | Nothing found |
| Weak Success | Gather enough food and water for 1 party member today (skip their Supply Check) |
| Strong Success | Gather enough for 2 party members |
| Critical Success | Gather enough for the entire party; additionally find 1d4 useful herbs or materials |

### Scout (Optional)

**Roll:** Agility/Spirit + Stealth or Survival vs. Exploration Difficulty

The Scout ranges ahead of the group, gathering intelligence without committing the party.

**When:** Instead of a Move action, the Scout can spend an exploration action to reconnoiter an adjacent hex/point without the party entering it.

| Result | Effect |
|--------|--------|
| Blunder | Detected — if the hex/point contains hostile creatures, they are now alerted and may pursue the party |
| Failure | Unclear — learn the terrain type only |
| Weak Success | Learn the terrain type and whether a visible point of interest exists |
| Strong Success | Learn terrain, visible POIs, and the presence of any creatures or NPCs |
| Critical Success | Full reconnaissance — learn all of the above plus the Discovery TN of any hidden features |

> Scouting consumes the Scout's action for the current stretch. The dice timer still ticks once as normal for the stretch (time passes while the Scout is away and the party waits). However, scouting does not require a Pathfinder roll since the party itself is not moving.

---

## Exploration Procedure (Per Action)

Each exploration action follows this sequence:

### 1. Declare Action

The party declares what they do this stretch:

| Action | Description | Ticks Timer? |
|--------|-------------|:------------:|
| **Move** | Travel to an adjacent hex or along a path to the next point | Yes |
| **Search** | Thoroughly search the current hex/point for hidden features | Yes |
| **Investigate** | Examine a discovered POI in detail (enter a ruin, study an inscription, interact with an NPC) | Yes |
| **Camp** | Set up camp and rest. Required before nightfall | Yes |
| **Forage** | Gather food, water, or materials in the current hex/point | Yes |
| **Track** | Follow tracks, trails, or clues to determine direction of a target | Yes |
| **Backtrack** | Return to a previously explored hex/point along a known route | Yes (but no Pathfinder roll needed) |

**Free activities** (do not tick the timer):
- Short discussion about direction or plans
- Consult a map or notes
- Eat a quick meal from rations
- Note the current hex/point on the party's map
- Brief conversation with a willing NPC

### 2. Tick the Dice Timer

Reduce the dice timer by 1 (or more, if the Pathfinder failed or the action is especially time-consuming).

### 3. Roll for Active Roles

- **Move:** Pathfinder and Lookout roll simultaneously.
- **Search:** The searching character rolls Spirit + Perception or Mind + Survival vs. the hex/point's Discovery TN (or the Exploration Difficulty if no hidden feature is present). Other characters may assist.
- **Track:** The tracking character rolls Spirit + Survival or Mind + Nature vs. the Exploration Difficulty (or a TN set by the quarry's Stealth).
- **Forage:** The Forager rolls as described above.
- **Investigate / Camp:** Resolved narratively or with specific skill checks as needed.

### 4. Resolve Results

Apply the effects of the rolls. If moving, the party arrives at the new hex/point and the GM describes what is immediately visible. If searching, the GM reveals any hidden features the roll uncovers.

### 5. Check the Dice Timer

If the dice timer reached 0 during this action, roll on the **Exploration Event Table** and reset the timer.

### 6. Check for Day's End

After the third action of the day (evening stretch), the party should camp. A fourth action is possible but pushes into the night:
- Night actions suffer **+1 bane** on all rolls.
- If the party does not camp by the end of the fourth action, each party member gains **1 Fatigue**.

---

## Exploration Event Table (d6)

When the dice timer reaches 0, the GM rolls 1d6:

| d6 | Category | Effect |
|----|----------|--------|
| 1 | **Encounter** | A creature or group appears. Roll on the region's encounter table. Determine disposition (hostile, wary, neutral, friendly) with a d6: 1–2 hostile, 3–4 wary, 5 neutral, 6 friendly. |
| 2 | **Wear and Tear** | The terrain punishes gear. Each adventurer chooses one item: footwear, clothing, a tool, or a weapon requires a Durability check, or a carried item loses 1 use. |
| 3 | **Provisions Dwindle** | Rations spoil, waterskins leak, or the environment drains supplies faster than expected. Each party member rolls a Supply Check for rations or water. |
| 4 | **Terrain Shift** | The environment changes. Roll d3: [1] Weather worsens — next action suffers +1 bane. [2] Path blocked — a natural obstacle requires an Athletics or Survival check to bypass or a detour to another hex/point. [3] Hazard — a natural danger emerges (rockslide, flash flood, sinkhole, animal stampede). Each party member rolls an appropriate save or suffers consequences. |
| 5 | **Traces** | The party discovers signs of something nearby. Roll on the **Traces Sub-Table** below. Traces provide directional clues — the GM indicates which adjacent hex/point the trace points toward (see Directing Traces below). |
| 6 | **Ambient** | Atmosphere and scenery. Wind through the trees, distant mountains catching the light, a beautiful sunset. Nothing mechanically significant — a moment to breathe. |

### Directing Traces

When a Traces event fires, the GM must decide which direction the clue points. Use the following priority:

1. **Pre-placed clue:** If the GM has assigned a specific Traces result to this hex/point (because it is adjacent to a hidden POI), use that clue as written.
2. **Nearest POI:** If no pre-placed clue exists, point the trace toward the nearest undiscovered point of interest.
3. **Random direction:** If no POIs are nearby or the GM prefers randomness, roll a die corresponding to the number of adjacent hexes/paths (d6 for hex crawl, or choose randomly among connected points in a point crawl) to determine the direction.

### Traces Sub-Table (d6)

When a Traces result occurs, roll d6 for specifics:

| d6 | Trace | Detail |
|----|-------|--------|
| 1 | **Tracks** | Footprints, hoofprints, claw marks, or drag marks. A successful Survival check (vs. Exploration Difficulty) reveals the creature type, number, and how recently they passed. |
| 2 | **Markings** | Carved symbols, trail blazes, boundary markers, or warning signs. An Education or Lore check may reveal their meaning. |
| 3 | **Remains** | An old campsite, scattered bones, discarded equipment, or signs of a battle. Investigation may yield useful salvage or information. |
| 4 | **Sounds** | Distant animal calls, rushing water, voices carried on the wind, or ominous silence. Indicates something in an adjacent hex/point. |
| 5 | **Smoke or Light** | A campfire, signal fire, magical glow, or distant torchlight. Indicates an occupied location within 1–2 hexes/points. |
| 6 | **Scent or Feeling** | An unusual smell (sulfur, decay, cooking food, flowers) or a prickling sensation (magic, unease, divine presence). Points toward a hidden feature. |

---

## Discovery Procedure

Discovery is the core reward loop of exploration. When the party searches a hex/point or follows clues from Traces, they may uncover hidden features.

### Searching a Hex/Point

When a character spends an action to Search:

1. **Roll** Spirit + Perception or Mind + Survival vs. the **Discovery TN** of the hidden feature (or the Exploration Difficulty if no hidden feature exists).
2. **Apply results:**

| Result | Effect |
|--------|--------|
| Blunder | Trigger a hazard or alert nearby creatures. The hidden feature remains undiscovered |
| Failure | Nothing found (the character may try again on a later action with +1 bane, representing diminishing returns) |
| Weak Success | Discover the feature but with a complication — a guardian is present, access is difficult, or the discovery is incomplete |
| Strong Success | Discover the feature cleanly — full access, no complications |
| Critical Success | Discover the feature and gain additional insight — learn about connected features, find bonus loot, or receive a clue about another hidden POI in an adjacent hex/point |

### Following Clues

When the party has received a Traces result or other clue pointing toward a specific hex/point, searching that hex/point gains **+1 boon** on the discovery roll. Multiple clues pointing to the same location stack (up to +2 boons).

### Discovery Event Table (d6)

When a hidden feature is discovered, roll d6 to determine its nature (or the GM selects based on pre-placed content):

| d6 | Discovery | Description |
|----|-----------|-------------|
| 1 | **Hidden Treasure** | A cache, buried hoard, or valuable resource. Roll on the Treasure Sub-Table |
| 2 | **Ancient Site** | Ruins, a shrine, standing stones, or a forgotten structure. May contain lore, puzzles, or dungeon entrances |
| 3 | **Natural Wonder** | A hot spring, crystal cave, ancient grove, or geologic formation. Each party member regains 1 Resolve. May have resource value |
| 4 | **Lair or Refuge** | A creature's den, hidden camp, or concealed shelter. May be occupied (hostile or neutral) or abandoned. Provides shelter if cleared |
| 5 | **Passage** | A shortcut, hidden path, underground tunnel, or river crossing that connects to a distant hex/point — reducing future travel time |
| 6 | **Enigma** | Something strange — a magical anomaly, prophetic inscription, trapped spirit, or mysterious artifact. Requires investigation to understand. May lead to a quest or deeper mystery |

### Treasure Sub-Table (d6)

| d6 | Find |
|----|------|
| 1 | Abandoned supply cache: 2d4 simple rations (d4) and basic gear (rope, torches, tools) |
| 2 | Mineral deposit or rare herbs: 2d6 × 10 coins worth of raw materials. Requires Crafting or Nature to harvest |
| 3 | A dead adventurer's pack: 1d4 rations, a Q3 weapon or piece of equipment, and a partial map (reveals 1d3 adjacent hexes/points) |
| 4 | Hidden chest or buried cache: 3d6 × 10 coins and 1d3 trade goods. May be trapped (Mind + Crafting vs. Exploration Difficulty to disarm) |
| 5 | A shrine offering or ritual site: 4d6 × 10 coins in offerings. Taking them may anger local spirits (+1 bane on Resist until leaving the region) or nearby communities |
| 6 | A minor magic item (Q3–Q4) placed by the GM, or the entrance to a dungeon containing greater treasure |

---

## Camping in the Wilderness

When the party spends an exploration action to camp, resolve the following:

### Shelter

One party member rolls Spirit + Survival vs. the Exploration Difficulty.

| Result | Effect |
|--------|--------|
| Blunder | No shelter; camp is exposed. Each party member gains 1 Fatigue and +1 bane on night watch rolls |
| Failure | No shelter found. Each party member rolls Strength + Fortitude vs. the Exploration Difficulty or gains 1 Fatigue |
| Weak Success | Basic shelter found. Adequate rest |
| Strong Success | Good shelter. Choose one: each party member may remove 1 Fatigue, or the camp is concealed (+1 boon on night watch rolls) |
| Critical Success | Excellent shelter. Each party member removes 1 Fatigue, and the camp is concealed |

### Rations

Each party member rolls a **Supply Check** for rations (unless fed by a Forager result). In terrain with extreme resource pressure, roll Supply Checks twice.

### Night Watch

Assign watches. If an event occurs during the night (only if the dice timer expires during camp or the GM determines it), the watch character rolls Spirit + Perception vs. the Exploration Difficulty to detect the threat in time.

---

## Exploration Challenges

When the party has a **specific exploration goal** — finding a lost ruin, tracking a creature to its lair, locating a water source — combine this crawl procedure with a **Challenge** from the [Challenge System](challenges-system.md).

### Structure

1. **Challenge die:** Represents how close the party is to finding their goal. Use d6 when the goal is within a few hexes/points and the party has some clues or leads. Use d8 when the goal is farther away, clues are sparse, or the search area is large (8+ hexes/points to cover).
2. **TN:** Use the Exploration Difficulty for the region.
3. **Progress:** The challenge die is reduced by successful Search, Track, or Investigate actions — not by movement alone.
4. **Timer (optional):** Use the exploration dice timer as a dual-purpose timer, or add a separate challenge timer (d6 or d8) for external pressure (a storm approaching, a rival expedition, supplies running out).

> **Example:** The party is searching for a hidden tomb in a forest region (Exploration Difficulty TN 10). The GM sets a d6 challenge die. Each time a party member succeeds on a Search or Track action, the challenge die is reduced. When it reaches 0, the party discovers the tomb entrance. Meanwhile, the exploration dice timer continues generating events.

### Combining Movement and Progress

Movement itself does not reduce the challenge die — the party must take deliberate Search or investigative actions. However, the GM may allow progress when the party moves to a hex/point that contains a relevant clue or the destination itself.

This creates a tension: **move to cover ground, or stop to search?** Moving quickly covers more area but may miss the goal. Searching thoroughly finds hidden features but consumes daylight and triggers more events.

---

## GM Guidance: Building an Exploration Region

### Minimal Prep Method

For a quick exploration setup, prepare the following:

1. **A map** with 15–25 hexes or 8–15 points, each labeled with terrain type.
2. **3–5 placed POIs** (at least one major site, one danger, one resource, and one settlement or shelter).
3. **2–3 hidden POIs** with Discovery TNs.
4. **A d6 encounter table** for the region.
5. **The Exploration Difficulty** (one TN for the whole region).

Everything else can be improvised using the event and discovery tables during play.

### Revealing the Map

There are three approaches to revealing map information to players:

**Fog of War (default):** Players start with a blank map (or one showing only their starting hex/point and general direction/distance to any known features). As they explore, they fill in hexes/points they visit and ones revealed by Lookout or Pathfinder bonuses.

**Partial Map:** Players start with a rough map showing terrain types and major landmarks, but no POIs or hidden features. This is appropriate when the party has access to an incomplete map, local guides, or cartographic knowledge.

**Full Map:** Players see the entire terrain map but POIs are unmarked. Only appropriate for well-surveyed regions where the terrain is known but specific sites have not been explored.

### Seeding Clues

Hidden POIs become more engaging when the party can find them through detective work rather than brute-force searching of every hex. Seed clues by:

- **Pre-placing Traces:** Assign specific Traces results to hexes/points adjacent to hidden POIs. When the party triggers a Traces event in those hexes, the clue points toward the hidden feature.
- **NPC Information:** Travelers, hermits, or settlement NPCs may share rumors or directions pointing toward hidden POIs.
- **Partial Maps:** Found on dead adventurers, in ruins, or sold by merchants. Reveal 1–3 hexes/points and may indicate hidden features with vague descriptions.
- **Landmark Chains:** Visible landmarks (columns of smoke, distinctive peaks, unusual formations) are visible from multiple hexes, drawing the party toward them naturally.

### Restocking and Region Passage

If the party revisits explored hexes/points, the GM should consider:

- **Restocking:** After 1d6 days, cleared dangers may be replaced by new creatures. Resource POIs may replenish after longer periods.
- **Trail Familiarity:** Backtracking through explored hexes does not require Pathfinder rolls and does not tick the dice timer (the route is known).
- **Region Exhaustion:** After the party has explored most of a region, consider transitioning to the Travel System for moving through it to reach other regions.

---

## Example: Exploring the Thornwood

This example illustrates a full exploration session using the hex crawl procedure.

### Setup

**Region:** The Thornwood — a dense, hilly forest rumored to contain the ruins of an ancient watchtower.

**Exploration Difficulty:** TN 10 (Hard — dense forest, easy to get lost)

**Map:** 20 hexes arranged in a roughly 4×5 grid. Terrain: mostly forest, with two hill hexes, one stream hex, and one clearing.

**Placed POIs:**
- Hex 7 (clearing): Abandoned logging camp (visible). Shelter + basic supplies.
- Hex 12 (forest): Bandit camp (hidden, Discovery TN 10). Hostile NPCs + stolen goods.
- Hex 15 (hills): Ancient watchtower ruins (hidden, Discovery TN 12). The party's goal — contains a sealed vault with lore and treasure.
- Hex 18 (stream): Fresh water source (visible). Good foraging (+1 boon on Forager rolls).

**Hidden clue placement:**
- Hex 11 (adjacent to bandit camp): Traces event here reveals "boot prints and broken branches heading east."
- Hex 14 (adjacent to watchtower): Traces event here reveals "worked stone fragments half-buried in the undergrowth."

**Encounter Table (d6):**

| d6 | Encounter |
|----|-----------|
| 1 | 1d4 Wolves (wary, flee if outmatched) |
| 2 | 1d3 Bandits (scouts from the camp in Hex 12) |
| 3 | 1 Black Bear (territorial, guards a food source) |
| 4 | Giant Spider ambush (1d2 spiders, hidden in canopy) |
| 5 | Traveling Herbalist (friendly, trades in healing supplies) |
| 6 | Patrol of foresters from a nearby village (neutral, share regional info) |

**Dice Timer:** d6, starting at 6.

### Play

**Day 1**

The party consists of four adventurers. They assign roles:
- **Pathfinder:** Ranger (Spirit d10, Nature rank 3)
- **Lookout:** Rogue (Spirit d8, Perception rank 3)
- **Forager:** Druid (Spirit d10, Nature rank 2)
- **Scout:** Fighter (no scouting today — acts as general support)

**Action 1 — Morning: Move to Hex 2 (forest)**

> Timer: 6 → 5.
>
> **Pathfinder** rolls Spirit + Nature vs. TN 10: result 13 (Strong Success). The party arrives. The Ranger chooses "Lay of the land" — learns that Hex 3 to the east is also forest.
>
> **Lookout** rolls Spirit + Perception vs. TN 10: result 9 (Failure). No useful observations.
>
> The GM describes dense forest with occasional game trails. Nothing immediately notable.

**Action 2 — Afternoon: Move to Hex 6 (forest)**

> Timer: 5 → 4.
>
> **Pathfinder** rolls: result 11 (Weak Success). The party arrives, no bonus.
>
> **Lookout** rolls: result 12 (Strong Success). Chooses "Spot feature" — the GM confirms there is no notable POI in this hex. Also chooses "Landmark sighting" — learns Hex 7 to the south is a clearing.
>
> The Druid uses a free activity to note findings on the party's map.

**Action 3 — Evening: Move to Hex 7 (clearing)**

> Timer: 4 → 3.
>
> **Pathfinder** rolls: result 15 (Critical Success). Chooses "Efficient route" (timer does not tick — stays at 3) and "Keen eye" (+1 boon on next Search here).
>
> **Lookout** rolls: result 10 (Weak Success). Chooses "Spot feature" — the GM confirms there is a point of interest here (the abandoned logging camp, visible).
>
> The party arrives at the clearing and finds the abandoned logging camp. They decide to camp here for the night.

**Action 4 — Camp**

> Timer: 3 → 2.
>
> The logging camp provides automatic shelter (it's a visible POI with shelter). The party skips the shelter roll.
>
> Each party member rolls Supply Checks for rations. The Druid's Forager roll is made: result 12 (Strong Success) — gathers enough food for 2 party members, so two of them skip their Supply Check.
>
> The party finds basic supplies in the camp (some rope, a rusty axe, dried herbs). They rest for the night.

**Day 2**

**Action 1 — Morning: Move to Hex 11 (forest)**

> Timer: 2 → 1.
>
> Pathfinder rolls: result 8 (Failure). Slow going — the party arrives but the timer ticks an additional time. Timer: 1 → 0.
>
> **Event fires!** The GM rolls d6: result 5 (Traces). The GM rolls on the Traces Sub-Table: result 1 (Tracks). Since Hex 11 is adjacent to the bandit camp, the GM describes: "You find boot prints and broken branches heading east — several people passed through here recently, moving with purpose."
>
> Timer resets to 6.
>
> The party now knows something lies to the east (Hex 12). The Rogue suggests scouting.

**Action 2 — Afternoon: Scout Hex 12**

> The party stays in Hex 11. The Rogue (reassigned to Scout for this action) ranges ahead to reconnoiter Hex 12.
>
> **Scout** rolls Agility + Stealth vs. TN 10: result 14 (Critical Success). Full reconnaissance — the GM reveals: "Dense forest with a concealed camp. You count five people, lightly armed. Cooking fire, stolen trade goods stacked under canvas. Discovery TN 10 if you were searching blind, but you've found them."
>
> Timer: 6 → 5. Although scouting itself does not tick the timer for the rest of the party, time still passes during this stretch — the party rests, forages, or keeps watch while the Scout is away. The timer ticks once as normal for the stretch.

**Action 3 — Evening: The party decides what to do**

> Armed with intelligence about the bandit camp, the party plans their approach. This becomes a new scene — possibly an Encounter (combat) or a Challenge (infiltration) — and the exploration procedure pauses until resolved.

---

## Summary

| Concept | Description |
|---------|-------------|
| **Time scale** | Exploration (2–4 hours per action). 3 actions per day before camp, 4th possible with penalties |
| **Map format** | Hex crawl (gridded hexes) or Point crawl (nodes and paths). Same procedure for both |
| **Dice timer** | d6 starting at 6. Ticks once per action. Event roll on expiry, then reset |
| **Roles** | Pathfinder (mandatory, navigation), Lookout (mandatory, awareness), Forager/Scout (optional) |
| **Move** | Enter an adjacent hex/point. Pathfinder rolls for route quality, Lookout rolls for awareness |
| **Search** | Spend an action to find hidden features. Roll vs. Discovery TN |
| **Discovery** | Core reward loop. Hidden POIs found through searching, clues, or events |
| **Events** | Same d6 structure as all time scales: Threat → Wear → Resource → Shift → Traces → Ambient |
| **Camping** | End-of-day action. Shelter roll, Supply Checks, night watch |
| **Challenges** | Overlay a Challenge die when the party has a specific search goal. Progress via Search/Track, not movement |
| **Backtracking** | Explored hexes/points can be re-entered without Pathfinder rolls or timer ticks |
| **Clue chains** | Traces, NPCs, and found maps seed clues that give +1 boon on discovery rolls in target hexes/points |
