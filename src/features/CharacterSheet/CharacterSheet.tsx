import { Box, Tab, Tabs, TextField, Typography, styled } from '@mui/material'
import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { DeepPartial } from './CharacterSheetContainer'
import { StatisticsTab } from './CharacterSheetTabs/StatisticsTab'
import { Character } from './types/Character'
import { SkillsTab } from './CharacterSheetTabs/SkillsTab'

export const AttributeField = styled(TextField)({
	maxWidth: '5rem',
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
	updateCharacter: (update: DeepPartial<Character>) => void
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
					<Tab id="1" label="Skills" />
					<Tab id="2" label="Equipment" />
					<Tab id="3" label="Spells" />
					<Tab id="4" label="Social" />
					<Tab id="5" label="Other" />
				</Tabs>
			</Box>
			<SwipeableViews
				index={activeTab}
				onChangeIndex={(index) => setActiveTab(index)}
				enableMouseEvents={false}
				animateHeight
			>
				<StatisticsTab
					character={character}
					updateCharacter={updateCharacter}
				/>
				<SkillsTab 
					character={character}
					updateCharacter={updateCharacter} />
				<div>tab 3</div>
				<div>tab 4</div>
				<div>tab 5</div>
				<div>tab 6</div>
			</SwipeableViews>
		</>
	)
}
