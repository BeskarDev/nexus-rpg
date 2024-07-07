import { HeartBroken, HeartBrokenOutlined } from '@mui/icons-material'
import { Box, Checkbox, MenuItem } from '@mui/material'
import {
	Attribute,
	AttributeType,
	attributeTypeArray,
} from '@site/src/types/Character'
import React from 'react'
import { AttributeField } from '../../CharacterSheet'

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
				select
				value={attribute.value}
				onChange={(event) =>
					updateAttribute({
						value: Number(event.target.value) as AttributeType,
					})
				}
				label={label}
				sx={{
					width: '6rem',
				}}
			>
				{attributeTypeArray.map((at) => (
					<MenuItem key={at} value={at}>
						d{at}
					</MenuItem>
				))}
			</AttributeField>
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
