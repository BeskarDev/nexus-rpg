import React from 'react'
import { AuthProvider } from '@site/src/hooks/firebaseAuthContext'
import { CharacterSelector, CharacterSelectorProps } from './CharacterSelector'

export const CharacterSelectorWrapper: React.FC<CharacterSelectorProps> = (props) => {
  return (
    <AuthProvider>
      <CharacterSelector {...props} />
    </AuthProvider>
  )
}
