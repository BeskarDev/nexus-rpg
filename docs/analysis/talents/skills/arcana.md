# Arcana — Talent Design Workbench

> **Source:** [docs/03-statistics/06-talents/arcana.md](../../../03-statistics/06-talents/arcana.md) | **Main Analysis:** [TALENT_SYSTEM_ANALYSIS.md](../TALENT_SYSTEM_ANALYSIS.md)

## 1. Skill Identity

**Role Spread:** Excels: Offense | Decent: Control, Utility | Weak: Healing, Defense, Support

**Primary Archetypes:** Magus (pillar), Sorcerer (pillar), Summoner (pillar), Warlock (pillar)

**Identity Tags:** arcane discharge, spell-weapon fusion, focus economy mastery, wild unpredictability, magic disruption

**Design Lens:** Arcana is raw magical force — destructive, reality-bending, and personally demanding. Its talent pool splits cleanly into two axes: amplifying offensive casting (Battle Mage, Spellblade, Wild Overload, Master of Fundamentals) and sustaining the magical resource engine (Arcane Spell Knowledge, Inexhaustible Mind, Spellweaver). The spell-weapon fusion mechanic shared by Battle Mage and Spellblade is Arcana's most distinctive design contribution — no other skill blends physical and magical attack rolls in the same action. Wild Overload's risk-reward gambling table is equally unique. The skill's critical gap is its four Signature archetypes: only Sorcerer and Magus are well-served; Summoner and Warlock have zero dedicated talent coverage in the skill they call home.

---

## 2. Current Talent Inventory

| Talent | Path | Max Rank | Status | Role | Notes |
|--------|------|----------|--------|------|-------|
| Arcane Spell Knowledge | Signature | R4 | Complete | Utility | Spell access line; repeatable; should reach R5 |
| Battle Mage | Signature | R4 | Complete | Hybrid | Weapon+spell fusion; +Arcana damage at R3 (flagged strong per §4.2) |
| Inexhaustible Mind | Basic | R3 | Complete | Utility | Focus recovery on short break; HP-for-Focus at R2 |
| Mana Shield | Basic | R3 | Complete | Combat | AV from casting; persist at R2; doubling defensive burst at R3 |
| Master of Fundamentals | Basic | R3 | Complete | Combat | Cantrip enhancement; Opportunity Attack cantrip at R2 |
| Spellblade | Basic | R3 | Complete | Combat | Spell-infused weapon strike; scales to rank 2 spells at R3 |
| Spellweaver | Basic | R3 | Complete | Utility | Metamagic access; +Focus at each rank |
| Wild Overload | Basic | R3 | Complete | Combat | Risk-reward dice table; choose-any at R3 (strong) |

**Summary:** 8 talents total — 8 complete, 0 incomplete. Max rank: R4. Role distribution: 50% combat / 50% utility.

---

## 3. Gaps & Priorities

**Signature gap:** Sorcerer is well-served by Wild Overload (innate unstable magic) and Spellweaver. Magus is well-served by Battle Mage and Spellblade. Summoner has zero dedicated talent here — no conjuration, binding, or summon-companion mechanic exists anywhere in the talent system (§3.3 zero-coverage list). Warlock has zero pact-mechanic talent — no eldritch gift, patron obligation trigger, or familiar mechanic. Both are full Arcana-pillar archetypes with no signature talent in their pillar skill.

**Role gaps:** The "null" and "resonate" aspects have zero talent coverage. Antimagic, counterspell, and magic disruption are named in the skill's design space but no talent addresses them. Arcana's defensive dimension beyond Mana Shield is underdeveloped — the analysis proposed an Arcane Warding talent (§3.5) but it has not been implemented. No healing whatsoever (expected for Offense-primary skill, but absence of any support is notable for Summoner and Warlock builds).

**System integration gaps:** No Arcana talent interacts with Challenge mechanics, Social Intrigue, or Travel. Arcana research, ritual casting, or ley-line attunement as downtime activities are absent. A "Runic Research" downtime talent or a "Magical Theory" challenge-preparation talent would connect the skill to the broader scene ecosystem.

**Rank gaps:** Battle Mage and Arcane Spell Knowledge reach R4. Wild Overload's R3 "choose any result" is effectively R4-power and may warrant redesigning as a High-Level talent. Arcane Spell Knowledge should extend to R5 per Signature designation. No talent reaches R5 currently.

**Priority ranking for design work:**
1. Summoner signature — conjuration/binding mechanic in Arcana
2. Warlock signature — pact mechanic, eldritch gift, or patron-obligation system
3. Antimagic/nullification talent (the "null" aspect, zero coverage)
4. Extend Arcane Spell Knowledge to R5 per Signature designation

---

## 4. Design Space

Arcana's two biggest unexplored territories are **conjuration** and **nullification** — polar opposites that both belong firmly in the skill's thematic identity. Summoning represents the ultimate expression of Arcana's "reality-altering" design note: bringing something into existence that wasn't there before. A companion-binding or temporary-manifestation mechanic would have no overlap with Animal Companion (Nature) because arcane summons are constructs, elementals, or bound entities, not domesticated animals. The design challenge is keeping summons from becoming a parallel character sheet — brief-duration manifestations with limited action economy (one attack, one specific ability) keep it manageable.

Nullification is equally distinctive: a talent tree around suppressing, disrupting, or absorbing enemy magic. Mage Hunter (Lore) covers the "interrupt the caster" angle, but true antimagic — temporarily removing a magical creature's resistances, dispelling ongoing effects, or creating an area where spells are harder to cast — belongs in Arcana's "null" aspect and has no talent anywhere. This is the design space the Warlock archetype could use for its "curses" identity.

### Unexplored Thematic Angles
- **Binding and conjuration:** A Summoner-signature talent creating a temporary bound entity (elemental fragment, animated construct, minor demon) with constrained action economy — appearing briefly as an action-economy extension rather than a full companion
- **Eldritch pact mechanics:** A Warlock-signature talent with a patron-obligation trigger — gaining power by accepting a cost (HP, Resolve, a specific behavioral restriction) in exchange for an eldritch ability that scales with the pact's demands
- **Arcane nullification:** A talent suppressing magical effects, removing resistances from magical creatures, or creating brief "null zones" — the "anti-Arcana" application of Arcana mastery
- **Runic inscription:** A downtime or pre-combat ritual allowing the arcanist to inscribe a single-use spell effect onto a surface or object — a preparation-based offensive option distinct from everything else in the skill

### System Integration Opportunities
- **Challenges:** Arcane research challenges (deciphering a magical ward, attuning to a ley line, unravelling a rival's ritual) are natural uses; no talent currently names Challenge mechanics
- **Social Intrigue:** Arcane authority — using visible magical power or magical knowledge as leverage in social scenes — could have a talent hook, especially for Sorcerer (innate power displays) and Warlock (eldritch presence)
- **Travel:** Ley-line or aetheric navigation (Arcana-based wayfinding in magical wilderness or planar-adjacent territories) is an untouched design angle that connects to the "resonate" aspect

---

## 5. Talent Suggestions

> **Status:** Deep design phase complete. All five designs below are production-ready pending owner review.

---

### Arcane Spell Knowledge — Rank 5 (Arcana, Signature)
*Extends the Signature talent to its pinnacle, unlocking the most powerful spells in any arcane discipline.*

**Rank 5.** +2 Focus. Learn two rank 5 or lower spells for any of your disciplines. You can choose this Talent multiple times.

**Archetype enablement:** Sorcerer, Summoner, Warlock, Magus — any Arcana-primary build investing in spell breadth.
**Design notes:** Mirrors the R1–R4 pattern exactly. Rank 5 spells are mortal-pinnacle effects; the +2 Focus per rank ensures heavy investors have the resource pool to cast them.

---

### Battle Mage — Rank 5 (Arcana, Signature)
*The pinnacle of spell-weapon fusion — a single strike that carries both steel and sorcery as one indivisible act.*

**Rank 5.** When you attack with a melee or ranged weapon, you can cast a rank 0 or rank 1 arcane spell that targets a single creature at the same target as part of the same Action (no Quick Action required). Spend the spell's Focus cost normally. Once per day, you can use this ability with a rank 2 arcane spell instead.

**Archetype enablement:** Magus (primary), Champion.
**Design notes:** Rank 4 required a Quick Action after the attack; Rank 5 collapses spell and weapon into a single Action — the qualitative leap expected at Signature pinnacle. The once/day rank 2 rider gives one encounter-shaping "big moment" without making rank 2 spells a routine part of every attack. Spell must target a single creature to prevent AoE ambiguity with weapon targeting.

---

### Eldritch Pact (Arcana, Basic | Cannot also take Wild Overload)
*You have made a binding covenant with an otherworldly patron — a Fiend of blazing ruin, a Fey lord of mercurial grace, or a Void entity of crushing entropy — and its mark is now woven into every spell you cast.*

**Rank 1.** When you take this talent, choose a patron type: **Fiend**, **Fey**, or **Void**. This choice is permanent. You cannot also take the Wild Overload talent; if you already have it, you cannot take Eldritch Pact.

- **Fiend.** Once per scene when you deal damage with an arcane spell, regain 2 HP.
- **Fey.** Once per scene after you cast an arcane spell, teleport to any unoccupied space within close range.
- **Void.** Once per scene when you hit a creature with an arcane spell, that creature suffers +1 bane on their next roll.

**Rank 2.** Your patron's gift deepens. Each effect uses the same trigger as Rank 1, still once per scene.

- **Fiend.** Regain 4 HP instead of 2.
- **Fey.** Teleport up to short range instead of close range. Attacks against you suffer +1 bane until the start of your next turn as your sudden repositioning disorients your attackers.
- **Void.** The +1 bane persists until the end of the target's next turn (not only their next roll).

**Rank 3.** Once per day, invoke your patron's power directly.

- **Fiend.** Every creature within close range of you takes 6 fire damage. Each affected creature can roll Spirit + Fortitude (TN 10) to halve this damage.
- **Fey.** Up to 3 willing allies within short range that you can see briefly turn invisible and are hidden from any creature without the ability to see through invisibility. Each ally's invisibility ends immediately when they make an attack roll.
- **Void.** One creature within medium range must roll Strength + Fortitude (TN 10) or be briefly stunned.

**Archetype enablement:** Warlock (primary — this is the pact fantasy). Sorcerer (as an alternative to Wild Overload for the patron-bound variant).
**Design notes:** Mutual exclusion with Wild Overload is explicit — both are the Arcana "high-risk power amplification" node, but Eldritch Pact is covenant-based and Wild Overload is chaos-based; a character embodies one or the other. Patron type is permanent to create long-term character identity rather than a swappable daily choice. The three types cover distinct combat roles: Fiend sustains via HP recovery (brawler/sustain), Fey sustains via positioning (skirmisher), Void sustains via debuff stacking (controller). Rank 3 invocations are intentionally asymmetric: Fiend = area damage burst, Fey = ally stealth burst, Void = single hard crowd control — each serves a different tactical need.

---

### Summoner's Bond (Arcana, Basic)
*You have learned to form a resonant bond with the entities you conjure, making your summons faster, more precise, and capable of acting as a true extension of your will.*

**Rank 1.** Summoned creatures you control gain +2 HP. When a summoned creature you control makes an attack, use your Mind + Arcana roll for the attack instead of the creature's own attack roll.

**Rank 2.** Summoned creatures you control gain +1 boon on all attack rolls. When a summoned creature you control would be dismissed or its duration would expire, you can spend 2 Focus to extend its remaining duration by 2 rounds.

**Rank 3.** Summoned creatures you control act on your Initiative count rather than separately. Once per scene when you cast a summoning spell, you may summon one additional creature of the same type at no extra Focus cost. Both creatures share the spell's duration and concentration requirement — if concentration ends, both are dismissed simultaneously.

**Archetype enablement:** Summoner (primary).
**Design notes:** Rank 1's attack-roll substitution immediately solves the summoning stat-scaling problem — your conjuration scales with your Arcana investment rather than a fixed creature stat block that becomes obsolete at higher ranks. Rank 2's duration extension prevents the "I summoned something for 3 rounds and it's wasted" frustration by giving a tactical spend option. Rank 3's simultaneous summon is the session-defining power — two creatures acting together — but shared concentration means they live and die together, preventing the talent from becoming a permanent doubler at zero ongoing cost. The +1 boon from Rank 2 stacks with Rank 3 because it modifies the attack roll, not the summoning roll.

---

### Arcane Mastery (Arcana, High-Level)
*At the height of arcane mastery, you command the fundamental grammar of spellcraft — reducing any formula to its essence, suppressing your own volatile magic, and briefly surpassing the limits of your discipline.*

**Rank 4.** Once per scene, reduce the Focus cost of one arcane spell of rank 2 or lower by 2 (minimum 0) when you cast it. When you roll a blunder on an arcane spell roll, you can spend 2 Focus to suppress the Wild Surge result — the spell fails but no wild surge occurs.

**Rank 5.** Once per day, cast any arcane spell you know as if it were heightened by one rank, applying all effects appropriate to that higher rank. The spell's Focus cost also increases as if it were that higher rank.

**Archetype enablement:** Sorcerer (Rank 4 surge suppression + Rank 5 heightening), Magus (Rank 4 cost reduction for secondary spellcasting).
**Design notes:** Rank 4 has two independent narrow-use functions that justify sharing a rank: the Focus efficiency tool fires once per scene on your choice of spell, while the blunder safety valve is purely reactive and doesn't increase power output. Together they reward deliberate spellcraft over reckless discharge. Rank 5's heightening is distinct from Spellweaver's metamagic — it's not a permanent modification but a once/day burst that temporarily exceeds the normal rank ceiling. The Focus cost increase is mandatory to prevent effectively free escalation to pinnacle power.

---

### Grand Conjuration (Arcana, High-Level | Prerequisite: Summoner's Bond Rank 3)
*The grandmaster Summoner opens the gate wide, coordinating bound entities as a living arsenal and pulling through something that should not exist here.*

**Rank 4.** Summoned creatures you control can use any ability listed in their stat block, not only their basic attack. Once per scene, you can issue a simultaneous command to all your active summoned creatures as a single Action, directing each of them to use any eligible ability or attack.

**Rank 5.** Once per day as an Action, spend 8 Focus to open a Grand Binding. Choose any summoning spell you know of rank 3 or lower and cast it as part of this Action. The summoned creature gains +4 maximum HP, +2 damage on all attacks (ability bonus), and can use up to two different stat-block abilities per turn. The creature lasts for a medium duration and cannot have its duration extended. While the Grand Binding is active, you cannot cast other summoning spells.

**Archetype enablement:** Summoner (primary — grandmaster conjuration and coordination), Magus (secondary — arcane controller leveraging summoned reinforcements).
**Capstone feeling:** You are the Binder of Armies — a caster whose voice can open a gate and pull through something too large, too old, or too foreign for anyone else to hold.
**Design notes:** R4's stat-block ability access solves the "my summon can only attack" problem at higher levels — creatures with unique abilities become meaningfully distinct rather than interchangeable damage delivery. The simultaneous command (once/scene) rewards investment in multiple active summons via Summoner's Bond R3 without making large summon counts unmanageable. R5's "no other summoning spells while active" prevents the Grand Binding from stacking with the Summoner's Bond simultaneous-summon mechanic — the player chooses between one extraordinary bound entity or two normal summons. The 8 Focus cost reflects the physical toll of holding something genuinely exceptional in the world.

---

### Arcane Dominion (Arcana, High-Level)
*The arcanist who has mastered both the grammar and the silence of magic — able to interrupt a spell mid-casting or project a field of arcane authority so total that nearby casters cannot speak a word of power.*

**Rank 4.** Once per scene, when an enemy within medium range begins to cast a spell, you can spend Focus equal to the spell's rank (minimum 1) as a reaction to impose 2 banes on their casting roll. This reaction must be declared after the spell is announced but before the caster rolls.

**Rank 5.** Once per day as an Action, project a dominion field centered on yourself with short range radius. For a brief duration, any enemy who attempts to cast a spell within range must first succeed on a Mind + Arcana roll against your Resist or the spell is countered and they lose the Focus they spent. You choose which creatures in range, if any, are excluded from this effect.

**Archetype enablement:** Magus (primary — the arcane duelist who silences enemy casters in melee), Warlock (secondary — eldritch authority over competing magic-users), Sorcerer (secondary — raw arcane dominance over other spellcasters).
**Capstone feeling:** You are the last word in arcane authority — the caster whose presence alone makes other mages pause before they dare speak a word of power.
**Design notes:** R4's reaction cost (Focus equal to the spell's rank) creates a natural ceiling — spending 4 Focus to disrupt a rank 4 spell is worthwhile; spending it on a cantrip is waste. This limits use to genuinely high-stakes interrupts without needing an explicit restriction. The "before the caster rolls" timing prevents gaming the system by waiting to see bad results before intervening. R5's dominion field lasts only briefly because even one sustained round of anti-casting centered on a melee Magus could end fights against caster-heavy enemies; the once/day limit combined with the brief duration makes this a dramatic turning-point ability rather than a reliable tactical opener. The Resist-based counter difficulty rewards high-Mysticism casters in resisting the field — investment in magical defense matters.
