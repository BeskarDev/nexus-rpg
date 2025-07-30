import {
	TextField,
	Typography,
	Box,
} from '@mui/material'
import React from 'react'
import { Companion } from '../../../../../types/Character'
import { CompanionWoundCheckbox } from './CompanionWoundCheckbox'

interface CompanionHeaderControlsProps {
	companion: Companion
	editingId: string | null
	editName: string
	onEditNameChange: (name: string) => void
	onCurrentHPChange: (companionId: string, value: string) => void
	onMaxHPChange: (companionId: string, value: string) => void
	onWoundedChange: (companionId: string, wounded: boolean) => void
}

export const CompanionHeaderControls: React.FC<CompanionHeaderControlsProps> = ({
	companion,
	editingId,
	editName,
	onEditNameChange,
	onCurrentHPChange,
	onMaxHPChange,
	onWoundedChange,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 2,
				flex: 1,
				mr: 2,
			}}
		>
			{editingId === companion.id ? (
				<TextField
					value={editName}
					onChange={(e) => onEditNameChange(e.target.value)}
					size="small"
					variant="outlined"
					placeholder="Companion Name"
					onClick={(e) => e.stopPropagation()}
					sx={{ flex: 1 }}
				/>
			) : (
				<Typography variant="h6" sx={{ flex: 1 }}>
					{companion.name || 'Unnamed Companion'}
				</Typography>
			)}

			{/* HP Fields */}
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<TextField
					label="Current HP"
					type="number"
					size="small"
					value={companion.currentHP || 0}
					onChange={(e) => {
						e.stopPropagation()
						onCurrentHPChange(companion.id, e.target.value)
					}}
					onClick={(e) => e.stopPropagation()}
					sx={{ width: 80 }}
				/>
				<Typography>/</Typography>
				<TextField
					label="Max HP"
					type="number"
					size="small"
					value={companion.maxHP || 0}
					onChange={(e) => {
						e.stopPropagation()
						onMaxHPChange(companion.id, e.target.value)
					}}
					onClick={(e) => e.stopPropagation()}
					sx={{ width: 80 }}
				/>
			</Box>

			{/* Wound Checkbox */}
			<CompanionWoundCheckbox
				wounded={companion.wounded || false}
				onWoundedChange={(wounded) => onWoundedChange(companion.id, wounded)}
			/>
		</Box>
	)
}
