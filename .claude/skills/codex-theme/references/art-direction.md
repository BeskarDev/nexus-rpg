# Art Direction — illustration for the codex

The site is flat carved stone inlaid with bronze, so the illustration has to be flat too or it
fights the theme. **The art is drawn, not rendered**: ink line and flat colour, the way a printed
plate is made, never a glossy 3D-lit digital painting.

This page is the hub — the spine, the palette lock, modesty and presentation apply to **every**
image. Everything else is split so a task pays only for the concern it touches.

| File | Read it when |
|---|---|
| [art-registers.md](art-registers.md) | choosing or writing to a register — the Plate (A) and Figure (B) style specs and their surface traps |
| [art-composition.md](art-composition.md) | building a Register A **scene** — subject and focus, standoff, haste, full-width masses, underground, parties, scale words |
| [art-setting.md](art-setting.md) | **any image at all** — the period, the draw-on / never lists, the iron taboo, magical naturalism |
| [art-folk.md](art-folk.md) | a **folk, culture or named person** is in it — the desert cast table, species-noun and garment traps, the dwarf beards |
| [art-gods.md](art-gods.md) | a **god, temple, mystic or arcanist** is in it — the Atakhet pantheon table, arcane-is-a-crime staging |
| [art-creatures.md](art-creatures.md) | a **creature** is in it — sourcing from `creatures.json`, Bronze Age anatomy, creature/folk pairing |
| [art-prompting.md](art-prompting.md) | writing the prompt — model type, the two templates, the negative block |
| [art-acceptance.md](art-acceptance.md) | judging a returned render |

Per-image prompts and the regeneration log live in
`.drafts/nexus-docusaurus-theme/milestone-12-art-regeneration.md`.

## One spine, two registers

Which register applies is decided by where the image goes, not by taste. Both share a spine:

- **Ink-led, line-first.** Every form is described by a drawn line, not a rendered edge, and
  colour never bleeds past it. The *character* of that line differs per register — never carry
  one register's line spec into the other.
- **Flat colour on solid forms.** No airbrush gradients on a body, a garment or a rock; no
  specular highlights, bloom, lens effects or rim light. What is excluded is *photographic
  rendering* — soft modelling in a sky or a cloud is not that, and Register A wants it.
- **Depth without lighting.** Recession comes from atmospheric fade (plates) or hatch density
  (figures), never from a rendered light source.
- **Ink is warm, never pure black.** Register B is sepia `#2f2418` on paper; Register A is a warm
  dark line that varies in weight. A heavy uniform black outline belongs to neither — it reads as
  screenprint.

## Palette lock

Pull from the theme tokens so the art and the chrome are the same material.

| Role | Hex | Use |
|---|---|---|
| Vellum ground | `#f2eadc` | paper, sky highs, negative space |
| Ink | `#2f2418` | every contour and all hatching |
| Bronze | `#8a5a2b` | metal, leather, structural accent |
| Sand / ochre | `#c9975a` | stone, cloth, skin midtones, desert |
| Lapis | `#2a4d8f` | spot only |
| Carnelian | `#a83a28` | spot only |
| Emerald | `#1f6b47` | spot only |
| Rune cyan | `#63d7e6` | **arcane magic only** — never decoration, and never mystic magic |

- **The three jewel tones together cover at most 10% of the frame.** They are inlay, not paint.
  This is the rule `creatures-banner` breaks.
- **Vellum, ink, bronze and ochre carry ≥ 80% of every image.** If an image would still read as
  itself in bronze-on-vellum duotone, the palette is right.
- **A licensed accent is spent on whatever object has the strongest colour prior, so say where it
  goes.** "With one small carnelian accent" grants the model one red thing and lets it choose —
  put a gnome in the frame and the red lands on a pointed cap every time, because the accent
  clause and the species prior conspire. Either name the object that carries the accent, or state
  the competing item's colour outright ("a layered robe of **undyed sand-coloured cloth**"). An
  unassigned accent is a request for the model's favourite cliché in that hue.

Images are used against both site themes, so keep the value range mid-weight — avoid near-white
skies and near-black masses, both of which blow out against one theme or the other.

The hexes are the spec, not the prompt. Nano Banana 2 responds to colour *names*, so prompts say
"aged cream paper", "warm dark brown ink", "ochre sand". Grade to the hexes afterwards if a result
lands close but off-hue.

### Cyan is arcane, warm gold is mystic, and the two never blend

**Rune cyan means ARCANE magic is happening**, and the setting draws that line hard. Arcane is the
transgression the gods punished the old elf kingdom for, and Anutep suppresses it still, so cyan on
an object says *old, illegal, dug up*. The desert's lawful magic is the other kind — mystic
blessing plus inherently magical material — and the vault gives it a **warm** signature:
Glanzbronze is "a warm-golden glow with a reddish shimmer", Solarit "glows like liquid sun, with
inner veins of light". Both sit inside the ochre-and-bronze core, so a consecrated or material-made
item is lit warm and spends no accent at all. Cyan is reserved for ruins, relics, arcane
practitioners and the sorcerer-princes, and nothing else may borrow it in either direction.

**This is the rule the whole 07-Magic chapter broke.** Three plates lit *mystic* subjects cyan — a
ring of kneeling mystics, a god-statue's eyes, a temple library's tablets — which says "these
priests are practising the crime their own temple hunts people for". Divine light is **warm gold**;
cold cyan is the transgression. Check every glow against which of the two systems the page actually
documents: Wild Surge is arcane (`blunder a rank 1 or higher arcane spell`), Penance is mystic, and
the two overview pages are one each.

**Check the gate in the talents, not the chapter position.** Metamagic Arts *looks* like a
both-systems page from where it sits between the two overviews, and it is not: `Spellweaver` reads
"use Metamagic Arts along with your **arcane** spells", and `index.md` contrasts it explicitly with
the mystic ability to bend spell effects. Arcane only, so cyan only. Ask which skill unlocks a
thing before deciding what colour it is.

**On a page that serves BOTH systems, show both signatures on separate objects and never blend
them into one light.** Spell Properties applies to arcane and mystic spells alike, so a single cyan
glow mis-scopes the page to half its content; the fix is one frame holding two lit things that do
not touch — a library shelf where most lit tablets glow warm and a few glow cyan. A blended or
intermediate hue is the one thing to avoid, because it reads as a third kind of magic that does not
exist.

**When the two must actually collide** — a duel between an arcanist and a priest — say that they
touch at one point only and that neither takes any of the other's colour anywhere. The seam is the
subject, so give each side a different *behaviour* rather than a different tint: cyan splitting into
loose whipping ends where it fails, gold holding as one clean unbroken arc.

## Modesty — non-negotiable, every register

**No erotic or sexualised content, ever.** Historical precedent pushes hard the other way and must
be overridden: Bronze Age dress was frequently topless for both sexes, and the Greek satyr is lewd
by definition in its source material. Neither is a licence. The art is a rulebook illustration,
read by anyone at the table.

- **Both figures fully clothed, chest and torso covered.** No bare midriff, no cleavage, no bare
  chest, on any figure of any gender.
- **No suggestive or sensual posing.** Dynamic and mid-gesture, never a pin-up line.
- **Costume parity between the pair**, as in [art-registers.md](art-registers.md) § Register B —
  the failure mode is a covered male figure beside an under-dressed female one.
- **Carry modesty as a garment description, never as a ban list.** On an instruction-following
  model, listing what to avoid puts it in the picture ([art-prompting.md](art-prompting.md) § Know
  which kind of model you are prompting). "A heavy wool mantle wrapped over one shoulder and across
  the chest" is the whole mechanism: it leaves nothing uncovered and names nothing you don't want.

This outranks setting authenticity. Where the two conflict, cover the figure.

## Presentation

Per the theme's composition rules, art belongs in a **bounded, framed plate** with carved edges and
its own keyline, with words on stone beside or beneath it. Never a translucent panel floating over a
photograph, and never art bled to the full page width with text laid on top. The frame is what makes
an image read as an inlaid plate rather than a hero image.
