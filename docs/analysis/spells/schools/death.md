# Death — Spell School Design Space

## School Identity

**Tradition**: Death (Mystic)
**Traits**: plagues, curses, fear, decay, ancestry
**Identity**: Natural ending and ancestral respect — accepting the necessity of endings and testing the worthy
**Role Spread**: Excels: Control | Decent: Offense, Utility | Weak: Healing, Support, Defense

### Mechanical Identity
- **Primary Conditions**: Poisoned, decayed (attribute reduction), cursed (ongoing penalties), frightened
- **Signature Gimmick**: Curse stacking and plague — multiple minor curses build toward major afflictions
- **Damage Types**: Necrotic, Poison, Acid

### Design Principles
1. Death is the mystic counterpart to Necromancy — focuses on curses/disease rather than undead
2. Fear effects provide battlefield control
3. Ancestral communion provides unique utility (speaking with the dead)
4. **Gaps**: No R1 Quick Action reactive spell, limited utility/non-combat, "plagues" and "curses" lack R0 representation
5. Damage is efficient but condition-focused — necrotic with ongoing effects

### Internal Synergies
- **Curse stacking**: Apply multiple minor curses → build toward major affliction
- **Poison → Decay**: Poison target → decay spells deal enhanced damage to poisoned creatures
- **Ancestry**: Commune with dead → gain knowledge/advantage

## Current Spell Inventory (15 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 5 | Chill Touch, Decay, Enfeebling Touch, Glimpse of Mortality, Spared from Death |
| 1 | 6 | Blood Shards, Curse of Death, Early Grave, Necrotic Weapon, Rotting Grasp, Shivering Ray |
| 2 | 2 | Circle of Death, Cloud of Sickness |
| 3 | 2 | Death's Door, Grave's Bloom |
| 4–5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| plagues | Miasma | Festering Wound | Cloud of Sickness | Spreading Contagion | Pestilence | Plague Wind |
| curses | Minor Hex | Curse of Death | — | — | Greater Curse | — |
| fear | Glimpse of Mortality | Early Grave, Shivering Ray | — | Death's Door | — | — |
| decay | Decay, Chill Touch, Enfeebling Touch | Necrotic Weapon, Rotting Grasp, Blood Shards | Circle of Death | Grave's Bloom | — | Death's Dominion |
| ancestry | Spared from Death | Commune with Ancestors | Ancestral Guardian | — | Ancestral Judgment | Ancestral Army |

**Coverage** (existing + proposed): 22/30 slots filled (73%) — plagues and ancestry now complete R0-R5

**Remaining Gaps**:
- **Curses R2-R3, R5**: Minimal expansion beyond R1 — curse stacking needs more mid-rank tools
- **Fear R2, R4-R5**: Fear gaps at mid and high ranks
- **Decay R4**: No R4 decay spell

## Proposed New Spells

### Miasma

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Resist | Close | —

*You exhale a wisp of sickly green mist that saps the vitality of those who breathe it.*

**Weak.** The target feels briefly nauseous. They suffer +1 bane on their next physical action (attack, athletics, etc.).
**Strong.** The target is briefly poisoned.
**Critical.** The target is poisoned for a short duration and suffers +1 bane on their next Fortitude check.

> **Design Note**: Fills the R0 plagues gap. Disease/sickness cantrip that introduces the poisoned condition.

### Minor Hex

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Resist | Medium | —

*You whisper a brief malediction, placing a minor curse upon your target.*

**Weak.** The target suffers +1 bane on their next roll of any kind.
**Strong.** The target suffers +1 bane on their next two rolls.
**Critical.** The target suffers +1 bane on all rolls until the end of their next turn.

> **Design Note**: Fills the R0 curses gap. Minor curse cantrip — versatile debuff that supports the curse-stacking identity.

### Death's Rebuke

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Attacker | Melee | quick

*When struck, you channel the cold touch of death back through the wound, punishing your attacker.*

**Weak.** As a Quick Action when you take damage from a melee attack, the attacker takes +2 necrotic damage (ignoring AV).
**Strong.** The attacker takes +4 necrotic damage and is briefly poisoned.
**Critical.** The attacker takes +6 necrotic damage, is poisoned for a short duration, and you regain +2 HP from the life energy drained.

> **Design Note**: Fills the missing R1 Quick Action reactive spell for Death. Retaliatory necrotic damage with poison synergy.

### Commune with Ancestors

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Medium TN | Self | ritual (10 minutes)

*You enter a meditative trance, reaching out to the spirits of the dead for guidance.*

**Weak.** You contact a vague ancestral presence. You can ask one yes/no question about a topic the dead would know about. The answer is correct but may be cryptic.
**Strong.** You contact a clearer presence. You can ask one open-ended question and receive a brief, helpful answer.
**Critical.** You contact a strong ancestral presence. You can ask two questions and receive clear, detailed answers. You also gain +1 boon on your next roll related to the information gained.

> **Design Note**: R1 utility spell — fills the ancestry R1+ gap. Ritual requirement prevents combat use. Information is helpful but limited — the GM controls how much is revealed, preventing it from bypassing investigation or exploration scenes.

### Festering Wound

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | vs. Resist | Close | —

*You infect a creature's wounds with supernatural disease, causing them to fester and spread.*

**Weak.** One creature that is currently bleeding or has taken damage this scene takes +2 poison damage and is briefly poisoned.
**Strong.** Deal +4 poison damage. The target is poisoned for a short duration. While poisoned, any healing they receive is halved.
**Critical.** Deal +6 poison damage. Poisoned for a short duration with halved healing. If the target is below half HP, the poison worsens — they lose 1 HP at the start of each of their turns.

> **Design Note**: Fills R1 plagues gap. Requires the target to already be injured — rewards focus fire and pairs with the Death tradition's decay theme. Heal-reduction is a signature Death mechanic.

### Ancestral Guardian

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Self or ally | Close | enchant (short)

*You call upon an ancestral spirit to watch over and protect a creature, guiding their actions.*

**Weak.** One creature gains +1 boon on their next attack roll or skill check within a short duration. The guardian whispers guidance audible only to the target.
**Strong.** The target gains +1 boon on their next two rolls. The guardian also provides +1 boon on saves against fear and charm effects.
**Critical.** +1 boon on the next three rolls. Fear/charm save bonus. The guardian can also absorb the first 4 points of damage the target takes.

> **Design Note**: Fills R2 ancestry gap. Ancestral protection and guidance — a support spell that fits Death's communal ancestor theme. Limited boon charges prevent over-stacking.

### Spreading Contagion

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist | Medium | concentrate

*You release a virulent magical disease that spreads from creature to creature.*

**Weak.** One target is afflicted with a supernatural disease for a short duration. They are poisoned and suffer +1 bane on all physical rolls. At the end of each of their turns, one creature within melee range of them must save vs. Resist or also contract the disease.
**Strong.** As Weak, but the disease lasts for a medium duration and the spreading range increases to close. Infected creatures also lose 2 HP at the start of each of their turns.
**Critical.** As Strong, but infected creatures lose 3 HP per turn and suffer +2 banes on physical rolls. The initial target cannot benefit from healing for the duration.

> **Design Note**: Fills R3 plagues gap. Spreading disease is the plague fantasy — rewarding clustering punishment. Concentration limits the caster's other actions. Compare to Plague Wind (R5) which is the ultimate mass-plague capstone.

### Plague Wind

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Long | concentrate

*You unleash a howling wind carrying the essence of plague and decay, withering all life it touches.*

**Weak.** All creatures in a short area take +6 necrotic damage and are briefly poisoned.
**Strong.** All creatures take +12 necrotic damage and are poisoned for a short duration. Poisoned creatures lose 2 HP at the start of each of their turns.
**Critical.** All creatures take +18 necrotic damage and are poisoned for a short duration. Poisoned creatures lose 4 HP at the start of each turn and cannot benefit from healing for the duration.

> **Design Note**: R5 capstone. AoE uses half single-target scaling (+6/+12/+18). The heal-blocking effect at critical is the Death tradition's signature anti-healing identity.

### Greater Curse

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Medium | enchant (medium)

*You speak a malediction of terrible power, weaving ancestral dread into a curse that saps the very essence of your target.*

**Weak.** One attribute of your choice (Strength, Agility, Spirit, or Mind) is reduced by one die size for a medium duration. The target feels the curse as a gnawing dread — they know they have been cursed.
**Strong.** The chosen attribute is reduced by one die size. The target also suffers +1 bane on all rolls using the cursed attribute for the duration.
**Critical.** The chosen attribute is reduced by two die sizes (minimum d4). The target suffers +1 bane on all rolls using the cursed attribute. Removing the curse requires a successful dispel at R4 or higher.

> **Design Note**: R4 curses trait capstone. Attribute reduction is a powerful debuff but targets a single attribute and allows a Resist save. Medium duration means it lasts through an encounter but not indefinitely. The curse-stacking identity is fulfilled — Minor Hex (R0 bane) → Curse of Death (R1 ongoing) → Greater Curse (R4 attribute drain).

### Pestilence

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Medium | concentrate

*You release a virulent cloud of supernatural plague — a sickly green miasma that chokes the air and rots flesh on contact.*

**Weak.** All creatures in a short area take +5 poison damage and are briefly poisoned. Poisoned creatures cannot benefit from healing for the duration.
**Strong.** Damage increases to +10. Creatures are poisoned for a short duration with healing blocked. Poisoned creatures also lose 2 HP at the start of each of their turns.
**Critical.** Damage increases to +15. Poisoned for a short duration with healing blocked. HP loss increases to 4 per turn. Creatures that drop to 0 HP from the plague cannot be revived for a short duration.

> **Design Note**: R4 plagues trait capstone. AoE damage at half single-target R4 scaling (+5/+10/+15). Anti-healing is Death's signature mechanic. Concentration limits other spellcasting. Bridges Spreading Contagion (R3 single-target spreading) and Plague Wind (R5 mass devastation).

### Ancestral Judgment

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Long | —

*You call upon the spirits of the dead to pass judgment on a creature — spectral ancestors materialize around the target, their hollow eyes burning with ancient authority.*

**Weak.** Deal +5 necrotic damage (+10 vs. undead). The target is briefly dazed as ancestral voices assail their mind.
**Strong.** Deal +10 necrotic damage (+20 vs. undead). The target is dazed for a short duration. If the target is undead, they are also briefly frightened of you.
**Critical.** Deal +15 necrotic damage (+30 vs. undead). The target is stunned for a short duration. Undead targets are frightened for a short duration. You gain +1 boon on your next attack or spell against the judged target.

> **Design Note**: R4 ancestry trait offensive option. Base damage at half single-target scaling (+5/+10/+15) with double vs. undead (+10/+20/+30), mirroring Light's Blinding Radiance. The daze/stun conditions fit the ancestry theme — overwhelmed by ancestral authority.

### Death's Dominion

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Self | Self | concentrate

*You become an avatar of death — your eyes become hollow voids, your touch carries the chill of the grave, and the boundary between life and death bends to your will.*

**Weak.** For a brief duration, you gain immunity to necrotic and poison damage. Your melee attacks deal an additional +6 necrotic damage (ignoring AV). When any creature dies within medium range, it immediately rises as an undead under your control (Tier 1, lasts until end of the spell).
**Strong.** Duration extends to short. Risen undead are Tier 2. You also gain resistance to all other damage types (reduce by 4). Allies within close range gain +2 to Resist against fear and death effects.
**Critical.** Duration extends to short. Risen undead are Tier 3. Damage resistance increases to 6. Once during the duration, you can use an Action to channel a wave of necrotic energy — all living creatures within close range take +10 necrotic damage (vs. Resist).

> **Design Note**: R5 death capstone. Transforms the caster into a battlefield terror. The undead-raising mechanic rewards killing blows — but risen undead are temporary and limited in tier. Concentration and duration limits prevent permanent army-building. The +6 melee necrotic bonus is modest (matches half R5 single-target scaling).

### Ancestral Army

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Special | Close | material cost (500 coins)

*You perform a solemn rite of ancestral summoning, calling forth the honored dead to fight alongside the living. Spectral warriors materialize from mist, bearing weapons of ghostly silver.*

**Weak.** Summon 3 spectral ancestor warriors in close range. Each warrior is Tier 2, acts on your initiative, and lasts for a short duration. Warriors deal necrotic damage and can be targeted normally (they have spectral HP). They follow your verbal commands.
**Strong.** Summon 4 spectral warriors at Tier 2, or 3 warriors at Tier 3. Duration extends to short. Warriors gain +1 boon on attack rolls against undead enemies.
**Critical.** Summon 6 spectral warriors at Tier 2, or 4 warriors at Tier 3. Duration extends to short. Warriors gain +1 boon on attack rolls and can absorb one attack that would hit an ally (each warrior can do this once).

> **Design Note**: R5 ancestry/combat capstone. The summoned warriors provide action economy and battlefield presence. Material cost (500 coins) prevents casual use. Short duration and tier limits keep power bounded — these are spectral soldiers, not an unstoppable army. Compare to Death's Dominion (R5 personal transformation) as the alternative R5 combat option.

## Cross-School Spell Sharing

**No sharing recommended with Necromancy discipline.**

Despite both schools dealing with death and the dead, Death and Necromancy have fundamentally opposed philosophies that should produce mechanically distinct spells:
- **Death** (mystic): Reverential acceptance of endings — honoring ancestors, guiding the dead, channeling the natural death cycle respectfully
- **Necromancy** (arcane): Transgressive defilement and exploitation — puppeting corpses, siphoning life force, violating the natural order for personal gain

Even spells with similar concepts (e.g., raising the dead) should function differently: Death calls willing ancestral spirits to serve while Necromancy forcibly puppets corpses. Sharing spells between these schools would undermine their distinct identities.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Plagues chain**: Miasma (R0) → Festering Wound (R1) → Cloud of Sickness (R2) → Spreading Contagion (R3) → Pestilence (R4) → Plague Wind (R5) — **complete R0-R5**
2. **Curses chain**: Minor Hex (R0) → Curse of Death (R1) → *gap at R2-R3* → Greater Curse (R4) → *gap at R5* — functional with mid-rank gap
3. **Fear chain**: Glimpse of Mortality (R0) → Early Grave/Shivering Ray (R1) → *gap at R2* → Death's Door (R3) → *gap at R4-R5* — mid-rank gaps
4. **Decay chain**: Decay/Chill Touch/Enfeebling Touch (R0) → Necrotic Weapon/Rotting Grasp/Blood Shards (R1) → Circle of Death (R2) → Grave's Bloom (R3) → *gap at R4* → Death's Dominion (R5) — near-complete
5. **Ancestry chain**: Spared from Death (R0) → Commune with Ancestors (R1) → Ancestral Guardian (R2) → *gap at R3* → Ancestral Judgment (R4) → Ancestral Army (R5) — near-complete, R3 gap only

### Setup + Payoff Combos
- ✅ **Poison → Decay → Plague**: Miasma (R0 poison) → Festering Wound (R1 enhanced vs. poisoned) → Spreading Contagion (R3 spreading disease) → Pestilence (R4 AoE plague) → Plague Wind (R5 mass devastation) — the complete plague escalation
- ✅ **Curse stacking**: Minor Hex (R0 bane) → Curse of Death (R1 ongoing penalty) → Greater Curse (R4 attribute drain) — curses compound to cripple targets
- ✅ **Ancestry chain**: Commune with Ancestors (R1 information) → Ancestral Guardian (R2 protection) → Ancestral Judgment (R4 offense) → Ancestral Army (R5 summoning) — ancestors serve as advisors, protectors, judges, and warriors
- ✅ **Death mastery**: Death's Dominion (R5 avatar transformation) + Pestilence (R4 AoE plague) — kill with plague, raise the dead, unstoppable capstone combo
- ⚠️ **Fear → curse link**: No mechanic connecting the frightened condition to enhanced curse effectiveness

### Design Completeness Checklist
- [x] **R1 Quick Action**: Death's Rebuke — retaliatory necrotic damage with poison
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 7, R1: 9, R2: 3, R3: 3, R4: 3, R5: 3)
- [x] Defensive options: Death's Rebuke (R1 retaliatory), Spared from Death (R0 death-prevention), Ancestral Guardian (R2 protective spirit)
- [x] Utility: Commune with Ancestors (R1 divination), Ancestral Guardian (R2 guidance)
- [x] Damage across ranks: R0-R5 fully covered — Ancestral Judgment and Pestilence fill the critical R4 gap, Death's Dominion and Plague Wind provide R5 options
- [x] Repeating conditions: Poisoned, frightened, cursed (bane debuff), dazed, stunned — strong condition variety
- ✅ Setup+payoff: Poison → decay and curse stacking chains are strong and explicit; ancestry chain provides clear progression from utility to combat
- ⚠️ **Remaining gaps**: Curses R2-R3/R5, Fear R2/R4-R5, Decay R4

### Impact & Trivialization Review
- **Greater Curse (R4 attribute reduction)**: High risk — reducing an attribute by one die size is a powerful debuff. **Mitigations**: vs. Resist save, single target, medium duration (not permanent), only one attribute affected. At R4 this is appropriate power — it requires significant Focus investment and can be dispelled.
- **Pestilence (R4 AoE plague)**: Moderate risk — AoE poison + healing block is very strong in combat. **Mitigations**: concentration required, short area, damage at half single-target scaling (+5/+10/+15). The healing block is Death's signature but can be cleansed by Life tradition magic.
- **Ancestral Judgment (R4 anti-undead)**: Low risk — single-target damage with condition. Mirrors Light's Blinding Radiance with necrotic flavor. Daze/stun are standard R4 conditions.
- **Death's Dominion (R5 avatar)**: High risk — immunity to necrotic/poison + auto-raising undead is very powerful. **Mitigations**: concentration (can be broken), brief/short duration, risen undead are temporary and low-tier, R5 Focus cost (10). The transformation is dramatic but time-limited — not a permanent state.
- **Ancestral Army (R5 summoning)**: Moderate risk — summoning multiple combatants is a strong action-economy advantage. **Mitigations**: material cost (500 coins), short duration, warriors are Tier 2-3 (appropriate for R5 content), limited commands. Cannot be sustained indefinitely.
- **Commune with Ancestors (R1 spirit guidance)**: Moderate risk — information from the dead could shortcut investigation scenes. **Mitigations**: ritual (10 min) prevents combat use, answers are GM-mediated and can be cryptic, limited to what the dead would know, only 1-2 questions per casting.
