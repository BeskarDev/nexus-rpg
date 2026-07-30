import React from 'react'
import { SheetField, FieldText } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

interface MotivationCardProps {
	motivation: string
	onChange: (value: string) => void
	onBlur: () => void
	error?: string
}

export const MotivationCard: React.FC<MotivationCardProps> = ({
	motivation,
	onChange,
	onBlur,
	error,
}) => (
	<SheetField label="Motivation" sigil="motivation" tone={UI_COLORS.greyBlue} size="lg" frame>
		<FieldText
			value={motivation}
			onChange={onChange}
			onBlur={onBlur}
			error={!!error}
		/>
	</SheetField>
)
