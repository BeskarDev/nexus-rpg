import { Box, Divider, Typography } from '@mui/material'
import { PlayingCard } from '@site/src/components/PlayingCard'
import { Attack } from '@site/src/types/Creature'
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

interface CreatureAttackCardProps {
	creatureName: string
	attacks: Attack[]
}

export const CreatureAttackCard: React.FC<CreatureAttackCardProps> = ({
	creatureName,
	attacks,
}) => {
	const allContent = attacks
		.map(
			(attack) =>
				`${attack.name} ${attack.properties.join(', ')} ${attack.damage} ${attack.description || ''}`,
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
				ATTACKS
			</Typography>

			<Divider sx={{ mb: 0.5 }} />

			{attacks.map((attack, index) => (
				<Box key={index} sx={{ mb: index < attacks.length - 1 ? 1 : 0 }}>
					<Typography
						variant="body1"
						className={setFontSizeClass(allContent)}
						sx={{ fontWeight: 'bold', mb: 0.25 }}
					>
						{attack.name}
						{attack.properties.length > 0 && (
							<span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>
								{' '}
								({attack.properties.join(', ')})
							</span>
						)}
					</Typography>

					<Typography
						variant="body1"
						className={setFontSizeClass(allContent)}
						sx={{ mb: attack.description ? 0.25 : 0 }}
					>
						{attack.damage}
					</Typography>

					{attack.description && (
						<Typography
							variant="body1"
							className={setFontSizeClass(allContent)}
						>
							{attack.description}
						</Typography>
					)}

					{index < attacks.length - 1 && <Divider sx={{ mt: 0.5 }} />}
				</Box>
			))}
		</PlayingCard>
	)
}
