# Peace — Spell School Design Space

## School Identity

**Tradition**: Peace (Mystic)
**Traits**: calmness, protection, selflessness, travel, law
**Identity**: Communal safety and lawful order — protecting the innocent, ensuring justice, enabling safe passage
**Role Spread**: Excels: Defense | Decent: Support, Healing | Weak: Offense, Control, Utility

### Mechanical Identity
- **Primary Conditions**: Dazed (pacification), charmed (calmed), protected (sanctuary)
- **Signature Gimmick**: Pacification and protection — preventing violence, redirecting harm, enforcing truth
- **Damage Types**: Physical (deterrent), Blast (concussive), Psychic (calming)

### Design Principles
1. Peace excels at defense and protection — sanctuary, barriers, damage sharing
2. Travel and law are core thematic pillars but completely absent from the current spell list
3. Damage should feel defensive/deterrent rather than aggressive
4. **Critical gaps**: "Travel" and "law" traits have zero spells at ANY rank
5. Peace is undersized (13 spells) — needs significant expansion

### Internal Synergies
- **Calm → Truth**: Pacify target → calmed targets more susceptible to truth-telling
- **Protect → Sustain**: Blessing of Peace → protected allies who don't attack gain enhanced healing
- **Sanctuary chain**: Aura of Sanctuary (R0) → Dome of Sanctuary (R2) → Sanctuary Sphere (R5)

## Current Spell Inventory (13 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Aura of Sanctuary, Calming Influence, Tranquil Mind |
| 1 | 4 | Blessing of Peace, Harmonic Link, Pacifying Weapon, Share Harm |
| 2 | 3 | Dome of Sanctuary, Slow, Spell-breaking Wave |
| 3 | 3 | Anti-Magic Field, Martyrdom's Blessing, Pacifying Presence |
| 4–5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| calmness | Calming Influence, Tranquil Mind | Pacifying Weapon | Slow | Pacifying Presence | — | — |
| protection | Aura of Sanctuary | Blessing of Peace, Share Harm | Dome of Sanctuary, Spell-breaking Wave | Anti-Magic Field | — | — |
| selflessness | — | Harmonic Link | — | Martyrdom's Blessing | — | — |
| travel | ❌ **GAP** | — | — | — | — | — |
| law | ❌ **GAP** | — | — | — | — | — |

**Coverage**: 10/30 slots filled (33%) — undersized school with two traits completely absent

**Critical Gaps**:
- **Travel**: Zero spells at ANY rank — a defining thematic pillar with no mechanical representation
- **Law**: Zero spells at ANY rank — justice and oath enforcement entirely missing
- **Selflessness R0, R2**: Gaps in the self-sacrifice theme
- **All traits R4-R5**: Zero spells — Peace has no high-rank options at all
- **Calmness/Protection R4+**: Even the strongest traits lack high-level evolution

## Proposed New Spells

### Wayfinder's Mark

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Easy TN | Close | —

*You leave a faintly glowing mark on the ground or a surface, guiding travelers along the right path.*

**Weak.** Mark a surface visible only to you and designated allies for a short duration. The mark provides a directional arrow visible in darkness.
**Strong.** The mark lasts for a medium duration. Allies who follow the marks gain +1 boon on navigation checks.
**Critical.** The mark lasts for a long duration. Allies gain +1 boon on navigation and perception checks while following the marks.

> **Design Note**: Fills the R0 travel gap. Pure utility cantrip for exploration. Provides a boon on checks rather than replacing them — the party still needs to navigate, but the marks help.

### Binding Word

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Resist | Close | —

*You speak a word of divine authority, compelling a creature to speak truthfully for a single statement.*

**Weak.** The target must speak truthfully for their next statement, or remain silent. They are aware of the compulsion.
**Strong.** The target must speak truthfully for their next two statements. They feel strong compulsion to answer rather than stay silent.
**Critical.** The target must speak truthfully for their next three statements. If they attempt to lie, they visibly struggle and others notice the deception.

> **Design Note**: Fills the R0 law gap. Cantrip-level truth compulsion with intentional limits: very few statements, target is aware, and they can choose silence over truth. Does not replace social skill checks — merely compels truthfulness if the target speaks. Compare to Detect Lies (Light R0) which detects but doesn't compel.

### Swift Journey

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Allies | Close | enchant (medium)

*You bless a group of travelers with divine swiftness, easing their journey.*

**Weak.** Up to 4 creatures gain +1 movement for a medium duration. They ignore difficult terrain caused by natural conditions (mud, underbrush, rocky ground).
**Strong.** Movement bonus increases to +2. The group also does not leave tracks and cannot be tracked by mundane means.
**Critical.** Movement bonus +2. Trackless travel. The group also gains +1 boon on Fortitude checks against travel fatigue and exhaustion.

> **Design Note**: R1 travel spell. Provides mechanical benefit to overland travel without bypassing it. Bonuses apply to checks and movement, not automatic success. The party still needs to make camp, forage, and navigate — the spell makes these activities less taxing, not trivial. Trackless travel is a defensive feature against pursuit, not exploration bypass.

### Safe Passage

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Allies | Close | ritual (10 minutes), enchant (long)

*You invoke divine protection for a journey, warding travelers against the hazards of the road.*

**Weak.** Up to 6 creatures gain +1 boon on Survival and Perception checks related to travel hazards (weather, terrain, ambush detection) for a long duration.
**Strong.** The boon increases to +2 for weather and terrain hazards. The group's travel speed increases by 25% for the duration.
**Critical.** +2 boon on all travel-related checks. Travel speed increases by 50%. The group cannot become lost in natural terrain for the duration (though magical misdirection still works).

> **Design Note**: Fills R3 travel gap. Ritual requirement prevents combat use. Provides significant overland travel utility appropriate for R3. The "cannot become lost" effect at Critical only applies to natural terrain and is defeated by magic — it doesn't bypass adventure design, it smooths mundane navigation. Compare this to Nature's Passage (Nature R2) which handles terrain traversal.

### Righteous Verdict

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Medium | —

*You pronounce divine judgement upon a creature, and the cosmos answers. The weight of their transgressions bears down upon them.*

**Weak.** One creature that has committed a harmful act this scene (attacked, lied, broke an oath) takes +5 psychic damage and is briefly dazed by the weight of judgement.
**Strong.** Deal +10 psychic damage. The target is dazed for a short duration and suffers +1 bane on all actions.
**Critical.** Deal +15 psychic damage. The target is dazed for a short duration, suffers +2 banes on all actions, and cannot willingly lie for the duration.

> **Design Note**: Fills R4 law gap. Requires the target to have committed a harmful act this scene — cannot be used preemptively. Damage is below single-target standard (+10/+20/+30 at R4) because the daze + bane combo provides significant control. Peace's damage should feel like divine consequence, not aggression.

### Binding Oath

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Resist (willing) | Close | ritual (10 minutes)

*You invoke divine law to seal an oath between two or more willing parties. Breaking the oath carries supernatural consequences.*

**Weak.** Up to 2 willing creatures swear an oath. If either party breaks the oath within the next day, they suffer 2 levels of fatigue that cannot be removed until they atone (GM discretion).
**Strong.** The oath lasts for a week. Breaking it causes 3 levels of fatigue and the oath-breaker is marked with a visible divine brand (obvious to all who see them) for the duration.
**Critical.** The oath lasts for a month. Breaking it causes 3 levels of fatigue, the divine brand, and +2 banes on all social interactions until atonement.

> **Design Note**: R2 law spell — supernatural oath enforcement. Requires willing participants, preventing hostile use.

### Sanctuary Sphere

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Allies | Close | concentrate

*You create a shimmering dome of divine peace that shields all within from harm and hostility.*

**Weak.** Create a dome in close range lasting a brief duration. All allies within gain +4 AV (situational bonus). Hostile creatures must succeed on a Spirit + Fortitude check (vs. your casting result) to enter the dome or attack creatures within it.
**Strong.** Duration extends to short. AV bonus increases to +6. Hostile creatures that fail the check are also briefly dazed by the calming aura.
**Critical.** Duration extends to short. AV bonus +6. Failed hostile creatures are dazed and pushed out of the dome. Allies within the dome regain +2 HP at the start of each of their turns.

> **Design Note**: R5 capstone — ultimate sanctuary. Defensive powerhouse that discourages violence. Concentration can be broken.
