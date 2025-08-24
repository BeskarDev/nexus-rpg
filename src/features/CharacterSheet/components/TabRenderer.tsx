import React from 'react'
import { Tab, Tabs } from '@mui/material'
import { TabConfig } from '../constants/tabConfig'

interface TabRendererProps {
	tabConfig: TabConfig[]
	activeTab: number
	onTabChange: (event: React.SyntheticEvent, newValue: number) => void
	tabsStyle?: object
}

export const TabRenderer: React.FC<TabRendererProps> = ({
	tabConfig,
	activeTab,
	onTabChange,
	tabsStyle,
}) => {
	const ActiveComponent = tabConfig[activeTab]?.component

	return (
		<>
			<Tabs
				value={activeTab}
				onChange={onTabChange}
				variant="scrollable"
				scrollButtons={false}
				allowScrollButtonsMobile
				sx={tabsStyle}
			>
				{tabConfig.map((tab) => (
					<Tab key={tab.id} id={tab.id} label={tab.label} />
				))}
			</Tabs>
			{ActiveComponent && <ActiveComponent />}
		</>
	)
}