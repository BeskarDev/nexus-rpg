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

**Synergy gaps**: setup and extenders are the school's whole identity and are rich, but **payoff depends almost entirely on the enemy's choices** — nothing published mechanically spends *believed* status, and R3+ is largely unbuilt. Both targets are now seeded in the Proposed New Spells table below: *Shattered Veil* and *Phantasmal Catastrophe* (payoffs that spend belief and the school's conditions), *Knife Behind the Mask* (payoff from concealment), and *Web of Lies* (the layering extender).

## Current Spell Inventory (18 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 5 | Horrific Vision, Maddening Whispers, Minor Illusion, Sensory Trick, Phantom Feint |
| 1 | 5 | Color Spray, Disguise Form, False Enemy, Illusory Trap, Mirror Image |
| 2 | 10 | Hallucinated Swarm, Illusionary Terrain, Invisibility, Major Illusion, Misdirection, Trap Room, Waking Dream, Phantasmal Armor, Knife Behind the Mask, Warped Perspective |
| 3 | 3 | Mislead, Phantasmal Killer, Seeming (incomplete) |
| 4 | 0 | — |
| 5 | 2 | Maze of Madness, Mirage Arcane |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| trickery | Minor Illusion | Illusory Trap, False Enemy | Illusionary Terrain, Trap Room | Programmed Illusion†, Web of Lies† | — | Mirage Arcane† |
| misdirection | Phantom Feint | Mirror Image, Illusory Dodge† | Misdirection, Invisibility, Knife Behind the Mask | Mislead, Veil of Deception† | — | — |
| obfuscation | Maddening Whispers | Color Spray, Disguise Form | Waking Dream, Phantasmal Armor | Seeming | — | — |
| hallucinations | Horrific Vision | — | Hallucinated Swarm, Major Illusion, Shattered Veil† | Phantasmal Killer | Phantasmal Catastrophe† | Maze of Madness† |
| distortion | Sensory Trick | — | Warped Perspective | Shattered Perspective† | — | — |

*†Proposed new spell (undesigned seed)*

**Coverage**: 22 of 30 trait×rank slots hold a published spell or a seed. Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).

**Remaining Gaps** (deliberate — an honest empty cell beats a filler seed): hallucinations R1 and distortion R1 (both ranks are already the school's densest, with five to six published spells), trickery R4 (Major Illusion's proposed Heighten covers large-scale illusions up to R4, see below), and the R4–R5 cells of misdirection, obfuscation, and distortion. New R4–R5 concepts should only be added when a design batch finds a concept that pulls its weight against the mortal-pinnacle ceiling, not to fill the matrix.

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

### Major Illusion — add a Heighten cascade (replaces the former "Grand Illusion" seed)

A grand, area-filling illusion is a bigger Major Illusion, not a new concept (principle 3). Fold it into Major Illusion as Heighten when the spell is next touched: (Rank 3) the illusion can be up to huge and lasts a medium duration instead. (Rank 4) the illusion can fill a close area with several moving, interacting elements and lasts a medium duration instead. This keeps large-scale illusory scenes on one entry and covers the trickery R4 slot without a duplicate spell.

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

Role = combat-role / synergy-role. Each seed names the trait(s) it expresses, the condition/state/gimmick it emits or exploits, and what it plugs into.

| Concept | Rank | Role | Seed |
|---|---|---|---|
| Sensory Trick | 0 | Utility / setup | A momentary false sensation (a sound, a glint, a smell) at a point in range. One creature that fails to resist is briefly distracted and turns toward the false source. Distortion and misdirection at cantrip scale; emits misdirected attention as setup for Stealth, ambushes, and *Knife Behind the Mask*. |
| Phantom Feint | 0 | Support / setup | An illusory afterimage darts one way as you step the other. The deceived enemy briefly misjudges your true position: the next attack against them by you or an ally gains +1 boon. Misdirection as shared party currency, a cantrip setup any martial ally can spend. |
| Phantasmal Armor | 2 | Defense / setup | Concentrate self-veil of shifting, menacing forms: melee attacks against you suffer +1 bane, and an attacker who misses you is briefly frightened. Fills the sustained-defense gap (principle 9) and emits frightened (shared socket) for *Phantasmal Catastrophe* and party payoffs. Weak-role entry justified by the completeness checklist. |
| Knife Behind the Mask | 2 | Offense / payoff | Quick rider on an attack you make while hidden or disguised by your own illusory spell (Invisibility, Mislead, an unbroken Disguise Form): the attack gains +1 boon and bonus damage at the half column (principle 50). Spends concealment; wants *Veil of Deception* as its premier setup. Distinct from Twilight's cast-from-darkness identity: it keys off your own illusion, not ambient dark. |
| Warped Perspective | 2 | Control / setup | A zone where distance and direction lie: ranged attacks into or through it suffer +1 bane and the ground counts as difficult terrain (misjudged footing). Makes the distortion trait mechanical for the first time; emits difficult terrain and banes (shared sockets) without moving a stone. |
| Programmed Illusion | 3 | Utility / extender | A dormant illusion bound to a trigger you specify (a creature enters the area, a word is spoken, a door opens), then plays out a pre-scripted scene. The prolong extender: a setup that waits like a trap without your presence or concentration. Trickery trait; feeds *Illusory Trap* and *Trap Room* style ambushes. |
| Shattered Perspective | 3 | Control / setup | Fracture one creature's spatial perception: they are slowed (misjudged distances) and their attacks suffer +1 bane for a short duration, save ends. Distortion emitting slowed, a shared socket the whole party spends. |
| Veil of Deception | 3 | Utility / setup | Invisibility that does not break when you attack or cast a spell, concentrate, short duration. A genuinely new capability over Invisibility (principle 18: new interaction, not a Heighten), and the premier setup for *Knife Behind the Mask*. |
| Web of Lies | 3 | Utility / extender | The layering gimmick as a mechanic: bind up to three of your active illusory effects in range into one composite scene. Observers roll disbelief once against the whole scene at +1 bane instead of testing each illusion separately. Strengthens and prolongs believed states for *Shattered Veil* and *Phantasmal Catastrophe* to spend. |
| Mirage Arcane | 5 | Utility / setup | Reshape the perceived landscape across a long area for a medium duration, engaging all senses. Deceived creatures treat the false terrain as real (difficult terrain, walls they will not cross) until they disbelieve. Purely perceptual, never solid (substance belongs to Conjuration). Material cost (5,000+). The R5 belief engine every payoff in the school feeds on. |
| Maze of Madness | 5 | Control / payoff | Trap creatures in a close area (tier up to your Arcana, cap never scales, principle 31) in a shared hallucinated labyrinth: they are confused and cannot willingly leave the area, save ends, and any physical disturbance grants an immediate re-roll (principle 37). Targets already frightened or confused save at +1 bane. Concentrate, material cost (5,000+). Distinct from Telepathy's Mass Hold: bodies wander lost inside a false maze, minds deceived, never paralyzed. |

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
1. **Trickery chain**: Minor Illusion (R0) → Illusory Trap/False Enemy (R1) → Illusionary Terrain/Trap Room (R2) → Programmed Illusion/Web of Lies (R3 proposed) → *R4 via Major Illusion Heighten (proposed)* → Mirage Arcane (R5 proposed)
2. **Misdirection chain**: Phantom Feint (R0 proposed) → Mirror Image/Illusory Dodge (R1, R1 proposed) → Misdirection/Invisibility/Knife Behind the Mask (R2, R2 proposed) → Mislead/Veil of Deception (R3, R3 proposed) → *honest gap at R4-R5*
3. **Obfuscation chain**: Maddening Whispers (R0) → Color Spray/Disguise Form (R1) → Waking Dream/Phantasmal Armor (R2, R2 proposed) → Seeming (R3) → *honest gap at R4-R5*
4. **Hallucinations chain**: Horrific Vision (R0) → *gap at R1* → Hallucinated Swarm/Major Illusion/Shattered Veil (R2, R2 proposed) → Phantasmal Killer (R3) → Phantasmal Catastrophe (R4 proposed) → Maze of Madness (R5 proposed)
5. **Distortion chain**: Sensory Trick (R0 proposed) → *gap at R1* → Warped Perspective (R2 proposed) → Shattered Perspective (R3 proposed) → *honest gap at R4-R5* — the seeds give distortion a mechanical identity for the first time: it emits shared sockets (difficult terrain, slowed, banes) by warping perception of space

### Setup + Payoff Combos
- ✅ **Believed illusion → spent belief**: Shattered Veil (R2 seed) and Phantasmal Catastrophe (R4 seed) mechanically consume the believed state of an active illusory spell — the gap flagged in Synergy gaps is now seeded at two ranks
- ✅ **Concealment → strike payoff**: Knife Behind the Mask (R2 seed) spends hiding inside your own illusion (Invisibility, Mislead, Disguise Form), with Veil of Deception (R3 seed) as its unbroken-concealment setup
- ✅ **Layering → shared disbelief**: Web of Lies (R3 seed) turns the signature layering gimmick into an actual extender — one disbelief roll at +1 bane against the composite scene
- ✅ **Condition suite → capstone payoffs**: frightened/confused emitted by Horrific Vision, Phantasmal Armor, Hallucinated Swarm, Shattered Veil feed Phantasmal Catastrophe's damage step-up and Maze of Madness's save penalty
- ✅ **Distortion → shared sockets**: Warped Perspective and Shattered Perspective emit difficult terrain, slowed, and banes for the whole party to spend

### Design Completeness Checklist
- [x] R1 Quick Action: Illusory Dodge (R1, published 2026-07-12) — standardized reactive defense (+2 Dodge/Parry, on-miss distracted double)
- [x] Defensive options: Illusory Dodge (R1 seed) plus Phantasmal Armor (R2 seed, sustained) — both Weak-role entries justified by principles 4 and 9
- [x] Utility: strong published core (Disguise Form, Seeming, Invisibility, Illusionary Terrain, Major Illusion) extended by Veil of Deception, Programmed Illusion, Web of Lies, Mirage Arcane (seeds)
- [x] Damage across ranks: published R0-R3 psychic engine (Horrific Vision through Phantasmal Killer); R4-R5 damage is deliberately payoff-gated (Shattered Veil, Phantasmal Catastrophe) — Offense is a Weak role, so cold damage stays below curve by design
- [x] Repeating conditions: frightened, confused, blinded, distracted well-covered; seeds add slowed and difficult terrain via distortion
- [x] Setup+payoff: explicitly seeded — believed state (Shattered Veil, Phantasmal Catastrophe), concealment (Knife Behind the Mask), layering (Web of Lies)
- ⚠️ **3 spells per rank (published)**: met at R0-R2; R3 has 3 published but R4-R5 have none — the R4-R5 seeds (Phantasmal Catastrophe, Mirage Arcane, Maze of Madness) are the next design batch's priority
- ⚠️ **Remaining honest gaps**: hallucinations R1, distortion R1, and the R4-R5 cells of misdirection, obfuscation, distortion — left open rather than padded (see coverage note above)
