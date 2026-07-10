---
name: spell-design
description: "Design balanced spells for Nexus RPG arcane disciplines and mystic traditions — rank scaling, damage math, school identity, success-level effects. Use when creating, revising, or reviewing spells in docs/07-magic/, or auditing spell coverage/balance."
---

# Spell Design — Nexus RPG

Spells belong to one of 14 schools: 6 **arcane disciplines** (Mind + Arcana, transgressive/selfish) or 8 **mystic traditions** (Spirit + Mysticism, reverent/communal). Every spell is designed against a rank chassis (0–5) with school identity constraining theme, roles, damage types, and conditions.

**Numeric tables (rank scaling, ranges, areas, deviations) live in [references/rank-scaling.md](references/rank-scaling.md). School identities live in [references/schools.md](references/schools.md). Use them exactly — don't design from memory.** Core system mechanics and writing standards: [../game-basics.md](../game-basics.md). For any spell meant to combo — with the caster's own turns or with other players — read [references/synergy-framework.md](references/synergy-framework.md) (setup / payoff / extender roles, the cold-cast deficit rule, the shared socket set) and the target school's Internal Synergies section.

## Source-of-Truth Map

| What | Where |
|------|-------|
| Published spells | `docs/07-magic/02-arcane-spells/*.md`, `docs/07-magic/04-mystic-spells/*.md` |
| Spell properties | `docs/07-magic/05-spell-properties.md` |
| **Conditions** (official keyword list) | `docs/05-combat/04-conditions.md` |
| **Effect durations** (briefly/short/medium/long/very long) | `docs/06-scenes/02-effect-durations.md` |
| System-wide balance analysis | `docs/analysis/spells/SPELL_SYSTEM_ANALYSIS.md` — esp. **§6 damage scaling framework** and **§16 healing scaling investigation** |
| **Per-school design spaces** (traits, gimmicks, trait×rank coverage matrices, gap lists, combo audits) | `docs/analysis/spells/schools/<school>.md` |

The per-school analysis files are the deepest, most current source for school identity — **always read the target school's file before designing for it.** They supersede older role/trait summaries where they conflict.

## Design Workflow

### 1. Pick school and read its design space
Read `docs/analysis/spells/schools/<school>.md`: identity, traits, signature gimmick, primary conditions, role spread, known gaps, trait×rank coverage matrix. Prefer designing in the school's **Excels** role; **Decent** is fine; avoid **Weak** roles unless deliberately subversive.

### 2. Check for gaps and duplicates
- Does the school's gap list already call for this spell? Filling documented gaps > inventing new territory.
- Grep the school's published spell file for similar names/effects. **Heighten, don't duplicate** — a higher-rank version of an existing concept should be a Heighten entry on the existing spell, not a new spell.
- Check the coverage matrix: which trait×rank cells are empty?

### 3. Choose rank
Match concept power to the rank table (rank ≈ D&D level equivalence in references). Rank 5 = D&D level 7 ceiling (Delayed Blast Fireball, Plane Shift, Resurrection) — never level 9 (Wish, Meteor Swarm, Time Stop). Resurrection framework: Revivify-equivalent R3, Raise Dead R4, Resurrection R5; True Resurrection does not exist.

### 4. Assign mechanics from the scaling tables
- Damage, range, duration, area from the rank table; justify any deviation with the deviation table (range/area are part of the power budget).
- Conditions from the school's primary condition list; damage types from the school's list.
- Control spells: target Resist, fixed duration on any success.
- Properties from the official list only.

### 5. Write it into a draft document
Use the template below. Flavor ties to 1–3 school traits; arcane feels transgressive, mystic feels reverent.

**Always write a new design as a draft document first — never straight into the published surfaces.** Create (or append to) a batch file under the repo-root `.drafts/` directory (e.g. `.drafts/<school>-r<rank>-batch.md`, or a concept-named file). The draft holds: a status banner ("pending owner approval, not yet published"), scope, chassis note, per-spell design rationale (role, synergy intent, any rank/deviation justification), the full spell text in publish-ready format, and an "open questions for owner" section flagging unresolved forks. The draft is the review artifact; publication (step in Publication Pipeline) only happens after the owner approves it. This keeps design reasoning reviewable and separate from live rules.

### 6. Validate
Run the checklist below, then sanity-check against neighbors: pull 2–3 published spells of the same rank and role and compare — the new spell must not strictly dominate any of them.

### 7. Check worldbuilding implications
Before finalizing any spell with social, legal, economic, informational, or logistical reach, ask what happens if it becomes a *routine* tool of courts, markets, armies, or rulers. Nexus is Bronze Age sword & sorcery — magic is rare, feared, priest/sorcerer-gated, never institutionalized. Keep it rare/costly, prefer constrain-not-extract over auto-solve, leave in-world counterplay, and add a short GM framing note when the reach is setting-shaping. See principle 33.

## Designer Principles

**Binding rules distilled from owner feedback — [references/designer-principles.md](references/designer-principles.md).** 48 principles, too many to read cold: that file opens with an **Index by Concern** — scan it, pick the concern(s) matching your task, read those principles in full. The most frequently violated, always worth knowing: spells assist, never bypass (1); SL scales magnitude, not effect type (2); heighten, don't duplicate (3); limits live in the fiction, not game structure (12); effect text states the general application first, exceptions after (15); a flat single-success effect is often correct, especially for utility (24); optional modifiers belong on Heighten, never on SL (25); Heighten cascades through every remaining rank up to R5 (26); validate against talents and subsystems, not just other spells (27); ground info-gathering tiers in the real anatomy of what is examined (28); GM-facing effects give the GM parameters to move within, never open-ended "GM decides" (29); refer to creatures as they/their, never it/its (30); never scale the tier cap on Heighten (31); every Heighten rank restates all inherited effects, not just the delta (32); weigh worldbuilding implications as an explicit balance axis, keep setting-shaping magic rare, constraining, and circumventable (33); physical is the default damage type, never write it out (41); placed-hazard zones cast against a fixed TN (Target column), with the entering creature rolling its save vs. your Resist in the effect text (42); recurring zone/aura damage is flat and rank-scaled, never Weak/Strong/Critical (44).

## Pitfalls

- ❌ **Power creep** — strictly better than an existing spell.
- ❌ **Volatile control** — core effect or duration varying by SL ("briefly on Weak, medium on Critical"). Fixed duration, reliable effect.
- ❌ **Weak-role violation** — spells in roles the school should avoid.
- ❌ **Theme drift** — effects outside the school's traits/identity.
- ❌ **Vague wording** — ambiguous targeting ("vs. Dodge" / "vs. Resist" must be explicit), duration, or effect.
- ❌ **Complexity overflow** — subsystems or edge-case tracking a table can't hold.
- ❌ **Undefined terms** — conditions, damage types, or properties that don't exist in the rules.

## Spell Template

```markdown
### Spell Name (*tradition/discipline*, Rank X)
**Properties:** [quick, concentrate, enchant (duration), ritual, singular, …]

**Effect**
[Evocative flavor of casting and visual effect — 1–3 school traits.]
**Weak.** [Base effect with exact numbers and durations.]
**Strong.** [Enhanced — typically 2× damage/healing; primary effect unchanged.]
**Critical.** [Maximum — typically 3×; may add secondary effect.]

**Heighten.** [Optional: explicit per-rank lines to R5, house idiom — **(Rank 2)** … instead. **(Rank 3)** … instead. … Never the "for each additional rank" formula (principle 26).]
```

> Example:
> ### Chromatic Orb (*evocation*, Rank 1)
> **Effect**
> You conjure a crackling sphere of elemental energy and hurl it at your foe. Choose fire, frost, or lightning when casting.
> **Weak.** Deal +4 damage of the chosen type.
> **Strong.** Deal +8 damage. Fire: target is burning. Frost: target is slowed. Lightning: arcs to one adjacent enemy for +2 damage.
> **Critical.** Deal +12 damage. Apply the appropriate condition for a short duration.
> **Heighten.** **(Rank 2)** Deal +8/+16/+24 instead. **(Rank 3)** Deal +12/+24/+36 instead. **(Rank 4)** Deal +16/+32/+48 instead. **(Rank 5)** Deal +20/+40/+60 instead.

## Validation Checklist

**Theme**: fits school traits and Excels/Decent roles; correct damage types and conditions; arcane transgressive / mystic reverent; 1–3 traits in flavor.

**Mechanics**: rank matches power; damage follows the scaling table or a justified deviation; SL scaling touches only magnitude; range/duration/area within rank defaults or budgeted; properties valid; targeting explicit.

**Balance**: not strictly superior to same-rank neighbors; interesting tactical choice; R5 respects the D&D-7 ceiling; deviations paid for by trade-offs.

**Worldbuilding**: setting-shaping reach (social/legal/economic/informational/logistical) does not modernize or industrialize the Bronze Age S&S setting; kept rare/costly, constrains rather than auto-solves, has in-world counterplay; GM framing note added where reach is significant (principle 33).

**Writing**: mechanical terms **bold**, school names *italic*, effects unambiguous, active voice; creatures are they/their not it/its (principle 30).

## Publication Pipeline

Every new design starts life in a draft document under the repo-root `.drafts/` directory (step 5). A spell stays a draft until the owner explicitly approves it as production-ready. On approval, publish to **all three surfaces** (then optionally delete or archive the draft file):

1. **Docs** — insert into the school's file (`docs/07-magic/02-arcane-spells/<discipline>.md` or `04-mystic-spells/<tradition>.md`), matching the existing per-spell format exactly: `### Name` heading, the 5-column mini-table (`**Rank** | **Focus** | **Target** | **Range** | **Properties**`), then the `**Effect** <br/>` block with `<strong>Weak./Strong./Critical.</strong>` inline HTML. Keep rank order within the file. ⚠️ Never insert bare `>` lines between spells — they are legacy Notion-import artifacts that render as ugly empty callouts on the wiki (systematically purged 2026-07-10; a Heightened block is a single `> **Heightened** ...` line, then a blank line, then the next `###` heading directly).
2. **App JSON** — append to `src/utils/data/json/arcane-spells.json` or `mystic-spells.json` (consumed by the spell search dialogs and spell list pages). Match the existing schema (`name, discipline/tradition, rank, focus, target, range, properties, effect, heightened`) and HTML conventions (`<br/>`, `<strong>`). ⚠️ Do NOT run the legacy `convert-tables.sh` regeneration — it's deprecated and sources from Notion exports, not docs; edit the JSON directly. ⚠️ For edits to existing entries, use surgical string replacement — never parse + re-serialize the whole file (reformats every line, drowns the real diff).
3. **Notion** — push via the `notion-sync` skill (handles the doc→page mapping and the changelog entry). Can be batched: multiple approved spells in one sync session.

Finally verify docs and JSON agree (same spell text in both), then commit docs + JSON together.

## Designer Feedback Loop

When the owner corrects or refines a design decision in session, append it to [references/designer-principles.md](references/designer-principles.md) (numbered, one line, with the reasoning), **add its one-line hook to that file's Index by Concern**, and, if it's frequently load-bearing, add it to the short list in the Designer Principles section above. That file is the accumulated design memory — it must grow. Keep SKILL.md itself lean: new lessons and reference material go into `references/` files.
