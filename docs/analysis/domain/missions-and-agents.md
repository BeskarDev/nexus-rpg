# Missions & Agents

> **Companion to:** [Build Your Domain — GDD](DOMAIN_SYSTEM_GDD.md), §11. Missions let the domain's lower-ranked members work in parallel with the party's adventures, using the dice timer framework shared with faction agendas.

---

## 1. Agents & the Agent Pool

Agents are the domain's capable rank-and-file: scouts, bravos, initiates, peddlers, cutpurses. They are an abstraction, not statted NPCs. The GM narrates them as named people at the table (the mission outcomes will name some of them whether the party likes it or not).

The **agent pool** is the number of missions the domain can run at once, derived from the **Force** die:

| Force Die | Agent Pool |
|-----------|-----------|
| d4 | 1 |
| d6 | 1 |
| d8 | 2 |
| d10 | 2 |
| d12 | 3 |

A **Garrison** facility increases the pool by 1. Each mission occupies 1 slot of the pool. Missions of danger tier 4 or 5 occupy 2 slots.

---

## 2. Launching a Mission

Any adventurer can launch a mission during a downtime week as a free action alongside their normal activity (planning a job is an evening's work, not a week's).

1. **State the objective.** Pick from the objective menu (§3) and name the concrete target: what, where, who.
2. **GM sets danger tier and timer.** Danger tier 1 to 5 by how defended, remote, or perilous the job is. Timer **d4** for jobs in the domain's region, **d6** for distant or intricate jobs. The GM states both openly, plus the most likely complication (a War Room makes this briefing a rule).
3. **Commit and outfit.** Occupy the agent pool slots and pay **25 coins × danger tier** for gear, bribes, and travel.

| Danger Tier | TN | Fits Opposition Like | Pool Slots | Outfitting |
|-------------|----|----------------------|------------|------------|
| 1 | 8 | Farmers, townsfolk, an unlocked door | 1 | 25 |
| 2 | 10 | Guards, wilderness, a rival gang | 1 | 50 |
| 3 | 12 | Soldiers, a fortified site, a hostile faction | 1 | 75 |
| 4 | 14 | Elite defenders, a city's law, a monster's ground | 2 | 100 |
| 5 | 16 | The near-impossible, jobs the party itself would dread | 2 | 125 |

> **Design Note:** Agents are tier 1 to 2 people. Danger 1 to 2 missions are their bread and butter. Danger 3 is a stretch, and danger 4 to 5 missions fail more often than not without a directing adventurer, a specialist seat bonus, and good facilities. If the job truly matters, the party should go themselves. Missions run parallel to adventures, they never replace them.

---

## 3. Objective Menu

Eight objectives cover the design space. Each lists its **resolving stat** (which domain die rolls at resolution) and its **reward** on a strong success. Rewards marked "coins" use the Coin Reward column of the danger table in §5.

| # | Objective | Resolving Stat | Strong Success Reward |
|---|-----------|----------------|----------------------|
| 1 | **Acquire.** Buy, salvage, or hunt down goods or a specific item. | Wealth or Force | The goods (market value up to the coin reward), or coins |
| 2 | **Scout.** Map, observe, or shadow a place, route, or person. | Force or Secrecy | Intel: +1 boon on the party's first two rolls engaging the target, and the GM states two true facts about it |
| 3 | **Escort.** Guard a person, shipment, or caravan on its way. | Force | Coins, and gain 1 progress toward Influence |
| 4 | **Heist.** Take a specific thing that is guarded and not for sale. | Secrecy | The thing itself. Hidden domains: also increase Heat by 1 even on success |
| 5 | **Sabotage.** Disrupt a rival's operation, supply, or scheme. | Secrecy or Force | Delay one faction agenda dice timer by 1 tick, or inflict 1 setback on a rival domain stat (GM's judgment on rivals without sheets) |
| 6 | **Recruit.** Swell the ranks, or approach a named specialist. | Influence | Gain 2 progress toward Force, or a specialist candidate (grade ≤ danger tier + 1) willing to talk terms |
| 7 | **Spread Word.** Rumors, propaganda, proselytizing, or a message delivered. | Influence | Gain 2 progress toward Influence, or plant one rumor of the party's wording in a named settlement |
| 8 | **Watch.** Guard the home ground, counter spies, escort locals. | Force or Secrecy | Cancel the next Trouble result on the Domain Event table this downtime phase, or reduce Heat by 1 |

---

## 4. Running Missions

Each Domain Turn, tick every mission timer down by 1. **While the party is away adventuring, mission timers also tick once per week of in-world time.** Missions genuinely run in the background: the party returns home to results, not to paused clocks.

When a timer reaches 0, resolve the mission with one roll.

**Mission roll:** resolving stat die + 1d6 + flat bonuses vs. the danger TN. Flat bonuses (maximum +2 total) come from facilities (Drill Grounds, Web of Whispers) and specialist seats (see [Domain NPCs & Staff](domain-npcs.md)). If an adventurer spent a week on **Direct a Mission**, the roll instead may use that adventurer's Attribute + Skill fitting the objective, and gains +1 boon.

---

## 5. Outcomes

| Success Level | Result |
|---------------|--------|
| **Blunder** | The job goes wrong badly. The agents are captured or scattered (GM picks whichever bites harder, and names the agents involved). The mission fails, the pool slots stay occupied until the agents are freed or written off (write-off: lose 1 Force progress, or a setback if there is none). Hidden domains: increase Heat by 2. A **rescue or ransom hook** always follows: the GM states where the agents are and what freeing them would take. |
| **Failure** | The agents return empty-handed but intact. The outfitting cost is spent. The GM states the concrete obstacle that stopped them. Relaunching the same mission gains +1 boon (they know the ground now). |
| **Weak** | The objective is achieved at a price. Apply the reward, then roll on the Complication table below. |
| **Strong** | The objective is achieved cleanly. Apply the reward. |
| **Critical** | Achieved, and then some. Apply the reward and roll on the Windfall table below. |

Mission coin rewards pay into the domain's **treasury**, never into personal purses (GDD §6: the treasury spends only on the domain, and the party extracts value as goods and services). Physical goods an Acquire or Heist mission brings home can be kept and used by the party directly: that is extraction in kind, working as intended.

**Coin rewards by danger tier** (for objectives that pay in coins):

| Danger Tier | Coin Reward |
|-------------|-------------|
| 1 | 50 |
| 2 | 150 |
| 3 | 400 |
| 4 | 1,000 |
| 5 | 2,500 |

**Complication Table (d6, on a weak success)**

| d6 | Complication |
|----|--------------|
| 1 | **Casualty.** An agent is hurt. The pool is reduced by 1 until the end of the next downtime phase. |
| 2 | **Expenses.** Bribes and losses eat 50 coins × danger tier from the reward or treasury. |
| 3 | **Noticed.** Someone traced the job partway home. Hidden domains: increase Heat by 1. Open domains: a named NPC or faction now holds a grudge at Suspicious. |
| 4 | **Damaged Goods.** A physical reward arrives damaged (one Durability loss or reduced value by half, whichever applies). Non-physical reward: it arrives late, at the end of the next downtime phase. |
| 5 | **Debt of Honor.** The agents made a promise in the domain's name to get out. The GM states the promise. It is real. |
| 6 | **Shaken.** The agents return rattled. This mission's slots stay occupied for 1 extra week of rest. |

**Windfall Table (d6, on a critical)**

| d6 | Windfall |
|----|----------|
| 1 | **Rich Take.** Double the coin reward, or add the danger tier's coins to a non-coin reward. |
| 2 | **Momentum.** Gain 1 progress toward the mission's resolving stat. |
| 3 | **New Friend.** A capable outsider helped. Gain a new NPC contact at Friendly (roll the NPC Role table). |
| 4 | **Loose Tongue.** The agents overheard something. Gain one rumor plus the current stage of one active faction agenda. |
| 5 | **Volunteer.** Someone from the job wants in. Gain 1 progress toward Force. |
| 6 | **Trail of More.** Evidence of something bigger. The GM provides an adventure hook connected to the mission's target. |

---

## 6. Patron Obligation Missions

When a patron demand (GDD §14) takes the form of a mission, the patron defines the objective and danger tier, pays half the outfitting, and takes the reward. The domain gains no treasury reward but keeps complication and windfall results, and the patron's disposition and stipend stay healthy. Refusing follows the normal refusal rules.

---

## 7. Worked Examples

> **Scout, danger 2, timer d4.** The party wants eyes on a temple compound before they infiltrate it next month. Two initiates pose as pilgrims. Outfitting 50 coins, resolving stat Secrecy (d6). Four weeks later, roll d6 + 1d6 + 1 (Web of Whispers) vs. TN 10: total 11, weak success. The party gets the intel (+1 boon on their first two rolls at the compound, two true facts: the night watch is bribed already by someone else, and the undercroft floods at the new moon) but rolls a complication: Noticed, Heat +1. Someone marked the false pilgrims.

> **Recruit, danger 3, timer d6, directed.** The party wants master smith Ahatti (grade 4) for their planned Grand Atelier. She works for a rival guild in the capital. The envoy character spends a week on Direct a Mission, planning the approach. At resolution the player rolls their own Spirit + Influence with +1 boon vs. TN 12: strong success. Ahatti agrees to visit the domain and hear terms. Hiring her is now a roleplay scene and a wage negotiation, not another roll.

> **Heist blunder.** A danger 4 heist on a magistrate's strongroom blunders. Two named agents, Sut and Reddu, are taken by the city watch. Heat +2. The pool loses 2 slots until the party ransoms them (400 coins), breaks them out (an adventure), or writes them off (1 Force setback, and Sut and Reddu know things about the domain). The GM states all three options openly. Nothing about this is a dead end. It is next session's material.

---

## 8. Design Notes

- **One roll per mission.** All texture lives in the bounded outcome tables, not in repeated rolls. A downtime phase with three missions resolves in minutes.
- **Blunders are hooks, not deletions.** Captured agents are the mission system's best output: they generate exactly the "rescue our people" adventures that make an organization campaign feel alive.
- **The stat dice are the difficulty curve.** A young domain (d4s and d6s) succeeds reliably only at danger 1 to 2. Growing Force, Influence, and Secrecy is what unlocks the bigger jobs, which is the meta progression loop working as intended.
- **No mission XP, no mission treasure inflation.** Coin rewards sit below adventure treasure for the same risk tier and are largely eaten by outfitting, wages, and upkeep. Missions are for reach, intel, and story, not income optimization. Trade Venture is the income activity.
