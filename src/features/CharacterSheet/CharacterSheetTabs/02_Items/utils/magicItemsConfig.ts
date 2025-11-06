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

export type QualityTier = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

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
  materialType: 'base' | 'special'
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
  baseAV?: number
}

// Quality tier labels
export const qualityTierLabels: Record<QualityTier, string> = {
  1: 'Q1 (Poor)',
  2: 'Q2 (Common)',
  3: 'Q3 (Masterwork)',
  4: 'Q4 (Lesser Magic)',
  5: 'Q5 (Potent Magic)',
  6: 'Q6 (Greater Magic)',
  7: 'Q7 (Superior Magic)',
  8: 'Q8 (Supreme Magic)',
}

// Enchantment cost modifiers per quality and category
export const enchantmentCosts: Record<QualityTier, Record<ItemCategory, number>> = {
  1: {
    'one-handed-weapon': 0,
    'two-handed-weapon': 0,
    'spell-catalyst': 0,
    'light-armor': 0,
    'heavy-armor': 0,
    'shield': 0,
    'helmet': 0,
    'wearable': 0,
    'ammo': 0,
  },
  2: {
    'one-handed-weapon': 0,
    'two-handed-weapon': 0,
    'spell-catalyst': 0,
    'light-armor': 0,
    'heavy-armor': 0,
    'shield': 0,
    'helmet': 0,
    'wearable': 0,
    'ammo': 0,
  },
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

// Special material extra cost modifiers per quality and category
// Base materials (Q1-Q2) have 0 extra cost
// Special materials (Q3-Q8) have approximately 50% of enchantment cost
export const specialMaterialCosts: Record<QualityTier, Record<ItemCategory, number>> = {
  1: {
    'one-handed-weapon': 0,
    'two-handed-weapon': 0,
    'spell-catalyst': 0,
    'light-armor': 0,
    'heavy-armor': 0,
    'shield': 0,
    'helmet': 0,
    'wearable': 0,
    'ammo': 0,
  },
  2: {
    'one-handed-weapon': 0,
    'two-handed-weapon': 0,
    'spell-catalyst': 0,
    'light-armor': 0,
    'heavy-armor': 0,
    'shield': 0,
    'helmet': 0,
    'wearable': 0,
    'ammo': 0,
  },
  3: {
    'one-handed-weapon': 150,
    'two-handed-weapon': 250,
    'spell-catalyst': 150,
    'light-armor': 250,
    'heavy-armor': 500,
    'shield': 250,
    'helmet': 250,
    'wearable': 125,
    'ammo': 25,
  },
  4: {
    'one-handed-weapon': 500,
    'two-handed-weapon': 750,
    'spell-catalyst': 500,
    'light-armor': 750,
    'heavy-armor': 1500,
    'shield': 750,
    'helmet': 750,
    'wearable': 375,
    'ammo': 75,
  },
  5: {
    'one-handed-weapon': 1500,
    'two-handed-weapon': 2500,
    'spell-catalyst': 1500,
    'light-armor': 2500,
    'heavy-armor': 5000,
    'shield': 2500,
    'helmet': 2500,
    'wearable': 1250,
    'ammo': 250,
  },
  6: {
    'one-handed-weapon': 5000,
    'two-handed-weapon': 7500,
    'spell-catalyst': 5000,
    'light-armor': 7500,
    'heavy-armor': 15000,
    'shield': 7500,
    'helmet': 7500,
    'wearable': 3750,
    'ammo': 750,
  },
  7: {
    'one-handed-weapon': 15000,
    'two-handed-weapon': 25000,
    'spell-catalyst': 15000,
    'light-armor': 25000,
    'heavy-armor': 50000,
    'shield': 25000,
    'helmet': 25000,
    'wearable': 12500,
    'ammo': 2500,
  },
  8: {
    'one-handed-weapon': 50000,
    'two-handed-weapon': 75000,
    'spell-catalyst': 50000,
    'light-armor': 75000,
    'heavy-armor': 150000,
    'shield': 75000,
    'helmet': 75000,
    'wearable': 37500,
    'ammo': 7500,
  },
}

// Legacy: Magic item cost modifiers (kept for backward compatibility)
// This represents the old system where materials OR enchantments cost the same
export const magicItemCosts: Record<QualityTier, Record<ItemCategory, number>> = enchantmentCosts

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
    .map(weapon => {
      // Extract AV from properties for shields
      let baseAV = 0
      if (category === 'shield' && weapon.properties) {
        const avMatch = weapon.properties.match(/AV \+(\d+)/)
        if (avMatch) {
          baseAV = parseInt(avMatch[1])
        }
      }

      return {
        name: weapon.name,
        category,
        cost: parseInt(weapon.cost),
        damage: parseInt(weapon.damage),
        properties: weapon.properties,
        load: parseInt(weapon.load),
        quality: parseInt(weapon.quality),
        baseAV: category === 'shield' ? baseAV : undefined,
      }
    })
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
    .map(item => {
      const baseAV = parseInt(item.av) || 0
      const additionalProps = item.properties && item.properties !== '-' ? `, ${item.properties}` : ''
      
      return {
        name: item.name,
        category,
        cost: parseInt(item.cost),
        damage: item.damage ? parseInt(item.damage) : undefined,
        properties: `AV +${baseAV}${additionalProps}`,
        load: parseInt(item.load),
        quality: parseInt(item.quality),
        slot: category === 'helmet' ? 'head' : 'body',
        baseAV,
      }
    })
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
  'shield': transformWeaponData(weaponsData as any[], 'shield'), // Shields are in weapons.json with AV extracted
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
  return enchantments.filter(enchantment => {
    // Check if quality tier is available
    if (!enchantment.qualityTiers.includes(quality)) {
      return false
    }
    
    // Check if enchantment applies to this category
    if (enchantment.applicableCategories.includes(category)) {
      return true
    }
    
    // Suffix enchantments (wearable) can be applied to any item type except ammo
    // as per documentation: "When choosing a [suffix] enchantment for any non-wearable type of item, roll on the table for wearable enchantments."
    // Ammo is excluded as it's not permanent equipment
    if (enchantment.type === 'suffix' && enchantment.applicableCategories.includes('wearable') && category !== 'ammo') {
      return true
    }
    
    return false
  })
}

export function calculateMagicItemCost(
  baseItem: BaseItem, 
  quality: QualityTier, 
  material: SpecialMaterial | null, 
  hasEnchantment: boolean
): number {
  const baseCost = baseItem.cost
  
  // Calculate material extra cost (0 for base materials, cost from table for special materials)
  let materialExtraCost = 0
  if (material && material.materialType === 'special') {
    materialExtraCost = specialMaterialCosts[quality][baseItem.category]
  }
  
  // Calculate enchantment cost
  const enchantmentCost = hasEnchantment ? enchantmentCosts[quality][baseItem.category] : 0
  
  // Total Cost = Base + Material Extra Cost + Enchantment Cost
  return baseCost + materialExtraCost + enchantmentCost
}

// Helper function to get material extra cost for display
export function getMaterialExtraCost(
  material: SpecialMaterial | null,
  quality: QualityTier,
  category: ItemCategory
): number {
  if (!material || material.materialType === 'base') {
    return 0
  }
  return specialMaterialCosts[quality][category]
}

// Helper function to get enchantment cost for display
export function getEnchantmentCost(
  quality: QualityTier,
  category: ItemCategory
): number {
  return enchantmentCosts[quality][category]
}

export function getWeaponDamageBonus(baseQuality: number, targetQuality: QualityTier): number {
  // Weapon damage scaling: Q3/Q4 = +1, Q5 = +2, Q6 = +3, ...; Q3 only if not already Q3 base
  if (baseQuality >= 3 && targetQuality === 3) {
    return 0;
  }
  if (targetQuality === 3 || targetQuality === 4) {
    return 1;
  }
  if (targetQuality >= 5) {
    return targetQuality - 4 + 1;
  }
  return 0;
}

export function getAmmoDamageBonus(baseQuality: number, targetQuality: QualityTier): number {
  // Ammo damage scaling: Q1=0, Q2=0, Q3=+1, Q4=+2, Q5=+3, Q6=+4, Q7=+5, Q8=+6
  if (targetQuality >= 3 && targetQuality <= 8) {
    return targetQuality - 2;
  }
  return 0;
}

export function getArmorAVBonus(targetQuality: QualityTier): number {
  // Armor gains AV bonus starting at Q4
  const bonuses: Record<QualityTier, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 1,
    5: 2,
    6: 3,
    7: 4,
    8: 5,
  }
  return bonuses[targetQuality]
}

export function getTotalAV(baseItem: BaseItem, quality: QualityTier): number {
  let baseAV = baseItem.baseAV || 0
  
  // For items without baseAV field, try to extract AV from properties string
  if (!baseItem.baseAV && baseItem.properties) {
    const avMatch = baseItem.properties.match(/AV \+(\d+)/)
    if (avMatch) {
      baseAV = parseInt(avMatch[1])
    }
  }
  
  const magicBonus = getArmorAVBonus(quality)
  
  // For shields (including bucklers), always apply magic AV bonus even if base AV is 0
  if (baseItem.category === 'shield' || baseItem.name.toLowerCase().includes('buckler')) {
    return baseAV + magicBonus
  }
  
  return baseAV + magicBonus
}

export function getDurabilityDie(baseItem: BaseItem, quality: QualityTier): string {
  // Determine base durability for the item type
  const getBaseDurability = (item: BaseItem): string => {
    const properties = item.properties?.toLowerCase() || ''
    const name = item.name?.toLowerCase() || ''
    const allText = `${properties} ${name}`

    // d4 for fragile materials
    if (allText.includes('glass') || allText.includes('ceramic') || allText.includes('cloth') || allText.includes('fragile')) {
      return 'd4'
    }

    // For weapons and shields
    if (item.category.includes('weapon') || item.category === 'shield') {
      if (properties.includes('heavy') || properties.includes('two-handed') || allText.includes('heavy') || allText.includes('two-handed')) {
        return 'd8' // Heavy/two-handed weapons
      }
      return 'd6' // Light/normal weapons
    }

    // For armor
    if (item.category.includes('armor')) {
      if (item.category === 'heavy-armor' || allText.includes('heavy')) {
        return 'd8' // Heavy armor
      }
      return 'd6' // Light armor
    }

    // For other items (spell catalysts, wearables, etc.)
    if (allText.includes('metal') || allText.includes('stone')) {
      return 'd8'
    }
    
    return 'd6' // Default
  }

  const baseDurability = getBaseDurability(baseItem)
  
  // Apply quality bonuses (die step increases)
  // Die progression: d4 → d6 → d8 → d10 → d12 → d12+1 → d12+2 → etc.
  const dieSteps = ['d4', 'd6', 'd8', 'd10', 'd12']
  const baseIndex = dieSteps.indexOf(baseDurability)
  
  // Magic item durability bonuses from documentation
  const bonusSteps: Record<QualityTier, number> = {
    1: 0, // No bonus for Q1
    2: 0, // No bonus for Q2
    3: 0, // No bonus for Q3
    4: 1, // +1d
    5: 1, // +1d
    6: 2, // +2d  
    7: 2, // +2d
    8: 3, // +3d
  }
  
  const finalIndex = baseIndex + bonusSteps[quality]
  
  if (finalIndex < dieSteps.length) {
    return dieSteps[finalIndex]
  } else {
    // Beyond d12, add bonuses: d12+1, d12+2, etc.
    const overflow = finalIndex - (dieSteps.length - 1)
    return `d12+${overflow}`
  }
}

export function getSpellDamageBonus(quality: QualityTier): number {
  // Spell catalysts get spell damage bonuses
  if (quality === 1 || quality === 2) {
    return 0  // No bonus for Q1-Q2
  } else if (quality === 3 || quality === 4) {
    return 1
  } else if (quality >= 5) {
    return quality - 4 + 1
  }
  return 0
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
  // For items with enchantments, start directly with enchantment name and description
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
    
    // For suffix enchantments, include the item name before the enchantment
    let enchantmentTitle = enchantment.name
    if (enchantment.type === 'suffix') {
      enchantmentTitle = `${baseItem.name} ${enchantment.name}`
    }
    
    let description = `${enchantmentTitle}. ${scaledDescription}`
    
    // Add material information if present - use concise format
    if (material) {
      description += `\n\n${material.name}. ${material.description}\n${material.properties}`
    }
    
    return description
  }
  
  // For items without enchantments, provide basic description
  let description = baseItem.description || `Magic ${baseItem.name.toLowerCase()}.`
  
  if (material) {
    description += `\n\n${material.name}. ${material.description}\n${material.properties}`
  }
  
  return description
}

// Property modification helper functions
export interface PropertyModifications {
  loadReduction: number
  rigidReduction: number
  heavyReduction: number
  removeNoisy: boolean
}

export function calculatePropertyModifications(
  category: ItemCategory,
  material?: SpecialMaterial,
  enchantment?: Enchantment
): PropertyModifications {
  const modifications: PropertyModifications = {
    loadReduction: 0,
    rigidReduction: 0,
    heavyReduction: 0,
    removeNoisy: false
  }

  // Apply material property modifications
  if (material?.properties) {
    modifications.loadReduction += extractLoadReduction(material.properties, category)
    modifications.rigidReduction += extractRigidReduction(material.properties)
  }

  // Apply enchantment property modifications
  if (enchantment?.description) {
    modifications.rigidReduction += extractRigidReduction(enchantment.description)
    modifications.removeNoisy = extractNoisyRemoval(enchantment.description)
  }

  return modifications
}

function extractLoadReduction(text: string, category: ItemCategory): number {
  // Look for patterns like "Armor/Shield: -1 load", "Light Armor: -1 load", etc.
  const patterns = [
    /(?:Armor\/Shield|Light Armor|Heavy Armor|Weapon\/Armor\/Shield|Weapon\/Shield\/Ammo|Any):\s*-(\d+)\s+load/gi,
    /Weapon\/Shield\/Ammo:\s*-(\d+)\s+load/gi,
  ]

  for (const pattern of patterns) {
    const matches = text.matchAll(pattern)
    for (const match of matches) {
      const prefix = match[0].toLowerCase()
      const reduction = parseInt(match[1])
      
      // Check if this load reduction applies to the current category
      if (prefix.includes('any') ||
          (prefix.includes('armor') && (category.includes('armor') || category === 'helmet')) ||
          (prefix.includes('shield') && category === 'shield') ||
          (prefix.includes('weapon') && category.includes('weapon')) ||
          (prefix.includes('ammo') && category === 'ammo') ||
          (prefix.includes('light armor') && category === 'light-armor') ||
          (prefix.includes('heavy armor') && category === 'heavy-armor')) {
        return reduction
      }
    }
  }
  
  return 0
}

function extractRigidReduction(text: string): number {
  // Look for patterns like "reduce its rigid property by 1/2", "Reduce the item's rigid property by 1"
  const rigidPatterns = [
    /reduce\s+(?:its?|the\s+item'?s?)\s+rigid\s+property\s+by\s+(\d+)(?:\/(\d+))?/gi,
  ]

  for (const pattern of rigidPatterns) {
    const match = pattern.exec(text)
    if (match) {
      // For scaling enchantments, we'd need quality info, but for now return the first value
      return parseInt(match[1])
    }
  }
  
  return 0
}

function extractNoisyRemoval(text: string): boolean {
  // The "Silent" enchantment text mentions options but doesn't automatically remove noisy
  // For the magic item builder, we should interpret this as user choice during item creation
  // For now, return false since the actual effect depends on item properties and user choice
  return false
}

export function calculateFinalLoad(
  baseLoad: number, 
  modifications: PropertyModifications
): number {
  return Math.max(0, baseLoad - modifications.loadReduction)
}

export function modifyPropertiesString(
  properties: string,
  modifications: PropertyModifications
): string {
  let modifiedProperties = properties

  // Handle rigid reduction
  if (modifications.rigidReduction > 0) {
    modifiedProperties = modifiedProperties.replace(/rigid\s+(\d+)/gi, (match, value) => {
      const currentRigid = parseInt(value)
      const newRigid = Math.max(0, currentRigid - modifications.rigidReduction)
      return newRigid > 0 ? `rigid ${newRigid}` : ''
    })
  }

  // Handle heavy reduction (die size reduction)
  if (modifications.heavyReduction > 0) {
    modifiedProperties = modifiedProperties.replace(/heavy\s*\(d(\d+)\)/gi, (match, dieSize) => {
      const currentDie = parseInt(dieSize)
      let newDie = currentDie
      
      // Reduce die size by the specified amount
      for (let i = 0; i < modifications.heavyReduction; i++) {
        if (newDie === 10) newDie = 8
        else if (newDie === 8) newDie = 6
        else if (newDie === 6) newDie = 4
        else break // Can't reduce below d4
      }
      
      return newDie !== currentDie ? `heavy (d${newDie})` : match
    })
  }

  // Handle noisy removal - split into array, remove, and rejoin
  if (modifications.removeNoisy) {
    const properties = modifiedProperties.split(/\s*,\s*/).filter(p => p.trim() && !p.match(/^noisy$/i))
    modifiedProperties = properties.join(', ')
  }

  // Clean up extra commas and spaces
  modifiedProperties = modifiedProperties
    .replace(/,\s*,/g, ',')
    .replace(/^,\s*/, '')
    .replace(/,\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim()

  return modifiedProperties
}
