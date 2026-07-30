import React from 'react'
import { SheetField, FieldText } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

interface NameCardProps {
	name: string
	onChange: (value: string) => void
	onBlur: () => void
	error?: string
}

export const NameCard: React.FC<NameCardProps> = ({
	name,
	onChange,
	onBlur,
	error,
}) => (
	<SheetField
		label="Name"
		sigil="name"
		tone={UI_COLORS.greyBlue}
		minWidth="10rem"
		maxWidth="15rem"
		frame
	>
		<FieldText value={name} onChange={onChange} onBlur={onBlur} error={!!error} />
	</SheetField>
)
