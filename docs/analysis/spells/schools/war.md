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
4. **Critical gaps**: No defensive spells, minimal utility, no R3+ spells (only R0–R2), "justice" and "triumph" traits under-covered
5. War is severely undersized (11 spells) — needs significant expansion at R3–R5

### Internal Synergies
- **Fear → Exploit**: Frighten enemy → attacks against frightened targets deal bonus damage
- **Weapon blessing → Crit trigger**: Blessed weapon crits apply bleeding
- **Battle chain**: War Cry (R1 fear) → Weapon buff → Fear-empowered attacks

## Current Spell Inventory (11 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Battle Surge, Mighty Strike, Spectral Slash |
| 1 | 5 | Curse of War, Heroic Weapon, Tear Wound, War Cry, Weapon Spirit |
| 2 | 3 | Ancestral Warriors, Blood Sacrifice, Haste |
| 3–5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| fury | Battle Surge | War Cry | Haste | — | — | — |
| pride | Mighty Strike | Heroic Weapon | — | — | — | — |
| blood | Spectral Slash (⚠️ weak) | Tear Wound, Curse of War | Blood Sacrifice | — | — | — |
| justice | ❌ **GAP** | — | — | — | — | — |
| triumph | ❌ **GAP** | Weapon Spirit | Ancestral Warriors | — | — | — |

**Coverage**: 8/30 slots filled (27%) — smallest and most gap-heavy school in the entire system

**Critical Gaps**:
- **Justice**: Zero spells at any rank — retribution and righteous punishment completely absent
- **Triumph R0**: No victory/morale cantrip
- **ALL traits R3+**: War has zero spells above R2 — the most combat-focused tradition lacks high-rank battle magic
- **Pride R2+**: Weapon enhancement theme drops off after R1
- **Blood R3+**: Blood magic only goes to R2

## Proposed New Spells

### Righteous Strike

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Dodge | Melee | —

*You channel divine justice into your weapon strike, punishing those who attacked your allies.*

**Weak.** Deal +2 damage to a target that attacked one of your allies since your last turn.
**Strong.** Deal +4 damage. If the target damaged your ally, you also gain +1 boon on the attack.
**Critical.** Deal +6 damage with +1 boon. If this attack hits, the target is briefly frightened by your righteous fury.

> **Design Note**: Fills the R0 justice gap. Retaliatory attack that rewards protecting allies.

### Victor's Rush

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Self | Self | —

*The thrill of victory surges through you as you fell an opponent, propelling you forward.*

**Weak.** When you reduce an enemy to 0 HP, gain +1 movement for the rest of your turn.
**Strong.** Gain +2 movement and +1 boon on your next attack this turn.
**Critical.** Gain +2 movement, +1 boon on next attack, and you regain 2 HP from the rush of triumph.

> **Design Note**: Fills the R0 triumph gap. Kill trigger reward.

### Shield of Valor

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Self | Self | enchant (short)

*You channel the courage of warriors past, surrounding yourself with an aura of unyielding valor.*

**Weak.** Gain +2 AV (situational bonus) for a short duration. You are immune to the frightened condition for the duration.
**Strong.** AV bonus increases to +3. You also grant allies within melee range +1 boon on saves against fear.
**Critical.** AV bonus +3. Fear immunity. Allies in melee range are also immune to the frightened condition for the duration.

> **Design Note**: Defensive spell for War — "courage in battle" theme. Addresses the missing defensive options.

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

**Weak.** All allies within close range gain +1 weapon damage for a short duration. You cannot move while maintaining the banner (your weapon is planted).
**Strong.** Weapon damage bonus increases to +2. Allies also gain +1 boon on Morale/fear saves.
**Critical.** Weapon damage +2, +1 boon on Morale. Allies who start their turn within close range gain +1 movement for that turn.

> **Design Note**: Fills R2 pride/triumph gap. Group buff requiring the caster to remain stationary — meaningful tactical tradeoff. Planted weapon prevents casting other spells or attacking.

### Commander's Shout

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist | Close | —

*You unleash a thunderous shout of divine authority that shakes the resolve of your enemies and steels the hearts of your allies.*

**Weak.** All enemies in close range must save or be briefly frightened. All allies in close range gain +1 boon on their next attack roll.
**Strong.** Enemies are frightened for a short duration. Allies gain +2 to weapon damage for a short duration.
**Critical.** Enemies are frightened for a short duration and suffer +1 bane on all rolls. Allies gain +2 weapon damage and +1 movement for a short duration.

> **Design Note**: R3 mass buff/debuff — the first R3 spell for War. Combines fear control with ally empowerment. Named distinctly from R1 War Cry.

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

**Weak.** For a brief duration: you gain +2 to all attributes, +4 weapon damage, and enemies within close range must save or be briefly frightened. Allies within close range gain +1 to all attack rolls.
**Strong.** Duration extends to short. Your bonuses: +2 attributes, +4 weapon damage. Enemy fear lasts for a short duration. Allies gain +2 to all attack rolls and +2 weapon damage.
**Critical.** Duration short. All bonuses as Strong. Additionally, once per turn you can make an additional weapon attack as a Quick Action. Frightened enemies that attempt to flee provoke attacks of opportunity from all allies.

> **Design Note**: R5 capstone — avatar of war transformation. Mass buff + self-enhancement + fear aura. Concentration limits other spellcasting.
