# New Combat Arts — Expansion Catalog GDD

> **Status:** Open design document. Extracted 2026-08-18 from the combat arts design analysis (archived at `_archive_/combat-arts-design-analysis.md`).

> **Scope:** Proposed new combat arts to fill the role, weapon category, and archetype gaps identified in the archived analysis. Each art can be approved and published individually. Redesigns of existing arts (Ghost Step, Storm of Arrows, Reaping Arc, Soul Rend) live in `combat-art-fixes-gdd.md`.

**Balance review required:** These proposals predate the 2026-07 talent and spell balance passes. Each art needs a review against current power budgets (and the supreme design checklist in `combat-art-fixes-gdd.md`) before publication. Numbers, conditions, and durations below are the original proposal text, preserved verbatim.

**Publication:** Canonical data is `src/utils/data/json/combat-arts.json`; docs pages under `docs/05-combat/05-combat-arts/` are generated from it (never hand-edit the `.mdx`). Publish an approved art to the JSON, then run `bun run content:gen`.

---

## 1. The Gaps These Arts Fill

### 1.1 Role Gaps at the Supreme Tier

Supreme arts are 93% Offense: of 15 supreme arts, 14 are pure damage/AoE. Only Supreme Disarm serves a Control role. Basic arts distribute 45% Offense / 41% Control / 7% Defense / 3% Support / 3% Utility — the jump to supreme collapses to 93% Offense / 7% Control, eliminating all non-damage roles at the mastery tier. Martial masters currently lack endgame tactical versatility, contradicting the design goal that Combat Arts provide "spell-like options for martial characters."

| Role | Basic Count | Supreme Count | Gap |
|------|-----------|--------------|-----|
| Offense | 13 | 14 | Oversaturated |
| Control | 12 | 1 | Severe |
| Defense | 2 | 0 | Total |
| Support | 1 | 0 | Total |
| Utility | 1 | 0 | Total |

### 1.2 Weapon Category Gaps

| Weapon Category | Basic Arts | Supreme Arts | Assessment |
|-----------------|-----------|-------------|------------|
| Brawling | 16 | 4 | Fine |
| Blade | 15 | 6 | Fine (leads) |
| Polearm | 15 | 5 | Fine |
| Mace | 14 | 4 | Fine |
| Axe | 13 | 5 | Fine |
| Thrown | 11 | 2 | Low supreme |
| Bow | 8 | 2 | Low supreme |
| Crossbow | 7 | 1 | Very low supreme |
| Shield | 5 | 1 | Very low supreme |

Ranged weapons collectively (Bow + Crossbow + Thrown) have 5 supreme arts vs. melee's 12 unique supreme arts — a 2.4:1 ratio that disadvantages pure ranged builds at endgame.

### 1.3 Archetype Gaps

| Archetype | Primary Weapons | Basic Arts | Supreme Arts | Problem |
|-----------|----------------|-----------|-------------|---------|
| Hoplite | Shield, Polearm | 8 | 2 | Critically bottlenecked — the iconic shield-and-spear warrior has only Death from Above and Shield Avalanche |
| Slinger | Thrown | 11 | 2 | Limited endgame identity |
| Ranger | Bow, Thrown | 11 | 3 | All supreme options are pure Offense |

Ranged archetypes also have **no defensive or support basic arts at all**: Exhilarating Strike, Defensive Strike, and Evasive Strike are melee-only. Archers are pure glass cannons with no defensive combat art — a gap at odds with archers in myth and history providing suppressive fire, covering retreats, and defensive perimeters.

Additional basic-tier gaps from the catalogue review: Shield has only 5 basic arts, and no art allows countering or interrupting an enemy action (Riposte is a talent, not a combat art).

---

## 2. Proposed New Basic Arts (Ranged Support and Defense)

### 2.1 Covering Fire (Basic, Ranged Support)

**Weapons:** Bow, Crossbow, Thrown

**Effect:** On a hit with a ranged weapon, choose one ally within close range of your target. That ally can immediately spend 1 Movement without provoking Opportunity Attacks. Additionally:
**Weak.** The ally gains +1 Dodge briefly.
**Strong.** The ally gains +1 Dodge and +1 Parry briefly.
**Critical.** Same as strong, and the target also has their Movement briefly reduced to 0.

**Rationale:** Fills the ranged Support gap. Gives Rangers and Slingers a way to protect allies through covering fire — a well-established archery tactic in history and myth.

### 2.2 Intercept (Basic, Ranged Defense)

**Weapons:** Bow, Crossbow, Thrown

**Effect:** You can use this Combat Art as your Action on your turn instead of making a normal attack. Choose an ally within short range. Until the start of your next turn, whenever that ally is targeted by a ranged attack, you can use your Quick Action to attempt to deflect the projectile. Roll Agility + Archery vs. the attacker's attack roll. On a success, the projectile is deflected and deals no damage. You can only deflect one attack this way per turn.

**Rationale:** Fills the ranged Defense gap. The timing is now clear: you spend your Action to enter a "covering" stance, then use your Quick Action reactively. Limited to one deflection per turn to prevent it from trivializing ranged enemies.

---

## 3. Proposed New Supreme Arts — Fully Drafted

These five arts have complete proposal text from the archived analysis (Appendix C.4).

### 3.1 Immovable Stance (Supreme, Defense)

**Weapons:** Mace, Polearm, Shield

**Effect:** You plant yourself with immovable resolve, channeling your soul's power into the ground beneath you. You can't move or be moved until the start of your next turn. You are immune to being knocked prone. You gain resistance to all damage until the start of your next turn. If you are wielding a shield, allies within close range also gain +1 AV (situational bonus) until the start of your next turn.

**Rationale:** Fills the supreme Defense gap. Rewards positional play — you trade all mobility for significant damage reduction and team protection.

### 3.2 Warden's Challenge (Supreme, Support/Control)

**Weapons:** Polearm, Shield

**Effect:** You strike with such authority that your target is compelled to face you. On a hit, the target is distracted by you for a short duration. While distracted by you from this art, you gain +1 boon on all attacks and defensive rolls against that target. Additionally, if the target attempts to move away from you while distracted, you can make one free Opportunity Attack against them (this does not require or consume your Quick Action, but can only trigger once per round).

**Rationale:** Fills the supreme Support gap and supports Hoplite/Fighter archetypes. Creates a "taunt" mechanic that draws enemy attention, enabling tanks to protect their allies. The free Opportunity Attack is limited to once per round to prevent abuse.

### 3.3 Thundering Blow (Supreme, Control — replaces Terrifying Strike)

**Weapons:** Axe, Blade, Mace, Polearm

**Effect:** *You can only learn this Combat Art if you already know Terrifying Strike. This Combat Art replaces Terrifying Strike.*
Your strike carries such ferocity that all who witness it are shaken to their core. On a hit, the primary target suffers the normal effects of Terrifying Strike. Additionally, all enemies within close range who can see the hit must also roll against being frightened:
**Weak.** Other enemies who fail are briefly frightened of you.
**Strong.** Other enemies are briefly frightened of you (no save).
**Critical.** Same as strong, and all frightened targets also have their Movement briefly reduced to 0 as they cower.

**Rationale:** Fills the supreme Control gap. AoE fear is a classic mythic warrior ability — the hero whose battle cry sends entire enemy formations into disarray.

### 3.4 Storm of Bolts (Supreme, Crossbow)

**Weapons:** Crossbow

**Effect:** You channel your soul's power into rapid-fire crossbow bolts. Despite the crossbow's normally slow reload, you fire three bolts in rapid succession at targets within your weapon's range. Roll your attack against up to three different targets. On a hit against each target, deal normal damage. Each target hit after the first takes −1 weapon damage. You don't need to reload between these shots, but must reload after this art as normal.

**Rationale:** Fills the Crossbow gap (currently only 1 supreme art). Crossbow identity is "slow but devastating" — this art breaks that limitation through soul power, creating a dramatic moment.

### 3.5 Ricochet Strike (Supreme, Thrown)

**Weapons:** Thrown

**Effect:** Your thrown weapon bounces between targets with supernatural precision. On a hit against your primary target, the weapon ricochets to up to 2 additional creatures within close range of each previous target. Roll your attack against each subsequent target. Each target after the first takes −1 weapon damage. After the final target, the weapon returns to your hand (no Supply check required for this use).

**Rationale:** Fills the Thrown gap. The ricochet fantasy is iconic for thrown weapon specialists and the weapon-return mechanic is a quality-of-life reward.

### 3.6 Shield Charge (Supreme, Shield — replaces Charge)

**Weapons:** Shield

**Effect:** *You can only learn this Combat Art if you already know Charge. This Combat Art replaces Charge while wielding a shield.*
You barrel forward with your shield raised, channeling your soul's power into an unstoppable advance. Target a point within short range that you can move to. You move to that point (this Movement doesn't provoke Opportunity Attacks). Roll your attack against every creature in your path. On a hit against each target, deal normal damage, subtract your weapon damage once, and the target is pushed close and knocked prone if it isn't of larger Size than you. After the charge, you gain +2 AV briefly.

**Rationale:** Fills the Shield gap and supports Hoplite/Fighter. The "unstoppable advance" fantasy is core to shield warrior mythology.

---

## 4. Concept-Stage Proposals (Not Yet Drafted)

These arts were recommended in the gap analysis (Section 8 of the archived document) but only exist as concepts. They need full drafting through the combat-art design workflow before approval.

### 4.1 Defense

| Name | Weapons | Concept |
|------|---------|---------|
| **Iron Curtain** | Shield | Slam your shield into the ground, creating a barrier of force. All allies behind you within close range gain +2 AV (situational bonus) until start of your next turn. You can't attack or move. |

### 4.2 Control

| Name | Weapons | Concept |
|------|---------|---------|
| **Pinning Barrage** | Bow, Crossbow, Thrown | Fire a hail of projectiles that pin enemies in place. Choose a point within range; all creatures within close range of that point must roll Agility + Athletics or have their Movement become 0 for a short duration. |

### 4.3 Support

| Name | Weapons | Concept |
|------|---------|---------|
| **Supreme Exhilarating Strike** | Axe, Blade, Brawling, Mace, Polearm | Replaces Exhilarating Strike. Your legendary blow inspires extraordinary courage in your allies. Heal and boon effects increased, and on Critical, one ally within close range can immediately use a Quick Action. Needs an evocative name per the naming guideline in `combat-art-fixes-gdd.md`. |

### 4.4 Utility

| Name | Weapons | Concept |
|------|---------|---------|
| **Supreme Splinter** | Axe, Mace | Replaces Splinter. Your strike shatters equipment with devastating efficiency. Automatic item damage on hit (no Durability check), and on Strong/Critical, destroy the item outright. Can target environmental objects (doors, walls) for double weapon damage. Needs an evocative name per the naming guideline in `combat-art-fixes-gdd.md`. |

### 4.5 Crossbow

| Name | Concept |
|------|---------|
| **Siege Bolt** | Your crossbow bolt strikes with the force of a siege weapon. On a hit, deal triple weapon damage and the target is briefly staggered. If the target is behind cover, the bolt destroys the cover. |

### 4.6 Hoplite-Specific

| Name | Weapons | Concept |
|------|---------|---------|
| **Shield Wall** | Shield | While wielding a shield and a polearm, you and all adjacent allies wielding shields gain +2 AV (situational bonus) until the start of your next turn. You can't move while this effect is active. |
| **Formation Thrust** | Polearm | While wielding a polearm and a shield, make a piercing thrust that targets Dodge instead of Parry. On a hit, the target is pushed close. If an ally is adjacent to the target's new position, the target is also briefly restrained. |

### 4.7 Ranged Defensive

| Name | Weapons | Concept |
|------|---------|---------|
| **Suppressive Fire** | Bow, Crossbow | Choose an area within range. Until the start of your next turn, any enemy that enters or moves within that area provokes a free ranged attack from you (once per enemy). You can't use other Combat Arts while this effect is active. |

---

## 5. Suggested Priority Order

From the archived analysis's recommendation summary, restated as an approval queue:

| Priority | Art | Fills |
|----------|-----|-------|
| 1 | Immovable Stance | Supreme Defense (total gap) |
| 1 | Thundering Blow | Supreme Control |
| 1 | Warden's Challenge | Supreme Support, Hoplite |
| 1 | Shield Charge | Shield tier gap, Hoplite bottleneck |
| 2 | Storm of Bolts | Crossbow tier gap |
| 2 | Ricochet Strike | Thrown tier gap, Slinger |
| 2 | Covering Fire | Basic ranged Support gap |
| 2 | Intercept | Basic ranged Defense gap |
| 3 | Iron Curtain, Pinning Barrage, Siege Bolt, Shield Wall, Formation Thrust, Suppressive Fire, Supreme Exhilarating Strike, Supreme Splinter | Remaining concepts, need drafting first |

**Design targets to preserve while expanding:** maintain the ~25% upgrade / ~75% new ratio for supreme arts, and aim for at least 2 unique supreme arts per weapon category so no archetype is starved of endgame options.
