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
	return {
		...data,
		strength: {
			...data.strength,
			value:
				typeof data.strength.value === 'string'
					? Number(data.strength.value.split('d')[1])
					: data.strength.value,
		},
		agility: {
			...data.agility,
			value:
				typeof data.agility.value === 'string'
					? Number(data.agility.value.split('d')[1])
					: data.agility.value,
		},
		spirit: {
			...data.spirit,
			value:
				typeof data.spirit.value === 'string'
					? Number(data.spirit.value.split('d')[1])
					: data.spirit.value,
		},
		mind: {
			...data.mind,
			value:
				typeof data.mind.value === 'string'
					? Number(data.mind.value.split('d')[1])
					: data.mind.value,
		},
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
	} as Skills
}

const migrateItems = (data: any): Items => {
	return {
		...data,
		weapons: data.weapons.map((weapon) => ({
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
		items: data.items.map((item) => ({
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
