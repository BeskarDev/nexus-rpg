import {
	Box,
	IconButton,
	TextField,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Tooltip,
  Typography,
} from '@mui/material'
import React, { useMemo, useState } from 'react'

import { AddCircle, BuildCircle, Delete, ExpandMore } from '@mui/icons-material'
import { DynamicList, reorder } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { DropResult } from 'react-beautiful-dnd'
import { CharacterDocument, Companion } from '../../../../types/Character'
import { SectionHeader } from '../../CharacterSheet'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { CompanionEntry } from './CompanionEntry'

export const CompanionsTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const [showControls, setShowControls] = useState(false)
	const companions = useMemo(
		() => activeCharacter?.companions || [],
		[activeCharacter?.companions],
	)

	const toggleControls = () => {
		setShowControls((prev) => !prev)
	}
	const addNewCompanion = () => {
		dispatch(characterSheetActions.addNewCompanion())
	}

	const onCompanionReorder = ({ source, destination }: DropResult) => {
		if (!destination) return
		dispatch(
			characterSheetActions.reorderCompanion({
				source: source.index,
				destination: destination.index,
			}),
		)
	}

	return (
		<Box
			sx={{
				display: 'flex',
        flexDirection: 'column',
				columnGap: { md: 4, sm: 2, xs: 1 },
				flexWrap: 'wrap',
				maxWidth: '47rem',
			}}
		>
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
				<Typography fontWeight="bold">Companions</Typography>
				<Tooltip title="enable this to add, delete, or reorder lists">
					<IconButton
						onClick={toggleControls}
						color={showControls ? 'primary' : 'default'}
					>
						<BuildCircle />
					</IconButton>
				</Tooltip>
				{showControls && (
					<IconButton
						onClick={(event) => {
							addNewCompanion()
							event.stopPropagation()
						}}
					>
						<AddCircle />
					</IconButton>
				)}
			</Box>
			<DynamicList droppableId="companions" onDragEnd={onCompanionReorder}>
				{companions.map((companion, index) => (
					<DynamicListItem key={companion.id} id={companion.id} index={index} dragDisabled={!showControls}>
						<CompanionEntry companion={companion} index={index} showControls={showControls} />
					</DynamicListItem>
				))}
			</DynamicList>
      </Box>
	)
}
