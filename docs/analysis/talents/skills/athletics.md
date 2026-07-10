# Athletics — Talent Design Workbench

> **Source:** [docs/03-statistics/06-talents/athletics.md](../../../03-statistics/06-talents/athletics.md) | **Main Analysis:** [TALENT_SYSTEM_ANALYSIS.md](../TALENT_SYSTEM_ANALYSIS.md)

## 1. Skill Identity

**Role Spread:** Excels: Defense | Decent: Offense, Utility | Weak: Healing, Support, Control

**Primary Archetypes:** Barbarian (support), Brawler (support), Duelist (support), Fighter (support), Gladiator (support), Hoplite (support), Monk (support), Slinger (support), Swashbuckler (support), Tamer (support)

**Identity Tags:** mobile defense, explosive burst movement, anti-control resilience, positional anchoring, body-as-weapon extension

**Design Lens:** Athletics is the body in motion — jumping, climbing, charging, grappling, and refusing to be moved. Its talents express two equally valid fantasies: the defensive anchor (Stand your Ground, Evasion, Light Armor Mastery) that cannot be knocked off-position, and the explosive mover (Fast Stride, Athletic Movement, Escape Artist) who controls space through superior repositioning. No other skill owns both of these at once. The skill supports 10 archetypes as a formal support skill, the widest reach of any non-pillar skill — making it the system's most broadly useful physical modifier, with the corresponding need for diverse content at its upper ranks.

---

## 2. Current Talent Inventory

| Talent | Path | Max Rank | Status | Role | Notes |
|--------|------|----------|--------|------|-------|
| Athletic Movement | Basic | R3 | Complete | Utility | Exploration movement; vault as QA at R2; short jump at R3 |
| Bulky | Basic | R3 | Complete | Hybrid | +2 HP per rank; carry capacity; grapple size bonus at R3 |
| Escape Artist | Basic | R3 | Complete | Hybrid | Anti-grapple/prone/push reaction; auto-succeed escape at R2; no OA at R3 |
| Evasion | Basic | R3 | Complete | Combat | Retreat as QA; extra between-turn QA at R2 (very powerful); halve damage 1/scene at R3 |
| Fast Stride | Basic | R3 | Complete | Hybrid | Dash as QA; +1 Movement at R2; free post-attack repositioning at R3 |
| Grappler | Basic | R3 | Complete | Combat | Grapple-on-hit; restrain while grappling at R2; size-ignore + damage at R3 |
| Light Armor Mastery | Basic | R3 | Complete | Combat | Evade without QA 1/scene at R1; noisy removal; per-turn evade at R3 |
| Stand your Ground | Basic | R3 | Complete | Combat | Anti-push/prone; Opportunity Attack on ally attack at R2; free Shove/Trip at R3 |
| Supernatural Mobility | Basic | — | Incomplete | Utility | Stub only: "High rank talent allowing supernatural jumps and other forms of movement" |

**Summary:** 9 talents total — 8 complete, 1 incomplete. Max rank: R3. Role distribution: ~44% combat / ~33% hybrid / ~11% utility / ~11% incomplete.

---

## 3. Gaps & Priorities

**Signature gap:** Grappler is the Brawler/Gladiator/Monk grapple signature. Evasion is the Duelist/Rogue light-armor defensive signature. Stand your Ground serves Hoplite's anti-push zone mechanics. Swashbuckler archetype's acrobatic-footwork identity is partially served by Fast Stride and Escape Artist, but no single talent captures the "theatrical agility" of the swashbuckler fantasy at R4+. Slinger needs a mobile-attack talent beyond Expert Slinger's post-attack movement.

**Role gaps:** Needs 4 more talents to reach the 8-talent baseline when Supernatural Mobility is completed — but that stub describes a single talent, leaving the skill at 9 (barely adequate). The real gap is in role diversity: 4 of 8 complete talents are pure combat-defense with no out-of-combat utility. No downtime talent, no social hook, no Travel-specific Athletics application. Evasion's R2 extra Quick Action is the most powerful non-combat ability in the pool but is still gated to combat scenes.

**System integration gaps:** Zero Travel interaction despite Athletics being the obvious "forced march endurance" and "difficult terrain navigation" skill. Zero Challenge interaction. No Social Intrigue hook. A "Marathon Runner" or "Endurance Climb" talent connecting Athletics to the Travel system would fill the biggest integration gap.

**Rank gaps:** No talent reaches R4. Supernatural Mobility is described as a "High rank talent" in its stub, suggesting it was intended for R3+ — it needs full design. A Grandmaster Athletics character (12 TP) has all 8 talents at R3 and multiple unspendable TP. At least 2 High-Level (R4–R5) talents are needed at this tier.

**Priority ranking for design work:**
1. Complete Supernatural Mobility stub — it was explicitly described as a high-rank design, likely targeting R3 or as a new Basic talent
2. Add a Travel integration talent (forced march, difficult terrain endurance)
3. Add 1–2 High-Level (R4–R5) talents for Athletics Grandmasters
4. Add a downtime or social dimension (athletic competition, physical training culture)

---

## 4. Design Space

Athletics has a significant unexplored zone in the **environment-as-obstacle** space: using terrain, vertical surfaces, and physical obstacles as tactical tools rather than challenges. The existing talents manage movement economy (Fast Stride, Athletic Movement) and positional resilience (Stand your Ground, Escape Artist), but no talent makes the character *exploit* terrain offensively — running up a wall to gain height advantage, using a falling leap as an attack, or crossing difficult terrain faster than any enemy can follow.

Supernatural Mobility's stub hints at this and should be completed as the skill's high-rank anchor: by Expert rank, an athlete should be vaulting over obstacles as a Quick Action; by Master rank, jumping short distances; by Grandmaster rank, the movement should feel mythic — not supernatural in the sense of magic, but at the absolute ceiling of what a mortal body can accomplish. This is the "bronze age hero" design note that fits the game's Bronze Age setting perfectly.

The second unexplored cluster is **physical competition as social/cultural currency**: arm-wrestling contests, foot races, athletic games — the Olympian tradition of the ancient world is entirely absent from the talent pool despite being thematically central to the setting.

### Unexplored Thematic Angles
- **Terrain exploitation:** Using vertical surfaces, obstacles, and falling as active tactical tools — wall-run to high ground, controlled-fall attack, using Vault as an offensive repositioning tool rather than just a way to cross obstacles
- **Explosive charge:** A talent building on the Charge Combat Art to make a full-speed collision a primary offensive option rather than a modifier — the "bull rush" fantasy that Bulky and Grappler hint at but don't complete
- **Athletic competition:** Cultural leverage from demonstrating physical excellence — winning contests, establishing dominance through physical display, using Athletics rank as social capital in warrior cultures
- **Group movement:** Helping allies navigate difficult terrain, lowering ropes, steadying a formation — the Athletics equivalent of Leading the Way (Stealth) that lets the skilled athlete guide others through physical challenges

### System Integration Opportunities
- **Challenges:** Physical trial challenges (scaling a cliffside, swimming a current, carrying a load) are the clearest Athletics domain; no talent currently names Challenge mechanics; an "Obstacle Course" or "Trial of Strength" talent explicitly using Challenge language would be the straightforward win
- **Social Intrigue:** Athletic competitions and physical demonstrations of excellence as social leverage, especially in warrior-culture or arena-culture social scenes (Gladiator, Barbarian archetypes)
- **Travel:** Forced march endurance, navigating difficult terrain without the group slowing, and climbing pass traversal are all natural Athletics travel roles that the skill currently ignores

---

## 5. Talent Suggestions

> **Status:** Deep design pass complete (2026-07). Four talents designed: one stub completion (Supernatural Mobility), one travel integration (Trailblazer), one defensive gap fill (Desperate Gambit), one High-Level capstone (Perfect Form).

---

### Supernatural Mobility (Athletics, Basic)
*The extreme athlete moves through walls, gaps, and heights as if gravity were a suggestion rather than a law — purely through thousands of hours of relentless training.*

**Rank 1.** You can move along vertical surfaces (walls, cliffs, steep inclines) as part of your normal movement without making an Athletics roll. You must end your movement on a horizontal surface; if you do not, you begin to fall. When you take falling damage, reduce it by 4 (ability bonus).

**Rank 2.** Once per scene, you can use the Charge action as a Quick Action (a burst of explosive sprint speed). Once per scene, you can leap horizontally up to a short distance as part of your movement without making an Athletics roll.

**Rank 3.** Once per scene, after you take your Movement action, you may immediately move up to your full speed a second time (momentum burst — this is not a second Movement action and does not cost your Movement). This additional movement doesn't provoke Opportunity Attacks. While using this additional movement, you don't fall if you cross open air or a gap, unless your movement ends before reaching solid ground.

**Archetype enablement:** Barbarian (explosive repositioning for Charge builds), Brawler (close-in mobility to maintain grapple range), Gladiator (arena vertical movement and crowd-pleasing leaps), Monk (parkour as combat philosophy), Swashbuckler (theatrical aerial maneuvers), Slinger (mobile elevation-seeking).

**Design notes:** Completes the existing stub ("High rank talent allowing supernatural jumps and other forms of movement"). The name is preserved from the stub. The design is deliberately non-magical — this is the Bronze Age hero's trained body at its absolute ceiling. R1 enables vertical traversal for exploration and tactical positioning without removing the "must land on solid ground" constraint. R2 gives offensive burst utility (Charge as QA) and the "long jump without a roll" payoff that Athletic Movement's vault previews at low level. R3's momentum burst doubles movement once per scene, enabling dramatic gap-crossing and high-ground seizures that feel mythic without exceeding mortal possibility.

---

### Trailblazer (Athletics, Basic)
*You do not merely travel — you create the path others follow, managing the physical demands of brutal terrain through hard-won knowledge of how bodies move over difficult ground.*

**Rank 1.** During travel, when the group declares a Forced March, you may roll Strength + Athletics vs. the travel difficulty. On a success, you don't suffer the 1 Fatigue from the Forced March that day. Once per travel day, you may aid the Navigator regardless of your own travel role that day — the Navigator gains +1 boon on their daily roll from your route-marking and trail-finding.

**Rank 2.** When a travel checkpoint or environmental hazard requires a Strength + Fortitude roll (such as an Extreme Climate checkpoint), you may roll Strength + Athletics instead. Once per travel day, when the group would suffer a -1 progress penalty from terrain type (forest, hills, swamp, mountains, etc.), you may roll Strength + Athletics vs. the travel difficulty. On a success, the group ignores that terrain modifier for the day.

**Rank 3.** When all party members would suffer Fatigue from the Navigator's "Become Exhausted" consequence, every party member suffers 1 less Fatigue from that consequence (minimum 0) — your pacing and terrain management absorbs the worst of the toll. Once per journey, when the Navigator's roll results in no progress for the day, you may immediately restore 1 progress (you identified a shortcut or pushed the group through the block at the right moment).

**Archetype enablement:** Barbarian (forced marches and punishing physical travel), Fighter (endurance campaigns over long supply lines), Hoplite (maintaining formation discipline over difficult terrain), Ranger (wilderness navigation support for the party).

**Design notes:** Fills the gap identified in §9.3 of the talent system analysis — Athletics had zero travel interaction despite being the obvious "terrain traversal and forced march" skill. Uses existing travel procedure language directly (Forced March, travel difficulty, terrain modifiers, Navigator consequence) to integrate cleanly into the travel system without adding new subsystems. R1 is a personal benefit plus a light Navigator assist; R2 expands to active terrain management for the group; R3 provides group-scale Fatigue mitigation and a once-per-journey recovery that can salvage a disastrous navigation day.

---

### Desperate Gambit (Athletics, Basic)
*When a blow would end you, you throw your whole body into a last-second acrobatic dodge — knowing exactly what it costs if it doesn't land.*

**Rank 1.** When you take damage from a melee or ranged attack, you can use your Quick Action to attempt a desperate acrobatic dodge. Roll Agility + Athletics vs. the attacker's attack roll result. On a success, halve the damage after subtracting AV. On a failure, you take the full damage and immediately fall prone. Cannot be used while wearing heavy armor. Once per scene.

**Rank 2.** When you succeed on your Desperate Gambit roll, you may immediately move up to a close distance as part of the dodge — this movement doesn't trigger Opportunity Attacks. When you fail your Desperate Gambit roll, you no longer fall prone (you absorb the impact with a controlled tumble rather than being knocked down). Once per scene.

**Rank 3.** You can use your Desperate Gambit ability once between your turns instead (the reflex becomes reactive enough to trigger each time you are hit). On a Critical success (beat the attacker's roll by 6 or more), you avoid all damage from that attack entirely.

**Archetype enablement:** Duelist (glass cannon needing a survival tool beyond Evasion), Swashbuckler (theatrical risky acrobatics as core identity), Rogue (squishier melee requiring emergency escape options), Slinger (fragile mobile combatant without defensive armor).

**Design notes:** Fills the "risky avoidance" gap identified in §3.5 of the talent system analysis. Redirection (Drunken Technique) requires intoxication; Evasion covers standard retreat-based avoidance; Desperate Gambit covers characters who cannot move or lack Quick Actions for Retreat — a different use case. The once-per-scene frequency stays at both R1 and R2 — this is a high-stakes escape button, not a reliable defense. R2 earns its rank by adding two new payoffs (repositioning on success, no prone on failure) rather than just upgrading frequency; the character becomes better at exploiting the dodge, not more trigger-happy. R3 earns the frequency upgrade to once-between-turns because by that point the character has fully mastered the technique; the Critical-success full-damage-avoidance adds a dramatic ceiling reward for exceptional execution. The heavy armor restriction at R1 is core to the design identity — this is an agile-body technique, not a tank mechanic.

---

### Perfect Form (Athletics, High-Level)
*Every inefficiency stripped away. Every movement the product of ten thousand repetitions. The body at the absolute ceiling of mortal possibility.*

**Rank 4.** Once per scene, when you make an Athletics roll that would result in a failure, you may treat it as a Weak success instead — your trained instincts compensate automatically. Once per scene, as a Quick Action, you may move up to your full speed without provoking Opportunity Attacks (explosive burst — this is distinct from the Dash and Retreat actions and cannot be combined with them).

**Rank 5.** Permanent passive: your movement speed can never be reduced below your base speed by any terrain, condition, or effect. Once per day, you may treat one Athletics roll as a Critical success without rolling dice.

**Archetype enablement:** Any Athletics Grandmaster (Athletics 5). Most impactful for Barbarian, Gladiator, Monk, and Swashbuckler — archetypes for whom physical movement is the primary survival and offensive tool.

**Design notes:** The High-Level capstone for Athletics Grandmasters, filling the R4–R5 dead zone identified in the talent system analysis where Master and Grandmaster characters have unspendable TP. R4 follows the encounter-shaping pattern: two once-per-scene abilities that make the character reliably excellent in their domain. R5 follows the session-defining pattern: one permanent mundane-mastery passive (can't be slowed) plus one once-per-day automatic Critical. The auto-Critical at R5 is bounded by "once per day" and "Athletics rolls only" — it does not affect attack rolls, only the physical activity rolls (climbing, jumping, swimming, carrying, balance, Athletics-check-based effects). Appropriately powerful without creating damage or combat power inflation.

---

### Unstoppable Charge (Athletics, High-Level, Prerequisites: Fighting 2+)
*Nothing in your path is an obstacle — not armor, not terrain, not the bodies of your enemies.*

**Rank 4.** Once per scene, when you use the Charge action, your Charge movement ignores difficult terrain and doesn't provoke Opportunity Attacks. If your Charge attack hits, your target is also pushed close (in addition to any normal Charge effects).

**Rank 5.** Permanent passive: your Charge movement distance cannot be reduced by any effect. Once per day, when you use the Charge action, you may pass through any number of occupied spaces during your Charge movement. Each creature in your path (excluding your designated target) takes 4 damage (ability bonus) and is knocked prone. You still make one attack against your designated target at the end of the Charge movement.

**Archetype enablement:** Barbarian (the primal charger who bowls through enemy lines), Gladiator (spectacular bull-rush moments that own the arena floor), Brawler (crashing into clinch range through whoever stands in the way), Hoplite (breaking enemy formations on the advance).
**Capstone feeling:** The warrior whose Charge clears a lane — soldiers dive aside rather than be caught in your wake. By the time you reach your target, there is a trail of bodies behind you.
**Design notes:** R4 solves the core tactical problem that Charge builds face — difficult terrain and Opportunity Attacks are the main blockers that make Charge unreliable past low levels. The push-on-hit adds offensive payoff that rewards landing the attack. R5's permanent passive (Charge distance immune to reduction) is a mundane-mastery passive appropriate for the Grandmaster tier. The once-per-day Bull Rush is the session-defining moment: a charge that literally plows through obstacles to reach the target, dealing 4 fixed damage to each creature in the path — bounded by the once-per-day limit and the target-at-end structure (this is still one attack, not a multi-target strike). Cross-skill prereq (Fighting 2+) targets combat-oriented Athletics builds — Barbarian, Gladiator, Fighter, Hoplite naturally have Fighting 2+ — without locking out characters who invest deliberately in both skills.

---

### Arena Legend (Athletics, High-Level, Prerequisites: Influence 2+)
*The crowd doesn't just watch you fight — they fear you. And so do the people fighting you.*

**Rank 4.** Once per scene, immediately after you succeed on a Charge attack, Grapple, Shove, Trip, or any other Athletics roll used as part of a combat action, you may use your Quick Action to attempt a mass Intimidation against all enemies within short range who witnessed the action. Roll Strength + Athletics (in place of the normal Influence roll) against each target's Spirit + Fortitude. Enemies you beat are frightened (briefly).

**Rank 5.** Permanent passive: when you score a Critical success on a Charge attack or Grapple attempt, all enemies within close range who can see you gain the frightened condition (briefly). Once per day, as a Quick Action, you may make the same mass Intimidation roll described at Rank 4 — but enemies you beat are frightened for a short duration rather than briefly, and enemies who beat your roll are still frightened (briefly).

**Archetype enablement:** Gladiator (the arena showman whose physical feats terrorise opponents before the blows land), Barbarian (primal physicality as psychological weapon), Brawler (pit-fighter whose reputation precedes them), Swashbuckler (theatrical combat presence that makes enemies hesitate).
**Capstone feeling:** You fight like a myth made flesh. Your Grapple is a story told in taverns. The people across from you have heard what happens to people who face you, and some part of their body knows before their mind does.
**Design notes:** Fills the Athletics + Influence cross-skill angle from the design brief — a talent that makes your physical excellence itself socially threatening. R4 uses the existing Intimidation concept with Athletics as the roll, gated by witness proximity and a once-per-scene limit. R5 adds a zero-cost Critical-success fear aura (close range, briefly — the snap of fear when you land a perfect blow) and upgrades the R4 mass intimidate to once-per-day with increased duration (short instead of briefly) plus a floor effect (even successful resisters get briefly frightened). Influence 2+ prerequisite ensures only characters with genuine social investment access this cross-domain payoff, preventing pure-physical builds from getting free social leverage. Using Strength + Athletics for the roll means your physical attribute and skill rank drive the intimidation potency — the terror comes from your body, not your words.
