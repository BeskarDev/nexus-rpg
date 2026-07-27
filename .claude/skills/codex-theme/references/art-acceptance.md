# Acceptance Checklist

Run against every returned render. The specs behind these live in
[art-registers.md](art-registers.md), [art-setting.md](art-setting.md) and the palette lock
in [art-direction.md](art-direction.md).

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
