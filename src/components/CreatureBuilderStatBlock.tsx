import React from 'react'
import { Box, Typography, Paper, Divider } from '@mui/material'
import { BuiltCreature } from '../types/CreatureBuilder'

interface CreatureBuilderStatBlockProps {
	creature: BuiltCreature
}

export const CreatureBuilderStatBlock: React.FC<
	CreatureBuilderStatBlockProps
> = ({ creature }) => {
	return (
		<Paper sx={{ p: 2 }}>
			{/* Header */}
			<Typography variant="h5" gutterBottom>
				<strong>{creature.name}</strong> ({creature.size} {creature.type})
			</Typography>

			<Typography variant="body2" color="text.secondary" gutterBottom>
				<strong>Tier:</strong> {creature.tier} ({creature.category}) |{' '}
				<strong>Archetype:</strong> {creature.archetype}
			</Typography>

			<Divider sx={{ my: 2 }} />

			{/* Stats Table */}
			<Box sx={{ overflowX: 'auto' }}>
				<table
					style={{
						width: '100%',
						borderCollapse: 'collapse',
						fontSize: '0.875rem',
					}}
				>
					<thead>
						<tr style={{ borderBottom: '2px solid #ccc' }}>
							<th style={{ padding: '8px', textAlign: 'center' }}>HP</th>
							<th style={{ padding: '8px', textAlign: 'center' }}>AV</th>
							<th style={{ padding: '8px', textAlign: 'center' }}>STR</th>
							<th style={{ padding: '8px', textAlign: 'center' }}>AGI</th>
							<th style={{ padding: '8px', textAlign: 'center' }}>SPI</th>
							<th style={{ padding: '8px', textAlign: 'center' }}>MND</th>
							<th style={{ padding: '8px', textAlign: 'center' }}>Parry</th>
							<th style={{ padding: '8px', textAlign: 'center' }}>Dodge</th>
							<th style={{ padding: '8px', textAlign: 'center' }}>Resist</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style={{ padding: '8px', textAlign: 'center' }}>
								{creature.hp}
							</td>
							<td style={{ padding: '8px', textAlign: 'center' }}>
								{creature.av} (
								{creature.armorType === 'heavy' ? 'heavy' : 'light'})
							</td>
							<td style={{ padding: '8px', textAlign: 'center' }}>
								{creature.str}
							</td>
							<td style={{ padding: '8px', textAlign: 'center' }}>
								{creature.agi}
							</td>
							<td style={{ padding: '8px', textAlign: 'center' }}>
								{creature.spi}
							</td>
							<td style={{ padding: '8px', textAlign: 'center' }}>
								{creature.mnd}
							</td>
							<td style={{ padding: '8px', textAlign: 'center' }}>
								{creature.parry}
							</td>
							<td style={{ padding: '8px', textAlign: 'center' }}>
								{creature.dodge}
							</td>
							<td style={{ padding: '8px', textAlign: 'center' }}>
								{creature.resist}
							</td>
						</tr>
					</tbody>
				</table>
			</Box>

			<Divider sx={{ my: 2 }} />

			{/* Skills */}
			{creature.skills && creature.skills.length > 0 && (
				<Typography variant="body2" gutterBottom>
					<strong>Skills:</strong> {creature.skills.join(', ')}
				</Typography>
			)}

			{/* Immunities */}
			{creature.immunities && creature.immunities.length > 0 && (
				<Typography variant="body2" gutterBottom>
					<strong>Immunities:</strong> {creature.immunities.join(', ')}
				</Typography>
			)}

			{/* Resistances */}
			{creature.resistances && creature.resistances.length > 0 && (
				<Typography variant="body2" gutterBottom>
					<strong>Resistances:</strong> {creature.resistances.join(', ')}
				</Typography>
			)}

			{/* Weaknesses */}
			{creature.weaknesses && creature.weaknesses.length > 0 && (
				<Typography variant="body2" gutterBottom>
					<strong>Weaknesses:</strong> {creature.weaknesses.join(', ')}
				</Typography>
			)}

			{/* Attacks */}
			{creature.attacks && creature.attacks.length > 0 && (
				<>
					<Divider sx={{ my: 2 }} />
					<Typography variant="body2" gutterBottom>
						<strong>Attacks:</strong>
					</Typography>
					<Box component="ul" sx={{ mt: 1, pl: 2 }}>
						{creature.attacks.map((attack, idx) => (
							<li key={idx} style={{ marginBottom: '8px' }}>
								<Typography variant="body2" component="span">
									<strong>{attack.name}</strong>{' '}
									{attack.properties.length > 0 && (
										<em>({attack.properties.join(', ')})</em>
									)}
									. {attack.damage}{' '}
									{attack.damageType && attack.damageType !== 'physical'
										? `${attack.damageType} `
										: ''}
									damage.
									{attack.description && ` ${attack.description}`}
								</Typography>
							</li>
						))}
					</Box>
				</>
			)}

			{/* Abilities */}
			{creature.abilities && creature.abilities.length > 0 && (
				<>
					<Divider sx={{ my: 2 }} />
					<Typography variant="body2" gutterBottom>
						<strong>Abilities:</strong>
					</Typography>
					<Box component="ul" sx={{ mt: 1, pl: 2 }}>
						{creature.abilities.map((ability, idx) => (
							<li key={idx} style={{ marginBottom: '8px' }}>
								<Typography variant="body2" component="span">
									<strong>{ability.name}</strong>
									{ability.actionType && ` (${ability.actionType}`}
									{ability.properties &&
										(ability.actionType
											? `, ${ability.properties})`
											: ` (${ability.properties})`)}
									{ability.actionType && !ability.properties && ')'}.{' '}
									{ability.description}
								</Typography>
							</li>
						))}
					</Box>
				</>
			)}
		</Paper>
	)
}
