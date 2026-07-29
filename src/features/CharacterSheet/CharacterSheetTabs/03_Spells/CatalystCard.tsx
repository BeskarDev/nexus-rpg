import React from 'react'
import StatSigil from '@site/src/components/codex/StatSigil'
import { TextField } from '@mui/material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'

interface CatalystCardProps {
	spellCatalystDamage: number
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

export const CatalystCard: React.FC<CatalystCardProps> = ({
	spellCatalystDamage,
	updateCharacter,
}) => {
	return (
		<CharacterSheetCard
			header={<CardHeader icon={<StatSigil name="catalyst" size="1.15em" />} label="Catalyst" color={UI_COLORS.lightBlue} />}
			info="Bonus damage per success level from your Spell Catalyst"
			maxWidth="4.5rem"
		>
			<TextField
				type="number"
				value={spellCatalystDamage || 0}
				onChange={(event) =>
					updateCharacter({
						spells: {
							spellCatalystDamage: parseInt(event.target.value) || 0,
						},
					})
				}
				variant="standard"
				sx={{
					'& .MuiInput-root': {
						fontSize: '0.95rem',
						fontWeight: 'bold',
						'&:before, &:after': { display: 'none' },
					},
					'& input': {
						textAlign: 'center',
						padding: 0,
						height: 'auto',
						lineHeight: 1.2,
					},
					width: '100%',
				}}
			/>
		</CharacterSheetCard>
	)
}
