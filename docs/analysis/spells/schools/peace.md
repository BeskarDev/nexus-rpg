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
2. Travel and law are core thematic pillars — now largely published (travel: Wayfinder's Mark → Swift Journey → Wayfarer's Shield → Pilgrim's Gate → The Pilgrim's Road; law: Oathmark, Peace Bond, Herald's Aegis, Sacred Covenant)
3. Damage should feel defensive/deterrent rather than aggressive
4. Selflessness emphasizes self-sacrifice costs (HP transfer, taking hits, absorbing deaths)
5. Peace stands at 32 published spells (updated 2026-07-17) — remaining seeds (R3 only): Binding Calm, Safe Passage. The R2 seeds Steady Hands and Binding Oath were rejected in the P7 low-rank cycle (Renewed Resolve and Herald's Aegis took their niches)

### Internal Synergies

Framework: `.claude/skills/spell-design/references/synergy-framework.md` — roles (setup / payoff / extender), the two axes, and the shared socket set.

Peace is a **defensive** school, so its setup states are protective rather than offensive, and it stress-tests the framework: its "payoff" is usually an ally staying alive or an attacker shut down, not bonus damage. That still fits the three roles.

**Setup levers** — states Peace emits: *protected* and **cover** (sanctuary auras and domes), *dazed* / *charmed* (pacification), *slowed* (Slow), and **damage-redirect links** (Share Harm, Harmonic Link plant a channel that later spends when the linked ally would be hit).

**Payoff levers** — Peace rewards **restraint and protection**, not aggression: allies who abstain from attacking gain enhanced healing (Blessing of Peace), a redirect link pays off the moment a protected ally takes a hit it can shunt to the caster, and its deterrent damage only bites attackers who strike *into* a sanctuary. The cold-cast deficit is natural here — a pacify or a shield does nothing offensive on its own; the value lands only when an enemy would otherwise have connected.

**Extenders** — *prolong / expand* the protective field (the Aura → Dome → Sphere chain grows the warded area rank by rank), *refresh* pacification (Pacifying Presence re-dazes attackers each turn), and *spread* protection across more allies (Harmonic Link networks additional bodies into the safety web).

**Solo engine** (multi-turn): T1 Dome of Sanctuary (warded zone + cover over the party) → T2 Share Harm / Martyrdom's Blessing (arm the redirect so incoming harm shunts to the caster) → T3 Slow / Pacifying Presence to *daze* the attacker who broke through, keeping the window open. Gated by concentration on the dome and by a self-sacrifice HP cost, so the protector pays in their own body to keep the engine running.

**Party interlock**: **emits** *protected*, *cover*, *slowed*, *dazed* — defensive currency that keeps fragile allies alive and shuts an attacker down for a turn (a dazed, slowed enemy is a free reposition or focus-kill for the martials). **wants** a frontline that will body-block and enemies funneled into one place (a tank holding a chokepoint, or a Telekinetics wall channeling the mob). Cross-player line: a martial guardian holds a doorway inside the Dome while Peace redirects the blows the tank cannot avoid and dazes whoever pushes through.

**Synergy gaps (updated 2026-07-16)**: the *protected*-state payoffs are now published — Shield of the Meek (attacker pays for striking a warded ally) and Renewed Resolve (a warded ally heals and gains a boon) both spend the school's own setups; the offense-facing "safe → hits harder" concept (old Steady Hands seed) was rejected with them. Still a seed: *Binding Calm* (R3, the daze → stun convert extender).

## Current Spell Inventory (32 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 6 | Aura of Sanctuary, Calming Influence, Oathmark, Shared Burden, Tranquil Mind, Wayfinder's Mark |
| 1 | 7 | Absorb Harm, Blessing of Peace, Harmonic Link, Pacifying Weapon, Peace Bond, Share Harm, Swift Journey |
| 2 | 8 | Dome of Sanctuary, Herald's Aegis, Renewed Resolve, Shield of the Meek, Slow, Spell-breaking Wave, Warded Threshold, Wayfarer's Shield |
| 3 | 5 | Anti-Magic Field, Martyrdom's Blessing, Pacifying Presence, Righteous Verdict, Serene Exile |
| 4 | 2 | Pilgrim's Gate, Redemptive Sacrifice |
| 5 | 4 | Sacred Covenant, Sanctuary Sphere, The Pilgrim's Road, Undying Devotion |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| calmness | Calming Influence, Tranquil Mind | Pacifying Weapon | Slow, Renewed Resolve | Pacifying Presence, ✨ Binding Calm | — | — |
| protection | Aura of Sanctuary | Blessing of Peace, Share Harm, Absorb Harm | Dome of Sanctuary, Spell-breaking Wave, Warded Threshold, Shield of the Meek | Anti-Magic Field, Serene Exile | — | Sanctuary Sphere |
| selflessness | Shared Burden | Harmonic Link | — | Martyrdom's Blessing | Redemptive Sacrifice | Undying Devotion |
| travel | Wayfinder's Mark | Swift Journey | Wayfarer's Shield | ✨ Safe Passage | Pilgrim's Gate | The Pilgrim's Road |
| law | Oathmark | Peace Bond | Herald's Aegis | Righteous Verdict | — | Sacred Covenant |

✨ = proposed new spell (undesigned seed)

**Coverage (updated 2026-07-17)**: 24 of 30 trait×rank slots hold a published spell (22 cells) or an R3 seed (Binding Calm, Safe Passage). The R2 seeds Steady Hands and Binding Oath were rejected in the P7 cycle. The empty cells are deliberate, not oversights (an honest empty cell beats a filler seed):
- **Calmness R4/R5** — the old "Tranquil Command" (bigger Calming Influence) and "Edict of Peace" (bigger Pacifying Presence) seeds were cut per principle 3. The escalation path is a **Heighten cascade on Pacifying Presence** (R4/R5: more targets, larger range, the effect no longer ending when the target takes outside damage) — a design task on the published spell, not a new entry.
- **Protection R4** — the old "Diplomatic Immunity" seed was a bigger Aura of Sanctuary; its escalation belongs on a **Heighten cascade for Aura of Sanctuary** (longer duration, harder save, more targets), not a new spell.
- **Selflessness R2** — the old "Guardian's Sacrifice" seed was a smaller Martyrdom's Blessing (R3, published) and was cut; the rung is covered from both sides (Harmonic Link R1, Martyrdom's Blessing R3).
- **Law R4** — no honest concept between Righteous Verdict (R3) and Sacred Covenant (R5); left open rather than padded.

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

> **Law boundary note**: Light publishes *Zone of Truth*, and the truth-revealing/truth-compelling space is Light's territory. Peace's law trait is therefore built here as **oaths, covenants, and bindings on behavior** — constraining what creatures may do, never extracting what is true. The old truth-compulsion seeds (Binding Word, Compel Truth, Arbiter's Circle) were cut for this reason.

*Published from this table (2026-07-12 to 2026-07-17): Shared Burden (R0), Wayfinder's Mark (R0), Oathmark (R0), Swift Journey (R1), Peace Bond (R1), Shield of the Meek (R2), Wayfarer's Shield (R2), Righteous Verdict (R3, P11 batch, closes the oathbreaker loop — gate widened to any oath-imposing *Peace* spell), Sanctuary Sphere (R5), Sacred Covenant (R5), Undying Devotion (R5), The Pilgrim's Road (R5). Also published in the same cycles, outside this table: Absorb Harm (R1 reactive), Herald's Aegis (R2 law ward), Renewed Resolve (R2 warded-ally heal), Pilgrim's Gate (R4), Redemptive Sacrifice (R4). Rejected in the P7 cycle (owner choice — do not re-seed): Steady Hands (R2, niche taken by Renewed Resolve), Binding Oath (R2, niche taken by Herald's Aegis and Oathmark).*

| Concept | Rank | Role | Seed |
|---|---|---|---|
| Binding Calm | 3 | Control / extender | The convert rung the school lacks: deepen pacification on a creature already *dazed* or *charmed* by a Peace spell — they are briefly *stunned* as the calm settles into stillness, then remain *dazed* after. Resist-rolled, tier-capped (cap fixed, never Heightened per principle 31), castable only against an existing calm (hard cold-cast deficit). |
| Safe Passage | 3 | Utility / standalone | Ritual journey ward (travel trait): boons on travel rolls, eased navigation, and hostile weather softened along one journey leg. Assists overland travel without emptying the road — encounters still happen, the travelers are just harder to break. |

## Cross-School Spell Sharing

Peace does not currently share spells with any arcane discipline.

**Concept Overlaps** (not shared, but thematically adjacent):
- **Tranquil Mind** (Peace R0) overlaps with **Mental Shield** (Telepathy, Arcane) — both protect against mental intrusion. Peace protects through divine calm; Telepathy protects through mental fortification. Different mechanics and flavor, same tactical niche.
- **Dome of Sanctuary** (Peace R2) overlaps with defensive conjuration effects — both create protective barriers, but Peace's barrier discourages violence while Conjuration's barriers physically block.

> **Design Note**: Peace's protective magic is thematically distinct from arcane defense (divine calm vs. mental/physical force). No spells are currently shared, but Mental Shield represents the closest overlap — future design could consider a shared "mental protection" spell if mechanics align.

## Synergy & Completeness Assessment

### Spell Progression Chains
(✨ = undesigned seed; the old law chain's truth-compulsion rungs — Binding Word, Compel Truth, Arbiter's Circle — the calmness R4/R5 escalations — Tranquil Command, Edict of Peace, Diplomatic Immunity, Guardian's Sacrifice — and the R2 seeds Steady Hands and Binding Oath were all cut; see the coverage notes and law boundary note above.)
1. **Calmness chain**: Calming Influence / Tranquil Mind (R0) → Pacifying Weapon (R1) → Slow / Renewed Resolve (R2) → Pacifying Presence / ✨ Binding Calm (R3) → *(R4/R5 escalation belongs on a Pacifying Presence Heighten cascade, not new spells)*
2. **Protection chain**: Aura of Sanctuary (R0) → Blessing of Peace / Share Harm / Absorb Harm (R1) → Dome of Sanctuary / Spell-breaking Wave / Shield of the Meek (R2) → Anti-Magic Field / Serene Exile (R3) → *(R4 gap by design)* → Sanctuary Sphere (R5) — **published**
3. **Selflessness chain**: Shared Burden (R0) → Harmonic Link (R1) → *(R2 covered from both sides)* → Martyrdom's Blessing (R3) → Redemptive Sacrifice (R4) → Undying Devotion (R5) — **published**
4. **Travel chain**: Wayfinder's Mark (R0) → Swift Journey (R1) → Wayfarer's Shield (R2) → ✨ Safe Passage (R3) → Pilgrim's Gate (R4) → The Pilgrim's Road (R5) — published except the R3 rung
5. **Law chain**: Oathmark (R0) → Peace Bond (R1) → Herald's Aegis (R2) → Righteous Verdict (R3) → *(R4 gap by design)* → Sacred Covenant (R5) — oaths and constraints, never truth-extraction

### Setup + Payoff Combos
- ✅ **Sanctuary chain**: Aura of Sanctuary (R0) → Dome of Sanctuary (R2) → Sanctuary Sphere (R5) — published defensive escalation
- ✅ **Warded ally → payoff**: the school's wards feed Shield of the Meek (attacker pays) and Renewed Resolve (warded ally heals + boon) — published
- ✅ **Travel buildout**: Wayfinder's Mark (R0 marks) → Swift Journey (R1 pace) → Wayfarer's Shield (R2 weather ward) → Pilgrim's Gate (R4 gate between marks) → The Pilgrim's Road (R5 consecrated road) — published, with explicit R0↔R4 mark synergy; ✨ Safe Passage fills R3
- ✅ **Oathbreaker loop**: Oathmark (R0) witnesses → Herald's Aegis and Peace Bond constrain → Righteous Verdict (R3, published 2026-07-17) collects → Sacred Covenant (R5) consecrates
- ✅ **Selflessness progression**: Shared Burden (R0 condition transfer) → Martyrdom's Blessing (R3 redirect) → Redemptive Sacrifice (R4 revive fallen) → Undying Devotion (R5 death countdown) — published
- ✨ **Pacify → convert**: dazed/charmed from the calm engine → Binding Calm (R3 seed) deepens it to a brief stun

### Design Completeness Checklist
- [x] R1 Quick Action: Absorb Harm (R1, published 2026-07-12) — standardized reactive defense (+2 Dodge/Parry, ally-redirect secondary)
- [x] Defensive options: Blessing of Peace (R1), Dome of Sanctuary (R2), Anti-Magic Field (R3), Sanctuary Sphere (R5) — strong published defensive core through R5
- [x] Utility: travel pillar published R0–R5 except the R3 rung (Wayfinder's Mark, Swift Journey, Wayfarer's Shield, Pilgrim's Gate, The Pilgrim's Road; ✨ Safe Passage)
- [x] Damage across ranks: deterrent-only by design (Shield of the Meek backlash, Peace Bond sting, sanctuary backlash at R5) — appropriate for Peace's weak Offense role
- [x] Repeating conditions: dazed (pacification), charmed (calmed), protected (sanctuary)
- [x] R5 diversity: Sanctuary Sphere (defense), Sacred Covenant (law/worldbuilding), Undying Devotion (selflessness), The Pilgrim's Road (travel) — four published capstones
- [x] Setup+payoff: warded-ally payoffs published (Shield of the Meek, Renewed Resolve); ✨ Binding Calm remains the open synergy seed
- [x] **3+ spells per rank (published)**: R0: 6, R1: 7, R2: 8, R3: 4, R4: 2, R5: 4 — met everywhere except R4 (2, with the two remaining R4 cells deliberately empty)
- [ ] **All trait×rank slots**: 24/30 covered (22 published cells + 2 R3 seeds: Binding Calm, Safe Passage); remaining cells deliberately empty or rejected

### Impact & Trivialization Review
*(Entries for the cut truth-compulsion and calmness-escalation seeds — Binding Word, Compel Truth, Arbiter's Circle, Tranquil Command, Guardian's Sacrifice — removed 2026-07-16 with the seeds themselves. Published spells' final text governs; the notes below stand as design rationale.)*
- **Wayfinder's Mark (R0 navigation, published)**: Minimal risk — provides boon on navigation checks, doesn't auto-succeed. Pure assistance, not bypass.
- **Swift Journey (R1 travel buff, published)**: Low risk — assists travel but doesn't bypass it. Party still navigates, forages, and camps.
- **Safe Passage (R3 seed)**: Moderate risk — smooths overland journeys. **Mitigations**: ritual, R3 Focus cost, natural terrain only, still requires actual travel. GMs retain full encounter design control — Safe Passage makes the road safer, not empty.
- **Shared Burden (R0, published)**: Minimal risk — condition transfer with a selflessness tax; net-negative for the caster, pure thematic utility.
- **Wayfarer's Shield (R2, published)**: Low risk — weather and terrain hazards only, no combat value.
- **Redemptive Sacrifice (R4, published)**: Low risk — restricted to downed allies, meaningful self-damage cost.
- **Undying Devotion (R5, published)**: High risk, well-mitigated — material cost limits frequency, concentration can break, the caster absorbs heavy damage per prevented death (a countdown, not an immortality field).
- **The Pilgrim's Road (R5, published)**: Moderate risk — ritual + material cost, destination must be previously visited, follows terrain (not a portal), encounters remain possible.
