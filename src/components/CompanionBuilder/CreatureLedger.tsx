import React, { useMemo, useState } from 'react'
import SigilIcon from '../codex/SigilIcon'
import type { CompanionTrait } from '../../types/companion'
import { typeSigil } from './companionMarks'

export interface CreatureLedgerProps {
	traits: CompanionTrait[]
	selected: CompanionTrait | null
	onSelect: (trait: CompanionTrait) => void
}

/**
 * The creature catalogue as a ledger (M13 S8).
 *
 * ## What this replaces
 *
 * A full-width MUI `Select` holding thirty-four creatures, each rendered as a
 * coloured dot plus `Name (Type)`. It was a list pretending to be a field: no
 * search across thirty-four options, no way to see what a creature DOES before
 * committing to it, and the type — the one classification that matters when you
 * are choosing between a Bear and a Fire Elemental — carried by a saturated dot
 * (see `companionMarks.ts` for why that had to go).
 *
 * It is a ledger now, which is the shape every other list in this app takes: a
 * filter, the type marks as pressable chips, and rows that state the creature's
 * skills so the choice can be made on evidence. `role="listbox"` with
 * `role="option"` rows, matching the selectable row the search dialogs gained in
 * S8.
 *
 * The empty state names WHICH constraint emptied the list and carries the control
 * that lifts it, per the same slice's rule.
 */
export const CreatureLedger: React.FC<CreatureLedgerProps> = ({
	traits,
	selected,
	onSelect,
}) => {
	const [query, setQuery] = useState('')
	const [type, setType] = useState<string | null>(null)

	const types = useMemo(
		() => Array.from(new Set(traits.map((trait) => trait.type))).sort(),
		[traits],
	)

	const shown = useMemo(() => {
		const needle = query.trim().toLowerCase()
		return traits.filter((trait) => {
			if (type && trait.type !== type) return false
			if (!needle) return true
			return (
				trait.name.toLowerCase().includes(needle) ||
				trait.type.toLowerCase().includes(needle) ||
				trait.skills.toLowerCase().includes(needle)
			)
		})
	}, [traits, query, type])

	return (
		<>
			<div className="cb-ledger__filters">
				{/* A carved field, not a MUI `TextField`: the outlined variant brought a
					notched-outline fieldset, a Material-grey hairline and a 40px box, and was
					the one place in this dialog a Material component still showed through.
					The `eye` is an engraved fixture inside the keyline — to search is to
					look — and is not a control, so it is not a button. */}
				<div className="cb-search">
					<SigilIcon name="eye" size={13} className="cb-search__mark" />
					<input
						type="text"
						className="cb-search__input"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search creatures"
						aria-label="Search creatures"
					/>
					{query && (
						<button
							type="button"
							className="cb-search__clear"
							aria-label="Clear search"
							onClick={() => setQuery('')}
						>
							×
						</button>
					)}
				</div>
				{types.map((name) => (
					<button
						key={name}
						type="button"
						className="cb-chip"
						aria-pressed={type === name}
						onClick={() => setType(type === name ? null : name)}
					>
						{typeSigil(name) && <SigilIcon name={typeSigil(name)!} size={11} />}
						{name}
					</button>
				))}
			</div>

			<div className="cb-ledger__rows" role="listbox" aria-label="Creature">
				{shown.map((trait) => {
					const chosen = selected?.name === trait.name
					const mark = typeSigil(trait.type)
					return (
						<button
							key={trait.name}
							type="button"
							role="option"
							aria-selected={chosen}
							className={`cb-row${chosen ? ' cb-row--on' : ''}`}
							onClick={() => onSelect(trait)}
						>
							<span className="cb-row__mark" aria-hidden="true">
								{mark && <SigilIcon name={mark} size={13} />}
							</span>
							<span className="cb-row__name">{trait.name}</span>
							<span className="cb-row__skills">
								{trait.skills === '-' ? '' : trait.skills}
							</span>
						</button>
					)
				})}
				{shown.length === 0 && (
					<p className="cb-empty">
						{type && query.trim()
							? `No ${type} matches “${query.trim()}”`
							: type
								? `No ${type} creatures`
								: `Nothing matches “${query.trim()}”`}
						<button
							type="button"
							className="cb-chip"
							onClick={() => {
								setQuery('')
								setType(null)
							}}
						>
							Clear filters
						</button>
					</p>
				)}
			</div>
		</>
	)
}
