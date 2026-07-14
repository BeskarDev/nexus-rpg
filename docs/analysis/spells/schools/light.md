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
6. **Divination boundary (Light vs. Twilight)**: Light owns *present, local truth* (the True keyword) — piercing lies, illusions, invisibility, disguise, and obfuscation on what is before you, and revealing the real nature of a thing in hand. Future-seeing, dreams, omens, prophecy, and scrying distant secrets belong to Twilight. Litmus: *reveal a falsehood in front of me* → Light; *learn a distant secret or what is to come* → Twilight.

### Internal Synergies

Framework: `.claude/skills/spell-design/references/synergy-framework.md` — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Light emits: **revealed** (invisibility burned away, the hidden thing dragged into the open — Revealing Burst, Sun Sphere's merciless light), *blinded* (overwhelming radiance), *burning* (holy fire), and **exposed falsehood** (Detect Lies, curses laid bare) — in the fiction, the sun's judgment stripping every place to hide, physical or moral.

**Payoff levers** — Light strikes what it has revealed: a target dragged from shadow or stripped of disguise eats focused radiance, the undead and the corrupt burn under damage that bites them hardest (anti-undead radiant riders), and True Strike converts a moment of clarity into an ally's unerring blow. Cold-cast deficit: against an honest, visible, living foe, Light's offense is mid-curve — its edge exists only where there was something to expose.

**Extenders** — *prolong* through standing light sources (Sun Sphere holds the revealed state over an area for the whole scene — hiding is simply off the table inside it), *refresh* by re-flaring (cantrip dazzles re-blind), and *spread* via blessings that touch the whole line at dawn (Blessing of Dawn).

**Solo engine** (multi-turn): T1 Sun Sphere (the shadows in the crypt burn away, everything hidden stands revealed) → T2 Sunbeam into the exposed wight (payoff plus *blinded*) → T3 Radiant Weapon so every following swing carries the fire while the sphere holds the field lit. Gated by Focus and concentration on the light source — quench the sphere and the shadows return.

**Party interlock**: **emits** *revealed*, *blinded*, *burning*, and light itself (the whole party sees; ambushes die) — targeting currency, since a revealed and blinded enemy is attackable by everyone and threatens no one. **wants** heavy hitters to spend its revelation (the assassin it unveiled still needs killing) and front-liners to guard the vulnerable light-bearer. Cross-player line: Light's burst strips the shadow-stalker's concealment mid-pounce and the archer's waiting arrow takes them out of the air.

**Synergy gaps**: reveal-setup is strong but **the reveal payoff is informal** — no published mechanical bonus against *revealed* targets exists; the advantage is only that attacks become possible. The anti-undead chain also stops at R2 (Destroy Undeath) with no greater rite above it. Formalizing a revealed-target payoff and an R3+ undead capstone are the design targets — both are covered by the seed table below.

## Current Spell Inventory (20 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 4 | Dazzling Light, Detect Lies, Illuminated Sight, Revealing Burst |
| 1 | 9 | Blessing of Light, Illuminated Script, Locate Trinket, Protect from Influence, Radiant Burst, Radiant Weapon, Sense Spirits, Sun Sphere, True Strike |
| 2 | 3 | Break Curse, Destroy Undeath, Sunbeam |
| 3 | 4 | Blessing of Dawn, Purifying Light, Solar Flare, Zone of Truth |
| 4 | 0 | — |
| 5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| sun | Dazzling Light | Sun Sphere, Radiant Weapon | Sunbeam | Solar Flare, Purifying Light | *(Solar Flare Heighten)* | Dawnbreak *(seed)* |
| illumination | Illuminated Sight | Blessing of Light, Locate Trinket | Weapon of Revelation *(seed)* | Blessing of Dawn | Hallowed Radiance *(seed)* | Dawnbreak *(seed)* |
| truth | Detect Lies, Revealing Burst | Illuminated Script, Protect from Influence | Break Curse, Sense Spirits | Zone of Truth | *(Zone of Truth Heighten)* | — |
| clarity | Moment of Clarity *(seed)* | True Strike | — | — | — | — |
| judgement | Stern Gaze *(seed)* | Radiant Rebuke *(seed)* | Mark of Judgement *(seed)*, Destroy Undeath | Pillar of Dawn *(seed)* | Divine Judgement *(seed)* | Final Judgement *(seed)* |

**Coverage**: only published spells count as real coverage; *(seed)* entries are undesigned proposals (principle 19) and parenthesized Heighten notes point at proposed Heighten extensions of published spells. The empty cells are deliberate: clarity above R1 and truth above R4 stay empty because high-rank "perfect perception" and "absolute truth" workings would either duplicate the reveal engine or cross the divination boundary into Twilight. Honest empty cells beat filler seeds.


## Proposed Spell Changes

### Purifying Light — Damage Reduction

**Current**: +6/+12/+18 AoE cone at Rank 3
**Proposed**: Reduce to **+4/+8/+12** to match half single-target scaling for multi-target R3
**Rationale**: R3 multi-target should be +4/+8/+12 under revised scaling.

### Heighten Extensions (principle 3 — scale-ups are Heighten notes, not new spells)

Earlier seed lists proposed several "bigger version" capstones. Per principle 3 these become Heighten extensions on the published spells instead (per-rank "…instead" lines, principle 26):

- **Solar Flare** — add (Rank 4) and (Rank 5) Heighten lines scaling damage, healing, and the number of conditions removed. The school's mass heal-and-sear capstone scales here, not in a new spell.
- **Sun Sphere** — add (Rank 2) and (Rank 3) Heighten lines (larger light radius, hotter contact damage). The standing light source grows instead of a separate greater-orb spell.
- **Protect from Influence** — add (Rank 2) and (Rank 3) Heighten lines (additional targets). Party-wide mental warding scales here instead of a separate AoE ward spell.

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Role | Seed |
|---|---|---|---|
| Moment of Clarity | 0 | Support / standalone | Quick touch cantrip of the clarity trait. An ally suffering a mental condition (charmed, confused, frightened) immediately re-rolls their save against it. Grants a re-roll, never outright removal — an at-will removal cantrip would trivialize mental attrition (spirit of principle 11). Complements Protect from Influence's prevention. |
| Stern Gaze | 0 | Offense / payoff | Judgement cantrip, radiant damage vs. Resist, priced below curve when cast cold (+0/+2/+4). Against a target that is *revealed*, *blinded*, or *burning* it deals +2/+4/+6 and briefly dazes them instead. The formal revealed-payoff at will, with the cold-cast deficit built in. |
| Mark of Judgement | 2 | Support / payoff and setup | Castable only on a creature that was concealed, invisible, or disguised this scene and has been *revealed*: a searing brand of light. While branded they cannot hide, turn invisible, or take a disguised form, and attacks against them gain +1 boon for a short duration. Spends the school's reveal and converts it into shared party currency. |
| Weapon of Revelation | 2 | Support / extender | Enchant an ally's weapon with truth-light: their hits briefly re-apply *revealed* (the struck creature cannot hide or turn invisible) and deal +2 radiant damage against Undead. Spread extender that carries the reveal engine onto martial turns between the caster's actions. Distinct from Radiant Weapon, which adds damage and light but emits no state. |
| Pillar of Dawn | 3 | Offense / payoff | A single column of sunfire hammers one point: on-curve radiant burst with anti-Undead riders, and the riders double against Undead standing in your own light source (Sun Sphere, Sunbeam, Hallowed Radiance). The greater rite above Destroy Undeath, keyed to the school's standing-light extenders. |
| Dawnbreak | 5 | Support / setup and extender | Mortal-pinnacle rite: call the dawn early over a long area for a medium duration (concentrate, material cost 5,000+). True sunlight floods the field, magical darkness is dispelled, nothing inside can hide or turn invisible (*revealed*), Undead suffer a flat radiant tick, and allies cannot be frightened. The scene-scale reveal engine every Light payoff cashes in. |
| Final Judgement | 5 | Offense / payoff | Mortal-pinnacle execution in the Finger of Death mold (respects R5 limits, no auto-kill of the living): peak R5 single-target radiant damage only against a target that is *revealed*, branded, *blinded*, or Undead, priced below curve when cast cold. An Undead reduced to 0 HP by it is destroyed and cannot reanimate. |
| Mark-sustaining payoff (name TBD) | 1–2 | Offense / payoff and extender | Owner idea (2026-07-14, during P5 Final Judgement review): a low-rank spell that synergizes with the **marked** condition instead of consuming it. Normally the next attack against a marked target eats the mark. This spell, cast against a marked target, keeps the mark on them and adds something extra (a rider, a spread, a small burst) — an exception to the condition's own end-clause, letting the party's mark-setup pay off more than once. Design fresh when the low-rank Light batch is picked up; mind principle 80 (marked is consumed by the triggering attack — this spell must explicitly state the mark stays). |

## Cross-School Spell Sharing

Light's "truth" and "revelation" themes overlap with the Arcane **Illusion** discipline's detection and anti-illusion effects. Both schools deal with perceiving or stripping away deception, though from opposite philosophical angles — Light reveals truth through divine authority while Illusion understands deception through mastery of it.

### Existing Shared Spells
- **True Strike** (R1): Already exists in both Light (Mystic) and Telepathy (Arcane). Provides attack accuracy through insight — Light frames it as divine clarity, Telepathy as mental prediction. Identical mechanics.

### Potential Sharing Candidates
- **Protect from Influence** (Light R1) ↔ Telepathy: Mental protection overlaps with Telepathy's understanding of mental intrusion. Could share as identical spell with different flavor.
- **Revealing Burst** (Light R0) ↔ Illusion: Both schools have anti-invisibility tools. Light's version uses divine radiance while Illusion's detection works through understanding deception — thematically different enough to remain separate.

### Cross-School Boundary Flags
- **Oath magic belongs to Peace**: Peace's condition identity includes *oath-bound* (law trait). An earlier Light proposal for a binding-oath ritual was cut for this reason — Light enforces present truth (Zone of Truth), Peace binds future conduct. Keep it that way.
- **Twilight owns what lies beyond present truth**: high-rank "see everything, know every falsehood" capstones drift into Twilight's hidden/distant/fated territory. Light's ceiling for truth magic is Zone of Truth with its R4 Heighten.

### Design Notes
- Cross-school sharing is **arcane ↔ mystic only** (never within the same category).
- Shared spells must be **mechanically identical** even if flavor differs.
- Light's anti-deception spells serve a fundamentally different purpose (divine revelation) than Illusion's detection spells (understanding false reality), so most should remain school-specific.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Sun/offense chain**: Dazzling Light (R0) → Radiant Burst, Sun Sphere (R1) → Sunbeam (R2) → Purifying Light, Solar Flare (R3) → Solar Flare Heighten (R4–R5 proposed) — published through R3
2. **Reveal engine**: Revealing Burst, Detect Lies (R0) → Radiant Rebuke (R1 seed) → Mark of Judgement, Weapon of Revelation (R2 seeds) → Hallowed Radiance (R4 seed) → Dawnbreak (R5 seed)
3. **Judgement/payoff chain**: Stern Gaze (R0 seed) → Destroy Undeath (R2) → Pillar of Dawn (R3 seed) → Divine Judgement (R4 seed) → Final Judgement (R5 seed)
4. **Truth chain**: Detect Lies (R0) → Illuminated Script, Protect from Influence (R1) → Break Curse, Sense Spirits (R2) → Zone of Truth (R3, Heighten to R4) — **capped by design**, Twilight owns what lies beyond present local truth
5. **Blessing chain**: Blessing of Light (R1) → Blessing of Dawn (R3) → Solar Flare Heighten (R4–R5 proposed)

### Setup + Payoff Combos
- **Reveal → spend**: Revealing Burst, Radiant Rebuke (seed), Hallowed Radiance (seed), and Dawnbreak (seed) emit *revealed* → Stern Gaze (R0 seed), Mark of Judgement (R2 seed), Divine Judgement (R4 seed), and Final Judgement (R5 seed) spend it. The formerly informal reveal payoff is now explicit at four ranks, each priced with a cold-cast deficit.
- **Standing light → Pillar of Dawn**: Sun Sphere, Sunbeam, or Hallowed Radiance (seed) hold the field lit → Pillar of Dawn (seed) doubles its anti-Undead riders against Undead inside your own light.
- **Extender onto martial turns**: Weapon of Revelation (seed) lets an ally's weapon hits keep *revealed* alive between the caster's turns — the party interlock's spread extender.
- **Anti-undead escalation**: Radiant Weapon (R1) → Destroy Undeath (R2) → Pillar of Dawn (R3 seed) → Divine Judgement (R4 seed) → Final Judgement (R5 seed) — the greater rites above R2 the gap analysis called for.

### Design Completeness Checklist
- [x] **R1 Quick Action**: Radiant Rebuke (R1, published 2026-07-12) — standardized reactive defense (+2 Dodge/Parry, on-miss blind secondary)
- [ ] **3 spells per rank minimum**: met at R0–R3; R4 has two published spells (Divine Judgement, Hallowed Radiance, 2026-07-12); **R5 still empty** — the two R5 seeds are the remaining batch
- [x] Defensive options: Protect from Influence (R1), Blessing of Light resistances (R2+ Heighten), Radiant Rebuke (seed)
- [x] Utility: Illuminated Sight (R0), Detect Lies (R0), Illuminated Script (R1), Locate Trinket (R1), Sense Spirits (R2), Zone of Truth (R3)
- [x] Damage across ranks: published R0–R3 (Dazzling Light, Radiant Burst, Sunbeam, Destroy Undeath, Purifying Light, Solar Flare); R4–R5 seeded (Divine Judgement, Final Judgement)
- [x] Repeating conditions: blinded, revealed, burning — consistent anti-darkness identity
- [x] Setup+payoff: the reveal engine is formalized across the seed table (emitters at R0/R1/R4/R5, spenders at R0/R2/R4/R5, extender at R2)
- [ ] Trait×rank coverage: clarity above R1 and truth above R4 are deliberate empty cells (see matrix note), not gaps to fill

### Impact & Trivialization Review
- **Zone of Truth (R3)**: Moderate risk — truth compulsion is powerful in social scenes. **Mitigations**: targets can choose silence over truth, concentration required, R3 Focus cost (6) is significant. Does not replace Influence/Insight checks — it prevents lies but doesn't compel answers or cooperation. GMs can design around it (NPCs use careful truths, omission, or leave the zone).
- **Dawnbreak (R5 seed)**: Moderate risk — scene-scale anti-stealth shuts down hiding entirely inside it, and a false dawn is visible for miles. **Mitigations**: R5 Focus cost, concentration, mandatory material cost 5,000+; add a worldbuilding framing note when designed (principle 33) — a temple rite of the risen sun, not a tactical floodlight.
- **Final Judgement (R5 seed)**: Low risk — damage capstone within R5 limits; no auto-kill of living creatures, and its full output requires an existing revealed/branded/blinded state or an Undead target.
- **Mark of Judgement (R2 seed)**: Low risk — its precondition (target must have been revealed this scene) prevents cold use; it only converts an earned reveal into a shared window.
- **Moment of Clarity (R0 seed)**: Minimal risk — grants a re-roll of an existing save, never removal, so mental attrition still functions.
