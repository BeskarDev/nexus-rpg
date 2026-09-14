# Publication — the record, the generator, the pipeline

Read at **workflow step 8**, after the owner approves a draft. Nothing here is needed while designing.

## The canonical record

`creatures.json` is the source of truth; the tier pages are generated from it. Every
creature is one object in that array:

```jsonc
{
  "name": "Sand Lurker",
  "size": "Large",                    // own field, from creature-sizes.json
  "type": "Magical Beast",            // one of the twelve
  "subtype": ["Primal"],              // ARRAY — subtypes plus any additives.
                                      // `Mindless` or `Intelligent` is REQUIRED
                                      // here on every Undead and Automaton
  "tier": 3,
  "category": "Basic",                // Basic | Elite | Lord
  "armor": "Light",                   // must also appear inside `av` below
  "hp": "30",                         // "2x40" / "3x40" for Elite / Lord life pools
  "av": "3 (natural light)",
  "str": "d8", "agi": "d8", "spi": "d6", "mnd": "d4",
  "parry": 9, "dodge": 9, "resist": 8,
  "skills": ["Fighting (2)", "Stealth (3)"],
  "immunities": [], "resistances": [], "weaknesses": ["fire"],
  "attacks": [
    {
      "name": "Bite",
      "properties": ["pierce"],       // official weapon properties, no asterisks
      "text": "8/13/18 damage. On a hit, the target is grappled."
    }
  ],
  "abilities": [
    {
      "name": "Sand Sense",
      "qualifier": "Passive",         // Passive | Action | Quick Action | Elite Trigger | Lord Trigger.
                                      // ONE value, NOTHING after it. A limiter is never written here —
                                      // it is the LAST SENTENCE of `text`. Only `Action` may have one.
                                      // The qualifier also DECIDES WHICH CARD GROUP this renders under
                                      // (D-147), so it is structural, not decorative.
      "text": "This creature senses any creature touching the sand within short range."
    }
  ],
  "traits": ["Keen Scent"],           // NAMES ONLY, resolved from creature-traits.json
  "lore": { }                         // optional, fixed structure — see references/lore-schema.md
}
```

### Traits are stored by name and resolved at build time

A creature's **shared** passives — `Keen Scent`, `Amphibious`, `Undead Nature`,
`Blindsight (close)` — go in `traits` as **names only**. Their wording lives once in
`src/utils/data/json/creature-traits.json` (47 entries, extracted from the companion trait
library so creatures and companions cannot drift on what a trait means), and
`content:gen` **expands each name into a full `Passive` ability** on the published card.

- **The card shows no seam.** A GM reads one Abilities list with every effect spelled out.
  The split is an authoring convenience: one fix to a trait's text reaches every creature
  carrying it.
- **Unknown names fail the build**, which is what catches a near-miss: the first batch
  wrote `Blindsense`, and the published trait is `Blindsight (close)`.
- **Parameterised traits carry their parameter in the name** — `Blindsight (close)`,
  `Blindsight (medium)`, `Flying (Wings)`, `Darkvision (medium/long)` — because that is how
  the trait library already stores them.
- **A trait unique to one creature is not a trait.** Write it as an ability on that creature.
  The library is for wording used more than once.

Field notes that the generator enforces (it fails the build, it does not guess):

- `armor` must appear inside the `av` string — the card shows only AV, abbreviated, and
  the guard exists so the card can never hide a real difference.
- `tier` and `category` must be known values, or the creature would silently vanish from
  every page.
- Attack `text` that OPENS with a clean `X/Y/Z damage.` triple is rendered as a
  weak/strong/critical ladder, and the word "damage" is dropped. Write the triple first
  and put everything else after it. Compound forms ("…damage plus 6 fire damage") are
  left as prose on purpose.
- **The card groups entries by when a GM uses them, not by array** (D-147): **Actions** (every
  `attacks` entry plus abilities qualified `Action`), then **Quick Actions**, **Triggers**, and
  **Passives** (including resolved traits). So `qualifier` is structural — it picks the group.
- `properties` become badges; write them as plain words, no markup. **`qualifier` does not** — its
  group heading already states it, so only attacks carry badges.
- Every string is markdown, so conditions and damage types auto-link and chip. Do not
  hand-write links.
- `lore` is an optional fixed-structure object — omit the key rather than writing an empty
  value. Keys and shapes: [references/lore-schema.md](lore-schema.md).

## Publication Pipeline

Every new creature starts life in a draft document under `.drafts/creatures/` (workflow
step 6). A creature stays a draft until the owner explicitly approves it as
production-ready. On approval:

1. **`src/utils/data/json/creatures.json`** — add the record. This is the only file you
   author by hand.
2. **`bun run content:gen`** — regenerates `docs/08-creatures/03-creatures/tier-*.mdx`.
   Never edit those files directly; `bun run content:check` runs in CI and fails on any
   hand-edit or missed regeneration.
**Notion is out of the design process** (owner ruling, 2026-08-11). The workspace's inline databases are the pre-migration system and keeping them in sync costs more than it returns. The `notion-sync` skill stays available for a deliberate, owner-requested push. Do not run it as a publication step.

Then verify: `bun run content:check` clean, `bun run build` green, and the creature
appears on its tier page with the right anchor. Stop there — the owner commits manually.

The `creature-*.json` files (tier stats, sizes, types, archetypes) are the Creature
Builder's **rule tables**, not the roster. Only touch them when the creature *rules*
change, and keep them consistent with `references/stat-tables.md`.

### Tooling status

`bun run creature:build` (the CLI in `src/utils/typescript/cli/`) still emits a **markdown
stat block**, which was the publication format before this migration and no longer has a
destination. Use it for its stat MATH — it applies the tier/archetype tables correctly —
then transcribe into the JSON record above. Reworking it to emit a JSON record directly
is a known outstanding task. The in-app Creature Builder and the Creature Cards print
tool are unaffected: they exchange markdown between themselves and never read
`creatures.json`.

