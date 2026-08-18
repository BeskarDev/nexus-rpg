# Weapons — Enchantment Design Catalog

> **Status:** Design proposals pending owner approval. Nothing here is published. Current-state tables verified against `docs/04-equipment/07-magic-items/enchantments.md` on 2026-07-19.

## Category Identity

Weapon enchantments define what a martial character's signature item *does* in combat. The table stays **strictly combat-focused** — navigation boons, social effects, and other non-combat effects belong on the wearable table, which every item type can use instead of its own.

- **Role focus:** Offense first, with meaningful Control, Defense, and one Healing option. No Utility beyond weapon-form tricks (Morphing, Returning).
- **Power yardstick:** A Q4/Q5/Q6 elemental rider is +2/4/6 damage (ignore AV) behind a Quick Action activation — this is the established chassis (Flaming, Sacred, Defiled) and new elemental entries reuse it exactly.
- **Resource model:** Powerful offense is X/day (Booming, Sundering). Focus/HP recovery is 1/day always. Control riders are X/day and gated on strong/crit plus a Resist comparison.

## Current Inventory (12 entries, d12)

| # | Name | Quality | Effect | Role |
|---|------|---------|--------|------|
| 1 | Bloody | Q4/Q5/Q6 | Inflict/increase bleeding (2/4/6) on strong/crit | Offense |
| 2 | Booming | Q4/Q5/Q6 | Blast damage + push; 1/2/3× per day | Offense |
| 3 | Defiled | Q4/Q5/Q6 | QA activate: necrotic (2/4/6) ignore AV | Offense |
| 4 | Flaming | Q4/Q5/Q6 | QA activate: fire (2/4/6) ignore AV | Offense |
| 5 | Infused | Q4/Q5/Q6 | Regain 4/6/8 Focus, 1×/day | Support |
| 6 | Morphing | Q4 only | Transform between two weapon forms | Utility |
| 7 | Poisoner's | Q4/Q6 | +2/+4 poison damage or increased poison difficulty | Offense |
| 8 | Returning | Q4 only | Thrown property + recall as Quick Action | Utility |
| 9 | Sacred | Q4/Q5/Q6 | QA activate: radiant (2/4/6) ignore AV | Offense |
| 10 | Sentinel | Q4/Q5 | Glow near chosen creature type; Q5 +1 boon vs. type | Utility |
| 11 | Slaying | Q4/Q5/Q6 | +2/+4/+6 damage vs. chosen creature type | Offense |
| 12 | Sundering | Q4/Q5/Q6 | Ignore 1/2 AV; 1/2/3× per day | Offense |

### Audit Findings (2026-07-19 re-evaluation)

1. **Current inventory is healthy** — the 12 published entries pass the principle audit. The gap is breadth: no frost/lightning/acid, no Control, no Defense, no Healing (8 of 12 are Offense).
2. **The old "Vigilant" weapon proposal is cut.** Its "cannot be surprised while holding" flatly outclasses Danger Sense R2 (+2 Resist vs. surprise rolls) — a principle 20 violation the original analysis missed by calling the mechanics "different". Surprise protection now lives on the armor table as a Resist bonus in parity with the talent (see [armor.md](armor.md)).
3. **The old "Draining" weapon proposal is renamed Leeching.** "Draining" already names an ammo enchantment with a completely different effect. No name may appear on two tables with two meanings.
4. **Old Binding/Silencing proposals used static resist TNs (10/12)** — replaced with the attack-roll-vs-Resist gate (principle 9).
5. **Corrosive's old "reduce AV briefly" rider contradicted the acid identity rework** (`SPELL_SYSTEM_ANALYSIS.md` §15B): brief AV reduction is bookkeeping for no impact, and AV reduction proper starts at the payoff tier. Realigned below — the AV-reduction rider is Q6-only and lasts a short duration.

## Proposed Catalog (20 entries, d100)

Entries 01–60 are the current 12 (5% each, unchanged unless noted). New entries:

| d100 | Name | Quality | Effect | Role |
|------|------|---------|--------|------|
| 61–65 | Frosted | Q4/Q5/Q6 | While holding this weapon, you can use your Quick Action on your turn to sheathe it in frost for a short duration. While frosted, the weapon deals 2/4/6 frost damage (ignore AV) on a hit. On a strong or critical hit, the target is also briefly slowed. | Offense / Control |
| 66–70 | Shocking | Q4/Q5/Q6 | While holding this weapon, you can use your Quick Action on your turn to charge it with lightning for a short duration. While charged, the weapon deals 2/4/6 lightning damage (ignore AV) on a hit. On a critical hit, the lightning arcs to one other creature in melee range of the target, dealing half the weapon's total damage to them. | Offense |
| 71–75 | Corrosive | Q4/Q5/Q6 | While holding this weapon, you can use your Quick Action on your turn to coat it in seething acid for a short duration. While coated, the weapon deals 2/4/6 acid damage (ignore AV) on a hit. At Q6, on a critical hit, the target also suffers -2 AV for a short duration. | Offense |
| 76–80 | Binding | Q5/Q6 | On a strong or critical hit, if your attack roll also equals or beats the target's Resist, they are briefly slowed (Q5) or briefly restrained (Q6). You can use this ability once/twice per day. | Control |
| 81–85 | Silencing | Q5/Q6 | On a strong or critical hit, if your attack roll also equals or beats the target's Resist, they are briefly silenced. You can use this ability once/twice per day. | Control |
| 86–90 | Tripping | Q4/Q5/Q6 | On a strong or critical hit against a Large or smaller creature, you can knock the target prone. You can use this ability once/twice/thrice per day. | Control |
| 91–95 | Guardian's | Q4/Q5/Q6 | While holding this weapon, you gain +1/+1/+2 Parry (enhancement bonus). Once per day, when an ally in melee range of you is attacked, you can use Protect Ally without spending your Quick Action. | Defense / Support |
| 96–100 | Leeching | Q5/Q6 | On a hit, you regain 2/4 HP. You can use this ability once per day. | Healing |
| — | Avenger's | Q7 only | Attuning requires a night's vigil at a shrine of the weapon's god. While attuned and holding it: you and allies in close range gain +1 Resist (enhancement bonus), and the weapon deals +4 radiant damage against undead and spirits. Once per day, declare an oath of vengeance against one creature that damaged an ally since your last turn: your attacks against them deal maximum weapon damage until the end of your next turn. | Offense / Support |
| — | Soulharvest | Q7 only | This blade drinks the last breath of the slain. When you slay an enemy with this weapon, you regain 6 HP or 6 Focus (your choice). You can use this ability once between your turns. While any use of this ability is unspent, the blade whispers faintly (audible in melee range). | Offense / Support |

> **d100 note:** Q7-only entries carry no d100 range yet — final allocation happens at implementation. A Q7 entry rolled for lower-quality treasure is re-rolled.

### Q7 Scaling of Existing Entries

Existing enchantments extend to Q7 with a triggered rider on top of their Q6 step, never bigger passives. Proposed extensions:

| Enchantment | Q6 (published) | Q7 (proposed) |
|-------------|----------------|----------------|
| Flaming | 6 fire (ignore AV) on hit | Also: once per day, Action — cone of flame in close range, roll your attack vs. each creature's Dodge, 12 fire damage on a hit |
| Slaying | +6 damage vs. chosen type | Also: +1 boon on attack rolls vs. the type |

### Entry Design Notes

- **Frosted / Shocking / Corrosive** reuse the Flaming chassis verbatim (Quick Action activation, short duration, 2/4/6 ignore AV) so the elemental family stays symmetric. Each carries its element's identity rider: frost slows, lightning chains, acid degrades.
- **Corrosive** follows the §15B acid framework: no AV reduction below the top tier, and when it appears it lasts a short duration, not briefly. Against creatures AV reduction substitutes for Durability pressure, which creatures do not track.
- **Binding / Silencing** are Q5+ because hard control is inherently powerful, roll-gated per principles 9 and 16 (attack roll vs. Resist scales with the target forever, unlike a fixed TN). Restrained and silenced are official conditions.
- **Tripping** needs no Resist gate — prone is low-impact (principle 16 explicitly allows moderate conditions on strong/crit) and self-corrects (stand up for 1 Movement).
- **Guardian's** synergizes with Protective Stance without eclipsing it: the talent's R2 grants the free Protect Ally once *between turns*, the item once *per day*. Owner should confirm the stacking story reads cleanly (both effects are action-economy riders on the same base action).
- **Leeching** is the table's first Healing entry. Q5+ and 1/day keeps it below Second Wind R1 (4 HP 1/scene) in sustained value, per principle 20 parity.
- **Q7 escalations** of existing entries live in the "Q7 Scaling of Existing Entries" table below; Q8 artifacts in [q8-artifacts.md](q8-artifacts.md).

### Q7 Entry Notes

- **Avenger's** — the oath trigger enacts vengeance fiction (principle 10 applied positively): the payoff only unlocks when an ally was actually harmed. The vigil requirement is diegetic (principle 14).
- **Soulharvest** — resource-on-kill, which the scaling philosophy reserves for Q5+; at Q7 the once-between-turns cap prevents horde-farming loops, and the kill-rider says "slay" per principle 17 (Elite/Lord Wound refills are not "slain"). The whisper is its tell (principle 13: the wielder is audible when hunting).
- **Q8**: no Q8 rows in this table. Legendary weapons (Earthshaker capstone, Heartseeker capstone) are built as artifacts via the [Q8 artifact framework](q8-artifacts.md).

## Open Questions for Owner

1. Guardian's Parry progression (+1/+1/+2) mirrors the old proposal — flatten to +1/+2/+3 with the wearable "of Guarding" caps (max 10/12/14), or keep it modest since it stacks with a shield?
2. Tripping at 3×/day (Q6) on a reach weapon plus Polearm Mastery could be strong — cap at 2×/day flat?
3. Should Shocking's arc trigger on strong hits too at Q6 (matching the ammo version's strong/crit trigger), or stay crit-only for the permanent item?
4. Avenger's maximum-damage window (until end of next turn) can cover two attacks with action-economy talents — cap at "your next attack" instead?
