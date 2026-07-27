# Art Direction — illustration for the codex

The site is flat carved stone inlaid with bronze. The illustration has to be flat too, or
it fights the theme. That single idea drives everything below: **the art is drawn, not
rendered.** Ink line and flat colour, the way a printed plate is made — never a glossy
3D-lit digital painting.

This document is the brief you hand the image pipeline. It covers both what to generate
going forward and what to regenerate from the existing set.

## Where the current art stands

The library splits into two groups that do not belong to the same book.

**Banners** (`static/img/banner/*.png`, 4:1) are close to right, but drift across three
sub-styles:

- `home-banner` was the original target. Moebius *ligne claire*: hairline contour, flat
  pastel washes, no rendering, immense sky, a single small figure to give scale. Depth
  comes entirely from atmospheric recession.
- `magic-banner`, `crafting-banner` are heavier: thicker ink, gouache-like modelling,
  richer colour. Still ink-led, a register louder than the target.
- `creatures-banner` was the outlier — heavy black comic ink with saturated orange/blue
  masses. **Regenerated 2026-07-27 and it is now the validated reference for Register A.**
  Judge new plates against it, not against `home-banner`.

Two placement bugs found while inventorying, unrelated to style:
`magic-items-banner.png` is referenced nowhere, and
`docs/04-equipment/07-magic-items/00-overview.md` shows `weapon-armor-materials-banner.png`
instead of it.

**Folk portraits** (`docs/02-adventurers/img/*`, 1:1) do not match the codex at all. They
are rendered digital paintings: specular highlights, blue-sky backdrops, volumetric
modelling, no contour line. `satyr` and `gnome` add a third problem by being soft and
cute where the rest of the game is not. These are the priority to replace.

There is also a **setting** failure independent of style. The orc plate is Classical Greek
(meander borders, chiton, a Parthenon on the hill) and the lizardfolk plate puts a
Plains-Indian warbonnet on a swamp hunter. The game is Bronze Age Mesopotamian, Egyptian
and Persian. Regeneration has to fix the culture as well as the brush.

## One spine, two registers

Everything shares a spine:

- **Ink-led, line-first.** Every form is described by a drawn line, not by a rendered
  edge. Colour never bleeds past it. The *character* of that line differs per register —
  see below, and do not carry one register's line spec into the other.
- **Flat colour on solid forms.** No airbrush gradients on a body, a garment or a rock. No
  specular highlights, no bloom, no lens effects, no rim light. What is excluded is
  *photographic rendering* — soft modelling in a sky or a cloud is not that, and Register A
  wants it.
- **Depth without lighting.** Recession comes from atmospheric fade (plates) or from
  hatch density (figures). Never from a rendered light source.
- **Ink is warm, never pure black.** Register B is sepia `#2f2418` on paper; Register A is
  a warm dark line that varies in weight. A heavy uniform black outline belongs to neither
  — it reads as screenprint.

On top of that spine sit two registers. Which one applies is decided by where the image
goes, not by taste.

### Register A — the Plate (banners, scenes, chapter heads)

Moebius and the French *bande dessinée* school, with the graphic confidence and scale
contrast of contemporary indie TTRPG art (Emiel Boven's *The Electrum Archive*). Prompt
the **techniques below, never a living artist's name**: better output from the model, and
it avoids cloning an identifiable indie creator's look for another game.

**Take composition from Boven, not surface.** A literal read of that reference — heavy
uniform black contour, six flat fills, no gradients, no atmospheric perspective —
produced a screenprint poster and was rejected. What is worth borrowing is the scale
contrast and the unfussy shapes. What is not is the flatness.

That mistake came from misapplying the theme's own rule. **"Flat, always" governs UI
chrome — no bevels, no box-shadows on components. It was never an art rule.** An
illustration may model a cloud, grade a sky and use atmospheric recession without becoming
a glossy render. The thing being excluded from the art is *photographic rendering*, not
*tonal variation*. Do not carry the CSS rule across.

| | |
|---|---|
| Aspect | **4:1 published, 2000 × 496.** All 40 in-doc banners are this. `home-banner.png` is 2.40:1 and is the homepage hero, cropped to 3:1 at the call site — it is not the template. `.img-banner` in `ImagePlate.module.css` reserves `2000 / 496`, so changing this means changing that line too. Generate at 21:9 and centre-crop when the tool has no 4:1 preset. |
| Line | **fine ink of varying weight** — firm in the foreground, thinning to almost nothing in the distance. Never a heavy uniform outline |
| Colour | flat washes on solid forms, no rendering, no glossy highlights |
| Sky | 40–60% of the frame, with **large soft cumulus, softly graded and gently modelled**. The sky is the one place tonal modelling belongs |
| Depth | **atmospheric perspective** — each distance plane lighter and cooler than the one in front |
| Composition | scale contrast: one or two subjects enormous, figures tiny by comparison |
| Bleed | edge to edge, **no drawn border or margin** — the frame comes from `ImagePlate` |
| Palette | ochre sand, terracotta rock, aged bronze, dusty blue grey, one small jewel accent — **five or six colours total, clothing included** |
| Detail | **three or four things the eye can land on.** Broad flat shapes, script and brickwork suggested with a few marks, distant figures as blank silhouettes |
| Mood | still, sun-struck, vast |

The plate's job is atmosphere, not incident. A banner that fills its frame with action
reads as a cover, not a chapter head, and it competes with the prose beneath it.

Do not put "on cream paper" in a plate prompt. It makes the model draw itself a keyline
and a paper margin, which then fights the component frame.

**Density is the standing failure of this register, and the palette block is where it gets
fixed.** Left to itself the model renders every figure individually, gives each one its own
cloth colour, and fills the frame edge to edge — the result reads as a detailed digital
illustration rather than a printed plate, and it turns to mush at the size a banner
actually appears. Three levers, all in the fixed block rather than per scene:

- **Cap the colour count and say clothing is included.** A twenty-figure crowd will
  otherwise arrive in twenty hues.
- **Name what gets simplified.** "Suggest carved script and brickwork with a handful of
  marks"; "anyone below middle distance is a blank silhouette".
- **State the display size and the element budget.** "Printed small … three or four things
  the eye can land on, sitting in open space" does more work than any adjective about
  style, because it gives the model a reason.

A scene prompt reinforces this by naming what carries detail — "only the priest and the
tablet carry any detail" — rather than by listing more things to draw.

### Register B — the Figure (folk, creatures, item and equipment cuts)

The D&D 3.5E interior look — Wayne Reynolds, Todd Lockwood, Sam Wood. A **sketch that was
never cleaned up**, not a finished inking.

| | |
|---|---|
| Aspect | 1:1 for folk pairs, 4:5 for single figures |
| Line | **variable weight, broken and searching**; thins and drops out entirely in lit areas; construction lines left visible |
| Shading | scribbled crosshatch that overshoots the edge of the form |
| Colour | near-monochrome bronze and sepia wash over the ink; one spot hue at most |
| Background | a **line-only vignette** — ground line, a few plants, one scenery element — fading out into bare paper at the edges. Never a rendered or filled landscape. |
| Figures | large in frame, **both upright at full height, side by side**, contrapposto, caught mid-gesture, each posed differently |
| Depth | hatch density only — dense in the shadow side, open in the light |
| Mood | alive and characterful; a working sketchbook study |

Two traps, both hit on the first satyr test batch and both caused by the prompt:

- **"Uniform contour line" is a Register A spec and must never appear in a Register B
  prompt.** Moebius genuinely is one hairline weight. The 3.5E scribble is not, and asking
  for uniformity produces the clean even outline that reads as vector art — the exact
  failure the register exists to avoid. Ask for *variable weight, broken, searching* line.
- **Never ask for a "neutral pose", a "clear silhouette", or an "ethnographic plate".**
  Together they generate a museum specimen board: both figures frontal, evenly spaced,
  arms at their sides, symmetrical, dead-eyed. Ask instead for contrapposto with hips and
  shoulders counter-rotated, three-quarter view, the two figures posed differently and
  overlapping with one half a step behind the other, and **name a specific expression for
  each figure**. "Serious" and "no cute stylisation" over-correct into embalmed.

The word *illustration* in a prompt biases toward finished lineart. *Sketch* and
*sketchbook study* pull back toward the target.

Two more rules the satyr batch produced:

- **Name garments, never periods.** "Bronze Age Anatolian dress" drifts to generic fantasy
  — the second satyr run came back in a bra top and a low-slung coin belt. "Tiered
  kaunakes fleece skirt, wrapped wool mantle over one shoulder" does not drift. Every
  Register B prompt names its garments.
- **Both figures upright at full height, side by side.** A folk set is read comparatively —
  twelve plates judged against each other for build, height and silhouette — and a
  crouching or kneeling figure breaks that comparison and hides the costume, which is the
  plate's whole job. Get variety from hands and head direction, never by dropping a figure
  to the ground. The animating instruction ("caught mid-gesture") pulls hard toward
  crouching, so the upright constraint has to be stated explicitly in every prompt or it
  loses.
- **Beast-folk are humanoid first, animal second.** Two opposite failures, both hit. Naming
  a species without a qualifier returns the species: "meerkat-like gnome folk with long
  muzzles" produced bipedal meerkats. But over-correcting toward human loses the folk. The
  split that works: where the animal is a *trait* (gnomes), keep a **fully human face and
  hands** and let the animal show only as accents — outsized ears, a distinctive nose, eye
  markings, a fine down. Where the folk genuinely has an **animal head** (catfolk,
  lizardfolk, minotaur, dogfolk), draw that animal *read on a humanoid skull*: shorten the
  muzzle, set the eyes forward instead of at the sides, keep a defined brow, and hold human
  proportions in shoulders, hands and stance. Write "clearly humanoid" and name the
  shortened muzzle explicitly in every such prompt.
- **Regenerating art replaces the rendering, not the mood.** A prompt written from the lore
  alone silently resets tone to neutral. The dogfolk original is menacing — charcoal hoods,
  tattered wraps, amber eyes in shadow — and a lore-only rewrite produced a courtier in
  bright ceremonial linen. Look at the file being replaced before writing its prompt, and
  carry over mood, palette weight, bearing and identifying ornament unless there is a
  reason to drop them. Name the mood in the prompt as its own clause; it does not survive
  by implication.
- **An absence has to be enumerated part by part — and phrased as what IS there.** The
  model supplies hair, brows and ordinary skin unless told otherwise, so omitting a trait
  does not remove it; but listing "no beard, no eyebrows" summons them. Name each part and
  give it a positive quality instead: the hune get "smooth bare scalps, smooth browless
  foreheads, clean-shaven bare jaws, smooth skin over the arms and chest". Same coverage,
  nothing negated.
- **Costume parity across the pair.** Both figures wear the same *class* of garment,
  differing in cut and ornament, not in coverage. Otherwise the set drifts folk by folk —
  one bare-midriff satyr against one linen-sheathed elf and it stops reading as one book.
- **State the tonal range or the wash comes out anaemic.** Left to itself the model
  produces a pale even mid-tone that reads fine on the light theme and goes faint on the
  dark one. Ask for hatching "dense enough in the shadow side to read as near-black,
  thinning to bare paper in the light".
- **Watch generic fantasy-tribal drift on the settled folk.** Leather vest and ragged fur
  skirt passes for satyrs and other wilderness folk. It is wrong for elves, dwarves and
  humans, whose named garments (linen sheath dress, kaunakes tiers, pleated kilt) must be
  spelled out and held.

Two figures per folk (one masculine, one feminine presenting) is the established
convention and stays. Show costume, ornament and proportion clearly. The figure exists to
answer "what does this folk look like", so silhouette and dress read before anything else.

The register split is deliberate: banners breathe, figures are dense. That is the same
contrast the type scale draws between reading surfaces and scan surfaces.

## Palette lock

Pull from the theme tokens so the art and the chrome are the same material. Give the
pipeline these hexes literally.

| Role | Hex | Use |
|---|---|---|
| Vellum ground | `#f2eadc` | paper, sky highs, negative space |
| Ink | `#2f2418` | every contour and all hatching |
| Bronze | `#8a5a2b` | metal, leather, structural accent |
| Sand / ochre | `#c9975a` | stone, cloth, skin midtones, desert |
| Lapis | `#2a4d8f` | spot only |
| Carnelian | `#a83a28` | spot only |
| Emerald | `#1f6b47` | spot only |
| Rune cyan | `#63d7e6` | **magic only** — never decoration |

Three hard limits:

- **The three jewel tones together cover at most 10% of the frame.** They are inlay, not
  paint. This is the rule `creatures-banner` breaks.
- **Rune cyan means magic is happening.** `magic-banner` uses it correctly. Nothing else
  may borrow it.
- **Vellum, ink, bronze and ochre carry ≥ 80% of every image.** If an image would still
  read as itself in bronze-on-vellum duotone, the palette is right.

Images are used against both light and dark site themes, so keep the value range
mid-weight. Avoid near-white skies and near-black masses, both of which blow out against
one theme or the other.

The hexes are the spec, not the prompt. Nano Banana 2 responds to colour *names*, so
prompts say "aged cream paper", "warm dark brown ink", "ochre sand". Grade to the hexes
afterwards if a result lands close but off-hue.

## Modesty — non-negotiable, every register

**No erotic or sexualised content, ever.** Historical precedent pushes hard the other way
and must be overridden: Bronze Age dress was frequently topless for both sexes, and the
Greek satyr is lewd by definition in its source material. Neither is a licence. The art
is a rulebook illustration, read by anyone at the table.

Applied rules:

- **Both figures fully clothed, chest and torso covered.** No bare midriff, no cleavage,
  no bare chest, on any figure of any gender.
- **No suggestive or sensual posing.** Dynamic and mid-gesture, never a pin-up line.
- **Costume parity between the pair**, as above — the failure mode is a covered male
  figure beside an under-dressed female one.
- **Carry modesty as a garment description, never as a ban list.** See the section on
  model types below: on an instruction-following model, listing what to avoid puts it in
  the picture. "A heavy wool mantle wrapped over one shoulder and across the chest" is the
  whole mechanism. It leaves nothing uncovered and names nothing you don't want.

This outranks setting authenticity. Where the two conflict, cover the figure.

## Setting authenticity

Bronze Age Mesopotamia, Egypt and Persia. Between roughly 3000 and 1200 BCE.

**Draw on:** ziggurats and mudbrick, palm and papyrus columns, glazed-brick relief,
lamassu and winged bulls, kaunakes tiered wool, linen kilts and shawls, faience and
carnelian beadwork, cylinder seals, reed boats, bronze sickle-swords and khopeshes, lotus
and palmette borders, cuneiform and hieroglyph texture, lapis inlay, date palms, canals.

**Never:** Greek meander borders, Doric or Corinthian columns, pediments and togas, Roman
anything, medieval European armour or heraldry, Norse or Celtic knotwork, Plains-Indian
regalia, Japanese or Chinese motifs, steel plate, printed fabric.

### Iron is taboo, not merely absent

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

### Cultures come from the worldbuilding vault, not from `docs/`

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

### Creatures come from `creatures.json`

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

## Know which kind of model you are prompting

This matters more than any wording below, and getting it wrong destroyed a good result
mid-way through the satyr batch.

**Diffusion models** (SDXL, Flux) have a real negative-prompt channel with its own
conditioning. A long ban list works there.

**Instruction-following models** (Gemini / Nano Banana, and the pipeline currently in use)
do not. Anything you write is read as *content*. A 60-term ban list naming coin belts,
bare midriffs, forests and glossy rendering produced an image containing a coin belt, a
bare midriff, a forest and glossy rendering — a near-exact revert to the original art the
brief exists to replace.

Rules for the instruction-following case:

- **Negatives are for technique only.** Nano Banana 2 accepts an inline `Negative Prompt:`
  line, but it must name only mediums and rendering techniques. See the negative block
  under the templates.
- **Never negate an object, a garment or a body part — including in the fixed blocks.**
  This rule has been broken three times and twice it was in boilerplate, so the leak hit
  every image in the batch rather than one. The worst case: "no drawn border, keyline or
  paper margin" put a black keyline and a white margin on every banner. Audit the reusable
  paragraphs for the word "no", not just the per-image text. State what *is* there instead.
  Coverage is carried by describing the garment — "a wool mantle wrapped over one shoulder
  and across the chest" — not by forbidding its absence.
- **Lead with the medium, not the subject.** First sentence establishes paper, line and
  wash. A style block stranded at the end of a long prompt gets outweighed by the subject.
- **Keep it short**, and break it into short paragraphs: medium, subject and pose,
  costume, setting.
- **State the aspect ratio inside the prompt text**, not only in the pipeline field.
  Gemini honours "(must be in the 21:9 aspect ratio)" written into the first sentence far
  more reliably than a ratio passed alongside, and a wide plate returned at 16:9 or square
  loses its composition entirely.

## Prompt templates

Written for **Nano Banana 2**, the pipeline in use. Four short paragraphs in this order:
medium, subject and pose, costume, setting. No negative prompt, no comma salad, no
`--ar` flags. Set the aspect ratio in the pipeline, not the prompt.

### Figure (Register B)

```
A loose sepia pen-and-ink sketchbook study on aged cream paper, unfinished.
Variable weight line, broken and searching, construction lines left visible,
scribbled crosshatch shading that overshoots the form, dense enough in the shadow
side to read as near-black and thinning to bare paper in the light. A sepia wash
with a full tonal range from pale paper to deep shadow, monochrome.

[TWO FOLK], in three-quarter view with counter-rotated hips and shoulders, posed
differently and overlapping, one half a step behind the other. [WHAT HE IS DOING
AND HIS EXPRESSION]. [WHAT SHE IS DOING AND HER EXPRESSION]. [DISTINGUISHING
ANATOMY, BUILD AND HEIGHT].

Both wear [NAMED GARMENT COVERING CHEST AND TORSO], with [NAMED BRONZE ORNAMENT].

They stand on a few sketched ground lines and plants that fade out into blank paper.
```

Every bracketed slot is mandatory. Leave the pose or the expressions out and a specimen
board comes back; leave the garment unnamed and it drifts to generic fantasy.

### Plate (Register A)

```
A wide panoramic comic plate in the French bande dessinee tradition (must be in the
21:9 aspect ratio), composed as a horizontal strip. Drawn in fine ink line of
varying weight, firm on the foreground
and thinning to almost nothing in the distance. Flat colour washes on solid forms
with no rendering and no glossy highlights, but the sky and the clouds are softly
graded and gently modelled. Atmospheric perspective: each distance plane lighter
and cooler than the one in front of it.

[LANDSCAPE] under a huge open sky filling the upper half of the strip, with large
soft white cumulus clouds massed along the horizon. [ONE OR TWO ENORMOUS SUBJECTS,
each named from creatures.json and its anatomy described from Bronze Age
iconography, doing something to each other]. [SMALL FIGURES], tiny by comparison,
[WHAT THEY ARE DOING]. A stepped mudbrick ziggurat city sits small and pale on the
far horizon.

A warm desaturated palette of ochre sand, terracotta rock, aged bronze and dusty
blue grey, with one small carnelian accent. Hold the whole image to five or six
colours in total, clothing included: a crowd wears two or three shared cloth
colours drawn from that same palette, not one colour each.

Simplify hard. Few large shapes, broad areas of flat colour, and very little
interior detail: suggest carved script, brickwork and foliage with a handful of
marks rather than drawing them out. Anyone below middle distance is a simplified
silhouette with blank features. The ink line is visibly hand-drawn, loose and
slightly uneven in pressure.

This strip is printed small, about the width of a page and only a few centimetres
tall, so build it to read at a glance: three or four things the eye can land on,
sitting in open space, rather than a busy frieze packed edge to edge.

Wherever a tool, weapon, fitting or vessel happens to appear, it is Bronze Age
work: cast bronze, knapped stone, wood, reed, rope, leather, bone or fired clay,
lashed and pegged together by hand. Any metal is warm dull bronze or copper,
tarnished green and brown. Any blade is short, leaf-shaped or sickle-curved, on a
plain timber haft bound with cord.

Full bleed. The scene continues past all four edges of the picture and is cut off
by them, as though this strip were a detail cropped out of a much larger painting.
Sky runs off the top edge, ground runs off the bottom edge, and the landscape runs
off both sides. Colour reaches every corner and fills the entire canvas. Keep the
important elements inside a central horizontal band, so the strip still reads when
it is cropped in height.

Negative Prompt: photograph, 3D render, glossy highlights, airbrushed shading,
heavy uniform black outline, screen print, vector art, poster art, cel shading.
```

Technique terms only. An earlier version of this block also carried `western wyvern, bat
wings, medieval castle, statue, monument, stone carving` — and the render came back with a
bat-winged wyvern. Objects in the negative get drawn. Everything on that list is now
handled positively in paragraph 2 instead: "a **wingless** serpent-dragon … its back is
bare and smooth", "a **living** winged lion", "a **stepped mudbrick** ziggurat city".

That last paragraph must stay **positively phrased**. It previously read "with no drawn
border, keyline or paper margin of its own" — naming the three things to avoid — and the
model dutifully drew a black keyline inside a white margin on every banner. Describe what
reaches the edge instead: the scene continuing past the crop, colour in every corner.

It carries two instructions that look contradictory and are not. **Bleed** stops the model
framing the picture — crop a framed image in height and you are left with orphaned border
segments down the left and right edges. **Central band** is what makes the 21:9 → 4:1
centre-crop safe. Sky and ground run to all four
edges; subjects sit in the middle. Keep both even when generating at 4:1 directly.

### The negative block

Nano Banana 2 takes an inline `Negative Prompt:` line at the end. Use it, but under one
hard constraint:

**Only medium and technique terms. Never an object, a garment or a body part.** A
technique word has no visual referent to summon; an object does. The 60-term list that
named coin belts, bare midriffs and forests produced an image containing all three.

The two registers need **different** blocks — Register A actively wants the clean even
outline and the full colour that Register B forbids.

Register B (figures):

```
Negative Prompt: photograph, 3D render, digital painting, smooth airbrushed
shading, glossy highlights, full colour, finished lineart, clean even outline.
```

Register A (plates):

```
Negative Prompt: photograph, 3D render, digital painting, airbrushed shading,
glossy highlights, gradient, soft focus, atmospheric haze.
```

In the B block, `finished lineart` and `clean even outline` are the two that can backfire
by reinforcing lineart. Drop them first if the line goes weak. Everything before them is
safe.

Anything you want *absent* that is a thing rather than a technique — coverage, a wrong
culture's ornament, a background — is handled in the positive text by describing what is
there instead.

## Acceptance checklist

Reject and regenerate if any of these fail.

**Both registers — the ones that actually catch bad output:**

1. **Is every figure fully covered and non-sexualised?** Automatic reject, no exceptions,
   checked before anything else.
2. **Is there a visible drawn line around every form?** No line means it was rendered,
   not drawn. Automatic reject.
3. **Any specular highlight, rim light or glow?** Automatic reject.
4. **Does a jewel tone — lapis, carnelian, emerald — cover more than a tenth of the
   frame?** Reject. Terracotta, ochre and bronze are the base family and may carry mass.
5. Every creature exists in `creatures.json`, is drawn from Bronze Age iconography, and is
   **alive and doing something** rather than rendered as statuary.
6. No anachronistic or wrong-culture motif from the ban list.
7. Mid-weight values — legible against both the light and dark site themes.
8. No text, glyphs or signature baked into the image. Cuneiform *texture* on a wall is
   fine; readable lettering is not.

**Register A — plates:**

1. Line varies in weight and thins with distance. A heavy uniform outline is the
   screenprint failure — reject.
2. Sky is at least 40% of the frame, with modelled cumulus rather than an empty flat field.
3. Depth is carried by atmospheric recession, planes going lighter and cooler.
4. Art bleeds edge to edge and draws no border or paper margin of its own.
5. Subjects interact with each other rather than sitting in the frame separately.

**Register B — figures:**

1. Ink is warm sepia, not black.
2. Contour varies and breaks; construction lines survive. One even weight is vector art —
   reject.
3. Background is a line-only vignette fading to paper; shading is hatch, not
   wash-modelling.
4. Hatching reaches near-black in the shadow side. A pale even mid-tone is the anaemic
   failure.
5. Both subjects are upright at full height. A crouching or kneeling figure is a reject.
   Beast-folk read as humanoid, not as an upright animal — check the muzzle length and the
   hands.
6. The two subjects are posed differently, overlapping, not both facing front.
7. Both wear the same class of garment. Uneven coverage across the pair is a reject.
8. Would it survive as bronze-on-vellum duotone? Desaturate and look.

## Remediation order

Both registers are now validated against an approved render, so the whole library is
regenerated rather than patched. The per-image prompts live in
`.drafts/nexus-docusaurus-theme/milestone-12-art-regeneration.md`.

1. **All twelve folk portraits.** The largest and most visible break, the only art a reader
   studies rather than glances at, and two carry setting errors on top of the style
   mismatch. Register B.
2. **All 40 banners plus the homepage hero.** Register A. `creatures-banner` is already
   done and is the reference the rest are judged against.
3. **Fix the two placement bugs** at the same time: point the magic items overview at
   `magic-items-banner.png`, which is currently orphaned.

`home-banner` is no longer the style reference and is regenerated with the rest. It is a
2.40:1 hero cropped to 3:1 at the call site, not a 4:1 banner — generate it to its own
size.

## Presentation

Per the theme's composition rules, art belongs in a **bounded, framed plate** with carved
edges and its own keyline, with words on stone beside or beneath it. Never a translucent
panel floating over a photograph, and never art bled to the full page width with text laid
on top. The frame is what makes an image read as an inlaid plate rather than a hero image.
