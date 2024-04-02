import React from 'react'
import { CombatArt } from "src/types/CombatArt";
import parse from 'html-react-parser';
import { Box, Card, Divider, Typography } from '@mui/material';

export const PlayingCard: React.FC<CombatArt> = ({ name, weapons, effect }) => {
  return (
    <div className="combat-art--card">
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold">{name}</Typography>
        <Typography variant="caption">{weapons}</Typography>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="body1">{parse(effect)}</Typography>
      </Box>
      <Typography variant="caption" sx={{ ml: 'auto' }}>©{new Date().getFullYear()} Nexus RPG</Typography>
    </div>
  );
};
