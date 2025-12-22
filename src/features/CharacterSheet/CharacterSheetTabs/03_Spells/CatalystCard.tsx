import React, { useState } from 'react'
import { TextField, Menu, Typography } from '@mui/material'
import { FlashOn } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { SectionHeader } from '../../CharacterSheet'

interface CatalystCardProps {
	spellCatalystDamage: number
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

export const CatalystCard: React.FC<CatalystCardProps> = ({
	spellCatalystDamage,
	updateCharacter,
}) => {
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
			header={<CardHeader icon={<FlashOn />} label="Catalyst" color={UI_COLORS.lightBlue} />}
			tooltip="Bonus damage per success level from your Spell Catalyst"
			minWidth="4.5rem"
			showConfigButton
			onConfigClick={handleClick}
			configMenu={
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{ sx: { p: 2, maxWidth: '12rem' } }}
				>
					<SectionHeader>Spell Catalyst Bonus</SectionHeader>
					<TextField
						type="number"
						size="small"
						value={spellCatalystDamage || 0}
						onChange={(event) =>
							updateCharacter({
								spells: {
									spellCatalystDamage: parseInt(event.target.value) || 0,
								},
							})
						}
						label="Catalyst Bonus"
						fullWidth
						sx={{ mt: 1 }}
					/>
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
				{spellCatalystDamage || 0}
			</Typography>
		</CharacterSheetCard>
	)
}
