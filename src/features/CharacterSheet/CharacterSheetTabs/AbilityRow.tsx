import { Box, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'

import { Delete } from '@mui/icons-material'

export type AbilityRowProps = {
	ability: string
	updateAbility: (update: string) => void
	deleteAbility: () => void
}

export const AbilityRow: React.FC<AbilityRowProps> = ({
	ability: initialAbility,
	updateAbility,
	deleteAbility,
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
				sx={{ maxWidth: '25rem' }}
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
