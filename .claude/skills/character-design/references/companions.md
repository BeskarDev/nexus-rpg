# Companions and Familiars — step 9b

Sources: `docs/08-creatures/01-mounts-companions/` (index, traits, mounts),
`src/utils/data/json/companion-traits.json`, the `Animal Companion` talent in `talents.json`.

Only a few builds have one. A companion is a **second body on the battlefield and a second
thing to run every turn** — it belongs to a character whose fantasy is *"I am not alone"*, and
nowhere else.

## The three routes in

| Route | Requirement | Tier | Coin cost |
|---|---|---|---|
| **Animal companion** | The **`Animal Companion` talent — a NATURE talent**, so the build needs Nature at rank 1 and must spend its Nature talent on it | Tier **≤ your Nature rank** — so Tier 1 at creation | **75 coins** for a trained Tier 1 companion (Trained Companion Costs: T0 25, T1 75, T2 250, T3 750) |
| **Arcane familiar** | The spell **`Conjure Familiar`** (Conjuration, rank 1) — an Arcana caster spending one of their four spells | **Tier 0** | 2 Focus **and 100 coins** in incense and occult ingredients, **per ritual** |
| **Spirit companion** | The spell **`Wild Companion`** (Mysticism, Nature tradition, rank 1) — and it **also requires the `Animal Companion` talent**, so it upgrades a companion rather than granting one | as the talent allows | 2 Focus **and 100 coins** in sacred ingredients, **spent even on a failure** |

Notes each of these carries, and each has bitten a published build:

- The mounts chapter still calls the talent a Survival talent in one line. `talents.json` is
  canonical: it is **Nature**, and the Tier is capped by the Nature rank.
- **Both spell routes are `ritual (hours)`** — they are not cast mid-fight, and `Conjure
  Familiar` is `singular` (one familiar, re-summoned by repeating the ritual if it dies).
- **A companion is BOUGHT, and the coins come out of the 350** (owner ruling, 2026-08-08). The
  talent and the spell grant the ability to keep a companion, never the creature — a starting
  character may pay at creation to arrive with one, or start without and tame it in play. So
  every companion build must leave **75 coins** (trained Tier 1) or **100 coins** (familiar
  ritual) unspent, and the archetype page states the cost and the remainder.
- **The alternative to paying is taming**, over time, on Spirit + Nature rolls. Legitimate, and
  it means the character does not have the companion at session one — say which the build
  intends.
- **`Wild Companion` grants nothing on its own.** It is a spirit-form upgrade (`spirit
  (primal)` type, +1d Spirit, +1d Mind, +1 Resist) gated behind the same Nature talent. A
  mystic build that lists it *instead of* the talent cannot cast it at all.

**A build that lists a companion without paying one of those prices is wrong.** It is the
failure that reads most plausibly on a page: the block describes a companion the character has
no route to. Check the talent list and the spell list before believing the section.

**Advice is not a companion.** A build may legitimately point at a companion as a GROWTH
option ("take Animal Companion when you raise Nature") — that belongs in the advancement
prose, never in a companion block on the card, which reads as something the character has.

## Building it

1. **Start from the companion base stat block** for the Tier (`01-mounts-companions/index.mdx`).
2. **Pick exactly one Animal trait** to define it (`traits.md`; the trait names are in
   `companion-traits.json`, e.g. Dog, Bird, Bear, Boar, Cat, Constrictor Snake). The trait is
   what makes it a wolf rather than a hawk.
3. On an archetype page, recommend **three traits with a one-line gloss each** — the player
   picks one. Suggest traits that pull in different directions (a scout, a bruiser, a
   controller), never three variations of the same animal.

## Judging a companion build

- **What does it do on a turn?** If the answer is "attack for small damage", the companion is
  paying a talent or a spell for very little; prefer traits whose value is scouting, grappling,
  or a condition.
- **Whose action is it?** Running a companion costs table time. A build with a companion AND a
  dense personal turn (stance, Quick Action talent, spell) is too busy for a starting player.
- **Is the fantasy about the animal?** A Tamer, a Ranger, a Druid: yes. A Fighter with a dog:
  the dog is not worth a rank-1 talent, and the build should say so.
- **Tier 0 versus Tier 1** — the familiar is fragile and a utility piece; the Nature companion
  can take a hit. Do not describe a Tier 0 familiar as a combatant.

## Checks

- The route is paid for: a Nature rank-1 talent slot, or one of the caster's spells (and, for
  `Wild Companion`, BOTH).
- The Tier matches the route (Nature rank for a companion, 0 for an arcane familiar).
- If the route is a ritual spell, the 100-coin ingredient cost is accounted for — either held
  back from the 350, or the build starts without the companion and says so.
- Every recommended trait exists in `companion-traits.json`.
- The three suggestions cover different jobs.
- The page states the tier rule and that the player picks ONE trait.
