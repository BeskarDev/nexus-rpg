import React from 'react'
import {
	Box,
	IconButton,
	Tooltip,
	Menu,
	MenuItem,
	FormControlLabel,
	Checkbox,
	Button,
} from '@mui/material'
import { Build, AutoFixHigh } from '@mui/icons-material'
import { SectionHeader } from '../../../CharacterSheet'
import { ItemLocation } from '../../../../../types/ItemLocation'

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
			<Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
				<SectionHeader sx={{ mb: 0 }}>Items & Equipment</SectionHeader>

				<Tooltip title="toggle inventory categories">
					<IconButton
						size="small"
						onClick={onSettingsMenuOpen}
						sx={{
							border: '1px solid',
							borderColor: 'divider',
						}}
					>
						<Build fontSize="inherit" />
					</IconButton>
				</Tooltip>

				{onOpenMagicItemBuilder && (
					<Tooltip title="Create custom magic item">
						<Button
							size="small"
							variant="outlined"
							startIcon={<AutoFixHigh />}
							onClick={onOpenMagicItemBuilder}
							sx={{
								minWidth: 'auto',
								px: 1,
								textTransform: 'none',
							}}
						>
							Magic Item Builder
						</Button>
					</Tooltip>
				)}

				<Menu
					anchorEl={settingsMenuAnchor}
					open={Boolean(settingsMenuAnchor)}
					onClose={onSettingsMenuClose}
					transformOrigin={{ horizontal: 'left', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
				>
					<MenuItem dense>
						<FormControlLabel
							control={
								<Checkbox
									checked={itemLocationVisibility?.['worn'] ?? true}
									onChange={() => onToggleLocationVisibility('worn')}
									size="small"
								/>
							}
							label="Weapons & Equipment"
							sx={{ width: '100%', margin: 0 }}
						/>
					</MenuItem>
					<MenuItem dense>
						<FormControlLabel
							control={
								<Checkbox
									checked={itemLocationVisibility?.['carried'] ?? true}
									onChange={() => onToggleLocationVisibility('carried')}
									size="small"
								/>
							}
							label="Inventory"
							sx={{ width: '100%', margin: 0 }}
						/>
					</MenuItem>
					<MenuItem dense>
						<FormControlLabel
							control={
								<Checkbox
									checked={itemLocationVisibility?.['mount'] ?? true}
									onChange={() => onToggleLocationVisibility('mount')}
									size="small"
								/>
							}
							label="On Mount"
							sx={{ width: '100%', margin: 0 }}
						/>
					</MenuItem>
					<MenuItem dense>
						<FormControlLabel
							control={
								<Checkbox
									checked={itemLocationVisibility?.['storage'] ?? true}
									onChange={() => onToggleLocationVisibility('storage')}
									size="small"
								/>
							}
							label="In Storage"
							sx={{ width: '100%', margin: 0 }}
						/>
					</MenuItem>
				</Menu>
			</Box>
		</>
	)
}
