import { HelpOutline } from '@mui/icons-material'
import {
	Box,
	Chip,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Tooltip,
	Typography,
} from '@mui/material'
import React, { useMemo } from 'react'
import { CharacterDocument } from '../../../../types/Character'
import { AttributeField, SectionHeader } from '../../CharacterSheet'

import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { CategorizedAbilities } from './CategorizedAbilities'
import { 
	OFFICIAL_SKILLS, 
	OFFICIAL_PROFESSIONS, 
	getSkillChipColor, 
	getProfessionChipColor 
} from '../../../../constants/skills'

export const SkillsTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { xp, skills, professions = [] } = useMemo(
		() => activeCharacter.skills,
		[activeCharacter.skills],
	)

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const spendXP = useMemo(() => {
		let newSpendXP = skills
			.map((s) => s.xp)
			.reduce((partialSum, a) => partialSum + a, 0)

		if (newSpendXP != xp.spend) {
			updateCharacter({ skills: { xp: { spend: newSpendXP } } })
		}
		return newSpendXP
	}, [activeCharacter])

	// Get currently selected skill names
	const selectedSkillNames = useMemo(() => 
		skills.map(skill => skill.name), 
		[skills]
	)

	// Get available skills (not yet selected)
	const availableSkills = useMemo(() => 
		OFFICIAL_SKILLS.filter(skill => !selectedSkillNames.includes(skill)),
		[selectedSkillNames]
	)

	// Get available professions (not yet selected)
	const availableProfessions = useMemo(() => 
		OFFICIAL_PROFESSIONS.filter(profession => !professions.includes(profession)),
		[professions]
	)

	// Check if Crafting skill is selected
	const hasCraftingSkill = useMemo(() => 
		selectedSkillNames.includes('Crafting'),
		[selectedSkillNames]
	)

	// Skills count validation
	const skillsCount = selectedSkillNames.length
	const canAddSkills = skillsCount < 12
	const hasMinimumSkills = skillsCount >= 7

	const addSkill = (skillName: string) => {
		if (canAddSkills && availableSkills.includes(skillName)) {
			dispatch(characterSheetActions.addSkill(skillName))
		}
	}

	const removeSkill = (skillName: string) => {
		dispatch(characterSheetActions.removeSkill(skillName))
		// If removing Crafting, also remove all professions
		if (skillName === 'Crafting') {
			professions.forEach(profession => {
				dispatch(characterSheetActions.removeProfession(profession))
			})
		}
	}

	const addProfession = (professionName: string) => {
		if (hasCraftingSkill && availableProfessions.includes(professionName)) {
			dispatch(characterSheetActions.addProfession(professionName))
		}
	}

	const removeProfession = (professionName: string) => {
		dispatch(characterSheetActions.removeProfession(professionName))
	}

	const updateSkill = (skillName: string, update: { xp?: number }) => {
		const skillIndex = skills.findIndex(s => s.name === skillName)
		if (skillIndex >= 0) {
			dispatch(characterSheetActions.updateSkill({ 
				update, 
				index: skillIndex 
			}))
		}
	}

	return (
		<Box
			sx={{
				display: 'flex',
				columnGap: { md: 4, sm: 2, xs: 1 },
				flexWrap: 'wrap',
			}}
		>
			<Box sx={{ mb: 2, maxWidth: '25rem' }}>
				{/* XP Section */}
				<Box sx={{ mx: 'auto', display: 'flex' }}>
					<AttributeField
						size="small"
						type="number"
						value={xp.total}
						onChange={(event) =>
							updateCharacter({
								skills: { xp: { total: Number(event.target.value) } },
							})
						}
						label="Total XP"
						helperText=""
						sx={{ maxWidth: '7rem' }}
						inputProps={{
							sx: {
								textAlign: 'right',
							},
						}}
					/>
					<AttributeField
						size="small"
						disabled
						value={spendXP}
						label="Spend XP"
						helperText=""
						sx={{ maxWidth: '7rem' }}
					/>
				</Box>

				{/* Skills Section */}
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
					<SectionHeader>Skills</SectionHeader>
					<Tooltip title="0-1 XP (rank 0), 2-5 XP (rank 1), 6-11 XP (rank 2), 12-19 XP (rank 3), 20-29 XP (rank 4), 30 XP (rank 5)">
						<HelpOutline fontSize="small" sx={{ mb: 0.75 }} />
					</Tooltip>
				</Box>

				{/* Skills Count Caption */}
				<Typography 
					variant="caption" 
					sx={{ 
						display: 'block', 
						mb: 2,
						color: hasMinimumSkills ? 'text.secondary' : 'error.main'
					}}
				>
					You have selected {skillsCount} of 12 skills (minimum 7 required)
				</Typography>

				{/* Skills Dropdown */}
				{canAddSkills && availableSkills.length > 0 && (
					<FormControl fullWidth sx={{ mb: 2 }}>
						<InputLabel>Add Skill</InputLabel>
						<Select
							label="Add Skill"
							value=""
							onChange={(e) => addSkill(e.target.value)}
						>
							{availableSkills.map(skill => (
								<MenuItem key={skill} value={skill}>
									{skill}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}

				{/* Selected Skills as Chips */}
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
					{skills.map(skill => {
						const skillRank = useMemo(() => {
							switch (true) {
								case skill.xp <= 1:
									return 0
								case skill.xp <= 5:
									return 1
								case skill.xp <= 11:
									return 2
								case skill.xp <= 19:
									return 3
								case skill.xp <= 29:
									return 4
								default:
									return 5
							}
						}, [skill.xp])

						return (
							<Box key={skill.id} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
								<Chip
									label={skill.name}
									onDelete={() => removeSkill(skill.name)}
									sx={{
										backgroundColor: getSkillChipColor(skill.name),
										'& .MuiChip-label': {
											fontWeight: 500,
										},
									}}
								/>
								<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
									<Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
										Rank {skillRank}
									</Typography>
									<AttributeField
										size="small"
										type="number"
										value={skill.xp}
										onChange={(e) => updateSkill(skill.name, { xp: Number(e.target.value) })}
										label="XP"
										sx={{ 
											width: '60px',
											'& .MuiInputBase-input': {
												padding: '4px 6px',
												fontSize: '0.75rem',
												textAlign: 'center'
											},
											'& .MuiInputLabel-root': {
												fontSize: '0.7rem',
											}
										}}
									/>
								</Box>
							</Box>
						)
					})}
				</Box>

				{/* Professions Section */}
				{hasCraftingSkill && (
					<Box sx={{ mt: 3 }}>
						<SectionHeader>Crafting Professions</SectionHeader>
						<Typography 
							variant="body2" 
							sx={{ mb: 2, color: 'text.secondary' }}
						>
							Select professions for your Crafting skill.
						</Typography>

						{/* Professions Dropdown */}
						{availableProfessions.length > 0 && (
							<FormControl fullWidth sx={{ mb: 2 }}>
								<InputLabel>Add Profession</InputLabel>
								<Select
									label="Add Profession"
									value=""
									onChange={(e) => addProfession(e.target.value)}
								>
									{availableProfessions.map(profession => (
										<MenuItem key={profession} value={profession}>
											{profession}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}

						{/* Selected Professions as Chips */}
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
							{professions.map(profession => (
								<Chip
									key={profession}
									label={profession}
									onDelete={() => removeProfession(profession)}
									sx={{
										backgroundColor: getProfessionChipColor(profession),
									}}
								/>
							))}
						</Box>
					</Box>
				)}
			</Box>

			<CategorizedAbilities />
		</Box>
	)
}
