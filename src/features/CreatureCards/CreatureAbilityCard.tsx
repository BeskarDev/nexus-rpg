import { Box, Divider, Typography } from '@mui/material'
import { PlayingCard } from '@site/src/components/PlayingCard'
import { Ability } from '@site/src/types/Creature'
import React from 'react'

const setFontSizeClass = (content: string) => {
	if (content.length <= 300) {
		return 'text-size--lg'
	} else if (content.length <= 500) {
		return 'text-size--md'
	} else if (content.length <= 700) {
		return 'text-size--sm'
	} else if (content.length <= 900) {
		return 'text-size--xs'
	}
	return 'text-size--xxs'
}

interface CreatureAbilityCardProps {
	creatureName: string
	abilities: Ability[]
}

export const CreatureAbilityCard: React.FC<CreatureAbilityCardProps> = ({
	creatureName,
	abilities,
}) => {
	const allContent = abilities
		.map(
			(ability) =>
				`${ability.name} ${ability.description} ${ability.recharge || ''}`,
		)
		.join(' ')

	return (
		<PlayingCard>
			<Typography
				variant="h6"
				fontWeight="bold"
				sx={{
					textAlign: 'center',
					mb: 1,
					overflow: 'hidden',
					textOverflow: 'ellipsis',
				}}
			>
				{creatureName}
			</Typography>

			<Typography
				variant="body1"
				sx={{
					textAlign: 'center',
					fontSize: '8px',
					lineHeight: 1.1,
					mb: 1,
				}}
			>
				ABILITIES
			</Typography>

			<Divider sx={{ mb: 0.5 }} />

			{abilities.map((ability, index) => (
				<Box key={index} sx={{ mb: index < abilities.length - 1 ? 1 : 0 }}>
					<Typography
						variant="body1"
						className={setFontSizeClass(allContent)}
						sx={{ fontWeight: 'bold', mb: 0.25 }}
					>
						{ability.name}
						{ability.recharge && (
							<span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>
								{' '}
								({ability.recharge})
							</span>
						)}
					</Typography>

					<Typography variant="body1" className={setFontSizeClass(allContent)}>
						{ability.description}
					</Typography>

					{index < abilities.length - 1 && <Divider sx={{ mt: 0.5 }} />}
				</Box>
			))}
		</PlayingCard>
	)
}
