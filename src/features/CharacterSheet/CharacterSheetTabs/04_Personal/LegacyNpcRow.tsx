import { Box, IconButton, TextField, TextFieldProps } from '@mui/material'
import React, { useState } from 'react'

import { Delete } from '@mui/icons-material'

export type LegacyNpcRowProps = {
	description: string
	updateNpc: (update: string) => void
	deleteNpc: () => void
	dragDisabled?: boolean
} & TextFieldProps

export const LegacyNpcRow: React.FC<LegacyNpcRowProps> = ({
	description: initialDescription,
	updateNpc,
	deleteNpc,
	dragDisabled,
	...props
}) => {
	const [description, setDescription] = useState(initialDescription)

	return (
		<Box
			sx={{ display: 'flex', gap: 1, alignItems: 'center', flexGrow: 1, mr: 1 }}
		>
			<TextField
				multiline
				minRows={1}
				maxRows={5}
				value={description}
				onChange={(event) => setDescription(event.target.value)}
				onBlur={() => updateNpc(description)}
				{...props}
				sx={{ flexGrow: 1, width: '14rem', ...props.sx }}
			/>
			{!dragDisabled && (
				<IconButton
					size="small"
					edge="end"
					aria-label="delete"
					onClick={deleteNpc}
				>
					<Delete />
				</IconButton>
			)}
		</Box>
	)
}