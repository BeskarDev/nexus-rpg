# Fighting — Talent Design Workbench

> **Source:** [docs/03-statistics/06-talents/fighting.md](../../../03-statistics/06-talents/fighting.md) | **Main Analysis:** [TALENT_SYSTEM_ANALYSIS.md](../TALENT_SYSTEM_ANALYSIS.md)

## 1. Skill Identity

**Role Spread:** Excels: Offense | Decent: Defense, Control | Weak: Healing, Support, Utility

**Primary Archetypes:** Barbarian (pillar), Brawler (pillar), Champion (pillar), Duelist (pillar), Fighter (pillar), Gladiator (pillar), Hoplite (pillar), Monk (pillar), Rogue (pillar), Swashbuckler (pillar), Tamer (pillar), Warlord (pillar); also support for Magus, Priest

**Identity Tags:** strike precision, weapon technique, defensive footwork, stance discipline, reach mastery

**Design Lens:** Fighting is the system's broadest pillar — 12 archetypes claim it as their primary skill, making weapon mastery the foundation of most combat identities. Its talents create meaningful loadout differentiation through weapon-type mastery trees and reactive defense styles (dueling, shield, riposte windows). The unique contribution is contested-space mechanics — polearm reach control, grapple-into-restrain, counterattack triggers — that express the physical logic of melee combat rather than raw damage escalation. It is also the only skill with zero non-combat talent content, an imbalance that grows more notable as character builds deepen.

---

## 2. Current Talent Inventory

| Talent | Path | Max Rank | Status | Role | Notes |
|--------|------|----------|--------|------|-------|
| Art of Fighting | Signature | R4 | Complete | Combat | Combat Art access; Signature should reach R5 |
| Axe Mastery | Basic | R3 | Complete | Combat | Disarm hook at R1; AV rend at R3 |
| Blade Mastery | Basic | R3 | Complete | Combat | Pierce/slash swap at R1; solid R2 payoff |
| Defensive Dueling | Basic | R3 | Complete | Combat | Core duelist defensive talent |
| Disciplined Fighter | Basic | R3 | Complete | Combat | Re-roll + Combat Art frequency boost |
| Dual Wielder | Basic | R3 | Complete | Combat | Dual-wield enabler; R3 adds extra hit |
| Heavy Weapon Mastery | Basic | R3 | Complete | Combat | Static Str bonus at R3 (bookkeeping risk) |
| Mace Mastery | Basic | R3 | Complete | Combat | Reliable minimum damage; daze at R2 |
| Martial Artist | Signature | R3 | Complete | Combat | Improvised/unarmed + agile double-hit; Signature should reach R5 |
| Polearm Mastery | Basic | R3 | Complete | Combat | Reach-threat zone; push immunity at R3 |
| Protective Stance | Basic | R3 | Complete | Combat | Shield-user; resistance to protected damage at R3 |
| Pugilist | Basic | R3 | Complete | Combat | Unarmed WD progression; HP recovery on hit at R3 |
| Riposte | Basic | R3 | Complete | Combat | Reactive attack on parry-miss |
| Shield Mastery | Basic | R3 | Complete | Combat | Active SL reduction; Durability management |

**Summary:** 14 talents total — 14 complete, 0 incomplete. Max rank: R4 (Art of Fighting). Role distribution: 100% combat / 0% utility / 0% hybrid.

---

## 3. Gaps & Priorities

**Signature gap:** Art of Fighting covers Combat Art breadth for all archetypes. Weapon-type masteries cover blades, axes, maces, polearms, shields, heavy weapons, dual-wielding, and unarmed — the notable absence is whip/exotic weapons (Tamer's core weapon with zero talent support). The Warlord archetype has no Fighting-native tactical command talent; its "tactical commands" identity tag relies entirely on Education/Commander.

**Role gaps:** Fighting is the only skill in the system with zero utility, zero downtime, and zero social content. No talent interacts with anything outside a combat scene. This is the most extreme skill-internal role imbalance in the system — a character investing heavily in Fighting has nothing to spend TP on beyond combat loadout refinement.

**System integration gaps:** Zero interaction with Challenges, Social Intrigue, or Travel. Fighting characters have no talent-supported contribution in non-combat challenge scenes — no downtime sparring, no martial tradition social leverage, no scout-combat role in travel. A "Code of Arms" talent leveraging dueling culture for social capital, or a "Vanguard" talent for the travel combat-guard role, would open the design space.

**Rank gaps:** Only Art of Fighting reaches R4 with full content. Martial Artist is Signature-designated (should reach R5) but caps at R3. Pact-equivalent Signature progressions for Defensive Dueling and Pugilist are absent. Needs at minimum 2–3 High-Level (R4–R5) talents to serve the 12 archetypes at Grandmaster tier — currently a character with Fighting 5 has 5+ unspendable TP.

**Priority ranking for design work:**
1. Add 1–2 non-combat talents (downtime/social/travel hooks) — Fighting is uniquely underserved in this dimension
2. Extend Art of Fighting and Martial Artist to R5 per their Signature designation
3. Add a whip/exotic weapon mastery talent for Tamer archetype
4. Design 2–3 High-Level (R4–R5) talents for zone control (Hoplite/Warlord) and stance mastery (Duelist/Monk)

---

## 4. Design Space

Fighting's unexplored territory clusters around three themes: the **non-combat life of a warrior** (downtime, reputation, martial culture), **stance-and-posture systems** beyond individual weapon masteries, and **contested-space mechanics** that go deeper than the existing reactive talents.

On stances: Defensive Dueling is the closest thing to a formal stance, but it is a passive condition rather than an activated mode with lifecycle. A dedicated stance system — choosing between offensive, defensive, and aggressive postures with explicit activation costs and trade-offs — would serve Monk, Gladiator, and Duelist and has no equivalent elsewhere in the system. This is design territory the skill owns that nothing else touches.

On the non-combat dimension: a "Martial Reputation" talent could convert combat victories into social capital (authority among soldiers, intimidation of informants), a "Sparring Partner" downtime activity talent could let a fighter temporarily improve an ally's combat roll, and a "Veteran's Read" talent could give the fighter insight into an enemy's technique via a Perception-adjacent Insight use. Any one of these would break the 100% combat dominance without contradicting Fighting's identity.

### Unexplored Thematic Angles
- **Formal stance discipline:** Activated stance modes (offensive/defensive/aggressive) with explicit trade-offs — attack power for defense or vice versa — rather than always-on passives; would serve Monk, Gladiator, and Duelist simultaneously
- **Disarm mastery:** Axe Mastery R1 has a disarm hook but no talent builds a dedicated disarm-focused playstyle; a "Weapon Breaker" or "Empty Hand Mastery" talent would fill the Duelist/Brawler gap
- **Martial authority (downtime/social):** A "Martial Reputation" or "Code of Arms" talent granting social leverage from demonstrated combat excellence — dueling etiquette, arena reputation, soldier's authority
- **Zone-denial formations:** A "Hold the Line" or "Shield Wall" talent beyond Protective Stance, allowing the fighter to define territory — enemies entering a zone suffer consequences — serving Hoplite and Warlord specifically

### System Integration Opportunities
- **Challenges:** Physical challenges (smashing obstacles, endurance contests, weight-bearing feats) have no Fighting talent hook — a talent making Fighting viable as a primary challenge skill for physical trials would be natural
- **Social Intrigue:** A "Code of Arms" talent or "Martial Reputation" talent converting combat victories and dueling culture into social advantage (especially in warrior-culture social scenes)
- **Travel:** A "Vanguard" talent for the travel combat-guard role — when the party is ambushed during travel, the fighter's preparation grants Initiative or reaction-attack bonuses; the only travel role that Fighting should own but currently doesn't

---

## 5. Talent Suggestions

### Phase 1 — Diverge: Design Space Exploration

Ten seed ideas spanning Fighting's unexplored territory:

1. **Weapon Breaker** — Dedicated disarm mastery for any weapon type: build footwork and leverage techniques into a full talent tree, extending the Axe Mastery R1 hook into a complete playstyle for Duelist/Brawler.
2. **Whip Master** — Enable the whip as a precision control weapon with disarm, trip, and restrain mechanics; Tamer's core identity weapon has zero Fighting talent support.
3. **Veteran's Eye** — Read an opponent's fighting style through observation (MND + Fighting roll), granting tactical intelligence and social authority in martial-culture contexts.
4. **Hold the Line** — Zone-denial formation: designate a line; enemies crossing it provoke Opportunity Attacks from all adjacent allies. Pure Hoplite territorial defense fantasy.
5. **Iron Tempest** — Gladiator killing fury: on a killing blow, press the attack against an adjacent enemy; once per day a whirlwind assault against all enemies in reach. Barbarian/Gladiator capstone.
6. **Sparring Master** — Downtime talent: spend an hour sparring with an ally, granting them +1 boon on Fighting rolls during the next scene.
7. **Code of Arms** — Social/cultural talent: fighting victories and dueling reputation grant leverage in warrior-culture social scenes; substitute Fighting for a social skill in martial-prestige contexts.
8. **Blade Dancer** — Mobile striker: after hitting with a light weapon, move without provoking Opportunity Attacks; at high rank, counter-attack and reposition when an enemy misses you.
9. **Phalanx Commander** — Formation leadership: grant AV bonus to shield-bearing allies and once per scene issue a simultaneous coordinated strike. Warlord/Hoplite prestige.
10. **Battle Rhythm** — Momentum stance: successive hits against the same target accumulate a flat damage bonus (max +3), reset when you switch targets or are hit yourself. Fighter/Champion escalation.

---

### Phase 2 — Converge: Design Selections

| # | Design | Path | Rationale |
|---|--------|------|-----------|
| 1 | **Art of Fighting R5** | Signature extension | Mandatory — Signature talent must reach R5; once/day Critical Success is the session-defining pinnacle |
| 2 | **Martial Artist R4–R5** | Signature extension | Mandatory — Signature talent capped at R3; Monk/Brawler Grandmaster identity incomplete |
| 3 | **Phalanx Commander R4–R5** | High-Level (Fighting 3 + Influence 3) | Fills Hoplite/Warlord zone-control gap; cross-skill prestige puts tactical command inside Fighting itself |
| 4 | **Blade Dancer R4–R5** | High-Level (Fighting 3 + Stealth 3) | Fills Duelist/Swashbuckler prestige gap; mobile striker fantasy at Master/Grandmaster tier |
| 5 | **Whip Master R1–R3** | Basic | Fills Tamer's zero Fighting talent support for their core identity weapon |
| 6 | **Veteran's Eye R1–R3** | Basic | Breaks Fighting's 0% utility by adding observation, tactical intelligence, and martial-culture social authority |

**Deferred (noted, not designed here):**
- *Iron Tempest* (Fighting 3 + Athletics 3) — Gladiator killing-momentum talent; valid but Barbarian/Gladiator's primary gap is in Athletics (Grappler), not Fighting. Revisit when Athletics is extended.
- *Weapon Breaker* — Disarm mastery tree; Axe Mastery R1 already covers the mechanical hook; a full tree adds complexity without a clear archetype demanding it.
- *Battle Rhythm* — Momentum stacking creates bookkeeping and a "same-target incentive" that could distort tactical decision-making in unwanted ways.

---

### Phase 3 — Develop: Full Mechanical Designs

---

#### 1. Art of Fighting — Rank 5 (Signature Extension)

**Path:** Signature (R1–R5) | **Archetypes:** Fighter, Gladiator, Hoplite, Magus (secondary)

> *Extends the existing Art of Fighting talent. R1–R4 remain unchanged.*

**Rank 5:** Once per day, before making a Fighting roll, you can declare a **Transcendent Strike**. If the roll succeeds, treat the SL as a Critical Success (6+ over the TN) for all purposes — including damage, triggered effects, and Combat Art outcomes.

**Design Notes:**
- Declare before rolling — preserves meaningful resource commitment tension; a failure wastes the charge.
- "If the roll succeeds" means a miss or fumble still burns the resource. Mortal pinnacle, not invincibility.
- Applies to any Fighting roll, not just standard attacks: Supreme Combat Arts, grapple maneuvers, special fighting actions.
- Validated against §8.4 "Legendary Action" template and §9.4 directive ("once/day treat Fighting roll as Critical Success").

---

#### 2. Martial Artist — Ranks 4 and 5 (Signature Extension)

**Path:** Signature (R1–R5) | **Archetypes:** Monk, Brawler, Swashbuckler (secondary)

> *Extends the existing Martial Artist talent. R1–R3 remain unchanged.*

**Rank 4:** You also gain the following abilities:
- Your unarmed attacks deal 5 weapon damage (replaces any lower unarmed weapon damage, including Pugilist R3 if taken).
- Once per scene, when you hit with an unarmed strike or agile weapon, you can deliver a **Devastating Strike**. The target must roll STR + Fortitude vs. TN 10 or be briefly stunned.

**Rank 5:** You also gain the following abilities:
- Your unarmed attacks deal 6 weapon damage and are treated as magical weapons for the purpose of overcoming non-magical damage resistance and immunity.
- Once per day, when you hit with an unarmed strike or agile weapon, you can execute a **Pinnacle Strike**. The target must roll STR + Fortitude vs. TN 12 or be stunned for a short duration.

**Design Notes:**
- WD ladder: Pugilist R1 (2) → R2 (3) → R3 (4) / Martial Artist R4 (5) → R5 (6). A character with both Pugilist and Martial Artist achieves maximum unarmed capability; Martial Artist R4–R5 explicitly supersedes Pugilist's WD ceiling.
- Devastating Strike uses a conditional save at TN 10 — achievable by most enemies, which keeps the stun meaningful without being trivially blocked.
- "Treated as magical" at R5 is the Monk's pinnacle: technique so refined it overcomes what raw force cannot. This follows the §8.4 "Grandmaster Signature" template explicitly. It does not grant magic to the character ontologically.
- Two tightly related bullets per rank: WD+magic is one unified upgrade, Pinnacle Strike is the active payoff. Consistent with R1–R3 format.

---

#### 3. Phalanx Commander (High-Level Prestige)

**Path:** High-Level (R4–R5 only) | **Prerequisites:** Fighting 3, Influence 3
**Archetypes:** Hoplite, Warlord, Fighter (secondary), Champion (secondary)

**Rank 4:** You gain the following abilities:
- While you wield a shield, shield-bearing allies within close range gain +1 AV (ability bonus).
- Once per scene, as a Quick Action, you issue a **Formation Strike** command. All shield-bearing allies within close range who can hear you may immediately make a free Opportunity Attack against one enemy of your choice within their melee reach. These attacks resolve simultaneously.

**Rank 5:** You also gain the following abilities:
- Your +1 AV (ability bonus) now extends to all shield-bearing allies within short range.
- Once per day, at the start of a combat scene before the first round begins, you can declare a **Tactical Formation**. All allies who can hear you act before all enemies in the first round of combat, regardless of the normal initiative order.

**Design Notes:**
- You must wield a shield to grant the AV bonus — prevents a pure "commander" from standing at the back demanding benefits without being in the shield wall.
- Formation Strike requires close range (the tight formation) and shield-bearing allies — flavor-accurate for Hoplite/phalanx play; deliberately does not function for loose warbands.
- Tactical Formation is once per day and affects only round 1 — significant for ambush situations and set-piece battles, but bounded. Does not alter initiative in subsequent rounds.
- R5 range extension (close → short) follows the §8.4 "Scope Expansion" template.

---

#### 4. Blade Dancer (High-Level Prestige)

**Path:** High-Level (R4–R5 only) | **Prerequisites:** Fighting 3, Stealth 3
**Archetypes:** Duelist, Swashbuckler, Rogue, Brawler (secondary)

**Rank 4:** Once between your turns, when you hit an enemy with a light weapon, you can immediately move to any unoccupied space within close range without provoking Opportunity Attacks. This movement does not count against your normal Movement for the turn.

**Rank 5:** Once per scene, when a melee attack against you misses, you can immediately make a free Opportunity Attack against the attacker, then move to any unoccupied space within close range without provoking Opportunity Attacks.

**Design Notes:**
- R4 "once between your turns" resets each round, creating sustained repositioning pressure against enemies trying to surround or pin you.
- R5 is the defensive payoff: your evasion becomes a counter-attack. Once per scene ensures it is memorable and tactically significant.
- Both ranks can trigger in the same round (R4 on your attack, R5 when an enemy retaliates and misses) — the combination rewards Duelist positioning without providing runaway power.
- No damage bonus — pure mobility and positioning. Fits Fighting's "Control" role without inflating damage numbers.
- Prerequisites map cleanly to Swashbuckler's pillar skills and Rogue's Fighting + Stealth combination.

---

#### Scar-Forged (High-Level Prestige)

**Path:** High-Level (R4–R5 only) | **Prerequisites:** Fighting 3, Fortitude 3
**Archetypes:** Barbarian, Champion, Fighter (primary); Brawler (secondary)

*This warrior's deepest credential is survival itself — each wound they carry is evidence of a fight that failed to end them.*

**Rank 4:** Once per scene, when a melee attack deals damage to you, you can use your Quick Action to make an immediate Opportunity Attack against the attacker. You gain +1 boon (ability bonus) on this Opportunity Attack.

**Rank 5:** Your counter-reflex becomes permanent mastery. Whenever a melee attack deals damage to you, you can use your Quick Action to make an immediate Opportunity Attack against the attacker with +1 boon (ability bonus). You can use this ability once per round. Once per day, when you are reduced to half your maximum HP or below for the first time in a scene, you can immediately make an Opportunity Attack against any enemy within your reach.

**Archetype enablement:** Barbarian, Champion, Fighter. These archetypes define themselves by enduring punishment — this talent makes every hit the enemy lands an investment they will regret.

**Capstone feeling:** Other warriors become more cautious when hurt. This one becomes more dangerous. Enemies learn that the question is not whether they can hurt this warrior — it is whether they can afford to.

**Design Notes:**
- R4 "once per scene" positions this as a tactical high point: one retaliatory strike per encounter, chosen by the player for maximum impact. The +1 boon (ability bonus) is the correct bonus type for a natural combat reflex from a talent.
- R5 permanent version follows the R4→R5 "conditional→consistent" template precisely: what required a once-per-scene declaration becomes an always-available reflex, capped at once per round to prevent multi-hit scenarios from generating unbounded attack chains.
- The once-per-day bonus Opportunity Attack when reduced to half HP is the dramatic high point — it triggers without requiring the Quick Action, capturing the survival instinct moment when the warrior's body reacts before their mind does.
- Prerequisites Fighting 3 + Fortitude 3 target the Barbarian archetype exactly (two of their four pillar skills) while also being accessible to Champion and any Fighter who invests in endurance. Duelist, Swashbuckler, and Rogue cannot access this without a significant pivot — appropriate, as those archetypes evade damage rather than absorb it.
- Zero damage bonuses at either rank. The talent delivers action economy (extra attacks as a reaction to damage) rather than raw damage escalation, which avoids stacking oppressively with weapon mastery damage talents.
- Directly fills the archetype cluster (Barbarian, Champion, Fighter) not served by Phalanx Commander (formation tactics) or Blade Dancer (mobile evasion), completing three distinct High-Level capstone identities for Fighting.

---

#### 5. Whip Master (Basic)

**Path:** Basic (R1–R3) | **Archetypes:** Tamer, Gladiator, Swashbuckler (secondary), Brawler (secondary)

**Rank 1:** You can wield whips as melee reach weapons. A whip deals 1 weapon damage and has the reach and light properties. On a strong or critical hit with a whip, you can use your Quick Action to either attempt a Disarm Action against the target or knock them prone (the target rolls AGI + Athletics vs. TN 10 to avoid falling prone).

**Rank 2:** You gain the following abilities:
- Your whip attacks deal 2 weapon damage.
- On a strong or critical hit with a whip, you can pull the target up to 1 movement step closer to you (in addition to dealing normal damage).
- When you use Distract against a creature you have hit with your whip this turn, you gain +1 boon on the roll.

**Rank 3:** You gain the following abilities:
- Your whip attacks deal 3 weapon damage.
- Once per scene, on a hit with a whip against a target your size or smaller, you can attempt to restrain them. The target rolls AGI + Athletics vs. TN 12 or becomes restrained for a short duration. A restrained target can use an Action to attempt to break free by rolling STR or AGI + Athletics vs. TN 12.

**Design Notes:**
- R1 defines the whip weapon at the same time it defines the talent — no separate equipment entry required. A self-contained Basic talent.
- WD progression (1→2→3) caps lower than offensive masteries. The whip is a control weapon; lower damage is the deliberate cost of disarm/prone/pull/restrain access.
- Prone at R1 (Quick Action follow-up, AGI save TN 10) mirrors Axe Mastery's Disarm Quick Action pattern — consistent system precedent.
- Pull at R2 enables Tamer's repositioning fantasy: drag dangerous enemies away from fragile allies or toward hazards.
- Restrain at R3 is the subdual pinnacle: holding an enemy without lethal force. "Short duration" with an active break-out roll prevents the condition from trivializing encounters.
- Distract synergy at R2 reflects the whip's theatrical use as a distraction and intimidation instrument — flavor-accurate for the Tamer archetype.

---

#### 6. Veteran's Eye (Basic)

**Path:** Basic (R1–R3) | **Archetypes:** Fighter, Champion, Warlord, Duelist, Gladiator (all benefit)

> *Breaks Fighting's 0% utility. A non-combat talent for the tactical observer — a fighter who reads opponents, coaches allies, and commands authority in martial culture.*

**Rank 1:** Once per scene, you can spend a Quick Action to observe a creature's fighting technique. Roll MND + Fighting vs. TN 8. On a success, the GM reveals one of the following (your choice): the creature's approximate HP tier (healthy, bloodied, or near death), one Combat Art or special ability they possess, or their highest or lowest attribute. On a strong or critical success, you learn two of these instead.

**Rank 2:** You gain the following abilities:
- Your Veteran's Eye observation can be performed passively — once per scene, you may observe a creature you can see at the start of combat or during reconnaissance without spending a Quick Action.
- When you succeed on a Veteran's Eye check, you gain +1 boon on your next Fighting roll against that specific creature during the same scene.

**Rank 3:** You gain the following abilities:
- When you have observed a creature with Veteran's Eye, you can spend 10 minutes coaching an ally using what you learned. That ally gains +1 boon on their first Fighting roll against that creature during the next scene.
- In social situations involving martial culture, dueling etiquette, military hierarchy, or arena reputation, you may use MND + Fighting in place of your usual social skill for one such roll per scene. The GM adjudicates when this applies.

**Design Notes:**
- R1 once-per-scene meets the "significant limited ability" budget.
- R2 conditional boon (unlimited when trigger fires — observed creature) is valid per §6.2. Passive upgrade removes the Quick Action cost, which is the meaningful R2 payoff.
- R3 has two abilities in different scene contexts (downtime coaching, social crossover) — not "three unrelated combat effects." Each operates in a distinct play context.
- "MND + Fighting" social roll is narrow by design: only martial-culture contexts where combat expertise genuinely carries social authority (soldier courts, gladiator guilds, dueling circles). It does not compete with Influence as a general social skill.
- Directly addresses the TALENT_SYSTEM_ANALYSIS gap: Fighting's zero interaction with Social Intrigue and Challenge systems. A character with Veteran's Eye R3 can contribute meaningfully in information-gathering, preparation, and martial-prestige social scenes.
- No supernatural elements — reading opponents through experience and pattern recognition. Fully appropriate for a non-magic skill at any rank.

> **Status:** Deep design pass complete (2026-07); High-Level section extended (2026-07). Seven talents designed: Art of Fighting R5 (Signature extension), Martial Artist R4–R5 (Signature extension), Phalanx Commander (High-Level), Blade Dancer (High-Level), Scar-Forged (High-Level), Whip Master (Basic), Veteran's Eye (Basic). Fighting now has exactly 3 High-Level talents. Ready for owner review.
