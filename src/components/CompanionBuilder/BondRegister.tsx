import React, { useMemo, useState } from 'react'
import {
	CheckMarkChecked,
	CheckMarkEmpty,
} from '@site/src/components/codex/CheckMark'
import SigilIcon from '../codex/SigilIcon'
import {
	ChoiceRail,
	Ledger,
	LedgerEmpty,
	LedgerRow,
	SearchField,
	type RailOption,
} from '../builder'
import type { CompanionBond } from '../../types/companion'
import {
	COMPANION_COMBAT_ARTS,
	MAX_COMPANION_COMBAT_ARTS,
	PACK_DAMAGE_BONUS,
	bondTierLimit,
} from '../../utils/typescript/companion/companionBond'
import './companionBond.css'

/** The skill-rank names, read off the Skills chapter's rank table. */
const NATURE_RANKS = [
	'Apprentice',
	'Novice',
	'Adept',
	'Expert',
	'Master',
	'Grandmaster',
]

const UNKNOWN_NATURE = -1

const plainText = (html: string) =>
	html
		.replace(/<br\s*\/?>/gi, ' ')
		.replace(/<[^>]*>/g, '')
		.replace(/\s+/g, ' ')
		.trim()

export interface BondToggleProps {
	checked: boolean
	onChange: (checked: boolean) => void
	label: React.ReactNode
	note?: React.ReactNode
	disabled?: boolean
}

/**
 * The print tools' `.pt-toggle`, restated on the builder's tokens.
 *
 * Same markup (a label around a visually hidden native checkbox, the `CheckMark`
 * socket as the state, small-caps text and an optional note) and never MUI's
 * `Switch`. It cannot reuse `.pt-toggle` itself: that stylesheet is loaded by the
 * print shell only and its ink tokens live under `.pt-shell`, neither of which
 * exists on the docs page or inside a builder dialog.
 */
export const BondToggle: React.FC<BondToggleProps> = ({
	checked,
	onChange,
	label,
	note,
	disabled,
}) => (
	<label className={`cb-toggle${disabled ? ' cb-toggle--disabled' : ''}`}>
		<input
			type="checkbox"
			className="cb-toggle__input"
			checked={checked}
			disabled={disabled}
			onChange={(event) => onChange(event.target.checked)}
		/>
		<span className="cb-toggle__mark">
			{checked ? <CheckMarkChecked /> : <CheckMarkEmpty />}
		</span>
		<span className="cb-toggle__text">
			{label}
			{note && <span className="cb-toggle__note">{note}</span>}
		</span>
	</label>
)

/** One labelled decision inside the Bond register. */
const BondField: React.FC<{
	label: string
	note?: React.ReactNode
	children: React.ReactNode
}> = ({ label, note, children }) => (
	<div className="cb-bond__field">
		<p className="cb-bond__label">
			{label}
			{note && <span className="cb-bond__label-note">{note}</span>}
		</p>
		{children}
	</div>
)

/**
 * Animal Companion rank 2's Combat Arts option: a searchable ledger of the Basic
 * arts, two at most.
 *
 * There is no weapon filter, on purpose. The talent says the companion learns arts
 * "appropriate for its types of attacks (ignoring the normal types of weapons the
 * Combat Arts can be used with)", so the sheet's picker, which filters by weapon,
 * would hide exactly the arts a bite or a claw can use.
 */
const CombatArtPicker: React.FC<{
	chosen: string[]
	onToggle: (name: string) => void
}> = ({ chosen, onToggle }) => {
	const [query, setQuery] = useState('')
	const shown = useMemo(() => {
		const needle = query.trim().toLowerCase()
		if (!needle) return COMPANION_COMBAT_ARTS
		return COMPANION_COMBAT_ARTS.filter(
			(art) =>
				art.name.toLowerCase().includes(needle) ||
				plainText(art.effect).toLowerCase().includes(needle),
		)
	}, [query])
	const full = chosen.length >= MAX_COMPANION_COMBAT_ARTS

	return (
		<div className="cb-bond__arts">
			<p className="cb-bond__hint">
				{chosen.length > 0 ? (
					<>
						<b>{chosen.join(' and ')}</b> ({chosen.length} of{' '}
						{MAX_COMPANION_COMBAT_ARTS})
					</>
				) : (
					`Choose ${MAX_COMPANION_COMBAT_ARTS} that suit their attacks. Weapon types are ignored.`
				)}{' '}
				Basic arts only, because Supreme arts need Art of Fighting or Art of
				Archery at rank 4.
			</p>
			<div className="cb-ledger__filters">
				<SearchField
					value={query}
					onChange={setQuery}
					placeholder="Search Combat Arts"
				/>
			</div>
			<Ledger label="Combat Arts">
				{shown.map((art) => {
					const selected = chosen.includes(art.name)
					return (
						<LedgerRow
							key={art.name}
							selected={selected}
							sigil="khopesh"
							onSelect={() => onToggle(art.name)}
							disabledReason={
								!selected && full
									? `${MAX_COMPANION_COMBAT_ARTS} Combat Arts at most`
									: undefined
							}
						>
							<span className="cb-row__name">{art.name}</span>
							<span className="cb-row__skills">{plainText(art.effect)}</span>
						</LedgerRow>
					)
				})}
				{shown.length === 0 && (
					<LedgerEmpty onClear={() => setQuery('')} clearLabel="Clear search">
						Nothing matches “{query.trim()}”
					</LedgerEmpty>
				)}
			</Ledger>
		</div>
	)
}

export interface BondRegisterBodyProps {
	bond: CompanionBond
	onChange: (update: Partial<CompanionBond>) => void
	onToggleCombatArt: (name: string) => void
}

/**
 * The owner's side of the companion: Animal Companion (all three ranks and both
 * of their choices), the owner's Nature and the Wild Companion spell.
 *
 * Every later decision is shown only once the talent reaches it, because a choice
 * the owner cannot make is not a cap to learn from (unlike the size rail's
 * disabled plates) but a rank they have not bought.
 */
export const BondRegisterBody: React.FC<BondRegisterBodyProps> = ({
	bond,
	onChange,
	onToggleCombatArt,
}) => {
	const rankOptions: RailOption[] = [
		{ value: 0, figure: '·', name: 'none', ariaLabel: 'No Animal Companion' },
		{ value: 1, figure: '1', name: 'rank 1' },
		{ value: 2, figure: '2', name: 'rank 2' },
		{ value: 3, figure: '3', name: 'rank 3' },
	]
	// `?` first: the owner's Nature can be left unstated (the docs page), and a rail
	// has no way back to "nothing chosen" once a plate is pressed.
	const natureOptions: RailOption[] = [
		{
			value: UNKNOWN_NATURE,
			figure: '?',
			name: 'not set',
			ariaLabel: 'Nature not set',
		},
		...NATURE_RANKS.map((name, rank) => ({
			value: rank,
			figure: String(rank),
			name,
		})),
	]
	const rank2Options: RailOption[] = [
		{
			value: 'two-companions',
			figure: (
				<span className="cb-bond__figure-pair">
					<SigilIcon name="paw" size={14} />
					<SigilIcon name="paw" size={14} />
				</span>
			),
			name: 'two companions',
		},
		{
			value: 'combat-arts',
			figure: <SigilIcon name="khopesh" size={16} />,
			name: 'two Combat Arts',
		},
	]
	const rank3Options: RailOption[] = [
		{
			value: 'pack-coordination',
			figure: <SigilIcon name="target" size={16} />,
			name: 'pack coordination',
		},
		{
			value: 'damage',
			figure: `+${PACK_DAMAGE_BONUS}`,
			name: 'damage',
		},
	]
	const castOptions: RailOption[] = [
		{ value: 1, figure: '1', name: 'rank 1' },
		{ value: 2, figure: '2', name: 'rank 2' },
		{ value: 3, figure: '3', name: 'rank 3' },
	]

	const limit = bondTierLimit(bond)

	return (
		<div className="cb-bond">
			<BondField label="Animal Companion" note="the owner’s talent rank">
				<ChoiceRail
					label="Animal Companion rank"
					variant="even"
					options={rankOptions}
					value={bond.talentRank}
					onChange={(value) =>
						onChange({
							talentRank: Number(value) as CompanionBond['talentRank'],
						})
					}
				/>
			</BondField>

			<BondField
				label="Owner’s Nature"
				note={
					bond.nature === null
						? 'not set, so the block says “the owner’s Nature”'
						: limit !== null
							? `controls Tier ${limit < 0 ? 'none' : `${limit} or lower`}`
							: undefined
				}
			>
				<ChoiceRail
					label="Owner’s Nature rank"
					variant="even"
					options={natureOptions}
					value={bond.nature ?? UNKNOWN_NATURE}
					onChange={(value) =>
						onChange({
							nature: Number(value) === UNKNOWN_NATURE ? null : Number(value),
						})
					}
				/>
			</BondField>

			{bond.talentRank >= 2 && (
				<BondField label="Rank 2" note="choose one">
					<ChoiceRail
						label="Animal Companion rank 2 option"
						variant="even"
						options={rank2Options}
						value={bond.rank2Choice ?? undefined}
						onChange={(value) =>
							onChange({
								rank2Choice: value as CompanionBond['rank2Choice'],
							})
						}
					/>
					{bond.rank2Choice === 'two-companions' && (
						<p className="cb-bond__hint">
							The owner controls two companions, both of a Tier equal to or
							lower than their Nature - 1. Build each one separately.
						</p>
					)}
					{bond.rank2Choice === 'combat-arts' && (
						<CombatArtPicker
							chosen={bond.combatArts}
							onToggle={onToggleCombatArt}
						/>
					)}
				</BondField>
			)}

			{bond.talentRank >= 3 && (
				<BondField label="Rank 3" note="choose one">
					<ChoiceRail
						label="Animal Companion rank 3 option"
						variant="even"
						options={rank3Options}
						value={bond.rank3Choice ?? undefined}
						onChange={(value) =>
							onChange({
								rank3Choice: value as CompanionBond['rank3Choice'],
							})
						}
					/>
					{bond.rank3Choice === 'damage' && (
						<p className="cb-bond__hint">
							+{PACK_DAMAGE_BONUS} to the total damage of every attack, at every
							success level (ability bonus).
						</p>
					)}
				</BondField>
			)}

			<BondToggle
				checked={bond.wildCompanion && bond.talentRank >= 1}
				disabled={bond.talentRank < 1}
				onChange={(checked) => onChange({ wildCompanion: checked })}
				label="Summoned with Wild Companion"
				note={
					bond.talentRank < 1
						? 'Needs the Animal Companion talent.'
						: 'Spirit (primal), +1d Spirit, +1d Mind, +1 Resist and a psychic connection.'
				}
			/>
			{bond.wildCompanion && bond.talentRank >= 1 && (
				<BondField
					label="Cast at"
					note="rank 2 and 3 let the companion cast the owner’s spells"
				>
					<ChoiceRail
						label="Wild Companion cast rank"
						variant="even"
						options={castOptions}
						value={bond.wildCompanionRank}
						onChange={(value) =>
							onChange({
								wildCompanionRank: Number(
									value,
								) as CompanionBond['wildCompanionRank'],
							})
						}
					/>
				</BondField>
			)}
		</div>
	)
}

/** The settled bond, as the closed register's one-line answer. */
export const bondRegisterSummary = (
	bond: CompanionBond,
): React.ReactNode | undefined => {
	if (bond.talentRank < 1) return undefined
	const parts = [`Animal Companion ${bond.talentRank}`]
	if (bond.nature !== null) parts.push(`Nature ${bond.nature}`)
	if (bond.talentRank >= 2 && bond.rank2Choice === 'two-companions')
		parts.push('two companions')
	if (bond.talentRank >= 2 && bond.rank2Choice === 'combat-arts')
		parts.push(
			bond.combatArts.length > 0 ? bond.combatArts.join(', ') : 'Combat Arts',
		)
	if (bond.talentRank >= 3 && bond.rank3Choice === 'pack-coordination')
		parts.push('pack coordination')
	if (bond.talentRank >= 3 && bond.rank3Choice === 'damage')
		parts.push(`+${PACK_DAMAGE_BONUS} damage`)
	if (bond.wildCompanion) parts.push(`Wild Companion ${bond.wildCompanionRank}`)
	return (
		<>
			<b>{parts[0]}</b>
			{parts.length > 1 ? ` · ${parts.slice(1).join(' · ')}` : ''}
		</>
	)
}
