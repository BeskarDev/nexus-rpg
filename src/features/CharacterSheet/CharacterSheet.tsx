import { Button, ThemeProvider, Typography } from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithRedirect } from 'firebase/auth'
import React from 'react'

export const CharacterSheet: React.FC = () => {
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: "nexus-rpg-d04d1.firebaseapp.com",
        projectId: "nexus-rpg-d04d1",
        storageBucket: "nexus-rpg-d04d1.appspot.com",
        messagingSenderId: "869532958198",
        appId: "1:869532958198:web:6a251e9ceaefdcb5329bd7",
        measurementId: "G-DM9S5DQ1E2"
      };

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    return (
        <ThemeProvider theme={theme}>
            {!auth.currentUser && <div>Make sure to login first! <Button onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())}>Login</Button></div>}
            <div>Here be your character sheet (coming soon™️)...</div>
        </ThemeProvider>
    )
}