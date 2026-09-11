/**
 * Measure the printed character sheet against its own page box (M19).
 *
 * The Personal sheet's two prose panels take whatever the player wrote, and a
 * long enough set of NPC notes pushed the content past 210mm — off the bottom of
 * the paper, silently. "A page is one page" is the spec (M17 D1), and a spec
 * about height is answered by measuring height, not by looking at a preview.
 *
 * This drives a real browser over the print tool, pastes a character with prose
 * of a given size, and reports each sheet's content height against the page.
 *
 * Usage (dev server must be running on :3000):
 *
 *     bun src/utils/scripts/measure-print-sheet.ts [--notes 4000] [--npcs 12]
 */
import { chromium } from 'playwright'
import { emptyCharacter } from '../../features/PrintCharacterSheet/assets/emptyCharacter'

const args = process.argv.slice(2)
const flag = (name: string, fallback: number): number => {
	const i = args.indexOf(`--${name}`)
	return i >= 0 ? Number(args[i + 1]) : fallback
}

const NOTE_CHARS = flag('notes', 4000)
const NPC_COUNT = flag('npcs', 12)
const NPC_CHARS = flag('npc-chars', 400)
const DESCRIPTION_CHARS = flag('description', 0)

const lorem = (chars: number): string => {
	const word = 'sworn debt owed at the river gate since the flood season '
	return word.repeat(Math.ceil(chars / word.length)).slice(0, chars)
}

const main = async () => {
	const character = JSON.parse(emptyCharacter)
	character.personal.notes = lorem(NOTE_CHARS)
	if (DESCRIPTION_CHARS)
		character.personal.description = lorem(DESCRIPTION_CHARS)
	character.personal.npcRelationships = Array.from(
		{ length: NPC_COUNT },
		(_, i) => ({
			id: `npc-${i}`,
			name: `Ninsun of the Reeds ${i + 1}`,
			role: 'Artisan',
			disposition: (i % 5) - 2,
			description: lorem(NPC_CHARS),
		}),
	)

	const browser = await chromium.launch()
	const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } })
	await page.goto('http://localhost:3000/docs/gm-tools/printing/print-character-sheet', {
		waitUntil: 'networkidle',
	})

	await page.getByRole('button', { name: /import/i }).first().click()
	const textarea = page.getByLabel('Character JSON import')
	await textarea.fill(JSON.stringify(character))
	await page.waitForTimeout(1500)

	const sheets = await page.evaluate(() => {
		const mmPerPx = 25.4 / 96
		/*
		 * LAYOUT pixels throughout, never `getBoundingClientRect`: the preview
		 * draws each page at true millimetre size and then scales it down to the
		 * column, so a rect answers in preview space and a millimetre reading
		 * taken from one is wrong by the scale factor.
		 */
		return Array.from(document.querySelectorAll('.pc-sheet')).map(
			(sheet, index) => {
				const el = sheet as HTMLElement
				const content = sheet.lastElementChild as HTMLElement
				return {
					index,
					pageHeightMm: el.offsetHeight * mmPerPx,
					contentScrollMm: content.scrollHeight * mmPerPx,
					contentClientMm: content.clientHeight * mmPerPx,
					sheetScrollMm: el.scrollHeight * mmPerPx,
				}
			},
		)
	})

	const panels = await page.evaluate(() =>
		Array.from(document.querySelectorAll('.pc-sheet')).flatMap((sheet, index) =>
			Array.from(sheet.querySelectorAll('.pc-prose--fitted')).map((panel) => {
				const blocks = Array.from(
					panel.querySelectorAll<HTMLElement>('[data-sheet-block]'),
				)
				const section = panel.parentElement as HTMLElement
				return {
					sheet: index,
					label: section.querySelector('.pc-group__head')?.textContent ?? '',
					shown: blocks.filter((b) => b.style.display !== 'none').length,
					total: blocks.length,
					boxClientMm: (panel as HTMLElement).clientHeight * (25.4 / 96),
					boxScrollMm: (panel as HTMLElement).scrollHeight * (25.4 / 96),
					firstBlockMm:
						(blocks[0]?.offsetHeight ?? 0) * (25.4 / 96),
					note:
						section.querySelector('.pc-overflow-note')?.textContent?.trim() ??
						'',
				}
			}),
		),
	)

	console.log(
		`notes ${NOTE_CHARS} chars, ${NPC_COUNT} NPCs × ${NPC_CHARS} chars` +
			(DESCRIPTION_CHARS ? `, description ${DESCRIPTION_CHARS} chars` : '') +
			'\n',
	)
	for (const s of sheets) {
		const over = s.contentScrollMm - s.contentClientMm
		console.log(
			`sheet ${s.index}: page ${s.pageHeightMm.toFixed(1)}mm, ` +
				`content ${s.contentScrollMm.toFixed(1)}mm in ${s.contentClientMm.toFixed(1)}mm — ` +
				(over > 0.5 ? `OVERFLOWS by ${over.toFixed(1)}mm` : 'fits'),
		)
	}

	for (const p of panels) {
		console.log(
			`  ${p.label}: ${p.shown}/${p.total} blocks printed, ` +
				`box ${p.boxClientMm.toFixed(1)}mm (content ${p.boxScrollMm.toFixed(1)}mm, ` +
				`first block ${p.firstBlockMm.toFixed(1)}mm)` +
				(p.note ? ` — note "${p.note}"` : ''),
		)
	}

	await browser.close()
}

main()
