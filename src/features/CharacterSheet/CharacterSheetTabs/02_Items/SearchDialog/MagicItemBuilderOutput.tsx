import React from 'react'
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	IconButton,
	Tooltip,
	Typography,
} from '@mui/material'
import { Add, ContentCopy as ContentCopyIcon } from '@mui/icons-material'
import type { Item, Weapon } from '../../../../../types/Character'

interface MagicItemBuilderOutputProps {
	createdItem: (Partial<Weapon> | Partial<Item>) & { slot?: string }
	createdItemName: string
	copiedToClipboard: boolean
	onCopyToClipboard: () => void
	onBuildAnother: () => void
	onClose: () => void
}

export const MagicItemBuilderOutput: React.FC<MagicItemBuilderOutputProps> = ({
	createdItem,
	createdItemName,
	copiedToClipboard,
	onCopyToClipboard,
	onBuildAnother,
	onClose,
}) => {
	const generateMarkdown = (): string => {
		const item = createdItem as any
		const isWeapon = 'damage' in item && item.damage

		// Determine category for printing tool
		let category = 'Wearable'
		if (isWeapon) {
			category = 'Weapon'
		}

		const markdownObj: any = {
			name: createdItemName,
			category: category,
			quality: item.quality || 3,
			type: isWeapon
				? item.properties?.split?.(', ')?.[0] || 'weapon'
				: item.slot || 'wearable',
			cost: item.cost || 0,
			load: item.load || 0,
			description: item.description || '',
		}

		if (item.properties) {
			markdownObj.properties = Array.isArray(item.properties)
				? item.properties.join(', ')
				: item.properties
		}

		if (item.uses !== undefined) {
			markdownObj.uses = item.uses
		}

		return JSON.stringify(markdownObj, null, 2)
	}

	return (
		<Box sx={{ mt: 2 }}>
			<Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
				✓ Magic Item Created!
			</Typography>
			<Card>
				<CardHeader
					title={createdItemName}
					subheader="JSON Export - Copy for the Magic Item Card printing tool"
					action={
						<Tooltip title={copiedToClipboard ? 'Copied!' : 'Copy JSON'}>
							<IconButton onClick={onCopyToClipboard} color="primary">
								<ContentCopyIcon />
							</IconButton>
						</Tooltip>
					}
				/>
				<CardContent>
					<Box
						component="pre"
						sx={{
							p: 2,
							borderRadius: 1,
							backgroundColor: 'background.default',
							color: 'text.primary',
							overflowX: 'auto',
							fontSize: '0.875rem',
							border: 1,
							borderColor: 'divider',
						}}
					>
						{generateMarkdown()}
					</Box>
				</CardContent>
			</Card>

			<Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
				<Button
					onClick={onBuildAnother}
					variant="contained"
					color="primary"
					startIcon={<Add />}
				>
					Build Another Item
				</Button>
				<Button onClick={onClose} variant="outlined" color="inherit">
					Close
				</Button>
			</Box>
		</Box>
	)
}
