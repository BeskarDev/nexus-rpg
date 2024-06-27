import { FavoriteBorder, Favorite } from '@mui/icons-material'
import { Checkbox, CheckboxProps } from '@mui/material'
import React from 'react'

export const WoundCheckbox: React.FC<CheckboxProps> = (props) => (
	<Checkbox
		icon={<FavoriteBorder />}
		checkedIcon={<Favorite color="error" />}
		{...props}
	/>
)
