import { Box, Divider, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShieldIcon from '@mui/icons-material/Shield'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import PsychologyIcon from '@mui/icons-material/Psychology'
import SecurityIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/Speed'
import StarIcon from '@mui/icons-material/Star'
import React from 'react'

// Helper function to determine font size for skills and defensive properties
const getStatsFontSize = (skills: string[], immunities: string[], resistances: string[], weaknesses: string[], attacks?: any[], abilities?: any[]) => {
  // Calculate total content length for text-heavy stats sections
  const skillsContent = skills.join(', ')
  const defensiveContent = [...immunities, ...resistances, ...weaknesses].join(', ')
  
  // If attacks and abilities are provided (single card layout), consider total content
  if (attacks && abilities) {
    const attackContent = attacks.map(a => `${a.name} ${a.damage} ${a.description || ''}`).join(' ')
    const abilityContent = abilities.map(a => `${a.name} ${a.description}`).join(' ')
    const totalContent = skillsContent + defensiveContent + attackContent + abilityContent
    
    // More aggressive threshold for single card with everything
    if (totalContent.length > 400) {
      return '5.5pt'  // Use smallest size for content that might clip
    }
  } else {
    // For dedicated stats cards, only consider stats content
    const statsOnlyContent = skillsContent + defensiveContent
    if (statsOnlyContent.length > 150) {
      return '5.5pt'
    }
  }
  
  return '6pt'  // Keep existing size for most cases
}

interface CreatureStatsProps {
  hp: string // Can be a number like "50" or a pattern like "2×50" for elite/lord
  av: string
  str: string
  agi: string
  spi: string
  mnd: string
  parry: number
  dodge: number
  resist: number
  skills: string[]
  immunities: string[]
  resistances: string[]
  weaknesses: string[]
  // Optional props for single card layout consideration
  attacks?: any[]
  abilities?: any[]
}

// Simplify armor value descriptions to initials
const simplifyArmorValue = (av: string): string => {
  return av.replace(/\(([^)]+)\)/, (match, content) => {
    const simplified = content
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase())
      .join('')
    return `(${simplified})`
  })
}

export const CreatureStats: React.FC<CreatureStatsProps> = ({
  hp,
  av,
  str,
  agi,
  spi,
  mnd,
  parry,
  dodge,
  resist,
  skills,
  immunities,
  resistances,
  weaknesses,
  attacks,
  abilities,
}) => {
  const simplifiedAV = simplifyArmorValue(av)
  
  // Get dynamic font size for text-heavy sections, considering total content if single card
  const textFontSize = getStatsFontSize(skills, immunities, resistances, weaknesses, attacks, abilities)

  return (
    <>
      {/* Core Stats - HP and AV separate row */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        mb: 0.3,
        '& .stat-item': {
          display: 'flex',
          alignItems: 'center',
          gap: 0.3,
          justifyContent: 'center'
        }
      }}>
        <Box className="stat-item">
          <FavoriteIcon sx={{ fontSize: '10px', color: '#e74c3c' }} />
          <Typography sx={{ fontSize: '7pt !important' }}>{hp}</Typography>
        </Box>
        <Box className="stat-item">
          <ShieldIcon sx={{ fontSize: '10px', color: '#95a5a6' }} />
          <Typography sx={{ fontSize: '7pt !important' }}>{simplifiedAV}</Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 0.25 }} />

      {/* Four Attributes Grouped */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: 0.4, 
        mb: 0.25,
        '& .stat-item': {
          display: 'flex',
          alignItems: 'center',
          gap: 0.3,
          justifyContent: 'center'
        }
      }}>
        <Box className="stat-item">
          <FitnessCenterIcon sx={{ fontSize: '10px', color: '#8e44ad' }} />
          <Typography sx={{ fontSize: '7pt !important' }}>{str}</Typography>
        </Box>
        <Box className="stat-item">
          <DirectionsRunIcon sx={{ fontSize: '10px', color: '#27ae60' }} />
          <Typography sx={{ fontSize: '7pt !important' }}>{agi}</Typography>
        </Box>
        <Box className="stat-item">
          <AutoFixHighIcon sx={{ fontSize: '10px', color: '#f39c12' }} />
          <Typography sx={{ fontSize: '7pt !important' }}>{spi}</Typography>
        </Box>
        <Box className="stat-item">
          <PsychologyIcon sx={{ fontSize: '10px', color: '#3498db' }} />
          <Typography sx={{ fontSize: '7pt !important' }}>{mnd}</Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 0.25 }} />
      
      {/* Defense Stats Row */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        mb: 0.25,
        '& .stat-item': {
          display: 'flex',
          alignItems: 'center',
          gap: 0.3
        }
      }}>
        <Box className="stat-item">
          <SecurityIcon sx={{ fontSize: '9px', color: '#c0392b' }} />
          <Typography sx={{ fontSize: '7pt !important' }}>{parry}</Typography>
        </Box>
        <Box className="stat-item">
          <SpeedIcon sx={{ fontSize: '9px', color: '#2ecc71' }} />
          <Typography sx={{ fontSize: '7pt !important' }}>{dodge}</Typography>
        </Box>
        <Box className="stat-item">
          <StarIcon sx={{ fontSize: '9px', color: '#9b59b6' }} />
          <Typography sx={{ fontSize: '7pt !important' }}>{resist}</Typography>
        </Box>
      </Box>
      
      {/* Skills */}
      {skills.length > 0 && (
        <Typography sx={{ mb: 0.4, fontSize: `${textFontSize} !important`, lineHeight: 1.2 }}>
          <strong>Skills:</strong> {skills.join(', ')}
        </Typography>
      )}
      
      {/* Defensive Properties - Very Compact */}
      {(immunities.length > 0 || resistances.length > 0 || weaknesses.length > 0) && (
        <Box sx={{ mb: 0.5 }}>
          {immunities.length > 0 && (
            <Typography sx={{ mb: 0.1, fontSize: `${textFontSize} !important`, lineHeight: 1.1 }}>
              <strong>Immune:</strong> {immunities.join(', ')}
            </Typography>
          )}
          {resistances.length > 0 && (
            <Typography sx={{ mb: 0.1, fontSize: `${textFontSize} !important`, lineHeight: 1.1 }}>
              <strong>Resist:</strong> {resistances.join(', ')}
            </Typography>
          )}
          {weaknesses.length > 0 && (
            <Typography sx={{ mb: 0.1, fontSize: `${textFontSize} !important`, lineHeight: 1.1 }}>
              <strong>Weak:</strong> {weaknesses.join(', ')}
            </Typography>
          )}
        </Box>
      )}
    </>
  )
}
