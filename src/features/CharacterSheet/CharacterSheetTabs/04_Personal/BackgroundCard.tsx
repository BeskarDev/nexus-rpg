import React from 'react'
import { PickerCard } from './PickerCard'

interface BackgroundCardProps {
	background: string
	onChange: (value: string) => void
	onBlur: () => void
	onEditClick: () => void
	error?: string
}

export const BackgroundCard: React.FC<BackgroundCardProps> = ({
	background,
	...rest
}) => <PickerCard label="Background" sigil="background" value={background} {...rest} />
