import { Box, Typography } from '@mui/material'
import React from 'react'
import { PlayingCard } from '@site/src/components/PlayingCard'
import SwordsIcon from '@mui/icons-material/Sports'
import StarIcon from '@mui/icons-material/Star'
import CrownIcon from '@mui/icons-material/WorkspacePremium'

interface BaseCreatureCardProps {
  name: string
  tier: number
  category: string
  type: string
  size?: 'compact' | 'detail'
  children: React.ReactNode
}

const getTypeIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'basic': return <SwordsIcon sx={{ fontSize: '8pt', color: '#666' }} />
    case 'elite': return <StarIcon sx={{ fontSize: '8pt', color: '#d4af37' }} />
    case 'lord': return <CrownIcon sx={{ fontSize: '8pt', color: '#8b0000' }} />
    default: return <SwordsIcon sx={{ fontSize: '8pt', color: '#666' }} />
  }
}

export const BaseCreatureCard: React.FC<BaseCreatureCardProps> = ({
  name,
  tier,
  category,
  type,
  size = 'compact',
  children,
}) => {
  const typeIcon = getTypeIcon(category)

  return (
    <PlayingCard>
      <Box sx={{ p: 1, height: '100%', overflow: 'hidden' }}>
        
        {/* Header: Name, Tier, Type Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.6 }}>
          <Typography sx={{ fontSize: '8pt !important', fontWeight: 600, lineHeight: 1, flex: 1 }}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: '7pt !important', opacity: 0.8 }}>
            T{tier}
          </Typography>
          {typeIcon}
        </Box>

        {/* Subtitle */}
        <Typography sx={{ fontSize: '6pt !important', mb: 0.8, opacity: 0.7, lineHeight: 1 }}>
          {type}
        </Typography>

        {/* Content */}
        {children}

      </Box>
    </PlayingCard>
  )
}
