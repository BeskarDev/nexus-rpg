---
sidebar_position: 9
---

# 📊 Progress Track

The progress track is the heart of the travel system, representing your journey's advancement from origin to destination. Each day of travel, the party makes progress rolls to see how much ground they cover, modified by terrain, pace, weather, and the Navigator's skill.

## The Progress Track Structure

The progress track is a simple visual representation of the journey:

```
Origin ◯ ◯ ◯ ◯ ◯ ◯ ◯ ◯ ◯ ◯ Destination
       1 2 3 4 5 6 7 8 9 10
```

Each **progress box** (◯) represents a meaningful segment of the journey. When you mark off all boxes, you reach your destination.

**Typical Progress Track Scales:**

| Journey Length | Progress Boxes | Notes |
|----------------|----------------|-------|
| Short (2-4 days) | 4-6 boxes | Quick wilderness trip |
| Medium (5-10 days) | 8-12 boxes | Standard overland journey |
| Long (11-20 days) | 14-24 boxes | Epic expedition |
| Epic (21+ days) | 25+ boxes | Legendary trek across vast distances |

**Determining Progress Boxes:**

The GM sets the number of boxes based on **expected travel time** at normal pace without complications:

- **Simple Method:** 1 box = 1 day of expected travel
- **Detailed Method:** 1 box = 10 leagues of distance (adjust based on campaign map scale)

**Example:**
> The journey from Kalesh to Zal-Amara is expected to take 14 days at normal pace through desert terrain. The GM creates a 14-box progress track.

## Daily Progress Roll

Each day during the **Midday Phase**, the Navigator makes a progress roll to advance along the track.

### Making the Progress Roll

**Roll:** Navigator's choice of:
- **Spirit + Nature** (natural navigation, following terrain features, reading weather)
- **Mind + Education** (map reading, astronomical navigation, scholarly knowledge)

**Target Number:** Based on terrain difficulty (see Environment Stat Blocks)

| Terrain Type | Base TN | Examples |
|--------------|---------|----------|
| Easy | TN 6 | Roads, trails, plains |
| Moderate | TN 8 | Forest, grasslands, hills |
| Challenging | TN 10 | Desert, swamp, dense jungle |
| Difficult | TN 12 | Mountains, badlands, trackless waste |
| Extreme | TN 14 | Blizzard, sandstorm, maze-like terrain |

### Progress Roll Outcomes

Based on the Success Level of the Navigator's roll:

**Blunder** (6+ below TN)
- **Mark 0 progress boxes** - No progress made
- **Lost:** The party wanders off course. Suffer +1 bane on the next navigation roll.
- **Complication:** The GM introduces a challenge (bad weather, difficult terrain, equipment damage)

**Failure** (-1 to -5 below TN)
- **Mark 0 progress boxes** - Minimal progress made
- **Choose one:**
  - **Slowed:** The next navigation roll has -1 bane
  - **Complication:** The GM introduces a minor challenge

**Weak Success** (0-2 above TN)
- **Mark 1 progress box** - Standard progress
- No additional effects

**Strong Success** (3-5 above TN)
- **Mark 2 progress boxes** - Excellent progress
- **Choose one bonus:**
  - **On Track:** Next navigation roll has +1 boon
  - **Discovery:** Find a shortcut, cache, or helpful landmark
  - **Well-Rested:** Party gains +1 boon on tonight's fatigue roll

**Critical Success** (6+ above TN)
- **Mark 3 progress boxes** - Outstanding progress
- **Choose two bonuses:**
  - **On Track:** Next navigation roll has +1 boon
  - **Discovery:** Find a shortcut, cache, or helpful landmark
  - **Well-Rested:** Party gains +1 boon on tonight's fatigue roll
  - **Avoid Encounter:** Skip today's encounter roll entirely

### Pace Modifiers

The party chooses their pace each morning, affecting progress and risk:

**Slow Pace:**
- **Progress:** -1 progress box (minimum 0)
- **Benefits:**
  - Navigator gets +1 boon on progress roll
  - Scout gets +1 boon on encounter roll
  - Party gets +1 boon on fatigue rolls
- **When to use:** Dangerous terrain, low on supplies, need to avoid detection

**Normal Pace:**
- **Progress:** No modifier
- **Benefits:** None
- **Penalties:** None
- **When to use:** Standard balanced travel

**Fast Pace:**
- **Progress:** +1 progress box
- **Penalties:**
  - Navigator gets -1 bane on progress roll
  - Scout gets -1 bane on encounter roll
  - Party gets -1 bane on fatigue rolls
- **When to use:** Time pressure, safe terrain, need to reach destination quickly

**Pace Impact Example:**
> The Navigator rolls a strong success (2 progress boxes normally).
> - At **slow pace:** 2 - 1 = **1 progress box**
> - At **normal pace:** **2 progress boxes**
> - At **fast pace:** 2 + 1 = **3 progress boxes**

### Terrain Modifiers

Different terrain types affect how much progress you can make:

**Easy Terrain** (roads, plains, grasslands)
- No progress penalty
- Example: "The well-maintained road allows swift travel."

**Moderate Terrain** (forests, hills, light desert)
- No progress penalty, but higher TN
- Example: "The forest trails are clear but winding."

**Difficult Terrain** (mountains, deep jungle, swamps)
- Maximum 2 progress boxes per day (even on critical success)
- Example: "The mountain path is treacherous and slow."

**Extreme Terrain** (blizzards, sandstorms, trackless waste)
- Maximum 1 progress box per day
- Example: "The sandstorm reduces visibility to nothing; progress is minimal."

**Terrain + Pace Interaction:**
Even at fast pace, difficult terrain limits progress to 2 boxes maximum, and extreme terrain to 1 box maximum.

## Waypoints and Rest Stops

The GM places **waypoints** along the progress track at specific box numbers:

**Types of Waypoints:**

**Settlement Waypoint** (🏘️)
- Opportunity to resupply (buy rations, replace equipment)
- Safe rest (no fatigue roll required)
- Gather information or rumors
- Possible side quests or encounters

**Landmark Waypoint** (🗿)
- Navigation aid (next Navigator roll has +1 boon)
- Morale boost (party recovers 1 fatigue if they have any)
- Story significance or lore opportunity

**Camp Waypoint** (⛺)
- Known good campsite (Scout automatically finds shelter)
- Water source (no need to consume extra water rations)
- Hunting ground (Hunter/Fisher/Forager get +1 boon)

**Danger Waypoint** (⚠️)
- Scripted encounter or challenge
- Environmental hazard (river crossing, cliff passage, cave complex)
- Choice point (multiple paths forward, each with different risks)

**Example Progress Track with Waypoints:**
```
Origin ◯ ◯ ◯ ⛺ ◯ ◯ 🗿 ◯ ◯ 🏘️ ◯ ◯ ⚠️ ◯ Destination
       1 2 3 4 5 6 7 8 9 10 11 12 13 14
```

**Reaching a Waypoint:**
When the party reaches a waypoint box, resolve its effects before continuing:

> **Box 7 (Landmark - Ancient Stone Circle):**
> The party reaches the stone circle at sunset. They gain +1 boon on tomorrow's navigation roll and learn local lore about the ruins ahead. This is a good place to rest for the night.

## Special Progress Situations

### Getting Lost

When the Navigator suffers a **Blunder** or the party is lost:

1. **Mark no progress** for that day
2. **Erase 1 progress box** already marked (you've backtracked)
3. **Next navigation roll has +1 bane** (disorientation)
4. **Party must choose:**
   - **Retrace steps:** Spend tomorrow backtracking to the last landmark (guaranteed to remove lost condition)
   - **Press on:** Continue navigation with penalty, hoping to get back on track

**Lost Condition stacks:** Multiple failed navigation rolls can get the party very lost (multiple banes).

### Forced Detours

Sometimes the party must take a detour (impassable terrain, blocked route, story event):

**Minor Detour:** Add 1d4 boxes to the progress track (rolled secretly by GM)
**Major Detour:** Add 1d6+2 boxes to the progress track
**Impassable Route:** Must find alternate route (may require backtracking and replanning)

**Example:**
> The party reaches a river crossing (box 8) and finds the bridge destroyed. The GM adds a 4-box detour to find a ford upstream. The progress track is now 18 boxes instead of 14.

### Shortcuts and Faster Routes

Through clever planning, local knowledge, or lucky discoveries:

**Minor Shortcut:** Remove 1d3 boxes from the progress track
**Major Shortcut:** Remove 1d4+1 boxes from the progress track

**Requirements:**
- Strong success on Navigation with "Discovery" bonus chosen
- Information from NPCs or maps
- Story-relevant knowledge or skill

**Example:**
> The party meets a local guide at the settlement waypoint who knows a secret pass through the hills. The GM removes 3 boxes from the remaining track.

### Impossible Progress

In extreme circumstances, no progress is possible:

**Examples:**
- Severe weather (blizzard, hurricane, flash flood)
- Party too exhausted to travel (all have 3+ fatigue)
- Mandatory rest day (injuries, illness, equipment repairs)
- Terrain completely impassable (avalanche blocks pass, river flooded)

**Effect:** The day counts toward resource consumption but marks no progress boxes. Party must decide whether to wait out the condition or find another route.

## Multi-Terrain Journeys

For journeys crossing multiple terrain types, use **segmented progress tracks:**

### Method 1: Single Track with Terrain Zones

Mark terrain changes on the progress track:

```
Origin ◯ ◯ ◯ | ◯ ◯ ◯ ◯ ◯ | ◯ ◯ ◯ Destination
     Forest(3)  Plains(5)    Desert(3)
```

When the party enters a new terrain zone:
- Update the Navigator's target number
- Apply new terrain modifiers
- Adjust encounter die size
- Note any new environmental effects

### Method 2: Separate Tracks per Segment

Create a separate small track for each terrain segment:

**Segment 1 - Forest:** ◯ ◯ ◯ (TN 8, d6 encounters)
**Segment 2 - Plains:** ◯ ◯ ◯ ◯ ◯ (TN 6, d8 encounters)
**Segment 3 - Desert:** ◯ ◯ ◯ (TN 10, d6 encounters, double water)

Complete each segment's track before moving to the next. This makes terrain transitions clearer and allows the GM to adjust difficulty between segments.

## Progress Track in Play

### Example Day of Travel

**Setup:** The party is on day 5 of a 12-day journey through forest (TN 8). They've marked off 4 progress boxes so far. They choose **normal pace** today.

**Morning Phase:**
- Party assigns roles: Nadira (Navigator), Kael (Scout), others
- They choose **normal pace** (no modifiers)

**Midday Phase - Progress Roll:**
- Nadira rolls **Spirit + Nature** vs TN 8
- Nadira has Spirit d10 + Nature rank 3
- Roll: d10 (7) + 1d6 (3) + 3 = **13** vs TN 8
- **Strong Success** (13 - 8 = 5 above TN)
- **Mark 2 progress boxes** (now at 6/12 boxes)
- **Choose bonus:** Nadira chooses "On Track" (+1 boon tomorrow)

**Afternoon Phase:**
- Scout makes encounter roll (separate system)
- GM describes the day's events

**Evening Phase:**
- Party makes camp, consumes rations
- Updates progress track to show 6/12 boxes filled

**Tracking on Character Sheet:**
```
JOURNEY: Kalesh → Zal-Amara
PROGRESS: 6/12 boxes [■ ■ ■ ■ ■ ■ ◯ ◯ ◯ ◯ ◯ ◯]
STATUS: On track (+1 boon tomorrow)
PACE: Normal
TERRAIN: Desert (TN 10)
NEXT WAYPOINT: Oasis at box 8
```

### Progress Track Tips for GMs

**Calibrating Difficulty:**
- Easy journeys: Low TN (6-8), generous waypoints, forgiving terrain
- Standard journeys: Medium TN (8-10), some waypoints, mixed terrain
- Hard journeys: High TN (10-12), few waypoints, difficult terrain
- Epic journeys: Very high TN (12-14), rare waypoints, extreme conditions

**Pacing the Journey:**
- **Days 1-3:** Establish routine, introduce travel roles
- **Days 4-7:** Build tension, introduce complications
- **Days 8-10:** Escalate challenges, resource pressure
- **Days 11+:** Climactic encounters, push to finish

**Using Waypoints Narratively:**
- Place story-relevant encounters at waypoints
- Use waypoints to introduce new NPCs or plot developments
- Make waypoints memorable (unique locations, dramatic moments)
- Allow player choices at waypoints to affect later journey

**Adjusting on the Fly:**
- If progress is too fast: Add a detour or complication
- If progress is too slow: Offer a shortcut or favorable weather
- If players are bored: Skip less interesting days, focus on highlights
- If players are overwhelmed: Simplify to basic progress rolls only

---

**Next:** Continue to **Travel Encounters** to see what happens each day beyond just making progress.
