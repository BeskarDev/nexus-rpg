export const ITEM_LOCATIONS = [
	'weapons',
	'worn', 
	'carried',
	'mount',
	'storage'
] as const

export type ItemLocation = typeof ITEM_LOCATIONS[number]