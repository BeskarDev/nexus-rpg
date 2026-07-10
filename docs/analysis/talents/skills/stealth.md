# Stealth — Talent Design Workbench

> **Source:** [docs/03-statistics/06-talents/stealth.md](../../../03-statistics/06-talents/stealth.md) | **Main Analysis:** [TALENT_SYSTEM_ANALYSIS.md](../TALENT_SYSTEM_ANALYSIS.md)

## 1. Skill Identity

**Role Spread:** Excels: Control | Decent: Offense, Utility | Weak: Healing, Support, Defense

**Primary Archetypes:** Bard (support), Duelist (support), Rogue (key support), Slinger (support), Swashbuckler (support)

**Identity Tags:** concealment strike, social misdirection, sleight of hand, shadow positioning, silent entry

**Design Lens:** Stealth is the art of not being seen — and exploiting the moment when you are not. Its talents cluster around two expressions of invisibility: the violent kind (Assassination, Hidden Strike — turn concealment into a killing opening) and the social kind (Devious Tactics, Sleight of Hand, Roguish Wits — misdirect, deceive, lift and plant without being noticed). The skill has the most obvious single gap in the system: "infiltration" — lockpicking, bypass, and silent entry — is listed as an explicit zero-coverage identity tag (§3.3) despite being the defining fantasy of the Rogue archetype. Both Roguish Wits and Sleight of Hand have incomplete R3, meaning the skill's social misdirection side is also unfinished.

---

## 2. Current Talent Inventory

| Talent | Path | Max Rank | Status | Role | Notes |
|--------|------|----------|--------|------|-------|
| Assassination | Basic | R3 | Complete | Combat | SL upgrade on first unaware hit; +Stealth flat damage at R3 (flagged overperforming at R1+R3 stack per §4.3) |
| Devious Tactics | Basic | R3 | Complete | Combat | Distract as QA from any source; multi-enemy distract at R2; marked on distracted target at R3 |
| Hidden Strike | Basic | R3 | Complete | Combat | Concealed weapon draw-and-attack as QA 1/scene; +boon at R2; briefly stun on hit at R3 |
| Leading the Way | Basic | R3 | Complete | Utility | Group stealth share; extends to short at R2; extends to medium at R3 |
| Roguish Wits | Basic | R3 | Incomplete | Hybrid | Stealth-based deception re-roll; defensive Stealth-add reaction at R2; R3 missing (XXX) |
| Sleight of Hand | Basic | R3 | Incomplete | Utility | Pickpocket/plant re-roll; undetected failure at R2; R3 missing (XXX) |

**Summary:** 6 talents total — 4 complete, 2 incomplete. Max rank: R3. Role distribution: ~50% combat / ~17% utility / ~17% hybrid / ~17% incomplete.

---

## 3. Gaps & Priorities

**Signature gap:** The "infiltration" identity tag (lockpicking, bypass, silent entry) has zero talent representation anywhere in the system — it is called out explicitly in §3.3 as a critical missing piece. This is Rogue's most distinctive fantasy and the skill that defines the archetype in nearly every RPG. Disguise — another named Stealth aspect — also has zero coverage. Bard uses Stealth for social infiltration but has no dedicated talent here for their "charmed entry" fantasy.

**Role gaps:** Three of six complete/partial talents are pure combat. Utility is almost entirely represented by Leading the Way (group stealth) and the incomplete Sleight of Hand. No downtime talent. No social leverage talent where maintained stealth reputation or disguise capability grants an out-of-combat benefit. The "escape" and "silence" aspects are only partially expressed (Escape Artist in Athletics handles physical escape; no Stealth-native quiet movement or environmental sound-masking talent exists).

**System integration gaps:** No Challenge interaction despite infiltration challenges being the natural home for Stealth. The Travel system has no Stealth hooks — but Slinger (a stealth-support archetype) and Rogue should have Stealth-based Scout role talent support for setting ambushes or scouting silently. Social Intrigue has zero explicit Stealth mechanics despite disguise and false identity being core social-scene tools.

**Rank gaps:** No talent reaches R4. Assassination is the most combat-critical talent and flagged as overperforming — R4 expansion should be careful rather than additive. Roguish Wits and Sleight of Hand R3 must be completed before any new talent work begins. Needs 2–4 additional talents to reach 8-talent baseline.

**Priority ranking for design work:**
1. Complete Roguish Wits R3 and Sleight of Hand R3 immediately — broken progression paths
2. Add infiltration/lockpicking talent — the highest-priority signature gap in the entire system (zero coverage, Rogue-critical)
3. Add disguise/false identity talent — another zero-coverage aspect
4. Review and possibly rebalance Assassination R1+R3 stack before designing around it further

---

## 4. Design Space

Stealth's most important unexplored territory is **preparation-based infiltration**: the act of bypassing a secured location through patient, skilled technique rather than through combat. Lockpicking, disabling mechanisms, finding and exploiting structural weaknesses in guarded spaces — these all express the "bypass" design note in the skill-themes.md design note. This mechanic should differ from Dungeon Delver (Perception) which is about *understanding* mechanisms; a Stealth infiltration talent is about *bypassing* them without triggering them and without being seen.

Disguise is equally clear and equally absent: a talent allowing sustained false identity maintenance — roll Stealth to establish a disguise, then use that disguise in social scenes without re-rolling each time. The mechanical design challenge is the time economy (how long does it take to establish a disguise vs. maintain it) and the failure condition (when does the disguise unravel). The "sleight" aspect — momentary misdirection of attention — is partially covered by Devious Tactics, but sustained false identity is a different skill entirely.

### Unexplored Thematic Angles
- **Infiltration mastery:** Lockpicking, mechanism bypass, and structural exploitation — the "I can get through any lock" fantasy expressed as a Stealth talent rather than as a Crafting talent; differentiates from Dungeon Delver (Perception) because it is about bypassing, not just understanding
- **Sustained disguise:** A false-identity talent with explicit establishment and maintenance mechanics — rolling once to set the disguise, then using Stealth rank as the DC for others to see through it, with failure conditions that make it feel risky rather than automatic
- **Shadow movement:** A positional talent rewarding maintaining concealment while moving — bonuses for attacking from or returning to shadow, expressing the "lurk and strike" playstyle that Assassination unlocks but doesn't sustain
- **Pickpocket as tactical resource:** Lifting enemy items (keys, spell focuses, weapons) in combat using Sleight of Hand as a Quick Action — extending Sleight of Hand into the combat scene rather than limiting it to the social/exploration scene

### System Integration Opportunities
- **Challenges:** Infiltration challenges (heist-type scenes, silent entry into guarded locations, escaping captivity) are the natural home for Stealth and have zero current talent support; a talent explicitly naming Challenge infiltration mechanics would be the most direct win
- **Social Intrigue:** Disguise and misdirection in social scenes — false identities that bypass social resistance, planted false evidence that shifts suspicion — have no talent expression; this is where Stealth's social toolkit should live
- **Travel:** Scout role via silent movement — a talent giving the party's stealthiest member a defined Travel Scout bonus (Encounter Die reduction, ambush-setting advantage) when taking the Scout position

---

## 5. Talent Suggestions

### Phase 1 — Diverge

Twelve seed ideas across Stealth's full design space. Name and one-sentence concept only.

1. **Shadow Slip** — A reactive Quick Action that imposes a bane on an incoming melee strike and, at higher ranks, converts a miss into a free reposition and finally a mid-combat vanish.
2. **Infiltrator** — Bypass locks, latches, and mechanical barriers faster and without tools, embodying the Rogue's "I can get in anywhere" identity at every rank.
3. **Master of Shadows** — A High-Level capstone that allows you to vanish from plain sight once per scene, and at rank 5 makes you permanently difficult to track or find.
4. **False Face** — Adopt a convincing disguise through posture, voice, and performance — the body-language disguise that is distinct from Streetwise's document-based Forger talent.
5. **Cover Your Tracks** — Actively erase signs of your movement so that pursuers must begin their investigation over rather than following a trail.
6. **Silent Operator** — Suppress or mask sound in a small area, hiding the noise of lock-picking, footsteps, or other giveaway sounds during a critical infiltration window.
7. **Ghostwalk** — Move at full speed through a guarded area without triggering sound-based or movement-triggered detection on patrol routes.
8. **Snatch and Redirect** — In combat, lift a weapon, spell focus, or key item from a target as a Quick Action to disrupt their next turn.
9. **Decoy** — Leave a convincing trace of your presence at a second location, splitting attention and buying time to escape, hide, or reposition.
10. **Escape Artist** — After being caught, restrained, or cornered, break free with unusual speed and vanish before the enemy can regroup.
11. **Dead Drop** — Place an object, signal, or hazard in a location without being detected even while under direct observation.
12. **Social Ghost** — After leaving a scene, witnesses find they cannot accurately reconstruct your appearance or movements when questioned later.

---

### Phase 2 — Converge

**Selected new talents (3 complete Basic designs + 1 High-Level):**

| Talent | Why selected |
|--------|-------------|
| **Shadow Slip** | §3.5 explicit proposal. Fills the avoidance defense gap for Rogue, Swashbuckler, and Assassin — the light-armor melee archetypes with almost no defensive tools. |
| **Infiltrator** | §3.3 highest-priority gap in the system. "Infiltration" (lockpicking, bypass, silent entry) is Rogue's defining identity tag with zero representation anywhere. |
| **False Face** | "Disguise" is a named Stealth aspect with zero coverage. Distinct from Streetwise's Forger by design lens: behavioral performance vs. documents and credentials. Serves Bard and Rogue directly. |
| **Master of Shadows** | High-Level capstone. Stealth has no R4 or R5 options at all. The "vanish mid-combat + permanent ghost" arc rewards long investment in the skill. |

**Cut and why:**
- **Cover Your Tracks** (#5) — Useful but narrow; fits Survival better; emergeable from GM rulings without a dedicated talent.
- **Silent Operator** (#6) — Area silence verges on supernatural; better as a mystic or druidic ability.
- **Ghostwalk** (#7) — Overlaps with Leading the Way (group stealth movement at speed).
- **Snatch and Redirect** (#8) — Covered by the Sleight of Hand R3 completion below.
- **Decoy** (#9) — Overlaps with Devious Tactics (distraction from any source, any object).
- **Escape Artist** (#10) — Crosses with Athletics; Roguish Wits R3 already handles the escape-then-vanish flow in a Stealth-native way.
- **Dead Drop** (#11) — Too niche; purely a downtime mechanic, not a scene-active talent.
- **Social Ghost** (#12) — Covered thematically by False Face R3's doubt-sowing mechanic.

---

### Phase 3 — Develop

#### Completing Incomplete Talents

---

##### Roguish Wits — Rank 3 (Completion)

> Existing progression: R1 re-rolls Stealth when convincing someone of a falsehood; R2 adds Stealth to a Defense as a Quick Action reaction when targeted.

**Rank 3.** Once per scene, when you successfully escape from restraint, break free from capture, or lose a creature that was actively pursuing you, you may immediately take the Hide action as a free action. If you are already hidden when this triggers, you may also move up to half your Movement without breaking the hidden condition.

**Design notes:** The R1–R2 arc builds toward "getting away with things your enemies didn't expect." R3 is the mastery payoff: the successful escape opens a window to vanish entirely. The free Hide is conditional — it only fires when you actually earn the escape, not as a passive. The half-Movement bonus while already hidden rewards players who set up the hidden condition before triggering the escape, rewarding foresight over pure reaction. Note: §5.4 of TALENT_SYSTEM_ANALYSIS.md proposes an alternative Social Intrigue version (freeze Patience die on successful deception, 1/scene) — that version is worth considering if the talent needs stronger challenge-system hooks, but this combat/pursuit version fits the R1–R2 arc more directly.

---

##### Sleight of Hand — Rank 3 (Completion)

> Existing progression: R1 re-rolls pickpocket or plant attempts once per scene; R2 means the target does not notice even on a failed roll, and the talent works against enemies in melee during combat.

**Rank 3.** Once per scene, when you are in melee range of a creature that is unaware of your intent, you may attempt to steal an item from them or plant an item on their person. The target cannot react to or interrupt the attempt while it is in progress. In combat, this attempt requires a full Action. On a failure, the creature becomes aware of what you attempted immediately after the action resolves, not while it is occurring.

**Design notes:** The R2–R3 distinction is tactical timing, not concealment. R2 says the target never notices even on failure — the ideal outcome. R3 says the attempt itself cannot be interrupted, which matters in combat where the target would otherwise react during a slow steal. Spending a full Action in combat is the natural cost — expensive but decisive when you are lifting a weapon, key, or spell focus from an enemy. The post-failure awareness is a small concession: they know what happened, but too late to stop it. Note: §5.4 also proposes a Social Intrigue version (planted evidence grants advantage on Leverage/Deceive; stolen document reveals Motivation or Pitfall) — that is a strong alternative if social-scene coverage is the priority.

---

#### New Talents

---

##### Shadow Slip (Basic)
*You read the trajectory of incoming strikes and step sideways at the last possible moment, turning near-misses into tactical repositions.*

**Rank 1.** Once per scene, when a creature makes a melee attack against you, you can use your Quick Action to impose 1 bane on that attack roll. You cannot use this ability while wearing heavy armor.

**Rank 2.** When a melee attacker misses you after you use your Shadow Slip ability, you may immediately move up to your close movement distance without triggering Opportunity Attacks.

**Rank 3.** When a melee attacker misses you after you use your Shadow Slip ability, you may immediately take the Hide action as a free action, even without cover or concealment nearby.

**Archetype enablement:** Rogue (provides a meaningful defensive option for the glass-cannon melee striker), Assassin (slip away from a failed opening strike to reset positioning for a second attempt), Swashbuckler (agile footwork that rewards the no-armor commitment exactly as the fantasy demands), Duelist (defensive mobility as the payoff for light-armor dedication)

**Design notes:** Directly implements the §3.5 Shadow Slip proposal. The Quick Action cost at R1 is load-bearing — you burn your tactical resource to gain the defensive benefit, making it a real decision rather than a passive save. Heavy armor restriction is non-negotiable: this must not be available to armored builds. R2 adds the repositioning — the attacker wastes their action and you move for free, bounded to close distance and once per scene. R3's free Hide is the synergy engine: combined with Assassination R1 or Hidden Strike R1, the character can vanish after a miss and reopen from concealment. The once-per-scene limit on R1 propagates through the whole chain — R2 and R3 trigger off the same activation, so all three effects happen once per scene total.

---

##### Infiltrator (Basic)
*You slip through locked doors and barred gates the way most people walk through open ones — cleanly, quickly, and without leaving a mark.*

**Rank 1.** When you roll AGI + Stealth to pick a lock, open a latch, or bypass a simple mechanical barrier, you gain +1 boon on the roll. You can make such attempts using improvised tools without penalty.

**Rank 2.** Picking a lock or bypassing a mechanical barrier now takes a Quick Action instead of an Action. When you succeed on such a roll, you may choose to leave the barrier appearing locked, latched, or secured, with no visible sign of tampering.

**Rank 3.** Once per scene, when you roll AGI + Stealth to bypass a lock or mechanical barrier, you gain +2 additional boons on the roll. On a success, the barrier relocks or reseals in its original position after you pass through, leaving no trace of your entry.

**Archetype enablement:** Rogue (primary — this is the core infiltration identity tag that has had zero talent representation in the system), Assassin (silent entry before a kill, clean exit after without triggering pursuit), Bard (accessing noble courts, private vaults, and restricted wings of institutions without force), Duelist (back-room access, controlled confrontation locations, escaping locked safe rooms)

**Design notes:** Fills the §3.3 highest-priority gap. Distinguished from Streetwise's Lock-Breaker (knowledge-based, contacts, tradecraft) by being kinetic and real-time — this talent is about the moment of bypass, not the planning phase. Distinguished from Dungeon Delver (Perception) which is about understanding mechanisms, not bypassing them. The no-trace effect at R2 is the core fantasy: not just that you entered, but that no one can prove it. R3's relock effect is the mastery capstone — guards cannot determine which side of the barrier you are on or how you passed through. With R1's +1 boon always active, R3 grants +3 boons total on the once-per-scene critical entry attempt, which is appropriately high-probability for a skill mastery moment.

---

##### False Face (Basic)
*You reshape how others perceive you through posture, voice, and the art of inhabiting another life entirely — no paperwork required.*

**Rank 1.** When you spend one minute preparing a disguise, make an AGI + Stealth check. The result of your roll becomes the TN for any creature to see through your disguise with a Perception or Insight check. You can impersonate a general social type, such as a guard, merchant, or laborer, without specific props or preparation. The disguise lasts until the scene ends or until a creature succeeds on a check to see through it.

**Rank 2.** You can now prepare a disguise as a Quick Action rather than spending a full minute. You can also impersonate a specific individual you have observed for at least ten minutes, capturing their voice, mannerisms, and appearance. Creatures who know that individual personally gain +1 boon on checks to see through your impersonation of them.

**Rank 3.** Once per scene, when a creature succeeds on a Perception or Insight check to see through your disguise, you can use your Quick Action to sow doubt in their mind. Make an AGI + Stealth check against the result of their revealing roll. On a success, their certainty falters and they do not act on their suspicion before the start of your next turn.

**Archetype enablement:** Rogue (identity concealment during jobs, leaving a location as someone else entirely), Bard (playing a role in the truest sense — social infiltration of high-status gatherings, charming entry into restricted events), Assassin (arriving as a servant and leaving as a guard — the classic assassination setup and clean exit)

**Design notes:** The TN-setting mechanic (your roll result becomes the required TN for discovery) creates meaningful variance: a poor disguise roll leaves you fragile, a strong one holds under scrutiny across the whole scene without re-rolling unless circumstances specifically demand a fresh check. Kept clearly distinct from Streetwise's Forger: Forger handles documents, credentials, and underworld tradecraft — False Face handles the living performance. R2's Quick Action prep makes it practical in fast-moving situations (a disguise thrown on before rounding a corner). R3's "sow doubt" is the critical safety valve for high-stakes infiltration: even when your cover is blown, you buy one round before the alarm. "Before the start of your next turn" gives exactly one action window — not unlimited delay. The +1 boon for creatures who know the impersonation target at R2 is a balance lever, not a separate ability: impersonating a specific person is strictly more powerful than a generic type, so it earns a small vulnerability.

---

##### Master of Shadows (High-Level)
*Prerequisite: Stealth 3*

*You no longer hide in shadows. You carry the shadow with you.*

**Rank 4.** Once per scene, you can take the Hide action without cover, concealment, or darkness nearby. You may move up to half your Movement as part of this action without breaking the hidden condition. You cannot use this ability while wearing heavy armor.

**Rank 5.** Creatures tracking you or searching for signs of your recent passage always roll with 1 bane on their Perception and Survival checks for this purpose. Additionally, once per day, when you would involuntarily reveal your hidden position through a forced movement effect or a creature's special ability, you may immediately take the Hide action as a free action in response.

**Archetype enablement:** Rogue (at high play, the Rogue resets the fight by vanishing mid-combat to reopen with Assassination — the ghost-of-the-city identity at its pinnacle), Assassin (vanish after a kill and never leave a trail — the full assassin fantasy), Swashbuckler (an escape hatch that works without armor, fitting the agile-and-squishy playstyle at high levels)

**Design notes:** R4 is the encounter-shaper: one mid-combat vanish per scene that works in any terrain. The half-Movement included in the Hide action allows a tactical retreat to cover or a flanking position, which is what makes R4 encounter-relevant rather than purely defensive. Heavy armor restriction is again essential. R5's permanent bane on tracking resolves the between-scene fantasy: nobody can tail the Rogue after a job. The once-per-day forced-reveal negation is specifically defensive against abilities designed to expose hidden characters — area reveals, forced movement out of cover, compelled-movement spells — and is not a general immunity, only a single emergency response to involuntary exposure. Requiring Stealth 3 gates this appropriately against dipping. No cap at R4 (the talent runs R4–R5 as required by the High-Level path rules).

---

##### Ghost Among the Living (Stealth, High-Level, Prerequisite: Stealth 3)
*You pass through guarded spaces not by being invisible but by being unremarkable — and when you leave, nothing remembers you were there.*

**Rank 4.** Once per scene, when you enter or move through an area containing alert or suspicious creatures, you may roll AGI + Stealth (TN 10) to pass as belonging. On a success, creatures in the area register your presence as unremarkable and take no hostile action against you during your passage. This effect holds until you take a hostile action, leave the area, or the scene ends. On a failure by 3 or fewer, one creature of the GM's choice becomes suspicious but does not immediately act — you have until the end of your next turn to leave or neutralize that creature before they act on their suspicion. You cannot use this ability while wearing medium or heavy armor.

**Rank 5.** Permanent: When you kill or incapacitate a creature without any other creature in the same area witnessing the act at the moment it occurs, the victim's absence goes unnoticed until a creature actively searches for them or investigates their location. Additionally, once per day, immediately after you leave a location where you have killed or incapacitated at least one creature, you may declare that you leave no traceable evidence of your presence or method. Any investigation of the event finds nothing that conclusively identifies you, how you entered, or how you acted. Magical or supernatural tracking methods can still operate normally.

**Archetype enablement:** Assassin (the peak professional who arrives, acts, and is never identified), Rogue (threading through a crowded guard post or noble estate by confidence rather than concealment), Bard (social infiltration where your face registers as unremarkable, not suspicious)
**Capstone feeling:** You are the operative who was never there. Guards describe a figure they cannot quite place. Investigations find no prints. The job is done, and nobody can prove how.
**Design notes:** Distinct from Master of Shadows (which is about vanishing from concealment mid-combat) because this is about blending in while visible — social camouflage rather than darkness. R4's failure-by-3-or-fewer clause creates a graceful partial failure: close calls buy time to recover rather than triggering an instant alarm. The no medium/heavy armor restriction aligns with the talent's agility-and-confidence premise. R5's "absence not noticed" is a world-state aftermath mechanic, not a combat tool — it changes what a kill means in the world and enables the full ghost-assassin extraction fantasy. The "magical tracking still works" clause keeps GMs in control of investigation-magic resolution.

---

##### Puppet Master (Stealth, High-Level, Prerequisites: Stealth 3 + Devious Tactics R3 or False Face R2)
*When the alarm goes up, someone else answers for it. You decide who.*

**Rank 4.** Once per scene, when a creature or group becomes suspicious, investigates a disturbance you caused, or begins pursuing what they believe to be your trail, you may immediately designate one other creature visible to the investigator as the apparent source. Roll AGI + Stealth against the investigator's Perception or Insight (whichever is higher). On a success, their attention, pursuit, and hostile response is redirected entirely to your designated target for the rest of the scene, or until that target is explicitly cleared by a second investigation. Your designated target may be any creature present in the area and need not know they are being framed.

**Rank 5.** Once per day, you may construct a complete redirect: plant a convincing account of events that places a specific creature as the responsible party for something you did. Spend 10 minutes arranging the scene, planting evidence, or establishing false witnesses. Roll AGI + Stealth (TN 12). On a success, any investigation not backed by magical or direct eyewitness evidence concludes your designated target is responsible. On a failure, investigators are suspicious of your target but reach no firm conclusion. At no success level does any part of the investigation point toward you.

**Archetype enablement:** Rogue (frames a rival faction for a job, turning a kill into a political event), Assassin (frames the client's political enemy for the death, doubling the contract's value), Bard (vanishes from a scene while a different performer is blamed for the disruption)
**Capstone feeling:** You are the hand nobody sees pulling the strings. By the time they find someone to blame, you are three scenes ahead.
**Design notes:** The prerequisite (Devious Tactics R3 or False Face R2) ensures this emerges from genuine misdirection or performance investment, not a fresh dip. R4's opposed-roll structure mirrors False Face and Roguish Wits for mechanical consistency. The designated target must be present and visible to the investigator — you cannot frame an absent person with R4, only redirect existing suspicion in the moment. R5's "at no success level does the investigation point to you" is load-bearing: the frame-up can fail to stick on your target, but your cover never breaks. TN 12 is the steepest in the Stealth toolkit, appropriate for a session-defining R5 effect that can end political careers.

---

> **Status:** Deep design pass complete. Two R3 completions written (Roguish Wits, Sleight of Hand). Six new talents fully designed: Shadow Slip (avoidance defense), Infiltrator (bypass/lockpicking), False Face (disguise/identity), Master of Shadows (High-Level capstone 1 of 3), Ghost Among the Living (High-Level capstone 2 of 3 — social camouflage and clean extraction), Puppet Master (High-Level capstone 3 of 3 — misdirection and frame-up). Ready for owner review before publication to the talent file and app JSON.
