import React from 'react'
import { IconButton, Tooltip, Button } from '@mui/material'
import { Build, AutoFixHigh } from '@mui/icons-material'
import {
	ListSectionHeader,
	SheetMenu,
	ToggleMenuItem,
} from '../../../components'
import { ItemLocation } from '../../../../../types/ItemLocation'

/**
 * The tab's sections, in the order they appear on it.
 *
 * A list, not four copy-pasted `MenuItem` blocks (M13 S4d). The four differed only
 * in a location key and a label, and the copies had already drifted — each one
 * carried its own `size="small"` and its own `sx`, so a change to the row had to be
 * made four times and was.
 */
const CATEGORIES: { location: ItemLocation; label: string }[] = [
	{ location: 'worn', label: 'Weapons & Equipment' },
	{ location: 'carried', label: 'Inventory' },
	{ location: 'mount', label: 'On Mount' },
	{ location: 'storage', label: 'In Storage' },
]

interface ItemsSettingsMenuProps {
	itemLocationVisibility: Record<ItemLocation, boolean> | undefined
	settingsMenuAnchor: HTMLElement | null
	onSettingsMenuOpen: (event: React.MouseEvent<HTMLElement>) => void
	onSettingsMenuClose: () => void
	onToggleLocationVisibility: (location: ItemLocation) => void
	onOpenMagicItemBuilder?: () => void
}

export const ItemsSettingsMenu: React.FC<ItemsSettingsMenuProps> = ({
	itemLocationVisibility,
	settingsMenuAnchor,
	onSettingsMenuOpen,
	onSettingsMenuClose,
	onToggleLocationVisibility,
	onOpenMagicItemBuilder,
}) => {
	return (
		<>
			{/* M13 S4: the tab's own heading on the shared ruled header, matching
				`Abilities` on the Skills tab. The Magic Item Builder is a real command
				rather than an icon, so it stays a labelled button — it sits in the
				actions slot beside the levelled icon controls, not instead of them. */}
			<ListSectionHeader
				label="Items & Equipment"
				sx={{ mb: 2 }}
				actions={
					<>
						<Tooltip title="toggle inventory categories">
							<IconButton size="small" onClick={onSettingsMenuOpen}>
								<Build fontSize="inherit" />
							</IconButton>
						</Tooltip>
						{onOpenMagicItemBuilder && (
							<Button
								size="small"
								variant="outlined"
								startIcon={<AutoFixHigh />}
								onClick={onOpenMagicItemBuilder}
								sx={{ minWidth: 'auto', px: 1, ml: 0.5 }}
							>
								Magic Item Builder
							</Button>
						)}
					</>
				}
			/>
			<SheetMenu
				anchorEl={settingsMenuAnchor}
				onClose={onSettingsMenuClose}
				caption="Show categories"
			>
				{CATEGORIES.map(({ location, label }) => (
					<ToggleMenuItem
						key={location}
						checked={itemLocationVisibility?.[location] ?? true}
						onToggle={() => onToggleLocationVisibility(location)}
					>
						{label}
					</ToggleMenuItem>
				))}
			</SheetMenu>
		</>
	)
}
