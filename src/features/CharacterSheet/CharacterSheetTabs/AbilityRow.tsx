import { Box, IconButton, TextField, TextFieldProps } from '@mui/material'
import React, { useState } from 'react'

import { Delete } from '@mui/icons-material'

export type AbilityRowProps = {
	ability: string
	updateAbility: (update: string) => void
	deleteAbility: () => void
} & TextFieldProps

export const AbilityRow: React.FC<AbilityRowProps> = ({
	ability: initialAbility,
	updateAbility,
	deleteAbility,
	...props
}) => {
	const [ability, setAbility] = useState(initialAbility)

	return (
		<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
			<TextField
				multiline
				minRows={1}
				maxRows={5}
				value={ability}
				onChange={(event) => setAbility(event.target.value)}
				onBlur={() => updateAbility(ability)}
				{...props}
				sx={{ maxWidth: '25rem', ...props.sx }}
			/>
			<IconButton
				size="small"
				edge="end"
				aria-label="delete"
				onClick={deleteAbility}
			>
				<Delete />
			</IconButton>
		</Box>
	)
}
