# Designer Principles — Creature Design

**Binding rules, not suggestions.** 33 principles, split by the phase of work they govern so a
task loads only what it needs. **Numbers are global and permanent — never renumber.**

Two sources feed them: **native** principles distilled from owner feedback during creature work,
and **ported** ones (8-12) established in spell-design and talent-design sessions and translated
to creature terms. Ported entries cite their origin; the full original reasoning lives in
`.claude/skills/spell-design/references/principles/`.

The numeric chassis (tier stats, size modifiers, immunity sets, validation checklist) lives in
[stat-tables.md](stat-tables.md); these files hold design *judgment*.

## Which file to read when

| Phase | File | Covers |
|---|---|---|
| steps 1-3 — concept, statistics, attacks | [principles/chassis.md](principles/chassis.md) | 1, 2, 3, 4, 5, 7, 15 |
| step 1, and every time you name something | [principles/identity.md](principles/identity.md) | 6, 12, 13, 14, 20, 21, 22, 25 |
| step 4 — abilities, and every Elite/Lord trigger | [principles/abilities.md](principles/abilities.md) | 8, 9, 10, 11, 16, 17, 18, 23, 24, 26, 27 |
| every line of stat block text and lore prose | [principles/writing.md](principles/writing.md) | 19, 28, 29, 30, 31, 32, 33 |

**Reading one file is the norm, not a shortcut.** Writing abilities means `abilities.md` plus
`writing.md`; a whole creature from scratch means all four, in the order above. What is never
correct is designing from the one-line summaries below — they exist to tell you *which* principle
applies, not what it says.

## Shared spell-design principle files that bind creature text directly

Creature ability text follows the same house conventions as spell and talent text. Before writing
any stat block, these spell-design files apply as-is (read "spell" as "creature ability"):

| File | What it governs |
|------|-----------------|
| `../../spell-design/references/principles/wording-conventions.md` | General-application-first ordering, defined keywords referenced by name and never re-explained, durations as defined intervals, activation cost opens the sentence, house micro-conventions (minimum 0, signed banes), capitalize only named mechanics, creatures are they/their/them — never it/its |
| `../../spell-design/references/principles/conditions.md` | Condition definition checks, parameterized (X) values, consumed-key traps, kill-rider wording, no-roll trigger limits |

## The full index


### Chassis, damage & encounter shape — [principles/chassis.md](principles/chassis.md)

- **1.** Stat chassis + ability menu.
- **2.** Abilities over HP bloat.
- **3.** Damage threads the needle.
- **4.** Bounded complexity.
- **5.** Adventurers don't heal on Wounds.
- **7.** Ability output follows the spell scaling frameworks.
- **15.** Every encounter has a Timer, a Threat and a Treat — and the Treat has five channels.

### Identity, naming & taxonomy — [principles/identity.md](principles/identity.md)

- **6.** Thematic integration.
- **12.** The name is a promise, spoken in a pre-scientific register.
- **13.** Mythological-first roster identity — D&D imports must be naturalized, never copied.
- **14.** A game term must say what it is; lore names stay in lore.
- **20.** A real animal keeps its real name; invented names are for invented creatures.
- **21.** Magical naturalism: an invented animal is a real one plus exactly one deviation, and the name states it.
- **22.** Dinosaurs are ordinary Beasts with a `Saurian` subtype, and never carry their scientific name.
- **25.** Folk inheritance is bounded by the folk entry, and Nexus is conservative about senses.

### Abilities, conditions & triggers — [principles/abilities.md](principles/abilities.md)

- **8.** Check every condition against its published definition; parameterized conditions carry their (X).
- **9.** High-impact conditions never ride automatic, no-roll triggers.
- **10.** Defensive abilities and immunities need counterplay.
- **11.** Limits live in the fiction, not game structure.
- **16.** Condition escalation prices a disable instead of banning it.
- **17.** Bonus damage comes in three rungs, and they are rungs, not a right answer.
- **18.** `briefly` and `short` are the two in-combat durations, and the choice is deliberate.
- **23.** A creature's weapon may have any name, but its damage and properties must be a catalog entry's.
- **24.** Check the universal Action and Quick Action lists before writing an ability.
- **26.** Every trigger opens `When this creature suffers a Wound, …`, and Lords take the ordinal.
- **27.** An Elite or Lord Trigger escalates. It is never a downgrade, and never a rule the game already has.

### Writing the text — [principles/writing.md](principles/writing.md)

- **19.** SL escalation has one canonical wording: `increase the SL by one step (max. critical)`.
- **28.** When two creatures share a sentence, name the subject — do not reach for a pronoun.
- **29.** Lore prose: write for a middle schooler — one idea per sentence, concrete first, wit last.
- **30.** Read every prose sentence aloud, and fix what the mouth stumbles on.
- **31.** Lore prose has no modern narrator. Never debunk the setting's superstitions — record them.
- **32.** Say it once. Never add the sentence that defends the first one.
- **33.** `tactics` is a GM briefing with the creature as its subject. No staging, no stating the obvious, no player advice.

## Appending a new principle

When the owner corrects or refines a creature design decision in session:

1. Take the next free number (currently next: **34**).
2. **Write the full principle into the phase file it belongs to** — `principles/chassis.md`,
   `identity.md`, `abilities.md` or `writing.md` (numbered, bolded one-line rule, then reasoning,
   then owner-ruling provenance).
3. **Add its one-line summary to "The full index" above**, under the same phase.
4. If it is frequently load-bearing, add its one-line hook to the Design Principles section in [../SKILL.md](../SKILL.md).
5. Update the "currently next" number in step 1. Never renumber, and never move a principle between files without updating both the index and every `principle N` cross-reference.

If a correction refines a *ported* principle, note the creature-side ruling here under the ported entry rather than editing the spell-design or talent-design files — each skill owns its own provenance chain. If a correction changes a *numeric chassis rule*, it belongs in [stat-tables.md](stat-tables.md) instead, with a pointer here only if it encodes a judgment call.

