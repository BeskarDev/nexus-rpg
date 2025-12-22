import React, { useState } from 'react'
import { Box, Menu, Button, LinearProgress, Typography, alpha, TextField } from '@mui/material'
import { Favorite, Remove, Add } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { SectionHeader, AttributeField } from '../../CharacterSheet'

interface CompanionHPCardProps {
	currentHP: number
	maxHP: number
	onCurrentHPChange: (value: string) => void
	onMaxHPChange: (value: string) => void
}

export const CompanionHPCard: React.FC<CompanionHPCardProps> = ({
	currentHP,
	maxHP,
	onCurrentHPChange,
	onMaxHPChange,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [damageHealAmount, setDamageHealAmount] = useState<number>(0)
	const open = Boolean(anchorEl)

	const hpPercentage = maxHP > 0 ? (currentHP / maxHP) * 100 : 0
	const hpColor = hpPercentage >= 50 ? UI_COLORS.success : hpPercentage >= 25 ? UI_COLORS.warning : UI_COLORS.danger

	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const applyDamageOrHealing = (isDamage: boolean) => {
		if (damageHealAmount <= 0) return

		let newCurrentHp = currentHP

		if (isDamage) {
			newCurrentHp = Math.max(0, currentHP - damageHealAmount)
		} else {
			newCurrentHp = Math.min(maxHP, currentHP + damageHealAmount)
		}

		onCurrentHPChange(newCurrentHp.toString())
		setDamageHealAmount(0)
	}

	return (
		<CharacterSheetCard
			header={<CardHeader icon={<Favorite />} label="HP" color={hpColor} />}
			tooltip="Companion hit points"
			minWidth="7rem"
			showConfigButton
			onConfigClick={handleClick}
			footer={
				<Box sx={{ width: '100%', mt: 0.5, px: 1 }}>
					<LinearProgress
						variant="determinate"
						value={hpPercentage}
						sx={{
							height: 4,
							borderRadius: 1,
							backgroundColor: (theme) => alpha(theme.palette.divider, 0.2),
							'& .MuiLinearProgress-bar': {
								backgroundColor: hpColor,
							},
						}}
					/>
				</Box>
			}
			configMenu={
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					transformOrigin={{ vertical: 'top', horizontal: 'right' }}
					MenuListProps={{ sx: { p: 2, minWidth: '12rem' } }}
				>
					<SectionHeader>HP Settings</SectionHeader>
					<TextField
						type="number"
						size="small"
						label="Max HP"
						value={maxHP || 0}
						onChange={(e) => onMaxHPChange(e.target.value)}
						fullWidth
						sx={{ mb: 2 }}
					/>

					<Typography variant="subtitle2" sx={{ mb: 1 }}>
						Damage / Healing
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
							onChange={(event) =>
								setDamageHealAmount(Number(event.target.value))
							}
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
				</Menu>
			}
		>
			<Typography
				sx={{
					fontWeight: 'bold',
					fontSize: '0.95rem',
					lineHeight: 1.2,
				}}
			>
				{currentHP} / {maxHP}
			</Typography>
		</CharacterSheetCard>
	)
}
