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
| trickery | Minor Illusion | Illusory Trap, False Enemy | Illusionary Terrain, Trap Room | — | — | — |
| misdirection | — | Mirror Image | Misdirection, Invisibility | Mislead | — | — |
| obfuscation | Maddening Whispers | Color Spray, Disguise Form | Waking Dream | Seeming* | — | — |
| hallucinations | Horrific Vision | — | Hallucinated Swarm, Major Illusion | Phantasmal Killer | — | — |
| distortion | ❌ **GAP** | — | — | — | — | — |

*Asterisk = incomplete spell*

**Coverage**: 14/30 slots filled (47%) — strong at R1-R2, very weak at R3-R5

**Critical Gaps**:
- **Distortion R0**: No sensory distortion cantrip
- **Trickery R3+**: No advanced trickery beyond R2
- **All traits R4-R5**: Zero spells above R3 — Illusion has no high-rank options at all
- **Hallucinations R1**: Gap between R0 and R2
- **Misdirection R0**: No cantrip-level misdirection

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

### Perfect Disguise

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Hard TN | Self | concentrate, illusory

*You weave the most convincing illusion possible — a disguise so perfect that even magical detection struggles to penetrate it.*

**Weak.** You assume a flawless disguise for a short duration. The disguise resists magical detection (detecting creatures must succeed on a Very Hard TN check). You can change your voice, appearance, clothing, and equipment appearance.
**Strong.** Duration extends to medium. You can also mimic specific individuals you have studied for at least one day. The disguise resists even True Sight.
**Critical.** Duration extends to long. The disguise is undetectable by any non-legendary means. You can change the disguise at will once per turn without recasting.

> **Design Note**: R5 capstone — the pinnacle of illusory deception. Not combat-focused, reflecting Illusion's utility identity.
