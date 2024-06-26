import { Divider, Typography } from '@mui/material'
import { PlayingCard } from '@site/src/components/PlayingCard'
import parse from 'html-react-parser'
import React from 'react'
import { CombatArt } from 'src/types/CombatArt'

const setFontSizeClass = (text: string) => {
	if (text.length <= 400) {
		return 'text-size--lg'
	} else if (text.length <= 500) {
		return 'text-size--md'
	}
	return 'text-size--sm'
}

export const CombatArtCard: React.FC<CombatArt> = ({
	name,
	weapons,
	effect,
}) => {
	return (
		<PlayingCard>
			<Typography
				variant="h5"
				fontWeight="bold"
				sx={{ alignSelf: 'center', mb: '2px' }}
			>
				{name}
			</Typography>
			<Typography variant="caption" sx={{ alignSelf: 'center' }}>
				{weapons}
			</Typography>
			<Divider sx={{ mb: 1 }} />
			<Typography variant="body1" className={setFontSizeClass(effect)}>
				{parse(effect)}
			</Typography>
		</PlayingCard>
	)
}
