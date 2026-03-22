# Death — Spell School Design Space

## School Identity

**Tradition**: Death (Mystic)
**Traits**: plagues, curses, fear, decay, ancestry
**Identity**: Natural ending and ancestral respect — accepting the necessity of endings and testing the worthy
**Role Spread**: Excels: Control | Decent: Offense, Utility | Weak: Healing, Support, Defense

### Mechanical Identity
- **Primary Conditions**: Poisoned, decayed (attribute reduction), cursed (ongoing penalties), frightened
- **Signature Gimmick**: Curse stacking and plague — multiple minor curses build toward major afflictions
- **Damage Types**: Necrotic, Poison, Acid

### Design Principles
1. Death is the mystic counterpart to Necromancy — focuses on curses/disease rather than undead
2. Fear effects provide battlefield control
3. Ancestral communion provides unique utility (speaking with the dead)
4. **Gaps**: No R1 Quick Action reactive spell, limited utility/non-combat, "plagues" and "curses" lack R0 representation
5. Damage is efficient but condition-focused — necrotic with ongoing effects

### Internal Synergies
- **Curse stacking**: Apply multiple minor curses → build toward major affliction
- **Poison → Decay**: Poison target → decay spells deal enhanced damage to poisoned creatures
- **Ancestry**: Commune with dead → gain knowledge/advantage

## Current Spell Inventory (15 spells)

| Rank | Count | Spells |
|------|-------|--------|
| 0 | 5 | Chill Touch, Decay, Enfeebling Touch, Glimpse of Mortality, Spared from Death |
| 1 | 6 | Blood Shards, Curse of Death, Early Grave, Necrotic Weapon, Rotting Grasp, Shivering Ray |
| 2 | 2 | Circle of Death, Cloud of Sickness |
| 3 | 2 | Death's Door, Grave's Bloom |
| 4–5 | 0 | — |

### Trait × Rank Coverage Matrix

| Trait | R0 | R1 | R2 | R3 | R4 | R5 |
|-------|-----|-----|-----|-----|-----|-----|
| plagues | Miasma | Festering Wound | Cloud of Sickness | Spreading Contagion | Pestilence | Plague Wind |
| curses | Minor Hex | Curse of Death | — | — | Greater Curse | — |
| fear | Glimpse of Mortality | Early Grave, Shivering Ray | — | Death's Door | — | — |
| decay | Decay, Chill Touch, Enfeebling Touch | Necrotic Weapon, Rotting Grasp, Blood Shards | Circle of Death | Grave's Bloom | — | Death's Dominion |
| ancestry | Spared from Death | Commune with Ancestors | Ancestral Guardian | — | Ancestral Judgment | Ancestral Convergence |

**Coverage** (existing + proposed): 22/30 slots filled (73%) — plagues and ancestry now complete R0-R5

**Remaining Gaps**:
- **Curses R2-R3, R5**: Minimal expansion beyond R1 — curse stacking needs more mid-rank tools
- **Fear R2, R4-R5**: Fear gaps at mid and high ranks
- **Decay R4**: No R4 decay spell

## Proposed New Spells

### Miasma

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Resist | Close | —

*You exhale a cloud of pestilent breath that sickens a nearby creature.*

**Weak.** The target is briefly poisoned (suffers +1 bane on all physical rolls until the end of their next turn).
**Strong.** As above, and the target takes +2 poison damage.
**Critical.** As above, and the target takes +4 poison damage.

> **Design Note**: R0 plagues cantrip. Core effect (briefly poisoned) is reliable on any success — SL adds damage, not escalating conditions.

### Minor Hex

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
0 | 0 | vs. Resist | Close | —

*You mutter a petty curse under your breath, bringing misfortune to a nearby creature.*

**Weak.** The target suffers +1 bane on their next roll (any type) before the end of their next turn.
**Strong.** As above, and if the cursed roll fails, the target takes +2 necrotic damage from the hex's backlash.
**Critical.** As above, and the necrotic backlash damage increases to +4.

> **Design Note**: R0 curses cantrip. Core effect (bane on next roll) is reliable on any success — SL adds damage consequence, not expanded scope.

### Death's Rebuke

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Attacker | Melee | quick

*When struck, you channel the cold touch of death back through the wound, punishing your attacker.*

**Effect.** As a Quick Action when targeted by an attack, gain +2 to your Dodge or Parry against the triggering attack. The attacker takes +2 necrotic damage as ancestral spirits lash out in your defense.

> **Design Note**: R1 Quick Action reactive defense. Standardized base (+2 Dodge/Parry) with Death's ancestral retribution as secondary effect. No SL scaling — one reliable defensive reaction.

### Commune with Ancestors

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | Medium TN | Self | ritual (10 minutes)

*You enter a meditative trance, reaching out to the spirits of the dead for guidance.*

**Weak.** You contact a vague ancestral presence. You can ask one yes/no question about a topic the dead would know about. The answer is correct but may be cryptic.
**Strong.** You contact a clearer presence. You can ask one open-ended question and receive a brief, helpful answer.
**Critical.** You contact a strong ancestral presence. You can ask two questions and receive clear, detailed answers. You also gain +1 boon on your next roll related to the information gained.

> **Design Note**: R1 utility spell — fills the ancestry R1+ gap. Ritual requirement prevents combat use. Information is helpful but limited — the GM controls how much is revealed, preventing it from bypassing investigation or exploration scenes.

### Festering Wound

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
1 | 2 | vs. Resist | Close | —

*You curse an open wound on a creature, causing it to fester and spread corruption through their body.*

**Weak.** The target is poisoned for a short duration (suffers +1 bane on all physical rolls). While poisoned this way, the target takes +2 poison damage at the start of each of their turns.
**Strong.** As above, and the ongoing damage increases to +4.
**Critical.** As above with +4 ongoing damage, and healing effects on the target are halved for the duration.

> **Design Note**: R1 plagues spell. Core effect (poisoned for short duration + ongoing damage) is reliable on any success — SL increases damage and adds healing suppression at Critical.

### Ancestral Guardian

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
2 | 4 | Self or ally | Close | enchant (short)

*You call upon an ancestral spirit to watch over and protect a creature, guiding their actions.*

**Weak.** One creature gains +1 boon on their next attack roll or skill check within a short duration. The guardian whispers guidance audible only to the target.
**Strong.** The target gains +1 boon on their next two rolls. The guardian also provides +1 boon on saves against fear and charm effects.
**Critical.** +1 boon on the next three rolls. Fear/charm save bonus. The guardian can also absorb the first 4 points of damage the target takes.

> **Design Note**: Fills R2 ancestry gap. Ancestral protection and guidance — a support spell that fits Death's communal ancestor theme. Limited boon charges prevent over-stacking.

### Spreading Contagion

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
3 | 6 | vs. Resist | Medium | —

*You curse a creature with a virulent disease that leaps to nearby creatures. The contagion spreads like wildfire through clustered enemies.*

**Weak.** The target is diseased for a short duration (poisoned + +1 bane on Fortitude rolls). At the end of each of the target's turns, one creature within melee range of them must save vs. Resist or contract the same disease.
**Strong.** As above, and diseased creatures take +4 poison damage at the start of each of their turns.
**Critical.** As above with +4 ongoing damage, and the disease spreads to up to two creatures within close range instead of one in melee range.

> **Design Note**: R3 plagues payoff. Core effect (disease that spreads) is reliable on any success — SL adds damage and expanded spread radius.

### Plague Wind

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | vs. Resist | Long | concentrate

*You unleash a devastating wind carrying every pestilence and plague known to the mortal world. The wind sweeps across the battlefield, infecting all who breathe it.*

**Weak.** All creatures in a long area are poisoned for a short duration and take +6 poison damage. Poisoned creatures have their healing received halved. The wind persists in the area for the duration — creatures entering the area must also save.
**Strong.** As above, and the poison damage increases to +12.
**Critical.** As above with +18 poison damage, and poisoned creatures also suffer +1 bane on all attribute rolls for the duration.

> **Design Note**: R5 plagues capstone — mass plague devastation. Core effect (AoE poison, short duration, healing suppression) is reliable on any success — SL adds damage and additional debuffs.

### Greater Curse

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Medium | —

*You speak a terrible curse that reaches into the target's very essence, eroding their fundamental capabilities.*

**Weak.** Choose one of the target's attributes (Strength, Agility, Spirit, or Mind). That attribute is reduced by one die size for a short duration. The curse is visible as dark marks spreading across the target's skin.
**Strong.** As above, and the target suffers +1 bane on all rolls using the cursed attribute.
**Critical.** As above, and the curse affects two attributes of your choice instead of one.

> **Design Note**: R4 curses capstone. Core effect (attribute reduction for short duration) is reliable on any success — SL adds secondary debuffs and expanded scope.

### Pestilence

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Medium | concentrate

*You call down a devastating plague upon an area, filling it with choking pestilence that rots flesh and weakens the body.*

**Weak.** All creatures in a medium area are poisoned for a short duration and take +5 poison damage. While poisoned, their healing received is halved. The pestilent area persists while you concentrate.
**Strong.** As above, and the poison damage increases to +10.
**Critical.** As above with +15 poison damage, and poisoned creatures suffer +1 bane on Strength and Agility rolls for the duration.

> **Design Note**: R4 plagues capstone. AoE plague at half damage scaling (+5/+10/+15 for R4 multi-target). Core effect (AoE poison + healing suppression) is reliable on any success.

### Ancestral Judgment

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
4 | 8 | vs. Resist | Medium | —

*You call upon the ancestors to judge a creature, channeling their collective wrath into a devastating spiritual assault. A host of spectral faces surrounds the target, screaming judgment.*

**Weak.** Deal +10 necrotic damage. The target is briefly dazed as the ancestral spirits overwhelm their senses. Against undead creatures, deal +14 necrotic damage instead.
**Strong.** Deal +20 necrotic damage (or +28 vs. undead). The target is briefly dazed.
**Critical.** Deal +30 necrotic damage (or +42 vs. undead). The target is dazed for a short duration.

> **Design Note**: R4 ancestry/offense capstone. Anti-undead specialist with bonus damage. Core condition (dazed) is reliable on any success — SL adds damage. Only at Critical does daze extend to short duration.

### Death's Dominion

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Very Hard TN | Self | concentrate

*You open yourself as a conduit to the realm of endings, becoming an avatar of death itself. Your body transforms — skin pale as bone, eyes burning with necrotic fire, an aura of decay spreading from you like a living shroud.*

**Weak.** For a short duration while you concentrate, you gain: immunity to necrotic and poison damage, +3 AV (spirit bonus), and your melee attacks deal +6 additional necrotic damage. Any creature that dies within close range of you rises as a Tier 2 undead under your control at the start of your next turn (maximum 3 risen undead at a time).
**Strong.** As above, and you gain resistance to physical damage for the duration.
**Critical.** As above, and risen undead gain +1 boon on all attack rolls while within close range of you.

> **Design Note**: R5 decay capstone — personal transformation into a death avatar. Core effect (transformation, immunities, risen undead) is reliable on any success. SL adds defensive bonuses and undead enhancement, not scaling undead tier.

### Ancestral Convergence

**Rank** | **Focus** | **Target** | **Range** | **Properties**
---|---|---|---|---
5 | 10 | Very Hard TN | Medium | concentrate, material cost (5,000 coins)

*You perform a solemn rite of convergence, inviting the honored dead to merge their power with the living. A host of ancestral spirits descends, each binding to an ally and granting them the strength and knowledge of the fallen.*

**Weak.** Choose up to 4 allies within medium range. Each gains the blessing of an ancestral spirit for a short duration: +2 to all attribute rolls, +2 AV (spirit bonus), and they can see invisible/ethereal creatures. Blessed allies glow with ghostly silver light.
**Strong.** As above, and each blessed ally can once during the duration make an attack using the ancestor's combat skill (+4 damage bonus, necrotic damage type).
**Critical.** As above, and each blessed ally gains resistance to necrotic damage for the duration. The ancestral spirits can communicate tactically, granting +1 boon on all attack rolls against enemies the spirits can identify as threats.

> **Design Note**: R5 ancestry capstone — empowering the living through ancestral communion, not summoning an army. The Death tradition honors ancestors who empower the worthy, distinct from Necromancy's forced servitude. Core effect (blessing 4 allies, short duration, attribute/AV bonus) is reliable on any success.

## Cross-School Spell Sharing

**No sharing recommended with Necromancy discipline.**

Despite both schools dealing with death and the dead, Death and Necromancy have fundamentally opposed philosophies that should produce mechanically distinct spells:
- **Death** (mystic): Reverential acceptance of endings — honoring ancestors, guiding the dead, channeling the natural death cycle respectfully
- **Necromancy** (arcane): Transgressive defilement and exploitation — puppeting corpses, siphoning life force, violating the natural order for personal gain

Even spells with similar concepts (e.g., raising the dead) should function differently: Death calls willing ancestral spirits to serve while Necromancy forcibly puppets corpses. Sharing spells between these schools would undermine their distinct identities.

## Synergy & Completeness Assessment

### Spell Progression Chains
1. **Plagues chain**: Miasma (R0) → Festering Wound (R1) → Cloud of Sickness (R2) → Spreading Contagion (R3) → Pestilence (R4) → Plague Wind (R5) — **complete R0-R5**
2. **Curses chain**: Minor Hex (R0) → Curse of Death (R1) → *gap at R2-R3* → Greater Curse (R4) → *gap at R5* — functional with mid-rank gap
3. **Fear chain**: Glimpse of Mortality (R0) → Early Grave/Shivering Ray (R1) → *gap at R2* → Death's Door (R3) → *gap at R4-R5* — mid-rank gaps
4. **Decay chain**: Decay/Chill Touch/Enfeebling Touch (R0) → Necrotic Weapon/Rotting Grasp/Blood Shards (R1) → Circle of Death (R2) → Grave's Bloom (R3) → *gap at R4* → Death's Dominion (R5) — near-complete
5. **Ancestry chain**: Spared from Death (R0) → Commune with Ancestors (R1) → Ancestral Guardian (R2) → *gap at R3* → Ancestral Judgment (R4) → Ancestral Convergence (R5) — near-complete, R3 gap only

### Setup + Payoff Combos
- ✅ **Poison → Decay → Plague**: Miasma (R0 poison) → Festering Wound (R1 enhanced vs. poisoned) → Spreading Contagion (R3 spreading disease) → Pestilence (R4 AoE plague) → Plague Wind (R5 mass devastation) — the complete plague escalation
- ✅ **Curse stacking**: Minor Hex (R0 bane) → Curse of Death (R1 ongoing penalty) → Greater Curse (R4 attribute drain) — curses compound to cripple targets
- ✅ **Ancestry chain**: Commune with Ancestors (R1 information) → Ancestral Guardian (R2 protection) → Ancestral Judgment (R4 offense) → Ancestral Convergence (R5 empowerment) — ancestors serve as advisors, protectors, judges, and empowerers of the living
- ✅ **Death mastery**: Death's Dominion (R5 avatar transformation) + Pestilence (R4 AoE plague) — kill with plague, raise the dead, unstoppable capstone combo
- ⚠️ **Fear → curse link**: No mechanic connecting the frightened condition to enhanced curse effectiveness

### Design Completeness Checklist
- [x] **R1 Quick Action**: Death's Rebuke — standardized reactive defense (+2 Dodge/Parry, necrotic damage secondary)
- [x] **3 spells per rank minimum**: Met at all ranks (R0: 7, R1: 9, R2: 3, R3: 3, R4: 3, R5: 3)
- [x] Defensive options: Death's Rebuke (R1 retaliatory), Spared from Death (R0 death-prevention), Ancestral Guardian (R2 protective spirit)
- [x] Utility: Commune with Ancestors (R1 divination), Ancestral Guardian (R2 guidance)
- [x] Damage across ranks: R0-R5 fully covered — Ancestral Judgment and Pestilence fill the critical R4 gap, Death's Dominion and Plague Wind provide R5 options
- [x] Repeating conditions: Poisoned, frightened, cursed (bane debuff), dazed, stunned — strong condition variety
- ✅ Setup+payoff: Poison → decay and curse stacking chains are strong and explicit; ancestry chain provides clear progression from utility to combat
- ⚠️ **Remaining gaps**: Curses R2-R3/R5, Fear R2/R4-R5, Decay R4

### Impact & Trivialization Review
- **Greater Curse (R4 attribute reduction)**: High risk — reducing an attribute by one die size is a powerful debuff. **Mitigations**: vs. Resist save, single target, medium duration (not permanent), only one attribute affected. At R4 this is appropriate power — it requires significant Focus investment and can be dispelled.
- **Pestilence (R4 AoE plague)**: Moderate risk — AoE poison + healing block is very strong in combat. **Mitigations**: concentration required, short area, damage at half single-target scaling (+5/+10/+15). The healing block is Death's signature but can be cleansed by Life tradition magic.
- **Ancestral Judgment (R4 anti-undead)**: Low risk — single-target damage with condition. Mirrors Light's Blinding Radiance with necrotic flavor. Daze/stun are standard R4 conditions.
- **Death's Dominion (R5 avatar)**: High risk — immunity to necrotic/poison + auto-raising undead is very powerful. **Mitigations**: concentration (can be broken), brief/short duration, risen undead are temporary and low-tier, R5 Focus cost (10). The transformation is dramatic but time-limited — not a permanent state.
- **Ancestral Convergence (R5 empowerment)**: Moderate risk — buffing up to 4 allies with +2 attribute rolls and +2 AV is a powerful party-wide enhancement. **Mitigations**: material cost (5,000 coins), concentration required, short duration, spirit bonus type (doesn't stack with other spirit bonuses). The empowerment approach is thematically distinct from Necromancy's forced servitude.
- **Commune with Ancestors (R1 spirit guidance)**: Moderate risk — information from the dead could shortcut investigation scenes. **Mitigations**: ritual (10 min) prevents combat use, answers are GM-mediated and can be cryptic, limited to what the dead would know, only 1-2 questions per casting.
