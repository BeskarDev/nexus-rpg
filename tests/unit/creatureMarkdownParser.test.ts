import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { parseCreatureMarkdown } from '@site/src/features/CreatureCards/parseCreatureMarkdown'

const DOCS = path.resolve(__dirname, '../../docs/08-creatures/03-creatures')
const CREATURES_JSON = path.resolve(
	__dirname,
	'../../src/utils/data/json/creatures.json',
)

const STAT_BLOCK = [
	'### **Test Beast** (Medium Beast)',
	'',
	'**Tier:** 3 (Elite)',
	'**Armor:** Heavy',
	'',
	'| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |',
	'|----|----|----|----|----|-----|-------|-------|--------|',
	'| 2x30 | 4 (natural heavy) | d8 | d6 | d6 | d4 | 11 | 9 | 10 |',
	'',
	'**Skills:** Fighting (2), Perception (1)',
	'',
	'**Attacks:**',
	'',
	'- **Gore** (*crush, reach*). 10/16/22 damage. On a hit, the target falls prone.',
	'',
	'**Abilities:**',
	'',
	'- **Thick Hide (Passive).** Reduce incoming damage by 2.',
	'- **Rampage (Elite Trigger).** This creature attacks twice.',
	'',
	'**Quick Actions:**',
	'',
	'- **Stomp.** This creature attacks a prone target.',
	'- **Reposition.** This creature moves up to half its speed.',
].join('\n')

describe('parseCreatureMarkdown', () => {
	const [creature] = parseCreatureMarkdown(STAT_BLOCK)

	it('parses the armor category, which used to be dropped entirely', () => {
		expect(creature.armor).toBe('Heavy')
	})

	it('keeps quick actions out of abilities', () => {
		// A greedy abilities section used to run to the end of the block, so every
		// quick action was printed unlabeled among the passives.
		//
		// The divergence this test used to pin — the app parser leaving the
		// qualifier inside the ability NAME while `creatures.json` splits it into
		// its own field — is gone (M21). Two sources with two shapes is what
		// printed a companion's bite as a broken damage ladder, so both paths
		// build one contract now (`creatureEntryText`).
		expect(creature.abilities.map((a) => a.name)).toEqual([
			'Thick Hide',
			'Rampage',
		])
		expect(creature.abilities.map((a) => a.qualifier)).toEqual([
			'Passive',
			'Elite Trigger',
		])
		expect(creature.quickActions.map((a) => a.name)).toEqual([
			'Stomp',
			'Reposition',
		])
	})

	it('still parses the rest of the block', () => {
		expect(creature.name).toBe('Test Beast')
		expect(creature.type).toBe('Medium Beast')
		expect(creature.tier).toBe(3)
		expect(creature.category).toBe('Elite')
		expect(creature.hp).toBe('2x30')
		expect(creature.parry).toBe(11)
		expect(creature.attacks).toHaveLength(1)
		expect(creature.attacks[0].properties).toEqual(['crush', 'reach'])
	})

	it('leaves quickActions empty when the block has none', () => {
		const withoutQuickActions = STAT_BLOCK.split('**Quick Actions:**')[0]
		const [c] = parseCreatureMarkdown(withoutQuickActions)
		expect(c.quickActions).toEqual([])
		expect(c.abilities).toHaveLength(2)
	})
})

describe('published stat blocks agree with creatures.json', () => {
	const json: any[] = JSON.parse(fs.readFileSync(CREATURES_JSON, 'utf-8'))

	it('has one JSON record per published stat block', () => {
		const headings = fs
			.readdirSync(DOCS)
			.filter((f) => /^tier-\d+\.mdx?$/.test(f))
			.reduce(
				(n, f) =>
					n +
					(fs.readFileSync(path.join(DOCS, f), 'utf-8').match(/^### /gm) || [])
						.length,
				0,
			)
		expect(json).toHaveLength(headings)
	})

	it('every record carries the fields the print tool reads', () => {
		expect(json.length).toBeGreaterThan(0)
		for (const c of json) {
			for (const field of ['name', 'type', 'armor', 'hp', 'av'] as const) {
				expect(typeof c[field], `${c.name}.${field}`).toBe('string')
				expect(c[field].trim(), `${c.name}.${field}`).not.toBe('')
			}
			for (const field of ['parry', 'dodge', 'resist', 'tier'] as const) {
				expect(typeof c[field], `${c.name}.${field}`).toBe('number')
			}
			for (const field of ['attacks', 'abilities', 'quickActions'] as const) {
				expect(Array.isArray(c[field]), `${c.name}.${field}`).toBe(true)
			}
			// The armor category is fully redundant with the AV parenthetical on every
			// published creature; the print card relies on that and shows only AV.
			expect(c.av.toLowerCase(), c.name).toContain(c.armor.toLowerCase())
		}
	})
})

describe('generated creature pages', () => {
	const json: any[] = JSON.parse(fs.readFileSync(CREATURES_JSON, 'utf-8'))

	it('emits one card per creature, with traits as children not props', () => {
		// Trait values are condition and damage-type keywords, so they must be
		// markdown children or the highest-value links on the page die silently
		// (README § rendering contract).
		let cards = 0
		for (const f of fs
			.readdirSync(DOCS)
			.filter((n) => /^tier-\d+\.mdx$/.test(n))) {
			const mdx = fs.readFileSync(path.join(DOCS, f), 'utf-8')
			cards += (mdx.match(/<CreatureStatBlock/g) || []).length
			expect(mdx, `${f} must not pass traits as props`).not.toMatch(
				/\n\t(?:skills|immunities|resistances|weaknesses)="/,
			)
		}
		expect(cards).toBe(json.length)
	})

	it('renders every trait list that the JSON carries', () => {
		const mdx = fs
			.readdirSync(DOCS)
			.filter((n) => /^tier-\d+\.mdx$/.test(n))
			.map((n) => fs.readFileSync(path.join(DOCS, n), 'utf-8'))
			.join('\n')
		const expected = json.reduce(
			(n, c) =>
				n +
				['skills', 'immunities', 'resistances', 'weaknesses'].filter(
					(k) => c[k].length > 0,
				).length,
			0,
		)
		expect((mdx.match(/<StatBlockTrait /g) || []).length).toBe(expected)
	})
})

describe('damage ladder extraction', () => {
	const json: any[] = JSON.parse(fs.readFileSync(CREATURES_JSON, 'utf-8'))
	const mdx = fs
		.readdirSync(DOCS)
		.filter((n) => /^tier-\d+\.mdx$/.test(n))
		.map((n) => fs.readFileSync(path.join(DOCS, n), 'utf-8'))
		.join('\n')

	it('loses no text: every ladder reconstructs to its JSON attack text', () => {
		// The ladder is a presentation split of the leading damage triple. If the
		// split ever swallowed a clause, the attack would silently lose rules text —
		// so reconstruct each one and require an exact match in the source data.
		const texts = new Set(
			json.flatMap((c) => c.attacks.map((a: any) => a.text.trim())),
		)
		const lines = mdx.split('\n').filter((l) => l.includes('<DamageLadder'))
		expect(lines.length).toBeGreaterThan(0)
		for (const line of lines) {
			// Two emitted shapes: a typed ladder carries the type as children, an
			// untyped one is self-closing. The literal word "damage" is dropped from
			// both (the W/S/C ticks already say it), so it goes back in here.
			const typed = line.match(
				/<DamageLadder values="([^"]+)">([^<]+)<\/DamageLadder>\s*(.*)$/,
			)
			const bare = line.match(/<DamageLadder values="([^"]+)" \/>\s*(.*)$/)
			const rebuilt = typed
				? `${typed[1]} ${typed[2]} damage. ${typed[3]}`.trim()
				: bare
					? `${bare[1]} damage. ${bare[2]}`.trim()
					: null
			expect(rebuilt, line).not.toBeNull()
			expect(
				texts.has(rebuilt!),
				`reconstruction not found in JSON: ${rebuilt}`,
			).toBe(true)
		}
	})

	it('leaves compound damage clauses as prose', () => {
		// "6/9/12 poison damage, or 5/7/9 if this swarm has already lost half its max
		// HP" must not be laddered — a ladder showing only the first triple would be
		// actively wrong.
		expect(mdx).toContain('6/9/12 poison damage, or 5/7/9 if this swarm')
	})
})

describe('optional creature lore', () => {
	const json: any[] = JSON.parse(fs.readFileSync(CREATURES_JSON, 'utf-8'))

	const LORE_KEYS = [
		'narrative',
		'environment',
		'ecology',
		'tactics',
		'treasure',
		'organization',
	]
	const TREASURE_SCALES = ['None', 'Incidental', 'Standard', 'Rich', 'Hoard']
	const TREASURE_KINDS = [
		'Weapon',
		'Armor',
		'Magic',
		'Material',
		'Valuables',
		'Supplies',
		'Relic',
	]
	// Mirrors ENVIRONMENT_RANKS in the generator: 1 region, 2 site, 3 feature.
	const ENVIRONMENT_RANKS: Record<string, number> = {
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

	it('follows the fixed structure, with no drifting keys', () => {
		// The block is a fixed shape on purpose: every creature answers the same
		// questions in the same order. An unknown key is how the old stat blocks
		// accumulated their inconsistencies, so the generator rejects them.
		for (const c of json) {
			if (!('lore' in c)) continue
			expect(typeof c.lore, `${c.name}.lore`).toBe('object')
			for (const key of Object.keys(c.lore)) {
				expect(LORE_KEYS, `${c.name}.lore.${key}`).toContain(key)
			}
			expect(c.lore.narrative?.trim(), `${c.name}.lore.narrative`).toBeTruthy()
			if (c.lore.treasure) {
				expect(TREASURE_SCALES, `${c.name} treasure scale`).toContain(
					c.lore.treasure.scale,
				)
				// Anything but an empty-handed creature owes a rollable table — the
				// treasure block exists to be used at the table, not to describe.
				if (c.lore.treasure.scale !== 'None') {
					expect(
						c.lore.treasure.table,
						`${c.name} treasure table`,
					).toHaveLength(6)
				}
				for (const row of c.lore.treasure.table ?? []) {
					expect(TREASURE_KINDS, `${c.name} treasure kind`).toContain(row.kind)
					expect(row.item?.trim(), `${c.name} treasure item`).toBeTruthy()
					// `item` is a NAME; the numbers belong in `stats` / `value` so they
					// can be found without reading the row.
					expect(
						row.item.length,
						`${c.name} treasure item "${row.item}" reads as prose`,
					).toBeLessThanOrEqual(60)
				}
			}
			// Environment runs broadest to narrowest, so an encounter filter can read
			// it outside-in ("a desert tomb" = rank 1 + rank 3).
			const ranks = (c.lore.environment ?? []).map(
				(term: string) => ENVIRONMENT_RANKS[term],
			)
			for (const [i, rank] of ranks.entries()) {
				expect(
					rank,
					`${c.name} unknown environment "${c.lore.environment[i]}"`,
				).toBeDefined()
				if (i > 0)
					expect(rank, `${c.name} environment order`).toBeGreaterThanOrEqual(
						ranks[i - 1],
					)
			}
			for (const template of c.lore.organization ?? []) {
				expect(
					template.name?.trim(),
					`${c.name} organization name`,
				).toBeTruthy()
				// A template is either N of this creature, or a mixed band naming
				// others — exactly one, never both and never neither.
				const hasCount = template.count !== undefined
				const hasComposition = template.composition !== undefined
				expect(
					hasCount !== hasComposition,
					`${c.name} organization "${template.name}" needs exactly one of count/composition`,
				).toBe(true)
				if (hasCount) expect(template.count.trim()).toBeTruthy()
				for (const part of template.composition ?? []) {
					expect(part.count?.trim(), `${c.name} composition count`).toBeTruthy()
					// Every referenced creature must exist, or the generated link would
					// 404; the generator fails the build on this too.
					expect(
						json.some((other: any) => other.name === part.creature),
						`${c.name} references unknown creature "${part.creature}"`,
					).toBe(true)
				}
			}
		}
	})

	it('emits a CreatureLore block for exactly the creatures that carry lore', () => {
		const withLore = json.filter((c) => c.lore).length
		const emitted = fs
			.readdirSync(DOCS)
			.filter((n) => /^tier-\d+\.mdx$/.test(n))
			.reduce(
				(n, f) =>
					n +
					(
						fs
							.readFileSync(path.join(DOCS, f), 'utf-8')
							.match(/<CreatureLore>/g) || []
					).length,
				0,
			)
		expect(emitted).toBe(withLore)
	})
})
