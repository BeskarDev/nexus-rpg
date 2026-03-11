# Combat Arts — Design Analysis

> **Scope:** Distribution, balance, and design analysis of basic and supreme Combat Arts. Covers weapon category spread, role coverage, archetype support, basic-to-supreme upgrade philosophy, power scale alignment, and actionable recommendations for improvements and new content.

---

## 1. Executive Summary

### Key Findings

1. **Supreme Combat Arts are 93% Offense-focused.** Of 15 supreme arts, 14 are pure damage/AoE abilities. Only Supreme Disarm serves a Control role. Defense, Support, and Utility have zero supreme representation — martial masters currently lack endgame tactical versatility.
2. **Basic Combat Arts have solid role diversity — supreme arts collapse it.** Basic arts distribute 45% Offense / 41% Control / 7% Defense / 3% Support / 3% Utility. The jump to supreme narrows to 93% Offense / 7% Control, eliminating all non-damage roles at the mastery tier.
3. **Shield and ranged weapon categories are under-served at the supreme tier.** Shield has 1 supreme art (Shield Avalanche), Crossbow has 1 (Devastating Piercer), and Thrown has 1 unique option (Projectile Storm) plus Supreme Barrage. Blade leads with 6 supreme options.
4. **The Hoplite archetype is critically bottlenecked.** With only Shield + Polearm weapon access, the Hoplite has access to approximately 8 basic combat arts and only 2 supreme arts (Shield Avalanche, Death from Above). This is a 3:1 disadvantage compared to Blade-focused archetypes.
5. **The upgrade model is sound: most supreme arts should be new abilities.** Only 4 of 15 supreme arts replace basic versions (Barrage, Cleave, Disarm, Feint). The remaining 11 are entirely new — a ~27% upgrade / ~73% new ratio that preserves basic art relevance while adding fresh mastery-tier options.
6. **Combat Arts successfully provide "spell-like options for martial characters"** at the basic tier, with condition infliction, AoE, and tactical maneuvers. However, the supreme tier retreats into raw damage, undercutting this design goal at the mastery level.
7. **Power scale is well-calibrated for a sword-and-sorcery setting.** Supreme arts like Dashing Strike, Force Slash, and Earth-shattering Strike evoke mythic warrior tropes (Achilles, Gilgamesh) without crossing into reality-warping territory. A few arts trend toward anime-style spectacle (Hundred Palm Strike, Devastating Piercer) that may need tonal review.

### Design Principles

1. **Role parity across tiers** — If basic arts cover Offense, Control, Defense, Support, and Utility, supreme arts should maintain proportional representation across these roles, not collapse into a single category.
2. **Weapon equity at mastery** — Every weapon category should have at least 2 unique supreme arts to ensure no archetype is starved of endgame options.
3. **Upgrade vs. new ratio** — Maintain the current ~25% upgrade / ~75% new ratio for supreme arts. Upgrades reward investment in foundational moves; new arts reward mastery with entirely new tactical options.
4. **Mythic, not supernatural** — Supreme arts should evoke the legendary warriors of Bronze Age myth — Achilles' speed, Heracles' strength, Odysseus' cunning — not anime power scaling. Effects should be extraordinary but grounded in physical mastery channeled through "soul power."
5. **Tactical choice density** — Each combat art should present a meaningful tactical decision (trade accuracy for damage, sacrifice mobility for control, etc.), not just "deal more damage."

---

## 2. Current System Inventory

### 2.1 Basic Combat Arts (29 total)

| Name | Weapons | Melee/Ranged | Primary Role |
|------|---------|-------------|-------------|
| Aimed Shot | Bow, Crossbow, Thrown | Ranged | Offense |
| Barrage | Bow, Thrown | Ranged | Offense |
| Brutal Strike | Axe, Blade, Mace, Polearm | Melee | Offense |
| Charge | Axe, Blade, Mace, Polearm, Shield | Melee | Offense |
| Choking Grip | Brawling, Thrown | Both | Control |
| Cleave | Axe, Blade, Mace, Polearm | Melee | Offense |
| Deep Cut | Axe, Blade, Brawling, Polearm | Melee | Offense |
| Defensive Strike | Axe, Blade, Brawling, Mace, Polearm, Shield | Melee | Defense |
| Disabling Shot | Bow, Crossbow, Thrown | Ranged | Control |
| Disarm | Axe, Blade, Brawling, Mace, Polearm | Melee | Control |
| Disarming Shot | Bow, Crossbow, Thrown | Ranged | Control |
| Divert Attention | Axe, Blade, Brawling, Mace, Polearm | Melee | Control |
| Evasive Strike | Axe, Blade, Brawling, Polearm | Melee | Defense |
| Exhilarating Strike | Axe, Blade, Brawling, Mace, Polearm | Melee | Support |
| Feint | Blade, Brawling, Polearm | Melee | Offense |
| Felling Strike | Axe, Blade, Brawling, Mace, Polearm, Thrown | Both | Control |
| Flurry | Axe, Blade, Brawling, Mace, Polearm | Melee | Offense |
| Head Smack | Brawling, Mace, Shield | Melee | Control |
| Knockout | Brawling, Mace, Shield | Melee | Control |
| Pinning Shot | Bow, Crossbow, Thrown | Ranged | Control |
| Power Shot | Bow, Crossbow, Thrown | Ranged | Offense |
| Precise Shot | Bow, Crossbow, Thrown | Ranged | Offense |
| Precise Strike | Blade, Brawling, Polearm | Melee | Offense |
| Quick Lunge | Blade, Brawling, Polearm | Melee | Offense |
| Ram Down | Brawling, Mace, Shield | Melee | Control |
| Snare | Brawling, Thrown | Both | Control |
| Splinter | Axe, Mace | Melee | Utility |
| Terrifying Strike | Axe, Blade, Mace, Polearm | Melee | Control |
| Volley | Bow, Crossbow, Thrown | Ranged | Offense |

### 2.2 Supreme Combat Arts (15 total)

| Name | Weapons | Melee/Ranged | Primary Role | Replaces Basic? |
|------|---------|-------------|-------------|----------------|
| Dashing Strike | Axe, Blade, Brawling, Mace | Melee | Offense | No |
| Death from Above | Polearm | Melee | Offense | No |
| Devastating Piercer | Crossbow | Ranged | Offense | No |
| Earth-shattering Strike | Mace | Melee | Offense | No |
| Force Slash | Axe, Blade, Polearm | Melee | Offense | No |
| Hundred Palm Strike | Brawling | Melee | Offense | No |
| Perfect Shot | Bow | Ranged | Offense | No |
| Phantom Cut | Blade | Melee | Offense | No |
| Projectile Storm | Thrown | Ranged | Offense | No |
| Rip and Tear | Axe | Melee | Offense | No |
| Shield Avalanche | Shield | Melee | Offense | No |
| Supreme Barrage | Bow, Thrown | Ranged | Offense | Barrage |
| Supreme Cleave | Axe, Blade, Mace, Polearm | Melee | Offense | Cleave |
| Supreme Disarm | Axe, Blade, Brawling, Mace, Polearm | Melee | Control | Disarm |
| Supreme Feint | Blade, Brawling, Polearm | Melee | Offense | Feint |

---

## 3. Distribution Analysis

### 3.1 Weapon Category Coverage

The table below shows how many basic and supreme arts each weapon category can access.

| Weapon Category | Basic Arts | Supreme Arts | Total | Supreme Gap? |
|-----------------|-----------|-------------|-------|-------------|
| Brawling | 16 | 4 | 20 | — |
| Blade | 15 | 6 | 21 | — |
| Polearm | 15 | 5 | 20 | — |
| Mace | 14 | 4 | 18 | — |
| Axe | 13 | 5 | 18 | — |
| Thrown | 11 | 2 | 13 | ⚠ Low supreme |
| Bow | 8 | 2 | 10 | ⚠ Low supreme |
| Crossbow | 7 | 1 | 8 | ⚠ Very low supreme |
| Shield | 5 | 1 | 6 | ⚠ Very low supreme |

**Findings:**
- **Blade** leads with 21 total options — the most versatile weapon category, consistent with its flexible properties (pierce/slash swapping via talents).
- **Brawling** is close behind at 20, supported by strong talent synergies (Pugilist, Martial Artist).
- **Crossbow and Shield** each have only 1 supreme art. Crossbow Mastery and Shield Mastery talents compensate somewhat, but the combat art bottleneck is real.
- **Ranged weapons collectively** (Bow + Crossbow + Thrown) have 5 supreme arts vs. melee's 12 unique supreme arts — a 2.4:1 ratio that disadvantages pure ranged builds at endgame.

### 3.2 Role Distribution

| Role | Basic Count | Basic % | Supreme Count | Supreme % | Change |
|------|-----------|---------|--------------|-----------|--------|
| Offense | 13 | 45% | 14 | 93% | ⬆ +48% |
| Control | 12 | 41% | 1 | 7% | ⬇ −34% |
| Defense | 2 | 7% | 0 | 0% | ⬇ −7% |
| Support | 1 | 3% | 0 | 0% | ⬇ −3% |
| Utility | 1 | 3% | 0 | 0% | ⬇ −3% |
| **Total** | **29** | **100%** | **15** | **100%** | |

**Critical Finding:** The supreme tier collapses role diversity. Basic arts offer a healthy mix of Offense and Control (86% combined) with meaningful Defense, Support, and Utility options. At the supreme level, role variety is virtually eliminated — 14 of 15 arts are Offense.

This contradicts the stated design goal that Combat Arts should provide "spell-like options for martial characters." Spellcasters gain access to more powerful control, defense, and support options at higher ranks. Martial masters get... more ways to deal damage.

### 3.3 Melee vs. Ranged Split

| Category | Basic | Supreme | Total |
|----------|-------|---------|-------|
| Melee-only | 18 (62%) | 11 (73%) | 29 (66%) |
| Ranged-only | 8 (28%) | 4 (27%) | 12 (27%) |
| Both (Melee & Ranged) | 3 (10%) | 0 (0%) | 3 (7%) |

**Finding:** The melee-ranged split is roughly 2:1, which aligns with the game's six melee weapon categories vs. three ranged categories. However, **no supreme arts serve both melee and ranged**, while three basic arts do (Choking Grip, Felling Strike, Snare). This creates a cleaner melee/ranged identity at the supreme tier but may disadvantage hybrid builds.

---

## 4. Basic vs. Supreme Design Analysis

### 4.1 Definitions and Gameplay Impact

**Basic Combat Arts** serve as the foundational tactical toolkit for martial characters. They provide:
- **Condition infliction** (frightened, dazed, stunned, confused, prone, restrained, bleeding)
- **Action compression** (attack + Shove, attack + Trip, attack + Disarm, attack + Defend, attack + Retreat)
- **Damage modifiers** (bonus damage from attributes, AV penetration, multi-target)
- **Tactical trade-offs** (accept a bane for extra attacks, sacrifice mobility for accuracy)

Basic arts are well-designed with clear triggers, costs, and scaling through Success Levels (Weak/Strong/Critical). They successfully make martial characters tactically interesting, not just "I attack" every turn.

**Supreme Combat Arts** are intended to represent "the ultimate abilities any warrior can achieve... tapping into the very power of a warrior's soul." In practice, they currently deliver:
- **Signature weapon fantasies** (one unique art per weapon category)
- **AoE damage** (Force Slash, Earth-shattering Strike, Shield Avalanche, Projectile Storm)
- **Mobility + damage combos** (Dashing Strike, Death from Above)
- **Scaling multi-hits** (Hundred Palm Strike, Supreme Barrage, Devastating Piercer)
- **Upgraded basics** (Supreme Cleave, Supreme Disarm, Supreme Barrage, Supreme Feint)

### 4.2 Upgrade Philosophy Assessment

The current split is **4 upgrades vs. 11 new abilities** (~27% upgrade / ~73% new). This is a strong ratio:

**Strengths of the current approach:**
- Upgrades reward long-term investment in core combat arts (Cleave → Supreme Cleave feels earned).
- New abilities add entirely fresh tactical options at mastery, keeping progression exciting.
- Basic arts remain relevant — a master doesn't abandon Defensive Strike; they gain new options alongside it.

**Recommendation:** Maintain this ratio. Not every basic art needs an upgrade. Candidates for future upgrades should be arts that represent a *style* rather than a single trick — arts where "doing it better" creates meaningfully different gameplay. Conversely, arts like Defensive Strike or Evasive Strike are already complete at their basic level.

### 4.3 What Makes a Good Supreme Combat Art?

Analyzing the current supreme arts, the strongest designs share these traits:

| Trait | Good Examples | Weak Examples |
|-------|-------------|--------------|
| **Weapon-specific fantasy** | Death from Above (polearm leap), Perfect Shot (archer focus), Rip and Tear (axe devastation) | Supreme Cleave (just "+2 targets and range") |
| **Tactical decision embedded** | Rip and Tear (damage vs. armor destruction based on target), Devastating Piercer (line targeting, miss mechanics) | Supreme Barrage (same as Barrage but +1 attack) |
| **Clear visual/narrative identity** | Dashing Strike (supernatural speed dash), Earth-shattering Strike (ground destruction) | Supreme Feint (+4 damage and marked) |
| **Mythic but grounded** | Force Slash (projected energy arc), Perfect Shot (absolute focus state) | Hundred Palm Strike (anime-adjacent) |

**Design Principle for Supreme Arts:**

A supreme combat art should be:
1. A **signature move** — immediately identifiable with its weapon fantasy.
2. **Tactically distinct** — not just "basic art but more damage." It should open new tactical options or change how the weapon is used.
3. **Mythic in scale** — evocative of legendary warriors, not mundane competence. Think Achilles' impossible speed, not just "very fast."
4. **Bounded in power** — impressive but mortal-scale. No teleportation, no instant kills, no magic duplication.

---

## 5. Balance Assessment

### 5.1 Potentially Overtuned Arts

**Hundred Palm Strike (Supreme, Brawling)**
- At Critical: 4 separate weak hits means 4× (base damage + weapon damage), each applied independently against AV. With Pugilist R3 (4 weapon damage) and a d10 Strength (base 5), that's 4 × (5 + 4) = 36 total damage *before AV*, compared to a normal critical's 5 + 12 = 17 damage.
- Multi-hit creates extreme synergy with on-hit effects (bleeding from enchantments, condition triggers from talents).
- **Recommendation:** Consider capping at 3 hits on Critical, or specifying that on-hit effects trigger only once. Alternatively, clarify that AV applies to each hit separately (which is already implied but worth making explicit), as AV application per-hit is the natural balancing mechanism.

**Perfect Shot (Supreme, Bow)**
- Ignores ALL banes on the attack AND ignores AV AND briefly stuns. This stacks three powerful effects with no trade-off.
- Compared to Precise Shot (basic), which trades a bane for partial AV ignore, Perfect Shot is a strict upgrade with no cost.
- **Recommendation:** Consider requiring an immobility condition ("If you haven't moved this turn and didn't move last turn") to add a positioning cost, or remove the stun to focus the art's identity on precision rather than doing everything.

**Devastating Piercer (Supreme, Crossbow)**
- The line-pierce mechanic with escalating damage reduction is mathematically complex. The "+1 weapon damage on first target, −3 weapon damage on fifth target" formula creates situations where the fifth target might take negligible damage.
- The "misses don't count toward reduction" clause makes this exceptionally strong in mixed-defense groups.
- **Assessment:** Complex but thematically excellent. The mathematical complexity is a play-speed concern more than a balance concern. Consider simplifying the damage formula to "each target after the first takes −1 weapon damage" without the escalation.

### 5.2 Potentially Undertuned Arts

**Supreme Feint (Supreme, Blade, Brawling, Polearm)**
- Replaces Feint, but the upgrade is modest: same +1 boon requirement (no movement), adds +4 damage and marked (4).
- Compared to other supreme arts that dramatically change how you fight (Dashing Strike's teleport-attack, Death from Above's leap-strike), Supreme Feint is numerically incremental.
- **Recommendation:** Lean into the "master feint" fantasy. Consider: "On a hit, the target is briefly staggered" or "Your next attack this scene against the same target also gains +1 boon" — something that creates an ongoing tactical advantage rather than flat damage.

**Supreme Barrage (Supreme, Bow, Thrown)**
- Replaces Barrage with +2 attacks instead of +1, at escalating banes (+1/+2). The escalating bane structure makes the third attack extremely unlikely to hit at higher defenses.
- Compared to Rapid Shot R2 (talent: attack twice, no banes), Supreme Barrage is less reliable for 2 hits and adds a nearly-useless 3rd attack.
- **Recommendation:** Reduce banes to +0/+1 for the two extra attacks, or change the third attack to auto-hit for half damage to guarantee value.

### 5.3 Overlapping or Redundant Arts

**Knockout vs. Disabling Shot**
- These have nearly identical mechanics (Strength + Fortitude save, dazed/stunned progression) with different weapon requirements (melee crush/shield vs. ranged crush/heavy). The functional overlap is intentional (melee/ranged parallel) but the names don't signal this relationship.
- **Assessment:** Acceptable design — the melee/ranged parallel is a feature, not a bug.

**Cleave vs. Volley**
- These are exact melee/ranged mirrors (hit +2 additional creatures, subtract weapon damage). Good parallel design.
- **Assessment:** Clean and intentional.

**Brutal Strike vs. Power Shot**
- Exact melee/ranged mirrors (+1 bane for Strength-scaling damage). Good parallel design.
- **Assessment:** Clean and intentional.

### 5.4 Success Level Scaling Consistency

Most combat arts with Success Level scaling follow a clean pattern:

| Pattern | Examples |
|---------|---------|
| **Flat damage scaling** (+2/+3/+4) | Charge, Choking Grip |
| **Condition duration escalation** (briefly → short → hard to end) | Terrifying Strike, Divert Attention, Head Smack |
| **Effect + condition stacking** (effect → effect + prone → effect + prone + dazed) | Felling Strike, Ram Down |
| **Attribute fraction scaling** (1/4 → 1/2 → full) | Brutal Strike, Power Shot, Precise Strike |

This is well-designed and consistent. The exception is **Defensive Strike** and **Evasive Strike**, which have no Success Level scaling (always grant the same effect). This is appropriate for their defensive nature — scaling defense by Success Level would incentivize over-investment in defense.

---

## 6. Archetype Coverage Analysis

### 6.1 Combat Art Access by Archetype

The following maps key martial archetypes to their available combat arts based on weapon categories.

| Archetype | Primary Weapons | Total Basic | Total Supreme | Supreme Art Names |
|-----------|----------------|------------|--------------|-------------------|
| Duelist | Blade | 15 | 6 | Dashing Strike, Force Slash, Phantom Cut, Supreme Cleave, Supreme Disarm, Supreme Feint |
| Gladiator | Blade, Shield | 17 | 7 | Above + Shield Avalanche |
| Barbarian | Axe, Mace | 17 | 6 | Dashing Strike, Earth-shattering Strike, Force Slash, Rip and Tear, Supreme Cleave, Supreme Disarm |
| Brawler | Brawling, Shield | 17 | 4 | Dashing Strike, Hundred Palm Strike, Shield Avalanche, Supreme Disarm |
| Monk | Brawling | 16 | 4 | Dashing Strike, Hundred Palm Strike, Supreme Disarm, Supreme Feint |
| Fighter | Blade, Mace, Shield | 18 | 7 | Dashing Strike, Earth-shattering Strike, Phantom Cut, Shield Avalanche, Supreme Cleave, Supreme Disarm, Supreme Feint |
| Ranger | Bow, Thrown | 11 | 3 | Perfect Shot, Projectile Storm, Supreme Barrage (note: Devastating Piercer is Crossbow-only) |
| Slinger | Thrown | 11 | 2 | Projectile Storm, Supreme Barrage |
| Hoplite | Shield, Polearm | 8 | 2 | Death from Above, Shield Avalanche (note: Supreme Cleave requires two-handed, conflicting with shield) |

**Critical Gaps:**
- **Hoplite** has the fewest options by a wide margin. The shield-and-spear warrior archetype — one of the most iconic Bronze Age military roles — has effectively 2 usable supreme arts (Death from Above, Shield Avalanche).
- **Slinger** has only 2 supreme options, limiting the thrown weapon specialist's endgame identity.
- **Ranger** has limited supreme diversity with only 3 options (Perfect Shot, Projectile Storm, Supreme Barrage), and all are pure Offense.

### 6.2 Role Coverage by Archetype

| Archetype | Offense Arts | Control Arts | Defense Arts | Support Arts |
|-----------|-------------|-------------|-------------|-------------|
| Fighter | ✅ Strong | ✅ Good | ⚠ Defensive Strike only | ⚠ Exhilarating Strike only |
| Barbarian | ✅ Strong | ✅ Good | ⚠ Defensive Strike only | ⚠ Exhilarating Strike only |
| Duelist | ✅ Strong | ✅ Good | ✅ Defensive + Evasive Strike | ⚠ Exhilarating Strike only |
| Brawler | ✅ Strong | ✅ Excellent | ⚠ Defensive Strike only | ⚠ Exhilarating Strike only |
| Ranger | ✅ Good | ⚠ Pinning/Disabling only | ❌ None | ❌ None |
| Hoplite | ⚠ Limited | ⚠ Ram Down, Felling only | ⚠ Defensive Strike only | ❌ None |

**Finding:** Ranged archetypes (Ranger, Slinger) have no defensive or support combat arts at all. The only defensive ranged play comes from talents (Reflexive Shooter) and general actions (Retreat, Defend). This is a significant gap — archers in myth and history were also known for suppressive fire, covering retreats, and creating defensive perimeters.

---

## 7. Power Scale and Tonal Alignment

### 7.1 The "Soul Power" Framework

The overview text establishes that supreme arts "transcend mere physical ability and tap into the very power of a warrior's soul." This provides a clear thematic framework: supreme arts are extraordinary but not magical. They represent the mortal pinnacle where physical mastery and spiritual willpower converge.

### 7.2 Tonal Spectrum of Current Supreme Arts

| Category | Arts | Assessment |
|----------|------|-----------|
| **Mythic Warrior** (grounded extraordinary) | Death from Above, Force Slash, Perfect Shot, Rip and Tear, Shield Avalanche | ✅ These evoke Bronze Age legendary warriors — Achilles' leap, a blade that cuts the air itself, an archer who never misses. Excellent tonal fit. |
| **Heroic Enhancement** (clearly superhuman) | Dashing Strike, Earth-shattering Strike, Phantom Cut, Projectile Storm | ✅ Clearly beyond normal human ability but grounded in physical mastery. Shattering stone with a mace strike or projecting force from a blade feels appropriately mythic. |
| **Anime-adjacent** (spectacle-forward) | Hundred Palm Strike, Devastating Piercer | ⚠ These trend toward cinematic martial arts anime tropes. "Countless blows in the blink of an eye" and "bolt pierces through five creatures" push toward superhero territory. |
| **Mechanical upgrade** (no narrative fantasy) | Supreme Barrage, Supreme Cleave, Supreme Feint | ⚠ These are numerical improvements without strong narrative identity. "Hit more targets" and "deal more damage" don't evoke the "soul power" fantasy. |

### 7.3 Tonal Recommendations

**Target tone:** The **Mythic Warrior** and **Heroic Enhancement** categories represent the ideal power band. Supreme arts should feel like:

> "This warrior's skill is so extraordinary that witnesses struggle to believe what they've seen — but it was unmistakably physical, not magical."

**Guidelines for new supreme arts:**
- ✅ **Do:** Break the ground with a mace strike, project cutting force through the air, move faster than the eye can follow for a single burst.
- ✅ **Do:** Reference mythological warrior archetypes — Greek heroes, Mesopotamian demigods, Persian Immortals, Egyptian champions.
- ⚠ **Limit:** Multi-hit effects that imply dozens of strikes per second, effects that ignore all defensive mechanics simultaneously.
- ❌ **Avoid:** Flight, teleportation (Dashing Strike's "supernatural speed" is at the boundary), energy blasts unconnected to a weapon strike, effects that would logically be classified as magic.

---

## 8. Gap Analysis and Expansion Recommendations

### 8.1 Supreme Arts — Role Gap Fills

The most critical gap is the absence of non-Offense supreme arts. The following recommendations add Defense, Control, Support, and Utility options at the supreme tier.

#### Recommended Supreme Combat Arts — Defense

| Name | Weapons | Concept |
|------|---------|---------|
| **Immovable Stance** | Mace, Polearm, Shield | The warrior plants themselves with immovable resolve. Briefly become immune to being pushed, knocked prone, or moved. Gain resistance to all damage until start of next turn. Requires not moving this turn. |
| **Iron Curtain** | Shield | Slam your shield into the ground, creating a barrier of force. All allies behind you within close range gain +2 AV (situational bonus) until start of your next turn. You can't attack or move. |

#### Recommended Supreme Combat Arts — Control

| Name | Weapons | Concept |
|------|---------|---------|
| **Supreme Terrifying Strike** | Axe, Blade, Mace, Polearm | Replaces Terrifying Strike. Your strike carries such ferocity that all enemies within close range who witness the hit must roll Spirit + Fortitude or become briefly frightened. Stronger success levels extend duration and increase difficulty. |
| **Pinning Barrage** | Bow, Crossbow, Thrown | Fire a hail of projectiles that pin enemies in place. Choose a point within range; all creatures within close range of that point must roll Agility + Athletics or have their Movement become 0 for a short duration. |

#### Recommended Supreme Combat Arts — Support

| Name | Weapons | Concept |
|------|---------|---------|
| **Supreme Exhilarating Strike** | Axe, Blade, Brawling, Mace, Polearm | Replaces Exhilarating Strike. Your legendary blow inspires extraordinary courage in your allies. Heal and boon effects increased, and on Critical, one ally within close range can immediately use a Quick Action. |
| **Warden's Challenge** | Polearm, Shield | Strike with such authority that the target is compelled to focus on you. On a hit, the target is distracted by you for a short duration and you gain +1 boon on defensive rolls against them. |

#### Recommended Supreme Combat Arts — Utility

| Name | Weapons | Concept |
|------|---------|---------|
| **Supreme Splinter** | Axe, Mace | Replaces Splinter. Your strike shatters equipment with devastating efficiency. Automatic item damage on hit (no Durability check), and on Strong/Critical, destroy the item outright. Can target environmental objects (doors, walls) for double weapon damage. |

### 8.2 Weapon Category Gap Fills

#### Shield (Currently 1 supreme art)

| Name | Concept |
|------|---------|
| **Iron Curtain** | (See Defense recommendation above) |
| **Shield Charge** | Barrel forward with shield raised, targeting up to 2 creatures in a line within short range. Each hit target is pushed close and knocked prone. You move to the final target's position. Replaces Charge while wielding a shield. |

#### Crossbow (Currently 1 supreme art)

| Name | Concept |
|------|---------|
| **Pinning Barrage** | (See Control recommendation above — also available to Crossbow) |
| **Siege Bolt** | Your crossbow bolt strikes with the force of a siege weapon. On a hit, deal triple weapon damage and the target is briefly staggered. If the target is behind cover, the bolt destroys the cover. |

#### Thrown (Currently 1 unique + 1 shared supreme art)

| Name | Concept |
|------|---------|
| **Ricochet Strike** | Your thrown weapon bounces between targets. Hit up to 3 creatures within short range of each other. Each target after the first takes −1 weapon damage. The weapon returns to your hand. |

### 8.3 Archetype-Specific Gap Fills

#### Hoplite Support

The Hoplite archetype needs combat arts that reward the Shield + Polearm combination specifically:

| Name | Weapons | Concept |
|------|---------|---------|
| **Shield Wall** | Shield | While wielding a shield and a polearm, you and all adjacent allies wielding shields gain +2 AV (situational bonus) until the start of your next turn. You can't move while this effect is active. |
| **Formation Thrust** | Polearm | While wielding a polearm and a shield, make a piercing thrust that targets Dodge instead of Parry. On a hit, the target is pushed close. If an ally is adjacent to the target's new position, the target is also briefly restrained. |

#### Ranged Defensive Options

| Name | Weapons | Concept |
|------|---------|---------|
| **Suppressive Fire** | Bow, Crossbow | Choose an area within range. Until the start of your next turn, any enemy that enters or moves within that area provokes a free ranged attack from you (once per enemy). You can't use other Combat Arts while this effect is active. |

---

## 9. Design Principles for Future Supreme Combat Arts

Based on this analysis, the following principles should guide the creation of new supreme combat arts:

### 9.1 Should Every Basic Art Have a Supreme Version?

**No.** The current 4-of-15 upgrade ratio (~27%) is appropriate. Supreme upgrades should be reserved for basic arts that:

1. **Define a playstyle** — Cleave is the core of "AoE melee fighter"; it earns an upgrade. Defensive Strike is a utility tool; it doesn't need one.
2. **Have room to grow narratively** — Barrage → Supreme Barrage works because "shoot more arrows faster" scales naturally. Evasive Strike → "Supreme Evasive Strike" would just be... retreating harder?
3. **Don't already scale through Success Levels** — Arts with strong Weak/Strong/Critical scaling (Charge, Terrifying Strike) already grow with character power. Arts with flat effects (Cleave, Disarm, Feint) benefit more from explicit upgrades.

**Candidates for future upgrades:**
- **Terrifying Strike → Supreme Terrifying Strike** (AoE fear)
- **Exhilarating Strike → Supreme Exhilarating Strike** (enhanced team support)
- **Splinter → Supreme Splinter** (reliable equipment destruction)
- **Pinning Shot → Supreme Pinning Shot** (AoE pinning for ranged control)

**Not recommended for upgrades:**
- Defensive Strike, Evasive Strike (complete at basic)
- Brutal Strike, Power Shot (already scale via attributes)
- Quick Lunge, Precise Strike (already scale via Success Levels)
- Aimed Shot (already modified by Sharpshooter talent)

### 9.2 Power Ceiling Guidelines

Supreme combat arts should sit at the following power band:

| Benchmark | Description |
|-----------|------------|
| **Floor** | Equivalent to a Rank 2–3 combat spell (e.g., a targeted attack spell with a condition) |
| **Ceiling** | Equivalent to a Rank 4 combat spell (e.g., AoE damage with meaningful condition, or single-target devastating strike) |
| **Never exceed** | Rank 5 spells, which represent the absolute peak of magical power |

This ensures martial masters feel powerful and competitive with spellcasters at endgame while respecting the magic system's design space.

### 9.3 Design Checklist for New Supreme Combat Arts

When designing a new supreme combat art:

- [ ] Does it have a **clear weapon-specific fantasy** that players can visualize?
- [ ] Does it present a **tactical choice** (cost, positioning requirement, or trade-off)?
- [ ] Is it **distinct from existing supreme arts** in function, not just weapon category?
- [ ] Does it fit the **Mythic Warrior or Heroic Enhancement** tonal band?
- [ ] If it replaces a basic art, does the basic art **define a playstyle** worth upgrading?
- [ ] Does it respect the **power ceiling** (equivalent to a Rank 3–4 spell, never Rank 5)?
- [ ] Does it fill a **role gap** (prioritize Defense, Control, Support, Utility over Offense)?
- [ ] Does the weapon category **need** more supreme options (prioritize Shield, Crossbow, Thrown, Bow)?
- [ ] Does it serve an **under-supported archetype** (prioritize Hoplite, Slinger, Ranger)?

---

## 10. Summary of Recommendations

### Priority 1 — Critical Gaps (Immediate)

| # | Recommendation | Impact | Effort |
|---|---------------|--------|--------|
| 1 | Add 2–3 supreme Defense arts (Immovable Stance, Iron Curtain) | Fills total gap in supreme defensive play | Medium |
| 2 | Add 1–2 supreme Control arts (Supreme Terrifying Strike, Pinning Barrage) | Restores control role lost from basic → supreme | Medium |
| 3 | Add 1 supreme Support art (Supreme Exhilarating Strike or Warden's Challenge) | Gives martial masters team support options | Medium |
| 4 | Add 1+ shield supreme art to support Hoplite archetype (Shield Wall, Shield Charge) | Addresses critical Hoplite bottleneck | Medium |

### Priority 2 — Balance Refinements (Soon)

| # | Recommendation | Impact | Effort |
|---|---------------|--------|--------|
| 5 | Clarify Hundred Palm Strike AV interaction and consider capping at 3 hits on Critical | Prevents extreme multi-hit scaling | Low |
| 6 | Add a cost or condition to Perfect Shot (immobility requirement) | Balances "ignore all penalties + ignore AV + stun" | Low |
| 7 | Revise Supreme Feint to be more tactically distinct (add stagger or ongoing advantage) | Elevates a weak supreme art to signature-move status | Low |
| 8 | Simplify Devastating Piercer damage formula (flat −1 per target after first) | Reduces play-speed friction without losing flavor | Low |

### Priority 3 — Expansion (Future)

| # | Recommendation | Impact | Effort |
|---|---------------|--------|--------|
| 9 | Add 1 supreme Crossbow art (Siege Bolt) | Addresses single-option weapon category | Low |
| 10 | Add 1 supreme Thrown art (Ricochet Strike) | Improves Slinger endgame options | Low |
| 11 | Add 1 ranged defensive art (Suppressive Fire) | Gives archers tactical depth beyond damage | Medium |
| 12 | Add Hoplite-specific combo art (Formation Thrust) | Rewards Shield + Polearm synergy | Medium |
| 13 | Consider a supreme Utility art (Supreme Splinter) for equipment-destruction niche | Unique non-damage endgame option | Low |

### Priority 4 — Documentation (Ongoing)

| # | Recommendation | Impact | Effort |
|---|---------------|--------|--------|
| 14 | Document the "Mythic Warrior" tonal guideline for supreme art design | Ensures tonal consistency in future content | Low |
| 15 | Add the supreme art design checklist (Section 9.3) to design guidelines | Standardizes future combat art creation | Low |
| 16 | Document the intended power ceiling (Rank 3–4 spell equivalence) | Prevents power creep in future supreme arts | Low |

---

## Appendix A: Combat Art Cross-Reference by Weapon Category

### Melee Weapon Categories

| Combat Art | Axe | Blade | Brawling | Mace | Polearm | Shield |
|-----------|-----|-------|----------|------|---------|--------|
| Brutal Strike | ✓ | ✓ | | ✓ | ✓ | |
| Charge | ✓ | ✓ | | ✓ | ✓ | ✓ |
| Choking Grip | | | ✓ | | | |
| Cleave | ✓ | ✓ | | ✓ | ✓ | |
| Deep Cut | ✓ | ✓ | ✓ | | ✓ | |
| Defensive Strike | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Disarm | ✓ | ✓ | ✓ | ✓ | ✓ | |
| Divert Attention | ✓ | ✓ | ✓ | ✓ | ✓ | |
| Evasive Strike | ✓ | ✓ | ✓ | | ✓ | |
| Exhilarating Strike | ✓ | ✓ | ✓ | ✓ | ✓ | |
| Feint | | ✓ | ✓ | | ✓ | |
| Felling Strike | ✓ | ✓ | ✓ | ✓ | ✓ | |
| Flurry | ✓ | ✓ | ✓ | ✓ | ✓ | |
| Head Smack | | | ✓ | ✓ | | ✓ |
| Knockout | | | ✓ | ✓ | | ✓ |
| Precise Strike | | ✓ | ✓ | | ✓ | |
| Quick Lunge | | ✓ | ✓ | | ✓ | |
| Ram Down | | | ✓ | ✓ | | ✓ |
| Snare | | | ✓ | | | |
| Splinter | ✓ | | | ✓ | | |
| Terrifying Strike | ✓ | ✓ | | ✓ | ✓ | |
| **Basic Total** | **13** | **15** | **16** | **14** | **15** | **5** |
| Dashing Strike | ✓ | ✓ | ✓ | ✓ | | |
| Death from Above | | | | | ✓ | |
| Earth-shattering Strike | | | | ✓ | | |
| Force Slash | ✓ | ✓ | | | ✓ | |
| Hundred Palm Strike | | | ✓ | | | |
| Phantom Cut | | ✓ | | | | |
| Rip and Tear | ✓ | | | | | |
| Shield Avalanche | | | | | | ✓ |
| Supreme Cleave | ✓ | ✓ | | ✓ | ✓ | |
| Supreme Disarm | ✓ | ✓ | ✓ | ✓ | ✓ | |
| Supreme Feint | | ✓ | ✓ | | ✓ | |
| **Supreme Total** | **5** | **6** | **4** | **4** | **5** | **1** |

### Ranged Weapon Categories

| Combat Art | Bow | Crossbow | Thrown |
|-----------|-----|----------|-------|
| Aimed Shot | ✓ | ✓ | ✓ |
| Barrage | ✓ | | ✓ |
| Choking Grip | | | ✓ |
| Disabling Shot | ✓ | ✓ | ✓ |
| Disarming Shot | ✓ | ✓ | ✓ |
| Felling Strike | | | ✓ |
| Pinning Shot | ✓ | ✓ | ✓ |
| Power Shot | ✓ | ✓ | ✓ |
| Precise Shot | ✓ | ✓ | ✓ |
| Snare | | | ✓ |
| Volley | ✓ | ✓ | ✓ |
| **Basic Total** | **8** | **7** | **11** |
| Devastating Piercer | | ✓ | |
| Perfect Shot | ✓ | | |
| Projectile Storm | | | ✓ |
| Supreme Barrage | ✓ | | ✓ |
| **Supreme Total** | **2** | **1** | **2** |

---

## Appendix B: Basic-to-Supreme Upgrade Tracker

| Basic Art | Has Supreme? | Supreme Name | Recommended for Upgrade? |
|-----------|-------------|-------------|-------------------------|
| Aimed Shot | No | — | No (scales via Sharpshooter talent) |
| Barrage | ✅ Yes | Supreme Barrage | — |
| Brutal Strike | No | — | No (scales via attributes) |
| Charge | No | — | No (scales via SL + Polearm Mastery) |
| Choking Grip | No | — | No (niche but complete) |
| Cleave | ✅ Yes | Supreme Cleave | — |
| Deep Cut | No | — | No (scales via SL) |
| Defensive Strike | No | — | No (complete at basic) |
| Disabling Shot | No | — | No (scales via SL) |
| Disarm | ✅ Yes | Supreme Disarm | — |
| Disarming Shot | No | — | No (ranged parallel to Disarm) |
| Divert Attention | No | — | No (scales via SL) |
| Evasive Strike | No | — | No (complete at basic) |
| Exhilarating Strike | No | — | **Yes** (team support worth scaling) |
| Feint | ✅ Yes | Supreme Feint | — |
| Felling Strike | No | — | No (scales via SL) |
| Flurry | No | — | No (scales via Disciplined Fighter) |
| Head Smack | No | — | No (scales via SL) |
| Knockout | No | — | No (scales via SL) |
| Pinning Shot | No | — | **Yes** (AoE pinning for ranged control) |
| Power Shot | No | — | No (scales via attributes) |
| Precise Shot | No | — | No (scales via SL) |
| Precise Strike | No | — | No (scales via SL) |
| Quick Lunge | No | — | No (complete at basic) |
| Ram Down | No | — | No (scales via SL) |
| Snare | No | — | No (niche but complete) |
| Splinter | No | — | **Yes** (unique utility niche) |
| Terrifying Strike | No | — | **Yes** (AoE fear for control) |
| Volley | No | — | No (ranged parallel to Cleave) |
