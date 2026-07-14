# Faction Turns — Game Design Document

> **Scope:** A lightweight GM system for running living-world factions: one procedure to set up any faction from a mix-and-match catalog, one procedure to advance all factions between sessions in 15 minutes or less. Uses the game's dice timers as faction goal clocks. Factions act, collide, and surface visibly in play whether or not the players engage them.
>
> **Status:** Design draft for playtest. Not yet published to `/docs/`.
>
> **Supersedes:** the Faction Agendas sketch in the [Downtime System Analysis](../downtime-system-analysis.md) §4.2. See §11 for the migration map.
>
> **Companion files:** [Faction Catalog](faction-catalog.md) (types, tags, goals, assets, weaknesses, signs — all pick-or-roll)
>
> **References:** [Scenes & Time Scales](../../06-scenes/01-scenes-time-intervals.md) (dice timers, event die) | [NPC Relations](../../02-adventurers/05-npc-relations.md) (disposition scale) | [Domain System GDD](../domain/DOMAIN_SYSTEM_GDD.md) (party-side counterpart) | [Random Tables](../../10-gm-tools/01-random-tables/) (format model)

---

## 1. Vision & Design Goals

### The Fantasy

The world does not wait. While the party crafts, carouses, and builds their domain, the Great Temple consolidates its grip on the river tolls, the marsh clans arm for a feud, and someone is quietly buying every map of the old necropolis. The players see the wake these movements leave: prices shift, guards double, a familiar NPC stops answering letters. When they finally look up from their own work, the board has changed, and the changes are hooks.

### Design Goals

1. **15 minutes, between sessions.** The whole faction turn for a full roster (3 to 5 factions) fits into ordinary GM prep: one roll per faction, one visible sign each, done.
2. **One setup procedure, any faction.** A street gang, a high temple, a foreign embassy, a beast cult: the same seven steps and the same catalog build all of them, by choice or by dice, in about 5 minutes each.
3. **Clocks the game already owns.** Faction goals are **dice timers**, the countdown mechanic every Nexus time scale already uses. No new clock rules, no new dice.
4. **Conflict is the visible engine.** Factions collide over goals, and collisions resolve with one opposed roll that produces winners, losers, and consequences the players can see. Faction-on-faction friction is how the world proves it moves without them.
5. **Everything surfaces.** Every faction move generates a **sign**: something the players can notice in play. A faction turn that the players never feel did not happen.
6. **Hooks fall out for free.** Completed goals, lost conflicts, and fired weaknesses all resolve through bounded tables whose results include adventure seeds. The GM harvests, never invents under pressure.

### Non-Goals

- **Not a wargame.** No faction economy, no unit counts, no map control. The Might die and the fiction carry all of it.
- **Not the domain system.** The domain system is the players' deep, coin-fed machine. Factions are the GM's shallow, fast mirror of it. The two interlock (§9) but share no bookkeeping.
- **Not a simulation.** Faction turns run on GM judgment guided by dice, not on rules that must be obeyed against the story. Skip, fudge, and pick whenever the fiction already knows the answer.

---

## 2. System Overview

### Procedure Checklists

**Faction Setup (once per faction, ~5 minutes, §4)**

1. Name, **Type** (pick or roll d12), and **Drive** (pick or roll d12).
2. **Might die** (d4 to d12, guidance table).
3. Two **Tags** (pick or roll from the catalog groups).
4. **Assets** by Might (1 to 3, pick or roll).
5. One **Weakness** (pick or roll d12).
6. **Goal** with stakes and a **goal clock** (dice timer, size by scope).
7. **Dispositions** toward the party and the other factions, plus the faction's **Face** (d6).

Once the roster stands, roll or pick one **Entanglement** (d12) per pair of active factions.

**Faction Turn (between sessions, ~15 minutes, §5)**

1. **Collisions first:** any two factions whose goals oppose make one opposed roll instead of separate rolls (§6).
2. **Advance:** each remaining active faction rolls Might + 1d6 vs. TN 8 and ticks its goal clock by Success Level.
3. **Signs:** write or roll one visible sign per faction that moved (§8).
4. **Resolve:** any clock at 0 resolves its stakes and aftermath (§7), then the faction picks a new goal.
5. **Note hooks** for the next session.

### What a Faction Is, Mechanically

One index card:

```
FACTION: ______________  Type: ________  Might: d__
Drive: ____________  Face: ____________________
Tags: ____________, ____________
Assets: ____________________ (1-3)
Weakness: ____________________
Goal: ____________________  Clock: d__ at __
Stakes when clock fills: ____________________
Dispositions: party __ / faction A __ / faction B __
Entanglements: ____________________
```

Dispositions use the existing NPC scale: Hateful (−3) to Intimate (+2).

### The Roster

The GM keeps **3 to 5 active factions**. Active factions have goal clocks and roll on faction turns. Everyone else in the world is a **backstage faction**: a name and a disposition, no clock, no rolls. Promote a backstage faction to active when the story turns toward it, retire an active faction backstage when its arc rests. The 15-minute budget is real: more than 5 active factions breaks it.

---

## 3. Faction Anatomy

- **Type** sets the fictional frame and suggests typical tags, goals, and assets (catalog).
- **Might** (d4 to d12) is the faction's single stat: overall power, reach, and competence. It rolls the faction turn and all opposed rolls. Guidance: the die roughly matches the tier of opposition the faction's rank and file would present as an encounter (catalog table).
- **Tags** (two) are the faction's character made mechanical. Each tag is one clause: a boon in its element, a special permission, or a cost. Tags are where a Zealous hidden cult and a Wealthy merchant league stop playing identically.
- **Assets** (1 at Might d4, 2 at d6 to d8, 3 at d10 to d12) are concrete possessions: a spy ring, a fortress, a trade fleet. An asset grants +1 boon on turn and opposed rolls where it plainly applies (maximum one asset boon per roll), and assets are what factions lose when things go wrong. A faction reduced to zero assets is broken (§10).
- **Weakness** (one) is the crack in the wall: a succession dispute, a hidden heresy, a debt. It fires as a complication on blunders and lost collisions, and players who uncover it gain +1 boon on rolls that exploit it.
- **Goal** is what the faction currently pursues, written with explicit **stakes**: "when this clock fills, X happens." The goal clock is a dice timer sized by scope (d4 minor scheme to d12 generational work, catalog table). One goal clock per faction at a time. Big agendas chain goals: arm for war (d6), then seize the ford (d6), then dictate the toll treaty (d8).

> **Design Note:** One goal clock per faction is the load-bearing simplification. It keeps the turn at one roll per faction, makes collisions legible (goals can be compared directly), and models focus honestly: an organization pushes one thing at a time, everything else is maintenance. GMs who want a sprawling conspiracy give it two cells as two factions.

---

## 4. Setup Procedure

Work through the seven steps with the [Faction Catalog](faction-catalog.md) open. Every step offers pick-or-roll. Target: 5 minutes per faction, and a starting roster of 3.

1. **Name, Type, Drive.** Roll or pick Type (d12) and Drive (d12). The type's entry lists its typical Might range, tags, and goals: use them as defaults, override freely. The drive is the want beneath every goal the faction will ever pick, and the best pairings put the drive and the eventual weakness in tension.
2. **Might.** Set by the guidance table. When unsure, d6 for local players, d8 for city powers, d10 for the powers behind cities.
3. **Tags.** Pick two from different groups (Means, Temper, Standing), or roll d6 twice on different groups.
4. **Assets.** One per the Might bracket, pick or roll from the three asset groups (Muscle, Coin, Whispers).
5. **Weakness.** Pick or roll d12. Keep it secret from players until play reveals it.
6. **Goal, stakes, clock.** Pick or roll the goal (d12), let the drive choose between candidates, then write the stakes as one concrete sentence: what changes in the world when the clock fills. Size the clock by scope. A goal without written stakes is not finished: the stakes sentence is what makes resolution automatic later.
7. **Dispositions and Face.** Note the faction's disposition toward the party and toward each other active faction. Give the faction its **Face** (d6): the named NPC through whom the players will experience it, detailed with the existing NPC generator when needed.

**Then, once per pair of active factions: an Entanglement (d12).** Dispositions are numbers, entanglements are the stories behind them, and each one is a pre-loaded collision, leverage point, or hook. Any pair at Hostile (−2) or worse with opposing goals is a collision waiting to fire, which is good: seed at least one.

> **Setting the first roster:** three factions with one hostile pair among them and at least one faction whose goal will touch something the players care about. That configuration guarantees the first two turns produce a collision and a sign the players feel.

---

## 5. The Faction Turn

Run between sessions, in any prep gap, or after each downtime phase, whichever comes first. In-game time is abstract: a faction turn represents "the time that has passed," whether that was a two-day dungeon crawl or five weeks of downtime. For long downtimes (a phase of 4+ weeks), run **two** faction turns.

For each active faction, in any order (collisions first, §6):

**Roll Might + 1d6 vs. TN 8.** Apply tag and asset boons where they plainly fit (maximum +1 tag boon and +1 asset boon on one roll).

| Success Level | Result |
|---------------|--------|
| **Blunder** | No progress. The faction's Weakness fires or a complication strikes: roll d6 on the Complication table (§6). |
| **Failure** | No progress. Optionally show a sign of struggle. |
| **Weak** | Tick the goal clock down 1. |
| **Strong** | Tick 2, **or** tick 1 and gain one small win: improve one disposition by 1 step, or repair or protect one asset. |
| **Critical** | Tick 2 and gain one small win, **or** tick 3. |

**Dormant factions** (nothing to do this turn, or the GM wants them quiet) skip the roll entirely. Skipping is a scheduling choice, not a rules exception.

**The party touch rule.** Anything the players directly engaged with in play is never resolved by a faction turn roll. If the party spent the session raiding the cult's shrine, the cult's clock moves by what happened at the table, not by dice in prep: as guidance, a decisive player success against the goal sets the clock back 2 or destroys it, a decisive failure grants the faction 2 free ticks, partial outcomes 1 either way. Faction turns fill the space the spotlight does not reach, never overrule it.

---

## 6. Collisions & Conflict

A **collision** exists when two active factions' goals oppose each other, target the same prize, or one faction's goal is aimed at the other. Check for collisions before rolling the turn.

**Opposed roll.** Both factions roll Might + 1d6 (tags and assets apply). Compare totals:

| Outcome | Winner | Loser |
|---------|--------|-------|
| Higher total wins | Ticks their clock by 1 (or 2 if they beat the loser by 6+) | Rolls d6 on the Complication table |
| Tie | Both tick 0. Both mark one visible sign of escalation. The collision repeats next turn with both at +1 boon (committed forces) | — |

A collision roll **replaces** both factions' normal turn rolls. A faction can be in at most one collision per turn: if three factions pile onto one prize, the GM pairs the two most direct rivals and the third rolls normally with its sign describing circling behavior.

**Complication Table (d6)** (also used by turn blunders)

| d6 | Complication |
|----|--------------|
| 1 | **Asset lost or crippled.** One asset (loser's choice the first time, GM's choice after) is destroyed, captured, or unusable until repaired at story cost. |
| 2 | **Weakness flares.** The faction's Weakness erupts into the open. The GM stages one visible consequence of it, and it becomes discoverable by anyone paying attention. |
| 3 | **Clock setback.** The goal clock ticks up 2 (away from completion, maximum its starting value). |
| 4 | **Standing wounded.** The faction's disposition with one third party (another faction, a settlement, the party) worsens by 1 step. |
| 5 | **Exposure.** Something hidden surfaces: a covert asset is revealed, a secret goal becomes public, a Hidden faction's involvement is named in the streets. |
| 6 | **Blood price.** A named NPC of the faction is killed, captured, or defects. The GM names them, and the vacancy is a hook. |

> **Design Note:** Collisions are the system's heartbeat and the answer to "how do players know the world moves without them." A war between two temples that the party never touches still fills the streets with processions, seized barges, and dead clerks, because every collision produces a winner's tick (a sign) and a loser's complication (a louder sign). GMs should engineer at least one live collision at all times.

---

## 7. Resolving a Filled Clock

When a goal clock reaches 0, the stakes sentence written at setup happens. No further adjudication: that is what the sentence was for. Then roll or pick on the Aftermath table:

**Aftermath Table (d6)**

| d6 | Aftermath |
|----|-----------|
| 1 | **Consolidate.** The faction converts the win into substance: gain one new asset fitting the goal. |
| 2 | **Escalate.** Appetite grows. The next goal is one clock size larger and aimed higher. |
| 3 | **Overreach.** The win cost more than it looks. The faction's Weakness becomes visible to anyone who investigates them, and their next turn roll suffers +1 bane. |
| 4 | **Rivals stir.** Another faction (active or backstage, GM's choice) turns against them: disposition between the two worsens by 1 step, and if goals now oppose, a collision is live. |
| 5 | **Power shifts.** The win rearranges standing: one disposition of the GM's choice anywhere on the map shifts 1 step, and if the goal's clock was at least as large as the faction's Might die, the faction steps Might up one (§10). |
| 6 | **Loose thread.** The win leaves something behind: a survivor, a document, a debt, an opened door. The GM turns it into an adventure hook offered to the party. |

Then the faction picks a new goal (setup step 6) and the wheel turns.

**Failed goals.** A goal can die before its clock fills: its object destroyed, its target gone, its faction beaten in successive collisions. When a goal becomes impossible, the faction takes one Complication (d6) as the recoil, then picks a new goal. Survival goals that fail are how factions break (§10).

---

## 8. Signs: Surfacing the Living World

Every faction that ticked, won, lost, or resolved this turn produces **one sign**: a concrete, perceivable trace in the world. Write one line per sign in the prep notes and spend them during the next session as scenery, rumor, or scene furniture. The catalog provides a d12 Signs table (market moves, processions, disappearances, new guard postings, letters, silences) with one-line prompts.

Rules of thumb:

- **Signs are perceivable, not explained.** The players see doubled tariffs, not "the Temple advanced its trade goal." Interpretation is their game (and Carouse, Research, and Listening Post facilities are their tools for it).
- **Hidden factions** (the tag) may suppress their sign, but a suppressed sign becomes +1 boon on the next roll made by anyone investigating them. Silence is also evidence.
- **Two signs minimum touch the party's orbit** per turn: their settlement, their domain, their NPCs. Signs the party structurally cannot encounter are prep waste.

> **Design Note:** Signs are the contract that keeps the system honest. The roll-and-tick machinery is invisible to players by nature, so the sign is the deliverable of every faction turn. A GM who runs three turns without a player noticing anything should stop rolling and start spending the sign backlog.

---

## 9. Players, Domains & Factions

**Investigating factions.** Existing tools already cover it, no new rules: Carouse surfaces rumors (signs with sources), Research uncovers a faction's goal once signs point at them (TN 10, as the superseded sketch had it), the domain's Listening Post reveals goal stage outright, Shadow Cells and social intrigue extract the rest. Learning a faction's **Weakness** grants +1 boon on rolls exploiting it, which makes investigation mechanically worth the weeks.

**Acting against (or for) a faction.** Player action resolves at the table per the party touch rule (§5): adventures, missions, and Petition/Negotiate outcomes move clocks directly. Guidance for domain missions: a successful Sabotage mission sets a faction clock back 1 (this replaces the "delay agenda timer" wording in the domain files), a Spread Word or Watch mission can deny a faction its sign or feed it a false one.

**The party's domain as a faction.** When a faction targets the party's domain, or the domain contests a prize, the domain joins the collision directly: it rolls its fitting **domain stat** (Force against raids, Influence against political moves, Secrecy against exposure, Wealth against economic strangling) in place of a Might die. For guidance, a domain "weighs" as Might roughly equal to a die of its rank (Rank 1 = d4 up to Rank 5 = d12). Domain complications from lost collisions use the faction Complication table with assets read as facilities (crippled, not destroyed) and Blood price read as a staff NPC.

**Factions never steamroll offscreen.** A faction goal whose stakes would directly, irreversibly harm the party or their holdings (burn the domain, kill their patron) must surface at least one sign and one playable session before the clock can fill. The system moves the world, but the players always get their scene.

---

## 10. Growth, Decline & Breaking

- **Stepping up.** A faction that completes a goal whose clock size was at least its current Might die may step Might up one (via Aftermath 5, or GM's choice at resolution). Maximum d12, and a step up should always be visible: new banners, new confidence, new enemies.
- **Stepping down.** A faction that loses its last asset, or fails a survival goal, steps Might down one and its next goal must be a survival or recovery goal.
- **Breaking.** A faction at Might d4 with zero assets that takes one more Complication breaks: it dissolves, is absorbed, or goes backstage as embers. Breaking is always staged with a final sign and usually a hook (the fleeing leader, the ownerless stronghold, the vengeful remnant).
- **New factions** enter play whenever the fiction produces them, including from the Aftermath and Complication tables themselves (a defector with followers, a rival stirred). Backstage first, active when they earn a clock.

---

## 11. Integration & Migration

**Supersedes downtime analysis §4.2 (Faction Agendas).** Migration map:

| Old (§4.2 sketch) | New |
|--------------------|-----|
| Faction Profile (type, agenda goal, disposition, motivations, pitfalls, resources) | Faction card: Type, Goal + stakes, dispositions, Tags (absorb motivations), Weakness (absorbs pitfalls), Assets (absorb resources) |
| Agenda dice timer d4, stages named Scheming → Climax | Goal clock, any die size by scope. Stage names retired: the clock value plus signs carry the same information without a lookup |
| Weekly tick, 1 faction per week, rotate | Per-session faction turn, all active factions, roll-driven ticks |
| Trouble settlement event advances a timer | Trouble event grants one faction a free tick (unchanged in spirit) |
| Players delay a timer via activities | Party touch rule + mission guidance (§9) |
| Resolution Consequences table | Stakes sentence + Aftermath table |

**Files to re-point when publishing** (not edited during design phase): downtime analysis §4.2 and its references in §3.1, §4.1, §5.3, the settlement event Trouble entries, the Contested Territory trait, the domain GDD's faction agenda mentions (patron refusal, Sabotage mission, Listening Post, domain events Trouble 1), and the Shrouded Court example's "faction agenda" wording. All map 1:1 per the table above.

**Where the rules land when approved:** `docs/10-gm-tools/02-factions/` (setup, turn, catalog as three short pages) or as a new section beside the random tables, matching their pick-or-roll presentation. The catalog's tables should become `<RollableTable>` components on publication.

---

## 12. Pacing, Balance & Playtest

**The 15-minute budget, audited.** Five active factions, one collision: 1 opposed roll + 3 turn rolls + 5 sign lines + at most one resolution ≈ 9 dice minutes and 6 writing minutes. Within budget. The budget breaks only by roster inflation (cap 5) or unwritten stakes (write them at setup, always).

**Clock math.** A weak success ticks 1, and a mid faction (Might d8, ~72% success rate vs. TN 8, average ~1.2 ticks per turn) completes a d6 goal in about 5 sessions, a d8 in about 7. That is one full faction arc per campaign act, which is the intended pulse. Blunders (~8% at d8) fire a complication roughly once per faction per act: felt, not constant.

**Playtest questions:**

1. Does the turn actually stay under 15 minutes at 5 factions? Where does time leak: rolls, signs, or aftermath interpretation?
2. Do players notice signs unprompted, and do they investigate? If signs pile up unspent, the minimum-two-in-orbit rule needs teeth or the Signs table needs sharper prompts.
3. Do collisions read as drama or as bookkeeping? If the loser's complications stop feeling like story, the table needs bigger swings.
4. Is one goal clock per faction enough, or do GMs immediately want two? (Hold the line unless multiple playtests break it.)
5. Does the domain-as-faction bridge hold when a faction attacks the party's domain, or does it need its own defense procedure beyond the collision roll?
6. Are d10 to d12 factions fun antagonists or unstoppable? Watch whether high-Might factions need player-facing brakes beyond the touch rule and stakes-surfacing rule.

---

## 13. Worked Example: Three Factions for the Marsh Campaign

Roster built in 15 minutes for the Shrouded Court playtest campaign, with one seeded collision.

**The Great Temple of Kesh** — Type: Temple. Drive: *Supremacy*. Might **d10**. Tags: *Wealthy, Zealous*. Assets: friendly officials (Whispers), granaries (Coin), temple guard (Muscle). Weakness: *hidden heresy* (Meresankh's secret faith, known to the party's patron). Face: *the ambitious second* (Meresankh herself, the party's own patron wearing her public office). Goal: **dictate the river toll treaty** (d8 clock at 8). Stakes: "Kesh temple collects tolls on all upriver trade, and Perit's independence ends on paper." Dispositions: party 0 (unknowing), River League −2.

**The River League of Perit** — Type: Merchant Guild. Drive: *Protect their own*. Might **d6**. Tags: *Connected, Desperate*. Assets: barge fleet (Coin), smuggling routes (Whispers). Weakness: *crippling debt* (to the Temple itself). Face: *the weary pragmatist* (Guildmother Satu, who keeps the boats moving). Goal: **break the toll blockade** (d6 clock at 6). Stakes: "Free passage restored, Kesh humiliated on the water." Dispositions: party +1 (the Court smuggles through them), Temple −2.

**The Capital Inquiry** — Type: Foreign Power (crown agents). Drive: *Loyalty to one person* (the throne's chancellor). Might **d8**. Tags: *Hidden, Ruthless*. Assets: spy ring (Whispers), writ of the throne (Whispers). Weakness: *leader's vice* (the chief inquisitor gambles). Face: *the newcomer with everything to prove* (Inquisitor Wenamun, first command). Goal: **find who funds the marsh estate** (d6 clock at 6). Stakes: "Nehsi's financing is documented and reaches the capital court." Dispositions: party −1 (they do not know the party, yet), all others 0.

**Entanglements:** Temple and League roll *Trade dependence* (the League's debt payments fund the Temple's building works, so strangling Perit strangles their own income, a contradiction the players can find and widen). Temple and Inquiry roll *Rivals for one patron* (both court the capital's favor). League and Inquiry roll *One does not see the other*: the Inquiry has not noticed the barge network yet, and Satu's smugglers move at +1 boon against them until their first sign lands.

**Turn one, simulated.** Collision: Temple vs. League over the river (opposed goals). Temple rolls d10+1d6+1 (Wealthy, coin war) = 13, League rolls d6+1d6+1 (barge fleet) = 8. Temple wins by 5: 1 tick (clock 8 → 7). League rolls Complication: 4, *Standing wounded*, their disposition with Perit's harbormaster sours. The Inquiry rolls d8+1d6 = 11, strong success: ticks 2 (clock 6 → 4) and takes the small win, improving disposition with a marsh village headman to +1 (an informant). Signs, three lines: *toll barges fly temple banners at the river mouth* (Temple), *League factors argue publicly with the harbormaster* (League), and for the Hidden Inquiry, sign suppressed, so the next investigation aimed at the new faces in the marsh villages gains +1 boon. Total prep time: about 6 minutes, and the party's next Carouse has three rumors waiting.
