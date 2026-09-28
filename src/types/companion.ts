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
		/** The creature type as printed, which Wild Companion replaces. */
		type: string
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
		/** Combat Arts learned through Animal Companion rank 2, as HTML entries. */
		combatArts: string[]
		/** The applied bond as one line of prose, or empty when there is none. */
		bond: string
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
	/**
	 * The owner, when the builder runs inside a character sheet. Prefills the Bond
	 * register once per owner and stays editable. Omitted on the docs page.
	 */
	owner?: CompanionOwner
}

/** Which option the owner took at Animal Companion rank 2. */
export type BondRank2Choice = 'two-companions' | 'combat-arts'

/** Which option the owner took at Animal Companion rank 3. */
export type BondRank3Choice = 'pack-coordination' | 'damage'

/**
 * The owner's side of a companion: their Animal Companion talent, their Nature and
 * whether the companion was summoned with the Wild Companion spell.
 *
 * None of it is stored on the character (the talent's rank 2 and rank 3 choices
 * exist nowhere else), so the builder holds it and writes the result into the
 * companion's own stat block. A saved companion is therefore self-describing.
 */
export interface CompanionBond {
	/** Animal Companion talent rank, 0 when the owner does not have it. */
	talentRank: 0 | 1 | 2 | 3
	/** The owner's Nature rank, or null when it is not known (the docs page). */
	nature: number | null
	rank2Choice: BondRank2Choice | null
	rank3Choice: BondRank3Choice | null
	/** Names of the Combat Arts learned through the rank 2 option, two at most. */
	combatArts: string[]
	wildCompanion: boolean
	/** The rank the Wild Companion spell was cast at. */
	wildCompanionRank: 1 | 2 | 3
}

/** What the character sheet knows about the companion's owner, for prefilling. */
export interface CompanionOwner {
	talentRank: 0 | 1 | 2 | 3
	nature: number | null
	knowsWildCompanion: boolean
}
