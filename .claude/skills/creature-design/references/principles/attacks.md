# Attacks & Carried Weapons

Part of [designer-principles.md](../designer-principles.md); numbers are global and never renumbered.

Read before **workflow step 3**. These three are why a carried weapon is build-checked and why a high-tier
armed creature does not fall off the chassis.

| # | |
|---|---|
| **23** | A creature's weapon may have any name, but its damage and properties must be a catalogue entry's. |
| **44** | On a carried weapon the line is catalogue data; anything more is an ability. Machine-checked. |
| **41** | A conditional second attack is the Nexus answer to multiattack. |

---

**23. A creature's weapon may have any name, but its damage and properties must be a catalog entry's.** `docs/04-equipment/03-weapons.md` explicitly invites invented names — "invent a name of your own and tell the table what it counts as" — so *Raiding Axe* and *Canyon Sword* are legal as names. What is not legal is inventing the **stat line** behind them. A creature's weapon is looted (`02-creature-rules.md` § Looting Equipment), so an invented property list changes the item the moment it leaves the corpse, and the party has no way to know what they picked up. Every creature weapon resolves to a row of the catalog: its weapon damage, its full property list, verbatim.

Three checks, in order:

1. **Use a published regional name if one exists.** `Arms of the Regions` already names the same weapon for every culture, so a Zakhar orc of the Eternal Desert carries a *Crescent Axe* (Battleaxe) and a *Chariot Sword* (Longsword). This is free flavour with zero invention, and it ties the creature to a place.
2. **Copy the whole property list**, including the unglamorous ones. A javelin is `bundle (d4), light, pierce, thrown (short/long)` — the bundle is what the party inherits, and it is the reason a raider who threw javelins all fight has none left to loot.
3. **Take the weapon damage from the catalog, not from the tier.** A javelin is 2 where the tier says 3, and a Light Shield is 2 — so those attacks land *below* the tier baseline on purpose. Equipment carrying its real number is one of the few ways a creature's damage legitimately varies without a tier adjustment.

The same audit applies to armor and shields, and it pays for numbers that otherwise have no stated source: a Light Shield's `AV +1` and `parry +1` are exactly where a shield-carrying creature's extra point of each comes from. **Those two are then *not* repeated in the attack's property list** — they have already been spent in the AV and Parry figures, so `Shield Bash` lists `crush` alone across the whole roster. "Copy the whole property list" means the properties describing **the attack**, not the ones the stat line has banked. *(Owner ruling, 2026-08-09.)*

***Correct, complete and broken anyway***, three batches after it was written — so the enforcement is now
data, not a rule to remember. [Principle 44](#44) holds the machine-checked half and
[../case-studies.md](../case-studies.md#p44) the failure. *(Owner ruling, 2026-08-11, D-119.)*

**No creature type gets a standard rider.** `distracted` fits a swarm almost too well, which is exactly
why it may be used on **one more** and then every swarm needs its own signature (D-112). Same lesson as
the relic channels (D-059): reuse gives a family a recognisable shape, over-reuse makes the fourth one
the party meets feel like the first.


**44. On a carried weapon, the line is catalogue data. Anything more is an ability.** D-073 asks that a
creature have at least one attack doing more than damage. It does not ask that every attack carry a rider:
**plain weapon attacks stay plain.**

**The weapon half is absolute and machine-checked** (`generate-creatures.ts`, D-133):

| Absolute | Meaning |
|---|---|
| **Real damage** | The catalogue row's figure. The only legitimate change is the Quality step the creature's tier and category already determine (D-091) |
| **Real properties** | The row's list, verbatim. A property the row lacks is an invented weapon |
| **A real row** | Name it anything the culture suits (principle 23); it resolves to a published row or a reskin's row — a *Flail* counts as a *Mace* |

**Never dock weapon damage to pay for a rider.** A Quality step only ever adds. A Shortsword written at
4/5/6 to fund a `bleeding` effect is no longer a Shortsword, and the party finds out when they loot it.

**The record declares its row in a `weapon` field**, because neither name nor properties can identify it —
the Ghoul's *natural* `Claws` carry `agile, light, slash`, the exact signature of three catalogue weapons.
Omit it for natural weapons; there is no row for a bite.

```jsonc
{ "name": "Knife", "weapon": "Shortsword", "properties": ["agile","light","pierce"],
  "text": "5/7/9 damage." }
```

A deliberate exception — a chief carrying a knight's sword — sets `quality` on the attack and says why in
the notes. Unset is the normal case, and it is what stops a line soldier hitting as hard as their officer.

**The rider half is a legitimate tool and the build does not police it.** At high tier it is close to
necessary: gear gains a Quality every two tiers while the chassis gains weapon damage every tier, so an
armed creature is level at tier 2 and **six behind by tier 10** (principle 40). Four rules on riders:

- **Prefer the catalogue's own channel** — `entangle` for movement, `crush` for armor, `slash` for light
  armor, `reach` for range. Reaching for a rider that duplicates a property the row could have had is worse
  than picking the weapon that has it.
- **At tiers 0-2, ask what the rider is for.** Gear keeps pace with the chassis there, so a rider is pure
  addition — the question the Goblin Archer's `bleeding` knife failed.
- **An effect needing the object to be special is an ability**, not a rider: smoke, poison, a consecrated
  edge. It costs a slot and usually the Quick Action, which is the price of a magical effect over a mundane
  one. Do not charge for it a third time with a roll or a limiter (principles 36 and 18, D-121).
- **Natural weapons sit outside all of this.** No row to be honest to, so the rider *is* the design (D-116:
  gated takes full weapon damage, ungated takes less).

**Broken three times with the principle written down and a step-3 gate attached**, which is why it is now
data and a build failure. Each draft named the right catalogue row in prose and got the numbers wrong
anyway. The three, and the censer that took three reviews to fall, are in
[../case-studies.md](../case-studies.md#p44).

**The creature's identity does not have to live in every line.** A caster's interesting half is the spell
list; its knife is there so it has something to do when the spells are spent (D-094).
*(Owner rulings, 2026-08-11 D-106 and 2026-08-14 D-133.)*


**41. A conditional second attack is the Nexus answer to multiattack.** D&D gives a high-tier creature
more attacks in its own turn. Nexus gives it **one extra attack that fires on somebody else's**, as a
Quick Action with a trigger the party can see and play around.

> **Step Into the Gap** (Quick Action). When an enemy attacks an ally within short range of this
> creature, this creature moves into melee range of that ally and makes one attack against the attacker.

**Why this shape:** it does not lengthen the GM's turn, it has counterplay by construction (the trigger
names something the party controls), it is the ability half of principle 40's chassis gap, and it competes
for the creature's single Quick Action so the GM makes a real choice each round.

**This bans a second attack ROLL, not a second effect.** Principle 60b *requires* an Elite or Lord to do
two things a turn — the second one just uses a different verb.

**Four rules for writing the trigger:**

- **Trigger on an action, not a result.** *"When an ally is reduced to 0 HP"* fires once a fight, after the
  damage is done, and reads as a funeral. *"When an enemy attacks an ally"* fires often and changes how the
  party targets.
- **Copy the published timing verbatim when it is load bearing.** The reaction vocabulary is closed —
  ***attempts to move out of melee***, *when an enemy misses you*, *when an ally close to you is attacked*
  — and a paraphrase is a new rule nobody can adjudicate. *"When a creature moves out of melee range"*
  fires on a **completed** move; Opportunity Attack's *attempts to* fires before it resolves, which is the
  only timing where following the target means anything.
- **State the OUTCOME and let the distance cap it.** *"Stays in melee range of them by moving with them up
  to a short distance"*, not *"moves a short distance toward them"*, which leaves the table asking whether
  the creature arrived.
- **Reactive movement is `unprovoked`** (principle 46). Without it the ability hands every other character
  a free attack each time it fires, so the GM correctly never uses it (D-156).

**Make it an attack, not a manoeuvre, and check it against the universal Quick Actions first**
(principle 24) — two of them already occupy this space. Both failed drafts:
[../case-studies.md](../case-studies.md#p24).

***A trigger may unlock a paired attack.*** An Elite or Lord Trigger is the sanctioned channel for
something the creature could not do before, and *"use one Action to attack with both weapons"* is a
legitimate unlock — the Captain's `Hold the Line`, after a Wound has already cost half their HP.

**Price it off the AV table, because the instinct is wrong.** **AV is subtracted from each attack
separately**, so a paired attack is taxed twice and gains far less against armor than it looks like it
should, and far more against an unarmored caster. Run the rows in
[../stat-tables.md](../stat-tables.md#paired-attacks), then constrain it where the math says: the
Captain's pair must take **two different targets**, keeping a 16 HP caster out of one-Action range.

**Never on the base stat line.** D-076 rules the routine case: paired natural weapons carry `light` and
take **half** the tier's weapon damage each. Full damage on both is an escalation, paid for by costing
half the creature's HP to reach. *(Owner rulings, 2026-08-11 D-103 and D-124, 2026-09-07 D-156.)*

| Universal action | Does | So the creature's version must |
|---|---|---|
| **Opportunity Attack** | Attacks an enemy leaving your melee reach. No movement | change the **trigger** and add something |
| **Protect Ally** | Moves you into melee range of an attacked ally and you **take the hit** | keep the movement and **hit back** instead of absorbing |

A second draft of `Step Into the Gap` dropped the movement and became "an Opportunity Attack with a
different trigger", which also made the name a lie. Restoring the step is what separates it from both:
the veteran covers ground *and* answers, where `Protect Ally` covers ground and eats it.
*(Owner rulings, 2026-08-11, D-103.)*

