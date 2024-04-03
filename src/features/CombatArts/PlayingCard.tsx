import React from 'react'
import { CombatArt } from "src/types/CombatArt";
import parse from 'html-react-parser';
import { Box, Card, Divider, Typography } from '@mui/material';

export const PlayingCard: React.FC<CombatArt> = ({ name, weapons, effect }) => {
  return (
    <div className="combat-art--card">
      <div className="combat-art--card__inner">
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" fontWeight="bold">{name}</Typography>
          <Typography variant="caption">{weapons}</Typography>
          <Divider sx={{ mb: 1 }} />
          <Typography className={effect.length >= 600 ? 'small-text' : ''} variant="body1">{parse(effect)}</Typography>
        </Box>
        <Typography variant="caption" sx={{ ml: 'auto', mr: -1, mb: -1, fontSize: '6px !important' }}>
          ©{new Date().getFullYear()} Nexus RPG
        </Typography>
      </div>
    </div>
  );
};
