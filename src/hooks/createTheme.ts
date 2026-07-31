import type { CssVarsThemeOptions } from '@mui/material/styles'

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
	shape: {
		borderRadius: 4,
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
					borderRadius: '2px 2px 0 0',
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
		// M9 S8 — dialogs become tablets: an outer bronze keyline plus an inset
		// engraved hairline (the double edge of a carved slab). `outline` with a
		// negative offset is the sanctioned second keyline, so this stays flat —
		// no pillars, no cornices. The kit's `TabletFrame` was NOT wrapped around
		// each dialog: it is a React surround with side pillars, deliberately for
		// stand-alone display surfaces, and 21 call sites is a component sweep
		// where a theme override reaches all of them.
		MuiDialog: {
			styleOverrides: {
				paper: {
					boxShadow: 'none',
					borderRadius: 2,
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
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					borderRadius: 2,
					fontFamily: 'var(--nexus-font-ui)',
					fontSize: 'var(--nexus-text-xs)',
				},
			},
		},
		// M13 S3.5 — the interactive floor, applied at the component layer so it
		// reaches all 125 IconButton call sites and the embedded doc tools without
		// an `sx` edit anywhere. `--nexus-target` is 24px on a mouse and 44px under
		// `pointer: coarse` (custom.css).
		MuiIconButton: {
			styleOverrides: {
				root: {
					borderRadius: 2,
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
		MuiCheckbox: {
			styleOverrides: {
				root: {
					minWidth: 'var(--nexus-target)',
					minHeight: 'var(--nexus-target)',
					borderRadius: 2,
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
					borderRadius: 2,
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
							primary: 'var(--nexus-bronze)',
							secondary: 'var(--nexus-bronze)',
						}[ownerState.color ?? 'primary'] ?? 'var(--nexus-bronze)',
				}),
			},
		},
		MuiTextField: {
			defaultProps: {
				InputLabelProps: { shrink: true },
				fullWidth: true,
				margin: 'dense',
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
					backgroundColor:
						'color-mix(in srgb, var(--nexus-bronze) 7%, transparent)',
					border:
						'1px solid color-mix(in srgb, var(--nexus-bronze) 30%, transparent)',
					fontFamily: 'var(--nexus-font-ui)',
					// Numerals line up in a column of fields — a skill list, a
					// calculator's parts — which they cannot do in proportional figures.
					fontVariantNumeric: 'tabular-nums',
					'&:hover:not(.Mui-disabled)': {
						borderColor: 'color-mix(in srgb, var(--nexus-bronze) 55%, transparent)',
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
					color: 'var(--nexus-bronze)',
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
					// The notched fieldset was only ever the receptacle for a floating
					// label. With the label static there is nothing to notch.
					'& .MuiOutlinedInput-notchedOutline': { display: 'none' },
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
				icon: {
					right: 4,
					color: 'var(--nexus-bronze)',
					fontSize: '1rem',
				},
			},
		},
		MuiAccordion: {
			styleOverrides: {
				root: {
					height: 'fit-content',
					borderRadius: 4,
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
