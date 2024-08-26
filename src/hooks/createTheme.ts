import { createTheme } from '@mui/material'

export const theme = createTheme({
	typography: {
		fontFamily: "'Exo 2'",
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
						['-webkit-text-fill-color']: 'var(--mui-palette-text-primary)',
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
						['-webkit-text-fill-color']: 'var(--mui-palette-text-primary)',
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
})
