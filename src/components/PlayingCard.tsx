import { Box, BoxProps, Typography } from '@mui/material'
import React from 'react'
import './playingCardStyles.css'
import { CardFrame } from './CardFrame'

export const PlayingCard: React.FC<BoxProps> = ({ children }) => {
  return (
    <Box className="playing-card--card">
      <CardFrame />
      <Box className="playing-card--card__inner">
        <Box className="playing-card--content">{children}</Box>
        <Typography className="playing-card--copyright" variant="caption">
          ©{new Date().getFullYear()} Nexus RPG
        </Typography>
      </Box>
    </Box>
  )
}
