import React, { useState } from 'react'
import { Box, Menu, Button, LinearProgress, Typography, alpha, TextField } from '@mui/material'
import { Favorite } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { SectionHeader } from '../../CharacterSheet'

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
	const open = Boolean(anchorEl)

	const hpPercentage = maxHP > 0 ? (currentHP / maxHP) * 100 : 0
	const hpColor = hpPercentage >= 50 ? UI_COLORS.success : hpPercentage >= 20 ? UI_COLORS.warning : UI_COLORS.danger

	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleDamage = (amount: number) => {
		const newValue = Math.max(0, currentHP - amount)
		onCurrentHPChange(newValue.toString())
		handleClose()
	}

	const handleHeal = (amount: number) => {
		const newValue = Math.min(maxHP, currentHP + amount)
		onCurrentHPChange(newValue.toString())
		handleClose()
	}

	const handleFullHeal = () => {
		onCurrentHPChange(maxHP.toString())
		handleClose()
	}

	return (
		<>
			<CharacterSheetCard
				header={<CardHeader icon={<Favorite />} label="HP" color={UI_COLORS.danger} />}
				tooltip="Companion hit points"
				minWidth="10rem"
				showConfigButton
				onConfigClick={handleClick}
				footer={
					<Box sx={{ width: '100%', mt: 0.5 }}>
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
					>
						<Box sx={{ p: 2, minWidth: 200 }}>
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

							<Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
								Quick Actions
							</Typography>
							<Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
								<Button
									variant="outlined"
									size="small"
									onClick={() => handleDamage(1)}
									disabled={currentHP === 0}
									fullWidth
								>
									-1
								</Button>
								<Button
									variant="outlined"
									size="small"
									onClick={() => handleDamage(5)}
									disabled={currentHP < 5}
									fullWidth
								>
									-5
								</Button>
								<Button
									variant="outlined"
									size="small"
									onClick={() => handleHeal(1)}
									disabled={currentHP >= maxHP}
									fullWidth
								>
									+1
								</Button>
							</Box>
							<Button
								variant="contained"
								size="small"
								onClick={handleFullHeal}
								disabled={currentHP === maxHP}
								fullWidth
							>
								Full Heal
							</Button>
						</Box>
					</Menu>
				}
			>
				<Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, justifyContent: 'center' }}>
					<Typography
						sx={{
							fontWeight: 'bold',
							fontSize: '1.1rem',
							lineHeight: 1.2,
							color: hpColor,
						}}
					>
						{currentHP}
					</Typography>
					<Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
						/ {maxHP}
					</Typography>
				</Box>
			</CharacterSheetCard>
		</>
	)
}
