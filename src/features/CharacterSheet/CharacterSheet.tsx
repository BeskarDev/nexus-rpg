import { useColorMode } from '@docusaurus/theme-common'
import { Box, Tab, Tabs, TextField, Typography, styled } from '@mui/material'
import React from 'react'
import { StatisticsTab } from './CharacterSheetTabs/00_Statistics/StatisticsTab'
import { SkillsTab } from './CharacterSheetTabs/01_Skills/SkillsTab'
import { ItemsTab } from './CharacterSheetTabs/02_Items/ItemsTab'
import { SpellsTab } from './CharacterSheetTabs/03_Spells/SpellsTab'
import { PersonalTab } from './CharacterSheetTabs/04_Personal/PersonalTab'
import { SharedNotes } from './CharacterSheetTabs/05_SharedNotes/SharedNotes'
import { useAppSelector } from './hooks/useAppSelector'
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

export const CharacterSheet: React.FC = () => {
	const [activeTab, setActiveTab] = React.useState(0)
	const { isMobile } = useDeviceSize()
	const { colorMode } = useColorMode()

	const { activeCharacter } = useAppSelector((state) => state.characterSheet)

	if (!activeCharacter) {
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
							top: '116px',
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
							<Tab id="5" label="Shared Notes" />
						</Tabs>
					</Box>
					{activeTab === 0 && <StatisticsTab />}
					{activeTab === 1 && <SkillsTab />}
					{activeTab === 2 && <ItemsTab />}
					{activeTab === 3 && <SpellsTab />}
					{activeTab === 4 && <PersonalTab />}
					{activeTab === 5 && <SharedNotes />}
				</>
			)}
			{!isMobile && (
				<>
					<Typography variant="h6">Statistics</Typography>
					<StatisticsTab />
					<Typography variant="h6">Skills</Typography>
					<SkillsTab />
					<Typography variant="h6">Items</Typography>
					<ItemsTab />
					<Typography variant="h6">Spells</Typography>
					<SpellsTab />
					<Typography variant="h6">Personal</Typography>
					<PersonalTab />
					<SharedNotes />
				</>
			)}
		</>
	)
}
