# Random Rumors, Quest Hooks & Jobs — Game Design Analysis

A modular, seed-based system for generating random **rumors**, **quest hooks**, and **adventuring jobs**. The GM rolls dice, reads fragments from d66 tables, and plugs them into a sentence seed that can be fleshed out with campaign-specific details.

> **Status:** Design analysis — not yet incorporated into official rules.

---

## Design Goals

- **Roll-and-read:** The GM rolls dice, looks up fragments in d66 grids, and fills in a sentence template — no sequential lookups.
- **Sentence seeds:** Each category has a template sentence with blanks. Dice results fill those blanks.
- **Abstract fragments:** Entries name vague *types* — never specific names, places, or geography. The GM maps each fragment to a concrete detail from their setting.
- **Level-scaled rewards:** Coin and treasure values scale with party level using the existing treasure-quality brackets.
- **Easy to extend:** Adding entries means filling cells in a d66 grid or swapping in a themed variant table.

---

## How It Works

### 1. Pick a Category

Choose one or roll d6:

| d6 | Category |
|----|----------|
| 1–2 | Rumor |
| 3–4 | Quest Hook |
| 5–6 | Job |

### 2. Roll the Dice

Each blank in the sentence seed requires one **d66 roll**: roll 2d6, the first die picks the **row**, the second picks the **column**. Roll all pairs at once using dice of different colours or sizes.

| Category | Blanks | Dice Needed |
|----------|--------|-------------|
| Rumor | 4 | 8d6 (4 pairs) |
| Quest Hook | 5 | 10d6 (5 pairs) |
| Job | 6 | 12d6 (6 pairs) |

### 3. Read the Sentence Seed

Look up each d66 result in the matching table and plug the fragments into the template sentence.

### 4. Add Campaign Detail

Replace abstract fragments with specific names, creatures, and places from the setting. Use the level-scaling table to set scope and reward.

---

## Level Scaling

| Party Level | Scope | Coin Reward | Treasure Quality | Travel Time |
|-------------|-------|-------------|------------------|-------------|
| 1–2 | Local (village, neighbourhood) | 25–250 | Q1–Q3 | Hours |
| 3–4 | Regional (district, trade route) | 100–750 | Q2–Q4 | Days |
| 5–6 | Provincial (city-state, province) | 250–2,500 | Q3–Q5 | A week |
| 7–8 | National (kingdom, major faction) | 750–7,500 | Q4–Q6 | Weeks |
| 9–10 | Legendary (world-shaping, mythic) | 2,500–25,000 | Q5–Q7 | A season |

The GM picks the row matching the party's level. A "creature" at Local scope is a lone predator; at Legendary scope it is a mythic terror.

---

## Shared Tables

These tables are used by more than one category. Roll on them whenever the sentence seed calls for that field.

### Location (d66)

*Used by: Rumors, Quest Hooks, Jobs.*

| | **1** | **2** | **3** | **4** | **5** | **6** |
|---|---|---|---|---|---|---|
| **1** | crumbling ruins | a narrow pass | a low-lying hollow | an old tower | a worked-out dig | disputed ground |
| **2** | ancient tunnels | a trade path | exposed foundations | a barren expanse | a water's edge | a stone monument |
| **3** | a place of worship | an overgrown enclosure | a high ridge | a deep ravine | a crossroads | a walled compound |
| **4** | a dry basin | underground chambers | the settlement edge | a natural cave | a hilltop | old fortifications |
| **5** | a contested crossing | a sheltered hollow | a gathering place | the boundary stones | a sunken structure | broken ground |
| **6** | a burial site | a waypoint | a collapsed passage | a hidden valley | a flooded depth | the open wilds |

### Task (d66)

*Used by: Quest Hooks, Jobs.*

| | **1** | **2** | **3** | **4** | **5** | **6** |
|---|---|---|---|---|---|---|
| **1** | track down | investigate | recover | escort safely | explore | defend |
| **2** | capture alive | deliver through | clear out | negotiate with | rescue | scout ahead of |
| **3** | secure | drive off | contain | search for | guard | survey |
| **4** | locate | intercept | purify | dismantle | transport | appease |
| **5** | break through to | map out | harvest from | sabotage | reclaim | silence |
| **6** | seal away | lure from | free | uncover | repel | retrieve |

### Subject (d66)

*Used by: Quest Hooks, Jobs.*

| | **1** | **2** | **3** | **4** | **5** | **6** |
|---|---|---|---|---|---|---|
| **1** | a dangerous creature | a band of raiders | a stolen relic | a missing person | a cursed object | a rival faction |
| **2** | a spreading blight | restless dead | hidden contraband | a collapsed passage | a rogue construct | a hostile spirit |
| **3** | a sacred artefact | a fugitive | poisoned supplies | armed strangers | an ancient seal | a wounded survivor |
| **4** | lost goods | forbidden materials | a territorial beast | a desecrated site | trapped survivors | a hidden cache |
| **5** | a sealed chamber | an infestation | a foreign agent | plague carriers | a broken ward | an occupied ruin |
| **6** | a blood feud | a ritual site | mysterious remains | a cornered outlaw | displaced people | a corrupted guardian |

### Complication (d66)

*Used by: Quest Hooks, Jobs.*

| | **1** | **2** | **3** | **4** | **5** | **6** |
|---|---|---|---|---|---|---|
| **1** | a rival seeks it too | the threat is worse than told | the ground is treacherous | a spy aids the enemy | the foe may be justified | old traps still function |
| **2** | time is running out | local powers refuse aid | the season is harsh | success angers the powerful | innocents are at risk | it masks something larger |
| **3** | the employer is dishonest | the site is already claimed | an ally turns coat | a sacred law bars entry | the target is defended | the route is watched |
| **4** | payment may not come | the object is dangerous | a blood debt intervenes | no witnesses allowed | a rite is needed first | multiple factions involved |
| **5** | the true enemy is hidden | deception is required | the subject resists | the area is accursed | aid comes with a price | a powerful figure is tied to it |
| **6** | the law forbids it | failure brings ruin | old loyalties conflict | the employer has enemies | the truth is unpleasant | another task clashes |

### Reward (d66)

*Used by: Quest Hooks, Jobs.*

| | **1** | **2** | **3** | **4** | **5** | **6** |
|---|---|---|---|---|---|---|
| **1** | coin payment | coin plus salvage | a share of findings | supplies or materials | a favour owed | standing with a group |
| **2** | legal protection | a crafted item | access to records | safe lodging | a trade claim | a rare-material item |
| **3** | coin plus remedies | passage or transport | a debt forgiven | a letter of introduction | a land grant | a trained animal |
| **4** | coin per task done | an old weapon | restricted knowledge | a shrine's blessing | a seat at council | a buried secret revealed |
| **5** | coin up front | an apprenticeship | a route or map | a title or rank | livestock or herd | a protective ward |
| **6** | a patron's protection | a name cleared | workshop access | a peace accord | a captive released | a relic fragment |

---

## Rumors

Rumors are vague hearsay — unverified, possibly exaggerated, and open to interpretation. They seed player-driven exploration.

### Sentence Seed

> *"[Source] says that [subject] near [location]. They say it's because of [cause]."*

**Roll 4 × d66** (8d6 in 4 pairs) — one d66 each for **Source**, **Rumor Subject**, **Location** (shared), and **Cause**.

### Source (d66)

| | **1** | **2** | **3** | **4** | **5** | **6** |
|---|---|---|---|---|---|---|
| **1** | a passing trader | a local herder | a drunk labourer | a wandering beggar | a caravan guard | an elderly scribe |
| **2** | a local fisher | a displaced villager | a temple servant | a child at play | a retired warrior | a foreign wanderer |
| **3** | a road warden | a midwife | a potter at market | a ditch digger | a night watchman | a grain merchant |
| **4** | a stable hand | a weaver | a travelling healer | a refugee elder | a messenger | a quarry worker |
| **5** | a tanner | a street sweeper | a well keeper | a wandering priest | a hunter | a field worker |
| **6** | a ferryman | a grave keeper | a bread seller | a travelling bard | a camp follower | a returning scout |

### Rumor Subject (d66)

*What was observed or experienced.*

| | **1** | **2** | **3** | **4** | **5** | **6** |
|---|---|---|---|---|---|---|
| **1** | strange lights | eerie sounds | animals fleeing | people vanishing | tainted water | an old marker uncovered |
| **2** | armed strangers | a broken seal | missing goods | a spreading sickness | trembling ground | ghostly figures |
| **3** | withering plants | a foul smell | smoke from nowhere | tracks of something large | a collapsed wall | chanting at night |
| **4** | blood on the ground | a dry well | a blocked path | an opened grave | howling at dusk | a cracked idol |
| **5** | a changed landmark | a silent herd | a dark stain spreading | a new crack in the earth | shifting stones | a dead tree bleeding sap |
| **6** | livestock born wrong | burnt ground | a cold spot | a hum from below | unseasonal fog | a ring of scorched earth |

### Cause (d66)

*The suspected explanation.*

| | **1** | **2** | **3** | **4** | **5** | **6** |
|---|---|---|---|---|---|---|
| **1** | a bold predator | grave robbers | a lingering curse | a secret cult | bandits in hiding | restless dead |
| **2** | smugglers | a failing ward | a local feud | poison from below | an outsider's meddling | something unearthed |
| **3** | a rogue sorcerer | old traps waking | a broken oath | a polluted offering | a blighted spirit | a collapsing ruin |
| **4** | a starving pack | a jealous rival | foul alchemy | an escaped creature | a shifting boundary | a vengeful ancestor |
| **5** | forbidden rites | a tainted spring | an old debt called in | a cracked seal stone | a wounded beast | a desecrated shrine |
| **6** | a territorial spirit | a hidden camp | foreign agents | stolen relics | a withered blessing | something waking below |

> **Reliability (optional, hidden d6):** On 1–2 the rumor is mostly false, on 3–5 partially true, on 6 completely accurate.

### Rumor Example

> **Rolls:** Source 3-2 (a midwife), Rumor Subject 1-4 (people vanishing), Location 1-3 (a low-lying hollow), Cause 1-1 (a bold predator).
>
> **Seed:** *"A midwife says that people have been vanishing near a low-lying hollow. They say it's because of a bold predator."*
>
> **GM adds detail (Level 3, Regional):** The hollow is a seasonal flood basin a day's ride east. A pack of predators has grown aggressive since their territory shifted. Villagers offer 150 coins for proof the threat is dealt with.

---

## Quest Hooks

Quest hooks are confirmed problems posted publicly — on a notice board, announced by a crier, or declared at a temple.

### Sentence Seed

> *"Wanted: [task] [subject] at [location]. Warning: [complication]. Reward: [reward]."*

**Roll 5 × d66** (10d6 in 5 pairs) — one d66 each for **Task** (shared), **Subject** (shared), **Location** (shared), **Complication** (shared), and **Reward** (shared).

### Quest Hook Example

> **Rolls:** Task 1-1 (track down), Subject 1-1 (a dangerous creature), Location 5-3 (a gathering place), Complication 1-4 (a spy aids the enemy), Reward 1-1 (coin payment).
>
> **Seed:** *"Wanted: track down a dangerous creature at a gathering place. Warning: a spy aids the enemy. Reward: coin payment."*
>
> **GM adds detail (Level 5, Provincial):** A monstrous predator has been attacking a seasonal market crossroads. Someone in the merchant camp is luring the beast to rival stalls. The provincial governor posts a 500-coin bounty.

---

## Jobs

Jobs are direct commissions from a patron. They include an employer, a specific task, and negotiated pay.

### Sentence Seed

> *"I, [patron], want you to [task] [subject] at [location], but [complication]. On success, I offer [reward]."*

**Roll 6 × d66** (12d6 in 6 pairs) — one d66 each for **Patron**, **Task** (shared), **Subject** (shared), **Location** (shared), **Complication** (shared), and **Reward** (shared).

### Patron (d66)

| | **1** | **2** | **3** | **4** | **5** | **6** |
|---|---|---|---|---|---|---|
| **1** | a wealthy trader | a former soldier | a disgraced priest | a guild master | an acting magistrate | a tribal elder |
| **2** | a foreign envoy | a port overseer | a noble's servant | a watch captain | a master artisan | a caravan leader |
| **3** | a widowed land owner | a clan matriarch | a debt collector | a quarry boss | a court scribe | a healer in need |
| **4** | an aging chieftain | a smuggler chief | a temple keeper | a mine foreman | a herding boss | a dispossessed noble |
| **5** | a war veteran | a merchant's heir | a wandering scholar | a frontier warden | a tax collector | a brew master |
| **6** | a council elder | a grieving parent | a spy master | a property holder | an estate overseer | a besieged commander |

### Job Example

> **Rolls:** Patron 1-4 (a guild master), Task 1-3 (recover), Subject 4-2 (forbidden materials), Location 2-1 (ancient tunnels), Complication 3-1 (the employer is dishonest), Reward 1-1 (coin payment).
>
> **Seed:** *"I, a guild master, want you to recover forbidden materials at ancient tunnels, but the employer is dishonest. On success, I offer coin payment."*
>
> **GM adds detail (Level 4, Regional):** An alchemist guild elder hires the party to retrieve reagents from tunnels beneath a collapsed workshop. She claims they are hers by right — in truth, they were confiscated by the city for being dangerous. She offers 300 coins but will deny involvement if the party is caught.

---

## Generating Multiple Leads

During a scene — an evening at an inn, a visit to the town square, or a meeting with a contact — the GM can generate several leads at once.

**Quick method:** Roll one rumor, one quest hook, and one job. The party gets three leads with different levels of detail and commitment, and picks what interests them.

The GM may roll different categories at different tier brackets for variety:

- A **Local rumor** that seems minor but hints at something larger.
- A **Provincial quest hook** matching the party's power level.
- A **Regional job** that pays less but has a moral pull.

---

## Reward Modifiers

After assembling the seed, set the coin reward from the level-scaling table and adjust:

| Modifier | Adjustment |
|----------|------------|
| Time pressure | +25% |
| High danger | +50% |
| Wealthy patron | +25% |
| Desperate patron | +50%, risk of non-payment |
| Discreet work | +25% |
| Moral complexity | +0 coin, add reputation or favour |

---

## Expanding the Tables

Each table is a d66 grid (36 entries). To add content:

1. Create a **themed variant** of any table — scoped to an environment, faction, or tone — and swap it in at the GM's discretion.
2. New variant tables use the same d66 grid format and follow the entry guidelines below.

### Entry Guidelines

- Name *types*, never specific names or places.
- Keep entries to a short phrase (2–5 words).
- Avoid geographic assumptions — "a water's edge" not "the harbour."
- Ensure any entry works when combined with any entry from another table.
- Match the ancient-world sword-and-sorcery tone.

---

## Quick Reference

### Dice Summary

| Category | Blanks | Dice | Tables Used |
|----------|--------|------|-------------|
| **Rumor** | 4 | 8d6 (4 × d66) | Source, Rumor Subject, Location, Cause |
| **Quest Hook** | 5 | 10d6 (5 × d66) | Task, Subject, Location, Complication, Reward |
| **Job** | 6 | 12d6 (6 × d66) | Patron, Task, Subject, Location, Complication, Reward |

### Sentence Seeds

- **Rumor:** *"[Source] says [subject] near [location]. They say it's because of [cause]."*
- **Quest Hook:** *"Wanted: [task] [subject] at [location]. Warning: [complication]. Reward: [reward]."*
- **Job:** *"I, [patron], want you to [task] [subject] at [location], but [complication]. On success, I offer [reward]."*

### Procedure

1. Pick or roll a category (d6).
2. For each blank, roll d66 (2d6: first = row, second = column).
3. Read the fragments and plug them into the sentence seed.
4. Apply level scaling for scope, enemy strength, and reward.
5. Replace abstract types with campaign-specific details.
