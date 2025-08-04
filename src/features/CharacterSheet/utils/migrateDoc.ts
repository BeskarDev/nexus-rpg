import { collection, doc, DocumentData, DocumentSnapshot, getDoc } from 'firebase/firestore'
import {
	Character,
	CharacterDocument,
	Items,
	Personal,
	Skills,
	Spells,
	Statistics,
} from '../../../types/Character'
import { ABILITY_TAGS } from '../../../types/AbilityTag'
import { db } from '@site/src/config/firebase'

export const migrateDoc = async (
	collectionId: string,
	doc: DocumentSnapshot<DocumentData, DocumentData>,
): Promise<CharacterDocument> => {
	const data = doc.data()
	const updatedDoc = { ...data }

	const promises = Object.entries(data).map(async ([key, value]) => {
		if (key === 'statistics') {
			updatedDoc.statistics = migrateStatistics(value)
		} else if (key === 'skills') {
			updatedDoc.skills = migrateSkills(value)
		} else if (key === 'items') {
			updatedDoc.items = migrateItems(value)
		} else if (key === 'spells') {
			updatedDoc.spells = migrateSpells(value)
		} else if (key === 'personal') {
			updatedDoc.personal = await migratePersonal(value)
		}
	})
  
	await Promise.all(promises)

	const migratedDoc: CharacterDocument = {
		docRef: doc.ref,
		docId: doc.id,
		collectionId,
		...(updatedDoc as Character),
	}
  console.log('migratedDoc', migratedDoc.personal.playerName)
	return migratedDoc
}

const migrateStatistics = (data: any): Statistics => {
	// Migrate old wound structure to new format
	let migratedData = { ...data }
	
	// If old health structure exists, migrate it
	if (data.health && (data.health.woundOne || data.health.woundTwo || data.health.woundThree)) {
		// Remove old wound structure from health
		const { woundOne, woundTwo, woundThree, ...healthWithoutWounds } = data.health
		migratedData.health = healthWithoutWounds
		
		// Count total wounds from old system
		const oldWounds = [woundOne, woundTwo, woundThree].filter(wound => wound?.injury)
		
		// Migrate old wounded flags or assign wounds randomly
		let woundCount = 0
		const attributes = ['strength', 'agility', 'spirit', 'mind']
		
		// First pass: preserve existing wounded flags
		for (const attr of attributes) {
			if (data[attr]?.wounded && woundCount < 3) {
				migratedData[attr] = {
					...data[attr],
					wounded: true
				}
				woundCount++
			} else {
				migratedData[attr] = {
					...data[attr],
					wounded: false
				}
			}
		}
		
		// Second pass: add remaining wounds randomly to unwounded attributes
		while (woundCount < oldWounds.length && woundCount < 3) {
			const unwoundedAttrs = attributes.filter(attr => !migratedData[attr].wounded)
			if (unwoundedAttrs.length === 0) break
			
			const randomAttr = unwoundedAttrs[Math.floor(Math.random() * unwoundedAttrs.length)]
			migratedData[randomAttr].wounded = true
			woundCount++
		}
	}
	
	// Add fatigue system if not present
	if (!migratedData.fatigue) {
		migratedData.fatigue = {
			current: 0,
			max: 6
		}
	}

	return {
		...migratedData,
		strength: {
			...migratedData.strength,
			value:
				typeof migratedData.strength.value === 'string'
					? Number(migratedData.strength.value.split('d')[1])
					: migratedData.strength.value,
			wounded: migratedData.strength.wounded || false,
		},
		agility: {
			...migratedData.agility,
			value:
				typeof migratedData.agility.value === 'string'
					? Number(migratedData.agility.value.split('d')[1])
					: migratedData.agility.value,
			wounded: migratedData.agility.wounded || false,
		},
		spirit: {
			...migratedData.spirit,
			value:
				typeof migratedData.spirit.value === 'string'
					? Number(migratedData.spirit.value.split('d')[1])
					: migratedData.spirit.value,
			wounded: migratedData.spirit.wounded || false,
		},
		mind: {
			...migratedData.mind,
			value:
				typeof migratedData.mind.value === 'string'
					? Number(migratedData.mind.value.split('d')[1])
					: migratedData.mind.value,
			wounded: migratedData.mind.wounded || false,
		},
		// Ensure statusEffects array exists for new status effects feature
		statusEffects: Array.isArray(migratedData.statusEffects) ? migratedData.statusEffects : [],
	} as Statistics
}

const migrateSkills = (data: any): Skills => {
	return {
		...data,
		skills: data.skills.map((skill) => ({
			...skill,
			id: skill.id || crypto.randomUUID(),
		})),
		abilities: data.abilities.map((ability) => {
			const migratedAbility = typeof ability === 'string'
				? {
						id: crypto.randomUUID(),
						title: '',
						description: ability,
					}
				: ability;
			
			// Add default tag if missing
			if (!migratedAbility.tag) {
				migratedAbility.tag = 'Other';
			}
			
			// Add default actionType if missing
			if (!migratedAbility.actionType) {
				migratedAbility.actionType = 'Other';
			}
			
			// Ensure id exists
			if (!migratedAbility.id) {
				migratedAbility.id = crypto.randomUUID();
			}
			
			// Ensure title exists
			if (!migratedAbility.title) {
				migratedAbility.title = '';
			}
			
			return migratedAbility;
		}),
		abilityCategoryVisibility: data.abilityCategoryVisibility || Object.fromEntries(
			ABILITY_TAGS.map(tag => [tag, true])
		),
	} as Skills
}

const migrateItems = (data: any): Items => {
	// Ensure encumbrance object exists with default values
	const encumbrance = {
		encumberedAt: 0,
		overencumberedAt: 0,
		carryModifier: 0,
		currentLoad: 0,
		mountMaxLoad: 0,
		storageMaxLoad: 0,
		...data.encumbrance, // Override with existing values if they exist
	}

	return {
		...data,
		encumbrance,
		weapons: (data.weapons || []).map((weapon) => ({
			...weapon,
			id: weapon.id || crypto.randomUUID(),
			damage:
				typeof weapon.damage === 'string'
					? {
							base: 0,
							weapon: 0,
							other: 0,
							otherWeak: 0,
							otherStrong: 0,
							otherCritical: 0,
							type: 'physical',
						}
					: {...weapon.damage, other: weapon.damage.other || 0 },
		})),
		items: (data.items || []).map((item) => ({
			...item,
			id: item.id || crypto.randomUUID(),
			container: item.container || 'backpack',
		})),
	} as Items
}

const migrateSpells = (data: any): Spells => {
	return {
		...data,
    spellCatalystDamage: data.spellCatalystDamage || 0,
		spells: data.spells.map((spell) => ({
			...spell,
			id: spell.id || crypto.randomUUID(),
      dealsDamage: Boolean(spell.damage.base),
			damage:
				spell.damage === undefined
					? {
							base: 0,
							weapon: 0,
							other: 0,
							otherWeak: 0,
							otherStrong: 0,
							otherCritical: 0,
							type: 'physical',
						}
					: {...spell.damage, other: spell.damage.other || 0 },
		})),
	} as Spells
}

const migratePersonal = async (data: any): Promise<Personal> => {
  const url = new URL(window.location.href);
  const idParam = url.searchParams.get('id');

  if (!idParam) {
    throw new Error('URL parameter "id" is missing.');
  }

  const [collectionId, docId] = idParam.split('-');
  if (!collectionId || !docId) {
    throw new Error('Invalid "id" parameter format in URL.');
  }

  const playerInfoDoc = await getDoc(doc(db, collectionId, 'player-info'));
  const playerName: string = playerInfoDoc.data()?.name;

	return {
		...data,
    playerName: data.playerName !== undefined ? data.playerName : playerName,
		profilePicture: data.profilePicture || '',
		allies: data.allies.map((ally) => {
			return typeof ally === 'string'
				? {
						id: crypto.randomUUID(),
						description: ally,
					}
				: ally
		}),
		contacts: data.contacts.map((contact) => {
			return typeof contact === 'string'
				? {
						id: crypto.randomUUID(),
						description: contact,
					}
				: contact
		}),
		rivals: data.rivals.map((rival) => {
			return typeof rival === 'string'
				? {
						id: crypto.randomUUID(),
						description: rival,
					}
				: rival
		}),
	} as Personal
}
