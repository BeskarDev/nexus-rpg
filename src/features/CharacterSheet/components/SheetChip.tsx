import React, { ReactNode } from 'react'
import { MarkButton } from './MarkButton'

export type SheetChipVariant = 'banner' | 'plate'

export interface SheetChipProps {
	/** The chip's label. */
	children: ReactNode
	/**
	 * Which carved silhouette (M13 S3).
	 *
	 * - `banner` — pointed at both ends, the doc set's `skill` shape. It means
	 *   **a named proficiency**: skills, crafting professions, languages.
	 * - `plate` — a hard square, the doc set's `attribute` shape. For a chip that
	 *   states a **value** rather than naming a proficiency.
	 */
	variant?: SheetChipVariant
	/**
	 * The identity hue, as a CSS colour or custom property — usually a
	 * `var(--cs-skill-*)` from `getSkillChipColor`.
	 *
	 * It becomes the chip's **ink**, never a fill. The keyline is derived from it
	 * (mixed toward bronze at hairline width), which is what lets sixteen skill
	 * identities coexist in one column without sixteen blocks of colour.
	 */
	tone?: string
	/**
	 * A value absorbed into the chip behind a struck divider, so a skill reads as
	 * `Athletics 3` — one chip, two pieces — rather than as a chip with a second
	 * label loose beside it.
	 */
	value?: ReactNode
	/** Removes the thing the chip names. Renders the `×` control when given. */
	onRemove?: () => void
	/** Accessible name for the remove control. Defaults to `Remove {label}`. */
	removeLabel?: string
	/**
	 * What the chip is sitting on. Only needed off the page background: the
	 * silhouette's outline is a filled shape with this colour inset on top of it,
	 * so a mismatch shows as a wrong-coloured chip interior.
	 */
	surface?: string
	className?: string
	title?: string
}

/**
 * The sheet's chip — a carved stamp, not a pill (M13 S3).
 *
 * ## Why this exists
 *
 * Every chip on the sheet was MUI's: a rounded pill with either a solid fill or
 * an outline, which is the single loudest remaining web-app tell on the list
 * tabs. Sixteen of them stacked down the Skills column, each a block of colour.
 *
 * The codex rule is that **identity lives in the ink, never in a colour mass**,
 * and the doc pages already implement it as four carved silhouettes. This is
 * that construction as a component, so the same skill reads as the same stamp on
 * a rules page and on the sheet. The geometry is shared on purpose; the
 * mechanics are not (see the note in `characterSheet.css` for why the `.chip`
 * classes could not simply be reused).
 *
 * ## Accessibility
 *
 * The label is real text, so the silhouette and the ink are both decorative — a
 * chip never carries meaning that its own words do not. `font-variant-caps`
 * renders small caps without touching the accessible name, unlike
 * `text-transform`, which is why the DOM text is the label as written.
 */
export const SheetChip: React.FC<SheetChipProps> = ({
	children,
	variant = 'banner',
	tone,
	value,
	onRemove,
	removeLabel,
	surface,
	className,
	title,
}) => (
	<span
		className={`cs-chip cs-chip--${variant}${className ? ` ${className}` : ''}`}
		title={title}
		style={
			{
				...(tone && { '--cs-chip-ink': tone }),
				...(surface && { '--cs-chip-surface': surface }),
			} as React.CSSProperties
		}
	>
		<span className="cs-chip__label">{children}</span>
		{value !== undefined && <span className="cs-chip__value">{value}</span>}
		{onRemove && (
			<MarkButton
				glyph="×"
				label={
					removeLabel ??
					`Remove ${typeof children === 'string' ? children : 'item'}`
				}
				onClick={onRemove}
			/>
		)}
	</span>
)
