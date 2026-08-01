import React from 'react'
import StatSigil from '@site/src/components/codex/StatSigil'
import DieToken from '@site/src/components/codex/DieToken'
import MagicItemCard, {
	type MagicItemFigure,
} from '@site/src/components/codex/MagicItemCard'
import {
	type BaseItem,
	type Enchantment,
	type ItemCategory,
	type QualityTier,
	type SpecialMaterial,
	qualityTierLabels,
	getDurabilityDie,
	getMaxSpellRank,
	getSpellDamageBonus,
	getStaffCharges,
	getStaffSpellCapacity,
	getTotalAV,
	getWandCharges,
	getWandStaffRoll,
	getWeaponDamageBonus,
} from '../utils/magicItemsConfig'
import {
	ARMOR_CATEGORIES,
	CATEGORY_LABEL,
	CATEGORY_SIGIL,
} from './magicItemMarks'

export interface CostBreakdown {
	baseCost: number
	magicItemBaseCost: number
	materialExtraCost: number
	enchantmentCost: number
	totalCost: number
}

export interface MagicItemPlateProps {
	baseItem: BaseItem | null
	quality: QualityTier | ''
	material: SpecialMaterial | null
	enchantment: Enchantment | null
	cost: CostBreakdown
	name: string
	description: string
	properties: string
	load: number | null
	isWandOrStaff: boolean
	isStaff: boolean
}

const coins = (value: number) => value.toLocaleString('en-US')

const Figure: React.FC<{
	label: string
	children: React.ReactNode
	sigil?: React.ReactNode
}> = ({ label, children, sigil }) => (
	<div className="cb-figure">
		<span className="cb-figure__label">
			{sigil}
			{label}
		</span>
		<span className="cb-figure__value">{children}</span>
	</div>
)

/**
 * The builder's preview — a thin adapter onto {@link MagicItemCard} (M13 S8).
 *
 * The first version DREW the item here, out of builder chrome. That was correct
 * and looked like a programmer's readout, because a magic item was the one
 * generated content type with no codex card of its own: spells, combat arts,
 * talents, conditions and creatures all have one.
 *
 * It has one now, so this file is only the mapping — game values in, card props
 * out. The judgements that live here are the ones about MEANING rather than
 * appearance, and each is noted at its line: which figures a category actually
 * has, and why a one-value damage ladder would misstate the rules.
 */
export const MagicItemPlate: React.FC<MagicItemPlateProps> = ({
	baseItem,
	quality,
	material,
	enchantment,
	cost,
	name,
	description,
	properties,
	load,
	isWandOrStaff,
	isStaff,
}) => {
	if (!baseItem || !quality) {
		return (
			<MagicItemCard
				waiting={
					baseItem
						? 'Choose a quality. Everything below is priced from it.'
						: 'Choose a base item, then its quality. The rest is optional.'
				}
			/>
		)
	}

	const category = baseItem.category as ItemCategory
	const damageBonus = getWeaponDamageBonus(baseItem.quality, quality)
	const totalDamage = baseItem.damage
		? Number(baseItem.damage) + damageBonus
		: null
	const av = ARMOR_CATEGORIES.includes(category)
		? getTotalAV(baseItem, quality)
		: null
	const roll = isWandOrStaff ? getWandStaffRoll(quality) : null

	const figures: MagicItemFigure[] = []
	if (totalDamage !== null) {
		/*
			A plain figure, NOT a `DamageLadder`: a ladder given one value renders it
			as STATIC damage and announces "3 at every success level". This number is
			the WEAPON component of a damage roll, which the character's attribute die
			and success level build on, so calling it static states a rule that is not
			true.
		*/
		figures.push({ label: 'Weapon dmg', value: `+${totalDamage}` })
	}
	if (category === 'spell-catalyst') {
		// Granted by the QUALITY, not by a damage field — a wand has none and still
		// "functions as a spell catalyst of its Quality tier" (rules audit).
		figures.push({
			label: 'Spell dmg',
			value: `+${getSpellDamageBonus(quality)}`,
		})
	}
	if (av !== null) {
		figures.push({
			label: 'AV',
			value: `+${av}`,
			sigil: <StatSigil name="av" size={11} />,
		})
	}
	figures.push({
		label: 'Load',
		value: load ?? baseItem.load,
		sigil: <StatSigil name="load" size={11} />,
	})
	figures.push({
		label: 'Durability',
		value: <DieToken value={getDurabilityDie(baseItem, quality)} />,
	})
	if (isWandOrStaff && quality >= 4) {
		figures.push({ label: 'Spell rank', value: getMaxSpellRank(quality) })
		figures.push({
			label: 'Charges',
			value: isStaff ? getStaffCharges(quality) : getWandCharges(quality),
		})
		if (isStaff) {
			figures.push({
				label: 'Spells held',
				value: getStaffSpellCapacity(quality),
			})
		}
		if (roll) {
			// What it ROLLS. The rules let you invoke a wand or staff with the
			// implement's own die and skill bonus, and without these the item cannot
			// be used at the table.
			figures.push({
				label: 'Invoke',
				value: (
					<>
						<DieToken value={roll.attributeDie} />+{roll.skillBonus}
					</>
				),
			})
		}
	}

	return (
		<MagicItemCard
			name={name}
			quality={qualityTierLabels[quality]}
			kind={[CATEGORY_LABEL[category], material?.name, enchantment?.name]
				.filter(Boolean)
				.join(' · ')}
			kindSigil={CATEGORY_SIGIL[category]}
			tally={[
				{ label: 'Base item', value: cost.baseCost },
				{
					label: 'Magic item',
					value: cost.magicItemBaseCost,
					note: category === 'wearable' ? 'wearables skip this' : undefined,
				},
				{
					label: 'Material',
					value: cost.materialExtraCost,
					note: material?.materialType === 'base' ? 'base material' : undefined,
				},
				{ label: 'Enchantment', value: cost.enchantmentCost },
			]}
			total={cost.totalCost}
			figures={figures}
			properties={properties
				.split(',')
				.map((property) => property.trim())
				.filter(Boolean)}
			description={description}
		/>
	)
}
