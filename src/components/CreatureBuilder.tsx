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
import { creatureBuilderActions } from '../features/CreatureBuilder/creatureBuilderReducer'
import { useCreatureBuilderState } from '../hooks/useCreatureBuilderState'
import { useDeviceSize } from '../features/CharacterSheet/utils/useDeviceSize'
import { CreatureBuilderForm } from './CreatureBuilderForm'
import { CreatureBuilderStatBlock } from './CreatureBuilderStatBlock'
import { CreatureBuilderOutputPanel } from './CreatureBuilderOutputPanel'
import { CreatureAdvancedSettings } from './CreatureAdvancedSettings'
import { TabPanel } from './TabPanel'

export const CreatureBuilder: React.FC = () => {
	const { isMobile } = useDeviceSize()
	const [open, setOpen] = useState(false)
	const [activeTab, setActiveTab] = useState(0)
	const [showAdvanced, setShowAdvanced] = useState(!isMobile)
	const dispatch = useDispatch()
	const { state, builtCreature } = useCreatureBuilderState()

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue)
	}

	const handleResetAndTab = () => {
		dispatch(creatureBuilderActions.resetBuilder())
		setActiveTab(0)
	}

	return (
		<>
			<Button
				variant="contained"
				color="primary"
				onClick={() => setOpen(true)}
				size="large"
			>
				Build Creature
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
					Creature Builder
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
						{/* Left Panel: Form and Settings */}
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
							<CreatureBuilderForm
								onReset={handleResetAndTab}
								showResetButton={!!builtCreature}
								showAdvanced={showAdvanced}
								onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
							/>

							{builtCreature && showAdvanced && <CreatureAdvancedSettings />}
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
							{builtCreature ? (
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
										aria-label="creature preview tabs"
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
											<CreatureBuilderStatBlock creature={builtCreature} />
										</TabPanel>

										<TabPanel value={activeTab} index={1}>
											<CreatureBuilderOutputPanel creature={builtCreature} />
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
										Select tier to build creature
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
