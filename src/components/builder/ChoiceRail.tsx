import React from 'react'

export interface RailOption {
	/** The stored value. */
	value: string | number
	/** The big figure on the plate — a tier numeral, a size's initial. */
	figure: React.ReactNode
	/** The plate's name, in the small-caps register. */
	name: string
	/**
	 * The accessible name, when the plate's own words are not the whole of it.
	 *
	 * The quality rail shows `Q4` as its figure and `formidable` as its name, so
	 * neither alone identifies the option: a screen reader needs "Q4 (formidable)".
	 * Defaults to `name`.
	 */
	ariaLabel?: string
	/**
	 * An optional third line: what this option trades away.
	 *
	 * A node rather than a string, so the size rail can state its trade in the
	 * stats' own MARKS — the blades for parry, the footprints for dodge, the horse
	 * for movement — instead of the initials `P`/`D`/`M`, which had to be learned
	 * and matched nothing else in the app.
	 */
	trade?: React.ReactNode
	disabled?: boolean
	/** Why the plate is unavailable, for the pointer and the screen reader. */
	disabledReason?: string
}

export interface ChoiceRailProps {
	/** Accessible name for the group — the register's caption, verbatim. */
	label: string
	options: RailOption[]
	value: string | number | undefined
	onChange: (value: string | number) => void
	/**
	 * Which grid the plates sit in.
	 *
	 * `tier` and `size` are the Companion Builder's two, kept because their
	 * breakpoint behaviour differs (six plates fold to two rows on a narrow pane,
	 * five do not). `quality` is the Magic Item Builder's six-step ladder and shares
	 * the tier grid.
	 */
	variant: 'tier' | 'size' | 'quality'
}

/**
 * A ladder of choices as a rail of stamped plates (M13 S8).
 *
 * ## Why this is not a dropdown
 *
 * Tier and size were two MUI `Select`s. A dropdown is the right control for a
 * long list of interchangeable values, and these are neither: there are six tiers
 * and five sizes, they are **ordered**, and each step buys something stated in the
 * rulebook. A closed dropdown shows one value and hides both the range and the
 * consequence, so a player learned what tier 4 meant by choosing it and watching
 * the numbers move. A rail shows the whole ladder at rest, and the plate can carry
 * the trade it makes on its own face.
 *
 * It is also the honest shape for the rule that **tier caps size**: the sizes a
 * tier cannot reach are shown DISABLED rather than dropped from the list, so the
 * cap is visible as a cap instead of appearing to be a shorter list.
 *
 * ## Construction
 *
 * The tab bar's active idiom: a bronze keyline plus an inlaid lozenge, with the
 * lozenge's space reserved on every plate so nothing shifts when the selection
 * moves. `radiogroup` semantics, because that is what this is — one of N, always
 * one chosen.
 */
export const ChoiceRail: React.FC<ChoiceRailProps> = ({
	label,
	options,
	value,
	onChange,
	variant,
}) => (
	<div
		className={`cb-rail cb-rail--${variant}`}
		role="radiogroup"
		aria-label={label}
	>
		{options.map((option) => {
			const selected = option.value === value
			return (
				<button
					key={option.value}
					type="button"
					role="radio"
					aria-checked={selected}
					aria-label={
						option.disabled && option.disabledReason
							? `${option.ariaLabel ?? option.name} — ${option.disabledReason}`
							: (option.ariaLabel ?? option.name)
					}
					disabled={option.disabled}
					title={option.disabled ? option.disabledReason : undefined}
					className={`cb-plate${selected ? ' cb-plate--on' : ''}`}
					onClick={() => onChange(option.value)}
				>
					<span className="cb-plate__figure">{option.figure}</span>
					<span className="cb-plate__name">{option.name}</span>
					{option.trade && (
						<span className="cb-plate__trade">{option.trade}</span>
					)}
					<span className="cb-plate__mark" aria-hidden="true" />
				</button>
			)
		})}
	</div>
)
