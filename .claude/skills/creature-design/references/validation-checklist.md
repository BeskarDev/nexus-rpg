# Validation Checklist

Run at **workflow step 7**, against the finished draft. Numeric rules cite their home in
[stat-tables.md](stat-tables.md); design rules cite a principle number in
[principles/](principles/).

### Chassis
- [ ] HP for tier; format matches category (`40` / `2×40` / `3×40`)
- [ ] AV = tier (light) or **1.5 × tier rounded up** (heavy) — D-014
- [ ] Defense from the tier table (**+1 per two tiers above tier 5**) — D-015
- [ ] **Defense spread is base ±1 by default**, size on top; `base + 2` is rare, is the tier's ceiling for a
      single Defense, and is paid for in HP or AV — D-142
- [ ] **`heavy` armor costs one tier of Defense base**, and Parry sits mid-spread or below — D-141
- [ ] Damage = base + 1×/2×/3× weapon damage. Never a doubled increment. **An always-on critical bonus
      is the one exception and must be declared** — see § Always-on bonuses below
- [ ] **Paired natural weapons carry `light` and take HALF the tier's weapon damage each** (they attack twice); a single natural weapon takes the full figure — D-076
- [ ] Ability TNs = 6 + tier
- [ ] Skill ranks match the tier table
- [ ] Tier adjustments balanced — one stat down for one stat up, one pair only

### Taxonomy
- [ ] Type is one of the twelve; subtype values come from `creature-subtypes.json` or `creature-additives.json`
- [ ] **Undead and Automaton carry exactly one of `Mindless` / `Intelligent`**
- [ ] Condition immunities follow the additive, not the type
- [ ] Anglicised name, no diacritics (D-050)

### Abilities
- [ ] Every ability has a **Trigger**, an **Effect** naming who/what/how much/how long, and a **Limit**
- [ ] Qualifier is ONE closed-list value with nothing after it; any limiter is the LAST SENTENCE of the text; limiter is `recharge (dX)`, `once per scene`, or `once between your turns`
- [ ] **Only an `Action` may carry a limiter at all** — never a Passive (category error), never a Quick Action (already once between turns), never a trigger. On an attack the limiter is likewise the last sentence and never a property badge — D-077, placement per D-107
- [ ] **No `X/day`, no `once per combat`, no `once per turn`**; `recharge` uses d4/d6/d8 only
- [ ] Attack count fits category (Basic 1–2, Elite 2–3, Lord 3–5)
- [ ] Ability count fits category (Basic 3, Elite 4, Lord 6). **Named slots count toward the total and may overlap** — D-030
- [ ] Elite: Elite Trigger + defensive + Quick Action. **Lord: two Lord Triggers** + defensive + Quick Action.
      **A Lord has ONE Quick Action per round** — the second turn does not carry a second one, so do not write
      a reactive and a proactive one and call it two abilities — D-165
- [ ] **Elite and Lord produce TWO effects on a turn**, and the second is never a second attack roll: a
      proactive Quick Action, an attack rider, or a Passive engine — principle 60b. **A Basic does one thing
      a turn, which is intended**
- [ ] **Every attack in the list is a live option** — different range band, target set or rider. Two attacks
      differing only in a damage figure are one option printed twice — principle 60a
- [ ] **Lord only: a setup-to-payoff pair on the menu**, so two turns a round cannot be the same turn twice —
      principle 60c
- [ ] **Resolve-priced ability: Lords only, at most one**, cost as the last sentence — principle 61
- [ ] Trait count within guideline (Basic 2, Elite 3, Lord 4); over it, the rest is tuned down — D-026
- [ ] Every trait passes the four boundary questions
- [ ] No "Special Rules" or "Combat Notes" sections — category rules are automatic

### Defence
- [ ] Every defensive ability names a **cost** and a **counterplay the party can act on**
- [ ] **No auto-success on a failed save, at any tier** — D-023
- [ ] No more than **+2 to a single Defense**, ending by the creature's next turn. AV bonuses uncapped
- [ ] **`resistances` non-empty implies `weaknesses` non-empty** — D-035
- [ ] Damage immunity is rare, identity-gated, one type, normally tier 7+ — D-036
- [ ] **No permanent physical immunity**; no "non-magical weapons" wording — D-037

### Wording
- [ ] Official conditions and durations only; damage types from the published list
- [ ] Duration chosen deliberately: `briefly` (one turn) for common riders, `short` (rest of the fight) for signature effects
- [ ] **The duration comes BEFORE the condition: `briefly dazed`, never `dazed briefly`** — D-074
- [ ] **`briefly` never spelled out longhand** as "until the end of their next turn"
- [ ] Disabling conditions **escalate** — either across two strong-or-critical hits or across the success level of one roll, never off a single undifferentiated hit — D-029, D-151
- [ ] Secondary damage in its own sentence after the triple, with `(ignore AV)` — D-018
- [ ] Rider magnitudes scale with tier; grapples state their limb cost
- [ ] they/their/them for creatures. No semicolons, no em or en dashes
- [ ] Every spell verified by grep against `arcane-spells.json` / `mystic-spells.json`; rank ≤ magic skill rank

### Thematic and balance
- [ ] One clear tactical lesson; a Treat the party can act on (any of the five channels)
- [ ] Fits sword & sorcery ancient-world aesthetic; drawn from the vault where possible
- [ ] Single creature ≈ one same-level adventurer; power consistent within tier
- [ ] Triggers create phases rather than raising numbers
- [ ] Not trivially defeated by common tactics; no auto-win abilities

### Publication
- [ ] Nothing hand-edited in `docs/08-creatures/03-creatures/tier-*.mdx` — they are generated and the CI
      staleness gate fails on any edit
- [ ] `bun run content:check` clean and `bun run build` green

## After the checklist — the principle sweep

**A design pass that never re-opened a principle file has not been validated, it has been written.** Open
each phase file you used and check the draft against its principles by number.

| Sweep | Ask of the draft |
|---|---|
| [identity.md](principles/identity.md) | **Re-read the name now that the kit exists** — head noun agreeing with the type line, one modifier (principle 52). Does it promise what the stat block delivers? Is a real animal called by its real name, an invented one built as *one* deviation, a folk creature inheriting only what its folk entry grants? |
| [chassis.md](principles/chassis.md) | Every number off the tier table, at most one traded pair? **Was the tier-adjustment question asked, and is the answer written down even when it is "no"?** Timer, Threat and Treat present, and is the Treat real rather than invented? |
| [attacks.md](principles/attacks.md) | Every carried attack declaring its `weapon` row, with the catalogue's properties and damage (principle 44) — a green `content:check` is the answer. Any paired or conditional second attack priced off the AV table (principle 41)? |
| [abilities.md](principles/abilities.md) | Every condition checked against its published text, every high-impact one gated, every defence counterable? Triggers escalating and opening `When this creature suffers a Wound`? Nothing restating a universal action? Every qualifier one word, every limiter the last sentence? Elite or Lord producing **two effects a turn** with a live Action menu, and a Lord with a setup-to-payoff pair (principle 60)? |
| [writing.md](principles/writing.md) | Canonical wordings verbatim? Subject named where two creatures share a sentence? Superstitions recorded rather than debunked, nothing said twice? **Register pass run on every prose field and every treasure row, with the swap list written down** (29a). A punctuation sweep is not a register pass |

**Then sanity-check against 2-3 published creatures of the same tier and category** — comparable power,
no strict domination.
