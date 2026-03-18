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
| vitality | Restore Life | Rapid Vitality, Healing Touch, Vital Surge | Aid, Healing Burst, Detect Life | Vitality Surge, Revivify | Greater Restoration | Resurrection |
| blessings | Life Shield | Blessing of Life, Vitalizing Weapon | Hallow Ground | Circle of Renewal | Life Ward | — |
| community | — | Overflow of Life | Cleanse | Abundance of Life | Raise Dead | Mass Restoration, Wellspring of Life |
| hope | Verdant Blast | Beacon of Hope | — | — | — | — |
| fertility | Nurturing Touch | — | — | — | — | — |

**Coverage** (existing + proposed): 19/30 slots filled (63%) — healing core fully represented, thematic breadth improved

**Remaining Gaps**:
- **Blessings R5**: No capstone blessing spell
- **Community R0**: No cantrip-level communal effect
- **Hope R2+**: Sparse after R1 — hope/inspiration theme needs expansion
- **Fertility R1+**: Only one spell — non-combat focus limits expansion

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

**Weak.** Up to 3 allies gain +1 boon on all saves against negative conditions (fear, charm, daze, etc.) for a short duration. Allies also gain +2 temporary HP.
**Strong.** As Weak. Temporary HP increases to +4. Allies also gain +1 boon on Morale checks for the duration.
**Critical.** As Weak. Temporary HP increases to +6. +1 boon on Morale. Any ally currently suffering the frightened condition can immediately re-save to end it.

> **Design Note**: Fills R1 hope gap. The boon scope (all saves for short duration) is fixed on any success — SL scales temporary HP and adds secondary benefits (Morale boon, fear re-save). Complements Blessing of Life (R1) by protecting against conditions rather than healing damage.

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

### Vital Surge

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Ally | Close | quick

*When an ally is struck, you instinctively channel a burst of life energy to close their wounds before the blood can flow.*

**Weak.** As a Quick Action when an ally within close range takes damage, immediately heal them for +2 HP.
**Strong.** Heal +4 HP. The ally gains +1 boon on their next Fortitude check this round.
**Critical.** Heal +6 HP. The ally gains +1 boon on their next Fortitude check and is immune to the bleeding condition until the end of their next turn.

> **Design Note**: Fills the R1 Quick Action gap. Emergency reactive healing that matches R1 single-target scaling (+2/+4/+6). Simple and reliable — the quintessential healer's reaction.

### Greater Restoration

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Touch | Melee | —

*You channel an overwhelming surge of life energy into a creature, mending what lesser magic cannot — knitting bones, purging toxins, and restoring what was broken.*

**Weak.** Cure all diseases and poisons affecting the target. End one of the following conditions: blinded, deafened, paralyzed, or stunned.
**Strong.** As Weak. Additionally, heal one wound the target has suffered.
**Critical.** As Strong. Additionally, end one permanent injury (lost limb regrows over the next week, scarred organ heals, etc.). The target regains HP equal to your Spell Power.

> **Design Note**: R4 major healing milestone between Revivify (R3 emergency resurrection) and Resurrection (R5 full restoration). Wound healing is rare and intentionally gated at R4+. Permanent injury removal at Critical only — keeps the gritty tone.

### Life Ward

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Ally | Close | enchant (medium)

*You weave a ward of golden life energy around a creature — an invisible cocoon that holds their soul to their body at the moment of greatest peril.*

**Weak.** For a medium duration, the first time the target would be reduced to 0 HP, they are instead reduced to 1 HP. The ward then ends.
**Strong.** As Weak. When the ward triggers, the target also regains HP equal to your Spell Power and is briefly immune to all damage.
**Critical.** As Strong. The ward triggers twice before ending (it can save the target from death on two separate occasions during the duration).

> **Design Note**: R4 death prevention — the "death ward" this tradition was missing. Fills the gap between Revivify (R3 post-death) and Resurrection (R5). Proactive rather than reactive — cast it before combat. Medium duration and single-trigger (except Critical) prevent it from trivializing death.

### Wellspring of Life

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Allies | Close | concentrate, enchant (short)

*You become a living conduit of overwhelming life energy — vitality radiates from you in visible golden waves, and every healing word you speak carries the weight of creation itself.*

**Weak.** For a short duration (concentrate), all healing spells you cast have their HP restoration increased by +4. Allies within close range regain +2 HP at the start of each of your turns.
**Strong.** Healing bonus increases to +8. Passive regeneration increases to +4 per turn. Allies within the aura gain resistance to poison and necrotic damage (reduce by 4).
**Critical.** Healing bonus increases to +12. Passive regeneration +4 per turn. Poison/necrotic resistance 6. The first time each turn an ally in the aura would gain a negative condition, that condition is suppressed for one round.

> **Design Note**: R5 healing amplification capstone. The ultimate healer fantasy — every heal is stronger, allies passively regenerate. Concentration limits other sustained spells. Complements Mass Restoration (R5 burst AoE heal) as the sustained healing alternative.

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
1. **Vitality/Healing chain**: Restore Life (R0) → Rapid Vitality/Healing Touch/Vital Surge (R1) → Aid/Healing Burst (R2) → Vitality Surge/Abundance of Life/Revivify (R3) → Greater Restoration/Raise Dead (R4) → Mass Restoration/Resurrection/Wellspring of Life (R5) — **complete R0-R5**
2. **Blessings chain**: Life Shield (R0) → Blessing of Life/Vitalizing Weapon (R1) → Hallow Ground (R2) → Circle of Renewal (R3) → Life Ward (R4) → *gap at R5* — near-complete
3. **Community chain**: *gap at R0* → Overflow of Life (R1) → Cleanse (R2) → Abundance of Life (R3) → Raise Dead (R4) → Mass Restoration/Wellspring of Life (R5) — near-complete, R0 gap only
4. **Hope chain**: Verdant Blast (R0) → Beacon of Hope (R1) → *gap at R2-R5* — sparse after R1
5. **Fertility chain**: Nurturing Touch (R0) → *gap at R1-R5* — weakest chain, non-combat only

### Setup + Payoff Combos
- ✅ **Heal → Bless**: Healing Touch restores HP, then Blessing of Life enhances the healed ally's next action
- ✅ **Life Shield → Burst**: Temp HP from Life Shield absorbs damage; when broken, stored energy bursts
- ✅ **Ward → Resurrect**: Life Ward (R4 death prevention) → Revivify (R3 post-death) → Raise Dead (R4 delayed) → Resurrection (R5) — full death-handling chain from proactive to reactive
- ✅ **Wellspring → Mass Heal**: Wellspring of Life (R5 healing amplification) → Mass Restoration or any healing spell — amplified healing output creates a clear capstone combo
- ⚠️ **Fertility → Community**: No mechanical connection between plant growth (Nurturing Touch) and communal healing effects

### Design Completeness Checklist
- [x] **R1 Quick Action**: Vital Surge — reactive healing when ally takes damage
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 4, R1: 7, R2: 6, R3: 4, R4: 3, R5: 3)
- [x] Defensive options: Life Shield (R0 temp HP), Beacon of Hope (R1 save bonus), Life Ward (R4 death prevention) — solid defensive coverage
- [x] Utility: Nurturing Touch (R0), Detect Life (R2), Greater Restoration (R4 condition/wound removal)
- ⚠️ Damage across ranks: Verdant Blast (R0) is the only dedicated damage spell — very limited offense, appropriate for a Healing-excels school
- [x] Repeating conditions: Blessed (positive condition), dazed/stunned (life force overload)
- ✅ Setup+payoff: Heal → bless, ward → resurrect, wellspring → mass heal chains are well-defined
- ⚠️ **Remaining gaps**: Blessings R5, Community R0, Hope R2+, Fertility R1+

### Impact & Trivialization Review
- **Greater Restoration (R4 wound healing)**: Moderate risk — wound healing bypasses the gritty injury system. **Mitigations**: R4 Focus cost (8), touch range, wound healing only at Strong+ success, permanent injury only at Critical. In a gritty system, this is appropriately rare and costly.
- **Life Ward (R4 death prevention)**: Moderate risk — negating death is powerful. **Mitigations**: single-trigger (twice at Critical only), medium duration requires pre-combat casting, ward ends after triggering. Cannot be stacked with multiple castings on the same target.
- **Wellspring of Life (R5 healing amplification)**: Moderate risk — doubled healing could make the party nearly unkillable. **Mitigations**: concentration required (breaks if caster takes damage or acts), R5 Focus cost (10), short duration. The amplification applies only to the caster's own healing spells, not all healing.
- **Nurturing Touch (R0 agriculture)**: Minimal risk — purely flavor/downtime cantrip for plant growth and animal care. No combat application, no game mechanic trivialized.
