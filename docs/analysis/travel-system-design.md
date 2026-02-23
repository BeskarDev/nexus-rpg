# Travel System Design Analysis

This document contains the proposed design for an overhauled travel system for Nexus RPG, inspired by The One Ring RPG (especially 2e). It is intended as a game design analysis and reference for future implementation.

---

## Design Goals

- Make journeys more engaging, tense, and interactive.
- Provide clear procedures for GMs and players.
- Ensure the system interacts meaningfully with resource management.
- Build on and streamline the current travel system.
- Keep the system modular and easy to use at the table.

---

## Core Concepts

### When to Use These Rules

Use these travel rules for **journeys between two known points or regions** that take place over multiple days. The party must be able to track a course and navigate to their destination (by memory, maps, or a guide).

**Use for:**
- Multi-day journeys to known destinations (cities, landmarks, regions)
- Traveling along established routes or through mapped terrain
- Returning to civilization from adventure sites (when not skipped for narrative reasons)

**Do not use for:**
- Exploring unknown/unmapped areas (hex exploration is a separate system)
- Short journeys (less than a day)
- When skipping for narrative convenience (the "boring" trip back)

### Abstracted Distance: Paces

Rather than miles, leagues, or kilometers, distance is measured in abstract **paces**. One day of travel in normal terrain covers 4 paces under normal conditions.

**Navigation Roll Results (paces cleared per day):**

| Result | Paces Cleared | Additional Effect |
|--------|---------------|-------------------|
| Blunder | 0 | Get lost (+1 bane next roll) |
| Failure | 2 | — |
| Weak/Strong Success | 4 | — |
| Strong Success | 4 | Choose one bonus (see below) |
| Critical Success | 6 | Choose two bonuses |

**Strong/Critical Success Bonuses:**
- Stay on track (+1 boon on next Navigation roll)
- Make a discovery (find something useful or interesting)
- Party is well-rested (one party member removes 1 fatigue)

**Terrain Modifiers (paces per day):**

| Terrain | Modifier |
|---------|----------|
| Easy (roads) | +1 pace |
| Normal (plains) | No modifier |
| Moderate (forest, hills, desert, tundra) | -1 pace |
| Difficult (mountains, swamp, jungle, haunted) | -2 paces |

**Mount/Vehicle Bonuses:**
- Riding horse: +1 pace (not in difficult terrain)
- Draft animal with wagon: -1 pace (carries more supplies)

### Forced March

The party may choose to push hard for extra distance. Before rolling:
- Gain **+2 paces** for the day
- Each party member gains **1 fatigue** at the end of the day
- Cannot force march on consecutive days without gaining additional fatigue

This keeps the pace choice simple and dramatic: conserve energy or push to arrive faster.

---

## The Progress Track

The journey is represented as a series of **progress boxes**. Each box typically represents 4 paces (one day in normal terrain).

```
Origin ◯ ◯ ◯ ◯ ◯ ◯ ◯ ◯ ◯ ◯ Destination
```

Mark waypoints on the track (⛺ camps, 🏘️ settlements, ⚠️ danger zones).

**Journey Length Examples:**
- Short journey (2–3 days): 8–12 paces
- Medium journey (5–7 days): 20–28 paces
- Long journey (10–14 days): 40–56 paces

---

## Daily Travel Procedure

At the **end of each travel day**, resolve the following:

### 1. Decide Forced March (Optional)
Declare if the party attempts a forced march (+2 paces, everyone gains 1 fatigue).

### 2. All Roles Roll

**Navigator (mandatory)** — Spirit + Nature or Mind + Education vs. Terrain TN:
- Clears paces based on result (see table above)

**Scout (mandatory)** — Spirit + Perception vs. TN 8:
- Blunder/Failure: Increase encounter die by 1 step (max d12)
- Weak Success: Choose one — find shelter, reduce encounter die by 1 step, or make a discovery
- Strong Success: Choose two
- Critical Success: Choose all three, or skip encounter roll entirely

**Optional roles:** Lookout, Quartermaster, Forager, Hunter, Fisher roll as needed.

*Multiple roles per person: +1 bane per additional role. Multiple people in same role: +1 boon to the roller.*

### 3. Calculate Progress

**Total paces** = Base paces (Navigator) + Terrain modifier + Mount bonus + Forced march bonus

Mark off progress boxes as paces accumulate (4 paces = 1 box).

### 4. Resolve Encounter

Roll the encounter die (base size from terrain, modified by Scout result):

| Roll | Type | Severity |
|------|------|----------|
| 1 | Fortuitous | Helpful or lucky |
| 2–3 | Neutral | Interesting but harmless |
| 4–6 | Challenging | Potentially harmful |
| 7–9 | Perilous | Dangerous |
| 10–11 | Dire | Very dangerous |
| 12 | Catastrophic | Extreme danger |

Consult terrain-specific encounter tables (see below). This may include combat, skill challenges, discoveries, or hazards.

### 5. Make Camp and Rest

**Supply Check:** Each party member rolls a Supply Check for their rations (roll supply die: 1–3 = spend 1 use, 4+ = no change).
- In extreme heat (desert): Roll Supply Check **twice** (increased water needs)
- In extreme cold: +1 bane on Supply Check (increased caloric needs)
- **Optional:** Spend 1 additional use to recover 1 fatigue (once per day)

**Shelter:** Based on Scout's success, the party has shelter or not.
- With shelter: Auto-succeed on rest, no fatigue gained
- Without shelter: Roll Strength + Fortitude vs. TN 8 or gain 1 fatigue

**Night watch:** Assign watches. Perception checks if night encounters occur.

---

## Travel Roles

### Navigator (Mandatory)
Roll **Spirit + Nature** or **Mind + Education** for progress.
- Strong+ success: Choose bonuses (on track, discovery, well-rested)
- Failure: Complications or slower progress
- Blunder: Get lost

### Scout (Mandatory)
Roll **Spirit + Perception** to modify encounters and find shelter.
- Critical success: Can skip encounter roll entirely
- Strong+ success: Find shelter, avoid danger, make discovery
- Failure/Blunder: Increase encounter frequency, surprised in combat

### Optional Roles

**Lookout:** Roll Spirit + Perception during travel to spot encounters early, allowing preparation or avoidance.

**Quartermaster:** Manages supplies, tracks rations, ensures efficient resource use.

**Forager:** Roll Mind + Nature to gather food, reducing ration consumption.

**Hunter:** Roll Spirit + Survival to hunt game (requires game in region), reducing ration consumption.

**Fisher:** Roll Spirit + Survival near water to catch fish, reducing ration consumption.

---

## Route Planning

Before departure, establish the journey parameters:

1. **Define route:** Origin, destination, and path through terrain types
2. **Estimate journey length:** Count expected paces based on terrain (GM determines)
3. **Plan rations:** Each pack of rations has 3 uses. Roll a Supply Check each day.
   - Normal conditions: ~1 pack per person per 6 days (d6 supply die average)
   - Extreme heat (desert): Double Supply Checks, ~1 pack per 3 days
   - Extreme cold: +1 bane on checks, ~1 pack per 4–5 days
   - Safety margin: Add 1–2 extra packs for emergencies
4. **Identify waypoints:** Settlements, landmarks, or known camps for resupply

---

## Waypoints

When the party reaches a waypoint box on the progress track:

- **Settlement (🏘️):** Resupply, safe rest, gather information
- **Landmark (🗿):** Navigation aid (+1 boon next roll), morale boost (remove 1 fatigue)
- **Camp (⛺):** Good shelter (auto-succeed on shelter), water source, hunting ground (+1 boon)
- **Danger (⚠️):** Scripted encounter or environmental hazard

---

## Special Situations

**Getting Lost:** When Navigator blunders, clear 0 paces and lose 4 paces already marked (backtracking). Next roll has +1 bane. Continue until weak+ success.

**Forced Detour:** Add 1d6 paces (minor) or 2d6 paces (major) when the route is blocked.

**Shortcuts:** Remove 1d4 paces (minor) or 1d6+2 paces (major) when discovering faster routes.

**Impossible Progress:** Severe weather, party exhaustion, or impassable terrain may prevent all progress for a day (resources still consumed).

---

## Weather & Climate

Weather creates additional pressure through conditions and resource drain.

**Weather Generation (optional, roll 1d12):**

| Roll | Condition | Effect |
|------|-----------|--------|
| 1 | Perfect | +1 boon Navigator |
| 2–4 | Clear | No modifiers |
| 5–7 | Overcast | Navigation by stars: –1 bane |
| 8–9 | Light rain/snow | Athletics in difficult terrain: –1 bane |
| 10–11 | Heavy rain/snow | Navigator –1 bane, Perception –1 bane, Scout –1 bane finding shelter |
| 12 | Severe weather | 0 progress, must find shelter or take 2d6 damage |

**Seasonal Modifiers:** Add to weather roll based on season and climate zone.

**Temperature Effects:**
- **Extreme Heat:** Roll Supply Check twice per day (water needs); Spirit + Fortitude TN 10 daily or gain 1 fatigue
- **Extreme Cold:** +1 bane on Supply Checks (caloric needs); need winter gear or –2 banes on all rolls; Spirit + Fortitude TN 10 daily or gain 1 fatigue

**Exposure Condition:** Failed weather saves or inadequate shelter grants exposure levels. Each level: –1 bane all rolls. At 3+ exposure: take 1 wound per day. Remove by reaching shelter and recovering.

---

## Environment Stat Blocks

Each terrain type has mechanical properties that affect travel difficulty, pace, encounters, and hazards.

---

### Road or Trail

*Well-maintained paths and established routes through civilized or well-traveled lands.*

**Traits:** Safe, Fast Travel, Well-Marked  
**Navigation TN:** 6 (Easy)  
**Terrain Modifier:** +1 pace  
**Encounter Die:** d8  
**Resource Pressure:** Low — settlements and waystations along route  
**Climate:** Varies by region  

**Hazards:**
- Bandits at ambush points (Tier 2–4)
- Toll collectors (legitimate or criminal)
- Blocked roads (fallen trees, wash-outs)
- Territorial disputes or patrols

---

### Plains & Grasslands

*Wide open spaces with rolling hills, tall grasses, and few obstacles.*

**Traits:** Open, Visible From Afar, Few Natural Shelters  
**Navigation TN:** 6 (Easy)  
**Terrain Modifier:** No penalty (baseline terrain)  
**Encounter Die:** d8  
**Resource Pressure:** Moderate — water sources scattered, game available  
**Climate:** Variable — hot summers, cold winters, frequent wind  

**Hazards:**
- Grass fires (especially in dry season)
- Sudden storms with no shelter
- Large predators (lions, wild horses, dire wolves)
- Hostile nomad tribes

---

### Forest

*Dense woodlands with thick canopy, winding paths, and abundant wildlife.*

**Traits:** Obscured Vision, Abundant Resources, Easy to Get Lost  
**Navigation TN:** 8 (Moderate)  
**Terrain Modifier:** –1 pace  
**Encounter Die:** d6  
**Resource Pressure:** Low — abundant foraging, hunting, water  
**Climate:** Temperate — cooler under canopy, frequent rain  

**Hazards:**
- Predators (bears, wolves, wild boar)
- Poisonous plants and insects
- Hidden pits and traps
- Disorienting fog
- Bandit ambushes

---

### Hills & Foothills

*Rolling elevation changes, rocky outcrops, and moderate climbing.*

**Traits:** Moderate Elevation, Rocky, Vantage Points  
**Navigation TN:** 8 (Moderate)  
**Terrain Modifier:** –1 pace  
**Encounter Die:** d6  
**Resource Pressure:** Moderate — water in valleys, game on slopes  
**Climate:** Variable — cooler than lowlands, sudden weather changes  

**Hazards:**
- Rockslides and loose scree (Agility + Athletics TN 10 or 1d6 damage)
- Cave systems (can get lost)
- Mountain predators (big cats, raptors)
- Hostile hill tribes

---

### Mountains

*Towering peaks, steep climbs, treacherous passes, and thin air.*

**Traits:** Extreme Elevation, Thin Air, Deadly Falls, Avalanche Risk  
**Navigation TN:** 12 (Difficult)  
**Terrain Modifier:** –2 paces  
**Encounter Die:** d6  
**Resource Pressure:** High — little food/water, cold, equipment strain  
**Climate:** Extreme Cold — winter makes passes impassable  

**Hazards:**
- Avalanches (Agility + Perception TN 14 to detect, TN 16 to escape, or buried)
- Falling from cliffs (4d6+ damage)
- Altitude sickness (Spirit + Fortitude TN 12 or fatigue)
- Frostbite and exposure
- Ice bridges and crevasses
- Mountain predators (eagles, yetis, ice elementals)

---

### Desert (Sandy)

*Vast seas of sand dunes, shifting terrain, scorching heat, and waterless wastes.*

**Traits:** Waterless, Extreme Heat, Shifting Sands, Disorienting  
**Navigation TN:** 10 (Challenging)  
**Terrain Modifier:** –1 pace  
**Encounter Die:** d6  
**Resource Pressure:** Extreme — **double water consumption**, no foraging  
**Climate:** Extreme Heat by day, cold at night  

**Hazards:**
- Heat exhaustion (Spirit + Fortitude TN 10 daily or gain 1 fatigue)
- Sandstorms (0 progress, Spirit + Survival TN 12 or 2d6 damage)
- Quicksand (Strength + Athletics TN 12 to escape)
- Desert predators (scorpions, snakes, sand wyrms)
- Dehydration (deadly if water runs out)
- Bandits and raiders at oases

---

### Badlands & Rocky Wastes

*Broken terrain, jagged rocks, little vegetation, and harsh conditions.*

**Traits:** Rocky, Broken Terrain, Little Water, Exposed  
**Navigation TN:** 10 (Challenging)  
**Terrain Modifier:** –1 pace  
**Encounter Die:** d6  
**Resource Pressure:** High — water scarce, little game, no foraging  
**Climate:** Hot days, cold nights, sudden storms  

**Hazards:**
- Rockslides (Agility + Athletics TN 10 or 2d6 damage)
- Flash floods in canyons (Agility + Athletics TN 12 or swept away)
- Venomous creatures (scorpions, snakes, spiders)
- Getting lost in maze-like formations
- Outlaws and exiles

---

### Swamp & Marsh

*Waterlogged ground, thick vegetation, stagnant pools, and hidden dangers.*

**Traits:** Wet, Diseased, Easy to Get Lost, Slow Movement  
**Navigation TN:** 10 (Challenging)  
**Terrain Modifier:** –2 paces  
**Encounter Die:** d4  
**Resource Pressure:** Moderate — water abundant but unsafe, fish available  
**Climate:** Humid, wet, constant rain or mist  

**Hazards:**
- Quickmud/Bog (Strength + Athletics TN 12 or sink slowly)
- Diseased water (Spirit + Fortitude TN 12 or diseased condition)
- Venomous creatures (snakes, insects, leeches)
- Poisonous gas pockets (Spirit + Fortitude TN 12 or poisoned)
- Will-o'-wisps lead astray
- Hostile swamp dwellers (lizardfolk, hags)

---

### Jungle

*Dense tropical forest, thick undergrowth, humid heat, and teeming life.*

**Traits:** Extremely Dense, Humid, Abundant Life, Dangerous Flora/Fauna  
**Navigation TN:** 10 (Challenging)  
**Terrain Modifier:** –2 paces  
**Encounter Die:** d6  
**Resource Pressure:** Low — abundant food and water, but dangerous to gather  
**Climate:** Hot, Humid, Frequent Rain (monsoon season makes travel nearly impossible)  

**Hazards:**
- Venomous creatures (snakes, spiders, frogs, insects)
- Predators (jaguars, crocodiles, giant snakes)
- Poisonous plants
- Disease-carrying insects (Spirit + Fortitude TN 10 or diseased)
- Thick undergrowth (must cut through, exhausting)
- Hostile tribes

---

### Tundra & Ice Fields

*Frozen plains, permafrost, sparse vegetation, and brutal cold.*

**Traits:** Frozen, Exposed, Waterless (frozen), Sparse Resources  
**Navigation TN:** 8 (Moderate)  
**Terrain Modifier:** –1 pace  
**Encounter Die:** d8  
**Resource Pressure:** Extreme — no foraging, little game, all water frozen  
**Climate:** Extreme Cold — deadly without proper gear  

**Hazards:**
- Frostbite (Spirit + Fortitude TN 12 daily or permanent injury)
- Blizzards (0 progress, severe damage if no shelter)
- Thin ice over water (Agility + Perception TN 10 or fall through)
- Polar predators (wolves, bears, yetis)
- Exposure and hypothermia
- Whiteout conditions (navigation impossible)

---

### Haunted or Cursed Lands

*Regions twisted by dark magic, undead presence, or supernatural corruption.*

**Traits:** Supernatural, Unnatural, Fear-Inducing, Reality-Warping  
**Navigation TN:** 12 (Difficult)  
**Terrain Modifier:** –2 paces  
**Encounter Die:** d4  
**Resource Pressure:** Extreme — water/food tainted, game fled or corrupted  
**Climate:** Unnatural — cold despite season, perpetual twilight, etc.  

**Hazards:**
- Undead creatures (Tier 3–6 encounters)
- Madness (Spirit + Fortitude TN 12 or frightened/confused)
- Cursed ground (various negative effects)
- Reality distortions (time loops, spatial warping)
- Corrupted water/food (poisoned or worse)
- Spirits and phantoms

---

## Encounter Tables

### Forest Encounter Table

**Fortuitous (1)**
1. Friendly hermit offers shelter and local knowledge
2. Patch of valuable medicinal herbs (+1d4 herb units)
3. Well-marked trail shortens journey (–1 progress box)
4. Game trail leads to abundant hunting grounds (+1 boon Hunter/Forager)
5. Sacred grove provides spiritual renewal (remove 1 fatigue from all)
6. Helpful forest spirits guide the way (+1 boon next Navigation roll)

**Neutral (2–3)**
1. Abandoned woodcutter's camp with some usable supplies
2. Deer herd passes nearby (can be hunted with Stealth check)
3. Ancient tree with carved warnings or directions
4. Woodsman's cache with basic provisions (1d4 rations)
5. Scenic waterfall and clear pool (good place to rest)
6. Evidence of recent travelers (tracks, old campfire)

**Challenging (4–6)**
1. Overgrown path requires time to clear (+1 hour, Strength + Athletics TN 8 or –1 progress)
2. Aggressive boar or bear defends territory (combat or intimidate to pass)
3. Thorny brambles slow progress (everyone takes 1d4 damage, –1 progress box)
4. Disorienting fog (Navigator has –1 bane next roll)
5. Flash flood blocks path (detour required, +1d3 progress boxes)
6. Bandits demand toll (negotiate, fight, or pay 10% of valuables)

**Perilous (7–9)**
1. Pack of hungry wolves (Tier 2–3 combat encounter, 2d4+2 wolves)
2. Poisonous plants cause illness (Spirit + Fortitude TN 10 or poisoned condition)
3. Hidden pit trap (Agility + Perception TN 10 or fall 20 feet, 2d6 damage)
4. Territorial giant spider ambush (Tier 3–4 combat encounter)
5. Wildfire forces dangerous detour through burning forest (Agility + Athletics TN 12 or 2d6 fire damage)
6. Bandits set ambush (Tier 2–4 combat encounter, 1d6+2 bandits)

**Dire (10–11)**
1. Ancient treant awakens, angry at intruders (Tier 5–6 Elite combat)
2. Cursed grove causes hallucinations and fear (Spirit + Fortitude TN 12 or frightened)
3. Massive wildfire blocks all routes (must backtrack, lose 1d4 progress boxes)
4. Bandit warlord's raiding party (Tier 4–5 combat, 2d4 bandits + leader)
5. Deadly disease from contaminated water (Spirit + Fortitude TN 14 or diseased)
6. Supernatural predator stalks the party (Tier 6 Elite, guerrilla tactics)

**Catastrophic (12)**
1. Dragon nests in the forest ahead (Tier 8+ Lord encounter or massive detour)
2. Entire forest section corrupted by dark magic (turn back or face corruption)
3. Legendary beast guards ancient power (Tier 7–8 Lord, may negotiate)
4. Portal to nightmare realm tears open (Tier 6–8 horror encounter)

---

### Desert Encounter Table

**Fortuitous (1)**
1. Hidden oasis with abundant water and shade (refill all waterskins, remove 1 fatigue)
2. Ancient waymarkers guide toward destination (+1 progress box)
3. Nomad caravan shares water and food (resupply 1d6 rations)
4. Ruins provide excellent shelter from sun (party well-rested)
5. Discover valuable trade goods in abandoned caravan (+50–200 coins value)
6. Friendly djinn offers magical assistance (one minor boon or guidance)

**Neutral (2–3)**
1. Mirage reveals nothing (wasted time and hope)
2. Scattered bones and abandoned equipment (scavenge 1d4 useful items)
3. Desert flowers bloom briefly after rare rain (beautiful but fleeting)
4. Ancient monument or statue (lore opportunity)
5. Circling vultures mark recent death (corpse may have supplies)
6. Dust devil passes nearby (impressive but harmless)

**Challenging (4–6)**
1. Intense heat wave (double water consumption for 24 hours)
2. Scorpions or vipers in camp (Agility + Perception TN 10 or 1d6 poison damage)
3. Equipment malfunction from heat/sand (one random item needs repair)
4. Disorienting shimmer affects navigation (Navigator –1 bane next roll)
5. Rocky terrain slows progress (–1 progress box)
6. Desperate outcasts demand water or supplies (negotiate or conflict)

**Perilous (7–9)**
1. Sandstorm forces emergency shelter (0 progress today, Spirit + Survival TN 10 or 2d6 damage)
2. Giant scorpions attack at night (Tier 3–4 combat, 1d4+1 scorpions)
3. Heat exhaustion (everyone makes Spirit + Fortitude TN 12 or gain 1 fatigue)
4. Desert raiders ambush near water source (Tier 3–5 combat, 2d4 raiders)
5. Quicksand pit (Agility + Athletics TN 12 or trapped, slowly sinking)
6. Dehydration crisis (water supplies spoiled, must find new source or suffer)

**Dire (10–11)**
1. Massive sandstorm lasts 1d3 days (0 progress, daily Spirit + Fortitude TN 14 or 1 wound)
2. Legendary sand wyrm erupts from dunes (Tier 6–7 Elite combat)
3. Lost in trackless wastes (erase 1d4 progress boxes, party disoriented)
4. Desert cult captures party for sacrifice (Tier 5–6 combat or roleplay escape)
5. Supernatural heat wave causes hallucinations (Spirit + Fortitude TN 14 or confused)
6. Poison all water sources (contaminated, need purification or alternate route)

**Catastrophic (12)**
1. Elemental sandstorm with hostile fire elementals (Tier 7–8 encounter)
2. Ancient desert guardian awakens (Tier 8+ Lord, protects sacred ground)
3. Reality-warping mirage maze (trapped until puzzle solved, supplies dwindling)
4. Army of undead rise from buried city (Tier 6–8 mass combat or retreat)

---

### Mountain Encounter Table

**Fortuitous (1)**
1. Mountain guide offers to lead through pass (+2 progress boxes, avoid hazards)
2. Natural hot springs provide warmth and healing (remove all fatigue, heal 1d6 HP)
3. Eagle guides to easier path (Navigator +1 boon next roll)
4. Dwarven outpost offers shelter and trade (resupply, safe rest)
5. Rare mountain herbs found (+1d4 valuable herb units)
6. Shortcut through cave system (–1d3 progress boxes)

**Neutral (2–3)**
1. Mountain goats pass by (can be hunted with difficulty)
2. Abandoned mine entrance (can explore for supplies or shelter)
3. Ancient altar with faded inscriptions (lore opportunity)
4. Eagle's nest with shiny objects (treasure if you can climb to it)
5. Echo canyon with strange acoustics (unsettling but safe)
6. Stone cairn marks old trail (minor navigation aid)

**Challenging (4–6)**
1. Loose scree makes climbing treacherous (Agility + Athletics TN 10 or 1d6 damage)
2. Narrow ledge requires careful passage (Agility + Athletics TN 8 or fall risk)
3. Altitude sickness affects party (Spirit + Fortitude TN 10 or –1 bane all rolls until lower altitude)
4. Rockfall blocks path (detour required, +1d3 progress boxes, or clear with effort)
5. Mountain storm forces shelter (0 progress today, cold damage risk)
6. Territorial mountain lions (Tier 2–3 combat or intimidation)

**Perilous (7–9)**
1. Avalanche danger zone (Agility + Perception TN 12 to detect, TN 14 to escape, or buried)
2. Ice bridge over chasm begins to crack (Agility + Athletics TN 12 or fall 4d6 damage)
3. Severe blizzard reduces visibility (0 progress, all exposed suffer 2d6 cold damage)
4. Hostile mountain tribesmen defend territory (Tier 3–5 combat, 2d4+2 warriors)
5. Giant eagle attacks (Tier 4–5 Elite combat)
6. Cliff collapse cuts off retreat (must find new route forward or difficult climb)

**Dire (10–11)**
1. Massive avalanche (entire party buried, survival challenge)
2. Ice giant demands toll or tribute (Tier 6–7 Elite, may negotiate)
3. Whiteout blizzard for days (trapped, daily cold damage and supply drain)
4. Dragon nests in mountain peak ahead (Tier 7–8 Elite/Lord, detour or confront)
5. Altitude and cold cause frostbite (permanent injury risk without treatment)
6. Supernatural mountain guardian judges party (Tier 6 Elite, trial or combat)

**Catastrophic (12)**
1. Volcanic eruption begins (massive danger, flee or die)
2. Ancient storm giant awakens (Tier 8+ Lord encounter)
3. Portal to elemental chaos opens in peak (Tier 7–8 mass encounter)
4. Earthquake collapses entire mountain pass (turn back or find impossible alternate route)

---

### Swamp Encounter Table

**Fortuitous (1)**
1. Raised dry ground provides safe camp and dry firewood (well-rested)
2. Friendly swamp dweller guides to solid path (+1 progress box)
3. Medicinal leeches or herbs (+1d4 healing items)
4. Abundant fish in clear pool (Hunter/Fisher automatic success)
5. Ancient boardwalk still functional (easier travel, +1 progress)
6. Will-o'-wisp leads to treasure cache (if followed with caution)

**Neutral (2–3)**
1. Unusual birds or insects (interesting but harmless)
2. Ruins of old pier or dock (scavenge rope and wood)
3. Massive ancient tree provides shelter (good landmark)
4. Floating plants create temporary bridges
5. Bioluminescent fungi light the way at night (eerie but helpful)
6. Old trapper's cache with basic supplies (1d3 rations)

**Challenging (4–6)**
1. Deep mud slows progress (–1 progress box, exhausting)
2. Biting insects cause distraction (everyone –1 bane on rolls for 24 hours)
3. Equipment gets waterlogged (one random item damaged)
4. Leech swarm causes minor wounds (everyone takes 1d4 damage)
5. Misleading will-o'-wisps lead astray (Navigator –1 bane next roll)
6. Aggressive crocodiles defend territory (Tier 2–3 combat or avoid)

**Perilous (7–9)**
1. Quickmud pit traps someone (Strength + Athletics TN 12 to escape or slowly sink)
2. Diseased water source (Spirit + Fortitude TN 12 or diseased condition)
3. Giant snakes ambush from water (Tier 3–4 combat, 1d3+1 snakes)
4. Poisonous gas pocket (Spirit + Fortitude TN 12 or poisoned, 2d6 damage)
5. Hostile lizardfolk territory (Tier 3–5 combat, 2d4 warriors)
6. Parasitic infection from insects (Spirit + Fortitude TN 14 or long-term illness)

**Dire (10–11)**
1. Hydra lair disturbed (Tier 6–7 Elite combat)
2. Black dragon's hunting ground (Tier 7–8 Elite/Lord)
3. Plague spreads through party (multiple Spirit + Fortitude TN 14 saves or diseased)
4. Undead rise from bog (Tier 5–6 combat, 3d4 bog zombies)
5. Reality-warping mist causes hallucinations (party may attack each other)
6. Ancient evil stirs in depths (Tier 6 Elite horror)

**Catastrophic (12)**
1. Massive flood drowns entire region (escape or drown)
2. Demon bound in swamp breaks free (Tier 8+ Lord encounter)
3. Necromantic corruption spreads (become undead or flee)
4. Portal to shadow realm opens (Tier 7–8 horror invasion)

---

## Quick Reference

**Each Travel Day (End of Day):**
1. Decide if forced march (optional: +2 paces, gain 1 fatigue)
2. All roles roll (Navigator vs Terrain TN; Scout vs TN 8; optional roles)
3. Calculate total paces: Base + terrain modifier + mount + forced march
4. Mark off progress boxes (4 paces = 1 box)
5. Roll encounter die → consult terrain table → resolve
6. Make camp: Supply Checks, shelter (affects fatigue), night watches

**Navigation Results:**

| Result | Paces |
|--------|-------|
| Blunder | 0 (get lost) |
| Failure | 2 |
| Weak/Strong Success | 4 |
| Critical Success | 6 |

**Terrain Modifiers:**

| Terrain | Modifier |
|---------|----------|
| Easy (roads) | +1 pace |
| Normal (plains) | No penalty |
| Moderate (forest, hills, desert, tundra) | –1 pace |
| Difficult (mountains, swamp, jungle, haunted) | –2 paces |

**Supply Check (rations):**
- Roll supply die (d4/d6/d8)
- 1–3: Spend 1 use (out of 3 per pack)
- 4+: No change
- Optional: Spend extra use to recover 1 fatigue (once per day)
- Extreme heat: Roll twice; extreme cold: +1 bane

**Encounter Die Steps:** d4 → d6 → d8 → d10 → d12
