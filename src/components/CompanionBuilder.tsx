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
} from '@mui/material'
import { CompanionBuilderProps } from '../types/companion'
import { useCompanionBuilder } from '../hooks/useCompanionBuilder'
import { CompanionForm } from './CompanionForm'
import { CompanionStatBlock } from './CompanionStatBlock'
import { CompanionOutputPanel } from './CompanionOutputPanel'
import { TabPanel } from './TabPanel'
import { generateMarkdown } from '../utils/companionFormatting'

export const CompanionBuilder: React.FC<CompanionBuilderProps> = ({ 
	showImportButton = false, 
	onImportCompanion 
}) => {
	const [open, setOpen] = useState(false)
	const [activeTab, setActiveTab] = useState(0)
	
	const {
		selectedTier,
		selectedSize,
		selectedTrait,
		builtCompanion,
		handleTierChange,
		handleSizeChange,
		handleTraitChange,
		resetBuilder,
	} = useCompanionBuilder()

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue)
	}

	const handleResetAndTab = () => {
		resetBuilder()
		setActiveTab(0)
	}

	const handleImportFromForm = () => {
		if (builtCompanion && onImportCompanion) {
			const markdown = generateMarkdown(builtCompanion)
			onImportCompanion(builtCompanion.trait.name, markdown)
			setOpen(false) // Close the dialog after import
		}
	}

	const handleImportFromTab = (name: string, markdown: string) => {
		if (onImportCompanion) {
			onImportCompanion(name, markdown)
			setOpen(false) // Close the dialog after import
		}
	}

	return (
		<>
			<Button
				variant="outlined"
				color="primary"
				onClick={() => setOpen(true)}
			>
				Build Companion
			</Button>

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				maxWidth="lg"
				fullWidth
			>
				<DialogTitle>Companion Builder</DialogTitle>
				<DialogContent>
					<Box sx={{ mt: 2 }}>
						<CompanionForm
							selectedTier={selectedTier}
							selectedSize={selectedSize}
							selectedTrait={selectedTrait}
							onTierChange={handleTierChange}
							onSizeChange={handleSizeChange}
							onTraitChange={handleTraitChange}
							onReset={handleResetAndTab}
							showResetButton={!!builtCompanion}
							showImportButton={!!builtCompanion && !!onImportCompanion}
							onImportCompanion={handleImportFromForm}
						/>

						{builtCompanion && (
							<Paper sx={{ mt: 3, p: { xs: 1, sm: 2 } }}>
								<Tabs
									value={activeTab}
									onChange={handleTabChange}
								>
									<Tab label="Stat Block" />
									<Tab label="Markdown" />
									<Tab label="JSON" />
								</Tabs>

								<TabPanel value={activeTab} index={0}>
									<CompanionStatBlock companion={builtCompanion} />
								</TabPanel>

								<TabPanel value={activeTab} index={1}>
									<CompanionOutputPanel
										companion={builtCompanion}
										outputType="markdown"
										showImportButton={showImportButton}
										onImportCompanion={handleImportFromTab}
									/>
								</TabPanel>

								<TabPanel value={activeTab} index={2}>
									<CompanionOutputPanel
										companion={builtCompanion}
										outputType="json"
									/>
								</TabPanel>
							</Paper>
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
