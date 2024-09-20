import { styled, TextField, TextFieldProps } from '@mui/material'
import React from 'react'

export const RoundTextField = styled(TextField)({
	maxWidth: '3rem',
	'& .MuiOutlinedInput-root': {
		'& .MuiOutlinedInput-notchedOutline': {
			borderWidth: '2px',
			borderColor: 'var(--mui-palette-text-primary)',
		},
	},
})
RoundTextField.defaultProps = {
	size: 'medium',
	inputProps: {
		sx: {
			textAlign: 'center',
			py: 1.5,
			px: 1,
		},
	},
	InputProps: {
		sx: {
			borderRadius: '4rem',
		},
	},
	InputLabelProps: {
		sx: {
			maxWidth: '100%',
			left: -10,
			top: -1,
			overflow: 'visible',
		},
	},
	FormHelperTextProps: {
		sx: {
			textAlign: 'center',
			mx: 0,
		},
	},
}
