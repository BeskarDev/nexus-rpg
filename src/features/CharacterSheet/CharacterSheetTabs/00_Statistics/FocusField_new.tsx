import React, { useMemo, useState } from 'react'
import { Box } from '@mui/material'
import { AttributeField } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useResourceField } from '../../hooks/useResourceField'
import { ResourceControls } from '../../components/ResourceControls'
import { characterSheetActions } from '../../characterSheetReducer'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { calculateMaxFocus } from '../../utils/calculateFocus'

export const FocusField = () => {
	const dispatch = useAppDispatch()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { focus, focusDetails } = activeCharacter.spells

	const maxFocus = useMemo(() => {
		return calculateMaxFocus(
			activeCharacter,
			focusDetails?.maxFocusModifier || 0,
		)
	}, [
		activeCharacter.statistics.mind.value,
		activeCharacter.statistics.spirit.value,
		activeCharacter.spells.magicSkill,
		activeCharacter.skills.skills,
		focusDetails?.maxFocusModifier,
	])

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const resourceField = useResourceField({
		current: focus.current,
		max: maxFocus,
		onChange: (newCurrent: number) => {
			updateCharacter({
				spells: {
					focus: {
						current: newCurrent,
					},
				},
			})
		},
	})

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleCloseMenu = () => {
		setAnchorEl(null)
	}

	return (
		<Box>
			<Box display="flex" gap={2} mb={2}>
				<AttributeField
					label="Max Focus Modifier"
					value={focusDetails?.maxFocusModifier || 0}
					onChange={(newValue) =>
						updateCharacter({
							spells: {
								focusDetails: { maxFocusModifier: newValue },
							},
						})
					}
				/>
			</Box>

			<ResourceControls
				current={focus.current}
				max={maxFocus}
				percentage={resourceField.percentage}
				label="Focus"
				color="info"
				anchorEl={anchorEl}
				onOpenMenu={handleOpenMenu}
				onCloseMenu={handleCloseMenu}
				onApplyDamage={resourceField.applyDamage}
				onApplyHealing={resourceField.applyHealing}
				adjustmentAmount={resourceField.adjustmentAmount}
				onAdjustmentChange={resourceField.setAdjustmentAmount}
				showTempControls={false}
			/>
		</Box>
	)
}