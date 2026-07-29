import React from 'react'
import StatSigil from '@site/src/components/codex/StatSigil'
import { Box, Checkbox } from '@mui/material'
import { CharacterSheetCard, CardHeader } from '../../components'
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
 * and the other a pip row.
 */
export const ResolveCard = () => {
	const dispatch = useAppDispatch()
	const { resolve } = useAppSelector(
		(state) => state.characterSheet.activeCharacter.statistics,
	)

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	/**
	 * Clicking a pip sets Resolve to it, or clears back to it — the same
	 * fill-to-here / clear-to-here behaviour the fatigue pips have, so the two
	 * rows respond identically.
	 */
	const handleResolveChange = (index: number) => {
		updateCharacter({
			statistics: { resolve: index < resolve ? index : index + 1 },
		})
	}

	return (
		<CharacterSheetCard
			weight="column"
			minWidth="5rem"
			info="Resolve: resource for rerolls and special actions (max 3)"
			header={
				<CardHeader
					icon={<StatSigil name="resolve" size="1.15em" />}
					label="Resolve"
					color={UI_COLORS.resolve}
				/>
			}
		>
			<Box sx={{ display: 'flex', flexDirection: 'row' }}>
				{Array.from({ length: MAX_RESOLVE }).map((_, index) => (
					<Checkbox
							key={index}
							size="small"
							// A sigil is solid mass either way, so colour carries the state —
							// the same treatment the fatigue pips use.
							icon={
								<Box sx={{ display: 'flex', color: 'text.disabled', opacity: 0.55 }}>
									<StatSigil name="resolve" size="0.85rem" />
								</Box>
							}
							checkedIcon={
								<Box sx={{ display: 'flex', color: UI_COLORS.resolve }}>
									<StatSigil name="resolve" size="0.85rem" />
								</Box>
							}
							checked={index < resolve}
							onChange={() => handleResolveChange(index)}
							sx={{ p: 0.25 }}
						/>
				))}
			</Box>
		</CharacterSheetCard>
	)
}
