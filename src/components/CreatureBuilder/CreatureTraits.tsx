import React from 'react'
import { useDispatch } from 'react-redux'
import { MenuItem, Select, TextField } from '@mui/material'
import { BuilderRegister, GrantLine } from '../builder'
import { creatureBuilderActions } from '../../features/CreatureBuilder/creatureBuilderReducer'
import { useCreatureBuilderState } from '../../hooks/useCreatureBuilderState'
import { ActionMark } from '../../features/CharacterSheet/CharacterSheetTabs/01_Skills/components/ActionMark'
import { ACTION_TYPES, type ActionType } from '../../types/ActionType'
import type {
	CreatureAbility,
	CreatureAttack,
	CreatureSkill,
} from '../../types/CreatureBuilder'
import { OFFICIAL_SKILLS } from '../../constants/skills'

/** The damage types a creature's attack can deal, from the rules' own list. */
const DAMAGE_TYPES = [
	'physical',
	'fire',
	'frost',
	'lightning',
	'poison',
	'necrotic',
	'radiant',
	'psychic',
	'acid',
	'force',
	'sonic',
]

/**
 * The four courses that were 2,780 lines of accordions (M15 S3).
 *
 * ## What it replaces
 *
 * `CreatureAdvancedSettings.tsx`: four MUI `Accordion`s — Custom Stats, Skills &
 * Traits, Attacks, Abilities — behind an "Advanced" toggle, holding a stack of
 * paired `TextField`s per entry.
 *
 * ## Why the toggle is gone
 *
 * A commission is a document you read down. Hiding half of it behind a button
 * means the tool has two shapes and the reader has to know the second one exists —
 * and a creature that needs no attacks does not need that fact hidden, it simply
 * leaves the course empty. This is the same call M13 records for a locked
 * register: **shown, not hidden**, because a course you can see is a rule you
 * learn.
 *
 * ## Why the lists are rows rather than field stacks
 *
 * An attack is a NAME, a damage figure and a note. Three paired fields per entry,
 * stacked vertically, made four attacks into a screen of boxes. One line per
 * entry, in the ledger idiom the whole app now uses, makes four attacks four
 * lines — and the entry a reader wants to change is the one they can see.
 */
const emptyAttack: CreatureAttack = {
	name: '',
	properties: [],
	damage: '',
	damageType: 'physical',
	description: '',
}

const emptyAbility: CreatureAbility = {
	name: '',
	description: '',
	actionType: 'Action',
}

export const CreatureTraits: React.FC = () => {
	const dispatch = useDispatch()
	const { state, builtCreature } = useCreatureBuilderState()

	const setSkills = (skills: CreatureSkill[]) =>
		dispatch(creatureBuilderActions.setSkills(skills))
	const setAttacks = (attacks: CreatureAttack[]) =>
		dispatch(creatureBuilderActions.setAttacks(attacks))
	const setAbilities = (abilities: CreatureAbility[]) =>
		dispatch(creatureBuilderActions.setAbilities(abilities))

	/** A comma list the reader types, stored as an array. */
	const listField = (
		label: string,
		value: string[],
		onChange: (next: string[]) => void,
		placeholder: string,
	) => (
		<label className="cb-field cb-field--wide">
			<span className="cb-field__label">{label}</span>
			<TextField
				value={value.join(', ')}
				size="small"
				placeholder={placeholder}
				onChange={(event) =>
					onChange(
						event.target.value
							.split(',')
							.map((entry) => entry.trim())
							.filter(Boolean),
					)
				}
				inputProps={{ 'aria-label': label }}
			/>
		</label>
	)

	return (
		<>
			<BuilderRegister
				step="VII"
				label="Stats"
				note="what the tier already decided"
			>
				{/* An override plate states the DERIVED value beside the box that
					overrules it. The old panel showed an empty field and left the reader
					to guess what they were replacing. */}
				<GrantLine
					pairs={[
						['HP', builtCreature?.hp ?? '—'],
						['AV', builtCreature?.av ?? '—'],
						['Parry', builtCreature?.parry ?? '—'],
						['Dodge', builtCreature?.dodge ?? '—'],
						['Resist', builtCreature?.resist ?? '—'],
					]}
				/>
				<div className="cb-field-row">
					<label className="cb-field">
						<span className="cb-field__label">Override HP</span>
						<TextField
							value={state.customHP ?? ''}
							size="small"
							type="number"
							placeholder="derived"
							onChange={(event) =>
								dispatch(
									creatureBuilderActions.setCustomHP(
										event.target.value === ''
											? null
											: Number(event.target.value),
									),
								)
							}
							inputProps={{ 'aria-label': 'Override hit points' }}
						/>
					</label>
					<label className="cb-field">
						<span className="cb-field__label">Override AV</span>
						<TextField
							value={state.customAV ?? ''}
							size="small"
							type="number"
							placeholder="derived"
							onChange={(event) =>
								dispatch(
									creatureBuilderActions.setCustomAV(
										event.target.value === ''
											? null
											: Number(event.target.value),
									),
								)
							}
							inputProps={{ 'aria-label': 'Override armor value' }}
						/>
					</label>
					<label className="cb-field">
						<span className="cb-field__label">Armor</span>
						<Select
							value={state.customArmorType ?? ''}
							size="small"
							displayEmpty
							onChange={(event) =>
								dispatch(
									creatureBuilderActions.setCustomArmorType(
										(event.target.value || null) as 'light' | 'heavy' | null,
									),
								)
							}
							inputProps={{ 'aria-label': 'Override armor type' }}
						>
							<MenuItem value="">
								<em>From archetype</em>
							</MenuItem>
							<MenuItem value="light">Light</MenuItem>
							<MenuItem value="heavy">Heavy</MenuItem>
						</Select>
					</label>
				</div>
			</BuilderRegister>

			<BuilderRegister
				step="VIII"
				label="Skills and traits"
				note="what it knows"
			>
				<div className="cb-entries">
					{state.skills.map((skill, index) => (
						<div className="cb-entry" key={`skill-${index}`}>
							<Select
								value={skill.name}
								size="small"
								className="cb-entry__main"
								onChange={(event) =>
									setSkills(
										state.skills.map((entry, i) =>
											i === index
												? { ...entry, name: event.target.value }
												: entry,
										),
									)
								}
								inputProps={{ 'aria-label': `Skill ${index + 1}` }}
							>
								{OFFICIAL_SKILLS.map((name) => (
									<MenuItem key={name} value={name}>
										{name}
									</MenuItem>
								))}
							</Select>
							<TextField
								value={skill.rank}
								size="small"
								type="number"
								className="cb-entry__rank"
								onChange={(event) =>
									setSkills(
										state.skills.map((entry, i) =>
											i === index
												? { ...entry, rank: Number(event.target.value) }
												: entry,
										),
									)
								}
								inputProps={{ 'aria-label': `Rank of skill ${index + 1}` }}
							/>
							<button
								type="button"
								className="cb-entry__drop"
								aria-label={`Remove skill ${index + 1}`}
								onClick={() =>
									setSkills(state.skills.filter((_, i) => i !== index))
								}
							>
								×
							</button>
						</div>
					))}
					<button
						type="button"
						className="cb-entry__add"
						onClick={() =>
							setSkills([
								...state.skills,
								{ name: OFFICIAL_SKILLS[0], rank: 1 },
							])
						}
					>
						Add skill
					</button>
				</div>

				<div className="cb-field-row">
					{listField(
						'Immunities',
						state.immunities,
						(next) => dispatch(creatureBuilderActions.setImmunities(next)),
						'poison, charmed',
					)}
					{listField(
						'Resistances',
						state.resistances,
						(next) => dispatch(creatureBuilderActions.setResistances(next)),
						'frost, physical',
					)}
					{listField(
						'Weaknesses',
						state.weaknesses,
						(next) => dispatch(creatureBuilderActions.setWeaknesses(next)),
						'fire',
					)}
				</div>
			</BuilderRegister>

			<BuilderRegister
				step="IX"
				label="Attacks"
				note="what it does on its turn"
			>
				<div className="cb-entries">
					{state.attacks.map((attack, index) => (
						<div className="cb-entry cb-entry--stacked" key={`attack-${index}`}>
							<div className="cb-entry__line">
								<TextField
									value={attack.name}
									size="small"
									placeholder="Bite"
									className="cb-entry__main"
									onChange={(event) =>
										setAttacks(
											state.attacks.map((entry, i) =>
												i === index
													? { ...entry, name: event.target.value }
													: entry,
											),
										)
									}
									inputProps={{ 'aria-label': `Attack ${index + 1} name` }}
								/>
								<TextField
									value={attack.damage}
									size="small"
									placeholder="8/12/16"
									className="cb-entry__figure"
									onChange={(event) =>
										setAttacks(
											state.attacks.map((entry, i) =>
												i === index
													? { ...entry, damage: event.target.value }
													: entry,
											),
										)
									}
									inputProps={{ 'aria-label': `Attack ${index + 1} damage` }}
								/>
								<Select
									value={attack.damageType ?? 'physical'}
									size="small"
									className="cb-entry__kind"
									onChange={(event) =>
										setAttacks(
											state.attacks.map((entry, i) =>
												i === index
													? { ...entry, damageType: event.target.value }
													: entry,
											),
										)
									}
									inputProps={{
										'aria-label': `Attack ${index + 1} damage type`,
									}}
								>
									{DAMAGE_TYPES.map((type) => (
										<MenuItem key={type} value={type}>
											{type}
										</MenuItem>
									))}
								</Select>
								<button
									type="button"
									className="cb-entry__drop"
									aria-label={`Remove attack ${index + 1}`}
									onClick={() =>
										setAttacks(state.attacks.filter((_, i) => i !== index))
									}
								>
									×
								</button>
							</div>
							<TextField
								value={attack.description ?? ''}
								size="small"
								placeholder="What happens on a hit"
								onChange={(event) =>
									setAttacks(
										state.attacks.map((entry, i) =>
											i === index
												? { ...entry, description: event.target.value }
												: entry,
										),
									)
								}
								inputProps={{ 'aria-label': `Attack ${index + 1} description` }}
							/>
						</div>
					))}
					<button
						type="button"
						className="cb-entry__add"
						onClick={() => setAttacks([...state.attacks, { ...emptyAttack }])}
					>
						Add attack
					</button>
				</div>
			</BuilderRegister>

			<BuilderRegister step="X" label="Abilities" note="what else it can do">
				<div className="cb-entries">
					{state.abilities.map((ability, index) => (
						<div
							className="cb-entry cb-entry--stacked"
							key={`ability-${index}`}
						>
							<div className="cb-entry__line">
								<TextField
									value={ability.name}
									size="small"
									placeholder="Death Roll"
									className="cb-entry__main"
									onChange={(event) =>
										setAbilities(
											state.abilities.map((entry, i) =>
												i === index
													? { ...entry, name: event.target.value }
													: entry,
											),
										)
									}
									inputProps={{ 'aria-label': `Ability ${index + 1} name` }}
								/>
								{/* `ActionMark`, which retires `getActionTypeIcon`'s last
									consumer in the repo (M13 S8c logged this file as the one
									that kept it alive). */}
								<Select
									value={ability.actionType ?? 'Action'}
									size="small"
									className="cb-entry__kind"
									onChange={(event) =>
										setAbilities(
											state.abilities.map((entry, i) =>
												i === index
													? { ...entry, actionType: event.target.value }
													: entry,
											),
										)
									}
									renderValue={(value) => (
										<span className="cb-entry__action">
											<ActionMark actionType={value as ActionType} />
											{value as string}
										</span>
									)}
									inputProps={{
										'aria-label': `Ability ${index + 1} action type`,
									}}
								>
									{ACTION_TYPES.map((type) => (
										<MenuItem key={type} value={type}>
											{type}
										</MenuItem>
									))}
								</Select>
								<button
									type="button"
									className="cb-entry__drop"
									aria-label={`Remove ability ${index + 1}`}
									onClick={() =>
										setAbilities(state.abilities.filter((_, i) => i !== index))
									}
								>
									×
								</button>
							</div>
							<TextField
								value={ability.description}
								size="small"
								placeholder="What it does, and when"
								onChange={(event) =>
									setAbilities(
										state.abilities.map((entry, i) =>
											i === index
												? { ...entry, description: event.target.value }
												: entry,
										),
									)
								}
								inputProps={{
									'aria-label': `Ability ${index + 1} description`,
								}}
							/>
						</div>
					))}
					<button
						type="button"
						className="cb-entry__add"
						onClick={() =>
							setAbilities([...state.abilities, { ...emptyAbility }])
						}
					>
						Add ability
					</button>
				</div>
			</BuilderRegister>
		</>
	)
}
