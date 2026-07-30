import React from 'react'
import { PickerCard } from './PickerCard'

interface UpbringingCardProps {
	upbringing: string
	onChange: (value: string) => void
	onBlur: () => void
	onEditClick: () => void
	error?: string
}

export const UpbringingCard: React.FC<UpbringingCardProps> = ({
	upbringing,
	...rest
}) => <PickerCard label="Upbringing" sigil="upbringing" value={upbringing} {...rest} />
