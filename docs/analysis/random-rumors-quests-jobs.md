# Random Rumors, Quest Hooks & Jobs — Game Design Analysis

This document presents a modular design for generating random **rumors**, **quest hooks**, and **adventuring jobs** for Game Masters. It extends the existing random table toolset with level-scaling content appropriate to the Nexus RPG setting.

> **Status:** Design analysis — not yet incorporated into official rules.

---

## Design Goals

- Provide GMs with a quick, flavorful way to populate tavern gossip, quest boards, and NPC job offers.
- Scale challenge and reward to match party level, reusing the existing treasure-quality tier progression.
- Keep each table self-contained and easy to extend with new entries.
- Blend mechanical guidance (patron type, task difficulty, reward range) with evocative Bronze Age sword-and-sorcery flavor.
- Support multiple discovery contexts: overhearing rumors at a caravansary, scanning a city-state notice board, or receiving a direct commission from a patron.

---

## Core Concepts

### Three Content Categories

| Category | What It Represents | Typical Source | Detail Level |
|----------|-------------------|----------------|--------------|
| **Rumor** | Unverified hearsay the party may choose to investigate | Tavern patrons, marketplace gossip, travellers | Vague — location and hint only |
| **Quest Hook** | A clear call to adventure with a known objective | Notice boards, town criers, temple postings | Moderate — objective, location, and implied danger |
| **Job** | A direct commission from a named patron with negotiated terms | NPC employers, guild contacts, noble courts | Detailed — patron, task, deadline, and explicit reward |

Each category answers a different question at the table:

- **Rumor:** *"What have you heard?"* — seeds for player-driven exploration.
- **Quest Hook:** *"What needs doing?"* — structured adventure prompts with clear goals.
- **Job:** *"Who's hiring?"* — patron-driven tasks with concrete stakes and pay.

### Discovery Context

Before rolling, the GM chooses (or rolls d6 for) a **discovery context** that frames the fiction:

| d6 | Context | Description |
|----|---------|-------------|
| 1 | Tavern talk | Overheard while carousing among locals or travellers |
| 2 | Notice board | Posted publicly in a settlement square or guild hall |
| 3 | Street gossip | Picked up in the bazaar, docks, or city gates |
| 4 | Patron summons | An NPC seeks the party out directly |
| 5 | Traveller's tale | Shared by a caravan guard, pilgrim, or wandering merchant |
| 6 | Temple or shrine | Whispered by a priest, written on votive tablets, or divined through rites |

The context colours the delivery but does not change the mechanical content of the result.

---

## Level-Scaling Logic

Challenge and reward scale with party level using the same quality-tier brackets as the existing treasure tables. This keeps the system consistent and avoids introducing a separate power curve.

### Tier Brackets

| Party Level | Tier Label | Challenge Scope | Reward Range (coins) | Treasure Quality |
|-------------|-----------|-----------------|----------------------|------------------|
| 1–2 | Local | Neighbourhood or village threats | 25–250 | Q1–Q3 |
| 3–4 | Regional | Threats to a district or trade route | 100–750 | Q2–Q4 |
| 5–6 | Provincial | Dangers affecting a city-state or province | 250–2,500 | Q3–Q5 |
| 7–8 | National | Crises spanning kingdoms or major factions | 750–7,500 | Q4–Q6 |
| 9–10 | Legendary | World-shaping events or mythic adversaries | 2,500–25,000 | Q5–Q7 |

**How to use the brackets:**

1. Identify the party's current level range.
2. Roll on the appropriate category table (Rumor, Quest Hook, or Job).
3. Apply the tier bracket to set enemy strength, travel distance, and reward value.
4. Adjust flavour to match the scope — a Level 1 bandit camp becomes a Level 9 warlord's citadel.

### Scaling Principles

- **Enemies** should be creatures or NPCs whose tier matches the party level (see Creature Statistics in the creature-building rules).
- **Travel distance** grows with tier: local (hours), regional (days), provincial (a week), national (weeks), legendary (a season-long expedition).
- **Reward coins** sit within the bracket range; use the existing treasure tables for item rewards.
- **Complications** increase at higher tiers: more factions, tighter deadlines, moral dilemmas.

---

## Table Structure

Each table uses a **d12 roll** to select the core entry, then the GM applies the tier bracket for scaling. Tables can be extended simply by adding new rows — no formula changes are needed.

### Anatomy of an Entry

Every entry includes the following fields:

| Field | Purpose |
|-------|---------|
| **Hook** | One-line evocative description the GM can read or paraphrase aloud |
| **Task** | What the party is expected to do (investigate, retrieve, escort, eliminate, etc.) |
| **Location** | Type of site the adventure leads to (ruin, wilderness, settlement, underground, etc.) |
| **Complication** | A twist, hazard, or moral wrinkle that makes the task interesting |
| **Reward Type** | Coins, items, favours, information, or reputation — guides the GM's payout |

---

## Rumor Table

Rumors are vague and unverified. They reward investigation and may turn out to be exaggerated, partially true, or outright false. The GM decides reliability when the rumor is rolled or discovered.

| d12 | Hook | Task | Location | Complication | Reward Type |
|-----|------|------|----------|--------------|-------------|
| 1 | "Shepherds near the salt flats say their flocks vanish at dusk — only bones remain by morning." | Investigate disappearances and eliminate the predator | Wilderness (salt flats, scrubland) | The predator is a sacred beast protected by a local cult | Coins + patron gratitude |
| 2 | "A merchant claims he saw lights moving inside the sealed tomb on the hill, though it's been bricked up for generations." | Explore the tomb and discover the source of the lights | Underground (sealed tomb) | The lights are cast by grave robbers who will fight to protect their find | Treasure from the tomb |
| 3 | "The well water in the lower quarter has turned bitter. Healers blame the new tannery, but beggars whisper of something deeper." | Investigate the contamination and resolve the cause | Settlement (urban lower quarter, tunnels beneath) | The true cause is a necromantic ritual polluting the aquifer | Favour from the district elders |
| 4 | "A foreign sailor babbles about a reef of black coral that sings when the tide retreats — and about the ship that wrecked trying to reach it." | Locate the reef and salvage the wreck | Coastal (reef and shipwreck) | The coral attracts dangerous sea creatures at low tide | Salvaged cargo and trade goods |
| 5 | "Caravan drivers refuse the northern pass since last moon. They say the stones there move on their own." | Scout the pass and determine whether it's safe | Wilderness (mountain pass) | An earth spirit has awakened and is reshaping the terrain | Information (mapped safe route) + reputation |
| 6 | "An old scribe at the archive insists a missing clay tablet records the location of a pre-cataclysm armoury, buried beneath the canal district." | Research the tablet's last known location and recover it | Settlement (archive, canal tunnels) | A rival scholar is also hunting the tablet and has hired thugs | Information (armoury location) |
| 7 | "Fishermen pulled a bronze idol from the river — then threw it back when their nets began to bleed." | Retrieve the idol and determine its origin | Waterway (river, possibly a submerged shrine) | The idol is cursed; possessing it draws hostile spirits | Idol (valuable artefact) or patron bounty |
| 8 | "A child in the refugee camp keeps drawing the same symbol — a spiral with teeth. The camp healers are frightened." | Investigate the child's visions and their source | Settlement (refugee camp, nearby ruin) | The visions are real prophecy pointing to an imminent threat | Reputation + favour from the healers |
| 9 | "The old watchtower garrison fled in the night. Their commander's seal was found snapped in half on the threshold." | Investigate the abandoned watchtower | Ruin (abandoned watchtower) | Desertion was caused by an infiltrator using enchantment magic | Coins (military bounty) |
| 10 | "Traders from the south say a new warlord is raising an army in the badlands, paying in ancient gold coins nobody can identify." | Gather intelligence on the warlord's strength and backers | Wilderness (badlands encampment) | The gold coins are looted from a sealed vault — the warlord's true goal | Information + coins |
| 11 | "The beekeeper on the ridge says her hives have gone silent, and the flowers around them wilt overnight." | Investigate the cause of the blight | Wilderness (ridge, meadow, nearby cave) | A toxic fungal growth from underground is spreading to the surface | Coins + harvested alchemical reagents |
| 12 | "A prisoner in the city gaol claims to know the entrance to the lost aqueduct vaults — and will trade the secret for freedom." | Negotiate with the prisoner and explore the vaults | Underground (aqueduct vaults beneath the city) | The prisoner is a con artist — but the vaults are real and occupied | Treasure from the vaults |

> **Reliability:** When generating a rumor, the GM may privately roll d6. On a 1–2 the rumor is mostly false or exaggerated, on a 3–5 it is partially true, and on a 6 it is completely accurate. This roll is hidden from the players.

---

## Quest Hook Table

Quest hooks are confirmed problems with clear objectives. They are publicly known and typically time-sensitive.

| d12 | Hook | Task | Location | Complication | Reward Type |
|-----|------|------|----------|--------------|-------------|
| 1 | A bounty notice names a bandit leader whose raids threaten the grain caravans before harvest season. | Track and capture or kill the bandit leader | Wilderness (bandit camp along a trade road) | The bandit leader is a former soldier with trained fighters and a fortified camp | Coins (bounty) + seized goods |
| 2 | A temple announces that a sacred relic was stolen during a festival. The high priest offers a public reward for its return. | Recover the stolen relic and return it to the temple | Settlement (thieves' quarter) then underground (fence's hideout) | The thief stole the relic to settle a debt with a dangerous crime lord | Coins + temple blessing (favour) |
| 3 | A village elder posts a plea: a creature from the marshes has been dragging livestock into the fog, and the hunters sent after it have not returned. | Venture into the marshes, find the hunters, and slay or drive off the creature | Wilderness (marshland) | The missing hunters are alive but trapped; a rescue must happen before the confrontation | Coins + village supplies |
| 4 | The governor's office seeks escorts for a diplomatic envoy travelling to a rival city-state. The route passes through contested territory. | Escort the envoy safely to the destination | Overland (contested borderlands) | A faction within the destination city wants the envoy to fail and has arranged ambushes | Coins + political favour |
| 5 | A mining guild reports that excavation broke through into a natural cavern system. Strange sounds echo from below, and miners refuse to return. | Explore the cavern system and neutralize any threat | Underground (mine and natural caverns) | The caverns contain an ancient automaton guardian still following its last orders | Coins + first claim on mineral finds |
| 6 | Wanted: someone to investigate why supply shipments along the coastal road have been arriving empty — crates intact but contents gone. | Investigate the disappearances along the coastal road | Overland (coastal road, waystation) | The thefts are carried out by a shapeshifter replacing drivers mid-journey | Coins (merchant guild reward) |
| 7 | A noble house offers a reward for the retrieval of an heirloom sword lost when the family's ancestral estate was overrun by squatters a decade ago. | Enter the ruined estate and recover the sword | Ruin (overgrown manor estate) | The squatters are desperate refugees, and the "heirloom" may be a weapon with a dark history | Item (the sword, if returned) or coins (if kept) |
| 8 | A herbalist needs a rare root that only grows in a valley two days' travel from the city. The valley is known to be territorial beast country. | Travel to the valley, harvest the root, and return safely | Wilderness (remote valley) | The beasts are a mated pair; killing one enrages the other, but harvesting requires entering their territory | Coins + alchemical supplies |
| 9 | A flood has exposed a staircase descending into the riverbank. A crowd has gathered but nobody dares go inside. The magistrate wants answers before treasure hunters arrive. | Explore the newly revealed structure before it is looted | Underground (exposed riverbank structure) | The structure is a pre-cataclysm prison, and some of its wards are still active | Coins (magistrate's fee) + salvaged treasure |
| 10 | A pilgrimage caravan is forming and needs armed protection. The route crosses a desert stretch plagued by sand raiders. | Guard the caravan through hostile territory | Overland (desert route) | A spy among the pilgrims is feeding information to the raiders about the caravan's defences | Coins + reputation with the faith |
| 11 | Strange illness spreads through a district near the old canal. The city council offers payment for anyone who can trace and stop the source. | Investigate the illness and eliminate its cause | Settlement (canal district, old sewer system) | The source is a ruptured alchemical cache left by a defunct guild; cleaning it is hazardous | Coins + council favour |
| 12 | A group of astronomers claims that a fallen star landed in the foothills three nights ago. They need an escort to the impact site before rival factions reach it first. | Escort the astronomers and secure the impact site | Wilderness (foothills, crater) | A rival expedition is already en route, and the "star" is a meteorite with unusual magical properties | Coins + share of findings (rare material) |

---

## Job Table

Jobs are formal commissions from a specific patron. They carry negotiated terms, clear expectations, and defined payment. The patron's identity and motivation add narrative depth.

| d12 | Patron | Hook | Task | Location | Complication | Reward |
|-----|--------|------|------|----------|--------------|--------|
| 1 | A wealthy merchant with a grudge | "Someone sabotaged my warehouse. I want the culprit found and my goods recovered — quietly." | Investigate the sabotage, identify the culprit, and recover stolen goods | Settlement (warehouse district, rival's holdings) | The saboteur is a family member of the merchant acting out of revenge for a past betrayal | Coins (generous) + a trade favour |
| 2 | A retired military officer | "My old company buried a cache before the last war ended. I'll pay for muscle to dig it up before the land is sold." | Travel to the cache site and excavate it | Wilderness (old battlefield, now farmland) | The cache is on a farmer's land; the farmer won't cooperate, and local militia may intervene | Coins + share of cache (weapons or gear) |
| 3 | A temple priest in disgrace | "I was expelled for heresy, but the truth I uncovered is real. Bring me proof from the shrine they sealed and I'll make it worth your while." | Enter a sealed shrine and recover documentary evidence | Underground (sealed temple archives) | The current priesthood considers entry sacrilege and will send agents to stop the party | Coins + rare scholarly information |
| 4 | A guild alchemist | "I need venom sacs from pit asps — fresh, not dried. The nest is in the gorge east of the quarry." | Harvest venom sacs from living pit asps | Wilderness (rocky gorge) | The asps are more numerous than reported, and the gorge is unstable after recent rains | Coins + alchemical potions |
| 5 | A city magistrate (anonymous) | "There's a smuggling ring operating through the canal locks. I can't use official guards — too many are compromised. Shut it down." | Infiltrate and dismantle a smuggling operation | Settlement (canal docks, underground tunnels) | The smugglers are moving something far more dangerous than contraband — illegal enchanted weapons | Coins (substantial) + legal immunity for the job |
| 6 | A tribal elder from the steppe | "A bone-reader from our clan went into the burial hills to commune with the ancestors and has not returned in seven days." | Find the missing bone-reader in the burial hills | Wilderness (burial hills, barrow complex) | The bone-reader is alive but has been possessed by an ancestral spirit that refuses to release its host | Coins + tribal hospitality (safe haven, supplies) |
| 7 | A foreign diplomat | "My courier was ambushed and a sealed diplomatic pouch was taken. I need it retrieved before its contents are read — or copied." | Track the ambushers and recover the diplomatic pouch | Overland (ambush site along a trade road, bandit hideout) | The pouch contains intelligence that could start a war; another faction also wants it | Coins (premium) + political favour |
| 8 | A dockmaster | "Something large is living in the flooded lower docks. It's damaging hulls and scaring off trade ships. I need it gone." | Eliminate or drive off the creature in the flooded docks | Settlement (waterfront, flooded dock tunnels) | The creature is protecting a clutch of eggs; destroying them may anger a druid or nature cult | Coins + dockmaster's connections (information network) |
| 9 | A noble's steward | "My lord's heir has eloped with an unsuitable partner. Retrieve the heir — alive, unharmed, and discreetly." | Locate and retrieve a runaway noble heir | Overland (road to a neighbouring city, roadside inns) | The heir does not want to return and has hired bodyguards; the "unsuitable partner" is genuinely in love | Coins + noble house favour |
| 10 | A prison warden | "Three dangerous inmates escaped through a collapsed wall during the storm. Bring them back, dead or alive." | Track and recapture three escaped prisoners | Wilderness and settlement (mixed terrain, urban hideouts) | One of the prisoners is innocent and will offer proof if given a chance to speak | Coins (per prisoner) + warden's favour |
| 11 | A master smith | "I've been offered a commission to forge a blade from star-metal, but my last shipment was seized at the border. Get it released — or acquire more." | Recover seized material or find an alternative source | Settlement (border checkpoint) or wilderness (meteorite site) | The material was seized because it's classified as a strategic resource by the local authority | Coins + a masterwork item crafted as thanks |
| 12 | A caravan boss | "I'm moving a high-value cargo through the dust flats next week. I don't trust my regular guards for this one. Interested?" | Guard a high-value cargo shipment through dangerous territory | Overland (dust flats, known raider territory) | The cargo is a live captive creature intended for an arena — it may break free | Coins (negotiable, half up front) + caravan contacts |

---

## Combining the Tables

For a richer session-prep experience, the GM can combine all three tables in a single scene. For example, during a night at a caravansary:

1. **Roll once on the Rumor table** — gives the party a vague lead they can pursue later.
2. **Check the notice board (Quest Hook table)** — provides a structured objective with a public reward.
3. **An NPC approaches (Job table)** — offers a direct, personal commission.

This gives the party three potential adventures to choose from, each with a different level of information and commitment.

### Mixing Categories at Different Tiers

The GM may roll different categories at different tier brackets to create variety. A Level 5 party might receive:

- A **Local rumor** (Tier 1–2) that seems trivial but leads to a larger discovery.
- A **Provincial quest hook** (Tier 5–6) matching their current power level.
- A **Regional job** (Tier 3–4) that feels manageable but pays below their usual rate — perhaps with a moral incentive.

---

## Reward Guidance

### Coin Rewards by Tier

Use the tier bracket table above to set the base coin reward. The following modifiers adjust the payout:

| Modifier | Adjustment | Example |
|----------|------------|---------|
| Time pressure | +25% coins | "Must be done before the new moon" |
| Moral complexity | +0 coins, +reputation or favour | "The target is sympathetic" |
| High danger | +50% coins | "Nobody else has survived this" |
| Patron is wealthy | +25% coins | Noble house, major guild |
| Patron is desperate | +50% coins, risk of non-payment | "I'll pay anything — but I may not survive to pay" |
| Discreet work | +25% coins | "No one can know I hired you" |

### Non-Coin Rewards

Not every task pays in coins. Alternative rewards keep the economy varied:

- **Favours:** Future assistance from the patron (information, access, political cover).
- **Reputation:** Standing with a faction, guild, or settlement — unlocks better opportunities later.
- **Items:** Equipment, alchemical supplies, rare materials, or magic items (use the treasure-quality table to set value).
- **Information:** Maps, intelligence, lore, or contacts that open new adventures.
- **Safe haven:** A place to rest, resupply, or hide without cost.

---

## Expanding the Tables

### Adding New Entries

Each table uses a d12, but there is no mechanical dependency on exactly 12 entries. To add entries:

1. Write a new row following the field structure (Hook, Task, Location, Complication, Reward Type).
2. Append it to the table.
3. If the table exceeds 12 entries, switch to a d20 and fill the remaining slots, or organise entries into themed sub-tables (e.g., "Urban Rumors" vs. "Wilderness Rumors").

### Creating Themed Sub-Tables

For variety, GMs or contributors can create sub-tables scoped to a specific setting element:

- **By environment:** Desert, coastal, mountain, urban, subterranean.
- **By faction:** Temple jobs, guild contracts, military commissions, criminal underworld.
- **By tone:** Lighthearted errands, grim investigations, morally grey dilemmas.

A themed sub-table uses the same field structure and can be swapped in for the base table at the GM's discretion.

### Contribution Checklist

When writing a new entry, verify:

- [ ] The **hook** is evocative and can be paraphrased aloud in one or two sentences.
- [ ] The **task** describes a concrete objective (not just "go somewhere").
- [ ] The **location** names a type of site, not a specific named place (so it can be dropped into any campaign).
- [ ] The **complication** adds a twist that creates a meaningful decision or tactical challenge.
- [ ] The **reward type** matches the tier bracket and offers something the party values.
- [ ] The entry avoids references to specific named NPCs, cities, or lore — keep it portable.
- [ ] The tone fits the Bronze Age sword-and-sorcery setting (no firearms, modern idioms, or high-fantasy tropes).

---

## Quick Reference

### Workflow for the GM

1. **Choose or roll discovery context** (d6).
2. **Pick a category**: Rumor, Quest Hook, or Job (or roll d6: 1–2 Rumor, 3–4 Quest Hook, 5–6 Job).
3. **Roll d12** on the chosen table.
4. **Apply the tier bracket** matching the party's level for challenge scope and reward range.
5. **Add flavour**: name NPCs, pick a specific location from your campaign map, and adjust the complication to fit current events.
6. **Set the reward** using the coin range from the tier bracket, modified as needed.

### Summary Table

| Step | Action | Tool |
|------|--------|------|
| 1 | Frame the scene | Discovery Context (d6) |
| 2 | Select category | GM choice or d6 |
| 3 | Generate content | Category Table (d12) |
| 4 | Scale to party | Tier Bracket table |
| 5 | Personalise | GM narration |
| 6 | Set reward | Reward Guidance + Treasure tables |

---

## Play Example

> **Setup:** The party (Level 4) arrives at a trade town after a long journey. During their evening at an inn, the GM uses the system to seed the next session.
>
> **Rumor (d12 → 4):** A sailor mentions a reef of black coral that sings at low tide, and a shipwreck nearby. The GM applies Tier 3–4 (Regional): the reef is a two-day sail from port, and the wreck may hold 100–750 coins in salvage. The complication — dangerous sea creatures at low tide — means combat against Tier 3–4 creatures.
>
> **Quest Hook (d12 → 3):** A notice at the harbourmaster's office describes livestock disappearances in a marshy village upriver. Missing hunters add urgency. At Tier 3–4, the marsh creature is a serious threat, and the reward is 100–750 coins plus supplies from the grateful village.
>
> **Job (d12 → 4):** A guild alchemist at the inn approaches the party directly. She needs fresh venom sacs from pit asps in a nearby gorge. At Tier 3–4, the asps are dangerous beasts, and she offers 200 coins plus a batch of alchemical potions — useful for the party's next adventure.
>
> **Result:** The party now has three leads. They decide the alchemist's job is quick and profitable, plan to tackle the marsh creature quest next, and file the coral reef rumor away for a future sailing adventure.
