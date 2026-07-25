import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { parseCreatureMarkdown } from '@site/src/features/CreatureCards/parseCreatureMarkdown'

const DOCS = path.resolve(__dirname, '../../docs/08-creatures/03-creatures')
const CREATURES_JSON = path.resolve(__dirname, '../../src/utils/data/json/creatures.json')

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
		// Note the app parser leaves the qualifier inside the ability NAME, where
		// `creatures.json` splits it into a separate `qualifier` field. That
		// divergence is pre-existing and deliberate here: this test pins the print
		// tool's own behaviour, not the JSON schema.
		expect(creature.abilities.map((a) => a.name)).toEqual([
			'Thick Hide (Passive)',
			'Rampage (Elite Trigger)',
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
					n + (fs.readFileSync(path.join(DOCS, f), 'utf-8').match(/^### /gm) || []).length,
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
