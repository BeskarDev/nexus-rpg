# School Rules — signature gimmicks and the rules each school binds

**The source for what a school's magic mechanically IS.** [schools.md](schools.md) is the lookup table —
traits, roles, damage types, typical conditions, synergy shorthand. This file holds the **rules a spell in
that school must obey**, which a table cannot carry.

Lifted out of `docs/analysis/_archive_/spells/schools/*.md` in 2026-09-14, because those files are archived
research and a rule cited from research has no home. What stayed behind is what belongs there: gap lists,
combo audits, spell counts and the derivation history.

**Never store a spell inventory or a coverage matrix.** Both are derived from the published data and go
stale the day a spell ships. Generate them:

```bash
# inventory by rank for one school
python3 -c "
import json,collections,sys
s='Evocation'
d=json.load(open('src/utils/data/json/arcane-spells.json'))+json.load(open('src/utils/data/json/mystic-spells.json'))
g=collections.defaultdict(list)
[g[x['rank']].append(x['name']) for x in d if x.get('discipline',x.get('tradition'))==s]
[print(r, len(g[r]), ', '.join(sorted(g[r]))) for r in sorted(g)]"
```

---

## Arcane Disciplines

**Conjuration — summoning, force constructs, spatial manipulation.** Creating things from nothing,
auto-hit missiles, containment wards, teleportation.

- **Missile spells are the signature offensive tool**: they **auto-hit**, and the balancing weakness is
  **per-missile AV reduction**. They deal **force** damage (full AV per hit), not blast.
- **No teleportation at R0.** Tactical mobility has to respect the rank ladder.
- **Binding means containment** (principle 8): lasting constructs that confine, seal or anchor — wards,
  barriers, force cages, dimensional anchors. Never a bare movement debuff.

**Evocation — element choice.** Many spells let the caster pick fire / frost / lightning / acid, each with
a distinct secondary effect; air spells give concussive force and repositioning.

- **The elemental split is the tactical depth**: fire sustains damage (`burning`), frost controls
  (`slowed`), lightning disrupts (`staggered`), acid degrades equipment (`corroding`), air repositions
  (push, `prone`).
- **Corroding is a Durability mechanic, not an AV mechanic.** Acid spells force **Durability checks** on
  armor and weapons, and apply a temporary AV reduction lasting at least a **short duration**. **R0 acid
  must not directly reduce AV** — it forces the Durability check only. Higher ranks combine both.
- **Evocation's `air` is not Tempest's weather**: raw elemental air pressure, compressed and detonated,
  against Tempest's natural storm. The flavor rule is principle 86.
- Defensive options exist and stay limited to elemental wards and barriers.

**Illusion — reality versus belief.** Illusions **persist until detected**, and detection is
**Spirit + Perception vs. Resist** carried by the `illusory` property. Layering is the signature: several
concurrent illusions compound, each lie making the next more plausible. Damage is psychic, and secondary to
the non-damage solutions the school exists for.

**Necromancy — the kill → corpse → exploit cycle.** Kill an enemy, use the body, build from it.
**Life siphoning is the only arcane healing and is selfish by design.** Minions buy action economy and cost
ongoing management.

**Telekinetics — positioning control.** Forced movement is the primary control tool and is **not a
condition**, which is what separates it from every other control school. **Blast damage (½ AV ignored)** is
the school's damage identity and fits kinetic shockwaves.

**Telepathy — mind reading and mental commands.**

- **Domination is priced by the ladder.** Cold full domination of an alert mind exists **only at R5**. Below
  that, control is reachable only by climbing `dazed` → `charmed` → commanded through payoff spells. **The
  ladder is the pricing** — do not write a shortcut past it.
- **Heighten-first coverage**: memory reading and communication scale by Heighten on one entry rather than
  a ladder of near-duplicate spells.

## Mystic Traditions

**Death — curse stacking and plague.** Multiple minor curses build toward a major affliction. Fear gives the
battlefield control, and damage is `necrotic` with ongoing effects rather than raw efficiency. Death is the
mystic counterpart to Necromancy and takes **curses and disease where Necromancy takes undead**.

**Life — healing and blessing.** The premier healing tradition, and **the intentional healing bottleneck**:
no other tradition may outpace it. Damage is restricted and defensive — life-force overload, punishing
undead, retaliatory bursts. **Wound healing stays extremely rare**; figures are in
[rank-scaling.md](rank-scaling.md) § Healing.

**Light — present, local truth.** Anti-undead and anti-illusion, radiant damage, blessings and
curse-breaking.

> **The divination boundary, stated identically in both schools.** Light owns *present, local truth* (the
> `True` keyword) — piercing lies, illusions, invisibility, disguise and obfuscation on what is in front of
> you. Twilight owns the *hidden, distant and yet-to-come* — scrying at distance, dreams, omens, prophecy.
> **Litmus:** *reveal a falsehood in front of me* → **Light**; *learn a distant secret or what is to come* →
> **Twilight**.

**Nature — beast and plant synergy, natural hazards.** Healing comes through natural remedies rather than
divine power. Environmental manipulation — terrain, weather, plants — is the primary utility tool.

**Peace — pacification and protection.** Sanctuary, barriers, damage sharing. **Damage must read as
defensive or deterrent, never aggressive.** Selflessness means self-sacrifice costs: HP transfer, taking the
hit, absorbing a death. Travel and law are the two thematic pillars.

**Tempest — storm power and environmental destruction.** Area denial through weather. **Blast damage
(½ AV ignored)** is the tradition's damage identity and fits concussive storm effects. Tempest **channels
natural weather** where Evocation violates the elements (principle 86).

**Twilight — shadow, dream and fate.** Stealth, prophecy, fear from darkness. `frost` damage represents the
cold of shadow and moonlight. Fear and sleep are the control tools. The divination boundary is under Light,
above.

**War — weapon blessing and battle fury.** `frightened` is the primary control condition and fear
exploitation rewards aggressive play. `bleeding` represents honorable wounds.
