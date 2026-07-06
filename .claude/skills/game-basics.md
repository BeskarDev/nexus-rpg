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

bleeding (X), blinded, burning (X), charmed, confused, dazed, deafened, deprived, distracted, frightened, grappled, hidden, marked (X), paralyzed, poisoned, prone, pushed, restrained, silenced, slowed, staggered, stunned, suffocating, unconscious.

Anything else ("cursed", "weakened", "corroding", "energized"…) is **not a condition** — either use an official condition or spell out the exact mechanical effect ("+1 bane on all rolls for a short duration").

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
