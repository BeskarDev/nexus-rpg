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
import creatureTraits from '../data/json/creature-traits.json'
import creatureTypes from '../data/json/creature-types.json'
import companionTraits from '../data/json/companion-traits.json'
import conditions from '../data/json/conditions.json'
import weapons from '../data/json/weapons.json'

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
	/**
	 * ATTACKS ONLY. The row in `weapons.json` this attack resolves to, when the
	 * creature is swinging **carried gear** rather than a natural weapon.
	 *
	 * A creature's weapon may be named anything the culture suits (principle 23 —
	 * `Dagger` counts as `Shortsword`, `Scourge` as `Whip`), so the NAME cannot
	 * identify the row and the properties cannot either: the Ghoul's natural
	 * `Claws` carry `agile, light, slash`, which is the exact signature of three
	 * catalogue weapons. Naming the row is the only way the build can check the
	 * one thing that is absolute — that carried gear uses the equipment section's
	 * real damage and real properties, adjusted only by a legitimate Quality step
	 * (D-133).
	 *
	 * Omit for natural weapons. There is no catalogue row for a bite.
	 */
	weapon?: string
	/**
	 * ATTACKS ONLY, and only as a deliberate exception. The Quality of the carried
	 * weapon, when it is NOT the one the creature's tier and category imply
	 * (D-091) — a chief who took a knight's sword, a conscript handed a worn one.
	 *
	 * Leave unset in the normal case: the tier and category already determine it,
	 * and letting them do so is what keeps a line soldier from hitting as hard as
	 * their own officer.
	 */
	quality?: number
	/**
	 * ATTACKS ONLY. Extra applications of weapon damage on a CRITICAL, from an
	 * always-on ability — currently the orc folk trait `Orcish Fury`, which adds
	 * weapon damage an additional time whenever a critical lands with a melee
	 * weapon.
	 *
	 * **An unconditional bonus belongs in the printed triple** (D-135). `slash` and
	 * the like stay out because they depend on the target; a bonus that applies
	 * every time a critical happens is arithmetic the GM should not have to redo
	 * mid-swing. So the critical figure is `base + (3 + critWeaponDamage) x wd`,
	 * and the weak-to-strong step still yields the weapon's real damage, which is
	 * what the catalogue check reads.
	 */
	critWeaponDamage?: number
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
	/**
	 * Shared traits, BY NAME ONLY — resolved from `creature-traits.json` at
	 * generation time and rendered as ordinary Passive abilities.
	 *
	 * Traits are reusable across dozens of creatures (`Keen Scent`, `Amphibious`,
	 * `Undead Nature`), so their wording lives in exactly one place and a fix
	 * reaches every creature carrying them. The published card shows no
	 * distinction: a reader sees one abilities list with every effect spelled out.
	 */
	traits?: string[]
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
 *   physiology    both       — measurements as tags, breeding as one short line
 *   tactics       prose      — what they actually do in a fight
 *   treasure      shorthand  — a scale keyword, plus optional prose for specifics
 *   organization  shorthand  — named encounter templates with counts
 */
interface CreatureLoreRecord {
	narrative: string
	environment?: string[]
	ecology?: string
	physiology?: {
		size?: string
		weight?: string
		lifespan?: string
		reproduction?: string
		note?: string
	}
	tactics?: string
	treasure?: {
		scale: string
		table?: {
			kind: string
			item: string
			description?: string
			value?: string
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
/**
 * The four fields of a treasure row.
 *
 * `stats` and `note` used to be separate — a rules reference and a qualifier —
 * and the split produced rows that said the same thing twice, or spent the note
 * on "sells for 7" when the rules already halve every non-trade-good sale. One
 * `description` field instead, and it earns its place only by saying what the
 * thing is FOR.
 */
const TREASURE_ROW_KEYS = new Set(['kind', 'item', 'description', 'value'])

const TREASURE_KINDS = new Set([
	'Weapon',
	'Armor',
	'Magic',
	// Trophy, Tool and Material are the three published harvesting categories
	// (`06-harvesting-creature-parts.md`), so a beast's body rows use the words the
	// harvesting rules already use rather than a parallel vocabulary.
	'Trophy',
	'Tool',
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
	'physiology',
	'tactics',
	'treasure',
	'organization',
])

/**
 * The physical facts of a creature: how big, how heavy, how long they live, how
 * they breed.
 *
 * Three of the four are MEASUREMENTS and badge as tags, so a reader can scan them
 * without reading a sentence, and so a later tool can compare a jackal to a lion
 * without parsing prose. `reproduction` is the one part that genuinely varies —
 * a clutch, a litter, a budded spawn, or a thing that was never born at all — so
 * it stays one short line of prose. `note` is the fifth field, exclusive with the
 * other four: a folk-flexible humanoid has no figures of its own to give, so it
 * carries a single pointer sentence to `01-folk.md` instead of measurement tags.
 */
const PHYSIOLOGY_KEYS = new Set([
	'size',
	'weight',
	'lifespan',
	'reproduction',
	'note',
])
/** The measured ones, which must actually carry a number and its unit. */
const PHYSIOLOGY_MEASURES = ['size', 'weight', 'lifespan'] as const

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
/**
 * The shared trait library, keyed by name. Extracted from the companion traits
 * so creatures and companions cannot drift apart on what `Keen Scent` means.
 */
const TRAITS = new Map<string, string>(
	(creatureTraits as { name: string; text: string }[]).map((t) => [
		t.name,
		t.text,
	]),
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
		const minds = subtypes.filter(
			(s) => s === 'Mindless' || s === 'Intelligent',
		)
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
	// Defences an ADDITIVE grants are not design choices, so they do not owe a
	// seam. Every swarm carries the same three lines because `Swarm` says so
	// (02-creature-rules.md), and charging each one an invented weakness would
	// tax the creatures that chose nothing — and produce the "false mechanic"
	// principle 15 forbids (a swarm of beetles is not doubly hurt by fire just
	// because the schema wanted a counterweight).
	const granted = new Set([
		'grappled',
		'conditions from single-target effects',
		'damage from single-target effects',
	])
	const resistances = (e.resistances as string[]).filter((r) => !granted.has(r))
	const immunities = (e.immunities as string[]).filter((i) => !granted.has(i))
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
	validateCarriedWeapons(e, context)
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
	if (e.traits !== undefined) {
		if (!Array.isArray(e.traits))
			fail(context, 'field "traits" must be an array of trait NAMES')
		const seen = new Set<string>()
		for (const t of e.traits as unknown[]) {
			if (typeof t !== 'string' || t.trim() === '')
				fail(context, 'traits entries must be non-empty strings')
			// Names only. The wording lives in creature-traits.json so one fix
			// reaches every creature carrying the trait, and a near-miss like
			// "Blindsense" for "Blindsight (close)" fails here instead of shipping
			// a trait nobody defined.
			if (!TRAITS.has(t))
				fail(
					context,
					`unknown trait "${t}" — add it to creature-traits.json or use the ` +
						'published name (parameterised traits carry theirs, e.g. "Blindsight (close)")',
				)
			if (seen.has(t)) fail(context, `traits repeats "${t}"`)
			seen.add(t)
		}
	}
	if (e.lore !== undefined) validateLore(e.lore, context)
	validateDesign(e, context)
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

/* ------------------------------------------------------------------ *
 * Design guards (D-107, D-082, D-101, R1)
 *
 * Everything above this point checks that a record can be RENDERED. What
 * follows checks that it obeys design rules the skill states, because every
 * rule that lived only in prose has been broken at least once — the limiter
 * placement three times, the pronoun rule across 17 shared traits.
 * ------------------------------------------------------------------ */

/** The closed qualifier list. ONE value, never a limiter (D-107). */
const QUALIFIERS = new Set([
	'Passive',
	'Action',
	'Quick Action',
	'Elite Trigger',
	'Lord Trigger',
])

/** Published damage types (`05-combat/02-attacking.md`). `cold`/`thunder` are D&D. */
const DAMAGE_TYPES = new Set([
	'acid',
	'blast',
	'fire',
	'force',
	'frost',
	'lightning',
	'necrotic',
	'physical',
	'poison',
	'psychic',
	'radiant',
])

/** Words that precede "damage" without naming a type. */
const NON_TYPE_DAMAGE_WORDS = new Set([
	'no',
	'any',
	'all',
	'the',
	'this',
	'that',
	'their',
	'its',
	'same',
	'full',
	'half',
	'normal',
	'weapon',
	'extra',
	'additional',
	'more',
	'less',
	'lasting',
	'falling',
	'total',
	'spell',
	'base',
	// success levels, not damage types: "the critical damage of their melee attacks"
	'weak',
	'strong',
	'critical',
])

/**
 * Words we police in the "is X" position. Restricted to real condition names plus
 * the invented ones that have actually appeared, so ordinary prose ("is prone to",
 * "becomes visible") never trips the build.
 */
const CONDITION_LIKE = new Set([
	'cursed',
	'drained',
	'weakened',
	'exhausted',
	'incapacitated',
	'petrified',
	'charmed',
	'confused',
	'dazed',
	'deafened',
	'distracted',
	'frightened',
	'grappled',
	'hidden',
	'invisible',
	'paralyzed',
	'poisoned',
	'prone',
	'restrained',
	'silenced',
	'slowed',
	'staggered',
	'stunned',
	'unconscious',
	'blinded',
	'burning',
	'bleeding',
	'deprived',
	'marked',
	'pushed',
	'suffocating',
])

const CONDITION_NAMES = new Set(
	(conditions as { name: string }[]).map((c) =>
		c.name.replace(/\s*\(X\)$/, ''),
	),
)

/**
 * "it"/"its" naming a creature. Creatures are they/their/them (CLAUDE.md).
 *
 * Deliberately HIGH PRECISION rather than exhaustive: impersonal "it" is ordinary
 * English ("the moment it costs them anything") and an object referent is correct
 * ("treating it as difficult terrain"), so the check only fires when "it" is the
 * SUBJECT of something only a creature does, or possesses something only a
 * creature has. A rule that blocks the build has to be right every time.
 */
const CREATURE_VERB =
	/\bit\s+(?:can|cannot|can’t|can't|gains?|takes?|makes?|uses?|suffers?|moves?|attacks?|deals?|regains?|releases?|ignores?|perceives?|chooses?|spends?|rolls?|becomes?|loses?|knows?|flies|climbs?|swallows?|withdraws?)\b/i

const CREATURE_POSSESSIVE =
	/\bit(?:'|’)?s\s+(?:own|next|shell|target|surroundings|Tier|turn|Movement|attack|allies|prey|web|body|jaws|HP|AV)\b/i

function checkPronouns(text: string, context: string): void {
	for (const re of [CREATURE_VERB, CREATURE_POSSESSIVE]) {
		const m = text.match(re)
		if (!m) continue
		const at = text.indexOf(m[0])
		fail(
			context,
			`"${m[0].trim()}" names a creature — creatures are they/their/them. ` +
				`Context: "...${text.slice(Math.max(0, at - 30), at + m[0].length + 20).trim()}..."`,
		)
	}
}

/**
 * The weapon catalogue, keyed by row name. `weapons.json` is the same data the
 * equipment page renders, so a creature and a player read one set of numbers.
 */
const WEAPON_ROWS = new Map(
	(
		weapons as {
			name: string
			damage: string
			properties: string
		}[]
	).map((w) => [w.name, w]),
)

/**
 * A shield's `AV +N`, `parry +N` and `rigid N` are spent in the creature's AV and
 * Parry figures, so they are deliberately NOT repeated in the attack's property
 * list (principle 23). Every other property must appear verbatim.
 */
const BANKED_PROPERTY = /^(?:AV \+\d+|parry \+\d+|rigid \d+)$/i

/**
 * D-091: carried gear Quality by tier AND category, read off Random Treasure by
 * Level with level = tier (Basic reads Simple Loot, Elite Minor Treasure, Lord
 * Major Treasure). The full table and its reasoning live in
 * `.claude/skills/creature-design/references/stat-tables.md`.
 */
const GEAR_QUALITY: Record<string, number[]> = {
	//              tiers 0-2, 3-4, 5-6, 7-8, 9-10
	Basic: [2, 2, 3, 4, 5],
	Elite: [2, 3, 4, 5, 6],
	Lord: [3, 4, 5, 6, 7],
}

/** A Quality step above the item's base is +1 weapon damage per step (D-091). */
const QUALITY_STEP: Record<number, number> = {
	2: 0,
	3: 1,
	4: 1,
	5: 2,
	6: 3,
	7: 4,
	8: 5,
}

function expectedQuality(tier: number, category: string): number | undefined {
	// The first band is THREE tiers wide (0-2) and the rest are two, so a plain
	// halving is off by one from tier 2 upward. Getting this wrong reads a tier-2
	// Elite as Q3 and demands +1 weapon damage the roster does not have.
	const t = Math.max(0, tier)
	const band = t <= 2 ? 0 : Math.min(4, Math.floor((t - 1) / 2))
	return GEAR_QUALITY[category]?.[band]
}

function splitProperties(list: string): string[] {
	return list
		.split(',')
		.map((p) => p.trim())
		.filter((p) => p !== '' && !BANKED_PROPERTY.test(p))
		.sort()
}

/**
 * Carried gear uses the equipment section's real stats (D-133, owner ruling).
 *
 * **What is absolute is the WEAPON, not the rider.** A rider on a weapon attack is
 * a legitimate design tool, and at high tier it is close to a necessity — carried
 * gear gains one Quality every two tiers while the chassis gains weapon damage
 * every tier, so an armed creature is six behind by tier 10 (principle 40). What a
 * designer may never do is adjust the weapon itself: no invented properties, no
 * damage figure that is not the catalogue's, and the only legitimate change is a
 * Quality step.
 *
 * The check exists because the reverse was done three times — a `Censer` given
 * `(crush, reach)` and a damage figure of its own, and a Shortsword docked a point
 * of weapon damage to pay for a bleed. Both named the right row in prose and got
 * the numbers wrong anyway, which is why this is data rather than a note.
 */
function validateCarriedWeapons(
	e: Record<string, unknown>,
	context: string,
): void {
	for (const raw of e.attacks as unknown[]) {
		const a = raw as Record<string, unknown>
		const declared = a.weapon
		const name = String(a.name)

		if (declared === undefined) {
			// An attack named after a catalogue row is carried gear by any reading, so
			// it may not skip the declaration and escape the check.
			if (WEAPON_ROWS.has(name))
				fail(
					context,
					`attack "${name}" is named after a catalogue row but declares no ` +
						'"weapon" field. Carried gear must name its row so its damage and ' +
						'properties can be checked against the equipment section (D-133)',
				)
			continue
		}
		if (typeof declared !== 'string' || declared.trim() === '')
			fail(context, `attack "${name}": "weapon" must be a non-empty string`)

		const row = WEAPON_ROWS.get(declared)
		if (!row)
			fail(
				context,
				`attack "${name}" resolves to "${declared}", which is not a row in ` +
					'weapons.json. Name a published weapon, or a published reskin\'s ' +
					'underlying row (a Flail counts as a Mace). Invented weapons change ' +
					'the moment they are looted (principle 23)',
			)

		// Properties, verbatim from the row.
		const expected = splitProperties(row.properties)
		const actual = [...((a.properties as string[] | undefined) ?? [])].sort()
		if (expected.join(' | ') !== actual.join(' | '))
			fail(
				context,
				`attack "${name}" (${declared}) has properties [${actual.join(', ')}] ` +
					`but the catalogue row is [${expected.join(', ')}]. Carried gear ` +
					'takes its property list from the equipment section verbatim; a ' +
					'property the row does not have is an invented weapon (D-133)',
			)

		// Weapon damage: a constant step, and only a Quality step above the row.
		//
		// The triple is NOT always first. An attack that changes its target defense
		// writes the whole roll as its opening sentence ("Roll Strength + Fighting
		// vs. Dodge. 6/9/12 damage."), which is the sanctioned form in
		// stat-tables.md, so anchoring to the start silently skipped those.
		const text = String(a.text)
		const m = /(\d+)\/(\d+)\/(\d+) damage/.exec(text)
		if (!m) continue // no-damage manoeuvres are prose on purpose

		// A multi-target attack takes HALF the weapon damage, rounded up, so its
		// triple is legitimately below the row. That is a published scaling rule
		// rather than an adjusted weapon, so the damage check does not apply.
		if (/\b(?:every|each|all) creature/i.test(text)) continue
		const [x, y, z] = [Number(m[1]), Number(m[2]), Number(m[3])]
		// Weapon damage is read off the WEAK-to-STRONG step, which no crit bonus can
		// touch. The critical figure then carries any always-on extra applications.
		const wd = y - x
		const extraCrit = a.critWeaponDamage
		if (extraCrit !== undefined) {
			if (
				typeof extraCrit !== 'number' ||
				!Number.isInteger(extraCrit) ||
				extraCrit < 0 ||
				extraCrit > 2
			)
				fail(
					context,
					`attack "${name}": "critWeaponDamage" must be an integer 0-2 — ` +
						`got ${String(extraCrit)}`,
				)
		}
		const critSteps = 1 + ((extraCrit as number | undefined) ?? 0)
		if (z - y !== wd * critSteps)
			fail(
				context,
				`attack "${name}" reads ${x}/${y}/${z}. With ${wd} weapon damage and ` +
					`critWeaponDamage ${(extraCrit as number | undefined) ?? 0}, the ` +
					`critical should be ${y + wd * critSteps}. The weak-to-strong step is ` +
					'always one weapon damage; only an always-on ability may raise the ' +
					'critical, and it must be declared (D-135)',
			)
		// The only legitimate departure from the catalogue's damage is a Quality
		// step, and the creature's tier and category already say which Quality it
		// carries. So the figure is not a range to sit inside, it is a number.
		const override = a.quality
		let quality: number | undefined
		if (override !== undefined) {
			if (
				typeof override !== 'number' ||
				!Number.isInteger(override) ||
				!(override in QUALITY_STEP)
			)
				fail(
					context,
					`attack "${name}": "quality" must be an integer 2-8 when set — ` +
						`got ${String(override)}`,
				)
			quality = override as number
		} else {
			quality = expectedQuality(e.tier as number, e.category as string)
		}
		if (quality === undefined) continue
		const expectedWd = Number(row.damage) + QUALITY_STEP[quality]
		const actualWd = wd
		if (actualWd !== expectedWd)
			fail(
				context,
				`attack "${name}" (${declared}) reads ${x}/${y}/${z}, which is ` +
					`${actualWd} weapon damage. A tier-${e.tier} ${e.category} carries ` +
					`Quality ${quality} gear (D-091), so a ${declared} is ` +
					`${row.damage} + ${QUALITY_STEP[quality]} = ${expectedWd}: the triple ` +
					`should read ${x}/${x + expectedWd}/${x + 2 * expectedWd}. Carried ` +
					'gear takes the equipment section\'s damage, adjusted only by a ' +
					'legitimate Quality step. If this creature deliberately carries ' +
					'better or worse gear, set "quality" on the attack and say why in ' +
					'the notes (D-133)',
			)
	}
}

/** Rules a record must obey beyond being renderable. */
function validateDesign(e: Record<string, unknown>, context: string): void {
	for (const [i, raw] of (e.abilities as unknown[]).entries()) {
		const a = raw as Record<string, unknown>
		const q = a.qualifier
		if (typeof q !== 'string' || !QUALIFIERS.has(q))
			fail(
				context,
				`abilities[${i}] (${a.name}) qualifier must be exactly one of ` +
					`${[...QUALIFIERS].join(', ')} — got "${String(q)}". A limiter is ` +
					'the LAST SENTENCE of the text, never the qualifier (D-107)',
			)
	}
	for (const field of ENTRY_FIELDS) {
		for (const raw of e[field] as unknown[]) {
			const item = raw as Record<string, unknown>
			const text = String(item.text)
			checkPronouns(text, `${context} ${field} "${item.name}"`)
			for (const m of text.matchAll(/\b(\w+) damage\b/g)) {
				const word = m[1].toLowerCase()
				// Quantifiers and references, not types: "no damage", "half damage",
				// "their weapon damage", "the same damage".
				if (/^\d+$/.test(word) || NON_TYPE_DAMAGE_WORDS.has(word)) continue
				if (!DAMAGE_TYPES.has(word))
					fail(
						context,
						`${field} "${item.name}" uses damage type "${word}", which is not ` +
							`published. Use one of: ${[...DAMAGE_TYPES].join(', ')}`,
					)
			}
			// Invented conditions are a recurring failure ("cursed", "drained"), and
			// they arrive in one of the canonical phrasings.
			for (const m of text.matchAll(
				/\b(?:is|are|becomes?|remains?)\s+(?:briefly\s+)?([a-z]+)\b/g,
			)) {
				const word = m[1]
				if (!CONDITION_LIKE.has(word)) continue
				if (!CONDITION_NAMES.has(word))
					fail(
						context,
						`${field} "${item.name}" applies "${word}", which is not a ` +
							'published condition. Use one from conditions.json or spell ' +
							'the effect out in full',
					)
			}
		}
	}
	const lore = e.lore as Record<string, unknown> | undefined
	if (lore && typeof lore.tactics === 'string') {
		if (lore.tactics.includes('`'))
			fail(
				context,
				'lore.tactics must not code-style ability names — use bold (D-082)',
			)
		checkPronouns(lore.tactics, `${context} lore.tactics`)
	}
}

/**
 * The creature trait library and the companion trait library must agree, because
 * they exist so the two sides cannot drift on what a trait means — and they had
 * drifted anyway (D-105), since only one file was ever edited.
 */
function checkTraitLibrarySync(): void {
	const creature = new Map(
		(creatureTraits as { name: string; text: string }[]).map((t) => [
			t.name,
			t.text.trim(),
		]),
	)
	for (const companion of companionTraits as Record<string, unknown>[]) {
		for (const [key, value] of Object.entries(companion)) {
			if (!key.startsWith('ability') || typeof value !== 'string') continue
			const m = value.match(/^<strong>\s*([^<.]+?)\s*\.?\s*<\/strong>\s*(.+)$/)
			if (!m) continue
			const expected = creature.get(m[1].trim())
			if (expected === undefined) continue
			const got = m[2].trim()
			if (got !== expected)
				fail(
					`companion "${companion.name}" trait "${m[1].trim()}"`,
					'text differs from creature-traits.json. The two libraries must ' +
						`agree (D-105).\n  companion: ${got}\n  creature:  ${expected}`,
				)
		}
	}
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
	// House rule (CLAUDE.md): no em dashes, en dashes or semicolons anywhere in
	// game content. Lore is the field most prone to them, since it is the only
	// free prose in the data. Split the sentence or use "such as" instead. An
	// unsellable treasure row omits `value` rather than writing a dash for it.
	const walk = (node: unknown, path: string): void => {
		if (typeof node === 'string') {
			const hit = node.match(/[—–;]/)
			if (hit)
				fail(
					context,
					`${path} contains "${hit[0]}" — no em dashes, en dashes or semicolons ` +
						'in game content. Split the sentence, use "such as", or omit the field',
				)
		} else if (Array.isArray(node)) {
			node.forEach((v, i) => walk(v, `${path}[${i}]`))
		} else if (node && typeof node === 'object') {
			for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`)
		}
	}
	walk(lore, 'lore')
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
	// The world does not know the adventurers exist. `narrative` and `ecology`
	// describe a creature that was there before the campaign and carries on after
	// it, so they name the people who actually meet them — villagers, tomb robbers,
	// masons. `tactics` is the exception: it is GM instruction, and "the party" is
	// the right word there.
	for (const key of ['narrative', 'ecology'] as const) {
		const prose = lore[key] as string | undefined
		const table = prose?.match(/\b(the party|the players?|the GM)\b/i)
		if (table)
			fail(
				context,
				`lore.${key} addresses the table ("${table[0]}"); write the people who ` +
					'meet this creature in the world instead. Only lore.tactics speaks to the GM',
			)
	}
	if (lore.environment !== undefined) {
		if (!Array.isArray(lore.environment) || lore.environment.length === 0)
			fail(
				context,
				'lore.environment must be a non-empty array of terrain terms',
			)
		let previous = 0
		const seen = new Set<string>()
		for (const term of lore.environment) {
			if (seen.has(term as string))
				fail(context, `lore.environment repeats "${term}"`)
			seen.add(term as string)
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
		// Rank 1 is the habitat tag an encounter filter starts from, so a list of
		// sites and features alone is invisible to every regional query. One is the
		// floor; most creatures range across two or three.
		if (!(lore.environment as string[]).some((t) => ENVIRONMENT_RANKS[t] === 1))
			fail(
				context,
				'lore.environment must include at least one rank-1 region ' +
					'(Desert, Grassland, River, Coast, …) — sites and features alone cannot ' +
					'be found by a habitat filter',
			)
	}
	if (lore.physiology !== undefined) {
		const physiology = lore.physiology as Record<string, unknown>
		if (
			typeof physiology !== 'object' ||
			physiology === null ||
			Array.isArray(physiology)
		)
			fail(context, 'lore.physiology must be an object')
		for (const key of Object.keys(physiology)) {
			if (!PHYSIOLOGY_KEYS.has(key))
				fail(
					context,
					`lore.physiology has unknown key "${key}" (expected ${[...PHYSIOLOGY_KEYS].join(', ')})`,
				)
			if (
				typeof physiology[key] !== 'string' ||
				(physiology[key] as string).trim() === ''
			)
				fail(context, `lore.physiology.${key} must be a non-empty string`)
		}
		if (Object.keys(physiology).length === 0)
			fail(
				context,
				'lore.physiology must carry at least one field, or be omitted',
			)
		if (physiology.note !== undefined && Object.keys(physiology).length > 1)
			fail(
				context,
				'lore.physiology.note is exclusive with size/weight/lifespan/reproduction — ' +
					'a folk-flexible pointer and real figures do not belong on the same card',
			)
		// The measured fields are tags, and a tag reading "large" or "short-lived"
		// tells a reader nothing they did not already have from the size chip. If a
		// figure is genuinely unknowable, omit the key rather than hedging in it.
		for (const key of PHYSIOLOGY_MEASURES) {
			const value = physiology[key] as string | undefined
			if (value !== undefined && !/\d/.test(value))
				fail(
					context,
					`lore.physiology.${key} must state a figure with its unit ` +
						`(e.g. "1.4 m tall", "60 kg", "20 to 30 years"), got ${JSON.stringify(value)}`,
				)
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
				// `item` is the NAME a player would say out loud — "Jackal pelt", not
				// "Jackal pelt, mange-thin". Everything else belongs in `description`
				// or `value`, where it can be found without reading the row.
				if ((raw.item as string).length > 40)
					fail(
						context,
						`lore.treasure.table[${i}].item should be a short name, not prose ` +
							'(put what it does in "description" and what it is worth in "value")',
					)
				for (const key of Object.keys(raw)) {
					if (!TREASURE_ROW_KEYS.has(key))
						fail(
							context,
							`lore.treasure.table[${i}] has unknown key "${key}" ` +
								`(expected ${[...TREASURE_ROW_KEYS].join(', ')}; "stats" and "note" ` +
								'merged into "description")',
						)
				}
				for (const key of ['description', 'value'] as const)
					if (raw[key] !== undefined && typeof raw[key] !== 'string')
						fail(context, `lore.treasure.table[${i}].${key} must be a string`)
				// Values are FLAT coin figures, never dice (owner ruling). The d6 that
				// picks the row is already the randomness, catalogue items and Quality
				// tiers are priced flat, and a rolled value can contradict the Quality
				// the same row names. The harvesting dice remain a DESIGN tool: roll
				// them, or read them as a range and place the item inside it, then
				// write the number you landed on.
				if (/\d\s*d\s*\d/i.test((raw.value as string) ?? ''))
					fail(
						context,
						`lore.treasure.table[${i}].value must be a flat coin figure, not dice ` +
							`(got ${JSON.stringify(raw.value)}; roll the dice or place the item in ` +
							'their range while designing, then write that number)',
					)
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
			// The name badges beside a count, so it has to read as a LABEL for the
			// group: "Pack", "Raiding file", "Lone viper". The shapes that keep
			// creeping in are a place ("Under a landing stage"), a sentence ("Alone,
			// come to talk") and prose with an article ("A bad stretch of channel").
			const name = (template.name as string).trim()
			if (/^(a|an|the)\s/i.test(name) || name.includes(',') || name.length > 28)
				fail(
					context,
					`${where}.name "${name}" must be a short noun phrase naming the group ` +
						'(no leading article, no comma, 28 characters max) — ' +
						'"Lone viper", not "A bad stretch of channel"',
				)
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
 * Applies to an attack's weapon properties (`light`, `range (medium)`) and to an
 * ability's qualifier, which is exactly ONE closed-list value (D-107). A limiter is
 * never part of the qualifier — it is the last sentence of the ability's text — so
 * there is nothing here to split on a comma.
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
	}
	// No qualifier badge: the group heading the entry sits under already says
	// `Action` / `Quick Action` / `Trigger` / `Passive`, so a chip repeating it on
	// every line is ink for nothing (D-147). Attacks keep their PROPERTY badges,
	// which say something the heading cannot.
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

/**
 * The card groups a creature's entries by WHEN A GM USES THEM, not by which
 * array they were authored in (D-147).
 *
 * `attacks` and `abilities` stay separate in the record because they carry
 * different fields (`weapon`, `quality`, `critWeaponDamage`, `properties`, the
 * damage ladder) and different validation — D-133's catalogue check only makes
 * sense on an attack. The grouping is derived from data already present: an
 * attack is something you do on your turn, and so is an ability qualified
 * `Action`, so they belong under one heading.
 *
 * Ordered by how often a fight needs it, descending: every turn, every round,
 * once at a Wound, then the standing rules.
 *
 * Two defects this fixes, beyond reading better. `Thrown Dirt`, `Snatch` and
 * `Snatching Beak` are no-damage manoeuvres sitting in `attacks` because there
 * was nowhere else for a turn option to live — they are Actions and now say so.
 * And D-073's "two attack options" stops needing an argument about whether an
 * offensive Action counts.
 */
const SECTION_GROUPS = [
	{ label: 'Actions', qualifiers: ['Action'], withAttacks: true },
	{ label: 'Quick Actions', qualifiers: ['Quick Action'], withAttacks: false },
	{
		label: 'Triggers',
		qualifiers: ['Elite Trigger', 'Lord Trigger'],
		withAttacks: false,
	},
	{ label: 'Passives', qualifiers: ['Passive'], withAttacks: false },
] as const

/**
 * Expand a creature's trait NAMES into full ability entries.
 *
 * Shared traits are stored by name and their text lives in
 * `creature-traits.json`, so `Keen Scent` is worded once for the fifty
 * creatures that have it. They render as ordinary `Passive` abilities: the
 * split is an authoring convenience, and the card must not leak it.
 */
function resolveTraits(c: CreatureRecord): StatBlockEntry[] {
	return (c.traits ?? []).map((name) => ({
		name,
		qualifier: 'Passive',
		text: TRAITS.get(name) as string,
	}))
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

	// Traits resolve into the abilities list, spelled out in full like any other
	// ability. The record stores names so the wording has one home; the published
	// card shows no seam, because a GM reading a stat block does not care which of
	// a creature's passives are shared with others.
	const abilities = [...c.abilities, ...resolveTraits(c)]
	for (const group of SECTION_GROUPS) {
		const rendered = [
			// Attacks first inside their group: they are the default thing to do, and
			// they carry the damage ladder a GM scans for.
			...(group.withAttacks
				? c.attacks.map((a) => renderEntry(a, 'attacks'))
				: []),
			...abilities
				.filter((a) =>
					(group.qualifiers as readonly string[]).includes(a.qualifier ?? ''),
				)
				.map((a) => renderEntry(a, 'abilities')),
		]
		if (rendered.length === 0) continue
		blocks.push(
			[
				`<StatBlockSection label="${group.label}">`,
				'',
				rendered.join('\n'),
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
	// Physiology sits under Ecology, since it answers the questions the ecology
	// prose provokes — how big, how heavy, how long, how they breed. Measurements
	// badge as tags in a fixed order so two creatures can be compared by eye.
	if (lore.physiology) {
		const tags = PHYSIOLOGY_MEASURES.filter((k) => lore.physiology?.[k])
			.map((k) => `<LoreTag>${lore.physiology?.[k]}</LoreTag>`)
			.join('')
		const proseSource = lore.physiology.reproduction ?? lore.physiology.note
		const prose = proseSource ? ` ${proseSource.trim()}` : ''
		parts.push(`<LoreSection label="Physiology">${tags}${prose}</LoreSection>`)
	}
	if (lore.tactics)
		parts.push(
			`<LoreSection label="Tactics">${lore.tactics.trim()}</LoreSection>`,
		)
	if (lore.treasure) {
		const rows = (lore.treasure.table ?? [])
			.map((row) => {
				const attrs = [`kind="${row.kind}"`]
				if (row.value) attrs.push(`value=${attr(row.value)}`)
				// The name is bold and the description follows it, both markdown, so an
				// item can still link to its equipment or magic-item entry.
				const body = `**${row.item.trim()}**${row.description ? ` ${row.description.trim()}` : ''}`
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
	// inside each card (Actions / Quick Actions / Triggers / Passives) are excluded
	// by the max level.
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
	checkTraitLibrarySync()

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
