import React, { useState } from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import { Search, SwapVert } from '@mui/icons-material'
import { DropResult } from '@hello-pangea/dnd'
import { DynamicList } from '@site/src/features/CharacterSheet/components/DynamicList'
import { DynamicListItem } from '@site/src/features/CharacterSheet/components/DynamicList/DynamicListItem'
import { ListSection, MarkButton, RuleInfo } from '../../../components'
import { LEDGER_COLUMNS, headerTemplate, LedgerShape } from './ledgerColumns'
import { Item, Weapon, Character } from '../../../../../types/Character'
import { ItemLocation } from '../../../../../types/ItemLocation'
import { ItemRow } from '../ItemRow'
import { WeaponRow } from '../WeaponRow'
import { LocationLoadDisplay } from './LocationLoadDisplay'

interface InventorySectionProps {
	title: string
	location: ItemLocation
	items: (Item | Weapon)[]
	weapons: Weapon[]
	allItems: Item[]
	character: Character
	showWeaponsOnly?: boolean
	showItemsOnly?: boolean
	showSearchButton?: boolean
	searchTooltip?: string
	showLoadDisplay?: boolean
	currentLoad?: number
	maxLoad?: number
	locationName?: string
	helpTooltip?: string
	onAddNewWeapon?: () => void
	onAddNewItem?: () => void
	onSearchClick?: () => void
	onItemReorder: (result: DropResult) => void
	updateWeapon: (update: Partial<Weapon>, index: number) => void
	deleteWeapon: (weapon: Weapon) => void
	updateItem: (update: Partial<Item>, index: number) => void
	deleteItem: (item: Item) => void
	onLocationNameChange?: (name: string) => void
	onMaxLoadChange?: (maxLoad: number) => void
	// Quick Ref props
	weaponsInQuickRef?: string[]
	itemsInQuickRef?: string[]
	onToggleWeaponQuickRef?: (weaponId: string) => void
	onToggleItemQuickRef?: (itemId: string) => void
}

export const InventorySection: React.FC<InventorySectionProps> = ({
	title,
	location,
	items,
	weapons,
	allItems,
	character,
	showWeaponsOnly = false,
	showItemsOnly = false,
	showSearchButton = false,
	searchTooltip = 'Search database',
	showLoadDisplay = false,
	currentLoad = 0,
	maxLoad = 0,
	locationName = '',
	helpTooltip,
	onAddNewWeapon,
	onAddNewItem,
	onSearchClick,
	onItemReorder,
	updateWeapon,
	deleteWeapon,
	updateItem,
	deleteItem,
	onLocationNameChange,
	onMaxLoadChange,
	// Quick Ref props
	weaponsInQuickRef = [],
	itemsInQuickRef = [],
	onToggleWeaponQuickRef,
	onToggleItemQuickRef,
}) => {
	const [reorderMode, setReorderMode] = useState(false)

	const filteredItems = showWeaponsOnly
		? items.filter((item) => 'damage' in item)
		: showItemsOnly
			? items.filter((item) => !('damage' in item))
			: items

	const droppableId = `items-${location}${showWeaponsOnly ? '-weapons' : showItemsOnly ? '-items' : ''}`

	// A section holds one row shape. `showWeaponsOnly` is the Weapons section; the
	// mixed sections in practice hold items, and a weapon dropped into one still
	// renders its own four fields — the header just names the item columns, which
	// is the same compromise the flat labelled layout made by wrapping.
	const shape: LedgerShape = showWeaponsOnly
		? 'weapon'
		: location === 'worn'
			? 'worn'
			: 'item'

	return (
		/* M13 S4: was an MUI `Accordion` with a bold `SectionHeader` and a hand-built
			row of icon buttons — the fourth copy of that arrangement on the sheet.
			`ListSection` supplies the ruled heading, the count, the collapse and the
			levelled control strip; what stays here is only what this section actually
			owns. */
		<ListSection
			key={`${location}-section`}
			label={title}
			count={filteredItems.length}
			collapsible
			defaultExpanded
			sx={{ mb: 1 }}
			className="cs-ledger-cols"
			info={
				helpTooltip ? (
					<RuleInfo label={`About ${title}`}>{helpTooltip}</RuleInfo>
				) : undefined
			}
			actions={
				<>
					<Tooltip title={reorderMode ? 'Exit reorder mode' : 'Reorder items'}>
						<IconButton
							size="small"
							data-state={reorderMode ? 'on' : 'off'}
							onClick={() => setReorderMode(!reorderMode)}
						>
							<SwapVert fontSize="inherit" />
						</IconButton>
					</Tooltip>
					{onAddNewWeapon && (
						<MarkButton glyph="+" label="Add weapon" onClick={onAddNewWeapon} />
					)}
					{onAddNewItem && (
						<MarkButton glyph="+" label="Add item" onClick={onAddNewItem} />
					)}
					{showSearchButton && onSearchClick && (
						<Tooltip title={searchTooltip}>
							<IconButton size="small" onClick={onSearchClick}>
								<Search fontSize="inherit" />
							</IconButton>
						</Tooltip>
					)}
				</>
			}
		>
			{showLoadDisplay && onLocationNameChange && onMaxLoadChange && (
				<LocationLoadDisplay
					location={location}
					name={locationName}
					currentLoad={currentLoad}
					maxLoad={maxLoad}
					onNameChange={onLocationNameChange}
					onMaxLoadChange={onMaxLoadChange}
				/>
			)}
			{/* The ledger's column header — the words each row's fields used to carry
				one copy of apiece. Decorative: every field still holds its own label
				for the accessibility tree (visually hidden while these are showing),
				so this is a repeat of names that are already announced. */}
			{filteredItems.length > 0 && (
				<Box
					className="cs-ledger-head"
					aria-hidden="true"
					sx={{
						gridTemplateColumns: headerTemplate(),
						// The rows cap at this measure; the header names their columns, so
						// it has to stop where they stop.
						// Fills the working column (M13 S11); the column carries the ceiling.
						maxWidth: '100%',
					}}
				>
					{/* Keyed by index, not label: the reserved-but-blank tracks (M13 S4d)
						all carry the same empty label. */}
					{LEDGER_COLUMNS[shape].headings.map((h, i) => (
						<span key={i} style={{ textAlign: h.align }}>
							{h.label}
						</span>
					))}
				</Box>
			)}
			<DynamicList droppableId={droppableId} onDragEnd={onItemReorder}>
				{filteredItems.map((item, index) => (
					<DynamicListItem
						key={item.id}
						id={item.id}
						index={index}
						showDragHandle={reorderMode}
						sx={{ alignItems: 'baseline' }}
					>
						{'damage' in item ? (
							<WeaponRow
								key={item.id}
								weapon={item as Weapon}
								updateWeapon={(update) =>
									updateWeapon(
										update,
										weapons.findIndex((w) => w.id === item.id),
									)
								}
								deleteWeapon={() => deleteWeapon(item as Weapon)}
								isInQuickRef={weaponsInQuickRef.includes(item.id)}
								onToggleQuickRef={onToggleWeaponQuickRef}
							/>
						) : (
							<ItemRow
								key={item.id}
								item={item as Item}
								shape={shape === 'worn' ? 'worn' : 'item'}
								character={character}
								updateItem={(update) =>
									updateItem(
										update,
										allItems.findIndex((i) => i.id === item.id),
									)
								}
								deleteItem={() => deleteItem(item as Item)}
								isInQuickRef={itemsInQuickRef.includes(item.id)}
								onToggleQuickRef={onToggleItemQuickRef}
							/>
						)}
					</DynamicListItem>
				))}
			</DynamicList>
		</ListSection>
	)
}
