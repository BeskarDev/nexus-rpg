# Downtime Core Fixes — GDD

> **Status:** Open design document. Extracted 2026-08-18 from the downtime system analysis (archived at `_archive_/downtime-system-analysis.md`).
>
> **Scope:** The Priority 1/2 fixes to the existing downtime rules: a formalized weekly procedure, the missing Complication table, Craft an Item alignment with challenge dice, the expanded Carouse activity, the Petition/Negotiate activity (Social Intrigue entry point), the Lingering Fatigue rule, and the NPC Role Table.
>
> **Companion:** The living-world expansion layer (settlement events, traits, new activities, market procedure, location encounters) lives in the [Settlement & Market GDD](../world/settlement-and-market-gdd.md). Faction agendas are handled by the [Faction System GDD](../world/factions/FACTION_SYSTEM_GDD.md).
>
> **References:** [Downtime Overview](../../06-scenes/04-downtime/00-overview.md) | [Downtime Activities](../../06-scenes/04-downtime/activities.md) | [Scenes & Time Scales](../../06-scenes/01-scenes-time-intervals.md) | [Challenges](../../06-scenes/07-challenges/00-overview.md) | [Social Intrigue](../../06-scenes/07-challenges/01-social-intrigue.md) | [NPCs and Relationships](../../02-adventurers/05-npc-relations.md)

---

## 1. Context

Findings carried over from the original analysis that motivate these fixes:

1. **Core procedure is compatible** — Downtime already operates at the weekly time scale and uses per-activity skill rolls, which fit cleanly into the unified Scenes & Time Scales framework.
2. **Weekly event roll needed** — The Downtime Event Table exists in the time scales document, but the downtime rules never reference it. The proposed approach rolls 1d6 every week (mirroring travel's daily event roll).
3. **Social intrigue has no downtime entry point** — No downtime activity bridges into the Social Intrigue system. Carouse is incomplete and underspecified.
4. **Fatigue healing during downtime is unregulated** — Since normal resting removes up to 2 Fatigue per night, Fatigue suffered during downtime (from events, complications, or activities) has no lasting impact. Lingering Fatigue needs special treatment to carry meaningful weight into the next adventure.

Known conflicts in the live rules:

1. **Complication table undefined.** Manual Labour, Work a Crafting Profession, and Research in [Downtime Activities](../../06-scenes/04-downtime/activities.md) reference a "Complication table" on blunders, but no such table exists in the published rules. **This GDD ships it** (§3).
2. **Crafting uses parallel progress terminology.** Craft an Item tracks "required successes" — functionally identical to a challenge die but differently named. Alignment proposed in §4.

Design principles: all scenes use the same action loop (Declare → Roll/Act → Event → Consequences), downtime rolls a weekly event just as travel rolls a daily one, resource costs (coins, Fatigue, reputation) are meaningful, and NPC relationships are first-class.

---

## 2. Formalize the Downtime Procedure

Add a step-by-step procedure, mirroring the Travel Procedure's structure:

**Downtime Setup (GM, before play)**

1. Determine settlement rank and traits (roll on the Settlement Traits table, see the [Settlement & Market GDD](../world/settlement-and-market-gdd.md)).
2. Generate the settlement market inventory (see the [Settlement & Market GDD](../world/settlement-and-market-gdd.md)).
3. Note the current faction situation (see the [Faction System GDD](../world/factions/FACTION_SYSTEM_GDD.md)).

**Weekly Downtime Procedure (each week)**

1. Each adventurer **declares and resolves** their chosen downtime activity.
2. **Roll weekly event**: Roll 1d6 on the Settlement Event Table (see the [Settlement & Market GDD](../world/settlement-and-market-gdd.md)) and resolve the result.
3. **Faction advancement**: run faction turns per the [Faction System GDD](../world/factions/FACTION_SYSTEM_GDD.md) (for long downtimes of 4+ weeks, run two faction turns).

> **Design Note:** Rolling an event every week ensures downtime is never static — the world moves regardless of what the party does. This directly mirrors travel's daily event roll. The GM can always skip or replace the roll for a given week if the narrative demands it.

## 3. Define the Complication Table

Activities referencing a "Complication table" on blunders (Manual Labour, Work a Crafting Profession, Research) use this table:

**Complication Table (d6)**

| d6 | Complication |
|----|--------------|
| 1 | **Injury.** Gain 1 Lingering Fatigue (see §7). |
| 2 | **Reputation Hit.** Word spreads. Suffer +1 bane on your next social interaction in this settlement. |
| 3 | **Property Damage.** Pay 50 coins for repairs or suffer +1 bane on your next use of the same activity. |
| 4 | **Unwanted Attention.** Your failure draws scrutiny from an authority, rival, or criminal element. The GM introduces a minor complication. If the attention relates to an active faction goal, the GM may advance that faction's goal clock by 1 instead (see the [Faction System GDD](../world/factions/FACTION_SYSTEM_GDD.md)). |
| 5 | **Lost Time.** You cannot use this activity again next week. |
| 6 | **Nothing Extra.** The blunder is bad enough on its own. |

## 4. Align Craft an Item with the Challenge Framework

Reframe Craft an Item multi-week tracking to use challenge terminology:

- **Required Successes** → **Challenge Die** (e.g., Q4 item requires a d6 challenge die starting at 6).
- Each weekly crafting roll that succeeds reduces the challenge die by 1 (strong success: 2, critical: 3).
- Weekly expenses, material costs, and profession requirements remain unchanged.

> **Design Note:** This is a terminology change, not a mechanical overhaul. The numbers stay the same. The benefit is unified language for "multi-step progress tracking" across crafting, research, and other challenges.

## 5. Expand the Carouse Activity

The current Carouse activity is a skeleton. Expand it:

**Carouse (Revised)**

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 1 (Hamlet) | — | 50 coins/week |

You spend the week socializing — frequenting taverns, attending gatherings, making introductions. Roll Spirit/Mind + Streetwise vs. medium Difficulty (TN 8).

You can multiply this activity's expenses by any factor up to the settlement rank and gain a number of boons on the roll equal to the expense multiplier.

**Blunder.** You cause a scene. Roll on the Complication table. If you have NPC relationships in this settlement, one worsens by 1 step (GM's choice). If you have none, you make a bad impression — roll on the NPC Role Table (see §8) and gain a new NPC relationship at Suspicious (−1) disposition.

**Failure.** An uneventful week. No useful connections.

**Weak.** Choose one: generate a rumor using the [Quest Hooks](../../10-gm-tools/01-random-tables/10-random-quests.mdx) random tables, **or** gain a new NPC relationship at Indifferent (0) disposition — roll on the NPC Role Table (§8) to determine the NPC's role.

**Strong.** Choose two from the Weak options, **or** improve an existing NPC relationship by 1 step.

**Critical.** Choose two from the Weak options **and** gain +1 Resolve (max. 3).

> **Design Note:** Every social outcome now offers the alternative of gaining a *new* NPC relationship, covering the case where adventurers are new to a settlement with no contacts. The NPC Role Table (§8) determines who they meet. Rumors use the existing [Quest Hooks random tables](../../10-gm-tools/01-random-tables/10-random-quests.mdx).

## 6. Petition / Negotiate (New Activity)

| Min. Settlement Rank | Requirements | Expenses |
| --- | --- | --- |
| 2 (Village) | An NPC or faction with a specific request | see table below |

When you need to convince an NPC or faction of something significant — securing a trade deal, requesting military aid, gaining access to a restricted archive — you initiate a [Social Intrigue](../../06-scenes/07-challenges/01-social-intrigue.md) challenge during downtime.

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

## 7. Lingering Fatigue

Fatigue suffered during downtime — from settlement events, complication table results, or activity failures — represents lingering stress, social exhaustion, or chronic strain that doesn't simply disappear with a night's sleep.

**Rule: Lingering Fatigue persists.**

Fatigue gained during a downtime phase is **not removed by normal nightly rest**. It can only be removed by:

- The **Recover** downtime activity (heals all Wounds and removes all Lingering Fatigue).
- The **Provide Offering** activity (on success, removes 1 Lingering Fatigue in addition to its normal +1 Resolve benefit).
- The **Leisure** activity (see the [Settlement & Market GDD](../world/settlement-and-market-gdd.md)) — spending a week on deliberate rest and recreation. Removes all Lingering Fatigue.

Any Lingering Fatigue remaining at the end of the downtime phase carries into the next adventure.

> **Design Note:** Normal resting removes up to 2 Fatigue per night, which means any Fatigue suffered during downtime would vanish overnight with no consequence. This rule ensures Lingering Fatigue has teeth — it's a meaningful cost that incentivizes the Recover and Leisure activities and creates tension between productive weeks and rest weeks. The carry-over into adventuring is the key stakes: a party that pushes through 6 weeks of intensive downtime without resting may start their next quest weakened. Adventurers must always declare an activity each week — there is no "doing nothing" option — but Leisure is the explicit rest activity for those who need it.

## 8. NPC Role Table

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

The GM determines the NPC's name, personality, and specifics based on the settlement. Use the [NPC Generator](../../10-gm-tools/01-random-tables/11-social-intrigue.mdx) random tables for further detail if needed.

---

## 9. Shipping Notes

These fixes target the live downtime pages directly:

| Change | Ships to |
|--------|----------|
| Downtime procedure checklist (Setup + Weekly) | [Downtime Overview](../../06-scenes/04-downtime/00-overview.md) |
| Complication Table (d6) | [Downtime Activities](../../06-scenes/04-downtime/activities.md) — closes the dangling "Complication table" reference |
| Craft an Item → challenge terminology | [Downtime Activities](../../06-scenes/04-downtime/activities.md) |
| Expanded Carouse, Petition/Negotiate, NPC Role Table | [Downtime Activities](../../06-scenes/04-downtime/activities.md) |
| Lingering Fatigue rule | [Downtime Overview](../../06-scenes/04-downtime/00-overview.md) (requires the Leisure activity from the [Settlement & Market GDD](../world/settlement-and-market-gdd.md)) |
