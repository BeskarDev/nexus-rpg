import React from 'react'

export type MarkButtonGlyph = '+' | '×'

export interface MarkButtonProps {
	/** Which pre-learned sign the control carries. */
	glyph: MarkButtonGlyph
	/** Accessible name. Always verbal — the glyph alone never says what it acts on. */
	label: string
	onClick: () => void
	className?: string
}

/**
 * A one-glyph control: add, or remove (M13 S3).
 *
 * ## Why a glyph and not a sigil
 *
 * `+` and `×` name **interactions**, and S1 established that the sign list has no
 * depiction for an interaction — every sigil depicts an object. That is why
 * `GlossMark` (`?`) and `Chevron` had to be drawn outside `sigil-paths.ts`, and
 * this takes the same exemption for the same reason. These two are the most
 * universally pre-learned signs in the set, which is what earns them the
 * exemption rather than merely needing it.
 *
 * ## Why not `IconButton` + `Add` / `Delete`
 *
 * MUI's are hairline Material drawings, and the `+` in particular repeats on
 * every section header of every list tab — enough instances that it sets the
 * tab's register on its own. This renders in the sheet's own ink at the sheet's
 * own weight, and the same control does add and remove, so a chip's `×` and a
 * row's `×` are one thing rather than a text glyph beside a Material trash can.
 *
 * The label is always verbal: `×` announced bare says nothing about what is being
 * removed.
 */
export const MarkButton: React.FC<MarkButtonProps> = ({
	glyph,
	label,
	onClick,
	className,
}) => (
	<button
		type="button"
		className={`cs-mark-button${className ? ` ${className}` : ''}`}
		aria-label={label}
		onClick={onClick}
	>
		{glyph}
	</button>
)
