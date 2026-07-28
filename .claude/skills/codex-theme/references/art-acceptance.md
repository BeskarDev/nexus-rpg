# Acceptance Checklist

Run against every returned render. The specs behind these live in
[art-registers.md](art-registers.md) (style), [art-composition.md](art-composition.md) (plate
scenes), [art-setting.md](art-setting.md) with its folk / gods / creatures files (what may
appear), and the palette lock in [art-direction.md](art-direction.md).

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
5. Subjects interact with each other rather than sitting in the frame separately. **Looking
   at the same thing does not count.** Two groups facing each other across the middle of the
   frame, arms down, nobody touching anything, is a standoff and a reject — at least one
   figure must be acting on something, and the parties must be staggered off the centre line
   rather than drawn up as facing ranks.
6. **Are the folk the scene named actually there, and readable by silhouette?** A plate whose
   figures all came back human is a reject — check height, horns, ears, tails, manes and
   hooves, not faces. Fur and scales stay inside the palette.

### Pre-flight: check the prompt before spending a render

Four of the Register A rules are checkable in the *text*, and a sweep of 43 unrendered prompts
found all four broken somewhere. Cheaper to grep than to regenerate.

1. **Is there a detail clause?** "Only X and Y carry any detail" is not decoration — it is the
   density lever, and 17 of the 43 had lost it. Without it the model details everything and the
   strip stops reading at banner size.
2. **Does the word "tiny" touch a folk that has a canon height?** "A tiny Imentep archivist,
   tall and slender" contradicts itself inside one sentence. Smallness is a *ratio to the
   enormous element* — "small against the wall of shelves", "all three tiny beneath it" — never a
   property of a folk.
3. **Does any mass span the full width?** Grep the prompt for "splitting the frame", "the whole
   width", "runs the width". A horizontal element crossing the strip levelly becomes a panel
   border. Put it on a **diagonal**, run one end off an edge, and break the line where it leaves.
4. **Is the enormous element something that is plausibly monumental?** A chariot, a bowl, a
   weapon, a tablet — anything whose size is part of what it is — comes back as a comic prop.
   Move the "enormous" onto the dust plume, the architecture, or the crowd of stock instead.

Also confirm the scene has a **beat pointing at its own subject**, not merely figures looking at
it, and that every creature named exists in `creatures.json` — a savanna plate asked for a lioness
and a hawk when the data has Cat, Bird, Dog and Lizard.

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
