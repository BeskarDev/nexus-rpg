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
| plagues | ❌ **GAP** | — | Cloud of Sickness | — | — | — |
| curses | ❌ **GAP** | Curse of Death | — | — | — | — |
| fear | Glimpse of Mortality | Early Grave, Shivering Ray | — | Death's Door | — | — |
| decay | Decay, Chill Touch, Enfeebling Touch | Necrotic Weapon, Rotting Grasp, Blood Shards | Circle of Death | Grave's Bloom | — | — |
| ancestry | Spared from Death | — | — | — | — | — |

**Coverage**: 12/30 slots filled (40%) — decay is strong, but plagues/curses/ancestry severely under-served

**Critical Gaps**:
- **Plagues R0-R1**: No disease/pestilence cantrip or low-level spell — only Cloud of Sickness at R2
- **Curses R0**: No curse cantrip — first curse is R1 (Curse of Death)
- **Ancestry R1+**: Only one R0 spell — communing with ancestors and death rites are a thematic pillar with almost no spells
- **All traits R3+**: Only 2 R3 spells, zero R4-R5
- **Plagues R3+**: No high-rank plague magic at all

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

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Plagues chain**: Miasma (R0 proposed) → Festering Wound (R1 proposed) → Cloud of Sickness (R2) → Spreading Contagion (R3 proposed) → *gap at R4* → Plague Wind (R5 proposed) — near-complete
2. **Curses chain**: Minor Hex (R0 proposed) → Curse of Death (R1) → *gap at R2-R5* — needs significant expansion
3. **Fear chain**: Glimpse of Mortality (R0) → Early Grave/Shivering Ray (R1) → *gap at R2* → Death's Door (R3) → *gap at R4-R5*
4. **Decay chain**: Decay/Chill Touch/Enfeebling Touch (R0) → Necrotic Weapon/Rotting Grasp/Blood Shards (R1) → Circle of Death (R2) → Grave's Bloom (R3) → *gap at R4-R5*
5. **Ancestry chain**: Spared from Death (R0) → Commune with Ancestors (R1 proposed) → Ancestral Guardian (R2 proposed) → *gap at R3-R5*

### Setup + Payoff Combos
- ✅ **Poison → Decay**: Miasma (R0) poisons target → Festering Wound (R1) deals bonus to injured/poisoned creatures with heal-reduction
- ✅ **Curse stacking**: Minor Hex (R0) + Curse of Death (R1) → multiple debuffs compound, increasing vulnerability
- ⚠️ **Ancestry → guidance**: Commune with Ancestors provides info and Ancestral Guardian provides combat aid, but they don't explicitly chain together
- ❌ **Fear → curse link**: No mechanic connecting the frightened condition to enhanced curse effectiveness

### Design Completeness Checklist
- [x] R1 Quick Action: Death's Rebuke (R1 proposed) — retaliatory necrotic damage with poison
- [x] Defensive options: Death's Rebuke (R1 proposed retaliatory), Spared from Death (R0 death-prevention)
- [x] Utility: Commune with Ancestors (R1 proposed), Ancestral Guardian (R2 proposed)
- ⚠️ Damage across ranks: R0-R3 well-covered, R5 Plague Wind — but R4 has no damage spell
- [x] Repeating conditions: Poisoned, frightened, bleeding, cursed (bane debuff) — strong condition variety
- ⚠️ Setup+payoff: Poison→decay is explicit and well-supported; curse stacking is conceptual but needs more curse spells at R2+ to fully deliver
- ⚠️ **Remaining gaps**: Curses R2-R5, Fear R2/R4+, Decay R4+, Ancestry R3+, R4 damage spell

### Impact & Trivialization Review
- **Commune with Ancestors (R1 spirit guidance)**: Moderate risk — information from the dead could shortcut investigation scenes. **Mitigations**: ritual (10 min) prevents combat use, answers are GM-mediated and can be cryptic, limited to what the dead would know, only 1-2 questions per casting. This provides leads rather than solutions — the party still needs to investigate, verify, and act on the information. GMs should treat it as an additional clue source, not a mystery-solver.
