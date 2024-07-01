import { DocumentData, DocumentSnapshot } from 'firebase/firestore'
import { useId } from 'react'
import { Character, Items, Personal, Skills, Spells } from '../types/Character'

export const migrateDoc = (
	docSnapshot: DocumentSnapshot<DocumentData, DocumentData>,
): Character => {
	const data = docSnapshot.data()
	const updatedDoc = { ...data }

	Object.entries(data).forEach(([key, value]) => {
		if (key === 'Skills') {
			updatedDoc.skills = migrateSkills(value)
			return
		}
		if (key === 'Items') {
			updatedDoc.items = migrateItems(value)
			return
		}
		if (key === 'Spells') {
			updatedDoc.spells = migrateSpells(value)
			return
		}
		if (key === 'Personal') {
			updatedDoc.personal = migratePersonal(value)
			return
		}
	})

	return updatedDoc as Character
}

const migrateSkills = (data: any): Skills => {
	return {
		...data,
		skills: data.skills.map((skill) => ({
			...skill,
			id: skill.id || useId(),
		})),
		abilities: data.abilities.map((ability) => {
			return typeof ability === 'string'
				? {
						id: useId(),
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
			id: weapon.id || useId(),
		})),
		items: data.items.map((item) => ({
			...item,
			id: item.id || useId(),
		})),
	} as Items
}

const migrateSpells = (data: any): Spells => {
	return {
		...data,
		spells: data.spells.map((spell) => ({
			...spell,
			id: spell.id || useId(),
		})),
	} as Spells
}

const migratePersonal = (data: any): Personal => {
	return {
		...data,
		allies: data.allies.map((ally) => {
			return typeof ally === 'string'
				? {
						id: useId(),
						description: ally,
					}
				: ally
		}),
		contacts: data.contacts.map((contact) => {
			return typeof contact === 'string'
				? {
						id: useId(),
						description: contact,
					}
				: contact
		}),
		rivals: data.rivals.map((rival) => {
			return typeof rival === 'string'
				? {
						id: useId(),
						description: rival,
					}
				: rival
		}),
	} as Personal
}
