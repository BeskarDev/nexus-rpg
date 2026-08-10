# Chassis, Damage & Encounter Shape

Part of [designer-principles.md](../designer-principles.md); numbers are global and never renumbered.

Read before **workflow steps 1-3** (concept, base statistics, attacks). These decide whether the creature is the right size of problem.

**1. Stat chassis + ability menu.** The tier table provides the statistical foundation; abilities provide the tactical identity. Never let either carry the whole design.

**2. Abilities over HP bloat.** Durability comes from defensive abilities (damage reduction, condition immunity, regeneration), not inflated HP. Keeps fights snappy.

**3. Damage threads the needle.** Creature damage must threaten glass-cannon casters (16 HP, AV 2) without oppressing heavy-armor martials (20+ HP, AV 5–6). The linear +1 weapon damage per tier achieves this — don't break it.

**4. Bounded complexity.** A creature should be buildable in under 5 minutes with this framework and immediately understandable at the table.

**5. Adventurers don't heal on Wounds.** Unlike Elite/Lord creatures, adventurers stay at 0 HP when Wounded. Party healing is their survival mechanism; factor this into lethality.

**7. Ability output follows the spell scaling frameworks.** Damage/healing abilities beyond basic attacks use `docs/analysis/spells/SPELL_SYSTEM_ANALYSIS.md` §6 (damage per rank/tier, AoE = half single-target) and §16 (healing: single-target 1:1 with damage, Quick Action ½, AoE half; temp HP never stacks). A creature's ability output must stay consistent with what a same-tier caster could do. Spellcasting creatures: max spell rank = skill rank in Arcana/Mysticism, and every referenced spell must exist in the published spell lists — verify by grep, never import spells from other game systems.

**15. Every encounter has a Timer, a Threat and a Treat — and the Treat has five channels.** The Threat is the signature move; the Timer is usually a trigger or a recharging ability. The **Treat** is information the party can act on, and it need not be on the stat block at all: a **damage-type weakness** (free — no ability budget), the **structural cost of a signature move** (a costed attack means the creature that chases you hits softer), a **drawback**, a **terrain hook**, or **lore alone**. For ordinary creatures the last is correct and the others are wrong: a wolf has no damage weakness and should carry no drawback ability — inventing either produces a wolf that is wrong about wolves. Its pack behaviour goes in `lore.ecology` and `lore.tactics`, and **Morale is the mechanism the knowledge feeds**. A false mechanic is worse than no mechanic. *(Owner rulings, 2026-08-09, D-001, D-032.)*
