# Reviewing an existing character

Use this to audit a published quickstart archetype, or any built character. The output is a
verdict per step plus a short list of concrete changes — never a rewrite of the whole build
when one talent is the problem.

## Before you start

Read the archetype's own record in `src/utils/data/json/archetypes.json` and its generated page.
**The mechanical audit is already automated**: `bun run content:gen` recomputes coins, load,
carrying capacity, focus pool, rank-0 skills, `†` marks and the combat-art count, and fails on
bad data. So a clean build means the arithmetic is right — and the review is about
**judgement**, which nothing can check for you.

## The pass

Work the nine steps in order and write one verdict line each: **holds / weak / broken**, plus
the reason in one sentence.

| # | Question | Broken looks like |
|---|---|---|
| 1 | **What player fantasy is this build trying to achieve?** State it in one sentence, derived from the build itself, not from the name. | The sentence could describe three other archetypes, or nothing on the sheet delivers it |
| 2 | **Do the stated roles follow from that fantasy, and does the rank-1 sheet deliver them?** | A role with no ability behind it (Support with nothing ally-facing; Tank with Dodge 7, AV 1 and no protection) |
| 3 | **Is the attribute spread the right one for the fantasy?** | The d8 is rolled by nothing; the d4 is rolled by a rank-1 skill |
| 4 | **Do upbringing and background fit, and do they grant the skills the build wants?** | Four or more `†` skills; an origin that contradicts the character |
| 5 | **Are the three rank-1 skills the three most important ones for this fantasy?** | A rank-1 skill whose talent is filler; the fantasy's verb sitting at rank 0 |
| 6 | **Do the three talents carry the archetype's identity and its role?** | Generic picks (`+2 HP`), a talent the sheet cannot use, two competing own-turn Quick Actions |
| 7 | **Are the combat arts the right ones, and legal?** | Two arts doing the same job; an art with no matching weapon |
| 8 | **Do the spells cover a fight, a defence, a problem, and a free cast?** | Four spells with one job; no rank-0 spell; no catalyst in the kit |
| 9 | **Does the kit serve the plan, and does the tally leave the character functional?** | Gear the build never uses; encumbered at creation; a caster with no catalyst |

Then two whole-build questions:

- **Turn one test.** Write the character's first round: Action, Quick Action, Movement. If it
  cannot be written from the sheet, the build is not playable as a quickstart.
- **Table test.** Name one thing this character is the best in a typical party at. If the answer
  is "nothing in particular", the archetype has no reason to be in the set.

## Severity, and what to do about it

| Severity | Definition | Action |
|---|---|---|
| **Broken** | Illegal by the rules, or the build cannot do the thing it claims | Fix now; it is a data change and the generator will confirm it |
| **Weak** | Legal, but a pick is doing less than a neighbour would for the same fantasy | Propose the swap with the reason; the owner decides |
| **Flavour** | Works, but the wording or the name undersells it | Note it, do not spend the build's budget on it |

**Never fix a fantasy problem with a mechanical patch.** If an archetype's identity is unclear,
the answer is a different talent or skill, not a bigger number. And never change a role to make
the set's role distribution look better — the role follows the build.

## The failure modes actually found in this set

Kept as a list because they recur, and every one of them shipped:

- **The role the build does not deliver.** Combat arts recommended to archetypes with no weapon
  skill at any rank — eight archetypes had the wrong art count before the rule was derived.
- **The missing section.** A page that silently lost its attributes, origin and skills.
- **The unusable pick.** An art needing Bow/Crossbow/Thrown on a kit of sword, shield and armor.
- **The name that resolves to nothing.** Nine equipment names matching no catalogue entry, so
  the generated character sheet produced no item at all.
- **The invented origin.** An upbringing that was not in the catalogue.
- **The unpaid companion.** A companion block on a build that spent no talent and no spell on it.
- **The silent arithmetic error.** A coin total that was simply wrong for years.

Every one was invisible to a reader and obvious to a check. **When a judgement can be turned
into a derivation, put it in `archetype-derivation.ts` instead of in a review note** — that is
how this set stopped repeating its faults.

## Output format

For each archetype reviewed, produce:

1. **Fantasy** — the one-sentence statement.
2. **Verdict table** — nine rows, holds / weak / broken, one sentence each.
3. **Changes** — an ordered list, each with the step it belongs to, the exact JSON field it
   touches, and the reason. Mark which are broken-fixes (do now) and which are judgement calls
   (owner decides).
4. **Left alone** — one line on what is already good, so a later pass does not undo it.
