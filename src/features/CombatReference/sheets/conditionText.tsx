import React from 'react'

/**
 * The rules text of a condition, as printable structure.
 *
 * `conditions.json` stores each description as one string carrying `<br/>`,
 * `- ` bullets and `<strong>` — the shape the Notion import left and the shape
 * `generate-conditions.ts` turns into MDX. The app's own use of the same field
 * (`StatusEffects`) flattens all of it to a tooltip string, which is fine for a
 * tooltip and wrong for a sheet: a list of four effects has to READ as four
 * effects when someone is looking for one of them mid-turn.
 *
 * Only the three tags the corpus actually contains are handled, and an unknown
 * one throws rather than printing as literal angle brackets on paper. The corpus
 * guard in `tests/unit/combatReference.test.ts` runs every description through
 * this, so a fourth tag fails the build and not the print.
 */

const ALLOWED = /^<\/?(?:strong|br\s*\/?)>$/

/**
 * Boilerplate that announces a list the reader can already see.
 *
 * Thirteen of the twenty-five conditions open with "You apply the following
 * effects:" and then apply them as bullets. On the rules page that line is
 * ordinary prose; on the sheet it is thirteen lines — about 5% of the half —
 * spent saying nothing, and 5% of the half is the difference between carrying
 * every condition and dropping two. It is only ever dropped when bullets
 * actually follow it; a stray one with nothing after it would be a change of
 * meaning, not a saving.
 */
const LIST_PREAMBLE = /^You apply the following effects:$/

/** `<strong>` spans, in a single line of text. */
function inline(line: string, key: string): React.ReactNode[] {
	const unknown = line.match(/<[^>]+>/g)?.filter((tag) => !ALLOWED.test(tag))
	if (unknown?.length)
		throw new Error(
			`[combat reference] unsupported tag ${unknown[0]} in a condition description`,
		)
	return line
		.split(/<strong>|<\/strong>/)
		.map((part, index) =>
			index % 2 === 1 ? (
				<strong key={`${key}:${index}`}>{part}</strong>
			) : (
				<React.Fragment key={`${key}:${index}`}>{part}</React.Fragment>
			),
		)
}

/**
 * Split a description into paragraphs and bullet runs.
 *
 * A `- ` line opens a list and every following `- ` line joins it, which is the
 * rule `generate-conditions.ts` applies to the same strings. Anything else is a
 * paragraph.
 */
export function conditionBody(
	description: string,
	name: string,
	/**
	 * Set INTO the entry's first paragraph rather than beside it.
	 *
	 * The name was a floated span, which is how a run-in is usually faked — and
	 * a float reserves its box for as many LINES as it is tall, so at 1.12em it
	 * indented the second line of every entry and left the third flush. On a
	 * page this dense that reads as broken justification. Passing the lead in as
	 * a node makes it ordinary inline content of the paragraph it belongs to,
	 * which is what it always was.
	 */
	lead?: React.ReactNode,
): React.ReactNode[] {
	const lines = description
		.split(/<br\s*\/?>/)
		.map((line) => line.trim())
		.filter(Boolean)

	const blocks: React.ReactNode[] = []
	let bullets: string[] = []
	/**
	 * Thirteen conditions are a bare list of effects once their "You apply the
	 * following effects:" preamble comes off, so the entry has no first paragraph
	 * for the name to run into — and an earlier pass silently dropped the name on
	 * every one of them. The name goes into the first BULLET instead of onto a
	 * line of its own: a line each would cost about 5% of the half, which is the
	 * margin the page has left.
	 */
	let pending = lead

	const flush = () => {
		if (!bullets.length) return
		// The name still owes a line to run into, and this entry begins with its
		// effects. Promote the FIRST of them to that line rather than setting the
		// name inside a list item: a name indented to the bullet column is a name
		// off the column every other name lines up on, and a column that is not a
		// column is what made these hard to find.
		if (pending) {
			blocks.push(
				<p key={`${name}:lead`}>
					{pending}
					{inline(bullets[0], `${name}:lead`)}
				</p>,
			)
			pending = undefined
			bullets = bullets.slice(1)
			if (!bullets.length) return
		}
		blocks.push(
			<ul className="cr-condition__list" key={`${name}:ul${blocks.length}`}>
				{bullets.map((bullet, index) => (
					<li key={index}>{inline(bullet, `${name}:${index}`)}</li>
				))}
			</ul>,
		)
		bullets = []
	}

	for (const [index, line] of lines.entries()) {
		if (line.startsWith('- ')) {
			bullets.push(line.slice(2))
			continue
		}
		if (LIST_PREAMBLE.test(line) && lines[index + 1]?.startsWith('- ')) continue
		flush()
		const carried = pending
		pending = undefined
		blocks.push(
			<p key={`${name}:p${blocks.length}`}>
				{carried}
				{inline(line, `${name}:p`)}
			</p>,
		)
	}
	flush()
	return blocks
}
