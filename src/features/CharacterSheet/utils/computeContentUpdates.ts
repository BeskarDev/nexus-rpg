import { Ability, Damage, Item, Spell, Weapon } from '../../../types/Character'
import {
	buildItemFromSource,
	buildWeaponFromData,
	findItemSource,
	findWeaponSource,
	splitProperties,
} from './itemFactory'
import { buildSpellFromData, findSpellSource, MagicType } from './spellFactory'
import { buildTalentFields, findTalentSource } from './talentFactory'

export type FieldChange = {
	field: string
	before: string
	after: string
}

/*
	What an update is CALLED, beside its name.

	Both of these carried a single `sublabel: string` — `[type, 'Rank 3'].join(' · ')`
	— because the dialog rendered it as one caption. The dialog is a ledger with
	named columns now, so two facts joined by a separator would have to be split
	apart again by the surface that displays them: a parse of a string this file
	had just built. They travel as the two facts they are.
*/
export type SpellUpdate = {
	id: string
	index: number
	name: string
	/** The spell's discipline or tradition, whichever it has. */
	type: string
	rank: number
	changes: FieldChange[]
	next: Omit<Spell, 'id'>
}

export type TalentUpdate = {
	id: string
	index: number
	name: string
	/** The skill the rulebook files this talent under. */
	skill: string
	/** The rank the character has taken it to, which the refresh preserves. */
	rank?: number
	changes: FieldChange[]
	next: Pick<Ability, 'title' | 'description' | 'skill'>
}

/** Human-readable one-line summary of a Damage object for diff display. */
export const formatDamage = (d?: Damage): string => {
	if (!d) return '—'
	const parts: string[] = []
	if (d.base) parts.push(d.base)
	if (d.weapon) parts.push(`weapon x${d.weapon}`)
	if (d.other) parts.push(`flat ${d.other}`)
	if (d.otherWeak || d.otherStrong || d.otherCritical) {
		parts.push(`W${d.otherWeak}/S${d.otherStrong}/C${d.otherCritical}`)
	}
	const value = parts.length ? parts.join(', ') : 'none'
	return `${value} (${d.type}${d.staticDamage ? ', static' : ''})`
}

const damageEquals = (a: Damage | undefined, b: Damage): boolean =>
	!!a &&
	a.base === b.base &&
	a.weapon === b.weapon &&
	a.other === b.other &&
	a.otherWeak === b.otherWeak &&
	a.otherStrong === b.otherStrong &&
	a.otherCritical === b.otherCritical &&
	a.type === b.type &&
	!!a.staticDamage === !!b.staticDamage

const pushChange = (
	changes: FieldChange[],
	field: string,
	before: unknown,
	after: unknown,
) => {
	const b = String(before ?? '')
	const a = String(after ?? '')
	if (b !== a) changes.push({ field, before: b, after: a })
}

/**
 * Compares every character spell against the latest JSON source (matched by name)
 * and returns one entry per spell whose fields have drifted. Spells not found in
 * the source (e.g. homebrew/manually added) are skipped.
 */
export const computeSpellUpdates = (
	spells: Spell[],
	preferredMagicType: MagicType | null,
): SpellUpdate[] => {
	const updates: SpellUpdate[] = []

	spells.forEach((spell, index) => {
		const source = findSpellSource(spell.name, preferredMagicType)
		if (!source) return

		const next = buildSpellFromData(source.data, source.magicType)
		const changes: FieldChange[] = []

		pushChange(changes, 'Rank', spell.rank, next.rank)
		pushChange(changes, 'Focus cost', spell.cost, next.cost)
		pushChange(changes, 'Target', spell.target, next.target)
		pushChange(changes, 'Range', spell.range, next.range)
		pushChange(changes, 'Properties', spell.properties, next.properties)
		pushChange(
			changes,
			'Deals damage',
			spell.dealsDamage ? 'yes' : 'no',
			next.dealsDamage ? 'yes' : 'no',
		)
		if (!damageEquals(spell.damage, next.damage)) {
			changes.push({
				field: 'Damage',
				before: formatDamage(spell.damage),
				after: formatDamage(next.damage),
			})
		}
		pushChange(changes, 'Effect', spell.effect, next.effect)

		if (changes.length) {
			updates.push({
				id: spell.id,
				index,
				name: spell.name,
				type: source.data.discipline || source.data.tradition || '',
				rank: next.rank,
				changes,
				next,
			})
		}
	})

	return updates
}

/**
 * Compares every talent ability against the latest JSON source (matched by name).
 * Preserves the character's chosen rank; only rulebook fields are diffed.
 */
export const computeTalentUpdates = (abilities: Ability[]): TalentUpdate[] => {
	const updates: TalentUpdate[] = []

	abilities.forEach((ability, index) => {
		if (ability.tag !== 'Talent') return
		const source = findTalentSource(ability.title)
		if (!source) return

		const next = buildTalentFields(source)
		const changes: FieldChange[] = []
		pushChange(changes, 'Description', ability.description, next.description)
		pushChange(changes, 'Skill', ability.skill, next.skill)

		if (changes.length) {
			updates.push({
				id: ability.id,
				index,
				name: ability.title,
				skill: next.skill ?? '',
				rank: ability.rank,
				changes,
				next,
			})
		}
	})

	return updates
}

export type ItemUpdate = {
	id: string
	index: number
	name: string
	/** Which table the item came from. */
	kind: 'equipment' | 'armor'
	changes: FieldChange[]
	next: Pick<
		Item,
		'description' | 'properties' | 'cost' | 'load' | 'sourceName'
	>
}

export type WeaponUpdate = {
	id: string
	index: number
	name: string
	changes: FieldChange[]
	next: Pick<Weapon, 'properties' | 'damage' | 'cost' | 'load' | 'sourceName'>
}

/**
 * Prose as it compares. The tables write line breaks as `<br/>`, a sheet may
 * hold `\n` from an older import or an edit, and the apostrophes have been both
 * curly and straight over the book's life. None of that is a content change.
 */
const normalizeProse = (text: unknown): string =>
	String(text ?? '')
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/[\u2018\u2019\u02BC]/g, "'")
		.replace(/[\u201C\u201D]/g, '"')
		.replace(/[ \t\u00A0]+/g, ' ')
		.split('\n')
		.map((line) => line.trim())
		.join('\n')
		.replace(/\n{2,}/g, '\n')
		.trim()

const pushProseChange = (
	changes: FieldChange[],
	field: string,
	before: unknown,
	after: unknown,
) => {
	if (normalizeProse(before) !== normalizeProse(after)) {
		changes.push({
			field,
			before: String(before ?? ''),
			after: String(after ?? ''),
		})
	}
}

const joinProperties = (properties: unknown): string =>
	splitProperties(properties).join(', ')

/**
 * Compares every item against the equipment and armor tables (matched by the
 * recorded `sourceName`, then by normalised name) and returns one entry per item
 * whose rulebook fields drifted. Magic items and homebrew are skipped.
 *
 * Only the rulebook's fields go into `next`. The player's name (with any tag they
 * added), amount, location, container, slot, uses, durability, quality and notes
 * about mount or storage are never touched.
 */
export const computeItemUpdates = (items: Item[]): ItemUpdate[] => {
	const updates: ItemUpdate[] = []

	items.forEach((item, index) => {
		const source = findItemSource(item)
		if (!source) return

		const canonical = buildItemFromSource(source)
		const changes: FieldChange[] = []

		// Armor has no description in the table, so a player's own note on it is
		// theirs and not a drift.
		const takesDescription = !!canonical.description
		if (takesDescription) {
			pushProseChange(
				changes,
				'Description',
				item.description,
				canonical.description,
			)
		}
		pushChange(
			changes,
			'Properties',
			joinProperties(item.properties),
			joinProperties(canonical.properties),
		)
		pushChange(changes, 'Load', item.load ?? 0, canonical.load)
		pushChange(changes, 'Cost', item.cost ?? 0, canonical.cost)

		if (changes.length) {
			updates.push({
				id: item.id,
				index,
				name: item.name,
				kind: source.kind,
				changes,
				next: {
					...(takesDescription ? { description: canonical.description } : {}),
					properties: canonical.properties,
					cost: canonical.cost,
					load: canonical.load,
					sourceName: canonical.sourceName,
				},
			})
		}
	})

	return updates
}

/**
 * Compares every weapon against the weapons table. Diffs properties, weapon
 * damage, load and cost. The description is not compared: the table has none,
 * the importer writes a synthetic one, and players keep notes there. The damage
 * base attribute, the extra damage figures and the damage type stay the player's.
 */
export const computeWeaponUpdates = (weapons: Weapon[]): WeaponUpdate[] => {
	const updates: WeaponUpdate[] = []

	weapons.forEach((weapon, index) => {
		const source = findWeaponSource(weapon)
		if (!source) return

		const canonical = buildWeaponFromData(source)
		const changes: FieldChange[] = []

		pushChange(
			changes,
			'Properties',
			joinProperties(weapon.properties),
			joinProperties(canonical.properties),
		)
		pushChange(
			changes,
			'Damage',
			weapon.damage?.weapon ?? 0,
			canonical.damage.weapon,
		)
		pushChange(changes, 'Load', weapon.load ?? 0, canonical.load)
		pushChange(changes, 'Cost', weapon.cost ?? 0, canonical.cost)

		if (changes.length) {
			updates.push({
				id: weapon.id,
				index,
				name: weapon.name,
				changes,
				next: {
					properties: canonical.properties,
					damage: {
						...canonical.damage,
						...weapon.damage,
						weapon: canonical.damage.weapon,
					},
					cost: canonical.cost,
					load: canonical.load,
					sourceName: canonical.sourceName,
				},
			})
		}
	})

	return updates
}
