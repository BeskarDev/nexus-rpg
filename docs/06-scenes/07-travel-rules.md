---
sidebar_position: 7
---

# 🗺️ Travel Rules

![banner-img](/img/banner/scenes-banner.png)

When adventurers journey across wilderness, they face environmental challenges, resource management, and unpredictable encounters. The travel system transforms long journeys into engaging adventures.

## When to Use Travel Rules

Use these travel rules for **journeys between two known points or regions** that take place over multiple days. The party must be able to track a course and navigate to their destination (by memory, maps, or a guide).

**Use for:**
- Multi-day journeys to known destinations (cities, landmarks, regions)
- Traveling along established routes or through mapped terrain
- Returning to civilization from adventure sites (when not skipped for narrative reasons)

**Do not use for:**
- Exploring unknown/unmapped areas (use hex exploration instead - future rules)
- Short journeys (less than a day)
- When skipping for narrative convenience (the "boring" trip back)

## Route Planning

Before departure, establish the journey parameters:

1. **Define route**: Origin, destination, and path through terrain types
2. **Estimate journey length**: Count expected paces based on distance and terrain (GM determines)
3. **Plan rations**: Each pack of rations has 3 uses. Plan for Supply Checks each day (roughly 1 use per 2 days on average with d6 supply die)
   - **Normal conditions**: 1 ration pack per person per 6 days (average)
   - **Extreme heat (desert)**: Double Supply Checks, plan 1 pack per 3 days
   - **Extreme cold**: +1 bane on checks, plan 1 pack per 4-5 days
   - **Safety margin**: Add 1-2 extra packs for emergencies
4. **Identify waypoints**: Settlements, landmarks, or known camps for resupply

**Journey Length Examples:**
- Short journey (2-3 days): 8-12 paces
- Medium journey (5-7 days): 20-28 paces
- Long journey (10-14 days): 40-56 paces

## The Progress Track

The journey is represented as a series of **progress boxes** - each box typically represents 4 paces (one day in normal terrain).

```
Origin ◯ ◯ ◯ ◯ ◯ ◯ ◯ ◯ ◯ ◯ Destination
```

Mark waypoints on the track (⛺ camps, 🏘️ settlements, ⚠️ danger zones).

## Daily Travel Procedure

At the **end of each travel day**, resolve the following procedure:

### 1. Determine Forced March (Optional)
Decide if the party attempts a **forced march** for this day:
- Gain +2 paces
- Each party member gains 1 fatigue
- Cannot be done on consecutive days without additional fatigue

### 2. All Travel Roles Roll

**Navigator (mandatory)** rolls **Spirit + Nature** or **Mind + Education** vs. **Terrain TN** (see Environment Stat Blocks):
- **Blunder**: 0 paces, get lost (+1 bane next roll)
- **Failure**: 2 paces
- **Weak Success**: 4 paces
- **Strong Success**: 4 paces, choose: on track (+1 boon next roll), discovery, or well-rested
- **Critical Success**: 6 paces, choose two bonuses

**Scout (mandatory)** rolls **Spirit + Perception** vs. **TN 8** to modify encounter frequency:
- **Blunder/Failure**: Increase encounter die by 1 step (max d12)
- **Weak**: Choose: find shelter, avoid danger (-1 die step, min d4), or make discovery
- **Strong**: Choose two
- **Critical**: Choose all three, or skip encounter roll

**Optional roles** (Lookout, Quartermaster, Forager, Hunter, Fisher) roll as needed.

### 3. Calculate Progress

**Total paces cleared** = Base paces (from Navigator) + Terrain modifier + Mount bonus + Forced march bonus

**Terrain Modifiers** (see Environment Stat Blocks):
- **Easy terrain** (roads): +1 pace
- **Normal terrain** (plains): No penalty
- **Moderate terrain** (forest, hills, desert): -1 pace
- **Difficult terrain** (mountains, swamp, jungle): -2 paces

**Mount/Vehicle Bonuses:**
- **Riding horses**: +1 pace (not in difficult terrain)
- **Draft animals with wagon**: -1 pace (carry more supplies)

**Forced march**: +2 paces (if used)

Mark off progress boxes as you accumulate paces (typically 4 paces = 1 box).

### 4. Resolve Encounter

**Roll encounter die** (base size from terrain, modified by Scout):
- **1**: Fortuitous (helpful)
- **2-3**: Neutral (interesting)
- **4-6**: Challenging (potentially harmful)
- **7-9**: Perilous (dangerous)
- **10-11**: Dire (very dangerous)
- **12**: Catastrophic (extreme danger)

Consult terrain-specific encounter tables and resolve the encounter. This may include combat, skill challenges, discoveries, or hazards.

### 5. Make Camp and Rest

**Supply Check**: Each party member rolls a **Supply Check** for their rations (roll supply die: 1-3 = spend 1 use, 4+ = no change)
- In extreme heat (desert): Roll Supply Check **twice** (increased water needs)
- In extreme cold: +1 bane on Supply Check (increased caloric needs)
- **Optional**: Spend additional uses to recover fatigue (1 use = recover 1 fatigue, once per day)

**Shelter**: Based on Scout's success, the party has shelter or not.
- **With shelter**: Auto-succeed on rest, no fatigue gained
- **Without shelter**: Roll **Strength + Fortitude** vs. **TN 8** or gain 1 fatigue

**Night watch**: Assign watches. Perception checks if night encounters occur.

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

**Lookout**: Roll **Spirit + Perception** during travel to spot encounters early, allowing preparation or avoidance.

**Quartermaster**: Manages supplies, tracks rations, ensures efficient resource use.

**Forager**: Roll **Mind + Nature** to gather food, reducing ration consumption.

**Hunter**: Roll **Spirit + Survival** to hunt game (requires game in region), reducing ration consumption.

**Fisher**: Roll **Spirit + Survival** near water to catch fish, reducing ration consumption.

Multiple roles per person suffer +1 bane per additional role. Multiple people in same role grant +1 boon to the roller.

## Weather & Climate

Weather creates additional pressure through conditions and resource drain.

**Weather Generation** (optional, roll 1d12):
- **1**: Perfect (ideal conditions, +1 boon Navigator)
- **2-4**: Clear (no modifiers)
- **5-7**: Overcast (gloomy, navigation by stars -1 bane)
- **8-9**: Light rain/snow (slippery, -1 bane Athletics in difficult terrain)
- **10-11**: Heavy rain/snow (Navigator -1 bane, Perception -1 bane, Scout -1 bane finding shelter)
- **12**: Severe weather (0 progress, must find shelter or take 2d6 damage)

**Seasonal Modifiers**: Add to weather roll based on season and climate (see Environment Stat Blocks).

**Temperature Effects**:
- **Extreme Heat**: Roll Supply Check twice per day (increased water needs), Spirit + Fortitude TN 10 daily or gain 1 fatigue
- **Extreme Cold**: +1 bane on Supply Checks (increased caloric needs), need winter gear or -2 banes on all rolls, Spirit + Fortitude TN 10 daily or gain 1 fatigue

**Exposure Condition**: Failed weather saves or inadequate shelter grants exposure levels. Each level: -1 bane all rolls. At 3+ exposure: take 1 wound per day. Remove by reaching shelter and recovering.

## Waypoints

When you accumulate enough paces to reach a waypoint box, resolve its effects:

- **Settlement (🏘️)**: Resupply, safe rest, gather information
- **Landmark (🗿)**: Navigation aid (+1 boon next roll), morale boost (recover 1 fatigue)
- **Camp (⛺)**: Good shelter (auto-succeed on shelter), water source, hunting ground (+1 boon)
- **Danger (⚠️)**: Scripted encounter or environmental hazard

## Special Situations

**Getting Lost**: When Navigator blunders, clear 0 paces and lose 4 paces already marked (backtracking). Next roll has +1 bane. Continue until weak+ success.

**Forced Detour**: Add 1d6 paces (minor) or 2d6 paces (major) when route is blocked.

**Shortcuts**: Remove 1d4 paces (minor) or 1d6+2 paces (major) when discovering faster routes through strong+ Navigator success with "discovery" or NPC guidance.

**Impossible Progress**: Severe weather, party exhaustion, or impassable terrain may prevent all progress for a day (still consume resources).

## Integration with Core Systems

**Skills**: Navigation (Spirit + Nature / Mind + Education), Scouting (Spirit + Perception), Survival (Spirit + Survival), Foraging (Mind + Nature), Athletics for difficult terrain.

**Conditions**: Fatigue from exhaustion or failed rest, wounds from environmental hazards, exposure from weather, poisoned/diseased from encounters.

**Resources**: Rations (each pack has 3 uses, roll Supply Check daily), camping equipment, weather gear, healing supplies.

**Combat**: Encounters can lead to combat scenes using standard rules. Surprise determined by Scout results.

## Quick Reference

**Each Travel Day (End of Day Procedure):**
1. Decide if forced march (optional: +2 paces, gain 1 fatigue)
2. All roles roll:
   - Navigator rolls vs Terrain TN → clear paces (0/2/4/4/6)
   - Scout rolls vs TN 8 → modify encounter die
   - Optional roles (Forager, Hunter, etc.) roll
3. Calculate total paces: Base + terrain modifier + mount + forced march
4. Mark off progress boxes (typically 4 paces = 1 box)
5. Roll encounter die → consult terrain table → resolve encounter
6. Make camp:
   - Each party member rolls Supply Check for rations (1-3 = spend 1 use, 4+ = no change)
     - Extreme heat: Roll Supply Check twice
     - Extreme cold: +1 bane on Supply Check
     - Optional: Spend extra use to recover 1 fatigue
   - Rest with/without shelter (affects fatigue)

**Navigation Results:**
- Blunder: 0 paces, get lost
- Failure: 2 paces
- Weak/Strong Success: 4 paces
- Critical Success: 6 paces

**Modifiers:**
- Forced March: +2 paces (gain 1 fatigue at end of day)
- Mount (horse): +1 pace (not in difficult terrain)
- Mount (wagon): -1 pace (carry more supplies)

**Terrain Penalties:**
- Easy (roads): +1 pace
- Normal (plains): No penalty
- Moderate (forest, hills, desert, tundra): -1 pace
- Difficult (mountains, swamp, jungle, haunted): -2 paces

**Rations Supply Check:**
- Roll your ration's supply die (d4/d6/d8)
- 1-3: Spend 1 use (out of 3)
- 4+: No change
- Optional: Spend extra use to recover 1 fatigue (once per day)

**Encounter Die Steps:** d4 → d6 → d8 → d10 → d12

See **Travel Encounters** and **Environment Stat Blocks** for detailed tables and terrain-specific rules.
