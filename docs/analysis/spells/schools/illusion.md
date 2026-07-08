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

Framework: [synergy-framework.md](../../../../.claude/skills/spell-design/references/synergy-framework.md) — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Illusion emits: **false belief** (the target has accepted something untrue: a phantom enemy, a disguise, terrain that is not there), *frightened* / *confused* (horror and sensory overload), and **misdirected attention** — wasted actions, wrong targets, mirror images soaking attacks. Illusion's field-reshaping is unique: it changes the battlefield *in the enemy's head* without moving a stone.

**Payoff levers** — Illusion punishes commitment to the lie: the enemy who charges the False Enemy is out of position for real, the swing that pops a Mirror Image was a whole wasted action, and psychic shocks bite hardest against a mind already unmoored (*confused*, deceived). Cold-cast deficit built into the chassis: every illusion carries the *illusory* property save — against a calm, suspicious observer the spell can simply fail, so the school's power is always discounted by disbelief.

**Extenders** — *layering* is the signature: multiple concentration-free illusions compound (the disguise inside the illusory terrain behind the phantom patrol), each lie making the next more plausible. *Refresh* by re-seeding doubt (a fresh whisper, a new flicker at the vision's edge), *prolong* via Programmed and standing illusions that wait like traps.

**Solo engine** (multi-turn): T1 Illusionary Terrain (the floor over the real pit looks solid) → T2 False Enemy charging from the direction that herds the target onto it → T3 Horrific Vision to spend the panic once the target realizes what is happening. Gated by the disbelief save at every layer and by the fiction — one seen-through illusion collapses trust in the rest.

**Party interlock**: **emits** *frightened*, *confused*, wasted enemy actions, cover-that-isn't (concealment, disguises, hidden allies) — action-economy currency: every attack that hits a phantom is an attack the party did not eat. **wants** real threats to lend the lie weight — a genuine martial in the phantom squad makes every phantom credible — and real damage to spend its misdirection. Cross-player line: Illusion masks the rogue among three phantom duplicates and the enemy champion guesses wrong twice before the real blade lands.

**Synergy gaps**: setup and extenders are the school's whole identity and are rich, but **payoff depends almost entirely on the enemy's choices** — nothing published mechanically spends *believed* status (e.g. a spell that strikes harder from inside an active illusion). R3+ is largely proposed-only, so high-rank engines are unbuilt. Both are design targets.

**Synergy gap proposals** (sketches, post-framework — design fresh per current principles):
- **Shattered Veil** (R2, payoff) — collapse one of your active illusions into a burst of psychic whiplash: every enemy who had not seen through it takes psychic damage and is briefly *confused* as the false world tears. Spends the *believed* state directly; worthless with no illusion standing.
- **Knife Behind the Mask** (R2, payoff) — an attack (yours or an ally's you conceal) made from inside your active illusion or disguise gains a boon and bonus damage as the lie drops at the last instant. Formalizes "strike from the false" — cold-cast impossible.
- **Web of Lies** (R3, extender/layer) — bind up to three of your minor illusions into one coherent false scene that shares a single disbelief roll at a bane. Layering as an actual mechanic: each lie props up the others until the whole web tears at once.

## Current Spell Inventory (18 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Horrific Vision, Maddening Whispers, Minor Illusion |
| 1 | 5 | Color Spray, Disguise Form, False Enemy, Illusory Trap, Mirror Image |
| 2 | 7 | Hallucinated Swarm, Illusionary Terrain, Invisibility, Major Illusion, Misdirection, Trap Room, Waking Dream |
| 3 | 3 | Mislead, Phantasmal Killer, Seeming (incomplete) |
| 4 | 0 | — |
| 5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| trickery | Minor Illusion | Illusory Trap, False Enemy | Illusionary Terrain, Trap Room | Programmed Illusion† | Grand Illusion† | Mirage Arcane† |
| misdirection | Phantom Feint† | Mirror Image, Illusory Dodge† | Misdirection, Invisibility | Mislead | Veil of Deception† | Perfect Disguise† |
| obfuscation | Maddening Whispers | Color Spray, Disguise Form | Waking Dream, Phantasmal Armor† | Seeming | Shroud of Forgotten Faces† | Dream Shroud† |
| hallucinations | Horrific Vision | Phantom Pain† | Hallucinated Swarm, Major Illusion | Phantasmal Killer | Phantasmal Catastrophe†, Labyrinth of Mirrors† | Maze of Madness† |
| distortion | Sensory Trick† | Warped Perspective† | Funhouse Mirror† | Shattered Perspective† | Impossible Geometry† | Unraveled Reality† |

*†Proposed new spell*

**Coverage**: all 30 trait×rank slots have at least a concept seed (published spell or proposed concept). Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).

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

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Seed |
|---|---|---|
| Sensory Trick | 0 | You create a brief sensory disturbance — a sudden sound, smell, flash of light, or tactile sensation — to distract or misdirect. (Fills R0 distortion/hallucination gap) |
| Illusory Dodge | 1 | You conjure a flickering illusory double of yourself at the last instant, confusing your attacker's aim. (R1 Quick Action reactive defense) |
| Phantasmal Armor | 2 | You shroud yourself in an illusion of shifting, menacing forms — enemies perceive attacking you as dangerous or futile. (Defensive illusion) |
| Labyrinth of Mirrors | 4 | You trap a creature's mind in an ever-shifting maze of reflections and false corridors, leaving their body standing helpless. (R4 single-target lockdown) |
| Phantasmal Catastrophe | 4 | You project a terrifying mass hallucination — the earth splitting, the sky falling, buildings collapsing — flooding the minds of all creatures in the area with overwhelming psychic horror. (R4 AoE hallucination) |
| Grand Illusion | 4 | You weave an enormous, detailed illusion that fills an entire area — phantom buildings, false terrain, illusory armies, or elaborate environmental changes. (R4 capstone utility — the ultimate illusory creation) |
| Perfect Disguise | 5 | You weave the most convincing illusion possible — a disguise so perfect that even magical detection struggles to penetrate it. (R5 capstone — the pinnacle of illusory deception) |
| Maze of Madness | 5 | You trap multiple creatures in a shared nightmarish hallucination — a labyrinth of impossible geometry, shifting walls, and maddening whispers that break the will of those caught within. (R5 offensive capstone for Illusion) |
| Phantom Feint | 0 | You conjure a brief illusory afterimage of yourself darting in another direction while your real form fades momentarily from notice. (R0 misdirection cantrip) |
| Phantom Pain | 1 | You implant a vivid hallucination of injury in a creature's mind — a phantom blade in the gut, searing fire on the skin, or crushing pressure on the chest. The pain feels entirely real. (R1 hallucination offense) |
| Warped Perspective | 1 | You twist spatial perception in a close area — walls bend, floors tilt, and distances shift unpredictably. Creatures within struggle to judge depth and direction. (R1 distortion control/utility) |
| Funhouse Mirror | 2 | You conjure a zone of distorted reflections and warped angles. Creatures within see twisted versions of their surroundings — stretched corridors, multiplied reflections, and impossible perspectives that fracture certainty. (R2 distortion control) |
| Programmed Illusion | 3 | You weave a dormant illusion that lies in wait for a trigger you specify — a creature entering an area, a word spoken aloud, a door opened — then activates with vivid, pre-scripted detail. (R3 trickery utility) |
| Shattered Perspective | 3 | You fracture a creature's spatial perception, forcing them to see multiple overlapping versions of reality simultaneously — contradictory viewpoints that strain the mind to breaking. (R3 distortion offense/control) |
| Veil of Deception | 4 | You weave a potent veil of misdirection around a creature, obscuring its presence from all senses. Unlike lesser invisibility, this veil repairs itself after each action — attacking, casting, and interacting do not break the concealment. (R4 misdirection utility) |
| Shroud of Forgotten Faces | 4 | You shroud yourself and your allies in a veil of anonymity — faces blur, voices become indistinct, and identifying features fade from perception and memory. (R4 obfuscation utility) |
| Impossible Geometry | 4 | You reshape perceived space into impossible architecture — stairs that loop endlessly, corridors that lead back to their beginnings, doors that open onto walls. The area becomes a spatial trap with no valid exit. (R4 distortion control) |
| Mirage Arcane | 5 | You reshape the perceived landscape across an enormous area, creating a false environment indistinguishable from reality. Unlike lesser illusions, this mirage has substance — walls block movement, bridges support weight, water feels wet and cold. (R5 trickery capstone) |
| Dream Shroud | 5 | You engulf an area in a veil of dreamlike unreality. All sensory information becomes unreliable — sounds echo from wrong directions, faces shift and blur, the ground feels uncertain, and the boundary between real and imagined dissolves completely. (R5 obfuscation capstone) |
| Unraveled Reality | 5 | You tear at the fabric of perceived space, unraveling spatial coherence across a wide area. Distances become meaningless, directions contradict themselves, and the geometry of reality breaks down into a shifting, impossible maze. (R5 distortion capstone) |

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
