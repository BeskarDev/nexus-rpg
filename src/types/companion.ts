export interface CompanionTrait {
	name: string
	type: string
	size: string
	hp: string
	av: string
	strength: string
	agility: string
	spirit: string
	mind: string
	parry: string
	dodge: string
	resist: string
	skills: string
	immunities: string
	resistances: string
	weaknesses: string
	'attack 1': string
	'attack 2': string
	'ability 1': string
	'ability 2': string
	'ability 3': string
}

export interface CompanionStats {
	tier: number
	size: string
	trait: CompanionTrait
	calculatedStats: {
		hp: number
		av: string
		attributes: {
			str: string
			agi: string
			spi: string
			mnd: string
		}
		defenses: {
			parry: number
			dodge: number
			resist: number
		}
		attackDamage: {
			weak: number
			normal: number
			strong: number
		}
		movement: number
		skills: string
		immunities: string
		resistances: string
		weaknesses: string
		attacks: string[]
		abilities: string[]
	}
}

export interface CompanionBuilderProps {
	showImportButton?: boolean
	onImportCompanion?: (name: string, markdown: string) => void
}
