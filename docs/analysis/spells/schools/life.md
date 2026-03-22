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
| blessings | Life Shield | Blessing of Life, Vitalizing Weapon | Hallow Ground | Circle of Renewal | Life Ward | Mantle of the Blessed |
| community | Kindred Bond | Overflow of Life | Cleanse | Abundance of Life | Raise Dead | Mass Restoration, Wellspring of Life |
| hope | Verdant Blast | Beacon of Hope | Courage of the Faithful | Rallying Cry | Undaunted | Triumph of the Living |
| fertility | Nurturing Touch | Bloom | Lifespring | Garden of Renewal | Verdant Surge | Genesis |

**Coverage** (existing + proposed): 30/30 slots filled (100%) — all traits fully represented across all ranks

**Remaining Gaps**: No remaining gaps — 100% coverage

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
5 | 10 | Touch | Melee | ritual (8 hours), material cost (5,000 coins)

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

**Effect.** As a Quick Action when targeted by an attack, gain +2 to your Dodge or Parry against the triggering attack. You also heal +2 HP from the surge of vital energy.

> **Design Note**: R1 Quick Action reactive defense. Standardized base (+2 Dodge/Parry) with Life's vital healing as secondary effect. No SL scaling — one reliable defensive reaction.

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

### Kindred Bond

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | Willing creature | Touch | enchant (short)

*You touch another creature and forge a brief spiritual bond — a thread of shared life energy that lets you sense their condition across distance.*

**Weak.** For a short duration, you can sense the target's general condition: alive or dead, healthy or wounded, calm or distressed. You know their direction if they are within medium range.
**Strong.** As Weak. Range extends to long. You can also sense specific conditions affecting them (poisoned, frightened, etc.).
**Critical.** As Strong. Range extends to very long. You can send a brief empathic impression (a single emotion or simple concept like "danger" or "come here") once during the duration.

> **Design Note**: Fills R0 community gap. A communal utility cantrip — you form a bond with another creature and share awareness. Core effect (sense condition and direction, short duration) is fixed on any success. SL extends range and adds condition sensing / simple communication. No combat application — exploration and coordination cantrip.

### Mantle of the Blessed

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Allies | Close | enchant (short)

*You raise your hands and speak a blessing of absolute sanctity — golden light descends upon your allies like a mantle, and for a transcendent moment, each creature you bless radiates the full power of life itself.*

**Weak.** All allies in close range gain +6 temporary HP, resistance to necrotic and poison damage (reduce by 4), and +1 boon on all saves for a short duration. When an ally's temporary HP from this spell is depleted, it releases a burst of radiant energy dealing +3 radiant damage to all enemies in melee range of that ally.
**Strong.** Temporary HP increases to +12. Damage resistance increases to 6. The radiant burst deals +6 damage.
**Critical.** Temporary HP increases to +18. Damage resistance increases to 8. The radiant burst deals +9 damage. Each ally also gains +1 boon on all attack rolls for the duration.

> **Design Note**: Fills R5 blessings capstone. The definitive blessing spell — massive party buff with the Life Shield "burst on break" synergy elevated to capstone scale. Core effects (temp HP, damage resistance, save boon) are fixed on any success. SL scales temp HP, resistance values, and burst damage. The radiant burst payoff rewards the Life Shield → Burst setup established at R0. Temp HP uses AoE half-scaling (+6/+12/+18). Distinct from Wellspring (sustained healing boost) and Mass Restoration (burst healing).

### Courage of the Faithful

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Ally | Close | enchant (short)

*You place your hand over an ally's heart, kindling a flame of divine courage that burns away fear and doubt.*

**Weak.** For a short duration, the target is immune to the frightened condition and gains +1 boon on Morale checks. They gain +3 temporary HP.
**Strong.** As Weak. Temporary HP increases to +6. If the target is currently frightened, that condition ends immediately.
**Critical.** As Weak. Temporary HP increases to +9. End frightened. The target also gains +1 boon on their next attack roll or skill check.

> **Design Note**: Fills R2 hope gap. Core effect (fear immunity, Morale boon, short duration) is fixed on any success. SL scales temp HP and adds secondary benefits (ending existing fear, attack boon). Upgrades Beacon of Hope (R1 group fear resistance) to single-target fear immunity.

### Rallying Cry

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Allies | Close | —

*You raise your voice in a cry that echoes with divine power — a sound of pure hope that reaches the hearts of all who fight beside you.*

**Weak.** All allies in close range gain +4 temporary HP and are immune to the frightened condition for a short duration. Allies currently suffering the frightened condition can immediately re-save to end it.
**Strong.** Temporary HP increases to +8. Allies also gain +1 boon on all Morale checks for the duration.
**Critical.** Temporary HP increases to +12. +1 boon on Morale. Each ally also regains +4 HP from the surge of hope.

> **Design Note**: Fills R3 hope gap. AoE morale spell — core effects (fear immunity, frightened re-save) are reliable on any success. SL scales temp HP and adds healing / Morale boon. Temp HP uses AoE half-scaling at R3 (+4/+8/+12).

### Undaunted

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Ally | Close | enchant (short)

*You weave an enchantment of unbreakable hope around an ally — their eyes blaze with inner fire, and no hardship can dim their resolve.*

**Weak.** For a short duration, the target is immune to the frightened, dazed, and stunned conditions. They gain +2 to Resist against all mental effects. If the target would fail a Morale check, they succeed instead.
**Strong.** As Weak. The target also gains +5 temporary HP and +1 boon on all attack rolls for the duration.
**Critical.** As Weak. Temporary HP increases to +10. +1 boon on all attack rolls. Once during the duration, when the target fails any roll, they may choose to succeed with a Weak success instead.

> **Design Note**: Fills R4 hope gap. Powerful single-target inspiration. Core effect (triple condition immunity, Resist bonus, auto-pass Morale) is fixed. SL adds temp HP, attack boon, and a dramatic "success from failure" at Critical. Distinct from Life Ward (R4 death prevention) — Undaunted prevents conditions and inspires action rather than preventing death.

### Triumph of the Living

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Allies | Close | enchant (short)

*You call upon the deepest wellspring of hope — the defiant belief that life endures, that dawn follows darkness. Golden light erupts from your heart, washing over your allies like a tidal wave of courage.*

**Weak.** All allies in close range gain +6 temporary HP, immunity to frightened, dazed, and stunned conditions, and +1 boon on all attack rolls and skill checks for a short duration. Allies currently suffering any of those conditions are immediately freed.
**Strong.** Temporary HP increases to +12. Allies also gain +2 to Resist against all negative effects. Each ally regains +6 HP.
**Critical.** Temporary HP increases to +18. +2 Resist. Each ally regains +12 HP. Once during the duration, each ally who would be reduced to 0 HP is instead reduced to 1 HP.

> **Design Note**: Fills R5 hope capstone. The ultimate morale/inspiration spell. Core effects (triple condition immunity, attack/skill boon, condition removal) are fixed on any success. SL scales temp HP, adds healing and Resist bonus. The Critical death prevention (once per ally) is appropriate for R5 but limited by the short duration and single use. Complements Mass Restoration (R5 burst healing) and Wellspring of Life (R5 sustained healing) as the proactive defensive capstone.

### Bloom

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Area | Close | —

*You press your palm to the earth and pour life energy into the soil. Flowers burst open, vines crawl, and greenery spreads in moments.*

**Weak.** Cause rapid plant growth in a close area. Wild plants grow to full maturity in moments. The growth produces enough edible plants to feed 2 people for a day and creates light undergrowth (difficult terrain for enemies) in the area for a short duration.
**Strong.** Feed 4 people. The undergrowth thickens, providing partial cover to allies within it.
**Critical.** Feed 6 people. Dense undergrowth provides full cover and difficult terrain. Medicinal herbs grow among the plants, usable as a Nature healing kit component.

> **Design Note**: Fills R1 fertility gap. Dual-use: food creation (downtime/exploration) and battlefield terrain modification (combat). Core effect (plant growth, food OR difficult terrain) is fixed on any success — SL scales output and adds cover / medicinal benefits. Bridges Nurturing Touch (R0 individual plant) to area-scale growth.

### Lifespring

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Area | Close | ritual (10 minutes)

*You channel life energy into the earth, calling forth a spring of clean water and enriching the surrounding soil with vital energy.*

**Weak.** Create a small spring of clean, fresh water that flows for a medium duration. The spring produces enough water for 6 people per hour. Soil within close range becomes enriched — plants grown here over the next season yield double their normal harvest.
**Strong.** Spring produces enough for 12 people per hour. Soil enrichment lasts two seasons. Water has minor restorative properties — drinking it removes 1 level of fatigue after a short rest.
**Critical.** Spring produces enough for 20 people per hour. Soil enrichment is permanent (one-time). Water restores 2 levels of fatigue after a short rest and grants +1 boon on saves against disease for a day.

> **Design Note**: Fills R2 fertility gap. Pure utility — water/food creation and agricultural enrichment. Ritual casting (10 min) prevents combat use. The "double harvest" effect rewards downtime play. Fatigue removal on Strong+ adds mechanical value for adventurers without being overpowered (requires a short rest).

### Garden of Renewal

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | Area | Close | concentrate, enchant (short)

*Life energy erupts from the ground, transforming barren earth into a lush garden of healing plants and sheltering vines. The air fills with the scent of blossoms.*

**Weak.** Create a garden in a close area for a short duration. Allies who start their turn in the garden regain +2 HP from the ambient life energy. The garden provides partial cover to all creatures within it.
**Strong.** Healing increases to +4 per turn. The garden also produces soothing pollen — allies within it gain +1 boon on saves against poison and disease.
**Critical.** Healing +4 per turn. Poison/disease save boon. Entangling vines slow enemies — hostile creatures treat the area as difficult terrain and suffer +1 bane on Dodge checks.

> **Design Note**: Fills R3 fertility gap. Healing zone with terrain control — a distinct alternative to Circle of Renewal (R3 blessings, which grants necrotic/poison resistance). Garden of Renewal focuses on physical healing and terrain manipulation rather than condition resistance. Concentration prevents stacking with Circle of Renewal.

### Verdant Surge

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | Area | Medium | —

*You unleash a torrent of life energy that erupts from the earth in a wave of impossible growth — trees sprout from stone, vines burst from cracks, and the landscape transforms before your eyes.*

**Weak.** Cause massive plant growth in a medium area. The growth creates walls of vegetation (up to 3 sections of living wall, each blocking line of sight and requiring a Strength + Athletics check vs. TN 10 to break through). Allies in the area gain partial cover. The vegetation persists for a medium duration.
**Strong.** As Weak. The vegetation walls heal themselves, requiring two successful Strength checks to break. Rare medicinal plants grow within the area — harvesting them produces 3 doses of healing herbs (each heals +4 HP when applied during a short rest).
**Critical.** As Strong. 5 wall sections instead of 3. Medicinal herbs produce 5 doses. One rare alchemical component (worth up to 200 coins) grows among the plants.

> **Design Note**: Fills R4 fertility gap. Battlefield reshaping through explosive plant growth. Core effect (vegetation walls, cover, medium duration) is fixed — SL adds durability, medicinal rewards, and alchemical components. Distinct from Life Ward (R4 death prevention) and Greater Restoration (R4 healing) — this is environmental utility.

### Genesis

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Area | Short | ritual (1 hour), material cost (5,000 coins)

*You perform a ritual of primal creation, channeling overwhelming life energy through consecrated offerings into the earth. Life erupts in its purest form — the ground softens, springs emerge, and plants burst into bloom.*

**Weak.** Transform a short area of barren, dead, or corrupted land into fertile, living terrain. The transformation is permanent. The area produces clean water, edible plants, and natural shelter sufficient to sustain a community of up to 20 people indefinitely. Magical corruption (curses, necrotic taint, blighted land) is cleansed.
**Strong.** As Weak. The area sustains up to 50 people. Crops grown here produce exceptional yields (triple normal), and creatures resting in the area for a full night recover 1 additional wound.
**Critical.** As Weak. Sustains up to 100 people. Triple crop yields and wound healing as Strong. Additionally, a guardian spirit (Tier 2 plant creature) manifests to protect the area for one year.

> **Design Note**: Fills R5 fertility capstone. The ultimate creation spell — permanent terrain transformation. Material cost (5,000 coins) matches R5 guidelines. This is the "life" counterpart to Resurrection (R5 vitality) and Mass Restoration (R5 community) — it creates life rather than restoring it. Primarily a campaign/downtime spell that transforms the game world.

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
- [x] **All gaps filled**: 30/30 coverage — every trait×rank slot occupied

### Impact & Trivialization Review
- **Greater Restoration (R4 wound healing)**: Moderate risk — wound healing bypasses the gritty injury system. **Mitigations**: R4 Focus cost (8), touch range, wound healing only at Strong+ success, permanent injury only at Critical. In a gritty system, this is appropriately rare and costly.
- **Life Ward (R4 death prevention)**: Moderate risk — negating death is powerful. **Mitigations**: single-trigger (twice at Critical only), medium duration requires pre-combat casting, ward ends after triggering. Cannot be stacked with multiple castings on the same target.
- **Wellspring of Life (R5 healing amplification)**: Moderate risk — doubled healing could make the party nearly unkillable. **Mitigations**: concentration required (breaks if caster takes damage or acts), R5 Focus cost (10), short duration. The amplification applies only to the caster's own healing spells, not all healing.
- **Nurturing Touch (R0 agriculture)**: Minimal risk — purely flavor/downtime cantrip for plant growth and animal care. No combat application, no game mechanic trivialized.
