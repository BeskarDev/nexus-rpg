import React, { useState } from 'react'
import {
	Box,
	Tooltip,
} from '@mui/material'
import { HelpOutline } from '@mui/icons-material'
import { CharacterDocument } from '../../../../../types/Character'
import { DeepPartial } from '../../../CharacterSheetContainer'
import { CoinsCard } from '../CoinsCard'
import { LoadCard } from '../LoadCard'

interface ItemsHeaderProps {
	coins: number
	currentLoad: number
	carryCapacity: number
	maxCapacity: number
	carryModifier: number
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

export const ItemsHeader: React.FC<ItemsHeaderProps> = ({
	coins,
	currentLoad,
	carryCapacity,
	maxCapacity,
	carryModifier,
	updateCharacter,
}) => {
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
			<CoinsCard coins={coins} updateCharacter={updateCharacter} />
			<LoadCard
				currentLoad={currentLoad}
				carryCapacity={carryCapacity}
				maxCapacity={maxCapacity}
				carryModifier={carryModifier}
				updateCharacter={updateCharacter}
			/>

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
