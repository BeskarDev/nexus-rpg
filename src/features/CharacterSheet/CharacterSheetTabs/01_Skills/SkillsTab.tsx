import { HelpOutline } from '@mui/icons-material'
import {
	Box,
	Tooltip,
	Typography,
} from '@mui/material'
import React, { useMemo } from 'react'
import { CharacterDocument } from '../../../../types/Character'
import { AttributeField, SectionHeader } from '../../CharacterSheet'

import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { CategorizedAbilities } from './CategorizedAbilities'
import { SkillManagement } from './SkillManagement'
import { ProfessionManagement } from './ProfessionManagement'
import { LanguageManagement } from './LanguageManagement'
import { DEFAULT_LANGUAGE } from '../../../../constants/languages'

export const SkillsTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const {
		xp,
		skills,
		professions = [],
		languages = [DEFAULT_LANGUAGE],
	} = useMemo(() => activeCharacter.skills, [activeCharacter.skills])

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const spendXP = useMemo(() => {
		let newSpendXP = skills
			.map((s) => s.xp)
			.reduce((partialSum, a) => partialSum + a, 0)

		if (newSpendXP != xp.spend) {
			updateCharacter({ skills: { xp: { spend: newSpendXP } } })
		}
		return newSpendXP
	}, [activeCharacter])

	const selectedSkillNames = useMemo(
		() => skills.map((skill) => skill.name),
		[skills],
	)

	const hasCraftingSkill = useMemo(
		() => selectedSkillNames.includes('Crafting'),
		[selectedSkillNames],
	)

	const addSkill = (skillName: string) => {
		dispatch(characterSheetActions.addSkill(skillName))
	}

	const removeSkill = (skillName: string) => {
		dispatch(characterSheetActions.removeSkill(skillName))
	}

	const removeAllProfessions = () => {
		professions.forEach((profession) => {
			dispatch(characterSheetActions.removeProfession(profession))
		})
	}

	const addProfession = (professionName: string) => {
		if (hasCraftingSkill) {
			dispatch(characterSheetActions.addProfession(professionName))
		}
	}

	const removeProfession = (professionName: string) => {
		dispatch(characterSheetActions.removeProfession(professionName))
	}

	const addLanguage = (languageName: string) => {
		dispatch(characterSheetActions.addLanguage(languageName))
	}

	const removeLanguage = (languageName: string) => {
		if (languageName !== DEFAULT_LANGUAGE) {
			dispatch(characterSheetActions.removeLanguage(languageName))
		}
	}

	return (
		<Box p={2}>
			<SectionHeader title="Character Skills" />
			
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
				<Typography variant="h6">Experience Points</Typography>
				<Tooltip title="XP spent on skills">
					<HelpOutline color="action" />
				</Tooltip>
			</Box>
			
			<Box display="flex" gap={2} mb={3}>
				<AttributeField
					label="Total XP"
					value={xp.total}
					onChange={(newValue) =>
						updateCharacter({ skills: { xp: { total: newValue } } })
					}
				/>
				<AttributeField
					label="Spent XP"
					value={spendXP}
					disabled
				/>
				<AttributeField
					label="Available XP"
					value={xp.total - spendXP}
					disabled
				/>
			</Box>

			<SkillManagement
				skills={skills}
				onAddSkill={addSkill}
				onRemoveSkill={removeSkill}
				onRemoveProfessions={removeAllProfessions}
			/>

			<ProfessionManagement
				professions={professions}
				hasCraftingSkill={hasCraftingSkill}
				onAddProfession={addProfession}
				onRemoveProfession={removeProfession}
			/>

			<LanguageManagement
				languages={languages}
				onAddLanguage={addLanguage}
				onRemoveLanguage={removeLanguage}
			/>

			<CategorizedAbilities />
		</Box>
	)
}