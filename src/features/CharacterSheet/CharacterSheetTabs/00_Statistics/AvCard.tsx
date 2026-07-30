import { useMemo } from 'react'
import { SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Typography, Box } from '@mui/material'
import React from 'react'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { SheetField, DerivedPart } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

export const AvCard = () => {
	const dispatch = useAppDispatch()
	const { av } = useAppSelector(
		(state) => state.characterSheet.activeCharacter.statistics,
	)

	const totalAV: number = useMemo(
		() => av.armor + av.helmet + av.shield + (av.auto || 0) + av.other,
		[av.armor, av.helmet, av.shield, av.auto, av.other],
	)

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const setPart = (part: 'armor' | 'helmet' | 'shield' | 'other') => (value: number) =>
		updateCharacter({ statistics: { av: { [part]: value } } })

	return (
		<SheetField
			label="AV"
			sigil="av"
			tone={UI_COLORS.greyBlue}
			// M9 S6: read often, edited almost never — so it sits in the defence
			// band with no keyline or wash of its own.
			weight="band"
			minWidth="4rem"
			maxWidth="5rem"
			info="Armor Value: Damage reduction from armor, helmet, and shield"
			value={totalAV}
			editorWidth="17.5rem"
			editor={
				<>
					<SectionHeader>AV Calculator</SectionHeader>
					<Typography variant="subtitle2">
						Set the individual sources of AV.
					</Typography>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
						<DerivedPart value={av.armor} label="Armor" onChange={setPart('armor')} />
						<DerivedPart value={av.helmet} label="Helmet" onChange={setPart('helmet')} />
						<DerivedPart value={av.shield} label="Shield" onChange={setPart('shield')} />
						<DerivedPart value={av.other} label="Other" onChange={setPart('other')} />
						<DerivedPart auto value={av.auto || 0} label="Auto" sx={{ width: '4rem' }} />
					</Box>
				</>
			}
		/>
	)
}
