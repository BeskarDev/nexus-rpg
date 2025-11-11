import { Avatar, Box, Divider, Typography } from '@mui/material'
import { PlayingCard } from '@site/src/components/PlayingCard'
import parse from 'html-react-parser'
import React from 'react'

type SpellCardProps = {
	name: string
	focus: string
	rank: string
	category: string // discipline or tradition
	target: string
	range: string
	properties: string
	effect: string
	heightened?: string
}

const setFontSizeClass = (effect: string, heightened: string) => {
	const text = effect.concat(heightened)
	if (text.length <= 350) {
		return 'text-size--lg'
	} else if (text.length <= 550) {
		return 'text-size--md'
	} else if (text.length <= 800) {
		return 'text-size--sm'
	} else if (text.length <= 1100) {
		return 'text-size--xs'
	}
	return 'text-size--xxs'
}

export const SpellCard: React.FC<SpellCardProps> = ({
	name,
	focus,
	rank,
	category,
	target,
	range,
	properties,
	effect,
	heightened = '-',
}) => {
	return (
		<PlayingCard>
			<Box
				sx={{
					mb: '2px',
					mx: '-8px',
					display: 'flex',
					gap: 1,
					justifyContent: 'space-between',
				}}
			>
				<Avatar
					sx={{
						width: 26,
						height: 26,
						bgcolor: 'black',
						alignSelf: 'left',
						fontWeight: 'bold',
						lineHeight: 1.25,
						fontSize: '12pt',
					}}
				>
					{focus}
				</Avatar>
				<Typography
					variant="h6"
					fontWeight="bold"
					sx={{
						flexGrow: 1,
						alignSelf: 'center',
						whiteSpace: 'nowrap',
						textAlign: 'center',
					}}
				>
					{name}
				</Typography>
				<Box sx={{ width: '24px' }} />
			</Box>
			<Typography
				variant="caption"
				sx={{
					alignSelf: 'center',
					mx: '-8px',
					mt: '-4px',
					fontSize: '8px',
					lineHeight: 1.1,
				}}
			>
				R{rank} {category}, {target}, {range.toLowerCase()} range
			</Typography>
			{properties !== '-' && (
				<Typography
					variant="caption"
					sx={{
						alignSelf: 'center',
						mt: 0.25,
						mx: '-8px',
						fontSize: '8px',
						lineHeight: 1.1,
					}}
				>
					{properties}
				</Typography>
			)}
			<Divider sx={{ mb: 0.5 }} />
			<Typography
				variant="body1"
				className={setFontSizeClass(effect, heightened)}
			>
				{parse(effect.replace('<br/><br/>', '<br/>'))}
			</Typography>
			{heightened && heightened !== '-' && (
				<>
					<Divider sx={{ my: 0.5 }} />
					<Typography
						variant="body1"
						className={setFontSizeClass(effect, heightened)}
					>
						{parse(heightened)}
					</Typography>
				</>
			)}
		</PlayingCard>
	)
}
