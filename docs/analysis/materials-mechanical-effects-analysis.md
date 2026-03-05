# Special Materials — Mechanical Effects Analysis

> **Scope:** Propose concrete mechanical effects for all Greater (Q5–Q6) and Legendary (Q7–Q8) special materials that currently lack them. Exotic (Q3–Q4) materials are included as reference only — their existing effects are already final.
>
> **Prerequisite:** [Enchantments & Magic Items — Design Analysis](./enchantments-magic-items-analysis.md). This document picks up the deferred material-properties task from that analysis.
>
> **Source caveat:** The Nexus RPG Vault was unavailable during drafting. All proposals are based on the in-game flavor text. Vault lore supersedes if conflicts arise.

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
| **Greater (Q5–Q6)** | One strong passive OR one reactive 1/scene with broader scope | 1/scene (broad) or 1/day (powerful) | — |
| **Legendary (Q7–Q8)** | Two passives OR one passive + one reactive, with expanded scope | 1/scene + extra passive, or 1/day (potent) | — |

### 1.3 Item-Type Differentiation

Every material must specify effects per item type where applicable:

- **Weapon** (includes Ammo where noted)
- **Light Armor**
- **Heavy Armor**
- **Shield**
- **Spell Catalyst**
- **Wearable**
- **Any** (applies to all types)

If a material doesn't suit a particular item type, that type is omitted.

### 1.4 Talent Harmony Rules

1. Materials grant **item bonuses** or **unnamed effects** — these stack with ability bonuses from talents.
2. Materials must not replicate a talent's signature ability (e.g., granting crush via talent should remain distinct from crush via material by operating at different scopes).
3. Where overlap is unavoidable, the material effect should be **weaker than** or **complementary to** the talent, never a replacement.

---

## 2. Existing Materials Reference

### 2.1 Exotic Materials (Q3–Q4) — Current Effects

These are final and included for comparison only.

| # | Material | Key Effects | Effect Category |
|---|----------|-------------|-----------------|
| 1 | Chitin | Armor/Shield: -1 load | Weight |
| 2 | Iron | Weapon: +1 boon vs. spirits; Armor/Shield: +1 bane on Mysticism | Creature-specific / Anti-magic |
| 3 | Monster Bone | Weapon/Armor/Shield: -1 load | Weight |
| 4 | Monster Scales | Armor/Shield: 1/scene physical resistance | Defense |
| 5 | Giant Spider Silk | Light Armor: -1 load | Weight |
| 6 | Silverroot | Weapon/Ammo: +1 boon vs. lycanthropes and undead | Creature-specific |
| 7 | Runebark | Armor/Shield: 1/scene spell-damage resistance | Defense |
| 8 | Dwarf-Steel | Any: 1/day re-roll Durability; Heavy Armor: ignore extreme climate | Durability / Utility |
| 9 | Darkwood | Weapon/Shield/Ammo: -1 load | Weight |
| 10 | Wyrmhide | Armor/Shield: 1/scene elemental resistance (single source) | Defense |

### 2.2 Effect Patterns Established

| Pattern | Examples | Available at |
|---------|----------|-------------|
| Load reduction | Chitin, Monster Bone, Darkwood | Q3–Q4 |
| 1/scene single-damage resistance | Monster Scales, Runebark, Wyrmhide | Q3–Q4 |
| Creature-type boon | Iron, Silverroot | Q3–Q4 |
| Durability benefit | Dwarf-Steel | Q3–Q4 |
| Environmental protection | Dwarf-Steel | Q3–Q4 |
| Rigid reduction | Mithril | Q5–Q6 |
| Anti-magic penalty | Iron | Q3–Q4 |

---

## 3. Greater Materials (Q5–Q6) — Proposed Effects

Each entry includes the proposed mechanical text (formatted for direct insertion into `materials.md`) and a design note explaining the rationale.

### 3.1 Meteorite

> *Blue-silver metal found in fallen stars. Imbued with natural magical energy. Some cultures revere or fear it due to its otherworldly origin.*

**Proposed effects:**

Weapon/Ammo: Damage from this weapon ignores resistance granted by spells or magical effects (innate creature resistances still apply).<br/>
Armor/Shield: Once per day, when you are targeted by a spell, the caster suffers +1 bane on their casting roll against you.<br/>
Spell Catalyst: Once per day, when you roll a blunder on a spell casting roll, you can treat it as a normal failure instead.

**Design notes:**
- **Identity:** Anti-magic / spell disruption. Meteorite disrupts the magical field around it.
- **Weapon effect** is passive and distinct from any enchantment (no enchantment bypasses magical resistances).
- **Armor/Shield effect** is reactive (1/day, triggered by enemy action), not active.
- **Catalyst effect** prevents the worst-case casting outcome (mishap/penance) — high-value but 1/day.
- **Talent check:** No overlap with any talent. Complements Battle Mage (who benefits from safer casting) without replicating Disciplined Fighter's re-roll.

---

### 3.2 Treantwood

> *Harvested from awakened trees. Tough and slightly regenerative, reacts to magic.*

**Proposed effects:**

Any: Once per scene, you can ignore a failed Durability check for this item.<br/>
Armor/Shield: During a short break, you regain +2 additional HP while this item is equipped.<br/>
Weapon/Spell Catalyst: This item automatically removes the damaged property from itself after a night's rest.

**Design notes:**
- **Identity:** Organic regeneration. The living wood heals itself and its bearer.
- **Durability effect** directly upgrades Dwarf-Steel's 1/day re-roll (ignoring a failure is strictly better, justified by higher tier).
- **Armor +2 HP during short break** is a modest healing boost that doesn't compete with Second Wind (combat Quick Action) or any healing enchantment (none exist on armor). It rewards rest, fitting the regenerative theme.
- **Self-repair** is a passive durability benefit — thematic for living wood that slowly regrows.
- **Talent check:** Second Wind (Fortitude) is an in-combat Quick Action; Treantwood's healing is during rests. No conflict.

---

### 3.3 Dragon Bone

> *Bones from dragons carry elemental properties tied to their nature. Very strong and magically reactive. Used in powerful weapons or armor.*

**Proposed effects:**

Choose fire, frost, lightning, or acid when this item is crafted.<br/>
Weapon/Ammo: Your attacks with this weapon deal the chosen damage type instead of physical damage.<br/>
Armor/Shield: You gain resistance against the chosen damage type.

**Design notes:**
- **Identity:** Elemental attunement. The dragon's elemental nature persists in its bones.
- **Weapon damage-type conversion** is passive and unique — no enchantment changes base damage type. Enchantments (Flaming, Sacred, etc.) *add* elemental damage via Quick Action; Dragon Bone *replaces* the base type passively. These combine well: a Flaming Dragon Bone (fire) sword deals all fire damage.
- **Armor/Shield resistance** is permanent (single type), stronger than Wyrmhide (1/scene, any elemental). Appropriate for Q5–Q6 because it's locked to one element chosen at crafting.
- **Talent check:** No talent grants permanent elemental resistance or damage-type conversion.
- **Enchantment check:** of Resistance (wearable) grants the same effect but in a different equipment slot.

---

### 3.4 Dragon Scales

> *Large scales from dragons. Extremely durable and elementally attuned.*

**Proposed effects:**

Choose fire, frost, lightning, or acid when this item is crafted.<br/>
Armor: -1 load (min. 0). You gain resistance against the chosen damage type.<br/>
Shield: You gain resistance against the chosen damage type.

**Design notes:**
- **Identity:** Defensive elemental plating. Scales are armor-focused where Bone is weapon-focused.
- **Differentiator from Dragon Bone:** Scales add -1 load on armor (the natural scale structure is lighter than solid bone), making them the defensive counterpart.
- **No weapon effect** — scales are primarily defensive materials in the fiction. If a weapon is needed, use Dragon Bone instead.
- **Talent check:** No overlap. -1 load doesn't replicate any talent.
- **Enchantment check:** Distinct from Tough enchantment (which is a reactive 1/day choice, not permanent resistance).

---

### 3.5 Deep Iron

> *Heavy ore from deep underground. Strong against both physical and magical attacks.*

**Proposed effects:**

Weapon: Attacks with this weapon gain the crush property. If the weapon already has crush, instead ignore all of the target's AV on a hit (rather than half).<br/>
Heavy Armor/Shield: Once per scene, when you take damage from any source, you can gain resistance against that damage.

**Design notes:**
- **Identity:** Raw armor-piercing weight (weapon) and impenetrable density (armor/shield).
- **Weapon crush grant** is a new pattern — no other material adds a weapon property. This creates a meaningful choice: Deep Iron makes any weapon better against armored foes. The crush upgrade (full AV ignore) is powerful but requires already having crush.
- **Armor/shield 1/scene resistance** upgrades the Exotic-tier pattern (Monster Scales = physical only, Runebark = spell only). Deep Iron covers *any* damage source, appropriate for Q5–Q6 "strong against physical and magical."
- **Heavy Armor only** — Deep Iron is too dense for light armor.
- **Talent check:** Mace Mastery R3 lets you ignore AV entirely (Quick Action, once per turn). Deep Iron's crush upgrade is passive but requires the weapon to already have crush. These complement — Mace Mastery is broader but resource-costed, Deep Iron is narrower but free.
- **Enchantment check:** Tough enchantment uses X/day; Deep Iron uses 1/scene. Different resource model, different item slot (material vs. enchantment on same item).

---

### 3.6 Phantom-Silk

> *Made from spectral spider silk. Very light, hard to detect, and partially intangible.*

**Proposed effects:**

Light Armor: -1 load (min. 0). This armor is translucent and nearly invisible while worn, allowing it to be concealed under normal clothing without detection.<br/>
Wearable: -1 load (min. 0). Once per scene, when you are hit by an attack, you can force the attacker to re-roll their attack and use the lower result.

**Design notes:**
- **Identity:** Ghostly concealment and partial incorporeality.
- **Invisible armor** is a unique utility benefit — no enchantment or talent does this. It enables social infiltration and undercover scenarios without sacrificing protection.
- **Wearable re-roll** represents the silk's intangible nature causing attacks to partially phase through. It's reactive (triggered by enemy hit, 1/scene), not active.
- **No heavy armor** — spectral silk doesn't suit heavy plate.
- **Talent check:** Light Armor Mastery R1 (free Evade 1/scene) is mechanically different — Evade forces the attacker to target Dodge, while re-roll simply makes them re-roll. These stack naturally if both trigger on the same attack.

---

### 3.7 Mithril

> *Already has effects.* Armor/Shield: -1 load (min. 0). Reduce the item's rigid property by 1 (min. 0).

No changes needed.

---

### 3.8 Solarite

> *Red-gold crystal found on celestial mountain peaks. Mixed with bronze in a ritual to create a glowing, heat-reactive alloy. Generates intense heat when moved quickly.*

**Proposed effects:**

Weapon/Ammo: Your attacks with this weapon deal fire damage instead of physical damage. This weapon sheds dim light in melee range while wielded.<br/>
Armor/Shield: You gain resistance against fire damage. You are immune to the burning condition.<br/>
Spell Catalyst: Your spells that deal fire damage ignore the target's resistance to fire damage.

**Design notes:**
- **Identity:** Solar fire specialization. Where Dragon Bone lets you *choose* an element, Solarite is locked to fire but provides *deeper* fire synergy.
- **Weapon fire conversion** with built-in light emission — thematic for a heat-reactive alloy that glows when moved.
- **Burning immunity** on armor is a unique defensive passive not found on any enchantment. It specifically counters fire-based monsters and traps.
- **Catalyst fire-resistance bypass** rewards fire-focused casters against resistant targets. No enchantment does this.
- **Talent check:** No talent grants burning immunity or fire resistance bypass.
- **Enchantment check:** Flaming enchantment *adds* fire damage via Quick Action; Solarite *converts* base damage to fire passively. Distinct activation and effect.

---

### 3.9 Lunarite

> *Deep blue crystal found in underworld caverns. Absorbs magical energy. Used in armor to resist spells or in restraints to suppress magic.*

**Proposed effects:**

Weapon/Ammo: Creatures hit by this weapon suffer +1 bane on their next spell casting roll or concentration check. This effect can only trigger once per turn.<br/>
Armor/Shield: Once per scene, when you are targeted by a spell, you can add your worn armor's AV bonus to your Resist against that spell. If you don't wear armor, add +2 to your Resist instead.<br/>
Spell Catalyst: Creatures within close range of you suffer +1 bane on concentration checks to maintain spells.

**Design notes:**
- **Identity:** Magic suppression and absorption. Lunarite is the anti-caster material.
- **Weapon anti-casting** is passive (triggers on hit, 1/turn cap) and distinct from any enchantment. It creates a tactical role: melee fighters with Lunarite weapons become spell-disruptors.
- **AV-to-Resist conversion** is a completely new mechanic. It rewards heavy armor users against spells (thematic: thick Lunarite armor absorbs more magic) without granting a flat Resist bonus (which would overlap with of Willpower).
- **Catalyst concentration disruption** is a passive aura — no enchantment provides anti-magic auras.
- **Talent check:** No talent disrupts enemy spellcasting passively. Strong Mind (Fortitude) protects the user's own mind; Lunarite suppresses *enemy* casting. Complementary.

---

### 3.10 Adamantite

> *Extremely hard and dense metal. Almost impossible to break or bend.*

**Proposed effects:**

Any: This item is indestructible. Failed Durability checks have no effect on it.<br/>
Weapon: When you attack an object, structure, or construct, ignore its AV entirely.

**Design notes:**
- **Identity:** Absolute physical permanence. Adamantite doesn't break and breaks everything else.
- **Indestructibility** is passive and unique — no enchantment or material grants this. It eliminates durability management entirely for the item, which is a significant practical benefit (especially for shields that roll Durability frequently).
- **Anti-object AV bypass** is situational (objects/structures/constructs only) but very impactful when it matters — breaching doors, destroying constructs, sundering enemy equipment.
- **No combat damage bonus** — Adamantite's hardness is about not breaking, not hitting harder against creatures.
- **Talent check:** No talent grants item indestructibility. Shield Mastery R3 gives +1 boon on Durability re-rolls — irrelevant when the item can't fail Durability at all (complementary: frees the shield user from worrying about durability).
- **Enchantment check:** No enchantment grants indestructibility or anti-object AV bypass.

---

## 4. Legendary Materials (Q7–Q8) — Proposed Effects

Legendary materials provide two or more distinct benefits per item type, reflecting their artifact-tier rarity.

### 4.1 Orichalcum

> *Light-blue metal that is nearly weightless. Enchanted during forging to retain high flexibility and hardness. Very rare and extremely valuable.*

**Proposed effects:**

Any: -2 load (min. 0).<br/>
Weapon: This weapon's heavy property is removed. If it has no heavy property, you instead gain +1 boon on attacks with this weapon once per turn.<br/>
Armor: Reduce the rigid property by 2 (min. 0). Reduce the heavy property requirement by one die size (e.g., heavy (d8) becomes heavy (d6), and heavy (d6) is removed).<br/>
Shield: Reduce the rigid property by 2 (min. 0).

**Design notes:**
- **Identity:** Ultimate weight reduction. The definitive upgrade over Mithril (-1 load, -1 rigid at Q5–Q6).
- **-2 load** is unprecedented and meaningful — a plate harness (load 4) becomes load 2.
- **Weapon heavy removal** makes greataxes and mauls viable for low-Strength characters; the alternative +1 boon for non-heavy weapons is still valuable.
- **Armor rigid -2 and heavy reduction** enables heavy armor to feel like light armor mobility-wise, which is appropriate for Q7–Q8 pricing.
- **Talent check:** Heavy Armor Mastery R1 reduces rigid by 1; Orichalcum reduces by 2. These stack to -3 rigid total, making even plate harness (rigid 3) completely mobile. This is powerful but appropriate for the investment (Q7–Q8 material + talent ranks).

---

### 4.2 Celestial Feathers

> *Fallen feathers from divine beings. Extremely light and retains limited flight or levitation properties.*

**Proposed effects:**

Any: -1 load (min. 0). You don't take damage from falling, regardless of distance.<br/>
Light Armor/Wearable: Additionally, once per day, you can fly up to a short distance as part of your Movement. This flight lasts until the end of your turn.<br/>
Shield: Additionally, allies within melee range of you also don't take damage from falling.

**Design notes:**
- **Identity:** Divine lightness and flight. The only material in the game that grants flight.
- **No fall damage** is passive and unique. It opens vertical exploration without trivializing it (you can survive falls but can't fly continuously).
- **1/day flight** is a reactive utility — short distance, end-of-turn duration. Enough to cross a gap or reach a ledge, not enough to bypass encounters.
- **Shield ally protection** extends the fall-safety aura — thematic for divine protection.
- **Talent check:** Athletic Movement R3 treats falls as one category lower; Celestial Feathers eliminates fall damage entirely. Stronger but at Q7–Q8 cost.

---

### 4.3 Elder Dragon Bone

> *Fossilized remains of ancient dragons. Incredibly strong and still radiates elemental energy.*

**Proposed effects:**

Choose fire, frost, lightning, or acid when this item is crafted.<br/>
Weapon/Ammo: Your attacks with this weapon deal the chosen damage type instead of physical damage. On a critical hit, the target also suffers the associated condition for a short duration — burning (4) for fire, slowed for frost, stunned (briefly) for lightning, or bleeding (4) for acid.<br/>
Armor/Shield: You gain resistance against two chosen damage types (from fire, frost, lightning, and acid).<br/>
Spell Catalyst: Spells you cast that deal the chosen damage type ignore the target's resistance to that damage type.

**Design notes:**
- **Identity:** Stronger Dragon Bone. Fossils contain concentrated elemental energy from ancient dragons.
- **Weapon** adds a condition trigger on critical hit (passive, no resource cost, but only on criticals). This upgrades Dragon Bone (damage-type change only) with a meaningful but unreliable bonus.
- **Armor/Shield dual resistance** upgrades Dragon Bone's single-element resistance. Two types from four is a meaningful Q7–Q8 power increase.
- **Catalyst resistance bypass** for the chosen element rewards specialized casters. No enchantment provides this.
- **Talent check:** No talent grants elemental conditions on critical hits. Axe Mastery R2 inflicts bleeding on strong/critical — different trigger scope and weapon type.

---

### 4.4 Elder Dragon Scales

> *Rare, hardened scales from elder dragons. Strongly resistant to most elemental forces.*

**Proposed effects:**

Armor: -1 load (min. 0). You gain resistance against fire, frost, lightning, and acid damage.<br/>
Shield: You gain resistance against fire, frost, lightning, and acid damage.

**Design notes:**
- **Identity:** Ultimate elemental defense. The definitive upgrade from Dragon Scales (one element) to all four.
- **All-elemental resistance** is powerful but purely defensive and appropriate for Q7–Q8. It protects against the four most common magical damage types while leaving necrotic, psychic, radiant, poison, and blast uncovered.
- **Armor load reduction** continues the Dragon Scales pattern of scales being lighter than solid materials.
- **Talent check:** No talent grants broad elemental resistance. Body of Bronze R3 grants physical resistance while unarmored — different scope and condition.
- **Enchantment check:** of Resistance (wearable) grants one damage type. Elder Dragon Scales cover four types but only on armor/shields.

---

### 4.5 Aegium

> *White-gold metal from the High Realms. Said to be used by divine beings. Very durable and carries innate divine magic.*

**Proposed effects:**

Weapon/Ammo: Your attacks with this weapon deal radiant damage instead of physical damage. Undead and Spirit (Infernal) creatures hit by this weapon can't use regeneration or healing abilities until the end of their next turn.<br/>
Armor/Shield: You gain resistance against necrotic and radiant damage. Once per day, when damage would reduce you to 0 HP, you are reduced to 1 HP instead.<br/>
Spell Catalyst: Mystic spells you cast that restore HP restore +2 additional HP.

**Design notes:**
- **Identity:** Divine metal. Anti-evil, life-preserving, holy.
- **Weapon radiant conversion + anti-regeneration** makes this the ultimate anti-undead weapon. The regeneration suppression is passive and unique — no enchantment does this.
- **Armor 1/day death prevention** is a powerful reactive effect appropriate for divine Q7–Q8 metal. It's strictly reactive (triggered by lethal damage) and 1/day.
- **Catalyst +2 HP healing** is a modest passive bonus for mystic healers. No enchantment boosts healing output directly.
- **Talent check:** Hard to Kill R2 (ignore one Wound/day) operates at the Wound level, not HP level. These are complementary — Aegium prevents reaching 0 HP, Hard to Kill survives the Wound after. Both can be useful in the same combat but protect against different failure points.

---

### 4.6 Eternite

> *Ocean-blue crystal, most rare of the three celestial materials. Shaped into dark-blue metal with star-like patterns inside. Highly magical and used for powerful artifacts.*

**Proposed effects:**

Weapon: Your attacks with this weapon deal your choice of radiant or psychic damage (chosen per attack) instead of physical damage.<br/>
Armor/Shield: You gain resistance against psychic damage. Once per day, when you fail a roll to resist a magical effect, you can re-roll it.<br/>
Spell Catalyst: Reduce the Focus cost of all spells you cast using this catalyst by 1 (minimum 0).

**Design notes:**
- **Identity:** Pure magical potency. The ultimate spellcaster material.
- **Weapon dual-type choice** provides tactical flexibility — choose radiant vs. undead, psychic vs. armored foes. No enchantment offers per-attack damage type selection.
- **Armor re-roll vs. magic** is a 1/day reactive defense against magical effects (charms, curses, etc.). Distinct from Strong Mind R1 (re-roll vs. mind effects 1/scene) — Eternite covers *all* magical effects, not just mental ones, but is 1/day instead of 1/scene.
- **Catalyst Focus reduction** is the signature effect — rank 0 spells become truly free, rank 1 spells cost 1 instead of 2, etc. No enchantment reduces Focus costs (Infused *recovers* Focus, Storing lets you *skip* Focus for one spell/day). This is a distinct and powerful passive for Q7–Q8.
- **Talent check:** Inexhaustible Mind (Arcana) provides Focus recovery on natural rolls; Eternite reduces costs. These synergize without overlapping.

---

### 4.7 Elderwood

> *Wood from ancient magical trees. Exceptionally strong and responds to magical input.*

**Proposed effects:**

Any: -1 load (min. 0). This item automatically removes the damaged property from itself at the end of each scene.<br/>
Armor: Additionally, reduce the rigid property by 1 (min. 0).<br/>
Spell Catalyst: Additionally, once per scene, you can add +1 boon to a spell casting roll when using this catalyst.

**Design notes:**
- **Identity:** Living ancient wood — self-repairing, magically responsive, light.
- **Auto-repair per scene** is a powerful passive durability benefit, upgrading Treantwood's night-rest self-repair to scene-level frequency. Appropriate for Q7–Q8.
- **Armor rigid reduction** reflects the wood's flexibility. Stacks with Mithril-style benefits if combined (though you can't combine two materials).
- **Catalyst +1 boon** (1/scene) is a reliable casting boost. No enchantment provides a boon on casting rolls (Stabilizing provides re-rolls, which is different).
- **Talent check:** No talent grants casting boons from equipment. Disciplined Archer and Disciplined Fighter grant re-rolls; a boon is mechanically distinct.

---

### 4.8 Dreamweave

> *Fabric spun from magical dreams. Shifts in form slightly and resists mental or illusion magic.*

**Proposed effects:**

Light Armor/Wearable: You gain resistance against psychic damage. You gain +1 boon on all rolls to resist charm, fear, confusion, and illusion effects.<br/>
Shield: You gain +1 boon on all rolls to resist charm, fear, confusion, and illusion effects. Once per day, when you fail such a roll, you can choose to succeed instead.

**Design notes:**
- **Identity:** Dream protection. Mental resilience against illusion and psychic assault.
- **Psychic resistance** is permanent and appropriate for Q7–Q8 dream-material. The only other source of psychic resistance is Strong Mind R3 (a Rank 3 talent) or of Resistance (wearable enchantment, single type). These operate in different equipment slots.
- **+1 boon on mental saves** is passive and broad — covers four effect categories. This is additive with Strong Mind R1 (re-roll 1/scene) and of Pure Thought (immunity to specific effects). The boon makes resistance more reliable without granting immunity.
- **Shield 1/day auto-succeed** is a powerful reactive failsafe for the worst mental effects. Limited to 1/day and only on failed rolls.
- **Talent check:** Strong Mind R1 (re-roll) + Dreamweave (+1 boon) = very reliable mental defense. This is intentional synergy, not overlap — the talent provides a re-roll, the material makes the roll better.

---

### 4.9 Titanium

> *Magenta metal with glowing edges. Found where magical rifts meet the Lower Realms. Naturally resists impact and holds an ambient magical aura.*

**Proposed effects:**

Any: +1 boon on all Durability checks for this item.<br/>
Weapon: This weapon emits dim light in melee range. Damage from this weapon bypasses resistance granted by spells or magical effects (innate creature resistances still apply).<br/>
Heavy Armor/Shield: Once per scene, when you take damage from any source, you can gain resistance against that damage. You are unaffected by extreme temperatures (no rolls required for extreme heat or cold during travel or exploration).

**Design notes:**
- **Identity:** Rift-forged impact resistance with ambient magic. Titanium is the Legendary upgrade of both Deep Iron (defense) and Meteorite (anti-magic).
- **Durability boon** reflects the metal's impact resistance — simple, passive, always useful.
- **Weapon magic-resistance bypass** upgrades Meteorite's weapon effect at higher tier. Both pierce magical protections, which is thematically consistent for rift-metal.
- **Armor/Shield 1/scene resistance** matches Deep Iron's effect (appropriate — same defensive niche, higher tier also grants environmental protection).
- **Temperature immunity** is a passive utility bonus — upgrades Dwarf-Steel (which only covers one extreme on heavy armor) to cover both extremes on any applicable item type.
- **Talent check:** Explorer's Tenacity (Fortitude) covers environmental hazards via re-rolls; Titanium removes the roll entirely for temperature. These complement — Titanium handles temperature while Explorer's Tenacity covers other hazards.

---

### 4.10 Infernal Horn

> *Taken from powerful infernal beasts. Resistant to heat and can channel demonic energy.*

**Proposed effects:**

Weapon/Ammo: Your attacks with this weapon deal fire damage instead of physical damage. Once per day, on a critical hit, the target is frightened of you for a short duration (no save).<br/>
Armor/Shield: You gain resistance against fire and necrotic damage.<br/>
Spell Catalyst: Once per day, when you cast a spell that deals damage, you can change its damage type to fire or necrotic.

**Design notes:**
- **Identity:** Infernal power. Fire, fear, and dark energy.
- **Weapon fire conversion + fear on crit** combines an elemental passive with a fear trigger. The fear is auto-applied (no save) but limited to 1/day and only on critical hits — powerful but very unreliable.
- **Dual resistance** (fire + necrotic) reflects the horn's infernal and death-related nature. A meaningful Q7–Q8 defensive package.
- **Catalyst damage-type conversion** (1/day) lets spellcasters adapt a spell's element situationally. This is unique — no enchantment changes spell damage types.
- **Talent check:** No talent inflicts frightened on weapon critical hits. Drunken Technique R1 redirects attacks; Infernal Horn causes fear. Distinct.

---

## 5. Summary Tables

### 5.1 Greater Materials (Q5–Q6) — Effect Overview

| # | Material | Weapon | Armor | Shield | Catalyst | Special |
|---|----------|--------|-------|--------|----------|---------|
| 1 | Meteorite | Bypass magical resistance | 1/day bane on enemy casting | — | 1/day blunder → failure | Anti-magic |
| 2 | Treantwood | Self-repair (night) | +2 HP on short break | +2 HP on short break | Self-repair (night) | 1/scene ignore Durability failure |
| 3 | Dragon Bone | Elemental damage type | Elemental resistance (1) | Elemental resistance (1) | — | Choose element at crafting |
| 4 | Dragon Scales | — | -1 load + elemental resist (1) | Elemental resistance (1) | — | Choose element at crafting |
| 5 | Deep Iron | Gain crush (or upgrade) | 1/scene any resistance | 1/scene any resistance | — | Heavy armor only |
| 6 | Phantom-Silk | — | Invisible (concealable) | — | — | Wearable: 1/scene force re-roll |
| 7 | Mithril | — | -1 load, -1 rigid | -1 load, -1 rigid | — | Already defined |
| 8 | Solarite | Fire damage + dim light | Fire resist + burning immune | Fire resist + burning immune | Fire spells bypass resist | Fire specialist |
| 9 | Lunarite | +1 bane on target casting | 1/scene AV → Resist | 1/scene AV → Resist | Aura: bane on concentration | Anti-caster |
| 10 | Adamantite | Ignore AV vs. objects | — | — | — | Indestructible (any) |

### 5.2 Legendary Materials (Q7–Q8) — Effect Overview

| # | Material | Weapon | Armor | Shield | Catalyst | Special |
|---|----------|--------|-------|--------|----------|---------|
| 1 | Orichalcum | Remove heavy (or +1 boon) | -2 rigid, reduce heavy | -2 rigid | — | -2 load (any) |
| 2 | Celestial Feathers | — | 1/day fly (light) | Allies no fall dmg | — | No fall damage (any) |
| 3 | Elder Dragon Bone | Element dmg + crit condition | Elemental resist (2) | Elemental resist (2) | Element resist bypass | Choose element |
| 4 | Elder Dragon Scales | — | -1 load + all 4 resists | All 4 elemental resists | — | Ultimate elemental defense |
| 5 | Aegium | Radiant dmg + anti-regen | Necrotic/radiant resist, 1/day survive death | Necrotic/radiant resist, 1/day survive death | +2 healing HP | Divine |
| 6 | Eternite | Radiant or psychic choice | Psychic resist, 1/day magic re-roll | Psychic resist, 1/day magic re-roll | -1 Focus cost | Ultimate magic |
| 7 | Elderwood | — | -1 rigid | — | 1/scene +1 boon casting | -1 load, auto-repair (any) |
| 8 | Dreamweave | — | Psychic resist + mental boon | Mental boon + 1/day auto-succeed | — | Dream defense |
| 9 | Titanium | Light + magic resist bypass | 1/scene any resist + temp immune | 1/scene any resist + temp immune | — | +1 boon Durability (any) |
| 10 | Infernal Horn | Fire dmg + 1/day fear on crit | Fire + necrotic resist | Fire + necrotic resist | 1/day change dmg type | Infernal |

### 5.3 Effect Category Distribution

| Category | Exotic (Q3–Q4) | Greater (Q5–Q6) | Legendary (Q7–Q8) |
|----------|----------------|------------------|---------------------|
| Weight / Load | 5 | 2 | 4 |
| Durability | 1 | 3 | 2 |
| Damage Type | 0 | 4 | 5 |
| Resistance (permanent) | 0 | 5 | 8 |
| Resistance (reactive) | 3 | 2 | 2 |
| Creature-Specific | 2 | 1 | 2 |
| Anti-Magic | 1 | 4 | 2 |
| Environmental | 1 | 1 | 2 |
| Weapon Property | 0 | 1 | 1 |
| Condition Trigger | 0 | 1 | 2 |
| Healing / Survival | 0 | 1 | 2 |
| Casting Benefit | 0 | 2 | 2 |

---

## Appendix A: Talent Synergy Audit

### Confirmed Synergies (Material + Talent)

| Material | Talent | Interaction |
|----------|--------|-------------|
| Deep Iron (crush) | Mace Mastery R3 (ignore AV) | Mace Mastery adds on-demand AV ignore; Deep Iron provides passive crush. Different scopes. |
| Orichalcum (-2 rigid) | Heavy Armor Mastery R1 (-1 rigid) | Stack to -3 rigid. Plate harness becomes rigid 0. Powerful but requires Q7+ and talent. |
| Celestial Feathers (no fall) | Athletic Movement R3 (falls -1 step) | Feathers fully supersede. Talent still useful if feathers are lost/unequipped. |
| Aegium (survive at 1 HP) | Hard to Kill R2 (ignore Wound) | Different failure points. Aegium prevents 0 HP; Hard to Kill prevents Wound. Both useful. |
| Eternite (-1 Focus) | Inexhaustible Mind (Focus recovery) | Cost reduction + recovery = sustained casting. Strong synergy, no overlap. |
| Dreamweave (+1 boon mental) | Strong Mind R1 (re-roll mental) | Boon improves roll quality; re-roll provides second chance. Additive, not redundant. |
| Adamantite (indestructible) | Shield Mastery R3 (Durability boon) | Shield Mastery becomes irrelevant for Durability. Talent still useful for SL reduction. |
| Treantwood (+2 HP rest) | Second Wind (in-combat HP) | Different timing. Rest vs. combat. Fully complementary. |
| Lunarite (AV → Resist) | Heavy Armor Mastery R2 (double AV) | AV → Resist uses base AV; HAM doubles AV for damage. Different defensive layers. |
| Titanium (temp immune) | Explorer's Tenacity (environmental re-roll) | Titanium removes temperature rolls; Tenacity covers other hazards. Complementary. |

### Anti-Synergies Identified

None. All material effects operate in different mechanical spaces from existing talents.

---

## Appendix B: Enchantment Overlap Audit

| Material Effect | Closest Enchantment | Distinction |
|----------------|---------------------|-------------|
| Dragon Bone damage-type change | Flaming / Sacred / Defiled | Material *changes* base type passively; enchantment *adds* extra damage via Quick Action |
| Deep Iron 1/scene resistance | Tough (X/day resistance) | Different resource model (scene vs. day); can coexist on same item |
| Dragon Scales / Bone resistance | of Resistance (wearable) | Different equipment slot; material is on armor, enchantment is on wearable |
| Solarite fire-resist bypass | No equivalent | Unique |
| Lunarite bane on casting | No equivalent | Unique |
| Lunarite AV → Resist | No equivalent | Unique |
| Adamantite indestructible | No equivalent | Unique |
| Aegium anti-regeneration | Sentinel (detection) | Completely different; Sentinel detects, Aegium suppresses healing |
| Eternite Focus reduction | Infused (Focus recovery) | Recovery vs. cost reduction — different economic models |
| Dreamweave mental boon | of Pure Thought (mental immunity) | Boon improves rolls; immunity bypasses rolls. Complementary |
| Orichalcum weight reduction | Mithril / Silent | Broader and stronger; justified by Q7–Q8 tier |
| Phantom-Silk force re-roll | Blurring (Mirror Image) | Re-roll vs. Mirror Image duplicate targeting. Distinct mechanics. |

**Conclusion:** No material directly replicates an enchantment's core function. All cases involve different activation models, resource costs, or equipment slots.

---

## Appendix C: Comparison to Exotic Tier Scaling

| Property | Exotic Example | Greater Upgrade | Legendary Upgrade |
|----------|---------------|-----------------|-------------------|
| Load reduction | -1 load (Chitin) | -1 load + bonus (Dragon Scales) | -2 load (Orichalcum) |
| Elemental resist | 1/scene, 1 source (Wyrmhide) | Permanent, 1 chosen type (Dragon Bone) | Permanent, 2–4 types (Elder Dragon) |
| Durability | 1/day re-roll (Dwarf-Steel) | 1/scene ignore failure (Treantwood) | Auto-repair per scene (Elderwood) |
| Anti-magic | +1 bane on own casting (Iron) | Bypass magical resistance (Meteorite) | Bypass + Durability + light (Titanium) |
| Environmental | Heavy armor climate (Dwarf-Steel) | Burning immunity (Solarite) | Full temperature immunity (Titanium) |
| Creature-specific | +1 boon vs. type (Silverroot) | Anti-regen vs. undead (Aegium) | Auto-fear on crit (Infernal Horn) |

Each tier provides a clear power increase while maintaining the same design language.
