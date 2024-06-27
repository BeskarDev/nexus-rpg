import { Box, Tabs, Tab, TextField } from '@mui/material'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import React, { useEffect } from 'react'
import { Character } from './CharacterList/CharacterList'

export type CharacterSheetProps = {
	character: Character
	updateCharacter: (newChar: Partial<Character>) => void
}

export const CharacterSheet: React.FC<CharacterSheetProps> = ({
	character,
	updateCharacter,
}) => {
	const [activeTab, setActiveTab] = React.useState(0)

	if (!character) {
		return undefined
	}

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue)
	}

	return (
		<>
			<Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
				<Tabs
					value={activeTab}
					onChange={handleTabChange}
					centered
					variant="scrollable"
					scrollButtons="auto"
					allowScrollButtonsMobile
				>
					<Tab id="0" label="Statistics" />
					<Tab id="1" label="Equipment" />
					<Tab id="2" label="Spells" />
					<Tab id="2" label="Social" />
					<Tab id="2" label="Other" />
				</Tabs>
			</Box>
			<Box sx={{ display: 'flex', gap: 2 }}>
				<TextField
					value={character.strength}
					onChange={(event) =>
						updateCharacter({ strength: event.target.value })
					}
					label="Strength"
				/>
				<TextField
					value={character.agility}
					onChange={(event) =>
						updateCharacter({ strength: event.target.value })
					}
					label="Agility"
				/>
				<TextField
					value={character.spirit}
					onChange={(event) =>
						updateCharacter({ strength: event.target.value })
					}
					label="Spirit"
				/>
				<TextField
					value={character.mind}
					onChange={(event) =>
						updateCharacter({ strength: event.target.value })
					}
					label="Mind"
				/>
			</Box>
		</>
	)
}
