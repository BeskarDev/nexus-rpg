import React, { useMemo, useState } from 'react'
import {
	FilterChip,
	Ledger,
	LedgerEmpty,
	LedgerRow,
	SearchField,
} from '../builder'
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
 * skills so the choice can be made on evidence. The pieces are the shared builder
 * primitives, so this list and the Magic Item Builder's four cannot drift.
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
				<SearchField
					value={query}
					onChange={setQuery}
					placeholder="Search creatures"
				/>
				{types.map((name) => (
					<FilterChip
						key={name}
						pressed={type === name}
						sigil={typeSigil(name)}
						onClick={() => setType(type === name ? null : name)}
					>
						{name}
					</FilterChip>
				))}
			</div>

			<Ledger label="Creature">
				{shown.map((trait) => (
					<LedgerRow
						key={trait.name}
						selected={selected?.name === trait.name}
						sigil={typeSigil(trait.type)}
						onSelect={() => onSelect(trait)}
					>
						<span className="cb-row__name">{trait.name}</span>
						<span className="cb-row__skills">
							{trait.skills === '-' ? '' : trait.skills}
						</span>
					</LedgerRow>
				))}
				{shown.length === 0 && (
					<LedgerEmpty
						onClear={() => {
							setQuery('')
							setType(null)
						}}
					>
						{type && query.trim()
							? `No ${type} matches “${query.trim()}”`
							: type
								? `No ${type} creatures`
								: `Nothing matches “${query.trim()}”`}
					</LedgerEmpty>
				)}
			</Ledger>
		</>
	)
}
