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
						color: 'white',
						['-webkit-text-fill-color']: 'white',
					},
				},
			},
		},
		MuiAccordion: {
			styleOverrides: {
				root: {
					height: 'fit-content',
					borderRadius: 4,
					boxShadow: 'none !important',
					marginTop: '16px !important',
					'&.Mui-expanded': {
						boxShadow: 'none !important',
						marginBottom: '16px !important',
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
					margin: '0 !important',
					paddingTop: '6px',
					minHeight: '52px',
					'&.Mui-expanded': {
						margin: '0 !important',
						minHeight: '52px',
					},
				},
				content: {
					margin: '0 !important',
					'&.Mui-expanded': {
						margin: '0 !important',
					},
				},
			},
		},
	},
})
