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
	},
	shape: {
		borderRadius: 4,
	},
	components: {
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
		MuiInputLabel: {
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
		MuiInput: {
			styleOverrides: {
				underline: {
					'&.MuiInputBase-sizeSmall': {
						paddingBottom: '6px',
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
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
