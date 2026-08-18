# Shields — Enchantment Design Catalog

> **Status:** Design proposals pending owner approval. Nothing here is published. Shields currently share the armor table in `docs/04-equipment/07-magic-items/enchantments.md` (verified 2026-07-19); this catalog assumes the proposed split.

## Category Identity

Shields are the active half of defense — held, angled, slammed, and interposed. Where armor absorbs, shields *act*.

- **Shield → active and reactive defense.** Blocking, ally protection, retaliation, shield-bash offense.
- **Role focus:** Defense and Support, with a Control/Offense splash (bashing). The only enchantment table with an ally-protection identity.
- **Resource model:** Defensive reactions are 1/scene. Ally-cover abilities are X/day. The single immunity effect is Q6-only, triggered, 1/day.
- **Rules hook:** Shields are treated as both weapon and armor for quality bonuses, and the Guard combat option (defend with Parry against ranged attacks) plus Protect Ally are the base actions shield enchantments build on.

## Current Inventory

Shields have no own table. From the shared table, **Anchoring** migrates here (retaliation is active defense); the other five entries stay armor-flavored.

### Audit Findings (2026-07-19 re-evaluation)

1. **Anchoring moves to 1/scene** — it is a defensive reaction (anti-push/prone), and the resource guidance says defensive reactions are per-scene, not per-day.
2. **Old "Reflecting" wording ("on successful Resist vs. spell") described a roll defenders don't make** (principle 15: attackers roll against static Defenses). Rewritten to trigger on the attacker's miss.
3. **Old "Sentinel's" name collides with the Sentinel weapon enchantment** — renamed **Bulwark**.
4. **Old "Blocking" referenced mechanics Shield Mastery doesn't have** ("damage reduction or Defense bonus"). Shield Mastery R1 actually reduces the attack's SL by one step via Quick Action. Redesigned onto the real talent.
5. **Old "Rallying" granted "+1/+2 to next attack"** — non-house wording. Boons are the currency; rewritten.

## Proposed Catalog (10 entries, d100)

| d100 | Name | Quality | Effect | Role |
|------|------|---------|--------|------|
| 01–10 | Anchoring | Q4/Q5/Q6 | When you would be pushed or knocked prone, you can ignore that effect. If a creature in melee range attempted it, they also take 2/4/6 damage (ignore AV). Once per scene. | Defense |
| 11–20 | Covering | Q4/Q5/Q6 | Quick Action: extend your shield's AV bonus to one ally in melee range until the start of your next turn. Once/twice/thrice per day. | Support |
| 21–30 | Reflecting | Q5/Q6 | When an enemy's spell targeting your Resist fails against you, they take 4/6 damage (ignore AV). Once/twice per day. | Defense |
| 31–40 | Retaliating | Q4/Q5/Q6 | When an enemy in melee range hits you with a melee attack, they take 1/2/3 damage. Once between your turns. | Defense / Offense |
| 41–50 | Shielding | Q6 only | When you take damage of a type chosen at creation, you can ignore that instance of damage and any of its riders. Once per day. | Defense |
| 51–60 | Rallying | Q5/Q6 | When you suffer a Wound, each ally in close range gains +1 boon on their next attack roll (Q6: their next two attack rolls). Once per scene. | Support |
| 61–70 | Warding | Q4/Q5/Q6 | You gain +1/+2/+3 Resist (enhancement bonus, max. 10/12/14) while wielding this shield. | Defense |
| 71–80 | Bashing | Q4/Q5/Q6 | On a strong or critical hit with this shield, the target is briefly dazed. At Q5, you can also push them a close distance. At Q6, if your attack roll also equals or beats the target's Resist, they are knocked prone as well. | Offense / Control |
| 81–90 | Bulwark | Q4/Q6 | Allies in melee range of you gain +1 AV (enhancement bonus). At Q6, this extends to allies in close range. | Support |
| 91–100 | Blocking | Q4/Q5/Q6 | When you use a Quick Action to reduce an attack's SL (such as with the Shield Mastery talent), you can reduce it by one additional step. Once/twice/thrice per day. Any required Durability check for your shield is made only once. | Defense |
| — | Sentient | Q7 only | This shield holds a bound guardian-spirit with limited awareness. Once per scene, when an attack hits you, the shield blocks on its own: reduce the attack's SL by one step (min. failure) without spending a Quick Action. Once per day, when a ranged attack targets an ally in close range, the shield flies to intercept: the ally gains the shield's full AV against that attack, then it returns to your arm. | Defense |
| — | Wall of the Legion | Q7 only | Once per scene, Quick Action — plant the shield: until the start of your next turn, you and each ally in melee range of you gain +2 AV (situational bonus) and cannot be pushed or knocked prone. While planted, you cannot move. | Defense / Support |

> **d100 note:** Q7-only entries carry no d100 range yet — final allocation happens at implementation. A Q7 entry rolled for lower-quality treasure is re-rolled.

### Entry Design Notes

- **Reflecting** — the trigger is now the attacker's own failed roll against your Resist, which is a roll that actually happens at every table (principle 15). Damage numbers follow the reactive-rider scale, not spell-damage scale.
- **Shielding** — the category's only immunity: Q6-only, triggered, 1/day, one instance. Satisfies the immunity doctrine and principle 13 (limited, visible, once).
- **Retaliating** — capped once between turns so a surrounded shield-bearer is not a free damage aura; passive thorns stay below the Q-tier damage riders.
- **Rallying** — Wound-triggered so it cannot be farmed; converts the party's worst moment into momentum. Boon phrasing per house currency.
- **Warding** — mirrors the wearable "of Willpower" numbers and caps exactly (max. 10/12/14) so the two never leapfrog; stacking rule (highest same-effect applies) already governs wearing both.
- **Blocking** — piggybacks on the real Shield Mastery mechanic (SL reduction). Without the talent it does nothing, which is intentional: it is the dedicated talent-amplifier entry (principle 2: complement, never replace — here the item is *dependent* on the talent).
- **Bashing** — dazed on strong/crit is within principle 16's moderate band; the prone tier at Q6 carries the Resist gate.

### Q7 Entry Notes

- **Sentient** — mirrors Shield Mastery's SL-reduction; with the talent, both can apply, one attack each (parity, principle 20). The spirit is the fiction carrying the mechanics: both abilities are things a guardian does unbidden.
- **Wall of the Legion** — trades the bearer's movement for the aura (self-imposed cost in the fiction, principle 14); with Bulwark, only the higher same-type AV bonus applies.
- **Q8**: no Q8 rows in this table. A legendary shield (the Spellmirror capstone) is built as an artifact via the [Q8 artifact framework](q8-artifacts.md).

## Open Questions for Owner

1. Blocking granting two SL steps of reduction can turn a critical hit into a weak hit — confirm this is the intended power point for a Q4 1/day ability, or start it at Q5.
2. Bulwark stacking with Covering (AV extension) on two different shield-bearers is fine under the stacking rule, but confirm a single character wielding Bulwark plus a Covering ally-target does not read as double-dipping.
3. Should Reflecting also work against spells that hit but score only a weak success? (Recommended: no — keep the clean miss trigger.)
