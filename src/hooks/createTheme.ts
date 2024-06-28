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
	},
})
