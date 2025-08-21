import { AddCircle, ExpandMore, HelpOutline, Search } from '@mui/icons-material'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
	Tooltip,
} from '@mui/material'
import React, { useMemo, useState } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { CharacterDocument, Skill, Ability } from '../../../../types/Character'
import { AttributeField, SectionHeader } from '../../CharacterSheet'

import { DynamicList } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { CategorizedAbilities } from './CategorizedAbilities'
import { SkillRow } from './SkillRow'
import { CombatArtsSearchDialog } from './CombatArtsSearchDialog'

export const SkillsTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { xp, skills } = useMemo(
		() => activeCharacter.skills,
		[activeCharacter.skills],
	)
	const [combatArtsSearchOpen, setCombatArtsSearchOpen] = useState(false)

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

	const addNewSkill = () => {
		dispatch(characterSheetActions.addNewSkill())
	}

	const importCombatArts = (combatArts: Partial<Ability>[]) => {
		dispatch(characterSheetActions.importAbilities(combatArts))
	}

	const updateSkill = (update: Partial<Skill>, index: number) => {
		dispatch(characterSheetActions.updateSkill({ update, index }))
	}

	const deleteSkill = (skill: Skill) => {
		dispatch(characterSheetActions.deleteSkill(skill))
	}

	const onSkillReorder = ({ source, destination }: DropResult) => {
		// dropped outside the list
		if (!destination) return

		dispatch(
			characterSheetActions.reorderSkill({
				source: source.index,
				destination: destination.index,
			}),
		)
	}

	return (
		<Box
			sx={{
				display: 'flex',
				columnGap: { md: 4, sm: 2, xs: 1 },
				flexWrap: 'wrap',
			}}
		>
			<Box sx={{ mb: 2, maxWidth: '25rem' }}>
				<Box sx={{ mx: 'auto', display: 'flex' }}>
					<AttributeField
						size="small"
						type="number"
						value={xp.total}
						onChange={(event) =>
							updateCharacter({
								skills: { xp: { total: Number(event.target.value) } },
							})
						}
						label="Total XP"
						helperText=""
						sx={{ maxWidth: '7rem' }}
						inputProps={{
							sx: {
								textAlign: 'right',
							},
						}}
					/>
					<AttributeField
						size="small"
						disabled
						value={spendXP}
						label="Spend XP"
						helperText=""
						sx={{ maxWidth: '7rem' }}
					/>
				</Box>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<SectionHeader>Skills</SectionHeader>
					<Tooltip title="0-1 XP (rank 0), 2-5 XP (rank 1), 6-11 XP (rank 2), 12-19 XP (rank 3), 20-29 XP (rank 4), 30 XP (rank 5)">
						<HelpOutline fontSize="small" sx={{ mb: 0.75 }} />
					</Tooltip>
					<IconButton onClick={addNewSkill} sx={{ mb: 0.75 }}>
						<AddCircle />
					</IconButton>
				</Box>
				<DynamicList droppableId="skills" onDragEnd={onSkillReorder}>
					{skills.map((s, index) => (
						<DynamicListItem key={s.id} id={s.id} index={index}>
							<SkillRow
								skill={s}
								updateSkill={(update) => updateSkill(update, index)}
								deleteSkill={() => deleteSkill(s)}
							/>
						</DynamicListItem>
					))}
				</DynamicList>
			</Box>

			<CategorizedAbilities />
		</Box>
	)
}
