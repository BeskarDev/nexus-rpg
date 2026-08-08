import React from 'react'
import { Box, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import StatSigil from '@site/src/components/codex/StatSigil'
import type {
	SheetSigilName,
	StatSigilName,
} from '@site/src/components/codex/stat-sigils'

/**
 * The meta band — a bounded line of facts ABOUT a thing, above the thing itself
 * (M13 S4d).
 *
 * Two of these existed as hand-built `Box` trees with their own `sx` fonts: the
 * Items tab's purse strip (coins, load, carry mod) and the mount/storage
 * sub-header (location name, load / capacity). They were the same idiom twice,
 * and the second one inherited a bug from the first before this existed — the
 * pieces inside did not share a line box, so a numeral inside a field sat lower
 * than the numeral beside it.
 *
 * ## Two ranks, one idiom
 *
 * `primary` is the tab's opening statement: 18px values, 16px sigils, a 7% wash,
 * a keyline, and a second keyline inset 4px. That inset edge is the rank marker
 * and belongs to nothing else, the same way the concentric frame belongs only to
 * `SpellCodexCard`.
 *
 * `sub` is the same band one rank down for a section: 15px values, 11px labels,
 * lighter wash and keyline, no inset edge, and capped at the ledger's measure so
 * a wide window cannot fling its right-hand group away from its left-hand one.
 *
 * ## What it does NOT do
 *
 * No separators between fields. A vertical rule there is the
 * bar-as-grouping-device the theme has rejected three times; the band's own frame
 * plus the gap is the grouping. Fields are `MetaBandField` children, and space is
 * the only thing between them.
 *
 * Styling lives in `characterSheet.css` under `.cs-meta-band`, not in `sx`: the
 * line-box normalisation has to reach inside MUI's input internals, which an `sx`
 * prop on the wrapper cannot do without a selector soup in every consumer.
 */
export interface MetaBandProps {
	children: React.ReactNode
	/** `primary` for a tab's own facts, `sub` for a section's. */
	variant?: 'primary' | 'sub'
	className?: string
	sx?: SxProps<Theme>
}

export const MetaBand: React.FC<MetaBandProps> = ({
	children,
	variant = 'primary',
	className,
	sx,
}) => (
	<Box
		className={[
			'cs-meta-band',
			variant === 'sub' ? 'cs-meta-band--sub' : '',
			className ?? '',
		]
			.filter(Boolean)
			.join(' ')}
		sx={sx}
	>
		{children}
	</Box>
)

export interface MetaBandFieldProps {
	children: React.ReactNode
	/**
	 * Keep the field on one line and refuse to shrink it.
	 *
	 * "Load 0 / 8" is one reading and must not break across lines, which it did as
	 * soon as a neighbouring name field claimed the row's slack.
	 */
	nowrap?: boolean
	sx?: SxProps<Theme>
}

/** One label-and-value group inside a band. */
export const MetaBandField: React.FC<MetaBandFieldProps> = ({
	children,
	nowrap,
	sx,
}) => (
	<Box
		sx={{
			display: 'flex',
			alignItems: 'center',
			gap: 0.5,
			...(nowrap && { flexWrap: 'nowrap', flexShrink: 0 }),
			...sx,
		}}
	>
		{children}
	</Box>
)

export interface MetaBandLabelProps {
	children: React.ReactNode
	/**
	 * The mark that names the fact — drawn at the band's rank, not per call site.
	 *
	 * Both name spaces: a band names stats (`load`, `coins`) and sheet chrome
	 * (`location-mount`), and `StatSigil` resolves the two through one table.
	 */
	sigil?: StatSigilName | SheetSigilName
}

/**
 * A field's name: small caps, bronze, with its mark inline.
 *
 * The sigil SIZE is the band's decision rather than the caller's, because a mark
 * a rung out of step with the value beside it was the tell that these two bands
 * were built by hand at different times (13px in one, 13px in the other, under
 * 18px and 15px values respectively).
 */
export const MetaBandLabel: React.FC<MetaBandLabelProps> = ({
	children,
	sigil,
}) => (
	<Typography component="span" className="cs-meta-band__label">
		{sigil && <StatSigil name={sigil} size="1.15em" />}
		{children}
	</Typography>
)

export interface MetaBandValueProps {
	children: React.ReactNode
	/** Danger / warning ink when the value itself is the warning (encumbrance). */
	tone?: string
}

/** A figure in the band: the rank's size, tabular, so it cannot shift its label. */
export const MetaBandValue: React.FC<MetaBandValueProps> = ({
	children,
	tone,
}) => (
	<Typography
		component="span"
		className="cs-meta-band__value"
		sx={tone ? { color: tone } : undefined}
	>
		{children}
	</Typography>
)

/**
 * A qualifier or separator riding beside a value ("max 22", the "/" in "0 / 8").
 *
 * Its own class rather than an `sx`, so it shares the band's line box — this is
 * the piece that was half a line low in both bands before they were unified.
 */
export const MetaBandNote: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => (
	<Typography component="span" className="cs-meta-band__note">
		{children}
	</Typography>
)

/**
 * Class names for the two kinds of INPUT a band holds, since a field is a MUI
 * component the band cannot wrap without losing its props.
 *
 * `value` is for figures (tabular, bold), `text` for prose (a mount's name) —
 * "Kesh's mule" set in figure weight reads as a total.
 */
export const metaBandInputClass = {
	value: 'cs-meta-band__value',
	text: 'cs-meta-band__text',
} as const

/**
 * A band field's slot styling: bare at rest, framed on hover and focus.
 *
 * The row-title judgement from S3 applied to a band — these values are read far
 * more often than they are edited, and a permanent box turns a statement into a
 * form. Both bands had this object copied verbatim, comments and all, which is
 * how the two drifted on everything around it.
 *
 * NOT `minHeight: auto`: dropping the slot's fill must not drop its hit area. The
 * first pass took these inputs to 23px, back under the interactive floor, which
 * is exactly the regression the floor exists to stop.
 *
 * `m: 0` because `MuiTextField`'s sitewide `margin: 'dense'` adds a top margin
 * meant for a field with a label stacked above it. On a band it dropped the input
 * half a line below the words either side, which read as a wrap.
 *
 * `minWidth: 0` on the field AND its `<input>`: an `<input>` has an intrinsic width
 * of about twenty characters, so a flex item containing one refuses to shrink below
 * that no matter what its container says. That is why the storage band wrapped onto
 * two lines while the mount band did not — same layout, a longer label and a longer
 * placeholder, and the field could not give the difference back (S4e, owner review).
 */
export const metaBandInputSx = {
	'& .MuiInputBase-root': {
		backgroundColor: 'transparent',
		borderColor: 'transparent',
	},
	'&:hover .MuiInputBase-root:not(.Mui-disabled)': {
		backgroundColor: 'color-mix(in srgb, var(--nexus-bronze) 7%, transparent)',
		borderColor: 'color-mix(in srgb, var(--nexus-bronze) 45%, transparent)',
	},
	'& input': { padding: '0 4px', minWidth: 0 },
	minWidth: 0,
	m: 0,
} as const
