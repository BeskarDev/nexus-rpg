export const ITEM_LOCATIONS = ['worn', 'carried', 'mount', 'storage'] as const

export type ItemLocation = (typeof ITEM_LOCATIONS)[number]
