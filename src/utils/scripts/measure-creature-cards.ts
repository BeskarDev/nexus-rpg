/**
 * Measure the creature deck (M21 S2, S3).
 *
 * D8 makes "fewest cards" a constraint the milestone answers to, and it insists
 * the answer be a NUMBER: how many cards the 150-creature catalogue prints as,
 * before the recut and after it. Character counts cannot answer that — the whole
 * lesson of M18 F1 — so this drives a real browser over `/dev/creature-cards`,
 * waits for every autofit to settle, and reads the bench's own report.
 *
 * Usage (dev server must be running on :3000):
 *
 *     bun src/utils/scripts/measure-creature-cards.ts [out.json]
 *
 * With a previously written report as `--baseline <file>` it states the delta,
 * which is what S3's last checkbox asks for.
 */
import { chromium } from 'playwright'
import { writeFileSync, readFileSync, existsSync } from 'node:fs'

interface Row {
	name: string
	tier: number
	category: string
	cards: number
	size: number
	oversize: boolean
}

interface Report {
	creatures: number
	cards: number
	continuations: number
	oversize: string[]
	atFloor: number
	byTier: Record<number, { creatures: number; cards: number }>
	rows: Row[]
}

const args = process.argv.slice(2)
const baselineIndex = args.indexOf('--baseline')
const baselinePath = baselineIndex >= 0 ? args[baselineIndex + 1] : undefined
const positional = args.filter(
	(arg, index) =>
		!arg.startsWith('--') &&
		!(baselineIndex >= 0 && index === baselineIndex + 1),
)
const outPath = positional[0] ?? '/tmp/creature-cards-measure.json'

const url =
	process.env.MEASURE_URL ?? 'http://localhost:3000/dev/creature-cards'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } })
await page.goto(url, { waitUntil: 'networkidle', timeout: 120_000 })

// The bench publishes only once every card has settled, and the spill plan
// settles by iteration — a cut renders a continuation, which reports in turn.
await page.waitForFunction(() => Boolean(window.__creatureCardsMeasure), null, {
	timeout: 300_000,
	polling: 500,
})
// One more settled read after a beat, so a late continuation is included.
await page.waitForTimeout(3000)
await page.waitForFunction(() => Boolean(window.__creatureCardsMeasure), null, {
	timeout: 120_000,
	polling: 500,
})

const report = (await page.evaluate(
	() => window.__creatureCardsMeasure,
)) as Report

// Text loss is mechanical and is measured in the DOM, never judged by eye
// (printed-card craft § verification). Every card's content box against its own
// body box, at the size the autofit settled on.
const overflow = await page.evaluate(() => {
	const bad: { index: number; dh: number; dw: number }[] = []
	document.querySelectorAll('.pc-card__body').forEach((body, index) => {
		const content = body.firstElementChild
		if (!content) return
		const b = body.getBoundingClientRect()
		const c = content.getBoundingClientRect()
		if (c.height > b.height + 0.5 || c.width > b.width + 0.5)
			bad.push({ index, dh: c.height - b.height, dw: c.width - b.width })
	})
	return bad
})

await browser.close()

const sizes = report.rows.map((r) => r.size).filter((s) => s > 0)
const summary = {
	...report,
	overflowing: overflow.length,
	minSize: sizes.length ? Math.min(...sizes) : 0,
	medianSize: sizes.length
		? [...sizes].sort((a, b) => a - b)[Math.floor(sizes.length / 2)]
		: 0,
}

writeFileSync(outPath, JSON.stringify(summary, null, '\t'))

console.log(`creatures      ${summary.creatures}`)
console.log(`cards          ${summary.cards}`)
console.log(`continuations  ${summary.continuations}`)
console.log(
	`over budget    ${summary.oversize.length} ${summary.oversize.join(', ')}`,
)
console.log(`at 6.5pt floor ${summary.atFloor}`)
console.log(`overflowing    ${summary.overflowing}`)
console.log(`size min/med   ${summary.minSize} / ${summary.medianSize}`)
console.log('cards by tier  ' + JSON.stringify(summary.byTier))
console.log(
	'multi-card     ' +
		report.rows
			.filter((r) => r.cards > 1)
			.map((r) => `${r.name} (${r.cards})`)
			.join(', '),
)
console.log(`written to     ${outPath}`)

if (baselinePath && existsSync(baselinePath)) {
	const before = JSON.parse(
		readFileSync(baselinePath, 'utf8'),
	) as typeof summary
	console.log('\n— delta against ' + baselinePath)
	console.log(`cards          ${before.cards} → ${summary.cards}`)
	console.log(
		`continuations  ${before.continuations} → ${summary.continuations}`,
	)
	console.log(`at floor       ${before.atFloor} → ${summary.atFloor}`)
	console.log(
		`over budget    ${before.oversize.length} → ${summary.oversize.length}`,
	)
	const beforeCards = new Map(before.rows.map((r) => [r.name, r.cards]))
	const moved = summary.rows
		.filter((r) => beforeCards.get(r.name) !== r.cards)
		.map((r) => `${r.name} ${beforeCards.get(r.name)}→${r.cards}`)
	console.log(`moved          ${moved.length ? moved.join(', ') : 'none'}`)
}
