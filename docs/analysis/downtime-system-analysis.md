# Downtime System — Design Analysis

> **Scope:** Compatibility of the current downtime system with the updated time scales, dice timers, challenges, travel, and social intrigue systems. Proposed changes, expansion opportunities, and new tools for players and GMs.
>
> **References:** [Downtime Overview](../06-scenes/04-downtime/00-overview.md) | [Downtime Activities](../06-scenes/04-downtime/activities.md) | [Scenes & Time Scales](../06-scenes/01-scenes-time-intervals.md) | [Challenges](../06-scenes/07-challenges.md) | [Social Intrigue](../06-scenes/08-social-intrigue.md) | [Travel](../06-scenes/09-travel.md) | [Crafting Professions](../06-scenes/05-crafting-professions.md) | [NPCs and Relationships](../02-adventurers/05-npc-relations.md)

---

## 1. Executive Summary

### Key Findings

1. **Core procedure is compatible** — Downtime already operates at the weekly time scale and uses per-activity skill rolls, which fit cleanly into the unified Scenes & Time Scales framework.
2. **Weekly event roll needed** — The Downtime Event Table exists in the time scales document, but the downtime rules never reference it. The proposed approach rolls 1d6 every week (mirroring travel's daily event roll).
3. **Social intrigue has no downtime entry point** — No downtime activity bridges into the Social Intrigue system. Carouse is incomplete and underspecified.
4. **The world does not move** — Current downtime is purely player-driven. There is no mechanic for faction agendas, settlement events, or world advancement during rest. Prolonged downtime carries no narrative risk.
5. **Settlement system is minimal** — Four settlement ranks exist but lack mechanical depth beyond item Quality caps. No distinctive traits, no dynamic economy, no event tables.
6. **Magic item availability is undefined** — No procedure for what specific items are available, how stock rotates, or how to discover rare finds.
7. **Fatigue healing during downtime is unregulated** — Since normal resting removes up to 2 Fatigue per night, Fatigue suffered during downtime (from events, complications, or activities) has no lasting impact. Lingering Fatigue needs special treatment to carry meaningful weight into the next adventure.

### Design Principles

1. **Unified time scale framework** — All scenes use the same action loop. Downtime follows this pattern: Declare → Roll/Act → Event → Consequences.
2. **Weekly event pacing** — Just as travel rolls a daily event after each day, downtime rolls a weekly event after each week.
3. **Resource management matters** — Coins, Fatigue, and reputation are meaningful costs. Downtime should tax resources, not bypass them.
4. **NPCs and relationships are first-class** — The disposition system and NPC roles should be a primary venue for building, maintaining, and testing relationships during downtime.
5. **Living world** — The world moves during downtime. Factions advance agendas, settlements change, and prolonged rest carries narrative risk alongside its benefits.

---

## 2. Compatibility Analysis

### What Works

| System | Status | Notes |
|--------|--------|-------|
| **Time Scales** | ✅ | Downtime is the weekly time scale. Each activity = one Action (~1 week). Free activities defined. |
| **Crafting** | ✅ | Work a Crafting Profession and Craft an Item reference the professions system directly. |
| **Resting** | ✅ | Wound healing during downtime (1 Wound/week auto-heal) is defined. |

### Partial Gaps

| System | Status | Issue | Addressed In |
|--------|--------|-------|-------------|
| **Event Die** | ⚠️ | Six-category structure exists in time scales doc but downtime rules never reference it. | §3.1 |
| **Challenges** | ⚠️ | Craft an Item uses cumulative successes (functionally identical to challenge dice) but different terminology. | §3.3 |
| **NPC Relations** | ⚠️ | Disposition system exists but almost no downtime hooks. | §3.4, §4.3 |

### Missing Integration

| System | Status | Gap | Addressed In |
|--------|--------|-----|-------------|
| **Social Intrigue** | ❌ | No downtime activity triggers a Social Intrigue. | §3.5 |
| **Faction Advancement** | ❌ | No mechanic for world/NPC agendas to advance during downtime. | §4.2 |
| **Settlement Events** | ❌ | No event tables for settlement-level happenings. | §4.1 |
| **Market Procedure** | ❌ | No procedure for available magic items or stock rotation. | §5.1 |
| **Lingering Fatigue** | ❌ | Fatigue from downtime events/complications heals too easily through normal nightly rest. | §3.6 |

### Conflicts

1. **Complication table undefined.** Manual Labour, Work a Crafting Profession, and Research reference a "Complication table" on blunders, but no such table exists. Defined in §3.2.
2. **Crafting uses parallel progress terminology.** Craft an Item tracks "required successes" — functionally identical to a challenge die but differently named. Alignment proposed in §3.3.

---

## 3. Proposed Changes

### 3.1 Formalize the Downtime Procedure

Add a step-by-step procedure, mirroring the Travel Procedure's structure:

**Downtime Setup (GM, before play)**

1. Determine settlement rank and traits (roll on the Settlement Traits table, §4.4).
2. Generate the settlement market inventory (§5.1).
3. Note any active faction agendas and their current dice timer values (§4.2).

**Weekly Downtime Procedure (each week)**

1. Each adventurer **declares and resolves** their chosen downtime activity.
2. **Roll weekly event**: Roll 1d6 on the Settlement Event Table (§4.1) and resolve the result.
3. **Faction advancement**: Tick down active faction agenda dice timers by 1 (§4.2).

> **Design Note:** Rolling an event every week ensures downtime is never static — the world moves regardless of what the party does. This directly mirrors travel's daily event roll. The GM can always skip or replace the roll for a given week if the narrative demands it.

### 3.2 Define the Complication Table

Activities referencing a "Complication table" on blunders (Manual Labour, Work a Crafting Profession, Research) use this table:

**Complication Table (d6)**

| d6 | Complication |
|----|--------------|
| 1 | **Injury.** Gain 1 Lingering Fatigue (see §3.6). |
| 2 | **Reputation Hit.** Word spreads. Suffer +1 bane on your next social interaction in this settlement. |
| 3 | **Property Damage.** Pay 50 coins for repairs or suffer +1 bane on your next use of the same activity. |
| 4 | **Unwanted Attention.** Your failure draws scrutiny from an authority, rival, or criminal element. The GM introduces a minor complication. If a faction agenda is active and the attention is related, the GM may advance that faction's dice timer by 1 instead. |
| 5 | **Lost Time.** You cannot use this activity again next week. |
| 6 | **Nothing Extra.** The blunder is bad enough on its own. |

### 3.3 Align Craft an Item with the Challenge Framework

Reframe Craft an Item multi-week tracking to use challenge terminology:

- **Required Successes** → **Challenge Die** (e.g., Q4 item requires a d6 challenge die starting at 6).
- Each weekly crafting roll that succeeds reduces the challenge die by 1 (strong success: 2, critical: 3).
- Weekly expenses, material costs, and profession requirements remain unchanged.

> **Design Note:** This is a terminology change, not a mechanical overhaul. The numbers stay the same. The benefit is unified language for "multi-step progress tracking" across crafting, research, and other challenges.

### 3.4 Expand the Carouse Activity

The current Carouse activity is a skeleton. Expand it:

**Carouse (Revised)**

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 1 (Hamlet) | — | 50 coins/week |

You spend the week socializing — frequenting taverns, attending gatherings, making introductions. Roll Spirit/Mind + Streetwise vs. medium Difficulty (TN 8).

You can multiply this activity's expenses by any factor up to the settlement rank and gain a number of boons on the roll equal to the expense multiplier.

**Blunder.** You cause a scene. Roll on the Complication table. If you have NPC relationships in this settlement, one worsens by 1 step (GM's choice). If you have none, you make a bad impression — roll on the NPC Role Table (see §3.7) and gain a new NPC relationship at Suspicious (−1) disposition.

**Failure.** An uneventful week. No useful connections.

**Weak.** Choose one: generate a rumor using the [Quest Hooks](../10-gm-tools/01-random-tables/10-random-quests.mdx) random tables, **or** gain a new NPC relationship at Indifferent (0) disposition — roll on the NPC Role Table (§3.7) to determine the NPC's role.

**Strong.** Choose two from the Weak options, **or** improve an existing NPC relationship by 1 step.

**Critical.** Choose two from the Weak options **and** gain +1 Resolve (max. 3).

> **Design Note:** Every social outcome now offers the alternative of gaining a *new* NPC relationship, covering the case where adventurers are new to a settlement with no contacts. The NPC Role Table (§3.7) determines who they meet. Rumors use the existing [Quest Hooks random tables](../10-gm-tools/01-random-tables/10-random-quests.mdx).

### 3.5 Petition / Negotiate (New Activity)

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 2 (Village) | An NPC or faction with a specific request | see table below |

When you need to convince an NPC or faction of something significant — securing a trade deal, requesting military aid, gaining access to a restricted archive — you initiate a [Social Intrigue](../06-scenes/08-social-intrigue.md) challenge during downtime.

Each exchange takes one week of downtime. The Patience die, Interest, Motivations, and Pitfalls are set per the Social Intrigue rules. The NPC's disposition toward you modifies the starting Interest (as per Social Intrigue: disposition modifier + request alignment modifier).

**Weekly Expenses** scale with scope:

| Scope | Weekly Expenses | Examples |
|-------|----------------|---------|
| Minor | 50 coins/week | Access to a restricted area, a letter of introduction, a small favor |
| Moderate | 200 coins/week | A trade agreement, military escort, minor faction alliance |
| Major | 500 coins/week | Military aid, exclusive trade rights, an audience with a ruler |
| Grand | 1,000+ coins/week | Treaties between city-states, legendary artifact access |

On a **blunder** during any exchange, the expenses for that week are wasted and the GM chooses one: double next week's expenses, the NPC adds a new Pitfall reflecting growing distrust, or you suffer +1 bane on all Influence rolls in this settlement for 1d6 weeks.

If the Intrigue ends in a **Breakdown** (Interest drops to −2 or lower), the NPC's disposition toward you worsens by 1 step. If it ends in a **Full Success** (+3 Interest), the NPC's disposition improves by 1 step.

Players who have no existing relationship with the target NPC must first establish one — through Carouse, Tend to Relationships, or narrative means — before initiating a Petition/Negotiate.

> **Design Note:** This connects Social Intrigue to downtime. The NPC disposition directly affects starting Interest, making relationship-building through other activities a meaningful prerequisite for political maneuvering. Breakdown consequences ensure failed negotiations have lasting social costs.

### 3.6 Lingering Fatigue

Fatigue suffered during downtime — from settlement events, complication table results, or activity failures — represents lingering stress, social exhaustion, or chronic strain that doesn't simply disappear with a night's sleep.

**Rule: Lingering Fatigue persists.**

Fatigue gained during a downtime phase is **not removed by normal nightly rest**. It can only be removed by:

- The **Recover** downtime activity (heals all Wounds and removes all Lingering Fatigue).
- The **Provide Offering** activity (on success, removes 1 Lingering Fatigue in addition to its normal +1 Resolve benefit).
- The **Leisure** activity (see §4.3) — spending a week on deliberate rest and recreation. Removes all Lingering Fatigue.

Any Lingering Fatigue remaining at the end of the downtime phase carries into the next adventure.

> **Design Note:** Normal resting removes up to 2 Fatigue per night, which means any Fatigue suffered during downtime would vanish overnight with no consequence. This rule ensures Lingering Fatigue has teeth — it's a meaningful cost that incentivizes the Recover and Leisure activities and creates tension between productive weeks and rest weeks. The carry-over into adventuring is the key stakes: a party that pushes through 6 weeks of intensive downtime without resting may start their next quest weakened. Adventurers must always declare an activity each week — there is no "doing nothing" option — but Leisure is the explicit rest activity for those who need it.

### 3.7 NPC Role Table

When a downtime activity calls for gaining a new NPC relationship and the GM has no specific NPC in mind, roll on this table to determine the NPC's role:

**NPC Role Table (d6)**

| d6 | NPC Role |
|----|----------|
| 1 | Adventurer |
| 2 | Artisan |
| 3 | Authority |
| 4 | Scholar |
| 5 | Scoundrel |
| 6 | Seeker |

The GM determines the NPC's name, personality, and specifics based on the settlement. Use the [NPC Generator](../10-gm-tools/01-random-tables/11-social-intrigue.mdx) random tables for further detail if needed.

---

## 4. Expansion: Living World

### 4.1 Settlement Event Table

Each week of downtime, after activities are resolved, roll 1d6 on this table. Events affect the settlement — the party may be affected or choose to get involved, but events are not targeted at them directly.

**Settlement Event Table (1d6, rolled every week)**

#### 1 — Trouble

A danger or conflict erupts. Roll d6 for specifics:

| d6 | Event | Resolution |
|----|-------|------------|
| 1 | **Faction Move.** A faction makes a visible power play. Advance that faction's agenda dice timer by 1 additional tick this week. If no faction agenda is active, the GM starts a new one — roll on the Faction Goal table (§4.2) to determine the agenda. | The GM describes the faction's action. Players can intervene through Petition/Negotiate or direct action (adventure hook). |
| 2 | **Raid or Attack.** Bandits, monsters, or raiders threaten the settlement's outskirts. | Each adventurer can choose to help defend (Strength/Agility + Fighting vs. TN 10). Success: gain +1 disposition with a local Authority NPC (or gain a new Authority NPC at Friendly). Failure: suffer 1 Wound. Ignoring: no immediate penalty, but the GM may escalate the threat next week. |
| 3 | **Disease or Blight.** A sickness spreads through a district. | Recover activity costs double next week. Each adventurer rolls Strength + Fortitude vs. TN 8 or gains 1 Lingering Fatigue. Characters with Nature can attempt to help (Mind + Nature vs. TN 10 — success: remove the event's effects). |
| 4 | **Old Enemy.** An old threat to the settlement resurfaces — a rival, a curse, or a buried danger. | Adventure hook. The GM defines the threat based on the settlement's history (use the [Settlement Generator](../10-gm-tools/01-random-tables/12-random-settlement.mdx) Historical Events table for inspiration). |
| 5 | **Natural Disaster.** Flood, fire, earthquake, or severe storm. | Infrastructure damage: one market slot is temporarily unavailable until next Situation Shift. All outdoor activities suffer +1 bane next week. Each adventurer rolls Agility + Athletics vs. TN 8 or suffers 1 Lingering Fatigue. |
| 6 | **Betrayal or Upheaval.** A political betrayal, coup attempt, or sudden power vacuum. | One faction's disposition toward the party shifts by −1 (or +1 if the party is seen as an ally of the new order). Settlement governance may change — the GM adjusts accordingly. |

#### 2 — Wear and Tear

Equipment, infrastructure, or living conditions degrade. Roll d6:

| d6 | Event | Resolution |
|----|-------|------------|
| 1 | **Workshop Damage.** A key workshop or forge is damaged. | Craft an Item and Commission an Item activities suffer +1 bane next week. Artisan NPCs may lose 1 disposition step toward the party if they were using the workshop. |
| 2 | **Road Damage.** A major road or bridge is damaged. | Travel to/from the settlement takes +1 day until repaired. Haggle (Buying) suffers +1 bane next week. |
| 3 | **Supply Spoilage.** Stored goods spoil or are ruined. | Each adventurer's stored materials (if any) require a Supply check or lose 1 unit. Market prices increase by 25% next week. |
| 4 | **Housing Trouble.** Lodgings are damaged or overbooked. | Pay 25 coins extra for temporary lodging, or accept a bad night (no resting benefits for this week). |
| 5 | **Equipment Wear.** Each adventurer chooses one item: it requires a Durability check or loses 1 use. | Adventurers who brought equipment into the settlement are affected. |
| 6 | **Service Disruption.** A key service (healer, temple, library) is temporarily unavailable. | The corresponding activity (Recover, Provide Offering, Research) cannot be taken next week. |

#### 3 — Expenses

Economic pressure mounts. Roll d6:

| d6 | Event | Resolution |
|----|-------|------------|
| 1 | **Tax Increase.** Local authorities demand additional levies. | All activity expenses increase by 50% next week. |
| 2 | **Trade Disruption.** A key trade route is blocked or raided. | One category of goods (GM's choice) becomes scarce: prices double for related items next week. |
| 3 | **Price Gouging.** A merchant guild or monopoly raises prices. | One specific service or material costs 50% more until a Situation Shift occurs. |
| 4 | **Debt Collection.** A patron, employer, or creditor demands payment. | Each adventurer who earned income this week (Manual Labour, Work a Crafting Profession) must pay 50% of their earnings as "dues." |
| 5 | **Lodging Spike.** An influx of travelers or refugees drives up costs. | Each adventurer pays 25 extra coins this week for room and board. |
| 6 | **Bad Investment.** A deal or opportunity goes south. | One adventurer (GM's choice or random) loses 2d6 × 10 coins. If they can't pay, they gain 1 Lingering Fatigue from the stress. |

#### 4 — Situation Shift

The social, political, or economic landscape changes. **Any Situation Shift result refreshes the settlement market** — the GM re-rolls or replaces one or more magic item slots (§5.1). Additionally, roll d6:

| d6 | Event | Resolution |
|----|-------|------------|
| 1 | **Power Shift.** A faction gains or loses significant influence. | The GM adjusts one faction's resources or disposition. If a faction agenda is active, tick its dice timer by 1 additional step. |
| 2 | **New Decree.** A new law, regulation, or ban is announced. | One activity or good is restricted, taxed, or newly permitted. The GM determines which based on the settlement's government. |
| 3 | **Notable Arrival/Departure.** A significant NPC arrives in or leaves the settlement. | Roll on the NPC Role Table (§3.7) to determine role. The NPC is available for Tend to Relationships or Petition/Negotiate. If a departure, an existing NPC contact leaves (GM's choice). |
| 4 | **Festival or Mourning.** A celebration, holy day, or period of mourning begins. | +1 boon on Carouse this week. Some shops or services may close (GM's discretion). |
| 5 | **Trade Agreement.** New trade contacts or deals shift available goods. | Market inventory gains +1 temporary magic item slot this week, or one existing slot is replaced with a higher-Quality item. |
| 6 | **Rumor Surge.** A rumor sweeps the settlement. | Generate one rumor using the [Quest Hooks](../10-gm-tools/01-random-tables/10-random-quests.mdx) random tables. Every adventurer hears it automatically. |

#### 5 — Traces

Signs of coming change or hidden opportunity. Roll d6:

| d6 | Event | Resolution |
|----|-------|------------|
| 1 | **Strange Travelers.** Outsiders arrive with news from afar. | The GM provides one piece of information about a distant region, faction, or threat. Adventurers who Carouse this week gain +1 boon. |
| 2 | **Omens.** Unusual signs appear — strange weather, animal behavior, celestial events. | +1 boon on Lore and Mysticism-related activities next week. The GM may use this to foreshadow a coming Threat. |
| 3 | **NPC Tip.** An NPC contact shares a warning or lead. | If the party has NPC relationships in the settlement, the GM selects one NPC who sends word. If not, a stranger approaches (roll on NPC Role Table, §3.7, and gain a new NPC at Indifferent). |
| 4 | **Hidden Discovery.** A cache, passage, or ruin is found nearby. | Adventure hook. The discovery may contain treasure, danger, or both. +1 boon on Research if investigating the find. |
| 5 | **Pattern Recognition.** Events from recent weeks connect. | The GM reveals a connection between two or more prior events. This may expose a faction's agenda or a hidden threat. |
| 6 | **Message Received.** A letter, map fragment, or coded message surfaces. | The GM introduces a quest hook, a warning from an ally, or a demand from an enemy. |

#### 6 — Calm

Life goes on without incident. Roll d6:

| d6 | Event | Resolution |
|----|-------|------------|
| 1 | **Peaceful Week.** Nothing of note occurs. | No mechanical effect. |
| 2 | **Good Weather.** Fine conditions and high spirits. | +1 boon on one outdoor-related activity next week (Manual Labour, Survival, Nature). |
| 3 | **Market Day.** A minor market day draws extra vendors. | One mundane item category is available at 75% cost this week. |
| 4 | **Traveling Performer.** Entertainment passes through. | +1 boon on Carouse this week. |
| 5 | **Seasonal Tradition.** An old custom is observed. | Flavor event. The GM describes a local tradition. |
| 6 | **Quiet Reflection.** A week of peace. | Each adventurer who takes the Leisure activity this week removes 1 additional Lingering Fatigue (stacking with Leisure's normal full recovery). |

> **Design Note:** Each event category has fully resolved sub-events with clear mechanical consequences. The GM rolls 1d6 for the category, then d6 for the specific event, or simply picks the most fitting result. Every Situation Shift (result 4) also refreshes the market, ensuring magic item stock turns over more frequently than a single specific sub-event would allow.

### 4.2 Faction Agendas

A subsystem for tracking faction power moves during downtime, treating factions as "characters" with goals and consequences. Extends the NPC profile model from Social Intrigue to organizations.

#### Faction Profiles

**Faction Profile Template:**

- **Name**: The faction's public identity.
- **Type**: Government, Guild, Temple, Criminal, Military, Merchant, Cult, or Other.
- **Agenda Goal**: What the faction is trying to achieve (1–2 sentences).
- **Disposition**: Attitude toward the party (Hateful −3 to Intimate +2).
- **Motivations** (2–3): Desires, fears, bonds, or values (same format as Social Intrigue NPC Motivations).
- **Pitfalls** (1–2): What turns the faction against someone (same format as Social Intrigue NPC Pitfalls).
- **Resources**: Coin, soldiers, information, political influence, magic.
- **Agenda Dice Timer**: A d4 countdown starting at 4 (see below).

#### Agenda Dice Timer

Each faction agenda uses a **d4 dice timer** (starting at 4), consistent with the game's dice timer framework. The timer ticks down each week of downtime as part of the Weekly Downtime Procedure (step 3).

| Timer Value | Stage | What's Visible | Settlement / Party Effect |
|-------------|-------|----------------|--------------------------|
| 4 | **Scheming** | Subtle clues — unusual meetings, quiet purchases, recruitment. Only discoverable through Carouse (rumor) or Traces events. | No direct effect. The GM may drop hints through Carouse rumors or Traces events. |
| 3 | **Maneuvering** | Noticeable moves — shipments, hired agents, political favors. Players who investigate (Research, Streetwise) can learn the faction's Agenda Goal. | The faction's type of activity (commerce, military, religious) becomes apparent. Players can now target the faction with Petition/Negotiate. |
| 2 | **Acting** | Open commitment — public declarations, troop movements, market manipulation, territorial claims. | Direct settlement impact: prices shift, services become restricted, NPCs take sides. The GM applies one minor mechanical effect (e.g., +25% cost on a good, a service becomes unavailable, a faction NPC's disposition shifts). |
| 1 | **Climax** | Final push — a siege begins, a deal closes, a ritual starts, an assassination is attempted. | Major settlement impact. If the party does not intervene this week, the agenda resolves next tick. |
| 0 | **Resolution** | The faction achieves its goal (or fails, if interfered with). | See Consequences below. The dice timer is removed. |

**Advancing the Timer:**

- Each week, tick down 1 active faction agenda by 1. If multiple factions are active, advance the one most relevant to current player actions or rotate between them.
- A **Trouble** result (1) on the Settlement Event Table can advance a faction's timer by 1 additional tick.
- Players can **delay** a timer by 1 tick through successful action: Petition/Negotiate to stall, Carouse to spread counter-rumors, or direct sabotage (adventure hook).
- Players can **stop** an agenda entirely by resolving the underlying conflict.

#### Faction Agenda Random Tables

Use these tables to generate or inspire faction agendas.

**Faction Goal (d6)**

| d6 | Goal Type | Examples |
|----|-----------|---------|
| 1 | **Territorial Expansion** | Claim a district, annex a resource, establish a new outpost |
| 2 | **Economic Domination** | Secure a monopoly, control a trade route, bankrupt a rival |
| 3 | **Political Power** | Install an ally in office, pass favorable laws, remove an opponent |
| 4 | **Religious/Ideological** | Spread a faith, suppress heresy, perform a grand ritual |
| 5 | **Military Action** | Arm for war, hire mercenaries, fortify defenses, launch a strike |
| 6 | **Secret Operation** | Smuggling network, espionage, theft of an artifact, assassination |

**Progress Effects (what happens at each stage)**

| d6 | Scheming (4) | Maneuvering (3) | Acting (2) | Climax (1) |
|----|-------------|-----------------|------------|------------|
| 1 | Secret meetings at night | Agents hired from outside | Public declaration of intent | Armed confrontation |
| 2 | Unusual purchases of supplies | Rivals threatened or bribed | Trade routes manipulated | Key NPC targeted |
| 3 | Whispered recruitment | Political favors called in | Public protests or rallies | Critical resource seized |
| 4 | Information gathering | Stockpiling weapons/goods | Alliance formally announced | Ultimatum issued |
| 5 | Coded messages intercepted | Key figures change allegiance | Settlement services disrupted | Ritual or ceremony begins |
| 6 | Stranger asking questions | Construction or fortification | Open intimidation | Point of no return |

**Resolution Consequences (d6)**

| d6 | If Faction Succeeds | If Faction Fails / Is Stopped |
|----|--------------------|-----------------------------|
| 1 | A settlement trait changes (e.g., Prosperous → Impoverished, or gain Contested Territory). | The faction loses resources and goes dormant. No new agenda for 1d6 weeks. |
| 2 | NPC dispositions shift: faction allies improve by +1, opponents worsen by −1. | The faction's leader is replaced. Disposition toward the party resets to Indifferent (0). |
| 3 | Market availability changes: new goods appear or old ones become scarce. Refresh all market slots. | Rival factions gain power. A different faction starts a new agenda next week. |
| 4 | A new law, tax, or restriction takes effect in the settlement. | Public backlash: the faction's disposition toward the general populace worsens. +1 boon on Carouse for 2 weeks (everyone's talking about it). |
| 5 | A new adventure hook emerges from the faction's success. | The faction seeks revenge: a new agenda targeting the party begins at Scheming. |
| 6 | A new faction agenda begins as a direct result (escalation). | Temporary peace: no Trouble events for 2 weeks. |

> **Design Note:** The "dice timer" terminology aligns this system with the core dice timer framework used across all time scales. The d4 timer (4 ticks) keeps faction arcs tight — a faction completes its agenda in about a month of downtime if unimpeded. The random tables provide both the GM tools and player-facing hints at each stage.

#### Player Interaction with Faction Agendas

Faction agendas are primarily GM-facing, but players should see their effects through activities:

- **Carouse** may reveal rumors about a faction's Scheming or Maneuvering stage.
- **Research** can uncover a faction's Agenda Goal once they reach Maneuvering (TN 10 using Mind + Education/Streetwise).
- **Petition/Negotiate** can target a faction directly to delay or redirect their agenda.
- **Tend to Relationships** with an NPC allied to or opposed to a faction can provide inside information or shift factional dynamics.
- **Settlement Events** of type Trouble (1) or Situation Shift (4) may directly reference faction activity.

Activities should note when they interact with factions. For example, a Carouse result of "generate a rumor" may produce a faction-related rumor if an agenda is in Scheming or Maneuvering stage.

### 4.3 New Downtime Activities

#### Activity Summary Table

| Activity | Category | Min. Rank | Expenses | Roll | Key Outcome |
|----------|----------|-----------|----------|------|-------------|
| Manual Labour | Work | 1 | 0 | STR + Athletics/Fortitude | Earn coins |
| Work a Crafting Profession | Work | 2 | 0 | Profession skill test | Earn coins (scales with Crafting) |
| Learn a Profession | Learn | 2 | 100/week | Profession skill test | Learn new profession |
| Learn a Skill | Learn | 1 | 100/week | MND + Education | Learn new skill |
| Research | Learn | 3 | 100/week | MND + Expert Skill | Learn information |
| **Train with a Master** | Learn | 3 | 200/week | Attribute + Skill | Temporary +1 boon, or +1 Resolve (critical) |
| Carouse | Social | 1 | 50/week | SPI/MND + Streetwise | Rumors, new NPCs, disposition changes |
| **Petition / Negotiate** | Social | 2 | 50–1,000+/week | Social Intrigue | Convince NPC/faction of significant request |
| **Tend to Relationships** | Social | 1 | 25–100/week | Varies by NPC role | Improve NPC disposition |
| Recover | Recovery | 1 | 50/week | — | Heal Wounds + Lingering Fatigue |
| **Leisure** | Recovery | 1 | 25/week | — | Remove all Lingering Fatigue |
| Provide Offering | Recovery | 1 | 100/week | SPI + Lore/Mysticism | +1 Resolve for party |
| Haggle (Sell) | Commerce | 1 | varies | SPI/MND + Influence/Streetwise | Sell rare items |
| **Haggle (Buy)** | Commerce | 1 | varies | SPI/MND + Influence/Streetwise | Find specific items to buy |
| **Commission an Item** | Commerce | 2 | item cost + 25% | SPI/MND + Influence | Hire artisan to craft item |
| Craft an Item | Craft | 2 | varies | Profession skill test | Create items |

*New activities in **bold**.*

#### Leisure

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 1 (Hamlet) | — | 25 coins/week |

You spend the week resting and recovering — enjoying the settlement's comforts, sleeping late, taking long meals, and engaging in light entertainment without any pressing demands. At the end of the week, remove all your **Lingering Fatigue**.

If the settlement has a Social Venue location (see §5.3), you may visit it for free as part of this activity and roll on the Social Venues encounter table (Group A) with +1 boon.

> **Design Note:** Leisure is the explicit rest activity. Adventurers must declare an activity every week — there is no option to "do nothing" — but Leisure provides the downtime equivalent of a genuine rest week. Its minimal expense (just living costs) and single clear benefit make the cost of recovery tangible, while still ensuring the weekly settlement event roll fires (the world doesn't pause because you're resting).

#### Commission an Item

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 2 (Village) | Coin to pay the artisan | Item cost + 25% commission fee |

You hire a local artisan to craft an item. The artisan's skill is limited by settlement rank (max Quality = settlement rank + 1). Completion takes a number of weeks equal to the item's required successes.

You can attempt to negotiate better terms by rolling Spirit/Mind + Influence vs. hard Difficulty (TN 10). Failure simply means standard terms apply, but there is risk:

**Blunder.** The artisan is offended and refuses the commission. You cannot commission from this artisan again this downtime.

**Failure.** Standard terms (25% fee, normal time).

**Weak.** Choose one: reduce the fee to 10%, **or** reduce crafting time by 1 week (minimum 1).

**Strong.** Both of the above.

**Critical.** Both of the above, plus a minor bonus (cosmetic flourish, material discount, priority for your next order).

#### Train with a Master

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 3 (Town) | A willing teacher with the relevant skill at rank 3+ | 200 coins/week |

Choose one skill you already have at rank 1+. Roll Attribute + Skill vs. hard Difficulty (TN 10).

**Blunder.** Training accident. Gain 1 Lingering Fatigue and roll on the Complication table.

**Failure.** You learn nothing this week but gain +1 boon on your next Train with a Master attempt for this skill.

**Weak.** Gain a temporary edge: +1 boon on your next skill test using this skill during your next adventure. **Or** the master shares practical knowledge (the GM provides a tip, contact, or lore relevant to the skill).

**Strong.** Both benefits above.

**Critical.** Both of the above **and** +1 Resolve (max. 3).

> **Design Note:** Train with a Master provides temporary, adventure-applicable benefits — it does not reduce XP costs or accelerate skill rank progression. The +1 boon on a future skill test rewards the time investment without breaking the progression curve.

#### Tend to Relationships

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 1 (Hamlet) | An NPC relationship to maintain, or willingness to make a new one | see table below |

You spend the week maintaining or improving a relationship with a specific NPC. If you have no NPC relationships in this settlement, you can spend the week seeking one out — roll on the NPC Role Table (§3.7) to determine who you meet, and begin the relationship at Suspicious (−1).

**Base Expenses** depend on the NPC's role:

| NPC Role | Typical Approach | Base Expenses |
|----------|-----------------|---------------|
| Adventurer | Train together, share stories, help with a task | 25 coins/week |
| Artisan | Assist in their workshop, source materials | 50 coins/week |
| Authority | Attend court, deliver favors, political appearances | 100 coins/week |
| Scholar | Assist research, share knowledge, acquire texts | 50 coins/week |
| Scoundrel | Run errands, keep secrets, provide cover or coin | 75 coins/week |
| Seeker | Travel together, share supplies, help with their quest | 25 coins/week |

**Expense Multiplier:** You can multiply the base expenses by any factor (×2, ×3, etc.) to invest more heavily — elaborate gifts, lavish feasts, rare materials. For each multiplier above ×1, gain +1 boon on the roll. For example, spending ×3 the base expense grants +2 boons.

**NPC Stature Modifier:** More prominent or powerful NPCs require greater investment. The GM may increase the base expense by a multiplier based on the NPC's relative importance:

| NPC Stature | Expense Modifier | Examples |
|-------------|-----------------|---------|
| Local | ×1 (base) | A village blacksmith, a neighborhood watch captain, a local herbalist |
| Regional | ×2 | A town guild master, a provincial official, a renowned artisan |
| National | ×4 | A court advisor, a high priest, a famous general |
| Legendary | ×8 | A king, a grandmaster, a mythic figure |

**Skill Test** depends on the NPC's role:

| NPC Role | Suggested Skill Tests |
|----------|----------------------|
| Adventurer | Strength + Athletics, Agility + Fighting, Spirit + Survival |
| Artisan | Strength/Agility + Crafting, Mind + Crafting |
| Authority | Spirit + Influence, Mind + Education |
| Scholar | Mind + Education, Mind + Lore, Spirit + Insight |
| Scoundrel | Agility + Stealth, Spirit + Streetwise, Mind + Insight |
| Seeker | Spirit + Influence, Mind + Nature, Spirit + Perception |

Roll vs. Difficulty determined by the NPC's current disposition:

| Disposition | Difficulty |
|-------------|-----------|
| Hateful (−3) | Extreme (14) |
| Hostile (−2) | Very Hard (12) |
| Suspicious (−1) | Hard (10) |
| Indifferent (0) | Medium (8) |
| Friendly (+1) | Easy (6) |
| Intimate (+2) | Trivial (4) |

**Success.** The NPC's disposition improves by 1 step (max. Intimate +2).

**Failure.** No change, but you maintain the relationship.

**Blunder.** Your attempt backfires. The NPC's disposition worsens by 1 step.

> **Design Note:** The expense multiplier for boons lets players invest more to improve their chances with reluctant NPCs. The NPC stature modifier ensures that courting a king costs meaningfully more than befriending a local merchant, scaling naturally with the campaign's scope.

### 4.4 Settlement Traits

Give each settlement mechanical identity beyond rank. Settlement traits complement the worldbuilding tables in the [Random Settlement Generator](../10-gm-tools/01-random-tables/12-random-settlement.mdx) — those tables define *what* a settlement is (geography, culture, resources), while traits define *how it plays* during downtime.

**Assigning Traits:** Each settlement has 1–3 traits depending on rank (Hamlet: 1, Village: 1–2, Town: 2–3, City: 3). Roll on the table below or choose to match the settlement's character.

**Settlement Traits Table (d20)**

| d20 | Trait | Effect |
|-----|-------|--------|
| 1 | **Trade Hub** | +1 boon on Haggle. Market includes items from other regions. |
| 2 | **Military Outpost** | Weapons/armor available at +1 Quality above settlement rank. +1 boon on Learn a Skill (Fighting, Archery). |
| 3 | **Sacred Ground** | +1 boon on Provide Offering. Mysticism services at 75% cost. |
| 4 | **Arcane Academy** | Arcana services available. Spell scrolls/catalysts at +1 Quality above settlement rank. |
| 5 | **Black Market** | Illegal and exotic goods available. +1 boon on Streetwise during downtime. All market prices +50%. |
| 6 | **Frontier Settlement** | Survival/Nature supplies at 75% cost. Urban luxury goods at −1 Quality cap. |
| 7 | **Cosmopolitan** | NPC contacts from distant cultures available. +1 boon on Carouse. |
| 8 | **Impoverished** | All downtime expenses −25%, but available Quality is −1 below settlement rank cap. |
| 9 | **Prosperous** | All downtime expenses +25%, but available Quality is +1 above settlement rank cap. |
| 10 | **Isolated** | −1 magic item slot (minimum 0). +1 bane on Haggle and Carouse. |
| 11 | **Artisan Quarter** | +1 boon on Craft an Item and Work a Crafting Profession. One additional profession available for learning. |
| 12 | **Scholarly Haven** | +1 boon on Research. Libraries available. Education services at 75% cost. |
| 13 | **Thieves' Den** | +1 boon on Streetwise and Stealth activities. Fencing stolen goods easy. Complication result 4 involves criminals. |
| 14 | **Port Town** | +1 magic item slot from overseas trade. Sea travel available. Exotic materials in market. |
| 15 | **Contested Territory** | 2+ factions compete. Faction dice timers tick 1 additional step per week. Petition/Negotiate expenses doubled. |
| 16 | **Healing Springs** | +1 boon on Recover. Wounds heal 1 week faster. Alchemist supplies at 75% cost. |
| 17 | **Haunted** | +1 boon on Lore and Arcana activities. Trouble events (1) always involve supernatural elements. |
| 18 | **Bountiful Land** | Food/rations at 50% cost. +1 boon on Nature activities. Manual Labour pays 50% more. |
| 19 | **War-Torn** | Weapons/armor at −25% cost. Civilian goods +50% cost. Mercenary work available (Manual Labour pays double, with Complication roll each week). |
| 20 | **Ancient Ruins Nearby** | +1 magic item slot. +1 boon on Lore and Education activities. Adventure hooks plentiful. |

> **Design Note:** Roll once per trait slot (1–3 based on settlement rank). Re-roll duplicates. This table complements the existing [Settlement Generator](../10-gm-tools/01-random-tables/12-random-settlement.mdx) for Geography, Resources, Culture, and Government. A settlement with "copper mining and smelting" naturally fits Artisan Quarter; one "threatened by bandits" suits War-Torn or Contested Territory.

---

## 5. GM Tools

### 5.1 Settlement Market Procedure

**Market Generation (GM, during downtime setup)**

1. **Determine market tier:**

| Settlement Rank | Max Item Quality | Magic Item Slots |
|-----------------|-----------------|------------------|
| 1 (Hamlet) | Q2 | 0 |
| 2 (Village) | Q3 | 1 |
| 3 (Town) | Q4 | 2 |
| 4 (City) | Q5 | 3 |

2. **Fill magic item slots** — roll d6 per slot:

| d6 | Category |
|----|----------|
| 1 | Weapon |
| 2 | Armor or Shield |
| 3 | Wearable (ring, amulet, cloak, boots, etc.) |
| 4 | Consumable (potion, oil, scroll) |
| 5 | Spell Catalyst (wand, staff, orb) |
| 6 | GM's choice or re-roll |

3. **Determine Quality:** Q2 + 1d3 (producing Q3–Q5, capped at settlement's max). Villages stock Q3, Towns Q3–Q4, Cities Q3–Q5.

4. **Determine specifics:** The GM determines the item type and enchantment based on the settlement's traits and character. For random enchantment selection, use the [Enchantments tables](../04-equipment/07-magic-items/enchantments.md) — roll or choose an enchantment appropriate to the item's category (weapon, armor, wearable, catalyst).

**Market Refresh:** The market refreshes whenever a **Situation Shift** (result 4) occurs on the Settlement Event Table — regardless of the specific sub-event. The GM re-rolls or replaces one or more magic item slots.

### 5.2 Expanded Haggle (Buy & Sell)

The current Haggle only covers selling. Add a buying option:

**Haggle — Buying**

You spend the week searching for a specific **item category** to purchase — for example, "a great axe," "plate armor," "a ring," or "a cloak." You specify the **slot or type** you're looking for, but you cannot specify a particular enchantment. The market yields what it yields.

For **utility items** (bag of holding, rope of climbing, etc.) that are not weapons, armor, or wearables, you may search for a specific named item.

| Item Quality vs. Settlement Cap | Difficulty | Expenses |
|------|------------|----------|
| At or below cap (mundane) | Automatic | Market price |
| Magic item at or below cap | TN 8 | 50 coins/week |
| Cap + 1 | TN 10 | 100 coins/week |
| Cap + 2 | TN 12 | 250 coins/week |
| Cap + 3 | TN 14 | 500 coins/week |

Roll Spirit/Mind + Influence/Streetwise vs. the Difficulty.

**Blunder.** You find nothing and attract unwanted attention (con artist, thief, or suspicious authority).

**Failure.** You find nothing this week.

**Weak.** You find an item of the desired category at 120% market price. If it's a magic item, the GM rolls or determines the enchantment randomly.

**Strong.** You find the item at market price with a random enchantment.

**Critical.** You find the item at 90% market price, **or** you may choose from two randomly determined enchantments.

> **Design Note:** Players specify the item slot/type (great axe, heavy shield, ring) but not the enchantment — that's what Commission an Item (§4.3) is for, where the player specifies exactly what they want crafted. Haggle Buying creates meaningful discovery: you might find a Flaming great axe when you wanted a Frost one, but that's part of the treasure-hunt appeal. Utility items can be searched for specifically because they don't have the enchantment variability.

### 5.3 Location Encounters

Drawing on Shadows of Brimstone's Frontier Town, each settlement visit can include brief location encounters as free activities. A location visit does not use the adventurer's weekly activity slot — it's a quick scene that adds texture and discovery to downtime.

#### Settlement Location Table

Every settlement has two **base locations** (always present): a **Tavern** and a **Market**. Additional locations are generated by rolling on the table below, once per settlement rank (Hamlet: 1 roll, Village: 2 rolls, Town: 3 rolls, City: 4 rolls). Re-roll results below minimum rank. Re-roll duplicates.

Each location belongs to a **Group** — all locations in the same group share one encounter table. This keeps the system manageable without requiring a separate table for every possible location type.

| d20 | Location | Min. Rank | Group |
|-----|----------|-----------|-------|
| 1 | Inn (separate lodgings from Tavern) | 1 | A — Social Venues |
| 2 | Bathhouse | 2 | A — Social Venues |
| 3 | Gambling Den | 2 | A — Social Venues |
| 4 | Pleasure Garden | 3 | A — Social Venues |
| 5 | Festival Ground | 2 | A — Social Venues |
| 6 | Harbor / Docks | 2 | B — Trade & Commerce |
| 7 | Auction House | 3 | B — Trade & Commerce |
| 8 | Black Market | 2 | B — Trade & Commerce |
| 9 | Warehouses | 2 | B — Trade & Commerce |
| 10 | Temple | 1 | C — Faith & Knowledge |
| 11 | Library / Archive | 3 | C — Faith & Knowledge |
| 12 | Oracle / Seer | 3 | C — Faith & Knowledge |
| 13 | Academy | 4 | C — Faith & Knowledge |
| 14 | Forge / Smithy | 1 | D — Craft & Industry |
| 15 | Alchemist's Shop | 2 | D — Craft & Industry |
| 16 | Artisan Quarter | 2 | D — Craft & Industry |
| 17 | Stable & Stablemaster | 1 | D — Craft & Industry |
| 18 | Guild Hall | 3 | E — Power & Order |
| 19 | Barracks / Arena | 2 | E — Power & Order |
| 20 | Court / Prison | 3 | E — Power & Order |

> **Base Locations** (Tavern = Group A, Market = Group B) always count toward the settlement's location list. A Hamlet therefore has 3 locations total (Tavern + Market + 1 rolled).

#### Location Groups

| Group | Locations | Notes |
|-------|-----------|-------|
| **A — Social Venues** | Tavern, Inn, Bathhouse, Gambling Den, Pleasure Garden, Festival Ground | High social interaction, NPC contacts, rest potential |
| **B — Trade & Commerce** | Market, Harbor/Docks, Auction House, Black Market, Warehouses | Economic opportunities and hazards |
| **C — Faith & Knowledge** | Temple, Library/Archive, Oracle/Seer, Academy | Information, ritual, and spiritual benefits |
| **D — Craft & Industry** | Forge/Smithy, Alchemist's Shop, Artisan Quarter, Stable | Crafting shortcuts, materials, and skills |
| **E — Power & Order** | Guild Hall, Barracks/Arena, Court/Prison | Faction contacts, law, and public spectacle |

---

#### Group A — Social Venues (d6)

| d6 | Encounter |
|----|-----------|
| 1 | **Brawl.** A fight breaks out around you — get involved or duck out. Roll STR + Fighting or AGI + Athletics vs. TN 8 to avoid being caught in it. Failure: 1 Lingering Fatigue. Success: gain +1 disposition with a local Adventurer NPC (or a new Adventurer NPC at Indifferent — these places draw wanderers). |
| 2 | **Loose Lips.** A talkative patron overshares. Generate a rumor using the [Quest Hooks](../10-gm-tools/01-random-tables/10-random-quests.mdx) random tables. |
| 3 | **Wager.** A gambler or performer challenges you to a contest. Stake up to 50 coins. Roll MND + Insight vs. TN 8. Win: double your stake. Lose: lose your stake. |
| 4 | **Old Connection.** You run into someone unexpected — a past ally, contact, or familiar face from another life. The GM introduces a brief interaction and may establish an NPC relationship (roll NPC Role Table, §3.7). |
| 5 | **Good Night.** The atmosphere is warm and welcoming. Gain +1 boon on your next Carouse in this settlement, **or** remove 1 Lingering Fatigue. |
| 6 | **Uneventful.** Nothing of note. |

---

#### Group B — Trade & Commerce (d6)

| d6 | Encounter |
|----|-----------|
| 1 | **Pickpocket!** Roll AGI + Perception vs. TN 8 or lose 2d6 coins. Success: catch the thief. Choose to turn them in (small reward, 25 coins, gain +1 disposition with an Authority NPC) or let them go (they owe you — gain a Scoundrel NPC contact at Indifferent). |
| 2 | **Unusual Wares.** A vendor has something unexpected — a potential quest hook, a minor magic item, or a rare ingredient the GM describes. It's available at market price this week only. |
| 3 | **Merchant Intelligence.** A talkative trader shares news about a nearby settlement, trade route, or region. Useful background for future travel planning. |
| 4 | **Discounted Stock.** A merchant is clearing inventory. One supply type (rations, ammunition, alchemical items, basic tools) is available at 75% cost this week. |
| 5 | **Visiting Trader.** A traveling merchant from afar is here briefly. The market gains +1 temporary magic item slot this week with goods from a distant region. |
| 6 | **Busy Day.** Nothing catches your eye among the crowds. |

---

#### Group C — Faith & Knowledge (d6)

| d6 | Encounter |
|----|-----------|
| 1 | **Prophecy.** A priest, archivist, or oracle delivers an unsolicited message. The GM provides a cryptic but gameable hint about a future event, threat, or opportunity — tied to an active faction agenda (§4.2) if possible. |
| 2 | **Useful Text.** You discover or are directed to a relevant manuscript, inscription, or record. Gain +1 boon on your next Research or Lore-related activity this downtime. |
| 3 | **Ritual Observation.** You witness a ceremony and may participate. On participation (Spirit + Lore or Mysticism vs. TN 8): gain +1 boon on your next Provide Offering. On a blunder: inadvertently cause offense — one Authority or Scholar NPC in the settlement gains −1 disposition toward you. |
| 4 | **Knowledge Broker.** A scholar, priest, or archivist offers to answer one specific question in their area of expertise. The GM provides reliable information about one historical, religious, or regional fact. |
| 5 | **Holy Moment.** An act of faith, discovery, or quiet reflection restores you. Remove 1 Lingering Fatigue. |
| 6 | **Quiet Day.** The place is peaceful but uneventful. No special encounter. |

---

#### Group D — Craft & Industry (d6)

| d6 | Encounter |
|----|-----------|
| 1 | **Artisan's Eye.** A master craftsperson notices your equipment and offers unsolicited opinion. Roll MND + Crafting vs. TN 8. Success: they share a useful technique — gain +1 boon on your next Crafting activity this downtime. Failure: dismissive, no effect. |
| 2 | **Materials Surplus.** A craftsperson is clearing excess stock. Purchase raw materials for one item at 50% of material cost — one item's worth only. |
| 3 | **Commission Opportunity.** A local patron is seeking someone to create a specific item. If you take it, treat as a Commission an Item activity: no search expenses, pay only the commission fee. |
| 4 | **Workshop Demonstration.** You observe a skilled craftsperson at work. Gain +1 boon on your next Train with a Master attempt for any Crafting-related skill. |
| 5 | **Equipment Maintenance.** A skilled artisan offers to inspect and service your equipment. One item of your choice has its current Durability damage reset (if the Durability system is in use). Costs 25 coins. |
| 6 | **Busy Workshop.** Everyone is absorbed in their work. Nothing available for visitors. |

---

#### Group E — Power & Order (d6)

| d6 | Encounter |
|----|-----------|
| 1 | **Confrontation.** A guard, official, or faction agent demands your attention — an accusation, a contraband check, or a political loyalty test. Roll SPI + Influence vs. TN 8. Failure: detained briefly, lose this week's location visit (no other location this week). Success: make a neutral impression — gain a new Authority NPC at Indifferent. |
| 2 | **Posting Board.** A public notice board lists active opportunities — a bounty, a legal commission, or a faction-sponsored contract. The GM provides one job or quest lead appropriate to the settlement. |
| 3 | **Public Spectacle.** A trial, tournament bout, execution, or speech is underway. Choose: participate (relevant skill vs. TN 8 — on success, gain +1 disposition with one Authority NPC) or observe (gain one free rumor via Quest Hooks). |
| 4 | **Faction Contact.** A faction representative approaches you — offering information, a task, or making a demand. Ties to an active faction agenda (§4.2) if one exists, or may start a new one. |
| 5 | **Overheard.** Conversations, posted decrees, or visible activity reveal the current stage of an active faction agenda. The GM summarizes what's publicly known at that stage. |
| 6 | **Routine Day.** Guards change, officials pass papers. Nothing involves you. |

### 5.4 Downtime Quick-Reference Sheet

```
┌─────────────────────────────────────────────────────┐
│            DOWNTIME QUICK REFERENCE                  │
├─────────────────────────────────────────────────────┤
│ SETUP                                               │
│  1. Settlement Rank: ___  Traits: ___ (d20 table)   │
│  2. Market Slots: ___ (fill per §5.1)               │
│  3. Active Faction Agendas: ___ (d4 timers)         │
│                                                     │
│ EACH WEEK                                           │
│  1. Each adventurer: declare + resolve activity     │
│  2. Roll Settlement Event (1d6 + d6 sub-table)      │
│     → Situation Shift (4) = refresh market          │
│  3. Tick faction agenda dice timer by 1             │
│                                                     │
│ LINGERING FATIGUE                                   │
│  Fatigue from events/complications/activities       │
│  does NOT heal overnight. Only healed by:           │
│  Recover, Provide Offering, or Leisure.             │
│                                                     │
│ COMPLICATION TABLE (d6)                             │
│  1: Injury (1 Lingering Fatigue)                    │
│  2: Reputation Hit (+1 bane next social roll)       │
│  3: Property Damage (50 coins or +1 bane)           │
│  4: Unwanted Attention (GM complication)             │
│  5: Lost Time (can't repeat activity next week)     │
│  6: Nothing Extra                                   │
│                                                     │
│ NEW NPC ROLE (d6)                                   │
│  1: Adventurer  2: Artisan  3: Authority            │
│  4: Scholar     5: Scoundrel  6: Seeker             │
│                                                     │
│ FACTION AGENDA TIMER (d4)                           │
│  4: Scheming → 3: Maneuvering → 2: Acting →        │
│  1: Climax → 0: Resolution                          │
└─────────────────────────────────────────────────────┘
```

---

## 6. Summary & Roadmap

### Priority 1: Core Integration (Low Effort, High Impact)

| Change | Section |
|--------|---------|
| Downtime Procedure Checklist (Setup + Weekly) | §3.1 |
| Weekly settlement event roll (1d6, every week) | §4.1 |
| Complication Table (d6) | §3.2 |
| Expanded Carouse with NPC/rumor outcomes | §3.4 |
| NPC Role Table (d6) | §3.7 |
| Lingering Fatigue rule + Leisure activity | §3.6, §4.3 |

### Priority 2: System Alignment (Medium Effort, High Impact)

| Change | Section |
|--------|---------|
| Petition/Negotiate activity + Social Intrigue link | §3.5 |
| Faction Agendas (dice timer subsystem) | §4.2 |
| Expanded Haggle (buying by category, random enchantment) | §5.2 |
| Craft an Item → challenge terminology alignment | §3.3 |

### Priority 3: Expansion (Medium Effort, Medium Impact)

| Change | Section |
|--------|---------|
| Settlement Market Procedure | §5.1 |
| Settlement Traits table (d20) | §4.4 |
| New activities (Commission, Train, Tend to Relationships) | §4.3 |
| Location Encounter Tables (5 groups, settlement location table) | §5.3 |

### Document Structure Recommendations

If implemented, restructure the downtime docs:

```
docs/06-scenes/04-downtime/
├── 00-overview.md          (procedure, settlements, traits, Lingering Fatigue)
├── 01-activities.md        (all activities incl. Leisure + new ones, summary table)
├── 02-settlement-events.md (event table, complication table)
├── 03-faction-agendas.md   (faction profiles, dice timers, random tables)
├── 04-market.md            (market generation, haggle buying)
└── 05-locations.md         (settlement location table, 5 group encounter tables)
```

---

## Appendix: Cross-Reference Audit

### Systems Referencing Downtime

| System | Reference | Status |
|--------|-----------|--------|
| Scenes & Time Scales | Downtime = weekly time scale, free activities, Event Table | ✅ Aligned |
| Crafting Professions | Referenced by Work a Crafting Profession, Craft an Item | ✅ Aligned |
| NPC Relations | Disposition system — minimal downtime hooks | ⚠️ Addressed: §3.4, §3.7, §4.3 |
| Challenges | Parallel terminology with crafting | ⚠️ Addressed: §3.3 |
| Social Intrigue | No downtime entry point | ❌ Addressed: §3.5 |
| Travel | No transition rules | ❌ Future work |
| Resting | 1 Wound/week auto-heal works | ✅ Aligned |
| Fatigue | Normal nightly rest removes 2 Fatigue — conflicts with downtime | ❌ Addressed: §3.6 (Lingering Fatigue) |

### Undefined Table References

| Activity | Reference | Status |
|----------|-----------|--------|
| Manual Labour | "Roll on the Complication table" (Blunder) | ❌ → Defined: §3.2 |
| Work a Crafting Profession | "Roll on the Complication table" (Blunder) | ❌ → Defined: §3.2 |
| Research | "Roll on the Complication table" (Blunder) | ❌ → Defined: §3.2 |
