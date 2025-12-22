import React, { useState } from 'react'
import { Menu, TextField } from '@mui/material'
import { Paid } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { SectionHeader } from '../../CharacterSheet'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'

export type CoinsCardProps = {
	coins: number
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

export const CoinsCard: React.FC<CoinsCardProps> = ({ coins, updateCharacter }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<CharacterSheetCard
			header={<CardHeader icon={<Paid />} label="Coins" color={UI_COLORS.amber} />}
			showConfigButton
			onConfigClick={handleClick}
			tooltip="Coins: Your current wealth"
			minWidth="4.5rem"
			configMenu={
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
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
			}
		>
			{coins}
		</CharacterSheetCard>
	)
}
