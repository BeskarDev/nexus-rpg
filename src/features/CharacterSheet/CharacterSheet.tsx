import { Box, Tab, Tabs, TextField, Typography, styled } from '@mui/material'
import React, { useEffect } from 'react'
import { StatisticsTab } from './CharacterSheetTabs/00_Statistics/StatisticsTab'
import { SkillsTab } from './CharacterSheetTabs/01_Skills/SkillsTab'
import { ItemsTab } from './CharacterSheetTabs/02_Items/ItemsTab'
import { SpellsTab } from './CharacterSheetTabs/03_Spells/SpellsTab'
import { PersonalTab } from './CharacterSheetTabs/04_Personal/PersonalTab'
import { CompanionsTab } from './CharacterSheetTabs/05_Companions/CompanionsTab'
import { SharedNotes } from './CharacterSheetTabs/06_SharedNotes/SharedNotes'
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
	marginBottom: `${theme.spacing(0.75)} `,
}))
SectionHeader.defaultProps = {
	fontWeight: 'bold',
}

export const CharacterSheet: React.FC = () => {
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const initialActiveTab = urlParams.get('tab') ?? '0'
	const [activeTab, setActiveTab] = React.useState<number>(
		Number.parseInt(initialActiveTab),
	)

	const { isMobile, viewChanged } = useDeviceSize()

	useEffect(() => {
		urlParams.set('tab', '' + activeTab)
		const newUrl = `${window.location.pathname}?${urlParams.toString()}`
		window.history.replaceState({}, '', newUrl)
	}, [activeTab])

	useEffect(() => {
		if (viewChanged) {
			// active tab count has one more item in mobile view
			// to keep the same view, the active tab has to be adjusted
			if (isMobile) {
				setActiveTab(activeTab + 1)
			} else {
				setActiveTab(activeTab > 0 ? activeTab - 1 : 0)
			}
		}
	}, [isMobile])

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
							backgroundColor: 'var(--ifm-background-color)',
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
							<Tab id="5" label="Companions" />
							<Tab id="6" label="Shared Notes" />
						</Tabs>
					</Box>
					{activeTab === 0 && <StatisticsTab />}
					{activeTab === 1 && <SkillsTab />}
					{activeTab === 2 && <ItemsTab />}
					{activeTab === 3 && <SpellsTab />}
					{activeTab === 4 && <PersonalTab />}
					{activeTab === 5 && <CompanionsTab />}
					{activeTab === 6 && <SharedNotes />}
				</>
			)}
			{!isMobile && (
				<>
					<Box
						sx={{
							mb: 2,
							display: 'flex',
							flexWrap: 'wrap',
							gap: 6,
							justifyContent: 'left',
							backgroundColor: 'var(--ifm-background-color)',
						}}
					>
						<Box sx={{ mt: 1, maxWidth: '25rem' }}>
							<StatisticsTab />
						</Box>
						<Box
							sx={{
								maxWidth: { md: '25rem', lg: '35rem', xl: '60rem' },
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
								<Tab id="4" label="Companions" />
								<Tab id="5" label="Shared Notes" />
							</Tabs>
							{activeTab === 0 && <SkillsTab />}
							{activeTab === 1 && <ItemsTab />}
							{activeTab === 2 && <SpellsTab />}
							{activeTab === 3 && <PersonalTab />}
							{activeTab === 4 && <CompanionsTab />}
							{activeTab === 5 && <SharedNotes />}
						</Box>
					</Box>
				</>
			)}
		</>
	)
}
