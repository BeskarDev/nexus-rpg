import { createElement } from 'react'
import type { CssVarsThemeOptions } from '@mui/material/styles'
import {
	CheckMarkChecked,
	CheckMarkEmpty,
	CheckMarkIndeterminate,
} from '@site/src/components/codex/CheckMark'

/**
 * MUI theme options for the character sheet + embedded doc tools.
 *
 * This is a plain options object (not a built theme) consumed by
 * `experimental_extendTheme(theme)` in each feature wrapper, so the CSS-vars
 * provider generates both color schemes. `ThemeSwitcher` calls MUI's
 * `setMode(colorMode)` to follow the Docusaurus color mode.
 *
 * Palette values mirror the M2a --nexus-* tokens (bronze accent, parchment /
 * obsidian surfaces). They are duplicated here as literals rather than read
 * from CSS vars because MUI must parse real colors to derive hover/contrast
 * variants. Keep these in sync with the token block in custom.css.
 */
export const theme: CssVarsThemeOptions = {
	colorSchemes: {
		light: {
			palette: {
				primary: { main: '#8a5a2b' }, // aged bronze
				background: { default: '#f2eadc', paper: '#f7f0e4' }, // parchment / cream surface
				text: { primary: '#2f2418' }, // reading ink
			},
		},
		dark: {
			palette: {
				primary: { main: '#c9975a' }, // ember bronze
				background: { default: '#16120f', paper: '#211a15' }, // obsidian / smoky surface
				text: { primary: '#eadfcd' }, // warm bone
			},
		},
	},
	typography: {
		fontFamily: "'Alegreya Sans', Arial, sans-serif",
		// M13 S3.5 (D4): back to MUI's own default. `13` was a global x0.93 on
		// every rem-derived size in the app — set once, never revisited, and the
		// hidden factor under every "this looks small" judgement since. The sheet is
		// read at a table, often on a phone, often while something else has the
		// player's attention; 7.7% is free legibility across every tab and every
		// embedded doc-page tool.
		fontSize: 14,
		// M9 S2: h6 is the sheet's section/dialog-title variant (CharacterList,
		// CharacterSheetHeader, MagicItemBuilder dialogs, SharedNotes) — never
		// field content — so it takes the display serif like a doc card title.
		h6: {
			fontFamily: 'var(--nexus-font-display)',
		},
	},
	// S4d — no rounded corners anywhere. This is MUI's DEFAULT radius, inherited by
	// every component nobody has overridden yet, which is why stragglers kept turning
	// up one screenshot at a time (the outlined slot, the expanding row, the icon
	// plates). Carved stone has hard vertices; a component that wants a soft edge now
	// has to ask for one explicitly.
	shape: {
		borderRadius: 0,
	},
	components: {
		// M9 S2 — flat keylines everywhere, no shadows/bevels/gloss. This block
		// is the theme lever: one declaration per component reaches every
		// instance across 107 files without an `sx` edit (see F7).
		MuiPaper: {
			styleOverrides: {
				root: {
					// Kill MUI's tonal-overlay elevation gradient and drop shadow —
					// every Paper-based surface (Dialog, Accordion, ad-hoc cards) goes
					// flat instead of skeuomorphic.
					backgroundImage: 'none',
					boxShadow: 'none',
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					// No radius on chips (D2/S2): a chip is a cartouche tag, not a
					// rounded pill.
					borderRadius: 0,
				},
				label: {
					fontFamily: 'var(--nexus-font-ui)',
					fontSize: 'var(--nexus-text-2xs)',
					fontVariant: 'small-caps',
					letterSpacing: '0.03em',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					// M13 S3.5 — the interactive floor (see MuiIconButton).
					minHeight: 'var(--nexus-target)',
					boxShadow: 'none',
					textTransform: 'none',
					fontWeight: 600,
					letterSpacing: '0.02em',
					'&:hover': { boxShadow: 'none' },
					'&:active': { boxShadow: 'none' },
				},
			},
		},
		// M9 S8 — tabs match the doc surface. Infima's `.tabs__item--active` (M8
		// S10) marks the active tab with a wash plus an inset keyline, NOT a bar;
		// MUI's stock 2px indicator is the same "underline as grouping device"
		// move the sheet spent S5 removing. Indicator off, wash + keyline on, so
		// a doc tab and a sheet tab read as the same control.
		// MUI tabs are still in use — the character-creation dialog and the creature
		// builder both have one — so these overrides stay. The SHEET's tab bar is no
		// longer among them: it is `SheetTabBar`, a rail of nameplates that knows when
		// it overflows (M13 S4e). This block is what keeps the remaining two from
		// looking Material; do not delete it on the assumption the sheet was the only
		// consumer, which is what the first pass at S4e assumed.
		MuiTabs: {
			styleOverrides: {
				root: {
					minHeight: 36,
				},
				indicator: {
					display: 'none',
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					minHeight: 36,
					textTransform: 'none',
					fontFamily: 'var(--nexus-font-ui)',
					fontWeight: 600,
					letterSpacing: '0.03em',
					borderRadius: 0,
					'&.Mui-selected': {
						backgroundColor:
							'color-mix(in srgb, var(--nexus-bronze) 10%, transparent)',
						outline:
							'1.5px solid color-mix(in srgb, var(--nexus-bronze) 45%, transparent)',
						outlineOffset: '-1.5px',
					},
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					boxShadow: 'none',
					borderRadius: 0,
					border: '1px solid var(--nexus-bronze)',
					outline:
						'1px solid color-mix(in srgb, var(--nexus-bronze) 30%, transparent)',
					outlineOffset: '-4px',
				},
			},
		},
		// The tablet's inscribed band. Display serif is already on `h6`, which is
		// DialogTitle's default variant, so this adds the band, not the type.
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					backgroundColor:
						'color-mix(in srgb, var(--nexus-bronze) 8%, transparent)',
					borderBottom:
						'1px solid color-mix(in srgb, var(--nexus-bronze) 30%, transparent)',
					letterSpacing: '0.03em',
				},
			},
		},
		MuiDialogActions: {
			styleOverrides: {
				root: {
					borderTop:
						'1px solid color-mix(in srgb, var(--nexus-bronze) 20%, transparent)',
				},
			},
		},
		// M13 S4d — a menu is a small carved panel, not a floating Material card.
		//
		// `MuiPaper` already killed the elevation gradient and the shadow, which left
		// a rounded rectangle of surface colour with no edge at all: it read as a hole
		// rather than as a panel. One keyline and hard corners give it an edge. The
		// inset second keyline is NOT used here — that is the Dialog's rank marker,
		// and a menu is subordinate to the control that opened it.
		MuiMenu: {
			styleOverrides: {
				paper: {
					borderRadius: 0,
					border:
						'1.5px solid color-mix(in srgb, var(--nexus-bronze) 45%, transparent)',
				},
				list: { paddingTop: 4, paddingBottom: 4 },
			},
		},
		// A row in that panel: hard corners, a bronze wash on hover rather than
		// MUI's grey tonal fill, and the interactive floor as its height.
		MuiMenuItem: {
			styleOverrides: {
				root: {
					borderRadius: 0,
					minHeight: 'var(--nexus-target)',
					gap: 8,
					// A menu row is CHROME, so it takes the UI face at the dense step. It
					// was Infima's reading serif at body size — the register the sheet's
					// prose is in — which is why a four-row config menu read as four
					// sentences rather than as a set of switches.
					fontFamily: 'var(--nexus-font-ui)',
					fontSize: 'var(--nexus-text-dense)',
					'&:hover': {
						backgroundColor:
							'color-mix(in srgb, var(--nexus-bronze) 10%, transparent)',
					},
					'&.Mui-selected, &.Mui-selected:hover': {
						backgroundColor:
							'color-mix(in srgb, var(--nexus-bronze) 16%, transparent)',
					},
					// A row that carries its own checked state inks its mark from that
					// state. `CheckMark` draws in `currentColor`, and a menu row's colour
					// is the reading ink, so without this a SET inlay would be bone-white.
					// One rule here rather than an `sx` per call site — that `sx` was the
					// last piece of this menu's styling still living in the feature.
					'&[aria-checked="true"] .cs-check-mark': {
						color: 'var(--cs-bronze-ink, var(--nexus-bronze))',
					},
					'&[aria-checked="false"] .cs-check-mark': {
						color:
							'color-mix(in srgb, var(--nexus-bronze) 55%, var(--ifm-font-color-base))',
						opacity: 0.7,
					},
				},
			},
		},
		// The caption that says what a menu's rows are FOR — the same small-caps
		// bronze register the ledger's column header and the meta band's labels use,
		// so a menu opens with a heading instead of with an unexplained list.
		MuiListSubheader: {
			styleOverrides: {
				root: {
					backgroundColor: 'transparent',
					fontFamily: 'var(--nexus-font-ui)',
					fontSize: 'var(--nexus-text-2xs)',
					fontWeight: 700,
					fontVariantCaps: 'small-caps',
					letterSpacing: '0.06em',
					lineHeight: 1.6,
					color: 'var(--cs-bronze-ink, var(--nexus-bronze))',
				},
			},
		},
		// A checkbox's or radio's own label. It was Infima's reading serif at body
		// size, which is the register the sheet's PROSE is in — so a four-row config
		// menu read like four sentences. The UI face at the dense step is what every
		// other label on the sheet uses, and the gap is stated here rather than left
		// to MUI's 11px default so a drawn 18px mark sits at a deliberate distance
		// from the words it names.
		MuiFormControlLabel: {
			styleOverrides: {
				root: { marginLeft: 0, marginRight: 0, gap: 6 },
				label: {
					fontFamily: 'var(--nexus-font-ui)',
					fontSize: 'var(--nexus-text-dense)',
					lineHeight: 1.3,
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					borderRadius: 0,
					fontFamily: 'var(--nexus-font-ui)',
					fontSize: 'var(--nexus-text-xs)',
				},
			},
		},
		// M13 S3.5 — the interactive floor, applied at the component layer so it
		// reaches all 125 IconButton call sites and the embedded doc tools without
		// an `sx` edit anywhere. `--nexus-target` is 24px on every pointer since S4d
		// dropped the touch step (see custom.css for why).
		MuiIconButton: {
			styleOverrides: {
				root: {
					// S4d: no radius anywhere in the chrome.
					borderRadius: 0,
					minWidth: 'var(--nexus-target)',
					minHeight: 'var(--nexus-target)',
					'&.Mui-focusVisible': {
						outline: '1.5px solid var(--nexus-bronze)',
						outlineOffset: '-1.5px',
					},
				},
			},
		},
		// A checkbox is the smallest control on the sheet — the attribute wound
		// boxes measured 13x13 and the resource pips 18x18. The MARK stays the size
		// it is (a pip is a glyph, and growing it would change the plate's
		// composition); the padding grows the TARGET around it. That separation is
		// the whole trick of this slice: a control can become tappable without the
		// list it sits in becoming taller, because the padding overlaps the row's
		// existing leading.
		// M13 S4d — the drawn checkbox, levelled here so EVERY checkbox in the app
		// gets it: the sheet's config menus, the doc tools' filter lists, anything
		// added later. MUI's default was a rounded square that fills with primary and
		// carries a white Material tick; see `CheckMark` for why all three of those
		// are wrong on carved stone. `SigilPip` passes its own icons and is unaffected
		// — a pip row is a resource track, not a set of choices.
		MuiCheckbox: {
			defaultProps: {
				icon: createElement(CheckMarkEmpty),
				checkedIcon: createElement(CheckMarkChecked),
				indeterminateIcon: createElement(CheckMarkIndeterminate),
				// A ripple is a Material motion idiom; the mark's own state change is the
				// feedback here, and the hover wash below is the rest of it.
				disableRipple: true,
			},
			styleOverrides: {
				root: {
					minWidth: 'var(--nexus-target)',
					minHeight: 'var(--nexus-target)',
					// Hard vertices, like every other control on the site. The 2px radius
					// was the last rounded corner in the sheet's chrome.
					borderRadius: 0,
					// The hover state is a wash on the socket's own square, not a circle
					// around it — MUI's default is a round translucent puck, which is a
					// second shape appearing behind a hard-cornered mark.
					'&:hover': {
						backgroundColor:
							'color-mix(in srgb, var(--nexus-bronze) 12%, transparent)',
					},
					'&.Mui-focusVisible': {
						outline: '1.5px solid var(--nexus-bronze)',
						outlineOffset: '-1.5px',
					},
				},
			},
		},
		MuiSwitch: {
			styleOverrides: {
				switchBase: {
					minWidth: 'var(--nexus-target)',
					minHeight: 'var(--nexus-target)',
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor:
						'color-mix(in srgb, var(--nexus-bronze) 25%, transparent)',
				},
			},
		},
		// S7: the five meters become carved gauges — a flat keyline track plus a
		// flat fill in the semantic ink, never MUI's stock Material-primary
		// green/blue/orange/red (F6). `color` stays the prop each meter already
		// passes (success/warning/error/info); only the rendered fill changes.
		MuiLinearProgress: {
			styleOverrides: {
				root: {
					borderRadius: 0,
					backgroundColor:
						'color-mix(in srgb, var(--nexus-bronze) 18%, transparent)',
				},
				// `bar` covers the layered bar1/bar2 fill elements for every variant.
				bar: ({ ownerState }: { ownerState: { color?: string } }) => ({
					backgroundColor:
						{
							success: 'var(--cs-success)',
							warning: 'var(--cs-warning)',
							error: 'var(--cs-danger)',
							info: 'var(--cs-info)',
							primary: 'var(--cs-bronze-ink, var(--nexus-bronze))',
							secondary: 'var(--cs-bronze-ink, var(--nexus-bronze))',
						}[ownerState.color ?? 'primary'] ?? 'var(--nexus-bronze)',
				}),
			},
		},
		MuiTextField: {
			defaultProps: {
				InputLabelProps: { shrink: true },
				fullWidth: true,
				/*
					`margin: 'dense'` is gone (M13 S10, measured in the running app).

					M13 planned to reconsider it here because S4d and S5 each paid for it
					with a local `m: 0` (`metaBandInputSx`, `LocationLoadDisplay`,
					`AdjustStepper`) — the 8px above and 4px below are meant for a field
					with a stacked floating label, which this sheet's static-label slot
					does not have.

					Measuring first found the answer had already changed: every dense
					field on the sheet computes `margin: 0` today, because the S3 slot
					rebuild replaced MUI's field root wholesale. The prop was inert — it
					advertised spacing nothing received, and the three local patches were
					fighting a rule that no longer fires. Removing it changes no computed
					margin (verified in the browser, both themes, all six tabs).
				*/
				size: 'medium',
				variant: 'outlined',
			},
		},
		// ── The slot ────────────────────────────────────────────────────────────
		// M13 S3 (owner review round 3). Every input on the sheet and in the
		// embedded doc tools is now an INSCRIBED SLOT: a shallow bronze-keylined
		// recess with a flat wash, no radius, and a small-caps label sitting above
		// it on its own line.
		//
		// M9 S5 went the other way — it stripped the box and left a single engraved
		// baseline, on the theory that less chrome is more codex. In use that read
		// as an underlined blank rather than as a place a value belongs, and it
		// kept MUI's floating-label machinery alive underneath (the notch, the
		// `translate(14px, -9px) scale(0.75)`, the reserved overlay space), which is
		// what still made a field look like a form control in a row of stamps.
		//
		// The slot answers both: it is a real container, so the value has somewhere
		// to sit; and the label is STATIC, so none of the overlay geometry is left
		// to leak. Flat throughout — a keyline and a wash, never an inset bevel.
		MuiInputBase: {
			styleOverrides: {
				root: {
					borderRadius: 0,
					// M13 S3.5 — a slot is a tap target too. It measured 21px tall, which
					// is not something you hit on a phone while reading a spell aloud.
					minHeight: 'var(--nexus-target)',
					// M13 S4b: the sheet's fields read at the dense scan size, not at
					// MUI's 1rem. `medium` is the sitewide default size and it was
					// inheriting the browser's 16px, so every unlabelled-size field on
					// the sheet was a step larger than the text around it.
					fontSize: 'var(--nexus-text-dense)',
					backgroundColor:
						'color-mix(in srgb, var(--nexus-bronze) 7%, transparent)',
					border:
						'1px solid color-mix(in srgb, var(--nexus-bronze) 30%, transparent)',
					fontFamily: 'var(--nexus-font-ui)',
					// Numerals line up in a column of fields — a skill list, a
					// calculator's parts — which they cannot do in proportional figures.
					fontVariantNumeric: 'tabular-nums',
					'&:hover:not(.Mui-disabled)': {
						borderColor:
							'color-mix(in srgb, var(--nexus-bronze) 55%, transparent)',
					},
					// Focus is the sanctioned inset second keyline rather than a wider
					// border, so nothing reflows by half a pixel on focus.
					'&.Mui-focused': {
						borderColor: 'var(--nexus-bronze)',
						outline: '1.5px solid var(--nexus-bronze)',
						outlineOffset: '-1.5px',
					},
					'&.Mui-error': {
						borderColor: 'var(--cs-danger)',
					},
					// A derived part is shown, not offered. It keeps the slot's outline
					// so the row still reads as a row of slots, but loses the wash —
					// there is nothing to fill in.
					'&.Mui-disabled': {
						backgroundColor: 'transparent',
						borderColor:
							'color-mix(in srgb, var(--nexus-bronze) 15%, transparent)',
					},
				},
				input: {
					padding: '3px 8px',
					// M13 S3.5: the `<input>` fills its slot rather than sitting centred
					// inside it at content height. Purely a HIT AREA change — the slot's
					// rendered size is identical, but a tap 3px below the digits now
					// lands on the field instead of on nothing. The audit measures the
					// input element, and it was the last thing under the floor.
					//
					// `height: auto` is load-bearing: MUI sets `height: 1.4375em` on the
					// input, and an explicit height beats `align-self: stretch`, so the
					// stretch alone changed nothing.
					alignSelf: 'stretch',
					height: 'auto',
					'&.Mui-disabled': {
						color: 'var(--mui-palette-text-primary)',
						WebkitTextFillColor: 'var(--mui-palette-text-primary)',
					},
				},
				inputMultiline: {
					padding: 0,
				},

				multiline: {
					padding: '4px 8px',
				},
			},
			variants: [
				{
					// `small` is a TYPE step, not a target step (M13 S3.5). It keeps the
					// denser type and padding that 173 call sites asked for, and does not
					// shrink the box below the floor — which is what `small` had been
					// silently doing everywhere it was used.
					props: { size: 'small' },
					style: {
						fontSize: 'var(--nexus-text-xs)',
						'& .MuiInputBase-input': { padding: '2px 6px' },
					},
				},
			],
		},
		// M13 S3: the label leaves the box entirely.
		//
		// It was a `shrink`-positioned overlay — absolutely positioned, scaled to
		// 0.75, translated up over the border, with a notch cut in the outline to
		// receive it. All of that machinery exists to animate a placeholder into a
		// label, an interaction this sheet does not have (every label is forced
		// `shrink` sitewide). Static, it is simply a small-caps bronze caption on
		// the line above its slot, which is how a label behaves on a carved tablet.
		MuiInputLabel: {
			styleOverrides: {
				root: {
					position: 'static',
					transform: 'none',
					maxWidth: '100%',
					marginBottom: '2px',
					fontFamily: 'var(--nexus-font-ui)',
					fontVariant: 'small-caps',
					fontSize: 'var(--nexus-text-2xs)',
					fontWeight: 700,
					letterSpacing: '0.06em',
					lineHeight: 1,
					color: 'var(--cs-bronze-ink, var(--nexus-bronze))',
					// MUI recolours a focused label to the palette primary and an
					// errored one to red. Bronze IS the primary here, and the slot's own
					// keyline already carries both states, so the label holds still.
					'&.Mui-focused': { color: 'var(--nexus-bronze)' },
					'&.Mui-error': { color: 'var(--nexus-bronze)' },
					'&.Mui-disabled': {
						color: 'color-mix(in srgb, var(--nexus-bronze) 55%, transparent)',
					},
				},
			},
		},
		// Both variants keep their own decoration OFF: the slot lives on
		// `MuiInputBase` so that every input — outlined, standard, select,
		// multiline — is one shape. Standard and outlined are both in live use
		// across the sheet and must not be told apart.
		MuiInput: {
			styleOverrides: {
				root: {
					padding: 0,
				},

				underline: {
					'&:before, &:after': { display: 'none' },
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					// M13 S4d — the rounded slot, finally fixed. `MuiInputBase.root` has
					// said `borderRadius: 0` since S3, and every outlined field on the
					// sheet was rendering with MUI's 4px radius anyway: both overrides are
					// single-class selectors, so RULE ORDER decides, and MUI's own
					// OutlinedInput styles are emitted after ours. Restating it at the
					// class that actually applies is the same trick the `input` padding
					// below needed for the same reason.
					borderRadius: 0,
					// The notched fieldset was only ever the receptacle for a floating
					// label. With the label static there is nothing to notch.
					'& .MuiOutlinedInput-notchedOutline': { display: 'none' },
				},
				// M13 S4b: MUI's own `MuiOutlinedInput-input` padding is `16.5px 14px`
				// and it beats the `MuiInputBase-input` rule above on specificity — so
				// the slot's declared 3px padding was being ignored on every outlined
				// field, and a details panel of them was 58px per row. This is the same
				// declaration, at the specificity that actually applies.
				input: {
					padding: '3px 8px',
				},
			},
		},

		MuiFormHelperText: {
			styleOverrides: {
				root: {
					marginLeft: 0,
					marginRight: 0,
					fontFamily: 'var(--nexus-font-ui)',
					fontSize: 'var(--nexus-text-2xs)',
				},
			},
		},
		// The caret is toned into the slot rather than replaced. Swapping in the
		// sheet's solid `Chevron` needs `defaultProps.IconComponent`, and this is a
		// plain options module with no JSX that also feeds the doc-page tools —
		// importing a character-sheet component here inverts the layering. Left to
		// M13 S9 with the rest of the icon accounting.
		MuiSelect: {
			styleOverrides: {
				// A select's rendered value is a `div`, not an `input`, so it takes
				// neither of the input padding rules above (M13 S4b).
				select: {
					padding: '3px 8px',
					minHeight: 'auto',
				},
				icon: {
					right: 4,
					color: 'var(--cs-bronze-ink, var(--nexus-bronze))',
					fontSize: '1rem',
				},
			},
		},
		MuiAccordion: {
			styleOverrides: {
				root: {
					height: 'fit-content',
					// Hard vertices (S4d): a ledger row that expands is a panel cut into
					// stone, and 4px was the last radius on the sheet's largest surface.
					borderRadius: 0,
					boxShadow: 'none',
					marginTop: '16px',
					'&.Mui-expanded': {
						boxShadow: 'none',
						marginBottom: '16px',
					},
					'&:before': {
						display: 'none',
					},
				},
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: {
					margin: '0',
					paddingTop: '6px',
					minHeight: '52px',
					'&.Mui-expanded': {
						margin: '0',
						minHeight: '52px',
					},
					// M13 S2 — MUI's stock focus state is a grey `rgba(0,0,0,.12)` fill
					// behind the whole summary, which on obsidian reads as a smudge and
					// on parchment as a selection highlight. Every other focusable
					// surface in this theme (MuiTab, MuiIconButton, SheetField's inputs)
					// answers focus with the same inset bronze keyline; the sheet's
					// most-focused control should not be the exception.
					'&.Mui-focusVisible': {
						backgroundColor: 'transparent',
						outline: '1.5px solid var(--nexus-bronze)',
						outlineOffset: '-1.5px',
					},
				},
				// The disclosure mark is a solid triangle (see `Chevron`), and a solid
				// mass sweeping through 180 degrees on a spring easing is a far louder
				// motion than a hairline chevron doing the same. Flattened to a short
				// linear turn, and removed entirely under reduced motion.
				expandIconWrapper: {
					transition: 'transform 120ms linear',
					'@media (prefers-reduced-motion: reduce)': {
						transition: 'none',
					},
				},
				content: {
					margin: '0',
					'&.Mui-expanded': {
						margin: '0',
					},
				},
			},
		},
	},
}
