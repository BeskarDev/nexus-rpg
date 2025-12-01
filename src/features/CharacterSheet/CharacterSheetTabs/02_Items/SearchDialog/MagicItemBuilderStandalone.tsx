import { useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Card,
	CardContent,
	CardHeader,
	Box,
	Chip,
	Divider,
	Typography,
	IconButton,
	Tooltip,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import type { Item, Weapon } from '../../../../../types/Character.ts'
import { MagicItemBuilderDialog } from './MagicItemBuilderDialog'

interface MagicItemBuilderStandaloneProps {
	open: boolean
	onClose: () => void
}

export const MagicItemBuilderStandalone: React.FC<
	MagicItemBuilderStandaloneProps
> = ({ open, onClose }) => {
	const [dialogOpen, setDialogOpen] = useState(false)
	const [generatedItem, setGeneratedItem] = useState<
		(Partial<Weapon> | Partial<Item>) & { slot?: string } | null
	>(null)
	const [itemName, setItemName] = useState('')
	const [copiedToClipboard, setCopiedToClipboard] = useState(false)

	const handleBuilderOpen = () => {
		setDialogOpen(true)
	}

	const handleBuilderClose = () => {
		setDialogOpen(false)
	}

	const handleItemCreated = (
		item: Partial<Weapon> | Partial<Item>,
		name: string,
	) => {
		setGeneratedItem(item)
		setItemName(name)
		setDialogOpen(false)
	}

	const handleCopyToClipboard = () => {
		if (!generatedItem || !itemName) return

		const itemDetails = formatItemForClipboard(generatedItem as any, itemName)
		navigator.clipboard.writeText(itemDetails).then(() => {
			setCopiedToClipboard(true)
			setTimeout(() => setCopiedToClipboard(false), 2000)
		})
	}

	const formatItemForClipboard = (
		item: Weapon | Item,
		name: string,
	): string => {
		let details = `${name}\n`
		details += `Cost: ${item.cost}\n`
		const itemAny = item as any
		if (itemAny.load !== undefined) {
			details += `Load: ${itemAny.load}\n`
		}

		if ('damage' in item && item.damage) {
			const weapon = item as Weapon
			details += `Damage: ${weapon.damage.weapon}\n`
		}

		if ('properties' in item && item.properties) {
			details += `Properties: ${Array.isArray(item.properties) ? item.properties.join(', ') : item.properties}\n`
		}

		if (itemAny.description) {
			details += `\nDescription:\n${itemAny.description}`
		}

		return details
	}

	const renderItemProperty = (
		label: string,
		value: string | number | undefined,
	) => {
		if (value === undefined || value === null) return null
		return (
			<Box sx={{ mb: 1 }}>
				<Typography variant="caption" sx={{ fontWeight: 600, mr: 1 }}>
					{label}:
				</Typography>
				<Typography variant="body2">{value}</Typography>
			</Box>
		)
	}

	const renderItemPreview = () => {
		if (!generatedItem || !itemName) return null

		const weapon = generatedItem as any as Weapon
		const isWeapon = 'damage' in weapon && weapon.damage

		return (
			<Card sx={{ mt: 2 }}>
				<CardHeader
					title={itemName}
					action={
						<Tooltip title={copiedToClipboard ? 'Copied!' : 'Copy to clipboard'}>
							<IconButton onClick={handleCopyToClipboard} size="small">
								<ContentCopyIcon fontSize="small" />
							</IconButton>
						</Tooltip>
					}
					sx={{ pb: 1 }}
				/>
				<Divider />
				<CardContent>
					<Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
						{weapon.quality && (
							<Chip label={`Q${weapon.quality}`} size="small" variant="outlined" />
						)}
						{isWeapon && (
							<Chip
								label={weapon.properties?.[0] || 'Weapon'}
								size="small"
								variant="outlined"
							/>
						)}
					</Box>

					{renderItemProperty('Cost', weapon.cost)}
					{renderItemProperty('Load', weapon.load)}

					{isWeapon && weapon.damage && (
						<Box sx={{ mb: 1 }}>
							<Typography variant="caption" sx={{ fontWeight: 600, mr: 1 }}>
								Damage:
							</Typography>
							<Typography variant="body2">
								{weapon.damage.weapon}
								{weapon.damage.type && ` (${weapon.damage.type})`}
							</Typography>
						</Box>
					)}

					{weapon.durability && (
						<Box sx={{ mb: 1 }}>
							<Typography variant="caption" sx={{ fontWeight: 600, mr: 1 }}>
								Durability:
							</Typography>
							<Typography variant="body2">{weapon.durability}</Typography>
						</Box>
					)}

					{weapon.properties && (
						<Box sx={{ mb: 1 }}>
							<Typography variant="caption" sx={{ fontWeight: 600, mr: 1 }}>
								Properties:
							</Typography>
							<Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
								{(Array.isArray(weapon.properties)
									? weapon.properties
									: weapon.properties.split(', ')
								).map((prop: string, idx: number) => (
									<Chip key={idx} label={prop} size="small" />
								))}
							</Box>
						</Box>
					)}

					{weapon.description && (
						<Box sx={{ mt: 2 }}>
							<Typography variant="caption" sx={{ fontWeight: 600 }}>
								Description:
							</Typography>
							<Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
								{weapon.description}
							</Typography>
						</Box>
					)}
				</CardContent>
			</Card>
		)
	}

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>Magic Item Builder</DialogTitle>
			<DialogContent>
				<Box sx={{ pt: 2 }}>
					{!generatedItem ? (
						<Box sx={{ textAlign: 'center', py: 3 }}>
							<Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
								Click the button below to start building a magic item
							</Typography>
							<Button variant="contained" onClick={handleBuilderOpen}>
								Open Builder
							</Button>
						</Box>
					) : (
						renderItemPreview()
					)}

					<MagicItemBuilderDialog
						open={dialogOpen}
						onClose={handleBuilderClose}
						onItemCreated={handleItemCreated}
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				{generatedItem && (
					<Button onClick={() => setGeneratedItem(null)}>Clear</Button>
				)}
				<Button onClick={onClose}>Close</Button>
			</DialogActions>
		</Dialog>
	)
}

export default MagicItemBuilderStandalone
