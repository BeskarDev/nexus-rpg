import React from 'react'
import { IconButton, Tooltip, Button } from '@mui/material'
import { Build, AutoFixHigh } from '@mui/icons-material'
import { SheetMenu, TabHeader, ToggleMenuItem } from '../../../components'
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
	/** The tab's meta band — the purse strip, rendered inside the header plate. */
	header?: React.ReactNode
	itemLocationVisibility: Record<ItemLocation, boolean> | undefined
	settingsMenuAnchor: HTMLElement | null
	onSettingsMenuOpen: (event: React.MouseEvent<HTMLElement>) => void
	onSettingsMenuClose: () => void
	onToggleLocationVisibility: (location: ItemLocation) => void
	onOpenMagicItemBuilder?: () => void
}

export const ItemsSettingsMenu: React.FC<ItemsSettingsMenuProps> = ({
	header,
	itemLocationVisibility,
	settingsMenuAnchor,
	onSettingsMenuOpen,
	onSettingsMenuClose,
	onToggleLocationVisibility,
	onOpenMagicItemBuilder,
}) => {
	return (
		<>
			{/* M13 S6: the tab opens on a `TabHeader` plate — the ornate frame the Personal
				tab was spending on every field, spent once here, holding the tab's name, its
				commands and its purse band. The Magic Item Builder stays a labelled button
				rather than an icon: it is a real command, and it sits in the actions slot
				beside the levelled icon controls rather than instead of them. */}
			<TabHeader
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
			>
				{header}
			</TabHeader>
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
