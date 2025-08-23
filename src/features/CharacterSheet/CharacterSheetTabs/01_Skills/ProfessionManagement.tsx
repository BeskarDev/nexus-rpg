import { Delete } from '@mui/icons-material'
import {
	Box,
	Chip,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material'
import React, { useMemo } from 'react'
import { useDropdownSelection } from '../../hooks/useDropdownSelection'
import { OFFICIAL_PROFESSIONS } from '../../../../constants/skills'

interface ProfessionManagementProps {
	professions: string[]
	hasCraftingSkill: boolean
	onAddProfession: (professionName: string) => void
	onRemoveProfession: (professionName: string) => void
}

export const ProfessionManagement: React.FC<ProfessionManagementProps> = ({
	professions,
	hasCraftingSkill,
	onAddProfession,
	onRemoveProfession,
}) => {
	const availableProfessions = useMemo(
		() =>
			OFFICIAL_PROFESSIONS.filter(
				(profession) => !professions.includes(profession),
			),
		[professions],
	)

	const dropdown = useDropdownSelection({
		availableItems: availableProfessions,
		selectedItems: professions,
		onAdd: onAddProfession,
		onRemove: onRemoveProfession,
	})

	const canAddProfessions = hasCraftingSkill && availableProfessions.length > 0

	if (!hasCraftingSkill) {
		return (
			<Box mb={2}>
				<Typography variant="body2" color="text.secondary">
					Add the Crafting skill to select professions.
				</Typography>
			</Box>
		)
	}

	return (
		<Box mb={2}>
			<Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
				<Typography variant="h6">Professions</Typography>
				{canAddProfessions && (
					<FormControl variant="outlined" size="small">
						<InputLabel>Add Profession</InputLabel>
						<Select
							value=""
							label="Add Profession"
							open={dropdown.isOpen}
							onOpen={dropdown.open}
							onClose={dropdown.close}
						>
							{availableProfessions.map((profession) => (
								<MenuItem
									key={profession}
									value={profession}
									onClick={() => dropdown.handleAdd(profession)}
								>
									{profession}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}
			</Box>

			<Box display="flex" flexWrap="wrap" gap={1}>
				{professions.map((profession) => (
					<Chip
						key={profession}
						label={profession}
						onDelete={() => dropdown.handleRemove(profession)}
						deleteIcon={<Delete />}
					/>
				))}
			</Box>
		</Box>
	)
}