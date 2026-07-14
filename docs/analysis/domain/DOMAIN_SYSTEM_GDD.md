# Build Your Domain — Game Design Document

> **Scope:** A complete opt-in subsystem for founding, expanding, and running a party-owned domain (stronghold, hideout, temple, trade house, or secret organization) during downtime. Covers domain stats, facilities, staff NPCs, agent missions, patrons, and secrecy pressure.
>
> **Status:** Design draft for playtest. Not yet published to `/docs/`.
>
> **Companion files:**
> [Facility Catalog](facility-catalog.md) | [Missions & Agents](missions-and-agents.md) | [Domain NPCs & Staff](domain-npcs.md) | [Worked Example: Occult Organization](occult-organization-example.md)
>
> **References:** [Downtime Overview](../../06-scenes/04-downtime/00-overview.md) | [Downtime System Analysis](../downtime-system-analysis.md) | [Crafting Professions](../../06-scenes/05-crafting-professions.md) | [NPCs and Relationships](../../02-adventurers/05-npc-relations.md) | [Item Quality & Cost](../../04-equipment/01-items.md) | [Magic Item Cost Tables](../../04-equipment/07-magic-items/cost-tables.md)

---

## 1. Vision & Design Goals

### The Fantasy

The party stops being guests in other people's settlements and drives a stake into the world. A fortified camp in the borderlands, a smugglers' den beneath a river port, a restored shrine on a holy hill, a secret society operating from a disgraced noble's estate. The domain grows between adventures the way the hub camp grows in roguelike and hunting games: each return home shows new walls, new faces, new services, and new reach.

### Design Goals

1. **Easy procedure, deep menu.** One new weekly step (the Domain Turn) and a catalog of pre-built facilities, staff seats, and missions with clear mechanics. Players learn the loop in one downtime and then customize endlessly.
2. **A real coin sink.** Domains absorb the surplus wealth the treasure economy produces at mid and high levels, with meaningful purchases from 250 to 150,000+ coins.
3. **Every archetype has a home.** Each facility category and staff seat maps to character fantasies: the champion drills recruits, the sorcerer builds a sanctum, the rogue runs informants, the tamer fills the stables. See the coverage matrix in §17.
4. **The world remembers.** The domain gives the party a footprint that factions, patrons, and enemies react to. It plugs directly into the faction agenda dice timers and settlement events from the downtime system.
5. **Strictly opt-in.** No baseline rule, talent, spell, or treasure budget assumes a domain exists. Groups that skip it lose nothing but the module itself.

### Non-Goals

- **No kingdom simulator.** No tax spreadsheets, population counts, or hex management. Everything abstracts into three or four stat dice and a weekly check.
- **No profit engine.** The life of an adventurer is high risk and high reward, and no mundane commerce comes near it. Every income stream in this module is capped so that a fully worked domain roughly pays its own way and no more. Coins flow from adventures into the domain, never the reverse (see the audit in §16).
- **No vertical power progression.** Domains never grant permanent combat bonuses. The power ceiling is light, bounded consumables (Provisions, §12) plus economic and downtime access.
- **No XP source.** Domain play never awards or accelerates XP. Character progression is untouched.
- **No mandatory engagement.** A party that ignores their domain for months pays upkeep or lets a patron carry it. The domain never punishes absence with destruction unless the GM stages it as story.

---

## 2. System Overview

### The Core Loop

```
ADVENTURE                         DOWNTIME
 earn coins, items, hooks   →      1. Each PC declares a weekly activity
 spend Provisions                     (normal or Domain activity)
 mission outcomes land      →      2. DOMAIN TURN (one per week)
        ↑                             a. Upkeep check (roll Wealth)
        |                             b. Tick timers (construction,
 depart with Provisions,                 missions, patron obligations)
 intel, and new missions    ←         c. Domain event (1d6)
                                   3. Settlement event + faction agendas
                                      (existing downtime procedure)
```

### Procedure Checklists

Use these at the table. Full rules for each step follow in the referenced sections.

**Domain Setup (once, at founding, §4)**

1. Choose the profile (Open or Hidden), the location, and the claim.
2. Pay the seed cost (500 coins) and start the d4 founding timer.
3. When founded: all stats start at d4 (Heat at 0), pick one free Tier 1 facility.
4. Record patrons, if any: stipend grade and a d6 obligation timer each (§14).

**Weekly Domain Turn (each week of downtime, after activities, §7)**

1. **Upkeep check**: roll Wealth vs. TN 8.
2. **Tick timers**: construction, missions, patron obligations. Resolve any at 0.
3. **Exposure check** (Hidden domains with Heat 3+ only, §13).
4. **Domain event**: roll 1d6, then 1d6 on the sub-table (§15).

### What a Domain Is, Mechanically

- A shared party asset tracked on one **Domain Sheet**.
- A **Domain Rank** from 1 to 5 that gates everything else.
- Three **domain stats** as dice steps (d4 to d12): **Wealth**, **Influence**, **Force**. Hidden domains track a fourth stat, **Secrecy**.
- A list of built **Facilities** (from the [Facility Catalog](facility-catalog.md)).
- A roster of **Staff** NPCs filling **Seats** (from [Domain NPCs](domain-npcs.md)).
- Zero or more running **Missions** on dice timers (from [Missions & Agents](missions-and-agents.md)).
- Optional **Patrons** with stipends and obligations (§14).
- For Hidden domains, a **Heat** track from 0 to 6 (§13).

---

## 3. The Domain Sheet

```
DOMAIN: ______________________  Profile: Open / Hidden
Rank: __ (Camp/Outpost/Bastion/Stronghold/Fabled Seat)
Location: ____________________

STATS            die     progress toward next step
  Wealth         d__     ___ / ___
  Influence      d__     ___ / ___
  Force          d__     ___ / ___
  Secrecy        d__     (Hidden domains only)
Heat: 0 1 2 3 4 5 6      (Hidden domains only)

FACILITIES (name, tier, staffed?)     STAFF (name, seat, grade, disposition)
MISSIONS (objective, danger, timer)   PATRONS (stipend, obligation timer)
Treasury: _____ coins                 Disrepair: ___
```

### Domain Profile

Chosen at founding. It can change later through play (a hidden cult goes public, an open keep goes underground).

- **Open.** The domain is publicly known. It interacts with local law, taxes, and politics openly. It does not track Secrecy or Heat. Its Influence stat represents recognized standing.
- **Hidden.** The domain conceals its true nature or its existence entirely. It tracks **Secrecy** as a fourth stat and **Heat** as a pressure track (§13). Its Influence stat represents covert reach such as favors, blackmail, and sympathizers.

---

## 4. Founding a Domain

Founding requires all of the following:

1. **A claim.** A place the party can plausibly hold: granted land, a purchased building, a conquered ruin, a patron's estate. The claim is always established through play or patronage, never bought blind from a menu.
2. **The seed cost.** 500 coins for materials, labor, and first furnishings. A patron can pay part or all of it (§14).
3. **Founding time.** A construction dice timer of **d4** (about 4 weeks, see §5 for how construction timers tick).

When the timer completes, the domain exists at **Rank 1** with all stats at **d4** (including Secrecy for Hidden domains), an empty facility list, and one free **Tier 1 facility** of the party's choice included in the seed cost.

> A party clears a bandit-held watchtower in the hills. They claim it, spend 500 coins hauling in supplies and masons, and four weeks later the tower stands as their Rank 1 Camp with a Common Hall as its first facility.

---

## 5. Domain Ranks & Advancement

Domain ranks mirror the four settlement ranks, then add a fifth step beyond them. A Rank 5 domain has no settlement parallel. It is a wonder of the age, a seat of power that rivals city-states and passes into legend, matching the mortal pinnacle that Rank 5 spells and Grandmaster skills represent.

| Rank | Name | Settlement Parallel | Upgrade Cost | Construction Timer | Facility Slots | Max Facility Tier | Max Stat Die |
|------|------|--------------------|--------------|--------------------|----------------|-------------------|--------------|
| 1 | **Camp** | Hamlet | 500 (founding) | d4 | 4 | 1 | d4 |
| 2 | **Outpost** | Village | 2,500 | d4 | 8 | 2 | d6 |
| 3 | **Bastion** | Town | 10,000 | d6 | 12 | 3 | d8 |
| 4 | **Stronghold** | City | 40,000 | d6 | 16 | 4 | d10 |
| 5 | **Fabled Seat** | beyond any settlement | 150,000 | d8 | 20 | 5 | d12 |

**Upgrading rank** requires all of the following:

1. Pay the upgrade cost (patrons may contribute).
2. Have at least **3 facilities per current rank** already built (3 for Rank 1 to 2, 6 for Rank 2 to 3, 9 for Rank 3 to 4, 12 for Rank 4 to 5).
3. Start the construction dice timer. It ticks down by 1 each Domain Turn. The **Build** activity (§8) ticks it faster.
4. Rank 5 additionally requires a story achievement the GM stages as an adventure arc, such as securing a legendary builder, a divine sanction, or a treaty with a city-state.

While a rank upgrade is under construction, the domain functions normally at its current rank.

**Facility slots** cap how many facilities the domain holds. Demolishing a facility frees its slot and refunds nothing.

### Physical Scale

Domains use the game's abstract spatial language, never measured dimensions: **areas** (the combat and dungeon zone unit), the standard **distance bands**, and the **narrative distances**. Two rules carry all of it:

1. **Built ground.** The domain's built ground covers about as many areas as it has facility slots. The slot cap is the spatial budget made literal: a Rank 2 Outpost is roughly 8 areas of walls, yards, and rooms. When a raid, infiltration, or chase happens at home, sketch those areas as the combat map, the same way any dungeon or settlement scene works.
2. **Bounds.** Each rank's full grounds (built ground plus fields, courtyards, and approaches) span a distance band:

| Rank | Bounds (across) | Reads As |
|------|-----------------|----------|
| 1 | Medium to long distance | A single large house, tower, or walled yard. One shout reaches everyone |
| 2 | Very long distance | A compound of several buildings around a court. Crossing it is a brisk minute |
| 3 | Extreme distance | A fortified complex or hidden warren with its own inner districts |
| 4 | Approaching a thousand paces | A true stronghold with its own skyline, or a spread of connected sites |
| 5 | A thousand paces | The domain covers ground like a town quarter or a fort and its surroundings, the same measure the narrative distances use |

Facilities have a default **footprint** by tier, described in the [Facility Catalog](facility-catalog.md): Tier 1 facilities are **compact** (a room, cellar, or corner sharing an area), Tier 2 and 3 are **standard** (their own building, hall, or yard of about 1 area), Tier 4 and 5 are **sprawling** (2 to 3 areas with wings and outbuildings). Footprints are description, not currency: the slot cap already does the accounting, the footprint tells everyone what they see and where they can hide.

> **Design Note (two progress models):** The game tracks multi-step progress two ways. **Challenge dice** (crafting, travel) advance by roll results: someone works, so progress depends on skill. **Dice timers** (faction agendas, and everything in this module: construction, missions, obligations) tick down 1 per week automatically: the world moves whether or not the party watches. Domains use dice timers because walls rise and agents travel while the party is off adventuring. The **Build** activity (§8) is the deliberate bridge: spend your week on site and your roll adds ticks on top of the automatic one.

> **Design Note:** The cost curve (500 / 2,500 / 10,000 / 40,000 / 150,000) tracks the item Quality economy: Rank 3 costs about one Q5 item, Rank 4 about one Q6 item, Rank 5 beyond any single item. A group pooling treasure reaches Rank 3 in the mid game and Rank 4 late. Rank 5 is intentionally out of reach without a patron, a kingdom's gratitude, or a hoard, exactly like the fifth rank of everything else in the game.

---

## 6. Domain Stats & Checks

### The Stats

Each stat is a die from **d4 to d12**, using the same dice steps as attributes.

- **Wealth.** The domain's economic engine: stores, trade contacts, income streams. Rolled for upkeep and commerce missions.
- **Influence.** The domain's reach over people outside it. For Open domains this is standing, legitimacy, and political weight. For Hidden domains it is favors, sympathizers, and quiet leverage. Rolled for social and political missions.
- **Force.** The domain's personnel: guards, laborers, agents, initiates. Rolled for defense and for most missions. Force also sets the **agent pool** for parallel missions (see [Missions & Agents](missions-and-agents.md)).
- **Secrecy** (Hidden domains only). How well the domain stays concealed. Rolled for covert missions and for Exposure checks (§13).

### Domain Checks

A **domain check** rolls the stat die + 1d6 vs. a **Target Number**, using the normal Difficulty ladder and Success Levels (weak, strong, critical). Facilities and staff seats grant boons or flat bonuses as listed, to a maximum of **+2 total flat bonus** on any domain check.

> The domain rolls its upkeep check with Wealth d8. The dice show 5 and 4 for a total of 9 vs. TN 8, a weak success. The week's costs are covered.

### Growing a Stat

Stats grow through **progress**. When a stat's progress total reaches the threshold for the next die step, the stat steps up and progress resets to 0. A stat can never exceed the domain rank's maximum die.

| Step Up | Progress Required | Buy Progress (coins each) |
|---------|-------------------|---------------------------|
| d4 → d6 | 2 | 100 |
| d6 → d8 | 3 | 500 |
| d8 → d10 | 4 | 2,500 |
| d10 → d12 | 5 | 10,000 |

Progress comes from three sources:

1. **Domain activities** (§8). The dedicated activity for each stat grants 1 progress on a success, 2 on a critical.
2. **Mission rewards.** Many missions grant 1 or 2 progress to a fitting stat (see [Missions & Agents](missions-and-agents.md)).
3. **Buying progress.** Spend coins per the table above, once per stat per week. This represents hiring, gifts, bribes, stockpiling, and infrastructure.

### Losing a Stat Step

Domain events, mission blunders, and Exposure results can inflict **setbacks**. A setback removes progress first. If the stat has no progress, it steps down one die instead (minimum d4).

### What the Wealth Die Represents

The Wealth die is not the treasury. It is the scale of everything the domain owns and moves: stores, stock, standing contracts, credit, and income streams. Use these bands to judge what the domain can plausibly do in fiction:

| Wealth | Working Assets | Weekly Turnover | Reads As |
|--------|----------------|-----------------|----------|
| d4 | up to ~500 coins | tens of coins | A household's stores. One strongbox, counted often |
| d6 | ~2,500 coins | around a hundred | A prosperous farmstead or a busy shop |
| d8 | ~10,000 coins | several hundred | A trading house with caravan interests |
| d10 | ~50,000 coins | around a thousand | A merchant lord. A town's commerce flows through these books |
| d12 | 150,000+ coins | thousands | City-state magnitude. Granaries, fleets, and debts owed by the mighty |

Buying progress costs less than the assets the next step represents because bought progress is seed investment that grows under management, not the assets purchased whole.

Three rules connect big money movements to the die:

- **Windfall investment.** When a single sum enters the treasury that equals or exceeds the full remaining progress cost of Wealth's next step (a hoard, a patron's founding gift, a ransom), the party may convert it into that step immediately, bypassing the once-per-week limit on buying progress. The rank cap still applies. What the windfall cannot buy stays in the treasury.
- **Strain.** When the domain must cover a cost it cannot refuse and the treasury and party cannot or will not pay it in coins, the Wealth stat takes 1 setback instead: assets are sold and credit is burned to settle the debt. Strain is a way of paying, not an extra punishment. Effects that already price refusal (blackmail's Heat increase, unpaid upkeep's Disrepair) use their own listed consequence, never strain on top.
- **Liquidation.** Once per downtime phase, the party may deliberately step Wealth down one die and add coins to the treasury: 100 (d6 to d4), 750 (d8 to d6), 5,000 (d10 to d8), or 25,000 (d12 to d10). A fire sale recovers half of what the step cost to build, and the proceeds are treasury coins, bound by the treasury rules below. This is how a desperate domain funds a ransom, a rebuild, or a war it cannot otherwise afford.

The other stats stay narrative-scaled: **Force** approximates capable people (d4 a dozen, d6 around twenty five, d8 around sixty, d10 around a hundred fifty, d12 several hundred), while Influence and Secrecy describe reach and concealment with no unit at all.

### Wealth, the Treasury, and the Party's Coins

Three pools of money exist, and they are not the same:

- The **Wealth die** is the abstract engine: income streams, stores, standing credit, and assets. It is not a coin count and never converts into one.
- The **treasury** is the domain's working coin, tracked on the domain sheet. Everything the domain earns (upkeep surplus, facility income, mission rewards, Trade Venture profits, dues) lands here.
- The **party's coins** are personal money on character sheets, earned by adventuring.

**Flow rules:**

1. **In is free.** The party can pay coins into the treasury at any time: funding construction, covering upkeep, buying stat progress. This is the normal direction and the intended coin sink.
2. **The treasury spends only on the domain.** Upkeep, wages, construction, add-ons, stat progress, mission outfitting, activity expenses of domain activities, repairs, bribes, and Lay Low costs.
3. **No withdrawals.** The treasury never converts into personal coins in standard play. The domain's coin is working capital: granaries, wage chests, promised payments. Pulling it out starves the engine, and the followers watching their wages leave in an adventurer's purse notice.
4. **Extraction is goods and services.** The party takes value out of the domain in kind, not in coin. The treasury may pay the material costs, weekly crafting costs, and commission fees of items made at the domain **for the party's own use**, and the expenses of services the domain provides them (Provisions, staff services, feasts, on-site activities). The domain pays its people in bread and shelter, and its founders in swords, salves, and rites.
5. **Emergency levy.** Once per downtime phase, the party may pull up to 100 × domain rank coins from the treasury as personal funds. The books feel it: the Wealth stat loses 1 progress (a setback if it has none) and one staff NPC's disposition worsens by 1 step. An escape valve with a price, not an income stream.

> **Design Note:** This is what keeps the §16 audit honest across a whole campaign. Domain income can never launder into adventurer buying power as coins. It reaches the party only as things the domain itself makes and does, which is exactly the fantasy: the stronghold does not pay you, it equips you.

---

## 7. The Domain Turn

Once the party owns a domain, add one step to the weekly downtime procedure, after all adventurers resolve their activities and before the settlement event roll.

**Domain Turn (each week of downtime)**

1. **Upkeep check.** Roll a Wealth check vs. TN 8.
   - **Blunder.** Pay double upkeep and roll on the Domain Complication table (§15).
   - **Failure.** Pay this week's upkeep from party coins or the treasury.
   - **Weak.** Upkeep is covered.
   - **Strong.** Upkeep is covered and the treasury gains surplus equal to half the upkeep.
   - **Critical.** Upkeep is covered and the treasury gains surplus equal to the upkeep.
2. **Tick timers.** Reduce every active construction timer, mission timer, and patron obligation timer by 1. Resolve any timer that reaches 0.
3. **Exposure check.** Hidden domains with Heat 3 or higher only (§13).
4. **Domain event.** Roll 1d6 on the Domain Event table (§15).

| Rank | Weekly Upkeep |
|------|---------------|
| 1 | 25 coins |
| 2 | 50 coins |
| 3 | 100 coins |
| 4 | 250 coins |
| 5 | 500 coins |

**Unpaid upkeep.** If the party cannot or will not pay, the domain gains 1 **Disrepair**. Each Disrepair imposes +1 bane on all domain checks. At 3 Disrepair, one facility (GM's choice from a d6 roll among built facilities) becomes non-functional until repaired. Remove Disrepair with the Oversee activity or by paying triple the missed upkeep.

**Absent parties.** If the party is away adventuring, no Domain Turns occur. On their return, resolve one catch-up Domain Turn per full month away (maximum 3), in order. A patron stipend (§14) can cover upkeep automatically during absences. This keeps the domain opt-in: ignoring it costs coins, not catastrophe.

> **Design Note:** The Domain Turn adds about two rolls and a few ticks per week, on top of the existing downtime procedure. The upkeep check is the heartbeat: it makes Wealth feel like an engine, creates weekly texture (surplus weeks, crisis weeks), and gives the Steward seat and Counting House facility something to modify.

---

## 8. Domain Activities

These are new weekly downtime activities. Each requires an established domain. Any adventurer can take them, and multiple adventurers can take domain activities in the same week. All existing downtime activities remain available and several of them improve inside a well-built domain (facilities let the party Recover, Research, Craft, or Provide Offering on site, see the [Facility Catalog](facility-catalog.md)).

Domain activities share one outcome frame, the same structure as the travel roles. Each activity lists three **bonuses** and two **consequences**:

| Success Level | Effect |
| --- | --- |
| Blunder | Resolve both consequences |
| Failure | Choose one consequence |
| Weak Success | Choose one bonus |
| Strong Success | Choose two bonuses |
| Critical Success | Resolve all three bonuses |

A bonus marked *(repeatable)* may be chosen more than once by the same roll.

### Oversee the Domain

| Min. Domain Rank | Requirements | Expenses |
| --- | --- | --- |
| 1 | — | — |

You spend the week managing stores, settling disputes, and inspecting works. Roll Mind or Spirit + Education or Influence vs. medium Difficulty (TN 8).

**Bonuses:**

- Set things right (remove 1 Disrepair)
- Tighten the books (+1 boon on this week's upkeep check)
- Prepare stores (ready 1 additional Provision for the next departure, §12)

**Consequences:**

- Stretched thin (gain 1 Lingering Fatigue)
- Meddling backfires (roll on the Domain Complication table)

### Recruit Followers

| Min. Domain Rank | Requirements | Expenses |
| --- | --- | --- |
| 1 | — | 50 coins/week |

You seek out laborers, guards, or initiates and bring them into the fold. Roll Spirit + Influence or Streetwise vs. medium Difficulty (TN 8).

**Bonuses:**

- New hands (gain 1 progress toward **Force**) *(repeatable)*
- Word from below (gain one rumor, use the Quest Hooks random tables)
- Dues and gifts (the treasury gains 25 coins)

**Consequences:**

- Wrong crowd (roll on the Domain Complication table)
- Loose talk (Hidden domains: increase Heat by 1. Open domains: a new NPC learns more about the domain than intended and starts at Suspicious, roll on the NPC Role table)

### Extend Influence

| Min. Domain Rank | Requirements | Expenses |
| --- | --- | --- |
| 1 | — | 50 coins/week |

You court neighbors, officials, or sympathizers on the domain's behalf. Roll Spirit or Mind + Influence or Streetwise vs. medium Difficulty (TN 8).

**Bonuses:**

- Growing reach (gain 1 progress toward **Influence**) *(repeatable)*
- Well connected (establish or improve one NPC relationship related to the domain by 1 disposition step, new NPCs start at Indifferent)
- Favors banked (+1 boon on the party's next Petition/Negotiate or Extend Influence)

**Consequences:**

- Overreach (roll on the Domain Complication table)
- Watchful eyes (Hidden domains: increase Heat by 1. Open domains: one faction's disposition toward the domain worsens by 1 step)

### Trade Venture

| Min. Domain Rank | Requirements | Expenses |
| --- | --- | --- |
| 1 | — | 50 coins/week |

You put the domain's goods, services, or contacts to work for profit. Roll Mind + Streetwise or Education, or a fitting profession skill test, vs. medium Difficulty (TN 8).

**Bonuses:**

- Profitable week (the treasury gains 25 × domain rank coins) *(repeatable)*
- Growing enterprise (gain 1 progress toward **Wealth**)
- Market savvy (+1 boon on the party's next Trade Venture or Haggle)

**Consequences:**

- Bad deal (the treasury loses 2d6 × 10 coins, minimum 0)
- Entanglement (roll on the Domain Complication table)

**Market saturation.** Only the first Trade Venture resolved each week can choose the Profitable week bonus. Further Trade Ventures the same week choose from the other bonuses only. The markets around the domain absorb only so much: honest commerce is a living, not a hoard.

### Build

| Min. Domain Rank | Requirements | Expenses |
| --- | --- | --- |
| 1 | An active construction timer | — |

You direct the work crews yourself. Roll Strength or Mind + Crafting vs. medium Difficulty (TN 8).

**Bonuses:**

- Swift work (tick one construction timer down by 1 additional step this week) *(repeatable)*
- Efficient work (reduce this week's upkeep by half)
- Sound work (+1 boon on the next Build roll)

**Consequences:**

- Site accident (gain 1 Lingering Fatigue)
- Wasted materials (pay 25 × domain rank coins, or gain 1 Disrepair)

### Lay Low

| Min. Domain Rank | Requirements | Expenses |
| --- | --- | --- |
| 1 | Hidden domain with Heat 1+ | 50 coins per current Heat |

You quiet rumors, pay off witnesses, and pull agents back into shadow. Roll a Secrecy domain check vs. medium Difficulty (TN 8). One adventurer's guidance counts: they may add their skill rank in Stealth or Streetwise as a flat bonus (maximum +2).

**Bonuses:**

- Cooled trail (reduce Heat by 1) *(repeatable)*
- Covered tracks (+1 boon on the next Exposure check)
- Deeper shadows (gain 1 progress toward **Secrecy**)

**Consequences:**

- Drew notice (increase Heat by 1)
- Costly silence (pay an additional 50 coins per current Heat)

### Direct a Mission

| Min. Domain Rank | Requirements | Expenses |
| --- | --- | --- |
| 1 | An active mission | — |

The exception to the shared frame: no weekly roll of its own. You personally plan, brief, and coordinate one active mission. When that mission resolves, roll your own Attribute + Skill fitting the mission objective instead of the domain stat die + 1d6, whichever the party prefers, and the mission roll gains +1 boon. See [Missions & Agents](missions-and-agents.md).

---

## 9. Facilities (Summary)

Facilities are the menu the party builds from, the roguelike hub-camp upgrades. Each facility has a **tier** (1 to 5, requires domain rank ≥ tier), a **cost**, a **construction timer**, a **staffing requirement**, and a concrete benefit. Many facilities form **upgrade chains** (Training Yard → Drill Grounds → War College).

| Tier | Cost | Construction Timer | Benefit Scale |
|------|------|--------------------|---------------|
| 1 | 250 | d4 | Basic services on site |
| 2 | 1,000 | d4 | Full downtime activities on site, first Provisions |
| 3 | 5,000 | d6 | Above-settlement access (Q5 crafting, rare knowledge) |
| 4 | 20,000 | d6 | City-grade or better (Q6 crafting, grand works) |
| 5 | 75,000 | d8 | Legendary, one-of-a-kind capabilities (Q7 crafting) |

The full menu of some 40 facilities across 8 categories (Hearth, War, Arcana, Faith, Shadow, Trade & Craft, Hall, Wilds), including which downtime activities they unlock on site and which Provisions they produce, lives in the **[Facility Catalog](facility-catalog.md)**. The catalog also lists **Add-Ons**: modifications bolted onto an existing facility (a concealed entrance, wards, expanded capacity), the facility-side equivalent of a magic item's special material. For places the catalog does not contain, the catalog closes with a **GM-facing construction kit**: the component pricing grammar the catalog was built from, so custom facilities land on the same power curve. Players interact with it through fiction requests only.

**The magic item pipeline.** The catalog's craft facilities deliberately break the settlement Quality gate, which caps at Q5 in a City. A domain with a Tier 4 Grand Atelier and a Master artificer crafts and commissions Q6 items. A Tier 5 Wonderworks reaches Q7. This is the domain's single biggest draw for veteran parties and its single biggest coin sink, and it stays inside the existing crafting rules (crafter rank, required successes, weekly costs, material costs all unchanged).

---

## 10. Staff & Specialists (Summary)

Staff are named NPCs who live in or serve the domain. The system tracks two layers:

- **Seats** are leadership offices: Steward, Master-at-Arms, Spymaster, Hierophant, Artificer, Quartermaster, Loremaster, Envoy, Beastmaster, Physician. A filled seat grants a standing benefit to the Domain Turn or to missions, and its holder offers services to the party.
- **Specialists** staff facilities. Every facility of Tier 2+ requires a specialist whose **grade** (1 to 5, mirroring skill ranks Novice to Grandmaster) is at least the facility's tier. Unstaffed facilities provide only their passive benefit, not their activities or Provisions.

Staff are real NPCs with roles and dispositions from the existing NPC relationship rules. They can be hired, courted with Tend to Relationships, lost to events, or turned against the party. Recruiting a grade 4 or 5 specialist is always an adventure or mission, never a purchase.

Full seat list, wages, grades, services, and recruiting rules live in **[Domain NPCs & Staff](domain-npcs.md)**.

---

## 11. Missions (Summary)

Missions send lower-ranked members out on jobs that run parallel to the party's own adventures. Each mission is defined by an **objective** (from a menu of eight), a **danger tier** (1 to 5, setting the TN), and a **dice timer** (d4 or d6). Timers tick during Domain Turns and also once per week while the party is away adventuring, so missions genuinely run in the background. When the timer completes, one domain check resolves the whole mission against a bounded outcome table. Blunders create rescue hooks instead of silent failure.

Concurrent missions are capped by the **agent pool** derived from the Force die (d4: 1 mission, d6: 1, d8: 2, d10: 2, d12: 3).

The full procedure, objective menus, reward tables, and worked examples live in **[Missions & Agents](missions-and-agents.md)**.

---

## 12. Provisions

Provisions are the entire adventuring power budget of the domain: light, bounded consumables prepared at home and spent in the field.

**Readying Provisions.** When the party departs on an adventure, they may ready a number of Provisions up to their **domain rank**. Each Provision must come from a built, staffed facility that produces it. No adventurer can carry more than 2 Provisions. Unused Provisions expire when the party returns home.

**Provision list.** Each facility's entry in the [Facility Catalog](facility-catalog.md) states which Provision it produces. The shared rules:

- A Provision is used once and then it is gone.
- A Provision never grants more than +1 boon, one die of healing, or one negated point of Fatigue.
- Provisions never stack with each other on the same roll.

> **Design Note:** This is the "light consumable buffs" ceiling made concrete. A Rank 3 domain sends the party out with 3 minor one-use effects per adventure. That is felt at the table ("our home sent us off well provisioned") without shifting encounter math, and a party without a domain misses nothing the balance assumes they have.

---

## 13. Heat & Exposure (Hidden Domains)

Hidden domains live under pressure of discovery. **Heat** is a track from 0 to 6 on the domain sheet.

**Gaining Heat.**

- Blunders on Recruit Followers or Extend Influence: +1.
- Covert mission outcomes as listed in [Missions & Agents](missions-and-agents.md): +1 or +2.
- Domain events and Exposure results as listed: +1.
- Bold public action by the party that links them to the domain: +1 (GM applies, announcing it openly).

**Exposure check.** During each Domain Turn in which Heat is 3 or higher, after ticking timers, roll a Secrecy check vs. TN 6 + current Heat. On a failure, roll 1d6 on the Exposure table below, then reduce Heat by 1 (the crisis surfaces and partially discharges the pressure).

**Exposure Table (1d6)**

| d6 | Exposure | Resolution |
|----|----------|------------|
| 1 | **Informant.** Someone inside talks. One staff NPC (roll among staff with disposition Suspicious or worse, otherwise lowest disposition) is feeding an outside power. The GM tracks who until the party investigates. | Investigation and confrontation hook. Rooting them out reduces Heat by 1. |
| 2 | **Investigator.** An agent of a faction, temple, or authority starts sniffing. Start a d6 dice timer. If it completes before the party misleads, bribes, or removes them, the domain's existence becomes known to that power. | Petition/Negotiate, a mission, or an adventure can stop the timer. |
| 3 | **Raid Warning.** An armed move against the domain is being prepared. Start a d4 dice timer. When it completes, the domain is raided: resolve as a danger tier 3 defense mission, or play it as an adventure scene. | Force checks, defenses, and Walls facilities matter here. |
| 4 | **Patron Alarmed.** One patron (if any) fears discovery. Their obligation timer ticks to 1 immediately and their next demand is about containing the damage. No patron: treat as Informant instead. | Meeting the demand restores the patron's confidence. |
| 5 | **Blackmail.** An outsider has proof and wants payment. Pay 100 coins × current Heat, or refuse and increase Heat by 2. Either way the blackmailer remains a loose end (hook). | Paying is quick. Ending the threat is an adventure. |
| 6 | **Cell Compromised.** One facility of the GM's choice (roll among Shadow and Faith facilities first) is discovered and must go dark: it is non-functional until rebuilt elsewhere for half its cost. | Rebuilding takes its normal construction timer. |

**Heat 6: Compromised.** The domain's location and nature are known to its enemies. The party must relocate the domain (an adventure arc, then rebuild at the same rank for one quarter of the total facility costs) or turn the domain Open and face the consequences in story. Reset Heat to 3 after relocation.

> **Design Note:** Heat is deliberately the mirror image of upkeep: upkeep taxes Wealth weekly, Heat taxes boldness. The Exposure table always produces bounded, playable situations with listed outs, never a silent "you lose the base." The GM announces every Heat gain openly so players steer their own risk.

---

## 14. Patrons & Obligations

A patron is a powerful NPC or faction that finances the domain in exchange for service. Patrons use the existing NPC relationship and disposition rules, plus two domain-facing values:

**Stipend.** What the patron provides each week of downtime (and during party absences).

| Stipend | Provides | Typical Patron |
|---------|----------|----------------|
| Modest | Covers upkeep up to Rank 2 | A wealthy merchant, a village temple |
| Generous | Covers upkeep up to Rank 3 and 50 coins/week to the treasury | A noble house, a city guild |
| Lavish | Covers upkeep up to Rank 4 and 150 coins/week to the treasury | A royal, a high temple, a city-state |

A patron may also grant founding gifts: paying seed or upgrade costs, providing the claim itself, or gifting a facility.

**Obligation timer.** Each patron has a **d6 dice timer**. It ticks down each Domain Turn. When it completes, the patron makes a **demand** and the timer resets. Pick or roll 1d6:

| d6 | Demand |
|----|--------|
| 1 | **Errand.** Run a specific mission (patron defines objective and danger tier, patron pays half its costs). |
| 2 | **Favor.** One adventurer spends next week's downtime activity in the patron's service. |
| 3 | **Tribute.** Deliver goods or coins worth 50 × domain rank. |
| 4 | **Discretion.** Abandon or delay one named domain undertaking the patron dislikes. |
| 5 | **Audience.** The patron summons the party. Play as a social scene or Petition/Negotiate. They want something bigger: an adventure hook. |
| 6 | **Leverage.** The patron asks the party to use their Influence for the patron's agenda: make an Extend Influence roll on the patron's behalf, gaining no domain progress from it. |

**Refusal.** Refusing a demand worsens the patron's disposition by 1 step. At Suspicious or worse, the stipend halves. At Hostile or worse, the stipend ends and the patron becomes an active problem, with a faction agenda dice timer aimed at the domain.

**Multiple patrons** are allowed and each has their own timer. Their demands will eventually conflict, which is intended.

> **Design Note:** Patrons let low-level parties run domains beyond their means, exactly the frame of the occult-organization campaign this feature was designed for: a disgraced royal grants the estate and a Lavish stipend, a corrupt temple official adds a Generous one, and the party pays in obligations, secrecy, and entanglement instead of coins.

---

## 15. Domain Events & Complications

### Domain Event Table

Rolled once per Domain Turn (1d6 for the category, then 1d6 within it, or the GM picks the most fitting result). If the domain sits inside a settlement, the GM may substitute the Settlement Event table result for the week instead of rolling both.

#### 1 — Trouble

| d6 | Event | Resolution |
|----|-------|------------|
| 1 | **Rival Eyes.** A faction takes hostile interest in the domain. Start or advance a faction agenda dice timer aimed at the domain. | Existing faction agenda rules apply. |
| 2 | **Raiders.** Bandits or beasts probe the domain's edges. Roll a Force check vs. TN 8. Failure: gain 1 Disrepair and the treasury loses 2d6 × 10 coins. Success: the attackers are driven off. Critical: also gain 1 progress toward Force. | Walls and Barracks facilities grant their listed bonuses. |
| 3 | **Feud.** Two staff NPCs or follower groups clash. Until an adventurer resolves it with an Oversee week or roleplay, domain checks suffer +1 bane. | Resolving it well may improve a disposition. |
| 4 | **Sabotage.** Hidden hands damage a facility: it is non-functional until repaired for one tenth of its cost. Hidden domains also increase Heat by 1 as the saboteur learned too much. | Whodunit hook. |
| 5 | **Demanding Authority.** A local power (or for Hidden domains, a suspicious official) presses claims. Pay 25 × domain rank coins or lose 1 Influence progress (setback rules apply). | Petition/Negotiate can settle it for good. |
| 6 | **Old Debt.** Someone from a staff member's past arrives with a grievance. Adventure hook centered on that NPC. | Resolving it raises that NPC's disposition by 1. |

#### 2 — Wear and Tear

| d6 | Event | Resolution |
|----|-------|------------|
| 1 | **Structural Damage.** Storm, flood, or subsidence. Gain 1 Disrepair. | Oversee removes it. |
| 2 | **Spoiled Stores.** The treasury loses 1d6 × 10 coins in ruined goods. | Vault facility prevents this event entirely. |
| 3 | **Sick Livestock or Beasts.** Stables, Menagerie, and Kennel facilities are non-functional next week. No such facilities: no effect. | Physician or Beastmaster can prevent it with a TN 8 check. |
| 4 | **Tool Loss.** The next Build or crafting week on site suffers +1 bane. | — |
| 5 | **Weary Hands.** Followers are overworked. The next Recruit Followers roll suffers +1 bane. | A Feast Hall feast (25 coins) cancels this. |
| 6 | **Creeping Neglect.** If the domain has any Disrepair, gain 1 more. Otherwise no effect. | — |

#### 3 — Expenses

| d6 | Event | Resolution |
|----|-------|------------|
| 1 | **Levy.** Authorities (or extortionists, for Hidden domains) demand 25 × domain rank coins. | Pay, or Influence check vs. TN 10 to waive it. |
| 2 | **Wage Pressure.** Staff wages cost 50% more this week. | — |
| 3 | **Supply Shortage.** All facility construction and crafting weekly costs are +50% this week. | — |
| 4 | **Broken Contract.** A supplier fails. One active construction timer does not tick this Domain Turn. | — |
| 5 | **Hungry Mouths.** New followers strain the stores. Pay 10 × domain rank coins or lose 1 Force progress. | Kitchens facility halves the cost. |
| 6 | **Windfall Tax.** If the treasury holds more than 500 coins, lose 10% of it to fees, tithes, or graft. | Counting House prevents this event entirely. |

#### 4 — Situation Shift

| d6 | Event | Resolution |
|----|-------|------------|
| 1 | **New Neighbors.** A group settles nearby: refugees, a caravan, a hermit sect. New NPC contact (roll NPC Role table) and possible recruits: the next Recruit Followers roll gains +1 boon. | — |
| 2 | **Changing Hands.** A nearby power changes leadership. One patron's or faction's disposition toward the domain shifts by 1 in either direction (GM's choice with stated reason). | — |
| 3 | **Word Spreads.** The domain's reputation grows. Open domains gain 1 Influence progress. Hidden domains increase Heat by 1. | — |
| 4 | **Wandering Talent.** A specialist of grade equal to 1d3 + 1 arrives seeking work. Hire them at normal wages without a search. They leave after 2 weeks if unhired. | See staff rules. |
| 5 | **Market Swing.** The next Trade Venture roll gains +1 boon. | — |
| 6 | **Patron's Fortune.** One patron rises or falls in power. Their stipend grade shifts 1 step up or down for 1d6 weeks (GM's choice with stated reason). No patron: no effect. | — |

#### 5 — Traces

| d6 | Event | Resolution |
|----|-------|------------|
| 1 | **Strange Find.** Workers unearth something old beneath the domain. Adventure hook on the party's own land. | — |
| 2 | **Omen at Home.** Signs mark the domain: birds, dreams, sourceless bells. +1 boon on the next Provide Offering on site. The GM may foreshadow a coming event. | — |
| 3 | **Visitor with News.** A traveler brings word of a distant region or faction. The GM shares one true piece of intelligence. | — |
| 4 | **Follower's Secret.** One follower or staff member is revealed to have a useful hidden skill, past, or contact. The GM defines it. | — |
| 5 | **Coded Approach.** An unknown party makes contact, testing whether the domain can be dealt with. Hook: new patron, ally, or infiltrator. | — |
| 6 | **Map Fragment.** Documents surface pointing to treasure, a ruin, or a rival's weakness. Adventure hook. | — |

#### 6 — Calm

| d6 | Event | Resolution |
|----|-------|------------|
| 1 | **Quiet Week.** Nothing of note. | — |
| 2 | **Good Harvest or Trade.** The treasury gains 10 × domain rank coins. | — |
| 3 | **High Spirits.** The next domain activity roll by any adventurer gains +1 boon. | — |
| 4 | **Home Comforts.** Each adventurer taking Leisure or Recover at the domain this week removes 1 additional Lingering Fatigue. | — |
| 5 | **Small Ceremony.** A wedding, naming, or rite among the followers. Flavor scene. One staff NPC's disposition improves by 1 step (max Friendly) if any adventurer attends. | — |
| 6 | **Steady Growth.** Gain 1 progress toward the domain stat with the lowest die (party's choice on ties). | — |

### Domain Complication Table (d6)

Used by the upkeep check's blunder and by activity consequences that call for it.

| d6 | Complication |
|----|--------------|
| 1 | **Injury at Work.** The acting adventurer gains 1 Lingering Fatigue. |
| 2 | **Squandered Stores.** The treasury loses 2d6 × 10 coins (minimum 0, then gain 1 Disrepair instead). |
| 3 | **Insulted Staff.** One staff NPC's disposition worsens by 1 step. |
| 4 | **Shoddy Work.** Gain 1 Disrepair. |
| 5 | **Unwanted Attention.** An outside power notices the domain's activity. Open: advance a faction agenda timer by 1. Hidden: increase Heat by 1. |
| 6 | **Lost Week.** The acting adventurer cannot take the same activity next week. |

---

## 16. Balance & Economy Analysis

### Coin Sink Curve

Approximate total investment for a "complete" domain at each rank (rank costs + typical facilities + stat progress purchases), against the wealth the treasure economy produces:

| Stage | Party Levels | Domain State | Cumulative Sink | Reference Point |
|-------|--------------|--------------|-----------------|-----------------|
| Early | 1–3 | Rank 1, 3–4 Tier 1 facilities | ~1,500–2,500 | A few Q3 items |
| Mid | 4–6 | Rank 2–3, 6–8 facilities incl. one Tier 3 | ~15,000–25,000 | One Q5 item per PC |
| Late | 7–8 | Rank 4, 10–12 facilities incl. Tier 4 atelier | ~70,000–100,000 | One Q6 item per PC |
| Pinnacle | 9–10 | Rank 5, full slots | ~300,000+ | Beyond personal wealth, needs patrons/hoards |

The domain competes with personal magic items for the same coins, which is the intended tension. Groups choose between a stronger sword arm and a stronger home, and the domain pays back in access (Q6+ crafting the world otherwise does not sell), services, missions, and story weight rather than raw power.

### Coin Flow Audit: The Domain Never Out-Earns Adventuring

The design contract: **coins flow from adventures into the domain, never the reverse.** A fully worked domain roughly pays its own way. Nothing more. The numbers:

**Running costs per week** (upkeep + typical staff wages folded in):

| Rank | Upkeep | Typical Wages | Expected Upkeep-Check Result* | Realistic Weekly Cost |
|------|--------|---------------|-------------------------------|------------------------|
| 1 | 25 | ~25 (one grade 2) | Wealth d4: pays ~75% of weeks | ~45 |
| 2 | 50 | ~75 | Wealth d6: pays ~60% of weeks | ~105 |
| 3 | 100 | ~150 | Wealth d8: pays ~45% of weeks, small surplus ~20% | ~185 |
| 4 | 250 | ~300 (incl. grade 4 artificer) | Wealth d10: pays ~35%, surplus ~35% | ~330 |
| 5 | 500 | ~500+ | Wealth d12: pays ~29%, surplus ~46% | ~590 |

*\*Assuming Wealth at the rank's cap. Expected surplus from the upkeep check never exceeds ~20 coins/week even at Wealth d12 with the failure weeks netted against the surplus weeks.*

**Income ceilings per week** (every stream at its hard cap):

| Stream | Cap | Bounded By |
|--------|-----|------------|
| Trade Venture | 50 × rank/week, party-wide | Market saturation rule (§8): one Profitable week per domain per week, chosen at most twice on one roll |
| Upkeep surplus | ≤ upkeep, ~+20/week expected at best | Failure weeks net against surplus weeks |
| Passive facility income | ~55/week at Rank 4 with every income facility built and staffed | 10–25 × rank per downtime phase each, staffing required |
| Missions | ~60–70/week expected at danger 4–5 | TN 14–16 vs. d12+1d6+2 (~21% success), 4–6 week timers, blunders cost agents |
| Fencing (Smugglers' Cache) | +10% on loot sales | Adventure-fed: no loot, no fence |
| Crafting for sale | Negative | Materials (half value) + weekly costs exceed the half-value sale price under existing crafting rules |

Sum of all ceilings at Rank 5, everything staffed and a PC working Trade Venture every week: roughly 380–420 coins/week against ~590/week running costs. **An engaged domain breaks even. An idle one costs money. Neither ever mints it.**

And even that break-even money is fenced: every stream above pays into the **treasury**, which never converts to personal coins (§6). The party extracts value as crafted goods and services made at the domain, or through the priced emergency levy. There is no path from domain commerce to an adventurer's purse.

**The adventuring benchmark.** Per the treasure distribution guidelines (magic item design), a party earns 50–500 coins in minor treasure per session plus one permanent item per arc at character-level Quality (750 to 45,000 coins in value). One adventure arc out-earns a year of the domain's best commerce, and the adventurers stake Wounds and lives for it while the merchant stakes a complication roll. That gap is deliberate and must survive every future addition to the module: **any new facility, mission, or activity that would let the domain out-earn its own running costs at scale is mispriced.**

**The one legitimate external inflow: patrons.** Stipends (up to upkeep coverage + 150/week at Lavish) can exceed everything the domain earns itself. That is intended and priced in a different currency: obligation timers, disposition management, and the patron's agenda. A patron is not income, a patron is a debt that walks and talks.

**Cross-check against magic item progression.** Each rank's total input (rank cost + typical facilities) tracks one Quality tier of items the party gives up: Rank 3 ≈ one Q5 item (2,500–15,000), Rank 4 ≈ one Q6 item (7,500–45,000). What the domain returns for that trade is never the coins back, it is what coins cannot otherwise buy: Q6–Q7 crafting access, staff services, Provisions, missions, and a place in the world.

### Power Budget Audit

| Channel | Ceiling | Bounded By |
|---------|---------|------------|
| Provisions | +1 boon / 1 die heal / 1 Fatigue negated, each once | Rank per adventure, 2 per PC, no stacking |
| Facility boons | +1 boon on specific downtime activities | Downtime only, never adventure rolls |
| Crafting access | Q6 at Tier 4, Q7 at Tier 5 | Full item cost still paid, crafter rank rules unchanged |
| Missions | Coins, intel, hooks, domain progress | Reward tables capped per danger tier |
| Staff services | Existing downtime activities at reduced cost or +1 boon | Downtime only |

Nothing in the module touches attack rolls, Defenses, HP, spell scaling, or XP. The strongest adventure-facing effect any domain feature can produce is a single +1 boon consumable.

### Failure-State Audit

Every pressure mechanic has a listed floor: Disrepair caps at facility shutdown (not loss), Heat caps at forced relocation (not destruction), unpaid upkeep converts to Disrepair, mission blunders convert to rescue hooks. The domain can be hurt everywhere and permanently destroyed nowhere except through staged story, keeping the module opt-in in spirit: it generates drama, not homework or ruin.

---

## 17. Archetype Coverage Matrix

Every archetype fantasy gets a facility line, a seat, and a mission type that belongs to them.

| Archetype Fantasy | Facilities | Seat | Signature Use |
|-------------------|-----------|------|---------------|
| Warrior, champion, hoplite | Training Yard chain, Armory, Barracks, Walls | Master-at-Arms | Drill followers, defense missions, whetstone Provisions |
| Sorcerer, mage, scholar-caster | Sanctum chain, Library, Ritual Circle | Loremaster / Artificer | Research on site, catalyst crafting, spell-scroll missions |
| Priest, mystic, oath-keeper | Shrine chain, Reliquary, Sacred Garden | Hierophant | Provide Offering on site, blessed token Provisions, pilgrimage missions |
| Rogue, infiltrator, spy | Listening Post chain, Safehouses, Disguise Workshop | Spymaster | Heat management, covert missions, intel Provisions |
| Face, envoy, merchant-prince | Feast Hall, Envoy Quarters, Counting House | Envoy / Steward | Influence growth, patron handling, trade missions |
| Artisan, alchemist, smith | Workshop chain, Alchemy Lab, Forge | Artificer / Quartermaster | Q4–Q7 crafting, alchemical Provisions, commission income |
| Ranger, tamer, wilder | Stables, Kennels & Menagerie, Hunting Lodge, Sacred Garden | Beastmaster | Mount and companion support, scouting missions, provisioning |
| Bard, keeper of deeds | Feast Hall, Archive of Deeds, Envoy Quarters | Envoy / Loremaster | Renown, rumor networks, Carouse on site |

---

## 18. Integration & Production Roadmap

**Where the rules land when approved:**

```
docs/06-scenes/06-domains/          (new subchapter, after crafting professions)
├── 00-overview.md        (founding, ranks, stats, domain sheet, Domain Turn)
├── 01-domain-activities.md
├── 02-facilities.md      (from facility-catalog.md)
├── 03-staff.md           (from domain-npcs.md)
├── 04-missions.md        (from missions-and-agents.md)
├── 05-patrons-and-secrecy.md
└── 06-domain-events.md
```

Renumbering note: current `06-scenes` uses 05 for crafting professions and 07 for challenges. If 06 is taken by then, append as the next free number instead. No app JSON surface exists for this content type, and none is needed for the playtest. Notion sync follows publication per the standard pipeline.

**Dependencies on the downtime analysis.** This module assumes the downtime analysis proposals ship, specifically: the weekly procedure with settlement events, faction agenda dice timers, Lingering Fatigue, the Complication table pattern, Tend to Relationships, and Commission an Item. If those change, the Domain Turn and the activity formats here follow suit.

**Terminology contract.** This module introduces exactly these new terms: Domain, Domain Rank, domain check, Wealth/Influence/Force/Secrecy (domain stats), treasury, emergency levy, windfall investment, strain, liquidation, progress, setback, Disrepair, Domain Turn, Facility, Tier, footprint (compact/standard/sprawling), Add-On, Seat, specialist grade, agent pool, mission, danger tier, Provision, Heat, Exposure check, patron stipend, obligation timer. Spatial language (areas, distance bands, narrative distances) reuses the existing vocabulary from Distances & Movement without change. Everything else reuses existing vocabulary.

---

## 19. Playtest Plan (Occult Organization Campaign)

The [worked example](occult-organization-example.md) sets up the playtest campaign directly. Questions the playtest should answer:

1. **Pacing.** Does the Domain Turn stay under 10 minutes of table time per downtime week? If not, which step drags?
2. **Upkeep feel.** Does the weekly Wealth check read as an engine (fun) or a tax (chore)? Alternative if chore: roll upkeep once per downtime phase instead of weekly.
3. **Stat growth rate.** Do the progress thresholds (2/3/4/5) produce roughly one satisfying step-up per downtime phase in the early game? Watch whether buying progress with coins crowds out the activity-based path.
4. **Heat pressure.** Does Heat reach 3+ often enough to matter but rarely enough to avoid a doom spiral? Target: about one Exposure roll per two downtime phases in an active covert campaign.
5. **Mission engagement.** Do players remember and care about running missions, or do they need a stronger prompt at the table (a mission board handout is the likely fix)?
6. **Provisions.** Do players actually spend them, or hoard them? If hoarding, let unspent Provisions convert to treasury coins on return.
7. **Opt-out comfort.** Does any player feel forced into domain bookkeeping? Which parts did non-enthusiasts touch voluntarily?
8. **Patron friction.** Are two patrons with conflicting demands generating story (intended) or resentment (needs softer refusal costs)?
9. **Economic drift.** Does anyone try to run the domain as an income engine? The saturation cap and income ceilings (§16) should make that visibly inferior to adventuring within two downtime phases. If a player finds a loop that beats the ~400/week ceiling, document it: that loop is a pricing bug.

## 20. Open Questions

1. Should Open domains get a fourth stat of their own (Renown) for symmetry with Secrecy, or does Influence carry that weight alone? Current design: Influence alone, revisit after playtest.
2. Do domains need a defense stat block for when raids are played as combat scenes (walls AV, gate HP), or is the danger tier 3 defense mission plus GM-built encounters enough? Current design: missions plus staged encounters, no siege subsystem at mortal scale.
3. Should multiple parties or characters in the same campaign world be able to hold separate domains with inter-domain play? Out of scope for this draft.
4. Should the character sheet app surface the domain sheet? Deferred until the rules stabilize post-playtest.

---

## Appendix: Domain Quick-Reference Sheet

```
┌──────────────────────────────────────────────────────────┐
│                DOMAIN QUICK REFERENCE                    │
├──────────────────────────────────────────────────────────┤
│ FOUNDING                                                 │
│  Profile: Open / Hidden   Seed: 500 coins, d4 timer      │
│  All stats start d4. One free Tier 1 facility.           │
│                                                          │
│ RANKS   1 Camp → 2 Outpost → 3 Bastion →                │
│         4 Stronghold → 5 Fabled Seat                     │
│  Cost: 500/2,500/10k/40k/150k   Stat cap: d4→d12         │
│  Upkeep: 25/50/100/250/500 per week                      │
│  Slots: 4/8/12/16/20   Max facility tier = rank          │
│  Built ground ≈ slots in areas. Bounds across:           │
│  medium-long / v.long / extreme / ~1000 / 1000 paces     │
│                                                          │
│ DOMAIN TURN (each downtime week)                         │
│  1. Upkeep check: Wealth vs TN 8                         │
│     blunder: 2x upkeep + Complication / fail: pay        │
│     weak: covered / strong: +half surplus / crit: +full  │
│  2. Tick timers (construction, missions, obligations)    │
│  3. Exposure check (Hidden, Heat 3+):                    │
│     Secrecy vs TN 6 + Heat, fail → Exposure table        │
│  4. Domain event: 1d6, then 1d6 sub-table                │
│                                                          │
│ ACTIVITY OUTCOMES (all domain activities)                │
│  Blunder: both consequences / Fail: choose 1 consequence │
│  Weak: 1 bonus / Strong: 2 bonuses / Crit: all 3         │
│                                                          │
│ STAT GROWTH (progress needed / buy per point)            │
│  d4→d6: 2 / 100c    d6→d8: 3 / 500c                      │
│  d8→d10: 4 / 2,500c d10→d12: 5 / 10,000c                 │
│  Buying limited to once per stat per week.               │
│  Wealth die ≈ assets: 500/2.5k/10k/50k/150k+             │
│  Windfall ≥ next step: convert at once.                  │
│  Liquidate 1/phase: step down for 100/750/5k/25k.        │
│                                                          │
│ MISSIONS  danger 1-5 = TN 8/10/12/14/16                  │
│  Agent pool by Force: d4-d6: 1, d8-d10: 2, d12: 3        │
│  Outfitting: 25 x danger. Timer d4 near / d6 far.        │
│  At 0: stat die + 1d6 + bonus (max +2) vs TN.            │
│  Blunder = agents captured = rescue hook (+2 Heat)       │
│                                                          │
│ PROVISIONS  ready up to rank per departure, max 2/PC     │
│  One use, no stacking, expire on return.                 │
│                                                          │
│ TREASURY = domain money, never personal coins.           │
│  Extract as goods/services made at the domain.           │
│  Levy: 100 x rank, 1/phase, costs 1 Wealth progress      │
│  + 1 staff disposition step.                             │
└──────────────────────────────────────────────────────────┘
```
