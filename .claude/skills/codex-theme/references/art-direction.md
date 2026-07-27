# Art Direction — illustration for the codex

The site is flat carved stone inlaid with bronze. The illustration has to be flat too, or
it fights the theme. That single idea drives everything below: **the art is drawn, not
rendered.** Ink line and flat colour, the way a printed plate is made — never a glossy
3D-lit digital painting.

This document is the brief you hand the image pipeline. It covers both what to generate
going forward and what to regenerate from the existing set.

## Which file you need

The brief is split so a task pays only for the concern it touches. Everything on this page
applies to every image; the four references below are read as needed.

| File | Read it when |
|---|---|
| **[art-registers.md](art-registers.md)** | you are choosing or writing to a register — the Plate (A) and the Figure (B) specs, and every trap logged under each |
| **[art-setting.md](art-setting.md)** | **any image with a folk, a culture, a creature or a tool in it.** The Bronze Age draw-on / never lists, the iron taboo, and where identity is sourced from. This is where the worst errors are caught |
| **[art-prompting.md](art-prompting.md)** | you are writing the prompt — model type, the two templates, the negative block |
| **[art-acceptance.md](art-acceptance.md)** | you are judging a returned render |

Per-image prompts and the regeneration log live in
`.drafts/nexus-docusaurus-theme/milestone-12-art-regeneration.md`.

## One spine, two registers

Everything shares a spine:

- **Ink-led, line-first.** Every form is described by a drawn line, not by a rendered
  edge. Colour never bleeds past it. The *character* of that line differs per register —
  see [art-registers.md](art-registers.md), and do not carry one register's line spec into
  the other.
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
- **Costume parity between the pair**, as in [art-registers.md](art-registers.md) §
  Register B — the failure mode is a covered male figure beside an under-dressed female one.
- **Carry modesty as a garment description, never as a ban list.** See
  [art-prompting.md](art-prompting.md) § Know which kind of model you are prompting: on an
  instruction-following model, listing what to avoid puts it in the picture. "A heavy wool
  mantle wrapped over one shoulder and across the chest" is the whole mechanism. It leaves
  nothing uncovered and names nothing you don't want.

This outranks setting authenticity. Where the two conflict, cover the figure.

## Presentation

Per the theme's composition rules, art belongs in a **bounded, framed plate** with carved
edges and its own keyline, with words on stone beside or beneath it. Never a translucent
panel floating over a photograph, and never art bled to the full page width with text laid
on top. The frame is what makes an image read as an inlaid plate rather than a hero image.
