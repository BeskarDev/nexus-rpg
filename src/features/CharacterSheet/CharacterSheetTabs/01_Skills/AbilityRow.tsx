import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
	TextField,
	MenuItem,
	Menu,
	Tooltip,
	Select,
	FormControl,
	InputLabel,
	FormControlLabel,
	Chip,
} from '@mui/material'
import React, { useState } from 'react'

import {
	Delete,
	ExpandMore,
	DriveFileMove,
	BookmarkBorder,
	Bookmark,
} from '@mui/icons-material'
import { Ability } from '@site/src/types/Character'
import { AbilityTag } from '@site/src/types/AbilityTag'
import {
	ActionType,
	ACTION_TYPES,
	getActionTypeIcon,
} from '@site/src/types/ActionType'
import { OFFICIAL_SKILLS, getSkillChipColor } from '@site/src/constants/skills'
import { getSkillAbbreviation } from '@site/src/constants/skillAbbreviations'

export type AbilityRowProps = {
	title: string
	description: string
	tag?: AbilityTag
	actionType?: ActionType
	rank?: number
	skill?: string
	availableTags: AbilityTag[]
	updateAbility: (update: Partial<Ability>) => void
	moveToCategory: (newTag: AbilityTag) => void
	deleteAbility: () => void
	abilityId: string
	isInQuickRef?: boolean
	onToggleQuickRef?: (abilityId: string) => void
}

export const AbilityRow: React.FC<AbilityRowProps> = ({
	title: initialTitle,
	description: initialDescription,
	tag,
	actionType: initialActionType,
	rank: initialRank,
	skill: initialSkill,
	availableTags,
	updateAbility,
	moveToCategory,
	deleteAbility,
	abilityId,
	isInQuickRef = false,
	onToggleQuickRef,
}) => {
	const [title, setTitle] = useState(initialTitle)
	const [description, setDescription] = useState(initialDescription)
	const [actionType, setActionType] = useState<ActionType>(
		initialActionType || 'Other',
	)
	const [rank, setRank] = useState<number>(initialRank || 1)
	const [skill, setSkill] = useState<string | undefined>(initialSkill)
	const [expanded, setExpanded] = useState(false)
	const [moveMenuAnchor, setMoveMenuAnchor] = useState<null | HTMLElement>(null)

	const handleMoveMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMoveMenuAnchor(event.currentTarget)
	}

	const handleMoveMenuClose = () => {
		setMoveMenuAnchor(null)
	}

	const handleMoveCategory = (newTag: AbilityTag) => {
		moveToCategory(newTag)
		handleMoveMenuClose()
	}

	return (
		<Accordion
			expanded={expanded}
			onChange={() => setExpanded(!expanded)}
			disableGutters
			sx={{ flexGrow: 1, maxWidth: 'var(--cs-max-width-sm)', mt: 0 }}
		>
			<AccordionSummary
				expandIcon={<ExpandMore />}
				sx={{
					gap: 1,
					pt: 0,
					pl: 0,
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						gap: 1,
						alignItems: 'center',
						flexGrow: 1,
					}}
				>
					<TextField
						fullWidth
						variant="standard"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						onBlur={() => updateAbility({ title })}
						sx={{ maxWidth: '12.5rem' }}
						InputProps={{
							startAdornment: (
								<Box
									component="span"
									sx={{ display: 'flex', alignItems: 'center', mr: 1 }}
								>
									{getActionTypeIcon(actionType)}
								</Box>
							),
							endAdornment:
								tag === 'Talent' && rank >= 1 && rank <= 5 ? (
									<Box
										component="span"
										sx={{ color: 'text.secondary', mx: 1, fontSize: '1.15em' }}
									>
										{['①', '②', '③', '④', '⑤'][rank - 1]}
									</Box>
								) : undefined,
						}}
					/>
					{tag === 'Talent' && skill && (
						<Tooltip title={skill}>
							<Chip
								size="small"
								label={getSkillAbbreviation(skill) || skill}
								variant="outlined"
								sx={{
									borderColor: getSkillChipColor(skill),
									color: getSkillChipColor(skill),
									fontWeight: 600,
								}}
							/>
						</Tooltip>
					)}
				</Box>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					<TextField
						label="Description"
						size="small"
						multiline
						minRows={1}
						maxRows={10}
						value={description}
						onChange={(event) => setDescription(event.target.value)}
						onBlur={() => updateAbility({ description })}
						sx={{ mt: 0, maxWidth: '20rem' }}
					/>

					{/* Action Type Dropdown and Action Buttons in same row */}
					<Box
						sx={{
							display: 'flex',
							gap: 1,
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
							<FormControl size="small" sx={{ width: '9.5rem' }}>
								<InputLabel id="action-type-label">Action Type</InputLabel>
								<Select
									labelId="action-type-label"
									value={actionType}
									label="Action Type"
									onChange={(event) => {
										const newActionType = event.target.value as ActionType
										setActionType(newActionType)
										updateAbility({ actionType: newActionType })
									}}
								>
									{ACTION_TYPES.map((type) => (
										<MenuItem key={type} value={type}>
											<Box
												sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
											>
												{getActionTypeIcon(type)}
												{type}
											</Box>
										</MenuItem>
									))}
								</Select>
							</FormControl>

							{/* Rank Selection for Talents */}
							{tag === 'Talent' && (
								<>
									<FormControl size="small" sx={{ width: '4rem' }}>
										<InputLabel id="rank-label">Rank</InputLabel>
										<Select
											labelId="rank-label"
											value={rank}
											label="Rank"
											onChange={(event) => {
												const newRank = Number(event.target.value)
												setRank(newRank)
												updateAbility({ rank: newRank })
											}}
										>
											<MenuItem value={1}>1</MenuItem>
											<MenuItem value={2}>2</MenuItem>
											<MenuItem value={3}>3</MenuItem>
											<MenuItem value={4}>4</MenuItem>
											<MenuItem value={5}>5</MenuItem>
										</Select>
									</FormControl>

									<FormControl size="small" sx={{ minWidth: '10rem' }}>
										<InputLabel id={`skill-label-${abilityId}`}>
											Skill
										</InputLabel>
										<Select
											labelId={`skill-label-${abilityId}`}
											value={skill || ''}
											label="Skill"
											onChange={(event) => {
												const newSkill =
													(event.target.value as string) || undefined
												setSkill(newSkill)
												updateAbility({ skill: newSkill || undefined })
											}}
											renderValue={(value) =>
												value ? (
													<Box
														sx={{
															display: 'flex',
															alignItems: 'center',
															gap: 0.5,
														}}
													>
														<Chip
															size="small"
															label={value}
															variant="outlined"
															sx={{
																borderColor: getSkillChipColor(value as string),
																color: getSkillChipColor(value as string),
																fontWeight: 600,
															}}
														/>
													</Box>
												) : (
													<em>Unassigned</em>
												)
											}
										>
											<MenuItem value="">
												<em>Unassigned</em>
											</MenuItem>
											{OFFICIAL_SKILLS.map((skillName) => (
												<MenuItem key={skillName} value={skillName}>
													{skillName}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</>
							)}
						</Box>

						<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
							{onToggleQuickRef && (
								<Tooltip
									title={
										isInQuickRef ? 'Remove from Quick Ref' : 'Add to Quick Ref'
									}
								>
									<IconButton
										size="small"
										onClick={() => onToggleQuickRef(abilityId)}
										sx={{
											p: 0.5,
											color: isInQuickRef ? 'primary.main' : 'action.disabled',
										}}
									>
										{isInQuickRef ? (
											<Bookmark fontSize="small" />
										) : (
											<BookmarkBorder fontSize="small" />
										)}
									</IconButton>
								</Tooltip>
							)}
							<Tooltip title="Move to another category">
								<IconButton
									size="small"
									aria-label="move category"
									onClick={handleMoveMenuOpen}
									sx={{ p: 0.5 }}
								>
									<DriveFileMove />
								</IconButton>
							</Tooltip>
							<Tooltip title="Delete this ability">
								<IconButton
									size="small"
									aria-label="delete"
									onClick={deleteAbility}
									sx={{ p: 0.5 }}
								>
									<Delete />
								</IconButton>
							</Tooltip>
						</Box>
					</Box>
				</Box>
			</AccordionDetails>

			{/* Move Category Menu */}
			<Menu
				anchorEl={moveMenuAnchor}
				open={Boolean(moveMenuAnchor)}
				onClose={handleMoveMenuClose}
				MenuListProps={{
					'aria-labelledby': 'move-category-button',
				}}
			>
				{availableTags
					.filter((t) => t !== tag)
					.map((tagOption) => (
						<MenuItem
							key={tagOption}
							onClick={() => handleMoveCategory(tagOption)}
						>
							Move to {tagOption}
						</MenuItem>
					))}
			</Menu>
		</Accordion>
	)
}
