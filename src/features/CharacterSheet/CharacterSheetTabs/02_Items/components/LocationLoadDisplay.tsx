import React from 'react'
import { TextField } from '@mui/material'
import {
	MetaBand,
	MetaBandField,
	MetaBandLabel,
	MetaBandNote,
	MetaBandValue,
	metaBandInputClass,
	metaBandInputSx,
} from '../../../components'
import { ItemLocation } from '../../../../../types/ItemLocation'
import { useFieldDraft } from '../../../hooks/useFieldDraft'
import { UI_COLORS } from '../../../../../utils/colors'

interface LocationLoadDisplayProps {
	location: ItemLocation
	name: string
	currentLoad: number
	maxLoad: number
	onNameChange: (name: string) => void
	onMaxLoadChange: (maxLoad: number) => void
}

const loadTone = (currentLoad: number, maxLoad: number) => {
	if (maxLoad > 0) {
		if (currentLoad >= maxLoad) return UI_COLORS.danger
		if (currentLoad >= maxLoad * 0.8) return UI_COLORS.warning
	}
	return undefined
}

/**
 * What a storage section is carrying — the section's own meta band (M13 S4, S4d).
 *
 * ## Why this stopped being two cards
 *
 * "On Mount" and "In Storage" opened with two `SheetField` tiles — a name card and
 * a load card — floating above the list. Three problems, all the same problem: a
 * framed card inside a section that already has a frame is the box-inside-a-box the
 * theme spends its time removing; two tiles side by side read as a dashboard rather
 * than as an inventory; and they said nothing about the rows beneath them, so they
 * looked like leftovers rather than like a heading.
 *
 * They are facts *about the section*, so they read as one line above its rows. The
 * fields are still fields — the name and the capacity are both editable, and both
 * keep the slot on hover and focus — but at rest the line reads as a sentence.
 *
 * ## The SUB rank, not its own idiom (S4d, owner review)
 *
 * This is {@link MetaBand} at `sub`: the same band as the tab's purse strip, one
 * rank down, because it is the same kind of statement about a smaller thing. The
 * rank drops the values to the 15px scan step, keeps 11px labels, lightens the wash
 * and keyline, removes the inset second keyline (the purse's rank marker), and caps
 * the band at the ledger's measure — unbounded, the two groups were pushed to
 * opposite ends of a 1049px row and "Load 0 / 0" read as a fragment unrelated to
 * the name 600px to its left.
 */
export const LocationLoadDisplay: React.FC<LocationLoadDisplayProps> = ({
	location,
	name,
	currentLoad,
	maxLoad,
	onNameChange,
	onMaxLoadChange,
}) => {
	const nameDraft = useFieldDraft(name, onNameChange)
	const maxDraft = useFieldDraft(maxLoad, onMaxLoadChange)
	const isMount = location === 'mount'
	const tone = loadTone(currentLoad, maxLoad)

	return (
		<MetaBand variant="sub">
			{/* `minWidth: 0` so the field can actually shrink — a flex item defaults to
				its content's min-width, and the field's is an `<input>`'s twenty
				characters. */}
			<MetaBandField sx={{ flexGrow: 1, minWidth: 0 }}>
				<MetaBandLabel sigil={isMount ? 'location-mount' : 'location-storage'}>
					{isMount ? 'Mount' : 'Storage'}
				</MetaBandLabel>
				{/* The name is prose, so it takes the band's TEXT class: the value class
					carries bold tabular figures, and "Kesh's mule" set in figure weight
					reads as a total. */}
				<TextField
					className={metaBandInputClass.text}
					variant="standard"
					size="small"
					value={nameDraft.value}
					onChange={(event) => nameDraft.onChange(event.target.value)}
					onBlur={nameDraft.onBlur}
					placeholder={isMount ? 'Mount name' : 'Storage location'}
					inputProps={{
						'aria-label': isMount ? 'Mount name' : 'Storage location',
					}}
					sx={{ ...metaBandInputSx, flex: '1 1 6rem', maxWidth: '12rem' }}
				/>
			</MetaBandField>
			{/* `nowrap`: "Load 0 / 8" is one reading and must not break across lines,
				which it did as soon as the name field claimed the row's slack. */}
			<MetaBandField nowrap>
				<MetaBandLabel sigil="load">Load</MetaBandLabel>
				<MetaBandValue tone={tone}>{currentLoad}</MetaBandValue>
				<MetaBandNote>/</MetaBandNote>
				<TextField
					className={metaBandInputClass.value}
					type="number"
					variant="standard"
					size="small"
					value={maxDraft.value}
					onChange={(event) => maxDraft.onChange(Number(event.target.value))}
					onBlur={maxDraft.onBlur}
					inputProps={{ min: 0, 'aria-label': 'Load capacity' }}
					sx={{
						...metaBandInputSx,
						width: '3.25rem',
						'& input': { padding: '0 4px', textAlign: 'center' },
					}}
				/>
			</MetaBandField>
		</MetaBand>
	)
}
