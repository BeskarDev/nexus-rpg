/**
 * Measure what Print Everything actually puts on paper (M22).
 *
 * Two things can only be answered by printing, and both are why this exists:
 *
 * 1. **Do two page sizes survive one job?** Cards print on 192 x 267mm portrait
 *    and character sheets on A4 landscape, which needs CSS named pages. The
 *    spike proved Chrome honours them over hand-written markup; this proves it
 *    over the markup the page really renders.
 * 2. **Does the pack stay tight?** Every card page but the last should hold a
 *    full nine. A page that comes back short means something in the preview is
 *    taking a grid cell it should not.
 *
 * `react-to-print` prints the preview node alone in an iframe, so the document
 * is rebuilt the same way here — the head's styles kept, the body replaced by
 * the preview — rather than printing the whole doc page, whose navigation and
 * controls are not part of the job.
 *
 * Usage (dev server must be running on :3000):
 *
 *     bun src/utils/scripts/measure-print-everything.ts [--out /tmp/deck.pdf]
 */
import { chromium } from 'playwright'

const args = process.argv.slice(2)
const flagValue = (name: string, fallback: string): string => {
	const index = args.indexOf(`--${name}`)
	return index >= 0 ? args[index + 1] : fallback
}

const OUT = flagValue('out', '/tmp/nexus-print-everything.pdf')
const URL = 'http://localhost:3000/docs/gm-tools/printing/print-everything'

const main = async () => {
	const browser = await chromium.launch({ channel: 'chrome' })
	const page = await browser.newPage({
		viewport: { width: 1600, height: 1200 },
	})
	await page.goto(URL, { waitUntil: 'networkidle' })

	// Every character in the roster, and every category including the sheets:
	// the heaviest job the page can be asked for is the one worth measuring.
	// Scoped to the controls panel: the doc prose above the tool says
	// "character sheets" too, and an unscoped locator ticks nothing while
	// reporting a click.
	const controls = page.locator('.pt-controls')
	await controls.getByRole('button', { name: 'Select all' }).first().click()
	await controls
		.locator('label.pt-toggle', { hasText: 'Character Sheets' })
		.click()

	// The cards settle by iteration — each measures, reports, and a spill adds a
	// continuation that measures in turn — so the count of pending fits reaching
	// zero is the only honest "ready".
	await page.waitForFunction(
		() => document.querySelectorAll('.pt-page').length > 0,
		undefined,
		{ timeout: 60_000 },
	)
	await page.waitForFunction(
		() => !document.querySelector('.pt-print-verb')?.hasAttribute('disabled'),
		undefined,
		{ timeout: 120_000 },
	)

	const layout = await page.evaluate(() => {
		const pages = Array.from(document.querySelectorAll('.pt-page'))
		return {
			cards: document.querySelectorAll('.pt-page--cards .pt-page__bed > *')
				.length,
			pages: pages.map((element) => ({
				kind: element.classList.contains('pt-page--cards') ? 'cards' : 'sheets',
				items: element.querySelectorAll('.pt-page__bed > *').length,
			})),
			count: document.querySelector('.pt-count')?.textContent?.trim() ?? '',
		}
	})

	// Rebuild the document as `react-to-print` would: the preview alone, with
	// the page's styles (the `@page` rules included) still in the head.
	await page.evaluate(() => {
		// The node the tool hands `react-to-print` is the DIV INSIDE the preview
		// pane, not the pane: the pane carries the mobile tab strip's inline
		// `display: none`, and print lays the document out at paper width, which
		// is under the 900px desktop breakpoint that overrides it. Cloning the
		// pane therefore prints one blank page.
		const printed = document.querySelector('.pt-preview > div')
		if (!printed) throw new Error('no printed node')
		document.body.replaceChildren(printed)
		document.body.style.margin = '0'
	})
	await page.pdf({ path: OUT, preferCSSPageSize: true })
	await browser.close()

	console.log(layout.count)
	console.log(`${layout.cards} card cells in the preview`)
	const cardPages = layout.pages.filter((entry) => entry.kind === 'cards')
	// Every card page but the LAST one should hold a full nine.
	const short = cardPages.slice(0, -1).filter((entry) => entry.items < 9).length
	console.log(
		short === 0
			? 'every card page but the last is full'
			: `${short} card page(s) short of nine — the pack is leaking`,
	)
	console.log(`wrote ${OUT}`)
}

main()
