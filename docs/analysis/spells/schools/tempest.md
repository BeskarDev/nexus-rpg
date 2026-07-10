# Tempest — Spell School Design Space

## School Identity

**Tradition**: Tempest (Mystic)
**Traits**: hurricanes, earthquakes, thunderstorms, sandstorms, floods
**Identity**: Respectful wielding of destructive natural forces — channeling storms, quakes, and floods
**Role Spread**: Excels: Offense | Decent: Control, Utility | Weak: Healing, Support, Defense

### Mechanical Identity
- **Primary Conditions**: Staggered (lightning), prone (wind/quake), deafened (thunder)
- **Signature Gimmick**: Storm power and environmental destruction — area denial, forced movement, terrain destruction
- **Damage Types**: Lightning, Frost, Blast

### Design Principles
1. Tempest is the strongest offensive mystic tradition (28/33 spells deal damage)
2. Storm and lightning effects provide both damage and control
3. Area denial through weather effects (wind, ice, sandstorm) is a key tactic
4. **Gaps**: Limited non-combat utility, "earthquakes," "sandstorms," and "floods" lack R0 representation
5. Blast damage (½ AV ignore) fits concussive storm effects — retain this identity

### Internal Synergies

Framework: `.claude/skills/spell-design/references/synergy-framework.md` — roles (setup / payoff / extender), the two axes, and the shared socket set.

**Setup levers** — states Tempest emits: **weather as field** (a Storm Cloud gathering overhead, a Sandstorm scouring sight away, wind walls and cyclones carving the battlefield), *prone* and forced movement (gusts, tremors, floodwater), *staggered* (thunder), and *deafened*. Its setups are big, loud, and diegetic — the sky itself turns hostile.

**Payoff levers** — Tempest strikes into the storm it raised: lightning falls hardest from a standing storm cloud, wind-thrown and *prone* targets have no footing against the follow-up wave, and chained strikes (Chain Lightning) cash in enemies the winds packed together. Cold-cast deficit is structural in the two-roll pattern — Storm Cloud and Cyclone do little the turn they are raised and pay off on the attacks made *through* them in later rounds.

**Extenders** — *prolong* through persistent weather (the cloud keeps rumbling, the cyclone keeps wandering, each granting repeat attacks for one casting), **escalate** — the school's signature *convert*: a minor squall built into a full tempest across turns (storm build-up, R4 capstones like Lightning Storm and Avatar of Storms as the matured sky), and *refresh* as the elemental servant (Conjure Elemental) re-applies pressure with its own actions each round.

**Solo engine** (multi-turn): T1 Storm Cloud (the sky loads) → T2 Wind Hose slams the enemy line *prone* beneath it → T3 the cloud's repeated lightning falls on grounded targets while Thunder Clap staggers whoever regains their feet. Gated by concentration on the weather, the two-roll structure (raise, then attack), and Focus — a broken concentration disperses the whole invested sky.

**Party interlock**: **emits** *prone*, *staggered*, *deafened*, forced movement, and sight-killing weather (sandstorm cover the rogue hunts through) — disruption currency: a prone, staggered line is a charge target for every martial. **wants** melee allies to finish what the storm knocks down, and tight enemy clusters (Conjuration's walls, Telekinetics' pulls) for its chains and waves to sweep whole. Cross-player line: Telekinetics drags the raiders into one knot and Tempest's Chain Lightning arcs through every one of them.

**Synergy gaps**: setup and extenders are rich, but the **storm build-up escalation is informal** — no published mechanic actually grows a lesser storm into a greater one — and nothing published rewards striking *prone/staggered* targets beyond the conditions themselves. The seed table below carries both design targets: *Thunderfall* (R2 payoff against prone/staggered) and *Feed the Storm* (R3 escalate-extender on a standing storm).

## Current Spell Inventory (34 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Gust, Static Shock, Wind Slash |
| 1 | 10 | Bursting Crackle, Curse of Tempest, Earthen Tremor, Electrified Weapon, Lightning Javelin, Storm Coat, Storm Shield, Updraft, Volcanic Bolt, Wind Hose |
| 2 | 9 | Conjure Elemental, Lightning Bolt, Lightning Step, Magma Burst, Pyroclasm, Storm Cloud, Thunder Clap, Torrent, Wind Ward |
| 3 | 7 | Chain Lightning, Cone of Cold, Cyclone, Lightning Volley, Sandstorm (incomplete), Shattering Orb, Wind Wall |
| 4 | 5 | Avatar of Storms, Control Water (incomplete), Control Winds (incomplete), Earthquake (incomplete), Lightning Storm (incomplete) |
| 5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| hurricanes | Gust, Wind Slash | Wind Hose, Updraft, Storm Shield | Torrent, Wind Ward | Cyclone, Wind Wall | Control Winds | Eye of the Storm† |
| earthquakes | Tremor† | Earthen Tremor | Magma Burst | Fissure† | — | Earthquake |
| thunderstorms | Static Shock | Bursting Crackle, Lightning Javelin, Electrified Weapon, Storm Coat | Lightning Bolt, Lightning Step, Storm Cloud, Thunder Clap, Thunderfall† | Chain Lightning, Lightning Volley, Shattering Orb, Feed the Storm† | Avatar of Storms | Lightning Storm |
| sandstorms | Sand Gust† | Sandblast† | Pyroclasm | Cone of Cold | Sandstorm | — |
| floods | Splash† | Water Jet† | Torrent, Conjure Elemental | Flash Flood† | Control Water | — |

*† = proposed seed (undesigned). Ranks follow the current published file: Sandstorm sits at R4, Earthquake and Lightning Storm at R5, and Control Water/Control Winds are complete at R4. Weather Prediction (R0 utility seed) sits outside the trait rows.*

**Coverage**: 27/30 trait×rank slots hold a published spell or a seed. Honest gaps: earthquakes R4 (Earthquake holds R5; Earthen Tremor's Heighten and Fissure cover the mid-ranks), sandstorms R5 and floods R5 (both covered by proposed Heighten extensions on Sandstorm and Control Water rather than new spells, principle 3). Only published spells count as real coverage — proposed entries are undesigned seeds (principle 19). An honest empty cell beats a filler seed.

## Proposed Spell Changes

### Lightning Bolt — Area Reduction

**Current**: Line in medium range at Rank 2
**Proposed**: Reduce to **short line** to match R2 area progression
**Rationale**: R2 spells should affect a close area or short line.

### Cone of Cold — Damage Reduction

**Current**: +6/+12/+18 AoE cone at Rank 3
**Proposed**: Reduce to **+4/+8/+12** to match half single-target scaling for R3 multi-target
**Rationale**: R3 multi-target should be +4/+8/+12 under revised scaling.

### Chain Lightning — Damage Reduction

**Current**: +6/+12/+18 chain at Rank 3
**Proposed**: Primary target +8/+16/+24 (single-target scaling), chain targets +4/+8/+12 (multi-target scaling)
**Rationale**: Chain spell pattern — primary target at full damage, secondary targets at half.

### Heighten Extensions (replacing capstone seeds, principle 3)

"Bigger version of X" concepts are Heighten notes on published spells, not new seeds:

- **Avatar of Storms (R4)**: add a (Rank 5) Heighten scaling the form's magnitudes (temp HP, retaliation damage, damage rider). Covers the R5 storm-transformation concept.
- **Sandstorm (R4)**: add a (Rank 5) Heighten widening the storm's radius one step and raising the flat scouring tick. Covers the R5 sandstorms slot.
- **Control Water (R4)**: add a (Rank 5) Heighten enlarging the controlled area and the modes' magnitudes (the Whirlpool mode already is a maelstrom). Covers the R5 floods slot.
- **Earthen Tremor (R1)** already heightens to R2/R3, and Pyroclasm and Magma Burst hold the R2 earth-eruption space — no new R2 quake AoE is needed.

## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Role | Seed |
|---|---|---|---|
| Tremor | 0 | Control / setup | Stamp the ground and a localized shudder rocks one creature's footing (earthquakes trait): minimal control-cantrip damage (+0/+2/+4), briefly *staggered* on a strong or critical success. The at-will tap that feeds Thunderfall and melee allies. Distinct from Earthen Tremor (R1 damage cone), which stays the damage rung. |
| Sand Gust | 0 | Control / setup | Whip a stinging burst of sand into one creature's face (sandstorms trait): little or no damage, the target briefly suffers +1 bane on sight-based rolls, upgraded to briefly blinded on a critical. Emits the sight-denial state the sandstorm line scales up through Sandblast and Sandstorm; blinded targets are payoff surface for every martial. |
| Splash | 0 | Utility / setup | Conjure a sudden drench of water (floods trait): douses flames and ends the burning condition, soaks mundane fire hazards, and a creature caught in the wash is briefly *slowed* (soaked and heavy). Deliberately no damage so Gust keeps the push-cantrip role; emits the shared *slowed* socket. |
| Weather Prediction | 0 | Utility / standalone | Read wind and sky to divine coming weather, the school's only non-combat cantrip. GM answers from a bounded menu (principle 29): dominant weather type, rough onset time, severity band, with a symbolic-omen safety valve when the weather is magically influenced. Feeds travel-mode decisions; no combat role by design. |
| Sandblast | 1 | Offense / setup | Hurl scouring sand at one creature (sandstorms trait): on-curve R1 single-target damage (+4/+8/+12), and a strong or critical success also inflicts the brief sight bane / blinded state Sand Gust emits. The R1 rung of the sight-denial ladder toward Sandstorm. |
| Water Jet | 1 | Offense / setup | A high-pressure jet slams one creature (floods trait): R1 single-target damage with forced-movement riders — push close on strong, push short and *prone* on critical — and it douses burning on the target. Emits *prone/pushed* for Thunderfall and melee allies; single-target counterpart to Torrent's R2 line. |
| Thunderfall | 2 | Offense / payoff | A hammer of pressure drops on one creature (thunderstorms trait): below-curve blast damage (ignore 1/2 AV) when cast cold, full-curve damage plus briefly deafened against a *prone* or *staggered* target that cannot brace (cold-cast deficit). The school's first formal payoff — spends the states Tremor, Thunder Clap, Torrent, Shattering Orb, and Cyclone emit. |
| Fissure | 3 | Control / setup | Split the ground in a jagged line (earthquakes trait): placed hazard with a fixed cast TN (principle 42), creatures on the line save vs. your Resist or drop in and take falling damage by the general rule (principle 43). The fissure remains as difficult terrain and a battlefield divider. Fills the R3 earthquakes gap between Earthen Tremor and Earthquake. |
| Feed the Storm | 3 | Offense / extender | Pour power into your standing Storm Cloud or Cyclone (thunderstorms and hurricanes traits): its area grows one step and its repeated attacks gain a flat damage bonus for the rest of its duration. Castable only with such a storm already raised — the storm build-up gimmick as a priced escalate-extender instead of flavor, deepening the two-roll weather engine. |
| Flash Flood | 3 | Control / setup | A surge of water crashes through a placed area (floods trait): fixed cast TN, compare the casting result to the Parry of each creature caught (principle 42 b2) to sweep them a short distance and knock them *prone*, and the ground stays flooded as difficult terrain for a short duration. Field-reshaping counterpart to Torrent's aimed line; feeds Thunderfall and melee payoffs. |
| Eye of the Storm | 5 | Control / setup | Become the calm eye of a raging hurricane ring (hurricanes trait, R5 capstone): a caster-centered storm ring dealing flat recurring damage (principle 44), pushing enemies outward or knocking them *prone* by casting result vs. Parry, with ranged attacks through the winds suffering banes. Concentrate-gated and mortal-pinnacle bounded — a walking storm, not battlefield-wide, no immunity inside the eye beyond the wind's cover. Emits mass *prone* and weather cover for the party. |

## Cross-School Spell Sharing

The following spells are shared between Tempest and arcane disciplines (same spell in both lists):

| Spell | Tempest Rank | Shared With | Notes |
|-------|-------------|-------------|-------|
| **Chain Lightning** | R3 | Evocation (Arcane) | Identical spell — primary target + chain to secondary targets |

**Concept Overlaps** (not shared, but thematically adjacent):
- **Lightning Bolt** (Tempest R2) overlaps with **Lightning Strike** (Evocation R2) — both are line-based lightning damage spells. Tempest channels divine storm power; Evocation channels raw elemental force. Similar mechanics, different flavor sources.

> **Design Note**: Cross-school sharing is limited to spells that thematically fit both schools. Chain Lightning represents both raw elemental control (Evocation) and natural storm power (Tempest). When a spell is shared, it must be identical in both lists.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Hurricanes chain**: Gust/Wind Slash (R0) → Wind Hose/Updraft/Storm Shield (R1) → Torrent/Wind Ward (R2) → Cyclone/Wind Wall (R3) → Control Winds (R4) → Eye of the Storm† (R5)
2. **Earthquakes chain**: Tremor† (R0) → Earthen Tremor (R1) → Magma Burst plus Earthen Tremor's Heighten (R2) → Fissure† (R3) → Earthquake (R5) — no R4 rung, honest gap
3. **Thunderstorms chain**: Static Shock (R0) → Bursting Crackle/Lightning Javelin/Electrified Weapon/Storm Coat (R1) → Lightning Bolt/Storm Cloud/Thunder Clap/Thunderfall† (R2) → Chain Lightning/Lightning Volley/Shattering Orb/Feed the Storm† (R3) → Avatar of Storms (R4) → Lightning Storm (R5) — **complete R0-R5 published**
4. **Sandstorms chain**: Sand Gust† (R0) → Sandblast† (R1) → Pyroclasm (R2) → Cone of Cold (R3) → Sandstorm (R4) → R5 via Sandstorm Heighten extension
5. **Floods chain**: Splash† (R0) → Water Jet† (R1) → Torrent/Conjure Elemental (R2) → Flash Flood† (R3) → Control Water (R4) → R5 via Control Water Heighten extension

### Setup + Payoff Combos
- ✅ **Wind push → lightning**: Push targets into exposed positions with Gust/Wind Hose → strike with lightning spells for full effect (published)
- ✅ **Prone/staggered → Thunderfall**: Tremor†, Thunder Clap, Torrent, Shattering Orb, and Cyclone emit *prone/staggered* → Thunderfall† spends them for full-curve blast damage — the school's first formal in-school payoff (seeded)
- ✅ **Storm build-up**: Storm Cloud/Cyclone raise a standing storm → Feed the Storm† grows its area and per-attack damage — the signature escalation gimmick as a priced mechanic (seeded)
- ✅ **Sight denial ladder**: Sand Gust†/Sandblast† blind targets → martial allies and the Sandstorm zone exploit blinded, unbraced enemies (seeded + published)
- ✅ **Flood control**: Splash† slows and douses → Water Jet† pushes and prones → Torrent/Flash Flood† reshape the field with *prone* plus difficult terrain for melee payoffs (seeded + published)

### Design Completeness Checklist
- [x] R1 Quick Action: Storm Shield (R1, published) — reactive Resist-defense with retaliation and diversion; Updraft (R1, published) covers reactive falls
- [x] Defensive options: Storm Shield (R1), Storm Coat (R1), Wind Ward (R2), Avatar of Storms (R4) — published suite
- [x] Utility: Weather Prediction† (R0 seed, the non-combat gap-filler); Control Winds and Control Water (R4, published) for advanced utility
- [x] Damage across ranks: R0-R5 fully covered by published spells alone (Lightning Storm and Earthquake hold R5)
- [x] Repeating conditions: staggered, prone, deafened, pushed, sight denial — consistent storm-force identity
- [x] Setup+payoff: Thunderfall† (payoff) and Feed the Storm† (escalate-extender) close the two declared synergy gaps; sight-denial and flood-control ladders seeded
- [x] **3 spells per rank minimum**: met by published spells alone at R0-R4 (3/10/9/6/4); R5 holds 2 published plus 1 seed
- [ ] **All trait×rank slots filled**: 27/30 covered by published spells, seeds, or Heighten extensions — honest gaps at earthquakes R4, sandstorms R5, floods R5 (the latter two via proposed Heighten extensions)
