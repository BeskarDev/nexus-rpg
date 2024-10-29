import { DocumentData, DocumentSnapshot } from 'firebase/firestore'
import {
	Character,
	CharacterDocument,
	Items,
	Personal,
	Skills,
	Spells,
	Statistics,
} from '../../../types/Character'

export const migrateDoc = (
	collectionId: string,
	doc: DocumentSnapshot<DocumentData, DocumentData>,
): CharacterDocument => {
	const data = doc.data()
	const updatedDoc = { ...data }

	Object.entries(data).forEach(([key, value]) => {
		if (key === 'statistics') {
			updatedDoc.statistics = migrateStatistics(value)
			return
		}
		if (key === 'skills') {
			updatedDoc.skills = migrateSkills(value)
			return
		}
		if (key === 'items') {
			updatedDoc.items = migrateItems(value)
			return
		}
		if (key === 'spells') {
			updatedDoc.spells = migrateSpells(value)
			return
		}
		if (key === 'personal') {
			updatedDoc.personal = migratePersonal(value)
			return
		}
	})

	const migratedDoc: CharacterDocument = {
		docRef: doc.ref,
		docId: doc.id,
		collectionId,
		...(updatedDoc as Character),
	}
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
			return typeof ability === 'string'
				? {
						id: crypto.randomUUID(),
						description: ability,
					}
				: ability
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

const migratePersonal = (data: any): Personal => {
	return {
		...data,
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
