import { Box, MenuItem, Select, Tooltip, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { AbilityTag } from '@site/src/types/AbilityTag'
import { ActionType, ACTION_TYPES } from '@site/src/types/ActionType'
import { ActionGlyph } from './ActionMark'
import { OFFICIAL_SKILLS, getSkillChipColor } from '@site/src/constants/skills'
import {
	QuickRefButton,
	DeleteButton,
	RecordPlate,
	RecordRow,
	Inscription,
	SheetChip,
	SheetMenu,
} from '@site/src/features/CharacterSheet/components'

export type AbilityDetailsProps = {
	title: string
	description: string
	actionType: ActionType
	tag?: AbilityTag
	rank: number
	skill?: string
	availableTags: AbilityTag[]
	abilityId: string
	isInQuickRef: boolean
	onTitleChange: (title: string) => void
	onTitleBlur: () => void
	onDescriptionChange: (description: string) => void
	onDescriptionBlur: () => void
	onActionTypeChange: (actionType: ActionType) => void
	onRankChange: (rank: number) => void
	onSkillChange: (skill: string | undefined) => void
	onMoveCategory: (newTag: AbilityTag) => void
	onDelete: () => void
	onToggleQuickRef?: (abilityId: string) => void
}

/** Rank is 1–5 by the talent rules; a free list would allow a rank 9 talent. */
const RANKS = [1, 2, 3, 4, 5]

/**
 * The expanded editor for one ability, on the expanded-row pattern (M13 S8c).
 *
 * ## What it was
 *
 * A labelled `TextField` for the description, then three MUI `Select`s with
 * floating labels in a wrapping flex row, then a Material `DriveFileMove` icon
 * opening a `Menu`. That is the form-of-boxes every panel on this sheet started as
 * and which the pattern file names in its first rule: *a form is not a shape this
 * theme has, and no amount of grouping, washing or heading fixes it.*
 *
 * ## The anatomy, per the pattern
 *
 * | Register | Holds |
 * |---|---|
 * | Inscription | the name and the description — bare text, slot on hover |
 * | Record | action type, rank, skill, category — ruled courses down the side |
 * | Controls | quick-ref, move, delete — in the record's caption line |
 *
 * The name lives HERE and not in the row, which is the D5 split the Items and
 * Spells tabs already take: the row shows, the panel edits. It takes
 * `Inscription`'s `subject` register, the same one an item's name takes.
 *
 * No "rules" register: unlike a weapon (a damage equation) or a spell (a focus
 * cost), an ability computes nothing. Its description IS its rule, so the
 * inscription carries the weight and the plate holds only the four facts that are
 * chosen from a fixed set.
 */
export const AbilityDetails: React.FC<AbilityDetailsProps> = ({
	title,
	description,
	actionType,
	tag,
	rank,
	skill,
	availableTags,
	abilityId,
	isInQuickRef,
	onTitleChange,
	onTitleBlur,
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

	return (
		<Box className="cs-ability-panel">
			<Box className="cs-ability-panel__prose">
				{/* Heights come from `.cs-ability-panel__prose > *`, which resets
					`Inscription`'s row-shaped `flex: <grow> 1 12rem`. Not repeated as a
					`grow` prop here: two levers for one measurement is how the two meta
					bands drifted in S4d. */}
				<Inscription
					subject
					block
					label="Name"
					value={title}
					onChange={(event) => onTitleChange(event.target.value)}
					onBlur={onTitleBlur}
				/>
				<Inscription
					block
					label="Description"
					multiline
					minRows={2}
					maxRows={12}
					value={description}
					onChange={(event) => onDescriptionChange(event.target.value)}
					onBlur={onDescriptionBlur}
				/>
			</Box>

			<RecordPlate
				label="Record"
				sx={{ flex: '0 0 15rem' }}
				actions={
					<>
						{onToggleQuickRef && (
							<QuickRefButton
								itemId={abilityId}
								isInQuickRef={isInQuickRef}
								onToggle={onToggleQuickRef}
							/>
						)}
						{/* The Material `DriveFileMove` is gone: a file-move glyph for a
							game category was Material's vocabulary describing a rulebook.
							The verb is a labelled control now. */}
						<Tooltip title="Move to another category">
							<IconButton
								size="small"
								aria-label="Move to another category"
								onClick={(event) => setMoveMenuAnchor(event.currentTarget)}
							>
								<Box component="span" sx={{ fontSize: 'var(--nexus-text-xs)' }}>
									⇄
								</Box>
							</IconButton>
						</Tooltip>
						<DeleteButton
							onDelete={onDelete}
							entityKind="ability"
							entityName={title}
							tooltipText="Delete this ability"
						/>
					</>
				}
			>
				<RecordRow label="Action">
					<Select
						value={actionType}
						variant="standard"
						onChange={(event) =>
							onActionTypeChange(event.target.value as ActionType)
						}
						inputProps={{ 'aria-label': 'Action type' }}
						// The closed value carries the mark too, or the row teaches a
						// glyph in its menu that it then never uses.
						renderValue={(value) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'flex-end',
									gap: 0.75,
								}}
							>
								<ActionGlyph actionType={value as ActionType} />
								{value as string}
							</Box>
						)}
					>
						{ACTION_TYPES.map((type) => (
							<MenuItem key={type} value={type}>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
									<ActionGlyph actionType={type} />
									{type}
								</Box>
							</MenuItem>
						))}
					</Select>
				</RecordRow>

				{/* Rank and skill are the Talent's own facts. On a Combat Art or a Folk
					ability they are not blank rows, they are absent — a plate lists what
					the entity HAS, and an empty course invites the reader to fill it. */}
				{tag === 'Talent' && (
					<>
						<RecordRow label="Rank">
							<Select
								value={rank}
								variant="standard"
								onChange={(event) => onRankChange(Number(event.target.value))}
								inputProps={{ 'aria-label': 'Talent rank' }}
							>
								{RANKS.map((value) => (
									<MenuItem key={value} value={value}>
										{value}
									</MenuItem>
								))}
							</Select>
						</RecordRow>
						<RecordRow label="Skill">
							<Select
								value={skill || ''}
								variant="standard"
								displayEmpty
								onChange={(event) =>
									onSkillChange((event.target.value as string) || undefined)
								}
								inputProps={{ 'aria-label': 'Talent skill' }}
								renderValue={(value) =>
									value ? (
										<SheetChip tone={getSkillChipColor(value as string)}>
											{value as string}
										</SheetChip>
									) : (
										'Unassigned'
									)
								}
							>
								<MenuItem value="">Unassigned</MenuItem>
								{OFFICIAL_SKILLS.map((skillName) => (
									<MenuItem key={skillName} value={skillName}>
										<SheetChip tone={getSkillChipColor(skillName)}>
											{skillName}
										</SheetChip>
									</MenuItem>
								))}
							</Select>
						</RecordRow>
					</>
				)}

				{/* The heavier course: above it the facts describe what the ability IS,
					below it where it is filed. */}
				<RecordRow label="Category" section>
					{tag ?? 'Other'}
				</RecordRow>
			</RecordPlate>

			<SheetMenu
				anchorEl={moveMenuAnchor}
				onClose={() => setMoveMenuAnchor(null)}
				caption="Move to"
			>
				{availableTags
					.filter((option) => option !== tag)
					.map((option) => (
						<MenuItem
							key={option}
							onClick={() => {
								onMoveCategory(option)
								setMoveMenuAnchor(null)
							}}
						>
							{option}
						</MenuItem>
					))}
			</SheetMenu>
		</Box>
	)
}
