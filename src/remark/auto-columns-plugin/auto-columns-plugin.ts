// `import type`, not a value import: `unist` is types-only (`@types/unist`), and
// a value import of it makes this module unloadable by Node's type stripper —
// which is what the layout-report script in the docs-layout skill runs on.
import type { Node } from 'unist'

/**
 * Remark plugin that segments a doc page into two-column spreads automatically,
 * so the codex reads like a printed manual without every page being hand-marked.
 *
 * ## Why segmentation, and not `column-count` on the whole page
 *
 * A CSS multicol block has UNBOUNDED height on a scrolling document: a long
 * article becomes a tall left column and a tall right one, so the reader hits
 * the bottom of the page and has to scroll back to the top to continue. Print
 * gets two columns for free because a page ENDS. The web has no page, so the
 * plugin manufactures one: it cuts the flow at the places a book would break
 * (a section heading, a full-width plate) and columnises only the runs between
 * them, each short enough to take in without that round trip.
 *
 * ## The unit is a SECTION, not a block
 *
 * A heading and the content under it are one thing, and the layout is built out
 * of those rather than out of loose blocks. Each section becomes an unbreakable
 * box, sections are PACKED into spreads, and the browser places whole sections
 * into tracks instead of fragmenting prose across them.
 *
 * That is what makes a spread look deliberate: one section left, another right,
 * each entire. It also means the two columns are usually UNEQUAL, and that is
 * correct — a spread is as tall as its taller section, exactly as a manual's
 * page is. An earlier version capped a block at half a spread on the theory that
 * a block taller than one column could not sit in one; that cap was invented,
 * not real, and it was what tore the magic-item material tables out of the
 * layout instead of putting them side by side.
 *
 * A spread is emitted only when ALL of these hold. Each rule exists because its
 * absence produces a specific, visible failure:
 *
 *   - at least `minChildren` blocks — one block in two columns fills the first
 *     and leaves the second empty, since every child is `break-inside: avoid`
 *   - `minLines` or taller — splitting six lines into two columns of three is
 *     fussier than leaving it alone
 *   - (a floated plate used to be refused here. It no longer is: an inline plate
 *     does not float on a spread page at all — see the `data-plate-weight`
 *     rules in custom.css — so the guard was refusing runs for a condition that
 *     can no longer arise, and it kept every folk entry single-column.)
 *   - no section taller than `maxColumnLines`, which stands on its own at full
 *     sheet width instead: past that a column is taller than the screen and the
 *     reader has to scroll down one track and back up the other
 *
 * Total height is deliberately NOT a test. Rejecting a tall run was the first
 * version's mistake and it left whole pages untouched: 156 runs across the
 * corpus failed on height alone, including all of Character Creation (one
 * 247-line run) and the magic-item materials list. A run left in one column is
 * exactly as tall as it was; the reader saves no scrolling and simply loses the
 * second half of the page.
 *
 * Heights are ESTIMATED from the source text, since a remark plugin runs at
 * build time with no DOM and no fonts. That is why the thresholds are generous
 * rather than tight: the estimate only has to be good enough to sort runs into
 * "too short", "about right" and "too tall", and every number is overridable.
 *
 * ## Overrides
 *
 * An explicit `<Columns>` in the source is honoured exactly as written — it is
 * a breaker, so the automatic pass never reaches inside it or re-wraps it. Per
 * page, front matter `columns: false` turns the pass off entirely. Both exist
 * because a heuristic over prose will always have cases a human should settle.
 */

export interface AutoColumnsOptions {
	/** Master switch. `false` leaves only hand-written `<Columns>`. */
	enabled?: boolean
	/**
	 * Headings at or above this level end a run outright, rather than merely
	 * starting a new section within one.
	 *
	 * 1 — only the page title. It was 2, which predates the section model and is
	 * now actively harmful: every `##` ended its run, so two `##` sections could
	 * never pair into a spread. A page whose headings are ALL `##` (Cursed Items)
	 * therefore stayed single-column no matter how much content it had. Sections
	 * already keep a heading with its own content, so nothing needs a hard break
	 * to stay intact.
	 */
	breakDepth?: number
	/**
	 * Depth at or above which a heading that introduces SUBSECTIONS ends the run.
	 *
	 * The test is whether the next heading below it is DEEPER, not whether it has
	 * content of its own. `## Folk` announces twelve `### ` entries; swept into a
	 * spread it was stranded in a right-hand column with the list it announces
	 * beginning below on the left. Emptiness was tried first and is NOT the
	 * signal — a divider often carries a sentence or two of its own before the
	 * subsections start, and that intro does not make it a section.
	 *
	 * A heading whose siblings sit at its OWN depth is an ordinary section and
	 * must not break, or a page whose headings are all `##` (Cursed Items) has
	 * nothing left to pair and stays single-column.
	 */
	dividerDepth?: number
	/**
	 * Characters per line in ONE track. The spread gives each track 32.75rem
	 * (524px); Spectral averages a bit under 8px per character at the 16px
	 * reading size, so ~65.
	 */
	charsPerLine?: number
	/** Shortest run worth splitting, in estimated lines. */
	minLines?: number
	/**
	 * Tallest ONE COLUMN may be, in estimated lines.
	 *
	 * This is the only height limit that means anything, because a column is what
	 * the reader's screen has to hold. ~60 lines is roughly 1.5 viewports: long
	 * enough that two reference sections sit side by side, short enough that
	 * reading down one track and back up the other stays tolerable.
	 *
	 * It bounds a spread through the packing (see `packSections`), and any single
	 * section taller than it is stood on its own at full width instead.
	 */
	maxColumnLines?: number
	/** Fewest top-level blocks worth splitting. */
	minChildren?: number
	/**
	 * Largest share of a spread one section may occupy and still balance (0-1).
	 *
	 * Only applied to a spread of TWO sections, where a lopsided pair leaves one
	 * track nearly empty. Past two the packing has enough pieces to even out.
	 */
	maxDominance?: number
	/**
	 * Least that must stay with a heading when its own section flows across both
	 * columns, in estimated lines.
	 *
	 * Only applies to a spread holding ONE section, where the section has to
	 * split or the second column would stand empty. A heading followed into the
	 * next column by everything it introduces reads as a label with no subject.
	 */
	minSectionLines?: number
	/** Path fragments whose files are skipped entirely. */
	excludePaths?: string[]
}

const DEFAULTS: Required<AutoColumnsOptions> = {
	enabled: true,
	breakDepth: 1,
	dividerDepth: 2,
	charsPerLine: 65,
	minLines: 12,
	// ~2 viewports. Tuned against the magic-item materials page, which is the
	// densest real case: below 70 the Mundane and Exotic tables fall into
	// separate spreads purely because of where the packing happens to cut, and
	// at 90 the whole page collapses into a single spread. 70-80 all produce the
	// same, correct pairing, so this sits at the shallow end of that band —
	// a taller column is a longer trip down one track and back up the other.
	maxColumnLines: 72,
	minChildren: 2,
	maxDominance: 0.82,
	minSectionLines: 9,
	// Internal design docs are working documents, not the codex.
	excludePaths: ['/analysis/', '\\analysis\\'],
}

/** Total length of every text leaf under a node. */
function textLength(node: any): number {
	if (typeof node?.value === 'string') return node.value.length
	if (!Array.isArray(node?.children)) return 0
	return node.children.reduce(
		(sum: number, child: any) => sum + textLength(child),
		0,
	)
}

/**
 * Hard line breaks under a node.
 *
 * Counting these is not a refinement, it is load-bearing. The magic-item
 * material tables put a description, a blank line and a mechanical effect in one
 * cell, so every row is two lines taller than its text length implies. Ignoring
 * them estimated one table at 26 lines when it rendered at 1533px — roughly 56 —
 * which let a block far taller than a column into a spread, where it was shunted
 * to the next track and stranded its heading behind.
 */
function breakCount(node: any): number {
	if (node?.type === 'break') return 1
	if (!Array.isArray(node?.children)) return 0
	return node.children.reduce(
		(sum: number, child: any) => sum + breakCount(child),
		0,
	)
}

/**
 * The alt text of an image node, in EITHER shape the pipeline produces.
 *
 * This is the whole reason banners kept ending up inside spreads. Docusaurus
 * runs its own `transformImage` before any user remark plugin, and it rewrites
 * every markdown image into an `mdxJsxTextElement` named `img` whose alt is an
 * ATTRIBUTE. A check written against the mdast `image` node therefore passes
 * every unit test — which parses markdown directly — and matches nothing in a
 * real build. Both shapes have to be read, and the tests cover both.
 */
function imageAlt(node: any): string | undefined {
	if (node?.type === 'image') return String(node.alt ?? '')
	if (node?.type === 'mdxJsxTextElement' && node.name === 'img') {
		const attribute = (node.attributes ?? []).find(
			(a: any) => a?.name === 'alt',
		)
		return attribute && typeof attribute.value === 'string'
			? attribute.value
			: undefined
	}
	return undefined
}

/** A paragraph whose only real content is one image — a plate, not prose. */
function imageOnlyParagraph(node: any): any | undefined {
	if (node?.type !== 'paragraph' || !Array.isArray(node.children)) return
	const meaningful = node.children.filter(
		(c: any) => !(c.type === 'text' && String(c.value ?? '').trim() === ''),
	)
	if (meaningful.length !== 1) return
	return imageAlt(meaningful[0]) !== undefined ? meaningful[0] : undefined
}

/**
 * `MdxImage` routes plates by an alt-text MARKER, so the marker is also what
 * tells this plugin what a picture will become. `banner-img` is a full-width
 * band and makes a natural section break; anything else marked (`folk-img`)
 * becomes a floated portrait, which a narrow track cannot host.
 */
function plateKind(node: any): 'banner' | 'float' | undefined {
	const image = imageOnlyParagraph(node)
	if (!image) return
	const alt = imageAlt(image) ?? ''
	if (alt.startsWith('banner-img')) return 'banner'
	return alt.includes('|') || alt.endsWith('-img') ? 'float' : undefined
}

/**
 * Estimated rendered height of a block, in lines of body text.
 *
 * Deliberately coarse. The thresholds it feeds are wide, and a build-time
 * estimate cannot know the reader's font size or zoom — it only has to rank
 * blocks against each other well enough to reject the runs that would read
 * badly.
 */
export function estimateLines(node: any, charsPerLine: number): number {
	const wrap = (len: number, width = charsPerLine) =>
		Math.max(1, Math.ceil(len / width))

	switch (node?.type) {
		case 'paragraph':
			// A plate is a picture's height, not its caption's length.
			return imageOnlyParagraph(node)
				? 14
				: wrap(textLength(node)) + breakCount(node) + 0.6
		case 'heading':
			return node.depth <= 3 ? 2.6 : 2.2
		case 'blockquote':
			// Indented, so it wraps sooner than body text.
			return wrap(textLength(node), charsPerLine - 6) + 1.4
		case 'list':
			return (node.children ?? []).reduce(
				(sum: number, item: any) => sum + wrap(textLength(item)) + 0.25,
				0,
			)
		case 'table': {
			// Rows are set one step down (`--nexus-text-dense`) and tighter, hence
			// the 0.85 — but a wide row still wraps inside a narrow track, which is
			// what the per-row `wrap` catches. `breakCount` is what makes this
			// anywhere near reality for the material and effect tables, whose cells
			// carry a description, a blank line and a rule; without it they came out
			// at less than half their rendered height. The flat 0.5 is cell padding,
			// which is per-row and invisible to any text measure.
			const rows = node.children ?? []
			return (
				rows.reduce(
					(sum: number, row: any) =>
						sum +
						(wrap(textLength(row)) + breakCount(row)) * 0.85 +
						0.5,
					0,
				) + 1.5
			)
		}
		case 'code':
			return String(node.value ?? '').split('\n').length + 1.5
		// An admonition (`:::note`) carries a title band and padding on top of its
		// prose. None exist in the corpus today; without this it would fall to the
		// 2-line default and drag a whole run under `minLines`.
		case 'containerDirective':
			return (node.children ?? []).reduce(
				(sum: number, child: any) => sum + estimateLines(child, charsPerLine),
				2.5,
			)
		// A content card (spell, talent, creature, combat art) or a wrapper like
		// `RollableTable`. Measured from what is INSIDE it rather than as a flat
		// guess: a one-line condition card and a creature stat block are both this
		// node type and differ by an order of magnitude, and now that cards are
		// placed into columns the packing has to tell them apart.
		case 'mdxJsxFlowElement': {
			const inner = (node.children ?? []).reduce(
				(sum: number, child: any) => sum + estimateLines(child, charsPerLine),
				0,
			)
			// The plugin's OWN keep-together wrapper is a bare div — no frame, no
			// padding, nothing to charge for. Charging it the card constant made a
			// bound section measure taller than it renders, and that overshoot was
			// enough on its own to push the Cursed Items page (70.8 lines, limit 72)
			// past the ceiling and out of the layout entirely.
			const isWrapper =
				node.name === 'div' &&
				(node.attributes ?? []).some((a: any) => a?.value === 'codex-keep')
			// The constant is the frame itself — keystone overhang, border, padding.
			return isWrapper ? inner : inner + 3
		}
		default:
			return 2
	}
}

/**
 * A node that ends the current run.
 *
 * Every `mdxJsxFlowElement` breaks, which covers two cases at once: a hand
 * written `<Columns>` is preserved untouched, and the generated content cards
 * (spell, creature, talent, combat art) are left in a single column. Those
 * cards carry their own dense internal layout and are designed against the full
 * sheet width, so pairing them into tracks is a separate design decision rather
 * than something a heuristic should make silently.
 */
function isBreaker(node: any, options: Required<AutoColumnsOptions>): boolean {
	if (node?.type === 'heading' && node.depth <= options.breakDepth) return true
	if (node?.type === 'mdxJsxFlowElement') {
		// Only two JSX blocks still break. `Columns` must, or the pass would
		// re-enter a hand-written spread; `header` is the page title block, which
		// Docusaurus emits as JSX rather than as a `heading`, so it is the real
		// h1 breaker in a production build.
		return node.name === 'Columns' || node.name === 'header'
	}
	return (
		node?.type === 'thematicBreak' ||
		node?.type === 'mdxFlowExpression' ||
		node?.type === 'yaml' ||
		node?.type === 'export' ||
		node?.type === 'mdxjsEsm' ||
		plateKind(node) === 'banner'
	)
}

/**
 * A generated content card, or any JSX block standing in for one.
 *
 * `header` and `Columns` never reach here — both are breakers — and the plugin's
 * own keep-together wrapper is excluded, so this is exactly the content cards
 * the generators emit plus wrappers like `RollableTable`.
 */
function isCardNode(node: any): boolean {
	if (node?.type !== 'mdxJsxFlowElement') return false
	if (node.name === 'header' || node.name === 'Columns') return false
	return !(node.attributes ?? []).some((a: any) => a?.value === 'codex-keep')
}

/**
 * A section that is a heading followed by nothing but cards.
 *
 * The generated spell pages are shaped this way — `## Rank 0` and then every
 * spell card of that rank — so without this the whole thing is one section on
 * the flow path and the cards never grid. The heading is emitted immediately
 * above the grid, so it is still adjacent to what it introduces.
 *
 * Two or more cards required: a heading with ONE card under it (`## Curse
 * Effects` and a `RollableTable`) has to stay a normal section, or the heading
 * lands in one column with its table stranded elsewhere.
 */
function headingWithCards(
	section: Section,
): { heading: any; cards: any[] } | undefined {
	const [first, ...rest] = section.nodes
	if (first?.type !== 'heading' || rest.length < 2) return
	if (!rest.every(isCardNode)) return
	return { heading: first, cards: rest }
}

/**
 * Split SECTIONS into alternating stretches of bare cards and of everything
 * else.
 *
 * Partitioning raw nodes instead was wrong in a way worth recording: a
 * `RollableTable` is a card node, so `## Curse Effects` followed by one landed
 * the heading in the prose group and the table in a card group of its own. The
 * heading was laid out in the right-hand column while its table was emitted
 * full-width underneath it — the two severed from each other.
 *
 * A section only counts as a card when it is a LONE card with no heading of its
 * own. A heading plus a card is an ordinary section and belongs on the flow
 * path, which is what keeps the two together.
 */
export function partitionCardSections(
	sections: Section[],
): { cards: boolean; sections: Section[] }[] {
	const groups: { cards: boolean; sections: Section[] }[] = []
	for (const section of sections) {
		const cards = section.nodes.length === 1 && isCardNode(section.nodes[0])
		const last = groups[groups.length - 1]
		if (last && last.cards === cards) last.sections.push(section)
		else groups.push({ cards, sections: [section] })
	}
	return groups
}

/** A heading and everything under it, treated as one placeable unit. */
export interface Section {
	nodes: any[]
	lines: number
}

/**
 * Split a run into sections: a heading plus everything up to the next heading.
 *
 * Blocks appearing before any heading each become their own single-node
 * section, so a run of loose paragraphs still packs and spreads exactly as it
 * did before sections existed.
 */
export function toSections(
	run: any[],
	options: Required<AutoColumnsOptions>,
): Section[] {
	const linesOf = (nodes: any[]) =>
		nodes.reduce(
			(sum, n) => sum + estimateLines(n, options.charsPerLine),
			0,
		)
	const sections: Section[] = []

	for (let i = 0; i < run.length; i++) {
		if (run[i]?.type !== 'heading') {
			sections.push({ nodes: [run[i]], lines: linesOf([run[i]]) })
			continue
		}
		let end = i + 1
		while (end < run.length && run[end]?.type !== 'heading') end++
		const nodes = run.slice(i, end)
		sections.push({ nodes, lines: linesOf(nodes) })
		i = end - 1
	}
	return sections
}

/**
 * How tall a spread of these sections will render.
 *
 * The browser balances unbreakable boxes into two tracks, so the spread ends up
 * as tall as EITHER the perfectly-shared half or the single tallest section,
 * whichever is larger. That second term is the one that matters here: it is why
 * a 56-line table paired with a 22-line one produces a 56-line spread with an
 * uneven pair of columns, which is correct and is what a manual's page does.
 */
export function spreadHeight(
	sections: Section[],
	options: Required<AutoColumnsOptions>,
): number {
	const total = sections.reduce((sum, s) => sum + s.lines, 0)
	// Only a section that stays in ONE piece pins the height. A section taller
	// than a column flows across both tracks, so it contributes to the shared
	// half rather than setting a floor of its own.
	const atomic = sections
		.filter((s) => s.lines <= options.maxColumnLines)
		.map((s) => s.lines)
	const tallest = atomic.length ? Math.max(...atomic) : 0
	return Math.max(tallest, total / 2)
}

/**
 * Cut a section too tall for a single spread into several.
 *
 * A section flowing across two tracks is half its own height, so anything past
 * twice the column limit still overruns the screen. Packing cannot help — it
 * only cuts BETWEEN sections — so the section itself is divided, the heading
 * riding with the first piece.
 */
export function splitTallSections(
	sections: Section[],
	options: Required<AutoColumnsOptions>,
): Section[] {
	const limit = options.maxColumnLines * 2
	const out: Section[] = []

	for (const section of sections) {
		if (section.lines <= limit) {
			out.push(section)
			continue
		}
		let piece: any[] = []
		let lines = 0
		for (const node of section.nodes) {
			const height = estimateLines(node, options.charsPerLine)
			if (piece.length && lines + height > limit) {
				out.push({ nodes: piece, lines })
				piece = []
				lines = 0
			}
			piece.push(node)
			lines += height
		}
		if (piece.length) out.push({ nodes: piece, lines })
	}
	return out
}

/**
 * Pack sections into spreads, greedily, bounded by COLUMN height.
 *
 * Replaces the earlier block-chunker, which cut on total height and so split a
 * pair of reference tables into separate spreads for the sole reason that
 * together they exceeded a number. Columns are allowed to come out uneven; only
 * the taller one is bounded, because that is the one the screen has to hold.
 */
export function packSections(
	sections: Section[],
	options: Required<AutoColumnsOptions>,
): Section[][] {
	const spreads: Section[][] = []
	let current: Section[] = []

	for (const section of sections) {
		if (
			current.length &&
			spreadHeight([...current, section], options) > options.maxColumnLines
		) {
			spreads.push(current)
			current = []
		}
		current.push(section)
	}
	if (current.length) spreads.push(current)
	return spreads
}

/** The keep-together box. */
function keepNode(nodes: any[]): any {
	return {
		type: 'mdxJsxFlowElement',
		name: 'div',
		attributes: [
			{ type: 'mdxJsxAttribute', name: 'className', value: 'codex-keep' },
		],
		children: nodes,
	}
}

/**
 * Turn a section into the boxes a spread actually places.
 *
 * `break-after: avoid` is the CSS for keeping a heading with its content, and
 * Chrome does not implement it in multicol — only `break-inside` is honoured.
 * So keep-with-next has to become keep-TOGETHER: a box carrying
 * `break-inside: avoid` (via `.columns > *`) which moves as a unit.
 *
 * How much gets bound depends on whether the section has company, and that
 * distinction is the whole point:
 *
 * - **Sharing a spread** — bind the section whole, so the browser places one
 *   section per track. This is what makes a spread look composed rather than
 *   poured. A section too tall for a column keeps as much as a column will hold
 *   and lets the remainder flow.
 * - **Alone in a spread** — bind only the heading and enough of its opening to
 *   satisfy `minSectionLines`, and let the rest flow. Binding it whole would
 *   make the section one indivisible box in one track and leave the other
 *   EMPTY, which is exactly the failure that kept `## `-only pages single
 *   column.
 */
export function expandSection(
	section: Section,
	options: Required<AutoColumnsOptions>,
	alone: boolean,
): any[] {
	const nodes = section.nodes
	if (nodes.length < 2) return nodes
	// Loose blocks with no heading have nothing to keep together.
	if (nodes[0]?.type !== 'heading') return nodes

	const linesOf = (ns: any[]) =>
		ns.reduce((sum, n) => sum + estimateLines(n, options.charsPerLine), 0)

	if (!alone) {
		if (section.lines <= options.maxColumnLines) return [keepNode(nodes)]
		// Too tall to bind whole: keep what a column will hold.
		let take = 1
		while (
			take < nodes.length &&
			linesOf(nodes.slice(0, take + 1)) <= options.maxColumnLines
		) {
			take++
		}
		if (take < 2) take = 2
		return take >= nodes.length
			? [keepNode(nodes)]
			: [keepNode(nodes.slice(0, take)), ...nodes.slice(take)]
	}

	// Alone: bind the smallest opening that satisfies `minSectionLines`.
	let take = 1
	while (take < nodes.length && linesOf(nodes.slice(0, take)) < options.minSectionLines) {
		take++
	}
	if (take >= nodes.length) return [keepNode(nodes)]
	return [keepNode(nodes.slice(0, take)), ...nodes.slice(take)]
}

/** The boxes a packed spread will place, in order. */
export function spreadItems(
	spread: Section[],
	options: Required<AutoColumnsOptions>,
): any[] {
	const alone = spread.length < 2
	return spread.flatMap((section) => expandSection(section, options, alone))
}

/** Whether a packed spread should actually be columnised. */
export function shouldColumnise(
	spread: Section[],
	options: Required<AutoColumnsOptions>,
): boolean {
	// Two boxes minimum, or one track fills and the other stays empty. Counted
	// AFTER expansion, because a lone section that flows supplies several.
	const items = spreadItems(spread, options)
	if (items.length < Math.max(2, options.minChildren)) return false

	const total = spread.reduce((sum, s) => sum + s.lines, 0)
	if (total < options.minLines) return false

	// Lopsidedness and overflow are both properties of the PLACED boxes, not of
	// the sections: every child of a spread is `break-inside: avoid`, so each
	// item is atomic once it is emitted.
	const itemLines = items.map((n) => estimateLines(n, options.charsPerLine))
	const tallest = Math.max(...itemLines)

	// No single box may be taller than a column. One that is cannot be split by
	// the browser either, so it would make its track taller than the screen. It
	// gets the full sheet width on its own instead — which a wide table wants.
	if (tallest > options.maxColumnLines) return false

	// One box carrying nearly the whole spread leaves the other track a sliver.
	const itemTotal = itemLines.reduce((sum, n) => sum + n, 0)
	if (tallest > itemTotal * options.maxDominance) return false
	return true
}

/** Read `columns:` out of the page's front matter, whichever form we are given. */
function frontMatterColumns(tree: any, file: any): boolean | undefined {
	const declared = file?.data?.frontMatter?.columns
	if (typeof declared === 'boolean') return declared

	const yaml = (tree?.children ?? []).find((n: any) => n?.type === 'yaml')
	const match = /^columns:\s*(true|false)\s*$/m.exec(String(yaml?.value ?? ''))
	return match ? match[1] === 'true' : undefined
}

const autoColumnsPlugin = (userOptions: AutoColumnsOptions = {}) => {
	const options: Required<AutoColumnsOptions> = { ...DEFAULTS, ...userOptions }

	return (tree: Node, file: { path?: string; data?: any }) => {
		if (!options.enabled) return
		const path = file?.path ?? ''
		if (options.excludePaths.some((fragment) => path.includes(fragment))) return

		const declared = frontMatterColumns(tree, file)
		if (declared === false) return

		const children: any[] = (tree as any).children ?? []
		if (!children.length) return

		const output: any[] = []
		let run: any[] = []

		const flush = () => {
			if (!run.length) return

			for (const group of partitionCardSections(toSections(run, options))) {
				const nodes = group.sections.flatMap((s) => s.nodes)

				// A stretch of bare cards goes into ONE grid, in source order: first
				// card left, second right, third left. No height packing — a
				// catalogue is scanned rather than read through, so row-major
				// placement never sends the reader back up a column, and grid has no
				// fragmentainers for a card's keystone to be resolved against.
				if (group.cards && group.sections.length >= 2) {
					output.push({
						type: 'mdxJsxFlowElement',
						name: 'Columns',
						attributes: [
							{ type: 'mdxJsxAttribute', name: 'layout', value: 'grid' },
						],
						children: nodes,
					})
					continue
				}
				if (group.cards) {
					output.push(...nodes)
					continue
				}

				// Prose. One shape needs lifting out first: a heading whose whole
				// section is cards (the generated spell pages) emits as the heading
				// followed by a grid, rather than being poured into a flow spread.
				let pending: Section[] = []
				const flowOut = () => {
					if (!pending.length) return
					for (const spread of packSections(
						splitTallSections(pending, options),
						options,
					)) {
						if (shouldColumnise(spread, options)) {
							output.push({
								type: 'mdxJsxFlowElement',
								name: 'Columns',
								attributes: [],
								children: spreadItems(spread, options),
							})
						} else {
							for (const section of spread) output.push(...section.nodes)
						}
					}
					pending = []
				}

				for (const section of group.sections) {
					const split = headingWithCards(section)
					if (!split) {
						pending.push(section)
						continue
					}
					flowOut()
					output.push(split.heading, {
						type: 'mdxJsxFlowElement',
						name: 'Columns',
						attributes: [
							{ type: 'mdxJsxAttribute', name: 'layout', value: 'grid' },
						],
						children: split.cards,
					})
				}
				flowOut()
			}
			run = []
		}

		/**
		 * Pull a trailing heading and its stub of intro text back off the run, so
		 * they can be emitted directly above the breaker that follows instead of
		 * being left in a spread's right-hand column.
		 *
		 * `## Character Creation: Physical Traits` on the Folk page is the case:
		 * the content it introduces is a hand-written `<Columns>`, which is a
		 * breaker, so the heading was swept into the PREVIOUS spread and rendered
		 * on the right while its content began below on the left.
		 *
		 * Only a STUB moves. A heading with real content under it is a section in
		 * its own right and belongs in the spread.
		 */
		const detachTrailingStub = (): any[] => {
			let index = -1
			for (let i = run.length - 1; i >= 0; i--) {
				if (run[i]?.type === 'heading') {
					index = i
					break
				}
				if (estimateLines(run[i], options.charsPerLine) > options.minLines) {
					return []
				}
			}
			if (index === -1) return []
			const tail = run.slice(index)
			const lines = tail.reduce(
				(sum, node) => sum + estimateLines(node, options.charsPerLine),
				0,
			)
			if (lines > options.minLines) return []
			run.length = index
			return tail
		}

		/**
		 * The depth of the next heading after `from`, or undefined if a breaker
		 * intervenes or none follows. Non-heading blocks are skipped: a divider
		 * may introduce its subsections with a sentence or two of its own.
		 */
		const nextHeadingDepth = (from: number): number | undefined => {
			for (let i = from + 1; i < children.length; i++) {
				const node = children[i]
				if (node?.type === 'heading') return node.depth
				if (isBreaker(node, options)) return undefined
			}
			return undefined
		}

		/** A heading that introduces subsections. See `dividerDepth`. */
		const isDividerHeading = (node: any, index: number): boolean => {
			if (node?.type !== 'heading' || node.depth > options.dividerDepth)
				return false
			const next = nextHeadingDepth(index)
			return next !== undefined && next > node.depth
		}

		for (const [index, node] of children.entries()) {
			if (isDividerHeading(node, index)) {
				flush()
				output.push(node)
				continue
			}
			if (!isBreaker(node, options)) {
				run.push(node)
				continue
			}

			// A heading is its own break, so nothing needs carrying past it.
			// Anything else INTERRUPTS a section, and its heading travels with it.
			const carried = node?.type === 'heading' ? [] : detachTrailingStub()
			flush()

			// A hand-written `<Columns>` is never re-wrapped, but its children still
			// get the keep-together treatment — without it an author's spread has no
			// protection at all, and a heading inside one is separated from its own
			// table exactly as the automatic pass used to do.
			if (node?.type === 'mdxJsxFlowElement' && node.name === 'Columns') {
				output.push(...carried, {
					...node,
					children: toSections(node.children ?? [], options).flatMap((s) =>
						expandSection(s, options, false),
					),
				})
				continue
			}
			output.push(...carried, node)
		}
		flush()

		;(tree as any).children = output
	}
}

export default autoColumnsPlugin
