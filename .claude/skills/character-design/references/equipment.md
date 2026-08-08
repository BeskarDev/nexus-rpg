# Equipment — step 9

Sources: creation step 8 in `docs/01-basic-rules/02-character-creation.md`, load rules in
`docs/04-equipment/01-items.md`, catalogues in `src/utils/data/json/{weapons,armor,equipment}.json`.

## The budget

**350 coins.** Plus 10 coins that cannot be spent at creation. Unspent coins are kept.

**Standard gear, free and already counted at 5 load:** backpack, two pouches, traveler's
clothes, hemp rope, camping kit, **one toolkit of choice**, rations (d4), torches (d4).

Two rules that change the arithmetic and get missed:

- **Selecting a weapon that needs ammunition grants one unit of that ammunition free.** One
  unit, and only against a weapon with the `ammo` property (bow, crossbow, sling, blowpipe,
  spear thrower).
- **The toolkit from standard gear costs 0 coins and 0 extra load.** Naming it (Climber's Kit,
  Brewer's Tools, Musical Instrument) is characterisation, not a purchase.

**Carrying capacity = ½ Strength + 8**: d4 10, d6 11, d8 12, d10 13, d12 14. Standard gear is
5 of it before anything is bought. Exceeding capacity means encumbered: +1 bane on movement
rolls, no Dash, no Evade, extra Fatigue on travel — for a starting character that is a broken
build, not a trade-off.

## Prices worth knowing

| | Cost / load |
|---|---|
| Light weapons (hatchet, shortsword, club, claw, cestus, whip) | 50c / 1 |
| Versatile weapons (battleaxe, longsword, broadsword, mace, spear, quarterstaff) | 100c / 1 |
| Two-handed heavy (greataxe, greatsword, maul, glaive, twinblade) | 150c / 2 |
| Thrown bundles (throwing axe/knife/club, javelin, bola) | 25–50c / 1 |
| Shortbow / Longbow / Warbow | 75c / 1 · 150c / 2 · 500c / 2 |
| Light / Heavy crossbow | 250c / 2 · 750c / 3 |
| Sling, spear thrower | 50c / 1 |
| **Leather / Banded Leather / Chain Mail** (light armor, AV 2/3/4) | 50c / 1 · 150c / 2 · 500c / 2 |
| **Scale Mail / Breastplate / Plate Harness** (heavy armor, AV 4/5/6) | 250c / 3 · 750c / 3 · 2,500c / 4 |
| Helmet (AV +1) | 150c / 1 |
| Light Shield (AV +1, parry +1) / Buckler / Heavy Shield | 150c / 1 · 150c / 1 · 500c / 2 |
| **Spell Catalyst** (arcane conduit or mystic talisman) | **75c / 0** |
| Healing Salve weak / simple / potent | 15c · 30c · 125c, 1 load each |
| Ammunition and thrown supply bundles | 5–30c / 1 |
| Extra toolkit, camping kit, alchemist's supplies | 50c / 1 |

Heavy armor beyond Scale Mail is out of reach at creation — a "heavy armor" fantasy starts in
leather or scale and states the upgrade path in its advancement line.

## The companion is a purchase too

A build with the `Animal Companion` talent or `Conjure Familiar` **pays for the creature out of
the same 350 coins** (owner ruling, 2026-08-08): 75 coins for a trained Tier 1 companion, 100
coins of ingredients for the familiar ritual. The talent grants the ability to keep one, never
the creature. Budget it before the consumables, or state that the character starts without one
and tames it in play. See [companions.md](companions.md).

## Buying order

1. **The thing the fantasy needs.** The weapon, catalyst or tool without which the character
   cannot do the sentence. Buy it first, at the quality the build deserves.
2. **The defence the role needs.** A frontliner buys armor and often a shield; a caster or
   skirmisher buys light armor at most.
3. **The second option.** The thrown weapon for the archer's rank-0 melee art, the sling for
   the caster, the backup blade.
4. **Consumables.** One or two healing salves is the standard hedge; a poison or an acid vial
   suits a build whose fantasy is preparation.
5. **Keep the remainder if it is characterful.** A build that ends on 100 spare coins is a
   character who is saving for something — say so in the advancement line.

## Rules of thumb

- **Every weapon must be usable by the build**: a two-handed weapon plus a shield is illegal;
  an `ammo` weapon needs its supply; heavy weapons impose a bane on some arts without the
  matching talent.
- **Buy exactly the weapon the combat arts require.** The art/weapon check fails the build
  otherwise, and it is the fastest way to find a kit that does not match its plan.
- **A caster without a Spell Catalyst cannot cast.** 75 coins, 0 load, non-negotiable.
- **Do not buy tools for skills the build does not have.** A Disguise Kit on a build with no
  Stealth is 50 coins of nothing.
- **Names must match the catalogue exactly** — `Leather`, not "leather armor"; `Healer‘s Kit`
  with the catalogue's U+2018; `Rope (Hemp)`, not "rope". The generator fails on an unresolved
  name and does no fuzzy matching, deliberately. (Body armor is *rendered* as "Leather Armor"
  on the page; the data still says `Leather`.)
- **Watch the load, not just the coins.** Two 2-load weapons plus armor plus consumables is 9
  or 10 load against a capacity of 11 or 12, and standard gear already took 5.

## Checks before moving on

- Total spend ≤ 350; remaining coins stated.
- Total load (equipment + 5 standard gear) ≤ carrying capacity.
- Free ammunition claimed exactly once, and only with an `ammo` weapon.
- Catalyst present for any caster; toolkit named for any build that uses one.
- Every item resolves in `weapons.json`, `armor.json` or `equipment.json` by exact name.
- Nothing in the kit is unused by the build's plan.
