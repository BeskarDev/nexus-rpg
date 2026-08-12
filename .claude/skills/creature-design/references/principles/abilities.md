# Abilities, Conditions & Triggers

Part of [designer-principles.md](../designer-principles.md); numbers are global and never renumbered.

Read before **workflow step 4** (abilities), and again before any Elite or Lord trigger. Most rejected designs fail here.

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
| **23** | A creature's weapon may have any name, but its damage and properties must be a catalog entry's. |
| **24** | Check the universal Action and Quick Action lists before writing an ability. |
| **26** | Every trigger opens `When this creature suffers a Wound, …`, and Lords take the ordinal. |
| **27** | An Elite or Lord Trigger escalates. It is never a downgrade, and never a rule the game already has. |
| **35** | A leash is a rare feature, and it must never be a firing position. |
| **36** | The acting creature rolls, one roll may be read against several Defenses, and no roll beats one. |
| **41** | A conditional second attack is the Nexus answer to multiattack. |
| **46** | Write an ability's clauses in resolution order, and make the second effect the payoff of the first. |
| **43** | A trait must act in the encounter, or it is lore wearing a slot. |
| **44** | On a carried weapon, the line is catalogue data. Anything more is an ability. |
| **45** | The qualifier is one word. The limiter is the last sentence. This keeps being got wrong. |

**Numbers are global and never renumbered, so this file is ordered for reading rather than by date.** Full text below in the same order.

**8. Check every condition against its published definition; parameterized conditions carry their (X).** Never reason about a condition from its name or its D&D counterpart — open `docs/05-combat/04-conditions.md` and design against what it actually does. The canonical trap: Nexus **stunned** does not disable a creature (they still move or act, at +1 bane); full incapacitation is **paralyzed** alone, which sits a full severity tier higher and needs harsher gates (rolled, limited, repeat-save escape valves). Write "poisoned for a short duration" with the save spelled out, "burning (4)", never a bare adverb.

**Read the condition a second time, for what it already grants the attacker.** `stunned`, `paralyzed`, `prone` (against melee) and `distracted` all hand attackers **+1 boon** in their own text, so an ability reading *"gain +1 boon against a stunned creature"* is double-dipping — and it pays badly, because the **first** boon is 2d6-take-higher (about +1.9) while *"multiple boons beyond the first add a +1 bonus"*. The Ghoul's `Feeding Frenzy` was worth +1.9 against a dazed target and +1.0 against a stunned one, so it got **weaker as the creature got better**, inverting the escalation it was built to reward. When an ability rewards a condition, pay in a currency that condition does not already spend: flat damage, movement, an extra target, ignoring AV. *(Owner ruling, 2026-08-10, D-075.)* *(spell principle 73; talent principle 26)*

**9. High-impact conditions never ride automatic, no-roll triggers.** A creature ability that inflicts frightened or stronger gives the target a save (Attribute + Skill vs. the ability TN) or requires the creature to hit with a rolled attack. Automatic on-proximity or on-turn-start hard control with no counter-roll is oppressive at the table. Low-impact conditions (distracted, briefly slowed) may ride passively. *(spell principle 88; talent principle 9)*

**16. Condition escalation prices a disable instead of banning it.** A rider applies a lesser condition, and applying it again to a target already suffering it upgrades to the greater one — `stunned` then `paralyzed` is the canonical pair. This costs two strong-or-critical hits rather than one roll, gives the party a visible warning round, and leaves two counterplays (clear the lesser condition, or do not let the creature land a second good hit). Escalate one impact band, never two. Reach for this whenever a creature's concept demands a disable, rather than removing the creature's identity. *(Owner ruling, 2026-08-09, D-029.)*

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

**Word order is fixed: the duration goes BEFORE the condition.** `briefly dazed`, `briefly stunned`, `briefly poisoned` — never `dazed briefly`. Both orders are correct English and the published corpus is not close: **451 uses of `briefly <condition>` against 9 the other way**, and six of those nine were creature records written before this rule existed. This is principle 19 applied to the commonest phrase in the whole bestiary, so it is worth stating rather than trusting an ear: a GM who has read `briefly dazed` four hundred times should recognise the phrase, not re-parse a variant of it. The longer durations keep their own published form — `for a short duration`, not `shortly`. *(Owner confirmation, 2026-08-09, milestone 04 §1.1; word order ruled 2026-08-10, D-074.)*

**23. A creature's weapon may have any name, but its damage and properties must be a catalog entry's.** `docs/04-equipment/03-weapons.md` explicitly invites invented names — "invent a name of your own and tell the table what it counts as" — so *Raiding Axe* and *Canyon Sword* are legal as names. What is not legal is inventing the **stat line** behind them. A creature's weapon is looted (`02-creature-rules.md` § Looting Equipment), so an invented property list changes the item the moment it leaves the corpse, and the party has no way to know what they picked up. Every creature weapon resolves to a row of the catalog: its weapon damage, its full property list, verbatim.

Three checks, in order:

1. **Use a published regional name if one exists.** `Arms of the Regions` already names the same weapon for every culture, so a Zakhar orc of the Eternal Desert carries a *Crescent Axe* (Battleaxe) and a *Chariot Sword* (Longsword). This is free flavour with zero invention, and it ties the creature to a place.
2. **Copy the whole property list**, including the unglamorous ones. A javelin is `bundle (d4), light, pierce, thrown (short/long)` — the bundle is what the party inherits, and it is the reason a raider who threw javelins all fight has none left to loot.
3. **Take the weapon damage from the catalog, not from the tier.** A javelin is 2 where the tier says 3, and a Light Shield is 2 — so those attacks land *below* the tier baseline on purpose. Equipment carrying its real number is one of the few ways a creature's damage legitimately varies without a tier adjustment.

The same audit applies to armor and shields, and it pays for numbers that otherwise have no stated source: a Light Shield's `AV +1` and `parry +1` are exactly where a shield-carrying creature's extra point of each comes from. **Those two are then *not* repeated in the attack's property list** — they have already been spent in the AV and Parry figures, so `Shield Bash` lists `crush` alone across the whole roster. "Copy the whole property list" means the properties describing **the attack**, not the ones the stat line has banked. *(Owner ruling, 2026-08-09.)*

***This principle was correct, complete and broken anyway***, three batches after it was written, by a `Censer` given `(crush, reach)` and a damage figure of its own. **A rule with no enforcement point is not a rule**, so step 3's gate now makes a designer **name the catalogue row in the notes file** — a censer on a chain is a *Flail*, which the catalogue counts as a *Mace*. What the invented entry actually bought was `reach` for the softest body in the batch. See [principle 44](#44) for what happens to the rider, and [../case-studies.md](../case-studies.md#p44) for the full failure. *(Owner ruling, 2026-08-11, D-119.)*

**No creature type gets a standard rider.** `distracted` fits a swarm almost too well, which is exactly
why it may be used on **one more** and then every swarm needs its own signature (D-112). Same lesson as
the relic channels (D-059): reuse gives a family a recognisable shape, over-reuse makes the fourth one
the party meets feel like the first.

**24. Check the universal Action and Quick Action lists before writing an ability.** `docs/05-combat/01-combat-scenes.md` gives every creature a full menu — `Protect Ally`, `Help`, `Evade`, `Guard`, `Opportunity Attack`, `Defend`, `Grapple`, `Disarm`, `Dash` — and an ability that restates one of them spends a slot on something the creature could already do for free. The Zakhar Band-Leader's `Take It On The Shield` was `Protect Ally` reworded, badly: the published version has the attacker **re-roll against the protector's Defense**, so stepping into a blow can fail, where the hand-written one silently transferred a hit that had already landed.

The fix is the general pattern: **an ability that overlaps a universal action should improve it rather than replace it**, written as a Passive — *"When this creature uses Protect Ally, they take half the damage"*. That earns the slot, keeps the published sequencing, and gives the GM one rule instead of two similar ones.

**A `Quick Action` qualifier already means "once between your turns"** — *"You can use one Quick Action on your turn or between your turns. You regain access to your Quick Action at the end of each of your turns."* Writing `(Quick Action, once between your turns)` charges the creature twice for one restriction. **A limiter is written as the last sentence of the effect text and never in the qualifier** (principle 45, D-107), and only when it adds something the qualifier does not already carry.

**In practice that means only `Action` may carry a limiter.** `Quick Action` already implies one; `Elite Trigger` and `Lord Trigger` fire once by construction; and a limiter on a **`Passive` is a category error** — a Passive is always on, so there is nothing to limit, and writing one signals that the effect is not really passive. This mistake has now been made three times — the Zakhar Band-Leader, the Ghoul's `Feeding Frenzy`, and the Cult Priest's `Spellcasting` — which is why the placement table lives in [../stat-tables.md](../stat-tables.md#where-a-limiter-goes--the-last-sentence-of-the-effect-never-the-qualifier).

**If a Passive needs a frequency cap, gate its trigger instead.** A strong or critical hit, a state, or a circumstance makes the frequency fall out of the fiction with nothing to track: `Feeding Frenzy` went from *"(Passive, once between your turns). When this creature hits a dazed creature…"* to *"(Passive). On a strong or critical hit against a dazed creature…"*, which fixed the category error and a hidden second defect at once — **`once between your turns` names the off-turn window**, so on a Passive triggered by the creature's own attacks it was limiting nothing whatsoever. *(Owner rulings, 2026-08-09 and 2026-08-10, D-077.)*

**26. Every trigger opens `When this creature suffers a Wound, …`, and Lords take the ordinal.** "Loses their first life pool" is **jargon from this skill and the old analysis document**, not rules text — `02-creature-rules.md` only ever says a creature *suffers a Wound* and *regains all of their HP*. A stat block speaks the published vocabulary or the GM has to translate it at the table.

An **Elite** needs no ordinal, by arithmetic: it has two Wounds and the second one kills, so exactly one Wound can trigger anything. A **Lord does** — `their first Wound`, `their second Wound` — because three Wounds against two mandatory triggers would otherwise fire both twice and dump the creature's entire second act on the table at once. Staged ordinals turn the two required triggers into an escalation, which is what the category is for.

The broader habit this is an instance of: **design vocabulary and published vocabulary are different registers, and only one of them goes on a card.** Life pools, chassis, rungs, and tier-adjustment are how designers talk to each other. Wounds, HP, boons and Success Levels are how the game talks to its table. *(Owner ruling, 2026-08-09.)*

**27. An Elite or Lord Trigger escalates. It is never a downgrade, and never a rule the game already has.** The category exists to declare the second half of a fight: a power surge, an ability unlock, or an environmental change. A trigger that makes the encounter *easier* — the boss's allies flee, a defence drops, the creature disengages — inverts the one job the category has, however well it reads as fiction. "It shifts combat dynamics" is true of any change and is not the test. **The test is whether the party is in more trouble after it fires than before.**

The second half of the rule catches the same mistake from the other side. Before writing a trigger, check whether the published rules already produce the effect. A band breaking when its leader falls is **Morale**, which already fires when *"all elite creatures or lords are dead or otherwise removed from the fight"* — writing that as a trigger spends the creature's defining slot restating a rule every GM already runs.

**State a state, never choreography.** A trigger that says *what the creature does* — throws its shield aside, leaps to the altar, shatters the pillar — makes every copy of that creature perform the identical beat. Three band-leaders in a campaign, three identical shields hitting three identical patches of ground. Write what is now **true** of the creature and leave how it looks to the GM and the moment. The side benefit is reuse: a state-shaped trigger drops onto any creature of its kind at its own tier, scaling only its numbers.

**Express the surge in boons, banes and flat damage — never in AV or Defense.** A trigger that sets "their AV becomes 1" or grants "+2 Parry for the rest of the scene" hands the GM a floating number to remember and re-apply every round. Boons and banes are applied once, at roll time, by whoever is rolling; flat damage is added once on a hit. Nothing survives between turns. The Zakhar Band-Leader's `Blood Up` is the model: **+1 boon on its melee attacks, +1 boon on melee attacks against it, +2 damage on melee hits** — more dangerous and easier to kill, in three clauses with no bookkeeping, and the flat bonus sits at principle 17's rung-1 cap of half the tier's weapon damage. **The trigger's opening clause explains the cost.** It is not mood-setting before the numbers start. "They stop fighting carefully" is accurate and dead; "the rage takes them and they stop caring whether they live" is the same rule with the fiction restored, and it makes the drawback self-evident — a reader who has taken in that sentence already knows why melee attacks against the creature gain a boon. Write the opening so the **cost** reads as something the creature chose, not something the designer imposed. *(Owner rulings, 2026-08-09.)*

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

**The mechanical leashes are exempt from the frequency worry, not from the tests.** `Grave-Bound` is a
published ability with a stated `medium` distance, and it is the creature's whole identity plus its
Treat. The problem is the *lore* leash written by reflex into `tactics` because the creature felt like
it should have one. *(Owner ruling, 2026-08-11, D-086.)*

**36. The acting creature rolls, and one roll may be read against several Defenses.** Prefer a roll made
by the creature taking the action over a roll asked of each target. When an effect reaches more than one
creature, **make the roll once and compare the result against each target's Defense** rather than
handing every target a save.

The published spells already work this way and are the model: a static TN to get the spell off at all,
then the same result compared against each target's Defense to see who is actually caught — and that
second comparison is used for **lasting effects**, not for every point of damage.

| ❌ | ✅ |
|---|---|
| "Each creature in the space rolls Agility + Athletics vs. TN 9. On a failure, they fall prone" | "Roll Strength + Athletics vs. Dodge against each creature in the space they are thrown into. On a success, the throw ends against that creature" |

Three reasons it is the better shape:

- **The turn stays with the creature whose turn it is.** A table where the GM acts and four players
  immediately roll saves is four interruptions inside one action.
- **It is one roll, not N.** The cost of an ability stops scaling with how many characters it reaches.
- **It reads against the published defence math.** Dodge, Parry and Resist are what the whole system is
  calibrated on, and a bespoke TN on a bystander's skill roll is a second, uncalibrated scale.

**Reach for published conditions before writing a consequence.** `pushed` already states that a creature
pushed into another creature or a solid object takes falling damage for the distance moved and that the
creature struck takes the same, and the falling rules already knock both prone. An ability that says
"the target is pushed a short distance" inherits all of it and needs no damage figure of its own.
*(Owner ruling, 2026-08-11, D-093.)*

***One roll is better than two, and no roll is better than one.*** The principle above is about **whose**
roll it is. This is about **how many**, and the ladder runs the other way from the instinct to be fair:

| Rung | Cost at the table | Use it for |
|---|---|---|
| **1. Gate on the success level of a roll already made** | **nothing** | Most riders and small reactive effects. `On a strong or critical hit, …` |
| **2. Read that same roll against a second Defense** | one comparison | An effect landing on **someone other than the attack's target**, where there is a second Defense to read — the Ogre's `Hurl` |
| **3. A fresh roll** | a full resolution step | Effects big enough to deserve their own moment, and abilities with no attack in front of them |

**Rung 1 is the default and rung 3 has to be argued for.** The question is never *"would a roll be fairer
here"*, it is ***"has the table already decided this?"*** — and after an attack, it usually has.

❌ `(Quick Action). When this creature hits with their Censer, roll Spirit + Mysticism vs. the target's
Resist. On a success, the target is briefly blinded. Once per scene.`
✅ `(Quick Action). On a strong or critical hit with their Censer, this creature swings the chain so the
smoke breaks across the target's face. The target is briefly blinded.`

*(Owner ruling, 2026-08-11, D-121.)*

**41. A conditional second attack is the Nexus answer to multiattack.** D&D gives a high-tier creature
more attacks in its own turn. Nexus gives it **one extra attack that fires on somebody else's**, as a
Quick Action with a trigger the party can see and play around.

> **Step Into the Gap** (Quick Action). When an enemy attacks an ally within short range of this
> creature, this creature moves into melee range of that ally and makes one attack against the attacker.

**Why this shape rather than a second attack in the creature's own turn:**

- **It does not lengthen the creature's turn.** Two attacks and a Movement is a long GM turn at every
  initiative count. A retaliation happens inside the player's turn, where it lands as a consequence of
  something they just did.
- **It has counterplay by construction.** The trigger names a condition the party controls — do not
  attack the ally beside them, or accept the retaliation. A flat second attack has none.
- **It is the ability half of principle 40.** An armed humanoid falls behind the chassis figure because
  gear scales slower than tiers, and a conditional extra attack closes exactly that gap without handing
  anyone a bigger sword.
- **It competes for the Quick Action.** One Quick Action between turns means the retaliation trades
  against every other reactive option the creature has, so the GM makes a real choice each round.

**Write the trigger on an action, not on a result.** *"When an ally is reduced to 0 HP"* fires once a
fight, after the damage is already done, and reads as a funeral. *"When an enemy attacks an ally"* fires
often, changes how the party targets, and is the same ability doing something.

**Make the retaliation an attack, not a manoeuvre**, and **check it against the universal Quick Actions
before you keep it** (principle 24). Two of them already occupy this space, and a reactive attack that
adds nothing to either is not an ability. Both failed drafts are in
[../case-studies.md](../case-studies.md#p24).

***This is the default, not a ban. A trigger may unlock a paired attack.*** An **Elite or Lord Trigger**
is the sanctioned channel for a creature to do something it could not do before, and *"use one Action to
attack with both weapons"* is a legitimate thing for it to unlock — the Captain's `Hold the Line` does
exactly that, after a Wound has already cost them half their HP.

**Price it off the AV table, because the instinct is wrong.** **AV is subtracted from each attack
separately**, so a paired attack is taxed twice and gains far less against armor than it looks like it
should — and far more against an unarmored caster. Run the three rows in
[../stat-tables.md](../stat-tables.md#paired-attacks) before granting one, then **constrain it where the
math says**: the Captain's pair must take **two different targets**, which is what keeps a 16 HP caster
out of one-Action range and reads as an officer holding a gap.

**Never on the base stat line.** D-076 still rules the routine case: paired natural weapons carry `light`
and take **half** the tier's weapon damage each, because that is what the creature does every turn and it
is priced into the chassis. Full damage on both weapons is an **escalation**, and it is paid for by
costing half the creature's HP to reach. *(Owner ruling, 2026-08-11, D-124.)*

| Universal action | Does | So the creature's version must |
|---|---|---|
| **Opportunity Attack** | Attacks an enemy leaving your melee reach. No movement | change the **trigger** and add something |
| **Protect Ally** | Moves you into melee range of an attacked ally and you **take the hit** | keep the movement and **hit back** instead of absorbing |

A second draft of `Step Into the Gap` dropped the movement and became "an Opportunity Attack with a
different trigger", which also made the name a lie. Restoring the step is what separates it from both:
the veteran covers ground *and* answers, where `Protect Ally` covers ground and eats it.
*(Owner rulings, 2026-08-11, D-103.)*

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

**44. On a carried weapon, the line is catalogue data. Anything more is an ability.** D-073 asks that a
creature have at least one attack doing more than damage. It does **not** ask that every attack carry a
rider, and it says so directly: *plain weapon attacks stay plain*.

**For a weapon out of `03-weapons.md`, the whole attack is: catalogue properties + catalogue damage +
the creature's base damage.** A rider is allowed only when it is what any creature would achieve with
that weapon **as the catalogue models it** — a shield knocks someone `prone`, a spear `pushes`. If the
effect needs something the object does that the catalogue does not model, it is an **ability**, where it
costs a slot, an action and usually a roll.

**Two questions that catch it:**

1. **Does a published effect already do this?** A rider reproducing a spell, condition or talent is worse
   than no rider, because it hands out for free what the rules price.
2. **Would this still be true if the weapon were the plain catalogue entry?** If the rider depends on the
   *object's* special nature — smoke, poison, a consecrated edge — the answer is no, and it belongs in an
   ability.

❌ `**Censer** (crush, reach). 7/10/13. On a strong or critical hit, the target is briefly blinded.`
✅ `**Censer** (crush, versatile (+1)). 6/9/12.` plus `**Grave-Smoke** (Quick Action). On a strong or
critical hit with their Censer, this creature swings the chain so the smoke breaks across the target's
face. The target is briefly blinded.`

**The two texts read almost alike, and the difference is the entire point: the rider was free, the
ability costs the creature's Quick Action.** The priest cannot blind someone and `Evade` in the same
round. **A mundane consequence rides free on the weapon. A magical one costs a slot and a Quick Action.**
Do not pay for it a third time with a roll or a limiter — that is principles 36 and 18, and the first
draft of this very ability did both (D-121).

**Natural weapons are the exception.** A fist grappling, a bite holding on, a tail sweeping legs out —
there is no catalogue entry to be honest to, so the rider *is* the design (D-116 prices it: gated takes
full damage, ungated takes less).

Two worked failures, a knife rider that was a published spell verbatim and the censer that took three
reviews to fall, are in [../case-studies.md](../case-studies.md#p44).

**The creature's identity does not have to live in every line.** A caster's interesting half is the spell
list. Its knife is there so the creature still has something to do when the spells are spent (D-094).
*(Owner ruling, 2026-08-11, D-106.)*

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

**This is the most repeated error in the programme** — three times, because the skill itself stated the
wrong rule and the renderer supported it ([case study](../case-studies.md#p45)). It is now
machine-checked by the generator. *(Owner rulings, D-077 and D-107; D-107 reverses D-077's placement
while keeping which qualifiers may be limited at all.)*
