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

## Synergy Quick Reference

Short-hand of each school's synergy declaration (framework: [synergy-framework.md](synergy-framework.md) — setup / payoff / extender, cold-cast deficit, shared sockets). **The full instantiations live in each school's `### Internal Synergies` section in `docs/analysis/spells/schools/<school>.md`** — read that before designing a combo spell; this table is for orientation and for checking cross-school interlock at a glance.

| School | Emits (setup for anyone) | Rewards (its payoffs bite…) | Extender style | Top synergy gap |
|--------|--------------------------|------------------------------|----------------|------------------|
| **Evocation** | slowed, burning, staggered, stripped AV, difficult terrain | stacked conditions, clusters | refresh (enchants, cantrip taps), prolong (terrain) | no cross-target spread/convert |
| **Illusion** | frightened, confused, wasted enemy actions, concealment | minds committed to the lie | layering (compounding illusions), standing traps | nothing spends *believed* status mechanically |
| **Conjuration** | walls, cover, chokepoints, restrained, clusters | position (pinned, funneled, no cover) | prolong (lasting constructs), summons | payoffs only positional, nothing bites contained targets |
| **Telepathy** | dazed, confused, charmed, stolen intelligence | already-opened minds (influence ladder) | convert (dazed → charmed → commanded), standing links | ladder dead-ends at R3+, thin combat payoff |
| **Telekinetics** | prone, clusters, restrained, delivery/holds | prone and held bodies | refresh (free re-shoves), convert (pushed → prone → restrained) | near-zero in-school payoff (pure battery) |
| **Necromancy** | marked, bleeding, stunned, minion bodies | corpses and its own marks (private economy) | prolong (undead persist), convert (kill → servant) | all-or-nothing vs corpseless foes |
| **Light** | revealed, blinded, burning, light itself | the revealed, undead/corrupt | prolong (standing light sources), spread (dawn blessings) | reveal payoff informal, anti-undead stops at R2 |
| **Twilight** | concealment, frightened, slowed, asleep, darkness | targets inside its own dark | prolong (standing night), convert (fear ladder) | "cast from darkness" bonus exists only in flavor |
| **Life** | temp HP, condition removal, blessings, hallowed zones | allies at the crisis point, undead (overload) | prolong (zones), spread (communal heals) | trigger-payoffs unbuilt, Revivify/Raise Dead missing |
| **Death** | poisoned, frightened, attribute decay, curses | the already-afflicted (dooms ripening) | convert (afflictions stack toward major doom), spread (contagion) | curse-stacking has no published mechanic |
| **Nature** | difficult terrain, restrained, poisoned, buffs on allies | targets the land has caught | prolong (plants persist), spread (creeping growth), convert (terrain → entangle → poison) | last convert link informal, weather extender unbuilt |
| **Tempest** | prone, staggered, deafened, forced movement, weather cover | targets under its standing storm | prolong (persistent weather, repeat attacks), escalate (storm build-up) | storm build-up has no actual mechanic, R4 incomplete |
| **Peace** | protected, cover, slowed, dazed, redirect links | attackers who strike into sanctuary; allies who abstain | prolong/expand (aura → dome), spread (link networks) | no ally-facing payoff ("safe → hits harder") |
| **War** | frightened, bleeding, weapon blessings on allies' steel | broken nerve and open wounds, via weapon attacks | prolong (enchant durations), refresh (fear re-tests) | entire engine caps at R2, fear-exploit informal |

## Cross-School Rules

- **Philosophy first**: arcane defiles what mystic honors. Necromancy (arcane) and Death (mystic) share territory but never spells.
- **Trait boundaries matter**: e.g. Evocation "air" = raw elemental pressure (concussive blasts, vacuum); Tempest "thunderstorms" = reverent natural weather. Same physical phenomenon, different philosophy → different school.
- **Divination boundary — Light vs. Twilight**: both touch "seeing the unseen," so split by *what* is seen. **Light** owns present, local **truth** (the True keyword): piercing lies, illusions, invisibility, disguise, and obfuscation on what is before you, and revealing the real nature of a thing in hand. **Twilight** owns the **hidden, distant, and yet-to-come**: secrets and scrying across distance, dreams, omens, and prophecy (fate). Litmus: *reveal a falsehood present in front of me* → Light; *learn a distant secret or what is to come* → Twilight. Placements: Illuminated Script (reveal a text's true meaning, in hand) = Light; Moonlit Mirror (scry a distant creature, secrets/moon) = Twilight; Augury and Divination (future outcomes, fate) = Twilight.
- **Shared spells** only between philosophically compatible schools, flagged in the per-school files (e.g. Acid Splash: Evocation + Nature; Chain Lightning: Evocation + Tempest).
- **Internal completeness per school**: R1 reactive Quick Action spell, defensive options, utility, some damage, a repeating gimmick, setup+payoff combos.
