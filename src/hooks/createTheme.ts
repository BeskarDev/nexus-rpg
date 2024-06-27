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
				// add the whitespace for empty helperText even if helperText is undefined
				// drawback: empty helperText will still remove the created whitespace.
				helperText: ' ',
				margin: 'dense',
				size: 'medium',
				variant: 'outlined',
			},
		},
	},
})
