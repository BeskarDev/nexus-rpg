import React from 'react'
import StatSigil from '@site/src/components/codex/StatSigil'
import { CharacterSheetCard, CardHeader, CardContent } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

interface MagicSkillCardProps {
	magicSkill: string
}

export const MagicSkillCard: React.FC<MagicSkillCardProps> = ({ magicSkill }) => {
	return (
		<CharacterSheetCard
			header={<CardHeader icon={<StatSigil name="magic" size="1.15em" />} label="Magic" color={UI_COLORS.purple} />}
			info="Your primary magic tradition (Arcana or Mysticism)"
			minWidth="7rem"
		>
			<CardContent value={magicSkill || '—'} />
		</CharacterSheetCard>
	)
}
