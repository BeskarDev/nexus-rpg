import {
	Box,
	IconButton,
	TextField,
	MenuItem,
	Menu,
	Tooltip,
	Select,
	FormControl,
	InputLabel,
	Chip,
} from '@mui/material'
import React, { useState } from 'react'
import { DriveFileMove } from '@mui/icons-material'
import { AbilityTag } from '@site/src/types/AbilityTag'
import {
	ActionType,
	ACTION_TYPES,
	getActionTypeIcon,
} from '@site/src/types/ActionType'
import { OFFICIAL_SKILLS, getSkillChipColor } from '@site/src/constants/skills'
import { QuickRefButton, DeleteButton } from '@site/src/features/CharacterSheet/components'

export type AbilityDetailsProps = {
	description: string
	actionType: ActionType
	tag?: AbilityTag
	rank: number
	skill?: string
	availableTags: AbilityTag[]
	abilityId: string
	isInQuickRef: boolean
	onDescriptionChange: (description: string) => void
	onDescriptionBlur: () => void
	onActionTypeChange: (actionType: ActionType) => void
	onRankChange: (rank: number) => void
	onSkillChange: (skill: string | undefined) => void
	onMoveCategory: (newTag: AbilityTag) => void
	onDelete: () => void
	onToggleQuickRef?: (abilityId: string) => void
}

/**
 * AbilityDetails - The expanded details view for an ability row.
 */
export const AbilityDetails: React.FC<AbilityDetailsProps> = ({
	description,
	actionType,
	tag,
	rank,
	skill,
	availableTags,
	abilityId,
	isInQuickRef,
	onDescriptionChange,
	onDescriptionBlur,
	onActionTypeChange,
	onRankChange,
	onSkillChange,
	onMoveCategory,
	onDelete,
	onToggleQuickRef,
}) => {
	const [moveMenuAnchor, setMoveMenuAnchor] = useState<null | HTMLElement>(null)

	const handleMoveMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMoveMenuAnchor(event.currentTarget)
	}

	const handleMoveMenuClose = () => {
		setMoveMenuAnchor(null)
	}

	const handleMoveCategory = (newTag: AbilityTag) => {
		onMoveCategory(newTag)
		handleMoveMenuClose()
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
			<TextField
				label="Description"
				size="small"
				multiline
				minRows={1}
				maxRows={10}
				value={description}
				onChange={(event) => onDescriptionChange(event.target.value)}
				onBlur={onDescriptionBlur}
				sx={{ mt: 0, width: '100%' }}
			/>

			{/* Action Type Dropdown and Action Buttons in same row */}
			<Box
				sx={{
					display: 'flex',
					gap: 1,
					alignItems: 'center',
					flexWrap: 'wrap',
					justifyContent: 'space-between',
				}}
			>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
					<FormControl size="small" sx={{ width: '9.5rem' }}>
						<InputLabel id="action-type-label">Action Type</InputLabel>
						<Select
							labelId="action-type-label"
							value={actionType}
							label="Action Type"
							onChange={(event) => {
								onActionTypeChange(event.target.value as ActionType)
							}}
						>
							{ACTION_TYPES.map((type) => (
								<MenuItem key={type} value={type}>
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
										onRankChange(Number(event.target.value))
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
								<InputLabel id={`skill-label-${abilityId}`}>Skill</InputLabel>
								<Select
									labelId={`skill-label-${abilityId}`}
									value={skill || ''}
									label="Skill"
									onChange={(event) => {
										const newSkill = (event.target.value as string) || undefined
										onSkillChange(newSkill)
									}}
									renderValue={(value) =>
										value ? (
											<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
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
						<QuickRefButton
							itemId={abilityId}
							isInQuickRef={isInQuickRef}
							onToggle={onToggleQuickRef}
						/>
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
					<DeleteButton onDelete={onDelete} tooltipText="Delete this ability" />
				</Box>
			</Box>

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
						<MenuItem key={tagOption} onClick={() => handleMoveCategory(tagOption)}>
							Move to {tagOption}
						</MenuItem>
					))}
			</Menu>
		</Box>
	)
}
