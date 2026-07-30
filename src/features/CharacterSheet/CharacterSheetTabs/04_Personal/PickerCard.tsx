import React from 'react'
import { IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { SheetField, FieldText } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import type { SheetSigilName } from '@site/src/components/codex/stat-sigils'

export interface PickerCardProps {
	label: string
	sigil: SheetSigilName
	value: string
	onChange: (value: string) => void
	onBlur: () => void
	/** Opens the selection dialog. The field stays free text either way. */
	onEditClick: () => void
	error?: string
}

/**
 * An identity card whose value can be typed OR chosen from a list — Folk,
 * Upbringing and Background (M9 S11).
 *
 * These were three files differing only in label, sigil and prop name. The
 * picker button stays a real control rather than becoming `SheetField`'s
 * `editor`: it opens a full selection dialog with descriptions and rules text,
 * not a small popover, and the text field beside it must stay directly editable.
 */
export const PickerCard: React.FC<PickerCardProps> = ({
	label,
	sigil,
	value,
	onChange,
	onBlur,
	onEditClick,
	error,
}) => (
	<SheetField label={label} sigil={sigil} tone={UI_COLORS.greyBlue} size="lg" frame>
		<FieldText
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			error={!!error}
			action={
				<IconButton
					size="small"
					onClick={onEditClick}
					sx={{ p: 0.25 }}
					title={`Select ${label.toLowerCase()} from list`}
					aria-label={`Select ${label.toLowerCase()} from list`}
				>
					<Edit sx={{ fontSize: '1rem' }} />
				</IconButton>
			}
		/>
	</SheetField>
)
