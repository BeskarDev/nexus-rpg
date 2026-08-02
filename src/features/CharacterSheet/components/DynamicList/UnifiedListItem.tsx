import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
} from '@mui/material'
import React, { useRef, useState, ReactNode } from 'react'
import StatSigil from '@site/src/components/codex/StatSigil'
import type {
	SheetSigilName,
	StatSigilName,
} from '@site/src/components/codex/stat-sigils'
import {
	CheckMarkChecked,
	CheckMarkEmpty,
} from '@site/src/components/codex/CheckMark'
import { Chevron } from '../Chevron'

/**
 * The engraved hairline that separates one ledger line from the next.
 *
 * Same value the Statistics plate uses between its registers
 * (`StatisticsTab.tsx`) and the character list uses between entries — one rule
 * weight across the sheet, so a list of rows and a plate of registers read as
 * the same carving.
 */
const LEDGER_RULE =
	'1px solid color-mix(in srgb, var(--nexus-bronze) 22%, transparent)'

export type UnifiedListItemProps = {
	/** Content displayed in the collapsed summary row */
	summaryContent: ReactNode
	/**
	 * Content revealed on expand.
	 *
	 * **Omit it for a non-expanding row** (F4): the row then renders as a plain
	 * ruled line with no disclosure control, no `aria-expanded` and no button
	 * semantics, rather than as an accordion that opens onto nothing. This is
	 * what lets `SkillRow` — which has never had a details panel — sit in the
	 * same ledger as every other list on the sheet.
	 */
	detailsContent?: ReactNode
	/**
	 * Optional mark for the row's left gutter.
	 *
	 * The gutter is rendered only when a mark is given. Reserving it
	 * unconditionally would cost ~20px of horizontal measure on every row of the
	 * densest lists to align against marks that are not there — and rows within
	 * one list always come from one consumer, so they are uniform either way.
	 */
	sigil?: StatSigilName | SheetSigilName
	/** Initial expanded state */
	defaultExpanded?: boolean
	/** Controlled expanded state */
	expanded?: boolean
	/** Callback when expand state changes */
	onExpandChange?: (expanded: boolean) => void
	/** Custom max width (defaults to filling the section) */
	maxWidth?: string
	/** Additional styling for the row container */
	sx?: object
	/** Additional styling for the summary row */
	summarySx?: object
	/**
	 * Class for the summary row, for layout a stylesheet owns rather than `sx` —
	 * the inventory ledger's column grid is switched on by a media query in
	 * `characterSheet.css`, so the breakpoint lives in one place instead of being
	 * duplicated into every consumer's `sx`.
	 */
	summaryClassName?: string
	/** Additional styling for the details content box */
	detailsSx?: object
	/**
	 * Whether this row is picked, for a list the reader chooses FROM rather than
	 * reads (M13 S8: the search dialogs' result lists).
	 *
	 * Passing `onSelectedChange` is what turns the row into a choice: it gains a
	 * `CheckMark` in its gutter, `role="option"` with `aria-selected`, and
	 * keyboard activation. Without it the row is a plain ledger line, unchanged.
	 *
	 * Only the non-expanding variant is selectable. A row cannot be both a
	 * disclosure and a choice — one activation gesture, two meanings, and the
	 * reader has no way to tell which one a click will get.
	 */
	selected?: boolean
	onSelectedChange?: (selected: boolean) => void
	/**
	 * The row's place in its container's roving focus (M13 S8b.2, F11.3).
	 *
	 * A list of 285 rows that are each `tabIndex: 0` is 285 tab stops between the
	 * search field and the Import button, which is what the search dialogs were.
	 * The WAI-ARIA listbox and accordion patterns both say the same thing: ONE stop
	 * for the whole list, arrows to move within it.
	 *
	 * The row cannot decide this — only the container knows which sibling is
	 * current — so it is a prop. Left undefined, both variants behave exactly as
	 * they did, which is correct for the tab ledgers where a list is a handful of
	 * rows rather than a corpus.
	 */
	rowTabIndex?: number
}

/**
 * A ledger line — the one row every list on the character sheet is made of
 * (M13 S2).
 *
 * ## What the theming is
 *
 * Rows are separated by an **engraved rule** rather than by gaps plus a
 * `Divider` inside the details panel, which is what this component did before
 * and which drew the line in the wrong place: below the *expanded content*, so
 * the separator moved whenever a row opened. The rule is now the row's own
 * bottom edge, so the column of lines holds still whatever is open.
 *
 * The row surface is transparent — it sits on whatever plate contains it — and
 * an expanded row takes a **bronze keyline** rather than MUI's paper elevation.
 * That is the sheet's existing "this one is active" device (`MuiTab`,
 * `CharacterSheetCard`'s focus ring), not a new one.
 *
 * ## Density
 *
 * Deliberately unchanged from the pre-theme row: same `minHeight`, same
 * padding, same wrap behaviour for the summary content. The milestone's
 * governing constraint is that the sheet is a mid-play tool, so atmosphere is
 * not allowed to buy vertical space.
 */
export const UnifiedListItem: React.FC<UnifiedListItemProps> = ({
	summaryContent,
	detailsContent,
	sigil,
	defaultExpanded = false,
	expanded: controlledExpanded,
	onExpandChange,
	/*
		Fills its section (M13 S11). It was capped at 47rem, which on a 1512px
		laptop stopped every ledger row ~300px short of the section header above
		it — two right edges where the sheet is meant to describe one.
	*/
	maxWidth = '100%',
	sx,
	summarySx,
	summaryClassName,
	detailsSx,
	selected = false,
	onSelectedChange,
	rowTabIndex,
}) => {
	const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)

	// Use controlled state if provided, otherwise use internal state
	const isExpanded =
		controlledExpanded !== undefined ? controlledExpanded : internalExpanded

	const handleChange = (_: React.SyntheticEvent, newExpanded: boolean) => {
		if (controlledExpanded === undefined) {
			setInternalExpanded(newExpanded)
		}
		onExpandChange?.(newExpanded)
	}

	const rowRef = useRef<HTMLDivElement | null>(null)

	/*
		Escape closes the open row (M13 S10).

		The sheet's other two open-and-close surfaces — dialogs and menus — both
		close on Escape, and a row that did not was the odd one out: a reader who
		had opened a panel to read one field had to find the summary again to shut
		it. It also matters for the keyboard path specifically, where the way back
		out was Shift+Tab past every control in the panel.

		Focus returns to the summary, or the panel's focus would land on `<body>`
		and the next Tab would restart at the top of the page.

		Menus and dialogs opened FROM inside a panel are portalled, so their Escape
		never reaches this handler — closing the menu does not also close the row.
	*/
	const handleEscape = (event: React.KeyboardEvent) => {
		if (event.key !== 'Escape' || !isExpanded) return
		event.stopPropagation()
		if (controlledExpanded === undefined) setInternalExpanded(false)
		onExpandChange?.(false)
		rowRef.current
			?.querySelector<HTMLElement>('.MuiAccordionSummary-root')
			?.focus()
	}

	const gutter = sigil ? (
		<Box
			aria-hidden="true"
			sx={{
				flexShrink: 0,
				display: 'flex',
				alignItems: 'center',
				color: 'primary.main',
			}}
		>
			<StatSigil name={sigil} size={14} />
		</Box>
	) : null

	/**
	 * A control inside the summary is NOT the row's disclosure (M13 S7, owner review).
	 *
	 * The summary line is a button — that is what makes the whole row a disclosure — so every
	 * click inside it bubbles up and toggles the row, including clicks on the controls the
	 * summary is supposed to carry: the wear pips on an item, a companion's HP trigger, an
	 * amount field. Ticking a pip also collapsed the row it belonged to.
	 *
	 * Every call site was solving this locally, or forgetting to: `CompanionWoundCheckbox` had
	 * a `stopPropagation` wrapper with a comment explaining that it was the only pip inside a
	 * clickable row, and it was not.
	 *
	 * So the rule lives here, once, for every list on the sheet: if the event started on
	 * something interactive, it belongs to that thing and not to the row. `closest()` rather
	 * than a target check, because the click usually lands on a glyph or a label INSIDE the
	 * control. Keyboard is guarded the same way — Enter and Space on an inner button would
	 * otherwise both press it and toggle the row.
	 */
	/* eslint-disable no-undef -- DOM globals; the lint env does not list them. */
	const stopIfControl = (
		event: React.MouseEvent | React.KeyboardEvent,
	): void => {
		const target = event.target
		if (!(target instanceof Element)) return
		const control = target.closest(
			'button, a, input, select, textarea, label, [role="button"], [role="checkbox"], [role="menuitem"], .MuiInputBase-root',
		)
		// The control has to be INSIDE the summary row. `AccordionSummary` is itself a
		// button, so a bare `closest()` matches it from any plain text in the row — which
		// made the row untoggleable, since every click looked like a control's. `contains`
		// on the row settles it: an ancestor button is the disclosure, a descendant one is
		// a control the summary carries.
		if (control && event.currentTarget.contains(control))
			event.stopPropagation()
	}
	/* eslint-enable no-undef */

	const summaryRow = (
		<Box
			className={summaryClassName}
			onClick={stopIfControl}
			onKeyDown={stopIfControl}
			sx={{
				width: '100%',
				minWidth: 0,
				display: 'flex',
				alignItems: 'center',
				flexWrap: 'wrap',
				columnGap: 1,
				// Only visible below the ledger breakpoint, where the row wraps onto two
				// or three lines and the cells' own line-height was the only thing keeping
				// them apart (M13 S4d).
				rowGap: 0.5,
				...summarySx,
			}}
		>
			{summaryContent}
		</Box>
	)

	// The non-expanding variant (F4). Same rule, same gutter, same measure — the
	// identical ledger line minus the disclosure, which is the point: a skill and
	// a weapon should sit in one column, not in two idioms.
	if (detailsContent === undefined) {
		const selectable = onSelectedChange !== undefined
		const toggle = () => onSelectedChange?.(!selected)

		return (
			<Box
				className={
					selectable
						? `cs-ledger-row cs-ledger-row--choice${selected ? ' is-selected' : ''}`
						: 'cs-ledger-row'
				}
				{...(selectable && {
					role: 'option',
					'aria-selected': selected,
					// The container's roving focus when it manages one; otherwise the
					// row is its own tab stop, which is right for a short tab ledger.
					tabIndex: rowTabIndex ?? 0,
					onClick: toggle,
					onKeyDown: (event: React.KeyboardEvent) => {
						if (event.key === 'Enter' || event.key === ' ') {
							event.preventDefault()
							toggle()
						}
					},
				})}
				sx={{
					flexGrow: 1,
					maxWidth,
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					gap: 1,
					minHeight: '52px',
					// No horizontal padding: a non-expanding row has no disclosure
					// control to clear, so it shares its section header's measure exactly
					// and the two right edges line up. The expanding variant keeps its
					// padding because `AccordionSummary` needs room for the chevron.
					px: 0,
					borderBottom: LEDGER_RULE,
					// A chosen row takes the SAME wash and keyline an expanded row takes.
					// Two states, one device: "this is the row you are working on" should
					// not look like two different ideas depending on which list it is in.
					...(selectable && {
						cursor: 'pointer',
						px: 0.5,
						'&:hover': {
							backgroundColor:
								'color-mix(in srgb, var(--nexus-bronze) 8%, transparent)',
						},
						'&:focus-visible': {
							outline: '1.5px solid var(--nexus-bronze)',
							outlineOffset: '-1.5px',
						},
						...(selected && {
							backgroundColor:
								'color-mix(in srgb, var(--nexus-bronze) 10%, transparent)',
							outline:
								'1.5px solid color-mix(in srgb, var(--nexus-bronze) 50%, transparent)',
							outlineOffset: '-1.5px',
						}),
					}),
					...sx,
				}}
			>
				{selectable && (
					<Box
						aria-hidden="true"
						sx={{
							flexShrink: 0,
							display: 'flex',
							alignItems: 'center',
							color: selected
								? 'var(--nexus-bronze)'
								: 'color-mix(in srgb, var(--nexus-bronze) 55%, var(--ifm-font-color-base))',
						}}
					>
						{selected ? <CheckMarkChecked /> : <CheckMarkEmpty />}
					</Box>
				)}
				{gutter}
				{summaryRow}
			</Box>
		)
	}

	return (
		<Accordion
			className="cs-ledger-row"
			ref={rowRef}
			onKeyDown={handleEscape}
			expanded={isExpanded}
			onChange={handleChange}
			disableGutters
			square
			elevation={0}
			slotProps={{ transition: { timeout: 120 } }}
			sx={{
				flexGrow: 1,
				maxWidth,
				mt: 0,
				backgroundColor: 'transparent',
				borderBottom: LEDGER_RULE,
				'&.Mui-expanded': {
					mt: 0,
					mb: 0,
					// The active state is a keyline, not a raised paper. `outline` with a
					// negative offset is this theme's sanctioned second edge (MuiDialog
					// does the same), so the row keeps its place in the column instead of
					// growing a border and nudging its neighbours.
					outline:
						'1.5px solid color-mix(in srgb, var(--nexus-bronze) 50%, transparent)',
					outlineOffset: '-1.5px',
					backgroundColor:
						'color-mix(in srgb, var(--nexus-bronze) 6%, transparent)',
				},
				...sx,
			}}
		>
			<AccordionSummary
				expandIcon={<Chevron />}
				{...(rowTabIndex !== undefined && { tabIndex: rowTabIndex })}
				sx={{
					gap: 1,
					pt: 0,
					px: 0.5,
					// One chevron position for every list on the sheet: trailing. It was
					// leading on Items/Weapons/Spells and trailing on Abilities, which is
					// the per-tab drift this slice exists to end — and the left edge is
					// where identity belongs (the gutter mark, then the name), not where
					// the mechanism belongs.
					'& .MuiAccordionSummary-content': {
						display: 'flex',
						alignItems: 'center',
						gap: 1,
						minWidth: 0,
					},
				}}
			>
				{gutter}
				{summaryRow}
			</AccordionSummary>
			<AccordionDetails>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
						columnGap: 1,
						...detailsSx,
					}}
				>
					{detailsContent}
				</Box>
			</AccordionDetails>
		</Accordion>
	)
}
