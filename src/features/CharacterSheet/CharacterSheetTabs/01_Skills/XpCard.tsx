import React, { useState } from 'react'
import { Box, Typography, Menu, TextField } from '@mui/material'
import { Stars } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { characterSheetActions } from '../../characterSheetReducer'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { SectionHeader } from '../../CharacterSheet'

export type XpCardProps = {
	total: number
	spent: number
}

export const XpCard: React.FC<XpCardProps> = ({ total, spent }) => {
	const dispatch = useAppDispatch()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const remaining = total - spent

	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<CharacterSheetCard
				header={<CardHeader icon={<Stars />} label="Experience" color={UI_COLORS.amber} />}
				minWidth="8rem"
				tooltip="Experience Points: Total earned and spent on skills and abilities"
				showConfigButton
				onConfigClick={handleClick}
				sx={{ alignSelf: 'flex-start' }}
				configMenu={
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{ sx: { p: 2, maxWidth: '12rem' } }}
					>
						<SectionHeader>Edit Total XP</SectionHeader>
						<TextField
							type="number"
							size="small"
							value={total}
							onChange={(event) =>
								updateCharacter({
									skills: { xp: { total: Number(event.target.value) } },
								})
							}
							label="Total XP"
							fullWidth
							sx={{ mt: 1 }}
						/>
					</Menu>
				}
			>
				<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'baseline' }}>
					<Typography
						sx={{
							fontWeight: 'bold',
							fontSize: '0.95rem',
							lineHeight: 1.2,
						}}
					>
						{spent}
					</Typography>
					<Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
						/ {total}
					</Typography>
					<Typography
						sx={{
							fontSize: '0.75rem',
							ml: 0.5,
							color: remaining >= 0 ? UI_COLORS.success : UI_COLORS.danger,
						}}
					>
						({remaining >= 0 ? '+' : ''}{remaining})
					</Typography>
				</Box>
			</CharacterSheetCard>
		</>
	)
}
