import { describe, it, expect } from 'vitest'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import autoColumnsPlugin from '../auto-columns-plugin'

/**
 * The bracket heuristic (M14). These lock the RULES rather than the estimates:
 * the line numbers are deliberately coarse and may be retuned, but "a lone
 * table is never split", "a floated portrait blocks a spread" and "an explicit
 * <Columns> is never touched" are the invariants that keep the automatic pass
 * from producing layouts a reader has to fight.
 */

function run(md: string, opts: any = {}, path = '/docs/x.md'): any {
	const tree = remark().use(remarkGfm).parse(md)
	autoColumnsPlugin(opts)(tree, { path })
	return tree
}

const spreads = (tree: any) =>
	(tree.children ?? []).filter(
		(n: any) => n.type === 'mdxJsxFlowElement' && n.name === 'Columns',
	)

/** A block of prose long enough to count, without hand-writing paragraphs. */
const para = (n = 200) => 'word '.repeat(Math.ceil(n / 5)).trim()

const table = (rows: number) =>
	['| A | B |', '| --- | --- |', ...Array(rows).fill('| one | two |')].join('\n')

describe('auto-columns bracket heuristic (M14)', () => {
	it('splits a run of several mid-sized blocks', () => {
		const md = `## Section\n\n${para()}\n\n${para()}\n\n${para()}\n\n${para()}\n`
		const tree = run(md)
		expect(spreads(tree).length).toBe(1)
		// `##` is content now, not a breaker, so the four paragraphs sit under one
		// section: its opening is bound to the heading and the rest flows.
		expect(spreads(tree)[0].children.length).toBeGreaterThanOrEqual(2)
		expect(JSON.stringify(spreads(tree)[0]).match(/word/g)?.length).toBeTruthy()
	})

	it('leaves a lone block alone — one column would fill, the other stay empty', () => {
		// Every child is `break-inside: avoid`, so a single block cannot balance.
		const tree = run(`## Section\n\n${table(14)}\n`)
		expect(spreads(tree).length).toBe(0)
	})

	it('leaves a short run alone', () => {
		const tree = run(`## Section\n\n${para(40)}\n\n${para(40)}\n`)
		expect(spreads(tree).length).toBe(0)
	})

	it('cuts a very long run into SEVERAL spreads rather than abandoning it', () => {
		// The first version rejected a tall run, which left whole pages in one
		// column — and a run left in one column is exactly as tall as it was, so
		// the reader saved no scrolling and lost half the page. A manual breaks a
		// long section across several two-column pages instead.
		const many = Array(40).fill(para(300)).join('\n\n')
		const tree = run(`## Section\n\n${many}\n`)
		expect(spreads(tree).length).toBeGreaterThan(1)
	})

	it('keeps every COLUMN within the screen, letting the pair stay uneven', () => {
		// The bound is per column, not per spread: the browser balances into two
		// tracks, so a spread is as tall as the larger of its perfect half and its
		// tallest single box.
		const many = Array(40).fill(para(300)).join('\n\n')
		const tree = run(`## Section\n\n${many}\n`, { maxColumnLines: 60 })
		for (const s of spreads(tree)) {
			const heights = s.children.map((n: any) =>
				Math.max(1, Math.ceil((n.children?.[0]?.value?.length ?? 0) / 65)),
			)
			const total = heights.reduce((a: number, b: number) => a + b, 0)
			const column = Math.max(Math.max(...heights), total / 2)
			expect(column).toBeLessThanOrEqual(60 * 1.4)
		}
	})

	it('never leaves a heading stranded at the foot of a spread', () => {
		const body = Array(30).fill(para(300)).join('\n\n')
		const tree = run(`## Section\n\n${body}\n\n### Sub\n\n${body}\n`)
		for (const s of spreads(tree)) {
			expect(s.children[s.children.length - 1].type).not.toBe('heading')
		}
	})

	it('refuses a run one block dominates, which cannot balance', () => {
		const tree = run(`## Section\n\n${table(40)}\n\n${para(30)}\n\n${para(30)}\n`)
		expect(spreads(tree).length).toBe(0)
	})

	it('refuses a run holding a floated portrait', () => {
		// A 300px float inside a 32rem track leaves three words a line — the
		// exact fault the plate's own container query fixed at page level.
		const md = `## Section\n\n${para()}\n\n![folk-img|A dwarf](./img/d.jpeg)\n\n${para()}\n\n${para()}\n`
		expect(spreads(run(md)).length).toBe(0)
	})

	it('breaks at a banner, which is a full-width band', () => {
		const md =
			`## A\n\n${para()}\n\n${para()}\n\n${para()}\n\n` +
			`![banner-img](/img/b.png)\n\n` +
			`${para()}\n\n${para()}\n\n${para()}\n`
		const tree = run(md)
		expect(spreads(tree).length).toBe(2)
		// The banner stays a top-level sibling rather than being swept into one.
		const banner = tree.children.find(
			(n: any) => n.type === 'paragraph' && n.children?.[0]?.type === 'image',
		)
		expect(banner).toBeTruthy()
	})

	it('breaks at `##` but carries `###` inside a spread', () => {
		const md = `## A\n\n${para()}\n\n### Sub\n\n${para()}\n\n${para()}\n\n## B\n\n${para()}\n`
		const tree = run(md)
		const [first] = spreads(tree)
		expect(first).toBeTruthy()
		// The `###` may be nested inside a keep-together group, so look for it
		// anywhere in the spread rather than only as a direct child.
		const hasHeading = (n: any): boolean =>
			n?.type === 'heading' || (n?.children ?? []).some(hasHeading)
		expect(first.children.some(hasHeading)).toBe(true)
	})

	it('binds a heading to its section so a column break cannot land between', () => {
		// Chrome ignores `break-after: avoid` in multicol, so the keep-with-next
		// has to become a keep-together box the plugin emits.
		const md = `## A\n\n${para()}\n\n### Sub\n\n${para(120)}\n\n${para(120)}\n\n${para()}\n`
		const [first] = spreads(run(md))
		// Prose spreads hold two COLUMN boxes now, so the keep-group is nested.
		const findKeep = (n: any): any =>
			n?.type === 'mdxJsxFlowElement' &&
			n.attributes?.some((a: any) => a.value === 'codex-keep')
				? n
				: (n?.children ?? []).map(findKeep).find(Boolean)
		const keep = first.children.map(findKeep).find(Boolean)
		expect(keep).toBeTruthy()
		expect(keep.children[0].type).toBe('heading')
		expect(keep.children.length).toBeGreaterThan(1)
	})

	it('stands a block taller than one column on its own', () => {
		// A block taller than a column cannot sit inside one: the browser shunts
		// it to the next track and strands whatever introduced it behind.
		const tree = run(`## Section\n\n${para()}\n\n${para()}\n\n${table(60)}\n`)
		const big = tree.children.find((n: any) => n.type === 'table')
		expect(big).toBeTruthy()
		for (const s of spreads(tree)) {
			const holdsTable = (n: any): boolean =>
				n?.type === 'table' || (n?.children ?? []).some(holdsTable)
			expect(s.children.some(holdsTable)).toBe(false)
		}
	})

	it('carries a stranded heading out to sit with the block it introduces', () => {
		// The magic-item materials fault: `### Exotic` + one intro line left at the
		// foot of a spread while its oversized table began in the next column.
		const md =
			`## Section\n\n${para()}\n\n${para()}\n\n${para()}\n\n` +
			`### Exotic\n\n${para(60)}\n\n${table(60)}\n`
		const tree = run(md)
		const idx = tree.children.findIndex((n: any) => n.type === 'table')
		const heading = tree.children[idx - 2]
		expect(heading?.type).toBe('heading')
		expect(heading.children[0].value).toBe('Exotic')
		// And it is NOT also left inside the spread above.
		for (const s of spreads(tree)) {
			const text = JSON.stringify(s)
			expect(text.includes('"Exotic"')).toBe(false)
		}
	})

	it('never reaches inside a hand-written <Columns>', () => {
		const tree = run(`## S\n\n${para()}\n\n${para()}\n\n${para()}\n\n${para()}\n`)
		const before = JSON.stringify(spreads(tree)[0])
		// Feeding the output back through must be a fixed point.
		autoColumnsPlugin()(tree, { path: '/docs/x.md' })
		expect(spreads(tree).length).toBe(1)
		expect(JSON.stringify(spreads(tree)[0])).toBe(before)
	})

	it('honours `columns: false` front matter', () => {
		const md = `---\ncolumns: false\n---\n\n## S\n\n${para()}\n\n${para()}\n\n${para()}\n\n${para()}\n`
		const tree = remark().use(remarkGfm).parse(md)
		// remark alone does not parse front matter into a yaml node, so assert
		// through the channel Docusaurus actually supplies.
		autoColumnsPlugin()(tree, {
			path: '/docs/x.md',
			data: { frontMatter: { columns: false } },
		})
		expect(spreads(tree).length).toBe(0)
	})

	it('skips internal analysis docs and respects the master switch', () => {
		const md = `## S\n\n${para()}\n\n${para()}\n\n${para()}\n\n${para()}\n`
		expect(spreads(run(md, {}, '/docs/analysis/thing.md')).length).toBe(0)
		expect(spreads(run(md, { enabled: false })).length).toBe(0)
	})

	it('places generated content cards into tracks like any other block', () => {
		// Cards used to be breakers, which left every spell/creature/talent page
		// single column. They are ordinary content now; only `Columns` (which must
		// not be re-entered) and the page `header` still break.
		const card = (n: number) => ({
			type: 'mdxJsxFlowElement',
			name: 'TalentCard',
			attributes: [],
			children: [
				{ type: 'paragraph', children: [{ type: 'text', value: 'x'.repeat(n) }] },
			],
		})
		const tree: any = { type: 'root', children: [card(300), card(300), card(300)] }
		autoColumnsPlugin()(tree, { path: '/docs/x.md' })
		const sp = tree.children.filter(
			(n: any) => n.type === 'mdxJsxFlowElement' && n.name === 'Columns',
		)
		expect(sp.length).toBe(1)
		expect(sp[0].children.length).toBe(3)
	})

	it('still refuses to re-enter a hand-written <Columns> or a page header', () => {
		const tree: any = {
			type: 'root',
			children: [
				{ type: 'mdxJsxFlowElement', name: 'header', attributes: [], children: [] },
				{ type: 'mdxJsxFlowElement', name: 'Columns', attributes: [], children: [] },
			],
		}
		autoColumnsPlugin()(tree, { path: '/docs/x.md' })
		expect(tree.children.length).toBe(2)
		expect(tree.children[0].name).toBe('header')
		expect(tree.children[1].name).toBe('Columns')
	})
})

describe('keeping a heading with its section (M14)', () => {
	const runp = (md: string, opts: any = {}) => {
		const tree = remark().use(remarkGfm).parse(md)
		autoColumnsPlugin(opts)(tree, { path: '/docs/x.md' })
		return tree
	}
	const keeps = (tree: any) => {
		const out: any[] = []
		const walk = (n: any) => {
			if (
				n?.type === 'mdxJsxFlowElement' &&
				n.attributes?.some((a: any) => a.value === 'codex-keep')
			)
				out.push(n)
			;(n?.children ?? []).forEach(walk)
		}
		;(tree.children ?? []).forEach(walk)
		return out
	}

	it('never leaves a heading with less than minSectionLines beside it', () => {
		// The reported fault: `### Exotic`, one short line, then a tall table —
		// the heading kept a scrap and the content began in the next column.
		const md =
			`## S\n\n${para()}\n\n${para()}\n\n### Sub\n\n${para(40)}\n\n` +
			Array(12).fill(para(200)).join('\n\n')
		for (const group of keeps(runp(md))) {
			if (group.children[0].type !== 'heading') continue
			const lines = group.children.reduce(
				(s: number, n: any) =>
					s + Math.max(1, Math.ceil((n.children?.[0]?.value?.length ?? 0) / 65)),
				0,
			)
			expect(lines).toBeGreaterThanOrEqual(4)
		}
	})

	it('binds a whole short section rather than splitting it', () => {
		const md = `## S\n\n${para()}\n\n### Sub\n\n${para(90)}\n\n${para(90)}\n\n${para()}\n`
		// The `### Sub` section shares its spread, so it is bound entire.
		const group = keeps(runp(md)).find((g) =>
			JSON.stringify(g.children[0]).includes('Sub'),
		)
		expect(group).toBeTruthy()
		expect(group.children.length).toBeGreaterThanOrEqual(3)
	})
})

describe('sections pair into columns even when uneven (M14)', () => {
	const runp = (md: string, opts: any = {}) => {
		const tree = remark().use(remarkGfm).parse(md)
		autoColumnsPlugin(opts)(tree, { path: '/docs/x.md' })
		return tree
	}
	const sp = (tree: any) =>
		(tree.children ?? []).filter(
			(n: any) => n.type === 'mdxJsxFlowElement' && n.name === 'Columns',
		)

	it('pairs a short section with a much taller one in ONE spread', () => {
		// The magic-item materials case: `Mundane` (short) beside `Exotic` (tall).
		// The earlier block-chunker split them apart purely because their COMBINED
		// height exceeded a number, which is not a constraint the layout has.
		const md =
			`## Materials\n\n` +
			`### Mundane\n\n${para(200)}\n\n${table(9)}\n\n` +
			`### Exotic\n\n${para(200)}\n\n${table(20)}\n`
		const tree = runp(md)
		expect(sp(tree).length).toBe(1)
		// `## Materials` is its own (empty) section, then the two real ones.
		// Keep-groups sit inside the spread's two column boxes.
		const collect = (n: any, out: any[] = []): any[] => {
			if (
				n?.type === 'mdxJsxFlowElement' &&
				n.attributes?.some((a: any) => a.value === 'codex-keep')
			)
				out.push(n)
			;(n?.children ?? []).forEach((c: any) => collect(c, out))
			return out
		}
		const bound = sp(tree)[0].children.flatMap((c: any) => collect(c))
		expect(bound.length).toBe(2)
		for (const child of bound) {
			expect(child.attributes?.some((a: any) => a.value === 'codex-keep')).toBe(
				true,
			)
			expect(child.children[0].type).toBe('heading')
		}
	})

	it('still stands a section too tall for any column on its own', () => {
		const md = `## S\n\n### Huge\n\n${para(200)}\n\n${table(90)}\n\n### Small\n\n${para(200)}\n`
		const tree = runp(md)
		// The huge section is emitted flat, so its table is a top-level sibling.
		expect(tree.children.some((n: any) => n.type === 'table')).toBe(true)
	})
})

describe('image plates in the shape Docusaurus actually produces (M14)', () => {
	/**
	 * Docusaurus runs `transformImage` before any user remark plugin, rewriting
	 * every markdown image into an `mdxJsxTextElement` named `img` with alt as an
	 * ATTRIBUTE. Tests that parse markdown directly never see this shape, which is
	 * how banners silently ended up inside spreads at one column wide while every
	 * test passed. These build that shape by hand.
	 */
	const jsxImage = (alt: string) => ({
		type: 'paragraph',
		children: [
			{
				type: 'mdxJsxTextElement',
				name: 'img',
				attributes: [
					{ type: 'mdxJsxAttribute', name: 'alt', value: alt },
					{ type: 'mdxJsxAttribute', name: 'src', value: {} },
				],
				children: [],
			},
		],
	})
	const paraNode = (n = 200) => ({
		type: 'paragraph',
		children: [{ type: 'text', value: 'word '.repeat(Math.ceil(n / 5)) }],
	})
	const build = (nodes: any[]) => {
		const tree: any = { type: 'root', children: nodes }
		autoColumnsPlugin()(tree, { path: '/docs/x.md' })
		return tree
	}
	const sp = (tree: any) =>
		tree.children.filter(
			(n: any) => n.type === 'mdxJsxFlowElement' && n.name === 'Columns',
		)

	it('keeps a transformed banner out of every spread', () => {
		const tree = build([
			jsxImage('banner-img'),
			paraNode(),
			paraNode(),
			paraNode(),
			paraNode(),
		])
		expect(tree.children[0]).toBe(tree.children[0])
		expect(tree.children[0].type).toBe('paragraph')
		for (const s of sp(tree)) {
			expect(JSON.stringify(s).includes('banner-img')).toBe(false)
		}
	})

	it('still blocks a spread on a transformed floated portrait', () => {
		const tree = build([
			paraNode(),
			jsxImage('folk-img|A dwarf'),
			paraNode(),
			paraNode(),
		])
		expect(sp(tree).length).toBe(0)
	})
})

describe('card catalogues use grid placement (M14)', () => {
	const card = (name: string, n = 300) => ({
		type: 'mdxJsxFlowElement',
		name: 'CreatureStatBlock',
		attributes: [],
		children: [
			{ type: 'paragraph', children: [{ type: 'text', value: name.repeat(n / 4) }] },
		],
	})
	const build = (nodes: any[]) => {
		const tree: any = { type: 'root', children: nodes }
		autoColumnsPlugin()(tree, { path: '/docs/x.md' })
		return tree
	}
	const cols = (tree: any) =>
		tree.children.filter(
			(n: any) => n.type === 'mdxJsxFlowElement' && n.name === 'Columns',
		)

	it('puts a whole run of cards in ONE grid, in source order', () => {
		// Row-major placement is the point: card 1 left, card 2 right, card 3 left.
		// Height packing would cut the run into several spreads and break that.
		const tree = build([card('a'), card('b'), card('c'), card('d'), card('e')])
		const sp = cols(tree)
		expect(sp.length).toBe(1)
		expect(sp[0].attributes).toContainEqual({
			type: 'mdxJsxAttribute',
			name: 'layout',
			value: 'grid',
		})
		expect(sp[0].children.length).toBe(5)
	})

	it('does not grid a lone card', () => {
		const tree = build([card('a')])
		expect(cols(tree).length).toBe(0)
	})

	it('keeps prose flowing and cards gridded on the same page', () => {
		const p = () => ({
			type: 'paragraph',
			children: [{ type: 'text', value: 'word '.repeat(60) }],
		})
		const tree = build([p(), p(), p(), p(), card('a'), card('b'), card('c')])
		const sp = cols(tree)
		expect(sp.length).toBe(2)
		const layouts = sp.map(
			(s: any) => s.attributes.find((a: any) => a.name === 'layout')?.value,
		)
		// Prose spread has no layout attribute (flow); the card run is grid.
		expect(layouts).toEqual([undefined, 'grid'])
	})
})

describe('a heading is never severed from its card (M14)', () => {
	const card = () => ({
		type: 'mdxJsxFlowElement',
		name: 'RollableTable',
		attributes: [],
		children: [
			{ type: 'paragraph', children: [{ type: 'text', value: 'x'.repeat(1200) }] },
		],
	})
	const heading = (t: string) => ({
		type: 'heading',
		depth: 2,
		children: [{ type: 'text', value: t }],
	})
	const p = (n = 260) => ({
		type: 'paragraph',
		children: [{ type: 'text', value: 'word '.repeat(n / 5) }],
	})

	it('keeps `## X` and the single card under it in one place', () => {
		// The Cursed Items fault: partitioning by card-ness on RAW NODES put the
		// heading in the prose spread and its `RollableTable` in a card group of
		// one, so the heading rendered in the right column with its table dumped
		// full-width beneath it.
		const tree: any = {
			type: 'root',
			children: [
				heading('A'), p(), p(),
				heading('B'), p(), p(),
				heading('Curse Effects'), card(),
			],
		}
		autoColumnsPlugin()(tree, { path: '/docs/x.md' })

		const flat = JSON.stringify(tree)
		expect(flat.includes('Curse Effects')).toBe(true)

		// Wherever the heading ended up, its card must be its immediate sibling —
		// inside the same keep-group, or adjacent at top level.
		const findPair = (nodes: any[]): boolean =>
			nodes.some((n, i) => {
				const isH =
					n?.type === 'heading' && n.children?.[0]?.value === 'Curse Effects'
				if (isH) {
					const next = nodes[i + 1]
					return next?.type === 'mdxJsxFlowElement' && next.name === 'RollableTable'
				}
				return Array.isArray(n?.children) ? findPair(n.children) : false
			})
		expect(findPair(tree.children)).toBe(true)
	})
})

describe('a heading whose section is all cards (M14)', () => {
	const card = () => ({
		type: 'mdxJsxFlowElement',
		name: 'SpellCodexCard',
		attributes: [],
		children: [
			{ type: 'paragraph', children: [{ type: 'text', value: 'x'.repeat(500) }] },
		],
	})
	const h = (t: string) => ({
		type: 'heading',
		depth: 2,
		children: [{ type: 'text', value: t }],
	})
	const build = (children: any[]) => {
		const tree: any = { type: 'root', children }
		autoColumnsPlugin()(tree, { path: '/docs/x.md' })
		return tree
	}

	it('emits the heading above a grid of its cards', () => {
		// The generated spell pages: `## Rank 0` then every card of that rank.
		const tree = build([h('Rank 0'), card(), card(), card()])
		expect(tree.children[0].type).toBe('heading')
		const grid = tree.children[1]
		expect(grid.name).toBe('Columns')
		expect(grid.attributes).toContainEqual({
			type: 'mdxJsxAttribute',
			name: 'layout',
			value: 'grid',
		})
		expect(grid.children.length).toBe(3)
	})

	it('does NOT grid a heading with a single card — they stay bound', () => {
		const tree = build([h('Curse Effects'), card()])
		const gridded = JSON.stringify(tree).includes('"grid"')
		expect(gridded).toBe(false)
	})
})
