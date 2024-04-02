import { ThemeProvider, Typography } from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import React from 'react'

export const CharacterSheet: React.FC = () =>
    <ThemeProvider theme={theme}>
        <div>Here be your character sheet (coming soon™️)...</div>
    </ThemeProvider>