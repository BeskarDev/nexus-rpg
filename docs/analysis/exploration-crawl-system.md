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

To add variety, overlay **terrain features** onto your base terrain using the **Terrain Feature Table (d66)** in the [Random Tables](#random-tables) section. Features like ravines, groves, and ruins work with any climate and terrain type. Use them to differentiate hexes that share the same base terrain.

### 2. Place Points of Interest

Scatter **points of interest** (POIs) across the map. Use the **POI Distribution Table** in the [Random Tables](#random-tables) section to determine whether each hex holds no POI, a hidden POI, or a visible one.

POIs are either **visible** (immediately apparent when entering the hex) or **hidden** (require a successful Search to find). For each hidden POI, assign a **Discovery TN**:

| Difficulty | TN | Examples |
|------------|----|---------|
| Moderate | 8 | Overgrown trail, partially hidden cave |
| Hard | 10 | Concealed entrance, buried cache |
| Very Hard | 12 | Magically hidden site, sealed vault |
| Legendary | 14 | Mythic locations, sacred sanctuaries |

To randomly generate POI types and discovery rewards, use the **Random POI Type Table (d66)** and **POI Discovery Reward Table** in the [Random Tables](#random-tables) section.

**Supernatural hexes.** Roughly 1 in 10 hexes may hold a supernatural or magical quality — cursed ground, a divine wellspring, an arcane anomaly, or a place where the veil between worlds is thin. Mark these during setup, then roll on the **Supernatural Feature Table** in the [Random Tables](#random-tables) section to determine the specific type and its mechanical effects. A supernatural hex is always hidden; its Discovery TN is Very Hard (12) or Legendary (14), and perceiving it may require specific rituals or magical senses.

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

Roll d6 on the **Weather Table** (see [Random Tables](#random-tables)) to set starting conditions. Weather persists until a **Weather Shift** event occurs, at which point the GM consults the Weather Shift Sub-Table to determine how conditions change.

### 5. Prepare the Encounter Table

Create a d66 encounter table for the region, or use the **Generic Encounter Table** from the [Random Tables](#random-tables) section. When an Encounter event occurs during play, roll three times:

1. **Subject** — roll d66 on the Generic Encounter Table (or region-specific table)
2. **Activity** — roll d6 on the Encounter Activity Table (what are they doing right now?)
3. **Complication** — roll d6 on the Encounter Complication Table (what makes this interesting?)

Frame the encounter as: *"[Subject] is [Activity], but [Complication]."* Adjust freely for context.

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

**Suitable camping spots** include any POI that provides shelter (such as a cave shelter, settlement, or abandoned camp) or a terrain feature that affords natural protection (such as a clearing, overhang, or cave mouth). If no suitable spot is available, one character rolls Spirit + Survival vs. the Exploration Difficulty to establish a makeshift shelter:

- **Success:** Makeshift shelter found. The party rests normally.
- **Failure:** No adequate shelter. The party suffers a **bad night** (per the [Resting](../06-scenes/03-resting.md) rules).

> Each night turn taken without camping inflicts **1 Fatigue** on every adventurer.

### 3. Advance the Day Clock

Move the d6 clock forward by 1.

### 4. Roll for Event

At the end of each turn, the GM rolls **1d6** on the Exploration Event Table, then rolls a second **1d6** on the matching sub-table. All sub-tables are in the [Random Tables](#random-tables) section.

**Exploration Event Table (d6)**

| d6 | Event |
|:--:|-------|
| **1** | **Encounter** — roll Subject (Generic Encounter Table), Activity, and Complication (see Random Tables) |
| **2** | **Weather Shift** — roll on the Weather Shift Sub-Table (see Random Tables) |
| **3** | **Wear and Tear** — each adventurer chooses one item they carry; items with Durability make a Durability check, items with uses lose 1 use, all other items are unaffected |
| **4** | **Traces** — signs of something nearby; roll on the Traces Sub-Table (see Random Tables), pointing toward a pre-placed hidden POI if one is adjacent |
| **5** | **Terrain Feature** — an obstacle or hazard; roll on the Terrain Feature Sub-Table (see Random Tables) |
| **6** | **Nothing** — the stretch passes without incident |

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

---

## Random Tables

All tables used during setup and play are collected here. The procedures in the sections above reference each table by name.

---

### Terrain Feature Table (d66)

Roll d66 and overlay the result onto the hex's base terrain. A ravine in a desert is a dry wadi; in forest, it is a tree-choked gorge.

| d66 | 1 | 2 | 3 | 4 | 5 | 6 |
|:---:|---|---|---|---|---|---|
| **1** | Ravine | Ridge | Cliff face | Boulder field | Sinkhole | Crevasse |
| **2** | Grove | Thicket | Deadfall | Canopy break | Hollow | Bramble patch |
| **3** | Stream crossing | Waterfall | Dry riverbed | Spring | Bog | Tidal pool |
| **4** | Cave mouth | Overhang | Rock arch | Cairn | Exposed bedrock | Quarry |
| **5** | Clearing | Plateau | Overlook | Depression | Terraced slope | Windswept flat |
| **6** | Ruins | Ancient road | Boundary marker | Abandoned camp | Burial mound | Stone circle |

---

### POI Distribution (d6)

Roll once per hex to determine what it holds before assigning a type or reward.

| d6 | Result |
|:--:|--------|
| 1–3 | No POI — the hex holds nothing notable |
| 4–5 | Hidden POI — present but not apparent; requires a successful Search to find |
| 6 | Visible POI — immediately apparent when entering the hex |

---

### Random POI Type Table (d66)

| d66 | 1 | 2 | 3 | 4 | 5 | 6 |
|:---:|---|---|---|---|---|---|
| **1** | Spring or oasis | Herb patch | Mineral vein | Game trail | Fruit grove | Medicinal plants |
| **2** | Ancient monument | Sacred tree | Waterfall shrine | Rock formation | Standing stones | Carved cliff |
| **3** | Cave shelter | Crumbling ruin | Abandoned camp | Hermit's dwelling | Overhang | Hot spring |
| **4** | Beast's lair | Raider camp | Natural hazard | Predator den | Trapped ravine | Ancient road section |
| **5** | Hidden entrance | Buried cache | Concealed shrine | Sealed tomb | Underground passage | Collapsed structure |
| **6** | Village | Outpost | Nomad camp | Trading post | Abandoned settlement | Temple or shrine |

---

### Supernatural Feature Table (d6)

Rolled when the party discovers a supernatural hex (see Exploration Setup §2). Each result includes a specific mechanical effect so the GM has a ready-to-use encounter.

| d6 | Feature | Mechanical Effect |
|:--:|---------|-----------------|
| 1 | **Cursed Ground** — soil blackened and barren, unnatural chill in the air | Creatures resting here gain no benefit from the rest. Supply Checks have +1 bane while camped here. The curse lifts if a character succeeds on a Spirit + Mysticism roll vs. Exploration Difficulty (ritual takes 1 turn) |
| 2 | **Divine Wellspring** — a pool or spring that pulses faintly with warm light | Each adventurer who drinks removes 1 Fatigue and 1 Wound (once per visit). The site is sacred; desecrating it (looting offerings, violence) triggers a Morale-style consequence |
| 3 | **Arcane Anomaly** — drifting motes of light, items levitating, or echoes of words never spoken | Arcane magic is unstable here. Each time a spell is cast, roll d6: 1 it misfires (reroll on the mishap table), 2–3 it costs double Focus, 4–6 it functions normally. The anomaly radiates visible light — visible from adjacent hexes |
| 4 | **Spirit-Haunted Ground** — whispers at the edge of hearing, faces in reflective surfaces | Ancestors or bound spirits dwell here. A character may attempt communion (Spirit + Mysticism vs. TN 10) to gain one of: reveal a hidden POI in the region, answer one yes/no question about local history, or receive a short-duration blessing (+1 boon on one skill for the rest of the day) |
| 5 | **Ley Line Nexus** — cracks of light in the earth, subtle vibration in metal and bone | Spellcasters recover 1 Focus at the start of each turn spent here (in addition to normal recovery). The nexus is visible from adjacent hexes as a faint glow. Staying overnight here counts as a full rest for spellcasters |
| 6 | **Thin Veil** — reflections move a heartbeat late, temperature swings without cause | The boundary between worlds is weak. At the start of each turn spent here, the GM rolls d6: 1–2 a hostile spirit manifests (treat as Encounter with spirit from Generic Encounter Table row 6), 3–4 a curious spirit offers cryptic information (GM reveals one clue or hidden POI), 5–6 a vision of the site's past plays out (purely narrative, no mechanical effect) |

---

### POI Discovery Reward Table

Rolled (or chosen by the GM) when the party fully discovers and clears a POI. Roll 1d6 for the category, then 1d6 on the matching sub-table.

| d6 | Discovery | Effect |
|:--:|-----------|--------|
| 1 | **Treasure** | Valuables, with complications. Roll on sub-table |
| 2 | **Breathtaking Sight** | Each adventurer regains 1 Resolve. Roll on sub-table for the description |
| 3 | **Useful Find** | A practical boon for continued exploration. Roll on sub-table |
| 4 | **Haven** | Shelter and a rest bonus. Roll on sub-table |
| 5 | **Intelligence** | Information about the region. Roll on sub-table |
| 6 | **Wanderers** | An NPC encounter. Roll on sub-table |

#### Treasure

| d6 | Situation |
|:--:|-----------|
| 1 | Buried cache — 2d6 × 10 coins, 2d4 rations, and basic gear. No complications |
| 2 | Creature-guarded hoard — drive off or outwit the guardian to claim it (3d6 × 10 coins) |
| 3 | Trapped container — Mind + Crafting vs. Exploration Difficulty to open safely; failure causes 2d6 damage |
| 4 | Dead explorer's pack — 1d4 rations, one Q3 item, and a partial map of the region |
| 5 | Shrine offering — worth 4d6 × 10 coins, but taking it invites spiritual hostility (+1 bane on Resist until next rest) |
| 6 | Concealed vault — a minor magic item (Q3–Q4) |

#### Breathtaking Sight

| d6 | Sight |
|:--:|-------|
| 1 | A half-buried colossus, ancient and enormous, gazing toward a forgotten horizon |
| 2 | An overlook revealing the full sweep of the land — hidden valleys, distant peaks, a glinting river |
| 3 | A spring-fed pool, perfectly still, in a glade carpeted with wildflowers |
| 4 | Elaborate carvings covering an entire cliff face, depicting gods or histories long lost |
| 5 | A tower ruin whose topmost course still stands against all reason, wrapped in flowering vines |
| 6 | A grove of enormous ancient trees, their roots slowly consuming the stonework of a forgotten city |

#### Useful Find

| d6 | Find |
|:--:|------|
| 1 | Clean water source — each party member rolls their next Supply Check twice and takes the better result |
| 2 | Vantage point — the next Scout action taken from this hex gains +1 boon |
| 3 | Shortcut — travel to one adjacent hex this day costs 0 turns instead of 1 |
| 4 | Rare materials — gain crafting components (Q3–Q4 quality, 2d6 × 10 coins value) |
| 5 | Trail markers or an old map fragment — reveals 1d3 adjacent hexes and any visible POIs within them |
| 6 | Forgotten cache of tools — gain a d6 supply die of general equipment (rope, torches, tools) |

#### Haven

| d6 | Location |
|:--:|----------|
| 1 | Old campsite with fire pit — automatic shelter and 1d4 simple rations |
| 2 | Hunter's hut or shepherd's refuge — automatic shelter and basic tools (d6 supply die) |
| 3 | Roadside shrine — automatic shelter and one party member who prays regains 1 Resolve |
| 4 | Mine or cave entrance — automatic shelter and 1d4 units of primitive materials |
| 5 | Hermit's dwelling — automatic shelter and one piece of local knowledge (GM reveals a hidden POI) |
| 6 | Sacred grove or waystone — automatic shelter and each adventurer skips today's ration Supply Check |

#### Intelligence

| d6 | Information |
|:--:|-------------|
| 1 | Warning signs — GM reveals one danger or hostile group in an adjacent hex |
| 2 | Map fragment — reveals 1d3 adjacent hexes and their terrain and POI status |
| 3 | Ancient inscription — answers one yes/no question about the region's history or threats |
| 4 | Trail markers — grants +1 boon on all Track rolls in this region for the rest of the session |
| 5 | Prophetic omen — GM reveals one outcome if the party takes a specific route or action today |
| 6 | Local legend — GM reveals the location of one hidden POI anywhere in the region |

#### Wanderers

| d6 | Encounter |
|:--:|-----------|
| 1 | Merchant or peddler — offers trade at standard prices; carrying one unusual or rare item |
| 2 | Patrol or soldiers — reveal one settlement, checkpoint, or known danger in the region |
| 3 | Hermit or sage — grants +1 boon on one skill roll of the party's choice; asks a small service in return |
| 4 | Fellow adventurers — share regional knowledge; offer to camp together tonight (automatic shelter) |
| 5 | Refugees or displaced folk — reveal the next exploration event category before it occurs |
| 6 | Suspicious individual — uncertain intentions; could trade, help, or be scouting for enemies |

---

### Generic Encounter Table (d66)

Roll d66 for the **Subject** of the encounter. Combine with the Activity and Complication tables below.

| d66 | 1 | 2 | 3 | 4 | 5 | 6 |
|:---:|---|---|---|---|---|---|
| **1** | Predator (stalking) | Predator (territorial) | Predator pack | Scavengers | Venomous creatures | Apex predator |
| **2** | Raiders (scouts) | Raiders (ambush) | Raiders (camp) | Smugglers | Deserters | Cultists |
| **3** | Patrol (local) | Soldiers (marching) | Tax collectors | Bounty hunter | Mercenaries | Warlord's vanguard |
| **4** | Merchant (traveling) | Merchant (lost) | Peddler | Caravan | Prospectors | Artisan |
| **5** | Hermit | Pilgrims | Refugees | Fellow adventurers | Wandering healer | Sage or scholar |
| **6** | Monster (solitary) | Monster (pair) | Monster (lair) | Undead | Spirit or apparition | Rare creature |

---

### Encounter Activity Table (d6)

Roll d6 to determine what the encounter subject is **doing** when first encountered.

| d6 | Activity |
|:--:|----------|
| 1 | **Traveling through** — moving toward a destination; wary of strangers but not hostile |
| 2 | **Resting or camped** — settled and off-guard; may be caught by surprise |
| 3 | **Hunting or foraging** — actively searching for prey or resources; focused and alert to movement |
| 4 | **Guarding or patrolling** — watching over a location, path, or object; alert and suspicious |
| 5 | **Fleeing or hiding** — evading a threat elsewhere in the region; desperate and fast-moving |
| 6 | **Stalking or pursuing** — tracking the party or another target with hostile intent |

---

### Encounter Complication Table (d6)

Roll d6 for the **complication** — the twist, quirk, or problem that makes the encounter memorable.

| d6 | Complication |
|:--:|--------------|
| 1 | **Carrying something valuable** — supplies, loot, a message, or a captive |
| 2 | **Injured or exhausted** — weakened and possibly desperate for aid or rest |
| 3 | **Lost or disoriented** — uncertain of their location; may ask for directions or aid |
| 4 | **Pursued by another threat** — something dangerous follows close behind them |
| 5 | **Acting under orders** — have specific instructions that put them in conflict with the party's interests |
| 6 | **Concealing a secret** — hidden motives, dangerous cargo, or information they won't share willingly |

---

### Weather Table (d6)

Roll to set starting weather or to determine new weather when conditions reset.

| d6 | Weather | Effect |
|:--:|---------|--------|
| 1 | **Clear skies** | No effect. Pleasant conditions |
| 2 | **Overcast** | No mechanical effect. Grey skies, diffused light |
| 3 | **Light rain or wind** | Ranged attacks and Perception checks beyond close range suffer +1 bane |
| 4 | **Heavy rain, strong wind, or fog** | All Perception checks suffer +1 bane. Tracks are obscured (Track and Search for tracks suffer +1 bane) |
| 5 | **Storm or extreme heat/cold** | All outdoor rolls suffer +1 bane. Each adventurer rolls Strength + Fortitude vs. the Exploration Difficulty at end of day or gains 1 Fatigue |
| 6 | **Severe storm or sandstorm** | As above, plus movement is reduced to 1 hex per turn even in open terrain. Supply Checks use +1d, keep lowest |

---

### Exploration Event Sub-Tables

The following sub-tables are used when the Exploration Event Table result calls for one.

#### Encounter Activity Sub-Table → *see Encounter Activity Table above*

When an Encounter event occurs, roll on the Generic Encounter Table for the subject, then use the Encounter Activity and Encounter Complication tables to build the scene.

#### Weather Shift Sub-Table (d6)

| d6 | Result |
|:--:|--------|
| 1 | **Improves** — weather shifts one step toward Clear on the Weather Table |
| 2 | **Worsens** — weather shifts one step toward Severe on the Weather Table |
| 3 | **Sign of improvement** — weather automatically improves one step at the start of next turn |
| 4 | **Sign of worsening** — weather automatically worsens one step at the start of next turn |
| 5 | **Back to neutral** — weather resets to Overcast regardless of current conditions |
| 6 | **No change** — skies shift and settle, but conditions remain the same |

#### Traces Sub-Table (d6)

| d6 | Trace |
|:--:|-------|
| 1 | Tracks — footprints, claw marks, or drag marks |
| 2 | Markings — carved symbols, trail blazes, or boundary stones |
| 3 | Remains — old campsite, scattered bones, or discarded gear |
| 4 | Sounds — distant calls, rushing water, or voices on the wind |
| 5 | Smoke or light — campfire smoke, signal fire, or an unnatural glow |
| 6 | Scent or sensation — sulfur, decay, incense, or a preternatural prickling |

#### Terrain Feature Sub-Table (d6)

| d6 | Feature |
|:--:|---------|
| 1 | Path blocked — fallen tree, collapsed bridge, or rockfall. Bypass with Athletics/Survival vs. Exploration Difficulty, or detour to an adjacent hex |
| 2 | Sudden hazard — rockslide, flash flood, or sinkhole. Each adventurer rolls Agility vs. Exploration Difficulty or suffers 1 Fatigue |
| 3 | Treacherous ground — unstable footing, flooded lowland, or dense thicket. Movement is limited to 1 hex this turn |
| 4 | Predator sign — fresh kills, territorial markings, or warning calls. Forage and Hunt suffer +1 bane until the next turn |
| 5 | Natural barrier — ravine, cliff face, or river crossing. Bypass requires a turn or a successful Athletics check |
| 6 | Ominous area — unnatural silence, strange markings, or a malignant chill. Each adventurer rolls Spirit + Fortitude vs. Exploration Difficulty or is briefly frightened |
