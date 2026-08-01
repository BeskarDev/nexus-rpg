import { Box, Typography, styled } from '@mui/material'
import React, { useEffect } from 'react'
import { useDeviceSize } from './utils/useDeviceSize'
import { mobileTabsConfig, desktopTabsConfig, getTabComponent } from './utils'
import { SheetTabBar } from './components'

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

	const handleTabChange = (newValue: number) => {
		setActiveTab(newValue)
	}

	return (
		<Box
			sx={{
				maxWidth: 'var(--cs-max-width-page)',
				mx: 'auto',
			}}
		>
			{isMobile && (
				<>
					{/* Sticky: seven tabs on a phone are how you move around the sheet, and
						they must not scroll away under a long list. */}
					<Box
						sx={{
							mb: 2,
							position: 'sticky',
							top: '116px',
							zIndex: 100,
							backgroundColor: 'var(--ifm-background-color)',
						}}
					>
						<SheetTabBar
							tabs={mobileTabsConfig}
							value={activeTab}
							onChange={handleTabChange}
						/>
					</Box>
					{(() => {
						const TabComponent = getTabComponent(activeTab, true)
						return TabComponent ? <TabComponent /> : null
					})()}
				</>
			)}
			{!isMobile && (
				<Box
					sx={{
						mb: 2,
						display: 'flex',
						flexWrap: 'wrap',
						gap: 3, // theme.spacing(3) = 24px, equivalent to --cs-panel-gap
						justifyContent: 'center',
						backgroundColor: 'var(--ifm-background-color)',
					}}
				>
					<Box sx={{ mt: 1, maxWidth: 'var(--cs-max-width-md)' }}>
						{(() => {
							const StatisticsTabComponent = mobileTabsConfig.find(
								(tab) => tab.label === 'Statistics',
							)?.component
							return StatisticsTabComponent ? <StatisticsTabComponent /> : null
						})()}
					</Box>
					<Box
						sx={{
							flex: 1,
							minWidth: 0,
							maxWidth: {
								md: 'var(--cs-max-width-sm)',
								lg: 'var(--cs-max-width-md)',
								xl: 'var(--cs-max-width-xl)',
							},
						}}
					>
						{/* The bar owns its own overflow now — the wrapper that used to add
							`overflow-x: auto` around MUI's `Tabs` is gone with it. */}
						<Box sx={{ mb: 2 }}>
							<SheetTabBar
								tabs={desktopTabsConfig}
								value={activeTab}
								onChange={handleTabChange}
							/>
						</Box>
						{(() => {
							const TabComponent = getTabComponent(activeTab, false)
							return TabComponent ? <TabComponent /> : null
						})()}
					</Box>
				</Box>
			)}
		</Box>
	)
}
