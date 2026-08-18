# Folk Ability Rework — Game Design Document

> **Status:** Open design document. Extracted 2026-08-18 from the folk traits & ancestry balance analysis (archived at `_archive_/folk-traits-ancestry-balance-analysis.md`). Canonical data: `src/utils/data/json/folk.json`; published page: `docs/02-adventurers/01-folk.md`.

This GDD contains the implementable rework designs for the innate abilities of all 12 playable folk, plus the recommendations that motivated them. The cultural abilities subsystem is a separate design decision, documented in `cultural-abilities-gdd.md`.

## Context: Balance Findings

The archived balance audit scored every folk's ability set on combat and utility value (0–3 per ability, penalties negative). Findings that motivate each recommendation:

- **R1:** Lizardfolk's Thick Scales (+3 AV unarmored) is the single strongest passive defense in the folk system — equivalent to chain mail with zero load, no rigid penalty, and no equipment slot.
- **R2:** Human's Arcane Awakening (+2 Focus, catalyst-free casting) has no equivalent for any other folk, making Human the objectively best pick for every Arcana archetype (Sorcerer, Warlock, Magus, Summoner).
- **R3:** Minotaur is a strictly better Hune for Strength builds — identical Giant's Blood plus 3-damage Horns and Goring Charge on top.
- **R4:** Elf has the weakest combat package — Fleet-Footed (+1 Movement, once per combat) and Spiritual Symbiosis (reduced sleep in vegetation) are narrow and situational.
- **R5:** Dogfolk is the only folk better out of combat than in it — Keen Senses is utility-only and Pack Loyalty is once per scene with a restrictive trigger.
- **R6:** Small folk (Gnome, Goblin) pay a steep combat tax — Small Stature's weapon restrictions outweigh the +1 boon on stealth rolls it grants.
- **R7:** Goblin lore emphasizes cunning and trickery, but no ability reflects it — their kit covers only escape and stealth.
- **R8:** Natural weapon value varies dramatically — 3-damage weapons (Lizardfolk Jaws, Minotaur Horns) match one-handed manufactured weapons while 2-damage weapons (Catfolk, Dogfolk, Satyr) are backup-tier.

Overall ability budgets ranged from 3 (Goblin) to 8 (Dwarf, Human, Minotaur) — a 2.7× spread. The rework targets a 6–8 range (1.33× spread).

---

## 1. Recommendations

### 1.1 High-Priority Balance Changes

#### R1. Rebalance Lizardfolk's Thick Scales
**Problem:** +3 AV unarmored is equivalent to medium armor without any cost.
**Recommendation:** Reduce to +2 AV unarmored (still strong but no longer exceeds light armor). Keep the +1 AV when wearing armor.

*Note: the rework in Section 2.9 ultimately keeps +3 AV with a design rationale — the advantage diminishes as characters gain heavier armor, and Lizardfolk has no other major combat ability. R1 and that verdict are the two positions on record; resolve on implementation.*

#### R2. Address Human Caster Dominance
**Problem:** Arcane Awakening makes Human the objectively best folk for every Arcana archetype.
**Recommendation:** Either (a) make Arcane Awakening a cultural ability available only to specific Human cultures, or (b) add a comparable Mysticism bonus to at least one other folk to create competitive alternatives for divine casters.

#### R3. Differentiate Minotaur from Hune
**Problem:** Minotaur is a strictly better Hune for Strength-focused builds due to identical Giant's Blood plus additional combat abilities.
**Recommendation:** Give Hune a unique version of Giant's Blood with a different secondary benefit (e.g., +2 HP and +1 boon on Fortitude rolls to resist environmental hazards like heat, cold, or fatigue) to create a "towering endurance" niche distinct from Minotaur's "charging warrior" niche.

#### R4. Strengthen Elf
**Problem:** Elf has the weakest combat contribution and narrowest utility.
**Recommendation:** Upgrade Fleet-Footed to "once per scene" (from "once per combat") so it applies during chases, exploration, and social scenes. Consider adding a spiritual/nature mechanic (e.g., +1 boon on Nature or Mysticism rolls in natural environments) to reinforce the lore identity.

#### R5. Strengthen Dogfolk
**Problem:** Low combat relevance; Keen Senses is purely out-of-combat.
**Recommendation:** Expand Pack Loyalty to "once per turn" (from "once per scene") to make the teamwork mechanic a reliable combat identity. Alternatively, add a scent-based combat benefit (e.g., +1 boon on attacks against bleeding creatures, reinforcing the hunting pack fantasy).

### 1.2 Medium-Priority Balance Changes

#### R6. Reduce Small Stature Tax
**Problem:** Gnome and Goblin pay a steep combat penalty for non-combat benefits.
**Recommendation:** Add a compensating combat benefit to Small Stature (e.g., "+1 Dodge" as an unconditional passive stat bonus) to offset the weapon restrictions. Alternatively, allow small folk to wield versatile weapons one-handed at the cost of −1 weapon damage instead of the current full prohibition.

#### R7. Add Goblin Trickery Mechanic
**Problem:** Goblin's lore emphasizes cunning and trickery, but no ability reflects this.
**Recommendation:** Replace or augment Quick Escape with a trickery ability (e.g., "Cunning Trick: Once per scene, when you succeed on a Stealth or Streetwise roll, you gain +1 boon on your next Action against the same target").

#### R8. Normalize Natural Weapon Damage
**Problem:** 3-damage natural weapons (Lizardfolk, Minotaur) are significantly stronger than 2-damage weapons (Catfolk, Dogfolk, Satyr).
**Recommendation:** Either raise all natural weapons to 2 damage with a unique property per folk, or ensure the 3-damage weapons have balancing limitations (e.g., Reptile Jaws: "cannot be used while wielding a two-handed weapon").

### 1.3 Long-Term Design Improvements

#### R9. Implement Culture-Dependent Abilities
Adopt a system where one ability per folk varies by culture. Begin with the highest-impact folk (Human, Elf, Dogfolk) and expand to all 12 over time. **This subsystem is designed in full in `cultural-abilities-gdd.md`.**

#### R10. Add Mystic Caster Folk Support
No folk currently provides a bonus for Mysticism-based spellcasting. Consider giving one or more folk (Satyr, Elf, or Gnome) a cultural or core ability that provides a Mysticism bonus (+1 Focus, +1 boon on Mysticism rolls in specific conditions, etc.) to create parity with Human's Arcana support.

#### R11. Differentiate Shared Abilities Through Secondary Effects
Night Vision appears on Elf, Goblin, and Catfolk. Giant's Blood appears on Hune and Minotaur. Rather than renaming shared abilities (which hurts readability), differentiate folk through other ability changes or secondary effects on different abilities within the set. For example, Hune's Giant's Blood swaps heavy weapon ease for environmental resistance while Minotaur retains the original.

---

## 2. Proposed Folk Ability Reworks

This section presents complete, concrete ability set reworks for all 12 folk based on the audit findings and the recommendations in Section 1. All proposals focus on **innate biological and physical traits**. Cultural abilities are presented separately in `cultural-abilities-gdd.md`.

### 2.1 Design Goals

1. **Narrow the budget spread.** Current range is 3–8 (2.7× spread). Target: 6–8 (1.33× spread).
2. **Standardize at 3 abilities per folk** where biologically justified. Two-ability folk (Hune, Orc, Human) gain a third innate trait.
3. **Keep standardized ability names.** Night Vision and Giant's Blood retain their names across all folk that share them — consistency makes abilities easy to parse at a glance.
4. **Ensure every folk has a mix of combat and utility abilities.** No folk should be purely combat-focused or purely utility-focused.
5. **Soften the Small Stature tax.** Add a passive defensive benefit that thematically fits small folk.
6. **Address archetype dominance.** Remove Human's caster monopoly (Arcane Awakening moves to a cultural ability); differentiate Hune from Minotaur.
7. **Preserve thematic identity.** Every change must reinforce the folk's biological/physical fantasy, not contradict it.
8. **No blanket skill boons.** Abilities should not grant passive boons to entire skill rolls. Context-specific boons (e.g., "+1 boon on Fortitude rolls to resist poison" or "+1 boon on Perception rolls based on smell") are acceptable because they are limited to specific situations and often have environmental restrictions.

### 2.2 Change Legend

- ✅ **KEEP** — Ability unchanged from current rules.
- 🔄 **REWORK** — Ability modified (text changed).
- 🆕 **NEW** — Ability added (folk previously had fewer abilities).
- ❌ **REMOVED** — Ability removed from innate set.

References like **(R1)**, **(R5)**, etc. in design rationale sections refer to the corresponding recommendation numbers in Section 1.

---

### 2.3 Dwarf

> Innate biology: Dense bones, squat muscular frame, thermal vision, stone-like constitution, toxin-resistant metabolism.

**Verdict: No changes.** Dwarf is well-balanced (budget 8 but no single dominant ability) and every ability strongly reinforces dwarven biology. The three abilities cover defense (Stoneskin), resilience (Squat Build), and utility (Dwarven Sight) — a model distribution.

**Dwarven Sight.** ✅ KEEP
You can roughly make out differences in temperature by sight, granting you vision even in total darkness. You can see at melee range in absolute darkness as in bright light and up to a medium distance as in dim light.

**Stoneskin.** ✅ KEEP
You gain +1 AV. When you have to roll with Fortitude to withstand poison, intoxication, or illness, you gain +1 boon on the roll.

**Squat Build.** ✅ KEEP
You impose +1 bane on rolls that attempt to knock you prone or push you. Also when you are pushed, reduce the distance by one step (if you are pushed close, instead you aren't pushed at all).

| Metric | Before | After |
|--------|--------|-------|
| Combat Budget | 4 | 4 |
| Utility Budget | 4 | 4 |
| Net Budget | **8** | **8** |

---

### 2.4 Elf

> Innate biology: Slender, graceful frame, spiritually bonded to living nature, supernaturally keen senses, long-lived.

**Verdict: Meaningful buff.** Night Vision stays as-is. Fleet-Footed upgrades to once per scene. Spiritual Symbiosis gains a specific environmental detection capability and a lore-accurate barren-terrain penalty.

**Night Vision.** ✅ KEEP
You can see one range category further from sources of bright and dim light.

**Fleet-Footed.** 🔄 REWORK
You can choose to gain +1 Movement during your turn. You can use this ability once per scene.

> *Design rationale: Upgrading from once/combat to once/scene (R4) means the ability applies to chases, exploration, and social encounters — not just fights. This better reflects elven grace as a constant physical trait.*

**Spiritual Symbiosis.** 🔄 REWORK
You draw sustenance from the living world around you. While in natural environments with vegetation, you only need to sleep for 4 hours each night (allowing 4 hours for light activity). You can also sense when the natural life force in your immediate surroundings is severely diminished — you detect the presence of unnatural blight, desecration, or large-scale destruction of nature within close range. After spending more than a day in desolate or barren terrain without access to vegetation, you suffer +1 bane on Spirit rolls until you spend at least one hour in a natural environment.

> *Design rationale: The environmental detection gives this ability actual mechanical weight in exploration play (R4) without being a blanket skill boon — it's a binary sense ("you detect the presence"), not a roll modifier. The barren terrain penalty is drawn directly from the lore ("suffer physically when in barren or lifeless terrain for too long") and creates a genuine trade-off that no other folk shares — making Elf the first folk with a meaningful biological downside.*

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 2 | 3 | +1 (scene-frequency mobility) |
| Utility Budget | 3 | 5 | +2 (environmental detection, scene-frequency Fleet-Footed) |
| Penalties | 0 | -1 | -1 (barren terrain bane) |
| Net Budget | **5** | **7** | **+2** |

---

### 2.5 Gnome

> Innate biology: Small stature, innate psychic/empathic neurology, illusion-sensitive perception, stout build.

**Verdict: Small Stature rework.** The two signature abilities (Natural Empath, Scent of Illusions) are excellent and unchanged. Small Stature gains a passive defensive bonus to offset the weapon restrictions.

**Natural Empath.** ✅ KEEP
You can read the surface thoughts and emotions of any close creature by rolling Spirit + Insight. You can also project your feelings to a creature close to you, allowing you to communicate simple ideas with animals and other creatures. You also intuitively know how many living creatures are close to you and their general direction.

**Scent of Illusions.** ✅ KEEP
You can instinctively make out illusions and invisible things. You gain +1 boon on Spirit rolls to identify magical falsehoods and illusions and impose +1 bane on rolls to fool you with falsehoods or illusions.

**Small Stature.** 🔄 REWORK
You are of small size. This grants you the following effects:

- You gain +1 boon on Agility rolls to hide or move stealthily.
- You gain +1 Dodge.
- You can only wield versatile weapons two-handed and don't add a bonus to weapon damage from it.
- Increase the Strength requirement for heavy weapons you wield by +1d (max. d12).

> *Design rationale: +1 Dodge is a clean passive stat bonus (like Stoneskin's +1 AV or Stoic Mind's +1 Resist) that compensates for the weapon restrictions without adding conditional complexity. Small folk are simply harder to hit. This is unconditional — no mental load for tracking size comparisons or situational triggers.*

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 1 | 3 | +2 (+1 Dodge is permanent passive defense) |
| Utility Budget | 5 | 5 | — |
| Penalties | -2 | -2 | — |
| Net Budget | **4** | **6** | **+2** |

---

### 2.6 Hune

> Innate biology: Towering frame (2.1–2.3m), immense physical endurance, thick skin, environmentally hardy, imposing presence.

**Verdict: Differentiate from Minotaur + add third ability.** Giant's Blood keeps its name but is reworked to swap the heavy weapon ease for environmental resistance — Minotaur retains the heavy weapon ease exclusively. A new third ability (Imposing Stature) reflects Hune's natural intimidation factor with appropriate size restrictions.

**Giant's Blood.** 🔄 REWORK
+2 HP. You also gain the following effects:

- Add +2 to your carrying capacity.
- You gain +1 boon on Fortitude rolls to resist environmental hazards such as extreme heat, cold, exhaustion, or altitude.

> *Design rationale: Differentiating from Minotaur (R3). Both folk keep Giant's Blood by name, but the secondary effects now diverge: Hune gains environmental hardiness (fitting their lore as caravan guards and nomadic travelers in harsh climates), while Minotaur retains the heavy weapon ease (fitting their combat-first identity). The carry capacity remains the same (+2) as Hune's towering frame justifies it.*

**Stoic Mind.** ✅ KEEP
+1 Resist. You gain +1 boon on Spirit + Fortitude rolls.

**Imposing Stature.** 🆕 NEW
Your towering frame commands respect and inspires caution. You gain +1 boon on Influence rolls to intimidate creatures of medium or smaller size. Creatures attempting to intimidate or frighten you suffer +1 bane on the roll.

> *Design rationale: Hune had only 2 abilities — the fewest of any folk. Imposing Stature fills a social/defensive niche that reflects their biological reality (they're 2+ meters tall). The intimidation boon is restricted to medium or smaller creatures — you can't intimidate a huge dragon just by being tall. The anti-frighten/intimidate defense is unrestricted because a Hune's stoic composure isn't diminished by creature size.*

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 4 | 4 | — (Stoic Mind + anti-frighten replaces heavy weapon ease) |
| Utility Budget | 2 | 4 | +2 (environmental resistance, intimidation boon) |
| Net Budget | **6** | **8** | **+2** |

---

### 2.7 Orc

> Innate biology: Muscular build, fast-maturing metabolism, adrenaline-heavy endocrine system, dense muscle fiber, fierce temperament.

**Verdict: Add third ability with utility focus.** Orcish Fury and Pride above Death are excellently designed and unchanged. A new third ability (Relentless Vigor) reflects orc biology's aggressive metabolism and adds the utility component the folk currently lacks — without it, all orc abilities are combat-only, which is one-dimensional.

**Orcish Fury.** ✅ KEEP
When you roll a critical success on an attack with a melee weapon, add your weapon damage an additional time to the total damage.

**Pride above Death.** ✅ KEEP
When you suffer one Injury, you can choose to ignore it. You can use this ability once per day.

**Relentless Vigor.** 🆕 NEW
Your aggressive metabolism lets you push through physical hardship that would fell other folk. You can choose to ignore one level of the exhausted condition for the duration of a scene. You can use this ability once per day. Additionally, when you make camp, you recover from one additional level of the exhausted condition.

> *Design rationale: Orcs had only 2 abilities, both purely combat-focused. Relentless Vigor adds a utility dimension grounded in orcish biology — their fast-maturing metabolism and dense musculature enable rapid physical recovery. This matters during forced marches, extended exploration, and post-combat recovery. The once/day scene-duration ignore is comparable in power to Pride above Death (both are daily-use survival tools, one for combat injury, one for accumulated fatigue).*

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 5 | 5 | — |
| Utility Budget | 0 | 2 | +2 (exhaustion management, camp recovery) |
| Net Budget | **5** | **7** | **+2** |

---

### 2.8 Goblin

> Innate biology: Small, wiry frame, dark-adapted eyes, hyperactive reflexes, nimble digits, heightened fight-or-flight response.

**Verdict: Enhanced Quick Escape + Small Stature rework.** Quick Escape gains a hide-after-dodge option reflecting goblin biology (instinct to vanish after evading). Small Stature gains the same +1 Dodge as Gnome.

**Night Vision.** ✅ KEEP
You can see one range category further from sources of bright and dim light.

**Quick Escape.** 🔄 REWORK
When an enemy misses you with a melee attack, you can choose to move close without provoking Opportunity Attacks. If suitable cover or concealment is within the area you move to, you can immediately attempt to hide as part of this movement (rolling Agility + Stealth as normal). You can use this ability once between turns.

> *Design rationale: The hide-after-dodge option (R7) captures the goblin's biological flight response — they don't just run, they vanish. This makes Quick Escape meaningfully more powerful for stealth-oriented characters while retaining the same trigger and frequency. The hide attempt still requires a roll and suitable concealment, preventing automatic abuse.*

**Small Stature.** 🔄 REWORK
You are of small size. This grants you the following effects:

- You gain +1 boon on Agility rolls to hide or move stealthily.
- You gain +1 Dodge.
- You can only wield versatile weapons two-handed and don't add a bonus to weapon damage from it.
- Increase the Strength requirement for heavy weapons you wield by +1d (max. d12).

> *Design rationale: Same as Gnome (R6). +1 Dodge as an unconditional passive bonus compensates for the weapon restrictions.*

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 2 | 4 | +2 (hide-after-dodge, +1 Dodge) |
| Utility Budget | 3 | 4 | +1 (stealth flexibility) |
| Penalties | -2 | -2 | — |
| Net Budget | **3** | **6** | **+3** |

---

### 2.9 Human

> Innate biology: Innate arcane sensitivity, adaptive neurology, relentless perseverance, rapid learning, arcane-resonant physiology.

**Verdict: Remove Arcane Awakening + replace with Arcane Sensitivity.** Arcane Awakening is removed from the innate ability set entirely and becomes a cultural ability for the Sefkari (Oasis-Humans) — the culture that canonically "harnesses human affinity for arcane magic." Arcane Sensitivity replaces it as an innate ability that reflects human arcane biology without privileging casters.

**Will of Perseverance.** ✅ KEEP
Re-roll the result of one test and take the new result. You can use this ability once per day.

**Arcane Awakening.** ❌ REMOVED → *Becomes Sefkari cultural ability (see `cultural-abilities-gdd.md`)*

> *Design rationale: Arcane Awakening (+2 Focus, catalyst-free casting) made Human the objectively best folk for every Arcana archetype (R2). Rather than nerfing it to irrelevance, it becomes a cultural ability for the Sefkari — the one Human culture that specifically trains arcane magic. This simultaneously solves Human caster dominance and creates the game's first culture-based archetype enabler.*

**Arcane Sensitivity.** 🆕 NEW *(replaces Arcane Awakening)*
Your innate connection to arcane energy grants you a subtle awareness of magic. You can detect the presence of active magical effects, enchanted objects, and magical auras within close range, perceiving them as a faint shimmer or tingling sensation. This ability reveals the presence and general location of magic but not its specific nature or school.

> *Design rationale: Arcane Sensitivity gives every human — fighters, rogues, rangers — a useful biological trait derived from their arcane-resonant physiology. It fills a detection niche distinct from Gnome (thoughts/emotions), Elf (environmental corruption), and Dogfolk (scent), creating a unique identity. Unlike Arcane Awakening, it doesn't privilege any archetype.*

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 4 | 2 | -2 (Arcane Awakening removed) |
| Utility Budget | 4 | 5 | +1 (Arcane Sensitivity) |
| Net Budget | **8** | **7** | **-1** |

---

### 2.10 Catfolk

> Innate biology: Feline musculature, retractable claws, powerful larynx (roar), nocturnal-adapted eyes, agile reflexes.

**Verdict: Enhance Sharp Claws.** Night Vision and Intimidating Roar are unchanged. Sharp Claws gains the *agile* property, reflecting feline reflexes and opening up Agility-based builds.

**Night Vision.** ✅ KEEP
You can see one range category further from sources of bright and dim light.

**Intimidating Roar.** ✅ KEEP
You can use your Action in combat to unleash a powerful lion's roar. Roll Strength + Fortitude vs. Resist against each creature within short range. On a success, they are frightened of you. They can roll Spirit + Fortitude at the start of their turns. On a success, they stop being frightened. You can use this ability once per combat.

**Sharp Claws.** 🔄 REWORK
You can use your claws (2 weapon damage, agile, light, slash) as brawling weapons instead of unarmed attacks.

> *Design rationale: Adding the agile property means Catfolk can attack with claws using Agility instead of Strength. This is thematically perfect — cats are agile predators who rely on speed and precision rather than brute force. Mechanically, it opens up viable Agility-based claw builds (rogues, duelists) without changing the damage output. The claws remain 2 damage (lighter than Lizardfolk/Minotaur natural weapons), but the agile/light/slash combination makes them the most versatile natural weapon in the game.*

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 3 | 4 | +1 (agile claws enable Agility builds) |
| Utility Budget | 2 | 2 | — |
| Net Budget | **5** | **6** | **+1** |

---

### 2.11 Lizardfolk

> Innate biology: Dense keratinous scales, cold-blooded metabolism, amphibious lungs, powerful jaw musculature.

**Verdict: Keep Thick Scales, enhance Aquatic Nature.** Thick Scales at +3 AV is powerful at low levels but compensates for Lizardfolk's limited combat mobility and environment-dependent utility. Aquatic Nature gains a swimming boon for better gameplay relevance.

**Thick Scales.** ✅ KEEP
Your natural scales grant +3 AV (armor bonus). If you have another higher armor bonus, gain +1 AV instead.

> *Design rationale: While +3 AV unarmored is equivalent to chain mail, this advantage naturally diminishes as characters gain access to heavier armor. At higher levels, the +1 AV bonus when wearing armor is comparable to Dwarf's Stoneskin. Lizardfolk have no other major combat abilities — their jaws are only competitive at low levels, and Aquatic Nature is highly environment-dependent. The raw defensive power of Thick Scales is the core trade-off for limited versatility elsewhere.*

**Aquatic Nature.** 🔄 REWORK
You can hold your breath for 4 + ½ Strength minutes. You also gain +1 boon on Athletics rolls to swim or dive.

> *Design rationale: The swimming boon makes this ability relevant more frequently than pure breath-holding. Like Stoneskin's "+1 boon on Fortitude rolls to resist poison," this is a context-specific boon limited to a narrow physical activity — not a blanket skill bonus. Lizardfolk should feel aquatically competent in any water encounter.*

**Reptile Jaws.** ✅ KEEP
You can use your bite (3 weapon damage, crush) as a brawling weapon instead of unarmed attacks.

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 5 | 5 | — |
| Utility Budget | 2 | 3 | +1 (swimming boon) |
| Net Budget | **7** | **8** | **+1** |

---

### 2.12 Minotaur

> Innate biology: Bovine skull with horns, powerful musculature, charging gait, dense bone structure, heavy build.

**Verdict: No changes.** Minotaur's ability set is well-designed with a clear combat identity. Giant's Blood is shared with Hune by name, but the secondary effects differ: Minotaur retains the heavy weapon ease that Hune trades for environmental resistance (see 2.6). The Horns + Goring Charge combination provides a unique charging-warrior identity.

**Giant's Blood.** ✅ KEEP
+2 HP. You also gain the following effects:

- Add +2 to your carrying capacity.
- Decrease the Strength requirement for heavy weapons you wield by -1d (min. d4).

> *Note: While this is identical to Hune's current Giant's Blood, the proposed Hune rework (Section 2.6) modifies Hune's version to replace heavy weapon ease with environmental resistance. Minotaur retains the original version. Both retain the Giant's Blood name but with differentiated secondary effects.*

**Horns.** ✅ KEEP
You can use your horns (3 weapon damage, crush) as a brawling weapon instead of unarmed attacks.

**Goring Charge.** ✅ KEEP
After you spend 1 or more Movement towards a creature and hit them with an attack using your horns, add your weapon damage an additional time to the total damage.

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 6 | 6 | — |
| Utility Budget | 2 | 2 | — |
| Net Budget | **8** | **8** | **0** |

---

### 2.13 Dogfolk

> Innate biology: Canine olfactory system, acute hearing, pack-bonding instinct, strong jaw.

**Verdict: Significant combat buffs.** Keen Senses gains a blood-scent combat application (boon vs. bleeding targets). Pack Loyalty broadens to any attack type (not just melee) and gains a second use. These changes make Dogfolk the "teamwork and pursuit" folk without changing their core identity.

**Keen Senses.** 🔄 REWORK
You have an extraordinary sense of smell and hearing.

- You gain +1 boon on Perception rolls based on smell or hearing.
- You can detect the presence and general direction of creatures within close range by scent alone, even if you can't see them, as long as air can reach you from their location.
- In combat, you can smell the blood of wounded foes — you gain +1 boon on attack rolls against bleeding creatures.
- Weather or other environmental factors may hinder scent-based abilities.

> *Design rationale: The bleeding-target boon (R5) transforms a pure-utility ability into a combat/utility hybrid. It's limited to smell (biological sense) and requires a specific condition (target must be bleeding), with environmental restrictions — matching the design principle for acceptable context-specific boons. It reinforces the hunting-pack fantasy — dogfolk pursue wounded prey — and synergizes naturally with allies who inflict bleeding.*

**Pack Loyalty.** 🔄 REWORK
While you are close to an ally, you can coordinate your attack. You gain +1 boon on an attack roll and that ally also briefly gains +1 boon on their next attack against the same target. You can use this ability twice per combat.

> *Design rationale: Two changes: "melee attack" → "attack" (works for ranged Dogfolk too) and "once per scene" → "twice per combat" (R5). The frequency increase makes Pack Loyalty a reliable tactical tool rather than a single-use novelty, and broadening to any attack type means Dogfolk rangers and archers benefit alongside Dogfolk fighters.*

**Bite.** ✅ KEEP
You can use your bite (2 weapon damage, crush) as a brawling weapon instead of unarmed attacks.

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 2 | 5 | +3 (bleeding boon, doubled Pack Loyalty, any attack type) |
| Utility Budget | 3 | 3 | — |
| Net Budget | **5** | **8** | **+3** |

---

### 2.14 Satyr

> Innate biology: Goat legs with hooves, small horns, innate magical resistance, sure-footed in rough terrain.

**Verdict: Minor enhancement to Woodland Stride.** Wild Resilience and Horns are well-designed. Woodland Stride gains a balance/footing component that provides minor combat relevance in outdoor encounters.

**Wild Resilience.** ✅ KEEP
When you take damage from a spell or are affected by a magical effect that applies a condition, you can choose to either gain resistance against the damage or negate the condition. You can use this ability once per scene.

**Horns.** ✅ KEEP
You can use your horns (2 weapon damage, crush) as a brawling weapon instead of unarmed attacks.

**Woodland Stride.** 🔄 REWORK
You treat difficult terrain caused by natural vegetation as normal terrain. Your sure-footed hooves grant you +1 boon on Agility + Athletics rolls to climb, balance, or traverse natural environments. You also impose +1 bane on rolls that attempt to knock you prone while you are on natural ground.

> *Design rationale: The prone-resistance on natural ground gives Woodland Stride a minor defensive combat application in outdoor encounters. Satyrs with goat legs should be among the hardest creatures to topple on uneven ground. This is narrower than Dwarf's Squat Build (which works on any surface) but provides some combat relevance in the right environments.*

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Combat Budget | 3 | 4 | +1 (prone resistance on natural ground) |
| Utility Budget | 2 | 2 | — |
| Net Budget | **5** | **6** | **+1** |

---

### 2.15 Revised Balance Comparison

| Folk | Before Budget | After Budget | Change | New Tier |
|------|:---:|:---:|:---:|:---:|
| **Dwarf** | 8 | 8 | — | A |
| **Elf** | 5 | 7 | +2 | A |
| **Gnome** | 4 | 6 | +2 | B |
| **Hune** | 6 | 8 | +2 | A |
| **Orc** | 5 | 7 | +2 | A |
| **Goblin** | 3 | 6 | +3 | B |
| **Human** | 8 | 7 | -1 | A |
| **Catfolk** | 5 | 6 | +1 | B |
| **Lizardfolk** | 7 | 8 | +1 | A |
| **Minotaur** | 8 | 8 | 0 | A |
| **Dogfolk** | 5 | 8 | +3 | A |
| **Satyr** | 5 | 6 | +1 | B |

**New range:** 6–8 (1.33× spread, down from 2.7×).
**New tiers:** 7 folk at A-tier, 5 at B-tier, 0 at S-tier or C-tier.

The B-tier folk (Gnome, Goblin, Catfolk, Satyr, Human*) all have clear reasons for their slightly lower budget:
- **Gnome/Goblin**: Small Stature still carries a net penalty despite the +1 Dodge — a biological constraint that creates a genuine trade-off.
- **Catfolk**: Abilities are well-rounded but Intimidating Roar costs a full Action (opportunity cost) and Sharp Claws are 2 damage (lower than Lizardfolk/Minotaur). Cultural abilities can raise this.
- **Satyr**: Wild Resilience is meta-dependent (strongest in magic-heavy campaigns). Value varies by campaign.

*Note: Human drops to budget 7 in the innate set, but Sefkari humans with Arcane Awakening as a cultural ability gain an additional +3 to their effective power (equivalent to adding the old Arcane Awakening's combat value). Cultural abilities are scored separately from the innate budget — the 6–8 range above covers innate abilities only.

### 2.16 Change Summary Matrix

| Folk | Ability 1 | Ability 2 | Ability 3 | Key Change |
|------|-----------|-----------|-----------|------------|
| **Dwarf** | Dwarven Sight ✅ | Stoneskin ✅ | Squat Build ✅ | None |
| **Elf** | Night Vision ✅ | Fleet-Footed 🔄 | Spiritual Symbiosis 🔄 | Scene-frequency mobility; corruption detection with barren-terrain penalty |
| **Gnome** | Natural Empath ✅ | Scent of Illusions ✅ | Small Stature 🔄 | +1 Dodge (unconditional passive) |
| **Hune** | Giant's Blood 🔄 | Stoic Mind ✅ | Imposing Stature 🆕 | Environmental resistance replaces heavy weapon ease; new intimidation ability (medium or smaller) |
| **Orc** | Orcish Fury ✅ | Pride above Death ✅ | Relentless Vigor 🆕 | New utility: exhaustion management and camp recovery |
| **Goblin** | Night Vision ✅ | Quick Escape 🔄 | Small Stature 🔄 | Hide-after-dodge; +1 Dodge (unconditional passive) |
| **Human** | Will of Perseverance ✅ | Arcane Sensitivity 🆕 | *(Arcane Awakening → Sefkari cultural)* | Arcane Awakening removed; magic detection replaces caster dominance |
| **Catfolk** | Night Vision ✅ | Intimidating Roar ✅ | Sharp Claws 🔄 | Claws gain *agile* property (Agility-based attacks) |
| **Lizardfolk** | Thick Scales ✅ | Aquatic Nature 🔄 | Reptile Jaws ✅ | Swimming boon added; +3 AV retained |
| **Minotaur** | Giant's Blood ✅ | Horns ✅ | Goring Charge ✅ | None (Hune is differentiated instead) |
| **Dogfolk** | Keen Senses 🔄 | Pack Loyalty 🔄 | Bite ✅ | Bleeding-target boon; 2×/combat any attack |
| **Satyr** | Wild Resilience ✅ | Horns ✅ | Woodland Stride 🔄 | Prone resistance on natural ground |
