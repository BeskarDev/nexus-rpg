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
} from '@mui/material'
import React, { useState } from 'react'

import {
	Delete,
	ExpandMore,
	DriveFileMove,
	PlayArrow,
	Bolt,
	CircleOutlined,
} from '@mui/icons-material'
import { Ability } from '@site/src/types/Character'
import { AbilityTag } from '@site/src/types/AbilityTag'
import { ActionType, ACTION_TYPES } from '@site/src/types/ActionType'

export type AbilityRowProps = {
	title: string
	description: string
	tag?: AbilityTag
	actionType?: ActionType
	rank?: number
	availableTags: AbilityTag[]
	updateAbility: (update: Partial<Ability>) => void
	moveToCategory: (newTag: AbilityTag) => void
	deleteAbility: () => void
}

export const AbilityRow: React.FC<AbilityRowProps> = ({
	title: initialTitle,
	description: initialDescription,
	tag,
	actionType: initialActionType,
	rank: initialRank,
	availableTags,
	updateAbility,
	moveToCategory,
	deleteAbility,
}) => {
	const [title, setTitle] = useState(initialTitle)
	const [description, setDescription] = useState(initialDescription)
	const [actionType, setActionType] = useState<ActionType>(
		initialActionType || 'Other',
	)
	const [rank, setRank] = useState<number>(initialRank || 1)
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

	const getActionTypeIcon = (type: ActionType) => {
		switch (type) {
			case 'Action':
				return <PlayArrow fontSize="small" />
			case 'Quick Action':
				return <Bolt fontSize="small" />
			case 'Passive Ability':
				return <CircleOutlined fontSize="small" />
			default:
				return null
		}
	}

	return (
		<Accordion
			expanded={expanded}
			disableGutters
			sx={{ flexGrow: 1, maxWidth: '35rem', mt: 0 }}
		>
			<AccordionSummary
				expandIcon={<ExpandMore onClick={() => setExpanded(!expanded)} />}
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
						sx={{ maxWidth: '25rem' }}
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
						sx={{ mt: 0, maxWidth: '25rem' }}
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
							)}
						</Box>

						<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
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
