export interface Creature {
	name: string
	tier: number
	category: string // Basic, Elite, Lord
	type: string // e.g., "Medium Undead"
	hp: string // Can be a number like "50" or a pattern like "2×50" for elite/lord
	av: string
	str: string
	agi: string
	spi: string
	mnd: string
	parry: number
	dodge: number
	resist: number
	skills: string[]
	immunities: string[]
	resistances: string[]
	weaknesses: string[]
	attacks: Attack[]
	abilities: Ability[]
}

export interface Attack {
	name: string
	properties: string[]
	damage: string
	description?: string
}

export interface Ability {
	name: string
	description: string
	recharge?: string
}
