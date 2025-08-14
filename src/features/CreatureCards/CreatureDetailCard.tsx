import React from 'react'
import { Ability, Attack } from '@site/src/types/Creature'
import { BaseCreatureCard } from './BaseCreatureCard'
import { DetailCardContent } from './DetailCardContent'

interface CreatureDetailCardProps {
  creatureName: string
  tier: number
  cardType: 'attacks' | 'abilities'
  attacks?: Attack[]
  abilities?: Ability[]
  partNumber?: number
  totalParts?: number
}

export const CreatureDetailCard: React.FC<CreatureDetailCardProps> = ({
  creatureName,
  tier,
  cardType,
  attacks = [],
  abilities = [],
  partNumber,
  totalParts,
}) => {
  const typeText = cardType === 'attacks' ? 'Attacks' : 'Abilities'
  const displayType = (partNumber && totalParts && totalParts > 1) 
    ? `${typeText} (${partNumber}/${totalParts})`
    : typeText

  return (
    <BaseCreatureCard
      name={creatureName}
      tier={tier}
      category="basic" // Default category for detail cards
      type={displayType}
      size="detail"
    >
      <DetailCardContent
        cardType={cardType}
        attacks={attacks}
        abilities={abilities}
      />
    </BaseCreatureCard>
  )
}
