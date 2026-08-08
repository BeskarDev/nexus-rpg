# Creatures in Art

Read for any image with a creature in it. The period rules are in
[art-setting.md](art-setting.md), the folk who share the frame in
[art-folk.md](art-folk.md).

## Creatures come from `creatures.json`

Never invent a monster for a banner and never let the model pick one. Name a creature that exists
in `src/utils/data/json/creatures.json` and **describe its anatomy from Bronze Age iconography**,
or the model fills in generic western fantasy — the same failure class as the Greek orcs.

The worked example: "dragon" alone produced a western wyvern with bat wings in front of a gothic
spired castle. The Bronze Age dragon is the **mušḫuššu** of the Ishtar Gate — scaled serpentine
body, slender neck, horned viper head with a forked tongue, a crest of spines, the forelegs of a
lion and scaled bird-like hind legs with talons. Spelling that out fixed it in one pass.

On-theme creatures already in the data: Desert Dragon, Sphinx, Anubis Guardian, Apophis Serpent,
Lamia, Mummy Lord, Roc, Behir, Hydra, Cyclops. Check the file rather than assuming — a savanna
plate asked for a lioness and a hawk when the data has Cat, Bird, Dog and Lizard.

## Two traps when a creature also exists as real-world statuary

- **Say it is alive and give it an action.** "A sphinx sits couchant on a ruined stone plinth" is a
  description of the Great Sphinx of Giza, and that is what came back. "A **living** winged sphinx
  crouches on a rock, wings spread, snarling" does not. Handle it positively: `statue`, `monument`
  and `stone carving` must **not** go in the negative block — objects in the negative get drawn,
  per [art-prompting.md](art-prompting.md) § The negative block.
- **State the interaction, not a list of subjects.** Naming three things in three places gets three
  unrelated things in three places. Say what they are doing *to each other* — "two great monsters
  face each other across the frame, mid-confrontation, with the hunters caught between them".

## Pairing a creature with a folk: silhouette class, then taboo

Both were got wrong at once on the harvesting plate, which had Vaashk lizardfolk butchering a
crocodile.

- **The creature must differ from the folk beside it in silhouette class, not merely in size.**
  Scaled, tailed, forward-leaning butchers over a scaled, tailed, forward-leaning carcass read as
  one texture at 4:1 with blank features, and nothing said which shapes were the people. Scale
  contrast is a real device but cannot separate two bodies of the same anatomy — cross the class
  boundary instead: chitinous, insectoid, cephalopod, many-legged, feathered.
- **Check the host culture's sacred animals before making one the subject of harm.** The crocodile
  is a Vaashk god-aspect with ritual-restricted hunting (`Kulturen/Vaashk.md`), so a rules page
  illustrated with a casual crocodile butchering argued against canon. The culture file's religion
  and taboo sections are the check; run them whenever a plate has a creature being killed, cut up,
  eaten, worked or sold.

Both fixes usually arrive together, because the culture that keeps an animal sacred is the one that
most resembles it.
