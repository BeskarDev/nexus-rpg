# Designer Principles — Creature Design

Binding rules, not suggestions. Two sources feed this file:

1. **Native principles (1–7, 13)** — distilled from owner feedback and the creature-system analysis during creature work. Numbers are stable — **never renumber**.
2. **Ported principles (8–12)** — established through extensive spell-design and talent-design sessions with the owner, translated to creature terms. Each cites its provenance; the full original reasoning lives in `.claude/skills/spell-design/references/principles/`.

The numeric chassis (tier stats, size modifiers, immunity sets, validation checklist) lives in [stat-tables.md](stat-tables.md); this file holds design-judgment rules.

## Shared spell-design principle files that bind creature text directly

Creature ability text follows the same house conventions as spell and talent text. Before writing any stat block, these spell-design files apply as-is (read "spell" as "creature ability"):

| File | What it governs |
|------|-----------------|
| `../../spell-design/references/principles/wording-conventions.md` | General-application-first ordering, defined keywords referenced by name and never re-explained, durations as defined intervals, activation cost opens the sentence, house micro-conventions (minimum 0, signed banes), capitalize only named mechanics, creatures are they/their/them — never it/its (principle 30 there, also in CLAUDE.md) |
| `../../spell-design/references/principles/conditions.md` | Condition definition checks, parameterized (X) values, consumed-key traps, kill-rider wording, no-roll trigger limits |

## Native Principles

**1. Stat chassis + ability menu.** The tier table provides the statistical foundation; abilities provide the tactical identity. Never let either carry the whole design.

**2. Abilities over HP bloat.** Durability comes from defensive abilities (damage reduction, condition immunity, regeneration), not inflated HP. Keeps fights snappy.

**3. Damage threads the needle.** Creature damage must threaten glass-cannon casters (16 HP, AV 2) without oppressing heavy-armor martials (20+ HP, AV 5–6). The linear +1 weapon damage per tier achieves this — don't break it.

**4. Bounded complexity.** A creature should be buildable in under 5 minutes with this framework and immediately understandable at the table.

**5. Adventurers don't heal on Wounds.** Unlike Elite/Lord creatures, adventurers stay at 0 HP when Wounded. Party healing is their survival mechanism; factor this into lethality.

**6. Thematic integration.** Sword & sorcery, ancient-world aesthetic (Mesopotamian, Egyptian, Persian, mythological folklore). Every creature suggests its place in the world's ecology.

**7. Ability output follows the spell scaling frameworks.** Damage/healing abilities beyond basic attacks use `docs/analysis/spells/SPELL_SYSTEM_ANALYSIS.md` §6 (damage per rank/tier, AoE = half single-target) and §16 (healing: single-target 1:1 with damage, Quick Action ½, AoE half; temp HP never stacks). A creature's ability output must stay consistent with what a same-tier caster could do. Spellcasting creatures: max spell rank = skill rank in Arcana/Mysticism, and every referenced spell must exist in the published spell lists — verify by grep, never import spells from other game systems.

**13. Mythological-first roster identity — D&D imports must be naturalized, never copied.** Every creature must pass the mood-board test: would it fit a Conan the Cimmerian comic panel, Clash of the Titans, or the brutality of ancient nature? Source concepts primarily from Bronze Age and ancient-world myth (Mesopotamian, Egyptian, Greek, Persian, and the analog registers of the setting's other regions) or from the natural world made deadly (giant scorpions, jackals, desert vipers). D&D monster concepts may still be imported when the underlying creature fits the setting — a stirge as an oversized bloodsucking mosquito belongs in a delta swamp — but the import must be naturalized: give it a new name (mandatory for any D&D-identified or trademarked name — otyugh, grell, stirge, bugbear, tarrasque, beholder, displacer beast, and kin — both for legal safety and because those names carry a dungeon-fantasy register), and adapt its ecology, anatomy, or behavior to a concrete place in the world (what it eats, where it lairs, which region and folk know it, what myth locals tell about it). Names from shared world myth (harpy, manticore, minotaur, lich, kraken) are fine as-is. Expansion targets that fit the register natively: lamassu, girtablilu (scorpion folk), ammit, sirrush, ushabti, roc, gorgon, mummy lords. The current published roster is an early demo roster — existing entries violating this are grandfathered until bestiary iterations replace them, but no new creature may violate it. *(Owner rulings, 2026-07-24, genre/vibe review V2: the roster is a demo, encode the identity feedback for future iterations; D&D monsters can exist in Nexus when flavor and identity match the setting — rename at minimum, and adapt ecology, anatomy, or behavior where needed.)*

**14. A game term must say what it is; lore names stay in lore.** Any name appearing in the rules or the data — a type, a subtype, a condition, an ability — must tell the reader immediately what it is. Evocative, lore-derived naming belongs in `lore.narrative` and in the worldbuilding vault. A creature can be `Divine Beast / Guardian` on the stat line and "the last of the Titanenbrut's gate-wardens" in its lore block; both layers get the naming they need, and the GM reading a card at the table does not have to parse a cosmology. Rejected under this rule during the taxonomy pass: *Titanborn*, *Omenborn*, *Portent*, *Prodigy*, *Godtouched*. Each was accurate to the setting and none said what the creature was. **Applies to every design skill, not only creatures.** *(Owner ruling, 2026-08-09, D-038.)*

**15. Every encounter has a Timer, a Threat and a Treat — and the Treat has five channels.** The Threat is the signature move; the Timer is usually a trigger or a recharging ability. The **Treat** is information the party can act on, and it need not be on the stat block at all: a **damage-type weakness** (free — no ability budget), the **structural cost of a signature move** (a costed attack means the creature that chases you hits softer), a **drawback**, a **terrain hook**, or **lore alone**. For ordinary creatures the last is correct and the others are wrong: a wolf has no damage weakness and should carry no drawback ability — inventing either produces a wolf that is wrong about wolves. Its pack behaviour goes in `lore.ecology` and `lore.tactics`, and **Morale is the mechanism the knowledge feeds**. A false mechanic is worse than no mechanic. *(Owner rulings, 2026-08-09, D-001, D-032.)*

**16. Condition escalation prices a disable instead of banning it.** A rider applies a lesser condition, and applying it again to a target already suffering it upgrades to the greater one — `stunned` then `paralyzed` is the canonical pair. This costs two strong-or-critical hits rather than one roll, gives the party a visible warning round, and leaves two counterplays (clear the lesser condition, or do not let the creature land a second good hit). Escalate one impact band, never two. Reach for this whenever a creature's concept demands a disable, rather than removing the creature's identity. *(Owner ruling, 2026-08-09, D-029.)*

**17. Bonus damage comes in three rungs, and they are rungs, not a right answer.** (a) A **flat `+N`** on a stated prerequisite, where N is at most half the tier's weapon damage — legal only with a real prerequisite, since a bonus for something the creature was doing anyway is not a cost. (b) A **costed attack**: `+1 weapon damage`, but the creature skips all Movement this turn, *before and after the attack*. (c) An **SL escalator**: `+1 boon`, and on a hit increase the success level by one step, gated behind a geometric prerequisite the party can deny. The escalator is the most powerful and is priced as such; the flat bonus remains correct for a smaller effect. Costed attacks suit heavy hitters, where trading mobility for impact is what the creature already is. *(Owner rulings, 2026-08-09, D-021, D-022.)*

**18. `briefly` and `short` are the two in-combat durations, and the choice is deliberate.** `briefly` is one turn; `short` is the rest of the fight. A rider that fires on most hits wants `briefly`, or the fight fills with permanent conditions by round three; a signature effect meant to shape the encounter wants `short`. A third form is legal and often best — **name the end condition inline** when it is something the party *does* ("until they escape", "until they spend a Quick Action to brush off the scarabs"), because that is counterplay and a duration in one clause. **Never spell `briefly` out longhand** as "until the end of their next turn": that is imported phrasing for a duration Nexus already has a keyword for. *(Owner confirmation, 2026-08-09, milestone 04 §1.1.)*

## Ported Principles

**8. Check every condition against its published definition; parameterized conditions carry their (X).** Never reason about a condition from its name or its D&D counterpart — open `docs/05-combat/04-conditions.md` and design against what it actually does. The canonical trap: Nexus **stunned** does not disable a creature (they still move or act, at +1 bane); full incapacitation is **paralyzed** alone, which sits a full severity tier higher and needs harsher gates (rolled, limited, repeat-save escape valves). Write "poisoned for a short duration" with the save spelled out, "burning (4)", never a bare adverb. *(spell principle 73; talent principle 26)*

**9. High-impact conditions never ride automatic, no-roll triggers.** A creature ability that inflicts frightened or stronger gives the target a save (Attribute + Skill vs. the ability TN) or requires the creature to hit with a rolled attack. Automatic on-proximity or on-turn-start hard control with no counter-roll is oppressive at the table. Low-impact conditions (distracted, briefly slowed) may ride passively. *(spell principle 88; talent principle 9)*

**10. Defensive abilities and immunities need counterplay.** Every defensive ability leaves an opening: a limited frequency (once between turns), a stance the party can break, a fictional bypass (fire negates the regeneration), or degradation under pressure. Blanket immunity with no circumvention is an invisible invincibility wall — and a single-use "I win" ability is the same mistake on offense. Effects must be counterable in both directions. *(spell principle 77; talent principle 5)*

**11. Limits live in the fiction, not game structure.** Creature ability restrictions are diegetic: terrain (sandy ground, water, darkness), state (below half HP, enraged, first pool depleted), equipment, time of day. Never scope to meta-constructs ("only during encounter turns"). Per-scene/between-turns frequency limits are the sanctioned pacing exception, stated plainly. *(spell principle 12; talent principle 12)*

**12. The name is a promise, spoken in a pre-scientific register.** An ability's effect must fit what its name leads the table to expect, and the name covers every mode. Names and flavor use Bronze Age vocabulary — no modern physics or science terms — but stay clear and functional first: function in the name, poetry in the flavor. *(spell principles 61, 91; talent principle 16)*

## Appending a new principle

When the owner corrects or refines a creature design decision in session:

1. Take the next free number (currently next: **19**).
2. Append the full principle under the matching section above (numbered, bolded one-line rule, then reasoning, then owner-ruling provenance).
3. If it is frequently load-bearing, add its one-line hook to the Design Principles section in [../SKILL.md](../SKILL.md).
4. Update the "currently next" number in step 1. Never renumber.

If a correction refines a *ported* principle, note the creature-side ruling here under the ported entry rather than editing the spell-design or talent-design files — each skill owns its own provenance chain. If a correction changes a *numeric chassis rule*, it belongs in [stat-tables.md](stat-tables.md) instead, with a pointer here only if it encodes a judgment call.
