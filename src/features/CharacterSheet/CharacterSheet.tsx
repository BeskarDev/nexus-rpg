import { useColorMode } from '@docusaurus/theme-common'
import { Box, Tab, Tabs, TextField, Typography, styled } from '@mui/material'
import React from 'react'
import { DeepPartial } from './CharacterSheetContainer'
import { StatisticsTab } from './CharacterSheetTabs/00_Statistics/StatisticsTab'
import { SkillsTab } from './CharacterSheetTabs/01_Skills/SkillsTab'
import { ItemsTab } from './CharacterSheetTabs/02_Items/ItemsTab'
import { SpellsTab } from './CharacterSheetTabs/03_Spells/SpellsTab'
import { PersonalTab } from './CharacterSheetTabs/04_Personal/PersonalTab'
import { Character } from './types/Character'
import { useDeviceSize } from './utils/useDeviceSize'

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
	const { isMobile } = useDeviceSize()
	const { colorMode } = useColorMode()

	if (!character) {
		return undefined
	}

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue)
	}

	return (
		<>
			{isMobile && (
				<>
					<Box
						sx={{
							mb: 2,
							display: 'flex',
							justifyContent: 'center',
							position: 'sticky',
							top: '117px',
							zIndex: 100,
							backgroundColor:
								colorMode === 'dark' ? 'var(--ifm-background-color)' : 'white',
						}}
					>
						<Tabs
							value={activeTab}
							onChange={handleTabChange}
							variant="scrollable"
							scrollButtons={false}
							allowScrollButtonsMobile
						>
							<Tab id="0" label="Statistics" />
							<Tab id="1" label="Skills" />
							<Tab id="2" label="Items" />
							<Tab id="3" label="Spells" />
							<Tab id="4" label="Personal" />
						</Tabs>
					</Box>
					{activeTab === 0 && (
						<StatisticsTab
							character={character}
							updateCharacter={updateCharacter}
						/>
					)}
					{activeTab === 1 && (
						<SkillsTab
							character={character}
							updateCharacter={updateCharacter}
						/>
					)}
					{activeTab === 2 && (
						<ItemsTab character={character} updateCharacter={updateCharacter} />
					)}
					{activeTab === 3 && (
						<SpellsTab
							character={character}
							updateCharacter={updateCharacter}
						/>
					)}
					{activeTab === 4 && (
						<PersonalTab
							character={character}
							updateCharacter={updateCharacter}
						/>
					)}
				</>
			)}
			{!isMobile && (
				<>
					<Typography variant="h6">Statistics</Typography>
					<StatisticsTab
						character={character}
						updateCharacter={updateCharacter}
					/>
					<Typography variant="h6">Skills</Typography>
					<SkillsTab character={character} updateCharacter={updateCharacter} />
					<Typography variant="h6">Items</Typography>
					<ItemsTab character={character} updateCharacter={updateCharacter} />
					<Typography variant="h6">Spells</Typography>
					<SpellsTab character={character} updateCharacter={updateCharacter} />
					<Typography variant="h6">Personal</Typography>
					<PersonalTab
						character={character}
						updateCharacter={updateCharacter}
					/>
				</>
			)}
		</>
	)
}
