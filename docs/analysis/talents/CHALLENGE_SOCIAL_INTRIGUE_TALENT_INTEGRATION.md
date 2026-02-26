# Challenge & Social Intrigue Talent Integration Analysis

**Purpose:** Review all existing talents for interactions with the [Challenge system](../../06-scenes/07-challenges.md) and [Social Intrigue system](../../06-scenes/08-social-intrigue.md), propose new talents that interact with these mechanics, and update existing talents where appropriate.

> **Reference:** [Challenge Rules](../../06-scenes/07-challenges.md) | [Social Intrigue Rules](../../06-scenes/08-social-intrigue.md) | [Talent System Analysis](./TALENT_SYSTEM_ANALYSIS.md) | [NPC Relations](../../02-adventurers/05-npc-relations.md)

---

## 1. Challenge & Social Intrigue Mechanics Summary

### Challenge Mechanics Talents Can Interact With

| Mechanic | Description | Talent Hook |
|----------|-------------|-------------|
| **Challenge Die** | d6–d12 progress tracker, reduced by successes | Reduce by extra on specific skills; prevent increase on blunders |
| **Target Number** | TN 8–16 per step | Grant boons or reduce TN for specific challenge types |
| **Critical Success** | Reduces die by 2 + bonus effect | Trigger additional effects on crits during challenges |
| **Weak Success Cost** | Progress at a cost (complication, resource spent) | Mitigate weak success costs |
| **Failure Consequence** | No progress + consequence | Reduce consequence severity; treat blunders as failures |
| **Skill Flexibility** | Multiple skills apply; secondary at +1 bane | Remove secondary skill bane; allow unusual skill substitutions |
| **Approach Adjustments** | Clever (−2 TN), Risky (−2 TN + worse failure), Cautious (+2 TN + softer failure) | Enhance approach benefits or reduce approach penalties |
| **Compound Challenges** | Multiple challenge dice in parallel | Contribute to two objectives per round; coordinate allies |

### Social Intrigue Mechanics Talents Can Interact With

| Mechanic | Description | Talent Hook |
|----------|-------------|-------------|
| **Interest** | NPC willingness modifier (−1 to +3), adjusts TN | Raise Interest more easily; prevent Interest loss |
| **Patience** | Challenge die (d4–d8), ticks every roll | Delay Patience; take actions that don't tick Patience |
| **Motivations** | NPC desires/fears/values; +1 Interest when appealed to | Discover Motivations more easily; appeal to multiple at once |
| **Pitfalls** | NPC taboos/insults; −1 Interest when triggered | Discover Pitfalls; recover from triggered Pitfalls |
| **Resolution** | Final Interest determines outcome (full/partial/failure/breakdown) | Boost final Interest; prevent breakdown |
| **Social Actions** | Argue, Appeal, Deceive, Investigate, Leverage, Concede, Assist | Enhance specific action types; combine actions |
| **Escalation** | Repeated failures raise TN; repeated Pitfalls trigger ultimatums | De-escalate more effectively; resist TN increases |

### Challenge Templates and Primary Skills

| Template | Primary Skills | Key Archetypes |
|----------|---------------|----------------|
| **Chase** | Athletics, Perception, Survival, Streetwise | Ranger, Rogue, Barbarian, Slinger |
| **Escape** | Athletics, Stealth, Crafting | Rogue, Swashbuckler, Engineer |
| **Tracking** | Survival, Perception, Nature | Ranger, Druid, Tamer |
| **Social Intrigue** | Influence, Insight, Education | Bard, Priest, Warlord, Oracle |
| **Research** | Education, Lore, Arcana, Mysticism | Sorcerer, Oracle, Summoner |
| **Exploration** | Survival, Nature, Perception | Ranger, Druid, Barbarian |

---

## 2. Existing Talent Audit

### Talents with Direct Challenge/Social Intrigue Interactions

These talents already provide effects that apply during challenges or social intrigue encounters.

#### Fast Talking (Influence)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Re-roll a failed Influence roll in any social situation, once per scene | Directly applicable to Social Intrigue — provides a second chance on a failed exchange |
| 2 | Allow an ally to add your Influence instead of theirs | Functions as an enhanced Assist action during Social Intrigue |
| 3 | Verbally confuse enemies before combat (Mind + Influence vs. Resist) | Pre-combat social disruption; could apply to contested negotiations or breakdown transitions |

**Status:** Strong social talent. Already well-suited for Social Intrigue. No changes needed.

---

#### Inspire Ally (Influence)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Quick Action: +1 boon on an ally's test; add Influence to damage on hit | The +1 boon applies to any test, including challenge rolls. Damage bonus is combat-only |
| 2 | Use without Quick Action once per scene | Frees action economy during challenges where Quick Actions may matter less |
| 3 | Use on self; target also regains HP | Self-targeting useful in solo challenges |

**Status:** Versatile. The +1 boon on any test already works in challenges. No changes needed.

---

#### Born Haggler (Influence)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Sell items at 60% instead of 50% | Downtime/trading specific; relevant to Negotiation template |
| 2 | Re-roll rare item search during downtime | Downtime utility |
| 3 | Sell items at 75% instead of 50% | Improved trading |

**Status:** Narrowly focused on commerce. Could benefit from challenge interaction at higher ranks (see proposals, section 4).

---

#### Insult to Injury (Influence)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Quick Action Distract after hitting | Combat-only |
| 2 | Allies add Influence to damage vs. distracted enemy | Combat-only |
| 3 | Continue distraction when ally deals damage | Combat-only |

**Status:** Combat-only. Not relevant to challenges or social intrigue.

---

#### Leading Presence (Influence)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Allies gain +1 boon on Spirit rolls vs. fear/morale | Applicable to Social Intrigue: resisting intimidation or Pitfall-triggered hostility |
| 2 | Allies gain +1 Resist, +2 damage | Resist bonus helps in contested social actions |
| 3 | Extends to long distance, includes self | Broader coverage |

**Status:** The morale/fear resistance is indirectly useful. The Resist bonus at Rank 2 helps against Investigate actions targeting allies. Moderate challenge relevance.

---

#### Empath (Insight)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Re-roll Insight about emotional state/personality/circumstances | **Directly relevant** to discovering Motivations and Pitfalls in Social Intrigue |
| 2 | Quick Action: predict behavior, gain +1 boon vs. target, impose +1 bane on their rolls | Strong Investigate action enhancement for Social Intrigue |
| 3 | +1 boon on Insight about emotional state | Stacks with Rank 1 re-roll for reliable Motivation/Pitfall discovery |

**Status:** Core Social Intrigue talent. Ranks 1–3 all enhance the Investigate social action. No changes needed.

---

#### Piercing Look (Insight)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Re-roll Insight to detect lies or predict actions | Useful for detecting Deception in Social Intrigue and reading NPC intentions |
| 2 | Quick Action: +1 boon vs. target, +1 bane on their rolls vs. you (short duration) | Strong social leverage — makes all subsequent rolls against that NPC easier |
| 3 | Reset ability when target dies/falls unconscious | Combat-focused reset condition; less relevant to social encounters |

**Status:** Ranks 1–2 are strong Social Intrigue talents. Rank 3 is combat-focused. No changes needed.

---

#### Sense of Deduction (Insight)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Re-roll Insight to investigate events, responsible parties, timing | **Directly relevant** to Research challenges and investigation |
| 2 | Make an assessment; GM confirms true or false (once per scene) | Powerful tool in Research and Tracking challenges — binary information gathering |
| 3 | Re-use assessment until a false one is made | Multiple true/false queries per scene; excellent for complex Research challenges |

**Status:** Core Research/Tracking challenge talent. Exceptionally useful for investigation-type challenges. No changes needed.

---

#### Intuitive Appraisal (Insight)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Estimate item Quality and worth | Useful in Negotiation templates — knowing true value prevents being cheated |
| 2 | Quick Action: appraise creature equipment, gain +1 boon and ignore 1/2 AV | Combat-focused |
| 3 | Determine if item is magical; reduce post-combat equipment damage | Exploration/downtime utility |

**Status:** Rank 1 has indirect Negotiation relevance. Ranks 2–3 are combat/exploration focused.

---

#### Diplomat (Education)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Re-roll Education for cultural etiquette, values, taboos | **Directly relevant** to discovering Pitfalls and understanding Motivations in Social Intrigue |
| 2 | Roll Education vs. Resist for +1 boon on social interactions (or +1 bane on failure); use Education for Demoralize/Distract | **Strong Social Intrigue talent.** The cultural insight roll maps directly to the Investigate social action |
| 3 | +1 boon on Education for cultural knowledge | Reliable Motivation/Pitfall discovery |

**Status:** Core Social Intrigue talent. Rank 2's cultural insight ability is essentially a specialized Investigate action. No changes needed.

---

#### Eloquent Talker (Education)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Use Education instead of Influence in social situations (same language) | **Directly relevant** to Social Intrigue — allows Education-focused characters to participate as primary social actors |
| 2 | Re-roll Education in social situations once per scene | Second chance during Social Intrigue exchanges |
| 3 | Charm a non-hostile creature (Mind + Education vs. Resist) | Can shift NPC disposition, indirectly affecting starting Interest |

**Status:** Strong Social Intrigue talent. Enables Education-based characters (Oracle, Engineer, Summoner) to participate fully. No changes needed.

---

#### General Education (Education)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | No bane for untrained expert skills using Mind | Relevant to challenges requiring secondary skills — removes the untrained penalty |
| 2 | Substitute Education for any Mind-based expert skill once per scene | **Strong challenge talent.** Allows Education to replace any secondary skill in a challenge |
| 3 | +1 boon on Mind + Education rolls | Reliable improvement to all Education-based challenge rolls |

**Status:** Versatile challenge talent. Rank 2's skill substitution is particularly strong in challenges where each character may only use a skill once. No changes needed.

---

#### Commander (Education)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Quick Action: grant ally +1 Movement or +1 boon | The +1 boon applies to any roll, including challenge rolls |
| 2 | Also grant ally +Education damage or heal 2×Education HP | Combat-focused options |
| 3 | Choose two effects (not the same twice) | More flexible but still primarily combat |

**Status:** The +1 boon at Rank 1 works in challenges. Combat-focused at higher ranks.

---

#### Tactician (Education)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Plan before combat: re-roll Initiative, gain boons | Specifically combat-focused preparation |
| 2 | +1 boon on Tactician roll | Combat-focused |
| 3 | Allies gain Education damage or healing once per scene | Combat-focused |

**Status:** Combat preparation only. Could be extended to challenge preparation (see proposals, section 4).

---

#### Roguish Wits (Stealth)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Re-roll Stealth to convince of falsehood or make someone doubt truth | **Directly relevant** to Deception in Social Intrigue |
| 2 | Quick Action: add Stealth to a Defense when targeted | Combat/contested roll defense |
| 3 | Marked as XXX (incomplete) | Opportunity for Social Intrigue expansion |

**Status:** Rank 1 is a core Deception talent for Social Intrigue. Rank 3 is incomplete — opportunity for challenge/social integration.

---

#### Sleight of Hand (Stealth)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Re-roll Stealth for pickpocket, palm, or plant items | Relevant to Deception template (planting false evidence) |
| 2 | Target doesn't notice sleight of hand even on failure | Strong Leverage action in Social Intrigue — planting evidence without detection |
| 3 | Marked as XXX (incomplete) | Opportunity for Social Intrigue expansion |

**Status:** Both ranks support the Stealth secondary skill in Social Intrigue (plant evidence). Rank 3 incomplete.

---

#### Jack of All Trades (Streetwise)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Replace any non-magic skill with Streetwise once per scene | **Strong challenge talent.** In challenges where each skill can only be used once, this provides an extra contribution |
| 2 | After success, continue using Streetwise for that skill for the scene | Extended substitution — useful across multiple challenge steps |
| 3 | After success, substitute for a second different skill | Even more flexible — two skill substitutions per scene |

**Status:** Excellent challenge talent. The skill-once restriction in challenges makes this particularly valuable. No changes needed.

---

#### I Know A Guy (Streetwise)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Find contacts in previously caroused settlements | Supports Leverage social action and provides secondary skill justification for Streetwise in Social Intrigue |
| 2 | Marked as XXX (incomplete) | Opportunity for Social Intrigue expansion |
| 3 | Marked as XXX (incomplete) | Opportunity for Social Intrigue expansion |

**Status:** Rank 1 provides narrative support for Social Intrigue. Ranks 2–3 are incomplete — prime opportunity for challenge/social integration.

---

#### Thug Tactics (Streetwise)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | +1 boon when outnumbering enemies in melee | Combat-only |
| 2 | Allies also gain the bonus | Combat-only |
| 3 | Outnumbered enemies suffer +1 bane | Combat-only |

**Status:** Combat-only. Not relevant to challenges or social intrigue.

---

#### Danger Sense (Perception)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Re-roll Initiative | Applicable when a challenge transitions to combat (Chase → Ambush, Escape → Caught) |
| 2 | Add Perception to Resist vs. surprise and traps | Relevant to Escape and Exploration challenge consequences |
| 3 | Allies share surprise resistance; minimum Initiative of 8 | Extends protection to the group during challenge complications |

**Status:** Relevant to challenge consequences involving surprise or traps. Moderate relevance.

---

#### Eagle Eye (Perception)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Spot as Quick Action; re-roll Perception for hidden things | Useful in Tracking and Exploration challenges |
| 2 | Ignore cover penalties at range | Combat-focused |
| 3 | No banes for perceiving details at far distances | Useful in Exploration and Tracking challenges — spotting landmarks, trails |

**Status:** Ranks 1 and 3 are useful in Exploration and Tracking challenges. Moderate relevance.

---

#### Relentless Tracker (Survival)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Re-roll Survival for tracking | **Directly relevant** to Tracking challenge template |
| 2 | Marked as XXX (incomplete) | Opportunity for Tracking challenge expansion |
| 3 | Marked as XXX (incomplete) | Opportunity for Tracking challenge expansion |

**Status:** Rank 1 is a core Tracking challenge talent. Ranks 2–3 are incomplete — prime opportunity for challenge integration.

---

#### Consult the Myths (Lore)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Re-roll Lore about magical/supernatural places or creatures | Relevant to Research challenges involving supernatural topics |
| 2 | +1 boon on Lore about magical/supernatural topics | Reliable Research challenge improvement |
| 3 | Chant to daze supernatural creatures | Combat-focused |

**Status:** Ranks 1–2 support Research challenges. Rank 3 is combat-focused.

---

#### Linguist (Education)

| Rank | Challenge/Social Interaction | Notes |
|------|------------------------------|-------|
| 1 | Learn a language; communicate simple ideas across language barriers | Enables Social Intrigue with foreign NPCs |
| 2 | Learn another language; decipher written symbols | Supports Research challenges involving ancient texts |
| 3 | Learn another language; +1 boon on cross-language communication | Reliable cross-cultural communication |

**Status:** Ranks 1–3 all support Social Intrigue (communication) and Research challenges (deciphering). No changes needed.

---

### Talents with Indirect Challenge/Social Interactions

| Talent | Skill | Challenge/Social Relevance |
|--------|-------|---------------------------|
| **Athletic Movement** | Athletics | Chase/Escape challenges (climbing, swimming, jumping) |
| **Fast Stride** | Athletics | Chase challenges (movement advantage) |
| **Escape Artist** | Athletics | Escape challenges (break free from grapple/restraint) |
| **Explorer of Nature** | Survival | Exploration challenges (environment-specific re-rolls) |
| **Wilderness Expert** | Survival | Exploration challenges (camp establishment, rations) |
| **Trap Maker** | Survival | Escape challenges (laying traps during escape) |
| **Beast Lore** | Nature | Tracking challenges (animal behavior knowledge) |
| **Field Medic** | Nature | Challenge consequence mitigation (treat injuries) |
| **Identify Artifact** | Lore | Research challenges (magical item identification) |
| **Magical Sense** | Lore | Research challenges (detect magical sources) |
| **Devious Tactics** | Stealth | Social Intrigue (Distract as Quick Action) |
| **Leading the Way** | Stealth | Escape challenges (group stealth) |
| **Artisan** | Crafting | Research challenges (re-roll Crafting for analysis) |
| **Quick Construction** | Crafting | Escape challenges (improvise tools) |
| **Strong Mind** | Fortitude | Social Intrigue (resist mental influence, re-roll vs. charm/fear) |
| **Explorer's Tenacity** | Fortitude | Exploration challenges (environmental resistance) |
| **Channel Superstition** | Lore | Social Intrigue (Demoralize as social pressure) |
| **Divine Scholar** | Lore | Research challenges (mystic knowledge access) |

---

## 3. Gap Analysis

### Skills Lacking Challenge/Social Talent Coverage

| Skill | Challenge Templates Served | Social Intrigue Role | Current Gap |
|-------|---------------------------|---------------------|-------------|
| **Influence** | Social Intrigue (primary) | Primary | Lacks talents that directly interact with Interest/Patience mechanics |
| **Insight** | Social Intrigue (primary), Research | Primary (Investigate action) | Only 4 talents total; no talent for Motivation/Pitfall discovery beyond general re-rolls |
| **Perception** | Chase, Tracking, Exploration, Social (secondary) | Secondary (read the room) | No challenge-specific talents; all are combat or general awareness |
| **Streetwise** | Chase (urban), Social (secondary) | Secondary (leverage contacts) | Only 4 talents; 2 incomplete (I Know A Guy, Swashbuckler is combat); no urban challenge talents |
| **Survival** | Tracking (primary), Exploration (primary) | Not applicable | Relentless Tracker Ranks 2–3 incomplete; no Exploration-specific talents |
| **Education** | Research (primary), Social (primary) | Primary (etiquette, law) | Well-covered by existing talents but no challenge-specific mechanics |
| **Lore** | Research (primary), Social (secondary) | Secondary (cultural precedent) | Focused on combat (Mage Hunter, Channel Superstition) and magical identification; limited social/research challenge support |

### Missing Talent Interactions

| Interaction Type | Description | Skills Affected |
|-----------------|-------------|----------------|
| **Challenge die manipulation** | No talent directly reduces the challenge die beyond normal success levels | All skills |
| **Consequence mitigation** | No talent reduces the severity of challenge failure consequences | All skills |
| **Interest manipulation** | No talent directly interacts with the Social Intrigue Interest mechanic | Influence, Insight, Education |
| **Patience management** | No talent delays or manages the Patience timer | Influence, Insight |
| **Motivation/Pitfall discovery** | No talent specifically enhances Motivation/Pitfall discovery beyond general Insight re-rolls | Insight, Education, Lore, Perception |
| **Multi-challenge contribution** | No talent allows a character to contribute to compound challenges more effectively | Education, Influence |
| **Skill flexibility in challenges** | Only Jack of All Trades and General Education address the skill-once restriction | Most skills |

### Archetype Coverage Gaps

| Archetype | Challenge/Social Role | Missing Talent Support |
|-----------|----------------------|----------------------|
| **Bard** | Social Intrigue face, challenge support through performance | No performance-based Social Intrigue talents (Performer is placeholder) |
| **Oracle** | Research/Social through prophecy and foresight | No prophecy or foresight talents for challenges (Foresight is placeholder) |
| **Rogue** | Escape/Chase specialist, Social Intrigue deceiver | Roguish Wits Rank 3 and Sleight of Hand Rank 3 are incomplete |
| **Warlord** | Social Intrigue commander, challenge coordinator | No talent for coordinating allies during challenges |
| **Diplomat/Courtier** | Social Intrigue primary actor | Diplomat talent exists but doesn't interact with Interest/Patience directly |
| **Investigator** | Research challenge specialist | Sense of Deduction is strong but alone; no Research-specific advancement |
| **Scout** | Chase/Tracking/Exploration specialist | Relentless Tracker Ranks 2–3 incomplete; Perception lacks challenge talents |

---

## 4. Proposed Talent Additions and Updates

### 4.1 New Talents

#### Keen Observer (Perception) — NEW

*Supports: All challenge types, Social Intrigue (secondary). Archetypes: Ranger, Rogue, Oracle, Engineer.*

| Rank | Effect |
|------|--------|
| 1 | When you roll Perception during a challenge, you can re-roll the test once per scene. |
| 2 | When you succeed on a Perception roll during a challenge, you also learn one useful detail about the challenge's current state (GM's choice: remaining obstacles, hidden advantage, consequence that can be avoided). |
| 3 | When you roll a critical success on a Perception roll during a challenge, choose one: the challenge die decreases by an additional 1, or you negate one pending consequence. |

**Design Notes:** Fills the gap of Perception having no challenge-specific talents. Rank 2 provides the "information advantage" that Perception thematically represents. Rank 3 gives a meaningful critical success payoff without being overpowered — it either accelerates progress or mitigates a consequence, not both. Aligns with the Perception themes of awareness, vigilance, and detection.

---

#### Silver Tongue (Influence) — NEW

*Supports: Social Intrigue (primary). Archetypes: Bard, Priest, Warlord, Champion.*

| Rank | Effect |
|------|--------|
| 1 | When you succeed on an Influence roll during a Social Intrigue, you can choose to also delay the Patience die by 1 (it ticks up by 1, extending the conversation). You can use this ability once per scene. |
| 2 | When you successfully appeal to an NPC's Motivation during a Social Intrigue, you gain +1 boon on your next social roll in the same intrigue. |
| 3 | When the NPC's Interest would drop below 0 from one of your actions or rolls during a Social Intrigue, you can prevent the drop once per scene. The Interest remains at its current value instead. |

**Design Notes:** Directly interacts with the two core Social Intrigue resources — Patience and Interest. Rank 1 gives skilled negotiators more room to work. Rank 2 rewards players who invest effort in discovering and leveraging Motivations. Rank 3 prevents breakdown from a single bad roll, which is critical in high-stakes negotiations. Aligns with Influence themes of persuasion, charm, and authority.

---

#### Read the Room (Insight) — NEW

*Supports: Social Intrigue (primary). Archetypes: Oracle, Shaman, Rogue, Apothecary.*

| Rank | Effect |
|------|--------|
| 1 | When you use the Investigate action during a Social Intrigue to discover a Motivation or Pitfall, you gain +1 boon on the roll. |
| 2 | When you successfully discover a Motivation or Pitfall through an Investigate action, you also learn one additional piece of information about the NPC: their current Interest level (exact value), their remaining Patience (exact value), or whether they have additional undiscovered Motivations or Pitfalls. |
| 3 | When you discover a Pitfall through any means during a Social Intrigue, you can immediately warn your allies. For the rest of the scene, if any ally would trigger that Pitfall, you can use a Quick Action to prevent the Interest loss (but not the Patience tick). You can use this ability once per Pitfall discovered. |

**Design Notes:** Fills the critical gap of no talent specifically enhancing the Investigate social action. Rank 1 makes the Insight specialist more reliable at their core Social Intrigue role. Rank 2 provides meta-information that helps the party strategize — knowing exact Interest or Patience values is powerful but requires spending an exchange to discover. Rank 3 creates team synergy by protecting allies from social landmines. Aligns with Insight themes of empathy, intuition, and analysis.

---

#### Dogged Pursuit (Survival) — NEW

*Supports: Tracking, Chase challenges (primary). Archetypes: Ranger, Barbarian, Tamer.*

| Rank | Effect |
|------|--------|
| 1 | When you fail a Survival roll during a Tracking or Chase challenge, the challenge die doesn't increase from your failure (other consequences still apply). You can use this ability once per scene. |
| 2 | During a Tracking or Chase challenge, you can use a skill you have already used earlier in the challenge a second time. You can use this ability once per challenge. |
| 3 | When you succeed on a Survival roll during a Tracking or Chase challenge, you can choose to also impose +1 bane on the quarry's next roll to evade or escape (if applicable). |

**Design Notes:** Addresses the incomplete Relentless Tracker and the lack of Tracking/Chase challenge support. Rank 1 prevents the worst consequence of failure in tracking challenges (increased challenge die). Rank 2 directly interacts with the skill-once restriction, which is the primary limitation in challenges. Rank 3 provides offensive pressure against actively evasive quarries. Aligns with Survival themes of tracking and hunting.

---

#### Streetwise Informant (Streetwise) — NEW

*Supports: Social Intrigue (secondary), Chase (urban), Research challenges. Archetypes: Rogue, Brawler.*

| Rank | Effect |
|------|--------|
| 1 | When you roll Streetwise during a challenge set in an urban environment (Chase, Escape, Research, Social Intrigue), you can re-roll the test once per scene. |
| 2 | Before a Social Intrigue begins, if you are in a settlement you have previously visited, you can roll Spirit + Streetwise (TN based on NPC's prominence: TN 8 for common, TN 10 for notable, TN 12 for powerful). On a success, the GM reveals one Motivation or Pitfall of the target NPC. |
| 3 | During an urban challenge, when you succeed on a Streetwise roll, you can choose to also reduce the challenge die by an additional 1 once per scene. This represents calling in a contact, knowing a shortcut, or leveraging local knowledge. |

**Design Notes:** Fills the critical gap in Streetwise (only 4 talents, 2 with incomplete ranks). Rank 1 provides the standard re-roll for urban challenges. Rank 2 is a pre-scene intelligence gathering ability that directly feeds into the Social Intrigue system — discovering a Motivation or Pitfall before the scene starts is powerful but limited by the prerequisite of prior settlement visits. Rank 3 gives a once-per-scene challenge acceleration that rewards urban specialists. Aligns with Streetwise themes of urban survival, networking, and underworld knowledge.

---

#### Methodical Research (Education) — NEW

*Supports: Research challenges (primary). Archetypes: Oracle, Sorcerer, Summoner, Engineer.*

| Rank | Effect |
|------|--------|
| 1 | When you fail an Education or Lore roll during a Research challenge, you still learn one minor piece of information related to the subject (GM provides a useful but incomplete clue). |
| 2 | When you succeed on an Education roll during a Research challenge, you can choose to also negate one pending consequence from a previous failure in the same challenge. |
| 3 | During a Research challenge, you can use your Action to assist any ally making a roll. When you do so, they gain +1 boon and add your Education to their skill rank for this roll only. You can use this ability once per challenge. |

**Design Notes:** Addresses the gap of no Research-specific challenge talent. Rank 1 ensures that Research failures aren't total dead ends — the character always learns something, which maintains engagement. Rank 2 provides consequence mitigation, which is a new talent interaction type. Rank 3 creates a powerful team support ability for complex Research challenges, letting the scholar boost any ally's contribution. Aligns with Education themes of scholarship, research, and teaching.

---

### 4.2 Proposed Updates to Existing Incomplete Talents

#### Relentless Tracker (Survival) — COMPLETION

Current Ranks 2–3 are marked XXX.

| Rank | Proposed Effect |
|------|-----------------|
| 2 | When you succeed on a Survival roll to follow tracks, you also learn one additional detail about the quarry: approximate distance, number of creatures, speed of travel, or time since the tracks were made (GM's choice based on Success Level). |
| 3 | When you roll Survival to follow tracks, you gain +1 boon on the roll. Once per scene, when you would lose the trail entirely during a Tracking challenge, you can spend a delving turn to re-examine the area and automatically find the trail again (the challenge die doesn't increase from this). |

**Design Notes:** Rank 2 provides increasing information payoff that directly supports Tracking challenges — the more the tracker succeeds, the more they know. Rank 3 provides reliability (+1 boon) and a safety net against trail loss, which is a common Tracking challenge consequence.

---

#### I Know A Guy (Streetwise) — COMPLETION

Current Ranks 2–3 are marked XXX.

| Rank | Proposed Effect |
|------|-----------------|
| 2 | When you use your I Know A Guy ability, you can also ask your contact for information about a specific person, faction, or topic. The GM provides information based on the contact's knowledge and the Success Level of your original roll (weak: rumor or partial info, strong: reliable info, critical: detailed insider knowledge). |
| 3 | Once per adventure, you can declare that you have a contact in any settlement you haven't previously visited. Roll Spirit + Streetwise as normal for I Know A Guy, but the contact is less reliable (treat the Success Level as one step lower, minimum weak success). |

**Design Notes:** Rank 2 transforms I Know A Guy from a pure commerce talent into an intelligence-gathering tool, directly supporting Research challenges and Social Intrigue preparation. Rank 3 extends the network to new locations, supporting the social and exploration pillar of the game. Both ranks support the Rogue and Brawler archetypes.

---

#### Roguish Wits (Stealth) — COMPLETION

Current Rank 3 is marked XXX.

| Rank | Proposed Effect |
|------|-----------------|
| 3 | When you succeed on a Stealth roll to convince someone of a falsehood during a Social Intrigue, the NPC's Patience die doesn't tick for that exchange. Your deception was so smooth that the NPC doesn't feel like time was spent. You can use this ability once per scene. |

**Design Notes:** Rank 3 directly interacts with the Patience mechanic, which is unique among talents. It rewards the Rogue/Swashbuckler archetype for successful deception by preserving the party's most limited resource in Social Intrigue — time.

---

#### Sleight of Hand (Stealth) — COMPLETION

Current Rank 3 is marked XXX.

| Rank | Proposed Effect |
|------|-----------------|
| 3 | When you successfully plant false evidence or steal a document during a Social Intrigue or challenge, the planted evidence or stolen document provides a tangible advantage: +1 boon on the next Leverage or Deceive action in the same scene, or the stolen document reveals one Motivation or Pitfall. |

**Design Notes:** Rank 3 connects Sleight of Hand directly to Social Intrigue outcomes. Planted evidence becomes mechanically meaningful (+1 boon on leverage), and stolen documents feed into the Motivation/Pitfall system. Supports the Rogue archetype's role as a social saboteur.

---

### 4.3 Existing Talent Interaction Notes

The following existing talents require no mechanical changes but should be noted for their interaction with the Challenge and Social Intrigue systems in the rules documentation or GM guidance.

| Talent | Skill | Challenge/Social Interaction Note |
|--------|-------|----------------------------------|
| **Fast Talking** | Influence | Re-roll on failed Influence applies to Social Intrigue exchanges. Rank 2 Assist is enhanced Social Intrigue support. |
| **Inspire Ally** | Influence | +1 boon on any test includes challenge rolls. Useful for boosting an ally's key challenge roll. |
| **Empath** | Insight | Re-roll and +1 boon directly enhance the Investigate social action for discovering Motivations/Pitfalls. |
| **Piercing Look** | Insight | Ranks 1–2 provide +1 boon/+1 bane effects that enhance Social Intrigue exchanges against a specific NPC. |
| **Sense of Deduction** | Insight | True/false assessment is powerful in Research challenges. Multiple assessments at Rank 3 accelerate investigation. |
| **Diplomat** | Education | Cultural insight directly maps to discovering Motivations and Pitfalls. Rank 2 is a specialized Investigate action. |
| **Eloquent Talker** | Education | Skill substitution allows Education-focused characters to be primary Social Intrigue actors. |
| **General Education** | Education | Rank 2's skill substitution is valuable in challenges where each skill can only be used once. |
| **Jack of All Trades** | Streetwise | Skill substitution is especially valuable under the challenge skill-once restriction. |
| **Roguish Wits** | Stealth | Re-roll on falsehoods directly supports the Deceive social action. |
| **Strong Mind** | Fortitude | Re-roll and immunity vs. charm/fear helps resist Social Intrigue pressure and Pitfall-triggered hostility. |
| **Linguist** | Education | Language skills enable Social Intrigue with foreign NPCs and support Research (deciphering texts). |
| **Channel Superstition** | Lore | Demoralize effects apply pressure in Social Intrigue when intimidation is appropriate. |

---

## 5. Implementation Priority

### Phase 1: Complete Incomplete Talents (4 talents)

These address existing gaps with minimal new content:

1. **Relentless Tracker** Ranks 2–3 (Survival) — Tracking challenge support
2. **I Know A Guy** Ranks 2–3 (Streetwise) — Social Intrigue intelligence and networking
3. **Roguish Wits** Rank 3 (Stealth) — Social Intrigue Patience interaction
4. **Sleight of Hand** Rank 3 (Stealth) — Social Intrigue evidence planting

### Phase 2: New Challenge/Social Talents (5 talents)

These add new talent options to under-served skills:

1. **Silver Tongue** (Influence) — Interest/Patience manipulation
2. **Read the Room** (Insight) — Investigate action enhancement and Pitfall warning
3. **Keen Observer** (Perception) — Challenge awareness and critical success payoff
4. **Streetwise Informant** (Streetwise) — Urban challenges and pre-scene intelligence
5. **Dogged Pursuit** (Survival) — Tracking/Chase challenge specialist

### Phase 3: Research/Education Support (1 talent)

1. **Methodical Research** (Education) — Research challenge specialist

### Impact Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Talents with direct challenge interaction | 5 | 14 | +9 |
| Talents with direct Social Intrigue interaction | 8 | 15 | +7 |
| Incomplete talent ranks completed | 0 | 7 | +7 |
| Skills with challenge-specific talents | 4 | 9 | +5 |
| Archetype coverage for social/challenge roles | Partial | Comprehensive | Significant improvement |

---

## 6. Archetype Support Matrix

Shows how proposed and existing talents support each archetype's challenge and social intrigue roles.

| Archetype | Challenge Role | Social Role | Key Talents (Existing + Proposed) |
|-----------|---------------|-------------|----------------------------------|
| **Bard** | Research (support) | Social Intrigue (face) | Fast Talking, Inspire Ally, **Silver Tongue**, Performer (placeholder) |
| **Oracle** | Research (primary) | Social Intrigue (investigator) | Sense of Deduction, Empath, **Read the Room**, **Methodical Research** |
| **Ranger** | Tracking/Chase (primary), Exploration | — | Relentless Tracker (completed), **Dogged Pursuit**, **Keen Observer**, Eagle Eye |
| **Rogue** | Escape/Chase (primary) | Social Intrigue (deceiver) | Roguish Wits (completed), Sleight of Hand (completed), Jack of All Trades, **Streetwise Informant** |
| **Warlord** | Chase/Exploration (coordinator) | Social Intrigue (commander) | Commander, **Silver Tongue**, Leading Presence |
| **Priest** | Research (divine) | Social Intrigue (authority) | Diplomat, Eloquent Talker, **Silver Tongue** |
| **Sorcerer** | Research (arcane) | — | General Education, **Methodical Research**, Consult the Myths |
| **Barbarian** | Chase (primary), Exploration | — | Explorer of Nature, **Dogged Pursuit**, Explorer's Tenacity |
| **Engineer** | Escape (tools), Research (tech) | — | Quick Construction, **Keen Observer**, **Methodical Research** |
| **Brawler** | Chase (urban) | Social Intrigue (leverage) | Thug Tactics, **Streetwise Informant**, Jack of All Trades |
| **Champion** | — | Social Intrigue (authority) | Leading Presence, **Silver Tongue**, Diplomat |
| **Shaman** | Research (spiritual) | Social Intrigue (reader) | Empath, **Read the Room**, Consult the Myths |
| **Druid** | Tracking/Exploration | — | Beast Lore, Explorer of Nature, **Keen Observer** |
| **Swashbuckler** | Chase/Escape | Social Intrigue (deceiver) | Roguish Wits (completed), Escape Artist, Jack of All Trades |

---

## 7. Design Principles Applied

All proposed talents follow the established design guidelines:

✅ **Clear triggers, effects, and limits** — Every talent specifies when, how often, and under what conditions it applies  
✅ **Skill-internal diversity** — New talents add utility and social options to skills that previously had only combat talents  
✅ **Create synergies** — Read the Room + Empath (intra-skill), Silver Tongue + Diplomat (inter-skill), Read the Room Rank 3 (team synergy)  
✅ **Bounded power** — No talent guarantees success; all provide advantage or mitigation, not automatic wins  
✅ **Defined bonus types** — Boons and re-rolls are used consistently; no undefined bonus stacking  
✅ **Fit skill themes** — Each talent aligns with its skill's thematic pillars (Insight = empathy/analysis, Survival = tracking/hunting, etc.)  
✅ **Rank progression** — Unlock (Rank 1) → Payoff (Rank 2) → Mastery (Rank 3) pattern maintained  
✅ **Challenge-specific mechanics** — Talents interact with challenge die, Patience, Interest, consequences, and the skill-once restriction

---

**End of Analysis**
