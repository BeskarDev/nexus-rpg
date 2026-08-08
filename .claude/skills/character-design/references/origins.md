# Upbringing and Background — step 4

Sources: `docs/02-adventurers/03-upbringing.md`, `04-background.md`,
`src/utils/data/json/upbringings.json` (21 entries), `backgrounds.json` (47 entries).

## What each one is

| | Upbringing | Background |
|---|---|---|
| Answers | How and where you were RAISED | What you DID before adventuring |
| Grants | 3 suggested skills (typical) | 4 suggested skills (typical) |
| Also grants | — | one **starting item** (roleplay, 0 coins, 0 load) and a **+1 boon advantage** in its area |
| Count | 21 | 47 |

Between them they suggest around seven skills — which is exactly the number a character
records. That is the design: **the pair is a skill package, and picking it well means the
customisation step is small.**

## Choosing the pair

1. **Pick the background first when the fantasy names a profession.** "Soldier", "Bard",
   "Renegade Mage", "Apothecary" — the background IS the fantasy's noun, and it carries the
   starting item that makes the character feel specific.
2. **Pick the upbringing to fill the gap the background leaves.** If the background is all
   social and knowledge, take an upbringing that grants a physical or wilderness skill, and
   the reverse.
3. **Read the actual skill lists before committing.** Names are misleading — check
   `upbringings.json` / `backgrounds.json` for the exact `suggested skills` string. An
   upbringing that sounds right and grants three skills the build will never roll is worse
   than a duller one that grants the right three.
4. **Both names must exist in the catalogues exactly.** The generator fails the build on an
   unknown name, and it has caught one already (`Apprenticed` was never an upbringing —
   `Artisanal` was the intended entry).

## The starting item

Every background grants one item for roleplay purposes: a rare herb bundle, a bronze battalion
insignia, a voice-changing throat pendant, a wooden face mask. It is **granted, never bought**
— zero coins, zero load, and it never appears in the equipment list.

Treat it as characterisation with teeth: it is the one object the character carries that no
shop sells, and it is often the best hook a GM has for that character's past. When choosing
between two otherwise equal backgrounds, the better starting item is a legitimate tiebreak.

## The +1 boon advantage

A background also grants an advantage: +1 boon on rolls that fall inside its area of former
life. Read the background's own text for its scope. This matters for role judgement — a
Support build whose background gives boons on medicine is delivering on its role outside
combat as well as in it.

## Customised skills (the `†` mark)

A character records seven skills and may **replace any number of the suggested ones**. Every
recorded skill that is not suggested by the chosen upbringing or background is marked `†` on
the archetype page, at BOTH rank 1 and rank 0 — one rule, both ranks.

- **Customising is normal and often better.** The mark says "this character chose it", which
  is a characterisation, not a penalty.
- **But a build customising four of seven skills has the wrong origin pair.** Go back to step
  4 and find the pair that grants what the build actually wants; you almost always can, with
  21 × 47 combinations.
- **Customise toward theme, not toward power.** Swapping a suggested Perception for a
  thematically loud Stealth is good design; swapping it because Stealth has a better talent is
  the tail wagging the dog.

## Checks before moving on

- Both names resolve in the catalogues, spelled exactly.
- The pair suggests at least four of the seven skills the build wants.
- The pair explains the fantasy sentence — someone reading only the upbringing, the background
  and the starting item should be able to guess the character.
- Nothing in the pair contradicts the character: a temple upbringing on a build with no
  Spirit-facing skill needs a reason.
