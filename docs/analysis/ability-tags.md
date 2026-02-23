# Ability Tags: Standardized Tagging System

This document defines a structured set of ability tags for use across all folk abilities, talents, combat arts, and spells in Nexus RPG. Tags are organized into groups by category, each serving a distinct purpose for filtering and at-a-glance reference.

---

## Purpose

Ability tags provide a fixed vocabulary for describing **what an ability does** at a glance. They serve three goals:

1. **Filtering** — Quickly find abilities by what they do (e.g., show all `damage` + `fire` abilities, or all `healing` abilities available as a `quick-action`).
2. **At-a-glance clarity** — Instantly see what an ability offers in play without reading full text.
3. **Design consistency** — Give content creators a shared checklist when designing new abilities.

Tags are descriptive labels applied to abilities after they are designed. They do not change how an ability works, but they standardize how abilities are described and referenced. Metadata already shown elsewhere — such as source type, skill, magic school, range, target, duration, and spell properties — is **not** duplicated as tags.

---

## Tag Groups

Each ability receives one or more tags from the groups below. Not every group is required for every ability — apply only the groups that are relevant.

### 1. Effect

Describes what the ability mechanically does. Assign at least one effect tag. An ability may have multiple effect tags.

| Tag | Description |
| --- | --- |
| `damage` | Deals HP damage to a target. |
| `healing` | Restores HP to a target. |
| `buff` | Grants a positive bonus, boon, or beneficial effect. |
| `debuff` | Imposes a penalty, bane, or harmful condition. |
| `movement` | Grants, modifies, or restricts movement. |
| `protection` | Provides AV, damage reduction, or shielding. |
| `resistance` | Grants resistance to a damage type or condition. |
| `immunity` | Grants immunity to a condition or damage type. |
| `summoning` | Creates or summons creatures, objects, or forces. |
| `transformation` | Changes the form, shape, or nature of a target. |
| `information` | Reveals hidden knowledge, detects threats, or provides insight. |
| `creation` | Produces items, tools, terrain, or resources. |
| `enhancement` | Temporarily improves a weapon, armor, or item. |

---

### 2. Action Economy

Describes when and how the ability is used during play. Assign one primary action economy tag.

| Tag | Description |
| --- | --- |
| `action` | Requires a standard Action on your turn to use. |
| `quick-action` | Can be used as a Quick Action. |
| `reaction` | Triggered in response to an enemy action, ally action, or event. |
| `passive` | Always active with no action cost; provides a persistent benefit. |
| `ritual` | Requires extended casting time (minutes, hours, or longer). |
| `downtime` | Used during downtime or extended rest activities. |
| `free` | Can be used without spending any action (e.g., once per turn triggers). |

---

### 3. Damage Type

Identifies the damage type(s) an ability deals. Apply only if the ability deals damage. An ability may have multiple damage type tags.

| Tag | Description |
| --- | --- |
| `physical` | Damage from weapons, objects, or bodily force. |
| `fire` | Burning or explosive damage. |
| `frost` | Freezing or petrifying damage. |
| `lightning` | Shocking or searing damage. |
| `acid` | Corroding or melting damage. |
| `blast` | Booming or shattering concussive damage. |
| `necrotic` | Draining or withering damage. |
| `psychic` | Mental or spiritual harm. |
| `poison` | Poisoning or weakening damage. |
| `radiant` | Beaming or radiating damage. |

> **Source.** These are the ten official damage types defined in the combat rules (`docs/05-combat/02-attacking.md`) and in the `damageTypeArray` in the codebase.

---

### 4. Condition

Identifies conditions the ability inflicts, removes, or interacts with. Apply only the conditions the ability directly references.

| Tag | Description |
| --- | --- |
| `bleeding` | Inflicts or interacts with the bleeding (X) condition. |
| `blinded` | Inflicts or interacts with the blinded condition. |
| `burning` | Inflicts or interacts with the burning (X) condition. |
| `charmed` | Inflicts or interacts with the charmed condition. |
| `confused` | Inflicts or interacts with the confused condition. |
| `dazed` | Inflicts or interacts with the dazed condition. |
| `deafened` | Inflicts or interacts with the deafened condition. |
| `frightened` | Inflicts or interacts with the frightened condition. |
| `grappled` | Inflicts or interacts with the grappled condition. |
| `hidden` | Inflicts or interacts with the hidden condition. |
| `marked` | Inflicts or interacts with the marked (X) condition. |
| `paralyzed` | Inflicts or interacts with the paralyzed condition. |
| `poisoned` | Inflicts or interacts with the poisoned condition. |
| `prone` | Inflicts or interacts with the prone condition. |
| `pushed` | Inflicts or interacts with the pushed condition. |
| `restrained` | Inflicts or interacts with the restrained condition. |
| `silenced` | Inflicts or interacts with the silenced condition. |
| `slowed` | Inflicts or interacts with the slowed condition. |
| `staggered` | Inflicts or interacts with the staggered condition. |
| `stunned` | Inflicts or interacts with the stunned condition. |
| `unconscious` | Inflicts or interacts with the unconscious condition. |

> **Source.** These are the official conditions defined in `docs/05-combat/04-conditions.md`. The tags `deprived`, `distracted`, and `suffocating` are omitted as they are environmental/situational rather than ability-inflicted, but can be added if needed.

---

### 5. Weapon Category

Identifies the weapon types an ability requires or interacts with. Apply only if the ability is weapon-specific.

| Tag | Description |
| --- | --- |
| `axe` | Requires or interacts with axe weapons. |
| `blade` | Requires or interacts with blade weapons. |
| `brawling` | Requires or interacts with brawling weapons or unarmed attacks. |
| `bow` | Requires or interacts with bow weapons. |
| `crossbow` | Requires or interacts with crossbow weapons. |
| `mace` | Requires or interacts with mace weapons. |
| `polearm` | Requires or interacts with polearm weapons. |
| `shield` | Requires or interacts with shields. |
| `thrown` | Requires or interacts with thrown weapons. |

> **Source.** These are the nine weapon categories used in the combat arts system and weapon tables.

---

## Tag Application Guidelines

### General Rules

1. **Apply tags conservatively.** Only tag what the ability explicitly does. Do not tag based on what it *could* be used for narratively.
2. **Effect is mandatory.** Every ability must have at least one effect tag.
3. **Conditions are specific.** Only apply condition tags when the ability explicitly inflicts, removes, or references a named condition from the rules.
4. **Damage types follow the rules.** Only tag a damage type if the ability specifies it. If no damage type is mentioned, the default is `physical`.
5. **Weapon category applies to combat arts and weapon-specific talents only.** Do not tag spells or folk abilities with weapon categories unless they explicitly create or interact with weapons.

### Tagging by Ability Type

**Folk Abilities:**
- Always tag: effect.
- Often tag: action economy (`passive` for most).
- Sometimes tag: damage type, condition.

**Talents:**
- Always tag: effect.
- Often tag: action economy.
- Sometimes tag: damage type, condition, weapon category.

**Combat Arts:**
- Always tag: effect, weapon category.
- Often tag: action economy (`action` for most), condition.
- Sometimes tag: damage type (if non-physical).

**Spells:**
- Always tag: effect.
- Often tag: damage type, condition, action economy.

---

## Example Tags for Existing Abilities

### Folk Ability — Stoneskin (Dwarf)

> **Effect:** You gain +1 AV (armor bonus). This effect doesn't stack with worn armor.

| Group | Tags |
| --- | --- |
| Effect | `protection`, `resistance` |
| Action Economy | `passive` |
| Condition | `poisoned` |

### Talent — Inspire Ally (Influence)

> **Effect:** (Rank 1) Once per combat encounter, you can use your Quick Action to inspire one ally in short range who can see or hear you. They gain +1 boon on their next roll.

| Group | Tags |
| --- | --- |
| Effect | `buff` |
| Action Economy | `quick-action` |

### Combat Art — Felling Strike (Fighting)

> **Effect:** (Axes, Maces, Polearms) On a strong or critical hit, the target is knocked prone. On a critical hit, the target is also briefly restrained.

| Group | Tags |
| --- | --- |
| Effect | `damage`, `debuff` |
| Action Economy | `action` |
| Condition | `prone`, `restrained` |
| Weapon Category | `axe`, `mace`, `polearm` |

### Spell — Fireball (Evocation, Rank 3)

> **Effect:** You hurl a ball of flame at a target location which detonates in a blazing explosion. Target all creatures in the spell's area. Weak: Deal +6 fire damage. Strong: Deal +12 fire damage. Critical: Deal +18 fire damage and targets are briefly burning (4).

| Group | Tags |
| --- | --- |
| Effect | `damage` |
| Action Economy | `action` |
| Damage Type | `fire` |
| Condition | `burning` |

### Spell — Heal Wounds (Life, Rank 1)

> **Effect:** You channel restorative energy into a wounded creature. Weak: Restore 4 HP. Strong: Restore 8 HP. Critical: Restore 12 HP and end one condition.

| Group | Tags |
| --- | --- |
| Effect | `healing` |
| Action Economy | `action` |

---

## Migration Strategy

### Phase 1: Documentation (Current)

- Define all tag groups and their fixed sets of tags (this document).
- Establish guidelines for how to apply tags to each ability type.
- Provide example taggings for representative abilities from each type.

### Phase 2: Ability Audit

- Review all existing folk abilities (~30 across 10+ folk) and assign tags.
- Review all existing talents (~115 across 16 skills) and assign tags.
- Review all existing combat arts (~50 basic + supreme) and assign tags.
- Review all existing spells (~230 across 14 traditions/disciplines) and assign tags.
- Compile audit results into a reference table or structured data file.

### Phase 3: Data Integration

- Evaluate whether tags should be stored in the existing markdown data files, in separate structured data (JSON/YAML), or both.
- If tags are added to the data layer, update extractors and parsers (e.g., `extract-folk-from-markdown.py`, spell parsers) to read and write tags.
- Update the character sheet UI to support filtering and displaying abilities by the five tag groups.

### Phase 4: Content Validation

- Use tags as a design checklist for new content: every new ability should be taggable using existing tags.
- Identify gaps where abilities cannot be cleanly tagged, and evaluate whether new tags are needed or the ability needs clarification.
- Tags should not be expanded casually — any new tag must be reviewed against the full existing set to avoid duplication.

---

## Summary of Tag Groups

| # | Group | Purpose | Count | Required? |
| --- | --- | --- | --- | --- |
| 1 | Effect | What the ability mechanically does | 13 | Yes (at least one) |
| 2 | Action Economy | When/how it is used | 7 | Recommended |
| 3 | Damage Type | Type of damage dealt | 10 | If deals damage |
| 4 | Condition | Conditions inflicted/removed | 21 | If references conditions |
| 5 | Weapon Category | Weapon types involved | 9 | Combat arts / weapon talents |

**Total unique tags: 60** across 5 groups.

---

## Appendix A: Folk Ability Audit

All folk abilities reviewed and tagged. Abilities are grouped by folk.

### Dwarf

| Ability | Effect | Action Economy | Condition | Damage Type |
| --- | --- | --- | --- | --- |
| **Dwarven Sight** | `information` | `passive` | — | — |
| **Stoneskin** | `protection`, `resistance` | `passive` | `poisoned` | — |
| **Squat Build** | `resistance` | `passive` | `prone`, `pushed` | — |

### Elf

| Ability | Effect | Action Economy | Condition | Damage Type |
| --- | --- | --- | --- | --- |
| **Night Vision** | `information` | `passive` | — | — |
| **Fleet-Footed** | `movement` | `free` | — | — |
| **Spiritual Symbiosis** | `buff` | `passive` | — | — |

### Gnome

| Ability | Effect | Action Economy | Condition | Damage Type |
| --- | --- | --- | --- | --- |
| **Natural Empath** | `information` | `action` | — | `psychic` |
| **Scent of Illusions** | `resistance` | `passive` | — | — |
| **Small Stature** | `buff`, `debuff` | `passive` | — | — |

### Hune

| Ability | Effect | Action Economy | Condition | Damage Type |
| --- | --- | --- | --- | --- |
| **Giant's Blood** | `buff` | `passive` | — | — |
| **Stoic Mind** | `protection`, `buff` | `passive` | — | — |

### Orc

| Ability | Effect | Action Economy | Condition | Damage Type |
| --- | --- | --- | --- | --- |
| **Orcish Fury** | `damage` | `passive` | — | `physical` |
| **Pride above Death** | `immunity` | `reaction` | — | — |

### Goblin

| Ability | Effect | Action Economy | Condition | Damage Type |
| --- | --- | --- | --- | --- |
| **Night Vision** | `information` | `passive` | — | — |
| **Quick Escape** | `movement` | `reaction` | — | — |
| **Small Stature** | `buff`, `debuff` | `passive` | — | — |

### Human

| Ability | Effect | Action Economy | Condition | Damage Type |
| --- | --- | --- | --- | --- |
| **Will of Perseverance** | `buff` | `free` | — | — |
| **Arcane Awakening** | `buff` | `passive` | — | — |

### Catfolk

| Ability | Effect | Action Economy | Condition | Damage Type |
| --- | --- | --- | --- | --- |
| **Night Vision** | `information` | `passive` | — | — |
| **Intimidating Roar** | `debuff` | `action` | `frightened` | — |
| **Sharp Claws** | `damage` | `passive` | — | `physical` |

### Lizardfolk

| Ability | Effect | Action Economy | Condition | Damage Type |
| --- | --- | --- | --- | --- |
| **Thick Scales** | `protection` | `passive` | — | — |
| **Aquatic Nature** | `buff` | `passive` | — | — |
| **Reptile Jaws** | `damage` | `passive` | — | `physical` |

### Minotaur

| Ability | Effect | Action Economy | Condition | Damage Type |
| --- | --- | --- | --- | --- |
| **Giant's Blood** | `buff` | `passive` | — | — |
| **Horns** | `damage` | `passive` | — | `physical` |
| **Goring Charge** | `damage`, `movement` | `action` | — | `physical` |

---

## Appendix B: Combat Art Audit

All combat arts reviewed and tagged. Weapon categories listed correspond to the combat art's weapon requirements.

### Basic Combat Arts

| Combat Art | Effect | Weapon Category | Condition | Notes |
| --- | --- | --- | --- | --- |
| **Aimed Shot** | `buff` | `bow`, `crossbow`, `thrown` | — | Self-buff: +1 boon if no movement |
| **Barrage** | `damage` | `bow`, `thrown` | — | Extra attack with bane |
| **Brutal Strike** | `damage` | `axe`, `blade`, `mace`, `polearm` | — | Strength scaling damage |
| **Charge** | `damage`, `movement` | `axe`, `blade`, `mace`, `polearm`, `shield` | `pushed`, `prone` | Free movement + shove |
| **Choking Grip** | `damage`, `debuff` | `brawling`, `thrown` | `grappled`, `restrained`, `dazed` | Grapple with extra effects |
| **Cleave** | `damage` | `axe`, `blade`, `mace`, `polearm` | — | Multi-target melee |
| **Deep Cut** | `damage`, `debuff` | `axe`, `blade`, `brawling`, `polearm` | `bleeding` | Slash weapons, bleeding |
| **Defensive Strike** | `damage`, `buff` | `axe`, `blade`, `brawling`, `mace`, `polearm`, `shield` | — | Gain Defend on hit |
| **Disabling Shot** | `damage`, `debuff` | `bow`, `crossbow`, `thrown` | `dazed`, `stunned` | Crush/heavy ranged |
| **Disarm** | `debuff` | `axe`, `blade`, `brawling`, `mace`, `polearm` | — | Disarm action on hit |
| **Disarming Shot** | `debuff` | `bow`, `crossbow`, `thrown` | — | Ranged disarm |
| **Divert Attention** | `debuff` | `axe`, `blade`, `brawling`, `mace`, `polearm` | `distracted` | Distract action on attack |
| **Evasive Strike** | `damage`, `movement` | `axe`, `blade`, `brawling`, `polearm` | — | Gain Retreat on hit |
| **Exhilarating Strike** | `damage`, `healing`, `buff` | `axe`, `blade`, `brawling`, `mace`, `polearm` | — | Heal + buff allies on hit |
| **Feint** | `buff` | `blade`, `brawling`, `polearm` | — | +1 boon if no movement |
| **Felling Strike** | `damage`, `debuff` | `axe`, `blade`, `brawling`, `mace`, `polearm`, `thrown` | `prone`, `dazed` | Trip on hit |
| **Flurry** | `damage` | `axe`, `blade`, `brawling`, `mace`, `polearm` | — | Extra melee attack with bane |
| **Head Smack** | `damage`, `debuff` | `brawling`, `mace`, `shield` | `confused` | Crush weapon, mental effect |
| **Knockout** | `damage`, `debuff` | `brawling`, `mace`, `shield` | `dazed`, `stunned` | Crush weapon, knockout |
| **Pinning Shot** | `debuff` | `bow`, `crossbow`, `thrown` | `restrained` | Immobilize target |
| **Power Shot** | `damage` | `bow`, `crossbow`, `thrown` | — | Strength scaling ranged damage |
| **Precise Shot** | `damage` | `bow`, `crossbow`, `thrown` | — | Ignore AV, Agility scaling |
| **Precise Strike** | `damage` | `blade`, `brawling`, `polearm` | — | Pierce, ignore AV |
| **Quick Lunge** | `damage` | `blade`, `brawling`, `polearm` | — | Targets Dodge, blocks Quick Action |
| **Ram Down** | `damage`, `debuff` | `brawling`, `mace`, `shield` | `pushed`, `prone`, `dazed` | Shove + knockdown |
| **Snare** | `debuff` | `brawling`, `thrown` | `grappled`, `restrained`, `prone`, `dazed` | Grapple with restraint |
| **Splinter** | `debuff` | `axe`, `mace` | — | Destroy equipment |
| **Terrifying Strike** | `damage`, `debuff` | `axe`, `blade`, `mace`, `polearm` | `frightened` | Demoralize on attack |
| **Volley** | `damage` | `bow`, `crossbow`, `thrown` | — | Multi-target ranged |

### Supreme Combat Arts

| Combat Art | Effect | Weapon Category | Condition | Notes |
| --- | --- | --- | --- | --- |
| **Dashing Strike** | `damage`, `movement` | `axe`, `blade`, `brawling`, `mace` | — | Line attack with supernatural movement |
| **Death from Above** | `damage`, `movement` | `polearm` | `prone` | Leap attack, knockdown |
| **Devastating Piercer** | `damage` | `crossbow` | — | Line-piercing multi-target |
| **Earth-shattering Strike** | `damage` | `mace` | — | AoE ground destruction |
| **Force Slash** | `damage` | `axe`, `blade`, `polearm` | — | Ranged slash wave |
| **Hundred Palm Strike** | `damage` | `brawling` | — | Multi-hit unarmed combo |
| **Perfect Shot** | `damage`, `debuff` | `bow` | `stunned` | Ignore all penalties, stun |
| **Phantom Cut** | `damage`, `debuff` | `blade` | `staggered` | Ranged blade attack |
| **Projectile Storm** | `damage` | `thrown` | — | AoE thrown weapons |
| **Rip and Tear** | `damage`, `debuff` | `axe` | `staggered` | Armor destruction |
| **Shield Avalanche** | `damage`, `debuff`, `protection` | `shield` | `pushed`, `prone` | AoE shield slam + AV gain |
| **Supreme Barrage** | `damage` | `bow`, `thrown` | — | Replaces Barrage, two extra attacks |
| **Supreme Cleave** | `damage` | `axe`, `blade`, `mace`, `polearm` | — | Replaces Cleave, expanded range |
| **Supreme Disarm** | `debuff` | `axe`, `blade`, `brawling`, `mace`, `polearm` | `dazed` | Enhanced disarm |
| **Supreme Feint** | `damage`, `debuff` | `blade`, `brawling`, `polearm` | `marked` | Enhanced feint, bonus damage |

---

## Appendix C: Talent Audit

All talents reviewed and tagged by skill. Each talent is tagged at its broadest scope across all ranks.

### Fighting Talents

| Talent | Effect | Action Economy | Condition | Weapon Category |
| --- | --- | --- | --- | --- |
| **Art of Fighting** | `buff` | `passive` | — | — |
| **Axe Mastery** | `damage`, `debuff` | `quick-action` | `bleeding` | `axe` |
| **Blade Mastery** | `damage`, `buff` | `free` | `marked` | `blade` |
| **Defensive Dueling** | `protection`, `debuff` | `passive`, `quick-action` | `marked` | `blade`, `brawling`, `polearm` |
| **Disciplined Fighter** | `buff`, `damage` | `free`, `quick-action` | — | — |
| **Dual Wielder** | `damage`, `protection` | `passive` | — | — |
| **Heavy Weapon Mastery** | `damage`, `buff` | `passive` | — | `axe`, `mace`, `polearm` |
| **Mace Mastery** | `damage`, `debuff` | `quick-action` | `dazed` | `mace` |
| **Martial Artist** | `damage`, `buff` | `passive`, `reaction` | — | `brawling` |
| **Polearm Mastery** | `damage`, `resistance` | `quick-action` | `prone`, `pushed` | `polearm` |
| **Protective Stance** | `protection`, `resistance` | `quick-action` | — | `shield` |
| **Pugilist** | `damage`, `protection`, `healing` | `passive` | `distracted` | `brawling` |
| **Riposte** | `damage`, `debuff` | `reaction` | `dazed` | — |
| **Shield Mastery** | `protection` | `reaction` | — | `shield` |

### Archery Talents

| Talent | Effect | Action Economy | Condition | Weapon Category |
| --- | --- | --- | --- | --- |
| **Ammo Specialist** | `damage`, `buff` | `passive` | — | `bow`, `crossbow` |
| **Art of Archery** | `buff` | `passive` | — | — |
| **Crossbow Mastery** | `damage`, `debuff` | `quick-action` | `stunned` | `crossbow` |
| **Disciplined Archer** | `buff`, `damage` | `free`, `quick-action` | — | — |
| **Expert Slinger** | `damage`, `movement` | `free` | — | `thrown` |
| **Rapid Shot** | `damage`, `debuff` | `action` | `marked` | `bow`, `crossbow`, `thrown` |
| **Reflexive Shooter** | `damage`, `buff` | `reaction` | — | `bow`, `crossbow`, `thrown` |
| **Sharpshooter** | `damage`, `buff`, `debuff` | `passive` | `marked` | `bow`, `crossbow`, `thrown` |
| **Strong Grip** | `damage`, `buff` | `passive` | — | `bow`, `crossbow` |

### Arcana Talents

| Talent | Effect | Action Economy | Condition |
| --- | --- | --- | --- |
| **Arcane Spell Knowledge** | `buff` | `passive` | — |
| **Battle Mage** | `damage`, `protection` | `quick-action` | — |
| **Inexhaustible Mind** | `buff` | `downtime` | — |
| **Mana Shield** | `protection` | `passive` | — |
| **Master of Fundamentals** | `damage`, `buff` | `free`, `reaction` | — |
| **Spellblade** | `damage` | `action` | — |
| **Spellweaver** | `buff` | `passive` | — |
| **Wild Overload** | `buff`, `debuff` | `free` | — |

### Mysticism Talents

| Talent | Effect | Action Economy | Condition |
| --- | --- | --- | --- |
| **Armor of the Faithful** | `protection`, `immunity` | `passive` | `frightened`, `confused` |
| **Communal Practices** | `buff` | `free` | — |
| **Divine Favor** | `buff` | `passive` | — |
| **Divine Rites** | `buff` | `downtime` | — |
| **Divine Sense** | `information`, `immunity` | `action` | `charmed`, `frightened`, `poisoned` |
| **Elemental Adept** | `damage`, `buff` | `free` | — |
| **Master of Principles** | `damage`, `buff` | `free`, `reaction` | — |
| **Mystic Champion** | `damage` | `action` | — |
| **Mystical Spell Knowledge** | `buff` | `passive` | — |
| **Pact of Devotion** | `damage`, `healing`, `buff`, `protection`, `resistance` | `passive`, `quick-action`, `action` | `stunned` |
| **Shape Changer** | `damage`, `protection`, `resistance`, `transformation` | `passive` | — |

### Athletics Talents

| Talent | Effect | Action Economy | Condition |
| --- | --- | --- | --- |
| **Athletic Movement** | `movement`, `buff` | `free`, `quick-action` | — |
| **Bulky** | `buff`, `movement` | `passive`, `quick-action` | — |
| **Escape Artist** | `movement`, `resistance` | `quick-action` | `grappled`, `prone`, `pushed` |
| **Evasion** | `resistance`, `movement` | `quick-action` | — |
| **Fast Stride** | `movement` | `quick-action` | — |
| **Grappler** | `debuff` | `action` | `grappled`, `restrained` |
| **Light Armor Mastery** | `protection`, `buff` | `reaction` | — |
| **Stand your Ground** | `resistance`, `debuff` | `quick-action` | `prone`, `pushed` |
| **Supernatural Mobility** | `movement` | `passive` | — |

### Fortitude Talents

| Talent | Effect | Action Economy | Condition |
| --- | --- | --- | --- |
| **Adrenaline Rush** | `buff` | `passive` | — |
| **Battle Rage** | `buff`, `damage`, `resistance`, `protection` | `free` | — |
| **Body of Bronze** | `protection`, `resistance`, `immunity` | `passive` | `dazed`, `stunned` |
| **Drunken Technique** | `protection`, `debuff`, `buff` | `passive`, `reaction` | `marked`, `poisoned` |
| **Explorer's Tenacity** | `buff`, `resistance` | `passive` | — |
| **Hard to Kill** | `resistance`, `healing` | `passive` | — |
| **Heavy Armor Mastery** | `protection` | `reaction` | — |
| **Juggernaut** | `protection`, `damage` | `passive` | — |
| **Second Wind** | `healing` | `quick-action` | — |
| **Strong Mind** | `resistance`, `immunity` | `free` | `frightened`, `charmed` |
| **Tough Stomach** | `resistance` | `quick-action` | `poisoned`, `frightened`, `dazed` |

### Influence Talents

| Talent | Effect | Action Economy | Condition |
| --- | --- | --- | --- |
| **Born Haggler** | `buff` | `downtime` | — |
| **Fast Talking** | `buff`, `debuff` | `free` | `dazed` |
| **Inspire Ally** | `buff`, `healing` | `quick-action` | — |
| **Insult to Injury** | `debuff`, `damage` | `quick-action` | `distracted` |
| **Leading Presence** | `buff`, `damage` | `passive` | `frightened` |
| **Performer** | — | — | — |
| **Presence of Conquest** | `debuff` | — | `stunned` |

### Insight Talents

| Talent | Effect | Action Economy | Condition |
| --- | --- | --- | --- |
| **Empath** | `information`, `buff`, `debuff` | `quick-action` | — |
| **Foresight** | `information` | — | — |
| **Intuitive Appraisal** | `information`, `buff` | `quick-action` | — |
| **Piercing Look** | `buff`, `debuff` | `quick-action` | — |
| **Sense of Deduction** | `information` | `free` | — |

### Perception Talents

| Talent | Effect | Action Economy | Condition |
| --- | --- | --- | --- |
| **Blind Senses** | `information`, `resistance` | `action`, `passive` | `blinded` |
| **Danger Sense** | `buff` | `passive` | — |
| **Dungeon Delver** | `information`, `resistance` | `action` | — |
| **Eagle Eye** | `information`, `buff` | `quick-action` | — |
| **Identify Weakness** | `damage`, `information` | `quick-action` | — |

### Stealth Talents

| Talent | Effect | Action Economy | Condition |
| --- | --- | --- | --- |
| **Assassination** | `damage`, `buff` | `passive` | — |
| **Devious Tactics** | `debuff` | `quick-action` | `distracted`, `marked` |
| **Hidden Strike** | `damage`, `debuff` | `quick-action` | `stunned` |
| **Leading the Way** | `buff` | `passive` | — |
| **Roguish Wits** | `buff`, `protection` | `quick-action` | — |
| **Sleight of Hand** | `buff` | `action` | — |

### Crafting Talents

| Talent | Effect | Action Economy | Condition |
| --- | --- | --- | --- |
| **Artisan** | `buff` | `downtime` | — |
| **Efficient Worker** | `buff` | `downtime` | — |
| **Maintenance** | `buff` | `downtime` | — |
| **Master Artisan** | `buff` | `downtime` | — |
| **Peak Performance** | `enhancement` | `downtime` | — |
| **Quick Construction** | `creation` | `action` | — |

### Education Talents

| Talent | Effect | Action Economy | Condition |
| --- | --- | --- | --- |
| **Commander** | `buff`, `damage`, `healing`, `movement` | `quick-action` | — |
| **Diplomat** | `information`, `buff`, `debuff` | `action` | — |
| **Eloquent Talker** | `buff`, `debuff` | `free` | `charmed` |
| **General Education** | `buff` | `passive` | — |
| **Linguist** | `information` | `passive` | — |
| **Tactician** | `buff`, `damage`, `healing` | `action` | — |

### Lore Talents

| Talent | Effect | Action Economy | Condition |
| --- | --- | --- | --- |
| **Channel Superstition** | `debuff` | `action` | `frightened` |
| **Consult the Myths** | `information`, `debuff` | `action` | `dazed` |
| **Divine Scholar** | `buff` | `passive` | — |
| **Identify Artifact** | `information` | `action` | — |
| **Mage Hunter** | `debuff`, `protection` | `reaction` | — |
| **Magical Sense** | `information`, `protection` | `quick-action` | — |

### Nature Talents

| Talent | Effect | Action Economy | Condition |
| --- | --- | --- | --- |
| **Animal Companion** | `summoning`, `damage`, `buff` | `passive` | — |
| **Beast Lore** | `information`, `debuff` | `action` | `charmed` |
| **Expert Rider** | `buff`, `damage` | `passive` | — |
| **Field Medic** | `healing` | `action` | — |
| **Herbalist** | `creation` | — | — |
| **Knowledgeable Wanderer** | `buff` | `passive` | — |
| **Plant Lore** | `information` | `free` | — |
| **Poison Maker** | `creation` | `action` | `poisoned` |

### Streetwise Talents

| Talent | Effect | Action Economy | Condition |
| --- | --- | --- | --- |
| **I Know A Guy** | `information` | `downtime` | — |
| **Jack of All Trades** | `buff` | `free` | — |
| **Swashbuckler** | `damage`, `buff`, `movement` | `passive` | — |
| **Thug Tactics** | `buff`, `debuff` | `passive` | — |

### Survival Talents

| Talent | Effect | Action Economy | Condition |
| --- | --- | --- | --- |
| **Explorer of Nature** | `buff` | `free` | — |
| **Makeshift Artisan** | `creation`, `damage` | `action` | — |
| **Monster Hunter** | `damage`, `information`, `debuff` | `quick-action` | `stunned` |
| **Relentless Tracker** | `information` | `free` | — |
| **Trap Maker** | `damage`, `debuff`, `creation` | `action` | `prone`, `restrained` |
| **Wilderness Expert** | `creation`, `buff` | `downtime` | — |

---

## Appendix D: Audit Summary Statistics

### Folk Abilities by Effect

| Effect | Count |
| --- | --- |
| `buff` | 7 |
| `protection` | 4 |
| `information` | 4 |
| `damage` | 4 |
| `resistance` | 3 |
| `movement` | 3 |
| `debuff` | 2 |
| `immunity` | 1 |

> Note: Abilities may have multiple effect tags. Counts sum to more than the total number of abilities (28).

### Folk Abilities by Action Economy

| Action Economy | Count | % |
| --- | --- | --- |
| `passive` | 21 | 75% |
| `free` | 2 | 7% |
| `reaction` | 2 | 7% |
| `action` | 2 | 7% |
| `quick-action` | 0 | 0% |

### Combat Arts by Effect

| Effect | Count |
| --- | --- |
| `damage` | 31 |
| `debuff` | 18 |
| `buff` | 3 |
| `movement` | 3 |
| `protection` | 2 |
| `healing` | 1 |

### Most Referenced Conditions (Combat Arts)

| Condition | Count |
| --- | --- |
| `prone` | 7 |
| `dazed` | 7 |
| `pushed` | 4 |
| `stunned` | 4 |
| `restrained` | 4 |
| `staggered` | 3 |
| `frightened` | 2 |
| `bleeding` | 2 |
| `marked` | 2 |
| `grappled` | 2 |
| `confused` | 1 |
| `distracted` | 1 |

### Talents by Effect

| Effect | Count |
| --- | --- |
| `buff` | 42 |
| `damage` | 32 |
| `protection` | 16 |
| `debuff` | 13 |
| `resistance` | 10 |
| `information` | 10 |
| `movement` | 9 |
| `healing` | 7 |
| `creation` | 4 |
| `immunity` | 3 |
| `enhancement` | 2 |
| `summoning` | 1 |
| `transformation` | 1 |

### Talents by Action Economy

| Action Economy | Count |
| --- | --- |
| `passive` | 41 |
| `quick-action` | 36 |
| `free` | 18 |
| `action` | 16 |
| `downtime` | 10 |
| `reaction` | 6 |

### Key Observations

1. **Folk abilities are overwhelmingly passive.** 75% of folk abilities have no action cost. This is consistent with their design as innate, always-on traits.

2. **Combat arts are dominated by damage and debuff effects.** `damage` appears on 31 of 44 combat arts, with `debuff` as the most common secondary effect (18). Very few provide `protection` or `healing` — this is a deliberate design choice since combat arts are weapon techniques.

3. **Talents are well-distributed across effects.** `buff` and `damage` are the most common, with `protection`, `debuff`, and `resistance` forming a solid middle tier. Healing effects are rare (only 7 across all skills), concentrated in Fortitude, Nature, and Mysticism.

4. **Prone and dazed are the most common conditions in combat arts.** These conditions dominate because they represent the most common outcomes of weapon techniques — knockdowns and disorientation.

5. **Quick-action economy is heavily used in talents.** 36 talents include quick-action abilities, making this the most common active timing after passive. This reflects the system's emphasis on tactical decisions during combat turns.

6. **Several talents and folk abilities are incomplete.** The following are marked as stubs or placeholders: Performer, Presence of Conquest, Foresight, Supernatural Mobility, Herbalist, Master Artisan, Adrenaline Rush, and the Dogfolk/Satyr folk. Their tags are provisional.

---

## Appendix E: Spell Audit

All spells reviewed and tagged by discipline/tradition. Only the base rank is tagged; heightened versions may add conditions or effects beyond what is listed.

### Arcane Disciplines

#### Evocation

| Spell | Rank | Effect | Action Economy | Damage Type | Condition |
| --- | --- | --- | --- | --- | --- |
| **Flickering Flame** | 0 | `damage` | `action` | `fire` | `burning` |
| **Frost Snap** | 0 | `damage` | `action` | `frost` | `slowed`, `dazed` |
| **Static Spark** | 0 | `damage` | `action` | `lightning` | — |
| **Chromatic Orb** | 1 | `damage` | `action` | `acid`, `fire`, `frost`, `lightning`, `poison` | `burning`, `slowed`, `staggered`, `poisoned` |
| **Elemental Ward** | 1 | `resistance` | `quick-action` | — | — |
| **Flame Burst** | 1 | `damage` | `action` | `fire` | `burning` |
| **Flaming Weapon** | 1 | `enhancement` | `action` | `fire` | — |
| **Frozen Weapon** | 1 | `enhancement` | `action` | `frost` | `slowed` |
| **Ice Shards** | 1 | `damage` | `action` | `frost` | — |
| **Lightning Arc** | 1 | `damage` | `action` | `lightning` | — |
| **Lightning Weapon** | 1 | `enhancement` | `action` | `lightning` | `staggered` |
| **Scorching Ray** | 1 | `damage` | `action` | `fire` | — |
| **Fireball** | 2 | `damage` | `action` | `fire` | `burning` |
| **Frost Wave** | 2 | `damage` | `action` | `frost` | `slowed` |
| **Ice Lance** | 2 | `damage`, `creation` | `action` | `frost` | — |
| **Lightning Strike** | 2 | `damage` | `action` | `lightning` | `staggered` |
| **Prismatic Missile** | 2 | `damage` | `action` | `fire`, `frost`, `lightning`, `acid` | — |
| **Black Flame Bolt** | 3 | `damage` | `action` | `fire` | `burning` |

#### Illusion

| Spell | Rank | Effect | Action Economy | Damage Type | Condition |
| --- | --- | --- | --- | --- | --- |
| **Horrific Vision** | 0 | `damage`, `debuff` | `action` | `psychic` | `frightened` |
| **Maddening Whispers** | 0 | `damage`, `debuff` | `action` | `psychic` | — |
| **Minor Illusion** | 0 | `creation` | `action` | — | — |
| **Color Spray** | 1 | `debuff` | `action` | — | `blinded`, `dazed`, `stunned` |
| **Disguise Form** | 1 | `transformation` | `action` | — | — |
| **False Enemy** | 1 | `damage`, `debuff` | `action` | `psychic` | — |
| **Illusory Trap** | 1 | `damage`, `debuff` | `action` | `psychic` | `grappled`, `restrained` |
| **Mirror Image** | 1 | `protection` | `quick-action` | — | — |
| **Hallucinated Swarm** | 2 | `damage`, `debuff` | `action` | `psychic` | `confused` |
| **Illusionary Terrain** | 2 | `creation` | `action` | — | — |
| **Invisibility** | 2 | `transformation` | `quick-action` | — | `hidden` |
| **Major Illusion** | 2 | `creation` | `action` | — | — |
| **Misdirection** | 2 | `protection` | `quick-action` | — | — |
| **Trap Room** | 2 | `damage`, `debuff` | `action` | `psychic` | `grappled`, `restrained` |
| **Waking Dream** | 2 | `debuff` | `action` | — | `unconscious` |
| **Mislead** | 3 | `transformation`, `creation` | `action` | — | `hidden` |
| **Phantasmal Killer** | 3 | `damage`, `debuff` | `action` | `psychic` | `frightened` |
| **Seeming** | 3 | `transformation` | `action` | — | — |

#### Conjuration

| Spell | Rank | Effect | Action Economy | Damage Type | Condition |
| --- | --- | --- | --- | --- | --- |
| **Arcane Bolt** | 0 | `damage` | `action` | `blast` | `dazed` |
| **Arcane Glyph** | 0 | `creation` | `ritual` | `blast` | — |
| **Extraplanar Pocket** | 0 | `creation` | `quick-action` | — | — |
| **Alarm** | 1 | `information` | `ritual` | — | — |
| **Arcane Barrier** | 1 | `creation`, `protection` | `action` | — | — |
| **Arcane Missiles** | 1 | `damage` | `action` | `blast` | — |
| **Conjure Familiar** | 1 | `summoning` | `ritual` | — | — |
| **Hail of Blades** | 1 | `damage` | `action` | `physical` | — |
| **Infuse Item** | 1 | `enhancement` | `action` | — | — |
| **Arcane Barrage** | 2 | `damage` | `action` | `blast` | — |
| **Arcane Circle** | 2 | `enhancement` | `quick-action` | — | — |
| **Arcane Eye** | 2 | `information` | `action` | — | — |
| **Eldritch Tendrils** | 2 | `damage`, `debuff` | `action` | `acid` | `grappled`, `restrained` |
| **Phase Step** | 2 | `movement` | `quick-action` | — | — |
| **Summon Aberration** | 2 | `summoning` | `action` | — | — |
| **Arcane Blast** | 3 | `damage` | `action` | `blast` | `pushed` |
| **Astral Gate** | 3 | `debuff` | `action` | `blast` | `prone`, `restrained` |
| **Burst of Tendrils** | 3 | `damage` | `action` | `physical` | `bleeding` |
| **Dimension Door** | 3 | `movement` | `action` | — | — |
| **Wall of Force** | 3 | `creation`, `protection` | `action` | — | `pushed` |
| **Arcane Empowerment** | 4 | `enhancement`, `resistance` | `action` | — | `paralyzed` |
| **Astral Body** | 4 | `transformation` | `action` | — | — |
| **Force Cage** | 4 | `debuff` | `action` | — | `restrained` |
| **Teleportation Circle** | 4 | `creation`, `movement` | `action` | — | — |

#### Telepathy

| Spell | Rank | Effect | Action Economy | Damage Type | Condition |
| --- | --- | --- | --- | --- | --- |
| **Detect Magic** | 0 | `information` | `action` | — | — |
| **Mental Link** | 0 | `information` | `quick-action` | — | — |
| **Mind Blast** | 0 | `damage`, `debuff` | `action` | `psychic` | `dazed` |
| **Attack Thoughts** | 1 | `damage`, `debuff` | `action` | `psychic` | `confused` |
| **Control Beast** | 1 | `debuff` | `action` | — | `stunned` |
| **Foresight** | 1 | `buff` | `quick-action` | — | — |
| **Psychometry** | 1 | `information` | `ritual` | — | — |
| **Subtle Suggestion** | 1 | `debuff` | `action` | — | — |
| **True Strike** | 1 | `buff` | `quick-action` | — | — |
| **Counterspell** | 2 | `debuff` | `quick-action` | `psychic` | — |
| **Forced Suggestion** | 2 | `debuff` | `action` | — | `charmed` |
| **Psychic Wave** | 2 | `damage`, `debuff` | `action` | `psychic` | `dazed` |
| **Wave of Madness** | 2 | `debuff` | `action` | `psychic` | `confused` |
| **Invade Dreams** | 3 | `debuff`, `information` | `ritual` | `psychic` | — |
| **Astral Body** | 4 | `transformation` | `ritual` | — | — |

#### Telekinetics

| Spell | Rank | Effect | Action Economy | Damage Type | Condition |
| --- | --- | --- | --- | --- | --- |
| **Kinetic Pull** | 0 | `movement`, `debuff` | `action` | — | `prone` |
| **Kinetic Push** | 0 | `damage` | `action` | `blast` | `pushed` |
| **Weak Telekinesis** | 0 | `movement` | `action` | `physical` | — |
| **Gravity Orb** | 1 | `debuff` | `action` | — | `slowed`, `grappled`, `restrained` |
| **Reflective Barrier** | 1 | `protection` | `action` | — | — |
| **Shockwave** | 1 | `damage` | `action` | `blast` | `pushed`, `prone` |
| **Telekinetic Crush** | 1 | `damage` | `action` | `physical` | — |
| **Telekinetic Volley** | 1 | `damage`, `movement` | `action` | `physical` | — |
| **Levitation** | 2 | `movement` | `action` | — | — |
| **Orbiting Shards** | 2 | `protection`, `damage` | `action` | `physical` | — |
| **Stasis** | 2 | `debuff` | `action` | — | `stunned` |
| **Strong Telekinesis** | 2 | `movement` | `action` | `physical` | — |
| **Distortion Field** | 3 | `protection`, `debuff` | `action` | `physical` | — |
| **Invert Gravity** | 4 | `debuff`, `movement` | `action` | — | `prone` |

#### Necromancy

| Spell | Rank | Effect | Action Economy | Damage Type | Condition |
| --- | --- | --- | --- | --- | --- |
| **Drain Life** | 0 | `damage`, `healing` | `action` | `necrotic` | — |
| **Enfeebling Grasp** | 0 | `damage`, `debuff` | `action` | `necrotic` | — |
| **Life Echo** | 0 | `information` | `action` | — | — |
| **Necromantic Sight** | 0 | `information` | `quick-action` | — | — |
| **Soul Drain** | 0 | `damage`, `debuff` | `action` | `necrotic` | — |
| **Animate Corpse** | 1 | `summoning` | `ritual` | — | — |
| **Bone Armor** | 1 | `protection` | `action` | — | — |
| **Control Undead** | 1 | `debuff` | `action` | — | `stunned` |
| **Death Bolt** | 1 | `damage` | `action` | `necrotic` | — |
| **Death Ward** | 1 | `protection` | `quick-action` | — | — |
| **Grasp of Decay** | 1 | `damage`, `debuff` | `action` | `necrotic` | — |
| **Necrotic Shield** | 1 | `protection` | `action` | `necrotic` | — |
| **Ray of Lethargy** | 1 | `damage`, `debuff` | `action` | `necrotic` | `slowed`, `staggered` |
| **Animate Horde** | 2 | `summoning` | `ritual` | — | — |
| **Bone Shatter** | 2 | `damage`, `debuff` | `action` | `necrotic` | `staggered`, `stunned`, `paralyzed` |
| **Corpse Explosion** | 2 | `damage` | `action` | `necrotic` | `prone` |
| **Death Mark** | 2 | `debuff` | `action` | `necrotic` | `marked` |
| **Inflict Curse** | 2 | `debuff` | `action` | — | — |
| **Shroud of Blight** | 2 | `damage`, `debuff` | `action` | `necrotic` | `frightened` |
| **Soul Veil** | 2 | `buff` | `action` | — | — |
| **Curse of Mortality** | 3 | `debuff` | `action` | — | — |
| **Negative Energy Flood** | 3 | `damage`, `debuff` | `action` | `necrotic` | `stunned` |
| **Reaper's Harvest** | 3 | `debuff` | `action` | — | — |
| **Soul Prison** | 3 | `debuff` | `action` | — | `stunned`, `paralyzed`, `unconscious` |
| **Spectral Army** | 3 | `summoning` | `action` | `necrotic` | — |
| **Wither** | 3 | `damage`, `debuff` | `action` | `necrotic` | `stunned` |
| **Death's Embrace** | 4 | `transformation`, `enhancement` | `action` | `necrotic` | `frightened`, `paralyzed` |
| **Finger of Death** | 4 | `damage` | `action` | `necrotic` | — |

---

### Mystic Traditions

#### Death

| Spell | Rank | Effect | Action Economy | Damage Type | Condition |
| --- | --- | --- | --- | --- | --- |
| **Chill Touch** | 0 | `damage`, `debuff` | `action` | `frost` | — |
| **Decay** | 0 | `debuff` | `action` | — | — |
| **Enfeebling Touch** | 0 | `damage`, `debuff` | `action` | `necrotic` | — |
| **Glimpse of Mortality** | 0 | `damage`, `debuff` | `action` | `psychic` | `frightened` |
| **Spared from Death** | 0 | `healing` | `action` | — | — |
| **Blood Shards** | 1 | `damage`, `healing` | `action` | `necrotic` | — |
| **Curse of Death** | 1 | `debuff` | `action` | — | — |
| **Early Grave** | 1 | `damage`, `debuff` | `action` | `necrotic` | `grappled`, `restrained` |
| **Necrotic Weapon** | 1 | `enhancement` | `action` | `necrotic` | — |
| **Rotting Grasp** | 1 | `damage`, `debuff` | `action` | `necrotic` | `poisoned`, `staggered` |
| **Shivering Ray** | 1 | `damage`, `debuff` | `action` | `frost` | `slowed`, `dazed` |
| **Circle of Death** | 2 | `damage`, `debuff` | `action` | `necrotic` | — |
| **Cloud of Sickness** | 2 | `damage`, `debuff` | `action` | `necrotic` | `poisoned` |
| **Death's Door** | 3 | `damage`, `debuff` | `action` | `psychic` | `stunned`, `paralyzed` |
| **Grave's Bloom** | 3 | `damage`, `debuff` | `action` | `poison` | `poisoned`, `confused` |

#### Life

| Spell | Rank | Effect | Action Economy | Damage Type | Condition |
| --- | --- | --- | --- | --- | --- |
| **Life Shield** | 0 | `protection` | `action` | — | — |
| **Restore Life** | 0 | `healing`, `damage` | `action` | `radiant` | — |
| **Verdant Blast** | 0 | `damage`, `healing` | `action` | `radiant` | — |
| **Blessing of Life** | 1 | `buff` | `action` | — | — |
| **Healing Touch** | 1 | `healing` | `action` | — | — |
| **Overflow of Life** | 1 | `healing`, `damage` | `action` | `radiant` | — |
| **Rapid Vitality** | 1 | `healing` | `quick-action` | — | — |
| **Vitalizing Weapon** | 1 | `enhancement`, `healing` | `action` | — | — |
| **Aid** | 2 | `buff` | `action` | — | — |
| **Cleanse** | 2 | `healing` | `quick-action` | — | — |
| **Detect Life** | 2 | `information` | `action` | — | — |
| **Hallow Ground** | 2 | `healing` | `action` | — | — |
| **Healing Burst** | 2 | `healing` | `action` | — | — |
| **Abundance of Life** | 3 | `healing` | `action` | — | — |
| **Vitality Surge** | 3 | `healing`, `damage` | `action` | `radiant` | `dazed`, `stunned` |

#### Light

| Spell | Rank | Effect | Action Economy | Damage Type | Condition |
| --- | --- | --- | --- | --- | --- |
| **Dazzling Light** | 0 | `damage`, `debuff` | `action` | `radiant` | `blinded`, `dazed` |
| **Detect Lies** | 0 | `information` | `quick-action` | — | — |
| **Illuminated Sight** | 0 | `buff`, `enhancement` | `action` | — | — |
| **Revealing Burst** | 0 | `information`, `debuff` | `action` | — | — |
| **Blessing of Light** | 1 | `buff`, `enhancement` | `action` | — | — |
| **Locate Trinket** | 1 | `information` | `action` | — | — |
| **Protect from Influence** | 1 | `protection`, `resistance` | `quick-action` | — | — |
| **Radiant Burst** | 1 | `damage`, `debuff` | `action` | `radiant` | `blinded`, `dazed` |
| **Radiant Weapon** | 1 | `enhancement` | `action` | `radiant` | — |
| **Sense Spirits** | 1 | `information` | `action` | — | — |
| **Sun Sphere** | 1 | `damage` | `action` | `fire` | — |
| **True Strike** | 1 | `buff` | `quick-action` | — | — |
| **Break Curse** | 2 | `healing` | `ritual` | — | — |
| **Destroy Undeath** | 2 | `damage`, `debuff` | `action` | `radiant` | `frightened` |
| **Sunbeam** | 2 | `damage`, `information` | `action` | `radiant` | — |
| **Blessing of Dawn** | 3 | `enhancement`, `buff` | `action` | — | — |
| **Purifying Light** | 3 | `damage`, `debuff` | `action` | `radiant` | `blinded`, `stunned` |
| **Solar Flare** | 3 | `damage`, `healing` | `action` | `radiant` | — |

#### Nature

| Spell | Rank | Effect | Action Economy | Damage Type | Condition |
| --- | --- | --- | --- | --- | --- |
| **Acid Splash** | 0 | `damage` | `action` | `acid` | — |
| **Bestial Adaptation** | 0 | `transformation`, `buff` | `quick-action` | — | — |
| **Lashing Vine** | 0 | `damage`, `debuff` | `action` | `physical` | `grappled`, `restrained` |
| **Poison Mist** | 0 | `damage`, `debuff` | `action` | `poison` | `poisoned` |
| **Rejuvenation** | 0 | `healing` | `action` | — | — |
| **Shillelagh** | 0 | `enhancement` | `action` | `physical` | — |
| **Beast Form** | 1 | `transformation` | `action` | `physical` | — |
| **Blessing of Nature** | 1 | `buff` | `action` | — | — |
| **Mesh of Vines** | 1 | `debuff` | `action` | `physical` | `grappled`, `restrained` |
| **Purify Water** | 1 | `creation` | `action` | — | — |
| **Rock Throw** | 1 | `damage` | `action` | `physical` | `pushed`, `prone` |
| **Sticks to Snakes** | 1 | `summoning` | `action` | `physical` | — |
| **Venomous Weapon** | 1 | `enhancement` | `action` | `poison` | `poisoned` |
| **Wild Companion** | 1 | `summoning` | `ritual` | — | — |
| **Heat Metal** | 2 | `debuff`, `damage` | `action` | `fire` | — |
| **Law of the Strongest** | 2 | `enhancement`, `transformation` | `action` | — | — |
| **Living Plants** | 2 | `debuff`, `creation` | `action` | `physical` | `grappled`, `restrained` |
| **Melt Ground** | 2 | `debuff` | `action` | — | — |
| **Nature's Passage** | 2 | `movement`, `buff` | `action` | — | — |
| **Rock Skin** | 2 | `protection` | `action` | — | — |
| **Speak with Animals and Plants** | 2 | `information` | `action` | — | — |
| **Sudden Growth** | 2 | `creation` | `action` | — | — |
| **Thorn Barrage** | 2 | `damage`, `debuff` | `action` | `physical` | `bleeding` |
| **Toxic Mist** | 2 | `damage`, `debuff` | `action` | `poison` | `poisoned` |
| **Water Prison** | 2 | `debuff` | `action` | — | `grappled`, `restrained` |
| **Animal Messenger** | 3 | `information` | `action` | — | — |
| **Fungal Growth** | 3 | `debuff` | `action` | — | `confused` |
| **Impalement** | 3 | `damage` | `action` | `physical` | `pushed` |
| **Insect Swarm** | 3 | `damage`, `debuff` | `action` | `physical` | — |
| **Life from Stone** | 3 | `summoning` | `action` | `physical` | `prone` |
| **Nature's Judgment** | 3 | `debuff` | `action` | — | `marked` |
| **Petrification** | 3 | `debuff` | `action` | — | `stunned`, `paralyzed`, `unconscious` |
| **Stone Pillar** | 3 | `creation` | `action` | `physical` | — |
| **Control Weather** | 4 | `debuff` | `action` | — | — |
| **Tree Stride** | 4 | `movement` | `action` | — | — |

#### Peace

| Spell | Rank | Effect | Action Economy | Damage Type | Condition |
| --- | --- | --- | --- | --- | --- |
| **Aura of Sanctuary** | 0 | `protection` | `quick-action` | — | — |
| **Calming Influence** | 0 | `debuff` | `action` | — | `charmed` |
| **Tranquil Mind** | 0 | `healing`, `damage` | `action` | `psychic` | `dazed` |
| **Blessing of Peace** | 1 | `buff` | `action` | — | — |
| **Harmonic Link** | 1 | `protection` | `action` | — | — |
| **Pacifying Weapon** | 1 | `enhancement` | `action` | — | `dazed` |
| **Share Harm** | 1 | `damage` | `quick-action` | — | — |
| **Dome of Sanctuary** | 2 | `protection`, `damage` | `action` | `psychic` | `prone` |
| **Slow** | 2 | `debuff` | `action` | — | `stunned` |
| **Spell-breaking Wave** | 2 | `debuff` | `action` | — | — |
| **Anti-Magic Field** | 3 | `immunity` | `action` | — | — |
| **Martyrdom's Blessing** | 3 | `protection`, `buff` | `action` | — | — |
| **Pacifying Presence** | 3 | `debuff` | `action` | `psychic` | — |

#### Tempest

| Spell | Rank | Effect | Action Economy | Damage Type | Condition |
| --- | --- | --- | --- | --- | --- |
| **Gust** | 0 | `damage` | `action` | `blast` | `pushed` |
| **Static Shock** | 0 | `damage` | `action` | `lightning` | — |
| **Wind Slash** | 0 | `damage` | `action` | `blast` | — |
| **Bursting Crackle** | 1 | `damage`, `debuff` | `action` | `blast` | `dazed`, `deafened` |
| **Curse of Tempest** | 1 | `debuff` | `action` | — | — |
| **Earthen Tremor** | 1 | `damage`, `debuff` | `action` | `physical` | `staggered` |
| **Electrified Weapon** | 1 | `enhancement` | `action` | `lightning` | `staggered` |
| **Lightning Javelin** | 1 | `damage` | `action` | `lightning` | `staggered` |
| **Storm Coat** | 1 | `resistance`, `enhancement` | `action` | `lightning` | — |
| **Storm Shield** | 1 | `protection` | `quick-action` | `blast` | — |
| **Volcanic Bolt** | 1 | `damage` | `action` | `fire` | `burning` |
| **Wind Hose** | 1 | `damage`, `debuff` | `action` | `blast` | `grappled`, `restrained` |
| **Conjure Elemental** | 2 | `summoning` | `action` | — | — |
| **Lightning Bolt** | 2 | `damage` | `action` | `lightning` | `staggered` |
| **Lightning Step** | 2 | `movement`, `damage` | `quick-action` | `blast` | — |
| **Magma Burst** | 2 | `damage` | `action` | `fire` | `burning` |
| **Pyroclasm** | 2 | `damage` | `action` | `fire` | `prone` |
| **Storm Cloud** | 2 | `damage` | `action` | `lightning` | — |
| **Thunder Clap** | 2 | `damage` | `action` | `blast` | `prone`, `deafened` |
| **Torrent** | 2 | `damage` | `action` | `physical` | `pushed`, `prone` |
| **Wind Ward** | 2 | `protection` | `action` | — | `deafened` |
| **Chain Lightning** | 3 | `damage` | `action` | `lightning` | `staggered` |
| **Cone of Cold** | 3 | `damage` | `action` | `frost` | `slowed` |
| **Cyclone** | 3 | `damage`, `debuff` | `action` | `blast` | `prone`, `pushed` |
| **Lightning Volley** | 3 | `damage` | `action` | `lightning` | — |
| **Sandstorm** | 3 | `damage`, `debuff` | `action` | `physical` | `blinded` |
| **Shattering Orb** | 3 | `damage` | `action` | `blast` | `prone`, `deafened` |
| **Wind Wall** | 3 | `protection`, `debuff` | `action` | `blast` | `pushed` |
| **Avatar of Storms** | 4 | `transformation`, `enhancement` | `action` | `lightning` | — |
| **Control Water** | 4 | `debuff` | `action` | `physical` | `staggered` |
| **Control Winds** | 4 | `debuff` | `action` | — | — |
| **Earthquake** | 4 | `debuff` | `action` | `physical` | `prone` |
| **Lightning Storm** | 4 | `damage` | `action` | `lightning` | — |

#### Twilight

| Spell | Rank | Effect | Action Economy | Damage Type | Condition |
| --- | --- | --- | --- | --- | --- |
| **Dark Sight** | 0 | `buff`, `enhancement` | `action` | — | — |
| **Night's Grasp** | 0 | `damage`, `debuff` | `action` | `frost` | `slowed`, `grappled` |
| **Obscuring Veil** | 0 | `transformation`, `buff` | `action` | — | — |
| **Shadow Veil** | 0 | `creation` | `action` | — | `blinded` |
| **Whispers of Doubt** | 0 | `damage`, `debuff` | `action` | `psychic` | `confused` |
| **Cloak of Night** | 1 | `protection`, `buff` | `action` | — | — |
| **Curse of Twilight** | 1 | `debuff` | `action` | — | — |
| **Haunting Shadows** | 1 | `damage`, `debuff` | `action` | `psychic` | — |
| **Lunar Weapon** | 1 | `enhancement` | `action` | `frost` | `slowed` |
| **Moon Sphere** | 1 | `damage` | `action` | `frost` | — |
| **Shadow Meld** | 1 | `transformation` | `action` | — | `hidden` |
| **Whisper of Dreams** | 1 | `debuff` | `action` | — | `unconscious` |
| **Aura of Fear** | 2 | `debuff`, `damage` | `action` | `psychic` | `frightened` |
| **Everlasting Night** | 2 | `creation` | `action` | — | `blinded` |
| **Moonbeam** | 2 | `damage`, `debuff` | `action` | `frost` | `blinded` |
| **Shadow Step** | 2 | `movement` | `action` | — | — |
| **Silent Night** | 2 | `creation`, `debuff` | `action` | — | `deafened` |
| **Terrors of the Dark** | 2 | `damage`, `debuff` | `action` | `psychic` | `frightened`, `stunned` |
| **Twilight Bind** | 2 | `debuff` | `action` | — | `charmed` |
| **Nightmare Realm** | 3 | `damage`, `debuff` | `action` | `psychic` | `stunned`, `staggered` |
| **Shadow Clone** | 3 | `creation`, `movement` | `action` | — | — |
| **Embrace of Night** | 4 | `transformation`, `enhancement` | `action` | — | — |

#### War

| Spell | Rank | Effect | Action Economy | Damage Type | Condition |
| --- | --- | --- | --- | --- | --- |
| **Battle Surge** | 0 | `buff` | `quick-action` | — | — |
| **Mighty Strike** | 0 | `enhancement` | `action` | `physical` | — |
| **Spectral Slash** | 0 | `damage` | `action` | `physical` | `bleeding` |
| **Curse of War** | 1 | `debuff` | `action` | — | `frightened` |
| **Heroic Weapon** | 1 | `enhancement` | `action` | `physical` | `frightened` |
| **Tear Wound** | 1 | `damage` | `action` | `physical` | `bleeding` |
| **War Cry** | 1 | `debuff` | `quick-action` | — | `frightened` |
| **Weapon Spirit** | 1 | `summoning`, `damage` | `action` | `physical` | — |
| **Ancestral Warriors** | 2 | `damage`, `summoning` | `action` | `physical` | — |
| **Blood Sacrifice** | 2 | `buff` | `quick-action` | — | — |
| **Haste** | 2 | `enhancement`, `buff` | `action` | — | `paralyzed` |

---

## Appendix F: Spell Audit Summary Statistics

### Spells by Effect

| Effect | Count |
| --- | --- |
| `damage` | 132 |
| `debuff` | 82 |
| `healing` | 22 |
| `protection` | 20 |
| `information` | 16 |
| `enhancement` | 15 |
| `buff` | 14 |
| `creation` | 13 |
| `movement` | 11 |
| `transformation` | 9 |
| `summoning` | 8 |
| `resistance` | 5 |
| `immunity` | 2 |

> Note: Spells may have multiple effect tags. Counts sum to more than the total number of spells.

**Total: 279 spells**

### Spells by Damage Type

Counts spells that deal a given damage type (a spell may appear in multiple rows if it deals multiple types).

| Damage Type | Count |
| --- | --- |
| `physical` | 42 |
| `necrotic` | 40 |
| `psychic` | 37 |
| `blast` | 36 |
| `lightning` | 31 |
| `fire` | 30 |
| `frost` | 25 |
| `radiant` | 16 |
| `poison` | 11 |
| `acid` | 6 |

### Most Referenced Conditions (Spells)

| Condition | Count |
| --- | --- |
| `stunned` | 23 |
| `slowed` | 16 |
| `poisoned` | 15 |
| `frightened` | 15 |
| `prone` | 15 |
| `dazed` | 15 |
| `staggered` | 13 |
| `grappled` | 12 |
| `blinded` | 12 |
| `restrained` | 12 |
| `paralyzed` | 10 |
| `burning` | 9 |
| `bleeding` | 7 |
| `confused` | 7 |
| `deafened` | 7 |
| `pushed` | 7 |
| `unconscious` | 6 |
| `hidden` | 4 |
| `charmed` | 4 |
| `marked` | 3 |

### Key Observations

1. **Damage and debuff dominate spell design.** `damage` appears on 132 spells and `debuff` on 82. This reflects the transgressive nature of arcane magic and the martial/death aspects of several mystic traditions. Healing effects are concentrated in the Life tradition.

2. **Stunned is the most common condition.** It appears in 23 spells across disciplines including telekinetics, necromancy, tempest, and twilight. This reflects the system's emphasis on lockdown as a primary control vector. Slowed, frightened, prone, dazed, and poisoned each appear in 15–16 spells, forming the core condition vocabulary.

3. **Physical and necrotic are the most common damage types among spells.** Physical dominates nature and war traditions (which use weapons or conjured forces), while necrotic defines necromancy and the Death tradition. Fire, lightning, and blast form a second tier, driven by evocation and tempest.

4. **Enhancement and creation provide non-combat utility.** 15 spells carry the `enhancement` tag (weapon enchantments, body transformations) and 13 carry `creation` (terrain, objects, illusions), providing meaningful non-damage options across multiple traditions.

5. **Summoning is rare but impactful.** Only 8 spells carry the `summoning` tag, concentrated in conjuration, necromancy, nature, and war. These tend to be high-commitment spells requiring concentration.

6. **Several spells are stubs or placeholders.** Prismatic Missile, Orbiting Shards, Wave of Madness, Invade Dreams, Seeming, Astral Body (conjuration), Force Cage, Teleportation Circle, Detect Life, Distortion Field, Invert Gravity, Sandstorm, Stone Pillar, Control Weather, Earthquake, Lightning Storm, Control Winds, and Silent Night have minimal or placeholder text. Their tags are provisional and based on inferred intent.

7. **The Life tradition is unique in its healing focus.** It is the only tradition where `healing` is the primary effect for the majority of spells. All other traditions treat healing as an incidental or absent effect, consistent with the design philosophy that healing magic is concentrated in one path.

8. **Ritual spells are rare but span multiple categories.** Ritual casting appears in conjuration (Arcane Glyph, Alarm, Conjure Familiar), necromancy (Animate Corpse, Animate Horde), telepathy (Psychometry, Invade Dreams, Astral Body), light (Break Curse), and nature (Wild Companion). Rituals are used exclusively for summoning, information, or permanent effects — never for direct damage.
