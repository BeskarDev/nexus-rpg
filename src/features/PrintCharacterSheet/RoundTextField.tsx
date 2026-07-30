import { styled, TextField } from '@mui/material'

/**
 * The print sheet's own rounded field.
 *
 * M9 S11: moved here from the interactive sheet's 00_Statistics folder. The print
 * tool **forks** its field components by owner decision — it gets its own
 * independent rework later (see F9), so nothing in the interactive tool's
 * component base may reach it and vice versa. This was the only field component
 * the two surfaces still shared, and print was already its sole consumer.
 */

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
			top: -2,
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
