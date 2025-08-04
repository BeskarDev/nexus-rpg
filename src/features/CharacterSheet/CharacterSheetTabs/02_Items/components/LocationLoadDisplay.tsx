import React, { useState, useEffect } from 'react'
import { Box, Theme } from '@mui/material'
import { AttributeField } from '../../../CharacterSheet'
import { ItemLocation } from '../../../../../types/ItemLocation'

interface LocationLoadDisplayProps {
  location: ItemLocation
  name: string
  currentLoad: number
  maxLoad: number
  onNameChange: (name: string) => void
  onMaxLoadChange: (maxLoad: number) => void
}

export const LocationLoadDisplay: React.FC<LocationLoadDisplayProps> = ({
  location,
  name,
  currentLoad,
  maxLoad,
  onNameChange,
  onMaxLoadChange
}) => {
  // Local state to prevent focus loss during typing
  const [localName, setLocalName] = useState(name)
  const [localMaxLoad, setLocalMaxLoad] = useState(maxLoad)

  // Update local state when props change (e.g., when switching characters)
  useEffect(() => {
    setLocalName(name)
  }, [name])

  useEffect(() => {
    setLocalMaxLoad(maxLoad)
  }, [maxLoad])

  const getLoadColor = (theme: Theme) => {
    if (maxLoad > 0) {
      if (currentLoad >= maxLoad) {
        return theme.palette.error.main
      } else if (currentLoad >= maxLoad * 0.8) {
        return theme.palette.warning.main
      }
    }
    return theme.palette.text.primary
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
      <AttributeField
        size="small"
        variant="standard"
        value={localName}
        onChange={(event) => setLocalName(event.target.value)}
        onBlur={() => onNameChange(localName)}
        label={location === 'mount' ? 'Mount Name' : 'Storage Name'}
        sx={{ mt: 0, maxWidth: { sm: '10rem', xs: '8rem' } }}
      />
      <AttributeField
        disabled
        size="small"
        value={currentLoad}
        label="Current Load"
        sx={{
          maxWidth: '5rem',
          '& .MuiFormLabel-root.MuiInputLabel-root.Mui-disabled': {
            color: (theme) => getLoadColor(theme),
          },
          '& .MuiOutlinedInput-root': {
            '& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled': {
              color: (theme) => getLoadColor(theme),
              ['-webkit-text-fill-color']: (theme) => getLoadColor(theme),
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => getLoadColor(theme),
              borderWidth: '2px',
            },
          },
        }}
      />
      <AttributeField
        type="number"
        size="small"
        value={localMaxLoad}
        onChange={(event) => {
          const newValue = Number(event.target.value)
          setLocalMaxLoad(newValue)
        }}
        onBlur={() => {
          onMaxLoadChange(localMaxLoad)
        }}
        label="Max Load"
        sx={{ maxWidth: '5rem' }}
      />
    </Box>
  )
}
