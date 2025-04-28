import { Delete } from '@mui/icons-material'
import { Box, TextField, Tooltip, IconButton } from '@mui/material'
import { CharacterDocument, Companion } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'

export const CompanionEntry: React.FC<{ companion: Companion, index: number, showControls: boolean }> = ({
	companion, index, showControls,
}) => {
	const dispatch = useAppDispatch()

	const updateCompanion = (update: Partial<Companion>, index: number) => {
		dispatch(characterSheetActions.updateCompanion({ update, index }))
	}

	const deleteCompanion = (index: number) => {
		dispatch(characterSheetActions.deleteCompanion(index))
	}

	return (
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
	)
}
