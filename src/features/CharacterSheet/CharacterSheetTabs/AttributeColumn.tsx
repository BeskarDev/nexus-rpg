import { HeartBroken, HeartBrokenOutlined } from '@mui/icons-material'
import { Box, Checkbox } from '@mui/material'
import React from 'react'
import { Attribute } from '../../../types/Character'
import { AttributeField } from '../CharacterSheet'

export type AttributeColumnProps = {
	attribute: Attribute
	label: string
	updateAttribute: (update: Partial<Attribute>) => void
}

export const AttributeColumn: React.FC<AttributeColumnProps> = ({
	attribute,
	label,
	updateAttribute,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<AttributeField
				value={attribute.value}
				onChange={(event) => updateAttribute({ value: event.target.value })}
				label={label}
			/>
			<Checkbox
				size="small"
				icon={<HeartBrokenOutlined />}
				checkedIcon={<HeartBroken color="error" />}
				checked={attribute.wounded}
				onChange={() => updateAttribute({ wounded: !attribute.wounded })}
				sx={{ position: 'relative', top: -8 }}
			/>
		</Box>
	)
}
