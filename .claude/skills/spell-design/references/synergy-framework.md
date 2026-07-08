# Spell Synergy Framework

The design groundwork for how spells combine — within a school, across a caster's turns, and across a party. Every school's **Internal Synergies** section in `docs/analysis/spells/schools/*.md` instantiates this vocabulary. Read this before designing any spell that is meant to combo, and before rewriting a school's synergy section.

The old per-school synergy notes named individual spells ("Fireball + Frost Wave"). That is too low-level to design against. This framework is the high-level layer above it: the *roles* spells play, the *axes* they combine along, and the *shared currency* that lets different schools and different players plug into each other.

**This is a fantasy TTRPG, not an MMORPG.** The roles and sockets below are design vocabulary, never in-game keywords. A "setup" is a burning enemy or a wall of stone the table can see and describe, not a stack counter. Every synergy must read as something happening in the fiction of a Bronze Age sword & sorcery world — the mechanical hook rides on a diegetic state (a creature is on fire, prone, terrified; the ground is slick; a ward hangs in the air), and it must make sense for the campaign world even outside combat (principle 33). If a combo only makes sense as an ability-rotation, redesign it.

---

## The three synergy roles

Every combo is built from three roles. A spell can fill one role, or more than one, but the roles are distinct jobs and a school needs all three represented across its ranks to have a real synergy engine (this extends the internal-completeness checklist, principle 9).

### 1. Setup
Establishes an exploitable **state** that has little value on its own. Three kinds of state:
- **Condition** on a target — slowed, prone, marked, burning, bleeding, frightened, restrained, vulnerable, charmed, dazed.
- **Reshaped field** — a zone, wall, cluster of enemies, difficult terrain, an area of darkness or light, cover.
- **Lowered defense / opened resource** — stripped AV, an opened mind, a planted mark, a stored charge (temp-HP shield, a corpse, a sigil).

A setup spell is deliberately underwhelming when measured alone. Its power is *latent* — banked until something spends it.

### 2. Payoff
**Consumes or exploits** an existing state for amplified output: bonus damage against a conditioned target, a rider that only triggers on marked/prone/clustered enemies, a burst that detonates a stored resource, an effect that lands automatically because a defense was already stripped.

**Binding rule — the cold-cast deficit.** A payoff spell must be *worse than a plain, on-curve spell of its rank when cast cold* (with no setup present). That deficit is exactly the synergy reward: the payoff only pulls ahead once the setup is paid for. If a payoff is also the best pick with no setup, the setup is pointless and the "combo" is a trap option. Price the payoff below curve and let the setup buy it back up.

### 3. Extender
Keeps the payoff window **open across turns** so a combo becomes an engine rather than a one-shot. Four kinds:
- **Refresh** — re-apply or top up the setup state (a cantrip tap that keeps *burning* alive, a weapon enchant that re-slows on each hit).
- **Spread** — carry the state to new targets (condition jumps to an adjacent enemy, a zone grows).
- **Convert** — transform one state into a stronger one (poison → decay, prone → restrained, charmed → dominated).
- **Prolong** — lengthen a zone, duration, or mark so the payoff has more turns to cash in.

Extenders are what let a *second caster* plug into a combo mid-fight, and what stop a solo engine from sputtering after one exchange.

---

## The two axes combos compose along

### Solo engine (multi-turn)
One caster sequences the roles across their **own** turns: setup on turn 1, payoff on turn 2, extender on turn 3+ to sustain the loop. The loop must be **gated** so it cannot fire for free every round — by Focus cost, by concentration (holding one effect blocks another), and by the action economy (setup and payoff usually can't both happen in the same turn). A solo engine that runs every turn with no tension is over-tuned; the gates are the cost of the payoff.

### Party interlock (multi-player)
Synergy **across** casters and with martial characters. The core idea: **conditions are shared currency.** A state one character emits — a slowed enemy, a force wall, a marked target, a cluster — is a hook *any* ally can spend, not just its author. A school's identity in party play is defined by two lists:
- **Emits** — the shared states this school reliably produces for others to exploit. This is what makes the caster a force-multiplier.
- **Wants** — the states this school's payoffs are hungry for but cannot produce well itself, so it leans on allies to supply them.

A well-designed school both gives and takes. A school that only emits is a battery with no engine; one that only wants is a soloist that ignores the party.

---

## The shared socket set (cross-school currency)

The interlock only works if schools speak a common language. These are the **shared conditions and field states** that act as universal sockets:

> slowed · prone · burning · bleeding · frightened · restrained · marked · vulnerable · staggered · dazed · charmed · difficult terrain · cover · cluster (enemies grouped) · stripped AV

Design new synergy spells to **emit or reward states from this set**, not invent a private trigger that only the same school's own spells can use. A private condition (e.g. "only *my* spells benefit against a *soul-marked* target") walls the school off from party play and should be the rare exception, justified by a strong identity reason. The default is: plug into the shared sockets.

A school's mechanical identity can be read off *which sockets it emits vs rewards*:
- Evocation emits *burning/slowed/staggered* and rewards *clustered/conditioned*.
- Telekinetics emits *prone/pushed/cluster* and rewards *prone*.
- Peace emits *protected/dazed/cover* and rewards *allies who abstain from attacking*.
- Necromancy emits *marked/corpses* and rewards *its own marks and the dead* (a partly private economy — the identity exception).

---

## Per-school section template

Rewrite each school's `### Internal Synergies` section to this shape. Keep it high-level — name concrete spells only in the **Solo engine** line and the one cross-player line, everything else is roles and sockets.

```
### Internal Synergies

**Setup levers** — states this school emits: [conditions / fields / defense-strips].
**Payoff levers** — what this school rewards and amplifies: [triggers]. (Cold-cast deficit applies.)
**Extenders** — how it sustains the window: [refresh / spread / convert / prolong, with which].

**Solo engine** (multi-turn): [T1 setup spell → T2 payoff spell → T3 extender], gated by [Focus / concentration / action].
**Party interlock**: emits [shared states allies can spend] · wants [shared states allies provide]. [One concrete cross-player line naming an ally archetype.]

**Synergy gaps**: which of setup / payoff / extender the school is missing → design targets.
```

---

## Design checklist for a synergy spell

Before finalizing any spell intended to combo:

1. **Which role?** Name it — setup, payoff, or extender. If it tries to be all three at full strength, it is probably overtuned.
2. **Cold-cast deficit** (payoffs only): is it worse than an on-curve spell with no setup present? If not, re-price it down.
3. **Shared socket?** Does it emit/reward a condition from the shared set, so allies can plug in? If it uses a private trigger, is the identity reason strong enough to justify walling it off?
4. **Gated engine?** If it enables a solo loop, does Focus / concentration / action economy stop it firing free every turn?
5. **Gives and takes?** Does the school's overall kit both emit states others want and want states others emit — or is this spell making it a pure battery or a pure soloist?
6. **Counterplay?** Setup states must be diegetic and endable (save-ends, duration, deststructible field) so a combo is not an auto-win (principles 33, 35).
