import { Divider, Typography } from '@mui/material';
import { PlayingCard, setFontSizeClass } from '@site/src/components/PlayingCard';
import parse from 'html-react-parser';
import React from 'react';
import { CombatArt } from "src/types/CombatArt";

export const CombatArtCard: React.FC<CombatArt> = ({ name, weapons, effect }) => {
  return (
    <PlayingCard>
      <Typography variant="h5" fontWeight="bold" sx={{ alignSelf: 'center', mb: '2px' }}>{name}</Typography>
      <Typography variant="caption" sx={{ alignSelf: 'center' }}>{weapons}</Typography>
      <Divider sx={{ mb: 1 }} />
      <Typography variant="body1" className={setFontSizeClass(effect)}>{parse(effect)}</Typography>
    </PlayingCard>
  );
};
