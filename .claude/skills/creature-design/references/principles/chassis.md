# Chassis, Damage & Encounter Shape

Part of [designer-principles.md](../designer-principles.md); numbers are global and never renumbered.

Read before **workflow steps 1-3** (concept, base statistics, attacks). These decide whether the creature is the right size of problem.

## In this file — How big a problem it is

| # | |
|---|---|
| **1** | Stat chassis + ability menu. |
| **2** | Abilities over HP bloat. |
| **3** | Damage threads the needle. |
| **5** | Adventurers don't heal on Wounds. |
| **7** | Ability output follows the spell scaling frameworks. |
| **38** | Use the tier adjustment. A creature that is all chassis has no physique. |
| **39** | Light or heavy armor is a decision about which weapons work, not just about a number. |
| **37** | A Large or bigger creature's long weapon carries `reach`, and that is what makes its second attack… |
| **40** | An armed humanoid closes the chassis gap with abilities, not with a bigger weapon. |
| **4** | Bounded complexity. |
| **15** | Every encounter has a Timer, a Threat and a Treat — and the Treat has five channels. |

**Numbers are global and never renumbered, so this file is ordered for reading rather than by date.** Full text below in the same order.

**1. Stat chassis + ability menu.** The tier table provides the statistical foundation; abilities provide the tactical identity. Never let either carry the whole design.

**2. Abilities over HP bloat.** Durability comes from defensive abilities (damage reduction, condition immunity, regeneration), not inflated HP. Keeps fights snappy.

**3. Damage threads the needle.** Creature damage must threaten glass-cannon casters (16 HP, AV 2) without oppressing heavy-armor martials (20+ HP, AV 5–6). The linear +1 weapon damage per tier achieves this — don't break it.

**5. Adventurers don't heal on Wounds.** Unlike Elite/Lord creatures, adventurers stay at 0 HP when Wounded. Party healing is their survival mechanism; factor this into lethality.

**7. Ability output follows the spell scaling frameworks.** Damage/healing abilities beyond basic attacks use `docs/analysis/spells/SPELL_SYSTEM_ANALYSIS.md` §6 (damage per rank/tier, AoE = half single-target) and §16 (healing: single-target 1:1 with damage, Quick Action ½, AoE half; temp HP never stacks). A creature's ability output must stay consistent with what a same-tier caster could do. Spellcasting creatures: max spell rank = skill rank in Arcana/Mysticism, and every referenced spell must exist in the published spell lists — verify by grep, never import spells from other game systems.

**38. Use the tier adjustment. A creature that is all chassis has no physique.** Step 2's rule — shift one
stat a tier up, pay for it by shifting another a tier down — is the main tool for making two creatures of
the same tier feel like different animals, and it is the one most likely to go unused because the chassis
already produces a *legal* creature.

**It is unused by default, so check for it explicitly** — three batches produced seventeen creatures and
not one adjustment ([case study](../case-studies.md#p38)).

**The pairs that carry identity**, each a sentence about the creature rather than a number:

| Trade | Says |
|---|---|
| Attribute up, **skill rank down** | Brutal physique, no technique. The ogre |
| Skill rank up, attribute down | Trained and slight. A duellist, an assassin |
| Magic skill up, **HP down** | The frail adept who out-casts their tier |
| HP up, Defense down | A slab that is easy to hit and hard to drop |
| Defense up, HP down | Evasive and fragile |

**Ask it once per creature, at step 2:** *what is this creature better at than its tier, and what does it
give up for that?* If the answer is "nothing", the creature is a baseline — which is a legitimate answer
for a professional soldier and a poor one for a monster.

**The balance rule is unchanged**: one pair, both directions, and the overall challenge stays at the
intended tier. *(Owner review, 2026-08-11, D-097.)*

**39. Light or heavy armor is a decision about which weapons work, not just about a number.** The AV
figure is the smaller half of the choice. The published `slash` property reads: *"On a hit against an
enemy in light or no armor, add your weapon damage an additional time to the total damage."* So a
**heavy**-armored creature is immune to the slash bonus, and swords, axes and scimitars lose roughly a
third of their damage against it, while crush and pierce are unaffected.

**Ask it explicitly at step 2, and write the answer down:** *should blades work well on this creature?*

| Answer | Armor | Reads as |
|---|---|---|
| Yes, it is meat | **light** | hide, muscle, a dried corpse, an ogre |
| No, it turns an edge | **heavy** | fired clay, chitin, bone plate, scale, stone |

**The edge cases are worth arguing rather than defaulting.** A young crocodile sits exactly on the line:
hide not yet thick enough to count, or already thick enough. Either is defensible, and the point is that
the choice is made deliberately. **It pairs with damage weaknesses** — the Clay Servant is heavy armor
*and* weak to `blast`, so the answer is a different weapon rather than a better sword.

**Do not use heavy armor to buy survivability.** If the creature is meant to be durable, that is HP or
the tier adjustment. Heavy is for creatures whose surface genuinely turns an edge. *(Owner ruling,
2026-08-11, D-099.)*

**37. A Large or bigger creature's long weapon carries `reach`, and that is what makes its second attack
matter.** Size belongs in the attack properties, not only in the Defense shift. A giant swinging a tree
or a great club is hitting people a band further out than a person can, so the weapon takes `reach`.

The published property does the design work for free: *"You can attack enemies at close range. While any
enemy is within melee range of you, you suffer +1 bane on the attack."* So the big weapon is the good
option at a distance and **the bad option once somebody is inside it**, and the creature's other attack
— a fist, a bite, a stomp — becomes the answer to being closed on rather than a duller copy of the first.

**It also writes the encounter's Treat.** "Get inside the club" is a tactic a party can find, execute
and feel clever about, and it costs the creature real damage without any bespoke rule.

Worked example, the Ogre: [../case-studies.md](../case-studies.md#p37).

**Do not hand `reach` to a Medium creature's ordinary weapon** to imitate this. Spears and glaives carry
it from the catalogue because of what they are. This principle is about **size**, and it starts at Large.
*(Owner ruling, 2026-08-11, D-095.)*

**40. An armed humanoid closes the chassis gap with abilities, not with a bigger weapon.** The tier's
weapon-damage figure is the creature's **total capability**, not what its weapon prints. Carried gear
rises one Quality every two tiers (D-091) while the chassis figure rises every tier, so an armed creature
is level at tier 2, one behind at tier 3 and **six behind at tier 10**.

**That gap is correct, and it is filled the same way a player fills it.** A level-7 adventurer is not
dangerous because of their spear — they are dangerous because of talents and combat arts. A high-tier
armed humanoid gets **more and better abilities**, and the gear stays honest catalogue gear.

| Tier | Chassis figure | Best carried weapon | Filled by |
|---|---|---|---|
| 2 | 4 | two-handed Q2 = 4 | nothing needed |
| 3 | 5 | two-handed Q2 = 4 | one ability |
| 7 | 9 | two-handed Q4 = 5 | several, and they carry the fight |
| 10 | 12 | two-handed Q5 = 6 | the creature is its abilities |

**Two things this predicts, and both are useful checks.** A plain armed humanoid above about tier 6 is a
design smell — the roster's upper tiers should be dragons, spirits, giants and the like. And when a
high-tier humanoid *is* wanted, a warlord or a hierophant, the design work goes into their kit rather
than into finding them a bigger sword.

**Natural weapons are outside all of this** and take the chassis figure directly, which is why a giant's
club out-damages a soldier's glaive at the same tier. *(Owner ruling, 2026-08-11, D-100.)*

**4. Bounded complexity.** A creature should be buildable in under 5 minutes with this framework and immediately understandable at the table.

**15. Every encounter has a Timer, a Threat and a Treat — and the Treat has five channels.** The Threat is the signature move; the Timer is usually a trigger or a recharging ability. The **Treat** is information the party can act on, and it need not be on the stat block at all: a **damage-type weakness** (free — no ability budget), the **structural cost of a signature move** (a costed attack means the creature that chases you hits softer), a **drawback**, a **terrain hook**, or **lore alone**. For ordinary creatures the last is correct and the others are wrong: a wolf has no damage weakness and should carry no drawback ability — inventing either produces a wolf that is wrong about wolves. Its pack behaviour goes in `lore.ecology` and `lore.tactics`, and **Morale is the mechanism the knowledge feeds**. A false mechanic is worse than no mechanic. *(Owner rulings, 2026-08-09, D-001, D-032.)*
