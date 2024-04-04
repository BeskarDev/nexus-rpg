import { Box, BoxProps, Typography } from '@mui/material';
import React from 'react';
import './playingCardStyles.css';
import { CardFrame } from './CardFrame';

export const setFontSizeClass = (text: string) => {
  if (text.length <= 400) {
    return 'text-size--md' // 9pt
  } else if (text.length <= 500) {
    return 'text-size--sm' // 8pt
  } 
  return 'text-size--xs' // 7pt
}

export const PlayingCard: React.FC<BoxProps> = ({ children }) => {
  return (
    <Box className="playing-card--card">
      <CardFrame />
      <Box className="playing-card--card__inner">
        <Box className="playing-card--content">
          {children}
        </Box>
        <Typography className="playing-card--copyright" variant="caption">
          ©{new Date().getFullYear()} Nexus RPG
        </Typography>
      </Box>
    </Box>
  );
};
