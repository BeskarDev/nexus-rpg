import { Box, Tabs, Tab, TextField, styled, Typography } from '@mui/material'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import React, { useEffect } from 'react'
import { Character } from './CharacterList/CharacterList'
import { StatisticsTab } from './CharacterSheetTabs/StatisticsTab'

export const AttributeField = styled(TextField)({
	maxWidth: '5rem',
	borderRadius: 4,
})
AttributeField.defaultProps = {
	size: 'medium',
	inputProps: {
		sx: {
			textAlign: 'center',
		},
	},
}

export const SectionHeader = styled(Typography)(({ theme }) => ({
	marginBottom: `${theme.spacing(0.75)} !important`,
}))
SectionHeader.defaultProps = {
	fontWeight: 'bold',
}

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
					variant="scrollable"
					scrollButtons={false}
					allowScrollButtonsMobile
				>
					<Tab id="0" label="Statistics" />
					<Tab id="1" label="Equipment" />
					<Tab id="2" label="Spells" />
					<Tab id="2" label="Social" />
					<Tab id="2" label="Other" />
				</Tabs>
			</Box>
			{activeTab === 0 && (
				<StatisticsTab
					character={character}
					updateCharacter={updateCharacter}
				/>
			)}
		</>
	)
}
