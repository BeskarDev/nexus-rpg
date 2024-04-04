import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, ThemeProvider, Typography } from '@mui/material';
import { theme } from '@site/src/hooks/createTheme';
import { MysticSpell } from '@site/src/types/MysticSpell';
import React, { useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import mysticSpellData from '../../utils/json/mystic-spells.json';
import './mysticSpellsStyles.css';
import { MysticSpellCard } from './MysticSpellCard';

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

export const MysticSpells: React.FC = () => {
  const [selectedMysticSpells, setSelectedMysticSpells] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedMysticSpells>) => {
    const {
      target: { value },
    } = event;
    setSelectedMysticSpells(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const mysticSpells: MysticSpell[] = mysticSpellData;

  const filteredMysticSpells = useMemo(() => (
    mysticSpells.filter(ca => selectedMysticSpells.includes(ca.name))
  ), [mysticSpells, selectedMysticSpells])

  const selectAll = () => setSelectedMysticSpells(mysticSpells.map(ca => ca.name))
  const deselectAll = () => setSelectedMysticSpells([])

  return (
    <ThemeProvider theme={theme}>
      <Stack flexDirection="row" gap={1} alignItems="center" sx={{ mb: 2, py: 2, px: 3, backgroundColor: 'white', borderRadius: '8px' }}>
        <Button variant="contained" size="large" onClick={handlePrint} >PRINT</Button>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel >Mystic Spells</InputLabel>
          <Select
            multiple
            value={selectedMysticSpells}
            onChange={handleChange}
            input={<OutlinedInput label="Mystic Spells" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            sx={{ backgroundColor: 'white' }}
          >
            {mysticSpells.map(({ name }) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selectedMysticSpells.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined" size="small" onClick={selectAll}>Select all</Button>
        <Button variant="outlined" size="small" onClick={deselectAll}>Deselect all</Button>
      </Stack>
      <Typography variant="subtitle1">{filteredMysticSpells.length} Mystic Spells will be printed:</Typography>
      <div className="mystic-spell--container" ref={componentRef}>
        {filteredMysticSpells.map((mysticSpell, index) => (
          <>
            <MysticSpellCard key={mysticSpell.name} {...mysticSpell} />
            {Boolean(index % 9 === 8) && <div className="page-break" />}
          </>
        ))}
        {!filteredMysticSpells.length && <Typography variant="body2">Select some Mystic Spells above to include them for printing.</Typography>}
      </div>
    </ThemeProvider>
  );
};
