# Combat Art Fixes — GDD

> **Status:** Open design document. Extracted 2026-08-18 from the combat arts design analysis (archived at `_archive_/combat-arts-design-analysis.md`).

> **Scope:** System-level fixes to the existing Combat Arts system — the save difficulty rule, Supreme art renames and redesigns, balance adjustments to existing arts, tonal guidelines, and the design checklist and power ceiling for future supreme arts. New content proposals live in `new-combat-arts-gdd.md`.

**Implementation note:** Canonical combat art data lives in `src/utils/data/json/combat-arts.json`. The docs pages under `docs/05-combat/05-combat-arts/` are generated from it — never hand-edit the `.mdx`. Edit the JSON, then run `bun run content:gen`.

---

## 1. System Rule: Save Difficulty Scaling

### The Problem

Several combat arts force targets to roll saves against their effects. Currently these saves use a static default TN of Medium (8) with no scaling based on the attacker's skill rank.

At higher levels, enemy Fortitude and Athletics grow significantly. A Tier 5+ creature rolling d10 Strength + 3 Fortitude + 1d6 averages 12.0 against a TN of 8 — an 88%+ success rate. The attacker's Knockout or Head Smack becomes nearly useless against level-appropriate foes, even on a Critical (which only makes the save "hard" = TN 10, still easily beaten).

This creates a scaling mismatch:

- **Spells** scale naturally because the caster rolls against the target's Defense (Resist, Dodge, etc.), and the caster's skill + attribute improve over time.
- **Combat art saves** ask the *target* to roll against a fixed TN, so the target's growth trivializes the check while the attacker gains nothing.
- **Creature ability difficulties** already scale with tier (6 + Tier), showing the system already recognizes this problem for monsters.

### Affected Combat Arts

| Art | Current Save | Issue |
|-----|-------------|-------|
| Knockout | Str + Fort vs. Medium (8) | Trivial at Tier 4+ |
| Disabling Shot | Str + Fort vs. Medium (8) | Trivial at Tier 4+ |
| Head Smack | Str + Fort vs. Medium (8) | Trivial at Tier 4+ |
| Terrifying Strike | End-of-turn Spirit + Fort vs. Medium (8) | Recovery too easy at high levels |
| Divert Attention | End-of-turn Spirit + Insight vs. Medium (8) | Recovery too easy at high levels |
| Pinning Shot | End-of-turn Str + Athletics vs. Medium (8) | Recovery too easy at high levels |

Arts like Felling Strike, Ram Down, and Charge don't have this problem because their effects (prone, pushed) are applied directly on hit without a save.

### The Rule

Adopt the creature system's approach (6 + Tier), mirrored for player characters. **Add the following rule to the Combat Arts overview page:**

> **Combat Art Difficulty.** Whenever a combat art forces a target to roll against one of its effects, the Difficulty of that roll is 6 + your rank in the relevant skill (Fighting for melee weapons, Archery for ranged weapons).

| Skill Rank | Save TN | Equivalent Difficulty |
|-----------|---------|---------------------|
| 0 | 6 | Easy |
| 1 | 7 | Easy–Medium |
| 2 | 8 | Medium |
| 3 | 9 | Medium–Hard |
| 4 | 10 | Hard |
| 5 | 11 | Hard–Very Hard |

**Why this works:**

1. **Clean parallel with creatures.** Creature abilities use 6 + Tier; player abilities use 6 + Skill Rank. Both scale linearly and meet at the same numbers (Tier 3 creature = Rank 3 character, both TN 9).
2. **Gradual scaling.** The progression from TN 6 to TN 11 is modest — it won't make low-tier saves impossible but keeps high-tier saves meaningful.
3. **Replaces talent-based scaling.** This eliminates the need for individual talents to boost save TNs (which the designer noted feels "fiddly"). The scaling is baked into the combat art system universally.
4. **Doesn't affect non-save arts.** Arts like Cleave, Charge, Brutal Strike, and Defensive Strike have no save mechanic and are unaffected.
5. **Success Level scaling still layers on top.** The existing SL modifiers (e.g., Critical making the save "hard," which imposes +1 bane on the target's roll) continue to apply on top of the new base TN. A Critical from a Rank 4 fighter would force a TN 10 save made with +1 bane — genuinely threatening at any level.

**Implementation:** A single-sentence rule addition to the Combat Arts overview page, applying universally to all arts that force saves. No individual art text needs to change — they already say "the target must roll X" without specifying a TN, so the new rule fills that gap cleanly.

---

## 2. Supreme Art Renames and Redesigns

### 2.1 Why Rename the "Supreme X" Arts

The "Supreme X" naming pattern has two problems:

1. **It's mechanically descriptive, not evocative.** Compare "Supreme Cleave" to "Death from Above" or "Rip and Tear." The signature arts have names that players *want* to say at the table. "I use Supreme Cleave" generates no excitement.
2. **It creates a false expectation that every basic art can be "Supreme'd."** Players will naturally ask "Where's Supreme Brutal Strike?" or "When do I get Supreme Charge?"

Give upgraded basic arts unique, evocative names that signal they're enhanced versions of a known technique without using the "Supreme" prefix. The description can note "This Combat Art replaces [basic art]" to maintain the mechanical connection.

Beyond naming, three of the four current upgrades are numerically incremental rather than tactically transformative:

| Art | What Changes from Basic | Feels Like... |
|-----|------------------------|---------------|
| Supreme Cleave | +2 targets, +1 range step | "Cleave but more" |
| Supreme Barrage | +1 extra attack with escalating banes | "Barrage but more" |
| Supreme Feint | +4 damage, marked (4) | "Feint but harder" |
| Supreme Disarm | +2 boons, throw/grab option, briefly dazed | Actually transforms the move |

Supreme Disarm works because it changes what you can do — you can weaponize a disarm by throwing the item or daze the target. The other three just increase numbers. A soul-powered upgrade that merely adds +2 targets or +4 damage doesn't sell the fantasy of "channeling your warrior's soul into an existing technique."

### 2.2 Supreme Feint → **Ghost Step** (Redesign)

**Current:** If you don't move during your turn, you gain +1 boon on the attack with a non-heavy melee weapon. On a hit, you also deal +4 damage and the target is marked (4).

**Proposed:** *You can only learn this Combat Art if you already know Feint. This Combat Art replaces Feint.*
Your feint is so masterful that your opponent loses track of your true position. If you don't move during your turn, you gain +1 boon on the attack with a non-heavy melee weapon. On a hit, the target is briefly dazed as they are thrown off balance by your deception. Until the start of your next turn, attacks against you suffer +1 bane as enemies struggle to track your true position.

**Rationale:** This creates a unique tactical loop — the Ghost Step user becomes harder to hit after executing their feint, rewarding the "no movement" constraint with both offensive and defensive value. The stagger condition is more impactful than flat damage and marked.

### 2.3 Supreme Barrage → **Storm of Arrows** (Redesign)

**Current:** You can roll two additional attacks with a non-heavy ranged weapon. You suffer +1 bane and +2 banes on the first and second additional attack respectively.

**Proposed:** *You can only learn this Combat Art if you already know Barrage. This Combat Art replaces Barrage.*
You unleash a devastating barrage that overwhelms your target's defenses. You can roll two additional attacks with a non-heavy ranged weapon, suffering +1 bane on the first additional attack. On the second additional attack, instead of rolling, automatically deal damage equal to your weapon damage (ignore AV) to the same or a different target within range.

**Rationale:** The current escalating bane (+2 banes on the third shot) makes it nearly worthless. The auto-hit-for-weapon-damage on the third attack guarantees value and creates a "rain of arrows" feel where sheer volume overwhelms defense.

### 2.4 Supreme Cleave → **Reaping Arc** (Redesign)

**Current:** Your attack with a two-handed melee weapon hits up to 4 additional creatures in your weapon's reach or one distance further. On a hit, subtract your weapon damage once from the total damage.

**Proposed:** *You can only learn this Combat Art if you already know Cleave. This Combat Art replaces Cleave.*
You channel your soul's power into a devastating sweeping strike that sends a shockwave through your enemies. Your attack with a two-handed melee weapon hits up to 4 additional creatures within close range. On a hit, subtract your weapon damage once from the total damage against each target. Additionally, all targets hit are knocked prone if they are not of larger Size than you.

**Rationale:** Adding the prone condition transforms this from "Cleave but more targets" into a battlefield-control ability. The AoE prone creates tactical opportunities for the whole party and justifies the soul-power fantasy.

### 2.5 Supreme Disarm → **Soul Rend** (Rename Only)

**Current mechanics remain unchanged** — this art is already well-designed with genuine tactical transformation (throw/grab + daze). Just rename for tonal consistency with other supreme arts.

---

## 3. Balance Adjustments to Existing Arts

### 3.1 Hundred Palm Strike (Supreme, Brawling) — Overtuned

- At Critical: 4 separate weak hits means 4× (base damage + weapon damage), each applied independently against AV. With Pugilist R3 (4 weapon damage) and a d10 Strength (base 5), that's 4 × (5 + 4) = 36 total damage *before AV*, compared to a normal critical's 5 + 12 = 17 damage.
- Multi-hit creates extreme synergy with on-hit effects (bleeding from enchantments, condition triggers from talents).
- **Recommendation:** Consider capping at 3 hits on Critical, or specifying that on-hit effects trigger only once. Alternatively, clarify that AV applies to each hit separately (which is already implied but worth making explicit), as AV application per-hit is the natural balancing mechanism.

### 3.2 Perfect Shot (Supreme, Bow) — Overtuned

- Ignores ALL banes on the attack AND ignores AV AND briefly stuns. This stacks three powerful effects with no trade-off.
- Compared to Precise Shot (basic), which trades a bane for partial AV ignore, Perfect Shot is a strict upgrade with no cost.
- **Recommendation:** Consider requiring an immobility condition ("If you haven't moved this turn and didn't move last turn") to add a positioning cost, or remove the stun to focus the art's identity on precision rather than doing everything.

### 3.3 Devastating Piercer (Supreme, Crossbow) — Complexity

- The line-pierce mechanic with escalating damage reduction is mathematically complex. The "+1 weapon damage on first target, −3 weapon damage on fifth target" formula creates situations where the fifth target might take negligible damage.
- The "misses don't count toward reduction" clause makes this exceptionally strong in mixed-defense groups.
- **Recommendation:** Simplify the damage formula to "each target after the first takes −1 weapon damage" without the escalation. The mathematical complexity is a play-speed concern more than a balance concern.

### 3.4 Attribute Scaling — Keep As Is

Brutal Strike, Power Shot, and Precise Strike/Shot scale damage with attributes. **Keep attribute scaling.** It serves critical design functions:

1. **Build differentiation** — a high-STR Barbarian with a greataxe *should* hit harder than a high-AGI Duelist with a rapier.
2. **Investment reward** — characters who invest in both STR and Fighting deserve higher peaks.
3. **Self-balancing via bane cost** — the +1 bane makes these arts unreliable for low-skill characters.
4. **Creature AV absorbs spikes** — heavy armor creatures (AV 8–16 at higher tiers) absorb much of the extra damage.

**Guardrail:** If a future magic item or talent removed the bane cost of Brutal Strike without a compensating trade-off, the balance breaks. Heavy Weapon Mastery R1 already removes this bane but is gated behind talent investment — this is fine. Ensure no "free bane removal" effects stack with these arts.

### 3.5 Presentation

Organize the combat art list by tactical role (Offense / Control / Defense / Support / Utility) in addition to or instead of alphabetical order. This helps players identify "What do I pick if I want to be a controller?" rather than scanning 29 entries.

---

## 4. Tonal Guidelines

### 4.1 The "Soul Power" Framework

Supreme arts "transcend mere physical ability and tap into the very power of a warrior's soul." They are extraordinary but not magical — the mortal pinnacle where physical mastery and spiritual willpower converge.

**Target tone:** the **Mythic Warrior** (grounded extraordinary — Death from Above, Force Slash, Perfect Shot, Rip and Tear, Shield Avalanche) and **Heroic Enhancement** (clearly superhuman — Dashing Strike, Earth-shattering Strike, Phantom Cut, Projectile Storm) bands. Supreme arts should feel like:

> "This warrior's skill is so extraordinary that witnesses struggle to believe what they've seen — but it was unmistakably physical, not magical."

Two current arts trend **anime-adjacent** (Hundred Palm Strike, Devastating Piercer) — "countless blows in the blink of an eye" pushes toward superhero territory and may need tonal review alongside the balance fixes in Section 3.

### 4.2 Guidelines for Supreme Arts

- **Do:** Break the ground with a mace strike, project cutting force through the air, move faster than the eye can follow for a single burst.
- **Do:** Reference mythological warrior archetypes — Greek heroes, Mesopotamian demigods, Persian Immortals, Egyptian champions.
- **Limit:** Multi-hit effects that imply dozens of strikes per second, effects that ignore all defensive mechanics simultaneously.
- **Avoid:** Flight, teleportation (Dashing Strike's "supernatural speed" is at the boundary), energy blasts unconnected to a weapon strike, effects that would logically be classified as magic.

---

## 5. Design Principles for Future Supreme Combat Arts

### 5.1 Should Every Basic Art Have a Supreme Version?

**No.** The current 4-of-15 upgrade ratio (~27%) is appropriate. A basic combat art should only get a supreme upgrade if **all three** of the following are true:

1. **The basic art defines a recurring tactical identity** — the player uses it as a go-to move, not a situational tool. Cleave (AoE specialist), Disarm (control fighter), Terrifying Strike (fear fighter), and Exhilarating Strike (support warrior) qualify. Defensive Strike, Evasive Strike, and Splinter do not.
2. **The upgrade can change *how* the art works, not just *how much*** — if the only way to upgrade it is "more damage" or "more targets," it shouldn't be an upgrade. It should unlock a new tactical option: a new target type, a secondary effect, or a changed condition. Supreme Disarm (Soul Rend) is the model.
3. **The basic art doesn't already scale well through Success Levels** — however, if the *type* of effect can change meaningfully at the supreme level (e.g., Terrifying Strike going from single-target to AoE fear), an upgrade is still justified even with SL scaling.

Plus: **the upgrade should get an evocative name** — drop the "Supreme X" naming pattern (see Section 2.1).

**Candidates for future upgrades:** Terrifying Strike (AoE fear), Exhilarating Strike (enhanced team support), Splinter (reliable equipment destruction), Pinning Shot (AoE pinning for ranged control).

**Not recommended for upgrades:** Defensive Strike, Evasive Strike (complete at basic); Brutal Strike, Power Shot (already scale via attributes); Quick Lunge, Precise Strike (already scale via Success Levels); Aimed Shot (already modified by Sharpshooter talent).

### 5.2 Power Level Guidelines for Upgrades

| Aspect | Basic Art | Supreme Upgrade |
|--------|----------|----------------|
| **Primary effect** | Core mechanical benefit | Same core benefit, enhanced |
| **Secondary effect** | None or minor (via SL) | Always-on condition or tactical option |
| **Scope** | Usually single-target | May expand to AoE or add a secondary target |
| **Feel** | Competent technique | Soul-powered mastery — witnesses are awed |
| **Power equivalent** | — | Comparable to a Rank 2–3 spell's secondary effect |

The key rule: **an upgrade should make the art feel qualitatively different, not just quantitatively bigger.** Cleave hitting 4 targets instead of 2 is quantitative. Cleave that sends a wave of force through the ground, knocking enemies prone, is qualitative.

### 5.3 Power Ceiling

Supreme combat arts should sit at the following power band:

| Benchmark | Description |
|-----------|------------|
| **Floor** | Equivalent to a Rank 2–3 combat spell (e.g., a targeted attack spell with a condition) |
| **Ceiling** | Equivalent to a Rank 4 combat spell (e.g., AoE damage with meaningful condition, or single-target devastating strike) |
| **Never exceed** | Rank 5 spells, which represent the absolute peak of magical power |

This ensures martial masters feel powerful and competitive with spellcasters at endgame while respecting the magic system's design space.

### 5.4 Design Checklist for New Supreme Combat Arts

- [ ] Does it have a **clear weapon-specific fantasy** that players can visualize?
- [ ] Does it present a **tactical choice** (cost, positioning requirement, or trade-off)?
- [ ] Is it **distinct from existing supreme arts** in function, not just weapon category?
- [ ] Does it fit the **Mythic Warrior or Heroic Enhancement** tonal band?
- [ ] If it replaces a basic art, does the basic art **define a playstyle** worth upgrading?
- [ ] Does it respect the **power ceiling** (equivalent to a Rank 3–4 spell, never Rank 5)?
- [ ] Does it fill a **role gap** (prioritize Defense, Control, Support, Utility over Offense)?
- [ ] Does the weapon category **need** more supreme options (prioritize Shield, Crossbow, Thrown, Bow)?
- [ ] Does it serve an **under-supported archetype** (prioritize Hoplite, Slinger, Ranger)?

---

## 6. Implementation Order

| # | Item | Effort |
|---|------|--------|
| 1 | Save difficulty rule (6 + skill rank) on the Combat Arts overview page | Low |
| 2 | Rename + redesign Ghost Step, Storm of Arrows, Reaping Arc; rename Soul Rend | Low |
| 3 | Hundred Palm Strike multi-hit clarification/cap | Low |
| 4 | Perfect Shot cost or trimmed effect stack | Low |
| 5 | Devastating Piercer formula simplification | Low |
| 6 | Role-based organization of the combat art list | Low |
| 7 | Fold tonal guidelines, checklist, and power ceiling into the combat-art design workflow | Low |
