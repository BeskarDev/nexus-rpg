# War — Spell School Design Space

## School Identity

**Tradition**: War (Mystic)
**Traits**: fury, pride, blood, justice, triumph
**Identity**: Honorable combat prowess and righteous victory — channeling battle fury and martial glory
**Role Spread**: Excels: Offense | Decent: Control, Support | Weak: Healing, Defense, Utility

### Mechanical Identity
- **Primary Conditions**: Frightened (intimidation), bleeding (battle wounds)
- **Signature Gimmick**: Weapon blessing and battle fury — enhance weapons, inspire through combat, exploit fear
- **Damage Types**: Physical, Fire, Blast

### Design Principles
1. War is the combat-focused mystic tradition — weapon enhancement, battle buffs, intimidation
2. Frightened is the primary control condition — fear exploitation rewards aggressive play
3. Bleeding represents honorable wounds and battle damage
4. **Known gaps**: R3 tier published (v0.12.0: Commander's Shout, Righteous Fury, Glorious Strike, Ancestral Guardian — the last being War's first defensive spell). Remaining gaps: nothing above R3, "justice"/"triumph" seeds at R4-R5 undesigned
5. War grows from 15 published spells toward ~29 total with full R0–R5 coverage (R4-R5 seeds remain)

### Internal Synergies

Framework: `.claude/skills/spell-design/references/synergy-framework.md` — roles (setup / payoff / extender), the two axes, and the shared socket set.

War is unusual: its caster is **also the martial**. Setups and payoffs mostly run through weapon attacks, so the school's synergy engine is the tightest fusion of spell and steel in the game.

**Setup levers** — states War emits: *frightened* (War Cry, the enemy's nerve breaking before the charge), *bleeding* (Tear Wound, wounds that keep costing), **blessed steel** (weapon enhancements that arm the payoff in advance — Heroic Weapon, Weapon Spirit), and **paid blood** (the school's own HP sacrifices as banked fury).

**Payoff levers** — War collects on broken nerve and open wounds: attacks bite harder against the *frightened*, blessed weapons trigger their riders on strong and critical hits (the crit applies *bleeding*; the fear compounds), and blood spent (Blood Sacrifice, Battle Surge's self-cut) converts directly into damage now. Cold-cast deficit: the weapon blessings are modest flat buffs alone — their value compounds only through the attacks that follow, and the fear-exploits are on-curve against the unshaken.

**Extenders** — *prolong* through enchant durations (a blessed weapon carries its rider for the whole fight), *refresh* fear with each fresh horror (every kill in view re-tests the survivors' nerve, Curse of War re-feeding the panic), and *spread* via ancestral summons (Ancestral Warriors adding spectral blades that keep the pressure while the priest swings).

**Solo engine** (multi-turn): T1 War Cry (*frightened* line) + Heroic Weapon already burning → T2 wade in — weapon attacks exploit the fear, crits open *bleeding* → T3 Battle Surge, cutting your own flesh to finish the shaken and bleeding champion. Gated by HP costs (the school pays in blood, not just Focus), enchant slots, and melee exposure — the engine only runs from inside the fray.

**Party interlock**: **emits** *frightened*, *bleeding*, and weapon blessings **castable on allies' steel** — the martial-multiplier school (the fighter's axe carries the god of battle's edge). **wants** more attacks to carry its riders (every extra martial swing is War's payoff vector) and enemies held in reach (Telekinetics, Nature). Cross-player line: the priest blesses the champion's blade and breaks the enemy line's nerve with War Cry, and the champion's next charge hits frightened men with a god-touched edge.

**Synergy gaps**: the R3 tier now escalates the fear-and-steel engine — Glorious Strike *emits* frightened (crit spreads to onlookers) and Righteous Fury is the first **formal** mechanical fear-exploit (+1 boon, +damage vs *frightened*), closing the "informal fear-exploit" gap. Ancestral Guardian adds the school's first defense. Remaining: nothing published above R3, no cheap fear-payoff below Righteous Fury, and the *bleeding* the school emits has no formal exploit. The seed table below carries those design targets (Terror's Edge, Rout, Blood Frenzy, the R5 capstones).

## Current Spell Inventory (15 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Battle Surge, Mighty Strike, Spectral Slash |
| 1 | 5 | Curse of War, Heroic Weapon, Tear Wound, War Cry, Weapon Spirit |
| 2 | 3 | Ancestral Warriors, Blood Sacrifice, Haste |
| 3 | 4 | Ancestral Guardian, Commander's Shout, Glorious Strike, Righteous Fury |
| 4 | 0 | — |
| 5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| fury | Battle Surge | War Cry | Haste, ✨ Terror's Edge | Righteous Fury, Commander's Shout, ✨ Rout | Blood Frenzy | ✨ Avatar of War |
| pride | Mighty Strike | Heroic Weapon | ✨ War Banner | Glorious Strike | Champion's Challenge, Siege Breaker | ✨ Avatar of War |
| blood | Spectral Slash | Tear Wound, Curse of War | Blood Sacrifice | Ancestral Guardian | Blood Frenzy | ✨ Final Triumph |
| justice | ✨ Righteous Strike | Retaliating Fury | ✨ Avenging Oath | Righteous Fury | Champion's Challenge | ✨ Divine Retribution |
| triumph | ✨ Victor's Shout | Weapon Spirit | Ancestral Warriors, ✨ War Banner | Commander's Shout | — | ✨ Final Triumph |

✨ = proposed new spell (undesigned seed)

**Coverage**: 29 of 30 trait×rank slots hold a published spell or a seed. Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).

**Critical Gaps**:
- **Nothing published above R3** — all R4-R5 slots are seeds only. This is the school's top buildout.
- **Triumph R4 is intentionally empty** — the old "Triumphant Advance" seed was a bigger Commander's Shout, and Commander's Shout's published (Rank 4)/(Rank 5) Heighten already covers the mass-advance escalation. An honest empty cell beats a filler seed (principle 3).
- **Fear payoffs are seeds, not spells** — the engine's cheap payoff (Terror's Edge R2) and mass-fear spend (Rout R3) remain undesigned; until then Righteous Fury is the only formal fear-exploit.
- **Bleeding has no formal payoff** — the school emits bleeding from R0 but only Blood Frenzy (R4 seed) spends it.

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Role | Seed |
|---|---|---|---|
| Righteous Strike | 0 | Offense / payoff | Weapon-strike cantrip on the Mighty Strike chassis (Spirit + Mysticism attack) that adds a small damage rider only against a creature that has damaged you or an ally since your last turn (justice trait: retribution as a diegetic trigger). Cold-cast it is worse than Mighty Strike, so the payoff needs the party to have bled first. Plugs into any martial frontline taking hits. |
| Victor's Shout | 0 | Support / extender | Quick Action cantrip usable only when an enemy drops to 0 HP in sight (triumph trait): allies in short range gain a small morale rider on their next attack and may end the frightened condition on themselves. Refreshes the morale window each kill, feeding Commander's Shout and Final Triumph lines. Distinct from Battle Surge (single target, HP cost, no kill gate). |
| Terror's Edge | 2 | Offense / payoff | Single weapon strike that exploits *frightened*: bonus damage against a frightened target, and on a strong or critical hit their fear does not end this turn (prolong rider). The engine's cheap formal fear-exploit below Righteous Fury. Cold-cast deficit: on-curve at best against the unshaken. Spends the fear that War Cry, Heroic Weapon, and Glorious Strike emit. |
| Avenging Oath | 2 | Control / setup | Swear retribution against one creature that has damaged an ally this scene: they are visibly marked (shared *marked* socket) for a short duration, and weapon attacks against them by anyone gain a small rider (justice trait). Pure setup — near worthless alone, cashed by martial allies, Terror's Edge, and Divine Retribution. |
| War Banner | 2 | Support / extender | Plant your weapon as a rallying standard (pride and triumph traits): a stationary close-range aura in which allies cannot become frightened and their weapon attacks carry a small flat rider. Prolongs the morale window across turns and anchors the melee the engine needs. Concentrate or fixed duration; the banner is a destructible object (principle 35). |
| Rout | 3 | Control / payoff | A thunderous kill-cry that spends a whole field of fear: every *frightened* enemy in short range must roll Spirit + Fortitude vs. your Resist or spend their next turn fleeing you, and those who hold suffer +1 bane on attacks. No effect on the unafraid (hard cold-cast deficit). Mass payoff for War Cry and Glorious Strike setups. |
| Avatar of War | 5 | Offense / standalone + extender | Transformation capstone (fury, pride, blood): for a short duration your weapon attacks gain boons and heavy riders, you are immune to frightened, and your presence re-tests the nerve of enemies in close range at the start of each of your turns (refresh extender). Paid in blood — HP cost each turn — plus a 5,000+ coin material cost (principle 5). Mortal pinnacle: a champion at their peak, no flight, no invulnerability, no auto-win. |
| Final Triumph | 5 | Support / payoff | Quick Action burst usable only when you or an ally drops an enemy (triumph and blood): allies in short range regain HP on the multi-target healing chassis and shed the frightened condition, while enemies who saw their champion fall must test against frightened. Kill-gated healing justifies War's weak Healing role — it rewards aggression, never replaces Life's dedicated healing. |
| Divine Retribution | 5 | Offense / payoff | Pillar of golden fire on one creature: on-curve single-target damage cold, but against a target under your Avenging Oath mark or one that has dropped an ally this scene it deals heavy bonus damage and they are frightened of you (justice capstone — judgement lands hardest on the guilty). Cold-cast deficit keeps the mark setup meaningful. Material cost 5,000+ coins. |

## Cross-School Spell Sharing

War does not currently share spells with any arcane discipline.

**Concept Overlaps** (not shared, but thematically adjacent):
- **Heroic Weapon** (War R1) overlaps with **Flaming Weapon/Frozen Weapon/Lightning Weapon** (Evocation, Arcane) — both enhance weapons with magical effects. War's enhancement is divine and battle-themed; Evocation's is elemental. Different mechanics and flavor.
- **Haste** (War R2) is a unique War identity spell — no arcane equivalent exists. This is intentional: divine battle swiftness is distinct from arcane time manipulation.
- **Lightning Strike** (Evocation R2) could theoretically be shared with War for AoE tactical combat, but War's damage types (Physical, Fire, Blast) don't include Lightning — sharing would violate War's thematic identity.

> **Design Note**: War's combat magic is thematically distinct from arcane offense (divine battle fury vs. elemental destruction). No spells are currently shared. Haste remains uniquely War — it represents the god of war's gift of supernatural speed, not arcane manipulation of time.

## Synergy & Completeness Assessment

### Spell Progression Chains
(✨ = undesigned seed)
1. **Fury chain**: Battle Surge (R0) → War Cry (R1) → Haste / ✨ Terror's Edge (R2) → Righteous Fury / ✨ Rout (R3) → Blood Frenzy (R4) → ✨ Avatar of War (R5)
2. **Pride chain**: Mighty Strike (R0) → Heroic Weapon (R1) → ✨ War Banner (R2) → Glorious Strike (R3) → Champion's Challenge / Siege Breaker (R4) → ✨ Avatar of War (R5)
3. **Blood chain**: Spectral Slash (R0) → Tear Wound / Curse of War (R1) → Blood Sacrifice (R2) → Ancestral Guardian (R3) → Blood Frenzy (R4) → ✨ Final Triumph (R5)
4. **Justice chain**: ✨ Righteous Strike (R0) → Retaliating Fury (R1) → ✨ Avenging Oath (R2) → Righteous Fury (R3) → Champion's Challenge (R4) → ✨ Divine Retribution (R5)
5. **Triumph chain**: ✨ Victor's Shout (R0) → Weapon Spirit (R1) → Ancestral Warriors / ✨ War Banner (R2) → Commander's Shout (R3) → *(R4 covered by Commander's Shout's Heighten)* → ✨ Final Triumph (R5)

### Setup + Payoff Combos
- ✅ **Fear engine**: War Cry / Heroic Weapon / Glorious Strike emit *frightened* → Righteous Fury (published), ✨ Terror's Edge (R2 single-strike spend), ✨ Rout (R3 mass spend), and ✨ Divine Retribution cash it → Blood Frenzy and ✨ Avatar of War refresh it on every kill
- ✅ **Bleeding engine**: Spectral Slash / Tear Wound / Heroic Weapon crits emit *bleeding* → Blood Frenzy is the formal payoff (until designed, bleeding is pure attrition value)
- ✅ **Justice mark**: ✨ Righteous Strike (ally-harm trigger) → ✨ Avenging Oath marks → allies, Champion's Challenge, and ✨ Divine Retribution collect on the marked
- ✅ **Triumph kill-loop**: ✨ Victor's Shout refreshes morale per kill → Commander's Shout converts it to action economy → ✨ Final Triumph turns a kill into party healing and fresh enemy fear
- ✅ **Party interlock**: Siege Breaker strips AV and cover (shared sockets) for every ally; weapon blessings ride allies' steel

### Design Completeness Checklist
- [x] R1 Quick Action: Retaliating Fury (R1, published 2026-07-12) — standardized reactive defense (+2 Dodge/Parry, melee-miss fury lash)
- [x] Defensive options: Ancestral Guardian (R3, published) — appropriate for War's weak Defense role; Retaliating Fury adds the reactive layer
- [x] Utility: intentionally thin — Utility is a Weak role, no filler seeds added
- [x] Damage across ranks: published R0-R3 solid; R4-R5 damage rests on Blood Frenzy, Siege Breaker, ✨ Avatar of War, ✨ Divine Retribution
- [x] Repeating conditions: frightened and bleeding — consistent battle identity across published spells and seeds
- [x] Setup+payoff: fear engine and justice mark both have explicit setup, payoff, and extender seeds (see combos above)
- [x] **3 spells per rank minimum**: met R0-R3 published; R4 (4 seeds) and R5 (3 seeds) pending design
- [ ] **All trait×rank slots covered**: 29/30 seeded or published (triumph R4 intentionally empty — Commander's Shout Heighten covers it); published coverage stops at R3
