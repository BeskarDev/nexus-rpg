# Art Registers — the Plate and the Figure

The two register specs. Both sit on the shared spine in [art-direction.md](art-direction.md)
§ One spine, two registers — ink-led, flat colour, depth without lighting — plus the palette
lock and the modesty rules, which outrank everything here. Which register applies is decided by
where the image goes, not by taste.

**Composing a Register A scene is a separate concern**: subject and focus, standoff, haste,
full-width masses, underground, parties, scale words all live in
[art-composition.md](art-composition.md). Read this file to write the *style* of a plate, that
one to build its *scene*.

## Register A — the Plate (banners, scenes, chapter heads)

Moebius and the French *bande dessinée* school, with the scale contrast of contemporary indie
TTRPG art (Emiel Boven's *The Electrum Archive*). **Prompt the techniques, never a living
artist's name** — better output, and it avoids cloning an identifiable creator's look.

**Take composition from Boven, not surface.** A literal read — heavy uniform black contour,
six flat fills, no gradients, no atmospheric perspective — returns a screenprint poster.
Borrow the scale contrast and the unfussy shapes, not the flatness.

**"Flat, always" governs UI chrome. It was never an art rule.** A plate may model a cloud,
grade a sky and use atmospheric recession. What is excluded is *photographic rendering*, not
*tonal variation*. Do not carry the CSS rule across.

| | |
|---|---|
| Aspect | **4:1 published, 2000 × 496** — all 40 in-doc banners. `home-banner.png` is 2.40:1, the homepage hero, cropped to 3:1 at the call site; not the template. `.img-banner` in `ImagePlate.module.css` reserves `2000 / 496`, so changing the aspect means changing that line too. Generate at 21:9 and centre-crop when the tool has no 4:1 preset |
| Line | fine ink of **varying weight** — firm in the foreground, thinning to almost nothing in the distance. Never a heavy uniform outline |
| Colour | flat washes on solid forms, no rendering, no glossy highlights |
| Sky | 40–60% of the frame, **large soft cumulus, softly graded and gently modelled** — the one place tonal modelling belongs |
| Depth | **atmospheric perspective** — each distance plane lighter and cooler than the one in front |
| Composition | scale contrast: one or two subjects enormous, figures tiny by comparison |
| Bleed | edge to edge, no drawn border or margin — the frame comes from `ImagePlate` |
| Palette | ochre sand, terracotta rock, aged bronze, dusty blue grey, one small jewel accent — **five or six colours total, clothing included** |
| Detail | **three or four things the eye can land on.** Broad flat shapes; script and brickwork suggested with a few marks; distant figures blank silhouettes |
| Mood | still, sun-struck, vast |

The plate's job is atmosphere, not incident: a frame full of action reads as a cover and
competes with the prose beneath it. (One licensed exception, for a mechanic that measures
progress — see [art-composition.md](art-composition.md) § On a mechanics page.)

Never put "on cream paper" in a plate prompt — the model draws itself a keyline and a paper
margin that then fight the component frame.

## Register B — the Figure (folk, creatures, item and equipment cuts)

The D&D 3.5E interior look — Wayne Reynolds, Todd Lockwood, Sam Wood. A **sketch that was
never cleaned up**, not a finished inking.

| | |
|---|---|
| Aspect | 1:1 for folk pairs, 4:5 for single figures |
| Line | **variable weight, broken and searching**; thins and drops out entirely in lit areas; construction lines left visible |
| Shading | scribbled crosshatch that overshoots the edge of the form |
| Colour | near-monochrome bronze and sepia wash over the ink; one spot hue at most |
| Background | a **line-only vignette** — ground line, a few plants, one scenery element — fading out into bare paper. Never a rendered or filled landscape |
| Figures | large in frame, **both upright at full height, side by side**, contrapposto, caught mid-gesture, each posed differently |
| Depth | hatch density only — dense in the shadow side, open in the light |
| Mood | alive and characterful; a working sketchbook study |

The word *illustration* biases toward finished lineart. *Sketch* and *sketchbook study* pull
back toward the target.

- **"Uniform contour line" is a Register A spec and must never appear in a Register B prompt.**
  Moebius genuinely is one hairline weight; the 3.5E scribble is not, and asking for uniformity
  produces the clean even outline that reads as vector art. Ask for *variable weight, broken,
  searching*.
- **Never ask for a "neutral pose", a "clear silhouette", or an "ethnographic plate".** Together
  they generate a museum specimen board — both figures frontal, evenly spaced, arms at their
  sides, symmetrical, dead-eyed. Ask for contrapposto with hips and shoulders counter-rotated,
  three-quarter view, the two figures posed differently and overlapping with one half a step
  behind, and **name a specific expression for each figure**. "Serious" and "no cute
  stylisation" over-correct into embalmed.
- **Name garments, never periods.** "Bronze Age Anatolian dress" drifts to generic fantasy — it
  returned a bra top and a low-slung coin belt. "Tiered kaunakes fleece skirt, wrapped wool
  mantle over one shoulder" does not drift. Every Register B prompt names its garments, and
  never a bare garment noun — see [art-folk.md](art-folk.md) § A bare garment noun.
- **Both figures upright at full height, side by side.** A folk set is read comparatively —
  twelve plates judged against each other for build, height and silhouette — and a crouching or
  kneeling figure breaks the comparison and hides the costume, which is the plate's whole job.
  Get variety from hands and head direction. "Caught mid-gesture" pulls hard toward crouching,
  so the upright constraint has to be stated in every prompt or it loses.
- **Beast-folk are humanoid first, animal second.** Naming a species without a qualifier returns
  the species ("meerkat-like gnome folk with long muzzles" produced bipedal meerkats), but
  over-correcting toward human loses the folk. Where the animal is a *trait* (gnomes), keep a
  **fully human face and hands** and let the animal show only as accents — outsized ears, a
  distinctive nose, eye markings, a fine down. Where the folk genuinely has an **animal head**
  (catfolk, lizardfolk, minotaur, dogfolk), draw that animal *read on a humanoid skull*: shorten
  the muzzle, set the eyes forward instead of at the sides, keep a defined brow, and hold human
  proportions in shoulders, hands and stance. Write "clearly humanoid" and name the shortened
  muzzle explicitly in every such prompt.
- **Regenerating art replaces the rendering, not the mood.** A prompt written from the lore alone
  silently resets tone to neutral: the dogfolk original is menacing — charcoal hoods, tattered
  wraps, amber eyes in shadow — and a lore-only rewrite produced a courtier in bright ceremonial
  linen. Look at the file being replaced, carry over mood, palette weight, bearing and
  identifying ornament unless there is a reason to drop them, and name the mood as its own
  clause; it does not survive by implication.
- **An absence has to be enumerated part by part, phrased as what IS there.** The model supplies
  hair, brows and ordinary skin unless told otherwise, so omitting a trait does not remove it —
  but "no beard, no eyebrows" summons them. Name each part and give it a positive quality: the
  hune get "smooth bare scalps, smooth browless foreheads, clean-shaven bare jaws, smooth skin
  over the arms and chest".
- **Costume parity across the pair.** Both figures wear the same *class* of garment, differing
  in cut and ornament, not in coverage. Otherwise the set drifts folk by folk — one bare-midriff
  satyr against one linen-sheathed elf and it stops reading as one book.
- **State the tonal range or the wash comes out anaemic.** Left alone the model produces a pale
  even mid-tone that reads fine on the light theme and goes faint on the dark one. Ask for
  hatching "dense enough in the shadow side to read as near-black, thinning to bare paper in the
  light".
- **Watch generic fantasy-tribal drift on the settled folk.** Leather vest and ragged fur skirt
  passes for satyrs and other wilderness folk. It is wrong for elves, dwarves and humans, whose
  named garments (linen sheath dress, kaunakes tiers, pleated kilt) must be spelled out and held.

Two figures per folk (one masculine, one feminine presenting) is the established convention and
stays. The figure exists to answer "what does this folk look like", so silhouette and dress
read before anything else. Register B is also the register that may afford a named real-world
monument as a reference — see [art-folk.md](art-folk.md) § The two dwarf cultures.

The register split is deliberate: banners breathe, figures are dense. That is the same contrast
the type scale draws between reading surfaces and scan surfaces.
