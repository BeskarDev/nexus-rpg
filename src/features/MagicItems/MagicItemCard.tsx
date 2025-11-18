import { Box, Divider, Typography } from '@mui/material'
import { PlayingCard } from '@site/src/components/PlayingCard'
import parse from 'html-react-parser'
import React from 'react'
import { MagicItem } from '@site/src/types/MagicItem'

const setFontSizeClass = (
	description: string,
	enchantment: string,
	effect: string,
	note: string,
) => {
	const text = description + enchantment + effect + note
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

export const MagicItemCard: React.FC<MagicItem> = ({
	name,
	category,
	quality,
	type,
	material,
	cost,
	load,
	properties,
	weaponDamage,
	durability,
	equipmentSlot,
	uses,
	craftingTime,
	spellEffect,
	description,
	enchantment,
	effect,
	note,
}) => {
	const fontSizeClass = setFontSizeClass(
		description || '',
		enchantment || '',
		effect || '',
		note || '',
	)

	return (
		<PlayingCard>
			<Typography
				variant="h5"
				fontWeight="bold"
				sx={{ alignSelf: 'center', mb: '2px' }}
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
				{category}
			</Typography>
			<Divider sx={{ mb: 0.5 }} />

			{/* Core item properties */}
			<Box sx={{ mb: 0.5 }}>
				<Typography variant="body2" sx={{ fontSize: '7pt' }}>
					<strong>Quality:</strong> {quality}
				</Typography>
				<Typography variant="body2" sx={{ fontSize: '7pt' }}>
					<strong>Type:</strong> {type}
				</Typography>
				{material && (
					<Typography variant="body2" sx={{ fontSize: '7pt' }}>
						<strong>Material:</strong> {material}
					</Typography>
				)}
				<Typography variant="body2" sx={{ fontSize: '7pt' }}>
					<strong>Cost:</strong> {cost}
				</Typography>
				<Typography variant="body2" sx={{ fontSize: '7pt' }}>
					<strong>Load:</strong> {load}
				</Typography>
			</Box>

			{/* Category-specific properties */}
			{properties && (
				<Typography variant="body2" sx={{ fontSize: '7pt', mb: 0.5 }}>
					<strong>Properties:</strong> {properties}
				</Typography>
			)}
			{weaponDamage && (
				<Typography variant="body2" sx={{ fontSize: '7pt', mb: 0.5 }}>
					<strong>Weapon Damage:</strong> {weaponDamage}
				</Typography>
			)}
			{durability && (
				<Typography variant="body2" sx={{ fontSize: '7pt', mb: 0.5 }}>
					<strong>Durability:</strong> {durability}
				</Typography>
			)}
			{equipmentSlot && (
				<Typography variant="body2" sx={{ fontSize: '7pt', mb: 0.5 }}>
					<strong>Equipment Slot:</strong> {equipmentSlot}
				</Typography>
			)}
			{uses && (
				<Typography variant="body2" sx={{ fontSize: '7pt', mb: 0.5 }}>
					<strong>Uses:</strong> {uses}
				</Typography>
			)}
			{craftingTime && (
				<Typography variant="body2" sx={{ fontSize: '7pt', mb: 0.5 }}>
					<strong>Crafting Time:</strong> {craftingTime}
				</Typography>
			)}
			{spellEffect && (
				<Typography variant="body2" sx={{ fontSize: '7pt', mb: 0.5 }}>
					<strong>Spell Effect:</strong> {spellEffect}
				</Typography>
			)}

			<Divider sx={{ my: 0.5 }} />

			{/* Description */}
			<Typography variant="body1" className={fontSizeClass} sx={{ mb: 0.5 }}>
				{parse(description)}
			</Typography>

			{/* Enchantment */}
			{enchantment && (
				<>
					<Divider sx={{ my: 0.5 }} />
					<Typography variant="body1" className={fontSizeClass}>
						<strong>Enchantment:</strong> {parse(enchantment)}
					</Typography>
				</>
			)}

			{/* Effect */}
			{effect && (
				<>
					<Divider sx={{ my: 0.5 }} />
					<Typography variant="body1" className={fontSizeClass}>
						<strong>Effect:</strong> {parse(effect)}
					</Typography>
				</>
			)}

			{/* Note */}
			{note && (
				<>
					<Divider sx={{ my: 0.5 }} />
					<Typography variant="body1" className={fontSizeClass}>
						<strong>Note:</strong> {parse(note)}
					</Typography>
				</>
			)}
		</PlayingCard>
	)
}
