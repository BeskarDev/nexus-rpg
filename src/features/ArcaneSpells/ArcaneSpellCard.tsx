import { Avatar, Box, Divider, Typography } from '@mui/material'
import { PlayingCard } from '@site/src/components/PlayingCard'
import { ArcaneSpell } from '@site/src/types/ArcaneSpell'
import parse from 'html-react-parser'
import React from 'react'

const setFontSizeClass = (effect: string, heightened: string) => {
  const text = effect.concat(heightened)
  if (text.length <= 350) {
    return 'text-size--lg'
  } else if (text.length <= 550) {
    return 'text-size--md'
  } else if (text.length <= 800) {
    return 'text-size--sm'
  } else if (text.length <= 1000) {
    return 'text-size--xs'
  }
  return 'text-size--xxs'
}

export const ArcaneSpellCard: React.FC<ArcaneSpell> = ({
  name,
  focus,
  rank,
  discipline,
  target,
  range,
  properties,
  effect,
  heightened = '-',
}) => {
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
          {focus}
        </Avatar>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            flexGrow: 1,
            alignSelf: 'center',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
        >
          {name}
        </Typography>
        <Box sx={{ width: '24px' }} />
      </Box>
      <Typography
        variant="body2"
        sx={{ alignSelf: 'center', mx: '-8px', mt: '-2px' }}
      >
        Rank {rank} {discipline}, {target}, {range}
      </Typography>
      {properties !== '-' && (
        <Typography
          variant="body2"
          sx={{ alignSelf: 'center', mt: 0.25, mx: '-8px' }}
        >
          {properties}
        </Typography>
      )}
      <Divider sx={{ mb: 0.5 }} />
      <Typography
        variant="body1"
        className={setFontSizeClass(effect, heightened)}
      >
        {parse(effect.replace('<br/><br/>', '<br/>'))}
      </Typography>
      {heightened !== '-' && (
        <>
          <Divider sx={{ my: 0.5 }} />
          <Typography
            variant="body1"
            className={setFontSizeClass(effect, heightened)}
          >
            {parse(heightened)}
          </Typography>
        </>
      )}
    </PlayingCard>
  )
}
