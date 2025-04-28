import {
  Box,
  IconButton,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
} from '@mui/material'
import React, { useMemo } from 'react'

import { AddCircle, ExpandMore } from '@mui/icons-material'
import { DynamicList, reorder } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { DropResult } from 'react-beautiful-dnd'
import { CharacterDocument, Companion } from '../../../../types/Character'
import { SectionHeader } from '../../CharacterSheet'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

export const CompanionsTab: React.FC = () => {
  const dispatch = useAppDispatch()
  const { activeCharacter } = useAppSelector((state) => state.characterSheet)
  const companions = useMemo(() => activeCharacter?.companions || [], [activeCharacter?.companions])

  const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
    dispatch(characterSheetActions.updateCharacter(update))
  }

  const addNewCompanion = () => {
    dispatch(characterSheetActions.addNewCompanion())
  }

  const updateCompanion = (update: Partial<Companion>, index: number) => {
    dispatch(characterSheetActions.updateCompanion({ update, index }))
  }

  const deleteCompanion = (index: number) => {
    dispatch(characterSheetActions.deleteCompanion(index))
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
        columnGap: { md: 4, sm: 2, xs: 1 },
        flexWrap: 'wrap',
        maxWidth: '47rem',
      }}
    >
      <Accordion defaultExpanded sx={{ maxWidth: '65rem', flexGrow: 1, mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <SectionHeader>Companions</SectionHeader>
            <IconButton
              onClick={(event) => {
                addNewCompanion()
                event.stopPropagation()
              }}
              sx={{ mb: 0.75 }}
            >
              <AddCircle />
            </IconButton>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ overflowY: 'auto', maxHeight: '42.5vh' }}>
          <DynamicList droppableId="companions" onDragEnd={onCompanionReorder}>
            {companions.map((companion, index) => (
              <DynamicListItem key={companion.id} id={companion.id} index={index}>
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
                  <Tooltip title="Delete Companion">
                    <IconButton onClick={() => deleteCompanion(index)}>
                      <AddCircle />
                    </IconButton>
                  </Tooltip>
                </Box>
              </DynamicListItem>
            ))}
          </DynamicList>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
