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

## Spell Inventory (38 spells — 18 existing, 20 proposed†)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 5 | Horrific Vision, Maddening Whispers, Minor Illusion, Phantom Feint†, Sensory Trick† |
| 1 | 8 | Color Spray, Disguise Form, False Enemy, Illusory Dodge†, Illusory Trap, Mirror Image, Phantom Pain†, Warped Perspective† |
| 2 | 9 | Funhouse Mirror†, Hallucinated Swarm, Illusionary Terrain, Invisibility, Major Illusion, Misdirection, Phantasmal Armor†, Trap Room, Waking Dream |
| 3 | 5 | Mislead, Phantasmal Killer, Programmed Illusion†, Seeming, Shattered Perspective† |
| 4 | 6 | Grand Illusion†, Impossible Geometry†, Labyrinth of Mirrors†, Phantasmal Catastrophe†, Shroud of Forgotten Faces†, Veil of Deception† |
| 5 | 5 | Dream Shroud†, Maze of Madness†, Mirage Arcane†, Perfect Disguise†, Unraveled Reality† |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| trickery | Minor Illusion | Illusory Trap, False Enemy | Illusionary Terrain, Trap Room | Programmed Illusion† | Grand Illusion† | Mirage Arcane† |
| misdirection | Phantom Feint† | Mirror Image, Illusory Dodge† | Misdirection, Invisibility | Mislead | Veil of Deception† | Perfect Disguise† |
| obfuscation | Maddening Whispers | Color Spray, Disguise Form | Waking Dream, Phantasmal Armor† | Seeming | Shroud of Forgotten Faces† | Dream Shroud† |
| hallucinations | Horrific Vision | Phantom Pain† | Hallucinated Swarm, Major Illusion | Phantasmal Killer | Phantasmal Catastrophe†, Labyrinth of Mirrors† | Maze of Madness† |
| distortion | Sensory Trick† | Warped Perspective† | Funhouse Mirror† | Shattered Perspective† | Impossible Geometry† | Unraveled Reality† |

*†Proposed new spell*

**Coverage (with proposed)**: 30/30 slots filled (100%) — all trait×rank gaps filled

**Remaining Gaps**: None — all 30 trait×rank slots are covered.

## Proposed Spell Changes

### Seeming — Complete (currently incomplete)

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Medium TN | Close | concentrate, illusory

*You weave elaborate disguises over yourself and up to four willing allies, transforming their appearance entirely.*

**Weak.** You and up to 4 willing creatures in close range take on illusory appearances of your choice for a short duration. The disguises are convincing — observers can attempt Spirit + Perception vs. your casting result to see through them.
**Strong.** As above, and the disguises include matching sounds (voice, footsteps) — observers suffer +1 bane on detection attempts.
**Critical.** As above with +1 bane on detection, and the disguises also include tactile elements (texture of clothing, warmth of skin) — only magical detection automatically pierces the illusion.

> **Design Note**: R3 group disguise. Core effect (disguise 4 creatures, short duration) is reliable on any success — SL improves disguise quality, not target count or duration.

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

**Effect.** As a Quick Action when targeted by an attack, gain +2 to your Dodge or Parry against the triggering attack. If the attack misses, you become briefly invisible until the end of your next turn or until you attack or cast a spell.

> **Design Note**: R1 Quick Action reactive defense. Standardized base (+2 Dodge/Parry) with Illusion's signature secondary: brief invisibility on successful dodge. No SL scaling — one reliable defensive reaction.

### Phantasmal Armor

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Self | Self | concentrate, illusory, enchant (short)

*You shroud yourself in an illusion of shifting, menacing forms — enemies perceive attacking you as dangerous or futile.*

**Effect.** On a success, for a short duration, whenever a creature within close range attacks you, they must make a Spirit + Insight roll vs. your casting result. On a failure, they perceive illusory armor and flinch — they suffer +1 bane on the triggering attack and take +2 psychic damage from the hallucination.

> **Design Note**: Defensive illusion. Single reliable effect — no SL scaling. The effect is modest (bane + minor damage) but applies to all attacks, making it a strong sustained defense.

### Labyrinth of Mirrors

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Medium | concentrate, illusory

*You trap a creature's mind in an ever-shifting maze of reflections and false corridors, leaving their body standing helpless.*

**Weak.** One creature is trapped in an illusory maze for a short duration. They are confused and cannot take Actions (only Quick Actions) as they try to navigate the false corridors. At the end of each of their turns, they can roll Mind + Perception vs. your casting result to escape.
**Strong.** As above, and escape attempts suffer +1 bane as the maze shifts and adapts.
**Critical.** As above with +1 bane on escape, and when the target finally escapes, they are briefly dazed from disorientation.

> **Design Note**: R4 single-target lockdown. Core effect (confused, short duration, per-turn escape) is reliable on any success — SL adds escape difficulty and exit penalty.

### Phantasmal Catastrophe

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Short | concentrate

*You project a terrifying mass hallucination — the earth splitting, the sky falling, buildings collapsing — flooding the minds of all creatures in the area with overwhelming psychic horror.*

**Weak.** All creatures in a short area experience a vivid hallucination of catastrophe. They take +5 psychic damage and are confused for a short duration.
**Strong.** As above with +10 psychic damage, and confused creatures suffer +1 bane on all Perception-based rolls for the duration.
**Critical.** As above with +15 psychic damage, and confused creatures also take +4 psychic damage at the start of each of their turns from the phantom terrors.

> **Design Note**: R4 AoE hallucination. Damage uses half single-target R4 scaling (+5/+10/+15). Core condition (confused, short duration) is reliable on any success — SL adds damage and perception debuffs, not escalating conditions.

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

**Weak.** All creatures in a close area are drawn into a shared hallucination. They take +6 psychic damage and are confused for a short duration, unable to distinguish allies from enemies or real threats from phantom ones.
**Strong.** As above with +12 psychic damage, and confused creatures suffer +1 bane on all Perception-based rolls for the duration.
**Critical.** As above with +18 psychic damage, and confused creatures also suffer +1 bane on all saves to break free of the confusion.

> **Design Note**: R5 offensive capstone for Illusion. AoE uses half single-target R5 scaling (+6/+12/+18). Core condition (confused, short duration) is reliable on any success — SL adds damage and debuffs, not escalating to domination.

### Phantom Feint

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Medium TN | Close | illusory

*You conjure a brief illusory afterimage of yourself darting in another direction while your real form fades momentarily from notice.*

**Weak.** You create a flickering duplicate of yourself that dashes up to close range in any direction and then vanishes. Until the end of your next turn, you gain +1 boon on Stealth checks against creatures that saw the duplicate.
**Strong.** As above with +2 boons on Stealth checks.
**Critical.** As above with +2 boons, and one creature of your choice that saw the duplicate is briefly misdirected — it believes the duplicate was real and must use a Quick Action to reorient.

> **Design Note**: R0 misdirection cantrip. Pure utility for stealth and evasion — fills the R0 misdirection gap. No damage, emphasizing Illusion's utility identity.

### Phantom Pain

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | vs. Resist | Medium | —

*You implant a vivid hallucination of injury in a creature's mind — a phantom blade in the gut, searing fire on the skin, or crushing pressure on the chest. The pain feels entirely real.*

**Weak.** One creature within medium range experiences illusory agony. They take +4 psychic damage and are briefly frightened as their body recoils from the phantom wound.
**Strong.** As above with +8 psychic damage, and the target suffers +1 bane on its next action from lingering phantom pain.
**Critical.** As above with +12 psychic damage, and the target's concentration is broken if they are maintaining a spell.

> **Design Note**: R1 hallucination offense. Fills the R1 hallucinations gap between Horrific Vision (R0) and Hallucinated Swarm (R2). Single-target R1 damage (+4/+8/+12). Core: psychic damage + briefly frightened on any success. SL scales damage and adds secondary effects.

### Warped Perspective

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Medium TN | Medium | concentrate, illusory

*You twist spatial perception in a close area — walls bend, floors tilt, and distances shift unpredictably. Creatures within struggle to judge depth and direction.*

**Weak.** For a short duration, a close area within medium range becomes difficult terrain as creatures misjudge distances and steps. Ranged attacks targeting or originating from creatures in the area suffer +1 bane. Creatures that enter the area or start their turn there take +2 psychic damage from vertigo.
**Strong.** As above with +4 psychic damage.
**Critical.** As above with +6 psychic damage, and creatures starting their turn in the area are also briefly dazed from the disorientation.

> **Design Note**: R1 distortion control/utility. Establishes distortion's mechanical identity: spatial manipulation that impairs movement and ranged combat. Core: difficult terrain + ranged bane on any success. AoE R1 damage (+2/+4/+6). Begins the distortion chain.

### Funhouse Mirror

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | vs. Resist | Medium | concentrate, illusory

*You conjure a zone of distorted reflections and warped angles. Creatures within see twisted versions of their surroundings — stretched corridors, multiplied reflections, and impossible perspectives that fracture certainty.*

**Weak.** For a short duration, creatures in a close area within medium range suffer +1 bane on all attacks as they misjudge where targets truly stand. Creatures take +3 psychic damage from the warped perceptions when they enter the area or start their turn there.
**Strong.** As above with +6 psychic damage, and creatures also suffer +1 bane on Dodge as reflections conceal the direction of incoming attacks.
**Critical.** As above with +9 psychic damage, and creatures entering the area are briefly confused as they lose track of which reflection is real.

> **Design Note**: R2 distortion control. Advances the distortion chain with stronger area denial. Core: attack bane on any success. AoE R2 damage (+3/+6/+9). SL adds defensive penalty and confusion as secondary effects.

### Programmed Illusion

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Medium TN | Medium | illusory

*You weave a dormant illusion that lies in wait for a trigger you specify — a creature entering an area, a word spoken aloud, a door opened — then activates with vivid, pre-scripted detail.*

**Weak.** You create a detailed illusory scene (up to a close area) at a point within medium range. The illusion lies dormant and invisible until a trigger condition you specify occurs. When triggered, the illusion plays out for a short duration, then vanishes. Observers can attempt Spirit + Perception vs. your casting result to detect it.
**Strong.** As above, and the illusion includes convincing auditory and olfactory elements. Detection attempts suffer +1 bane.
**Critical.** As above with +1 bane on detection, and the illusion can react to nearby creatures in limited ways (turn to face them, repeat pre-set phrases, gesture). Duration extends to medium once triggered.

> **Design Note**: R3 trickery utility. A "set and forget" illusion — notably does NOT require concentration, making it uniquely powerful for ambushes and long-term deceptions. Fills the trickery R3 gap. Core: triggered illusion on any success. SL improves fidelity and duration.

### Shattered Perspective

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist | Medium | concentrate

*You fracture a creature's spatial perception, forcing them to see multiple overlapping versions of reality simultaneously — contradictory viewpoints that strain the mind to breaking.*

**Weak.** One creature within medium range is overwhelmed by contradictory perspectives for a short duration. They are confused and take +8 psychic damage as their mind strains to reconcile impossible viewpoints.
**Strong.** As above with +16 psychic damage, and the target suffers +1 bane on saves against illusion spells for the duration.
**Critical.** As above with +24 psychic damage, and the target is also briefly blinded as their vision fractures completely.

> **Design Note**: R3 distortion offense/control. Single-target lockdown with heavy psychic damage. Core: confused on any success. Single-target R3 damage (+8/+16/+24). SL scales damage and adds illusion vulnerability or blinding.

### Veil of Deception

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Hard TN | Close | concentrate, enchant (short)

*You weave a potent veil of misdirection around a creature, obscuring its presence from all senses. Unlike lesser invisibility, this veil repairs itself after each action — attacking, casting, and interacting do not break the concealment.*

**Weak.** One willing creature within close range becomes invisible for a short duration. This invisibility does not break when the target attacks, casts spells, or interacts with objects. Detecting the invisible creature requires Spirit + Perception vs. your casting result.
**Strong.** As above, and the target leaves no traces (footprints, displaced air, sound of movement). Detection attempts suffer +1 bane.
**Critical.** As above with +1 bane on detection, and the target can extend the veil to one adjacent ally for the duration. Both creatures benefit from the full effect.

> **Design Note**: R4 misdirection utility. "Persistent invisibility" that doesn't break on actions — a fundamentally different mechanic from R2 Invisibility, not a numerical upgrade (justifying a new spell over heightening). Fills the R4 misdirection gap. Core: persistent invisibility on any success.

### Shroud of Forgotten Faces

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Hard TN | Close | concentrate, illusory

*You shroud yourself and your allies in a veil of anonymity — faces blur, voices become indistinct, and identifying features fade from perception and memory.*

**Weak.** For a short duration, you and up to 6 willing creatures within close range become unidentifiable. Observers cannot remember distinguishing features, and divination magic targeting any shrouded creature suffers +2 banes. Shrouded creatures gain +2 boons on Stealth checks in crowds.
**Strong.** As above, and observers who try to focus on a shrouded creature must succeed on Spirit + Perception vs. your casting result or lose track of them entirely, as though the creature vanished in the crowd.
**Critical.** As above, and shrouded creatures can change their apparent height, build, and gender at will. Even magical tracking fails to identify them.

> **Design Note**: R4 obfuscation utility. Group anonymity — distinct from Seeming (R3, which provides fake identities). This spell makes identity *unreadable* rather than *replaced*. Fills the R4 obfuscation gap. Core: anonymity on any success. SL improves detection resistance.

### Impossible Geometry

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Medium | concentrate, illusory

*You reshape perceived space into impossible architecture — stairs that loop endlessly, corridors that lead back to their beginnings, doors that open onto walls. The area becomes a spatial trap with no valid exit.*

**Weak.** For a short duration, creatures in a close area within medium range are trapped in warped space. They cannot willingly leave the area — every exit loops back inside. They take +5 psychic damage from the spatial disorientation. At the end of each of their turns, a trapped creature can attempt Mind + Perception vs. your casting result to navigate free.
**Strong.** As above with +10 psychic damage, and escape attempts suffer +1 bane as the geometry shifts in response to movement.
**Critical.** As above with +15 psychic damage, and creatures that fail their escape attempt are also briefly dazed by the impossible angles.

> **Design Note**: R4 distortion control. AoE spatial trap — distinct from Labyrinth of Mirrors (R4 hallucinations, single-target mental maze). This affects an area through warped space rather than one mind through false visions. AoE R4 damage (+5/+10/+15). Core: can't leave, per-turn escape on any success.

### Mirage Arcane

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Hard TN | Long | concentrate, illusory, material cost (rare illusory pigments worth 5,000 coins)

*You reshape the perceived landscape across an enormous area, creating a false environment indistinguishable from reality. Unlike lesser illusions, this mirage has substance — walls block movement, bridges support weight, water feels wet and cold.*

**Weak.** You alter terrain in a medium area within long range for a short duration. The changes are total: add, remove, or reshape terrain features as you wish. The illusory terrain is semi-tangible — walls and floors support weight and block movement, though they deal no damage. Creatures can attempt Spirit + Perception vs. your casting result to detect the illusion, but even aware creatures must physically navigate the false terrain.
**Strong.** As above, and the duration extends to medium. Detection attempts suffer +1 bane. The semi-tangible elements can include simple mechanisms (doors that open, drawbridges that lower).
**Critical.** As above, and the duration extends to long. Aware creatures can pass through illusory walls, but doing so is disorienting (difficult terrain).

> **Design Note**: R5 trickery capstone. The ultimate terrain illusion — semi-tangible false reality. Distinct from Grand Illusion (R4, visual/auditory only, no physical substance). Material cost of 5,000 coins constrains casual use. Core: semi-tangible terrain on any success. SL scales duration and fidelity.

### Dream Shroud

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Medium | concentrate, material cost (a dreamcatcher woven from shadow-silk worth 5,000 coins)

*You engulf an area in a veil of dreamlike unreality. All sensory information becomes unreliable — sounds echo from wrong directions, faces shift and blur, the ground feels uncertain, and the boundary between real and imagined dissolves completely.*

**Weak.** All creatures in a short area within medium range are engulfed in dreamlike obfuscation for a short duration. They are blinded beyond melee range and confused. All Perception checks within the area automatically fail. Creatures take +6 psychic damage from the overwhelming sensory dissolution.
**Strong.** As above with +12 psychic damage, and confused creatures suffer +1 bane on saves to end the confusion.
**Critical.** As above with +18 psychic damage, and the area expands to medium range. Creatures that recover from confusion are briefly frightened as reality reasserts itself.

> **Design Note**: R5 obfuscation capstone. Total sensory denial — distinct from Maze of Madness (R5 hallucinations, shared nightmare). This spell drowns the area in formless unreality rather than crafting a specific false vision. AoE R5 damage (+6/+12/+18). Core: blinded + confused on any success.

### Unraveled Reality

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Medium | concentrate, material cost (a shattered prism of perfect clarity worth 5,000 coins)

*You tear at the fabric of perceived space, unraveling spatial coherence across a wide area. Distances become meaningless, directions contradict themselves, and the geometry of reality breaks down into a shifting, impossible maze.*

**Weak.** All creatures in a short area within medium range experience total spatial breakdown for a short duration. They are confused and cannot willingly move — every step leads somewhere unexpected. Creatures take +6 psychic damage from the impossible geometry. At the end of each of their turns, a trapped creature can attempt Mind + Perception vs. your casting result to anchor their spatial awareness and escape the effect.
**Strong.** As above with +12 psychic damage. Escape attempts suffer +1 bane, and all ranged attacks within or through the zone automatically fail as spatial paths no longer connect.
**Critical.** As above with +18 psychic damage. The area expands to medium range, and creatures that escape are briefly dazed from residual spatial disorientation.

> **Design Note**: R5 distortion capstone. The pinnacle of spatial manipulation — complete spatial breakdown. Distinct from Impossible Geometry (R4, creatures can't *leave* the area) — here, creatures can't *move at all* and space itself is incoherent. AoE R5 damage (+6/+12/+18). Material cost of 5,000 coins. Core: confused + immobile, per-turn escape on any success.

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
- [x] R1 Quick Action: Illusory Dodge (R1 proposed) — standardized reactive defense (+2 Dodge/Parry, illusory double secondary)
- ⚠️ Defensive options: Illusory Dodge (R1 proposed), Phantasmal Armor (R2 proposed) — improved but no sustained defense
- [x] Utility: Strong across disguise (Disguise Form, Seeming, Perfect Disguise), invisibility, terrain illusions, Grand Illusion (R4 proposed)
- [x] Damage across ranks: Psychic damage now covered — Horrific Vision (R0), Phantasmal Killer (R3), Phantasmal Catastrophe (R4 proposed), Maze of Madness (R5 proposed)
- [x] Repeating conditions: Frightened, confused, charmed, blinded, dominated well-covered
- ⚠️ Setup+payoff: "Believe illusion → vulnerable" is conceptually strong but lacks explicit mechanical triggers
- ⚠️ **3 spells per rank minimum**: Met at R0-R4 (R0: 4, R1: 6, R2: 8, R3: 3, R4: 3). R5 has 2 — needs one more spell
- ⚠️ **Remaining gaps**: Distortion trait R1+, hallucinations R1, R5 needs one more spell for 3-per-rank minimum
