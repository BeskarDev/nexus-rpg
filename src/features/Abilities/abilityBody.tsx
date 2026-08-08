import { splitHtmlBlocks } from '@site/src/components/autofit'
import parse from 'html-react-parser'
import React from 'react'

/**
 * An ability's body comes in TWO encodings, and the card has to read both.
 *
 * | Source | Encoding |
 * |---|---|
 * | `talents.json` | HTML — `<br/>` between blocks, `<strong>` rank labels |
 * | `folk.json`, a character's sheet | plain text, `\n` newlines, `- ` bullets |
 *
 * The split is not an accident of history and cannot be normalised away. A
 * folk ability is copied verbatim onto a character by `PersonalTab` and then
 * shown in the sheet's description field — a multiline `TextField`, where an
 * HTML tag would render as the literal characters `<br/>`. So folk text stays
 * plain, and the CARD is what has to adapt.
 */
const HAS_MARKUP = /<[a-z][^>]*>/i

/** A markdown-ish bullet, as the docs and the sheet both write them. */
const BULLET = /^\s*[-*•]\s+/

/**
 * One body chunk as React nodes, whichever encoding it arrived in.
 *
 * Plain text keeps its shape: a run of `- ` lines becomes a real `<ul>` rather
 * than a paragraph with hyphens in it, because those bullets ARE the rule —
 * *Small Stature* is three separate effects a player checks one at a time, and
 * as a run-on sentence they read as one.
 */
export function abilityBody(text: string): React.ReactNode {
	if (!text) return null
	if (HAS_MARKUP.test(text)) return parse(text)

	const lines = text.split('\n')
	const out: React.ReactNode[] = []
	let bullets: string[] = []
	const flush = () => {
		if (bullets.length === 0) return
		out.push(
			<ul key={`ul${out.length}`}>
				{bullets.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>,
		)
		bullets = []
	}
	lines.forEach((line) => {
		if (BULLET.test(line)) {
			bullets.push(line.replace(BULLET, '').trim())
			return
		}
		flush()
		const prose = line.trim()
		if (prose) out.push(<span key={`p${out.length}`}>{prose} </span>)
	})
	flush()
	return out
}

/**
 * A body as the chunks a continuation card may cut between (M18 D3).
 *
 * HTML splits on `<br/>` as every other deck's does. Plain text splits on a
 * BLANK LINE — except that a chunk which is nothing but bullets is merged back
 * into the one above it, so a lead-in never gets orphaned from the list it
 * introduces. That is the same rule that makes a talent's rank rungs safe to
 * cut: the heading is inside the block, so the two cannot be separated.
 */
export function bodyChunks(text: string): string[] {
	if (!text) return []
	if (HAS_MARKUP.test(text)) return splitHtmlBlocks(text)

	const chunks: string[] = []
	text
		.split(/\n\s*\n/)
		.map((chunk) => chunk.trim())
		.filter(Boolean)
		.forEach((chunk) => {
			const allBullets = chunk
				.split('\n')
				.every((line) => BULLET.test(line) || !line.trim())
			if (allBullets && chunks.length > 0) {
				chunks[chunks.length - 1] += `\n${chunk}`
				return
			}
			chunks.push(chunk)
		})
	return chunks
}
