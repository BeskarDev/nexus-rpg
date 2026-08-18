# Ammo — Enchantment Design Catalog

> **Status:** Design proposals pending owner approval. Nothing here is published. Current-state tables verified against `docs/04-equipment/07-magic-items/enchantments.md` on 2026-07-19.

## Category Identity

Enchanted ammo comes in individual pieces (up to 3 per item slot), destroyed on activation. It is the game's cheapest enchantment class (Q4 ≈ 150 coins per batch enchantment cost), which makes it the natural home for **one-shot tactical effects**: a single guaranteed-interesting arrow rather than a permanent capability.

- **Role focus:** Offense and Control, with limited Utility. Ammo stays combat-focused; non-combat effects belong on the wearable table.
- **Power yardstick:** One activation of a Q4 piece ≈ one weak-hit application of a rank 1 spell rider. The consumable nature justifies slightly stronger riders than a permanent weapon enchantment of the same quality.
- **Resource model:** The piece itself is the resource. Per-target caps (1/scene/target) only where stacking the same piece repeatedly on one enemy is the concern.

## Current Inventory (6 entries, d6)

| # | Name | Quality | Effect | Role |
|---|------|---------|--------|------|
| 1 | Burning | Q4/Q5/Q6 | Inflict burning (4/6/8) on hit | Offense |
| 2 | Draining | Q5 only | Briefly stun target, 1/scene/target | Control |
| 3 | Ensnaring | Q4/Q5/Q6 | Grapple Large or smaller; escape vs. 8/10/12 | Control |
| 4 | Shattering | Q4/Q5/Q6 | 4/6/8 blast + prone on strong/crit | Offense |
| 5 | Seeking | Q4/Q6 | Ignore range/cover, +1 boon; Q6 full cover | Support |
| 6 | Wounding | Q4/Q5/Q6 | Inflict bleeding (4/6/8), 1/scene/target | Offense |

### Audit Findings (2026-07-19 re-evaluation)

1. **Draining violates principle 16** — stunned (high-impact) rides a plain on-hit trigger with no roll gate beyond the attack itself. Redesigned below with the house pattern: the attack roll must also beat the target's Resist for the stun tier.
2. **Draining and Seeking have quality gaps** (Q5-only and Q4/Q6) — both scale to full Q4/Q5/Q6 below.
3. **Ensnaring's static escape TNs (8/10/12) are acceptable** — the difficulty is a property of the conjured vines (a static object), rolled by enemies against a one-shot restraint, not a recurring PC-facing save. Principle 9 targets recurring saves that decay with PC growth. No change, but the wording should state the vines crumble after a short duration so the restraint cannot become permanent.
4. **The old "Marker" proposal is superseded** — `marked (X)` is now an official condition (`docs/05-combat/04-conditions.md`). The bespoke glowing-brand text and its worldbuilding concerns are unnecessary; a marking enchantment now just inflicts the official condition.

## Proposed Catalog (10 entries, d100)

| d100 | Name | Quality | Effect | Role |
|------|------|---------|--------|------|
| 01–10 | Burning | Q4/Q5/Q6 | On a hit, inflict burning (4/6/8). *(unchanged)* | Offense |
| 11–20 | Draining | Q4/Q5/Q6 | On a hit, the target is briefly dazed. At Q5/Q6, if your attack roll also equals or beats the target's Resist, they are briefly stunned instead. You can only use this effect once per scene against any individual target. | Control |
| 21–30 | Ensnaring | Q4/Q5/Q6 | On a hit, magical vines grapple a Large or smaller target. Escape rolls are made vs. 8/10/12. The vines crumble after a short duration. | Control |
| 31–40 | Shattering | Q4/Q5/Q6 | On a hit, 4/6/8 blast damage (ignore AV) to the target and each creature in melee range of them. On a strong or critical hit, the target is also knocked prone. *(unchanged)* | Offense |
| 41–50 | Seeking | Q4/Q5/Q6 | Ignore any penalties from range or cover. At Q5, also gain +1 boon on the attack. At Q6, you can also target creatures behind full cover if a flight path exists and you are aware of their location. | Support |
| 51–60 | Wounding | Q4/Q5/Q6 | On a hit, inflict bleeding (4/6/8). Once per scene per target. *(unchanged)* | Offense |
| 61–70 | Frost | Q4/Q5/Q6 | On a hit, 4/6/8 frost damage and the target is briefly slowed. | Offense / Control |
| 71–80 | Shocking | Q4/Q5/Q6 | On a hit, 4/6/8 lightning damage. On a strong or critical hit, the lightning arcs to one other creature in melee range of the target, dealing half the damage to them. | Offense |
| 81–90 | Smoke | Q4/Q5/Q6 | On impact (hit or miss), the piece erupts into a smoke cloud with melee/close/short radius for a short duration. The smoke counts as an area of dim light. | Utility |
| 91–100 | Marking | Q4/Q5/Q6 | On a hit, inflict marked (4/6/8) on the target. | Support |
| — | Skyfall | Q7 only | The projectile arcs impossibly high and falls as a burning star. On a hit, the target takes 12 blast damage (ignore AV) and each other creature in close range of them takes half that damage. On a strong or critical hit, all damaged creatures are also knocked prone. | Offense |

> **d100 note:** Q7-only entries carry no d100 range yet — final allocation happens at implementation. A Q7 entry rolled for lower-quality treasure is re-rolled (the published incompatible-enchantment re-roll rule).

### Entry Design Notes

- **Draining (redesign).** Dazed is a moderate condition and acceptable on-hit (principle 16); the stunned tier requires the attack roll to beat Resist, which scales with the target instead of a static TN (principle 9). The 1/scene/target cap prevents stun-locking a boss with a full quiver.
- **Frost / Shocking.** Fill the elemental gap mirroring Burning's chassis. Slowed is low-impact and rides on-hit cleanly. The Shocking arc uses the chain/split pattern from the spell damage framework (primary full, secondary half).
- **Smoke.** Deliberately mirrors the field alchemy Smoke Bomb (Q3, close radius, dim light, short duration) one power step up: the magical version scales its radius by quality and works on impact even on a miss. Utility ammo the alchemy system cannot replicate above close radius.
- **Marking.** Uses the official marked (X) condition verbatim. Note principle 17: the attack that *delivers* the mark is fine; the mark pays out on the *next* attack against the target. X values track the other ammo damage riders (4/6/8).
- **Numbers rationale.** Ammo riders (4/6/8) sit one step above weapon riders (2/4/6) because each piece is consumed on use and costs coins per activation.

### Q7 Entry Notes

- **Skyfall (Q7)** — enchanted ammo is single-use and therefore scarce access: a Q7 piece may carry rank-5-adjacent one-shot power (two-track ruling, main analysis §3.7). Skyfall uses the R4–R5 area budget with the chain pattern (full primary, half splash). Destroyed on use like all enchanted ammo — each shot is a 5,000+ coin decision.
- **Q8**: no Q8 rows in this table. Q8 is the artifact tier — a legendary piece of ammo (such as the Heartseeker capstone) is built as a consumable relic via the [Q8 artifact framework](q8-artifacts.md).

## Open Questions for Owner

1. Smoke radius at Q6 (short) is battlefield-defining for 500 coins a batch at Q5 pricing. Cap at close radius for all tiers?
2. Should Marking's X track ammo numbers (4/6/8) or stay one step lower (2/4/6) since the boon is already strong?
3. Draining's Resist-gate wording ("attack roll equals or beats Resist") is a new house pattern for items — confirm it should become the standard gate for high-impact on-hit riders.
