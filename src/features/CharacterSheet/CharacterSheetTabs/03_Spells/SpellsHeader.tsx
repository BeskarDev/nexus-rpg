import React from 'react'
import { TextField } from '@mui/material'
import {
	MetaBand,
	MetaBandField,
	MetaBandLabel,
	MetaBandValue,
	RuleInfo,
	metaBandInputClass,
	metaBandInputSx,
} from '../../components'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { FocusField } from './FocusField'

export type SpellsHeaderProps = {
	magicSkill: string
	specialization: string
	spellCatalystDamage: number
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

/**
 * The Spells tab's own meta band: what kind of caster you are, and what you cast with
 * (M13 S5, owner review).
 *
 * ## Why these stopped being cards
 *
 * Four framed tiles floating above the list — magic skill, specializations, catalyst,
 * focus — which is precisely the arrangement the Items tab retired in S4b. They are
 * facts about the whole tab, so they read as one bounded line under its heading. Same
 * `MetaBand`, same rank, so the two tabs open the same way; the owner's instruction was
 * to make this work like the Items header, and the shortest route to that is to use the
 * component the Items header is.
 *
 * Focus keeps its editor (see `FocusField`) because spending focus is a mid-play action;
 * everything else here is either read-only or a single value, which is what a band field
 * is for.
 */
export const SpellsHeader: React.FC<SpellsHeaderProps> = ({
	magicSkill,
	specialization,
	spellCatalystDamage,
	updateCharacter,
}) => (
	<MetaBand>
		<MetaBandField>
			<MetaBandLabel sigil="magic">Magic</MetaBandLabel>
			{/* Derived from the character's skills, not set here — a read value in a band
				is text, not a disabled field. */}
			<MetaBandValue>{magicSkill || '—'}</MetaBandValue>
			<RuleInfo label="About your magic skill">
				Your caster tradition, taken from whichever magic skill you have ranks in:
				<b> Arcana</b> for arcane spells, <b>Mysticism</b> for mystic ones.
			</RuleInfo>
		</MetaBandField>

		<MetaBandField>
			<MetaBandLabel sigil="specialization">Specialization</MetaBandLabel>
			<TextField
				className={metaBandInputClass.text}
				variant="standard"
				size="small"
				value={specialization}
				onChange={(event) =>
					updateCharacter({ spells: { specialization: event.target.value } })
				}
				placeholder="discipline or tradition"
				inputProps={{ 'aria-label': 'Specializations' }}
				sx={{ ...metaBandInputSx, flex: '1 1 8rem', maxWidth: '14rem' }}
			/>
		</MetaBandField>

		<MetaBandField nowrap>
			<MetaBandLabel sigil="catalyst">Catalyst</MetaBandLabel>
			<TextField
				className={metaBandInputClass.value}
				type="number"
				variant="standard"
				size="small"
				value={spellCatalystDamage || 0}
				onChange={(event) =>
					updateCharacter({
						spells: { spellCatalystDamage: parseInt(event.target.value) || 0 },
					})
				}
				inputProps={{ 'aria-label': 'Spell catalyst damage' }}
				sx={{ ...metaBandInputSx, width: '3.5rem' }}
			/>
			<RuleInfo label="About the spell catalyst">
				Bonus damage your catalyst adds per success level — counted once at weak,
				twice at strong and three times at critical, the same way a weapon die is.
			</RuleInfo>
		</MetaBandField>

		<FocusField />
	</MetaBand>
)
