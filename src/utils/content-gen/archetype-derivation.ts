/**
 * M22 D3 — everything a quickstart archetype page states that is NOT authored.
 *
 * The 25 pages used to restate coins, load, carry capacity, focus pools, rank-0
 * skills and combat-art counts by hand, and nothing checked them. Deriving them
 * here makes the generator an AUDITOR: the first run found three pages whose
 * coin totals were wrong, an upbringing that does not exist, nine equipment
 * names that matched no catalogue entry, and eight archetypes recommending the
 * wrong number of combat arts.
 *
 * So every function here FAILS rather than falling back. A default would put
 * the fault back on the page, silently, which is the state this replaces.
 */
import archetypesJson from '../data/json/archetypes.json'
import upbringingsJson from '../data/json/upbringings.json'
import backgroundsJson from '../data/json/backgrounds.json'
import weaponsJson from '../data/json/weapons.json'
import armorJson from '../data/json/armor.json'
import equipmentJson from '../data/json/equipment.json'
import combatArtsJson from '../data/json/combat-arts.json'
import companionTraitsJson from '../data/json/companion-traits.json'

/** Coins every adventurer gets to spend (02-character-creation.md). */
export const STARTING_COINS = 350
/** Backpack, pouches, clothes, rope, camping kit, toolkit, rations, torches. */
export const STANDARD_GEAR_LOAD = 5
/** The two weapon skills that grant Combat Arts. */
const WEAPON_SKILLS = ['Fighting', 'Archery'] as const

export interface Named {
	name: string
	gloss: string
}

export interface EquipmentRef {
	item: string
	quantity?: number
	note?: string
}

export interface ArchetypeRecord {
	name: string
	role: string
	description: string
	bestFor: string
	primarySkills: string[]
	attributes: { STR: number; AGI: number; SPI: number; MND: number }
	suggestedSkills: string
	upbringing: string
	background: string
	recommendedTalents: Named[]
	recommendedCombatArts?: Named[]
	startingEquipment: EquipmentRef[]
	toolkit?: string
	spellData?: {
		magicSkill: string
		mode: 'balance' | 'devotion'
		options: {
			name: string
			blurb?: string
			spells: { name: string; rank: number }[]
		}[]
	}
	recommendedCompanions?: Named[]
	recommendedFamiliars?: Named[]
	playstyle: string
	advancement: string
}

export class ArchetypeError extends Error {
	constructor(archetype: string, reason: string) {
		super(`[archetypes] ${archetype}: ${reason}`)
	}
}

function fail(archetype: string, reason: string): never {
	throw new ArchetypeError(archetype, reason)
}

// --- catalogues -------------------------------------------------------------

interface CatalogueItem {
	name: string
	cost: string
	load: string
	type?: string
	properties?: string
	category?: string
}

const CATALOGUE = new Map<string, CatalogueItem>()
for (const entry of [
	...(weaponsJson as CatalogueItem[]),
	...(armorJson as CatalogueItem[]),
	...(equipmentJson as CatalogueItem[]),
]) {
	CATALOGUE.set(entry.name, entry)
}

const WEAPONS = new Map(
	(weaponsJson as CatalogueItem[]).map((w) => [w.name, w]),
)
const ARMOR = new Set((armorJson as CatalogueItem[]).map((a) => a.name))

/** Names that already say "armor" without the word, so appending it reads wrong. */
const ARMOR_NOUNS = /\b(Armor|Mail|Harness|Breastplate|Plate|Helmet|Shield)\b/

/**
 * What an equipment line CALLS a catalogue entry.
 *
 * The catalogue names armor by its material alone — the leather entry is just
 * `Leather` — which is fine in a table under an "Armor" heading and reads as a
 * missing word in a kit list ("Longsword, Light Shield, Leather"). So a body
 * armor gains the noun for display only. The reference in the JSON stays the
 * catalogue name verbatim, because that is what the D4 gate checks; this is a
 * rendering rule, not a second name.
 */
export function displayName(entry: CatalogueItem): string {
	const isBodyArmor =
		ARMOR.has(entry.name) && (entry.type ?? '').endsWith('Armor')
	return isBodyArmor && !ARMOR_NOUNS.test(entry.name)
		? `${entry.name} Armor`
		: entry.name
}
const UPBRINGINGS = new Map(
	(upbringingsJson as { name: string; 'suggested skills': string }[]).map(
		(u) => [u.name, u],
	),
)
const BACKGROUNDS = new Map(
	(
		backgroundsJson as {
			name: string
			'suggested skills': string
			'starting item': string
		}[]
	).map((b) => [b.name, b]),
)
const COMBAT_ARTS = new Map(
	(combatArtsJson as { name: string; weapons: string }[]).map((a) => [
		a.name,
		a,
	]),
)
const COMPANION_TRAITS = new Set(
	(companionTraitsJson as { name: string }[]).map((t) => t.name),
)

/** `"2,250"` and `"-"` both appear in the catalogues. */
function toNumber(value: string): number {
	if (value === '-' || value.trim() === '') return 0
	const n = Number(value.replace(/[^0-9.]/g, ''))
	return Number.isFinite(n) ? n : 0
}

function splitSkills(list: string): string[] {
	return list
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean)
}

// --- derivations ------------------------------------------------------------

export interface DerivedEquipment {
	name: string
	quantity: number
	cost: number
	load: number
	/** Ammunition granted by an `ammo` weapon (02-character-creation.md). */
	free: boolean
	note?: string
}

/**
 * Ammunition. `Supply` also covers rations, torches and crafting materials,
 * none of which a weapon grants, so those come out by name.
 */
function isAmmunition(item: CatalogueItem): boolean {
	return (
		item.category === 'Supply' && !/Rations|Torch|Materials/i.test(item.name)
	)
}

export function deriveEquipment(a: ArchetypeRecord): {
	items: DerivedEquipment[]
	toolkit?: CatalogueItem
	coinsSpent: number
	coinsRemaining: number
	equipmentLoad: number
	totalLoad: number
	carryCapacity: number
} {
	const resolved = a.startingEquipment.map((ref) => {
		const entry = CATALOGUE.get(ref.item)
		if (!entry)
			fail(
				a.name,
				`equipment "${ref.item}" matches no entry in weapons.json, armor.json or equipment.json`,
			)
		return { ref, entry }
	})

	// "Selecting a weapon requiring ammunition gives you one unit of that
	// ammunition for free" — one unit, and only against an `ammo` weapon.
	const carriesAmmoWeapon = resolved.some(({ entry }) =>
		(entry.properties ?? '').includes('ammo'),
	)
	let freeTaken = false

	const items: DerivedEquipment[] = resolved.map(({ ref, entry }) => {
		const quantity = ref.quantity ?? 1
		const free =
			carriesAmmoWeapon && !freeTaken && quantity === 1 && isAmmunition(entry)
		if (free) freeTaken = true
		return {
			name: displayName(entry),
			quantity,
			cost: free ? 0 : toNumber(entry.cost) * quantity,
			load: toNumber(entry.load) * quantity,
			free,
			note: ref.note,
		}
	})

	let toolkit: CatalogueItem | undefined
	if (a.toolkit) {
		toolkit = CATALOGUE.get(a.toolkit)
		if (!toolkit) fail(a.name, `toolkit "${a.toolkit}" is not in the catalogue`)
		if (toolkit.category !== 'Toolkit')
			fail(
				a.name,
				`"${a.toolkit}" is category "${toolkit.category}", not a Toolkit`,
			)
	}

	const coinsSpent = items.reduce((sum, i) => sum + i.cost, 0)
	const coinsRemaining = STARTING_COINS - coinsSpent
	if (coinsRemaining < 0)
		fail(
			a.name,
			`kit costs ${coinsSpent} coins against a ${STARTING_COINS} coin budget`,
		)

	const equipmentLoad = items.reduce((sum, i) => sum + i.load, 0)
	const carryCapacity = Math.floor(a.attributes.STR / 2) + 8
	return {
		items,
		toolkit,
		coinsSpent,
		coinsRemaining,
		equipmentLoad,
		totalLoad: equipmentLoad + STANDARD_GEAR_LOAD,
		carryCapacity,
	}
}

export interface DerivedSkills {
	rank1: string[]
	rank0: string[]
	/** Skills chosen outside the upbringing's and background's suggestions. */
	customised: Set<string>
	upbringing: { name: string; skills: string[] }
	background: { name: string; skills: string[]; startingItem: string }
}

export function deriveSkills(a: ArchetypeRecord): DerivedSkills {
	const upbringing = UPBRINGINGS.get(a.upbringing)
	if (!upbringing)
		fail(a.name, `upbringing "${a.upbringing}" is not in upbringings.json`)
	const background = BACKGROUNDS.get(a.background)
	if (!background)
		fail(a.name, `background "${a.background}" is not in backgrounds.json`)

	const suggested = splitSkills(a.suggestedSkills)
	const rank1 = a.primarySkills
	if (rank1.length !== 3)
		fail(a.name, `has ${rank1.length} rank 1 skills, not 3`)
	for (const skill of rank1)
		if (!suggested.includes(skill))
			fail(a.name, `rank 1 skill "${skill}" is missing from suggestedSkills`)

	const rank0 = suggested.filter((s) => !rank1.includes(s))
	if (rank0.length !== 4)
		fail(
			a.name,
			`suggestedSkills leaves ${rank0.length} rank 0 skills, not 4 (7 total expected)`,
		)

	const granted = new Set([
		...splitSkills(upbringing['suggested skills']),
		...splitSkills(background['suggested skills']),
	])
	return {
		rank1,
		rank0,
		customised: new Set([...rank1, ...rank0].filter((s) => !granted.has(s))),
		upbringing: {
			name: upbringing.name,
			skills: splitSkills(upbringing['suggested skills']),
		},
		background: {
			name: background.name,
			skills: splitSkills(background['suggested skills']),
			startingItem: background['starting item'],
		},
	}
}

/**
 * "You can learn one Combat Art for rank 0 or two Combat Arts for rank 1 in
 * these skills" (02-character-creation.md), per weapon skill.
 */
export function requiredCombatArts(a: ArchetypeRecord): number {
	const suggested = splitSkills(a.suggestedSkills)
	return WEAPON_SKILLS.filter((skill) => suggested.includes(skill)).reduce(
		(sum, skill) => sum + (a.primarySkills.includes(skill) ? 2 : 1),
		0,
	)
}

/** Weapon categories the archetype can actually bring to a Combat Art. */
function usableWeaponCategories(a: ArchetypeRecord): Set<string> {
	const categories = new Set<string>()
	for (const ref of a.startingEquipment) {
		const weapon = WEAPONS.get(ref.item)
		if (!weapon) continue
		if (weapon.type) categories.add(weapon.type)
		// A thrown weapon answers a `Thrown` art whatever its own type is.
		if ((weapon.properties ?? '').includes('thrown')) categories.add('Thrown')
	}
	// "Unarmed attacks don't count as wielding a weapon in regards to Combat
	// Arts ... unless you have the Pugilist talent" (05-combat/02-attacking.md).
	if (a.recommendedTalents.some((t) => t.name === 'Pugilist'))
		categories.add('Brawling')
	return categories
}

export function deriveCombatArts(a: ArchetypeRecord): {
	required: number
	arts: (Named & { weapons: string })[]
} {
	const required = requiredCombatArts(a)
	const arts = a.recommendedCombatArts ?? []
	if (arts.length !== required)
		fail(
			a.name,
			`recommends ${arts.length} combat arts, but its weapon skills grant ${required}`,
		)

	const usable = usableWeaponCategories(a)
	return {
		required,
		arts: arts.map((art) => {
			const record = COMBAT_ARTS.get(art.name)
			if (!record)
				fail(a.name, `combat art "${art.name}" is not in combat-arts.json`)
			const needs = splitSkills(record.weapons)
			if (!needs.some((category) => usable.has(category)))
				fail(
					a.name,
					`combat art "${art.name}" needs ${needs.join('/')}, and the kit carries none`,
				)
			return { ...art, weapons: record.weapons }
		}),
	}
}

/** (governing attribute − 2) + (2 × magic skill rank 1). Arcana runs off Mind. */
export function deriveFocusPool(a: ArchetypeRecord): {
	attribute: 'MND' | 'SPI'
	value: number
	total: number
} | null {
	if (!a.spellData) return null
	const { magicSkill } = a.spellData
	if (magicSkill !== 'Arcana' && magicSkill !== 'Mysticism')
		fail(a.name, `unknown magic skill "${magicSkill}"`)
	const attribute = magicSkill === 'Arcana' ? 'MND' : 'SPI'
	const value = a.attributes[attribute]
	return { attribute, value, total: value - 2 + 2 }
}

/** How many spells the archetype knows at rank 1, given its choice mode. */
export function deriveSpellsKnown(a: ArchetypeRecord): number | null {
	if (!a.spellData) return null
	const { mode, options } = a.spellData
	if (options.length === 0) fail(a.name, 'spellData has no options')
	for (const option of options)
		if (option.spells.length === 0)
			fail(a.name, `spell option "${option.name}" has no spells`)
	if (mode === 'devotion') {
		const sizes = new Set(options.map((o) => o.spells.length))
		if (sizes.size > 1)
			fail(
				a.name,
				`devotion options differ in size (${[...sizes].join(', ')}), so "choose one" is not a fair choice`,
			)
		return options[0].spells.length
	}
	return options.reduce((sum, o) => sum + o.spells.length, 0)
}

/** The Nature talent that grants an animal companion, and the spell that summons a familiar. */
const COMPANION_TALENT = 'Animal Companion'
const FAMILIAR_SPELL = 'Conjure Familiar'

/**
 * What a companion costs out of the 350 starting coins (owner ruling, 2026-08-08).
 *
 * The talent and the spell grant the ABILITY, never the creature — the Mounts &
 * Companions chapter has always said so, and character creation now says a
 * starting character may pay here to arrive with one.
 *
 * A Nature rank-1 character may keep a Tier 1 companion (Tier <= Nature rank), so
 * the trained-companion price is the Tier 1 row: 75 coins. The familiar is not
 * bought but summoned, and `Conjure Familiar` spends 100 coins of incense and
 * occult ingredients per ritual.
 */
export const COMPANION_COST = 75
export const FAMILIAR_RITUAL_COST = 100

/**
 * What the companion costs this archetype, and what it has left after paying —
 * or `null` when the build has no companion. Fails when the kit cannot afford it.
 */
export function deriveCompanionCost(
	a: ArchetypeRecord,
	coinsRemaining: number,
): { kind: 'companion' | 'familiar'; cost: number; left: number } | null {
	const kind = a.recommendedCompanions
		? ('companion' as const)
		: a.recommendedFamiliars
			? ('familiar' as const)
			: null
	if (!kind) return null
	const cost = kind === 'companion' ? COMPANION_COST : FAMILIAR_RITUAL_COST
	if (coinsRemaining < cost)
		fail(
			a.name,
			`has ${coinsRemaining} coins left, which cannot pay the ${cost} coins its ${kind} costs at creation`,
		)
	return { kind, cost, left: coinsRemaining - cost }
}

export function validateCompanions(a: ArchetypeRecord): void {
	for (const list of [a.recommendedCompanions, a.recommendedFamiliars]) {
		for (const entry of list ?? [])
			if (!COMPANION_TRAITS.has(entry.name))
				fail(
					a.name,
					`companion trait "${entry.name}" is not in companion-traits.json`,
				)
	}

	// A companion has to be PAID for, and the two routes are the only ones a rank-1
	// character has: the `Animal Companion` talent (a Nature talent, Tier <= your
	// Nature rank) or the `Conjure Familiar` spell (Conjuration rank 1, a Tier 0
	// familiar). `Wild Companion` is not a third route — it upgrades a companion
	// the talent already granted, and requires that talent by its own text.
	//
	// Bard shipped with a companion block and neither route: its page hedged with
	// "If you choose Animal Companion…", which is advice about a future pick, and
	// the generated section read as something the character has.
	if (
		a.recommendedCompanions &&
		!a.recommendedTalents.some((t) => t.name === COMPANION_TALENT)
	)
		fail(
			a.name,
			`recommends animal companion traits without the "${COMPANION_TALENT}" talent, which is the only route to one at rank 1`,
		)

	const knowsFamiliarSpell = (a.spellData?.options ?? []).some((option) =>
		option.spells.some((spell) => spell.name === FAMILIAR_SPELL),
	)
	if (a.recommendedFamiliars && !knowsFamiliarSpell)
		fail(
			a.name,
			`recommends familiar traits without the "${FAMILIAR_SPELL}" spell in its starting spells`,
		)
}

export interface DerivedArchetype {
	record: ArchetypeRecord
	slug: string
	skills: DerivedSkills
	equipment: ReturnType<typeof deriveEquipment>
	combatArts: ReturnType<typeof deriveCombatArts>
	focus: ReturnType<typeof deriveFocusPool>
	spellsKnown: number | null
	companionCost: ReturnType<typeof deriveCompanionCost>
}

export function slugFor(name: string): string {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

export function derive(record: ArchetypeRecord): DerivedArchetype {
	for (const field of ['playstyle', 'advancement'] as const)
		if (!record[field]?.trim()) fail(record.name, `${field} is empty`)
	for (const talent of record.recommendedTalents)
		if (!talent.gloss.trim())
			fail(record.name, `talent "${talent.name}" has no gloss`)
	validateCompanions(record)

	const equipment = deriveEquipment(record)
	return {
		record,
		slug: slugFor(record.name),
		skills: deriveSkills(record),
		equipment,
		combatArts: deriveCombatArts(record),
		focus: deriveFocusPool(record),
		spellsKnown: deriveSpellsKnown(record),
		companionCost: deriveCompanionCost(record, equipment.coinsRemaining),
	}
}

/** All 25, alphabetical — the order the sidebar and the overview both use. */
export function deriveAll(): DerivedArchetype[] {
	const records = archetypesJson as unknown as ArchetypeRecord[]
	return [...records]
		.sort((a, b) => a.name.localeCompare(b.name))
		.map((record) => derive(record))
}
