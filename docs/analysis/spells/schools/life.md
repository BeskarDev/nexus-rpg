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
- **Heal → Bless**: Healing an ally activates blessing effects (enhanced next action)
- **Life Shield → Burst**: When temp HP shield breaks, release stored energy as radiant burst
- **Resurrection chain**: Rapid Vitality (R1) → Healing Touch (R1) → Abundance of Life (R3) → Revivify (R3) → Raise Dead (R4) → Resurrection (R5)

## Current Spell Inventory (15 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Life Shield, Restore Life, Verdant Blast |
| 1 | 5 | Blessing of Life, Healing Touch, Overflow of Life, Rapid Vitality, Vitalizing Weapon |
| 2 | 5 | Aid, Cleanse, Detect Life (incomplete), Hallow Ground, Healing Burst |
| 3 | 2 | Abundance of Life, Vitality Surge |
| 4–5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| vitality | Restore Life | Rapid Vitality, Healing Touch | Aid, Healing Burst | Vitality Surge | — | — |
| blessings | Life Shield (⚠️ weak) | Blessing of Life, Vitalizing Weapon | Hallow Ground | — | — | — |
| community | — | Overflow of Life | Cleanse | Abundance of Life | — | — |
| hope | Verdant Blast | — | — | — | — | — |
| fertility | ❌ **GAP** | — | — | — | — | — |

**Coverage**: 12/30 slots filled (40%) — healing core is solid but thematic breadth is narrow

**Critical Gaps**:
- **Fertility**: Zero spells at any rank — growth, agriculture, reproduction absent
- **Hope R1+**: Only one R0 spell — hope/inspiration theme barely explored
- **Community R0**: No cantrip-level communal effect
- **Blessings R3+**: No high-rank blessings
- **All traits R4-R5**: Zero spells — Life has no high-rank options at all (resurrection spells proposed fill this)

## Proposed New Spells

### Nurturing Touch

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Touch | Melee | —

*You channel life energy into a plant, animal, or small creature, encouraging growth and vitality.*

**Weak.** Accelerate the growth of one plant by a week's worth in an instant. Alternatively, soothe one small animal (calm a frightened horse, comfort a wounded pet).
**Strong.** Accelerate growth by a month. Heal a small animal of 2 HP. Alternatively, enrich soil in melee range (improve crop yield for next harvest).
**Critical.** Accelerate growth by a season. Heal a small animal of 4 HP and remove one minor condition. Enriched soil produces exceptional yields.

> **Design Note**: Fills the R0 fertility gap. Pure non-combat utility — plant growth, animal care, agriculture. Has no combat application, making it a flavor/downtime cantrip.

### Beacon of Hope

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Allies | Close | enchant (short)

*You radiate an aura of hope and inspiration, bolstering the resolve of nearby allies.*

**Weak.** Up to 3 allies gain +1 boon on their next save against a negative condition (fear, charm, daze, etc.) for a short duration.
**Strong.** The boon applies to their next two saves. Allies also gain +2 temporary HP.
**Critical.** The boon applies to all saves for the duration. Allies gain +4 temporary HP.

> **Design Note**: Fills R1 hope gap. Proactive defensive buff — complements Blessing of Life (R1) by protecting against conditions rather than healing damage. Temporary HP provides a small buffer without replacing healing.

### Circle of Renewal

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Allies | Close | concentrate, enchant (short)

*You consecrate the ground with life energy, creating a zone where vitality flows freely and blessings strengthen.*

**Weak.** Create a blessed zone in close range for a short duration. Allies who start their turn in the zone regain +2 HP and gain +1 boon on their next Fortitude check.
**Strong.** HP recovery increases to +4 per turn. Allies also gain resistance 2 to necrotic and poison damage while in the zone.
**Critical.** HP recovery +4 per turn. Necrotic/poison resistance 4. The first time each turn an ally in the zone would be reduced to 0 HP, they are instead reduced to 1 HP.

> **Design Note**: Fills R3 blessings gap. Area healing zone that rewards positioning — allies must stay in the zone. Concentration limits other spellcasting. The R3 "death prevention" at Critical is appropriate for the rank but only triggers once per turn and requires the zone be maintained.

### Revivify

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Touch | Melee | material cost (100 coins)

*You pour life energy into a creature that has died within the last minute, pulling their soul back from the threshold of death.*

**Weak.** The target returns to life with 1 HP. They gain 2 levels of fatigue. Any wounds or injuries the creature had at the time of death remain.
**Strong.** The target returns to life with HP equal to your Spell Power. They gain 1 level of fatigue. Wounds remain.
**Critical.** The target returns to life with HP equal to twice your Spell Power. They gain 1 level of fatigue. One wound is healed.

> **Design Note**: R3 resurrection. The gritty bronze age setting places even basic resurrection at R3. Heavy costs: material consumed, fatigue, wounds persist. Only works within 1 minute of death.

### Raise Dead

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Touch | Melee | ritual (1 hour), material cost (500 coins)

*Through an hour-long ritual of prayer and life channeling, you restore a creature that has been dead for up to one week.*

**Weak.** The target returns to life with 1 HP. They gain 3 levels of fatigue and suffer one permanent injury (GM's choice). Any wounds remain.
**Strong.** The target returns with HP equal to your Spell Power. They gain 2 levels of fatigue and suffer one permanent injury. One wound is healed.
**Critical.** The target returns with HP equal to twice your Spell Power. They gain 1 level of fatigue. One wound is healed. The permanent injury is minor rather than severe.

> **Design Note**: R4 resurrection. More powerful but with heavier costs — long ritual, expensive material, permanent injury represents the price of reversing death.

### Resurrection

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Touch | Melee | ritual (8 hours), material cost (2,000 coins)

*You perform an all-day ritual of immense spiritual power, calling a soul back from the realm of the dead. The body is restored and the spirit returns.*

**Weak.** A creature dead for up to one month returns to life with 1 HP. They gain 3 levels of fatigue, suffer two permanent injuries, and their highest attribute is reduced by one die size permanently. The body is restored even if damaged.
**Strong.** The target returns with HP equal to your Spell Power. They gain 2 levels of fatigue, suffer one permanent injury, and their highest attribute is reduced by one die size. Body is restored.
**Critical.** The target returns with HP equal to twice your Spell Power. They gain 1 level of fatigue, suffer one minor permanent injury, and their lowest attribute is reduced by one die size. Body is fully restored.

> **Design Note**: R5 capstone resurrection. Peak mortal power — reversing death at this scale carries enormous cost. No True Resurrection exists (exceeds mortal-scale magic).

### Mass Restoration

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Allies | Close | —

*You release a wave of overwhelming life energy, restoring all allies in the area.*

**Weak.** All allies in close range regain +6 HP. Remove one condition from each ally.
**Strong.** All allies regain +12 HP. Remove up to two conditions from each ally.
**Critical.** All allies regain +18 HP. Remove all conditions from each ally. One ally of your choice heals 1 wound.

> **Design Note**: R5 AoE healing capstone. Uses half single-target R5 scaling (+6/+12/+18 = half of +12/+24/+36).

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Vitality/Healing chain**: Restore Life (R0) → Rapid Vitality/Healing Touch (R1) → Aid/Healing Burst (R2) → Vitality Surge/Abundance of Life (R3) → Raise Dead (R4 proposed) → Mass Restoration/Resurrection (R5 proposed) — **complete R0-R5**
2. **Blessings chain**: Life Shield (R0) → Blessing of Life/Vitalizing Weapon (R1) → Hallow Ground (R2) → Circle of Renewal (R3 proposed) → *gap at R4-R5*
3. **Community chain**: *gap at R0* → Overflow of Life (R1) → Cleanse (R2) → Abundance of Life (R3) → *gap at R4-R5*
4. **Hope chain**: Verdant Blast (R0) → Beacon of Hope (R1 proposed) → *gap at R2-R5* — sparse after R1
5. **Fertility chain**: Nurturing Touch (R0 proposed) → *gap at R1-R5* — weakest chain, non-combat only

### Setup + Payoff Combos
- ✅ **Heal → Bless**: Healing Touch restores HP, then Blessing of Life enhances the healed ally's next action
- ✅ **Life Shield → Burst**: Temp HP from Life Shield absorbs damage; when broken, stored energy bursts
- ⚠️ **Resurrection chain**: Revivify (R3) → Raise Dead (R4) → Resurrection (R5) has clean escalation with increasing costs, but no R1-R2 death-prevention setup spell (e.g., a "death ward" equivalent)
- ❌ **Fertility → Community**: No mechanical connection between plant growth (Nurturing Touch) and communal healing effects

### Design Completeness Checklist
- ❌ R1 Quick Action: No reactive Quick Action spell proposed — **critical remaining gap**
- ⚠️ Defensive options: Life Shield (R0 temp HP) and Beacon of Hope (R1 proposed save bonus) provide indirect defense — no reactive damage mitigation
- [x] Utility: Nurturing Touch (R0 proposed), Detect Life (R2\*) — limited but appropriate for healing focus
- ⚠️ Damage across ranks: Verdant Blast (R0) is the only dedicated damage spell — very limited offense, appropriate for a Healing-excels school but R1+ has zero damage
- [x] Repeating conditions: Blessed (positive condition), dazed/stunned (life force overload)
- ⚠️ Setup+payoff: Heal→bless exists conceptually but lacks explicit mechanical triggers (healing doesn't grant a stated bonus to the next blessing)
- ⚠️ **Remaining gaps**: R1 Quick Action, Hope R2+, Fertility R1+, Community R0, Blessings R4+

### Impact & Trivialization Review
- **Nurturing Touch (R0 agriculture)**: Minimal risk — purely flavor/downtime cantrip for plant growth and animal care. No combat application, no game mechanic trivialized. Enriching soil and accelerating crop growth is a worldbuilding tool, not a gameplay bypass.
