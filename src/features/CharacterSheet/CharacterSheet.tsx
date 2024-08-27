import { useColorMode } from '@docusaurus/theme-common'
import { Box, Tab, Tabs, TextField, Typography, styled } from '@mui/material'
import React from 'react'
import { StatisticsTab } from './CharacterSheetTabs/00_Statistics/StatisticsTab'
import { SkillsTab } from './CharacterSheetTabs/01_Skills/SkillsTab'
import { ItemsTab } from './CharacterSheetTabs/02_Items/ItemsTab'
import { SpellsTab } from './CharacterSheetTabs/03_Spells/SpellsTab'
import { PersonalTab } from './CharacterSheetTabs/04_Personal/PersonalTab'
import { SharedNotes } from './CharacterSheetTabs/05_SharedNotes/SharedNotes'
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
					<Box
						sx={{
							mb: 2,
							display: 'flex',
							flexWrap: 'wrap',
							gap: 2,
							justifyContent: 'left',
							backgroundColor:
								colorMode === 'dark' ? 'var(--ifm-background-color)' : 'white',
						}}
					>
						<Box sx={{ mt: 1, maxWidth: '30rem' }}>
							<StatisticsTab />
						</Box>
						<Box
							sx={{
								maxWidth: { lg: '40rem', xl: '49rem' },
							}}
						>
							<Tabs
								value={activeTab}
								onChange={handleTabChange}
								variant="scrollable"
								scrollButtons={false}
								allowScrollButtonsMobile
								sx={{ mb: 2 }}
							>
								<Tab id="0" label="Skills" />
								<Tab id="1" label="Items" />
								<Tab id="2" label="Spells" />
								<Tab id="3" label="Personal" />
								<Tab id="4" label="Shared Notes" />
							</Tabs>
							{activeTab === 0 && <SkillsTab />}
							{activeTab === 1 && <ItemsTab />}
							{activeTab === 2 && <SpellsTab />}
							{activeTab === 3 && <PersonalTab />}
							{activeTab === 4 && <SharedNotes />}
						</Box>
					</Box>
				</>
			)}
		</>
	)
}
