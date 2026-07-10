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

Framework: `.claude/skills/spell-design/references/synergy-framework.md` — roles (setup / payoff / extender), the two axes, and the shared socket set.

Peace is a **defensive** school, so its setup states are protective rather than offensive, and it stress-tests the framework: its "payoff" is usually an ally staying alive or an attacker shut down, not bonus damage. That still fits the three roles.

**Setup levers** — states Peace emits: *protected* and **cover** (sanctuary auras and domes), *dazed* / *charmed* (pacification), *slowed* (Slow), and **damage-redirect links** (Share Harm, Harmonic Link plant a channel that later spends when the linked ally would be hit).

**Payoff levers** — Peace rewards **restraint and protection**, not aggression: allies who abstain from attacking gain enhanced healing (Blessing of Peace), a redirect link pays off the moment a protected ally takes a hit it can shunt to the caster, and its deterrent damage only bites attackers who strike *into* a sanctuary. The cold-cast deficit is natural here — a pacify or a shield does nothing offensive on its own; the value lands only when an enemy would otherwise have connected.

**Extenders** — *prolong / expand* the protective field (the Aura → Dome → Sphere chain grows the warded area rank by rank), *refresh* pacification (Pacifying Presence re-dazes attackers each turn), and *spread* protection across more allies (Harmonic Link networks additional bodies into the safety web).

**Solo engine** (multi-turn): T1 Dome of Sanctuary (warded zone + cover over the party) → T2 Share Harm / Martyrdom's Blessing (arm the redirect so incoming harm shunts to the caster) → T3 Slow / Pacifying Presence to *daze* the attacker who broke through, keeping the window open. Gated by concentration on the dome and by a self-sacrifice HP cost, so the protector pays in their own body to keep the engine running.

**Party interlock**: **emits** *protected*, *cover*, *slowed*, *dazed* — defensive currency that keeps fragile allies alive and shuts an attacker down for a turn (a dazed, slowed enemy is a free reposition or focus-kill for the martials). **wants** a frontline that will body-block and enemies funneled into one place (a tank holding a chokepoint, or a Telekinetics wall channeling the mob). Cross-player line: a martial guardian holds a doorway inside the Dome while Peace redirects the blows the tank cannot avoid and dazes whoever pushes through.

**Synergy gaps**: heavy on setup (protection), light on **ally-facing payoff** — few Peace effects let *another* player cash the *protected* state into offense, so the school can feel like a pure battery. Pacification also lacks a strong **convert** extender (daze → a longer, harder control). Both design targets now live in the seed table below (Steady Hands, Shield of the Meek, Binding Calm).

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
| calmness | Calming Influence, Tranquil Mind | Pacifying Weapon | Slow | Pacifying Presence, ✨ Binding Calm | — | — |
| protection | Aura of Sanctuary | Blessing of Peace, Share Harm | Dome of Sanctuary, Spell-breaking Wave, Warded Threshold, ✨ Steady Hands, ✨ Shield of the Meek | Anti-Magic Field, Serene Exile | — | ✨ Sanctuary Sphere |
| selflessness | ✨ Shared Burden | Harmonic Link, ✨ Absorb Harm | — | Martyrdom's Blessing | ✨ Redemptive Sacrifice | ✨ Undying Devotion |
| travel | ✨ Wayfinder's Mark | ✨ Swift Journey | ✨ Wayfarer's Shield | ✨ Safe Passage | ✨ Pilgrim's Gate | ✨ The Pilgrim's Road |
| law | ✨ Oathmark | ✨ Peace Bond | ✨ Binding Oath | ✨ Righteous Verdict | — | ✨ Sacred Covenant |

✨ = proposed new spell (undesigned seed)

**Coverage**: 25 of 30 trait×rank slots hold a published spell or a seed. The five empty cells are deliberate, not oversights (an honest empty cell beats a filler seed):
- **Calmness R4/R5** — the old "Tranquil Command" (bigger Calming Influence) and "Edict of Peace" (bigger Pacifying Presence) seeds were cut per principle 3. The escalation path is a **Heighten cascade on Pacifying Presence** (R4/R5: more targets, larger range, the effect no longer ending when the target takes outside damage) — a design task on the published spell, not a new entry.
- **Protection R4** — the old "Diplomatic Immunity" seed was a bigger Aura of Sanctuary; its escalation belongs on a **Heighten cascade for Aura of Sanctuary** (longer duration, harder save, more targets), not a new spell.
- **Selflessness R2** — the old "Guardian's Sacrifice" seed was a smaller Martyrdom's Blessing (R3, published) and was cut; the rung is covered from both sides (Harmonic Link R1, Martyrdom's Blessing R3).
- **Law R4** — no honest concept between Righteous Verdict (R3) and Sacred Covenant (R5); left open rather than padded.

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

> **Law boundary note**: Light publishes *Zone of Truth*, and the truth-revealing/truth-compelling space is Light's territory. Peace's law trait is therefore built here as **oaths, covenants, and bindings on behavior** — constraining what creatures may do, never extracting what is true. The old truth-compulsion seeds (Binding Word, Compel Truth, Arbiter's Circle) were cut for this reason.

| Concept | Rank | Role | Seed |
|---|---|---|---|
| Shared Burden | 0 | Support / standalone | Touch cantrip of selflessness: take one minor condition (briefly dazed, briefly frightened, or similar) from an ally onto yourself, suffering it for its remaining duration. Not healing (principle 11 keeps R0 free of HP restoration — Tranquil Mind already covers the R0 heal). Condition-transfer is Peace's selflessness identity in miniature and cleans setup states off allies. |
| Wayfinder's Mark | 0 | Utility / setup | Leave a subtle blessed mark on a place or waypost (travel trait): creatures you designate gain +1 boon on navigation rolls toward it, and you always know the direction to your own marks. Assist, never bypass (principle 1). Long-game setup: marks are the anchor points Pilgrim's Gate (R4) consecrates into destinations. |
| Oathmark | 0 | Utility / setup | Witness an oath spoken in your presence and seal it with a visible blessed mark (law trait): you know the moment the marked oath is broken, and the breaker knows they are known. Emits the diegetic *oathbreaker* state that Righteous Verdict (R3) and Sacred Covenant (R5) collect on. Bounded GM parameters: the mark tracks the oath's literal wording, nothing more. |
| Absorb Harm | 1 | Defense / standalone | The standardized R1 Quick Action reactive (principle 4: +2 to Dodge or Parry against the triggering attack, no SL scaling). School secondary (selflessness): you may instead cast it when an ally in close range is attacked, and if the attack still hits you take half of the damage in their place. Peace's reactive rung in the redirect engine. |
| Swift Journey | 1 | Utility / standalone | Bless a traveling group (travel trait): reduced travel Fatigue risk and a boon on travel-pace rolls for the day. Assists the journey game mode, never skips it (principle 1); respects the Fatigue ceiling (principle 17). |
| Peace Bond | 1 | Control / setup | Speak a word of law over a creature's weapons: their arms grow heavy with the weight of the bond, and each attack they make while it holds deals reduced damage and feeds back a small psychic sting (deterrent damage identity). Resist-rolled, save-ends. Law as constraint on violence, not on truth. Softens the attacker the redirect engine must absorb. |
| Steady Hands | 2 | Support / payoff | Ally-facing payoff, the school's declared top gap ("safe → hits harder"): an ally currently under one of your protective effects (Aura of Sanctuary, Dome, Harmonic Link, Martyrdom's Blessing) strikes from perfect calm — their next attack gains +1 boon and cannot be interrupted. Dead with no ward standing (hard cold-cast deficit). Turns Peace from pure battery into a force-multiplier. |
| Shield of the Meek | 2 | Defense / payoff | When an enemy damages an ally warded by you, the ward flares: the attacker takes psychic backlash (ignore AV) and suffers +1 bane on their next attack against that ally. Striking into sanctuary visibly costs something — deterrence as Peace's damage identity. Payoff spends the *protected* state the school's setups emit. |
| Binding Oath | 2 | Utility / setup | Ritual sealing an oath between willing parties (law trait): the breaker suffers a defined, bounded consequence (psychic backlash and the *oathbreaker* state Oathmark tracks, never death or compulsion). Worldbuilding lever per principle 33: it constrains, it cannot force answers or actions, so intrigue survives. |
| Wayfarer's Shield | 2 | Defense / standalone | Travel ward for a group: protection against weather and environmental hazards on the road (heat, cold, rain, sandstorm exposure), no combat value. Bridges Swift Journey (R1 pace) and Safe Passage (R3 full journey ward). |
| Binding Calm | 3 | Control / extender | The convert rung the school lacks: deepen pacification on a creature already *dazed* or *charmed* by a Peace spell — they are briefly *stunned* as the calm settles into stillness, then remain *dazed* after. Resist-rolled, tier-capped (cap fixed, never Heightened per principle 31), castable only against an existing calm (hard cold-cast deficit). |
| Safe Passage | 3 | Utility / standalone | Ritual journey ward (travel trait): boons on travel rolls, eased navigation, and hostile weather softened along one journey leg. Assists overland travel without emptying the road — encounters still happen, the travelers are just harder to break. |
| Righteous Verdict | 3 | Control / payoff | Pronounce judgement on one creature (tier up to your Mysticism) that has broken an oath you witnessed (Oathmark, Binding Oath) or harmed a creature under your protection this scene: psychic backlash and they are dazed as the weight of the covenant presses down. Near worthless cold (law payoff, not a nuke — Peace stays weak in Offense); the setups make it land. |
| Pilgrim's Gate | 4 | Utility / payoff | Consecrate a threshold as one end of a paired gate; stepping through emerges at another consecrated gate or a Wayfinder's Mark you have blessed for the purpose. R4 per the travel-ranks-higher rule (principle 39, matching Teleportation Circle). Ritual plus material cost keeps transit rare and temple-gated (principle 33). Cashes the R0 mark setups. |
| Redemptive Sacrifice | 4 | Healing / payoff | Selflessness capstone of the redirect engine: pull a dying ally back from death's edge by pouring your own life in — they are stabilized and healed on the single-target chassis, and you take a matching cost in HP and a level of Fatigue or a Wound. Wound recovery only at this rank or above (principle 13). Not resurrection — that framework belongs to Life; this prevents the death instead. |
| Sanctuary Sphere | 5 | Defense / extender | Capstone of the Aura → Dome escalation (prolong/expand extender): a wide standing sanctuary for a medium duration in which allies have cover, attackers must repeatedly save to press attacks into it, and violence inside feeds back psychic backlash. Escapable and enterable, concentration-gated, never an impregnable bubble (principle 35 counterplay applies to its warding effects). Material cost 5,000+ coins. |
| Sacred Covenant | 5 | Utility / setup | Consecration ritual inscribing divine law into a place for a very long duration (never permanent, per R5 limits): oaths sworn within are sealed as by Binding Oath, violence within provokes save-or-dazed backlash, and the caster knows when the covenant ground is defiled. A temple rite, not a courtroom gadget — GM-facing framing note required (principle 33). Material cost 5,000+ coins. |
| Undying Devotion | 5 | Defense / payoff | Selflessness pinnacle: link yourself to allies in range (spread extender on the Harmonic Link engine); while you concentrate, the first time each linked ally would drop to 0 HP they hold at 1 and you take heavy backlash damage instead. Each absorbed death bites the caster hard enough that a few will fell them — a countdown, not an immortality field. Material cost 5,000+ coins. |
| The Pilgrim's Road | 5 | Utility / standalone | Travel pinnacle: a consecrated road-blessing (hour-long ritual, material cost 5,000+ coins) that carries a caravan-scale group swiftly and shielded along a real route to a place you have visited — faster pace, weather warded, and violence on the road provokes the pacifying save. Follows terrain, never a portal; encounters remain possible. |

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
