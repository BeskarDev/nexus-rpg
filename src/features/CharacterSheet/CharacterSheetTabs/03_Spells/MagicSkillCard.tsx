import React from 'react'
import { AutoFixHigh } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader, CardContent } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

interface MagicSkillCardProps {
	magicSkill: string
}

export const MagicSkillCard: React.FC<MagicSkillCardProps> = ({ magicSkill }) => {
	return (
		<CharacterSheetCard
			header={<CardHeader icon={<AutoFixHigh />} label="Magic" color={UI_COLORS.purple} />}
			tooltip="Your primary magic tradition (Arcana or Mysticism)"
			minWidth="5rem"
		>
			<CardContent value={magicSkill || '—'} />
		</CharacterSheetCard>
	)
}
