import React from 'react'
import { TextField } from '@mui/material'
import {
	MetaBand,
	MetaBandField,
	MetaBandLabel,
	MetaBandNote,
	MetaBandValue,
	RuleInfo,
	SheetInput,
	metaBandInputClass,
	metaBandInputSx,
} from '../../../components'
import { UI_COLORS } from '../../../../../utils/colors'
import { CharacterDocument } from '../../../../../types/Character'
import { DeepPartial } from '../../../CharacterSheetContainer'

interface ItemsHeaderProps {
	coins: number
	currentLoad: number
	carryCapacity: number
	maxCapacity: number
	carryModifier: number
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

const loadTone = (
	currentLoad: number,
	carryCapacity: number,
	maxCapacity: number,
) => {
	if (currentLoad >= maxCapacity) return UI_COLORS.danger
	if (currentLoad >= carryCapacity) return UI_COLORS.warning
	return undefined
}

/**
 * The purse and the encumbrance, as the Items tab's own meta band (M13 S4b, S4d).
 *
 * ## Why these stopped being cards
 *
 * Same reason "On Mount" and "In Storage" did in S4: they were two framed tiles
 * floating above the list, and by the end of that slice they were the last pair on
 * the tab. They are facts about the whole inventory, so they read as a line under
 * the inventory's own heading rather than as tiles above it.
 *
 * ## Why a BAND and not a caption (S4d, owner review)
 *
 * The first version of that line sat in the same register as a location's "Mount
 * name" caption, and the owner's report was that you look straight past it — those
 * are labels on a row inside a section, while coins and load are the two numbers
 * the tab exists to answer. The band is the promoted rank of the same idiom.
 *
 * Every font, size, sigil scale and line box now comes from {@link MetaBand}, which
 * is why this file declares none: the sub-header rank was built by copying this
 * component's `Box` tree, and the copy is what let the two drift.
 *
 * ## The doubled gloss mark
 *
 * `LoadCard` carried a `RuleInfo` about load, and this header carried a second one
 * about encumbrance, side by side — two marks explaining two halves of one rule,
 * which is why they read as a stutter. One mark now, carrying both.
 */
export const ItemsHeader: React.FC<ItemsHeaderProps> = ({
	coins,
	currentLoad,
	carryCapacity,
	maxCapacity,
	carryModifier,
	updateCharacter,
}) => {
	const tone = loadTone(currentLoad, carryCapacity, maxCapacity)

	return (
		<MetaBand>
			<MetaBandField>
				<MetaBandLabel sigil="coins">Coins</MetaBandLabel>
				<TextField
					className={metaBandInputClass.value}
					type="number"
					variant="standard"
					size="small"
					value={coins}
					onChange={(event) =>
						updateCharacter({ items: { coins: Number(event.target.value) } })
					}
					inputProps={{ min: 0, 'aria-label': 'Coins' }}
					sx={{ ...metaBandInputSx, width: '5.5rem' }}
				/>
			</MetaBandField>

			{/* `nowrap`: "Load 2/11 max 22" is one reading and must not break. */}
			<MetaBandField nowrap>
				<MetaBandLabel sigil="load">Load</MetaBandLabel>
				<MetaBandValue tone={tone}>
					{currentLoad}/{carryCapacity}
				</MetaBandValue>
				<MetaBandNote>max {maxCapacity}</MetaBandNote>
				<RuleInfo label="About load and encumbrance">
					<>
						Carrying capacity is ½ STR + 8, plus your carry modifier. At or above it
						you are <b>encumbered</b>: +1 bane on Strength and Agility rolls for any
						kind of movement, no Dash Action or Evade Quick Action, and +1 Fatigue
						whenever you suffer Fatigue during travel. You can never physically
						carry more than 2 x your carrying capacity.
					</>
				</RuleInfo>
			</MetaBandField>

			<MetaBandField>
				<MetaBandLabel>Carry Mod</MetaBandLabel>
				<SheetInput
					className={metaBandInputClass.value}
					type="number"
					variant="standard"
					size="small"
					value={carryModifier}
					onChange={(event) =>
						updateCharacter({
							items: {
								encumbrance: { carryModifier: Number(event.target.value) },
							},
						})
					}
					inputProps={{ 'aria-label': 'Carry modifier' }}
					sx={{ ...metaBandInputSx, width: '3.5rem', maxWidth: 'none' }}
				/>
			</MetaBandField>
		</MetaBand>
	)
}
