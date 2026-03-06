# Downtime System — Design Analysis

> **Scope:** Compatibility of the current downtime system with the updated time scales, dice timers, challenges, travel, and social intrigue systems. Proposed changes, expansion opportunities, and new tools for players and GMs.
>
> **References:** [Downtime Overview](../06-scenes/04-downtime/00-overview.md) | [Downtime Activities](../06-scenes/04-downtime/activities.md) | [Scenes & Time Scales](../06-scenes/01-scenes-time-intervals.md) | [Challenges](../06-scenes/07-challenges.md) | [Social Intrigue](../06-scenes/08-social-intrigue.md) | [Travel](../06-scenes/09-travel.md) | [Crafting Professions](../06-scenes/05-crafting-professions.md) | [NPCs and Relationships](../02-adventurers/05-npc-relations.md)

---

## 1. Executive Summary

### Key Findings

1. **Core procedure is compatible** — Downtime already operates at the weekly time scale and uses per-activity skill rolls, which fit cleanly into the unified Scenes & Time Scales framework.
2. **Dice timer integration is implicit but undeveloped** — The Downtime Event Table exists in the time scales document, but the downtime rules themselves never reference it. There is no explicit procedure for when the dice timer ticks or when the Event Die is rolled during downtime.
3. **Challenge system is underused** — Multi-week activities (Craft an Item, Research) already track cumulative progress, but they do not use Challenge Dice formally. Aligning them with the challenge framework would unify procedures and reduce cognitive overhead.
4. **Social intrigue has no downtime entry point** — There is no downtime activity that bridges into the Social Intrigue system (e.g., petitioning a ruler, negotiating a trade agreement, lobbying a faction). The Carouse activity is incomplete and underspecified.
5. **Travel ↔ downtime handoff is missing** — No rules govern what happens when travel time overlaps with downtime (arriving mid-week, traveling between settlements during downtime, running errands to a nearby village).
6. **The world does not move** — Current downtime is purely player-driven. There is no mechanic that advances NPC agendas, faction movements, or world events while the party rests. Prolonged downtime carries no narrative risk.
7. **Settlement system is minimal** — Four settlement ranks exist but lack mechanical depth beyond item Quality caps. Settlements have no personality, no dynamic economy, and no event tables.
8. **Magic item availability is undefined** — Players can buy items up to the settlement rank in Quality, but there is no procedure for what specific items are available, how stock rotates, or how to discover rare finds.

### Design Principles (Inherited from Existing Systems)

1. **Unified time scale framework** — All scenes use the same action loop (Tick → Roll/Act → Results). Downtime should follow this pattern.
2. **Timer-driven pacing** — Dice timers create urgency and inject events. Downtime should use timers to prevent the phase from feeling static.
3. **Challenge-based progress** — Complex multi-step tasks use challenge dice. Multi-week downtime activities should optionally use this framework.
4. **Resource management matters** — Supplies, durability, fatigue, and coins are meaningful costs. Downtime should tax resources, not bypass them.
5. **NPCs and relationships are first-class** — The disposition system and NPC roles exist but have limited downtime hooks. Downtime should be a primary venue for building, maintaining, and testing relationships.

---

## 2. Compatibility Analysis

### 2.1 What Works

| System | Compatibility | Notes |
|--------|--------------|-------|
| **Time Scales** | ✅ Full | Downtime is already the weekly time scale. Each activity = one Action (~1 week). Free activities (errands, shop visits, meetings) are defined. |
| **Dice Timers** | ⚠️ Partial | The Downtime Event Table (d6) exists in the time scales doc, but the downtime rules never reference it. No procedure defines when the timer ticks. |
| **Event Die** | ⚠️ Partial | The six-category structure (Threat, Wear & Tear, Resource Drain, Shift, Traces, Ambient) is defined for downtime, but it is only an example — no guidance for GMs on when or how to customize it. |
| **Challenges** | ⚠️ Partial | Craft an Item already uses cumulative successes, which is mechanically similar to a challenge die. Research could also benefit. But neither activity formally references the challenge system. |
| **Social Intrigue** | ❌ Missing | No downtime activity feeds into or triggers a Social Intrigue. Carouse produces social outcomes but is underspecified and does not use the Interest/Patience/Motivation framework. |
| **Travel** | ❌ Missing | No rules for transitioning between travel and downtime, or for conducting short trips (to a nearby settlement) during a downtime phase. |
| **NPC Relations** | ⚠️ Partial | Carouse can produce NPC connections, but no activity explicitly uses the disposition system, NPC roles, or relationship mechanics. Addressed by proposed Carouse expansion (§3.5) and Tend to Relationships activity (§4.3). |
| **Crafting Professions** | ✅ Full | Work a Crafting Profession and Craft an Item both reference the professions system directly. |
| **Harvesting** | ⚠️ Partial | Harvested materials can be used in Craft an Item, but no downtime activity exists for processing, refining, or commissioning items from harvested parts. |

### 2.2 Identified Conflicts

1. **Timer ambiguity.** The action loop (Tick → Roll/Act → Results) implies that every downtime action should tick a timer. But if each player takes one activity per week, a party of four would tick the timer four times per week — the timer would expire almost every week. This is either intentional (one event per week per party) or needs calibration. See §3.2 for proposed resolution (one tick per week, not per activity).
2. **Crafting uses its own progress system.** Craft an Item tracks "required successes" with its own table, which is functionally identical to a challenge die but uses different terminology. This creates parallel systems for the same concept.
3. **Complication table is referenced but undefined.** Manual Labour, Work a Crafting Profession, and Research reference a "Complication table" on blunders, but no such table exists in the downtime rules.

### 2.3 Missing Integration Points

1. **No downtime procedure checklist** — Travel has a clear setup + daily checklist. Downtime has no equivalent step-by-step procedure for the GM.
2. **No weekly event procedure** — There is no defined moment when the dice timer ticks, the event die is rolled, and the world reacts.
3. **No faction/NPC advancement rules** — No mechanic allows NPC agendas, faction plots, or world events to advance during downtime.
4. **No settlement event tables** — The Downtime Event Table is generic. There are no settlement-specific tables (e.g., "City Events", "Hamlet Events") with contextually appropriate results.
5. **No item market procedure** — Players can buy items up to settlement rank Quality, but there is no procedure for determining what specific magic items, rare goods, or services are available.

---

## 3. Proposed Changes

### 3.1 Formalize the Downtime Procedure

Add a step-by-step procedure, mirroring the Travel Procedure's structure:

**Downtime Setup (GM, before play)**

1. Determine settlement rank and any special features (e.g., famous smithy, black market, temple of a specific deity).
2. Set the downtime dice timer (recommended: d6, ticking once per week of downtime).
3. Prepare or select a settlement event table (or use the default Downtime Event Table).
4. Note any active NPC agendas, faction goals, or world events that should advance during the downtime.

**Weekly Downtime Procedure (each week)**

1. **Tick** the downtime dice timer by 1.
2. Each adventurer **declares and resolves** their chosen downtime activity.
3. **Event check**: If the dice timer hits 0, roll on the Downtime Event Table (d6) and resolve the event. Reset the timer.
4. **World advancement** *(optional)*: The GM advances any active NPC agendas or faction events by one step.

> **Design Note:** With a d6 timer and one tick per week, the first event occurs after 6 weeks of downtime. For shorter stays, the GM can start the timer at a lower value (e.g., d4 starting at 4 for a volatile settlement). For longer stays, the timer resets after each event, creating a reliable cadence of world events interspersed with player activities.

### 3.2 Clarify Timer Tick Rate

Define that the downtime dice timer ticks once per **week** (not per activity). Each week is one "round" of downtime. All adventurers choose their activities simultaneously, then the timer ticks.

This avoids the issue of party size inflating tick rate and aligns with the Travel system where the timer ticks once per day regardless of party size.

### 3.3 Define the Complication Table

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

### 3.4 Align Craft an Item with the Challenge Framework

Reframe the Craft an Item multi-week tracking to use challenge terminology, reducing parallel systems:

- **Required Successes** → **Challenge Die** (e.g., Q4 item requires a d6 challenge die starting at 6).
- Each weekly crafting roll that succeeds reduces the challenge die by 1 (strong success: 2, critical: 3).
- Failures and blunders trigger crafting-specific consequences (material waste, flawed work) instead of generic challenge consequences.
- The weekly expenses, material costs, and profession requirements remain unchanged.

> **Design Note:** This is a terminology and framing change, not a mechanical overhaul. The numbers stay the same. The benefit is that players and GMs use one unified language for "multi-step progress tracking" across crafting, chases, research, and other challenges.

### 3.5 Expand the Carouse Activity

The current Carouse activity is a skeleton (bullet-point outcomes, no full procedure). Expand it to:

**Carouse (Revised)**

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 1 (Hamlet) | — | 50 coins/week |

You spend the week socializing — frequenting taverns, attending gatherings, making introductions, or exploring the local scene. Roll Spirit/Mind + Streetwise vs. medium Difficulty (TN 8).

You can also multiply this activity's expenses by any factor up to the settlement rank and gain a number of boons on the roll equal to the expense multiplier (representing more lavish entertainment and access to higher social circles).

**Blunder.** You cause a scene. Roll on the Complication table. Additionally, one of your existing NPC relationships in this settlement worsens by 1 step (GM's choice).

**Failure.** An uneventful week. You enjoy yourself but learn nothing useful and make no lasting connections.

**Weak.** Choose one: learn a local rumor relevant to your interests (GM provides a lead or clue), **or** make a new acquaintance (add an Indifferent NPC relationship with a role appropriate to the settlement).

**Strong.** Choose two of the above, **or** improve an existing NPC relationship in this settlement by 1 step.

**Critical.** Choose two of the above **and** gain +1 Resolve (max. 3).

> **Design Note:** This revision ties Carouse directly to the NPC relationship and disposition system, making it the primary downtime tool for building social networks. The expense multiplier mirrors Learn a Skill's scaling mechanic.

### 3.6 Add a Downtime Social Intrigue Entry Point

Create a new activity or clarify that Social Intrigue challenges can be initiated during downtime:

**Petition / Negotiate (New Activity)**

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 2 (Village) | An NPC or faction with whom you have a specific request | varies |

When you need to convince an NPC or faction of something significant — securing a trade deal, requesting military aid, gaining access to a restricted archive, or resolving a dispute — you initiate a Social Intrigue challenge during downtime.

Follow the full [Social Intrigue](../06-scenes/08-social-intrigue.md) rules. The Patience die, Interest, Motivations, and Pitfalls are set by the GM based on the NPC and the request. Each exchange in the Social Intrigue takes place during one week of downtime (rather than minutes in a conversation). This represents ongoing meetings, negotiations, and political maneuvering.

Expenses depend on the scope of the negotiation (gifts, bribes, hosting feasts, legal fees, etc.) and are determined by the GM based on the situation.

> **Design Note:** This explicitly connects the Social Intrigue system to downtime, filling the identified gap. The weekly-exchange pacing makes Social Intrigue feel appropriately weighty for political or factional negotiations.

---

## 4. Expansion Opportunities

### 4.1 World Advancement: The Living Settlement

The most significant expansion opportunity is making the world move during downtime. Currently, downtime is a static safe haven — the party rests, the world waits. The issue description explicitly calls for mechanics showing that "the world is moving on, changing, and adapting" and that "prolonged downtime should be both an opportunity for improvement but also a risk of unforeseen turbulences."

**Proposed Mechanic: Settlement Events**

Each time the downtime dice timer expires (typically every 6 weeks with a d6), the GM rolls on a settlement event table. These events affect the settlement, its inhabitants, and potentially the party.

The Downtime Event Table (already defined in Scenes & Time Scales) provides the framework. Below is an expanded, settlement-rank-aware version:

**Settlement Event Table (2d6)**

| 2d6 | Event Category | Effect |
|-----|---------------|--------|
| 2 | **Crisis!** | A major threat to the settlement: siege, plague, famine, natural disaster, or monster attack. All downtime activities are suspended until the crisis is resolved. The party may choose to help (adventure hook) or flee. |
| 3 | **Faction Conflict** | Two local factions escalate tensions. The party may be drawn in. One NPC relationship worsens by 1 step (GM's choice based on faction allegiance). |
| 4 | **Economic Downturn** | Prices rise. All downtime activity expenses increase by 50% for the next 1d6 weeks. |
| 5 | **Trouble Brewing** | A rival, old enemy, or new threat appears in the settlement. The GM introduces a specific antagonist or complication tied to a party member's backstory or previous adventures. |
| 6 | **Market Shift** | The settlement's available goods change. The GM re-rolls or adjusts the settlement's market inventory (see Section 5.1). One category of items becomes scarce; another becomes abundant. |
| 7 | **Quiet Week** | Nothing significant occurs. The settlement is peaceful. |
| 8 | **Opportunity** | A chance for profit or advancement: a merchant seeks guards for a caravan, a patron offers a commission, or a rare resource is discovered nearby. |
| 9 | **Rumor Mill** | Interesting information circulates. Each adventurer who succeeds on a Spirit/Mind + Perception or Streetwise test (TN 8) learns one rumor relevant to their interests or current quests. |
| 10 | **NPC Event** | Something happens to one of the party's NPC contacts. Roll d6: [1–2] Their situation worsens (disposition drops by 1 or they face trouble). [3–4] They reach out with a request or offer. [5–6] Their situation improves (disposition rises by 1 or they gain influence). |
| 11 | **Festival or Celebration** | A local festival occurs. All Carouse activities this week gain +1 boon. One free Carouse attempt is available at no expense cost. |
| 12 | **Windfall!** | Unexpected good fortune: a rare item appears on the market, an NPC offers a gift, or the settlement prospers. The GM determines the specific benefit based on context. |

> **Design Note:** This table uses 2d6 for a bell curve distribution, making "Quiet Week" (7) the most common result and extreme events (Crisis, Windfall) rare. This mirrors the natural rhythm of settlement life and prevents downtime from feeling like a constant emergency.

### 4.2 NPC Agenda Advancement

For GMs who want to run living-world downtime, add an optional rule:

**NPC Agenda Advancement (Optional)**

Each significant NPC with an active agenda advances their plan by one step per month of downtime (approximately every 4 weeks). The GM tracks NPC agendas using a simple three-step structure:

1. **Scheming** — The NPC begins working toward their goal. Clues or rumors about their plans may reach the party.
2. **Acting** — The NPC takes visible action. The party can observe or interfere.
3. **Resolution** — The NPC achieves their goal (or fails if interfered with). The world changes accordingly.

The pace can be accelerated (one step per 2 weeks) for urgent threats or slowed (one step per 6 weeks) for patient schemers.

> **Design Note:** This gives the GM a lightweight tool for making the world feel dynamic without requiring complex bookkeeping. It pairs naturally with the Settlement Event Table — an NPC Event result (10 on 2d6) can be tied to a specific agenda step.

### 4.3 New Downtime Activities

The current activity list covers work, learning, social, recovery, and crafting. Several gaps remain:

#### Commission an Item

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 2 (Village) | Coin to pay the artisan | Item cost + 25% commission fee |

You hire a local artisan to craft an item for you. The artisan's skill is limited by the settlement rank (max item Quality = settlement rank + 1). The item is completed in a number of weeks equal to its required successes (see Craft an Item table), assuming the artisan works at a steady pace without the urgency of adventurer crafting.

You can attempt to reduce the time or cost by rolling Mind/Spirit + Influence vs. hard Difficulty (TN 10) to negotiate better terms.

> **Design Note:** This provides an alternative to Craft an Item for characters without the Crafting skill, and makes settlement rank mechanically meaningful for non-crafting parties.

#### Train with a Master

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 3 (Town) | A willing teacher with the relevant skill at rank 3+ | 200 coins/week |

You seek out a master practitioner and train under their guidance. Choose one skill you already have at rank 1 or higher. Roll the appropriate Attribute + Skill vs. hard Difficulty (TN 10).

**Blunder.** A training accident. Gain 1 Fatigue and roll on the Complication table.

**Failure.** You learn nothing new this week but gain +1 boon on your next attempt.

**Weak.** You gain a valuable insight. The next time you spend XP on this skill, reduce the cost by 1 XP (minimum 1).

**Strong.** As weak, and you may immediately re-roll one failed skill test using this skill during your next adventure.

**Critical.** As strong, and the master shares a rare technique — you learn a specific piece of lore, tactical advice, or contact relevant to the skill.

> **Design Note:** This provides an alternative path to skill advancement that leverages NPC relationships (the master must be willing) and settlement infrastructure. It does not replace spending XP but makes it more efficient.

#### Tend to Relationships

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 1 (Hamlet) | An NPC relationship to maintain | varies (gifts, time, favors) |

You spend the week maintaining or improving a relationship with a specific NPC. This might involve helping with their work, sharing meals, offering gifts, or simply being present and reliable.

Roll the appropriate Attribute + Skill vs. a Difficulty determined by the NPC's current disposition:

| Disposition | Difficulty |
|-------------|-----------|
| Hostile (−2) or Hateful (−3) | Extreme (14) |
| Suspicious (−1) | Very Hard (12) |
| Indifferent (0) | Hard (10) |
| Friendly (+1) | Medium (8) |
| Intimate (+2) | Easy (6) |

The relevant Attribute + Skill depends on the NPC's role and the approach you take (e.g., Strength + Athletics to help an Adventurer train, Mind + Education to assist a Scholar's research, Spirit + Influence to attend an Authority's court).

**Success.** The NPC's disposition toward you improves by 1 step (max. Intimate +2).

**Failure.** No change, but you maintain the current relationship.

**Blunder.** Your attempt backfires. The NPC's disposition worsens by 1 step.

> **Design Note:** This provides a dedicated downtime mechanism for the NPC relationship system, making disposition changes more deliberate and player-driven rather than purely narrative.

### 4.4 Expanded Settlement Identity

Give each settlement mechanical identity beyond its rank:

**Settlement Traits (1–3 per settlement)**

| Trait | Effect |
|-------|--------|
| **Trade Hub** | +1 boon on Haggle rolls. Market inventory includes items from other regions. |
| **Military Outpost** | Weapons and armor available at +1 Quality above settlement rank. +1 boon on Learn a Skill (Fighting, Archery). |
| **Sacred Ground** | +1 boon on Provide Offering. Mysticism-related services available at reduced cost. |
| **Arcane Academy** | Arcana-related services available. Spell scrolls and catalysts available at +1 Quality above settlement rank. |
| **Black Market** | Illegal goods available. +1 boon on Streetwise rolls. Prices are 50% higher. |
| **Frontier Settlement** | Survival and Nature supplies are abundant. Urban goods are scarce (−1 Quality cap). |
| **Cosmopolitan** | NPC contacts from distant cultures available. +1 boon on Carouse. |
| **Impoverished** | All expenses reduced by 25%, but available item Quality is −1. |
| **Prosperous** | All expenses increased by 25%, but available item Quality is +1. |
| **Isolated** | Limited market inventory. −1 bane on Haggle and Carouse. |

> **Design Note:** Settlement traits make downtime location-dependent, encouraging parties to choose destinations based on their downtime goals. They also give the GM a fast tool for differentiating settlements without extensive worldbuilding.

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

When a "Market Shift" result (6) occurs on the Settlement Event Table, the GM re-rolls all magic item slots, replacing the current inventory. Alternatively, the GM may add one new item and remove one old item.

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
│  1. Settlement Rank: ___  Traits: ___               │
│  2. Dice Timer: d___ starting at ___                │
│  3. Market Slots: ___ (fill with Magic Item table)  │
│  4. Active NPC Agendas: ___                         │
│                                                     │
│ EACH WEEK                                           │
│  1. Tick timer (−1)                                 │
│  2. Each adventurer: declare + resolve activity     │
│  3. If timer = 0: roll Settlement Event (2d6)       │
│     → Reset timer                                   │
│  4. (Optional) Advance NPC agendas                  │
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
│ SETTLEMENT EVENT TABLE (2d6)                        │
│  2: Crisis! │ 3: Faction Conflict │ 4: Econ Down   │
│  5: Trouble │ 6: Market Shift     │ 7: Quiet Week  │
│  8: Opportunity │ 9: Rumors │ 10: NPC Event        │
│  11: Festival   │ 12: Windfall!                     │
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
| Clarify timer tick rate (1/week, not 1/activity) | Low | Medium — removes ambiguity |
| Define the Complication Table | Low | Medium — fills a referenced but missing table |
| Expand Carouse activity with full outcomes | Low | High — connects to NPC system |

### Priority 2: System Alignment (Recommended Changes)

| Change | Effort | Impact |
|--------|--------|--------|
| Align Craft an Item with challenge terminology | Medium | Medium — reduces parallel systems |
| Add Petition/Negotiate activity (Social Intrigue bridge) | Medium | High — fills major gap |
| Expand Haggle to cover buying items | Low | Medium — fills practical gap |
| Add Settlement Event Table (2d6) | Medium | High — makes world feel alive |

### Priority 3: Expansion Content (Future Development)

| Change | Effort | Impact |
|--------|--------|--------|
| Settlement Market Procedure | Medium | High — addresses magic item availability |
| Settlement Traits system | Medium | Medium — differentiates locations |
| New activities (Commission, Train, Tend to Relationships) | Medium | Medium — broadens player options |
| NPC Agenda Advancement rules | Low | High — makes world dynamic |
| Location Encounter Tables (boardgame-style) | High | Medium — adds flavor and replayability |

### Document Structure Recommendations

If these proposals are implemented, the downtime documentation should be restructured:

```
docs/06-scenes/04-downtime/
├── 00-overview.md          (procedure + settlements + settlement traits)
├── 01-activities.md        (all activities, including new ones)
├── 02-settlement-events.md (event tables + complication table)
└── 03-market.md            (market generation + haggle buying)
```

### Next Steps

1. **Review and prioritize** — Discuss which changes to implement first based on campaign needs and development capacity.
2. **Playtest the procedure** — Test the Downtime Procedure Checklist and timer tick rate with a real group to validate pacing.
3. **Write the Complication Table and expanded Carouse** — These are low-effort, high-impact changes that can be implemented immediately.
4. **Design settlement event tables** — Start with the 2d6 table above and customize for specific campaign settlements.
5. **Prototype the market procedure** — Test the magic item generation system with a few sample settlements to validate Quality distribution and variety.

---

## Appendix A: Cross-Reference Audit

### Systems That Reference Downtime

| System | Reference | Status |
|--------|-----------|--------|
| Scenes & Time Scales | Downtime = weekly time scale, free activities defined, Downtime Event Table included | ✅ Aligned |
| Crafting Professions | Referenced by Work a Crafting Profession and Craft an Item | ✅ Aligned |
| Harvesting | Materials feed into Craft an Item | ⚠️ No dedicated processing activity |
| NPC Relations | Disposition system exists but has minimal downtime hooks | ⚠️ Addressed by proposed Carouse expansion (§3.5) and Tend to Relationships (§4.3) |
| Challenges | Multi-step progress tracking exists in crafting but uses different terminology | ⚠️ Addressed by terminology alignment proposal (§3.4) |
| Social Intrigue | No downtime entry point | ❌ Addressed by proposed Petition/Negotiate activity (§3.6) |
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

Defined in Scenes & Time Scales (lines 125–134) with the standard six-category structure. Not referenced by downtime rules themselves.

| d6 | Category | Downtime Variant |
|----|----------|-----------------|
| 1 | Threat | Trouble! — rival acts, threat materializes, obligation comes due |
| 2 | Wear and Tear | Tools/workspace/living conditions degrade |
| 3 | Resource Drain | Expenses — costs rise or income drops |
| 4 | Shift | Situation Shift — political/social/economic landscape changes |
| 5 | Traces | Rumors, leads, or patterns hinting at coming events |
| 6 | Ambient | Festival, quiet week, pleasant weather |
