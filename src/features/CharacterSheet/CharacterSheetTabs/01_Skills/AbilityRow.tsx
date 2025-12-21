import React, { useState } from 'react'
import { Ability } from '@site/src/types/Character'
import { AbilityTag } from '@site/src/types/AbilityTag'
import { ActionType } from '@site/src/types/ActionType'
import { UnifiedListItem } from '@site/src/components/DynamicList'
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
	const [title, setTitle] = useState(initialTitle)
	const [description, setDescription] = useState(initialDescription)
	const [actionType, setActionType] = useState<ActionType>(
		initialActionType || 'Other',
	)
	const [rank, setRank] = useState<number>(initialRank || 1)
	const [skill, setSkill] = useState<string | undefined>(initialSkill)

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
					title={title}
					actionType={actionType}
					tag={tag}
					rank={rank}
					skill={skill}
					onTitleChange={setTitle}
					onTitleBlur={() => updateAbility({ title })}
				/>
			}
			detailsContent={
				<AbilityDetails
					description={description}
					actionType={actionType}
					tag={tag}
					rank={rank}
					skill={skill}
					availableTags={availableTags}
					abilityId={abilityId}
					isInQuickRef={isInQuickRef}
					onDescriptionChange={setDescription}
					onDescriptionBlur={() => updateAbility({ description })}
					onActionTypeChange={handleActionTypeChange}
					onRankChange={handleRankChange}
					onSkillChange={handleSkillChange}
					onMoveCategory={moveToCategory}
					onDelete={deleteAbility}
					onToggleQuickRef={onToggleQuickRef}
				/>
			}
			reverseIcon={false}
			summarySx={{
				pl: 0,
				alignItems: 'center',
			}}
		/>
	)
}
