# War — Spell School Design Space

## School Identity

**Tradition**: War (Mystic)
**Traits**: fury, pride, blood, justice, triumph
**Identity**: Honorable combat prowess and righteous victory — channeling battle fury and martial glory
**Role Spread**: Excels: Offense | Decent: Control, Support | Weak: Healing, Defense, Utility

### Mechanical Identity
- **Primary Conditions**: Frightened (intimidation), bleeding (battle wounds)
- **Signature Gimmick**: Weapon blessing and battle fury — enhance weapons, inspire through combat, exploit fear
- **Damage Types**: Physical, Fire, Blast

### Design Principles
1. War is the combat-focused mystic tradition — weapon enhancement, battle buffs, intimidation
2. Frightened is the primary control condition — fear exploitation rewards aggressive play
3. Bleeding represents honorable wounds and battle damage
4. **Known gaps**: R3 tier published (v0.12.0: Commander's Shout, Righteous Fury, Glorious Strike, Ancestral Guardian — the last being War's first defensive spell). Remaining gaps: nothing above R3, "justice"/"triumph" seeds at R4-R5 undesigned
5. War grows from 15 published spells toward ~29 total with full R0–R5 coverage (R4-R5 seeds remain)

### Internal Synergies

Framework: [synergy-framework.md](../../../../.claude/skills/spell-design/references/synergy-framework.md) — roles (setup / payoff / extender), the two axes, and the shared socket set.

War is unusual: its caster is **also the martial**. Setups and payoffs mostly run through weapon attacks, so the school's synergy engine is the tightest fusion of spell and steel in the game.

**Setup levers** — states War emits: *frightened* (War Cry, the enemy's nerve breaking before the charge), *bleeding* (Tear Wound, wounds that keep costing), **blessed steel** (weapon enhancements that arm the payoff in advance — Heroic Weapon, Weapon Spirit), and **paid blood** (the school's own HP sacrifices as banked fury).

**Payoff levers** — War collects on broken nerve and open wounds: attacks bite harder against the *frightened*, blessed weapons trigger their riders on strong and critical hits (the crit applies *bleeding*; the fear compounds), and blood spent (Blood Sacrifice, Battle Surge's self-cut) converts directly into damage now. Cold-cast deficit: the weapon blessings are modest flat buffs alone — their value compounds only through the attacks that follow, and the fear-exploits are on-curve against the unshaken.

**Extenders** — *prolong* through enchant durations (a blessed weapon carries its rider for the whole fight), *refresh* fear with each fresh horror (every kill in view re-tests the survivors' nerve, Curse of War re-feeding the panic), and *spread* via ancestral summons (Ancestral Warriors adding spectral blades that keep the pressure while the priest swings).

**Solo engine** (multi-turn): T1 War Cry (*frightened* line) + Heroic Weapon already burning → T2 wade in — weapon attacks exploit the fear, crits open *bleeding* → T3 Battle Surge, cutting your own flesh to finish the shaken and bleeding champion. Gated by HP costs (the school pays in blood, not just Focus), enchant slots, and melee exposure — the engine only runs from inside the fray.

**Party interlock**: **emits** *frightened*, *bleeding*, and weapon blessings **castable on allies' steel** — the martial-multiplier school (the fighter's axe carries the god of battle's edge). **wants** more attacks to carry its riders (every extra martial swing is War's payoff vector) and enemies held in reach (Telekinetics, Nature). Cross-player line: the priest blesses the champion's blade and breaks the enemy line's nerve with War Cry, and the champion's next charge hits frightened men with a god-touched edge.

**Synergy gaps**: the R3 tier now escalates the fear-and-steel engine — Glorious Strike *emits* frightened (crit spreads to onlookers) and Righteous Fury is the first **formal** mechanical fear-exploit (+1 boon, +damage vs *frightened*), closing the "informal fear-exploit" gap. Ancestral Guardian adds the school's first defense. Remaining: no R4-R5 battle magic (mass-fear payoff, battle-lord capstone) — the next design agenda.

**Synergy gap proposals** (sketches, post-framework — design fresh per current principles):
- **Terror's Edge** (R2, payoff) — your weapon attack against a *frightened* creature strikes with the weight of their own dread: +damage and on a strong or critical hit they stay *frightened* (no roll to end this turn). The formal fear-exploit — on-curve steel against the unshaken.
- **Rout** (R3, payoff, mass-fear) — a thunderous kill-cry over the battle: every *frightened* enemy in short range must roll Spirit + Fortitude or spend their next turn fleeing you; those who hold suffer +1 bane on attacks. Spends an entire field of fear at once — worthless against firm hearts.
- **Ancestral Champion** (R4, engine capstone) — the war-ancestors pour into your body for a short duration: weapon attacks gain +1 boon and bonus damage, you cannot be *frightened*, and each enemy you drop re-tests the nerve of their allies in close range (feeding the fear engine with every kill). Paid in blood — HP cost each turn it lasts.

## Current Spell Inventory (15 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Battle Surge, Mighty Strike, Spectral Slash |
| 1 | 5 | Curse of War, Heroic Weapon, Tear Wound, War Cry, Weapon Spirit |
| 2 | 3 | Ancestral Warriors, Blood Sacrifice, Haste |
| 3 | 4 | Ancestral Guardian, Commander's Shout, Glorious Strike, Righteous Fury |
| 4 | 0 | — |
| 5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| fury | Battle Surge | War Cry | Haste | Righteous Fury, Commander's Shout | Siege Breaker | Avatar of War, Warlord's Presence |
| pride | Mighty Strike | Heroic Weapon | War Banner | Glorious Strike | Champion's Challenge, Siege Breaker | Warlord's Presence |
| blood | Spectral Slash | Tear Wound, Curse of War | Blood Sacrifice | Ancestral Guardian | Blood Frenzy | Avatar of War, Final Triumph |
| justice | Righteous Strike | Retaliating Fury | Avenging Oath | Righteous Fury | Champion's Challenge | Divine Retribution |
| triumph | Victor's Shout | Weapon Spirit | Ancestral Warriors, War Banner | Ancestral Guardian, Commander's Shout | Triumphant Advance | Final Triumph |

**Coverage**: all 30 trait×rank slots have at least a concept seed (published spell or proposed concept). Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).

**Critical Gaps**: ~~All resolved~~
- ~~**Justice**: Zero spells at any rank~~ → Filled R0-R5: Righteous Strike → Retaliating Fury → Avenging Oath → Righteous Fury → Champion's Challenge → Divine Retribution
- ~~**Triumph R0**: No victory/morale cantrip~~ → Filled by **Victor's Shout**
- ~~**ALL traits R3+**: Zero spells above R2~~ → Filled with 12 proposed spells across R3-R5
- ~~**Pride R2+**: Theme drops off after R1~~ → Filled by War Banner (R2), Glorious Strike (R3), Champion's Challenge/Siege Breaker (R4), Warlord's Presence (R5)
- ~~**Blood R3+**: Only goes to R2~~ → Filled by Ancestral Guardian (R3), Blood Frenzy (R4), Avatar of War/Final Triumph (R5)

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Seed |
|---|---|---|
| Retaliating Fury | 1 | When struck in battle, you channel the fury of war into an immediate counterstrike. (R1 Quick Action reactive defense) |
| Righteous Strike | 0 | You channel divine justice into your weapon strike, punishing those who have wronged your allies. (Fills the R0 justice gap) |
| Victor's Shout | 0 | You strike with triumphant conviction, channeling the spirit of victory into your blow and inspiring allies through martial prowess. (Fills the R0 triumph gap) |
| Shield of Valor | 1 | You channel the courage of warriors past, surrounding yourself with an aura of unyielding valor. (Defensive spell for War — "courage in battle" theme) |
| Avenging Oath | 2 | You swear a divine oath of retribution against a creature that has wronged you or your allies, marking them for justice. (Fills R2 justice gap) |
| War Banner | 2 | You plant your weapon in the ground and channel divine war magic through it, creating a rallying point that inspires all nearby allies. (Fills R2 pride/triumph gap) |
| Commander's Shout | 3 | You unleash a thunderous shout of divine authority that shakes the resolve of your enemies and steels the hearts of your allies. (R3 mass buff/debuff) |
| Blood Frenzy | 4 | You enter a state of controlled battle fury, your blood singing with divine power. Each wound you deal feeds the frenzy. (R4 self-buff — sustained combat enhancement) |
| Warlord's Presence | 5 | You become an avatar of divine war — an inspiring, terrifying presence on the battlefield that turns the tide of battle. (R5 battlefield command) |
| Righteous Fury | 3 | Divine wrath surges through your veins like molten bronze, and your strikes carry the weight of righteous judgement. Your eyes burn with holy fury, and the unjust tremble before you. (R3 fury/justice capstone — self-buff that synergizes with the fear→exploit loop) |
| Ancestral Guardian | 3 | You call upon the spirits of fallen warriors, and a spectral weapon materializes beside you — a ghostly blade wielded by an ancestral champion who fights with tireless fury at your command. (R3 triumph/blood capstone — spectral ally) |
| Glorious Strike | 3 | You channel the war gods' pride in martial excellence, wreathing yourself in golden fire that marks you as a champion beyond equal. Enemies quail before your prowess. (Fills R3 pride gap) |
| Champion's Challenge | 4 | You point your weapon at a foe and issue a divine challenge that rings with the authority of gods of war. A burning sigil appears on both you and your sworn foe, binding you in single combat. (R4 justice/pride capstone — divine duel mechanic) |
| Siege Breaker | 4 | You channel the fury of war into a devastating strike that sunders fortifications, shatters shield walls, and breaks the defenses of even the most entrenched foe. The ground cracks and barriers crumble before divine wrath. (R4 fury/pride capstone — replaces the previously proposed "Battle Standard" (which was essentially "bigger War Banner")) |
| Avatar of War | 5 | You invoke the ultimate blessing of the war gods, and divine power transforms you into a living avatar of battle. Your form grows, your weapon blazes with holy fire, and wings of golden flame spread from your back. You are War incarnate. (R5 war capstone transformation) |
| Final Triumph | 5 | As your foe falls, divine glory erupts from the killing blow in a shockwave of golden light. Your allies feel the surge of righteous victory — wounds close, exhaustion fades, and the will to fight burns brighter than ever. (R5 triumph/blood capstone — victory burst) |
| Triumphant Advance | 4 | You raise your weapon high and let out a thunderous battle cry that echoes with divine authority. Golden light surges forward from your position, and your allies feel an irresistible urge to press the attack — feet moving faster, weapons striking harder, fear melting away before righteous momentum. (Fills R4 triumph gap) |
| Divine Retribution | 5 | You invoke the ultimate judgment of the war gods upon a creature that has committed grievous wrongs — betrayed allies, broken oaths, or committed atrocities. A pillar of golden fire descends from the heavens, burning away falsehood and punishing the guilty. (R5 justice capstone — divine punishment) |

## Cross-School Spell Sharing

War does not currently share spells with any arcane discipline.

**Concept Overlaps** (not shared, but thematically adjacent):
- **Heroic Weapon** (War R1) overlaps with **Flaming Weapon/Frozen Weapon/Lightning Weapon** (Evocation, Arcane) — both enhance weapons with magical effects. War's enhancement is divine and battle-themed; Evocation's is elemental. Different mechanics and flavor.
- **Haste** (War R2) is a unique War identity spell — no arcane equivalent exists. This is intentional: divine battle swiftness is distinct from arcane time manipulation.
- **Lightning Strike** (Evocation R2) could theoretically be shared with War for AoE tactical combat, but War's damage types (Physical, Fire, Blast) don't include Lightning — sharing would violate War's thematic identity.

> **Design Note**: War's combat magic is thematically distinct from arcane offense (divine battle fury vs. elemental destruction). No spells are currently shared. Haste remains uniquely War — it represents the god of war's gift of supernatural speed, not arcane manipulation of time.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Fury chain**: Battle Surge (R0) → War Cry (R1) → Haste (R2) → Commander's Shout/Righteous Fury (R3) → Blood Frenzy (R4) → Avatar of War/Warlord's Presence (R5) — **complete R0-R5**
2. **Pride chain**: Mighty Strike (R0) → Heroic Weapon (R1) → War Banner (R2) → Glorious Strike (R3) → Champion's Challenge/Siege Breaker (R4) → Warlord's Presence (R5) — **complete R0-R5**
3. **Blood chain**: Spectral Slash (R0) → Tear Wound/Curse of War (R1) → Blood Sacrifice (R2) → Ancestral Guardian (R3) → Blood Frenzy (R4) → Avatar of War/Final Triumph (R5) — **complete R0-R5**
4. **Justice chain**: Righteous Strike (R0) → Retaliating Fury (R1) → Avenging Oath (R2) → Righteous Fury (R3) → Champion's Challenge (R4) → Divine Retribution (R5) — **complete R0-R5**
5. **Triumph chain**: Victor's Shout (R0) → Weapon Spirit (R1) → Ancestral Warriors (R2) → Commander's Shout (R3) → Triumphant Advance (R4) → Final Triumph (R5) — **complete R0-R5**

### Setup + Payoff Combos
- ✅ **Fear → exploit**: War Cry (R1) frightens enemies → attacks against frightened targets deal bonus damage
- ✅ **Weapon blessing → crit trigger**: Heroic Weapon (R1) enhances weapon → critical hits apply bleeding condition
- ✅ **Justice → retribution**: Avenging Oath (R2) marks enemy → Champion's Challenge (R4) forces duel → Divine Retribution (R5) punishes those who harm allies
- ✅ **Triumph → snowball**: Triumphant Advance (R4) gives allies bonus on kills → Final Triumph (R5) heals entire party on kill
- ✅ **Blood chain**: Tear Wound (R1) → Blood Sacrifice (R2) → Blood Frenzy (R4) has thematic progression with blood/wound escalation

### Design Completeness Checklist
- [x] R1 Quick Action: Retaliating Fury — standardized reactive defense (+2 Dodge/Parry, melee counterstrike secondary)
- [x] Defensive options: Shield of Valor (R1) provides AV bonus + fear immunity
- [x] Utility: Limited but appropriate for War's weak utility role
- [x] Damage across ranks: R0-R5 fully covered — fury chain provides continuous damage/buff escalation
- [x] Repeating conditions: Frightened, bleeding, emboldened, dazed — consistent battle identity
- [x] Setup+payoff: Fear→exploit, justice→retribution, triumph→snowball loops are well-supported
- [x] **3 spells per rank minimum**: Met at all ranks
- [ ] **All aspects covered R0-R5**: all 30 trait×rank slots seeded with concepts; published coverage is partial (see inventory) (100%)
