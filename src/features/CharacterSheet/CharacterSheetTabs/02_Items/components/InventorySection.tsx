import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Tooltip
} from '@mui/material'
import { AddCircle, ExpandMore, HelpOutline, Search } from '@mui/icons-material'
import { DropResult } from 'react-beautiful-dnd'
import { DynamicList } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { SectionHeader } from '../../../CharacterSheet'
import { Item, Weapon } from '../../../../../types/Character'
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
  showWeaponsOnly?: boolean
  showItemsOnly?: boolean
  showSearchButton?: boolean
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
}

export const InventorySection: React.FC<InventorySectionProps> = ({
  title,
  location,
  items,
  weapons,
  allItems,
  showWeaponsOnly = false,
  showItemsOnly = false,
  showSearchButton = false,
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
  onMaxLoadChange
}) => {
  const filteredItems = showWeaponsOnly 
    ? items.filter(item => 'damage' in item)
    : showItemsOnly 
    ? items.filter(item => !('damage' in item))
    : items

  const droppableId = `items-${location}${showWeaponsOnly ? '-weapons' : showItemsOnly ? '-items' : ''}`

  return (
    <Accordion 
      key={`${location}-section`}
      defaultExpanded
      sx={{ flexGrow: 1, mb: 1 }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <SectionHeader sx={{ mb: 0 }}>{title}</SectionHeader>
          {helpTooltip && (
            <Tooltip title={helpTooltip}>
              <HelpOutline fontSize="small" sx={{ mb: 0.75 }} />
            </Tooltip>
          )}
          {onAddNewWeapon && (
            <IconButton
              size="small"
              onClick={(event) => {
                onAddNewWeapon()
                event.stopPropagation()
              }}
              sx={{ mb: 0.75 }}
            >
              <AddCircle />
            </IconButton>
          )}
          {onAddNewItem && (
            <IconButton
              size="small"
              onClick={(event) => {
                onAddNewItem()
                event.stopPropagation()
              }}
              sx={{ mb: 0.75 }}
            >
              <AddCircle />
            </IconButton>
          )}
          {showSearchButton && onSearchClick && (
            <Tooltip title="Search weapons from database">
              <IconButton
                size="small"
                onClick={(event) => {
                  onSearchClick()
                  event.stopPropagation()
                }}
                sx={{ ml: -1, mb: 0.75 }}
              >
                <Search />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ overflowY: 'auto', maxHeight: '30rem' }}>
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
        <DynamicList 
          droppableId={droppableId} 
          onDragEnd={onItemReorder}
        >
          {filteredItems.map((item, index) => (
            <DynamicListItem
              key={item.id}
              id={item.id}
              index={index}
              sx={{ alignItems: 'baseline' }}
            >
              {'damage' in item ? (
                <WeaponRow
                  key={item.id}
                  weapon={item as Weapon}
                  updateWeapon={(update) => updateWeapon(update, weapons.findIndex(w => w.id === item.id))}
                  deleteWeapon={() => deleteWeapon(item as Weapon)}
                />
              ) : (
                <ItemRow
                  key={item.id}
                  item={item as Item}
                  updateItem={(update) => updateItem(update, allItems.findIndex(i => i.id === item.id))}
                  deleteItem={() => deleteItem(item as Item)}
                />
              )}
            </DynamicListItem>
          ))}
        </DynamicList>
      </AccordionDetails>
    </Accordion>
  )
}
