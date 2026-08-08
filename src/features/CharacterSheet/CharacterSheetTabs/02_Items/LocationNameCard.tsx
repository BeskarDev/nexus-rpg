import React from 'react'
import { SheetField, FieldText } from '../../components'
import { useFieldDraft } from '../../hooks/useFieldDraft'
import { UI_COLORS } from '../../../../utils/colors'
import { ItemLocation } from '../../../../types/ItemLocation'

export type LocationNameCardProps = {
	location: ItemLocation
	name: string
	onNameChange: (name: string) => void
}

export const LocationNameCard: React.FC<LocationNameCardProps> = ({
	location,
	name,
	onNameChange,
}) => {
	const draft = useFieldDraft(name, onNameChange)
	const isMount = location === 'mount'

	return (
		<SheetField
			label={isMount ? 'Mount' : 'Storage'}
			sigil={isMount ? 'location-mount' : 'location-storage'}
			tone={UI_COLORS.greyBlue}
			minWidth="6rem"
			maxWidth="8rem"
		>
			<FieldText
				{...draft}
				placeholder={isMount ? 'Mount name' : 'Storage location'}
			/>
		</SheetField>
	)
}
