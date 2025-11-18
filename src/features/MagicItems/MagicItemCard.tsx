import { Box, Divider, Typography } from '@mui/material'
import { PlayingCard } from '@site/src/components/PlayingCard'
import parse from 'html-react-parser'
import React from 'react'
import { MagicItem } from '@site/src/types/MagicItem'

const setFontSizeClass = (description: string) => {
	if (description.length <= 350) {
		return 'text-size--lg'
	} else if (description.length <= 550) {
		return 'text-size--md'
	} else if (description.length <= 800) {
		return 'text-size--sm'
	} else if (description.length <= 1100) {
		return 'text-size--xs'
	}
	return 'text-size--xxs'
}

export const MagicItemCard: React.FC<MagicItem> = ({
	name,
	category,
	quality,
	type,
	material,
	cost,
	load,
	properties,
	uses,
	description,
}) => {
	const fontSizeClass = setFontSizeClass(description || '')

	// Build the first caption line: Q# category (type), load, cost
	let firstCaption = `Q${quality} ${category.toLowerCase()}`
	if (material) {
		firstCaption += ` (${material.toLowerCase()} ${type.toLowerCase()})`
	} else {
		firstCaption += ` (${type.toLowerCase()})`
	}
	firstCaption += `, ${load}L, ${cost}C`

	// Build the second caption line if there are properties
	const secondCaptionParts: string[] = []
	if (properties) {
		secondCaptionParts.push(properties)
	}
	if (uses !== undefined) {
		secondCaptionParts.push(`${uses} use${uses !== 1 ? 's' : ''}`)
	}

	return (
		<PlayingCard>
			<Typography
				variant="body1"
				fontWeight="bold"
				sx={{ fontSize: '8pt', alignSelf: 'center', mb: '2px' }}
			>
				{name}
			</Typography>
			<Typography
				variant="caption"
				sx={{
					alignSelf: 'center',
					fontSize: '8px',
					lineHeight: 1.1,
					textAlign: 'center',
				}}
			>
				{firstCaption}
			</Typography>
			{secondCaptionParts.length > 0 && (
				<Typography
					variant="caption"
					sx={{
						alignSelf: 'center',
						mt: 0.25,
						fontSize: '8px',
						lineHeight: 1.1,
						textAlign: 'center',
					}}
				>
					{secondCaptionParts.join(', ')}
				</Typography>
			)}
			<Divider sx={{ mb: 0.5 }} />
			<Typography variant="body1" className={fontSizeClass}>
				{parse(description)}
			</Typography>
		</PlayingCard>
	)
}
