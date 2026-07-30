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
		fontSize: 13,
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
		MuiIconButton: {
			styleOverrides: {
				root: {
					borderRadius: 2,
					'&.Mui-focusVisible': {
						outline: '1.5px solid var(--nexus-bronze)',
						outlineOffset: '-1.5px',
					},
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor: 'color-mix(in srgb, var(--nexus-bronze) 25%, transparent)',
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
					backgroundColor: 'color-mix(in srgb, var(--nexus-bronze) 18%, transparent)',
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
		MuiInputBase: {
			styleOverrides: {
				root: {
					backgroundColor: 'transparent',
				},
				input: {
					'&.Mui-disabled': {
						color: 'var(--mui-palette-text-primary)',
						WebkitTextFillColor: 'var(--mui-palette-text-primary)',
					},
				},
			},
			variants: [
				{
					props: { size: 'small' },
					style: {
						fontSize: 12,
					},
				},
			],
		},
		// M9 S5 (D1): the label is a small-caps cartouche tag. `shrink` is safe to
		// target unconditionally because MuiTextField's defaultProps above force
		// `InputLabelProps: { shrink: true }` sitewide — every label in the sheet
		// is always in the shrunk position, never floating over the value.
		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontFamily: 'var(--nexus-font-ui)',
				},
				shrink: {
					fontVariant: 'small-caps',
					fontSize: 'var(--nexus-text-2xs)',
					letterSpacing: '0.04em',
				},
			},
			variants: [
				{
					props: { size: 'small' },
					style: {
						top: 3,
						fontSize: 12,
					},
				},
			],
		},
		// M9 S5 (D1, F4): kills the floating-label-plus-underline pattern by
		// giving every field the SAME rest state regardless of MUI `variant`
		// (both "standard" and "outlined" are in live use across the sheet) —
		// transparent fill, a flat bronze-tinted baseline, no box. Focus is a
		// full bronze keyline, not a shadow (flat, always).
		MuiInput: {
			styleOverrides: {
				root: {
					backgroundColor: 'transparent',
				},
				underline: {
					'&.MuiInputBase-sizeSmall': {
						paddingBottom: '6px',
					},
					'&:before': {
						borderBottom:
							'1px solid color-mix(in srgb, var(--nexus-bronze) 35%, transparent)',
					},
					'&:hover:not(.Mui-disabled):before': {
						borderBottom:
							'1px solid color-mix(in srgb, var(--nexus-bronze) 60%, transparent)',
					},
					'&.Mui-disabled:before': {
						borderBottomStyle: 'solid',
						borderBottom:
							'1px solid color-mix(in srgb, var(--nexus-bronze) 15%, transparent)',
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: 0,
					backgroundColor: 'transparent',
					'& .MuiOutlinedInput-notchedOutline': {
						border: 'none',
						borderRadius: 0,
						borderBottom:
							'1px solid color-mix(in srgb, var(--nexus-bronze) 35%, transparent)',
					},
					'&:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline': {
						borderBottom:
							'1px solid color-mix(in srgb, var(--nexus-bronze) 60%, transparent)',
					},
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						border: '1.5px solid var(--nexus-bronze)',
					},
					'&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
						border: 'none',
						borderBottom:
							'1px solid color-mix(in srgb, var(--nexus-bronze) 15%, transparent)',
					},
				},
				input: {
					'&.Mui-disabled': {
						color: 'var(--mui-palette-text-primary)',
						WebkitTextFillColor: 'var(--mui-palette-text-primary)',
					},
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
