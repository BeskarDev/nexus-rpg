import { Box, Typography } from '@mui/material'
import React from 'react'

// Helper function to determine font size for single card layout
const getSingleCardFontSize = (attacks: any[], abilities: any[]) => {
	// Calculate total content length for single card
	const attackContent = attacks
		.map((a) => `${a.name} ${a.damage} ${a.description || ''}`)
		.join(' ')
	const abilityContent = abilities
		.map((a) => `${a.name} ${a.description}`)
		.join(' ')
	const totalContent = attackContent + abilityContent

	// Small adjustment: be slightly more aggressive to push to 5.5pt when needed
	if (totalContent.length > 400) {
		return '5.5pt' // Use smallest size for content that might clip
	}
	return '6pt' // Keep existing size for most cases
}

interface CreatureActionsProps {
	attacks: any[]
	abilities: any[]
	notes: string[]
}

export const CreatureActions: React.FC<CreatureActionsProps> = ({
	attacks,
	abilities,
	notes,
}) => {
	// Get dynamic font size for single card layout
	const fontSize = getSingleCardFontSize(attacks, abilities)

	return (
		<>
			{/* Attacks */}
			{attacks.length > 0 && (
				<Box sx={{ mb: 0.3 }}>
					<Typography
						sx={{ fontSize: '6.5pt !important', fontWeight: 600, mb: 0.25 }}
					>
						Attacks
					</Typography>
					{attacks.map((attack, index) => (
						<Box key={index} sx={{ mb: 0.3 }}>
							<Typography
								sx={{
									fontSize: `${fontSize} !important`,
									mb: 0.1,
									lineHeight: 1.2,
								}}
							>
								<strong>{attack.name}</strong>
								{attack.properties.length > 0 && (
									<span style={{ fontStyle: 'italic' }}>
										{' '}
										({attack.properties.join(', ')})
									</span>
								)}
								: {attack.damage}
							</Typography>
							{attack.description && (
								<Typography
									sx={{
										fontSize: `${fontSize} !important`,
										mb: 0.1,
										lineHeight: 1.2,
										opacity: 0.9,
									}}
								>
									{attack.description}
								</Typography>
							)}
						</Box>
					))}
				</Box>
			)}

			{/* Special Abilities */}
			{abilities.length > 0 && (
				<Box sx={{ mb: 0.5 }}>
					<Typography
						sx={{ fontSize: '6.5pt !important', fontWeight: 600, mb: 0.25 }}
					>
						Special Abilities
					</Typography>
					{abilities.map((ability, index) => (
						<Typography
							key={index}
							sx={{
								fontSize: `${fontSize} !important`,
								mb: 0.2,
								lineHeight: 1.2,
							}}
						>
							<strong>{ability.name}</strong>: {ability.description}
						</Typography>
					))}
				</Box>
			)}

			{/* Additional Notes */}
			{notes.length > 0 && (
				<Box>
					{notes.map((note, index) => (
						<Typography
							key={index}
							sx={{
								fontSize: `${fontSize} !important`,
								mb: 0.2,
								lineHeight: 1.2,
							}}
						>
							{note}
						</Typography>
					))}
				</Box>
			)}
		</>
	)
}
