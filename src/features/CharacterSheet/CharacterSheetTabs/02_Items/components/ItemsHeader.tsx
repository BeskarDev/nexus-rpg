import React, { useState } from 'react'
import {
	Box,
	Tooltip,
	Theme,
	Typography,
	alpha,
	IconButton,
	Menu,
	TextField,
} from '@mui/material'
import { UI_COLORS } from '../../../../../utils/colors'
import {
	HelpOutline,
	Paid,
	FitnessCenter,
	Settings,
} from '@mui/icons-material'
import { CharacterDocument } from '../../../../../types/Character'
import { DeepPartial } from '../../../CharacterSheetContainer'
import { SectionHeader } from '../../../CharacterSheet'

interface ItemsHeaderProps {
	coins: number
	currentLoad: number
	carryCapacity: number
	maxCapacity: number
	carryModifier: number
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

const getLoadColor = (
	currentLoad: number,
	carryCapacity: number,
	maxCapacity: number,
) => {
	if (currentLoad >= maxCapacity) {
		return UI_COLORS.danger
	} else if (currentLoad >= carryCapacity) {
		return UI_COLORS.warning
	}
	return UI_COLORS.greyBlue
}

export const ItemsHeader: React.FC<ItemsHeaderProps> = ({
	coins,
	currentLoad,
	carryCapacity,
	maxCapacity,
	carryModifier,
	updateCharacter,
}) => {
	const [coinsAnchorEl, setCoinsAnchorEl] = useState<null | HTMLElement>(null)
	const [loadAnchorEl, setLoadAnchorEl] = useState<null | HTMLElement>(null)
	const loadColor = getLoadColor(currentLoad, carryCapacity, maxCapacity)

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'flex-start',
				flexWrap: 'wrap',
				mb: 2,
				gap: 0.75,
			}}
		>
			{/* Coins Card */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					minWidth: '4.5rem',
					borderRadius: 1,
					border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
					bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
					p: 0.5,
					position: 'relative',
				}}
			>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
						<Paid sx={{ fontSize: '0.7rem', color: UI_COLORS.amber }} />
						<Typography
							variant="caption"
							sx={{
								fontWeight: 700,
								fontSize: '0.55rem',
								color: UI_COLORS.amber,
								textTransform: 'uppercase',
							}}
						>
							Coins
						</Typography>
					</Box>
				<Typography
					sx={{
						fontWeight: 'bold',
						fontSize: '0.95rem',
						lineHeight: 1.2,
						textAlign: 'center',
					}}
				>
					{coins}
				</Typography>
				<IconButton
					size="small"
					onClick={(e) => setCoinsAnchorEl(e.currentTarget)}
					sx={{
						position: 'absolute',
						top: 0,
						right: 0,
						p: 0.25,
						opacity: 0.6,
						'&:hover': { opacity: 1 },
					}}
				>
					<Settings sx={{ fontSize: '0.65rem' }} />
				</IconButton>
			</Box>
			<Menu
				anchorEl={coinsAnchorEl}
				open={Boolean(coinsAnchorEl)}
				onClose={() => setCoinsAnchorEl(null)}
				MenuListProps={{ sx: { p: 2, maxWidth: '12rem' } }}
			>
				<SectionHeader>Edit Coins</SectionHeader>
				<TextField
					type="number"
					size="small"
					value={coins}
					onChange={(event) =>
						updateCharacter({ items: { coins: Number(event.target.value) } })
					}
					label="Coins"
					fullWidth
					sx={{ mt: 1 }}
				/>
			</Menu>

			{/* Load Card */}
			<Tooltip
				title={
					<>
						<b>Encumbered.</b> While encumbered:
						<br />• +1 bane on STR/AGI movement rolls
						<br />• Can't Dash or Evade
						<br />• +1 Fatigue during travel
						<br />
						Max: 2× carrying capacity
					</>
				}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						minWidth: '5.5rem',
						borderRadius: 1,
						border: (theme) =>
							`1px solid ${currentLoad >= carryCapacity ? loadColor : alpha(theme.palette.divider, 0.2)}`,
						bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
						p: 0.5,
						position: 'relative',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
						<FitnessCenter sx={{ fontSize: '0.7rem', color: loadColor }} />
						<Typography
							variant="caption"
							sx={{
								fontWeight: 700,
								fontSize: '0.55rem',
								color: loadColor,
								textTransform: 'uppercase',
							}}
						>
							Load
						</Typography>
					</Box>
					<Typography
						sx={{
							fontWeight: 'bold',
							fontSize: '0.95rem',
							lineHeight: 1.2,
							textAlign: 'center',
							color: loadColor,
						}}
					>
						{currentLoad}/{carryCapacity}
					</Typography>
					<Typography
						variant="caption"
						sx={{ fontSize: '0.55rem', color: 'text.secondary' }}
					>
						max {maxCapacity}
					</Typography>
					<IconButton
						size="small"
						onClick={(e) => setLoadAnchorEl(e.currentTarget)}
						sx={{
							position: 'absolute',
							top: 0,
							right: 0,
							p: 0.25,
							opacity: 0.6,
							'&:hover': { opacity: 1 },
						}}
					>
						<Settings sx={{ fontSize: '0.65rem' }} />
					</IconButton>
				</Box>
			</Tooltip>
			<Menu
				anchorEl={loadAnchorEl}
				open={Boolean(loadAnchorEl)}
				onClose={() => setLoadAnchorEl(null)}
				MenuListProps={{ sx: { p: 2, maxWidth: '12rem' } }}
			>
				<SectionHeader>Carry Modifier</SectionHeader>
				<Typography variant="caption" color="text.secondary">
					Base: ½ STR + 8
				</Typography>
				<TextField
					type="number"
					size="small"
					value={carryModifier}
					onChange={(event) =>
						updateCharacter({
							items: {
								encumbrance: { carryModifier: Number(event.target.value) },
							},
						})
					}
					label="Modifier"
					fullWidth
					sx={{ mt: 1 }}
				/>
			</Menu>

			{/* Help icon */}
			<Tooltip
				title={
					<>
						<b>Encumbered.</b> While encumbered, you suffer the following
						effects:
						<br />
						- You suffer +1 bane on Strength/Agility rolls for any kind of
						movement (climbing, swimming, jumping, …)
						<br />
						- You can't take the Dash Action or the Evade Quick Action
						<br />- Whenever you suffer Fatigue during travel, you suffer +1
						Fatigue
						<br />
						You can never physically carry more than 2 x your carrying capacity.
					</>
				}
			>
				<HelpOutline fontSize="small" sx={{ mt: 0.5, color: 'text.secondary' }} />
			</Tooltip>
		</Box>
	)
}
