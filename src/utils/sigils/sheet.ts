/**
 * Sigil contact sheet — `bun run sigils:sheet [out.png]`.
 *
 * A review aid, not a build artifact: every mark rendered at the sidebar size
 * (14px, magnified 4× with hard pixels so the actual rendered ink is visible)
 * next to a crisp 40px chapter-card render. Nothing on the site consumes this;
 * the owner-facing review surface is the dev gallery at `/dev/sigils`.
 */
import { writeFileSync } from 'node:fs'
import {
	SIGIL_INNER,
	SIGIL_VIEWBOX,
	SigilName,
} from '../../components/codex/sigil-paths'
import { encodeGrayPng } from './png'
import { parseSigil, rasterize } from './raster'

const SMALL = 14
const ZOOM = 4
const LARGE = 40
const PAD = 8
const COLS = 8

const CELL_W = SMALL * ZOOM + PAD + LARGE + PAD
const CELL_H = Math.max(SMALL * ZOOM, LARGE) + PAD

function blit(
	sheet: Uint8Array,
	sheetW: number,
	data: Float32Array,
	size: number,
	zoom: number,
	ox: number,
	oy: number,
) {
	for (let y = 0; y < size * zoom; y++) {
		for (let x = 0; x < size * zoom; x++) {
			const v = data[Math.floor(y / zoom) * size + Math.floor(x / zoom)]
			sheet[(oy + y) * sheetW + ox + x] = Math.round(255 * (1 - v))
		}
	}
}

function main() {
	const out = process.argv[2] ?? 'sigil-sheet.png'
	const names = Object.keys(SIGIL_INNER) as SigilName[]
	const rows = Math.ceil(names.length / COLS)
	const width = COLS * CELL_W
	const height = rows * CELL_H
	const sheet = new Uint8Array(width * height).fill(255)

	names.forEach((name, i) => {
		const col = i % COLS
		const row = Math.floor(i / COLS)
		const shapes = parseSigil(SIGIL_INNER[name])
		const ox = col * CELL_W + PAD / 2
		const oy = row * CELL_H + PAD / 2
		blit(
			sheet,
			width,
			rasterize(shapes, SMALL, SIGIL_VIEWBOX).data,
			SMALL,
			ZOOM,
			ox,
			oy,
		)
		blit(
			sheet,
			width,
			rasterize(shapes, LARGE, SIGIL_VIEWBOX).data,
			LARGE,
			1,
			ox + SMALL * ZOOM + PAD,
			oy,
		)
	})

	writeFileSync(out, encodeGrayPng(sheet, width, height))
	console.log(`sigils:sheet — ${names.length} marks → ${out} (${COLS} per row)`)
	names.forEach((name, i) => {
		if (i % COLS === 0) process.stdout.write(`\n  row ${i / COLS + 1}: `)
		process.stdout.write(`${name} `)
	})
	process.stdout.write('\n')
}

if (import.meta.main) main()
