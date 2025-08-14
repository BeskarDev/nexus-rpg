import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { Attack, Ability } from '@site/src/types/Creature'

const setFontSizeClass = (content: string) => {
  // More aggressive font scaling - reduce size more quickly to better fill dedicated cards
  // This helps dedicated ability cards use more appropriate smaller font sizes
  if (content.length <= 200) {
    return 'text-size--lg'    // 9pt - comfortable reading for very short content
  } else if (content.length <= 350) {
    return 'text-size--md'    // 8pt - good readability
  } else if (content.length <= 550) {
    return 'text-size--sm'    // 7pt - acceptable
  } else if (content.length <= 750) {
    return 'text-size--xs'    // 6pt - minimum comfortable size
  }
  return 'text-size--xxs'     // 5.5pt - emergency fallback
}

interface DetailCardContentProps {
  cardType: 'attacks' | 'abilities'
  attacks?: Attack[]
  abilities?: Ability[]
}

export const DetailCardContent: React.FC<DetailCardContentProps> = ({
  cardType,
  attacks = [],
  abilities = [],
}) => {
  const isAttacks = cardType === 'attacks'
  const items = isAttacks ? attacks : abilities
  const allContent = items.map(item => 
    isAttacks 
      ? `${(item as Attack).name} ${(item as Attack).damage} ${(item as Attack).description || ''}`
      : `${(item as Ability).name} ${(item as Ability).description}`
  ).join(' ')

  return (
    <>
      {isAttacks ? (
        // Render attacks
        attacks.map((attack, index) => (
          <Box key={index} sx={{ mb: index < attacks.length - 1 ? 0.8 : 0 }}>
            <Typography
              variant="body1"
              className={setFontSizeClass(allContent)}
              sx={{ fontWeight: 'bold', mb: 0.2 }}
            >
              {attack.name}
              {attack.properties.length > 0 && (
                <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>
                  {' '}({attack.properties.join(', ')})
                </span>
              )}
            </Typography>
            
            <Typography
              variant="body1"
              className={setFontSizeClass(allContent)}
              sx={{ mb: attack.description ? 0.25 : 0 }}
            >
              {attack.damage}
            </Typography>
            
            {attack.description && (
              <Typography
                variant="body1"
                className={setFontSizeClass(allContent)}
              >
                {attack.description}
              </Typography>
            )}
            
            {index < attacks.length - 1 && <Divider sx={{ mt: 0.5 }} />}
          </Box>
        ))
      ) : (
        // Render abilities
        abilities.map((ability, index) => (
          <Box key={index} sx={{ mb: index < abilities.length - 1 ? 0.8 : 0 }}>
            <Typography
              variant="body1"
              className={setFontSizeClass(allContent)}
              sx={{ fontWeight: 'bold', mb: 0.2 }}
            >
              {ability.name}
              {ability.recharge && (
                <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>
                  {' '}({ability.recharge})
                </span>
              )}
            </Typography>
            
            <Typography
              variant="body1"
              className={setFontSizeClass(allContent)}
              sx={{ mb: 0 }}
            >
              {ability.description}
            </Typography>
            
            {index < abilities.length - 1 && <Divider sx={{ mt: 0.4, mb: 0.4 }} />}
          </Box>
        ))
      )}
    </>
  )
}
