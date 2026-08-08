# Designer Principles — Talent Design (Index)

Binding rules, not suggestions. Two sources feed this corpus:

1. **Ported principles** (1–18) — established through extensive spell-design sessions with the owner, translated to talent terms. Each cites its spell-design provenance number; the full original reasoning lives in `.claude/skills/spell-design/references/principles/`.
2. **Talent-native principles** (19+) — distilled from owner feedback during talent work, appended over time (see "Appending a new principle" at the bottom).

Both share **one local number sequence**, stable and never renumbered. The talent-specific structural rules (three progression paths, per-rank resource budget, rank progression pattern) live in [../SKILL.md](../SKILL.md); these files hold design-judgment rules.

**How to use (don't read all 47 cold):** scan the Index by Concern below, pick the concern(s) matching your current task, and read that concern's file in full under [principles/](principles/). A principle may be *listed* under more than one concern but its full text lives in exactly one home file — if a number isn't in the file you opened, grep `principles/` for `^\*\*NN.`.

## Index by Concern

### Power budget & bonus magnitudes → [principles/power-budget.md](principles/power-budget.md)

1 talents assist, never bypass · 2 flat damage riders don't proliferate (prefer action economy, control, banes/boons) · 3 SL manipulation is premium R3+ budget, never stacked with a flat rider · 4 never scale a cap · 5 a granted immunity needs a circumvention · 6 healing and recovery sit under the Life-tradition ceiling · 7 fatigue-removal ceiling · 22 bonuses are typed by source lane (the two-lane rider rule) · 23 bonus values come from fixed magnitude menus · 32 a single ability should basically never impose +2 banes · 26 condition severity comes from the Nexus definitions *(home: triggers-conditions.md)*

### Triggers & conditions → [principles/triggers-conditions.md](principles/triggers-conditions.md)

8 debuffs key off rolls that actually happen · 9 high-impact conditions never ride automatic, no-roll triggers · 10 check every condition against its definition, parameterized conditions carry their (X) · 11 kill-riders say "slain", never key on a condition the attack consumes · 26 condition severity comes from the Nexus definitions, not genre assumptions (stunned still acts, only paralyzed disables)

### Scope & fiction → [principles/scope-and-fiction.md](principles/scope-and-fiction.md)

12 limits live in the fiction, not game structure · 13 a flat effect on success is often correct, especially for utility · 14 GM-facing effects give the GM parameters, never "GM decides" · 15 weigh worldbuilding implications as an explicit balance axis · 16 the name is a promise, spoken in a pre-scientific register · 25 the mortal-pinnacle bar is "powered by the mortal self", not "realistic" · 35 a talent must earn its slot across multiple game systems *(home: cross-system-interfaces.md)*

### Cross-system interfaces → [principles/cross-system-interfaces.md](principles/cross-system-interfaces.md)

17 cross-system interactions gate in the talent, never by disclaimers elsewhere · 18 validate against spells, items, and subsystems, not just other talents · 27 system vocabulary is a payoff, not a gate · 28 Challenges are a resolution overlay, not a dependency · 35 a talent must earn its slot across multiple game systems, not one low-screen-time system · 43 a challenge info-reveal pairs a vague description with a terse bracketed effect · 45 check the Combat Arts too, synergize rather than duplicate *(home: pool-composition.md)*

### Pool composition & overlap audit → [principles/pool-composition.md](principles/pool-composition.md)

44 balance a physical skill's armor-restricted talents, don't pile onto one side · 45 check the Combat Arts too, and design combat-maneuver talents to synergize with them · 46 the arcane defensive lanes are mostly taken, so anti-magic talents disrupt rather than re-mitigate

### Rank structure & progression → [principles/rank-structure.md](principles/rank-structure.md)

19 high-rank abilities are never JUST a number bump · 20 multi-ability ranks use the list format · 21 the preamble holds only prerequisites and whole-talent conditions, gateway talents need none · 24 Basic talents can grow R4–R5 organically without becoming Signature talents · 33 high-cooldown ability, earned recharge · 39 upgrade an ability with an added effect gated on success level, not a lower TN

### Wording & terminology → [principles/wording-conventions.md](principles/wording-conventions.md)

29 ground a genuine narrative-fact term with concrete examples the first time a talent names it · 30 procedural bookkeeping labels get natural language, not a capital letter · 31 "unprovoked" attaches to the move it describes · 34 no em/en dashes or semicolons in any game-facing talent text · 38 keep flavor out of the mechanical clauses · 40 cross-reference another rank's ability by name, not by a bare "(Rank X)" · 41 write fixed difficulties in TN notation

### Mechanical grounding & resolution → [principles/mechanical-grounding.md](principles/mechanical-grounding.md)

36 every ability states how it resolves, and does not simply switch a mechanic off · 37 no phantom equipment, and no generic omniscient-intel rolls · 42 a consumable benefit must spend a tracked resource · 47 when a talent's effect depends on vague, untracked prerequisite state, abstract it into a meta-currency

## Shared spell-design principle files that bind talent text directly

Talent ability text follows the same house conventions as spell text. Before writing any talent, these spell-design files apply as-is (read "spell" as "talent ability"):

| File | What it governs |
|------|-----------------|
| `../../spell-design/references/principles/wording-conventions.md` | General-application-first ordering, defined keywords referenced by name and never re-explained, durations as defined intervals, duration keyword next to the effect it governs, activation cost opens the sentence, house micro-conventions (minimum 0, signed banes), capitalize only named mechanics, narrative span ladders for non-combat reach, typed-rider wording |
| `../../spell-design/references/principles/gm-facing.md` | Bounded GM parameters, info-tier grounding, cross-subsystem validation |
| `../../spell-design/references/principles/conditions.md` | Condition definition checks, parameterized (X) values, consumed-key traps, kill-rider wording, no-roll trigger limits |

The most load-bearing of these are also ported with talent framing (principles 10, 11, 14, 18) so they are never missed.

## Appending a new principle

When the owner corrects or refines a talent design decision in session:

1. Take the next free number (currently next: **48**).
2. Append the full principle (numbered, bolded one-line rule, then the reasoning, then the owner-ruling provenance) to the **one** `principles/` file matching its primary concern.
3. Add its one-line hook to that concern's line list in the Index by Concern above (and to any secondary concern's list with a `*(home: <file>.md)*` note).
4. If it is frequently load-bearing, add its one-line hook to the short list in the Design Principles section of [../SKILL.md](../SKILL.md).
5. Update the "currently next" number in step 1. Never renumber.

Never move a principle between files without updating every `*(home: …)*` annotation pointing at it.

If a correction refines a *ported* principle, note the talent-side ruling in the concern file under the ported entry rather than editing the spell-design file — each skill owns its own provenance chain.
