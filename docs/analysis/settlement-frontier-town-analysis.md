# Frontier Town Settlement System — Design Analysis

> **Scope:** Challenge the validity of adapting Shadows of Brimstone's frontier town system into Nexus RPG's downtime, and define how it should actually be integrated. Written in response to a GDD proposing (1) an easy GM framework for setting up a settlement, (2) player-facing menus that replace the current downtime activity list, and (3) Talents that grant bonuses for specific settlement interactions.
>
> **References:** [Downtime System Analysis](downtime-system-analysis.md) (existing, unimplemented proposal — read this first, it covers most of the same ground) | [Downtime Overview](../06-scenes/04-downtime/00-overview.md) | [Downtime Activities](../06-scenes/04-downtime/activities.md) | [Faction Turns GDD](factions/FACTION_SYSTEM_GDD.md) | [Talent System Analysis](talents/TALENT_SYSTEM_ANALYSIS.md) | [Challenge & Social Intrigue Talent Integration](talents/CHALLENGE_SOCIAL_INTRIGUE_TALENT_INTEGRATION.md) | [NPC Relations](../02-adventurers/05-npc-relations.md)
>
> **A note on sourcing:** this analysis could not access the attached `fantasy_settlement_gdd.md` directly (no network access in this session). It works from the issue's stated design goals and general knowledge of Shadows of Brimstone's frontier town — the Look for Trouble / town event procedure, named service locations (Doctor, Blacksmith, General Store, Saloon, Gunsmith, Bank, Sheriff, Undertaker, Church, Hotel, etc.), a Reputation track, and a frontier town that visibly decays as the Old Ones' corruption spreads through a campaign. If specifics from the GDD diverge from this, treat this document's proposals as adjustable, not the read-once findings.

---

## 1. Executive Summary

### Verdict

**The idea is sound, but it is not a new system — it is a finishing pass on one that already exists.** `downtime-system-analysis.md` already contains a settlement location table explicitly modeled on SoB's frontier town (§5.3), a weekly Settlement Event Table (§4.1), a Settlement Traits table (§4.4), and a market procedure (§5.1). None of it has shipped to `/docs/`. The live downtime system (`docs/06-scenes/04-downtime/`) is still six activities and a one-paragraph settlement-rank note.

That changes the shape of this request. The risk isn't "can SoB's frontier town work in Nexus RPG" — the prior analysis already answered yes and did the design work. The risk is building a **second, competing settlement proposal** that either duplicates §4–5 of the existing analysis or quietly contradicts it. This document's job is to (a) validate the frontier-town adaptation against Nexus RPG's design principles, (b) identify what the existing proposal is still missing relative to the GDD's three stated goals, and (c) fold the delta into one coherent plan instead of a parallel one.

### Key Findings

1. **The core adaptation is compatible.** SoB's "a settlement is a menu of named locations, each with a service and a small random encounter table" maps cleanly onto Nexus RPG's existing settlement-rank framework and matches how the existing proposal already models it (§5.3 Location Encounters, five location groups).
2. **Two of the GDD's three goals are already ~80% designed.** "GM framework for setting up a settlement" ≈ Settlement Rank + Traits (§4.4) + Location roll table (§5.3) + Market procedure (§5.1). "Player-facing menus replacing current downtime activities" ≈ the Activity Summary Table (§4.3) plus the Location table, though neither is packaged as a player-facing handout yet (§4 below).
3. **The third goal — Talents offering bonuses for settlement interactions — is genuinely underserved.** A handful of Streetwise/Influence talents touch downtime (`I Know A Guy`, `City's Pulse`, `Forger`, `Road Warden`, `Born Haggler`), but none of them reference the proposed Settlement Events, Location Encounters, Settlement Traits, or Faction Agendas — because those systems don't exist in the live docs yet for a talent to hook into. This is the one piece of the GDD's vision that has no existing analysis coverage. See §5.
4. **One live talent is already broken by drift.** `I Know A Guy` (Streetwise) references activities named "Buy Item," "Sell Item," and "Find Contact" (`docs/03-statistics/06-talents/streetwise.mdx`, sourced from `talents.json`). None of those activities exist in the current downtime system — the closest live equivalents are Haggle (sell-only) and Carouse. This predates this issue and isn't something this analysis proposes to fix (that's a JSON edit + `content:gen`, not a design decision), but it's a concrete illustration of the cost of letting downtime and its talents drift apart, which is exactly the failure mode a settlement/talent integration needs to avoid repeating.
5. **The genuinely SoB-flavored pieces that Nexus RPG does *not* have yet** are (a) a structured "return to town" beat that always fires something (SoB's Look for Trouble table) and (b) visible settlement decay/growth over a campaign (SoB's corruption creeping into town). The existing analysis's Settlement Event Table (§4.1, rolled weekly) and Settlement Traits (§4.4, static) partially cover this but don't model directional change over a campaign — a settlement in Nexus RPG can have an eventful week but has no mechanism to trend toward "increasingly under threat" or "increasingly prosperous" the way a SoB frontier town trends toward corruption. See §6.2.

### What This Document Adds (vs. the existing analysis)

| Addition | Section |
|---|---|
| Explicit validity check: which SoB frontier-town mechanics fit Nexus RPG's design principles and which don't | §2–3 |
| Overlap audit mapping GDD goals → existing proposal sections, so nothing gets redesigned twice | §4 |
| A player-facing settlement menu format (the GDD's "player facing menus" — not yet specified anywhere) | §4.3 |
| Talent integration for settlement interactions (the GDD's third goal — no prior coverage) | §5 |
| A directional settlement-state mechanic to capture SoB's "town changes over the campaign" feel, which the existing weekly event table doesn't provide | §6.2 |
| Recommendation to merge, not fork, plus a concrete document plan | §7 |

---

## 2. What Shadows of Brimstone's Frontier Town Actually Does

For grounding, the mechanical shape SoB uses (board game, not a TTRPG, so translation is already required regardless of source):

- **A fixed town map of named locations** (Doctor, General Store, Blacksmith, Saloon, Gunsmith, Bank, Sheriff's Office, Church, Hotel, Undertaker, Train Station, and others), each with one clear mechanical service — heal, buy gear, sell loot, gamble, recruit, bank money against loss-on-death, etc.
- **A "Look for Trouble" step**: after almost any town visit, a card or table roll produces a town encounter — a brawl, a swindle, a stranger with a rumor, a raid. This is the procedural engine that makes town visits feel alive rather than being a static shop.
- **Reputation**, spent or gained through choices at specific locations, gating access to certain services or better outcomes.
- **A campaign-level corruption track**: as the campaign's Old Ones storyline advances, the town itself darkens — locations can be lost, prices rise, danger increases. The town is not a static hub; it visibly loses ground over the course of the campaign unless the party succeeds at the throughline threat.
- **No downtime "activities" in the RPG sense** — SoB is a dungeon-crawler board game. Town visits are a shopping/prep phase between delves, not a resource-and-skill-check economy. This is the single biggest translation gap: Nexus RPG's downtime is built around **weekly time-scale activities with skill rolls and expenses** (per `01-scenes-time-intervals.md`), a structure SoB simply doesn't have an equivalent for.

---

## 3. Compatibility Against Nexus RPG's Design Principles

| Principle | SoB Mechanic | Fit |
|---|---|---|
| **Bounded power ceiling, no reality-warping** | Town services are mundane (heal, buy, sell, recruit) | ✅ Directly compatible — nothing about a location menu threatens the power ceiling. |
| **GM gets concrete parameters, never open-ended "GM decides"** | SoB's town encounters are pre-printed cards with fixed text | ✅ This is *more* structured than most of Nexus RPG's own downtime activities today. The existing Location Encounter tables (§5.3 of the downtime analysis) already hit this bar — every result is a resolved effect, not a prompt. |
| **Weekly time-scale, skill-roll-driven activities** | SoB has no roll-and-resource economy for town visits | ⚠️ Translation required. The existing analysis's answer — **locations are free, don't consume the weekly activity slot** (§5.3) — is the correct resolution and should not be relitigated. A location visit is flavor-and-texture on top of the weekly activity, not a replacement for it. |
| **Living world / prolonged rest carries narrative risk** | Look for Trouble fires almost every visit; corruption advances regardless of player choice | ✅ Matches the existing analysis's design principle #5 ("Living world") and its weekly Settlement Event Table. Reinforces rather than conflicts. |
| **Resource management matters (coins, Fatigue, reputation are real costs)** | SoB's economy is tight and location services cost real resources | ✅ Compatible, already the norm in Nexus RPG downtime. |
| **No semicolons/em-dashes, active voice, exact terminology (published rules)** | N/A — style constraint, not a mechanical one | N/A — applies once this is drafted for `/docs/`, not during analysis. |

**Conclusion:** there is no principle-level conflict. Everything that makes SoB's frontier town interesting (a menu of named places, a procedural "something always happens" beat, visible stakes over a campaign) is either already reflected in the existing downtime analysis or additive to it. The work is integration and gap-filling, not validation from zero — the "does this even fit the game" question the issue asks was, in effect, already answered by whoever wrote §5.3 of the downtime analysis with SoB specifically in mind.

---

## 4. Overlap Audit: GDD Goals vs. Existing Proposal

### 4.1 "An easy framework for GMs to set up a settlement"

Already specified, unimplemented:

1. **Settlement Rank** (1 Hamlet – 4 City) — live today (`00-overview.md`), gates item Quality.
2. **Settlement Traits** (§4.4 of the downtime analysis) — roll 1–3 traits off a d20 table, gives a settlement mechanical identity (Trade Hub, Military Outpost, Black Market, etc.) beyond its rank.
3. **Settlement Location roll table** (§5.3) — roll a number of locations by rank (Hamlet 1, Village 2, Town 3, City 4) off a d20 table, grouped into five encounter groups (Social Venues, Trade & Commerce, Faith & Knowledge, Craft & Industry, Power & Order), plus two always-present base locations (Tavern, Market).
4. **Market generation procedure** (§5.1) — magic item slots by rank, category roll, Quality roll.
5. **Faction presence** — the standalone [Faction Turns GDD](factions/FACTION_SYSTEM_GDD.md) supersedes the downtime analysis's faction sketch and is a complete, playtest-ready GM procedure (7-step faction setup, ~5 min each) that already produces the "who has a stake in this settlement" layer.

Put together, steps 1–5 already **are** a "roll up a frontier town in five minutes" GM framework — arguably more complete than SoB's fixed board, since it's generative rather than a single fixed map. What's missing is packaging: these five procedures live in different documents/sections and have never been assembled into one GM-facing "build this settlement" checklist. §5.4 of the downtime analysis has a GM quick-reference card, but it assumes the setup already happened; it doesn't walk through creating one. **Gap: a single "Settlement Setup Card" procedure — see §6.1.**

### 4.2 "Player-facing menus as a replacement for the current downtime activities"

Partially specified:

- The **Activity Summary Table** (§4.3 of the downtime analysis) is already a compact menu of all downtime activities (Work, Learn, Social, Recovery, Commerce, Craft categories) with cost/roll/outcome at a glance.
- The **Settlement Location table** (§5.3) is the closer analogue to a SoB town map — a menu of *places*, not activities, each with its own flavor and a free encounter roll.

Neither is currently formatted for players. Both are GM/design reference tables embedded in an internal analysis document, not something you'd hand to a player at the table. Read literally, "player-facing menus... as a replacement for the current downtime activities" is asking for two things the GDD may be conflating:

- A better **presentation** of the existing activity list (a menu card), which is packaging, not new design.
- A shift from "pick an activity" to "pick a place, and the place implies an activity" (SoB's actual model, where visiting the Blacksmith *is* the transaction). This is a bigger structural change worth calling out explicitly rather than assuming — see §6.3 for the tradeoff.

**Gap: a concrete player-facing settlement menu format, and a decision on whether places replace or merely flavor activities — see §6.3.**

### 4.3 "Talents may offer specific bonuses or extra effects for certain kinds of interactions"

Not specified anywhere. This is the one goal with zero existing design coverage — see §5.

---

## 5. Talent Integration (the uncovered goal)

### 5.1 What already exists

A handful of talents already touch downtime, all under Streetwise or Influence:

| Talent | Skill | Downtime hook today |
|---|---|---|
| `I Know A Guy` | Streetwise | Rank 1 lets you substitute a Streetwise roll for "Buy Item, Sell Item, or Find Contact" in a settlement you've Caroused in before; Rank 2 adds intel; Rank 3 works in unvisited settlements. **References activity names that no longer exist** (see §1 Finding 4). |
| `City's Pulse` | Streetwise | Rank 2 lets you dig up an NPC's Motivations/Pitfalls before interacting; Rank 3 gives a settlement-native re-roll or challenge-die reduction. |
| `Forger` | Streetwise | Craft false documents; not downtime-gated, but clearly a settlement-context ability. |
| `Road Warden` | Streetwise | Travel-focused, but Rank 1 includes a discount at "safe waypoints" that overlaps with settlement commerce. |
| `Born Haggler` | Influence | Rank 1/3 improve Haggle's sell price; Rank 2 grants a re-roll "when searching for rare items during downtime." |

This confirms the game already has a design pattern for downtime-flavored talents (skill-gated, rank-gated, references a specific activity or roll). The gap is that none of them reference *settlement structure* — traits, locations, factions, or events — because that structure isn't live yet.

### 5.2 Design principle for settlement-interaction talents

Per [Talent System Analysis](talents/TALENT_SYSTEM_ANALYSIS.md) and the existing Challenge/Social Intrigue integration pattern, new talent hooks should:

1. **Attach to an existing skill**, not create a new one. Streetwise and Influence are the obvious homes (already own Carouse, Haggle, Tend to Relationships); Insight and Education are secondary candidates (Research, reading NPCs).
2. **Reference the settlement structures once they exist**, not the SoB flavor text. A talent should say "when you visit a Group A (Social Venue) location" or "when a Settlement Trait applies to your roll," not "when you visit the Saloon" — Nexus RPG's locations are procedurally generated per settlement, not a fixed SoB-style list, so talents need to hook the *category*, not a specific named place.
3. **Grant texture, not power spikes.** Consistent with `Train with a Master`'s design note in the existing analysis ("temporary, adventure-applicable benefits... does not reduce XP costs or accelerate progression"), settlement talents should reduce friction (re-rolls, cost discounts, extra information) rather than open new mechanical resources.
4. **Don't gate content behind a Talent.** A player without `I Know A Guy` must still be able to find a contact — the talent should make the existing path better (boon, discount, reliability), never be the only door to a settlement feature. This matches the existing Carouse/Tend to Relationships design, where NPC relationships are available to everyone and talents only sweeten the roll.

### 5.3 Concrete hook points once §6's settlement structure exists

Rather than author brand-new talents here (that's the `talent-design` skill's job, with its own rank/budget scaling — out of scope for an analysis document), this identifies where hooks belong:

| Settlement structure (from §4.1 / existing analysis) | Natural talent hook |
|---|---|
| **Location Groups** (§5.3, five groups: Social Venues, Trade & Commerce, Faith & Knowledge, Craft & Industry, Power & Order) | A talent that grants a boon or a re-roll on one Group's encounter table, mirroring `Explorer of Nature`'s "choose an environment" pattern (Survival talent, chosen terrain gets ongoing bonuses). |
| **Settlement Traits** (§4.4) | A talent that lets you identify a settlement's Traits without spending downtime (a Streetwise/Education "read the town" ability), useful because Traits currently have no discovery procedure — the GM just knows them. |
| **Settlement Event Table** (§4.1) | A talent that lets you act on a Trouble/Situation Shift event a beat earlier than other adventurers (advance warning), rather than a flat bonus — keeps the event's stakes intact while rewarding investment. |
| **Faction Agendas** (§4.2 concept, formally the [Faction Turns GDD](factions/FACTION_SYSTEM_GDD.md)) | Already partly covered — `City's Pulse` Rank 2 and `Forger` both plausibly interact with faction signs. Confirm/extend this mapping once Faction Turns is published rather than inventing a parallel hook. |
| **Petition/Negotiate** (proposed §3.5) | Already Social Intrigue-based; the existing Social Intrigue talent integration analysis is the right reference, not a new one. |

**Recommendation:** treat "settlement talents" as a fourth pass, sequenced *after* the settlement structure ships (§7 roadmap), following the same audit-then-propose method the Challenge/Social Intrigue talent integration analysis used. Proposing specific new talents now, before Locations/Traits/Events exist in `/docs/`, would be designing bonuses for a system that could still change shape.

---

## 6. Filling the Remaining Gaps

### 6.1 Settlement Setup Card (GM framework, packaging gap from §4.1)

A single procedure that chains the existing pieces into one GM worksheet:

```
SETTLEMENT SETUP
1. Rank (1 Hamlet – 4 City): sets item Quality cap, market size, location count.
2. Traits (1–3 by rank): roll or pick from the d20 Settlement Traits table.
3. Locations (1–4 by rank, +2 base: Tavern, Market): roll or pick from the
   d20 Settlement Location table, grouped A–E.
4. Market: fill magic item slots per rank (§5.1 of the downtime analysis).
5. Factions (optional, 1–3): run Faction Setup per the Faction Turns GDD if
   the settlement has active political stakes this arc.
```

This is not new design — it is steps 1–5 of §4.1 above, written as a checklist instead of scattered across sections. The value is entirely in making the existing design usable at the table in the five minutes SoB's actual box promises. This should ship as the opening section of whatever document replaces `00-overview.md` (see §7).

### 6.2 Directional Settlement State (the one true mechanical gap)

SoB's frontier town gets worse (or, if the party succeeds, holds the line) as the campaign's Old Ones threat advances. Nexus RPG's proposed Settlement Event Table (§4.1 of the downtime analysis) generates *weekly* incident variety but has no memory — nothing accumulates from week to week, so a settlement in month six of a campaign plays identically to the same settlement in week one. This is the one piece of "town changes over time" flavor that neither the existing analysis nor the live docs currently model.

**Proposal:** don't build a second tracker. The Faction Turns GDD already owns "the world moves between sessions" and already resolves faction goal clocks into consequences (§7 of that document) that can reads directly as settlement change: a faction's Resolution consequence table (in the downtime analysis's now-superseded §4.2, migrated into the Faction GDD) already includes results like "a settlement trait changes" and "market availability changes: refresh all market slots." That is the mechanism for directional settlement drift — it should be pointed at, not duplicated. If a campaign wants SoB's specific flavor of "the town is losing," that's a single Faction with a Drive like "corrupt/consume the settlement" whose Resolution table entry is written that way, not a new subsystem.

**Action:** the downtime analysis's settlement section should add one sentence pointing GMs at the Faction Turns GDD for longitudinal settlement change, so the "town gets worse over time" fantasy has a documented home instead of falling into the gap between two documents.

### 6.3 Player-Facing Menu: places vs. activities

Two options, not one, and they have different footprints:

**Option A — Menu as presentation only.** Reformat the existing Activity Summary Table (§4.3) plus the rolled Location list into a printable settlement handout: settlement name, rank, traits, the 3–4 rolled locations with a one-line hook each, and the activity list with costs. No mechanical change. Low effort, resolves the GDD's literal ask ("player facing menus... as replacement for the current downtime activities" read as *presentation* of the activity list).

**Option B — Locations replace activity choice.** A player picks a *place* (Tavern, Temple, Forge) and the place determines which activity/roll applies, SoB-style (visiting the Blacksmith = Craft/Commission, visiting the Church = Provide Offering). This is a bigger change: it collapses the Activity Summary Table and the Location table into one structure, and it means every settlement's mechanically-available activities depend on which locations were rolled (a Hamlet with no Temple location literally cannot Provide Offering there). That's thematically strong (matches SoB, matches "a town's character is which services it has") but is a real design change to `00-overview.md`'s current promise that all core activities are available "at a settlement rank ≥ their requirement" everywhere.

**Recommendation:** ship Option A now (pure packaging, no ruling required) and treat Option B as a separate decision for the owner — it changes an existing contract (activity availability is rank-gated, not location-gated) and shouldn't be bundled into this pass by default. Flag it in the roadmap (§7) as a call to make, not a foregone conclusion.

---

## 7. Recommendation & Roadmap

**Do not create a parallel settlement system.** Everything in this document is either confirmation that the existing `downtime-system-analysis.md` proposal already covers the GDD's intent, or a scoped addition to it. Treat this document as an addendum to be merged into that file's §4–5 rather than a standalone spec, once reviewed.

| Step | What | Depends on |
|---|---|---|
| 1 | Implement the existing downtime analysis's Priority 1–3 roadmap (already fully scoped: procedure, event table, Carouse rework, Settlement Traits, Locations, Market) | Owner approval of that analysis, unchanged by this document |
| 2 | Add the Settlement Setup Card (§6.1) as the opening section of the restructured downtime docs | Step 1 |
| 3 | Point settlement drift at the Faction Turns GDD explicitly (§6.2), one cross-reference, no new mechanics | Faction Turns GDD publication |
| 4 | Ship the player-facing menu handout, Option A (§6.3) | Step 1–2 |
| 5 | Owner decision: Option A only, or pursue Option B (locations gate activities) | Step 4 |
| 6 | Settlement-interaction Talents (§5), via the `talent-design` skill, hooking Location Groups / Traits / Events / Factions | Steps 1–3 shipped, so hooks target stable structures |
| 7 | Fix the `I Know A Guy` stale activity-name reference (`talents.json` → `content:gen`) | Independent, can happen any time — small, contained JSON edit |

**Bottom line:** the frontier-town adaptation is valid and mostly already designed. The genuine unfinished work is (a) packaging the existing settlement generation procedure into a fast GM workflow, (b) producing an actual player-facing handout instead of GM reference tables, (c) deciding deliberately whether locations gate activities or just flavor them, and (d) the Talent integration pass, which has no prior coverage and should follow — not precede — the settlement structure it hooks into.
