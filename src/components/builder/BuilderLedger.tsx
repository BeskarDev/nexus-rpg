import React from 'react'
import SigilIcon, { type SigilName } from '../codex/SigilIcon'

export interface SearchFieldProps {
	value: string
	onChange: (value: string) => void
	placeholder: string
	/** Accessible name. Defaults to the placeholder. */
	label?: string
}

/**
 * A carved search field.
 *
 * It was a MUI `TextField`, and restyling that meant fighting the notched-outline
 * machinery — a `<fieldset>` with a legend gap, a hairline in Material's grey, a
 * 40px box the type sat lost inside. It was the one place a Material component
 * still showed through the dialog.
 *
 * A bare `<input>` in a keylined plate instead. The mark is `eye` — to search is to
 * look — and it sits INSIDE the keyline as an engraved fixture rather than as an
 * icon button, because pressing it does nothing.
 */
export const SearchField: React.FC<SearchFieldProps> = ({
	value,
	onChange,
	placeholder,
	label,
}) => (
	<div className="cb-search">
		<SigilIcon name="eye" size={13} className="cb-search__mark" />
		<input
			type="text"
			className="cb-search__input"
			value={value}
			onChange={(event) => onChange(event.target.value)}
			placeholder={placeholder}
			aria-label={label ?? placeholder}
		/>
		{value && (
			<button
				type="button"
				className="cb-search__clear"
				aria-label="Clear search"
				onClick={() => onChange('')}
			>
				×
			</button>
		)}
	</div>
)

export interface FilterChipProps {
	children: React.ReactNode
	pressed: boolean
	onClick: () => void
	sigil?: SigilName
}

/**
 * A filter, as a carved chip.
 *
 * Identity is the MARK and the word, never a fill — the eight hardcoded hexes this
 * pattern replaced (a coloured dot per creature type, a Material palette entry per
 * weapon category) were the same fault S8 deleted from the search dialogs.
 */
export const FilterChip: React.FC<FilterChipProps> = ({
	children,
	pressed,
	onClick,
	sigil,
}) => (
	<button
		type="button"
		className="cb-chip"
		aria-pressed={pressed}
		onClick={onClick}
	>
		{sigil && <SigilIcon name={sigil} size={11} />}
		{children}
	</button>
)

export interface LedgerProps {
	/** Accessible name for the list. */
	label: string
	/**
	 * The grid template its rows share, as a CSS track list. Fed to the rows through
	 * `--cb-row-cols` so one rule in the stylesheet serves every list.
	 */
	columns?: string
	/** Column names, in the same tracks. Omit for a list that needs no header. */
	headings?: { label: string; align?: 'left' | 'right' | 'center' }[]
	children: React.ReactNode
}

export const Ledger: React.FC<LedgerProps> = ({
	label,
	columns,
	headings,
	children,
}) => (
	<div
		className="cb-ledger__rows"
		role="listbox"
		aria-label={label}
		style={
			columns
				? ({ '--cb-row-cols': columns } as React.CSSProperties)
				: undefined
		}
	>
		{headings && (
			<div className="cb-ledger__head" aria-hidden="true">
				{headings.map((heading, index) => (
					<span key={index} style={{ textAlign: heading.align ?? 'left' }}>
						{heading.label}
					</span>
				))}
			</div>
		)}
		{children}
	</div>
)

export interface LedgerRowProps {
	selected: boolean
	onSelect: () => void
	/** The row's mark, in the gutter. */
	sigil?: SigilName
	/** One cell per track after the mark. */
	children: React.ReactNode
	/** Why this row cannot be chosen. Shown, not hidden — a rule you can see. */
	disabledReason?: string
}

export const LedgerRow: React.FC<LedgerRowProps> = ({
	selected,
	onSelect,
	sigil,
	children,
	disabledReason,
}) => (
	<button
		type="button"
		role="option"
		aria-selected={selected}
		disabled={Boolean(disabledReason)}
		title={disabledReason}
		className={`cb-row${selected ? ' cb-row--on' : ''}`}
		onClick={onSelect}
	>
		<span className="cb-row__mark" aria-hidden="true">
			{sigil && <SigilIcon name={sigil} size={13} />}
		</span>
		{children}
	</button>
)

export interface LedgerEmptyProps {
	/** Which constraint emptied the list, in the reader's terms. */
	children: React.ReactNode
	/** The control that lifts it. */
	onClear?: () => void
	clearLabel?: string
}

/**
 * Nothing matched. Names WHICH constraint emptied the list and carries the control
 * that lifts it — the S8 empty-state rule.
 */
export const LedgerEmpty: React.FC<LedgerEmptyProps> = ({
	children,
	onClear,
	clearLabel = 'Clear filters',
}) => (
	<p className="cb-empty">
		{children}
		{onClear && (
			<button type="button" className="cb-chip" onClick={onClear}>
				{clearLabel}
			</button>
		)}
	</p>
)
