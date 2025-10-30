# Spell Rank Power Level Analysis

## Power Level Equivalence

Nexus RPG spell ranks map to D&D spell levels to ensure appropriate power scaling:

| Nexus Rank | D&D Level | Power Tier | Examples |
|------------|-----------|------------|----------|
| 0 | 0 | At-will cantrips | Prestidigitation, Light |
| 1 | 1-2 | Basic magic | Magic Missile, Cure Wounds |
| 2 | 3-4 | Moderate power | Fireball, Lightning Bolt |
| 3 | 5 | High power | Cone of Cold, Cloudkill |
| 4 | 6 | Very high power | Disintegrate, Chain Lightning |
| 5 | **7** | Peak mortal power | Delayed Blast Fireball, Plane Shift |

**Critical**: Rank 5 = D&D Level 7, NOT Level 9. Impressive but mortal-scale, not world-shattering.

---

## Damage Progression

### Standard Scaling

| Rank | Focus | TN | Single Target | AoE | Progression |
|------|-------|-----|---------------|-----|-------------|
| 0 | 0 | 6 | +2/+4/+6 | +0/+2/+4 | Cantrip (AoE reduced) |
| 1 | 2 | 8 | +4/+8/+12 | +2/+4/+6 | +2 per rank |
| 2 | 4 | 10 | +6/+12/+18 | +4/+8/+12 | +2 per rank |
| 3 | 6 | 12 | +8/+16/+24 | +6/+12/+18 | +2 per rank |
| 4 | 8 | 14 | +10/+20/+30 | +8/+16/+24 | +2 per rank |
| 5 | 10 | 16 | +12/+24/+36 | +10/+20/+30 | +2 per rank |

**Rules**:
- Single-target: Consistent +2 weak damage per rank (2→4→6→8→10→12)
- AoE: One rank lower (balances multi-target advantage)
- Rank 0 AoE: Special case +0/+2/+4 (balances unlimited casting)

See `spell-rank-guidelines.md` for deviation scenarios (area size, secondary effects, etc.).

---

## Current Rank Analysis

### Rank 3 Characteristics
**Examples**: Black Flame Bolt (+6/+12/+18), Solar Flare (damage + healing), Vitality Surge (radiant cone + heal)

**Power Level**:
- Strong single-target or AoE damage
- Battlefield-shaping effects
- Hybrid damage + utility combinations
- Short duration powerful buffs

### Rank 4 Characteristics
**Examples**: Arcane Empowerment (damage boost + cost reduction), Embrace of Night (invisibility + phase + cost reduction), Avatar of Storms (flight + temp HP + resistances)

**Power Level**:
- Transformation/empowerment effects
- Sustained tactical advantages
- Large-scale environmental control
- Still bounded by short duration and concentration
- Include drawbacks (fatigue, etc.)

### Rank 5 Target Power

**Guidelines**:
1. **Damage**: +8 to +10 base (not higher than +12)
2. **Area**: Large zones but not "entire battlefield"
3. **Duration**: Medium maximum (not permanent)
4. **Effects**: Powerful but escapable/counterable
5. **Transformations**: Enhanced rank 4, not immortality
6. **Control**: Significant battlefield impact, not total domination
7. **No Instant Wins**: No auto-kills or permanent solutions
8. **Concentration**: Most require concentration (can be broken)

**Power Comparison**:
- Rank 5 should be ~150% as powerful as Rank 4 (not 300%)
- Significant but not game-breaking
- Example: Rank 4 Avatar of Storms → Rank 5 Storm Lord adds +2 lightning aura, immunity to weather, enhanced flight

---

## D&D Level 7 Targets (Appropriate)

**Good Models**:
- Delayed Blast Fireball - More powerful Fireball, not reality-warping
- Plane Shift - Planar travel, requires known destination
- Reverse Gravity - Impressive environmental control, limited area
- Finger of Death - Powerful single-target, not instant kill
- Etherealness - Unique tactical advantage, temporary
- Forcecage - Powerful battlefield control, but escapable
- Regenerate - Restore lost limbs, not resurrection

**Avoid D&D Level 9** (Too Powerful):
- ❌ Wish - Reality alteration
- ❌ True Resurrection - Bring back long-dead
- ❌ Meteor Swarm - City-destroying power
- ❌ Time Stop - Break action economy
- ❌ Imprisonment - Permanent banishment
- ❌ True Polymorph - Permanent transformation

---

## Rank 5 Design Principles

1. **Impressive but Bounded**: Powerful within mortal limits, no reality warping
2. **Escapable**: Saving throws, spell resistance, countermeasures available
3. **Temporary**: Short to medium duration (not permanent)
4. **Costly**: Focus 10, often with fatigue or drawbacks
5. **Difficult**: Legendary TN (16) makes casting challenging
6. **Mortal Scale**: Affects battlefield/encounter, not armies or cities
7. **No Instant Wins**: No auto-kills, permanent effects, or "I win" buttons
8. **Concentration**: Most powerful effects require concentration (can be broken)

---

## Recommended Rank 5 Spells

### Arcane Disciplines

**Evocation**
- **Delayed Meteor**: +10/+20/+30 fire AoE, delayed detonation, can be disrupted, creates burning terrain
- **Prismatic Barrier**: Defensive sphere, multiple resistances, reflects damage, medium duration, can be overwhelmed

**Illusion**
- **Perfect Disguise**: Perfect humanoid mimicry with voice/mannerisms, medium duration, physical inspection reveals truth
- **Mass Phantasmal Force**: Complex illusion affecting up to 6 creatures, psychic damage, can be seen through

**Conjuration**
- **Planar Gateway**: Portal to known same-plane location, medium duration, requires prior visit, unstable
- **Enhanced Summoning**: Summon tier 4 creature or multiple lesser, better control, short duration

**Telepathy**
- **Mental Fortress**: Grant 6 allies immunity to charm/fear/psychic, shared thoughts, short duration, concentration
- **Psychic Maelstrom**: +10/+20/+30 psychic cone, confusion/stun, save to reduce

**Telekinetics**
- **Gravity Reversal**: Reverse gravity in medium area, creatures fall upward, short duration
- **Kinetic Barrier**: Telekinetic shield, redirect attacks, add Arcana to defense, absorbs 40 damage, medium duration

**Necromancy**
- **Army of Shadows**: Animate 4-6 tier 2 undead, independent but commanded, short duration, requires fresh corpses
- **Death's Master**: Temporary undead transformation, immunities/resistances, necrotic aura, drain life, add Arcana to damage, short duration, 2 fatigue after

### Mystic Traditions

**Light**
- **Radiant Convergence**: +10/+20/+30 radiant line, extra vs undead, dispels darkness, reveals truth, blinds briefly
- **Beacon of Truth**: Zone of truth in close area, no lies, illusions fail, hidden revealed, medium duration

**Twilight**
- **Dream Realm**: Pull targets into shared dream, control environment, time distortion, psychic effects, escapable
- **Shadow Apotheosis**: Become shadow creature, invisible in dim light, phase through objects, shadow attacks boosted, resistances, short duration, 2 fatigue after

**Life**
- **Mass Restoration**: Heal all allies in close area +12/+24/+36 HP, remove conditions, heal 1 wound each, once per day per target
- **Vitality Field**: Healing zone, +6 HP per turn, grant temp HP, remove conditions, medium duration

**Death**
- **Plague Wind**: +10/+20/+30 poison/necrotic cone, inflicts poisoned, spreads nearby (not exponential), curable
- **Death's Grasp**: Death curse single target, ongoing necrotic, prevents healing, weakens with saves, breakable

**Nature**
- **Primal Awakening**: Animate tier 4 plant/earth construct, follows commands, limited terrain reshaping, short duration
- **Nature's Wrath**: +10/+20/+30 damage cone (thorns/vines/stones), difficult terrain, grapples/restrains

**Tempest**
- **Storm Lord**: Transform into storm elemental, flight, enhanced lightning/wind, immunity to weather, add Mysticism to damage, short duration, 2 fatigue after
- **Tempest's Fury**: Massive storm in medium area, repeated lightning/wind attacks, difficult terrain, obscures vision, medium duration

**Peace**
- **Sanctuary Sphere**: Zone of peace in medium area, violence extremely difficult (not impossible), heals over time, resistances, medium duration, breakable
- **Harmonic Bond**: Link 6 allies, share damage/healing/buffs/resistances, coordinate attacks for bonuses, short duration

**War**
- **Warlord's Presence**: Legendary warrior avatar, enhanced combat, add Mysticism to weapon damage, extra attacks, inspire allies, frighten enemies, short duration, 2 fatigue after
- **Battlefield Commander**: Command battlefield, move allies tactically (no opportunity attacks), grant temp HP/bonuses, coordinate strikes, medium duration

---

## Spell Characteristics Summary

| Rank | Focus | TN | Duration | Scope | Power Philosophy |
|------|-------|-----|----------|-------|------------------|
| 0 | 0 | Easy (6) | Briefly-Short | Personal/Single | Minor utility, at-will |
| 1 | 2 | Medium (8) | Short-Medium | Close area | Useful combat/utility |
| 2 | 4 | Hard (10) | Short-Medium | Short area | Battlefield impact (Fireball-tier) |
| 3 | 6 | Very Hard (12) | Short-Medium | Medium area | Major combat/utility impact |
| 4 | 8 | Extreme (14) | Short-Medium | Large area/self | Transformations, major effects |
| 5 | 10 | Legendary (16) | Short-Medium | Large area | **Peak mortal power** |

**Key**: Rank 5 represents the pinnacle of mortal magical achievement in a Bronze Age sword & sorcery setting, NOT godlike power. Spells are impressive, difficult to cast, and tactically significant without reshaping reality, granting immortality, or providing permanent solutions.
