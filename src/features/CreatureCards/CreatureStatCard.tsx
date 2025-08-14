import { Avatar, Box, Divider, Typography } from '@mui/material'
import { PlayingCard } from '@site/src/components/PlayingCard'
import { Creature } from '@site/src/types/Creature'
import React from 'react'

const setFontSizeClass = (content: string) => {
  if (content.length <= 200) {
    return 'text-size--lg'
  } else if (content.length <= 350) {
    return 'text-size--md'
  } else if (content.length <= 550) {
    return 'text-size--sm'
  } else if (content.length <= 800) {
    return 'text-size--xs'
  }
  return 'text-size--xxs'
}

export const CreatureStatCard: React.FC<Creature> = ({
  name,
  tier,
  category,
  type,
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
}) => {
  const statsContent = `HP ${hp}, AV ${av} | STR ${str}, AGI ${agi}, SPI ${spi}, MND ${mnd} | P ${parry}, D ${dodge}, R ${resist}`
  const skillsText = skills.length > 0 ? skills.join(', ') : '-'
  const immunitiesText = immunities.length > 0 ? immunities.join(', ') : '-'
  const resistancesText = resistances.length > 0 ? resistances.join(', ') : '-'
  const weaknessesText = weaknesses.length > 0 ? weaknesses.join(', ') : '-'
  
  const allContent = `${statsContent} ${skillsText} ${immunitiesText} ${resistancesText} ${weaknessesText}`

  return (
    <PlayingCard>
      <Box
        sx={{
          mb: '2px',
          mx: '-8px',
          display: 'flex',
          gap: 1,
          justifyContent: 'space-between',
        }}
      >
        <Avatar
          sx={{
            width: 26,
            height: 26,
            bgcolor: 'black',
            alignSelf: 'left',
            fontWeight: 'bold',
            lineHeight: 1.25,
            fontSize: '12pt',
          }}
        >
          {tier}
        </Avatar>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            flexGrow: 1,
            alignSelf: 'center',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </Typography>
        <Box sx={{ width: '24px' }} />
      </Box>
      <Typography
        variant="body1"
        sx={{ 
          alignSelf: 'center', 
          mx: '-8px', 
          mt: '-4px', 
          fontSize: '8px', 
          lineHeight: 1.1,
          textAlign: 'center'
        }}
      >
        {type} ({category})
      </Typography>
      <Divider sx={{ mb: 0.5 }} />
      
      <Typography
        variant="body1"
        className={setFontSizeClass(allContent)}
        sx={{ mb: 0.5 }}
      >
        <strong>HP</strong> {hp} | <strong>AV</strong> {av}
      </Typography>
      
      <Typography
        variant="body1"
        className={setFontSizeClass(allContent)}
        sx={{ mb: 0.5 }}
      >
        <strong>STR</strong> {str} | <strong>AGI</strong> {agi} | <strong>SPI</strong> {spi} | <strong>MND</strong> {mnd}
      </Typography>
      
      <Typography
        variant="body1"
        className={setFontSizeClass(allContent)}
        sx={{ mb: 0.5 }}
      >
        <strong>Parry</strong> {parry} | <strong>Dodge</strong> {dodge} | <strong>Resist</strong> {resist}
      </Typography>
      
      <Divider sx={{ my: 0.5 }} />
      
      <Typography
        variant="body1"
        className={setFontSizeClass(allContent)}
        sx={{ mb: 0.25 }}
      >
        <strong>Skills:</strong> {skillsText}
      </Typography>
      
      {immunities.length > 0 && (
        <Typography
          variant="body1"
          className={setFontSizeClass(allContent)}
          sx={{ mb: 0.25 }}
        >
          <strong>Immunities:</strong> {immunitiesText}
        </Typography>
      )}
      
      {resistances.length > 0 && (
        <Typography
          variant="body1"
          className={setFontSizeClass(allContent)}
          sx={{ mb: 0.25 }}
        >
          <strong>Resistances:</strong> {resistancesText}
        </Typography>
      )}
      
      {weaknesses.length > 0 && (
        <Typography
          variant="body1"
          className={setFontSizeClass(allContent)}
          sx={{ mb: 0.25 }}
        >
          <strong>Weaknesses:</strong> {weaknessesText}
        </Typography>
      )}
    </PlayingCard>
  )
}
