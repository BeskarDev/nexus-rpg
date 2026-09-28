import { DamageType, Item, Weapon } from '../../../types/Character'
import equipmentData from '../../../utils/data/json/equipment.json'
import armorData from '../../../utils/data/json/armor.json'
import weaponsData from '../../../utils/data/json/weapons.json'
import { parseCostValue } from '../CharacterSheetTabs/02_Items/SearchDialog/costUtils'
import { getBaseDamageType } from '../CharacterSheetTabs/02_Items/utils/weaponDamage'

export type EquipmentData = {
	name: string
	quality: string
	category: string
	load: string
	cost: string
	description: string
}

export type ArmorData = {
	name: string
	quality: string
	type: string
	av: string
	properties: string
	load: string
	cost: string
}

export type WeaponData = {
	name: string
	quality: string
	type: string
	damage: string
	properties: string
	load: string
	cost: string
}

type ItemQuality = NonNullable<Item['quality']>

/**
 * The rulebook fields of an item: what the equipment and armor tables say about
 * it. Everything a player owns about their copy (id, amount, where it is kept,
 * uses, durability, slot) is the caller's to add.
 */
export type ItemContent = Pick<
	Item,
	'name' | 'description' | 'properties' | 'cost' | 'load'
> & {
	quality?: ItemQuality
	sourceName: string
}

/** The rulebook fields of a weapon. Location, uses and durability are the caller's. */
export type WeaponContent = Pick<
	Weapon,
	'name' | 'damage' | 'properties' | 'description' | 'cost' | 'load'
> & {
	quality?: ItemQuality
	sourceName: string
}

export type ItemSource =
	| { kind: 'equipment'; data: EquipmentData }
	| { kind: 'armor'; data: ArmorData }

/**
 * A content name as it compares, not as it reads.
 *
 * Unifies the apostrophes (the JSON uses U+2019, saved characters carry U+2018,
 * U+02BC and the plain one), collapses whitespace, lowercases, and drops a
 * trailing bracketed tag such as " [MW]" a player adds to mark their copy.
 */
export const normalizeContentName = (name: string): string =>
	(name ?? '')
		.replace(/[‘’ʼ`']/g, "'")
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/\s*\[[^\]]*\]$/, '')
		.trim()
		.toLowerCase()

/**
 * Names the Magic Item Builder produces end in a quality bonus (" +1"). Those
 * are the player's own creation and never refreshed from the base table.
 */
export const isMagicItemName = (name: string): boolean =>
	/\s\+\d+$/.test(
		(name ?? '')
			.trim()
			.replace(/\s*\[[^\]]*\]$/, '')
			.trim(),
	)

const parseLoad = (load: string): number =>
	load === '-' ? 0 : parseInt(load) || 0

const parseQuality = (quality: string): ItemQuality | undefined =>
	(parseInt(quality) as ItemQuality) || undefined

/** Splits a comma-separated properties string into the array Item stores. */
export const splitProperties = (properties: unknown): string[] => {
	if (Array.isArray(properties)) {
		return properties.map((p) => String(p).trim()).filter(Boolean)
	}
	if (typeof properties !== 'string') return []
	return properties
		.split(',')
		.map((p) => p.trim())
		.filter((p) => p && p !== '-')
}

/** Builds the canonical item fields from an equipment.json entry. */
export const buildItemFromEquipment = (data: EquipmentData): ItemContent => {
	const load = parseLoad(data.load)
	return {
		name: data.name,
		description: data.description,
		properties: [],
		cost: parseCostValue(data.cost) || 0,
		load,
		quality: parseQuality(data.quality),
		sourceName: data.name,
	}
}

/** The armor table's AV and properties as one list, AV first. */
export const armorProperties = (data: ArmorData): string[] => [
	`AV +${data.av}`,
	...splitProperties(data.properties),
]

/** Builds the canonical item fields from an armor.json entry. */
export const buildItemFromArmor = (data: ArmorData): ItemContent => {
	const load = parseLoad(data.load)
	return {
		name: data.name,
		description: '',
		properties: armorProperties(data),
		cost: parseCostValue(data.cost) || 0,
		load,
		quality: parseQuality(data.quality),
		sourceName: data.name,
	}
}

export const buildItemFromSource = (source: ItemSource): ItemContent =>
	source.kind === 'armor'
		? buildItemFromArmor(source.data)
		: buildItemFromEquipment(source.data)

/** Builds the canonical weapon fields from a weapons.json entry. */
export const buildWeaponFromData = (data: WeaponData): WeaponContent => ({
	name: data.name,
	damage: {
		base: getBaseDamageType(data.type),
		weapon: parseInt(data.damage) || 0,
		other: 0,
		otherWeak: 0,
		otherStrong: 0,
		otherCritical: 0,
		type: 'physical' as DamageType,
	},
	properties: data.properties,
	description: `${data.type} weapon (Quality ${data.quality})`,
	cost: parseCostValue(data.cost) || 0,
	load: parseLoad(data.load),
	quality: parseQuality(data.quality),
	sourceName: data.name,
})

const equipment = equipmentData as EquipmentData[]
const armor = armorData as ArmorData[]
const weapons = weaponsData as WeaponData[]

const findByName = <T extends { name: string }>(
	list: T[],
	name: string,
): T | undefined => {
	const key = normalizeContentName(name)
	if (!key) return undefined
	return list.find((entry) => normalizeContentName(entry.name) === key)
}

type Named = { name: string; sourceName?: string }

/**
 * Locates an item's entry in the equipment or armor table.
 *
 * Prefers the `sourceName` recorded at import (exact), then falls back to the
 * normalised display name, then to the name without a trailing " Armor" (the
 * archetype lists wrote "Leather Armor" for the table's "Leather"). Magic items
 * and anything not in the tables return null.
 */
export const findItemSource = (item: Named): ItemSource | null => {
	if (item.sourceName) {
		const e = equipment.find((entry) => entry.name === item.sourceName)
		if (e) return { kind: 'equipment', data: e }
		const a = armor.find((entry) => entry.name === item.sourceName)
		if (a) return { kind: 'armor', data: a }
	}
	if (isMagicItemName(item.name)) return null

	const e = findByName(equipment, item.name)
	if (e) return { kind: 'equipment', data: e }
	const a =
		findByName(armor, item.name) ??
		findByName(armor, item.name.replace(/\s+armou?r\s*$/i, ''))
	if (a) return { kind: 'armor', data: a }
	return null
}

/** Locates a weapon's entry in the weapons table. See {@link findItemSource}. */
export const findWeaponSource = (weapon: Named): WeaponData | null => {
	if (weapon.sourceName) {
		const w = weapons.find((entry) => entry.name === weapon.sourceName)
		if (w) return w
	}
	if (isMagicItemName(weapon.name)) return null
	return findByName(weapons, weapon.name) ?? null
}
