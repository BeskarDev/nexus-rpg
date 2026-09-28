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
	onImportCompanion?: (
		name: string,
		markdown: string,
		build: CompanionBuild,
	) => void
	/**
	 * The owner, when the builder runs inside a character sheet. Prefills the Bond
	 * register once per owner and stays editable. Omitted on the docs page.
	 */
	owner?: CompanionOwner
	/**
	 * A saved companion to rebuild. Opens the builder loaded with its build and the
	 * current owner values, and the primary verb becomes "Update companion".
	 */
	rebuild?: {
		companionId: string
		companionName: string
		build: CompanionBuild
	} | null
	/** The rebuilt stat block, handed back for the caller to confirm and apply. */
	onUpdateCompanion?: (
		companionId: string,
		result: CompanionBuildResult,
	) => void
	/** The rebuild ended (updated or closed). The caller clears `rebuild`. */
	onRebuildClose?: () => void
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

/**
 * How a companion was built in the Companion Builder, saved on the companion so it
 * can be rebuilt or refreshed from the current rules instead of recreated.
 *
 * Holds only what the builder CHOSE. The owner's talent rank, Nature and whether
 * they know Wild Companion are read from the current character at rebuild time;
 * `builtWith` records the values used at build time for display only.
 */
export interface CompanionBuild {
	/** A `companion-traits.json` name. */
	trait: string
	tier: number
	size: string
	rank2Choice: BondRank2Choice | null
	rank3Choice: BondRank3Choice | null
	/** Combat Art names (not their text). */
	combatArts: string[]
	/** Whether the companion was summoned with the Wild Companion spell. */
	wildCompanion: boolean
	wildCompanionRank: 1 | 2 | 3
	/** The owner values used at build time. Display only, never read back. */
	builtWith?: CompanionOwner
}

/** What a rebuild or import hands back: the stat block and the build behind it. */
export interface CompanionBuildResult {
	markdown: string
	build: CompanionBuild
}
