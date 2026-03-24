# Hex & Point Crawl Exploration — Design Analysis

This document proposes a hex/point crawl procedure for Nexus RPG, built on the existing [Challenge System](../06-scenes/07-challenges/00-overview.md) and [Scene & Time Scale Procedures](../06-scenes/01-scenes-time-intervals.md). It operates at the **Exploration time scale** (~4 hours per turn) and provides a lightweight game loop for open-map adventuring — exploring unknown regions, discovering hidden locations, and navigating uncharted territory.

Where the [Travel System](../06-scenes/07-challenges/02-travel.md) handles **journeys between known destinations** (daily time scale, role-based), this system handles **freeform exploration of unmapped areas** (turn-based, player-driven).

---

## Design Goals

- Provide a **turn-based exploration loop** where each player chooses an action each turn, mirroring the structure of combat or dungeon delves.
- Emphasize **player agency**: each character decides what to do — move, search, scout, forage, hunt — rather than being locked into a role.
- Use a **day clock** to track time of day, including two night turns, and trigger events.
- Keep the procedure **lightweight**: movement costs turns, not rolls. Only searching, scouting, and survival actions require checks.
- Support both **hex crawl** (gridded map with terrain hexes) and **point crawl** (node-and-path map) formats.

---

## When to Use These Rules

Use this exploration procedure for **freeform movement through unknown or partially known regions** at the ~4-hour time scale.

**Use for:**
- Exploring uncharted wilderness, ruins, or island chains
- Searching a region for a hidden location (lost tomb, raider camp, beast's lair)
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
| **Point Crawl** | Network of named locations connected by paths. Each path has a terrain type and length (1–2 turns). Movement follows connections. | Regions shaped by geography (river valleys, mountain passes) or tighter narrative control |

### The Day Clock

A day of exploration is divided into **six watches**, tracked by a **d6 placed on the table** as a shared clock visible to all players. Each watch represents roughly 4 hours. The clock advances by 1 each time the party completes a turn.

| Clock | Watch | Notes |
|:-----:|-------|-------|
| **1** | Morning | First turn of the day |
| **2** | Midday | Second turn |
| **3** | Afternoon | Third turn |
| **4** | Evening | Fourth turn — party should camp |
| **5** | Before Midnight | Night turn. All rolls suffer +1 bane |
| **6** | After Midnight | Night turn. All rolls suffer +1 bane |

**Camping.** The party should take the Camp action on turn 4 (Evening). Each night turn taken without camping inflicts **1 Fatigue** on every adventurer.

### Movement

Each turn, the party can move up to **two hexes** (or along a path to the next point in a point crawl). Movement requires no roll — the party simply arrives. Direction is the players' choice.

**Reduced movement (1 hex per turn):** Moving through difficult terrain (dense forest, swamp, mountains, trackless desert), scouting an adjacent hex, or tracking a quarry each reduce movement to 1 hex. These reductions do not stack — any one of them caps movement at 1 hex.

### Exploration vs. Travel

| Feature | Travel | Exploration |
|---------|--------|-------------|
| **Destination** | Known target | Unknown — searching, wandering, discovering |
| **Time scale** | ~1 day per action | ~4 hours per turn (4 turns per day) |
| **Progress** | Challenge die counts down to arrival | Spatial — party moves across the map |
| **Map** | Route-based (A → B) | Area-based (hex grid or point network) |
| **Structure** | Role-based daily procedure | Turn-based — each player picks an action |
| **Events** | Once per day | Once per turn (subtle, frequent) |
| **Movement** | Abstracted into daily progress | Explicit — move across hexes/points |
| **Discovery** | Scout's bonus option | Core loop — the point of play |
| **Day length** | One day per session phase | 6 turns (4 day + 2 night) per day |

---

## Exploration Setup

Use these checklists at the table. Full details for each step follow below.

**Region Setup (GM, before play)**

1. Prepare the map and assign terrain
2. Place points of interest (visible and hidden)
3. Set the exploration difficulty
4. Roll or choose starting weather
5. Prepare the encounter table

> **d66 tables.** Several tables in this document use d66: roll two d6, the first picks the row, the second picks the column. This gives 36 results from a simple 6×6 grid.

### 1. Prepare the Map

**Hex crawl:** Draw or select a hex map. Assign a base terrain type to each hex (plains, forest, hills, desert, swamp, mountains, coast, etc.) based on the region's climate and geography. A region of 15–30 hexes provides several sessions of exploration.

**Point crawl:** Draw a network of named points (landmarks, crossroads, settlements, ruins) connected by paths. Label each path with a terrain type and length (1–2 turns).

To add variety, roll on the **Random Terrain Feature Table** (d66) and overlay results onto your base terrain. These features work with any climate:

| d66 | 1 | 2 | 3 | 4 | 5 | 6 |
|:---:|---|---|---|---|---|---|
| **1** | Ravine | Ridge | Cliff face | Boulder field | Sinkhole | Crevasse |
| **2** | Grove | Thicket | Deadfall | Canopy break | Hollow | Bramble patch |
| **3** | Stream crossing | Waterfall | Dry riverbed | Spring | Bog | Tidal pool |
| **4** | Cave mouth | Overhang | Rock arch | Cairn | Exposed bedrock | Quarry |
| **5** | Clearing | Plateau | Overlook | Depression | Terraced slope | Windswept flat |
| **6** | Ruins | Ancient road | Boundary marker | Abandoned camp | Burial mound | Stone circle |

> These features overlay the hex's base terrain — a "ravine" in a desert hex is a dry wadi; in forest, it's a tree-choked gorge. Use them to differentiate hexes that share the same base terrain.

### 2. Place Points of Interest

Scatter **points of interest** (POIs) across the map. Use the following table to quickly determine what (if anything) each hex holds, then roll for type and discovery reward:

**POI Distribution (d6)**

| d6 | Result |
|:--:|--------|
| 1–3 | No POI — the hex holds nothing notable |
| 4–5 | Hidden POI — present but not apparent; requires a successful Search to find |
| 6 | Visible POI — immediately apparent when entering the hex |

POIs are either **visible** (immediately apparent when entering the hex) or **hidden** (require a successful Search to find). For each hidden POI, assign a **Discovery TN**:

| Difficulty | TN | Examples |
|------------|----|---------|
| Moderate | 8 | Overgrown trail, partially hidden cave |
| Hard | 10 | Concealed entrance, buried cache |
| Very Hard | 12 | Magically hidden site, sealed vault |
| Legendary | 14 | Mythic locations, sacred sanctuaries |

**Supernatural hexes.** A small number of hexes (roughly 1 in 10) may hold a supernatural or magical quality — cursed ground, a divine wellspring, an arcane anomaly, or a place where the veil between worlds is thin. Mark these hexes during setup. Their effects are purely narrative or GM-designed; the POI Discovery Reward Table row 6 provides mechanical anchors for such sites (magical anomaly, portal, ancient artifact). A supernatural hex may be immediately apparent to those with relevant knowledge, or hidden behind a Legendary TN requiring specific rituals or magical senses to perceive.

To randomly generate POI types, roll d66:

**Random POI Type Table (d66)**

| d66 | 1 | 2 | 3 | 4 | 5 | 6 |
|:---:|---|---|---|---|---|---|
| **1** | Spring or oasis | Herb patch | Mineral vein | Game trail | Fruit grove | Medicinal plants |
| **2** | Ancient monument | Sacred tree | Waterfall shrine | Rock formation | Standing stones | Carved cliff |
| **3** | Cave shelter | Crumbling ruin | Abandoned camp | Hermit's dwelling | Overhang | Hot spring |
| **4** | Beast's lair | Raider camp | Cursed ground | Natural hazard | Predator den | Trapped ravine |
| **5** | Hidden entrance | Buried cache | Concealed shrine | Illusory terrain | Sealed tomb | Underground passage |
| **6** | Village | Outpost | Nomad camp | Trading post | Abandoned settlement | Temple or shrine |

For each POI, also determine the **reward** for fully discovering and "clearing" it (dealing with its challenges). Roll d66 on the **POI Discovery Reward Table**:

**POI Discovery Reward Table (d66)**

| d66 | 1 | 2 | 3 | 4 | 5 | 6 |
|:---:|---|---|---|---|---|---|
| **1** | Supply cache (2d4 rations, basic gear) | Raw materials (2d6 × 10 coins, Crafting to harvest) | Dead explorer's pack (1d4 rations, Q3 item, partial map) | Buried chest (3d6 × 10 coins, may be trapped) | Shrine offerings (4d6 × 10 coins, taking may anger spirits) | Minor magic item (Q3–Q4) |
| **2** | Clean water source (+1 boon on Forage in this hex) | Sheltered campsite (automatic shelter when camping here) | Vantage point (+1 boon on Scout from this hex) | Shortcut path (reduces travel to adjacent hex by 1 turn) | Hidden trail (bypasses difficult terrain to next hex) | Safe haven (no events while resting here) |
| **3** | Friendly NPC (offers trade, information, or a quest) | Grateful hermit (teaches a useful local skill or secret) | Wandering healer (offers healing services) | Traveling merchant (buys/sells goods) | Local guide (grants +1 boon on navigation for this region) | Ally recruitment (a potential companion) |
| **4** | Each adventurer regains 1 Resolve | Each adventurer removes 1 Fatigue | Inspiring site (each adventurer gains +1 boon on next roll) | Restful location (counts as a full rest if you stay a day) | Blessing (each adventurer gains +1 boon on Resist until next rest) | Omen (GM reveals one hidden POI location in this region) |
| **5** | Ancient inscription (reveals lore or a quest hook) | Map fragment (reveals 1d3 adjacent hexes and their POIs) | Prophetic vision (GM answers one yes/no question about the region) | Trail markers (grants +1 boon on Track in this region) | Warning signs (GM reveals one danger in adjacent hex) | Local legend (reveals the location of a hidden POI) |
| **6** | Dungeon entrance (leads to a deeper adventure site) | Treasure hoard (5d6 × 10 coins, guarded) | Rare crafting materials (Q4–Q5 components) | Ancient artifact (unique item, GM's choice) | Portal or passage (connects to a distant location) | Mysterious anomaly (GM's choice — magical, divine, or strange) |

> **Seeding clues.** Place trace clues in hexes adjacent to hidden POIs. When the event table produces a Traces result in those hexes, the pre-placed clue is used instead of rolling randomly. NPCs, found maps, and visible landmarks (smoke columns, distinctive peaks) also guide players. Each clue pointing to a hex grants **+1 boon** on Search rolls there (max +2 boons from multiple clues).

### 3. Set the Exploration Difficulty

Choose an **Exploration Difficulty** (TN) for the region. This is the default TN for searching, scouting, and survival rolls.

| Difficulty (TN) | Terrain Examples |
|------------------|-----------------|
| Medium (8) | Open plains, light woodland, gentle hills, coastal flats |
| Hard (10) | Dense forest, swamp, rocky desert, foothills |
| Very Hard (12) | Mountains, deep jungle, magical wasteland, trackless waste |
| Extreme (14) | Supernaturally obscured, shifting terrain, cursed lands |

> The difficulty can vary per hex if terrain changes significantly. For simplicity, use a single TN for the whole region and adjust only for notably different hexes.

### 4. Roll or Choose Starting Weather

Roll d6 on the **Weather Table** to set starting conditions. Weather changes when a Weather Shift event occurs (see Event Table).

| d6 | Weather | Effect |
|:--:|---------|--------|
| 1 | **Clear skies** | No effect. Pleasant conditions |
| 2 | **Overcast** | No mechanical effect. Grey skies, diffused light |
| 3 | **Light rain or wind** | Ranged attacks and Perception checks beyond close range suffer +1 bane |
| 4 | **Heavy rain, strong wind, or fog** | All Perception checks suffer +1 bane. Tracks are obscured (Track and Search for tracks suffer +1 bane) |
| 5 | **Storm or extreme heat/cold** | All outdoor rolls suffer +1 bane. Each adventurer rolls Strength + Fortitude vs. the Exploration Difficulty at the end of the day or gains 1 Fatigue |
| 6 | **Severe storm or sandstorm** | As above, plus movement is reduced to 1 hex per turn even in open terrain. Supply Checks use +1d, keep lowest |

> Weather persists until a **Weather Shift** event occurs, at which point the GM rolls again or shifts the weather one step in either direction on the table.

### 5. Prepare the Encounter Table

Create a d66 encounter table for the region, or use the **Generic Encounter Table** as a starting point:

| d66 | 1 | 2 | 3 | 4 | 5 | 6 |
|:---:|---|---|---|---|---|---|
| **1** | Predator (stalking) | Predator (territorial) | Predator pack | Scavengers | Venomous creatures | Apex predator |
| **2** | Raiders (scouts) | Raiders (ambush) | Raiders (camp) | Smugglers | Deserters | Cultists |
| **3** | Patrol (local) | Soldiers (marching) | Tax collectors | Bounty hunter | Mercenaries | Warlord's vanguard |
| **4** | Merchant (traveling) | Merchant (lost) | Peddler | Caravan | Prospectors | Artisan |
| **5** | Hermit | Pilgrim(s) | Refugees | Fellow adventurers | Wandering healer | Sage or scholar |
| **6** | Monster (solitary) | Monster (pair) | Monster (lair) | Undead | Spirit or apparition | Rare creature |

> Roll d6 for disposition: 1–2 hostile, 3–4 wary, 5 neutral, 6 friendly. Adjust based on context.

---

## Exploration Procedure

Use this checklist each turn. Full details for each step follow below.

**Each Exploration Turn**

1. Declare actions (each player chooses)
2. Resolve actions
3. Advance the day clock
4. Roll for event (d6, with sub-table if needed)
5. Check for day's end

### 1. Declare Actions

Each player declares what their character does this turn. The party typically acts as a group but may split up.

| Action | Description |
|--------|-------------|
| **Move** | Move up to 2 hexes in open terrain, or 1 hex in difficult terrain. No roll needed |
| **Search** | Thoroughly search the current hex/point for hidden features |
| **Scout** | Range ahead to observe an adjacent hex without the party entering it |
| **Forage** | Gather edible plants, clean water, and useful materials |
| **Hunt** | Track and kill game for food (requires game in the region and weapons/traps) |
| **Fish** | Catch fish or seafood (requires a water source and fishing gear) |
| **Track** | Follow tracks, trails, or clues to determine the direction of a target |
| **Investigate** | Examine a discovered POI in detail (enter a ruin, interact with an NPC, study an inscription) |
| **Camp** | Set up camp and rest. Requires a suitable spot; without one, roll Survival or suffer a bad night |

**Free activities** (do not cost a turn):
- Short discussion about direction or plans
- Consult a map or notes
- Eat a quick meal from rations
- Note the current hex/point on the party's map
- Brief conversation with a willing NPC

> **Moving as a group.** When the party moves together, one character leads navigation while each other character may perform a secondary action alongside the Move: keeping watch (Perception check), foraging (Nature check), or assisting the navigator (+1 boon). Secondary actions do not cost a separate turn.

> **Splitting up.** Characters may act independently (e.g., one searches while another scouts ahead). The clock advances once for the turn regardless — they act simultaneously within the same ~4-hour watch.

### 2. Resolve Actions

**Move.** The party moves up to 2 hexes in open terrain or 1 hex in difficult terrain. The GM describes each hex entered and any visible features or POIs. No roll is needed.

**Search.** Roll Spirit + Perception or Mind + Survival vs. the Exploration Difficulty.

The player does not know whether a hidden POI exists in the hex or what its Discovery TN is. The GM compares the roll result against any hidden POI's Discovery TN. If the result meets or exceeds the TN, the POI is found. If the result is below the TN (or no POI exists), the GM simply says "you find nothing" — the player cannot tell whether they missed something or the hex is truly empty.

| Result | Effect |
|--------|--------|
| Meets Discovery TN | Discover the hidden POI. The GM describes what is found |
| Below Discovery TN | Nothing found. The player does not know if something was missed |
| No POI exists | Nothing found. The GM says "you find nothing" (same response as above) |
| Blunder | Trigger a hazard or alert nearby creatures |

> A character may retry a Search on a later turn with +1 bane (diminishing returns).

When the party has received a Traces clue pointing to this hex, the Search gains **+1 boon**. Multiple clues stack (up to +2 boons).

**Scout.** Roll Agility/Spirit + Stealth or Survival vs. the Exploration Difficulty. Movement is reduced to 1 hex this turn (see Movement).

| Result | Effect |
|--------|--------|
| Success | Learn terrain type, visible POIs, and whether creatures or NPCs are present in the scouted hex |
| Failure | Learn the terrain type only |
| Blunder | Detected — hostile creatures in the hex are alerted and may pursue |

**Forage.** Roll Spirit/Mind + Nature vs. the Exploration Difficulty (requires plant life and water sources in the region).

| Result | Effect |
|--------|--------|
| Success | Choose one: fresh water (each party member rolls their next Supply Check twice, choose either result), edible plants (gain 1 × simple rations (d4), lose 1 use per day as they spoil), or useful materials (gain primitive materials (d6)) |
| Failure | Nothing found |
| Blunder | Poisonous harvest — each party member must roll Strength + Fortitude or Mind + Nature vs. the Exploration Difficulty during camp. On a failure, suffer 1 Fatigue |

**Hunt.** Roll Agility/Spirit + Survival vs. the Exploration Difficulty (requires game in the region and appropriate weapons or traps).

| Result | Effect |
|--------|--------|
| Weak Success | Small game — gain raw meat equal to 1 × simple rations (d4). Loses 1 use per day as it spoils |
| Strong Success | Good catch — gain raw meat equal to 2 × simple rations (d4). Loses 1 use per day as it spoils |
| Critical Success | Excellent catch — gain raw meat equal to 4 × simple rations (d4). Loses 1 use per day as it spoils |
| Failure | Nothing caught |
| Blunder | Dangerous prey — attacked by a predator. Roll Strength/Agility + Survival vs. the Exploration Difficulty. On a failure, suffer 1 Fatigue. On a blunder, suffer 1 Wound instead |

> An adventurer with the Wilderness Expert talent may turn raw meat into non-perishable rations.

**Fish.** Roll Spirit/Mind + Survival vs. the Exploration Difficulty (requires a water source and fishing gear).

| Result | Effect |
|--------|--------|
| Weak Success | Small catch — gain raw fish equal to 1 × simple rations (d4). Loses 1 use per day as it spoils |
| Strong Success | Good catch — gain raw fish equal to 2 × simple rations (d4). Loses 1 use per day as it spoils |
| Critical Success | Excellent catch — gain raw fish equal to 4 × simple rations (d4). Loses 1 use per day as it spoils |
| Failure | Nothing caught |
| Blunder | Dangerous waters — attract a water predator. Roll Strength/Agility + Survival vs. the Exploration Difficulty. On a failure, suffer 1 Fatigue. On a blunder, suffer 1 Wound instead |

> An adventurer with the Wilderness Expert talent may turn raw fish into non-perishable rations.

**Track.** Roll Spirit + Survival or Mind + Nature vs. the Exploration Difficulty (or a TN set by the quarry's Stealth). Movement is reduced to 1 hex this turn regardless of the result (see Movement). On success, the GM indicates which direction the quarry went and how recently. This includes following any trails discovered from Traces events.

**Investigate.** Examine a discovered POI in detail — enter a ruin, interact with an NPC, study an inscription, or deal with whatever the site contains. Resolved narratively or with specific skill checks as appropriate. Successfully clearing a POI's challenges earns the discovery reward assigned during setup (see POI Discovery Reward Table).

**Camp.** Set up camp and rest for the night. Follow the standard [Resting](../06-scenes/03-resting.md) rules. Each adventurer rolls a **Supply Check** for rations (unless fed by a Forage, Hunt, or Fish result). Assign night watches as desired. The camping turn still advances the day clock and triggers an event roll.

**Suitable camping spots** include any POI that provides shelter (a cave shelter, settlement, abandoned camp, etc.) or a terrain feature that affords natural protection (clearing, overhang, cave mouth, etc.). If no suitable spot is available, one character rolls Spirit + Survival vs. the Exploration Difficulty to establish a makeshift shelter:

- **Success:** Makeshift shelter found. The party rests normally.
- **Failure:** No adequate shelter. The party suffers a **bad night** (per the [Resting](../06-scenes/03-resting.md) rules).

> Each night turn taken without camping inflicts **1 Fatigue** on every adventurer.

### 3. Advance the Day Clock

Move the d6 clock forward by 1.

### 4. Roll for Event

At the end of each turn, the GM rolls **1d6** on the Exploration Event Table, then rolls a second **1d6** on the matching sub-table if one is listed.

**Exploration Event Table (d6)**

| d6 | Event |
|:--:|-------|
| **1** | **Encounter** — roll on the Encounter Sub-Table |
| **2** | **Weather Shift** — roll on the Weather Shift Sub-Table |
| **3** | **Wear and Tear** — each adventurer chooses one item they carry; items with Durability make a Durability check, all others lose 1 use |
| **4** | **Traces** — signs of something nearby; roll on the Traces Sub-Table, pointing toward a pre-placed hidden POI if one is adjacent |
| **5** | **Terrain Feature** — an obstacle or hazard; roll on the Terrain Feature Sub-Table |
| **6** | **Nothing** — the stretch passes without incident |

**Encounter Sub-Table (d6)**

| d6 | Encounter |
|:--:|-----------|
| 1 | Hostile creature or group — attacks on sight. Roll on the encounter table |
| 2 | Wary creature or group — defensive, may be negotiated with |
| 3 | Neutral NPC — traveler, pilgrim, or lost merchant; offers information or trade |
| 4 | Creature stalking the party — roll Spirit + Perception vs. Exploration Difficulty to notice before it acts |
| 5 | Territorial beast blocking the path — must be driven off, bypassed, or avoided |
| 6 | Roaming creature — passes through unless provoked |

**Weather Shift Sub-Table (d6)**

| d6 | Result |
|:--:|--------|
| 1 | **Improves** — weather shifts one step toward Clear on the Weather Table |
| 2 | **Worsens** — weather shifts one step toward Severe on the Weather Table |
| 3 | **Sign of improvement** — weather automatically improves one step at the start of next turn |
| 4 | **Sign of worsening** — weather automatically worsens one step at the start of next turn |
| 5 | **Back to neutral** — weather resets to Overcast regardless of current conditions |
| 6 | **No change** — skies shift and settle, but conditions remain the same |

**Traces Sub-Table (d6)**

| d6 | Trace |
|:--:|-------|
| 1 | Tracks — footprints, claw marks, or drag marks |
| 2 | Markings — carved symbols, trail blazes, or boundary stones |
| 3 | Remains — old campsite, scattered bones, or discarded gear |
| 4 | Sounds — distant calls, rushing water, or voices on the wind |
| 5 | Smoke or light — campfire smoke, signal fire, or an unnatural glow |
| 6 | Scent or sensation — sulfur, decay, incense, or a preternatural prickling |

**Terrain Feature Sub-Table (d6)**

| d6 | Feature |
|:--:|---------|
| 1 | Path blocked — fallen tree, collapsed bridge, or rockfall. Bypass with Athletics/Survival vs. Exploration Difficulty, or detour to an adjacent hex |
| 2 | Sudden hazard — rockslide, flash flood, or sinkhole. Each adventurer rolls Agility vs. Exploration Difficulty or suffers 1 Fatigue |
| 3 | Treacherous ground — unstable footing, flooded lowland, or dense thicket. Movement is limited to 1 hex this turn |
| 4 | Predator sign — fresh kills, territorial markings, or warning calls. Forage and Hunt suffer +1 bane until the next turn |
| 5 | Natural barrier — ravine, cliff face, or river crossing. Bypass requires a turn or a successful Athletics check |
| 6 | Ominous area — unnatural silence, strange markings, or a malignant chill. Each adventurer rolls Spirit + Fortitude vs. Exploration Difficulty or is briefly frightened |

> **Traces and clue direction.** When Traces occur, point the clue toward a pre-placed hidden POI if one is adjacent. Otherwise, point toward the nearest undiscovered POI. If none are nearby, roll d6 for a random adjacent hex (clockwise from north: 1=N, 2=NE, etc.) or select randomly among connected paths in a point crawl.

> **Event frequency.** Rolling each turn means up to 6 events per day. Most results (Weather, Traces, Nothing) are low-impact, keeping the pace moving. Only Encounters and Hazards demand immediate resolution.

### 5. Check for Day's End

After the 4th turn (Evening), the party should camp. If they continue into the night (turns 5–6), each turn without camping inflicts **1 Fatigue** on every adventurer. All rolls during night turns also suffer **+1 bane**. The day resets when the party wakes after a successful night's rest.

---

## Example: Exploring the Thornwood

### Setup

**Region:** The Thornwood — a dense, hilly forest rumored to contain the ruins of an ancient watchtower.

- **Exploration Difficulty:** TN 10 (Hard — dense forest)
- **Map:** 20 hexes (4×5 grid). Mostly dense forest (difficult), with two hill hexes, one stream hex, and one clearing (open).
- **Starting Weather:** Overcast (no effect).

**Placed POIs:**
- Hex 7 (clearing): Abandoned logging camp (visible). Reward: sheltered campsite (automatic shelter when camping here).
- Hex 12 (forest): Raider camp (hidden, Discovery TN 10). Reward: buried chest (3d6 × 10 coins, may be trapped).
- Hex 15 (hills): Ancient watchtower ruins (hidden, Discovery TN 12). Reward: dungeon entrance (deeper adventure site).
- Hex 18 (stream): Fresh water source (visible). Reward: clean water (+1 boon on Forage).

**Clue placement:** Hex 11 → "boot prints heading east" (points to raider camp). Hex 14 → "worked stone fragments" (points to watchtower).

### Play

The party: a Ranger, a Rogue, a Druid, and a Fighter.

**Day 1**

**Turn 1 — Morning (clock: 1).** The party moves into the Thornwood. Dense forest is difficult terrain, so they move 1 hex to Hex 2 (no roll needed — movement doesn't require rolls). The Ranger leads, the Rogue keeps watch, the Druid forages.

> **Rogue (Watch)** rolls Spirit + Perception vs. TN 10: result 9 — nothing spotted.
>
> **Druid (Forage)** rolls Spirit + Nature vs. TN 10: result 8 — nothing useful found.
>
> **Event roll (d6):** 6 → Nothing. The stretch passes quietly. Dense forest, occasional game trails.

**Turn 2 — Midday (clock: 2).** The party pushes to Hex 6 (forest — difficult, 1 hex). The Druid leads, the Rogue watches.

> **Rogue (Watch)** rolls Spirit + Perception vs. TN 10: result 12 — success. Spots something: the GM notes Hex 7 to the south is a clearing.
>
> **Event roll (d6):** 4, sub-table 2 → Traces (markings). Faded trail blazes carved into tree trunks, heading south. The GM notes this naturally points toward Hex 7.

**Turn 3 — Afternoon (clock: 3).** The party heads south. Hex 7 is a clearing (open terrain), so they can move 2 hexes — but the clearing is just 1 hex away. They arrive at Hex 7 and discover the abandoned logging camp (visible POI).

> No roll needed — open terrain.
>
> **Event roll (d6):** 2, sub-table 1 → Weather Shift (improves one step). The overcast sky clears. Weather shifts to Clear skies.
>
> The party finds the logging camp: basic shelter, a rusty axe, some rope, dried herbs.

**Turn 4 — Evening (clock: 4).** The party camps at the logging camp.

> The logging camp is a suitable camping spot. The Druid forages at camp: result 12 (Success) — chooses edible plants, gaining 1 × simple rations (d4). These spoil, losing 1 use at the start of each day. The others roll Supply Checks.
>
> **Event roll (d6):** 6 → Nothing. Quiet night. The party rests.

**Day 2**

**Turn 1 — Morning (clock: 1).** The party moves toward Hex 11 (forest — difficult terrain, 1 hex).

> **Event roll (d6):** 5, sub-table 1 → Terrain feature (path blocked). A fallen tree blocks the main approach. The GM calls for an Athletics check to bypass — the Fighter clears the way.

**Turn 2 — Midday (clock: 2).** The party arrives at Hex 11. The Ranger searches the area.

> **Ranger (Search)** rolls Spirit + Survival vs. TN 10: result 11. The GM checks: no hidden POI here. "You find nothing hidden in this hex."
>
> **Event roll (d6):** 4, sub-table 1 → Traces (tracks). The GM reveals the pre-placed clue for this hex: "Boot prints and broken branches heading east — several people passed through recently." This points toward the raider camp in Hex 12. Combined with the earlier trail blazes, the party now has two clues pointing east (+2 boons on Search in Hex 12).
>
> The Rogue suggests scouting before the party commits.

**Turn 3 — Afternoon (clock: 3).** The Rogue scouts Hex 12 while the Fighter hunts.

> **Rogue (Scout)** rolls Agility + Stealth vs. TN 10: result 14 — success. "Dense forest with a concealed camp. Five people, lightly armed. Cooking fire, stolen trade goods stacked under canvas."
>
> **Fighter (Hunt)** rolls Agility + Survival vs. TN 10: result 12 (Strong Success). Good catch — gains 2 × simple rations of raw meat.
>
> **Event roll (d6):** 3 → Wear and Tear. Each adventurer picks one item. The Druid's rope and the Ranger's shortbow both require Durability checks from heavy use in the thicket.
>
> Armed with intelligence, the party plans their approach. The exploration procedure pauses as the scene transitions to an encounter or infiltration challenge.
