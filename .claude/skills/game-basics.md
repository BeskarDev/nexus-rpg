# Nexus RPG — Core System Reference

Shared reference for all design skills (spell-design, talent-design, creature-design, magic-item-design).

## Dice System

- **Core resolution**: Attribute Die + 1d6 + Skill Rank vs. Target Number (default TN 8).
- **Attributes**: Strength (STR), Agility (AGI), Spirit (SPI), Mind (MND) — die sizes d4 to d12+1.
- **Success Levels**: Blunder (−6 or more below TN), Failure (−1 to −5), Weak Success (0–2 above), Strong Success (3–5), Critical Success (6+).
- **Boons & Banes**: roll 2d6, take higher/lower. Only the net of boons − banes applies.
- **Skills**:
  - **General** (no penalty untrained): Athletics, Fortitude, Influence, Insight, Perception, Stealth.
  - **Expert** (+1 bane untrained; magic skills impossible untrained): Arcana, Archery, Crafting, Education, Fighting, Lore, Mysticism, Nature, Streetwise, Survival.

## Roll Distribution — What One Point Is Worth

A roll is **two dice summed** (attribute die + 1d6), so the total is **trapezoidal**, not flat. Every
±1 you hand out or take away — a bonus, a TN, a Defense, an item's quality step — is priced by this
table, not by intuition. Use it before setting any numeric value.

### The marginal rule

**Inside the flat middle of the curve, +1 is worth `1 / attribute die size`.** It tapers at the tails,
so a target already far above or below the roller's range moves less per point.

| Attribute die | Flat band width | Hit% per ±1 |
|---|---|---|
| d4 | 3 | **25.0** |
| d6 | 1 | **16.7** |
| d8 | 3 | **12.5** |
| d10 | 5 | **10.0** |
| d12 | 7 | **8.3** |

Consequence worth remembering: **a point is worth less to a stronger roller.** A +1 that swings 16.7
points against a d6 character swings 8.3 against a d12 one. Flat bonuses compress as characters grow;
effects that scale with Success Level do not.

### Success chance by attribute die (no skill rank, no boons)

| Die | TN 6 | TN 8 | TN 10 | TN 12 | TN 14 | TN 16 |
|---|---|---|---|---|---|---|
| d4 | 58% | 25% | 4% | 0% | 0% | 0% |
| d6 | 72% | 42% | 17% | 3% | 0% | 0% |
| d8 | 79% | 56% | 31% | 12% | 2% | 0% |
| d10 | 83% | 65% | 45% | 25% | 10% | 2% |
| d12 | 86% | 71% | 54% | 38% | 21% | 8% |

Add skill rank and any flat bonus to the roll, or subtract it from the TN — same thing.

### A boon is worth about +1

Measured across every attribute die and TN, **+1 boon ≈ +1 flat bonus** (it gains 8–12 points in the
middle of the curve, which is one marginal step). They are interchangeable in power, so choose between
them on **stacking behaviour and feel**, never on strength: boons cancel banes one-for-one and stop
compounding after the first, flat bonuses just add.

### Bonuses move the whole Success Level ladder

Damage is `base + SL × weapon damage`, so a bonus does far more than convert failures into hits. Example
— d10 + 1d6 + 3 against TN 12:

| | Blunder | Fail | Weak | Strong | Critical |
|---|---|---|---|---|---|
| base | 5% | 40% | 30% | 20% | 5% |
| **+1** | 2% | 33% | 30% | 25% | 10% |
| **+2** | 0% | 25% | 30% | 28% | **17%** |

Weak successes stay flat at 30% while **critical rate more than triples**. Mass moves up the ladder,
not merely across the pass/fail line. Price accuracy bonuses as damage bonuses, because that is what
they are.

### Defense is not AV

The same asymmetry, stated once because every design skill hits it:

- **Defense** is multiplicative on the whole attack and holds its value at every tier. One point is
  worth roughly **18–25% of incoming damage**.
- **AV** is linear damage reduction and shrinks in relative terms as damage grows. One point is worth
  **2% at high tier, 7% at low**.

**Defense is 3× to 9× stronger per point than AV, and the gap widens with tier.** At the top of the
range +2 Defense is worth about +9 AV. Treat a Defense bonus as a scarce, expensive thing; treat an AV
bonus as cheap. The published rules already behave this way — across `docs/`, +1 Parry/Dodge/Resist
appears ~80 times and +2 appears ~27, while +3 or higher is essentially absent.

## Character Progression

- **XP**: 1 per session, 2 for significant milestones.
- **Levels 1–10**: based on total XP spent; each level raises HP, attributes, and the per-skill XP cap.
- **Skill ranks 0–5**: cost 2/6/12/18/24 XP.
- **Talents**: every 2 XP in a skill grants 1 talent point for that skill's talents.

## Combat

- **Initiative**: Spirit + Perception, descending order.
- **Per turn**: one Action + one Quick Action + Movement.
- **Attack damage by Success Level**: Weak = base + weapon, Strong = base + 2×weapon, Critical = base + 3×weapon.
- **Distances**: Melee, Close, Short, Medium, Long, Very Long, Extreme.

## Canonical Keyword Sources

Every ability must use these established keywords exactly — never invent or paraphrase them. When referencing a condition, property, or duration, verify it against the canonical page:

| Keyword class | Canonical page |
|---------------|----------------|
| **Conditions** | `docs/05-combat/04-conditions.md` |
| **Effect durations** | `docs/06-scenes/02-effect-durations.md` |
| **Weapon/armor properties** | `docs/04-equipment/05-armor-weapon-properties.md` |
| **Spell properties** | `docs/07-magic/05-spell-properties.md` |

### Official Conditions (complete list)

bleeding (X), blinded, burning (X), charmed, confused, dazed, deafened, deprived, distracted, frightened, grappled, hidden, invisible, marked (X), paralyzed, poisoned, prone, pushed, restrained, silenced, slowed, staggered, stunned, suffocating, unconscious.

25 conditions, verified against `src/utils/data/json/conditions.json` (the canonical source the page is generated from).

Anything else ("cursed", "weakened", "corroding", "energized"…) is **not a condition** — either use an official condition or spell out the exact mechanical effect ("+1 bane on all rolls for a short duration").

**Only `paralyzed` and `unconscious` remove a turn.** This is deliberate and it is the main thing that keeps Nexus off save-or-lose. `stunned` in particular does **not** disable — it is `staggered` + `dazed` + `slowed` plus one clause (attackers gain +1 boon), so it is a heavy restriction, not a skipped turn. Designers importing the D&D reading of "stunned" will reach for it expecting a disable and ship something weaker than they intended. Impact bands, strongest first:

| Band | Conditions |
|---|---|
| **Disabling** — no Actions, Quick Actions or Movement | paralyzed, unconscious |
| **Turn-shrinking** — move *or* act, no Quick Actions | stunned, staggered, confused, frightened |
| **Suppressing** — a category of action denied, or Movement 0 | restrained, grappled, blinded, silenced, dazed, deprived |
| **Minor** — a bane, a movement tax, or lasting damage with a stated way out | poisoned, slowed, distracted, prone, pushed, marked (X), bleeding (X), burning (X), deafened |

Gate the effect to the band: minor may ride a Success Level with no save; suppressing needs a rolled attack or a save; turn-shrinking needs a save **and** a bound; disabling needs a save, a bound, **and** a stated counterplay.

### Effect Durations (complete list)

| Duration | Lasts |
|----------|-------|
| **Briefly** | until the end of your next encounter turn |
| **Short** | until a short break, or one delving turn |
| **Medium** | one hour, or one exploration turn |
| **Long** | until the end of a night's rest, or one travel turn |
| **Very Long** | one downtime turn |

## Power Ceiling

Bounded mortal pinnacle: Rank 5 spells ≈ D&D level 7; Rank 5 martial skill ≈ D&D level 10–12. Effects are temporary, escapable, counterable. No reality-warping, no auto-wins, no permanent solutions.

## Writing Standards

- **Bold** for mechanical terms, conditions, key concepts; *italics* for flavor, spell names, tradition/discipline names.
- Exact established terminology: "Success Level", "Target Number", "bane/boon", "roll Strength + Athletics".
- Active voice ("you gain +1 boon", not "a +1 boon is gained").
- Every ability specifies trigger ("On a hit", "Once per day", "While wearing"), effect, and limit.
- Order within effect text: **general application first, exceptions and restrictions after** — declare the full basic effect, then follow with limiting sentences. Shared limits repeat the same sentence verbatim across all affected abilities (visible at point of use, never buried in a rules chapter).
- Examples in quote blocks (`>`).
- Tone: authoritative but accessible, evocative of ancient Bronze Age civilizations without purple prose.
- Lead with mechanics, then flavor that enhances rather than obscures.

### Reading level

**Write for a middle schooler.** Roughly ages eleven to fourteen: plain words, short clauses, one idea
per sentence. A rule that has to be read twice has failed, and a player who has to stop and work out a
word has stopped playing.

**The test:** could a twelve-year-old read this aloud and say what happens? If not, it is the writing,
not the reader.

This bans **ornament, not vocabulary**. A hard word is right when it is the *precise* word and no
shorter one means the same thing — `parry`, `boon`, `sarcophagus`, `sinew`, `signet` all stay, because
each names something exactly and the reader learns it once. A hard word is wrong when a common word
would have done the same work:

| Reaching | Plain |
|---|---|
| the shaded side of a bund | the shade of the bank |
| fish offal | fish guts |
| carapace | shell |
| which processions leave food | which funerals leave food |
| the fill under a tomb floor | the packed earth under a tomb floor |
| utilize, commence, numerous, requisite | use, start, many, needed |

Two habits that quietly raise the reading level without adding a single long word:

- **Stacked clauses.** Three ideas joined by "and" and a trailing "which" costs a reader more than any
  vocabulary does. Split the sentence.
- **Abstract nouns doing a verb's job.** "Their behaviour is one of avoidance" is harder than "they
  keep away", and longer.

The register is *plain and confident*, not childish. Short sentences about concrete things are how
folklore has always sounded, which is also the voice this setting wants.
