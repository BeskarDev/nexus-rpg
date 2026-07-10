# Influence — Talent Design Workbench

> **Source:** [docs/03-statistics/06-talents/influence.md](../../../03-statistics/06-talents/influence.md) | **Main Analysis:** [TALENT_SYSTEM_ANALYSIS.md](../TALENT_SYSTEM_ANALYSIS.md)

## 1. Skill Identity

**Role Spread:** Excels: Support | Decent: Control, Social-Utility | Weak: Offense, Defense, Healing

**Primary Archetypes:** Bard (support), Champion (support), Duelist (support), Fighter (support), Gladiator (support), Hoplite (support), Priest (support), Swashbuckler (support), Warlord (key support)

**Identity Tags:** crowd leverage, social momentum, battlefield inspiration, fear projection, group tempo

**Design Lens:** Influence is the game's social spine — the skill that shapes how others act by commanding attention, inspiring loyalty, or breaking nerve. Its talent pool uniquely bridges combat and social scenes: Inspire Ally grants in-combat damage bonuses while Born Haggler works in downtime markets, and Fast Talking's pre-combat initiative disruption is one of the only combat-opening social maneuvers in the system. The skill's biggest liability is the Performer stub — Bard's core identity requires performance-based magic triggering, and until that stub is completed and substantive, the game's most socially-flavored caster archetype has no signature talent in one of its four skills.

---

## 2. Current Talent Inventory

| Talent | Path | Max Rank | Status | Role | Notes |
|--------|------|----------|--------|------|-------|
| Born Haggler | Basic | R3 | Complete | Utility | Economic downtime; item sell percentage; rare item search at R2 |
| Fast Talking | Basic | R3 | Complete | Hybrid | Social re-roll; assist ally in conversation at R2; pre-combat initiative disruption at R3 |
| Inspire Ally | Basic | R3 | Complete | Hybrid | +boon + damage to ally attack; free use 1/scene at R2; self-use + HP heal at R3 (flagged overperforming at R1 per §4.3) |
| Insult to Injury | Basic | R3 | Complete | Combat | Distract enhancement; party damage while distracted at R2 (flagged overperforming per §4.3); refresh distract at R3 |
| Leading Presence | Basic | R3 | Complete | Hybrid | Ally initiative and morale boons; +Resist and damage aura at R2; self-inclusion and extended range at R3 |
| Performer | Basic | — | Incomplete | Utility | Stub only: "Excel at entertaining and swaying crowds" |
| Presence of Conquest | Basic | — | Incomplete | Combat | Stub only: "High level talent working like conquerer's haki — activate aura which potentially stuns all enemies around you" |

**Summary:** 7 talents total — 5 complete, 2 incomplete. Max rank: R3. Role distribution: ~14% combat / ~43% hybrid / ~14% utility / ~29% incomplete.

---

## 3. Gaps & Priorities

**Signature gap:** Warlord has Leading Presence for battlefield morale but lacks a dedicated tactical-command talent in Influence (relies on Education/Commander for the command mechanic proper). Bard has no performance magic anchor — Performer is the intended signature but is a stub with no design. Gladiator's crowd-performance identity (turning arena approval into combat fuel) has no talent. All five complete talents were designed before the Social Intrigue system existed and none reference its mechanics explicitly.

**Role gaps:** Formal negotiation, contract-making, and institutional procedures (the "negotiation" and "rhetoric" aspects) have no talent — Eloquent Talker in Education partially covers this but Influence should own it more directly. Group organization mechanics (rallying a crew, managing a retinue, coordinating non-combat allies) are absent. The "leadership" aspect is only superficially touched by Leading Presence's passive aura.

**System integration gaps:** Social Intrigue is the system Influence should dominate, yet no complete talent explicitly references Social Intrigue challenge mechanics. Born Haggler and Fast Talking touch social scenes loosely, but a dedicated "Interrogation," "Oration," or "Faction Dealings" talent with explicit Social Intrigue language is missing. Travel has zero Influence hooks — a "Raise Morale" travel talent (preventing Fatigue through encouragement) would be natural.

**Rank gaps:** No Influence talent reaches R4. Presence of Conquest was described as a "high level talent" in its stub — this should be redesigned as a proper R4 High-Level talent rather than a Basic R1–R3. Inspire Ally is flagged for overperformance and may need rebalancing at R1 before R4 expansion. Needs at least 1–2 High-Level (R4–R5) talents to serve 9 archetypes at Grandmaster.

**Priority ranking for design work:**
1. Complete Performer with a meaningful performance/crowd mechanic — this is Bard's signature and the most critical missing piece
2. Reframe Presence of Conquest as a proper High-Level (R4–R5) talent with correct rank structure
3. Add a Social Intrigue-specific talent (Negotiator, Orator, or Faction Leader) with explicit challenge-scene mechanics
4. Balance audit and possible rewrite of Inspire Ally R1 (flagged as overperforming at base rank)

---

## 4. Design Space

Influence's deepest unexplored territory is the **performance-as-magic-trigger** space that Bard demands: a mechanic where sustained artistic performance (music, poetry, ritual storytelling) creates ongoing magical or social effects. This is completely distinct from everything in the current pool — Inspire Ally is a Quick Action burst, not a sustained performance. A "Bardic Performance" or "Crowd Resonance" talent requiring the character to maintain concentration (like spell concentration) while delivering escalating benefits to allies would be unique in the system and anchor Bard's pillar identity.

The second major unexplored cluster is **formal authority and institutional leverage**: using knowledge of social procedures, chain-of-command structures, and negotiation frameworks to accomplish things that raw charm cannot. This expresses the "rhetoric" and "negotiation" aspects and would serve Warlord (military command structure), Priest (religious authority), and Champion (holy mandate). A talent allowing Influence checks to override organizational resistance — invoking proper procedure to gain audiences, commandeer resources, or delay hostile action — would fill a design gap that no current talent addresses.

### Unexplored Thematic Angles
- **Sustained performance:** An ongoing-concentration mechanic where the character maintains a performance (music, oratory, ritual poetry) with escalating effects on allies' HP, morale, or attack quality — the Bard fantasy; concentration-based to prevent stacking with other buffs
- **Institutional authority:** Using formal social structures (military hierarchy, religious order, trade guild) as leverage — invoking protocol and proper authority to accomplish things that persuasion alone cannot; serves Warlord, Priest, Champion
- **Fear as control:** A talent making intimidation more tactical — not just demoralising enemies but using projected threat to limit their movement, force surrender, or direct their attention away from protected allies
- **Crowd dynamics:** An area-social talent for managing groups — calming riots, inciting mobs, or turning a crowd's attention as a tactical resource; the "mass influence" fantasy distinct from single-target persuasion

### System Integration Opportunities
- **Challenges:** Social Intrigue challenges are the natural home for Influence; a dedicated "Oration" or "Negotiation" talent explicitly naming the Social Intrigue mechanic and granting advantages in formal social challenge scenes would be the most direct win
- **Social Intrigue:** Every social intrigue scene should have at least one strong Influence play; currently there is no talent that explicitly says "when you are in a Social Intrigue challenge scene, roll Influence with advantage for X"
- **Travel:** A "Raise Morale" or "Storyteller's Camp" talent granting the group reduced Fatigue accumulation during a rest through inspiring performance or campfire leadership — the only travel role that Influence naturally owns and currently ignores

---

## 5. Talent Suggestions

### Phase 1 — Diverge: Seed Ideas

Ten candidate concepts covering Influence's unexplored space, ordered by thematic cluster:

| # | Name | Concept |
|---|------|---------|
| 1 | **Rallying Cry** | Quick Action to remove fear and morale conditions (frightened, dazed, weakened, confused) from allies — distinct from Inspire Ally's boon grants and Leading Presence's passive resistance. |
| 2 | **Voice of Command** | High-Level prestige: battlefield authority that forces enemies to redirect attention toward you, used as tactical zone control by Warlord and Hoplite at Master/Grandmaster tier. |
| 3 | **Veiled Threat** | Imply consequences without openly threatening — a softer intimidation line that avoids Pitfall triggers in Social Intrigue where direct aggression would cause Breakdown. |
| 4 | **Reputation Shield** | Invoke an established reputation to start Social Intrigue scenes at higher baseline Interest with NPCs who know your name — institutional leverage without a full social challenge. |
| 5 | **Mass Harangue** | Address a crowd of 10+ simultaneously, shifting collective emotional state — calm a riot, incite a mob, or redirect mass attention as a tactical or narrative resource. |
| 6 | **Negotiator's Gambit** | Voluntarily concede something mid-Social Intrigue (declared aloud) to gain mechanical advantage on the next exchange and prevent Patience from advancing that round. |
| 7 | **March Captain** | Travel-scope talent: give a rousing speech during a march or voyage to reduce party Fatigue accumulation — the only natural Influence hook into the travel pillar. |
| 8 | **Crowd Reader** | Read a group's emotional temperature before addressing them; gain +1 boon on the first social action made against any member of that crowd in the same scene. |
| 9 | **Aura of Authority** | Once per scene as an Action, project absolute command — enemies must contest or be unable to act offensively against your allies for a brief window, serving as a leadership "soft taunt." |
| 10 | **Voice of the Divine** | Channel institutional religious authority (title, holy office, divine mandate) as social leverage — Priest/Champion focused, bypasses normal social resistance on requests within a deity's domain. |

**Shortlist reasoning:**
- Rallying Cry and Voice of Command address the two highest-priority gaps (condition-breaking support, High-Level capstone).
- March Captain is a good fit but lower priority — no other travel talents are in flight for Influence right now, and it is a narrower scene type.
- Mass Harangue overlaps significantly with Presence of Conquest R3 and Silver Tongue's scope expansion — redundant.
- Negotiator's Gambit covers ground Silver Tongue already handles — reject.
- Veiled Threat and Crowd Reader are interesting but narrow; either belongs in a later audit pass or could become sub-effects inside a broader talent rather than standalone.

---

### Phase 2 — Converge: Selected Designs

**Completing (2 stubs):**
- **Performer** — Bard's anchor; rest-time morale performance + Social Intrigue Interest setup. Basic R1–R3.
- **Presence of Conquest** — Warlord/Hoplite battlefield intimidation aura; single-target intimidate scaling to AoE daze/frighten. Basic R1–R3.

**New talents (3):**
- **Silver Tongue** — Social Intrigue specialist; Patience management, Motivation synergy, Pitfall recovery. Basic R1–R3.
- **Rallying Cry** — Combat support; removes morale conditions from allies as Quick Action. Basic R1–R3.
- **Voice of Command** — High-Level prestige capstone; redirects enemy aggression through authority, scales to AoE command once per day. R4–R5.

**Rejected (this pass):** March Captain (low priority, narrow), Veiled Threat/Crowd Reader (better as sub-effects in later talent), Reputation Shield/Voice of the Divine (domain-specific, can follow Lore/Education pattern).

**Final pool after this pass:** 10 talents (5 existing + 2 completed + 3 new), with 1 High-Level R4–R5 pair providing the missing prestige tier.

---

### Phase 3 — Develop: Full Talent Designs

---

#### Completing Stubs

##### Performer (R1–R3)

*The Bard's anchor talent. Sustained artistic performance — music, song, ritual poetry, dance — that builds morale and softens social resistance. Distinct from Inspire Ally (an immediate Quick Action burst in combat); Performer requires time and attention but shapes scenes before they happen.*

**Mechanical focus:** Rest-time morale boon (R1) → Social Intrigue Interest pre-seeding (R2) → Scope expansion to groups (R3).

---

**Performer**

**(Rank 1)** Once per rest, you can spend 10 minutes performing for allies present (playing an instrument, singing, telling a story, or dancing). Roll Spirit + Influence vs. TN 8. On a success, choose one ally who witnessed the performance — they gain +1 boon on the first Spirit-based roll they make. This boon lasts until used or until the next rest.

**(Rank 2)** When you are not in combat, you can spend your Action to give a brief performance directed at one willing or neutral NPC within short range. Roll Spirit + Influence vs. their Resist. On a success, that NPC's starting Interest in the current or next Social Intrigue increases by +1 (maximum +3). You can use this ability once per scene.

**(Rank 3)** Your rest performance (Rank 1) now applies to all allies who witness it, not just one. Your performance aimed at NPCs (Rank 2) can now target up to three NPCs within short range simultaneously — use the highest Resist among them for the roll.

---

**Design notes:**
- R1 is narrow (Spirit-based rolls only) to distinguish from Inspire Ally's broad boon. Spirit rolls cover social, magical, and morale rolls — exactly the territory Bard and Priest care about.
- R2 ties directly into Social Intrigue, giving Performer a mechanical footprint in the challenge system. "Once per scene" + Action cost keeps it from trivially inflating every NPC negotiation.
- R3 is pure scope expansion — no new mechanics, just breadth. Rest buff touches whole group; scene buff touches a small crowd. Clean mastery pattern.

---

##### Presence of Conquest (R1–R3)

*The Warlord's and Hoplite's battlefield intimidation line. Projects overwhelming dominance after landing a blow, then scales into an AoE fear display that can break enemy morale across a front.*

*The original stub described this as "like conqueror's haki from One Piece." That fantasy is preserved — the feel of a warrior whose presence alone forces enemies to hesitate — but grounded in mortal authority: a roar, a display, a battle-won posture.*

**Mechanical focus:** Post-attack single-target bane (R1) → Two targets with frightened on strong hits (R2) → Once-per-scene AoE display that dazes or frightens (R3).

---

**Presence of Conquest**

**(Rank 1)** After you hit an enemy with a successful attack roll, you can use a Quick Action to attempt to intimidate one enemy within close range who can see and hear you. Roll Spirit + Influence vs. their Resist. On a success, they take +1 bane on their next attack roll against you or your allies. Once per scene.

**(Rank 2)** Your intimidation attempt (Rank 1) can now target up to two enemies simultaneously. On a Strong or Critical success, the target is briefly frightened instead of simply baned on their next attack.

**(Rank 3)** Once per scene, as an Action, you project an overwhelming display of dominance — a battle roar, a display of brutal conquest, or the bearing of a supreme commander. Roll Spirit + Influence vs. TN 10. On a success, all enemies within close range who can see and hear you must each roll Spirit + Fortitude vs. your result. Those who fail are briefly dazed. On a Critical success on your roll (6 or more over TN), those enemies who fail their Fortitude roll are briefly frightened instead of dazed.

---

**Design notes:**
- R1 ties to a successful attack first — you must earn the moment, not open with the intimidation. This prevents it from replacing combat actions with guaranteed fear effects at R1.
- The "+1 bane on next attack" at R1 is a soft debuff that doesn't duplicate the Distract condition (Insult to Injury already owns that space). It's just redirected pressure on one specific roll.
- R3 costs a full Action (no attack that turn) and requires winning two separate rolls (your Influence vs. TN 10, then their Fortitude vs. your result). The contested second check means the outcome is probabilistic, not guaranteed — some enemies will save, creating narrative variation.
- Frightened is the official condition from `docs/05-combat/04-conditions.md`.

---

#### New Talent: Silver Tongue (R1–R3)

*The Social Intrigue specialist. Where Fast Talking handles moment-to-moment social recovery (a bluff that went wrong, a missed roll), Silver Tongue operates entirely within the formal structure of Social Intrigue — managing Patience, capitalizing on Motivations, and recovering from Pitfalls.*

*Silver Tongue rewards players who engage deeply with Social Intrigue mechanics: it has nothing to offer outside those challenge scenes, but inside them it is decisive.*

**Mechanical focus:** Patience management (R1) → Motivation momentum + first-Interest-drop protection (R2) → Pitfall recovery (R3).

---

**Silver Tongue**

*All abilities of this talent only apply during Social Intrigue challenge scenes.*

**(Rank 1)** Once per Social Intrigue scene, when your action would advance the Patience die, you may use a Quick Action to make one additional social exchange before Patience advances. Roll as normal (using the current effective TN). If that exchange is a success or better, the Patience die does not advance this turn.

**(Rank 2)** Whenever you successfully appeal to a Motivation during a Social Intrigue scene, you gain +1 boon on the next social action you take in that same scene (this boon expires if the scene ends). In addition, once per scene, when Interest would decrease for the first time, you may use a Quick Action to roll Spirit + Influence vs. TN 8 — on a success, the Interest decrease is prevented.

**(Rank 3)** Once per scene, immediately after a Pitfall is triggered and reduces Interest, you may react with a graceful pivot — roll Spirit + Influence vs. TN 10. On a success, the Interest lost from that Pitfall is recovered (restored to its value before the Pitfall triggered).

---

**Design notes:**
- The talent header restriction ("only applies during Social Intrigue") follows the same model as style-restricted talents (e.g. unarmored defense). It creates a sharp identity without polluting general social rolls.
- R1 Quick Action exchange is a real exchange with real risk — it can still trigger Pitfalls, and it costs an action economy slot. The reward (Patience paused) is meaningful but bounded to once per scene.
- R2 bundles two conditional effects that both require you to play the Social Intrigue system skillfully: hitting a Motivation rewards you with forward momentum; the Interest protection only fires once. These are small conditional benefits, not blanket bonuses.
- R3's recovery fires after the damage is done (unlike R2 which prevents). This distinction matters: R2 stops the first slip, R3 lets you reverse a later blunder. Together they give the character two safety valves across a scene without removing all tension.
- Interaction with Fast Talking: Fast Talking's re-roll works on any Influence roll including Social Intrigue exchanges, but it re-rolls the whole die rather than adding exchanges or modifying Interest/Patience. They stack without conflict.

---

#### New Talent: Rallying Cry (R1–R3)

*The support-and-conditions line. Where Leading Presence grants passive resistance to fear before it lands, and Inspire Ally fuels offense, Rallying Cry actively breaks morale conditions already in play — the battlefield roar that snaps a dazed ally back into the fight.*

*Serves Warlord, Champion, Priest, and Fighter — any archetype in a leadership role who needs to keep their team functional under pressure.*

**Mechanical focus:** Single ally condition removal (R1) → Expanded condition list + boon rider (R2) → AoE condition removal (R3).

---

**Rallying Cry**

**(Rank 1)** Once per scene, as a Quick Action, you call out to one ally within short range who can see and hear you. That ally may immediately end either the frightened or the dazed condition affecting them.

**(Rank 2)** Your Rallying Cry (Rank 1) can now also remove the weakened or confused condition. When an ally removes a condition through your Rallying Cry, they gain +1 boon on the first roll they make before the end of their next turn.

**(Rank 3)** Once per scene, as a Quick Action, your Rallying Cry affects all allies within short range simultaneously. Each ally within range who can see and hear you may end one condition affecting them from the following: frightened, dazed, weakened, confused.

---

**Design notes:**
- R1 is deliberately narrow (two conditions, single target, once per scene) to avoid competing with dedicated healing or the broader Leading Presence aura. It is reactive and tactical.
- R2 expands the conditions list from 2 to 4 (adding weakened and confused — both official conditions). The +1 boon is a small reward that gives the freed ally immediate forward momentum. Together, two small conditional effects at one rank stay within budget.
- R3 is the AoE upgrade. Still once per scene — the mass application is the mastery-level payoff, not a new condition type or stronger effect.
- Does not overlap with Inspire Ally (which grants boons proactively before a roll) or Leading Presence (which grants resistance to fear passively). Rallying Cry's niche is retroactive condition clearing.
- All four conditions it removes (frightened, dazed, weakened, confused) are in the official condition list at `docs/05-combat/04-conditions.md`.

---

#### New High-Level Talent: Voice of Command (R4–R5)

*The prestige capstone for Influence. Requires Influence Rank 3. Designed for the Warlord, Hoplite, Champion, and high-tier Fighter — characters who have made Influence a career skill and want encounter-shaping authority at the battlefield's apex.*

*At R4, Voice of Command is a single-target soft taunt: you fix one enemy's attention on you through sheer authority, protecting your allies from their aggression. At R5, it scales into a once-per-day proclamation that locks down an entire front.*

*This is mortal-pinnacle social control — not supernatural, not magical, but the fruit of a lifetime of battlefield leadership: the word of a conqueror that enemies instinctively obey.*

**Progression path:** High-Level (R4–R5 only).
**Prerequisite:** Influence Rank 3.

---

**Voice of Command**

**(Rank 4)** Once per scene, as an Action, you issue an authoritative command that fixes one enemy's attention. Choose one enemy within short range who can understand you. Roll Spirit + Influence vs. their Resist. On a success, until the start of your next turn, that enemy takes +1 bane on attack rolls against any creature other than you. On a Strong or Critical success, the target is also briefly dazed.

**(Rank 5)** Once per day, as an Action, you invoke the full authority of your legend — a proclamation, an oath, a battle declaration. All enemies within short range who can hear and understand you must roll Spirit + Fortitude vs. TN 10. Those who fail take +1 bane on all rolls they make until the end of their next turn and cannot willingly move toward you or your allies during that time (they may hold ground or retreat). Those who roll 4 or less on their Fortitude save are briefly frightened instead.

---

**Design notes:**
- R4 is the "soft taunt" — it does not compel the enemy to attack you, it only penalizes attacking anyone else. The enemy retains full agency; the bane is a situational bonus (distinct from other bonus types and will not stack with other situational banes on attack rolls). Costs a full Action, fires once per scene, requires a contested roll: strong cost for a useful tactical tool.
- R5 is once-per-day, Action cost, language-gated (enemies must understand you — a meaningful constraint in multi-faction encounters). The two-tier failure (bane + no advance / frightened) creates a meaningful roll-outcome spread without requiring separate tracking.
- "+1 bane on all rolls" at R5 is a situational bonus. The movement restriction is a position effect, not a condition, and lasts only one turn cycle — it redirects a wave of enemies, it does not lock down the battle.
- The "4 or less" threshold for frightened maps to a very bad Fortitude roll (roughly 25% failure rate for a typical enemy), ensuring frightened is rare and dramatic rather than routine.
- This is not supernatural. It is the mortal pinnacle of military authority — what happens when a general speaks and every soldier in earshot knows they are facing someone who has never lost.

---

### Summary: Complete Influence Talent Pool After Design Pass

| Talent | Path | Ranks | Status | Role | Primary Archetypes |
|--------|------|-------|--------|------|--------------------|
| Born Haggler | Basic | R1–R3 | Existing | Utility | All, Streetwise builds |
| Fast Talking | Basic | R1–R3 | Existing | Hybrid | Bard, Swashbuckler, Duelist |
| Inspire Ally | Basic | R1–R3 | Existing | Hybrid | Warlord, Bard, Champion, Fighter |
| Insult to Injury | Basic | R1–R3 | Existing | Combat | Gladiator, Swashbuckler, Duelist |
| Leading Presence | Basic | R1–R3 | Existing | Hybrid | Warlord, Fighter, Hoplite, Champion |
| **Performer** | Basic | R1–R3 | **Completed** | Utility | Bard, Priest |
| **Presence of Conquest** | Basic | R1–R3 | **Completed** | Combat | Warlord, Hoplite, Gladiator |
| **Silver Tongue** | Basic | R1–R3 | **New** | Social-Utility | Bard, Swashbuckler, Priest, Warlord |
| **Rallying Cry** | Basic | R1–R3 | **New** | Support | Warlord, Champion, Priest, Fighter |
| **Voice of Command** | High-Level | R4–R5 | **New** | Combat/Control | Warlord, Hoplite, Champion, Fighter |

**Pool health:** 10 talents (9 Basic, 1 High-Level), all roles covered (Combat, Hybrid, Utility, Social-Utility, Support), Bard signature filled (Performer), Warlord now has three dedicated options (Leading Presence, Presence of Conquest, Voice of Command), Social Intrigue integrated (Silver Tongue), condition-support gap closed (Rallying Cry), R4–R5 tier active (Voice of Command).

**Remaining open items for future audits:**
- Inspire Ally R1 damage clause (adds Influence to damage with no per-scene cap) — flagged overperforming in §4.3; rebalancing deferred pending broader damage audit.
- Insult to Injury R2 party-wide damage rider — same flag; deferred.
- March Captain (travel talent) — good fit, lower priority; candidate for next expansion pass.
- Voice of the Divine (Priest/Champion institutional authority) — narrow domain, better as a Lore-Influence cross-skill design once Lore's pool expands.

> **Status:** Deep design pass complete. Five talents designed (2 completed, 3 new). Pool at target density of 9–10. Ready for owner review and publication pipeline.

---

### Phase 4 — High-Level Capstone Expansion (R4–R5)

*Voice of Command (R4–R5) was designed in Phase 3 above. Two additional High-Level capstones are needed to bring Influence to exactly 3 High-Level talents.*

---

### Diplomatic Renown (Influence, High-Level, Prerequisite: Influence Rank 3)

*The grandmaster whose name travels ahead of them — opening audiences with rulers, staying the blades of enemies, making hostility a last resort.*

**Rank 4.** Once per scene, as an Action, you invoke your name and standing before one significant NPC — a noble, commander, high priest, faction leader, or equivalent figure — who is aware of your reputation. Roll Spirit + Influence vs. their Resist. On a success, that NPC will not permit hostile action against you or your companions for the remainder of the scene unless you take an overtly hostile action first. On a Strong or Critical success, if a Social Intrigue scene with this NPC occurs later the same day, their starting Interest is 1 higher than normal.

**Rank 5.** Your reputation is a social shield that precedes you. You gain the following passive: in any non-combat scene, significant NPCs who know of your reputation cannot dismiss you or refuse to hear you without first granting you one exchange — social convention requires they acknowledge your standing. In addition, once per day, as an Action, you invoke your full legacy. All NPCs present who have any awareness of you must grant you one exchange before taking hostile action. If a Social Intrigue scene follows from that exchange within the same scene, your starting Interest is 2 higher than normal.

**Archetype enablement:** Bard (the celebrated artist whose name opens every court), Priest (the high cleric whose office demands parley), Champion (the holy warrior whose reputation precedes their blade), Swashbuckler (the infamous duelist whose legend stays swords before they clear the scabbard).

**Capstone feeling:** You walk into rooms where rulers make decisions and they listen — not because you charm them in the moment, but because what you have done precedes you.

**Design notes:** Deliberately distinct from Voice of Command, which is a combat-scene authority tool. Diplomatic Renown operates in pre-combat and social contexts, preventing hostility from beginning rather than redirecting it once started. R4 is encounter-shaping: it pauses one significant NPC's aggression and may seed a better Social Intrigue opening. R5 passive is a world-presence statement (NPCs must grant an exchange — the conversation always starts) plus an active daily option that forces a group parley. The Interest bonus at R5 is 2 rather than R4's 1, escalating the Social Intrigue payoff without duplicating Silver Tongue's Patience mechanics.

---

### Voice of the Masses (Influence, High-Level, Prerequisite: Influence Rank 3)

*The grandmaster orator whose voice reaches entire crowds and armies — inspiring a thousand allies or cracking ten thousand enemies with a single declaration.*

**Rank 4.** Once per scene, as an Action, you address a group of 5 or more creatures simultaneously — a formation, a crowd, a mob. Roll Spirit + Influence vs. TN 10.

- **Success.** Choose allies or enemies within medium range who can see and hear you. Allies gain +1 boon on their first roll this round; enemies take +1 bane on their first roll this round.
- **Strong.** Apply both effects simultaneously: all allies in range gain the boon and all enemies in range take the bane.
- **Critical.** As Strong, and one condition of the frightened, dazed, or weakened type affecting any ally in range ends immediately.

**Rank 5.** Once per day, as your Action, you deliver an oration of legendary force. Choose one of the following:

- **Rally.** All allies within long range who can see or hear you may immediately end one condition affecting them from the following: frightened, dazed, or weakened. Each ally whose condition ends gains +1 boon on all rolls until the end of their next turn.
- **Break.** All enemies within medium range who can see and hear you and are capable of fear must roll Spirit + Fortitude vs. TN 10. On a failure, they are briefly frightened. This ability cannot affect mindless or fear-immune creatures.

**Archetype enablement:** Bard (peak inspirational performance that turns a battle's emotional tide), Warlord (army morale command at the grandmaster tier), Champion (holy declaration to the faithful that drives allies forward), Gladiator (the arena declaration that turns the crowd and breaks opponents).

**Capstone feeling:** At R5 you are not inspiring one ally or intimidating one enemy — you are reshaping the will of an entire battlefield or crowd with a single word.

**Design notes:** Distinct from Voice of Command in three ways: Voice of Command is close-range, enemy-only, and imposes bane plus a movement restriction. Voice of the Masses reaches medium-to-long range, targets allied and enemy groups simultaneously at R4, and features a mass condition-clear (Rally) unavailable anywhere else in the Influence pool. The Rally mode serves support archetypes (Bard, Priest, Champion) while Break serves fear-projection archetypes (Warlord, Gladiator), giving the talent broad archetype coverage within a single R5 design. Break's "mindless or fear-immune" caveat preserves meaningful monster immunities rather than making the ability universally reliable.

---

### Updated Summary: Complete Influence Talent Pool After High-Level Expansion

| Talent | Path | Ranks | Status | Role | Primary Archetypes |
|--------|------|-------|--------|------|--------------------|  
| Born Haggler | Basic | R1–R3 | Existing | Utility | All, Streetwise builds |
| Fast Talking | Basic | R1–R3 | Existing | Hybrid | Bard, Swashbuckler, Duelist |
| Inspire Ally | Basic | R1–R3 | Existing | Hybrid | Warlord, Bard, Champion, Fighter |
| Insult to Injury | Basic | R1–R3 | Existing | Combat | Gladiator, Swashbuckler, Duelist |
| Leading Presence | Basic | R1–R3 | Existing | Hybrid | Warlord, Fighter, Hoplite, Champion |
| **Performer** | Basic | R1–R3 | Completed (Phase 3) | Utility | Bard, Priest |
| **Presence of Conquest** | Basic | R1–R3 | Completed (Phase 3) | Combat | Warlord, Hoplite, Gladiator |
| **Silver Tongue** | Basic | R1–R3 | New (Phase 3) | Social-Utility | Bard, Swashbuckler, Priest, Warlord |
| **Rallying Cry** | Basic | R1–R3 | New (Phase 3) | Support | Warlord, Champion, Priest, Fighter |
| **Voice of Command** | High-Level | R4–R5 | New (Phase 3) | Combat/Control | Warlord, Hoplite, Champion, Fighter |
| **Diplomatic Renown** | High-Level | R4–R5 | New (Phase 4) | Social/Utility | Bard, Priest, Champion, Swashbuckler |
| **Voice of the Masses** | High-Level | R4–R5 | New (Phase 4) | Support/Control | Bard, Warlord, Champion, Gladiator |

**Pool health:** 12 talents (9 Basic, 3 High-Level). High-Level tier complete at exactly 3 talents. Archetypes served: all 8 Influence archetypes have at least one High-Level capstone available. Social Intrigue integrated across all tiers (Silver Tongue Basic, Diplomatic Renown High-Level). Mass-scale influence covered at capstone tier (Voice of the Masses).
