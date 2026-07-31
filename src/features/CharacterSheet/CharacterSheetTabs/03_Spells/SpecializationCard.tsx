import React from 'react'
import StatSigil from '@site/src/components/codex/StatSigil'
import { TextField } from '@mui/material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'

interface SpecializationCardProps {
	specialization: string
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

export const SpecializationCard: React.FC<SpecializationCardProps> = ({
	specialization,
	updateCharacter,
}) => {
	return (
		<CharacterSheetCard
			header={<CardHeader icon={<StatSigil name="specialization" size="1.15em" />} label="Specializations" color={UI_COLORS.amber} />}
			minWidth="16rem"
		>
			<TextField
				value={specialization}
				onChange={(e) => updateCharacter({ spells: { specialization: e.target.value } })}
				placeholder="Enter specializations..."
				variant="standard"
				sx={{
					'& .MuiInput-root': {
						fontSize: 'var(--nexus-text-lg)',
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
