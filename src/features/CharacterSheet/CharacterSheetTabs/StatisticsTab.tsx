import { Box } from '@mui/material'
import React from 'react'
import { Character } from '../CharacterList/CharacterList'
import { AttributeField, SectionHeader } from '../CharacterSheet'

export type StatisticsTabProps = {
	character: Character
	updateCharacter: (newChar: Partial<Character>) => void
}

export const StatisticsTab: React.FC<StatisticsTabProps> = ({
	character,
	updateCharacter,
}) => {
	return (
		<Box>
			<SectionHeader>Attributes</SectionHeader>
			<Box sx={{ display: 'flex', gap: 2 }}>
				<AttributeField
					value={character.strength}
					onChange={(event) =>
						updateCharacter({ strength: event.target.value })
					}
					label="Strength"
				/>
				<AttributeField
					value={character.agility}
					onChange={(event) => updateCharacter({ agility: event.target.value })}
					label="Agility"
				/>
				<AttributeField
					value={character.spirit}
					onChange={(event) => updateCharacter({ spirit: event.target.value })}
					label="Spirit"
				/>
				<AttributeField
					value={character.mind}
					onChange={(event) => updateCharacter({ mind: event.target.value })}
					label="Mind"
				/>
			</Box>
		</Box>
	)
}
