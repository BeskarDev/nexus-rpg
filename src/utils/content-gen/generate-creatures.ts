/**
 * content:gen (creatures) — generate the per-tier creature pages from
 * `src/utils/data/json/creatures.json`, rendered through `CreatureStatBlock`
 * (README § game content architecture, M6). Canonical edits happen in the JSON;
 * this MDX is generated, committed, and never hand-edited (staleness check
 * guards it). Mirrors generate-spells.ts / generate-talents.ts.
 *
 * Unlike the other content types, this JSON was CREATED for the migration rather
 * than already existing: the creature roster lived only in the hand-written tier
 * markdown, and `creature-{tiers,sizes,types,archetypes}.json` are the builder's
 * parameters, not a roster. It was extracted with a round-trip check (every
 * creature re-rendered to markdown and diffed against its original block, 150/150
 * clean), so the JSON is a faithful reproduction of the published stat blocks.
 *
 * Usage:
 *   bun src/utils/content-gen/generate-creatures.ts           regenerate
 *   bun src/utils/content-gen/generate-creatures.ts --check   staleness gate
 */
import fs from 'fs'
import path from 'path'

import creatureAdditives from '../data/json/creature-additives.json'
import creatureSizes from '../data/json/creature-sizes.json'
import creatureSubtypes from '../data/json/creature-subtypes.json'
import creatureTypes from '../data/json/creature-types.json'

const REPO = path.resolve(__dirname, '../../..')
const JSON_FILE = path.join(REPO, 'src/utils/data/json/creatures.json')
const DOC_DIR = path.join(REPO, 'docs/08-creatures/03-creatures')

const BANNER =
	'{/* GENERATED from src/utils/data/json/creatures.json by `bun run content:gen` — do not edit. Edit the JSON and regenerate. */}'

/**
 * Editorial intro for each tier page, preserved verbatim from the hand-written
 * markdown it replaces (the same approach as the conditions page preamble).
 * Tier N sits at `sidebar_position: N + 1`; 0 is the overview.
 */
const TIER_INTROS: Record<number, string> = {
	0: "Tier 0 creatures represent the weakest opponents - small animals, vermin, and harmless wildlife. They're suitable challenges for completely inexperienced adventurers or can be used in large numbers for higher-level parties.",
	1: 'Tier 1 creatures provide a meaningful challenge to starting adventurers. They include common predators, basic undead, and lesser humanoid warriors.',
	2: 'Tier 2 creatures are slightly more dangerous, including stronger undead, minor magical beings, and organized humanoid fighters.',
	3: 'Tier 3 creatures represent meaningful threats. They include more powerful undead, large predators, and experienced combatants.',
	4: 'Tier 4 creatures are formidable opponents requiring tactical thinking. They include dangerous beasts, regenerating giants, and elite fighters.',
	5: 'Tier 5 creatures pose serious threats. They include powerful monstrosities, dangerous spellcasters, and formidable spirits.',
	6: 'Tier 6 creatures are fearsome opponents. They include powerful undead lords, legendary beasts, and master combatants.',
	7: 'Tier 7 creatures require coordinated party tactics to defeat. They include massive giants, legendary dragons, and powerful supernatural beings.',
	8: 'Tier 8 creatures are among the most dangerous beings. They include ancient dragons, undying sorcerer-kings, and infernal nobility.',
	9: 'Tier 9 creatures represent near-mythical threats. They include the oldest dragons, elemental lords, and transcendent undead.',
	10: 'Tier 10 creatures are the pinnacle of mortal-scale threats - legendary beings that reshape the world around them. Encounters with these creatures are campaign-defining events.',
}

const TIERS = Object.keys(TIER_INTROS)
	.map(Number)
	.sort((a, b) => a - b)
const CATEGORIES = new Set(['Basic', 'Elite', 'Lord'])

interface StatBlockEntry {
	name: string
	qualifier?: string
	properties?: string[]
	text: string
	details?: string[]
}

interface CreatureRecord {
	name: string
	size: string
	type: string
	subtype: string[]
	tier: number
	category: string
	armor: string
	hp: string
	av: string
	str: string
	agi: string
	spi: string
	mnd: string
	parry: number
	dodge: number
	resist: number
	skills: string[]
	immunities: string[]
	resistances: string[]
	weaknesses: string[]
	attacks: StatBlockEntry[]
	abilities: StatBlockEntry[]
	/** Optional non-mechanical lore, rendered collapsed under the card header. */
	lore?: CreatureLoreRecord
}

/**
 * The structured lore block.
 *
 * Deliberately a fixed shape rather than free prose: every creature answers the
 * same questions in the same order, so a reader learns the shape once and can
 * jump straight to the part they want, and a designer is told what to write
 * instead of inventing a format per entry.
 *
 * Which parts are PROSE and which are SHORTHAND is the whole point of the split:
 *   narrative     prose      — the voice of the entry, one short passage
 *   environment   shorthand  — terrain tags, badged
 *   ecology       prose      — behaviour, diet, range, how they live
 *   tactics       prose      — what they actually do in a fight
 *   treasure      shorthand  — a scale keyword, plus optional prose for specifics
 *   organization  shorthand  — named encounter templates with counts
 */
interface CreatureLoreRecord {
	narrative: string
	environment?: string[]
	ecology?: string
	tactics?: string
	treasure?: {
		scale: string
		table?: {
			kind: string
			item: string
			stats?: string
			value?: string
			note?: string
		}[]
	}
	organization?: EncounterTemplateRecord[]
}

/**
 * One encounter template. Either N of this creature (`count`), or a mixed band
 * naming other creatures (`composition`) — "tomb guard: 1 mummy lord and 6-10
 * mummies". Exactly one of the two.
 */
interface EncounterTemplateRecord {
	name: string
	count?: string
	composition?: { count: string; creature: string }[]
}

/**
 * Treasure scale vocabulary. Nexus has no published treasure-by-tier system yet,
 * so this is NEW game vocabulary introduced with the bestiary's lore layer — it
 * describes how much a creature carries relative to what is normal for its tier,
 * without committing to specific loot tables.
 */
const TREASURE_SCALES = new Set([
	'None',
	'Incidental',
	'Standard',
	'Rich',
	'Hoard',
])

/**
 * Loot categories for treasure-table rows. A closed set so a future hoard
 * generator can filter on it ("the crafting materials from this lair") and so six
 * rows can be scanned by type without reading every item.
 */
const TREASURE_KINDS = new Set([
	'Weapon',
	'Armor',
	'Magic',
	'Material',
	'Valuables',
	'Supplies',
	'Relic',
])

/**
 * Environment vocabulary, ranked from broadest to narrowest:
 *   1 region — the biome or land you travel through
 *   2 site   — the built or natural place you arrive at
 *   3 feature— the specific chamber or lair you enter
 *
 * A creature's `environment` list must be ordered by this rank, so
 * `["Desert", "Ruins", "Tomb"]` reads outside-in. That ordering is the
 * groundwork for an encounter builder: "a desert tomb" is a rank-1 plus a rank-3
 * filter, and a tool can intersect creature lists at each level only if every
 * entry agrees on what is broad and what is narrow. Adding a term is a deliberate
 * act — an unknown one fails the build rather than silently creating a synonym
 * that no filter will ever match.
 */
const ENVIRONMENT_RANKS: Record<string, number> = {
	// 1 — region
	Desert: 1,
	Grassland: 1,
	Steppe: 1,
	Forest: 1,
	Jungle: 1,
	Mountains: 1,
	Hills: 1,
	Marsh: 1,
	Coast: 1,
	Sea: 1,
	River: 1,
	Wastes: 1,
	Arctic: 1,
	Underground: 1,
	Sky: 1,
	Otherworld: 1,
	// 2 — site
	Ruins: 2,
	Settlement: 2,
	City: 2,
	Temple: 2,
	Fortress: 2,
	Caves: 2,
	Mine: 2,
	Road: 2,
	Farmland: 2,
	Battlefield: 2,
	Necropolis: 2,
	Ship: 2,
	// 3 — feature
	Tomb: 3,
	Crypt: 3,
	Vault: 3,
	Shrine: 3,
	Lair: 3,
	Nest: 3,
	Den: 3,
	Well: 3,
	Sewer: 3,
	Barrow: 3,
}

const LORE_KEYS = new Set([
	'narrative',
	'environment',
	'ecology',
	'tactics',
	'treasure',
	'organization',
])

const STRING_FIELDS = [
	'name',
	'size',
	'type',
	'category',
	'armor',
	'hp',
	'av',
	'str',
	'agi',
	'spi',
	'mnd',
] as const
const NUMBER_FIELDS = ['tier', 'parry', 'dodge', 'resist'] as const
const LIST_FIELDS = [
	'skills',
	'immunities',
	'resistances',
	'weaknesses',
] as const
const ENTRY_FIELDS = ['attacks', 'abilities'] as const

/**
 * The taxonomy vocabulary, loaded from the same files the Builder reads so the
 * two can never drift. Open to extension, closed to typos: adding a term is a
 * deliberate edit to the JSON, not a free-text field (D-043).
 */
const VALID_SIZES = new Set(
	(creatureSizes as { name: string }[]).map((s) => s.name),
)
const VALID_TYPES = new Set(creatureTypes as string[])
const VALID_SUBTYPES = new Map<string, Set<string>>(
	Object.entries(creatureSubtypes as Record<string, string[]>).map(
		([type, subs]) => [type, new Set(subs)],
	),
)
const ADDITIVES = new Set(
	(creatureAdditives as { name: string }[]).map((a) => a.name),
)
/** Types where exactly one of Mindless / Intelligent is required (D-045, D-046). */
const MIND_REQUIRED = new Set(['Undead', 'Automaton'])

function fail(context: string, reason: string): never {
	throw new Error(`[generate-creatures] ${context}: ${reason}`)
}

/**
 * Size, type and subtype against the published vocabulary.
 *
 * These used to be one string ("Medium Undead") with no subtype at all, which
 * meant nothing could be checked: a typo, a retired type, or an invented
 * subtype all passed. Splitting them made each one checkable, so each one is
 * checked.
 */
function validateTaxonomy(e: Record<string, unknown>, context: string): void {
	const size = e.size as string
	const type = e.type as string
	if (!VALID_SIZES.has(size))
		fail(context, `unknown size "${size}" (see creature-sizes.json)`)
	if (!VALID_TYPES.has(type))
		fail(context, `unknown type "${type}" (see creature-types.json)`)

	const subtypes = e.subtype as string[]
	const known = VALID_SUBTYPES.get(type) ?? new Set<string>()
	for (const sub of subtypes) {
		if (typeof sub !== 'string' || sub.trim() === '')
			fail(context, 'subtype entries must be non-empty strings')
		if (!known.has(sub) && !ADDITIVES.has(sub))
			fail(
				context,
				`"${sub}" is not a subtype of ${type} and not an additive; ` +
					'extend creature-subtypes.json or creature-additives.json deliberately',
			)
	}

	// A mindless thing and a thinking one differ in whether they roll Morale, can
	// be parleyed with, and are immune to mind-affecting conditions. The outgoing
	// roster gave every undead blanket immunity regardless, across six
	// inconsistent sets. Requiring the additive is what stops that returning.
	if (MIND_REQUIRED.has(type)) {
		const minds = subtypes.filter((s) => s === 'Mindless' || s === 'Intelligent')
		if (minds.length !== 1)
			fail(
				context,
				`${type} must carry exactly one of "Mindless" or "Intelligent" ` +
					`(found ${minds.length})`,
			)
	}
}

/**
 * Any damage resistance or immunity requires at least one weakness (D-035).
 *
 * Resistance and weakness are two halves of one statement — a thing made of
 * stone is hard to cut and easy to shatter. Taking only the first half is
 * taking the armour without the seam, and the outgoing roster did it on 30 of
 * the 49 creatures that had a resistance.
 */
function validateResistancePairing(
	e: Record<string, unknown>,
	context: string,
): void {
	const resistances = e.resistances as string[]
	const immunities = e.immunities as string[]
	const weaknesses = e.weaknesses as string[]
	const hasDefence = resistances.length > 0 || immunities.length > 0
	if (hasDefence && weaknesses.length === 0)
		fail(
			context,
			'has resistances or immunities but no weaknesses; every defence needs a seam',
		)
}

function validateCreature(entry: unknown, context: string): CreatureRecord {
	if (typeof entry !== 'object' || entry === null)
		fail(context, 'entry is not an object')
	const e = entry as Record<string, unknown>
	for (const field of STRING_FIELDS) {
		if (typeof e[field] !== 'string')
			fail(context, `field "${field}" must be a string`)
		if ((e[field] as string).trim() === '')
			fail(context, `field "${field}" is empty`)
	}
	for (const field of NUMBER_FIELDS) {
		if (typeof e[field] !== 'number')
			fail(context, `field "${field}" must be a number`)
	}
	for (const field of [...LIST_FIELDS, ...ENTRY_FIELDS, 'subtype']) {
		if (!Array.isArray(e[field]))
			fail(context, `field "${field}" must be an array`)
	}
	// An unknown tier or category would silently drop the creature from every page.
	if (!TIERS.includes(e.tier as number))
		fail(
			context,
			`tier ${e.tier} has no page (expected ${TIERS[0]}–${TIERS[TIERS.length - 1]})`,
		)
	if (!CATEGORIES.has(e.category as string))
		fail(
			context,
			`unknown category "${e.category}" (expected ${[...CATEGORIES].join(', ')})`,
		)
	validateTaxonomy(e, context)
	validateResistancePairing(e, context)
	// Every published creature states its armor twice: as its own field and inside
	// the AV parenthetical. The card shows only AV, so guard the redundancy that
	// justifies that — if they ever diverge, the card would be hiding real data.
	if (
		!(e.av as string).toLowerCase().includes((e.armor as string).toLowerCase())
	)
		fail(
			context,
			`armor "${e.armor}" does not appear in av "${e.av}"; the card shows only AV`,
		)
	if (e.lore !== undefined) validateLore(e.lore, context)
	for (const field of ENTRY_FIELDS) {
		for (const [i, raw] of (e[field] as unknown[]).entries()) {
			const item = raw as Record<string, unknown>
			if (typeof item?.name !== 'string' || item.name.trim() === '')
				fail(context, `${field}[${i}] has no name`)
			if (typeof item?.text !== 'string' || item.text.trim() === '')
				fail(context, `${field}[${i}] (${item?.name}) has no text`)
		}
	}
	return entry as CreatureRecord
}

/**
 * Shape-check the lore block. Fails loud like the rest of the generator: an
 * unknown key is rejected outright so the structure cannot quietly drift entry by
 * entry, which is exactly how the stat blocks accumulated their inconsistencies
 * before this migration.
 */
function validateLore(raw: unknown, context: string): void {
	if (typeof raw !== 'object' || raw === null || Array.isArray(raw))
		fail(context, 'field "lore" must be an object (see CreatureLoreRecord)')
	const lore = raw as Record<string, unknown>
	for (const key of Object.keys(lore)) {
		if (!LORE_KEYS.has(key))
			fail(
				context,
				`lore has unknown key "${key}" (expected ${[...LORE_KEYS].join(', ')})`,
			)
	}
	// The narrative is the one required part — a lore block with no voice is just
	// a table, and the other sections are meaningless without it.
	for (const key of ['narrative', 'ecology', 'tactics'] as const) {
		if (lore[key] === undefined) {
			if (key === 'narrative') fail(context, 'lore.narrative is required')
			continue
		}
		if (typeof lore[key] !== 'string' || (lore[key] as string).trim() === '')
			fail(context, `lore.${key} must be a non-empty string`)
	}
	if (lore.environment !== undefined) {
		if (!Array.isArray(lore.environment) || lore.environment.length === 0)
			fail(
				context,
				'lore.environment must be a non-empty array of terrain terms',
			)
		let previous = 0
		for (const term of lore.environment) {
			if (typeof term !== 'string' || term.trim() === '')
				fail(context, 'lore.environment entries must be non-empty strings')
			const rank = ENVIRONMENT_RANKS[term]
			if (rank === undefined)
				fail(
					context,
					`lore.environment term "${term}" is not in the environment vocabulary; ` +
						'add it to ENVIRONMENT_RANKS with its rank rather than inventing a synonym',
				)
			// Broadest first, so an encounter filter can read the list outside-in.
			if (rank < previous)
				fail(
					context,
					`lore.environment must run generic to specific; "${term}" (rank ${rank}) ` +
						`follows a narrower term (rank ${previous})`,
				)
			previous = rank
		}
	}
	if (lore.treasure !== undefined) {
		const treasure = lore.treasure as Record<string, unknown>
		if (typeof treasure !== 'object' || treasure === null)
			fail(context, 'lore.treasure must be an object')
		if (!TREASURE_SCALES.has(treasure.scale as string))
			fail(
				context,
				`lore.treasure.scale must be one of ${[...TREASURE_SCALES].join(', ')}, got ${JSON.stringify(treasure.scale)}`,
			)
		// Everything except an empty-handed creature owes a rollable table — the
		// point of the treasure block is to be usable at the table, not descriptive.
		if (treasure.scale !== 'None' && treasure.table === undefined)
			fail(
				context,
				`lore.treasure.scale "${treasure.scale}" requires a d6 table`,
			)
		if (treasure.table !== undefined) {
			if (!Array.isArray(treasure.table) || treasure.table.length !== 6)
				fail(
					context,
					'lore.treasure.table must have exactly 6 rows (it is rolled on a d6)',
				)
			for (const [i, raw] of (
				treasure.table as Record<string, unknown>[]
			).entries()) {
				if (!TREASURE_KINDS.has(raw?.kind as string))
					fail(
						context,
						`lore.treasure.table[${i}].kind must be one of ${[...TREASURE_KINDS].join(', ')}, got ${JSON.stringify(raw?.kind)}`,
					)
				if (typeof raw?.item !== 'string' || (raw.item as string).trim() === '')
					fail(
						context,
						`lore.treasure.table[${i}].item must be a non-empty string`,
					)
				// `item` is a NAME now, not a sentence — the numbers live in `stats`
				// and `value` so they can be found without reading the row.
				if ((raw.item as string).length > 60)
					fail(
						context,
						`lore.treasure.table[${i}].item should be a short name, not prose ` +
							'(put rules references in "stats", worth in "value", and any qualifier in "note")',
					)
				for (const key of ['stats', 'value', 'note'] as const)
					if (raw[key] !== undefined && typeof raw[key] !== 'string')
						fail(context, `lore.treasure.table[${i}].${key} must be a string`)
			}
		}
	}
	if (lore.organization !== undefined) {
		if (!Array.isArray(lore.organization) || lore.organization.length === 0)
			fail(
				context,
				'lore.organization must be a non-empty array of encounter templates',
			)
		for (const [i, raw] of lore.organization.entries()) {
			const template = raw as Record<string, unknown>
			const where = `lore.organization[${i}]`
			if (typeof template?.name !== 'string' || template.name.trim() === '')
				fail(context, `${where}.name must be a non-empty string`)
			const hasCount = template.count !== undefined
			const hasComposition = template.composition !== undefined
			// One or the other: a template with both would render its size twice, and
			// one with neither says nothing about how many are met.
			if (hasCount === hasComposition)
				fail(context, `${where} needs exactly one of "count" or "composition"`)
			if (
				hasCount &&
				(typeof template.count !== 'string' ||
					(template.count as string).trim() === '')
			)
				fail(context, `${where}.count must be a non-empty string`)
			if (hasComposition) {
				if (
					!Array.isArray(template.composition) ||
					template.composition.length === 0
				)
					fail(context, `${where}.composition must be a non-empty array`)
				for (const [j, part] of (
					template.composition as Record<string, unknown>[]
				).entries()) {
					for (const key of ['count', 'creature'] as const)
						if (
							typeof part?.[key] !== 'string' ||
							(part[key] as string).trim() === ''
						)
							fail(
								context,
								`${where}.composition[${j}].${key} must be a non-empty string`,
							)
				}
			}
		}
	}
}

/** MDX-safe double-quoted attribute value. */
function attr(value: string): string {
	return JSON.stringify(value.replace(/\s+/g, ' ').trim())
}

/**
 * Render one entry as a markdown list item.
 *
 * Attacks carry italic properties outside the bold name (`**Bite** (*crush*).`),
 * while abilities and quick actions carry their qualifier inside it
 * (`**Keen Scent (Passive).**`) — both forms are preserved from the source, since
 * they are the established reading conventions of a stat block. Indented `details`
 * lines (Beholder Spawn's numbered eye rays) become a nested list.
 */
/**
 * A damage triple opening an attack's text: `6/9/12 damage.`, `4/6/8 fire damage.`
 *
 * Deliberately strict. It requires the triple at the very start and a damage
 * phrase of at most one qualifying word, so the 278 clean attacks get the
 * {@link DamageLadder} treatment and anything more involved ("6/9/12 damage plus 8
 * necrotic damage", "…, or 5/7/9 if this swarm has already lost half its max HP")
 * keeps its prose exactly as written. A ladder that dropped half a clause would be
 * worse than no ladder.
 */
const DAMAGE_TRIPLE = /^(\d+\/\d+\/\d+)\s+((?:\w+\s+)?damage)\.\s*/

/**
 * Strip the redundant word "damage" from an immunity / resistance / weakness.
 *
 * Under a row already labelled "Weaknesses", `fire damage` says "damage" twice —
 * once in the label's own meaning and once in the entry. Dropping it leaves
 * `fire`, which is also exactly the token the chips plugin recognises, so the
 * entry gains a damage chip in the bargain. Only a standalone trailing or
 * mid-phrase `damage` word is removed, so a qualifier like "(from non-magical
 * weapons)" survives intact.
 */
function dropDamageWord(item: string): string {
	return item
		.replace(/\bdamage\b/g, '')
		.replace(/\s{2,}/g, ' ')
		.trim()
}

/**
 * Render a parenthesised property list as badges.
 *
 * Applies to both an attack's weapon properties (`light`, `range (medium)`) and an
 * ability's qualifier (`Passive`, `Action, recharge (d6)`). Each becomes its own
 * badge, split on comma — the qualifiers that carry two facts ("Passive, 3/day")
 * are genuinely two tags, while a nested parenthetical like "recharge (d6)" has no
 * comma and stays whole.
 *
 * The text is emitted as CHILDREN, not a prop, so property terms keep
 * keyword-linking (`range` and the damage types resolve to real pages).
 */
function renderBadges(items: string[]): string {
	return items
		.map((item) => item.trim())
		.filter(Boolean)
		.map((item) => `<StatBadge>${item}</StatBadge>`)
		.join('')
}

function renderEntry(
	entry: StatBlockEntry,
	kind: (typeof ENTRY_FIELDS)[number],
): string {
	let text = entry.text
	let head = `<EntryName>${entry.name}</EntryName>`
	let badges = ''
	let ladder = ''
	if (kind === 'attacks') {
		badges = renderBadges(entry.properties ?? [])
		const match = text.match(DAMAGE_TRIPLE)
		if (match) {
			// The type becomes CHILDREN so it still chips; the literal word "damage"
			// is dropped, since the ladder's own W/S/C ticks already say so.
			const kind = dropDamageWord(match[2])
			ladder = kind
				? ` <DamageLadder values="${match[1]}">${kind}</DamageLadder>`
				: ` <DamageLadder values="${match[1]}" />`
			text = text.slice(match[0].length)
		}
	} else if (entry.qualifier) {
		badges = renderBadges(entry.qualifier.split(','))
	}
	// A trailing period only when nothing follows the name in the head, so a badge
	// never sits after a full stop.
	if (!badges && !ladder) head += '.'
	const lines = [
		`- ${head}${badges ? ' ' + badges : ''}${ladder} ${text}`.trimEnd(),
	]
	for (const detail of entry.details ?? []) lines.push(`  ${detail}`)
	return lines.join('\n')
}

const TRAIT_LABELS: Record<(typeof LIST_FIELDS)[number], string> = {
	skills: 'Skills',
	immunities: 'Immunities',
	resistances: 'Resistances',
	weaknesses: 'Weaknesses',
}

const SECTION_LABELS: Record<(typeof ENTRY_FIELDS)[number], string> = {
	attacks: 'Attacks',
	abilities: 'Abilities',
}

function renderCreature(
	c: CreatureRecord,
	linkTo: (name: string) => string,
): string {
	// The card shows one line where the record keeps three fields. Subtypes are
	// appended in parentheses so the primary value stays the thing you read
	// first: "Large Divine Beast (Guardian)".
	const typeLine =
		c.subtype.length > 0
			? `${c.size} ${c.type} (${c.subtype.join(', ')})`
			: `${c.size} ${c.type}`
	const props = [
		`type=${attr(typeLine)}`,
		`tier={${c.tier}}`,
		`category=${attr(c.category)}`,
		`hp=${attr(c.hp)}`,
		`av=${attr(c.av)}`,
		`str=${attr(c.str)}`,
		`agi=${attr(c.agi)}`,
		`spi=${attr(c.spi)}`,
		`mnd=${attr(c.mnd)}`,
		`parry={${c.parry}}`,
		`dodge={${c.dodge}}`,
		`resist={${c.resist}}`,
	]
	const blocks = [
		`<CreatureStatBlock\n\t${props.join('\n\t')}\n>`,
		`### ${c.name}`,
	]

	// Lore goes immediately after the heading: the card lifts it out of the body to
	// render it under the header, and reads it as the first non-heading child.
	if (c.lore) blocks.push(renderLore(c.lore, linkTo))

	// Traits are CHILDREN, not props: their values are almost entirely condition
	// and damage-type keywords, so as props they would render unlinked (README §
	// rendering contract). Only the numeric stat band above stays props.
	for (const field of LIST_FIELDS) {
		if (c[field].length === 0) continue
		const items =
			field === 'skills'
				? // Skills stay a plain run: the chips plugin already turns each into a
					// skill chip and absorbs its rank, so wrapping them would double up.
					c[field].join(', ')
				: c[field]
						.map((item) => `<TraitItem>${dropDamageWord(item)}</TraitItem>`)
						.join('')
		blocks.push(
			`<StatBlockTrait label="${TRAIT_LABELS[field]}">${items}</StatBlockTrait>`,
		)
	}

	for (const field of ENTRY_FIELDS) {
		if (c[field].length === 0) continue
		blocks.push(
			[
				`<StatBlockSection label="${SECTION_LABELS[field]}">`,
				'',
				c[field].map((entry) => renderEntry(entry, field)).join('\n'),
				'',
				'</StatBlockSection>',
			].join('\n'),
		)
	}
	blocks.push('</CreatureStatBlock>')
	return blocks.join('\n\n')
}

/** Docusaurus heading slug, matching how the creature's own h3 anchor is built. */
function slug(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_]+/g, '-')
}

function renderLore(
	lore: CreatureLoreRecord,
	linkTo: (name: string) => string,
): string {
	const parts: string[] = [lore.narrative.trim()]
	if (lore.environment || lore.ecology) {
		const tags = (lore.environment ?? [])
			.map((t) => `<LoreTag>${t}</LoreTag>`)
			.join('')
		const prose = lore.ecology ? ` ${lore.ecology.trim()}` : ''
		parts.push(`<LoreSection label="Ecology">${tags}${prose}</LoreSection>`)
	}
	if (lore.tactics)
		parts.push(
			`<LoreSection label="Tactics">${lore.tactics.trim()}</LoreSection>`,
		)
	if (lore.treasure) {
		const rows = (lore.treasure.table ?? [])
			.map((row) => {
				const attrs = [`kind="${row.kind}"`]
				if (row.stats) attrs.push(`stats=${attr(row.stats)}`)
				if (row.value) attrs.push(`value=${attr(row.value)}`)
				// The name is bold and the qualifier follows it, both markdown, so an
				// item can still link to its equipment or magic-item entry.
				const body = `**${row.item.trim()}**${row.note ? ` ${row.note.trim()}` : ''}`
				return `<TreasureRow ${attrs.join(' ')}>${body}</TreasureRow>`
			})
			.join('')
		parts.push(
			`<LoreSection label="Treasure"><TreasureTable scale="${lore.treasure.scale}">${rows}</TreasureTable></LoreSection>`,
		)
	}
	if (lore.organization) {
		const templates = lore.organization
			.map((t) => {
				if (!t.composition)
					return `<EncounterTemplate count="${t.count}">${t.name}</EncounterTemplate>`
				// Each member links to their own entry, resolved from the roster.
				const members = t.composition.map(
					(part) =>
						`${part.count} [${part.creature}](${linkTo(part.creature)})`,
				)
				const joined =
					members.length > 1
						? `${members.slice(0, -1).join(', ')} and ${members[members.length - 1]}`
						: members[0]
				return `<EncounterGroup name="${t.name}">${joined}</EncounterGroup>`
			})
			.join('')
		parts.push(`<LoreSection label="Organization">${templates}</LoreSection>`)
	}
	return ['<CreatureLore>', '', parts.join('\n\n'), '', '</CreatureLore>'].join(
		'\n',
	)
}

function renderPage(
	tier: number,
	creatures: CreatureRecord[],
	linkTo: (name: string) => string,
): string {
	// h3 creature names are the only TOC-eligible headings; the h4 section labels
	// inside each card (Attacks / Abilities) are excluded by the max level.
	const fm = [
		'---',
		`sidebar_position: ${tier + 1}`,
		'toc_max_heading_level: 3',
		'---',
	]
	// The h1 must immediately follow the frontmatter or Docusaurus's content-title
	// extraction fails and the sidebar label falls back to the lowercase doc id.
	const blocks = [
		fm.join('\n'),
		`# Tier ${tier}`,
		BANNER,
		TIER_INTROS[tier],
		...creatures.map((c) => renderCreature(c, linkTo)),
	]
	return blocks.join('\n\n') + '\n'
}

function main() {
	const check = process.argv.slice(2).includes('--check')
	const entries: unknown[] = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'))
	const creatures = entries.map((raw, i) =>
		validateCreature(raw, `creatures.json[${i}]`),
	)

	// Cross-references in encounter templates are resolved against the roster, so a
	// template can never point at a creature that was renamed or never written.
	const byName = new Map(creatures.map((c) => [c.name, c]))
	const linkTo = (name: string): string => {
		const target = byName.get(name)
		if (!target)
			fail('lore.organization', `references unknown creature "${name}"`)
		return `/docs/creatures/creatures/tier-${target.tier}#${slug(name)}`
	}

	let stale = 0
	for (const tier of TIERS) {
		const outFile = path.join(DOC_DIR, `tier-${tier}.mdx`)
		const legacy = path.join(DOC_DIR, `tier-${tier}.md`)
		const inTier = creatures.filter((c) => c.tier === tier)
		// An empty tier used to fail the build, to catch a tier silently vanishing
		// behind a bad `tier` value. That job is now done by the tier validation in
		// validateCreature, and the roster is being rebuilt tier by tier — so a tier
		// with nothing in it yet is an expected state, not a defect.
		if (inTier.length === 0) {
			console.warn(`[generate-creatures] tier ${tier}: no creatures yet`)
		}
		const content = renderPage(tier, inTier, linkTo)

		if (check) {
			const current = fs.existsSync(outFile)
				? fs.readFileSync(outFile, 'utf-8')
				: null
			if (current !== content) {
				stale++
				console.error(`STALE: ${path.relative(REPO, outFile)}`)
			}
			continue
		}

		fs.writeFileSync(outFile, content)
		// Retire the hand-written .md once the .mdx is generated.
		if (fs.existsSync(legacy)) fs.rmSync(legacy)
		console.log(
			`wrote ${path.relative(REPO, outFile)} (${inTier.length} creatures)`,
		)
	}

	if (check) {
		if (stale > 0) {
			console.error(
				`\ncontent:gen --check found ${stale} stale creature page(s). Run \`bun run content:gen\` and commit.`,
			)
			process.exit(1)
		}
		console.log('content:gen --check: creature pages up to date.')
	}
}

main()
