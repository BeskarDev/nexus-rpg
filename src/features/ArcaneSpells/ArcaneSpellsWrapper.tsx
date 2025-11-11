import React from 'react'
import { Experimental_CssVarsProvider, experimental_extendTheme, CssBaseline } from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { ArcaneSpells } from './ArcaneSpells'

export const ArcaneSpellsWrapper: React.FC = () => {
  const customTheme = experimental_extendTheme(theme)
  return (
    <Experimental_CssVarsProvider theme={customTheme}>
      <ThemeSwitcher />
      <CssBaseline />
      <ArcaneSpells />
    </Experimental_CssVarsProvider>
  )
}
