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
| Aspect | **4:1 displayed, 1584 × 672 published.** All 55 banners ship at Nano Banana's native 2.36:1 and are cropped to the 4:1 band by `.img-banner` in `ImagePlate.module.css`, with the vertical framing per file in `src/components/codex/banner-crop.ts`. `home-banner.png` is the same file size and ratio, cropped to 3:1 at the call site instead; not the template |
| Cropping | **Never bake the crop, and never upscale to hit a number.** Publish the render as it came and let CSS take the slice. Two rules fall out of one bad afternoon (M12, 2026-07-28) — see below |
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

### The crop is data, not a publish step

A 21:9 render is 2.36:1 and the band is 4:1, so a centre-crop discards **41% of the height** —
138px off each edge of a 672px frame. That is not a trim, and it cannot be a fixed rule,
because this register also asks for **sky across 40–60% of the frame**: the horizon lands near
mid-height, and a centred window then clips whatever is tall. A ziggurat's top, a toppled
column, the foreground ground detail. Which 41% is expendable is a different answer in every
picture.

So the whole set was published twice, and the second way is the rule:

- **Baked centre-crop — wrong.** Ships 1584 × 396 files. Cheapest in bytes, but the framing is
  frozen at generation time, retuning one banner means re-cropping from the original, and the
  originals live in a gitignored staging folder that gets deleted. One unlucky render and the
  fix is a regeneration.
- **Native + CSS crop — right.** Ship 1584 × 672 and let `.img-banner`'s `aspect-ratio: 4 / 1`
  plus `object-fit: cover` take the slice, with `object-position` per filename in
  `banner-crop.ts`. Page layout is identical, every banner is retunable by a one-line edit
  forever, and nothing depends on the staging folder. Costs ~30MB across 55 banners.

Prompt-side guidance cannot substitute for this. `art-prompting.md`'s **central band** still
earns its place — it keeps subjects away from the edges so the slice has something to land on —
but no phrasing makes a 41% cut safe unaimed. Write the band into the prompt *and* expect to
aim the window afterwards.

**Aim downward by default.** Over the full 55, 49 banners needed moving and **46 of those moved
down**, at a median of 67%. Sky at 40–60% of the frame puts the horizon below mid-height, so the
content worth keeping is the lower two thirds. `DEFAULT_BANNER_CROP` is therefore **66%**, and a
banner reviewed and genuinely left at centre must say `'50% 50%'` explicitly — an omission no
longer means "leave it alone". See [art-prompting.md](art-prompting.md) § Central band for the
prompt-side lever if you want a centred composition instead.

Corollary: **`crop` on `ImagePlate` is not "turn cropping on."** It overrides the weight's own
ratio, which only the homepage hero needs. A banner is already cropped by its weight and passes
`cropPosition` alone.

## Register B — the Figure (folk, creatures, item and equipment cuts)

The D&D 3.5E interior look — Wayne Reynolds, Todd Lockwood, Sam Wood. A **sketch that was
never cleaned up**, not a finished inking.

| | |
|---|---|
| Aspect | 1:1 for folk pairs, 4:5 for single figures. **Published at 1024 × 1024**, no upscale, same reason as Register A |
| Filename | `docs/02-adventurers/img/` mixes extensions — nine folk are `.jpeg` (`dwarf`, `elf`, `goblin`, `hune`, `human`, `lionfolk`, `lizardfolk`, `minotaur`, `orc`) and three are `.png` (`gnome`, `dogfolk`, `satyr`). **Convert the render, never rename the file**, or every `![folk-img](./img/…)` reference breaks |
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
