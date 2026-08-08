# Spells — step 8

Sources: `docs/07-magic/01-magic-spells/index.md`, `src/utils/data/json/arcane-spells.json`,
`mystic-spells.json`. The spell-design skill covers designing spells; this covers CHOOSING
them for a character.

## One magic skill, ever

**A character may only learn one of Arcana and Mysticism.** Never both, at any rank, on any
build.

| | **Arcana** | **Mysticism** |
|---|---|---|
| Attribute | Mind | Spirit |
| Spell Power | ½ Mind | ½ Spirit |
| Focus | (Mind − 2) + 2 × Arcana | (Spirit − 2) + 2 × Mysticism |
| Groups | 6 **disciplines**: Evocation, Illusion, Conjuration, Telepathy, Telekinetics, Necromancy | 8 **traditions** in opposed pairs: Light/Twilight, Life/Death, Nature/Tempest, Peace/War |
| Catalyst (required, in hand) | an **arcane conduit** | a **mystic talisman** |
| Extra obligation | an arcane origin: Studied (humans only), Inherited, Exposed | a **Mystic Oath** to a patron; transgress it and you lose casting until you atone |

## How many spells a starting caster knows

At rank 1 the character has learned the skill once and gained one rank, so both grants apply:

| Mode | On learning | On gaining rank 1 | **Total at rank 1** |
|---|---|---|---|
| **Arcana** | 2 rank-0 spells for the first discipline | 2 more of rank ≤ 1, any learned discipline (or adopt a new discipline for 1 rank-0 spell) | **4** |
| **Mysticism — Balance** | choose 2 traditions, learn 2 spells among them | 2 more of rank ≤ 1, any of the traditions | **4** |
| **Mysticism — Devotion** | choose 1 tradition, learn 3 spells from it | 3 more of rank ≤ 1 from it | **6** |

The Balance/Devotion choice is **permanent** and it is a real fork: Balance buys breadth across
two opposed ideals, Devotion buys depth and two extra spells inside one. On an archetype page
this is `spellData.mode`, and the two render differently — Balance as one freely chosen pool,
Devotion as "choose one tradition and take its spells" over alternative option sets of **equal
size**.

Nothing above rank 1 is available at creation.

## Focus, and the plan that has to fit inside it

**Focus at rank 1 = (attribute − 2) + 2**: d8 → 8, d6 → 6, d4 → 4.
**Spell cost by rank: rank 0 costs 0 Focus, rank 1 costs 2** (`index.md` cost table). Focus is
spent on a success or a blunder, not on a plain failure.

So a d6 caster has six Focus, or three rank-1 castings in a scene, with rank-0 spells free
between them. Two consequences for a starting build:

- **A caster's rank-0 spells are its rotation, not its filler.** They cost nothing; the build
  should have at least one rank-0 spell it is happy to cast every round.
- **A build with no rank-0 spell at all runs dry** and stands around. Check the mix.

## Choosing the spells

Cover the four jobs; a starting caster should not have four of any one:

| Job | Ask |
|---|---|
| **Answer a fight** | One spell that changes a combat: damage, a condition, a zone. |
| **Protect** | One that keeps the caster or an ally standing — a ward, a heal, a defensive effect. |
| **Solve** | One that opens a door the party cannot open otherwise — knowledge, movement, an illusion, a conversation. |
| **Free casting** | At least one rank 0, for the turns where 2 Focus is too expensive. |

Selection rules:

1. **The disciplines or traditions ARE the character's magical identity** — pick them from the
   fantasy sentence first, then pick spells inside them. A Twilight/Peace bard and a Light/War
   champion are different characters before a single spell is chosen.
2. **Balance means the two traditions must contrast.** Two neighbouring ideals is a wasted
   fork; the published pairs read as a stance (illusion + calm, life + storm).
3. **Devotion must justify the +2 spells with a narrower promise.** A Devotion build should
   look one-note on purpose.
4. **Every spell must be castable by this sheet** — check the rank (0 or 1 only), and check
   whether it needs a target, a hand free, or concentration the build cannot maintain.
5. **A Spell Catalyst must be in the equipment list.** A caster without the catalyst cannot
   cast at all — it is the single most common gear omission.
6. **Do not duplicate a talent.** If the build took `Master of Fundamentals` (re-roll a rank-0
   spell), it needs rank-0 spells worth re-rolling.

## Spells that cost coins

Three rank-1 spells are `ritual` conjurations with a **material price per casting**, and a
starting caster who picks one has spent part of their equipment budget without noticing:

| Spell | Skill / group | Cost per ritual |
|---|---|---|
| `Conjure Familiar` | Arcana, Conjuration | 2 Focus + **100 coins** of incense and occult ingredients |
| `Wild Companion` | Mysticism, Nature | 2 Focus + **100 coins** of sacred ingredients, spent **even on a failure** — and it also requires the `Animal Companion` talent |

Neither is castable in a fight (`ritual (hours)`). If the fantasy is "arrives with a familiar",
100 coins come off the kit. See [companions.md](companions.md).

## Casters who fight

A rank-1 caster with a weapon skill at rank 0 gets one combat art — the standard way to make a
hybrid work. `Spellblade` (Arcana) and `Mystic Champion` (Mysticism) fuse a spell into a weapon
attack for a Quick Action and 2 extra Focus, and both want: a weapon the build actually
carries, a rank-0 spell cheap enough to spend the Focus on, and a Focus pool that can pay for
it more than once (so d8 in the casting attribute, or a short fight).

## Checks before moving on

- Exactly one magic skill; spell count matches the mode (4 / 4 / 6).
- Every spell is rank 0 or 1, and belongs to a chosen discipline or tradition.
- Devotion options are equal in size, so "choose one" is a fair choice.
- At least one rank-0 spell.
- The four jobs are covered, or the omission is deliberate and stated.
- The catalyst is bought; the Focus pool is stated and the per-scene plan fits in it.
