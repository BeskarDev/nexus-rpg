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

**Synergy gaps**: sustain setup and extenders are complete, and the death-reversal ladder is published in full (Revivify R3, Raise Dead R4, Resurrection R5). The remaining gap is the **trigger-payoff design** — blessings mostly grant flat bonuses rather than firing at a defined moment (heal-then-strike, shield-break bursts, crisis-point rallies). The seed table below targets exactly this engine.

## Current Spell Inventory (21 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Life Shield, Restore Life, Verdant Blast |
| 1 | 5 | Blessing of Life, Healing Touch, Overflow of Life, Rapid Vitality, Vitalizing Weapon |
| 2 | 6 | Aid, Cleanse, Detect Life, Hallow Ground, Hallowed Rest, Healing Burst |
| 3 | 3 | Abundance of Life, Revivify, Vitality Surge |
| 4 | 3 | Greater Restoration, Life Ward, Raise Dead |
| 5 | 1 | Resurrection |

### Trait × Rank Coverage Matrix

Published spells in plain text, proposed seeds in *italics*, — marks a deliberately empty slot (an honest gap beats a filler seed).

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| vitality | Restore Life | Rapid Vitality, Healing Touch, *Sustaining Grace* | Aid, Healing Burst, Detect Life | Vitality Surge, Revivify | Greater Restoration | *Wellspring of Life* |
| blessings | Life Shield | Blessing of Life, Vitalizing Weapon | Hallow Ground, *Bursting Ward* | — | Life Ward | — |
| community | *Kindred Bond* | Overflow of Life | Cleanse, Hallowed Rest | Abundance of Life | Raise Dead | Resurrection |
| hope | Verdant Blast | *Beacon of Hope* | *Surge of Renewal* | *Rallying Cry* | — | — |
| fertility | *Nurturing Touch* | — | *Blessing of the Harvest* | — | — | *Genesis* |

**Coverage**: only published spells count as real coverage; italicized entries are undesigned seeds (principle 19). Empty cells are deliberate — blessings R3/R5 resolve as Heighten extensions on existing spells (see notes under the seed table), hope tops out at R3 (a morale trait does not need a capstone nuke), and fertility is a sparse downtime trait by design.


## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

Role = combat-role / synergy-role (per the synergy framework).

| Concept | Rank | Role | Seed |
|---|---|---|---|
| Kindred Bond | 0 | Utility / setup | Touch an ally to forge a life-thread for a medium duration: while they are within long range you know their rough state from a bounded menu (unharmed, hurt, close to falling, dying, dead) and which conditions afflict them, even without line of sight (community trait, principle 29 parameters). Timing tool for the crisis-point engine — tells the healer exactly when to fire Rallying Cry, Overflow of Life, or Revivify. |
| Nurturing Touch | 0 | Utility / standalone | Channel a trickle of vitality into one touched plant or Beast: cure a minor blight or sickness, calm a distressed animal, and grant +1 boon on the next roll to tend it (fertility trait). Pure downtime/husbandry cantrip, no combat application. |
| Beacon of Hope | 1 | Support / setup | A standing aura of hope in close range for a short duration: allies inside gain +1 boon on rolls to resist fear and despair effects, and an ally who starts their turn frightened may immediately re-roll against it (hope trait). Emits the steadied-morale state that Rallying Cry escalates at R3. |
| Sustaining Grace | 1 | Defense / standalone | The standardized R1 reactive Quick Action (principle 4): +2 to Dodge or Parry against the triggering attack, no SL scaling, plus the Life secondary — if the attack still hits, the target restores 2 HP as vitality cushions the blow. Fills the school's missing reactive-defense slot. |
| Surge of Renewal | 2 | Support / payoff | Rider on your own healing: when you restore HP to an ally this turn, the overflow steels them — their next attack or roll before your next turn gains +1 boon and +2 radiant damage (vitality/hope). Cast without a heal it does nothing (cold-cast deficit is total). Plugs into Healing Touch, Rapid Vitality, and Healing Burst. |
| Bursting Ward | 2 | Support / setup | Lay a vitality ward granting temp HP on an ally: when that temp HP breaks from enemy damage, it detonates — radiant damage to the attacker and they are briefly dazed (blessings trait, stored-charge state, dazed = the school's overload condition). Extends the Life Shield/Aid temp-HP economy into a trap enemies must respect. |
| Blessing of the Harvest | 2 | Utility / standalone | Ritual (hours): bless a field, herd, or grove for a season — crops resist blight, animals bear healthy young, and the holding's harvest counts one step more plentiful for downtime subsistence (fertility/community). Temple-rite framing per principle 33: a rite communities petition for, not an economy engine. |
| Rallying Cry | 3 | Support / payoff | The crisis-point payoff (hope trait): each dying ally in short range stabilizes, and each ally below half HP gains temp HP and +1 boon on their next roll. Against a healthy party it does nothing — the cold-cast deficit is the trigger condition itself. Combos with Kindred Bond (timing) and Hallow Ground (holding the line at the brink). |
| Wellspring of Life | 5 | Support / extender | Capstone extender (vitality/community): while you concentrate, you become a living font — your healing spells restore extra HP and splash half their healing onto a second ally in close range of the target, and allies in close range of you regain a small flat HP amount at the start of their turns (flat per principle 44). R5 mandatory material cost 5,000+. Spreads and prolongs every heal in the kit. |
| Genesis | 5 | Utility / standalone | Fertility capstone: ritual (hours), material cost 5,000+ — restore one bounded tract of blighted, defiled, or barren land (up to a valley or holding) to living fertility, ending unnatural corruption on it. The mortal-pinnacle answer to Death's blights; story-scale, no combat use, needs a GM worldbuilding framing note per principle 33. |

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
1. **Vitality/Healing chain**: Restore Life (R0) → Rapid Vitality/Healing Touch/Vital Surge (R1) → Aid/Healing Burst (R2) → Vitality Surge/Revivify (R3) → Greater Restoration (R4) → Mass Restoration/Resurrection/Wellspring of Life (R5) — **complete R0-R5**
2. **Blessings chain**: Life Shield (R0) → Blessing of Life/Vitalizing Weapon (R1) → Hallow Ground (R2) → Circle of Renewal (R3) → Life Ward (R4) → Mantle of the Blessed (R5) — **complete R0-R5**
3. **Community chain**: Kindred Bond (R0) → Overflow of Life (R1) → Cleanse (R2) → Abundance of Life (R3) → Raise Dead (R4) → Mass Restoration/Wellspring of Life (R5) — **complete R0-R5**
4. **Hope chain**: Verdant Blast (R0) → Beacon of Hope (R1) → Courage of the Faithful (R2) → Rallying Cry (R3) → Undaunted (R4) → Triumph of the Living (R5) — **complete R0-R5**
5. **Fertility chain**: Nurturing Touch (R0) → Bloom (R1) → Lifespring (R2) → Garden of Renewal (R3) → Verdant Surge (R4) → Genesis (R5) — **complete R0-R5**

### Setup + Payoff Combos
- ✅ **Heal → Bless**: Healing Touch restores HP, then Blessing of Life enhances the healed ally's next action
- ✅ **Life Shield → Burst**: Temp HP from Life Shield absorbs damage; when broken, stored energy bursts — elevated to capstone scale by Mantle of the Blessed (R5)
- ✅ **Ward → Resurrect**: Life Ward (R4 death prevention) → Revivify (R3 post-death) → Raise Dead (R4 delayed) → Resurrection (R5) — full death-handling chain from proactive to reactive
- ✅ **Wellspring → Mass Heal**: Wellspring of Life (R5 healing amplification) → Mass Restoration or any healing spell — amplified healing output creates a clear capstone combo
- ✅ **Hope → Stand**: Beacon of Hope (R1 save boons) → Courage of the Faithful (R2 fear immunity) → Rallying Cry (R3 AoE morale) → Undaunted (R4 condition immunity) → Triumph of the Living (R5 ultimate inspiration) — full morale chain
- ✅ **Fertility → Sustain**: Nurturing Touch (R0 single plant) → Bloom (R1 area growth) → Lifespring (R2 water/food) → Garden of Renewal (R3 healing garden) → Verdant Surge (R4 battlefield reshaping) → Genesis (R5 permanent transformation) — complete creation chain from cantrip to campaign-altering

### Design Completeness Checklist
- [x] **R1 Quick Action**: Vital Surge — standardized reactive defense (+2 Dodge/Parry, healing secondary)
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 5, R1: 8, R2: 7, R3: 6, R4: 5, R5: 6)
- [x] Defensive options: Life Shield (R0 temp HP), Beacon of Hope (R1 save bonus), Life Ward (R4 death prevention), Mantle of the Blessed (R5 party defense) — strong defensive coverage
- [x] Utility: Kindred Bond (R0), Nurturing Touch (R0), Bloom (R1), Detect Life (R2), Lifespring (R2), Verdant Surge (R4), Greater Restoration (R4 condition/wound removal), Genesis (R5)
- ⚠️ Damage across ranks: Verdant Blast (R0) is the only dedicated damage spell — very limited offense, appropriate for a Healing-excels school
- [x] Repeating conditions: Blessed (positive condition), dazed/stunned (life force overload), frightened immunity (hope chain)
- ✅ Setup+payoff: Heal → bless, ward → resurrect, wellspring → mass heal, life shield → burst, hope chain, fertility chain — all well-defined
- [ ] **All gaps filled**: all 30 trait×rank slots seeded with concepts; published coverage is partial (see inventory) coverage — every trait×rank slot occupied

### Impact & Trivialization Review
- **Greater Restoration (R4 wound healing)**: Moderate risk — wound healing bypasses the gritty injury system. **Mitigations**: R4 Focus cost (8), touch range, wound healing only at Strong+ success, permanent injury only at Critical. In a gritty system, this is appropriately rare and costly.
- **Life Ward (R4 death prevention)**: Moderate risk — negating death is powerful. **Mitigations**: single-trigger (twice at Critical only), medium duration requires pre-combat casting, ward ends after triggering. Cannot be stacked with multiple castings on the same target.
- **Wellspring of Life (R5 healing amplification)**: Moderate risk — doubled healing could make the party nearly unkillable. **Mitigations**: concentration required (breaks if caster takes damage or acts), R5 Focus cost (10), short duration. The amplification applies only to the caster's own healing spells, not all healing.
- **Nurturing Touch (R0 agriculture)**: Minimal risk — purely flavor/downtime cantrip for plant growth and animal care. No combat application, no game mechanic trivialized.
