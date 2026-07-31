/**
 * Reads the Companion Builder's markdown back into fields (M13 S7, owner review).
 *
 * The builder emits a fixed shape (`utils/typescript/companion/companionFormatting.ts`):
 *
 * ```
 * #### **Name** (Medium Beast)
 *
 * **Tier:** 2 (Veteran)
 *
 * | HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
 * | --- | ... |
 * | 18 | 2 | d8 | d6 | d6 | d4 | 8 | 9 | 7 |
 *
 * **Diet:** …            **Attacks:**
 * **Skills:** …          - **Bite** 6/9/12 …
 * ```
 *
 * Parsing it is what lets a companion render as the codex's own stat block instead of as
 * raw markdown. It is deliberately TOLERANT: a player can paste anything into that field,
 * including a hand-written block or notes, so every step is optional and the function
 * returns `null` the moment the shape is not recognisable — the caller then falls back to
 * rendering the markdown as prose. A stat block that half-parses into a card with empty
 * numbers would be worse than the raw text.
 */

export type CompanionStatBlock = {
	name: string
	/** "Medium Beast" — size and type as written in the header. */
	type: string
	tier: number
	category: string
	hp: string
	av: string
	str: string
	agi: string
	spi: string
	mnd: string
	parry: string
	dodge: string
	resist: string
	/** `Diet`, `Skills`, `Movement`, `Immunities`, … in the order they appear. */
	traits: { label: string; value: string }[]
	/** `Attacks`, `Abilities`, … each holding its list items as raw markdown. */
	sections: { label: string; items: string[] }[]
}

/** The trait lines the builder emits, in the order a stat block should read them. */
const TRAIT_LABELS = [
	'Diet',
	'Skills',
	'Movement',
	'Immunities',
	'Resistances',
	'Weaknesses',
]

const cells = (row: string) =>
	row
		.split('|')
		.map((cell) => cell.trim())
		.filter((cell) => cell.length > 0)

export const parseCompanionMarkdown = (
	markdown: string,
): CompanionStatBlock | null => {
	if (!markdown?.trim()) return null

	// The header: any heading level, because the builder writes `####` and a player editing
	// by hand may well write `###`.
	const header = markdown.match(/^#{2,6}\s+\*\*(.+?)\*\*\s*\((.+?)\)\s*$/m)
	if (!header) return null

	const lines = markdown.split('\n')
	const statsHeader = lines.findIndex(
		(line) =>
			line.includes('|') &&
			/\bHP\b/.test(line) &&
			/\bAV\b/.test(line) &&
			/\bSTR\b/.test(line),
	)
	if (statsHeader === -1) return null

	// The first row after the header that is not the `| --- |` separator.
	const statsRow = lines
		.slice(statsHeader + 1)
		.find((line) => line.includes('|') && !line.includes('---'))
	if (!statsRow) return null

	const values = cells(statsRow)
	if (values.length < 9) return null

	const tier = markdown.match(/\*\*Tier:\*\*\s*(\d+)\s*(?:\(([^)]+)\))?/)

	/**
	 * A trait line is dropped when it says NOTHING (S7, owner review).
	 *
	 * The builder emits every label whether or not the companion has a value for it, so an
	 * unedited block renders `Diet: undefined` and three empty cartouches for immunities,
	 * resistances and weaknesses. `undefined` is the literal string — `generateMarkdown`
	 * interpolates a missing field straight into the output — which is worth naming here
	 * rather than treating as a typo, because it is what the stored data actually contains.
	 */
	const isEmpty = (value: string) =>
		['', '-', '—', 'none', 'undefined', 'null'].includes(
			value.trim().toLowerCase(),
		)

	const traits = TRAIT_LABELS.map((label) => {
		// `[ \t]*` and `[^\n]*?`, NOT `\s*(.*?)`: `\s` matches a newline, so a greedy `\s*`
		// after the label crossed the line break on an empty trait and captured the NEXT
		// line's text — `Immunities` came back holding `**Resistances:** —`. Horizontal
		// whitespace only, and the value cannot leave its own line.
		const match = markdown.match(
			new RegExp(`\\*\\*${label}:\\*\\*[ \t]*([^\n]*?)[ \t]*$`, 'm'),
		)
		if (!match || isEmpty(match[1])) return null
		return { label, value: match[1] }
	}).filter((trait): trait is { label: string; value: string } =>
		Boolean(trait),
	)

	// A section is a `**Label:**` line followed by a run of list items. Anything the builder
	// adds later is picked up without this needing to know its name.
	const sections: CompanionStatBlock['sections'] = []
	lines.forEach((line, index) => {
		const sectionHeader = line.match(/^\*\*(.+?):\*\*\s*$/)
		if (!sectionHeader) return
		const items: string[] = []
		for (let i = index + 1; i < lines.length; i++) {
			const item = lines[i].match(/^\s*[-*]\s+(.*)$/)
			if (item) items.push(item[1])
			else if (lines[i].trim() !== '') break
		}
		if (items.length > 0) sections.push({ label: sectionHeader[1], items })
	})

	return {
		name: header[1].trim(),
		type: header[2].trim(),
		tier: tier ? Number(tier[1]) : 1,
		category: tier?.[2]?.trim() || 'Companion',
		hp: values[0],
		av: values[1],
		str: values[2],
		agi: values[3],
		spi: values[4],
		mnd: values[5],
		parry: values[6],
		dodge: values[7],
		resist: values[8],
		traits,
		sections,
	}
}
