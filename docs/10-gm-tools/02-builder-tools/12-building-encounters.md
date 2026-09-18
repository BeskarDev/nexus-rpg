---
sidebar_position: 12
---

# ⚔️ Building Encounters

How many creatures to put in a fight, and how hard that fight will be. For what a creature is made of, see [Building Creatures](./10-building-creatures.md). For how creatures work at the table, see [Creature Rules](../../08-creatures/02-creature-rules.md).

Encounter difficulty in Nexus is measured in **Threat Points (TP)**. A creature's TP says how much of the party's attention and resources they demand, and the party's size sets the budget a fight should spend. The measure is built around **action economy**, because the side with more effective actions usually wins. A creature that acts twice a round is worth far more than one with twice the HP.

## Threat Points

Each creature costs Threat Points according to their category. The cost is not picked, it is counted: **life pools, times turns each round, times what the rank carries beyond those two.**

| Category | Life pools | Turns a round | Quality | TP |
| --- | --- | --- | --- | --- |
| **Basic** | 1 | 1 | 1 | **1** |
| **Elite** | 2 | 1 | 2 | **4** |
| **Lord** | 3 | 2 | 2 | **12** |

**A life pool is a whole fight.** When an Elite takes their first Wound they come back to full HP and shed every condition on them, so the party fights them twice, and the Elite acts through both. A Lord does it three times. That is why an Elite is worth four Basic creatures rather than two, and a Lord twelve rather than three.

**Quality** is what a rank carries beyond bodies and turns: Resolve to re-roll with, a trigger that fires when a pool empties, conditions cleared on every Wound, and Morale that holds or never breaks at all. It is 2 for both ranks that have any of it, because the gap between an Elite's one Resolve and a Lord's three is already counted by the pools and turns beside it.

### Troops

A **troop** of three or more Basic creatures costs **three quarters of what its members cost separately, rounded down**, and never less than 2 TP.

| Troop size | TP |
| --- | --- |
| 3 | 2 |
| 4 | 3 |
| 6 | 4 |
| 8 | 6 |
| 10 | 7 |

The discount is not generosity. A troop acts once instead of once per member, rolls Morale as a unit, and loses members to any effect that hits an area. What it buys in return is damage on a failed roll, which is the thing that keeps low-tier creatures dangerous to a high-level party. Four goblins who each need to roll well to touch a Champion become a troop that hurts them every round.

## Tier Difference

Compare the creature's **tier** to the party's **level**. A creature below the party loses on two counts at once, since their attacks land less often and their own life is shorter, so the adjustment multiplies rather than adds.

| Creature tier vs. party level | Multiplier |
| --- | --- |
| 5 or more below | 0 |
| 4 below | 0.15 |
| 3 below | 0.3 |
| 2 below | 0.45 |
| 1 below | 0.7 |
| Equal | 1 |
| 1 above | 1.4 |
| 2 above | 1.9 |
| 3 above | 2.5 |
| 4 above | 3.2 |
| 5 or more above | 4 |

**The curve is deliberately gentle.** Both sides of this game scale slowly: a creature gains 1 weapon damage, 1 defense and 10 HP a tier, and an adventurer gains **2 HP a level**, running from about 20 at Level 1 to about 42 at Level 10. One level of party advancement is a small change in what the party can take, so one tier of creature difference is a small change in what they cost. A steeper curve would mean a party gaining a single level turned a Hard fight into an Easy one, and nothing in this game moves that fast.

**Apply the multiplier to the whole group, not to each creature.** Six Tier 2 creatures against a Level 3 party are 6 TP at 0.7, which is 4 TP, not six creatures each worth some fraction of a point. Round to the nearest whole point, and round up when the multiplier is above 1.

A multiplier of 0 means those creatures cannot meaningfully threaten this party. At five tiers of distance their damage is inside the party's armor and they cannot land a hit that matters. Use them for flavour, for the sound of something in the dark, or for a fight the party is meant to walk through. They count for neither points nor turns.

## The Action Multiplier

Count how many turns the creatures take each round. Basic creatures and Elites take one each, a **troop takes one** however many members it has, and a **Lord takes two**. Compare that to the number of adventurers, then multiply the encounter's whole total.

Count turns as they happen in a round, not as they add up over the fight. An Elite is one turn a round whether they are on their first life pool or their second: the extra pool is already paid for in their Threat Points, and counting it twice would price the same fact two ways.

| Creature turns each round | Multiplier |
| --- | --- |
| Up to the party's number | 1 |
| Up to half again as many | 1.25 |
| Up to twice as many | 1.5 |
| Up to three times as many | 2 |
| More than three times as many | 2.5 |

Round the result up. Apply it to the **encounter total**, after every group has its own points, because it is a fact about the whole fight rather than about any one creature in it.

This is the part that stops a crowd reading as mild. Eight at-tier Basics against four adventurers cost 8 points on their own, which is twice a standard fight. They also take twice the party's turns, so they cost 12 and land squarely on Deadly, which is what being outnumbered two to one by creatures who can all hurt you actually is.

Creatures far enough below the party to be worth nothing count for neither points nor turns. They cannot threaten anyone, so they cannot multiply anything either.

A troop is the exception that proves the rule. Eight creatures fighting separately take eight turns, while the same eight in a troop take one. That is most of why a troop is cheaper, and it is a real choice: the troop concentrates its damage and is harder to disperse, but it hands the party back the action economy.

## Difficulty Budgets

The budget depends on **party size** alone. Party level is already accounted for by the tier multiplier above.

The scale is anchored on the game's own measure of a creature: **one creature of a given tier is a decent challenge for one adventurer of the same level.** One at-tier creature each is therefore the standard fight, and that sets Moderate.

| Difficulty | Budget | What it means |
| --- | --- | --- |
| **Easy** | Party size × 0.5 | A quick skirmish. Few resources spent. |
| **Moderate** | Party size × 1 | A standard fight. One at-tier creature per adventurer. |
| **Hard** | Party size × 2 | A real challenge. Likely costs Resolve, healing, or a Wound. |
| **Deadly** | Party size × 3 or more | Life-threatening. Retreat is a reasonable choice. |

Round a half point up. Being outnumbered two to one by creatures who can all hurt you is a Deadly fight, and the scale says so: eight at-tier creatures against four adventurers cost 8 points, take twice the party's turns, and land at 12 against a Deadly budget of 12.

> **Example: a party of four at Level 5. Moderate is 4 TP, Hard is 8, Deadly is 12.**
>
> - Four Tier 5 Basics cost 4 TP and take four turns a round against the party's four, so no multiplier. Moderate, and the even match the whole scale is built on.
> - One Tier 5 Elite (4 TP) and two troops of four Tier 5 Basics (3 TP each) comes to 10 TP. Three turns a round, so the multiplier is 1. A leader with an organised warband, sitting just past Hard.
> - Eight Tier 5 Basics cost 8 TP and take eight turns a round. Twice the party's, so 8 becomes 12, and being outnumbered two to one is Deadly. The same crowd gathered into two troops of four costs 6 TP, takes two turns, and comes to 6, which is Moderate. The bodies did not change, the action economy did.
> - One Tier 5 Lord alone is 12 TP and two turns a round. Deadly, which is what a climactic duel against a Lord of the party's own tier should be.
> - That Lord and four Tier 5 Basics comes to 16 TP taking six turns a round, so 16 becomes 20. Well past Deadly, and a fight to run from.
> - One Tier 7 Elite is 4 TP doubled to 8 TP, because they stand two tiers above the party. One turn a round, so no multiplier. One creature, a Hard fight on its own.

## Encounter Shapes

The same budget spent differently produces a different fight.

| Shape | Spend | Feel |
| --- | --- | --- |
| **Horde** | Several troops | Overwhelming numbers. Vulnerable to area effects. |
| **Leader and minions** | One Elite plus Basics | The classic warband. The leader uses abilities while the minions absorb attacks. |
| **Elite pair** | Two Elites of different roles | Tactical pressure from two directions. Action-heavy. |
| **Solo boss** | One Lord alone | A climactic duel. The Lord's second turn makes up for being outnumbered. |
| **Boss and entourage** | One Lord plus troops | The final encounter. The Lord supplies the abilities, the minions the action economy. |
| **Gauntlet** | Several waves | Attrition. Budget each wave separately, so the total can run well past a single fight's. |

## Adjusting for Circumstances

Count the budget first, then step the difficulty up or down for what the scene does to the fight. One step means Moderate becomes Hard, or Hard becomes Moderate.

| Circumstance | Step |
| --- | --- |
| The creatures hold the ground and know it | Up one |
| The creatures surprise the party | Up one |
| The party is already wounded or fatigued | Up one |
| A hazard threatens both sides | Up one |
| The party holds the ground and knows it | Down one |
| The party surprises the creatures | Down one |
| The party has a dedicated healer | Down one |

Adventurers do not regain HP when they take a Wound, the way Elite and Lord creatures do. A party with healing is far more durable than one without, which is why it is worth a whole step.

## Counting It Out

The order, once, end to end:

1. Add up the Threat Points of each group, troops discounted.
2. Multiply each group by its tier difference against the party's level.
3. Add the groups together.
4. Multiply that total by the action multiplier.
5. Compare it to the party's budget, then step the difficulty for circumstances.
