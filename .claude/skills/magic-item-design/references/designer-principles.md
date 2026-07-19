# Designer Principles — Magic Item Design

Binding rules, not suggestions. Two sources feed this file:

1. **Native principles (1–10)** — distilled from owner feedback during magic-item work. Their numbers are stable and referenced from other files (the curses subsystem obeys 9 and 10) — **never renumber**.
2. **Ported principles (11+)** — established through extensive spell-design and talent-design sessions with the owner, translated to item terms. Each cites its provenance; the full original reasoning lives in `.claude/skills/spell-design/references/principles/`.

Numbering is local to this file and stable. The cost formula, quality tiers, and worked examples live in [cost-quality.md](cost-quality.md); output formats in [output-formats.md](output-formats.md).

## Shared spell-design principle files that bind item text directly

Item effect text follows the same house conventions as spell and talent text. Before writing any enchantment or item ability, these spell-design files apply as-is (read "spell" as "item effect"):

| File | What it governs |
|------|-----------------|
| `../../spell-design/references/principles/wording-conventions.md` | General-application-first ordering, defined keywords referenced by name and never re-explained, durations as defined intervals, duration keyword next to the effect it governs, activation cost opens the sentence, house micro-conventions (minimum 0, signed banes), capitalize only named mechanics, typed-rider wording ("on a hit, also deal X [type] damage (ignore AV)") |
| `../../spell-design/references/principles/gm-facing.md` | Bounded GM parameters, info-tier grounding, cross-subsystem validation |
| `../../spell-design/references/principles/conditions.md` | Condition definition checks, parameterized (X) values, consumed-key traps, kill-rider wording, no-roll trigger limits |

The most load-bearing of these are also ported with item framing below so they are never missed.

## Native Principles

**1. Anti-trivialization.** Enchantments grant boons on rolls, not auto-success. Resource management (supplies, fatigue, durability) must stay meaningful — an item that deletes a resource system from play is misdesigned regardless of its cost.

**2. Talent harmony.** Enchantments complement talents, never replace them. A +1 boon on Perception adds to a talent's ability; it doesn't substitute for it. If an enchantment does a talent's whole job passively, the talent slot the player bought becomes dead weight.

**3. Limited resource discipline.** Powerful active effects cost limited uses (X/day, 1/scene), not passive always-on scaling. Passives are for reliable, moderate benefits; drama is metered.

**4. GM-ease for information effects.** Non-combat enchantments that reveal information must define what the GM reveals, how often, at what scope. No vague "you sense danger". (Same rule as spell principle 29 — bounded parameter menus with a safety-valve option.)

**5. One enchantment per item — hard limit.** Same-effect enchantments on multiple items don't stack (highest applies); active abilities aren't blocked by this.

**6. Match power to level.** Quality tier maps to character level (table in [cost-quality.md](cost-quality.md)). Q6+ in a level-1 party breaks the game economy and math.

**7. Thematic materials.** Dragon scales from dragon hoards, mithril from dwarf vaults. Prefer materials the party could plausibly have harvested. Material quality range must fit item quality (exotic Q3–Q4, greater Q5–Q6, legendary Q7–Q8).

**8. Damage/healing effects follow the spell scaling frameworks.** `docs/analysis/spells/SPELL_SYSTEM_ANALYSIS.md` §6 (damage per rank, AoE half-scaling) and §16 (healing: single-target 1:1 with damage, Quick Action ½, AoE half; temp HP never stacks; wound healing extremely rare). An item's effect must not exceed what a same-tier spell delivers — **quality tier ≈ spell rank** as the power yardstick (healing potion ≈ the equivalent-rank healing spell).

> **Owner ruling (2026-07-19) — two-track yardstick.** The yardstick splits on repeatability:
> - **Repeatable access** (wands, staffs, at-will/passive effects, actives above 1/day): quality ≈ rank, unchanged. The wand/staff heighten rule (+1 rank) is the built-in freshness window — never raise their base ranks.
> - **Scarce access** (single-use scrolls and consumables, 1/day effects such as the storing enchantments): may reach **quality-equivalent +1 rank**, capped at R5 (reached at Q7; Q8 adds +1 boon on the invocation roll, never exceeds R5). Ceiling, not mandate — under-budget is fine.
> - Decided parameters: scroll ranks become Q3=R1 through Q7=R5; the invocation die stays the quality tier's die (failure risk prices the above-band access; failed scrolls aren't consumed); prices attach to spell rank, not quality label; of Arcane Knowledge / of Divine Guidance store rank 2/3/4.
> - Rationale: Q4 treasure first appears at level 3 (major treasure) when casters already cast R2 — scarce access at quality-rank was stale on arrival. Full derivation: `docs/analysis/magic-items/MAGIC_ITEM_SYSTEM_ANALYSIS.md` §3.7. Docs update pending; until published, the docs tables govern printed items.

**9. Never gate an ongoing effect on a static-TN save.** A flat difficulty (`roll vs. 8`) trivializes as characters grow (attribute die + 1d6 + skill vs. a fixed number is a near-autopass by mid-tier), so a recurring "save or suffer" is meaningless at higher levels. Enforce recurring effects through mechanics that don't decay with level instead: forced or forbidden actions, compulsions, mounting/unremovable Fatigue, contextual banes, or opportunity cost. If a roll is genuinely needed, scale its difficulty to the character (vs. their own Resist/Defense, or an escalating TN), never a bare constant.

**10. A drawback must enact its own fiction, not tax a generic stat.** A curse or penalty should mechanically *make the character behave the cursed way*, not just deduct an unrelated resource. Paranoia forces isolation to rest; wrath compels retaliation; a cruel-tongue curse simply forbids lying. A flat attribute-die reduction or generic Fatigue hit that has nothing to do with the theme is lazy and inert. Ask "does this mechanic produce the behaviour the fiction describes?" Also never touch **Resolve** (special meta-currency) — drawbacks trade in Fatigue, Wounds, HP, banes, or forced/forbidden actions.

**21. Q7 is the mortal crafting ceiling — Q8 is never crafted.** Under the current crafting rules, mortal enchanters can produce items up to Q7 (Superior). Q8 (Supreme) items cannot be crafted or commissioned at any price: they are legendary and divine artifacts that enter play only as found treasure, quest rewards, or story beats. Q8 coin values are *valuations* for the treasure economy (sale, ransom, hoard worth), not purchase prices. Design consequences: Q8 effects may assume artifact framing (history, name, singular existence); Q8 material and component availability is never a solvable logistics problem; a party wanting a Q8 effect goes on an adventure, not to a market. *(Owner ruling, 2026-07-19.)*

**22. Material effects stay low on mental load — passive first, cooldown reactive at most.** A special material's effects are read once at crafting and then must run themselves at the table. Prefer always-on passives (weight, resistance, damage-type conversion chosen at creation, durability behavior). Where a passive is too strong, a cooldown reactive (once per scene or once per day, with a simple trigger) is acceptable. Nothing beyond that: no per-hit decision menus, no multi-clause conditionals, no sub-system micro-decisions (re-roll this die, track that stack). If explaining the effect takes more than two sentences, simplify it. *(Owner ruling, 2026-07-19. Stated for materials; a sound default for all item effects.)*

**23. A material serves every item type it plausibly makes.** A special material must state effects for each item category it can physically become — a metal covers weapons, heavy armor, shields, and wearables; a silk covers light armor and wearables; a wood covers ranged weapons, hafted weapons, shields, and catalysts. Minimum three item types unless the fiction genuinely forbids it (and then say so in the entry). Single-type materials (old Mithril: armor/shield only) waste the material slot for every other build at the table. *(Owner ruling, 2026-07-19, prompted by Mithril's armor-only coverage.)*

**24. Catalyst effects belong to the host item — a fixed catalyst is its own host.** A spell catalyst never carries its own enchantment; enchantments sit on the host item the catalyst is part of. The same logic scopes catalyst *material* effects: only a catalyst that is a fixed, inseparable part of its item (wand, staff, orb — the item *is* the catalyst) can have its own special material with catalyst-line effects. A catalyst integrated into some other host item (a catalyst worked into an amulet or sword) uses the host's material and enchantment; it brings none of its own. Prevents double-material and double-enchantment stacking on one slot while keeping legendary staffs and wands material-rich. *(Owner ruling, 2026-07-19.)*

> **Addendum (owner rulings, 2026-07-19) — the catalyst-core model.** A catalyst is a **core that must be inlaid into a held or worn item to be usable** — a loose core casts nothing. The old "must hold the catalyst in hand" requirement is outdated design: wearing or holding any item with the inlaid core suffices for casting. A skilled artisan can move a core between items: it takes real time (about an hour of careful work) and one successful Crafting roll vs. a Difficulty by the core's quality (Q3 medium 8, Q4 hard 10, Q5 very hard 12, Q6+ extreme 14) — a simple check so swapping isn't free, never a heavier subsystem. Fixed implements (wand, staff, orb) are cores inseparable from their item — they cannot be re-inlaid, which is exactly why they count as their own host.

**25. Wearable material effects only on garment-scale slots.** A ring must not grant the same passive as a robe — material effects need material mass. Only wearables in the **Body, Back, Feet, and Hands** slots (the garment-scale items: robes, tunics, cloaks, mantles, boots, bracers, gloves) benefit from a special material's wearable effects. Small wearables (Head, Neck, Rings, Waist) can be made of special materials for value, durability, and appearance, but gain no material effect. Caps the wearable material-passive pile at four and keeps cloth materials (Dreamweave, Phantom-Silk) meaningful where robes actually live. *(Owner ruling, 2026-07-19; Hands added same day.)*

## Ported Principles

### Power and scope

**11. Items assist, never bypass.** An item improves rolls, options, and economy inside a subsystem — it never auto-resolves a scene type or skips a game mode. A climbing item makes climbing better, it doesn't delete the climb. If an item's best use is "we no longer play out X", redesign it. *(spell principle 1; talent principle 1)*

**12. Never scale a cap.** System caps are fixed guardrails, not scaling axes. No item raises a cap another subsystem establishes (armor AV ceilings, tier gates, attunement limits). Scale honest axes instead: uses per day, scope, reliability. *(spell principle 31; talent principle 4)*

**13. A granted immunity needs a circumvention.** An item granting immunity (to prone, push, fear, a damage type) must leave counterplay or it becomes an invisible invincibility wall. House pattern: acting aggressively or a specific circumstance degrades immunity to resistance or a boon, or the immunity carries a visible condition (worn openly, removable, targetable). *(spell principle 77; talent principle 5)*

**14. Limits live in the fiction, not game structure.** Item restrictions are diegetic: wielder requirements, attunement rites, daylight, consecrated ground, material fragility. Never scope to meta-constructs ("only during encounter turns"). Uses per day / per scene are the sanctioned pacing exception, stated plainly. *(spell principle 12; talent principle 12)*

### Triggers and conditions

**15. Debuffs key off rolls that actually happen.** The acting side rolls against static Defenses; a defender only rolls in specific carve-outs. "The wearer's enemies suffer +1 bane to resist X" is dead text when X resolves by the party rolling. Grant the boon to rolls the party makes, lower a Defense, or apply a condition. *(spell principle 90; talent principle 8)*

**16. High-impact conditions never ride automatic, no-roll triggers.** An on-hit or on-crit enchantment proc uses a low-impact condition (distracted, briefly slowed) or requires a roll/save for frightened and stronger. A weapon that frightens on every hit is repeated hard control for free. *(spell principle 88; talent principle 9)*

**17. Kill-riders say "slain", and never key on a condition the triggering attack consumes.** Elite and Lord creatures refill HP on Wounds, so "reduced to 0 HP" erases a boss mid-fight. Marked ends when the next attack resolves, so an attack cannot both consume and be gated by it. Check every condition against its published definition; parameterized conditions carry their (X) value. *(spell principles 80, 73; talent principles 10, 11)*

### Fiction and setting

**18. The name is a promise, spoken in a pre-scientific register.** Every effect must fit what the item's name leads a player to expect, and the name must cover every mode. Names and flavor use Bronze Age vocabulary — no modern physics or science terms — but stay clear and functional first: function in the name, poetry in the flavor. *(spell principles 61, 91; talent principle 16)*

**19. Weigh worldbuilding implications as an explicit balance axis.** Nexus is Bronze Age sword & sorcery — institutions are pre-modern and stay that way. Before finalizing an item with social, economic, legal, or informational reach (truth-detection amulets, message-sending stones, wealth-generating tools), ask what happens if it becomes a routine tool of courts, markets, armies, or guilds. Keep it rare and costly, prefer constrain-over-auto-solve, leave in-world counterplay, and add a short GM framing note where the reach is setting-shaping. *(spell principle 33; talent principle 15)*

**20. Validate against talents, spells, and subsystems — not just other items.** Before finalizing, check whether a talent or spell already covers the same job. An item must not strictly outclass a same-job talent or spell, and vice versa — put them in parity with distinct edges: the item costs coin and an equipment slot, can be lost or destroyed, and needs no build investment; the talent is permanent and rank-grown; the spell costs Focus. Grep the talent and spell files, not only the item tables. *(spell principle 27; talent principle 18)*

## Appending a new principle

When the owner corrects or refines a magic-item design decision in session:

1. Take the next free number (currently next: **26**).
2. Append the full principle under the matching section above (numbered, bolded one-line rule, then reasoning, then owner-ruling provenance).
3. If it is frequently load-bearing, add its one-line hook to the Design Principles section in [../SKILL.md](../SKILL.md).
4. Update the "currently next" number in step 1. Never renumber.

If a correction refines a *ported* principle, note the item-side ruling here under the ported entry rather than editing the spell-design or talent-design files — each skill owns its own provenance chain.
