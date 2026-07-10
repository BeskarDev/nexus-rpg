# Perception — Talent Design Workbench

> **Source:** [docs/03-statistics/06-talents/perception.md](../../../03-statistics/06-talents/perception.md) | **Main Analysis:** [TALENT_SYSTEM_ANALYSIS.md](../TALENT_SYSTEM_ANALYSIS.md)

## 1. Skill Identity

**Role Spread:** Excels: Defense | Decent: Utility, Control | Weak: Offense, Healing, Support

**Primary Archetypes:** Engineer (support — sole archetype listing Perception in their skill set)

**Identity Tags:** early warning, sensory acuity, hidden detail, threat assessment, environmental scan

**Design Lens:** Perception is the sentinel's skill — it prevents being caught off-guard, extracts details from environments, and identifies where danger hides before it strikes. Only one archetype formally lists it as a support skill (Engineer), yet every character rolls Perception regularly, making it the system's most universally accessed skill regardless of build. This creates an unusual design challenge: talents must appeal broadly rather than serving one archetype's fantasy. The five complete talents execute this well — each fills a different sensory niche (darkness, ambush, traps, distance, weakness targeting) — but the pool at five is far too small, and the "listening," "scent," and "vigilance" aspects have no dedicated mechanical expression.

---

## 2. Current Talent Inventory

| Talent | Path | Max Rank | Status | Role | Notes |
|--------|------|----------|--------|------|-------|
| Blind Senses | Basic | R3 | Complete | Combat | Blindness mitigation; active creature-sense at R2; medium range at R3 |
| Danger Sense | Basic | R3 | Complete | Combat | Initiative re-roll; ambush/trap resist at R2; ally ambush coverage + Initiative floor at R3 |
| Dungeon Delver | Basic | R3 | Complete | Utility | Trap and mechanism understanding; treasure dice advantage at R2–R3 |
| Eagle Eye | Basic | R3 | Complete | Hybrid | Spot as QA; hidden/invisible re-roll; cover-ignore at R2; unlimited range detail at R3 |
| Identify Weakness | Basic | R3 | Complete | Combat | +Perception damage + resistance ignore; party extension per kill at R2; vulnerability trigger at R3 |

**Summary:** 5 talents total — 5 complete, 0 incomplete. Max rank: R3. Role distribution: ~60% combat / ~20% hybrid / ~20% utility.

---

## 3. Gaps & Priorities

**Signature gap:** Engineer has no Perception-native signature for their contraption and trap-awareness interest — Dungeon Delver covers traps broadly but doesn't express the engineering mindset (identifying a mechanism's *purpose* and exploiting it, not just surviving it). All five current talents are well-polished but no single one captures a specific archetype's defining fantasy because the skill was designed as a universal access pool.

**Role gaps:** The "listening" and "scent" aspects have no dedicated talent — all five existing talents focus on visual perception or general awareness. An archer who navigates by sound in smoke, a tracker who follows a scent trail, or a guard who hears intruders through stone walls all use Perception in ways that the existing pool doesn't support with specific mechanics. Social perception — reading body language, detecting lies through micro-expression in a crowd — is also absent despite being a core Perception use in social scenes.

**System integration gaps:** Travel's Scout role relies on Perception but no talent explicitly interacts with the Travel system's Encounter Die or scouting mechanic. Danger Sense partially covers ambush prevention but uses general language rather than Travel system terms. Social Intrigue has zero Perception hooks — yet body-language reading during negotiations is a natural use. Challenges have no Perception-specific talent interactions.

**Rank gaps:** No talent reaches R4. Identify Weakness is a strong candidate for R4 expansion — at Master rank, a Perception specialist who has studied a target thoroughly should gain additional insight into vulnerabilities beyond what the current R3 "vulnerability trigger" provides. The talent pool at five total means any Rank 2+ Perception character has all content unlocked; Ranks 3–5 are entirely dead zones without new talent additions. Needs 3–5 new talents minimum.

**Priority ranking for design work:**
1. Add a sound/scent-based detection talent (the "listening" and "scent" aspects — zero current coverage)
2. Add a Scout role talent explicitly interacting with Travel system mechanics
3. Add 2–3 new talents to reach 8–9 baseline
4. Extend Identify Weakness to R4 — it is the most combat-relevant talent and the natural choice for High-Level expansion

---

## 4. Design Space

Perception's biggest unexplored territory divides into two clusters: **non-visual sensing** and **proactive threat mapping**. Every existing talent is either visual (Eagle Eye, Blind Senses, Identify Weakness) or general "sense" based (Danger Sense). The "listening" and "scent" aspects have rich design space: a character who closes their eyes and listens to the battlefield, tracking movement by sound; a tracker who follows a scent trail through rain; a guard who smells fear in a crowd. These would function differently from visual perception because they impose range limitations while bypassing cover — a sound-based awareness talent that works through walls but not at long range is mechanically distinctive.

Proactive threat mapping is the second cluster: using Perception not just to react (Danger Sense) but to actively survey and categorize dangers before entering. Dungeon Delver is the closest existing talent to this, but it is specific to mechanisms. A broader "Survey" or "Sweep" talent that lets the character map threats before the rest of the party enters a location — tagging ambush positions, identifying hidden entities, memorizing entry/exit points — would serve every archetype that benefits from Perception without requiring a specific archetype fantasy.

### Unexplored Thematic Angles
- **Non-visual sensing (listening/scent):** Talents that trade range for cover-bypass — hearing creatures through walls, smelling blood or fear, echolocating in darkness; mechanically distinct from visual perception because they work where eyes cannot
- **Proactive threat mapping:** Pre-scene survey ability that identifies hidden dangers before combat begins — tagging ambush positions, locating invisible threats, establishing the tactical layout of a space; the "professional scout reads the room" fantasy
- **Sensory overload resilience:** Protection against sensory attacks — blindness, deafening, illusory distractions — building on Blind Senses but extending to other sensory interference; natural R4 or High-Level expansion
- **Social body language:** Detecting deception or hidden intent through physical cues in social scenes — Perception as a social skill that notices the dart of eyes, the unconscious hand gesture, the slight hesitation before an answer

### System Integration Opportunities
- **Challenges:** Surveillance challenges (mapping a guarded compound, counting enemy forces, monitoring a target's routine) are natural Perception domains; no talent currently names Challenge mechanics for Perception specifically
- **Social Intrigue:** Body language and environmental cues during negotiations — noticing a concealed weapon, seeing that the hostage is actually under duress, detecting a hidden listener — would make Perception valuable in social challenge scenes beyond just combat preparation
- **Travel:** A Scout role talent is the clearest integration opportunity: explicitly granting a bonus to the party's Travel scout roll (Encounter Die reduction, advance warning of ambush) when the Perception-skilled character takes the Scout role

---

## 5. Talent Suggestions

> **Status:** Deep design pass complete. Five talents fully designed across all four gap categories (reactive defense, travel integration, non-combat investigation, challenge integration) plus one High-Level capstone.

---

### Phase 1 — Diverge: Seed Ideas

Fourteen concepts across the full Perception design space, before any filtering:

1. **Combat Instincts** — React to an incoming attack with a heightened defensive stance, boosting Defense before the blow lands
2. **Keen Scout** — Excel in the travel Scout role, unlocking better outcomes per scouting success level
3. **Forensic Eye** — Read a location's physical record by examining disturbed dust, heat residue, and displaced objects
4. **Constant Vigil** — Leverage Perception in challenge scenes involving tracking, surveillance, and pursuit
5. **Tactical Prescience** — Master-level battlefield read that reveals all hidden threats and tactical information in an area
6. **Acute Hearing** — Detect creatures through walls and cover by sound, trading range for cover-bypass
7. **Scent Trail** — Follow a specific creature or person by scent across terrain and time
8. **Body Language** — Read physical tells and micro-expressions during social scenes, using sensory cues to detect deception
9. **Coordinated Alarm** — Relay perceived threats to allies as a Quick Action, enabling coordinated defensive responses
10. **Memory Map** — Recall exact sensory details of previously observed locations with perfect fidelity
11. **Sensory Resilience** — Shorten or resist the duration of sensory attacks such as blinding and deafening conditions
12. **Shadow Profile** — Build a comprehensive awareness of a single target over repeated observation, predicting their next move
13. **Eavesdrop** — Extract specific conversations from ambient noise in crowds, through walls, or at range
14. **Danger Map** — Before entering an unfamiliar area, spend time surveying to identify all prepared ambush positions and escape routes

---

### Phase 2 — Converge: Selected Talents

**Selected: Combat Instincts, Keen Scout, Forensic Eye, Constant Vigil, Tactical Prescience**

**Rejection rationale:**

- **Acute Hearing / Scent Trail** — Rich design space but both belong to a single "non-visual sensing" talent rather than two separate ones. Combining them into one talent is the right scope; they're a Phase 2 candidate for the next design wave, not five separate slots.
- **Body Language** — This reads people through physical observation, which risks crossing into Insight territory. The distinction (Perception = raw sensory data, Insight = pattern interpretation) breaks down here. Deferred until Insight and Perception boundaries are clarified in a formal boundary document.
- **Coordinated Alarm** — Narrow support use case, mostly redundant with Danger Sense R3 (which already shares ambush resistance with allies). Not the gap to fill first.
- **Memory Map** — Appealing, but highly GM-adjudication-dependent and difficult to frame with exact trigger/effect/limit text. Deferred.
- **Sensory Resilience** — Good defensive expansion but doesn't fill any named gap. Second priority after current batch.
- **Shadow Profile / Eavesdrop / Danger Map** — Interesting but overlap thematically with Dungeon Delver (Danger Map) or Forensic Eye (Shadow Profile). No single gap they alone fill.

**Why these five:**

| Talent | Gap Filled | Priority |
|--------|-----------|----------|
| Combat Instincts | §3.5 Reactive defense missing from system | Critical |
| Keen Scout | Travel Utility gap; Scout role has zero talent support | Critical |
| Forensic Eye | Non-combat investigation; no physical evidence mechanic | High |
| Constant Vigil | Challenge integration; Perception-heavy challenges have no talent hooks | High |
| Tactical Prescience | No High-Level Perception talent; dead zone at R4–R5 | High |

---

### Phase 3 — Develop: Full Designs

---

### Combat Instincts (Basic)

*Battle-honed reflexes let you read an incoming strike a heartbeat before it lands — enough time to shift your guard.*

**Rank 1.** Once per scene, when a creature you can see makes an attack roll against you, you can use a Quick Action between your turns (declared before the attack roll is made) to heighten your guard. You gain +2 Defense against that attack as a situational bonus. If you also have the **Evasion** talent and would use its damage-halving ability (Rank 3) against the same attack, you can only benefit from one of the two abilities — Combat Instincts (Defense bonus) or Evasion (damage reduction), not both.

**Rank 2.** You can use your Combat Instincts ability once per scene per attacker, rather than once per scene total.

**Rank 3.** Your Combat Instincts ability has no per-scene limit against attacks made by enemies within short range that you can see. The situational Defense bonus increases to +3.

**Archetype enablement:** Ranger, Engineer, Scout-style characters of any build. Any lightly armored character who cannot invest heavily in Athletics or Fighting's defensive options benefits from a Perception-based reactive defense. Particularly strong for characters who invest in Perception naturally (Ranger, Oracle, Engineer) and want a defensive payoff from that investment.

**Design notes:** Fills the §3.5 reactive defense gap without entering redirection territory (Drunken Technique) or avoidance territory (Evasion). The Quick Action cost between turns is appropriate — it consumes action economy, especially important for characters who have Evasion R2 (+1 Quick Action between turns) and would otherwise have spare reaction bandwidth. Explicit Evasion non-stacking rule prevents the combination of +Defense and halved damage on the same attack from making light-armor builds invulnerable. Fixed bonuses (+2/+3) match the §4.5 fixed bonus table for R1/R3 defensively. R2 expanding from "once per scene total" to "once per scene per enemy" is a natural power step — in a multi-enemy encounter it becomes more useful without removing the per-scene tension in a single-enemy fight.

---

### Keen Scout (Basic)

*No one reads terrain, wind, and skyline like you do. Where others see wilderness, you see a map of what is about to happen.*

**Rank 1.** When you take the Scout role during travel, you gain +1 boon on your Scout roll (Spirit + Perception).

**Rank 2.** When you take the Scout role and score a Weak Success, you may choose two bonuses from the Scout bonus list instead of one.

**Rank 3.** When you take the Scout role and score a Strong Success, you may resolve all three bonuses from the Scout bonus list (as if you had scored a Critical Success). You can take the Scout role alongside one optional travel role (Forager, Hunter, Fisher, or Quartermaster) without suffering the multi-role bane penalty.

**Archetype enablement:** Ranger above all others. Also Scout-oriented characters (any archetype relying on Survival or Perception for travel), and Engineer (who uses Perception as their fourth skill). Any build that expects to operate in travel-heavy campaigns.

**Design notes:** Directly addresses the travel integration gap — Perception is the Scout skill and had no talent support for the Scout role. The boon at R1 follows the standard "unlock" pattern; it is a skill bonus to the Scout roll, not a flat progression bonus. R2 upgrading Weak Success to two bonuses is a strong payoff — the Scout's Weak Success list includes "find shelter" (mandatory for camping) and "avoid danger" (affects daily events), so getting two on a weak result materially changes the travel day. R3's "Strong = Critical" is the mastery tier; it means a well-built Scout player almost always resolves all three bonuses on any non-failure result. The dual-role provision at R3 is a capstone quality-of-life reward — a Perception grandmaster who is also the party scout can now simultaneously forage or hunt without penalty, fitting the "capable wilderness specialist" fantasy.

---

### Forensic Eye (Basic)

*You read a location like a witness. The displaced gravel, the faint heat rising from a recently extinguished fire, the half-breath of scent on a doorframe — these are your testimony.*

**Rank 1.** Once per scene, after spending at least 1 minute examining a location, creature, or object, roll Mind + Perception. The GM provides physical evidence about recent events at that location or involving that subject. On a **Weak Success**, 1 piece of evidence. On a **Strong Success**, 2 pieces of evidence. On a **Critical Success**, 3 pieces of evidence, including at least one detail that is not immediately obvious from a cursory look. This ability answers sensory questions — who was present, how many, what they touched, where they went, what was removed — not their motivations or plans.

**Rank 2.** Your Forensic Eye ability no longer requires 1 minute of examination. It now requires only your Action. You gain +1 boon on the roll.

**Rank 3.** When you use Forensic Eye, you can also determine whether evidence has been deliberately tampered with or removed. The GM must tell you whether the scene has been disturbed, though not what was hidden or why. Additionally, if you have examined the same location before (even days ago), you gain +1 boon on the roll (cumulative with your Rank 2 boon, for +2 boons total) and any changes since your previous examination are immediately apparent without a roll.

**Archetype enablement:** Engineer (scene analysis at contraption sites, aftermath investigation), Ranger (crime scene reading, post-battle analysis), Rogue (reading a mark's recent activity), Oracle (interpreting physical omens in a location). Broadly useful for any character in an investigation-heavy campaign.

**Design notes:** Distinguishes sharply from Insight by anchoring to physical, sensory evidence only. Insight reads motives and patterns in people; Forensic Eye reads traces that senses can detect (sight, sound, scent, touch, heat). The GM parameters for "evidence categories" are sensory: position, number, direction, physical contact, visible damage, scent residue. The GM should not provide motivations, plans, or emotional states in response to a Forensic Eye use. The 1-minute minimum at R1 prevents it from being used mid-combat; R2 removing that minimum (down to one Action) represents the practitioner developing speed through mastery. The R3 tampering detection ("scene disturbed, not what") gives GMs a concrete bounded option rather than "GM decides if the character notices." Every GM answer is binary: disturbed or not disturbed.

---

### Constant Vigil (Basic)

*You treat any complex situation — a chase through alleys, a tracked quarry through marshland, a surveilled compound — as a tactical problem with solvable pieces.*

**Rank 1.** During any challenge that involves tracking, pursuit, surveillance, exploration, or investigation, your Perception rolls that produce a Critical Success reduce the challenge die by 3 instead of 2. Once per challenge, when you succeed on a Perception roll, you may ask the GM one concrete sensory question about the subject of the challenge (how many there are, which direction they went, what condition they are in, what they are carrying).

**Rank 2.** Once per challenge, you may substitute your Perception rank for the rank of one Stealth or Survival roll. Roll using the normal attribute for that skill, but use your Perception rank instead. This counts as your Perception use for the challenge's skill-once rule, not your Stealth or Survival use.

**Rank 3.** When you succeed on a Perception roll during a challenge, the next ally to act in the same challenge gains +1 boon on their roll. Once per challenge, when you fail a Perception roll, you may cancel the resulting consequence — you still make no progress, but the consequence does not trigger.

**Archetype enablement:** Ranger (tracking challenges), Engineer (reconnaissance challenges), any character who takes the Scout travel role and also faces urban investigation or wilderness pursuit challenges. Strong secondary benefit for any party member in a chase where Perception is applicable.

**Design notes:** Hooks directly into the challenge die mechanic (die -3 on Critical instead of -2) and the skill-once rule (Perception substituting for Stealth or Survival once per challenge). The sensory question at R1 must be answerable by raw senses — the GM cannot decline to answer if the character is in position to observe, but the answer is constrained to observable facts (no emotional states, no future intentions). The R2 substitution keeps the attribute appropriate to the task (AGI for Stealth, SPI or AGI for Survival) so it is not a free attribute upgrade — it helps a character with high Perception but low Stealth still contribute sensory-based stealth work. The R3 party boon is limited to the next single ally's roll (not all allies simultaneously), preventing it from becoming a group buff. The consequence-cancel at R3 once per challenge is the mastery payoff — the character's preparation prevents one disaster per challenge, not all of them.

---

### Tactical Prescience (High-Level)

*After decades of reading battlefields, you perceive the whole where others see only pieces. Hidden threats, dying enemies, prepared ambushes — the full tactical situation is open to you the moment you choose to look.*

**Rank 4.** Once per scene, you can spend your Action to perform a **Battlefield Read**. Roll Spirit + Perception vs. TN 8. On a success, you perceive the full tactical situation within medium range: you know the exact location of all hidden and invisible creatures, you know which creatures are **bloodied** (below half their maximum HP), and you detect all prepared traps and ambush positions. On a Critical Success, you also identify the primary attack type of each visible enemy (melee, ranged, or magic). You may share any or all of this information with your allies freely.

**Rank 5.** Permanent. Your senses operate at the absolute limit of mortal capacity. Creatures within close range cannot remain hidden from you as long as you can hear, smell, or sense air movement — they must suppress all sensory output simultaneously (not just sight) to remain hidden from you. Once per day at the start of combat, before Initiative is rolled, you may choose to trigger an **Instinctive Assessment**: you automatically succeed as if you had used Battlefield Read (no roll, no Action required) and no creature within medium range can make a surprise attack against you or allies within short range during the first round. When you take the Scout role during travel, a Strong Success on your Scout roll counts as a Critical Success for determining your Scout bonuses.

**Archetype enablement:** Ranger (master scout and hunter), Engineer (pre-engagement surveillance), Oracle (the character who "always knows"), Scout-build of any archetype at peak Perception investment. Anyone who has reached Perception R5 has clearly committed to the sentinel fantasy and deserves a capstone that expresses it.

**Design notes:** R4 is encounter-shaping — the Battlefield Read is one of the most powerful information abilities in the system but requires a roll, an Action, and a once-per-scene limit. A failure means wasted Action and no information; this is a meaningful cost. The TN 8 success threshold is accessible (typical target number) but not trivial in a contested or high-stress situation. The information revealed (hidden creatures, bloodied, traps, attack types on Critical) is entirely observable sensory data — not motives or future plans. R5's passive hidden-detection at close range is bounded carefully: it only applies within close range, and only while the character can hear/smell/feel (the creature must suppress all senses simultaneously, not just become invisible). This closes loopholes (a silent, invisible, scent-masked creature can still hide) while covering the vast majority of hidden-creature scenarios. The once-per-day Instinctive Assessment is the session-defining ability — it guarantees one encounter starts with full information and no first-round surprises for the party. The Scout travel upgrade at R5 (Strong = Critical) is the travel integration payoff for the full Perception investment: a Grandmaster Perception character who takes the Scout role rarely fails to resolve all three bonuses.

---

### Spotter's Call (Perception, High-Level)

*The character who makes every ally more effective against a single target — not by striking harder, but by communicating exactly where to strike and when.*

**Rank 4.** Once per scene, use your Action to select one creature within long range as your **Called Target**, focusing your full observational attention on them and relaying continuous tactical guidance to your allies. Until the end of the scene or until the Called Target drops to 0 HP:

- The Called Target does not benefit from cover against attacks made by you or any ally within short range who can hear you. Total cover (no line of sight) still provides full protection.
- Once per round as a free action between turns, you may call out a strike window to one ally within short range — that ally gains +1 boon on their next attack against the Called Target this round.

You may designate only one Called Target at a time. Changing your Called Target requires spending your Action again.

**Rank 5.** Permanent upgrade to Spotter's Call:

- The strike-window free action (once per round) extends to all allies within medium range who can hear you.
- While Spotter's Call is active, the Called Target cannot benefit from the **Hidden** condition against you or any ally within medium range of you — your continuous tracking of their position means concealment alone provides no protection. The creature must leave your line of sight entirely to reestablish the **Hidden** condition.

**Archetype enablement:** Ranger (sniper spotter for an archer or melee party), Engineer (tactical targeting for a siege or ambush), Scout-builds of any archetype who prefer a party-support combat role. Any character who invests deeply in Perception and prefers enabling allies over dealing damage directly.

**Capstone feeling:** "You don't swing the sword. When you call the target, everyone hits harder."

**Design notes:** Carefully distinct from Identify Weakness: IW gives the user a personal damage bonus and resistance-ignore; Spotter's Call gives party-wide cover-bypass and attack-window boons to allies. They address different resources (damage vs. accuracy) and different participants (user vs. party). The cover bypass is bounded — total cover still works, only partial and heavy cover are negated. The once-per-round free-action boon at R4 extends to medium range at R5, representing the spotter operating from a more distant overwatch position. The Hidden-condition clause at R5 is the capstone payoff: at peak Perception, the spotter tracks a target so continuously that merely ducking behind an obstacle no longer suffices for concealment. Distinct from Tactical Prescience, which reveals all enemies in an area at once — Spotter's Call concentrates investment on one target to enable maximum party effectiveness against it.

---

### Perfect Witness (Perception, High-Level)

*The character who sees everything, remembers it perfectly, and knows what was missing — whose account of events becomes an unshakeable record.*

**Rank 4.** Once per scene, when you have directly observed an event, location, or person within the past 24 hours, you may invoke your **Perfect Witness** ability (no Action required; usable at any point during an investigation, interrogation, or social scene). Roll Spirit + Perception vs. TN 8.

On a success, state up to three specific sensory facts from your observation — positions, words spoken, objects present, or details noticed in passing — and the GM confirms each as accurate or inaccurate. You also know immediately whether anything was absent from the observed scene that should have been present (a missing object, a person expected but not there, a sound that stopped), though not the reason for the absence.

On a failure, you may state only one fact (still confirmed by the GM), and you cannot invoke Perfect Witness again this scene about the same event.

This ability covers sensory facts only — not motives, plans, or emotional states.

**Rank 5.** Permanent. Your Perfect Witness ability improves in two ways:

- You may invoke it for events up to one month ago with no additional penalty, and no roll is required for events within one week.
- Once per session, when you present your Perfect Witness account during a social challenge, court proceeding, or investigation scene, any party attempting to contradict your account must succeed on a Spirit or Mind + Insight or Influence roll vs. TN 12 before their contradiction can affect the scene's resolution. On a failure, the scene treats your account as the established factual record for that point of dispute.

**Archetype enablement:** Ranger (crime scene reconstruction and post-battle analysis), Engineer (technical assessment and incident reports), Scout (military debriefing and intelligence presentation), Oracle (reading the pattern of past observations to illuminate the present). Strongest for characters in investigative and socially complex campaigns.

**Capstone feeling:** "They saw what happened. Exactly what happened. There is no room for interpretation."

**Design notes:** The three-fact confirmation at R4 mirrors the bounded query pattern of Sense of Deduction and Eye of the Seer — the GM confirms true or false without elaboration, preventing open-ended narrative pressure. The "what was absent" clause is a separate, unrolled effect — the investigator fantasy of noticing the dog that did not bark. Forensic Eye (also in this pool) reads present physical evidence at a scene; Perfect Witness recalls what the character personally observed. Both are needed: Forensic Eye analyzes a scene the character was not present for; Perfect Witness testifies to what they directly witnessed. R5's month-long recall converts the talent into a permanent world-presence passive. The TN 12 social challenge gate reflects that a credentialed Perception grandmaster's direct testimony is mechanically hard to contradict — above standard difficulty (TN 8 + 4), requiring genuine effort and social investment from the disputing party.

---

## 6. Talent Notes

**Identify Weakness — party-wide bonus clarification needed.**

The current talent text reads: "add your Perception to the damage for **your** attacks against the target." This is a personal bonus, applying only to the talent user's own attacks. However, TALENT_SYSTEM_ANALYSIS.md §4.2 flags Identify Weakness as "[applying] to the entire party's attacks against the focused target" and rates it as over-performing on that basis. The discrepancy between the published text (personal bonus) and the analysis assessment (party-wide) requires clarification. If the design intent is personal-only, the analysis entry should be updated. If the design intent is party-wide, the talent text needs to be corrected to say "attacks against the target" without "your." At party-wide with +Perception scaling, this talent would be the strongest damage amplifier in the system at high Perception ranks — the scaling issue (flagged in §4.5) compounds the concern. Resolution: confirm design intent before either publishing a fix or updating the analysis.

**Talent pool target.**

With the five new talents above, the Perception pool reaches 10 total talents:

| Talent | Path | Max Rank | Status |
|--------|------|----------|--------|
| Blind Senses | Basic | R3 | Complete |
| Combat Instincts | Basic | R3 | New |
| Constant Vigil | Basic | R3 | New |
| Danger Sense | Basic | R3 | Complete |
| Dungeon Delver | Basic | R3 | Complete |
| Eagle Eye | Basic | R3 | Complete |
| Forensic Eye | Basic | R3 | New |
| Identify Weakness | Basic | R3 | Complete |
| Keen Scout | Basic | R3 | New |
| Tactical Prescience | High-Level | R5 | New |
| Spotter's Call | High-Level | R5 | New |
| Perfect Witness | High-Level | R5 | New |

With all twelve talents above, Perception is a well-served skill. It supports combat (Blind Senses, Danger Sense, Combat Instincts), exploration/utility (Eagle Eye, Dungeon Delver, Forensic Eye, Constant Vigil), travel (Keen Scout), tactical party support (Identify Weakness, Spotter's Call), and investigation/investigation-world presence (Tactical Prescience, Perfect Witness). Role distribution is roughly 30% combat / 35% utility-exploration / 15% travel-system / 20% investigation-social. The High-Level tier now has three capstones covering three distinct Perception archetypes: the battlefield scanner (Tactical Prescience), the tactical spotter (Spotter's Call), and the living record (Perfect Witness).
