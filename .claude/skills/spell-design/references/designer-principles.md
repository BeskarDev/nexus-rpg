# Designer Principles — Spell Design (Index)

Distilled from owner feedback — **binding rules, not suggestions**.

**How to use (don't read all 82 cold):** scan the Index by Concern below, pick the concern(s) matching your current task, and read that concern's file in full under [principles/](principles/). Each concern's principles live in the file named in its heading. A principle may be *listed* under more than one concern but its full text lives in exactly one home file — if a number isn't in the file you opened, grep `principles/` for `^NN.`. Numbers are global and stable, referenced from other docs — **never renumber**.

## Index by Concern

### Power & rank budget → [principles/power-budget.md](principles/power-budget.md)

5 R5 material cost ≥5000 · 10 AoE trades damage for targets · 13 wound-heal R4+ only · 17 fatigue-removal ceiling · 67 Life is the healing ceiling (non-Life heals strictly worse, extend Life's ladder first) · 20 material cost only when coins burn · 31 never scale a tier cap on Heighten · 39 teleport/travel ranks +1 tier · 43 falling/general-rule damage isn't a spell stat · 44 recurring zone damage is flat, all passive ticks write (ignore AV) *(home: aoe-zones-targeting.md)* · 50 weapon-attack spells add damage at the half column · 51 no Durability/attrition riders at R0 (at-will) · 65 R4+ transformations are ability suites with a self-driven engine, never flat-rider stacks · 66 ±1 modifier packages are R1–R2; R4 control needs punishment + isolation teeth · 56 psychic (ignore AV) prices at the half column · 58 multi-hit prices each hit at the half column · 59 repeat-attack engines state their Action cost · 60 blast always ignores 1/2 AV, annotated inline · 75 R5 coin cost set by mechanical tempo (ends-with-scene = no cost; lasting rite = cost), not fictional grandeur · 76 rest-acceleration shortens a rest, never adds one · 77 a granted immunity needs a circumvention (act aggressively → drop to resistance) · 81 rest magic tops out at a night's rest, full rest belongs to safe havens · 85 flat "X damage" ticks still take flat modifiers (Spell Catalyst), only forgo Spell Power

### Scope, setting & exploits (what a spell may do) → [principles/scope-setting.md](principles/scope-setting.md)

1 assist never bypass · 6 traits are thematic seeds · 12 limits live in fiction not game structure · 16 HP is encounter-scale only · 21 a classic name obligates the classic's action · 33 weigh worldbuilding implications · 36 synergies diegetic not rotational · 37 disturbance saves, not cheap safety nets · 38 remove a reverting state rather than patch exploits · 79 standing effects yield only to an equal-rank dispel, clause closes the effect block · 40 casting needs a verbal component (silence interaction) · 61 the name is a promise (effects match name, name covers all modes) · 72 cross-sphere travel needs a Quality 6+ attuned object (reusable material focus) · 83 talent interactions gate in the talent (Communal Practices model), never per-spell disclaimers

### Success Levels & Heighten → [principles/success-levels-heighten.md](principles/success-levels-heighten.md)

2 SL scales magnitude not effect type · 18 Heighten upscales, never transforms · 24 a flat single-success effect is often right · 25 optional modifiers go on Heighten not SL · 26 Heighten cascades to R5 · 32 every Heighten rank is self-contained

### School identity & completeness → [principles/school-identity.md](principles/school-identity.md)

3 heighten don't duplicate · 4 standardized reactive defense · 7 arcane defiles / mystic honors · 8 binding means containment · 9 every school internally complete · 11 no R0 Quick Action healing · 19 school analysis drafts are stale · 48 name the school's own skill (Mysticism/Arcana) · 63 chassis-family slots don't converge on one mechanic, and stay in tier budget · 86 Evocation flavor is transgressive (force/wrench/seize), never Tempest's natural flow

### AoE, zones, walls & targeting → [principles/aoe-zones-targeting.md](principles/aoe-zones-targeting.md)

10 AoE trades damage for targets *(home: power-budget.md)* · 35 barriers need durability stats, never impregnable · 42 placed-hazard-zone resolution (fixed TN + save/compare) · 44 recurring zone damage is flat, all passive ticks write (ignore AV) · 45 range distance IS the zone radius · 46 use Lightly/Heavily Obscured properties · 55 one roll per cast, but delayed spreads reroll fresh per trigger · 74 vs.-column AoEs never restate the comparison in text · 82 dual-mode (ally + enemy) spells cast at a fixed TN, result reused vs. enemy Resist · 84 non-zone utility/self casts use Medium (8) at R0–R1, not the zone `6+2×rank` formula

### Effect wording & house conventions → [principles/wording-conventions.md](principles/wording-conventions.md)

14 shared rules visible at point of use · 15 general application first, exceptions after · 22 don't invent rules terms (incl. creature types) · 23 no semicolons or em/en dashes · 30 creatures are they/them, never it/its · 34 house micro-conventions (min. 0, signed bane, etc.) · 41 physical is the default damage type · 47 durations must be defined time intervals · 49 strike property carries the weapon-strike procedure (attack wording, Target Special) · 52 current subsystem terms (carrying capacity, not encumbrance limit) · 53 defined keywords referenced by name, never re-explained · 54 self-referential riders say "including this one", flat failed-save ticks · 57 all blunt impact ignores 1/2 AV, written directly (never "crush damage") · 62 duration keyword sits next to the effect it governs · 69 capitalize only named mechanics · 70 activation costs open the sentence, effect follows, never properties/conditions/area properties · 71 non-combat reach/spans use the narrative keyword ladders (a thousand paces, a day's march, region, sphere; one moon, season, year)

### Info-gathering & GM-facing → [principles/gm-facing.md](principles/gm-facing.md)

27 validate against talents/subsystems · 28 ground info tiers in real anatomy · 29 give the GM bounded parameters, never "GM decides"

### Conditions & their intent → [principles/conditions.md](principles/conditions.md)

64 distracted's non-creature sources are deliberate (full-power misdirection) · 68 keyed riders never duplicate their keys or a weakness the damage type already exploits · 73 check every condition against its definition; parameterized conditions carry their (X), never a bare adverb · 78 keyed bonus damage replaces the SL column ("deal X instead"), never adds a rider · 80 never key on a condition the attack consumes (marked); kill-riders say "slain", never "reduced to 0 HP"

## Appending a new principle

When the owner corrects or refines a design decision in session:

1. Take the next free global number (currently next: **87**).
2. Append the full principle (numbered, bolded one-line rule, then the reasoning, then the owner-ruling provenance) to the **one** `principles/` file matching its primary concern.
3. Add its one-line hook to that concern's line list in the Index by Concern above (and to any secondary concern's list with a `*(home: <file>)*` note).
4. Update the "currently next" number in step 1.

Never renumber, never move a principle between files without updating every `*(home: …)*` annotation pointing at it.
