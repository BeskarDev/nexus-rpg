export type MagicItemCategory = 'Weapon' | 'Wearable' | 'Consumable' | 'Spell Scroll'

export type MagicItem = {
	name: string
	category: MagicItemCategory
	quality: string
	type: string
	material?: string
	cost: string
	load: string
	properties?: string
	weaponDamage?: string
	durability?: string
	equipmentSlot?: string
	uses?: string
	craftingTime?: string
	spellEffect?: string
	description: string
	enchantment?: string
	effect?: string
	note?: string
}
