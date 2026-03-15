# Talent System Analysis

> **Scope:** Comprehensive audit of the talent system against archetype instructions, talent creation guidelines, and modern game systems (Challenges, Social Intrigue, Travel). Covers progression evaluation through Rank 5, Prestige Talent feasibility, capstone talent design, and a prioritized implementation roadmap.
>
> **References:** [Character Progression](../../01-basic-rules/04-character-progression.md) | [Talent Creation Guidelines](../../../.github/instructions/talent-system-design-guidelines.md) | [Archetype Instructions](../../../.github/instructions/archetype-design-guidelines.md) | [Challenge System](../../06-scenes/07-challenges/00-overview.md) | [Social Intrigue](../../06-scenes/07-challenges/01-social-intrigue.md) | [Travel](../../06-scenes/07-challenges/02-travel.md) | [Combat Arts](../../05-combat/02-combat-arts.md) | [Challenge & Social Intrigue Talent Integration](./CHALLENGE_SOCIAL_INTRIGUE_TALENT_INTEGRATION.md) | [Travel Talent Integration](./TRAVEL_TALENT_INTEGRATION.md)

---

## 1. Executive Summary

### Key Findings

1. **122 talents across 16 skills** form a functional foundation. 114 are fully implemented (94%), with 8 containing placeholder or stub content across 4 skills.
2. **Combat talents dominate** (~58% combat-primary), while utility, exploration, and social talents are under-represented — particularly in skills like Archery, Athletics, and Perception.
3. **Talent progression caps at Rank 3** for the vast majority of talents (only Arcane Spell Knowledge, Mystical Spell Knowledge, Art of Fighting, Art of Archery, and Magical Sense reach Rank 4). No talents currently reach Rank 5, creating a dead zone for Grandmaster-level characters.
4. **Modern system integration is minimal.** Only 5 talents interact with the Challenge system, 8 with Social Intrigue, and 3 with Travel mechanics — all well below the 15+ target per system.
5. **Critical archetype gaps remain.** Oracle, Bard, Tamer, Hoplite, and Warlock lack dedicated mechanical support from the talent system. Key identity tags (Infiltration, Whip Control, Zone Control, Prophecy) have zero or near-zero talent representation.
6. **Skill disparity is significant.** Fighting has 14 talents while Streetwise has only 4. Four skills (Insight, Streetwise, Influence, Perception) have ≤5 talents, limiting build diversity for dependent archetypes.
7. **Defensive variety is thin.** Redirection (0%), Avoidance (5%), and reactive defense talents are critically under-developed for a system with lethal combat.
8. **No Rank 4–5 talent framework exists.** The progression system supports Ranks 4–5, but talent design has not followed. This gap leaves high-level characters investing XP without commensurate talent payoff.

### Design Principles

1. **Fiction-first, mechanically precise.** Talents describe abilities narratively but must have unambiguous triggers, effects, and limits.
2. **Skill-internal diversity.** Every skill should support combat, utility, and downtime play through its talent pool.
3. **Bounded power ceiling.** Rank 5 = mortal pinnacle (≈ D&D level 10–12). Growth comes from efficiency, reliability, and breadth — not raw power inflation.
4. **System integration.** Talents should create meaningful interactions with Challenges, Social Intrigue, Travel, and Combat Arts.
5. **Archetype enablement.** Talents empower archetypes without locking builds. Multi-skill synergies should be rewarding, not mandatory.

---

## 2. Current System Audit

### 2.1 Talent Economy

**Earning:** 1 Talent Point (TP) per 2 XP invested in a skill.

**Spending:** 1 TP to learn a new talent at Rank 1, or increase an existing talent's rank by 1.

**Constraint:** Maximum talent rank = current skill rank.

| Skill Rank | XP Required | Max Talent Rank | TP Earned (cumulative) |
|------------|-------------|-----------------|------------------------|
| 1 (Novice) | 2 | 1 | 1 |
| 2 (Adept) | 6 | 2 | 3 |
| 3 (Expert) | 12 | 3 | 6 |
| 4 (Master) | 18 | 4 | 9 |
| 5 (Grandmaster) | 24 | 5 | 12 |

**Key Observation:** A Rank 5 skill generates 12 TP. With most talents capping at Rank 3, a Grandmaster-tier character has ~3 unspendable TP per skill — a significant dead zone.

### 2.2 Talent Distribution by Skill

| Skill | Total | Max Rank | Complete | Incomplete | Combat | Utility | Hybrid |
|-------|-------|----------|----------|------------|--------|---------|--------|
| **Fighting** | 14 | 4 | 14 | 0 | 13 | 0 | 1 |
| **Fortitude** | 11 | 3 | 10 | 1 | 8 | 2 | 1 |
| **Mysticism** | 11 | 4 | 10 | 1 | 6 | 4 | 1 |
| **Archery** | 9 | 4 | 9 | 0 | 8 | 0 | 1 |
| **Athletics** | 9 | 3 | 8 | 1 | 7 | 0 | 2 |
| **Arcana** | 8 | 4 | 8 | 0 | 4 | 2 | 2 |
| **Nature** | 8 | 3 | 7 | 1 | 4 | 1 | 3 |
| **Influence** | 7 | 3 | 5 | 2 | 3 | 1 | 3 |
| **Survival** | 7 | 3 | 3 | 4 | 2 | 2 | 3 |
| **Crafting** | 6 | 3 | 5 | 1 | 1 | 4 | 1 |
| **Education** | 6 | 3 | 6 | 0 | 1 | 2 | 3 |
| **Lore** | 6 | 4 | 6 | 0 | 1 | 3 | 2 |
| **Stealth** | 6 | 3 | 4 | 2 | 2 | 3 | 1 |
| **Perception** | 5 | 3 | 5 | 0 | 3 | 0 | 2 |
| **Insight** | 5 | 3 | 4 | 1 | 1 | 1 | 3 |
| **Streetwise** | 4 | 3 | 3 | 1 | 3 | 1 | 0 |
| **Totals** | **122** | — | **114** | **8** | **67** | **26** | **29** |

**Distribution:** 55% Combat / 21% Utility / 24% Hybrid

### 2.3 Incomplete Talents

| Talent | Skill | Issue |
|--------|-------|-------|
| Adrenaline Rush | Fortitude | Stub — description only, no rank content |
| Supernatural Mobility | Athletics | Stub — description only, no rank content |
| Performer | Influence | Stub — description only, no rank content |
| Presence of Conquest | Influence | Stub — description only, no rank content |
| Foresight | Insight | Stub — description only, no rank content |
| Divine Favor | Mysticism | Stub — no rank structure defined |
| Herbalist | Nature | Stub — description only, no rank content |
| Master Artisan | Crafting | Stub — requires Artisan Rank 3, no rank content |
| Plant Lore | Nature | Rank 3 placeholder (XXX) |
| Knowledgeable Wanderer | Nature | Rank 3 incomplete (TODO) |
| Magical Sense | Lore | Rank 4 placeholder (???) |
| Roguish Wits | Stealth | Rank 3 placeholder (XXX) |
| Sleight of Hand | Stealth | Rank 3 placeholder (XXX) |
| I Know A Guy | Streetwise | Ranks 2–3 placeholder (XXX) |
| Explorer of Nature | Survival | Rank 3 placeholder (XXX) |
| Relentless Tracker | Survival | Ranks 2–3 placeholder (XXX) |
| Wilderness Expert | Survival | Rank 3 placeholder (XXX) |

**Priority:** Completing these before adding new talents prevents broken progression paths.

### 2.4 Rank Distribution

| Max Rank | Count | % |
|----------|-------|---|
| Rank 3 | 113 | 93% |
| Rank 4 | 5 | 4% |
| Stub (no ranks) | 4 | 3% |
| Rank 5 | 0 | 0% |

The five Rank 4 talents are: Arcane Spell Knowledge, Mystical Spell Knowledge, Art of Fighting, Art of Archery, and Magical Sense.

---

## 3. Strengths of the Current System

### 3.1 Strong Combat Foundations

The talent system excels at providing tactical combat options across martial skills:

- **Fighting (14 talents)** covers weapon mastery (6 weapon types), defensive styles (Defensive Dueling, Protective Stance, Riposte, Shield Mastery), offensive techniques (Dual Wielder, Martial Artist, Pugilist), and skill progression (Art of Fighting, Disciplined Fighter).
- **Archery (9 talents)** provides weapon specialization (Crossbow Mastery, Expert Slinger), technique variety (Rapid Shot, Sharpshooter, Ammo Specialist), and defensive options (Reflexive Shooter, Strong Grip).
- **Fortitude (11 talents)** delivers tanking and resilience (Heavy Armor Mastery, Body of Bronze, Hard to Kill, Second Wind, Juggernaut) alongside thematic combat styles (Battle Rage, Drunken Technique).

### 3.2 Magic System Integration

Both spellcasting skills have well-designed talent support:

- **Arcana (8 talents)** covers spell knowledge progression (Arcane Spell Knowledge), combat casting (Battle Mage, Spellblade), resource management (Inexhaustible Mind, Mana Shield), and spell enhancement (Master of Fundamentals, Spellweaver, Wild Overload).
- **Mysticism (11 talents)** provides parallel progression (Mystical Spell Knowledge) with thematic breadth: divine combat (Mystic Champion, Armor of the Faithful), communal magic (Communal Practices, Pact of Devotion), sensory abilities (Divine Sense), and ritual enhancement (Divine Rites, Master of Principles, Elemental Adept, Shape Changer).

### 3.3 Clear Rank Progression

Most completed talents follow a clean progression pattern:
- **Rank 1:** Unlocks a new option or playstyle.
- **Rank 2:** Adds a payoff ability, situational boon, or secondary effect.
- **Rank 3:** Provides mastery — reliability, signature moves, or encounter-shaping tools.

This aligns well with the design guideline of *unlock → payoff → mastery*.

### 3.4 Weapon Mastery Diversity

Fighting's 6 weapon mastery talents (Axe, Blade, Heavy Weapon, Mace, Polearm, Shield) create meaningful differentiation between martial loadouts. Each mastery grants weapon-specific bonuses that complement the weapon's properties.

---

## 4. Gap Analysis

### 4.1 Skill Size Disparity

**Target:** 8–12 talents per skill for healthy build diversity.

| Category | Skills | Count Range | Status |
|----------|--------|-------------|--------|
| Over-served | Fighting | 14 | ⚠️ Could split into sub-categories |
| Well-served | Fortitude, Mysticism | 11 each | ✅ |
| Adequate | Archery, Athletics, Arcana, Nature | 8–9 | ✅ |
| Under-served | Crafting, Education, Lore, Stealth, Survival | 6–7 | ⚠️ Need 1–4 additions |
| Critically low | Influence, Insight, Perception, Streetwise | 4–5 | ❌ Need 3–6 additions each |

### 4.2 Missing Archetype Support

Cross-referencing the 26 archetypes against talent availability reveals significant gaps:

| Archetype | Pillar + Supports | Talent Coverage | Missing Elements | Priority |
|-----------|-------------------|-----------------|------------------|----------|
| **Oracle** | Mysticism, Lore, Insight, Education | 27 accessible | Prophecy, omens, foresight mechanics | Critical |
| **Bard** | Mysticism, Influence, Education, Stealth | 28 accessible | Music magic, performance effects | Critical |
| **Tamer** | Fighting, Nature, Athletics, Survival | 35 accessible | Whip control, advanced beast training | High |
| **Hoplite** | Fighting, Athletics, Influence, Fortitude | 38 accessible | Formation tactics, zone control | High |
| **Warlock** | Arcana, Lore, Insight, Fortitude | 28 accessible | Pact mechanics, curses, familiar | High |
| **Rogue** | Fighting, Stealth, Streetwise, Insight | 28 accessible | Infiltration, lockpicking, planning | High |
| **Engineer** | Crafting, Education, Archery, Perception | 26 accessible | Siege devices, contraptions, traps | Medium |
| **Apothecary** | Crafting, Education, Nature, Insight | 23 accessible | Alchemy talents, tinctures, remedies | Medium |

### 4.3 Missing Identity Tags

The following archetype-defining mechanics have zero talent representation:

| Identity Tag | Dependent Archetypes | Required Skills |
|-------------|---------------------|-----------------|
| **Infiltration** (lockpicking, bypass, silent entry) | Rogue, Duelist, Bard | Stealth, Streetwise |
| **Whip control** (reach control, trip, subdual) | Tamer | Fighting |
| **Zone control** (area denial, formation, choke points) | Hoplite, Fighter, Warlord | Fighting, Education |
| **Prophecy** (visions, omens, fate manipulation) | Oracle | Insight, Lore, Mysticism |
| **Music/Performance magic** (AoE buffs, charm through art) | Bard | Influence, Mysticism |
| **Pact mechanics** (patron obligations, eldritch abilities) | Warlock | Arcana, Lore |
| **Alchemy** (potions, bombs, remedies) | Apothecary, Engineer | Crafting, Nature |

### 4.4 Role Distribution Deficits

Evaluated against design guidelines (each skill should support combat, utility, and downtime):

| Role | Current % | Target % | Gap | Most Affected Skills |
|------|-----------|----------|-----|---------------------|
| **Offense** | 38% | 25–30% | Over-represented | Fighting, Archery |
| **Defense — Redirection** | 0% | 5–10% | ❌ Critical gap | All skills |
| **Defense — Avoidance** | 5% | 10–15% | ❌ Large gap | Athletics, Stealth, Perception |
| **Utility — Travel** | 3% | 10–15% | ❌ Large gap | Survival, Nature, Perception |
| **Utility — Exploration** | 8% | 10–15% | ⚠️ Below target | Streetwise, Insight, Nature |
| **Support — Team** | 12% | 15–20% | ⚠️ Below target | Education, Influence, Lore |
| **Healing** | 5% | 5–10% | ✅ Appropriate | Nature, Mysticism, Fortitude |

### 4.5 Defensive Talent Gaps

In a system with lethal combat, defensive variety is essential. Current defensive talents:

| Category | Examples | Count | Status |
|----------|----------|-------|--------|
| **Mitigation** | Heavy Armor Mastery, Body of Bronze, Mana Shield | 6 | ✅ Adequate |
| **Avoidance** | Evasion, Light Armor Mastery | 4 | ⚠️ Needs expansion |
| **Counterplay** | Riposte, Defensive Dueling | 3 | ⚠️ Needs expansion |
| **Redirection** | — | 0 | ❌ Missing entirely |
| **Reactive defense** | Reflexive Shooter | 1 | ❌ Near-missing |

**Recommendation:** Add redirection talents (Insight-based: redirect attacks), avoidance talents (Stealth-based: vanish in combat), and reactive defense talents (Perception-based: danger sense in combat).

---

## 5. Modern System Integration

### 5.1 Challenge System Integration

The Challenge system (challenge die + TN + skill-once rule) supports talent interaction through several hooks:

| Hook | Description | Current Talent Support |
|------|-------------|----------------------|
| Challenge die reduction | Reduce die faster on specific skills | ~3 talents |
| TN modification | Grant boons or reduce TN situationally | ~2 talents |
| Blunder mitigation | Treat blunders as failures | 1 talent (Knowledgeable Wanderer) |
| Weak success enhancement | Remove cost on weak successes | 0 talents |
| Approach bonuses | Enhance Clever/Risky/Cautious adjustments | 0 talents |
| Multi-skill flexibility | Remove secondary skill bane | 0 talents |

**Current state:** ~5 talents with challenge relevance, target 15+.

**Proposed additions** (from [Challenge & Social Intrigue Talent Integration](./CHALLENGE_SOCIAL_INTRIGUE_TALENT_INTEGRATION.md)):
- **Keen Observer** (Perception): Re-roll in challenges, learn details, reduce die or negate consequences.
- **Silver Tongue** (Influence): Delay Patience, gain boons after appealing to Motivations, block Interest drops.
- **Read the Room** (Insight): Boons on Investigate actions, learn Interest/Patience state, warn allies about Pitfalls.

### 5.2 Social Intrigue Integration

The Social Intrigue system (Interest, Patience, Motivations, Pitfalls) has specific mechanical hooks:

| Hook | Description | Current Talent Support |
|------|-------------|----------------------|
| Interest manipulation | Raise/protect Interest | ~4 talents (Influence-based) |
| Patience delay | Slow Patience countdown | 0 talents |
| Motivation discovery | Learn NPC Motivations | ~2 talents (Insight-based) |
| Pitfall avoidance | Discover/recover from Pitfalls | 0 talents |
| Social action enhancement | Boost specific actions (Argue, Appeal, Deceive, etc.) | ~2 talents |
| Escalation management | Resist TN increases from repeated failures | 0 talents |

**Current state:** ~8 talents with social intrigue relevance, target 15+.

### 5.3 Travel System Integration

The Travel system (Navigator, Scout, Quartermaster, Forager, Hunter, Fisher roles) provides role-based hooks:

| Hook | Description | Current Talent Support |
|------|-------------|----------------------|
| Navigator efficiency | Improve daily progress | 2 talents (Knowledgeable Wanderer, Explorer of Nature) |
| Scout effectiveness | Find shelter, avoid danger | 1 talent (Explorer of Nature) |
| Forager/Hunter yield | Gather more resources | 1 talent (Wilderness Expert) |
| Fatigue mitigation | Resist travel Fatigue | 1 talent (Explorer's Tenacity) |
| Multi-role penalty | Remove +1 bane for extra roles | 1 talent (Knowledgeable Wanderer) |
| Checkpoint interaction | Handle blockades, ambushes, extreme climate | 0 dedicated talents |

**Current state:** ~3 talents with explicit travel mechanics, target 15+.

**Proposed additions** (from [Travel Talent Integration](./TRAVEL_TALENT_INTEGRATION.md)):
- **Pathfinder** (Survival): Navigator re-rolls, progress bonuses, detour avoidance.
- **Trailblazer** (Athletics): Terrain penalty reduction, progress on zero days.
- **Cartographer's Eye** (Perception): Spot hidden checkpoints, terrain assessment.
- **Expedition Leader** (Education): Manage supplies, enhanced camp rest.
- **Road Warden** (Streetwise): Civilized travel bonuses, NPC contact for aid.
- **Seasoned Forager** (Nature): Enhanced forage yields, identify edible plants.

### 5.4 Integration Summary

| System | Current Talents | Proposed Additions | Target |
|--------|----------------|-------------------|--------|
| Challenge | ~5 | +3 | 15+ |
| Social Intrigue | ~8 | +3 (overlaps Challenge) | 15+ |
| Travel | ~3 | +6 | 15+ |
| **Total new** | — | **+9 minimum** | — |

> **Note:** Many proposed talents serve multiple systems (e.g., Keen Observer aids both Challenges and Travel scouting). The dedicated integration analyses provide complete designs: [Challenge & Social Intrigue Integration](./CHALLENGE_SOCIAL_INTRIGUE_TALENT_INTEGRATION.md) and [Travel Integration](./TRAVEL_TALENT_INTEGRATION.md).

---

## 6. Talent Progression Evaluation

### 6.1 Current State: Ranks 1–3

The original talent system was designed for Ranks 1–3, following a clean progression:

| Rank | Design Intent | Execution |
|------|--------------|-----------|
| **1 (Novice)** | Unlock a new playstyle or option | ✅ Well-executed across most talents |
| **2 (Adept)** | Add a payoff ability or situational boon | ✅ Consistent improvement pattern |
| **3 (Expert)** | Provide mastery, signature moves, encounter-shaping tools | ✅ Good capstone feel at this level |

This structure works well for characters through Level 6 (Skill Rank 3 cap).

### 6.2 The Rank 4–5 Gap

Characters at Levels 7–10 can invest in Skill Ranks 4–5, but the talent system offers almost nothing:

| Skill Rank | XP Invested | TP Available | Talents Available | Effective TP |
|------------|-------------|--------------|-------------------|--------------|
| 3 (Expert) | 12 | 6 | All (Rank 1–3) | 6 usable |
| 4 (Master) | 18 | 9 | 5 talents (Rank 4) | ~6–7 usable |
| 5 (Grandmaster) | 24 | 12 | 0 talents (Rank 5) | ~6–7 usable |

**Impact:** At Ranks 4–5, characters accumulate 3–6 unspendable TP per skill. This creates:
- **Diminishing returns** on XP investment at high levels.
- **Progression flatline** where leveling up feels unrewarding.
- **Narrative disconnect** where a "Grandmaster" has no abilities beyond an Expert.

### 6.3 Rank 4 Design Expectations

Following the established progression pattern (*unlock → payoff → mastery → mythic*):

**Rank 4 (Master):** Abilities should bend encounters, expand scope, and affect squads or whole journeys. A Rank 4 combatant is among the best in a city-state. A Rank 4 diplomat reshapes political outcomes. A Rank 4 survivalist guides entire expeditions through hostile territory.

**Design targets for Rank 4 talents:**
- Upgrade existing Rank 3 abilities with broader scope or reduced costs.
- Introduce encounter-shaping effects (multi-target, extended duration, party-wide benefits).
- Provide meaningful interaction with multiple game systems.
- Require tactical decisions — not automatic bonuses.

### 6.4 Rank 5 Design Expectations

**Rank 5 (Grandmaster):** The pinnacle of mortal skill. Abilities define the character as legendary within the setting. Effects should be powerful but bounded — impressive and reality-stretching, not reality-breaking.

**Design targets for Rank 5 talents:**
- Signature abilities that define a character's legend.
- Once-per-day or once-per-scene abilities with dramatic impact.
- Effects that combine combat, utility, and narrative power.
- Clear distinction from magic (mundane mastery, not supernatural).
- Bounded power ceiling: equivalent to D&D levels 10–12, not 17–20.

### 6.5 Rank 4–5 Talent Quantity Targets

To address the TP dead zone, each skill needs:

| Skill Category | Current Rank 4+ | Needed Rank 4 | Needed Rank 5 |
|---------------|-----------------|---------------|---------------|
| Combat skills (Fighting, Archery) | 2 | +3–4 each | +1–2 each |
| Magic skills (Arcana, Mysticism) | 2 | +2–3 each | +1–2 each |
| General skills (Athletics, etc.) | 0 | +2–3 each | +1 each |
| Expert skills (Crafting, etc.) | 1 | +2–3 each | +1 each |

**Minimum additions needed:** ~32 Rank 4 talents + ~16 Rank 5 talents across all 16 skills.

---

## 7. Prestige Talents

### 7.1 Concept

Prestige Talents (inspired by D&D 3.5e Prestige Classes) are advanced talents requiring Rank 3+ in multiple skills. They reward multi-skill investment and define archetype mastery.

**Example prerequisites:** "Requires Fighting 3 and Athletics 3" or "Requires Arcana 3 and Lore 3."

### 7.2 Feasibility Assessment

| Factor | Assessment | Notes |
|--------|------------|-------|
| **System fit** | ✅ Strong | TP economy supports multi-skill builds. Characters naturally spread XP. |
| **Archetype alignment** | ✅ Strong | Each archetype uses 4 skills. Prestige Talents reward thematic investment. |
| **Complexity cost** | ⚠️ Moderate | Adds a prerequisite layer that must be clearly communicated. |
| **Build diversity** | ✅ Positive | Creates meaningful choices between deep (single-skill) and wide (multi-skill) investment. |
| **Balance risk** | ⚠️ Moderate | Multi-skill prerequisites inherently limit availability. Must ensure single-skill paths remain viable. |

### 7.3 Recommendation: Adopt Prestige Talents

Prestige Talents are a natural fit for Nexus RPG's free-form progression model. They solve three problems:

1. **High-rank TP surplus** — Give Rank 4–5 characters meaningful spending options.
2. **Archetype definition** — Let players mechanically commit to an archetype identity.
3. **Cross-skill synergy** — The design guidelines call for inter-skill synergies; Prestige Talents make these explicit.

### 7.4 Prestige Talent Design Framework

**Structure:**
- **Prerequisites:** Rank 3+ in two named skills (the "pillar" and one supporting skill).
- **Ranks:** 1–2 (to keep investment modest alongside normal talent spending).
- **Placement:** Listed under the pillar skill's talent file, with prerequisites clearly noted.
- **Budget:** 2–4 Prestige Talents per skill, focused on archetypes that use that skill as a pillar.

**Naming convention:** Evocative names that reflect the archetype's identity, not mechanical descriptions.

### 7.5 Prestige Talent Proposals

The following are representative designs. Each addresses a specific archetype gap and requires cross-skill investment.

#### Martial Prestige Talents (Fighting pillar)

| Prestige Talent | Prerequisites | Archetype | Core Effect |
|----------------|---------------|-----------|-------------|
| **Phalanx Commander** | Fighting 3, Influence 3 | Hoplite/Warlord | Adjacent shield-bearing allies gain +1 AV; once per scene, command a coordinated strike where all allies in melee attack simultaneously. |
| **Iron Tempest** | Fighting 3, Athletics 3 | Barbarian/Gladiator | When you reduce an enemy to 0 HP, immediately make a free melee attack against an adjacent enemy. Once per day, enter a fighting fury for a short duration: gain +1 boon on melee attacks but −2 to all defenses. |
| **Blade Dancer** | Fighting 3, Stealth 3 | Duelist/Swashbuckler | After hitting an enemy, you may move 1 area without provoking attacks. Once per scene, when you dodge an attack, make a free counter-attack. |

#### Ranged Prestige Talents (Archery pillar)

| Prestige Talent | Prerequisites | Archetype | Core Effect |
|----------------|---------------|-----------|-------------|
| **Predator's Mark** | Archery 3, Survival 3 | Ranger | Mark a target (Quick Action). Attacks against marked targets gain +1 boon and ignore half cover. Mark persists for a short duration or until a new target is marked. |
| **Siege Engineer** | Archery 3, Crafting 3 | Engineer | You can construct and operate siege devices during downtime. In combat, thrown contraptions (alchemist fire, smoke bombs, caltrops) gain +1 boon and affect a close area. |

#### Spellcaster Prestige Talents (Arcana/Mysticism pillar)

| Prestige Talent | Prerequisites | Archetype | Core Effect |
|----------------|---------------|-----------|-------------|
| **Eldritch Pact** | Arcana 3, Lore 3 | Warlock | Choose a Patron (Fiend, Fey, or Void). Gain a patron-specific passive benefit and one patron spell that doesn't cost Focus. Once per day, invoke your patron for a dramatic spell-like effect. |
| **Song of Power** | Mysticism 3, Influence 3 | Bard | You can weave mystic energy into performances. As an Action, perform to grant all allies in close range +1 boon on their next roll. At Rank 2, the performance also imposes −1 bane on enemies in range. Requires concentration. |
| **Prophetic Sight** | Mysticism 3, Insight 3 | Oracle | Once per day, enter a prophetic trance (1 minute) to receive a cryptic vision relevant to the current situation. At Rank 2, you can also spend 1 Resolve to grant an ally a re-roll, representing fated intervention. |

#### Skill Prestige Talents (Non-combat pillars)

| Prestige Talent | Prerequisites | Archetype | Core Effect |
|----------------|---------------|-----------|-------------|
| **Beast Bond** | Nature 3, Survival 3 | Tamer/Druid | Your animal companion gains +1 to all attributes (one die size). You can communicate simple commands without a roll. At Rank 2, your companion can act independently on your Initiative. |
| **Underworld Contact** | Streetwise 3, Influence 3 | Rogue | In any settlement, you can locate a black market contact (Mind + Streetwise vs. settlement difficulty). Contacts provide fencing, forgery, information, or smuggling services. At Rank 2, contacts offer one free favor per visit. |
| **Master Alchemist** | Crafting 3, Nature 3 | Apothecary | Your alchemy crafting yields double batches. You can identify any potion or substance on sight. At Rank 2, your potions and remedies have their effects increased by one tier. |

---

## 8. Capstone Talent Design

### 8.1 Philosophy

Capstone talents (Rank 4–5) should feel like the culmination of a character's investment. They should be:

- **Transformative** — Not just bigger numbers, but fundamentally new capabilities.
- **Signature** — Define what makes a Master or Grandmaster different from an Expert.
- **Bounded** — Impressive within the fiction, not mechanically game-breaking.
- **Gated** — Use costs (once per day, Resolve, conditions) to prevent abuse.

### 8.2 Rank 4 Capstone Templates

Rank 4 talents should extend Rank 3 mastery into encounter-shaping territory:

| Template | Pattern | Example |
|----------|---------|---------|
| **Scope Expansion** | Single-target → multi-target | Shield Mastery R4: Your shield bonus applies to adjacent allies. |
| **Action Economy** | Full Action → Quick Action | Second Wind R4: Use as Quick Action once per day. |
| **Reliability** | Conditional → consistent | Evasion R4: You can use Evasion even when surprised or restrained. |
| **System Bridge** | Combat → non-combat | Disciplined Fighter R4: Add Fighting rank to Fortitude rolls vs. fear and morale during challenges. |
| **Recovery** | Mitigate → reverse | Hard to Kill R4: Once per day, when you would suffer a Wound, remain at 1 HP instead. |

### 8.3 Rank 5 Capstone Templates

Rank 5 talents should represent the absolute pinnacle of mortal ability:

| Template | Pattern | Example |
|----------|---------|---------|
| **Legendary Action** | Once per day, dramatic effect | Art of Fighting R5: Once per day, treat any Fighting roll as a Critical Success. |
| **Permanent Enhancement** | Passive mastery bonus | Sharpshooter R5: Your ranged attacks never suffer banes from range, cover, or weather. |
| **Narrative Authority** | Player-directed story impact | Tactician R5: Once per session, declare a tactical insight that grants the party a major advantage in the current scene (GM adjudicates). |
| **Capstone Synergy** | Combine two talent lines | Battle Mage R5: When you cast a spell, you may also make a melee attack as part of the same Action. |
| **Grandmaster Signature** | Unique pinnacle ability | Martial Artist R5: Your unarmed strikes deal weapon damage equal to your equipped weapon's best damage type. Your body counts as a magic weapon. |

### 8.4 Priority Capstone Talents by Skill

| Priority | Skill | Rank 4 Candidates | Rank 5 Candidates |
|----------|-------|-------------------|-------------------|
| Critical | Fighting | Shield Mastery, Defensive Dueling, Martial Artist | Art of Fighting (extend to R5) |
| Critical | Archery | Sharpshooter, Rapid Shot | Art of Archery (extend to R5) |
| Critical | Arcana | Battle Mage, Spellweaver | Arcane Spell Knowledge (extend to R5) |
| Critical | Mysticism | Mystic Champion, Divine Rites | Mystical Spell Knowledge (extend to R5) |
| High | Athletics | Evasion, Fast Stride | Supernatural Mobility (flesh out as R4–5) |
| High | Fortitude | Hard to Kill, Battle Rage | Juggernaut or new capstone |
| High | Influence | Inspire Ally, Leading Presence | Presence of Conquest (flesh out as R4–5) |
| High | Insight | Sense of Deduction, Empath | Foresight (flesh out as R4–5) |
| Medium | Perception | Danger Sense, Identify Weakness | New capstone |
| Medium | Stealth | Assassination, Hidden Strike | New capstone |
| Medium | Survival | Monster Hunter, Trap Maker | New capstone |
| Medium | Nature | Animal Companion, Field Medic | New capstone |
| Medium | Education | Tactician, Commander | New capstone |
| Medium | Crafting | Artisan, Peak Performance | Master Artisan (flesh out as R4–5) |
| Medium | Lore | Mage Hunter, Consult the Myths | Magical Sense (complete R4, extend to R5) |
| Medium | Streetwise | Swashbuckler, Thug Tactics | New capstone |

---

## 9. Concrete Design Recommendations

### 9.1 Phase 1: Foundation (Immediate Priority)

**Goal:** Complete incomplete talents and address critical skill gaps.

#### 9.1.1 Complete Incomplete Talents (8 talents)

| Talent | Skill | Action |
|--------|-------|--------|
| Plant Lore R3 | Nature | Design Rank 3 effect (plant identification, terrain interaction) |
| Knowledgeable Wanderer R3 | Nature | Design Rank 3 effect (bonus progress on successful travel rolls) |
| Roguish Wits R3 | Stealth | Design Rank 3 effect (escape captivity, misdirect pursuit) |
| Sleight of Hand R3 | Stealth | Design Rank 3 effect (plant items, pick pockets in combat) |
| I Know A Guy R2–3 | Streetwise | Design Ranks 2–3 (expand contact network, favor mechanics) |
| Explorer of Nature R3 | Survival | Design Rank 3 effect (enhanced exploration role) |
| Relentless Tracker R2–3 | Survival | Design Ranks 2–3 (long-range tracking, quarry mechanics) |
| Wilderness Expert R3 | Survival | Design Rank 3 effect (advanced campcraft, shelter construction) |

#### 9.1.2 Flesh Out Stub Talents (6 talents)

| Talent | Skill | Design Direction |
|--------|-------|-----------------|
| Adrenaline Rush | Fortitude | Damage-triggered benefits (boons after taking hits, temporary HP surge) |
| Supernatural Mobility | Athletics | High-rank parkour/movement (wall-running, standing long jumps, fall reduction) |
| Performer | Influence | Entertainment and crowd manipulation (performance rolls, crowd mood, tips) |
| Presence of Conquest | Influence | High-rank fear aura (intimidation at range, demoralize groups, combat authority) |
| Foresight | Insight | High-rank intuitive prediction (avoid surprise, predict enemy actions, fate sense) |
| Divine Favor | Mysticism | Divine patron relationship (prayer benefits, divine intervention, sacred duty) |

#### 9.1.3 Expand Critically Low Skills (+15–20 talents)

| Skill | Current | Target | New Talents Needed | Focus Areas |
|-------|---------|--------|--------------------|-------------|
| **Insight** | 5 | 8–9 | +3–4 | Prophecy (Oracle), combat reading, defensive redirection, investigation |
| **Streetwise** | 4 | 8–9 | +4–5 | Infiltration (Rogue), urban survival, contacts/networking, dirty fighting |
| **Influence** | 7 | 9–10 | +2–3 | Battlefield commands (Warlord), crowd performance (Bard), authority |
| **Perception** | 5 | 8–9 | +3–4 | Awareness-based defense, evidence gathering, travel scouting |
| **Survival** | 7 | 9–10 | +2–3 | Travel integration, advanced tracking, wilderness mastery |
| **Stealth** | 6 | 8–9 | +2–3 | Infiltration, escape, combat stealth |

### 9.2 Phase 2: System Integration (High Priority)

**Goal:** Create talents that interact meaningfully with Challenges, Social Intrigue, and Travel.

#### 9.2.1 Challenge Talents (+6–8 talents)

New talents that interact with challenge die mechanics:

| Talent | Skill | Challenge Hook |
|--------|-------|---------------|
| **Keen Observer** | Perception | Re-roll during challenges; learn hidden details; reduce die/negate consequences |
| **Methodical Research** | Education | Reduce challenge die by extra 1 on critical; treat Library as Clever approach |
| **Dogged Pursuit** | Survival | Re-roll during chase challenges; ignore terrain penalties in pursuits |
| **Improvised Solutions** | Crafting | Use Crafting as a secondary skill without bane in physical challenges |
| **Streetwise Informant** | Streetwise | Learn challenge details in advance; reduce starting die by 1 in urban settings |
| **Tactical Assessment** | Education | Reveal TN of current challenge step; plan approach for allies |

#### 9.2.2 Social Intrigue Talents (+4–6 talents)

New talents that interact with Interest, Patience, and social actions:

| Talent | Skill | Social Hook |
|--------|-------|-------------|
| **Silver Tongue** | Influence | Delay Patience; gain boons after Motivation appeal; block Interest drops |
| **Read the Room** | Insight | Boons on Investigate; learn Interest/Patience state; warn about Pitfalls |
| **Courtly Grace** | Education | Use Education for etiquette; reduce TN for formal negotiations |
| **Threatening Presence** | Fortitude | Use Fortitude for intimidation; impose banes on enemy social actions |

#### 9.2.3 Travel Talents (+6 talents)

New talents that interact with travel roles:

| Talent | Skill | Travel Hook |
|--------|-------|-------------|
| **Pathfinder** | Survival | Navigator re-rolls; progress bonuses; detour avoidance |
| **Trailblazer** | Athletics | Terrain penalty reduction; progress on zero days |
| **Cartographer's Eye** | Perception | Spot hidden checkpoints; terrain assessment |
| **Expedition Leader** | Education | Supply management; enhanced camp rest |
| **Road Warden** | Streetwise | Civilized travel bonuses; NPC contact for aid |
| **Seasoned Forager** | Nature | Enhanced forage yields; identify edible plants |

### 9.3 Phase 3: High-Rank Progression (Medium Priority)

**Goal:** Extend talent progression to Ranks 4–5 across all skills.

#### 9.3.1 Rank 4 Extensions (~32 talents)

Every skill should have 2–3 talents that extend to Rank 4. Priority candidates:

| Skill | Talents to Extend | Design Focus |
|-------|------------------|--------------|
| Fighting | Shield Mastery, Defensive Dueling, Martial Artist, Dual Wielder | Multi-target defense, encounter control |
| Archery | Sharpshooter, Rapid Shot, Disciplined Archer | Extreme range, multi-target volleys |
| Arcana | Battle Mage, Spellweaver, Wild Overload | Spell-melee integration, metamagic |
| Mysticism | Mystic Champion, Divine Rites, Communal Practices | Party-wide blessings, extended rites |
| Athletics | Evasion, Fast Stride, Grappler | Supernatural agility, movement mastery |
| Fortitude | Hard to Kill, Battle Rage, Juggernaut | Death defiance, fury escalation |
| Influence | Inspire Ally, Leading Presence, Fast Talking | Mass inspiration, social dominance |
| Insight | Empath, Sense of Deduction, Piercing Look | Combat prediction, truth compulsion |
| Perception | Danger Sense, Identify Weakness, Eagle Eye | Preternatural awareness |
| Stealth | Assassination, Hidden Strike, Devious Tactics | Perfect stealth, shadow mastery |
| Survival | Monster Hunter, Trap Maker | Legendary tracking, master traps |
| Nature | Animal Companion, Field Medic | Bonded companion, advanced herbalism |
| Education | Tactician, Commander, General Education | Battlefield control, knowledge mastery |
| Crafting | Artisan, Peak Performance | Masterwork creation, quality bonuses |
| Lore | Mage Hunter, Consult the Myths | Anti-magic expertise, ritual mastery |
| Streetwise | Swashbuckler, Thug Tactics | Urban legend, criminal empire |

#### 9.3.2 Rank 5 Extensions (~16 talents)

One signature talent per skill reaching Rank 5:

| Skill | Rank 5 Talent | Signature Effect |
|-------|---------------|-----------------|
| Fighting | Art of Fighting | Once per day, auto-Critical on a Fighting roll |
| Archery | Art of Archery | Once per day, auto-Critical on an Archery roll |
| Arcana | Arcane Spell Knowledge | Access Rank 5 spells; +1 Focus |
| Mysticism | Mystical Spell Knowledge | Access Rank 5 spells; +1 Focus |
| Athletics | Supernatural Mobility | Move through enemies, wall-run, reduce fall damage dramatically |
| Fortitude | Hard to Kill | Once per day, survive lethal damage at 1 HP |
| Influence | Presence of Conquest | Demoralize all enemies in short range; shatter morale |
| Insight | Foresight | Once per day, declare you foresaw a threat and take a prepared action |
| Perception | Eagle Eye (or new) | Preternatural senses; cannot be surprised; detect invisible |
| Stealth | Assassination (or new) | Once per day, guaranteed stealth kill on unaware target (if damage sufficient) |
| Survival | Monster Hunter | Legendary hunter; +1 boon and +weapon damage vs. studied prey |
| Nature | Animal Companion | Companion becomes exceptional (acts independently, gains abilities) |
| Education | Tactician | Once per scene, declare a tactical advantage for the entire party |
| Crafting | Master Artisan | Create items one Quality tier higher; halve crafting time |
| Lore | Magical Sense | Permanent detect magic; identify enchantments on sight |
| Streetwise | Swashbuckler (or new) | Once per scene, automatically escape a grapple, trap, or restraint |

### 9.4 Phase 4: Prestige Talents (Lower Priority)

**Goal:** Introduce multi-skill talents that define archetype mastery.

Implement 15–20 Prestige Talents across combat, magic, and skill categories (see §7.5 for initial proposals). Prioritize archetypes with the weakest talent support: Oracle, Bard, Tamer, Hoplite, Warlock, Rogue.

---

## 10. Implementation Roadmap

### Priority Matrix

| Phase | Scope | Talent Count | Priority | Dependencies |
|-------|-------|-------------|----------|-------------|
| **1a** | Complete incomplete talents | ~14 (fill stubs and XXX) | Immediate | None |
| **1b** | Expand critically low skills | ~15–20 new | Immediate | None |
| **2** | System integration talents | ~12–16 new | High | Challenge/SI/Travel rules stable |
| **3a** | Rank 4 extensions | ~32 (extend existing) | Medium | Phase 1 complete |
| **3b** | Rank 5 capstones | ~16 new | Medium | Phase 3a complete |
| **4** | Prestige Talents | ~15–20 new | Lower | Phase 3 complete |

### Success Metrics

| Metric | Current | Phase 1 Target | Phase 2 Target | Final Target |
|--------|---------|---------------|----------------|-------------|
| Total talents | 122 | 150–155 | 165–170 | 195–210 |
| Minimum per skill | 4 | 8 | 8 | 10 |
| Incomplete talents | 8 | 0 | 0 | 0 |
| Max talent rank used | 4 | 4 | 4 | 5 |
| Challenge-interactive | ~5 | 10 | 15+ | 20+ |
| Social Intrigue-interactive | ~8 | 12 | 15+ | 20+ |
| Travel-interactive | ~3 | 8 | 15+ | 18+ |
| Skills with Rank 4 talent | 4 | 4 | 8 | 16 |
| Skills with Rank 5 talent | 0 | 0 | 4 | 16 |
| Prestige Talents | 0 | 0 | 0 | 15–20 |
| Defensive redirection % | 0% | 3% | 5–10% | 5–10% |
| Travel talent % | 3% | 8% | 10–15% | 10–15% |

---

## 11. Forward-Looking Guidance

### 11.1 Talent Design for Ongoing System Evolution

As new game systems are introduced, talent design should follow this integration protocol:

1. **Identify mechanical hooks** — What dice rolls, resources, or decisions does the new system use?
2. **Map hooks to skills** — Which skills logically interact with these hooks?
3. **Design integration talents** — Create 2–3 talents per system that use system-specific triggers and effects.
4. **Validate against archetypes** — Ensure integration talents benefit the archetypes that thematically align.

### 11.2 Scaling Talent Power at High Ranks

| Rank | Power Budget | Frequency | Scope |
|------|-------------|-----------|-------|
| 1 | Minor option unlock | At-will or per-scene | Self |
| 2 | Moderate payoff | Per-scene or conditional | Self + adjacent |
| 3 | Encounter-shaping | Per-scene or daily | Close range |
| 4 | Encounter-defining | Daily or costly | Short range / party |
| 5 | Session-defining | Daily / session | Scene-wide / narrative |

### 11.3 Avoiding Common Pitfalls

- **Don't inflate numbers.** Rank 4–5 talents should provide new options, not just +2 instead of +1.
- **Don't obsolete lower ranks.** Rank 5 Evasion shouldn't make Rank 3 Evasion feel pointless — it should expand the ability's scope.
- **Don't create mandatory talents.** No talent at any rank should be so powerful that skipping it is a trap.
- **Don't ignore non-combat.** Every Rank 4–5 talent should have at least secondary utility, exploration, or social applications.
- **Don't break bounded power.** Rank 5 is mortal pinnacle. No auto-wins, no reality-warping, no effects that bypass all defenses.

### 11.4 Talent Maintenance Schedule

- **Per release cycle:** Audit new talents against archetype coverage, system integration, and role distribution.
- **Per new system:** Run an integration analysis (see §5 pattern) and produce talent proposals.
- **Per 20 new talents:** Re-evaluate skill balance, rank distribution, and defensive variety metrics.

---

## Appendix A: Skill-by-Skill Talent Inventory

### General Skills

**Athletics (9 talents)**
Athletic Movement (R3), Bulky (R3), Escape Artist (R3), Evasion (R3), Fast Stride (R3), Grappler (R3), Light Armor Mastery (R3), Stand Your Ground (R3), Supernatural Mobility (stub)

**Fortitude (11 talents)**
Adrenaline Rush (stub), Battle Rage (R3), Body of Bronze (R3), Drunken Technique (R3), Explorer's Tenacity (R3), Hard to Kill (R3), Heavy Armor Mastery (R3), Juggernaut (R3), Second Wind (R3), Strong Mind (R3), Tough Stomach (R3)

**Influence (7 talents)**
Born Haggler (R3), Fast Talking (R3), Inspire Ally (R3), Insult to Injury (R3), Leading Presence (R3), Performer (stub), Presence of Conquest (stub)

**Insight (5 talents)**
Empath (R3), Foresight (stub), Intuitive Appraisal (R3), Piercing Look (R3), Sense of Deduction (R3)

**Perception (5 talents)**
Blind Senses (R3), Danger Sense (R3), Dungeon Delver (R3), Eagle Eye (R3), Identify Weakness (R3)

**Stealth (6 talents)**
Assassination (R3), Devious Tactics (R3), Hidden Strike (R3), Leading the Way (R3), Roguish Wits (R3, incomplete), Sleight of Hand (R3, incomplete)

### Expert Skills

**Arcana (8 talents)**
Arcane Spell Knowledge (R4), Battle Mage (R4), Inexhaustible Mind (R3), Mana Shield (R3), Master of Fundamentals (R3), Spellblade (R3), Spellweaver (R3), Wild Overload (R3)

**Archery (9 talents)**
Ammo Specialist (R3), Art of Archery (R4), Crossbow Mastery (R3), Disciplined Archer (R3), Expert Slinger (R3), Rapid Shot (R3), Reflexive Shooter (R3), Sharpshooter (R3), Strong Grip (R3)

**Crafting (6 talents)**
Artisan (R3), Efficient Worker (R3), Maintenance (R3), Master Artisan (stub), Peak Performance (R3), Quick Construction (R3)

**Education (6 talents)**
Commander (R3), Diplomat (R3), Eloquent Talker (R3), General Education (R3), Linguist (R3), Tactician (R3)

**Fighting (14 talents)**
Art of Fighting (R4), Axe Mastery (R3), Blade Mastery (R3), Defensive Dueling (R3), Disciplined Fighter (R3), Dual Wielder (R3), Heavy Weapon Mastery (R3), Mace Mastery (R3), Martial Artist (R3), Polearm Mastery (R3), Protective Stance (R3), Pugilist (R3), Riposte (R3), Shield Mastery (R3)

**Lore (6 talents)**
Channel Superstition (R3), Consult the Myths (R3), Divine Scholar (R3), Identify Artifact (R3), Mage Hunter (R3), Magical Sense (R4, R4 incomplete)

**Mysticism (11 talents)**
Armor of the Faithful (R3), Communal Practices (R3), Divine Favor (stub), Divine Rites (R3), Divine Sense (R3), Elemental Adept (R3), Master of Principles (R3), Mystic Champion (R3), Mystical Spell Knowledge (R4), Pact of Devotion (R3), Shape Changer (R3)

**Nature (8 talents)**
Animal Companion (R3), Beast Lore (R3), Expert Rider (R3), Field Medic (R3), Herbalist (stub), Knowledgeable Wanderer (R3, R3 incomplete), Plant Lore (R3, R3 incomplete), Poison Maker (R3)

**Streetwise (4 talents)**
I Know A Guy (R3, R2–3 incomplete), Jack of All Trades (R3), Swashbuckler (R3), Thug Tactics (R3)

**Survival (7 talents)**
Explorer of Nature (R3, R3 incomplete), Makeshift Artisan (R3), Monster Hunter (R3), Relentless Tracker (R3, R2–3 incomplete), Trap Maker (R3), Wilderness Expert (R3, R3 incomplete)

---

## Appendix B: Archetype-to-Talent Cross-Reference

| Archetype | Pillar | Support 1 | Support 2 | Support 3 | Accessible Talents | Critical Gaps |
|-----------|--------|-----------|-----------|-----------|-------------------|---------------|
| Apothecary | Crafting | Education | Nature | Insight | 25 | Alchemy, remedies |
| Barbarian | Fighting | Athletics | Fortitude | Survival | 41 | — |
| Bard | Mysticism | Influence | Education | Stealth | 30 | Music magic, performance |
| Brawler | Fighting | Fortitude | Streetwise | Athletics | 38 | — |
| Champion | Fighting | Mysticism | Influence | Fortitude | 43 | — |
| Druid | Mysticism | Nature | Survival | Lore | 32 | — |
| Duelist | Fighting | Athletics | Stealth | Influence | 36 | Feint mechanics |
| Engineer | Crafting | Education | Archery | Perception | 26 | Contraptions, siege |
| Fighter | Fighting | Athletics | Fortitude | Influence | 41 | Zone control |
| Gladiator | Fighting | Athletics | Influence | Fortitude | 41 | — |
| Hoplite | Fighting | Athletics | Influence | Fortitude | 41 | Formation, zone control |
| Magus | Arcana | Fighting | Education | Lore | 34 | — |
| Monk | Fighting | Athletics | Fortitude | Mysticism | 45 | — |
| Oracle | Mysticism | Lore | Insight | Education | 28 | Prophecy, omens |
| Priest | Mysticism | Education | Influence | Fighting | 38 | — |
| Ranger | Archery | Survival | Nature | Insight | 29 | Advanced tracking |
| Rogue | Fighting | Stealth | Streetwise | Insight | 29 | Infiltration |
| Shaman | Mysticism | Nature | Lore | Insight | 30 | Spirit medium |
| Slinger | Archery | Athletics | Stealth | Survival | 31 | — |
| Sorcerer | Arcana | Lore | Education | Insight | 25 | — |
| Summoner | Arcana | Education | Lore | Insight | 25 | Summon mechanics |
| Swashbuckler | Fighting | Athletics | Stealth | Influence | 36 | — |
| Tamer | Fighting | Nature | Athletics | Survival | 38 | Whip, beast training |
| Warlock | Arcana | Lore | Insight | Fortitude | 30 | Pact, curses, familiar |
| Warlord | Fighting | Influence | Education | Fortitude | 38 | Tactical commands |

---

## Appendix C: Combat Arts Interaction

The current system has 31 basic combat arts and 15 supreme combat arts (46 total). Talents interact with combat arts in several ways:

| Interaction Type | Examples | Count |
|-----------------|----------|-------|
| **Enable combat art use** | Art of Fighting (learn basic arts), Art of Archery (learn basic arts) | 2 |
| **Enhance combat art effects** | Weapon mastery talents (add damage/properties to specific weapons) | 6 |
| **Complement combat arts** | Disciplined Fighter (reliability), Rapid Shot (action economy) | 8 |
| **Substitute for combat arts** | Grappler (grapple options), Dual Wielder (off-hand attacks) | 3 |

**Gap:** No talents currently enhance or modify supreme combat arts. As supreme arts represent mastery, Rank 4–5 talents should explicitly interact with them (e.g., reduced costs, enhanced effects, new combinations).

---

**End of Analysis**
