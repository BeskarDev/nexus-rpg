import { Avatar, Box, TextField } from '@mui/material'
import React from 'react'
import { Spell } from '@site/src/types/Character'
import { AttributeField } from '@site/src/features/CharacterSheet/CharacterSheet'
import { DamageFields } from '../../DamageFields'

export type SpellSummaryProps = {
	spell: Spell
	spellCost: number
	onCast: () => void
	onRankChange: (rank: number) => void
	onNameChange: (name: string) => void
	onNameBlur: () => void
	onPropertiesChange: (properties: string) => void
	onPropertiesBlur: () => void
	onDamageUpdate: (update: Partial<Spell['damage']>) => void
}

/**
 * SpellSummary - The collapsed summary view for a spell row.
 */
export const SpellSummary: React.FC<SpellSummaryProps> = ({
	spell,
	spellCost,
	onCast,
	onRankChange,
	onNameChange,
	onNameBlur,
	onPropertiesChange,
	onPropertiesBlur,
	onDamageUpdate,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'baseline',
				flexWrap: 'wrap',
				columnGap: 0.5,
			}}
		>
			<Avatar
				onClick={onCast}
				sx={{
					bgcolor: 'transparent',
					border: (theme) => `2px solid ${theme.palette.text.primary}`,
					color: (theme) => theme.palette.text.primary,
					height: 32,
					width: 32,
					fontSize: 14,
					fontWeight: 'bold',
					cursor: 'pointer',
					transition: 'opacity 200ms ease-in-out',
					'&:hover': {
						opacity: 0.7,
					},
					maxWidth: '4rem',
					flexGrow: 0,
					animation: 'focusShine 5s ease-in-out infinite',
					'@keyframes focusShine': {
						'0%, 90%, 100%': {
							boxShadow: 'none',
							transform: 'scale(1)',
						},
						'95%': {
							boxShadow: '0 0 8px 2px rgba(33, 150, 243, 0.6)',
							transform: 'scale(1.05)',
						},
					},
				}}
			>
				{spellCost}
			</Avatar>
			<AttributeField
				size="small"
				variant="standard"
				value={spell.rank}
				onChange={(event) => onRankChange(Number(event.target.value))}
				label="Rank"
				sx={{
					maxWidth: '1.5rem',
					flexGrow: 0,
					'& .MuiOutlinedInput-root': {
						'& .MuiOutlinedInput-notchedOutline': {
							borderWidth: '2px',
						},
					},
				}}
			/>
			<TextField
				size="small"
				variant="standard"
				value={spell.name}
				onChange={(event) => onNameChange(event.target.value)}
				onBlur={onNameBlur}
				label="Name"
				sx={{ maxWidth: '9rem', flexGrow: 1 }}
			/>

			<AttributeField
				disabled
				size="small"
				variant="standard"
				value={spell.target}
				label="Target"
				sx={{ maxWidth: '3rem', flexGrow: 0 }}
			/>
			<AttributeField
				disabled
				size="small"
				variant="standard"
				value={spell.range}
				label="Range"
				sx={{ maxWidth: '4rem', flexGrow: 0 }}
			/>
			{spell.dealsDamage ? (
				<DamageFields
					type="spell"
					damage={spell.damage}
					updateDamage={onDamageUpdate}
				/>
			) : (
				<TextField
					size="small"
					variant="standard"
					value={spell.properties}
					onChange={(event) => onPropertiesChange(event.target.value)}
					onBlur={onPropertiesBlur}
					label="Properties"
					sx={{ maxWidth: '10rem' }}
				/>
			)}
		</Box>
	)
}
