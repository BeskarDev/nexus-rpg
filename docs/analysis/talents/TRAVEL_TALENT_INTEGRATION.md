# Travel Talent Integration Analysis

**Purpose:** Review all existing talents for interactions with the [travel system](../../06-scenes/09-travel.md), propose new travel-focused talents, and ensure the talent system fully supports the travel rules.

> **Reference:** [Travel Rules](../../06-scenes/09-travel.md) | [Talent System Analysis](./TALENT_SYSTEM_ANALYSIS.md) | [Travel System Design](../travel-system-design.md)

---

## 1. Travel System Mechanics Summary

The travel system uses the following core mechanics that talents can interact with:

| Mechanic | Description | Key Rolls |
|----------|-------------|-----------|
| **Navigator** | Determines daily progress (2 base, modified by bonuses/consequences) | Spirit/Mind + Nature |
| **Scout** | Finds shelter, makes discoveries, avoids danger | Spirit + Perception/Survival |
| **Quartermaster** | Manages supplies and gear maintenance | Mind + Crafting/Education |
| **Forager** | Gathers edible plants, water, and materials | Spirit/Mind + Nature |
| **Hunter** | Tracks and kills game for rations | Agility/Spirit + Survival |
| **Fisher** | Catches fish from water sources | Spirit/Mind + Survival |
| **Forced March** | +1 progress but all suffer 1 Fatigue | — |
| **Terrain Modifiers** | Road (+1), Plains (+0), Forest/Hills/etc. (-1) | — |
| **Travel Difficulty** | TN 8/10/12/14 depending on terrain | All travel rolls |
| **Supply Checks** | Daily ration consumption during camp | Supply die roll |
| **Shelter** | Required for proper rest; found by Scout | — |
| **Fatigue** | Accumulated from failed rolls, weather, forced march | Strength + Fortitude to resist |
| **Weather Events** | Banes on Navigator/Scout, Fatigue rolls, Supply Checks | Strength + Fortitude |
| **Checkpoints** | Landmarks, camps, blockades, extreme climate, ambushes | Various |
| **Multi-role Rule** | +1 bane per additional role filled | All role rolls |

---

## 2. Existing Talent Review

### Talents with Direct Travel Interactions

These talents already reference travel mechanics or provide effects during travel.

#### Explorer of Nature (Survival)

| Rank | Travel Interaction | Notes |
|------|-------------------|-------|
| 1 | Re-roll Survival or Nature in chosen environment during travel | Works well with Navigator (Spirit/Mind + Nature) and Hunter (Agility/Spirit + Survival) |
| 2 | Navigator: reduce consequences by one. Scout: reduce Encounter Die by one step. Gathering: +1 unit of supply | **Strong travel talent.** Directly references navigator and scout roles. "Encounter Die" language may need updating — the travel system now uses a Travel Event Table (1d6), not an Encounter Die |
| 3 | Marked as XXX (incomplete) | Opportunity to add a Rank 3 that further integrates with the travel system |

**Clarification Needed:** Rank 2 references "reduce the Encounter Die by one step" — this should be updated to reference the current Travel Event Table or the Scout's "avoid danger" bonus, which allows the Scout to choose between two event rolls.

---

#### Knowledgeable Wanderer (Nature)

| Rank | Travel Interaction | Notes |
|------|-------------------|-------|
| 1 | +2 HP. No +1 bane for taking multiple travel roles | **Strong travel talent.** Directly negates the multi-role penalty from the travel system |
| 2 | +2 HP. +1 boon on navigation rolls. Blunders treated as failures | Directly improves the Navigator role. Eliminates the worst consequence (getting lost, challenge die increase) |
| 3 | +2 HP. Successful travel rolls grant bonus progress (marked TODO) | Incomplete but clearly travel-focused. Should specify: "When you succeed on any of your travel role rolls, the Navigator also gains +1 progress for the day" |

**Status:** Core travel talent. Rank 3 needs completion. Already well-integrated with Navigator, Scout, and multi-role mechanics.

---

#### Explorer's Tenacity (Fortitude)

| Rank | Travel Interaction | Notes |
|------|-------------------|-------|
| 1 | +2 HP. Re-roll Fortitude vs. environmental hazards during travel | Covers Weather Events (Strength + Fortitude) and Extreme Climate checkpoints |
| 2 | +2 HP. Lose double Fatigue during rest. Suffer Fatigue instead of Injury (1/day) | Strong Fatigue mitigation — addresses forced march and weather Fatigue |
| 3 | +2 HP. Heal Injury during bad night. Re-roll Supply Checks for rations | **Directly interacts** with daily Supply Checks and bad night mechanics from failed shelter |

**Status:** Well-integrated. No changes needed. Covers environmental resistance, Fatigue mitigation, and Supply Checks.

---

#### Wilderness Expert (Survival)

| Rank | Travel Interaction | Notes |
|------|-------------------|-------|
| 1 | Create rations from gathered food (Spirit + Survival) | Directly supports the Hunter and Fisher roles (raw meat/fish → rations). Already referenced in travel rules |
| 2 | +1 boon on camp establishment rolls. Wake up during night attack (with bane) | Supports the "Make Camp" phase. Night watch ambush response |
| 3 | Marked as XXX (incomplete) | Opportunity for travel-focused completion |

**Status:** Core foraging/camping talent. Already cross-referenced in the travel rules. Rank 3 needs completion.

---

### Talents with Indirect Travel Interactions

These talents provide abilities that are useful during travel but do not directly reference the travel system.

| Talent | Skill | Travel Relevance | Travel Mechanic Interaction |
|--------|-------|------------------|-----------------------------|
| **Expert Rider** | Nature | Mounted travel bonus (+1/+2 progress). Mounted combat during ambush checkpoints | Mounts and Vehicles modifiers, Ambush checkpoints |
| **Animal Companion** | Nature | Animal companion can assist with scouting, hunting, foraging | Could assist Scout or Hunter roles |
| **Beast Lore** | Nature | Communicate with animals for route information, identify dangerous fauna | Discovery Events (Travelers table), Encounter events |
| **Plant Lore** | Nature | +1 unit when foraging materials (Rank 2) | Forager role bonuses |
| **Field Medic** | Nature | Treat injuries suffered during travel (combat encounters, hazards) | Injury recovery during rest, checkpoint encounters |
| **Danger Sense** | Perception | Initiative re-roll, surprise resistance | Ambush checkpoints, night encounters |
| **Eagle Eye** | Perception | Spot hidden/obscured things, ignore range penalties | Scout role, Discovery Events |
| **Relentless Tracker** | Survival | Re-roll tracking tests | Could apply when following trails, Hidden Shortcuts |
| **Monster Hunter** | Survival | Focus on larger creatures during combat | Encounter events with creatures |
| **Trap Maker** | Survival | Set traps during travel | Ambush preparation, camp defense |
| **Tough Stomach** | Fortitude | Resist poison, intoxication, illness | Forager blunder (poisonous harvest), disease hazards |
| **Battle Rage** | Fortitude | Combat enhancement | Encounter events, Ambush checkpoints |
| **Hard to Kill** | Fortitude | Wound resistance | Dangerous terrain, combat encounters |
| **Tactician** | Education | Pre-combat planning | Ambush checkpoints, Encounter events |
| **Commander** | Education | Guide ally actions | Could assist travel role rolls |
| **General Education** | Education | Use Education for untrained expert skills | Quartermaster role (Mind + Crafting/Education) |
| **Jack of All Trades** | Streetwise | Replace any skill with Streetwise once/scene | Can substitute for any travel role skill |
| **Athletic Movement** | Athletics | Re-roll movement abilities, ignore difficult terrain | Difficult terrain traversal, Extreme Climate |
| **Bulky** | Athletics | +2 carrying capacity (per rank) | Encumbrance modifier (avoids -1 progress) |
| **Fast Stride** | Athletics | +1 Movement, Quick Action Dash | Escape/chase scenarios during encounters |
| **Stand your Ground** | Athletics | Resist knockdown, push | Weather events, terrain hazards |
| **Light Armor Mastery** | Athletics | Evade in light armor | Travel ambush scenarios (light gear for travel) |

---

### Talents with No Travel Interaction

The following talent categories have no meaningful interaction with travel mechanics and are primarily combat-focused:

- **Fighting** talents (14 total): All combat-focused (weapon techniques, stances, combat arts)
- **Archery** talents (9 total): Ranged combat techniques
- **Arcana** talents (7 total): Spellcasting enhancements
- **Mysticism** talents (11 total): Spiritual casting, healing, wards
- **Lore** talents (6 total): Esoteric knowledge (some could support Quartermaster or discovery)
- **Stealth** talents (6 total): Infiltration and concealment (could support Scout role)

**Design Note:** While these skills don't need travel-specific talents, some could benefit from travel-adjacent utility. See new talent proposals below.

---

## 3. Gaps and Issues

### 3.1 Terminology Mismatches

| Talent | Issue | Recommended Fix |
|--------|-------|-----------------|
| Explorer of Nature (Rank 2) | References "Encounter Die" which no longer exists in the travel system | Update to reference the Travel Event Table or Scout's "avoid danger" bonus |
| Knowledgeable Wanderer (Rank 3) | Contains TODO for travel progress mechanic | Complete with a clear mechanical effect tied to the Navigator's progress system |

### 3.2 Missing Travel Coverage by Role

| Travel Role | Skills Used | Existing Talent Support | Gap |
|-------------|-------------|------------------------|-----|
| **Navigator** | Spirit/Mind + Nature | Knowledgeable Wanderer, Explorer of Nature | Adequate for Nature users. **No support for Education-based navigation** |
| **Scout** | Spirit + Perception/Survival | Explorer of Nature (indirect), Danger Sense (indirect) | **No dedicated scouting talent.** Eagle Eye is combat-focused |
| **Quartermaster** | Mind + Crafting/Education | None specific | **No talent supports Quartermaster role** |
| **Forager** | Spirit/Mind + Nature | Plant Lore (+1 material), Wilderness Expert (rations) | Moderate coverage via existing Nature talents |
| **Hunter** | Agility/Spirit + Survival | Explorer of Nature (re-roll), Wilderness Expert (rations) | Adequate via existing Survival talents |
| **Fisher** | Spirit/Mind + Survival | Wilderness Expert (rations) | Minimal — no talent improves fishing directly |
| **Forced March** | — (Fatigue) | Explorer's Tenacity (Fatigue mitigation) | Adequate |
| **Weather** | Strength + Fortitude | Explorer's Tenacity (re-roll), Tough Stomach (conditions) | Adequate |
| **Supply Checks** | Supply die | Explorer's Tenacity (Rank 3 re-roll) | Limited to one talent |
| **Shelter** | Scout result | Wilderness Expert (+1 boon camp) | Limited to one talent |

### 3.3 Archetype Travel Gaps

| Archetype | Expected Travel Role | Supporting Skills | Talent Support | Gap |
|-----------|---------------------|-------------------|----------------|-----|
| **Ranger** | Navigator, Hunter, Scout | Archery, Survival, Nature, Insight | Explorer of Nature, Relentless Tracker | Good foundation but no talent connects Archery to travel |
| **Druid** | Navigator, Forager | Mysticism, Nature, Survival, Lore | Knowledgeable Wanderer, Plant Lore | Good |
| **Barbarian** | Hunter, Scout | Fighting, Athletics, Fortitude, Survival | Explorer's Tenacity, Wilderness Expert | Good |
| **Apothecary** | Quartermaster, Forager | Crafting, Education, Nature, Insight | Plant Lore (indirect) | **Missing Quartermaster support** |
| **Engineer** | Quartermaster | Crafting, Education, Archery, Perception | None specific | **Missing Quartermaster support** |
| **Rogue** | Scout | Fighting, Stealth, Streetwise, Insight | None specific | **No scouting talent** |
| **Bard** | Navigator (Education), Quartermaster | Mysticism, Influence, Education, Stealth | None specific | **No travel support** |
| **Warlord** | Quartermaster, Navigator | Fighting, Influence, Education, Fortitude | Commander, Explorer's Tenacity | Indirect only |

---

## 4. New Talent Proposals

The following new talents are designed to fill the gaps identified above, with specific interactions with the [travel system](../../06-scenes/09-travel.md) mechanics. All talents follow the design guidelines from the [Talent System Design Guide](../../../) and the rank progression of Unlock (1) → Payoff (2) → Mastery (3).

---

### 4.1 Pathfinder (Survival) — *New Talent*

**Themes:** Tracking, Navigation, Endurance
**Archetypes Supported:** Ranger, Barbarian, Druid, Tamer
**Travel Roles:** Navigator, Scout

> *You read the land like others read a map — the bend of rivers, the slope of hills, the patterns of animal trails all speak to you of the safest and swiftest paths forward.*

**Rank 1 (Novice)**
When you fill the Navigator role during travel and succeed on your roll, you can choose one of the following additional effects:
- Ignore the terrain modifier to progress for the day (e.g., forest/hills -1 becomes +0).
- One party member can remove 1 Fatigue.

**Rank 2 (Adept)**
You gain the following abilities:
- When you fill the Navigator role and your roll results in a consequence, you can choose to re-roll the test once per day. You must accept the new result.
- When the party reaches a Landmark checkpoint, the Navigator gains +1 boon on their next two Navigation rolls instead of one.

**Rank 3 (Expert)**
You gain the following abilities:
- When you fill the Navigator role and achieve a Strong or Critical Success, you can choose the "fast pace" bonus without it counting toward your bonus choices.
- Once per journey, when the party would be forced to make a detour (increasing the challenge die), you can roll Spirit + Survival vs. the travel difficulty. On a success, you find an alternative path and the challenge die is not increased.

**Design Notes:**
- *Trigger:* Filling the Navigator role during travel; succeeding or failing on navigation rolls.
- *Limit:* Rank 2 re-roll is once per day. Rank 3 detour avoidance is once per journey.
- *Bonus Type:* Situational bonus (terrain modifier negation, landmark extension). No stacking issues.
- *Synergy:* Combines with Explorer of Nature (environment-specific bonuses) and Knowledgeable Wanderer (navigation boon). A Ranger with both Pathfinder and Explorer of Nature becomes an exceptional navigator in their favored terrain.

---

### 4.2 Trailblazer (Athletics) — *New Talent*

**Themes:** Mobility, Endurance, Balance
**Archetypes Supported:** Barbarian, Fighter, Ranger, Monk, Gladiator
**Travel Roles:** Any (Fatigue/terrain mitigation)

> *Where others see impassable terrain, you see a challenge. Years of physical conditioning have taught you to shrug off the worst the road can throw at you and press on when others falter.*

**Rank 1 (Novice)**
You gain the following abilities during travel:
- When you would suffer Fatigue from a forced march, roll Strength + Athletics vs. the travel difficulty. On a success, you do not gain Fatigue.
- When terrain causes -1 progress to the party's travel, you can spend your Quick Action during that day's travel to assist the Navigator. The Navigator gains +1 boon on their roll.

**Rank 2 (Adept)**
You gain the following abilities:
- When an Extreme Climate checkpoint requires a Strength + Fortitude roll to resist Fatigue, you can roll Strength + Athletics instead.
- When you roll to find shelter during travel (as part of the Scout role or during the Make Camp phase), you gain +1 boon on the roll.

**Rank 3 (Expert)**
You gain the following abilities:
- When the party performs a forced march, you can inspire the group through your endurance. Each party member who can see you gains +1 boon on any Strength + Fortitude roll to resist Fatigue during that day.
- Once per journey, when the party would make no progress due to severe weather or getting lost, you can roll Strength + Athletics vs. the travel difficulty. On a success, the party makes 1 progress instead.

**Design Notes:**
- *Trigger:* Forced march, terrain penalties, Extreme Climate checkpoints, shelter rolls.
- *Limit:* Rank 1 forced march resistance requires a roll (not automatic). Rank 3 progress recovery is once per journey.
- *Bonus Type:* Situational bonus (boon on navigation/shelter/Fortitude). Uses Athletics (a new skill application for travel).
- *Synergy:* Combines with Explorer's Tenacity (Fortitude Fatigue mitigation) for strong endurance builds. A Barbarian with both becomes nearly tireless on long marches.

---

### 4.3 Cartographer's Eye (Perception) — *New Talent*

**Themes:** Awareness, Detection, Vigilance
**Archetypes Supported:** Ranger, Engineer, Rogue, Oracle
**Travel Roles:** Scout, Navigator (assisting)

> *You possess an uncanny sense for the lay of the land — reading the sky for weather, spotting distant landmarks, and noticing the subtle signs that betray shortcuts or dangers ahead.*

**Rank 1 (Novice)**
When you fill the Scout role during travel and succeed on your roll, you can choose one of the following additional effects:
- The Navigator gains +1 boon on their next Navigation roll (you spotted a landmark or trail marker).
- You learn the general category of the next day's Travel Event before it is rolled.

**Rank 2 (Adept)**
You gain the following abilities:
- When you fill the Scout role and choose "avoid danger," the GM rolls three times on the Travel Event Table instead of two. You choose one result; the other two are discarded.
- When the party reaches a checkpoint, you can roll Spirit + Perception vs. the travel difficulty. On a success, you learn one useful detail about the checkpoint before the party engages with it (e.g., the number of bandits at a blockade, the stability of a suspicious shelter, whether extreme climate is worsening).

**Rank 3 (Expert)**
You gain the following abilities:
- When you fill the Scout role and achieve a Critical Success, you can choose to automatically succeed on finding shelter in addition to your three normal bonuses.
- Once per journey, when the party encounters a Hidden Checkpoint (danger zone), you can declare that you spotted it in advance. The party is not surprised and each member gains +1 boon on their first roll during the checkpoint encounter.

**Design Notes:**
- *Trigger:* Filling the Scout role during travel; succeeding on scouting rolls.
- *Limit:* Rank 2 event preview is one extra roll. Rank 3 Hidden Checkpoint warning is once per journey.
- *Bonus Type:* Situational bonus (boons, information advantages). No stacking issues.
- *Synergy:* Combines with Danger Sense (surprise resistance, initiative) for excellent ambush preparation. A Ranger with Cartographer's Eye and Explorer of Nature covers both scouting and navigation.

---

### 4.4 Expedition Leader (Education) — *New Talent*

**Themes:** Strategy, Tactics, History
**Archetypes Supported:** Warlord, Bard, Priest, Champion, Engineer
**Travel Roles:** Navigator (via Education), Quartermaster

> *You have studied the accounts of great expeditions and understand the logistics of keeping a party fed, equipped, and on course. Your knowledge of history and geography makes you a reliable guide through civilized and documented lands.*

**Rank 1 (Novice)**
You gain the following abilities during travel:
- You can fill the Quartermaster role using Mind + Education. When you succeed, each party member can roll their next Supply Check for rations twice and choose either result.
- When the party reaches a Safepoint checkpoint (inn, settlement), you can roll Mind + Education vs. the travel difficulty. On a success, you learn the general route conditions ahead (terrain type, approximate distance, known dangers).

**Rank 2 (Adept)**
You gain the following abilities:
- When you fill the Quartermaster role and achieve a Strong or Critical Success, you can also dismiss the next "Wear and Tear" result from the Travel Event Table.
- When a Weather Event occurs, you can roll Mind + Education vs. the travel difficulty. On a success, the party anticipated the weather and one of the Weather Event's penalties does not apply for the day.

**Rank 3 (Expert)**
You gain the following abilities:
- When you fill any travel role using Education, you gain +1 boon on the roll.
- Once per journey, you can declare a rest day. The party makes no progress but each party member removes 2 Fatigue instead of the normal amount and does not need to make Supply Checks for the day. You can only use this ability at a Camp or Safepoint checkpoint.

**Design Notes:**
- *Trigger:* Filling the Quartermaster role, reaching checkpoints, Weather Events.
- *Limit:* Rank 2 weather anticipation requires a roll. Rank 3 rest day is once per journey and requires a checkpoint.
- *Bonus Type:* Skill bonus (Education application to Quartermaster). Situational bonus (weather anticipation, supply optimization).
- *Synergy:* Combines with Commander (guide ally actions) and General Education (use Education for expert skills) for a strong logistics-focused build. A Warlord or Engineer with Expedition Leader becomes the ideal Quartermaster.

---

### 4.5 Road Warden (Streetwise) — *New Talent*

**Themes:** Urban Navigation, Contacts, Networking
**Archetypes Supported:** Rogue, Bard, Brawler
**Travel Roles:** Scout (civilized routes), Navigator (roads)

> *The roads between city-states are as familiar to you as the alleyways within them. You know which caravans to join, which innkeepers to trust, and which stretches of road attract bandits.*

**Rank 1 (Novice)**
You gain the following abilities during travel along roads or through civilized lands:
- When the party reaches a Safepoint checkpoint, you can roll Spirit + Streetwise vs. the travel difficulty. On a success, you find better prices for supplies (reduce costs by 25%) or learn the location of the next safe resting point along the route.
- When the party encounters Travelers (Discovery Event), you gain +1 boon on any social rolls with them.

**Rank 2 (Adept)**
You gain the following abilities:
- When you fill the Scout role along a road or near a settlement and succeed on your roll, the party automatically finds shelter for the night (you know the area and its safe spots).
- When a Travel Event results in an Encounter along a road, you can roll Spirit + Streetwise vs. the travel difficulty. On a success, you recognize the threat (bandits, patrols, etc.) and the party can choose to avoid it entirely, bypassing the encounter but losing 1 progress.

**Rank 3 (Expert)**
You gain the following abilities:
- When traveling along a road, the Navigator gains +1 boon on their Navigation roll (your knowledge of trade routes and shortcuts helps guide the group).
- Once per journey, when the party reaches a Safepoint, you can declare that you have a contact here. Roll Spirit + Streetwise vs. the travel difficulty. On a success, the contact provides useful aid: a free night's rest, a pack of rations, information about the route ahead, or passage through a blockade.

**Design Notes:**
- *Trigger:* Travel along roads or near settlements; Safepoint checkpoints; Encounter events.
- *Limit:* Rank 1 supply discount is at Safepoints only. Rank 2 encounter avoidance costs 1 progress. Rank 3 contact is once per journey.
- *Bonus Type:* Situational bonus (boons, cost reduction, automatic shelter). Road-specific limitation prevents it from being universally powerful.
- *Synergy:* Combines with I Know A Guy (settlement contacts) and Jack of All Trades (skill substitution) for a well-connected traveler build. A Rogue with Road Warden and I Know A Guy has excellent social utility during road travel.

---

### 4.6 Seasoned Forager (Nature) — *New Talent*

**Themes:** Herbalism, Ecology, Identification
**Archetypes Supported:** Druid, Shaman, Apothecary, Ranger
**Travel Roles:** Forager

> *You know every edible root, safe berry, and drinkable spring by instinct. What others pass by unknowing, you gather with ease — feeding your companions from the bounty of the wild.*

**Rank 1 (Novice)**
When you fill the Forager role during travel and succeed on your roll, you gain one of the following additional effects:
- The gathered food does not spoil for one additional day (two days total before rotting).
- You also find useful herbs or materials worth 1 unit of primitive materials (d6).

**Rank 2 (Adept)**
You gain the following abilities:
- When you fill the Forager role and suffer the "poisonous harvest" consequence, you can roll Mind + Nature vs. the travel difficulty. On a success, you identify the harmful plants before anyone consumes them, negating the consequence.
- When the party is in terrain with high resource pressure, you can still attempt to forage (ignoring the normal restriction), but the roll suffers +1 bane.

**Rank 3 (Expert)**
You gain the following abilities:
- When you fill the Forager role and achieve a Strong or Critical Success, any food gathered does not spoil (you know preservation techniques using local plants and minerals).
- Once per journey, during the Make Camp phase, you can prepare a restorative meal from gathered ingredients. Each party member who eats the meal removes 1 Fatigue in addition to any other rest benefits.

**Design Notes:**
- *Trigger:* Filling the Forager role during travel; foraging success/failure.
- *Limit:* Rank 2 high-resource-pressure foraging has a bane. Rank 3 restorative meal is once per journey.
- *Bonus Type:* Skill bonus (Nature application to foraging). Situational bonus (spoilage extension, poison identification).
- *Synergy:* Combines with Plant Lore (+1 material unit) and Wilderness Expert (rations from raw food) for an outstanding forager build. A Druid with Seasoned Forager, Plant Lore, and Wilderness Expert can feed the entire party reliably.

---

## 5. Existing Talent Update Recommendations

These are recommendations for clarifying or updating existing talents to better align with the current travel system. These are **not changes to game rules** — they are design notes for future consideration.

### 5.1 Explorer of Nature (Survival) — Terminology Update

**Current (Rank 2):** "If you are the scout, reduce the Encounter Die by one step regardless of the outcome of your roll."

**Recommended Update:** "If you fill the Scout role during travel and choose 'avoid danger,' the GM rolls three times on the Travel Event Table instead of two. You choose one result; the other two are discarded."

**Rationale:** The travel system no longer uses an "Encounter Die." The Scout's "avoid danger" bonus already allows choosing between two event rolls — this update extends that to three, which is mechanically equivalent to reducing the encounter likelihood.

### 5.2 Knowledgeable Wanderer (Nature) — Rank 3 Completion

**Current (Rank 3):** "+2 HP. When you succeed on any of your travel rolls, also mark one travel progress (TODO)."

**Recommended Completion:** "+2 HP. When you succeed on any of your travel role rolls, the party gains +1 progress for the day (this bonus can only apply once per day, regardless of how many roles you fill)."

**Rationale:** Ties directly into the challenge die progress system. The once-per-day limit prevents abuse with multi-role builds (especially since Rank 1 already negates the multi-role penalty).

### 5.3 Wilderness Expert (Survival) — Rank 3 Completion

**Current (Rank 3):** "XXX"

**Recommended Completion:** "You gain the following abilities: When you establish camp and prepare rations from gathered food, you can also prepare one of the following (choose one): a warming meal that grants each party member +1 boon on Strength + Fortitude rolls against weather or environmental hazards until the next rest; a trail mix that grants each party member advantage on their next Supply Check for rations. Additionally, raw meat or fish you process into rations does not spoil."

**Rationale:** Extends the cooking/camping theme into meaningful travel utility. Interacts with Weather Events (Strength + Fortitude), Supply Checks, and food spoilage mechanics.

### 5.4 Relentless Tracker (Survival) — Rank 2 and 3 Completion

**Current (Rank 2 and 3):** "XXX"

**Recommended Rank 2:** "When following tracks during travel, you can determine the approximate number of creatures, their size, and how long ago the tracks were made. When the party encounters a Hidden Shortcut (Discovery Event), you gain +1 boon on any rolls to navigate the shortcut safely."

**Recommended Rank 3:** "When you fill the Scout role during travel and choose 'make a discovery,' you can roll twice on the Discovery Event Table and choose either result. Once per journey, you can declare that you are tracking specific quarry. For the remainder of the journey, you learn whether the quarry passed through each terrain segment and how far ahead they are."

**Rationale:** Extends tracking into the travel system's Discovery Events and provides a narrative/utility tool for journey-focused play.

---

## 6. Travel-Talent Interaction Matrix

This matrix shows which talents interact with each travel mechanic, including both existing and proposed new talents.

| Travel Mechanic | Existing Talents | Proposed New Talents |
|----------------|-----------------|---------------------|
| **Navigator Roll** | Knowledgeable Wanderer, Explorer of Nature | Pathfinder, Expedition Leader, Road Warden |
| **Scout Roll** | Explorer of Nature, Danger Sense (indirect) | Cartographer's Eye, Road Warden |
| **Quartermaster Roll** | General Education (indirect) | Expedition Leader |
| **Forager Roll** | Plant Lore, Explorer of Nature | Seasoned Forager |
| **Hunter Roll** | Explorer of Nature, Wilderness Expert | — |
| **Fisher Roll** | Wilderness Expert | — |
| **Forced March / Fatigue** | Explorer's Tenacity | Trailblazer, Pathfinder |
| **Terrain Modifiers** | Explorer of Nature (re-roll in terrain) | Pathfinder (ignore modifier), Trailblazer (assist Navigator) |
| **Supply Checks** | Explorer's Tenacity (Rank 3) | Expedition Leader, Seasoned Forager |
| **Shelter** | Wilderness Expert | Trailblazer, Road Warden |
| **Weather Events** | Explorer's Tenacity, Tough Stomach | Expedition Leader, Trailblazer |
| **Checkpoints** | — | Pathfinder (landmarks), Cartographer's Eye (all), Expedition Leader (safepoints), Road Warden (safepoints) |
| **Travel Events** | Explorer of Nature (Encounter Die) | Cartographer's Eye (preview, extra roll) |
| **Multi-Role Penalty** | Knowledgeable Wanderer (negate) | — |
| **Mounts / Vehicles** | Expert Rider | — |

---

## 7. Archetype Travel Build Examples

These examples show how the proposed talents create meaningful travel builds for specific archetypes.

### Ranger (Striker / Utility)
**Skills:** Archery, Survival, Nature, Insight
**Travel Roles:** Navigator, Hunter, Scout

| Talent | Source | Travel Effect |
|--------|--------|---------------|
| **Pathfinder** (new) | Survival | Ignore terrain penalties as Navigator, re-roll failed navigation |
| **Explorer of Nature** | Survival | Re-roll in favored terrain, extra supply, improved scouting |
| **Relentless Tracker** | Survival | Track quarry across journey, improved discoveries |
| **Knowledgeable Wanderer** | Nature | Multi-role without penalty, navigation boons, bonus progress |
| **Cartographer's Eye** (new) | Perception | Event preview as Scout, landmark spotting, Hidden Checkpoint warning |

**Build Identity:** The ultimate wilderness guide. Excels in both navigation and scouting, especially in their favored terrain. Can fill multiple travel roles without penalty.

---

### Warlord / Engineer (Support / Utility)
**Skills:** Fighting/Crafting, Influence/Education, Education, Fortitude/Perception
**Travel Roles:** Quartermaster, Navigator (Education-based)

| Talent | Source | Travel Effect |
|--------|--------|---------------|
| **Expedition Leader** (new) | Education | Education-based Quartermaster, weather anticipation, rest day |
| **Commander** | Education | Guide ally actions during travel (bonus to their rolls) |
| **Explorer's Tenacity** | Fortitude | Fatigue resistance, Supply Check re-rolls, environmental endurance |

**Build Identity:** The logistics expert. Keeps the party supplied, equipped, and informed. Uses Education instead of Nature for a scholarly approach to travel management.

---

### Druid / Shaman (Support / Controller)
**Skills:** Mysticism, Nature, Survival/Lore, Lore/Insight
**Travel Roles:** Navigator, Forager

| Talent | Source | Travel Effect |
|--------|--------|---------------|
| **Knowledgeable Wanderer** | Nature | Multi-role Navigator + Forager, navigation boons |
| **Seasoned Forager** (new) | Nature | Extended food preservation, poison identification, restorative meals |
| **Plant Lore** | Nature | +1 material when foraging, plant identification |
| **Wilderness Expert** | Survival | Convert raw food to rations, camp establishment boons |

**Build Identity:** The party's sustainer. Feeds everyone through expert foraging and cooking, navigates by reading natural signs, and provides healing meals during camp.

---

### Rogue / Bard (Striker / Utility)
**Skills:** Fighting/Mysticism, Stealth, Streetwise/Influence, Insight/Education
**Travel Roles:** Scout (road), social encounters

| Talent | Source | Travel Effect |
|--------|--------|---------------|
| **Road Warden** (new) | Streetwise | Supply discounts at settlements, encounter avoidance, automatic shelter on roads, contacts |
| **Jack of All Trades** | Streetwise | Substitute Streetwise for any travel role skill once/scene |
| **I Know A Guy** | Streetwise | Settlement contacts for supplies and information |

**Build Identity:** The urban traveler. Excels on established roads and near settlements. Can avoid encounters, find better prices, and leverage contacts at safepoints.

---

## 8. Balance and Playtesting Considerations

### Power Level Assessment

| Talent | Rank 1 Power | Rank 3 Power | Concern Level |
|--------|-------------|-------------|---------------|
| **Pathfinder** | Moderate (conditional terrain ignore or Fatigue removal) | High (free fast pace, detour avoidance) | Low — Rank 3 abilities are once/journey limited |
| **Trailblazer** | Moderate (forced march Fatigue roll, terrain boon) | High (group Fatigue resistance, emergency progress) | Low — Rank 3 inspirational effect requires line of sight |
| **Cartographer's Eye** | Moderate (navigation boon or event preview) | High (bonus shelter, Hidden Checkpoint warning) | Low — Rank 3 checkpoint warning is once/journey |
| **Expedition Leader** | Moderate (Education Quartermaster, route intel) | High (Education boon, rest day) | Low — rest day requires checkpoint, no progress |
| **Road Warden** | Low-Moderate (supply discount, social boon) | Moderate (road navigation boon, one-time contact) | Low — limited to roads and civilized areas |
| **Seasoned Forager** | Moderate (extended freshness, bonus materials) | High (non-spoiling food, restorative meal) | Low — Rank 3 meal is once/journey |

### Stacking and Synergy Checks

| Combination | Stacking Issue? | Resolution |
|-------------|----------------|------------|
| Pathfinder + Knowledgeable Wanderer | Both grant navigation boons | Different triggers (Pathfinder = terrain ignore, KW = flat boon). Both are situational bonuses but with different conditions. No conflict |
| Trailblazer + Explorer's Tenacity | Both mitigate Fatigue | Different mechanisms (Trailblazer = Athletics roll to avoid, ET = doubled rest recovery). Complement rather than duplicate |
| Cartographer's Eye + Explorer of Nature | Both improve Scout role | Different triggers (CE = event preview/checkpoint intel, EoN = terrain-specific re-roll). No conflict |
| Expedition Leader + General Education | Both use Education for non-standard rolls | GE allows Education for any expert skill; EL specifically applies Education to Quartermaster. GE is broader but once/scene. No conflict |
| Road Warden + I Know A Guy | Both provide settlement contacts | Different scope (RW = travel contacts once/journey, IKAG = downtime contacts once between adventures). No conflict |
| Seasoned Forager + Plant Lore + Wilderness Expert | Triple foraging stack | Each provides a different bonus: SF (freshness/materials), PL (+1 unit), WE (rations from raw food). Powerful combination but requires 3 talent slots across 2 skills. Acceptable at high investment |

### Playtesting Priorities

1. **Pathfinder Rank 3** — Verify that free "fast pace" on strong/critical success doesn't create excessive progress when combined with other travel modifiers (mounts, roads).
2. **Trailblazer Rank 3** — Verify that group Fatigue resistance during forced march doesn't make forced marching trivially easy.
3. **Expedition Leader Rank 3 rest day** — Verify that the rest day mechanic doesn't break journey pacing when used optimally.
4. **Road Warden Rank 2 encounter avoidance** — Verify that avoiding encounters at the cost of 1 progress is a meaningful trade-off and doesn't allow trivial bypass of narrative-important encounters.
5. **Seasoned Forager + Plant Lore + Wilderness Expert stack** — Playtest the triple-forager build to ensure it is powerful but not game-breaking.

---

## 9. Summary and Recommendations

### Key Findings

1. **4 existing talents** directly interact with travel mechanics (Explorer of Nature, Knowledgeable Wanderer, Explorer's Tenacity, Wilderness Expert), with 2 having incomplete ranks (XXX/TODO).
2. **12+ existing talents** have indirect travel relevance (Expert Rider, Animal Companion, Danger Sense, etc.) but don't specifically reference travel system mechanics.
3. **Major gaps** exist for the Quartermaster role, Perception-based scouting, Education-based navigation, Streetwise travel utility, and Athletics travel resilience.
4. **Terminology mismatches** exist in Explorer of Nature (references "Encounter Die" instead of current Travel Event Table).

### Proposed Changes (Summary)

| Change | Type | Priority |
|--------|------|----------|
| **Pathfinder** (Survival) | New talent | High |
| **Trailblazer** (Athletics) | New talent | High |
| **Cartographer's Eye** (Perception) | New talent | Medium |
| **Expedition Leader** (Education) | New talent | Medium |
| **Road Warden** (Streetwise) | New talent | Medium |
| **Seasoned Forager** (Nature) | New talent | Medium |
| Explorer of Nature Rank 2 wording | Clarification | High |
| Knowledgeable Wanderer Rank 3 | Completion | High |
| Wilderness Expert Rank 3 | Completion | Medium |
| Relentless Tracker Ranks 2-3 | Completion | Low |

### Impact on Design Metrics

| Metric | Before | After (Proposed) | Change |
|--------|--------|-------------------|--------|
| Travel talent % | 3% | ~10% | +7% |
| Talents interacting with travel | 4 direct | 10 direct | +6 |
| Skills with travel talents | 3 (Survival, Nature, Fortitude) | 7 (+Athletics, Perception, Education, Streetwise) | +4 |
| Archetype travel coverage | 4 archetypes | 10+ archetypes | +6 |

---

**End of Travel Talent Integration Analysis**
