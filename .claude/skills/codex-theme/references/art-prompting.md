# Prompting the Image Pipeline

How to write the prompt once the register is chosen ([art-registers.md](art-registers.md))
and the setting is sourced ([art-setting.md](art-setting.md)). Judge what comes back
against [art-acceptance.md](art-acceptance.md).

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
