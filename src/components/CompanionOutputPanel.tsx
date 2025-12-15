import React from 'react'
import { Box, Button, Typography, Paper } from '@mui/material'
import { CompanionStats } from '../types/companion'
import { generateMarkdown, generateJSON } from '../utils/typescript/companion/companionFormatting'

interface CompanionOutputPanelProps {
	companion: CompanionStats
	outputType: 'markdown' | 'json'
	showImportButton?: boolean
	onImportCompanion?: (name: string, markdown: string) => void
}

export const CompanionOutputPanel: React.FC<CompanionOutputPanelProps> = ({
	companion,
	outputType,
	showImportButton = false,
	onImportCompanion,
}) => {
	const content =
		outputType === 'markdown'
			? generateMarkdown(companion)
			: generateJSON(companion)

	const copyToClipboard = () => {
		navigator.clipboard.writeText(content)
	}

	const handleImport = () => {
		if (onImportCompanion && outputType === 'markdown') {
			const markdown = generateMarkdown(companion)
			const name = companion.trait.name
			onImportCompanion(name, markdown)
		}
	}

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 2,
				}}
			>
				<Typography variant="h6">
					{outputType === 'markdown' ? 'Markdown' : 'JSON'} Output
				</Typography>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<Button size="small" onClick={copyToClipboard}>
						Copy to Clipboard
					</Button>
					{showImportButton &&
						onImportCompanion &&
						outputType === 'markdown' && (
							<Button
								size="small"
								variant="contained"
								color="primary"
								onClick={handleImport}
							>
								Import to Character
							</Button>
						)}
				</Box>
			</Box>
			<Paper variant="outlined" sx={{ p: 2, backgroundColor: 'action.hover' }}>
				<pre
					style={{
						whiteSpace: 'pre-wrap',
						fontSize: '0.875rem',
						margin: 0,
					}}
				>
					{content}
				</pre>
			</Paper>
		</>
	)
}
