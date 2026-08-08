import React from 'react'
import { Box, Typography } from '@mui/material'
import DamageSigil from '@site/src/components/codex/DamageSigil'
import { DamageLadder } from '@site/src/components/codex/DamageLadder'
import { Spell } from '@site/src/types/Character'
import { calculateDamageValue } from '../../../utils/calculateDamageDisplay'
import { useAppSelector } from '../../../hooks/useAppSelector'

export type SpellSummaryProps = {
	spell: Spell
	spellCost: number
	onCast: () => void
}

/**
 * The collapsed view of a spell — a ledger line with one control (M13 S5).
 *
 * ## What it was
 *
 * Six editable fields in a wrapping flex row: a cast avatar, rank, name, a disabled
 * target, a disabled range, and then either the whole nine-field damage calculator
 * inline or a properties field. Three separate faults, all of which the Items tab had
 * and fixed in S4b/S4d:
 *
 * - **The row was a form.** Name and rank were editable here and the details panel
 *   held other things, so the same spell was edited in two places.
 * - **Two fields were disabled** — target and range were shown in a slot you cannot
 *   type in, which is a box that lies about being a control.
 * - **The damage calculator was in the ROW.** Nine inputs inside a collapsed summary,
 *   which is why a spell row was the tallest thing on the sheet.
 *
 * ## What it is
 *
 * Read cells on the shared column tracks, plus the cast plate — the row's one
 * control, because casting is the only thing a player does to a spell mid-fight.
 * Everything that DEFINES the spell moved to the details panel, per D5.
 *
 * Damage renders as the same `DamageLadder` a weapon row and a creature attack use;
 * a spell with no damage shows its properties instead, which is the one field that
 * varies by spell rather than by rank.
 */
export const SpellSummary: React.FC<SpellSummaryProps> = ({
	spell,
	spellCost,
	onCast,
}) => {
	const character = useAppSelector(
		(state) => state.characterSheet.activeCharacter,
	)

	return (
		<>
			{/* The cast plate. It was a 32px MUI `Avatar` with a hand-rolled
				`focusShine` keyframe glowing Material blue every five seconds — a
				decorative pulse on the one control that spends a resource, in a hue the
				theme does not own. It is a stamped plate in the magic register now, and
				the number on it is what the cast costs. */}
			<Box
				component="button"
				type="button"
				className="cs-cast"
				onClick={onCast}
				title={`Cast ${spell.name} — spends ${spellCost} focus`}
				aria-label={`Cast ${spell.name}, ${spellCost} focus`}
			>
				{spellCost}
			</Box>
			<Cell align="center" label="Rank">
				{spell.rank}
			</Cell>
			<Cell label="Name" strong>
				{spell.name}
			</Cell>
			<Cell label="Target" muted>
				{spell.target}
			</Cell>
			<Cell label="Range" muted>
				{spell.range}
			</Cell>
			{/* Properties is ALWAYS in the row (S5, owner review): `concentrate`, `quick`,
				`ritual` is how a player finds the spell they can cast right now, so it
				cannot be the field that disappears when a spell deals damage. */}
			<Cell label="Properties" muted>
				{spell.properties}
			</Cell>
			{spell.dealsDamage ? (
				<Box
					component="span"
					sx={{ display: 'inline-flex', alignItems: 'center', minWidth: 0 }}
				>
					<span className="cs-cell-label">Damage</span>
					<DamageLadder
						values={calculateDamageValue(spell.damage, 'spell', character)}
					>
						<DamageSigil type={spell.damage.type} size={14} />
					</DamageLadder>
				</Box>
			) : (
				/* The track is reserved on every row, so a spell with no damage leaves it
					empty rather than dropping it and re-flowing its neighbours. */
				<Box aria-hidden="true" />
			)}
		</>
	)
}

/**
 * One read cell of the spell row.
 *
 * Local rather than shared with the Items ledger's `LedgerCell`: that module's cells
 * carry item-specific behaviour (the wear pips, the amount reading), and what the two
 * rows genuinely share — the column-label span below the breakpoint, the ellipsis, the
 * dense size — is three declarations. Lifting three declarations into a shared cell
 * would be the abstraction that has to grow a prop for every difference.
 */
const Cell: React.FC<{
	children: React.ReactNode
	label: string
	align?: 'left' | 'center'
	muted?: boolean
	strong?: boolean
}> = ({ children, label, align = 'left', muted, strong }) => (
	<Typography
		component="div"
		title={typeof children === 'string' ? children : undefined}
		sx={{
			minWidth: 0,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			textAlign: align,
			fontSize: 'var(--nexus-text-dense)',
			...(align === 'center' && { fontVariantNumeric: 'tabular-nums' }),
			...(muted && { color: 'text.secondary' }),
			...(strong && { fontWeight: 600 }),
		}}
	>
		<span className="cs-cell-label">{label}</span>
		{children}
	</Typography>
)
