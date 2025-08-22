import { useMemo, useState } from 'react'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Settings, Remove, Add } from '@mui/icons-material'
import { Box, IconButton, Menu, Typography, Button, LinearProgress } from '@mui/material'
import React from 'react'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { calculateMaxHp, calculateBaseHpFromStrength } from '../../utils/calculateHp'
import { calculateCharacterLevel } from '../../utils/calculateCharacterLevel'

export const HpField = () => {
	const dispatch = useAppDispatch()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [damageHealAmount, setDamageHealAmount] = useState<number>(0)
	const [woundHelperText, setWoundHelperText] = useState<string>('')
	const open = Boolean(anchorEl)
	
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { health, fatigue, strength } = activeCharacter.statistics
	const totalXp = activeCharacter.skills.xp.total
	const characterLevel = calculateCharacterLevel(totalXp)
	const baseHp = calculateBaseHpFromStrength(strength.value)

	// Calculate max HP using the new formula
	const maxHp = useMemo(() => {
		return calculateMaxHp(strength.value, totalXp, health.maxHpModifier || 0)
	}, [strength.value, totalXp, health.maxHpModifier])

	// Calculate effective max HP (minus fatigue penalty)
	const fatigueHpPenalty = (fatigue?.current || 0) * 2
	const effectiveMaxHp = maxHp - fatigueHpPenalty

	// Calculate HP bar color and progress
	const hpPercentage = effectiveMaxHp > 0 ? (health.current / effectiveMaxHp) * 100 : 0
	const getHpColor = () => {
		if (hpPercentage >= 50) return 'success'
		if (hpPercentage >= 20) return 'warning'
		return 'error'
	}

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
		setWoundHelperText('')
	}

	const applyDamageOrHealing = (isDamage: boolean) => {
		if (damageHealAmount <= 0) return

		let newCurrentHp = health.current
		let woundText = ''

		if (isDamage) {
			newCurrentHp = Math.max(0, health.current - damageHealAmount)
			
			// Calculate wounds based on damage
			if (health.current > 0 && newCurrentHp <= 0) {
				woundText = '1 wound (HP dropped to 0 or below)'
			}
			
			const excessDamage = damageHealAmount - health.current
			if (excessDamage > 0) {
				if (excessDamage >= effectiveMaxHp * 2) {
					woundText = '2 additional wounds (damage exceeds twice max HP)'
				} else if (excessDamage >= effectiveMaxHp) {
					woundText = '1 additional wound (damage exceeds max HP)'
				}
			}
		} else {
			// Healing
			newCurrentHp = Math.min(effectiveMaxHp, health.current + damageHealAmount)
		}

		updateCharacter({
			statistics: { health: { current: newCurrentHp } },
		})

		if (woundText) {
			setWoundHelperText(woundText)
			setTimeout(() => setWoundHelperText(''), 5000) // Clear after 5 seconds
		}

		setDamageHealAmount(0)
	}

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					columnGap: 0.5,
				}}
			>
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					{/* HP Display */}
					<Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
						{health.current}/{maxHp} HP
					</Typography>
					
					{/* HP Bar */}
					<LinearProgress
						variant="determinate"
						value={Math.min(100, hpPercentage)}
						color={getHpColor()}
						sx={{
							width: '120px',
							height: '6px',
							borderRadius: '3px',
							mb: 0.5,
						}}
					/>
					
					{/* Current HP Input (simplified for surface) - REMOVED per feedback */}
				</Box>
				
				<IconButton size="small" onClick={handleClick} sx={{ ml: 0.5 }}>
					<Settings fontSize="small" />
				</IconButton>
			</Box>
			
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{ sx: { p: 2, maxWidth: '20rem' } }}
			>
				<SectionHeader>HP Configuration</SectionHeader>
				<Typography variant="subtitle2" sx={{ mb: 2 }}>
					Max HP: {baseHp} + {(characterLevel - 1) * 2} + {health.maxHpModifier || 0} = {maxHp}
				</Typography>
				
				{/* Current HP - First and larger */}
				<AttributeField
					type="number"
					value={health.current}
					onChange={(event) => {
						const newCurrent = Number(event.target.value)
						const clampedCurrent = Math.min(newCurrent, effectiveMaxHp)
						updateCharacter({
							statistics: { health: { current: clampedCurrent } },
						})
					}}
					label="Current HP"
					sx={{ mb: 1 }}
				/>
				
				{/* Max HP (disabled, calculated) */}
				<AttributeField
					type="number"
					size="small"
					value={maxHp}
					disabled
					label="Max HP (Calculated)"
					sx={{ mb: 1 }}
				/>
				
				{/* Temp HP */}
				<AttributeField
					type="number"
					size="small"
					value={health.temp}
					onChange={(event) =>
						updateCharacter({
							statistics: { health: { temp: Number(event.target.value) } },
						})
					}
					label="Temp HP"
					sx={{ mb: 1 }}
				/>
				
				{/* Max HP Modifier */}
				<AttributeField
					type="number"
					size="small"
					value={health.maxHpModifier || 0}
					onChange={(event) =>
						updateCharacter({
							statistics: { health: { maxHpModifier: Number(event.target.value) } },
						})
					}
					label="Max HP Modifier"
					sx={{ mb: 2 }}
				/>
				
				{/* Damage/Healing Controls - TextField between buttons */}
				<Typography variant="subtitle2" sx={{ mb: 1 }}>
					Damage / Healing
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
					<Button
						variant="outlined"
						color="error"
						size="small"
						onClick={() => applyDamageOrHealing(true)}
						startIcon={<Remove />}
						disabled={damageHealAmount <= 0}
					>
						Damage
					</Button>
					<AttributeField
						type="number"
						size="small"
						value={damageHealAmount}
						onChange={(event) => setDamageHealAmount(Number(event.target.value))}
						label="Amount"
						sx={{ flexGrow: 1 }}
					/>
					<Button
						variant="outlined"
						color="success"
						size="small"
						onClick={() => applyDamageOrHealing(false)}
						startIcon={<Add />}
						disabled={damageHealAmount <= 0}
					>
						Healing
					</Button>
				</Box>
				
				{/* Wound Helper Text */}
				{woundHelperText && (
					<Typography variant="caption" color="warning.main" sx={{ fontWeight: 'bold' }}>
						⚠️ {woundHelperText}
					</Typography>
				)}
			</Menu>
		</>
	)
}