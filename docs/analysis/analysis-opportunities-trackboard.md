# Analysis Opportunities Trackboard

This document catalogs game systems and concepts that do **not** yet have a dedicated analysis report in `docs/analysis/`. Each entry describes the gap, its relevance, and what a future analysis should explore. No actual analysis is performed here — this is a planning and prioritization tool for follow-up work.

---

## Existing Coverage Summary

The following systems already have dedicated analysis reports:

| System | Report |
|--------|--------|
| Core dice mechanics & balance | `dice-mechanics-balance-analysis.md` |
| Combat arts design | `combat-arts-design-analysis.md` |
| Multi-hit damage interactions | `multi-hit-damage-interaction-analysis.md` |
| Special materials | `materials-mechanical-effects-analysis.md` |
| Alchemy & crafting system | `alchemy-crafting-system.md` |
| Exploration crawl system | `exploration-crawl-system.md` |
| Ability tags | `ability-tags.md` |
| Downtime system | `downtime-system-analysis.md` |
| Enchantments & magic items | `enchantments-magic-items-analysis.md` |
| Creature creation & encounter building | `creature-creation-encounter-building-analysis.md` |
| Non-magical equipment | `equipment/non-magical-equipment-analysis.md` |
| Talent system (general) | `talents/TALENT_SYSTEM_ANALYSIS.md` |
| Talent–travel integration | `talents/TRAVEL_TALENT_INTEGRATION.md` |
| Talent–challenge & social intrigue integration | `talents/CHALLENGE_SOCIAL_INTRIGUE_TALENT_INTEGRATION.md` |
| Spell system (overview + all 14 schools) | `spells/SPELL_SYSTEM_ANALYSIS.md`, `spells/schools/*.md` |
| Folk naming conventions (12 folk) | `names/*.md` |
| Folk traits & ancestry balance | `folk-traits-ancestry-balance-analysis.md` |

---

## Proposed Analysis Opportunities

### 2. Character Progression & XP Economy

**Relevant Rules:** `docs/01-basic-rules/04-character-progression.md`, `docs/03-statistics/05-skills.md`

**Rationale:** The XP system determines how quickly characters grow and what investments feel rewarding. Skill rank costs increase sharply (2/6/12/18/24 XP), and character levels gate skill rank caps. No analysis examines the feel and pacing of this progression curve, or whether the XP economy creates dead zones or bottlenecks.

**Questions to Explore:**
- At the standard rate of 1–2 XP per session, how many sessions does it take to reach key milestones (Rank 3, Rank 5, Level 5, Level 10)?
- Are there XP investment traps where generalists or specialists are penalized?
- Does the increasing cost per skill rank create a smooth progression feel, or are there sharp difficulty spikes?
- How does the talent point gain rate (1 per 2 XP spent) affect build diversity?
- Does the level-gated skill rank cap create meaningful pacing, or frustrating delays?

---

### 3. Conditions System Balance

**Relevant Rules:** `docs/05-combat/04-conditions.md`

**Rationale:** 25 named conditions exist (bleeding, blinded, burning, charmed, confused, dazed, deafened, deprived, distracted, frightened, grappled, hidden, marked, paralyzed, poisoned, prone, pushed, restrained, silenced, slowed, staggered, stunned, suffocating, unconscious) with varying severity and duration. No analysis evaluates overlap, relative power, or whether any conditions are under-used or over-represented in talents, spells, and creature abilities.

**Questions to Explore:**
- Which conditions are mechanically severe (action denial, defense reduction) vs. minor nuisances?
- Are there conditions that overlap significantly and could be consolidated?
- Which conditions appear most/least frequently across spells, combat arts, and creature abilities?
- Are there gaps — tactical effects that the game wants to support but lacks a named condition for?
- How does condition duration (briefly, short, medium) affect balance between conditions of different severity?
- Do condition immunity sets for creature types (undead, automaton, spirit) make thematic and mechanical sense?

---

### 4. Combat Scene Core Mechanics

**Relevant Rules:** `docs/05-combat/01-combat-scenes.md`, `docs/05-combat/02-attacking.md`, `docs/05-combat/03-distances-movement.md`

**Rationale:** While combat arts and multi-hit damage have been analyzed, the foundational combat framework — initiative, action economy, turn structure, surprise, movement, and engagement rules — has not been reviewed as a system. These mechanics define the tactical feel of every encounter.

**Questions to Explore:**
- Does the initiative system (Agility/Spirit + Perception) create meaningful variation, or do the same characters always act first?
- Is the action economy (Action + Quick Action + Movement) sufficient for tactical depth without being overwhelming?
- Does the surprise mechanic create satisfying ambush scenarios, or is it too binary?
- How well do distance categories (melee, close, short, medium, long) support diverse combat positioning?
- Are there edge cases in engagement, opportunity attacks, or movement that create confusion or exploits?
- How does action economy compare between martial characters, spellcasters, and hybrid builds?

---

### 5. Defense & Damage Curve Scaling

**Relevant Rules:** `docs/03-statistics/02-hit-points-wounds.md`, `docs/03-statistics/03-defenses.md`, `docs/04-equipment/04-armor.md`

**Rationale:** The dice mechanics analysis covers resolution probabilities, but no analysis examines how Parry, Dodge, and Resist scale relative to enemy attack bonuses, how HP growth compares to damage output at different tiers, or whether the armor value system creates satisfying protection trade-offs. This is critical for ensuring the game remains lethal without being frustrating.

**Questions to Explore:**
- How does the Parry/Dodge/Resist progression compare to attack bonus progression across character levels?
- At what point (if any) do defenses outpace attacks, or vice versa, creating imbalances?
- Does the HP curve (base 12 + STR + 2/level, max 50) match the damage output of appropriately-tiered creatures and enemies?
- How effective is the AV system at reducing damage across light, medium, and heavy armor tiers?
- Is there a meaningful trade-off between high Parry (Fighting investment) and high Dodge (Agility investment)?
- Does the defense cap of 16 create interesting ceiling effects or frustrating limitations?

---

### 6. Weapon Category Balance

**Relevant Rules:** `docs/04-equipment/03-weapons.md`, `docs/04-equipment/05-armor-weapon-properties.md`, `docs/04-equipment/06-exotic-weapons.md`

**Rationale:** Weapons span multiple categories (Axe, Blade, Bow, Brawling, Crossbow, Mace, Polearm, Shield, Thrown, Exotic) with diverse properties (agile, crush, pierce, slash, reach, light, heavy, etc.). No analysis evaluates whether all categories are competitively viable or whether certain property combinations dominate. The combat arts analysis noted that shield and ranged weapons are under-served, but weapon balance itself is unexplored.

**Questions to Explore:**
- Are all weapon categories viable choices, or do some consistently outperform others?
- Do weapon properties (crush, pierce, slash) create meaningful tactical decisions, or is one property clearly superior?
- How do exotic weapons compare to standard weapons — are they worth the investment?
- Does the versatile property provide an appropriate trade-off between one-handed and two-handed use?
- Are there weapon + shield combinations that are significantly stronger than two-handed or dual-wield setups?
- How well does weapon category diversity support the archetype system (e.g., does a Hoplite with spear/shield feel distinct from a Duelist with a blade)?

---

### 7. Armor System Balance

**Relevant Rules:** `docs/04-equipment/04-armor.md`, `docs/04-equipment/05-armor-weapon-properties.md`

**Rationale:** The armor system uses AV tiers (light 2–3, medium 4–5, heavy 6+) with load penalties, rigidity, and durability. No analysis examines whether light armor is ever preferable to heavy armor, whether the load/rigid penalties are proportional to the protection gained, or how armor interacts with the defense cap.

**Questions to Explore:**
- Is the protection-to-penalty ratio balanced across armor tiers (light vs. medium vs. heavy)?
- At what damage thresholds does heavy armor become clearly superior, and is this appropriate for the setting?
- Do load and rigid penalties meaningfully constrain heavy armor users, or are they trivially overcome?
- How does the helmet/shield slot system interact with armor to affect total defensive value?
- Is the durability system (armor damage on critical hits) a satisfying mechanic or a bookkeeping burden?
- How do magic armor bonuses (Q4–Q8) affect the armor balance curve at higher tiers?

---

### 8. Challenge System Mechanics

**Relevant Rules:** `docs/06-scenes/07-challenges/00-overview.md`

**Rationale:** The challenge system is a core mechanic for resolving multi-step non-combat situations (chases, research, tracking, complex tasks) using challenge dice and difficulty scaling. While talent integration with challenges has been analyzed, the challenge system itself has not been reviewed for pacing, balance, or design space.

**Questions to Explore:**
- Does the challenge die size (d4–d12) create appropriate pacing for different scenario lengths?
- Are difficulty levels well-calibrated for party sizes and skill levels?
- Do complications and setbacks create meaningful tension, or do they feel arbitrary?
- How does the challenge system handle mixed-skill parties where only some characters can contribute?
- Are there gaps in challenge types — situations the system should support but doesn't have guidance for?
- How well does the system scale from low-level to high-level characters?

---

### 9. Social Intrigue System Mechanics

**Relevant Rules:** `docs/06-scenes/07-challenges/01-social-intrigue.md`

**Rationale:** Social intrigue uses NPC interest, patience, motivations, and pitfalls to create multi-turn negotiation encounters. While talent integration has been analyzed, the core social intrigue mechanics have not been reviewed for depth, player agency, or edge cases. This system is critical for non-combat gameplay.

**Questions to Explore:**
- Does the interest/patience framework create engaging pacing for social encounters?
- Are there enough approach options to make social encounters tactically interesting for different character builds?
- How does the system handle multi-NPC negotiations or group social encounters?
- Are pitfall mechanics satisfying (do they feel like consequences of player choices, or random punishment)?
- Does disposition tracking (friendly/indifferent/hostile) interact meaningfully with the interest/patience framework?
- How well does the system support different social scenarios (trade negotiations, political intrigue, interrogation, diplomacy)?

---

### 10. Travel System Mechanics

**Relevant Rules:** `docs/06-scenes/07-challenges/02-travel.md`

**Rationale:** The travel system handles multi-day overland journeys with roles (Navigator, Scout, Quartermaster, etc.), daily procedures, checkpoints, and events. While talent integration has been analyzed, the travel system mechanics themselves have not been reviewed for pacing, role balance, or event variety.

**Questions to Explore:**
- Are travel roles balanced in terms of player engagement and mechanical impact?
- Does the daily procedure create satisfying decision-making, or is it repetitive over long journeys?
- How well does the checkpoint system pace multi-day travel for narrative purposes?
- Are travel events varied enough to sustain interest across extended overland sequences?
- Does the supply management system create meaningful resource tension without excessive bookkeeping?
- How does terrain difficulty interact with travel pacing and role effectiveness?

---

### 11. Metamagic Arts Balance

**Relevant Rules:** `docs/07-magic/03-metamagic-arts.md`

**Rationale:** The 11 metamagic arts (Autonomous, Condensed, Elemental, Empowered, Far Reaching, Forked, Prolonged, Searing, Shaped, Silent, Quickened, Widened) allow spellcasters to modify their spells at increased Focus cost. No analysis evaluates whether these options are balanced relative to each other, whether some are clearly dominant, or how they interact with the spell rank and Focus economy.

**Questions to Explore:**
- Are all metamagic arts competitively viable, or are some clearly superior (e.g., Empowered always better than Searing)?
- Does the Focus cost scaling for metamagic create meaningful trade-offs?
- Which metamagic arts see the most theoretical use, and which are rarely worth the investment?
- How do metamagic arts interact with the spell system's existing scaling (rank, spell power, AoE rules)?
- Are there missing metamagic concepts that would expand tactical options for casters?
- Do metamagic arts create balance concerns when combined with specific spells (e.g., Widened + high-rank AoE)?

---

### 12. Skill Utility & Overlap Analysis

**Relevant Rules:** `docs/03-statistics/05-skills.md`, `docs/03-statistics/06-talents/`

**Rationale:** The game has 17 skills split into general (6) and expert (11) categories. While the talent system analysis audited individual talents, no analysis compares the skills themselves for relative power, breadth of utility, or overlap. Some skills may be "must-haves" while others rarely see meaningful use.

**Questions to Explore:**
- Which skills provide the broadest mechanical utility across combat, social, exploration, and downtime?
- Are there skills that overlap significantly (e.g., Insight vs. Perception, Education vs. Lore)?
- Do general skills feel appropriately broader than expert skills, given that expert skills impose untrained penalties?
- Is the untrained penalty (+1 bane for expert skills) sufficient to encourage skill investment without punishing generalists?
- Which skills are critical for character survival (combat relevance) vs. purely flavor/utility?
- Are there game modes (travel, downtime, social intrigue) where certain skills are disproportionately useful?

---

### 13. Mount & Companion System

**Relevant Rules:** `docs/08-creatures/01-mounts-companions/`

**Rationale:** The mount and companion system includes mount types (donkey, horse, camel, etc.), companion traits, mount equipment (saddles, barding), and feeding/care mechanics. No analysis evaluates whether mounted combat is balanced, whether companion scaling creates issues, or whether the system is deep enough to support the Tamer and Ranger archetypes.

**Questions to Explore:**
- Is mounted combat mechanically rewarding, or does it create awkward edge cases with the distance/engagement system?
- Do mount types feel meaningfully distinct in terms of stats, speed, and utility?
- How well do companion traits and scaling support the Tamer and Ranger archetypes through mid-to-high levels?
- Is mount equipment (barding, saddles) impactful enough to create meaningful investment decisions?
- Does the feeding/care system add interesting resource management, or is it bookkeeping without payoff?
- Are there gaps in mount/companion content for specific archetypes or playstyles?

---

### 14. Upbringing & Background Balance

**Relevant Rules:** `docs/02-adventurers/03-upbringing.md`, `docs/02-adventurers/04-background.md`

**Rationale:** The upbringing system provides 23 options (Agricultural, Apprenticed, Bardic, Clan member, Criminal, Cult, Cursed, Hunter-gatherer, Isolated, Mercantile, Militaristic, Monastic, Noble, Nomadic, Orphan, Peasant, Scholar, Seafaring, Servitude, Shamanistic, Slums) that affect starting attributes, skills, and narrative hooks. No analysis evaluates the mechanical balance between upbringing options or whether any provide significantly stronger starting positions.

**Questions to Explore:**
- Do all upbringing options provide roughly equivalent mechanical benefits (attribute bonuses, skill ranks, gear)?
- Are there upbringing options that are clearly optimal for specific archetypes, reducing character creation diversity?
- Do background choices interact meaningfully with upbringing, or are they purely narrative?
- Are starting equipment and wealth balanced across upbringing options?
- Do upbringing options cover sufficient cultural and social diversity for the Bronze Age setting?

---

### 15. NPC Relations & Disposition System

**Relevant Rules:** `docs/02-adventurers/05-npc-relations.md`

**Rationale:** The NPC relations system defines 6 archetypal roles (Adventurer, Artisan, Authority, Guide, Patron, Sage) with dispositions that influence gameplay. No analysis evaluates whether these archetypes cover sufficient narrative ground, whether the disposition mechanics are deep enough, or how NPC relations integrate with the social intrigue system.

**Questions to Explore:**
- Do the 6 NPC archetypes cover the range of important NPC relationships in a typical campaign?
- Is the disposition tracking system (friendly/indifferent/hostile) granular enough for nuanced social gameplay?
- How do NPC relations interact with the social intrigue challenge system?
- Are there mechanical incentives for players to invest in NPC relationships beyond narrative flavor?
- Does the system support recurring NPCs and evolving relationships over a campaign arc?

---

### 16. Supply, Durability & Resource Management

**Relevant Rules:** `docs/04-equipment/01-items.md`, `docs/04-equipment/02-equipment/supply.md`

**Rationale:** The game tracks ammunition via supply checks, item durability via damage conditions, and encumbrance via the load system. No analysis evaluates whether resource management creates engaging tension or burdensome bookkeeping, or how these systems interact with travel and exploration.

**Questions to Explore:**
- Does the supply check system for ammunition/consumables create meaningful scarcity, or is it too lenient/harsh?
- How does the durability/damaged condition mechanic affect pacing — is armor degradation a satisfying consequence or frustrating attrition?
- Is the load/encumbrance system calibrated so that carry weight creates real trade-offs for different character builds?
- How do resource management mechanics interact with the travel and exploration systems?
- Are there items or situations where resource tracking becomes excessive bookkeeping?
- Does the quality tier system (Q1–Q8) interact cleanly with durability and supply mechanics?

---

### 17. Vision, Stealth & Environmental Subsystems

**Relevant Rules:** `docs/05-combat/01-combat-scenes.md`, `docs/05-combat/04-conditions.md`

**Rationale:** Rules for dim light, darkness, stealth, hiding, and environmental conditions affect both combat and exploration. No analysis evaluates these interconnected subsystems for clarity, consistency, or whether they create meaningful tactical choices around visibility and concealment.

**Questions to Explore:**
- Are darkness/dim light penalties (banes on attacks, Perception checks) calibrated for satisfying stealth and ambush gameplay?
- Does the hidden condition interact cleanly with initiative, surprise, and combat actions?
- Are there gaps in environmental conditions (underwater, high wind, extreme heat/cold) that affect combat or exploration?
- How well do vision rules support the Stealth skill's role across combat, exploration, and infiltration scenarios?
- Do environmental hazards create interesting terrain challenges, or are they easily ignored?

---

### 18. Archetype Viability & Talent Coverage

**Relevant Rules:** `docs/01-basic-rules/03-quickstart-characters/`, `docs/03-statistics/06-talents/`

**Rationale:** The game defines 25+ archetypes (Barbarian, Bard, Champion, Druid, Fighter, Monk, Ranger, Rogue, Sorcerer, etc.) each with a pillar skill and 3 supporting skills. The talent system analysis noted that 5 archetypes lack mechanical support and that talents cap at Rank 3 (no Rank 4–5 talents exist). A dedicated viability report would assess each archetype against the current talent, spell, and combat art options.

**Questions to Explore:**
- Which archetypes are fully supported by existing talents, spells, and combat arts?
- Which archetypes have significant mechanical gaps (missing key abilities for their identity)?
- Does the talent cap at Rank 3 prevent high-level archetype fulfillment?
- Are there archetypes that require talents from 4+ skills to function, making them impractical to build?
- How well do the archetype identity tags (rage, favored enemy, formations, etc.) map to concrete mechanical abilities?
- Are there popular fantasy archetypes missing from the current list that the system could support?
