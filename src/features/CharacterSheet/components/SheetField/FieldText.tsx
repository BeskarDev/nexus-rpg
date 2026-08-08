import { Box } from '@mui/material'
import React from 'react'
import { SheetInput } from './SheetInput'
import { useSheetFieldLabel } from './labelContext'

export interface FieldTextProps {
	value: string
	onChange: (value: string) => void
	/** Fires the dispatch. The sheet's convention is edit-locally, commit on blur. */
	onBlur?: () => void
	error?: boolean
	/** Defaults to `your {label}`, which is what every call site was building. */
	placeholder?: string
	multiline?: boolean
	/** Multiline text reads left; a single value centres under its label. */
	align?: 'center' | 'left'
	/**
	 * A trailing control — the picker button on Folk, Upbringing and Background,
	 * which opens a selection dialog beside the free-text field.
	 */
	action?: React.ReactNode
	/** Overrides the accessible name, which otherwise comes from the field's label. */
	'aria-label'?: string
}

/**
 * The always-editable value of a card-shaped data field — a `SheetInput` preset
 * sized to fill its card (M9 S11).
 *
 * Nine cards on the Personal tab were each hand-rolling this: a
 * `variant="standard"` field with the underline switched off through an `sx`
 * block, centred text, and a `your {label}` placeholder built from the label. The
 * blocks had drifted — three carried a redundant `fontSize: 'var(--nexus-text-sm)'` (13.6px
 * against a 13px theme base) and the padding differed three ways — without any of
 * those differences meaning anything.
 *
 * Always-editable is D1: fields on this sheet never have a separate read mode,
 * because a read-mode-plus-edit-affordance costs a tap mid-play. So this renders
 * the same in both states by design; the field IS the display.
 *
 * The accessible name comes from the enclosing `SheetField`'s label. These inputs
 * had none at all — `CardHeader` is a visual label, not an associated one — so
 * every one of them announced as an unlabelled text box.
 */
export const FieldText: React.FC<FieldTextProps> = ({
	value,
	onChange,
	onBlur,
	error,
	placeholder,
	multiline = false,
	align = multiline ? 'left' : 'center',
	action,
	'aria-label': ariaLabel,
}) => {
	const label = useSheetFieldLabel()

	const field = (
		<SheetInput
			value={value}
			onChange={(event) => onChange(event.target.value)}
			onBlur={onBlur}
			error={error}
			placeholder={
				placeholder ?? (label ? `your ${label.toLowerCase()}` : undefined)
			}
			multiline={multiline}
			minRows={multiline ? 2 : undefined}
			maxRows={multiline ? 4 : undefined}
			variant="standard"
			inputProps={{ 'aria-label': ariaLabel ?? label }}
			InputProps={{ disableUnderline: true }}
			sx={{
				// A card value fills its card, unlike the compact row/editor default.
				maxWidth: 'none',
				flex: 1,
				width: '100%',
				'& input, & textarea': { textAlign: align, px: 0.5 },
			}}
		/>
	)

	if (!action) return field

	return (
		<Box
			sx={{ display: 'flex', alignItems: 'center', gap: 0.5, width: '100%' }}
		>
			{field}
			{action}
		</Box>
	)
}
