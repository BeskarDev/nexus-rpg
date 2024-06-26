import { Button, ThemeProvider, Typography } from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithRedirect } from 'firebase/auth'
import React from 'react'

export const CharacterSheet: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      {!auth.currentUser && (
        <div>
          Make sure to login first!{' '}
          <Button
            onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())}
          >
            Login
          </Button>
        </div>
      )}
      <div>Here be your character sheet (coming soon™️)...</div>
    </ThemeProvider>
  )
}
