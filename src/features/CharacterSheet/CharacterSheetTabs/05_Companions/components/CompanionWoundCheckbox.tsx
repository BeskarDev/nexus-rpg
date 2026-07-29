import { Box, Checkbox } from '@mui/material'
import StatSigil from '@site/src/components/codex/StatSigil'
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
			icon={
				<Box sx={{ display: 'flex', color: 'text.disabled', opacity: 0.55 }}>
					<StatSigil name="hp" size="1.5rem" />
				</Box>
			}
			checkedIcon={
				<Box sx={{ display: 'flex', color: 'error.main' }}>
					<StatSigil name="wound" size="1.5rem" />
				</Box>
			}
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
