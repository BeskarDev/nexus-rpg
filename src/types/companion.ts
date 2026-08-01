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
	/**
	 * Given when the builder can hand its result to a character — the Companions
	 * tab passes it, the docs page does not.
	 *
	 * It is the only signal the builder needs: the old `showImportButton` prop was
	 * a second switch for the same fact, and every call site set the two
	 * consistently anyway.
	 */
	onImportCompanion?: (name: string, markdown: string) => void
}
