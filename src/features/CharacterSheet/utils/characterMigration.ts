import { CharacterDocument } from '@site/src/types/Character'
import { normalizeSkillName } from '../../../constants/skills'

/**
 * Migrates character data to ensure compatibility with current schema.
 * This handles legacy character documents that may be missing required fields
 * or have outdated data structures.
 */
export function migrateCharacterData(character: CharacterDocument): CharacterDocument {
	// Migrate older characters that don't have companions array
	if (!character.companions) {
		character.companions = []
	}

	// Migrate companions that don't have HP/wounded fields
	character.companions = character.companions.map((companion) => ({
		currentHP: 0,
		maxHP: 0,
		wounded: false,
		...companion,
	}))

	// Migrate older characters that don't have statusEffects array
	if (!character.statistics?.statusEffects) {
		// Ensure statistics object exists
		if (!character.statistics) {
			character.statistics = {} as any
		}
		character.statistics.statusEffects = []
	}

	// Ensure statusEffects is always an array
	if (!Array.isArray(character.statistics?.statusEffects)) {
		// Ensure statistics object exists
		if (!character.statistics) {
			character.statistics = {} as any
		}
		character.statistics.statusEffects = []
	}

	// Migrate skills to use normalized names and ensure ranks are calculated correctly
	if (character.skills && character.skills.skills) {
		character.skills.skills = character.skills.skills.map((skill) => {
			const normalizedName = normalizeSkillName(skill.name) || skill.name

			// Calculate correct rank from XP for existing characters
			const calculateSkillRank = (xp: number): number => {
				switch (true) {
					case xp <= 1:
						return 0
					case xp <= 5:
						return 1
					case xp <= 11:
						return 2
					case xp <= 19:
						return 3
					case xp <= 29:
						return 4
					default:
						return 5
				}
			}

			return {
				...skill,
				name: normalizedName,
				id: skill.id || crypto.randomUUID(),
				rank: calculateSkillRank(skill.xp), // Ensure rank matches XP
			}
		})
	}

	// Ensure professions array exists
	if (!character.skills?.professions) {
		// Ensure skills object exists
		if (!character.skills) {
			character.skills = {} as any
		}
		character.skills.professions = []
	}

	// Ensure languages array exists with Tradespeak as default
	if (!character.skills?.languages) {
		// Ensure skills object exists
		if (!character.skills) {
			character.skills = {} as any
		}
		character.skills.languages = ['Tradespeak']
	} else if (!character.skills.languages.includes('Tradespeak')) {
		// Add Tradespeak if it's missing (safety check)
		character.skills.languages.unshift('Tradespeak')
	}

	// Migrate older characters that don't have weapons/items arrays
	if (!character.items?.weapons) {
		// Ensure items object exists
		if (!character.items) {
			character.items = {} as any
		}
		character.items.weapons = []
	}
	if (!character.items?.items) {
		// Ensure items object exists
		if (!character.items) {
			character.items = {} as any
		}
		character.items.items = []
	}

	// Migrate weapons and items to include uses and durability if missing
	character.items.weapons = character.items.weapons.map((weapon) => ({
		uses: 0,
		durability: '',
		...weapon,
	}))
	character.items.items = character.items.items.map((item) => ({
		uses: 0,
		durability: '',
		...item,
	}))

	// Ensure encumbrance has mount and storage max load fields
	if (!character.items?.encumbrance) {
		// Ensure items object exists
		if (!character.items) {
			character.items = {} as any
		}
		character.items.encumbrance = {
			encumberedAt: 0,
			overencumberedAt: 0,
			carryModifier: 0,
			currentLoad: 0,
			mountMaxLoad: 0,
			storageMaxLoad: 0,
		}
	} else {
		if (character.items.encumbrance.mountMaxLoad === undefined) {
			character.items.encumbrance.mountMaxLoad = 0
		}
		if (character.items.encumbrance.storageMaxLoad === undefined) {
			character.items.encumbrance.storageMaxLoad = 0
		}
	}

	return character
}