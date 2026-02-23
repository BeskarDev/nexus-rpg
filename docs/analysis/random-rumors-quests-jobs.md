# Random Rumors, Quest Hooks & Jobs — Game Design Analysis

A modular, seed-based system for generating random **rumors**, **quest hooks**, and **adventuring jobs**. The GM rolls a handful of dice, reads off the fragments, and assembles them into a sentence seed that can be fleshed out with campaign-specific details.

> **Status:** Design analysis — not yet incorporated into official rules.

---

## Design Goals

- **Roll-and-read:** The GM grabs a set of dice, rolls them all at once, and reads the result directly from the tables — no sequential lookups.
- **Sentence seeds:** Each category has a template sentence with blanks. The dice fill those blanks with generic, portable fragments.
- **Setting-agnostic fragments:** Table entries name *types* (a beast, a ruin, a merchant), never specific names. The GM adds local flavour (the specific monster, NPC, or landmark from their campaign).
- **Level-scaled rewards:** Coin and treasure values scale with party level using the same quality-tier brackets as the existing treasure tables.
- **Easy to extend:** Adding new entries means adding rows to a d12 table. No formulas or cross-references change.

---

## How It Works

### 1. Pick a Category

Choose one or roll d6:

| d6 | Category |
|----|----------|
| 1–2 | Rumor |
| 3–4 | Quest Hook |
| 5–6 | Job |

### 2. Grab the Dice & Roll

Each category tells you which dice to roll — always in one throw. Each die maps to one column in the tables below.

### 3. Read the Sentence Seed

Plug the rolled fragments into the category's template sentence. The result is a ready-to-use seed the GM can paraphrase aloud or write on a notice board.

### 4. Add Campaign Detail

Replace generic fragments with specific names, creatures, and locations from the GM's setting. Adjust scope and reward to the party's level using the tier bracket table.

---

## Level Scaling

Challenge and reward scale with party level using the same quality-tier brackets as the existing treasure tables.

| Party Level | Scope | Coin Reward | Treasure Quality | Travel Time |
|-------------|-------|-------------|------------------|-------------|
| 1–2 | Local (village, neighbourhood) | 25–250 | Q1–Q3 | Hours |
| 3–4 | Regional (district, trade route) | 100–750 | Q2–Q4 | Days |
| 5–6 | Provincial (city-state, province) | 250–2,500 | Q3–Q5 | A week |
| 7–8 | National (kingdom, major faction) | 750–7,500 | Q4–Q6 | Weeks |
| 9–10 | Legendary (world-shaping, mythic) | 2,500–25,000 | Q5–Q7 | A season |

The GM picks the row matching the party's level and uses it to set enemy tier, travel distance, and reward value. A "beast" in a Local rumor is a lone predator; in a Legendary rumor it is a mythic creature of terrible power.

---

## Rumors

Rumors are vague hearsay — unverified, possibly exaggerated, and open to interpretation. They seed player-driven exploration.

### Sentence Seed

> *"[Source] says that [subject] [has been seen / has appeared / is happening] [near location]. They say it's because of [cause]."*

**Roll 4d12** — one each for **Source**, **Subject**, **Location**, and **Cause**.

### Rumor Tables

#### Source (d12) — *Who is spreading the rumor?*

| d12 | Source |
|-----|--------|
| 1 | A travelling merchant |
| 2 | A shepherd from the outskirts |
| 3 | A drunk sailor at the docks |
| 4 | Beggars in the lower quarter |
| 5 | A caravan guard passing through |
| 6 | An old scribe at the archive |
| 7 | Fishermen on the river |
| 8 | Refugees from a nearby village |
| 9 | A temple acolyte |
| 10 | Children playing near the walls |
| 11 | A retired soldier |
| 12 | A foreign pilgrim |

#### Subject (d12) — *What was seen or heard?*

| d12 | Subject |
|-----|---------|
| 1 | Strange lights |
| 2 | Unusual sounds at night |
| 3 | Animals behaving strangely |
| 4 | People going missing |
| 5 | Tainted water or blighted crops |
| 6 | An ancient marker or idol uncovered |
| 7 | Armed strangers gathering |
| 8 | A sealed place found broken open |
| 9 | Goods or livestock vanishing |
| 10 | A strange illness spreading |
| 11 | Unnatural weather or tremors |
| 12 | Apparitions or phantoms |

#### Location (d12) — *Where?*

| d12 | Location |
|-----|----------|
| 1 | The old ruins on the hill |
| 2 | A cave system near the ridge |
| 3 | The marshes beyond the fields |
| 4 | An abandoned watchtower |
| 5 | The lower quarter's tunnels |
| 6 | A dried riverbed or gorge |
| 7 | The trade road heading north |
| 8 | A sealed tomb or barrow |
| 9 | The coastal cliffs |
| 10 | A sacred grove or shrine |
| 11 | The outskirts of a neighbouring village |
| 12 | The flooded docks or old canals |

#### Cause (d12) — *What's the suspected explanation?*

| d12 | Cause |
|-----|-------|
| 1 | A beast that's grown bold or territorial |
| 2 | Grave robbers or tomb breakers |
| 3 | A curse or lingering enchantment |
| 4 | A cult performing secret rites |
| 5 | Bandits using it as a hideout |
| 6 | A restless spirit or undead presence |
| 7 | Smugglers moving contraband |
| 8 | An old ward or seal breaking down |
| 9 | A feud between local factions |
| 10 | Poisonous growth from underground |
| 11 | A newly arrived outsider stirring trouble |
| 12 | Something unearthed that should have stayed buried |

> **Reliability (optional, hidden d6):** On a 1–2 the rumor is mostly false or exaggerated, on 3–5 it is partially true, on 6 it is completely accurate.

### Rumor Example

> **Rolls:** Source 7, Subject 9, Location 3, Cause 1.
>
> **Seed:** *"Fishermen on the river say that livestock have been vanishing near the marshes beyond the fields. They say it's because of a beast that's grown bold."*
>
> **GM adds detail (Level 3 party, Regional scope):** The marshes are a day's travel south. The beast is a large marsh predator (Tier 3 creature). Villagers will pay 150 coins and supply rations for anyone who deals with it.

---

## Quest Hooks

Quest hooks are confirmed problems posted publicly. They have a clear objective, a known location, and an implied danger.

### Sentence Seed

> *"Wanted: [task] the [subject] at [location]. Warning: [complication]. Reward: [reward]."*

**Roll 5d12** — one each for **Task**, **Subject**, **Location**, **Complication**, and **Reward**.

### Quest Hook Tables

#### Task (d12) — *What needs doing?*

| d12 | Task |
|-----|------|
| 1 | Track and eliminate |
| 2 | Investigate and report on |
| 3 | Recover or retrieve |
| 4 | Escort safely past |
| 5 | Explore and map |
| 6 | Defend or protect from |
| 7 | Capture alive |
| 8 | Deliver supplies through |
| 9 | Clear out or secure |
| 10 | Negotiate with or appease |
| 11 | Rescue survivors from |
| 12 | Scout ahead and assess |

#### Subject (d12) — *What or who is involved?*

| d12 | Subject |
|-----|---------|
| 1 | A dangerous beast or pack |
| 2 | A bandit gang or raiders |
| 3 | A stolen relic or heirloom |
| 4 | A missing person or group |
| 5 | A cursed site or artefact |
| 6 | A rival expedition or faction |
| 7 | An infestation or blight |
| 8 | An undead threat |
| 9 | Illegal goods or contraband |
| 10 | A collapsed or flooded passage |
| 11 | A rogue automaton or construct |
| 12 | A territorial spirit or entity |

#### Location (d12) — *Where?*

| d12 | Location |
|-----|----------|
| 1 | A remote valley |
| 2 | A mountain pass or gorge |
| 3 | The marshlands or fens |
| 4 | An overgrown estate or ruin |
| 5 | A mine or excavation site |
| 6 | A contested borderland |
| 7 | The old sewer or canal system |
| 8 | A stretch of coastal road |
| 9 | A newly exposed underground structure |
| 10 | A desert crossing or dust flat |
| 11 | A riverbank or waterway |
| 12 | A hilltop shrine or monument |

#### Complication (d12) — *What makes this harder than expected?*

| d12 | Complication |
|-----|--------------|
| 1 | A second group is also hunting the objective |
| 2 | The target is more numerous or powerful than reported |
| 3 | The terrain is unstable or hazardous |
| 4 | A traitor or spy is feeding information to the opposition |
| 5 | The objective is morally grey — the "enemy" may be sympathetic |
| 6 | Ancient wards or traps are still active |
| 7 | A deadline creates time pressure |
| 8 | Local authorities are uncooperative or hostile |
| 9 | The weather or season makes conditions brutal |
| 10 | Completing the task will anger a powerful faction |
| 11 | Innocent bystanders are caught in the middle |
| 12 | The problem is a symptom of something much larger |

#### Reward (d12) — *What's on offer?*

| d12 | Reward |
|-----|--------|
| 1 | Coins (standard bounty) |
| 2 | Coins plus recovered goods |
| 3 | A share of whatever is found |
| 4 | Supplies, materials, or alchemical goods |
| 5 | A favour from a local authority |
| 6 | Reputation with a guild or faction |
| 7 | Political favour or legal immunity |
| 8 | A piece of equipment or a crafted item |
| 9 | Access to restricted information or records |
| 10 | Safe haven or ongoing hospitality |
| 11 | A claim on future trade or resources |
| 12 | A masterwork or rare-material item |

### Quest Hook Example

> **Rolls:** Task 1, Subject 1, Location 3, Complication 5, Reward 1.
>
> **Seed:** *"Wanted: track and eliminate a dangerous beast at the marshlands. Warning: the enemy may be sympathetic. Reward: coins (standard bounty)."*
>
> **GM adds detail (Level 5 party, Provincial scope):** The beast is a large territorial predator that's been preying on livestock — but it's protecting its young. The bounty is 500 coins, posted by the regional governor. Killing the young would be easy but may anger a local druidic circle. Relocating the creature is harder but earns their favour.

---

## Jobs

Jobs are direct commissions from a patron. They include a named employer, a specific task, and negotiated pay.

### Sentence Seed

> *"I, [patron], want you to [task] the [subject] at [location], but [complication]. On success, I offer [reward]."*

**Roll 6d12** — one each for **Patron**, **Task**, **Subject**, **Location**, **Complication**, and **Reward**.

### Job Tables

#### Patron (d12) — *Who's hiring?*

| d12 | Patron |
|-----|--------|
| 1 | A wealthy merchant |
| 2 | A retired military officer |
| 3 | A disgraced priest or scholar |
| 4 | A guild master (alchemist, smith, etc.) |
| 5 | A city magistrate acting unofficially |
| 6 | A tribal elder or clan chief |
| 7 | A foreign diplomat or envoy |
| 8 | A harbour master or dock official |
| 9 | A noble's steward or servant |
| 10 | A prison warden or watch captain |
| 11 | A master artisan with a special commission |
| 12 | A caravan boss or trade captain |

#### Task (d12) — *What does the patron need done?*

| d12 | Task |
|-----|------|
| 1 | Investigate and find the culprit behind |
| 2 | Travel to and recover |
| 3 | Infiltrate and dismantle |
| 4 | Harvest or collect |
| 5 | Escort or guard |
| 6 | Find and bring back |
| 7 | Track and recapture |
| 8 | Deliver discreetly |
| 9 | Eliminate or drive off |
| 10 | Protect from sabotage |
| 11 | Acquire before a rival does |
| 12 | Gain entry to and secure |

#### Subject (d12) — *What's the focus of the job?*

| d12 | Subject |
|-----|---------|
| 1 | A stolen shipment or goods |
| 2 | A buried cache or hidden stash |
| 3 | Sealed documents or records |
| 4 | Rare ingredients or materials |
| 5 | A smuggling operation |
| 6 | A missing person (ally, kin, agent) |
| 7 | A diplomatic parcel or message |
| 8 | A creature lairing in the area |
| 9 | A runaway or fugitive |
| 10 | Escaped prisoners |
| 11 | A seized or confiscated resource |
| 12 | A high-value cargo |

#### Location (d12) — *Where does the job take place?*

| d12 | Location |
|-----|----------|
| 1 | The warehouse district or merchant quarter |
| 2 | An old battlefield or contested ground |
| 3 | Sealed chambers beneath a temple or shrine |
| 4 | A rocky gorge or quarry |
| 5 | The canal docks or waterfront tunnels |
| 6 | Burial hills or a barrow complex |
| 7 | A trade road or border crossing |
| 8 | The flooded lower docks |
| 9 | The road to a neighbouring settlement |
| 10 | Mixed terrain (wilderness and urban) |
| 11 | A border checkpoint or customs post |
| 12 | Overland through hostile territory |

#### Complication (d12) — *What's the catch?*

| d12 | Complication |
|-----|--------------|
| 1 | The real culprit is someone the patron trusts |
| 2 | The site is on someone else's land; they won't cooperate |
| 3 | A powerful institution opposes the task |
| 4 | The situation is more dangerous than the patron admits |
| 5 | Completing the job may have far-reaching consequences |
| 6 | The target is alive and resists — with reason |
| 7 | A rival faction is also pursuing the objective |
| 8 | The patron is hiding their true motive |
| 9 | The subject doesn't want to be found and has protection |
| 10 | One part of the job conflicts with the party's morals |
| 11 | The material or object is legally restricted |
| 12 | The cargo or asset is dangerous in itself |

#### Reward (d12) — *What does the patron offer?*

| d12 | Reward |
|-----|--------|
| 1 | Generous coin payment |
| 2 | Coins plus a share of the recovered goods |
| 3 | Coins plus rare scholarly or magical information |
| 4 | Coins plus alchemical potions or supplies |
| 5 | Substantial coins plus legal cover |
| 6 | Coins plus safe haven and ongoing hospitality |
| 7 | Premium coins plus political favour |
| 8 | Coins plus useful contacts or an information network |
| 9 | Coins plus a favour from a noble house |
| 10 | Coins paid per objective completed |
| 11 | Coins plus a masterwork item crafted as thanks |
| 12 | Negotiable coins (half up front) plus trade connections |

### Job Example

> **Rolls:** Patron 4, Task 4, Subject 4, Location 4, Complication 4, Reward 4.
>
> **Seed:** *"I, a guild master, want you to harvest rare ingredients at a rocky gorge, but the situation is more dangerous than I admit. On success, I offer coins plus alchemical supplies."*
>
> **GM adds detail (Level 3 party, Regional scope):** A guild alchemist needs fresh venom sacs from pit asps. The gorge is a day's ride east, but the nest is larger than she claims. She offers 200 coins and a batch of healing salves. The gorge is unstable after recent rains — the terrain itself is a hazard.

---

## Generating Multiple Leads at Once

During a scene — an evening at a caravansary, a visit to the town square, or a meeting with a contact — the GM can generate several leads at once to give the party choices.

**Quick method:** Roll for one rumor, one quest hook, and one job. This provides three leads with different levels of detail and commitment. The party picks what interests them.

The GM may also roll different categories at different tier brackets for variety:

- A **Local rumor** that seems minor but hints at something larger.
- A **Provincial quest hook** matching the party's power level.
- A **Regional job** that pays less but appeals to the party's morals.

---

## Reward Modifiers

After generating the base seed, the GM sets the coin reward using the tier bracket table and may adjust it:

| Modifier | Adjustment |
|----------|------------|
| Time pressure | +25% |
| High danger | +50% |
| Wealthy patron | +25% |
| Desperate patron | +50%, risk of non-payment |
| Discreet work | +25% |
| Moral complexity | +0 coins, add reputation or favour |

Non-coin rewards include **favours** (future assistance), **reputation** (faction standing), **items** (use the treasure-quality table), **information** (maps, lore, contacts), and **safe haven** (rest and resupply at no cost).

---

## Expanding the Tables

Each table uses d12. To add entries:

1. Write a new row using the same generic, setting-agnostic style.
2. Append it to the table.
3. If a table exceeds 12 entries, switch to d20 and fill the remaining slots.

Contributors can also create **themed sub-tables** scoped to an environment (desert, coastal, subterranean), faction (temple, guild, criminal underworld), or tone (lighthearted, grim, morally grey). A sub-table replaces one column at the GM's discretion.

### Entry Guidelines

- Name *types*, not specific names (a merchant, a ruin — never "Khalid" or "the Tower of Ashur").
- Keep fragments short — one phrase, not a full sentence.
- Ensure each fragment makes sense combined with any fragment from the other columns.
- Match the Bronze Age sword-and-sorcery tone (no firearms, modern idioms, or high-fantasy tropes).

---

## Quick Reference

### Dice Summary

| Category | Dice | Columns |
|----------|------|---------|
| **Rumor** | 4d12 | Source, Subject, Location, Cause |
| **Quest Hook** | 5d12 | Task, Subject, Location, Complication, Reward |
| **Job** | 6d12 | Patron, Task, Subject, Location, Complication, Reward |

### Sentence Seeds

- **Rumor:** *"[Source] says that [subject] [has been seen / is happening] [near location]. They say it's because of [cause]."*
- **Quest Hook:** *"Wanted: [task] the [subject] at [location]. Warning: [complication]. Reward: [reward]."*
- **Job:** *"I, [patron], want you to [task] the [subject] at [location], but [complication]. On success, I offer [reward]."*

### Procedure

1. Pick or roll a category (d6).
2. Roll the dice for that category (see table above) — all at once.
3. Read the fragments from the tables and plug them into the sentence seed.
4. Apply the tier bracket for the party's level to set scope, enemy strength, and reward.
5. Replace generic types with campaign-specific names, creatures, and places.
