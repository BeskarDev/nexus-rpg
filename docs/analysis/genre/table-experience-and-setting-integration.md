# Table Experience & Setting Integration — Analysis

> **Scope:** The rules can deliver the fantasy (see [sword-and-sorcery-genre-review-v2.md](sword-and-sorcery-genre-review-v2.md)) — but does the game *teach* it at the table? Two audiences: players, who need to reach for Bronze Age / Conan-register characters instead of medieval knights; and GMs, who need to know what stories this game is for. This analysis assesses the current onboarding and framing layer and maps which parts of the owner's worldbuilding vault should cross into the game system project.
>
> **Canon source:** The setting canon lives in the owner's Obsidian vault at `/Users/rm-aclue/git/personal/nexus-rpg-vault` (German). Key references used here: `(01) Weltübersicht/Design-Dokument.md`, `(01) Weltübersicht/Kanon-Regeln.md`, `(02) Kosmologie/Pantheons/`, `(04) Geschichte/Zeitalter/`, `(13) Spielmaterial/`.

---

## 1. Design Constraints (Owner Rulings, July 2026)

**R6 — Lore stays out of the rules where not needed.** The vault is the canon home. The game rules do not get a gazetteer, a cosmology chapter, or pantheon writeups.

**R7 — Shadowdark-style implicit setting reveals.** The setting enters the rules through the surfaces players already read for mechanical reasons: item names, table entries, example text, god names in flavor, monster ecology lines. Small, in-place, never a chapter of exposition.

**R8 — Setting is currently far too underrepresented in the rules and GM sections.** Both constraints above are about *form*, not *amount*. The amount needs to go up.

These three constraints define the method for everything below: identify the mechanically load-bearing spots where setting is *required* (not decorative), and feed exactly enough vault content into them.

---

## 2. Current State

### 2.1 What already works — the accidental Shadowdark layer

The game already does implicit reveals well in places, which proves the approach fits the existing text:

| Surface | Example | Why it works |
|---|---|---|
| Background starting items | Decorated canopic jar (Embalmer), blood-oath papyrus (Mercenary), bronze astrolabe fragment (Cartographer), ancestor bone fetish (Shaman) | Pure Bronze Age texture delivered at the exact moment a player builds identity |
| Example text | "Blessed by Neiru's wisdom" (Resolve), "the terrifying form of Nakesh" (Fear check) | Real vault gods leak into rules examples — this is precisely the Shadowdark move, already happening |
| Materials | Iron as rare, spirit-repelling "Cursestone"; bronze as default | A whole cosmological fact (gods vs. arcane order, vault canon rule) expressed as one table row |
| Offerings table | Electrum sun disk, lapis lazuli, a black goat, the ransom of a captive | Religion taught through a shopping list |
| Difficulty examples | "Decipher complex hieroglyphs," "topple a stone obelisk" | Register carried into the driest mechanical table |

**The problem is that this layer is accidental.** It appears where a writer happened to be inspired and vanishes where they weren't. Nothing makes it policy, so entire chapters (quickstarts, GM tools) missed it.

### 2.2 The gaps

1. **The quickstart overview installs the wrong lens.** It opens: "These quickstart characters demonstrate **classic fantasy archetypes** within Nexus RPG" — then presents an MMO-vocabulary role grid (Striker/Tank/Controller) with zero world anchoring. This is the first character-facing page most new players read, and it invites exactly the D&D-import behavior the owner wants to avoid.
2. **The register is never stated.** The system already soft-blocks the knight in shining armor mechanically (350 starting coins vs. a 2,500-coin panoply, no steel, heavy armor Q3+). But no text says so. Players discover the wall through friction at the table instead of reading it as genre up front. Vault canon supplies the *reasons* (gods suppress innovation, tradition is divinely sanctioned) and they are nowhere in the rules.
3. **The GM tools reference a setting that isn't documented.** The quest generator instructs: "replace abstract fragments with specific names, creatures, and places *from your setting*." The setting exists only as fragments inside the folk tables. There is no world overview in the docs at all; chapter 09 is empty.
4. **The Mystic Oath demands what the rules never provide.** Mysticism mechanically requires "a pact with a god, goddess, or higher spirit" and an oath to their tenets. The rules name **zero gods**. The vault has complete regional pantheons (Atakhet alone: Arasha, Atep, Baaphor, Heqmet, Maatu, Nakesh, Neiru, Osaret — each with aspects, symbols, depictions, an associated sin). This is the single clearest case where setting content is mechanically load-bearing and missing.
5. **No GM guidance layer exists.** GM Tools = random tables + printables + builders. All good procedural machinery, no frame: nothing says what stories fit this world, how the subsystems chain into a campaign, or what tone to run. Meanwhile the vault's Design-Dokument contains a finished dungeon typology and adventure-approaches list that answer these questions directly.

**Summary judgment:** the game teaches its fantasy by accident. The texture is strong where it exists, the deliberate framing layer is absent, and the vault already contains nearly all the missing content in German.

---

## 3. Recommendations

Ordered by leverage. Items 1–3 are small; item 4 is a chapter; item 5 is a product.

### 3.1 "The World in Brief" player primer (High priority, ~2 pages)

Placement: front of the Adventurers chapter (or a short chapter of its own before it). Three parts, all condensed from `Design-Dokument.md` and `Kanon-Regeln.md`:

1. **The world in one paragraph** — the elevator pitch: after the Twilight of the Gods the central supercontinent sank; a ring of subcontinents remains, isolated by an eternal storm; civilization is in decay, wilderness reclaims what is not defended; the gods are real, local, vain, and fallible.
2. **What adventurers are** — sellswords, tomb-delvers, caravan guards, freed pit-fighters, disgraced priests, hunted arcanists. The Conan résumé, in the world's own terms.
3. **The register list — "This world is not medieval."** The explicit expectation-setter, one line each: bronze not steel (iron is cursed); no knights, castles, or plate-armored cavalry; tradition over innovation, because the gods suppress progress; humans are not the dominant folk; arcane magic is feared and hunted, mystic magic is licensed by the gods; every city has its own gods and they are watching; travel is dangerous and most people never leave home; ruins of greater ages are everywhere; history fades into legend within generations.

That last line doubles as a design license: the setting *canonically* blurs facts into myth, so the rules can stay vague about lore **diegetically**. This is the cleanest possible justification for R6 — the rules don't withhold the setting, the world itself has half-forgotten it.

### 3.2 Reframe the quickstart archetypes (High priority, trivial effort)

- Delete "classic fantasy archetypes." Replace with world-first framing.
- Give each archetype one in-world identity line above the role/skill data ("**Gladiator** — you survived the fighting pits; now you fight for yourself"). Merges with the V2 §4.C naming pass (Bravo, Engineer intro) — same files, one editing session.
- Keep the Striker/Tank role grid — it is honest, useful information — but it comes second, not first.

### 3.3 "Gods of the Known Lands" table (High priority, the model implicit reveal)

The Mystic Oath needs named patrons; deliver them as a table, not a chapter. Per region, one row per god: **name, aspects, symbols, the mystic traditions they grant, a typical offering, their sin.** One line each — the vault's Neiru file collapses to: *"Neiru — oases, secrets, knowledge; symbols: scorpion, scroll, rat; traditions: Twilight, Nature; sin: envy."*

- Placement: the Mysticism section of the magic chapter (where the oath rule lives), possibly echoed in the Priest/Oracle/Shaman quickstarts by simply naming a fitting patron in their intro line.
- Source: vault pantheon files, **`spoiler: false` entries only** — the vault's frontmatter spoiler flag is a ready-made import filter and should be the standing rule for every vault import.
- The traditions mapping is the mechanical hook: it turns eight abstract traditions into concrete religion and instantly differentiates two Life-tradition mystics from different regions.

### 3.4 "Running Nexus" GM chapter (High priority, fills the empty chapter 09)

Mostly assembly, not writing. Sections:

1. **What stories fit** — a story-shapes catalog translated nearly verbatim from the vault Design-Dokument: the mythic tomb (a sealed demigod stirs), the sunken city (accessible only under conditions), the lost library (knowledge with a price), the nature temple (living environment, divine defenders), the veil-places (mirror world, dream domains, god-shard realms) — plus the adventure approaches: heresies and religious conflict, rebellion against divine order, artifact hunts, frontier survival, intrigue between realms. For each: which existing subsystem carries it (travel, challenge, social intrigue, downtime, delve), typical opposition, typical payout.
2. **The campaign loop, drawn once** — adventure → travel → settlement/downtime → next hook (quest generator), showing how the built subsystems chain into the S&S flush-and-broke rhythm.
3. **World-logic sidebars** — three short boxes from Kanon-Regeln that change how a GM frames scenes: *chaos presses at every border* (monsters and wild magic reclaim undefended land), *history fades, legends remain* (NPCs know myths, not facts), *the gods are local* (every settlement has patrons with opinions about the party).
4. **Tone dials** — how grim vs. how pulpy, with the owner's touchstones named (Conan, Dark Sun, Morrowind, Glorantha — the vault's own reference list, which is sharper than the movie list for GM audiences).
5. Pointers: encounter building (creature rules), settlement/faction tools (downtime rework, when it lands).

### 3.5 Introductory adventure (Medium priority, highest fidelity transfer)

Nothing transfers genre like play. **Owner ruling (R9):** the introduction adventure is a purpose-built teaching piece — roughly 2 hours of concentrated gameplay for level 1 quickstart characters, focused on *organically teaching the rules*. It is written from scratch for that job; no existing vault adventure fits the scope (`Steinmetz-Anwesen` is a level 4–5 arc spanning 4–6 sessions — see §4 for its actual role).

Shape that serves both jobs (teach the rules, transmit the register) in ~2 hours:

1. **A hook at a settlement** (one scene): a patron, an offering, a god's name — teaches skill tests and NPC disposition in passing.
2. **A short travel leg** (one abbreviated day): one Navigator/Scout roll each, one supply check, one event — teaches the travel loop without running its full weight.
3. **A small site** (3–5 areas, one of the §3.4.1 story shapes in miniature, e.g. a minor tomb): one fight against on-register demo creatures (teaches attacking, SL damage, Wounds), one hazard or challenge roll, one weird-magic beat.
4. **A closing choice with teeth** — payment vs. temptation, invoking a Motivation or Vice — teaches the Resolve economy and lands the S&S tone in the final minutes.

Every rule taught appears at most once; anything not taught by play (heightening, downtime, crafting) is deliberately absent.

### 3.6 Seed the existing tables with real names (Low priority, continuous habit)

The cheapest ongoing win, applying R7 as policy: when a table or example needs a placeholder, use a real one from the vault. Travel difficulty examples ("sandy desert" → "the Sandmeer of Taharet"), quest/location table entries, creature ecology lines ("hunts in the Oshet-Delta"), a six-line world-ages timeline in the GM chapter (age names + one line each — vagueness is diegetic per §3.1). Add this as a standing convention to the writing-style section of CLAUDE.md once the primer exists, so every future content pass compounds it.

---

## 4. Vault Import Map

What crosses over, in what form, and what stays. Standing rules for all imports: **`spoiler: false` content only; translate from German; condense to the minimum that serves the mechanical surface; apply house style** (no semicolons or dashes in game content, bold mechanics, they/them for creatures); sync to Notion afterward per the content pipeline.

| Vault section | Crosses over? | As what | Target |
|---|---|---|---|
| `(01) Design-Dokument` + `Kanon-Regeln` | ✅ Yes, condensed | World-in-Brief primer + register list; GM world-logic sidebars; tone touchstones | §3.1, §3.4 |
| `(02) Kosmologie / Pantheons` | ✅ Selectively | One-line god rows (name, aspects, symbols, traditions, offering, sin) | §3.3 gods table |
| `(02) Kosmologie / Seelenreiche, Grauer Fluss, Ur-Götter` | ⚠️ Fragments only | One-liners where mechanics touch: dying/death flavor, Spirit creature type description, veil-places as a story shape | §3.4.1; otherwise stays in vault |
| `(03) Geographie / Kontinente, Regionen, Städte` | ⚠️ Names only | Real place names seeded into examples and random tables; no gazetteer | §3.6 |
| `(04) Geschichte / Zeitalter` | ⚠️ Minimal | Six age names, one line each, in the GM chapter | §3.4 |
| `(05) Kulturen` | ✅ Already partially imported | Folk culture tables exist; future: regional kit boxes (V2 §4.A.4) and one-line culture hooks | Existing folk chapter |
| `(06) Politik`, `(07) Personen`, `(08) Organisationen` | ❌ Stays | GM-facing campaign material; the docs-side faction catalog (`analysis/factions/`) is the crossover vehicle when the downtime rework lands | Vault |
| `(09) Natur / Bestiarium, Materialien` | ✅ As reference | Ecology, regional anchoring, and naming input for bestiary naturalization (creature-design principle 13) | Creature design passes |
| `(12) Artefakte` | ⚠️ Selectively | Named artifacts as Q7–Q8 magic item examples via the magic-item-design skill | Magic item catalogs |
| `(13) Spielmaterial / Dungeon-Typen` | ✅ Yes | Story-shapes catalog | §3.4 |
| `(13) Spielmaterial / Steinmetz-Anwesen` | ⚠️ Later, not the intro | Level 4–5 adventure arc (4–6 sessions) — future mid-tier campaign module conversion, after the intro adventure exists. Not intro-scoped (R9) | Future module |
| `(11) Sprachen` | ⚠️ Check overlap | Rules have a languages page; reconcile once, then vault stays canon | Existing languages page |

**Anti-recommendations (per R6):** no cosmology chapter, no history chapter, no region gazetteer, no full pantheon writeups in the rules. The vault remains the sole canon home; the rules only ever carry the condensed, player-safe, mechanically anchored slice. If players want deeper lore, that is a future, separate publication decision — not a rules-docs concern.

---

## 5. Summary

| # | Recommendation | Priority | Effort |
|---|---|---|---|
| 3.1 | "World in Brief" primer + register list ("this world is not medieval") | **High** | Low (~2 pages, source material exists) |
| 3.2 | Quickstart reframe (kill "classic fantasy archetypes", in-world identity lines) | **High** | Trivial |
| 3.3 | Gods of the Known Lands table (traditions ↔ named gods) | **High** | Low (condense from vault, spoiler-safe rows) |
| 3.4 | "Running Nexus" GM chapter: story shapes, campaign loop, world-logic sidebars, tone | **High** | Medium (mostly assembly + translation) |
| 3.5 | Introductory adventure (purpose-built ~2h teaching one-shot, level 1) | Medium | Medium |
| 3.6 | Seed tables/examples with real vault names, as standing convention | Low | Continuous, near-zero per instance |

**Bottom line.** The game currently relies on players and the GM already knowing the fantasy; the texture that does teach it is accidental. The fix is not more lore in the rules — the owner's constraints forbid that and the world's own "history fades into legend" canon justifies it. The fix is making the implicit-reveal layer *deliberate* at the handful of load-bearing spots where setting is mechanically required: the first page a player reads, the archetype they pick, the god they swear to, and the chapter that tells the GM what stories to run. Nearly all of the needed content already exists in the vault; the work is translation, condensation, and placement.

---

*Analysis July 2026. Companion to [sword-and-sorcery-genre-review-v2.md](sword-and-sorcery-genre-review-v2.md). Owner rulings R1–R5 are recorded there; R6–R9 here.*
