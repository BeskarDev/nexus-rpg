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
2. Travel and law are core thematic pillars — almost entirely unpublished (only concept seeds exist); this is the school's biggest buildout
3. Damage should feel defensive/deterrent rather than aggressive
4. Selflessness emphasizes self-sacrifice costs (HP transfer, taking hits, absorbing deaths)
5. Peace is undersized (15 published spells) — concept seeds sketch the path to a full-sized school

### Internal Synergies

Framework: [synergy-framework.md](../../../../.claude/skills/spell-design/references/synergy-framework.md) — roles (setup / payoff / extender), the two axes, and the shared socket set.

Peace is a **defensive** school, so its setup states are protective rather than offensive, and it stress-tests the framework: its "payoff" is usually an ally staying alive or an attacker shut down, not bonus damage. That still fits the three roles.

**Setup levers** — states Peace emits: *protected* and **cover** (sanctuary auras and domes), *dazed* / *charmed* (pacification), *slowed* (Slow), and **damage-redirect links** (Share Harm, Harmonic Link plant a channel that later spends when the linked ally would be hit).

**Payoff levers** — Peace rewards **restraint and protection**, not aggression: allies who abstain from attacking gain enhanced healing (Blessing of Peace), a redirect link pays off the moment a protected ally takes a hit it can shunt to the caster, and its deterrent damage only bites attackers who strike *into* a sanctuary. The cold-cast deficit is natural here — a pacify or a shield does nothing offensive on its own; the value lands only when an enemy would otherwise have connected.

**Extenders** — *prolong / expand* the protective field (the Aura → Dome → Sphere chain grows the warded area rank by rank), *refresh* pacification (Pacifying Presence re-dazes attackers each turn), and *spread* protection across more allies (Harmonic Link networks additional bodies into the safety web).

**Solo engine** (multi-turn): T1 Dome of Sanctuary (warded zone + cover over the party) → T2 Share Harm / Martyrdom's Blessing (arm the redirect so incoming harm shunts to the caster) → T3 Slow / Pacifying Presence to *daze* the attacker who broke through, keeping the window open. Gated by concentration on the dome and by a self-sacrifice HP cost, so the protector pays in their own body to keep the engine running.

**Party interlock**: **emits** *protected*, *cover*, *slowed*, *dazed* — defensive currency that keeps fragile allies alive and shuts an attacker down for a turn (a dazed, slowed enemy is a free reposition or focus-kill for the martials). **wants** a frontline that will body-block and enemies funneled into one place (a tank holding a chokepoint, or a Telekinetics wall channeling the mob). Cross-player line: a martial guardian holds a doorway inside the Dome while Peace redirects the blows the tank cannot avoid and dazes whoever pushes through.

**Synergy gaps**: heavy on setup (protection), light on **ally-facing payoff** — few Peace effects let *another* player cash the *protected* state into offense, so the school can feel like a pure battery. Pacification also lacks a strong **convert** extender (daze → a longer, harder control). Both are design targets, especially an effect that turns "my ally is safe" into "so my ally hits harder."

**Synergy gap proposals** (sketches, post-framework — design fresh per current principles):
- **Steady Hands** (R2, payoff, ally-facing) — an ally under one of your protective effects (warded, shielded, linked) fights from perfect calm: their next attack gains +1 boon and cannot be interrupted by Quick Actions. "Safe → hits harder," but framed as serenity, not battle-lust — the protected hand does not shake. Dead with no ward standing.
- **Binding Calm** (R3, extender/convert) — deepen pacification on a creature already *dazed* or *charmed* by a Peace spell: they are briefly *stunned* as the calm settles into stillness, then remain *dazed* after. The daze → harder-control rung, Resist-rolled, tier-capped, only from an existing calm.
- **Shield of the Meek** (R2, payoff/redirect) — when an enemy damages an ally warded by you, the ward flares: the attacker takes psychic backlash and suffers +1 bane on their next attack against that ally. Makes striking into sanctuary visibly cost something — deterrence as the school's damage identity.

## Current Spell Inventory (15 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Aura of Sanctuary, Calming Influence, Tranquil Mind |
| 1 | 4 | Blessing of Peace, Harmonic Link, Pacifying Weapon, Share Harm |
| 2 | 4 | Dome of Sanctuary, Slow, Spell-breaking Wave, Warded Threshold |
| 3 | 4 | Anti-Magic Field, Martyrdom's Blessing, Pacifying Presence, Serene Exile |
| 4 | 0 | — |
| 5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| calmness | Calming Influence, Tranquil Mind | Pacifying Weapon | Slow | Pacifying Presence | ✨ Tranquil Command | ✨ Edict of Peace |
| protection | Aura of Sanctuary | Blessing of Peace, Share Harm | Dome of Sanctuary, Spell-breaking Wave | Anti-Magic Field | ✨ Diplomatic Immunity | ✨ Sanctuary Sphere |
| selflessness | ✨ Shared Burden | Harmonic Link, ✨ Absorb Harm | ✨ Guardian's Sacrifice | Martyrdom's Blessing | ✨ Redemptive Sacrifice | ✨ Undying Devotion |
| travel | ✨ Wayfinder's Mark | ✨ Swift Journey | ✨ Wayfarer's Shield | ✨ Safe Passage | ✨ Pilgrim's Gate | ✨ The Pilgrim's Road |
| law | ✨ Binding Word | ✨ Compel Truth | ✨ Binding Oath | ✨ Arbiter's Circle | ✨ Righteous Verdict | ✨ Sacred Covenant, ✨ Edict of Peace |

✨ = proposed new spell

**Coverage**: all 30 trait×rank slots have at least a concept seed (published spell or proposed concept). Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).

**Spell Totals (existing + proposed):**
- R0: 3 existing + 3 proposed = 6
- R1: 4 existing + 3 proposed = 7
- R2: 3 existing + 3 proposed = 6
- R3: 3 existing + 2 proposed = 5
- R4: 0 existing + 5 proposed = 5
- R5: 0 existing + 5 proposed = 5
- **Total: 13 existing + 21 proposed = 34 spells**

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Seed |
|---|---|---|
| Absorb Harm | 1 | You extend a hand toward an ally under attack, absorbing a portion of their pain into yourself. (R1 Quick Action reactive defense) |
| Wayfinder's Mark | 0 | You leave a faintly glowing mark on the ground or a surface, guiding travelers along the right path. (Fills the R0 travel gap) |
| Binding Word | 0 | You speak a word of divine authority, compelling a creature to speak truthfully for a single statement. (Fills the R0 law gap) |
| Swift Journey | 1 | You bless a group of travelers with divine swiftness, easing their journey. (R1 travel spell) |
| Safe Passage | 3 | You invoke divine protection for a journey, warding travelers against the hazards of the road. (Fills R3 travel gap) |
| Righteous Verdict | 4 | You pronounce divine judgement upon a creature, and the cosmos answers. The weight of their transgressions bears down upon them. (Fills R4 law gap) |
| Binding Oath | 2 | You invoke divine law to seal an oath between two or more willing parties. Breaking the oath carries supernatural consequences. (R2 law spell — supernatural oath enforcement) |
| Sanctuary Sphere | 5 | You create a shimmering dome of divine peace that shields all within from harm and hostility. (R5 defensive capstone) |
| Diplomatic Immunity | 4 | You invoke the divine right of the peacekeeper, surrounding a creature with an aura of inviolable sanctity. Those who have not been wronged by the protected creature find themselves unable to raise a hand against them. (R4 protection/law capstone — divine diplomatic immunity) |
| Pilgrim's Gate | 4 | You consecrate a doorway, archway, or natural passage with divine travel magic. Golden light fills the threshold, and those who step through emerge at a distant destination you have previously consecrated with a matching gate. (R4 travel capstone — replaces the previously proposed "Pilgrimage" (which was essentially "bigger Safe Passage")) |
| Edict of Peace | 5 | You speak with the voice of divine law, and the command resonates through every creature's soul — "CEASE." Weapons lower, fists unclench, and a profound stillness descends. Those who defy the edict suffer the cosmos's wrath. (R5 law ultimate) |
| Sacred Covenant | 5 | You perform an elaborate consecration ritual, inscribing divine law into the very stone and air of a location. The space shimmers with faint golden light, and all who enter feel the weight of cosmic truth pressing upon their tongues and hearts. (R5 law ultimate — permanent consecrated ground) |
| Shared Burden | 0 | You press your palm against an injured ally and draw their pain into yourself, bearing the weight of their suffering so they may carry on. (R0 selflessness cantrip) |
| Compel Truth | 1 | You speak a word of binding law, and divine authority wraps around the target's tongue. The truth becomes the only speech their lips can form. (R1 law spell bridging Binding Word (R0, 2 statements) and Binding Oath (R2, ritual oath enforcement)) |
| Guardian's Sacrifice | 2 | You invoke a divine oath of protection, marking yourself as the shield for your companions. A faint golden light settles over you — an outward sign of your willingness to suffer for others. (R2 selflessness spell) |
| Wayfarer's Shield | 2 | You invoke the traveler's blessing, and the wind softens, the rain parts, and the road seems to smooth itself before your companions' feet. (R2 travel spell bridging Swift Journey (R1, speed buff) and Safe Passage (R3, full journey protection)) |
| Arbiter's Circle | 3 | You plant your feet and speak a word of divine law. A circle of faint golden light expands outward from where you stand, and all within feel the weight of cosmic truth pressing upon their tongues. (R3 law spell — area truth enforcement) |
| Tranquil Command | 4 | You fix your gaze upon a creature and speak a word of absolute serenity. The divine command resonates through their spirit, extinguishing fury like water drowning a flame. (R4 calmness capstone for single-target use) |
| Redemptive Sacrifice | 4 | You pour your own life force into a fallen companion, divine light flowing from your hands into their broken body. The cost is terrible — but the faithful do not hesitate. (R4 selflessness spell — revival through self-sacrifice) |
| Undying Devotion | 5 | You invoke the supreme rite of the selfless guardian, binding your life force to your companions with threads of golden light. As long as your heart beats, theirs will not stop. (R5 selflessness ultimate — the supreme expression of self-sacrifice) |
| The Pilgrim's Road | 5 | You walk a path and consecrate every step with divine authority. Behind you, the road transforms — stones smooth, thorns part, and a faint golden light shimmers along the trail. The road of the faithful opens for all who walk it in peace. (R5 travel ultimate — the supreme expression of safe passage) |

## Cross-School Spell Sharing

Peace does not currently share spells with any arcane discipline.

**Concept Overlaps** (not shared, but thematically adjacent):
- **Tranquil Mind** (Peace R0) overlaps with **Mental Shield** (Telepathy, Arcane) — both protect against mental intrusion. Peace protects through divine calm; Telepathy protects through mental fortification. Different mechanics and flavor, same tactical niche.
- **Dome of Sanctuary** (Peace R2) overlaps with defensive conjuration effects — both create protective barriers, but Peace's barrier discourages violence while Conjuration's barriers physically block.

> **Design Note**: Peace's protective magic is thematically distinct from arcane defense (divine calm vs. mental/physical force). No spells are currently shared, but Mental Shield represents the closest overlap — future design could consider a shared "mental protection" spell if mechanics align.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Calmness chain**: Calming Influence/Tranquil Mind (R0) → Pacifying Weapon (R1) → Slow (R2) → Pacifying Presence (R3) → Tranquil Command (R4 proposed) → Edict of Peace (R5 proposed) — **complete R0-R5**
2. **Protection chain**: Aura of Sanctuary (R0) → Blessing of Peace/Share Harm (R1) → Dome of Sanctuary/Spell-breaking Wave (R2) → Anti-Magic Field (R3) → Diplomatic Immunity (R4 proposed) → Sanctuary Sphere (R5 proposed) — **complete R0-R5**
3. **Selflessness chain**: Shared Burden (R0 proposed) → Harmonic Link/Absorb Harm (R1/R1 proposed) → Guardian's Sacrifice (R2 proposed) → Martyrdom's Blessing (R3) → Redemptive Sacrifice (R4 proposed) → Undying Devotion (R5 proposed) — **complete R0-R5**
4. **Travel chain**: Wayfinder's Mark (R0 proposed) → Swift Journey (R1 proposed) → Wayfarer's Shield (R2 proposed) → Safe Passage (R3 proposed) → Pilgrim's Gate (R4 proposed) → The Pilgrim's Road (R5 proposed) — **complete R0-R5**
5. **Law chain**: Binding Word (R0 proposed) → Compel Truth (R1 proposed) → Binding Oath (R2 proposed) → Arbiter's Circle (R3 proposed) → Righteous Verdict (R4 proposed) → Sacred Covenant/Edict of Peace (R5 proposed) — **complete R0-R5**

### Setup + Payoff Combos
- ✅ **Calm → Truth**: Calming Influence pacifies target → calmed targets less likely to resist Binding Word/Compel Truth compulsion
- ✅ **Sanctuary chain**: Aura of Sanctuary (R0) → Dome of Sanctuary (R2) → Sanctuary Sphere (R5 proposed) provides clean defensive escalation
- ✅ **Travel buffing**: Wayfinder's Mark (R0 marks) → Swift Journey (R1 speed) → Wayfarer's Shield (R2 protection) → Safe Passage (R3 hazards) → Pilgrim's Gate (R4 portal to Wayfinder's Marks) → The Pilgrim's Road (R5 divine road) — complete thematic progression with explicit R0↔R4 synergy
- ✅ **Law escalation**: Binding Word (R0 brief truth) → Compel Truth (R1 short truth) → Arbiter's Circle (R3 zone truth) → escalating scope of truth enforcement
- ✅ **Selflessness progression**: Shared Burden (R0 trade HP) → Guardian's Sacrifice (R2 redirect attacks) → Redemptive Sacrifice (R4 revive fallen) → Undying Devotion (R5 prevent deaths) — escalating self-sacrifice from minor to ultimate
- ✅ **Calm × Law crossover**: Tranquil Command (R4) forces calm AND truth at Critical — pacification enables interrogation
- ✅ **Law → Protection link**: Diplomatic Immunity (R4) protects creatures who haven't attacked — enforces peaceful behavior through protection. Edict of Peace (R5) combines ceasefire + truth compulsion

### Design Completeness Checklist
- [x] R1 Quick Action: Absorb Harm (R1 proposed) — standardized reactive defense (+2 Dodge/Parry, ally-targeting secondary)
- [x] Defensive options: Blessing of Peace (R1), Dome of Sanctuary (R2), Anti-Magic Field (R3), Diplomatic Immunity (R4 proposed), Sanctuary Sphere (R5 proposed) — strong defensive core through R5
- [x] Utility: Wayfinder's Mark (R0), Swift Journey (R1), Wayfarer's Shield (R2), Safe Passage (R3), Pilgrim's Gate (R4), The Pilgrim's Road (R5) — travel pillar fully represented R0-R5
- [x] Damage across ranks: Righteous Verdict (R4 proposed), Edict of Peace (R5 backlash), Arbiter's Circle (R3 lie damage), Tranquil Command (R4 psychic) — appropriate for Peace's weak offense role
- [x] Repeating conditions: Dazed (pacification), charmed (calmed), protected (sanctuary)
- [x] Law capstone chain: Binding Word (R0) → Compel Truth (R1) → Binding Oath (R2) → Arbiter's Circle (R3) → Righteous Verdict (R4) → Sacred Covenant/Edict of Peace (R5) — complete R0-R5
- [x] R5 diversity: Sanctuary Sphere (defensive), Edict of Peace (control/ceasefire), Sacred Covenant (permanent worldbuilding), Undying Devotion (selfless protection), The Pilgrim's Road (travel) — five distinct capstones
- [x] Setup+payoff: Calm→truth (Tranquil Command R4 Critical enforces truth on calmed target), Wayfinder's Mark→Pilgrim's Gate (R0 marks become R4 portal destinations)
- [x] **3+ spells per rank**: R0: 6, R1: 7, R2: 6, R3: 5, R4: 5, R5: 5 — met at all ranks
- [ ] **All trait×rank gaps filled**: all 30 trait×rank slots seeded with concepts; published coverage is partial (see inventory) coverage (100%)
- [x] **Selflessness chain complete**: R0 Shared Burden → R1 Absorb Harm → R2 Guardian's Sacrifice → R3 Martyrdom's Blessing → R4 Redemptive Sacrifice → R5 Undying Devotion
- [x] **Travel chain complete**: R0 Wayfinder's Mark → R1 Swift Journey → R2 Wayfarer's Shield → R3 Safe Passage → R4 Pilgrim's Gate → R5 The Pilgrim's Road
- [x] **Law chain complete**: R0 Binding Word → R1 Compel Truth → R2 Binding Oath → R3 Arbiter's Circle → R4 Righteous Verdict → R5 Sacred Covenant/Edict of Peace

### Impact & Trivialization Review
- **Wayfinder's Mark (R0 navigation)**: Minimal risk — provides boon on navigation checks, doesn't auto-succeed. Pure assistance, not bypass.
- **Swift Journey (R1 travel buff)**: Low risk — +1/+2 movement and ignore natural difficult terrain assist travel but don't bypass it. Party still navigates, forages, and camps. Trackless travel is a defensive feature (anti-pursuit), not exploration bypass. **Well-mitigated.**
- **Binding Word (R0 truth compulsion)**: Moderate risk — cantrip-level truth compulsion is very accessible. **Mitigations**: only 1-3 statements, target is aware of compulsion, can choose silence over truth. Does not replace Influence/Insight checks — merely prevents lying if the target speaks. Repeated use on the same target should be subject to GM escalation (target becomes hostile, calls for help, etc.).
- **Safe Passage (R3 overland travel)**: Moderate risk — +2 boons on travel checks and 25-50% speed increase significantly smooth overland journeys. "Cannot become lost" at Critical is the strongest effect. **Mitigations**: ritual (10 min), R3 Focus cost (6), natural terrain only (magical misdirection still works), still requires actual travel (not teleportation). GMs retain full encounter design control — Safe Passage makes the road safer, not empty.
- **Binding Oath (R2)**: Low risk — requires willing participants, ritual, cannot be used offensively. Supernatural oath enforcement is a narrative tool, not a gameplay bypass.
- **Shared Burden (R0 HP transfer)**: Minimal risk — cantrip-level HP transfer with self-damage cost. Net-neutral or net-negative for the party's total HP pool. The selflessness tax (you always take damage) prevents exploitation. Pure thematic utility.
- **Compel Truth (R1 truth compulsion)**: Moderate risk — duration-based (short) truth compulsion is more potent than Binding Word (R0, 2 statements). **Mitigations**: vs. Resist save, target aware of compulsion, silence remains an option. Does not force speech — only prevents lying if the target chooses to speak. Requires Focus (2) unlike the cantrip. Psychic damage at Critical is only +4, matching R1 scaling.
- **Guardian's Sacrifice (R2 attack redirection)**: Low risk — powerful defensive effect but self-targeting cost (you take the hits instead of allies). Requires your reaction each time, limiting action economy. AV bonus (+2/+3) is modest. Concentration on maintaining awareness of allies creates natural tactical costs.
- **Wayfarer's Shield (R2 environmental protection)**: Low risk — protects against weather and terrain hazards only, not combat damage. Does not increase speed or provide navigation. The AV against environmental damage is situational and doesn't affect normal combat encounters. Fills a specific niche between Swift Journey (speed) and Safe Passage (full journey protection).
- **Arbiter's Circle (R3 zone of truth)**: Moderate risk — area truth enforcement is powerful for social encounters. **Mitigations**: concentration (can be broken), short area (short range centered on caster), creatures can still choose silence, and it doesn't compel speech. Psychic damage for lying (+4/+8/+12) follows AoE scaling and creates consequences but doesn't prevent all deception (omission, misleading truth). Concentration prevents simultaneous combat casting.
- **Tranquil Command (R4 unbreakable calm)**: Moderate risk — single-target calm that can't be broken by attacks is very strong for removing one enemy from combat. **Mitigations**: concentration requirement (caster must maintain focus), line-of-sight requirement (can be broken by cover), vs. Resist save, single-target only (unlike Edict of Peace R5). The calm still allows self-defense — the target can Dodge/Parry. This is Peace's signature single-target lockdown at the appropriate rank for such power.
- **Redemptive Sacrifice (R4 ally revival)**: Low risk — powerful revival but restricted to downed allies (0 HP/unconscious). The fixed 10 self-damage cost is meaningful at any level. Does not exceed R4 healing scaling (+10/+20/+30). Cannot be used as combat healing on standing allies — only revives the fallen.
- **Undying Devotion (R5 death prevention)**: High risk — preventing ally deaths is extremely powerful. **Mitigations**: material cost (5,000 coins) severely limits use frequency, concentration can be broken, caster absorbs +12 damage per prevented death (unsustainable for more than a few), caster's own death ends the spell immediately. The spell creates a dramatic countdown: the caster absorbs death after death until they fall. Balanced by economy, concentration, and self-destruction. Comparable in power to other R5 capstones (Sacred Covenant, Sanctuary Sphere).
- **The Pilgrim's Road (R5 divine road)**: Moderate risk — doubled travel speed and weather immunity are potent but don't bypass travel encounters. **Mitigations**: ritual (1 hour) prevents combat use, material cost (5,000 coins) limits frequency, destination must be previously visited, road follows physical terrain (not a portal). Violence suppression on the road is identical to other Peace effects (save or daze). GMs can still place encounters along the road — the travelers are protected, not invisible. The concealment at Critical (+2 Stealth boons) helps avoid encounters but doesn't guarantee it.
