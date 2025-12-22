import {
	Box,
	Checkbox,
	FormControlLabel,
	MenuItem,
	TextField,
} from '@mui/material'
import React from 'react'
import {
	RangeType,
	rangeTypeArray,
	Spell,
	TargetType,
	targetTypeArray,
} from '@site/src/types/Character'
import { AttributeField } from '@site/src/features/CharacterSheet/CharacterSheet'
import {
	QuickRefButton,
	DeleteButton,
} from '@site/src/features/CharacterSheet/components'

export type SpellDetailsProps = {
	spell: Spell
	onPropertiesChange: (properties: string) => void
	onPropertiesBlur: () => void
	onEffectChange: (effect: string) => void
	onEffectBlur: () => void
	onDealsDamageChange: (dealsDamage: boolean) => void
	onTargetChange: (target: TargetType) => void
	onRangeChange: (range: RangeType) => void
	onDelete: () => void
	isInQuickRef?: boolean
	onToggleQuickRef?: (spellId: string) => void
}

/**
 * SpellDetails - The expanded details view for a spell row.
 */
export const SpellDetails: React.FC<SpellDetailsProps> = ({
	spell,
	onPropertiesChange,
	onPropertiesBlur,
	onEffectChange,
	onEffectBlur,
	onDealsDamageChange,
	onTargetChange,
	onRangeChange,
	onDelete,
	isInQuickRef = false,
	onToggleQuickRef,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'baseline',
				flexWrap: 'wrap',
				columnGap: 1,
				width: '100%',
			}}
		>
			{spell.dealsDamage && (
				<TextField
					size="small"
					variant="standard"
					value={spell.properties}
					fullWidth
					onChange={(event) => onPropertiesChange(event.target.value)}
					onBlur={onPropertiesBlur}
					label="Properties"
				/>
			)}
			<TextField
				size="small"
				multiline
				minRows={1}
				maxRows={10}
				value={spell.effect}
				onChange={(event) => onEffectChange(event.target.value)}
				onBlur={onEffectBlur}
				label="Effect"
				sx={{ maxWidth: '40rem' }}
			/>
			<Box sx={{ width: '100%', flexGrow: 1 }} />
			<FormControlLabel
				control={
					<Checkbox
						checked={spell.dealsDamage}
						onChange={() => onDealsDamageChange(!spell.dealsDamage)}
					/>
				}
				label="show damage"
				sx={{
					'& .MuiFormControlLabel-label': {
						fontSize: '10px',
					},
				}}
			/>
			<AttributeField
				select
				size="small"
				value={spell.target}
				onChange={(event) => onTargetChange(event.target.value as TargetType)}
				label="Target"
				sx={{ maxWidth: '6rem', flexGrow: 0 }}
			>
				{targetTypeArray.map((target) => (
					<MenuItem key={target} value={target}>
						{target}
					</MenuItem>
				))}
			</AttributeField>
			<AttributeField
				select
				size="small"
				value={spell.range}
				onChange={(event) => onRangeChange(event.target.value as RangeType)}
				label="Range"
				sx={{ maxWidth: '7rem', flexGrow: 0 }}
			>
				{rangeTypeArray.map((range) => (
					<MenuItem key={range} value={range}>
						{range}
					</MenuItem>
				))}
			</AttributeField>
			<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', my: 'auto' }}>
				{onToggleQuickRef && (
					<QuickRefButton
						itemId={spell.id}
						isInQuickRef={isInQuickRef}
						onToggle={onToggleQuickRef}
					/>
				)}
				<DeleteButton onDelete={onDelete} />
			</Box>
		</Box>
	)
}
