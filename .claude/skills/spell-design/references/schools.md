# School Identity Quick Reference

Compact identity table for the 14 schools. **The per-school analysis files in `docs/analysis/spells/schools/<school>.md` are the authoritative, detailed source** — traits, signature gimmicks, condition identities, trait×rank coverage matrices, gap lists, and combo audits. Read the school's file before designing; this table is for orientation and cross-school comparison only.

## Arcane Disciplines (Mind + Arcana — transgressive, selfish)

| School | Traits | Excels | Decent | Weak | Damage Types | Typical Conditions |
|--------|--------|--------|--------|------|--------------|--------------------|
| **Evocation** | fire, frost, lightning, acid, air | Offense | Control, Defense | Healing, Support, Utility | fire, frost, lightning, acid, blast | burning, slowed, staggered, corroding, prone/pushed |
| **Illusion** | trickery, misdirection, obfuscation, hallucinations, distortion | Utility | Control, Support | Offense, Healing, Defense | psychic, blast, frost | frightened, confused, charmed, blinded |
| **Conjuration** | objects, creatures, teleportation, binding, force | Utility | Offense, Support | Healing, Defense, Control | physical, blast, acid | grappled, trapped (constructs) |
| **Telepathy** | influence, communication, insight, domination, memory | Control | Utility, Support | Offense, Healing, Defense | psychic, radiant, necrotic | charmed, frightened, confused, dazed |
| **Telekinetics** | move, repel, levitate, crush, gravity | Utility | Offense, Defense | Healing, Support, Control | physical, blast, lightning | prone, restrained, pushed/pulled |
| **Necromancy** | decay, undeath, siphoning, defilement, puppetry | Control | Offense, Utility | Healing, Support, Defense | necrotic, poison, physical | weakened, diseased, poisoned, bleeding |

## Mystic Traditions (Spirit + Mysticism — reverent, communal)

| School | Traits | Excels | Decent | Weak | Damage Types | Typical Conditions |
|--------|--------|--------|--------|------|--------------|--------------------|
| **Light** | sun, illumination, truth, clarity, judgement | Support | Offense, Healing | Utility, Defense, Control | radiant, fire, blast | blinded, burning, revealed |
| **Twilight** | moon, dreams, secrets, fate, illusion | Utility | Control, Support | Offense, Defense, Healing | psychic, frost | unconscious (sleep), frightened, confused |
| **Life** | vitality, blessings, community, hope, fertility | Healing | Support, Utility | Offense, Defense, Control | radiant, psychic (overload) | blessed, energized (positive) |
| **Death** | plagues, curses, fear, decay, ancestry | Control | Offense, Utility | Healing, Support, Defense | necrotic, poison, acid | diseased, cursed*, frightened, withered* |
| **Nature** | earth, water, animals, plants | Utility | Healing, Support | Offense, Defense, Control | physical, poison, acid | poisoned, entangled, difficult terrain |
| **Tempest** | hurricanes, earthquakes, thunderstorms, sandstorms, floods | Offense | Control, Utility | Healing, Support, Defense | lightning, frost, blast | stunned, prone, slowed |
| **Peace** | calmness, protection, selflessness, travel, law | Defense | Support, Healing | Offense, Control, Utility | physical, blast, psychic | calmed, protected, oath-bound |
| **War** | fury, pride, blood, justice, triumph | Offense | Control, Support | Healing, Defense, Utility | physical, fire, blast | emboldened, enraged, bleeding, inspired |

\* **Condition names in these tables are thematic shorthand, not all official keywords.** The official condition list lives in `docs/05-combat/04-conditions.md` (complete list in [../../game-basics.md](../../game-basics.md#canonical-keyword-sources)). Official: burning, slowed, staggered, prone, frightened, confused, charmed, blinded, grappled, dazed, poisoned, bleeding, restrained, stunned, unconscious… Shorthand like "corroding", "weakened", "cursed", "withered", "blessed", "energized", "calmed", "emboldened", "revealed" must resolve in the spell text to either an official condition or an exact mechanical effect with a duration (e.g. corroding → "AV reduced by 2 for a short duration" plus a Durability check).

## Cross-School Rules

- **Philosophy first**: arcane defiles what mystic honors. Necromancy (arcane) and Death (mystic) share territory but never spells.
- **Trait boundaries matter**: e.g. Evocation "air" = raw elemental pressure (concussive blasts, vacuum); Tempest "thunderstorms" = reverent natural weather. Same physical phenomenon, different philosophy → different school.
- **Shared spells** only between philosophically compatible schools, flagged in the per-school files (e.g. Acid Splash: Evocation + Nature; Chain Lightning: Evocation + Tempest).
- **Internal completeness per school**: R1 reactive Quick Action spell, defensive options, utility, some damage, a repeating gimmick, setup+payoff combos.
