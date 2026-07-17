# Life — Spell School Design Space

## School Identity

**Tradition**: Life (Mystic)
**Traits**: vitality, blessings, community, hope, fertility
**Identity**: Communal growth and restoration — nurturing life, healing wounds, strengthening bonds
**Role Spread**: Excels: Healing | Decent: Support, Utility | Weak: Offense, Defense, Control

### Mechanical Identity
- **Primary Conditions**: Dazed (life force overload), stunned (vitality surge)
- **Signature Gimmick**: Healing and blessing — restore HP, grant temp HP, remove conditions, bless allies
- **Damage Types**: Radiant, Psychic (life force overload)

### Design Principles
1. Life is the premier healing tradition — highest HP restoration and condition removal
2. Damage is restricted and defensive — life force overload, punishing undead, retaliatory bursts
3. Blessings provide proactive protection (temp HP, resistance)
4. **Key balance finding** (§16): Healing scaling matches damage 1:1 for single-target, half for AoE/Quick Action — well-calibrated
5. Wound healing is intentionally rare (gritty system)
6. **Gap**: "Fertility" trait has no spells at any rank

### Internal Synergies

Framework: `.claude/skills/spell-design/references/synergy-framework.md` — roles (setup / payoff / extender), the two axes, and the shared socket set.

Like Peace, Life is a support school whose "payoff" is usually measured in allies still standing — but Life has a real second engine: **overflowing vitality as a weapon** (life force overload, anti-undead radiance).

**Setup levers** — states Life emits: **stored vitality** (temp HP shields, standing blessings on allies waiting to trigger), **hallowed ground** (zones of consecrated life energy), and *blessed* allies whose next act is empowered. Against the undead, its very presence is a setup — radiant power primes them for destruction.

**Payoff levers** — Life spends stored vitality at the crisis point: the blessing triggers on the ally's decisive swing, the healing lands exactly when the tank would have dropped (turning an enemy's best turn into nothing), and overloaded life force bursts as damage against the undead and the living alike (Verdant Blast, Vitality Surge). Cold-cast deficit: Life's offense is capped below Offense-school curve by design — overload damage only competes when the target is undead or the zone is prepared.

**Extenders** — *prolong* through zones (Hallow Ground and healing fields keep vitality flowing every round), *refresh* with cheap repeated healing (Rapid Vitality topping up between blows), and *spread* through communal effects (Healing Burst, Aid touching the whole line at once).

**Solo engine** (multi-turn): T1 Hallow Ground under the party's line → T2 Aid / Blessing of Life on the frontline standing in it → T3 Healing Burst as the enemy wave breaks against allies who will not fall. Gated by Focus (healing is never free, principle 11), concentration on zones, and the one-Wound-heal-per-day rule that stops attrition from ever becoming trivial.

**Party interlock**: **emits** temp HP, condition removal (Cleanse), *blessed* boons, and standing ground that makes a position worth holding — endurance currency for whoever fights longest in melee. **wants** a frontline worth sustaining (its magic multiplies allies who are in harm's way, doing nothing for a party that hides) and undead-heavy foes where its damage engine wakes up. Cross-player line: the fighter holds the shrine door inside Hallow Ground, unkillable while the priest channels, and the horde breaks against one spear.

**Synergy gaps (updated 2026-07-17)**: the trigger-payoff engine is published end to end — *Surge of Renewal* (R2, heal-then-strike), *Bursting Ward* (R2, shield-break burst), *Beacon of Hope* (R1, morale aura), *Kindred Bond* (R0, crisis timing), and *Rallying Cry* (R3, the crisis-point payoff itself, published 2026-07-17).

## Current Spell Inventory (32 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 5 | Kindred Bond, Life Shield, Nurturing Touch, Restore Life, Verdant Blast |
| 1 | 7 | Beacon of Hope, Blessing of Life, Healing Touch, Overflow of Life, Rapid Vitality, Sustaining Grace, Vitalizing Weapon |
| 2 | 9 | Aid, Blessing of the Harvest, Bursting Ward, Cleanse, Detect Life, Hallow Ground, Hallowed Rest, Healing Burst, Surge of Renewal |
| 3 | 5 | Abundance of Life, Rallying Cry, Revivify, Seed of Life, Vitality Surge |
| 4 | 3 | Greater Restoration, Life Ward, Raise Dead |
| 5 | 3 | Genesis, Resurrection, Wellspring of Life |

### Trait × Rank Coverage Matrix

Published spells in plain text, proposed seeds in *italics*, — marks a deliberately empty slot (an honest gap beats a filler seed).

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| vitality | Restore Life | Rapid Vitality, Healing Touch, Sustaining Grace | Aid, Healing Burst, Detect Life | Vitality Surge, Revivify | Greater Restoration | Wellspring of Life |
| blessings | Life Shield | Blessing of Life, Vitalizing Weapon | Hallow Ground, Bursting Ward | — | Life Ward | — |
| community | Kindred Bond | Overflow of Life | Cleanse, Hallowed Rest | Abundance of Life | Raise Dead | Resurrection |
| hope | Verdant Blast | Beacon of Hope | Surge of Renewal | Rallying Cry | — | — |
| fertility | Nurturing Touch | — | Blessing of the Harvest | — | — | Genesis |

**Coverage (updated 2026-07-17)**: all matrix names are published (Rallying Cry, hope R3, published 2026-07-17 — plus Seed of Life added to the school outside the trait matrix as a vitality-adjacent fresh concept). Empty cells are deliberate — blessings R3/R5 resolve as Heighten extensions on existing spells (see notes under the seed table), hope tops out at R3 (a morale trait does not need a capstone nuke), and fertility is a sparse downtime trait by design.


## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

Role = combat-role / synergy-role (per the synergy framework).

*Published from this table (2026-07-14 to 2026-07-17): Kindred Bond (R0), Nurturing Touch (R0), Beacon of Hope (R1), Sustaining Grace (R1), Surge of Renewal (R2), Bursting Ward (R2), Blessing of the Harvest (R2), Rallying Cry (R3), Wellspring of Life (R5), Genesis (R5). Seed of Life (R3, P11 batch) added as a fresh concept outside this table — contingent pre-cast healing, no prior seed existed.*

**No open seeds remain in this school.**

**Heighten extensions instead of new spells** (principle 3 — bigger versions of published spells are Heighten notes, not seeds):
- **Healing Burst** — cascade its Heighten past R3 to R4 (+7/+14/+21) and R5 (+9/+18/+27, hits the ~half-single-target AoE ceiling) per principle 26. This replaces the former "Mass Restoration" R5 AoE-heal concept.
- **Aid** — cascade its temp-HP Heighten to R4/R5. Covers the "mass blessing capstone" space the former "Mantle of the Blessed" seed occupied.
- **Life Ward** (once designed) — an R5 Heighten targeting additional creatures covers party-wide death protection without a separate capstone spell.

## Cross-School Spell Sharing

Life's healing and blessing identity has minimal overlap with Arcane disciplines. No Arcane school excels at or even decently handles healing — it is exclusively a Mystic strength. The closest thematic connections are narrow.

### Potential Sharing Candidates
- **Detect Life** (Life R2) ↔ Telepathy: Both schools sense living creatures — Life through vital energy, Telepathy through mental presence. Could share as identical detection spell with different flavor. Weak candidate — the detection methods differ significantly (life force vs. thoughts).
- **Life Shield** (Life R0, temp HP) ↔ Conjuration: Temporary HP could be framed as conjuring a force barrier or as blessing with vitality. Very weak candidate — the blessing identity is uniquely Mystic.

### Design Notes
- Cross-school sharing is **arcane ↔ mystic only** (never within the same category).
- Shared spells must be **mechanically identical** even if flavor differs.
- Life has the **weakest arcane overlap** of any Mystic tradition because healing is an exclusively Mystic domain. No identical spells are recommended at this time.
- Within Mystic traditions, Life and Nature both heal, but sharing applies only across the arcane ↔ mystic boundary, not within Mystic.

## Synergy & Completeness Assessment

### Spell Progression Chains
(✨ = undesigned seed; the old phantom rungs — Vital Surge, Courage of the Faithful, Undaunted, Triumph of the Living, Bloom, Lifespring, Garden of Renewal, Verdant Surge, Mass Restoration, Mantle of the Blessed, Circle of Renewal — were cut; Heighten cascades and the published set cover their space.)
1. **Vitality/Healing chain**: Restore Life (R0) → Rapid Vitality/Healing Touch/Sustaining Grace (R1) → Aid/Healing Burst (R2) → Vitality Surge/Revivify (R3) → Greater Restoration (R4) → Resurrection/Wellspring of Life (R5) — **published R0-R5**
2. **Blessings chain**: Life Shield (R0) → Blessing of Life/Vitalizing Weapon (R1) → Hallow Ground/Bursting Ward (R2) → honest gap (R3) → Life Ward (R4) → *(R5 via Life Ward and Aid Heighten)*
3. **Community chain**: Kindred Bond (R0) → Overflow of Life (R1) → Cleanse/Hallowed Rest (R2) → Abundance of Life (R3) → Raise Dead (R4) → Resurrection (R5) — **published R0-R5**
4. **Hope chain**: Verdant Blast (R0) → Beacon of Hope (R1) → Surge of Renewal (R2) → Rallying Cry (R3) — capped at R3 by design
5. **Fertility chain**: Nurturing Touch (R0) → Blessing of the Harvest (R2) → Genesis (R5) — sparse downtime trait by design

### Setup + Payoff Combos
- ✅ **Heal → Surge**: Healing Touch/Rapid Vitality/Healing Burst restore HP → Surge of Renewal (R2, published) converts the overflow into a boon + radiant rider
- ✅ **Ward → Burst**: Bursting Ward's temp HP detonates on the attacker who breaks it — published trap in the temp-HP economy
- ✅ **Ward → Resurrect**: Life Ward (R4 death prevention) → Revivify (R3 post-death) → Raise Dead (R4 delayed) → Resurrection (R5) — published death-handling chain
- ✅ **Wellspring → spread heal**: Wellspring of Life (R5, published) amplifies and splashes every heal in the kit
- ✅ **Crisis timing**: Kindred Bond (R0) tells the healer when → Rallying Cry (R3, published 2026-07-17) is the crisis-point payoff
- ✅ **Hope → Stand**: Beacon of Hope (R1) steadies morale → Surge of Renewal (R2) rewards the push — published

### Design Completeness Checklist
- [x] **R1 Quick Action**: Sustaining Grace (R1, published) — standardized reactive defense (+2 Dodge/Parry, healing secondary)
- [x] **3 spells per rank minimum (published)**: R0: 5, R1: 7, R2: 9, R3: 3, R4: 3, R5: 3 — met at every rank
- [x] Defensive options: Life Shield (R0 temp HP), Sustaining Grace (R1), Bursting Ward (R2), Life Ward (R4) — published
- [x] Utility: Kindred Bond (R0), Nurturing Touch (R0), Detect Life (R2), Blessing of the Harvest (R2), Greater Restoration (R4), Genesis (R5) — published
- ⚠️ Damage across ranks: Verdant Blast (R0) is the only dedicated damage spell — very limited offense, appropriate for a Healing-excels school
- [x] Repeating conditions: temp HP economy, dazed (life force overload), fear re-rolls (hope chain)
- [x] Setup+payoff: heal → surge, ward → burst, ward → resurrect, wellspring → spread — published, including Rallying Cry (R3)
- [x] **Trait×rank coverage**: 22 published cells; remaining cells deliberately empty (see matrix note)

### Impact & Trivialization Review
- **Greater Restoration (R4 wound healing)**: Moderate risk — wound healing bypasses the gritty injury system. **Mitigations**: R4 Focus cost (8), touch range, wound healing only at Strong+ success, permanent injury only at Critical. In a gritty system, this is appropriately rare and costly.
- **Life Ward (R4 death prevention)**: Moderate risk — negating death is powerful. **Mitigations**: single-trigger (twice at Critical only), medium duration requires pre-combat casting, ward ends after triggering. Cannot be stacked with multiple castings on the same target.
- **Wellspring of Life (R5 healing amplification)**: Moderate risk — doubled healing could make the party nearly unkillable. **Mitigations**: concentration required (breaks if caster takes damage or acts), R5 Focus cost (10), short duration. The amplification applies only to the caster's own healing spells, not all healing.
- **Nurturing Touch (R0 agriculture)**: Minimal risk — purely flavor/downtime cantrip for plant growth and animal care. No combat application, no game mechanic trivialized.
