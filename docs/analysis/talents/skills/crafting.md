# Crafting — Talent Design Workbench

> **Source:** [docs/03-statistics/06-talents/crafting.md](../../../03-statistics/06-talents/crafting.md) | **Main Analysis:** [TALENT_SYSTEM_ANALYSIS.md](../TALENT_SYSTEM_ANALYSIS.md)

## 1. Skill Identity

**Role Spread:** Excels: Support | Decent: Utility, Defense | Weak: Offense, Healing, Control

**Primary Archetypes:** Apothecary (pillar), Engineer (pillar)

**Identity Tags:** quality manufacture, field improvisation, item enhancement, repair mastery, alchemical creation

**Design Lens:** Crafting is the maker's skill — converting raw materials and expertise into items that change what the group can do. Its existing talents correctly focus on the two expressions of making: long-term quality (Artisan, Efficient Worker, Maintenance — the downtime workshop) and field improvisation (Quick Construction, Peak Performance — working with what you have). The skill's design contribution is "scene-altering objects": items that exist because the crafter made them, not because they were bought in a shop. This is mechanically distinct from every other skill — no other talent pool creates persistent item effects that outlast the scene. The critical gap is alchemy, which belongs to Crafting as much as it does to Nature and is the entire foundation of the Apothecary archetype.

---

## 2. Current Talent Inventory

| Talent | Path | Max Rank | Status | Role | Notes |
|--------|------|----------|--------|------|-------|
| Artisan | Basic | R3 | Complete | Utility | Downtime crafting re-roll; +1 success at R2; +2 success at R3 |
| Efficient Worker | Basic | R3 | Complete | Utility | Supply re-roll for materials; coin recovery at R2; guaranteed success at R3 |
| Maintenance | Basic | R3 | Complete | Utility | Quick repair on short break; repair re-roll at R2; party-wide durability protection at R3 |
| Master Artisan | Basic | — | Incomplete | Utility | Stub only: "Requires Artisan Rank 3" — prerequisite stated, no rank content |
| Peak Performance | Basic | R3 | Complete | Hybrid | Pre-combat item enhancement; scales to armor/shields at R3 |
| Quick Construction | Basic | R3 | Complete | Utility | Field construction of Q1–2 items during exploration; extends to large items at R2; Q3 items at R3 |

**Summary:** 6 talents total — 5 complete, 1 incomplete. Max rank: R3. Role distribution: ~83% utility / ~17% hybrid.

---

## 3. Gaps & Priorities

**Signature gap:** Apothecary has no Crafting-native signature — their alchemical identity requires Herbalist (Nature stub) and a hypothetical Crafting alchemy talent, neither of which exists with content. Engineer's explosive/siege-device identity requires Quick Construction R3 as the closest anchor but has no dedicated "contraption" or "mechanical device" talent — Quick Construction allows creating basic items but not the specialized engineering creations the archetype promises. Both pillar archetypes are critically underserved. Needs 4 more complete talents to reach the 8-talent minimum.

**Role gaps:** Enchantment (the "enchantment" aspect) has zero talent coverage — no talent in the system allows a crafter to add magical properties to items outside of the Magic sections. Blueprint-based planning (designing something in advance to build it faster or better later) has zero coverage. The "appraisal" aspect beyond what Intuitive Appraisal (Insight) does — using Crafting expertise to evaluate quality and detect forgeries — has zero coverage. Alchemy as a Crafting-native discipline (not just Nature's Poison Maker) is entirely absent.

**System integration gaps:** No Crafting talent interacts with Challenge mechanics, Social Intrigue, or Travel. Crafting is the only pillar-skill-holding skill (Apothecary, Engineer) with zero system integration. Engineer archetype should have Challenge-integration for siege mechanics; Apothecary should have Social Intrigue-integration for supplying goods through social networks. Travel has no Crafting hooks despite field repair and improvised equipment being obvious travel utilities.

**Rank gaps:** No Crafting talent reaches R4. Master Artisan is intended as a high-rank talent (prerequisite states Artisan R3) but has no design. A Crafting 5 Grandmaster has 5+ unspendable TP with only 5 spendable talent options. Needs at least 2 High-Level (R4–R5) talents, plus Master Artisan completion.

**Priority ranking for design work:**
1. Complete Master Artisan stub — it has a stated prerequisite, implying a design intent; must be completed before its prerequisite can be considered a full investment
2. Add an alchemy talent (Apothecary's core fantasy — potions, remedies, alchemical bombs — this is partially in Nature's Herbalist stub but Crafting should own the synthetic/laboratory angle)
3. Add an enchantment talent (the "enchantment" aspect has zero coverage anywhere relevant to non-magic crafters)
4. Add a blueprint/planning talent for the Engineer's preparation-based identity

---

## 4. Design Space

Crafting's largest unexplored territory is **alchemy** — the creation of consumable magical substances that don't require the creator to cast spells. Potions, tinctures, alchemical bombs, medicinal compresses — these are the Apothecary's defining tools and they require a Crafting-native talent (rather than Nature's Herbalist, which covers the herbal/natural side) to express the laboratory and synthesis dimension. Alchemical items are mechanically distinct from enchanted items: they are consumables, they require material components, and their effects are temporary. This is Peak Performance's sister talent — where Peak Performance enhances existing items before combat, an alchemy talent creates new consumable items for specific effects.

Enchantment is the second major gap: the ability to add a magical property to an existing item through crafting expertise (as distinct from casting a spell). This would require a relationship with the magic items system — the crafter applies an enchantment property to a weapon or armor piece using time, materials, and a Crafting roll. The distinction from spellcasting is that this is permanent (unlike Spellblade) and material-consuming (unlike most spells). This is the "magic item as craft project" fantasy that the Artificer/Engineer archetype traditionally owns.

### Unexplored Thematic Angles
- **Alchemy workshop:** Creating consumable alchemical items — potions, salves, bombs, acids — during downtime or in the field; distinct from Nature's Herbalist (which is organic-plant based) by being synthesized from refined components; Apothecary's core signature
- **Magical enchantment:** Applying a single enchantment property to an existing item as a downtime activity using materials and Crafting rolls; the crafter as a non-magical enchanter who understands the underlying material science of magical items
- **Contraption and device:** Engineer-specific talent for constructing mechanical contraptions with specific functions (triggered traps, deployable barricades, signal devices, communication apparatuses) beyond Quick Construction's general-item scope
- **Trade appraisal and forgery detection:** Using Crafting mastery to authenticate items, detect magical forgeries, and evaluate workshop-level quality — the "master craftsman knows real from fake" fantasy; distinct from Intuitive Appraisal (Insight) which is about general value reading

### System Integration Opportunities
- **Challenges:** Construction challenges (fortifying a position under time pressure, repairing a ship in a storm, building a signal tower) are natural Crafting domains; no talent names Challenge mechanics for Crafting
- **Social Intrigue:** Trade and guild social scenes — where masterwork goods open doors, where knowledge of manufacturing processes grants authority — have no Crafting talent hooks; a "Masterwork Reputation" or "Guild Standing" talent would let crafters leverage their work in social scenes
- **Travel:** Field repair of equipment during travel (restoring damaged weapons/armor between encounters, improvising replacement gear for ruined items) is a natural travel utility that Quick Construction partially covers but without explicit Travel system language

---

## 5. Talent Suggestions

The four designs below complete the stub, add the Apothecary and Engineer pillar identities, and provide a High-Level capstone. Together they bring Crafting to 10 complete talent proposals (6 existing + 4 new).

---

### Master Artisan (Crafting, Basic — Requires: Artisan R3)
*The full expression of a master craftworker's skill — creating items that push beyond what their raw materials alone should allow.*

**Rank 1.** When you craft an item, you may attempt to create it at one Quality tier higher than the material grade normally allows. Roll MND + Crafting vs. TN 12. On a success, the item is at the higher Quality tier. On a failure, the item is at its normal Quality tier and no materials are wasted.

**Rank 2.** You can repair magical items using a MND + Crafting roll vs. TN 12. On a success, restore one of the following (your choice): the item's active enchantment effect, the item's ability to accept a new enchantment, or remove one magical degradation effect the item has accumulated.

**Rank 3.** When you craft a masterwork item (the highest available Quality tier for its material), you may infuse one of the following permanent properties: a +1 item bonus to one stat appropriate to the item type, reduced weight (the item counts as one size category lighter for encumbrance), or exceptional durability (the item automatically succeeds any Durability check on a result of 4 or higher).

**Archetype enablement:** Engineer (primary), Apothecary (enchanted instruments and tools)
**Design notes:** Using Basic R1–R3 rather than High-Level because the Artisan R3 prerequisite already gates this behind significant investment. R1 rewards specialization without punishing failure — no materials lost if the quality upgrade fails. R2 fills the only gap in the item repair chain: magical items were previously unrestorable through non-magical means, which left Maintenance R2 incomplete as a system. R3 gives a concrete crafting capstone from a bounded menu. The +1 item bonus is capped at item bonus type and does not stack with other item bonuses — this is the anti-abuse constraint keeping it balanced against magic items.

---

### Contraption Builder (Crafting, Basic)
*You build purpose-made mechanical devices that solve problems a sword cannot — traps, distraction tools, and field hardware.*

**Rank 1.** During a short rest, using 1 Supply, you can construct one contraption from the following list. You can carry up to 3 contraptions at a time. Using a contraption is a **Quick Action** unless otherwise stated.
- **Smoke Bomb:** Target a close area within short range. That area is heavily obscured for a **brief** duration.
- **Flash Charge:** One creature in close range must roll SPI + Fortitude vs. TN 8 or be **briefly dazed**.
- **Tripwire Alarm:** Place in an adjacent space. The first creature to move through that space triggers the device: that creature rolls AGI + Athletics vs. TN 8 or is **briefly restrained**. You and all nearby allies are alerted when triggered.

**Rank 2.** You can also construct the following advanced contraptions using 1 Supply each during a short rest. Your carry limit increases to 5.
- **Caltrops:** Target a close area. The area becomes difficult terrain. Any creature that enters or moves through the area takes 1 damage that ignores AV.
- **Grappling Shot:** Fire a hook and line to a point up to medium range. Roll AGI + Crafting vs. TN 8. On a success, the line is secure and can be used for climbing.
- **Noise Trap:** Place in an adjacent space. As a **Quick Action**, you can trigger it remotely to create a **brief** auditory distraction in any area within medium range of the trap.

**Rank 3.** When you make a roll to deploy or use a contraption (such as the Grappling Shot), you gain +1 boon on that roll. Once per scene, you can deploy one contraption as part of your movement without spending a **Quick Action**. You can also set a basic contraption from Rank 1 in an adjacent space as a **Quick Action** during combat.

**Archetype enablement:** Engineer (pillar — primary design vehicle), Apothecary (situational utility tools), Ranger (trap-line identity overlap)
**Design notes:** Contraptions are built in preparation and deployed in play, keeping the Engineer useful in planning phases without requiring spell-like resources. The carry limit forces meaningful pre-adventure choices and creates natural conversation during gear-up scenes. Noise Trap has an explicit player-controlled trigger so it functions as active misdirection, not just a passive threat. R3 removes one action-cost friction point, rewarding deep investment by letting an experienced Engineer deploy during movement rather than burning a second Quick Action. All conditions (dazed, restrained) are brief to prevent contraptions from dominating longer encounters through stacking lockdown.

---

### Alchemist (Crafting, Basic)
*You synthesize powerful compounds from refined components — the laboratory art of the Apothecary, distinct from Herbalist's plant-based field medicine.*

**Rank 1.** During a short rest, using 2 Supply, you can synthesize one alchemical compound from the following list. Consuming or throwing a compound is an **Action** unless noted. You can carry up to 3 compounds at a time.
- **Healing Draught:** One creature that consumes this restores 6 HP.
- **Acid Vial:** One target in close range takes 4 damage that ignores AV. As a **Quick Action**, you may instead hurl it into a close area to deal 1 damage to all creatures there (ignores AV).
- **Alchemist's Fire:** All creatures in a close area take 2 fire damage. Any creature that fails STR + Fortitude vs. TN 8 is also **briefly dazed**.

**Rank 2.** Synthesizing a compound now costs 1 Supply instead of 2. You can also synthesize the following additional compounds:
- **Flash Powder:** All creatures in a close area must roll SPI + Fortitude vs. TN 8 or be **briefly confused**.
- **Antitoxin:** One creature that consumes this gains a +2 situational bonus on Fortitude rolls vs. poisons and diseases for a **short** duration.
Your carry limit increases to 5.

**Rank 3.** Choose one of the following specializations permanently:
- **Brewer:** Your Healing Draughts restore 10 HP instead of 6. You can also synthesize a *Fortifying Elixir* using 1 Supply during a short rest: one creature that consumes it gains +2 temporary HP for a **medium** duration.
- **Bomber:** Your damaging compounds deal their effect in a close area even when you target a single creature at no extra Supply cost. Your Acid Vials deal 6 damage to a single target.

**Archetype enablement:** Apothecary (pillar — alchemical synthesis identity), Engineer (supplementary utility), Sorcerer (consumable offensive tools)
**Design notes:** This is the laboratory synthesis side of Apothecary's dual identity. Herbalist (Nature) covers the organic plant-based side. Keeping them in separate skills prevents Herbalist from being a mandatory tax on Apothecary builds. R1 gives a broad toolkit with real choices. Supply cost drops at R2 so investment creates a noticeable workflow improvement (not just new options). R3 specialization is permanent — Brewer is sustain-support, Bomber is offensive pressure. Permanent specialization prevents mid-scene swapping between roles. Temporary HP from Fortifying Elixir uses the standard bounded mechanic and does not stack with other temporary HP sources. Acid Vial's Quick Action area mode is weaker than its Action single-target mode (1 vs. 4 damage) — the tradeoff is explicit.

---

### Siege Engineer (Crafting, High-Level — Requires: Crafting R3 and Archery R3)
*You build weapons of war and field fortifications that reshape what a battlefield can do — equipment that extends your team's reach into the strategic layer.*

**Rank 4.** During a downtime period of at least 4 hours, using 10 Supply, you can construct one portable siege weapon (a ballista or scorpion). The weapon deals 12 pierce damage at long range. Firing it requires an **Action**. Reloading it requires a **Quick Action**. It can be moved 1 area per round by one creature. You can instruct any ally in its operation and they can fire it using their STR or MND + Archery.

**Rank 5.** During any rest (short or long), using 6 Supply, you can construct one of the following field fortifications:
- **Barricade:** Blocks movement through one area. Creatures behind it gain +2 AV (situational bonus) against attacks from beyond the barricade.
- **Watch Tower Mount:** Extends observation and ranged attack range at this location to extreme range. Perception and Archery rolls made from this mount gain +1 boon.
- **Field Trap:** Designate one area. Any creature that moves into that area triggers a ballista-style attack: roll your MND + Crafting vs. their Dodge. On a hit, they take 12 pierce damage.

**Archetype enablement:** Engineer (pillar — apex expression), Warlord (siege command and tactical positioning), Hoplite (fortified line control)
**Design notes:** Cross-skill prerequisite (Crafting R3 + Archery R3) gates this at a genuine dual investment — only a character dedicated to both engineering and ranged combat can access it. The ballista is ally-operable by design: the Engineer does not need to operate the weapon they built, expressing the "scene-altering objects" identity through tools that persist after deployment. R5 changes terrain within the rest window — the strongest possible expression of Crafting's design contribution. Watch Tower Mount's extreme range is exceptional but requires building a physical structure, making it a logistics puzzle rather than a free range extension. Field Trap reuses the ballista's damage value (12 pierce) for system consistency.

---

> **Status:** Four designs complete. Crafting has 10 talent proposals (6 existing + 4 new). Master Artisan completes the stub. Contraption Builder and Alchemist provide pillar identity for Engineer and Apothecary respectively. Siege Engineer is the first High-Level talent.

---

### Works of Legend (Crafting, High-Level)
*The legendary artificer — the character whose name alone on a piece of work makes it worth more, and perform better, than anything else its materials could produce.*

**Rank 4.** Once per scene, when an ally is about to make a roll using an item you crafted or enhanced with a Crafting talent (such as Peak Performance or Alchemist), you can invoke its superior quality as a **Quick Action** before the roll. Choose one of the following:
- The roll gains +2 boon.
- If the roll succeeds, treat the Success Level as one step higher (weak becomes strong, strong becomes critical).
- If the roll fails, treat it as a weak success instead.

**Rank 5.** All items you craft from this point forward permanently bear a grandmaster's quality. Weapons you craft deal +2 damage. Armor you craft provides +1 AV (item bonus). Consumables you craft — potions, alchemical compounds, remedies — restore or deal 2 more than their listed value. All items you craft automatically succeed Durability checks on results of 3 or lower.

**Archetype enablement:** Engineer (the artificer whose equipment defines what allies can accomplish), Apothecary (consumables that exceed what any supplier can offer), Magus (blades and tools matched to their wielder's power)
**Capstone feeling:** The character's work is recognized by anyone who examines it — a weapon bearing their mark is a weapon known to perform.
**Design notes:** R4's three-option menu gives moment-to-moment control over how the quality advantage is spent. Each option is meaningful: boon supports reliable success, SL upgrade rewards succeeding on a hit, and failure-catch requires correctly anticipating a miss. R5's permanent passive is explicitly permitted at this rank per the design guidance. All bonuses are item-bonus type and do not stack with other item bonuses. Durability protection at 3 or lower mirrors Maintenance R3's precedent, making it feel like a mastery reward rather than an exception.

---

### Apex Synthesis (Crafting, High-Level — Requires: Alchemist R3)
*The Apothecary at their pinnacle — combining ingredients into preparations that exceed the limits of standard alchemical art.*

**Rank 4.** Once per scene during a short rest, you can combine the effects of any two compounds you currently carry into a single dual-compound preparation without spending additional Supply. The preparation occupies one carry slot and delivers both effects simultaneously when used. You can only have one dual-compound preparation at a time; creating a new one replaces the previous one.

**Rank 5.** Once per day during any rest, using 2 Supply, you can synthesize a Grand Compound — a preparation that exceeds what standard alchemical work can achieve. Choose one of the following:
- **Universal Cure:** One creature that consumes this is cured of one poison, one disease, one condition, and one mundane or naturally-sourced curse they currently have.
- **Grand Draught:** One creature that consumes this restores 18 HP and gains +2 AV (item bonus) for a short duration.
- **Incendiary Compound:** All creatures in a close area take 10 fire damage. Any creature that fails STR + Fortitude vs. TN 12 is also **briefly restrained** by flame and heat.
- **Paralytic Agent:** One target in close range who fails SPI + Fortitude vs. TN 12 is **briefly stunned**.

**Archetype enablement:** Apothecary (pillar — the synthesis pinnacle that rewards deep Crafting investment), Engineer (supplementary alchemical tools for field operations), Sorcerer (consumable offensive tools that match spell output without requiring Focus)
**Capstone feeling:** The Apothecary who produces miracles from materials — their compounds do what spells do, through mastery of substance rather than magical power.
**Design notes:** R4 rewards a well-stocked compound inventory — two different compounds must already be synthesized to combine them. The no-Supply cost rewards preparation; the one-at-a-time limit creates a genuine carrying decision. R5 costs 2 Supply (vs. standard 1 Supply) to signal its exceptional nature. The four Grand Compound options are calibrated to high-tier consumable effects appropriate for R5's once-per-day limit. Universal Cure's curse removal specifies "mundane or naturally-sourced" to preserve the role of dedicated ritual removal for magically-bound curses — that domain belongs to Curse Lore.

---

> **Status:** Six designs complete. Crafting now has 12 talent proposals (6 existing + 6 new). Master Artisan completes the stub. Contraption Builder and Alchemist provide pillar identity for Engineer and Apothecary respectively. Siege Engineer, Works of Legend, and Apex Synthesis are the three High-Level talents (R4–R5).
