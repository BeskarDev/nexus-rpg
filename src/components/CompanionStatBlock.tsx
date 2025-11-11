import React from 'react'
import { Box, Typography, Paper, Grid } from '@mui/material'
import { CompanionStats } from '../types/companion'
import { TIER_NAMES } from '../utils/companionCalculations'

interface CompanionStatBlockProps {
	companion: CompanionStats
}

export const CompanionStatBlock: React.FC<CompanionStatBlockProps> = ({
	companion,
}) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
			<Typography variant="h6" gutterBottom>
				{companion.trait.name} ({companion.size} {companion.trait.type})
			</Typography>
			<Typography variant="body2" color="text.secondary" gutterBottom>
				Tier {companion.tier} ({TIER_NAMES[companion.tier]})
			</Typography>

			{/* Main Stats Row */}
			<Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
				<Grid container spacing={1}>
					<Grid item xs={6} sm={4}>
						<Typography variant="caption" color="text.secondary">
							HP
						</Typography>
						<Typography variant="body2">
							{companion.calculatedStats.hp}
						</Typography>
					</Grid>
					<Grid item xs={6} sm={4}>
						<Typography variant="caption" color="text.secondary">
							AV
						</Typography>
						<Typography variant="body2">
							{companion.calculatedStats.av}
						</Typography>
					</Grid>
					<Grid item xs={6} sm={4}>
						<Typography variant="caption" color="text.secondary">
							Movement
						</Typography>
						<Typography variant="body2">
							{companion.calculatedStats.movement}
						</Typography>
					</Grid>
				</Grid>
			</Paper>

			{/* Attributes and Defenses Row */}
			<Grid container spacing={1}>
				<Grid item xs={12} md={6}>
					<Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 }, h: '100%' }}>
						<Typography variant="subtitle1" gutterBottom>
							Attributes
						</Typography>
						<Grid container spacing={1}>
							{Object.entries(companion.calculatedStats.attributes).map(
								([attr, value]) => (
									<Grid item xs={6} key={attr}>
										<Typography variant="caption" color="text.secondary">
											{attr.toUpperCase()}
										</Typography>
										<Typography variant="body2" fontWeight="bold">
											{String(value)}
										</Typography>
									</Grid>
								),
							)}
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 }, h: '100%' }}>
						<Typography variant="subtitle1" gutterBottom>
							Defenses
						</Typography>
						<Grid container spacing={1}>
							<Grid item xs={4}>
								<Typography variant="caption" color="text.secondary">
									Parry
								</Typography>
								<Typography variant="body2" fontWeight="bold">
									{companion.calculatedStats.defenses.parry}
								</Typography>
							</Grid>
							<Grid item xs={4}>
								<Typography variant="caption" color="text.secondary">
									Dodge
								</Typography>
								<Typography variant="body2" fontWeight="bold">
									{companion.calculatedStats.defenses.dodge}
								</Typography>
							</Grid>
							<Grid item xs={4}>
								<Typography variant="caption" color="text.secondary">
									Resist
								</Typography>
								<Typography variant="body2" fontWeight="bold">
									{companion.calculatedStats.defenses.resist}
								</Typography>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>

			{/* Skills */}
			<Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
				<Typography variant="subtitle1" gutterBottom>
					Skills
				</Typography>
				<Typography variant="body2">
					{companion.calculatedStats.skills}
				</Typography>
			</Paper>

			{/* Attacks */}
			{companion.calculatedStats.attacks.length > 0 && (
				<Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
					<Typography variant="subtitle1" gutterBottom>
						Attacks
					</Typography>
					{companion.calculatedStats.attacks.map((attack, index) => (
						<Typography
							key={index}
							variant="body2"
							sx={{ mb: 1 }}
							dangerouslySetInnerHTML={{ __html: attack }}
						/>
					))}
				</Paper>
			)}

			{/* Abilities */}
			{companion.calculatedStats.abilities.length > 0 && (
				<Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
					<Typography variant="subtitle1" gutterBottom>
						Abilities
					</Typography>
					{companion.calculatedStats.abilities.map((ability, index) => (
						<Typography
							key={index}
							variant="body2"
							sx={{ mb: 1 }}
							dangerouslySetInnerHTML={{ __html: ability }}
						/>
					))}
				</Paper>
			)}

			{/* Resistances/Immunities/Weaknesses */}
			<Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
				<Grid container spacing={1}>
					<Grid item xs={12} md={4}>
						<Typography variant="caption" color="text.secondary" gutterBottom>
							Immunities
						</Typography>
						<Typography variant="body2">
							{companion.calculatedStats.immunities}
						</Typography>
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography variant="caption" color="text.secondary" gutterBottom>
							Resistances
						</Typography>
						<Typography variant="body2">
							{companion.calculatedStats.resistances}
						</Typography>
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography variant="caption" color="text.secondary" gutterBottom>
							Weaknesses
						</Typography>
						<Typography variant="body2">
							{companion.calculatedStats.weaknesses}
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	)
}
