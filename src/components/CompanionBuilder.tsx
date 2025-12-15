import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Paper,
	Tabs,
	Tab,
	Typography,
	Grid,
} from '@mui/material'
import { CompanionBuilderProps } from '../types/companion'
import { companionBuilderActions } from '../features/CompanionBuilder/companionBuilderReducer'
import { useCompanionBuilderState } from '../hooks/useCompanionBuilderState'
import { useDeviceSize } from '../features/CharacterSheet/utils/useDeviceSize'
import { CompanionBuilderFormComponent } from './CompanionBuilderFormComponent'
import { CompanionStatBlock } from './CompanionStatBlock'
import { CompanionOutputPanel } from './CompanionOutputPanel'
import { TabPanel } from './TabPanel'
import { generateMarkdown } from '../utils/typescript/companion/companionFormatting'

export const CompanionBuilder: React.FC<CompanionBuilderProps> = ({
	showImportButton = false,
	onImportCompanion,
}) => {
	const { isMobile } = useDeviceSize()
	const [open, setOpen] = useState(false)
	const [activeTab, setActiveTab] = useState(0)
	const dispatch = useDispatch()
	const { state, builtCompanion } = useCompanionBuilderState()

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue)
	}

	const handleResetAndTab = () => {
		dispatch(companionBuilderActions.resetBuilder())
		setActiveTab(0)
	}

	const handleImportFromForm = () => {
		if (builtCompanion && onImportCompanion) {
			const markdown = generateMarkdown(builtCompanion)
			onImportCompanion(builtCompanion.trait.name, markdown)
			setOpen(false) // Close the dialog after import
		}
	}

	return (
		<>
			<Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
				Build Companion
			</Button>

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				maxWidth="xl"
				fullWidth
				PaperProps={{
					sx: {
						height: '90vh',
						display: 'flex',
						flexDirection: 'column',
					},
				}}
			>
				<DialogTitle sx={{ pb: 1, borderBottom: 1, borderColor: 'divider' }}>
					Companion Builder
				</DialogTitle>
				<DialogContent
					sx={{
						p: 2,
						overflow: { xs: 'auto', md: 'hidden' },
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Grid
						container
						spacing={2}
						sx={{
							height: '100%',
							flex: 1,
							overflow: { xs: 'visible', md: 'hidden' },
						}}
					>
						{/* Left Panel: Form */}
						<Grid
							item
							xs={12}
							md={5}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 2,
								overflow: { xs: 'visible', md: 'auto' },
								pr: { xs: 0, md: 1 },
								maxHeight: { xs: 'none', md: '100%' },
							}}
						>
							<CompanionBuilderFormComponent
								onReset={handleResetAndTab}
								showResetButton={!!builtCompanion}
								showImportButton={!!builtCompanion && !!onImportCompanion}
								onImportCompanion={handleImportFromForm}
							/>
						</Grid>

						{/* Right Panel: Preview */}
						<Grid
							item
							xs={12}
							md={7}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								height: { xs: 'auto', md: '100%' },
								minHeight: { xs: '400px', md: 0 },
							}}
						>
							{builtCompanion ? (
								<Paper
									sx={{
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
										overflow: 'hidden',
									}}
								>
									<Tabs
										value={activeTab}
										onChange={handleTabChange}
										aria-label="companion preview tabs"
										sx={{
											borderBottom: 1,
											borderColor: 'divider',
											minHeight: 40,
											'& .MuiTab-root': { minHeight: 40, py: 1 },
										}}
									>
										<Tab label="Preview" />
										<Tab label="Markdown" />
									</Tabs>

									<Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
										<TabPanel value={activeTab} index={0}>
											<CompanionStatBlock companion={builtCompanion} />
										</TabPanel>

										<TabPanel value={activeTab} index={1}>
											<CompanionOutputPanel
												companion={builtCompanion}
												outputType="markdown"
												showImportButton={false}
											/>
										</TabPanel>
									</Box>
								</Paper>
							) : (
								<Paper
									sx={{
										height: '100%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										p: 4,
									}}
								>
									<Typography variant="h6" color="text.secondary">
										Select tier, size, and trait to build companion
									</Typography>
								</Paper>
							)}
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions
					sx={{ px: 3, py: 1.5, borderTop: 1, borderColor: 'divider' }}
				>
					<Button onClick={() => setOpen(false)} variant="outlined">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
