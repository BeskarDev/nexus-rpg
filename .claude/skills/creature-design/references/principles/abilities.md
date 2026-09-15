# Abilities, Conditions & Triggers

Part of [designer-principles.md](../designer-principles.md); numbers are global and never renumbered.

Read before **workflow step 4** (abilities), and again before any Elite or Lord trigger. Most rejected designs fail here.

**Attack principles moved out**: 23, 41 and 44 live in [attacks.md](attacks.md), loaded at **step 3**.

## In this file — What it can do

| # | |
|---|---|
| **8** | Check every condition against its published definition; parameterized conditions carry their (X). |
| **9** | High-impact conditions never ride automatic, no-roll triggers. |
| **16** | Condition escalation prices a disable instead of banning it. |
| **17** | Bonus damage comes in three rungs, and they are rungs, not a right answer. |
| **10** | Defensive abilities and immunities need counterplay. |
| **11** | Limits live in the fiction, not game structure. |
| **18** | `briefly` and `short` are the two in-combat durations, and the choice is deliberate. |
| **24** | Check the universal Action and Quick Action lists before writing an ability. |
| **26** | Every trigger opens `When this creature suffers a Wound, …`, and Lords take the ordinal. |
| **27** | An Elite or Lord Trigger escalates. It is never a downgrade, and never a rule the game already has. |
| **35** | A leash is a rare feature, and it must never be a firing position. |
| **36** | The acting creature rolls, one roll may be read against several Defenses, and no roll beats one. |
| **46** | Write an ability's clauses in resolution order, and make the second effect the payoff of the first. |
| **53** | A condition's end clause has to cost something the target chooses to pay. |
| **54** | A gated line is measured against the batch's ungated lines, not against its own tier figure. |
| **55** | The ability budget is the action economy, not a slot count. |
| **57** | A rider that undoes the creature's own plan is not a rider. |
| **59** | The identity effect fires on ANY success. The success level sets its degree, never whether it happens. |
| **60** | The category buys turn density. Count live options, not card entries, and the second effect is never a second attack roll. |
| **61** | Resolve is a second currency, and a **LORD ONLY** one. One signature ability may be priced in it. |
| **43** | A trait must act in the encounter, or it is lore wearing a slot. |
| **45** | The qualifier is one word. The limiter is the last sentence. This keeps being got wrong. |
| **49** | Never cancel a universal player option. Add pressure instead of removing a choice. |

**Numbers are global and never renumbered, so this file is ordered for reading rather than by date.** Full text below in the same order.

**8. Check every condition against its published definition; parameterized conditions carry their (X).** Never reason about a condition from its name or its D&D counterpart — open `docs/05-combat/04-conditions.mdx` and design against what it actually does. The canonical trap: Nexus **stunned** does not disable a creature (they still move or act, at +1 bane); full incapacitation is **paralyzed** alone, which sits a full severity tier higher and needs harsher gates (rolled, limited, repeat-save escape valves). Write "poisoned for a short duration" with the save spelled out, "burning (4)", never a bare adverb.

**Read the condition a second time, for what it already grants the attacker.** `stunned`, `paralyzed`, `prone` (against melee) and `distracted` all hand attackers **+1 boon** in their own text, so an ability reading *"gain +1 boon against a stunned creature"* is double-dipping — and it pays badly, because the **first** boon is 2d6-take-higher (about +1.9) while *"Multiple boons or banes beyond the first add a +1 bonus or -1 penalty"*. The Ghoul's `Feeding Frenzy` was worth +1.9 against a dazed target and +1.0 against a stunned one, so it got **weaker as the creature got better**, inverting the escalation it was built to reward. When an ability rewards a condition, pay in a currency that condition does not already spend: flat damage, movement, an extra target, ignoring AV. *(Owner ruling, 2026-08-10, D-075.)* *(spell principle 73; talent principle 26)*

**9. High-impact conditions never ride automatic, no-roll triggers.** A creature ability that inflicts frightened or stronger gives the target a save (Attribute + Skill vs. the ability TN) or requires the creature to hit with a rolled attack. Automatic on-proximity or on-turn-start hard control with no counter-roll is oppressive at the table. Low-impact conditions (distracted, briefly slowed) may ride passively. *(spell principle 88; talent principle 9)*

**16. Condition escalation prices a disable instead of banning it.** A rider applies a lesser condition, and applying it again to a target already suffering it upgrades to the greater one — `stunned` then `paralyzed` is the canonical pair. This costs two strong-or-critical hits rather than one roll, gives the party a visible warning round, and leaves two counterplays (clear the lesser condition, or do not let the creature land a second good hit). Escalate one impact band, never two. Reach for this whenever a creature's concept demands a disable, rather than removing the creature's identity. *(Owner ruling, 2026-08-09, D-029.)*

**The requirement is an escalation, not a count of rolls**, so there are TWO legal shapes and the second is often the better card. (a) **Across two hits**, as above. (b) **Across the success level of one roll**: a plain success applies the lesser condition and a strong or critical adds the greater one. The Mummy's `Dread Gaze` is the canonical example of (b) — *briefly frightened, and on a strong or critical success also briefly paralyzed* — and it is **less** probable than (a) while spending one line instead of two. What D-029 forbids is a full disable landing off one undifferentiated hit; a roll whose outcomes already grade satisfies it. **Shape (b) is also what principle 59 requires of an effect the creature is NAMED for** — there, the ladder is mandatory rather than optional, because a gate on the identity means the creature spends most of the fight not being the creature. Pair (b) with a counterplay the party can bank: the gaze grants scene-long immunity to anybody who shrugs it off once. *(Owner ruling, 2026-09-07, D-151.)*

**17. Bonus damage comes in three rungs, and they are rungs, not a right answer.** (a) A **flat `+N`** on a stated prerequisite, where N is at most half the tier's weapon damage — legal only with a real prerequisite, since a bonus for something the creature was doing anyway is not a cost. (b) A **costed attack**: `+1 weapon damage`, but the creature skips all Movement this turn, *before and after the attack*. (c) An **SL escalator**: `+1 boon`, and on a hit increase the success level by one step, gated behind a geometric prerequisite the party can deny. The escalator is the most powerful and is priced as such; the flat bonus remains correct for a smaller effect. Costed attacks suit heavy hitters, where trading mobility for impact is what the creature already is. *(Owner rulings, 2026-08-09, D-021, D-022.)*

**10. Defensive abilities and immunities need counterplay.** Every defensive ability leaves an opening: a limited frequency (once between turns), a stance the party can break, a fictional bypass (fire negates the regeneration), or degradation under pressure. Blanket immunity with no circumvention is an invisible invincibility wall — and a single-use "I win" ability is the same mistake on offense. Effects must be counterable in both directions. *(spell principle 77; talent principle 5)*

**11. Limits live in the fiction, not game structure.** Creature ability restrictions are diegetic: terrain (sandy ground, water, darkness), state (below half HP, enraged, first pool depleted), equipment, time of day. Never scope to meta-constructs ("only during encounter turns"). Per-scene/between-turns frequency limits are the sanctioned pacing exception, stated plainly. *(spell principle 12; talent principle 12)*

**18. `briefly` and `short` are the two in-combat durations, and the choice is deliberate.** `briefly` is one turn; `short` is the rest of the fight. A rider that fires on most hits wants `briefly`, or the fight fills with permanent conditions by round three; a signature effect meant to shape the encounter wants `short`. A third form is legal and often best — **name the end condition inline** when it is something the party *does* ("until they escape", "until they spend a Quick Action to brush off the scarabs"), because that is counterplay and a duration in one clause. **Never spell `briefly` out longhand** as "until the end of their next turn": that is imported phrasing for a duration Nexus already has a keyword for.

**A `briefly` condition does not also need a frequency limiter.** One turn means it cannot stack, cannot
persist and cannot compound, so `once per scene` on top is a second lock on the same door — a thing for
the GM to remember that changes nothing about what happens. **Reserve frequency limiters for effects that
last, that repeat damage, or that would otherwise fire every turn to real advantage.** Caught on the Cult
Priest's `Grave-Smoke`, which briefly blinded, rolled for it *and* capped itself once per scene.
*(Owner ruling, 2026-08-11, D-121.)*

**Word order is fixed: the duration goes BEFORE the condition.** `briefly dazed`, `briefly stunned`, `briefly poisoned` — never `dazed briefly`. Both orders are correct English and the published corpus is not close: **hundreds of uses of `briefly <condition>` against a single instance the other way** across docs and data. This is principle 19 applied to the commonest phrase in the whole bestiary, so it is worth stating rather than trusting an ear: a GM who has read `briefly dazed` hundreds of times should recognise the phrase, not re-parse a variant of it. The longer durations keep their own published form — `for a short duration`, not `shortly`. *(Owner confirmation, 2026-08-09, milestone 04 §1.1; word order ruled 2026-08-10, D-074.)*

**24. Check the universal Action and Quick Action lists before writing an ability.**
`docs/05-combat/01-combat-scenes.md` gives every creature `Protect Ally`, `Help`, `Evade`, `Guard`,
`Opportunity Attack`, `Defend`, `Grapple`, `Disarm` and `Dash`. An ability restating one spends a slot on
something the creature could already do free. The Band-Leader's `Take It On The Shield` was `Protect Ally`
reworded **badly**: the published version has the attacker re-roll against the protector's Defense, so
stepping into a blow can fail, where the hand-written one silently transferred a hit that had landed.

**An ability overlapping a universal action should improve it, not replace it**, written as a Passive —
*"When this creature uses Protect Ally, they take half the damage"*. That earns the slot, keeps the
published sequencing, and gives the GM one rule instead of two similar ones.

**A `Quick Action` qualifier already means "once between your turns"** — the published rule is
*"You can use one Quick Action on your turn or between your turns"* — so `(Quick Action, once between your
turns)` charges the creature twice for one restriction. That is the universal-action half of the limiter
rule; **placement and which qualifiers may carry a limiter at all are principle 45's**, and the table lives
in [../stat-tables.md](../stat-tables.md#where-a-limiter-goes--the-last-sentence-of-the-effect-never-the-qualifier).

**If a Passive needs a frequency cap, gate its trigger instead.** `Feeding Frenzy` went from *"(Passive,
once between your turns). When this creature hits a dazed creature…"* to *"(Passive). On a strong or
critical hit against a dazed creature…"*, fixing the category error and a hidden second defect at once —
**`once between your turns` names the off-turn window**, so on a Passive triggered by the creature's own
attacks it limited nothing. *(Owner rulings, 2026-08-09 and 2026-08-10, D-077.)*

**26. Every trigger opens `When this creature suffers a Wound, …`, and Lords take the ordinal.** "Loses their first life pool" is **jargon from this skill and the old analysis document**, not rules text — `02-creature-rules.md` only ever says a creature *suffers a Wound* and *regains all of their HP*. A stat block speaks the published vocabulary or the GM has to translate it at the table.

An **Elite** needs no ordinal, by arithmetic: it has two Wounds and the second one kills, so exactly one Wound can trigger anything. A **Lord does** — `their first Wound`, `their second Wound` — because three Wounds against two mandatory triggers would otherwise fire both twice and dump the creature's entire second act on the table at once. Staged ordinals turn the two required triggers into an escalation, which is what the category is for.

The broader habit this is an instance of: **design vocabulary and published vocabulary are different registers, and only one of them goes on a card.** Life pools, chassis, rungs, and tier-adjustment are how designers talk to each other. Wounds, HP, boons and Success Levels are how the game talks to its table. *(Owner ruling, 2026-08-09.)*

**27. An Elite or Lord Trigger escalates. It is never a downgrade, and never a rule the game already
has.** The category exists to declare the second half of a fight: a power surge, an ability unlock, an
environmental change. A trigger that makes the encounter *easier* — allies flee, a defence drops, the
creature disengages — inverts the category's one job, however well it reads as fiction. *"It shifts combat
dynamics"* is true of any change and is not the test. **The test is whether the party is in more trouble
after it fires than before.**

**Check the published rules first.** A band breaking when its leader falls is **Morale**, which already
fires when *"all elite creatures or lords are dead or otherwise removed from the fight"*. Writing that as a
trigger spends the creature's defining slot restating a rule every GM already runs.

**State a state, never choreography.** A trigger saying *what the creature does* — throws its shield aside,
leaps to the altar — makes every copy perform the identical beat. Write what is now **true** of the
creature. The side benefit is reuse: a state-shaped trigger drops onto any creature of its kind.

**Express the surge in boons, banes and flat damage — never in AV or Defense.** "Their AV becomes 1" or
"+2 Parry for the rest of the scene" hands the GM a floating number to re-apply every round. Boons and
banes are applied once at roll time by whoever is rolling; flat damage is added once on a hit.
`Blood Up` is the model: **+1 boon on its melee attacks, +1 boon on melee attacks against it, +2 damage on
melee hits** — more dangerous and easier to kill, three clauses, no bookkeeping, and the flat bonus sits at
principle 17's rung-1 cap.

**The opening clause explains the cost**, and is not mood-setting before the numbers. *"They stop fighting
carefully"* is accurate and dead; *"the rage takes them and they stop caring whether they live"* is the
same rule with the drawback made self-evident. *(Owner rulings, 2026-08-09.)*

**35. A leash is a rare feature, and it must never be a firing position.** A creature that will not
pursue past a point is a good design and a bad default. **Seven of the first thirteen creatures had
one**, which is the rate at which it stops characterising anything and starts reading as a house style.
Before writing another, check what fraction of the roster already has one.

When a creature does have a leash, it passes three tests:

1. **Big enough not to be kited.** Ranged weapons reach a long distance and the leash bands are
   `close`/`short`/`medium`/`long`. A leash of a room, a corner or a `close` radius is an instruction
   for shooting the encounter from the next doorway. Prefer the largest boundary the fiction supports:
   the burial ground rather than the grave, the chamber floor rather than one corner of it.
2. **The objective sits inside it.** The cleanest answer to the exploit is that standing outside the
   leash wins nothing. Everything worth taking is on the floor the clay servants are standing on, so a
   party that backs into the corridor is safe and is also leaving empty-handed. Say so in `tactics`,
   because the GM is the one who has to hold the line on it.
3. **Or the creature answers being shot.** It advances as a unit, it has a ranged option, it takes
   cover, it calls something, it goes away and comes back. A drilled line does not chase individuals
   and it does walk down an archer.

**A leash the party can simply stand outside of and win is not counterplay, it is a solved encounter**
(principle 10 from the other direction). Counterplay costs the party something. Cheese costs them
patience.

**A binding may cost the creature instead of forbidding the movement, and on anything divine or bound it
should.** A mundane guard who will not leave their post is a **tactics note**, not a mechanic. A creature held
to a place by something — a god, a rune, a grave — can be *weakened by distance from it* on a band gradient
(+1 bane past medium, +2 and the loss of its signature past long). That turns the leash from a wall into a
**second win condition the party can play for**, and it needs a **bait the fiction supplies**: the Kusarikku
leaves its threshold only to put back somebody who got past it, which the party has to earn. Use published
banes rather than inventing attrition (D-172).

**The mechanical leashes are exempt from the frequency worry, not from the tests.** `Grave-Bound` is a
published ability with a stated `medium` distance, and it is the creature's whole identity plus its
Treat. The problem is the *lore* leash written by reflex into `tactics` because the creature felt like
it should have one. *(Owner ruling, 2026-08-11, D-086.)*

**36. The acting creature rolls, one roll may be read against several Defenses, and no roll beats one.**

**(a) Whose roll.** Prefer a roll made by the creature taking the action over a roll asked of each target.
When an effect reaches several creatures, **make the roll once and compare it against each target's
Defense**. The published spells are the model: a static TN to get the spell off, then one result compared
against each Defense for the lasting effect.

| ❌ | ✅ |
|---|---|
| "Each creature in the space rolls Agility + Athletics vs. TN 9. On a failure, they fall prone" | "Roll Strength + Athletics vs. Dodge against each creature in the space they are thrown into. On a success, the throw ends against that creature" |

It keeps the turn with the creature whose turn it is instead of four interruptions inside one action, it
costs one roll rather than N, and it reads against Dodge / Parry / Resist — the scale the whole system is
calibrated on — instead of a bespoke TN on a bystander's skill.

**(b) How many rolls, and the ladder runs against the instinct to be fair:**

| Rung | Cost at the table | Use it for |
|---|---|---|
| **1. Gate on the success level of a roll already made** | **nothing** | Most riders and small reactive effects. `On a strong or critical hit, …` |
| **2. Read that same roll against a second Defense** | one comparison | An effect landing on **someone other than the attack's target** — the Ogre's `Hurl` |
| **3. A fresh roll** | a full resolution step | Effects big enough to deserve their own moment, and abilities with no attack in front of them |

**Rung 1 is the default and rung 3 must be argued for.** The question is never *"would a roll be fairer"*,
it is ***"has the table already decided this?"*** — after an attack, it usually has.

❌ `(Quick Action). When this creature hits with their Censer, roll Spirit + Mysticism vs. the target's
Resist. On a success, the target is briefly blinded. Once per scene.`
✅ `(Quick Action). On a strong or critical hit with their Censer, … the target is briefly blinded.`

**And reach for a published condition before writing a consequence.** `pushed` already gives falling damage
to the target and to whatever they hit, and the falling rules knock both prone. An ability that says "the
target is pushed a short distance" inherits all of it. *(Owner rulings, 2026-08-11, D-093 and D-121.)*

**46. Write an ability's clauses in resolution order, and make the second effect the payoff of the
first.** Two rules that keep landing on the same abilities, because a reactive Quick Action almost always
does two things at once.

**(a) Resolution order.** An ability that both modifies an attack and moves somebody resolves the
**attack modifier first**, against a stationary target, and the movement afterwards. Moving the target
*before* the attack resolves leaves the table asking whether the attack still reaches — a question the
stat block must never hand a GM mid-roll.

**(b) Gate the second effect on the first one working.** When a Quick Action does two things, make the
second the **payoff** of the first rather than a parallel benefit. It becomes one readable sentence of
cause and effect, and spending the Quick Action becomes a gamble instead of a guaranteed two-for-one.

| ❌ | ✅ |
|---|---|
| `When an ally within short range is attacked, that ally moves up to a close distance toward this creature **and** the attack suffers +1 bane.` | `When an enemy attacks an ally within short range of this creature, that attack suffers +1 bane. **If the attack fails**, that ally immediately moves up to a close distance toward this creature **unprovoked**.` |

**If an ability moves a creature, decide whether the movement is `unprovoked`** — it is a published
keyword: *"Movement described as unprovoked doesn't trigger an Opportunity Attack or any other reaction"*
(`docs/05-combat/03-distances-movement.md`). Omitting it on a pull toward safety hands a free Opportunity
Attack to the enemy the ability just defeated, which inverts what the ability is for. *(Owner ruling,
2026-08-11, D-123.)*

**43. A trait must act in the encounter, or it is lore wearing a slot.** `creature-traits.json` is shared
with the companion rules, and several of its entries exist for **companion utility** — carrying gear,
travel speed, being a mount. Those do nothing on a monster a GM runs for three rounds, and putting one on
a stat block spends a slot to say something the lore already says better.

The worked example, `Powerful Build`, is in [../case-studies.md](../case-studies.md#p43).

**The test:** *would this trait ever change what happens in a fight, a chase or a scene the party is in?*
If the honest answer is no, cut it and let the lore block say it in a sentence.

**Fix the shared text rather than working around it.** `Powerful Build` also still used pre-`carrying
capacity` vocabulary ("encumbrance and over-encumbrance limits"), which no published rule has said for a
while. Shared data is corrected in place, because companions and creatures read the same file.
*(Owner ruling, 2026-08-11, D-104.)*

**45. The qualifier is one word. The limiter is the last sentence. This keeps being got wrong.** The
`qualifier` field says **what kind of action this is** — `Passive`, `Action`, `Quick Action`,
`Elite Trigger`, `Lord Trigger` — and **nothing follows it**. A frequency cap is written as the **final
sentence of the effect text**.

| ❌ | ✅ |
|---|---|
| `**Spellcasting** (Action, once per scene each). This creature can cast …` | `**Spellcasting** (Action). This creature can cast … **This creature can cast each of these spells once per scene.**` |
| `**Searing Breath** *(recharge (d4))*. 12/18/24 fire damage.` | `**Searing Breath** (Action). … 12/18/24 fire damage. **Recharge (d4).**` |
| `**Feeding Frenzy** (Passive, once between your turns). …` | `**Feeding Frenzy** (Passive). On a strong or critical hit, …` — a Passive cannot be limited, so gate the trigger |

**Why the text and not the badge.** The qualifier is scanned, not read: a GM looks at it to know whose
turn this happens on. The limiter is a rule, and rules belong in the rules sentence.

**A COST is not a limiter and goes the other way — first.** *"Once per scene"* answers *how often*;
*"by spending 1 Resolve"* answers *what it takes*. Costs open the sentence
([spell principle 70](../../../spell-design/references/principles/wording-conventions.md), principle 61),
limiters close it. An ability can carry both, and then it is cost first, effect, limiter last.

**This is the most repeated error in the programme** — three times, because the skill itself stated the
wrong rule and the renderer supported it ([case study](../case-studies.md#p45)). It is now
machine-checked by the generator. *(Owner rulings, D-077 and D-107; D-107 reverses D-077's placement
while keeping which qualifiers may be limited at all.)*

**49. Never cancel a universal player option. Add pressure instead of removing a choice.** Principle 10's
sharpest special case, pointed at the *player's* side of the table: **an ability must not switch off
something every character can always do.** Disengaging, hiding, taking cover, standing up, Dashing,
`Protect Ally` — those are the universal outs, and most of what a player has to answer a monster with.

> ❌ **Run Them Down** (Passive). When an enemy within melee range uses Movement to leave that range, this
> creature immediately moves up to a close distance toward them unprovoked.

Nothing about it is illegal — no invented rule, no restated universal action, composes correctly with
`Opportunity Attack`. It is still wrong, because a melee character who decides to break off from an orc
now cannot, for free, forever.

> ✅ **Charge In** (Quick Action). This creature gains 1 additional Movement this turn. They must use it to
> move closer to an enemy they can see.

Same creature, same fiction, paid for with the creature's own resources.

| The test | |
|---|---|
| **Does it remove an option, or add a cost?** | Removing is out |
| **What does the creature spend?** | Its Quick Action — so charging now trades against `Opportunity Attack`, `Protect Ally` and `Evade`, which is the choice the Passive destroyed |
| **Improvement on a universal action, or replacement?** | `Dash` is a published **Action** doubling Movement. A direction-restricted **Quick Action** version is cheaper and narrower, which is principle 24's sanctioned relationship |

**Passive is the smell** — a free always-on effect triggered by something the party does costs the creature
nothing and so has nowhere to be counterplayed.

**A mechanic that punishes a player choice is fine; one that voids it is not.** `Braced Spear` punishes
leaving a veteran's reach with a harder Opportunity Attack, and the player still decides whether to eat it.
*(Owner ruling, 2026-08-14, D-130.)*

**53. A condition's end clause has to cost the target something they choose to pay.** `suffocating`,
`burning` and the rest of the open-ended conditions carry no published duration, and principle 18 lets the
ability name one inline. **It does not license a free one.** The Edimmu Shade's first draft ended its
`suffocating` *"when they end a turn outside this creature's melee range"*, and
`03-distances-movement.md` gives **moving out of melee range free once a turn**, with 1 Movement covering a
short distance — so the creature's entire design was opt-out at no cost, on any target that had read the
movement rules.

**Three end clauses that work, in ascending order of what they ask:**

| Clause | The party pays |
|---|---|
| **A published duration** — `briefly`, `for a short duration` | Nothing directly, but the condition is now *the fight's problem*, which is what makes the rest of the kit matter |
| **A stated action** — the condition's own removal clause, where it has one (`burning`: an Action and an Agility + Athletics roll) | **A turn.** The strongest currency on the table and the one a GM can see being spent |
| **Killing the source** — *"this condition ends early if this creature is destroyed"* | **Target priority.** It turns one creature into the thing the party has to deal with first |

**The last one is usually the best answer for a signature condition**, because it is counterplay
(principle 10) that costs nothing to write, reads as fiction rather than as a rule, and gives the GM a
reason to expect the party to focus the creature. **Write the end clause by asking what it makes the party
DO** — if the honest answer is "take one step", it is not a clause. *(Owner ruling, 2026-09-07, D-155.)*

**54. A gated line is measured against the batch's UNGATED lines, not against its own tier figure.** D-116
lets an attack gated behind a condition take the full tier weapon damage, and that is correct as an
accounting rule. It is **not** an argument that the gated attack is worth building. The Edimmu Shade's
`Take the Warmth` needed a prior round, a strong-or-critical hit, and a condition that survived the target's
movement — and it paid **7.45/turn against the reference martial, which is exactly what the Mummy's ungated
fist pays**. A gate that buys the figure everybody else gets for free is a **tax on the GM**, and it reads at
the table as the creature not working.

> **The check: put the gated line in the same table as the batch's plain attacks.** If it is not visibly
> better than the best ungated line in the batch, either the gate comes off or the payoff changes kind —
> healing, a second condition, ignoring armor, an extra target. **Do not raise the damage to fix it**; that
> is how a two-stage combo becomes the hardest line in the batch.

The Shade's fix was a change of kind: the gated *attack* became a gated **Passive** that feeds the creature
6 HP, so the setup pays in something the plain attack cannot give at all. *(Owner ruling, 2026-09-07,
D-155.)*

**55. The ability budget is the ACTION ECONOMY, not a slot count.** The category table says how many
abilities a creature may have. It does not say how many it can *use*, and those are different numbers: a
creature has one Action, one Quick Action and its Movement per turn, so **three abilities that all cost the
Action are one ability and two decorations**. The Edimmu Shade had a touch, a gated attack and an Action
ability competing for the same slot, no Quick Action at all, and the third option measured **0.83 damage a
turn** — a line on the card that a GM would never correctly choose.

**The hard budget is one Action and one Quick Action, and a Lord's second turn does not add a second Quick Action.** Principle 60 holds the figures and what a category buys with them. The consequence here is that a proactive Quick Action and a reactive one compete for a single slot: allowed, often the best thing in a design, but it has to be **written down as the dilemma** rather than counted as two abilities the creature gets to use.

**Count the kit by slot before writing the text:**

| Slot | What belongs there |
|---|---|
| **Action** | The attack, and at most one genuine alternative to it that does something the attack cannot |
| **Quick Action** | The creature's **one** second effect — proactive on its own turn (principle 60b) or reactive: a conditional second attack ([principle 41](attacks.md)), a defence, a follow, a leash. Not both |
| **Free** | Riders on the attack, and **Passives**, which is where an effect goes when it must not compete |

**When an effect is worth having but not worth a turn, make it a Passive or an attack rider.** That is what
turned `Take the Warmth` from a second attack into a feed, and it is why the Furnace Effigy's aura is a
Passive rather than an Action. **A Basic with one attack, one rider, one Passive and one Quick Action has
four things and spends none of them fighting itself.** *(Owner ruling, 2026-09-07, D-155.)*

**57. A rider that undoes the creature's own plan is not a rider.** Before adding an effect to an attack,
read it against **what the creature is trying to do for the rest of the fight**. A rider that fights the
kit costs real damage to make the creature worse at its own job, and it is invisible in review because
each half is individually correct — `pushed` is a published condition, a stone fist plausibly knocks people
back, and the arithmetic checks out.

**The Furnace Effigy is the worked example.** It is a **grinder**: its aura punishes anybody standing next
to it, its cone reaches close range, and `Slow Movement`-grade mobility means it cannot chase. It wants
targets **near** it. So the two thematic riders both fail:

| Rider | Why it fails on THIS creature |
|---|---|
| `pushed` | Shoves the target out of the aura and out of the cone, and the creature cannot follow. It spends damage to undo its own positioning |
| `prone` | Costs the target a turn and hands **every melee attacker +1 boon** against the thing that is already easy to hit (principle 8's double-dip, pointed at the party's favour) |

**The check is one question: after this rider resolves, is the creature closer to or further from the fight
it wants?** Same question for a slow on a guardian that goes nowhere, a fear on a creature whose whole kit
is melee reach, or a grapple on a skirmisher that wants to leave. Where the answer is *further*, the honest
move is **no rider** — a plain line is not a gap in a design that carries its identity elsewhere
(principle 15's Slinger case, D-073). *(Owner question, 2026-09-07, answered against the Furnace
Effigy's kit.)*

---

**59. The effect the creature is NAMED for fires on any success. The success level sets its degree, never
whether it happens at all.** Gating the identity behind a strong or critical hit means the creature spends
most of the fight not being the creature. The draft Kusarikku was a doorkeeper whose `Cast Out` threw you
out of the door *on a strong or critical hit* and merely hit you the other two thirds of the time, so the
thing the whole design existed to do showed up in roughly one turn in three.

**The fix is the ladder, not the gate.** Principle 16 already says a condition may escalate across the
success level of one roll. Point it at the identity:

| | Draft | Fixed |
|---|---|---|
| success | damage only | thrown a **short** distance — **out of the doorway**, which is one area (counts as pushed) |
| strong or critical | damage, pushed close | thrown a **medium** distance instead, well clear |

**The distance had to be checked against the map, not just against the ladder.** A *close* push looks like
the natural bottom rung and is wrong here: a close distance is **0 areas**, so the target would still be
standing in the doorway and the doorkeeper would have failed at its one job on a plain success — the very
gate this principle exists to remove.

Every rung now does the creature's job and the dice decide how emphatically. The gate is still the right
tool for a **secondary** effect riding a plain attack — a disease, a curse, a condition the creature is not
named for. It is the wrong tool for the headline.

**A corollary: if the headline effect fires on every success, it usually should not also carry the tier's
damage figure.** `Cast Out` became a Quick Action push with no attack roll and no damage at all, because a
guaranteed ejection plus 11/17/23 is two payloads. Trading the damage for reliability is the exchange that
makes the ladder affordable. *(Owner ruling, 2026-09-14, D-164.)*

---

**60. The category buys TURN DENSITY, and the currency is verbs, not attack rolls.**
`02-creature-rules.md` grants the width — Basic 1-2 attacks and 0-3 abilities, Elite 2-3 and 2-4, Lord 3-5
and 3-6 — and those counts are **published and not restated here**. What a count cannot do is tell a good
kit from a padded one, because **it counts card entries and the creature spends slots**. All three
published Elites are legal and thin: two attacks differing only in a damage figure, two reactive Quick
Actions fighting over one slot, nothing on the Action but the attack.

| | Action | Quick Action | Free |
|---|---|---|---|
| per turn | 1 | 1, **on your turn or between your turns** | riders, Passives, Movement |
| **Lord, per round** | **2** — the second turn at half Initiative | **still 1** | as above |

**A Lord's second turn does not carry a second Quick Action** (D-165). RAW could be read either way off the
regain clause; the ruling is one, so a Lord's reaction is scarce exactly when it has most to react to.
Principle 61 is the release valve, not a second slot.

**a. An attack counts toward the range only if it is a live option** — different range band, target set, or
rider. **Two attacks differing only in a damage figure are one option printed twice.** Both edges are
defects: an option that is *never* best is decoration, and one that is *always* best makes decoration of
everything beside it. Same test for two abilities competing for one slot.

**b. An Elite or Lord produces TWO effects every turn, and the second is never a second attack roll.**
Principle 41 bans a second *attack*, not a second *effect*. Three channels, in the order to reach for them:

| Channel | Worked example |
|---|---|
| **Proactive Quick Action** — a non-attack effect used on its own turn, every turn | The Mummy: `Rotting Fist` on the Action, `Dread Gaze` on the Quick Action. D&D's *Multiattack* in Nexus vocabulary, with no second attack roll |
| **Attack rider** — the second effect rides the first and costs nothing | A disease, a grapple, a push on the hit that was happening anyway |
| **Passive engine** — it ticks without being spent | An aura, an on-hit retaliation, a feed |

**A Basic does one thing a turn, and that is intended** *(owner ruling, 2026-09-14)*. This bar is Elite and
Lord only.

**c. A Lord needs a setup-to-payoff pair on its menu.** Two turns a round means a flat menu gets used
twice, and *"vary your turns"* is an instruction to the GM rather than a design. **One option creates a
state, another exploits it** — a grapple and an ejection, a zone and a drive-into-it, a mark and a punish,
a summon and an order. Elites benefit from a chain; Lords require one. *(Owner ruling, 2026-09-14, D-165.)*

**61. Resolve is a second currency, and only a LORD may spend it on an ability.** A Lord starts a scene
with **3 Resolve**, an Elite with **1**, and the published use is a re-roll. A **Lord's** ability may charge
Resolve instead, and the cost is real: every point spent is a re-roll it does not get on the roll it most
needed. **This is the sanctioned way around the one-Quick-Action budget, and the only one.**

**An Elite never gets one** *(owner ruling, 2026-09-14)*. One Resolve is one re-roll, so the spend is not a
choice — it is a once-a-scene ability with a hidden tax. An Elite's density comes from principle 60b's
everyday channels. Three points is what makes it a decision: this ability now against a re-roll later,
three separate times in a fight.

**The cost OPENS the effect text. It is not a limiter and does not go last.**
[Spell-design principle 70](../../../spell-design/references/principles/wording-conventions.md) is an owner
ruling that already binds creature text: *"Activation costs come before the effect in ability sentences …
The reader pays first, then reads what they bought."* A **limiter** answers *how often* and goes last
(principle 45). A **cost** answers *what this takes to use* and goes first. Both rules are right and they
govern different things.

> **Feeding Frenzy** (Action). **By spending 1 Resolve,** this creature makes a Claws attack against each
> enemy in their melee range.

> **Break the Gate** (Quick Action). **By spending 1 Resolve instead of their Quick Action,** this creature …

**Do not restate the action in the text.** The qualifier already carries it, and on the published card it
becomes the **group heading** (D-147), so *"By using an Action and spending 1 Resolve"* prints "Action"
twice. The qualifier stays a single closed-list word and the text opens on the Resolve alone.

**No new qualifier** — the closed list stays closed and the card keeps grouping by slot (D-147).

- **Lords only, at most one per Lord.** It is the signature, not a resource system.
- **It must be the move the creature is remembered for** — one that ends an escape, breaks a line, or turns
  the fight. Resolve spent on an ordinary option is a re-roll wasted, and a GM reading the card correctly
  never spends it.
- **Rare even among Lords.** A Lord without one is a normal Lord.

**Owed to the published rules.** `03-statistics/04-resolve.md` describes one use, so the second is
currently the skill's invention. It belongs in the creature-rules overhaul. *(Owner ruling, 2026-09-14,
D-166.)*
