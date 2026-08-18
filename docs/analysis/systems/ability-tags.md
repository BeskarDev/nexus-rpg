# Ability Tags: Standardized Tagging System

This document defines a structured set of ability tags for use across all folk abilities, talents, combat arts, and spells in Nexus RPG. Tags are organized into groups by category, each serving a distinct purpose for filtering and at-a-glance reference.

> **Status:** Design complete (taxonomy + guidelines). Implementation open — see the technical spec at `spec/ability-tags-implementation.md`. The full per-ability tag audit lives in [ability-tags-audit.md](ability-tags-audit.md).

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

## Summary of Tag Groups

| # | Group | Purpose | Count | Required? |
| --- | --- | --- | --- | --- |
| 1 | Effect | What the ability mechanically does | 13 | Yes (at least one) |
| 2 | Action Economy | When/how it is used | 7 | Recommended |
| 3 | Damage Type | Type of damage dealt | 10 | If deals damage |
| 4 | Condition | Conditions inflicted/removed | 21 | If references conditions |
| 5 | Weapon Category | Weapon types involved | 9 | Combat arts / weapon talents |

**Total unique tags: 60** across 5 groups.
