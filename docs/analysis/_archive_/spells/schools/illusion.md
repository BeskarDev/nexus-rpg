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

Framework: `.claude/skills/spell-design/references/synergy-framework.md` — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Illusion emits: **false belief** (the target has accepted something untrue: a phantom enemy, a disguise, terrain that is not there), *frightened* / *confused* (horror and sensory overload), and **misdirected attention** — wasted actions, wrong targets, mirror images soaking attacks. Illusion's field-reshaping is unique: it changes the battlefield *in the enemy's head* without moving a stone.

**Payoff levers** — Illusion punishes commitment to the lie: the enemy who charges the False Enemy is out of position for real, the swing that pops a Mirror Image was a whole wasted action, and psychic shocks bite hardest against a mind already unmoored (*confused*, deceived). Cold-cast deficit built into the chassis: every illusion carries the *illusory* property save — against a calm, suspicious observer the spell can simply fail, so the school's power is always discounted by disbelief.

**Extenders** — *layering* is the signature: multiple concentration-free illusions compound (the disguise inside the illusory terrain behind the phantom patrol), each lie making the next more plausible. *Refresh* by re-seeding doubt (a fresh whisper, a new flicker at the vision's edge), *prolong* via Programmed and standing illusions that wait like traps.

**Solo engine** (multi-turn): T1 Illusionary Terrain (the floor over the real pit looks solid) → T2 False Enemy charging from the direction that herds the target onto it → T3 Horrific Vision to spend the panic once the target realizes what is happening. Gated by the disbelief save at every layer and by the fiction — one seen-through illusion collapses trust in the rest.

**Party interlock**: **emits** *frightened*, *confused*, wasted enemy actions, cover-that-isn't (concealment, disguises, hidden allies) — action-economy currency: every attack that hits a phantom is an attack the party did not eat. **wants** real threats to lend the lie weight — a genuine martial in the phantom squad makes every phantom credible — and real damage to spend its misdirection. Cross-player line: Illusion masks the rogue among three phantom duplicates and the enemy champion guesses wrong twice before the real blade lands.

**Synergy gaps (updated 2026-07-17)**: the belief-spending payoffs are published — *Shattered Veil* (R3) and *Phantasmal Catastrophe* (R4) mechanically consume believed illusions and the school's conditions, *Knife Behind the Mask* (R2) spends concealment, and *Veil of Deception* (R3) is its premier unbroken-concealment setup. Remaining seeds on the engine: *Web of Lies* (R3, the layering extender) and *Programmed Illusion* (R3, the prolong extender).

## Current Spell Inventory (29 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 5 | Horrific Vision, Maddening Whispers, Minor Illusion, Sensory Trick, Phantom Feint |
| 1 | 6 | Color Spray, Disguise Form, False Enemy, Illusory Dodge, Illusory Trap, Mirror Image |
| 2 | 10 | Hallucinated Swarm, Illusionary Terrain, Invisibility, Major Illusion, Misdirection, Trap Room, Waking Dream, Phantasmal Armor, Knife Behind the Mask, Warped Perspective |
| 3 | 5 | Mislead, Phantasmal Killer, Seeming, Shattered Veil, Veil of Deception |
| 4 | 1 | Phantasmal Catastrophe |
| 5 | 2 | Maze of Madness, Mirage Arcane |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| trickery | Minor Illusion | Illusory Trap, False Enemy | Illusionary Terrain, Trap Room | Programmed Illusion†, Web of Lies† | Major Illusion (Heighten) | Mirage Arcane |
| misdirection | Phantom Feint | Mirror Image, Illusory Dodge | Misdirection, Invisibility, Knife Behind the Mask | Mislead, Veil of Deception | — | — |
| obfuscation | Maddening Whispers | Color Spray, Disguise Form | Waking Dream, Phantasmal Armor | Seeming | — | — |
| hallucinations | Horrific Vision | — | Hallucinated Swarm, Major Illusion | Phantasmal Killer, Shattered Veil | Phantasmal Catastrophe | Maze of Madness |
| distortion | Sensory Trick | — | Warped Perspective | Shattered Perspective† | — | — |

*†Proposed new spell (undesigned seed)*

**Coverage (updated 2026-07-17)**: 23 of 30 trait×rank slots hold a published spell or a published Heighten (Veil of Deception published 2026-07-17); 2 R3 seeds remain (Programmed Illusion, Web of Lies).

**Remaining Gaps** (deliberate — an honest empty cell beats a filler seed): hallucinations R1 and distortion R1 (both ranks are already the school's densest), and the R4–R5 cells of misdirection, obfuscation, and distortion. New R4–R5 concepts should only be added when a design batch finds a concept that pulls its weight against the mortal-pinnacle ceiling, not to fill the matrix.

## Proposed Spell Changes

✅ **All published** — Seeming's full text landed at R3 (six creatures, medium duration, Insight counterplay), and Major Illusion carries its Heighten cascade (absorbing the old "Grand Illusion" seed, covering the trickery R4 slot). No pending changes.

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

Role = combat-role / synergy-role. Each seed names the trait(s) it expresses, the condition/state/gimmick it emits or exploits, and what it plugs into.

*Published from this table (2026-07-13 to 2026-07-17): Sensory Trick (R0), Phantom Feint (R0), Phantasmal Armor (R2), Knife Behind the Mask (R2), Warped Perspective (R2), Veil of Deception (R3), Mirage Arcane (R5), Maze of Madness (R5). Shattered Veil (formerly seeded at R2) published at R3, Phantasmal Catastrophe at R4.*

| Concept | Rank | Role | Seed |
|---|---|---|---|
| Programmed Illusion | 3 | Utility / extender | A dormant illusion bound to a trigger you specify (a creature enters the area, a word is spoken, a door opens), then plays out a pre-scripted scene. The prolong extender: a setup that waits like a trap without your presence or concentration. Trickery trait; feeds *Illusory Trap* and *Trap Room* style ambushes. |
| Shattered Perspective | 3 | Control / setup | Fracture one creature's spatial perception: they are slowed (misjudged distances) and their attacks suffer +1 bane for a short duration, save ends. Distortion emitting slowed, a shared socket the whole party spends. |
| Web of Lies | 3 | Utility / extender | The layering gimmick as a mechanic: bind up to three of your active illusory effects in range into one composite scene. Observers roll disbelief once against the whole scene at +1 bane instead of testing each illusion separately. Strengthens and prolongs believed states for *Shattered Veil* and *Phantasmal Catastrophe* to spend. |

## Cross-School Spell Sharing

**Potential Overlap: Illusion (Arcane) ↔ Twilight (Mystic)**

The Twilight tradition shares the "illusion" aspect with the Illusion discipline. Both schools deal in deception, false perception, and manipulation of what creatures believe to be real. Key overlap areas:

- **Illusory creation spells** (Minor Illusion, Major Illusion) could appear in the Twilight spell list, reflecting the moon's association with shadows and false visions
- **Fear/dream effects** (Horrific Vision, Waking Dream, Phantasmal Killer) thematically align with Twilight's dream and secret aspects
- **Disguise spells** (Disguise Form, Seeming) overlap with Twilight's shapeshifting and mystery themes

**Shared Spell Candidates**: Any spell with the `illusory` property is a natural candidate for cross-school sharing between Illusion (Arcane) and Twilight (Mystic). Shared spells must be mechanically identical in both lists.

> **Design Note**: Twilight approaches illusion reverently (mysteries of the moon, prophetic visions) while Illusion approaches it selfishly (deception for personal gain). The same spell mechanics can serve both philosophies with different flavor text.

## Synergy & Completeness Assessment

### Spell Progression Chains
(✨ = undesigned seed)
1. **Trickery chain**: Minor Illusion (R0) → Illusory Trap/False Enemy (R1) → Illusionary Terrain/Trap Room (R2) → ✨ Programmed Illusion/✨ Web of Lies (R3) → Major Illusion Heighten (R4) → Mirage Arcane (R5) — R3 rung still seeds
2. **Misdirection chain**: Phantom Feint (R0) → Mirror Image/Illusory Dodge (R1) → Misdirection/Invisibility/Knife Behind the Mask (R2) → Mislead/Veil of Deception (R3) → *honest gap at R4-R5*
3. **Obfuscation chain**: Maddening Whispers (R0) → Color Spray/Disguise Form (R1) → Waking Dream/Phantasmal Armor (R2) → Seeming (R3) → *honest gap at R4-R5*
4. **Hallucinations chain**: Horrific Vision (R0) → *gap at R1* → Hallucinated Swarm/Major Illusion (R2) → Phantasmal Killer/Shattered Veil (R3) → Phantasmal Catastrophe (R4) → Maze of Madness (R5) — **published**
5. **Distortion chain**: Sensory Trick (R0) → *gap at R1* → Warped Perspective (R2) → ✨ Shattered Perspective (R3) → *honest gap at R4-R5*

### Setup + Payoff Combos
- ✅ **Believed illusion → spent belief**: Shattered Veil (R3) and Phantasmal Catastrophe (R4) mechanically consume the believed state of an active illusory spell — published
- ✅ **Concealment → strike payoff**: Knife Behind the Mask (R2, published) spends hiding inside your own illusion; Veil of Deception (published 2026-07-17) adds the unbroken-concealment setup
- ✨ **Layering → shared disbelief**: Web of Lies (R3 seed) turns the signature layering gimmick into an actual extender — one disbelief roll at +1 bane against the composite scene
- ✅ **Condition suite → capstone payoffs**: frightened/confused emitted by Horrific Vision, Phantasmal Armor, Hallucinated Swarm, Shattered Veil feed Phantasmal Catastrophe's damage step-up and Maze of Madness's save penalty — published
- ✅/✨ **Distortion → shared sockets**: Warped Perspective (published) emits difficult terrain and banes; ✨ Shattered Perspective would add slowed

### Design Completeness Checklist
- [x] R1 Quick Action: Illusory Dodge (R1, published 2026-07-12) — standardized reactive defense (+2 Dodge/Parry, on-miss distracted double)
- [x] Defensive options: Illusory Dodge (R1) plus Phantasmal Armor (R2, sustained) — published, both Weak-role entries justified by principles 4 and 9
- [x] Utility: strong published core (Disguise Form, Seeming, Invisibility, Illusionary Terrain, Major Illusion, Mirage Arcane, Veil of Deception); ✨ Programmed Illusion and ✨ Web of Lies remain seeds at R3
- [x] Damage across ranks: published psychic engine R0-R5 (Horrific Vision → Phantasmal Killer → Shattered Veil → Phantasmal Catastrophe) — payoff-gated by design (Weak Offense role)
- [x] Repeating conditions: frightened, confused, blinded, distracted well-covered; distortion adds difficult terrain (published) and slowed (seed)
- [x] Setup+payoff: believed state (published), concealment (published), layering (✨ Web of Lies)
- [x] **3 spells per rank (published)**: met at R0-R3; R4: 1, R5: 2 — accepted (Weak-role school top end, honest gaps preferred over filler)
- ⚠️ **Remaining honest gaps**: hallucinations R1, distortion R1, and the R4-R5 cells of misdirection, obfuscation, distortion — left open rather than padded (see coverage note above)
