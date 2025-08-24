import { CharacterDocument } from '@site/src/types/Character'
import { normalizeSkillName } from '../../../constants/skills'
import { calculateSkillRank } from './skillUtils'

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

	// Ensure npcRelationships array exists for new unified NPC system
	if (!character.personal?.npcRelationships) {
		// Ensure personal object exists
		if (!character.personal) {
			character.personal = {} as any
		}
		character.personal.npcRelationships = []

		// Migrate legacy NPC data if it exists
		const personal = character.personal as any
		if (personal.allies || personal.contacts || personal.rivals) {
			// Helper function to extract name from relationship description
			const extractName = (description: string): string => {
				// Try to find a name at the beginning (capitalized word)
				const match = description.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*?)(?:\s*[-:,]|$)/)
				return match ? match[1].trim() : description.split(' ')[0] || description
			}

			// Convert allies (disposition +1)
			if (personal.allies && Array.isArray(personal.allies)) {
				const convertedAllies = personal.allies.map((ally: any) => ({
					id: crypto.randomUUID(),
					name: extractName(ally.description || ally.name || ''),
					role: 'Adventurer' as const,
					disposition: 1,
					description: ally.description || ally.name || '',
				}))
				character.personal.npcRelationships.push(...convertedAllies)
			}

			// Convert contacts (disposition 0)
			if (personal.contacts && Array.isArray(personal.contacts)) {
				const convertedContacts = personal.contacts.map((contact: any) => ({
					id: crypto.randomUUID(),
					name: extractName(contact.description || contact.name || ''),
					role: 'Artisan' as const,
					disposition: 0,
					description: contact.description || contact.name || '',
				}))
				character.personal.npcRelationships.push(...convertedContacts)
			}

			// Convert rivals (disposition -1)
			if (personal.rivals && Array.isArray(personal.rivals)) {
				const convertedRivals = personal.rivals.map((rival: any) => ({
					id: crypto.randomUUID(),
					name: extractName(rival.description || rival.name || ''),
					role: 'Scoundrel' as const,
					disposition: -1,
					description: rival.description || rival.name || '',
				}))
				character.personal.npcRelationships.push(...convertedRivals)
			}

			// Clean up legacy properties
			delete personal.allies
			delete personal.contacts
			delete personal.rivals
		}
	}

	return character
}