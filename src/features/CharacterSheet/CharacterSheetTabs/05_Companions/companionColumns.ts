/**
 * The companion ledger's column tracks (M13 S7).
 *
 * `Name | HP | Wear`. One shape: a companion carries a name, a hit-point pool, a wound
 * flag and a block of markdown, and the markdown is the details panel's whole content
 * rather than a column.
 *
 * The HP track is fixed and generous because it holds a POOL — `12/18` plus its meter —
 * where the Items ledger's numeric tracks hold single figures.
 */
const HP = '8rem'
/**
 * Wide enough for the HEADING, not for the pip (S7, owner review).
 *
 * It was `var(--nexus-target) + 8px` — sized to the control, which is the right instinct for
 * a track holding one pip and the wrong one here, because the column header has to fit too.
 * "Wound" in the small-caps heading register is wider than a 24px pip, so the heading was
 * clipped to "Wou…" while the pip it named had room to spare. Any track carrying a heading is
 * sized by whichever of the two is wider.
 */
const WEAR = '4rem'

export const COMPANION_TEMPLATE = `minmax(0, 1fr) ${HP} ${WEAR}`

export const COMPANION_HEADINGS: { label: string; align: 'left' | 'center' }[] =
	[
		{ label: 'Name', align: 'left' },
		{ label: 'Hit Points', align: 'left' },
		{ label: 'Wound', align: 'center' },
	]

/** The header repeats the row's tracks plus the chevron gutter the rows leave. */
export const companionHeaderTemplate = () => `${COMPANION_TEMPLATE} 10px`
