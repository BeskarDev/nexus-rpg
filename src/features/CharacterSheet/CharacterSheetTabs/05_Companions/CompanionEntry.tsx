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
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { Companion } from '@site/src/types/Character'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { characterSheetActions } from '../../characterSheetReducer'
import { useState } from 'react'

export const CompanionEntry: React.FC<{
	companion: Companion
	index: number
	showControls: boolean
}> = ({ companion, index, showControls }) => {
	const dispatch = useAppDispatch()
	const [expanded, setExpanded] = useState(false)

	const updateCompanion = (update: Partial<Companion>, index: number) => {
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
				expandIcon={<ExpandMore onClick={() => setExpanded(!expanded)} />}
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
				<Typography>{companion.name || 'Unnamed Companion'}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					<TextField
						variant="standard"
						value={companion.name}
						onChange={(event) =>
							updateCompanion({ name: event.target.value }, index)
						}
						label="Name"
						sx={{ maxWidth: '15rem' }}
					/>
					<TextField
						variant="standard"
						value={companion.statistics.health.current}
						onChange={(event) =>
							updateCompanion(
								{
									statistics: {
										...companion.statistics,
										health: {
											...companion.statistics.health,
											current: Number(event.target.value),
										},
									},
								},
								index,
							)
						}
						label="Health"
						sx={{ maxWidth: '10rem' }}
					/>
					{showControls && (
						<Tooltip title="Delete Companion">
							<IconButton onClick={() => deleteCompanion(index)}>
								<Delete />
							</IconButton>
						</Tooltip>
					)}
				</Box>
			</AccordionDetails>
		</Accordion>
	)
}
