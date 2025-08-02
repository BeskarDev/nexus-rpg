export const ITEM_LOCATIONS = [
	'Equipped Weapons',
	'Equipped Gear', 
	'Carried Items',
	'On Mount',
	'In Storage'
] as const

export type ItemLocation = typeof ITEM_LOCATIONS[number]