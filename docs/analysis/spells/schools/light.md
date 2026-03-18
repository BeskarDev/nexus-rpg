# Light — Spell School Design Space

## School Identity

**Tradition**: Light (Mystic)
**Traits**: sun, illumination, truth, clarity, judgement
**Identity**: Reverent revelation and purification — banishing darkness, lies, and corruption
**Role Spread**: Excels: Support | Decent: Offense, Healing | Weak: Utility, Defense, Control

### Mechanical Identity
- **Primary Conditions**: Blinded (radiance), revealed (remove invisibility), burning (holy fire)
- **Signature Gimmick**: Anti-undead and truth revelation — revealing hidden things and purifying corruption
- **Damage Types**: Radiant, Fire, Blast

### Design Principles
1. Light is the primary anti-undead and anti-illusion tradition
2. Support comes through blessings, truth-telling, and curse-breaking
3. Healing is secondary but present (Solar Flare, Blessing of Dawn)
4. Offensive spells primarily use radiant damage — especially effective against undead
5. Truth/revelation effects provide social and exploration utility

### Internal Synergies
- **Reveal → Destroy**: Reveal invisible/hidden targets → follow-up attacks against revealed targets gain bonuses
- **Bless → Enhance**: Blessing of Light/Dawn → allies gain enhanced actions
- **Anti-undead chain**: Radiant Weapon → Destroy Undeath → Turn Greater Undead

## Current Spell Inventory (18 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 4 | Dazzling Light, Detect Lies, Illuminated Sight, Revealing Burst |
| 1 | 8 | Blessing of Light, Locate Trinket, Protect from Influence, Radiant Burst, Radiant Weapon, Sense Spirits (incomplete), Sun Sphere, True Strike |
| 2 | 3 | Break Curse, Destroy Undeath, Sunbeam |
| 3 | 3 | Blessing of Dawn, Purifying Light, Solar Flare |
| 4–5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| sun | Dazzling Light | Sun Sphere, Radiant Weapon | Sunbeam | Solar Flare | — | — |
| illumination | Illuminated Sight | Blessing of Light, Locate Trinket | — | Blessing of Dawn | — | — |
| truth | Detect Lies | Protect from Influence | Break Curse | — | — | — |
| clarity | ❌ **GAP** | — | — | — | — | — |
| judgement | ❌ **GAP** | — | — | — | — | — |

**Coverage**: 11/30 slots filled (37%) — decent at R0-R1, thin above R2

**Critical Gaps**:
- **Clarity**: Zero spells at any rank — mental clarity and condition removal absent
- **Judgement**: Zero spells at any rank — divine authority/justice absent
- **Illumination R2**: Gap between R1 and R3
- **Truth R3+**: No high-rank truth magic
- **All traits R4-R5**: No spells above R3

## Proposed Spell Changes

### Purifying Light — Damage Reduction

**Current**: +6/+12/+18 AoE cone at Rank 3
**Proposed**: Reduce to **+4/+8/+12** to match half single-target scaling for multi-target R3
**Rationale**: R3 multi-target should be +4/+8/+12 under revised scaling.

## Proposed New Spells

### Moment of Clarity

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Ally | Close | —

*You touch a creature's brow with radiant light, briefly cutting through mental fog and confusion.*

**Weak.** End one of the following conditions affecting the target: dazed, confused, or frightened. The condition ends briefly (it returns at the end of the target's next turn if the source persists).
**Strong.** End one of the above conditions. It does not return for a short duration even if the source persists.
**Critical.** End up to two of the above conditions for a short duration.

> **Design Note**: Fills the R0 clarity gap. Condition removal at cantrip level — limited to mental conditions, brief duration.

### Stern Gaze

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Resist | Close | —

*Your eyes flash with divine judgement, compelling a creature to pause and face your authority.*

**Weak.** The target hesitates briefly. They suffer +1 bane on their next attack roll.
**Strong.** The target is briefly dazed as they feel the weight of divine scrutiny.
**Critical.** The target is briefly dazed and cannot willingly move away from you until the end of their next turn.

> **Design Note**: Fills the R0 judgement gap. Divine authority as a minor control cantrip.

### Zone of Truth

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist | Close | concentrate

*You create a zone of divine radiance where falsehood is impossible. All creatures within the area feel compelled to speak truthfully.*

**Weak.** Create a zone in close range lasting a short duration. Creatures within the zone must succeed on a Spirit + Fortitude check vs. your casting result to knowingly speak a lie. On failure, they must speak truthfully or remain silent.
**Strong.** Duration extends to medium. Creatures suffer +1 bane on attempts to resist the truth compulsion.
**Critical.** Duration extends to medium. Creatures suffer +2 banes on resistance. You can sense when a creature successfully resists (you know they chose silence over truth).

> **Design Note**: R3 truth spell. Area truth compulsion is a significant social tool but does NOT replace interrogation — targets can remain silent, and the zone requires concentration. Compare to Binding Word (Peace R0) which compels one statement, and Zone of Truth which compels ongoing truth within an area. Social scenes still require Influence and Insight checks for effective questioning.

### Clarity of Purpose

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Ally | Close | —

*You flood an ally's mind with divine clarity, burning away mental fog and enchantment.*

**Weak.** End one of the following conditions on a willing creature: charmed, confused, dazed, or frightened. If the condition was caused by magic, the source must succeed on a Spirit + casting skill check or the dispel is permanent.
**Strong.** End up to two of the above conditions. If the conditions were magically caused, the source suffers +1 bane on the resistance check.
**Critical.** End all of the above conditions. Magical sources automatically fail the resistance check. The target also gains +2 to Resist against mental conditions for a short duration.

> **Design Note**: Fills R2 clarity gap. Upgrades Moment of Clarity (R0) from brief condition suppression to proper condition removal. Appropriate for R2 — dispelling another caster's work costs Focus and a turn.

### Divine Judgement

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Long | —

*You call down divine judgement upon a creature, searing them with holy radiance proportional to their transgressions.*

**Weak.** Deal +10 radiant damage. If the target is undead or a spirit, deal +15 instead. The target is briefly blinded.
**Strong.** Deal +20 radiant damage (undead/spirits: +30). The target is blinded for a short duration.
**Critical.** Deal +30 radiant damage (undead/spirits: +45). The target is blinded for a short duration and cannot benefit from invisibility or concealment for the duration.

> **Design Note**: Fills R4 judgement gap. Light's first dedicated high-rank offensive spell. The anti-undead bonus multiplier continues the signature theme. Radiant damage against undead/spirits is Light's primary offensive niche.

### Radiant Convergence

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Dodge | Long | concentrate

*You call down a concentrated beam of divine radiance from the heavens, a pillar of searing light that burns away darkness and corruption.*

**Weak.** A pillar of light strikes a short area. All creatures in the area take +6 radiant damage. Undead take +12 radiant damage instead.
**Strong.** All creatures take +12 radiant damage (undead: +24). Creatures are briefly blinded.
**Critical.** All creatures take +18 radiant damage (undead: +36). Creatures are blinded for a short duration. All magical darkness in the area is dispelled.

> **Design Note**: R5 capstone. AoE uses half single-target scaling (+6/+12/+18). Double damage against undead is the signature Light payoff.
