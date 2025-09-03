/**
 * Configuration data for the Magic Item Builder
 * Based on the magic items documentation
 */

import weaponsData from '../../../../../utils/json/weapons.json'
import armorData from '../../../../../utils/json/armor.json'
import equipmentData from '../../../../../utils/json/equipment.json'
import specialMaterialsData from '../../../../../utils/json/magic-item-materials.json'
import enchantmentsData from '../../../../../utils/json/magic-item-enchantments.json'
import spellCatalystsData from '../../../../../utils/json/magic-item-spell-catalysts.json'
import helmetsData from '../../../../../utils/json/magic-item-helmets.json'
import wearablesData from '../../../../../utils/json/magic-item-wearables.json'

export type QualityTier = 3 | 4 | 5 | 6 | 7 | 8

export type ItemCategory = 
  | 'one-handed-weapon'
  | 'two-handed-weapon'
  | 'spell-catalyst'
  | 'light-armor'
  | 'heavy-armor'
  | 'shield'
  | 'helmet'
  | 'wearable'
  | 'ammo'

export type SpecialMaterial = {
  id: string
  name: string
  description: string
  qualityTiers: QualityTier[]
  properties: string
  applicableCategories: ItemCategory[]
}

export type Enchantment = {
  id: string
  name: string
  description: string
  qualityTiers: QualityTier[]
  type: 'prefix' | 'suffix'
  applicableCategories: ItemCategory[]
  scaling?: boolean // Whether effect scales with quality tier
}

export type BaseItem = {
  name: string
  category: ItemCategory
  cost: number
  damage?: number
  properties: string
  load: number
  quality: number
  slot?: string
  description?: string
}

// Quality tier labels
export const qualityTierLabels: Record<QualityTier, string> = {
  3: 'Q3 (Masterwork)',
  4: 'Q4 (Lesser Magic)',
  5: 'Q5 (Potent Magic)',
  6: 'Q6 (Greater Magic)',
  7: 'Q7 (Superior Magic)',
  8: 'Q8 (Supreme Magic)',
}

// Magic item cost modifiers per quality and category
export const magicItemCosts: Record<QualityTier, Record<ItemCategory, number>> = {
  3: {
    'one-handed-weapon': 300,
    'two-handed-weapon': 500,
    'spell-catalyst': 300,
    'light-armor': 500,
    'heavy-armor': 1000,
    'shield': 500,
    'helmet': 500,
    'wearable': 250,
    'ammo': 50,
  },
  4: {
    'one-handed-weapon': 1000,
    'two-handed-weapon': 1500,
    'spell-catalyst': 1000,
    'light-armor': 1500,
    'heavy-armor': 3000,
    'shield': 1500,
    'helmet': 1500,
    'wearable': 750,
    'ammo': 150,
  },
  5: {
    'one-handed-weapon': 3000,
    'two-handed-weapon': 5000,
    'spell-catalyst': 3000,
    'light-armor': 5000,
    'heavy-armor': 10000,
    'shield': 5000,
    'helmet': 5000,
    'wearable': 2500,
    'ammo': 500,
  },
  6: {
    'one-handed-weapon': 10000,
    'two-handed-weapon': 15000,
    'spell-catalyst': 10000,
    'light-armor': 15000,
    'heavy-armor': 30000,
    'shield': 15000,
    'helmet': 15000,
    'wearable': 7500,
    'ammo': 1500,
  },
  7: {
    'one-handed-weapon': 30000,
    'two-handed-weapon': 50000,
    'spell-catalyst': 30000,
    'light-armor': 50000,
    'heavy-armor': 100000,
    'shield': 50000,
    'helmet': 50000,
    'wearable': 25000,
    'ammo': 5000,
  },
  8: {
    'one-handed-weapon': 100000,
    'two-handed-weapon': 150000,
    'spell-catalyst': 100000,
    'light-armor': 150000,
    'heavy-armor': 300000,
    'shield': 150000,
    'helmet': 150000,
    'wearable': 75000,
    'ammo': 15000,
  },
}

// Load and transform base items from JSON data sources
const transformWeaponData = (weapons: any[], category: ItemCategory) => {
  return weapons
    .filter(weapon => {
      if (category === 'one-handed-weapon') {
        return !weapon.properties.includes('two-handed') && 
               !weapon.properties.includes('heavy') &&
               weapon.type !== 'Bow' && weapon.type !== 'Crossbow' && weapon.type !== 'Shield'
      } else if (category === 'two-handed-weapon') {
        return weapon.properties.includes('two-handed') || 
               weapon.properties.includes('heavy') ||
               weapon.type === 'Bow' || weapon.type === 'Crossbow'
      } else if (category === 'shield') {
        return weapon.type === 'Shield'
      }
      return false
    })
    .map(weapon => ({
      name: weapon.name,
      category,
      cost: parseInt(weapon.cost),
      damage: parseInt(weapon.damage),
      properties: weapon.properties,
      load: parseInt(weapon.load),
      quality: parseInt(weapon.quality),
    }))
}

const transformArmorData = (armor: any[], category: ItemCategory) => {
  return armor
    .filter(item => {
      if (category === 'light-armor') return item.type === 'Light Armor'
      if (category === 'heavy-armor') return item.type === 'Heavy Armor'  
      if (category === 'shield') return item.type === 'Shield'
      if (category === 'helmet') return item.type === 'Helmet'
      return false
    })
    .map(item => ({
      name: item.name,
      category,
      cost: parseInt(item.cost),
      damage: item.damage ? parseInt(item.damage) : undefined,
      properties: item.properties || `AV +${item.av}${item.properties && item.properties !== '-' ? ', ' + item.properties : ''}`,
      load: parseInt(item.load),
      quality: parseInt(item.quality),
      slot: category === 'helmet' ? 'head' : 'body',
    }))
}

const transformEquipmentData = (equipment: any[], category: string) => {
  const ammoItems = equipment.filter(item => 
    item.name === 'Arrows (d6)' ||
    item.name === 'Bolts (d6)' ||  
    item.name === 'Throwing Stones (d6)' ||
    item.name === 'Blowdarts (d8)' ||
    item.name === 'Throwing Darts (d6)'
  ).map(item => ({
    name: item.name.replace(/\s\(d[0-9]+\)/, ''), // Remove the supply die notation
    category: 'ammo' as ItemCategory,
    cost: parseInt(item.cost),
    properties: item.properties || 'supply',
    load: parseInt(item.load),
    quality: parseInt(item.quality),
    description: item.description,
  }))
  
  return ammoItems
}

// Base items for each category
export const baseItems: Record<ItemCategory, BaseItem[]> = {
  'one-handed-weapon': transformWeaponData(weaponsData as any[], 'one-handed-weapon'),
  'two-handed-weapon': transformWeaponData(weaponsData as any[], 'two-handed-weapon'),
  'spell-catalyst': spellCatalystsData as BaseItem[],
  'light-armor': transformArmorData(armorData as any[], 'light-armor'),
  'heavy-armor': transformArmorData(armorData as any[], 'heavy-armor'),
  'shield': transformWeaponData(weaponsData as any[], 'shield'), // Shields are in weapons.json, not armor.json
  'helmet': helmetsData as BaseItem[],
  'wearable': wearablesData as BaseItem[],
  'ammo': transformEquipmentData(equipmentData as any[], 'ammo'),
}

// Load special materials and enchantments from JSON
export const specialMaterials: SpecialMaterial[] = specialMaterialsData as SpecialMaterial[]
export const enchantments: Enchantment[] = enchantmentsData as Enchantment[]

// Helper functions
export function getAvailableMaterials(category: ItemCategory, quality: QualityTier): SpecialMaterial[] {
  return specialMaterials.filter(
    material => 
      material.applicableCategories.includes(category) && 
      material.qualityTiers.includes(quality)
  )
}

export function getAvailableEnchantments(category: ItemCategory, quality: QualityTier): Enchantment[] {
  return enchantments.filter(
    enchantment => 
      enchantment.applicableCategories.includes(category) && 
      enchantment.qualityTiers.includes(quality)
  )
}

export function calculateMagicItemCost(
  baseItem: BaseItem, 
  quality: QualityTier, 
  hasMaterial: boolean, 
  hasEnchantment: boolean
): number {
  const baseCost = baseItem.cost
  const magicCost = magicItemCosts[quality][baseItem.category]
  
  // Apply magic cost once for material OR enchantment, twice for both
  const multiplier = (hasMaterial && hasEnchantment) ? 2 : 1
  
  return baseCost + (magicCost * multiplier)
}

export function getWeaponDamageBonus(baseQuality: number, targetQuality: QualityTier): number {
  // Weapon damage scaling according to magic items documentation:
  // Q3 = +1, Q4 = +1, Q5 = +2, Q6 = +3, Q7 = +4, Q8 = +5
  // Exception: Q3 weapons don't gain damage bonus if they're already Q3
  if (baseQuality >= 3 && targetQuality === 3) {
    return 0
  }
  
  // Fixed scaling based on target quality only (not difference)
  const bonuses: Record<QualityTier, number> = {
    3: 1,
    4: 1, 
    5: 2,
    6: 3,
    7: 4,
    8: 5,
  }
  
  return bonuses[targetQuality] || 0
}

export function getArmorAVBonus(targetQuality: QualityTier): number {
  // Armor gains AV bonus starting at Q4
  const bonuses: Record<QualityTier, number> = {
    3: 0,
    4: 1,
    5: 2,
    6: 3,
    7: 4,
    8: 5,
  }
  return bonuses[targetQuality]
}

export function generateItemName(
  baseItem: BaseItem,
  material?: SpecialMaterial,
  enchantment?: Enchantment
): string {
  let name = baseItem.name
  
  if (material && enchantment) {
    if (enchantment.type === 'prefix') {
      name = `${enchantment.name} ${material.name} ${baseItem.name}`
    } else {
      name = `${material.name} ${baseItem.name} ${enchantment.name}`
    }
  } else if (material) {
    name = `${material.name} ${baseItem.name}`
  } else if (enchantment) {
    if (enchantment.type === 'prefix') {
      name = `${enchantment.name} ${baseItem.name}`
    } else {
      name = `${baseItem.name} ${enchantment.name}`
    }
  }
  
  return name
}

export function generateItemDescription(
  baseItem: BaseItem,
  quality: QualityTier,
  material?: SpecialMaterial,
  enchantment?: Enchantment
): string {
  let description = baseItem.description || `A ${qualityTierLabels[quality]} ${baseItem.name.toLowerCase()}.`
  
  if (material) {
    description += `\n\nMaterial: ${material.name}\n${material.description}\n${material.properties}`
  }
  
  if (enchantment) {
    const scaledDescription = enchantment.scaling 
      ? enchantment.description.replace(/(\d+)\/(\d+)\/(\d+)/g, (match, q4, q5, q6) => {
          const values = [q4, q5, q6]
          const index = [4, 5, 6].indexOf(quality)
          return index >= 0 ? values[index] : match
        }).replace(/once\/twice\/thrice/g, () => {
          const counts = ['once', 'twice', 'thrice']
          const index = [4, 5, 6].indexOf(quality)
          return index >= 0 ? counts[index] : 'once'
        })
      : enchantment.description
    
    description += `\n\nEnchantment: ${enchantment.name}\n${scaledDescription}`
  }
  
  return description
}
