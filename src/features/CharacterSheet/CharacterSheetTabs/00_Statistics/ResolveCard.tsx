import React from 'react'
import { CharacterSheetCard, CardHeader, PipRow } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { characterSheetActions } from '../../characterSheetReducer'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'

/** Resolve is capped at 3 by the rules, so the pips can be a fixed row. */
const MAX_RESOLVE = 3

/**
 * Resolve, as three flame pips.
 *
 * M9 S6: this replaced a numeric `TextField`. Pips rather than a nested editor,
 * deliberately — Resolve is a 0–3 resource spent *during* play (rerolls, special
 * actions), so hiding it behind a menu would cost a tap on one of the most
 * frequently changed values on the sheet, which is the opposite of what the
 * display/edit split is for. A pip row is display and edit at once: the count
 * reads at a glance and spending one is a single tap.
 *
 * It also reuses Fatigue's exact idiom, which is half the point — two spendable
 * resources that behave alike now look alike, instead of one being a text field
 * and the other a pip row. M9 S11 made that literal: both rows are now the same
 * `PipRow`, so the fill-to-here / clear-to-here rule is defined once.
 */
export const ResolveCard = () => {
	const dispatch = useAppDispatch()
	const { resolve } = useAppSelector(
		(state) => state.characterSheet.activeCharacter.statistics,
	)

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	return (
		<CharacterSheetCard
			weight="column"
			minWidth="5rem"
			info="Resolve: resource for rerolls and special actions (max 3)"
			header={
				<CardHeader
					// M13 S1 (D1): no icon. The flame mark lives on the pips, where it
					// carries identity AND quantity at once; repeating it in the header
					// made the card state one thing twice. Text-only headers are the
					// deliberate cost of that choice, and Fatigue matches.
					label="Resolve"
					color={UI_COLORS.resolve}
				/>
			}
		>
			<PipRow
				label="Resolve"
				count={MAX_RESOLVE}
				value={resolve}
				onChange={(next) => updateCharacter({ statistics: { resolve: next } })}
				sigil="resolve"
				tone={UI_COLORS.resolve}
			/>
		</CharacterSheetCard>
	)
}
