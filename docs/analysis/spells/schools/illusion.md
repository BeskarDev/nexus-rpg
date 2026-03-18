# Illusion — Spell School Design Space

## School Identity

**Discipline**: Illusion (Arcane)
**Traits**: trickery, misdirection, obfuscation, hallucinations, distortion
**Identity**: Selfish deception and false reality — bending perception to serve the caster
**Role Spread**: Excels: Utility | Decent: Control, Support | Weak: Offense, Healing, Defense

### Mechanical Identity
- **Primary Conditions**: Frightened, confused, charmed (via false perception), blinded
- **Signature Gimmick**: Reality vs. belief — illusions persist until detected (Spirit + Perception vs. Resist). Layering multiple illusions creates compounding false reality
- **Damage Types**: Psychic, Blast, Frost

### Design Principles
1. Illusion excels at non-damage solutions — disguise, misdirection, and social manipulation
2. Damage comes primarily through psychic effects (fear, hallucinations causing real harm)
3. Concentration is the core resource — 6 spells require concentration, creating layered false realities
4. Detection mechanic (illusory property) creates interesting counterplay

### Internal Synergies
- **Setup**: Create an illusion (Minor Illusion, Major Illusion) → **Payoff**: Enemies who believe the illusion are vulnerable to follow-up psychic attacks
- **Layer stacking**: Multiple concentration-free illusions compound the false reality

## Current Spell Inventory (18 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Horrific Vision, Maddening Whispers, Minor Illusion |
| 1 | 5 | Color Spray, Disguise Form, False Enemy, Illusory Trap, Mirror Image |
| 2 | 7 | Hallucinated Swarm, Illusionary Terrain, Invisibility, Major Illusion, Misdirection, Trap Room, Waking Dream |
| 3 | 3 | Mislead, Phantasmal Killer, Seeming (incomplete) |
| 4–5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| trickery | Minor Illusion | Illusory Trap, False Enemy | Illusionary Terrain, Trap Room | — | Grand Illusion† | — |
| misdirection | — | Mirror Image, Illusory Dodge† | Misdirection, Invisibility | Mislead | — | Perfect Disguise† |
| obfuscation | Maddening Whispers | Color Spray, Disguise Form | Waking Dream, Phantasmal Armor† | Seeming | — | — |
| hallucinations | Horrific Vision | — | Hallucinated Swarm, Major Illusion | Phantasmal Killer | Phantasmal Catastrophe†, Labyrinth of Mirrors† | Maze of Madness† |
| distortion | Sensory Trick† | — | — | — | — | — |

*†Proposed new spell*

**Coverage (with proposed)**: 18/30 slots filled (60%) — strong at R0-R2, improving at R3-R5

**Remaining Gaps**:
- **Distortion R1+**: Still nearly empty beyond cantrip — weakest trait
- **Hallucinations R1**: Gap between R0 and R2 persists
- **Trickery R3, R5**: No advanced trickery at R3 or capstone level
- **Misdirection R0, R4**: No cantrip-level or R4 misdirection
- **Obfuscation R4-R5**: No high-rank obfuscation

## Proposed Spell Changes

### Seeming — Complete (currently incomplete)

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Medium TN | Close | concentrate, illusory

*You weave elaborate disguises over yourself and up to four willing allies, transforming their appearance entirely.*

**Weak.** You and up to 2 willing creatures in close range take on illusory appearances of your choice for a short duration. The disguises are convincing but imperfect — observers gain +1 boon on attempts to see through them.
**Strong.** You and up to 4 willing creatures are disguised for a short duration. The disguises are convincing with no detection bonus.
**Critical.** You and up to 4 willing creatures are disguised for a medium duration. Observers suffer +1 bane on detection attempts.

> **Design Note**: Group disguise is essential utility. R3 matches the power level — multiple simultaneous disguises with extended duration.

## Proposed New Spells

### Sensory Trick

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Medium TN | Medium | illusory

*You create a brief sensory disturbance — a sudden sound, smell, flash of light, or tactile sensation — to distract or misdirect.*

**Weak.** Create a brief sensory disturbance at a point within medium range. Creatures within melee range of the point are briefly distracted (suffer +1 bane on their next Perception check).
**Strong.** The disturbance is more convincing. Affected creatures are briefly distracted and must use a Quick Action to investigate or dismiss it.
**Critical.** The disturbance is highly convincing. Affected creatures are briefly distracted and you can use this as a diversion for Stealth checks, gaining +1 boon.

> **Design Note**: Fills R0 distortion/hallucination gap. Pure utility cantrip for creative misdirection.

### Illusory Dodge

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Self | Self | quick

*You conjure a flickering illusory double of yourself at the last instant, confusing your attacker's aim.*

**Weak.** As a Quick Action when targeted by an attack, create a brief illusory copy of yourself. Gain +2 to Dodge against the triggering attack.
**Strong.** Gain +4 to Dodge against the triggering attack. If the attack misses, the illusion persists briefly, granting +1 bane on the next attack targeting you before the end of your next turn.
**Critical.** Gain +4 to Dodge against the triggering attack. The illusion persists briefly, granting +1 bane on all attacks targeting you until the end of your next turn.

> **Design Note**: Fills the missing R1 Quick Action reactive spell for Illusion. Creates a brief illusory double as defense through deception — fits "misdirection" trait.

### Phantasmal Armor

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Self | Self | concentrate, illusory, enchant (short)

*You shroud yourself in an illusion of shifting, menacing forms — enemies perceive attacking you as dangerous or futile.*

**Weak.** For a short duration, when a creature targets you with a melee attack, they must roll Spirit + Perception vs. your casting result or suffer +1 bane on their attack.
**Strong.** The illusion also affects ranged attackers within close range. Bane increases to +2 on failure.
**Critical.** All attackers within medium range are affected. On a failed detection, they also take +2 psychic damage from the terrifying illusion.

> **Design Note**: Defensive illusion spell — fits the "deception as defense" identity without being a traditional shield.

### Labyrinth of Mirrors

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Medium | concentrate, illusory

*You trap a creature's mind in an ever-shifting maze of reflections and false corridors, leaving their body standing helpless.*

**Weak.** One creature is briefly trapped in an illusory maze. They are dazed and cannot take Actions (only Quick Actions) as they try to navigate the false corridors. At the end of each of their turns, they can roll Mind + Perception vs. your casting result to escape.
**Strong.** The target is trapped for up to a short duration. They are confused and cannot take any actions. Each turn they can attempt to escape.
**Critical.** The target is trapped for up to a short duration and is confused. Escape attempts suffer +1 bane. When they escape, they are briefly disoriented (dazed for one additional turn).

> **Design Note**: R4 single-target lockdown. The "maze" theme fits illusion's trickery identity. Concentration requirement and per-turn escape attempts prevent permanent disable.

### Phantasmal Catastrophe

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Short | concentrate

*You project a terrifying mass hallucination — the earth splitting, the sky falling, buildings collapsing — flooding the minds of all creatures in the area with overwhelming psychic horror.*

**Weak.** All creatures in a short area experience a vivid hallucination of catastrophe. They take +5 psychic damage and are briefly confused as they struggle to distinguish reality from illusion.
**Strong.** Targets take +10 psychic damage and are confused for a short duration. Creatures that fail by 3+ are also frightened.
**Critical.** Targets take +15 psychic damage and are confused for a short duration. Creatures that fail by 3+ are frightened and flee the area if possible.

> **Design Note**: R4 AoE hallucination. Damage uses half single-target R4 scaling (+5/+10/+15). The mass confusion effect represents Illusion's control role at high ranks.

### Grand Illusion

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Hard TN | Long | concentrate, illusory

*You weave an enormous, detailed illusion that fills an entire area — phantom buildings, false terrain, illusory armies, or elaborate environmental changes.*

**Weak.** Create a large, detailed illusion filling a close area within long range. The illusion includes visual, auditory, and olfactory elements. It lasts for a short duration. Creatures interacting with the illusion can roll Spirit + Perception vs. your casting result to detect it.
**Strong.** The illusion fills a short area and lasts for a medium duration. The illusion is convincing enough to include moving elements (marching soldiers, flowing water, swaying trees). Detection attempts suffer +1 bane.
**Critical.** The illusion fills a medium area and lasts for a medium duration. The illusion is near-perfect, with tactile elements (illusory walls feel solid to casual touch). Detection attempts suffer +2 banes.

> **Design Note**: R4 capstone utility — the ultimate illusory creation. Concentration limits abuse. Scaling area and duration reward high casting rolls. Fits "trickery" trait.

### Perfect Disguise

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Hard TN | Self | concentrate, illusory

*You weave the most convincing illusion possible — a disguise so perfect that even magical detection struggles to penetrate it.*

**Weak.** You assume a flawless disguise for a short duration. The disguise resists magical detection (detecting creatures must succeed on a Very Hard TN check). You can change your voice, appearance, clothing, and equipment appearance.
**Strong.** Duration extends to medium. You can also mimic specific individuals you have studied for at least one day. The disguise resists even True Sight.
**Critical.** Duration extends to long. The disguise is undetectable by any non-legendary means. You can change the disguise at will once per turn without recasting.

> **Design Note**: R5 capstone — the pinnacle of illusory deception. Not combat-focused, reflecting Illusion's utility identity.

### Maze of Madness

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Medium | concentrate

*You trap multiple creatures in a shared nightmarish hallucination — a labyrinth of impossible geometry, shifting walls, and maddening whispers that break the will of those caught within.*

**Weak.** All creatures in a close area are drawn into a shared hallucination. They take +6 psychic damage and are briefly confused, unable to distinguish allies from enemies or real threats from phantom ones.
**Strong.** Targets take +12 psychic damage and are confused for a short duration. Creatures that fail by 3+ are briefly dominated — they act on your behalf until the end of their next turn.
**Critical.** Targets take +18 psychic damage and are confused for a short duration. Creatures that fail by 3+ are dominated for a short duration, fully under your control. You can direct their actions each turn.

> **Design Note**: R5 offensive capstone for Illusion. AoE uses half single-target R5 scaling (+6/+12/+18). The confusion/domination escalation represents the pinnacle of illusory mind control. Concentration and vs. Resist prevent auto-wins.

## Cross-School Spell Sharing

**Potential Overlap: Illusion (Arcane) ↔ Twilight (Mystic)**

The Twilight tradition shares the "illusion" aspect with the Illusion discipline. Both schools deal in deception, false perception, and manipulation of what creatures believe to be real. Key overlap areas:

- **Illusory creation spells** (Minor Illusion, Major Illusion, Grand Illusion) could appear in the Twilight spell list, reflecting the moon's association with shadows and false visions
- **Fear/dream effects** (Horrific Vision, Waking Dream, Phantasmal Killer) thematically align with Twilight's dream and secret aspects
- **Disguise spells** (Disguise Form, Seeming) overlap with Twilight's shapeshifting and mystery themes

**Shared Spell Candidates**: Any spell with the `illusory` property is a natural candidate for cross-school sharing between Illusion (Arcane) and Twilight (Mystic). Shared spells must be mechanically identical in both lists.

> **Design Note**: Twilight approaches illusion reverently (mysteries of the moon, prophetic visions) while Illusion approaches it selfishly (deception for personal gain). The same spell mechanics can serve both philosophies with different flavor text.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Trickery chain**: Minor Illusion (R0) → Illusory Trap/False Enemy (R1) → Illusionary Terrain/Trap Room (R2) → *gap at R3* → Grand Illusion (R4 proposed) → *gap at R5*
2. **Misdirection chain**: *gap at R0* → Mirror Image/Illusory Dodge (R1, R1 proposed) → Misdirection/Invisibility (R2) → Mislead (R3) → *gap at R4* → Perfect Disguise (R5 proposed)
3. **Obfuscation chain**: Maddening Whispers (R0) → Color Spray/Disguise Form (R1) → Waking Dream/Phantasmal Armor (R2, R2 proposed) → Seeming (R3) → *gap at R4-R5*
4. **Hallucinations chain**: Horrific Vision (R0) → *gap at R1* → Hallucinated Swarm/Major Illusion (R2) → Phantasmal Killer (R3) → Phantasmal Catastrophe/Labyrinth of Mirrors (R4 proposed) → Maze of Madness (R5 proposed) — **complete R0-R5** (except R1)
5. **Distortion chain**: Sensory Trick (R0 proposed) → *gap at R1-R5* — weakest chain, nearly empty

### Setup + Payoff Combos
- ✅ **Illusion belief → psychic vulnerability**: Targets who believe illusions are vulnerable to Phantasmal Killer/Labyrinth of Mirrors/Phantasmal Catastrophe
- ✅ **Illusory Dodge → misdirection defense**: Brief reactive defense plays into the "deception as protection" identity
- ⚠️ **Invisibility → surprise attack**: Mechanically supported via advantage, but no Illusion spell explicitly rewards attacking from invisibility
- ⚠️ **Layer stacking**: Multiple illusions compound false reality, but most spells require concentration, limiting simultaneous layers
- ❌ **Distortion → condition stack**: No distortion-based condition-building mechanic exists — distortion trait is mechanically hollow

### Design Completeness Checklist
- [x] R1 Quick Action: Illusory Dodge (R1 proposed) — reactive illusory defense
- ⚠️ Defensive options: Illusory Dodge (R1 proposed), Phantasmal Armor (R2 proposed) — improved but no sustained defense
- [x] Utility: Strong across disguise (Disguise Form, Seeming, Perfect Disguise), invisibility, terrain illusions, Grand Illusion (R4 proposed)
- [x] Damage across ranks: Psychic damage now covered — Horrific Vision (R0), Phantasmal Killer (R3), Phantasmal Catastrophe (R4 proposed), Maze of Madness (R5 proposed)
- [x] Repeating conditions: Frightened, confused, charmed, blinded, dominated well-covered
- ⚠️ Setup+payoff: "Believe illusion → vulnerable" is conceptually strong but lacks explicit mechanical triggers
- ⚠️ **3 spells per rank minimum**: Met at R0-R4 (R0: 4, R1: 6, R2: 8, R3: 3, R4: 3). R5 has 2 — needs one more spell
- ⚠️ **Remaining gaps**: Distortion trait R1+, hallucinations R1, R5 needs one more spell for 3-per-rank minimum
