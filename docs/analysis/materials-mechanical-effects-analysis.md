# Special Materials — Mechanical Effects Analysis

> **Scope:** Propose concrete mechanical effects for all special materials across all tiers — Exotic (Q3–Q4), Greater (Q5–Q6), and Legendary (Q7–Q8). Includes all vault-only materials not yet in the game rules. This is a complete revision incorporating fundamental design feedback.
>
> **Prerequisite:** [Enchantments & Magic Items — Design Analysis](./enchantments-magic-items-analysis.md). This document picks up the deferred material-properties task from that analysis.
>
> **Source material:** Worldbuilding lore from the [Nexus RPG Vault](https://nexus-rpg-vault.web.app/(12)-%F0%9F%97%9D%EF%B8%8F-Artefakte/Materialien/) is incorporated for thematic flavor throughout. Vault game-mechanic speculation is **not** used — only flavor, cultural context, and physical descriptions inform these proposals.

---

## 1. Design Principles

### 1.1 Materials vs. Enchantments

| Dimension | Materials | Enchantments |
|-----------|-----------|--------------|
| **Activation** | Passive or reactive (triggered by events, not player actions) | Active (Quick Action / Action) or passive |
| **Resource model** | Once per scene or once per day at most | X/day scaling with quality, or always-on |
| **Identity** | Define what the item *is made of* — intrinsic properties | Define what the item *can do* — added capabilities |
| **Stacking** | Material + enchantment always coexist on the same item | One enchantment per item (core rule) |
| **Effect scope** | Narrower: damage type, resistance, durability, weight | Broader: bonus damage, conditions, active powers |
| **Overlap rule** | Must not duplicate an enchantment's core identity | Must not duplicate a material's core identity |

### 1.2 Scaling Philosophy

| Tier | Power Budget | Resource Limits | Example Exotic Baseline |
|------|-------------|-----------------|-------------------------|
| **Exotic (Q3–Q4)** | One modest passive OR one reactive 1/scene | 1/scene or 1/day | Monster Scales: 1/scene physical resistance |
| **Greater (Q5–Q6)** | One strong passive + one secondary OR one reactive with broader scope | 1/scene (broad) or 1/day (powerful) | — |
| **Legendary (Q7–Q8)** | Two strong passives OR one passive + one powerful reactive + unique ability | 1/scene + extra, or 1/day (potent) | — |

**Key principle:** Higher tiers must clearly escalate over lower tiers for thematically linked materials. Two materials at different tiers must never provide the same core effect — the higher tier must add scope, reliability, or a secondary benefit.

### 1.3 Item-Type Differentiation

Every material must specify effects per item type where applicable:

- **Weapon** (includes Ammo where noted)
- **Light Armor**
- **Heavy Armor**
- **Shield**
- **Spell Catalyst**
- **Wearable**
- **Any** (applies to all types)

If a material doesn't suit a particular item type, that type is omitted. Not every material needs effects for every item type.

### 1.4 Protective Design Philosophy

Material effects should **empower the wearer/wielder** rather than debuff enemies. Specifically:

- **Preferred:** "You gain resistance to Y damage", "You can ignore condition X", "You reduce incoming damage by Z"
- **Avoided:** "Enemies suffer banes", "Enemy spell casting is penalized", "The target loses concentration"

This keeps effects intuitive (the item protects *you*), works consistently regardless of whether the threat targets you specifically or an area, and avoids edge cases with multi-target or area-of-effect abilities.

### 1.5 No Baseline Stacking

Material effects must **never** add to the core magic item scaling bonuses:

- **No +weapon damage** (weapons already gain +1/+2/+3/+4/+5 per quality tier)
- **No +AV** (armor already gains +1/+2/+3/+4/+5 per quality tier)
- **No +Spell Power** (catalysts already gain spell damage per quality tier)
- **No +max Focus** (Focus scaling is handled by character progression)

Materials that simply stack on these baselines become the "boring optimal" choice, undermining the modular magic item system. Instead, materials should provide **lateral benefits** — situational advantages, unique interactions, or thematic capabilities that create interesting choices rather than mathematically mandatory ones.

### 1.6 No Passive Casting Bonuses

Materials must **not** grant passive bonuses (boons) on spellcasting rolls. A permanent "+1 boon on all fire spells" is overpowered for any material tier because it applies to every single cast without limit.

**Permitted alternatives:**
- Once per scene/day triggered benefits (e.g., "1/scene, re-roll a failed cast")
- Damage type flexibility (e.g., "change spell damage type")
- Conditional or situational benefits with clear limits

### 1.7 Weapon Identity Preservation

The weapon property triangle (pierce, slash, crush) defines weapon identity and playstyle. Materials must **not** passively grant weapon properties that violate this identity.

- **Prohibited:** "This weapon gains the reach property" (a dagger with reach makes no sense)
- **Prohibited:** "This weapon gains the crush property" (crush represents blunt force/armor-piercing weapon design, not material composition)
- **Permitted:** Damage type conversion (changing physical to elemental does not violate weapon identity)
- **Permitted:** Material-intrinsic properties like weight changes (+1 load for heavy materials, -1 load for light materials)

### 1.8 Wearable Power Budget

Because players can equip multiple wearable items simultaneously (helmet, cloak, bracers, ring, etc.), wearable effects must be **strictly weaker** than armor equivalents:

- If armor grants a **permanent** resistance, the wearable version should grant **1/scene** or **1/day** resistance
- If armor grants a **condition immunity**, the wearable version should grant **1/day ignore** the condition
- If a material has armor effects, it should also have wearable effects (and vice versa) so the material works across item types

### 1.9 Vault Lore Usage

The Nexus RPG Vault contains rich worldbuilding for each material. However, the vault has **no insight into game rules** — any game-mechanical effects described in the vault are based on speculation and must be ignored.

**Use from vault:** Physical descriptions, cultural context, origin stories, rarity, crafting traditions, thematic identity.

**Ignore from vault:** Damage bonuses, skill bonuses, spell bonuses, or any mechanical effects.

---

## 2. Exotic Materials (Q3–Q4)

### 2.1 Current Effects — Coherence Analysis

The ten published Exotic materials establish the baseline power level. This section analyzes their coherence and identifies patterns for higher-tier design.

| # | Material | Current Effects | Category | Coherence Notes |
|---|----------|----------------|----------|-----------------|
| 1 | Chitin | Armor/Shield: -1 load | Weight | ✓ Clean single effect |
| 2 | Iron | Weapon: +1 boon vs. spirits. Armor: +1 bane Mysticism | Anti-spirit | ✓ Interesting trade-off |
| 3 | Monster Bone | Any: -1 load | Weight | ✓ Universal weight reduction |
| 4 | Monster Scales | Armor/Shield: 1/scene resist physical | Resistance | ✓ Good reactive template |
| 5 | Giant Spider Silk | Light Armor: -1 load | Weight | ✓ Narrow but thematic |
| 6 | Silverroot | Weapon/Ammo: +1 boon vs. lycanthropes/undead | Anti-creature | ✓ Niche boon — conditional |
| 7 | Runebark | Armor/Shield: 1/scene resist spell damage | Resistance | ✓ Good reactive template |
| 8 | Dwarf-Steel | Any: 1/day re-roll Durability. Heavy Armor: climate immunity | Durability + utility | ✓ Multi-benefit, good Q3 complexity |
| 9 | Darkwood | Weapon/Shield/Ammo: -1 load | Weight | ✓ Clean, typed weight |
| 10 | Wyrmhide | Armor/Shield: 1/scene resist elemental (any) | Elemental resistance | ✓ Versatile but limited (1/scene) |

**Patterns identified:**
- **Weight:** 5 of 10 materials provide -1 load — common at this tier
- **Resistance:** 3 of 10 provide 1/scene resistance — good reactive template
- **Conditional boon:** 2 of 10 provide boons vs. specific creature types — acceptable at Q3
- **Complexity:** Ranges from single effect (Chitin) to two effects (Dwarf-Steel)

**Revision recommendations for published Exotic materials:**

| Material | Recommendation |
|----------|---------------|
| Mithril (Q5, see §3) | Expand beyond armor/shield — add weapon/wearable coverage |
| All others | No mechanical changes needed — coherent baseline |

### 2.2 Vault-Only Proposals (Q3–Q4)

#### 2.2.1 Shine-Bronze (*Glanzbronze*)

> *Magical alloy of bronze and Solarite dust, forged by Ghahar smiths. Warm-golden glow with reddish shimmer, radiates constant warmth and soft light. Sacred to the Anutep — possession by outsiders is a grave sin.*

**Design notes:** Q3 fire-themed exotic. Identity is fire conversion and warmth — the entry-level fire material, below Solarite (Q5). Modest single effects matching Q3 power budget. (Name translated as "Shine-Bronze" per reviewer preference — literal translation of *Glanzbronze*.)

| Item Type | Proposed Effect |
|-----------|----------------|
| **Weapon/Ammo** | On a hit, you can choose to deal fire damage instead of physical damage. The weapon emits dim light in melee range. |
| **Heavy Armor** | The armor emits dim light in melee range. You don't suffer a penalty for wearing heavy armor in extreme cold climates. |

---

#### 2.2.2 Vine Wood (*Rankenholz*)

> *Inner fibers of gigantic jungle vine plants. Extraordinary elasticity — can be bent 180° without breaking. The preferred material for bow-makers worldwide. No magical properties; purely physical superiority.*

**Design notes:** Q3 non-magical material defined by extreme flexibility. Only applicable to ranged weapons (bows, crossbows). Durability through flexibility, not magic.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Weapon (ranged only)** | -1 load (min. 0). Once per day, you can ignore a failed Durability check for this weapon. This material can only be used for ranged weapons. |

---

#### 2.2.3 Elemental Stones (*Elementarsteine*)

> *Magically charged crystals containing concentrated elemental energy (fire, frost, lightning, or acid). Form naturally where elemental energies seep from the Soul Realms. Enable pseudo-magical effects without spellcasting — "magic for the people."*

**Design notes:** Variable-quality crystals. Choose one element (fire, frost, lightning, or acid) when the item is created. Ammo conversion is straightforward; catalyst effect (re-roll damage die) is limited to 1/scene for balance.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Ammo** | Choose one element (fire, frost, lightning, or acid) when this ammo is created. On a hit, this ammo deals the chosen element as its damage type instead of physical damage. The ammo shatters on impact (single use, no recovery). |
| **Spell Catalyst** | Choose one element (fire, frost, lightning, or acid) when this catalyst is created. Once per scene, when you deal damage with a spell of the chosen element, you can re-roll one damage die (take the higher result). |

---

## 3. Greater Materials (Q5–Q6)

### 3.1 Meteorite

> *Blue-silver cosmic mineral found in fallen sky-stones. Universally enhances magical energy. Valued by mages, academies, and temples of star gods.*

**Design notes:** Universal magic flexibility. Core identity is elemental versatility — the ability to change damage types on the fly. No flat bonuses; instead provides tactical options.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Weapon** | Once per scene, when you hit a creature, you can choose to deal the damage as any one elemental type (fire, frost, lightning, acid, radiant, or necrotic) instead of its normal type. The weapon emits dim light in melee range. |
| **Spell Catalyst** | Once per scene, when you deal damage with a spell, you can change the spell's damage type to any one elemental type (fire, frost, lightning, acid, radiant, or necrotic). The catalyst emits dim light in melee range. |
| **Armor** | Once per scene, when you take elemental damage (fire, frost, lightning, or acid), you can gain resistance against that damage. The armor emits dim light in melee range. |
| **Wearable** | Once per day, when you take elemental damage (fire, frost, lightning, or acid), you can gain resistance against that damage. The item emits dim light in melee range. |

---

### 3.2 Treantwood

> *Wood from awakened tree-beings (Treants) — given only as a voluntary gift, never taken by force. Stolen Treantwood is cursed. The material regenerates small damage over time and reacts to nature magic.*

**Design notes:** Identity is living durability and nature-magic synergy. Core effect: self-repair durability. Secondary: nature-spell safety net for catalysts. No weapon property grants (reach would violate weapon identity on short weapons).

| Item Type | Proposed Effect |
|-----------|----------------|
| **Any** | Once per day, you can ignore a failed Durability check for this item. |
| **Spell Catalyst** | Once per scene, when you fail a casting roll for a mystic nature-tradition spell, you don't lose the Focus that was spent on that attempt. |
| **Shield** | This shield regains 1 lost Durability die after each short break spent in natural surroundings (forest, grove, jungle, etc.). |

---

### 3.3 Dragon Bone

> *Bones from true dragons, their marrow carrying the elemental nature of the dragon. A Dragon Bone weapon is a symbol of ultimate dominance.*

**Design notes:** Single-element specialist. Must clearly escalate beyond Elemental Stones (Q3, ammo-only conversion). Dragon Bone provides permanent weapon conversion PLUS a once-per-scene burst, and permanent armor resistance — a clear tier upgrade.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Weapon/Ammo** | Choose one element (fire, frost, lightning, or acid) when this item is created. This weapon deals the chosen element as its damage type instead of physical damage. Once per scene, on a hit, you can deal an additional 2 damage of the chosen element (ignoring AV). |
| **Heavy Armor** | Choose one element (fire, frost, lightning, or acid) when this item is created. You gain resistance against damage of the chosen element. |
| **Shield** | Choose one element (fire, frost, lightning, or acid) when this item is created. You gain resistance against damage of the chosen element. |
| **Wearable** | Choose one element (fire, frost, lightning, or acid) when this item is created. Once per scene, when you take damage of the chosen element, you can gain resistance against that damage. |

---

### 3.4 Dragon Scales

> *Scales from true dragons. Legendary hardness with elemental attunement. Lighter than metal, passed down through noble families for centuries.*

**Design notes:** Armor-focused elemental protection. Permanent resistance to one element. Light armor gains -1 load reflecting the scales' lightness. Distinct from Dragon Bone: scales protect (resistance), bones attack (conversion).

| Item Type | Proposed Effect |
|-----------|----------------|
| **Light Armor** | Choose one element (fire, frost, lightning, or acid) when this item is created. You gain resistance against damage of the chosen element. -1 load (min. 0). |
| **Heavy Armor** | Choose one element (fire, frost, lightning, or acid) when this item is created. You gain resistance against damage of the chosen element. Once per day, when you would gain a condition from an attack dealing the chosen element's damage, you can ignore that condition. |
| **Shield** | Choose one element (fire, frost, lightning, or acid) when this item is created. You gain resistance against damage of the chosen element. |

---

### 3.5 Deep Iron

> *Heavy ore from the deepest mines, where earth-magic saturates the stone. Twice the weight of steel, shaped only in lava-forges by dwarf smiths. The material of fortress gates and unbreachable vaults.*

**Design notes:** Identity is extreme weight and anti-magic. The +1 load trade-off creates a meaningful choice. Weapons: anti-magic penetration on strong/critical hits (not crush — crush violates weapon identity triangle). Armor/shield: spell damage protection.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Weapon** | +1 load. On a strong or critical hit, this weapon's damage ignores any magical effects that would reduce or resist it (such as magical AV bonuses, magical damage resistance, or protective spell effects). Natural AV from worn armor is not affected. |
| **Heavy Armor** | +1 load. Once per scene, when you take damage from a spell or magical ability, you can gain resistance against that damage. |
| **Shield** | +1 load. Once per scene, when you take damage from any source, you can gain resistance against that damage. |

---

### 3.6 Phantom-Silk

> *Silk from spectral spiders in the Soul Realms. Nearly weightless, hard to see, and partially intangible. Absorbs light and makes the wearer's outline blur like a ghost.*

**Design notes:** Identity is ethereal phasing and spectral defense. Light armor provides a unique once-per-day phase ability (moving through walls). Distinct from Shadow Pelt: Phantom-Silk is about incorporeality, Shadow Pelt is about shadow concealment.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Light Armor** | -1 load (min. 0). Once per day, you can become briefly incorporeal — you can move through one non-magical wall or barrier up to 1 pace thick as part of your movement. |
| **Shield** | -1 load (min. 0). Once per scene, when a Spirit creature hits you with an attack, you can gain resistance against that damage. |
| **Wearable** | Once per scene, when a creature hits you with an attack, you can become briefly intangible and gain resistance against that attack's damage. |

---

### 3.7 Mithril

> *Silver-blue metal, feather-light with tremendous hardness. Found in "sky-veins" of the highest peaks and floating islands.*

**Design notes:** Current rules only cover armor/shield (-1 load, -1 rigid). Expanded here to cover all item types, consistent with the ultra-light identity. Core identity is purely weight reduction — the lightest metal in existence.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Any** | -1 load (min. 0). |
| **Armor/Shield** | Reduce the item's rigid property by 1 (min. 0). |

---

### 3.8 Solarite

> *Red-gold sun crystal found on celestial mountain peaks. Mixed with bronze in a ritual to create a heat-reactive alloy. Generates intense heat when moved quickly. Sacred to the Anutep elves.*

**Design notes:** Advanced fire specialist — escalates from Shine-Bronze (Q3, simple fire conversion). Solarite adds fire penetration for catalysts and burning immunity for armor. Weapon conversion plus bright light (stronger visual than Shine-Bronze's dim light).

| Item Type | Proposed Effect |
|-----------|----------------|
| **Weapon/Ammo** | This weapon deals fire damage instead of physical damage. The weapon emits bright light in melee range and dim light in close range. |
| **Spell Catalyst** | Once per scene, when you deal fire damage with a spell, that spell's fire damage ignores resistance to fire for that cast. The catalyst emits dim light in melee range. |
| **Armor** | You are immune to the burning condition. The armor emits dim light in melee range. |
| **Wearable** | Once per day, when the burning condition would be applied to you, you can ignore it. The item emits dim light in melee range. |

---

### 3.9 Lunarite

> *Deep blue moon crystal from underworld caverns. Absorbs warmth and magical energy. "The great equalizer — the mightiest archmage is just a mortal when Lunarite forms their chains."*

**Design notes:** Identity is anti-magic defense and mental protection. Charmed immunity reflects the magic-absorbing nature. Armor provides spell resistance. Wearable provides anti-tracking. No weapon effects — Lunarite is purely defensive.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Heavy Armor** | You are immune to the charmed condition. Once per day, when you take damage from a spell, you can gain resistance against that damage. |
| **Shield** | Once per scene, when you take damage from a spell or magical ability, you can gain resistance against that damage. |
| **Wearable** | You are immune to the charmed condition. You cannot be detected or located by magical means (divination, scrying, magical tracking, etc.). |

---

### 3.10 Adamantite

> *Silver-white metal of near-indestructible hardness from the deepest earth layers. Immune to rust, acid, and decay. The ancient dwarf clans who knew how to mine it are lost — only finished heirlooms remain.*

**Design notes:** Identity is absolute indestructibility and physical hardness. Weapon utility: cuts through objects and structures. Armor/shield: physical damage reduction. No baseline stacking — the material's value is in its uniqueness (never breaks) and its utility (cuts through anything non-living).

| Item Type | Proposed Effect |
|-----------|----------------|
| **Any** | This item is practically indestructible. It never requires Durability checks and cannot be broken by non-magical means. |
| **Weapon** | This weapon can cut through non-magical objects and structures without resistance — it ignores the AV and HP of non-creature targets. |
| **Armor** | Once per scene, when you take physical damage, you can reduce that damage by 2 (after applying AV). |
| **Shield** | This shield cannot be sundered or destroyed by any weapon or ability. Once per scene, when you take physical damage, you can reduce that damage by 2 (after applying AV). |

---

### 3.11 Dragon Hide (*Drachenhaut*) — Vault-Only

> *Skin from between dragon scales — more flexible than scales but tougher than leather. Retains partial elemental resistance at full freedom of movement. Favored by rangers, rogues, and light fighters who value mobility.*

**Design notes:** Q5–Q6 vault material. The light-fighter counterpart to Dragon Scales (which favors heavy armor). Permanent single-element resistance in light armor (like Dragon Scales) but limited to light armor and wearables. Escalates from Wyrmhide (Q3, 1/scene any element) to permanent single-element.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Light Armor** | Choose one element (fire, frost, lightning, or acid) when this item is created. You gain resistance against damage of the chosen element. -1 load (min. 0). |
| **Wearable** | Choose one element (fire, frost, lightning, or acid) when this item is created. Once per scene, when you take damage of the chosen element, you can gain resistance against that damage. |

---

### 3.12 Shadow Pelt (*Schattenfell*) — Vault-Only

> *Fur from shadow creatures dwelling in the in-between planes. Deep black that absorbs light. Dampens all sound in immediate vicinity. The creature dissolves into mist within minutes of death — a preservationist must be present immediately.*

**Design notes:** Q5 vault material. Shadow-themed stealth specialist. Distinct from Phantom-Silk: Shadow Pelt is about darkness affinity and concealment, Phantom-Silk is about incorporeality and phasing. Psychic resistance reflects the shadow-plane origin.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Light Armor** | -1 load (min. 0). You gain resistance against psychic damage. |
| **Wearable** | While in dim light or darkness, you gain +1 boon on Stealth rolls. You cannot be detected by divination or scrying magic while you are hidden. |

---

## 4. Legendary Materials (Q7–Q8)

### 4.1 Orichalcum

> *Gold saturated with pure magic over aeons at ley-line intersections. Conducts and potentiates magic like no other material. Enchantments placed on it last forever. Material for artifacts that shape the fate of empires.*

**Design notes:** Core identity is **enchantment amplification** — the material that makes enchantments more powerful. This is unique in the entire system and creates exciting build synergies with the modular enchantment system. Secondary: elemental flexibility for weapons. *Balance consideration:* The +1 daily use is powerful with combat enchantments (tough, blurring) — this is intentional for Q7–Q8 pricing. The GM may rule that unique or artifact-level enchantments are exempt.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Any** | Any enchantment on this item gains +1 daily use. (An enchantment with 1/day becomes 2/day, 2/day becomes 3/day, etc. Enchantments without daily use limits are not affected.) |
| **Weapon** | Once per scene, when you hit a creature, you can choose to deal the damage as any damage type of your choice. |
| **Armor/Shield** | -1 load (min. 0). Reduce the item's rigid property by 1 (min. 0). |
| **Spell Catalyst** | Once per day, after you successfully cast a spell, you can treat the result as one success level higher (weak → strong, strong → critical). A failed cast cannot be improved this way. |

---

### 4.2 Celestial Feathers

> *Fallen feathers from divine beings — angels, celestial messengers, mythic birds. Practically weightless, self-luminous, and indestructible. Retain flight properties of their original bearers.*

**Design notes:** Core identity is **flight**. Once-per-day flight is a signature legendary ability that feels appropriately mythic. Fall damage immunity is always-on. Divine protection against undead/infernal as a secondary theme.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Any** | -1 load (min. 0). You never take falling damage. The item emits dim light in melee range. |
| **Light Armor** | You gain +1 Movement per turn. Once per day, you can fly up to a medium distance as part of your movement. The flight ends at the end of your turn — you must land or begin hovering (descending gently over a brief duration). |
| **Heavy Armor** | Reduce the item's rigid property by 1 (min. 0). Once per day, you can fly up to a short distance as part of your movement. The flight ends at the end of your turn. |
| **Shield** | Once per scene, when a Spirit (Infernal) or Undead creature hits you with an attack, you can gain resistance against that damage. |
| **Wearable** | Once per day, you can fly up to a short distance as part of your movement. The flight ends at the end of your turn. |

---

### 4.3 Elder Dragon Bone

> *Fossilized remains of primordial dragons (5000+ years). The marrow still radiates immense elemental energy. "Destiny weapons" often found through prophecy.*

**Design notes:** Core identity is **elemental penetration** — damage of the chosen element ignores resistance. Clearly escalates from Dragon Bone (Q5: conversion + 1/scene burst) to Elder Dragon Bone (Q7: conversion + resistance penetration). This is a powerful offensive material that rewards committing to a single element.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Weapon/Ammo** | Choose one element (fire, frost, lightning, or acid) when this item is created. This weapon deals the chosen element as its damage type instead of physical damage. This weapon's elemental damage ignores resistance to the chosen element. |
| **Heavy Armor** | Choose one element (fire, frost, lightning, or acid) when this item is created. You gain resistance against the chosen element. Once per scene, when you take damage from a different element, you can also gain resistance against that damage. |
| **Spell Catalyst** | Choose one element (fire, frost, lightning, or acid) when this item is created. Once per scene, when you deal damage with a spell of the chosen element, that spell's damage ignores resistance to the chosen element for that cast. |
| **Wearable** | Choose one element (fire, frost, lightning, or acid) when this item is created. You gain resistance against the chosen element. |

---

### 4.4 Elder Dragon Scales

> *Rare, hardened scales from elder dragons. Self-repairing — scratches heal in a day. Near-absolute elemental immunity. Only enough scales exist for one armor per era.*

**Design notes:** Core identity is **multi-element resistance** — permanent resistance to all four elemental types. A clear escalation from Dragon Scales (Q5: one element). Self-repair reflects the vault's self-healing description.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Light Armor** | You gain resistance against acid, fire, frost, and lightning damage. -1 load (min. 0). |
| **Heavy Armor** | You gain resistance against acid, fire, frost, and lightning damage. This armor regains 1 lost Durability die after each night's rest. |
| **Shield** | You gain resistance against acid, fire, frost, and lightning damage. |
| **Wearable** | Once per scene, when you take acid, fire, frost, or lightning damage, you can gain resistance against that damage. |

---

### 4.5 Aegium

> *White-gold metal of the divine realms. Radiates gentle warmth, a harmonious tone when struck, and constant soft light. Neutralizes poisons and diseases on contact. Burns unworthy bearers — only lent to "heroes of light."*

**Design notes:** Core identity is **divine survival** — the legendary ability to survive a lethal blow once per day. Secondary: purification (poison/disease immunity) and anti-undead/infernal. The most explicitly "heroic" material.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Any** | The item emits dim light in melee range. You are immune to the poisoned and diseased conditions. |
| **Weapon** | On a hit against a Spirit (Infernal) or Undead creature, deal +2 radiant damage (ignoring AV). |
| **Heavy Armor** | Once per day, when you would be reduced to 0 HP, you are reduced to 1 HP instead. |
| **Shield** | Once per scene, when you take necrotic or poison damage, you can gain resistance against that damage. |

---

### 4.6 Eternite

> *Cosmic crystal from shattered moons. Midnight-blue to black with star-like points of light. Thermally immune — never hot or cold. Creates gravity effects, making things lighter or heavier. Enables the construction of "impossibilities" — flying throne rooms, hovering fortresses.*

**Design notes:** Core identity is **gravity manipulation**. Weight reduction, temperature immunity, and a signature catalyst ability: casting a spell without spending Focus once per day. This represents the crystal's ability to draw energy from surroundings.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Any** | -1 load (min. 0). You are immune to extreme heat and extreme cold effects during travel. |
| **Spell Catalyst** | Once per day, when you cast a spell that costs Focus, you can cast it without spending Focus. The spell's effects (damage, duration, etc.) are calculated as if Focus was spent normally — only the cost is waived. This catalyst has 0 load. |
| **Heavy Armor** | Reduce the item's rigid property by 2 (min. 0). |
| **Shield** | Once per scene, when you would be pushed or knocked prone, you can ignore that effect. |
| **Wearable** | Once per day, you can levitate yourself or one willing creature you touch up to a short distance vertically. The target hovers for a short duration (about 1 minute) before descending gently. |

---

### 4.7 Elderwood

> *Wood from ancient magical trees whose roots tap deep ley-line networks. Exceptionally strong and magically responsive. Druids consider it a sacred gift. The older, more powerful cousin of Treantwood.*

**Design notes:** Core identity is **living resilience and nature mastery**. Self-repair and reformation on destruction (escalates from Treantwood's 1/day ignore Durability). Catalyst provides mystic spell re-roll. Weapon can function as a nature catalyst — a unique legendary ability enabling druid-warrior builds.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Any** | This item is self-repairing. It regains 1 lost Durability die after each night's rest. If the item would be destroyed, it instead becomes inert for one day and then reforms with 1 Durability die. |
| **Weapon** | This weapon also functions as a spell catalyst for mystic nature-tradition spells, using the same Quality tier for spell damage bonuses. |
| **Spell Catalyst** | Once per scene, when you fail a mystic spell casting roll, you can re-roll that test (you must accept the new result). |
| **Shield** | Once per scene, when you take damage from any source, you can gain resistance against that damage. |

---

### 4.8 Dreamweave

> *Fabric spun from crystallized dream-stuff. Shifts color with the wearer's mood, flows as if underwater, and makes no sound. Provides protection against mental influence and illusion magic. The wearer always has lucid dreams.*

**Design notes:** Core identity is **mental fortress** — comprehensive psychic and condition protection. Permanent psychic resistance plus frightened immunity. Shield provides broader condition blocking. A purely defensive material with no offensive applications.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Light Armor** | -1 load (min. 0). You gain resistance against psychic damage. You are immune to the frightened condition. |
| **Heavy Armor** | You gain resistance against psychic damage. You are immune to the frightened condition. Once per scene, when an effect would inflict the charmed, confused, or stunned condition on you, you can choose to not suffer that condition. |
| **Shield** | Once per scene, when an effect would inflict the charmed, confused, dazed, frightened, or stunned condition on you, you can choose to not suffer that condition. |
| **Wearable** | You are immune to the frightened condition. Once per day, when you take psychic damage, you can gain resistance against that damage. |

---

### 4.9 Titanium

> *Magenta metal that "grows" at reality rifts to the Lower Realms. Surrounded by a thin force field. Absorbs shock and impact. Prolonged exposure causes nightmares and aggression. Paradoxically effective as both demon-hunting and demon-empowering equipment.*

**Design notes:** Core identity is **impact fortress** — physical damage reduction and necrotic resilience. The force field absorbs kinetic energy. Armor provides the highest physical damage reduction of any material (4 per scene). Distinct from Adamantite (Q5: indestructible + cuts objects) — Titanium absorbs energy rather than resisting it.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Weapon** | Once per scene, when you hit a creature, you can choose to deal the damage as necrotic damage instead of its normal type. On a hit against a Spirit (Infernal) creature, deal +2 bonus damage (ignoring AV). |
| **Heavy Armor** | Once per scene, when you take physical damage, you can reduce that damage by 4 (after applying AV). You gain resistance against necrotic damage. |
| **Shield** | Once per scene, when you take damage from any source, you can gain resistance against that damage. You gain resistance against necrotic damage. |
| **Wearable** | You gain resistance against necrotic damage. Once per scene, when you take physical damage, you can reduce that damage by 2 (after applying AV). |

---

### 4.10 Infernal Horn

> *Horn from arch-demons or powerful beasts of the lower hell-planes. Channels heat and demonic energy. Permanently warm, with natural rune-like patterns. Radiates an aura of unease. Possession is punishable by death in most holy cities.*

**Design notes:** Core identity is **infernal fire mastery** — the ultimate fire material. Escalates from Solarite (Q5: fire conversion + penetration) to permanent fire resistance plus burning immunity for armor, and fire/necrotic flexibility for catalyst. The anti-infernal weapon bonus is appropriate given the material's origin.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Weapon** | This weapon deals fire damage instead of physical damage. On a hit against a Spirit (Infernal) creature, deal +2 bonus damage (ignoring AV). |
| **Heavy Armor** | You gain resistance against fire damage. You are immune to the burning condition. |
| **Spell Catalyst** | Once per scene, when you deal fire or necrotic damage with a spell, you can change it to deal the other type instead (fire → necrotic, or necrotic → fire). |
| **Wearable** | You gain resistance against fire damage. Once per day, when the burning condition would be applied to you, you can ignore it. |

---

### 4.11 Primordial Bone (*Urzeit-Knochen*) — Vault-Only

> *Tusks, fangs, and horns from Apex Beasts — the first living creatures, older than most gods. Ivory-white with pulsing golden veins and unreadable ancient runes. Absolutely unbreakable. The material "chooses" its bearer. Obtainable only after the natural death of an Apex Beast or as a voluntary gift.*

**Design notes:** Q7 Legendary vault material. Core identity is **absolute indestructibility and penetration** — the ultimate offensive material. Escalates from Adamantite (Q5: indestructible + physical utility) by adding magic-resistance penetration. Complemented by Primordial Hide (defensive counterpart).

| Item Type | Proposed Effect |
|-----------|----------------|
| **Any** | This item is indestructible. It never requires Durability checks and cannot be broken or damaged by any means, magical or otherwise. |
| **Weapon** | This weapon's damage counts as both physical and magical. It ignores resistance to physical damage (such as from creatures that resist non-magical weapons). Magical resistance or elemental resistance is not bypassed. |
| **Spell Catalyst** | This catalyst also functions as a melee weapon (quarterstaff) of the same Quality tier. Once per scene, when you fail a mystic nature-tradition spell casting roll, you can re-roll that test (you must accept the new result). |
| **Shield** | This shield cannot be sundered, disarmed, or destroyed by any effect. Once per scene, when you take damage from any source, you can reduce that damage by 4 (after applying AV). |

---

### 4.12 Primordial Hide (*Urzeit-Leder*) — Vault-Only

> *Skin of Apex Beasts. Deep earth-brown with golden/green veins of living energy. Unbelievably soft yet indestructible. Feels weightless, always body-warm, pulses faintly at touch. Absorbs kinetic impact energy. The material still "lives" — it breathes and reacts to the wearer's emotions.*

**Design notes:** Q7 Legendary vault material. Core identity is **absolute protection and self-repair** — the ultimate defensive material. Total self-repair (all Durability after rest), with reformation on destruction. Broad damage reduction (any type, not just physical — distinct from Titanium which is physical-only). Necrotic resistance from the primal life-force that resists death energy.

| Item Type | Proposed Effect |
|-----------|----------------|
| **Any** | This item is self-repairing. It regains all lost Durability dice after each night's rest. If the item would be destroyed, it instead becomes inert for one day and then reforms fully. |
| **Light Armor** | -1 load (min. 0). Once per scene, when you take damage from any source, you can reduce that damage by 4 (after applying AV). You gain resistance against necrotic damage. |
| **Shield** | Once per scene, when you take damage from any source, you can gain resistance against that damage. You gain resistance against necrotic damage. |
| **Wearable** | You gain resistance against necrotic damage. Once per scene, when you take damage from any source, you can reduce that damage by 2 (after applying AV). |

---

## 5. Summary Tables

### 5.1 Exotic Materials — Vault-Only Proposals (Q3–Q4)

| Material | Unique Identity | Key Effect |
|----------|----------------|------------|
| Shine-Bronze | Fire entry-level | Weapon: fire conversion. Armor: cold climate |
| Vine Wood | Ranged durability | -1 load, 1/day ignore Durability (ranged only) |
| Elemental Stones | Element ammo/catalyst | Ammo: element conversion. Catalyst: 1/scene re-roll damage die |

### 5.2 Greater Materials (Q5–Q6)

| Material | Unique Identity | Key Effects |
|----------|----------------|-------------|
| Meteorite | Elemental flexibility | 1/scene change damage type to any element |
| Treantwood | Living durability | 1/day ignore Durability. Catalyst: nature spell Focus safety |
| Dragon Bone | Single-element offense | Permanent element conversion + 1/scene burst |
| Dragon Scales | Single-element defense | Permanent element resistance + condition protection |
| Deep Iron | Anti-magic weight | +1 load. Weapon: bypass magical defenses. Armor: spell resist |
| Phantom-Silk | Ethereal phasing | Light armor: 1/day phase through wall. Wearable: 1/scene resist |
| Mithril | Ultra-light | Any: -1 load. Armor: -1 rigid |
| Solarite | Fire specialist | Fire conversion + penetration. Armor: burning immune |
| Lunarite | Anti-magic defense | Charmed immune. Armor/shield: spell damage resist |
| Adamantite | Indestructible | Never breaks. Weapon: cuts objects. Armor: reduce physical |
| Dragon Hide *(vault)* | Light elemental armor | Permanent single-element resist + -1 load (light armor) |
| Shadow Pelt *(vault)* | Shadow concealment | Psychic resist. Stealth in dim light. Anti-divination |

### 5.3 Legendary Materials (Q7–Q8)

| Material | Unique Identity | Signature Effect |
|----------|----------------|------------------|
| Orichalcum | Enchantment amplifier | All enchantments gain +1 daily use |
| Celestial Feathers | Divine flight | 1/day flight. No fall damage. +1 Movement |
| Elder Dragon Bone | Elemental penetration | Elemental damage ignores resistance |
| Elder Dragon Scales | Multi-element shield | Permanent resist to acid, fire, frost, lightning |
| Aegium | Divine survival | 1/day survive lethal at 1 HP. Poison/disease immune |
| Eternite | Gravity mastery | Catalyst: 1/day free spell cast. Armor: -2 rigid |
| Elderwood | Living nature mastery | Self-repairs + reforms. Weapon = nature catalyst |
| Dreamweave | Mental fortress | Psychic resist + frightened immune + condition block |
| Titanium | Impact fortress | Armor: reduce physical by 4. Necrotic resist |
| Infernal Horn | Infernal fire mastery | Fire conversion + fire resist + burning immune |
| Primordial Bone *(vault)* | Absolute penetration | Truly indestructible. Ignores physical resistance |
| Primordial Hide *(vault)* | Absolute protection | Full self-repair. Reduce ANY damage by 4. Necrotic resist |

---

## Appendix A — Tier Escalation Chart

This chart traces how thematically linked materials escalate across tiers. Each higher-tier material must provide clearly superior effects.

| Theme | Exotic (Q3–Q4) | Greater (Q5–Q6) | Legendary (Q7–Q8) |
|-------|----------------|------------------|--------------------|
| **Fire specialist** | Shine-Bronze: fire conversion + dim light | Solarite: fire conversion + bright light + fire penetration (catalyst) + burning immune | Infernal Horn: fire conversion + fire resist + burning immune + fire/necrotic flexibility |
| **Elemental weapon** | Elemental Stones: ammo-only element conversion | Dragon Bone: permanent weapon conversion + 1/scene burst | Elder Dragon Bone: permanent conversion + ignores element resistance |
| **Elemental armor** | Wyrmhide: 1/scene resist any one element | Dragon Scales: permanent resist one element | Elder Dragon Scales: permanent resist ALL four elements |
| **Light elemental** | Wyrmhide: 1/scene any | Dragon Hide: permanent one element + -1 load (light) | Elder Dragon Scales: permanent four elements + -1 load (light) |
| **Weight/mobility** | Chitin/Monster Bone/Darkwood: -1 load | Mithril: -1 load + -1 rigid | Orichalcum: -1 load + -1 rigid + enchantment amp; Celestial Feathers: -1 load + flight |
| **Anti-magic** | Runebark: 1/scene resist spell damage | Lunarite: charmed immune + spell resist; Deep Iron: bypass magical defenses | Dreamweave: psychic resist + frightened immune + condition block |
| **Nature/wood** | Darkwood: -1 load | Treantwood: 1/day ignore Durability + nature Focus safety | Elderwood: self-repair + reform + weapon=catalyst + mystic re-roll |
| **Physical defense** | Monster Scales: 1/scene physical resist | Adamantite: indestructible + reduce phys by 2 | Titanium: reduce phys by 4 + necrotic resist; Primordial Hide: reduce ANY by 4 + necrotic resist + full self-repair |
| **Durability** | Dwarf-Steel: 1/day re-roll Durability; Vine Wood: 1/day ignore Durability | Treantwood: 1/day ignore Durability; Adamantite: indestructible | Elderwood: self-repair + reform; Primordial Bone: truly indestructible |
| **Stealth** | — | Phantom-Silk: -1 load + phase through walls; Shadow Pelt: -1 load + psychic resist + anti-divination | Dreamweave: -1 load + psychic/mental fortress |
| **Divine/holy** | Silverroot: +1 boon vs undead/lycanthropes | — | Aegium: survive lethal + poison/disease immune + anti-undead/infernal; Celestial Feathers: flight + anti-Spirit/Undead |
| **Dark/infernal** | — | — | Titanium: physical reduction + necrotic resist; Infernal Horn: fire mastery + anti-infernal |
| **Primal/apex** | — | — | Primordial Bone: truly indestructible + ignores physical resist; Primordial Hide: full self-repair + reduce ANY by 4 |
| **Universal magic** | — | Meteorite: any-element flexibility | Orichalcum: enchantment amp + any-type weapon + success level boost; Eternite: free spell + gravity |
| **Ranged weapons** | Vine Wood: -1 load + 1/day Durability (ranged only) | — | — |

---

## Appendix B — Enchantment Overlap Audit

This appendix checks each proposed material effect against all existing enchantments to ensure no duplication.

| Material Effect | Closest Enchantment | Overlap? | Resolution |
|----------------|---------------------|----------|------------|
| Meteorite: change damage type | Flaming/Sacred/Defiled (add element on Quick Action) | **No overlap.** Material converts damage type (1/scene); enchantments add bonus damage via activation. |
| Treantwood: 1/day ignore Durability | Dwarf-Steel (1/day re-roll Durability) | **Escalation.** Treantwood auto-ignores; Dwarf-Steel re-rolls. Appropriate Q5 upgrade. |
| Treantwood: nature Focus safety | Stabilizing (re-roll failed cast) | **Distinct.** Treantwood saves Focus on failure; Stabilizing re-rolls the cast. Different mechanics. |
| Dragon Bone: 1/scene burst +2 | Slaying (+2/4/6 vs creature type) | **Distinct.** Dragon Bone is element-typed and universal; Slaying is creature-conditional. |
| Deep Iron: bypass magical defenses | Sundering (ignore 1/2 AV) | **Distinct.** Deep Iron bypasses magical protections specifically; Sundering ignores natural AV. |
| Phantom-Silk: phase through wall | — | **Unique.** No enchantment provides phasing. |
| Solarite: fire ignores resistance | Volatile (+damage with Durability risk) | **Distinct.** Solarite penetrates fire resistance; Volatile adds flat damage with risk. |
| Lunarite: charmed immune | Of Immunity (immune to one chosen condition) | **Narrow.** Material gives charmed specifically as part of a package; enchantment covers any condition. Enchantment remains valuable. |
| Adamantite: indestructible | — | **Unique.** No enchantment provides indestructibility. |
| Orichalcum: +1 enchantment daily use | — | **Unique.** No other effect modifies enchantment usage limits. |
| Orichalcum: success level boost | — | **Unique.** No enchantment provides success level improvement. |
| Celestial Feathers: flight | — | **Unique.** No enchantment provides flight. |
| Elder Dragon Bone: ignores element resistance | Solarite catalyst (fire only, 1/scene) | **Escalation.** Elder Dragon Bone is permanent; Solarite is 1/scene and fire-only. Appropriate Q7 upgrade. |
| Aegium: survive lethal 1/day | — | **Unique.** No enchantment provides this effect. |
| Eternite: free spell 1/day | Infused (regain Focus via Quick Action) | **Distinct.** Eternite provides a free cast; Infused requires an Action and returns Focus. |
| Elderwood: weapon = nature catalyst | — | **Unique.** No enchantment makes a weapon function as a catalyst. |
| Elderwood: mystic re-roll | Stabilizing (re-roll failed cast) | **Distinct slot.** Stabilizing is catalyst-only; Elderwood's re-roll is also on a catalyst but limited to mystic spells and 1/scene. Can coexist (different triggers). |
| Dreamweave: condition block (shield) | Stalwart (1/day ignore condition) | **Distinct scope.** Dreamweave blocks 5 specific mental conditions (1/scene); Stalwart blocks any condition from a broader list (1/day). |
| Primordial Bone: ignores physical resistance | Deep Iron weapon (bypass magical defenses) | **Distinct.** Primordial Bone penetrates physical resistance on creatures; Deep Iron bypasses magical protections. Different targets. |

**Conclusion:** No material effect fully duplicates an enchantment's core identity. Where partial overlaps exist, materials operate in narrower scope, on different item types, or at appropriately escalated tiers.

---

## Appendix C — Talent Synergy Audit

| Material Effect | Nearest Talent | Interaction |
|----------------|---------------|-------------|
| Dragon Bone: element conversion | Fighting talent (elemental style) | **Complementary.** Material sets base element; talent could add rider effects. |
| Deep Iron: bypass magical defenses | — | **Unique to material.** No talent provides this effect. |
| Phantom-Silk: phase through wall | Stealth talents (infiltration) | **Complementary.** Phase is a material-specific movement ability, not a skill technique. |
| Solarite: fire ignores resistance | Arcana/Mysticism talents (fire spells) | **Complementary.** Material penetrates resistance; talents improve casting rolls or add effects. |
| Lunarite: charmed immune | Fortitude talent (resist conditions) | **Complementary.** Material is permanent immunity for one condition; talent covers broader set. |
| Adamantite: cuts objects | — | **Unique to material.** No talent provides object-cutting ability. |
| Orichalcum: enchantment amplification | — | **Unique to material.** No talent modifies enchantment usage. |
| Celestial Feathers: flight | Athletics talents (movement) | **Complementary.** Flight is a material ability; athletics governs climbing/jumping. |
| Aegium: survive lethal 1/day | Fortitude talent (tenacity) | **Complementary.** Both serve survival but trigger differently. |
| Elderwood: weapon = nature catalyst | Mysticism talents (nature casting) | **Complementary.** Material provides dual functionality; talents improve spell effectiveness. |
| Dreamweave: condition block | Fortitude talents (resist conditions) | **Complementary.** Material blocks specific mental conditions; talents may cover broader sets. |
| Primordial Bone: ignores physical resistance | Fighting talents (penetration) | **Complementary.** Material provides innate penetration; talent could add damage or conditions. |
| Primordial Hide: reduce any damage by 4 | Fortitude talents (damage reduction) | **Complementary.** Different sources stack as item + ability bonuses. |

**Conclusion:** No proposed material effect replaces a talent's signature ability. All interactions are complementary or operate in distinct mechanical spaces.

---

## Appendix D — Vault Integration Notes

### Fully Analyzed Vault Materials

| Material | German Name | Vault Quality | Placed In |
|----------|-------------|--------------|-----------|
| Shine-Bronze | Glanzbronze | Q3 | Section 2.2.1 (Exotic) |
| Vine Wood | Rankenholz | Q3 | Section 2.2.2 (Exotic) |
| Elemental Stones | Elementarsteine | Variable | Section 2.2.3 (Exotic) |
| Dragon Hide | Drachenhaut | Q5–Q6 | Section 3.11 (Greater) |
| Shadow Pelt | Schattenfell | Q5 | Section 3.12 (Greater) |
| Primordial Bone | Urzeit-Knochen | Q7 | Section 4.11 (Legendary) |
| Primordial Hide | Urzeit-Leder | Q7 | Section 4.12 (Legendary) |

### Excluded Vault Material

| Material | German Name | Reason |
|----------|-------------|--------|
| Ichor Crystals | Ichor-Kristalle | Early draft in vault — excluded per reviewer request. |

### Vault Materials Already in Game Rules

These appear in both the vault and `materials.md`. Their vault lore was used for thematic flavor only (game-mechanic speculation from vault ignored per §1.9):

Meteorite, Treantwood, Dragon Bone, Dragon Scales, Deep Iron, Phantom-Silk, Mithril, Solarite, Lunarite, Adamantite, Orichalcum, Celestial Feathers, Elder Dragon Bone, Elder Dragon Scales, Aegium, Eternite, Elderwood, Dreamweave, Titanium, Infernal Horn.
