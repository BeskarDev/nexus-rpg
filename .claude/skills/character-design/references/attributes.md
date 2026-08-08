# Attributes — step 3

Source: `docs/03-statistics/01-attributes.md`, `02-hit-points-wounds.md`, `03-defenses.md`,
creation step 1 in `docs/01-basic-rules/02-character-creation.md`.

## The array is fixed

**Every character starts at d6 in all four attributes. You may raise ONE to d8 only by
dropping ANOTHER to d4.** So a starting spread is always one of:

```
d8 / d6 / d6 / d4        (one specialist, one weakness)
d6 / d6 / d6 / d6        (legal, and almost always wrong for a quickstart archetype)
```

There is no point-buy, no second d8, and no way to avoid the d4 if you want the d8. A
quickstart archetype should take the d8: it is the sharpest statement the sheet can make about
what the character is, and an all-d6 build reads as undecided.

## What each attribute buys

| Attribute | Rolls with | Derived |
|---|---|---|
| **Strength** | Athletics (climb/swim/jump), Fortitude (pain, environment), Fighting (most melee), Crafting | **HP** = 12 + STR (d4 16, d6 18, d8 20, d10 22, d12 24) · **carrying capacity** = ½ STR + 8 (d4 10, d6 11, d8 12, d10 13, d12 14) |
| **Agility** | Archery, Stealth, Athletics (balance/acrobatics), agile weapons | **Dodge** = 5 + ½ AGI (d4 7, d6 8, d8 9, d10 10, d12 11) |
| **Spirit** | Mysticism, Insight, Influence, Perception, Fortitude (supernatural terror), initiative | **Resist** = 5 + ½ SPI (if Spirit is the governing one) · **Focus** = (SPI − 2) + 2 × Mysticism · **Spell Power** = ½ SPI |
| **Mind** | Arcana, Education, Lore, Crafting, Nature, Streetwise | **Resist** = 5 + ½ MND (if Mind is the governing one) · **Focus** = (MND − 2) + 2 × Arcana · **Spell Power** = ½ MND · a d8 Mind grants extra languages |

**Parry = 7 + Fighting rank** and is the only defense that does not come from an attribute —
which is why a Fighting rank-1 build has Parry 8 whatever its Strength.

Attribute modifiers used by abilities: ¼ / ½ / 1 / 1½ × attribute, from the table in
`01-attributes.md` (d4 → 1/2/4/6, d6 → 2/3/6/9, d8 → 2/4/8/12).

## Choosing the d8

**The d8 goes where the fantasy's verb is rolled.** In practice:

| Fantasy | d8 | d4 | Why |
|---|---|---|---|
| Frontline weapon user | STR | MND | Damage bonus on Strength-based attacks, +HP, carrying capacity for armor and shield |
| Precise / mobile weapon user, archer | AGI | MND | Attack rolls with agile and ranged weapons, Dodge 9, Stealth |
| Mystic caster | SPI | MND or STR | Focus 6 at rank 1, Spell Power 4, and Insight/Influence ride along |
| Arcane caster | MND | STR | Focus 6 at rank 1, Spell Power 4, and Education/Lore ride along |
| Scholar, crafter, investigator | MND | STR | Every knowledge skill and Crafting quality |

## Choosing the d4 — the part builds get wrong

The d4 is a **real weakness the table will see**, not a discard slot. Check what it costs:

- **STR d4** → HP 16 (the lowest in the game), carrying capacity 10, +1 bane-equivalent
  weakness on climb/swim/shove contests. Fine for a caster who stays back; dangerous on anyone
  who ends up in melee, and it is the first thing that kills a starting character.
- **AGI d4** → Dodge 7. Every ranged attack and area effect in the game is rolled against that
  number. Acceptable on an armored frontliner (they have AV and HP to absorb it), bad on
  anyone who is neither armored nor hidden.
- **SPI d4** → Resist 7 against fear, charm and mental attacks, and last in initiative. A
  character who is routinely the first one charmed is a liability to the party, not a
  characterful weakness.
- **MND d4** → Resist 7 if Mind is the governing attribute, no extra languages, weak Education
  / Lore / Nature. The cheapest d4 for most martial builds, and the reason most of them take
  it.

**Rule: never drop the attribute that a rank-1 skill or a chosen talent rolls with.** A d4 in
an attribute the build uses three times a session is not flavour, it is a broken build.

## Checks before moving on

- The d8 is rolled by at least one of the three rank-1 skills, or feeds a derived stat the
  fantasy depends on (Focus for a caster, HP/capacity for a heavy frontliner).
- The d4 is not rolled by any rank-1 skill.
- Derived stats fit the claimed role: a Tank with Dodge 7 and AV 1 is not a Tank; a Striker
  with 16 HP had better never be in melee range.
- A caster's Focus at rank 1 is **(attribute − 2) + 2**: d8 → 8, d6 → 6, d4 → 4. Six is enough
  for roughly two rank-1 spells per scene (2 Focus each) with room for rank-0 casting; four is
  a build that runs dry, and is only acceptable if the fantasy is "casts rarely, hits often".
