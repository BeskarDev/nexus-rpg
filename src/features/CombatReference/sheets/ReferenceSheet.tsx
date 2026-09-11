import React from 'react'

/**
 * One half of the A4 landscape sheet: **148.5 × 210mm, an exact A5 half**, two
 * to a page and ONE page in total (`SHEET_PAGE` / `SHEET_SECTION`, M17 D1).
 *
 * ## Why this page wears a plainer surround than the character sheet
 *
 * `SheetFrame` gives the character sheet a drawn register and a crest, and costs
 * it 6.4mm of inset on every side. The character sheet can afford that: it is
 * mostly blank boxes waiting for a pencil. This page is the opposite — it is the
 * rules, set solid, and every millimetre of the register is a line of text that
 * has to be cut or set smaller. Type size is the whole design constraint here
 * (owner: "without the text becoming too small"), so the surround is a hairline
 * keyline and a named header band, and the content keeps the rest.
 *
 * It still carries `pc-sheet`, which is what rebinds the codex's colour tokens to
 * ink and gives the page the printed type scale. The theme is in the type and
 * the carved heading bands, not in a border.
 */
export const ReferenceSheet: React.FC<{
	title: string
	/** Shown at the sheet's top right — "1 of 2", so a loose half knows itself. */
	mark: string
	/** Flow the blocks down two columns, balanced by the browser. */
	flow?: boolean
	/** One step down in type, for the half set solid in rules text. */
	dense?: boolean
	children: React.ReactNode
}> = ({ title, mark, flow, dense, children }) => (
	<section className={`pc-sheet cr-sheet${dense ? ' cr-sheet--dense' : ''}`}>
		<header className="cr-sheet__head">
			<h2 className="cr-sheet__title">{title}</h2>
			<span className="cr-sheet__mark">{mark}</span>
		</header>
		<div className={`cr-sheet__body${flow ? ' cr-sheet__body--flow' : ''}`}>
			{children}
		</div>
	</section>
)

/** A named block of the sheet, under the theme's carved heading band. */
export const Block: React.FC<{
	name: string
	children: React.ReactNode
}> = ({ name, children }) => (
	<section className="cr-block">
		<div className="pc-group__head cr-block__head">{name}</div>
		{children}
	</section>
)

/** A term and its shortest true statement, the sheet's commonest line. */
export const TermList: React.FC<{
	entries: { term: string; text: string }[]
}> = ({ entries }) => (
	<dl className="cr-terms">
		{entries.map(({ term, text }) => (
			<div className="cr-terms__row" key={term}>
				<dt>{term}</dt>
				<dd>{text}</dd>
			</div>
		))}
	</dl>
)

/** A sequence where the order is the rule. */
export const Steps: React.FC<{
	entries: { step: string; detail?: string }[]
}> = ({ entries }) => (
	<ol className="cr-steps">
		{entries.map(({ step, detail }) => (
			<li key={step}>
				<span className="cr-steps__step">{step}</span>
				{detail && <span className="cr-steps__detail"> {detail}</span>}
			</li>
		))}
	</ol>
)

/** Plain statements, one per line. */
export const Notes: React.FC<{ entries: string[] }> = ({ entries }) => (
	<ul className="cr-notes">
		{entries.map((entry) => (
			<li key={entry}>{entry}</li>
		))}
	</ul>
)
