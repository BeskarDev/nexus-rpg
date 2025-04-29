import { Delete } from '@mui/icons-material'
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	TextField,
	Tooltip,
	IconButton,
	Typography,
	MenuItem,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { Companion, sizeType, sizeTypeArray } from '@site/src/types/Character'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { characterSheetActions } from '../../characterSheetReducer'
import { useState } from 'react'
import { AttributeField } from '../../CharacterSheet'
import { AvField } from '../00_Statistics/AvField'
import { WoundCheckbox } from '../00_Statistics/WoundCheckbox'
import { DeepPartial } from '../../CharacterSheetContainer'

export const CompanionEntry: React.FC<{
	companion: Companion
	index: number
	showControls: boolean
}> = ({ companion, index, showControls }) => {
	const dispatch = useAppDispatch()
	const [expanded, setExpanded] = useState(false)

	const updateCompanion = (update: DeepPartial<Companion>, index: number) => {
		dispatch(characterSheetActions.updateCompanion({ update, index }))
	}

	const deleteCompanion = (index: number) => {
		dispatch(characterSheetActions.deleteCompanion(index))
	}

	return (
		<Accordion
			expanded={expanded}
			disableGutters
			sx={{ flexGrow: 1, maxWidth: '47rem', mt: 0 }}
		>
			<AccordionSummary
				expandIcon={<ExpandMore />}
				onClick={() => setExpanded(!expanded)}
				sx={{
					gap: 1,
					pt: 0,
					px: 0,
					flexDirection: 'row-reverse',
					'& .MuiAccordionSummary-content': {
						display: 'block',
					},
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Typography>{companion.name || 'Unnamed Companion'}</Typography>
					{showControls && (
						<Tooltip title="Delete Companion">
							<IconButton onClick={() => deleteCompanion(index)} sx={{ mr: 1 }}>
								<Delete />
							</IconButton>
						</Tooltip>
					)}
				</Box>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<TextField
						size="small"
						variant="standard"
						value={companion.name}
						onChange={(event) =>
							updateCompanion({ name: event.target.value }, index)
						}
						label="Name"
					/>
					<TextField
						size="small"
						variant="standard"
						value={companion.type}
						onChange={(event) =>
							updateCompanion({ type: event.target.value }, index)
						}
						label="Type"
					/>
					<TextField
						select
						size="small"
						variant="standard"
						value={companion.size}
						onChange={(event) =>
							updateCompanion({ size: event.target.value as sizeType }, index)
						}
						label="Size"
					>
						{sizeTypeArray.map((type) => (
							<MenuItem key={type} value={type}>
								{type}
							</MenuItem>
						))}
					</TextField>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<AttributeField
						size="small"
						type="number"
						value={companion.statistics.health.current}
						onChange={(event) =>
							updateCompanion(
								{
									statistics: {
										health: { current: Number(event.target.value) },
									},
								},
								index,
							)
						}
						label="Current HP"
						sx={{ maxWidth: '5rem', mt: 2, '& input': { py: 1.5 } }}
					/>
					<AttributeField
						size="small"
						type="number"
						variant="standard"
						value={companion.statistics.health.temp}
						onChange={(event) =>
							updateCompanion(
								{
									statistics: {
										health: { temp: Number(event.target.value) },
									},
								},
								index,
							)
						}
						label="Temp. HP"
						sx={{ maxWidth: '3rem', '& input': { py: 0.5 } }}
					/>
					<AttributeField
						size="small"
						type="number"
						variant="standard"
						value={companion.statistics.health.total}
						onChange={(event) =>
							updateCompanion(
								{
									statistics: {
										health: { total: Number(event.target.value) },
									},
								},
								index,
							)
						}
						label="Max. HP"
						sx={{ maxWidth: '3rem', '& input': { py: 0.5 } }}
					/>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'top',
						}}
					>
						<Typography
							variant="caption"
							sx={{
								color: (theme) => theme.palette.text.secondary,
								fontSize: '9px',
								mt: 0.25,
							}}
						>
							Wounds
						</Typography>
						<Box sx={{ display: 'flex', gap: 1.5 }}>
							<WoundCheckbox
								{...companion.statistics.health.woundOne}
								setWound={(update) =>
									updateCompanion(
										{
											statistics: {
												health: {
													woundOne: {
														...companion.statistics.health.woundOne,
														...update,
													},
												},
											},
										},
										index,
									)
								}
							/>
							<WoundCheckbox
								{...companion.statistics.health.woundTwo}
								setWound={(update) =>
									updateCompanion(
										{
											statistics: {
												health: {
													woundTwo: {
														...companion.statistics.health.woundTwo,
														...update,
													},
												},
											},
										},
										index,
									)
								}
							/>
						</Box>
					</Box>
					<AvField
						av={companion.statistics.av}
						updateFn={(update: DeepPartial<Companion>) =>
							updateCompanion(
								{
                  statistics: {
                    av: {
                      ...companion.statistics.av,
                      ...update.statistics?.av,
                    },
                  }
                },
								index,
							)
						}
						size="small"
						sx={{ ml: 'auto' }}
					/>
				</Box>
			</AccordionDetails>
		</Accordion>
	)
}
