# Setting Authenticity — what may appear in the picture

Applies to both registers. Read alongside [art-direction.md](art-direction.md), which holds
the palette lock and the modesty rules. **Modesty outranks setting authenticity: where the
two conflict, cover the figure.**

Bronze Age Mesopotamia, Egypt and Persia. Between roughly 3000 and 1200 BCE.

**Draw on:** ziggurats and mudbrick, palm and papyrus columns, glazed-brick relief,
lamassu and winged bulls, kaunakes tiered wool, linen kilts and shawls, faience and
carnelian beadwork, cylinder seals, reed boats, bronze sickle-swords and khopeshes, lotus
and palmette borders, cuneiform and hieroglyph texture, lapis inlay, date palms, canals.

**Never:** Greek meander borders, Doric or Corinthian columns, pediments and togas, Roman
anything, medieval European armour or heraldry, Norse or Celtic knotwork, Plains-Indian
regalia, Japanese or Chinese motifs, steel plate, printed fabric.

## Iron is taboo, not merely absent

Iron exists in the setting and is **cursed**. The vault
(`(12) 🗝️ Artefakte/Materialien/Metalle/Eisen.md`) has it as *Fluchstein*: an anti-spiritual
taboo metal that repels spirits and attracts monsters, blocks divine and primal magic,
temples forbid it, kings legislate against it, and it is used chiefly by the Urduk and the
sorcerer-kings, or to shackle and mask captive mystics.

So an iron tool in a banner is not just an anachronism, it is a **lore signal** that the
scene is cursed. Reserve dark iron for images that mean exactly that.

Everything else is bronze, knapped stone, wood, reed, rope, leather, bone and fired clay,
lashed and pegged by hand. Prompt it **positively** — say "warm dull bronze, tarnished
green and brown, short leaf-shaped blades, plain timber hafts bound with cord". Writing
"no iron" or "not steel" names the metal and puts it in the picture; a long-handled steel
spade turned up in a sculptor's yard exactly that way. A materials clause belongs in the
**fixed palette block**, not per scene, because every banner with a tool in it is exposed.

**Phrase that clause conditionally, or it becomes a props list.** A global rule sits in
front of scenes that contain no objects at all, and "every tool and vessel in the scene is
bronze" asserts that tools and vessels are there — enough to furnish an empty landscape
with an adze leaning on a rock. Say "*wherever* a tool or vessel *happens to appear*, it
is…", "*any* metal is…", "*any* blade is…". This is the mirror of the negation rule: a
negation summons what it names, and an existential asserts what it names. A global
constraint has to do neither.

## Cultures come from the worldbuilding vault, not from `docs/`

For anything depicting a **folk or a culture**, the source of truth is
`/Users/rm-aclue/git/personal/nexus-rpg-vault/(05) 🏛️ Kulturen/` — `Kulturen/<Name>.md`
for a culture, `Völker/<Volk>.md` for the folk's baseline anatomy. Read the `updated:`
field; several entries were revised in 2026 and the docs have not caught up.

**The culture tables in `docs/02-adventurers/01-folk.md` are stale in at least seven
places** and will hand you a wrong identity if you trust them. The one that cost the most
time: the docs give the *dwarves* astronomy, while the vault moved it to the *hune* and
left the dwarves as hydraulic engineers with a dying golem tradition. Two folk also read
as an entirely different species in the vault than in the docs — Burrin gnomes are
meerkat-like and furred, not small humans, and goblins are the scavenger and scrap-trade
caste rather than scouts.

Check the vault before every folk or culture plate. The full divergence list is in
`.drafts/nexus-docusaurus-theme/milestone-12-art-regeneration.md` § Log.

## Creatures come from `creatures.json`

Never invent a monster for a banner and never let the model pick one. Name a creature that
exists in `src/utils/data/json/creatures.json` and **describe its anatomy from Bronze Age
iconography**, or the model fills in generic western fantasy — the same failure class as
the Greek orcs.

The worked example: "dragon" alone produced a western wyvern with bat wings in front of a
gothic spired castle. The Bronze Age dragon is the **mušḫuššu** of the Ishtar Gate —
scaled serpentine body, slender neck, horned viper head with a forked tongue, a crest of
spines, the forelegs of a lion and scaled bird-like hind legs with talons. Spelling that
out fixed it in one pass.

On-theme creatures already in the data: Desert Dragon, Sphinx, Anubis Guardian, Apophis
Serpent, Lamia, Mummy Lord, Roc, Behir, Hydra, Cyclops.

Two traps when a creature also exists as real-world statuary:

- **Say it is alive and give it an action.** "A sphinx sits couchant on a ruined stone
  plinth" is a description of the Great Sphinx of Giza, and that is what came back — a
  monument. "A living winged sphinx crouches on a rock, wings spread, snarling" does not.
  Put `statue, monument, stone carving` in the negative as well.
- **State the interaction, not a list of subjects.** Naming three things in three places
  gets three unrelated things in three places. Say what they are doing *to each other* —
  "two great monsters face each other across the frame, mid-confrontation, with the
  hunters caught between them".
