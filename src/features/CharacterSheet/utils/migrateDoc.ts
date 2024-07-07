import { DocumentData, DocumentSnapshot } from 'firebase/firestore'
import {
	Character,
	CharacterDocument,
	Items,
	Personal,
	Skills,
	Spells,
} from '../../../types/Character'

export const migrateDoc = (
	doc: DocumentSnapshot<DocumentData, DocumentData>,
): CharacterDocument => {
	const data = doc.data()
	const updatedDoc = { ...data }

	Object.entries(data).forEach(([key, value]) => {
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
		...(updatedDoc as Character),
	}
	return migratedDoc
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
							otherWeak: 0,
							otherStrong: 0,
							otherCritical: 0,
							type: 'physical',
						}
					: weapon.damage,
		})),
		items: data.items.map((item) => ({
			...item,
			id: item.id || crypto.randomUUID(),
		})),
	} as Items
}

const migrateSpells = (data: any): Spells => {
	return {
		...data,
		spells: data.spells.map((spell) => ({
			...spell,
			id: spell.id || crypto.randomUUID(),
			damage:
				spell.damage === undefined
					? {
							base: 0,
							weapon: 0,
							otherWeak: 0,
							otherStrong: 0,
							otherCritical: 0,
							type: 'physical',
						}
					: spell.damage,
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
