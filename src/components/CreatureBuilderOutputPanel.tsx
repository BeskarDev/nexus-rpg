import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { ContentCopy, Check } from '@mui/icons-material'
import { BuiltCreature } from '../types/CreatureBuilder'
import { generateCreatureMarkdown } from '../utils/typescript/creature/creatureBuilderFormatting'

interface CreatureBuilderOutputPanelProps {
	creature: BuiltCreature
}

export const CreatureBuilderOutputPanel: React.FC<
	CreatureBuilderOutputPanelProps
> = ({ creature }) => {
	const [copied, setCopied] = useState(false)
	const markdown = generateCreatureMarkdown(creature)

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(markdown)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 2,
				}}
			>
				<Typography variant="h6">Markdown Output</Typography>
				<Button
					variant="outlined"
					startIcon={copied ? <Check /> : <ContentCopy />}
					onClick={handleCopy}
					color={copied ? 'success' : 'primary'}
				>
					{copied ? 'Copied!' : 'Copy to Clipboard'}
				</Button>
			</Box>

			<TextField
				fullWidth
				multiline
				rows={20}
				value={markdown}
				InputProps={{
					readOnly: true,
					sx: {
						fontFamily: 'monospace',
						fontSize: '0.875rem',
					},
				}}
			/>
		</Box>
	)
}
