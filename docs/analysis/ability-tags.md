# Ability Tags: Standardized Tagging System

This document defines a structured set of ability tags for use across all folk abilities, talents, combat arts, and spells in Nexus RPG. Tags are organized into groups by category, each serving a distinct purpose for categorization, filtering, and design clarity.

---

## Purpose

Ability tags provide a fixed vocabulary for describing **what an ability does** and **how it interacts** with the rest of the game. They serve three goals:

1. **Categorization** — Enable filtering and grouping of abilities by role, effect, or mechanic.
2. **Design consistency** — Give content creators a shared checklist when designing new abilities.
3. **Gameplay clarity** — Help players and GMs quickly assess what an ability offers in play.

Tags are descriptive labels applied to abilities after they are designed. They do not change how an ability works, but they standardize how abilities are described and referenced.

---

## Tag Groups

Each ability receives one or more tags from the groups below. Not every group is required for every ability — apply only the groups that are relevant.

### 1. Source

Identifies the origin category of the ability. Every ability receives exactly one source tag.

| Tag | Description |
| --- | --- |
| `folk` | Innate ability granted by a character's folk (ancestry). |
| `talent` | Ability gained through skill rank progression. |
| `combat-art` | Weapon technique learned through Fighting or Archery talents. |
| `spell` | Magical ability cast using Arcana or Mysticism. |

> **Existing usage.** The codebase already uses these four source categories in `AbilityTag.ts` (`'Combat Art'`, `'Talent'`, `'Folk'`, `'Other'`). The tag `Other` serves as a fallback for abilities that do not fit the three primary sources.

---

### 2. Role

Describes the primary tactical function of the ability. Assign one primary role and optionally one or two secondary roles.

| Tag | Description | Examples |
| --- | --- | --- |
| `offense` | Deals damage, threatens, or removes opposition. | Brutal Strike, Fireball, Orcish Fury |
| `defense` | Protects, mitigates harm, or creates a safe posture. | Defensive Strike, Elemental Ward, Stoneskin |
| `healing` | Restores HP or relieves conditions or afflictions. | Heal Wounds, Second Wind, Field Medic |
| `control` | Shapes enemy behavior, imposes conditions, or manipulates the environment. | Felling Strike, Color Spray, Pinning Shot |
| `support` | Empowers allies, provides boons, or reshapes social outcomes. | Inspire Ally, Bless, Exhilarating Strike |
| `utility` | Provides exploration, knowledge, travel, crafting, or scene tools. | Identify Artifact, Teleport, Herbalist |

> **Design note.** These six roles are already used throughout the design guides for spells, talents, and skill role spreads. This group formalizes them as tags.

---

### 3. Action Economy

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

### 4. Damage Type

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

### 5. Condition

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

### 6. Range

Describes the operational range of the ability. Apply the most specific range that applies.

| Tag | Description |
| --- | --- |
| `self` | Affects only the user. |
| `touch` | Requires physical contact. |
| `melee` | Effective at melee distance. |
| `close` | Effective at close range. |
| `short` | Effective at short range. |
| `medium` | Effective at medium range. |
| `long` | Effective at long range. |
| `extreme` | Effective at extreme range. |

> **Source.** These match the `rangeTypeArray` in the codebase and the distance categories in the combat rules.

---

### 7. Target

Describes who or what the ability affects. An ability may have multiple target tags.

| Tag | Description |
| --- | --- |
| `single-target` | Affects one creature or object. |
| `multi-target` | Affects a specified number of creatures or objects. |
| `area` | Affects all creatures or objects in a defined area (cone, line, burst, etc.). |
| `self-target` | Affects only the caster or user. |
| `ally` | Targets or benefits one or more allies. |
| `enemy` | Targets or harms one or more enemies. |

---

### 8. Effect Type

Describes the mechanical effect category of the ability. An ability may have multiple effect type tags.

| Tag | Description | Examples |
| --- | --- | --- |
| `damage` | Deals HP damage to a target. | Chromatic Orb, Brutal Strike |
| `healing` | Restores HP to a target. | Heal Wounds, Exhilarating Strike |
| `buff` | Grants a positive bonus, boon, or beneficial effect. | Bless, Flaming Weapon |
| `debuff` | Imposes a penalty, bane, or harmful condition. | Color Spray, Terrifying Strike |
| `movement` | Grants, modifies, or restricts movement. | Fleet-Footed, Charge, Pinning Shot |
| `protection` | Provides AV, damage reduction, or shielding. | Stoneskin, Elemental Ward |
| `resistance` | Grants resistance to a damage type or condition. | Thick Scales, Tough Stomach |
| `immunity` | Grants immunity to a condition or damage type. | Pride above Death (partial) |
| `summoning` | Creates or summons creatures, objects, or forces. | Summon Beast, Conjure Object |
| `transformation` | Changes the form, shape, or nature of a target. | Polymorph, Shape Changer |
| `information` | Reveals hidden knowledge, detects threats, or provides insight. | Divine Sense, Identify Weakness |
| `creation` | Produces items, tools, terrain, or resources. | Quick Construction, Makeshift Artisan |
| `enhancement` | Temporarily improves a weapon, armor, or item. | Flaming Weapon, Enchant |

---

### 9. Weapon Category

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

### 10. Magic School

Identifies the arcane discipline or mystic tradition of a spell or magical ability. Apply only to spells and magical talents.

**Arcane Disciplines**

| Tag | Aspects |
| --- | --- |
| `evocation` | Fire, frost, lightning, acid, blast. |
| `illusion` | Trickery, misdirection, obfuscation, hallucinations, distortion. |
| `conjuration` | Objects, creatures, teleportation, binding, force. |
| `telepathy` | Influence, communication, insight, domination, memory. |
| `telekinetics` | Move, repel, levitate, crush, gravity. |
| `necromancy` | Decay, undeath, siphoning, defilement, puppetry. |

**Mystic Traditions**

| Tag | Aspects |
| --- | --- |
| `light` | Sun, illumination, truth, clarity, judgement. |
| `twilight` | Moon, dreams, secrets, fate, illusion. |
| `life` | Vitality, blessings, community, hope, fertility. |
| `death` | Plagues, curses, fear, decay, ancestry. |
| `nature` | Earth, water, animals, plants. |
| `tempest` | Hurricanes, earthquakes, thunderstorms, sandstorms, floods. |
| `peace` | Calmness, protection, selflessness, travel, law. |
| `war` | Fury, pride, blood, justice, triumph. |

---

### 11. Skill

Identifies the skill tied to the ability. Apply to talents and combat arts.

| Tag | Category |
| --- | --- |
| `fighting` | Combat |
| `archery` | Combat |
| `arcana` | Magic |
| `mysticism` | Magic |
| `athletics` | Physical |
| `fortitude` | Physical |
| `influence` | Social |
| `insight` | Social |
| `perception` | Awareness |
| `stealth` | Subterfuge |
| `crafting` | Expert |
| `education` | Expert |
| `lore` | Expert |
| `nature` | Expert |
| `streetwise` | Expert |
| `survival` | Expert |

---

### 12. Duration

Describes how long the ability's effect lasts. Apply one duration tag.

| Tag | Description |
| --- | --- |
| `instant` | Effect resolves immediately with no lingering duration. |
| `briefly` | Lasts until the end of the next turn. |
| `short` | Lasts until the next short break. |
| `medium` | Lasts for approximately one hour. |
| `long` | Lasts until the next long rest. |
| `permanent` | Lasts indefinitely or until dispelled. |

> **Source.** These match the official duration categories in the combat and magic rules.

---

### 13. Spell Property

Identifies spell-specific mechanical properties. Apply only to spells.

| Tag | Description |
| --- | --- |
| `quick` | Can be cast as a Quick Action. |
| `concentrate` | Requires ongoing Spell Concentration. |
| `enchant` | Temporarily enhances a person or piece of equipment. |
| `singular` | Only one instance of this spell can be active at a time. |
| `ritual` | Requires extended casting time. |
| `illusory` | Creates a false sensory effect that can be detected. |
| `material` | Requires a material component (not consumed). |
| `material-cost` | Requires a material component (consumed on cast). |
| `blast` | Directional area effect (cone or line). |

> **Source.** These are the official spell properties defined in `docs/07-magic/05-spell-properties.md`.

---

## Tag Application Guidelines

### General Rules

1. **Apply tags conservatively.** Only tag what the ability explicitly does. Do not tag based on what it *could* be used for narratively.
2. **Source is mandatory.** Every ability must have exactly one source tag.
3. **Role is strongly recommended.** Every ability should have at least one role tag. Assign a primary role first, then secondary roles if the ability clearly serves multiple functions.
4. **Effect type captures mechanics.** Use effect type tags to describe the mechanical outcome (damage, healing, buff, debuff, etc.).
5. **Conditions are specific.** Only apply condition tags when the ability explicitly inflicts, removes, or references a named condition from the rules.
6. **Damage types follow the rules.** Only tag a damage type if the ability specifies it. If no damage type is mentioned, the default is `physical`.
7. **Weapon category applies to combat arts and weapon-specific talents only.** Do not tag spells or folk abilities with weapon categories unless they explicitly create or interact with weapons.

### Tagging by Source

**Folk Abilities:**
- Always tag: source (`folk`), role, effect type.
- Often tag: action economy (`passive` for most), range (`self` for most).
- Sometimes tag: damage type, condition, weapon category (for natural weapons like claws/horns).

**Talents:**
- Always tag: source (`talent`), role, skill, effect type.
- Often tag: action economy.
- Sometimes tag: damage type, condition, weapon category, duration.

**Combat Arts:**
- Always tag: source (`combat-art`), role (`offense` for most), weapon category, skill (`fighting` or `archery`).
- Often tag: effect type, action economy (`action` for most), condition.
- Sometimes tag: damage type (if non-physical), range.

**Spells:**
- Always tag: source (`spell`), role, magic school, effect type, range, target.
- Often tag: damage type, condition, duration, spell property, action economy.

---

## Example Tags for Existing Abilities

### Folk Ability — Stoneskin (Dwarf)

> **Effect:** You gain +1 AV (armor bonus). This effect doesn't stack with worn armor.

| Group | Tags |
| --- | --- |
| Source | `folk` |
| Role | `defense` |
| Action Economy | `passive` |
| Effect Type | `protection` |
| Range | `self` |
| Target | `self-target` |
| Duration | `permanent` |

### Talent — Inspire Ally (Influence)

> **Effect:** (Rank 1) Once per combat encounter, you can use your Quick Action to inspire one ally in short range who can see or hear you. They gain +1 boon on their next roll.

| Group | Tags |
| --- | --- |
| Source | `talent` |
| Role | `support` |
| Skill | `influence` |
| Action Economy | `quick-action` |
| Effect Type | `buff` |
| Range | `short` |
| Target | `single-target`, `ally` |
| Duration | `briefly` |

### Combat Art — Felling Strike (Fighting)

> **Effect:** (Axes, Maces, Polearms) On a strong or critical hit, the target is knocked prone. On a critical hit, the target is also briefly restrained.

| Group | Tags |
| --- | --- |
| Source | `combat-art` |
| Role | `offense`, `control` |
| Skill | `fighting` |
| Weapon Category | `axe`, `mace`, `polearm` |
| Action Economy | `action` |
| Effect Type | `damage`, `debuff` |
| Condition | `prone`, `restrained` |
| Target | `single-target`, `enemy` |

### Spell — Fireball (Evocation, Rank 3)

> **Effect:** You hurl a ball of flame at a target location which detonates in a blazing explosion. Target all creatures in the spell's area. Weak: Deal +6 fire damage. Strong: Deal +12 fire damage. Critical: Deal +18 fire damage and targets are briefly burning (4).

| Group | Tags |
| --- | --- |
| Source | `spell` |
| Role | `offense` |
| Magic School | `evocation` |
| Action Economy | `action` |
| Damage Type | `fire` |
| Effect Type | `damage` |
| Condition | `burning` |
| Range | `long` |
| Target | `area`, `enemy` |
| Spell Property | `blast` |
| Duration | `instant` |

### Spell — Heal Wounds (Life, Rank 1)

> **Effect:** You channel restorative energy into a wounded creature. Weak: Restore 4 HP. Strong: Restore 8 HP. Critical: Restore 12 HP and end one condition.

| Group | Tags |
| --- | --- |
| Source | `spell` |
| Role | `healing` |
| Magic School | `life` |
| Action Economy | `action` |
| Effect Type | `healing` |
| Range | `touch` |
| Target | `single-target`, `ally` |
| Duration | `instant` |

---

## Migration Strategy

### Phase 1: Documentation (Current)

- Define all tag groups and their fixed sets of tags (this document).
- Establish guidelines for how to apply tags to each ability source.
- Provide example taggings for representative abilities from each source.

### Phase 2: Ability Audit

- Review all existing folk abilities (~30 across 10+ folk) and assign tags.
- Review all existing talents (~115 across 16 skills) and assign tags.
- Review all existing combat arts (~50 basic + supreme) and assign tags.
- Review all existing spells (~230 across 14 traditions/disciplines) and assign tags.
- Compile audit results into a reference table or structured data file.

### Phase 3: Data Integration

- Evaluate whether tags should be stored in the existing markdown data files, in separate structured data (JSON/YAML), or both.
- Consider extending the `AbilityTag` type in the codebase to support the new tag groups alongside the existing source tags.
- If tags are added to the data layer, update extractors and parsers (e.g., `extract-folk-from-markdown.py`, spell parsers) to read and write tags.
- Update the character sheet UI to support filtering and displaying abilities by tag groups beyond the existing source filter.

### Phase 4: Content Validation

- Use tags as a design checklist for new content: every new ability should be taggable using existing tags.
- Identify gaps where abilities cannot be cleanly tagged, and evaluate whether new tags are needed or the ability needs clarification.
- Tags should not be expanded casually — any new tag must be reviewed against the full existing set to avoid duplication.

---

## Summary of Tag Groups

| # | Group | Purpose | Count | Required? |
| --- | --- | --- | --- | --- |
| 1 | Source | Origin of the ability | 4 | Yes (exactly one) |
| 2 | Role | Tactical function | 6 | Yes (at least one) |
| 3 | Action Economy | When/how it is used | 7 | Recommended |
| 4 | Damage Type | Type of damage dealt | 10 | If deals damage |
| 5 | Condition | Conditions inflicted/removed | 21 | If references conditions |
| 6 | Range | Operational distance | 8 | Recommended |
| 7 | Target | Who it affects | 6 | Recommended |
| 8 | Effect Type | Mechanical outcome | 13 | Yes (at least one) |
| 9 | Weapon Category | Weapon types involved | 9 | Combat arts / weapon talents |
| 10 | Magic School | Arcane discipline or mystic tradition | 14 | Spells / magical talents |
| 11 | Skill | Associated skill | 16 | Talents / combat arts |
| 12 | Duration | How long the effect lasts | 6 | Recommended for non-instant |
| 13 | Spell Property | Spell-specific mechanics | 9 | Spells only |

**Total unique tags: 129** across 13 groups.

---

## Appendix A: Folk Ability Audit

All folk abilities reviewed and tagged. Abilities are grouped by folk.

### Dwarf

| Ability | Role | Action Economy | Effect Type | Condition | Damage Type | Range | Target | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Dwarven Sight** | `utility` | `passive` | `information` | — | — | `self` | `self-target` | `permanent` |
| **Stoneskin** | `defense` | `passive` | `protection`, `resistance` | `poisoned` | — | `self` | `self-target` | `permanent` |
| **Squat Build** | `defense` | `passive` | `resistance` | `prone`, `pushed` | — | `self` | `self-target` | `permanent` |

### Elf

| Ability | Role | Action Economy | Effect Type | Condition | Damage Type | Range | Target | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Night Vision** | `utility` | `passive` | `information` | — | — | `self` | `self-target` | `permanent` |
| **Fleet-Footed** | `utility` | `free` | `movement` | — | — | `self` | `self-target` | `briefly` |
| **Spiritual Symbiosis** | `utility` | `passive` | `buff` | — | — | `self` | `self-target` | `permanent` |

### Gnome

| Ability | Role | Action Economy | Effect Type | Condition | Damage Type | Range | Target | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Natural Empath** | `utility` | `action` | `information` | — | `psychic` | `close` | `single-target` | `instant` |
| **Scent of Illusions** | `defense` | `passive` | `resistance` | — | — | `self` | `self-target` | `permanent` |
| **Small Stature** | `utility` | `passive` | `buff`, `debuff` | — | — | `self` | `self-target` | `permanent` |

### Hune

| Ability | Role | Action Economy | Effect Type | Condition | Damage Type | Range | Target | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Giant's Blood** | `defense`, `utility` | `passive` | `buff` | — | — | `self` | `self-target` | `permanent` |
| **Stoic Mind** | `defense` | `passive` | `protection`, `buff` | — | — | `self` | `self-target` | `permanent` |

### Orc

| Ability | Role | Action Economy | Effect Type | Condition | Damage Type | Range | Target | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Orcish Fury** | `offense` | `passive` | `damage` | — | `physical` | `melee` | `single-target`, `enemy` | `instant` |
| **Pride above Death** | `defense` | `reaction` | `immunity` | — | — | `self` | `self-target` | `instant` |

### Goblin

| Ability | Role | Action Economy | Effect Type | Condition | Damage Type | Range | Target | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Night Vision** | `utility` | `passive` | `information` | — | — | `self` | `self-target` | `permanent` |
| **Quick Escape** | `defense` | `reaction` | `movement` | — | — | `self` | `self-target` | `instant` |
| **Small Stature** | `utility` | `passive` | `buff`, `debuff` | — | — | `self` | `self-target` | `permanent` |

### Human

| Ability | Role | Action Economy | Effect Type | Condition | Damage Type | Range | Target | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Will of Perseverance** | `utility` | `free` | `buff` | — | — | `self` | `self-target` | `instant` |
| **Arcane Awakening** | `utility` | `passive` | `buff` | — | — | `self` | `self-target` | `permanent` |

### Catfolk

| Ability | Role | Action Economy | Effect Type | Condition | Damage Type | Range | Target | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Night Vision** | `utility` | `passive` | `information` | — | — | `self` | `self-target` | `permanent` |
| **Intimidating Roar** | `control` | `action` | `debuff` | `frightened` | — | `short` | `area`, `enemy` | `short` |
| **Sharp Claws** | `offense` | `passive` | `damage` | — | `physical` | `melee` | `single-target`, `enemy` | `permanent` |

### Lizardfolk

| Ability | Role | Action Economy | Effect Type | Condition | Damage Type | Range | Target | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Thick Scales** | `defense` | `passive` | `protection` | — | — | `self` | `self-target` | `permanent` |
| **Aquatic Nature** | `utility` | `passive` | `buff` | — | — | `self` | `self-target` | `permanent` |
| **Reptile Jaws** | `offense` | `passive` | `damage` | — | `physical` | `melee` | `single-target`, `enemy` | `permanent` |

### Minotaur

| Ability | Role | Action Economy | Effect Type | Condition | Damage Type | Range | Target | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Giant's Blood** | `defense`, `utility` | `passive` | `buff` | — | — | `self` | `self-target` | `permanent` |
| **Horns** | `offense` | `passive` | `damage` | — | `physical` | `melee` | `single-target`, `enemy` | `permanent` |
| **Goring Charge** | `offense` | `action` | `damage`, `movement` | — | `physical` | `melee` | `single-target`, `enemy` | `instant` |

---

## Appendix B: Combat Art Audit

All combat arts reviewed and tagged. Weapon categories listed correspond to the combat art's weapon requirements.

### Basic Combat Arts

| Combat Art | Role | Weapon Category | Effect Type | Condition | Notes |
| --- | --- | --- | --- | --- | --- |
| **Aimed Shot** | `offense` | `bow`, `crossbow`, `thrown` | `buff` | — | Self-buff: +1 boon if no movement |
| **Barrage** | `offense` | `bow`, `thrown` | `damage` | — | Extra attack with bane |
| **Brutal Strike** | `offense` | `axe`, `blade`, `mace`, `polearm` | `damage` | — | Strength scaling damage |
| **Charge** | `offense`, `control` | `axe`, `blade`, `mace`, `polearm`, `shield` | `damage`, `movement` | `pushed`, `prone` | Free movement + shove |
| **Choking Grip** | `offense`, `control` | `brawling`, `thrown` | `damage`, `debuff` | `grappled`, `restrained`, `dazed` | Grapple with extra effects |
| **Cleave** | `offense` | `axe`, `blade`, `mace`, `polearm` | `damage` | — | Multi-target melee |
| **Deep Cut** | `offense` | `axe`, `blade`, `brawling`, `polearm` | `damage`, `debuff` | `bleeding` | Slash weapons, bleeding |
| **Defensive Strike** | `offense`, `defense` | `axe`, `blade`, `brawling`, `mace`, `polearm`, `shield` | `damage`, `buff` | — | Gain Defend on hit |
| **Disabling Shot** | `offense`, `control` | `bow`, `crossbow`, `thrown` | `damage`, `debuff` | `dazed`, `stunned` | Crush/heavy ranged |
| **Disarm** | `control` | `axe`, `blade`, `brawling`, `mace`, `polearm` | `debuff` | — | Disarm action on hit |
| **Disarming Shot** | `control` | `bow`, `crossbow`, `thrown` | `debuff` | — | Ranged disarm |
| **Divert Attention** | `control` | `axe`, `blade`, `brawling`, `mace`, `polearm` | `debuff` | `distracted` | Distract action on attack |
| **Evasive Strike** | `offense`, `defense` | `axe`, `blade`, `brawling`, `polearm` | `damage`, `movement` | — | Gain Retreat on hit |
| **Exhilarating Strike** | `offense`, `support` | `axe`, `blade`, `brawling`, `mace`, `polearm` | `damage`, `healing`, `buff` | — | Heal + buff allies on hit |
| **Feint** | `offense` | `blade`, `brawling`, `polearm` | `buff` | — | +1 boon if no movement |
| **Felling Strike** | `offense`, `control` | `axe`, `blade`, `brawling`, `mace`, `polearm`, `thrown` | `damage`, `debuff` | `prone`, `dazed` | Trip on hit |
| **Flurry** | `offense` | `axe`, `blade`, `brawling`, `mace`, `polearm` | `damage` | — | Extra melee attack with bane |
| **Head Smack** | `control` | `brawling`, `mace`, `shield` | `damage`, `debuff` | `confused` | Crush weapon, mental effect |
| **Knockout** | `control` | `brawling`, `mace`, `shield` | `damage`, `debuff` | `dazed`, `stunned` | Crush weapon, knockout |
| **Pinning Shot** | `control` | `bow`, `crossbow`, `thrown` | `debuff` | `restrained` | Immobilize target |
| **Power Shot** | `offense` | `bow`, `crossbow`, `thrown` | `damage` | — | Strength scaling ranged damage |
| **Precise Shot** | `offense` | `bow`, `crossbow`, `thrown` | `damage` | — | Ignore AV, Agility scaling |
| **Precise Strike** | `offense` | `blade`, `brawling`, `polearm` | `damage` | — | Pierce, ignore AV |
| **Quick Lunge** | `offense` | `blade`, `brawling`, `polearm` | `damage` | — | Targets Dodge, blocks Quick Action |
| **Ram Down** | `offense`, `control` | `brawling`, `mace`, `shield` | `damage`, `debuff` | `pushed`, `prone`, `dazed` | Shove + knockdown |
| **Snare** | `control` | `brawling`, `thrown` | `debuff` | `grappled`, `restrained`, `prone`, `dazed` | Grapple with restraint |
| **Splinter** | `control` | `axe`, `mace` | `debuff` | — | Destroy equipment |
| **Terrifying Strike** | `offense`, `control` | `axe`, `blade`, `mace`, `polearm` | `damage`, `debuff` | `frightened` | Demoralize on attack |
| **Volley** | `offense` | `bow`, `crossbow`, `thrown` | `damage` | — | Multi-target ranged |

### Supreme Combat Arts

| Combat Art | Role | Weapon Category | Effect Type | Condition | Notes |
| --- | --- | --- | --- | --- | --- |
| **Dashing Strike** | `offense` | `axe`, `blade`, `brawling`, `mace` | `damage`, `movement` | — | Line attack with supernatural movement |
| **Death from Above** | `offense` | `polearm` | `damage`, `movement` | `prone` | Leap attack, knockdown |
| **Devastating Piercer** | `offense` | `crossbow` | `damage` | — | Line-piercing multi-target |
| **Earth-shattering Strike** | `offense`, `control` | `mace` | `damage` | — | AoE ground destruction |
| **Force Slash** | `offense` | `axe`, `blade`, `polearm` | `damage` | — | Ranged slash wave |
| **Hundred Palm Strike** | `offense` | `brawling` | `damage` | — | Multi-hit unarmed combo |
| **Perfect Shot** | `offense`, `control` | `bow` | `damage`, `debuff` | `stunned` | Ignore all penalties, stun |
| **Phantom Cut** | `offense`, `control` | `blade` | `damage`, `debuff` | `staggered` | Ranged blade attack |
| **Projectile Storm** | `offense` | `thrown` | `damage` | — | AoE thrown weapons |
| **Rip and Tear** | `offense`, `control` | `axe` | `damage`, `debuff` | `staggered` | Armor destruction |
| **Shield Avalanche** | `offense`, `control`, `defense` | `shield` | `damage`, `debuff`, `protection` | `pushed`, `prone` | AoE shield slam + AV gain |
| **Supreme Barrage** | `offense` | `bow`, `thrown` | `damage` | — | Replaces Barrage, two extra attacks |
| **Supreme Cleave** | `offense` | `axe`, `blade`, `mace`, `polearm` | `damage` | — | Replaces Cleave, expanded range |
| **Supreme Disarm** | `control` | `axe`, `blade`, `brawling`, `mace`, `polearm` | `debuff` | `dazed` | Enhanced disarm |
| **Supreme Feint** | `offense` | `blade`, `brawling`, `polearm` | `damage`, `debuff` | `marked` | Enhanced feint, bonus damage |

---

## Appendix C: Talent Audit

All talents reviewed and tagged by skill. Each talent is tagged at its broadest scope across all ranks.

### Fighting Talents

| Talent | Role | Action Economy | Effect Type | Condition | Weapon Category |
| --- | --- | --- | --- | --- | --- |
| **Art of Fighting** | `offense` | `passive` | `buff` | — | — |
| **Axe Mastery** | `offense`, `control` | `quick-action` | `damage`, `debuff` | `bleeding` | `axe` |
| **Blade Mastery** | `offense` | `free` | `damage`, `buff` | `marked` | `blade` |
| **Defensive Dueling** | `defense` | `passive`, `quick-action` | `protection`, `debuff` | `marked` | `blade`, `brawling`, `polearm` |
| **Disciplined Fighter** | `offense` | `free`, `quick-action` | `buff`, `damage` | — | — |
| **Dual Wielder** | `offense`, `defense` | `passive` | `damage`, `protection` | — | — |
| **Heavy Weapon Mastery** | `offense` | `passive` | `damage`, `buff` | — | `axe`, `mace`, `polearm` |
| **Mace Mastery** | `offense` | `quick-action` | `damage`, `debuff` | `dazed` | `mace` |
| **Martial Artist** | `offense`, `defense` | `passive`, `reaction` | `damage`, `buff` | — | `brawling` |
| **Polearm Mastery** | `offense`, `defense` | `quick-action` | `damage`, `resistance` | `prone`, `pushed` | `polearm` |
| **Protective Stance** | `defense`, `support` | `quick-action` | `protection`, `resistance` | — | `shield` |
| **Pugilist** | `offense`, `defense` | `passive` | `damage`, `protection`, `healing` | `distracted` | `brawling` |
| **Riposte** | `offense`, `control` | `reaction` | `damage`, `debuff` | `dazed` | — |
| **Shield Mastery** | `defense` | `reaction` | `protection` | — | `shield` |

### Archery Talents

| Talent | Role | Action Economy | Effect Type | Condition | Weapon Category |
| --- | --- | --- | --- | --- | --- |
| **Ammo Specialist** | `offense` | `passive` | `damage`, `buff` | — | `bow`, `crossbow` |
| **Art of Archery** | `offense` | `passive` | `buff` | — | — |
| **Crossbow Mastery** | `offense`, `control` | `quick-action` | `damage`, `debuff` | `stunned` | `crossbow` |
| **Disciplined Archer** | `offense` | `free`, `quick-action` | `buff`, `damage` | — | — |
| **Expert Slinger** | `offense` | `free` | `damage`, `movement` | — | `thrown` |
| **Rapid Shot** | `offense` | `action` | `damage`, `debuff` | `marked` | `bow`, `crossbow`, `thrown` |
| **Reflexive Shooter** | `offense`, `defense` | `reaction` | `damage`, `buff` | — | `bow`, `crossbow`, `thrown` |
| **Sharpshooter** | `offense` | `passive` | `damage`, `buff`, `debuff` | `marked` | `bow`, `crossbow`, `thrown` |
| **Strong Grip** | `offense` | `passive` | `damage`, `buff` | — | `bow`, `crossbow` |

### Arcana Talents

| Talent | Role | Action Economy | Effect Type | Condition |
| --- | --- | --- | --- | --- |
| **Arcane Spell Knowledge** | `utility` | `passive` | `buff` | — |
| **Battle Mage** | `offense`, `defense` | `quick-action` | `damage`, `protection` | — |
| **Inexhaustible Mind** | `utility` | `downtime` | `buff` | — |
| **Mana Shield** | `defense` | `passive` | `protection` | — |
| **Master of Fundamentals** | `offense` | `free`, `reaction` | `damage`, `buff` | — |
| **Spellblade** | `offense` | `action` | `damage` | — |
| **Spellweaver** | `utility` | `passive` | `buff` | — |
| **Wild Overload** | `offense`, `utility` | `free` | `buff`, `debuff` | — |

### Mysticism Talents

| Talent | Role | Action Economy | Effect Type | Condition |
| --- | --- | --- | --- | --- |
| **Armor of the Faithful** | `defense` | `passive` | `protection`, `immunity` | `frightened`, `confused` |
| **Communal Practices** | `support` | `free` | `buff` | — |
| **Divine Favor** | `support` | `passive` | `buff` | — |
| **Divine Rites** | `utility` | `downtime` | `buff` | — |
| **Divine Sense** | `utility`, `defense` | `action` | `information`, `immunity` | `charmed`, `frightened`, `poisoned` |
| **Elemental Adept** | `offense` | `free` | `damage`, `buff` | — |
| **Master of Principles** | `offense` | `free`, `reaction` | `damage`, `buff` | — |
| **Mystic Champion** | `offense` | `action` | `damage` | — |
| **Mystical Spell Knowledge** | `utility` | `passive` | `buff` | — |
| **Pact of Devotion** | `offense`, `defense`, `support`, `healing` | `passive`, `quick-action`, `action` | `damage`, `healing`, `buff`, `protection`, `resistance` | `stunned` |
| **Shape Changer** | `offense`, `defense` | `passive` | `damage`, `protection`, `resistance`, `transformation` | — |

### Athletics Talents

| Talent | Role | Action Economy | Effect Type | Condition |
| --- | --- | --- | --- | --- |
| **Athletic Movement** | `utility` | `free`, `quick-action` | `movement`, `buff` | — |
| **Bulky** | `defense`, `utility` | `passive`, `quick-action` | `buff`, `movement` | — |
| **Escape Artist** | `defense` | `quick-action` | `movement`, `resistance` | `grappled`, `prone`, `pushed` |
| **Evasion** | `defense` | `quick-action` | `resistance`, `movement` | — |
| **Fast Stride** | `offense`, `defense` | `quick-action` | `movement` | — |
| **Grappler** | `control` | `action` | `debuff` | `grappled`, `restrained` |
| **Light Armor Mastery** | `defense` | `reaction` | `protection`, `buff` | — |
| **Stand your Ground** | `defense`, `control` | `quick-action` | `resistance`, `debuff` | `prone`, `pushed` |
| **Supernatural Mobility** | `utility` | `passive` | `movement` | — |

### Fortitude Talents

| Talent | Role | Action Economy | Effect Type | Condition |
| --- | --- | --- | --- | --- |
| **Adrenaline Rush** | `offense` | `passive` | `buff` | — |
| **Battle Rage** | `offense`, `defense` | `free` | `buff`, `damage`, `resistance`, `protection` | — |
| **Body of Bronze** | `defense` | `passive` | `protection`, `resistance`, `immunity` | `dazed`, `stunned` |
| **Drunken Technique** | `defense`, `offense` | `passive`, `reaction` | `protection`, `debuff`, `buff` | `marked`, `poisoned` |
| **Explorer's Tenacity** | `defense`, `utility` | `passive` | `buff`, `resistance` | — |
| **Hard to Kill** | `defense` | `passive` | `resistance`, `healing` | — |
| **Heavy Armor Mastery** | `defense` | `reaction` | `protection` | — |
| **Juggernaut** | `offense`, `defense` | `passive` | `protection`, `damage` | — |
| **Second Wind** | `healing` | `quick-action` | `healing` | — |
| **Strong Mind** | `defense` | `free` | `resistance`, `immunity` | `frightened`, `charmed` |
| **Tough Stomach** | `defense` | `quick-action` | `resistance` | `poisoned`, `frightened`, `dazed` |

### Influence Talents

| Talent | Role | Action Economy | Effect Type | Condition |
| --- | --- | --- | --- | --- |
| **Born Haggler** | `utility` | `downtime` | `buff` | — |
| **Fast Talking** | `support`, `utility` | `free` | `buff`, `debuff` | `dazed` |
| **Inspire Ally** | `support` | `quick-action` | `buff`, `healing` | — |
| **Insult to Injury** | `offense`, `control` | `quick-action` | `debuff`, `damage` | `distracted` |
| **Leading Presence** | `support` | `passive` | `buff`, `damage` | `frightened` |
| **Performer** | `support` | — | — | — |
| **Presence of Conquest** | `control` | — | `debuff` | `stunned` |

### Insight Talents

| Talent | Role | Action Economy | Effect Type | Condition |
| --- | --- | --- | --- | --- |
| **Empath** | `utility`, `control` | `quick-action` | `information`, `buff`, `debuff` | — |
| **Foresight** | `defense`, `utility` | — | `information` | — |
| **Intuitive Appraisal** | `utility`, `offense` | `quick-action` | `information`, `buff` | — |
| **Piercing Look** | `offense`, `control` | `quick-action` | `buff`, `debuff` | — |
| **Sense of Deduction** | `utility` | `free` | `information` | — |

### Perception Talents

| Talent | Role | Action Economy | Effect Type | Condition |
| --- | --- | --- | --- | --- |
| **Blind Senses** | `defense`, `utility` | `action`, `passive` | `information`, `resistance` | `blinded` |
| **Danger Sense** | `defense` | `passive` | `buff` | — |
| **Dungeon Delver** | `utility` | `action` | `information`, `resistance` | — |
| **Eagle Eye** | `utility`, `offense` | `quick-action` | `information`, `buff` | — |
| **Identify Weakness** | `offense` | `quick-action` | `damage`, `information` | — |

### Stealth Talents

| Talent | Role | Action Economy | Effect Type | Condition |
| --- | --- | --- | --- | --- |
| **Assassination** | `offense` | `passive` | `damage`, `buff` | — |
| **Devious Tactics** | `control` | `quick-action` | `debuff` | `distracted`, `marked` |
| **Hidden Strike** | `offense` | `quick-action` | `damage`, `debuff` | `stunned` |
| **Leading the Way** | `support` | `passive` | `buff` | — |
| **Roguish Wits** | `defense`, `utility` | `quick-action` | `buff`, `protection` | — |
| **Sleight of Hand** | `utility` | `action` | `buff` | — |

### Crafting Talents

| Talent | Role | Action Economy | Effect Type | Condition |
| --- | --- | --- | --- | --- |
| **Artisan** | `utility` | `downtime` | `buff` | — |
| **Efficient Worker** | `utility` | `downtime` | `buff` | — |
| **Maintenance** | `utility`, `support` | `downtime` | `buff` | — |
| **Master Artisan** | `utility` | `downtime` | `buff` | — |
| **Peak Performance** | `support` | `downtime` | `enhancement` | — |
| **Quick Construction** | `utility` | `action` | `creation` | — |

### Education Talents

| Talent | Role | Action Economy | Effect Type | Condition |
| --- | --- | --- | --- | --- |
| **Commander** | `support` | `quick-action` | `buff`, `damage`, `healing`, `movement` | — |
| **Diplomat** | `utility`, `support` | `action` | `information`, `buff`, `debuff` | — |
| **Eloquent Talker** | `support`, `control` | `free` | `buff`, `debuff` | `charmed` |
| **General Education** | `utility` | `passive` | `buff` | — |
| **Linguist** | `utility` | `passive` | `information` | — |
| **Tactician** | `support` | `action` | `buff`, `damage`, `healing` | — |

### Lore Talents

| Talent | Role | Action Economy | Effect Type | Condition |
| --- | --- | --- | --- | --- |
| **Channel Superstition** | `control` | `action` | `debuff` | `frightened` |
| **Consult the Myths** | `utility`, `control` | `action` | `information`, `debuff` | `dazed` |
| **Divine Scholar** | `utility` | `passive` | `buff` | — |
| **Identify Artifact** | `utility` | `action` | `information` | — |
| **Mage Hunter** | `offense`, `defense` | `reaction` | `debuff`, `protection` | — |
| **Magical Sense** | `utility`, `defense` | `quick-action` | `information`, `protection` | — |

### Nature Talents

| Talent | Role | Action Economy | Effect Type | Condition |
| --- | --- | --- | --- | --- |
| **Animal Companion** | `support`, `offense` | `passive` | `summoning`, `damage`, `buff` | — |
| **Beast Lore** | `utility`, `control` | `action` | `information`, `debuff` | `charmed` |
| **Expert Rider** | `utility`, `offense` | `passive` | `buff`, `damage` | — |
| **Field Medic** | `healing` | `action` | `healing` | — |
| **Herbalist** | `healing`, `utility` | — | `creation` | — |
| **Knowledgeable Wanderer** | `utility` | `passive` | `buff` | — |
| **Plant Lore** | `utility` | `free` | `information` | — |
| **Poison Maker** | `offense`, `utility` | `action` | `creation` | `poisoned` |

### Streetwise Talents

| Talent | Role | Action Economy | Effect Type | Condition |
| --- | --- | --- | --- | --- |
| **I Know A Guy** | `utility` | `downtime` | `information` | — |
| **Jack of All Trades** | `utility` | `free` | `buff` | — |
| **Swashbuckler** | `offense`, `defense` | `passive` | `damage`, `buff`, `movement` | — |
| **Thug Tactics** | `offense`, `support` | `passive` | `buff`, `debuff` | — |

### Survival Talents

| Talent | Role | Action Economy | Effect Type | Condition |
| --- | --- | --- | --- | --- |
| **Explorer of Nature** | `utility` | `free` | `buff` | — |
| **Makeshift Artisan** | `utility`, `offense` | `action` | `creation`, `damage` | — |
| **Monster Hunter** | `offense` | `quick-action` | `damage`, `information`, `debuff` | `stunned` |
| **Relentless Tracker** | `utility` | `free` | `information` | — |
| **Trap Maker** | `control`, `offense` | `action` | `damage`, `debuff`, `creation` | `prone`, `restrained` |
| **Wilderness Expert** | `utility` | `downtime` | `creation`, `buff` | — |

---

## Appendix D: Audit Summary Statistics

### Folk Abilities by Role

| Role | Count | % |
| --- | --- | --- |
| `defense` | 12 | 43% |
| `utility` | 12 | 43% |
| `offense` | 5 | 18% |
| `control` | 1 | 4% |
| `support` | 0 | 0% |
| `healing` | 0 | 0% |

> Note: Abilities may have multiple roles. Percentages are relative to total abilities (28).

### Folk Abilities by Action Economy

| Action Economy | Count | % |
| --- | --- | --- |
| `passive` | 21 | 75% |
| `free` | 2 | 7% |
| `reaction` | 2 | 7% |
| `action` | 2 | 7% |
| `quick-action` | 0 | 0% |

### Combat Arts by Role

| Role | Count | % |
| --- | --- | --- |
| `offense` | 42 | 95% |
| `control` | 23 | 52% |
| `defense` | 4 | 9% |
| `support` | 1 | 2% |

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

### Talents by Primary Role

| Role | Count |
| --- | --- |
| `offense` | 42 |
| `defense` | 37 |
| `utility` | 37 |
| `support` | 16 |
| `control` | 13 |
| `healing` | 5 |

### Talents by Action Economy

| Action Economy | Count |
| --- | --- |
| `passive` | 41 |
| `quick-action` | 36 |
| `free` | 18 |
| `action` | 16 |
| `reaction` | 6 |
| `downtime` | 10 |

### Key Observations

1. **Folk abilities are overwhelmingly passive.** 75% of folk abilities have no action cost. This is consistent with their design as innate, always-on traits.

2. **Combat arts are almost universally offensive.** 95% of combat arts have an `offense` role, with `control` as the most common secondary role (52%). Very few serve `defense` or `support` — this is a deliberate design choice since combat arts are weapon techniques.

3. **Talents are well-distributed across roles.** Offense, defense, and utility are roughly equal, with support and control as secondary. Healing talents are rare (only 5 across all skills), concentrated in Fortitude, Nature, and Mysticism.

4. **Prone and dazed are the most common conditions in combat arts.** These conditions dominate because they represent the most common outcomes of weapon techniques — knockdowns and disorientation.

5. **Quick-action economy is heavily used in talents.** 36 talents include quick-action abilities, making this the most common active timing after passive. This reflects the system's emphasis on tactical decisions during combat turns.

6. **Several talents and folk abilities are incomplete.** The following are marked as stubs or placeholders: Performer, Presence of Conquest, Foresight, Supernatural Mobility, Herbalist, Master Artisan, Adrenaline Rush, and the Dogfolk/Satyr folk. Their tags are provisional.

---

## Appendix E: Spell Audit

All spells reviewed and tagged by discipline/tradition. Only the base rank is tagged; heightened versions may add conditions or effects beyond what is listed.

### Arcane Disciplines

#### Evocation

| Spell | Rank | Role | Action Economy | Damage Type | Condition | Range | Target | Effect Type | Spell Property | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Flickering Flame** | 0 | `offense`, `utility` | `action` | `fire` | `burning` | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Frost Snap** | 0 | `offense`, `utility` | `action` | `frost` | `slowed`, `dazed` | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Static Spark** | 0 | `offense` | `action` | `lightning` | — | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Chromatic Orb** | 1 | `offense`, `control` | `action` | `acid`, `fire`, `frost`, `lightning`, `poison` | `burning`, `slowed`, `staggered`, `poisoned` | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Elemental Ward** | 1 | `defense` | `quick-action` | — | — | `self` | `self-target` | `resistance` | `quick` | `briefly` |
| **Flame Burst** | 1 | `offense` | `action` | `fire` | `burning` | `close` | `area`, `enemy` | `damage` | `blast` | `instant` |
| **Flaming Weapon** | 1 | `support`, `offense` | `action` | `fire` | — | `self` | `self-target` | `enhancement` | `enchant`, `singular` | `medium` |
| **Frozen Weapon** | 1 | `support`, `control` | `action` | `frost` | `slowed` | `self` | `self-target` | `enhancement` | `enchant`, `singular` | `medium` |
| **Ice Shards** | 1 | `offense` | `action` | `frost` | — | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Lightning Arc** | 1 | `offense` | `action` | `lightning` | — | `medium` | `multi-target`, `enemy` | `damage` | — | `instant` |
| **Lightning Weapon** | 1 | `support`, `control` | `action` | `lightning` | `staggered` | `self` | `self-target` | `enhancement` | `enchant`, `singular` | `medium` |
| **Scorching Ray** | 1 | `offense` | `action` | `fire` | — | `medium` | `multi-target`, `enemy` | `damage` | — | `instant` |
| **Fireball** | 2 | `offense` | `action` | `fire` | `burning` | `long` | `area`, `enemy` | `damage` | — | `instant` |
| **Frost Wave** | 2 | `offense`, `control` | `action` | `frost` | `slowed` | `short` | `area`, `enemy` | `damage` | `blast` | `instant` |
| **Ice Lance** | 2 | `offense` | `action` | `frost` | — | `medium` | `single-target`, `enemy` | `damage`, `creation` | — | `short` |
| **Lightning Strike** | 2 | `offense`, `control` | `action` | `lightning` | `staggered` | `medium` | `area`, `enemy` | `damage` | `blast` | `instant` |
| **Prismatic Missile** | 2 | `offense` | `action` | `fire`, `frost`, `lightning`, `acid` | — | `long` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Black Flame Bolt** | 3 | `offense`, `control` | `action` | `fire` | `burning` | `long` | `single-target`, `enemy` | `damage` | — | `short` |

#### Illusion

| Spell | Rank | Role | Action Economy | Damage Type | Condition | Range | Target | Effect Type | Spell Property | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Horrific Vision** | 0 | `offense`, `control` | `action` | `psychic` | `frightened` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Maddening Whispers** | 0 | `control` | `action` | `psychic` | — | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Minor Illusion** | 0 | `utility` | `action` | — | — | `medium` | `area` | `creation` | `concentrate`, `illusory` | `short` |
| **Color Spray** | 1 | `control` | `action` | — | `blinded`, `dazed`, `stunned` | `close` | `area`, `enemy` | `debuff` | `blast` | `briefly` |
| **Disguise Form** | 1 | `utility` | `action` | — | — | `self` | `self-target` | `transformation` | `concentrate`, `illusory` | `medium` |
| **False Enemy** | 1 | `offense`, `control` | `action` | `psychic` | — | `medium` | `single-target`, `enemy` | `damage`, `debuff` | `concentrate`, `illusory` | `briefly` |
| **Illusory Trap** | 1 | `control` | `action` | `psychic` | `grappled`, `restrained` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | `illusory` | `short` |
| **Mirror Image** | 1 | `defense` | `quick-action` | — | — | `self` | `self-target` | `protection` | `concentrate`, `illusory`, `quick` | `short` |
| **Hallucinated Swarm** | 2 | `offense`, `control` | `action` | `psychic` | `confused` | `short` | `area`, `enemy` | `damage`, `debuff` | `blast` | `instant` |
| **Illusionary Terrain** | 2 | `utility` | `action` | — | — | `medium` | `area` | `creation` | `concentrate`, `illusory` | `medium` |
| **Invisibility** | 2 | `utility`, `defense` | `quick-action` | — | `hidden` | `self` | `self-target` | `transformation` | `concentrate`, `illusory`, `quick` | `short` |
| **Major Illusion** | 2 | `utility` | `action` | — | — | `medium` | `area` | `creation` | `concentrate`, `illusory` | `short` |
| **Misdirection** | 2 | `defense`, `support` | `quick-action` | — | — | `medium` | `ally` | `protection` | `quick` | `instant` |
| **Trap Room** | 2 | `control` | `action` | `psychic` | `grappled`, `restrained` | `medium` | `area`, `enemy` | `damage`, `debuff` | `illusory` | `short` |
| **Waking Dream** | 2 | `control` | `action` | — | `unconscious` | `medium` | `single-target`, `enemy` | `debuff` | `concentrate`, `illusory` | `short` |
| **Mislead** | 3 | `utility`, `defense` | `action` | — | `hidden` | `self` | `self-target` | `transformation`, `creation` | `concentrate`, `illusory` | `short` |
| **Phantasmal Killer** | 3 | `offense`, `control` | `action` | `psychic` | `frightened` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | `concentrate`, `illusory` | `short` |
| **Seeming** | 3 | `utility` | `action` | — | — | — | `multi-target` | `transformation` | — | — |

#### Conjuration

| Spell | Rank | Role | Action Economy | Damage Type | Condition | Range | Target | Effect Type | Spell Property | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Arcane Bolt** | 0 | `offense` | `action` | `blast` | `dazed` | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Arcane Glyph** | 0 | `utility`, `offense` | `ritual` | `blast` | — | `touch` | `area` | `creation` | `ritual`, `singular` | `long` |
| **Extraplanar Pocket** | 0 | `utility` | `quick-action` | — | — | `touch` | `self-target` | `creation` | `quick` | `permanent` |
| **Alarm** | 1 | `utility` | `ritual` | — | — | `short` | `area` | `information` | `ritual`, `singular` | `long` |
| **Arcane Barrier** | 1 | `defense` | `action` | — | — | `short` | `area` | `creation`, `protection` | `singular` | `short` |
| **Arcane Missiles** | 1 | `offense` | `action` | `blast` | — | `medium` | `multi-target`, `enemy` | `damage` | — | `instant` |
| **Conjure Familiar** | 1 | `utility`, `support` | `ritual` | — | — | `touch` | `self-target` | `summoning` | `ritual`, `singular` | `permanent` |
| **Hail of Blades** | 1 | `offense` | `action` | `physical` | — | `medium` | `multi-target`, `enemy` | `damage` | — | `instant` |
| **Infuse Item** | 1 | `support` | `action` | — | — | `touch` | `ally` | `enhancement` | `enchant`, `singular` | `long` |
| **Arcane Barrage** | 2 | `offense` | `action` | `blast` | — | `medium` | `multi-target`, `enemy` | `damage` | — | `instant` |
| **Arcane Circle** | 2 | `support` | `quick-action` | — | — | `melee` | `area` | `enhancement` | `quick`, `singular` | `medium` |
| **Arcane Eye** | 2 | `utility` | `action` | — | — | `short` | `area` | `information` | `concentrate` | `medium` |
| **Eldritch Tendrils** | 2 | `control`, `offense` | `action` | `acid` | `grappled`, `restrained` | `medium` | `area`, `enemy` | `damage`, `debuff` | `concentrate` | `short` |
| **Phase Step** | 2 | `utility` | `quick-action` | — | — | `medium` | `self-target` | `movement` | `quick` | `instant` |
| **Summon Aberration** | 2 | `support`, `control` | `action` | — | — | `long` | `area` | `summoning` | `concentrate` | `short` |
| **Arcane Blast** | 3 | `offense` | `action` | `blast` | `pushed` | `long` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Astral Gate** | 3 | `control` | `action` | `blast` | `prone`, `restrained` | `long` | `area`, `enemy` | `debuff` | `concentrate` | `short` |
| **Burst of Tendrils** | 3 | `offense`, `control` | `action` | `physical` | `bleeding` | `medium` | `area`, `enemy` | `damage` | `blast` | `instant` |
| **Dimension Door** | 3 | `utility` | `action` | — | — | `long` | `self-target` | `movement` | — | `instant` |
| **Wall of Force** | 3 | `control`, `defense` | `action` | — | `pushed` | `long` | `area` | `creation`, `protection` | `concentrate` | `medium` |
| **Arcane Empowerment** | 4 | `offense`, `defense` | `action` | — | `paralyzed` | `self` | `self-target` | `enhancement`, `resistance` | `concentrate`, `enchant` | `short` |
| **Astral Body** | 4 | `utility` | `action` | — | — | `self` | `self-target` | `transformation` | `concentrate` | `medium` |
| **Force Cage** | 4 | `control` | `action` | — | `restrained` | `long` | `single-target`, `enemy` | `debuff` | `concentrate` | `medium` |
| **Teleportation Circle** | 4 | `utility` | `action` | — | — | — | `area` | `creation`, `movement` | — | `permanent` |

#### Telepathy

| Spell | Rank | Role | Action Economy | Damage Type | Condition | Range | Target | Effect Type | Spell Property | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Detect Magic** | 0 | `utility` | `action` | — | — | `short` | `area` | `information` | — | `briefly` |
| **Mental Link** | 0 | `utility`, `control` | `quick-action` | — | — | `medium` | `single-target` | `information` | `quick` | `instant` |
| **Mind Blast** | 0 | `offense`, `control` | `action` | `psychic` | `dazed` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Attack Thoughts** | 1 | `offense`, `control` | `action` | `psychic` | `confused` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Control Beast** | 1 | `control` | `action` | — | `stunned` | `close` | `single-target`, `enemy` | `debuff` | `concentrate` | `briefly` |
| **Foresight** | 1 | `defense`, `offense` | `quick-action` | — | — | `self` | `self-target` | `buff` | `quick` | `briefly` |
| **Psychometry** | 1 | `utility` | `ritual` | — | — | `touch` | `area` | `information` | `ritual` | `instant` |
| **Subtle Suggestion** | 1 | `control` | `action` | — | — | `medium` | `single-target`, `enemy` | `debuff` | — | `briefly` |
| **True Strike** | 1 | `offense`, `support` | `quick-action` | — | — | `short` | `enemy` | `buff` | `quick` | `briefly` |
| **Counterspell** | 2 | `control`, `defense` | `quick-action` | `psychic` | — | `short` | `single-target`, `enemy` | `debuff` | `quick` | `instant` |
| **Forced Suggestion** | 2 | `control` | `action` | — | `charmed` | `short` | `single-target`, `enemy` | `debuff` | — | `short` |
| **Psychic Wave** | 2 | `offense`, `control` | `action` | `psychic` | `dazed` | `short` | `area`, `enemy` | `damage`, `debuff` | `blast` | `instant` |
| **Wave of Madness** | 2 | `control` | `action` | `psychic` | `confused` | `short` | `area`, `enemy` | `debuff` | `blast`, `illusory` | — |
| **Invade Dreams** | 3 | `control`, `utility` | `ritual` | `psychic` | — | `touch` | `single-target`, `enemy` | `debuff`, `information` | `ritual` | — |
| **Astral Body** | 4 | `utility` | `ritual` | — | — | `self` | `self-target` | `transformation` | `ritual` | `medium` |

#### Telekinetics

| Spell | Rank | Role | Action Economy | Damage Type | Condition | Range | Target | Effect Type | Spell Property | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Kinetic Pull** | 0 | `control` | `action` | — | `prone` | `short` | `single-target`, `enemy` | `movement`, `debuff` | — | `instant` |
| **Kinetic Push** | 0 | `offense`, `control` | `action` | `blast` | `pushed` | `short` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Weak Telekinesis** | 0 | `utility` | `action` | `physical` | — | `short` | `area` | `movement` | — | `instant` |
| **Gravity Orb** | 1 | `control` | `action` | — | `slowed`, `grappled`, `restrained` | `medium` | `area`, `enemy` | `debuff` | `concentrate` | `short` |
| **Reflective Barrier** | 1 | `defense` | `action` | — | — | `self` | `self-target` | `protection` | `concentrate` | `short` |
| **Shockwave** | 1 | `offense`, `control` | `action` | `blast` | `pushed`, `prone` | `close` | `area`, `enemy` | `damage` | — | `instant` |
| **Telekinetic Crush** | 1 | `offense` | `action` | `physical` | — | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Telekinetic Volley** | 1 | `offense`, `utility` | `action` | `physical` | — | `short` | `multi-target`, `enemy` | `damage`, `movement` | — | `instant` |
| **Levitation** | 2 | `utility` | `action` | — | — | `medium` | `self-target` | `movement` | `concentrate` | `medium` |
| **Orbiting Shards** | 2 | `defense`, `offense` | `action` | `physical` | — | `self` | `self-target` | `protection`, `damage` | `concentrate` | `short` |
| **Stasis** | 2 | `control` | `action` | — | `stunned` | `medium` | `single-target`, `enemy` | `debuff` | `concentrate` | `short` |
| **Strong Telekinesis** | 2 | `utility`, `offense` | `action` | `physical` | — | `medium` | `area` | `movement` | — | `instant` |
| **Distortion Field** | 3 | `control`, `defense` | `action` | `physical` | — | `medium` | `area` | `protection`, `debuff` | `concentrate` | `short` |
| **Invert Gravity** | 4 | `control` | `action` | — | `prone` | `medium` | `area`, `enemy` | `debuff`, `movement` | `concentrate` | `short` |

#### Necromancy

| Spell | Rank | Role | Action Economy | Damage Type | Condition | Range | Target | Effect Type | Spell Property | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Drain Life** | 0 | `offense`, `healing` | `action` | `necrotic` | — | `medium` | `single-target`, `enemy` | `damage`, `healing` | — | `instant` |
| **Enfeebling Grasp** | 0 | `offense`, `control` | `action` | `necrotic` | — | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Life Echo** | 0 | `utility` | `action` | — | — | `touch` | `area` | `information` | — | `instant` |
| **Necromantic Sight** | 0 | `utility` | `quick-action` | — | — | `self` | `self-target` | `information` | `quick` | `briefly` |
| **Soul Drain** | 0 | `offense`, `control` | `action` | `necrotic` | — | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Animate Corpse** | 1 | `control`, `support` | `ritual` | — | — | `touch` | `area` | `summoning` | `concentrate`, `ritual` | `long` |
| **Bone Armor** | 1 | `defense` | `action` | — | — | `self` | `self-target` | `protection` | `singular` | `long` |
| **Control Undead** | 1 | `control` | `action` | — | `stunned` | `short` | `single-target`, `enemy` | `debuff` | `concentrate` | `briefly` |
| **Death Bolt** | 1 | `offense` | `action` | `necrotic` | — | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Death Ward** | 1 | `defense` | `quick-action` | — | — | `short` | `ally` | `protection` | `quick` | `instant` |
| **Grasp of Decay** | 1 | `offense`, `control` | `action` | `necrotic` | — | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `short` |
| **Necrotic Shield** | 1 | `defense`, `offense` | `action` | `necrotic` | — | `self` | `self-target` | `protection` | — | `short` |
| **Ray of Lethargy** | 1 | `offense`, `control` | `action` | `necrotic` | `slowed`, `staggered` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `short` |
| **Animate Horde** | 2 | `control`, `support` | `ritual` | — | — | `close` | `area` | `summoning` | `concentrate`, `ritual` | `long` |
| **Bone Shatter** | 2 | `offense`, `control` | `action` | `necrotic` | `staggered`, `stunned`, `paralyzed` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `briefly` |
| **Corpse Explosion** | 2 | `offense` | `action` | `necrotic` | `prone` | `medium` | `area`, `enemy` | `damage` | — | `instant` |
| **Death Mark** | 2 | `control`, `offense` | `action` | `necrotic` | `marked` | `medium` | `single-target`, `enemy` | `debuff` | `singular` | `short` |
| **Inflict Curse** | 2 | `control` | `action` | — | — | `short` | `single-target`, `enemy` | `debuff` | `singular` | `long` |
| **Shroud of Blight** | 2 | `control`, `offense` | `action` | `necrotic` | `frightened` | `medium` | `area`, `enemy` | `damage`, `debuff` | `concentrate` | `short` |
| **Soul Veil** | 2 | `utility`, `defense` | `action` | — | — | `self` | `self-target` | `buff` | `concentrate` | `short` |
| **Curse of Mortality** | 3 | `control` | `action` | — | — | `short` | `single-target`, `enemy` | `debuff` | `concentrate` | `short` |
| **Negative Energy Flood** | 3 | `offense`, `control` | `action` | `necrotic` | `stunned` | `medium` | `area`, `enemy` | `damage`, `debuff` | `blast` | `instant` |
| **Reaper's Harvest** | 3 | `control`, `utility` | `action` | — | — | `medium` | `area` | `debuff` | `concentrate` | `short` |
| **Soul Prison** | 3 | `control` | `action` | — | `stunned`, `paralyzed`, `unconscious` | `short` | `single-target`, `enemy` | `debuff` | `concentrate` | `medium` |
| **Spectral Army** | 3 | `support`, `control` | `action` | `necrotic` | — | `short` | `area` | `summoning` | `concentrate` | `short` |
| **Wither** | 3 | `offense`, `control` | `action` | `necrotic` | `stunned` | `long` | `single-target`, `enemy` | `damage`, `debuff` | — | `short` |
| **Death's Embrace** | 4 | `offense`, `defense`, `utility` | `action` | `necrotic` | `frightened`, `paralyzed` | `self` | `self-target` | `transformation`, `enhancement` | `concentrate`, `enchant` | `short` |
| **Finger of Death** | 4 | `offense` | `action` | `necrotic` | — | `long` | `single-target`, `enemy` | `damage` | — | `instant` |

---

### Mystic Traditions

#### Death

| Spell | Rank | Role | Action Economy | Damage Type | Condition | Range | Target | Effect Type | Spell Property | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Chill Touch** | 0 | `offense`, `control` | `action` | `frost` | — | `melee` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Decay** | 0 | `utility` | `action` | — | — | `short` | `area` | `debuff` | — | `instant` |
| **Enfeebling Touch** | 0 | `offense`, `control` | `action` | `necrotic` | — | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Glimpse of Mortality** | 0 | `control` | `action` | `psychic` | `frightened` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Spared from Death** | 0 | `healing`, `support` | `action` | — | — | `short` | `ally` | `healing` | — | `instant` |
| **Blood Shards** | 1 | `offense`, `healing` | `action` | `necrotic` | — | `medium` | `single-target`, `enemy` | `damage`, `healing` | — | `instant` |
| **Curse of Death** | 1 | `control` | `action` | — | — | `short` | `single-target`, `enemy` | `debuff` | `singular` | `long` |
| **Early Grave** | 1 | `offense`, `control` | `action` | `necrotic` | `grappled`, `restrained` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `briefly` |
| **Necrotic Weapon** | 1 | `support` | `action` | `necrotic` | — | `touch` | `ally` | `enhancement` | `enchant`, `singular` | `medium` |
| **Rotting Grasp** | 1 | `offense`, `control` | `action` | `necrotic` | `poisoned`, `staggered` | `melee` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Shivering Ray** | 1 | `offense`, `control` | `action` | `frost` | `slowed`, `dazed` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Circle of Death** | 2 | `control`, `offense` | `action` | `necrotic` | — | `medium` | `area`, `enemy` | `damage`, `debuff` | `concentrate` | `short` |
| **Cloud of Sickness** | 2 | `offense`, `control` | `action` | `necrotic` | `poisoned` | `medium` | `area`, `enemy` | `damage`, `debuff` | — | `short` |
| **Death's Door** | 3 | `control`, `offense` | `action` | `psychic` | `stunned`, `paralyzed` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `short` |
| **Grave's Bloom** | 3 | `offense`, `control` | `action` | `poison` | `poisoned`, `confused` | `medium` | `area`, `enemy` | `damage`, `debuff` | — | `instant` |

#### Life

| Spell | Rank | Role | Action Economy | Damage Type | Condition | Range | Target | Effect Type | Spell Property | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Life Shield** | 0 | `defense`, `support` | `action` | — | — | `medium` | `ally` | `protection` | `singular` | `short` |
| **Restore Life** | 0 | `healing`, `offense` | `action` | `radiant` | — | `short` | `ally` | `healing`, `damage` | — | `instant` |
| **Verdant Blast** | 0 | `offense`, `support` | `action` | `radiant` | — | `medium` | `single-target`, `enemy` | `damage`, `healing` | — | `instant` |
| **Blessing of Life** | 1 | `support`, `defense` | `action` | — | — | `touch` | `ally` | `buff` | `singular` | `long` |
| **Healing Touch** | 1 | `healing` | `action` | — | — | `touch` | `ally` | `healing` | — | `instant` |
| **Overflow of Life** | 1 | `healing`, `offense` | `action` | `radiant` | — | `medium` | `ally` | `healing`, `damage` | — | `instant` |
| **Rapid Vitality** | 1 | `healing` | `quick-action` | — | — | `medium` | `ally` | `healing` | `quick` | `instant` |
| **Vitalizing Weapon** | 1 | `support` | `action` | — | — | `touch` | `ally` | `enhancement`, `healing` | `enchant`, `singular` | `medium` |
| **Aid** | 2 | `support`, `defense` | `action` | — | — | `short` | `ally` | `buff` | `enchant` | `long` |
| **Cleanse** | 2 | `support`, `healing` | `quick-action` | — | — | `medium` | `ally` | `healing` | `quick`, `singular` | `instant` |
| **Detect Life** | 2 | `utility` | `action` | — | — | `self` | `self-target` | `information` | `concentrate` | `medium` |
| **Hallow Ground** | 2 | `healing`, `support` | `action` | — | — | `close` | `ally` | `healing` | `concentrate` | `short` |
| **Healing Burst** | 2 | `healing`, `support` | `action` | — | — | `short` | `ally` | `healing` | `blast` | `instant` |
| **Abundance of Life** | 3 | `healing`, `support` | `action` | — | — | `long` | `ally` | `healing` | `concentrate` | `medium` |
| **Vitality Surge** | 3 | `healing`, `offense` | `action` | `radiant` | `dazed`, `stunned` | `medium` | `area` | `healing`, `damage` | `blast` | `instant` |

#### Light

| Spell | Rank | Role | Action Economy | Damage Type | Condition | Range | Target | Effect Type | Spell Property | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Dazzling Light** | 0 | `offense`, `utility` | `action` | `radiant` | `blinded`, `dazed` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Detect Lies** | 0 | `utility`, `support` | `quick-action` | — | — | `close` | `single-target` | `information` | `quick` | `short` |
| **Illuminated Sight** | 0 | `utility` | `action` | — | — | `self` | `self-target` | `buff`, `enhancement` | `enchant` | `medium` |
| **Revealing Burst** | 0 | `utility`, `control` | `action` | — | — | `short` | `area` | `information`, `debuff` | — | `short` |
| **Blessing of Light** | 1 | `support` | `action` | — | — | `touch` | `ally` | `buff`, `enhancement` | `enchant`, `singular` | `long` |
| **Locate Trinket** | 1 | `utility` | `action` | — | — | `touch` | `area` | `information` | `singular` | `long` |
| **Protect from Influence** | 1 | `support`, `defense` | `quick-action` | — | — | `medium` | `ally` | `protection`, `resistance` | `quick`, `singular` | `short` |
| **Radiant Burst** | 1 | `offense` | `action` | `radiant` | `blinded`, `dazed` | `medium` | `area`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Radiant Weapon** | 1 | `support` | `action` | `radiant` | — | `touch` | `ally` | `enhancement` | `enchant`, `singular` | `medium` |
| **Sense Spirits** | 1 | `utility` | `action` | — | — | — | `area` | `information` | — | — |
| **Sun Sphere** | 1 | `offense`, `control` | `action` | `fire` | — | `medium` | `area`, `enemy` | `damage` | `concentrate` | `short` |
| **True Strike** | 1 | `offense`, `support` | `quick-action` | — | — | `short` | `enemy` | `buff` | `quick` | `briefly` |
| **Break Curse** | 2 | `support`, `healing` | `ritual` | — | — | `touch` | `ally` | `healing` | `ritual` | `instant` |
| **Destroy Undeath** | 2 | `offense`, `control` | `action` | `radiant` | `frightened` | `short` | `area`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Sunbeam** | 2 | `offense`, `control`, `utility` | `action` | `radiant` | — | `medium` | `area`, `enemy` | `damage`, `information` | `concentrate` | `short` |
| **Blessing of Dawn** | 3 | `support` | `action` | — | — | `short` | `ally` | `enhancement`, `buff` | `enchant`, `singular` | `short` |
| **Purifying Light** | 3 | `offense`, `control` | `action` | `radiant` | `blinded`, `stunned` | `medium` | `area`, `enemy` | `damage`, `debuff` | `blast` | `instant` |
| **Solar Flare** | 3 | `offense`, `healing`, `support` | `action` | `radiant` | — | `long` | `area` | `damage`, `healing` | — | `instant` |

#### Nature

| Spell | Rank | Role | Action Economy | Damage Type | Condition | Range | Target | Effect Type | Spell Property | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Acid Splash** | 0 | `offense` | `action` | `acid` | — | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Bestial Adaptation** | 0 | `utility`, `defense` | `quick-action` | — | — | `self` | `self-target` | `transformation`, `buff` | `concentrate`, `enchant`, `quick` | `short` |
| **Lashing Vine** | 0 | `offense`, `control` | `action` | `physical` | `grappled`, `restrained` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Poison Mist** | 0 | `offense`, `control` | `action` | `poison` | `poisoned` | `short` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Rejuvenation** | 0 | `healing` | `action` | — | — | `short` | `ally` | `healing` | `singular` | `short` |
| **Shillelagh** | 0 | `offense` | `action` | `physical` | — | `self` | `self-target` | `enhancement` | — | `instant` |
| **Beast Form** | 1 | `utility`, `offense` | `action` | `physical` | — | `self` | `self-target` | `transformation` | `enchant` | `medium` |
| **Blessing of Nature** | 1 | `support`, `utility` | `action` | — | — | `touch` | `ally` | `buff` | `singular` | `long` |
| **Mesh of Vines** | 1 | `control` | `action` | `physical` | `grappled`, `restrained` | `medium` | `area`, `enemy` | `debuff` | `singular` | `short` |
| **Purify Water** | 1 | `utility`, `healing` | `action` | — | — | `short` | `area` | `creation` | — | `short` |
| **Rock Throw** | 1 | `offense`, `control` | `action` | `physical` | `pushed`, `prone` | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Sticks to Snakes** | 1 | `support`, `control` | `action` | `physical` | — | `close` | `area` | `summoning` | `concentrate`, `material` | `medium` |
| **Venomous Weapon** | 1 | `support` | `action` | `poison` | `poisoned` | `touch` | `ally` | `enhancement` | `enchant`, `singular` | `medium` |
| **Wild Companion** | 1 | `support` | `ritual` | — | — | `touch` | `self-target` | `summoning` | `ritual` | `permanent` |
| **Heat Metal** | 2 | `control`, `offense` | `action` | `fire` | — | `short` | `single-target`, `enemy` | `debuff`, `damage` | `concentrate` | `short` |
| **Law of the Strongest** | 2 | `support` | `action` | — | — | `medium` | `ally` | `enhancement`, `transformation` | `enchant`, `singular` | `short` |
| **Living Plants** | 2 | `control`, `utility` | `action` | `physical` | `grappled`, `restrained` | `medium` | `area`, `enemy` | `debuff`, `creation` | `concentrate` | `medium` |
| **Melt Ground** | 2 | `control` | `action` | — | — | `medium` | `area` | `debuff` | `concentrate` | `medium` |
| **Nature's Passage** | 2 | `utility` | `action` | — | — | `self` | `self-target` | `movement`, `buff` | `concentrate` | `long` |
| **Rock Skin** | 2 | `defense` | `action` | — | — | `medium` | `ally` | `protection` | `enchant`, `singular` | `short` |
| **Speak with Animals and Plants** | 2 | `utility` | `action` | — | — | `close` | `area` | `information` | — | `medium` |
| **Sudden Growth** | 2 | `utility`, `control` | `action` | — | — | `medium` | `area` | `creation` | — | `short` |
| **Thorn Barrage** | 2 | `offense`, `control` | `action` | `physical` | `bleeding` | `medium` | `area`, `enemy` | `damage`, `debuff` | `blast` | `instant` |
| **Toxic Mist** | 2 | `offense`, `control` | `action` | `poison` | `poisoned` | `short` | `area`, `enemy` | `damage`, `debuff` | `blast` | `short` |
| **Water Prison** | 2 | `control` | `action` | — | `grappled`, `restrained` | `short` | `single-target`, `enemy` | `debuff` | `concentrate` | `short` |
| **Animal Messenger** | 3 | `utility` | `action` | — | — | `touch` | `area` | `information` | `singular` | `long` |
| **Fungal Growth** | 3 | `control` | `action` | — | `confused` | `medium` | `area`, `enemy` | `debuff` | `singular` | `medium` |
| **Impalement** | 3 | `offense`, `control` | `action` | `physical` | `pushed` | `long` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Insect Swarm** | 3 | `control`, `offense` | `action` | `physical` | — | `long` | `area`, `enemy` | `damage`, `debuff` | `concentrate` | `short` |
| **Life from Stone** | 3 | `support`, `control` | `action` | `physical` | `prone` | `long` | `area` | `summoning` | `concentrate` | `short` |
| **Nature's Judgment** | 3 | `control` | `action` | — | `marked` | `medium` | `single-target`, `enemy` | `debuff` | `concentrate` | `medium` |
| **Petrification** | 3 | `control` | `action` | — | `stunned`, `paralyzed`, `unconscious` | `short` | `single-target`, `enemy` | `debuff` | `concentrate` | `medium` |
| **Stone Pillar** | 3 | `control`, `utility` | `action` | `physical` | — | `short` | `area` | `creation` | `singular` | `short` |
| **Control Weather** | 4 | `utility`, `control` | `action` | — | — | `extreme` | `area` | `debuff` | `concentrate` | `medium` |
| **Tree Stride** | 4 | `utility` | `action` | — | — | `extreme` | `self-target` | `movement` | — | `instant` |

#### Peace

| Spell | Rank | Role | Action Economy | Damage Type | Condition | Range | Target | Effect Type | Spell Property | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Aura of Sanctuary** | 0 | `defense`, `support` | `quick-action` | — | — | `medium` | `ally` | `protection` | `quick`, `singular` | `short` |
| **Calming Influence** | 0 | `control` | `action` | — | `charmed` | `short` | `single-target`, `enemy` | `debuff` | — | `short` |
| **Tranquil Mind** | 0 | `healing`, `control` | `action` | `psychic` | `dazed` | `short` | `ally` | `healing`, `damage` | — | `instant` |
| **Blessing of Peace** | 1 | `support` | `action` | — | — | `touch` | `ally` | `buff` | `singular` | `long` |
| **Harmonic Link** | 1 | `support`, `defense` | `action` | — | — | `medium` | `ally` | `protection` | `concentrate` | `medium` |
| **Pacifying Weapon** | 1 | `support`, `defense` | `action` | — | `dazed` | `touch` | `ally` | `enhancement` | `enchant`, `singular` | `medium` |
| **Share Harm** | 1 | `defense` | `quick-action` | — | — | `medium` | `enemy` | `damage` | `quick` | `instant` |
| **Dome of Sanctuary** | 2 | `defense`, `control` | `action` | `psychic` | `prone` | `medium` | `area` | `protection`, `damage` | `concentrate` | `short` |
| **Slow** | 2 | `control` | `action` | — | `stunned` | `long` | `area`, `enemy` | `debuff` | `concentrate` | `short` |
| **Spell-breaking Wave** | 2 | `control`, `support` | `action` | — | — | `medium` | `enemy` | `debuff` | — | `instant` |
| **Anti-Magic Field** | 3 | `control` | `action` | — | — | `medium` | `area` | `immunity` | `concentrate` | `short` |
| **Martyrdom's Blessing** | 3 | `support`, `defense` | `action` | — | — | `short` | `ally` | `protection`, `buff` | `singular` | `short` |
| **Pacifying Presence** | 3 | `control` | `action` | `psychic` | — | `long` | `multi-target`, `enemy` | `debuff` | `concentrate` | `short` |

#### Tempest

| Spell | Rank | Role | Action Economy | Damage Type | Condition | Range | Target | Effect Type | Spell Property | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Gust** | 0 | `offense`, `control`, `utility` | `action` | `blast` | `pushed` | `short` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Static Shock** | 0 | `offense` | `action` | `lightning` | — | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Wind Slash** | 0 | `offense` | `action` | `blast` | — | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Bursting Crackle** | 1 | `offense`, `control` | `action` | `blast` | `dazed`, `deafened` | `medium` | `area`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Curse of Tempest** | 1 | `control` | `action` | — | — | `short` | `single-target`, `enemy` | `debuff` | `singular` | `long` |
| **Earthen Tremor** | 1 | `offense`, `control` | `action` | `physical` | `staggered` | `short` | `area`, `enemy` | `damage`, `debuff` | `blast` | `instant` |
| **Electrified Weapon** | 1 | `support` | `action` | `lightning` | `staggered` | `touch` | `ally` | `enhancement` | `enchant`, `singular` | `medium` |
| **Lightning Javelin** | 1 | `offense`, `control` | `action` | `lightning` | `staggered` | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Storm Coat** | 1 | `defense`, `support` | `action` | `lightning` | — | `short` | `ally` | `resistance`, `enhancement` | `enchant`, `singular` | `long` |
| **Storm Shield** | 1 | `defense`, `control` | `quick-action` | `blast` | — | `self` | `self-target` | `protection` | `quick` | `briefly` |
| **Volcanic Bolt** | 1 | `offense`, `control` | `action` | `fire` | `burning` | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Wind Hose** | 1 | `offense`, `control` | `action` | `blast` | `grappled`, `restrained` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Conjure Elemental** | 2 | `support`, `control` | `action` | — | — | `long` | `area` | `summoning` | `concentrate` | `short` |
| **Lightning Bolt** | 2 | `offense`, `control` | `action` | `lightning` | `staggered` | `medium` | `area`, `enemy` | `damage` | `blast` | `instant` |
| **Lightning Step** | 2 | `utility`, `offense` | `quick-action` | `blast` | — | `medium` | `self-target` | `movement`, `damage` | `quick` | `instant` |
| **Magma Burst** | 2 | `offense`, `control` | `action` | `fire` | `burning` | `medium` | `area`, `enemy` | `damage` | — | `instant` |
| **Pyroclasm** | 2 | `offense`, `control` | `action` | `fire` | `prone` | `short` | `area`, `enemy` | `damage` | `blast` | `instant` |
| **Storm Cloud** | 2 | `offense` | `action` | `lightning` | — | `medium` | `multi-target`, `enemy` | `damage` | `concentrate` | `short` |
| **Thunder Clap** | 2 | `offense`, `control` | `action` | `blast` | `prone`, `deafened` | `short` | `area`, `enemy` | `damage` | — | `instant` |
| **Torrent** | 2 | `offense`, `control` | `action` | `physical` | `pushed`, `prone` | `medium` | `area`, `enemy` | `damage` | `blast` | `instant` |
| **Wind Ward** | 2 | `defense`, `control` | `action` | — | `deafened` | `self` | `self-target` | `protection` | `concentrate`, `enchant` | `medium` |
| **Chain Lightning** | 3 | `offense` | `action` | `lightning` | `staggered` | `medium` | `multi-target`, `enemy` | `damage` | — | `instant` |
| **Cone of Cold** | 3 | `offense`, `control` | `action` | `frost` | `slowed` | `medium` | `area`, `enemy` | `damage` | `blast` | `instant` |
| **Cyclone** | 3 | `offense`, `control` | `action` | `blast` | `prone`, `pushed` | `long` | `area`, `enemy` | `damage`, `debuff` | `concentrate` | `short` |
| **Lightning Volley** | 3 | `offense` | `action` | `lightning` | — | `long` | `multi-target`, `enemy` | `damage` | — | `instant` |
| **Sandstorm** | 3 | `control`, `offense` | `action` | `physical` | `blinded` | — | `area`, `enemy` | `damage`, `debuff` | — | — |
| **Shattering Orb** | 3 | `offense`, `control` | `action` | `blast` | `prone`, `deafened` | `long` | `area`, `enemy` | `damage` | — | `instant` |
| **Wind Wall** | 3 | `control`, `defense` | `action` | `blast` | `pushed` | `long` | `area` | `protection`, `debuff` | `concentrate` | `short` |
| **Avatar of Storms** | 4 | `offense`, `defense` | `action` | `lightning` | — | `self` | `self-target` | `transformation`, `enhancement` | `concentrate`, `enchant` | `short` |
| **Control Water** | 4 | `control`, `offense` | `action` | `physical` | `staggered` | `extreme` | `area` | `debuff` | `concentrate` | `medium` |
| **Control Winds** | 4 | `utility`, `control` | `action` | — | — | `extreme` | `area` | `debuff` | `concentrate` | `medium` |
| **Earthquake** | 4 | `control`, `offense` | `action` | `physical` | `prone` | — | `area`, `enemy` | `debuff` | — | — |
| **Lightning Storm** | 4 | `offense` | `action` | `lightning` | — | — | `area`, `enemy` | `damage` | — | — |

#### Twilight

| Spell | Rank | Role | Action Economy | Damage Type | Condition | Range | Target | Effect Type | Spell Property | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Dark Sight** | 0 | `utility` | `action` | — | — | `self` | `self-target` | `buff`, `enhancement` | `enchant` | `medium` |
| **Night's Grasp** | 0 | `offense`, `control` | `action` | `frost` | `slowed`, `grappled` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Obscuring Veil** | 0 | `utility` | `action` | — | — | `self` | `self-target` | `transformation`, `buff` | `enchant` | `medium` |
| **Shadow Veil** | 0 | `utility`, `control` | `action` | — | `blinded` | `medium` | `area` | `creation` | — | `short` |
| **Whispers of Doubt** | 0 | `control`, `offense` | `action` | `psychic` | `confused` | `medium` | `single-target`, `enemy` | `damage`, `debuff` | — | `instant` |
| **Cloak of Night** | 1 | `defense`, `utility` | `action` | — | — | `medium` | `ally` | `protection`, `buff` | `singular` | `medium` |
| **Curse of Twilight** | 1 | `control` | `action` | — | — | `short` | `single-target`, `enemy` | `debuff` | `singular` | `long` |
| **Haunting Shadows** | 1 | `control`, `offense` | `action` | `psychic` | — | `medium` | `single-target`, `enemy` | `damage`, `debuff` | `concentrate` | `short` |
| **Lunar Weapon** | 1 | `support` | `action` | `frost` | `slowed` | `touch` | `ally` | `enhancement` | `enchant`, `singular` | `medium` |
| **Moon Sphere** | 1 | `offense`, `control` | `action` | `frost` | — | `medium` | `area`, `enemy` | `damage` | `concentrate` | `short` |
| **Shadow Meld** | 1 | `utility`, `defense` | `action` | — | `hidden` | `self` | `self-target` | `transformation` | `concentrate` | `short` |
| **Whisper of Dreams** | 1 | `control` | `action` | — | `unconscious` | `short` | `single-target`, `enemy` | `debuff` | — | `medium` |
| **Aura of Fear** | 2 | `control`, `offense` | `action` | `psychic` | `frightened` | `self` | `area`, `enemy` | `debuff`, `damage` | `concentrate` | `short` |
| **Everlasting Night** | 2 | `utility`, `control` | `action` | — | `blinded` | `medium` | `area` | `creation` | `concentrate` | `medium` |
| **Moonbeam** | 2 | `offense`, `control` | `action` | `frost` | `blinded` | `medium` | `area`, `enemy` | `damage`, `debuff` | `concentrate` | `short` |
| **Shadow Step** | 2 | `utility` | `action` | — | — | `medium` | `self-target` | `movement` | — | `instant` |
| **Silent Night** | 2 | `utility`, `control` | `action` | — | `deafened` | `medium` | `area` | `creation`, `debuff` | — | `short` |
| **Terrors of the Dark** | 2 | `control`, `offense` | `action` | `psychic` | `frightened`, `stunned` | `medium` | `area`, `enemy` | `damage`, `debuff` | — | `short` |
| **Twilight Bind** | 2 | `control` | `action` | — | `charmed` | `medium` | `single-target`, `enemy` | `debuff` | `concentrate` | `short` |
| **Nightmare Realm** | 3 | `control`, `offense` | `action` | `psychic` | `stunned`, `staggered` | `medium` | `area`, `enemy` | `damage`, `debuff` | `concentrate` | `short` |
| **Shadow Clone** | 3 | `utility`, `defense` | `action` | — | — | `medium` | `self-target` | `creation`, `movement` | `concentrate` | `medium` |
| **Embrace of Night** | 4 | `utility`, `defense` | `action` | — | — | `medium` | `self-target` | `transformation`, `enhancement` | `concentrate`, `enchant` | `short` |

#### War

| Spell | Rank | Role | Action Economy | Damage Type | Condition | Range | Target | Effect Type | Spell Property | Duration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Battle Surge** | 0 | `support` | `quick-action` | — | — | `medium` | `ally` | `buff` | `quick`, `singular` | `briefly` |
| **Mighty Strike** | 0 | `offense` | `action` | `physical` | — | `self` | `self-target` | `enhancement` | — | `instant` |
| **Spectral Slash** | 0 | `offense`, `control` | `action` | `physical` | `bleeding` | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **Curse of War** | 1 | `control` | `action` | — | `frightened` | `short` | `single-target`, `enemy` | `debuff` | `singular` | `long` |
| **Heroic Weapon** | 1 | `support` | `action` | `physical` | `frightened` | `touch` | `ally` | `enhancement` | `enchant`, `singular` | `medium` |
| **Tear Wound** | 1 | `offense`, `control` | `action` | `physical` | `bleeding` | `medium` | `single-target`, `enemy` | `damage` | — | `instant` |
| **War Cry** | 1 | `control`, `support` | `quick-action` | — | `frightened` | `short` | `area`, `enemy` | `debuff` | `quick` | `briefly` |
| **Weapon Spirit** | 1 | `offense`, `support` | `action` | `physical` | — | `medium` | `enemy` | `summoning`, `damage` | `concentrate` | `short` |
| **Ancestral Warriors** | 2 | `offense`, `control` | `action` | `physical` | — | `self` | `area`, `enemy` | `damage`, `summoning` | `concentrate` | `short` |
| **Blood Sacrifice** | 2 | `offense`, `support` | `quick-action` | — | — | `self` | `self-target` | `buff` | `quick` | `briefly` |
| **Haste** | 2 | `support`, `offense` | `action` | — | `paralyzed` | `short` | `ally` | `enhancement`, `buff` | `concentrate`, `enchant` | `short` |

---

## Appendix F: Spell Audit Summary Statistics

### Spells by Role

Primary role is the first tag listed for each spell.

| Role | Count | % |
| --- | --- | --- |
| `offense` | 96 | 34% |
| `control` | 75 | 27% |
| `utility` | 52 | 19% |
| `support` | 20 | 7% |
| `healing` | 18 | 6% |
| `defense` | 18 | 6% |

**Total: 279 spells**

### Spells by Damage Type

Counts spells that deal a given damage type (a spell may appear in multiple rows if it deals multiple types).

| Damage Type | Count |
| --- | --- |
| `physical` | 42 |
| `necrotic` | 40 |
| `psychic` | 37 |
| `radiant` | 16 |
| `fire` | 30 |
| `lightning` | 31 |
| `frost` | 25 |
| `blast` | 36 |
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

### Spells by Range

| Range | Count | % |
| --- | --- | --- |
| `medium` | 130 | 47% |
| `short` | 46 | 16% |
| `self` | 38 | 14% |
| `long` | 26 | 9% |
| `touch` | 16 | 6% |
| `close` | 9 | 3% |
| `extreme` | 5 | 2% |
| `melee` | 4 | 1% |
| — (unknown/stub) | 5 | 2% |

### Key Observations

1. **Offense and control dominate spell design.** Over 60% of spells are primarily offensive or controlling. This reflects the transgressive nature of arcane magic and the martial/death aspects of several mystic traditions. Healing spells are rare outside the Life tradition.

2. **Medium range is overwhelmingly dominant.** Nearly half of all spells target at medium range. Self-targeting spells (14%) are the second-largest group, concentrated in buff and transformation spells. Very few spells operate at melee or touch range, making those traditions (Death, War, melee conjuration) feel distinctly close-quarters.

3. **Stunned is the most common condition.** It appears in 23 spells across disciplines including telekinetics, necromancy, tempest, and twilight. This reflects the system's emphasis on lockdown as a primary control vector. Slowed, frightened, prone, dazed, and poisoned each appear in 15–16 spells, forming the core condition vocabulary.

4. **Physical and necrotic are the most common damage types among spells.** Physical dominates nature and war traditions (which use weapons or conjured forces), while necrotic defines necromancy and the Death tradition. Fire, lightning, and blast form a second tier, driven by evocation and tempest.

5. **Concentrate is the most important spell property.** Concentration spells pervade every tradition and discipline at rank 2+, making concentration management a central tactical consideration. Enchant spells (weapon and body) are the second-most common, providing a persistent enhancement economy across all traditions.

6. **Several spells are stubs or placeholders.** Prismatic Missile, Orbiting Shards, Wave of Madness, Invade Dreams, Seeming, Astral Body (conjuration), Force Cage, Teleportation Circle, Detect Life, Distortion Field, Invert Gravity, Sandstorm, Stone Pillar, Control Weather, Earthquake, Lightning Storm, Control Winds, and Silent Night have minimal or placeholder text. Their tags are provisional and based on inferred intent.

7. **The Life tradition is unique in its healing focus.** It is the only tradition where healing is the primary role for the majority of spells. All other traditions treat healing as an incidental or absent role, consistent with the design philosophy that healing magic is concentrated in one path.

8. **Ritual spells are rare but span multiple categories.** Ritual casting appears in conjuration (Arcane Glyph, Alarm, Conjure Familiar), necromancy (Animate Corpse, Animate Horde), telepathy (Psychometry, Invade Dreams, Astral Body), light (Break Curse), and nature (Wild Companion). Rituals are used exclusively for summoning, information, or permanent effects — never for direct damage.
