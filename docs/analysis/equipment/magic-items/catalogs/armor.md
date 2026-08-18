# Armor — Enchantment Design Catalog

> **Status:** Design proposals pending owner approval. Nothing here is published. The armor/shield split itself is a proposed rules-table change — armor and shields currently share one 6-entry table in `docs/04-equipment/07-magic-items/enchantments.md` (verified 2026-07-19).

## Category Identity

Armor is what stands between a character and harm without any action spent. The split from shields gives armor a clean identity:

- **Armor → passive and reactive defense.** Environmental protection, resilience, condition defense, stealth-profile fixes. No active-aggression effects.
- **Role focus:** Defense and Utility. Offense belongs on weapons, ally-support on shields.
- **Resource model:** Defensive reactions are 1/scene (reliable each encounter). Powerful mitigation (resistance, Mirror Image) is X/day. Narrow environmental immunities may be passive at Q4 (the Temperate precedent).

## Current Inventory (shared armor/shield table, 6 entries, d6)

| # | Name | Quality | Effect | Role |
|---|------|---------|--------|------|
| 1 | Anchoring | Q4/Q5/Q6 | Ignore push/prone; retaliate 2/4/6; X/day | Defense |
| 2 | Blurring | Q4/Q5/Q6 | Mirror Image duplicates (8/9/10 Defense); X/day | Defense |
| 3 | Temperate | Q4 only | Immunity to extreme cold OR heat | Utility |
| 4 | Stalwart | Q4 only | Ignore one condition from a list; 1×/day | Defense |
| 5 | Tough | Q4/Q5/Q6 | Resistance against one instance of damage; X/day | Defense |
| 6 | Silent | Q4/Q6 | Reduce rigid, remove noisy, or +1 Stealth boon | Utility |

### Audit Findings (2026-07-19 re-evaluation)

1. **The split is still correct and still pending.** Shields are dual-classified as weapons and armor; a shared table wastes both identities. Anchoring moves to the shield table (active retaliation fits the shield identity).
2. **Stalwart rescaled by scope, not frequency.** The old proposal scaled uses per scene (1/2/3) — at Q6 that is near-immunity to all listed conditions, colliding with the "immunity is never casually passive" rule and trivializing Strong Mind R2 and Tough Stomach R2 (both 1/scene talent abilities). The redesign keeps **1/scene flat** and scales the *condition list* by quality instead. Frequency stays in parity with the talents; quality buys breadth.
3. **The old "Vigilant" proposal ("cannot be surprised") violated principles 13 and 20** — a flat immunity with no counterplay that outclasses Danger Sense R2 (+2 Resist vs. surprise). Redesigned as the same-shaped bonus the talent uses.
4. **"Enduring" now targets real published mechanics.** The travel system (`docs/06-scenes/07-challenges/02-travel.md`) defines exactly where Fatigue comes from: Forced March, Extreme Climate checkpoints, weather events, bad nights, Navigator consequences. The enchantment names its sources instead of "environmental effects".
5. **Blurring's duplicate Defense values (8/9/10) predate current level math** — flag for a numbers pass against the published *Mirror Image* spell when implemented.

## Proposed Catalog (10 entries, d100)

| d100 | Name | Quality | Effect | Role |
|------|------|---------|--------|------|
| 01–10 | Blurring | Q4/Q5/Q6 | Quick Action: activate the effects of the *Mirror Image* spell on yourself. The duplicates have 8/9/10 Defense. Once/twice/thrice per day. | Defense |
| 11–20 | Stalwart | Q4/Q5/Q6 | Once per scene, when an effect would inflict a listed condition on you, you can choose to not suffer that condition (usable after rolling any test against the effect). Q4 list: dazed, frightened, staggered. Q5 adds: charmed, confused. Q6 adds: paralyzed, stunned. | Defense |
| 21–30 | Tough | Q4/Q5/Q6 | Once per turn, when you suffer damage, you can choose to gain resistance against that damage. Once/twice/thrice per day. *(unchanged)* | Defense |
| 31–40 | Silent | Q4/Q6 | Reduce the rigid property by 1/2, remove the noisy property, or gain +1 boon on Stealth rolls to move silently or surprise enemies (in that priority order). *(unchanged)* | Utility |
| 41–50 | Temperate `[minor]` | Q4 only | Magical protection from extreme cold or extreme heat (chosen at creation). You automatically succeed on travel and exploration tests to resist the chosen climate. | Utility |
| 51–60 | Vigilant | Q4/Q6 | Add +2 to your Resist against rolls made to surprise you. At Q6, you also gain +1 boon on Initiative rolls. | Defense |
| 61–70 | Warded | Q5/Q6 | Choose one non-physical damage type at creation. When you take damage of that type, you can choose to gain resistance against it. Once/twice per day. At Q6, once per day you can instead ignore one instance of that damage type entirely. | Defense |
| 71–80 | Fortified | Q4/Q5/Q6 | While you have not moved since the start of your last turn, you gain +1/+2/+3 AV (situational bonus). | Defense |
| 81–90 | Camouflaged `[minor]` | Q4 only | Choose one environment at creation (desert, forest, mountains, ruins, and so on). While in that environment, gain +1 boon on Stealth rolls to hide. | Utility |
| 91–100 | Enduring | Q4/Q5/Q6 | Once per journey at Q4, once per travel day at Q5/Q6: when you would suffer Fatigue from Forced March, an Extreme Climate checkpoint, a weather event, or a bad night, ignore it. At Q6, you can also extend this protection to one ally in close range when it triggers. | Utility |
| — | Aegis of the Ancestors | Q7 only | Spectral hands of the honored dead ward the wearer. Once per scene, when an attack hits you, reduce the attack's SL by one step (min. failure) without spending a Quick Action. Once per day, when you would suffer a Wound, the ancestors take it instead: negate the Wound. Each use is visible as a flicker of translucent figures around you. | Defense |
| — | Sunforged | Q7 only | Forged in a temple furnace lit by the sun itself, this armor sheds dim light in melee range (can be suppressed while resting). Once per scene, when an enemy in melee range hits you with an attack, radiant fire flares: they take 8 radiant damage (ignore AV). If their attack was a weak success, they are also briefly blinded. | Defense / Offense |

> **d100 note:** Q7-only entries carry no d100 range yet — final allocation happens at implementation. A Q7 entry rolled for lower-quality treasure is re-rolled.

### Q7 Scaling of Existing Entries

| Enchantment | Q6 | Q7 (proposed) |
|-------------|-----|----------------|
| Tough | Resistance 3×/day | Also: when you use Tough, gain +2 AV (situational bonus) until the end of your next turn |
| Blurring | 3 duplicates/day (10 Defense) | Also: once per day, when your last duplicate is destroyed, regain one |

### Entry Design Notes

- **Stalwart (redesign)** — 1/scene flat matches the resource guidance for defensive reactions, and the list growth gives quality tiers a real identity jump (Q6 is the only tier that answers paralysis and stun). Stays additive with Strong Mind R2 and Tough Stomach R2: the talents cover their own condition families at 1/scene, the item covers one incident of a broader family.
- **Vigilant (redesign)** — same mechanical shape as Danger Sense R2, so item and talent stack to +4 Resist vs. surprise instead of one deleting the other (principle 20: parity with distinct edges). No immunity, so no principle 13 problem.
- **Warded** — the Q6 ignore-one-instance is a triggered, 1/day, single-instance immunity, which satisfies the "immunity is triggered and limited, never passive" rule; the visible-and-limited shape is its circumvention (principle 13).
- **Fortified** — rewritten off the "while using Guard" wording: Guard is a shield-only combat option, so armor cannot key on it. The hold-position trigger keeps the fiction (braced, planted) and self-limits against skirmishers.
- **Enduring** — anti-trivialization check: travel Fatigue also comes from Navigator consequences ("become exhausted") and camp failure, which this enchantment deliberately does *not* cover. The Fatigue economy stays live; the item shaves the environmental worst case.
- **Temperate / Camouflaged** keep the `[minor]` tag for the minor-enchantment rule (see main analysis §3.5).

### Q7 Entry Notes

- **Aegis of the Ancestors** — the SL-reduction is Shield Mastery's shape without the shield; at Q7 an armor may carry a shield-grade reaction, and both can apply to different attacks in a round (parity, principle 20).
- **Sunforged** — the blindness rider is gated on the attacker's own SL (weak hits get burned worse), a roll-derived gate per principle 16; skilled attackers punch through it.
- **Q8**: no Q8 rows in this table. Legendary armor (the Living Vestment capstone) is built as an artifact via the [Q8 artifact framework](q8-artifacts.md).

## Open Questions for Owner

1. Enduring's Q5/Q6 "once per travel day" — generous over a long journey. Prefer flat 1/2/3 per journey instead?
2. Fortified's "have not moved" trigger — should Movement forced by push effects break it? (Recommended: no, involuntary movement does not break it.)
3. Blurring duplicate Defense numbers need a parity pass against the published *Mirror Image* spell before implementation.
