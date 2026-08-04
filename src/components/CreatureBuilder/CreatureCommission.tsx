import { MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { creatureBuilderActions } from '../../features/CreatureBuilder/creatureBuilderReducer'
import { useCreatureBuilderState } from '../../hooks/useCreatureBuilderState'
import type {
    AbilityTemplate,
    AttackTemplate,
    CreatureCategory,
    CreatureTypeDefaults,
} from '../../types/CreatureBuilder'
import abilitiesLibraryData from '../../utils/data/json/creature-abilities-library.json'
import attacksLibraryData from '../../utils/data/json/creature-attacks-library.json'
import creatureSubtypes from '../../utils/data/json/creature-subtypes.json'
import typeDefaultsData from '../../utils/data/json/creature-type-defaults.json'
import creatureTypes from '../../utils/data/json/creature-types.json'
import {
    TIER_NAMES,
    getArchetypeData,
    getAvailableArchetypes,
    getAvailableSizes,
    getSizeData,
} from '../../utils/typescript/creature/creatureBuilderCalculations'
import {
    BuilderRegister,
    ChoiceRail,
    GrantLine,
    type RailOption,
} from '../builder'

const typeDefaults = typeDefaultsData as CreatureTypeDefaults[]
const attacksLibrary = attacksLibraryData as AttackTemplate[]
const abilitiesLibrary = abilitiesLibraryData as AbilityTemplate[]

const CATEGORIES: { value: CreatureCategory; note: string }[] = [
	{ value: 'Basic', note: 'one life pool' },
	{ value: 'Elite', note: 'two life pools' },
	{ value: 'Lord', note: 'three life pools' },
]

/** A modifier as it reads on a plate: `+1`, `-2`, or nothing at all. */
const signed = (value: number) => (value > 0 ? `+${value}` : `${value}`)

/**
 * The creature's first six decisions, as courses of a commission (M15 S2).
 *
 * ## What it replaces
 *
 * `CreatureBuilderForm`: six MUI `Select`s and a `TextField` in a `Grid`, with two
 * hardcoded hex maps painting a coloured circle beside each value — `Basic:
 * '#3FA769'`, `Humanoid: '#3C6FA8'` and a dozen more. That is the "local palette
 * encoding nothing" fault M13 S8 removed from four search dialogs, in a component
 * the theme had never reached.
 *
 * ## Why some of these are rails and some are selects
 *
 * `ChoiceRail` is for a ladder: an ORDERED set, short enough to show at once,
 * where each step buys something a reader should see while choosing. Tier,
 * category and size are all three. Type is eleven unordered kinds and archetype is
 * ten tactical roles — a rail of those is a wall of plates that says nothing about
 * order, so they stay selects, in the sheet's own input register rather than
 * Material's.
 *
 * Each rail prints what its step costs or grants beneath it, which is the
 * Companion Builder's rule: the consequence of a choice belongs at the moment of
 * choosing, not in a preview the reader has to go and check.
 */
export const CreatureCommission: React.FC = () => {
	const dispatch = useDispatch()
	const { state } = useCreatureBuilderState()

	// Find matching type defaults for the current type + optional subtype
	const matchingDefaults = typeDefaults.find(
		(d) =>
			d.type === state.type &&
			(d.subtype === undefined ||
				d.subtype === '' ||
				d.subtype === state.subtype),
	)

	const defaultAttacks = (matchingDefaults?.attacks ?? [])
		.map((id) => attacksLibrary.find((a) => a.id === id))
		.filter(Boolean) as AttackTemplate[]

	const defaultAbilities = (matchingDefaults?.abilities ?? [])
		.map((id) => abilitiesLibrary.find((a) => a.id === id))
		.filter(Boolean) as AbilityTemplate[]

	const newDefaultAttacks = defaultAttacks.filter(
		(t) => !state.attacks.some((a) => a.name === t.name),
	)
	const newDefaultAbilities = defaultAbilities.filter(
		(t) => !state.abilities.some((a) => a.name === t.name),
	)

	const hasNewDefaults =
		newDefaultAttacks.length > 0 || newDefaultAbilities.length > 0

	const applyDefaults = () => {
		dispatch(
			creatureBuilderActions.applyDefaults({
				attacks: newDefaultAttacks.map((t) => ({
					name: t.name,
					properties: [],
					damage: t.damage,
					damageType: t.damageType,
					description: t.description,
				})),
				abilities: newDefaultAbilities.map((t) => ({
					name: t.name,
					description: t.description,
					actionType: t.actionType,
				})),
			}),
		)
	}

	const tierOptions: RailOption[] = Array.from({ length: 11 }, (_, tier) => ({
		value: tier,
		figure: tier,
		name: TIER_NAMES[tier],
		ariaLabel: `Tier ${tier}, ${TIER_NAMES[tier]}`,
	}))

	const categoryOptions: RailOption[] = CATEGORIES.map((entry) => ({
		value: entry.value,
		figure: entry.value.charAt(0),
		name: entry.value,
		ariaLabel: `${entry.value}: ${entry.note}`,
		trade: entry.note,
	}))

	const sizeOptions: RailOption[] = getAvailableSizes().map((name) => {
		const data = getSizeData(name)
		return {
			value: name,
			figure: name.charAt(0),
			name,
			ariaLabel: data?.description ? `${name}, ${data.description}` : name,
			trade: data
				? `HP ${signed(data.modifier)} · AV ${signed(data.avModifier)}`
				: undefined,
		}
	})

	const archetype = getArchetypeData(state.archetype)

	return (
		<>
			<BuilderRegister step="I" label="Tier" note="how dangerous it is">
				<ChoiceRail
					label="Tier"
					variant="tier"
					options={tierOptions}
					value={state.tier}
					onChange={(value) =>
						dispatch(creatureBuilderActions.setTier(Number(value)))
					}
				/>
			</BuilderRegister>

			<BuilderRegister step="II" label="Category" note="how many life pools">
				<ChoiceRail
					label="Category"
					variant="size"
					options={categoryOptions}
					value={state.category}
					onChange={(value) =>
						dispatch(
							creatureBuilderActions.setCategory(value as CreatureCategory),
						)
					}
				/>
			</BuilderRegister>

			<BuilderRegister step="III" label="Size" note="what it trades for reach">
				<ChoiceRail
					label="Size"
					variant="size"
					options={sizeOptions}
					value={state.size}
					onChange={(value) =>
						dispatch(creatureBuilderActions.setSize(String(value)))
					}
				/>
				{getSizeData(state.size) && (
					<GrantLine
						pairs={[
							['About', getSizeData(state.size)!.description],
							['Parry', signed(getSizeData(state.size)!.parryModifier)],
							['Dodge', signed(getSizeData(state.size)!.dodgeModifier)],
						]}
					/>
				)}
			</BuilderRegister>

			<BuilderRegister step="IV" label="Kind" note="what it is">
				<div className="cb-field-row">
					<label className="cb-field">
						<span className="cb-field__label">Type</span>
						<Select
							value={state.type}
							size="small"
							onChange={(event) =>
								dispatch(creatureBuilderActions.setType(event.target.value))
							}
							inputProps={{ 'aria-label': 'Creature type' }}
						>
							{(creatureTypes as string[]).map((type) => (
								<MenuItem key={type} value={type}>
									{type}
								</MenuItem>
							))}
						</Select>
					</label>

					<label className="cb-field">
						<span className="cb-field__label">Subtype</span>
						<Select
							value={state.subtype}
							size="small"
							displayEmpty
							onChange={(event) =>
								dispatch(creatureBuilderActions.setSubtype(event.target.value))
							}
							inputProps={{ 'aria-label': 'Creature subtype, optional' }}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{(
								(creatureSubtypes as Record<string, string[]>)[state.type] ?? []
							).map((subtype) => (
								<MenuItem key={subtype} value={subtype}>
									{subtype}
								</MenuItem>
							))}
						</Select>
					</label>
				</div>
				{hasNewDefaults && (
					<div className="cb-defaults-hint">
						<span className="cb-defaults-hint__text">
							{newDefaultAttacks.length > 0 && newDefaultAbilities.length > 0
								? `${state.type} defaults: +${newDefaultAttacks.length} attack${newDefaultAttacks.length > 1 ? 's' : ''}, +${newDefaultAbilities.length} abilit${newDefaultAbilities.length > 1 ? 'ies' : 'y'}`
								: newDefaultAttacks.length > 0
									? `${state.type} defaults: +${newDefaultAttacks.length} attack${newDefaultAttacks.length > 1 ? 's' : ''}`
									: `${state.type} defaults: +${newDefaultAbilities.length} abilit${newDefaultAbilities.length > 1 ? 'ies' : 'y'}`}
						</span>
						<button
							type="button"
							className="cb-defaults-hint__apply"
							onClick={applyDefaults}
						>
							Apply
						</button>
					</div>
				)}
			</BuilderRegister>

			<BuilderRegister step="V" label="Archetype" note="how it fights">
				<div className="cb-field-row">
					<label className="cb-field cb-field--wide">
						<span className="cb-field__label">Archetype</span>
						<Select
							value={state.archetype}
							size="small"
							onChange={(event) =>
								dispatch(
									creatureBuilderActions.setArchetype(event.target.value),
								)
							}
							inputProps={{ 'aria-label': 'Creature archetype' }}
						>
							{getAvailableArchetypes().map((name) => (
								<MenuItem key={name} value={name}>
									{name}
								</MenuItem>
							))}
						</Select>
					</label>
				</div>
				{archetype && (
					<GrantLine
						pairs={[
							['Fights', archetype.description],
							['Armor', archetype.armorType === 'heavy' ? 'Heavy' : 'Light'],
						]}
					/>
				)}
			</BuilderRegister>

			<BuilderRegister step="VI" label="Name" note="what to call it">
				<div className="cb-field-row">
					<label className="cb-field cb-field--wide">
						<span className="cb-field__label">Name</span>
						<TextField
							value={state.name}
							size="small"
							placeholder="Unnamed creature"
							onChange={(event) =>
								dispatch(creatureBuilderActions.setName(event.target.value))
							}
							inputProps={{ 'aria-label': 'Creature name' }}
						/>
					</label>
				</div>
			</BuilderRegister>
		</>
	)
}
