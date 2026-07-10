# Streetwise — Talent Design Workbench

> **Source:** [docs/03-statistics/06-talents/streetwise.md](../../../03-statistics/06-talents/streetwise.md) | **Main Analysis:** [TALENT_SYSTEM_ANALYSIS.md](../TALENT_SYSTEM_ANALYSIS.md)

## 1. Skill Identity

**Role Spread:** Excels: Control | Decent: Support, Utility | Weak: Offense, Defense, Healing

**Primary Archetypes:** Brawler (key support), Rogue (key support)

**Identity Tags:** network leverage, urban navigation, criminal tradecraft, reputation currency, deal brokering

**Design Lens:** Streetwise is city-shadow expertise — operating in the gaps between legitimate structures, leveraging informal contacts, and navigating systems through back channels. Its four current talents do not adequately represent this space: Swashbuckler and Thug Tactics are combat mechanics that could plausibly live in Fighting, and Jack of All Trades is a generic skill bridge. Only I Know A Guy — partially incomplete — engages the contacts and network fantasy. The skill's genuine design space (forgery, urban movement, criminal reputation, underworld economics) is almost entirely unexplored, leaving the Rogue archetype without the infiltration and urban-survival tools that define its identity. Streetwise is the most critically underserved skill in the system at 4 total talents.

---

## 2. Current Talent Inventory

| Talent | Path | Max Rank | Status | Role | Notes |
|--------|------|----------|--------|------|-------|
| I Know A Guy | Basic | R3 | Incomplete | Utility | Contact network in known settlements; R1 complete; R2–3 XXX (blocks build progression) |
| Jack of All Trades | Basic | R3 | Complete | Utility | Streetwise substitutes for any non-magic skill 1/scene; persist for same skill at R2; second skill at R3 |
| Swashbuckler | Basic | R3 | Complete | Combat | Light weapon suppresses target QAs; follow-up boon at R2; post-attack free movement at R3 |
| Thug Tactics | Basic | R3 | Complete | Combat | Boon when outnumbering; extends to allies at R2; bane on enemy attacks at R3 |

**Summary:** 4 talents total — 3 complete, 1 incomplete. Max rank: R3. Role distribution: ~50% combat / ~50% utility.

---

## 3. Gaps & Priorities

**Signature gap:** Rogue's "infiltration" identity tag (lockpicking, bypass, silent entry) is listed as zero-coverage in §3.3 and belongs primarily in Stealth and Streetwise — neither currently has it. Brawler's underground fighting circuit and fighting contacts are entirely absent. Swashbuckler archetype has the combat talent (Swashbuckler) but the archetype's social dimension — reputation as a flashy duelist, performing for crowds, leveraging notoriety — has no talent. Needs 4 more complete talents minimum to reach the 8-talent baseline.

**Role gaps:** Forgery and false identity have zero talent coverage in the entire system — this is the most fundamental criminal tradecraft mechanic and belongs here. Urban navigation (moving safely through hostile districts, evading pursuit, knowing which routes avoid rival gang territory) has zero coverage. Fence mechanics (converting stolen goods to coin, acquiring illegal items through criminal channels) have zero coverage. Reputation as a social resource (leveraging criminal fame or infamy to open or close doors in underworld social scenes) has zero coverage. Gossip as an intelligence-gathering tool (knowing who knows what, who hates whom, which merchant is in debt) has zero coverage.

**System integration gaps:** Social Intrigue is the system Streetwise should dominate for underworld social scenes — finding criminal contacts, running cons in markets, leveraging debts and favours. No talent uses Social Intrigue challenge language. Travel: Urban "travel" (navigating a hostile city quickly, evading guards, moving contraband through checkpoints) has zero talent support. Challenge: Heist and infiltration challenge types have zero Streetwise talent hooks despite being the most natural Streetwise domain.

**Rank gaps:** No talent reaches R4. I Know A Guy is the strongest Signature candidate — a criminal network that grows with the character's reputation across multiple cities, with R4 allowing cross-regional contacts and R5 granting access to any city's underworld. Currently I Know A Guy can't even reach R3 due to the XXX placeholder. All four talents cap at R3 with no R4 expansion.

**Priority ranking for design work:**
1. Complete I Know A Guy R2–3 immediately — this is a broken talent that blocks all Rogue and Brawler builds investing in Streetwise
2. Add an infiltration/lockpicking talent — zero-coverage system identity tag, Rogue-critical, shared gap with Stealth
3. Add a forgery/false-identity talent — zero coverage in the entire system
4. Add an urban navigation or fence talent to start filling the criminal-tradecraft space

---

## 4. Design Space

Streetwise's design space is the largest in the system relative to its current content — four talents against perhaps the richest thematic territory in the game. The entire urban underworld (criminal economics, information brokering, identity management, territorial navigation) is almost completely undesigned.

The highest-value design is **forgery and false identity**: a talent letting characters create convincing false documents, manufacture alternate identities, and maintain cover stories under scrutiny. This would interact with Social Intrigue directly (false identity grants social advantages in scenes where true identity would be a liability) and with infiltration challenges (forged credentials bypass guarded entry points). The key design question is whether forgery is a time-limited advantage (the false identity holds for a scene) or a durable asset (a well-constructed forgery lasts until actively challenged).

**Urban navigation** is the second critical gap: a talent for moving safely through hostile urban environments — finding routes that avoid patrol patterns, knowing which areas belong to which faction, and losing pursuit in the city's physical maze. This is mechanically distinct from Stealth (which is about being invisible) because it is about *knowing the city* — using social and geographic knowledge to navigate where being seen is unavoidable but what you're seen doing is deniable.

### Unexplored Thematic Angles
- **Forgery and false documents:** Creating convincing fake credentials, letters of introduction, trade licenses, or noble papers — requires time and materials, produces an item that grants social advantages or bypasses gatekeeping; the permanent-product criminal craft
- **Urban territorial knowledge:** Navigating a city's factional geography — knowing which routes avoid rivals, which safe houses can be accessed, how to move contraband through checkpoints; the "city as dungeon" traversal mechanic
- **Information brokering:** Gossip, rumour, and intelligence gathering as a downtime or exploration activity — what does the criminal grapevine know about the target; how much does information cost; who can the character sell secrets to; the "I know things" social toolkit
- **Criminal reputation management:** Using infamy and notoriety as currency — a high Streetwise character's reputation opens underworld doors but closes legitimate ones; a talent that makes this trade-off mechanically explicit rather than purely narrative

### System Integration Opportunities
- **Challenges:** Heist-type infiltration challenges, information-extraction scenarios, and city-escape sequences are natural Streetwise challenge types; no talent currently names Challenge mechanics; a "Street Operator" or "Urban Infiltration" talent with explicit Challenge language would be the highest-impact single addition
- **Social Intrigue:** Underworld social scenes — negotiating with crime lords, leveraging debt relationships, running cons in market scenes — should heavily use Streetwise; I Know A Guy partially enables this but needs R2–3 completion; a "Black Market Network" or "Criminal Contacts" talent with Social Intrigue language would formalize the connection
- **Travel:** Urban travel (moving quickly and safely through hostile city districts, evading pursuit across multiple scenes) differs from wilderness travel but uses similar challenge structures; a "City Runner" or "Back Routes" talent explicitly connecting to Travel challenge resolution for urban environments would be unique

---

## 5. Talent Suggestions

**Design lens for this pass:** Every talent must be usable in a dungeon, on a road, or in a fight — not only in a city during downtime. Street smarts bleed into reading danger, improvising tactics, quick hands, and movement through constrained spaces. Talents are mechanical enablers (new actions the character can *do*) rather than narrative truths (things the character already *is* in the world).

---

### Step 1 — I Know A Guy Completion (Urgent Fix)

> **Existing Rank 1 recap:** During downtime in a settlement where you have previously Caroused, forgo Buy Item, Sell Item, or Find Contact and roll Spirit + Streetwise. Weak: contact helps but holds a grudge and demands a major favor. Strong: contact helps with a small favor. Critical: contact helps freely. Once between adventures.

**Rank 2.** You can use I Know A Guy twice between adventures instead of once. After any successful roll, your contact also shares what they have recently heard: the GM reveals one current situation in this settlement — a dangerous actor, an active criminal operation, or a recent upheaval — that street-level contacts would know about.

**Rank 3.** You can use I Know A Guy in any settlement, not only those where you have previously Caroused. In a settlement where you have not Caroused, the roll is made with +1 bane — your reputation travels, but your network is thin there. You may still use this talent twice between adventures.

**Design rationale:** R2 doubles frequency and adds intelligence value to every successful roll — the same contact meeting now carries richer payoff. R3 removes the Carouse prerequisite with a proportional cost: the +1 bane represents a thinner local network rather than outright failure. Together the arc is: R1 (known territory, once), R2 (richer output, twice), R3 (any city, twice).

---

### Step 2 — Double-Diamond: New Talent Design

#### Diverge — 15 Seed Ideas

Filtered for genuine versatility: usable in dungeons, combat, wilderness, and cities.

1. **Dirty Tricks** — impose conditions (daze, prone, push) in any melee combat by fighting without rules
2. **Quick Hands** — steal, plant, or disarm items as a Quick Action in combat and exploration
3. **Size Up** — instant threat and exit assessment anywhere; translates to boons on first rolls
4. **Slippery** — escape grapples and constraints using street-fighter evasion; includes a reaction-escape
5. **Read the Mark** — rapid situational read of NPCs: concealed weapons, emotional state, live lie detection
6. **Smoke and Mirrors** — use available materials to create diversions anywhere (combat, dungeon, outdoors)
7. **Below the Belt** — bonus damage or condition when attacking a distracted or unaware target
8. **Gut Feeling** — roll to detect ambush, trap, or danger before it manifests, in any environment
9. **Improvised Arsenal** — wield any object as an effective weapon using criminal improvisation
10. **Feint and Flinch** — spend no action to feign retreat or attack; used to bait enemy reactions
11. **Tight Spaces** — move through crowds, rubble, and corridors at full speed; ignore squeeze penalties
12. **Eye for Weakness** — once per scene identify one creature's lowest defense type for a targeted follow-up
13. **Crowd Fighter** — chain attack benefits when surrounded by multiple opponents (inverse of Thug Tactics)
14. **Underdog** — gain bonuses when significantly outnumbered or outmatched; the scrappy-survivor identity
15. **Criminal Instinct** (High-Level) — plan before operations; retroactively establish one preparation per session

#### Converge — 5 Selected New Talents

| Selected | Core Gap Filled | Archetypes Served |
|----------|----------------|-------------------|
| **Dirty Tricks** | Condition-applying combat tool not locked to weapon type; Brawler dirty-fighting identity | Brawler (primary), Rogue |
| **Quick Hands** | Action-economy item manipulation in combat and exploration — zero system coverage | Rogue (primary), any heist/exploration build |
| **Size Up** | Instant threat and situation assessment; pays off in combat, exploration, and social alike | Rogue, Brawler, Swashbuckler, versatile adventurers |
| **Slippery** | Anti-grapple and anti-constraint mobility; works in any combat or tight-space exploration | Brawler (primary), Rogue, Swashbuckler |
| **Criminal Instinct** (High-Level) | R4–R5 prestige capstone for street-cunning mastery; planning + retroactive preparation | Rogue, Brawler, any deep-Streetwise build |

**Dropped and why:** Smoke and Mirrors risks becoming a narrative-truth problem ("I find something to use") without extremely tight scoping — deferred to a future refinement pass. Gut Feeling overlaps heavily with Perception for detection and Insight for social-danger reads; both skills handle its fantasy better. Below the Belt was merged into Dirty Tricks R2 as the Strong-success free condition. Crowd Fighter and Underdog both conflict with or duplicate the existing Thug Tactics design space. Read the Mark was merged into Size Up, which covers the same assessment fantasy with cleaner mechanics.

---

### Dirty Tricks (Streetwise, Basic)

*You fight the way alleys teach — no rules, no hesitation, and the first clean shot wins it.*

**Rank 1.** Once per scene, when you hit a creature with a melee attack, you may choose to deal no damage and instead apply one of the following effects: the target is **dazed** until the end of their next turn; the target falls **prone**; or the target is pushed 1 space in a direction you choose (this push does not provoke Opportunity Attacks from you). The creature must be no more than one size category larger than you.

**Rank 2.** Your Dirty Tricks now work on creatures up to two size categories larger than you. When you score a Strong or Critical success on any melee attack, you may apply one Dirty Tricks effect as an additional effect alongside normal damage — this does not cost your scene use.

**Rank 3.** You can use Dirty Tricks twice per scene. When you apply a Dirty Tricks effect to a creature already affected by any condition, you may upgrade the effect: **dazed** becomes **stunned** until the end of their next turn; the prone target also becomes **restrained** until the end of their next turn (unless they succeed on a TN 8 Athletics roll); and the push becomes a push of 2 spaces.

**Archetype enablement:** Brawler (primary — dirty-fighting unarmed identity that Thug Tactics sets up at the group level but never pays off for individual rounds); Rogue (fight-ending conditions for a scrapper in a bad position).
**Versatility check:** Dungeon: yes (any monster you hit in melee). Combat: yes (any melee). Travel/wilderness: yes (any melee encounter on the road). Social: no (combat-only — but combat happens anywhere).
**Design notes:** No weapon-type restriction — this is improvised street technique, not trained style (Swashbuckler covers the weapon-specific angle). The "deal no damage" trade-off at R1 maintains R1 budget compliance. The Strong-success free condition at R2 rewards skill investment with a passive payoff requiring no separate tracking.

---

### Quick Hands (Streetwise, Basic)

*Three seconds, two hands, one opportunity — and whatever they had is now yours.*

**Rank 1.** As a Quick Action, you may attempt to steal one small unequipped item (a pouch, key, document, vial, or sheathed weapon) from a creature in your melee range. Roll Agility + Streetwise opposed by the target's Agility + Perception. On a success, you take the item and the target does not immediately notice unless they check. On a failure, the target notices the attempt immediately.

**Rank 2.** You can also use Quick Hands to plant a small item on a creature in your melee range (same action, same opposed roll). Passing an item to an ally in your melee range costs no action. Drawing a concealed item or retrieving a small item from your pack is now a free action rather than a Quick Action on your turn.

**Rank 3.** Once per scene, you may attempt Quick Hands against a small weapon, focus item, or rod a creature is actively wielding. On a success, you disarm them — on a Critical success, the item lands in your hand; on a weak or strong success, it drops at their feet. Additionally, if you have already spent your Quick Action this turn, you may still use Quick Hands once per round for 1 Focus.

**Archetype enablement:** Rogue (primary — action-economy item manipulation that directly enables infiltration and opportunistic disarming, distinct from Stealth's lockpicking and concealment identity); Swashbuckler (disarming folded into the agile fighter's action economy).
**Versatility check:** Combat: yes (steal held items, disarm, pass weapons to allies). Dungeon: yes (lift a key from a guard, plant a distraction). Wilderness: yes (steal from a pursuer). Social: yes (pass covert notes, palm items during a deal).
**Design notes:** Differentiated from Stealth by action type: Stealth sleight-of-hand is passive-concealment and lockpicking; Quick Hands is active mid-action manipulation at combat speed. The Focus cost at R3 for a second use after a spent Quick Action maintains budget compliance without making mastery free.

---

### Size Up (Streetwise, Basic)

*You scan a room like a veteran thief: threat, exit, opportunity — in the time it takes most people to say hello.*

**Rank 1.** Once per scene as a Quick Action, you may assess up to three creatures in your line of sight. Roll Mind + Streetwise (TN 8).
- **Weak success**: choose one to learn: who is the most dangerous individual present; whether any creature is concealing weapons, armor, or items; or where the nearest exit or escape route is.
- **Strong success**: learn all three.
- **Critical success**: learn all three, plus one of: one thing a creature of your choice wants right now; one thing they fear; or a lie one of them is currently telling.

**Rank 2.** After successfully using Size Up, you gain +1 situational bonus on your first melee attack, Influence roll, or Insight roll against any creature you assessed during this scene. You may use Size Up as a free action (no Quick Action cost) if you have had at least one full round of uninterrupted observation before acting.

**Rank 3.** Once per scene, you may extend Size Up to read a location rather than creatures. You learn: one tactically advantageous position in the area and its specific benefit (the GM describes it); one concealed exit or approach not obvious to casual inspection; and one improvised weapon or useful object present in the area. When combat begins in this location after using this ability, you and all allies who heard your assessment gain +1 boon on Initiative rolls.

**Archetype enablement:** Rogue (pre-engagement intelligence feeding both combat and social decisions); Brawler (identify the real threat before the first punch lands); Swashbuckler (find exits and escape routes before the scene deteriorates); versatile adventurers (complements Jack of All Trades — JoAT substitutes skills, Size Up substitutes for a dedicated scout).
**Versatility check:** Combat: yes (identify the threat, find the exit before the brawl). Dungeon: yes (read a room before committing). Wilderness: yes (assess strangers on the road, read a hostile camp). Social: yes (read the NPC dynamics before speaking).
**Design notes:** Distinct from Perception (which detects the clue) and Insight (which reads emotional truth): Size Up is the evaluation layer — reading the *meaning* of what you observe, not the raw data. The +1 situational bonus at R2 applies to the first roll only and uses the situational bonus type, which does not stack with other situational bonuses. The party Initiative boon at R3 requires the GM to confirm the assessment applied before combat begins — it is not retroactive.

---

### Slippery (Streetwise, Basic)

*Enough alleys, enough bad corners, enough times getting grabbed — eventually you stop getting held.*

**Rank 1.** When you attempt to escape a grapple or the **restrained** condition, you may roll Agility + Streetwise instead of Athletics. On a success, you escape and immediately move up to your full Speed as part of the same action without provoking Opportunity Attacks.

**Rank 2.** Once per scene, when a creature attempts to grapple you or apply the **restrained** condition to you, you may attempt to evade as a reaction before the effect resolves. Roll Agility + Streetwise opposed by the attacker's roll. On a success, the effect never establishes. On a failure, you are grappled or restrained as normal.

**Rank 3.** You never provoke Opportunity Attacks when escaping a grapple, the **restrained** condition, or any forced-movement effect applied to you by an enemy. Once per scene, immediately after escaping a grapple using Rank 1 or Rank 2 of this talent, you may make one free unarmed melee attack against the creature you escaped from as a free action.

**Archetype enablement:** Brawler (primary — the clinch-and-escape cycle that defines pit-brawler play, currently without any mechanical support in the system); Rogue (escape bad positions without burning an Action); Swashbuckler (mobility over muscle, escape as a prelude to repositioning).
**Versatility check:** Combat: yes (escape grapples, resist restrained). Dungeon: yes (slip through tight spaces, escape mechanical restraints). Wilderness: yes (escape animal grapples, natural hazards). Social: no.
**Design notes:** Agility + Streetwise as the escape roll represents *knowing how* (pressure points, weight-shifting, the gap in a captor's grip) rather than *being strong enough* — distinct from the Athletics approach. The reaction at R2 burns the scene use proactively and converts the grapple roll into an opposed Agility contest rather than granting a free escape. The free counter-attack at R3 is once-per-scene and unarmed-only, rewarding Brawler builds that have already invested in unarmed strike.

---

### Criminal Instinct (Streetwise, High-Level)

*Everything looks like luck to the people watching. You know it is just preparation and experience.*

*Prerequisites: Streetwise R4. Requires one of: Fighting R3, Stealth R3, or Insight R3.*

**Rank 4.** Once per day, before a planned operation begins (heist, negotiation, patrol interception, journey leg, or similar), spend 10 minutes briefing your allies and roll Spirit + Streetwise (TN 10). On a success, choose one obstacle type: combat ambush, social obstacle, physical barrier, or pursuit. The first time that obstacle type is encountered during the operation:
- All allies gain +1 boon on their first roll against it.
- You may declare one environmental detail you anticipated (a guard rotation, a back exit, a known safe route). The GM confirms it exists or proposes a close equivalent.

**Rank 5.** Once per session, you may invoke your preparation to retroactively establish that you arranged for something before the current scene began. Describe one concrete, non-magical preparation you made: a cached item at a specific location, a bribed NPC who steps aside, an arranged message that arrives at the right moment, a known escape route, or a piece of pre-gathered intelligence. The preparation must be plausible given your resources and the time elapsed since your last scene. The GM confirms it or proposes a close equivalent. This ability cannot eliminate a primary challenge or replicate a magical effect — it removes one obstacle or supplies one advantage.

**Archetype enablement:** Rogue (infiltration master who thinks three moves ahead); Brawler (underground operator who always has an angle and a fallback); any character who has built a Streetwise R4 identity around planning and street cunning over raw power.
**Versatility check:** Works in any environment — the preparation is established before the scene; the payoff lands wherever the adventure takes you.
**Design notes:** R4 is bounded by the GM confirmation clause on the anticipated detail — "close equivalent" prevents free invention but guarantees a payoff. R5 uses narrative authority with explicit limits: "cannot eliminate a primary challenge" prevents bypassing the adventure's core obstacle; "must be plausible" and "GM confirms" keep it collaborative. Cross-skill prerequisites (Fighting/Stealth/Insight R3) enforce that this capstone belongs to a committed criminal operative rather than any casual Streetwise investor.

---

### Underworld Legend (Streetwise, High-Level, Prerequisite: Streetwise 3)
*Your name travels faster than you do — and in certain rooms, it does more work than you could.*

**Rank 4.** Once per scene, when you face a creature who operates in or adjacent to criminal, mercenary, or grey-market society, you may invoke your reputation. Roll Spirit + Streetwise against TN 8 + the creature's Insight rank (minimum TN 9). On a success:
- In **combat**: the creature hesitates until the start of your next turn and cannot make attacks against you or your allies during that period.
- In **exploration**: the creature backs down, provides access, or grants passage they would have otherwise denied.
- In **social scenes**: the creature treats you as a peer and reduces their effective Resistance by 2 for this scene.

On a failure, your reputation lands as a threat rather than a credential: the creature treats you as a priority target and gains +1 boon on their next attack roll against you this scene.

**Rank 5.** Permanent. Whenever you enter a settlement, dungeon complex, or wilderness territory with an active criminal or mercenary presence, the GM tells you one true thing the underworld holds about your reputation here — no roll required. Additionally, once per session, name one specific resource, contact, or piece of leverage you have established through your criminal history that exists somewhere plausible in your current region. The GM confirms it or proposes a close equivalent. You may call in this marker for one significant service, tactical advantage, or piece of intelligence. This cannot replace a primary adventure challenge but removes one obstacle or supplies one meaningful advantage.

**Archetype enablement:** Rogue (the name that opens criminal doors and buys a single round of hesitation from enemies who know better), Brawler (the pit-fighter whose reputation freezes a second fight before it starts), Swashbuckler (the infamous duelist whose name buys passage through underworld gates), general adventurers who have accumulated a criminal history across the campaign
**Capstone feeling:** You have survived long enough in the grey world that the grey world knows your face. The question is no longer how to get in — it is who gets out of your way.
**Design notes:** R4's failure mode — the creature gains a boon against you — converts a bad roll into a different tactical problem rather than a null result. Your reputation landed; it just created a threat. The hesitation in combat equals a single-turn stagger on one creature: potent for escape or setup, not fight-ending. R5's free reputation intelligence is a permanent zero-cost mechanic that bypasses the need to roll Streetwise for underworld scene-setting — a quality-of-life capstone that rewards total investment. The session marker follows the same "cannot eliminate a primary challenge" safety valve as Criminal Instinct R5 to prevent the two capstones stacking to bypass the adventure wholesale.
**Versatility check:** Combat: yes (hesitation stagger). Dungeon: yes (any underworld/mercenary creature). Wilderness: yes (bandit camps, mercenary patrols). Social: yes (underworld reputation opens doors). Downtime: yes (reputation intelligence on entry).

---

### Reading the Angles (Streetwise, High-Level, Prerequisite: Streetwise 3)
*You have been on the wrong end of every scam, every ambush, every betrayal this world offers. Now you see them all before they spring.*

**Rank 4.** Once per scene, when you enter a new area, location, or social scene, you may spend a Quick Action to roll MND + Streetwise (TN 9). The GM answers your questions honestly based on your result:
- **Weak success (1 question):** choose one — Is there a hidden threat (ambush, trap, concealed weapon, informant) present that has not yet revealed itself? / Is any creature in the area concealing hostile intent toward you or your allies? / Is there something specifically wrong with this situation that a veteran of the streets would immediately recognize?
- **Strong success (2 questions):** choose any two of the above.
- **Critical success (all three + guidance):** receive all three answers, and the GM names one specific action you could take in the next round that turns this situation to your advantage.

When you successfully read the angles before combat breaks out, you and all allies who heard your assessment do not suffer any surprise-round penalties during the resulting combat. Until the end of the scene, once per round as a free action you may call a tactical angle for one ally within your line of sight — they gain +1 boon on their next roll this round.

**Rank 5.** Permanent. You cannot be **surprised** in combat while you are conscious. Additionally, once per session, when a creature successfully deceives you, manipulates you with a social ability, or lures you into a prepared trap, you may declare you saw it coming. The effect does not apply to you. You choose whether to appear affected (you know, but act as if you don't, allowing you to gather information and control the situation) or to openly call it out (the attempt fails entirely; in a Social Intrigue scene, the creature loses Patience equal to your Streetwise rank; in combat, the creature is briefly **dazed**). This declaration must be made the moment the deception is revealed, not after its consequences have already landed.

**Archetype enablement:** Rogue (the paranoid survivor who cannot be caught flat-footed or conned), Brawler (the pit-fighter who reads every sucker punch before it lands), Swashbuckler (the duelist who sees the feint before the blade moves), versatile adventurers who have built their survival on wits over force
**Capstone feeling:** You are the hardest target in any room — not because you hit harder, but because you understand every trap before it springs. Nobody ambushes you. Nobody cons you. The question is whether you let them think they did.
**Design notes:** Distinct from Perception (which detects the clue) and Insight (which reads emotional truth): Reading the Angles evaluates the meaning of a situation — "is this a trap?" not "what is hidden here?" R4's party no-surprise-penalty is conditional on a successful roll and on allies having heard the assessment — it requires both a hit and communication, making it neither automatic nor trivially reliable. The free tactical call is once per round with no action cost and grants a situational bonus (+1 boon) that does not stack with other situational bonuses. R5's "I saw it coming" uses the same retroactive-declaration structure as Criminal Instinct R5 but for defense against deception — declared immediately when the attempt is revealed, preventing abuse. "Never surprised" is the permanent passive payoff for full capstone investment.
**Versatility check:** Combat: yes (never surprised, tactical calls, "saw it coming" against ambushes). Dungeon: yes (detect traps and hidden threats before committing). Wilderness: yes (read a hostile camp, detect a bandit setup). Social: yes ("saw it coming" kills any con or manipulation once per session). Anywhere.
