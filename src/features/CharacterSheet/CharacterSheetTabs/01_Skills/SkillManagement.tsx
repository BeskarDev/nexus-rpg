import { Add, Delete } from '@mui/icons-material'
import {
	Box,
	Button,
	Chip,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material'
import React, { useMemo } from 'react'
import { CharacterDocument } from '../../../../types/Character'
import { useDropdownSelection } from '../../hooks/useDropdownSelection'
import { useDialog } from '../../hooks/useDialog'
import { ConfirmationDialog } from '../../components/ConfirmationDialog'
import { OFFICIAL_SKILLS, getSkillChipColor } from '../../../../constants/skills'
import { SkillRow } from './SkillRow'

interface SkillManagementProps {
	skills: CharacterDocument['skills']['skills']
	onAddSkill: (skillName: string) => void
	onRemoveSkill: (skillName: string) => void
	onRemoveProfessions: () => void
}

export const SkillManagement: React.FC<SkillManagementProps> = ({
	skills,
	onAddSkill,
	onRemoveSkill,
	onRemoveProfessions,
}) => {
	const deleteDialog = useDialog()
	const [skillToDelete, setSkillToDelete] = React.useState<string | null>(null)

	const selectedSkillNames = useMemo(
		() => skills.map((skill) => skill.name),
		[skills],
	)

	const availableSkills = useMemo(() => {
		let filteredSkills = OFFICIAL_SKILLS.filter(
			(skill) => !selectedSkillNames.includes(skill),
		)

		const hasArcana = selectedSkillNames.includes('Arcana')
		const hasMysticism = selectedSkillNames.includes('Mysticism')

		if (hasArcana) {
			filteredSkills = filteredSkills.filter((skill) => skill !== 'Mysticism')
		} else if (hasMysticism) {
			filteredSkills = filteredSkills.filter((skill) => skill !== 'Arcana')
		}

		return filteredSkills
	}, [selectedSkillNames])

	const dropdown = useDropdownSelection({
		availableItems: availableSkills,
		selectedItems: selectedSkillNames,
		onAdd: onAddSkill,
		onRemove: onRemoveSkill,
	})

	const skillsCount = selectedSkillNames.length
	const canAddSkills = skillsCount < 12
	const hasMinimumSkills = skillsCount >= 7

	const handleSkillDeletion = (skillName: string) => {
		setSkillToDelete(skillName)
		deleteDialog.open()
	}

	const confirmSkillDeletion = () => {
		if (skillToDelete) {
			onRemoveSkill(skillToDelete)
			if (skillToDelete === 'Crafting') {
				onRemoveProfessions()
			}
			setSkillToDelete(null)
		}
		deleteDialog.close()
	}

	return (
		<Box>
			<Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
				<Typography variant="h6">Skills ({skillsCount}/12)</Typography>
				{canAddSkills && (
					<FormControl variant="outlined" size="small">
						<InputLabel>Add Skill</InputLabel>
						<Select
							value=""
							label="Add Skill"
							open={dropdown.isOpen}
							onOpen={dropdown.open}
							onClose={dropdown.close}
						>
							{availableSkills.map((skill) => (
								<MenuItem
									key={skill}
									value={skill}
									onClick={() => dropdown.handleAdd(skill)}
								>
									{skill}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}
			</Box>

			{!hasMinimumSkills && (
				<Typography color="error" variant="body2" mb={2}>
					You need at least 7 skills to create a valid character.
				</Typography>
			)}

			<Box display="flex" flexWrap="wrap" gap={1} mb={2}>
				{skills.map((skill) => (
					<Chip
						key={skill.name}
						label={skill.name}
						color={getSkillChipColor(skill.name)}
						onDelete={() => handleSkillDeletion(skill.name)}
						deleteIcon={<Delete />}
					/>
				))}
			</Box>

			<Box>
				{skills.map((skill) => (
					<SkillRow key={skill.name} skill={skill} />
				))}
			</Box>

			<ConfirmationDialog
				open={deleteDialog.isOpen}
				onClose={deleteDialog.close}
				onConfirm={confirmSkillDeletion}
				title="Delete Skill"
				message={`Are you sure you want to delete the ${skillToDelete} skill?${
					skillToDelete === 'Crafting'
						? ' This will also remove all professions.'
						: ''
				}`}
				confirmText="Delete"
				confirmColor="error"
			/>
		</Box>
	)
}