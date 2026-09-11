# Spell damage backfill — review table

486 spells: **232 settled** (a block in the JSON, or ruled to deal none), **0 auto**, **0 primary-clause**, **0 still need a ruling**, 50 mention damage without a number, 204 never mention damage.

The rulings themselves live in `src/utils/scripts/maintenance/spell-damage-rulings.json`,
grouped by theme. An empty table below means nothing is pending.

AUTO rows state one damage number under each of Weak/Strong/Critical, which is
the spell's own damage by construction. REVIEW rows say "damage" somewhere the
parser cannot read as a direct effect: a zone, a reaction, or a bonus granted to
something else. Each needs one of three rulings — a scaling block, a flat block,
or no block at all (the spell grants damage, it does not deal it).

## Needs a ruling

_None._

## Auto (applied by `--apply`)

_None._

## Primary clause (applied, confirm the reading)

One success-level run whose clauses carry more than one number. The first
number is taken as the damage to the spell's own target; the rest is splash,
a rider, or an alternative the sheet cannot carry.

| Spell | Applied | What else the clause says | Text |
|---|---|---|---|

## Mentions damage, states no number

No block proposed. Listed so the judgement can be checked, not repeated.

| Spell | Why it needs a ruling | Text |
|---|---|---|
| **Major Illusion** (Illusion) | damage mentioned without a number | I appears absolutely real, mimicking sounds, smells, movements, and even temperature (tough it won’t deal actual damage). |
| **Waking Dream** (Illusion) | damage mentioned without a number | If any creature uses an Action to shake them, they take any damage, or are otherwise disturbed, they can roll Spirit + Perception vs. |
| **Conjure Servant** (Conjuration) | damage mentioned without a number | It has no Defense and simply dissipates if it takes any damage, is targeted by an attack, or leaves close range of you. |
| **Mage Armor** (Conjuration) | damage mentioned without a number | The armor holds until the duration ends, even after you take damage. |
| **Mass Hold** (Telepathy) | damage mentioned without a number | Whenever an affected creature takes damage, they immediately make this roll as well. |
| **Arcane Empowerment** (Conjuration) | damage mentioned without a number | On a success, you gain the following effects: - Whenever you deal damage with an arcane spell, add your Arcana to the damage. |
| **Foresight** (Telepathy) | damage mentioned without a number | Attacks against you briefly suffer +1 bane, you briefly gain +1 boon and add your Arcana as damage on your next attack roll. |
| **Forced Suggestion** (Telepathy) | damage mentioned without a number | The effect also ends early if the target takes damage from any source. |
| **Astral Body** (Telepathy) | damage mentioned without a number | If your astral form takes damage from any effect that can strike spirits, you immediately snap back into your body and suffer one Fatigue. |
| **Unseen Deflection** (Telekinetics) | damage mentioned without a number | On a hit, treat it as a weak hit with the missile, using your spell power as the base damage. |
| **Stasis** (Telekinetics) | damage mentioned without a number | If the target takes damage while stunned by this spell, you automatically lose concentration for it and the effect ends. |
| **Falling Sky** (Telekinetics) | damage mentioned without a number | A creature or object that strikes a ceiling or an anchored object as it rises takes falling damage for the distance risen. |
| **Bone Armor** (Necromancy) | damage mentioned without a number | While the bone armor holds, you gain +3 AV (armor bonus) and resistance against necrotic damage. |
| **Death Ward** (Necromancy) | damage mentioned without a number | Cast this spell when you or a willing creature within range takes damage. |
| **Curse of Mortality** (Necromancy) | damage mentioned without a number | - They lose any immunity or resistance to disease, being poisoned, or poison damage. |
| **Soul Prison** (Necromancy) | damage mentioned without a number | When the creature’s body takes damage during this time, make a Concentration roll as if you took the same amount of damage. |
| **Feather Fall** (Telekinetics) | damage mentioned without a number | On a success, the target glides softly downward a short distance per round instead of falling and takes no falling damage when they land. |
| **Implant Suggestion** (Telepathy) | damage mentioned without a number | The compulsion lasts until the course of action is complete or for a short duration, and it ends early if the target takes damage from any source. |
| **Soul Cage** (Necromancy) | damage mentioned without a number | - Your necromancy spells and effects deal +4 additional necrotic damage (ignore AV) to the target. |
| **Arcane Genesis** (Conjuration) | damage mentioned without a number | Effects that end spells cannot unmake it, but it can be damaged and broken like worked stone, and it counts as a conjured construct of force for effects such as Disintegrate . |
| **Absolute Control** (Telepathy) | damage mentioned without a number | Whenever they take damage, they immediately make this roll as well. |
| **Clear Mind** (Light) | damage mentioned without a number | Cast this spell as a Quick Action in reaction to a creature within range being afflicted by a mind-affecting spell or effect, or being hit by psychic damage. |
| **Protect from Influence** (Light) | damage mentioned without a number | For a short duration, the target also gains resistance to psychic damage and +1 boon on rolls to resist mind-affecting spells and effects. |
| **Cloak of Night** (Twilight) | damage mentioned without a number | On a success, the creature wearing the cloak gains the following effects: - You have resistance against frost damage. |
| **Twilight Bind** (Twilight) | damage mentioned without a number | If the creature takes damage from you or your allies, they can immediately make this roll with +1 boon. |
| **Embrace of Night** (Twilight) | damage mentioned without a number | On a success, you gain the following effects: - You become invisible while in dim light or darkness - You gain resistance to psychic and frost damage - You can pass through solid objects as if they we |
| **Sustaining Grace** (Life) | damage mentioned without a number | If the triggering attack still hits you, you first take its damage as normal and then regain 2 HP. |
| **Beast Form** (Nature) | damage mentioned without a number | - Apply the beast form’s weapon damage to any attacks made with natural weapons. |
| **Life from Stone** (Nature) | damage mentioned without a number | poison damage, poisoned, bleeding, prone, unconscious Resistances. |
| **Petrification** (Nature) | damage mentioned without a number | When the creature takes damage during this time, make a Concentration roll as if you took the same amount of damage. |
| **Polymorph** (Nature) | damage mentioned without a number | Any physical disturbance grants them an immediate additional roll, such as being grabbed, carried, shoved, thrown, or taking any damage. |
| **Control Winds** (Tempest) | damage mentioned without a number | Falls within the area are slowed to a drift (no falling damage). |
| **Shared Burden** (Peace) | damage mentioned without a number | On a success, the condition ends on them and you take damage (ignore AV) based on its remaining duration: 2 if it would end briefly, 4 for a short duration, or 6 for a medium or longer duration. |
| **Absorb Harm** (Peace) | damage mentioned without a number | If you cast it for an ally and the attack still hits them, half of the damage is dealt to you instead of them. |
| **Harmonic Link** (Peace) | damage mentioned without a number | While the link holds, you gain the following effects: - If either one of you takes damage, both of you take half of the damage instead. |
| **Share Harm** (Peace) | damage mentioned without a number | Cast this spell after you have taken damage from an attack. |
| **Herald's Aegis** (Peace) | damage mentioned without a number | While this spell lasts, any creature near the target instinctively recognizes them as an envoy under sacred law, attack rolls against them suffer +1 bane, and any creature that damages them is briefly |
| **Martyrdom's Blessing** (Peace) | damage mentioned without a number | On a success, the target gains the following benefits for a short duration: - Whenever an ally within medium range would take damage, they can choose to take that damage instead. |
| **Pacifying Presence** (Peace) | damage mentioned without a number | On a success, all targets suffer the following effects for a short duration: - They cannot make attacks or cast spells dealing damage unless they succeed on a Spirit + Fortitude roll vs. |
| **Righteous Strike** (War) | damage mentioned without a number | Target only a creature that has dealt damage to you or one of your allies since the end of your last turn. |
| **Avenging Oath** (War) | damage mentioned without a number | Target one creature that has dealt damage to one of your allies this scene. |
| **Blood Sacrifice** (War) | damage mentioned without a number | - Add 2 x Mysticism to weapon damage. |
| **Updraft** (Tempest) | damage mentioned without a number | On a success, the target rides the updraft softly downward a short distance per round instead of falling and takes no falling damage when they land. |
| **Sleep** (Twilight) | damage mentioned without a number | A sleeping creature wakes and the condition ends immediately if they take any damage or suffer any other physical disturbance, such as being shaken, shoved, or moved, or if an adjacent creature spends |
| **Gaseous Form** (Twilight) | damage mentioned without a number | - You have resistance to physical damage and you cannot be grappled, restrained, or knocked prone. |
| **Primal Guardian** (Nature) | damage mentioned without a number | On a hit, subtract the weapon damage once from the total damage against each target. |
| **Sanctuary Sphere** (Peace) | damage mentioned without a number | While the sanctuary holds, apply the following effects on all creatures, including your allies: - Creatures inside the sanctuary cannot attack or cast spells that deal damage. |
| **Shadowform** (Twilight) | damage mentioned without a number | On a success, you take shadowform for a short duration while you concentrate, and gain the following: - You are immune to physical damage and cannot be grappled, restrained, or knocked prone. |
| **Ancestral Convergence** (Death) | damage mentioned without a number | In response to taking damage, the spirit throws itself before the blow. |
| **Wellspring of Life** (Life) | damage mentioned without a number | This is neither damage nor healing and cannot be increased, reduced, or prevented. |
