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
					'&.Mui-expanded': {
						margin: '0 !important',
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
