import {
	Add,
	HelpOutline,
	Delete,
} from '@mui/icons-material'
import {
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Tooltip,
	Typography,
} from '@mui/material'
import React, { useMemo, useState } from 'react'
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
} from '../../../../constants/skills'
import {
	ALL_LANGUAGES,
	DEFAULT_LANGUAGE,
} from '../../../../constants/languages'

export const SkillsTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const {
		xp,
		skills,
		professions = [],
		languages = [DEFAULT_LANGUAGE],
	} = useMemo(() => activeCharacter.skills, [activeCharacter.skills])

	// State for controlling dropdown visibility
	const [showSkillDropdown, setShowSkillDropdown] = useState(false)
	const [showProfessionDropdown, setShowProfessionDropdown] = useState(false)
	const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)

	// State for skill deletion confirmation
	const [skillToDelete, setSkillToDelete] = useState<string | null>(null)

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
	const selectedSkillNames = useMemo(
		() => skills.map((skill) => skill.name),
		[skills],
	)

	// Get available skills (not yet selected)
	const availableSkills = useMemo(() => {
		let filteredSkills = OFFICIAL_SKILLS.filter(
			(skill) => !selectedSkillNames.includes(skill),
		)

		// If character has Arcana, hide Mysticism from dropdown
		// If character has Mysticism, hide Arcana from dropdown
		const hasArcana = selectedSkillNames.includes('Arcana')
		const hasMysticism = selectedSkillNames.includes('Mysticism')

		if (hasArcana) {
			filteredSkills = filteredSkills.filter((skill) => skill !== 'Mysticism')
		} else if (hasMysticism) {
			filteredSkills = filteredSkills.filter((skill) => skill !== 'Arcana')
		}

		return filteredSkills
	}, [selectedSkillNames])

	// Get available professions (not yet selected)
	const availableProfessions = useMemo(
		() =>
			OFFICIAL_PROFESSIONS.filter(
				(profession) => !professions.includes(profession),
			),
		[professions],
	)

	// Get available languages (not yet selected)
	const availableLanguages = useMemo(
		() => ALL_LANGUAGES.filter((language) => !languages.includes(language)),
		[languages],
	)

	// Check if Crafting skill is selected
	const hasCraftingSkill = useMemo(
		() => selectedSkillNames.includes('Crafting'),
		[selectedSkillNames],
	)

	// Skills count validation
	const skillsCount = selectedSkillNames.length
	const canAddSkills = skillsCount < 12
	const hasMinimumSkills = skillsCount >= 7

	const addSkill = (skillName: string) => {
		if (canAddSkills && availableSkills.includes(skillName)) {
			dispatch(characterSheetActions.addSkill(skillName))
			setShowSkillDropdown(false) // Hide dropdown after adding
		}
	}

	const handleSkillDeletion = (skillName: string) => {
		setSkillToDelete(skillName)
	}

	const confirmSkillDeletion = () => {
		if (skillToDelete) {
			dispatch(characterSheetActions.removeSkill(skillToDelete))
			// If removing Crafting, also remove all professions
			if (skillToDelete === 'Crafting') {
				professions.forEach((profession) => {
					dispatch(characterSheetActions.removeProfession(profession))
				})
			}
			setSkillToDelete(null)
		}
	}

	const cancelSkillDeletion = () => {
		setSkillToDelete(null)
	}

	const removeSkill = (skillName: string) => {
		dispatch(characterSheetActions.removeSkill(skillName))
		// If removing Crafting, also remove all professions
		if (skillName === 'Crafting') {
			professions.forEach((profession) => {
				dispatch(characterSheetActions.removeProfession(profession))
			})
		}
	}

	const addProfession = (professionName: string) => {
		if (hasCraftingSkill && availableProfessions.includes(professionName)) {
			dispatch(characterSheetActions.addProfession(professionName))
			setShowProfessionDropdown(false) // Hide dropdown after adding
		}
	}

	const removeProfession = (professionName: string) => {
		dispatch(characterSheetActions.removeProfession(professionName))
	}

	const addLanguage = (languageName: string) => {
		if (availableLanguages.includes(languageName)) {
			dispatch(characterSheetActions.addLanguage(languageName))
			setShowLanguageDropdown(false) // Hide dropdown after adding
		}
	}

	const removeLanguage = (languageName: string) => {
		// Prevent removal of Tradespeak (handled by reducer as well)
		if (languageName !== DEFAULT_LANGUAGE) {
			dispatch(characterSheetActions.removeLanguage(languageName))
		}
	}

	const updateSkill = (
		skillName: string,
		update: { xp?: number; rank?: number },
	) => {
		const skillIndex = skills.findIndex((s) => s.name === skillName)
		if (skillIndex >= 0) {
			// Calculate rank from XP if XP is being updated
			let skillUpdate = { ...update }
			if (update.xp !== undefined) {
				const calculateSkillRank = (xp: number): number => {
					switch (true) {
						case xp <= 1:
							return 0
						case xp <= 5:
							return 1
						case xp <= 11:
							return 2
						case xp <= 19:
							return 3
						case xp <= 29:
							return 4
						default:
							return 5
					}
				}
				skillUpdate.rank = calculateSkillRank(update.xp)
			}

			dispatch(
				characterSheetActions.updateSkill({
					update: skillUpdate,
					index: skillIndex,
				}),
			)
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
				<Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
					<SectionHeader sx={{ mb: 0 }}>Skills</SectionHeader>
					{canAddSkills && availableSkills.length > 0 && (
						<Tooltip title="Add Skill">
							<IconButton
								size="small"
								onClick={() => setShowSkillDropdown(!showSkillDropdown)}
							>
								<Add fontSize="small" />
							</IconButton>
						</Tooltip>
					)}
					<Tooltip title="0-1 XP (rank 0), 2-5 XP (rank 1), 6-11 XP (rank 2), 12-19 XP (rank 3), 20-29 XP (rank 4), 30 XP (rank 5)">
						<HelpOutline fontSize="small" />
					</Tooltip>
				</Box>

				{/* Skills Count Caption */}
				<Typography
					variant="caption"
					sx={{
						display: 'block',
						mb: 2,
						color: hasMinimumSkills ? 'text.secondary' : 'error.main',
					}}
				>
					You have selected {skillsCount} of 12 skills (minimum 7 required)
				</Typography>

				{/* Skills Dropdown */}
				{showSkillDropdown && canAddSkills && availableSkills.length > 0 && (
					<FormControl fullWidth sx={{ mb: 2 }}>
						<InputLabel>Add Skill</InputLabel>
						<Select
							label="Add Skill"
							value=""
							onChange={(e) => addSkill(e.target.value)}
						>
							{availableSkills.sort().map((skill) => (
								<MenuItem key={skill} value={skill}>
									{skill}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}

				{/* Selected Skills as Chips */}
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
					{skills
						.slice()
						.sort((a, b) => a.name.localeCompare(b.name))
						.map((skill) => {
							// Calculate skill rank outside of useMemo to avoid React Hook errors
							const calculateSkillRank = (xp: number): number => {
								switch (true) {
									case xp <= 1:
										return 0
									case xp <= 5:
										return 1
									case xp <= 11:
										return 2
									case xp <= 19:
										return 3
									case xp <= 29:
										return 4
									default:
										return 5
								}
							}

							const skillRank = calculateSkillRank(skill.xp)

							return (
								<Box
									key={skill.id}
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: 1,
										width: '100%',
									}}
								>
									<Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
										<Chip
											label={
												<Box sx={{ display: 'flex', alignItems: 'center' }}>
													<Box
														sx={{
															width: 8,
															height: 8,
															borderRadius: '50%',
															backgroundColor: getSkillChipColor(skill.name),
															flexShrink: 0,
															marginRight: '8px',
														}}
													/>
													{`${skill.name} (Rank ${skillRank})`}
												</Box>
											}
											variant="outlined"
											sx={{
												flex: 1,
												justifyContent: 'flex-start',
												'& .MuiChip-label': {
													fontWeight: 500,
													paddingLeft: '12px',
													paddingRight: '12px',
													width: '100%',
													justifyContent: 'flex-start',
												},
											}}
										/>
									</Box>
									<AttributeField
										size="small"
										type="number"
										value={skill.xp}
										onChange={(e) =>
											updateSkill(skill.name, { xp: Number(e.target.value) })
										}
										label="XP"
										sx={{
											width: '60px',
											flexShrink: 0,
											'& .MuiInputBase-input': {
												padding: '4px 6px',
												fontSize: '0.75rem',
												textAlign: 'center',
											},
											'& .MuiInputLabel-root': {
												fontSize: '0.7rem',
											},
										}}
									/>
									<Box sx={{ flexShrink: 0 }}>
										<Tooltip title="Delete Skill">
											<IconButton
												size="small"
												onClick={() => handleSkillDeletion(skill.name)}
												sx={{
													color: 'text.secondary',
													'&:hover': {
														color: 'error.main',
													},
												}}
											>
												<Delete fontSize="small" />
											</IconButton>
										</Tooltip>
									</Box>
								</Box>
							)
						})}
				</Box>

				{/* Professions Section */}
				{hasCraftingSkill && (
					<Box sx={{ mt: 3 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
							<SectionHeader sx={{ mb: 0 }}>Crafting Professions</SectionHeader>
							{availableProfessions.length > 0 && (
								<Tooltip title="Add Profession">
									<IconButton
										size="small"
										onClick={() =>
											setShowProfessionDropdown(!showProfessionDropdown)
										}
									>
										<Add fontSize="small" />
									</IconButton>
								</Tooltip>
							)}
						</Box>
						<Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
							Select professions for your Crafting skill.
						</Typography>

						{/* Professions Dropdown */}
						{showProfessionDropdown && availableProfessions.length > 0 && (
							<FormControl fullWidth sx={{ mb: 2 }}>
								<InputLabel>Add Profession</InputLabel>
								<Select
									label="Add Profession"
									value=""
									onChange={(e) => addProfession(e.target.value)}
								>
									{availableProfessions.sort().map((profession) => (
										<MenuItem key={profession} value={profession}>
											{profession}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}

						{/* Selected Professions as Chips */}
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
							{professions
								.slice()
								.sort((a, b) => a.localeCompare(b))
								.map((profession) => (
									<Chip
										key={profession}
										label={profession}
										variant="outlined"
										onDelete={() => removeProfession(profession)}
										sx={{
											'& .MuiChip-label': {
												fontWeight: 500,
												// Remove custom padding to use default MUI padding
											},
										}}
									/>
								))}
						</Box>
					</Box>
				)}

				{/* Languages Section */}
				<Box sx={{ mt: 3 }}>
					<Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
						<SectionHeader sx={{ mb: 0 }}>Languages</SectionHeader>
						{availableLanguages.length > 0 && (
							<Tooltip title="Add Language">
								<IconButton
									size="small"
									onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
								>
									<Add fontSize="small" />
								</IconButton>
							</Tooltip>
						)}
					</Box>
					<Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
						Select languages your character knows. Tradespeak is the common
						language known by all characters.
					</Typography>

					{/* Languages Dropdown */}
					{showLanguageDropdown && availableLanguages.length > 0 && (
						<FormControl fullWidth sx={{ mb: 2 }}>
							<InputLabel>Add Language</InputLabel>
							<Select
								label="Add Language"
								value=""
								onChange={(e) => addLanguage(e.target.value)}
							>
								{availableLanguages.sort().map((language) => (
									<MenuItem key={language} value={language}>
										{language}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}

					{/* Selected Languages as Chips */}
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
						{languages
							.slice()
							.sort((a, b) => {
								// Sort Tradespeak first, then alphabetically
								if (a === DEFAULT_LANGUAGE) return -1
								if (b === DEFAULT_LANGUAGE) return 1
								return a.localeCompare(b)
							})
							.map((language) => (
								<Chip
									key={language}
									label={language}
									variant="outlined"
									{...(language !== DEFAULT_LANGUAGE && {
										onDelete: () => removeLanguage(language),
									})}
									sx={{
										'& .MuiChip-label': {
											fontWeight: 500,
											...(language === DEFAULT_LANGUAGE && {
												fontWeight: 600, // Make Tradespeak slightly bolder
											}),
										},
									}}
								/>
							))}
					</Box>
				</Box>
			</Box>

			<CategorizedAbilities />

			{/* Skill Deletion Confirmation Dialog */}
			<Dialog
				open={skillToDelete !== null}
				onClose={cancelSkillDeletion}
				aria-labelledby="delete-skill-dialog-title"
				aria-describedby="delete-skill-dialog-description"
			>
				<DialogTitle id="delete-skill-dialog-title">
					Confirm Skill Deletion
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="delete-skill-dialog-description">
						Are you sure you want to remove the <strong>{skillToDelete}</strong>{' '}
						skill?
						{skillToDelete === 'Crafting' && professions.length > 0 && (
							<span> This will also remove all selected professions.</span>
						)}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={cancelSkillDeletion}>Cancel</Button>
					<Button
						onClick={confirmSkillDeletion}
						color="error"
						variant="contained"
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}
