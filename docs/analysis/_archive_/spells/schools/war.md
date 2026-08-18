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
4. **Known gaps (updated 2026-07-17)**: full R0–R5 coverage published (R4: Blood Frenzy, Champion's Challenge, Siege Breaker; R5: Avatar of War, Final Triumph, Divine Retribution; low-rank backfill: Righteous Strike, Victor's Shout, Terror's Edge, Avenging Oath, War Banner, Counterstroke; R3 mass fear payoff: Rout). No open seeds remain
5. War stands at 29 published spells with full R0–R5 coverage

### Internal Synergies

Framework: `.claude/skills/spell-design/references/synergy-framework.md` — roles (setup / payoff / extender), the two axes, and the shared socket set.

War is unusual: its caster is **also the martial**. Setups and payoffs mostly run through weapon attacks, so the school's synergy engine is the tightest fusion of spell and steel in the game.

**Setup levers** — states War emits: *frightened* (War Cry, the enemy's nerve breaking before the charge), *bleeding* (Tear Wound, wounds that keep costing), **blessed steel** (weapon enhancements that arm the payoff in advance — Heroic Weapon, Weapon Spirit), and **paid blood** (the school's own HP sacrifices as banked fury).

**Payoff levers** — War collects on broken nerve and open wounds: attacks bite harder against the *frightened*, blessed weapons trigger their riders on strong and critical hits (the crit applies *bleeding*; the fear compounds), and blood spent (Blood Sacrifice, Battle Surge's self-cut) converts directly into damage now. Cold-cast deficit: the weapon blessings are modest flat buffs alone — their value compounds only through the attacks that follow, and the fear-exploits are on-curve against the unshaken.

**Extenders** — *prolong* through enchant durations (a blessed weapon carries its rider for the whole fight), *refresh* fear with each fresh horror (every kill in view re-tests the survivors' nerve, Curse of War re-feeding the panic), and *spread* via ancestral summons (Ancestral Warriors adding spectral blades that keep the pressure while the priest swings).

**Solo engine** (multi-turn): T1 War Cry (*frightened* line) + Heroic Weapon already burning → T2 wade in — weapon attacks exploit the fear, crits open *bleeding* → T3 Battle Surge, cutting your own flesh to finish the shaken and bleeding champion. Gated by HP costs (the school pays in blood, not just Focus), enchant slots, and melee exposure — the engine only runs from inside the fray.

**Party interlock**: **emits** *frightened*, *bleeding*, and weapon blessings **castable on allies' steel** — the martial-multiplier school (the fighter's axe carries the god of battle's edge). **wants** more attacks to carry its riders (every extra martial swing is War's payoff vector) and enemies held in reach (Telekinetics, Nature). Cross-player line: the priest blesses the champion's blade and breaks the enemy line's nerve with War Cry, and the champion's next charge hits frightened men with a god-touched edge.

**Synergy gaps (updated 2026-07-17)**: the fear-and-steel engine is published end to end — Terror's Edge (R2) is the cheap fear-exploit, Righteous Fury (R3) the boosted one, Rout (R3) is the mass-fear spend, Blood Frenzy (R4) spends *bleeding* and refreshes on kills, and the R5 capstones close every chain. No open seeds remain.

## Current Spell Inventory (29 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 5 | Battle Surge, Mighty Strike, Righteous Strike, Spectral Slash, Victor's Shout |
| 1 | 6 | Curse of War, Heroic Weapon, Retaliating Fury, Tear Wound, War Cry, Weapon Spirit |
| 2 | 7 | Ancestral Warriors, Avenging Oath, Blood Sacrifice, Counterstroke, Haste, Terror's Edge, War Banner |
| 3 | 5 | Ancestral Guardian, Commander's Shout, Glorious Strike, Righteous Fury, Rout |
| 4 | 3 | Blood Frenzy, Champion's Challenge, Siege Breaker |
| 5 | 3 | Avatar of War, Divine Retribution, Final Triumph |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| fury | Battle Surge | War Cry | Haste, Terror's Edge | Righteous Fury, Commander's Shout, Rout | Blood Frenzy | Avatar of War |
| pride | Mighty Strike | Heroic Weapon | War Banner | Glorious Strike | Champion's Challenge, Siege Breaker | Avatar of War |
| blood | Spectral Slash | Tear Wound, Curse of War | Blood Sacrifice | Ancestral Guardian | Blood Frenzy | Final Triumph |
| justice | Righteous Strike | Retaliating Fury | Avenging Oath, Counterstroke | Righteous Fury | Champion's Challenge | Divine Retribution |
| triumph | Victor's Shout | Weapon Spirit | Ancestral Warriors, War Banner | Commander's Shout | — | Final Triumph |

✨ = proposed new spell (undesigned seed)

**Coverage (updated 2026-07-17)**: 30 of 30 trait×rank slots hold a published spell — Rout (fury R3) published 2026-07-17. Triumph R4 remains intentionally empty (Commander's Shout's published Heighten covers the mass-advance escalation; an honest empty cell beats a filler seed, principle 3).

**Critical Gaps**: none structural. The fear engine has published payoffs at R2 (Terror's Edge), R3 (Righteous Fury), and R4 (Blood Frenzy spends *bleeding* and refreshes on kills). Rout (R3 mass-fear spend) is a nice-to-have, not a hole.

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

*Published from this table (2026-07-14 to 2026-07-17): Righteous Strike (R0), Victor's Shout (R0), Terror's Edge (R2), Avenging Oath (R2), War Banner (R2), Rout (R3), Avatar of War (R5), Final Triumph (R5), Divine Retribution (R5). Counterstroke (R2 riposte stance) was added outside this table during the same cycle.*

**No open seeds remain in this school.**

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
1. **Fury chain**: Battle Surge (R0) → War Cry (R1) → Haste / Terror's Edge (R2) → Righteous Fury / Rout (R3) → Blood Frenzy (R4) → Avatar of War (R5)
2. **Pride chain**: Mighty Strike (R0) → Heroic Weapon (R1) → War Banner (R2) → Glorious Strike (R3) → Champion's Challenge / Siege Breaker (R4) → Avatar of War (R5)
3. **Blood chain**: Spectral Slash (R0) → Tear Wound / Curse of War (R1) → Blood Sacrifice (R2) → Ancestral Guardian (R3) → Blood Frenzy (R4) → Final Triumph (R5)
4. **Justice chain**: Righteous Strike (R0) → Retaliating Fury (R1) → Avenging Oath / Counterstroke (R2) → Righteous Fury (R3) → Champion's Challenge (R4) → Divine Retribution (R5)
5. **Triumph chain**: Victor's Shout (R0) → Weapon Spirit (R1) → Ancestral Warriors / War Banner (R2) → Commander's Shout (R3) → *(R4 covered by Commander's Shout's Heighten)* → Final Triumph (R5)

### Setup + Payoff Combos
- ✅ **Fear engine**: War Cry / Heroic Weapon / Glorious Strike emit *frightened* → Terror's Edge (R2 single-strike spend), Righteous Fury (R3), and Divine Retribution (R5) cash it → Blood Frenzy and Avatar of War refresh it on every kill — all published, including Rout (R3) as the mass spend
- ✅ **Bleeding engine**: Spectral Slash / Tear Wound / Heroic Weapon crits emit *bleeding* → Blood Frenzy (published) is the formal payoff
- ✅ **Justice mark**: Righteous Strike (ally-harm trigger) → Avenging Oath marks → allies, Champion's Challenge, and Divine Retribution collect on the marked — published loop
- ✅ **Triumph kill-loop**: Victor's Shout refreshes morale per kill → Commander's Shout converts it to action economy → Final Triumph turns a kill into party healing and fresh enemy fear — published loop
- ✅ **Party interlock**: Siege Breaker strips AV and cover (shared sockets) for every ally; weapon blessings ride allies' steel

### Design Completeness Checklist
- [x] R1 Quick Action: Retaliating Fury (R1, published 2026-07-12) — standardized reactive defense (+2 Dodge/Parry, melee-miss fury lash)
- [x] Defensive options: Ancestral Guardian (R3, published) — appropriate for War's weak Defense role; Retaliating Fury adds the reactive layer
- [x] Utility: intentionally thin — Utility is a Weak role, no filler seeds added
- [x] Damage across ranks: published R0-R5 solid — Blood Frenzy, Siege Breaker, Avatar of War, Divine Retribution carry the top end
- [x] Repeating conditions: frightened and bleeding — consistent battle identity across published spells
- [x] Setup+payoff: fear engine, justice mark, and triumph kill-loop all published end to end (see combos above)
- [x] **3 spells per rank minimum**: met at every rank (R0: 5, R1: 6, R2: 7, R3: 4, R4: 3, R5: 3)
- [x] **All trait×rank slots covered**: 30/30 published (triumph R4 intentionally empty — Commander's Shout Heighten covers it — is a deliberate design choice, not an unfilled slot)
