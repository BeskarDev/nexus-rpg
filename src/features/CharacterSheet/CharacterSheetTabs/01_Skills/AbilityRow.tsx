import React, { useEffect, useState } from 'react'
import { useFieldDraft } from '../../hooks/useFieldDraft'
import { Ability } from '@site/src/types/Character'
import { AbilityTag } from '@site/src/types/AbilityTag'
import { ActionType } from '@site/src/types/ActionType'
import { UnifiedListItem } from '@site/src/features/CharacterSheet/components/DynamicList'
import { AbilitySummary, AbilityDetails } from './components'

export type AbilityRowProps = {
	title: string
	description: string
	tag?: AbilityTag
	actionType?: ActionType
	rank?: number
	skill?: string
	availableTags: AbilityTag[]
	updateAbility: (update: Partial<Ability>) => void
	moveToCategory: (newTag: AbilityTag) => void
	deleteAbility: () => void
	abilityId: string
	isInQuickRef?: boolean
	onToggleQuickRef?: (abilityId: string) => void
}

export const AbilityRow: React.FC<AbilityRowProps> = ({
	title: initialTitle,
	description: initialDescription,
	tag,
	actionType: initialActionType,
	rank: initialRank,
	skill: initialSkill,
	availableTags,
	updateAbility,
	moveToCategory,
	deleteAbility,
	abilityId,
	isInQuickRef = false,
	onToggleQuickRef,
}) => {
	// M9 S11: title and description are the two fields that edit locally and
	// commit on blur, so they take the shared `useFieldDraft` (which also
	// re-seeds them when the ability changes externally — the "refresh from
	// rulebook" bulk update — instead of the row keeping stale mounted values).
	const title = useFieldDraft(initialTitle, (value) =>
		updateAbility({ title: value }),
	)
	const description = useFieldDraft(initialDescription, (value) =>
		updateAbility({ description: value }),
	)

	// The remaining three are NOT drafts: each commits immediately on change and
	// keeps a local mirror only so the control reflects the choice at once. They
	// keep their own sync effect rather than being forced into the draft shape.
	const [actionType, setActionType] = useState<ActionType>(
		initialActionType || 'Other',
	)
	const [rank, setRank] = useState<number>(initialRank || 1)
	const [skill, setSkill] = useState<string | undefined>(initialSkill)

	useEffect(() => {
		setActionType(initialActionType || 'Other')
		setRank(initialRank || 1)
		setSkill(initialSkill)
	}, [initialActionType, initialRank, initialSkill])

	const handleActionTypeChange = (newActionType: ActionType) => {
		setActionType(newActionType)
		updateAbility({ actionType: newActionType })
	}

	const handleRankChange = (newRank: number) => {
		setRank(newRank)
		updateAbility({ rank: newRank })
	}

	const handleSkillChange = (newSkill: string | undefined) => {
		setSkill(newSkill)
		updateAbility({ skill: newSkill || undefined })
	}

	return (
		<UnifiedListItem
			summaryContent={
				<AbilitySummary
					title={title.value}
					actionType={actionType}
					tag={tag}
					rank={rank}
					skill={skill}
					onTitleChange={title.onChange}
					onTitleBlur={title.onBlur}
				/>
			}
			detailsContent={
				<AbilityDetails
					description={description.value}
					actionType={actionType}
					tag={tag}
					rank={rank}
					skill={skill}
					availableTags={availableTags}
					abilityId={abilityId}
					isInQuickRef={isInQuickRef}
					onDescriptionChange={description.onChange}
					onDescriptionBlur={description.onBlur}
					onActionTypeChange={handleActionTypeChange}
					onRankChange={handleRankChange}
					onSkillChange={handleSkillChange}
					onMoveCategory={moveToCategory}
					onDelete={deleteAbility}
					onToggleQuickRef={onToggleQuickRef}
				/>
			}
		/>
	)
}
