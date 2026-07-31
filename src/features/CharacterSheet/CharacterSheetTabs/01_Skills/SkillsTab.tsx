import { MarkButton, SheetChip, SheetInput } from '../../components'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm, Controller, UseFormReturn } from 'react-hook-form'
import { CharacterDocument } from '../../../../types/Character'
import {
	ListSectionHeader,
	RuleInfo,
	UnifiedListItem,
} from '../../components'

import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { CategorizedAbilities } from './CategorizedAbilities'
import { XpCard } from './XpCard'
import {
	OFFICIAL_SKILLS,
	OFFICIAL_PROFESSIONS,
	getSkillChipColor,
	getProfessionChipColor,
} from '../../../../constants/skills'
import {
	ALL_LANGUAGES,
	DEFAULT_LANGUAGE,
} from '../../../../constants/languages'
import { calculateSkillRank } from '../../utils'
import { calculateTalentHpBonus } from '../../utils/calculateTalentHpBonus'
import { calculateTalentFocusBonus } from '../../utils/calculateTalentFocusBonus'
import { calculateFolkAvBonus } from '../../utils/calculateFolkAvBonus'
import {
	createSkillXpSchema,
	calculateMaxXpPerSkill,
} from '../../utils/validation'
import { Skill } from '../../../../types/Character'

// Type for the skills form data (dynamic based on number of skills)
type SkillsFormData = {
	[key: string]: number // Key is skill name, value is XP
}

/**
 * Individual skill row with XP validation
 */
const SkillXpRow: React.FC<{
	skill: Skill
	skillRank: number
	spendXP: number
	updateSkill: (
		skillName: string,
		update: { xp?: number; rank?: number },
	) => void
	handleSkillDeletion: (skillName: string) => void
	skillsForm: UseFormReturn<SkillsFormData>
}> = ({
	skill,
	skillRank,
	spendXP,
	updateSkill,
	handleSkillDeletion,
	skillsForm,
}) => {
	const {
		control,
		formState: { errors },
		trigger,
	} = skillsForm

	// M13 S3 (F4): a skill has no details panel and never had one, so it takes
	// the ledger row's non-expanding variant. This is the row F4 meant: the
	// `SkillRow.tsx` it named has no importers and is not what the tab renders.
	return (
		<UnifiedListItem
			summarySx={{ gap: 1, flexWrap: 'nowrap' }}
			summaryContent={
				<>
			{/* M13 S3: the skill is one carved stamp, not a row of parts. It was an
				outlined MUI `Chip` stretched to fill the row (a box competing with the
				row's own rule), then briefly a legend dot plus two loose labels. Both
				said "web app". `SheetChip` puts the identity in the INK and absorbs the
				rank behind a struck divider, which is the exact device the doc pages
				use for the same skill — so `Athletics 3` reads the same in the rules
				and on the sheet. */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexGrow: 1,
					minWidth: 0,
				}}
			>
				<SheetChip tone={getSkillChipColor(skill.name)} value={skillRank}>
					{skill.name}
				</SheetChip>
			</Box>
			<Controller
				name={skill.name}
				control={control}
				rules={{
					validate: (value) => {
						try {
							// Calculate current total spent XP from all skills in the form
							const formValues = skillsForm.getValues()
							const currentTotalSpentXp = Object.values(formValues).reduce(
								(sum, xp) => sum + (xp || 0),
								0,
							)

							// Validate this skill's XP against the current total
							createSkillXpSchema(currentTotalSpentXp, skill.xp).validateSync(
								value,
							)
							return true
						} catch (err: any) {
							return err.message
						}
					},
				}}
				render={({ field, fieldState }) => (
					/* M13 S3 (owner review): the XP field was a stacked MUI field — a
						floating "XP" label above a boxed input — so it stood a whole label
						taller than the chip beside it and nothing on the row shared a
						line. It is one line now: the label sits BESIDE the value in the
						same small-caps register the section headers use, and the engraved
						baseline runs under the numeral alone, which is the only part that
						is editable. */
					<Box
						sx={{
							flexShrink: 0,
							display: 'flex',
							alignItems: 'baseline',
							gap: 0.5,
						}}
					>
						<Typography
							component="span"
							sx={{
								fontFamily: 'var(--nexus-font-ui)',
								fontSize: 'var(--nexus-text-2xs)',
								fontVariant: 'small-caps',
								letterSpacing: '0.06em',
								lineHeight: 1,
								color: 'text.secondary',
							}}
						>
							XP
						</Typography>
						<SheetInput
							{...field}
							size="small"
							type="number"
							variant="standard"
							onChange={async (e) => {
								const newValue = Number(e.target.value)
								field.onChange(newValue)
								updateSkill(skill.name, { xp: newValue })
								// Trigger validation on all skills to revalidate with new total
								await trigger()
							}}
							error={!!fieldState.error}
							helperText={fieldState.error?.message || ''}
							FormHelperTextProps={{ sx: { display: 'none' } }}
							inputProps={{ 'aria-label': `${skill.name} XP` }}
							sx={{
								width: '2.75rem',
								m: 0,
								'& .MuiInputBase-input': {
									p: 0,
									fontFamily: 'var(--nexus-font-ui)',
									fontSize: 'var(--nexus-text-xs)',
									fontVariantNumeric: 'tabular-nums',
									textAlign: 'center',
								},
							}}
						/>
					</Box>
				)}
			/>
			{/* Remove is remove: the same `×` the chips in this column carry, not a
				Material trash can two rows below one. */}
			<MarkButton
				glyph="×"
				label={`Delete ${skill.name}`}
				onClick={() => handleSkillDeletion(skill.name)}
			/>
				</>
			}
		/>
	)
}

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

	// Create a single form for all skills
	// This allows all skills to revalidate when any skill's XP changes
	const skillsFormData = useMemo(() => {
		const data: SkillsFormData = {}
		skills.forEach((skill) => {
			data[skill.name] = skill.xp
		})
		return data
	}, [skills])

	const skillsForm = useForm<SkillsFormData>({
		defaultValues: skillsFormData,
		mode: 'all', // Validate on all events including mount
	})

	// Reset form when skills change (e.g., skill added/removed or character switched)
	useEffect(() => {
		skillsForm.reset(skillsFormData)
	}, [skillsFormData])

	// Trigger validation on mount and when skillsFormData changes
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			skillsForm.trigger()
		}, 0)
		return () => clearTimeout(timeoutId)
	}, [skillsFormData])

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const spendXP = useMemo(
		() => skills.map((s) => s.xp).reduce((partialSum, a) => partialSum + a, 0),
		[skills],
	)

	// Sync the derived spend total back into the character. Done in an effect (not
	// during render) so we never dispatch while another component is rendering.
	useEffect(() => {
		if (spendXP != xp.spend) {
			updateCharacter({ skills: { xp: { spend: spendXP } } })
		}
	}, [spendXP, xp.spend])

	// Get currently selected skill names
	const selectedSkillNames = useMemo(
		() => skills.map((skill) => skill.name),
		[skills],
	)

	// Auto-calculate HP, AV, and Focus bonuses from talents/folk abilities (stored separately from user modifiers)
	useEffect(() => {
		const mysticismSkill = skills.find((s) => s.name === 'Mysticism')
		const mysticismRank = mysticismSkill?.rank || 0

		// Calculate HP bonus from talents
		const calculatedHpBonus = calculateTalentHpBonus(
			activeCharacter.skills.abilities,
			mysticismRank,
		)

		const currentAutoHpBonus = activeCharacter.statistics.health.auto || 0

		// Calculate AV bonus from folk abilities
		// Check if armor is equipped based on current AV values
		const hasArmorEquipped = activeCharacter.statistics.av.armor > 0
		const calculatedAvBonus = calculateFolkAvBonus(
			activeCharacter.skills.abilities,
			hasArmorEquipped,
		)

		const currentAutoAvBonus = activeCharacter.statistics.av.auto || 0

		// Calculate Focus bonus from talents
		const calculatedFocusBonus = calculateTalentFocusBonus(
			activeCharacter.skills.abilities,
		)

		const currentAutoFocusBonus = activeCharacter.spells?.focus?.auto ?? 0

		// Update if any value changed
		if (
			calculatedHpBonus !== currentAutoHpBonus ||
			calculatedAvBonus !== currentAutoAvBonus ||
			calculatedFocusBonus !== currentAutoFocusBonus
		) {
			updateCharacter({
				statistics: {
					health: {
						auto: calculatedHpBonus,
					},
					av: {
						auto: calculatedAvBonus,
					},
				},
				spells: {
					focus: {
						auto: calculatedFocusBonus,
					},
				},
			})
		}
	}, [activeCharacter.skills.abilities, activeCharacter.statistics.av.armor, skills])

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
				display: 'grid',
				gridTemplateColumns: { lg: '1fr 2fr', md: '1fr', sm: '1fr', xs: '1fr' },
				gap: { lg: 4, md: 2, sm: 2, xs: 1 },
			}}
		>
			{/* Left Column: XP, Skills, Professions, Languages */}
			<Box sx={{ mb: 2 }}>
				{/* XP Section */}
				<Box sx={{ mx: 'auto', display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
					<XpCard total={xp.total} spent={spendXP} />
				</Box>

				{/* Skills Section */}
				<ListSectionHeader
					label="Skills"
					count={skills.length}
					sx={{ mb: 1 }}
					/* The rank ladder is a RULE, so it hangs on the sheet's gloss mark
						like every other rules clarification rather than on a Material help
						icon that appeared nowhere else — and it goes in the header's `info`
						slot, which sits before the controls. */
					info={
						<RuleInfo label="About skill ranks">
							0-1 XP (rank 0), 2-5 XP (rank 1), 6-11 XP (rank 2), 12-19 XP (rank
							3), 20-29 XP (rank 4), 30 XP (rank 5)
						</RuleInfo>
					}
					actions={
						canAddSkills && availableSkills.length > 0 ? (
							<MarkButton
								glyph="+"
								label="Add Skill"
								onClick={() => setShowSkillDropdown(!showSkillDropdown)}
							/>
						) : undefined
					}
				/>

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

				{/* Selected Skills as ledger rows. No gap: the rows carry their own
					engraved rule, and a gap between them would separate each rule from
					the row it belongs to. */}
				<Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
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
								<SkillXpRow
									key={skill.id}
									skill={skill}
									skillRank={skillRank}
									spendXP={spendXP}
									updateSkill={updateSkill}
									handleSkillDeletion={handleSkillDeletion}
									skillsForm={skillsForm}
								/>
							)
						})}
				</Box>

				{/* Professions Section */}
				{hasCraftingSkill && (
					<Box sx={{ mt: 1 }}>
						<ListSectionHeader
							label="Crafting Professions"
							count={professions.length}
							sx={{ mb: 1 }}
							actions={
								availableProfessions.length > 0 ? (
									<MarkButton
										glyph="+"
										label="Add Profession"
										onClick={() =>
											setShowProfessionDropdown(!showProfessionDropdown)
										}
									/>
								) : undefined
							}
						/>

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

						{/* Selected professions. Banner silhouette like the skills above —
							a profession IS a named proficiency, and it already aliases its
							parent skill's identity hue (`getProfessionChipColor`), so the
							two clouds read as one family. */}
						<Box
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
								alignItems: 'center',
								gap: 1,
							}}
						>
							{professions
								.slice()
								.sort((a, b) => a.localeCompare(b))
								.map((profession) => (
									<SheetChip
										key={profession}
										tone={getProfessionChipColor(profession)}
										onRemove={() => removeProfession(profession)}
									>
										{profession}
									</SheetChip>
								))}
						</Box>
					</Box>
				)}

				{/* Languages Section */}
				<Box sx={{ mt: 1 }}>
					<ListSectionHeader
						label="Languages"
						count={languages.length}
						sx={{ mb: 1 }}
						actions={
							availableLanguages.length > 0 ? (
								<MarkButton
									glyph="+"
									label="Add Language"
									onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
								/>
							) : undefined
						}
					/>

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

					{/* Selected languages. Same banner, but no identity hue: a language has
						no skill behind it, so it inks in the structural bronze the chip
						defaults to. Tradespeak is the one everybody has and cannot drop,
						which is now said by it having no remove control rather than by
						being 100 units bolder than its neighbours. */}
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							alignItems: 'center',
							gap: 1,
						}}
					>
						{languages
							.slice()
							.sort((a, b) => {
								// Sort Tradespeak first, then alphabetically
								if (a === DEFAULT_LANGUAGE) return -1
								if (b === DEFAULT_LANGUAGE) return 1
								return a.localeCompare(b)
							})
							.map((language) => (
								<SheetChip
									key={language}
									{...(language !== DEFAULT_LANGUAGE && {
										onRemove: () => removeLanguage(language),
									})}
								>
									{language}
								</SheetChip>
							))}
					</Box>
				</Box>
			</Box>
			{/* End Left Column */}

			{/* Right Column: CategorizedAbilities */}
			<Box>
				<CategorizedAbilities />
			</Box>
			{/* End Right Column */}

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
