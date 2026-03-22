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
| sun | Dazzling Light | Sun Sphere, Radiant Weapon | Sunbeam | Solar Flare | Blinding Radiance | Radiant Convergence |
| illumination | Illuminated Sight | Blessing of Light, Locate Trinket | — | Blessing of Dawn | — | Dawn's Embrace |
| truth | Detect Lies | Protect from Influence | Break Curse | Zone of Truth | — | Radiance of Truth |
| clarity | Moment of Clarity | — | Clarity of Purpose | — | Purifying Aura | — |
| judgement | Stern Gaze | Radiant Rebuke | — | — | Divine Judgement | — |

**Coverage** (existing + proposed): 21/30 slots filled (70%) — all traits represented, R4-R5 filled

**Remaining Gaps**:
- **Clarity R1, R3, R5**: No mid-rank or capstone clarity spells
- **Judgement R2-R3**: Gap between R1 reactive and R4 offensive
- **Illumination R2, R4**: Gaps in middle ranks
- **Truth R4**: No R4 truth spell

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

**Weak.** End one of the following conditions affecting the target: dazed, confused, or frightened. The condition does not return for a short duration even if the source persists.
**Strong.** As above. The target also gains +1 boon on their next save against the removed condition's source.
**Critical.** As above with +2 boons on the next save. You may end one additional condition from the list.

> **Design Note**: R0 clarity cantrip. Core effect (end one mental condition, short suppression) is reliable on any success — SL adds save bonuses. Only Critical adds a second condition removal.

### Stern Gaze

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Resist | Close | —

*Your eyes flash with divine judgement, compelling a creature to pause and face your authority.*

**Weak.** The target suffers +1 bane on their next attack roll as they feel the weight of divine scrutiny.
**Strong.** Deal +2 radiant damage with the same bane effect.
**Critical.** Deal +4 radiant damage with the same bane effect, and the target is briefly dazed.

> **Design Note**: R0 judgement cantrip. Core effect (attack bane) is reliable on any success — SL adds damage. Only Critical escalates to dazed.

### Zone of Truth

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist | Close | concentrate

*You create a zone of divine radiance where falsehood is impossible. All creatures within the area feel compelled to speak truthfully.*

**Weak.** Create a zone in close range lasting a medium duration. Creatures within the zone must succeed on a Spirit + Fortitude check vs. your casting result to knowingly speak a lie. On failure, they must speak truthfully or remain silent.
**Strong.** As above. Creatures suffer +1 bane on attempts to resist the truth compulsion.
**Critical.** As above with +2 banes on resistance. You can sense when a creature successfully resists (you know they chose silence over truth).

> **Design Note**: R3 truth spell. Core effect (truth zone, medium duration) is reliable on any success — SL adds resistance banes and sensory awareness. The area truth compulsion is a significant social tool but does NOT replace interrogation — targets can remain silent, and the zone requires concentration.

### Clarity of Purpose

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Ally | Close | —

*You flood an ally's mind with divine clarity, burning away mental fog and enchantment.*

**Weak.** End up to two of the following conditions on a willing creature: charmed, confused, dazed, or frightened. If any condition was caused by magic, the source must succeed on a Spirit + casting skill check or the dispel is permanent.
**Strong.** As above. If the conditions were magically caused, the source suffers +1 bane on the resistance check.
**Critical.** As above with +2 banes on the resistance check. The target also gains +2 to Resist against mental conditions for a short duration.

> **Design Note**: R2 clarity spell. Core effect (end up to two mental conditions, dispel check) is reliable on any success — SL adds dispel banes and Resist bonus. Upgrades Moment of Clarity (R0) from single-condition suppression to multi-condition removal with dispel.

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

### Radiant Rebuke

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Attacker | Close | quick

*When you or a nearby ally is struck, you channel a flash of divine radiance back at the attacker — a searing retort of holy judgement.*

**Effect.** As a Quick Action when targeted by an attack, gain +2 to your Dodge or Parry against the triggering attack. The attacker takes +2 radiant damage from divine retribution.

> **Design Note**: R1 Quick Action reactive defense. Standardized base (+2 Dodge/Parry) with Light's divine retribution as secondary effect. No SL scaling — one reliable defensive reaction.

### Purifying Aura

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Allies | Close | concentrate, enchant (short)

*You radiate a warm golden aura that burns away corruption and shields allies from the touch of darkness.*

**Weak.** For a short duration, allies within close range gain resistance to necrotic damage (reduce by 4) and +2 to Resist against curse and disease effects. At the start of each of your turns, remove one curse or disease from each ally within the aura.
**Strong.** Necrotic resistance increases to 6 and Resist bonus increases to +3.
**Critical.** Necrotic resistance increases to 8 and Resist bonus increases to +4. Undead within the aura suffer +4 radiant damage at the start of each of your turns.

> **Design Note**: R4 support/healing hybrid. Core effect (necrotic resistance, Resist bonus, curse/disease removal from each ally) is reliable on any success — SL increases resistance values and adds anti-undead damage at Critical. Concentration limits other spellcasting.

### Blinding Radiance

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Long | —

*You unleash a concentrated burst of searing divine light directly at a creature, overwhelming their senses with holy radiance.*

**Weak.** Deal +5 radiant damage (+10 vs. undead). The target is blinded for a short duration.
**Strong.** Deal +10 radiant damage (+20 vs. undead). Blinded for a short duration. The target cannot benefit from invisibility or concealment for the duration.
**Critical.** Deal +15 radiant damage (+30 vs. undead). Blinded for a medium duration. Invisibility and concealment stripped. If the target is undead, they are also briefly stunned.

> **Design Note**: R4 single-target anti-undead offense. Base damage uses half single-target scaling (+5/+10/+15) with double vs. undead (+10/+20/+30). The blinding condition is Light's signature — reliable at all success levels.

### Dawn's Embrace

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Allies | Close | —

*You call forth the warmth of a new dawn, flooding the area with golden light that heals the faithful and sears the undead.*

**Weak.** All allies in close range regain +6 HP. Remove all curses and negative conditions from each ally. Undead in the area take +6 radiant damage.
**Strong.** Allies regain +12 HP with the same condition removal. Undead take +12 radiant damage and are briefly blinded.
**Critical.** Allies regain +18 HP with the same condition removal. Undead take +18 radiant damage, are blinded for a short duration, and cannot regenerate HP for a short duration.

> **Design Note**: R5 mass healing + blessing capstone. Core effect (AoE healing, full condition removal) is reliable on any success — SL adds healing and anti-undead damage/conditions. AoE healing uses half single-target R5 scaling (+6/+12/+18).

### Radiance of Truth

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Area | Short | concentrate, enchant (short)

*You fill an area with piercing divine light that lays bare all deception — illusions shatter, the invisible are revealed, and falsehood cannot survive.*

**Weak.** Create a zone of absolute truth in a short area for a short duration. All invisible creatures are revealed, all magical illusions and disguises are dispelled, and shapechanged creatures are shown in their true form. All concealment (magical and mundane) is stripped. Creatures within the zone cannot willingly speak lies (they may remain silent instead).
**Strong.** As above. Creatures suffer +2 banes on attempts to resist the truth compulsion. You can sense the surface intentions of any creature in the zone.
**Critical.** As above. Truth compulsion cannot be resisted — creatures must speak truthfully or remain silent. You gain +2 boons on Insight checks against creatures in the zone.

> **Design Note**: R5 truth/clarity capstone. Core effect (full revelation zone — invisibility, illusions, disguises, concealment all stripped; truth compulsion) is reliable on any success — SL adds compulsion banes and Insight bonuses. Concentration and Focus 10 cost are significant. Does not compel speech — targets can remain silent.

## Cross-School Spell Sharing

Light's "truth" and "revelation" themes overlap with the Arcane **Illusion** discipline's detection and anti-illusion effects. Both schools deal with perceiving or stripping away deception, though from opposite philosophical angles — Light reveals truth through divine authority while Illusion understands deception through mastery of it.

### Existing Shared Spells
- **True Strike** (R1): Already exists in both Light (Mystic) and Telepathy (Arcane). Provides attack accuracy through insight — Light frames it as divine clarity, Telepathy as mental prediction. Identical mechanics.

### Potential Sharing Candidates
- **Protect from Influence** (Light R1) ↔ Telepathy: Mental protection overlaps with Telepathy's understanding of mental intrusion. Could share as identical spell with different flavor.
- **Revealing Burst** (Light R0) ↔ Illusion: Both schools have anti-invisibility tools. Light's version uses divine radiance while Illusion's detection works through understanding deception — thematically different enough to remain separate.
- **Radiance of Truth** (Light R5) ↔ Illusion: The anti-illusion component directly counters Illusion, but the truth compulsion is uniquely Mystic. Not a sharing candidate — too thematically bound to divine revelation.

### Design Notes
- Cross-school sharing is **arcane ↔ mystic only** (never within the same category).
- Shared spells must be **mechanically identical** even if flavor differs.
- Light's anti-deception spells serve a fundamentally different purpose (divine revelation) than Illusion's detection spells (understanding false reality), so most should remain school-specific.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Sun chain**: Dazzling Light (R0) → Sun Sphere/Radiant Weapon (R1) → Sunbeam (R2) → Solar Flare (R3) → Blinding Radiance (R4) → Radiant Convergence (R5) — **complete R0-R5**
2. **Illumination chain**: Illuminated Sight (R0) → Blessing of Light/Locate Trinket (R1) → *gap at R2* → Blessing of Dawn (R3) → Purifying Aura (R4) → Dawn's Embrace (R5) — near-complete, R2 gap only
3. **Truth chain**: Detect Lies (R0) → Protect from Influence (R1) → Break Curse (R2) → Zone of Truth (R3) → *gap at R4* → Radiance of Truth (R5) — near-complete, R4 gap only
4. **Clarity chain**: Moment of Clarity (R0) → *gap at R1* → Clarity of Purpose (R2) → *gap at R3* → Purifying Aura (R4) → *gap at R5* — scattered but functional
5. **Judgement chain**: Stern Gaze (R0) → Radiant Rebuke (R1) → *gap at R2-R3* → Divine Judgement (R4) → *gap at R5* — functional with R2-R3 gap

### Setup + Payoff Combos
- ✅ **Reveal → Destroy**: Revealing hidden/invisible targets enables follow-up attacks with advantage. Radiance of Truth (R5) is the ultimate setup.
- ✅ **Anti-undead chain**: Radiant Weapon (R1) → Destroy Undeath (R2) → Blinding Radiance/Divine Judgement (R4) → Radiant Convergence/Dawn's Embrace (R5) — strong escalation with dual R4 and R5 options
- ✅ **Rebuke → Judgement**: Radiant Rebuke (R1 reactive) → Divine Judgement (R4 active) — retributive damage scales from quick reaction to deliberate condemnation
- ⚠️ **Clarity → Buff**: Moment of Clarity removes conditions and Purifying Aura prevents them, but no explicit follow-up bonus from condition removal
- ⚠️ **Truth → Judgement**: Zone of Truth (R3) and Radiance of Truth (R5) reveal information; Divine Judgement (R4) punishes — thematic link but no mechanical trigger

### Design Completeness Checklist
- [x] **R1 Quick Action**: Radiant Rebuke — standardized reactive defense (+2 Dodge/Parry, radiant damage secondary)
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 6, R1: 9, R2: 4, R3: 4, R4: 3, R5: 3)
- ⚠️ Defensive options: Protect from Influence (R1) covers mental defense, Purifying Aura (R4) provides necrotic resistance — no general reactive physical defense
- [x] Utility: Illuminated Sight (R0), Detect Lies (R0), Locate Trinket (R1), Moment of Clarity (R0), Radiance of Truth (R5)
- [x] Damage across ranks: R0-R5 fully covered — sun chain provides continuous damage escalation with anti-undead bonuses throughout
- [x] Repeating conditions: Blinded, revealed, burning — consistent anti-darkness identity
- ⚠️ Setup+payoff: Reveal → attack and anti-undead chains are strong; truth → judgement is thematic but lacks explicit mechanical triggers
- ⚠️ **Remaining gaps**: Clarity R1/R3, Judgement R2-R3, Illumination R2, Truth R4

### Impact & Trivialization Review
- **Zone of Truth (R3)**: Moderate risk — truth compulsion is powerful in social scenes. **Mitigations**: targets can choose silence over truth, concentration required, R3 Focus cost (6) is significant. Does not replace Influence/Insight checks — it prevents lies but doesn't compel answers or cooperation. GMs can design around it (NPCs use careful truths, omission, or leave the zone).
- **Radiance of Truth (R5)**: Moderate risk — ultimate anti-deception tool. **Mitigations**: R5 Focus cost (10), concentration required, targets can remain silent, does not compel answers. At R5 this is appropriate power — it is the pinnacle of truth magic.
- **Purifying Aura (R4)**: Low risk — necrotic resistance and curse removal are powerful but situational. Concentration limits other casting. Primarily useful against undead and Death tradition enemies.
- **Dawn's Embrace (R5)**: Moderate risk — mass healing + condition removal is very strong. **Mitigations**: R5 Focus cost (10), AoE healing uses half scaling (+6/+12/+18), single use (not sustained). Appropriate for a capstone-level support spell.
- **Moment of Clarity (R0)**: Minimal risk — condition removal is purely supportive and tactical, no social or exploration bypass.
