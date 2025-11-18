export type MagicItemCategory =
	| 'Weapon'
	| 'Wearable'
	| 'Consumable'
	| 'Spell Scroll'

export type MagicItem = {
	name: string
	category: MagicItemCategory
	quality: number
	type: string
	material?: string
	cost: number
	load: number
	properties?: string
	uses?: number
	description: string
}
