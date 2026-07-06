# Creature Stat Tables

Canonical numeric reference for creature design. Use these values exactly.

## Tier Statistics Table

| Tier | HP | AV (light/heavy) | Defense | Max Attribute | Skill Rank (1st/2nd) | Weapon Damage | Ability Difficulty |
|------|----|--------------------|---------|---------------|----------------------|---------------|--------------------|
| 0    | 5  | 0/1               | 6       | d6            | 0/1                  | 2             | TN 6               |
| 1    | 10 | 1/2               | 7       | d6            | 1/1                  | 3             | TN 7               |
| 2    | 20 | 2/4               | 8       | d8            | 1/2                  | 4             | TN 8               |
| 3    | 30 | 3/6               | 9       | d8            | 2/2                  | 5             | TN 9               |
| 4    | 40 | 4/8               | 10      | d10           | 2/3                  | 6             | TN 10              |
| 5    | 50 | 5/10              | 11      | d10           | 3/3                  | 7             | TN 11              |
| 6    | 60 | 6/12              | 12      | d12           | 3/4                  | 8             | TN 12              |
| 7    | 70 | 7/14              | 13      | d12           | 4/4                  | 9             | TN 13              |
| 8    | 80 | 8/16              | 14      | d12+1         | 4/5                  | 10            | TN 14              |
| 9    | 90 | 9/18              | 15      | d12+1         | 5/5                  | 11            | TN 15              |
| 10   | 100| 10/20             | 16      | d12+2         | 5/5                  | 12            | TN 16              |

Base damage from attribute die: d6→3, d8→4, d10→5, d12→6, d12+1→7, d12+2→8.

## Creature Types

| Type | Description | Common Subtypes |
|------|-------------|-----------------|
| **Aberration** | Eldritch horrors from outside reality with alien physiologies | — |
| **Automaton** | Artificial beings animated by magic or divine power | Golem, Animated Object, Magical Construct |
| **Beast** | Natural animals and fauna lacking inherent magic | Mammal, Reptile, Bird, Fish, Insect, Hybrid |
| **Draconic** | Winged serpents with elemental attunement and breath weapons | Chromatic, Metallic, Elemental, Wyvern |
| **Giant** | Mythical beings of immense size with supernatural properties | Stone Giant, Cyclops, Troll, Ogre |
| **Humanoid** | Sentient anthropomorphic peoples | Human, Goblinoid, Orc, Elf |
| **Monstrosity** | Magical beasts with supernatural abilities | Chimera, Hydra, Griffin, Magical Beast |
| **Ooze** | Amorphous creatures, typically mindless and corrosive | — |
| **Plant** | Animate vegetation and fungal creatures | Treant, Myconid, Vine Creature |
| **Spirit** | Extraplanar beings manifesting cosmic forces | Celestial, Primordial, Infernal |
| **Undead** | Beings that died and returned through necromancy | Physical, Ethereal |

## Size Modifiers

| Size | Modifier | Special Rules |
|------|----------|---------------|
| Tiny | -2 | Dodge focus, stealth bonuses |
| Small | -1 | Agility advantages |
| Medium | +0 | Standard rules |
| Large | +1 | Strength focus, harder to hit with ranged |
| Huge | +2 | Area control |
| Gargantuan | +3 | Fills entire area |
| Colossal | +4 | Fills multiple areas |

**Gargantuan/Colossal combat rules:**
- Creatures can't enter their areas without special means
- Adjacent areas count as close range
- Can be attacked from multiple directions

Size effects on stats: larger → AV +1 tier, Parry +1–2 tiers, Dodge −1–2 tiers. Smaller → AV −1 tier, Dodge +1–2 tiers, Parry −1–2 tiers.

## Immunity Sets by Type

- **Undead**: bleeding, charmed, confused, deafened, frightened, poisoned, unconscious
- **Automatons**: bleeding, charmed, confused, frightened, poisoned, unconscious
- **Spirits (Primordial)**: varies by type (fire spirits immune to fire, etc.)
- **Plants**: deafened, blinded (for some)

**Resistances** = half damage from type. **Weaknesses** = double damage from type.
Damage types: physical, fire, frost, lightning, acid, poison, necrotic, radiant, psychic, blast.

## Weapon Properties (common)

| Property | Effect |
|----------|--------|
| **agile** | Roll attacks with Agility instead of Strength (Agility also becomes base damage) |
| **crush** | Ignore ½ of enemy's AV (rounded up); from multiple sources, ignore all AV |
| **pierce** | On a failed attack roll, re-roll once between your turns |
| **slash** | On a hit vs. light or no armor, add weapon damage an additional time |
| **reach** | Attack at close range; +1 bane while any enemy is in your melee range |
| **light** | Can be dual-wielded |
| **two-handed** | Requires both hands; one-handed attacks suffer +2 banes |

**Canonical list — always verify against `docs/04-equipment/05-armor-weapon-properties.md` before using a property.**

## Conditions & Durations

Use only official conditions (`docs/05-combat/04-conditions.md`) and durations (`docs/06-scenes/02-effect-durations.md`): briefly, short, medium, long, very long. Complete condition list and duration definitions: [../../game-basics.md](../../game-basics.md#canonical-keyword-sources).

## Defensive Ability Categories

Every Elite/Lord needs at least one, matched to fighting style:

| Category | Fits | Example |
|----------|------|---------|
| **Blocking** | Heavily armored, guardians | "Iron Will" — reduce incoming damage by 2 when using a shield |
| **Redirecting** | Skilled warriors, weapon masters | Parry and riposte, damage reflection |
| **Evading** | Agile creatures, assassins, ethereal | "Shadow Step" — Quick Action teleport to avoid attack |
| **Absorbing** | Undead, constructs, magical beings | Damage conversion, healing on hit, temp HP |
| **Negating** | Magical/divine beings | Condition immunity, spell resistance |
| **Environmental** | Elementals, druids | Terrain manipulation for protection, concealment |

## Validation Checklist

### Mechanical
- [ ] HP appropriate for tier; format matches category (`40` / `2×40` / `3×40`)
- [ ] AV follows tier and creature type (bone/stone → heavy)
- [ ] Defenses average 6 + tier; Resist ≤ 6 + tier + 2
- [ ] Damage = base + 1×/2×/3× weapon damage
- [ ] Ability TNs = 6 + tier
- [ ] Skill ranks match tier table
- [ ] Attack count fits category (Basic 1–2, Elite 2–3, Lord 3–5)
- [ ] Ability count fits category (Basic 1–3, Elite 2–4, Lord 3–6)
- [ ] Elite: Elite Trigger + ≥1 Quick Action ability
- [ ] Lord: ≥2 Lord Triggers + ≥1 reactive AND ≥1 proactive Quick Action
- [ ] Elite/Lord: ≥1 defensive ability fitting fighting style
- [ ] All conditions/spells referenced exist in Nexus RPG rules
- [ ] Spell ranks ≤ creature's Arcana/Mysticism skill rank; correct attribute pairing
- [ ] Tier adjustments balanced (one down ↔ one up)
- [ ] No "Special Rules"/"Combat Notes" sections (category rules are automatic)

### Thematic
- [ ] Abilities reflect creature nature and role
- [ ] Stats support intended combat behavior
- [ ] Fits sword & sorcery ancient-world aesthetic
- [ ] Immunities/resistances make thematic sense

### Balance
- [ ] Single creature ≈ one same-level adventurer
- [ ] Triggers meaningful but not overwhelming; Lord triggers create combat phases
- [ ] Not trivially defeated by common tactics; no auto-win abilities
- [ ] Power consistent within tier

## Worked Example

### **Sand Viper Elite** (Medium Beast)

**Tier:** 4 (Elite)

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| 2×40 | 4 | d8 | d10 | d8 | d6 | 10 | 12 | 8 |

**Skills:** Fighting (2), Stealth (3), Athletics (3)

**Attacks:**

- **Venomous Bite** (*pierce*). 5/7/9 damage (base 5 + weapon 2). Target makes Spirit + Fortitude vs TN 10 or becomes poisoned for a short duration.

**Abilities:**

- **Elite Trigger — Desert Fury.** When the first life pool is depleted, the Sand Viper's rage awakens. Its Agility increases to d12 and it gains +2 weapon damage for the remainder of the scene.
- **Sand Camouflage.** While in sandy terrain, gains +2 boons on Stealth rolls and can move through sand as if it were water.
- **Serpentine Dodge (Quick Action, Reactive).** When targeted by an attack, roll Agility + Athletics vs. TN 10. On a success, gain +2 Dodge against the triggering attack; strong success +4; critical +6 and move to an adjacent area without provoking attacks.
