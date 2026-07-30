import React from 'react'
import { PickerCard } from './PickerCard'

interface FolkCardProps {
	folk: string
	onChange: (value: string) => void
	onBlur: () => void
	onEditClick: () => void
	error?: string
}

export const FolkCard: React.FC<FolkCardProps> = ({ folk, ...rest }) => (
	<PickerCard label="Folk" sigil="folk" value={folk} {...rest} />
)
