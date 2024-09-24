import {
	HeartBroken,
	HeartBrokenOutlined,
	PanTool,
	SvgIconComponent,
} from '@mui/icons-material'
import { Box, Checkbox, Icon, InputAdornment, MenuItem } from '@mui/material'
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
	icon: React.ReactNode
	updateAttribute: (update: Partial<Attribute>) => void
}

export const AttributeColumn: React.FC<AttributeColumnProps> = ({
	attribute,
	label,
	icon,
	updateAttribute,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
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
				InputProps={{
					startAdornment: (
						<InputAdornment
							position="start"
							sx={{ pr: 0.5, fontSize: '0.75rem' }}
						>
							{icon}
						</InputAdornment>
					),
					sx: {
						px: 1,
						fontWeight: 'bold',
					},
				}}
				sx={{
					maxWidth: '8rem',
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
