import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PlayingCard } from './PlayingCard';
import { CombatArt } from '@site/src/types/CombatArt';
import combatArtsData from '../../utils/json/combat-arts.json';
import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import './combatArtStyles.css';
import { theme } from '@site/src/hooks/createTheme';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const CombatArtsGrid: React.FC = () => {
  const [selectedCombatArts, setSelectedCombatArts] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedCombatArts>) => {
    const {
      target: { value },
    } = event;
    setSelectedCombatArts(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const combatArts: CombatArt[] = combatArtsData;

  const filteredCombatArts = useMemo(() => (
    combatArts.filter(ca => selectedCombatArts.includes(ca.name))
  ), [combatArts, selectedCombatArts])

  return (
    <ThemeProvider theme={theme}>
      <Stack flexDirection="row" gap={1} alignItems="center" sx={{ mb: 2, py: 2, px: 3, backgroundColor: 'white', borderRadius: '8px' }}>
        <Button variant="contained" onClick={handlePrint} >PRINT</Button>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Combat Arts</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedCombatArts}
            onChange={handleChange}
            input={<OutlinedInput label="Combat Arts" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            sx={{ backgroundColor: 'white' }}
          >
            {combatArts.map(({ name }) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selectedCombatArts.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Typography variant="subtitle1">{filteredCombatArts.length} Combat Arts will be printed:</Typography>
      <div className="combat-art--container" ref={componentRef}>
        {filteredCombatArts.map((combatArt, index) => (
          <>
            <PlayingCard key={combatArt.name} {...combatArt} />
            {Boolean(index % 9 === 8) && <div className="page-break" />}
          </>
        ))}
        {!filteredCombatArts.length && <Typography variant="body2">Select some Combat Arts above to include them for printing.</Typography>}
      </div>
    </ThemeProvider>
  );
};
