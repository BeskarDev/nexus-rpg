# The printed card — a second surface with its own laws

The 63 × 88mm cards (spells, combat arts, magic items, creatures) are the codex theme rendered
**in ink on paper**. Most of the screen rules still hold — flat, keyline, no bar as a grouping
device, marks from the existing kit — but paper changes what the rules are *for*, and four of them
invert outright.

Read this before touching anything under `src/components/PlayingCard.tsx`,
`src/components/playingCardStyles.css`, or a `*PrintCard` / `*Card` under `src/features/*/`.

## What changes on paper

| Screen | Paper | Why |
|---|---|---|
| Bronze on stone | **Ink on paper**, one colour | `.pc-card` rebinds the theme's colour tokens to `--pc-ink` / `--pc-paper`. Nothing has a hue to spend. |
| Wash to group | **Keyline to group** | A wash at 5.5pt is a grey smudge, and a mono printer or photocopier flattens it. |
| `rem` sizes off a type scale | **Points, from `print-codex.css`** | A reader's browser font size means nothing to a printer. Every size on a card is a `--pc-text-*` token. |
| A mark decorates the label | **A mark REPLACES the label** | At micro sizes the words TARGET and RANGE cost more of a 53mm measure than the values they name, and they repeat on every card in the deck. Keep the word as `srOnly` text. |

**Constraint that outranks aesthetics: no printed fact may depend on a wash, a hue or a fill to be
read.** Emphasis by fill is fine — Elite, Lord and Supreme ink their tag solid — as long as the
WORD carries the fact and a flattened copy loses only the emphasis.

## The vocabulary

Four devices, each a different kind of object. Picking the wrong one is the mistake to watch for,
because at 5.5pt anything rectangular looks like anything else rectangular.

| Device | Component | Shape | Says |
|---|---|---|---|
| Classification tag | `codex/CardTag` | pointed banner (hexagon) | what this card IS — `T2 Elite`, `Supreme`, `2/2` |
| Slab | `.pc-slab` in `.pc-slabs` | plain keyline rectangle | one item of a LIST — a spell property, a weapon an art applies to |
| Focus boss | `codex/FocusToken` | concentric lozenge | a single headline number, seated in the card's corner |
| Divider | `codex/CardDivider` | hairline, hollow lozenge, hairline | a break between sections of a body |

Three shapes were tried for the tag before the banner: a keyline rectangle (indistinguishable from
a slab), a nameplate ruled top and bottom with end bars (a rectangle with slightly different
proportions), and the same with the rules removed. **The lesson generalises: two devices are only
distinct on paper if their SILHOUETTES differ.** Pointed against flat survives a photocopier;
1.5px of extra padding does not.

A clipped silhouette **cannot take a border**, so a keyline banner is three elements: an ink
silhouette, the paper inset a hairline over it, and the label above both. Same construction as the
site's plugin chips. Never reach for a shadow to fake the edge.

## Layout laws the autofit imposes

Card bodies are sized by a measured binary search (`src/components/autofit/`). It reads the
content's box and shrinks the type until it fits. **That contract constrains what a card's markup
may contain**, and breaking it does not look like a styling bug — it looks like the engine is
broken, or like the content is too long.

1. **Nothing in the measured box may be fixed-width.** A `white-space: nowrap` name longer than the
   measure, a header bleeding past its padding with a negative margin, a flex child without
   `min-width: 0` — each overflows horizontally at *every* type size, so the search correctly
   reports "fits at no size" and the card is flagged as content over budget.
2. **Rows must be allowed to wrap.** A wrapped row turns a width problem into a height problem,
   which is the axis type size can actually pay for. A CSS grid with a fixed column count cannot
   wrap; use flex with `flex-wrap` for anything that might not fit.
3. **A row that wraps must wrap BETWEEN its cells, never inside one.** A cell wrapping its own
   value stacked `vs.` above `Resist` and turned two facts into five lines.
4. **Nothing may shrink.** `.pc-card__content > * { flex: 0 0 auto }`. A flex item's default
   `flex-shrink: 1` lets an over-long paragraph squash below its content height and clip its own
   text, which the container never sees.
5. **Leading is unitless**, so it scales with the fitted size.
6. **Header furniture is not fitted.** Only the body shrinks, so anything in the head must fit at
   its own fixed size on the narrowest card in the deck.

An ornament that sits in the content column costs the rules text height on every card in the deck.
`PlayingCard`'s `badge` slot places a mark absolutely in the corner instead — inside the deckle's
cut allowance, so the guillotine cannot take a corner off it.

## Verification

- **The browser is not the printer.** Chrome rasterizes a PDF at its own resolution with its own
  hinting and its own rounding of every line box, so a body that fits the preview by a hair takes
  one line more on paper. The autofit demands a full line of slack for exactly this reason. When
  something prints wrong but previews right, suspect this before suspecting the cascade — and check
  the print stylesheet second, not first.
- **Geometry, overflow and text loss are mechanical**: measure them in the DOM (`getBoundingClientRect`
  on the content against its box, and the same for width) rather than judging by eye.
- **Whether it LOOKS right is the owner's call**, and on paper it is a PDF measurement, never a
  preview screenshot.

## Density

A card is the densest surface in the project. Every millimetre spent on ornament is taken from
rules text, and the exchange rate is measurable: the deck reports how many continuation cards it
prints, so a change's cost is a number rather than an opinion. Quote it when proposing one —
"the diamond divider costs 13 cards across the spell deck" is a design argument; "it looks better"
is half of one.

## A card is the CONTENT, not the reader's state

Owner ruling, M20 D5. The ability deck first trimmed each talent to the rank its character had
bought, on a measurement that is real — the median talent drops from 637 characters to 204, which is
the difference between a card at the type floor and a card at reading size, and the longest talent
goes from two cards to one.

It was still wrong. **Which ranks a character has unlocked is a fact about the CHARACTER, and the
character sheet is where it belongs. A talent card is the talent.** A card that omits rank 3
misstates what the talent does, and it expires the next time the player spends XP — a printed deck
should survive the session it was cut for.

Generalise it before reaching for the same saving elsewhere: **a card states its subject in full;
anything true only of one reader at one moment belongs on the sheet.** Where the trim is genuinely
wanted (a player who wants a lean deck of what they can use today) it is an opt-in control, never the
default, and the card still says what span it is printing.

## Controls in the print tools

The tools are screen UI, so the screen theme's rules apply — including the one MUI most often
smuggles past them. **No `Switch`.** A sliding pill with a filled knob is the radius, the colour mass
and the motion that `codex/CheckMark` was drawn to take out of this site's checkboxes (M13 S4d), and
it lands in a control panel that is otherwise all keylines and small caps.

Use `.pt-toggle` in `printToolStyles.css`: a `<label>` around a visually-hidden native checkbox, with
`CheckMarkEmpty` / `CheckMarkChecked` as the state and the focus ring on the socket. Keep the input
focusable — `display: none` takes it out of the tab order and the label stops driving it.

Say what the toggle costs in a `.pt-toggle__note` under the label. A reader should not have to flip a
control that changes what comes out of the printer to find out what it does.

## A lone mark on a card wants a socket

The six `ActionMark` glyphs are deliberately spare — wedges, bars and lozenges authored to hold at
13px in a character-sheet row, where they sit in a column with siblings to be read against. Dropped
loose into a card head next to a 10pt name and a banner tag, the quiet ones (`Free`'s two lozenges,
`Other`'s small diamond) stopped reading as marks and looked like flecks of ink.

The fix is not a bigger glyph. **Set it in a socket** — a hard-cornered keyline plate, which is the
same answer `codex/CheckMark` already gives for the same problem. Use `.pc-action-plate`.

Two things the plate buys beyond contrast:

- **A constant footprint.** `Free` is wide and `Other` is small; loose, they shifted the head's
  baseline from one card to the next. In a fixed plate every card's head measures the same.
- **A silhouette that is not a slab.** A slab is one item of a LIST and is wide and text-bearing; a
  socket is square and holds one mark. A card carrying both must let the eye separate them by shape
  (the pointed-against-flat lesson above, applied again).

Head furniture is not fitted (layout law 6), so size the plate and its glyph in fixed units — `em`
here would scale with a body size the plate does not live in.
