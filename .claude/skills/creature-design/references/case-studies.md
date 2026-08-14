# Case Studies — the worked failures behind the principles

> Part of the creature-design skill. **Not required reading.** Every principle states its rule and one
> contrasting example in its own phase file; this is where the failure that produced the rule is written
> out in full.
>
> **Read a section when you want to know why a rule is the way it is**, when you are tempted to argue with
> one, or when you are about to make the same call. Do not read this file to design — read the phase file.
>
> Anchors are principle numbers (`#p31`), so a phase file can point straight at its own history.

---

## P31 — Lore prose has no modern narrator {#p31}

Three sentences from the first Tomb Beetles draft, all dismissals dressed as clarity. The failure sounds
authoritative, which is why it slips through:

- *"They are not a plague and not an omen. They are what happens to a sealed room over four hundred
  years."* — states the modern answer and rules out the two readings a Bronze Age priest would actually
  hold.
- *"Some cities read that as an omen. Others read it as a jackal knowing where the food is."* — offers a
  belief and then overrules it with the rational reading, so the belief is scenery.
- *"Almost nobody stops to think that they are looking at a dinosaur."* — the same voice plus a
  19th-century coinage, which principle 22 already forbids on names.

The fix in each case is to attribute and stop. **Two competing beliefs beat one belief and one
correction.**

---

## P33 — `tactics` is a neutral briefing {#p33}

**Two rounds of correction landed on the same rule from opposite sides, and the second is the one to
remember.**

**Round one, the stage directions.** *"Whoever cuts their friend loose has genuinely solved the problem,
and the party should be allowed to notice."* Allowed by whom, doing what? It asks the GM to arrange an
emotion, and pads itself with `genuinely` and `the problem` because there is no concrete claim
underneath. Same shape: *"the lesson only lands if the party watches it happen"*, *"and that frustration
is the point"*, *"let them retreat where the players can see it"*, *"make that boundary visible"*.

**Round two: rewriting them as instructions was still wrong.** The stage direction became *"Say so out
loud when it happens"*, which has a verb and is still a defect — it states the obvious and **breaks the
register of a neutral briefing**. The mechanical fact was already in the sentence before it. A GM who has
read "cutting that person free costs the crocodile its whole turn" does not need to be told to mention
it.

So the rule is **cut, not convert**. The same pass removed *"Run one as a hazard, not as a threat"*, *"and
none of it is a rule"*, *"a fight with one should almost never be rolled at all"* and *"that is the
counterplay"*. Every one was the entry explaining itself to the GM instead of briefing them.

**The party-as-subject drift**, from the same first pass: *"a party standing back to back has already
beaten them"*, *"a party warned to watch the ground has already taken the ambush away"*, *"the party's
answer is distance and patience"*, *"scattering them is the real work of the fight"*. Each states a true
thing about the creature's limits and points it at the wrong reader.

---

## P37 — Reach on a Large creature's long weapon {#p37}

**Ogre.** `Great Club` (*crush, reach, two-handed*) 10/15/20 against `Fist` (*crush*) 8/11/14 with a
grapple rider. At range the club is strictly better. In melee it takes +1 bane and the fist does not, so
the ogre grabs instead, which is what the rest of its kit is built on.

The property wrote the encounter's Treat for free: **"get inside the club"** is a tactic a party can find,
execute and feel clever about, and it costs the creature real damage with no bespoke rule.

---

## P38 — The tier adjustment went unused for seventeen creatures {#p38}

Three batches produced **seventeen creatures and not one adjustment**, including an **ogre built with
average Strength and trained skill** — a creature whose entire identity is *strong and clumsy*. Nothing
flagged it, because nothing was out of range: the unadjusted chassis produces a *legal* creature every
time, so silence looked like success.

The fix and its measured effect:

| | Chassis | Adjusted |
|---|---|---|
| Strength / base damage | d8 / 4 | **d10 / 5** |
| Fighting | 2 | **1** |
| Great Club | 9/14/19 | **10/15/20** |

A point of damage at every success level against a point off every attack roll. `Athletics (2)` survived
the skill drop, so `Hurl` stays accurate while the swing does not — the ogre is better at manhandling
people than at fighting them, which is the right way round.

**Step 2 was rewritten from "optional, thematic" into a required question, and the very next creature used
it correctly.** That is the only intervention in the programme with clean before-and-after evidence.

---

## P42 — How senses were actually distributed {#p42}

The owner's own 34 companion species, which is the calibration the bestiary is read against:

| Sense | Count | Who |
|---|---|---|
| Keen Scent | 5 | Badger, Boar, Cat, Dog, Rat |
| Blindsight | 3 | both Snakes, Grell |
| **Night Vision** | **2** | **Cat**, Chuul |
| Darkvision | 1 | Floating Eye |
| Echolocation / Tremorsense / Magic Sense / Keen Eyes / Track Scent | 1 each | Bat, Earth Elemental, Chuul, Bird, Dog |
| **Nothing** | **21 of 34** | Ape, Bear, Elephant, Crocodile, Horse, Ox, Camel, Skeleton, Zombie… |

**Seeing in the dark is 3 of 34, and two of those are aberrations.** Exactly one ordinary animal has Night
Vision and it is the **cat**. The ogre's closest peers — Ape, Bear, Elephant — carry nothing, and so do
both undead. No creature in the bestiary roster has Night Vision or Darkvision, and "it lives in hills"
was not an argument for being the first.

---

## P44 — The rider that was a spell, and the weapon that was an invention {#p44}

**One creature, two reviews, and the second is the one that produced the rule.**

**Review one, the knife.** The tier-3 Cult Priest's `Ritual Knife` read *"on a strong or critical hit,
the target suffers +1 bane on their next roll"*.

That is **`Minor Hex`** word for word — a rank-0 Death spell: *"the target is hexed for a short duration.
The next roll they make while hexed suffers +1 bane, and then the hex ends."*

**The same design pass had cut `Minor Hex` from that priest's spell list** for being too weak to be worth
a slot, and then re-attached it to a weapon for free. The design judged the effect not worth a slot and
gave it away anyway.

**Review two, the censer, and the fix from review one was part of the problem.** Principle 44 was written
with the priest's *other* weapon as its ✅ example: *"a censer swung into someone's face blinds them with
smoke, that is the object doing something only it can do."* The owner rejected it on the next pass, for
two reasons that turned out to be one:

1. **`Censer` was not a weapon.** It was written `(crush, reach)` with its own damage figure — an
   invented catalogue entry, which **principle 23 had forbidden since the first batch**, citing the
   reskin tables by name. A censer on a chain is a **Flail**, which `03-weapons.md` already counts as a
   **Mace**: `crush, versatile (+1)`, damage 3. **No `reach`** — the invented entry had quietly handed
   the softest body in the batch a soldier's reach.
2. **Being traceable to the object was not the test.** Smoke in the eyes is a perfectly good reason for
   `blinded`, and it is still a magical effect handed out free on a weapon line.

**So the rule moved from the rider to the weapon**: on a carried weapon the line is catalogue properties
plus catalogue damage, full stop. The blinding became **`Grave-Smoke`**, an ability.

**Review three, and it was my overcorrection this time.** Having just been told the effect was too cheap,
I made it *"roll Spirit + Mysticism vs. the target's Resist … once per scene"* — **a second roll and a
frequency limiter, on a one-turn condition**, after the attack roll had already produced a success level.
The owner cut both: *"requiring a second roll is bad practice … it doesn't even need the once per scene
restriction, it's just a brief condition."* Two rules came out of that, and both are now stated in the
phase file: **resolve at the cheapest rung that carries the effect** (principle 36) and **`briefly`
limits itself** (principle 18).

**The published ability and the rider it replaced read almost alike**, which is the thing to hold onto:

| | Text | Costs |
|---|---|---|
| The rider | `**Censer** … On a strong or critical hit, the target is briefly blinded.` | **nothing** |
| The ability | `**Grave-Smoke** (Quick Action). On a strong or critical hit with their Censer, … the target is briefly blinded.` | an ability slot and **the creature's one Quick Action** |

The priest cannot blind someone and `Evade` in the same round. **That single resource is the whole price
of a magical effect over a mundane one** — and paying it a third time, in rolls or limiters, is its own
error.

**The lesson about the skill, not the creature.** Principle 23 was correct, complete and three batches
old, and it was broken anyway — an unenforced rule is not a rule. The enforcement point is now a step-3
gate that makes the designer **name the catalogue row in writing**, the same mechanism that fixed the
tier adjustment ([P38](#p38)).

**A third error was hiding under the first two.** SKILL.md's step 3 said base damage is *"half **primary**
attribute die"*, so the priest's melee was computed off their Spirit d10 instead of the d6 their arms
swing on, and **both attacks were one damage too high at every success level**. `stat-tables.md` had it
right and the workflow step contradicted it — the R2 failure mode, one rule with two homes, caught by
recomputing the numbers rather than by reading either file.

### The gate did not hold, and the fix was data (2026-08-14)

**Two more instances landed in one session**, three months of rulings after the principle was written and
after the step-3 gate was added. A goblin's Shortsword that moved its wielder (`Cut and Away`), and a
goblin's Shortsword **docked a point of weapon damage** to fund a `bleeding (2)` rider. Both were caught by
the owner, not by the gate.

**The gate asked a question that could be answered correctly while the defect went in.** It required naming
the **catalogue row** — and every one of the three drafts named it correctly. The Censer resolved to a Mace,
the knives to a Shortsword. Naming the row proves the weapon exists; it says nothing about whether the
numbers beside it are the row's numbers. The gate verified the half nobody was breaking.

**The first fix was also wrong, and the owner corrected it.** The rule was rewritten as *"no property on
the row, no rider — it becomes an ability"*, with an allowlist of two legal riders. That is too strong.
Carried gear gains one Quality every two tiers while the chassis gains weapon damage every tier, so an
armed creature is **six behind by tier 10** — a rider is one of the mechanisms that closes the gap, and
banning it removes a tool the upper tiers need. **The absolute is the weapon, not the rider.**

**So the enforcement moved to the thing that is actually absolute, and into the build.** An attack declares
its row in a `weapon` field, and `generate-creatures.ts` checks the properties verbatim and the damage
against the row plus the Quality step the tier and category imply. Riders are not policed at all.

**The field was necessary because neither name nor properties can identify a row.** A creature's weapon may
be called anything (principle 23), and signatures collide: the Ghoul's **natural** `Claws` are
`agile, light, slash` — the exact signature of the Hatchet, the Scimitar and the Claw. A property-matching
guard would have false-positived on the Ghoul's legal rider and missed both goblin knives, which is to say
it would have been wrong in both directions at once.

**The guard found a bug in itself on the first run**, which is the argument for guards in one line. D-091's
first Quality band is three tiers wide (0-2) where the rest are two, so a plain halving read a tier-2 Elite
as Quality 3 and demanded weapon damage the published Orc Band-Leader does not have. A reviewer would have
read the ladder as "every two tiers" and agreed with the bug.

---

## P45 — The limiter that kept moving into the qualifier {#p45}

The same error three times: the Orc Band-Leader's `(Quick Action, once between your turns)`, the Ghoul's
`Feeding Frenzy` `(Passive, once between your turns)`, and the Cult Priest's `(Action, once per scene
each)`.

**It kept happening because the skill stated the wrong rule.** D-077 had recorded *"a limiter lives in the
`qualifier` field, never trailing the effect text"*, and principle 25 repeated it verbatim in the file a
designer reads **while writing abilities**. Every instance was the rule being followed correctly.

**The tooling hid it too.** `generate-creatures.ts` split `qualifier` on commas and rendered each fragment
as its own badge, with a source comment naming *"the qualifiers that carry two facts (`Passive, 3/day`)"*.
So the wrong form rendered beautifully, passed 56 generator guards and CI, and survived three sessions.
The schema, the renderer and the skill all encoded the same superseded model.

Both are now fixed, and the qualifier is machine-checked.

---

## P24 / P41 — Two drafts of the same reactive ability {#p24}

`Step Into the Gap` on the tier-3 Veteran, and both failures are instructive.

**Draft 1 had no teeth.** *"When an ally within close range is reduced to 0 HP, this creature moves into
melee range of the creature that felled them."* A whole Quick Action spent on choreography, triggered by a
**result** rather than an action — so it fired once a fight, after the damage was already done, and read
as a funeral.

**Draft 2 fixed the teeth and broke the name.** Adding the attack and dropping the movement produced *"an
Opportunity Attack with a different trigger"* — and the movement it discarded is exactly what the
universal **`Protect Ally`** already grants. The space was occupied twice over.

**The published form covers ground *and* answers**, where `Protect Ally` covers ground and eats the hit.
That is a different choice for the GM rather than a better copy of one they already have.

---

## P43 — A trait that did nothing {#p43}

`Powerful Build` — *"Add +2 to this creature's carrying capacity."* Real utility for a **companion**,
which hauls the party's gear. **Inert on a monster**, because no GM has ever tracked an ogre's load.

It was on the card to say "very strong", which the ogre's **d10 Strength** and grappling `Fist` already
say mechanically, in the encounter, where it matters.
