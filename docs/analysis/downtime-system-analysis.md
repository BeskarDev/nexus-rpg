# Downtime System — Design Analysis

> **Scope:** Compatibility of the current downtime system with the updated time scales, dice timers, challenges, travel, and social intrigue systems. Proposed changes, expansion opportunities, and new tools for players and GMs.
>
> **References:** [Downtime Overview](../06-scenes/04-downtime/00-overview.md) | [Downtime Activities](../06-scenes/04-downtime/activities.md) | [Scenes & Time Scales](../06-scenes/01-scenes-time-intervals.md) | [Challenges](../06-scenes/07-challenges.md) | [Social Intrigue](../06-scenes/08-social-intrigue.md) | [Travel](../06-scenes/09-travel.md) | [Crafting Professions](../06-scenes/05-crafting-professions.md) | [NPCs and Relationships](../02-adventurers/05-npc-relations.md)

---

## 1. Executive Summary

### Key Findings

1. **Core procedure is compatible** — Downtime already operates at the weekly time scale and uses per-activity skill rolls, which fit cleanly into the unified Scenes & Time Scales framework.
2. **Weekly event roll replaces countdown timer** — The Downtime Event Table exists in the time scales document, but the downtime rules themselves never reference it. The proposed approach rolls 1d6 every week (mirroring travel's daily event roll), rather than using a countdown timer.
3. **Challenge system is underused** — Multi-week activities (Craft an Item, Research) already track cumulative progress, but they do not use Challenge Dice formally. Aligning them with the challenge framework would unify procedures and reduce cognitive overhead.
4. **Social intrigue has no downtime entry point** — There is no downtime activity that bridges into the Social Intrigue system (e.g., petitioning a ruler, negotiating a trade agreement, lobbying a faction). The Carouse activity is incomplete and underspecified.
5. **Travel ↔ downtime handoff is missing** — No rules govern what happens when travel time overlaps with downtime (arriving mid-week, traveling between settlements during downtime, running errands to a nearby village).
6. **The world does not move** — Current downtime is purely player-driven. There is no mechanic that advances NPC agendas, faction movements, or world events while the party rests. Prolonged downtime carries no narrative risk. The proposed faction agenda system (§4.2) and weekly settlement events address this.
7. **Settlement system is minimal** — Four settlement ranks exist but lack mechanical depth beyond item Quality caps. Settlements have no personality, no dynamic economy, and no event tables.
8. **Magic item availability is undefined** — Players can buy items up to the settlement rank in Quality, but there is no procedure for what specific items are available, how stock rotates, or how to discover rare finds.

### Design Principles (Inherited from Existing Systems)

1. **Unified time scale framework** — All scenes use the same action loop (Tick → Roll/Act → Results). Downtime should follow this pattern.
2. **Weekly event pacing** — Just as travel rolls a daily event after each day, downtime rolls a weekly event after each week. This ensures the world moves and creates a consistent rhythm across all time scales.
3. **Challenge-based progress** — Complex multi-step tasks use challenge dice. Multi-week downtime activities should optionally use this framework.
4. **Resource management matters** — Supplies, durability, fatigue, and coins are meaningful costs. Downtime should tax resources, not bypass them.
5. **NPCs and relationships are first-class** — The disposition system and NPC roles exist but have limited downtime hooks. Downtime should be a primary venue for building, maintaining, and testing relationships.

---

## 2. Compatibility Analysis

### 2.1 What Works

| System | Compatibility | Notes |
|--------|--------------|-------|
| **Time Scales** | ✅ Full | Downtime is already the weekly time scale. Each activity = one Action (~1 week). Free activities (errands, shop visits, meetings) are defined. |
| **Dice Timers** | ⚠️ Partial | The Downtime Event Table (d6) exists in the time scales doc, but the downtime rules never reference it. Proposed: roll 1d6 weekly (§3.1), mirroring travel's daily event roll rather than using a countdown timer. |
| **Event Die** | ⚠️ Partial | The six-category structure (Threat, Wear & Tear, Resource Drain, Shift, Traces, Ambient) is defined for downtime but only as an example. The proposed Settlement Event Table (§4.1) expands each category with d6 sub-tables for varied outcomes. |
| **Challenges** | ⚠️ Partial | Craft an Item already uses cumulative successes, which is mechanically similar to a challenge die. Research could also benefit. But neither activity formally references the challenge system. |
| **Social Intrigue** | ❌ Missing | No downtime activity feeds into or triggers a Social Intrigue. Carouse produces social outcomes but is underspecified and does not use the Interest/Patience/Motivation framework. |
| **Travel** | ❌ Missing | No rules for transitioning between travel and downtime, or for conducting short trips (to a nearby settlement) during a downtime phase. |
| **NPC Relations** | ⚠️ Partial | Carouse can produce NPC connections, but no activity explicitly uses the disposition system, NPC roles, or relationship mechanics. Addressed by proposed Carouse expansion (§3.4) and Tend to Relationships activity (§4.3). |
| **Crafting Professions** | ✅ Full | Work a Crafting Profession and Craft an Item both reference the professions system directly. |
| **Harvesting** | ⚠️ Partial | Harvested materials can be used in Craft an Item, but no downtime activity exists for processing, refining, or commissioning items from harvested parts. |

### 2.2 Identified Conflicts

1. **Event frequency calibration.** Rolling 1d6 every week means events happen frequently. The Ambient category (6) ensures roughly 1 in 6 weeks is uneventful, but the GM should feel free to skip or defer rolls during narratively intense weeks. This pacing was chosen deliberately to mirror travel's daily event cadence — downtime should not feel like a pause button.
2. **Crafting uses its own progress system.** Craft an Item tracks "required successes" with its own table, which is functionally identical to a challenge die but uses different terminology. This creates parallel systems for the same concept.
3. **Complication table is referenced but undefined.** Manual Labour, Work a Crafting Profession, and Research reference a "Complication table" on blunders, but no such table exists in the downtime rules.

### 2.3 Missing Integration Points

1. **No downtime procedure checklist** — Travel has a clear setup + daily checklist. Downtime has no equivalent step-by-step procedure for the GM. Addressed in §3.1.
2. **No weekly event procedure** — There is no defined moment when the event die is rolled and the world reacts. Addressed in §3.1 (roll 1d6 every week).
3. **No faction advancement rules** — No mechanic allows faction plots or world events to advance during downtime. Addressed in §4.2 (Faction Agendas with 4-step clocks).
4. **No settlement event tables** — The Downtime Event Table is generic. Addressed in §4.1 (Settlement Event Table with d6 sub-tables).
5. **No item market procedure** — Players can buy items up to settlement rank Quality, but there is no procedure for determining what specific magic items, rare goods, or services are available. Addressed in §5.1.

---

## 3. Proposed Changes

### 3.1 Formalize the Downtime Procedure

Add a step-by-step procedure, mirroring the Travel Procedure's structure:

**Downtime Setup (GM, before play)**

1. Determine settlement rank and any special traits (roll or choose from the Settlement Traits table in §4.4).
2. Prepare or select a settlement event table (or use the default Downtime Event Table).
3. Generate the settlement market inventory (see §5.1).
4. Note any active faction agendas that should advance during the downtime (see §4.2).

**Weekly Downtime Procedure (each week)**

1. Each adventurer **declares and resolves** their chosen downtime activity.
2. **Roll weekly event**: Roll 1d6 on the Settlement Event Table and resolve the result. This happens every week, mirroring how travel rolls a daily event after each day of travel.
3. **Faction advancement**: The GM advances any active faction agendas by one tick (see §4.2).

> **Design Note:** Rolling an event every week ensures downtime is never static — the world moves regardless of what the party does. This directly mirrors the travel system's daily event roll (Travel Procedure step 6: "Roll daily event"). Short downtime stays (1–2 weeks) still feel dynamic, while extended stays accumulate meaningful world change. The GM always has the option to skip or replace the roll for a specific week if the narrative demands it.

### 3.2 Define the Complication Table

The following activities reference rolling on a "Complication table" on blunders: Manual Labour, Work a Crafting Profession, Research. Define this table:

**Complication Table (d6)**

| d6 | Complication |
|----|--------------|
| 1 | **Injury.** You suffer a minor injury. Gain 1 Fatigue. |
| 2 | **Reputation Hit.** Word of your blunder spreads. You suffer +1 bane on your next social interaction in this settlement. |
| 3 | **Property Damage.** Tools, materials, or your workspace are damaged. Pay an additional 50 coins for repairs or suffer +1 bane on your next use of the same activity. |
| 4 | **Unwanted Attention.** Your failure draws scrutiny from a local authority, rival, or criminal element. The GM introduces a minor complication. |
| 5 | **Lost Time.** The week is wasted on fixing problems. You cannot use this activity again next week. |
| 6 | **Nothing Extra.** The blunder is bad enough on its own. No additional complication. |

### 3.3 Align Craft an Item with the Challenge Framework

Reframe the Craft an Item multi-week tracking to use challenge terminology, reducing parallel systems:

- **Required Successes** → **Challenge Die** (e.g., Q4 item requires a d6 challenge die starting at 6).
- Each weekly crafting roll that succeeds reduces the challenge die by 1 (strong success: 2, critical: 3).
- Failures and blunders trigger crafting-specific consequences (material waste, flawed work) instead of generic challenge consequences.
- The weekly expenses, material costs, and profession requirements remain unchanged.

> **Design Note:** This is a terminology and framing change, not a mechanical overhaul. The numbers stay the same. The benefit is that players and GMs use one unified language for "multi-step progress tracking" across crafting, chases, research, and other challenges.

### 3.4 Expand the Carouse Activity

The current Carouse activity is a skeleton (bullet-point outcomes, no full procedure). Expand it to:

**Carouse (Revised)**

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 1 (Hamlet) | — | 50 coins/week |

You spend the week socializing — frequenting taverns, attending gatherings, making introductions, or exploring the local scene. Roll Spirit/Mind + Streetwise vs. medium Difficulty (TN 8).

You can also multiply this activity's expenses by any factor up to the settlement rank and gain a number of boons on the roll equal to the expense multiplier (representing more lavish entertainment and access to higher social circles).

**Blunder.** You cause a scene. Roll on the Complication table. Additionally, one of your existing NPC relationships in this settlement worsens by 1 step (GM's choice).

**Failure.** An uneventful week. You enjoy yourself but learn nothing useful and make no lasting connections.

**Weak.** Choose one: generate a rumor using the [Quest Hooks](../10-gm-tools/01-random-tables/10-random-quests.mdx) random tables (use the "Rumor" sentence seed: *"[Source] says that [rumor subject] near [location]. They say it's because of [cause]."*), **or** make a new acquaintance (add an Indifferent NPC relationship with a role appropriate to the settlement).

**Strong.** Choose two of the above, **or** improve an existing NPC relationship in this settlement by 1 step.

**Critical.** Choose two of the above **and** gain +1 Resolve (max. 3).

> **Design Note:** This revision ties Carouse directly to the NPC relationship and disposition system, making it the primary downtime tool for building social networks. Rumors and quest hooks are generated using the existing [Quest Hooks random tables](../10-gm-tools/01-random-tables/10-random-quests.mdx), keeping content consistent across GM tools. The expense multiplier mirrors Learn a Skill's scaling mechanic.

### 3.5 Add a Downtime Social Intrigue Entry Point

Create a new activity or clarify that Social Intrigue challenges can be initiated during downtime:

**Petition / Negotiate (New Activity)**

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 2 (Village) | An NPC or faction with whom you have a specific request | see table below |

When you need to convince an NPC or faction of something significant — securing a trade deal, requesting military aid, gaining access to a restricted archive, or resolving a dispute — you initiate a Social Intrigue challenge during downtime.

Follow the full [Social Intrigue](../06-scenes/08-social-intrigue.md) rules. The Patience die, Interest, Motivations, and Pitfalls are set by the GM based on the NPC and the request. Each exchange in the Social Intrigue takes place during one week of downtime (rather than minutes in a conversation). This represents ongoing meetings, negotiations, and political maneuvering.

**Weekly Expenses** scale with the scope of the petition. These represent gifts, bribes, hosting feasts, legal fees, travel within the settlement, and other costs of political maneuvering:

| Scope | Weekly Expenses | Examples |
|-------|----------------|---------|
| Minor | 50 coins/week | Access to a restricted area, a letter of introduction, a small favor |
| Moderate | 200 coins/week | A trade agreement, military escort, formal alliance with a minor faction |
| Major | 500 coins/week | Military aid, exclusive trade rights, an audience with a ruler, major faction support |
| Grand | 1,000+ coins/week | Treaties between city-states, legendary artifact access, divine intervention |

On a **blunder** during any exchange, the expenses for that week are wasted and the NPC demands a concession — the GM chooses one: double next week's expenses, the NPC adds a new Pitfall reflecting growing distrust, or the adventurer's reputation in the settlement suffers (+1 bane on all Influence rolls in this settlement for 1d6 weeks).

> **Design Note:** This explicitly connects the Social Intrigue system to downtime, filling the identified gap. The weekly-exchange pacing makes Social Intrigue feel appropriately weighty for political or factional negotiations. The structured expense table gives both players and GMs clear expectations, while the blunder consequence adds real risk to failed diplomacy.

---

## 4. Expansion Opportunities

### 4.1 World Advancement: The Living Settlement

The most significant expansion opportunity is making the world move during downtime. Currently, downtime is a static safe haven — the party rests, the world waits. The issue description explicitly calls for mechanics showing that "the world is moving on, changing, and adapting" and that "prolonged downtime should be both an opportunity for improvement but also a risk of unforeseen turbulences."

**Proposed Mechanic: Settlement Events**

Each week of downtime, after all activities are resolved, the GM rolls 1d6 on the Settlement Event Table. This mirrors the travel system's daily event roll, ensuring the world moves even during rest. Events affect the settlement as a whole — they are not targeted at the party specifically, though the party may be affected or choose to get involved.

The table follows the same six-category schema as the generic Downtime Event Table defined in Scenes & Time Scales:

**Settlement Event Table (1d6)**

| d6 | Category | Settlement Effect |
|----|----------|-------------------|
| 1 | **Threat** | A danger threatens the settlement. Roll d6: [1] A faction or rival makes a noticeable move (see §4.2 Faction Agendas). [2] A monster or bandit threat emerges nearby. [3] A disease or blight spreads through a district. [4] An old enemy of the settlement resurfaces. [5] A natural disaster strikes (flood, fire, earthquake). [6] A political betrayal or coup attempt rocks the settlement. |
| 2 | **Wear and Tear** | Infrastructure or resources degrade. Roll d6: [1] A key bridge, road, or building is damaged. [2] Tools or workshop equipment in the settlement need major repair. [3] Water supply or sewage systems fail. [4] A fire damages a market district. [5] Livestock or crops are lost to disease. [6] A warehouse or storehouse collapses or is robbed. |
| 3 | **Expenses** | Economic pressure mounts. Roll d6: [1] Taxes increase — all activity expenses rise by 50% next week. [2] A key trade route is disrupted — one category of goods becomes scarce. [3] A merchant guild raises prices on a specific service. [4] Currency is debased — coins are worth less. [5] Rent or lodging costs spike due to an influx of refugees or travelers. [6] A patron or employer defaults on payment. |
| 4 | **Situation Shift** | The social, political, or economic landscape changes. Roll d6: [1] A faction gains or loses power. [2] A new law or decree is announced. [3] A notable NPC arrives in or departs the settlement. [4] A festival, holy day, or mourning period begins (+1 boon on Carouse this week, but some shops may close). [5] Trade agreements shift — available goods change (GM refreshes one market slot). [6] A rumor sweeps the settlement — generate one using the [Quest Hooks](../10-gm-tools/01-random-tables/10-random-quests.mdx) random tables. |
| 5 | **Traces** | Signs of coming change or hidden opportunities. Roll d6: [1] Strange travelers arrive with news from afar. [2] Unusual tracks, omens, or signs appear near the settlement. [3] An NPC contact sends word about a developing situation. [4] A hidden cache, passage, or ruin is discovered nearby. [5] Patterns in recent events suggest something larger is at work. [6] A message, map fragment, or coded letter surfaces. |
| 6 | **Ambient** | Life goes on. Roll d6: [1] A peaceful week — nothing of note occurs. [2] Good weather and high spirits. [3] A minor local celebration or market day. [4] A traveling performer or storyteller passes through. [5] An old tradition is observed. [6] Seasonal change brings new sights and sounds. |

> **Design Note:** This table uses 1d6 with flat probability, matching the generic event table schema used across all time scales. Each category contains multiple sub-events (d6 each) for variety — the GM can roll the sub-event or choose what fits. A 1-in-6 chance of a threat per week feels appropriately dynamic: over a 6-week downtime, the party will likely face one real threat and several interesting shifts. Festivals and celebrations are sub-events under Situation Shift (result 4-4), not their own category, keeping their frequency appropriately low.

### 4.2 Faction Agendas

A formalized subsystem for tracking faction and NPC power moves during downtime. Inspired by faction clocks in Blades in the Dark and fronts in Dungeon World, this system treats factions as characters with their own goals, motivations, and consequences — extending the NPC profile model from Social Intrigue to organizations.

#### Faction Profiles

Each significant faction in the settlement is defined with a profile that mirrors the Social Intrigue NPC format:

**Faction Profile Template:**

- **Name**: The faction's public identity.
- **Type**: Government, Guild, Temple, Criminal, Military, Merchant, Cult, or Other.
- **Agenda**: What the faction is currently trying to achieve (1–2 sentences).
- **Disposition**: The faction's current attitude toward the party (uses the standard disposition scale: Hateful −3 to Intimate +2).
- **Motivations** (2–3): What the faction wants — desires, fears, bonds, or values. Follows the same format as NPC Motivations in Social Intrigue.
- **Pitfalls** (1–2): What will turn the faction against someone. Follows the NPC Pitfall format.
- **Resources**: What the faction can bring to bear (coin, soldiers, information, political influence, magic).
- **Agenda Clock**: A countdown from 4 to 0 (see below).

> **Example:**
>
> **The Copper Merchants' Guild**
> - **Type:** Merchant
> - **Agenda:** Secure exclusive mining rights to the new copper vein in the eastern hills.
> - **Disposition:** Indifferent (0)
> - **Motivations:** *Desire: Profit* (promise a cut of future trade), *Fear: Rivals* (the Iron Circle threatens their monopoly)
> - **Pitfalls:** *Insult: Suggesting they need outside help*, *Rival: Any association with the Iron Circle*
> - **Resources:** Substantial coin, trade contacts across the region, two hired mercenary bands
> - **Agenda Clock:** ⬜⬜⬜⬜ (4 ticks remaining)

#### Agenda Clocks

Each faction agenda has a **4-step clock** representing how close the faction is to achieving its goal:

| Ticks Remaining | Stage | What's Visible |
|-----------------|-------|----------------|
| 4 | **Scheming** | The faction is laying groundwork. Only subtle clues are visible — a flurry of meetings, unusual purchases, or quiet recruitment. Rumors may surface through Carouse or Traces events. |
| 3 | **Maneuvering** | The faction takes preliminary action. Their moves become noticeable to attentive observers — shipments, hired agents, political favors called in. Players who investigate can learn the faction's Agenda. |
| 2 | **Acting** | The faction commits openly. Their actions are visible to everyone — public declarations, troop movements, territorial claims, or market manipulation. The party can directly interfere or assist. |
| 1 | **Climax** | The faction makes its final push. This is the point of no return — a siege begins, a deal closes, a ritual starts, an assassination is attempted. If the party does not intervene this week, the agenda resolves. |
| 0 | **Resolution** | The faction achieves its goal (or fails, if interfered with). The world changes accordingly — power shifts, NPCs are affected, settlement traits may change. |

**Advancing Clocks:**

- Each week of downtime, the GM ticks one active faction agenda clock by 1 step (as step 3 of the Weekly Downtime Procedure).
- Not all factions advance every week — the GM chooses which agendas to advance based on narrative pacing. As a guideline, advance 1 faction clock per week. For settlements with many active factions, rotate between them.
- A **Threat** result (1) on the Settlement Event Table can also advance a faction clock by 1 additional tick, representing external pressure accelerating their plans.
- Players can **delay** a faction's clock by 1 tick through a successful downtime activity targeting that faction (Petition/Negotiate to convince them to wait, Carouse to learn their plans and spread counter-rumors, or direct action during an adventure).
- Players can **stop** a faction's agenda entirely by resolving the underlying conflict (through Social Intrigue, negotiation, sabotage, or combat — this becomes an adventure hook).

**Consequences of Resolution:**

When a faction agenda reaches 0, the GM determines the outcome based on the faction's resources and the nature of the agenda. Possible consequences include:

- A settlement trait changes (e.g., Trade Hub → Impoverished if a rival guild succeeds)
- NPC dispositions shift (allies of the faction improve by +1, opponents worsen by −1)
- Market availability changes (new goods appear or old ones become scarce)
- A new adventure hook emerges from the fallout
- A new faction agenda begins as a result

> **Design Note:** This system extends the Social Intrigue NPC profile format (Motivations, Pitfalls, Disposition) to factions, creating a consistent language for "entities with agendas" across the game. The 4-step clock is simpler than Blades in the Dark's variable-segment clocks, keeping bookkeeping low while still creating a clear narrative arc. The clock pairs naturally with the weekly event roll — a Threat result (1) can represent a faction making an aggressive move, while Traces (5) might hint at a faction in the Scheming or Maneuvering stage.

### 4.3 New Downtime Activities

The current activity list covers work, learning, social, recovery, and crafting. Several gaps remain:

#### Commission an Item

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 2 (Village) | Coin to pay the artisan | Item cost + 25% commission fee |

You hire a local artisan to craft an item for you. The artisan's skill is limited by the settlement rank (max item Quality = settlement rank + 1). The item is completed in a number of weeks equal to its required successes (see Craft an Item table), assuming the artisan works at a steady pace without the urgency of adventurer crafting.

You can attempt to rush the order or haggle the commission fee by rolling Spirit/Mind + Influence vs. hard Difficulty (TN 10):

**Blunder.** The artisan is offended and refuses the commission entirely. You cannot commission from this artisan again during this downtime.

**Failure.** No change to the standard terms.

**Weak.** Choose one: reduce the commission fee from 25% to 10%, **or** reduce the crafting time by 1 week (minimum 1 week).

**Strong.** Choose both of the above.

**Critical.** Both of the above, and the artisan offers a minor bonus — a cosmetic flourish, a small discount on materials, or priority for your next commission.

> **Design Note:** This provides an alternative to Craft an Item for characters without the Crafting skill, and makes settlement rank mechanically meaningful for non-crafting parties. The haggling roll has a meaningful risk (losing the commission entirely on a blunder) rather than being a free attempt at better terms.

#### Train with a Master

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 3 (Town) | A willing teacher with the relevant skill at rank 3+ | 200 coins/week |

You seek out a master practitioner and train under their guidance. Choose one skill you already have at rank 1 or higher. Roll the appropriate Attribute + Skill vs. hard Difficulty (TN 10).

**Blunder.** A training accident. Gain 1 Fatigue and roll on the Complication table.

**Failure.** You learn nothing new this week but gain +1 boon on your next Train with a Master attempt for this skill.

**Weak.** You gain a temporary edge. Choose one: gain +1 boon on your next skill test using this skill during your next adventure, **or** the master shares a useful piece of practical knowledge (the GM provides a specific tip, contact, or lore relevant to the skill).

**Strong.** You gain both benefits above.

**Critical.** Both of the above, **and** the intense training steels your confidence — gain +1 Resolve (max. 3).

> **Design Note:** Train with a Master provides temporary, adventure-applicable benefits rather than permanent advancement. It does not reduce XP costs or accelerate the skill rank progression — that system is intentionally paced by XP expenditure. The +1 boon on a future skill test rewards the time investment without breaking the progression curve. The critical success granting +1 Resolve is an immediate, consumable reward (Resolve is spent during play and recovered through rest) that represents the peak inspirational moment of mentorship.

#### Tend to Relationships

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 1 (Hamlet) | An NPC relationship to maintain | see table below |

You spend the week maintaining or improving a relationship with a specific NPC. This might involve helping with their work, sharing meals, offering gifts, or simply being present and reliable.

**Expenses** depend on the NPC's role and the approach you take:

| NPC Role | Typical Approach | Suggested Expenses |
|----------|-----------------|-------------------|
| Adventurer | Train together, share stories, help with a task | 25 coins/week (drinks, supplies) |
| Artisan | Assist in their workshop, source materials, commission work | 50 coins/week (materials, tools) |
| Authority | Attend court, deliver favors, make political appearances | 100 coins/week (gifts, formal attire, fees) |
| Scholar | Assist research, share knowledge, acquire rare texts | 50 coins/week (books, supplies, access fees) |
| Scoundrel | Run errands, keep secrets, provide cover or coin | 75 coins/week (bribes, debts, contraband) |
| Seeker | Travel together, share supplies, help with their quest | 25 coins/week (supplies, travel costs) |

**Skill Test** depends on the NPC's role and your chosen approach:

| NPC Role | Suggested Skill Tests |
|----------|----------------------|
| Adventurer | Strength + Athletics, Agility + Fighting, Spirit + Survival |
| Artisan | Strength/Agility + Crafting, Mind + Crafting |
| Authority | Spirit + Influence, Mind + Education |
| Scholar | Mind + Education, Mind + Lore, Spirit + Insight |
| Scoundrel | Agility + Stealth, Spirit + Streetwise, Mind + Insight |
| Seeker | Spirit + Influence, Mind + Nature, Spirit + Perception |

Roll the chosen Attribute + Skill vs. a Difficulty determined by the NPC's current disposition:

| Disposition | Difficulty |
|-------------|-----------|
| Hostile (−2) or Hateful (−3) | Extreme (14) |
| Suspicious (−1) | Very Hard (12) |
| Indifferent (0) | Hard (10) |
| Friendly (+1) | Medium (8) |
| Intimate (+2) | Easy (6) |

**Success.** The NPC's disposition toward you improves by 1 step (max. Intimate +2).

**Failure.** No change, but you maintain the current relationship.

**Blunder.** Your attempt backfires. The NPC's disposition worsens by 1 step.

> **Design Note:** This provides a dedicated downtime mechanism for the NPC relationship system, making disposition changes more deliberate and player-driven rather than purely narrative. The expense and skill tables are organized by NPC role, matching the existing relationship categories from the [NPCs and Relationships](../02-adventurers/05-npc-relations.md) system. The GM may adjust expenses and skill tests if the player proposes a creative approach that doesn't fit the suggestions.

### 4.4 Expanded Settlement Identity

Give each settlement mechanical identity beyond its rank by assigning traits. Settlement traits complement the worldbuilding tables in the [Random Settlement Generator](../10-gm-tools/01-random-tables/12-random-settlement.mdx) — those tables define *what* a settlement is (geography, culture, resources), while traits define *how it plays* mechanically during downtime.

**Assigning Traits:** Each settlement has 1–3 traits depending on its rank (Hamlet: 1 trait, Village: 1–2 traits, Town: 2–3 traits, City: 3 traits). Roll on the table below or choose traits that match the settlement's character.

**Settlement Traits Table (d20)**

| d20 | Trait | Mechanical Effect |
|-----|-------|-------------------|
| 1 | **Trade Hub** | +1 boon on Haggle rolls. Market inventory includes items from other regions. |
| 2 | **Military Outpost** | Weapons and armor available at +1 Quality above settlement rank. +1 boon on Learn a Skill (Fighting, Archery). |
| 3 | **Sacred Ground** | +1 boon on Provide Offering. Mysticism-related services available at reduced cost (75%). |
| 4 | **Arcane Academy** | Arcana-related services available. Spell scrolls and catalysts available at +1 Quality above settlement rank. |
| 5 | **Black Market** | Illegal and exotic goods available. +1 boon on Streetwise rolls during downtime. All market prices are 50% higher. |
| 6 | **Frontier Settlement** | Survival and Nature supplies are abundant (75% cost). Urban luxury goods are scarce (−1 Quality cap). |
| 7 | **Cosmopolitan** | NPC contacts from distant cultures available. +1 boon on Carouse. |
| 8 | **Impoverished** | All downtime expenses reduced by 25%, but available item Quality is −1 below settlement rank cap. |
| 9 | **Prosperous** | All downtime expenses increased by 25%, but available item Quality is +1 above settlement rank cap. |
| 10 | **Isolated** | Limited market inventory (−1 magic item slot, minimum 0). +1 bane on Haggle and Carouse. |
| 11 | **Artisan Quarter** | +1 boon on Craft an Item and Work a Crafting Profession. One additional crafting profession is available for learning. |
| 12 | **Scholarly Haven** | +1 boon on Research. Libraries and archives available. Education-related services at reduced cost (75%). |
| 13 | **Thieves' Den** | +1 boon on Streetwise and Stealth-related activities. Fencing stolen goods is easy. Risk of theft is higher (Complication table results of 4 "Unwanted Attention" involve criminals instead of authorities). |
| 14 | **Port Town** | +1 magic item slot from overseas trade. Travel by sea is available. Exotic materials appear in the market. |
| 15 | **Contested Territory** | Two or more factions actively compete for influence. Faction agenda clocks advance 1 additional tick per week. Petition/Negotiate expenses are doubled. |
| 16 | **Healing Springs** | +1 boon on Recover. Wounds heal 1 week faster. Alchemist supplies at reduced cost (75%). |
| 17 | **Haunted** | Strange occurrences are common. +1 boon on Lore and Arcana-related activities. Settle events of category 1 (Threat) always involve supernatural elements. |
| 18 | **Bountiful Land** | Food and rations at 50% cost. +1 boon on Nature-related activities. Manual Labour pays 50% more. |
| 19 | **War-Torn** | Weapons and armor are plentiful (−25% cost). Civilian goods are scarce (+50% cost). Mercenary work is readily available (Manual Labour pays double, but involves risk — roll on Complication table each week regardless of success). |
| 20 | **Ancient Ruins Nearby** | Exotic materials and artifacts occasionally surface in the market (+1 magic item slot). Lore and Education-related activities gain +1 boon. Adventure hooks are plentiful. |

> **Design Note:** The d20 table makes settlement traits rollable for random settlement creation, complementing the existing [Settlement Generator](../10-gm-tools/01-random-tables/12-random-settlement.mdx) tables for Geography, Resources, Culture, and Government. Roll once per trait slot (1–3 based on settlement rank). Re-roll duplicates. Traits can also be selected deliberately to match worldbuilding choices — a settlement rolled with "copper mining and smelting" as its resource naturally fits the Artisan Quarter trait, while one "threatened by bandits in hiding" suits War-Torn or Contested Territory.

---

## 5. New Tools for Players & GM

### 5.1 Settlement Market Procedure

A streamlined procedure for determining what magic items and rare goods are available in a settlement. This addresses the issue's request for "a streamlined procedure to determine magic items available in a settlement."

**Market Generation (GM, during downtime setup)**

1. **Determine market tier** from settlement rank:

| Settlement Rank | Max Item Quality | Magic Item Slots |
|-----------------|-----------------|------------------|
| 1 (Hamlet) | Q2 | 0 |
| 2 (Village) | Q3 | 1 |
| 3 (Town) | Q4 | 2 |
| 4 (City) | Q5 | 3 |

2. **Fill magic item slots** by rolling on the following table for each slot:

**Magic Item Category (d6)**

| d6 | Category |
|----|----------|
| 1 | Weapon (roll on weapon type subtable) |
| 2 | Armor or Shield |
| 3 | Wearable (ring, amulet, cloak, boots, etc.) |
| 4 | Consumable (potion, oil, scroll) |
| 5 | Spell Catalyst (wand, staff, orb) |
| 6 | GM's choice or re-roll |

3. **Determine Quality**: Each magic item is Q2 + 1d3 (producing Q3–Q5, capped at the settlement's max Quality). This means Villages (max Q3) stock only Q3 items, Towns (max Q4) stock Q3–Q4, and Cities (max Q5) stock the full range. Hamlets have no magic item slots.

4. **Determine specifics**: The GM selects or randomly determines the specific item type, material, and enchantment based on the settlement's character and traits.

**Market Refresh (Downtime Event)**

When a Situation Shift result (4) with sub-event [5] "Trade agreements shift — available goods change" occurs on the Settlement Event Table, the GM re-rolls one or more magic item slots, refreshing the available inventory. Alternatively, the GM may add one new item and remove one old item at any time they feel it's appropriate.

Players can also attempt to find specific items using the Haggle activity (modified to include searching for items to buy, not just selling).

> **Design Note:** This procedure is intentionally simple — a few dice rolls to generate a market skeleton, which the GM then flesh out. It draws inspiration from boardgame-style town phases (such as Shadows of Brimstone's Frontier Town) where available items are randomized each visit, creating a sense of discovery and encouraging adaptation.

### 5.2 Expanded Haggle Activity (Buy & Sell)

The current Haggle activity only covers selling items. Expand it to also cover searching for and buying specific items:

**Haggle — Buying (Addition)**

When searching for a specific item to buy (especially items at or above the settlement's normal Quality cap), spend the indicated expenses and roll Spirit/Mind + Influence/Streetwise vs. the Difficulty:

| Item Quality vs. Settlement Cap | Difficulty | Expenses |
|------|------------|----------|
| At or below cap | Automatic | Market price |
| Cap + 1 | TN 10 | 50 coins/week |
| Cap + 2 | TN 12 | 250 coins/week |
| Cap + 3 | TN 14 | 500 coins/week |

**Blunder.** You find nothing and attract unwanted attention (a con artist, a thief, or a suspicious authority figure).

**Failure.** You find nothing this week.

**Weak.** You find the item but at 120% market price.

**Strong.** You find the item at market price.

**Critical.** You find the item at 90% market price, or you find it with an unexpected bonus (better condition, included accessory, useful information from the seller).

### 5.3 Downtime Quick-Reference Sheet

A one-page reference for the GM to run downtime efficiently:

```
┌─────────────────────────────────────────────────────┐
│            DOWNTIME QUICK REFERENCE                  │
├─────────────────────────────────────────────────────┤
│ SETUP                                               │
│  1. Settlement Rank: ___  Traits: ___ (d20 table)   │
│  2. Market Slots: ___ (fill with Magic Item table)  │
│  3. Active Faction Agendas: ___                     │
│                                                     │
│ EACH WEEK                                           │
│  1. Each adventurer: declare + resolve activity     │
│  2. Roll Settlement Event (1d6)                     │
│  3. Advance faction agenda clocks (1 tick each)     │
│                                                     │
│ ACTIVITIES                                          │
│  Work:     Manual Labour, Work a Crafting Profession│
│  Learn:    Learn a Profession, Learn a Skill,       │
│            Research, Train with a Master             │
│  Social:   Carouse, Petition/Negotiate,             │
│            Tend to Relationships                     │
│  Recovery: Recover, Provide Offering                │
│  Commerce: Haggle (Buy & Sell), Commission an Item  │
│  Craft:    Craft an Item                            │
│                                                     │
│ SETTLEMENT EVENT TABLE (1d6)                        │
│  1: Threat (d6 sub-table)                           │
│  2: Wear and Tear (d6 sub-table)                    │
│  3: Expenses (d6 sub-table)                         │
│  4: Situation Shift (d6 sub-table)                  │
│  5: Traces (d6 sub-table)                           │
│  6: Ambient (d6 sub-table)                          │
│                                                     │
│ FACTION AGENDA CLOCK (4 steps)                      │
│  Scheming → Maneuvering → Acting → Climax → Resolve │
│                                                     │
│ COMPLICATION TABLE (d6)                             │
│  1: Injury (1 Fatigue)                              │
│  2: Reputation Hit (+1 bane next social roll)       │
│  3: Property Damage (50 coins or +1 bane)           │
│  4: Unwanted Attention (GM complication)             │
│  5: Lost Time (can't repeat activity next week)     │
│  6: Nothing Extra                                   │
└─────────────────────────────────────────────────────┘
```

### 5.4 Inspiration: Boardgame-Style Modular Downtime

Drawing on the Frontier Town expansion from Shadows of Brimstone, consider the following modular approach to downtime phases:

**Core Concept:** Each settlement visit is structured as a sequence of "town turns" where each character visits a location and resolves an encounter there. This creates a mini-game within the RPG session that keeps all players engaged and produces emergent stories.

**Adaptation for Nexus RPG:**

1. **Settlement Locations.** Each settlement has a number of locations equal to its rank + 2 (e.g., a Town has 5 locations). Locations are typed: Market, Tavern, Temple, Guild Hall, Training Ground, etc.
2. **Location Visits.** As a free activity during any downtime week, each adventurer can visit one location for a brief encounter (unrelated to their main downtime activity). The GM rolls or selects from a location-specific encounter table.
3. **Location Encounter Tables (d6 per location type).** Each location type has its own small encounter table. Results range from flavor (atmosphere, description) to mechanical consequences (find a small item, hear a rumor, meet an NPC, get pickpocketed).

**Example: Tavern Encounter Table (d6)**

| d6 | Encounter |
|----|-----------|
| 1 | **Bar Fight.** A brawl breaks out. Roll Strength + Fighting or Agility + Athletics vs. TN 8 or suffer 1 Fatigue. On a success, gain +1 reputation with the locals. |
| 2 | **Loose Lips.** An inebriated patron shares a rumor. The GM provides one piece of information relevant to current events or quests. |
| 3 | **Gambler's Challenge.** A gambler challenges you. Wager up to 50 coins and roll Mind + Insight vs. TN 8. Win: double your wager. Lose: lose your wager. |
| 4 | **Old Acquaintance.** You encounter someone from your past. The GM introduces a brief NPC interaction (potentially tied to backstory). |
| 5 | **Entertainment.** A performer captivates the crowd. Gain +1 boon on your next Carouse activity in this settlement. |
| 6 | **Quiet Night.** A peaceful evening. You rest well and start the next day refreshed. |

**Example: Market Encounter Table (d6)**

| d6 | Encounter |
|----|-----------|
| 1 | **Pickpocket!** Roll Agility + Perception vs. TN 8 or lose 2d6 coins. On a success, you catch the thief and can choose to turn them in (gain reputation) or let them go (they owe you a favor — potential NPC contact). |
| 2 | **Curiosity.** You spot an unusual item on a vendor's table. The GM describes something interesting (a potential quest hook, a minor magic item, or an exotic ingredient). It may be affordable or require haggling. |
| 3 | **Merchant Gossip.** A talkative merchant shares trade route information. You learn about conditions in a nearby settlement or region (useful for future travel). |
| 4 | **Supply Sale.** A merchant is clearing stock. One category of supplies (rations, materials, ammunition) is available at 75% cost this week. |
| 5 | **Exotic Trader.** A traveling merchant has arrived from a distant land. The market temporarily gains +1 magic item slot this week with items from a different culture or region. |
| 6 | **Busy Day.** The market is crowded but nothing special catches your eye. |

> **Design Note:** These location encounters are meant to be quick, flavorful interactions — resolved in 1–2 minutes of table time. They add texture to downtime without slowing the game. GMs can skip them entirely for speed or lean into them for rich downtime roleplay. The modular table structure means new location types and encounter tables can be added over time without changing the core procedure.

---

## 6. Summary of Recommendations

### Priority 1: Core Integration (Minimum Viable Changes)

| Change | Effort | Impact |
|--------|--------|--------|
| Add Downtime Procedure Checklist (Setup + Weekly) | Low | High — unifies downtime with travel/challenge pattern |
| Roll weekly settlement event (1d6, every week) | Low | High — mirrors travel daily events, world feels alive |
| Define the Complication Table | Low | Medium — fills a referenced but missing table |
| Expand Carouse activity with full outcomes + random table references | Low | High — connects to NPC system and GM tools |

### Priority 2: System Alignment (Recommended Changes)

| Change | Effort | Impact |
|--------|--------|--------|
| Align Craft an Item with challenge terminology | Medium | Medium — reduces parallel systems |
| Add Petition/Negotiate activity with expense framework | Medium | High — fills major gap, connects Social Intrigue to downtime |
| Expand Haggle to cover buying items | Low | Medium — fills practical gap |
| Faction Agenda subsystem (4-step clocks) | Medium | High — makes world dynamic, gives GM structured tool |

### Priority 3: Expansion Content (Future Development)

| Change | Effort | Impact |
|--------|--------|--------|
| Settlement Market Procedure | Medium | High — addresses magic item availability |
| Settlement Traits table (d20, rollable) | Medium | Medium — differentiates locations, integrates with settlement generator |
| New activities (Commission, Train, Tend to Relationships) | Medium | Medium — broadens player options |
| Location Encounter Tables (boardgame-style) | High | Medium — adds flavor and replayability |

### Document Structure Recommendations

If these proposals are implemented, the downtime documentation should be restructured:

```
docs/06-scenes/04-downtime/
├── 00-overview.md          (procedure + settlements + settlement traits)
├── 01-activities.md        (all activities, including new ones)
├── 02-settlement-events.md (event table + complication table)
├── 03-faction-agendas.md   (faction profiles + agenda clocks)
└── 04-market.md            (market generation + haggle buying)
```

### Next Steps

1. **Review and prioritize** — Discuss which changes to implement first based on campaign needs and development capacity.
2. **Playtest the weekly event roll** — Test the 1d6 Settlement Event Table with a real group over 4–6 weeks of downtime to validate pacing and variety.
3. **Write the Complication Table and expanded Carouse** — These are low-effort, high-impact changes that can be implemented immediately.
4. **Prototype faction agendas** — Test the 4-step clock system with 2–3 factions during a downtime phase to validate advancement pace.
5. **Build the settlement traits d20 table** — Integrate with the existing Random Settlement Generator as an additional rollable layer.
6. **Prototype the market procedure** — Test the magic item generation system with a few sample settlements to validate Quality distribution and variety.

---

## Appendix A: Cross-Reference Audit

### Systems That Reference Downtime

| System | Reference | Status |
|--------|-----------|--------|
| Scenes & Time Scales | Downtime = weekly time scale, free activities defined, Downtime Event Table included | ✅ Aligned |
| Crafting Professions | Referenced by Work a Crafting Profession and Craft an Item | ✅ Aligned |
| Harvesting | Materials feed into Craft an Item | ⚠️ No dedicated processing activity |
| NPC Relations | Disposition system exists but has minimal downtime hooks | ⚠️ Addressed by proposed Carouse expansion (§3.4) and Tend to Relationships (§4.3) |
| Challenges | Multi-step progress tracking exists in crafting but uses different terminology | ⚠️ Addressed by terminology alignment proposal (§3.3) |
| Social Intrigue | No downtime entry point | ❌ Addressed by proposed Petition/Negotiate activity (§3.5) |
| Travel | No downtime ↔ travel transition rules | ❌ Needs handoff procedure (future work) |
| Resting | Wound healing during downtime is mentioned (1 Wound/week auto-heal) | ✅ Aligned |
| Talents (Crafting) | Artisan and Efficient Worker directly reference downtime crafting | ✅ Aligned |

### Activities Referencing Undefined Tables

| Activity | Reference | Status |
|----------|-----------|--------|
| Manual Labour | "Roll on the Complication table" (Blunder) | ❌ Table undefined |
| Work a Crafting Profession | "Roll on the Complication table" (Blunder) | ❌ Table undefined |
| Research | "Roll on the Complication table" (Blunder) | ❌ Table undefined |

### Downtime Event Table (d6) — Currently Defined

Defined in Scenes & Time Scales (lines 125–134) with the standard six-category structure. The proposed Settlement Event Table (§4.1) follows this same 1d6 schema with settlement-specific sub-events (d6 each), rolled every week of downtime.

| d6 | Category | Downtime Variant |
|----|----------|-----------------|
| 1 | Threat | Trouble! — rival acts, threat materializes, obligation comes due |
| 2 | Wear and Tear | Tools/workspace/living conditions degrade |
| 3 | Resource Drain | Expenses — costs rise or income drops |
| 4 | Shift | Situation Shift — political/social/economic landscape changes |
| 5 | Traces | Rumors, leads, or patterns hinting at coming events |
| 6 | Ambient | Festival, quiet week, pleasant weather |
