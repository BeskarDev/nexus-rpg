import { Box, Typography } from '@mui/material'
import React, { ReactNode } from 'react'
import StatSigil from '@site/src/components/codex/StatSigil'
import type {
	SheetSigilName,
	StatSigilName,
} from '@site/src/components/codex/stat-sigils'

export interface ListSectionHeaderProps {
	/** The group's name, e.g. "Worn", "Talent", "Crafting Professions". */
	label: string
	/**
	 * How many rows the group holds. Rendered as a bare numeral beside the label
	 * rather than in a badge — a count is a *reading*, and the sheet already
	 * renders readings as plain numerals.
	 */
	count?: number
	/** Optional mark, in the same gutter position a ledger row uses. */
	sigil?: StatSigilName | SheetSigilName
	/**
	 * An arbitrary node in the mark's slot, for groups whose identity is not a
	 * sigil — Quick Ref groups head their sections with the action-type icon the
	 * rows themselves carry, which is the thing being grouped by.
	 */
	icon?: ReactNode
	/** Trailing controls (add, reorder, settings) — kept out of the rule's run. */
	actions?: ReactNode
	/**
	 * A rules clarification for the whole group — a `RuleInfo` gloss mark.
	 *
	 * Its own slot, and deliberately BEFORE the actions rather than inside them.
	 * A gloss is not a control: it opens nothing and changes nothing, so it does
	 * not take the stamped plate its neighbours do, and putting it last left a
	 * quiet grey mark stranded at the end of a row of bronze plates. Reading
	 * order also matches what it does — explain, then act.
	 */
	info?: ReactNode
	/** Disclosure control, when the section collapses. */
	leading?: ReactNode
	className?: string
	sx?: object
}

/**
 * The one grouping header for every list on the sheet (M13 S2, F5).
 *
 * Five components each rolled their own — `CategorizedAbilities`,
 * `InventorySection`, `QuickRefSection`, `PartyManagement` and the Spells tab —
 * all of them a bold `SectionHeader` plus a hand-assembled row of icon buttons.
 * They differed in spacing, in whether the header was also a collapse trigger,
 * and in nothing that a reader benefits from.
 *
 * The treatment is the codex's **ruled heading**: a small-caps bronze label with
 * an engraved rule running from it to the far edge. The rule is what makes this
 * read as a section of a ledger rather than as a bolded paragraph — it draws the
 * eye across the group's full measure, and it costs no vertical space, which
 * matters because these headers repeat down a scrolling tab.
 *
 * The label register is the sheet's existing one (`CardHeader`,
 * `FieldGroupLabel`) one step up in size, so a card's label, an editor's group
 * label and a list's section label are visibly the same voice at three scales.
 */
export const ListSectionHeader: React.FC<ListSectionHeaderProps> = ({
	label,
	count,
	sigil,
	icon,
	actions,
	info,
	leading,
	className,
	sx,
}) => (
	<Box
		className={className}
		sx={{
			display: 'flex',
			alignItems: 'center',
			gap: 0.75,
			width: '100%',
			minHeight: '1.75rem',
			...sx,
		}}
	>
		{leading}
		{(sigil || icon) && (
			<Box
				aria-hidden="true"
				sx={{
					display: 'flex',
					alignItems: 'center',
					color: 'primary.main',
					'& svg': { fontSize: '1rem' },
				}}
			>
				{sigil ? <StatSigil name={sigil} size={14} /> : icon}
			</Box>
		)}
		{/* The label and its count are ONE typographic unit, so they share a
			baseline — they are two sizes of the same statement, and two sizes centred
			against each other sit on two different lines, which is what the first
			pass got wrong. The group as a whole then centres against the rule.

			`lineHeight: 1` on both is the other half: `alignItems: 'center'` centres
			each child's own BOX, and a text box at the inherited 1.5 line-height is
			half again taller than its glyphs — small caps sit on the baseline and
			have no descenders, so all that slack was below them and a rule centred on
			the tall box landed above the letters. */}
		<Box
			sx={{
				display: 'flex',
				alignItems: 'baseline',
				gap: 0.5,
				flexShrink: 0,
			}}
		>
			<Typography
				component="span"
				sx={{
					fontFamily: 'var(--nexus-font-ui)',
					fontWeight: 700,
					fontSize: 'var(--nexus-text-xs)',
					fontVariant: 'small-caps',
					letterSpacing: '0.08em',
					lineHeight: 1,
					color: 'primary.main',
					whiteSpace: 'nowrap',
				}}
			>
				{label}
			</Typography>
			{count !== undefined && (
				<Typography
					component="span"
					sx={{
						fontFamily: 'var(--nexus-font-ui)',
						fontSize: 'var(--nexus-text-2xs)',
						fontVariantNumeric: 'tabular-nums',
						color: 'text.secondary',
						lineHeight: 1,
					}}
				>
					{count}
				</Typography>
			)}
		</Box>
		{/* The rule. `flexGrow` rather than a fixed width so it always reaches the
			trailing controls, whatever the label's length — the group's measure is
			what it marks. */}
		<Box
			aria-hidden="true"
			sx={{
				flexGrow: 1,
				minWidth: '1rem',
				height: '1px',
				backgroundColor:
					'color-mix(in srgb, var(--nexus-bronze) 22%, transparent)',
			}}
		/>
		{info && (
			<Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
				{info}
			</Box>
		)}
		{/* One register for every control in a header, whatever it is made of.
			Before this the same row could hold a bordered box, a bare Material icon
			at one size and a drawn glyph at another — three weights for controls
			that are peers. The class does the levelling in CSS so a call site does
			not have to remember it; see `.cs-section-actions` in characterSheet.css. */}
		{actions && (
			<Box
				className="cs-section-actions"
				sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}
			>
				{actions}
			</Box>
		)}
	</Box>
)
