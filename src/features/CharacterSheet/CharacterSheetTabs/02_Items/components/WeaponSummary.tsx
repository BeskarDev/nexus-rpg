import React from 'react'
import { Box } from '@mui/material'
import DamageSigil from '@site/src/components/codex/DamageSigil'
import { DamageLadder } from '@site/src/components/codex/DamageLadder'
import { Weapon } from '@site/src/types/Character'
import { NameCell, ReadCell, UsesCell } from './LedgerCell'

export type WeaponSummaryProps = {
	weapon: Weapon
	/** The computed numbers alone — the type is rendered as its own mark. */
	damage: string
	onUsesChange: (uses: number) => void
}

/**
 * The collapsed view of a weapon (M13 S4b).
 *
 * Two things changed beyond the read/edit split. The damage cell was a disabled
 * field with a **gear icon opening a second popover** — a nested disclosure
 * inside a row that already expands, and the only one of its kind on the sheet.
 * The damage editor is in the details panel now, where the rest of the weapon is
 * defined. And `cost` / `load` / `amount` used to be details-only on a weapon
 * while being summary fields on an item: the same three values on opposite faces
 * in adjacent sections of one tab. They follow one rule now.
 */
export const WeaponSummary: React.FC<WeaponSummaryProps> = ({
	weapon,
	damage,
	onUsesChange,
}) => (
	<>
		<NameCell>{weapon.name}</NameCell>
		{/* M13 S4d: the same `DamageLadder` a creature's attack uses. It was plain
			`6/9/12` text here, so one notation had two treatments in one app — the
			player's own weapon read as a slash-run while the monster's attack was
			graded weak/strong/critical. The type mark goes in the ladder's `children`
			slot, which is where the docs put the damage chip: same slot, same job.
			`DamageSigil` keeps the type's name in the accessibility tree — the word is
			hidden from sight, never from a screen reader. */}
		<Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
			<span className="cs-cell-label">Damage</span>
			<DamageLadder values={damage}>
				<DamageSigil type={weapon.damage.type} size={14} />
			</DamageLadder>
		</Box>
		<ReadCell label="Properties" muted title={weapon.properties}>
			{weapon.properties}
		</ReadCell>
		{/* Cost and load are on a weapon too, and the shared template gives them a
			column here whether or not this section fills it — so fill it. This is the
			"one rule for cost/load/amount" the doc comment above promises, finally
			true on both faces. */}
		<ReadCell label="Cost" align="center">
			{weapon.cost ?? 0}
		</ReadCell>
		<ReadCell label="Load" align="center">
			{weapon.load ?? 0}
		</ReadCell>
		<ReadCell label="Amount" align="center">
			{weapon.amount ?? 0}
		</ReadCell>
		<UsesCell
			uses={weapon.uses || 0}
			onChange={onUsesChange}
			name={weapon.name}
		/>
	</>
)
