import React, { useState } from 'react'
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
} from '@mui/material'
import { useCreatureBuilder } from '../hooks/useCreatureBuilder'
import { CreatureBuilderForm } from './CreatureBuilderForm'
import { CreatureBuilderStatBlock } from './CreatureBuilderStatBlock'
import { CreatureBuilderOutputPanel } from './CreatureBuilderOutputPanel'
import { TabPanel } from './TabPanel'

export const CreatureBuilder: React.FC = () => {
	const [open, setOpen] = useState(false)
	const [activeTab, setActiveTab] = useState(0)

	const {
		state,
		builtCreature,
		handleTierChange,
		handleCategoryChange,
		handleSizeChange,
		handleTypeChange,
		handleArchetypeChange,
		handleNameChange,
		resetBuilder,
	} = useCreatureBuilder()

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue)
	}

	const handleResetAndTab = () => {
		resetBuilder()
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

			<Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
				<DialogTitle>Creature Builder</DialogTitle>
				<DialogContent>
					<Box sx={{ mt: 2 }}>
						<CreatureBuilderForm
							tier={state.tier}
							category={state.category}
							size={state.size}
							type={state.type}
							archetype={state.archetype}
							name={state.name}
							onTierChange={handleTierChange}
							onCategoryChange={handleCategoryChange}
							onSizeChange={handleSizeChange}
							onTypeChange={handleTypeChange}
							onArchetypeChange={handleArchetypeChange}
							onNameChange={handleNameChange}
							onReset={handleResetAndTab}
							showResetButton={!!builtCreature}
							hp={builtCreature?.baseHp}
							av={parseInt(builtCreature?.av || '0')}
							parry={builtCreature?.parry}
							dodge={builtCreature?.dodge}
							resist={builtCreature?.resist}
						/>

						{builtCreature && (
							<Paper sx={{ mt: 3, p: { xs: 1, sm: 2 } }}>
								<Tabs
									value={activeTab}
									onChange={handleTabChange}
									aria-label="creature preview tabs"
								>
									<Tab label="Preview" />
									<Tab label="Markdown" />
								</Tabs>

								<TabPanel value={activeTab} index={0}>
									<CreatureBuilderStatBlock creature={builtCreature} />
								</TabPanel>

								<TabPanel value={activeTab} index={1}>
									<CreatureBuilderOutputPanel creature={builtCreature} />
								</TabPanel>
							</Paper>
						)}

						{!builtCreature && (
							<Box sx={{ mt: 3, p: 2, textAlign: 'center' }}>
								<Typography variant="body1" color="text.secondary">
									Select a tier to start building your creature
								</Typography>
							</Box>
						)}
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
