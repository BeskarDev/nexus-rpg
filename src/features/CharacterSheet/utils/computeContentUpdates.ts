import { Ability, Damage, Spell } from '../../../types/Character'
import { buildSpellFromData, findSpellSource, MagicType } from './spellFactory'
import { buildTalentFields, findTalentSource } from './talentFactory'

export type FieldChange = {
	field: string
	before: string
	after: string
}

export type SpellUpdate = {
	id: string
	index: number
	name: string
	sublabel: string
	changes: FieldChange[]
	next: Omit<Spell, 'id'>
}

export type TalentUpdate = {
	id: string
	index: number
	name: string
	sublabel: string
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
			const type = source.data.discipline || source.data.tradition || ''
			updates.push({
				id: spell.id,
				index,
				name: spell.name,
				sublabel: [type, `Rank ${next.rank}`].filter(Boolean).join(' · '),
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
				sublabel: [next.skill, ability.rank ? `Rank ${ability.rank}` : '']
					.filter(Boolean)
					.join(' · '),
				changes,
				next,
			})
		}
	})

	return updates
}
