import { Box, IconButton, TextField, TextFieldProps } from '@mui/material'
import React, { useState } from 'react'

import { Delete } from '@mui/icons-material'

export type NpcRowProps = {
	description: string
	updateNpc: (update: string) => void
	deleteNpc: () => void
} & TextFieldProps

export const NpcRow: React.FC<NpcRowProps> = ({
	description: initialDescription,
	updateNpc,
	deleteNpc,
	...props
}) => {
	const [description, setDescription] = useState(initialDescription)

	return (
		<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexGrow: 1 }}>
			<TextField
				multiline
				minRows={1}
				maxRows={5}
				value={description}
				onChange={(event) => setDescription(event.target.value)}
				onBlur={() => updateNpc(description)}
				{...props}
				sx={{ maxWidth: '25rem', ...props.sx }}
			/>
			<IconButton
				size="small"
				edge="end"
				aria-label="delete"
				onClick={deleteNpc}
			>
				<Delete />
			</IconButton>
		</Box>
	)
}
