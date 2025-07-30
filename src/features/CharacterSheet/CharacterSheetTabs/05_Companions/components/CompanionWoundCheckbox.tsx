import {
	HeartBroken,
	HeartBrokenOutlined,
} from '@mui/icons-material'
import { Checkbox } from '@mui/material'
import React from 'react'

interface CompanionWoundCheckboxProps {
	wounded: boolean
	onWoundedChange: (wounded: boolean) => void
}

export const CompanionWoundCheckbox: React.FC<CompanionWoundCheckboxProps> = ({
	wounded,
	onWoundedChange,
}) => {
	return (
		<Checkbox
			icon={<HeartBrokenOutlined />}
			checkedIcon={<HeartBroken color="error" />}
			checked={wounded}
			onChange={(e) => {
				e.stopPropagation()
				onWoundedChange(!wounded)
			}}
			onClick={(e) => e.stopPropagation()}
			sx={{ p: 0.5 }}
			title="Wounded"
		/>
	)
}
