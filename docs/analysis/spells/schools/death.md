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

### Trait Coverage Gaps

| Trait | R0 | R1+ | Gap |
|-------|-----|------|-----|
| plagues | ❌ | ❌ | No plague/disease spells at any rank |
| curses | ❌ | ✅ (R1+) | No R0 curse cantrip |
| fear | ✅ | ✅ | — |
| decay | ✅ | ✅ | — |
| ancestry | ✅ | ✅ | — |

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

> **Design Note**: R1 utility spell — fills the utility/non-combat gap. Ritual requirement prevents combat use.

### Plague Wind

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Long | concentrate

*You unleash a howling wind carrying the essence of plague and decay, withering all life it touches.*

**Weak.** All creatures in a short area take +6 necrotic damage and are briefly poisoned.
**Strong.** All creatures take +12 necrotic damage and are poisoned for a short duration. Poisoned creatures lose 2 HP at the start of each of their turns.
**Critical.** All creatures take +18 necrotic damage and are poisoned for a short duration. Poisoned creatures lose 4 HP at the start of each turn and cannot benefit from healing for the duration.

> **Design Note**: R5 capstone. AoE uses half single-target scaling (+6/+12/+18). The heal-blocking effect at critical is the Death tradition's signature anti-healing identity.
