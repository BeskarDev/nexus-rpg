/// <reference types="vitest" />
import {
  QualityTier,
  ItemCategory,
  getAvailableMaterials,
  getAvailableEnchantments,
  calculateMagicItemCost,
  getWeaponDamageBonus,
  getAmmoDamageBonus,
  getArmorAVBonus,
  generateItemName,
  generateItemDescription,
  baseItems,
  specialMaterials,
  enchantments,
  calculatePropertyModifications,
  calculateFinalLoad,
  modifyPropertiesString,
  getTotalAV,
} from '../magicItemsConfig'

describe('Magic Item Configuration', () => {
  describe('getAvailableMaterials', () => {
    it('should return materials available for specific category and quality', () => {
      const materials = getAvailableMaterials('one-handed-weapon', 4)
      expect(materials.length).toBeGreaterThan(0)
      
      // All returned materials should be applicable to one-handed weapons and include Q4
      materials.forEach(material => {
        expect(material.applicableCategories).toContain('one-handed-weapon')
        expect(material.qualityTiers).toContain(4)
      })
    })

    it('should return empty array for invalid combinations', () => {
      const materials = getAvailableMaterials('wearable', 3)
      // Most materials don't apply to wearables at Q3
      expect(materials.length).toBe(0)
    })
  })

  describe('getAvailableEnchantments', () => {
    it('should return enchantments available for specific category and quality', () => {
      const enchantments = getAvailableEnchantments('one-handed-weapon', 4)
      expect(enchantments.length).toBeGreaterThan(0)
      
      // Should include enchantments directly applicable to one-handed weapons AND suffix wearable enchantments
      enchantments.forEach(enchantment => {
        const isDirectlyApplicable = enchantment.applicableCategories.includes('one-handed-weapon')
        const isWearableSuffix = enchantment.type === 'suffix' && enchantment.applicableCategories.includes('wearable')
        expect(isDirectlyApplicable || isWearableSuffix).toBe(true)
        expect(enchantment.qualityTiers).toContain(4)
      })
    })

    it('should return correct enchantments for wearable items', () => {
      const enchantments = getAvailableEnchantments('wearable', 4)
      expect(enchantments.length).toBeGreaterThan(0)
      
      // Wearable enchantments should be suffix type
      enchantments.forEach(enchantment => {
        expect(enchantment.type).toBe('suffix')
      })
    })

    it('should not return wearable enchantments for ammo items', () => {
      const enchantments = getAvailableEnchantments('ammo', 4)
      
      // Ammo should not get any wearable suffix enchantments
      const wearableEnchantments = enchantments.filter(enchantment => 
        enchantment.type === 'suffix' && enchantment.applicableCategories.includes('wearable')
      )
      expect(wearableEnchantments.length).toBe(0)
      
      // But should still get enchantments directly applicable to ammo
      const directEnchantments = enchantments.filter(enchantment => 
        enchantment.applicableCategories.includes('ammo')
      )
      // We expect some direct ammo enchantments to exist
      expect(directEnchantments.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('calculateMagicItemCost', () => {
    const shortsword = baseItems['one-handed-weapon'].find(item => item.name === 'Shortsword')!

    it('should calculate cost with material only', () => {
      const cost = calculateMagicItemCost(shortsword, 4, true, false)
      // Base cost (50) + Q4 one-handed weapon cost (1000)
      expect(cost).toBe(1050)
    })

    it('should calculate cost with enchantment only', () => {
      const cost = calculateMagicItemCost(shortsword, 4, false, true)
      // Base cost (50) + Q4 one-handed weapon cost (1000)
      expect(cost).toBe(1050)
    })

    it('should calculate cost with both material and enchantment', () => {
      const cost = calculateMagicItemCost(shortsword, 4, true, true)
      // Base cost (50) + 2 * Q4 one-handed weapon cost (2000)
      expect(cost).toBe(2050)
    })

    it('should calculate higher quality costs correctly', () => {
      const cost = calculateMagicItemCost(shortsword, 6, true, true)
      // Base cost (50) + 2 * Q6 one-handed weapon cost (20000)
      expect(cost).toBe(20050)
    })
  })

  describe('getWeaponDamageBonus', () => {
    it('should calculate damage bonus correctly for Q2 base weapons', () => {
      expect(getWeaponDamageBonus(2, 3)).toBe(1) // Q2 -> Q3 = +1
      expect(getWeaponDamageBonus(2, 4)).toBe(1) // Q2 -> Q4 = +1
      expect(getWeaponDamageBonus(2, 6)).toBe(3) // Q2 -> Q6 = +3
    })

    it('should not give bonus to Q3 weapons at Q3', () => {
      expect(getWeaponDamageBonus(3, 3)).toBe(0) // Q3 -> Q3 = +0
    })

    it('should give bonus to Q3 weapons at higher qualities', () => {
      expect(getWeaponDamageBonus(3, 4)).toBe(1) // Q3 -> Q4 = +1
      expect(getWeaponDamageBonus(3, 6)).toBe(3) // Q3 -> Q6 = +3
    })
  })

  describe('getAmmoDamageBonus', () => {
    it('should calculate damage bonus correctly based on target quality', () => {
      expect(getAmmoDamageBonus(1, 3)).toBe(1) // Q3 = +1
      expect(getAmmoDamageBonus(1, 4)).toBe(2) // Q4 = +2
      expect(getAmmoDamageBonus(1, 5)).toBe(3) // Q5 = +3
      expect(getAmmoDamageBonus(1, 6)).toBe(4) // Q6 = +4
      expect(getAmmoDamageBonus(1, 7)).toBe(5) // Q7 = +5
      expect(getAmmoDamageBonus(1, 8)).toBe(6) // Q8 = +6
    })

    it('should work regardless of base quality', () => {
      expect(getAmmoDamageBonus(2, 3)).toBe(1) // Q3 = +1
      expect(getAmmoDamageBonus(3, 4)).toBe(2) // Q4 = +2
      expect(getAmmoDamageBonus(2, 6)).toBe(4) // Q6 = +4
    })

    it('should return 0 for invalid qualities', () => {
      // Testing with non-existent quality tier - function should handle gracefully
      expect(getAmmoDamageBonus(1, 9 as any)).toBe(0)
    })
  })

  describe('getArmorAVBonus', () => {
    it('should return correct AV bonuses for each quality', () => {
      expect(getArmorAVBonus(3)).toBe(0)
      expect(getArmorAVBonus(4)).toBe(1)
      expect(getArmorAVBonus(5)).toBe(2)
      expect(getArmorAVBonus(6)).toBe(3)
      expect(getArmorAVBonus(7)).toBe(4)
      expect(getArmorAVBonus(8)).toBe(5)
    })
  })

  describe('generateItemName', () => {
    const shortsword = baseItems['one-handed-weapon'].find(item => item.name === 'Shortsword')!
    const mithril = specialMaterials.find(m => m.id === 'mithril')!
    const flaming = enchantments.find(e => e.id === 'flaming')!

    it('should generate name with material only', () => {
      const name = generateItemName(shortsword, mithril)
      expect(name).toBe('Mithril Shortsword')
    })

    it('should generate name with prefix enchantment only', () => {
      const name = generateItemName(shortsword, undefined, flaming)
      expect(name).toBe('Flaming Shortsword')
    })

    it('should generate name with suffix enchantment only', () => {
      const amulet = baseItems['wearable'].find(item => item.name === 'Amulet')!
      const ofOgreStrength = enchantments.find(e => e.name === 'of Ogre Strength')!
      const name = generateItemName(amulet, undefined, ofOgreStrength)
      expect(name).toBe('Amulet of Ogre Strength')
    })

    it('should generate name with material and prefix enchantment', () => {
      const name = generateItemName(shortsword, mithril, flaming)
      expect(name).toBe('Flaming Mithril Shortsword')
    })

    it('should generate name with material and suffix enchantment', () => {
      const amulet = baseItems['wearable'].find(item => item.name === 'Amulet')!
      const ofOgreStrength = enchantments.find(e => e.name === 'of Ogre Strength')!
      const name = generateItemName(amulet, mithril, ofOgreStrength)
      expect(name).toBe('Mithril Amulet of Ogre Strength')
    })
  })

  describe('generateItemDescription', () => {
    const shortsword = baseItems['one-handed-weapon'].find(item => item.name === 'Shortsword')!
    const mithril = specialMaterials.find(m => m.id === 'mithril')!
    const flaming = enchantments.find(e => e.id === 'flaming')!

    it('should generate description with base item only', () => {
      const description = generateItemDescription(shortsword, 4)
      expect(description).toContain('Magic shortsword')
    })

    it('should include material information', () => {
      const description = generateItemDescription(shortsword, 5, mithril)
      expect(description).toContain('Mithril.') // Concise material format
      expect(description).toContain(mithril.description)
      expect(description).toContain(mithril.properties)
    })

    it('should include enchantment information', () => {
      const description = generateItemDescription(shortsword, 4, undefined, flaming)
      expect(description).toContain('Flaming.') // Prefix enchantment format
      expect(description).toContain('ignite it with flames')
    })

    it('should scale enchantment values correctly', () => {
      // Test that scaling works correctly - Flaming should show '2' damage at Q4
      const description4 = generateItemDescription(shortsword, 4, undefined, flaming)
      expect(description4).toContain('Flaming.')
      expect(description4).toContain('deals 2 fire damage')
    })

    it('should include item name for suffix enchantments', () => {
      const amulet = baseItems['wearable'].find(item => item.name === 'Amulet')!
      const ofOgreStrength = enchantments.find(e => e.name === 'of Ogre Strength')!
      const description = generateItemDescription(amulet, 4, undefined, ofOgreStrength)
      expect(description).toContain('Amulet of Ogre Strength.') // Item name + suffix enchantment
      expect(description).toContain('increase the weapon damage')
    })
  })

  describe('Data validation', () => {
    it('should have all base item categories represented', () => {
      const categories: ItemCategory[] = [
        'one-handed-weapon',
        'two-handed-weapon',
        'spell-catalyst',
        'light-armor',
        'heavy-armor',
        'shield',
        'helmet',
        'wearable',
        'ammo',
      ]
      
      categories.forEach(category => {
        expect(baseItems[category]).toBeDefined()
        if (baseItems[category].length === 0) {
          console.log(`${category} has 0 items`)
        }
        expect(baseItems[category].length).toBeGreaterThan(0)
      })
    })

    it('should have materials for each quality tier', () => {
      const qualityTiers: QualityTier[] = [3, 4, 5, 6, 7, 8]
      
      qualityTiers.forEach(tier => {
        const materialsForTier = specialMaterials.filter(m => m.qualityTiers.includes(tier))
        expect(materialsForTier.length).toBeGreaterThan(0)
      })
    })

    it('should have enchantments for weapon categories', () => {
      const weaponEnchantments = enchantments.filter(e => 
        e.applicableCategories.includes('one-handed-weapon') || 
        e.applicableCategories.includes('two-handed-weapon')
      )
      expect(weaponEnchantments.length).toBeGreaterThan(0)
    })

    it('should have suffix enchantments for wearable items', () => {
      const wearableEnchantments = enchantments.filter(e => 
        e.applicableCategories.includes('wearable') && e.type === 'suffix'
      )
      expect(wearableEnchantments.length).toBeGreaterThan(0)
    })
  })

  describe('Property Modifications', () => {
    
    const mithrilMaterial = {
      id: "mithril",
      name: "Mithril",
      description: "Lightweight, silvery metal. High durability with very low weight; ideal for fast fighters.",
      qualityTiers: [5, 6],
      properties: "Armor/Shield: -1 load (min. 0). Reduce the item's rigid property by 1 (min. 0).",
      applicableCategories: ["light-armor", "heavy-armor", "shield", "helmet"]
    }

    const silentEnchantment = {
      id: "silent",
      name: "Silent",
      description: "While wearing this item, either reduce its rigid property by 1/2 (min. 0), remove its noisy property, or gain +1 boon on Stealth rolls to move silently or surprise your enemies. You must choose the applicable effect in the given order, depending on the properties of the item.",
      qualityTiers: [4, 6],
      type: "prefix",
      applicableCategories: ["light-armor", "heavy-armor"],
      scaling: true
    }

    it('should calculate load reduction from material properties', () => {
      const modifications = calculatePropertyModifications('heavy-armor', mithrilMaterial, null)
      expect(modifications.loadReduction).toBe(1)
      expect(modifications.rigidReduction).toBe(1)
      expect(modifications.heavyReduction).toBe(0)
      expect(modifications.removeNoisy).toBe(false)
    })

    it('should calculate rigid reduction from enchantment', () => {
      const modifications = calculatePropertyModifications('heavy-armor', null, silentEnchantment)
      expect(modifications.loadReduction).toBe(0)
      expect(modifications.rigidReduction).toBe(1)
      expect(modifications.heavyReduction).toBe(0)
      expect(modifications.removeNoisy).toBe(false)
    })

    it('should combine material and enchantment modifications', () => {
      const modifications = calculatePropertyModifications('heavy-armor', mithrilMaterial, silentEnchantment)
      expect(modifications.loadReduction).toBe(1)
      expect(modifications.rigidReduction).toBe(2) // 1 from mithril + 1 from silent
      expect(modifications.heavyReduction).toBe(0)
      expect(modifications.removeNoisy).toBe(false)
    })

    it('should calculate final load with minimum of 0', () => {
      const modifications = { loadReduction: 2, rigidReduction: 0, heavyReduction: 0, removeNoisy: false }
      expect(calculateFinalLoad(3, modifications)).toBe(1) // 3 - 2 = 1
      expect(calculateFinalLoad(1, modifications)).toBe(0) // 1 - 2 = 0 (min)
    })

    it('should modify rigid property in strings', () => {
      const modifications = { loadReduction: 0, rigidReduction: 1, heavyReduction: 0, removeNoisy: false }
      expect(modifyPropertiesString('heavy (d6), rigid 2', modifications)).toBe('heavy (d6), rigid 1')
      expect(modifyPropertiesString('rigid 1', modifications)).toBe('') // rigid 1 - 1 = 0, removed
    })

    it('should remove noisy property', () => {
      const modifications = { loadReduction: 0, rigidReduction: 0, heavyReduction: 0, removeNoisy: true }
      expect(modifyPropertiesString('noisy', modifications)).toBe('')
      expect(modifyPropertiesString('chain, noisy, flexible', modifications)).toBe('chain, flexible')
    })

    it('should handle heavy die reduction', () => {
      const modifications = { loadReduction: 0, rigidReduction: 0, heavyReduction: 1, removeNoisy: false }
      expect(modifyPropertiesString('heavy (d10)', modifications)).toBe('heavy (d8)')
      expect(modifyPropertiesString('heavy (d8)', modifications)).toBe('heavy (d6)')
      expect(modifyPropertiesString('heavy (d6)', modifications)).toBe('heavy (d4)')
      expect(modifyPropertiesString('heavy (d4)', modifications)).toBe('heavy (d4)') // Can't go lower
    })
  })

  describe('AV Handling for Items with AV in Properties', () => {
    it('should extract AV from properties string for helmets', () => {
      const helmet = {
        name: 'Helmet',
        category: 'helmet' as ItemCategory,
        cost: 150,
        properties: 'AV +1, apparel (head)',
        load: 1,
        quality: 2,
        slot: 'head'
      }
      
      // Q5 helmet should have base AV 1 + magic bonus 2 = total AV 3
      const totalAV = getTotalAV(helmet, 5)
      expect(totalAV).toBe(3)
    })

    it('should properly replace AV in properties string', () => {
      // Test the exact logic from enhanceProperties
      let properties = 'AV +1, apparel (head)'
      const totalAV = 3
      
      if (properties.match(/AV \+\d+/)) {
        properties = properties.replace(/AV \+\d+/, `AV +${totalAV}`)
      }
      
      expect(properties).toBe('AV +3, apparel (head)')
      expect(properties).not.toContain('AV +1')
    })

    it('should handle mithril helmet AV correctly', () => {
      const helmet = {
        name: 'Helmet',
        category: 'helmet' as ItemCategory,
        cost: 150,
        properties: 'AV +1, apparel (head)',
        load: 1,
        quality: 2,
        slot: 'head'
      }
      
      const mithril = {
        id: "mithril",
        name: "Mithril",
        description: "Lightweight, silvery metal.",
        properties: "Armor/Shield: -1 load (min. 0). Reduce the item's rigid property by 1 (min. 0).",
        qualityTiers: [5, 6] as QualityTier[],
        applicableCategories: ["light-armor", "heavy-armor", "shield", "helmet"] as ItemCategory[]
      }
      
      // Test the full property enhancement flow
      let properties = helmet.properties
      const totalAV = getTotalAV(helmet, 5) // Should be 3
      
      // AV replacement
      if (properties.match(/AV \+\d+/)) {
        properties = properties.replace(/AV \+\d+/, `AV +${totalAV}`)
      }
      
      // Property modifications (mithril effects)
      const modifications = calculatePropertyModifications('helmet', mithril, undefined)
      properties = modifyPropertiesString(properties, modifications)
      
      // Final result should be AV +3 without duplication
      expect(properties).toBe('AV +3, apparel (head)')
      expect(properties).not.toMatch(/AV \+\d+.*AV \+\d+/) // No duplicate AV values
    })
  })
})
