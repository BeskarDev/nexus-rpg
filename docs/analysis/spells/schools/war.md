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
4. **Critical gaps (addressed by proposals)**: Previously no defensive spells, no R3+ spells, "justice" and "triumph" under-covered — all filled by proposed spells below
5. War grows from 11 existing spells to 29 total (11 existing + 18 proposed) with full R0–R5 coverage

### Internal Synergies
- **Fear → Exploit**: Frighten enemy → attacks against frightened targets deal bonus damage
- **Weapon blessing → Crit trigger**: Blessed weapon crits apply bleeding
- **Battle chain**: War Cry (R1 fear) → Weapon buff → Fear-empowered attacks

## Spell Inventory (11 existing + 18 proposed = 29 total)

| Rank | Existing | Proposed | Spells |
|------|----------|----------|--------|
| 0 | 3 | 2 | Battle Surge, Mighty Strike, Spectral Slash + **Righteous Strike, Victor's Shout** |
| 1 | 5 | 2 | Curse of War, Heroic Weapon, Tear Wound, War Cry, Weapon Spirit + **Retaliating Fury, Shield of Valor** |
| 2 | 3 | 2 | Ancestral Warriors, Blood Sacrifice, Haste + **Avenging Oath, War Banner** |
| 3 | 0 | 4 | **Commander's Shout, Righteous Fury, Ancestral Blade, Warrior's Pride** |
| 4 | 0 | 4 | **Blood Frenzy, Champion's Challenge, Siege Breaker, Triumphant Advance** |
| 5 | 0 | 4 | **Avatar of War, Warlord's Presence, Final Triumph, Divine Retribution** |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| fury | Battle Surge | War Cry | Haste | Righteous Fury, Commander's Shout | Siege Breaker | Avatar of War, Warlord's Presence |
| pride | Mighty Strike | Heroic Weapon | War Banner | Warrior's Pride | Champion's Challenge, Siege Breaker | Warlord's Presence |
| blood | Spectral Slash | Tear Wound, Curse of War | Blood Sacrifice | Ancestral Blade | Blood Frenzy | Avatar of War, Final Triumph |
| justice | Righteous Strike | Retaliating Fury | Avenging Oath | Righteous Fury | Champion's Challenge | Divine Retribution |
| triumph | Victor's Shout | Weapon Spirit | Ancestral Warriors, War Banner | Ancestral Blade, Commander's Shout | Triumphant Advance | Final Triumph |

**Coverage**: 30/30 slots filled (100%) — all aspects covered at all ranks R0-R5

**Critical Gaps**: ~~All resolved~~
- ~~**Justice**: Zero spells at any rank~~ → Filled R0-R5: Righteous Strike → Retaliating Fury → Avenging Oath → Righteous Fury → Champion's Challenge → Divine Retribution
- ~~**Triumph R0**: No victory/morale cantrip~~ → Filled by **Victor's Shout**
- ~~**ALL traits R3+**: Zero spells above R2~~ → Filled with 12 proposed spells across R3-R5
- ~~**Pride R2+**: Theme drops off after R1~~ → Filled by War Banner (R2), Warrior's Pride (R3), Champion's Challenge/Siege Breaker (R4), Warlord's Presence (R5)
- ~~**Blood R3+**: Only goes to R2~~ → Filled by Ancestral Blade (R3), Blood Frenzy (R4), Avatar of War/Final Triumph (R5)

## Proposed New Spells

### Retaliating Fury

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Attacker | Melee | quick

*When struck in battle, you channel the fury of war into an immediate counterstrike.*

**Effect.** As a Quick Action when targeted by an attack, gain +2 to your Dodge or Parry against the triggering attack. If the attack is melee, you deal +2 physical damage to the attacker as a counterstrike.

> **Design Note**: R1 Quick Action reactive defense. Standardized base (+2 Dodge/Parry) with War's melee counterstrike as secondary effect. No SL scaling — one reliable defensive reaction.

### Righteous Strike

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Melee | —

*You channel divine justice into your weapon strike, punishing those who have wronged your allies.*

**Weak.** Deal +2 physical damage. If the target attacked one of your allies since your last turn, the target also suffers +1 bane on their next attack roll (divine rebuke).
**Strong.** Deal +4 physical damage. The target suffers +1 bane on their next attack roll regardless of whether they attacked an ally.
**Critical.** Deal +6 physical damage. +1 bane on the target's next attack roll. The target is also briefly frightened by your righteous fury.

> **Design Note**: Fills the R0 justice gap. Retaliatory attack that rewards protecting allies. Damage follows R0 scaling (+2/+4/+6). Bane debuff is secondary; frightened added only at Critical.

### Victor's Shout

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Melee | —

*You strike with triumphant conviction, channeling the spirit of victory into your blow and inspiring allies through martial prowess.*

**Weak.** Deal +2 physical damage. You gain +1 movement until end of your turn.
**Strong.** Deal +4 physical damage. +1 movement. If this reduces the target to 0 HP, one ally within close range gains +1 boon on their next attack roll.
**Critical.** Deal +6 physical damage. +1 movement. If this reduces the target to 0 HP, all allies within close range gain +1 boon on their next attack roll.

> **Design Note**: Fills the R0 triumph gap. Attack cantrip with minor movement bonus on any success. Kill-triggered ally inspiration is a secondary reward at Strong/Critical — primary function (attack + movement) works on every hit.

### Shield of Valor

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Self | Self | enchant (short)

*You channel the courage of warriors past, surrounding yourself with an aura of unyielding valor.*

**Weak.** Gain +2 AV (situational bonus) for a short duration. You and allies within melee range are immune to the frightened condition for the duration.
**Strong.** As Weak. You also gain +1 boon on weapon attack rolls for the duration.
**Critical.** As Strong. Any frightened allies within melee range immediately recover from the frightened condition when you cast this spell.

> **Design Note**: Defensive spell for War — "courage in battle" theme. AV bonus (+2) and fear immunity are fixed on any success. SL adds offensive capability (+1 boon) and condition removal as secondary effects.

### Avenging Oath

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Self | Self | enchant (short)

*You swear a divine oath of retribution against a creature that has wronged you or your allies, marking them for justice.*

**Weak.** Choose one enemy you can see. For a short duration, your attacks against the marked target deal +2 weapon damage. If the target damaged one of your allies this scene, this bonus increases to +3.
**Strong.** Damage bonus +3 (or +4 if the target harmed an ally). You also gain +1 boon on attack rolls against the marked target.
**Critical.** Damage bonus +4 (or +5 if harmed ally). +1 boon on attacks. If you reduce the marked target to 0 HP, you regain +4 HP.

> **Design Note**: Fills R2 justice gap. Retribution mechanic — stronger against enemies who hurt allies. Rewards the "protector" playstyle without trivializing encounters. Single-target mark limits to one focus enemy.

### War Banner

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Allies | Close | concentrate, enchant (short)

*You plant your weapon in the ground and channel divine war magic through it, creating a rallying point that inspires all nearby allies.*

**Weak.** All allies within close range gain +2 weapon damage for a short duration. You cannot move while maintaining the banner (your weapon is planted).
**Strong.** As Weak. Allies also gain +1 boon on saves against fear and morale effects.
**Critical.** As Strong. Allies who start their turn within close range also gain +1 movement for that turn.

> **Design Note**: Fills R2 pride/triumph gap. Group buff requiring the caster to remain stationary — meaningful tactical tradeoff. Weapon damage (+2) fixed on any success; SL adds secondary benefits (fear resistance, movement).

### Commander's Shout

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist | Close | —

*You unleash a thunderous shout of divine authority that shakes the resolve of your enemies and steels the hearts of your allies.*

**Weak.** All enemies in close range must save or be frightened for a short duration. All allies in close range gain +2 weapon damage for a short duration.
**Strong.** As Weak. Enemies also suffer +1 bane on all attack rolls for the duration. Allies also gain +1 boon on their next attack roll.
**Critical.** As Strong. Enemies also take +4 blast damage from the shout's force. Allies also gain +1 movement for a short duration.

> **Design Note**: R3 mass buff/debuff. Frightened duration (short) and ally weapon damage (+2) are fixed on any success — SL adds secondary penalties (bane, blast damage) and ally benefits (boon, movement).

### Blood Frenzy

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Self | Self | concentrate, enchant (short)

*You enter a state of controlled battle fury, your blood singing with divine power. Each wound you deal feeds the frenzy.*

**Weak.** For a short duration, you gain +2 weapon damage. Each time you deal damage, you regain +1 HP (once per turn).
**Strong.** Weapon damage bonus increases to +4. HP regain increases to +2 per turn. You gain +1 movement.
**Critical.** Weapon damage +4. HP regain +2 per turn. +1 movement. Your weapon attacks that score a critical hit also inflict bleeding on the target.

> **Design Note**: R4 self-buff — sustained combat enhancement. Life siphon through battle fits the "blood" theme.

### Warlord's Presence

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Self + Allies | Close | concentrate

*You become an avatar of divine war — an inspiring, terrifying presence on the battlefield that turns the tide of battle.*

**Weak.** For a short duration, you emanate an aura of command in a close area. Allies within the aura gain +2 to attack rolls and +2 weapon damage. Enemies that enter the aura must roll Spirit + Fortitude vs. TN 16 or be briefly frightened. You can issue one tactical command per turn as a Quick Action, granting one ally within the aura an extra movement or Quick Action.
**Strong.** As above, and allies also gain +2 to Dodge and Parry while in the aura.
**Critical.** As above, and the aura extends to short area.

> **Design Note**: R5 battlefield command. Core buff (+2 attacks, +2 weapon damage, fear aura, tactical commands) reliable on any success. SL adds defensive bonuses and area expansion.

### Righteous Fury

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Self | Self | enchant (short)

*Divine wrath surges through your veins like molten bronze, and your strikes carry the weight of righteous judgement. Your eyes burn with holy fury, and the unjust tremble before you.*

**Weak.** For a short duration, gain +4 weapon damage on all melee attacks. Attacks against frightened targets deal an additional +2 bonus damage.
**Strong.** Weapon damage bonus increases to +6. Frightened bonus increases to +3. You also gain +1 boon on attack rolls against creatures that have damaged your allies this scene.
**Critical.** Weapon damage +6, frightened bonus +4. +1 boon on attacks vs. ally-harmers. Your melee attacks that score a critical hit also inflict the frightened condition for a short duration.

> **Design Note**: R3 fury/justice capstone — self-buff that synergizes with the fear→exploit loop. The frightened bonus explicitly rewards War's signature combo. Single-target focus distinguishes it from Commander's Shout's group orientation.

### Ancestral Blade

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Self | Close | concentrate, enchant (short)

*You call upon the spirits of fallen warriors, and a spectral weapon materializes beside you — a ghostly blade wielded by an ancestral champion who fights with tireless fury at your command.*

**Weak.** Conjure a spectral weapon in close range that lasts for a short duration. It acts on your initiative and makes one attack per turn, dealing +5 physical damage (vs. Dodge). The spectral blade cannot be targeted by physical attacks.
**Strong.** The spectral blade deals +10 physical damage per attack. It can also make attacks of opportunity against enemies that move through close range.
**Critical.** The blade deals +15 physical damage per attack with attacks of opportunity. Once per scene, the blade can make a sweeping strike hitting all enemies in melee range of it for +5 physical damage each.

> **Design Note**: R3 triumph/blood capstone — spectral ally. The conjured weapon acts as an independent attacker, providing action economy advantage. Concentration prevents stacking with other concentrate spells. The ancestral warrior theme ties into War's blood/triumph identity.

### Warrior's Pride

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Self | Self | enchant (short)

*You channel the war gods' pride in martial excellence, wreathing yourself in golden fire that marks you as a champion beyond equal. Enemies quail before your prowess.*

**Weak.** For a short duration, gain +3 weapon damage and +1 Parry. When you hit an enemy with a melee attack, they suffer +1 bane on their next attack roll (shaken by your prowess).
**Strong.** Weapon damage increases to +5. You also gain +1 Dodge.
**Critical.** Weapon damage +5, +1 Parry, +1 Dodge. Your melee attacks that score a critical hit also briefly daze the target.

> **Design Note**: Fills R3 pride gap. Self-buff emphasizing martial superiority — differentiated from Righteous Fury (fury/justice, fear-synergy focused) by providing defensive bonuses and an enemy debuff on hit. Weapon damage scales by SL (allowed); defensive bonuses and daze are secondary.

### Champion's Challenge

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Medium | enchant (short)

*You point your weapon at a foe and issue a divine challenge that rings with the authority of gods of war. A burning sigil appears on both you and your sworn foe, binding you in single combat.*

**Weak.** Mark one enemy as your sworn foe for a short duration. You gain +4 weapon damage against the marked target. The marked target suffers +1 bane on attack rolls against anyone other than you.
**Strong.** Weapon damage bonus increases to +6. You also gain +1 boon on Dodge and Parry against the marked target's attacks.
**Critical.** Weapon damage +6, +1 boon on your defenses vs. marked target. If you reduce the marked target to 0 HP, all allies who can see you gain +2 weapon damage for a short duration (triumph surge).

> **Design Note**: R4 justice/pride capstone — divine duel mechanic. Forces single combat by punishing the target for attacking others. Mark and bane (+1) are fixed on any success. Weapon damage scales by SL; defensive boon and triumph surge are secondary effects.

### Siege Breaker

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Dodge | Medium | —

*You channel the fury of war into a devastating strike that sunders fortifications, shatters shield walls, and breaks the defenses of even the most entrenched foe. The ground cracks and barriers crumble before divine wrath.*

**Weak.** Deal +10 blast damage to one target or structure. This attack ignores half the target's AV (rounded up). If the target is behind cover, the cover is destroyed. Structures and objects take double damage.
**Strong.** Deal +20 blast damage. Ignore half AV. Cover is destroyed. If the target is using a shield, the shield's AV is reduced by 2 for the rest of the scene (damaged).
**Critical.** Deal +30 blast damage. Ignore half AV. Cover destroyed. Shield AV reduced by 3. The impact creates a shockwave — all creatures within melee range of the target are briefly prone.

> **Design Note**: R4 fury/pride capstone — replaces the previously proposed "Battle Standard" (which was essentially "bigger War Banner"). Siege Breaker introduces a genuinely different concept: anti-fortification single-target destruction. Fills the gap for War's "break through defenses" fantasy. Damage follows R4 single-target scaling (+10/+20/+30). The AV ignore and cover destruction create a unique tactical niche — this is the spell for breaching shield walls, smashing barricades, and ending sieges. If a group buff power increase is desired, use War Banner with heightened Focus instead.

### Avatar of War

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Self | Self | concentrate

*You invoke the ultimate blessing of the war gods, and divine power transforms you into a living avatar of battle. Your form grows, your weapon blazes with holy fire, and wings of golden flame spread from your back. You are War incarnate.*

**Weak.** For a short duration, you transform into an avatar of war. You gain: all attributes increase by 2 die sizes, +4 weapon damage, flight (movement 6), immunity to frightened and charmed conditions, and a damage aura (creatures that start their turn within melee range take +4 fire damage). When you reduce a creature to 0 HP, you gain +2 temporary HP.
**Strong.** As above, but weapon damage bonus increases to +6 and aura damage increases to +6 fire damage.
**Critical.** As above, but weapon damage bonus increases to +8 and aura damage increases to +8 fire damage. Temporary HP from kills increases to +4.

> **Design Note**: R5 war capstone transformation. All transformation features (attribute boost, weapon damage, flight, immunities, damage aura, kill trigger) available on any success. SL scales the numerical values.

### Final Triumph

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Allies | Close | —

*As your foe falls, divine glory erupts from the killing blow in a shockwave of golden light. Your allies feel the surge of righteous victory — wounds close, exhaustion fades, and the will to fight burns brighter than ever.*

**Weak.** When you reduce an enemy to 0 HP, all allies within close range regain +6 HP and gain +2 movement for their next turn. This spell can trigger once per scene.
**Strong.** Allies regain +12 HP, gain +2 movement, and gain +1 boon on their next attack roll.
**Critical.** Allies regain +18 HP, gain +2 movement, +1 boon on next attack, and any frightened or dazed conditions on allies are immediately removed.

> **Design Note**: R5 triumph/blood capstone — victory burst. Kill-triggered mass heal + buff. Once per scene limits abuse. This rewards the War tradition's aggressive playstyle: killing enemies heals and empowers allies. Thematically, the moment of triumph inspires the entire party.

### Triumphant Advance

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Allies | Close | enchant (short)

*You raise your weapon high and let out a thunderous battle cry that echoes with divine authority. Golden light surges forward from your position, and your allies feel an irresistible urge to press the attack — feet moving faster, weapons striking harder, fear melting away before righteous momentum.*

**Effect.** On a success, for a short duration you and all allies within close range gain +2 movement and +2 weapon damage. Allies also ignore difficult terrain while advancing toward enemies (moving closer). If an ally reduces an enemy to 0 HP during this effect, they immediately gain +1 boon on their next attack roll.

> **Design Note**: Fills R4 triumph gap. Communal advance buff — allies push forward together. Primary effect (movement, weapon damage, terrain ignore) is reliable on any success. Kill trigger provides snowball momentum fitting War's triumph identity. Doesn't scale by SL — one predictable tactical buff.

### Divine Retribution

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Long | material cost (5,000 coins)

*You invoke the ultimate judgment of the war gods upon a creature that has committed grievous wrongs — betrayed allies, broken oaths, or committed atrocities. A pillar of golden fire descends from the heavens, burning away falsehood and punishing the guilty.*

**Weak.** Deal +12 radiant damage to one target. If the target has harmed any of your allies during this encounter, deal an additional +6 damage (total +18). The target is briefly dazed.
**Strong.** Deal +24 radiant damage (+30 if they harmed allies). The target is dazed for a short duration. Any enchantments, buffs, or magical protections on the target are dispelled.
**Critical.** Deal +36 radiant damage (+42 if they harmed allies). Dazed for short duration. Enchantments dispelled. The target is branded with a mark of justice for a short duration — attacks against the branded target gain +1 boon.

> **Design Note**: R5 justice capstone — divine punishment. Bonus damage vs. enemies who harmed allies creates a revenge/justice mechanic. Daze condition reliable on any success. Damage scales by SL. Dispel effect adds utility. Material cost 5,000 coins for R5 economy. Radiant damage type (unusual for War but fitting for divine judgment).

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
2. **Pride chain**: Mighty Strike (R0) → Heroic Weapon (R1) → War Banner (R2) → Warrior's Pride (R3) → Champion's Challenge/Siege Breaker (R4) → Warlord's Presence (R5) — **complete R0-R5**
3. **Blood chain**: Spectral Slash (R0) → Tear Wound/Curse of War (R1) → Blood Sacrifice (R2) → Ancestral Blade (R3) → Blood Frenzy (R4) → Avatar of War/Final Triumph (R5) — **complete R0-R5**
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
- [x] **All aspects covered R0-R5**: 30/30 (100%)
