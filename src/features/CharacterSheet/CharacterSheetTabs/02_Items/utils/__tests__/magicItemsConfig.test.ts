import { describe, it, expect } from 'vitest'
import {
	calculateMagicItemCost,
	getMagicItemBaseCost,
	getSpecialMaterialExtraCost,
	getEnchantmentCost,
	baseItems,
	specialMaterials,
	enchantments,
	getWeaponDamageBonus,
	getArmorAVBonus,
} from '../magicItemsConfig'

describe('MagicItemsConfig - Cost Calculations', () => {
	it('Q4 magic longsword +1 = 100 + 1,000 = 1,100 coins', () => {
		// Find longsword base item (Q2 costs 100 coins)
		const longsword = baseItems['one-handed-weapon'].find((w) =>
			w.name.includes('Longsword'),
		)!

		// Magic Item Base Cost for Q4 one-handed weapon = 1,000
		const magicBaseCost = getMagicItemBaseCost(4, 'one-handed-weapon')
		expect(magicBaseCost).toBe(1000)

		// No special material (Bronze is base material, 0 extra cost)
		const bronze = specialMaterials.find((m) => m.name === 'Bronze')!
		const materialCost = getSpecialMaterialExtraCost(
			bronze,
			4,
			'one-handed-weapon',
		)
		expect(materialCost).toBe(0)

		// No enchantment

		// Total
		const totalCost = calculateMagicItemCost(longsword, 4, bronze, null)
		expect(totalCost).toBe(1100)
	})

	it('Q5 mithril breastplate +2 = 750 + 10,000 + 5,000 = 15,750 coins', () => {
		// Find breastplate base item
		const breastplate = baseItems['heavy-armor'].find((a) =>
			a.name.includes('Breastplate'),
		)!

		// Magic Item Base Cost for Q5 heavy armor = 10,000
		const magicBaseCost = getMagicItemBaseCost(5, 'heavy-armor')
		expect(magicBaseCost).toBe(10000)

		// Mithril special material for Q5 heavy armor = 5,000
		const mithril = specialMaterials.find((m) => m.name === 'Mithril')!
		const materialCost = getSpecialMaterialExtraCost(mithril, 5, 'heavy-armor')
		expect(materialCost).toBe(5000)

		// No enchantment

		// Total
		const totalCost = calculateMagicItemCost(breastplate, 5, mithril, null)
		expect(totalCost).toBe(15750)
	})

	it('Q6 flaming adamantite longsword +3 = 100 + 10,000 + 5,000 + 10,000 = 25,100 coins', () => {
		// Find longsword base item
		const longsword = baseItems['one-handed-weapon'].find((w) =>
			w.name.includes('Longsword'),
		)!

		// Magic Item Base Cost for Q6 one-handed weapon = 10,000
		const magicBaseCost = getMagicItemBaseCost(6, 'one-handed-weapon')
		expect(magicBaseCost).toBe(10000)

		// Adamantite special material for Q6 one-handed weapon = 5,000
		const adamantite = specialMaterials.find((m) => m.name === 'Adamantite')!
		const materialCost = getSpecialMaterialExtraCost(
			adamantite,
			6,
			'one-handed-weapon',
		)
		expect(materialCost).toBe(5000)

		// Flaming enchantment for Q6 one-handed weapon = 10,000
		const flaming = enchantments.find((e) => e.name === 'Flaming')!
		const enchantmentCostValue = getEnchantmentCost(6, 'one-handed-weapon')
		expect(enchantmentCostValue).toBe(10000)

		// Total
		const totalCost = calculateMagicItemCost(longsword, 6, adamantite, flaming)
		expect(totalCost).toBe(25100)
	})

	it('Q4 amulet of protection = 50 + 1,000 = 1,050 coins (wearables skip magic base cost)', () => {
		// Find amulet base item
		const amulet = baseItems['wearable'].find((w) => w.name.includes('Amulet'))!

		// Wearables skip Magic Item Base Cost = 0
		const magicBaseCost = getMagicItemBaseCost(4, 'wearable')
		expect(magicBaseCost).toBe(0)

		// No special material (Bronze is base material, 0 extra cost)
		const bronze = specialMaterials.find((m) => m.name === 'Bronze')!
		const materialCost = getSpecialMaterialExtraCost(bronze, 4, 'wearable')
		expect(materialCost).toBe(0)

		// Protection enchantment for Q4 wearable (uses one-handed weapon costs) = 1,000
		const protection = enchantments.find((e) => e.name === 'of Protection')!
		const enchantmentCostValue = getEnchantmentCost(4, 'wearable')
		expect(enchantmentCostValue).toBe(1000)

		// Total
		const totalCost = calculateMagicItemCost(amulet, 4, bronze, protection)
		expect(totalCost).toBe(1050)
	})

	it('Wearable material costs aligned with one-handed weapons', () => {
		const mithril = specialMaterials.find((m) => m.name === 'Mithril')!

		// Q5 mithril wearable should cost same as Q5 mithril one-handed weapon = 1,500
		const wearableCost = getSpecialMaterialExtraCost(mithril, 5, 'wearable')
		const oneHandedCost = getSpecialMaterialExtraCost(
			mithril,
			5,
			'one-handed-weapon',
		)

		expect(wearableCost).toBe(oneHandedCost)
		expect(wearableCost).toBe(1500)
	})
})

describe('MagicItemsConfig - Damage Bonuses', () => {
	it('Weapon damage bonuses scale correctly', () => {
		// Q3/Q4 = +1, Q5 = +2, Q6 = +3, Q7 = +4, Q8 = +5
		expect(getWeaponDamageBonus(1, 3)).toBe(1)
		expect(getWeaponDamageBonus(1, 4)).toBe(1)
		expect(getWeaponDamageBonus(1, 5)).toBe(2)
		expect(getWeaponDamageBonus(1, 6)).toBe(3)
		expect(getWeaponDamageBonus(1, 7)).toBe(4)
		expect(getWeaponDamageBonus(1, 8)).toBe(5)
	})
})

describe('MagicItemsConfig - AV Bonuses', () => {
	it('Armor AV bonuses scale correctly', () => {
		// Q3 = +0, Q4 = +1, Q5 = +2, Q6 = +3, Q7 = +4, Q8 = +5
		expect(getArmorAVBonus(3)).toBe(0)
		expect(getArmorAVBonus(4)).toBe(1)
		expect(getArmorAVBonus(5)).toBe(2)
		expect(getArmorAVBonus(6)).toBe(3)
		expect(getArmorAVBonus(7)).toBe(4)
		expect(getArmorAVBonus(8)).toBe(5)
	})
})
