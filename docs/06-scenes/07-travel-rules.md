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
2. **Calculate distance**: Use map scale to determine leagues/miles
3. **Estimate time**: Divide distance by terrain pace rate (see Environment Stat Blocks)
4. **Plan resources**: Rations needed = Party Size × Days × Climate Multiplier (1× normal, 2× desert heat, 1.5× cold)
5. **Identify waypoints**: Settlements, landmarks, or known camps for resupply

**Pace & Travel Rates** (leagues per day):

| Terrain | Slow | Normal | Fast |
|---------|------|--------|------|
| Road/Trail | 8 | 10 | 12 |
| Plains | 7 | 9 | 11 |
| Forest/Hills | 5 | 6 | 7 |
| Mountains | 3 | 4 | 5 |
| Desert | 6 | 7 | 8 |
| Swamp | 4 | 5 | 6 |

## The Progress Track

The journey is represented as a series of **progress boxes** - typically 1 box per expected day of travel.

```
Origin ◯ ◯ ◯ ◯ ◯ ◯ ◯ ◯ ◯ ◯ Destination
```

Mark waypoints on the track (⛺ camps, 🏘️ settlements, ⚠️ danger zones).

## Daily Travel Procedure

### 1. Morning Phase
- Choose **pace**: Slow (+1 boon travel rolls, -1 progress), Normal (balanced), or Fast (-1 bane travel rolls, +1 progress)
- Assign **travel roles**: Navigator (mandatory), Scout (mandatory), and optional roles

### 2. Midday Phase - Progress Roll

**Navigator** rolls **Spirit + Nature** or **Mind + Education** vs. **Terrain TN** (see Environment Stat Blocks).

**Results:**
- **Blunder**: Mark 0 boxes, get lost (+1 bane next roll), complication
- **Failure**: Mark 0 boxes, choose: slowed or complication
- **Weak**: Mark 1 box
- **Strong**: Mark 2 boxes, choose: on track (+1 boon next roll), discovery, or well-rested
- **Critical**: Mark 3 boxes, choose two bonuses

**Pace adjusts boxes marked**: Slow -1 (min 0), Fast +1
**Terrain limits**: Difficult terrain max 2 boxes/day, extreme terrain max 1 box/day

### 3. Afternoon Phase - Encounters

**Scout** rolls **Spirit + Perception** vs. **TN 8**.

**Results determine encounter die size:**
- **Blunder/Failure**: Increase encounter die by 1 step (max d12)
- **Weak**: Choose: find shelter, avoid danger (-1 die step, min d4), or make discovery
- **Strong**: Choose two
- **Critical**: Choose all three, or skip encounter roll

**Roll encounter die** (base size from terrain, see Environment Stat Blocks):
- **1**: Fortuitous (helpful)
- **2-3**: Neutral (interesting)
- **4-6**: Challenging (potentially harmful)
- **7-9**: Perilous (dangerous)
- **10-11**: Dire (very dangerous)
- **12**: Catastrophic (extreme danger)

Consult terrain-specific encounter tables for results.

### 4. Evening Phase
- **Consume resources**: 1 ration per person (2× in desert heat, 1.5× in cold)
- **Make camp**: Scout's shelter quality affects rest
- **Resolve conditions**: Weather, injuries, ongoing effects

### 5. Night Phase
- **Rest**: If adequate shelter, no fatigue roll needed
- **Without shelter**: Roll **Strength + Fortitude** vs. **TN 8** or gain 1 fatigue
- **Keep watch**: Perception checks to avoid night encounters

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
- **Extreme Heat**: Double water consumption, Spirit + Fortitude TN 10 daily or gain 1 fatigue
- **Extreme Cold**: 1.5× ration consumption, need winter gear or -2 banes on all rolls, Spirit + Fortitude TN 10 daily or gain 1 fatigue

**Exposure Condition**: Failed weather saves or inadequate shelter grants exposure levels. Each level: -1 bane all rolls. At 3+ exposure: take 1 wound per day. Remove by reaching shelter and recovering.

## Waypoints

When progress track reaches a waypoint, resolve its effects:

- **Settlement (🏘️)**: Resupply, safe rest, gather information
- **Landmark (🗿)**: Navigation aid (+1 boon next roll), morale boost (recover 1 fatigue)
- **Camp (⛺)**: Good shelter (auto-succeed on shelter), water source, hunting ground (+1 boon)
- **Danger (⚠️)**: Scripted encounter or environmental hazard

## Special Situations

**Getting Lost**: When Navigator blunders, mark 0 boxes and erase 1 already marked (backtracking). Next roll has +1 bane. Continue until weak+ success.

**Forced Detour**: Add 1d4 boxes to track (minor) or 1d6+2 boxes (major) when route is blocked.

**Shortcuts**: Remove 1d3 boxes (minor) or 1d4+1 boxes (major) when discovering faster routes through strong+ Navigator success with "discovery" or NPC guidance.

**Impossible Progress**: Severe weather, party exhaustion, or impassable terrain may prevent all progress for a day (still consume resources).

## Integration with Core Systems

**Skills**: Navigation (Spirit + Nature / Mind + Education), Scouting (Spirit + Perception), Survival (Spirit + Survival), Foraging (Mind + Nature), Athletics for difficult terrain.

**Conditions**: Fatigue from exhaustion or failed rest, wounds from environmental hazards, exposure from weather, poisoned/diseased from encounters.

**Resources**: Rations (1/day/person baseline), water (critical in deserts), camping equipment, weather gear, healing supplies.

**Combat**: Encounters can lead to combat scenes using standard rules. Surprise determined by Scout results.

## Quick Reference

**Each Travel Day:**
1. Choose pace (slow/normal/fast)
2. Navigator rolls vs Terrain TN → mark progress boxes
3. Scout rolls vs TN 8 → modify encounter die
4. Roll encounter die → consult terrain table
5. Consume resources (1 ration/person, adjust for climate)
6. Rest (with/without shelter affects fatigue)

**Pace Effects:**
- Slow: +1 boon travel rolls, -1 progress box
- Normal: No modifiers
- Fast: -1 bane travel rolls, +1 progress box

**Encounter Die Steps:** d4 → d6 → d8 → d10 → d12

See **Travel Encounters** and **Environment Stat Blocks** for detailed tables and terrain-specific rules.
