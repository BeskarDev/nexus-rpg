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

Framework: [synergy-framework.md](../../../../.claude/skills/spell-design/references/synergy-framework.md) — roles (setup / payoff / extender), the two axes, and the shared socket set.

Like Peace, Life is a support school whose "payoff" is usually measured in allies still standing — but Life has a real second engine: **overflowing vitality as a weapon** (life force overload, anti-undead radiance).

**Setup levers** — states Life emits: **stored vitality** (temp HP shields, standing blessings on allies waiting to trigger), **hallowed ground** (zones of consecrated life energy), and *blessed* allies whose next act is empowered. Against the undead, its very presence is a setup — radiant power primes them for destruction.

**Payoff levers** — Life spends stored vitality at the crisis point: the blessing triggers on the ally's decisive swing, the healing lands exactly when the tank would have dropped (turning an enemy's best turn into nothing), and overloaded life force bursts as damage against the undead and the living alike (Verdant Blast, Vitality Surge). Cold-cast deficit: Life's offense is capped below Offense-school curve by design — overload damage only competes when the target is undead or the zone is prepared.

**Extenders** — *prolong* through zones (Hallow Ground and healing fields keep vitality flowing every round), *refresh* with cheap repeated healing (Rapid Vitality topping up between blows), and *spread* through communal effects (Healing Burst, Aid touching the whole line at once).

**Solo engine** (multi-turn): T1 Hallow Ground under the party's line → T2 Aid / Blessing of Life on the frontline standing in it → T3 Healing Burst as the enemy wave breaks against allies who will not fall. Gated by Focus (healing is never free, principle 11), concentration on zones, and the one-Wound-heal-per-day rule that stops attrition from ever becoming trivial.

**Party interlock**: **emits** temp HP, condition removal (Cleanse), *blessed* boons, and standing ground that makes a position worth holding — endurance currency for whoever fights longest in melee. **wants** a frontline worth sustaining (its magic multiplies allies who are in harm's way, doing nothing for a party that hides) and undead-heavy foes where its damage engine wakes up. Cross-player line: the fighter holds the shrine door inside Hallow Ground, unkillable while the priest channels, and the horde breaks against one spear.

**Synergy gaps**: sustain setup and extenders are complete, but the **trigger-payoff design is unbuilt** — blessings mostly grant flat bonuses rather than firing at a defined moment (heal-then-strike, shield-break bursts exist only as ideas). The R3→R5 death-reversal ladder is now anchored at both ends (Healing Touch rituals low, Resurrection R5 high) but Revivify R3 / Raise Dead R4 remain unbuilt. Both are design targets.

**Synergy gap proposals** (sketches, post-framework — design fresh per current principles):
- **Surge of Renewal** (R2, payoff/trigger) — when you heal an ally, the overflow steels them: their next attack or roll before your next turn gains +1 boon and +2 radiant damage. The heal-then-strike trigger — cast on an unhurt ally it heals nothing and grants nothing.
- **Bursting Ward** (R2, payoff/trigger) — lay a vitality ward on an ally: when its temp HP breaks from enemy damage, it detonates as radiant light, damaging the attacker and briefly *dazing* them. The shield-break burst; enemies learn that breaking the priest's ward has a price.
- **Revivify** (R3, ladder rung) — the swift rite for the just-fallen: touch a creature dead only since your last turn, no ritual, heavy Focus and a costly consumed offering (~500 coins), they return at 1 HP with a Wound. Fresh-death-only keeps Resurrection's remains-and-moon rite meaningful above it. (Raise Dead R4 — dead up to days, ritual hours, ~1500 coins — completes the ladder.)

## Current Spell Inventory (17 published spells)

*Regenerated from `docs/07-magic` — published spells only. Proposed concepts live in the seed table below.*

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 3 | Life Shield, Restore Life, Verdant Blast |
| 1 | 5 | Blessing of Life, Healing Touch, Overflow of Life, Rapid Vitality, Vitalizing Weapon |
| 2 | 6 | Aid, Cleanse, Detect Life (incomplete), Hallow Ground, Hallowed Rest, Healing Burst |
| 3 | 2 | Abundance of Life, Vitality Surge |
| 4 | 0 | — |
| 5 | 1 | Resurrection |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| vitality | Restore Life | Rapid Vitality, Healing Touch, Vital Surge | Aid, Healing Burst, Detect Life | Vitality Surge, Revivify | Greater Restoration | Resurrection |
| blessings | Life Shield | Blessing of Life, Vitalizing Weapon | Hallow Ground | Circle of Renewal | Life Ward | Mantle of the Blessed |
| community | Kindred Bond | Overflow of Life | Cleanse | Abundance of Life | Raise Dead | Mass Restoration, Wellspring of Life |
| hope | Verdant Blast | Beacon of Hope | Courage of the Faithful | Rallying Cry | Undaunted | Triumph of the Living |
| fertility | Nurturing Touch | Bloom | Lifespring | Garden of Renewal | Verdant Surge | Genesis |

**Coverage**: all 30 trait×rank slots have at least a concept seed (published spell or proposed concept). Only published spells count as real coverage — see the inventory above; proposed entries are undesigned seeds (principle 19).


## Proposed New Spells

These are **conceptual placeholders only** — thematic seeds naming the gap each fills, the intended role, and a one-line concept. They are NOT designed spells (principle 19: earlier full drafts here predated the current design principles and were stale). When a batch is picked up for production, design each spell fresh through the spell-design skill against the current rank chassis, school synergy declaration, and designer principles.

| Concept | Rank | Seed |
|---|---|---|
| Nurturing Touch | 0 | You channel life energy into a plant, animal, or small creature, encouraging growth and vitality. (Fills the R0 fertility gap) |
| Beacon of Hope | 1 | You radiate an aura of hope and inspiration, bolstering the resolve of nearby allies. (Fills R1 hope gap) |
| Circle of Renewal | 3 | You consecrate the ground with life energy, creating a zone where vitality flows freely and blessings strengthen. (Fills R3 blessings gap) |
| Revivify | 3 | You pour life energy into a creature that has died within the last minute, pulling their soul back from the threshold of death. (R3 resurrection) |
| Raise Dead | 4 | Through an hour-long ritual of prayer and life channeling, you restore a creature that has been dead for up to one week. (R4 resurrection) |
| Mass Restoration | 5 | You release a wave of overwhelming life energy, restoring all allies in the area. (R5 AoE healing capstone) |
| Vital Surge | 1 | When an ally is struck, you instinctively channel a burst of life energy to close their wounds before the blood can flow. (R1 Quick Action reactive defense) |
| Greater Restoration | 4 | You channel an overwhelming surge of life energy into a creature, mending what lesser magic cannot — knitting bones, purging toxins, and restoring what was broken. (R4 major healing milestone between Revivify (R3 emergency resurrection) and Resurrection (R5 full restoration)) |
| Life Ward | 4 | You weave a ward of golden life energy around a creature — an invisible cocoon that holds their soul to their body at the moment of greatest peril. (R4 death prevention — the "death ward" this tradition was missing) |
| Wellspring of Life | 5 | You become a living conduit of overwhelming life energy — vitality radiates from you in visible golden waves, and every healing word you speak carries the weight of creation itself. (R5 healing amplification capstone) |
| Kindred Bond | 0 | You touch another creature and forge a brief spiritual bond — a thread of shared life energy that lets you sense their condition across distance. (Fills R0 community gap) |
| Mantle of the Blessed | 5 | You raise your hands and speak a blessing of absolute sanctity — golden light descends upon your allies like a mantle, and for a transcendent moment, each creature you bless radiates the full power of life itself. (Fills R5 blessings capstone) |
| Courage of the Faithful | 2 | You place your hand over an ally's heart, kindling a flame of divine courage that burns away fear and doubt. (Fills R2 hope gap) |
| Rallying Cry | 3 | You raise your voice in a cry that echoes with divine power — a sound of pure hope that reaches the hearts of all who fight beside you. (Fills R3 hope gap) |
| Undaunted | 4 | You weave an enchantment of unbreakable hope around an ally — their eyes blaze with inner fire, and no hardship can dim their resolve. (Fills R4 hope gap) |
| Triumph of the Living | 5 | You call upon the deepest wellspring of hope — the defiant belief that life endures, that dawn follows darkness. Golden light erupts from your heart, washing over your allies like a tidal wave of courage. (Fills R5 hope capstone) |
| Bloom | 1 | You press your palm to the earth and pour life energy into the soil. Flowers burst open, vines crawl, and greenery spreads in moments. (Fills R1 fertility gap) |
| Lifespring | 2 | You channel life energy into the earth, calling forth a spring of clean water and enriching the surrounding soil with vital energy. (Fills R2 fertility gap) |
| Garden of Renewal | 3 | Life energy erupts from the ground, transforming barren earth into a lush garden of healing plants and sheltering vines. The air fills with the scent of blossoms. (Fills R3 fertility gap) |
| Verdant Surge | 4 | You unleash a torrent of life energy that erupts from the earth in a wave of impossible growth — trees sprout from stone, vines burst from cracks, and the landscape transforms before your eyes. (Fills R4 fertility gap) |
| Genesis | 5 | You perform a ritual of primal creation, channeling overwhelming life energy through consecrated offerings into the earth. Life erupts in its purest form — the ground softens, springs emerge, and plants burst into bloom. (Fills R5 fertility capstone) |

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
