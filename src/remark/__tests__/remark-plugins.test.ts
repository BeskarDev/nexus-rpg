import { describe, it, expect } from 'vitest'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import autoKeywordPlugin from '../auto-keyword-plugin'
import tableChipsPlugin from '../table-chips-plugin'

/**
 * Golden-file regression net for the remark plugins.
 *
 * Phase 1 extracted the shared tokenizer/longest-match loop behind callbacks
 * (see docs/analysis/keyword-chip-detection-plan.md). These tests lock the
 * observable output so that refactor — and the heuristic phases that follow —
 * cannot silently change conversions. When a later phase intentionally changes
 * behavior, update the specific expectation with a note.
 */

type Conversion = {
	text: string
	url?: string
	className?: string[]
}

/** Parses markdown to mdast and runs a single plugin transformer over it. */
function runPlugin(
	plugin: (opts?: any) => (tree: any, file: any) => void,
	md: string,
	path: string,
): any {
	const tree = remark().use(remarkGfm).parse(md)
	plugin()(tree, { path })
	return tree
}

/** Collects every produced link/chip node (both render as mdast `link`). */
function collectConversions(tree: any): Conversion[] {
	const out: Conversion[] = []
	visit(tree, 'link', (n: any) => {
		const text = (n.children || [])
			.map((c: any) => c.value || '')
			.join('')
		out.push({
			text,
			url: n.url,
			className: n.data?.hProperties?.className,
		})
	})
	return out
}

describe('auto-keyword-plugin', () => {
	const FILE = 'docs/99-test/sample.md'

	it('links a single keyword in prose', () => {
		const tree = runPlugin(autoKeywordPlugin, 'You must roll to succeed.', FILE)
		const links = collectConversions(tree)
		expect(links).toEqual([
			{
				text: 'roll',
				url: '/docs/basic-rules/how-to-roll#skill-tests',
				className: undefined,
			},
		])
	})

	it('prefers the longest multi-word match', () => {
		const tree = runPlugin(
			autoKeywordPlugin,
			'Check your Target Number now.',
			FILE,
		)
		const links = collectConversions(tree)
		expect(links).toHaveLength(1)
		expect(links[0].text).toBe('Target Number')
		expect(links[0].url).toBe('/docs/basic-rules/how-to-roll#skill-tests')
	})

	it('strips the _ opt-out prefix when the node also has a real match', () => {
		// Pre-existing behavior: the prefix is stripped only when the text node
		// is rebuilt (i.e. some other keyword in it converts). Here the first
		// 'roll' links and the opted-out '_roll' renders as plain 'roll'.
		const tree = runPlugin(
			autoKeywordPlugin,
			'Make a roll but _roll stays.',
			FILE,
		)
		expect(collectConversions(tree)).toHaveLength(1)
		const texts: string[] = []
		visit(tree, 'text', (n: any) => texts.push(n.value))
		expect(texts.join('')).toContain('but roll stays')
		expect(texts.join('')).not.toContain('_roll')
	})

	it('does not link inside headings', () => {
		const tree = runPlugin(autoKeywordPlugin, '# How to roll well', FILE)
		expect(collectConversions(tree)).toHaveLength(0)
	})

	it('does not link inside bold text', () => {
		const tree = runPlugin(autoKeywordPlugin, 'A **roll** here.', FILE)
		expect(collectConversions(tree)).toHaveLength(0)
	})

	it('links first keyword occurrence, punctuation preserved', () => {
		const tree = runPlugin(
			autoKeywordPlugin,
			'Make a roll, then another roll.',
			FILE,
		)
		const links = collectConversions(tree)
		// First-occurrence-per-page (Phase 4): only the first 'roll' links.
		expect(links.map((l) => l.text)).toEqual(['roll'])
		const texts: string[] = []
		visit(tree, 'text', (n: any) => texts.push(n.value))
		// The comma and the second (plain) 'roll' are retained.
		expect(texts.join('')).toContain(',')
		expect(texts.join('')).toContain('another roll')
	})

})

describe('table-chips-plugin', () => {
	const FILE = 'docs/99-test/sample.md'

	it('renders a damage-type chip with the expected classes', () => {
		const tree = runPlugin(tableChipsPlugin, 'It deals fire damage.', FILE)
		const chips = collectConversions(tree).filter((c) =>
			c.className?.includes('chip'),
		)
		expect(chips).toHaveLength(1)
		expect(chips[0].text).toBe('fire')
		expect(chips[0].className).toEqual([
			'chip',
			'chip--fire-vibrant',
			'chip--damage',
		])
	})

	it('shows attribute shorthand outside explanation files', () => {
		const tree = runPlugin(tableChipsPlugin, 'Roll Strength here.', FILE)
		const chips = collectConversions(tree).filter((c) =>
			c.className?.includes('chip--attribute'),
		)
		expect(chips).toHaveLength(1)
		expect(chips[0].text).toBe('STR')
	})

	it('keeps full attribute names inside the attributes explanation file', () => {
		const tree = runPlugin(
			tableChipsPlugin,
			'Roll Strength here.',
			'docs/03-statistics/01-attributes.md',
		)
		const chips = collectConversions(tree).filter((c) =>
			c.className?.includes('chip--attribute'),
		)
		expect(chips).toHaveLength(1)
		expect(chips[0].text).toBe('Strength')
	})

	it('does not chip a damage word used as flavor (no damage context)', () => {
		// "fire discipline" has no nearby number/damage word, so damage-context
		// gating leaves it plain — no blacklist needed.
		const tree = runPlugin(
			tableChipsPlugin,
			'The fire discipline is versatile.',
			'docs/07-magic/03-metamagic-arts.md',
		)
		const chips = collectConversions(tree).filter((c) =>
			c.className?.includes('chip'),
		)
		expect(chips).toHaveLength(0)
	})

	it('does not chip inside headings', () => {
		const tree = runPlugin(tableChipsPlugin, '## Fire and fury', FILE)
		expect(collectConversions(tree)).toHaveLength(0)
	})
})

describe('table header detection (Phase 2)', () => {
	const FILE = 'docs/99-test/sample.md'

	// A GFM table: header row then one body row.
	const table = (header: string, body: string) =>
		[`| ${header} |`, '| --- |', `| ${body} |`].join('\n')

	it('auto-keyword: skips single-word header cells', () => {
		const tree = runPlugin(autoKeywordPlugin, table('HP', 'nothing'), FILE)
		expect(
			collectConversions(tree).map((l) => l.text),
		).not.toContain('HP')
	})

	it('auto-keyword: skips MULTI-word header cells (old proxy missed these)', () => {
		const tree = runPlugin(
			autoKeywordPlugin,
			table('Weapon Damage', 'nothing'),
			FILE,
		)
		// "damage" is a keyword but sits in a multi-word header → must not link.
		expect(
			collectConversions(tree).map((l) => l.text),
		).not.toContain('damage')
	})

	it('auto-keyword: converts single-word BODY cells (old proxy over-skipped)', () => {
		const tree = runPlugin(autoKeywordPlugin, table('Notes', 'roll'), FILE)
		const links = collectConversions(tree).filter((l) => l.text === 'roll')
		expect(links).toHaveLength(1)
	})

	it('table-chips: skips multi-word header cells', () => {
		const tree = runPlugin(
			tableChipsPlugin,
			table('Fighting Style', 'calm'),
			FILE,
		)
		const chips = collectConversions(tree).filter((c) =>
			c.className?.includes('chip'),
		)
		expect(chips).toHaveLength(0)
	})

	it('table-chips: converts single-word body cells', () => {
		const tree = runPlugin(tableChipsPlugin, table('Skill', 'Fighting'), FILE)
		const chips = collectConversions(tree).filter((c) =>
			c.className?.includes('chip--skill'),
		)
		expect(chips).toHaveLength(1)
		expect(chips[0].text).toBe('Fighting')
	})

	it('real creature stat block: HP/AV/STR headers stay plain, no blacklist needed', () => {
		// Mirrors docs/08-creatures/03-creatures/tier-1.md. The stale blacklist
		// entries point at the old 03-creatures.md path (now a directory) and no
		// longer fire — header-row detection is what keeps these plain.
		const statBlock = [
			'| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |',
			'|----|----|----|----|----|-----|-------|-------|--------|',
			'| 10 | 1 (natural light) | d6 | d6 | d6 | d4-1 | 7 | 8 | 7 |',
		].join('\n')
		const path = 'docs/08-creatures/03-creatures/tier-1.md'

		const kwLinks = collectConversions(
			runPlugin(autoKeywordPlugin, statBlock, path),
		).map((l) => l.text)
		expect(kwLinks).not.toContain('HP')
		expect(kwLinks).not.toContain('AV')

		const chips = collectConversions(
			runPlugin(tableChipsPlugin, statBlock, path),
		).filter((c) => c.className?.includes('chip'))
		// STR/AGI/SPI/MND live in the header row → no attribute chips.
		expect(chips).toHaveLength(0)
	})
})

describe('zone gating for ambiguous words (Phase 4b)', () => {
	const FILE = 'docs/99-test/sample.md'

	const bodyTable = (body: string) =>
		['| Category |', '| --- |', `| ${body} |`].join('\n')

	it('does NOT link a bare ambiguous word in narrative prose', () => {
		for (const md of [
			'A shimmer of light danced over the water.',
			'They carried a heavy sack up the hill.',
			'A huge temple loomed over the valley.',
			'She stood close to the fire and reached out.',
		]) {
			const links = collectConversions(runPlugin(autoKeywordPlugin, md, FILE))
			const suspect = links.filter((l) =>
				['light', 'heavy', 'huge', 'close', 'reach'].includes(l.text),
			)
			expect(suspect).toHaveLength(0)
		}
	})

	it('DOES link an ambiguous word inside a table body cell', () => {
		const light = collectConversions(
			runPlugin(autoKeywordPlugin, bodyTable('light'), FILE),
		).filter((l) => l.text === 'light')
		expect(light).toHaveLength(1)
		const heavy = collectConversions(
			runPlugin(autoKeywordPlugin, bodyTable('Heavy'), FILE),
		).filter((l) => l.text === 'Heavy')
		expect(heavy).toHaveLength(1)
	})

	it('still links unambiguous multi-word forms in prose (not gated)', () => {
		const links = collectConversions(
			runPlugin(
				autoKeywordPlugin,
				'The effect lasts for a short duration at close range.',
				FILE,
			),
		)
		expect(links.map((l) => l.text)).toContain('short duration')
		expect(links.map((l) => l.text)).toContain('close range')
		// The bare 'short'/'close' were consumed by the longer match, so no
		// stray bare links appear.
		expect(links.map((l) => l.text)).not.toContain('short')
		expect(links.map((l) => l.text)).not.toContain('close')
	})
})

describe('first-occurrence-per-page for links (Phase 4)', () => {
	const FILE = 'docs/99-test/sample.md'

	it('links only the first occurrence of a keyword on the page', () => {
		const md = 'A roll, then a roll, and one more roll.'
		const links = collectConversions(runPlugin(autoKeywordPlugin, md, FILE))
		expect(links.filter((l) => l.text === 'roll')).toHaveLength(1)
		// The later occurrences survive as plain text.
		const texts: string[] = []
		visit(runPlugin(autoKeywordPlugin, md, FILE), 'text', (n: any) =>
			texts.push(n.value),
		)
		expect(texts.join('')).toContain('one more roll')
	})

	it('applies per term, so different keywords each still link once', () => {
		const md = 'Gain a boon, take a boon; suffer a bane, then a bane.'
		const links = collectConversions(runPlugin(autoKeywordPlugin, md, FILE))
		expect(links.filter((l) => l.text === 'boon')).toHaveLength(1)
		expect(links.filter((l) => l.text === 'bane')).toHaveLength(1)
	})

	it('does NOT limit chips to first occurrence (every damage word colors)', () => {
		const md = 'Deals 2 fire, then 3 fire, then 4 fire damage.'
		const chips = collectConversions(runPlugin(tableChipsPlugin, md, FILE)).filter(
			(c) => c.className?.includes('chip--damage'),
		)
		expect(chips.length).toBeGreaterThanOrEqual(3)
	})
})

describe('bold + heading suppression (Phase 3)', () => {
	const FILE = 'docs/99-test/sample.md'

	it('table-chips: does not chip inside bold', () => {
		const tree = runPlugin(tableChipsPlugin, 'A **fire** blast.', FILE)
		const chips = collectConversions(tree).filter((c) =>
			c.className?.includes('chip'),
		)
		expect(chips.map((c) => c.text)).not.toContain('fire')
	})

	it('auto-keyword: skips keywords nested in emphasis inside bold', () => {
		const tree = runPlugin(autoKeywordPlugin, 'A **_roll_ result.**', FILE)
		expect(collectConversions(tree).map((l) => l.text)).not.toContain('roll')
	})

	it('bold ability name stays plain but effect text still converts', () => {
		// The stat-block idiom: bold name, then plain effect text.
		const line = '- **Poison Bite** (*agile*). 6/9/12 poison damage.'
		const chips = collectConversions(
			runPlugin(tableChipsPlugin, line, FILE),
		).filter((c) => c.className?.includes('chip--damage'))
		// Exactly one: the "poison" in "poison damage", not the one in the name.
		expect(chips).toHaveLength(1)
		expect(chips[0].text).toBe('poison')
	})
})

describe('damage-context gating (Phase 3)', () => {
	const FILE = 'docs/99-test/sample.md'

	const damageChips = (md: string) =>
		collectConversions(runPlugin(tableChipsPlugin, md, FILE)).filter((c) =>
			c.className?.includes('chip--damage'),
		)

	it('chips a damage word next to a number', () => {
		expect(damageChips('The blade deals 6 fire on a hit.')).toHaveLength(1)
	})

	it('chips a damage word next to the word "damage"', () => {
		expect(damageChips('It causes fire damage to all nearby.')).toHaveLength(1)
	})

	it('chips a damage word next to "resistance"', () => {
		expect(damageChips('Grants fire resistance for a scene.')).toHaveLength(1)
	})

	it('does NOT chip a flavor damage word in prose', () => {
		expect(
			damageChips('A shimmer of fire danced across the temple walls.'),
		).toHaveLength(0)
	})

	it('does NOT chip when the number is far from the word', () => {
		expect(
			damageChips('The fire in the hearth had burned for three long hours.'),
		).toHaveLength(0)
	})

	it('still chips non-damage terms (skills) without a number', () => {
		const skills = collectConversions(
			runPlugin(tableChipsPlugin, 'Roll Athletics to climb.', FILE),
		).filter((c) => c.className?.includes('chip--skill'))
		expect(skills).toHaveLength(1)
	})
})

describe('blacklist entries retired by heuristics (Phase 3)', () => {
	it('folk bold ability names stay plain without a blacklist entry', () => {
		// docs/02-adventurers/01-folk.md — bold-skip replaces the Mind/Nature
		// blacklist entries.
		const path = 'docs/02-adventurers/01-folk.md'
		const mind = collectConversions(
			runPlugin(tableChipsPlugin, '**Stoic Mind.** +1 Resist.', path),
		).filter((c) => c.className?.includes('chip'))
		expect(mind.map((c) => c.text)).not.toContain('MND')
		const nature = collectConversions(
			runPlugin(
				tableChipsPlugin,
				'**Aquatic Nature.** You can hold your breath.',
				path,
			),
		).filter((c) => c.className?.includes('chip'))
		expect(nature.map((c) => c.text)).not.toContain('Nature')
	})

	it('how-to-roll table headers stay plain without blacklist entries', () => {
		// docs/01-basic-rules/01-how-to-roll.md — header-row detection replaces
		// the TN / SL / Success Level blacklist entries.
		const path = 'docs/01-basic-rules/01-how-to-roll.md'
		const header = [
			'| Difference to TN | Success Level (SL) | Description |',
			'| --- | --- | --- |',
			'| 0-2 | Weak | Minor success |',
		].join('\n')
		const links = collectConversions(runPlugin(autoKeywordPlugin, header, path))
		const headerLinks = links.filter((l) =>
			['TN', 'SL', 'Success Level'].includes(l.text),
		)
		expect(headerLinks).toHaveLength(0)
	})
})
