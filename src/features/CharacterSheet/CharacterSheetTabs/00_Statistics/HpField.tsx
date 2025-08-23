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
import {
	calculateMaxHp,
	calculateBaseHpFromStrength,
} from '../../utils/calculateHp'
import { calculateCharacterLevel } from '../../utils/calculateCharacterLevel'

export const HpField = () => {
	const dispatch = useAppDispatch()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { health, fatigue, strength } = activeCharacter.statistics
	const totalXp = activeCharacter.skills.xp.total
	const characterLevel = calculateCharacterLevel(totalXp)

	const maxHp = useMemo(() => {
		return calculateMaxHp(strength.value, totalXp, health.maxHpModifier || 0)
	}, [strength.value, totalXp, health.maxHpModifier])

	const fatigueHpPenalty = (fatigue?.current || 0) * 2
	const effectiveMaxHp = maxHp - fatigueHpPenalty

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const resourceField = useResourceField({
		current: health.current,
		max: effectiveMaxHp,
		temp: health.temp || 0,
		onChange: (newCurrent: number, newTemp?: number) => {
			updateCharacter({
				statistics: {
					health: {
						current: newCurrent,
						temp: newTemp,
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
					label="Max HP Modifier"
					value={health.maxHpModifier || 0}
					onChange={(newValue) =>
						updateCharacter({
							statistics: {
								health: { maxHpModifier: newValue },
							},
						})
					}
				/>
			</Box>

			<ResourceControls
				current={health.current}
				max={effectiveMaxHp}
				temp={health.temp || 0}
				percentage={resourceField.percentage}
				label="HP"
				color="success"
				anchorEl={anchorEl}
				onOpenMenu={handleOpenMenu}
				onCloseMenu={handleCloseMenu}
				onApplyDamage={resourceField.applyDamage}
				onApplyHealing={resourceField.applyHealing}
				onApplyTemp={resourceField.applyTempResource}
				adjustmentAmount={resourceField.adjustmentAmount}
				onAdjustmentChange={resourceField.setAdjustmentAmount}
				showTempControls={true}
			/>
		</Box>
	)
}