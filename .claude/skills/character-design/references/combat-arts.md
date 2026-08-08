# Combat Arts — step 7

Sources: `docs/05-combat/05-combat-arts/00-overview.md`, creation step 7 in
`02-character-creation.md`, `src/utils/data/json/combat-arts.json` (29 Basic, 15 Supreme).

## The count is arithmetic, not a choice

> "If you select Archery or Fighting, you learn Combat Arts for weapons associated with that
> skill. You can learn one Combat Art for rank 0 or two Combat Arts for rank 1 in these
> skills."

**Per weapon skill: 2 arts at rank 1, 1 art at rank 0. Sum over Fighting and Archery.**

| Build | Arts |
|---|---|
| Fighting rank 1 | 2 |
| Archery rank 1 | 2 |
| Fighting rank 1 + Archery rank 0 | **3** |
| Archery rank 1 + Fighting rank 0 | **3** |
| Fighting rank 1 + Archery rank 1 | 4 |
| Neither skill recorded | **0** |

The archetype generator computes this and **fails the build** when the recommendation does not
match. A build with no weapon skill recommends no arts at all — recommending one is
recommending something the character cannot learn.

`Art of Fighting` and `Art of Archery` grant two more each, but they are rank-4 talents:
irrelevant at creation.

## The weapon gate

Every art lists the weapon types it works with. **An art is only recommendable if the kit
carries a weapon of a listed type** — the generator checks this too, and it has caught a build
recommending a Bow/Crossbow/Thrown art with nothing but a longsword and a shield in the pack.

Two rules the check depends on:

- **A thrown weapon answers a `Thrown` art whatever its own type is.** A Javelin is a Polearm
  with the `thrown` property, so it legally powers `Pinning Shot`.
- **Unarmed counts as `Brawling` only with the `Pugilist` talent.** A monk with a quarterstaff
  and two brawling arts is illegal unless Pugilist is one of the three talents.
- **`Snare` and `Choking Grip` are used "when attempting to grapple"**, so they need the
  Grapple Action (`Strength + Athletics`) to hang off, and they only come alive with the
  `Grappler` talent, which converts a hit into a grapple. Recommending either to a build with
  no Athletics and no `Grappler` gives it an art it will rarely get to use — legal, and still
  wrong.

## The 29 basic arts by weapon type

| Weapon type | Arts |
|---|---|
| **Axe** | Brutal Strike, Charge, Cleave, Deep Cut, Defensive Strike, Disarm, Divert Attention, Evasive Strike, Exhilarating Strike, Felling Strike, Flurry, Splinter, Terrifying Strike |
| **Blade** | Brutal Strike, Charge, Cleave, Deep Cut, Defensive Strike, Disarm, Divert Attention, Evasive Strike, Exhilarating Strike, Feint, Felling Strike, Flurry, Precise Strike, Quick Lunge, Terrifying Strike |
| **Brawling** | Choking Grip, Deep Cut, Defensive Strike, Disarm, Divert Attention, Evasive Strike, Exhilarating Strike, Feint, Felling Strike, Flurry, Head Smack, Knockout, Precise Strike, Quick Lunge, Ram Down, Snare |
| **Mace** | Brutal Strike, Charge, Cleave, Defensive Strike, Disarm, Divert Attention, Exhilarating Strike, Felling Strike, Flurry, Head Smack, Knockout, Ram Down, Splinter, Terrifying Strike |
| **Polearm** | Brutal Strike, Charge, Cleave, Deep Cut, Defensive Strike, Disarm, Divert Attention, Evasive Strike, Exhilarating Strike, Feint, Felling Strike, Flurry, Precise Strike, Quick Lunge, Terrifying Strike |
| **Shield** | Charge, Defensive Strike, Head Smack, Knockout, Ram Down |
| **Bow** | Aimed Shot, Barrage, Disabling Shot, Disarming Shot, Pinning Shot, Power Shot, Precise Shot, Volley |
| **Crossbow** | Aimed Shot, Disabling Shot, Disarming Shot, Pinning Shot, Power Shot, Precise Shot, Volley |
| **Thrown** | Aimed Shot, Barrage, Choking Grip, Disabling Shot, Disarming Shot, Felling Strike, Pinning Shot, Power Shot, Precise Shot, Snare, Volley |

Read the effect text in `combat-arts.json` before recommending — the one-line glosses on
archetype pages must describe what the art does, not restate its name.

## What to pick

Each art is **once per combat**, and only **one art per turn**, so a build's arts are its
opening moves, not its rotation. Pick for coverage of different situations:

| Job | Basic arts |
|---|---|
| Burst damage | Brutal Strike (heavy), Power Shot (heavy ranged), Precise Strike, Deep Cut |
| Multiple enemies | Cleave, Volley, Flurry, Barrage |
| Control / lockdown | Snare, Pinning Shot, Choking Grip, Disarm, Disarming Shot, Ram Down, Knockout |
| Defense while attacking | Defensive Strike, Evasive Strike (grants Retreat on a hit) |
| Positioning | Charge (move and shove), Quick Lunge, Felling Strike |
| Debuff / setup | Feint, Divert Attention, Terrifying Strike, Disabling Shot, Head Smack |
| Armor / gear breaking | Splinter, Precise Shot (ignores armor) |

Selection rules:

1. **The first art is the fantasy's opening move.** A Hoplite opens by pinning; a Barbarian
   opens by cleaving.
2. **The second art covers what the first cannot** — if the first is single-target burst, the
   second should be crowd, control or defense.
3. **A rank-0 skill's single art is a lifeline, not a build**: it should work on the ONE weapon
   the build carries for that skill, and it should matter on a turn the build's main plan is
   unavailable (an archer caught in melee wants `Evasive Strike`; a swordfighter with a javelin
   wants `Aimed Shot`).
4. **Do not pair two arts with the same heavy-weapon requirement** unless a talent removes the
   bane (`Heavy Weapon Mastery` for `Brutal Strike`, `Strong Grip` for `Power Shot`).
5. **An art keyed to a talent is a strong pick, not a coincidence** — say the pairing out loud
   in the gloss when it exists.

## Checks before moving on

- Count equals `2 × (weapon skills at rank 1) + 1 × (weapon skills at rank 0)`.
- Every art's weapon list intersects the kit (including the thrown and Pugilist rules).
- No two arts do the same job.
- Each art's gloss says what it does, in the player's terms.
